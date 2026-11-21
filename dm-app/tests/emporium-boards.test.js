// node dm-app/tests/emporium-boards.test.js: the Emporium's game boards (js/emporium-boards.js).
var assert = require("assert");
var B = require("../js/emporium-boards.js");
var D = require("../sessions/campaign-emporium-boards.js");
global.window = global.window || {};
require("../sessions/campaign-emporium-minigames.js");
var MINI = window.CAMPAIGN.side;
function rolls(list) { var i = 0; return function () { return list[i++ % list.length]; }; } // rng returning given fractions
function play(id, actions, rng) {
  var def = D.boards[id];
  return actions.reduce(function (s, a) { return B.act(def, s, a, rng); }, B.fresh(def));
}

// every board belongs to a Games panel that exists, and every mini-game has its board
Object.keys(D.byPanel).forEach(function (p) { D.byPanel[p].forEach(function (id) { assert.ok(D.boards[id], p + " -> " + id); }); });
Object.keys(MINI).filter(function (id) { return /^mini-/.test(id); }).forEach(function (id) { assert.ok(D.boards[id], "no board for " + id); });

// the monitor never shows DM wording (the same rule as tests/emporium-players.test.js)
var NEVER_ON_SCREEN = /\b(Insight|Perception|Investigation|Sleight of Hand) DC\b|\bclause \d|\bclue \d|\bArkhan\b|\bKrull\b|\bDM\b|\bSession \d|\{@/i;
assert.ok(!NEVER_ON_SCREEN.test(JSON.stringify(D.boards)), "DM wording on a board");

// the Ladder: three rungs at most, a loss ends it, undo takes one back, reset keeps the fighter
var l = play("ladder-dawn", [{ type: "won" }, { type: "lost" }, { type: "won" }]);
assert.deepStrictEqual(l.results, ["won", "lost"], "nothing after a loss");
l = play("ladder-dawn", [{ type: "fighter", text: "Lucan" }, { type: "won" }, { type: "won" }, { type: "won" }, { type: "won" }, { type: "undo" }]);
assert.deepStrictEqual(l.results, ["won", "won"]);
assert.strictEqual(B.act(D.boards["ladder-dawn"], l, { type: "reset" }).fighter, "Lucan");
assert.strictEqual(B.fresh(D.boards["ladder-sky"]).fighter, "Aurora");

// the Derby: the screen rolls; a fixed rng makes it repeatable, positions only grow, someone wins
var derby = D.boards["mini-lemure-derby"], s = B.fresh(derby);
for (var n = 0; n < 40 && s.winner === null; n++) {
  var next = B.act(derby, s, { type: "round" }, rolls([0.9, 0.5, 0.7, 0.3, 0.8, 0.6]));
  next.pos.forEach(function (p, i) { assert.ok(p >= s.pos[i], "a lemure went backwards"); });
  s = next;
}
assert.notStrictEqual(s.winner, null, "the Derby never ended");
assert.ok(s.pos[s.winner] >= derby.length);
assert.deepStrictEqual(B.act(derby, s, { type: "round" }), s, "no rounds after the winner");
// a shout-on gives +2 once; the Pit's 3 (rng .25 -> d8 3) stops the leader
var c = B.act(derby, B.fresh(derby), { type: "cheer", i: 0 });
assert.strictEqual(c.cheer[0], 2);
var lead = Object.assign(B.fresh(derby), { pos: [10, 0, 0, 0] });
assert.strictEqual(B.act(derby, lead, { type: "round" }, rolls([0.25, 0.99])).pos[0], 10, "the leader looked at the coin");

// Imp Skulls: a 1 bites, the house rolls only after a stop, a tie goes to the house
var pot = play("mini-imp-skulls", [{ type: "die", n: 5 }, { type: "die", n: 1 }, { type: "die", n: 6 }]);
assert.ok(pot.bust && pot.result === "lose");
assert.deepStrictEqual(pot.pile, [5, 1], "no rolls after the bite");
var stop = play("mini-imp-skulls", [{ type: "die", n: 6 }, { type: "stop" }]);
assert.strictEqual(B.act(D.boards["mini-imp-skulls"], stop, { type: "house" }, rolls([0.99])).result, "lose", "6 against 6: the house");
assert.strictEqual(B.act(D.boards["mini-imp-skulls"], stop, { type: "house" }, rolls([0.5, 0])).result, "win", "Velluc bit himself");
assert.strictEqual(play("mini-imp-skulls", [{ type: "die", n: 4 }, { type: "house" }]).result, null, "no house roll before a stop");

// the Toast: two fails and out; the last one upright wins
var t = play("mini-hosts-toast", [{ type: "drinkers", text: "Drenwal, Aurora" }, { type: "fail", i: 0 }, { type: "next" }, { type: "fail", i: 0 }]);
assert.strictEqual(t.drinkers[0].fails, 1, "no fail before the first cup");
t = B.act(D.boards["mini-hosts-toast"], t, { type: "fail", i: 0 });
assert.strictEqual(t.winner, "Aurora");

// Hold the Iron: the save climbs 2 a round; nothing after the drop
var iron = play("mini-hold-the-iron", [{ type: "held" }, { type: "held" }, { type: "drop" }, { type: "held" }]);
assert.strictEqual(iron.round, 2);
assert.strictEqual(B.ironDc(iron.round), 14);

// the Flight: a vial toggles
var v = play("mini-tasters-flight", [{ type: "drink", i: 2 }, { type: "drink", i: 4 }, { type: "drink", i: 2 }]);
assert.deepStrictEqual(v.drunk, [4]);

console.log("emporium-boards: ok");
