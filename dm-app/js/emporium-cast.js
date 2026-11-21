// What the two Emporium windows share: the DM page (emporium.html) and the players' monitor
// (emporium.html?view=players, js/emporium-players.js). Both are the same file, so they are the same origin
// even when opened from disk, and they talk through localStorage and its "storage" event, the way the combat
// window does (js/combat.js). Here: the pure helpers (tested in tests/emporium-players.test.js), the shared
// keys, the Spotify link, and the DM page's controls for the monitor.
(function () {
  "use strict";
  var inNode = typeof module !== "undefined" && module.exports;
  var Core = inNode ? require("./core.js") : window.DMCore;
  var nodeEmporium = inNode ? require("./emporium.js") : null;
  function emp() { return nodeEmporium || window.DMEmporium; } // in the browser js/emporium.js loads after this file

  var KEYS = {
    screen: "dmapp:emporium:screen",     // { spot, item, haul }: what the monitor shows
    ledger: "dmapp:emporium:ledger",     // the DM page's purchases
    state: "dmapp:emporium:state",       // the DM page's own state; the purses are read from it
    revealed: "dmapp:emporium:revealed", // keys of hidden rows the party has earned
    identified: "dmapp:emporium:identified", // keys of mysterious rows the DM has named on the monitor
    cast: "dmapp:emporium:cast",         // { follow, music, links }: the DM's switches and his own Spotify links
    playing: "dmapp:emporium:playing",   // the link opened last, so two windows do not restart one track
    secrets: "dmapp:emporium:secrets"    // "spot|secret id" of every secret the party has uncovered tonight
  };
  var FX = ["embers", "bubbles", "steam", "mist", "smoke", "motes", "ash", "snow"];
  var MARKET = "_market"; // the links entry for the market's own theme, played on the map

  // ---- pure helpers ----
  function key(spotId, name) { return spotId + "|" + Core.stripTags(name); }

  // How many of a row the stall has; null = as many as anyone wants.
  // "3 sheaves of 10" -> 3, "the last 2" -> 2, "the crown jewel" -> 1. A magic item with no count is the only one.
  function stockCount(it) {
    var q = String(it.qty || "");
    var m = /^(?:the last |up to )?(\d+)\b/.exec(q);
    if (m) return Number(m[1]);
    if (/crown jewel|^the lot$/.test(q)) return 1;
    if (q) return null;
    return !it.c && /^(uncommon|rare|very rare|legendary)$/.test(it.rarity || "") ? 1 : null;
  }
  // Ledger entries per row: one entry is one sold.
  function soldCounts(ledger) {
    return (Array.isArray(ledger) ? ledger : []).reduce(function (acc, e) {
      var next = Object.assign({}, acc), k = e.spot + "|" + e.item;
      next[k] = (acc[k] || 0) + 1;
      return next;
    }, {});
  }
  function onHand(it, sold) {
    var n = stockCount(it);
    return n === null ? null : Math.max(0, n - (sold || 0));
  }
  // A row the players do not see until the DM reveals it: favour-only, or on the hide list.
  function isHidden(spot, it, players) {
    return !!it.favourOnly || ((players.hide || {})[spot.id] || []).indexOf(Core.stripTags(it.name)) !== -1;
  }
  // A row the monitor shows under a veil until the DM names it: { name, text } from the players' file, or null.
  function mysteryOf(spot, it, players) { return ((players.mystery || {})[spot.id] || {})[Core.stripTags(it.name)] || null; }
  // The cards of one stall for the monitor: no hidden rows unless revealed, the players' line instead of the DM's note,
  // and a mysterious row under its veil (no true name, no rarity, no description) until it is identified.
  function publicGoods(spot, players, revealed, ledger, identified) {
    var say = (players.say || {})[spot.id] || {}, shown = Array.isArray(revealed) ? revealed : [], sold = soldCounts(ledger);
    var named = Array.isArray(identified) ? identified : [];
    return (spot.stock || []).map(function (it) {
      var name = Core.stripTags(it.name), k = key(spot.id, it.name), hidden = isHidden(spot, it, players);
      if (hidden && shown.indexOf(k) === -1) return null;
      var priced = it.sc > 0, veil = mysteryOf(spot, it, players), mystery = !!veil && named.indexOf(k) === -1;
      return {
        // A sealed letter keeps its own name (the question) and hides only its contents (the answer).
        key: k, name: mystery ? veil.name || name : name, g: it.g || "", sealed: !!veil && !!veil.sealed,
        rarity: mystery ? (veil.sealed ? "sealed" : "unidentified") : it.rarity || "",
        sc: priced ? it.sc : null, gp: priced && !it.scOnly ? emp().goldPrice(it, spot) : null, extra: it.extra || "",
        qty: it.qty || "", left: onHand(it, sold[k]), bought: sold[k] || 0, revealed: hidden, mystery: mystery,
        identified: !!veil && !mystery, text: mystery ? veil.text : say[name] || Core.stripTags(it.note || "")
      };
    }).filter(Boolean);
  }
  // Where a row's picture sits: one tile of a sheet of side x side, as CSS background values. null: not painted yet.
  function sprite(art, k) {
    var at = art && art.at && art.at[k], side = (art && art.side) || 4;
    var src = at && art.sheets && art.sheets[String(at[0])];
    if (!src) return null;
    var step = 100 / (side - 1), col = at[1] % side, row = Math.floor(at[1] / side);
    return { src: src, size: side * 100 + "% " + side * 100 + "%", pos: +(col * step).toFixed(4) + "% " + +(row * step).toFixed(4) + "%" };
  }
  // The full rules text of a row ({ type, text: [paragraph or { table }] }), or null for a row with only its own line.
  function fullText(texts, k) {
    var id = texts && texts.rows && texts.rows[k];
    return id && texts.entries[id] ? texts.entries[id] : null;
  }
  // What is left of a purse set at the recap; what was spent when none was set.
  function purse(state, ledger) {
    var t = emp().ledgerTotals(ledger), s = state || {};
    function one(size, spent) {
      var n = Number(size);
      return n > 0 ? { set: true, value: emp().priceAfter(n - spent, 1) } : { set: false, value: spent };
    }
    return { coins: one(s.purse, t.total), gold: one(s.purseGp, t.gold) };
  }
  function inGold(e) { return typeof e.gp === "number" && typeof e.sc !== "number"; }
  function paid(e) { return inGold(e) ? e.gp + " gp" : (Number(e.sc) || 0) + " SC"; }
  // The end-of-night recap: one block per buyer, in the order they first bought.
  function haul(ledger) {
    var list = Array.isArray(ledger) ? ledger : [];
    var buyers = list.map(function (e) { return e.who; }).filter(function (w, i, all) { return all.indexOf(w) === i; });
    return buyers.map(function (who) {
      var mine = list.filter(function (e) { return e.who === who; });
      function sum(gold) {
        return emp().priceAfter(mine.filter(function (e) { return inGold(e) === gold; })
          .reduce(function (n, e) { return n + (Number(gold ? e.gp : e.sc) || 0); }, 0), 1);
      }
      return { who: who, sc: sum(false), gp: sum(true), items: mine.map(function (e) { return { item: e.item, spotName: e.spotName || "", paid: paid(e) }; }) };
    });
  }
  // Ledger entries the monitor has not seen yet (an entry is known by its time stamp).
  function newEntries(before, after) {
    var seen = (Array.isArray(before) ? before : []).map(function (e) { return e.at; });
    return (Array.isArray(after) ? after : []).filter(function (e) { return seen.indexOf(e.at) === -1; });
  }
  // A Spotify share link or URI as the URI the desktop app opens; anything else is refused.
  function spotifyUri(link) {
    var s = String(link == null ? "" : link).trim();
    var m = /^https:\/\/open\.spotify\.com\/(?:intl-[a-z]{2}\/)?(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]{22})(?:[?#].*)?$/.exec(s) ||
      /^spotify:(track|album|playlist|artist|episode|show):([A-Za-z0-9]{22})$/.exec(s);
    return m ? "spotify:" + m[1] + ":" + m[2] : null;
  }
  // What the keeper says, out of a riddle's "She hums, then asks: '...'": the monitor shows the words, not the staging.
  function spoken(ask) {
    var s = String(ask || ""), i = s.indexOf(": '");
    return (i === -1 ? s : s.slice(i + 2)).trim().replace(/^'|'$/g, "");
  }

  var Cast = {
    KEYS: KEYS, FX: FX, key: key, stockCount: stockCount, soldCounts: soldCounts, onHand: onHand, isHidden: isHidden,
    mysteryOf: mysteryOf, publicGoods: publicGoods, sprite: sprite, fullText: fullText, purse: purse, haul: haul, paid: paid,
    newEntries: newEntries, spotifyUri: spotifyUri, spoken: spoken
  };
  if (inNode) { module.exports = Cast; return; }

  // ---- shared storage ----
  function load(k, fallback) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v === null || v === undefined ? fallback : v; } catch (e) { return fallback; }
  }
  function save(k, value) {
    try { localStorage.setItem(k, JSON.stringify(value)); return true; } catch (e) { return false; }
  }
  function castState() { return Object.assign({ follow: true, music: true, links: {} }, load(KEYS.cast, {})); }
  // bare: the shop's goods panel is folded away on the monitor, so the painting shows whole
  // secret: "spot|id" of the secret card the monitor is holding up, or null; riddle: "spot|index" of a riddle on it
  var CLEAR = { item: null, haul: false, bare: false, secret: null, riddle: null };
  function screen() { return Object.assign({ spot: null }, CLEAR, load(KEYS.screen, {})); }

  // ---- music: a location click starts its playlist in the Spotify app, quietly ----
  // Through the helper tools/spotify-remote.mjs (the Web API): opening a spotify: link instead brought the Spotify
  // window up every time and only showed a playlist without playing it (the DM, 2026-11-21).
  var REMOTE = "http://127.0.0.1:8888";
  // the guide, rendered by GitHub (a .md opened from disk does not render in Firefox)
  var HOW_TO = "https://github.com/Karolis332/Avernus/blob/main/dm-app/docs/emporium-night.md";
  var HELPER_OFF ="♪ Music helper off: close this page and double-click dm-app/start-emporium.cmd";
  var musicNote = function () {}; // the DM page shows what the helper says; the monitor shows nothing
  function linkFor(players, spotId) {
    var own = castState().links[spotId || MARKET];
    return own !== undefined ? own : (spotId ? (players.spots[spotId] || {}).music : players.music) || "";
  }
  // Called from a click only. force: the play button; otherwise a link that is already playing is left alone.
  function play(players, spotId, force) {
    var uri = spotifyUri(linkFor(players, spotId));
    if (!uri || (!force && (!castState().music || load(KEYS.playing, null) === uri))) return false;
    save(KEYS.playing, uri);
    fetch(REMOTE + "/play?uri=" + encodeURIComponent(uri)).then(function (r) { return r.json(); }).then(function (res) {
      if (res.ok) return musicNote("♪ Playing in Spotify.");
      save(KEYS.playing, null);
      musicNote("♪ " + res.error);
    }, function () {
      save(KEYS.playing, null);
      if (force) window.location.href = uri; // the ▶ button with the helper off: the old way, the Spotify window comes up
      musicNote(HELPER_OFF);
    });
    return true;
  }

  // ---- the DM page's controls for the monitor ----
  // opts: players (the players' data), onSpot(id) (the monitor was clicked: follow it), message(text) (a line for the DM)
  function dmInit(opts) {
    var el = window.DMRender.el, players = opts.players;
    function tell(ok) { if (!ok) opts.message("Could not save in this browser: the monitor will not follow."); }
    function setCast(change) { tell(save(KEYS.cast, Object.assign(castState(), change))); }
    function show(change) { tell(save(KEYS.screen, Object.assign(screen(), change, { at: Date.now() }))); }
    function button(label, cls, onClick) {
      var b = el("button", cls, label);
      b.type = "button";
      b.addEventListener("click", onClick);
      return b;
    }
    function tick(label, name) {
      var wrap = el("label", "tick"), box = document.createElement("input");
      box.type = "checkbox";
      box.checked = !!castState()[name];
      box.addEventListener("change", function () { var c = {}; c[name] = box.checked; setCast(c); });
      wrap.appendChild(box);
      wrap.appendChild(document.createTextNode(" " + label));
      return wrap;
    }
    // A Spotify link field: the DM's own link, or the one from the data until he pastes another.
    function musicField(spotId, label) {
      var wrap = el("div", "music"), input = document.createElement("input"), note = el("span", "music-note");
      input.type = "url";
      input.placeholder = "paste a Spotify link (Share, Copy link)";
      input.value = linkFor(players, spotId);
      function check() { note.textContent = input.value.trim() && !spotifyUri(input.value) ? "Not a Spotify link." : ""; }
      input.addEventListener("change", function () {
        var links = Object.assign({}, castState().links);
        links[spotId || MARKET] = input.value.trim();
        setCast({ links: links });
        check();
      });
      wrap.appendChild(el("span", "music-label", "♪ " + label));
      wrap.appendChild(input);
      wrap.appendChild(button("▶", "btn small", function () {
        note.textContent = play(players, spotId, true) ? "Sent to Spotify." : "No Spotify link here yet.";
      }));
      wrap.appendChild(note);
      check();
      return wrap;
    }

    function howTo() {
      var a = el("a", "", "How to run the night");
      a.href = HOW_TO;
      a.target = "_blank";
      return a;
    }
    var status = el("span", "music-note");
    musicNote = function (text) { status.textContent = text; };
    fetch(REMOTE + "/status").then(function (r) { return r.json(); }).then(function (res) {
      if (res.setup && res.connected) return musicNote("♪ Quiet music is on.");
      var a = el("a", "", res.setup ? "Connect Spotify" : "Set up the music (once on this computer)");
      a.href = res.login;
      a.target = "_blank";
      status.replaceChildren("♪ ", a);
    }, function () { musicNote(HELPER_OFF); });

    var bar = document.getElementById("cast-bar");
    bar.replaceChildren(
      button("📺 Player screen", "btn go", function () { window.open("emporium.html?view=players", "dm-emporium-players"); }),
      tick("Monitor follows my clicks", "follow"),
      button("Map on monitor", "btn", function () { show(Object.assign({ spot: null }, CLEAR)); play(players, null); }),
      button("Fold / unfold the shelves", "btn", function () { show({ bare: !screen().bare }); }),
      button("Show the haul", "btn", function () { show({ item: null, haul: true }); }),
      tick("Music changes with the place", "music"),
      musicField(null, "Market theme"),
      status,
      howTo()
    );
    save(KEYS.playing, null); // a new night: the first click plays, whatever played last time

    // The monitor was clicked: go to the same spot here.
    window.addEventListener("storage", function (e) {
      if (e.key !== KEYS.screen || !castState().follow) return;
      var s = screen();
      if (s.spot) opts.onSpot(s.spot);
    });

    function has(store, k) { return load(store, []).indexOf(k) !== -1; }
    return {
      // A new night: nothing earned on the last one stays (the ledger is cleared by the page that owns it).
      newNight: function () {
        [KEYS.revealed, KEYS.identified, KEYS.secrets].forEach(function (k) { tell(save(k, [])); });
        save(KEYS.playing, null);
        show(Object.assign({ spot: null }, CLEAR));
      },
      // A riddle won: a hidden row appears on the monitor (or goes again). Returns whether it is now shown.
      reveal: function (spotId, name) {
        var k = key(spotId, name), on = !has(KEYS.revealed, k), rest = load(KEYS.revealed, []).filter(function (x) { return x !== k; });
        tell(save(KEYS.revealed, on ? rest.concat([k]) : rest));
        if (on && screen().riddle) show({ riddle: null }); // answered: the riddle goes down so the shelf's glow shows
        return on;
      },
      isRevealed: function (spotId, name) { return has(KEYS.revealed, key(spotId, name)); },
      // A secret earned: the monitor shows its card (on) or puts it away; once shown it stays on the night's list.
      secret: function (spotId, id, on) {
        var k = spotId + "|" + id;
        if (on && !has(KEYS.secrets, k)) tell(save(KEYS.secrets, load(KEYS.secrets, []).concat([k])));
        show(on ? { secret: k, riddle: null } : { secret: null });
      },
      secretState: function (spotId, id) {
        var k = spotId + "|" + id;
        return { shown: screen().secret === k, uncovered: has(KEYS.secrets, k) };
      },
      // The DM chose a spot: the monitor goes there and its music starts, unless he is looking privately.
      spot: function (id) { if (castState().follow) { show(Object.assign({ spot: id }, CLEAR)); play(players, id); } },
      // A riddle asked: the monitor shows the keeper's words until it is answered or taken down.
      riddle: function (spotId, i, on) { show({ riddle: on ? spotId + "|" + i : null }); },
      riddleShown: function (spotId, i) { return screen().riddle === spotId + "|" + i; },
      // Paid for: a sealed letter opens, and the monitor shows what is written in it.
      bought: function (spotId, name) {
        var v = ((players.mystery || {})[spotId] || {})[Core.stripTags(name)], k = key(spotId, name), list = load(KEYS.identified, []);
        if (v && v.sealed && list.indexOf(k) === -1) tell(save(KEYS.identified, list.concat([k])));
      },
      // The DM pressed Buy: the monitor holds that item up. null puts it down.
      item: function (spotId, name) {
        if (!castState().follow) return;
        show(name ? { spot: spotId, item: key(spotId, name), haul: false } : { item: null });
      },
      // A hidden row gets a Reveal switch, a mysterious one an Identify switch; any other row gets nothing.
      rowControls: function (spot, it, redraw) {
        var k = key(spot.id, it.name), veil = mysteryOf(spot, it, players), out = [];
        function toggle(store, label, onText, offText, onBtn, offBtn) {
          var on = load(store, []).indexOf(k) !== -1;
          var wrap = el("span", "qty hidden-row " + label, on ? onText : offText);
          wrap.appendChild(button(on ? onBtn : offBtn, "btn small", function () {
            // read again: a purchase may have opened a letter since this row was drawn
            var now = load(store, []).filter(function (x) { return x !== k; });
            tell(save(store, on ? now : now.concat([k])));
            redraw();
          }));
          return wrap;
        }
        if (isHidden(spot, it, players)) out.push(toggle(KEYS.revealed, "rv", "revealed on the monitor ", "hidden from the players ", "Hide again", "Reveal"));
        if (veil && veil.sealed) out.push(toggle(KEYS.identified, "id", "open on the monitor ", "sealed on the monitor ", "Seal again", "Open the seal"));
        else if (veil) out.push(toggle(KEYS.identified, "id", "named on the monitor ", "on the monitor as '" + veil.name + "' ", "Veil again", "Identify"));
        if (!out.length) return null;
        var box = el("span", "row-controls");
        out.forEach(function (n) { box.appendChild(n); });
        return box;
      },
      musicField: function (spot) { return musicField(spot.id, "Music here"); }
    };
  }

  // The full rules text as nodes, for the monitor's pop-up and the DM page alike. The text is our own generated
  // file (tools/build_item_text.py); it is escaped before the two markers it uses, **bold** and _italic_, become tags.
  function rulesNodes(entry, credit) {
    var el = window.DMRender.el;
    function rich(text) {
      var p = el("p");
      p.innerHTML = String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/\*\*_?(.+?)_?\*\*/g, "<b>$1</b>").replace(/(^|[\s(])_(.+?)_(?=[\s.,;:)]|$)/g, "$1<i>$2</i>");
      return p;
    }
    function table(rows) {
      var t = el("table", "pv-rules-table");
      rows.forEach(function (r, i) {
        var tr = el("tr");
        r.forEach(function (c) { tr.appendChild(el(i ? "td" : "th", "", c.replace(/\*\*|_/g, ""))); });
        t.appendChild(tr);
      });
      return t;
    }
    var out = entry.text.map(function (para) { return typeof para === "string" ? rich(para) : table(para.table); });
    if (credit) out.push(el("p", "pv-credit credit", credit));
    return out;
  }

  Cast.rulesNodes = rulesNodes;
  Cast.load = load;
  Cast.save = save;
  Cast.screen = screen;
  Cast.castState = castState;
  Cast.play = play;
  Cast.dmInit = dmInit;
  window.DMEmporiumCast = Cast;
})();
