// Wires the session data to the DOM: session script injection, left scene
// list, center scene render, panel + search init, keyboard shortcuts.
(function () {
  "use strict";
  var el = window.DMRender.el;

  var dom = {};
  var app = { session: null, sceneId: null, visited: {} };

  function qs(sel) { return document.querySelector(sel); }

  function getSessionIdFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get("s");
  }

  function wantsCampaignFixture() {
    var params = new URLSearchParams(window.location.search);
    return params.get("fixture") === "1";
  }

  function pickSessionMeta() {
    var list = window.SESSIONS || [];
    var requested = getSessionIdFromUrl();
    if (requested) {
      // ?s= always wins, even for a session not registered in sessions/index.js
      // (e.g. the dm-app test fixture) — the file just needs to exist.
      var found = list.find(function (s) { return s.id === requested; });
      return found || { id: requested, title: requested };
    }
    return list[list.length - 1] || null;
  }

  function loadScript(src, onDone, onFail) {
    var script = document.createElement("script");
    script.src = src;
    script.onload = onDone;
    script.onerror = onFail || onDone;
    document.body.appendChild(script);
  }

  function loadSessionScript(id, onDone) {
    loadScript("sessions/" + id + ".js", onDone, function () {
      qs("#center").innerHTML = "<p class='load-error'>Could not load session '" + id + "'.</p>";
    });
  }

  function cacheDom() {
    dom.left = qs("#left");
    dom.sceneList = qs("#scene-list");
    dom.campaignNavGroup = qs("#campaign-nav-group");
    dom.campaignList = qs("#campaign-list");
    dom.sessionSwitcher = qs("#session-switcher");
    dom.center = qs("#center");
    dom.sceneView = qs("#scene-view");
    dom.sceneBanner = qs("#scene-banner");
    dom.sceneTitle = qs("#scene-title");
    dom.sceneDuration = qs("#scene-duration");
    dom.sceneBody = qs("#scene-body");
    dom.prevBtn = qs("#prev-scene");
    dom.nextBtn = qs("#next-scene");
    dom.subtitle = qs("#header-subtitle");
    dom.searchBtn = qs("#search-btn");
    dom.libraryBtn = qs("#library-btn");
    dom.mapBtn = qs("#map-btn");
    dom.libraryView = qs("#library-view");
    dom.libraryContent = qs("#library-content");
    dom.libraryTabs = document.querySelectorAll(".lib-tab");
    dom.libraryBack = qs("#library-back-btn");
    dom.libraryFilter = qs("#library-filter");
    dom.mapView = qs("#campaign-map-view");
    dom.helpBtn = qs("#help-btn");
    dom.helpPopover = qs("#help-popover");
    dom.panelEl = qs("#panel");
    dom.panelBody = qs("#panel-body");
    dom.panelTitle = qs("#panel-title");
    dom.panelBack = qs("#panel-back");
    dom.panelClose = qs("#panel-close");
    dom.searchOverlay = qs("#search-overlay");
    dom.searchInput = qs("#search-input");
    dom.searchResults = qs("#search-results");
    dom.searchClose = qs("#search-close");
  }

  function renderHeader() {
    document.title = app.session.title + " — DM";
    dom.subtitle.textContent = app.session.subtitle || "";
    dom.sessionSwitcher.innerHTML = "";
    (window.SESSIONS || []).forEach(function (s) {
      var opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.title;
      opt.selected = s.id === app.session.id;
      dom.sessionSwitcher.appendChild(opt);
    });
    dom.sessionSwitcher.addEventListener("change", function () {
      window.location.search = "?s=" + encodeURIComponent(dom.sessionSwitcher.value);
    });
  }

  function renderSceneList() {
    dom.sceneList.innerHTML = "";
    (app.session.scenes || []).forEach(function (scene, i) {
      var li = el("li", "scene-item");
      if (scene.id === app.sceneId) li.classList.add("current");
      if (app.visited[scene.id]) li.classList.add("visited");
      if (scene.when) li.classList.add("conditional");
      var num = el("span", "scene-num", String(i + 1) + ".");
      var title = el("span", "scene-title-text", scene.title);
      li.appendChild(num);
      li.appendChild(title);
      if (scene.when) li.appendChild(el("div", "scene-when", scene.when));
      li.addEventListener("click", function () { goToScene(scene.id); });
      dom.sceneList.appendChild(li);
    });
  }

  // Lists CAMPAIGN.side entries (insertion order), per SESSION-FORMAT.md.
  // Titles come from the merged session.side so a session-side override wins.
  function renderCampaignNav() {
    var ids = Object.keys((window.CAMPAIGN || {}).side || {});
    dom.campaignList.innerHTML = "";
    if (!ids.length) { dom.campaignNavGroup.classList.add("hidden"); return; }
    dom.campaignNavGroup.classList.remove("hidden");
    ids.forEach(function (sid) {
      var side = app.session.side[sid];
      var li = el("li", "scene-item");
      li.appendChild(el("span", "scene-title-text", (side && side.title) || sid));
      li.addEventListener("click", function () { openSide(sid); });
      dom.campaignList.appendChild(li);
    });
  }

  function findSceneIndex(id) {
    return app.session.scenes.findIndex(function (s) { return s.id === id; });
  }

  function goToScene(id, flashBlockText) {
    var idx = findSceneIndex(id);
    if (idx === -1) return;
    if (window.DMLibrary.isOpen()) window.DMLibrary.close();
    if (window.DMCampaignMap.isOpen()) window.DMCampaignMap.close();
    app.sceneId = id;
    app.visited[id] = true;
    renderSceneList();
    renderScene(flashBlockText);
  }

  function renderSceneBanner(scene) {
    dom.sceneBanner.innerHTML = "";
    dom.sceneBanner.classList.add("hidden");
    if (!scene.banner) return;
    var img = document.createElement("img");
    img.className = "scene-banner-img";
    img.alt = "";
    img.onerror = function () { dom.sceneBanner.classList.add("hidden"); };
    img.onload = function () {
      // A square creature token (e.g. 280x280) stretched across the wide
      // banner slot looks broken — only real wide banner art is >= 800px.
      if (img.naturalWidth < 800) { dom.sceneBanner.classList.add("hidden"); return; }
      dom.sceneBanner.classList.remove("hidden");
    };
    img.src = scene.banner;
    dom.sceneBanner.appendChild(img);
  }

  function renderSceneDuration(scene) {
    dom.sceneDuration.innerHTML = "";
    if (!scene.duration) { dom.sceneDuration.classList.add("hidden"); return; }
    var em = document.createElement("em");
    var strong = document.createElement("strong");
    strong.textContent = "Estimated Duration:";
    em.appendChild(strong);
    em.appendChild(document.createTextNode(" " + scene.duration));
    dom.sceneDuration.appendChild(em);
    dom.sceneDuration.classList.remove("hidden");
  }

  function renderScene(flashBlockText) {
    var idx = findSceneIndex(app.sceneId);
    var scene = app.session.scenes[idx];
    renderSceneBanner(scene);
    dom.sceneTitle.textContent = scene.title;
    renderSceneDuration(scene);
    dom.sceneBody.innerHTML = "";
    dom.sceneBody.appendChild(window.DMRender.renderScene(scene, { session: app.session }));
    dom.prevBtn.disabled = idx <= 0;
    dom.nextBtn.disabled = idx >= app.session.scenes.length - 1;
    dom.center.scrollTop = 0;
    if (flashBlockText) flashMatchingBlock(flashBlockText);
  }

  function flashMatchingBlock(query) {
    var blocks = dom.sceneBody.querySelectorAll("[data-block-root]");
    var q = query.toLowerCase();
    for (var i = 0; i < blocks.length; i++) {
      if ((blocks[i].textContent || "").toLowerCase().indexOf(q.split(/\s+/)[0]) !== -1) {
        blocks[i].scrollIntoView({ block: "center" });
        blocks[i].classList.add("flash");
        setTimeout(function (b) { return function () { b.classList.remove("flash"); }; }(blocks[i]), 1500);
        break;
      }
    }
  }

  function stepScene(delta) {
    var idx = findSceneIndex(app.sceneId);
    var next = idx + delta;
    if (next >= 0 && next < app.session.scenes.length) goToScene(app.session.scenes[next].id);
  }

  function openCreature(cid) {
    var c = app.session.creatures[cid];
    if (!c) return;
    window.DMPanel.open("creature", c);
  }
  function openSide(sid) {
    var s = app.session.side[sid];
    if (!s) return;
    window.DMPanel.open("side", s);
  }
  function openLair(cid) {
    var c = app.session.creatures[cid];
    if (!c || !c.lair) return;
    window.DMPanel.open("lair", c);
  }

  // Library and the campaign map are two full-screen sibling modes of #center,
  // same as library.js's own sceneView/libraryView toggle — only one can show
  // at a time. library.js doesn't know about the map view, so app.js keeps
  // the two mutually exclusive from this side.
  function openLibrary() {
    if (window.DMCampaignMap.isOpen()) window.DMCampaignMap.close();
    window.DMLibrary.open();
  }
  function openCampaignMap(focusPinId) {
    if (window.DMLibrary.isOpen()) window.DMLibrary.close();
    window.DMCampaignMap.open(focusPinId);
  }

  function showDiceToast(expr) {
    var r = window.DMCore.rollDice(expr);
    var toast = el("div", "dice-toast", r.error ? "Bad dice: " + expr : expr + " → [" + r.rolls.join(", ") + (r.mod ? (r.mod > 0 ? "+" + r.mod : r.mod) : "") + "] = " + r.total);
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add("show"); });
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 300);
    }, 2200);
  }

  function bindDelegatedClicks() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest) {
        var cEl = t.closest("[data-cid]");
        if (cEl) {
          e.preventDefault();
          if (cEl.dataset.lair) openLair(cEl.dataset.cid);
          else openCreature(cEl.dataset.cid);
          return;
        }
        var sEl = t.closest("[data-sid]");
        if (sEl) { e.preventDefault(); openSide(sEl.dataset.sid); return; }
        var scEl = t.closest("[data-scene-goto]");
        if (scEl) { e.preventDefault(); goToScene(scEl.dataset.sceneGoto); return; }
        var dEl = t.closest("[data-dice]");
        if (dEl) { e.preventDefault(); showDiceToast(dEl.dataset.dice); return; }
        var mEl = t.closest("[data-map-id]");
        if (mEl) { e.preventDefault(); window.DMLibrary.openMap(mEl.dataset.mapId); return; }
      }
    });
  }

  function bindKeyboard() {
    document.addEventListener("keydown", function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      var typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if (e.key === "Escape") {
        if (window.DMSearch.isOpen()) window.DMSearch.close();
        else if (window.DMPanel.isOpen()) window.DMPanel.close();
        else if (window.DMCampaignMap.isOpen()) window.DMCampaignMap.close();
        else if (window.DMLibrary.isOpen()) window.DMLibrary.close();
        return;
      }
      if ((e.key === "/" && !typing) || (e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        window.DMSearch.open();
        return;
      }
      if (typing) return;
      if (e.key === "ArrowLeft") stepScene(-1);
      else if (e.key === "ArrowRight") stepScene(1);
      else if (e.key.toLowerCase() === "n") window.DMTracker.triggerNextTurn();
      else if (e.key.toLowerCase() === "l") openLibrary();
      else if (e.key.toLowerCase() === "m") openCampaignMap();
    });
  }

  function bindMisc() {
    dom.prevBtn.addEventListener("click", function () { stepScene(-1); });
    dom.nextBtn.addEventListener("click", function () { stepScene(1); });
    dom.searchBtn.addEventListener("click", function () { window.DMSearch.open(); });
    dom.libraryBtn.addEventListener("click", openLibrary);
    dom.mapBtn.addEventListener("click", function () { openCampaignMap(); });
    dom.helpBtn.addEventListener("click", function () { dom.helpPopover.classList.toggle("open"); });
  }

  function start() {
    cacheDom();
    if (!window.SESSION) {
      dom.center.innerHTML = "<p class='load-error'>No SESSION data loaded.</p>";
      return;
    }
    app.session = window.DMCore.mergeCampaign(window.SESSION, window.CAMPAIGN);
    renderHeader();
    window.DMPanel.init({
      panelEl: dom.panelEl, bodyEl: dom.panelBody, titleEl: dom.panelTitle,
      backBtn: dom.panelBack, closeBtn: dom.panelClose, session: app.session
    });
    window.DMLibrary.init({
      sceneView: dom.sceneView, libraryView: dom.libraryView, content: dom.libraryContent,
      tabBtns: dom.libraryTabs, backBtn: dom.libraryBack, filterInput: dom.libraryFilter
    });
    window.DMCampaignMap.init({
      sceneView: dom.sceneView,
      mapView: dom.mapView,
      session: app.session,
      campaign: window.CAMPAIGN
    });
    window.DMSearch.init({
      overlay: dom.searchOverlay, input: dom.searchInput, resultsEl: dom.searchResults, closeBtn: dom.searchClose,
      session: app.session,
      callbacks: {
        onScene: function (id, q) { goToScene(id, q); },
        onSide: function (id) { openSide(id); },
        onCreature: function (id) { openCreature(id); },
        onMap: function (id) { window.DMLibrary.openMap(id); },
        onPin: function (id) { openCampaignMap(id); }
      }
    });
    app.sceneId = (app.session.scenes[0] || {}).id;
    if (app.sceneId) app.visited[app.sceneId] = true;
    renderSceneList();
    renderCampaignNav();
    if (app.sceneId) renderScene();
    bindDelegatedClicks();
    bindKeyboard();
    bindMisc();
  }

  var meta = pickSessionMeta();
  if (!meta) {
    document.addEventListener("DOMContentLoaded", function () {
      qs("#center").innerHTML = "<p class='load-error'>No sessions registered in sessions/index.js.</p>";
    });
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (wantsCampaignFixture()) {
        loadScript("sessions/_campaign-fixture.js", function () { loadSessionScript(meta.id, start); });
      } else {
        loadSessionScript(meta.id, start);
      }
    });
  }
})();
