// Search index + overlay. Ranking delegated to DMCore.fuzzyScore (pure, tested).
(function () {
  "use strict";
  var el = window.DMRender.el;
  var Core = window.DMCore;

  function buildIndex(session) {
    var items = [];
    (session.scenes || []).forEach(function (scene) {
      var bodyText = (scene.blocks || []).map(blockText).join(" ");
      items.push({ category: "Scenes", id: scene.id, title: scene.title, body: bodyText, sceneId: scene.id });
    });
    Object.keys(session.side || {}).forEach(function (sid) {
      var side = session.side[sid];
      var bodyText = (side.blocks || []).map(blockText).join(" ");
      items.push({ category: "Side paths", id: sid, title: side.title || sid, body: bodyText, sideId: sid });
    });
    Object.keys(session.creatures || {}).forEach(function (cid) {
      var c = session.creatures[cid];
      var parts = [c.role || "", (c.traits || []).map(entryText).join(" "), (c.actions || []).map(entryText).join(" ")];
      if (c.legendary) parts.push((c.legendary.actions || []).map(entryText).join(" "));
      parts.push((c.tactics || []).join(" "));
      items.push({ category: "Creatures", id: cid, title: c.name, body: parts.join(" "), creatureId: cid });
    });
    ((window.LIBRARY || {}).maps || []).forEach(function (m) {
      items.push({ category: "Maps", id: m.id, title: m.title, body: m.chapter, mapId: m.id });
    });
    (((window.CAMPAIGN || {}).map || {}).pins || []).forEach(function (p) {
      items.push({ category: "Map", id: "pin-" + p.id, title: p.title, body: p.objective || "", pinId: p.id });
    });
    var seenRefs = {};
    (session.scenes || []).forEach(function (scene) {
      (scene.blocks || []).forEach(function (b) {
        collectRefs(blockRawText(b), seenRefs);
      });
    });
    Object.keys(seenRefs).forEach(function (key) {
      var r = seenRefs[key];
      items.push({ category: r.type === "spell" ? "Spells" : "Items", id: key, title: r.name, body: "", refType: r.type, refName: r.name, refSrc: r.src });
    });
    return items;
  }

  function entryText(e) { return e.name + " " + e.text; }
  function blockRawText(b) {
    if (b.text) return b.text;
    if (b.items) return b.items.join(" ");
    if (b.prompt) return b.prompt + " " + (b.items || []).map(function (i) { return i.label; }).join(" ");
    if (b.rows) return b.rows.map(function (r) { return r.join(" "); }).join(" ");
    return "";
  }
  function blockText(b) { return Core.stripTags(blockRawText(b)); }

  function collectRefs(text, out) {
    Core.parseTags(text).forEach(function (t) {
      if (t.type === "spell" || t.type === "item") {
        out[t.type + ":" + t.name.toLowerCase()] = { type: t.type, name: t.name, src: t.src };
      }
    });
  }

  function snippet(body, query) {
    if (!body) return "";
    var q = query.toLowerCase();
    var idx = body.toLowerCase().indexOf(q.split(/\s+/)[0]);
    var start = Math.max(0, idx - 30);
    var text = body.slice(start, start + 100).trim();
    return (start > 0 ? "…" : "") + text + (start + 100 < body.length ? "…" : "");
  }

  function renderSnippet(text, query) {
    var row = el("div", "search-result-snippet");
    var q = (query || "").trim().split(/\s+/)[0];
    if (!q) { row.textContent = text; return row; }
    var idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) { row.textContent = text; return row; }
    row.appendChild(document.createTextNode(text.slice(0, idx)));
    var mark = document.createElement("mark");
    mark.textContent = text.slice(idx, idx + q.length);
    row.appendChild(mark);
    row.appendChild(document.createTextNode(text.slice(idx + q.length)));
    return row;
  }

  function score(item, query) {
    var titleScore = Core.fuzzyScore(item.title, query);
    var bodyScore = Core.fuzzyScore(item.body, query);
    // a DM typing a name usually wants the creature, so creature names win title ties
    if (titleScore >= 0) return 100 + titleScore + (item.category === "Creatures" ? 5 : 0);
    if (bodyScore >= 0) return bodyScore;
    return -1;
  }

  function search(index, query) {
    if (!query || !query.trim()) return [];
    var scored = index
      .map(function (item) { return { item: item, score: score(item, query) }; })
      .filter(function (s) { return s.score >= 0; })
      .sort(function (a, b) { return b.score - a.score; });
    return scored.map(function (s) { return s.item; });
  }

  // ---- overlay UI -----------------------------------------------------------
  var state = { overlay: null, input: null, resultsEl: null, index: [], results: [], selected: 0, callbacks: {} };

  function groupResults(results) {
    // results arrive best-first, so groups are ordered by their best match (exact creature name beats a scene body hit)
    var order = [], groups = {};
    results.forEach(function (r) {
      if (!groups[r.category]) { groups[r.category] = []; order.push(r.category); }
      var cap = r.category === "Book pages" ? 6 : 4;   // keep every group on screen
      if (groups[r.category].length < cap) groups[r.category].push(r);
    });
    return order.filter(function (g) { return groups[g]; }).map(function (g) { return { name: g, items: groups[g] }; });
  }

  // ---- book pages (lazy LIBRARY_TEXT) ----------------------------------
  function ensureLibraryTextLoaded() {
    if (state.libraryTextLoading || window.LIBRARY_TEXT) return;
    state.libraryTextLoading = true;
    var s = document.createElement("script");
    s.src = "library/library-text.js";
    s.onload = function () { if (state.input) render(state.input.value); };
    s.onerror = function () { window.LIBRARY_TEXT = window.LIBRARY_TEXT || {}; };
    document.body.appendChild(s);
  }

  function bookPageResults(query) {
    ensureLibraryTextLoaded();
    if (!window.LIBRARY_TEXT) return [];
    var docs = (window.LIBRARY || {}).docs || [];
    var docById = {};
    docs.forEach(function (d) { docById[d.id] = d; });
    return Core.searchLibraryText(window.LIBRARY_TEXT, query, 6).map(function (h) {
      var doc = docById[h.docId];
      return {
        score: h.score - 0.5,   // rank below session content on equal raw score
        item: {
          category: "Book pages",
          id: h.docId + "-p" + h.page,
          title: (doc ? doc.title : h.docId) + " — p. " + h.page,
          body: h.text,
          bookHref: doc ? "library/" + doc.file + "#page=" + h.page : null
        }
      };
    });
  }

  function render(query) {
    var scored = state.index
      .map(function (item) { return { item: item, score: score(item, query) }; })
      .filter(function (s) { return s.score >= 0; });
    bookPageResults(query).forEach(function (s) { scored.push(s); });
    scored.sort(function (a, b) { return b.score - a.score; });
    state.results = scored.map(function (s) { return s.item; });
    state.selected = 0;
    state.resultsEl.innerHTML = "";
    var flat = [];
    groupResults(state.results).forEach(function (group) {
      state.resultsEl.appendChild(el("div", "search-group-label", group.name));
      group.items.forEach(function (item) {
        var row = el("div", "search-result");
        row.dataset.flatIndex = String(flat.length);
        var title = el("div", "search-result-title", item.title);
        row.appendChild(title);
        if (item.body) row.appendChild(renderSnippet(snippet(item.body, query), query));
        row.addEventListener("click", function () { activate(item); });
        state.resultsEl.appendChild(row);
        flat.push(row);
      });
    });
    if (query.trim()) {
      var footer = el("div", "search-footer", "Search 5e.tools for “" + query + "”");
      footer.addEventListener("click", function () {
        window.open("https://www.google.com/search?q=site%3A5e.tools+" + encodeURIComponent(query), "_blank");
      });
      state.resultsEl.appendChild(footer);
    }
    state.flat = flat;
    highlight();
  }

  function highlight() {
    (state.flat || []).forEach(function (row, i) { row.classList.toggle("selected", i === state.selected); });
    if (state.flat && state.flat[state.selected]) state.flat[state.selected].scrollIntoView({ block: "nearest" });
  }

  function activate(item) {
    close();
    if (item.sceneId) state.callbacks.onScene(item.sceneId, state.input.value);
    else if (item.sideId) state.callbacks.onSide(item.sideId);
    else if (item.creatureId) state.callbacks.onCreature(item.creatureId);
    else if (item.mapId) state.callbacks.onMap(item.mapId);
    else if (item.pinId) state.callbacks.onPin(item.pinId);
    else if (item.bookHref) window.open(item.bookHref, "_blank");
    else if (item.refType === "spell") window.open(window.DMRender.spellUrl(item.refName, item.refSrc), "_blank");
    else if (item.refType === "item") window.open(window.DMRender.itemUrl(item.refName, item.refSrc), "_blank");
  }

  function open() {
    state.overlay.classList.add("open");
    state.input.value = "";
    state.input.focus();
    render("");
  }
  function close() { state.overlay.classList.remove("open"); }
  function isOpen() { return state.overlay.classList.contains("open"); }

  function init(opts) {
    state.overlay = opts.overlay;
    state.input = opts.input;
    state.resultsEl = opts.resultsEl;
    state.callbacks = opts.callbacks;
    state.index = buildIndex(opts.session);
    state.input.addEventListener("input", function () { render(state.input.value); });
    state.input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); state.selected = Math.min(state.selected + 1, (state.flat || []).length - 1); highlight(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); state.selected = Math.max(state.selected - 1, 0); highlight(); }
      else if (e.key === "Enter") {
        e.preventDefault();
        var row = state.flat && state.flat[state.selected];
        if (row) row.dispatchEvent(new MouseEvent("click"));
        else if (state.input.value.trim()) window.open("https://www.google.com/search?q=site%3A5e.tools+" + encodeURIComponent(state.input.value), "_blank");
      } else if (e.key === "Escape") { close(); }
    });
    opts.closeBtn.addEventListener("click", close);
  }

  window.DMSearch = { init: init, open: open, close: close, isOpen: isOpen, buildIndex: buildIndex, search: search };
})();
