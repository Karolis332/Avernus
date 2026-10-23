// Campaign-wide: Arkhan the Cruel and his tower (dragons, Krull), plus Uldrak once restored. Moved out of session 9
// so later sessions reuse the stat blocks and override only tactics/description.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.creatures, {

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
      "Bolster first, at the end of the first enemy turn: it cancels fear for everyone near him.",
      "Bolt type matters: never the damage type the target is immune to. When in doubt, force or radiant.",
      "Trembling Strike knocks the party prone too. He warns them first: \"Off the ground!\"",
      "At will, between fights: {@spell greater restoration} on anyone the Styx has touched."
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

  "skarrix": {
    name: "Slarkas",
    kind: "young-black-dragon",
    role: "Tower dragon (black), sullen and sadistic",
    source: { page: "bestiary", name: "Adult Black Dragon", src: "MM" },
    homebrew: "Scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons: book young dragon raised to adult (MM stats), Legendary Resistance 1/day, Wingover reaction added.",
    description: "A lean black dragon with a face like a bare skull. Acid hangs from its jaws in long strings and hisses where it lands. It stinks of swamp mud and rotten eggs.",
    roleplay: [
      "Personality: Slarkas is sullen and sadistic. Likes to melt things slowly and watch.",
      "Voice: speaks only Draconic, and only to curse.",
      "Sample line (Draconic): \"Hold still. It is better if you hold still.\""
    ],
    npc: false,
    sizeType: "Huge dragon, chaotic evil",
    ac: 19, acNote: "natural armor",
    hp: 195, hpFormula: "17d12 + 85",
    speed: "40 ft., fly 80 ft., swim 40 ft.",
    init: 12,   // 2024 MM: initiative expertise
    abilities: { str: 23, dex: 14, con: 21, int: 14, wis: 13, cha: 17 },
    saves: "Dex +7, Con +10, Wis +6, Cha +8", skills: "Perception +11, Stealth +7",
    vulnerable: "", resist: "", immune: "acid", condImmune: "",
    senses: "blindsight 60 ft., darkvision 120 ft., passive Perception 21",
    languages: "Common, Draconic",
    cr: "14", xp: 11500, pb: 5,
    traits: [
      { name: "Amphibious", text: "Can breathe air and water." },
      { name: "Legendary Resistance (1/Day)", text: "If Slarkas fails a saving throw, it can choose to succeed instead." },
      { name: "Breath vs. the Ship", text: "Its breath weapon beats the Lady Vengeance's damage threshold of 15." }
    ],
    actions: [
      { name: "Multiattack", text: "Can use Frightful Presence, then one bite and two claws." },
      { name: "Bite", text: "Melee Weapon Attack: +11 to hit, reach 10 ft. Hit: 17 (2d10 + 6) piercing plus 4 (1d8) acid." },
      { name: "Claw", text: "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 13 (2d6 + 6) slashing." },
      { name: "Tail", text: "Melee Weapon Attack: +11 to hit, reach 15 ft. Hit: 15 (2d8 + 6) bludgeoning." },
      { name: "Frightful Presence", text: "Each creature of its choice within 120 ft. aware of it: DC 16 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Acid Breath (Recharge 5-6)", text: "60-ft. line, 5 ft. wide. DC 18 Dexterity save, 54 (12d8) acid, half on a success." }
    ],
    bonus: [],
    reactions: [
      { name: "Wingover (homebrew, 1/round)", text: "When a ship weapon targets Slarkas, the attack has disadvantage. If the weapon forces a save instead, Slarkas takes half damage." }
    ],
    legendary: {
      count: 3,
      intro: "Slarkas can take one legendary action at the end of another creature's turn. It regains spent legendary actions at the start of its turn.",
      actions: [
        { name: "Detect", cost: 1, text: "Makes a Wisdom (Perception) check." },
        { name: "Tail Attack", cost: 1, text: "Makes one tail attack." },
        { name: "Wing Attack", cost: 2, text: "Each creature within 10 ft.: DC 19 Dexterity save or 13 (2d6 + 6) bludgeoning and knocked prone. Slarkas then flies up to half its speed." }
      ]
    },
    tactics: [
      "Pacing rule (all four dragons): in round 1 they strafe the SHIP and its gun crews, not the PCs. In any later round, at most 2 breath weapons target PCs; the rest go at the ship.",
      "Round 1: dives with the other three. Frightful Presence first, then bite and claws on the gun crews at the rail.",
      "Lines up its acid breath to run down the length of the deck, catching as many characters as possible and the hull too.",
      "Uses Wingover the first time a cannon or the harpoon targets it each round.",
      "Below 50 hit points, flees to the black spire."
    ]
  },

  "vhennic": {
    name: "Vistalancer",
    kind: "young-blue-dragon",
    role: "Tower dragon (blue), the fastest of the four",
    source: { page: "bestiary", name: "Adult Blue Dragon", src: "MM" },
    homebrew: "Scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons: book young dragon raised to adult (MM stats), Legendary Resistance 1/day, Wingover reaction added.",
    description: "A sleek blue dragon with a single great horn on its snout. Static crackles over its scales; the air smells of a lightning strike when it passes.",
    roleplay: [
      "Personality: Vistalancer is vain and precise. Keeps score of every hit, out loud.",
      "Voice: crisp Draconic, counting. \"One. Two. Three.\"",
      "Sample line (Draconic): \"Four hits to your one, little boat. Shall we make it five?\""
    ],
    npc: false,
    sizeType: "Huge dragon, lawful evil",
    ac: 19, acNote: "natural armor",
    hp: 225, hpFormula: "18d12 + 108",
    speed: "40 ft., burrow 30 ft., fly 80 ft.",
    init: 10,   // 2024 MM: initiative expertise
    abilities: { str: 25, dex: 10, con: 23, int: 16, wis: 15, cha: 19 },
    saves: "Dex +5, Con +11, Wis +7, Cha +9", skills: "Perception +12, Stealth +5",
    vulnerable: "", resist: "", immune: "lightning", condImmune: "",
    senses: "blindsight 60 ft., darkvision 120 ft., passive Perception 22",
    languages: "Common, Draconic",
    cr: "16", xp: 15000, pb: 5,
    traits: [
      { name: "Legendary Resistance (1/Day)", text: "If Vistalancer fails a saving throw, it can choose to succeed instead." },
      { name: "Breath vs. the Ship", text: "Its breath weapon beats the Lady Vengeance's damage threshold of 15." }
    ],
    actions: [
      { name: "Multiattack", text: "Can use Frightful Presence, then one bite and two claws." },
      { name: "Bite", text: "Melee Weapon Attack: +12 to hit, reach 10 ft. Hit: 18 (2d10 + 7) piercing plus 5 (1d10) lightning." },
      { name: "Claw", text: "Melee Weapon Attack: +12 to hit, reach 5 ft. Hit: 14 (2d6 + 7) slashing." },
      { name: "Tail", text: "Melee Weapon Attack: +12 to hit, reach 15 ft. Hit: 16 (2d8 + 7) bludgeoning." },
      { name: "Frightful Presence", text: "Each creature of its choice within 120 ft. aware of it: DC 17 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Lightning Breath (Recharge 5-6)", text: "90-ft. line, 5 ft. wide. DC 19 Dexterity save, 66 (12d10) lightning, half on a success." }
    ],
    bonus: [],
    reactions: [
      { name: "Wingover (homebrew, 1/round)", text: "When a ship weapon targets Vistalancer, the attack has disadvantage. If the weapon forces a save instead, Vistalancer takes half damage." }
    ],
    legendary: {
      count: 3,
      intro: "Vistalancer can take one legendary action at the end of another creature's turn. It regains spent legendary actions at the start of its turn.",
      actions: [
        { name: "Detect", cost: 1, text: "Makes a Wisdom (Perception) check." },
        { name: "Tail Attack", cost: 1, text: "Makes one tail attack." },
        { name: "Wing Attack", cost: 2, text: "Each creature within 10 ft.: DC 20 Dexterity save or 14 (2d6 + 7) bludgeoning and knocked prone. Vistalancer then flies up to half its speed." }
      ]
    },
    tactics: [
      "Pacing rule (all four dragons): in round 1 they strafe the SHIP and its gun crews, not the PCs. In any later round, at most 2 breath weapons target PCs; the rest go at the ship.",
      "Round 1: dives on the ship and its gun crews with the other three.",
      "Boom-and-zoom: dives, breathes a 90-ft. lightning line through the deck and the character doing the most damage, then climbs back out of cannon arc.",
      "Uses Wing Attack as a legendary action to knock the gunners off their cannons.",
      "Below 55 hit points, flees to the blue spire."
    ]
  },

  "mirelle": {
    name: "Vermilius",
    kind: "young-green-dragon",
    role: "Tower dragon (green), the cruelest talker",
    source: { page: "bestiary", name: "Adult Green Dragon", src: "MM" },
    homebrew: "Scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons: book young dragon raised to adult (MM stats), Legendary Resistance 1/day, Wingover reaction added.",
    description: "A green dragon with a frilled neck and a long, mocking smile. A sweet, sickly smell of poison and crushed leaves comes off it like perfume.",
    roleplay: [
      "Personality: Vermilius is a liar and a tease, and the only one who talks to the party.",
      "Voice: purring Common, mocking and amused.",
      "Sample line: \"Pretty boat. It will make a lovely coffin. Oh, is that a celestial I smell? The master will want that.\""
    ],
    npc: false,
    sizeType: "Huge dragon, lawful evil",
    ac: 19, acNote: "natural armor",
    hp: 207, hpFormula: "18d12 + 90",
    speed: "40 ft., fly 80 ft., swim 40 ft.",
    init: 11,   // 2024 MM: initiative expertise
    abilities: { str: 23, dex: 12, con: 21, int: 18, wis: 15, cha: 17 },
    saves: "Dex +6, Con +10, Wis +7, Cha +8", skills: "Deception +8, Insight +7, Perception +12, Persuasion +8, Stealth +6",
    vulnerable: "", resist: "", immune: "poison", condImmune: "poisoned",
    senses: "blindsight 60 ft., darkvision 120 ft., passive Perception 22",
    languages: "Common, Draconic",
    cr: "15", xp: 13000, pb: 5,
    traits: [
      { name: "Amphibious", text: "Can breathe air and water." },
      { name: "Legendary Resistance (1/Day)", text: "If Vermilius fails a saving throw, she can choose to succeed instead." },
      { name: "Breath vs. the Ship", text: "Her breath weapon beats the Lady Vengeance's damage threshold of 15." }
    ],
    actions: [
      { name: "Multiattack", text: "Can use Frightful Presence, then one bite and two claws." },
      { name: "Bite", text: "Melee Weapon Attack: +11 to hit, reach 10 ft. Hit: 17 (2d10 + 6) piercing plus 7 (2d6) poison." },
      { name: "Claw", text: "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 13 (2d6 + 6) slashing." },
      { name: "Tail", text: "Melee Weapon Attack: +11 to hit, reach 15 ft. Hit: 15 (2d8 + 6) bludgeoning." },
      { name: "Frightful Presence", text: "Each creature of her choice within 120 ft. aware of her: DC 16 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Poison Breath (Recharge 5-6)", text: "60-ft. cone. DC 18 Constitution save, 56 (16d6) poison, half on a success." }
    ],
    bonus: [],
    reactions: [
      { name: "Wingover (homebrew, 1/round)", text: "When a ship weapon targets Vermilius, the attack has disadvantage. If the weapon forces a save instead, she takes half damage." }
    ],
    legendary: {
      count: 3,
      intro: "Vermilius can take one legendary action at the end of another creature's turn. She regains spent legendary actions at the start of her turn.",
      actions: [
        { name: "Detect", cost: 1, text: "Makes a Wisdom (Perception) check." },
        { name: "Tail Attack", cost: 1, text: "Makes one tail attack." },
        { name: "Wing Attack", cost: 2, text: "Each creature within 10 ft.: DC 19 Dexterity save or 13 (2d6 + 6) bludgeoning and knocked prone. Vermilius then flies up to half her speed." }
      ]
    },
    tactics: [
      "Pacing rule (all four dragons): in round 1 they strafe the SHIP and its gun crews, not the PCs. In any later round, at most 2 breath weapons target PCs; the rest go at the ship.",
      "Round 1: dives on the ship and its gun crews with the other three.",
      "Breathes poison on the biggest cluster of characters on deck, not the hull. She wants bodies, not scrap.",
      "Taunts the party in Common while she circles. Goes after Aurora, but never tries to kill Moonkite: anything holy is the master's.",
      "Below 50 hit points, flees to the green spire."
    ]
  },

  "praxamor": {
    name: "Flash",
    kind: "young-red-dragon",
    role: "Tower dragon (red), the proudest, the hardest hitter",
    source: { page: "bestiary", name: "Adult Red Dragon", src: "MM" },
    homebrew: "Scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons. Book: a wyrmling. Here grown to an adult dragon (MM stats) for the ambush, Legendary Resistance 1/day, Wingover reaction added.",
    description: "The youngest dragon of the tower, red as fresh blood, with heat shimmering off his back. Arkhan's people call him Flash. He hates it.",
    roleplay: [
      "Personality: Flash is proud, hot-headed and desperate to prove he is not a hatchling.",
      "Voice: shrieking Draconic. Loses his temper if anyone calls him small or young.",
      "Sample line (Draconic): \"I am not a hatchling! Say it again. Say it again!\""
    ],
    npc: false,
    sizeType: "Huge dragon, chaotic evil",
    ac: 19, acNote: "natural armor",
    hp: 256, hpFormula: "19d12 + 133",
    speed: "40 ft., climb 40 ft., fly 80 ft.",
    init: 12,   // 2024 MM: initiative expertise
    abilities: { str: 27, dex: 10, con: 25, int: 16, wis: 13, cha: 21 },
    saves: "Dex +6, Con +13, Wis +7, Cha +11", skills: "Perception +13, Stealth +6",
    vulnerable: "", resist: "", immune: "fire", condImmune: "",
    senses: "blindsight 60 ft., darkvision 120 ft., passive Perception 23",
    languages: "Common, Draconic",
    cr: "17", xp: 18000, pb: 6,
    traits: [
      { name: "Legendary Resistance (1/Day)", text: "If Flash fails a saving throw, he can choose to succeed instead." },
      { name: "Breath vs. the Ship", text: "His breath weapon beats the Lady Vengeance's damage threshold of 15." }
    ],
    actions: [
      { name: "Multiattack", text: "Can use Frightful Presence, then one bite and two claws." },
      { name: "Bite", text: "Melee Weapon Attack: +14 to hit, reach 10 ft. Hit: 19 (2d10 + 8) piercing plus 7 (2d6) fire." },
      { name: "Claw", text: "Melee Weapon Attack: +14 to hit, reach 5 ft. Hit: 15 (2d6 + 8) slashing." },
      { name: "Tail", text: "Melee Weapon Attack: +14 to hit, reach 15 ft. Hit: 17 (2d8 + 8) bludgeoning." },
      { name: "Frightful Presence", text: "Each creature of his choice within 120 ft. aware of him: DC 19 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Fire Breath (Recharge 5-6)", text: "60-ft. cone. DC 21 Dexterity save, 63 (18d6) fire, half on a success." }
    ],
    bonus: [],
    reactions: [
      { name: "Wingover (homebrew, 1/round)", text: "When a ship weapon targets Flash, the attack has disadvantage. If the weapon forces a save instead, he takes half damage." }
    ],
    legendary: {
      count: 3,
      intro: "Flash can take one legendary action at the end of another creature's turn. He regains spent legendary actions at the start of his turn.",
      actions: [
        { name: "Detect", cost: 1, text: "Makes a Wisdom (Perception) check." },
        { name: "Tail Attack", cost: 1, text: "Makes one tail attack." },
        { name: "Wing Attack", cost: 2, text: "Each creature within 10 ft.: DC 22 Dexterity save or 15 (2d6 + 8) bludgeoning and knocked prone. Flash then flies up to half his speed." }
      ]
    },
    tactics: [
      "Pacing rule (all four dragons): in round 1 they strafe the SHIP and its gun crews, not the PCs. In any later round, at most 2 breath weapons target PCs; the rest go at the ship.",
      "The last to engage, and the hardest for Krull to call off when the halt is called.",
      "Goes for the Lady Vengeance's hull on principle: a ship that shoots at Tiamat's own does not get to float.",
      "Breathes fire on recharge, the biggest cone he can line up. If anyone calls him small or young, that character becomes his only target.",
      "Below 60 hit points, flees to the red spire, screaming."
    ]
  },

  "obatala": {
    name: "Obatala",
    kind: "adult-white-dragon",
    role: "Krull's mount, the elder adult dragon that calls the halt",
    source: { page: "bestiary", name: "Adult White Dragon", src: "MM" },
    homebrew: "Elder adult: canon adult white, buffed above the four tower dragons (CR 14–17) so his 'ENOUGH!' lands; scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons.",
    description: "A huge white dragon, older and bigger than the four in the spires, stained grey with ash and soot. In the heat of Avernus his scales steam and drip. Frost spreads wherever he lands and melts at once into mud.",
    roleplay: [
      "Personality: Obatala is slow, sulky and loyal to Krull. Misses the cold.",
      "Voice: deep, slow Common, few words.",
      "Sample line: \"Krull says stop. So you stop.\""
    ],
    npc: false,
    sizeType: "Huge dragon, chaotic evil",
    ac: 19, acNote: "natural armor",
    hp: 287, hpFormula: "23d12 + 138",
    speed: "40 ft., burrow 30 ft., fly 80 ft., swim 40 ft.",
    init: 12,   // 2024 MM: initiative expertise
    abilities: { str: 24, dex: 10, con: 22, int: 8, wis: 12, cha: 14 },
    saves: "Dex +6, Con +12, Wis +7, Cha +8", skills: "Perception +13, Stealth +6",
    vulnerable: "", resist: "", immune: "cold", condImmune: "",
    senses: "blindsight 60 ft., darkvision 120 ft., passive Perception 23",
    languages: "Common, Draconic",
    cr: "18", xp: 20000, pb: 6,
    traits: [
      { name: "Ice Walk", text: "Moves across ice and snow without a check; difficult terrain from ice or snow costs him no extra movement." },
      { name: "Legendary Resistance (2/Day)", text: "If Obatala fails a save, he can choose to succeed instead." }
    ],
    actions: [
      { name: "Multiattack", text: "Can use Frightful Presence, then one bite and two claws." },
      { name: "Bite", text: "Melee Weapon Attack: +13 to hit, reach 10 ft. Hit: 18 (2d10 + 7) piercing plus 9 (2d8) cold." },
      { name: "Claw", text: "Melee Weapon Attack: +13 to hit, reach 5 ft. Hit: 14 (2d6 + 7) slashing." },
      { name: "Tail", text: "Melee Weapon Attack: +13 to hit, reach 15 ft. Hit: 16 (2d8 + 7) bludgeoning." },
      { name: "Frightful Presence", text: "Each creature of his choice within 120 ft. aware of Obatala: DC 16 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Cold Breath (Recharge 5-6)", text: "60-ft. cone. DC 20 Constitution save, 63 (14d8) cold, half on a success." }
    ],
    bonus: [],
    reactions: [
      { name: "Wingover (homebrew, 1/round)", text: "When a ship weapon targets Obatala, the attack has disadvantage. If the weapon forces a save instead, he takes half damage." }
    ],
    legendary: {
      count: 3,
      intro: "Obatala can take one legendary action at the end of another creature's turn. He regains spent legendary actions at the start of his turn.",
      actions: [
        { name: "Detect", cost: 1, text: "Obatala makes a Wisdom (Perception) check." },
        { name: "Tail Attack", cost: 1, text: "Obatala makes one tail attack." },
        { name: "Wing Attack", cost: 2, text: "Each creature within 10 ft.: DC 21 Dexterity save or 14 (2d6 + 7) bludgeoning and knocked prone. Obatala then flies up to half his speed." }
      ]
    },
    tactics: [
      "Does not fight in {@scene dragons-attack|the dragon ambush}. Arrives carrying {@c krull|Krull} when the fight ends and hovers between the combatants.",
      "Breathes cold as a warning shot into open air, not at anyone, when Krull calls the halt.",
      "If the party attacks Krull after the halt is called, fights for real with full stats above.",
      "In {@scene the-escape|the escape}, leads the pursuit in open sky together with any surviving tower dragons, using Frightful Presence and Cold Breath for real."
    ]
  },

  "krull": {
    name: "Krull",
    kind: "krull",
    role: "Arkhan's priest and seneschal, a tortle cleric who covets Arkhan's place",
    source: { page: "bestiary", name: "Krull", src: "BGDIA" },
    homebrew: "Scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons: HP 117 to 180, AC 17 to 19, save DC 16 to 18, spells up to 7th level, Multiattack added.",
    description: "An old tortle in ceremonial armour, wrinkled and slow. His shell is carved all over with tiny Draconic runes: hundreds of prayers to Tiamat, cut one by one. He carries a heavy maul and a sling bag that clinks. In the air he rides on Obatala's back; on the ground, at the tower, four ghouls trail him like hungry dogs until he clicks his tongue at them.",
    roleplay: [
      "Appearance: grey-green skin, cloudy old eyes, rune-carved shell, ceremonial plate. Smells of incense and grave dirt.",
      "Voice: slow, dry, grandfatherly. Calls everyone \"child\" or \"children\", even the dragons. Says \"tsk\" when someone dies.",
      "Wants: Arkhan's place as Tiamat's first champion. He has waited a century. He hides it well, but not perfectly.",
      "Knows: every secret of the tower, and lets no one inside. The way to the Monument. That Arkhan's body is rotting, and that the Hand may win in the end.",
      "Carries: a {@item +1 maul|DMG}, five healing potions ({@item potion of healing|DMG}), and two {@item soul coin|BGDIA}s in his sling bag.",
      "Sample line: \"Enough, children. You have made your point. All of you.\"",
      "Sample line: \"Tsk. That one is dead. Arkhan can fix that. For a price. Everything here has a price.\"",
      "Sample line: \"I do not let guests inside the tower. Nothing personal. The last guest became furniture.\"",
      "Sample line: \"Arkhan is a great man. A very great man. And great men grow tired, in the end.\"",
      "Sample line: \"Keep your hands where Obatala can see them. He is slow, but he does not forget.\""
    ],
    npc: false,
    sizeType: "Medium humanoid (tortle), lawful evil",
    ac: 19, acNote: "natural armor; 21 in Shell Defence",
    hp: 180, hpFormula: "24d8 + 72",
    speed: "30 ft.",
    abilities: { str: 20, dex: 14, con: 16, int: 12, wis: 22, cha: 12 },
    saves: "Con +7, Wis +10, Cha +5", skills: "Arcana +5, Medicine +10, Nature +5, Religion +5, Survival +10",
    vulnerable: "", resist: "", immune: "", condImmune: "",
    senses: "passive Perception 16",
    languages: "Common, Aquan, Draconic",
    cr: "12", xp: 8400, pb: 4,
    traits: [
      { name: "Hold Breath", text: "Can hold its breath for 1 hour." },
      { name: "Inescapable Destruction", text: "Krull's necrotic spell damage ignores resistance to necrotic damage." },
      { name: "Spellcasting", text: "14th-level cleric. Spell save DC 18, +10 to hit. Cantrips: chill touch, mending, sacred flame, spare the dying, thaumaturgy. 1st (4 slots): cure wounds, detect evil and good, inflict wounds. 2nd (3): hold person, spiritual weapon. 3rd (3): animate dead, spirit guardians, speak with dead. 4th (3): banishment, death ward, divination. 5th (2): contagion, flame strike, mass cure wounds. 6th (1): blade barrier, harm. 7th (1): fire storm, regenerate. Krull does not have raise dead himself; he can only broker Arkhan's innate raise dead (see {@side raise-the-dead|Raise the Dead}), not cast it." }
    ],
    actions: [
      { name: "Multiattack", text: "Krull makes two Maul attacks, or casts a spell and makes one Maul attack." },
      { name: "Claws", text: "Melee Weapon Attack: +9 to hit, reach 5 ft. Hit: 7 (1d4 + 5) piercing." },
      { name: "+1 Maul", text: "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 13 (2d6 + 6) bludgeoning plus 9 (2d8) necrotic." },
      { name: "Shell Defence", text: "Withdraws into its shell: +2 AC (AC 21), advantage on Str/Con saves; prone, speed 0, disadvantage on Dex saves, no reactions. Only action while inside is to emerge (bonus action)." }
    ],
    bonus: [], reactions: [],
    tactics: [
      "Heals both sides after {@scene dragons-attack|the dragon ambush}, without being asked ({@spell mass cure wounds}). A real courtesy, not a trick.",
      "In {@scene the-fight|the showdown}, stays near {@c arkhan-the-cruel|Arkhan}: {@spell mass cure wounds} when two or more allies are hurt, {@spell blade barrier} across the party's escape route, {@spell harm} on whoever is hurting Arkhan most. Unless he has already turned on the party or on Arkhan.",
      "If Arkhan mocks him (see {@side krull-trick|the Krull trick}), either attacks the party to prove his loyalty, or turns on Arkhan. Only once, either way.",
      "After the fight, brokers Arkhan's raise dead for a price he names. See {@side raise-the-dead|Raise the Dead}."
    ]
  },

  "arkhan-the-cruel": {
    name: "Arkhan the Cruel",
    kind: "arkhan-the-cruel",
    role: "Oathbreaker-paladin of Tiamat, Tiamat's champion. Calm, polite and very dangerous.",
    description: "A tall dragonborn in black obsidian dragon plate. Half of him is rotting. The left side of his face is grey and sunken, the scales peeling away, and a sweet smell of old meat drifts from under his armour. His left hand is not his own: a shrivelled black hand with long nails, fixed to his wrist with iron staples. That is the Hand of Vecna. Fane-Eater, his battleaxe, frosts the air around it. At his throat hangs a small crystal vial on a chain. The dark blood inside moves on its own.",
    roleplay: [
      "Appearance: champion of Tiamat in obsidian flint dragon plate. One side of his body is decaying because of the Hand of Vecna. He keeps that side turned away from guests when he can.",
      "Origin: he took the Hand of Vecna on a short trip to a distant world called Exandria, and cut off his own hand to wear it. Now he fights the Hand every day for control of his own body.",
      "Voice: soft, slow and polite. Never shouts. Calls people by what they are (priest, rider, old druid) until they earn a name. Sometimes pauses, as if listening to someone else. He is: Tiamat speaks to him.",
      "Wants: to master the Hand and use it to free Tiamat from Avernus. To hold back the rot, he must use the Hand to snuff out the life of good creatures. That is the real reason for his price.",
      "Faith: utterly devout. Every bargain is an offering to his queen. He keeps his word to the letter, because a broken oath would shame her.",
      "In battle: his blows blaze with Tiamat's radiant power. If the fight turns, he teleports home to his tower with as many allies as he can take, then brings the fallen back with {@spell revivify} and {@spell raise dead}.",
      "Knows: a great deal. See {@side what-arkhan-knows|What Arkhan Knows}.",
      "Sample line: \"Everyone who comes to me wants the blood. Nobody asks what it costs.\"",
      "Sample line: \"I do not haggle. I explain. Then you decide.\"",
      "Sample line: \"Look at my face, priest. This is what the Hand does to a man who does not feed it. I am not cruel. I am hungry.\"",
      "Sample line: \"No? Then we are still friends. Friends who want different things.\"",
      "Sample line (badly hurt): \"Enough. Torogar. Krull. To me.\""
    ],
    source: { page: "bestiary", name: "Arkhan the Cruel", src: "BGDIA" },
    npc: false,
    sizeType: "Medium humanoid (dragonborn), lawful evil",
    ac: 23, acNote: "obsidian flint dragon plate, shield",
    hp: 345, hpFormula: "30d8 + 210",
    speed: "40 ft.",
    abilities: { str: 20, dex: 12, con: 24, int: 10, wis: 10, cha: 20 },
    saves: "Wis +7, Cha +12", skills: "Athletics +12, Deception +12, Intimidation +12",
    vulnerable: "", resist: "fire, poison, bludgeoning/piercing/slashing from nonmagical attacks", immune: "",
    condImmune: "frightened",
    senses: "darkvision 60 ft. (sees invisible creatures to the same range), passive Perception 10",
    languages: "Common, Draconic",
    homebrew: "Buffed from the book's Arkhan to CR 22 for this table: 345 HP, AC 23, +15 Fane-Eater with Aura of Hate folded in; Hand of Vecna with 12 charges and the signature Vecna's Grip; 3 legendary actions (Strike, Hand of Vecna, Command the Line); Legendary Resistance 3/day; lair action (the skull's maw breathes).",
    cr: "22", xp: 41000, pb: 7,
    traits: [
      { name: "Special Equipment", text: "Wields Fane-Eater, a +3 battleaxe, and wears Obsidian Flint Dragon Plate (advantage on checks/saves to avoid or end being grappled). Fane-Eater and the Hand of Vecna never come off his body, dead or alive." },
      { name: "Aura of Hate", text: "While not incapacitated, Arkhan and all fiends/undead within 30 ft. deal +4 damage on melee weapon hits (already folded into the melee numbers below)." },
      { name: "Legendary Resistance (3/Day)", text: "If Arkhan fails a saving throw, he can choose to succeed instead." },
      { name: "Hand of Vecna (12 charges, regains 2d4+4 at dawn)", text: "Spell save DC 20. Finger of death (5 charges), slow (2), teleport (3), sleep (1). Vecna's Grip (signature, 4 charges): one creature within 60 ft., DC 20 Con save or restrained and silenced until the start of Arkhan's next turn." },
      { name: "Innate Spellcasting", text: "Charisma (spell save DC 20, +12 to hit). 3/day each: animate dead, branding smite, revivify. 1/day each: geas, raise dead." }
    ],
    actions: [
      { name: "Multiattack", text: "Arkhan makes three Fane-Eater attacks." },
      { name: "Fane-Eater (Battleaxe)", text: "+15 to hit, reach 5 ft. Hit: 16 (1d8 + 12) slashing plus 9 (2d8) cold. (He fights with a shield, so always one-handed.) On a natural 20: extra 9 (2d8) necrotic, and Arkhan regains that much hit points." },
      { name: "Javelin", text: "Ranged Weapon Attack: +12 to hit, range 30/120 ft. Hit: 8 (1d6 + 5) piercing. Used in melee it benefits from Aura of Hate: same +12 to hit, 12 (1d6 + 5 + 4) piercing." }
    ],
    bonus: [], reactions: [],
    legendary: {
      count: 3,
      intro: "Only one at a time, only at the end of another creature's turn. Regains all 3 at the start of his turn.",
      actions: [
        { name: "Strike", cost: 1, text: "One Fane-Eater attack (16 (1d8+12) slashing plus 9 (2d8) cold)." },
        { name: "Hand of Vecna", cost: 2, text: "Always costs 2 legendary actions. Arkhan casts slow, sleep or Vecna's Grip from the Hand, spending that spell's Hand charges as normal. Finger of death and teleport cannot be cast this way. Teleport (3 Hand charges) takes his action on his own turn: he and up to eight willing allies within 10 ft. vanish to his tower." },
        { name: "Command the Line", cost: 1, text: "Arkhan directs Torogar, Krull, the manticore, or a dragon: that ally gains advantage on its next attack, or may use its reaction early." }
      ]
    },
    lair: {
      initiative: 20,
      text: "The Skull's Maw Breathes (once per round, the Monument only). One of Tiamat's five voices hisses from the dark of the great skull, and a 30-ft. cone of that colour's breath rolls out of its maw, aimed only at the party and their allies, never at Arkhan's side. DC 16 save (type and ability per head: white/cold Con, black/acid Dex, green/poison Con, blue/lightning Dex, red/fire Dex), 21 (6d6) damage of that type, half on a success."
    },
    tactics: [
      "Round 1 action is Multiattack: three Fane-Eater hits on Drenwal, to remove the healer first.",
      "Round 1 legendary actions: Command the Line on {@c torogar-steelfist|Torogar} so his first hit lands with advantage, and Hand of Vecna (Vecna's Grip) if a caster is winding up a control spell.",
      "Target order after that: Drenwal first for full Multiattack; then Moonkite's rider, restrained rather than killed, because he still wants Moonkite; then Or'Henn, especially after he Wild Shapes; anyone who lands a hard debuff on him becomes his next target.",
      "Spends Hand of Vecna charges freely in rounds 1-2 while at full hit points. Goes conservative once bloodied, keeping at least 3 charges in reserve for teleport.",
      "Uses the lair action (the skull's breath) every round, cycling damage types, aimed only at the party.",
      "If the party is clearly winning, orders the {@c white-abishai|white abishai} around the tent to attack (1d4+1 arrive).",
      "Optional escalation (DM choice): as a bonus action he can call {@c asojano|Asojano}, the chimera that lairs deep in the skull. Add him with Add creature.",
      "Weapon blows blaze with Tiamat's radiant power ({@spell branding smite}). Revives fallen allies with {@spell revivify} as soon as he can.",
      "At roughly half hit points (about 173), teleports home to his tower with Hand of Vecna, taking as many allies as he can. Never risks losing Fane-Eater or the Hand of Vecna.",
      "If the party flees before he is bloodied, he does not chase personally. He sends Torogar and the manticore after them and stays in the Monument."
    ]
  }

});
