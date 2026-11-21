// The Wandering Emporium market page (emporium.html): a top-down map with a pane per stall, a finder
// ("what can N soul coins or N gold buy?"), a haggle helper and a purchase ledger in both currencies.
// Data: sessions/campaign-emporium-market.js and campaign-emporium-goods.js (stock, favours, buys)
// + the existing Emporium panels. The players' monitor (emporium.html?view=players) is js/emporium-players.js;
// what this page tells it goes through js/emporium-cast.js (cast, below).
(function () {
  "use strict";
  var inNode = typeof module !== "undefined" && module.exports;
  var Core = inNode ? require("./core.js") : window.DMCore;

  var LEDGER_KEY = "dmapp:emporium:ledger";
  var STATE_KEY = "dmapp:emporium:state";
  var PARTY = ["Drenwal", "Aurora", "Or'Henn", "Party"];

  // ---- pure helpers (tested in tests/emporium.test.js) ----
  // The first soul coin figure in a price cell: "0.2 SC / 40 gp" -> 0.2, "1–3 SC" -> 1, "list gp" -> null.
  function parseSc(price) {
    if (typeof price === "number") return price;
    var m = /(\d+(?:\.\d+)?)(?:\s*[–-]\s*\d+(?:\.\d+)?)?\s*(?:SC\b|soul coins?\b)/.exec(String(price || ""));
    return m ? Number(m[1]) : null;
  }
  // Rows of the old menus that are not something the party pays for: what a keeper pays them, loans, exchange rates.
  var NOT_FOR_SALE = /\b(pays|he buys|offers|sell him|loan|up to|per 1 SC|interest|face value|he takes|DM's call)\b/i;
  // The app's own result bands (panel emporium-shops).
  function haggle(total, dc) {
    var by = total - dc;
    if (by >= 5) return { band: "great", factor: 0.7, label: "Beat the DC by 5 or more: 30 % off, or a thrown-in extra. Attitude up." };
    if (by >= 0) return { band: "good", factor: 0.85, label: "Met the DC: 10 to 20 % off (15 % used here)." };
    if (by >= -4) return { band: "hold", factor: 1, label: "Missed by 1 to 4: the price holds. Attitude down one step." };
    return { band: "sour", factor: 1.25, label: "Missed by 5 or more: soured. +25 % 'mortal tax', or the offer is withdrawn." };
  }
  function priceAfter(sc, factor) { return Math.round(sc * factor * 100) / 100; }

  // Gold. The floor's own rule (panel emporium-shops): gold trades at half value, 200 gp to the soul coin.
  // A stall can take gold on its own terms for what is used up there (spot.gold.used: Burney, at par),
  // and a row can carry its own gp price. Rows marked scOnly still get a figure: the DM may overrule.
  var GOLD_RATE = 200;
  function goldPrice(item, spot) {
    if (item.gp > 0) return item.gp;
    if (!(item.sc > 0)) return null;
    var rates = (spot && spot.gold) || {};
    return Math.round(item.sc * (item.c && rates.used ? rates.used : rates.rate || GOLD_RATE));
  }
  // The gp figure of an old menu cell: "0.2 SC / 40 gp" -> 40, "8 SC / 1,600 gp" -> 1600, none -> null.
  function parseGp(price) {
    var m = /(\d[\d,]*(?:\.\d+)?)\s*gp\b/.exec(String(price || ""));
    return m ? Number(m[1].replace(/,/g, "")) : null;
  }
  // What a purse can buy: enough soul coins, or enough gold where gold is taken. Dearest first.
  function affordable(goods, coins, gold) {
    return (goods || []).filter(function (g) {
      return g.sc > 0 && ((coins > 0 && g.sc <= coins) || (gold > 0 && g.gp > 0 && g.gp <= gold));
    }).sort(function (a, b) { return b.sc - a.sc; });
  }

  // The ledger: an entry is paid in soul coins (sc) or in gold (gp), never both.
  function inGold(e) { return typeof e.gp === "number" && typeof e.sc !== "number"; }
  function ledgerAdd(ledger, entry, now) {
    return (Array.isArray(ledger) ? ledger : []).concat([Object.assign({ at: now }, entry)]);
  }
  function ledgerRemove(ledger, index) {
    return (Array.isArray(ledger) ? ledger : []).filter(function (e, i) { return i !== index; });
  }
  function ledgerTotals(ledger) {
    return (Array.isArray(ledger) ? ledger : []).reduce(function (acc, e) {
      var key = inGold(e) ? "goldByWho" : "byWho", sum = inGold(e) ? "gold" : "total";
      var amount = Number(inGold(e) ? e.gp : e.sc) || 0;
      var per = Object.assign({}, acc[key]), next = Object.assign({}, acc);
      per[e.who] = priceAfter((per[e.who] || 0) + amount, 1);
      next[key] = per;
      next[sum] = priceAfter(acc[sum] + amount, 1);
      return next;
    }, { total: 0, byWho: {}, gold: 0, goldByWho: {} });
  }
  function paid(e) { return inGold(e) ? e.gp + " gp" : (Number(e.sc) || 0) + " SC"; }
  function perBuyer(t) {
    return Object.keys(Object.assign({}, t.byWho, t.goldByWho)).map(function (w) {
      return w + " " + [t.byWho[w] ? t.byWho[w] + " SC" : "", t.goldByWho[w] ? t.goldByWho[w] + " gp" : ""].filter(Boolean).join(" + ");
    });
  }
  function leftOf(t, purse, goldPurse) {
    return [Number(purse) > 0 ? priceAfter(Number(purse) - t.total, 1) + " SC of " + Number(purse) : "",
      Number(goldPurse) > 0 ? priceAfter(Number(goldPurse) - t.gold, 1) + " gp of " + Number(goldPurse) : ""].filter(Boolean);
  }
  function ledgerText(ledger, purse, goldPurse) {
    var t = ledgerTotals(ledger), per = perBuyer(t).join(", "), left = leftOf(t, purse, goldPurse);
    var lines = (ledger || []).map(function (e) { return "- " + e.who + ": " + e.item + ", " + paid(e) + (e.spotName ? " (" + e.spotName + ")" : "") + (e.how ? " [" + e.how + "]" : ""); });
    return "Wandering Emporium, purchases:\n" + lines.join("\n") + "\nSpent " + t.total + " SC" + (t.gold ? " and " + t.gold + " gp" : "") +
      (per ? " (" + per + ")" : "") + "." + (left.length ? " Left " + left.join(", ") + "." : "");
  }

  function tables(blocks, out) {
    (blocks || []).forEach(function (b) {
      if (b.t === "table") out.push(b);
      if (b.blocks) tables(b.blocks, out);
    });
    return out;
  }
  // Everything with a soul coin price: the new stock, plus the priced rows of the existing service menus.
  // gp is the gold price, or null where the floor takes soul coins only (scOnly rows, menu rows with no gp figure).
  function allGoods(market, side) {
    var out = [];
    (market.spots || []).forEach(function (s) {
      (s.stock || []).forEach(function (it) {
        if (it.sc > 0) out.push({ spot: s.id, spotName: s.name, name: Core.stripTags(it.name), sc: it.sc, gp: it.scOnly ? null : goldPrice(it, s), scOnly: !!it.scOnly, kind: "stock", rarity: it.rarity, g: it.g, note: it.note });
      });
      var panel = s.kind === "stall" && s.panel && side ? side[s.panel] : null; // dens and places have tables of stakes and rumours, not prices
      var chair = s.gold && s.gold.used; // a stall that takes gold on its own terms does so for its services too
      tables(panel ? panel.blocks : [], []).forEach(function (t) {
        if ((t.head || [])[0] === "Tier") return; // information tiers are answers to questions, not goods
        (t.rows || []).forEach(function (row) {
          var cell = null;
          for (var i = 1; i < row.length && cell === null; i++) if (parseSc(row[i]) > 0) cell = String(row[i]);
          if (cell === null || NOT_FOR_SALE.test(row[0] + " " + cell)) return;
          var sc = parseSc(cell), gp = parseGp(cell);
          out.push({ spot: s.id, spotName: s.name, name: Core.stripTags(row[0]), sc: sc, gp: gp && chair ? Math.round(sc * chair) : gp, scOnly: !gp, kind: "service", note: Core.stripTags(row[row.length - 1]) });
        });
      });
    });
    return out;
  }
  // The shelves of a stall, in the order they first appear; shelves that hold only favour-only rows go last.
  function shelvesOf(stock) {
    var order = [], by = {};
    (stock || []).forEach(function (it) {
      var g = it.g || "";
      if (!by[g]) { by[g] = []; order.push(g); }
      by[g].push(it);
    });
    var all = order.map(function (g) { return { g: g, rows: by[g] }; });
    function vault(s) { return s.rows.every(function (it) { return it.favourOnly; }); }
    return all.filter(function (s) { return !vault(s); }).concat(all.filter(vault));
  }
  // Tonight's d8 shelf of one stall: the table that follows its heading in the panel emporium-stock-today.
  function rackOf(panel, heading) {
    var blocks = (panel && panel.blocks) || [];
    for (var i = 0; i < blocks.length - 1; i++) {
      if (blocks[i].t === "h" && blocks[i].text === heading && blocks[i + 1].t === "table") return blocks[i + 1];
    }
    return null;
  }

  var DMEmporium = {
    PARTY: PARTY, GOLD_RATE: GOLD_RATE, parseSc: parseSc, parseGp: parseGp, goldPrice: goldPrice, haggle: haggle,
    priceAfter: priceAfter, affordable: affordable, ledgerAdd: ledgerAdd, ledgerRemove: ledgerRemove,
    ledgerTotals: ledgerTotals, ledgerText: ledgerText, allGoods: allGoods, shelvesOf: shelvesOf, rackOf: rackOf
  };
  if (inNode) { module.exports = DMEmporium; return; }
  window.DMEmporium = DMEmporium;

  // ---- the page ----
  var R = window.DMRender, el = R.el;
  function $(id) { return document.getElementById(id); }
  function load(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v === null || v === undefined ? fallback : v; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { $("till-msg").textContent = "Could not save in this browser: copy the ledger before closing."; }
  }
  function inline(text) { return R.renderInline(String(text == null ? "" : text)); }
  function td(content, cls) {
    var c = el("td", cls || "");
    c.appendChild(typeof content === "string" || typeof content === "number" ? inline(content) : content);
    return c;
  }
  function table(head, rows) {
    var t = el("table", "mk");
    var hr = el("tr");
    head.forEach(function (h) { hr.appendChild(el("th", "", h)); });
    t.appendChild(hr);
    rows.forEach(function (r) { t.appendChild(r); });
    return t;
  }
  function button(label, cls, onClick) {
    var b = el("button", cls, label);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }

  function start() {
    var M = window.EMPORIUM_MARKET, SIDE = (window.CAMPAIGN || {}).side || {};
    var GOODS = allGoods(M, SIDE);
    var state = Object.assign({ spot: M.spots[2].id, tab: "stock", coins: "", gold: "", query: "", purse: "", purseGp: "", who: PARTY[0], cur: "sc" }, load(STATE_KEY, {}));
    var ledger = load(LEDGER_KEY, []);
    var pick = null; // the row being bought: { name, sc, gp, scOnly, spot, spotName, dc }

    function set(change) { state = Object.assign({}, state, change); save(STATE_KEY, state); }
    // The monitor: it goes where this page goes, and a click on it brings this page along.
    var cast = window.DMEmporiumCast.dmInit({
      players: window.EMPORIUM_PLAYERS,
      message: function (text) { $("till-msg").textContent = text; },
      onSpot: function (id) { if (id !== state.spot) { set({ spot: id, tab: tabsOf(spotById(id))[0][0] }); pick = null; draw(); } }
    });
    function spotById(id) { return M.spots.filter(function (s) { return s.id === id; })[0] || M.spots[0]; }
    function coins() { return Number(state.coins) > 0 ? Number(state.coins) : 0; }
    function gold() { return Number(state.gold) > 0 ? Number(state.gold) : 0; }
    // Can the purse typed at the top pay for this? No purse typed: everything is in reach.
    function within(sc, gp) {
      var c = coins(), g = gold();
      return (!c && !g) || (c > 0 && sc <= c) || (g > 0 && gp > 0 && gp <= g);
    }

    function drawPins() {
      var painted = $("map").classList.contains("painted");
      $("pins").replaceChildren.apply($("pins"), M.spots.map(function (s) {
        var b = button("", "pin " + s.kind + (s.id === state.spot ? " on" : ""), function () { set({ spot: s.id, tab: tabsOf(s)[0][0] }); pick = null; cast.spot(s.id); draw(); });
        b.style.left = (painted && s.px != null ? s.px : s.x) + "%";
        b.style.top = (painted && s.py != null ? s.py : s.y) + "%";
        b.title = s.name;
        b.appendChild(el("span", "pin-n", String(s.n)));
        b.appendChild(el("span", "pin-label", s.short || s.name));
        return b;
      }));
    }

    function tabsOf(s) {
      var panel = s.panel ? SIDE[s.panel] : null;
      return [
        ["stock", "Stock", (s.stock || []).length],
        ["rack", "Tonight's rack", s.rack ? 1 : 0],
        ["services", { den: "The game", place: "Tables" }[s.kind] || "Services", panel ? 1 : 0],
        ["favours", "Favours", (s.favours || []).length],
        ["buys", "Buys", (s.buys || []).length],
        ["tonight", "Tonight", (s.tonight || []).length],
        ["play", "Play", panel && playBlocks(panel).length ? 1 : 0]
      ].filter(function (t) { return t[2] > 0; });
    }
    function isPlay(b) { return b.t === "more" && /^(Playing|Bargaining)/.test(b.title || ""); }
    function playBlocks(panel) { return (panel.blocks || []).filter(isPlay); }

    function stockRow(s, it) {
      var gp = it.sc > 0 ? goldPrice(it, s) : null;
      var tr = el("tr", it.sc > 0 && !within(it.sc, it.scOnly ? null : gp) ? "dear" : "");
      var name = el("td", "item");
      name.appendChild(inline(it.name));
      if (it.qty) name.appendChild(el("span", "qty", /crown jewel/.test(it.qty) ? "★ the stall's crown jewel" : (/^\d/.test(it.qty) ? "On hand: " : "") + it.qty));
      var hiddenRow = cast.rowControls(s, it, drawPane); // kept off the monitor until revealed
      if (hiddenRow) name.appendChild(hiddenRow);
      tr.appendChild(name);
      tr.appendChild(el("td", "rar r-" + it.rarity.replace(" ", "-"), it.rarity));
      var price = el("td", "sc", it.sc > 0 ? it.sc + " SC" : "favour only");
      if (it.sc > 0) price.appendChild(el("span", "qty gp", it.scOnly ? "soul coins only" : "or " + gp + " gp"));
      if (it.extra) price.appendChild(el("span", "qty", it.extra));
      tr.appendChild(price);
      tr.appendChild(td(it.note));
      var act = el("td", "act");
      if (it.sc > 0) act.appendChild(button("Buy", "btn small", function () { choose({ name: Core.stripTags(it.name), sc: it.sc, gp: gp, scOnly: !!it.scOnly }, s); }));
      tr.appendChild(act);
      return tr;
    }
    function goldNote(s) {
      var used = s.gold && s.gold.used;
      return "Gold: " + (used ? used + " gp to the soul coin here for anything used up or done in the chair, " + GOLD_RATE + " for the rest." : GOLD_RATE + " gp to the soul coin, the floor's rate.") +
        " Rows marked 'soul coins only' are premium or soul-goods: the bank changes gold into coins at " + GOLD_RATE + " gp each.";
    }
    function stockTab(s) {
      var rows = shelvesOf(s.stock).reduce(function (all, sh) {
        var head = el("tr", "shelf"), cell = el("td", "", sh.g + "  ·  " + sh.rows.length);
        cell.colSpan = 5;
        head.appendChild(cell);
        return all.concat([head], sh.rows.map(function (it) { return stockRow(s, it); }));
      }, []);
      var wrap = el("div");
      if (s.stockNote) { var note = el("p", "hint"); note.appendChild(inline(s.stockNote)); wrap.appendChild(note); }
      wrap.appendChild(el("p", "hint", goldNote(s)));
      wrap.appendChild(table(["Item", "Rarity", "Price", "What it does", ""], rows));
      return wrap;
    }
    function pairsTab(head, list, a, b, c) {
      return table(head, list.map(function (x) {
        var tr = el("tr");
        tr.appendChild(td(x[a]));
        tr.appendChild(td(x[b]));
        if (c) tr.appendChild(td(x[c] || ""));
        return tr;
      }));
    }
    function blocksTab(blocks, open) {
      var wrap = el("div", "book");
      blocks.forEach(function (b) {
        var node = R.renderBlock(b, { session: { id: "emporium-market", creatures: {}, side: {} } });
        if (open && node.tagName === "DETAILS") node.open = true;
        wrap.appendChild(node);
      });
      return wrap;
    }
    function tabBody(s, tab) {
      var panel = s.panel ? SIDE[s.panel] : null;
      if (tab === "stock") return stockTab(s);
      if (tab === "rack") {
        var w = el("div");
        w.appendChild(el("p", "hint", "Tonight's table for this spot: roll or pick. These sit below the list prices because the caravan packs at the bell."));
        w.appendChild(blocksTab([rackOf(SIDE["emporium-stock-today"], s.rack)]));
        return w;
      }
      if (tab === "services") {
        return blocksTab((s.also || []).reduce(function (all, id) {
          return all.concat([{ t: "h", text: SIDE[id].title }], SIDE[id].blocks);
        }, panel.blocks.filter(function (b) { return !isPlay(b); })));
      }
      if (tab === "favours") return pairsTab(["What the keeper asks", "What it buys"], s.favours, "ask", "gives");
      if (tab === "buys") return pairsTab(["What the party sells", "The keeper pays", "Note"], s.buys, "what", "pays", "note");
      if (tab === "play") return blocksTab(playBlocks(panel), true);
      var ul = el("ul", "tonight");
      s.tonight.forEach(function (line) { var li = el("li"); li.appendChild(inline(line)); ul.appendChild(li); });
      return ul;
    }
    function drawPane() {
      var s = spotById(state.spot), tabs = tabsOf(s);
      var tab = tabs.some(function (t) { return t[0] === state.tab; }) ? state.tab : tabs[0][0];
      var head = el("div", "pane-head");
      head.appendChild(el("h2", "", s.n + ". " + s.name));
      var meta = el("p", "meta");
      if (s.keeper) meta.appendChild(el("span", "chip", s.keeper));
      if (s.haggle) meta.appendChild(el("span", "chip", "Haggle DC " + s.haggle));
      if (s.pays) meta.appendChild(el("span", "chip", s.pays));
      head.appendChild(meta);
      var look = el("p", "look");
      look.appendChild(inline(s.look));
      head.appendChild(look);
      head.appendChild(cast.musicField(s));
      var bar = el("div", "tabs");
      tabs.forEach(function (t) {
        bar.appendChild(button(t[1] + (t[0] === "stock" || t[0] === "favours" || t[0] === "buys" ? " (" + t[2] + ")" : ""), t[0] === tab ? "on" : "", function () { set({ tab: t[0] }); drawPane(); }));
      });
      $("pane").replaceChildren(head, bar, tabBody(s, tab));
      $("pane").scrollTop = 0;
    }

    var FINDER_MAX = 150;
    function drawFinder() {
      var c = coins(), g = gold(), q = state.query.trim().toLowerCase();
      var list = (c || g ? affordable(GOODS, c, g) : GOODS.slice().sort(function (a, b) { return b.sc - a.sc; }))
        .filter(function (x) { return !q || (x.name + " " + (x.note || "") + " " + x.spotName + " " + (x.g || "")).toLowerCase().indexOf(q) !== -1; });
      var active = c || g || q;
      var purse = [c ? c + " SC" : "", g ? g + " gp" : ""].filter(Boolean).join(" or ");
      $("finder-title").textContent = !active ? "Type coins, gold or a word" :
        list.length + " things" + (purse ? " for " + purse + " or less" : "") + (q ? " matching '" + state.query.trim() + "'" : "") +
        (list.length > FINDER_MAX ? " (the dearest " + FINDER_MAX + " shown)" : "");
      $("finder-list").replaceChildren.apply($("finder-list"), !active ? [] : list.slice(0, FINDER_MAX).map(function (x) {
        var li = el("li");
        li.appendChild(el("b", "", x.sc + " SC"));
        li.appendChild(document.createTextNode((x.gp ? " or " + x.gp + " gp" : ", coins only") + "  ·  " + x.name + "  "));
        li.appendChild(button(x.spotName, "link", function () { set({ spot: x.spot, tab: x.kind === "stock" ? "stock" : "services" }); cast.spot(x.spot); draw(); }));
        if (x.kind === "service") li.appendChild(el("span", "qty", "service"));
        li.appendChild(document.createTextNode("  "));
        li.appendChild(button("Buy", "btn small", function () {
          choose({ name: x.name, sc: x.sc, gp: x.gp || Math.round(x.sc * GOLD_RATE), scOnly: !x.gp }, spotById(x.spot));
        }));
        return li;
      }));
    }

    // The buying bar. The price is in the currency chosen there: soul coins to two places, gold to the whole piece.
    // state.cur is how the table usually pays; a soul-coins-only pick starts in coins without changing that.
    function cur() { return pick ? pick.cur : state.cur; }
    function listPrice() { return cur() === "gp" ? pick.gp : pick.sc; }
    function fillPrice() {
      if (!pick) return;
      var roll = Number($("buy-roll").value), factor = pick.dc && roll > 0 ? haggle(roll, pick.dc).factor : 1;
      $("buy-price").value = cur() === "gp" ? Math.round(listPrice() * factor) : priceAfter(listPrice(), factor);
    }
    function choose(item, s) {
      pick = Object.assign({}, item, { spot: s.id, spotName: s.name, dc: s.haggle || 0, cur: item.scOnly ? "sc" : state.cur });
      $("buy-roll").value = "";
      cast.item(s.id, item.name); // the monitor holds it up
      fillPrice();
      drawTill();
      $("buy-roll").focus();
    }
    function drawTill() {
      $("buy-cur").value = cur();
      $("buy-unit").textContent = cur() === "gp" ? "gp" : "SC";
      $("buy-item").textContent = pick ? pick.name + " · list " + pick.sc + " SC" + (pick.scOnly ? ", soul coins only" : " or " + pick.gp + " gp") + " · " + pick.spotName + (pick.dc ? " · Haggle DC " + pick.dc : "") : "Press Buy on any row.";
      $("buy-add").disabled = !pick;
      $("buy-clear").hidden = !pick;
      if (!pick) { $("buy-roll").value = ""; $("buy-price").value = ""; }
      var roll = Number($("buy-roll").value);
      $("buy-band").textContent = (pick && pick.scOnly && cur() === "gp" ? "The floor takes soul coins only for this one (the bank changes gold at " + GOLD_RATE + " gp a coin). Your call. " : "") +
        (pick && pick.dc && roll > 0 ? haggle(roll, pick.dc).label : "");
      $("ledger-list").replaceChildren.apply($("ledger-list"), ledger.map(function (e, i) {
        var li = el("li");
        li.appendChild(el("b", "", e.who));
        li.appendChild(document.createTextNode("  " + e.item + ", " + paid(e) + "  (" + e.spotName + (e.how ? ", " + e.how : "") + ")  "));
        li.appendChild(button("×", "btn small", function () { ledger = ledgerRemove(ledger, i); save(LEDGER_KEY, ledger); drawTill(); }));
        return li;
      }));
      var t = ledgerTotals(ledger), per = perBuyer(t).join(" · "), left = leftOf(t, state.purse, state.purseGp);
      $("ledger-total").textContent = "Spent " + t.total + " SC" + (t.gold ? " and " + t.gold + " gp" : "") + (per ? "  (" + per + ")" : "") + (left.length ? "   ·   Left " + left.join(", ") : "");
      var over = (Number(state.purse) > 0 && t.total > Number(state.purse)) || (Number(state.purseGp) > 0 && t.gold > Number(state.purseGp));
      $("ledger-total").className = over ? "total over" : "total";
    }

    function draw() { drawPins(); drawPane(); drawFinder(); drawTill(); }

    $("who").replaceChildren.apply($("who"), PARTY.map(function (p) { var o = el("option", "", p); o.value = p; return o; }));
    $("who").value = state.who;
    $("coins").value = state.coins;
    $("gold").value = state.gold;
    $("query").value = state.query;
    $("purse").value = state.purse;
    $("purse-gp").value = state.purseGp;
    $("coins").addEventListener("input", function () { set({ coins: $("coins").value }); drawPane(); drawFinder(); });
    $("gold").addEventListener("input", function () { set({ gold: $("gold").value }); drawPane(); drawFinder(); });
    $("query").addEventListener("input", function () { set({ query: $("query").value }); drawFinder(); });
    $("purse").addEventListener("input", function () { set({ purse: $("purse").value }); drawTill(); });
    $("purse-gp").addEventListener("input", function () { set({ purseGp: $("purse-gp").value }); drawTill(); });
    $("who").addEventListener("change", function () { set({ who: $("who").value }); });
    $("buy-cur").addEventListener("change", function () {
      var c = $("buy-cur").value === "gp" ? "gp" : "sc";
      if (pick) pick = Object.assign({}, pick, { cur: c });
      if (!pick || !pick.scOnly) set({ cur: c });
      fillPrice();
      drawTill();
    });
    $("buy-roll").addEventListener("input", function () { fillPrice(); drawTill(); });
    $("buy-add").addEventListener("click", function () {
      var price = Number($("buy-price").value);
      if (!pick || !(price >= 0)) return;
      var roll = Number($("buy-roll").value), inGp = cur() === "gp", list = listPrice();
      var how = price === list ? "" : (pick.dc && roll > 0 ? "haggled, " + roll + " vs DC " + pick.dc : "price set by the DM") + ", list " + list + (inGp ? " gp" : "");
      var entry = Object.assign({ who: $("who").value, item: pick.name, spot: pick.spot, spotName: pick.spotName, how: how }, inGp ? { gp: price } : { sc: price });
      ledger = ledgerAdd(ledger, entry, Date.now());
      save(LEDGER_KEY, ledger);
      pick = null;
      drawTill();
    });
    $("buy-clear").addEventListener("click", function () { pick = null; cast.item(null, null); drawTill(); });
    $("ledger-copy").addEventListener("click", function () {
      var text = ledgerText(ledger, state.purse, state.purseGp);
      var done = function () { $("till-msg").textContent = "Copied. Paste it into campaign-state.md or the chat."; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { window.prompt("Copy the ledger:", text); });
      else window.prompt("Copy the ledger:", text);
    });
    $("ledger-clear").addEventListener("click", function () {
      if (!ledger.length || !window.confirm("Clear the whole ledger? Copy it first if the session is not written down.")) return;
      ledger = [];
      save(LEDGER_KEY, ledger);
      drawTill();
    });
    // Links to stat blocks and side panels belong to the main app: here they must not jump the page to the top.
    $("pane").addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a.tag-creature, a.tag-side, a.tag-scene")) e.preventDefault();
    });
    // A painted base map, when there is one; the drawn plan stays if the file is missing.
    if (M.mapImage) {
      var img = new Image();
      img.onload = function () { $("map-art").src = M.mapImage; $("map").classList.add("painted"); drawPins(); };
      img.src = M.mapImage;
    }
    draw();
  }

  if (document.getElementById("pins") && !/[?&]view=players\b/.test(location.search)) start();
})();
