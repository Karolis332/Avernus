// The DM's sell guide on emporium.html: what the floor pays when the party sells. Empty, it lists everything every
// stall has said it buys (spot.buys). With an item typed, it adds the standing offers worked out from the item's list
// price: the bank (40 % in coin, 60 % as credit), Burney (full list for potions and cures), Rassh (half list for arms
// and armour), and any stall that stocks the thing. Those rates are the stalls' own Buys rows; "half its own price"
// for a stall that stocks it is Claude's floor rule, marked as such on the page. Pure parts tested in
// tests/emporium-sell.test.js.
(function () {
  "use strict";
  var inNode = typeof module !== "undefined" && module.exports;
  var Core = inNode ? require("./core.js") : window.DMCore;
  var E = inNode ? require("./emporium.js") : window.DMEmporium;

  var RARITIES = ["mundane", "common", "uncommon", "rare", "very rare", "legendary"];
  // The middle of the floor's own price bands (common up to 1 SC, uncommon 2 to 7, rare 8 to 16, very rare 25 to 40).
  var DEFAULT_SC = { common: 0.5, uncommon: 4, rare: 12, "very rare": 32 };
  var POTION = /potion|elixir|tonic|salve|ointment|balm|draught|philter|healer'?s kit|antitoxin/i;
  var ARMS = /sword|axe|bow\b|arrow|bolt|armou?r|shield|mail|plate|lance|spear|dagger|hammer|mace|blade|glaive|halberd|pike|trident|scimitar|rapier|whip|flail|weapon|chain/i;

  function round2(x) { return Math.round(x * 100) / 100; }
  // A haggle when selling: the buying bands turned round (great +30 %, good +15 %, hold, soured -25 %).
  function sellFactor(total, dc) { return total > 0 && dc > 0 ? round2(2 - E.haggle(total, dc).factor) : 1; }
  // The row the market itself sells under exactly this name (a part of a name, "dragon", is a search, not an item).
  function listed(goods, q) {
    var n = String(q || "").trim().toLowerCase();
    return goods.filter(function (g) { return g.kind === "stock" && g.name.toLowerCase() === n; })[0] || null;
  }
  function words(q) { return String(q || "").toLowerCase().split(/[^a-z']+/).filter(function (w) { return w.length >= 4; }); }

  // q: what is sold; item: { rarity, sc } (sc = its list price in soul coins, 0 = unknown). Returns the offers:
  // { spot, kind: "wants" | "standing", what, pays, sc (a number when the floor pays coin for it), credit, note }.
  function offers(q, item, market, goods) {
    var out = [], w = words(q), byId = {};
    (market.spots || []).forEach(function (s) {
      byId[s.id] = s;
      (s.buys || []).forEach(function (b) {
        var hay = Core.stripTags(b.what).toLowerCase();
        if (!w.length || w.some(function (x) { return hay.indexOf(x) !== -1; })) out.push({ spot: s, kind: "wants", what: b.what, pays: b.pays, note: b.note });
      });
    });
    if (!String(q || "").trim()) return out;
    var rarity = item.rarity || "", sc = item.sc > 0 ? item.sc : DEFAULT_SC[rarity] || 0; // no rarity, no price: only who wants it
    if (rarity === "legendary") {
      return out.concat([{ spot: byId.rapture, kind: "standing", what: q, pays: "Not for coin. Mahadi's high table, or a favour from a keeper." }]);
    }
    if (!(sc > 0)) return out;
    function add(id, factor, pays, extra) {
      if (byId[id]) out.push(Object.assign({ spot: byId[id], kind: "standing", what: q, pays: pays, sc: round2(sc * factor) }, extra || {}));
    }
    if (rarity !== "mundane") add("bank", 0.4, "40 % of list in coin", { credit: round2(sc * 0.6) });
    if (POTION.test(q)) add("barber", 1, "Full list: the only keeper who pays it");
    if (ARMS.test(q)) add("forge", 0.5, "Half list for ordinary arms and armour");
    goods.filter(function (g) { return g.kind === "stock" && g.name.toLowerCase() === String(q).trim().toLowerCase(); }).forEach(function (g) {
      if (["bank", "barber", "forge"].indexOf(g.spot) === -1) {
        out.push({ spot: byId[g.spot], kind: "standing", what: q, pays: "Half what it sells it for (Claude's floor rule)", sc: round2(g.sc * 0.5) });
      }
    });
    return out;
  }

  var Sell = { RARITIES: RARITIES, DEFAULT_SC: DEFAULT_SC, sellFactor: sellFactor, listed: listed, offers: offers };
  if (inNode) { module.exports = Sell; return; }
  window.DMEmporiumSell = Sell;

  // ---- the card on the DM page ----
  function mount() {
    var R = window.DMRender, el = R.el, M = window.EMPORIUM_MARKET, SIDE = (window.CAMPAIGN || {}).side || {};
    var goods = E.allGoods(M, SIDE), $ = function (id) { return document.getElementById(id); };
    var rar = $("sell-rarity"), filled = false;
    [""].concat(RARITIES).forEach(function (r) { var o = el("option", "", r || "rarity?"); o.value = r; rar.appendChild(o); });
    // the market's own names as suggestions in the field (a native datalist)
    var names = $("sell-names");
    goods.filter(function (g) { return g.kind === "stock"; }).map(function (g) { return g.name; })
      .filter(function (n, i, a) { return a.indexOf(n) === i; }).sort()
      .forEach(function (n) { var o = document.createElement("option"); o.value = n; names.appendChild(o); });
    function gp(sc) { return Math.round(sc * E.GOLD_RATE).toLocaleString("en-US") + " gp"; }
    // a name the market sells fills in its rarity and list price; the DM can change both. Typing on clears what it filled.
    $("sell-q").addEventListener("input", function () {
      var hit = listed(goods, $("sell-q").value);
      if (hit) { rar.value = RARITIES.indexOf(hit.rarity) !== -1 ? hit.rarity : ""; $("sell-sc").value = hit.sc; filled = true; }
      else if (filled) { rar.value = ""; $("sell-sc").value = ""; filled = false; }
      $("sell-from").textContent = hit ? "List " + hit.sc + " SC, from " + hit.spotName.split(":")[0] + "'s shelf." : "";
      draw();
    });
    [rar, $("sell-sc"), $("sell-roll")].forEach(function (x) { x.addEventListener("input", draw); });
    function draw() {
      var q = $("sell-q").value.trim(), roll = Number($("sell-roll").value);
      var list = offers(q, { rarity: rar.value, sc: Number($("sell-sc").value) }, M, goods);
      $("sell-title").textContent = q ? list.length + " offers for '" + q + "'" : "Selling: what the floor pays";
      $("sell-list").replaceChildren.apply($("sell-list"), list.map(function (o) {
        var li = el("li", o.kind), f = sellFactor(roll, o.spot.haggle);
        li.appendChild(el("b", "", o.spot.short || o.spot.name.split(":")[0])); // the map's own label
        li.appendChild(document.createTextNode("  ·  "));
        li.appendChild(R.renderInline(o.kind === "wants" ? o.what + ": " + o.pays : o.pays));
        if (o.sc != null) {
          var sc = Math.round(o.sc * f * 100) / 100;
          li.appendChild(el("span", "sell-sc", sc + " SC or " + gp(sc) + (o.credit ? "  ·  " + Math.round(o.credit * f * 100) / 100 + " SC as credit in the cage" : "") +
            (f !== 1 ? "  (haggled ×" + f + " vs DC " + o.spot.haggle + ")" : "")));
        }
        if (o.note) li.appendChild(el("div", "qty", Core.stripTags(o.note)));
        return li;
      }));
    }
    draw();
  }
  if (document.getElementById("sell-q") && !/[?&]view=players\b/.test(location.search)) mount();
})();
