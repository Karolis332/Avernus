// What the players may see of the Wandering Emporium (emporium.html?view=players, the monitor at the table).
// The stock itself stays in campaign-emporium-market.js and campaign-emporium-goods.js: this file only says
// how each spot looks and sounds on the monitor, which rows are kept off it, and what a card says where the
// DM's note gives something away.
//   spots[id]  keeper: the name the players read (default: the market's own) · greet: the keeper's first line ·
//              blurb: the public line of a den or a place · theme: accent colour + the kind of drifting particles ·
//              music: a Spotify link (track, album or playlist); the DM can paste his own on the DM page.
//   hide[id]   rows not shown until the DM reveals them (favour-only rows are hidden without being listed).
//   say[id]    row name -> the players' line. A row not listed shows its own note with the tags stripped.
// tests/emporium-players.test.js: every name here is a real row, and every note with DM wording is covered.
(function () {
  "use strict";

  var PLAYERS = {
    title: "The Wandering Emporium",
    music: "https://open.spotify.com/track/6qUrPXf13ZJRWjDHC8GUBr", // the market's own theme, played on the map: Streets and Faces (Baldur's Gate 3: Streets and Taverns)
    spots: {
      jetty: {
        theme: { accent: "#9cc3dd", fx: "mist" }, music: "https://open.spotify.com/track/4H1FlITv3PMErUOyQYgUDK", // Down by the River (Baldur's Gate 3)
        blurb: "The Lady Vengeance is moored at the end of the planks. Work bought at the Forge is done here, at her berth. Three riders wait where the planks meet the ice."
      },
      gate: {
        theme: { accent: "#d8b06a", fx: "ash" }, music: "https://open.spotify.com/track/2J3IrhJGv2SiFUhigQI3JN", // Welcome to Fort Joy (Divinity: Original Sin 2)
        blurb: "The Writ of Hunt, nailed up for everyone to read: 100 soul coins for the ship, 20 a head, 50 for the druid alive."
      },
      rapture: {
        keeper: "Mahadi, the host", theme: { accent: "#f0c14a", fx: "motes" }, music: "https://open.spotify.com/track/0P8B5mQYaf7cMzFPHtWR6q", // Red Prince Theme (Divinity: Original Sin 2)
        greet: "Friends! Dragon-killers! Sit, eat, be easy. Tonight nothing is too good for you, and everything has its price."
      },
      forge: {
        theme: { accent: "#ff9a4d", fx: "embers" }, music: "https://open.spotify.com/track/0TsQvGGDO4qzdnf82HuGI1", // Sixteen Strikes (Baldur's Gate 3)
        greet: "Dragon-killers. Say what you want. The metal is listening."
      },
      barber: {
        theme: { accent: "#e8a57c", fx: "steam" }, music: "https://open.spotify.com/track/4I79eE5kmvsl8vUuEPAiDI", // Amber Ale (Divinity: Original Sin 2)
        greet: "Sit down, love. You look like you have had a week of it."
      },
      bank: {
        theme: { accent: "#e6d38a", fx: "motes" }, music: "https://open.spotify.com/track/11lCN6s42ihQKxJNjB6ia7", // Mead, Gold and Blood - Ifan's Theme (Divinity: Original Sin 2)
        greet: "Everything in the cage belonged to someone who was certain they could pay. How may I help?"
      },
      ichor: {
        theme: { accent: "#9be36a", fx: "bubbles" }, music: "https://open.spotify.com/track/2XtqmFq459drrNssf9BuME", // The Colors of Underdark (Baldur's Gate 3)
        greet: "A taste? Go on. Most of it is perfectly safe, and the rest is very interesting."
      },
      larva: {
        theme: { accent: "#b9c77a", fx: "mist" }, music: "https://open.spotify.com/track/4PEh8obDtNZVJC9VpwtuG8", // Shadows, Curse and Death (Baldur's Gate 3)
        greet: "Graded stock, fair weight, no refunds. Keep your fingers outside the rails."
      },
      informant: {
        theme: { accent: "#aab4cc", fx: "smoke" }, music: "https://open.spotify.com/track/1VbGGqps3QzMqpLBqaZYh4", // Quirky Bones - Murky Version (Divinity: Original Sin 2)
        greet: "You are the ones with the heads. I have your page already. Buy something else."
      },
      "soul-pit": {
        theme: { accent: "#d77bd9", fx: "smoke" }, music: "https://open.spotify.com/track/5SThqBFjkajbeZ496viOKq", // Bard Dance (Baldur's Gate 3: Streets and Taverns)
        greet: "Place your bets! The house loves a winner, and it loves a loser more.",
        blurb: "Dice on felt, played for soul coins, with a crowd three deep."
      },
      "devils-teeth": {
        theme: { accent: "#e2725b", fx: "embers" }, music: "https://open.spotify.com/track/4nkkpWp0uJpvQXmlokSXcJ", // Cunning Cruel Crits (Baldur's Gate 3)
        greet: "Two dice. One barrel. Ante up, or keep your teeth.",
        blurb: "Two dice on a barrel, rung by rung. The low rungs play for gold. The high rungs play for teeth."
      },
      ninefingers: {
        keeper: "Sister Ninefingers", theme: { accent: "#b79cf0", fx: "motes" }, music: "https://open.spotify.com/track/5a2dn7PboRpZE6HAfWsJfd", // Harpy Song (Baldur's Gate 3)
        greet: "Sit, dearie. I have dealt you in already.",
        blurb: "Cards with faces on them. She does not take coin: the stake is a memory."
      },
      hourglass: {
        theme: { accent: "#cfc4a3", fx: "ash" }, music: "https://open.spotify.com/track/0PgXxOJyPnTvcUaZjtcfUg", // A Tear in the Veil (Divinity: Original Sin 2)
        greet: "Everyone has time to spend. Shall we see how much of yours?",
        blurb: "A bookmaker who takes his bets in years of your life."
      },
      bell: {
        theme: { accent: "#cfe6f2", fx: "snow" }, music: "https://open.spotify.com/track/3KBQN4dBHxyLEdCNCfSKMV", // Raphael's Final Act (Baldur's Gate 3)
        blurb: "When the bell rings the caravan packs, and the wards fold with the stalls."
      }
    },

    hide: {
      rapture: ["An hour before the bell", "The party's own hospitality debt, bought back"],
      larva: ["A kobold from Arkhan's train"],
      informant: ["What Krull sold on this floor", "What Arkhan paid for on this floor"]
    },

    say: {
      rapture: {
        "Heroes' feast, cooked not cast": "As the spell for 24 hours: immune to poison and fear, +2d10 maximum hit points, advantage on Wisdom saves (Pull saves too). One sitting, for up to twelve.",
        "Cask of Elturian summer wine": "Looted from a cellar that fell with the city. The vintner's mark is Elturian. A gift a Hellrider does not forget.",
        "Devil-court silks, fitted in an hour": "Advantage on Charisma checks with devils of rank until the bell.",
        "Scroll of revivify": "A scroll needs no diamond: the ink carries it. Cleric only, and it costs no spell slot.",
        "Scroll of banishment": "Cleric or warlock. A devil only vanishes for a minute. A creature from the Material Plane goes home for good if the caster holds it the full minute (Charisma save).",
        "Scroll of death ward": "8 hours. The first drop to 0 hit points becomes 1.",
        "Scroll of greater restoration": "No diamond dust needed. Ends one curse, one level of exhaustion, or one drain on body or mind. Tiamat's curse is beyond it.",
        "Scroll of dispel evil and good": "Ends a possession or sends one fiend home.",
        "Scroll of word of recall": "The way out of the Crypt, on paper. Cleric. The caster needs a sanctuary prepared beforehand.",
        "Scroll of wind walk": "Druid. Ten creatures become cloud for 8 hours, fly speed 300 ft. One minute to turn solid again.",
        "Scroll of holy aura": "An 8th-level spell: a cleric who cannot yet cast it may waste the scroll. One minute: the party has advantage on every save, attackers have disadvantage, a fiend that hits in melee can be blinded.",
        "Scroll of resurrection": "No diamond needed. Dead up to a century.",
        "Heward's handy haversack": "The thing you want is always on top. A dead courier's.",
        "Ring of spell storing": "Holds 5 levels of spells, cast by whoever wears it. Sold empty. Attunement.",
        "Instant fortress (Daern's)": "A cube that becomes a 20-ft. adamantine tower anywhere flat: cover, a door that locks, and a roof.",
        "Scroll of sending": "Cleric. Twenty-five words to anyone the caster knows, and a reply. To another plane it fails 1 time in 20.",
        "Scroll of hold monster": "Warlock. Wisdom save or paralysed for a minute, a new save each turn. A paralysed flier falls.",
        "Scroll of forbiddance": "Cleric, 10 minutes to cast. For a day nothing teleports into the warded place, and a fiend that enters takes 5d10 radiant then and on each of its turns inside.",
        "Sending stones, a pair": "Once a day each: twenty-five words to the other stone, and a reply. One for the helm, one for the shore party.",
        "Portable hole": "A black cloth that opens a hole 6 ft. across and 10 ft. deep, and folds to a handkerchief. Two dragon heads fit.",
        "Feather token: bird": "Quaal's. A roc that obeys and cannot attack, for a day: it carries 500 lb. at 16 miles an hour.",
        "Heated pavilion tent": "Red silk for eight, with a brazier that makes no smoke. A long rest on the ice is a comfortable one. Red silk on white ice shows for a mile.",
        "Ship's stores for a month": "Food, water, lamp oil and rope for the Lady Vengeance and everyone aboard for thirty days, carried to the jetty by his staff.",
        "A case of mortal comforts": "Baldur's Gate tobacco, Calishite coffee, sugar, soap. A gift that warms a wary keeper or a warlord's sergeant. It does not work on Mahadi: he sold it.",
        "Gem-studded feasting bowl, 1,000 gp": "The component for heroes' feast, used up by the casting. Lay the feast yourselves on the morning it matters, with no kitchen near.",
        "Silver scrying mirror, 1,000 gp": "The focus for scrying; not used up. Cleric, druid and warlock can all cast it. It hung in his bath-house.",
        "Offerings for divination, 25 gp": "Incense and a kid from the kitchen, used up. One question about something in the next 7 days, and a short true answer.",
        "Powdered silver and iron, 100 gp": "For magic circle (cleric or warlock, a minute to cast), used up. For an hour fiends cannot enter a 10-ft. circle, or cannot leave it.",
        // hidden until revealed
        "An hour before the bell": "Mahadi sells delay: the caravan packs one hour later for each one bought.",
        "The party's own hospitality debt, bought back": "Everything the house has given you, bought back at three times its weight. He will take one service, named later, instead of coin.",
        "Talisman of pure good": "Kept in a lead box. A good cleric's holy symbol: +2 to spell attacks, 7 charges, and an evil creature standing on the ground when it is used makes a DC 20 Dexterity save or the ground takes it."
      },
      forge: {
        "Arrow of dragon slaying": "A dragon hit makes a DC 17 Constitution save, taking 6d10 extra piercing or half. The heads are cut from dragon scale.",
        "Hellfire arrows": "+2d6 fire that ignores resistance, not immunity. A humanoid killed by one wakes in the Styx as a lemure. Rassh says so before he takes the coin.",
        "Moonkite's barding, sun-steel": "AC 18 for a celestial mount, no loss of speed, flying or running. It glows.",
        "Sentinel shield": "Advantage on initiative and on Perception. For whoever stands watch.",
        "Adamantine full plate": "AC 18. Any critical hit against the wearer becomes a normal hit. For Veska or Lucan.",
        "Armour of cold resistance, breastplate": "Resistance to cold: a white dragon's breath, the ice road. Attunement. He made three and sold two this week, both to riders.",
        "White dragon scale mail": "AC 14 + Dex (max 2) + 1, resistance to cold, advantage on saves against dragon breath and Frightful Presence. Once a day it points at the nearest white dragon within 30 miles. Cut from scales a white dragon shed in the heat.",
        "Infernal metal, an ingot": "One ingot is 5 pieces of infernal metal for the ship's engineer.",
        "Blueprints: Spinal Lance": "Armament III. Hard reading even for an engineer, and it takes 20 metal and the heart of a great fiend to build.",
        "Overnight fitting by the fire snakes": "Tier I or II Armament or Hull fitted in 6 hours instead of days; you bring the metal and the parts. She cannot move for those 6 hours.",
        "Smoke pots for the stern, a set of 4": "Lit and dropped by anyone aft as a bonus action: a 40-ft. ball of black smoke hangs behind her for a minute. It spoils the aim of anything that hunts by eye.",
        "Dragonlance, unquenched": "A lance head older than the forge, waiting for a quench it has never had. +3, +3d6 force to a dragon, and an ally who sees the hit strikes too."
      },
      barber: {
        "Tea of the kept name": "8 hours: advantage on saves against forgetting: the Styx, or anything else that steals a memory.",
        "Ointment for true seeing, 25 gp": "The component for true seeing, used up. An hour of truesight to 120 ft.",
        "Platinum scarf": "Pull a scale, three a day: it heals 10d4, or becomes a +1 shield that makes its bearer immune to radiant damage, or a hammer of light that bites chromatic dragons."
      },
      bank: {
        "Ruby dust, 1,500 gp": "For forcecage. Not used up by the casting.",
        "Ring of mind shielding": "Magic cannot read its wearer's thoughts, lies or nature. Attunement. A wearer who dies can go into the ring instead of the river, and a soul in the ring cannot be coined.",
        "Wand of secrets": "3 charges: it pulses and points at the nearest secret door or trap within 30 ft.",
        "Gem of seeing": "3 charges: 10 minutes of truesight to 120 ft., looking through it. Attunement.",
        "Medallion of thoughts": "3 charges: detect thoughts, DC 13. Attunement.",
        "Iron flask, occupied": "Top shelf, no tag. A creature that is not native to this plane makes a DC 17 Wisdom save or is drawn inside. It is not empty."
      },
      ichor: {
        "Potion of resistance (cold)": "1 hour. A white dragon, the ice road.",
        "Potion of clairvoyance": "See or hear a place you know within a mile for 10 minutes.",
        "Potion of mind reading": "Detect thoughts, DC 13.",
        "Oil of slipperiness": "Freedom of movement for 8 hours: no grapple, no chain, no web holds.",
        "A flask of Styx water": "Thrown 20 ft. and splashed on a creature: the Styx takes its memory. Labelled in three languages. Do not let it open aboard.",
        "Frostblood strain": "10 minutes: immune to cold. For the hour after, vulnerable to fire. The label says so in small print.",
        "Hollowbone strain": "10 minutes: fly speed 40 ft. It has a catch. Ask him.",
        "Wyrmscent strain": "1 hour: the drinker smells every dragon within a mile, direction and rough distance. It has a catch. Ask him.",
        "Alchemy jug": "Pours out water, wine, oil, acid or poison by the gallon every day and is never used up. He is fond of it.",
        "Red courage": "An hour: the drinker cannot be frightened. The label reads 'you will not see it coming, and you will not mind'. It has a catch. Ask him.",
        "Potion of longevity": "The drinker grows 1d6 + 6 years younger. Each bottle after a hero's first has a growing chance to add the years instead.",
        "Truth serum": "Swallowed: DC 11 Constitution or poisoned for an hour and unable to knowingly lie. Devils are immune to poison. It works on a mortal.",
        "Torpor": "Swallowed: DC 15 Constitution or poisoned for 4d6 hours and unable to act while it lasts.",
        "Acid, a rack of 6 vials": "Thrown 20 ft.: 2d6 acid. One vial ruins a lock; three eat through a link of ordinary chain.",
        "Potion of dragon's majesty": "Brewed from your own dragon blood, ready by the bell: the drinker becomes an adult dragon for 1 hour."
      },
      larva: {
        "The Elturian pen: twelve souls": "Taken the day the city fell. Twelve souls of Elturel, sold as one lot.",
        "An Elturian child": "A child of Elturel, in a pen. He says it is worth nothing to him.",
        "A Hellrider farrier": "He shod the horses of the last charge. He knows nightmares and their tack.",
        "A Gondian tinker": "Drowned in the Styx with her tools. She knows engines that run on souls.",
        "A helmsman of Zariel's flying fortress": "He steered Zariel's flying fortress and knows how she turns.",
        "Soul-tallow, a keg": "Engine grease rendered from culls: the ship's speed +10 ft. for 24 hours. It smells of what it is.",
        "Coin scales": "Weigh a soul coin: how many charges are left, and whether the soul in it was a good one.",
        "Messenger imp, a tenday's contract": "Invisible, fast, carries a spoken message between the ship and the party.",
        "Helm of devil command": "A legion commander's. The wearer knows where every devil within 1,000 ft. is and can force one to obey. Needs Infernal and attunement. Zariel's officers know it on sight.",
        "Hobgoblin veterans, six for a tenday": "The rear guard of his old band: a captain and five veterans. They hold a gangplank or a deck and follow orders exactly. They will not fight a dragon. Paid in advance.",
        "Devil's Ride, with a harpoon flinger": "An infernal war machine for a rider and a passenger, speed 120 ft. It burns a soul coin a day. The ice road in two hours instead of eight, and heard long before it arrives.",
        "Signal rockets, a case of 6": "Red, green and white, seen for ten miles. The ship calls the party, or the party the ship. Everyone else who is looking sees them too.",
        "Soul-coin strongbox, Mammon lock": "Holds 100 coins; DC 25 to pick. Coins inside cannot be counted, smelled or scried from outside.",
        "Abyssal chickens, a crate of 6": "Ugly, loud, edible, and they fly badly. Thrown from the rail, one may draw off something hungry. Somebody aboard will name them.",
        "Soul-glass spectacles": "Lenses ground from a spent coin. The wearer sees whether a creature carries a soul of its own, a sold one, or none. They also show every soul in every coin the wearer carries, looking back.",
        "A kobold from Arkhan's train": "Killed for laughing at the wrong moment. It knows how its old master camps.",
        "The soul the cleric knows": "Kept apart in the back pen. It is not for coin at any price."
      },
      // The informant sells answers: a card names the paper, never what is written on it.
      informant: {
        "Sightings of the green dragon, three nights": "Where on the road it was heard, and what it sounds like before you see it.",
        "The Writ of Hunt, a clean copy": "With the bounty clerk's seal. He says the small print is worth reading.",
        "Everyone who read the Writ tonight": "Who they are, and which stall each one is standing at now.",
        "Three bounty hunters, a page each": "What each one owes, drinks and fears.",
        "The mortal name of the rider who saluted": "The name he had as a paladin.",
        "Hellrider muster roll of the last charge, annotated": "Who fell, who turned, and who rides now.",
        "Forged papers for the ship": "The Lady Vengeance under another name and another port. No use against anyone who has seen her fly.",
        "The Emporium's next three stops": "Where the caravan goes when it packs.",
        "Floor plan of Infernal Rapture": "The strongroom, the back stair and the counter. Sold with the advice not to.",
        "The party's own page": "What Hell knows about you tonight.",
        "Almanac of the Bleeding Citadel": "The night it next shows.",
        "Kreeg's creditors": "Who wants him alive, and what each would pay.",
        "Sketch of the Basalt Citadel's outer wall": "A deserter's hand: the wall, one postern, the mooring mast of the flying fortress.",
        "Fuel ledger of the flying fortress, a clerk's copy": "The day it can fly again.",
        "Where the black dragon sleeps by day": "The roost, and which sky to avoid.",
        "Half of Gristle's true name": "Said aloud at the Devil's Teeth, it is worth one hand. He does not recommend saying it twice.",
        "Register of Elturians sold on this floor": "Names, dates, buyers.",
        "Sketch of the Mirror's shelf": "The Mirror, the ground around it, and where its guards stand.",
        "Chart of the upper air": "Where the fog tops out and where the ash winds run. Above the fog a ship is seen for ten miles. Inside it she is hidden and half blind.",
        "The riders' written orders, a copy": "What the three at the jetty may do, and what they may not.",
        "Lantern codes of Zariel's fleet": "This tenday's signals. Once, a ship can answer a patrol's challenge as one of their own.",
        "A hunter's plate of an old white dragon": "How far the breath reaches, how often it comes back, how far the fear carries. There is a note in the margin.",
        "The bids on the heads, so far": "Who has offered what for the two dragon heads.",
        "Translation while you wait": "He reads Infernal blueprints, contracts and letters into Common, correctly. The Forge's blueprints then cost no extra days.",
        "The floor's price sheet": "What each keeper paid for what is on the shelf tonight. Advantage on one haggle at each stall.",
        "The keepers, a page each": "What moves each keeper off the list price. Seven pages, sold singly.",
        "Whose souls are in your coins": "He holds the purse for a minute and writes: names, trades, how each was taken.",
        "Mahadi's guest book, the last tenday": "Who dined at the high table, drawn, not named.",
        "What Krull sold on this floor": "Three sales, and one thing lost at a table.",
        "What Arkhan paid for on this floor": "Three receipts."
      }
    }
  };

  if (typeof module !== "undefined" && module.exports) module.exports = PLAYERS;
  if (typeof window !== "undefined") window.EMPORIUM_PLAYERS = PLAYERS;
})();
