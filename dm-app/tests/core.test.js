// node dm-app/tests/core.test.js
var assert = require("assert");
var DMCore = require("../js/core.js");

// parseTags
(function () {
  var toks = DMCore.parseTags("Hello {@c skarrix|the dragon} and {@dice 2d6}!");
  assert.strictEqual(toks[0].type, "text");
  assert.strictEqual(toks[1].type, "c");
  assert.strictEqual(toks[1].id, "skarrix");
  assert.strictEqual(toks[1].label, "the dragon");
  assert.strictEqual(toks[3].type, "dice");
  assert.strictEqual(toks[3].expr, "2d6");

  var spell = DMCore.parseTags("{@spell fireball} {@spell cure wounds|xge}")[0];
  assert.strictEqual(spell.type, "spell");
  assert.strictEqual(spell.src, "phb");

  var item = DMCore.parseTags("{@item longsword}")[0];
  assert.strictEqual(item.src, "dmg");

  assert.strictEqual(DMCore.stripTags("A {@b bold} {@c skarrix|Skarrix} thing"), "A bold Skarrix thing");
})();

// rollDice
(function () {
  var seq = [0, 0.99];
  var i = 0;
  var rng = function () { return seq[i++ % seq.length]; };
  var r = DMCore.rollDice("2d6+3", rng);
  assert.deepStrictEqual(r.rolls, [1, 6]);
  assert.strictEqual(r.mod, 3);
  assert.strictEqual(r.total, 10);

  var bad = DMCore.rollDice("not-dice");
  assert.ok(bad.error);
})();

// abilityMod
(function () {
  assert.strictEqual(DMCore.abilityMod(10), 0);
  assert.strictEqual(DMCore.abilityMod(14), 2);
  assert.strictEqual(DMCore.abilityMod(8), -1);
})();

// fuzzyScore
(function () {
  assert.strictEqual(DMCore.fuzzyScore("Arkhan's Tower", "arkhan's tower"), 4);
  assert.strictEqual(DMCore.fuzzyScore("Arkhan's Tower", "ark tow"), 3);
  assert.strictEqual(DMCore.fuzzyScore("markhand rowtower", "arkhan tower"), 2);
  assert.strictEqual(DMCore.fuzzyScore("skarrix", "srx"), 1);
  assert.strictEqual(DMCore.fuzzyScore("skarrix", "zzz"), -1);
  // typo tolerance: a tight subsequence still hits (tier 1) — "mantcore"
  // (missing the i) is not a substring of "Manticore", so this only passes
  // via the subsequence path.
  assert.strictEqual(DMCore.fuzzyScore("Manticore", "mantcore"), 1);
  assert.strictEqual(DMCore.fuzzyScore("Tower Ogre", "torogr"), 1);
  // but a loose subsequence sprawled across unrelated text is rejected
  assert.strictEqual(DMCore.fuzzyScore("the merchant and the carter rode in", "mantcore"), -1);
})();

// sortInitiative
(function () {
  var list = [
    { id: "a", init: 10, dex: 2, isPC: false },
    { id: "b", init: 15, dex: 1, isPC: true },
    { id: "c", init: 10, dex: 3, isPC: false },
    { id: "d", init: 10, dex: 3, isPC: true }
  ];
  var sorted = DMCore.sortInitiative(list).map(function (x) { return x.id; });
  // b (15) first; then init=10 tie: dex 3 beats dex 2 -> c/d before a; among dex-3 tie, PC (d) before monster (c)
  assert.deepStrictEqual(sorted, ["b", "d", "c", "a"]);
})();

// nextTurn / prevTurn (round wrap + legendary reset)
// Rows use the REAL shape tracker.js's makeRow() produces: legendaryCount
// (how many pips) + legendaryUsed, not a bare `.legendary` flag — core.js
// previously checked the wrong key and pips never reset in the app.
(function () {
  var order = [
    { id: "pc1", kind: "pc", legendaryCount: 0, legendaryUsed: 0 },
    { id: "dragon", kind: "monster", legendaryCount: 3, legendaryUsed: 2 },
    { id: "pc2", kind: "pc", legendaryCount: 0, legendaryUsed: 0 }
  ];
  var r1 = DMCore.nextTurn(order, 0, 1);
  assert.strictEqual(r1.idx, 1);
  assert.strictEqual(r1.round, 1);
  assert.strictEqual(r1.order[1].legendaryUsed, 0); // reset on entering dragon's turn

  var r2 = DMCore.nextTurn(order, 2, 1);
  assert.strictEqual(r2.idx, 0);
  assert.strictEqual(r2.round, 2); // wrapped

  var p1 = DMCore.prevTurn(order, 0, 2);
  assert.strictEqual(p1.idx, 2);
  assert.strictEqual(p1.round, 1);

  // reset only fires for the row whose turn is actually starting, not every row
  var order2 = [
    { id: "a", legendaryCount: 3, legendaryUsed: 1 },
    { id: "b", legendaryCount: 3, legendaryUsed: 2 }
  ];
  var r3 = DMCore.nextTurn(order2, 0, 1);
  assert.strictEqual(r3.order[1].legendaryUsed, 0); // b's turn starts -> reset
  assert.strictEqual(r3.order[0].legendaryUsed, 1); // a untouched
})();

