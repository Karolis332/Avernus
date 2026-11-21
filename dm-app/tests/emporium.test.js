// node dm-app/tests/emporium.test.js
// The Emporium market page: its helpers, and an audit of the market data against the rules in the plan.
var assert = require("assert");
var fs = require("fs"), path = require("path"), vm = require("vm");
var E = require("../js/emporium.js");
var M = require("../sessions/campaign-emporium-goods.js"); // the market with the second file's shelves merged in

// The existing Emporium panels, loaded the way the audits do.
var ctx = vm.createContext({ window: {}, console: console });
["campaign-emporium", "campaign-emporium-games"].forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "sessions", f + ".js"), "utf8"), ctx, { filename: f });
});
var SIDE = ctx.window.CAMPAIGN.side;

// parseSc: the first soul coin figure in a price cell; anything without one is unpriced
(function () {
  assert.strictEqual(E.parseSc("0.2 SC / 40 gp"), 0.2);
  assert.strictEqual(E.parseSc("8 SC (or 6 + favor)"), 8);
  assert.strictEqual(E.parseSc("1–3 SC"), 1);
  assert.strictEqual(E.parseSc("+0.5 SC / +100 gp over base"), 0.5);
  assert.strictEqual(E.parseSc("1 soul coin or a pint of blood"), 1);
  assert.strictEqual(E.parseSc("DC 16 Persuasion + a soul coin spent"), null);
  assert.strictEqual(E.parseSc("list gp"), null);
  assert.strictEqual(E.parseSc("—"), null);
  assert.strictEqual(E.parseSc(3), 3);
  assert.strictEqual(E.parseSc(null), null);
})();

// haggle: the app's own result bands (emporium-shops, "The result bands")
(function () {
  assert.strictEqual(E.haggle(21, 16).factor, 0.7);   // beat the DC by 5 or more
  assert.strictEqual(E.haggle(16, 16).factor, 0.85);  // met it: 10 to 20 % off, 15 used
  assert.strictEqual(E.haggle(14, 16).factor, 1);     // missed by 1 to 4: the price holds
  assert.strictEqual(E.haggle(11, 16).factor, 1.25);  // missed by 5 or more: the mortal tax
  assert.ok(E.haggle(11, 16).label.length > 5);
  assert.strictEqual(E.priceAfter(12, 0.85), 10.2);
  assert.strictEqual(E.priceAfter(0.25, 0.7), 0.18);
})();

// gold: the floor's own rule (panel emporium-shops), 350 gp to the soul coin; a stall or a row can say otherwise
(function () {
  assert.strictEqual(E.goldPrice({ sc: 0.5, rarity: "common" }, {}), 175);
  assert.strictEqual(E.goldPrice({ sc: 0.3, rarity: "mundane" }, {}), 105);
  assert.strictEqual(E.goldPrice({ sc: 4, rarity: "uncommon" }, {}), 1400);
  assert.strictEqual(E.goldPrice({ sc: 28, rarity: "very rare" }, {}), 9800);
  assert.strictEqual(E.goldPrice({ sc: 0.75, rarity: "uncommon", c: true }, { gold: { used: 100 } }), 75, "Burney takes gold at par for what is used up");
  assert.strictEqual(E.goldPrice({ sc: 4, rarity: "uncommon" }, { gold: { used: 100 } }), 1400, "and at the floor's rate for what is kept");
  assert.strictEqual(E.goldPrice({ sc: 2, rarity: "rare", gp: 30 }, {}), 30, "a price written on the row wins");
  assert.strictEqual(E.goldPrice({ sc: null, rarity: "legendary" }, {}), null);
  assert.strictEqual(E.parseGp("0.2 SC / 40 gp"), 40);
  assert.strictEqual(E.parseGp("8 SC / 1,600 gp"), 1600);
  assert.strictEqual(E.parseGp("8 SC (or 6 + favor)"), null);
})();

// affordable: a new list, dearest first, unpriced rows left out; enough coins or enough gold both count
(function () {
  var goods = [{ name: "a", sc: 3, gp: 750 }, { name: "b", sc: 12, gp: 3000 }, { name: "c", sc: null }, { name: "d", sc: 0.5, gp: 100 }];
  assert.deepStrictEqual(E.affordable(goods, 5).map(function (g) { return g.name; }), ["a", "d"]);
  assert.strictEqual(goods.length, 4);
  assert.deepStrictEqual(E.affordable(goods, 0), []);
  assert.deepStrictEqual(E.affordable(goods, 0, 800).map(function (g) { return g.name; }), ["a", "d"]);
  assert.deepStrictEqual(E.affordable(goods, 1, 3000).map(function (g) { return g.name; }), ["b", "a", "d"]);
})();

