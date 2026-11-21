// The Emporium's game boards: the DM drives them from the Games tab (emporium.html), the players watch them on the
// monitor (emporium.html?view=players). Boards: sessions/campaign-emporium-boards.js. State of every board lives in
// localStorage "dmapp:emporium:boards" ({ id: state }); which one the monitor shows is screen.board.
// The players roll their own dice; the screen rolls only for the house: the Derby's lemures and Velluc at Imp Skulls.
// Pure parts (fresh, act) tested in tests/emporium-boards.test.js.
(function () {
  "use strict";
  var inNode = typeof module !== "undefined" && module.exports;

  function die(n, d, rng) { var t = 0; for (var i = 0; i < n; i++) t += 1 + Math.floor(rng() * d); return t; }
  function sum(a) { return a.reduce(function (t, x) { return t + x; }, 0); }
  function copy(o) { return JSON.parse(JSON.stringify(o)); }
  function four(v) { return [v, v, v, v]; }

  function fresh(def) {
    switch (def.kind) {
      case "ladder": return { fighter: def.fighter, results: [] };
      case "race": return { round: 0, pos: four(0), out: four(null), asleep: four(false), blob: four(-1), cheer: four(0), moves: four(0), notes: [], pit: "", winner: null };
      case "pot": return { pile: [], bust: false, stopped: false, house: [], result: null };
      case "toast": return { cup: 0, drinkers: drinkers(def.drinkers), winner: null };
      case "iron": return { round: 0, dropped: false };
      case "vials": return { drunk: [] };
      default: return {};
    }
  }
  function drinkers(text) {
    return String(text || "").split(",").map(function (n) { return n.trim(); }).filter(Boolean).slice(0, 6).map(function (n) { return { name: n, fails: 0 }; });
  }

  // One Derby round: the Pit's d8, each runner's own die and quirks, a shout-on, then the line.
  function raceRound(def, st, rng) {
    var s = copy(st), R = def.runners, notes = [], moves = four(0);
    if (s.winner !== null) return s;
    s.round += 1;
    var pit = 1 + Math.floor(rng() * 8);
    R.forEach(function (r, i) {
      if (s.out[i]) return;
      if (s.asleep[i]) {
        if (die(1, 6, rng) >= 4) { s.asleep[i] = false; notes.push(r.name + " wakes up."); } else notes.push(r.name + " is asleep in the lane.");
        return;
      }
      if (r.eats && die(1, 6, rng) === 1) {
        var near = [i - 1, i + 1].filter(function (j) { return j >= 0 && j < R.length && !s.out[j]; });
        if (near.length) { var v = near[Math.floor(rng() * near.length)]; s.out[v] = "eaten"; notes.push(r.name + " eats " + R[v].name + "!"); }
      }
      var raw = die(r.die[0], r.die[1], rng), m = raw + r.die[2];
      if (s.blob[i] >= 0) { var o = R[s.blob[i]]; m = Math.max(m, die(o.die[0], o.die[1], rng) + o.die[2]); }
      if (r.sleeps && raw === 1) { s.asleep[i] = true; notes.push(r.name + " lies down for a nap."); }
      moves[i] = m;
    });
    var live = function () { return [0, 1, 2, 3].filter(function (i) { return !s.out[i]; }); };
    if (pit === 1) moves = moves.map(function (m) { return Math.max(0, m - 2); });
    if (pit === 2 && live().length >= 3) {
      var slow = live().sort(function (a, b) { return s.pos[a] - s.pos[b]; });
      s.out[slow[0]] = "merged"; s.blob[slow[1]] = slow[0];
      notes.push(R[slow[0]].name + " and " + R[slow[1]].name + " bump and become one blob.");
    }
    if (pit === 3) {
      var lead = live().sort(function (a, b) { return s.pos[b] - s.pos[a]; })[0];
      if (lead !== undefined) moves[lead] = 0;
    }
    live().forEach(function (i) { moves[i] += s.cheer[i]; s.pos[i] += moves[i]; });
    s.cheer = four(0);
    s.moves = moves;
    s.notes = notes;
    s.pit = def.pit[pit - 1] || "";
    var over = live().filter(function (i) { return s.pos[i] >= def.length; });
    if (over.length) {
      var best = Math.max.apply(null, over.map(function (i) { return s.pos[i]; }));
      var top = over.filter(function (i) { return s.pos[i] === best; });
      while (top.length > 1) { // a dead heat: a d20 each, high wins
        var rolls = top.map(function () { return die(1, 20, rng); }), hi = Math.max.apply(null, rolls);
        top = top.filter(function (i, k) { return rolls[k] === hi; });
      }
      s.winner = top[0];
    }
    return s;
  }

  // Velluc rolls for the house in the open and stops the moment he beats the pile, or the imp bites him.
  function houseRoll(st, rng) {
    var s = copy(st), total = sum(s.pile);
    s.house = [];
    for (var n = 0; n < 60; n++) {
      var d = die(1, 6, rng);
      s.house.push(d);
      if (d === 1) { s.result = "win"; return s; }
      if (sum(s.house) >= total) { s.result = "lose"; return s; } // a tie goes to the house
    }
    s.result = "lose";
    return s;
  }

  // a: { type, i?, n?, text? }. Returns the board's next state; never changes the one given.
  function act(def, st, a, rng) {
    rng = rng || Math.random;
    var s = copy(st || fresh(def));
    if (a.type === "reset") return Object.assign(fresh(def), def.kind === "ladder" ? { fighter: s.fighter } : {});
    switch (def.kind) {
      case "ladder":
        if (a.type === "fighter") s.fighter = String(a.text || "").trim() || def.fighter;
        if ((a.type === "won" || a.type === "lost") && s.results.length < 3 && s.results.indexOf("lost") === -1) s.results.push(a.type);
        if (a.type === "undo") s.results.pop();
        return s;
      case "race":
        if (a.type === "round") return raceRound(def, s, rng);
        if (a.type === "cheer" && !s.out[a.i] && s.winner === null) s.cheer[a.i] = 2;
        return s;
      case "pot":
        if (a.type === "die" && !s.bust && !s.stopped && a.n >= 1 && a.n <= 6) { s.pile.push(a.n); if (a.n === 1) { s.bust = true; s.result = "lose"; } }
        if (a.type === "stop" && s.pile.length && !s.bust) s.stopped = true;
        if (a.type === "house" && s.stopped && !s.result) return houseRoll(s, rng);
        return s;
      case "toast":
        if (a.type === "drinkers") return Object.assign(fresh(def), { drinkers: drinkers(a.text) });
        if (a.type === "next" && s.cup < def.cups.length && s.winner === null) s.cup += 1;
        if (a.type === "fail" && s.drinkers[a.i] && s.drinkers[a.i].fails < 2 && s.cup > 0) s.drinkers[a.i].fails += 1;
        var up = s.drinkers.filter(function (d) { return d.fails < 2; });
        if (s.drinkers.length > 1 && up.length === 1) s.winner = up[0].name;
        return s;
      case "iron":
        if (a.type === "held" && !s.dropped) s.round += 1;
        if (a.type === "drop") s.dropped = true;
        return s;
      case "vials":
        if (a.type === "drink") s.drunk = s.drunk.indexOf(a.i) !== -1 ? s.drunk.filter(function (x) { return x !== a.i; }) : s.drunk.concat([a.i]);
        return s;
      default: return s;
    }
  }
  function ironDc(round) { return 10 + 2 * round; }

  var Boards = { fresh: fresh, act: act, ironDc: ironDc };
  if (inNode) { module.exports = Boards; return; }
  window.DMEmporiumBoards = Boards;

  var R = window.DMRender, el = R.el, Cast = window.DMEmporiumCast, DATA = window.EMPORIUM_BOARDS || { boards: {}, byPanel: {} };
  function all() { return Cast.load(Cast.KEYS.boards, {}); }
  function stateOf(id) { return all()[id] || fresh(DATA.boards[id]); }
  function setState(id, st) { var b = all(); b[id] = st; Cast.save(Cast.KEYS.boards, b); }
  function add(parent) { for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]); return parent; }
  function btn(label, cls, fn) { var b = el("button", cls, label); b.type = "button"; b.addEventListener("click", fn); return b; }

  // ---- the DM's controls, one box per board, under its rules in the Games tab ----
  function controls(id, cast) {
    var def = DATA.boards[id], box = el("div", "board-ctl");
    function go(a) { setState(id, act(def, stateOf(id), a)); if (!cast.boardShown(id)) cast.board(id, true); draw(); }
    function draw() {
      var s = stateOf(id), shown = cast.boardShown(id), row = el("p", "talk-act");
      box.replaceChildren(el("h4", "", "On the monitor: " + def.title + (def.fighter ? " (" + s.fighter + ")" : "")));
      add(row, btn(shown ? "Take the board down" : "Show the board", "btn small" + (shown ? "" : " go"), function () { cast.board(id, !shown); draw(); }),
        btn("Reset", "btn small", function () { go({ type: "reset" }); }));
      box.appendChild(row);
      var k = el("p", "talk-act"), say = el("p", "hint");
      if (def.kind === "ladder") {
        var f = document.createElement("input");
        f.value = s.fighter; f.size = 12; f.title = "Who fights";
        f.addEventListener("change", function () { go({ type: "fighter", text: f.value }); });
        add(k, f, btn("Won the bout", "btn small go", function () { go({ type: "won" }); }), btn("Lost the bout", "btn small", function () { go({ type: "lost" }); }),
          btn("Undo", "btn small", function () { go({ type: "undo" }); }));
        say.textContent = s.results.length ? "Rungs: " + s.results.join(", ") : "Rung 1 next.";
      } else if (def.kind === "race") {
        k.appendChild(btn(s.round ? "Next round (the screen rolls)" : "And they're off! (round 1)", "btn small go", function () { go({ type: "round" }); }));
        def.runners.forEach(function (r, i) { k.appendChild(btn("Cheer " + r.name + " +2", "btn small", function () { go({ type: "cheer", i: i }); })); });
        say.textContent = s.round ? "Round " + s.round + ": " + def.runners.map(function (r, i) { return r.name + " " + s.pos[i] + " ft" + (s.out[i] ? " (" + s.out[i] + ")" : ""); }).join(" · ") +
          (s.winner !== null ? "  ·  WINNER: " + def.runners[s.winner].name : "") : "Take the bets, then press the button.";
      } else if (def.kind === "pot") {
        [1, 2, 3, 4, 5, 6].forEach(function (n) { k.appendChild(btn("Rolled " + n, "btn small", function () { go({ type: "die", n: n }); })); });
        add(k, btn("Stops", "btn small", function () { go({ type: "stop" }); }), btn("Velluc rolls (the screen)", "btn small go", function () { go({ type: "house" }); }));
        say.textContent = "Pile " + sum(s.pile) + (s.bust ? ", bitten" : "") + (s.house.length ? " · Velluc " + sum(s.house) : "") + (s.result ? " · the player " + (s.result === "win" ? "WINS" : "loses") : "");
      } else if (def.kind === "toast") {
        var d = document.createElement("input");
        d.value = s.drinkers.map(function (x) { return x.name; }).join(", "); d.size = 30; d.title = "Drinkers, with commas";
        d.addEventListener("change", function () { go({ type: "drinkers", text: d.value }); });
        add(k, d, btn(s.cup ? "Pour the next cup" : "Pour the first cup", "btn small go", function () { go({ type: "next" }); }));
        s.drinkers.forEach(function (x, i) { k.appendChild(btn(x.name + " fails", "btn small", function () { go({ type: "fail", i: i }); })); });
        say.textContent = "Cup " + s.cup + " of " + def.cups.length + (s.winner ? " · WINNER: " + s.winner : "");
      } else if (def.kind === "iron") {
        add(k, btn("Held another round", "btn small go", function () { go({ type: "held" }); }), btn("Dropped it", "btn small", function () { go({ type: "drop" }); }));
        say.textContent = "Held " + s.round + " rounds" + (s.dropped ? ", dropped" : " · next save DC " + ironDc(s.round));
      } else if (def.kind === "vials") {
        def.vials.forEach(function (v, i) { k.appendChild(btn((s.drunk.indexOf(i) !== -1 ? "✓ " : "") + (i + 1) + ". " + v[0], "btn small", function () { go({ type: "drink", i: i }); })); });
      }
      if (k.childNodes.length) box.appendChild(k);
      if (say.textContent) box.appendChild(say);
    }
    draw();
    return box;
  }

  // ---- the monitor ----
  var lastPos = {}; // the Derby's previous positions, so the lemures slide from there
  function card(def) {
    return add(el("div", "pb-card"), el("h3", "", "How it plays"), add.apply(null, [el("ul")].concat(def.how.map(function (h) { return el("li", "", h); }))),
      el("p", "pb-money", "Buy-in: " + def.buyIn), el("p", "pb-money", "Pays: " + def.pays));
  }
  function ladderBoard(def, s) {
    var won = s.results.filter(function (r) { return r === "won"; }).length, lost = s.results.indexOf("lost") !== -1;
    var rungs = el("div", "pb-rungs");
    def.rungs.slice().reverse().forEach(function (r, k) {
      var i = def.rungs.length - 1 - k, res = s.results[i], now = !res && i === s.results.length && !lost;
      add(rungs, add(el("div", "pb-rung" + (res ? " " + res : "") + (now ? " now" : "")), el("b", "", "Rung " + (i + 1)), el("span", "pb-foe", r.name),
        el("span", "pb-prize", r.prize), res ? el("i", "pb-mark", res === "won" ? "✓" : "✗") : null));
    });
    return add(el("div", "pb-ladder"), el("p", "pb-fighter", s.fighter + " in the Ring"), rungs,
      won === 3 ? el("p", "pb-banner", "Champion of the Ladder") : lost ? el("p", "pb-banner lost", "The Red Hand pulls " + s.fighter + " out") : null);
  }
  function raceBoard(id, def, s) {
    var from = lastPos[id] || s.pos, track = el("div", "pb-track");
    def.runners.forEach(function (r, i) {
      var lane = el("div", "pb-lane" + (s.out[i] ? " out" : "") + (s.winner === i ? " win" : "")), blob = el("span", "pb-lemure" + (s.asleep[i] ? " asleep" : ""), s.asleep[i] ? "💤" : "●");
      var pct = function (p) { return Math.min(100, p / def.length * 100) * 0.88 + "%"; };
      blob.style.left = pct(from[i]);
      requestAnimationFrame(function () { requestAnimationFrame(function () { blob.style.left = pct(s.pos[i]); }); });
      add(lane, el("span", "pb-lane-name", (i + 1) + ". " + r.name + "  ·  " + r.odds), blob,
        el("span", "pb-move", s.out[i] ? s.out[i] : s.round ? "+" + s.moves[i] + " ft  (" + s.pos[i] + ")" : ""));
      track.appendChild(lane);
    });
    lastPos[id] = s.pos.slice();
    return add(el("div", "pb-race"), track, el("p", "pb-round", s.round ? "Round " + s.round : "Place your bets"),
      s.pit ? el("p", "pb-event", s.pit) : null, s.notes.length ? el("p", "pb-event", s.notes.join(" ")) : null,
      s.winner !== null ? el("p", "pb-banner", def.runners[s.winner].name + " wins!") : null);
  }
  function potBoard(def, s) {
    var total = sum(s.pile);
    return add(el("div", "pb-pot"), add.apply(null, [el("div", "pb-skulls")].concat(s.pile.map(function (n) { return el("span", "pb-skull" + (n === 1 ? " bit" : ""), String(n)); }))),
      el("p", "pb-total", s.bust ? "The imp bites!" : "Pile: " + total + (total >= def.target ? "  ·  a full skull" : "")),
      s.house.length ? add(el("p", "pb-house"), document.createTextNode("Velluc: " + s.house.join(" + ") + " = " + sum(s.house))) : null,
      s.result ? el("p", "pb-banner" + (s.result === "win" ? "" : " lost"), s.result === "win" ? (total >= def.target ? "Full skull: paid twice!" : "The house pays!") : "The house wins") : null);
  }
  function toastBoard(def, s) {
    var cups = el("div", "pb-cups");
    def.cups.forEach(function (c, i) { add(cups, add(el("div", "pb-cup" + (i < s.cup ? " poured" : "") + (i === s.cup - 1 ? " now" : "")), el("span", "pb-cup-glass", "🍷"), el("span", "", c))); });
    var who = el("div", "pb-drinkers");
    s.drinkers.forEach(function (d) { add(who, el("span", "pb-drinker" + (d.fails >= 2 ? " out" : ""), d.name + "  " + (d.fails ? "✗".repeat(d.fails) : ""))); });
    return add(el("div", "pb-toast"), cups, who, s.winner ? el("p", "pb-banner", s.winner + " is the last one standing!") : null);
  }
  function ironBoard(def, s) {
    var marks = el("div", "pb-rewards");
    Object.keys(def.rewards).forEach(function (r) { add(marks, add(el("div", "pb-reward" + (s.round >= +r ? " got" : "")), el("b", "", r + " rounds"), el("span", "", def.rewards[r]))); });
    return add(el("div", "pb-iron"), el("p", "pb-count", String(s.round)), el("p", "pb-total", s.dropped ? "Dropped after " + s.round + " rounds" : "rounds held  ·  next save DC " + ironDc(s.round)), marks);
  }
  function vialsBoard(def, s) {
    var rack = el("div", "pb-vials");
    def.vials.forEach(function (v, i) {
      var open = s.drunk.indexOf(i) !== -1;
      add(rack, add(el("div", "pb-vial" + (open ? " open" : "")), el("span", "pb-vial-glass", "⚗"), el("b", "", open ? v[0] : "Vial " + (i + 1)), open ? el("span", "", v[1]) : null));
    });
    return add(el("div", "pb-flight"), rack, el("p", "pb-total", s.drunk.length + " of " + def.pick + " drunk"));
  }
  function draw(id) {
    var def = DATA.boards[id];
    if (!def) return null;
    var s = stateOf(id), body = { ladder: ladderBoard, race: function (d, st) { return raceBoard(id, d, st); }, pot: potBoard, toast: toastBoard, iron: ironBoard, vials: vialsBoard }[def.kind];
    return add(el("section", "pv-board pb-kind-" + def.kind), add(el("div", "pb-frame"), el("h2", "", def.title),
      add(el("div", "pb-body"), body ? body(def, s) : null, card(def))));
  }

  Boards.controls = controls;
  Boards.draw = draw;
  Boards.panels = function (panelId) { return DATA.byPanel[panelId] || []; };
})();
