// Session 10: the Styx run, the Sibriex (optional), Uldrak's Grave, and the dragons the party calls.
// Tower dragons + Krull come from sessions/campaign-tower.js; this file overrides only their tactics.
window.SESSION = {
  id: "10-the-styx-run",
  title: "The Styx Run",
  subtitle: "Session 10 · Descent into Avernus",
  summary: "The party runs the River Styx to Uldrak's Grave and spills Tiamat's blood to free the empyrean, even though that same vial was Or'Henn's only safe cure. Restored, Uldrak joins them, and they use the orb of dragonkind in his sword to call Arkhan's dragons to the Grave and kill them. The dragons come in waves, Krull comes with an offer, and one of the dragons knows exactly what Or'Henn's mark is for. On the way, if they stop, the chained sibriex.",

  party: [
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 13. Sigil of the Binding drawn (Tier II); only the kinslaying remains. Carries the Shield of the Hidden Lord." },
    { id: "aurora", name: "Aurora", note: "Archfey Warlock 13 (Mystic Arcanum 7th). Rides the celestial Moonkite." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 13. Afflicted with Tiamat's curse. Carries the Soul Capacitor." }
  ],

  allies: [
    { id: "veska", name: "Veska", note: "Hellrider" },
    { id: "ser-lucan", name: "Ser Lucan the Reforged", note: "ally" },
    { id: "jeremy", name: "Jeremy", note: "Runs the Planar Core; Colico Jack flies the ship" },
    { id: "lulu", name: "Lulu", note: "Hollyphant. HER MEMORY IS A CAMPAIGN PREREQUISITE -- see the warning in scene 1." },
    { id: "moonkite", name: "Moonkite", note: "Celestial mount, Aurora's companion" },
    { id: "lady-vengeance", name: "Lady Vengeance (Colico Jack)", note: "AC 17 · HP 350 · DT 15" },
    { id: "uldrak", name: "Uldrak", note: "Empyrean, from Uldrak's Grave on. CR 23 ally." }
  ],

  creatures: {

    "sibriex": {
      name: "The Sibriex",
      kind: "sibriex",
      role: "A chained flesh-sculptor that wants to be let down",
      source: { page: "bestiary", name: "Sibriex", src: "MTF" },
      homebrew: "Stats as the party's own encounter table: AC 19, HP 150, CR 18, Squirt Bile, Warp Creature, 3 legendary actions. Campaign change: the Haruman errand that once justified this site is already spent (the trophy supplied the piece), so the sibriex is no longer a quest-giver. It is a temptation, and it has read what rides in Or'Henn's blood.",
      npc: true,
      sizeType: "Large fiend (demon), chaotic evil",
      description: "A vast bloated head the size of a cart, hanging in rusted chains over a pit of its own leavings. No body worth the name: a sagging mass of folds, a lipless mouth, and long thin arms that end in fingers far too delicate for something so huge. Flesh it has shaped lies heaped below -- things with too many joints, still breathing. It smells of vinegar and birth.",
      roleplay: [
        "Appearance: a head in chains, eyes like wet stones, the skin running with pale bile.",
        "Voice: slow, wet, amused. Never raises it. Uses the plural 'we' for itself.",
        "Wants: down. Only that. Everything it offers is rent toward that one end.",
        "Knows: how to read a memory out of dead flesh. How curses ride in blood, because it writes them into flesh for a living.",
        "Sample line: \"Ahh. The old lizard carries a queen's debt in him. We can smell her signature. We know that hand, little druid. We have copied it.\"",
        "Sample line: \"Let us down and we will tell you. We will even tell you true. We have no reason to lie to the short-lived.\"",
        "Never: begs. It has been here a long time and expects to be here longer."
      ],
      ac: 19, acNote: "unnatural resilience",
      hp: 150,
      cr: "18", xp: 20000,
      tactics: [
        "Opens with Warp Creature on whoever looks most physically perfect (Aurora or Moonkite).",
        "Squirt Bile at 120 ft. against anyone trying to cut the chains.",
        "Never pursues: it cannot. It fights to make leaving expensive, not to win.",
        "Legendary actions: a Bile squirt, or a Warp against a creature that moved within 60 ft."
      ]
    },
    "uldrak-devil": {
      name: "Uldrak (cursed)",
      kind: "spined-devil",
      role: "A spined devil who swears he is an empyrean. He is telling the truth",
      source: { page: "bestiary", name: "Spined Devil", src: "MM" },
      homebrew: "Book NPC. Tiamat turned the empyrean Uldrak, son of Surtur, into a spined devil when he came to Avernus to kill her. He has held this form for three thousand years. Book cure, kept in this campaign: her blood spilled on the ground of Avernus.",
      npc: true,
      sizeType: "Small fiend (devil), lawful evil (in body only)",
      description: "A spined devil no bigger than a child, crouched on the crossguard of a sword the size of a tower. Its tail bristles with quills. Its eyes are wrong for a devil: they are tired, patient and very, very old.",
      roleplay: [
        "Appearance: a scrawny winged devil with a quilled tail. He sits on his own sword's crossguard as if it were a throne he has outgrown.",
        "Voice: a thin devil's rasp, but the words are slow and grand, like a king speaking through a keyhole. He hates the sound of it.",
        "Wants: the vial. He smelled it before the ship came round the bend. He will not grovel for it, and it costs him everything not to.",
        "Knows: Tiamat's tricks, because she played one on him. How the orb in his pommel works. That Arkhan's dragons hunt this stretch of river.",
        "Sample line: \"I came here to kill a god. She made me small instead. Three thousand years I have been small. Pour it, and you will see what I was.\"",
        "Sample line: \"Do not pity me. Pour.\""
      ]
    },

    "uldrak": {
      name: "Uldrak",
      kind: "uldrak",
      role: "Empyrean, son of Surtur, restored. Fights beside the party",
      source: { page: "bestiary", name: "Empyrean", src: "MM" },
      homebrew: "MM empyrean at full strength. His maul is his gargantuan sword: same numbers, slashing damage. The orb of dragonkind sits in its pommel.",
      npc: false,
      sizeType: "Huge celestial (titan), chaotic good",
      ac: 22, acNote: "natural armor",
      hp: 313, hpFormula: "19d12 + 190",
      speed: "50 ft., fly 50 ft., swim 50 ft.",
      abilities: { str: 30, dex: 21, con: 30, int: 21, wis: 22, cha: 27 },
      saves: "Str +17, Int +12, Wis +13, Cha +15", skills: "Insight +13, Persuasion +15",
      vulnerable: "", resist: "", immune: "bludgeoning, piercing, and slashing from nonmagical attacks", condImmune: "",
      senses: "truesight 120 ft., passive Perception 16",
      languages: "all",
      cr: "23", xp: 50000, pb: 7,
      traits: [
        { name: "Innate Spellcasting", text: "Charisma (spell save DC 23, +15 to hit). At will: {@spell greater restoration}, {@spell pass without trace}, {@spell water breathing}, {@spell water walk}. 1/day each: {@spell commune}, {@spell dispel evil and good}, {@spell earthquake}, {@spell fire storm}, {@spell plane shift}." },
        { name: "Legendary Resistance (3/Day)", text: "If Uldrak fails a saving throw, he can choose to succeed instead." },
        { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
        { name: "Magic Weapons", text: "His weapon attacks are magical." }
      ],
      actions: [
        { name: "Sword", text: "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 31 (6d12 + 10) slashing. If the target is a creature, it must succeed on a DC 15 Constitution saving throw or be stunned until the end of Uldrak's next turn." },
        { name: "Bolt", text: "Ranged Spell Attack: +15 to hit, range 600 ft., one target. Hit: 24 (7d6) acid, cold, fire, force, lightning, radiant or thunder damage (his choice)." }
      ],
      bonus: [], reactions: [],
      legendary: {
        count: 3,
        intro: "Uldrak can take 3 legendary actions, one at a time, at the end of another creature's turn. He regains spent legendary actions at the start of his turn.",
        actions: [
          { name: "Attack", cost: 1, text: "Makes one attack." },
          { name: "Bolster", cost: 1, text: "Every creature friendly to him within 120 ft. can't be charmed or frightened, and has advantage on ability checks and saving throws, until the end of his next turn." },
          { name: "Trembling Strike", cost: 2, text: "Strikes the ground with his sword. Every other creature on the ground within 60 ft. must succeed on a DC 25 Strength saving throw or be knocked prone. This includes the party." }
        ]
      },
      tactics: [
        "First legendary action of the fight: Bolster, at the end of the first dragon's turn. It cancels Frightful Presence for everyone near him.",
        "He wants Flash, the red, first: \"Her favourite colour.\" Then whichever dragon is hurting the party most.",
        "Bolt type matters. Never fire at Flash, lightning at Vistalancer, acid at Slarkas, poison at Vermilius or cold at Obatala. When in doubt: force or radiant.",
        "Trembling Strike knocks the party prone too. He only uses it when no friend is on the ground within 60 ft., and he warns them first: \"Off the ground!\"",
        "At will, between rounds or after the fight: {@spell greater restoration} on anyone the Styx has touched. That brings the memories back.",
        "He does not flee. He has waited three thousand years. Below 80 hit points he fights on, and the dragons smell it and pile on him. Losing him loses the party's endgame ally."
      ],
      description: "Where the devil was, a giant stands up out of the ash. He is twenty feet tall, bronze-skinned, with veins of slow fire under the skin and a beard like a forge's smoke. He pulls the sword out of the ground with one hand, and for the first time in three thousand years it fits him.",
      roleplay: [
        "Appearance: a bronze giant with fire under his skin. He keeps touching his own face, as if checking it is still there.",
        "Voice: deep and warm and much too loud. He laughs easily now.",
        "Wants: to kill something of hers before he goes home. He has a long list and Arkhan's dragons are at the top of it.",
        "Knows: Tiamat laid the curse, so only her blood could lift it. That is also why {@spell greater restoration} will not touch Or'Henn's mark. If asked, he tries anyway, and tells them so when it fails.",
        "Sample line: \"Call them. Call all of them. I would like to be big at someone.\""
      ]
    },

    "praxamor": Object.assign({}, window.CAMPAIGN.creatures.praxamor, {
      tactics: [
        "Session 10. Wave 1: arrives first and alone, furious at being yanked across the waste by a call it could not refuse.",
        "Lands on the sword's crossguard and roars: Frightful Presence on everyone in sight.",
        "Fire breath at the orb's holder and whoever stands near them. The orb itself shrugs off dragon breath.",
        "Then it duels Uldrak. It wants to be the dragon that killed Tiamat's oldest enemy.",
        "Below 60 hit points, it breaks off and flies home to the red spire."
      ]
    }),

    "skarrix": Object.assign({}, window.CAMPAIGN.creatures.skarrix, {
      tactics: [
        "Session 10. Wave 2: comes up the Styx underwater (swim 40 ft.). Nobody sees it until it surfaces at the bank.",
        "Surfacing: every creature within 15 ft. of where it breaks the water makes a DC 13 Dexterity save or the Styx touches their skin (DC 15 Intelligence save, see the river rule in The Call).",
        "Bite on anyone standing within 10 ft. of the water: on a hit, it drags them 10 ft. toward the river. If that takes them in, they are in the Styx. You warned them in the setup; this is the find-out.",
        "Acid breath down the length of the bank.",
        "Below 50 hit points, it dives and is gone."
      ]
    }),

    "mirelle": Object.assign({}, window.CAMPAIGN.creatures.mirelle, {
      tactics: [
        "Session 10. Wave 2, with Slarkas, but it hangs back over the water and TALKS first.",
        "THE BAIT. It smells Tiamat's mark on Or'Henn and speaks to him in Draconic: \"Little cousin. That mark is killing you. I can help.\" If Or'Henn asks it for help, or accepts, the curse jumps. See {@side if-the-curse-jumps|If the Curse Jumps}.",
        "If he refuses, it shrugs and breathes poison into the thickest knot of characters.",
        "It lies about everything else, all the time, for fun.",
        "Coward: first to flee, at 80 hit points."
      ]
    }),

    "vhennic": Object.assign({}, window.CAMPAIGN.creatures.vhennic, {
      tactics: [
        "Session 10. Wave 3: burrows the last stretch (burrow 30 ft.) and erupts out of the ash under the party's position.",
        "Eruption: every creature within 10 ft. makes a DC 18 Dexterity save or is knocked prone.",
        "Lightning breath along a line that catches the ship's gun deck and a character together.",
        "Goes after the gun crews to silence the cannons. It hates the ship most.",
        "Below 50 hit points, it flies off low and fast."
      ]
    }),

    "obatala": Object.assign({}, window.CAMPAIGN.creatures.obatala, {
      tactics: [
        "Session 10. Wave 4: arrives last, high and slow, with Krull on its back.",
        "It does nothing until Krull has spoken. See {@side krulls-offer|Krull's Offer}.",
        "If it comes to a fight: cold breath on Uldrak and whoever stands with him, then claws on anyone who goes for Krull.",
        "It fights until Krull says stop, or until it is bloodied. Then it carries him home."
      ]
    }),

    "krull": Object.assign({}, window.CAMPAIGN.creatures.krull, {
      tactics: [
        "Session 10. Parley first, from Obatala's back, out of reach: {@side krulls-offer|Krull's Offer}.",
        "If refused: {@spell blade barrier} across the party's line, then {@spell fire storm} on clustered characters. Heals dragons with {@spell mass cure wounds} only if two or more are bloodied.",
        "He wants the orb more than he wants anyone dead. If someone drops it, he sends Obatala for it.",
        "When Obatala is bloodied, he leaves. He does not die for Arkhan."
      ]
    })

  },

  scenes: [
    {
      id: "adventure-primer",
      title: "Adventure Primer",
      when: "",
      duration: "5 minutes (read before play)",
      banner: "art/official/young-red-dragon.webp",
      blocks: [
        { t: "p", text: "This session is designed for the three 13th-level characters of this campaign: Drenwal, Aurora and Or'Henn, with their allies Veska, Ser Lucan, Jeremy, Lulu and Moonkite, and Colico Jack at the helm of the Lady Vengeance. It runs about four to five hours. It is a journey down the River Styx, a gift that costs more than the players know, and the biggest fight of the campaign so far: five of Arkhan's dragons, called down on purpose." },
        { t: "note", title: "Tell the Players Before You Start", text: "Say this out of character, before the first scene: \"The Styx steals memories. Anything that touches the water can lose who it is. And calling five dragons to you is the most dangerous plan you have ever made. Characters can die here, and stay dead.\"" },

        { t: "h", text: "Background" },
        { t: "p", text: "Last session the party stole a vial of Tiamat's living blood from {@c arkhan-the-cruel|Arkhan the Cruel} at the Monument to Tiamat, and escaped by {@spell word of recall}. Drenwal's sanctuary is the statue of St. Cuthbert on the Lady Vengeance, so the spell carried all three of them straight back to their own deck. Nobody was left behind." },
        { t: "p", text: "They mean to spend the vial at Uldrak's Grave. {@c uldrak-devil|Uldrak} is an empyrean, a son of the fire giant god Surtur. Three thousand years ago he came to Avernus to kill Tiamat. She turned him into a spined devil instead. Her blood, spilled on the ground of Avernus, breaks that curse." },
        { t: "p", text: "The vial is also the only safe cure for the curse Tiamat laid on Or'Henn at the Monument. That curse pushes him to ask a dragon for help. When he does, it jumps into the dragon, and when the dragon dies, Tiamat comes through. The players do not know the vial could save him. The {@c sibriex|sibriex} will tell them if they stop to listen. So will the vial itself." },
        { t: "p", text: "Set in the pommel of Uldrak's sword is an {@item Orb of Dragonkind|DMG}. It calls evil dragons. The party's plan is to free Uldrak, then use the orb to call Arkhan's dragons to the Grave and kill them with an empyrean on their side." },

        { t: "h", text: "Overview" },
        { t: "p", text: "This session has eight scenes and takes about four to five hours to play. The Sibriex happens only if they stop at the gorge. The Call and Wings Over the Grave happen only if they call the dragons, which is their plan. The Ending always runs." },
        { t: "list", items: [
          "{@b Where We Left Off} (5 minutes). Word of Recall drops the party at the foot of St. Cuthbert's statue on their own deck, with the vial.",
          "{@b The Styx Run} (20 to 30 minutes). Down to the river and along it, with Arkhan's dragons hunting somewhere behind. Lulu must stay dry.",
          "{@b The Sibriex} (35 to 50 minutes). Optional. A chained flesh-sculptor smells Or'Henn's curse and explains it for free.",
          "{@b Uldrak's Grave} (30 to 45 minutes). The vial is poured, and an empyrean stands up out of the ash.",
          "{@b The Call} (20 to 30 minutes). Setting the trap, then calling the dragons with the orb.",
          "{@b Wings Over the Grave} (90 to 120 minutes). Five dragons in four waves, and Krull with an offer.",
          "{@b Ending the Session} (10 minutes). What it cost, and who comes back for revenge."
        ] },

        { t: "h", text: "Adventure Hooks" },
        { t: "p", text: "{@b Uldrak's curse.} The party chose this road at the end of last session: run the Styx, pour the blood, free the empyrean. They are skipping the Stygian Dock." },
        { t: "p", text: "{@b Arkhan's dragons.} Since the theft, Arkhan has had his four adult dragons and Obatala quartering the Styx for the Lady Vengeance. The party knows they are out there. They have decided to stop running and pick the ground themselves." },
        { t: "p", text: "{@b Or'Henn's mark.} Tiamat's curse is a clock. Every dragon they call is a dragon Or'Henn might ask for help. One of them will offer." },

        { t: "h", text: "Where things stand" },
        { t: "list", items: [
          "The party is 13th level. Aurora is an Archfey Warlock with a 7th-level Mystic Arcanum.",
          "Arkhan the Cruel is their enemy, and he knows their faces.",
          "The vial of Tiamat's blood is in their hands. It is warm, it moves, and it whispers in Draconic.",
          "Or'Henn carries Tiamat's curse, and the Soul Capacitor with Asimov's soul inside.",
          "Drenwal has drawn the Sigil of the Binding in Dumal's blood. Only the kinslaying remains.",
          "The Gith monk is dead. His journal is aboard.",
          "Colico Jack flies the Lady Vengeance. Jeremy runs her Planar Core.",
          "Elturel still hangs in the sky on its chains, sinking toward the Styx.",
          "Krull: this session assumes he is alive and still serves Arkhan. If he died at the Monument, Obatala comes alone and there is no offer."
        ] },
        { t: "note", title: "Running This Session", text: "Read the brown boxes in order and you can run most of the session from them. The DM text around each box tells you what to do next. Side paths (the links that open on the right) hold the extra detail: the sibriex's offers, using the orb, Krull's offer, and what happens if the curse jumps. Open them only when the table goes there." }
      ]
    },

    {
      id: "where-we-left-off",
      title: "Where We Left Off",
      when: "",
      duration: "5 minutes",
      blocks: [
        { t: "p", text: "The session opens on the deck of the Lady Vengeance, the moment Word of Recall lands." },
        { t: "read", text: "One moment: the dragon skull's maw, the black Hand rising, Arkhan's voice behind you like a furnace door opening.\n\nThe next: silence, and the smell of tar and hot brass.\n\nYou are standing on your own deck at the foot of the statue of St. Cuthbert, all of you, breathing hard. The vial is warm in someone's fist. Inside the glass, the blood turns over by itself.\n\nAt the wheel, Colico Jack takes one look at your faces and does not ask. He throws the helm hard over and opens the throttle, and the whole ship shudders as she climbs.\n\n\"Where to?\" he shouts over the engines. \"And how fast?\"" },
        { t: "p", text: "Let them breathe, heal and argue for a minute. They have already chosen: the Styx, then Uldrak's Grave. When they give Jack the course, go to {@scene the-styx-run|The Styx Run}." }
      ]
    },

    {
      id: "the-styx-run",
      title: "The Styx Run",
      when: "",
      duration: "20 to 30 minutes",
      blocks: [
        { t: "p", text: "The Lady Vengeance flies from the Monument to the River Styx and follows it downstream to Uldrak's Grave. This scene is the journey. Read the boxes in order, and skip any you need to for time." },
        { t: "note", title: "Running This Scene", text: "Two things matter here. Lulu must stay dry: her full memory is needed to free the Caged Star, and the Caged Star is where Drenwal's rebirth happens. And the Styx steals memories on contact. In the second event, make the players decide out loud how Lulu travels. Do not tell them why it matters." },

        { t: "h", text: "Event: Behind Them" },
        { t: "read", text: "Far behind the ship, where the Monument's skull is shrinking into the haze, five specks lift into the sky.\n\nThey circle once over the mountain, tight and angry. Then they split apart, each one going its own way, the way hounds split when they have lost a scent.\n\nOne of them is very large, and very pale." },
        { t: "p", text: "Arkhan's dragons are hunting. They lose the ship in the ash, but the players should know they are out there. That is what makes the orb, later, feel like a choice instead of a gift." },

        { t: "h", text: "Event: Where Does Lulu Ride?" },
        { t: "p", text: "Ask the table, plainly: \"Where does Lulu ride for this trip?\"" },
        { t: "read", text: "Lulu has her trunk over the rail and her ears straight out, watching the waste slide past.\n\n\"A river!\" she says. \"I remember a river like this. No, I don't. Maybe I do. Can I see it? I want to see it.\"" },
        { t: "list", items: [
          "{@b Below decks:} safe from everything in this scene. She sulks.",
          "{@b On deck, held or kept close:} she is safe as long as whoever holds her makes their saves. If they fail, she fails.",
          "{@b At the rail, free:} she is exposed to every spray. This is the choice that should hurt later, and only later."
        ] },

        { t: "h", text: "Event: The River Styx" },
        { t: "read", text: "The Styx is wider than you remembered, and slower. It does not look like water. It looks like oil poured over glass, black and smooth, and it moves without a single ripple.\n\nThings drift in it. A helmet. A child's shoe. A door, still on its hinges. Here and there, just under the surface, a face turns up toward the ship as you pass, eyes open, mouth working, trying to remember a word.\n\nThere is no smell. There is no sound. Only, if you listen, a whisper, very far down, like a crowd of people all saying their names at once so they will not forget them." },
        { t: "p", text: "Colico Jack flies her low, below the ash, ten feet over the water. Any lower and the spray reaches the deck." },

        { t: "h", text: "Event: The Ferry" },
        { t: "read", text: "A barge comes upriver toward you out of the murk, long and flat and black, with a single lantern on a pole at the stern.\n\nThe thing poling it is tall and thin and wrapped in grey cloth, with an insect's mouth under its hood. It does not move aside for a warship. It does not need to.\n\nAs you pass above it, it raises the lantern and looks up at you with great patience.\n\n\"Wrong way,\" it says, in a voice like dry leaves. \"The dragons have been up and down this water since yesterday. Looking for a ship. Your ship, I think.\"\n\nIt goes on poling. It does not look back." },
        { t: "p", text: "The ferryman is a merrenoloth, a yugoloth that works the Styx for pay. It wants nothing from them and fights no one. If they hail it, it will carry a message anywhere on the river for a soul coin, and it knows exactly where Uldrak's Grave is: \"The little devil on the big sword. Two bends down. He talks to himself.\"" },

        { t: "h", text: "Event: The Wake" },
        { t: "read", text: "Something huge passes under the ship, under the water. You never see it. You only see the river bulge, a long slow hump moving against the current, and then the wave it leaves behind rising toward your keel." },
        { t: "steps", items: [
          "Each character on deck makes a {@b DC 13 Dexterity saving throw}. On a success, they get clear of the spray.",
          "On a failure, the Styx touches their skin. They make a {@b DC 15 Intelligence saving throw}.",
          "On a failed Intelligence save, the water steals memories. The character forgets the last day, plus one memory the player chooses: a face, a name, or a promise. The memories come back if {@spell greater restoration} is cast on them. Uldrak can do this at will once he is restored.",
          "A character who falls fully into the river is targeted by {@spell feeblemind} (DC 20 Intelligence save, repeated at the start of each turn in the water until it fails). Only a reckless choice should put someone in the river.",
          "If Lulu is at the rail, she rolls too. If someone holds her, she shares their fate."
        ] },
        { t: "note", title: "What Was Under the Ship", text: "Leave it a mystery tonight. It is not one of Arkhan's dragons. The Styx is old and deep and a great many things live in it. If the players ask Jeremy, he says the hull sensors read it as \"long.\"" },

        { t: "h", text: "Checks on the River" },
        { t: "list", items: [
          "{@b DC 15 Intelligence (Arcana or Religion):} the Styx winds through the upper layers of the Lower Planes. Its water strips memory. Elturel is sinking toward it, and when the city touches it, every soul aboard becomes a devil.",
          "{@b DC 14 Wisdom (Perception):} far off to the north, a speck of red is quartering the sky in long slow sweeps. It is looking for something.",
          "{@b DC 13 Wisdom (Survival):} a needle stands up on the horizon downriver, straight and too regular to be rock. That is the sword at Uldrak's Grave, a few hours out."
        ] },
        { t: "p", text: "When the river runs into a narrow gorge strung with chains, go to {@scene the-sibriex|The Sibriex}. If they fly straight past it, go to {@scene uldraks-grave|Uldrak's Grave}." }
      ]
    },

    {
      id: "the-sibriex",
      title: "The Sibriex",
      when: "Only if they stop at the gorge",
      duration: "35 to 50 minutes",
      blocks: [
        { t: "p", text: "The party is running the Styx toward {@b Uldrak's Grave} to spill Tiamat's blood and break the empyrean's curse. They have chosen to skip the Stygian Dock. This site is on the way, and it is optional: the Haruman errand that once made the sibriex necessary is already spent -- his trophy supplied the piece. So this is not a quest. It is a temptation with a mouth." },

        { t: "note", title: "Remember Lulu", text: "Lulu's full memory is a hard prerequisite for freeing the Caged Star, and the Caged Star is where Drenwal's rebirth happens. The Styx erases memory on contact. The players decided how she travels in The Styx Run. Hold them to it here: if she is at the rail and anyone goes into the water, run the forgetting." },

        { t: "h", text: "Event: Something Is Hanging Over the River" },
        { t: "read", text: "The gorge narrows, and the Styx goes quiet the way water does under a low roof.\n\nChains come out of the rock on both sides -- ships' chains, each link as long as a man -- and where they meet, something hangs.\n\nIt is a head. Only a head, the size of a cart, bloated and pale and slick, with long thin arms trailing from under its jaw like roots from a pulled weed. Below it the bank is heaped with things that are still breathing and should not be: too many joints, too many faces, arranged.\n\nThe eyes open. They are perfectly calm.\n\n\"Oh,\" it says, wetly, delighted. \"Visitors. Come closer. We will not reach you. We cannot.\"" },

        { t: "h", text: "What It Wants" },
        { t: "p", text: "Down. That is the whole of it. Everything the {@c sibriex|sibriex} offers is rent paid toward one end: being let out of the chains. It does not beg, it does not threaten, and it does not lie -- lying would cost it the only currency it has." },
        { t: "note", title: "The Price, and What It Costs You", text: "Freeing it is the campaign map's stated blood price for this site: {@b a sibriex loose on Avernus, and abominations follow it.} That is a permanent change to the waste, not a one-session consequence. Let the players hear the cost plainly -- the sibriex itself will tell them, because it does not care." },

        { t: "h", text: "What It Offers" },
        { t: "list", items: [
          "{@b It reads memory out of dead flesh.} Bring it a body and it will tell you what that body knew. The party no longer needs this for Haruman -- but if a Fallen Three piece is ever lost, this is the replacement, and the sibriex will remind them of that.",
          "{@b It knows the shape of Or'Henn's curse.} It writes curses into flesh for a living, and it recognises this one's author. It will describe the mechanism exactly and for free, because a frightened customer is a generous one: the curse wants him to ask a dragon for help, and the dragon pays for it.",
          "{@b It shapes flesh.} This is the dangerous offer. See the side panel."
        ] },
        { t: "p", text: "Open {@side what-the-sibriex-offers|What the Sibriex Offers} when they start bargaining." },

        { t: "h", text: "Event: It Smells the Curse" },
        { t: "p", text: "Run this the moment Or'Henn comes within about sixty feet, whatever else is happening." },
        { t: "read", text: "The head turns -- not the chains, just the head, wrongly, like a doll's.\n\n\"Ahh.\" The sound goes on too long. \"The old lizard carries a queen's debt in him. We can smell her signature from here. Five hands in one hand.\"\n\nThe lipless mouth stretches.\n\n\"Does he know what it is for yet? It is not a punishment, little druid. Nobody curses a gardener out of spite. It is a leash, and it is pulling you toward something with wings. You will ask. They always ask.\"" },
        { t: "p", text: "This is the party's first outside confirmation of the curse's purpose. The sibriex will not stop talking about it, because frightened people pay." },

        { t: "h", text: "Checks at the Chains" },
        { t: "list", items: [
          "A successful {@b DC 15 Intelligence (Arcana or Religion)} check identifies it as a sibriex: a demon that sculpts flesh, usually found chained by devils who want its work but not its freedom.",
          "A successful {@b DC 18 Wisdom (Insight)} check: every word it has said is true. That is what should worry them.",
          "A successful {@b DC 16 Intelligence (Investigation)} on the chains: devil-forged, maintained recently. Someone is still paying to keep it here. [DM: Bel is the obvious someone.]",
          "A character who looks at the heaped flesh below and succeeds on a {@b DC 14 Wisdom (Perception)} check sees that some of it is wearing the remains of Hellrider tabards."
        ] },

        { t: "h", text: "If the Characters Attack It" },
        { t: "p", text: "It cannot chase them and it knows it. It fights to make leaving expensive. {@b It is CR 18 and the party is three 13th-level characters} -- survivable, but a real cost in resources immediately before Uldrak. There is nothing to win here: it carries no treasure, and killing it closes the memory-reading option permanently." },
        { t: "encounter", id: "sibriex-fight", title: "The Thing in the Chains", combatants: [
          { c: "sibriex", n: 1 }
        ], notes: "Optional and pointless by design. Warp Creature first, Squirt Bile at anyone on the chains. If the party disengages, it lets them go and says something kind." },

        { t: "h", text: "Event: Passing By" },
        { t: "p", text: "If the party simply keeps going -- which is the sensible play -- give them this as the gorge opens up again." },
        { t: "read", text: "The chains fall behind. The gorge widens. The quiet lets go of the water.\n\nBehind you, unhurried, it calls after you -- not shouting, just pitched to carry:\n\n\"When the lizard asks a dragon for help. Come back and tell us what it cost. We do so like to hear how our sister's work turns out.\"" },

        { t: "choices", prompt: "What do the characters do?", items: [
          { label: "Pass it by", goto: "uldraks-grave" },
          { label: "Bargain with it", side: "what-the-sibriex-offers" },
          { label: "Free it", side: "what-the-sibriex-offers" },
          { label: "Attack it", goto: "the-sibriex" }
        ] }
      ]
    },
    {
      id: "uldraks-grave",
      title: "Uldrak's Grave",
      when: "",
      duration: "30 to 45 minutes",
      blocks: [
        { t: "p", text: "Uldrak's Grave is not a grave. It is a place name. {@c uldrak-devil|Uldrak} is an empyrean, a son of the fire giant god Surtur, who came to Avernus three thousand years ago to kill Tiamat. She made him small instead: a spined devil, sitting on the sword he can no longer lift. Her blood spilled on the ground of Avernus breaks the curse, and the party is carrying it. If the players arrive expecting a corpse, correct them." },
        { t: "note", title: "What the Vial Really Costs", text: "The vial is the only safe cure for Or'Henn's curse (Arkhan: \"it breaks curses that she laid\"). Pouring it here spends it. Or'Henn's curse keeps running: it pushes him to ask a dragon for help, jumps to that dragon, and when the dragon dies, Tiamat comes through. Later this session they plan to call five dragons. Do not explain any of this. Show it in the fiction (Event: The Mark Leans), then let them choose." },

        { t: "h", text: "Event: The Sword in the Waste" },
        { t: "read", text: "The river bends, and something stands up out of the plain ahead that is not a tower.\n\nIt is a sword. Its blade is buried in the red earth to the crossguard, and the hilt alone rises higher than your mast, wrapped in leather that rotted away a thousand years ago and left only the bronze wire beneath. Set in the pommel, high above, is a crystal globe the size of a man's head. Mist turns slowly inside it.\n\nOn the crossguard sits a devil. A small, ugly, quilled thing, the kind that runs errands in Hell. It does not fly at the ship. It does not hide.\n\nIt watches you come with its chin in its hand, the way an old man watches a road.\n\nWhen the ship is close enough to hear, it says, in a voice like a key scraping in a lock: \"You have her blood with you. I could smell it from the last bend. Come down. Please. I have not said please in a very long time.\"" },
        { t: "p", text: "Uldrak will not grovel, and he will not lie. Open his panel for his voice. He tells them everything they ask: who he was, who did this to him, and that the blood they carry undoes it." },

        { t: "h", text: "Event: The Mark Leans" },
        { t: "p", text: "Run this the first time the vial comes out, with Or'Henn anywhere near it. Say it to Or'Henn's player directly." },
        { t: "read", text: "The vial is warm in the hand that holds it. Inside, the blood turns over by itself.\n\nAnd something in you turns with it.\n\nThe mark Arkhan's goddess left on you leans toward that glass the way a dog leans toward the hand that feeds it. It is not pain. It is hunger. For one long breath you are absolutely certain that if that blood touched your skin, the mark would let go.\n\nThen the feeling settles, and waits." },
        { t: "p", text: "If they ask, Uldrak confirms it plainly: yes, the blood would free the druid too. There is one vial. He does not argue for himself. He just looks at the vial, and then at the ground." },
        { t: "note", title: "DM's Choice: One Vial, Two Curses", text: "Default: one vial breaks one curse. Whoever it is poured for is freed; the other stays cursed.\n\nIf you want mercy on the table, rule that blood poured on this ground while Or'Henn stands in it breaks both. Decide BEFORE they pour, never after, and never both by accident." },

        { t: "h", text: "Event: Pouring the Blood" },
        { t: "steps", items: [
          "Whoever pours must do it on bare ground of Avernus, at the foot of the sword. Uldrak climbs down to stand in the spot.",
          "The blood fights being poured. The pourer hears it whisper in Draconic: an offer, a promise, their own name. They make a {@b DC 15 Wisdom saving throw}. On a failure they hesitate and lose their action. They can try again.",
          "On the first drop, read the box below. The vial empties itself. It is gone."
        ] },
        { t: "read", text: "The blood hits the ground and the ground drinks it, hissing, like water on a forge.\n\nThe devil screams. It is not pain, or not only pain. Its skin splits down the spine like a seed husk, and something gold and burning pushes up out of the gap. The quills fall. The wings tear away like paper. The thing that climbs out of the devil keeps climbing, up and up, ten feet, fifteen, twenty, until it is a giant kneeling in the ash with bronze skin and fire moving under it like a river under ice.\n\nHe puts one hand on the hilt of the sword and pulls it out of the earth as if it were a tent peg.\n\nThen he laughs. It is the loudest sound you have heard in Avernus, and it is not cruel at all." },
        { t: "p", text: "{@c uldrak|Uldrak} is restored to full strength. Open his panel for the stat block and the voice." },

        { t: "h", text: "What Uldrak Gives" },
        { t: "list", items: [
          "{@b A gallon of his blood,} drawn at once into whatever they hand him. Empyrean blood is Blood Pay: a powerful creature's blood for the Intermediaries. He pays this first, so the party keeps it even if he falls later.",
          "{@b Greater restoration, at will,} on anyone the Styx touched on the way here ({@spell greater restoration}). Their memories come back.",
          "{@b His sword arm.} He came to Avernus to kill Tiamat. Her dragons are a down payment. If the party proposes calling Arkhan's dragons, he is delighted: \"Call them. Call all of them. I would like to be big at someone.\"",
          "{@b The orb, afterwards.} He once offered it to Arkhan in trade for the vial. It means nothing to him. If they want it when this is over, it is theirs. See {@side using-the-orb|Using the Orb} for what that costs."
        ] },
        { t: "note", title: "DM's Choice: The Solar's Helmet", text: "The campaign map flags Uldrak's gargantuan helmet as a possible home for the Solar's Helmet, half of Drenwal's rebirth prerequisite. If you want it here, he took it from a fallen solar on his way in, three thousand years ago, and it has lain buried under the sword ever since. If not, he has never seen one." },

        { t: "h", text: "Checks at the Sword" },
        { t: "list", items: [
          "{@b DC 15 Wisdom (Insight):} he is not lying. He is holding himself very still, the way people do when they are afraid of hoping.",
          "{@b DC 15 Intelligence (Arcana):} the globe in the pommel is an {@item Orb of Dragonkind|DMG}, an artifact made to lure evil dragons. See {@side using-the-orb|Using the Orb}.",
          "{@b DC 18 Intelligence (Religion):} this is a god's curse. Only the god, or her blood, can undo it. {@spell Greater restoration} and {@spell remove curse} will not touch it. That goes for Or'Henn's mark too.",
          "{@b DC 20 Intelligence (History):} empyreans are the children of gods. A son of Surtur came to Avernus in the first age of the Blood War to kill the Dragon Queen, and was never seen again."
        ] },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...pour the blood on Or'Henn instead,} Or'Henn is freed and Uldrak stays a devil. He does not rage. He climbs back onto his crossguard, sits down, and says: \"Then I will wait for the next one.\" There is no empyrean blood, no ally, and no orb unless they take it from him by force." },
        { t: "p", text: "{@b ...keep the vial,} Uldrak begs once, then never again. He tells them where Arkhan's dragons are hunting, for free, in the hope that they come back." },

        { t: "choices", prompt: "What do the characters do?", items: [
          { label: "Call the dragons", goto: "the-call" },
          { label: "Read the orb's rules first", side: "using-the-orb" },
          { label: "Let Uldrak go home", goto: "ending" }
        ] }
      ]
    },

    {
      id: "the-call",
      title: "The Call",
      when: "Only if they call the dragons",
      duration: "20 to 30 minutes",
      blocks: [
        { t: "p", text: "The plan: use the {@item Orb of Dragonkind|DMG} in Uldrak's pommel to call Arkhan's dragons here, and kill them with an empyrean on their side. It is a good plan. It is also the most dangerous thing they could do with Tiamat's mark still on Or'Henn, and the dragon trapped inside the orb knows it." },
        { t: "note", title: "Running This Scene", text: "Give the party real time to prepare before the call. Answer their questions honestly. Every good answer here is a dragon that dies easier later. Then read the call, and move straight to the fight." },

        { t: "h", text: "Who Holds the Orb" },
        { t: "list", items: [
          "{@b Uldrak.} The safe choice. Its magic has always answered to him; in devil form he was simply too small for it to obey. Restored, he takes control at once, with no check.",
          "{@b A character.} They must attune to it first (a short rest), then use an action and make a {@b DC 15 Charisma check}. On a success they control the orb. On a failure they are charmed by it for as long as they stay attuned, and it casts {@spell suggestion} on them at will (DC 18). The dragon inside wants Tiamat worshipped. Its first suggestion, to anyone near Or'Henn: \"Let the druid ask for help. It is only kind.\"",
          "{@b Or'Henn himself.} Allow it. If he fails the check, the orb and the curse want the same thing, and the suggestion is aimed at him: \"Ask the red one. It will help you.\" Enforce it."
        ] },

        { t: "h", text: "Preparing the Ground" },
        { t: "list", items: [
          "{@b The Lady Vengeance.} Colico Jack can hold her in the air for the force cannons, or beach her as a fort. In the air she is a target for every breath weapon; beached, her guns cover only one side. See {@c lady-vengeance|the ship}.",
          "{@b The trench.} Pulling the sword out left a trench 60 ft. long and 10 ft. deep. Inside it is half cover, and lying flat in it keeps a character out of a line breath's path.",
          "{@b The sword.} If Uldrak drives it back into the ground, the crossguard is a perch 80 ft. up. Dragons will want to land on it.",
          "{@b The bank.} Anyone standing within 10 ft. of the water can be dragged in. Say it out loud while they set up: \"The bank is soft, and the river is right there.\" If they fight there anyway, that is their choice.",
          "{@b The orb's charges.} It holds 7. Before the call, its holder can cast {@spell death ward} (2 charges each) on up to three allies. That is the single best thing they can do.",
          "{@b Long buffs.} This is the moment for {@spell heroes' feast} and anything else that lasts an hour."
        ] },

        { t: "h", text: "Event: The Call" },
        { t: "read", text: "The orb swells under the hand that holds it, from the size of a head to the size of a shield. The mist inside it stops turning.\n\nThen it calls.\n\nYou do not hear it. You feel it, in your teeth and in the bones behind your eyes, a note too deep for sound, rolling out across the waste in every direction at once. The ash on the ground stands up in little ridges and lies down again. The Styx goes flat as glass.\n\nFar out, things answer. The orb's holder feels each one, like a thread suddenly pulled tight: one in the sky to the north, fast and very angry. Two along the river. One that seems to be coming from underneath the world. And one very high, very slow, that carries something on its back.\n\nAnd one more thing. Far below the plain, so deep it is less a feeling than a change in the weather, something vast turns over in its sleep. It was not called. It heard anyway." },
        { t: "note", title: "Why All Five Come", text: "The call reaches 40 miles. Since the vial was stolen, Arkhan has had his dragons quartering the Styx for the Lady Vengeance, so all five are in range. Evil dragons in range must come to the orb by the most direct route, and they come angry at being compelled. Tiamat is not compelled by the call. She is, however, very interested." },

        { t: "h", text: "When They Arrive" },
        { t: "p", text: "Each dragon flies straight at the orb from wherever it was. That spaces the fight into waves. The first arrives 1 minute after the call: time to take positions and drink a potion, not time for a ritual." },
        { t: "steps", items: [
          "{@b Round 1:} {@c praxamor|Flash}, the red. Alone, from the north, out of the sky.",
          "{@b Round 3:} {@c skarrix|Slarkas}, the black, and {@c mirelle|Vermilius}, the green. Along the river. Slarkas is under the water.",
          "{@b Round 5:} {@c vhennic|Vistalancer}, the blue. From under the ground.",
          "{@b Round 7:} {@c obatala|Obatala}, with {@c krull|Krull} riding. High and slow. Krull talks before anyone fights."
        ] },
        { t: "p", text: "If the party is crushing each wave, close the gaps: bring the blue on round 4 and Obatala on round 5. If they are dying, hold the next wave back a round. Nobody at the table can see the clock. When they are ready, go to {@scene wings-over-the-grave|Wings Over the Grave}." }
      ]
    },

    {
      id: "wings-over-the-grave",
      title: "Wings Over the Grave",
      when: "Only if they call the dragons",
      duration: "90 to 120 minutes",
      banner: "art/official/young-black-dragon.webp",
      blocks: [
        { t: "p", text: "Five adult dragons and Arkhan's priest, against three 13th-level characters, an empyrean and a warship. The waves keep it survivable. Krull's offer gives them a way out. Or'Henn's mark sits in the middle of it all, and one of the dragons knows it." },
        { t: "note", title: "Pacing the Breath Weapons", text: "In any round, at most two breath weapons target characters. The rest go at Uldrak and the ship. That keeps the fight deadly without making it a wipe in round 3." },
        { t: "note", title: "Why the Dragons Fight", text: "The orb only made them come; it does not make them stay. They stay because they hate being compelled, because Arkhan wants the orb back, and because Uldrak is Tiamat's oldest enemy. Each one leaves when it drops below its flee line." },

        { t: "h", text: "Event: The First Shadow" },
        { t: "read", text: "It comes out of the north like a thrown spear, red as a wound, wings folded tight.\n\nIt does not circle. It does not roar a challenge. It comes straight at the orb, because it has to, and you can see in the way it flies that it hates that it has to. At the last moment the wings crack open like sails filling, and the whole huge body brakes in the air above you, blotting out the burning sky.\n\nThen it sees Uldrak.\n\nThe red dragon's eyes go wide. Then narrow. Then it smiles, with all of its teeth." },
        { t: "p", text: "Roll initiative for everyone now (the tracker below). Hold each dragon out until its round." },

        { t: "h", text: "How the Dragons Fight" },
        { t: "steps", items: [
          "{@b Flash (round 1)} lands on the sword's crossguard if it is there, roars, and breathes fire on the orb's holder. Then it duels Uldrak. It wants to be the dragon that killed Tiamat's oldest enemy. It leaves below 60 hit points.",
          "{@b Slarkas (round 3)} surfaces at the bank in a wall of black water: everyone within 15 ft. is sprayed (see the river rule below). It bites anyone standing near the water and drags them 10 ft. toward it. It leaves below 50.",
          "{@b Vermilius (round 3)} hangs back over the river and talks to Or'Henn in Draconic. This is the bait. If he refuses, it breathes poison into the thickest knot of characters. It leaves first, below 80.",
          "{@b Vistalancer (round 5)} burrows the last stretch and erupts under the party: everyone within 10 ft., DC 18 Dexterity save or knocked prone. Then it goes for the ship's gun crews. It leaves below 50.",
          "{@b Obatala and Krull (round 7)} circle out of reach. Krull speaks first: {@side krulls-offer|Krull's Offer}. If refused, Obatala dives on Uldrak with its cold breath while Krull casts from its back."
        ] },

        { t: "h", text: "What the Dragons Say" },
        { t: "list", items: [
          "Flash, to Uldrak, in Draconic: \"I know you. She told us about you. The little devil on the big sword. You were funnier small.\"",
          "Vermilius, to Or'Henn, in Draconic: \"Little cousin. That mark is killing you. I can help. Only ask.\"",
          "Slarkas only curses, in Draconic. Mostly it just drowns things.",
          "Vistalancer, to the ship: \"Metal and soul coins. I will pick my teeth with your captain.\"",
          "Obatala says nothing. Krull speaks for it."
        ] },

        { t: "note", title: "The Ship", text: "Two force cannons, 8d10 each. Each dragon's Wingover reaction gives the first ship shot against it disadvantage every round. Vistalancer goes for the gun crews. Colico Jack will not abandon the party, but if the hull drops below 100 hit points he pulls her up and out of breath range, and says so." },

        { t: "h", text: "The Orb in the Fight" },
        { t: "p", text: "The orb is what they came for. Every dragon wants it out of the holder's hands. Breath cannot harm it. If the holder goes down, the nearest dragon lands to take it in its jaws, and Krull wants it most of all. If Uldrak holds it, he cannot be disarmed of it while he stands." },

        { t: "h", text: "Or'Henn's Mark" },
        { t: "p", text: "The first time a dragon comes within 30 ft. of Or'Henn, and again whenever he drops below half his hit points, he feels the mark lean toward it, the way it leaned toward the vial. Say so. If he asks a dragon for help, or says yes to Vermilius, the curse jumps. Open {@side if-the-curse-jumps|If the Curse Jumps}." },

        { t: "h", text: "The River Rule" },
        { t: "list", items: [
          "{@b Spray} (Slarkas surfacing, or a body hitting the water nearby): DC 13 Dexterity save. On a failure, the Styx touches their skin: DC 15 Intelligence save or they forget the last day, plus one memory the player chooses. Uldrak's {@spell greater restoration} brings it back.",
          "{@b In the river:} {@spell feeblemind}, DC 20 Intelligence save, repeated at the start of each turn in the water until it fails.",
          "{@b Lulu} is the one who must stay dry."
        ] },

        { t: "h", text: "Checks During the Fight" },
        { t: "list", items: [
          "{@b DC 15 Wisdom (Insight)} on Vermilius: it is not lying about wanting to help. That should frighten them more than a lie.",
          "{@b DC 16 Intelligence (Arcana)} on a dragon's eyes when the curse jumps: they have gone Tiamat's gold. That dragon must not die.",
          "{@b Contested Strength (Athletics)} to keep hold of the orb when a dragon's jaws close on it: the dragon rolls using its bite bonus (+11 to +14)."
        ] },

        { t: "h", text: "If Things Go Wrong" },
        { t: "list", items: [
          "{@b A character goes into the Styx:} anyone can haul them out with an action and a DC 15 Strength (Athletics) check from the bank, or Uldrak can reach in and lift them, no check. Then {@spell greater restoration}.",
          "{@b The orb's holder falls:} the next dragon to act goes for the orb, not the body. That buys the downed character a round.",
          "{@b Uldrak drops below 80 hit points:} the dragons pile on him. Let the players see it, and let them choose whether to save him.",
          "{@b It is turning into a wipe:} hold back the next wave, and have Krull arrive early with his offer. That is the exit."
        ] },

        { t: "encounter", id: "dragons-at-the-grave", title: "Wings Over the Grave", combatants: [
          { c: "praxamor", n: 1 },
          { c: "skarrix", n: 1 },
          { c: "mirelle", n: 1 },
          { c: "vhennic", n: 1 },
          { c: "obatala", n: 1 },
          { c: "krull", n: 1 }
        ], notes: "Hold each dragon out until its wave round: Flash 1, Slarkas and Vermilius 3, Vistalancer 5, Obatala and Krull 7. Add Uldrak and the ship from the ally rows. XP: Flash 18,000, Vistalancer 15,000, Vermilius 13,000, Slarkas 11,500, Obatala 20,000, Krull 8,400, for each one killed or driven off." },

        { t: "h", text: "Event: Something in the River" },
        { t: "p", text: "Round 3, as Slarkas surfaces." },
        { t: "read", text: "The Styx, which has been flat as glass since the call, bulges.\n\nThe black dragon comes up out of it like a shipwreck rising, all at once, in a wall of black water that sheets off its wings and rains down across the bank. Behind it, low over the river and in no hurry at all, glides a green dragon. It is looking at Or'Henn. It is smiling as if it has just heard a very good joke." },

        { t: "h", text: "Event: The Ground Opens" },
        { t: "p", text: "Round 5. The orb's holder feels the blue coming from below one round early: \"It is under us.\" That is the warning. Then:" },
        { t: "read", text: "The ash jumps. Then the ground itself splits like a lip, and a blue head the size of a wagon bursts up through it in a fountain of red earth and stones, lightning already crawling between its teeth." },

        { t: "h", text: "Event: The Priest on the Pale Wing" },
        { t: "p", text: "Round 7." },
        { t: "read", text: "High above the smoke, something pale turns a slow circle against the red sky. It does not dive. It does not need to.\n\nOn its back, small as a beetle at this height, an old tortle in ceremonial armour raises one hand. Every dragon still in the air breaks off and pulls back, hissing, as if somebody had jerked their leashes.\n\nIn the sudden quiet, his voice carries down to you, dry and bored." },
        { t: "img", src: "art/generated/event-obatala-dives.webp", caption: "Obatala, with Krull on its back." },
        { t: "p", text: "Open {@side krulls-offer|Krull's Offer}." },

        { t: "choices", prompt: "How does it end?", items: [
          { label: "The dragons are dead or fled", goto: "ending" },
          { label: "They took Krull's deal", side: "krulls-offer" },
          { label: "The curse jumped", side: "if-the-curse-jumps" }
        ] }
      ]
    },

    {
      id: "ending",
      title: "Ending the Session",
      when: "",
      duration: "10 minutes",
      blocks: [
        { t: "p", text: "Find the outcomes below that match what happened, read their boxes, and note what changes for the campaign." },

        { t: "h", text: "Outcome: The Dragons Are Dead or Fled" },
        { t: "read", text: "The ash settles slowly, the way snow does.\n\nWhere the dragons fell, the ground smokes. The river has gone back to moving, slow and black and patient, carrying away whatever it took. Somewhere behind you, Colico Jack is swearing at the hull.\n\nUldrak sits down heavily on the edge of the trench, his sword across his knees, and for a long moment he just breathes." },
        { t: "p", text: "{@b Campaign change:} a pint from any dead adult dragon is a powerful creature's blood, so each one is new Blood Pay for the Intermediaries. Arkhan's tower has lost its teeth, and Arkhan will not take that quietly. The dragons that fled carry the story home." },

        { t: "h", text: "Outcome: Uldrak Survived" },
        { t: "read", text: "\"I came here to kill a god,\" Uldrak says. \"I think I will go home first and tell my father I am alive. He will be very angry with me.\"\n\nHe takes a coin from somewhere, bronze and warm and stamped with a hammer, and presses it into your hand.\n\n\"When you stand at her door,\" he says, \"say my name. I will come.\"\n\nThen the air folds around him like a curtain, and he is gone." },
        { t: "p", text: "{@b Campaign change:} the campaign map's \"grateful empyrean who may stand with the party at the end\" is now real. Saying his name with the coin in hand calls him, once." },

        { t: "h", text: "Outcome: Uldrak Fell" },
        { t: "read", text: "The giant goes down slowly, the way a tower does, and the ground shakes when he lands. The fire under his skin flickers, and goes out, and he is only bronze.\n\nHe got to be big again for one afternoon." },
        { t: "p", text: "The party keeps the gallon of blood he paid up front. There is no coin and no ally at the end, and they know exactly why." },

        { t: "h", text: "Outcome: They Gave Krull the Orb" },
        { t: "read", text: "Krull turns the glass over in his old hands, and for the first time since you met him, he smiles like he means it.\n\n\"My lord Arkhan,\" he says, \"will be so grateful.\"\n\nObatala turns for home. Behind it, the dragons that are left fall into line." },
        { t: "p", text: "{@b Campaign change:} a coup is coming at Arkhan's Tower. Next time the party sees the tower, Krull is either running it or dead." },

        { t: "h", text: "Outcome: The Curse Jumped" },
        { t: "p", text: "Or'Henn is free. If the marked dragon is still alive, it dies at the next dawn, and Tiamat comes through then. If it already died, she has come. See {@side if-the-curse-jumps|If the Curse Jumps}. Either way the endgame has changed: the campaign map's Chapter 5 option, Tiamat breaks Elturel's chains for a price, is now on the table whether the party wants it or not." },

        { t: "h", text: "Outcome: They Let Uldrak Go Without Calling" },
        { t: "read", text: "Uldrak looks at the orb, and at the sky, and shrugs his enormous shoulders.\n\n\"Another day,\" he says. \"I have had a great many of them.\"" },
        { t: "p", text: "He gives them the coin anyway, and the orb if they want it. Arkhan's dragons are still hunting the Styx." },

        { t: "h", text: "Outcome: A Character Died" },
        { t: "p", text: "There is no Arkhan to broker a raising this time. Drenwal has {@spell revivify}, and at 13th level, {@spell resurrection}. Uldrak cannot raise the dead, but he will carry the body anywhere they ask." },

        { t: "note", title: "Remember for Next Time", text: "Write down: which dragons died and which fled? What did Krull get? Did the curse jump, and to whom? Who touched the Styx, and what did they forget? Does the party have the orb? Is Uldrak alive, and do they have his coin?" }
      ]
    }

  ],

  side: {

    "what-the-sibriex-offers": {
      title: "What the Sibriex Offers",
      blocks: [
        { t: "p", text: "Everything here is true. The sibriex trades in accuracy because it is the only thing it has left to sell. Its price is always the same: the chains." },

        { t: "h", text: "1. Reading a body" },
        { t: "p", text: "Bring it a corpse and it tells you what the corpse knew. {@b Price:} freedom, or a living creature to shape. The party does not need this now -- Haruman's piece came from the trophy -- but keep it in your pocket. If a Fallen Three piece is ever lost, this is the campaign's stated replacement." },

        { t: "h", text: "2. The curse, explained" },
        { t: "p", text: "{@b Price:} free. It enjoys this part." },
        { t: "read", text: "\"It is a courier, not a wound. It rides him until he is frightened enough to ask a dragon for help -- and a dragon will help, they are proud that way. Then it steps across. Then it opens him up, and she comes through.\"\n\nIt sounds admiring.\n\n\"We would have done it the same. Perhaps we did. We have been here a long time and we have written a great many things into a great many people.\"" },
        { t: "p", text: "Confirm for the players: the vial they are carrying undoes this, and they are about to pour it into the ground at Uldrak's Grave. Do not editorialise. Let them do the arithmetic." },

        { t: "h", text: "3. It can make a dragon" },
        { t: "note", title: "DM's Choice: The Dangerous Offer [HOMEBREW]", text: "Use this only if you want the Tiamat ending on the table. A sibriex shapes flesh; the curse needs a dragon to step into. So it offers to MAKE one -- take a willing creature, or one of the things breathing on the bank, and warp it into something draconic enough for the curse to accept.\n\nIf you run this, be clear that it works, and be clear what it means: Or'Henn walks away clean, a made thing dies, and Tiamat comes through anyway. The curse does not care whether the dragon was born or built.\n\nIf you would rather keep Tiamat caged, cut this entirely. The sibriex simply says the curse will only take a true dragon, and that is that." },

        { t: "h", text: "What It Will Not Do" },
        { t: "list", items: [
          "It will not lift the curse. It is not hers and it cannot countermand a god.",
          "It will not touch the Soul Capacitor. \"That is a contract. We do flesh.\"",
          "It will not come with them. It cannot leave the gorge under its own power even unchained -- someone must carry it, and it will happily watch them realise that."
        ] }
      ]
    },
    "using-the-orb": {
      title: "Using the Orb",
      blocks: [
        { t: "p", text: "Uldrak's pommel holds an {@item Orb of Dragonkind|DMG}: an etched crystal globe about 10 inches across that grows to 20 when used. Wizards made five of them to lure evil dragons to their deaths. Each one holds the essence of an evil dragon that resents being used." },

        { t: "h", text: "Taking Control" },
        { t: "steps", items: [
          "Attune to it (a short rest).",
          "Use an action to peer into it and speak its command word, then make a {@b DC 15 Charisma check}.",
          "Success: you control it while attuned.",
          "Failure: you are charmed by it while attuned. You cannot end the attunement by choice, and it casts {@spell suggestion} on you at will (DC 18), pushing its own ends. This one wants Tiamat worshipped."
        ] },
        { t: "p", text: "Uldrak controls it at once, without a check. It has been his for three thousand years." },

        { t: "h", text: "What It Does" },
        { t: "list", items: [
          "{@b Call Dragons.} An action: a telepathic call 40 miles in every direction. Evil dragons in range must come to the orb by the most direct route. Tiamat and other dragon gods are not compelled. Called dragons may be hostile for being compelled. Once per hour.",
          "{@b Spells.} 7 charges, regains {@dice 1d4+3} at dawn. Save DC 18. {@spell Cure wounds} at 5th level (3 charges), {@spell daylight} (1), {@spell death ward} (2), {@spell scrying} (3). {@spell Detect magic} for free.",
          "{@b Random properties.} An artifact: 2 minor beneficial, 1 minor detrimental and 1 major detrimental property. Roll them in the DMG the first time a character attunes."
        ] },

        { t: "h", text: "Breaking It" },
        { t: "p", text: "It looks fragile and is not. Dragon breath and almost all damage do nothing to it. {@spell Disintegrate}, or one good hit from a +3 weapon, destroys it. Breaking it frees the dragon essence inside. What that dragon does next is your call." }
      ]
    },

    "krulls-offer": {
      title: "Krull's Offer",
      blocks: [
        { t: "p", text: "{@c krull|Krull} arrives on {@c obatala|Obatala} in round 7, circles once out of reach, and raises a hand before anyone attacks. He speaks in Common, bored, as if he were reading a bill." },
        { t: "read", text: "\"Well. You have been busy.\"\n\nThe old tortle looks down at the smoking ground, at the empyrean, at whatever is left of his master's dragons. His face does not change.\n\n\"My lord Arkhan would like his orb. He would also like your heads, but he is a practical man, and I am a more practical one. Give me the glass, and I will take what is left of these beasts home. No one else needs to die today.\"\n\nHe smiles, very slightly.\n\n\"Most of all, not you.\"" },

        { t: "h", text: "What He Really Wants" },
        { t: "p", text: "Krull covets Arkhan's place. With the orb, Arkhan's dragons would answer to him, not to Arkhan. He will not take it home." },
        { t: "list", items: [
          "{@b DC 18 Wisdom (Insight):} he is not hungry for Arkhan. He is hungry for himself.",
          "{@b If they name it out loud,} he does not deny it. \"A tower needs a priest who prays. Mine does not.\""
        ] },

        { t: "h", text: "If They Hand It Over" },
        { t: "list", items: [
          "The surviving dragons leave with him. The fight is over.",
          "They have armed a coup at Arkhan's Tower. Next time the party sees the tower, Krull is either running it or dead. Either way Arkhan is distracted, and the dragons that serve Krull remember who gave him the orb.",
          "Uldrak hates this, and says so. He does not stop them."
        ] },

        { t: "h", text: "If They Refuse" },
        { t: "p", text: "He sighs, and Obatala dives. Run his Session 10 tactics. He leaves when Obatala is bloodied: he does not die for Arkhan, and he will not die for an orb he could take another day." },

        { t: "h", text: "If They Counter-Offer" },
        { t: "p", text: "He listens. He is a bargainer before he is a priest. He will trade the surviving dragons' withdrawal for something that hurts Arkhan: news of the vial being spent, a promise not to come back to the tower, or one of the dead dragons' heads to prove to his master how badly this went." }
      ]
    },

    "if-the-curse-jumps": {
      title: "If the Curse Jumps",
      blocks: [
        { t: "p", text: "Tiamat's mark on Or'Henn is a delivery system, not a wound. It pushes him to ask a dragon for help. When he does, it jumps into that dragon. When that dragon dies, the sacrifice is complete, and Tiamat comes through. Full background: {@side arc-orhenn|Or'Henn's arc}." },

        { t: "h", text: "What Counts as Asking" },
        { t: "list", items: [
          "Any request for help made to a dragon, in any language: \"help me\", \"take it off me\", \"please\".",
          "Saying yes to a dragon's offer of help. Vermilius makes that offer on purpose.",
          "NOT: surrendering, bargaining, threatening, or asking a dragon a question.",
          "Telegraph it first. The moment before he speaks, he feels the mark lean toward the dragon like a hand reaching out. If he speaks anyway, enforce it."
        ] },

        { t: "h", text: "Event: The Mark Moves" },
        { t: "read", text: "The words are barely out of your mouth before you feel it go.\n\nIt peels off you like a wet shirt, all at once, and the relief is so sharp it nearly drops you to your knees. You can breathe. You did not know you could not breathe.\n\nAcross the ash, the dragon jerks as if struck. Its eyes, which were cunning a moment ago, go gold all the way across. Pure, flat, molten gold.\n\nIt does not look at you anymore. It looks down, at the ground, as if listening to something underneath." },

        { t: "h", text: "What Happens Next" },
        { t: "list", items: [
          "{@b Or'Henn is free.} Fully. The mark is gone.",
          "{@b The marked dragon is doomed.} It stops fighting for itself. It will not flee. If nobody kills it, the mark burns it from the inside at the next dawn.",
          "{@b The moment it dies, Tiamat comes through.} Whoever kills it. Uldrak, eager to kill dragons, will kill it unless someone stops him. Tell the players he is about to.",
          "{@b They can try to keep it alive.} Capture it, chain it, hold it with {@spell hold monster} until dawn. It will not stop the dawn. It buys them hours to decide where they want Tiamat to arrive."
        ] },

        { t: "h", text: "When Tiamat Comes" },
        { t: "note", title: "Not a Fight", text: "Do not stat her. The campaign map already holds this as a Chapter 5 option: Tiamat breaks Elturel's chains, for a price. She arrives as a voice and a shape too big for the sky, five heads looking down from the clouds, and she is grateful in the way only a god can be: completely, and on her own terms. Arkhan, wherever he is, falls to his knees. This changes the endgame. Only run it if the party truly chose it." },
        { t: "read", text: "The dragon dies, and the sky tears.\n\nNot open. Tears, like cloth, and through the gap come five heads, each one larger than the Lady Vengeance, each one a different colour, all of them smiling.\n\nThe voice is five voices, and every one of them is pleased with you.\n\n\"Little druid. You asked so nicely.\"" }
      ]
    }

  }
};