// ledger: every change returns a new list
(function () {
  var l0 = [];
  var l1 = E.ledgerAdd(l0, { who: "Aurora", item: "Arrows of slaying", sc: 9, spot: "forge" }, 1000);
  var l2 = E.ledgerAdd(l1, { who: "Drenwal", item: "Diamond", sc: 3, spot: "bank" }, 2000);
  assert.strictEqual(l0.length, 0);
  assert.strictEqual(l1.length, 1);
  assert.strictEqual(l1[0].at, 1000);
  assert.deepStrictEqual(E.ledgerTotals(l2), { total: 12, byWho: { Aurora: 9, Drenwal: 3 }, gold: 0, goldByWho: {} });
  assert.strictEqual(E.ledgerRemove(l2, 0).length, 1);
  assert.strictEqual(l2.length, 2);
  assert.strictEqual(E.ledgerAdd(null, { who: "x", item: "y", sc: 1 }, 1).length, 1, "a broken stored ledger starts fresh");
  var text = E.ledgerText(l2, 40);
  ["Aurora", "Arrows of slaying", "9 SC", "Spent 12 SC", "Left 28 SC"].forEach(function (s) { assert.ok(text.indexOf(s) !== -1, "ledger text has: " + s); });
  // a purchase paid in gold is counted apart from the soul coins
  var l3 = E.ledgerAdd(l2, { who: "Aurora", item: "Winter clothes", gp: 450, spot: "barber" }, 3000);
  assert.deepStrictEqual(E.ledgerTotals(l3), { total: 12, byWho: { Aurora: 9, Drenwal: 3 }, gold: 450, goldByWho: { Aurora: 450 } });
  var text3 = E.ledgerText(l3, 40, 2000);
  ["Winter clothes, 450 gp", "Spent 12 SC and 450 gp", "Left 28 SC", "1550 gp"].forEach(function (s) { assert.ok(text3.indexOf(s) !== -1, "ledger text has: " + s + "\n" + text3); });
})();

// allGoods: the new stock plus every priced row of the existing service menus
(function () {
  var goods = E.allGoods(M, SIDE);
  var stock = goods.filter(function (g) { return g.kind === "stock"; });
  var services = goods.filter(function (g) { return g.kind === "service"; });
  assert.ok(stock.length >= 290, "stock rows: " + stock.length);
  assert.ok(services.length >= 40, "service rows read from the existing panels: " + services.length);
  goods.forEach(function (g) {
    assert.ok(g.spot && g.spotName && g.name && g.sc > 0, "a good needs spot, name and price: " + JSON.stringify(g).slice(0, 120));
    assert.ok(g.name.indexOf("{@") === -1, "tags are stripped from names: " + g.name);
    // gold: a price, or null where the floor takes soul coins only (premium rows, soul-goods, menu rows with no gp figure)
    if (g.kind === "stock") assert.ok(g.scOnly ? g.gp === null : g.gp > 0, "gold price of " + g.name + ": " + g.gp);
    else assert.ok(g.gp === null || g.gp > 0, "gold price of " + g.name + ": " + g.gp);
  });
  assert.ok(stock.filter(function (g) { return g.gp > 0; }).length >= 260, "most of the stock can be bought with gold");
  assert.ok(stock.some(function (g) { return g.scOnly; }), "some rows are for soul coins only");
  assert.ok(services.filter(function (g) { return g.gp > 0; }).length >= 30, "the old menus' gp figures are read");
  var tonic = services.filter(function (g) { return g.spot === "barber" && /soothing tonic/i.test(g.name); })[0];
  assert.ok(tonic && tonic.gp === 25, "Burney's chair takes gold at par: " + JSON.stringify(tonic));
  // what a keeper pays the party, loans and exchange rates are not things to buy
  var names = services.map(function (g) { return g.name; }).join(" | ");
  ["Sell him a larva", "Small line", "Exchange gp", "He buys ichor"].forEach(function (n) {
    assert.ok(names.indexOf(n) === -1, "not for sale, so not in the finder: " + n);
  });
  assert.ok(services.every(function (g) { return M.spots.filter(function (s) { return s.id === g.spot; })[0].kind === "stall"; }), "service rows come from stalls only");
})();

