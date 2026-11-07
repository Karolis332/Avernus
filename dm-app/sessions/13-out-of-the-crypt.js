// Session 13: out of the Crypt of the Hellriders. Session 12 was played to the end of the Crypt (urns, riddles, trials, loot).
// Opens at the foot of the C1 stair with Arkhan outside. Wings at the Door, the Ways Out, the Breakout, Bhaal's First Gasp, Zariel Notices
// and the ending moved here from Session 12, with the siege creature overrides (tactics only) and the arkhan-talks side.
// New here: Uldrak's Cue and Tiamat's Curse: Scenarios. Arkhan's Gambit and Tiamat Reborn come from campaign-endgame.js.
// Creature ids: skarrix = Slarkas, vhennic = Vistalancer, mirelle = Vermilius, praxamor = Flash (campaign-tower.js).
window.SESSION = {
  id: "13-out-of-the-crypt",
  title: "Out of the Crypt",
  subtitle: "Session 13 · Descent into Avernus",
  summary: "The Crypt has given up its dead and its rewards. Now the party has to leave it. Arkhan, four tower dragons, Obatala and Krull wait at the top of the stair, and the ward that keeps them out is tired. Arkhan wants the party dead, Or'Henn alive, and the curse moved into a dragon that will take it. Uldrak is at Bel's Forge, one call away, with a blade that is not finished. There are seven ways out, and one of them is the kindest trap in Avernus.",

  party: [
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 13. Sigil of the Binding (Tier II). Carries the Shield of the Hidden Lord." },
    { id: "aurora", name: "Aurora", note: "Archfey Warlock 13. Rides Moonkite." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 13. Tiamat's curse: 0 gold scales. Carries the Soul Capacitor." }
  ],

  allies: [
    { id: "veska-banner-captain", name: "Veska, Banner-Captain", note: "After her Crypt upgrade (CR 10). Before it: veska." },
    { id: "ser-lucan-named", name: "Ser Lucan, Named Among the Living", note: "After his Crypt upgrade (CR 10). Before it: ser-lucan." },
    { id: "moonkite", name: "Moonkite", note: "Celestial mount." },
    { id: "olanthius", name: "Olanthius", note: "Stays in the Crypt, in C5." },
    { id: "lulu", name: "Lulu", note: "NOT here. On the Lady Vengeance, hidden in the mists." },
    { id: "jeremy", name: "Jeremy", note: "On the Lady Vengeance with Colico Jack." },
    { id: "lady-vengeance", name: "Lady Vengeance (Colico Jack)", note: "Hidden in the mists. AC 17 · HP 350 · DT 15" },
    { id: "uldrak", name: "Uldrak", note: "At Bel's Forge. Call him and he will hear. See Uldrak's Cue." }
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
        "Session 13. He cannot cross the cold line at the top of the 40-foot stair, and he does not try. He stands there, patient, and talks down the stairwell to the C1 gates. He is the siege.",
        "The vial of Tiamat's blood is spent: the party poured it into Uldrak. Or'Henn's curse is his last road to his queen. He wants the party dead, except two: Or'Henn alive as a hostage, and Drenwal alive to cast.",
        "His plan: take Or'Henn, Geas Drenwal into calling a gold dragon, and hold Fane-Eater at Or'Henn's throat until Or'Henn asks that dragon for help. The curse jumps and Tiamat wakes. See Arkhan's Plan in {@scene wings-at-the-door|Wings at the Door}.",
        "He keeps his word to the letter and never lies. The orb no longer buys anything from him. His one offer: \"Send me the druid and the priest, and the rest of you walk.\"",
        "He does not fight at the door. If the ward falls (6 of 6), he walks in with Krull and goes for Or'Henn, not the kill: Vecna's Grip, a grapple, then back up the stair. The fight is {@scene the-breakout|The Breakout}. It is not a fight to win: the exits are the win.",
        "If Uldrak appears, Arkhan bows to him, withdraws and does not fight. Tiamat has not given him leave."
      ]
    }),

    "skarrix": Object.assign({}, window.CAMPAIGN.creatures.skarrix, {
      tactics: [
        "Session 13. Slarkas (black) squats low on the west ash ridge, half sunk in a slurry of ash and his own acid, like a black dragon in a swamp. Sullen. He wants a fight and has been told no. The ward makes his old wound ache.",
        "If a PC steps over the cold line, he spits acid at the line itself to see who flinches.",
        "{@b Lure:} a Hellrider banner ({@c veska|Veska's}) in the doorway makes him break orders and charge it. That pulls him away from his post for 2 rounds: an opening for a way out.",
        "{@b Weakness:} radiant damage (Old Wound). The Sun Blade from the Urn Hoard, if they took it, hurts him more than anything else the party has.",
        "In a fight he bites first (Slow Melt), then stays on the one who is scraping acid off. Retreats below 60 hit points.",
        "As a group of one, he does not share an initiative; if two dragons attack together, they do."
      ]
    }),

    "vhennic": Object.assign({}, window.CAMPAIGN.creatures.vhennic, {
      tactics: [
        "Session 13. Vistalancer (blue) circles high and fast, tasting the ward with lightning. He is the one who reports to Arkhan.",
        "Strafes anyone who leaves the doorway with a Lance Dive, then climbs out of reach. He will chase a flying PC (Moonkite) for a mile.",
        "{@b Turn him:} he is Arkhan's ears and the easiest to peel off. Show him the odds (DC 18 Persuasion or Intimidation, advantage right after another dragon is hurt, or for sapphires). A turned Vistalancer \"misreports\" to Arkhan, which buys the party one ward segment.",
        "{@b Feed him lies:} whatever is said where he can hear reaches Arkhan next round.",
        "Leaves at half hit points (Clean Exit). If the orb moves, he follows it by the most direct route, but at a distance."
      ]
    }),

    "mirelle": Object.assign({}, window.CAMPAIGN.creatures.mirelle, {
      tactics: [
        "Session 13. Vermilius (green) sits nearest the cold line, wings folded, head tilted. She is the kindest voice outside.",
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
        "Session 13. Flash (red) perches on the Crypt's roof ridge and cannot enter. He is the proudest and the first to snap.",
        "Frightful Presence on anyone who looks up. Fire breath at the doorway if a PC steps out. He cannot hit the inside while the ward holds.",
        "{@b Bait him:} call him small, young or a hatchling and he attacks that PC alone, at once, before the others are ready (Prove It). Arkhan then has to spend Command the Line to call him back. That splits the siege.",
        "{@b His name:} a PC who calls him Praxamor gets one round of his attention. He has never been asked anything.",
        "Below half hit points he overheats and breathes more often. Retreats below 60 hit points, screaming, and is the first to come back."
      ]
    }),

    "obatala": Object.assign({}, window.CAMPAIGN.creatures.obatala, {
      tactics: [
        "Session 13. Obatala waits on the north hill with Krull on his back. He does not move unless Krull clicks his tongue.",
        "Cold breath at anything that crosses the line toward Krull. He is slow but he does not forget.",
        "Rider's Wing: attacks on Krull hit Obatala instead. Where he lands, the ground turns to steaming mud (Rimeground).",
        "{@b Turn Krull, turn him:} he goes wherever Krull goes (exit D, Krull's double-cross). He cannot be turned on his own.",
        "If the party flees, he is the one who follows, but he follows slowly."
      ]
    }),

    "krull": Object.assign({}, window.CAMPAIGN.creatures.krull, {
      tactics: [
        "Session 13. He rides Obatala and stays out of the line of fire. He prays, and he counts the minutes on the ward.",
        "He is the double-cross: he covets Arkhan's place, and a clever party can sell him what he wants. See {@scene the-ways-out|The Ways Out}, D.",
        "If Arkhan mocks him in front of the dragons, he notices. Only once, either way.",
        "If the ward falls, he enters behind Arkhan and casts blade barrier across the party's escape route, never at their feet."
      ]
    })
  },

  scenes: [
    // =====================================================================
    // 1 ADVENTURE PRIMER
    // =====================================================================
    {
      id: "adventure-primer",
      title: "Adventure Primer",
      when: "",
      duration: "10 minutes",
      blocks: [
        { t: "p", text: "Session 12 was played to the end of the Crypt: the urns, the riddles, the trials and the loot. This session starts as the party leaves. They climb the 40-foot stair in C1 to the door, and Arkhan is still outside. Nothing has happened at the door yet." },

        { t: "h", text: "At a Glance" },
        { t: "list", items: [
          "{@b 2 · Wings at the Door (30 min).} Arkhan's offer, where each dragon waits, the ward clock, Vermilius's kindness.",
          "{@b 3 · The Ways Out (40 min).} Seven exits, each with a cost. They only need one.",
          "{@b 4 · The Breakout (optional).} Only if they fight.",
          "{@b 5 · Uldrak's Cue.} The four ways the empyrean comes back, and what each one spends. Read before play.",
          "{@b 6 · Tiamat's Curse: Scenarios.} Every way the curse can move tonight, into whom, and what wakes. Read before play.",
          "{@b 7 · Arkhan's Gambit, 8 · Tiamat Reborn.} Only if Arkhan gets his ritual, or the curse jumps.",
          "{@b 9 · Bhaal's First Gasp. 10 · Zariel Notices,} and the news that Lulu is gone."
        ] },

        { t: "h", text: "What Happened Last Time" },
        { t: "p", text: "Read this to the players." },
        { t: "read", text: "You came to the Crypt of the Hellriders for a death knight's answer, and Drenwal's knock carried fifty miles. Arkhan the Cruel heard it. His wings came over the ridge as you went in, with four dragons, and Obatala, and old Krull on his back, and you shut the door on them.\n\nBelow, Olanthius gave you a shard of the Sword of Zariel and the road to the Scab. The urns in the long hall broke open, and the dead of the First Charge came out of them, wave after wave, the last of them under a banner that would not fall, until the hall was quiet. You answered the Crypt's riddles and stood its trials. In the Scales of Mercy you met Yael, who left the devil gate to save a child and lost the invasion for it, and whom Zariel, still an angel then, killed with her own hand. In the end you chose the insignia: Zariel's own verdict. And the Crypt, satisfied, gave up its rewards.\n\nNow the candles are behind you and the stair is in front of you. At the top is the door. Beyond the door, the wings are still circling." },

        { t: "h", text: "Check Before You Start" },
        { t: "list", items: [
          "{@b Who is present?} Drenwal, Aurora, Or'Henn, Moonkite, Veska and Ser Lucan. {@b Lulu is not here.} She is on the Lady Vengeance, hidden in the mists, with Jeremy and Colico Jack.",
          "{@b Where they stand.} At the foot of the 40-foot stair in C1. Olanthius stays behind in C5.",
          "{@b Loot.} Put Session 12's rewards on the sheets before play: the Urn Hoard, the grave goods, the Riders' Bequest and the trial loot. Note who holds the Sun Blade, if they took it: radiant is Slarkas's weakness (Old Wound).",
          "{@b Veska and Ser Lucan.} If they have not had their Crypt upgrade yet, run it at the wall of names on the way to the stair. It is in {@scene ending|Ending the Session}, Outcome: Veska and Ser Lucan Survived the Crypt.",
          "{@b Or'Henn is at 0 gold scales.} The curse is live. Inside the Crypt Tiamat is quiet; at the cold line the quiet thins. {@b DM ruling 2026-11-08:} the curse moves only if the dragon he asks {@b willingly takes it}.",
          "{@b The vial is spent.} It raised Uldrak in Session 10. Arkhan knows, and it is why he wants them dead.",
          "{@b The orb.} The party holds the Orb of Dragonkind, and Arkhan can feel it.",
          "{@b The Crypt's ward} is where Session 12 left it. See {@scene wings-at-the-door|Wings at the Door} for what ticks it.",
          "{@b Uldrak} is at Bel's Forge. Read {@scene uldraks-cue|Uldrak's Cue} before play.",
          "The wider world is in {@side world-state|The World Right Now}."
        ] }
      ]
    },

    // =====================================================================
    // 2 WINGS AT THE DOOR
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
          "{@b Why a gold dragon.} The curse moves only when Or'Henn asks a dragon for help, meaning it, {@b and that dragon willingly takes the curse} (DM ruling 2026-11-08). The second half is the catch. Or'Henn will never mean it to one of Arkhan's chromatic dragons. A gold dragon, called by his friend, with Fane-Eater at his throat, is the one dragon he might ask, and the one dragon good enough to say yes to save him."
        ] },
        { t: "read", text: "\"I will make you one offer,\" says Arkhan, \"because I am not a brute. Send me the druid and the priest. The rest of you walk out of that door, and none of mine will touch you.\"\n\nHe lets that sit.\n\n\"Or wait. The ward is tired. You can hear it, can you not? Every hour a little lower. And I have waited a century for less.\"" },

        { t: "more", title: "Arkhan's Plan: the Hostage and the Gold Dragon", src: ["Homebrew", "SRD (spells)"], blocks: [
          { t: "steps", items: [
            "{@b Take the hostage.} Or'Henn by choice. Any PC will do if it makes Or'Henn ask, because the asking can be for someone else. Arkhan can only take someone who comes past the cold line, or after the ward falls. Vecna's Grip (DC 22 Constitution, restrained and silenced) holds them, then he carries them back up out of the stair.",
            "{@b Bind the priest.} He casts {@spell geas} on Drenwal (DC 22 Wisdom): call a gold dragon. Acting against it costs 5d10 psychic damage, once a day. If the Geas fails, the blade at the hostage's throat is the order instead.",
            "{@b The call.} Drenwal's 6th-level spell is {@spell planar ally}. By the rules it brings a celestial, an elemental or a fiend, so a gold dragon is a DM's ruling: Drenwal's god sends one, because a priest is begging. Divine Intervention also works if it lands (13% at level 13).",
            "{@b The ask.} The gold dragon arrives over a dying friend. Arkhan holds the hostage at the edge of death and says one word to Or'Henn: \"Ask.\" If Or'Henn asks the gold dragon for help and means it, and the gold dragon willingly takes the curse to save him (it will, unless someone has told it what the curse is), the curse jumps to the gold dragon, and Tiamat wakes in her true form. Run Branch: Tiamat Wakes in {@scene ending|Ending the Session}."
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
    // 3 THE WAYS OUT
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
          { t: "p", text: "{@b Cost.} It spends his endgame promise. He will not be at the Citadel or at the final fight with Tiamat. Tiamat noticed him. Arkhan holds a grudge for a century. Tell the players this before they call." },
          { t: "p", text: "{@b All four cues, and the unfinished blade:} {@scene uldraks-cue|Uldrak's Cue}." }
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
          { t: "p", text: "{@b Alternative (the cage loophole).} If Small Vision row 2 came up, a clever player may ask the dragon {@i inside the orb.} See {@side arc-tiamat|Arc: Or'Henn and Tiamat} (DM's Choice: The Dragon in the Orb). The recommended result is the orb becomes a gold cage. The curse leaves Or'Henn, Tiamat wakes only halfway, and Arkhan would burn Avernus to own the orb." },
          { t: "p", text: "{@b Every way the curse can move tonight:} {@scene tiamats-curse|Tiamat's Curse: Scenarios}." }
        ] },

        { t: "note", title: "Combining Exits", text: "Exits stack. A common good answer: the Last Ride clears the lane, the Lady Vengeance picks them up, Uldrak waits as the last resort. The Orb run can go with either. Giving Arkhan the orb (E) closes A and the cage loophole. Let them combine, and add the costs together." },

        { t: "choices", prompt: "Which way?", items: [
          { label: "They fight their way out", goto: "the-breakout" },
          { label: "They get out clean", goto: "bhaals-first-gasp" }
        ] }
      ]
    },

    // =====================================================================
    // 4 THE BREAKOUT
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
    // 5 ULDRAK'S CUE
    // =====================================================================
    {
      id: "uldraks-cue",
      title: "Uldrak's Cue",
      when: "Read before play. It fires on any of the four cues below.",
      duration: "reference",
      blocks: [
        { t: "p", text: "{@c uldrak|Uldrak} (CR 23), the empyrean the party raised with Tiamat's blood, is at Bel's Forge having Gnashing Hunger reforged into a blade that can kill a god ({@side uldraks-errand|Uldrak's Errand}). His promise: \"When you go up against her, call me. I will hear.\" He comes back on one of four cues, and each one spends something." },

        { t: "table", caption: "When Uldrak comes", head: ["Cue", "What sets it off", "He arrives", "The blade", "What it costs"], rows: [
          ["1 · Called at the door", "Exit C: his coin, or a shout to the sky", "2 rounds later, on the ridge", "Unfinished", "His promise. He will not be at the Citadel or the last fight. Tiamat noticed him."],
          ["2 · The orb calls him", "Someone uses the orb while the party is losing", "1d4 rounds later", "Unfinished", "As cue 1. Arkhan feels the orb reach out and knows whom it reached for."],
          ["3 · Tiamat wakes", "The curse jumped, or Arkhan's Gambit finished", "Round 3 of Tiamat Reborn, or when the first PC drops to 0 HP", "Finished: Gnashing Hunger", "Bel's price: when Tiamat falls, Uldrak marches on Zariel."],
          ["4 · Nobody calls", "The party gets out without him", "Not tonight", "Finished, later", "Nothing. His promise is kept for the Citadel or the last fight."]
        ] },

        { t: "read", text: "First the ridge goes quiet. Then the red sky splits along a seam of white heat, and something as tall as a tower steps through it, still smoking from the forge. Uldrak's hair is full of ash. At his hip hangs a blade of black iron, glowing at the edge like metal straight from the fire, and somewhere inside it, very softly, something laughs.\n\n\"You called,\" he says. \"I heard.\"" },

        { t: "h", text: "What He Does When He Lands" },
        { t: "list", items: [
          "{@b Arkhan withdraws.} He bows, all courtesy, and steps back from the line. With the vial spent he will not fight an empyrean at the door.",
          "{@b The dragons scatter or test him.} Vistalancer leaves ({@b Clean Exit}). Flash stays to prove himself ({@b Prove It}). The rest fall back to Arkhan and Krull.",
          "{@b He hunts dragons.} Tiamat's blood is in him, and it wants her children dead. Each round he goes for the nearest chromatic dragon unless the party asks him not to.",
          "{@b He will kill the marked dragon.} If the curse has jumped, he goes straight for the dragon that holds it, because killing dragons is what he came back for. Tell the players he is about to. What its death wakes is in {@scene tiamats-curse|Tiamat's Curse: Scenarios}.",
          "{@b The Voice.} With either blade in hand, on a natural 1 he makes a DC 18 Wisdom save or attacks the nearest creature, friend or foe."
        ] },

        { t: "more", title: "The unfinished blade (proposal, DM to rule)", src: ["Homebrew"], blocks: [
          { t: "p", text: "Uldrak's Errand gives the finished blade only in Tiamat Reborn. Called early, the forge work is cut short. Bel lets him go, and the debt still stands." },
          { t: "list", items: [
            "{@b Unfinished:} +17 to hit, reach 15 ft. Hit: 39 (6d12) slashing. No necrotic, and no Godsbane: it does not ignore immunities. No Drinker. The Voice is already in it.",
            "{@b Finished (Gnashing Hunger):} the full blade in {@side uldraks-errand|Uldrak's Errand}: +27 (6d8) necrotic, Godsbane, Drinker, and the Catch (a killing blow on Tiamat Risen destroys her for good)."
          ] }
        ] },

        { t: "choices", prompt: "Uldrak is here.", items: [
          { label: "The siege breaks", goto: "bhaals-first-gasp" },
          { label: "The curse is moving", goto: "tiamats-curse" }
        ] }
      ]
    },

    // =====================================================================
    // 6 TIAMAT'S CURSE: SCENARIOS
    // =====================================================================
    {
      id: "tiamats-curse",
      title: "Tiamat's Curse: Scenarios",
      when: "Read before play. Use it the moment anyone offers Or'Henn help, or Arkhan reaches for him.",
      duration: "reference",
      blocks: [
        { t: "p", text: "Or'Henn's curse is Arkhan's last road to his queen. It moves only when Or'Henn asks a dragon for help, meaning it, {@b and that dragon willingly takes it} (DM ruling 2026-11-08). Below is every way it can move tonight, into whom, and what wakes." },
        { t: "note", title: "The Rule in One Line", text: "Ask, and a willing dragon = the curse jumps. That dragon becomes the door. When it dies, Tiamat wakes. Force never works: an unwilling dragon cannot take the curse, and Arkhan cannot make one." },

        { t: "table", caption: "How the curse can move", head: ["Scenario", "How it starts", "Who takes it", "What wakes", "How the party stops it"], rows: [
          ["A · Vermilius's kindness", "Exit X: she offers, gently, to carry it for him", "Vermilius. She wants it.", "Tiamat, when Vermilius dies", "Or'Henn says no. Telegraph the lean of the mark first."],
          ["B · The hostage and the gold dragon", "A hostage past the cold line, Geas on Drenwal, Planar Ally brings a gold dragon", "The gold dragon, to save a friend", "Tiamat, in the body of a good dragon", "Drenwal fails the casting or prays for anything but a dragon; someone warns the gold dragon; Or'Henn refuses."],
          ["C · Arkhan's Gambit", "The fight turns on Arkhan. The Hand of Vecna draws the curse out (DC 22 Charisma).", "Vermilius, bound by the thread", "Tiamat Risen, when Fane-Eater kills her on Arkhan's turn 3", "Pass the save. Cut the thread (AC 20, 30 HP, radiant or force only). Move Vermilius 30+ ft. away. Kill her before turn 3: the curse snaps back at Pull 8."],
          ["D · A second vessel", "Vermilius is dead before the sacrifice", "Flash would volunteer. Slarkas and Vistalancer would not.", "As C", "As C. Or talk Flash out of it: he wants to prove himself, not to die."],
          ["E · The dragon in the orb", "Or'Henn asks the dragon inside the orb (Small Vision row 2)", "The orb's dragon", "Tiamat, only halfway; the orb becomes a gold cage", "It is their choice. Arkhan will burn Avernus to own that orb afterwards."],
          ["F · He never asks", "—", "No one", "Nothing tonight. The Pull keeps rising.", "This is the win. A dying man who will not ask is the bravest thing in the session."]
        ] },

        { t: "h", text: "Running It" },
        { t: "list", items: [
          "{@b Telegraph the ask.} The moment before Or'Henn speaks, he feels the mark lean toward the dragon like a hand reaching out. If he speaks anyway, enforce it. What counts as asking is in {@side if-the-curse-jumps|If the Curse Jumps}.",
          "{@b Let the table hear the yes.} The dragon has to accept, out loud. Vermilius: \"Of course, little one. Give it here.\" A gold dragon: \"I will carry it. Let him go.\" That is the moment the door opens.",
          "{@b The pressure.} {@side tiamats-pull|Tiamat's Pull} (Wisdom save, DC 10 + Pull) rises at the cold line. Vermilius's {@b Honeyed Voice} is built for this.",
          "{@b If it jumps,} run {@side if-the-curse-jumps|If the Curse Jumps}. Uldrak's cue 3 fires in round 3 of the fight.",
          "{@b When she wakes,} each dragon at first sight makes the {@side tiamats-dominion|Tiamat's Dominion} save (DC 20 Wisdom): kneel to her, or choose."
        ] },

        { t: "note", title: "Open Ruling: True Form or Half-Born", text: "Our prep says both. Exit X and {@side if-the-curse-jumps|If the Curse Jumps} say she wakes in her true form (not a fight). Arkhan's Gambit and the Compass say an adult vessel brings her only half-born, as {@c tiamat-risen|Tiamat Risen} (CR 24, a fight). {@b Proposal:} how the door dies decides it. Killed before the curse burns it out = she is dragged through half-born, as Tiamat Risen. Left until the curse burns it out at dawn = she walks through whole, in her true form. Then Uldrak's urge to kill the marked dragon is the party's best chance, not a mistake. DM to rule." },

        { t: "choices", prompt: "The curse...", items: [
          { label: "Arkhan starts his ritual", goto: "arkhans-gambit" },
          { label: "It jumped and the vessel is dying", goto: "tiamat-reborn" },
          { label: "It did not move", goto: "bhaals-first-gasp" }
        ] }
      ]
    },

    Object.assign({}, window.CAMPAIGN.scenes["arkhans-gambit"], { when: "If the fight at the door turns against Arkhan (Scenario C)" }),
    Object.assign({}, window.CAMPAIGN.scenes["tiamat-reborn"], { when: "If Arkhan finishes the Offering, or the curse jumped and the vessel dies" }),

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
    // 9 ENDING
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
