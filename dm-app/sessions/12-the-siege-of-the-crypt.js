// Session 12: the siege of the Crypt of the Hellriders. Resumes the Session 11 fight (ghosts and wraiths from the soul urns), then the Trials of the Pure,
// the Archive, Arkhan at the door, the Ways Out, and Zariel's first notice. Not a fight to win: the party is safe inside and trapped.
// Arkhan, the four tower dragons, Obatala and Krull come from campaign-tower.js (ids: skarrix = Slarkas, vhennic = Vistalancer, mirelle = Vermilius, praxamor = Flash).
// Olanthius, Veska, Ser Lucan, the ghosts, the wraiths and arc-drenwal come from campaign-hellriders.js. This file overrides only tactics (and castLines for Arkhan).
window.SESSION = {
  id: "12-the-siege-of-the-crypt",
  title: "The Siege of the Crypt",
  subtitle: "Session 12 · Descent into Avernus",
  summary: "Drenwal's knock carried fifty miles, and now Arkhan, four tower dragons, Obatala and Krull wait outside the Crypt of the Hellriders. Nothing evil can come in, but the ward is cracked and weakens with every hour. Inside, three soul urns have cracked open, and each holds a company of the First Charge and a hard choice the Hellriders once had to make. The Crypt offers its rewards only to the pure of heart, and Drenwal begins to remember the generals who once leashed his blood. The vial of Tiamat's blood is spent (it raised Uldrak), so Or'Henn's curse is Arkhan's last road to his queen. He wants the party dead, Or'Henn alive as a hostage, and Drenwal made to call a gold dragon for Or'Henn to beg. There are seven ways out. Only one of them is a trap, and it is the kindest.",

  party: [
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 13. Sigil of the Binding (Tier II). Carries the Shield of the Hidden Lord." },
    { id: "aurora", name: "Aurora", note: "Archfey Warlock 13. Rides Moonkite. Moonkite Bond 1 (2 points)." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 13. Tiamat's curse: 0 gold scales. Carries the Soul Capacitor." }
  ],

  allies: [
    { id: "veska", name: "Veska", note: "Hellrider sergeant. Knows the watchword." },
    { id: "ser-lucan", name: "Ser Lucan the Reforged", note: "ally" },
    { id: "moonkite", name: "Moonkite", note: "Celestial mount. Bond 1." },
    { id: "olanthius", name: "Olanthius", note: "Death knight. Kneels in C5, the east hall." },
    { id: "lulu", name: "Lulu", note: "NOT here. On the Lady Vengeance, hidden in the mists." },
    { id: "jeremy", name: "Jeremy", note: "On the Lady Vengeance with Colico Jack." },
    { id: "lady-vengeance", name: "Lady Vengeance (Colico Jack)", note: "Hidden in the mists. AC 17 · HP 350 · DT 15" },
    { id: "uldrak", name: "Uldrak", note: "Not here. His promise: call him and he will hear." }
  ],

  creatures: {

    "arkhan-the-cruel": Object.assign({}, window.CAMPAIGN.creatures["arkhan-the-cruel"], {
      castLines: [
        { spell: "Vecna's Grip", line: "He does not raise the black hand. He closes it, slowly, around nothing, and something across the yard closes around you." },
        { spell: "Branding Smite", line: "Fane-Eater lights from the inside, the colour of an old sunrise, and the air near it sweetens like a church." },
        { spell: "Geas", line: "\"Walk with me,\" he says, \"and be glad of it.\" The words sit in your head like a nail someone has politely hammered in." },
        { spell: "Revivify", line: "A cold thumb on a dead brow. \"Not yet,\" says Arkhan, to the corpse, as if it had asked to leave." },
        { spell: "Teleport (Hand of Vecna)", line: "He bows to the doorway, all courtesy, and is simply not on the ridge any more." }
      ],
      tactics: [
        "Session 12. He cannot cross the cold line at the top of the 40-foot stair, and he does not try. He stands there, patient, and talks down the stairwell to the C1 gates. He is the siege.",
        "The vial of Tiamat's blood is spent: the party poured it into Uldrak. Or'Henn's curse is his last road to his queen. He wants the party dead, except two: Or'Henn alive as a hostage, and Drenwal alive to cast.",
        "His plan: take Or'Henn, Geas Drenwal into calling a gold dragon, and hold Fane-Eater at Or'Henn's throat until Or'Henn asks that dragon for help. The curse jumps and Tiamat wakes. See Arkhan's Plan in {@scene wings-at-the-door|Wings at the Door}.",
        "He keeps his word to the letter and never lies. The orb no longer buys anything from him. His one offer: \"Send me the druid and the priest, and the rest of you walk.\"",
        "He does not fight at the door. If the ward falls (6 of 6), he walks in with Krull and goes for Or'Henn, not the kill: Vecna's Grip, a grapple, then back up the stair. The fight is {@scene the-breakout|The Breakout}. It is not a fight to win: the exits are the win.",
        "If Uldrak appears, Arkhan bows to him, withdraws and does not fight. Tiamat has not given him leave."
      ]
    }),

    "skarrix": Object.assign({}, window.CAMPAIGN.creatures.skarrix, {
      tactics: [
        "Session 12. Slarkas (black) squats low on the west ash ridge, half sunk in a slurry of ash and his own acid, like a black dragon in a swamp. Sullen. He wants a fight and has been told no. The ward makes his old wound ache.",
        "If a PC steps over the cold line, he spits acid at the line itself to see who flinches.",
        "{@b Lure:} a Hellrider banner ({@c veska|Veska's}) in the doorway makes him break orders and charge it. That pulls him away from his post for 2 rounds: an opening for a way out.",
        "{@b Weakness:} radiant damage (Old Wound). The Sun Blade from the Urn Hoard, if they took it, hurts him more than anything else the party has.",
        "In a fight he bites first (Slow Melt), then stays on the one who is scraping acid off. Retreats below 60 hit points.",
        "As a group of one, he does not share an initiative; if two dragons attack together, they do."
      ]
    }),

    "vhennic": Object.assign({}, window.CAMPAIGN.creatures.vhennic, {
      tactics: [
        "Session 12. Vistalancer (blue) circles high and fast, tasting the ward with lightning. He is the one who reports to Arkhan.",
        "Strafes anyone who leaves the doorway with a Lance Dive, then climbs out of reach. He will chase a flying PC (Moonkite) for a mile.",
        "{@b Turn him:} he is Arkhan's ears and the easiest to peel off. Show him the odds (DC 18 Persuasion or Intimidation, advantage right after another dragon is hurt, or for sapphires). A turned Vistalancer \"misreports\" to Arkhan, which buys the party one ward segment.",
        "{@b Feed him lies:} whatever is said where he can hear reaches Arkhan next round.",
        "Leaves at half hit points (Clean Exit). If the orb moves, he follows it by the most direct route, but at a distance."
      ]
    }),

    "mirelle": Object.assign({}, window.CAMPAIGN.creatures.mirelle, {
      tactics: [
        "Session 12. Vermilius (green) sits nearest the cold line, wings folded, head tilted. She is the kindest voice outside.",
        "She never attacks first. She talks to Or'Henn, and only to him, in a low and gentle Draconic. To him she tells only the truth. That is the trap.",
        "{@b Honeyed Voice} is her opening move on anyone who steps out: it walks them toward her, not toward the others. Or'Henn saves at disadvantage.",
        "{@b Tell:} her green smoke curls when she tells the truth and stops when she lies. Let a player notice it.",
        "If the ward falls or the party breaks out, she is the last to commit. Poisoned politeness: breath weapon only at someone who has hit her first.",
        "She stays within 30 ft. of Arkhan whenever he is on the field: she is his vessel, and she knows it.",
        "Retreats below 60 hit points."
      ]
    }),

    "praxamor": Object.assign({}, window.CAMPAIGN.creatures.praxamor, {
      tactics: [
        "Session 12. Flash (red) perches on the Crypt's roof ridge and cannot enter. He is the proudest and the first to snap.",
        "Frightful Presence on anyone who looks up. Fire breath at the doorway if a PC steps out. He cannot hit the inside while the ward holds.",
        "{@b Bait him:} call him small, young or a hatchling and he attacks that PC alone, at once, before the others are ready (Prove It). Arkhan then has to spend Command the Line to call him back. That splits the siege.",
        "{@b His name:} a PC who calls him Praxamor gets one round of his attention. He has never been asked anything.",
        "Below half hit points he overheats and breathes more often. Retreats below 60 hit points, screaming, and is the first to come back."
      ]
    }),

    "obatala": Object.assign({}, window.CAMPAIGN.creatures.obatala, {
      tactics: [
        "Session 12. Obatala waits on the north hill with Krull on his back. He does not move unless Krull clicks his tongue.",
        "Cold breath at anything that crosses the line toward Krull. He is slow but he does not forget.",
        "Rider's Wing: attacks on Krull hit Obatala instead. Where he lands, the ground turns to steaming mud (Rimeground).",
        "{@b Turn Krull, turn him:} he goes wherever Krull goes (exit D, Krull's double-cross). He cannot be turned on his own.",
        "If the party flees, he is the one who follows, but he follows slowly."
      ]
    }),

    "krull": Object.assign({}, window.CAMPAIGN.creatures.krull, {
      tactics: [
        "Session 12. He rides Obatala and stays out of the line of fire. He prays, and he counts the minutes on the ward.",
        "He is the double-cross: he covets Arkhan's place, and a clever party can sell him what he wants. See {@scene the-ways-out|The Ways Out}, D.",
        "If Arkhan mocks him in front of the dragons, he notices. Only once, either way.",
        "If the ward falls, he enters behind Arkhan and casts blade barrier across the party's escape route, never at their feet."
      ]
    })
  },

  scenes: [

    // =====================================================================
    // ADVENTURE PRIMER
    // =====================================================================
    {
      id: "adventure-primer",
      title: "Adventure Primer",
      when: "",
      duration: "10 minutes",
      blocks: [
        { t: "p", text: "Session 11 ended mid-fight in the Crypt of the Hellriders. Drenwal cast {@spell knock} on the warded gates, and the knock carried fifty miles. Arkhan's whole household was arriving as the party went in, and they shut the door behind them. Inside, they spoke to Olanthius and got the Sword's missing shard and the road to the Scab. Arkhan and his dragons wait outside because nothing evil can enter. The party cannot leave without them noticing, and the ward over the door is cracked. This session is a siege, not a fight to win." },

        { t: "h", text: "At a Glance" },
        { t: "list", items: [
          "{@b 2 · DM Context (5 min).} The clocks, who moves tonight, and what the party does not know yet. Read it before the table sits down.",
          "{@b 3 · The Urns of the Unquiet (45-60 min).} Finish the fight, which grows: three great urns in C2g, three waves, each with a Hellrider's hard choice (the first urn's wraiths, then the lance wraiths, then Marshal Dunmere, the Last Banner). Nine souls to lay to rest.",
          "{@b 4 · The Trials of the Pure (45 min).} Three puzzles set the loot tier. Drenwal's first memory.",
          "{@b 5 · The Hellrider Archive (30 min).} Olanthius's journal and the annals. A DC ladder of what they learn.",
          "{@b 6 · Wings at the Door (30 min).} Arkhan's plan (a hostage and a gold dragon), the dragons, the ward clock, Vermilius's kindness.",
          "{@b 7 · The Ways Out (40 min).} Seven exits, each with a cost. They only need one.",
          "{@b 8 · The Breakout (optional).} Only if they fight. {@b 9 · Bhaal's First Gasp.} {@b 10 · Zariel Notices,} and the news that Lulu is gone."
        ] },

        { t: "h", text: "What Happened Last Time" },
        { t: "p", text: "Read this to the players. They have had a long break." },
        { t: "read", text: "You came to the Crypt of the Hellriders because a death knight had the answer you needed. Drenwal knocked at its gates with a spell, and the knock rolled out across the waste for fifty miles. Arkhan the Cruel heard it. His wings were coming over the ridge as you went in, with his four dragons, and Obatala, and old Krull on his back. You shut the door behind you. They stand outside, because nothing evil may enter here.\n\nBelow, Olanthius knelt at an open coffin and tested you, and when he was done he gave you a shard of the Sword of Zariel and the road to the Scab. He said one more thing: the pure of heart may brave the dangers of this crypt to receive rewards.\n\nIn the hall of urns the souls swirled and bubbled. The loot lay under them. You reached for it, and the urns cracked open." },

        { t: "note", title: "House Rule: Groups", text: "A group of identical monsters shares {@b one initiative} and makes {@b one collective saving throw} (one d20 for the whole group). Hit points stay individual. The tracker does this for you: set up the encounter and each group has one initiative row and a Group save control. Used here for each urn's wraiths, specters and banner guards." },

        { t: "h", text: "Check Before You Start" },
        { t: "list", items: [
          "{@b Who is present?} Drenwal, Aurora, Or'Henn, plus Moonkite, Veska and Ser Lucan. {@b Lulu is not here.} She is on the Lady Vengeance, hidden in the mists, with Jeremy and Colico Jack.",
          "{@b Where they stand.} In C2g, the long south-east chamber, mid-fight over the first urn. The secret door to C6e is in its east wall. They have already seen C5 (the Kneeling Knight) and C7 (the Archive). See the room key below.",
          "{@b The vial is spent.} The party poured Tiamat's blood into Uldrak in Session 10. Arkhan knows, and it is why he now wants them dead.",
          "{@b Or'Henn is at 0 gold scales.} The curse is live. In the Crypt Tiamat is quiet, but the quiet thins as the ward weakens.",
          "{@b The orb.} The party holds the Orb of Dragonkind, and Arkhan can feel it. Who holds it, and whether they passed the attunement, is whatever Session 10 left.",
          "{@b Moonkite's Bond is 1} (2 points). Never tracked before. Keep it on Aurora's sheet.",
          "{@b The Crypt's ward is at 0 of 6.} See {@scene wings-at-the-door|Wings at the Door} for what ticks it.",
          "{@b Souls laid to rest: 0 of 9.} Keep this count visible. It feeds the Roll of the Charge and the Last Ride.",
          "The wider world is in {@side world-state|The World Right Now}. Arkhan, Zariel and the Soul Council all have a move this week."
        ] },

        { t: "h", text: "The Crypt: Room Key" },
        { t: "p", text: "The letters on the Crypt map (map 3.3), as this session uses them. Every scene names its room. Every C2 chamber is carved floor to ceiling with the names of the First Charge." },
        { t: "table", caption: "Crypt of the Hellriders", head: ["Room", "Where on the map", "In Session 12"], rows: [
          ["C1", "Top", "The stair and the gates. Arkhan stands at the top of the 40-foot stair, at the cold line. Scene: Wings at the Door."],
          ["C2a", "North-west", "Trial (c), the Generals' Seats."],
          ["C2b", "North-east", "Funerary chamber. Names on every wall."],
          ["C2c", "Centre", "The Crimson Watch alcove."],
          ["C2d", "West", "Funerary chamber. Names on every wall."],
          ["C2e", "South-west, the tall one", "Trial (b), the Scales of Mercy."],
          ["C2f", "South, the slanted one", "Trial (a), the Roll of the Charge."],
          ["C2g", "South-east, the long one", "The three urns. {@b The party is here.} Scene: The Urns of the Unquiet."],
          ["C3a, C3b, C3c", "North; west upper; west lower", "Prayer niches. Each niche holds a name that is also on the walls."],
          ["C4", "Centre-right", "The Mist Well."],
          ["C5", "The east hall", "The Kneeling Knight: Olanthius. Already seen."],
          ["C6w", "West, behind a secret door", "The Last Arms."],
          ["C6e", "East of C2g, behind a secret door", "The Ones Who Ran: eight mummies and Captain Aldous Varn. Run it from Session 11's notes."],
          ["C7", "North of C5", "The Archive: a shelf of annals and Olanthius's journal on the desk. Already seen. Scene: The Hellrider Archive."]
        ] },
        { t: "note", title: "Assumption: Which C6", text: "The party is \"in C2, right next to C6\". This page assumes the east C6 (C6e), which shares a wall with C2g. If you meant the west C6, the urn fight is in the C2 room beside it, and nothing else changes." },

        { t: "more", title: "Why the ward can crack at all (and why nothing evil can enter)", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Plain version:} the DM warded the door, so the knock was louder than a knock should be. The Crypt is a piece of Elturel that fell into Avernus whole, and its cold is grief that refuses to burn. Evil stops at the line. The crack means the ward is tired, not broken, and it weakens as a clock." },
          { t: "p", text: "{@b Why this link exists:} so the party is safe enough to think and trapped enough that thinking has a deadline. It keeps the session from being either a boring wait or a lost fight." }
        ] }
      ]
    },

    // =====================================================================
    // DM CONTEXT: THE WORLD THIS WEEK
    // =====================================================================
    {
      id: "dm-context",
      title: "DM Context: The World This Week",
      when: "",
      duration: "5 minutes, before the table sits down",
      blocks: [
        { t: "p", text: "What every power in Avernus is doing while the party is shut in the Crypt, and where each one can touch tonight's session. Full detail is in {@side world-state|The World Right Now}. Anything marked {@b DM to confirm} is a proposal." },

        { t: "h", text: "The Clocks" },
        { t: "table", caption: "Where every clock stands when Session 12 opens", head: ["Clock", "Now", "What happens next"], rows: [
          ["The Crypt's ward", "0 of 6", "At 6, evil can enter and Arkhan walks in. The ticks are in Wings at the Door."],
          ["Avernus day count", "Day 12 ({@b DM to confirm})", "The Bleeding Citadel's window opens about Day 17."],
          ["Dumal's Ascension", "4 of 6 ({@b DM to confirm})", "Segment 5 gives one session's warning before his siege. Beat 4, The Sister at the Door, is live."],
          ["Or'Henn's curse", "0 gold scales", "If a dragon takes it from him, Tiamat wakes in her true form."],
          ["Feonor's geas", "Day 6 of 30", "It lapses on Day 36. She delivered Cinderbloom and is a bought-off frenemy now."],
          ["The Soul Council's week", "Lapsed on paper", "Decide what they did. The simplest answer: they extended it, for a price."]
        ] },

        { t: "h", text: "Who Moves Tonight" },
        { t: "list", items: [
          "{@b Arkhan the Cruel.} The vial of Tiamat's blood is gone: the party poured it into Uldrak. The curse in Or'Henn is his last road to his queen. He waits at the top of the Crypt stair with four dragons, Obatala and Krull. He wants the party dead, Or'Henn alive as a hostage, and Drenwal made to call a gold dragon. Tonight: {@scene wings-at-the-door|Wings at the Door}.",
          "{@b Tiamat.} Quiet inside the Crypt, loud outside it. Vermilius speaks for her at the door. She never lies to Or'Henn; she only makes asking feel kind. Tonight: a Small Vision at ward 3, and her voice at ward 5. See {@side arc-tiamat|Arc: Or'Henn and Tiamat}.",
          "{@b Zariel.} Her riders comb the Scab road for the shard and ask after a white shape on a hidden ship. Tonight she is felt, not seen: a banner, a writ, and Lulu taken from the Lady Vengeance (the recommended default). Tonight: {@scene zariel-notices|Zariel Notices}. See {@side zariel|Playing Zariel}.",
          "{@b Krull.} He counts the ward's minutes and covets Arkhan's place. He is a double-cross waiting for a buyer. Tonight: exit D in {@scene the-ways-out|The Ways Out}.",
          "{@b Mephistopheles.} He collects. His envoy is on the road with terms for the Shield of the Hidden Lord, and Dumal's lien makes Dumal his. Tonight, only if you want a third party: the envoy waits at the foot of the Crypt hill once the dragons leave. Stats: {@c ice-devil-agent|Cania's Envoy}.",
          "{@b Dumal.} Camped by the Mirror of Mephistar with a host Cania loaned him. He scries Drenwal through their shared blood. Tonight: nothing, unless the party acts against him. If nobody does, his clock ticks at the end of the session. See {@side arc-dumal|Arc: Drenwal and Dumal}.",
          "{@b Uldrak.} Restored by Tiamat's blood. He promised to come when called. Tonight: exit C, and it spends his endgame promise.",
          "{@b Bel.} At his forge, counting who crosses the Scab. Not tonight. The party's road runs toward him next.",
          "{@b Mahadi's Wandering Emporium.} At Ash Ford, a day from the Crypt hill, selling to the dragons' camp. It is the party's first shop after the siege."
        ] },

        { t: "h", text: "What the Party Does Not Know Yet" },
        { t: "list", items: [
          "That the riders in the urns are the First Charge. The clues are in {@scene the-urns-of-the-unquiet|The Urns of the Unquiet}.",
          "Why Arkhan wants Drenwal alive. A DC 18 Insight check at the door finds it.",
          "That the ward is a clock. They can feel it in their teeth with a DC 15 Arcana check.",
          "That Lulu is about to be taken. Jeremy's message ends the session."
        ] },

        { t: "more", title: "Where this page comes from", src: ["Homebrew"], blocks: [
          { t: "p", text: "Built from {@side world-state|The World Right Now} plus the DM's rulings of 2026-11-01: the vial raised Uldrak, Arkhan arrived as the party went in, and Arkhan now wants the curse more than the orb. Change any line. No scene depends on this page." }
        ] }
      ]
    },

    // =====================================================================
    // 1 THE URNS OF THE UNQUIET
    // =====================================================================
    {
      id: "the-urns-of-the-unquiet",
      title: "The Urns of the Unquiet (C2g)",
      when: "",
      duration: "45-60 minutes",
      blocks: [
        { t: "read", text: "Three great urns stand on the long stone shelf, each taller than a man, sealed with lead and stamped with the rising sun. The first one is already open. What was swirling inside rises as white, ragged smoke and takes the shape of riders, and the grey wraiths go up with it.\n\nThe other two are not quiet. A hairline crack runs around the rim of the second, glowing faintly, and from inside comes the sound of hooves on stone. The third is the largest. Something inside it is breathing slowly, the way a man breathes before he gives an order.\n\nA rider's voice, from far away: \"The sun will hold!\"\n\nIt does not sound like a promise. It sounds like a question." },
        { t: "env", sight: "Pale riders over the first broken urn; two more urns on the shelf, cracks glowing along their rims; names carved floor to ceiling on every wall.", sound: "Hooves inside the second urn. A slow breath inside the third. One voice saying the watchword over and over.", smell: "Cold stone, church wax, old iron.", feel: "The cold is not hostile. It is the cold of a room where someone has just stopped breathing." },
        { t: "map", id: "crypt-of-the-hellriders-40x30", note: "C2g, the long south-east chamber: the Urn Hall. The three great urns sit on a long stone shelf along the far wall, 15 ft. apart. The secret door to C6e is in the east wall." },
        { t: "img", src: "art/generated/event-crypt-urn-hall.webp", caption: "The Urn Hall: one urn open, two still cracking.", credit: "Generated art (gpt-image-2.5)." },

        { t: "h", text: "Who These Riders Are" },
        { t: "p", text: "The players should work out for themselves that these are the riders of the First Charge, who followed Zariel into Avernus a century ago and never came home. Hand them these clues during the fight. Each is free if a PC looks; the checks give more." },
        { t: "list", items: [
          "{@b The battle cry.} Under the watchword, one rider keeps shouting \"For glory!\" It was the First Charge's cry, and the pass phrase of the C1 gates. {@c ser-lucan|Ser Lucan} knows it at once and says so.",
          "{@b The walls.} Every C2 chamber is carved floor to ceiling with names. The urn lids carry names too, and they are the same names.",
          "{@b The dead say so.} A soul laid to rest says its own name and one more thing: \"I rode with the Lady.\" The Lady is Zariel, before she fell."
        ] },
        { t: "checks", items: [
          { skill: "History", dc: 12, who: "anyone (Drenwal, Veska at advantage)", text: "The tabards are a century out of date and carry the Hellriders' sun-and-sword. These are Elturel's riders from Zariel's own time." },
          { skill: "Investigation", dc: 12, who: "anyone", text: "The names on the urn lids and in the C3 prayer niches match names on the walls. The niches were cut for riders who never came home." }
        ] },

        { t: "h", text: "The Three Urns" },
        { t: "table", head: ["Urn", "Breaks", "Releases", "Souls"], rows: [
          ["{@b First urn}", "Already open (the fight in progress)", "3 {@c hellrider-wraith|Hellrider Wraiths}, 8 {@c crypt-specter|specters} (smoke, not souls), and the {@c first-charge-ghost|Ghost of the First Charge} (not an urn soul)", "3"],
          ["{@b Second urn}", "Start of round 4 of the fight, or as soon as anyone strikes it", "3 {@c lance-wraith|Hellrider Lance Wraiths}: mounted, charge and wheel away", "3"],
          ["{@b Third urn}", "Two rounds after the second opens, or when its last lance wraith falls, whichever is first", "{@c banner-marshal|Marshal Aubrec Dunmere, the Last Banner} (miniboss, CR 15) and 2 {@c hellrider-ghost|Hellrider ghosts}, his banner guards", "3"]
        ] },
        { t: "p", text: "{@b Holding an urn shut.} A character at an unbroken urn can use an action to bless it or say the watchword: DC 16 Wisdom (Religion), or no check for a Hellrider speaking the watchword with Drenwal's sigil in view. Each success holds that urn shut for one more round. Two successes on the second urn, or three on the third, and its souls are laid to rest without a fight: they count. Every action spent at an urn is an action not spent on the dead already loose." },

        { t: "h", text: "Wave 1: The First Urn (in progress)" },
        { t: "p", text: "Carry the Session 11 tracker straight over: same hit points, same round count. In the app this is the same set of creatures as Session 11's Restless Dead." },
        { t: "encounter", id: "urns-fight", title: "Wave 1: The First Urn", combatants: [
          { c: "hellrider-wraith", n: 3 },
          { c: "crypt-specter", n: 8 },
          { c: "first-charge-ghost", n: 1 }
        ], notes: "Run the wraiths and the specters as two groups (one initiative, one collective save each). Specters are the urn's smoke: when the first urn's last soul is laid to rest or destroyed, every specter blows away. The Ghost of the First Charge stops if someone says his name from the wall." },

        { t: "h", text: "The Hard Choice: The Wounded or the Line" },
        { t: "img", src: "art/generated/env-urn-wounded.webp", caption: "The rearguard's choice: the wounded, or the line.", credit: "Generated art (Codex)." },
        { t: "p", text: "The first urn holds the rearguard, and the rearguard's choice was this: hold the line, or go back for the wounded. They held the line. Their wounded died behind them, and that is why they never stopped riding. The fight replays it." },
        { t: "list", items: [
          "{@b The wounded.} When a {@c hellrider-wraith|Hellrider Wraith} drops below half its hit points, it falls to its knees, stops attacking and calls for help by name. At the end of each round, a fallen wraith with no living creature next to it loses 10 hit points as the urn's smoke closes over it. Destroyed this way, its soul does not count.",
          "{@b Going back for them.} A PC who reaches a fallen wraith and spends an action on it (the Religion blessing, the watchword, or any healing) lays that soul to rest. Until the start of that PC's next turn, the specters have advantage on attacks against them: they knelt in front of the line.",
          "{@b Holding the line.} The party can ignore the fallen and fight the specters. It is the faster fight, and the rearguard's own mistake: the fallen fade, and their souls do not count.",
          "{@b The tell.} The first time a PC goes back for a fallen wraith, every wraith of the first urn stops attacking for a round and watches."
        ] },

        { t: "h", text: "Wave 2: The Second Urn" },
        { t: "read", text: "The second urn does not crack. It bursts. Three riders come out of it already at the gallop, horses of white smoke under them, lances level, and the hall is suddenly far too small for them." },
        { t: "encounter", id: "urns-fight-2", title: "Wave 2: The Lance Wraiths", combatants: [
          { c: "lance-wraith", n: 3 }
        ], notes: "Add them to the running initiative as one group. They enter at the second urn and charge on their first turn. Hit, wheel away, charge again: punish anyone who is standing in the open between the urns." },

        { t: "h", text: "The Hard Choice: The Order at the Gate" },
        { t: "img", src: "art/generated/env-urn-burning-gate.webp", caption: "The lancers' choice: ride through the burning gate, or refuse the order.", credit: "Generated art (Codex)." },
        { t: "p", text: "The second urn holds the lancers of the front rank, and their choice was the First Charge itself: follow the Lady through the gate into Avernus, or refuse the order. They rode. When the urn bursts, it opens the gate again." },
        { t: "read", text: "Fire climbs the east wall from the second urn's shards, and the wall is not a wall any more. It is an arch, and through it is a red sky, and a road, and a war. The lancers wheel toward it. One of them lifts a horn.\n\n\"The Lady rides into Avernus,\" he calls. \"Who rides with her?\"" },
        { t: "list", items: [
          "{@b The gate.} A burning arch on the east wall of C2g. At the end of each round, every {@c lance-wraith|lance wraith} that did not charge a living creature that round rides 30 feet toward it. A lance wraith that enters the arch is gone, a hundred years late, and its soul is lost.",
          "{@b Stopping one.} Stand in its lane: it will not ride through a living person, so it charges them instead. Or spend an action and tell it the truth with a DC 15 Charisma (Persuasion) check: \"The charge failed. Elturel fell anyway. You can stop.\" On a success it lowers its lance and is laid to rest.",
          "{@b The pull.} A PC who starts a turn within 10 feet of the arch hears the horn and must succeed on a DC 15 Wisdom saving throw or spend their movement stepping toward it, crying \"For glory!\" A living creature that enters the arch takes 22 (4d10) fire damage and is thrown back out. Only the dead go through.",
          "{@b Let them ride.} The glory option is real. Each lance wraith that goes through drops its arms at the arch: roll once on the Hard-won loot table in {@scene the-trials-of-the-pure|The Trials of the Pure} for each. Their souls do not count toward the nine or toward the grave goods.",
          "{@b The gate closes} when the last lance wraith is laid to rest, destroyed or gone through."
        ] },

        { t: "h", text: "Wave 3: The Last Banner (miniboss)" },
        { t: "read", text: "The third urn opens like a door. A rider half again a man's height steps out of it on a horse of smoke, and plants a banner in the shards: the rising sun, half of it burned black. Two riders take their places at his stirrups. The visor turns to Drenwal, and the light inside it is patient.\n\n\"Rider,\" says Marshal Dunmere. \"Report. Has the sun held?\"" },
        { t: "img", src: "art/generated/event-crypt-banner-marshal.webp", caption: "Marshal Aubrec Dunmere, the Last Banner.", credit: "Generated art (gpt-image-2.5)." },
        { t: "encounter", id: "urns-fight-3", title: "Wave 3: The Last Banner", combatants: [
          { c: "banner-marshal", n: 1 },
          { c: "hellrider-ghost", n: 2 }
        ], notes: "Miniboss, CR 15, with 3 legendary actions. The banner (AC 17, 40 HP, vulnerable to radiant) buffs every undead within 30 ft. and powers Rally the Line: break it or take it. The mercy route is Stand Down: a Hellrider gives the order, DC 18 Charisma, three successes or one once he is below 115 HP. His question is real: answer it honestly and the first Stand Down check has advantage." },
        { t: "h", text: "The Hard Choice: The Truth or the Comfort" },
        { t: "p", text: "The third urn holds the Marshal, and his question is the hard choice: \"Has the sun held?\" The truth is that it did not. Elturel fell into Avernus, and his charge did not save it. A kind lie would be easy." },
        { t: "list", items: [
          "{@b The comfort.} Tell him the sun held, and he believes it. He raises the banner and charges again, glad. The first Stand Down check has disadvantage: a man who thinks he won does not stop.",
          "{@b The truth.} Tell him Elturel fell, and he is quiet for a round and takes no action. The first Stand Down check has advantage.",
          "{@b The whole truth.} If someone also tells him the city is still there, chained above the Styx, and that the party means to bring it home, he lowers the banner himself. Stand Down needs one success instead of three."
        ] },
        { t: "note", title: "Scaling", text: "Three level-13 PCs with Veska, Ser Lucan and Moonkite. Each wave alone is a medium fight; overlapping, they are deadly, which is the point: the party should feel the urns as a clock and start sealing them. {@b Easier:} the third urn breaks only when the second urn's last wraith falls, never on the round count. {@b Harder:} the second urn breaks at the start of round 3, and the Marshal has 280 HP. Never more than one urn breaking in a round." },

        { t: "checks", items: [
          { skill: "Religion", dc: 14, who: "anyone", text: "Bless a wraith below half hit points within 5 ft.: that soul is laid to rest. At an unbroken urn it is DC 16 and holds the urn shut for a round." },
          { skill: "History", dc: 15, who: "Drenwal, Veska (advantage)", text: "Speak the watchword \"The sun will hold!\" at an urn. The ghost stops and listens. Anyone who says it with a Hellrider's sigil in view frees the soul." },
          { skill: "Persuasion", dc: 18, who: "Drenwal, Veska", text: "Stand Down: give Marshal Dunmere the order the Charge never got. Three successes, or one once he is bloodied, and he lowers the lance." },
          { skill: "Insight", dc: 12, who: "anyone", text: "The ghosts are not hunting. They are asking to be let off the ride." }
        ] },

        { t: "h", text: "Three Ways to End It Early" },
        { t: "steps", items: [
          "{@b Religion.} A DC 14 Wisdom (Religion) action blesses a wraith below half hit points, or a banner guard, within 5 ft. That soul is laid to rest for good. A critical failure draws the nearest wraith's next attack.",
          "{@b Turn Undead.} Turns every ghost in 30 feet for a minute. A turned ghost cannot be blessed that turn, but the room is safe to work in. Radiant light looks like forgiveness.",
          "{@b The watchword and Drenwal's sigil.} Drenwal (or Veska) says \"The sun will hold!\" with a hand on the sigil: one wraith below half hit points within 30 ft. stops and is laid to rest. One soul per round, no check. On the Marshal it does not work; he needs the other order, Stand Down."
        ] },
        { t: "note", title: "Track the Souls", text: "Every soul laid to rest counts, however it happened. {@b Nine in all}, three per urn: the first urn's three wraiths, the second urn's three lance wraiths, and the Marshal with his two banner guards. Souls laid to rest at a sealed urn count too. Specters and the Ghost of the First Charge do not. The count decides the Roll of the Charge in {@scene the-trials-of-the-pure|The Trials of the Pure} and the size of the Last Ride in {@scene the-ways-out|The Ways Out}. A soul that is only destroyed is gone, not at rest: it does not count." },

        { t: "more", title: "What the urns are", src: ["Homebrew"], blocks: [
          { t: "p", text: "The First Charge rode into Avernus and did not ride out. The Crypt bottled what was left of their souls so that Zariel's fall could not take them as well. Each of the three great urns holds three riders: the first the rearguard, the second the lancers of the front rank, the third the Marshal and his colour guard. They are still waiting for the order to stand down." },
          { t: "p", text: "{@b The wraiths are different.} They are riders who despaired {@i inside the Crypt}, years after the Charge, and were never laid to rest. That is why the ban on evil never kept them out: they did not come in, they were already here. They are grief, not malice. Nobody ever told them the ride was not for nothing." },
          { t: "p", text: "{@b Why this link exists:} it explains a fight inside a place where evil cannot enter, and it turns the fight into something Drenwal's order can answer with mercy." }
        ] },

        { t: "more", title: "Moonkite: The Quiet Dead", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Beat S12.} Moonkite stops within thirty feet of the urns and speaks to Aurora alone: \"They are not coins. They are asking to be let go. Not out. Let go.\" It offers {@spell Starpath} on one urn. Neither Lulu nor Jeremy is here, so Aurora makes the DC 13 Charisma check alone. On a success the soul goes on in peace and counts toward the Last Ride. On a failure it slips free and wanders the Crypt." },
          { t: "p", text: "{@b Bond.} +1 each time Aurora helps a soul go on or spares a wraith at Moonkite's request, up to +2 this beat. -1 if she smashes urns or burns souls while it watches. Full rules in {@side arc-moonkite|Arc: Aurora and Moonkite}." }
        ] },

        { t: "h", text: "The Urn Hoard" },
        { t: "p", text: "The loot lay under the urns, and it is still there: the riders were buried with their gear. Once the last wave is over (laid to rest or destroyed), the shelf can be searched. Give it in full; this is the reward for the hardest fight in the Crypt." },
        { t: "list", items: [
          "{@b Always:} grave goods and Elturian coin worth {@b 2,000 gp}, and three {@item potion of supreme healing|DMG} flasks sealed in wax.",
          "{@b First urn (the rearguard).} A {@item sun blade|DMG}: a rearguard officer's hilt with no blade until it is drawn, and then a blade of daylight. Radiant, and very good against everything in Avernus.",
          "{@b Second urn (the lancers).} A bronze {@item horn of Valhalla|DMG} reflavoured as the {@b Horn of the First Charge}: blown, it calls four spectral Hellriders (berserker statistics, mounted, radiant instead of slashing) for 1 hour. They will not ride against a Hellrider.",
          "{@b Third urn (the Marshal).} His own sword, a {@item dragon slayer|DMG} (+1, an extra 3d6 against dragons). He carried it into Avernus for a dragon he never reached. With Arkhan's dragons at the door and Tiamat stirring, it has never been more welcome."
        ] },
        { t: "h", text: "The Riders' Bequest (static loot)" },
        { t: "p", text: "Fixed, not rolled: one piece per PC, laid out on the shelf behind the urns as if the riders had been keeping them for exactly these three. Give them whatever the dice say elsewhere." },
        { t: "read", text: "Behind the urns, on the bare stone of the shelf, three things lie in a row on folded white cloth. None of them is dusty. Each has a slip of vellum under it in the same careful hand, and each slip says only: For the one who came back for us." },
        { t: "list", items: [
          "{@b Drenwal:} a {@item Amulet of the devout, +2|TCE}, the Hellrider chaplains' sun medallion. While he wears it, his spell attacks and save DC get +2, and once per dawn he can use Channel Divinity without spending a use. Veska knows it on sight: the chaplain of the First Charge wore it into Avernus.",
          "{@b Aurora:} a {@item Rod of the pact keeper, +2|DMG}, a rider's silver riding crop with a moon-white thong. +2 to her spell attacks and save DC, and once per long rest she can use an action to regain one Pact Magic slot. Moonkite lowers its head to it, once, without being asked.",
          "{@b Or'Henn:} a {@item Moon sickle, +2|TCE}, the hook the Hellriders' druid-scouts used to cut forage in a wasteland. +2 to his spell attacks and save DC, and when he restores hit points with a spell he adds {@dice 1d4} to the healing. It is a weapon and a focus, so it sits beside Cinderbloom rather than replacing it.",
          "{@b Veska and Ser Lucan} are covered by their {@scene ending|Crypt upgrades} (the banner, the cold-forged legs). If you want a physical item: Veska takes the Marshal's white {@b +1 shield}, and Lucan the rearguard's {@b +1 plate} (both already in their upgraded AC)."
        ] },

        { t: "h", text: "Rolled Grave Goods" },
        { t: "p", text: "On top of each urn's fixed item. Roll {@dice 1d20} on that urn's table {@b once per soul from it that was laid to rest} (up to three), or {@b once} if all three were destroyed. Rerolls on a duplicate." },
        { t: "table", caption: "First urn: the rearguard (d20)", head: ["d20", "Grave goods"], rows: [
          ["1", "{@item Potion of superior healing|DMG} (two of them)"],
          ["2", "A spell scroll, 5th level (DM picks)"],
          ["3", "{@item Periapt of wound closure|DMG}"],
          ["4", "{@item Cloak of protection|DMG}"],
          ["5", "{@item Mace of disruption|DMG}: a rearguard chaplain's mace"],
          ["6", "{@item Armor of resistance|DMG} (fire), Hellrider plate or the finder's type"],
          ["7", "{@item Pearl of power|DMG}, set in a sun brooch"],
          ["8", "{@item Ring of spell storing|DMG}, holding a {@spell spirit guardians} cast by a Hellrider chaplain"],
          ["9", "A {@item +1 shield|DMG}, the rearguard's, dented by a hundred blows"],
          ["10", "{@item Potion of heroism|DMG} (two of them)"],
          ["11", "{@item Periapt of health|DMG}"],
          ["12", "{@item Bead of force|DMG}: the rearguard's last trick"],
          ["13", "{@item Brooch of shielding|DMG}"],
          ["14", "{@item Oil of etherealness|DMG}"],
          ["15", "{@item Ring of protection|DMG}"],
          ["16", "{@item Sentinel shield|DMG}: the night watch's shield"],
          ["17", "{@item Elixir of health|DMG}"],
          ["18", "{@item Ring of resistance|DMG} (necrotic)"],
          ["19", "Six flasks of holy water and a chaplain's prayer book, worth 200 gp"],
          ["20", "Roll twice on this table and keep both"]
        ] },
        { t: "table", caption: "Second urn: the lancers (d20)", head: ["d20", "Grave goods"], rows: [
          ["1", "Silver spurs, badges and pay, worth 750 gp"],
          ["2", "{@item Potion of speed|DMG}"],
          ["3", "A {@item +2 weapon|DMG}: a lancer's lance"],
          ["4", "{@item Horseshoes of speed|DMG} (fit Moonkite, or any mount)"],
          ["5", "{@item Javelin of lightning|DMG} (two of them)"],
          ["6", "{@item Boots of speed|DMG}"],
          ["7", "{@item Winged boots|DMG}"],
          ["8", "{@item Ring of free action|DMG}"],
          ["9", "{@item Potion of flying|DMG}"],
          ["10", "{@item Figurine of wondrous power|DMG} (bronze griffon): a lancer's mount, in miniature"],
          ["11", "{@item Mithral armor|DMG}: a lancer's half plate"],
          ["12", "{@item Weapon of warning|DMG}: a picket sentry's sword"],
          ["13", "{@item Potion of fire giant strength|DMG}"],
          ["14", "{@item Goggles of night|DMG}"],
          ["15", "{@item Bracers of archery|DMG}"],
          ["16", "{@item Quiver of Ehlonna|DMG}"],
          ["17", "{@item Horn of blasting|DMG}: the lancers' charge horn"],
          ["18", "A spell scroll, 4th level (DM picks)"],
          ["19", "{@item Potion of superior healing|DMG}"],
          ["20", "Roll twice on this table and keep both"]
        ] },
        { t: "table", caption: "Third urn: the Marshal and his colour guard (d20)", head: ["d20", "Grave goods"], rows: [
          ["1", "Marshal's regalia and Elturian gold, worth 1,500 gp"],
          ["2", "{@item Potion of invulnerability|DMG}"],
          ["3", "A spell scroll, 6th level (DM picks)"],
          ["4", "{@item Mantle of spell resistance|DMG}"],
          ["5", "{@item Belt of hill giant strength|DMG}"],
          ["6", "{@item Staff of healing|DMG}: the colour guard's chaplain staff"],
          ["7", "{@item Helm of brilliance|DMG}: the Marshal's parade helm, gems still in it"],
          ["8", "{@item +2 armor|DMG} of the finder's type, the colour guard's white enamel"],
          ["9", "{@item Potion of supreme healing|DMG}"],
          ["10", "{@item Rod of rulership|DMG}: the Marshal's baton of command"],
          ["11", "{@item Ioun stone of leadership|DMG}"],
          ["12", "{@item Sword of sharpness|DMG}: the Marshal's second blade"],
          ["13", "{@item Potion of cloud giant strength|DMG}"],
          ["14", "{@item Ring of resistance|DMG} (fire)"],
          ["15", "{@item Gem of brightness|DMG}: the sun on the colour guard's standard"],
          ["16", "A spell scroll, 7th level (DM picks)"],
          ["17", "{@item Periapt of proof against poison|DMG}"],
          ["18", "{@item Necklace of prayer beads|DMG}: the colour guard chaplain's"],
          ["19", "{@item Elixir of health|DMG}"],
          ["20", "Roll twice on this table and keep both"]
        ] },

        { t: "note", title: "Laid to Rest or Destroyed", text: "An urn whose three souls were {@b laid to rest} gives its item freely: it is lying on top of the shards, as if set out. An urn whose souls were {@b destroyed} still has its item, but buried in the shards and rimed with frost: a DC 15 Investigation to find, and it is cold to the touch until the next dawn. The Marshal's sword is only given if he stood down; otherwise it is under the third urn's shards like the rest." },
        { t: "note", title: "All Nine at Rest", text: "If all nine souls were laid to rest, the riders give one more thing as they go: {@b each PC} gains a {@b Charm of Heroism} (DMG supernatural gift: as an action, gain the benefits of a potion of heroism; one use). The cold candles of C2f light themselves, and Olanthius, wherever he is, stands up." },

        { t: "h", text: "Bonuses for a Strong Run" },
        { t: "p", text: "On top of the loot. Give every one the party earned; they stack." },
        { t: "list", items: [
          "{@b Laid a soul to rest:} each PC (and Veska) who laid at least one soul to rest gains {@b Heroic Inspiration}.",
          "{@b Nobody died:} all three waves beaten with no PC or companion killed. The Crypt's cold settles into them: {@b resistance to fire damage} for every PC and companion until the end of their next long rest. Exactly what they need for the door and the red dragon outside it.",
          "{@b The Marshal stood down:} the riders stand to the ward one last time. {@b Erase two segments} from the ward clock (never below 0).",
          "{@b No urn forced open by hand:} Olanthius's favour. He answers one question about the Bleeding Citadel truthfully, and once, later, he will come when Drenwal calls his name at a Hellrider grave.",
          "{@b Seven or more souls at rest:} the trials' {@b Clean} candles light on their own (see {@scene the-trials-of-the-pure|The Trials of the Pure}) and the Last Ride is ready to ride (see {@scene the-ways-out|The Ways Out}).",
          "{@b All nine at rest:} the Charm of Heroism above, and if your table levels by milestone, this is a good place for {@b level 14}."
        ] },

        { t: "choices", prompt: "The urns are quiet.", items: [
          { label: "On to the trials (C2f, C2e, C2a)", goto: "the-trials-of-the-pure" },
          { label: "Straight to the journals", goto: "the-hellrider-archive" }
        ] }
      ]
    },

    // =====================================================================
    // 2 THE TRIALS OF THE PURE
    // =====================================================================
    {
      id: "the-trials-of-the-pure",
      title: "The Trials of the Pure (C2f, C2e, C2a)",
      when: "",
      duration: "45 minutes",
      blocks: [
        { t: "p", text: "Olanthius said the pure of heart may brave the dangers of this crypt to receive rewards. The Crypt means it. Three trials stand in three of the C2 chambers, each with a different way to be honest: the Roll of the Charge in C2f, the Scales of Mercy in C2e, and the Generals' Seats in C2a. The party can solve them in any order, and each ends in one of three outcomes: {@b Clean,} {@b Hard-won} or {@b Forced.} The outcome sets the loot tier for that trial. A forced answer makes noise at the door." },
        { t: "read", text: "The chambers of the Crypt run on past the reach of your lights. Every wall is carved floor to ceiling with names, row after row, each with a small cold candle beneath it. Most of the candles are dark.\n\nOver three of the doorways a line is cut in the lintel. You cannot read them from here. You are quite sure you can feel them." },
        { t: "map", id: "crypt-of-the-hellriders-40x30", note: "Trial (a) is C2f, the slanted south chamber. Trial (b) is C2e, the tall south-west chamber. Trial (c) is C2a, in the north-west." },
        { t: "h", text: "The Three Doorways (left to right)" },
        { t: "list", items: [
          "{@b Left: (a) The Roll of the Charge, C2f.} The lintel reads: \"We were many. Say us.\"",
          "{@b Middle: (b) The Scales of Mercy, C2e.} The lintel reads: \"Weigh it, and carry it.\"",
          "{@b Right: (c) The Generals' Seats, C2a.} The lintel reads: \"Sit where we sat.\""
        ] },

        { t: "h", text: "(a) The Roll of the Charge · C2f" },
        { t: "read", text: "The left-hand doorway opens on a narrow gallery that runs back into the dark. Both walls are names, floor to vault, each with its cold candle. At the far end the names stop. Nine candles stand in a row under nine ranks with no names above them, and the stone where the names should be is smooth, as if it were waiting to be cut.\n\nThe air is very still. Somewhere, very faintly, a roll call is being read, one voice at a time, and every so often the voice stops, as if it has come to a name it cannot say." },
        { t: "h", text: "Run It" },
        { t: "steps", items: [
          "{@b Read the box, then check the Urn Hall:} how many of the nine souls were {@b laid to rest} (not just destroyed)? Each one laid to rest gave its name as it went, and the names are on the urn lids too ({@b DC 12 Investigation}). The party {@i knows} those names.",
          "{@b Each name is a moment.} A character stands at a candle and says the rider's name aloud, and something about them: how they fell, what they said going. No roll for a name they know. The candle lights, the name cuts itself into the stone, and the roll-call voice reads it and goes on.",
          "{@b Destroyed souls are harder.} Their names must come from the order's memory: {@b DC 14 History} each (Drenwal and Veska with advantage), or from the annals in the Archive later. On a failure the candle gutters, and the voice stops at that rank and waits.",
          "{@b Score it} with the tiers below. Then the voice reads the whole roll, all the way to the end, and stops on the last name lit.",
          "{@b Pay it out:} roll once on the loot table for the tier. Memory 2 (Haruman) opens for Drenwal (see below). If all nine lit, read the box in If All Nine Light."
        ] },
        { t: "table", caption: "The nine (names on the urn lids)", head: ["Urn", "Rank", "Name", "What they say going"], rows: [
          ["First", "Rearguard corporal", "Tamsin Hale", "\"Tell my sister the gate held. It did, didn't it?\""],
          ["First", "Chaplain-rider", "Brother Odo Vane", "\"I prayed the whole way in. I think I can stop now.\""],
          ["First", "Rider", "Benedek Strand", "\"Cold. It's cold. That's good. That's home.\""],
          ["Second", "Lance-sergeant", "Ilsa Marrow", "\"Lances up. Lances up, lads. We're done.\""],
          ["Second", "Rider", "Pell Garrow", "\"Did we reach her? Did anyone reach her?\""],
          ["Second", "Rider", "Joss Kettering", "Says nothing. Salutes, grins, and goes."],
          ["Third", "Standard-bearer", "Mirela Dunmere", "The Marshal's daughter. \"Father. It's all right. Put it down.\""],
          ["Third", "Colour guard", "Cassius Ward", "\"Keep the colours clean for us, Captain.\" (to Veska)"],
          ["Third", "Marshal", "Aubrec Dunmere", "\"The sun has held. Then so did we.\""]
        ] },
        { t: "note", title: "If All Nine Light", text: "Read: \"The last candle catches. For a moment every candle in the Crypt burns at once, thousands of them, and the cold goes out of the stone. The roll-call voice reads the nine new names, and then, quietly, one more you did not expect: Halvard. Not FELL AT THE WALL. Just his name, with a candle under it, lit.\" (This pays off Drenwal's truth about his father. If he never told Olanthius, drop the last two sentences.)" },
        { t: "env", sight: "Rows of names with cold candles under them. Nine of the candles are unlit and have no name above them, only a rank.", sound: "A very faint chanting of the roll call, one voice at a time.", smell: "Wax that has never burned.", feel: "The names pull at you, like being called on in a lesson." },
        { t: "p", text: "Nine candles wait unlit, each under a rank and nothing else. They belong to the nine souls in the three urns of C2g. A candle lights when its rider's name is spoken aloud with grief, from the mouth of someone who has heard it." },
        { t: "checks", items: [
          { skill: "Investigation", dc: 12, who: "anyone", text: "The nine ranks are the nine souls, three to an urn, the Marshal's rank highest. Their names are on the urns' lids." },
          { skill: "History", dc: 14, who: "Drenwal, Veska (advantage)", text: "Fill in a missing name from the order's own history. Lights one candle." },
          { skill: "Insight", dc: 13, who: "anyone", text: "A freed soul will tell its own name if asked kindly." }
        ] },
        { t: "list", items: [
          "{@b Clean.} Seven or more souls were laid to rest and their names spoken. All nine candles light, the names fill in, and the Crypt warms by a degree. Memory 2 opens for Drenwal (see below).",
          "{@b Hard-won.} Four to six souls were laid to rest. The rest need a DC 14 History check each to name from the order's annals. Most of the candles light. Some stay dim.",
          "{@b Forced.} Fewer than four, or they light the candles with a cantrip. The flames are cold and small and smoke black. The ward gains a segment."
        ] },
        { t: "more", title: "Why the candles", src: ["Homebrew"], blocks: [
          { t: "p", text: "The Crypt does not count the dead by bodies. It counts them by names said with grief. This trial ties the urn fights in C2g to the Roll in C2f: the more souls the party laid to rest, the easier the roll call." },
          { t: "p", text: "{@b Memory 2 (Haruman)} opens here, or at the first reading of the annals, whichever comes first. See {@side arc-drenwal|Arc: Drenwal and the Hellrider Memories}." }
        ] },

        { t: "h", text: "(b) The Scales of Mercy · C2e" },
        { t: "env", sight: "A tall bronze scale whose pans hang over an empty floor. In the left pan: a sun-and-sword badge, tarnished. In the right: a torn white tabard.", sound: "A pulse like a slow heartbeat, as if the scale were weighing the room.", smell: "Metal, and under it, rain.", feel: "A hand on your shoulder, from nobody." },
        { t: "read", text: "A shade stands between the pans. She is a young rider in a plain tabard, hands bound, head bowed. Along the wall behind her a hundred cold voices speak at once, all saying the same thing: \"She left her post.\"\n\nThe young rider lifts her head. \"I left,\" she says. \"I left because there was a child behind the wall. I did not know whether the wall would hold.\"\n\nThe scale tilts, and waits." },
        { t: "p", text: "She is not a real prisoner. She is the Crypt's question: mercy, or justice? The wall wants justice. She asks for mercy. Neither is the answer." },
        { t: "note", title: "Table Ruling: The Shade Was Yael", text: "{@b Table ruling (played):} the shade is {@b Yael}. During the Hellriders' invasion of Avernus she was set to watch the devil gate. She left her post to save a child who had wandered near it, the devils breached the gate through the gap, and the breach turned the invasion into the defeat. {@b Zariel executed her herself, while still an angel,} for betraying the line. The party chose the insignia: Zariel's own verdict. {@b Afterwards:} Yael rose as a ghost bound to her duty. When Zariel fell, Yael's ghost and Lulu carried the Sword from the field to the ground where Yael had died. Her blood had consecrated it, and the {@b Bleeding Citadel} rose there around the Sword: the stone weeps her blood and will not stop. Its doors open only for the pure of heart, so the fallen Zariel knows exactly where it is and cannot go in. The Scab is Avernus festering around a holy wound. {@b Theme to lean on:} killing a loyal paladin for an act of mercy was the first crack in Zariel, before Asmodeus ever spoke to her." },
        { t: "p", text: "{@b Which way it tilts.} It starts tipped hard toward the {@b badge} (left pan, justice): a hundred voices outweigh one. Every honest point made for her (an Insight success, a case argued, the Religion fact) brings it a little level, but it never balances on argument alone. It balances only when the party chooses and pays the price aloud (Clean). If they choose without the whole truth, it slams down on the side they chose and stays there (Hard-won). Mercy tips it toward the {@b tabard} (right pan), justice keeps it on the badge; the Crypt does not care which, only whether they paid for it honestly." },
        { t: "checks", items: [
          { skill: "Insight", dc: 14, who: "anyone", text: "She is telling the truth. The child was real. She left for the child, not for herself." },
          { skill: "Religion", dc: 15, who: "Drenwal", text: "The Hellriders did not forbid leaving. They forbade leaving {@i without saying so.}" },
          { skill: "Persuasion", dc: 15, who: "anyone", text: "The hundred voices will hear a case, if someone makes it for her honestly." }
        ] },
        { t: "list", items: [
          "{@b Clean.} The party chooses, and then states aloud what the choice costs and who will bear it. Then they bear it: a spell slot of 3rd level or higher, a magic potion, a promise made to the shade, or a point of exhaustion. The scale balances. Memory 3 opens for Drenwal.",
          "{@b Hard-won.} They choose without the whole truth (no Insight success), or they split and argue. The scale tips, and the price is higher: two of the above, or half the party's hit dice for the day.",
          "{@b Forced.} They break the scale, dispel it, or force a verdict. The shade vanishes without a word. The ward gains a segment."
        ] },
        { t: "more", title: "Why the scales", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Plain version:} the Hellriders were an order of mercy that ran on discipline. This is the trial for the soldier who broke a rule for a person. The right answer is not mercy or justice, it is honesty about the price. That is what the order always asked of its riders." },
          { t: "p", text: "{@b Memory 3 (Olanthius)} opens here, or when Olanthius lets Drenwal read the journal. See {@side arc-drenwal|Arc: Drenwal and the Hellrider Memories}." }
        ] },

        { t: "h", text: "(c) The Generals' Seats · C2a" },
        { t: "env", sight: "A stone table and four high-backed seats. On the table four helms of different make lie in a heap. Each seat has a device carved in the back.", sound: "Nothing. The room is waiting.", smell: "Old oil on leather.", feel: "Looking down at a map that is not there." },
        { t: "read", text: "Each seat's back carries a device, and under it a line of verse.\n\nA sun above a lowered banner: \"The first holds the line.\"\nA fist wrapped in chain: \"The second holds the watch.\"\nA shield beside a closed gate: \"The third holds the road.\"\nAn empty scabbard, burning: \"The fourth holds what none could hold.\"\n\nThe helms are marked only by rank. On the table, a small card: \"Set the right head on the right chair, and the dead will tell you what they carried.\"" },
        { t: "img", src: "art/generated/event-crypt-trials-of-the-pure.webp", caption: "The Round of the Four: set the right head on the right chair.", credit: "Generated art (gpt-image-2.5)." },
        { t: "h", text: "The Four Helms" },
        { t: "p", text: "{@b The puzzle is an ordering.} The seats are numbered by their verses (first, second, third, fourth), and each helm's brow carries its rank as a small sun with one to four rays: four rays is first. Count the rays, put the helms in order, and each goes on its seat. Describe the helms by letter, not by name. The post mark scratched inside the lining ({@b DC 12 Perception}, or anyone who looks) confirms the match with the device on the chair back. The ground-off sun on helm C is the trap: a careless look says it has no rays at all (DC 12 Perception or a close look finds the two rays the file missed)." },
        { t: "table", caption: "The helms (answer in the last column)", head: ["Helm", "What they see", "Rank (brow)", "Post (inside)", "Seat"], rows: [
          ["A", "Tall, winged crest, gold chasing worn to the base metal. Sized for someone a head taller than any human. A single white feather is caught in the lining.", "A sun of four rays: first", "A sun above a line", "Commander (Zariel): the first holds the line"],
          ["B", "Heavy, close-faced, a band of real chain riveted round the brow. The lining is scorched black from the inside, as if the wearer burned.", "A sun of three rays: second", "A chain link", "Haruman: the second holds the watch"],
          ["C", "Plain and square, a visor grille like a portcullis. The sun on the brow has been ground off with a file: the same work the party saw on Olanthius's breastplate. The rays were left: the file stopped at them.", "A sun of two rays: third", "A gate (two posts and a lintel)", "Olanthius: the third holds the road"],
          ["D", "The smallest, a woman's, with a narrow sword-slit visor. On the brow, an empty scabbard engraved, its tip touched with gilt like a flame.", "A sun of one ray: fourth", "A blade", "Yael: the fourth holds what none could hold"]
        ] },
        { t: "p", text: "{@b Clues without the lining:} the feather and the size mean an angel (Zariel); the ground-off sun is Olanthius, whom they have met; the woman's helm with the empty scabbard is Yael, the keeper of the Sword; the scorched helm is what is left (Haruman). Let players solve it by talking; use the History and Religion checks only if they stall." },
        { t: "checks", items: [
          { skill: "History", dc: 13, who: "Drenwal, Veska (advantage)", text: "The sun over a lowered banner is the commander's. The chained fist is the general who ran the watch over the Bhaalspawn: Haruman." },
          { skill: "Religion", dc: 14, who: "anyone", text: "The shield and the closed gate is Olanthius, who held the road to the Citadel. The empty scabbard is the keeper of the Sword: Yael." },
          { skill: "Perception", dc: 12, who: "anyone", text: "Each helm has a scratch on the inner lining: a mark for the rider, a tick for the post." }
        ] },
        { t: "list", items: [
          "{@b Clean.} All four helms placed correctly at the first attempt. The seats warm. Drenwal's first memory opens whole.",
          "{@b Hard-won.} One wrong placement: the helm weeps cold, and the person who placed it takes {@dice 2d6} psychic damage (a shout of failure). The second try is right. The memory opens.",
          "{@b Forced.} They break the lock on the table or pry the helms off. Nothing is hurt, but the room goes dark and the memory comes cold and jagged. The ward gains a segment."
        ] },
        { t: "note", title: "Memory 1 Opens at Any Tier", text: "Solving the Seats, however it went, opens {@b Drenwal's first General's Memory: Zariel as commander.} Read it from {@side arc-drenwal|Arc: Drenwal and the Hellrider Memories}, then give him the boon (Banner Discipline). Forced solves give him the memory in pieces: one sentence of the vision, then he must make a DC 12 Wisdom save or lose a round to it." },

        { t: "h", text: "Loot by Tier" },
        { t: "p", text: "Each solved trial rolls once on the table for its tier, scaled for a level-13 party: Forced is uncommon, Hard-won rare, Clean very rare. The Urn Hall has its own hoard ({@scene the-urns-of-the-unquiet|The Urn Hoard}). When Griffon's Saddlebag items are supplied (not yet), the top tier also gives one fixed item per PC." },
        { t: "table", caption: "Forced (d20): uncommon", head: ["d20", "Reward"], rows: [
          ["1", "{@item Potion of superior healing|DMG} (two of them)"],
          ["2", "A spell scroll, 4th level (DM picks)"],
          ["3", "{@item Potion of heroism|DMG} (two of them), in Hellrider field flasks"],
          ["4", "Old Hellrider coin, worth 500 gp"],
          ["5", "{@item Potion of fire breath|DMG}"],
          ["6", "{@item Potion of resistance|DMG} (fire, two of them)"],
          ["7", "{@item Oil of slipperiness|DMG}"],
          ["8", "{@item Dust of disappearance|DMG}"],
          ["9", "{@item Bag of holding|DMG}"],
          ["10", "{@item Sending stones|DMG}"],
          ["11", "{@item Pearl of power|DMG}"],
          ["12", "{@item Cloak of protection|DMG}"],
          ["13", "{@item Periapt of wound closure|DMG}"],
          ["14", "{@item Wand of the war mage, +1|DMG}"],
          ["15", "A {@item +1 shield|DMG} with the sun-and-sword"],
          ["16", "A {@item +1 weapon|DMG} of the finder's choice, Hellrider make"],
          ["17", "{@item Gauntlets of ogre power|DMG}"],
          ["18", "{@item Boots of striding and springing|DMG}"],
          ["19", "{@item Necklace of adaptation|DMG}: Avernus air, made breathable"],
          ["20", "A plain white tabard with a sun-and-sword. It is worth nothing. It matters to Veska."]
        ] },
        { t: "table", caption: "Hard-won (d20): rare", head: ["d20", "Reward"], rows: [
          ["1", "{@item Potion of supreme healing|DMG}"],
          ["2", "A spell scroll, 5th level (DM picks)"],
          ["3", "{@item Amulet of health|DMG}: a rider's sun medallion"],
          ["4", "{@item Ring of protection|DMG}"],
          ["5", "{@item Cloak of displacement|DMG}: a Hellrider riding cloak that blurs like heat haze"],
          ["6", "A {@item +2 weapon|DMG} of the finder's choice, Hellrider make"],
          ["7", "{@item Bracers of defense|DMG}"],
          ["8", "{@item Ring of evasion|DMG}"],
          ["9", "{@item Flame tongue|DMG}: a Hellrider longsword that burns with clean light"],
          ["10", "{@item Wand of lightning bolts|DMG}"],
          ["11", "{@item Necklace of fireballs|DMG}"],
          ["12", "{@item Periapt of proof against poison|DMG}"],
          ["13", "{@item Potion of invulnerability|DMG}"],
          ["14", "{@item Ring of resistance|DMG} (fire)"],
          ["15", "{@item Gem of seeing|DMG}"],
          ["16", "{@item Wings of flying|DMG}"],
          ["17", "{@item Staff of the woodlands|DMG}"],
          ["18", "{@item Necklace of prayer beads|DMG}"],
          ["19", "{@item Ioun stone of protection|DMG}"],
          ["20", "Roll on the Clean table instead"]
        ] },
        { t: "table", caption: "Clean (d20): very rare, rolled once per trial solved cleanly", head: ["d20", "Reward"], rows: [
          ["1", "{@item +2 armor|DMG} of the finder's type, white Hellrider enamel"],
          ["2", "A {@item +3 shield|DMG} with the sun-and-sword"],
          ["3", "{@item Amulet of the planes|DMG}: the road home is a long one"],
          ["4", "A {@item +3 weapon|DMG} of the finder's choice"],
          ["5", "{@item Rod of absorption|DMG}: a marshal's baton"],
          ["6", "A spell scroll, 7th level (DM picks)"],
          ["7", "{@item Robe of stars|DMG}"],
          ["8", "{@item Animated shield|DMG}"],
          ["9", "{@item Dragon scale mail|DMG} (gold)"],
          ["10", "{@item Ring of regeneration|DMG}"],
          ["11", "{@item Candle of invocation|DMG}, one of the Roll's own candles"],
          ["12", "{@item Spellguard shield|DMG}"],
          ["13", "{@item Horseshoes of a zephyr|DMG}: they fit Moonkite"],
          ["14", "{@item Carpet of flying|DMG}"],
          ["15", "{@item Frost brand|DMG}: cold steel against the red dragon outside"],
          ["16", "{@item Dancing sword|DMG}"],
          ["17", "{@item Rod of alertness|DMG}"],
          ["18", "{@item Manual of bodily health|DMG}"],
          ["19", "{@item Ring of shooting stars|DMG}"],
          ["20", "Roll twice on this table and keep both"]
        ] },
        { t: "note", title: "Saddlebag Items (Placeholder)", text: "{@b Top tier, fixed item per PC:} Saddlebag item for Drenwal: DM to supply (source missing). Saddlebag item for Aurora: DM to supply (source missing). Saddlebag item for Or'Henn: DM to supply (source missing). {@b Until then:} the fixed per-PC items are the Riders' Bequest in {@scene the-urns-of-the-unquiet|The Urns of the Unquiet} (amulet of the devout, rod of the pact keeper, moon sickle, each +2). Do not invent Saddlebag items." },

        { t: "choices", prompt: "The trials are done, or the party has had enough.", items: [
          { label: "Read the journals", goto: "the-hellrider-archive" },
          { label: "Back to the door", goto: "wings-at-the-door" }
        ] }
      ]
    },

    // =====================================================================
    // 3 THE HELLRIDER ARCHIVE
    // =====================================================================
    {
      id: "the-hellrider-archive",
      title: "The Hellrider Archive (C7)",
      when: "",
      duration: "30 minutes",
      blocks: [
        { t: "p", text: "Olanthius gave the party the shard and the road. He did not give them the whole story. North of his hall (C5) is C7, where the order kept its annals. The party has already seen it in Session 11: the shelf of annals, and Olanthius's own journal open on the desk. This scene is the reading. It is the book's key to him: if the party read it before they spoke, they read it again now with his leave, and if not, he lets Drenwal read it. The shard itself came from Drenwal telling him the truth about Halvard." },
        { t: "img", src: "art/generated/env-hellrider-archive.webp", caption: "C7, the Archive: the annals, and Olanthius's journal on the desk.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "read", text: "A narrow room of shelves. Hundreds of leather-bound books, none of them dusty. A reading desk with a single lamp that gives a light the colour of a dawn that is never coming.\n\nOn the desk, an open book in a heavy hand. The top page is a date you do not recognise, and under it, the first line: \"I will write this down because I cannot say it.\"" },
        { t: "env", sight: "Shelves of annals; a lamp that does not flicker; Olanthius's journal open at the last entry.", sound: "Pages turning on their own, once.", smell: "Leather, ink, cold lamp oil.", feel: "Looking at someone's diary and being asked to read it." },

        { t: "h", text: "What They Can Learn" },
        { t: "checks", items: [
          { skill: "History", dc: 10, who: "anyone", text: "The Hellriders were the order of mercy Zariel raised in Elturel's name, to hold the line against the Blood War. Zariel fell to the Nine Hells, and the order went down with her. (Book)" },
          { skill: "Religion", dc: 12, who: "Drenwal", text: "Zariel's fall was not a sin but a bargain she kept making. Each time she paid, she believed the line would hold. (Book, retold)" },
          { skill: "History", dc: 13, who: "anyone", text: "The three generals: Haruman, who ran the watch; Olanthius, who held the road; Yael, who carried the Sword. Haruman and Olanthius fell with the Charge. Yael carried the Sword out. (Book)" },
          { skill: "Insight", dc: 14, who: "anyone", text: "Olanthius is not telling everything. He is not lying. He is protecting someone from a name." },
          { skill: "Arcana", dc: 15, who: "Aurora, Or'Henn", text: "The Sword is not broken. A shard was cracked off in Zariel's last battle, and the blade waits, notched, in the Bleeding Citadel. The shard knows the way. (Eventyr)" },
          { skill: "Religion", dc: 16, who: "Drenwal", text: "The Hellriders trained Bhaalspawn as their ultimate weapons and tamed the blood. The sigil on his chest is the order's leash. (Homebrew)" },
          { skill: "Arcana", dc: 17, who: "Or'Henn", text: "Tiamat and Arkhan: Arkhan took the Hand of Vecna for her, and Tiamat is imprisoned in Avernus. That a dragon taking a curse in her name could wake her is the table's link. (Book, plus Homebrew)" },
          { skill: "History", dc: 18, who: "anyone", text: "A hint of the Caged Star: a small bright thing Zariel hated and kept. A star in a cage, in the Citadel. Moonkite knows the name. (Homebrew link)" }
        ] },

        { t: "more", title: "Olanthius's journal", src: ["Book (the journal exists)", "Homebrew (its wording here)"], blocks: [
          { t: "p", text: "The printed adventure says Olanthius left a journal. Its contents here are the DM's, built on what he says in the book: he was Zariel's loyal knight, he became a death knight at the end, and he guards the road. The entries below are three short paragraphs the DM can read aloud, not the book's text." },
          { t: "read", text: "\"Day without number. They ask me why I kneel. I tell them it is a vigil. It is a penance. I could not hold the gate.\n\nWe taught the Bhaalspawn to heed a leash, because the alternative was to kill them. Haruman did the work. I held the watch with him. I still hear the questions the children asked.\n\nThe small star fell, and Zariel hated it. I did not understand why until I saw how it looked at her.\"" },
          { t: "p", text: "{@b Memory 4 (Yael)} opens when Drenwal has read the journal in full and the annals with it. See {@side arc-drenwal|Arc: Drenwal and the Hellrider Memories}. It gives him the boon \"Weight Carried.\"" }
        ] },

        { t: "more", title: "The order's annals", src: ["Homebrew"], blocks: [
          { t: "p", text: "The annals are the order's own records: muster rolls, watch rotas, and the Hellriders' rule. They do not mention Bhaalspawn by name. They talk about \"the kept\" and \"the Watch.\" That is how the party knows the program existed." },
          { t: "p", text: "{@b Why this link exists:} so the Bhaalspawn weapons program has a paper trail inside the Crypt, and Drenwal can read his own sigil's history, not just hear about it." }
        ] },

        { t: "more", title: "The Caged Star (a hint only)", src: ["Homebrew"], blocks: [
          { t: "p", text: "Do not name Coram-of-Small-Mercies yet. The journal says only \"the small star\" and \"it looked at her.\" If Aurora asks Moonkite, it says nothing and keens. That is the answer." }
        ] },

        { t: "choices", prompt: "The archive is read.", items: [
          { label: "Out to the door", goto: "wings-at-the-door" }
        ] }
      ]
    },

    // =====================================================================
    // 4 WINGS AT THE DOOR
    // =====================================================================
    {
      id: "wings-at-the-door",
      title: "Wings at the Door (C1)",
      when: "",
      duration: "30 minutes",
      blocks: [
        { t: "p", text: "The party shut the C1 gates behind them when they came in, and the gates are still shut. Above them the stair climbs forty feet to the doorway, and the cold line runs across its threshold. Arkhan stands at the top of the stair, one step outside the line. He does not knock. He speaks, and the stairwell carries his voice down to the gates like a well. If the party will not open the gates, he talks through them and the scene runs the same, but they see the dragons only when someone climbs the stair. When they open the gates, read:" },
        { t: "map", id: "crypt-of-the-hellriders-40x30", note: "C1, at the top of the map: the gates, and the 40-foot stair up to the doorway and the cold line." },
        { t: "read", text: "The gates of the Crypt swing in. The stair climbs forty feet above you to a doorway full of red sky, and across that doorway the cold line runs like a rope. Beyond it the sky is full of wings.\n\nOn the ridge, a black dragon the size of a barn lies with its chin on its claws. High above, a blue one cuts slow circles, lightning crawling on its wings. A green one has settled nearest the line and sits quite still, head tilted, as if it were listening to the music of a place it has not been invited to. A red one perches on the roof of the Crypt itself, one claw curled round a gargoyle. To the north, on a hill, a great white shape with an old tortle on its back.\n\nAnd at the top of the stair, one step outside the cold line, a tall dragonborn in black plate. The left side of his face is grey. He has Fane-Eater on his hip and his hands open at his sides.\n\n\"Good morning,\" says Arkhan the Cruel. \"You had something of mine. A little red glass. You poured it into a dead giant.\" He smiles with the half of his face that can. \"I am not angry. I want you to know that.\"" },
        { t: "img", src: "art/generated/event-crypt-wings-at-the-door.webp", caption: "Arkhan at the cold line, his dragons behind him.", credit: "Generated art (gpt-image-2.5)." },
        { t: "env", sight: "Five dragons in a ring; the cold line on the threshold; Arkhan's grey half-face turned away from the light.", sound: "Wings. A low hum from the ward. Krull's prayers, very faint.", smell: "Smoke, old meat, incense from the north hill.", feel: "Everyone outside is patient. That is the frightening part." },

        { t: "h", text: "What Arkhan Wants Now" },
        { t: "p", text: "{@c arkhan-the-cruel|Arkhan} cannot cross the line and does not try. The vial of Tiamat's blood was his road to his queen, and the party spent it raising Uldrak. The curse in Or'Henn is the only road left. He no longer bargains for the orb. He wants the party dead, with two exceptions." },
        { t: "list", items: [
          "{@b Or'Henn, alive.} A dead druid cannot ask anyone for anything. Or'Henn is the hostage.",
          "{@b Drenwal, alive and able to cast.} Arkhan needs a priest to call a gold dragon.",
          "{@b Why a gold dragon.} The curse jumps only if Or'Henn asks a dragon for help. He will never mean it to one of Arkhan's chromatic dragons. He might mean it to a gold one, called by his friend, with Fane-Eater at his throat."
        ] },
        { t: "read", text: "\"I will make you one offer,\" says Arkhan, \"because I am not a brute. Send me the druid and the priest. The rest of you walk out of that door, and none of mine will touch you.\"\n\nHe lets that sit.\n\n\"Or wait. The ward is tired. You can hear it, can you not? Every hour a little lower. And I have waited a century for less.\"" },

        { t: "more", title: "Arkhan's Plan: the Hostage and the Gold Dragon", src: ["Homebrew", "SRD (spells)"], blocks: [
          { t: "steps", items: [
            "{@b Take the hostage.} Or'Henn by choice. Any PC will do if it makes Or'Henn ask, because the asking can be for someone else. Arkhan can only take someone who comes past the cold line, or after the ward falls. Vecna's Grip (DC 22 Constitution, restrained and silenced) holds them, then he carries them back up out of the stair.",
            "{@b Bind the priest.} He casts {@spell geas} on Drenwal (DC 22 Wisdom): call a gold dragon. Acting against it costs 5d10 psychic damage, once a day. If the Geas fails, the blade at the hostage's throat is the order instead.",
            "{@b The call.} Drenwal's 6th-level spell is {@spell planar ally}. By the rules it brings a celestial, an elemental or a fiend, so a gold dragon is a DM's ruling: Drenwal's god sends one, because a priest is begging. Divine Intervention also works if it lands (13% at level 13).",
            "{@b The ask.} The gold dragon arrives over a dying friend. Arkhan holds the hostage at the edge of death and says one word to Or'Henn: \"Ask.\" If Or'Henn asks the gold dragon for help and means it, the curse jumps to the gold dragon, and Tiamat wakes in her true form. Run Branch: Tiamat Wakes in {@scene ending|Ending the Session}."
          ] },
          { t: "h", text: "How the Party Breaks It" },
          { t: "list", items: [
            "{@b Drenwal fails the casting on purpose} and takes the Geas damage.",
            "{@b Drenwal prays for anything but a dragon.} The god may send a celestial instead. That is the DM's call, and it should feel earned.",
            "{@b Someone warns the gold dragon.} It is good and it listens. A warned gold dragon fights Arkhan instead of reaching for the druid.",
            "{@b Or'Henn refuses.} A dying man who will not ask is the bravest thing in this session.",
            "{@b Exit C still works.} Arkhan will not fight Uldrak."
          ] }
        ] },

        { t: "checks", items: [
          { skill: "Insight", dc: 13, who: "anyone", text: "Every word of his offer is true, and he will keep it to the letter. He is not telling you why he wants the druid and the priest." },
          { skill: "Insight", dc: 16, who: "Or'Henn", text: "Arkhan keeps looking at you. He is not threatening you. He is waiting for you." },
          { skill: "Insight", dc: 18, who: "Drenwal", text: "He looks at your holy symbol the way a man looks at a key. He wants something cast, not someone killed." },
          { skill: "Perception", dc: 14, who: "anyone", text: "The dragons are not hungry. They are told to wait. Obatala has not moved." },
          { skill: "Arcana", dc: 15, who: "anyone", text: "The ward is a tide. It fills in segments you can feel in your teeth. Six, and it fails." }
        ] },

        { t: "more", title: "Moonkite at the door", src: ["Homebrew"], blocks: [
          { t: "p", text: "Moonkite speaks to Aurora alone, softly: \"He is at the door. He is not angry. He is patient. That is worse.\" No bond change. It should make her player look at the door and think about what Arkhan wants from her." }
        ] },

        { t: "h", text: "Where Each One Waits" },
        { t: "list", items: [
          "{@c skarrix|Slarkas} (black). The west ash ridge, crouched low like a skull in a swamp. Sullen. Spits acid at the line to see who flinches. Charges any Hellrider banner. Radiant hurts him.",
          "{@c vhennic|Vistalancer} (blue). Circling high, steel-capped horn glinting. Reports to Arkhan. Strafes anyone who leaves the doorway. The easiest to turn: show him the odds.",
          "{@c mirelle|Vermilius} (green). Nearest the cold line, perched and still, frill raised. The kindest voice outside. Speaks to Or'Henn alone. Arkhan's black handprint is on her throat.",
          "{@c praxamor|Flash} (red). The Crypt's roof ridge, rearing and roaring. Proud. First to snap. Fire breath at the doorway if a PC steps out. Call him small and he breaks ranks.",
          "{@c obatala|Obatala} and {@c krull|Krull}. The north hill. Krull counts minutes. Obatala does not move unless Krull clicks his tongue."
        ] },

        { t: "h", text: "The Ward Clock" },
        { t: "p", text: "The knock cracked the ward. It weakens in 6 segments. It starts at 0. Track it where the table can see it." },
        { t: "list", items: [
          "{@b +1} at the end of scene 1 (the urns), scene 2 (the trials) and scene 3 (the archive), if the party spent a scene on it. Skip a tick if they skip the scene.",
          "{@b +1} every time a trial is forced (see the Trials of the Pure).",
          "{@b +1} every time someone shouts at, attacks or casts a loud spell toward the door.",
          "{@b +1} if Arkhan uses Command the Line or Vecna's Grip across the threshold. He will not do this lightly.",
          "{@b At 6,} the ward fails. Evil can enter. Arkhan walks in with Krull, the dragons crowd the doorway but cannot fit, and the fight is {@scene the-breakout|The Breakout}."
        ] },
        { t: "more", title: "Why a clock, not a countdown", src: ["Homebrew"], blocks: [
          { t: "p", text: "A clock the players can see creates urgency without forcing a fight. They always know how long they have, and they decide how to spend it. The ticks are mostly their choices: take the time, take the noise, or take the shortcut." },
          { t: "p", text: "In the Crypt the Tiamat visions are quiet. As the ward fills, the quiet thins. At 3 segments Or'Henn can hear a whisper again. At 5 she speaks outright." }
        ] },

        { t: "h", text: "Vermilius's Kindness" },
        { t: "p", text: "{@c mirelle|Vermilius} never attacks first. She speaks to Or'Henn, and only to him, in low Draconic. She is the gentlest of the four, and she is Tiamat's hand." },
        { t: "read", text: "A low voice, in Draconic, very kind. It does not come from the air. It comes from the green dragon's whole body, from a hundred feet away, soft as a hand on a sleeping child.\n\n\"You are tired, little red. I can tell. You have been carrying that for such a long time.\"\n\nShe does not move closer. She does not need to.\n\n\"You need only ask,\" says Vermilius. \"I will take it. I will take all of it.\"" },
        { t: "more", title: "One Small Vision", src: ["Homebrew"], blocks: [
          { t: "p", text: "When Or'Henn first steps near the line, or when the ward reaches 3, give him one Small Vision from {@side arc-tiamat|Arc: Or'Henn and Tiamat}. The Crypt's quiet thins at the door, so the vision can reach him. A good one to choose: {@b d8 result 6,} Arkhan's voice, far off, praying; it stops, as if Arkhan heard him listening. That ties the door to the dragons." },
          { t: "p", text: "{@b Row 2} (a whisper from the orb) opens the orb-cage loophole. Use it only if you want the loophole live this session. It is a DM's choice. Do not hint at it otherwise." }
        ] },

        { t: "choices", prompt: "What does the party do?", items: [
          { label: "Look for a way out", goto: "the-ways-out" },
          { label: "Talk to Arkhan some more", side: "arkhan-talks" },
          { label: "Fight now", goto: "the-breakout" }
        ] }
      ]
    },

    // =====================================================================
    // 5 THE WAYS OUT
    // =====================================================================
    {
      id: "the-ways-out",
      title: "The Ways Out",
      when: "",
      duration: "40 minutes",
      blocks: [
        { t: "p", text: "There are seven exits. They only need one. Each has a mechanic and a cost, and none of them is free. Offer none of them to the players. Let the players invent them, then say yes and read the cost. If they get stuck, the ward clock will unstick them." },
        { t: "img", src: "art/generated/env-last-ride.webp", caption: "Exit B, the Last Ride: the freed riders clear a lane through the dragons.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "list", items: [
          "{@b A} the Orb. {@b B} the Last Ride. {@b C} Uldrak. {@b D} Krull's double-cross.",
          "{@b E} parley with Arkhan. {@b F} the Lady Vengeance. {@b X} Vermilius's kind offer (the trap)."
        ] },

        { t: "more", title: "A · The Orb (lead them off)", src: ["DMG", "Homebrew"], blocks: [
          { t: "p", text: "{@b Mechanic.} The Orb of Dragonkind calls evil dragons within 40 miles to the orb by the most direct route, once per hour. Evil dragons {@i must} come to wherever the orb is. If someone carries the orb away from the Crypt and calls, the dragons follow it, not the Crypt. That empties the sky." },
          { t: "p", text: "{@b Who carries it.} Aurora on Moonkite is the fastest. Whoever holds it must be attuned (a short rest) and make a DC 15 Charisma check. On a failure the orb charms them and casts {@spell suggestion} (DC 18): \"Let the druid ask for help.\" Obatala and the four dragons are drawn to the carrier. Arkhan does not follow the orb. He stays for Or'Henn." },
          { t: "p", text: "{@b Cost.} The carrier is chased for three rounds by angry dragons. Vistalancer will catch them. Anyone with the orb must outrun a breath. If the orb is dropped, it is taken. The carrier is far from the group when the dragons arrive. With the sky empty, Arkhan is alone at the top of the stair, and he is still a CR 22 fight. Pair this exit with another one." },
          { t: "p", text: "{@b The orb's own help.} It holds 7 charges: {@spell death ward} (2 charges each), {@spell daylight} (1), {@spell cure wounds} at 5th level (3). Use death ward before the run." },
          { t: "p", text: "{@b Source.} The orb is a DMG artifact. The rules here are paraphrased; see the Session 10 notes for the full rules." }
        ] },

        { t: "more", title: "B · The Last Ride", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Mechanic.} The freed Hellrider ghosts ride out of the doorway in a final charge. They are not evil, so the ward does not stop them. Each soul laid to rest is one rider. The watchword must be said by Drenwal or Veska at the door." },
          { t: "p", text: "{@b Effect.} The riders charge in a 60-foot lane to the east. Each dragon in the lane must succeed on a DC 16 Wisdom saving throw or be frightened for the three rounds of the ride (the sun it was told to fear). Arkhan is not frightened; he is moved. He lets them pass. A rider is not harmed by dragon breath: it passes through." },
          { t: "p", text: "{@b Size.} Three riders clear a lane. Six clear two lanes. Nine clear the sky. Fewer than three souls, the ride does not form." },
          { t: "p", text: "{@b Cost.} The riders do not come back. Each is laid to rest for good. The urns go dark, the Crypt dims, and Olanthius says nothing for the rest of the session. The party leaves quickly: three rounds is all they get." }
        ] },

        { t: "more", title: "C · Calling Uldrak", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Mechanic.} He said: \"When you go up against her, call me. I will hear.\" The party can call him now, with the coin he gave them or a shout to the sky. He arrives in two rounds." },
          { t: "p", text: "{@b Effect.} Uldrak (CR 23) arrives and stands on the ridge. Arkhan bows and withdraws. The dragons do not fight an empyrean. The party leaves. No ward tick is spent." },
          { t: "p", text: "{@b Cost.} It spends his endgame promise. He will not be at the Citadel or at the final fight with Tiamat. Tiamat noticed him. Arkhan holds a grudge for a century. Tell the players this before they call." }
        ] },

        { t: "more", title: "D · Krull's double-cross", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Mechanic.} {@c krull|Krull} covets Arkhan's place. A clever party can sell him what he wants. If someone sends him word (a coin on a wind-borne note, a signal on the north hill), he comes to the line, bored, as if reading a bill." },
          { t: "read", text: "\"Hm,\" says Krull. \"My lord is a great man. A very great man. And great men grow tired, in the end.\"\n\nHe taps his maul on the ground. \"Give me the glass, children, and I will lead the dragons away on a false scent. A ship in the mists, say. Arkhan will be furious. I will be elsewhere. I will not be asked.\"" },
          { t: "p", text: "{@b Effect.} Krull gives the orb to Obatala to carry. He leads the dragons east. Arkhan is alone at the door. He cannot cross the line and he knows he has been robbed. The party leaves." },
          { t: "p", text: "{@b Cost.} Krull has the orb, not Arkhan, which is worse. He turns up at the Monument with it and a smile. Arkhan learns who betrayed him. He sends Torogar after the party. Krull will ask for a favour later." }
        ] },

        { t: "more", title: "E · Parley with Arkhan", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Mechanic.} Arkhan keeps his word to the letter and never lies. His only offer is the one at the door: Or'Henn and Drenwal come to him, and the rest walk out untouched. If the party offers the orb instead, he takes it gladly and promises exactly this: \"None of my children will touch you on the road today.\" Every word is true." },
          { t: "p", text: "{@b Cost.} If they hand over Or'Henn and Drenwal, run Arkhan's Plan from {@scene wings-at-the-door|Wings at the Door}. If they hand over the orb, they buy only what he said: his dragons stand back for the rest of the day, and he follows on foot and by teleport, for Or'Henn. He can now call dragons across Avernus at will, and the orb-cage loophole is gone. A DC 15 Insight check hears the gap: he made no promise for himself." }
        ] },

        { t: "more", title: "F · The Lady Vengeance extraction", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Mechanic.} The ship is hidden in the mists, with Jeremy and Colico Jack. Aurora on Moonkite flies out under cover, or a signal flare goes up. The ship comes through the mist at speed. The Crypt's ground is neutral. The ship lands on the cold line and the party boards." },
          { t: "p", text: "{@b Effect.} Two force cannons (8d10 each) can drive off a young dragon in one volley. Against adult dragons, they buy two rounds. The ship takes breath: Vistalancer and Flash beat its damage threshold of 15. Plan for 40 to 80 damage to the hull." },
          { t: "p", text: "{@b Cost.} The ship is no longer hidden. Every dragon and Arkhan's scouts know where it is. It sets up Zariel's riders finding Lulu in scene 8 and the Citadel run. If the ship is not hidden, the cliffhanger in scene 8 lands harder." }
        ] },

        { t: "more", title: "X · Vermilius's kind offer (the Tiamat trap)", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Mechanic.} Vermilius offers to take the curse. If Or'Henn says, aloud and meaning it, that he asks Vermilius for help, the curse jumps to the green dragon. Vermilius is the kindest, so it looks like a rescue." },
          { t: "p", text: "{@b Effect.} The curse leaves Or'Henn. For a moment he feels light. Then Vermilius changes, the other dragons kneel, and under Avernus something vast turns over in its sleep. Tiamat wakes in her true form. The siege lifts because the dragons have a new queen." },
          { t: "p", text: "{@b Cost.} Everything. This is the exit Arkhan wants. It works, it is true, and it is the end of the party's ability to pretend Tiamat is asleep. Do not warn the players. Let it be tempting." },
          { t: "p", text: "{@b The forced version.} The same trap with a gold dragon and a blade at Or'Henn's throat. See Arkhan's Plan in {@scene wings-at-the-door|Wings at the Door}." },
          { t: "p", text: "{@b Alternative (the cage loophole).} If Small Vision row 2 came up, a clever player may ask the dragon {@i inside the orb.} See {@side arc-tiamat|Arc: Or'Henn and Tiamat} (DM's Choice: The Dragon in the Orb). The recommended result is the orb becomes a gold cage. The curse leaves Or'Henn, Tiamat wakes only halfway, and Arkhan would burn Avernus to own the orb." }
        ] },

        { t: "note", title: "Combining Exits", text: "Exits stack. A common good answer: the Last Ride clears the lane, the Lady Vengeance picks them up, Uldrak waits as the last resort. The Orb run can go with either. Giving Arkhan the orb (E) closes A and the cage loophole. Let them combine, and add the costs together." },

        { t: "choices", prompt: "Which way?", items: [
          { label: "They fight their way out", goto: "the-breakout" },
          { label: "They get out clean", goto: "bhaals-first-gasp" }
        ] }
      ]
    },

    // =====================================================================
    // 6 THE BREAKOUT
    // =====================================================================
    {
      id: "the-breakout",
      title: "The Breakout",
      when: "Only if they fight",
      duration: "45 minutes",
      blocks: [
        { t: "p", text: "The siege is not a fight to win. Escape is the win. If the ward fails, or they go through the door on purpose, run the exits as a running fight in two waves. The dragons do not go inside. Fight at the line and in the lane. The group rules apply: set up each wave, and groups share an initiative." },
        { t: "read", text: "Fane-Eater clears its scabbard with a sound like a door opening onto cold air.\n\n\"A shame,\" says Arkhan the Cruel, and means it. Over his head the sky turns over, and wings come down." },
        { t: "img", src: "art/generated/event-crypt-breakout.webp", caption: "The Last Ride clears a lane.", credit: "Generated art (gpt-image-2.5)." },

        { t: "encounter", id: "the-door-fight", title: "Wave 1: The Doorway", combatants: [
          { c: "skarrix", n: 1 },
          { c: "mirelle", n: 1 }
        ], notes: "Slarkas and Vermilius at the line. Both dragons stay in reach of the door and breathe on whoever steps out. Vermilius only commits when hit. The wave ends when either flees (below 60 hit points) or the party gets through the lane." },
        { t: "encounter", id: "the-ash-run", title: "Wave 2: The Ash Run", combatants: [
          { c: "praxamor", n: 1 },
          { c: "vhennic", n: 1 }
        ], notes: "Flash drops from the roof; Vistalancer strafes from above. They want the carrier of the orb. The run is three rounds to cover the open ground. Breath beats the ship's damage threshold. Retreat below 60 hit points." },
        { t: "encounter", id: "arkhan-at-the-line", title: "Only if the ward fails: Arkhan and Krull", combatants: [
          { c: "arkhan-the-cruel", n: 1 },
          { c: "krull", n: 1 }
        ], notes: "A fight the party should lose. Arkhan walks in with Krull; Krull casts blade barrier across the escape route. Arkhan goes for Or'Henn first: Vecna's Grip, a grapple, then back up the stair. Everyone else he is happy to kill. The goal is the exit, not Arkhan. At roughly half hit points Arkhan withdraws; he does not risk Fane-Eater." },

        { t: "h", text: "Survival Tuning" },
        { t: "list", items: [
          "{@b Escape is the win.} Reward a clean exit with story, not XP. Do not reward killing a dragon.",
          "{@b Dragons do not enter.} Keep them out of the Crypt. They fight at the line and the lane. Any PC who stays inside is safe.",
          "{@b If Arkhan takes Or'Henn,} the goal becomes getting him back before the gold dragon comes. Arkhan's Plan in {@scene wings-at-the-door|Wings at the Door} lists the ways to break it.",
          "{@b Breath goes at the door,} not at the people, unless a PC stands in the doorway. Never kill a PC in round 1.",
          "{@b If it goes badly,} offer exit C (Uldrak) or exit E (the orb) as a last resort. Say plainly what they cost.",
          "{@b If it goes easily,} add Obatala and Krull on wave 2, or have Arkhan teleport onto the ridge and speak.",
          "{@b Veska and Ser Lucan} can hold the doorway for a round or two. Do not let either die unless the table chooses it."
        ] },
        { t: "choices", prompt: "They are out.", items: [
          { label: "On to the open sky", goto: "bhaals-first-gasp" }
        ] }
      ]
    },

    // =====================================================================
    // 7 BHAAL'S FIRST GASP
    // =====================================================================
    {
      id: "bhaals-first-gasp",
      title: "Bhaal's First Gasp",
      when: "The first time Drenwal steps out of the Crypt",
      duration: "10 minutes",
      blocks: [
        { t: "p", text: "The Last Gasps begin only once Drenwal is outside the cold. The Crypt's vigil is still alive in there; Bhaal cannot reach him through it. The trigger is simple: the moment he crosses the cold line into Avernus, treat the Watch pool as empty for one beat." },
        { t: "img", src: "art/generated/env-bhaals-first-gasp.webp", caption: "Bhaal's First Gasp: the first breath outside the cold.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "read", text: "The cold line passes over you like a hand lifted from your shoulder. The air outside tastes of iron.\n\nThen you feel it: a breath that is not yours. It comes in slow, old and patient, and it smells of salt and rust. It does not speak. It is the shape a voice would take if the god behind it had died, and the dying had not finished." },
        { t: "p", text: "Use the Gasp save and effects from {@side arc-drenwal|Arc: Drenwal and the Hellrider Memories}. For this first one, treat the trigger as met automatically. If the party never steps out (the ship picks them up from the roof, say), fire it the first time Drenwal stands under the Avernus sky." },
        { t: "more", title: "Why it starts here", src: ["Homebrew"], blocks: [
          { t: "p", text: "The Crypt is the one place where the Hellriders' watch is still kept, so the old door is shut. Outside, the leash is only the sigil. This is the first night Drenwal is in danger from his own blood, and it is the reason the Generals' Memories matter." }
        ] }
      ]
    },

    // =====================================================================
    // 8 ZARIEL NOTICES
    // =====================================================================
    {
      id: "zariel-notices",
      title: "Zariel Notices",
      when: "",
      duration: "20 minutes",
      blocks: [
        { t: "p", text: "Zariel should be felt before she is seen. This session is signs only. Pick two or three from the list, then end on Jeremy's message. The full guide to playing her is {@side zariel|Playing Zariel}." },
        { t: "img", src: "art/generated/env-zariel-notices.webp", caption: "A banner with no army under it, and a polite writ.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "list", items: [
          "A banner on the horizon with no army under it: a sun with the sword torn out.",
          "A {@c narzugon|narzugon} rides to the Crypt hill after the siege and leaves a writ, politely. It asks for the shard and for Lulu by name. It does not threaten.",
          "The shard hums when the party looks toward the Scab, with a rhythm like a marching step.",
          "Or'Henn's next vision gives a glimpse of a figure standing over a field of fire, back to him. Tiamat knows her."
        ] },
        { t: "read", text: "The writ is a single sheet of heavy vellum, sealed with a sun that has had its sword cut out. In a tidy hand:\n\n\"The shard is mine. The hollyphant is mine. You will bring them to the Citadel, or I will come for them. This is not a threat. It is a schedule.\"" },

        { t: "h", text: "Jeremy's Message" },
        { t: "p", text: "The Lady Vengeance is hidden in the mists. The party gets a message from Jeremy: through a sending, a whispered line over the ship's speaking trumpet, or the Planar Core's own voice. Pick whatever fits how the session ended." },
        { t: "read", text: "It is Jeremy. His voice is thin and fast, and there is a lot of static under it.\n\n\"Right. Right, I need you to listen, because I will only say this once. We were fine. We were hidden, we were quiet, and then the mist went white and the wards went out for about the length of a held breath, and when it came back the deck was full of riders in white and gold and Lulu was just {@i not there.}\"\n\nA long breath.\n\n\"Nobody got hurt. They were very polite. One of them said, 'She will be safe.' I do not know what that means. I do not like it.\"" },
        { t: "note", title: "End on the Cliffhanger", text: "Lulu is gone. That is the end of the session. Do not resolve it. Let the players react." },
        { t: "more", title: "If you don't want Lulu to be taken", src: ["Homebrew"], blocks: [
          { t: "list", items: [
            "{@b Keep her safe.} The riders arrive and the wards hold. The herald leaves a writ and a promise to return. Lulu stays; Zariel sends a second wave next session.",
            "{@b Let her go willingly.} Lulu decides to go, because she has understood something the party hasn't. It makes the loss a choice.",
            "{@b Delay it.} Take Lulu in Session 13, so the party carries her memory further down the road."
          ] },
          { t: "p", text: "The recommended default is in {@side zariel|Playing Zariel}: the shard takes over Lulu's role in the Citadel, and Lulu becomes Zariel's leverage in Chapter 5." }
        ] }
      ]
    },

    // =====================================================================
    // ENDING
    // =====================================================================
    {
      id: "ending",
      title: "Ending the Session",
      when: "",
      duration: "10 minutes",
      blocks: [
        { t: "p", text: "End on Jeremy's message, or at a cliffhanger inside the siege. Read the outcomes that happened." },

        { t: "h", text: "Outcome: They Left by the Orb" },
        { t: "p", text: "The dragons followed the orb, and the party slipped away. The carrier has a day's lead and four angry dragons behind them. Arkhan did not follow the orb. He still wants Or'Henn." },
        { t: "h", text: "Outcome: The Last Ride" },
        { t: "read", text: "The cold riders go out of the door like a long, slow breath. The dragons part for them, and for a moment the red sky has a white road in it. Then the last rider is gone, and the candles in the Crypt are, for the first time, all lit." },
        { t: "p", text: "The urns are dark. The Crypt is quieter than it has been. Olanthius is silent." },
        { t: "h", text: "Outcome: Uldrak Came" },
        { t: "p", text: "His promise is spent. He will not be at the Citadel or the last fight. Tiamat noticed." },
        { t: "h", text: "Outcome: They Sold Krull the Orb" },
        { t: "p", text: "Krull has the orb and a debt to collect. Arkhan knows. Torogar is on the road." },
        { t: "h", text: "Outcome: They Gave Arkhan the Orb" },
        { t: "p", text: "He has the orb and kept his word to the letter: his dragons did not touch them that day. He made no promise for himself, and he still wants Or'Henn. He can call dragons across Avernus whenever he likes." },
        { t: "h", text: "Outcome: The Lady Vengeance Took Them Off" },
        { t: "p", text: "The ship is no longer hidden, and the hull is scorched. Zariel's riders know exactly where it is." },

        { t: "h", text: "Outcome: Veska and Ser Lucan Survived the Crypt" },
        { t: "p", text: "If both (or either) walk out alive, the Crypt gives them something before they go. Run it in the name-carved C2 chambers on the way to the C1 gates, or in the first quiet moment after the escape." },
        { t: "read", text: "Olanthius stops you at the wall of names. He does not look at the party. He looks at the old knight on brass legs.\n\n\"There is a name on my wall that should not be there,\" he says, and puts his chisel to the stone. Three strokes, and LUCAN is gone from the roll of the dead. \"You are not dead, rider. Go and be alive. Take the cold with you; it will remember what it is for.\"\n\nFrost runs down the brass of Lucan's legs and does not melt.\n\nThen he turns to Veska, and takes the burned banner from the shards of the third urn, and holds it out. \"The Marshal gave you his colours. I am only the one who hands them over. Captain.\"" },
        { t: "list", items: [
          "{@b Veska becomes} {@c veska-banner-captain|Veska, Banner-Captain} (CR 10): 142 HP, AC 19, three lance attacks, radiant against fiends {@i and undead}, and the watchword on a hit lays a bloodied Hellrider soul to rest. If Marshal Dunmere stood down she carries the {@b Banner of the First Charge} (allies in 30 ft. add a d4 and the first to drop stays at 1). If he was destroyed instead, Olanthius gives her the rank but not the banner: she has the {@b Captain's Oath} (the same, smaller and once).",
          "{@b Ser Lucan becomes} {@c ser-lucan-named|Ser Lucan, Named Among the Living} (CR 10): 162 HP, AC 20, takes the hit for his ward at half damage, can't be dropped twice a day, Shield Slam, and once a day {@b Ward of the Cold Line}: a 10-ft. circle fiends and undead can't walk into, for a minute. A piece of the Crypt he can carry.",
          "{@b Only one survived?} They get their own upgrade, and the scene is about the one who did not. Olanthius carves the dead one's name on the wall himself, correctly.",
          "{@b Crew sheets:} hand the players the new sheets (crew.html, ids {@b veska-banner-captain} and {@b ser-lucan-named}). The old ones still work for anything before the Crypt."
        ] },

        { t: "h", text: "Branch: Tiamat Wakes" },
        { t: "p", text: "If Or'Henn asked a dragon for help and a dragon took the curse (Vermilius, or the dragon in the orb with no cage), Tiamat wakes. Run it as the end of the session:" },
        { t: "read", text: "It is a small thing. Vermilius's head lifts, and every colour in the sky changes at once. The other dragons go still. Under your feet, under the cold stone, under the whole hot waste of Avernus, something very large turns over, slowly, and opens a great many eyes." },
        { t: "list", items: [
          "{@b The siege is over.} The dragons kneel. Arkhan smiles, for the first time, and means it.",
          "{@b Or'Henn is free of the curse and carries a hole where it was.} His player decides what that feels like.",
          "{@b Next session} Avernus shakes. The Monument is the centre of a storm. The Citadel's window shrinks. Run it from {@side world-state|The World Right Now}."
        ] },

        { t: "note", title: "Remember for Next Time", text: "Write down: how many souls were laid to rest (of 9), and how each trial ended (Clean, Hard-won, Forced). Which General's Memories Drenwal holds. Where the ward stopped. Which exit they used, and what it cost. Who holds the orb, or who has it now. Did the curse jump? Did the Gasp land? Is Lulu with Zariel's riders? Moonkite's bond points. The loot tier of each trial." }
      ]
    }
  ],

  side: {
    "arkhan-talks": {
      title: "Talking to Arkhan",
      blocks: [
        { t: "p", text: "{@c arkhan-the-cruel|Arkhan} is polite, patient and honest. He never lies and never strikes first at the door. Use these when the table wants a conversation." },
        { t: "list", items: [
          "{@b If asked what he wants:} \"The druid and the priest. The rest of you, I have no further use for.\"",
          "{@b If asked about the blood:} \"You poured my queen's blood into a dead giant. That was brave. I will not ask for it back. I will ask for something else.\"",
          "{@b If asked about the orb:} \"Keep it. Lamps are easily found once the people carrying them are dead.\"",
          "{@b If asked about Tiamat:} \"My queen is asleep. She dreams of a garden. Isn't that sweet.\"",
          "{@b If Or'Henn speaks:} he is gentle. Too gentle. He asks after the druid's cough.",
          "{@b If asked about the dragons:} \"They are my children by choice. They would rather be at home. So would I.\"",
          "{@b If Aurora speaks:} he asks about Moonkite, once. He does not push.",
          "{@b If Drenwal speaks:} he looks at the sigil and says nothing. A man who has worn the Hand knows what a leash costs. Before he turns away he asks one question: \"Which god answers you, priest?\"",
          "{@b If anyone insults him:} he smiles, and the ward gains a segment."
        ] },
        { t: "read", text: "\"I am not cruel,\" says Arkhan the Cruel, turning his rotting cheek into the light. \"I am hungry. There is a difference, and one day you will understand it.\"" }
      ]
    }
  }
};