// shelvesOf: rows grouped by shelf in first-seen order, a shelf of favour-only rows last, nothing lost
(function () {
  var stock = [{ name: "a", g: "One" }, { name: "v", g: "Vault", favourOnly: true }, { name: "b", g: "Two" }, { name: "c", g: "One" }];
  var shelves = E.shelvesOf(stock);
  assert.deepStrictEqual(shelves.map(function (s) { return s.g; }), ["One", "Two", "Vault"]);
  assert.deepStrictEqual(shelves[0].rows.map(function (r) { return r.name; }), ["a", "c"]);
  assert.strictEqual(stock.length, 4);
  M.spots.forEach(function (s) {
    var n = E.shelvesOf(s.stock).reduce(function (sum, sh) { return sum + sh.rows.length; }, 0);
    assert.strictEqual(n, (s.stock || []).length, s.id + ": every row is on a shelf");
  });
})();

// rackOf: tonight's d8 shelf of a stall, taken from the existing panel
(function () {
  var rack = E.rackOf(SIDE["emporium-stock-today"], "The Firesnake Forge (Rassh)");
  assert.ok(rack && rack.t === "table" && rack.rows.length === 8);
  assert.strictEqual(E.rackOf(SIDE["emporium-stock-today"], "No such stall"), null);
})();

// ---- data audit ----
(function () {
  var RARITY = ["mundane", "common", "uncommon", "rare", "very rare", "legendary"];
  var BAND = { uncommon: [2, 7], rare: [8, 16], "very rare": [25, 40] }; // the scale the DM approved; consumables are exempt
  var spots = M.spots;
  assert.strictEqual(spots.length, 14);
  assert.strictEqual(new Set(spots.map(function (s) { return s.id; })).size, 14, "ids are unique");
  assert.deepStrictEqual(spots.map(function (s) { return s.n; }).sort(function (a, b) { return a - b; }), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  spots.forEach(function (s) {
    var where = s.id + ": ";
    assert.ok(s.x >= 0 && s.x <= 100 && s.y >= 0 && s.y <= 100, where + "position on the map");
    assert.ok(s.name && s.look && s.look.length > 30, where + "name and what the players see");
    assert.ok(["stall", "den", "place"].indexOf(s.kind) !== -1, where + "kind");
    assert.ok(Array.isArray(s.tonight) && s.tonight.length >= 2, where + "tonight's hooks");
    if (s.panel) assert.ok(SIDE[s.panel], where + "panel exists: " + s.panel);
    (s.also || []).forEach(function (id) { assert.ok(s.panel && SIDE[id], where + "extra panel exists: " + id); });
    if (s.rack) assert.ok(E.rackOf(SIDE["emporium-stock-today"], s.rack), where + "rack heading exists: " + s.rack);
    (s.stock || []).forEach(function (it) {
      var at = where + it.name + ": ";
      assert.ok(it.name && it.note && it.note.length > 10, at + "name and note");
      assert.ok(typeof it.g === "string" && it.g.length > 2, at + "the shelf (group) it stands on");
      assert.ok(RARITY.indexOf(it.rarity) !== -1, at + "rarity " + it.rarity);
      if (it.rarity === "legendary") assert.ok(it.favourOnly, at + "legendary is never for coin");
      if (it.favourOnly) assert.ok(it.sc === null, at + "a row that costs a deal has no coin price");
      else assert.ok(typeof it.sc === "number" && it.sc > 0, at + "price");
      var band = BAND[it.rarity];
      // exempt: what is used up, what costs a deal, and labour on materials the buyer brings (extra)
      if (band && !it.c && !it.favourOnly && !it.extra) assert.ok(it.sc >= band[0] && it.sc <= band[1], at + it.rarity + " at " + it.sc + " SC is outside " + band.join(" to "));
    });
    if (s.kind !== "stall") return;
    assert.ok(s.keeper && typeof s.haggle === "number" && s.panel, where + "keeper, haggle DC and panel");
    assert.ok(s.stock.filter(function (it) { return it.sc > 0; }).length >= 35, where + "35 or more priced items, has " + s.stock.length);
    assert.ok(new Set(s.stock.map(function (it) { return it.g; })).size >= 5, where + "five or more shelves");
    assert.strictEqual(new Set(s.stock.map(function (it) { return it.name; })).size, s.stock.length, where + "no item twice");
    assert.ok(s.favours.length >= 4 && s.favours.every(function (f) { return f.ask && f.gives; }), where + "favours");
    assert.ok(s.buys.length >= 3 && s.buys.every(function (b) { return b.what && b.pays; }), where + "buys");
  });
  assert.strictEqual(spots.filter(function (s) { return s.kind === "stall"; }).length, 7);
  assert.strictEqual(spots.filter(function (s) { return s.kind === "den"; }).length, 4);
})();

console.log("emporium.test.js: all assertions passed");
