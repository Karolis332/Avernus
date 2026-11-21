// The players' monitor: emporium.html?view=players. The painted map; a click opens the shop's picture with the
// goods anyone can see. It follows the DM page and is followed by it (js/emporium-cast.js): the DM's Buy or Show
// holds an item up, his Add to ledger stamps it SOLD and counts the purse down, his Identify lifts a veil.
// Nothing here reads a DM note: every card comes from Cast.publicGoods and sessions/campaign-emporium-players.js,
// the pictures from campaign-emporium-item-art.js, the rules text from campaign-emporium-item-text.js (SRD 5.1).
(function () {
  "use strict";
  if (!/[?&]view=players\b/.test(location.search)) return;
  var Cast = window.DMEmporiumCast, E = window.DMEmporium, el = window.DMRender.el, K = Cast.KEYS;
  var M = window.EMPORIUM_MARKET, P = window.EMPORIUM_PLAYERS;
  var ART = window.EMPORIUM_ITEM_ART || null, TEXTS = window.EMPORIUM_ITEM_TEXT || null;
  var root = document.getElementById("pv");
  var MAP_ACCENT = "#e0a82e", PARTICLES = 26, STAMP_MS = 2800, TOAST_MS = 5200, REVEAL_MS = 1800;
  var KIND = { stall: "Stall", den: "Gambling den", place: "" };

  // What this window remembers between drawings. The screen itself ({ spot, item, haul, bare }) lives in localStorage.
  var view = {
    shelf: "", sceneOf: undefined, ledger: Cast.load(K.ledger, []), revealed: Cast.load(K.revealed, []),
    identified: Cast.load(K.identified, []), fresh: [], stamp: null, unveiled: null
  };

  function spotById(id) { return M.spots.filter(function (s) { return s.id === id; })[0] || null; }
  function look(s) { return P.spots[s.id] || { theme: { accent: MAP_ACCENT, fx: "motes" } }; }
  function button(cls, onClick, text) {
    var b = el("button", cls, text);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]);
    return parent;
  }
  function show(change) {
    if (!Cast.save(K.screen, Object.assign(Cast.screen(), change, { at: Date.now() }))) toast("This browser cannot save: the two screens will not follow each other.");
    render();
  }
  function goods(s) { return Cast.publicGoods(s, P, view.revealed, view.ledger, view.identified); }

  // ---- sound: made here, no files. A browser plays nothing until the window has been clicked once. ----
  var audio = null;
  function unlock() {
    if (audio) return;
    try { audio = new (window.AudioContext || window.webkitAudioContext)(); root.classList.remove("muted"); } catch (e) { audio = null; }
  }
  function chime(notes, gap, wave) {
    if (!audio) return;
    notes.forEach(function (hz, i) {
      var osc = audio.createOscillator(), gain = audio.createGain(), t = audio.currentTime + i * gap;
      osc.type = wave || "triangle";
      osc.frequency.value = hz;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.22, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(t);
      osc.stop(t + 0.6);
    });
  }
  function coinSound() { chime([1568, 2093, 2637], 0.07); }
  function revealSound() { chime([523, 659, 784, 1047], 0.13); }
  function openSound() { chime([392, 587], 0.06, "sine"); }
  function veilSound() { chime([196, 233, 277, 330, 415], 0.11, "sine"); }

  function toast(text) {
    var t = el("div", "pv-toast-line", text);
    document.getElementById("pv-toast").appendChild(t);
    setTimeout(function () { t.remove(); }, TOAST_MS);
  }

  // ---- the scene behind everything: the shop's painting, or the map until one is painted; and what drifts over it ----
  function drawScene(s) {
    var id = s ? s.id : null;
    if (view.sceneOf === id) return;
    // A newly revealed row glows until the players have stood at its stall and walked away.
    var left = view.sceneOf;
    if (left) view.fresh = view.fresh.filter(function (k) { return k.indexOf(left + "|") !== 0; });
    view.sceneOf = id;
    var theme = s ? look(s).theme : { accent: MAP_ACCENT, fx: "motes" };
    root.style.setProperty("--accent", theme.accent);
    var crop = document.getElementById("pv-crop"), art = document.getElementById("pv-art");
    crop.style.backgroundImage = "url('" + M.mapImage + "')";
    crop.style.backgroundPosition = s ? pinX(s) + "% " + pinY(s) + "%" : "50% 50%";
    crop.className = s ? "zoomed" : "";
    art.classList.remove("ready");
    art.removeAttribute("src");
    if (s) art.src = "art/generated/emporium-" + s.id + ".webp"; // not painted yet: the load fails and the map crop stays
    var fx = document.getElementById("pv-fx");
    fx.className = "fx-" + theme.fx;
    fx.replaceChildren.apply(fx, Array.apply(null, { length: PARTICLES }).map(function () {
      var p = el("i");
      p.style.setProperty("--x", (Math.random() * 100).toFixed(1) + "%");
      p.style.setProperty("--y", (Math.random() * 100).toFixed(1) + "%");
      p.style.setProperty("--s", (0.5 + Math.random()).toFixed(2));
      p.style.setProperty("--d", (9 + Math.random() * 14).toFixed(1) + "s");
      p.style.setProperty("--delay", (-Math.random() * 23).toFixed(1) + "s");
      return p;
    }));
  }
  function painted() { return !root.classList.contains("nomap"); }
  function pinX(s) { return painted() && s.px != null ? s.px : s.x; }
  function pinY(s) { return painted() && s.py != null ? s.py : s.y; }

  // ---- the purse in the corner ----
  function drawHud() {
    var p = Cast.purse(Cast.load(K.state, {}), view.ledger);
    function pill(cls, label, one, unit) {
      if (!one.set && !one.value) return null;
      var d = el("div", "pv-pill " + cls);
      add(d, el("span", "pv-pill-label", one.set ? label : label + " spent"), el("b", "", one.value.toLocaleString("en-US") + " " + unit));
      return d;
    }
    var hud = document.getElementById("pv-hud");
    var next = [pill("coins", "Soul coins", p.coins, "SC"), pill("gold", "Gold", p.gold, "gp")].filter(Boolean);
    var was = hud.textContent;
    hud.replaceChildren.apply(hud, next);
    if (was && was !== hud.textContent) { hud.classList.remove("bump"); void hud.offsetWidth; hud.classList.add("bump"); }
  }

  // ---- the map ----
  function goTo(id) { view.shelf = ""; show({ spot: id, item: null, haul: false, bare: false }); Cast.play(P, id); }
  function drawMap() {
    var map = el("div", "pv-map"), img = document.createElement("img"), pins = el("div", "pv-pins");
    img.alt = "";
    img.src = M.mapImage;
    img.addEventListener("error", function () { root.classList.add("nomap"); render(); });
    M.spots.forEach(function (s) {
      var b = button("pv-pin " + s.kind, function () { goTo(s.id); });
      b.style.left = pinX(s) + "%";
      b.style.top = pinY(s) + "%";
      add(b, el("span", "pv-pin-n", String(s.n)), el("span", "pv-pin-label", s.short || s.name));
      pins.appendChild(b);
    });
    add(map, img, pins);
    var side = el("aside", "pv-side"), list = el("div", "pv-places");
    M.spots.forEach(function (s) {
      var b = button("pv-place " + s.kind, function () { goTo(s.id); });
      add(b, el("span", "pv-pin-n", String(s.n)), el("span", "pv-place-name", s.name.split(":")[0]),
        el("span", "pv-place-who", (look(s).keeper || s.keeper || KIND[s.kind] || "").split(",")[0]));
      list.appendChild(b);
    });
    add(side, el("h1", "", P.title), el("p", "pv-sub", "Where to?"), list);
    return add(el("section", "pv-mapview"), map, side);
  }

  // ---- an item's picture: one tile of a painted sheet, or a sigil until its sheet is painted ----
  function tile(g, cls) {
    var hide = g.mystery && !g.sealed; // a sealed letter shows its wax; only an unknown item is darkened
    var t = el("span", cls + (hide ? " veiled" : "")), sp = Cast.sprite(ART, g.key);
    if (sp) {
      var i = el("i");
      i.style.backgroundImage = "url('" + sp.src + "')";
      i.style.backgroundSize = sp.size;
      i.style.backgroundPosition = sp.pos;
      t.appendChild(i);
    } else {
      t.classList.add("blank");
      t.appendChild(el("i", "sigil", "◆"));
    }
    if (hide) t.appendChild(el("b", "q", "?"));
    return t;
  }

  // ---- a shop ----
  function priceOf(g) {
    var p = el("span", "pv-price");
    if (g.sc === null) return add(p, el("b", "", "by favour"));
    add(p, el("b", "", g.sc + " SC"), el("i", "", g.gp === null ? "soul coins only" : "or " + g.gp.toLocaleString("en-US") + " gp"));
    if (g.extra) p.appendChild(el("i", "", g.extra));
    return p;
  }
  // "On hand" in the stall's own words, counted down by what the ledger says was sold.
  function onHand(g) {
    if (g.left === 0) return "";
    if (/crown jewel/.test(g.qty)) return "★ the stall's crown jewel";
    if (g.left === null) return (g.qty ? g.qty : "") + (g.bought ? (g.qty ? " · " : "") + "bought ×" + g.bought : "");
    if (/^\d+/.test(g.qty)) return "On hand: " + g.left + g.qty.replace(/^\d+/, "");
    if (/^(the last|up to) \d+/.test(g.qty)) return g.qty.replace(/\d+/, String(g.left));
    return g.qty;
  }
  function rarityClass(g) { return " pv-r-" + g.rarity.replace(" ", "-"); }
  function card(g) {
    var c = button("pv-card", function () { openSound(); show({ item: g.key }); });
    c.className += rarityClass(g) + (g.left === 0 ? " sold" : "") + (view.fresh.indexOf(g.key) !== -1 ? " fresh" : "") + (g.mystery ? " mystery" : "") + (g.sealed ? " letter" : "");
    var meta = [g.rarity, onHand(g)].filter(Boolean).join("  ·  ");
    add(c, tile(g, "pv-thumb"), el("span", "pv-name", g.name), priceOf(g), el("span", "pv-meta", meta), el("span", "pv-text", g.text));
    if (g.left === 0) c.appendChild(el("span", "pv-stamp", "Sold"));
    return c;
  }
  function drawGoods(s) {
    var all = goods(s), shelves = E.shelvesOf(all);
    if (!shelves.some(function (sh) { return sh.g === view.shelf; })) view.shelf = "";
    var tabs = el("div", "pv-shelves"), cards = el("div", "pv-cards");
    [{ g: "", rows: all }].concat(shelves).forEach(function (sh) {
      var b = button("pv-shelf" + (sh.g === view.shelf ? " on" : ""), function () { view.shelf = sh.g; render(); });
      add(b, document.createTextNode(sh.g || "Everything"), el("small", "", String(sh.rows.length)));
      tabs.appendChild(b);
    });
    tabs.appendChild(button("pv-fold", function () { show({ bare: true }); }, "Fold the shelves ⟩"));
    (view.shelf ? shelves.filter(function (sh) { return sh.g === view.shelf; }) : shelves).forEach(function (sh) {
      if (!view.shelf) cards.appendChild(el("h3", "pv-shelf-head", sh.g));
      sh.rows.forEach(function (g) { cards.appendChild(card(g)); });
    });
    return add(el("div", "pv-goods"), tabs, cards);
  }
  function drawShop(s, bare) {
    var p = look(s), stall = s.kind === "stall";
    var back = button("pv-back", function () { show({ spot: null, item: null, haul: false }); Cast.play(P, null); });
    var mini = el("span", "pv-mini"), dot = el("i");
    mini.style.backgroundImage = "url('" + M.mapImage + "')";
    dot.style.left = pinX(s) + "%";
    dot.style.top = pinY(s) + "%";
    add(back, add(mini, dot), el("span", "", "◀ Map"));
    var caption = el("div", "pv-caption");
    add(caption, el("div", "pv-kind", [KIND[s.kind], "No. " + s.n].filter(Boolean).join("  ·  ")), el("h1", "", s.name.split(":")[0]),
      p.keeper || s.keeper ? el("p", "pv-keeper", p.keeper || s.keeper) : null,
      p.greet ? el("p", "pv-greet", "“" + p.greet + "”") : null,
      el("p", "pv-look", s.look), p.blurb ? el("p", "pv-blurb", p.blurb) : null);
    var cls = "pv-shopview" + (stall ? "" : " no-goods") + (p.theme && p.theme.side === "left" ? " flip" : "");
    var unfold = stall && bare ? button("pv-unfold", function () { show({ bare: false }); }, "⟨ The shelves") : null;
    return add(el("section", cls), add(el("div", "pv-left"), back, caption), stall ? drawGoods(s) : null, unfold);
  }

  // ---- the pop-up: one item, its picture and everything known about it ----
  function rules(g) {
    var box = el("div", "pv-pop-rules"), full = g.mystery ? null : Cast.fullText(TEXTS, g.key);
    if (g.mystery) return add(box, el("p", "pv-pop-unknown", g.sealed ? "Sealed. He opens it when it is paid for, not before." : "What it does is not known. Ask the keeper, or cast identify on it."));
    if (!full) return null;
    Cast.rulesNodes(full, TEXTS.credit).forEach(function (n) { box.appendChild(n); });
    return box;
  }
  function drawPopup(s, itemKey) {
    var g = goods(s).filter(function (x) { return x.key === itemKey; })[0];
    if (!g) return null; // a service, or a row the players may not see: nothing to hold up
    var full = g.mystery ? null : Cast.fullText(TEXTS, g.key);
    var veil = el("div", "pv-spot");
    veil.addEventListener("click", function (e) { if (e.target === veil) show({ item: null }); });
    var pop = el("div", "pv-pop" + rarityClass(g) + (g.mystery ? " mystery" : "") + (view.unveiled === g.key ? " unveil" : ""));
    var art = add(el("div", "pv-pop-art"), el("span", "pv-rays"), tile(g, "pv-pop-tile"));
    var body = el("div", "pv-pop-body");
    var type = g.mystery ? (g.sealed ? "Sealed letter" : "Unidentified") : full ? full.type : [g.rarity, g.g].filter(Boolean).join("  ·  ");
    add(body, el("span", "pv-shelf-name", [g.g, s.name.split(":")[0]].filter(Boolean).join("  ·  ")),
      el("h2", "pv-pop-name", g.name), el("span", "pv-pop-type", type),
      add(el("div", "pv-pop-buy"), priceOf(g), el("span", "pv-meta", onHand(g))),
      el("p", "pv-pop-line", g.text), rules(g));
    var stamped = view.stamp && view.stamp.key === g.key;
    if (g.left === 0 || stamped) body.appendChild(el("span", "pv-stamp" + (stamped ? " hit" : ""), stamped ? "Sold to " + view.stamp.who : "Sold"));
    add(pop, button("pv-pop-x", function () { show({ item: null }); }, "✕"), art, body);
    return add(veil, pop);
  }

  // ---- the haul: what everyone bought ----
  function drawHaul() {
    var buyers = Cast.haul(view.ledger), wrap = el("section", "pv-haul"), cols = el("div", "pv-haul-cols");
    wrap.addEventListener("click", function () { show({ haul: false }); });
    buyers.forEach(function (b) {
      var col = el("div", "pv-haul-col"), ul = el("ul");
      b.items.forEach(function (it) { add(ul, add(el("li"), el("span", "", it.item), el("b", "", it.paid))); });
      var sum = [b.sc ? b.sc + " SC" : "", b.gp ? b.gp.toLocaleString("en-US") + " gp" : ""].filter(Boolean).join("  ·  ");
      cols.appendChild(add(col, el("h2", "", b.who), ul, el("p", "pv-haul-sum", sum)));
    });
    var t = E.ledgerTotals(view.ledger);
    return add(wrap, el("h1", "", "The night's haul"),
      buyers.length ? cols : el("p", "pv-sub", "Nothing bought yet."),
      el("p", "pv-haul-total", "Spent on the floor: " + t.total + " SC" + (t.gold ? " and " + t.gold.toLocaleString("en-US") + " gp" : "")));
  }

  function render() {
    var scr = Cast.screen(), s = spotById(scr.spot);
    root.dataset.mode = scr.haul ? "haul" : s ? "shop" : "map";
    root.dataset.bare = scr.bare && s && !scr.haul ? "1" : "";
    drawScene(scr.haul ? null : s);
    drawHud();
    var stage = document.getElementById("pv-stage");
    var keep = stage.querySelector(".pv-cards"), scroll = keep ? keep.scrollTop : 0;
    var keepRules = stage.querySelector(".pv-pop-rules"), rulesScroll = keepRules ? keepRules.scrollTop : 0;
    stage.replaceChildren.apply(stage, scr.haul ? [drawHaul()] : s ? [drawShop(s, scr.bare), scr.item ? drawPopup(s, scr.item) : null].filter(Boolean) : [drawMap()]);
    var cards = stage.querySelector(".pv-cards"), rulesBox = stage.querySelector(".pv-pop-rules");
    if (cards) cards.scrollTop = scroll;
    if (rulesBox) rulesBox.scrollTop = rulesScroll;
  }

  // ---- the other window changed something ----
  function onLedger() {
    var next = Cast.load(K.ledger, []), added = Cast.newEntries(view.ledger, next), scr = Cast.screen();
    view.ledger = next;
    added.forEach(function (e) {
      toast(e.who + " bought " + e.item + "  ·  " + Cast.paid(e));
      if (scr.item === e.spot + "|" + e.item) {
        view.stamp = { key: scr.item, who: e.who };
        setTimeout(function () { view.stamp = null; show({ item: null }); }, STAMP_MS);
      }
    });
    if (added.length) coinSound();
    render();
  }
  function onRevealed() {
    var next = Cast.load(K.revealed, []);
    var added = next.filter(function (k) { return view.revealed.indexOf(k) === -1; });
    view.fresh = view.fresh.filter(function (k) { return next.indexOf(k) !== -1; }).concat(added);
    view.revealed = next;
    added.forEach(function (k) {
      var s = spotById(k.split("|")[0]), g = s ? goods(s).filter(function (x) { return x.key === k; })[0] : null;
      toast("New on the shelf: " + (g ? g.name : k.split("|")[1]));
    });
    if (added.length) revealSound();
    render();
  }
  // The DM named a mysterious item: its true name comes out, and the pop-up shows it with a flash if it is open.
  function onIdentified() {
    var next = Cast.load(K.identified, []);
    var added = next.filter(function (k) { return view.identified.indexOf(k) === -1; });
    var veiled = next.length < view.identified.length;
    view.identified = next;
    added.forEach(function (k) {
      var part = k.split("|"), v = ((P.mystery || {})[part[0]] || {})[part[1]] || {};
      toast((v.sealed ? "Opened: " : "Identified: ") + part[1]);
      view.unveiled = k;
      setTimeout(function () { if (view.unveiled === k) { view.unveiled = null; render(); } }, REVEAL_MS);
    });
    if (added.length) revealSound();
    else if (veiled) veilSound();
    render();
  }
  function onScreen() {
    var scr = Cast.screen(), s = spotById(scr.spot);
    var held = s && scr.item ? goods(s).filter(function (g) { return g.key === scr.item; })[0] : null;
    if (held) view.shelf = held.g; // the shelf behind the item the DM is holding up
    render();
  }

  function start() {
    document.title = P.title;
    root.hidden = false;
    root.className = "muted";
    Cast.save(K.screen, Object.assign(Cast.screen(), { item: null, haul: false })); // nothing held up from last time
    add(root, add(el("div", "pv-scene"), Object.assign(el("div"), { id: "pv-crop" }), Object.assign(document.createElement("img"), { id: "pv-art", alt: "" })),
      Object.assign(el("div"), { id: "pv-glow" }), Object.assign(el("div"), { id: "pv-fx" }), Object.assign(el("div"), { id: "pv-stage" }),
      Object.assign(el("div"), { id: "pv-hud" }), Object.assign(el("div"), { id: "pv-toast" }),
      el("div", "pv-sound-hint", "Click once anywhere to turn the sound on"));
    var art = document.getElementById("pv-art");
    art.addEventListener("load", function () { art.classList.add("ready"); });
    root.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var scr = Cast.screen();
      if (scr.haul) show({ haul: false });
      else if (scr.item) show({ item: null });
      else if (scr.spot) { show({ spot: null }); Cast.play(P, null); }
    });
    window.addEventListener("storage", function (e) {
      if (e.key === K.ledger) onLedger();
      else if (e.key === K.revealed) onRevealed();
      else if (e.key === K.identified) onIdentified();
      else if (e.key === K.screen) onScreen();
      else if (e.key === K.state) drawHud();
    });
    render();
  }

  start();
})();
