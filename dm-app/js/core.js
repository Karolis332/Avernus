// Pure logic only. No DOM. Loaded as a plain <script> tag (window.DMCore)
// and also exported for `node tests/core.test.js`.
(function () {
  "use strict";

  // ---- tag parsing -------------------------------------------------------
  // Splits text into an array of tokens: plain text runs + {@tag ...} tags.
  var TAG_RE = /\{@(\w+)\s*([^}]*)\}/g;

  function splitBody(body) {
    var parts = body.split("|");
    return { first: (parts[0] || "").trim(), second: parts[1] !== undefined ? parts[1].trim() : null };
  }

  function parseTags(text) {
    text = text == null ? "" : String(text);
    var tokens = [];
    var lastIndex = 0;
    var m;
    TAG_RE.lastIndex = 0;
    while ((m = TAG_RE.exec(text))) {
      if (m.index > lastIndex) {
        tokens.push({ type: "text", text: text.slice(lastIndex, m.index) });
      }
      var tag = m[1].toLowerCase();
      var body = splitBody(m[2]);
      if (tag === "c" || tag === "side" || tag === "scene") {
        tokens.push({ type: tag, id: body.first, label: body.second });
      } else if (tag === "spell") {
        tokens.push({ type: "spell", name: body.first, src: (body.second || "phb").toLowerCase() });
      } else if (tag === "item") {
        tokens.push({ type: "item", name: body.first, src: (body.second || "dmg").toLowerCase() });
      } else if (tag === "dice") {
        tokens.push({ type: "dice", expr: body.first });
      } else if (tag === "b" || tag === "i") {
        tokens.push({ type: tag, text: m[2].trim() });
      } else {
        // unknown tag: keep literal text so nothing is silently lost
        tokens.push({ type: "text", text: m[0] });
      }
      lastIndex = TAG_RE.lastIndex;
    }
    if (lastIndex < text.length) {
      tokens.push({ type: "text", text: text.slice(lastIndex) });
    }
    return tokens;
  }

  function stripTags(text) {
    return parseTags(text)
      .map(function (t) {
        if (t.type === "text" || t.type === "b" || t.type === "i") return t.text;
        if (t.type === "c" || t.type === "side" || t.type === "scene") return t.label || t.id;
        if (t.type === "spell" || t.type === "item") return t.name;
        if (t.type === "dice") return t.expr;
        return "";
      })
      .join("");
  }

  // ---- dice ---------------------------------------------------------------
  var DICE_RE = /^\s*(\d+)d(\d+)\s*([+-]\s*\d+)?\s*$/i;

  function rollDice(expr, rng) {
    rng = rng || Math.random;
    var m = DICE_RE.exec(expr);
    if (!m) return { expr: expr, rolls: [], mod: 0, total: 0, error: "bad dice expression" };
    var n = parseInt(m[1], 10);
    var d = parseInt(m[2], 10);
    var mod = m[3] ? parseInt(m[3].replace(/\s+/g, ""), 10) : 0;
    var rolls = [];
    for (var i = 0; i < n; i++) {
      rolls.push(1 + Math.floor(rng() * d));
    }
    var total = rolls.reduce(function (a, b) { return a + b; }, 0) + mod;
    return { expr: expr, rolls: rolls, mod: mod, total: total };
  }

  function abilityMod(score) {
    return Math.floor((score - 10) / 2);
  }

  // Initiative bonus: creature.init (a 2024-style static bonus) overrides DEX
  // mod when set; otherwise the classic d20 + DEX mod.
  function initiativeBonus(creature) {
    if (!creature) return 0;
    if (creature.init != null) return creature.init;
    return creature.abilities ? abilityMod(creature.abilities.dex || 10) : 0;
  }

  // ---- search ranking -------------------------------------------------------
  // Tiers (higher = better): 4 exact phrase, 3 word-prefix, 2 all-words-present,
  // 1 subsequence, 0/-1 no match.
  function fuzzyScore(haystack, query) {
    if (!query) return -1;
    var h = String(haystack || "").toLowerCase();
    var q = String(query).toLowerCase().trim();
    if (!q) return -1;
    if (h.indexOf(q) !== -1) return 4;

    var qWords = q.split(/\s+/).filter(Boolean);
    if (qWords.length && qWords.every(function (w) { return new RegExp("\\b" + escapeRe(w)).test(h); })) {
      return 3;
    }
    if (qWords.length && qWords.every(function (w) { return h.indexOf(w) !== -1; })) {
      return 2;
    }
    // subsequence: letters of q appear in order anywhere in h, but keep it
    // tight — a loose subsequence match (e.g. "srx" sprawled across an
    // unrelated paragraph) is noise, not a typo. Reject when the matched
    // span is more than 2.5x the query length; that still tolerates one or
    // two missing/extra letters ("manticor" -> "manticore", "torogr" ->
    // "tower ogre") without matching everything.
    var qi = 0;
    var matchStart = -1;
    var matchEnd = -1;
    for (var i = 0; i < h.length && qi < q.length; i++) {
      if (h[i] === q[qi]) {
        if (matchStart === -1) matchStart = i;
        matchEnd = i;
        qi++;
      }
    }
    if (qi === q.length) {
      var span = matchEnd - matchStart + 1;
      if (span <= q.length * 2.5) return 1;
    }
    return -1;
  }

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // ---- initiative -----------------------------------------------------------
  // combatant: { init:Number, dex:Number, isPC:Boolean }
  function compareInitiative(a, b) {
    if (b.init !== a.init) return b.init - a.init;
    if ((b.dex || 0) !== (a.dex || 0)) return (b.dex || 0) - (a.dex || 0);
    var aPC = a.isPC ? 1 : 0;
    var bPC = b.isPC ? 1 : 0;
    return bPC - aPC;
  }

  function sortInitiative(list) {
    return list.slice().sort(compareInitiative);
  }

  // order: array of row objects (opaque to this function, just needs .legendaryUsed optionally)
  // returns { idx, round, order } — order is a NEW array (legendary pips reset on the entering row).
  function nextTurn(order, idx, round) {
    if (!order || !order.length) return { idx: 0, round: round || 1, order: order || [] };
    var nextIdx = (idx + 1) % order.length;
    var wrapped = nextIdx === 0;
    var nextRound = wrapped ? (round || 1) + 1 : (round || 1);
    var newOrder = order.map(function (row, i) {
      // tracker rows carry a legendaryCount (how many pips); some callers may
      // instead pass the raw creature's `legendary` object — accept either.
      var isLegendary = row && ((row.legendaryCount && row.legendaryCount > 0) || row.legendary);
      if (i === nextIdx && isLegendary) {
        return Object.assign({}, row, { legendaryUsed: 0 });
      }
      return row;
    });
    return { idx: nextIdx, round: nextRound, order: newOrder };
  }

  function prevTurn(order, idx, round) {
    if (!order || !order.length) return { idx: 0, round: round || 1 };
    var prevIdx = (idx - 1 + order.length) % order.length;
    var wrapped = idx === 0;
    var prevRound = wrapped ? Math.max(1, (round || 1) - 1) : (round || 1);
    return { idx: prevIdx, round: prevRound };
  }

  // ---- combatant expansion ---------------------------------------------------
  // combatants: [{ c: "<creature id>", n: 1 }], creatures: SESSION.creatures
  // returns [{ cid, instanceId, instanceName, creature }]
  function expandCombatants(combatants, creatures) {
    var out = [];
    (combatants || []).forEach(function (entry) {
      var creature = creatures ? creatures[entry.c] : null;
      var n = entry.n || 1;
      for (var i = 1; i <= n; i++) {
        out.push({
          cid: entry.c,
          instanceId: entry.c + "-" + i,
          instanceName: n > 1 ? (creature ? creature.name : entry.c) + " " + i : (creature ? creature.name : entry.c),
          creature: creature
        });
      }
    });
    return out;
  }

  // ---- library (maps / book pages) ---------------------------------------
  // Mirrors tools/build_library.py's slugging so ids stay stable between the
  // Python builder and any JS code that needs to compute/verify one.
  function slugify(s) {
    return String(s || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  // Searches LIBRARY_TEXT (doc id -> [page text]) for a query. Returns
  // [{ docId, page (1-based), text, score }] sorted best-first, capped at `limit`.
  function searchLibraryText(libraryText, query, limit) {
    limit = limit || 6;
    if (!query || !query.trim() || !libraryText) return [];
    var out = [];
    Object.keys(libraryText).forEach(function (docId) {
      (libraryText[docId] || []).forEach(function (text, i) {
        var s = fuzzyScore(text, query);
        if (s >= 0) out.push({ docId: docId, page: i + 1, text: text, score: s });
      });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out.slice(0, limit);
  }

  // ---- campaign layer (Stage 1) ------------------------------------------
  // Merges window.CAMPAIGN into SESSION. Session wins on key conflicts.
  // Works when campaign is undefined/missing — returns a shallow copy of
  // session (or {} if session itself is missing) with no campaign content.
  function mergeCampaign(session, campaign) {
    session = session || {};
    campaign = campaign || {};
    return Object.assign({}, session, {
      creatures: Object.assign({}, campaign.creatures, session.creatures),
      side: Object.assign({}, campaign.side, session.side)
    });
  }

  // Applies saved DM state (status/note) on top of a pin's defaults.
  // Returns a NEW pin object; never mutates the input.
  function applyPinState(pin, state) {
    var saved = (state && state[pin.id]) || {};
    return Object.assign({}, pin, {
      status: saved.status || pin.status || "open",
      note: saved.note || ""
    });
  }

  // Returns a NEW state object with pinId's entry patched (status and/or note).
  function setPinState(state, pinId, patch) {
    var current = (state && state[pinId]) || {};
    var next = {};
    next[pinId] = Object.assign({}, current, patch);
    return Object.assign({}, state, next);
  }

  // main = sum of `sessions` over main-path pins whose effective status is
  // open/changed. all = the same over every pin.
  function countSessionsLeft(pins, state) {
    var main = 0, all = 0;
    (pins || []).forEach(function (pin) {
      var effective = applyPinState(pin, state);
      var remaining = effective.status === "open" || effective.status === "changed";
      if (!remaining) return;
      var n = pin.sessions || 0;
      all += n;
      if (pin.path === "main") main += n;
    });
    return { main: main, all: all };
  }

  // ---- spellcasting trait parsing (render-time, no data changes) -----------
  // Splits a "Spellcasting"/"Innate Spellcasting" trait's free text into:
  //   intro  - the sentence(s) before the first group header
  //   groups - one per "Cantrips:"/"At will:"/"Nth (N slots):"/"N/day[ each]:"
  //            header, each { key, label, spells, and AT MOST ONE of
  //            slots|perDay|each (a number) }. Cantrips/At will carry none.
  //   outro  - a trailing sentence after the last group, if any
  // Returns null when no group header is found — caller falls back to
  // rendering the trait as plain text.
  var SPELL_HEADER_RE = /(Cantrips|At will)\s*:|(\d+)(st|nd|rd|th)(?:\s*level)?\s*\((\d+)(?:\s*slots?)?\)\s*:|(\d+)\/day each\s*:|(\d+)\/day\s*:/gi;

  // First ". " that still has text after it — separates a group's own spell
  // list from a trailing note sentence (e.g. Krull's "does not have raise
  // dead himself..."). No match (period is simply the end of the string) ->
  // no outro.
  function splitTrailingNote(remainder) {
    var m = /\.\s+(?=\S)/.exec(remainder);
    if (m) {
      return { spells: remainder.slice(0, m.index), outro: remainder.slice(m.index + m[0].length).trim() };
    }
    return { spells: remainder.replace(/\.\s*$/, ""), outro: "" };
  }

  function parseSpellcasting(text) {
    text = text == null ? "" : String(text);
    var headers = [];
    var m;
    SPELL_HEADER_RE.lastIndex = 0;
    while ((m = SPELL_HEADER_RE.exec(text))) {
      var h;
      if (m[1]) {
        h = { label: m[1] };
      } else if (m[2]) {
        h = { label: m[2] + m[3] + " level", slots: parseInt(m[4], 10) };
      } else if (m[5]) {
        h = { label: m[5] + "/day each", each: parseInt(m[5], 10) };
      } else {
        h = { label: m[6] + "/day", perDay: parseInt(m[6], 10) };
      }
      h.start = m.index;
      h.end = SPELL_HEADER_RE.lastIndex;
      headers.push(h);
    }
    if (!headers.length) return null;

    var outro = "";
    var groups = headers.map(function (h, i) {
      var segEnd = i + 1 < headers.length ? headers[i + 1].start : text.length;
      var seg = text.slice(h.end, segEnd);
      if (i === headers.length - 1) {
        var split = splitTrailingNote(seg);
        seg = split.spells;
        outro = split.outro;
      } else {
        seg = seg.replace(/\.\s*$/, "");
      }
      var spells = seg.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      var group = { key: "g" + i, label: h.label, spells: spells };
      if (h.slots != null) group.slots = h.slots;
      else if (h.perDay != null) group.perDay = h.perDay;
      else if (h.each != null) group.each = h.each;
      return group;
    });

    return { intro: text.slice(0, headers[0].start).trim(), groups: groups, outro: outro };
  }

  var DMCore = {
    parseTags: parseTags,
    stripTags: stripTags,
    rollDice: rollDice,
    abilityMod: abilityMod,
    initiativeBonus: initiativeBonus,
    parseSpellcasting: parseSpellcasting,
    fuzzyScore: fuzzyScore,
    compareInitiative: compareInitiative,
    sortInitiative: sortInitiative,
    nextTurn: nextTurn,
    prevTurn: prevTurn,
    expandCombatants: expandCombatants,
    slugify: slugify,
    searchLibraryText: searchLibraryText,
    mergeCampaign: mergeCampaign,
    applyPinState: applyPinState,
    setPinState: setPinState,
    countSessionsLeft: countSessionsLeft
  };

  if (typeof window !== "undefined") window.DMCore = DMCore;
  if (typeof module !== "undefined" && module.exports) module.exports = DMCore;
})();
