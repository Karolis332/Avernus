// Initiative tracker: setup view -> fight view, persisted in localStorage
// per session+encounter. One `encounter` block = one call to renderEncounter.
(function () {
  "use strict";
  var el = window.DMRender.el;
  var Core = window.DMCore;

  function blank(v) { return v == null || String(v).trim() === ""; }

  function partyKey(sid) { return "dmapp:party:" + sid; }
  function encKey(sid, eid) { return "dmapp:encounter:" + sid + ":" + eid; }

  function loadJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ponytail: quota/full ignored, tracker still works in-memory */ }
  }

  // creature.init (an optional static bonus) overrides DEX mod when set.
  function initModOf(creature) {
    return Core.initiativeBonus(creature);
  }

  function rollInit(creature) {
    var mod = initModOf(creature);
    var r = Core.rollDice("1d20" + (mod >= 0 ? "+" + mod : mod));
    return { total: r.total, roll: r.rolls[0], mod: mod };
  }

  function makeRow(opts) {
    return Object.assign({
      id: "", kind: "monster", name: "", init: 0, dex: 0, hp: 0, maxHp: 0, ac: null,
      legendaryCount: 0, legendaryUsed: 0, conditions: "", deathSuccess: 0, deathFail: 0,
      cid: null, isLair: false, gid: null
    }, opts);
  }

  function renderEncounter(block, ctx) {
    var session = ctx.session;
    var sessionId = session.id;
    var root = el("div", "block block-encounter");
    root.dataset.encounterRoot = "1";
    root.dataset.encounterId = block.id;
    root.addEventListener("mousedown", function () { api.active = api; });

    var state = loadJSON(encKey(sessionId, block.id), null);
    if (!state) {
      state = { phase: "setup", rows: [], idx: 0, round: 1 };
    }

    function persist() { saveJSON(encKey(sessionId, block.id), state); }

    var partyStore = loadJSON(partyKey(sessionId), {});
    function savePartyField(pid, field, value) {
      partyStore[pid] = partyStore[pid] || {};
      partyStore[pid][field] = value;
      saveJSON(partyKey(sessionId), partyStore);
    }

    var combatantInstances = Core.expandCombatants(block.combatants, session.creatures);
    var lairCreature = block.lair ? session.creatures[block.lair] : null;

    var api = { active: null, nextTurn: doNext, prevTurn: doPrev };
    root._trackerApi = api;
    renderRoot();
    return root;

    // -------- setup view ----------------------------------------------------
    function renderSetup() {
      root.innerHTML = "";
      root.appendChild(el("h4", "encounter-title", block.title || "Encounter"));
      if (block.notes) {
        var notesP = el("p", "encounter-notes");
        notesP.appendChild(window.DMRender.renderInline(block.notes));
        root.appendChild(notesP);
      }

      var partyTable = el("table", "tracker-table");
      partyTable.appendChild(headerRow(["Party", "Init", "HP", "Max HP", "AC"]));
      var partyBody = el("tbody");
      (session.party || []).forEach(function (pc) {
        var saved = partyStore[pc.id] || {};
        var tr = el("tr");
        tr.appendChild(el("td", null, pc.name));
        var initInput = numberInput(saved.init || "", function (v) { saved.init = v; savePartyField(pc.id, "init", v); });
        var hpInput = numberInput(saved.hp != null ? saved.hp : "", function (v) { savePartyField(pc.id, "hp", v); });
        var maxHpInput = numberInput(saved.maxHp != null ? saved.maxHp : "", function (v) { savePartyField(pc.id, "maxHp", v); });
        var acInput = numberInput(saved.ac != null ? saved.ac : "", function (v) { savePartyField(pc.id, "ac", v); });
        [initInput, hpInput, maxHpInput, acInput].forEach(function (inp) { var td = el("td"); td.appendChild(inp); tr.appendChild(td); });
        partyBody.appendChild(tr);
      });
      partyTable.appendChild(partyBody);
      root.appendChild(partyTable);

      var allyRows = {};
      if (session.allies && session.allies.length) {
        root.appendChild(el("h5", "tracker-subhead", "Allies"));
        var allyTable = el("table", "tracker-table");
        allyTable.appendChild(headerRow(["Add", "Ally", "Init"]));
        var allyBody = el("tbody");
        session.allies.forEach(function (ally) {
          var tr = el("tr");
          var cb = document.createElement("input");
          cb.type = "checkbox";
          var initInput = numberInput("", function () {});
          allyRows[ally.id] = { cb: cb, init: initInput, ally: ally };
          var tdCb = el("td"); tdCb.appendChild(cb); tr.appendChild(tdCb);
          tr.appendChild(creatureNameTd(ally.name, session.creatures[ally.id] ? ally.id : null));
          var tdInit = el("td"); tdInit.appendChild(initInput); tr.appendChild(tdInit);
          allyBody.appendChild(tr);
        });
        allyTable.appendChild(allyBody);
        root.appendChild(allyTable);
      }

      root.appendChild(el("h5", "tracker-subhead", "Monsters"));
      var rollBtn = el("button", "tracker-btn", "Roll monster initiative");
      root.appendChild(rollBtn);
      var monsterTable = el("table", "tracker-table");
      monsterTable.appendChild(headerRow(["Monster", "Init", "Init mod", "Reroll"]));
      var monsterBody = el("tbody");
      // one entry per group of identical monsters: one init for all members
      var monsterState = Core.groupCombatants(combatantInstances).map(function (g) {
        var lead = g.members[0];
        return { group: g, inst: lead, init: "", dex: initModOf(lead.creature) };
      });
      function renderMonsterRows() {
        monsterBody.innerHTML = "";
        monsterState.forEach(function (m) {
          var n = m.group.members.length;
          var tr = el("tr", n > 1 ? "setup-group-row" : null);
          tr.appendChild(creatureNameTd(n > 1 ? m.inst.creature.name + " ×" + n + " (group)" : m.inst.instanceName, m.inst.cid));
          var initInput = numberInput(m.init || "", function (v) { m.init = v; });
          var tdInit = el("td"); tdInit.appendChild(initInput); tr.appendChild(tdInit);
          tr.appendChild(el("td", null, (m.dex >= 0 ? "+" : "") + m.dex));
          var reroll = el("button", "tracker-btn-sm", n > 1 ? "Roll group" : "Reroll");
          reroll.addEventListener("click", function () {
            m.init = rollInit(m.inst.creature).total;
            renderMonsterRows();
          });
          var tdReroll = el("td"); tdReroll.appendChild(reroll); tr.appendChild(tdReroll);
          monsterBody.appendChild(tr);
        });
      }
      renderMonsterRows();
      monsterTable.appendChild(monsterBody);
      root.appendChild(monsterTable);

      rollBtn.addEventListener("click", function () {
        monsterState.forEach(function (m) { m.init = rollInit(m.inst.creature).total; });
        renderMonsterRows();
      });

      var startBtn = el("button", "tracker-btn tracker-btn-primary", "Start fight");
      root.appendChild(startBtn);
      startBtn.addEventListener("click", function () {
        var rows = [];
        (session.party || []).forEach(function (pc) {
          var saved = partyStore[pc.id] || {};
          rows.push(makeRow({
            id: "pc-" + pc.id, kind: "pc", name: pc.name,
            init: Number(saved.init) || 0, dex: 0,
            // DM usually types only Max HP: a blank current HP means full health, not dying
            maxHp: Number(saved.maxHp) || Number(saved.hp) || 0,
            hp: blank(saved.hp) ? (Number(saved.maxHp) || 0) : Number(saved.hp),
            ac: blank(saved.ac) ? null : Number(saved.ac)
          }));
        });
        Object.keys(allyRows).forEach(function (aid) {
          var row = allyRows[aid];
          if (row.cb.checked) {
            rows.push(makeRow({
              id: "ally-" + aid, kind: "ally", name: row.ally.name,
              init: Number(row.init.value) || 0, dex: 0, hp: 0, maxHp: 0, ac: null,
              cid: session.creatures[aid] ? aid : null
            }));
          }
        });
        var groupInit = {};
        monsterState.forEach(function (m) {
          // a blank init box means "roll it for me", not init 0; one roll per group
          var init = blank(m.init) ? rollInit(m.inst.creature).total : Number(m.init);
          var grouped = m.group.members.length > 1;
          if (grouped) groupInit[m.group.cid] = init;
          m.group.members.forEach(function (inst) {
            var c = inst.creature || {};
            rows.push(makeRow({
              id: "mon-" + inst.instanceId, kind: "monster", name: inst.instanceName,
              init: init, dex: m.dex, hp: c.hp || 0, maxHp: c.hp || 0, ac: c.ac != null ? c.ac : null,
              legendaryCount: (c.legendary && c.legendary.count) || 0, cid: inst.cid,
              gid: grouped ? inst.cid : null
            }));
          });
        });
        if (lairCreature) {
          // -Infinity would serialise to null through JSON.stringify; -99 is
          // low enough to lose every realistic dex tie at initiative 20.
          rows.push(makeRow({ id: "lair", kind: "lair", name: lairCreature.name + " — Lair Action", init: 20, dex: -99, isLair: true, cid: block.lair }));
        }
        rows = Core.sortInitiative(rows.map(function (r) { return { init: r.init, dex: r.dex, isPC: r.kind === "pc", _row: r }; }))
          .map(function (w) { return w._row; });
        state = { phase: "fight", rows: clusterGroups(rows), idx: 0, round: 1, groupInit: groupInit, groupSaves: {} };
        persist();
        renderRoot();
      });
    }

    function headerRow(labels) {
      var thead = el("thead");
      var tr = el("tr");
      labels.forEach(function (l) { tr.appendChild(el("th", null, l)); });
      thead.appendChild(tr);
      return thead;
    }
    // Same opener as a {@c id} link (render.js) and the fight-view name below:
    // a bare <span class="tag tag-creature" data-cid> that app.js's delegated
    // click handler picks up. cid is null for names with no creature entry
    // (PCs, Veska, Ser Lucan) — those stay plain text.
    function creatureNameTd(name, cid) {
      var td = el("td");
      td.appendChild(el("span", cid ? "tag tag-creature" : null, name));
      if (cid) td.lastChild.dataset.cid = cid;
      return td;
    }
    function numberInput(value, onChange) {
      var inp = document.createElement("input");
      inp.type = "number";
      inp.className = "tracker-input";
      inp.value = value;
      inp.addEventListener("change", function () { onChange(inp.value === "" ? "" : Number(inp.value)); });
      return inp;
    }
    // Pulls every member of a group next to the group's first row (new array).
    function clusterGroups(rows) {
      var out = [];
      rows.forEach(function (r) {
        if (r.gid && out.some(function (o) { return o.gid === r.gid; })) return;
        out.push(r);
        if (r.gid) rows.forEach(function (o) { if (o !== r && o.gid === r.gid) out.push(o); });
      });
      return out;
    }
    function isLeader(rows, i) { return !rows[i].gid || i === 0 || rows[i - 1].gid !== rows[i].gid; }
    function groupRows(gid) { return state.rows.filter(function (r) { return r.gid === gid; }); }

    // re-sort by initiative; the turn marker stays on the same creature
    function resort() {
      var current = state.rows[state.idx];
      state.rows = Core.sortInitiative(state.rows.map(function (r) { return { init: Number(r.init) || 0, dex: r.dex, isPC: r.kind === "pc", _row: r }; })).map(function (w) { return w._row; });
      state.rows = clusterGroups(state.rows);
      state.idx = Math.max(0, state.rows.indexOf(current));
      while (state.idx > 0 && !isLeader(state.rows, state.idx)) state.idx--;
    }

    // -------- fight view -----------------------------------------------------
    function renderFight() {
      root.innerHTML = "";
      var head = el("div", "fight-head");
      head.appendChild(el("span", "fight-round", "Round " + state.round));
      var resetBtn = el("button", "tracker-btn-sm", "Reset fight");
      resetBtn.addEventListener("click", function () {
        if (confirm("Reset this fight? This clears initiative, HP and conditions.")) {
          state = { phase: "setup", rows: [], idx: 0, round: 1 };
          persist();
          renderRoot();
        }
      });
      head.appendChild(resetBtn);
      root.appendChild(head);

      var table = el("table", "tracker-table tracker-fight");
      table.appendChild(headerRow(["Init", "Name", "HP", "AC", "Dmg/Heal", "Legendary", "Conditions", ""]));
      var tbody = el("tbody");
      var curGid = state.rows[state.idx] && state.rows[state.idx].gid;
      state.rows.forEach(function (row, i) {
        if (row.gid && isLeader(state.rows, i)) tbody.appendChild(renderGroupHeader(row.gid));
        var isCur = i === state.idx || (curGid && row.gid === curGid);
        var tr = el("tr", isCur ? "fight-row fight-row-current" : "fight-row");
        if (row.gid) tr.classList.add("fight-row-grouped");
        if (row.hp === 0 && row.maxHp > 0 && row.kind === "monster") tr.classList.add("fight-row-dead");

        var initInput = numberInput(row.init, function (v) {
          // group members share one initiative: editing one edits them all
          if (row.gid) { groupRows(row.gid).forEach(function (r) { r.init = v; }); state.groupInit = Object.assign({}, state.groupInit, { [row.gid]: v }); }
          else row.init = v;
          resort(); persist(); renderFight();
        });
        var tdInit = el("td"); tdInit.appendChild(initInput); tr.appendChild(tdInit);

        var nameCell = el("td");
        var nameSpan = el("span", "fight-name", row.name);
        if (row.cid) {
          nameSpan.classList.add("tag", "tag-creature");
          nameSpan.dataset.cid = row.cid;
          if (row.isLair) nameSpan.dataset.lair = "1";
        }
        if (row.hp === 0 && row.maxHp > 0 && row.kind === "monster") nameCell.appendChild(el("span", "skull-mark", "☠ "));
        nameCell.appendChild(nameSpan);
        tr.appendChild(nameCell);

        var hpCell = el("td", "hp-cell");
        if (row.maxHp > 0) {
          var bar = el("div", "hp-bar");
          var pct = Math.max(0, Math.min(100, (row.hp / row.maxHp) * 100));
          var fill = el("div", "hp-bar-fill");
          fill.style.width = pct + "%";
          bar.appendChild(fill);
          hpCell.appendChild(bar);
          hpCell.appendChild(el("span", "hp-text", row.hp + "/" + row.maxHp));
          if (row.kind === "pc" && row.hp <= 0) {
            hpCell.appendChild(renderDeathSaves(row));
          }
        } else {
          hpCell.appendChild(el("span", "hp-text", "—"));
        }
        tr.appendChild(hpCell);

        tr.appendChild(el("td", null, row.ac != null ? String(row.ac) : "—"));

        var dmgCell = el("td");
        var dmgRow = el("div", "dmg-heal-row");
        var amountInput = document.createElement("input");
        amountInput.type = "number";
        amountInput.className = "tracker-input tracker-input-sm";
        amountInput.value = "";
        var dmgBtn = el("button", "tracker-btn-sm", "Dmg");
        var healBtn = el("button", "tracker-btn-sm", "Heal");
        dmgBtn.addEventListener("click", function () { applyHp(row, -(Number(amountInput.value) || 0)); });
        healBtn.addEventListener("click", function () { applyHp(row, Number(amountInput.value) || 0); });
        dmgRow.appendChild(amountInput);
        dmgRow.appendChild(dmgBtn);
        dmgRow.appendChild(healBtn);
        dmgCell.appendChild(dmgRow);
        tr.appendChild(dmgCell);

        var legCell = el("td");
        if (row.legendaryCount > 0) {
          for (var p = 0; p < row.legendaryCount; p++) {
            var pip = el("span", "legendary-pip" + (p < row.legendaryUsed ? " spent" : ""), "●");
            pip.dataset.pipIndex = String(p);
            (function (idx2) {
              pip.addEventListener("click", function () {
                row.legendaryUsed = row.legendaryUsed > idx2 ? idx2 : idx2 + 1;
                persist();
                renderFight();
              });
            })(p);
            legCell.appendChild(pip);
          }
        }
        tr.appendChild(legCell);

        var condCell = el("td");
        var condInput = document.createElement("input");
        condInput.type = "text";
        condInput.className = "tracker-input";
        condInput.value = row.conditions || "";
        condInput.addEventListener("change", function () { row.conditions = condInput.value; persist(); });
        condCell.appendChild(condInput);
        tr.appendChild(condCell);

        var rmCell = el("td");
        var rmBtn = el("button", "tracker-btn-sm", "×");
        rmBtn.addEventListener("click", function () {
          var wasCurrent = i === state.idx;
          state.rows.splice(i, 1);
          if (state.idx > i || (state.idx === i && wasCurrent)) state.idx = Math.max(0, state.idx - 1);
          persist();
          renderFight();
        });
        rmCell.appendChild(rmBtn);
        tr.appendChild(rmCell);

        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      root.appendChild(table);

      function setHp(row, delta) {
        row.hp = Math.max(0, Math.min(row.maxHp || row.hp + delta, row.hp + delta));
      }
      function applyHp(row, delta) {
        setHp(row, delta);
        persist();
        renderFight();
      }

      // Group header: collective save (one d20) + damage to every living member.
      function renderGroupHeader(gid) {
        var members = groupRows(gid);
        var creature = session.creatures[gid];
        var saved = (state.groupSaves || {})[gid] || { ability: "dex", dc: 15 };
        function remember(patch) {
          state.groupSaves = Object.assign({}, state.groupSaves, { [gid]: Object.assign({}, saved, patch) });
          saved = state.groupSaves[gid];
        }
        var tr = el("tr", "group-header");
        var td = el("td"); td.colSpan = 8;
        var wrap = el("div", "group-controls");
        wrap.appendChild(el("strong", "group-title", (creature ? creature.name : gid) + " ×" + members.length + " · init " + members[0].init));

        var saveBox = el("span", "group-save");
        saveBox.appendChild(el("span", null, "Group save "));
        var abil = document.createElement("select");
        abil.className = "tracker-input tracker-input-sm";
        ["str", "dex", "con", "int", "wis", "cha"].forEach(function (a) {
          var o = document.createElement("option"); o.value = a; o.textContent = a.toUpperCase();
          if (a === saved.ability) o.selected = true;
          abil.appendChild(o);
        });
        var dcIn = document.createElement("input");
        dcIn.type = "number"; dcIn.className = "tracker-input tracker-input-sm"; dcIn.value = saved.dc; dcIn.title = "DC";
        abil.addEventListener("change", function () { remember({ ability: abil.value }); persist(); });
        dcIn.addEventListener("change", function () { remember({ dc: Number(dcIn.value) || 0 }); persist(); });
        var rollBtn = el("button", "tracker-btn-sm", "Roll");
        rollBtn.addEventListener("click", function () {
          var dc = Number(dcIn.value) || 0;
          var r = Core.rollGroupSave(creature, abil.value, dc);
          remember({ ability: abil.value, dc: dc, total: r.total, pass: r.pass });
          persist(); renderFight();
        });
        saveBox.appendChild(abil); saveBox.appendChild(el("span", null, " DC ")); saveBox.appendChild(dcIn); saveBox.appendChild(rollBtn);
        if (saved.total != null) {
          saveBox.appendChild(el("span", "group-save-result " + (saved.pass ? "pass" : "fail"), " " + saved.total + (saved.pass ? " pass" : " fail")));
        }
        wrap.appendChild(saveBox);

        var applyBox = el("span", "group-apply");
        var dmg = document.createElement("input");
        dmg.type = "number"; dmg.className = "tracker-input tracker-input-sm"; dmg.placeholder = "dmg";
        var mode = document.createElement("select");
        mode.className = "tracker-input tracker-input-sm";
        [["full", "Full"], ["half", "Half"]].forEach(function (p) {
          var o = document.createElement("option"); o.value = p[0]; o.textContent = p[1]; mode.appendChild(o);
        });
        if (saved.pass != null) mode.value = saved.pass ? "half" : "full";
        var applyBtn = el("button", "tracker-btn-sm", "Apply to group");
        applyBtn.addEventListener("click", function () {
          var amt = Math.abs(Number(dmg.value) || 0);
          if (mode.value === "half") amt = Math.floor(amt / 2);
          members.forEach(function (r) { if (r.hp > 0) setHp(r, -amt); });
          persist(); renderFight();
        });
        applyBox.appendChild(dmg); applyBox.appendChild(mode); applyBox.appendChild(applyBtn);
        wrap.appendChild(applyBox);
        td.appendChild(wrap); tr.appendChild(td);
        return tr;
      }

      function renderDeathSaves(row) {
        var wrap = el("div", "death-saves");
        wrap.appendChild(el("span", "death-label", "Dying"));
        var succ = el("span", "death-boxes");
        for (var s = 0; s < 3; s++) {
          var b = el("span", "death-box" + (s < row.deathSuccess ? " filled" : ""), "✓");
          (function (idx3) { b.addEventListener("click", function () { row.deathSuccess = row.deathSuccess > idx3 ? idx3 : idx3 + 1; persist(); renderFight(); }); })(s);
          succ.appendChild(b);
        }
        wrap.appendChild(succ);
        var fail = el("span", "death-boxes death-boxes-fail");
        for (var f = 0; f < 3; f++) {
          var fb = el("span", "death-box death-box-fail" + (f < row.deathFail ? " filled" : ""), "✗");
          (function (idx4) { fb.addEventListener("click", function () { row.deathFail = row.deathFail > idx4 ? idx4 : idx4 + 1; persist(); renderFight(); }); })(f);
          fail.appendChild(fb);
        }
        wrap.appendChild(fail);
        return wrap;
      }

      var ctrl = el("div", "fight-controls");
      var prevBtn = el("button", "tracker-btn", "Previous turn");
      var nextBtn = el("button", "tracker-btn tracker-btn-primary", "Next turn (N)");
      prevBtn.addEventListener("click", doPrev);
      nextBtn.addEventListener("click", doNext);
      ctrl.appendChild(prevBtn);
      ctrl.appendChild(nextBtn);

      var addWrap = el("div", "fight-add");
      var select = document.createElement("select");
      select.className = "tracker-input";
      var def = document.createElement("option");
      def.textContent = "Add creature…";
      def.value = "";
      select.appendChild(def);
      Object.keys(session.creatures || {}).forEach(function (cid) {
        var opt = document.createElement("option");
        opt.value = cid;
        opt.textContent = session.creatures[cid].name;
        select.appendChild(opt);
      });
      select.addEventListener("change", function () {
        if (!select.value) return;
        var c = session.creatures[select.value];
        var newRow = makeRow({
          id: "mon-" + select.value + "-" + Date.now(), kind: "monster", name: c.name,
          init: rollInit(c).total, dex: initModOf(c), hp: c.hp || 0, maxHp: c.hp || 0, ac: c.ac != null ? c.ac : null,
          legendaryCount: (c.legendary && c.legendary.count) || 0, cid: select.value
        });
        state.rows.push(newRow);
        resort();
        persist();
        renderFight();
        select.value = "";
      });
      addWrap.appendChild(select);

      ctrl.appendChild(addWrap);
      root.appendChild(ctrl);

      var currentEl = tbody.children[state.idx];
      if (currentEl && currentEl.scrollIntoView) currentEl.scrollIntoView({ block: "nearest" });
    }

    // A group takes one turn: step past non-leader members.
    function doNext() {
      var r = Core.nextTurn(state.rows, state.idx, state.round);
      for (var g = 0; g < r.order.length && !isLeader(r.order, r.idx); g++) {
        r = Core.nextTurn(r.order, r.idx, r.round);
      }
      state.idx = r.idx;
      state.round = r.round;
      state.rows = r.order;
      persist();
      renderFight();
    }
    function doPrev() {
      var r = Core.prevTurn(state.rows, state.idx, state.round);
      for (var g = 0; g < state.rows.length && !isLeader(state.rows, r.idx); g++) {
        r = Core.prevTurn(state.rows, r.idx, r.round);
      }
      state.idx = r.idx;
      state.round = r.round;
      persist();
      renderFight();
    }

    function renderRoot() {
      if (state.phase === "fight") {
        renderFight();
        // most recently rendered running fight is "active" without a click,
        // so N works right after a page load/reload.
        activeTracker = api;
      } else {
        renderSetup();
      }
    }
  }

  var activeTracker = null;
  document.addEventListener("mousedown", function (e) {
    var root = e.target.closest ? e.target.closest("[data-encounter-root]") : null;
    if (root && root._trackerApi) activeTracker = root._trackerApi;
  });

  window.DMTracker = {
    renderEncounter: renderEncounter,
    triggerNextTurn: function () { if (activeTracker) activeTracker.nextTurn(); }
  };
})();
