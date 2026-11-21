// node dm-app/tests/emporium-talk.test.js: the Talk tab's data, the mini-games and Gristle's Ladder.
// Every riddle that reveals names a real hidden row of its own stall; every secret a riddle pays exists; nothing the
// monitor shows (a secret's title and line) carries DM wording; every opponent on the Ladder has a stat block.
var assert = require("assert");
global.window = global.window || {};
var Core = require("../js/core.js");
var C = require("../js/emporium-cast.js");
var M = require("../sessions/campaign-emporium-goods.js");
var P = require("../sessions/campaign-emporium-players.js");
var T = require("../sessions/campaign-emporium-talk.js");
require("../sessions/campaign-world.js");
require("../sessions/campaign-emporium-minigames.js");
require("../sessions/campaign-emporium-gauntlets.js");
var SIDE = window.CAMPAIGN.side, CREATURES = window.CAMPAIGN.creatures;

// the same rule as tests/emporium-players.test.js: what must never reach the players' monitor
var NEVER_ON_SCREEN = /\b(Insight|Perception|Investigation) DC\b|\bclause \d|\bclue \d|\bArkhan\b|\bKrull\b|\bDM\b|\bmy (reading|ruling|addition)\b|\bSession \d|hunt roll|Catch:|Tonight's rack|\bVolatile\b|\{@/i;

var spots = {};
M.spots.forEach(function (s) { spots[s.id] = s; });

assert.ok(T.guide.length >= 5, "the authenticity guide is there");
Object.keys(T.spots).forEach(function (id) {
  var s = spots[id], t = T.spots[id];
  assert.ok(s, id + ": not a spot on the map");
  ["voice", "look", "senses", "wants", "tell"].forEach(function (f) { assert.ok((t[f] || "").length > 20, id + ": how to play them needs " + f); });
  assert.ok((t.phrases || []).length >= 4, id + ": at least four lines in their voice");
  t.phrases.forEach(function (p) { assert.ok(p.length === 2 && p[0] && p[1], id + ": a phrase is [when, line]"); });

  var ids = (t.secrets || []).map(function (x) { return x.id; });
  assert.strictEqual(new Set(ids).size, ids.length, id + ": secret ids repeat");
  (t.secrets || []).forEach(function (x) {
    ["title", "earn", "say", "truth"].forEach(function (f) { assert.ok((x[f] || "").length > 5, id + " | " + x.id + ": needs " + f); });
    assert.ok(!NEVER_ON_SCREEN.test(x.title + " " + x.say), id + " | " + x.id + ": DM wording would reach the monitor");
  });

  (t.riddles || []).forEach(function (r) {
    ["title", "ask", "answer", "win"].forEach(function (f) { assert.ok(r[f], id + " | " + r.title + ": needs " + f); });
    if (r.secret) assert.ok(ids.indexOf(r.secret) !== -1, id + " | " + r.title + ": pays a secret that does not exist");
    if (r.reveal) {
      var row = (s.stock || []).filter(function (it) { return Core.stripTags(it.name) === r.reveal; })[0];
      assert.ok(row, id + " | " + r.title + ": reveals a row that is not on this stall: " + r.reveal);
      assert.ok(C.isHidden(s, row, P), id + " | " + r.title + ": reveals a row the monitor already shows: " + r.reveal);
    }
  });

  (t.games || []).forEach(function (g) { assert.ok(SIDE[g] && SIDE[g].blocks.length, id + ": game panel missing: " + g); });
});

// every {@c} on the Ladder and in the games has a stat block, and the new blocks are complete
var linked = JSON.stringify(Object.keys(SIDE).filter(function (k) { return /^(mini-|emporium-gauntlets)/.test(k); }).map(function (k) { return SIDE[k]; }))
  .match(/\{@c [a-z0-9-]+/g).map(function (x) { return x.slice(4); });
assert.ok(linked.length >= 12, "the four ladders name their twelve opponents");
linked.forEach(function (c) {
  var cr = CREATURES[c];
  assert.ok(cr, "no stat block for " + c);
  assert.ok(cr.name && cr.ac && cr.hp && cr.cr && (cr.actions || []).length, c + ": incomplete stat block");
});
assert.strictEqual(T.spots["devils-teeth"].games.indexOf("emporium-gauntlets"), 0, "the Ladder lives at the Devil's Teeth");

console.log("emporium-talk: all tests passed");
