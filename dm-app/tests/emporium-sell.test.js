// node dm-app/tests/emporium-sell.test.js: the DM's sell guide.
var assert = require("assert");
global.window = global.window || {};
require("../js/core.js");
var E = require("../js/emporium.js");
var S = require("../js/emporium-sell.js");
var M = require("../sessions/campaign-emporium-goods.js");
var GOODS = E.allGoods(M, {});
function at(list, id) { return list.filter(function (o) { return o.spot.id === id; }); }

// nothing typed: every stall's own Buys row, nothing invented
var all = S.offers("", {}, M, GOODS);
var buys = M.spots.reduce(function (n, s) { return n + (s.buys || []).length; }, 0);
assert.strictEqual(all.length, buys, "the empty guide is the stalls' Buys rows");
assert.ok(all.every(function (o) { return o.kind === "wants"; }));

// a bare word is a search: who wants it, no made-up standing offer, no item filled in
assert.strictEqual(S.listed(GOODS, "dragon"), null, "part of a name is not an item");
assert.ok(S.offers("dragon", { rarity: "", sc: 0 }, M, GOODS).every(function (o) { return o.kind === "wants"; }));

// a word finds the stalls that want it
var blood = S.offers("dragon blood", { rarity: "mundane", sc: 0 }, M, GOODS);
assert.ok(at(blood, "ichor").length && at(blood, "rapture").length, "the Ichor and the Rapture both buy dragon blood");

// a potion: the bank's 40 % (60 % credit) and Burney's full list
var pot = S.offers("Potion of healing", { rarity: "common", sc: 0.25 }, M, GOODS);
assert.deepStrictEqual(at(pot, "bank").map(function (o) { return [o.sc, o.credit]; }), [[0.1, 0.15]]);
assert.strictEqual(at(pot, "barber").filter(function (o) { return o.kind === "standing"; })[0].sc, 0.25);

// arms: Rassh pays half; no list price typed: the rarity's band middle
var sword = S.offers("Flame tongue longsword", { rarity: "rare", sc: 0 }, M, GOODS);
assert.strictEqual(at(sword, "forge").filter(function (o) { return o.kind === "standing"; })[0].sc, 6, "half of 12, the rare band's middle");
assert.strictEqual(at(sword, "barber").length, 0, "Burney does not buy swords");

// mundane: no bank offer; legendary: never for coin
assert.strictEqual(at(S.offers("Rope", { rarity: "mundane", sc: 0.01 }, M, GOODS), "bank").length, 0);
var leg = S.offers("Holy avenger", { rarity: "legendary", sc: 0 }, M, GOODS);
assert.ok(leg.some(function (o) { return /Not for coin/.test(o.pays) && o.sc === undefined; }));

// a stall that stocks the exact item pays half its own price
var hit = S.listed(GOODS, "arrow of dragon slaying");
assert.ok(hit && hit.sc > 0, "the market's own row is found by name");
var arrow = S.offers(hit.name, { rarity: hit.rarity, sc: hit.sc }, M, GOODS);
assert.ok(arrow.some(function (o) { return o.kind === "standing" && o.sc === Math.round(hit.sc * 0.5 * 100) / 100; }));

// haggling when selling: the buying bands turned round
assert.strictEqual(S.sellFactor(20, 15), 1.3);
assert.strictEqual(S.sellFactor(15, 15), 1.15);
assert.strictEqual(S.sellFactor(12, 15), 1);
assert.strictEqual(S.sellFactor(5, 15), 0.75);
assert.strictEqual(S.sellFactor(0, 15), 1, "no roll, no change");

console.log("emporium-sell: all tests passed");
