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
    cast: "dmapp:emporium:cast",         // { follow, music, links }: the DM's switches and his own Spotify links
    playing: "dmapp:emporium:playing"    // the link opened last, so two windows do not restart one track
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
  // The cards of one stall for the monitor: no hidden rows unless revealed, the players' line instead of the DM's note.
  function publicGoods(spot, players, revealed, ledger) {
    var say = (players.say || {})[spot.id] || {}, shown = Array.isArray(revealed) ? revealed : [], sold = soldCounts(ledger);
    return (spot.stock || []).map(function (it) {
      var name = Core.stripTags(it.name), k = key(spot.id, it.name), hidden = isHidden(spot, it, players);
      if (hidden && shown.indexOf(k) === -1) return null;
      var priced = it.sc > 0;
      return {
        key: k, name: name, g: it.g || "", rarity: it.rarity || "", sc: priced ? it.sc : null,
        gp: priced && !it.scOnly ? emp().goldPrice(it, spot) : null, extra: it.extra || "", qty: it.qty || "",
        left: onHand(it, sold[k]), bought: sold[k] || 0, revealed: hidden, text: say[name] || Core.stripTags(it.note || "")
      };
    }).filter(Boolean);
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

  var Cast = {
    KEYS: KEYS, FX: FX, key: key, stockCount: stockCount, soldCounts: soldCounts, onHand: onHand, isHidden: isHidden,
    publicGoods: publicGoods, purse: purse, haul: haul, paid: paid, newEntries: newEntries, spotifyUri: spotifyUri
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
  function screen() { return Object.assign({ spot: null, item: null, haul: false }, load(KEYS.screen, {})); }

  // ---- music: a location click opens its Spotify link in the desktop app ----
  function linkFor(players, spotId) {
    var own = castState().links[spotId || MARKET];
    return own !== undefined ? own : (spotId ? (players.spots[spotId] || {}).music : players.music) || "";
  }
  // Called from a click only. force: the play button; otherwise a link that is already playing is left alone.
  function play(players, spotId, force) {
    var uri = spotifyUri(linkFor(players, spotId));
    if (!uri || (!force && (!castState().music || load(KEYS.playing, null) === uri))) return false;
    save(KEYS.playing, uri);
    // A hidden frame: if no Spotify app answers the link, the frame fails and the page stays.
    var frame = document.getElementById("spotify-frame") || document.createElement("iframe");
    frame.id = "spotify-frame";
    frame.hidden = true;
    if (!frame.parentNode) document.body.appendChild(frame);
    frame.src = uri;
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

    var bar = document.getElementById("cast-bar");
    bar.replaceChildren(
      button("📺 Player screen", "btn go", function () { window.open("emporium.html?view=players", "dm-emporium-players"); }),
      tick("Monitor follows my clicks", "follow"),
      button("Map on monitor", "btn", function () { show({ spot: null, item: null, haul: false }); play(players, null); }),
      button("Show the haul", "btn", function () { show({ item: null, haul: true }); }),
      tick("Music changes with the place", "music"),
      musicField(null, "Market theme")
    );
    save(KEYS.playing, null); // a new night: the first click plays, whatever played last time

    // The monitor was clicked: go to the same spot here.
    window.addEventListener("storage", function (e) {
      if (e.key !== KEYS.screen || !castState().follow) return;
      var s = screen();
      if (s.spot) opts.onSpot(s.spot);
    });

    return {
      // The DM chose a spot: the monitor goes there and its music starts, unless he is looking privately.
      spot: function (id) { if (castState().follow) { show({ spot: id, item: null, haul: false }); play(players, id); } },
      // The DM pressed Buy: the monitor holds that item up. null puts it down.
      item: function (spotId, name) {
        if (!castState().follow) return;
        show(name ? { spot: spotId, item: key(spotId, name), haul: false } : { item: null });
      },
      // A hidden row gets a badge and a switch; any other row gets nothing.
      rowControls: function (spot, it, redraw) {
        if (!isHidden(spot, it, players)) return null;
        var k = key(spot.id, it.name), shown = load(KEYS.revealed, []), on = shown.indexOf(k) !== -1;
        var wrap = el("span", "qty hidden-row", on ? "revealed on the monitor " : "hidden from the players ");
        wrap.appendChild(button(on ? "Hide again" : "Reveal", "btn small", function () {
          tell(save(KEYS.revealed, on ? shown.filter(function (x) { return x !== k; }) : shown.concat([k])));
          redraw();
        }));
        return wrap;
      },
      musicField: function (spot) { return musicField(spot.id, "Music here"); }
    };
  }

  Cast.load = load;
  Cast.save = save;
  Cast.screen = screen;
  Cast.castState = castState;
  Cast.play = play;
  Cast.dmInit = dmInit;
  window.DMEmporiumCast = Cast;
})();
