// node dm-app/tests/fightlog.test.js
var assert = require("assert");
var FL = require("../js/fightlog.js");

// event: the clock time and the type come first, the data is copied in
(function () {
  var data = { round: 2, who: "Flash" };
  var ev = FL.event("turn", data, 1000);
  assert.deepStrictEqual(ev, { at: 1000, type: "turn", round: 2, who: "Flash" });
  assert.deepStrictEqual(data, { round: 2, who: "Flash" }, "the data object is not changed");
  assert.deepStrictEqual(FL.event("fight-end", null, 5), { at: 5, type: "fight-end" });
})();

// append: returns a new list, never changes the old one
(function () {
  var before = [];
  var after = FL.append(before, FL.event("turn", { who: "Aurora" }, 1));
  assert.strictEqual(before.length, 0);
  assert.strictEqual(after.length, 1);
  assert.strictEqual(after[0].who, "Aurora");
})();

// append: keeps only the newest entries once the cap is reached
(function () {
  var log = [];
  for (var i = 0; i < 7; i++) log = FL.append(log, FL.event("hp", { n: i }, i), 5);
  assert.strictEqual(log.length, 5);
  assert.strictEqual(log[0].n, 2);
  assert.strictEqual(log[4].n, 6);
  assert.ok(FL.CAP >= 1000, "the default cap holds a long night");
})();

// append: a broken stored value (not a list) starts a fresh log instead of throwing
(function () {
  var ev = FL.event("turn", {}, 1);
  assert.strictEqual(FL.append(null, ev).length, 1);
  assert.strictEqual(FL.append("junk", ev).length, 1);
  assert.strictEqual(FL.append({ a: 1 }, ev).length, 1);
})();

// inWindow: both ends count; anything that is not a list gives an empty list
(function () {
  var log = [1, 5, 10, 15, 20].map(function (t) { return FL.event("turn", {}, t); });
  assert.deepStrictEqual(FL.inWindow(log, 5, 15).map(function (e) { return e.at; }), [5, 10, 15]);
  assert.deepStrictEqual(FL.inWindow(log, 21, 30), []);
  assert.deepStrictEqual(FL.inWindow(null, 0, 10), []);
})();

assert.strictEqual(FL.KEY, "dmapp:fightlog");
console.log("fightlog.test.js: all assertions passed");
