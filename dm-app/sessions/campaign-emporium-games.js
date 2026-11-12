// Campaign-wide: the Wandering Emporium's floor at level 14. Rollable stock, four gambling dens with games the
// players can play with real dice, the information market priced for the Session 14 stage, and a rumour table.
// Everything here is HOMEBREW on the book's Emporium (BGDIA p. 126-131). Written 2026-11-12 for Session 14.
// Panels link from campaign-emporium.js (Shops and Prices) and from 14-the-emporium-and-the-mirror.js.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.side, {
  // ===================================================================
  // THE FLOOR TONIGHT (index)
  // ===================================================================
  "emporium-floor": {
    title: "The Floor Tonight: Stock, Dens, Brokers",
    blocks: [
      { t: "p", text: "The Emporium at level 14, with the party's reputation ahead of them (two dragon heads on the prow, the Dock on fire behind them). Prices follow {@side emporium-shops|Shops and Prices}; this is what is {@b different tonight}." },
      { t: "list", items: [
        "{@side emporium-stock-today|Today's shelf}: one d8 table per stall, a d20 rare-find table for the whole market, and the price-swing die.",
        "{@side den-soul-pit|The Soul Pit}: Three-Dragon Ante with dice. Stakes: soul coins.",
        "{@side den-devils-teeth|The Devil's Teeth}: a two-dice brawl with a barbed devil. Stakes climb from gold to teeth.",
        "{@side den-ninefingers|Ninefingers' Table}: Memory Faro with a night hag. Stakes: memories, won and lost.",
        "{@side den-hourglass|The Hourglass}: Sand, with a bone devil bookmaker. Stakes: years of your life.",
        "{@side emporium-information-market|The information market}: who sells which answer tonight, at what price, and what the true answer is.",
        "{@side emporium-rumours|Rumours on the floor}: d12, three of them false."
      ] },
      { t: "h", text: "The Three Rules of the Dens (homebrew)" },
      { t: "steps", items: [
        "{@b The truce covers the tables.} Nobody draws steel over a pot. Cheats are not killed: they are walked to the edge of the wards and left there. Tonight that edge has dragons over it.",
        "{@b What is staked is really lost.} A soul coin lost here fuels the Emporium: the soul is gone. A memory lost is gone until bought back ({@c kreeg|Kreeg's Ledger} can return one line a day, if the party holds it). A year lost is a year.",
        "{@b Volatility.} Each den has a Volatile table. Roll on it (d8) the first time the pot reaches the den's threshold, and again every time the party wins three hands in a row. That is where the dens stop being games."
      ] },
      { t: "note", title: "Pacing", text: "One den per PC who wants one, three hands each, then a Volatile roll. A den visit is 10 to 15 minutes of table time. Let the players roll their own dice; the DM rolls for the house in the open." }
    ]
  },

  // ===================================================================
  // TODAY'S SHELF
  // ===================================================================
  "emporium-stock-today": {
    title: "Today's Shelf: Rollable Stock (level 14)",
    blocks: [
      { t: "p", text: "Roll once per stall when the party first walks up, or pick. Magic items are priced about 25% above the Session 8 list (level 14). {@b SC} = soul coin. Every purchase then rolls the {@b price swing} below." },
      { t: "table", caption: "Price swing (d6, per purchase)", head: ["d6", "Tonight the price is"], rows: [
        ["1", "+50%. A rival buyer (a warlord's captain, Krull, a Mephistophelian clerk) bid on it an hour ago. The stall will take the higher offer."],
        ["2-4", "As listed."],
        ["5", "-25%. Dumped stock: the caravan packs at the bell and the stall would rather sell than carry."],
        ["6", "Not for coin. The stall wants something else: a dragon scale, a memory, an hour of a cleric's time, a favour on the road."]
      ] },

      { t: "h", text: "The Firesnake Forge (Rassh)" },
      { t: "table", caption: "d8: on the racks", head: ["d8", "Item", "Price"], rows: [
        ["1", "{@item Lance|PHB} +1, Hellrider pattern, the haft wrapped in red scale", "4 SC / 1,000 gp"],
        ["2", "{@item Adamantine armor|DMG} (chain shirt)", "3 SC / 750 gp"],
        ["3", "Three Shattersticks (see Rassh's panel)", "1 SC each"],
        ["4", "{@item Javelin of lightning|DMG}, two of them", "2 SC each"],
        ["5", "Dragon-Scale Warplate, red, cut tonight: he buys the party's red scales (1 batch) and sells the plate back for 6 SC. Fire resistance, AC 18, Str 15.", "6 SC + the scales"],
        ["6", "Infernal war-machine parts: 3 {@c infernal-metal|infernal metal} ingots", "2 SC each"],
        ["7", "Sun-forged horseshoes for a celestial mount: fly speed +10 ft. Moonkite only.", "5 SC"],
        ["8", "{@item Horn of blasting|DMG}, dented, a bone devil's", "4 SC"]
      ] },

      { t: "h", text: "Burney the Barber" },
      { t: "table", caption: "d6: what Burney can do tonight", head: ["d6", "Service", "Price"], rows: [
        ["1", "A face nobody in Hell will know, for one PC, 24 hours ({@spell disguise self} that survives truesight)", "3 SC"],
        ["2", "Salt and seal: the dragon heads keep for 30 days (no {@spell gentle repose} needed)", "1 SC per head"],
        ["3", "Pull a tooth cleanly, or regrow one lost at the Devil's Teeth", "50 gp / 1 SC"],
        ["4", "Scar removal, or a scar added that tells a story (advantage on one Intimidation check in Avernus)", "100 gp"],
        ["5", "A quiet {@spell greater restoration}, no questions, for the Hourglass's years or the hag's holes", "5 SC"],
        ["6", "A shave and the news: everything a barber hears (one free rumour from {@side emporium-rumours|the table})", "10 gp"]
      ] },

      { t: "h", text: "From Here to Avernus (Fhet'Ahla)" },
      { t: "table", caption: "d8: in the collateral cage", head: ["d8", "Forfeit", "Price"], rows: [
        ["1", "The Unredeemed Collateral (see her panel)", "as listed"],
        ["2", "{@item Ring of mind shielding|DMG}, a warlord's, a soul still in it (it talks)", "5 SC"],
        ["3", "A notarised copy of a Styx watchtower's log: the Lady Vengeance's last three sightings and who paid for them", "2 SC"],
        ["4", "{@item Cloak of the bat|DMG}", "4 SC"],
        ["5", "A defaulted Hellrider's {@item sending stones|DMG}: the other stone is in Elturel", "3 SC"],
        ["6", "A soul-coin loan: up to 20 SC against the ship, the heads, or a memory (her terms)", "interest 1 SC per 5 per week"],
        ["7", "{@item Periapt of wound closure|DMG}", "3 SC"],
        ["8", "The deed to a boat on the Styx (a barge, 60 ft., crewed by lemures)", "8 SC"]
      ] },

      { t: "h", text: "Ichor's Aweigh! (Elliach)" },
      { t: "table", caption: "d8: what is in the vats", head: ["d8", "Product", "Price"], rows: [
        ["1-2", "Raw ichor vials (gamble, roll his d10)", "1 SC each"],
        ["3", "Stabilised ichor: {@item potion of fire resistance|DMG} x2 (works on hellfire)", "1 SC each"],
        ["4", "A Glabrezu's Reach: for 1 hour one creature has a 10-ft. reach with its claws or weapons", "2 SC"],
        ["5", "Vrock Spores in a jar: a {@spell confusion}-cloud grenade (DC 15 Wis, 1 round)", "2 SC"],
        ["6", "Chasme Drone: a sleep bomb, 20-ft. radius, DC 14 Con or unconscious 1 minute (damage wakes)", "3 SC"],
        ["7", "The Perfected Strain (his signature; see his panel)", "as listed"],
        ["8", "Dragon blood, he will {@b buy}: 1 SC per dose, 6 SC per bottle, 8 if it is red", "he pays"]
      ] },

      { t: "h", text: "Z'neth's Larva Farm" },
      { t: "table", caption: "d8: who surfaces in the pens tonight", head: ["d8", "Larva / soul", "What it means"], rows: [
        ["1", "A Hellrider who rode with Yael. He remembers the gate.", "A free clue to the Bleeding Citadel's doors: 'they open for the ones who stayed.'"],
        ["2", "A Stygian Dock clerk, drowned in the raid.", "He knows the fortress's fuel count and the day it flies again (1d4 days from the raid, rolled now)."],
        ["3", "One of Kreeg's own: a soul Kreeg took at the Throat.", "Knows Kreeg's cabin and what was in it."],
        ["4", "A gnoll of Targ Nar's pack.", "Knows the Scab's mouth and who guards it."],
        ["5", "Somebody the Cleric knows.", "Run Opportunity 6 from {@side emporium-events|Emporium events}."],
        ["6", "A Mephistophelian scribe.", "Knows the Mirror's escort rota and that 'the Champion sleeps in the glass.'"],
        ["7", "Dumal's recruiter, killed by his own master.", "Knows what Dumal was promised: 'the Slayer, and the worse one after.'"],
        ["8", "Nobody. The pens are quiet. Z'neth is nervous: a tortle bought two larvae last night and paid in gold scale.", "Krull was here. See {@side emporium-information-market|the information market}."]
      ] },

      { t: "h", text: "The Whole Market" },
      { t: "table", caption: "d20: a rare find, once per visit", head: ["d20", "Find", "Where / price"], rows: [
        ["1-8", "Nothing rare. The usual stalls.", ""],
        ["9", "{@item Oil of sharpness|DMG}", "Rassh, 5 SC"],
        ["10", "A {@item spell scroll|DMG} of {@spell heroes' feast}", "Mahadi's back room, 4 SC"],
        ["11", "A {@item spell scroll|DMG} of {@spell plane shift}, Avernus-locked (it only works to leave, once)", "Fhet'Ahla, 10 SC, and she tells Mahadi who bought it"],
        ["12", "{@item Boots of speed|DMG}", "a warlord's captain, 6 SC, selling to flee the Writ"],
        ["13", "An {@item ioun stone|DMG} (protection), a Hellrider's", "Z'neth found it in a larva, 4 SC"],
        ["14", "Vistalancer's four sapphire rings, if the party did not cut them off: a cambion has them", "He wants 2 SC each or a hand of cards"],
        ["15", "A map of the Scab's first level, drawn by a demon that got out", "The bone devil informant, real-answer tier"],
        ["16", "{@item Amulet of proof against detection and location|DMG}", "Burney, 5 SC. It would blind the hunt roll."],
        ["17", "A soul coin with a name on it the party knows", "Z'neth, 1 SC. Roll on his table."],
        ["18", "Gentle repose in a bottle: salts that keep a corpse 10 days", "Burney, 1 SC"],
        ["19", "A page of the Emporium's own hospitality ledger, torn out and for sale", "The gambler cambion at the Soul Pit. It is the party's page. See Session 14, The Deal Arkhan Made."],
        ["20", "A black dragon's tooth, Slarkas's, pulled at the Crypt", "Rassh, free: 'he will come for it, and I want him near my forge.'"]
      ] }
    ]
  },

  // ===================================================================
  // DEN 1: THE SOUL PIT
  // ===================================================================
  "den-soul-pit": {
    title: "The Soul Pit: Three-Dragon Ante (dice)",
    blocks: [
      { t: "read", text: "A ring of iron benches around a pit of warm coins. Nobody sits on the benches; everyone leans. In the middle a well-dressed cambion with three warm coins in one hand deals with the other, and never looks at the pot. The pot is looking at you. Every coin in it is a face." },
      { t: "p", text: "{@b Run by:} Velluc, a cambion dealer (use a {@b cambion}, CR 5, if it ever matters; it will not). Charming, bored, honest about the odds and nothing else. {@b Passive Perception 16}, 21 when a player has just won." },
      { t: "h", text: "The Game (3 to 6 players, 2 minutes a hand)" },
      { t: "steps", items: [
        "{@b Ante} 1 soul coin into the pot (table minimum). Gold is not money here.",
        "{@b Roll} {@dice 3d6} in the open. That is your flight.",
        "{@b Feed the dragon} (optional, once): add 1 SC to the pot and reroll one die.",
        "{@b Highest total takes the pot.} Triples are {@b Tiamat's Flight}: the pot pays double (the house covers it). Any die showing a 1 after the feed is a {@b Tooth}: the house takes 1 SC from your stake before the pot is paid.",
        "{@b Ties} go to the lowest single die ('the wyrmling carries it'). If still tied, the house takes the pot."
      ] },
      { t: "table", caption: "Stakes ladder (the dealer raises the minimum after every third hand)", head: ["Hands", "Minimum ante", "Who sits down"], rows: [
        ["1-3", "1 SC", "Brokers, a warlord's captain, the party."],
        ["4-6", "2 SC", "A Mephistophelian clerk who never loses two in a row."],
        ["7-9", "5 SC", "A devil who stakes a true name instead of a coin: whoever wins the hand may speak it once."],
        ["10+", "'Whatever is in your hand.' Memories, years, scales. Velluc nods to the other dens.", "Only the desperate and the party."]
      ] },
      { t: "h", text: "Cheating" },
      { t: "p", text: "Weighted dice are the custom here; nobody is shocked. {@b Sleight of Hand DC 15} vs Velluc's passive Perception (16, or 21 after a win). Caught: the hand is void, the player is walked to the edge of the wards by two barbed devils, and the party's hospitality debt rises by one (Mahadi hears everything). {@b Insight DC 14} reads Velluc's tell: he taps the pot with a knuckle when the house dice are loaded, which is every third hand." },
      { t: "table", caption: "Volatile (d8): when the pot reaches 5 SC, and after three wins in a row", head: ["d8", "What happens"], rows: [
        ["1", "A coin in the pot screams a name the party knows. If Lulu is aboard she hears it from the ship. {@b Starpath} or Lulu can free it, but the pot is the house's until the hand ends."],
        ["2", "Velluc offers to take a memory instead of a coin from a player who is short. Cross to {@side den-ninefingers|Ninefingers' Table} rules."],
        ["3", "A bone devil sits down and stakes {@b his master's true name}. Whoever wins may say it once, aloud, anywhere. (A DM gift: it is a devil of Zariel's court, and the name is a command word for one of her fortress's gates.)"],
        ["4", "Velluc pulls a marker from the pot: a black obsidian chip. 'To be collected by the holder of the debt.' It is Arkhan's. See Session 14, The Deal Arkhan Made."],
        ["5", "The house changes the rule mid-hand: ones now win. Everybody groans. The players' feed decisions are already made."],
        ["6", "A bounty hunter at the ring matches a face to the Writ of Hunt. He cannot act inside the wards. He goes to tell someone who can."],
        ["7", "A cheat is caught, not the party. The room watches two barbed devils walk him out past the ward line. Over the line, something with wings takes him. Nobody looks up."],
        ["8", "Mahadi matches the pot from the balcony. 'Hospitality.' Whoever wins owes him the courtesy of a conversation: debt +1, and the conversation is about the heads."]
      ] },
      { t: "note", title: "What a soul coin buys here", text: "Nothing but more hands. Velluc will not change coins for gold and will not take a dragon scale. If the party wants the pot's souls freed, they have to win them, and then {@b not spend them}. Moonkite's Starpath or Lulu can light them out afterwards (see their panels)." }
    ]
  },

  // ===================================================================
  // DEN 2: THE DEVIL'S TEETH
  // ===================================================================
  "den-devils-teeth": {
    title: "The Devil's Teeth: two dice and a bite",
    blocks: [
      { t: "read", text: "A pit boss made of thorns and plate hunches over a table of scarred iron. Both his hands are full of dice and his mouth is full of other people's teeth, set in rows where his own should be. 'Sit,' he says. 'Everyone leaves with something. Not always theirs.'" },
      { t: "p", text: "{@b Run by:} Gristle, a barbed devil (CR 5, use the book block) who runs the lowest table on the floor and loves it. Loud, fair, and literal. He never cheats: he does not need to." },
      { t: "h", text: "The Game (1 player vs the house, 30 seconds a hand)" },
      { t: "steps", items: [
        "{@b Stake} at the current rung of the ladder.",
        "{@b Both roll} {@dice 2d6}. Higher total wins the stake.",
        "{@b Doubles beat any non-double.} If both roll doubles, the higher double wins {@b and bites}: the loser pays double.",
        "{@b Three hands make a round.} After every round the ladder climbs one rung, win or lose. A player can stand up between rounds, never during one.",
        "{@b The Tooth} (the house offers it whenever a player has just lost): next hand the player rolls {@dice 3d6} and drops the lowest, but the stake is doubled, and on a loss Gristle takes the stake {@b and a tooth} (1d4 damage, and disadvantage on Persuasion until Burney fixes it, 1 SC)."
      ] },
      { t: "table", caption: "The ladder", head: ["Rung", "Stake", "The room"], rows: [
        ["1", "10 gp", "Gnolls, imps, the party's crew."],
        ["2", "50 gp", "A Hellrider's purse, found."],
        ["3", "250 gp", "Krull sat here two nights ago and lost three rounds. Gristle has a gold scale from him."],
        ["4", "1 SC", "Now the floor is watching."],
        ["5", "5 SC", "A warlord's captain stakes his boots of speed instead."],
        ["6", "A memory or a year", "Gristle sends the player to the hag or the bookmaker: 'I only take teeth.'"]
      ] },
      { t: "table", caption: "Volatile (d8): at rung 4, and after three wins in a row", head: ["d8", "What happens"], rows: [
        ["1", "Gristle bets a tooth of his own: it is a dragon's. Slarkas's, pulled at the Crypt. Win it and the black dragon can be lured by it (he wants it back: his panel, Old Wound)."],
        ["2", "The dice are swapped by a player who is not the party. Gristle notices, says nothing, and bites him at the next double. Blood on the table; the truce hum sharpens."],
        ["3", "The captain across the table recognises Veska. He rode at the Last Hill, on the other side. He wants a hand against her, stakes his captain's chain (a {@item medallion of thoughts|DMG})."],
        ["4", "An imp whispers to a player: 'He always rolls low after a bite. Count.' True: for the next three hands Gristle's total is 2d6 minus 2."],
        ["5", "Someone stakes a map: the Scab's first level, drawn in blood. The winner holds it. Gristle wins it unless the party plays for it."],
        ["6", "A narzugon in full barding stands at the ring and does not bet. He is one of Zariel's three riders, waiting for the bell. He salutes the Hellriders at the table, slowly."],
        ["7", "Gristle offers the party's seat to 'the dragonborn who stood here yesterday.' Arkhan's marker is on the table. It is a bet 'on the debt-holder's behalf': if the party plays it and loses, the debt is called here."],
        ["8", "The whole table goes to the Tooth at once. Every player rolls 3d6 drop lowest against Gristle's 2d6. The losers lose a tooth each. Gristle laughs for a full minute."]
      ] },
      { t: "note", title: "Why it is here", text: "A fast, loud, safe-looking game that gets the players rolling and the floor watching them. It seeds Krull's visit, the narzugon rider, the Scab map and Arkhan's marker without anybody asking around." }
    ]
  },

  // ===================================================================
  // DEN 3: NINEFINGERS' TABLE
  // ===================================================================
  "den-ninefingers": {
    title: "Ninefingers' Table: Memory Faro",
    blocks: [
      { t: "read", text: "A curtained booth lit by one candle that does not flicker. The woman behind the table has nine fingers and a soul bag the size of a child. She deals cards with faces on them. Some of the faces are yours. 'You can only lose what you brought,' she says. 'Sit. Tell me about your mother.'" },
      { t: "p", text: "{@b Run by:} Sister Ninefingers, a night hag (CR 5, book block) with a heartstone under her tongue. She is not under Mahadi's truce by choice; she is under it because her coven sold her here. She hates the Emporium and loves the table. {@b Insight DC 16:} she wants a memory of {@b Lulu's} more than anything on the floor, and will cheat to get one." },
      { t: "h", text: "The Game (1 player vs the hag, 1 minute a hand)" },
      { t: "steps", items: [
        "{@b Stake a memory} from the ladder below. Say it aloud: that is the ante. The hag writes it on a card.",
        "{@b The hag turns a card.} The player calls {@b high} or {@b low}. Then both roll {@dice 1d20}; the player wins if their die matches the call against the hag's (higher if 'high', lower if 'low'). Ties go to the house.",
        "{@b Win:} the stake stays yours and you draw a card from the bag: roll on {@b What You Remember That Isn't Yours}.",
        "{@b Lose:} the memory goes into the bag. Roll on {@b What You Forget} to see what the hole feels like. {@c kreeg|Kreeg's Ledger} can read it back, one line per day. So can the hag, for a bigger memory."
      ] },
      { t: "table", caption: "The stakes ladder", head: ["Rung", "Memory staked", "Mechanical weight if lost"], rows: [
        ["1", "A face, a day, a meal.", "None. A story beat."],
        ["2", "A skill: how to do something.", "Lose proficiency in one skill or tool for a week."],
        ["3", "A name: a companion's.", "For a day you cannot say or hear that ally's name; their aid to you (Help, healing) needs a DC 12 check to land."],
        ["4", "A person: someone you love.", "Disadvantage on Wisdom saves for a week; the person is a stranger until bought back."],
        ["5", "A god, an oath, a sigil.", "Drenwal only: a sigil's powers are offline until re-consecrated. The hag will not say which."]
      ] },
      { t: "table", caption: "What You Remember That Isn't Yours (d8, on a win)", head: ["d8", "The card", "Use"], rows: [
        ["1", "A gnoll's last hour in the Scab: the mouth, the gate, the pack-lord's name.", "Advantage on the first Survival or Stealth check in the Scab."],
        ["2", "Yael's last day, from the gate guard who watched her leave her post.", "You know the Bleeding Citadel's doors open for the pure of heart, and that Yael forgives the vote."],
        ["3", "Kreeg's hand signing Elturel's contract. You remember the clause the devils skip over.", "A living signer or a true copy can unsign it. See Kreeg's panel."],
        ["4", "A Stygian Dock clerk's fuel count.", "You know the day the flying fortress flies again."],
        ["5", "Rigorath's rota: the hour the Mirror's escort changes.", "Arrive quiet in that hour and the escort is two ice devils, not four."],
        ["6", "A dragon's memory: a wyrmling called Praxamor, hatching.", "Flash's true name, if the party did not already have it. Or'Henn: Pull +1 for holding it."],
        ["7", "The password to a side gate of Zariel's flying fortress, from a bone devil who gambled it away.", "Finale lever."],
        ["8", "Senna's street, in a city you have never seen.", "Drenwal only. He knows where his sister sleeps. Dumal knows too."]
      ] },
      { t: "table", caption: "What You Forget (d8, on a loss, in addition to the rung)", head: ["d8", "The hole"], rows: [
        ["1", "The taste of something. You will not notice for days."],
        ["2", "A road you walked in Elturel. The map in your head has a gap."],
        ["3", "Why you came to Avernus. For a day you need an ally to tell you, each morning."],
        ["4", "The sound of the ward hum. For an hour the truce feels like a trick."],
        ["5", "One spell (caster's choice), until the next long rest."],
        ["6", "The face of the last person you killed. Drenwal: Bhaal's Claim -2 (Bhaal hates that)."],
        ["7", "A promise you made. The DM picks which. It is still binding."],
        ["8", "The hag takes nothing. She keeps the card and smiles: 'Later.'"]
      ] },
      { t: "table", caption: "Volatile (d8): at rung 3, and after three wins in a row", head: ["d8", "What happens"], rows: [
        ["1", "The hag turns a card with {@b Lulu's} face on it. It is one of Lulu's lost memories. She will play for it only against a memory of Lulu's from the party."],
        ["2", "She offers to play for {@b a sigil}: if Drenwal stakes the Binding, she stakes 'the words of the third.' A lie. The words are Bhaal's and she does not have them."],
        ["3", "A card in her bag is Kreeg's. If the party holds his Ledger, it hums. She will sell it for a memory of the Styx."],
        ["4", "The booth's candle goes out. In the dark she says one true thing about the person across the table, for free, and it is the worst one."],
        ["5", "Or'Henn's turn: she turns a card with five heads on it. 'She is dreaming of you.' Pull save, DC 10 + Pull."],
        ["6", "A Mephistophelian clerk buys the hag's last three cards unseen. One was the party's. Now the Mirror knows it."],
        ["7", "She cheats, visibly (Perception DC 18 to catch the second die). Caught: she gives the hand back and a card as apology: roll on the win table."],
        ["8", "She asks for Aurora's patron's name as a stake. If Aurora says it, the candle burns blue and {@c moonkite|Moonkite} screams from the ship."]
      ] }
    ]
  },

  // ===================================================================
  // DEN 4: THE HOURGLASS
  // ===================================================================
  "den-hourglass": {
    title: "The Hourglass: Sand",
    blocks: [
      { t: "read", text: "A tall glass of black sand on a bone stand, and a bone devil in a clerk's coat beside it with a ledger and a smile that goes up at the corners like a hook. 'Years,' he says, before anyone asks. 'Everybody has some. Most people waste them. Here you can at least lose them on purpose.'" },
      { t: "p", text: "{@b Run by:} the Timekeeper, a bone devil (CR 9, book block) who used to count souls at the Stygian Dock and took the Emporium job after the raid. He knows the party by sight. He is scrupulous: every year is written down, and he will tell a player the exact day of their death if they ask (a true date, in the DM's hands: foreshadow freely)." },
      { t: "h", text: "The Game (1 player vs the glass, 20 seconds a round)" },
      { t: "steps", items: [
        "{@b Name a number} from 1 to 6. It is yours for the whole game.",
        "{@b Each round} stake 1 year of your life and roll {@dice 1d6}. Your number: {@b win 5 years} (the house pays in its own sand). Any other: the year runs out of the glass.",
        "{@b Stop whenever you like} between rounds. The Timekeeper never stops you and never encourages you.",
        "{@b Years lost} are real: you age. 1-4 years: a grey hair, nothing more. 5-9: -1 to your maximum hit points per year beyond 4. 10+: -1 Constitution and the Timekeeper writes your new death-day. Burney's {@spell greater restoration} undoes 5 years for 5 SC.",
        "{@b Years won} are banked in the glass under your name. Spend a banked year for: +1d10 maximum hit points (permanent), one failed death save erased, or a year off the Hourglass's answer to 'when do I die.'"
      ] },
      { t: "table", caption: "Volatile (d8): at 5 years staked in one sitting, and after three wins in a row", head: ["d8", "What happens"], rows: [
        ["1", "'A decade for a question.' Stake 10 years, win or lose, and the Timekeeper answers one question from the {@side emporium-information-market|information market} at the dangerous-truth tier, free."],
        ["2", "The sand runs {@b up}. For one round the odds flip: any number but yours wins. The Timekeeper looks at the glass as if it has insulted him."],
        ["3", "A dragon's year is in the glass: Vistalancer's, sold by Krull. Win it and Or'Henn can give it to {@c uldrak|Uldrak}, or drink it (Pull +2, and a blue dragon's cold resistance for a year)."],
        ["4", "The Timekeeper mentions, writing, that a tall dragonborn asked for the party's death-days yesterday. He sold them. 'Years are my business. Days are a side line.'"],
        ["5", "Or'Henn's number comes up five times in a row. The Timekeeper stops the game. 'That was not the glass. Someone is watching your luck.' Pull +1."],
        ["6", "A narzugon stakes a century. He loses it in one round and does not care. Immortals come here to feel something."],
        ["7", "The glass cracks. Black sand on the floor: 2d10 years, nobody's. First to pick them up banks them, and everyone at the table saw."],
        ["8", "The Timekeeper offers to {@b buy} years from the party instead: 1 SC per year, up to 10. The soul coins are warm. One of them is Kreeg's clerk."]
      ] },
      { t: "note", title: "For the DM", text: "This is the den that scares players, because the stake is written in their own hand on the sheet. Let them stop. The point is the death-day: a bone devil who knows exactly when Drenwal dies is a wonderful thing to have on the floor the night before the third sigil." }
    ]
  },

  // ===================================================================
  // INFORMATION MARKET
  // ===================================================================
  "emporium-information-market": {
    title: "The Information Market (Session 14 stage)",
    blocks: [
      { t: "p", text: "Who sells what tonight, at what price, and what the {@b true answer} is. The mechanics are the book's tiers (see {@side emporium-mahadi|Mahadi} and {@side emporium-bone-devil-informant|the Bone Devil Informant}): a rumour for coin, a real answer for a DC 16 Persuasion check (a soul coin held gives advantage), a confirmed lead for a coin spent, a dangerous truth for DC 18 and blood. A fail by 5 feeds the {@b bent} version." },
      { t: "table", caption: "The sellers", head: ["Seller", "Sells", "Will not sell"], rows: [
        ["{@c mahadi|Mahadi}", "Anything that is not his own business. Dangerous-truth tier: archdevil business.", "The terms of a deal he is party to. He will confirm {@i that} a deal exists, for the price of listening to his offer on the heads."],
        ["The bone devil informant", "Who was here yesterday and what they bought. The Mirror's escort rota. Zariel's riders' orders.", "Anything about Mephistopheles (he is afraid of the ice)."],
        ["Velluc (Soul Pit)", "Gossip from the ring, for a hand of cards.", "Nothing, if you win."],
        ["Sister Ninefingers", "Memories, which are answers nobody can bend.", "Anything free."],
        ["The Timekeeper", "Death-days. One question at the dangerous tier for ten years.", "Nothing. Years are the only price."],
        ["{@c rigorath|Rigorath} (at the Mirror)", "Archdevil-grade truth, aimed at Zariel. Blood Pay or five soul coins per answer.", "Nothing. Everything is for sale at the Mirror, including the people asking."]
      ] },
      { t: "table", caption: "Questions the party is likely to ask", head: ["Question", "Who knows", "Tier", "True answer", "Bent answer (fail by 5)"], rows: [
        ["What did Arkhan buy from Mahadi?", "The informant; Velluc; Z'neth", "Real answer", "Three things: the party's hospitality debt, first refusal on the dragon heads, and the bell (see Session 14, The Deal Arkhan Made).", "'He bought the wards. He can walk in and kill you.' (False: nothing can buy that.)"],
        ["Where is Arkhan now?", "The informant; the Timekeeper", "Real answer", "In the clouds above the Styx with Krull on Obatala and Slarkas. Vermilius holds the ice road to the Mirror. He is waiting for the bell.", "'Gone north to the Scab.'"],
        ["What about the dragons we killed?", "Mahadi; Velluc", "Rumour", "He wants the heads for Tiamat's shrine and he wants nobody else to have them. He will pay anything but the thing he came for.", "'He wants to raise them.' (He cannot. Not from heads.)"],
        ["Zariel's flying fortress?", "The informant; Z'neth's drowned clerk", "Confirmed lead", "Crippled by the Dock raid; towed to the Basalt Citadel; flies again in 1d4 days (roll now, tell the party the number as 'the clerk's count').", "'It flies tonight.'"],
        ["Where is Lulu?", "The informant; the Mirror", "Dangerous truth", "If Zariel's riders took her (the default): in the Basalt Citadel, silenced, not harmed. Zariel wants her close and quiet. If she is aboard: 'with you, and every devil on this floor knows it.'", "'Dead.'"],
        ["Kreeg?", "Fhet'Ahla; the hag's cards", "Real answer", "DM's ruling from the Throat. If he fled through the Escape Clause: in the Ledger's Due's hold, a day behind, out of favour with Zariel and looking for a new master. If he signed: the signature is the lever. If dead: the Ledger is the slower path.", "'Zariel forgave him.'"],
        ["Elturel: how long?", "Mahadi; the Mirror", "Dangerous truth", "The DM's number (Decisions to Lock). Mahadi gives it in days and charges for each one.", "A number ten days too generous."],
        ["The Bleeding Citadel?", "Z'neth's Hellrider; the hag", "Confirmed lead", "It shows itself every 33 days. The shard opens its doors. They open for the ones who stayed at their post, which is why Zariel cannot enter.", "'Zariel is inside it.'"],
        ["The Scab?", "The informant; Gristle's map", "Real answer", "The Blood War's front. Demons dig toward the Citadel under it; Trantolox commands; something old is chained on the third level (Crokek'toeck). Zariel's legion patrols outside, and she watches from the west.", "'Empty since the Hellriders.'"],
        ["Dumal?", "Z'neth's recruiter; the informant", "Confirmed lead", "At the Mirror, pledged to Cania. 'The Champion sleeps in the glass.' Mephistopheles has promised him the Slayer, and something worse after.", "'He died on the ice.'"],
        ["Who is the elf with the thorns?", "Velluc; the informant", "Real answer", "Maelys the Thorn-Crowned. A Bhaalspawn. Glasya's. She came in two nights ago with an erinyes and asked after 'the brothers'. She has not gambled, drunk or slept.", "'A druid of Or'Henn's circle.'"],
        ["Senna?", "Dumal; the hag (card 8)", "Dangerous truth", "Issa's house, a street Drenwal has never seen. Dumal has known for two years.", "'In Elturel.'"],
        ["Can Or'Henn's curse be moved?", "Mahadi; the Mirror", "Dangerous truth", "Only into a dragon that takes it willingly. Obatala would, if Krull told him to. That is Arkhan's other way.", "'Any dragon's blood ends it.'"],
        ["The Writ of Hunt?", "Anyone", "Rumour", "Zariel's bounty on the ship and crew, posted today: 100 soul coins for the ship, 20 a head, 50 for the druid alive. Mahadi is neutral. The hunters at the ring are not.", "As true: the amounts are public."],
        ["The three riders?", "The informant; Gristle", "Rumour", "Three narzugons on nightmares at the jetty, Zariel's. They cannot act in the wards. They are waiting for the bell, like Arkhan.", "'They are Bel's.'"]
      ] },
      { t: "note", title: "Mahadi and the deal", text: "Mahadi is a party to Arkhan's contract and will not break it; a rakshasa under Asmodeus's seal does not. He {@b will} tell the party, over the sanctuary rest he refuses payment for, that 'a gentleman has an interest in your debt' and that he would be delighted to sell the party their own debt back. That is the door into the puzzle." }
    ]
  },

  // ===================================================================
  // RUMOURS
  // ===================================================================
  "emporium-rumours": {
    title: "Rumours on the Floor (d12, three false)",
    blocks: [
      { t: "p", text: "Free from Burney with a shave, from Velluc for a hand, from any drunk for a drink. Roll {@dice 1d12} or pick. {@b False} rumours are marked for the DM; the floor believes all of them." },
      { t: "table", caption: "d12", head: ["d12", "Rumour", "Truth"], rows: [
        ["1", "'The Dock burned. Hundreds of souls went up in a column of light. Zariel's fortress is grounded.'", "True. The party did it."],
        ["2", "'A dragonborn in black plate drank with Mahadi till the small hours. He never used his left hand.'", "True. Arkhan, yesterday."],
        ["3", "'The Champion of the Mirror is a man, not a devil. He walks out of the glass when Rigorath calls him.'", "True. Dumal."],
        ["4", "'The elf with the thorns killed a whole village's animals before she came here. Her erinyes carried the heads.'", "True in spirit. Maelys's calling card, on the Material Plane."],
        ["5", "'Mahadi is selling the Emporium's next stop to the highest bidder. Tiamat's monument won.'", "True. The bell."],
        ["6", "'Three riders at the jetty are Bel's, come to buy the ship.'", "FALSE. Zariel's narzugons."],
        ["7", "'The hag has a hollyphant's memory in her bag.'", "True. One of Lulu's."],
        ["8", "'Kreeg is dead and his Ledger with him.'", "FALSE unless the DM rules he died at the Throat. The Ledger was in his cabin."],
        ["9", "'The Scab opens on the night the Citadel shows itself. Thirty-three days.'", "True."],
        ["10", "'Mephistopheles will sell you a rebirth. People go in the glass and come out clean.'", "Half true. They come out his. Drenwal should hear this one."],
        ["11", "'The green dragon can look like a woman. She was at the Soul Pit last night.'", "FALSE. Vermilius was not here; a cambion's story. But Vermilius does hold the ice road."],
        ["12", "'The bookmaker knows the day you die, and he sold the party's days to the dragonborn.'", "True. See the Hourglass, Volatile 4."]
      ] }
    ]
  }
});
