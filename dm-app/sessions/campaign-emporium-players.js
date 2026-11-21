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
        keeper: "Mahadi, the host", theme: { accent: "#f0c14a", fx: "motes", side: "left" }, // he stands right of centre: the goods go left
        music: "https://open.spotify.com/track/0P8B5mQYaf7cMzFPHtWR6q", // Red Prince Theme (Divinity: Original Sin 2)
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

    // Suggested tracks per place (Borislav Slavov), for the DM to build a playlist from: [title, Spotify track id].
    // Ids were read from Spotify's own album pages by exact title; picked by title, not by ear.
    tracks: {
      "market": [["Streets and Faces", "6qUrPXf13ZJRWjDHC8GUBr"], ["Bard Dance", "5SThqBFjkajbeZ496viOKq"], ["Ale of Balduran", "3bR9lqBpz0S21rvM24R9nH"], ["I Want to Live - City Version", "5DvSPMt6ItPaRYrbDiCfa5"], ["Weeping Dawn - City Version", "1EwV10T6BI0TbkNNkUCnZO"], ["Last Light - Tavern Version", "49zpQRcsFFSVhZMAtvxwaB"], ["Driftwood", "10J6kToxnB7CCHaZy2hUlH"], ["Amber Ale", "4I79eE5kmvsl8vUuEPAiDI"]],
      "jetty": [["Down by the River", "4H1FlITv3PMErUOyQYgUDK"], ["The Queen's High Seas - Beast's Theme", "0XmMow52cQMMgvwCJl66Jv"], ["The Queen's High Seas - Tavern Version", "74UkHtiZUfsz2F4PriPoq4"], ["Main Theme, Pt. 1", "7h76oHuys1Kh9P15EDEtQ2"], ["Reaper's Coast", "4HOezHihIlCw6dbyKzlVFw"], ["Rivellon", "2Ggw6Fz6Uc9SQHWx1aNcwz"], ["Your Tale Awaits You Down the Road", "0j39oKej1YqLnvbbwX7wyP"]],
      "gate": [["Welcome to Fort Joy", "2J3IrhJGv2SiFUhigQI3JN"], ["The Cult of the Absolute", "3LJZL1VQDnov8oG7EWIvci"], ["A Threat from Nether Years", "0aYbWstvduqCnAC1yZ0R4S"], ["Mysterious Trails", "2cKsy1Hj7y2U2fN0hsPk2X"], ["Twisted Force", "14VlKKJMcMHfTc8MdLQuZ8"], ["Symphony of the Void", "6R2XELBRCWt9Or4fhh6koW"]],
      "rapture": [["Red Prince Theme", "0P8B5mQYaf7cMzFPHtWR6q"], ["Dancing with the Source", "1nbDLGg0d4wZCICBuPv0yC"], ["Dancing with the Source - Oud Version", "7hfxgE9QUOrsQn5CJyZGfh"], ["Path of the Godwoken - Oud Version", "3U1rmjTTJAXTi1tpRxUC6j"], ["Dancing with the Source - Tambura Version", "2rXsTWtE1jKG0YL2Ihy4tu"], ["Wash My Dreams Away", "0ocLCJBGWejo03GDLa5jPT"], ["Raphael's Final Act", "3KBQN4dBHxyLEdCNCfSKMV"]],
      "forge": [["Sixteen Strikes", "0TsQvGGDO4qzdnf82HuGI1"], ["Nine Blades", "5o8MYMv2u3SjbH5pfa6ZRx"], ["Forging the Fate", "0HbsyR2NIi0gAvQLBkZRYq"], ["Old Time Battles, Pt. 1", "15nEdGMv4FycmhCTwKQXJy"], ["Lead Your Fights", "21b0hZPbxJpiKdKCKV0yjh"], ["Mead, Gold and Blood - Ifan's Theme", "11lCN6s42ihQKxJNjB6ia7"], ["The Battle for Divinity", "2TBRVGwmayiNWtZeVxBGD9"]],
      "barber": [["Amber Ale", "4I79eE5kmvsl8vUuEPAiDI"], ["Last Light - Tavern Version", "49zpQRcsFFSVhZMAtvxwaB"], ["Rivellon - Light Version", "4PHXA1rSWH2eM9HulCL5Kr"], ["Endless Spring", "58YkuyzA8jIzWUDfSOmi7Y"], ["A Part of Their Story", "6aSEsoEkoKKwdzywSwSyTJ"], ["Power of Innocence 2017 - Orchestra Version", "1ij9PJUriVLadK8E500yfk"], ["Last Shelter", "5PDbPW74EyDDZuOIBCx858"], ["Quest for a Cure", "28M7IXuJ1Y6ResKKWIOcpN"]],
      "bank": [["Mead, Gold and Blood - Ifan's Theme", "11lCN6s42ihQKxJNjB6ia7"], ["Sins and Gods - Revelation", "5kcvSMP2InRF4eZQIaMwLZ"], ["Reflections from the Past", "4axplIj4dxBBM0cH3foHNc"], ["A Single Drop of Magic", "1ql2rGmS3HFiS1CIgJaVOD"], ["Who Are You", "0xKMPC2v7aCDZs0PBlIUSe"], ["Sebille's Theme", "2x56Pc2pEXeoC9DE3fgev4"]],
      "ichor": [["The Colors of Underdark", "2XtqmFq459drrNssf9BuME"], ["A Single Drop of Magic", "1ql2rGmS3HFiS1CIgJaVOD"], ["Crazy Troubled Senses", "4firrJLHNjdZsEcqUMDySq"], ["Dream Walk - Instrumental Version", "1F0w3LvvUK0ltYjGyKShWV"], ["Quirky Bones", "63zcg71PNna984eU8Ihguy"], ["Fane's Theme", "4J3BNBTolywwhjDf17ApKG"]],
      "larva": [["Shadows, Curse and Death", "4PEh8obDtNZVJC9VpwtuG8"], ["Embrace of the Deathfog", "1IBSnfX2z7UVhrTtVDK3pU"], ["Divine's Lament", "3mbtS5EQUolq8UDI1dQZiM"], ["Weeping Dawn", "6wRanpF1xuCCsyCIiLd8jH"], ["Surgery of a Hope", "53dt3DGL1bN9thWeHLa6Ss"], ["Last Light", "2q6qX08PGZHRHyJwcWjTHb"]],
      "informant": [["Quirky Bones - Murky Version", "1VbGGqps3QzMqpLBqaZYh4"], ["Mysterious Trails", "2cKsy1Hj7y2U2fN0hsPk2X"], ["Who Are You", "0xKMPC2v7aCDZs0PBlIUSe"], ["Fane's Theme", "4J3BNBTolywwhjDf17ApKG"], ["Reflections from the Past", "4axplIj4dxBBM0cH3foHNc"], ["Mind Flayer Theme", "7fzJa1R8LTXpti0mO1lWOW"]],
      "soul-pit": [["Bard Dance", "5SThqBFjkajbeZ496viOKq"], ["Ale of Balduran", "3bR9lqBpz0S21rvM24R9nH"], ["The Queen's High Seas - Tavern Version", "74UkHtiZUfsz2F4PriPoq4"], ["Old Time Battles - Bard Version", "4ufxBMgGcxpGGoiUF81SrT"], ["Amber Ale", "4I79eE5kmvsl8vUuEPAiDI"], ["Mead, Gold and Blood - Ifan's Theme", "11lCN6s42ihQKxJNjB6ia7"]],
      "devils-teeth": [["Cunning Cruel Crits", "4nkkpWp0uJpvQXmlokSXcJ"], ["Twisted Force", "14VlKKJMcMHfTc8MdLQuZ8"], ["The Odds Are Cast Anew", "2KI4y4PO2AKw3T5tFahiBH"], ["Old Time Battles, Pt. 2", "5XpGqzZ0Iw4zXbFAub8Ye8"], ["Lead Your Fights", "21b0hZPbxJpiKdKCKV0yjh"], ["Nine Blades", "5o8MYMv2u3SjbH5pfa6ZRx"]],
      "ninefingers": [["Harpy Song", "5a2dn7PboRpZE6HAfWsJfd"], ["Sing for Me (Lohne's Theme) - Bobby's Version", "61ngAmYOmuHKiDF8Oz8tUF"], ["Sing for Me - Lohse Version", "5lGEnZ2Fi53GrCCig7JnPH"], ["Wash My Dreams Away", "0ocLCJBGWejo03GDLa5jPT"], ["Reflections from the Past", "4axplIj4dxBBM0cH3foHNc"], ["Nightsong", "0Us9iU55GkpmKXP21BkQyf"], ["Wash My Pain Away", "3lRLdQyvXpE0cFhihkeB8i"]],
      "hourglass": [["A Tear in the Veil", "0PgXxOJyPnTvcUaZjtcfUg"], ["Divine's Lament - Bonus Song", "04EgYGPeDzjEUtGVTbQEn1"], ["The Grand Design (Requiem)", "6bdzMwXPwyz4nlAI0evkGf"], ["Symphony of the Void", "6R2XELBRCWt9Or4fhh6koW"], ["Sins and Gods - Choir Version", "0asXkraWzjNnRKloDydxWR"], ["Embrace of the Deathfog", "1IBSnfX2z7UVhrTtVDK3pU"]],
      "bell": [["Raphael's Final Act", "3KBQN4dBHxyLEdCNCfSKMV"], ["The Legacy of Bhaal", "68pYaLF2NxDJTltTP3QZTP"], ["Elder Brain", "5D1tZVEhS54xQsBxHgEmtO"], ["A Threat from Nether Years", "0aYbWstvduqCnAC1yZ0R4S"], ["The Battle for Divinity", "2TBRVGwmayiNWtZeVxBGD9"], ["Gather Your Allies!", "1SCZhTOsqGp6lHS54jJOdt"], ["The Power - Orchestral Version", "4PK8w6i17WXWz8pS7CabBQ"]]
    },

    // Mysterious rows (Claude's picks, 2026-11-21: keep, cut or add): the monitor shows the picture darkened, this name
    // and this line, the price, and no rarity and no rules, until the DM presses Identify on his page.
    mystery: {
      forge: {
        "Sun blade": { name: "A gold hilt with no blade", text: "Warm in the hand, and too light. Pawned twice on this floor, and it came back twice. Rassh will not say what it does until it is paid for." },
        "Javelin of lightning": { name: "A javelin that smells of a storm", text: "The head crackles when nobody is touching it. Blue dragon work, he says, and he will not say whose." }
      },
      rapture: {
        "Instant fortress (Daern's)": { name: "A small grey cube, far too heavy", text: "Dark metal the size of a die, with a tiny door cut into one face. Mahadi calls it a house-warming present." },
        "Portable hole": { name: "A folded black cloth", text: "Fine black silk, folded to a handkerchief. Unfolded on the table, nobody can see where it ends." },
        "Feather token: anchor": { name: "A silver feather that weighs like lead", text: "Quaal's work, Mahadi says, and nothing more." }
      },
      barber: {
        "Luckstone": { name: "A river pebble with a hole in it", text: "Grey and smooth, on a cord. Burney says it has kept three customers alive and one of them rich." },
        "Moon sickle, +2": { name: "A herb-cutter's silver sickle", text: "She cuts her herbs with it. She will not say where a barber got one, and the blade is never dull." }
      },
      bank: {
        "Iron flask, occupied": { name: "A sealed flask, warm to the touch", text: "Top shelf, no tag. Something inside it shifts when nobody is holding it. It is not empty." },
        "Gem of seeing": { name: "A clear gem with an eye in it", text: "Tagged 'a seer, foreclosed'. Something inside the stone looks back." },
        "Elemental gem, red corundum": { name: "A red stone, warm to the touch", text: "Something inside it flickers. Fhet'Ahla advises against breaking it indoors." },
        "Figurine of wondrous power, bronze griffon": { name: "A bronze griffon, pocket-sized", text: "Heavy, its beak open as if to scream. Tag: a Hellrider scout." }
      },
      ichor: {
        "Potion of longevity": { name: "An amber bottle with things floating in it", text: "A scorpion's tail, a snake's fang and a dead spider. Elliach calls it the most valuable thing on the cart, and the most dangerous." }
      },
      larva: {
        "Iron bands of Bilarro": { name: "A rusty iron ball", text: "Bands of old iron, locked into each other. It rattles. Z'neth tosses it from hand to hand and grins." },
        "Horn of Valhalla, silver": { name: "A silver war horn", text: "Dented, polished, very old. Z'neth says the ones who answer it are grateful." },
        "Rope of entanglement": { name: "A coil of black rope that will not lie still", text: "It moves when nobody is looking at it." }
      },
      // The informant's answers are sealed letters: the question is the card, the answer (in `say`) opens when it is paid for.
      informant: {
        "Where the dragons wait for the bell": { sealed: true, text: "Where the hunters sit tonight, all four of them, and what they are waiting for." },
        "What the dragonborn bought from the host": { sealed: true, text: "Three lines, copied over a clerk's shoulder. He says it is the most expensive thing he has ever read." },
        "The elf with the thorns": { sealed: true, text: "Her name, her master, and who she came here asking for." },
        "Who kneels before the Mirror": { sealed: true, text: "A name, and a promise made to it. He writes this one facing away from the north." },
        "What the host really is": { sealed: true, text: "One line. He folds it twice and will not hand it over under the lanterns." },
        "The Mirror's escort, and the rule of the glass": { sealed: true, text: "The guard on the ice: how many, what makes them move, and the one rule they keep." },
        "Sightings of the green dragon, three nights": { sealed: true, text: "Where on the road it was heard, and what it sounds like before you see it." },
        "The Writ of Hunt, a clean copy": { sealed: true, text: "With the bounty clerk's seal. He says the small print is worth reading." },
        "Everyone who read the Writ tonight": { sealed: true, text: "Who they are, and which stall each one is standing at now." },
        "Three bounty hunters, a page each": { sealed: true, text: "What each one owes, drinks and fears." },
        "The mortal name of the rider who saluted": { sealed: true, text: "The name he had as a paladin." },
        "Hellrider muster roll of the last charge, annotated": { sealed: true, text: "Who fell, who turned, and who rides now." },
        "The Emporium's next three stops": { sealed: true, text: "Where the caravan goes when it packs, and when." },
        "The party's own page": { sealed: true, text: "What Hell knows about you tonight." },
        "Almanac of the Bleeding Citadel": { sealed: true, text: "The night it next shows." },
        "Kreeg's creditors": { sealed: true, text: "Who wants him alive, and what each would pay." },
        "Fuel ledger of the flying fortress, a clerk's copy": { sealed: true, text: "The day it can fly again." },
        "Where the black dragon sleeps by day": { sealed: true, text: "The roost, and which sky to avoid." },
        "What Krull sold on this floor": { sealed: true, text: "Three sales, and one thing lost at a table." },
        "Half of Gristle's true name": { sealed: true, text: "Half a name, in Infernal, from someone who should not have known it." },
        "Register of Elturians sold on this floor": { sealed: true, text: "Names, dates, buyers." },
        "The riders' written orders, a copy": { sealed: true, text: "What the three at the jetty may do, and what they may not." },
        "A hunter's plate of an old white dragon": { sealed: true, text: "Her breath and her fear, measured by someone who lived. There is a note in the margin." },
        "What Arkhan paid for on this floor": { sealed: true, text: "Three receipts." },
        "The bids on the heads, so far": { sealed: true, text: "Who has offered what for the two dragon heads." },
        "Whose souls are in your coins": { sealed: true, text: "He holds the purse for a minute and writes: names, trades, how each was taken." },
        "Mahadi's guest book, the last tenday": { sealed: true, text: "Who dined at the high table, drawn, not named." }
      }
    },

    hide: {
      rapture: ["An hour before the bell", "The party's own hospitality debt, bought back"],
      larva: ["A kobold from Arkhan's train"],
      // puzzle answers and the night's reveals: shown only when the party asks the right question
      informant: ["What Krull sold on this floor", "What Arkhan paid for on this floor", "What the dragonborn bought from the host", "Who kneels before the Mirror", "What the host really is"]
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
        "Moonkite's barding, sun-steel": "AC 18 for a celestial mount, and no loss of speed in the air: a domed shell for Moonkite's body and a guard for each of its six wings. It glows.",
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
      // The informant: for a sealed letter (see `mystery`) this is what is written inside, shown once it is paid for.
      // Where a line says 'at the bottom', the DM reads the name or the number out (a choice he has not made yet).
      informant: {
        "Where the dragons wait for the bell": "In the clouds above the Styx: Tiamat's champion, the white with her rider, and the black. The green holds the ice road to the Mirror. All four are waiting for the bell.",
        "What the dragonborn bought from the host": "Copied over a clerk's shoulder, word for word. One: the debt of hospitality owed by the party of the Last Hill, assigned to the buyer. Two: first refusal on every dragon part sold, lodged or valued on this floor, at double the best bid. Three: the house answers a summons to the Monument to Tiamat, and packs at dawn. When the bell rings, the wards fold with the stalls.",
        "The elf with the thorns": "Maelys, called the Thorn-Crowned. Bhaal's blood, under contract to Glasya. She came in two nights ago with an erinyes and asked after 'the brothers'. She has not gambled, drunk or slept since.",
        "Who kneels before the Mirror": "Dumal. Alive, kneeling at the glass, sworn to Cania: 'The Champion sleeps in the glass.' Near the Mirror his wounds close by themselves, unless holy light has burned them. When his first shape falls he was promised a second, and something worse after that.",
        "What the host really is": "Not a man. A rakshasa, sworn under Asmodeus's seal. He keeps every contract he signs, to the letter, and nobody talks him out of one. Most magic slides off him like rain. Only a magic point, driven by a good hand, cuts him deep.",
        "The Mirror's escort, and the rule of the glass": "Four ice devils and a bone devil on the glare-ice shelf. Come quietly and they only watch. Draw a weapon, cast at them or make a demand, and they close ranks between you and the glass. Their master's rule, written at the bottom: no blood before the Mirror unless it is Bhaal's.",
        "Sightings of the green dragon, three nights": "Three nights on the ice road, each marked where the voice was heard. It speaks before it is seen: sweet, reasonable, in a voice you trust. Forewarned, you hear it for what it is the first time it speaks to you (advantage on that save).",
        "The Writ of Hunt, a clean copy": "The small print, under the bounty clerk's seal: the druid pays fifty only if he is taken alive, and the hundred for the ship is paid for the hull, not for the crew aboard.",
        "Everyone who read the Writ tonight": "A warlord's captain, standing at the bank. Two cambions, at the Rapture's bar. Nobody else read it twice.",
        "Three bounty hunters, a page each": "The captain owes the bank more than this bounty would pay him. The two cambions drink at the Rapture on credit. None of the three will act inside the wards: they wait for the bell like everyone else.",
        "The mortal name of the rider who saluted": "His name as a paladin of Elturel, before the last charge, in a clerk's careful hand at the bottom. Nobody has said it to him in a hundred years.",
        "Hellrider muster roll of the last charge, annotated": "Who fell, who turned, and who rides as a narzugon now. All three riders at the jetty are on it, each with the rank they held and the day they turned.",
        "Forged papers for the ship": "The Lady Vengeance under another name and another port. No use against anyone who has seen her fly.",
        "The Emporium's next three stops": "First line: 'The Monument, at dawn, by summons.' The other two are crossed out and written again, more than once.",
        "Floor plan of Infernal Rapture": "The strongroom, the back stair and the counter. Sold with the advice not to.",
        "The party's own page": "Your names, your faces, your ship, what you killed and what you carry. Some of it is right. All of it has been sold at least once tonight.",
        "Almanac of the Bleeding Citadel": "It shows itself every thirty-three days. The next night is circled at the bottom. In the margin: the Scab opens the same night.",
        "Kreeg's creditors": "Who holds Thavius Kreeg's notes, the bank first among them, and what each would pay to have him back alive. Whoever holds Kreeg holds something they all want.",
        "Sketch of the Basalt Citadel's outer wall": "A deserter's hand: the wall, one postern, the mooring mast of the flying fortress.",
        "Fuel ledger of the flying fortress, a clerk's copy": "Crippled in the raid on the Dock and towed to the Basalt Citadel. At the bottom, the clerk's count: the days until it flies again.",
        "Where the black dragon sleeps by day": "Where the black one roosts by day, and the sky it watches from there. Keep out of that sky and you are harder to find tomorrow.",
        "Half of Gristle's true name": "Half a true name, in Infernal. Said aloud at the Devil's Teeth, the house folds one hand. Say it twice and Gristle remembers your face.",
        "Register of Elturians sold on this floor": "Names, dates, buyers. Most are in the larva pens. Four work in the Rapture's kitchen tonight, and do not know their city still stands.",
        "Sketch of the Mirror's shelf": "The Mirror, the ground around it, and where its guards stand.",
        "Chart of the upper air": "Where the fog tops out and where the ash winds run. Above the fog a ship is seen for ten miles. Inside it she is hidden and half blind.",
        "The riders' written orders, a copy": "They may not cross the ward. They take the druid alive. And the Writ names a ship 'at her moorings': a ship under way is not theirs to stop.",
        "Lantern codes of Zariel's fleet": "This tenday's signals. Once, a ship can answer a patrol's challenge as one of their own.",
        "A hunter's plate of an old white dragon": "Her breath, how far it reaches and how soon it comes back; her fear, and how far it carries: measured by someone who lived. In the margin, in another hand: 'In this heat the belly scales run.'",
        "The bids on the heads, so far": "Mahadi's clerk, 25 a head. A collector in Dis, 20, by letter. A warlord's captain, 18. At the bottom, in another hand: 'Reserved. Double the best.'",
        "Translation while you wait": "He reads Infernal blueprints, contracts and letters into Common, correctly. The Forge's blueprints then cost no extra days.",
        "The floor's price sheet": "What each keeper paid for what is on the shelf tonight. Advantage on one haggle at each stall.",
        "The keepers, a page each": "What moves each keeper off the list price. Seven pages, sold singly.",
        "Whose souls are in your coins": "Names, trades, and how each was taken, a line for every coin. Three of them were Elturians. Their names are at the bottom.",
        "Mahadi's guest book, the last tenday": "Drawn, not named: a dragonborn in black plate who smelled of old meat, twice; an erinyes of Malbolge. One page has been cut out. He is afraid of whoever was on it.",
        "What Krull sold on this floor": "Three sales and a loss: Vistalancer's year to the Timekeeper, a sack of shed white scales to the Forge, and a gold scale lost at the Devil's Teeth. The white's rider bought nothing for himself.",
        "What Arkhan paid for on this floor": "Three receipts: death-days bought at the Hourglass, a chair at the high table, and one notary's fee at the bank. Somebody signed a contract on this floor, and signed first."
      }
    }
  };

  if (typeof module !== "undefined" && module.exports) module.exports = PLAYERS;
  if (typeof window !== "undefined") window.EMPORIUM_PLAYERS = PLAYERS;
})();
