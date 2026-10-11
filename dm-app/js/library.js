// Library view (Maps / Books tabs) + shared "open a map in the right panel"
// helper used both from the library grid and from `map` scene blocks
// (render.js reads window.LIBRARY directly; a click on a map card bubbles up
// to app.js's delegated click handler via data-map-id, which calls openMap).
(function () {
  "use strict";
  var el = window.DMRender.el;

  var state = { tab: "maps", filter: "", sceneView: null, libraryView: null, content: null, tabBtns: [] };

  function matches(text) {
    if (!state.filter) return true;
    return (text || "").toLowerCase().indexOf(state.filter.toLowerCase()) !== -1;
  }

  function groupByChapter(list) {
    var order = [], groups = {};
    list.forEach(function (x) {
      var k = x.chapter || "Other";
      if (!groups[k]) { groups[k] = []; order.push(k); }
      groups[k].push(x);
    });
    return order.map(function (k) { return { chapter: k, items: groups[k] }; });
  }

  function renderMaps() {
    var maps = ((window.LIBRARY || {}).maps || []).filter(function (m) {
      return matches(m.title) || matches(m.chapter);
    });
    state.content.innerHTML = "";
    if (!maps.length) { state.content.appendChild(el("p", "lib-empty", "No maps found.")); return; }
    groupByChapter(maps).forEach(function (group) {
      state.content.appendChild(el("h3", "lib-chapter", group.chapter));
      var grid = el("div", "lib-map-grid");
      group.items.forEach(function (m) {
        var card = el("div", "lib-map-card");
        card.dataset.mapId = m.id;
        var img = document.createElement("img");
        img.className = "lib-map-thumb";
        img.src = "library/" + m.thumb;
        img.alt = m.title;
        card.appendChild(img);
        card.appendChild(el("div", "lib-map-title", m.title + (m.size ? " (" + m.size + ")" : "")));
        card.addEventListener("click", function () { openMap(m.id); });
        grid.appendChild(card);
      });
      state.content.appendChild(grid);
    });
  }

  function renderBooks() {
    var docs = ((window.LIBRARY || {}).docs || []).filter(function (d) {
      return matches(d.title) || matches(d.chapter);
    });
    state.content.innerHTML = "";
    if (!docs.length) { state.content.appendChild(el("p", "lib-empty", "No books found.")); return; }
    groupByChapter(docs).forEach(function (group) {
      state.content.appendChild(el("h3", "lib-chapter", group.chapter));
      var list = el("ul", "lib-book-list");
      group.items.forEach(function (d) {
        var li = el("li", "lib-book-item");
        var a = el("a", "lib-book-link", d.title + " (" + d.pages + " pp.)");
        a.href = "library/" + d.file;
        a.target = "_blank";
        a.rel = "noopener";
        li.appendChild(a);
        list.appendChild(li);
      });
      state.content.appendChild(list);
    });
  }

  function renderTab() {
    state.tabBtns.forEach(function (b) { b.classList.toggle("active", b.dataset.libTab === state.tab); });
    if (state.tab === "maps") renderMaps(); else renderBooks();
  }

  function openMap(mapId) {
    var map = ((window.LIBRARY || {}).maps || []).find(function (m) { return m.id === mapId; });
    if (!map) return;
    var wrap = el("div", "map-panel");
    var img = document.createElement("img");
    img.className = "map-panel-img";
    var variants = map.variants || {};
    var order = ["plain", "grid", "dm"];
    var labels = { plain: "Plain", grid: "Grid", dm: "DM" };
    var buttons = [];
    var current = order.filter(function (v) { return variants[v]; })[0];

    function show(v) {
      current = v;
      img.src = "library/" + variants[v];
      buttons.forEach(function (b) { b.classList.toggle("active", b.dataset.variant === v); });
    }

    wrap.appendChild(img);
    var btnRow = el("div", "map-panel-buttons");
    order.forEach(function (v) {
      if (!variants[v]) return;
      var b = el("button", "map-variant-btn", labels[v]);
      b.dataset.variant = v;
      b.addEventListener("click", function () { show(v); });
      btnRow.appendChild(b);
      buttons.push(b);
    });
    var openBtn = el("a", "map-open-full", "Open full size");
    openBtn.href = "#";
    openBtn.target = "_blank";
    openBtn.rel = "noopener";
    openBtn.addEventListener("click", function (e) { e.preventDefault(); window.open("library/" + variants[current], "_blank"); });
    btnRow.appendChild(openBtn);
    wrap.appendChild(btnRow);
    if (current) show(current);
    window.DMPanel.open("raw", wrap, map.title);
  }

  function open() {
    state.sceneView.classList.add("hidden");
    state.libraryView.classList.remove("hidden");
    renderTab();
  }
  function close() {
    state.libraryView.classList.add("hidden");
    state.sceneView.classList.remove("hidden");
  }
  function isOpen() { return !state.libraryView.classList.contains("hidden"); }

  function init(opts) {
    state.sceneView = opts.sceneView;
    state.libraryView = opts.libraryView;
    state.content = opts.content;
    state.tabBtns = Array.prototype.slice.call(opts.tabBtns);
    state.tabBtns.forEach(function (b) {
      b.addEventListener("click", function () { state.tab = b.dataset.libTab; renderTab(); });
    });
    opts.backBtn.addEventListener("click", close);
    opts.filterInput.addEventListener("input", function () { state.filter = opts.filterInput.value; renderTab(); });
  }

  window.DMLibrary = { init: init, open: open, close: close, isOpen: isOpen, openMap: openMap };
})();
