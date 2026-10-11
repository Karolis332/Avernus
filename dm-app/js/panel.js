// Right-hand panel: creature / side-path / lair-action content, with a
// back-history stack. Content renderers are injected by app.js via init().
(function () {
  "use strict";
  var el = window.DMRender.el;

  var state = {
    stack: [], // [{type,payload}]
    panelEl: null,
    bodyEl: null,
    titleEl: null,
    backBtn: null,
    rootEl: null
  };

  function render(entry) {
    state.bodyEl.innerHTML = "";
    if (entry.type === "creature") {
      state.titleEl.textContent = "Creature";
      state.bodyEl.appendChild(window.DMStatblock.renderCreaturePanelBody(entry.payload));
    } else if (entry.type === "side") {
      state.titleEl.textContent = "Side path";
      var side = entry.payload;
      var wrap = el("div", "side-panel");
      wrap.appendChild(el("h2", null, side.title || ""));
      (side.blocks || []).forEach(function (b) {
        wrap.appendChild(window.DMRender.renderBlock(b, { session: state.session }));
      });
      state.bodyEl.appendChild(wrap);
    } else if (entry.type === "lair") {
      state.titleEl.textContent = "Lair action";
      var creature = entry.payload;
      var lairWrap = el("div", "lair-panel");
      lairWrap.appendChild(el("h2", null, creature.name + " — Lair Action"));
      var p = el("p");
      p.appendChild(window.DMRender.renderInline(creature.lair.text || ""));
      lairWrap.appendChild(p);
      state.bodyEl.appendChild(lairWrap);
    } else if (entry.type === "raw") {
      state.titleEl.textContent = entry.title || "";
      state.bodyEl.appendChild(entry.payload);
    }
    state.backBtn.classList.toggle("visible", state.stack.length > 1);
    state.panelEl.classList.add("open");
    document.body.classList.add("panel-open");
  }

  function open(type, payload, title) {
    state.stack.push({ type: type, payload: payload, title: title });
    render(state.stack[state.stack.length - 1]);
  }

  function back() {
    if (state.stack.length > 1) {
      state.stack.pop();
      render(state.stack[state.stack.length - 1]);
    }
  }

  function close() {
    state.stack = [];
    state.panelEl.classList.remove("open");
    document.body.classList.remove("panel-open");
  }

  function isOpen() {
    return state.panelEl.classList.contains("open");
  }

  function init(opts) {
    state.panelEl = opts.panelEl;
    state.bodyEl = opts.bodyEl;
    state.titleEl = opts.titleEl;
    state.backBtn = opts.backBtn;
    state.session = opts.session;
    state.backBtn.addEventListener("click", back);
    opts.closeBtn.addEventListener("click", close);
  }

  window.DMPanel = { init: init, open: open, back: back, close: close, isOpen: isOpen };
})();
