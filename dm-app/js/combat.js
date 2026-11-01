// Combat pop-out: encounter list | tracker | stat blocks, for a second monitor.
// Synced with the main window through localStorage "storage" events, which the
// browser fires only in the OTHER windows. Rendering never writes storage.
(function () {
  "use strict";
  var el = window.DMRender.el;

  function encPrefix(sid) { return "dmapp:encounter:" + sid + ":"; }
  function partyKey(sid) { return "dmapp:party:" + sid; }

  // Every encounter block of the session, with its scene title (walks "more" blocks).
  function collectEncounters(session) {
    var out = [];
    function walk(blocks, scene) {
      (blocks || []).forEach(function (b) {
        if (b.t === "encounter" && b.id) out.push({ block: b, scene: scene.title });
        else if (b.blocks) walk(b.blocks, scene);
      });
    }
    (session.scenes || []).forEach(function (scene) { walk(scene.blocks, scene); });
    return out;
  }

  function findEncounter(session, id) {
    var hit = collectEncounters(session).filter(function (e) { return e.block.id === id; })[0];
    return hit ? hit.block : null;
  }

  // Swaps one rendered tracker for a fresh one read from storage. Used by both windows.
  function rerenderRoot(session, oldRoot) {
    var block = findEncounter(session, oldRoot.dataset.encounterId);
    if (!block) return null;
    var fresh = window.DMTracker.renderEncounter(block, { session: session });
    oldRoot.replaceWith(fresh);
    return fresh;
  }

  function isRunning(sid, eid) {
    try {
      var raw = localStorage.getItem(encPrefix(sid) + eid);
      return !!raw && JSON.parse(raw).phase === "fight";
    } catch (e) { return false; }
  }

  // Main window: re-render the visible trackers that another window changed.
  function watchMain(session, container) {
    window.addEventListener("storage", function (e) {
      if (!e.key) return;
      var isEnc = e.key.indexOf(encPrefix(session.id)) === 0;
      if (!isEnc && e.key !== partyKey(session.id)) return;
      var eid = isEnc ? e.key.slice(encPrefix(session.id).length) : null;
      container.querySelectorAll("[data-encounter-root]").forEach(function (root) {
        var id = root.dataset.encounterId;
        // party edits only matter to trackers still on their setup screen
        if (isEnc ? id === eid : !isRunning(session.id, id)) rerenderRoot(session, root);
      });
    });
  }

  function mount(session) {
    document.body.classList.add("combat-mode");
    document.title = "Combat — " + session.title;
    var root = el("div", "combat-root");
    root.id = "combat-root";
    var listCol = el("section", "combat-col combat-list");
    var trackCol = el("section", "combat-col combat-track");
    var sbCol = el("section", "combat-col combat-statblocks");
    [listCol, trackCol, sbCol].forEach(function (c) { root.appendChild(c); });
    document.body.appendChild(root);

    var encounters = collectEncounters(session);
    if (!encounters.length) {
      trackCol.appendChild(el("p", "combat-empty", "This session has no encounters."));
      listCol.appendChild(el("h3", "combat-heading", "Encounters"));
      return;
    }

    var selectedId = null;
    var observer = null;
    var blockEls = {};

    function renderList() {
      listCol.innerHTML = "";
      listCol.appendChild(el("h3", "combat-heading", "Encounters"));
      encounters.forEach(function (enc) {
        var item = el("button", "combat-enc" + (enc.block.id === selectedId ? " selected" : ""));
        item.appendChild(el("span", "combat-enc-title", enc.block.title || enc.block.id));
        item.appendChild(el("span", "combat-enc-scene", enc.scene));
        if (isRunning(session.id, enc.block.id)) item.appendChild(el("span", "combat-enc-live", "in progress"));
        item.addEventListener("click", function () { select(enc.block.id); });
        listCol.appendChild(item);
      });
    }

    function renderStatblocks(block) {
      sbCol.innerHTML = "";
      blockEls = {};
      var cids = [];
      (block.combatants || []).forEach(function (c) { if (cids.indexOf(c.c) === -1) cids.push(c.c); });
      if (block.lair && cids.indexOf(block.lair) === -1) cids.push(block.lair);
      cids.forEach(function (cid) {
        var creature = session.creatures[cid];
        if (!creature) return;
        var wrap = el("div", "combat-sb");
        wrap.appendChild(window.DMStatblock.renderStatblock(Object.assign({ _cid: cid, _sessionId: session.id }, creature)));
        blockEls[cid] = wrap;
        sbCol.appendChild(wrap);
      });
    }

    function markActive() {
      var cur = trackCol.querySelector(".fight-row-current [data-cid]");
      var cid = cur ? cur.dataset.cid : null;
      Object.keys(blockEls).forEach(function (k) { blockEls[k].classList.toggle("sb-active", k === cid); });
      if (cid && blockEls[cid] && blockEls[cid].scrollIntoView) blockEls[cid].scrollIntoView({ block: "nearest" });
    }

    function mountTracker(block) {
      if (observer) observer.disconnect();
      trackCol.innerHTML = "";
      var tracker = window.DMTracker.renderEncounter(block, { session: session });
      trackCol.appendChild(tracker);
      observer = new MutationObserver(markActive);
      observer.observe(trackCol, { childList: true, subtree: true });
      markActive();
    }

    function select(id) {
      selectedId = id;
      var block = findEncounter(session, id);
      renderList();
      renderStatblocks(block);
      mountTracker(block);
    }

    // clicking a creature name jumps to its stat block instead of opening the side panel
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("[data-cid]") : null;
      if (!t || !blockEls[t.dataset.cid]) return;
      e.preventDefault();
      blockEls[t.dataset.cid].scrollIntoView({ block: "start" });
    });

    document.addEventListener("keydown", function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key.toLowerCase() === "n") window.DMTracker.triggerNextTurn();
    });

    window.addEventListener("storage", function (e) {
      if (!e.key || e.key.indexOf(encPrefix(session.id)) !== 0) {
        if (e.key === partyKey(session.id) && selectedId && !isRunning(session.id, selectedId)) mountTracker(findEncounter(session, selectedId));
        return;
      }
      var eid = e.key.slice(encPrefix(session.id).length);
      if (eid === selectedId) mountTracker(findEncounter(session, eid));
      renderList();
    });

    // open the running fight if there is one, else the first encounter
    var running = encounters.filter(function (en) { return isRunning(session.id, en.block.id); })[0];
    select((running || encounters[0]).block.id);
  }

  window.DMCombat = { mount: mount, watchMain: watchMain, collectEncounters: collectEncounters };
})();
