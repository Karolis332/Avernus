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
    portrait: "art/generated/slarkas-portrait.webp",
    role: "Tower dragon (black), sullen and sadistic",
    source: { page: "bestiary", name: "Adult Black Dragon", src: "MM" },
    homebrew: "Built for a party of 3 (L12 then; now L14, checked 2026-11-08: still a hard-to-deadly fight each, no change) + allies + the Lady Vengeance's force cannons: book young dragon raised to adult (MM stats), Legendary Resistance 1/day, Wingover reaction added.",
    description: "The oldest of the four, and he looks it. Gaunt and low-slung, near-black with an oily green sheen, he crouches more than he stands, like something waiting in a swamp. His face is bare bone: as with every old black dragon, the hide around his horns and cheeks has rotted away as if eaten by his own acid, leaving a skull with deep eye pits and horns that curve forward and down. One eye is milky and blind. Acid hangs from his jaws in long yellow strings and hisses where it lands. Buried in his chest, below the shoulder, is the head of a Hellrider lance: pale steel stamped with the sun of Elturel. It still shines a little. He stinks of rot and stagnant water.",
    roleplay: [
      "Lore (Monster Manual, black dragons): the most evil-tempered of the chromatics. They lair in swamps and ruins, fight from ambush, and enjoy watching prey despair. Slarkas is all of that. His silhouette at the table: the low, crouching skull.",
      "Personality: sullen, patient and sadistic. Likes to melt things slowly and watch. Hates anything that shines.",
      "The scar: Slarkas fought Zariel's Hellriders when they rode into Avernus, more than a hundred years ago. A rider put a sun-blessed lance through his chest, and the flash of holy fire burned out his left eye. The wound never healed. He never let anyone pull the lance head out: he wants to remember. The rider who did it is buried in this Crypt.",
      "Allegiance: his own hate. Arkhan holds his leash, and Slarkas obeys because Arkhan lets him hurt things. He serves Tiamat out of fear, not faith, so he rolls the {@side tiamats-dominion|Dominion} save.",
      "Wants: to melt every sun badge in Avernus. Fears: radiant light. The lance head burns when holy light comes near, and everyone can see him flinch.",
      "At the Crypt: the ward makes the old wound ache, so he is in a foul temper all siege. If a Hellrider banner comes out of the door ({@c veska|Veska's}), he forgets every order and goes for it. That makes the banner a lure.",
      "Voice: speaks only Draconic, and only to curse. Calls everyone \"meat\".",
      "Tell: before he breathes, he turns his head so his good eye is on the target.",
      "Sample line (Draconic): \"Hold still. It is better if you hold still.\"",
      "Sample line (Draconic, at a Hellrider banner): \"I remember that sun. I kept a piece of it.\""
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
      { name: "Legendary Resistance (1/Day)", text: "If Slarkas fails a saving throw, he can choose to succeed instead." },
      { name: "Breath vs. the Ship", text: "His breath weapon beats the Lady Vengeance's damage threshold of 15." },
      { name: "Old Wound (homebrew)", art: "art/generated/slarkas-old-wound.webp", text: "The Hellrider lance head in his chest is still blessed. When Slarkas takes radiant damage, he takes an extra 7 (2d6) radiant damage and can't use Wing Attack until the end of his next turn. A DC 15 Wisdom (Insight) or Intelligence (Religion) check spots the flinch and what causes it." }
    ],
    actions: [
      { name: "Multiattack", text: "Can use Frightful Presence, then one bite and two claws." },
      { name: "Bite", art: "art/generated/slarkas-bite.webp", text: "Melee Weapon Attack: +11 to hit, reach 10 ft. Hit: 17 (2d10 + 6) piercing plus 4 (1d8) acid. {@b Slow Melt (homebrew):} the acid clings. The target takes 7 (2d6) acid damage at the start of each of its turns until it, or a creature next to it, uses an action to scrape it off." },
      { name: "Claw", art: "art/generated/slarkas-claw.webp", text: "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 13 (2d6 + 6) slashing." },
      { name: "Tail", art: "art/generated/slarkas-tail.webp", text: "Melee Weapon Attack: +11 to hit, reach 15 ft. Hit: 15 (2d8 + 6) bludgeoning." },
      { name: "Frightful Presence", art: "art/generated/slarkas-frightful-presence.webp", text: "Each creature of its choice within 120 ft. aware of it: DC 16 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Acid Breath (Recharge 5-6)", art: "art/generated/slarkas-acid-breath.webp", text: "60-ft. line, 5 ft. wide. DC 18 Dexterity save, 54 (12d8) acid, half on a success." }
    ],
    bonus: [],
    reactions: [
      { name: "Wingover (homebrew, 1/round)", text: "When a ship weapon targets Slarkas, the attack has disadvantage. If the weapon forces a save instead, Slarkas takes half damage." }
    ],
    legendary: {
      count: 3,
      intro: "Slarkas can take one legendary action at the end of another creature's turn. He regains spent legendary actions at the start of his turn.",
      actions: [
        { name: "Detect", cost: 1, text: "Makes a Wisdom (Perception) check." },
        { name: "Tail Attack", art: "art/generated/slarkas-tail.webp", cost: 1, text: "Makes one tail attack." },
        { name: "Wing Attack", art: "art/generated/slarkas-wing-attack.webp", cost: 2, text: "Each creature within 10 ft.: DC 19 Dexterity save or 13 (2d6 + 6) bludgeoning and knocked prone. Slarkas then flies up to half its speed." }
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
    portrait: "art/generated/vistalancer-portrait.webp",
    role: "DEAD (Session 13, killed over the Styx by the Lady Vengeance). Tower dragon (blue), the fastest of the four",
    source: { page: "bestiary", name: "Adult Blue Dragon", src: "MM" },
    homebrew: "Built for a party of 3 (L12 then; now L14, checked 2026-11-08: still a hard-to-deadly fight each, no change) + allies + the Lady Vengeance's force cannons: book young dragon raised to adult (MM stats), Legendary Resistance 1/day, Wingover reaction added.",
    description: "Long and narrow, built like a thrown spear, and almost never on the ground. His scales run from bright azure on the back to deep indigo at the flanks, polished smooth by blown sand, with a pale belly. Lightning runs in veins through his wing membranes. Like every blue, he has a single great horn on his snout, and he is vainer about it than any of them: he has had it capped in forged steel, banded with rings and filed to a point like a knight's lance. A round hole the size of a shield is burned clean through his left wing, and he keeps that wing angled away from anyone he is talking to. Static crackles over him; the air smells of ozone, like a lightning strike, when he passes.",
    roleplay: [
      "Lore (Monster Manual, blue dragons): vain, territorial and methodical. Desert hunters that burrow in the sand to ambush and prefer to fight from the air, at range, on their own terms. They hate to look weak. Vistalancer's silhouette: the spear in the sky.",
      "Personality: vain, precise and careful to the point of cowardice. He is the fastest of the four because he is always ready to leave. He keeps score of every hit, out loud, and fights only while he is ahead.",
      "The scar: a force-cannon shot through the left wing. If the Lady Vengeance hit him at the tower, it was her guns, and he has not forgiven the ship. He flies a little crooked because of it, and hates anyone noticing.",
      "Allegiance: himself. He reports to Arkhan because Arkhan is winning. When Tiamat rises he goes with Krull without a save, because Krull looks likeliest to keep him alive.",
      "He can be turned: show him the odds. If the party has just driven off or badly hurt another dragon, a DC 18 Persuasion or Intimidation check makes him sit the fight out (advantage if they offer him gems, sapphires most of all, or a safe road out). Whatever he hears, Arkhan hears next, so a false plan told to him reaches Arkhan.",
      "Wants: to win without risk, and to be admired. Fears: a fair fight. Being seen to lose.",
      "Voice: crisp Draconic, counting. \"One. Two. Three.\"",
      "Tell: before he dives, he taps the steel cap of his horn twice against a claw.",
      "Sample line (Draconic): \"Four hits to your one, little boat. Shall we make it five?\"",
      "Sample line (Draconic, when the score turns): \"This is not a good number. I am leaving now.\""
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
      { name: "Legendary Resistance (1/Day)", text: "If Vistalancer fails a saving throw, he can choose to succeed instead." },
      { name: "Breath vs. the Ship", text: "His breath weapon beats the Lady Vengeance's damage threshold of 15." }
    ],
    actions: [
      { name: "Multiattack", text: "Can use Frightful Presence, then one bite and two claws." },
      { name: "Bite", art: "art/generated/vistalancer-bite.webp", text: "Melee Weapon Attack: +12 to hit, reach 10 ft. Hit: 18 (2d10 + 7) piercing plus 5 (1d10) lightning." },
      { name: "Claw", art: "art/generated/vistalancer-claw.webp", text: "Melee Weapon Attack: +12 to hit, reach 5 ft. Hit: 14 (2d6 + 7) slashing." },
      { name: "Tail", art: "art/generated/vistalancer-tail.webp", text: "Melee Weapon Attack: +12 to hit, reach 15 ft. Hit: 16 (2d8 + 7) bludgeoning." },
      { name: "Frightful Presence", art: "art/generated/vistalancer-frightful-presence.webp", text: "Each creature of its choice within 120 ft. aware of it: DC 17 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Lightning Breath (Recharge 5-6)", art: "art/generated/vistalancer-lightning-breath.webp", text: "90-ft. line, 5 ft. wide. DC 19 Dexterity save, 66 (12d10) lightning, half on a success." },
      { name: "Lance Dive (homebrew)", art: "art/generated/vistalancer-lance-dive.webp", text: "Replaces the bite in his Multiattack if he flew at least 30 ft. in a straight line this turn. Melee Weapon Attack: +12 to hit, reach 10 ft. Hit: 23 (3d10 + 7) piercing plus 11 (2d10) lightning, and a Large or smaller target must succeed on a DC 20 Strength save or be pushed 15 ft. and knocked prone." }
    ],
    bonus: [],
    reactions: [
      { name: "Wingover (homebrew, 1/round)", text: "When a ship weapon targets Vistalancer, the attack has disadvantage. If the weapon forces a save instead, Vistalancer takes half damage." },
      { name: "Clean Exit (homebrew)", art: "art/generated/vistalancer-clean-exit.webp", text: "When damage leaves Vistalancer below half his hit points (112), he flies up to his speed without provoking opportunity attacks. He comes back only when the fight turns his way again." }
    ],
    legendary: {
      count: 3,
      intro: "Vistalancer can take one legendary action at the end of another creature's turn. He regains spent legendary actions at the start of his turn.",
      actions: [
        { name: "Detect", cost: 1, text: "Makes a Wisdom (Perception) check." },
        { name: "Tail Attack", art: "art/generated/vistalancer-tail.webp", cost: 1, text: "Makes one tail attack." },
        { name: "Wing Attack", art: "art/generated/vistalancer-wing-attack.webp", cost: 2, text: "Each creature within 10 ft.: DC 20 Dexterity save or 14 (2d6 + 7) bludgeoning and knocked prone. Vistalancer then flies up to half its speed." }
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
    portrait: "art/generated/vermilius-portrait.webp",
    role: "Tower dragon (green), the cruelest talker",
    source: { page: "bestiary", name: "Adult Green Dragon", src: "MM" },
    homebrew: "Built for a party of 3 (L12 then; now L14, checked 2026-11-08: still a hard-to-deadly fight each, no change) + allies + the Lady Vengeance's force cannons: book young dragon raised to adult (MM stats), Legendary Resistance 1/day, Wingover reaction added.",
    description: "Long-limbed and serpentine, she sits still where the others pace. Her scales are a deep forest green, small and tight as mail, darker along her back and paler at the throat. Like every green, she has no outer ears: instead a crest of thin spines starts above her eyes and runs down her back, and long swept-back horns frame a narrow head with too many teeth. She smiles all the time. Gold rings climb her horns, one ring for every creature that ever asked her for help. Green smoke curls from her nostrils when she is amused. On her throat is a black handprint with long thin fingers, burned into the scales, and the scales there never grew back. She smells of chlorine and crushed leaves, sweet and sickly, like perfume.",
    roleplay: [
      "Lore (Monster Manual, green dragons): the most cunning of the chromatics. Liars, manipulators and lovers of talk, they toy with prey, charm servants and corrupt what they can. Vermilius is that, aimed at one person. Her silhouette: the still shape with the raised crest.",
      "Personality: a liar and a tease to everyone, and only ever truthful with Or'Henn. Tiamat told her the truth is the sharper hook. She is the only one of the four who talks to the party.",
      "The rings: eleven. Each one is a creature that asked her for help and got exactly what it asked for. There is one bare space on her left horn, kept for Or'Henn. A PC who looks closely (DC 15 Wisdom (Perception)) sees it is the only gap.",
      "The handprint: Arkhan once took her by the throat with the Hand of Vecna, and it marked her. She thinks it is an honour: she was chosen. She is right. It marks her as his vessel for the curse (see Bind the Vessel in {@scene arkhans-gambit|Arkhan's Gambit}). {@spell detect magic} shows necromancy in the print, and it is cold to the touch.",
      "Allegiance: Tiamat, first and only. She uses Arkhan the way he uses her, and she wants to be the vessel.",
      "Wants: Or'Henn to ask her for help, aloud. Fears: not being chosen, if the curse goes to the orb dragon or anyone else.",
      "Voice: purring Common to the party, mocking and amused. Low, gentle Draconic to Or'Henn alone.",
      "Tell: when she lies, the green smoke stops. When she tells the truth, it curls. A PC who watches her through two lies can learn it (DC 15 Wisdom (Insight)).",
      "Sample line: \"Pretty boat. It will make a lovely coffin. Oh, is that a celestial I smell? The master will want that.\"",
      "Sample line (Draconic, to Or'Henn): \"You need only ask. I will take it. I will take all of it.\""
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
      { name: "Bite", art: "art/generated/vermilius-bite.webp", text: "Melee Weapon Attack: +11 to hit, reach 10 ft. Hit: 17 (2d10 + 6) piercing plus 7 (2d6) poison." },
      { name: "Claw", art: "art/generated/vermilius-claw.webp", text: "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 13 (2d6 + 6) slashing." },
      { name: "Tail", art: "art/generated/vermilius-tail.webp", text: "Melee Weapon Attack: +11 to hit, reach 15 ft. Hit: 15 (2d8 + 6) bludgeoning." },
      { name: "Frightful Presence", art: "art/generated/vermilius-frightful-presence.webp", text: "Each creature of her choice within 120 ft. aware of her: DC 16 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Poison Breath (Recharge 5-6)", art: "art/generated/vermilius-poison-breath.webp", text: "60-ft. cone. DC 18 Constitution save, 56 (16d6) poison, half on a success." }
    ],
    bonus: [
      { name: "Honeyed Voice (homebrew)", art: "art/generated/vermilius-honeyed-voice.webp", text: "One creature within 120 ft. that can hear her: DC 16 Wisdom save or charmed until the end of its next turn. While charmed, it can't attack her or target her with a harmful spell, and if it moves, it must move toward her. Or'Henn has disadvantage on the save: the curse listens to her. She uses this instead of attacking first." }
    ],
    reactions: [
      { name: "Wingover (homebrew, 1/round)", text: "When a ship weapon targets Vermilius, the attack has disadvantage. If the weapon forces a save instead, she takes half damage." }
    ],
    legendary: {
      count: 3,
      intro: "Vermilius can take one legendary action at the end of another creature's turn. She regains spent legendary actions at the start of her turn.",
      actions: [
        { name: "Detect", cost: 1, text: "Makes a Wisdom (Perception) check." },
        { name: "Tail Attack", art: "art/generated/vermilius-tail.webp", cost: 1, text: "Makes one tail attack." },
        { name: "Wing Attack", art: "art/generated/vermilius-wing-attack.webp", cost: 2, text: "Each creature within 10 ft.: DC 19 Dexterity save or 13 (2d6 + 6) bludgeoning and knocked prone. Vermilius then flies up to half her speed." }
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
    portrait: "art/generated/flash-portrait.webp",
    role: "DEAD (Session 13, killed over the Styx by the Lady Vengeance). Tower dragon (red), the proudest, the hardest hitter",
    source: { page: "bestiary", name: "Adult Red Dragon", src: "MM" },
    homebrew: "Built for a party of 3 (L12 then; now L14, checked 2026-11-08: still a hard-to-deadly fight each, no change) + allies + the Lady Vengeance's force cannons. Book: a wyrmling. Here grown to an adult dragon (MM stats) for the ambush, Legendary Resistance 1/day, Wingover reaction added.",
    description: "The youngest dragon of the tower, and too big too fast. His scales are still the bright, glossy scarlet of a young red; they have not yet darkened to the deep crimson of an old one. He runs too hot for his own skin: glowing cracks run between his scales like lava under a crust, and heat shimmers off his back. He has grown into his horns before anything else: a crown of swept-back spikes, too many and too sharp, without a chip on any of them, and a spined crest down his neck that he flares at everything. He rears up on his hind legs to look bigger, and roars at things that do not need roaring at. He has no scars, not one, and the others have noticed. He smells of smoke and sulfur. Arkhan's people call him Flash. He hates it.",
    roleplay: [
      "Lore (Monster Manual, red dragons): the most arrogant and covetous of the chromatics. They see themselves as kings, take any slight as a challenge, and fly into rages. Flash has all of that and none of the age to back it up. His silhouette: the rearing scarlet shape that will not stop roaring.",
      "Personality: proud, hot-headed and desperate to prove he is not a hatchling. The only one of the four who truly believes.",
      "His name: his real name is Praxamor, and nobody uses it. A PC who does gets one round of his full attention: he listens, and Persuasion checks against him have advantage for that round.",
      "Hatched in Arkhan's tower from an egg Arkhan brought down from Faerûn. He prays to Tiamat every night, aloud, on the red spire. The others laugh at him for it.",
      "Allegiance: Tiamat, as a zealot, and Arkhan because Arkhan is her paladin. When Tiamat rises he kneels without a save and fights for her.",
      "Wants: a scar earned in a great fight, and for Tiamat to look at him. Fears: being called small, and being left behind.",
      "Voice: shrieking Draconic. Loses his temper if anyone calls him small or young.",
      "Tell: the cracks in his scales flare brighter the angrier he gets. When they go white, he is about to breathe.",
      "Sample line (Draconic): \"I am not a hatchling! Say it again. Say it again!\"",
      "Sample line (Draconic, to a whisper only he hears): \"Mother. Mother, watch me.\""
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
      { name: "Breath vs. the Ship", text: "His breath weapon beats the Lady Vengeance's damage threshold of 15." },
      { name: "Prove It (homebrew)", art: "art/generated/flash-prove-it.webp", text: "If a creature calls Flash small, young or a hatchling, or deals him the most damage in a round, he marks it (one creature at a time). He has advantage on attacks against the marked creature, and attacks against him have advantage too. This lasts until the marked creature drops or Flash falls below half his hit points (128)." },
      { name: "Overheat (homebrew)", art: "art/generated/flash-overheat.webp", text: "Below half his hit points, the cracks in his scales flare white: his Fire Breath recharges on a 4–6, and he sheds bright light for 30 ft. and can't hide." }
    ],
    actions: [
      { name: "Multiattack", text: "Can use Frightful Presence, then one bite and two claws." },
      { name: "Bite", art: "art/generated/flash-bite.webp", text: "Melee Weapon Attack: +14 to hit, reach 10 ft. Hit: 19 (2d10 + 8) piercing plus 7 (2d6) fire." },
      { name: "Claw", art: "art/generated/flash-claw.webp", text: "Melee Weapon Attack: +14 to hit, reach 5 ft. Hit: 15 (2d6 + 8) slashing." },
      { name: "Tail", art: "art/generated/flash-tail.webp", text: "Melee Weapon Attack: +14 to hit, reach 15 ft. Hit: 17 (2d8 + 8) bludgeoning." },
      { name: "Frightful Presence", art: "art/generated/flash-frightful-presence.webp", text: "Each creature of his choice within 120 ft. aware of him: DC 19 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Fire Breath (Recharge 5-6)", art: "art/generated/flash-fire-breath.webp", text: "60-ft. cone. DC 21 Dexterity save, 63 (18d6) fire, half on a success." }
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
        { name: "Tail Attack", art: "art/generated/flash-tail.webp", cost: 1, text: "Makes one tail attack." },
        { name: "Wing Attack", art: "art/generated/flash-wing-attack.webp", cost: 2, text: "Each creature within 10 ft.: DC 22 Dexterity save or 15 (2d6 + 8) bludgeoning and knocked prone. Flash then flies up to half his speed." }
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
    portrait: "art/generated/obatala-portrait.webp",
    role: "Krull's mount, the elder adult dragon that calls the halt",
    source: { page: "bestiary", name: "Adult White Dragon", src: "MM" },
    homebrew: "Elder adult: canon adult white, buffed above the four tower dragons (CR 14–17) so his 'ENOUGH!' lands; built for a party of 3 (L12 then; now L14, checked 2026-11-08: no change) + allies + the Lady Vengeance's force cannons.",
    description: "A huge white dragon, older and far heavier than the four in the spires: broad, low and thick-necked, built like a glacier rather than a spear. With age his scales have lost their glossy white for the pale grey and faint blue of old ice, and Avernus has stained them darker with ash and soot. He is always melting: icicles grow from his jaw and the trailing edges of his wings and drip as fast as they form, and steam rolls off his back. One great horn sweeps back on his left. The right is a stump, capped in carved bronze. On his back sits Krull's saddle: a lacquered howdah hung with chains and charms, with a small gilded shrine to Tiamat on top. Frost spreads wherever he lands and melts at once into mud.",
    roleplay: [
      "Lore (Monster Manual, white dragons): the most bestial of the chromatics. They run on instinct and on memory, and a white dragon never forgets a slight. Cold lands, frozen hoards, little talk. Obatala is that beast, made loyal. His silhouette: the wide grey mass with a shrine on its back.",
      "Personality: slow, sulky and loyal to Krull. Misses the cold. Not clever, but he never forgets a face that hurt Krull.",
      "The horn: he snapped it hauling Krull out of an ice crevasse in the far north, long before Avernus. Krull carved the bronze cap himself and cut a prayer to Tiamat into it, in the same tiny runes as on his shell.",
      "Allegiance: Krull. Only Krull. Not Arkhan, not Tiamat. Where Krull goes, he goes. If Krull turns ({@side krulls-offer|Krull's Offer}), Obatala turns with him without a word.",
      "The other four: loud children. He calls Flash \"Spark\" to watch the cracks flare.",
      "Wants: cold, and Krull safe. Fears: Krull dying in this furnace, a long way from snow.",
      "Voice: deep, slow Common, few words.",
      "Tell: when Krull clicks his tongue, Obatala's head comes up before the click is finished.",
      "Sample line: \"Krull says stop. So you stop.\"",
      "Sample line (to a PC who treated Krull well): \"Snow. You have seen snow? ... Good.\""
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
      { name: "Legendary Resistance (2/Day)", text: "If Obatala fails a save, he can choose to succeed instead." },
      { name: "Rimeground (homebrew)", art: "art/generated/obatala-rimeground.webp", text: "Where Obatala lands, the ground within 20 ft. of him freezes, then melts into deep, steaming mud at the start of his next turn. That ground is difficult terrain for the rest of the fight. He ignores it." }
    ],
    actions: [
      { name: "Multiattack", text: "Can use Frightful Presence, then one bite and two claws." },
      { name: "Bite", art: "art/generated/obatala-bite.webp", text: "Melee Weapon Attack: +13 to hit, reach 10 ft. Hit: 18 (2d10 + 7) piercing plus 9 (2d8) cold." },
      { name: "Claw", art: "art/generated/obatala-claw.webp", text: "Melee Weapon Attack: +13 to hit, reach 5 ft. Hit: 14 (2d6 + 7) slashing." },
      { name: "Tail", art: "art/generated/obatala-tail.webp", text: "Melee Weapon Attack: +13 to hit, reach 15 ft. Hit: 16 (2d8 + 7) bludgeoning." },
      { name: "Frightful Presence", art: "art/generated/obatala-frightful-presence.webp", text: "Each creature of his choice within 120 ft. aware of Obatala: DC 16 Wisdom save or frightened for 1 minute (repeat the save at the end of each turn; a success makes it immune for 24 hours)." },
      { name: "Cold Breath (Recharge 5-6)", art: "art/generated/obatala-cold-breath.webp", text: "60-ft. cone. DC 20 Constitution save, 63 (14d8) cold, half on a success." }
    ],
    bonus: [],
    reactions: [
      { name: "Wingover (homebrew, 1/round)", text: "When a ship weapon targets Obatala, the attack has disadvantage. If the weapon forces a save instead, he takes half damage." },
      { name: "Rider's Wing (homebrew)", art: "art/generated/obatala-riders-wing.webp", text: "When a creature he can see attacks Krull while Krull is on his back or within 10 ft. of him, Obatala swings a wing into the way. The attack targets Obatala instead." }
    ],
    legendary: {
      count: 3,
      intro: "Obatala can take one legendary action at the end of another creature's turn. He regains spent legendary actions at the start of his turn.",
      actions: [
        { name: "Detect", cost: 1, text: "Obatala makes a Wisdom (Perception) check." },
        { name: "Tail Attack", art: "art/generated/obatala-tail.webp", cost: 1, text: "Obatala makes one tail attack." },
        { name: "Wing Attack", art: "art/generated/obatala-wing-attack.webp", cost: 2, text: "Each creature within 10 ft.: DC 21 Dexterity save or 14 (2d6 + 7) bludgeoning and knocked prone. Obatala then flies up to half his speed." }
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
    homebrew: "Session 10 upscale to CR 17 for a level-13 party with a warship: HP 272, AC 20, save DC 20, 16th-level cleric (8th-level slot), 2 legendary actions. Earlier: scaled for a L12 party: HP 117 to 180, AC 17 to 19, save DC 16 to 18, spells up to 7th level, Multiattack added.",
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
    ac: 20, acNote: "natural armor; 22 in Shell Defence",
    hp: 272, hpFormula: "32d8 + 128",
    speed: "30 ft.",
    abilities: { str: 20, dex: 14, con: 18, int: 14, wis: 24, cha: 14 },
    saves: "Con +10, Wis +13, Cha +8", skills: "Arcana +8, Insight +13, Medicine +13, Religion +8, Survival +13",
    vulnerable: "", resist: "", immune: "", condImmune: "",
    senses: "passive Perception 17",
    languages: "Common, Aquan, Draconic",
    cr: "17", xp: 18000, pb: 6,
    traits: [
      { name: "Hold Breath", text: "Can hold its breath for 1 hour." },
      { name: "Inescapable Destruction", text: "Krull's necrotic spell damage ignores resistance to necrotic damage." },
      { name: "Spellcasting", text: "16th-level cleric. Spell save DC 20, +12 to hit. Cantrips: chill touch, mending, sacred flame, spare the dying, thaumaturgy. 1st (4 slots): cure wounds, detect evil and good, inflict wounds. 2nd (3): hold person, spiritual weapon. 3rd (3): animate dead, spirit guardians, speak with dead. 4th (3): banishment, death ward, divination. 5th (2): contagion, flame strike, mass cure wounds. 6th (1): blade barrier, harm. 7th (1): fire storm, regenerate. 8th (1): antimagic field, earthquake. Krull does not have raise dead himself; he can only broker Arkhan's innate raise dead (see {@side raise-the-dead|Raise the Dead}), not cast it." }
    ],
    actions: [
      { name: "Multiattack", text: "Krull makes two Maul attacks, or casts a spell and makes one Maul attack." },
      { name: "Claws", art: "art/generated/krull-claws.webp", text: "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 7 (1d4 + 5) piercing." },
      { name: "+1 Maul", art: "art/generated/krull-maul.webp", text: "Melee Weapon Attack: +12 to hit, reach 5 ft. Hit: 13 (2d6 + 6) bludgeoning plus 13 (3d8) necrotic." },
      { name: "Shell Defence", art: "art/generated/krull-shell-defence.webp", text: "Withdraws into its shell: +2 AC (AC 21), advantage on Str/Con saves; prone, speed 0, disadvantage on Dex saves, no reactions. Only action while inside is to emerge (bonus action)." }
    ],
    bonus: [], reactions: [],
    legendary: {
      count: 2,
      intro: "Krull can take 2 legendary actions, one at a time, at the end of another creature's turn. He regains them at the start of his turn.",
      actions: [
        { name: "Cantrip", cost: 1, text: "Krull casts a cantrip." },
        { name: "Mend the Wing", cost: 1, text: "One dragon Krull can see within 60 ft. regains 22 (4d10) hit points." },
        { name: "Unholy Word", art: "art/generated/krull-unholy-word.webp", cost: 2, text: "Krull speaks a word of Tiamat's. Each creature of his choice within 30 ft. makes a DC 20 Wisdom saving throw or is frightened of him until the end of its next turn." }
      ]
    },
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
    ac: 24, acNote: "obsidian flint dragon plate, shield, Tiamat's favour",
    hp: 460, hpFormula: "40d8 + 280",
    speed: "40 ft.",
    abilities: { str: 24, dex: 12, con: 24, int: 12, wis: 14, cha: 22 },
    saves: "Str +15, Con +15, Wis +10, Cha +14", skills: "Athletics +15, Deception +14, Intimidation +14, Religion +9",
    vulnerable: "", resist: "fire, poison, bludgeoning/piercing/slashing from nonmagical attacks", immune: "",
    condImmune: "charmed, frightened",
    senses: "darkvision 120 ft. (sees invisible creatures to the same range), passive Perception 12",
    languages: "Common, Draconic",
    homebrew: "Session 10 upscale to CR 25 (460 HP, AC 24, +18 Fane-Eater 2d8+14 plus 3d8 cold, DC 22, 4 legendary actions, Legendary Resistance 4/day, Breath of the Five, Tiamat's Chosen) because the party is level 13 with a warship. Earlier: buffed from the book's Arkhan to CR 22 for this table: 345 HP, AC 23, +15 Fane-Eater with Aura of Hate folded in; Hand of Vecna with 12 charges and the signature Vecna's Grip; 3 legendary actions (Strike, Hand of Vecna, Command the Line); Legendary Resistance 3/day; lair action (the skull's maw breathes).",
    cr: "25", xp: 75000, pb: 8,
    traits: [
      { name: "Special Equipment", text: "Wields Fane-Eater, a +3 battleaxe, and wears Obsidian Flint Dragon Plate (advantage on checks/saves to avoid or end being grappled). Fane-Eater and the Hand of Vecna never come off his body, dead or alive." },
      { name: "Aura of Hate", text: "While not incapacitated, Arkhan and all fiends/undead within 30 ft. deal +4 damage on melee weapon hits (already folded into the melee numbers below)." },
      { name: "Legendary Resistance (4/Day)", text: "If Arkhan fails a saving throw, he can choose to succeed instead." },
      { name: "Tiamat's Chosen", text: "The first time Arkhan drops to 0 hit points in a fight, he drops to 1 instead, and every chromatic dragon within 120 ft. that can see him uses its reaction to move up to its speed toward him." },
      { name: "Hand of Vecna (12 charges, regains 2d4+4 at dawn)", art: "art/generated/arkhan-the-cruel-hand-of-vecna.webp", text: "Spell save DC 22. Finger of death (5 charges), slow (2), teleport (3), sleep (1). Vecna's Grip (signature, 4 charges): one creature within 60 ft., DC 22 Con save or restrained and silenced until the start of Arkhan's next turn." },
      { name: "Innate Spellcasting", text: "Charisma (spell save DC 22, +14 to hit). 3/day each: animate dead, branding smite, revivify. 1/day each: geas, raise dead." }
    ],
    actions: [
      { name: "Multiattack", text: "Arkhan makes three Fane-Eater attacks. He can replace one of them with Breath of the Five, if it is available." },
      { name: "Fane-Eater (Battleaxe)", art: "art/generated/arkhan-the-cruel-fane-eater.webp", text: "+18 to hit, reach 5 ft. Hit: 23 (2d8 + 14) slashing plus 13 (3d8) cold. (He fights with a shield, so always one-handed.) On a natural 20: extra 18 (4d8) necrotic, and Arkhan regains that much hit points." },
      { name: "Breath of the Five (Recharge 5-6)", art: "art/generated/arkhan-the-cruel-breath-of-the-five.webp", text: "Arkhan exhales his queen's breath in a 60-ft. cone, choosing acid, cold, fire, lightning or poison. Each creature in the cone makes a DC 22 Dexterity saving throw (Constitution for cold or poison), taking 63 (18d6) damage of that type on a failure, or half as much on a success." },
      { name: "Javelin", art: "art/generated/arkhan-the-cruel-javelin.webp", text: "Ranged Weapon Attack: +15 to hit, range 30/120 ft. Hit: 10 (1d6 + 7) piercing. Used in melee it benefits from Aura of Hate: 14 (1d6 + 7 + 4) piercing." }
    ],
    bonus: [], reactions: [],
    legendary: {
      count: 4,
      intro: "Only one at a time, only at the end of another creature's turn. Regains all 4 at the start of his turn.",
      actions: [
        { name: "Strike", art: "art/generated/arkhan-the-cruel-fane-eater.webp", cost: 1, text: "One Fane-Eater attack (+18, 23 (2d8+14) slashing plus 13 (3d8) cold)." },
        { name: "Hand of Vecna", art: "art/generated/arkhan-the-cruel-hand-of-vecna.webp", cost: 2, text: "Always costs 2 legendary actions. Arkhan casts slow, sleep or Vecna's Grip from the Hand, spending that spell's Hand charges as normal. Finger of death and teleport cannot be cast this way. Teleport (3 Hand charges) takes his action on his own turn: he and up to eight willing allies within 10 ft. vanish to his tower." },
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
      "At roughly half hit points (about 230), teleports home to his tower with Hand of Vecna, taking as many allies as he can. Never risks losing Fane-Eater or the Hand of Vecna.",
      "If the party flees before he is bloodied, he does not chase personally. He sends Torogar and the manticore after them and stays in the Monument."
    ]
  }

});

// Arkhan's reference panels, moved here from Session 9 (2026-11-12) because his creature text links them in every session.
Object.assign(window.CAMPAIGN.side, {
    "what-arkhan-knows": {
      title: "What Arkhan Knows",
      blocks: [
        { t: "p", text: "Arkhan is old, well travelled and well informed. He answers in character, always politely, and always with a price or a twist. He never lies. He does not need to." },
        { t: "h", text: "Tiamat's blood" },
        { t: "read", text: "\"The blood of a goddess, still alive. It remembers being part of her. Spill it on the right ground and it breaks curses that she laid. Give it to the right devil and it buys you anything he has. Drink it...\" He smiles. \"Do not drink it.\"" },
        { t: "p", text: "{@b Price:} free. He wants them to want it more." },
        { t: "h", text: "Zariel" },
        { t: "read", text: "\"An angel who came down to win a war and stayed to rule the battlefield. She is a fine general and a poor queen. My queen has no love for her. If you plan to hurt Zariel, we may be friends for longer than you think.\"" },
        { t: "p", text: "{@b Twist:} Tiamat wants Zariel gone too. Arkhan hints that, for a price, Tiamat might help against her someday." },
        { t: "h", text: "Elturel" },
        { t: "read", text: "\"A whole city, dragged down on chains. The chains are pulling it toward the Styx. When it touches the water, every soul in it forgets itself, and Avernus gets a city of new devils. Cities do not fall into Hell by accident, you know. Someone always signs something.\"" },
        { t: "p", text: "{@b Twist:} he does not know whose name is on the deal, and says so. DM: use the last line only if you want to plant the contract clue." },
        { t: "h", text: "The Sword of Zariel" },
        { t: "read", text: "\"Her old blade. When she fell, someone who loved her carried it off the field and hid it, somewhere in this layer, I am told. Nobody has found it since. My queen would very much like to know where it went.\" His eyes drift to Lulu, and rest there a moment too long." },
        { t: "p", text: "{@b Twist:} he does not know about Lulu's past, but he suspects there is something holy about her. Asking more makes him curious, which is dangerous." },
        { t: "h", text: "Bel" },
        { t: "read", text: "\"The archduke Zariel threw down. He sits in his forge and builds her war machines and hates her every hour. He is a rival of mine. Anything you take from him makes me happy.\"" },
        { t: "p", text: "{@b Price:} a small one. Arkhan asks the party to tell Bel, when they meet him, that Arkhan sends his regards. Bel will not like it." },
        { t: "h", text: "The Hand of Vecna" },
        { t: "read", text: "\"I found it on a world called Exandria. A short trip, a long story. I cut off my own hand to wear it. Every day it asks me for something. Every day I say no, until I feed it. One day I will master it, and then I will open my queen's prison with it.\" He flexes the black fingers. \"Or it will master me.\"" },
        { t: "p", text: "{@b Twist:} he says it calmly. A successful DC 16 Wisdom (Insight) check shows that he is far more afraid than he sounds." },
        { t: "h", text: "Mephistopheles" },
        { t: "read", text: "\"The lord of the eighth layer. He keeps a mirror on the edge of Avernus and sells answers through it. Every answer is true. Every answer is aimed. He will take your soul coins and your blood, and he will thank you.\"" },
        { t: "h", text: "Dumal" },
        { t: "p", text: "Only if someone mentions Drenwal's brother, or a Bhaalspawn." },
        { t: "read", text: "\"A child of Bhaal, walking toward Mephistopheles' mirror? Yes. I heard something. The abishai talk. A son of murder went to ask the lord of the eighth for help against the people who set a demon prince on him.\" He looks at Drenwal. \"He sounded angry. Family usually is.\"" },
        { t: "p", text: "{@b Price:} for more detail (when Dumal passed, what he carried), Arkhan wants one small service later, no questions asked. If Drenwal agrees, see {@side gargauth-trick|The Gargauth Trick}: Gargauth has opinions about debts." }
      ]
    },
    "raise-the-dead": {
      title: "Raise the Dead",
      blocks: [
        { t: "p", text: "Krull does not have {@spell raise dead} himself. He brokers Arkhan's. Arkhan can cast {@spell revivify} three times a day and {@spell raise dead} once a day. Krull names the price; Arkhan does the casting." },
        { t: "read", text: "Krull kneels beside the body. He touches the cold forehead with one wrinkled finger and makes a small, sad noise.\n\n\"Tsk. Such a waste. Well. Arkhan can fix this, if you like. He has done it many times. It costs something, of course.\" He looks up at you with his cloudy old eyes. \"Everything here costs something.\"" },
        { t: "h", text: "The Price" },
        { t: "p", text: "Krull names one of these, and does not haggle much:" },
        { t: "list", items: [
          "{@b A favour.} One task for Arkhan later, no questions asked.",
          "{@b A soul coin.} Handed over now. Remind the table what a soul coin is.",
          "{@b A debt.} Information, an introduction, or standing as a future debt. Write it down in the campaign log."
        ] },
        { t: "h", text: "The Limits" },
        { t: "list", items: [
          "Only one {@spell raise dead} a day. If more than one character died, the party must choose who comes back first.",
          "{@spell Revivify} only works within one minute of death. If the fight is still on, Arkhan only uses it on his own people.",
          "If the characters are now Arkhan's enemies, Krull still offers, but the price is doubled, and Arkhan watches.",
          "If the party got the body out, Drenwal's own {@spell revivify} and {@spell raise dead} work by the normal rules. Arkhan keeps whatever falls in his temple: a character left behind in the showdown can only come back through this deal."
        ] },
        { t: "note", title: "Why Krull Offers", text: "Decide which it is: real respect for how they fought, or because a grateful party is a useful one to have owing you. Either way, Krull stays an uncertain figure the party might deal with again." }
      ]
    },
});
