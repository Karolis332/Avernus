// node dm-app/tests/emporium-players.test.js
// The Emporium player screen (emporium.html?view=players): the helpers both windows share, and an audit that
// nothing meant for the DM can reach the monitor.
var assert = require("assert");
var Core = require("../js/core.js");
var C = require("../js/emporium-cast.js");
var M = require("../sessions/campaign-emporium-goods.js"); // the market with both stock files merged
var P = require("../sessions/campaign-emporium-players.js");

function spot(id) { return M.spots.filter(function (s) { return s.id === id; })[0]; }
function names(id) { return (spot(id).stock || []).map(function (it) { return Core.stripTags(it.name); }); }

// key: a row is known by its spot and its name without tags
(function () {
  assert.strictEqual(C.key("rapture", "{@item Bag of holding|DMG}"), "rapture|Bag of holding");
  assert.strictEqual(C.key("forge", "Arrows, +1"), "forge|Arrows, +1");
})();

// stockCount: how many of a row the stall has; null = as many as anyone wants
(function () {
  assert.strictEqual(C.stockCount({ qty: "3" }), 3);
  assert.strictEqual(C.stockCount({ qty: "3 sheaves of 10" }), 3);
  assert.strictEqual(C.stockCount({ qty: "the last 2" }), 2);
  assert.strictEqual(C.stockCount({ qty: "up to 6" }), 6);
  assert.strictEqual(C.stockCount({ qty: "the crown jewel" }), 1);
  assert.strictEqual(C.stockCount({ qty: "the lot" }), 1);
  assert.strictEqual(C.stockCount({ qty: "one sitting, up to 12" }), null);
  assert.strictEqual(C.stockCount({ qty: "plenty" }), null);
  assert.strictEqual(C.stockCount({ rarity: "rare" }), 1, "a magic item with no count is the only one");
  assert.strictEqual(C.stockCount({ rarity: "rare", c: true }), null, "a consumable with no count is restocked");
  assert.strictEqual(C.stockCount({ rarity: "mundane" }), null);
})();

// soldCounts and onHand: the ledger is the truth about what has left the shelf
(function () {
  var ledger = [
    { who: "Aurora", item: "Arrow of dragon slaying", spot: "forge", sc: 4 },
    { who: "Aurora", item: "Arrow of dragon slaying", spot: "forge", gp: 800 },
    { who: "Drenwal", item: "Scroll of heal", spot: "rapture", sc: 6 }
  ];
  var sold = C.soldCounts(ledger);
  assert.strictEqual(sold["forge|Arrow of dragon slaying"], 2);
  assert.strictEqual(sold["rapture|Scroll of heal"], 1);
  assert.deepStrictEqual(C.soldCounts(null), {});
  assert.strictEqual(C.onHand({ qty: "3" }, 2), 1);
  assert.strictEqual(C.onHand({ qty: "3" }, 5), 0, "never below nothing");
  assert.strictEqual(C.onHand({ qty: "plenty" }, 5), null);
})();

