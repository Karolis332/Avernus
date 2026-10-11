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

  function dexModOf(creature) {
    return creature && creature.abilities ? Core.abilityMod(creature.abilities.dex || 10) : 0;
  }

  function rollInit(creature) {
    var mod = dexModOf(creature);
    var r = Core.rollDice("1d20" + (mod >= 0 ? "+" + mod : mod));
    return { total: r.total, roll: r.rolls[0], mod: mod };
  }

  function makeRow(opts) {
    return Object.assign({
      id: "", kind: "monster", name: "", init: 0, dex: 0, hp: 0, maxHp: 0, ac: null,
      legendaryCount: 0, legendaryUsed: 0, conditions: "", deathSuccess: 0, deathFail: 0,
      cid: null, isLair: false
    }, opts);
  }

  function renderEncounter(block, ctx) {
    var session = ctx.session;
    var sessionId = session.id;
    var root = el("div", "block block-encounter");
    root.dataset.encounterRoot = "1";
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
          tr.appendChild(el("td", null, ally.name));
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
      monsterTable.appendChild(headerRow(["Monster", "Init", "Dex mod", "Reroll"]));
      var monsterBody = el("tbody");
      var monsterState = combatantInstances.map(function (inst) {
        return { inst: inst, init: "", dex: dexModOf(inst.creature) };
      });
      function renderMonsterRows() {
        monsterBody.innerHTML = "";
        monsterState.forEach(function (m) {
          var tr = el("tr");
          tr.appendChild(el("td", null, m.inst.instanceName));
          var initInput = numberInput(m.init || "", function (v) { m.init = v; });
          var tdInit = el("td"); tdInit.appendChild(initInput); tr.appendChild(tdInit);
          tr.appendChild(el("td", null, (m.dex >= 0 ? "+" : "") + m.dex));
          var reroll = el("button", "tracker-btn-sm", "Reroll");
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
              init: Number(row.init.value) || 0, dex: 0, hp: 0, maxHp: 0, ac: null
            }));
          }
        });
        monsterState.forEach(function (m) {
          var c = m.inst.creature || {};
          // a blank init box means "roll it for me", not init 0
          var init = blank(m.init) ? rollInit(m.inst.creature).total : Number(m.init);
          rows.push(makeRow({
            id: "mon-" + m.inst.instanceId, kind: "monster", name: m.inst.instanceName,
            init: init, dex: m.dex, hp: c.hp || 0, maxHp: c.hp || 0, ac: c.ac != null ? c.ac : null,
            legendaryCount: (c.legendary && c.legendary.count) || 0, cid: m.inst.cid
          }));
        });
        if (lairCreature) {
          // -Infinity would serialise to null through JSON.stringify; -99 is
          // low enough to lose every realistic dex tie at initiative 20.
          rows.push(makeRow({ id: "lair", kind: "lair", name: lairCreature.name + " — Lair Action", init: 20, dex: -99, isLair: true, cid: block.lair }));
        }
        rows = Core.sortInitiative(rows.map(function (r) { return { init: r.init, dex: r.dex, isPC: r.kind === "pc", _row: r }; }))
          .map(function (w) { return w._row; });
        state = { phase: "fight", rows: rows, idx: 0, round: 1 };
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
    function numberInput(value, onChange) {
      var inp = document.createElement("input");
      inp.type = "number";
      inp.className = "tracker-input";
      inp.value = value;
      inp.addEventListener("change", function () { onChange(inp.value === "" ? "" : Number(inp.value)); });
      return inp;
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
      state.rows.forEach(function (row, i) {
        var tr = el("tr", i === state.idx ? "fight-row fight-row-current" : "fight-row");
        if (row.hp === 0 && row.maxHp > 0 && row.kind === "monster") tr.classList.add("fight-row-dead");

        var initInput = numberInput(row.init, function (v) { row.init = v; persist(); });
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

      function applyHp(row, delta) {
        row.hp = Math.max(0, Math.min(row.maxHp || row.hp + delta, row.hp + delta));
        persist();
        renderFight();
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
          init: rollInit(c).total, dex: dexModOf(c), hp: c.hp || 0, maxHp: c.hp || 0, ac: c.ac != null ? c.ac : null,
          legendaryCount: (c.legendary && c.legendary.count) || 0, cid: select.value
        });
        state.rows.push(newRow);
        var currentRow = state.rows[state.idx];
        state.rows = Core.sortInitiative(state.rows.map(function (r) { return { init: r.init, dex: r.dex, isPC: r.kind === "pc", _row: r }; })).map(function (w) { return w._row; });
        state.idx = Math.max(0, state.rows.indexOf(currentRow));
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

    function doNext() {
      var r = Core.nextTurn(state.rows, state.idx, state.round);
      state.idx = r.idx;
      state.round = r.round;
      state.rows = r.order;
      persist();
      renderFight();
    }
    function doPrev() {
      var r = Core.prevTurn(state.rows, state.idx, state.round);
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
