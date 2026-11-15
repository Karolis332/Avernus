// The Wandering Emporium as a market (emporium.html): 14 spots on a top-down map.
// Everything here is HOMEBREW stock, favours and buy rates written for the big shopping night of
// Session 14 (level 14: Drenwal, Aurora, Or'Henn; Veska, Lucan, Moonkite; the Lady Vengeance).
// The service menus, tonight's d8 racks, the dens' games and the keepers' voices stay where they
// were: campaign-emporium.js and campaign-emporium-games.js. A spot points at them with
// panel (its own menu), also (more panels shown under it) and rack (a heading in emporium-stock-today).
//
// Price scale (1 SC is about 100 gp): common up to 1 SC, uncommon 2 to 7, rare 8 to 16, very rare
// 25 to 40, legendary never for coin. Rows with c: true are used up (potions, scrolls, ammunition)
// and are priced below the scale. g is the shelf a row stands on. tests/emporium.test.js checks all of it.
// Gold: the floor's own rule is 200 gp to the soul coin (goldPrice in js/emporium.js works it out).
// scOnly: true = soul coins or a bargain only (premium rows and soul-goods, panel emporium-shops).
// A stall can set gold: { used: N } for what is used up there. More shelves: campaign-emporium-goods.js.
(function () {
  "use strict";
  var CLAUSE2 = "Clause 2 of Arkhan's deal: a dragon part 'sold, lodged or valued' on this floor goes to Arkhan at double the best bid. Blood and scales are not 'parts'. A service is not a sale.";

  var MARKET = {
    mapImage: "art/generated/emporium-map.webp", // painted over the drawn plan (Higgsfield nano_banana_2_1, jobs f3f75193 then ef349719; prompts in docs/style-test/higgsfield/emporium-map-prompt-*.txt)
    spots: [
      // ------------------------------------------------------------------ places
      {
        id: "jetty", n: 1, name: "The Jetty and the Lady Vengeance", short: "Jetty", kind: "place", x: 50, y: 91,
        look: "Black planks on chains over the Styx, lanterns on every post, and the ship moored at the end with two dragon heads on her prow. Three riders in black barding sit their nightmares where the planks meet the ice. They do not move.",
        tonight: [
          "{@b The heads draw a crowd.} Everybody wants to see them. Showing them is free and safe. A clerk who names a price for them has 'valued' them (clause 2).",
          "{@b Three narzugons} with Zariel's Writ of Hunt. Inside the wards they only watch: 'When the bell rings, Hellrider.' One of them saluted the Hellriders on the deck, correctly.",
          "{@b A moored ship is found automatically} when the bell rings (clause 3 left standing). A ship under way is not hunted. Decide where she is before dawn.",
          "{@b Work bought at the Forge happens here.} Rassh's fire snakes are on the hull for the hours a repair or a fitting takes, and for those hours she cannot move.",
          "Jeremy and Colico Jack stay aboard unless a player fetches them. Jeremy wants the Forge's blueprints; Jack wants one hand at the Soul Pit."
        ]
      },
      {
        id: "gate", n: 2, name: "The Gate: Criers, the Writ, Bounty Hunters", short: "Gate", kind: "place", x: 50, y: 76,
        panel: "emporium-rumours", also: ["emporium-quick-prices", "emporium-events"], rack: "The Whole Market",
        look: "Two war machines parked nose to nose make the arch. The Writ of Hunt is nailed to the left one, the paint still wet. Criers on the roofs call every arrival by name and by what they are carrying.",
        tonight: [
          "{@b The Writ:} 100 soul coins for the ship, 20 a head, 50 for the druid alive. Everyone who enters reads it.",
          "{@b Bounty hunters:} a warlord's captain and two cambions read it and start pricing the party. They cannot act inside the wards. They can tell the riders which gangplank.",
          "{@b The criers} already called it: 'The dragon-killers! The Lady Vengeance! Two heads!' Every keeper on the floor knows what the party has to sell before they reach a stall.",
          "{@b Tonight's rack here} is the d20 rare find for the whole market, once per visit. The d6 price swing applies to every purchase if the DM wants it.",
          "Rumours are free with a shave at Burney's. Three of the twelve are false."
        ]
      },

      // ------------------------------------------------------------------ Infernal Rapture
      {
        id: "rapture", n: 3, name: "Infernal Rapture", short: "Infernal Rapture", keeper: "Mahadi, rakshasa, the host", kind: "stall", x: 50, y: 50,
        panel: "emporium-mahadi", haggle: 20, pays: "Takes coin, favours, debts",
        look: "A pavilion of red silk four storeys high in the middle of the ring, a kitchen you can smell from the jetty, baths below, a high table above. Mahadi folds his hands the wrong way round and is delighted to see you.",
        stockNote: "The cellar, the back room and the vault. Nothing free here is free: every gift adds to the hospitality debt, and the debt is Arkhan's now (clause 1). He is never intimidated and never hurried.",
        stock: [
          { g: "Kitchen, cellar and tailor", name: "Heroes' feast, cooked not cast", rarity: "rare", sc: 5, c: true, qty: "one sitting, up to 12", note: "As the spell for 24 hours: immune to poison and fear, +2d10 maximum hit points, advantage on Wisdom saves (Pull saves too). He offers it 'on the house' first: accepted free, it adds to the debt." },
          { g: "Kitchen, cellar and tailor", name: "Hamper for the road", rarity: "mundane", sc: 0.3, qty: "4", note: "Seven days of real food for eight people. Nothing in it grew in Avernus." },
          { g: "Kitchen, cellar and tailor", name: "Cask of Elturian summer wine", rarity: "mundane", sc: 0.5, qty: "the last 2", note: "Looted from a cellar that fell with the city. Veska and Lucan know the vintner's mark. A story beat, and a gift a Hellrider does not forget." },
          { g: "Kitchen, cellar and tailor", name: "Devil-court silks, fitted in an hour", rarity: "common", sc: 0.5, note: "Advantage on Charisma checks with devils of rank until the bell. The tailor's imp reports what was said in the fitting room." },
          { g: "The scroll room", name: "Scroll of {@spell revivify}", rarity: "uncommon", sc: 4, c: true, qty: "2", note: "A scroll needs no diamond: the ink carries it. Cleric only. Dearer than a diamond from Fhet'Ahla (3 SC), but it costs Drenwal no spell slot." },
          { g: "The scroll room", name: "Scroll of {@spell counterspell}", rarity: "uncommon", sc: 2, c: true, qty: "2", note: "Aurora can read it (warlock list). One spell stopped, no slot spent." },
          { g: "The scroll room", name: "Scroll of {@spell banishment}", rarity: "rare", sc: 3, c: true, note: "Cleric or warlock. A devil only vanishes for a minute. A creature from the Material Plane, like Arkhan or a dragon, goes home for good if the caster holds it the full minute (Charisma save)." },
          { g: "The scroll room", name: "Scroll of {@spell death ward}", rarity: "rare", sc: 3, c: true, qty: "2", note: "8 hours. The first drop to 0 hit points becomes 1. Good before the bell, or before the third sigil." },
          { g: "The scroll room", name: "Scroll of {@spell greater restoration}", rarity: "rare", sc: 4, c: true, qty: "2", note: "No diamond dust needed. Ends one curse, one level of exhaustion, the hag's holes or the Hourglass's years. Tiamat's curse is beyond it." },
          { g: "The scroll room", name: "Scroll of {@spell dispel evil and good}", rarity: "rare", sc: 4, c: true, note: "Ends a possession or sends one fiend home. One of the three ways to tear Yeenoghu's Shadow out of Crokek'toeck (Session 15)." },
          { g: "The scroll room", name: "Scroll of {@spell word of recall}", rarity: "very rare", sc: 6, c: true, note: "The way out that saved them at the Crypt, on paper. Drenwal needs a sanctuary prepared (the ship's deck, if he consecrated it)." },
          { g: "The scroll room", name: "Scroll of {@spell heal}", rarity: "very rare", sc: 6, c: true, note: "70 hit points, and it ends blindness, deafness and disease. Cleric or druid." },
          { g: "The scroll room", name: "Scroll of {@spell wind walk}", rarity: "very rare", sc: 6, c: true, note: "Druid. Ten creatures become cloud for 8 hours, fly speed 300 ft. The ice road to the Mirror in under an hour, above the fog where Vermilius waits. One minute to turn solid again." },
          { g: "The scroll room", name: "Scroll of {@spell raise dead}", rarity: "rare", sc: 8, c: true, note: "No diamond needed. Dead up to 10 days. In Avernus the soul must still be free: not coined, not a larva in a pen." },
          { g: "The scroll room", name: "Scroll of {@spell holy aura}", rarity: "very rare", sc: 15, c: true, note: "8th level: Drenwal reads it with a DC 18 Wisdom check or it is wasted. One minute: the party has advantage on every save, attackers have disadvantage, a fiend that hits in melee can be blinded." },
          { g: "The scroll room", name: "Scroll of {@spell resurrection}", rarity: "very rare", sc: 16, c: true, note: "No diamond needed. Dead up to a century. Mahadi asks who it is for, and remembers the answer." },
          { g: "The back room", name: "{@item Bag of holding|DMG}", rarity: "uncommon", sc: 4, qty: "2", note: "For the shopping. Mahadi's joke: it is the only thing on the floor that is exactly what it looks like. (One inside the other still tears a hole to the Astral.)" },
          { g: "The back room", name: "{@item Decanter of endless water|DMG}", rarity: "uncommon", sc: 3, note: "Clean water without end. In Avernus a camp, a ship's crew or a thirsty warlord will trade for it." },
          { g: "The back room", name: "{@item Heward's handy haversack|DMG}", rarity: "rare", sc: 8, note: "The thing you want is always on top. A dead courier's: one pocket still holds an undelivered letter (DM's choice of thread)." },
          { g: "The back room", name: "Rod of the pact keeper, +2", rarity: "rare", sc: 12, note: "Aurora: +2 to warlock spell attacks and save DC, and one spell slot back per long rest. Left by a warlock who could not pay for supper." },
          { g: "The back room", name: "{@item Mantle of spell resistance|DMG}", rarity: "rare", sc: 13, note: "Advantage on saves against spells. Attunement." },
          { g: "The back room", name: "{@item Ring of spell storing|DMG}", rarity: "rare", sc: 14, note: "Holds 5 levels of spells. Sold 'empty'. Arcana DC 15: one 3rd-level spell is still in it (DM's choice)." },
          { g: "The back room", name: "Instant fortress (Daern's)", rarity: "rare", sc: 15, note: "A cube that becomes a 20-ft. adamantine tower anywhere flat. On the Mirror's shelf it is cover, a door that locks, and a roof against a dragon." },
          { g: "The back room", name: "{@item Carpet of flying|DMG}", rarity: "very rare", sc: 30, qty: "the crown jewel", scOnly: true, note: "4 by 6 ft., fly speed 60 ft., carries 400 lb. The one his richest guests arrive on. Two riders, or one and the loot." },
          { g: "The house's own terms", name: "An hour before the bell", rarity: "mundane", sc: 2, qty: "up to 6", scOnly: true, note: "Mahadi sells delay: the caravan packs one hour later per purchase. A counter to clause 3 (Session 14, The Deal Arkhan Made)." },
          { g: "The house's own terms", name: "The party's own hospitality debt, bought back", rarity: "mundane", sc: 15, scOnly: true, note: "Three times its weight. It kills clause 1 before Arkhan can call it. He takes one service to the house of Asmodeus instead of coin." },
          { g: "The vault", name: "{@item Talisman of pure good|DMG}", rarity: "legendary", sc: null, favourOnly: true, note: "In a lead box, because it burns him. A good cleric's holy symbol: +2 to spell attacks, 7 charges, and an evil creature standing on the ground makes a DC 20 Dexterity save or the ground takes it. Whether it burns a Bhaalspawn's hand is the DM's call, and the whole table will watch." }
        ],
        favours: [
          { ask: "Tell the story of the two dragons from the high table, with the heads on show.", gives: "A private feast clear of debt, and 25% off one thing from the back room. {@b Catch:} one of his clerks will name a price for the heads while the party talks (Insight DC 16 to see him coming). A price named is 'valued': clause 2." },
          { ask: "Carry a sealed letter to Rigorath at the Mirror and bring the reply back unopened.", gives: "Any one scroll. {@b Catch:} the letter lists what the party bought tonight. Rigorath prices his answers to match." },
          { ask: "Sit down with Glasya's erinyes at his table and hear her out to the end. Drenwal must be there.", gives: "Mahadi is Warm for the rest of the night (Haggle DC 18). Glasya paid him for the introduction." },
          { ask: "One service to the house of Asmodeus, named later.", gives: "The debt bought back without coin (clause 1 dies), or the carpet at half price. Not both. Fhet'Ahla notarises it before the party leaves the table." },
          { ask: "Take the Talisman out of Avernus and never say where it came from. A marked obligation, notarised.", gives: "The Talisman of pure good. He wants it gone more than he wants it sold." }
        ],
        buys: [
          { what: "The dragon heads", pays: "25 SC a head 'for the strongroom'", note: CLAUSE2 + " So Arkhan takes them and pays double through the house. Lodging them overnight counts as lodged." },
          { what: "Dragon blood, by the bottle", pays: "7 SC, any colour", note: "One more than Elliach's 6, because a rare vintage is a menu item. Elliach still pays 8 for red." },
          { what: "A true account of the Dock raid, or of Kreeg at the Throat", pays: "1 to 3 SC, written off the debt", note: "He pays in the debt, never in coin. A cheap way to shrink clause 1 if the story is good." },
          { what: "Kreeg's Ledger, if the party holds it", pays: "Opens at 30 SC and will not be refused politely", note: "It restores memories (Lulu's among them) and it is the proof for the 'Void it' counter. Selling it closes both doors." }
        ],
        tonight: [
          "{@b Clue 1} is free at supper: 'A gentleman has an interest in your debt.' Insight DC 14 for the tone.",
          "{@b Clue 3} at the high table: Perception DC 15 for the smell of old meat on one chair and a black scale under it. Investigation DC 13 to place it: Arkhan sat here.",
          "{@b Clue 6} on the counter: his ledger. Perception DC 16 to read it upside down, Sleight of Hand DC 18 to turn the page.",
          "{@b Glasya's erinyes} is drinking here, under the truce, perfectly polite. She speaks to Drenwal if he comes over, and will not say where Maelys is.",
          "He offers the strongroom for the heads, twice, warmly. Do not let him."
        ]
      },

      // ------------------------------------------------------------------ The Firesnake Forge
      {
        id: "forge", n: 4, name: "The Firesnake Forge", short: "Forge", keeper: "Rassh, salamander smith", kind: "stall", x: 22, y: 64,
        panel: "emporium-rassh", rack: "The Firesnake Forge (Rassh)", haggle: 15, pays: "Takes coin, scales, salvage",
        look: "A war machine opened like a clam, its engine block turned into a forge. Fire snakes coil through the coals carrying tools in their mouths. Rassh works with his back to the customer and talks to the metal.",
        stockNote: "Arms, armour, everything for a bow, a mount and a ship. He respects people who know what they want and people who killed a dragon. Tonight the party is both.",
        stock: [
          { g: "For the bow", name: "Arrow of dragon slaying", rarity: "very rare", sc: 4, c: true, qty: "3", note: "{@item Arrow of slaying|DMG}: a dragon hit makes a DC 17 Constitution save, taking 6d10 extra piercing or half. He cut the heads from a scale Krull sold him (Insight DC 15: he is proud of it)." },
          { g: "For the bow", name: "Arrows, +1", rarity: "uncommon", sc: 2, c: true, qty: "3 sheaves of 10", note: "For the Moonbow, or for the crew's bows when a dragon dives." },
          { g: "For the bow", name: "Arrows, +2", rarity: "rare", sc: 3, c: true, qty: "1 sheaf of 5", note: "Black shafts fletched with fire snake shed. They hum on the string." },
          { g: "For the bow", name: "Walloping arrows", rarity: "common", sc: 0.5, c: true, qty: "10", note: "A creature hit makes a DC 10 Strength save or falls prone. A flier that falls prone drops out of the sky. Not for dragons: for imps, vrocks and bounty hunters on wings." },
          { g: "For the bow", name: "Hellfire arrows", rarity: "uncommon", sc: 1.5, c: true, qty: "5", note: "+2d6 fire that ignores resistance, not immunity. {@b Catch:} a humanoid killed by one wakes in the Styx as a lemure. Rassh says so before he takes the coin." },
          { g: "For the bow", name: "{@item Bracers of archery|DMG}", rarity: "uncommon", sc: 5, note: "+2 damage with a longbow or shortbow. Attunement. Aurora's first stop." },
          { g: "For the bow", name: "{@item Efficient quiver|DMG}", rarity: "uncommon", sc: 3, note: "60 arrows, 18 javelins and 6 bows or staffs in a quiver that weighs 2 lb." },
          { g: "For Moonkite and the Hellriders", name: "Moonkite's barding, sun-steel", rarity: "rare", sc: 12, note: "AC 18 for a celestial mount, no loss of speed, flying or running. {@b Catch:} it glows. While Moonkite wears it outside the wards, the hunt roll gets +1." },
          { g: "For Moonkite and the Hellriders", name: "{@item Saddle of the cavalier|DMG}", rarity: "uncommon", sc: 4, note: "The rider cannot be unseated against her will, and attacks against the mount have disadvantage. For Aurora on Moonkite." },
          { g: "Arms", name: "{@item Dragon slayer|DMG}, a Hellrider's longsword", rarity: "rare", sc: 12, note: "+1, and +3d6 damage to a dragon. For 2 SC and a day's work Rassh moves the enchantment into a lance head for Veska." },
          { g: "Arms", name: "{@item Mace of disruption|DMG}", rarity: "rare", sc: 10, note: "+2d6 radiant to a fiend or undead; one left at 25 hit points or fewer makes a DC 15 Wisdom save or is destroyed. Rassh sells it with tongs. Attunement." },
          { g: "Armour and shields", name: "{@item Sentinel shield|DMG}", rarity: "uncommon", sc: 4, note: "Advantage on initiative and on Perception. For whoever stands watch when the bell rings." },
          { g: "Armour and shields", name: "Adamantine full plate", rarity: "uncommon", sc: 7, note: "AC 18. Any critical hit against the wearer becomes a normal hit. For Veska or Lucan. (Tonight's rack may have the chain shirt for 3.)" },
          { g: "Armour and shields", name: "Armour of cold resistance, breastplate", rarity: "rare", sc: 10, note: "Resistance to cold: Obatala's breath, the ice devils at the Mirror, the road. Attunement. He made three and sold two this week, both to riders." },
          { g: "Armour and shields", name: "{@item White dragon scale mail|DMG}", rarity: "very rare", sc: 28, qty: "the crown jewel", scOnly: true, note: "AC 14 + Dex (max 2) + 1, resistance to cold, advantage on saves against dragon breath and Frightful Presence. Once a day it points at the nearest white dragon within 30 miles: that is Obatala. Cut from scales she shed in the heat. {@b Catch:} she knows her own scales and goes for the wearer first." },
          { g: "For the Lady Vengeance", name: "Infernal metal, an ingot", rarity: "mundane", sc: 2, qty: "6", note: "One ingot is 5 pieces of infernal metal for Jeremy (my reading of the rack's '2 SC each': change it if an ingot is worth more or less)." },
          { g: "For the Lady Vengeance", name: "Infernal cannon barrel", rarity: "mundane", sc: 6, qty: "1", note: "The rare part for Blast Shells (Armament II, 12 metal, 3 days). Off one of Zariel's patrol machines; her mark is still on it." },
          { g: "For the Lady Vengeance", name: "A set of adamantine bars", rarity: "mundane", sc: 14, qty: "1", note: "The rare part for the Adamantine Keel (Hull III, 18 metal, 10 days). The Rust Queen sold them under protest. Cheaper than Bel's price, and no forge-mark." },
          { g: "For the Lady Vengeance", name: "Blueprints: Blast Shells", rarity: "mundane", sc: 3, note: "In Infernal: 2 extra days unless someone aboard reads it. Then Jeremy knows Armament II." },
          { g: "For the Lady Vengeance", name: "Blueprints: Hellfire Rails", rarity: "mundane", sc: 3, note: "Hull II. The answer to things that land on the hull: dragons, devils, boarders." },
          { g: "For the Lady Vengeance", name: "Blueprints: Gyro Helm", rarity: "mundane", sc: 3, note: "Engine II. Evasive Bank three times a fight. Colico Jack asks for this one by name." },
          { g: "For the Lady Vengeance", name: "Blueprints: Spinal Lance", rarity: "mundane", sc: 8, note: "Armament III. Jeremy needs an Arcana check (DC 15) to read them, 20 metal and a fiend's heart (CR 11 or higher) to build it." },
          { g: "For the Lady Vengeance", name: "Overnight fitting by the fire snakes", rarity: "mundane", sc: 3, qty: "per tier", note: "Tier I or II Armament or Hull fitted in 6 hours instead of days, no install check; the party supplies metal and parts, Jeremy learns the schematic by watching. {@b Catch:} she cannot move for those 6 hours. Count them against the bell." },
          { g: "For the Lady Vengeance", name: "Scale-lined cannon breech", rarity: "uncommon", sc: 5, extra: "+ 1 batch of scales", note: "Once per fight one force cannon shot adds 3d10 of the scale's element: fire from red, lightning from blue. He wants to see it fired." },
          { g: "For the Lady Vengeance", name: "Forge-sealed hull plate", rarity: "mundane", sc: 1.5, c: true, qty: "4", note: "Carried aboard and fitted later: 1 hour, no check, the ship regains 50 hit points. Dearer than a repair done here (1 SC per 50), because it travels." },
          { g: "For the Lady Vengeance", name: "Dragon harpoon and winch", rarity: "uncommon", sc: 6, extra: "+ 2 metal", note: "A bow-mounted ship weapon, one gunner: +9 to hit, range 120 ft., 2d10 piercing, and a flier of Huge size or smaller is tethered on 300 ft. of chain (DC 20 Strength as an action to break). A tethered dragon cannot leave; it can still come closer." },
          { g: "For Moonkite and the Hellriders", name: "Gondian joint seals and a tuned mainspring", rarity: "uncommon", sc: 2, note: "For Ser Lucan's legs: speed +10 ft. and the ticking stops. Jeremy fits them in an hour and is offended he did not think of it." },
          { g: "Behind the anvil", name: "{@item Dragonlance|FTD}, unquenched", rarity: "legendary", sc: null, favourOnly: true, note: "A lance head older than the forge, waiting for a quench he has never had. +3, +3d6 force to a dragon, and an ally who sees the hit strikes too. Veska's weapon, if the party pays his price." }
        ],
        favours: [
          { ask: "'Bring me Slarkas's other tooth.' He has one already and wants the dragon near his forge.", gives: "Any one rare weapon or armour at half price, paid when the tooth is on the anvil. He takes a sworn promise from a Hellrider as a deposit." },
          { ask: "Fire the scale-lined breech where the floor can watch: off the jetty, outside the wards.", gives: "The breech for nothing but the scales. {@b Catch:} cannons fired in the last day put +2 on the hunt roll." },
          { ask: "An hour with Jeremy's notebook for the fire snakes. He wants the Gondian vanes.", gives: "Any tier II blueprint free. {@b Catch:} what Rassh learns, Bel buys. After tonight Bel knows how fast the ship is." },
          { ask: "Tell him, at the anvil, exactly how the Dock's chain was cut and what cut it.", gives: "A third off the ship's repair bill: every third 50 hit points is free, and he starts at once." },
          { ask: "A bottle of blood from each dead dragon, given not sold, for the quench. And Veska swears at his anvil to kill a third.", gives: "The dragonlance. Two bottles are 12 to 16 SC she will not get from Elliach. The oath is real: Rassh will ask about it." }
        ],
        buys: [
          { what: "Dragon scales, red or blue", pays: "3 SC a batch", note: "Not 'parts' under clause 2. He cuts Dragon-Scale Warplate from them the same night (6 SC plus the scales)." },
          { what: "The heads, horns or teeth", pays: "Nothing", note: "'Not mine to buy. Ask the host.' That is clue 2: Persuasion DC 12 for why. " + CLAUSE2 },
          { what: "Infernal metal and war machine salvage", pays: "0.2 SC a piece; 3 SC for a whole cannon barrel", note: "Half what he sells it for. He pays more for anything with Zariel's mark: he likes melting it." },
          { what: "Captured arms: the Chain Wardens' chains, a narzugon's lance, Kreeg's guards' gear", pays: "1 to 2 SC each; half list for ordinary weapons", note: "He will not buy a Hellrider's blade. He will hand it back across the anvil." }
        ],
        tonight: [
          "{@b Clue 2:} asked to buy a head he says 'Not mine to buy. Ask the host.' Persuasion DC 12: someone holds first refusal on dragon parts.",
          "{@b Krull was here} two nights ago, selling scales Obatala shed. That is where the white scale mail and the slaying arrows come from (my addition: it makes the hunters the source of the party's best weapons against them).",
          "{@b The ship.} Field repair is 1 SC per 50 hit points and the fire snakes work through the night. Set her hit points first (the primer's Numbers to Set; the Chase tracker has them).",
          "{@b Rare find 20:} if rolled, Slarkas's tooth is on his bench, free. 'He will come for it, and I want him near my forge.'"
        ]
      },

      // ------------------------------------------------------------------ Burney the Barber
      {
        id: "barber", n: 5, name: "Burney the Barber", short: "Barber", keeper: "Burney, a warm, chatty barber", kind: "stall", x: 14, y: 44,
        panel: "emporium-burney", rack: "Burney the Barber", haggle: 13, pays: "Takes coin; gold at par for cures and chair work", gold: { used: 100 },
        look: "A striped awning, one chair, a copper basin that is always full of clean hot water, and a woman with her sleeves rolled up who calls everyone 'love'. It is the only stall on the floor where nobody is selling a soul.",
        stockNote: "Tonics, cures, faces and ink. The one honest keeper. {@b DM only:} she is an adult copper dragon and an agent of Bahamut. Nothing below gives that away unless the DM wants it to.",
        stock: [
          { g: "Tonics and cures", name: "{@item Potion of greater healing|DMG}", rarity: "uncommon", sc: 0.75, c: true, qty: "6", note: "4d4 + 4 hit points. She makes them herself and they taste of honey." },
          { g: "Tonics and cures", name: "{@item Potion of superior healing|DMG}", rarity: "rare", sc: 2.5, c: true, qty: "3", note: "8d4 + 8 hit points. The bottle is warm." },
          { g: "Tonics and cures", name: "{@item Potion of supreme healing|DMG}", rarity: "very rare", sc: 7, c: true, qty: "1", note: "10d4 + 20 hit points. 'For the one of you who always goes first.'" },
          { g: "Tonics and cures", name: "{@item Keoghtom's ointment|DMG}", rarity: "uncommon", sc: 3, c: true, note: "A jar of 1d4 + 1 doses: each heals 2d8 + 2 and ends poison and disease." },
          { g: "Tonics and cures", name: "{@item Elixir of health|DMG}", rarity: "rare", sc: 2, c: true, qty: "2", note: "Cures any disease and ends blinded, deafened, paralysed and poisoned." },
          { g: "Tonics and cures", name: "{@item Potion of vitality|DMG}", rarity: "very rare", sc: 6, c: true, qty: "1", note: "Removes all exhaustion, disease and poison. The cure for a Soul Burn run or a forced march over the ice." },
          { g: "Tonics and cures", name: "Barber's styptic", rarity: "common", sc: 0.1, c: true, qty: "10", note: "A bonus action: a creature at 0 hit points is stable and has 1 hit point. Anyone can use it." },
          { g: "Tonics and cures", name: "Tea of the kept name", rarity: "common", sc: 0.5, c: true, qty: "5", note: "8 hours: advantage on saves against forgetting. The Styx, the hag's cards, a devil's memory theft." },
          { g: "Tonics and cures", name: "Winter balm", rarity: "uncommon", sc: 1, c: true, qty: "a tin of 4", note: "One use: resistance to cold for 1 hour. For the ice road and for Obatala." },
          { g: "Faces", name: "{@item Hat of disguise|DMG}", rarity: "uncommon", sc: 4, note: "Disguise self at will. Attunement. Hers is a flat cap." },
          { g: "Ink", name: "Masquerade tattoo", rarity: "common", sc: 1, note: "Disguise self once a day, and the tattoo itself can change shape. Inked in ten minutes." },
          { g: "Ink", name: "Illuminator's tattoo", rarity: "common", sc: 1, note: "Write with a fingertip; once a day a message that only one named reader can see for a day. For orders the riders must not read." },
          { g: "Ink", name: "Spellwrought tattoo: {@spell revivify}", rarity: "uncommon", sc: 5, c: true, qty: "1", note: "Anyone can wear it and anyone can use it: no diamond, no slot. The needle goes in over the heart. 'So one of you can bring the cleric back.'" },
          { g: "Ink", name: "Spellwrought tattoo: {@spell lesser restoration}", rarity: "uncommon", sc: 1.5, c: true, qty: "3", note: "Anyone can use it once. Ends poison, paralysis, blindness or a disease." },
          { g: "Ink", name: "Barrier tattoo, rare", rarity: "rare", sc: 10, note: "AC 15 + Dex (max 2) with no armour, a shield allowed. Attunement. For Or'Henn, who cannot wear metal, or for Aurora." },
          { g: "Ink", name: "Shadowfell brand tattoo", rarity: "rare", sc: 9, note: "Darkvision, advantage on Stealth, and once a day a reaction halves the damage of one hit. Attunement." },
          { g: "Ink", name: "Absorbing tattoo, cold", rarity: "very rare", sc: 28, qty: "the crown jewel", scOnly: true, note: "White ink. Resistance to cold; once a day a reaction makes the wearer immune to one cold hit and heals half of what it would have done. Whoever stands in front of Obatala wants this. Attunement." },
          { g: "The drawer under the basin", name: "Moon sickle, +2", rarity: "rare", sc: 13, note: "Druid: +2 to spell attacks and save DC, and every healing spell heals 1d4 more. Attunement. She cuts herbs with it and will not say where a barber got one." },
          { g: "The drawer under the basin", name: "{@item Periapt of health|DMG}", rarity: "uncommon", sc: 3, note: "Immune to disease." },
          { g: "The drawer under the basin", name: "{@item Necklace of adaptation|DMG}", rarity: "uncommon", sc: 4, note: "Breathe anywhere, and advantage on saves against gas and vapour: a green dragon's breath is one. Attunement." },
          { g: "The drawer under the basin", name: "{@item Periapt of proof against poison|DMG}", rarity: "rare", sc: 12, note: "Immune to poison, damage and condition. Against Vermilius it is the whole fight." },
          { g: "The drawer under the basin", name: "{@item Amulet of health|DMG}", rarity: "rare", sc: 12, note: "Constitution 19. Attunement." },
          { g: "The drawer under the basin", name: "Luckstone", rarity: "uncommon", sc: 5, note: "Stone of good luck: +1 to ability checks and saving throws (Pull saves too). Attunement. A river pebble with a hole in it." },
          { g: "Faces", name: "Dye and re-crest for a dragonborn", rarity: "common", sc: 0.5, c: true, note: "Or'Henn's red goes bronze-brown for ten days and the gold scales at his jaw are covered. Anyone working from the Writ's description has disadvantage to know him." },
          { g: "The bottom drawer", name: "{@item Platinum scarf|FTD}", rarity: "legendary", sc: null, favourOnly: true, note: "Folded in the bottom drawer. Pull a scale, three a day: it heals 10d4, or becomes a +1 shield that makes its bearer immune to radiant damage, or a hammer of light that bites chromatic dragons. It is Bahamut's work, and she will not say how she has it." }
        ],
        favours: [
          { ask: "Sit in the chair and tell her one true thing you are ashamed of.", gives: "One cure from her menu, no charge, and she means it. No catch. That is the catch: the players will look for one." },
          { ask: "Buy one soul out of Z'neth's pens and let it go at the river's edge, where she can see.", gives: "Her tonics and potions at half price until the bell." },
          { ask: "'Don't sell those heads, love. Salt them, keep them, and bury them when you can.'", gives: "The salting free (2 SC saved), and a warning in a low voice: the host will offer his strongroom, twice. 'Say no twice.' Counts toward clause 2." },
          { ask: "Carry a letter to a barber on the Street of Shields in Elturel, when the city is free.", gives: "Any tattoo up to rare, free. She says 'when', not 'if'." },
          { ask: "A kindness on this floor that costs the giver and earns nothing, done when they think nobody is looking.", gives: "The platinum scarf, pressed into a hand without a word. The DM decides when it has been earned. Do not announce the test." }
        ],
        buys: [
          { what: "Gold", pays: "At par, 100 gp to the soul coin, for tonics, cures and anything done in the chair", note: "Every other stall charges double in gold, and so does she for charms and lasting ink. The gp figures printed on her old menu are the floor's rate: halve them. She counts it twice, smiling. (Insight DC 18: she likes gold a great deal for a barber.)" },
          { what: "Potions and healing supplies the party does not need", pays: "Full list price, in coin or in trade", note: "The only keeper who pays list." },
          { what: "Dragon blood, scales, anything of the heads", pays: "Nothing. She goes quiet.", note: "Insight DC 16: it is grief, not disgust. She still salts the heads if asked: 1 SC each, a service, safe under clause 2." },
          { what: "News from above: Elturel, Baldur's Gate, the road", pays: "A shave and a rumour from the table of twelve, a true one", note: "She tells the party which three are false if they have been kind." }
        ],
        tonight: [
          "{@b Salting the heads} is a service, not a sale: 1 SC each, 30 days. Safe under clause 2.",
          "{@b A shave and the news:} one free rumour (the Gate's table). She hears everything said in the chair.",
          "{@b Years and holes:} her quiet greater restoration undoes 5 of the Hourglass's years or one of the hag's holes, 5 SC, no questions.",
          "{@b Her cures do not touch Tiamat's curse.} And she is a dragon: the curse jumps to a dragon that is asked for help. If Or'Henn asks her, my suggestion is that she feels it reach, steps back and says 'Not me, love. Ask nobody with wings.' The DM's call; it is the kindest warning he gets all night."
        ]
      },

      // ------------------------------------------------------------------ From Here to Avernus
      {
        id: "bank", n: 6, name: "From Here to Avernus", short: "Bank", keeper: "Fhet'Ahla, amnizu banker", kind: "stall", x: 79, y: 66,
        panel: "emporium-fhetahla", rack: "From Here to Avernus (Fhet'Ahla)", haggle: 17, pays: "Takes coin, collateral, paper",
        look: "An armoured carriage with a counter cut into its side and a cage behind it, floor to roof, full of things people could not pay for. Every item has a tag with a name crossed out. The banker never raises a voice and never forgets a number.",
        stockNote: "Gems for the spells that bring the dead back, and the collateral cage: rings, cloaks, wands, holy things. Everything in the cage was somebody's. The tag says whose.",
        stock: [
          { g: "Gems for the great spells", name: "Diamond, 300 gp", rarity: "mundane", sc: 3, c: true, qty: "4", note: "For {@spell revivify}. Hell has few diamonds: the dead here are not meant to come back. The banker knows exactly why a cleric buys four." },
          { g: "Gems for the great spells", name: "Diamond, 500 gp", rarity: "mundane", sc: 5, c: true, qty: "2", note: "For {@spell raise dead}." },
          { g: "Gems for the great spells", name: "Diamond, 1,000 gp", rarity: "mundane", sc: 10, c: true, qty: "1", note: "For {@spell resurrection}. From a Hellrider chaplain's reliquary; the setting is still on it." },
          { g: "Gems for the great spells", name: "Diamond dust, 100 gp", rarity: "mundane", sc: 1, c: true, qty: "5", note: "For {@spell greater restoration} or {@spell stoneskin}." },
          { g: "Gems for the great spells", name: "Ruby dust, 1,500 gp", rarity: "mundane", sc: 15, qty: "1", note: "For {@spell forcecage}, if that is Aurora's 7th-level arcanum. Not used up by the casting. A cage for a dragon rider, or for a Champion with ten rounds." },
          { g: "The cage: rings", name: "{@item Ring of warmth|DMG}", rarity: "uncommon", sc: 3, note: "Resistance to cold. Attunement. The cheapest answer to Obatala on the floor. Tag: a merregon sergeant." },
          { g: "The cage: rings", name: "{@item Ring of free action|DMG}", rarity: "rare", sc: 9, note: "Magic cannot slow, paralyse or restrain the wearer, and hard ground costs nothing. Against chains, webs and ice. Attunement." },
          { g: "The cage: rings", name: "{@item Ring of resistance|DMG} (acid)", rarity: "rare", sc: 10, note: "Jet stone. Resistance to acid: Slarkas's breath. Attunement." },
          { g: "The cage: rings", name: "{@item Ring of protection|DMG}", rarity: "rare", sc: 12, note: "+1 to AC and saving throws (Pull saves too). Attunement." },
          { g: "The cage: cloaks, boots and bracers", name: "{@item Cloak of elvenkind|DMG}", rarity: "uncommon", sc: 4, note: "Advantage on Stealth with the hood up. Attunement." },
          { g: "The cage: cloaks, boots and bracers", name: "{@item Cloak of protection|DMG}", rarity: "uncommon", sc: 5, note: "+1 to AC and saving throws. Attunement. Stacks with the ring." },
          { g: "The cage: cloaks, boots and bracers", name: "{@item Cloak of displacement|DMG}", rarity: "rare", sc: 14, note: "Attacks against the wearer have disadvantage until she takes damage. Attunement. Tag: a cambion duellist who lost once." },
          { g: "The cage: wands and rods", name: "{@item Wand of magic missiles|DMG}", rarity: "uncommon", sc: 4, note: "7 charges. Anyone can use it. Force damage that never misses: good against things that are hard to hit." },
          { g: "The cage: wands and rods", name: "Wand of the war mage, +1", rarity: "uncommon", sc: 4, note: "+1 to spell attacks, and they ignore half cover. Attunement by a spellcaster." },
          { g: "The cage: wands and rods", name: "{@item Wand of binding|DMG}", rarity: "rare", sc: 10, note: "7 charges: hold monster or hold person, DC 17. Attunement by a spellcaster." },
          { g: "The cage: holy things and charms", name: "{@item Brooch of shielding|DMG}", rarity: "uncommon", sc: 3, note: "Resistance to force damage, immune to magic missile. Attunement." },
          { g: "The cage: holy things and charms", name: "{@item Pearl of power|DMG}", rarity: "uncommon", sc: 5, qty: "2", note: "Once a day, one spell slot of 3rd level or lower back. For Drenwal or Or'Henn. Attunement." },
          { g: "The cage: wands and rods", name: "Rod of the pact keeper, +1", rarity: "uncommon", sc: 5, note: "Aurora: +1 to warlock spell attacks and save DC, one slot back per long rest. Mahadi has the +2." },
          { g: "The cage: holy things and charms", name: "Amulet of the devout, +1", rarity: "uncommon", sc: 5, note: "Drenwal: +1 to spell attacks and save DC, and one more Channel Divinity a day. Attunement." },
          { g: "The cage: holy things and charms", name: "{@item Necklace of prayer beads|DMG}", rarity: "rare", sc: 10, note: "1d4 + 2 beads, each a spell once a day as a bonus action (bless, cure wounds, restoration and better). Cleric or druid. Attunement." },
          { g: "The cage: holy things and charms", name: "{@item Staff of healing|DMG}", rarity: "rare", sc: 13, note: "10 charges: cure wounds, lesser restoration, mass cure wounds. Cleric or druid. Attunement. Tag: a field surgeon of the Hellriders." },
          { g: "The cage: holy things and charms", name: "Amulet of the devout, +3", rarity: "very rare", sc: 32, qty: "the crown jewel", scOnly: true, note: "Drenwal: +3 to spell attacks and save DC, and one more Channel Divinity a day. A chaplain's, taken off him by the devil who pawned it. The symbol on it is Torm's hand. Attunement." },
          { g: "The top shelf", name: "{@item Iron flask|DMG}, occupied", rarity: "legendary", sc: null, favourOnly: true, note: "Top shelf, no tag. A creature that is not native to this plane makes a DC 17 Wisdom save or is drawn inside: Arkhan and his dragons are not native to Avernus. {@b Catch:} it is not empty. Something has to be let out first, and the banker does not know what it is." }
        ],
        favours: [
          { ask: "Stand as mortal witnesses to a contract signed at the counter tonight: a Baldur's Gate merchant and a devil.", gives: "Exchange at par and free appraisal until the bell. {@b Catch:} the contract is real and the merchant has not read it. Warn him and the banker goes Cold for the visit." },
          { ask: "Hand a default notice to the warlord's captain on the floor, and stay while he reads it.", gives: "25% off one ring or cloak. {@b Catch:} he is one of the bounty hunters, and now he has a grudge and a face." },
          { ask: "Ten minutes alone with the Shield of Gargauth, in the back, 'to appraise it'.", gives: "10 SC of credit against the cage. {@b Catch:} what a pit fiend in a shield and an amnizu say to each other in ten minutes is the DM's to decide. Nothing good." },
          { ask: "Say where Thavius Kreeg is tonight. The banker and Kreeg are the same kind of devil and not friends.", gives: "One rare item from the cage at an uncommon price (5 SC). If Kreeg is alive in the barge's hold, the banker sends someone for him before dawn." },
          { ask: "Kreeg's Ledger, signed over. Or the High Overseer's Ring and one hero's notarised year of service.", gives: "The iron flask. The Ledger is also Lulu's memories and the proof against clause 1: this is the hard one." }
        ],
        buys: [
          { what: "Gold into soul coins", pays: "1 SC per 200 gp", note: "The floor's standard poor rate, and the way to pay for a row marked 'soul coins only'. The drawer holds about 60 coins tonight (my number: it caps how much gold can become coins). Burney takes gold at par, for cures only." },
          { what: "Magic items the party does not want", pays: "40% of list in coin, or 60% as credit in the cage", note: "Credit only spends here. The item goes in the cage with the seller's name on the tag." },
          { what: "Gems, and the sapphire rings off Vistalancer's horn", pays: "Face value for loose gems; 3 SC a ring", note: "The rings are part of the head. Selling them, or even having them appraised here, is clause 2. " + CLAUSE2 },
          { what: "The High Overseer's Ring, if the party holds it", pays: "12 SC, at once, no haggling", note: "The banker wants it badly enough to be polite. Insight DC 15: it is worth more to someone in Elturel." },
          { what: "Debts owed to the party", pays: "Half their face value", note: "Anyone who owes the party a favour can be sold. They will find out who sold them." }
        ],
        tonight: [
          "{@b The debt hardens here.} A hospitality debt left to sit becomes a notarised obligation at this counter. If the party does nothing about clause 1, this is where it is stamped.",
          "{@b Kreeg.} The banker knows what became of him (real-answer tier in the information market) and wants to know more.",
          "{@b Appraisal is valuing.} Having a dragon part appraised here puts it under clause 2. Scales and blood are safe.",
          "{@b A contract exists.} Asked straight and paid the certify fee (0.25 SC), the banker confirms that a contract naming the party was notarised yesterday, and nothing else. My addition: it counts as one of the two clues for 'there is a deal', never toward the clauses."
        ]
      },

      // ------------------------------------------------------------------ Ichor's Aweigh!
      {
        id: "ichor", n: 7, name: "Ichor's Aweigh!", short: "Ichor", keeper: "Elliach, human mage", kind: "stall", x: 87, y: 45, px: 86, py: 42,
        panel: "emporium-elliach", rack: "Ichor's Aweigh! (Elliach)", haggle: 14, pays: "Takes coin, blood, ichor",
        look: "A wagon of glass: vats, coils and jars lit from inside in colours that have no names. A thin, cheerful man in a stained apron offers a tasting spoon to everyone who slows down. Some of his fingers are new.",
        stockNote: "Potions, oils, poisons, grenades and strains. He is honest about what a bottle does and vague about what it does afterwards. Every catch is on the label if you read the label.",
        stock: [
          { g: "Potions", name: "{@item Potion of resistance|DMG} (cold)", rarity: "uncommon", sc: 1, c: true, qty: "4", note: "1 hour. Obatala, the ice devils, the road." },
          { g: "Potions", name: "{@item Potion of resistance|DMG} (acid or poison)", rarity: "uncommon", sc: 1, c: true, qty: "2 of each", note: "1 hour. Acid for Slarkas, poison for Vermilius." },
          { g: "Potions", name: "{@item Potion of fire breath|DMG}", rarity: "uncommon", sc: 1, c: true, qty: "3", note: "Three breaths in an hour, 4d6 fire, DC 13. Useless on devils. The white dragon is not a devil." },
          { g: "Potions", name: "{@item Potion of water breathing|DMG}", rarity: "uncommon", sc: 0.75, c: true, qty: "4", note: "1 hour. It does not stop the Styx from taking memories." },
          { g: "Potions", name: "{@item Potion of hill giant strength|DMG}", rarity: "uncommon", sc: 1, c: true, qty: "2", note: "Strength 21 for 1 hour." },
          { g: "Potions", name: "{@item Potion of fire giant strength|DMG}", rarity: "rare", sc: 3, c: true, qty: "1", note: "Strength 25 for 1 hour. For Veska's lance or Lucan's blade on the day it matters." },
          { g: "Potions", name: "{@item Potion of heroism|DMG}", rarity: "rare", sc: 2, c: true, qty: "3", note: "10 temporary hit points and bless for 1 hour, no concentration." },
          { g: "Potions", name: "{@item Potion of clairvoyance|DMG}", rarity: "rare", sc: 2, c: true, note: "See or hear a place you know within a mile for 10 minutes: the high table, the jetty, Mahadi's counter." },
          { g: "Potions", name: "{@item Potion of mind reading|DMG}", rarity: "rare", sc: 2, c: true, note: "Detect thoughts, DC 13. He warns nobody that it fails on the host: a rakshasa shrugs off spells of 6th level and lower." },
          { g: "Potions", name: "{@item Potion of invulnerability|DMG}", rarity: "rare", sc: 4, c: true, qty: "1", note: "Resistance to all damage for 1 minute." },
          { g: "Potions", name: "{@item Potion of invisibility|DMG}", rarity: "very rare", sc: 5, c: true, qty: "2", note: "1 hour, ends on an attack or a spell. The wards do not care who is invisible." },
          { g: "Potions", name: "{@item Potion of flying|DMG}", rarity: "very rare", sc: 6, c: true, qty: "2", note: "Fly at walking speed for 1 hour. For whoever is not on Moonkite when the deck is gone." },
          { g: "Potions", name: "{@item Potion of speed|DMG}", rarity: "very rare", sc: 6, c: true, qty: "2", note: "Haste for 1 minute, no concentration." },
          { g: "Oils and dusts", name: "{@item Oil of slipperiness|DMG}", rarity: "uncommon", sc: 1, c: true, qty: "3", note: "Freedom of movement for 8 hours: no grapple, no chain, no web holds. Remember it when chains come out of the ice." },
          { g: "Oils and dusts", name: "{@item Oil of etherealness|DMG}", rarity: "rare", sc: 4, c: true, qty: "1", note: "1 hour in the Border Ethereal. Walk through a wall, a hull, a strongroom door." },
          { g: "Oils and dusts", name: "{@item Dust of disappearance|DMG}", rarity: "uncommon", sc: 2, c: true, qty: "2", note: "Everyone within 10 ft. is invisible for 2d4 minutes. A whole landing party, off the jetty, past the riders." },
          { g: "Poisons and coatings", name: "Dragon's-bane resin", rarity: "uncommon", sc: 2, c: true, qty: "3 pots", note: "A pot coats 3 arrows or one blade for an hour. A dragon hit makes a DC 16 Constitution save or its breath cannot recharge at the start of its next turn. He boiled it out of the blood he bought last week." },
          { g: "Poisons and coatings", name: "Wyvern poison", rarity: "uncommon", sc: 1.5, c: true, qty: "4 doses", note: "On a weapon: DC 15 Constitution, 7d6 poison or half. Devils are immune. Dragons, riders' mounts and bounty hunters are not." },
          { g: "Poisons and coatings", name: "Purple worm poison", rarity: "rare", sc: 3, c: true, qty: "1 dose", note: "DC 19 Constitution, 12d6 poison or half. One dose, one arrow, one chance." },
          { g: "Things to throw", name: "Bottled ice mephit", rarity: "common", sc: 1, c: true, qty: "3", note: "Thrown 30 ft.: a 20-ft. circle of glare ice. Difficult ground, DC 14 Dexterity or fall prone on entering, and it puts out fire. It also melts in the forge quarter." },
          { g: "Things to throw", name: "A flask of Styx water", rarity: "uncommon", sc: 1, c: true, qty: "3", note: "Splashed on a creature (thrown, 20 ft.): use the Styx's forgetting from Session 13's river scene. Labelled in three languages. Do not let it open aboard." },
          { g: "Strains (each has a catch)", name: "Frostblood strain", rarity: "uncommon", sc: 3, c: true, qty: "2", note: "10 minutes: immune to cold. {@b Catch:} for the hour after, vulnerable to fire. The label says so in small print." },
          { g: "Strains (each has a catch)", name: "Hollowbone strain", rarity: "uncommon", sc: 3, c: true, qty: "2", note: "10 minutes: fly speed 40 ft. {@b Catch:} for a day afterwards all falling damage is doubled and bludgeoning hits score a critical on 19." },
          { g: "Strains (each has a catch)", name: "Wyrmscent strain", rarity: "uncommon", sc: 3, c: true, qty: "1", note: "1 hour: the drinker smells every dragon within a mile, direction and rough distance. {@b Catch:} they smell the drinker too. An ambush goes both ways." },
          { g: "The back of the wagon", name: "{@item Alchemy jug|DMG}", rarity: "uncommon", sc: 4, note: "Not used up. He is fond of it: Persuasion DC 14 or the price is 6." },
          { g: "The back of the wagon", name: "{@item Potion of dragon's majesty|FTD}", rarity: "legendary", sc: null, favourOnly: true, note: "He can brew one bottle from the party's own dragon blood by the bell: the drinker becomes an adult dragon for 1 hour. {@b Catch, in capitals:} if Or'Henn drinks it, a dragon is carrying Tiamat's curse. See the Curse tracker. It should not go well." }
        ],
        favours: [
          { ask: "Drink a raw vial in front of his customers and roll his d10.", gives: "25% off everything for that hero until the bell, whatever the roll." },
          { ask: "One vial of Or'Henn's blood, 'for the colour of it'.", gives: "Any one strain, free. {@b Catch:} he sells half the vial. By the bell someone on the floor knows what the druid carries, and the informant lists it as a rumour." },
          { ask: "A bottle of whatever Crokek'toeck spits, from the Scab (Session 15).", gives: "10 SC on delivery, or the Perfected Strain at half price. He writes the order down and pays 1 SC in advance." },
          { ask: "Let him watch Jeremy un-coin one soul at the Core, and take notes.", gives: "Two potions of speed for the price of one. {@b Catch:} he will try to bottle what he saw. Jeremy says no first; the party has to ask him." },
          { ask: "A bottle of red and a bottle of blue, given not sold, and one hero tastes the first drop.", gives: "The potion of dragon's majesty, ready an hour before the bell." }
        ],
        buys: [
          { what: "Dragon blood", pays: "1 SC a dose, 6 SC a bottle, 8 if it is red", note: "Not a 'part' under clause 2: Mahadi wrote the clause narrow because he wanted this trade to go on. The cleanest money the party will make tonight." },
          { what: "Demon ichor and warped trophies", pays: "0.5 SC a vial; 0.25 to 1 SC for a body part", note: "From the Dock raid: 1 SC a vrock trophy, 3 SC for the Glabrezu Ravager's claw." },
          { what: "A fiend's heart (CR 11 or higher)", pays: "4 SC", note: "Jeremy needs one for the Spinal Lance. Selling it here is selling the upgrade." },
          { what: "Acid, venom or breath-frost from a living dragon", pays: "5 SC a flask", note: "Nobody has brought him any. He would like to be surprised." }
        ],
        tonight: [
          "{@b The blood trade} is the party's safe sale: a bottle here does not touch clause 2.",
          "{@b Tonight's rack} has his cheap grenades and the stabilised fire potions. The rows above are the full shelf.",
          "{@b Maelys bought three vials of Bloodwrath} two nights ago and paid without haggling (my addition: a lead on how she fights).",
          "He will not sell a raw vial to anyone who has drunk one tonight. That is the only rule he has."
        ]
      },

      // ------------------------------------------------------------------ Z'neth's Larva Farm
      {
        id: "larva", n: 8, name: "Z'neth's Larva Farm", short: "Larva Farm", keeper: "Z'neth, hobgoblin warlord", kind: "stall", x: 20, y: 26,
        panel: "emporium-zneth", rack: "Z'neth's Larva Farm", haggle: 16, pays: "Takes coin, soul-goods",
        look: "Wet pens under tarpaulin, and in them pale things the length of a forearm with faces. A hobgoblin in a general's coat walks the rails with a grading stick. Behind the pens, a tent of war-band surplus with his old banner over the door.",
        stockNote: "Souls by the head, tools made of souls, and what is left of a war-band's stores. Say it once, then let it sit: every larva was a person. Buying one out is the only clean purchase here, and he charges for it.",
        stock: [
          { g: "Souls, by name", name: "The Elturian pen: twelve souls", rarity: "uncommon", sc: 5, qty: "the lot", scOnly: true, note: "Taken the day the city fell. Freed aboard the ship they are twelve freed souls: the Choir Core needs ten, and each one is a Grace for the Grace Lantern (the DM's call whether a freed larva counts; the lantern's rule says 'by anyone')." },
          { g: "Souls, by name", name: "An Elturian child", rarity: "common", sc: 0.5, qty: "1", scOnly: true, note: "Knows nothing. Is worth nothing to him. The players are buying a child out of a pen, and that is all this row is." },
          { g: "Souls, by name", name: "A Hellrider farrier", rarity: "uncommon", sc: 2, qty: "1", scOnly: true, note: "He shod the horses of the last charge and he knows nightmares. Asked, he explains a narzugon's tack: cut the spurs and the nightmare is no longer bound. Advantage on the first attempt against one of the three riders." },
          { g: "Souls, by name", name: "A Gondian tinker", rarity: "uncommon", sc: 4, qty: "1", scOnly: true, note: "Drowned in the Styx with her tools. Freed or asked aboard, she teaches Jeremy the Grace Lantern (Soul Engine II, mercy) as 'being taught': 2 days, no check." },
          { g: "Souls, by name", name: "A helmsman of Zariel's flying fortress", rarity: "uncommon", sc: 3, qty: "1", scOnly: true, note: "Knows the fortress's blind arc below the keel and how long its lance takes to turn. One free Evasive Bank, or advantage on one helm check, when the fortress finally comes." },
          { g: "Souls, by name", name: "A kobold from Arkhan's train", rarity: "uncommon", sc: 2, qty: "1", scOnly: true, note: "Killed for laughing at the wrong moment. Knows how Arkhan camps: who sleeps where, what Krull feeds the dragons, which one is kept hungry." },
          { g: "Tools made of souls", name: "Soul lantern", rarity: "uncommon", sc: 3, qty: "2", scOnly: true, note: "A larva in a cage of smoked glass. Bright light 30 ft. that shows invisible fiends, and it screams when a devil of bone devil rank or higher comes within 60 ft. It is a person in a lamp." },
          { g: "Tools made of souls", name: "Soul-wax candle", rarity: "common", sc: 1.5, c: true, qty: "3", scOnly: true, note: "Burn it for an hour and ask the soul in the wax three questions. On the shelf: a Dock tally-clerk, a Zarielite quartermaster, a smuggler who ran the ice road." },
          { g: "Tools made of souls", name: "Whisper-jar", rarity: "common", sc: 1, qty: "2", scOnly: true, note: "A larva in brine that repeats, on a tap of the glass, the last minute of speech it heard. Leave one under a table." },
          { g: "Tools made of souls", name: "A bucket of culls", rarity: "common", sc: 0.5, c: true, qty: "3 buckets", scOnly: true, note: "Thrown to hungry fiends, gnolls or demons: each makes a DC 15 Wisdom save or spends its turn feeding. Three souls a bucket, the ones too weak to grade. He sells it as bait." },
          { g: "Tools made of souls", name: "Soul-tallow, a keg", rarity: "common", sc: 1, c: true, qty: "2", scOnly: true, note: "Engine grease rendered from culls: the ship's speed +10 ft. for 24 hours. {@b Catch:} it smells of what it is, and Lulu will not board while it burns." },
          { g: "War-band surplus", name: "Coin scales", rarity: "mundane", sc: 0.5, note: "Weigh a soul coin: how many charges are left, and whether the soul in it was a good one. The party may not want to know about their forty." },
          { g: "War-band surplus", name: "Larva-silk rope, 100 ft.", rarity: "common", sc: 0.5, qty: "3", note: "Cannot be cut by a blade that is not magical. It whispers when it is under load." },
          { g: "War-band surplus", name: "Drover's catch-pole", rarity: "mundane", sc: 0.3, qty: "4", note: "Reach 10 ft. On a hit a Medium or smaller creature is grappled (escape DC 15) and held at the pole's length." },
          { g: "War-band surplus", name: "Siege pavise", rarity: "mundane", sc: 0.5, qty: "4", note: "A standing shield for a ship's rail: a gunner behind one has three-quarters cover instead of half." },
          { g: "War-band surplus", name: "War-band rations", rarity: "mundane", sc: 0.3, qty: "plenty", note: "Thirty days of iron biscuit for ten. Honest food. Nobody was in it." },
          { g: "War-band surplus", name: "A brace of hell hounds, collared", rarity: "common", sc: 2, qty: "1 brace", note: "Two, with the handler's whistle. They guard a gangplank, bay at dragons and hate Moonkite on sight." },
          { g: "War-band surplus", name: "Messenger imp, a tenday's contract", rarity: "common", sc: 1.5, c: true, qty: "1", note: "Invisible, fast, carries a spoken message between the ship and the party. {@b Catch:} Z'neth hears every message too." },
          { g: "The warlord's own chest", name: "{@item Pipes of haunting|DMG}", rarity: "uncommon", sc: 4, note: "3 charges: every creature within 30 ft. makes a DC 15 Wisdom save or is frightened for a minute. His piper's. The piper is in pen four." },
          { g: "The warlord's own chest", name: "{@item Iron bands of Bilarro|DMG}", rarity: "rare", sc: 8, note: "A thrown sphere: a creature of Huge size or smaller is restrained (DC 20 Strength to break). Once a day. A dragon rider is not Huge." },
          { g: "The warlord's own chest", name: "{@item Dimensional shackles|DMG}", rarity: "rare", sc: 9, note: "On a creature that cannot resist: no teleporting, no plane shifting, no escape clause. Made for exactly the kind of prisoner Kreeg is." },
          { g: "The warlord's own chest", name: "{@item Horn of Valhalla|DMG}, silver", rarity: "rare", sc: 10, note: "2d4 + 2 berserker spirits fight for 1 hour, once every 7 days. Here the ones who come are larvae wearing the shapes they had. They fight very hard and thank the blower afterwards." },
          { g: "The warlord's own chest", name: "{@item Helm of devil command|BGDIA}", rarity: "very rare", sc: 35, qty: "the crown jewel", scOnly: true, note: "A legion commander's. The wearer knows where every devil within 1,000 ft. is and can force one to obey (see the item). Needs Infernal and attunement. {@b Catch:} Zariel's officers know it on sight, and so do the three riders." },
          { g: "The back pen", name: "The soul the cleric knows", rarity: "legendary", sc: null, favourOnly: true, note: "Complication 6 on the floor table: in the back pen, kept apart, a face Drenwal recognises. Z'neth saw him look. It is not for coin at any price." }
        ],
        favours: [
          { ask: "Stand guard on the pens through the bell-hour while he loads. He has been robbed at every pack-up this year.", gives: "The Elturian pen, free. {@b Catch:} it puts the party on open ground when the wards fold." },
          { ask: "Let him grade Or'Henn: a provenance report on a soul with a curse in it.", gives: "The three soul-wax candles. {@b Catch:} the report has a buyer already. Krull asked for it." },
          { ask: "Bring him a living gnoll of Targ Nar's pack from the Scab (Session 15).", gives: "The helm at half price, held for a tenday." },
          { ask: "Tell him who burned the Dock. It was his supplier. He does not know it was the party.", gives: "A quality larva of the party's choice, if the answer is someone else and he believes it (Deception DC 16). The truth makes him Cold, and curious about the reward on the gate." },
          { ask: "A soul to stand in the pen in its place: a name, of someone the party has sent down.", gives: "The soul the cleric knows. He does not care who. The party will." }
        ],
        buys: [
          { what: "Larvae and soul-forms", pays: "0.3 SC each (0.4 if haggled)", note: "His standing rate. He does not ask where they came from." },
          { what: "The four sapphire rings off Vistalancer's horn", pays: "2 SC each", note: "A sale of a dragon part. " + CLAUSE2 },
          { what: "The true name of any devil", pays: "1 SC, more for rank", note: "He sells them on to the Soul Pit's high table." },
          { what: "Living captives: gnolls, demons, a bounty hunter", pays: "1 SC a head", note: "He means it. Burney hears about it within the hour." }
        ],
        tonight: [
          "{@b Dumal's last recruiter} is a larva in these pens: 'The Slayer, and the worse one after.'",
          "{@b Krull was here.} On a rack roll of 8 the pens are quiet and Z'neth is nervous.",
          "{@b The rings.} He wants the sapphire rings from Vistalancer's horn. Buying them is a sale under clause 2.",
          "{@b Tonight's rack} is the d8 of who surfaces in the pens: free clues, not goods."
        ]
      },

      // ------------------------------------------------------------------ The Bone Devil Informant
      {
        id: "informant", n: 9, name: "The Bone Devil Informant", short: "Informant", keeper: "A bone devil who gives no name", kind: "stall", x: 33, y: 81,
        panel: "emporium-bone-devil-informant", also: ["emporium-information-market"], haggle: 16, pays: "Takes coin, blood, secrets",
        look: "No stall. A tall shape folded into the dark between two war machines by the gate, a satchel of paper on its knees, a pen behind where an ear would be. It has already written down what you are wearing.",
        stockNote: "Paper that is ready tonight: no check, just the price. Real answers to questions still go by his tiers (Services). Everything the party tells him is on this shelf for the next customer.",
        stock: [
          { g: "Maps and plans", name: "Chart of the Styx, the Dock to the Scab's mouth", rarity: "common", sc: 1, note: "Toll chains, shallows and the two watchtowers marked. Advantage on helm checks on the river." },
          { g: "Maps and plans", name: "Strip map of the ice road", rarity: "common", sc: 1, note: "Crevasses and the fog line. The walk to the Mirror takes 6 hours instead of 8." },
          { g: "The dragons and their riders", name: "Sightings of the green dragon, three nights", rarity: "common", sc: 1, note: "Where on the road the voice was heard. Forewarned: advantage on the first save against Vermilius's Honeyed Voice." },
          { g: "The Writ, the riders and Zariel", name: "The Writ of Hunt, a clean copy", rarity: "common", sc: 0.5, note: "With the bounty clerk's seal. Read closely: the druid is worth 50 only alive, and the price on the ship is paid for the hull, not the crew." },
          { g: "The Writ, the riders and Zariel", name: "Everyone who read the Writ tonight", rarity: "common", sc: 1, note: "A warlord's captain and two cambions, and which stall each is standing at now." },
          { g: "The Writ, the riders and Zariel", name: "Three bounty hunters, a page each", rarity: "uncommon", sc: 2, note: "What the captain owes and to whom (Fhet'Ahla), what the cambions drink, and that none of the three will act inside the wards." },
          { g: "The Writ, the riders and Zariel", name: "The mortal name of the rider who saluted", rarity: "common", sc: 1, extra: "or a pint of blood", note: "The name he had as a paladin. The DM chooses it: best if Lucan or Veska knows it from the rolls of the dead." },
          { g: "The Writ, the riders and Zariel", name: "Hellrider muster roll of the last charge, annotated", rarity: "uncommon", sc: 5, note: "Who fell, who turned, who rides as a narzugon now. It names all three riders at the jetty. Lucan should be the one who reads it." },
          { g: "Papers to carry", name: "Forged papers for the ship", rarity: "uncommon", sc: 2, note: "The Lady Vengeance as 'the Ledger's Due, out of the Stygian Dock'. A hunter checking the jetty needs Investigation DC 17 to match her to the Writ. No use against anyone who has seen her fly." },
          { g: "Papers to carry", name: "Blank contract forms, sealed", rarity: "common", sc: 1, c: true, qty: "3", note: "Real infernal forms. Advantage on a forgery or on a Deception check that needs paper behind it." },
          { g: "The floor and its people", name: "The Emporium's next three stops", rarity: "common", sc: 1, note: "First line: 'The Monument, at dawn, by summons.' My addition: it counts as a clue toward clause 3." },
          { g: "Maps and plans", name: "Floor plan of Infernal Rapture", rarity: "uncommon", sc: 2, note: "The strongroom, the back stair, and where the ledger sits on the counter (clue 6). Sold with the advice not to." },
          { g: "The floor and its people", name: "The party's own page", rarity: "uncommon", sc: 2, note: "What Hell knows about them tonight. Read out what the hunters know: use Session 13's What Arkhan Knows." },
          { g: "Maps and plans", name: "Almanac of the Bleeding Citadel", rarity: "uncommon", sc: 2, note: "The night it next shows, and that the Scab opens the same night (rumour 9, true). The DM sets the night." },
          { g: "The floor and its people", name: "Kreeg's creditors", rarity: "common", sc: 1, note: "Who wants him alive and what each would pay. Leverage, if he is in the barge's hold." },
          { g: "Maps and plans", name: "Sketch of the Basalt Citadel's outer wall", rarity: "uncommon", sc: 4, note: "A deserter's hand. The corpse-hung wall, one postern, the mooring mast of the flying fortress. For the day someone has to be fetched out." },
          { g: "The Writ, the riders and Zariel", name: "Fuel ledger of the flying fortress, a clerk's copy", rarity: "uncommon", sc: 3, note: "The day it can fly again. The drowned Dock clerk in Z'neth's pens knows the same, for the price of a larva." },
          { g: "The dragons and their riders", name: "Where the black dragon sleeps by day", rarity: "uncommon", sc: 2, extra: "+ a pint of blood", note: "Slarkas's roost. The party knows which sky to avoid: the hunt roll gets -2 for the next day." },
          { g: "The dragons and their riders", name: "What Krull sold on this floor", rarity: "common", sc: 1, note: "Vistalancer's year to the Timekeeper, shed white scales to Rassh, a gold scale lost at the Devil's Teeth. He bought nothing for himself." },
          { g: "The floor and its people", name: "Half of Gristle's true name", rarity: "uncommon", sc: 2, note: "Said aloud at the Devil's Teeth, the house folds one hand. Said twice, Gristle remembers the face." },
          { g: "The floor and its people", name: "Register of Elturians sold on this floor", rarity: "uncommon", sc: 2, note: "Names, dates, buyers. Most are in Z'neth's pen. Four are staff in Mahadi's kitchen and do not know the city still stands." }
        ],
        favours: [
          { ask: "A pint of blood from each hero, labelled.", gives: "The real-answer tier with no check until the bell. {@b Catch:} he sells the labels. Whoever buys one can find that hero once." },
          { ask: "One true thing about the ship's Core that no devil knows.", gives: "A dossier, free. {@b Catch:} now a devil knows it." },
          { ask: "Carry a folded note to the narzugon captain. Do not read it.", gives: "The muster roll. {@b Catch:} the note is the party's gangplank and the hour they mean to leave. Read it and they can swap it for a lie." },
          { ask: "A clue for a clue: something about the host he does not have. Clue 3, the chair and the scale, will do.", gives: "One clause of Arkhan's deal, word for word, without the check (my addition to clue 4)." }
        ],
        buys: [
          { what: "What happened at the Dock, from someone who was there", pays: "2 SC", note: "Sold on by morning." },
          { what: "Kreeg's fate", pays: "3 SC", note: "Fhet'Ahla is the buyer." },
          { what: "Where the party goes next", pays: "2 SC", note: "He tells the riders within the hour. A lie costs a Deception check against his Insight (+7); a caught lie is worth more to him than the truth." },
          { what: "Blood", pays: "0.5 SC a pint", note: "Unlabelled. He prefers it labelled." }
        ],
        tonight: [
          "{@b Clue 4:} at his real-answer tier (Persuasion DC 16, advantage with a soul coin held) he gives all three clauses word for word. He read them over a clerk's shoulder.",
          "{@b He will not sell} anything about Mephistopheles. He is afraid, and says so.",
          "{@b The questions} the party is likely to ask, with true and bent answers, are under Services (the information market).",
          "{@b He is the hunters' source too.} The captain and the cambions buy from him. Anything the party does in the open is on a page by midnight."
        ]
      },

      // ------------------------------------------------------------------ the dens
      {
        id: "soul-pit", n: 10, name: "The Soul Pit", short: "Soul Pit", keeper: "Velluc, cambion dealer", kind: "den", x: 37, y: 15,
        panel: "den-soul-pit", pays: "Stakes: soul coins",
        look: "A sunken ring of benches round a felt table, a crowd three deep, and a roar every time the dice stop. The dealer has a gambler's hands and a smile for every loser.",
        tonight: [
          "{@b Clue 5:} win a hand, or Volatile 4, and Arkhan's obsidian marker is in the pot: a wager 'to be collected by the holder of the debt'.",
          "{@b Rare find 19:} the gambler cambion has a torn page of the hospitality ledger for sale. It is the party's page.",
          "A bounty hunter at the ring matches a face to the Writ (Volatile 6). Mahadi may match the pot from the balcony (Volatile 8): that is hospitality, and it goes on the debt.",
          "Velluc trades gossip for a hand of cards, and nothing at all if the player wins."
        ]
      },
      {
        id: "devils-teeth", n: 11, name: "The Devil's Teeth", short: "Devil's Teeth", keeper: "Gristle, barbed devil", kind: "den", x: 52, y: 11,
        panel: "den-devils-teeth", pays: "Stakes: gold, then teeth",
        look: "A barrel, two dice and a barbed devil with a jar of teeth at his elbow. Gnolls, imps and off-duty crew crowd the low rungs. The high rungs are quiet.",
        tonight: [
          "{@b Krull sat here two nights ago} and lost three rounds. His gold scale is still in the house's keeping.",
          "{@b Volatile 1:} Gristle bets a tooth of his own, and it is a dragon's. {@b Volatile 5:} someone stakes a map of the Scab's first level.",
          "{@b Volatile 6:} a narzugon in full barding stands at the ring and watches one player.",
          "A tooth lost here is regrown at Burney's for 1 SC."
        ]
      },
      {
        id: "ninefingers", n: 12, name: "Ninefingers' Table", short: "Ninefingers", keeper: "Sister Ninefingers, night hag", kind: "den", x: 67, y: 15,
        panel: "den-ninefingers", pays: "Stakes: memories",
        look: "A curtained booth lit by one candle that does not flicker. The woman behind the table has nine fingers and a soul bag the size of a child. She deals cards with faces on them. Some of the faces are yours.",
        buys: [
          { what: "A memory of Lulu's", pays: "Anything in her bag", note: "Insight DC 16: she wants one more than anything on the floor, and will cheat to get it. She already holds one (rumour 7, true)." },
          { what: "Memories, staked or sold", pays: "In cards, never in coin", note: "A card is a memory that is not yours: an answer nobody can bend. She sells nothing free." }
        ],
        tonight: [
          "{@b Lulu's card} is in the bag (Volatile 1). If Lulu was taken, this is the nearest thing to her on the floor.",
          "{@b Drenwal only:} a win on card 8 gives him Senna's street. A loss at rung 5 puts a sigil's powers out until Burney mends it.",
          "{@b Card 3} is Kreeg's hand signing Elturel's contract: a living signer or a true copy can unsign it.",
          "A Mephistophelian clerk buys her last three cards of the night (Volatile 6). Whatever the party lost, the Mirror now knows."
        ]
      },
      {
        id: "hourglass", n: 13, name: "The Hourglass", short: "Hourglass", keeper: "The Timekeeper, bone devil bookmaker", kind: "den", x: 82, y: 25,
        panel: "den-hourglass", pays: "Stakes: years",
        look: "A tall glass of black sand on a bone stand, and a bone devil in a clerk's coat beside it with a ledger and a smile that goes up at the corners like a hook.",
        buys: [
          { what: "Years of a hero's life", pays: "1 SC a year, up to 10", note: "Only if Volatile 8 comes up. The coins are warm, and one of them is Kreeg's clerk. Burney undoes 5 years for 5 SC." }
        ],
        tonight: [
          "{@b He sold the party's death-days to Arkhan} yesterday (Volatile 4). 'Years are my business. Days are a side line.'",
          "{@b Vistalancer's year} is in the glass, sold by Krull (Volatile 3). Or'Henn can win it for Uldrak, or drink it: Pull +2.",
          "{@b A decade for a question} (Volatile 1): one dangerous truth, free, for 10 years staked.",
          "He counted souls at the Stygian Dock until the raid. He knows the party by sight and is perfectly civil about it."
        ]
      },

      // ------------------------------------------------------------------ the bell
      {
        id: "bell", n: 14, name: "The Bell and the Ward's Edge", short: "Bell", kind: "place", x: 88, y: 74, px: 95.5, py: 52,
        look: "An iron bell on a mast above the last war machine, and under it a line on the ground where the hum stops. On this side nobody can finish a blow. On that side the ice road runs off into fog, and something large is patient in the clouds.",
        tonight: [
          "{@b It rings at dawn} (clause 3), later by an hour for every 2 SC paid to Mahadi, up to six. When it rings the wards fold with the stalls.",
          "{@b Clause 1 is paid here.} Arkhan's service is that the druid walks with him to this line, alone, and hears Tiamat's offer: a Pull save at DC 10 + Pull + 2.",
          "{@b Outside:} Arkhan and Krull on Obatala, and Slarkas, in the clouds over the Styx. Three narzugons at the jetty. The bounty hunters behind them. Vermilius on the ice road, a voice in the fog.",
          "{@b Three ways to the Mirror:} fly (3 hours, the ship is seen on the shelf), walk (8 hours, the ship hidden, one long rest short), or skip it (Session 15, and the siege comes to the ship).",
          "A ship that left before the bell is not hunted that night."
        ]
      }
    ]
  };

  if (typeof module !== "undefined" && module.exports) module.exports = MARKET;
  if (typeof window !== "undefined") window.EMPORIUM_MARKET = MARKET;
})();
