// Campaign map: full-screen sibling view of #scene-view (same toggle pattern
// as js/library.js). Renders CAMPAIGN.map (image + pins), a progression
// ledger, and the pin detail panel (via the existing DMPanel "raw" type, so
// panel.js never needs to know about pins). DM state (status/note per pin)
// persists to localStorage per SESSION-FORMAT.md's Campaign layer contract.
(function () {
  "use strict";
  var el = window.DMRender.el;
  var Core = window.DMCore;

  function qs(sel) { return document.querySelector(sel); }

  var dom = {};
  var state = {
    session: null, map: null, pinState: {},
    zoom: 1, panX: 0, panY: 0, dmView: true, isFit: false,
    dragging: false, dragStartX: 0, dragStartY: 0, dragStartPanX: 0, dragStartPanY: 0
  };

  // ---- persistence --------------------------------------------------------
  function storageKey() { return "dmapp:campaign:" + (state.map && state.map.id); }

  function loadPinState() {
    if (!state.map) { state.pinState = {}; return; }
    try {
      var raw = localStorage.getItem(storageKey());
      state.pinState = raw ? JSON.parse(raw) : {};
    } catch (e) {
      state.pinState = {};
    }
  }
  function savePinState() {
    if (!state.map) return;
    try { localStorage.setItem(storageKey(), JSON.stringify(state.pinState)); } catch (e) { /* ponytail: quota/full ignored, same as tracker.js */ }
  }

  function setPinStatus(pinId, patch) {
    state.pinState = Core.setPinState(state.pinState, pinId, patch);
    savePinState();
    renderPins();
    renderLedger();
  }

  // ---- zoom / pan ----------------------------------------------------------
  // Pins are children of #campaign-map-canvas, which carries the only
  // transform (translate + scale, no transition) — so pin position stays a
  // fixed % of the image at every zoom level, per the PRD.
  function applyTransform() {
    dom.canvas.style.transform = "translate(" + state.panX + "px, " + state.panY + "px) scale(" + state.zoom + ")";
    // Pins live inside the scaled canvas so their x/y % position tracks pan/
    // zoom automatically — but that would also scale their SIZE (a wax seal
    // readable at fit-zoom would balloon at 4x). Counter-scale by 1/zoom via
    // a custom property so pins stay a constant screen size at any zoom.
    dom.canvas.style.setProperty("--map-zoom", state.zoom);
  }

  // #campaign-map-frame is the actual bordered box (position:relative,
  // overflow:hidden) that #campaign-map-canvas's transform is relative to.
  // Its content box can be smaller than its border box, so read offsets via
  // clientLeft/clientTop/clientWidth/clientHeight rather than a hardcoded
  // border width.
  function frameBox() {
    var r = dom.frame.getBoundingClientRect();
    return {
      left: r.left + dom.frame.clientLeft,
      top: r.top + dom.frame.clientTop,
      width: dom.frame.clientWidth,
      height: dom.frame.clientHeight
    };
  }

  // Sizes the frame to the image's own aspect ratio, maximized within the
  // stage (#campaign-map-viewport)'s available space — so at fit-zoom the
  // double-rule frame hugs the image edge-to-edge with no dead bands inside
  // it. Any leftover space shows as stage background around the frame.
  function sizeFrame() {
    if (!dom.img.naturalWidth) return;
    var stage = dom.viewport.getBoundingClientRect();
    var bx = dom.frame.clientLeft * 2, by = dom.frame.clientTop * 2; // border, read live from the CSS rule
    var iw = dom.img.naturalWidth, ih = dom.img.naturalHeight;
    var ar = iw / ih;
    var availW = Math.max(0, stage.width - bx);
    var availH = Math.max(0, stage.height - by);
    var w = availW, h = w / ar;
    if (h > availH) { h = availH; w = h * ar; }
    dom.frame.style.width = (w + bx) + "px";
    dom.frame.style.height = (h + by) + "px";
  }

  // newZoom anchored on a screen point (clientX/clientY) if given, else the
  // frame's own centre — so wheel zoom holds the point under the cursor
  // still, and the +/- buttons zoom toward the middle of the map.
  function setZoom(newZoom, clientX, clientY) {
    if (!dom.img.naturalWidth) return;
    newZoom = Math.max(0.2, Math.min(4, newZoom));
    var box = frameBox();
    var anchorX = clientX != null ? clientX - box.left : box.width / 2;
    var anchorY = clientY != null ? clientY - box.top : box.height / 2;
    var canvasX = (anchorX - state.panX) / state.zoom;
    var canvasY = (anchorY - state.panY) / state.zoom;
    state.zoom = newZoom;
    state.panX = anchorX - canvasX * newZoom;
    state.panY = anchorY - canvasY * newZoom;
    state.isFit = false;
    applyTransform();
  }

  function fitToScreen() {
    if (!dom.img.naturalWidth) return;
    sizeFrame();
    var box = frameBox();
    state.zoom = box.width / dom.img.naturalWidth;
    state.panX = 0;
    state.panY = 0;
    state.isFit = true;
    applyTransform();
  }

  // Re-centers on whatever canvas-space point is currently in the middle of
  // the frame, after the frame itself has been resized to the stage's new
  // size — used when the stage shrinks/grows (panel open/close, window
  // resize, nav hide) while NOT at Fit, so the DM doesn't lose their place.
  function recenterKeepingFocus() {
    if (!dom.img.naturalWidth) return;
    var oldBox = frameBox();
    var centerCanvasX = (oldBox.width / 2 - state.panX) / state.zoom;
    var centerCanvasY = (oldBox.height / 2 - state.panY) / state.zoom;
    sizeFrame();
    var newBox = frameBox();
    state.panX = newBox.width / 2 - centerCanvasX * state.zoom;
    state.panY = newBox.height / 2 - centerCanvasY * state.zoom;
    applyTransform();
  }

  // The stage (#campaign-map-viewport) resizes whenever #panel opens/closes,
  // the left nav hides, or the window itself resizes — any of which can
  // leave the frame overflowing its (now smaller) stage. A single
  // ResizeObserver covers all of those instead of separate listeners: at
  // Fit, re-fit; otherwise keep whatever was centered still centered.
  function onViewportResize() {
    if (!dom.img.naturalWidth || !isOpen()) return;
    if (state.isFit) fitToScreen();
    else recenterKeepingFocus();
  }

  function onWheel(e) {
    e.preventDefault();
    setZoom(state.zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY);
  }
  function onMouseDown(e) {
    if (e.target.closest && e.target.closest(".campaign-pin")) return;
    state.dragging = true;
    state.dragStartX = e.clientX; state.dragStartY = e.clientY;
    state.dragStartPanX = state.panX; state.dragStartPanY = state.panY;
    dom.viewport.classList.add("dragging");
  }
  function onMouseMove(e) {
    if (!state.dragging) return;
    state.panX = state.dragStartPanX + (e.clientX - state.dragStartX);
    state.panY = state.dragStartPanY + (e.clientY - state.dragStartY);
    applyTransform();
  }
  function onMouseUp() {
    state.dragging = false;
    dom.viewport.classList.remove("dragging");
  }

  // Centers the frame on a pin's landmark (used by the ledger and search).
  function centerOnPin(pin) {
    if (pin.x == null || pin.y == null || !dom.img.naturalWidth) return;
    var box = frameBox();
    var targetZoom = Math.max(state.zoom, 1.5);
    var canvasX = (pin.x / 100) * dom.img.naturalWidth;
    var canvasY = (pin.y / 100) * dom.img.naturalHeight;
    state.zoom = targetZoom;
    state.panX = box.width / 2 - canvasX * targetZoom;
    state.panY = box.height / 2 - canvasY * targetZoom;
    state.isFit = false;
    applyTransform();
  }

  function focusPin(pinId) {
    var pin = findPin(pinId);
    if (!pin) return;
    centerOnPin(pin);
    openPinPanel(pinId);
    // Opening the panel narrows #center, which resizes the stage — the
    // ResizeObserver (see init) catches that and recenters once the frame
    // has actually resized, however long the resize takes.
  }

  // ---- pins -----------------------------------------------------------------
  function findPin(pinId) {
    return (state.map && (state.map.pins || []).filter(function (p) { return p.id === pinId; })[0]) || null;
  }

  function bloodDrops(cls, blood) {
    var n = Math.max(0, Math.min(3, blood || 0));
    var row = el("span", cls);
    for (var i = 0; i < n; i++) row.appendChild(el("span", "campaign-drop"));
    return row;
  }

  function buildPinEl(pin) {
    var effective = Core.applyPinState(pin, state.pinState);
    var wrap = el("div", "campaign-pin campaign-pin-" + effective.status);
    wrap.style.left = pin.x + "%";
    wrap.style.top = pin.y + "%";
    wrap.title = pin.title;
    wrap.dataset.pinId = pin.id;
    wrap.appendChild(el("div", "campaign-pin-seal"));
    if (pin.blood) wrap.appendChild(bloodDrops("campaign-pin-drops", pin.blood));
    wrap.addEventListener("click", function (e) { e.stopPropagation(); openPinPanel(pin.id); });
    return wrap;
  }

  function renderPins() {
    dom.pins.innerHTML = "";
    if (!state.map) return;
    (state.map.pins || []).forEach(function (pin) {
      if (pin.x == null || pin.y == null) return; // off-map: ledger only
      dom.pins.appendChild(buildPinEl(pin));
    });
  }

  // ---- pin detail panel (DMPanel "raw" type; panel.js stays untouched) -----
  function appendIf(parent, node) { if (node) parent.appendChild(node); }

  function fieldRow(label, text) {
    var row = el("div", "pin-field");
    row.appendChild(el("div", "pin-field-label", label));
    var body = el("div", "pin-field-body");
    if (text) body.appendChild(window.DMRender.renderInline(text));
    row.appendChild(body);
    return row;
  }

  function listField(label, items) {
    if (!items || !items.length) return null;
    var row = el("div", "pin-field");
    row.appendChild(el("div", "pin-field-label", label));
    var ul = el("ul", "pin-field-list");
    items.forEach(function (text) {
      var li = el("li");
      li.appendChild(window.DMRender.renderInline(text));
      ul.appendChild(li);
    });
    row.appendChild(ul);
    return row;
  }

  function buildStatusControls(pin, effective) {
    var wrap = el("div", "pin-status-controls");
    var select = document.createElement("select");
    select.className = "pin-status-select";
    ["open", "done", "skipped", "changed"].forEach(function (s) {
      var opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s.charAt(0).toUpperCase() + s.slice(1);
      opt.selected = s === effective.status;
      select.appendChild(opt);
    });
    select.addEventListener("change", function () { setPinStatus(pin.id, { status: select.value }); });
    wrap.appendChild(el("label", "pin-status-label", "Status"));
    wrap.appendChild(select);

    var textarea = document.createElement("textarea");
    textarea.className = "pin-note-textarea";
    textarea.value = effective.note || "";
    textarea.placeholder = "What the DM changed here…";
    textarea.addEventListener("input", function () { setPinStatus(pin.id, { note: textarea.value }); });
    wrap.appendChild(el("label", "pin-note-label", "DM note"));
    wrap.appendChild(textarea);
    return wrap;
  }

  function openPinPanel(pinId) {
    var pin = findPin(pinId);
    if (!pin) return;
    var effective = Core.applyPinState(pin, state.pinState);
    var wrap = el("div", "pin-panel");

    wrap.appendChild(fieldRow("Objective", pin.objective));
    wrap.appendChild(fieldRow("Blood price", pin.bloodPrice));
    if (pin.blood) wrap.appendChild(bloodDrops("pin-blood-row", pin.blood));
    wrap.appendChild(fieldRow("Eventyr", pin.eventyr));
    appendIf(wrap, listField("Requires", pin.requires));
    appendIf(wrap, listField("Unlocks", pin.unlocks));
    wrap.appendChild(fieldRow("Estimated sessions", String(pin.sessions || 0)));
    appendIf(wrap, listField("DM choices", pin.dmChoices));
    appendIf(wrap, listField("Alternatives", pin.alternatives));

    if (pin.session) {
      var link = el("a", "pin-session-link", "Open session →");
      link.href = "index.html?s=" + encodeURIComponent(pin.session);
      wrap.appendChild(link);
    }

    wrap.appendChild(buildStatusControls(pin, effective));

    (pin.blocks || []).forEach(function (b) {
      wrap.appendChild(window.DMRender.renderBlock(b, { session: state.session }));
    });

    window.DMPanel.open("raw", wrap, pin.title);
  }

  // ---- ledger -----------------------------------------------------------
  function buildLedgerRow(pin) {
    var effective = Core.applyPinState(pin, state.pinState);
    var row = el("div", "ledger-row ledger-row-" + effective.status);
    row.appendChild(el("span", "ledger-glyph"));
    row.appendChild(el("span", "ledger-pin-title", pin.title));
    if (pin.blood) row.appendChild(bloodDrops("ledger-drops", pin.blood));
    row.addEventListener("click", function () { focusPin(pin.id); });
    return row;
  }

  function renderSessionsLeft() {
    var counts = Core.countSessionsLeft((state.map && state.map.pins) || [], state.pinState);
    dom.sessionsLeft.textContent = "Main path: " + counts.main + " sessions · All sites: " + counts.all;
  }

  function renderLedger() {
    dom.ledgerBody.innerHTML = "";
    if (!state.map) {
      dom.ledgerBody.appendChild(el("p", "ledger-empty", "No campaign data loaded."));
      dom.sessionsLeft.textContent = "";
      return;
    }
    var stages = state.map.stages || [];
    var pins = state.map.pins || [];
    stages.forEach(function (stage) {
      dom.ledgerBody.appendChild(el("div", "ledger-stage-title", stage.title));
      if (stage.summary) dom.ledgerBody.appendChild(el("div", "ledger-stage-summary", stage.summary));
      pins.filter(function (p) { return p.stage === stage.id; }).forEach(function (pin) {
        dom.ledgerBody.appendChild(buildLedgerRow(pin));
      });
    });
    var staged = {};
    stages.forEach(function (s) { staged[s.id] = true; });
    var other = pins.filter(function (p) { return !staged[p.stage]; });
    if (other.length) {
      dom.ledgerBody.appendChild(el("div", "ledger-stage-title", "Other"));
      other.forEach(function (pin) { dom.ledgerBody.appendChild(buildLedgerRow(pin)); });
    }
    renderSessionsLeft();
  }

  // ---- export / import / reset ---------------------------------------------
  function exportState() {
    var blob = new Blob([JSON.stringify(state.pinState, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "campaign-state-" + (state.map ? state.map.id : "campaign") + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function importState(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        if (parsed && typeof parsed === "object") {
          state.pinState = parsed;
          savePinState();
          renderPins();
          renderLedger();
        }
      } catch (e) { /* malformed file: ignore, keep current state */ }
    };
    reader.readAsText(file);
  }

  function resetState() {
    if (!window.confirm("Reset all campaign progress to defaults?")) return;
    state.pinState = {};
    try { localStorage.removeItem(storageKey()); } catch (e) { /* ignore */ }
    renderPins();
    renderLedger();
  }

  // ---- DM / Player image toggle ---------------------------------------------
  function setVariant(variant) {
    state.dmView = variant !== "player";
    dom.dmBtn.classList.toggle("active", state.dmView);
    dom.playerBtn.classList.toggle("active", !state.dmView);
    dom.img.src = state.dmView ? state.map.image : (state.map.playerImage || state.map.image);
  }

  // ---- view toggle (same pattern as js/library.js) ---------------------
  function open(focusPinId) {
    // Left session nav competes with the ledger and the pin panel for width;
    // give it to the map instead. Plain class toggle — instant, no transition.
    document.body.classList.add("campaign-map-open");
    dom.sceneView.classList.add("hidden");
    dom.mapView.classList.remove("hidden");
    if (state.map && dom.img.naturalWidth) fitToScreen();
    renderPins();
    renderLedger();
    if (focusPinId) focusPin(focusPinId);
  }
  function close() {
    document.body.classList.remove("campaign-map-open");
    dom.mapView.classList.add("hidden");
    dom.sceneView.classList.remove("hidden");
  }
  function isOpen() { return !!dom.mapView && !dom.mapView.classList.contains("hidden"); }

  function init(opts) {
    dom.sceneView = opts.sceneView;
    dom.mapView = opts.mapView;
    dom.viewport = qs("#campaign-map-viewport");
    dom.canvas = qs("#campaign-map-canvas");
    // The frame is the actual bordered box, sized to the image's aspect
    // ratio in JS (sizeFrame) — created here rather than in index.html so
    // the double-rule frame can hug the image instead of a fixed rectangle.
    dom.frame = document.createElement("div");
    dom.frame.id = "campaign-map-frame";
    dom.canvas.parentNode.insertBefore(dom.frame, dom.canvas);
    dom.frame.appendChild(dom.canvas);
    dom.img = qs("#campaign-map-img");
    dom.pins = qs("#campaign-map-pins");
    dom.empty = qs("#campaign-map-empty");
    dom.title = qs("#campaign-map-title");
    dom.dmBtn = qs("#campaign-map-dm-btn");
    dom.playerBtn = qs("#campaign-map-player-btn");
    dom.zoomInBtn = qs("#campaign-map-zoom-in");
    dom.zoomOutBtn = qs("#campaign-map-zoom-out");
    dom.zoomFitBtn = qs("#campaign-map-zoom-fit");
    dom.ledgerBody = qs("#campaign-ledger-body");
    dom.sessionsLeft = qs("#campaign-sessions-left");
    dom.exportBtn = qs("#campaign-export-btn");
    dom.importBtn = qs("#campaign-import-btn");
    dom.importFile = qs("#campaign-import-file");
    dom.resetBtn = qs("#campaign-reset-btn");

    state.session = opts.session;
    state.map = (opts.campaign || {}).map || null;
    loadPinState();

    dom.frame.classList.toggle("hidden", !state.map);
    dom.empty.classList.toggle("hidden", !!state.map);
    dom.title.textContent = state.map ? state.map.title : "";

    if (state.map) {
      dom.img.onload = function () {
        dom.canvas.style.width = dom.img.naturalWidth + "px";
        dom.canvas.style.height = dom.img.naturalHeight + "px";
        renderPins();
        if (isOpen()) fitToScreen();
      };
      dom.img.src = state.map.image; // preload so it's ready by the time the DM opens the map
    }
    renderLedger();

    qs("#campaign-map-back-btn").addEventListener("click", close);
    dom.dmBtn.addEventListener("click", function () { setVariant("dm"); });
    dom.playerBtn.addEventListener("click", function () { setVariant("player"); });
    dom.zoomInBtn.addEventListener("click", function () { setZoom(state.zoom * 1.25); });
    dom.zoomOutBtn.addEventListener("click", function () { setZoom(state.zoom / 1.25); });
    dom.zoomFitBtn.addEventListener("click", fitToScreen);
    dom.viewport.addEventListener("wheel", onWheel, { passive: false });
    dom.viewport.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    // Covers window resize AND every other thing that changes the stage's
    // size (panel open/close, left-nav hide) — see onViewportResize.
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(onViewportResize).observe(dom.viewport);
    } else {
      window.addEventListener("resize", onViewportResize); // ponytail: no ResizeObserver fallback, window resize only
    }
    dom.exportBtn.addEventListener("click", exportState);
    dom.importBtn.addEventListener("click", function () { dom.importFile.click(); });
    dom.importFile.addEventListener("change", function () {
      if (dom.importFile.files && dom.importFile.files[0]) importState(dom.importFile.files[0]);
      dom.importFile.value = "";
    });
    dom.resetBtn.addEventListener("click", resetState);
  }

  window.DMCampaignMap = { init: init, open: open, close: close, isOpen: isOpen };
})();