// expandCombatants
(function () {
  var creatures = { goblin: { name: "Goblin" }, dragon: { name: "Skarrix" } };
  var out = DMCore.expandCombatants([{ c: "goblin", n: 2 }, { c: "dragon", n: 1 }], creatures);
  assert.strictEqual(out.length, 3);
  assert.strictEqual(out[0].instanceName, "Goblin 1");
  assert.strictEqual(out[1].instanceName, "Goblin 2");
  assert.strictEqual(out[2].instanceName, "Skarrix");
})();

// slugify (must match tools/build_library.py's map id slugging)
(function () {
  assert.strictEqual(DMCore.slugify("Styx Watchtower 45x20"), "styx-watchtower-45x20");
  assert.strictEqual(DMCore.slugify("  Avernus Encounter Map 40x40 "), "avernus-encounter-map-40x40");
  assert.strictEqual(DMCore.slugify("A/B (test)!"), "a-b-test");
})();

// searchLibraryText
(function () {
  var text = {
    "doc-a": ["Krull is a devil general.", "Nothing relevant here."],
    "doc-b": ["Random page about dragons."]
  };
  var hits = DMCore.searchLibraryText(text, "krull");
  assert.strictEqual(hits.length, 1);
  assert.strictEqual(hits[0].docId, "doc-a");
  assert.strictEqual(hits[0].page, 1);

  assert.deepStrictEqual(DMCore.searchLibraryText(text, ""), []);
  assert.deepStrictEqual(DMCore.searchLibraryText(null, "krull"), []);

  var capped = DMCore.searchLibraryText({
    d: ["aaa krull", "bbb krull", "ccc krull", "ddd krull", "eee krull", "fff krull", "ggg krull"]
  }, "krull", 6);
  assert.strictEqual(capped.length, 6);
})();

// mergeCampaign
(function () {
  var session = { title: "S", creatures: { a: { name: "Session A" } }, side: { x: { title: "Session X" } } };
  var campaign = { creatures: { a: { name: "Campaign A" }, b: { name: "Campaign B" } }, side: { y: { title: "Campaign Y" } } };
  var merged = DMCore.mergeCampaign(session, campaign);
  assert.strictEqual(merged.creatures.a.name, "Session A"); // session wins on conflict
  assert.strictEqual(merged.creatures.b.name, "Campaign B");
  assert.strictEqual(merged.side.x.title, "Session X");
  assert.strictEqual(merged.side.y.title, "Campaign Y");
  assert.strictEqual(merged.title, "S");
  // originals untouched
  assert.strictEqual(session.creatures.b, undefined);

  // missing/undefined campaign — must not throw, session content stays intact
  var untouched = DMCore.mergeCampaign(session, undefined);
  assert.strictEqual(untouched.creatures.a.name, "Session A");
  assert.deepStrictEqual(Object.keys(untouched.creatures), ["a"]);

  // missing session
  var noSession = DMCore.mergeCampaign(undefined, campaign);
  assert.strictEqual(noSession.creatures.b.name, "Campaign B");
})();

// applyPinState
(function () {
  var pin = { id: "arkhans-tower", status: "open" };
  var noState = DMCore.applyPinState(pin, {});
  assert.strictEqual(noState.status, "open");
  assert.strictEqual(noState.note, "");
  assert.notStrictEqual(noState, pin); // new object

  var withState = DMCore.applyPinState(pin, { "arkhans-tower": { status: "done", note: "Skipped the fight" } });
  assert.strictEqual(withState.status, "done");
  assert.strictEqual(withState.note, "Skipped the fight");
  assert.strictEqual(pin.status, "open"); // original untouched
})();

// setPinState
(function () {
  var state = { a: { status: "done", note: "old" } };
  var next = DMCore.setPinState(state, "a", { note: "new" });
  assert.strictEqual(next.a.status, "done"); // preserved
  assert.strictEqual(next.a.note, "new");
  assert.strictEqual(state.a.note, "old"); // original untouched

  var withNew = DMCore.setPinState(state, "b", { status: "skipped" });
  assert.strictEqual(withNew.b.status, "skipped");
  assert.strictEqual(state.b, undefined);
})();

// countSessionsLeft
(function () {
  var pins = [
    { id: "p1", path: "main", status: "open", sessions: 2 },
    { id: "p2", path: "main", status: "done", sessions: 3 },      // done -> excluded
    { id: "p3", path: "optional", status: "changed", sessions: 1 },
    { id: "p4", path: "optional", status: "skipped", sessions: 5 } // skipped -> excluded
  ];
  var counts = DMCore.countSessionsLeft(pins, {});
  assert.strictEqual(counts.main, 2);     // only p1 (main, open)
  assert.strictEqual(counts.all, 3);      // p1 + p3

  // saved state overrides defaults
  var counts2 = DMCore.countSessionsLeft(pins, { p1: { status: "done" }, p2: { status: "changed" } });
  assert.strictEqual(counts2.main, 3);    // p2 now counts (main, changed), p1 no longer does
  assert.strictEqual(counts2.all, 4);     // p2 + p3

  assert.deepStrictEqual(DMCore.countSessionsLeft([], {}), { main: 0, all: 0 });
  assert.deepStrictEqual(DMCore.countSessionsLeft(undefined, undefined), { main: 0, all: 0 });
})();

console.log("core.test.js: all assertions passed");