// publicGoods: what the monitor lists for a stall
(function () {
  var forge = spot("forge");
  var open = C.publicGoods(forge, P, [], []);
  var byName = {};
  open.forEach(function (g) { byName[g.name] = g; });
  assert.ok(!byName["Dragonlance, unquenched"], "a favour-only row is hidden");
  assert.strictEqual(byName["Arrow of dragon slaying"].text, P.say.forge["Arrow of dragon slaying"], "the players' line replaces the note");
  assert.strictEqual(byName["Arrows, +1"].text, "For the Moonbow, or for the crew's bows when a dragon dives.", "a row with no line shows its note");
  assert.strictEqual(byName["Arrow of dragon slaying"].sc, 4);
  assert.strictEqual(byName["Arrow of dragon slaying"].gp, 800);
  assert.strictEqual(byName["Arrow of dragon slaying"].left, 3);
  assert.strictEqual(byName["White dragon scale mail"].gp, null, "soul coins only");
  assert.strictEqual(byName["Bracers of archery"].left, 1);
  assert.strictEqual(byName["Arrows or bolts, a case of 100"].left, null);

  var after = C.publicGoods(forge, P, ["forge|Dragonlance, unquenched"], [{ who: "Aurora", item: "Arrow of dragon slaying", spot: "forge", sc: 4 }]);
  var lance = after.filter(function (g) { return g.name === "Dragonlance, unquenched"; })[0];
  assert.ok(lance && lance.revealed, "a revealed row is listed and marked");
  assert.strictEqual(lance.sc, null);
  assert.strictEqual(after.filter(function (g) { return g.name === "Arrow of dragon slaying"; })[0].left, 2);
  assert.strictEqual(after.filter(function (g) { return g.name === "Arrow of dragon slaying"; })[0].bought, 1);

  var rapture = C.publicGoods(spot("rapture"), P, [], []);
  assert.ok(!rapture.some(function (g) { return g.name === "An hour before the bell"; }), "a row on the hide list is hidden");
  assert.ok(!rapture.some(function (g) { return /\{@/.test(g.name + g.text); }), "no raw tags on the monitor");
  assert.deepStrictEqual(C.publicGoods(spot("jetty"), P, [], []), []);
})();

// purse: what is left when a purse was set at the recap, what was spent when it was not
(function () {
  var ledger = [{ who: "Aurora", item: "x", spot: "forge", sc: 4 }, { who: "Drenwal", item: "y", spot: "bank", gp: 600 }];
  assert.deepStrictEqual(C.purse({ purse: "40", purseGp: "3000" }, ledger), { coins: { set: true, value: 36 }, gold: { set: true, value: 2400 } });
  assert.deepStrictEqual(C.purse({ purse: "", purseGp: "" }, ledger), { coins: { set: false, value: 4 }, gold: { set: false, value: 600 } });
  assert.deepStrictEqual(C.purse({}, []), { coins: { set: false, value: 0 }, gold: { set: false, value: 0 } });
})();

// haul: the end-of-night recap, buyers in the order they first bought
(function () {
  var h = C.haul([
    { who: "Aurora", item: "Arrow", spotName: "Forge", sc: 4 },
    { who: "Drenwal", item: "Diamond", spotName: "Bank", gp: 600 },
    { who: "Aurora", item: "Bracers", spotName: "Forge", sc: 5 }
  ]);
  assert.deepStrictEqual(h.map(function (b) { return b.who; }), ["Aurora", "Drenwal"]);
  assert.strictEqual(h[0].items.length, 2);
  assert.strictEqual(h[0].sc, 9);
  assert.strictEqual(h[1].gp, 600);
  assert.strictEqual(h[0].items[0].paid, "4 SC");
  assert.strictEqual(h[1].items[0].paid, "600 gp");
})();

// newEntries: what was added to the ledger since the monitor last looked
(function () {
  var a = [{ at: 1, item: "x" }], b = [{ at: 1, item: "x" }, { at: 2, item: "y" }];
  assert.deepStrictEqual(C.newEntries(a, b), [{ at: 2, item: "y" }]);
  assert.deepStrictEqual(C.newEntries(b, a), [], "a removed entry is not a purchase");
  assert.deepStrictEqual(C.newEntries(null, a), a);
})();

// spotifyUri: only Spotify links are ever opened
(function () {
  assert.strictEqual(C.spotifyUri("https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?si=abc"), "spotify:track:4uLU6hMCjMI75M1A2tKUQC");
  assert.strictEqual(C.spotifyUri("https://open.spotify.com/intl-lt/playlist/37i9dQZF1DXcBWIGoYBM5M"), "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M");
  assert.strictEqual(C.spotifyUri("  spotify:album:1DFixLWuPkv3KT3TnV35m3 "), "spotify:album:1DFixLWuPkv3KT3TnV35m3");
  assert.strictEqual(C.spotifyUri("https://evil.example/track/4uLU6hMCjMI75M1A2tKUQC"), null);
  assert.strictEqual(C.spotifyUri("javascript:alert(1)"), null);
  assert.strictEqual(C.spotifyUri("spotify:track:short"), null);
  assert.strictEqual(C.spotifyUri(""), null);
  assert.strictEqual(C.spotifyUri(null), null);
})();

// ---- the audit: nothing meant for the DM reaches the monitor ----
// Wording that marks a note as the DM's: a hidden check, the Arkhan deal, a ruling, a pointer into the prep.
var DM_WORDING = /\b(Insight|Perception|Investigation|Arcana|Persuasion|Deception|Sleight of Hand) DC\b|check \(DC|\bDC \d+ (Wisdom|Arcana) check\b|\bclause \d|\bclue\b|\bArkhan\b|\bKrull\b|\bDM\b|\bmy (reading|ruling|addition)\b|\bSession \d|hunt roll|Catch[:,]|Tonight's rack|\bVolatile\b|\(see |\bdebt\b|Read (the buyer|out)/i;
var NEVER_ON_SCREEN = /\b(Insight|Perception|Investigation) DC\b|\bclause \d|\bclue \d|\bArkhan\b|\bKrull\b|\bDM\b|\bmy (reading|ruling|addition)\b|\bSession \d|hunt roll|Catch:|Tonight's rack|\bVolatile\b|\{@/i;

(function () {
  // every spot of the market has its look on the monitor
  M.spots.forEach(function (s) {
    var p = P.spots[s.id];
    assert.ok(p, s.id + ": no entry in campaign-emporium-players.js");
    assert.ok(/^#[0-9a-f]{6}$/i.test(p.theme.accent), s.id + ": theme.accent");
    assert.ok(C.FX.indexOf(p.theme.fx) !== -1, s.id + ": theme.fx " + p.theme.fx);
    if (s.keeper) assert.ok(p.greet, s.id + ": a keeper needs a greeting");
    if (s.kind !== "stall") assert.ok(p.blurb, s.id + ": a den or a place needs its public line");
    if (p.music) assert.ok(C.spotifyUri(p.music), s.id + ": music is not a Spotify link");
    [p.greet, p.blurb, p.keeper, s.look].forEach(function (t) {
      assert.ok(!NEVER_ON_SCREEN.test(t || ""), s.id + ": DM wording on the monitor: " + t);
    });
  });
  Object.keys(P.spots).forEach(function (id) { assert.ok(spot(id), "players file names an unknown spot: " + id); });
  if (P.music) assert.ok(C.spotifyUri(P.music), "the market's music is not a Spotify link");

  // every name in hide and say is a real row of that stall
  ["hide", "say"].forEach(function (part) {
    Object.keys(P[part]).forEach(function (id) {
      assert.ok(spot(id), part + ": unknown spot " + id);
      var real = names(id);
      (part === "hide" ? P.hide[id] : Object.keys(P.say[id])).forEach(function (n) {
        assert.ok(real.indexOf(n) !== -1, part + "." + id + ": no such row: " + n);
      });
    });
  });

  // a note with DM wording is never shown as it is: the row has a players' line or is hidden
  var shown = 0;
  M.spots.forEach(function (s) {
    (s.stock || []).forEach(function (it) {
      var name = Core.stripTags(it.name);
      var hidden = it.favourOnly || (P.hide[s.id] || []).indexOf(name) !== -1;
      var line = (P.say[s.id] || {})[name];
      if (DM_WORDING.test(it.note || "")) assert.ok(hidden || line, s.id + " | " + name + ": the note has DM wording and no players' line");
      if (line) assert.ok(!NEVER_ON_SCREEN.test(line), s.id + " | " + name + ": DM wording in the players' line");
    });
    C.publicGoods(s, P, [], []).forEach(function (g) {
      shown++;
      assert.ok(!NEVER_ON_SCREEN.test(g.text + " " + g.name), s.id + " | " + g.name + ": DM wording reaches the monitor: " + g.text);
      assert.ok(g.text, s.id + " | " + g.name + ": an empty card");
    });
  });
  assert.ok(shown >= 290, "about 300 rows are on the monitor, got " + shown);

  // even with everything revealed, a players' line or a clean note is all that shows
  M.spots.forEach(function (s) {
    var all = (s.stock || []).map(function (it) { return C.key(s.id, it.name); });
    C.publicGoods(s, P, all, []).forEach(function (g) {
      assert.ok(!NEVER_ON_SCREEN.test(g.text), s.id + " | " + g.name + ": a revealed row shows DM wording: " + g.text);
    });
  });
})();

// The DM page must never draw in the monitor's window: both guards are in place and intact.
// (A broken guard put the DM's buying bar and tabs on the monitor once: the regex's \b had become a backspace byte.)
(function () {
  var fs = require("fs"), path = require("path");
  var html = fs.readFileSync(path.join(__dirname, "..", "emporium.html"), "utf8");
  var page = fs.readFileSync(path.join(__dirname, "..", "js", "emporium.js"), "utf8");
  var guard = "/[?&]view=players\\b/.test(location.search)";
  assert.ok(html.indexOf("if (" + guard + ') document.documentElement.classList.add("players")') !== -1, "emporium.html: the players guard in the head");
  assert.ok(page.indexOf("!" + guard + ") start();") !== -1, "js/emporium.js: the DM page does not start in the player view");
  assert.ok(!/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(html + page), "a control character in emporium.html or js/emporium.js");
})();

console.log("emporium-players: all tests passed");
