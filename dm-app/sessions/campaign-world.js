// Campaign-wide: the world right now (day count, clocks, Emporium, factions, big players),
// how to play Zariel, and the endgame running notes (the research file, reorganised for the DM).
// Five compact stat blocks for faction fights the party could meet in Sessions 12-13. Statistics follow the
// openly licensed SRD chassis; every name, line and description is our own.
// Day count, Emporium stops and big-player moves are DM-facing PROPOSALS (tagged Homebrew), not canon.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.creatures, {

  "narzugon": {
    name: "Narzugon of Zariel's Legion",
    kind: "narzugon",
    role: "Zariel's mounted devil-knight. Herald, hunter, enforcer.",
    source: { page: "bestiary", name: "Horned Devil", src: "MM" },
    homebrew: "SRD horned devil chassis (CR 11) reskinned as a knight of the Legion. The printed narzugon is a CR 13 mounted devil; this one is on foot or on its own wings so it fits a small table. Added Zariel's Writ and Hellfire Lance. Run a lone narzugon as a messenger; run two as a hunting pair.",
    npc: false,
    sizeType: "Large fiend (devil), lawful evil",
    ac: 18, acNote: "natural armor, black-iron plate",
    hp: 178, hpFormula: "17d10 + 85",
    speed: "20 ft., fly 60 ft.",
    abilities: { str: 22, dex: 17, con: 21, int: 12, wis: 16, cha: 17 },
    saves: "Str +10, Dex +7, Wis +7, Cha +7", skills: "",
    vulnerable: "", resist: "cold; bludgeoning, piercing and slashing from nonmagical attacks that aren't silvered", immune: "fire, poison",
    condImmune: "poisoned",
    senses: "darkvision 120 ft., passive Perception 13",
    languages: "Infernal, telepathy 120 ft.",
    cr: "11", xp: 7200, pb: 4,
    traits: [
      { name: "Devil's Sight", text: "Magical darkness doesn't impede its darkvision." },
      { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
      { name: "Zariel's Writ (homebrew)", text: "Once per day it can speak a command in Zariel's name. One creature that can hear it makes a DC 16 Wisdom saving throw or is stunned until the end of its next turn. Anyone who has sworn an oath to Zariel or the Hellriders has disadvantage." }
    ],
    actions: [
      { name: "Multiattack", text: "Two melee attacks (Hellfire Lance and tail) and one Hurl Flame." },
      { name: "Hellfire Lance", text: "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (2d8 + 6) piercing damage plus 5 (1d10) fire damage." },
      { name: "Tail", text: "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 10 (1d8 + 6) piercing damage. A creature hit must succeed on a DC 17 Constitution saving throw or lose 10 (3d6) hit points at the start of each of its turns from an infernal wound. Each time the devil hits the wounded target, the damage increases by 10 (3d6). Any creature can use an action to staunch the wound; magical healing also ends it." },
      { name: "Hurl Flame", text: "Ranged Spell Attack: +7 to hit, range 150 ft., one target. Hit: 14 (4d6) fire damage. A flammable object that isn't worn or carried ignites." }
    ],
    bonus: [], reactions: [],
    tactics: [
      "It delivers its message first. It is a herald before it is a hunter. Offer a parley and it listens for a full round.",
      "If it fights, Hurl Flame at range, then closes on the caster. It uses Zariel's Writ on the PC who holds the Sword shard or Lulu's trail.",
      "It does not die for a lost cause. At a quarter of its hit points it flies for the Citadel road, because a report is worth more than a corpse.",
      "It never touches Lulu while Zariel is watching. She is to be brought in whole."
    ],
    description: "Black iron plate over a body the colour of old coal. A pennant on the lance shows a sun with the sword torn out of it. The visor opens on a face that looks tired, and the voice is very polite.",
    roleplay: [
      "Voice: courteous, flat, a clerk reading a warrant.",
      "Wants: the shard, the Sword's wielder, and Lulu, in that order.",
      "Sample line: \"My mistress asks that you not run. She says it tires everyone.\""
    ]
  },

  "vrock": {
    name: "Vrock (Blood War pack)",
    kind: "vrock",
    role: "Demon raider. Screams and spores.",
    source: { page: "bestiary", name: "Vrock", src: "MM" },
    homebrew: "SRD vrock, unchanged. For a pack, run 2 vrocks and 1 hezrou on one shared initiative with one collective save. Spores and Screech DCs stay at 14.",
    npc: false,
    sizeType: "Large fiend (demon), chaotic evil",
    ac: 15, acNote: "natural armor",
    hp: 104, hpFormula: "11d10 + 44",
    speed: "40 ft., fly 60 ft.",
    abilities: { str: 17, dex: 15, con: 18, int: 8, wis: 13, cha: 8 },
    saves: "Dex +5, Wis +4", skills: "",
    vulnerable: "", resist: "cold, fire, lightning; bludgeoning, piercing and slashing from nonmagical attacks that aren't silvered", immune: "poison",
    condImmune: "poisoned",
    senses: "darkvision 120 ft., passive Perception 11",
    languages: "Abyssal, telepathy 120 ft.",
    cr: "6", xp: 2300, pb: 3,
    traits: [
      { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." }
    ],
    actions: [
      { name: "Multiattack", text: "Two attacks: one with its beak and one with its talons." },
      { name: "Beak", text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage." },
      { name: "Talons", text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage." },
      { name: "Spores (Recharge 6)", text: "A 15-foot-radius cloud of spores bursts from the vrock and spreads around corners. Each creature in it must succeed on a DC 14 Constitution saving throw or be poisoned. A poisoned creature takes 5 (1d10) poison damage at the start of each of its turns and can repeat the save at the end of each of its turns. Holy water poured on it ends the effect." },
      { name: "Stunning Screech (1/Day)", text: "The vrock screeches. Each creature within 20 ft. that can hear it and isn't a demon must succeed on a DC 14 Constitution saving throw or be stunned until the end of the vrock's next turn." }
    ],
    bonus: [], reactions: [],
    tactics: [
      "Screech first if it can catch three or more. Then Spores on whoever is still bunched.",
      "They dive on casters and the ship's gunners and fly off again. They leave the front line to the hezrou.",
      "A pack ends when its hezrou falls: the vrocks lose heart and scatter on their own."
    ],
    description: "A vulture-shaped thing the size of a horse, with a man's hands and a mouth that has too many opinions.",
    roleplay: ["Voice: shrieks and half a sentence of Common. Wants: any soul that moves."]
  },

  "hezrou": {
    name: "Hezrou (Blood War pack)",
    kind: "hezrou",
    role: "Demon bruiser. The pack's anchor.",
    source: { page: "bestiary", name: "Hezrou", src: "MM" },
    homebrew: "SRD hezrou without Summon Demon, so a pack stays a pack and not a flood. Add it back (30 percent chance of 2d6 dretches) only for a boss fight.",
    npc: false,
    sizeType: "Large fiend (demon), chaotic evil",
    ac: 16, acNote: "natural armor",
    hp: 136, hpFormula: "13d10 + 65",
    speed: "30 ft.",
    abilities: { str: 19, dex: 17, con: 20, int: 5, wis: 12, cha: 13 },
    saves: "Str +7, Con +8, Wis +4", skills: "",
    vulnerable: "", resist: "cold, fire, lightning; bludgeoning, piercing and slashing from nonmagical attacks that aren't silvered", immune: "poison",
    condImmune: "poisoned",
    senses: "darkvision 120 ft., passive Perception 11",
    languages: "Abyssal, telepathy 120 ft.",
    cr: "8", xp: 3900, pb: 3,
    traits: [
      { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
      { name: "Stench", text: "A creature that starts its turn within 10 ft. of the hezrou must succeed on a DC 14 Constitution saving throw or be poisoned until the start of its next turn. On a success it is immune to this hezrou's stench for 24 hours." }
    ],
    actions: [
      { name: "Multiattack", text: "Three attacks: one with its bite and two with its claws." },
      { name: "Bite", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage." },
      { name: "Claw", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage." }
    ],
    bonus: [], reactions: [],
    tactics: [
      "It stands in the doorway or the choke point and does not move. Its stench does the work.",
      "It goes for whoever is not poisoned yet. It ignores the ship's guns and the allies.",
      "It does not flee. A hezrou that is losing keeps swinging."
    ],
    description: "A grey-green, toad-faced bulk that fills a corridor and smells like a drowned battlefield.",
    roleplay: ["Voice: slow, wet, pleased. Wants: to be the last thing standing."]
  },

  "ice-devil-agent": {
    name: "Cania's Envoy (Mephistopheles' agent)",
    kind: "ice-devil",
    role: "A devil of Cania sent to collect, to watch, or to make an offer.",
    source: { page: "bestiary", name: "Ice Devil", src: "MM" },
    homebrew: "SRD ice devil chassis (CR 14), with a Cania's Ledger trait and a politely worded reaction. Not for a straight fight: use it to deliver Mephistopheles' terms about the Shield, Dumal or Gargauth, and let the party refuse. Rigorath of Cania (cambion) is the usual contact; this is the muscle he sends.",
    npc: false,
    sizeType: "Large fiend (devil), lawful evil",
    ac: 18, acNote: "natural armor",
    hp: 180, hpFormula: "19d10 + 76",
    speed: "40 ft.",
    abilities: { str: 21, dex: 14, con: 18, int: 18, wis: 15, cha: 18 },
    saves: "Dex +9, Con +10, Wis +7, Cha +9", skills: "",
    vulnerable: "", resist: "bludgeoning, piercing and slashing from nonmagical attacks that aren't silvered; cold", immune: "fire, poison",
    condImmune: "poisoned",
    senses: "blindsight 60 ft., darkvision 120 ft., passive Perception 12",
    languages: "Infernal, telepathy 120 ft.",
    cr: "14", xp: 11500, pb: 5,
    traits: [
      { name: "Devil's Sight", text: "Magical darkness doesn't impede its darkvision." },
      { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
      { name: "Cania's Ledger (homebrew)", text: "It knows what each creature it can see owes and to whom. Once per turn, when it hits a creature that owes a debt or has an open bargain, the target takes an extra 7 (2d6) cold damage." }
    ],
    actions: [
      { name: "Multiattack", text: "Three attacks: one with its bite, one with its claws and one with its tail." },
      { name: "Bite", text: "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage plus 10 (3d6) cold damage." },
      { name: "Claws", text: "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 10 (2d4 + 5) slashing damage." },
      { name: "Tail", text: "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage plus 10 (3d6) cold damage." },
      { name: "Wall of Ice (Recharge 6)", text: "It casts {@spell wall of ice} (save DC 17), needing no components. Its Charisma is its spellcasting ability." }
    ],
    bonus: [], reactions: [],
    tactics: [
      "It opens with terms, not blows. It reads the offer from a scroll and waits for an answer.",
      "If the party refuses, it leaves. If the party attacks, Wall of Ice splits them and it fights the one who owes the most.",
      "It never fights near Dumal's host. Mephistopheles does not pay for a messenger to die for free."
    ],
    description: "Frost climbs the armour of a seven-foot devil whose tail is a sheaf of icicles. A ledger of black ice hangs from its belt.",
    roleplay: ["Voice: dry, polite, patient. Wants: a signature. Sample line: \"The Lord of Cania remembers every kindness. He charges interest on them.\""]
  },

  "bhaal-fanatic": {
    name: "Bhaal Cult Fanatic",
    kind: "cult-fanatic",
    role: "A killer-priest from the cult inside the Hellrider order.",
    source: { page: "bestiary", name: "Cult Fanatic", src: "MM" },
    homebrew: "SRD cult fanatic (CR 2) with a Bhaal's Mark trait. Comes in a cell of 4 to 6 on one shared initiative with one collective save. They are cheap on purpose: the point is that they know Drenwal's name. With the Hellriders' blue under the robe, they are the old guard Halvard feared.",
    npc: false,
    sizeType: "Medium humanoid (human), neutral evil",
    ac: 13, acNote: "leather armor",
    hp: 33, hpFormula: "6d8 + 6",
    speed: "30 ft.",
    abilities: { str: 11, dex: 14, con: 12, int: 10, wis: 13, cha: 14 },
    saves: "", skills: "Deception +4, Persuasion +4, Religion +2",
    vulnerable: "", resist: "", immune: "", condImmune: "",
    senses: "passive Perception 11",
    languages: "Common",
    cr: "2", xp: 450, pb: 2,
    traits: [
      { name: "Dark Devotion", text: "Advantage on saving throws against being charmed or frightened." },
      { name: "Bhaal's Mark (homebrew)", text: "A cultist knows the direction of any Bhaalspawn within 1 mile. It has advantage on attack rolls against a creature that carries Bhaal's blood or a Bhaal sigil." },
      { name: "Spellcasting", text: "4th-level cleric (Wisdom, spell save DC 11, +3 to hit). Cantrips: {@spell light}, {@spell sacred flame}, {@spell thaumaturgy}. 1st level (4 slots): {@spell command}, {@spell inflict wounds}, {@spell shield of faith}. 2nd level (3 slots): {@spell hold person}, {@spell spiritual weapon}." }
    ],
    actions: [
      { name: "Multiattack", text: "Two melee attacks." },
      { name: "Dagger", text: "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage." }
    ],
    bonus: [], reactions: [],
    tactics: [
      "They go for Drenwal, then for anyone who stands between him and them. They would rather take him alive: Bhaal wants his blood.",
      "Command on the front-liner, Hold Person on the one who can hurt them, Spiritual Weapon from behind the line.",
      "They break and run if their leader falls, but they do not talk: a captured cultist dies with the sentence unfinished."
    ],
    description: "Plain robes over old Hellrider blue. A scarlet hand is stitched on the inside of the sleeve, where only the wearer sees it.",
    roleplay: ["Voice: soft, reverent, glad. Sample line: \"Your father's name is in the order's book. The ink is wet.\""]
  },

    "urexiel": {
      name: "Lady Urexiel",
      kind: "urexiel",
      role: "Yugoloth broker, Keeper of the Scabrous Menagerie",
      homebrew: "Campaign boss on a chain devil chassis, scaled to solo CR 14. Use 190 hit points if Veska or Ser Lucan fight beside the party, 248 if the three characters face her alone.",
      npc: true,
      sizeType: "Medium fiend (yugoloth), neutral evil",
      ac: 18, acNote: "natural armor",
      hp: 248, hpFormula: "homebrew (190 with allies)",
      speed: "30 ft.",
      abilities: { str: 18, dex: 16, con: 18, int: 18, wis: 16, cha: 20 },
      saves: "Dex +7, Wis +8", skills: "Insight +8, Perception +8, Persuasion +10",
      vulnerable: "", resist: "cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks", immune: "acid, poison", condImmune: "poisoned",
      senses: "darkvision 120 ft., passive Perception 18",
      languages: "Abyssal, Common, Infernal, telepathy 120 ft.",
      cr: "14", xp: 11500, pb: 5,
      traits: [
        { name: "Legendary Resistance (3/Day)", text: "If she fails a saving throw, she can choose to succeed instead." },
        { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
        { name: "Collector's Verdict (1/Turn)", text: "No action needed. She appraises one creature she can see, out loud. It makes a DC 17 Wisdom saving throw or is frightened of her until the end of its next turn. \"Exquisite. And yet.\"" }
      ],
      actions: [
        { name: "Multiattack", text: "Four Animated Chain attacks. The walls of her collection answer her." },
        { name: "Animated Chain", text: "Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 11 (2d6 + 4) slashing, and the target is grappled (escape DC 16). While grappled, a barbed link bleeds it for 1d6 slashing at the start of each of its turns. She can hold up to four creatures." },
        { name: "Barb Yank (Recharge 4-6)", text: "One creature she has grappled makes a DC 15 Strength saving throw. On a failure it is dragged 20 ft. toward an open cage or the Feeding Chute and takes 11 (2d10) piercing." }
      ],
      bonus: [], reactions: [],
      legendary: {
        count: 3,
        intro: "Urexiel can take 3 legendary actions, one at a time, at the end of another creature's turn. She regains spent legendary actions at the start of her turn.",
        actions: [
          { name: "Chain Reach", cost: 1, text: "One Animated Chain attack." },
          { name: "Reposition", cost: 1, text: "Moves up to half her speed without provoking opportunity attacks." },
          { name: "Rattle the Ring", cost: 2, text: "Every creature she has grappled takes 1d6 slashing, and its escape DC rises by 2 until her next turn." }
        ]
      },
      lair: { initiative: 20, text: "On initiative 20, pick one. {@b Open a Pen:} a drop-gate opens and one specimen comes out. It attacks the nearest living thing, sometimes her own handlers. If it is one of Or'Henn's three beasts, it goes for her instead. {@b Feeding Chute:} a 10-ft. grate drops open; a creature on it makes a DC 15 Dexterity saving throw or slides into a lower pen ({@dice 2d6} damage, and company). {@b Trophy Light:} the vault lamps flare; every creature that can see Kreeg's box makes a DC 14 Wisdom saving throw or has disadvantage on its next attack." },
      tactics: [
        "She deals before she fights. She respects a writ, and she respects coin.",
        "She turns hostile the moment she decides the party is worth more caged than paid.",
        "Grapple the strongest fighter, then Barb Yank them toward an open cage. Collector's Verdict every turn on whoever is not grappled.",
        "Below half hit points, she retreats to the Killing Floor and opens every cage at once.",
        "The ledger is chained at her hip. If she dies in fire, it burns with her."
      ],
      description: "A tall, elegant yugoloth in layers of dark silk, with a jeweller's loupe on a chain and long grey fingers that never stop touching things. Chains hang from every wall of her collection, and they move when she looks at them.",
      roleplay: [
        "Appearance: dark silks, a loupe on a chain, a ring of keys at one hip and a lacquered ledger at the other.",
        "Voice: warm, delighted, a little bored. Every sentence sounds like a price.",
        "Wants: rare things, in matched sets. Or'Henn and his staff. A live dragon. An empyrean, if one walks in.",
        "Knows: she paid for the raid on the Ashen Garden. It was a job. She has no idea what the box is.",
        "Sample line: \"Buyers, or the beginnings of a very fine new exhibit. I do love a matched set.\""
      ]
    },

    "mezzoloth": {
      name: "Menagerie Handler",
      kind: "mezzoloth",
      role: "Mezzoloth handler patrolling the Pens",
      source: { page: "bestiary", name: "Mezzoloth", src: "MTF" },
      homebrew: "Mezzoloth chassis. They work the Pens with tridents and hooked poles.",
      npc: false,
      sizeType: "Medium fiend (yugoloth), neutral evil",
      ac: 18, acNote: "natural armor",
      hp: 75, hpFormula: "10d8 + 30",
      speed: "40 ft.",
      abilities: { str: 18, dex: 11, con: 16, int: 7, wis: 10, cha: 11 },
      saves: "", skills: "Perception +3",
      vulnerable: "", resist: "cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks", immune: "acid, poison", condImmune: "poisoned",
      senses: "blindsight 60 ft., darkvision 60 ft., passive Perception 13",
      languages: "Abyssal, Infernal, telepathy 60 ft.",
      cr: "5", xp: 1800, pb: 3,
      traits: [
        { name: "Innate Spellcasting", text: "Charisma (spell save DC 11). At will: {@spell darkness}, {@spell dispel magic}. 2/day: {@spell cloudkill}." },
        { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
        { name: "Magic Weapons", text: "Its weapon attacks are magical." }
      ],
      actions: [
        { name: "Multiattack", text: "One Claws attack and one Trident attack." },
        { name: "Claws", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing." },
        { name: "Trident", text: "Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 7 (1d6 + 4) piercing, or 8 (1d8 + 4) if used with two hands." },
        { name: "Teleport", text: "Magically teleports, with what it carries, up to 60 ft. to a place it can see." }
      ],
      bonus: [], reactions: [],
      tactics: [
        "On round 2, one handler teleports to the vault to warn Urexiel. Then she is ready when the party arrives.",
        "Cloudkill into a crowded aisle. The caged beasts scream, and that brings more handlers."
      ],
      description: "A man-sized insect in a leather apron, four arms, a trident in two of them and a hooked pole in the others. It smells of feed and disinfectant.",
      roleplay: ["Does not talk. Clicks, and points at the exit."]
    },

    "kreeg": {
      name: "Thavius Kreeg",
      kind: "kreeg",
      role: "Amnizu dockmaster of the Styx. The man who sold Elturel",
      source: { page: "bestiary", name: "Amnizu", src: "MTF" },
      homebrew: "Campaign boss on the amnizu chassis (Mordenkainen's Tome of Foes), raised to CR 22 to stand beside Arkhan. Zariel made him master of the Styx at this Dock, and every soul that passes through his ledger feeds him. Killed in the Nine Hells, he is destroyed for good.",
      npc: true,
      sizeType: "Medium fiend (devil), lawful evil",
      ac: 22, acNote: "natural armor",
      hp: 342, hpFormula: "36d8 + 180",
      speed: "30 ft., fly 40 ft.",
      abilities: { str: 11, dex: 14, con: 20, int: 24, wis: 16, cha: 22 },
      saves: "Dex +9, Con +12, Wis +10, Cha +13", skills: "Arcana +14, Deception +13, Insight +10, Perception +10, Persuasion +13",
      vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered", immune: "fire, poison", condImmune: "charmed, poisoned",
      senses: "truesight 60 ft., darkvision 120 ft., passive Perception 20",
      languages: "Common, Infernal, telepathy 1,000 ft.",
      cr: "22", xp: 41000, pb: 7,
      traits: [
        { name: "Devil's Sight", text: "Magical darkness doesn't impede his darkvision." },
        { name: "Legendary Resistance (3/Day)", text: "If he fails a saving throw, he can choose to succeed instead." },
        { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
        { name: "Innate Spellcasting", text: "Intelligence (spell save DC 22, +14 to hit). At will: {@spell charm person}, {@spell command}, {@spell detect thoughts}, {@spell suggestion}. 3/day each: {@spell dominate monster}, {@spell modify memory}. 1/day each: {@spell feeblemind}, {@spell mass suggestion}." },
        { name: "Ledger of Forgetting", text: "When a creature stunned by his Forgetfulness stays stunned for the full minute, Kreeg can take one memory of his choice instead of the last 5 hours, however old it is. He writes it in his ledger as a single line. Reading that line aloud to the creature gives the memory back. {@spell Greater restoration} does not. Burning the page loses it forever." },
        { name: "Escape Clause (1/Day)", text: "When he drops to 0 hit points, he drops to 1 instead and vanishes into the ledger room under the tollhouse. Each creature that saw it makes a DC 22 Intelligence saving throw or forgets where he went. Speaking his true name, or {@item dimensional shackles|DMG} on his wrists, stops this." }
      ],
      actions: [
        { name: "Multiattack", text: "He uses Poison Mind, then makes two Taint attacks." },
        { name: "Taint", text: "Melee Spell Attack: +14 to hit, reach 5 ft., one target. Hit: 33 (6d10) necrotic, and the target can't regain hit points until the start of his next turn." },
        { name: "Poison Mind", text: "Up to three creatures he can see within 60 ft. make a DC 22 Wisdom saving throw. On a failure, each takes 32 (5d12) necrotic and is blinded until the start of his next turn. On a success, half damage and not blinded." },
        { name: "Forgetfulness (Recharge 5-6)", text: "One creature he can see within 60 ft. makes a DC 22 Intelligence saving throw or is stunned for 1 minute. It repeats the save at the end of each of its turns, ending the effect on a success. If it stays stunned for the full minute, it forgets everything from the last 5 hours, or he uses his Ledger of Forgetting." }
      ],
      bonus: [
        { name: "Dockmaster's Order", text: "One devil on the Dock that can hear his telepathy uses its reaction to move up to its speed and make one attack." }
      ],
      reactions: [
        { name: "Instinctive Attraction", text: "When a creature he can see targets him with a spell, the caster makes a DC 22 Wisdom saving throw. On a failure, the spell targets the creature closest to the caster instead, other than Kreeg or the caster. It fails against a caster who can't be charmed." }
      ],
      legendary: {
        count: 3,
        intro: "Kreeg can take 3 legendary actions, one at a time, at the end of another creature's turn. He regains spent legendary actions at the start of his turn.",
        actions: [
          { name: "Taint", cost: 1, text: "One Taint attack." },
          { name: "Command", cost: 1, text: "He casts {@spell command}." },
          { name: "Poison Mind", cost: 2, text: "He uses Poison Mind." },
          { name: "Strike from the Record", cost: 3, text: "One creature he can see within 60 ft. makes a DC 22 Charisma saving throw. On a failure it vanishes until the end of its next turn and takes 22 (4d10) psychic. Until it comes back, its allies forget it was ever there: they can't target it with spells or help it. It reappears in the space it left, or the nearest free one." }
        ]
      },
      lair: { initiative: 20, text: "On initiative 20, while he is on the Dock, pick one. {@b The Styx Rises:} a black wave sweeps a 20-ft. stretch of the wharf. Each creature there makes a DC 18 Dexterity saving throw; on a failure the Styx touches it, and it makes a DC 15 Intelligence saving throw or forgets the last day. A creature knocked into the river is targeted by {@spell feeblemind}. {@b The Count:} every lemure on the Dock chants numbers at once. Each creature of his choice makes a DC 18 Wisdom saving throw or has disadvantage on concentration saves and can't take reactions until initiative 20 next round. {@b Barge Chains:} a mooring chain lashes out at one creature within 10 ft. of the edge. DC 18 Strength saving throw, or it is pulled 10 ft. toward the water." },
      tactics: [
        "He would rather talk, and he would rather you forgot. Charm person, suggestion and command before anything that hurts.",
        "Forgetfulness on whoever is carrying Lulu, or on Lulu herself if he has guessed who she is.",
        "Dominate monster on Uldrak if he is here, otherwise on the strongest fighter, and turn them on their friends.",
        "Strike from the Record on the healer, so the party forgets to save whoever is dying.",
        "Lair actions: The Styx Rises first, while people are still standing near the edge.",
        "Below 100 hit points he offers terms: his signature, for his life. He means it, this once. At 0 he uses the Escape Clause, and the hunt moves under the tollhouse."
      ],
      description: "A gaunt grey devil in a clerk's black robe, with a long bald skull, small dark wings folded like a coat, and fingers stained black with ink. On one finger, much too small for it now, is a High Overseer's ring with a cracked sun on it.",
      roleplay: [
        "Appearance: an amnizu. Inky fingers. The old ring. He keeps his face turned a little away, the way he did at the Ashen Garden.",
        "Voice: dry, precise, reasonable. He talks like a man explaining a fair price.",
        "Wants: out from under Zariel before Elturel touches the Styx and she collects him. His box back. His gardener back.",
        "Knows: everything about the contract. The Companion is a planetar in chains. The Creed Resolute. A living signatory can sign it away.",
        "Sample line: \"Gardener. You're late. The roses will be dead.\""
      ]
    }

});

Object.assign(window.CAMPAIGN.side, {

  // ---------------------------------------------------------------------------
  "world-state": {
    title: "The World Right Now",
    blocks: [
      { t: "note", title: "How to use this", text: "One page for what is happening in Avernus while the party is busy. Everything here that is a number, a date or a move by a big player is a {@b proposal for the DM} (tagged Homebrew, each with a one-line why). Change any of it. The campaign-state file does not keep a single day counter; this page derives one." },

      { t: "h", text: "Avernus Right Now" },
      { t: "p", text: "{@b Day 12} of the Avernus count. {@b DM to confirm.} Day 0 is the end of Session 5, when the 17-day clock to the Bleeding Citadel started. The Citadel window is estimated to open on {@b Day 17}, about five days from now." },
      { t: "list", items: [
        "{@b Dumal's Ascension:} estimate {@b segment 4 of 6} (Session 9 began at 1; nobody has acted against him since). Beat 4, The Sister at the Door, is live. Segment 5 gives a one-session warning before the siege. See {@side arc-dumal|Arc: Drenwal and Dumal}.",
        "{@b Feonor's geas:} day 6 of 30 (the Uldrak dawn was day 4). It lapses on Day 36. She delivered Cinderbloom, so she is a bought-off frenemy now, not a captive.",
        "{@b Or'Henn's curse:} 0 gold scales. The curse is live. Tiamat's visions come at rest and in the worst moment. See {@side arc-tiamat|Arc: Or'Henn and Tiamat}.",
        "{@b The Crypt's ward:} 6 segments, {@b 0 filled} when Session 12 opens. The knock cracked it. Each segment that fills lets more evil lean on the door; at 6, evil can enter. Proposed ticks: one segment at the end of each big scene or each time the party makes noise at the door.",
        "{@b The Soul Council's one-week clock} (Asimov's recruitment) began at the end of Session 7 and has lapsed on paper. Decide what the Council did about it (the simplest answer: it noticed the curse on Or'Henn and extended the clock for a price).",
        "{@b The Citadel window:} manifests every 33 days. Eventyr's road is the Scab, then the Citadel, then Yael, then Idyllglen. Decide what happens if the party is late: the Citadel stays, but the shard's hum fades and Zariel's riders reach it first."
      ] },
      { t: "more", title: "Where Day 12 comes from (assumptions)", src: ["Homebrew"], blocks: [
        { t: "list", items: [
          "Day 0 = the end of Session 5, when Dumal left the 17-day clock to the Citadel window.",
          "Sessions 6 to 8 (Bel's Forge route, the Last Hill, the Emporium): +4 days.",
          "Session 9 (the tower, the Monument, Word of Recall): +2 days.",
          "Session 10 (the Styx run to Uldrak's Grave): +4 days. This matches the campaign-state note that the dawn after the Grave is day 4 of Feonor's geas.",
          "Session 11 (the Crypt road, the Cinderbloom errand): +2 days.",
          "Total 12. If the table ran any of these faster, subtract. The danger is the 17-day window: if you want the party hurried, keep Day 12. If you want room for the Scab, move it to Day 8."
        ] },
        { t: "p", text: "Why it matters: it makes the Citadel window a real clock, which sets how long the party can afford to spend in the siege." }
      ] },

      { t: "h", text: "The Wandering Emporium" },
      { t: "p", text: "Mahadi's caravan moves; the book does not say where. Proposed route, following the party and the money. See also the store reference in {@b wandering-emporium-reference.md}." },
      { t: "list", items: [
        "{@b Now (Days 12 to 14): Ash Ford,} one day from the Crypt hill. Mahadi sells to the dragons' camp and does not mind who is watching. He wants Red Ruth's leftovers from the party.",
        "{@b Days 15 to 17: the mouth of the Scab road.} The last honest shop before the Citadel window. He sells to anyone going in.",
        "{@b Days 18 to 21: under the first arch of the Scab,} on the gnoll side. The market gets rough; bargains here cost more than gold.",
        "{@b Days 22 to 25: the shadow of the Bleeding Citadel.} He is there for the aftermath. If the party succeeds he sells the story."
      ] },
      { t: "more", title: "Why these stops", src: ["Homebrew"], blocks: [
        { t: "p", text: "Mahadi follows profit. The Crypt siege brings a crowd, then the Citadel window brings another. Putting the caravan on the party's road keeps shopping, barter and Mahadi's trade for Red Ruth's secrets available without a detour. If you would rather the Emporium be far away, move it and make a runner (see the Fort Knucklebone runner in the Emporium reference) carry its offers." }
      ] },

      { t: "h", text: "Factions and Gangs" },
      { t: "p", text: "Who the party can meet on the road, each with a hook and where to find the stats. Fights this arc are the ones with a block; the rest are talk." },
      { t: "list", items: [
        "{@b Arkhan's dragon cult.} Besieging the Crypt. {@c arkhan-the-cruel|Arkhan}, {@c skarrix|Slarkas}, {@c vhennic|Vistalancer}, {@c mirelle|Vermilius}, {@c praxamor|Flash}, {@c obatala|Obatala} and {@c krull|Krull}. Hook: they want the orb back and Or'Henn begging a dragon for help. Not a fight to win.",
        "{@b Zariel's legions and narzugons.} Her riders reach for the shard, the Sword and Lulu. Hook: a herald with a polite writ. Stats: {@c narzugon|Narzugon}. See {@side zariel|Playing Zariel}.",
        "{@b Haruman's riders.} Haruman is dead, so his Crimson Legion riders are leaderless: deserters, mercenaries, or a new boss looking for a banner. Hook: they sell their loyalty to whoever holds the Haruman piece. No block: use a Veteran for each rider and a Knight for a sergeant (SRD), or {@c hellrider-ghost|the ghosts} if the dead rise.",
        "{@b Mad Maggie's warband (Fort Knucklebone).} Maggie is a night hag; Chukka and Clonk repair war machines, Mickey and Barnabas run her errands. Hook: she trades in memories, and after three big trades Zariel notices her. Not a fight this arc. Stats: Night Hag (MM, CR 5); the book entry for Fort Knucklebone has the rest.",
        "{@b Bel.} Former lord of Avernus, now Zariel's lieutenant, and a schemer who hates her. Hook: he sells the Arches of Ulloch route if someone brings him the adamantine control rods. Not a fight this arc. Stats: the printed adventure (an SRD pit fiend, CR 20, is the close chassis). Check the book for the exact entry.",
        "{@b Mephistopheles' agents.} Cania's envoys come to collect on Dumal's lien and to buy the Shield of the Hidden Lord. Hook: an offer that is true and poisoned. Stats: {@c ice-devil-agent|Cania's Envoy}. Mephistopheles himself (Mordenkainen's Tome of Foes, CR 26) is never a fight.",
        "{@b Rigorath of Cania.} The cambion at the Mirror of Mephistar, who carries petitions down to Cania. Hook: he sells Dumal's terms word for word for Blood Pay or five soul coins, and he wants the Shield. Stats: Cambion (MM, CR 5). See {@side arc-dumal}.",
        "{@b The Bhaal cult.} The sect inside the old Hellrider order that murdered Halvard. Hook: cells hunt Drenwal and Senna. Stats: {@c bhaal-fanatic|Bhaal Cult Fanatic}. See {@side arc-drenwal|Arc: Drenwal}.",
        "{@b Thavius Kreeg.} Amnizu at the Stygian Dock, Or'Henn's former estate-master and the lever on Elturel's pact. Hook: he trades for forgotten memories and true names. Stats: {@c kreeg|Kreeg}.",
        "{@b Urexiel's yugoloths.} The Scabrous Menagerie's keeper and her handlers. Hook: she wants Or'Henn or a live dragon for Cinderbloom, and her vault is full. Stats: {@c urexiel|Urexiel} and {@c mezzoloth|the mezzoloth handler}.",
        "{@b The Harpers (Issa).} Issa is Senna's guardian and the party's only quiet ally. Hook: her letter arrives at segment 4 of Dumal's clock. Not a fight. Stats: a Spy (SRD, CR 1) with two Harper agents; {@side arc-dumal|Arc: Drenwal and Dumal} says how to use her.",
        "{@b Blood War demon packs.} Raiders that cross the wastes between battles. Hook: a pack hits the party as they leave the Crypt, or rides in on a smoking portal as a distraction. Stats: {@c vrock|Vrock} and {@c hezrou|Hezrou}. Run 2 vrocks and 1 hezrou as one group."
      ] },

      { t: "h", text: "Dumal: The Full Briefing" },
      { t: "p", text: "The full plan stays in {@side arc-dumal|Arc: Drenwal and Dumal}. This page is the short version for a DM who needs him in one minute." },
      { t: "more", title: "Backstory and what he wants", src: ["Homebrew"], blocks: [
        { t: "list", items: [
          "{@b Who he is:} {@c dumal|Dumal}, Drenwal's older brother, a Bhaalspawn. Their mother self-poisoned; their father Halvard was murdered by a Bhaal cult inside the Hellrider order. He raised Drenwal's grudges and his own, and has the family's one living secret, their sister Senna (about six, raised by the Harper Issa).",
          "{@b What he wants:} Drenwal beside him; revenge on the party that loosed Yeenoghu on him; Bhaal's favour back; Senna safe in a family that is whole.",
          "{@b What he fears:} Bhaal has gone cold. He went to a devil because he is afraid, and the lien he signed makes his soul Cania's, not Bhaal's."
        ] }
      ] },
      { t: "more", title: "Where he is now and what he does each week", src: ["Homebrew"], blocks: [
        { t: "p", text: "{@b Where:} on the frozen crag by the Mirror of Mephistar, camped with the host Cania loaned him: spined devils, bone devils, a Bhaal cell. Rigorath comes and goes through the black ice." },
        { t: "list", items: [
          "{@b Week one of any stretch:} he drills the host and asks Rigorath what Mephistopheles has heard of the Shield. He scries Drenwal through shared blood. Clock +1 if nobody acted against him.",
          "{@b Week two:} he sends Vix (the imp) or a herald with an offer: the shield for peace. He moves a cell toward the Crypt or the ship.",
          "{@b Week three:} he fetches Senna if the trail is warm. If Issa has been warned, he finds the Harper safehouse and starts the Beat 4 confrontation.",
          "{@b Every week:} he speaks to Bhaal, who does not answer. Each silence raises the pressure to do something dramatic."
        ] },
        { t: "p", text: "Why: the clock in the arc file needs a rhythm, and these are the actions that tick it. If the party never acts, he arrives at segment 6 with the siege. If they do, the weekly list gives the DM something to cancel, one move at a time." }
      ] },
      { t: "more", title: "The clock in one line", src: ["Homebrew"], blocks: [
        { t: "p", text: "Six segments: The Petition, Cania Answers, The Host Gathers, The Sister at the Door, The March, Ascension. Estimate 4 now. The siege falls on 6. Acting against him in a session cancels that session's tick; breaking a piece of his plan erases one segment. All of it is in the arc file." }
      ] },

      { t: "h", text: "The Big Players' Moves This Week" },
      { t: "more", title: "Zariel", src: ["Homebrew"], blocks: [
        { t: "p", text: "{@b This week:} her riders comb the Scab road for the missing shard, because the Sword has felt the loss since Olanthius's keeping broke. She has not forgotten Lulu; her patrols ask after a white shape on a hidden ship. {@b She wants:} the shard, Lulu, and a wielder she can bend. She is not ready to be seen. {@b Why:} Chapter 5 needs her to arrive having already been felt. See {@side zariel|Playing Zariel}." }
      ] },
      { t: "more", title: "Bel", src: ["Homebrew"], blocks: [
        { t: "p", text: "{@b This week:} he sits at his forge and counts who has crossed the Scab. He will sell the road to the Arches for the rods, and he will hand Zariel any traitor who offers him a better deal. {@b He wants:} adamantine control rods and a way to make Zariel's fall faster. {@b Why:} he hates her and he is patient, so he waits for the party to reach him." }
      ] },
      { t: "more", title: "Mephistopheles", src: ["Homebrew"], blocks: [
        { t: "p", text: "{@b This week:} he collects. Dumal is his lever on the party; Gargauth is his lever on Hell's politics. He sends an envoy to the Crypt with terms. {@b He wants:} the Shield of the Hidden Lord with Gargauth in it. {@b Why:} every Hell player collects pieces against Zariel, and he is the only one who does it without ever leaving his throne." }
      ] },
      { t: "more", title: "Tiamat", src: ["Homebrew"], blocks: [
        { t: "p", text: "{@b This week:} Small Visions at every rest. Vermilius's kind offer rides outside the Crypt door, ready for the moment the curse jumps. {@b She wants:} Or'Henn to ask a dragon for help. She never lies to him, so the gifts are all true. {@b Why:} the siege makes the ask nearly irresistible, which is the exact trap." }
      ] }
    ]
  },

  // ---------------------------------------------------------------------------
  "zariel": {
    title: "Playing Zariel",
    blocks: [
      { t: "note", title: "The one-line version", text: "Zariel is a commander who has been right about the cost of war for longer than anyone alive, and who has paid for it with everything. She is never cruel for pleasure. She is never in a hurry. She does not lie; she lets true things do the lying. The danger is that she can be understood." },

      { t: "h", text: "Her Voice" },
      { t: "list", items: [
        "{@b Tone:} calm, formal, tired. She does not raise her voice, because she has never needed to. Short sentences, orders and conditionals: \"If you do this, then.\"",
        "{@b Words she uses:} \"the line,\" \"the cost,\" \"the Charge,\" \"your duty.\" She names people by what they did, not what they are.",
        "{@b Words she never uses:} \"please,\" \"sorry,\" \"mortal.\" She says \"soldier\" when she is pleased and \"child\" when she is not.",
        "{@b Body:} still. One hand rests where a sword would hang. When Lulu is mentioned, that hand closes."
      ] },
      { t: "h", text: "What She Wants" },
      { t: "list", items: [
        "{@b To win the Blood War.} Everything else is a means. She believes Hell's price for her fall was a fair trade if the line holds.",
        "{@b The Sword, whole, in a hand she can trust.} She cannot take it herself; the Sword is the one thing that would hurt her. She wants it in the party's hands, on her terms.",
        "{@b Elturel as a debt.} Kreeg's pact is her leverage on the city. She will release it only for something worth more.",
        "{@b Lulu.} The only living witness to who she was before the fall."
      ] },
      { t: "h", text: "What She Never Does" },
      { t: "list", items: [
        "She never begs, apologises or explains herself twice.",
        "She never breaks a sworn bargain. She finds the edge of its wording instead.",
        "She never lets anyone see her hesitate. The one exception is Lulu.",
        "She never kills in anger. She does it as a decision, and she looks at the person while she does."
      ] },
      { t: "h", text: "How She Sees the Rest" },
      { t: "list", items: [
        "{@b Lulu:} the one thing in Hell she cannot weigh. She wants her safe and in the room, and she cannot say why. Play it as the only soft spot.",
        "{@b The Sword:} a reminder of what she was, and the only way out she has not tried. She treats it like a held breath.",
        "{@b The Hellriders:} her first army and her first betrayal. She remembers every name at the Wall, and she remembers who left. {@b Olanthius} and {@b Yael} are her unfinished business.",
        "{@b Elturel:} an asset, a mistake and an open wound. She would trade it, but never lightly, because the people in it are her own."
      ] },
      { t: "more", title: "Where this characterisation comes from", src: ["Homebrew"], blocks: [
        { t: "p", text: "The voice and the soft spot for Lulu are table inventions. Nothing in the printed adventure or in the community posts we gathered gives Zariel's actual dialogue (one blog says outright that the source has none), so the voice is the DM's. Keep it consistent: calm, formal, and sorry in a way she will never say." }
      ] },
      { t: "more", title: "What the printed adventure tells you", src: ["Book"], blocks: [
        { t: "p", text: "In Chapter 5 the party can redeem, bargain with, or fight Zariel. The adventure sets a single check for redemption, and lowers the difficulty if Lulu or Olanthius is present. Other DMs found one roll anticlimactic and replaced it with a scene. See {@side running-the-endgame|Running the Endgame} for the group-check ladder." }
      ] },

      { t: "h", text: "When She Appears" },
      { t: "p", text: "Zariel should be felt before she is seen. Three beats, in order." },
      { t: "h", text: "Session 12: signs" },
      { t: "list", items: [
        "A banner on the horizon that has no army under it. A sun with the sword torn out.",
        "A herald (a {@c narzugon|narzugon}) rides up to the Crypt hill and asks, politely, for the shard and for Lulu by name. It does not threaten. It leaves a writ.",
        "Kreeg, Bel, Rigorath or the Emporium all react to her: the voice drops, the room goes quiet.",
        "The shard hums when the party looks toward the Scab, and the hum has a rhythm like a marching step.",
        "Or'Henn's Tiamat visions give a glimpse of a figure standing over a field of fire, back to him. Tiamat knows her."
      ] },
      { t: "h", text: "Session 13: a presence" },
      { t: "list", items: [
        "She speaks through a messenger, a mirror, or a dream. She does not enter the scene.",
        "She asks for a parley, not a surrender. The terms are plain: bring me what is mine, and I will tell you the cost of keeping what is yours.",
        "If Lulu is hers by now, Lulu says one line in her own voice. It is the first sign she is not a prisoner in the usual sense."
      ] },
      { t: "h", text: "Chapter 5: the full meeting" },
      { t: "p", text: "She arrives in person, in her quarters or on the field. She has already decided how she will lose, if she is going to. Run it as a scene with three tasks the party can do in any order (see {@side running-the-endgame|Running the Endgame}). Never one roll." },

      { t: "h", text: "The Recommended Default: Lulu" },
      { t: "p", text: "This is a recommendation. The DM can take any piece or drop it. Each part has an alternative." },
      { t: "steps", items: [
        "{@b End of Session 12:} her riders take Lulu from the hidden Lady Vengeance. Nobody is killed; the ship's wards fail for a moment and she is gone.",
        "{@b Session 13:} the shard takes over Lulu's role in the Citadel as Eventyr's \"Replacing Lulu\" option describes. The party does not need her memories to find the road; the shard is the conduit.",
        "{@b Chapter 5:} Lulu is Zariel's leverage. She is the price, the proof and the choice, never just a prop."
      ] },
      { t: "more", title: "If you don't want it: Lulu's capture", src: ["Homebrew"], blocks: [
        { t: "list", items: [
          "{@b Keep Lulu safe.} The riders arrive and the ship's wards hold. The herald leaves a writ and a promise to return. Lulu goes with the party and Zariel sends a second wave in Session 13.",
          "{@b Let her go willingly.} Lulu decides to go, because she has understood something the party hasn't. This makes the loss a choice, not a theft.",
          "{@b Delay it.} Take Lulu in Session 13 instead, so the party carries her memory further down the road."
        ] }
      ] },
      { t: "more", title: "If you don't want it: the shard replacing Lulu", src: ["Eventyr", "Homebrew"], blocks: [
        { t: "p", text: "Eventyr's option is that the shard is the conduit for the spirit journey into Idyllglen, and that it floats back to the Sword after Idyllglen. We use that. The alternative is that Lulu's memories are needed after all: the party has to go and get her before the Citadel will open, which turns Session 13 into a rescue." }
      ] },
      { t: "more", title: "If you don't want it: Lulu as leverage", src: ["Homebrew"], blocks: [
        { t: "list", items: [
          "{@b Lulu is a hostage:} Zariel offers her back for the Sword. Classic, clear, harsh.",
          "{@b Lulu is a guest:} Zariel never held her at all. She only asked Lulu to come. Lulu is the proof that Zariel can still be reached.",
          "{@b Lulu is the sacrifice:} the finale's emotional turn is Lulu stepping between Zariel and the last party member, as another DM reported at a table. Use it only if your table likes that kind of turn."
        ] }
      ] },
      { t: "more", title: "Other tables' versions of Lulu and Zariel", src: ["Forum"], blocks: [
        { t: "p", text: "One DM on the D&D Beyond forums disliked the single-check ending. In their game Zariel refused, a ghostly army led by Yael appeared, and Lulu took the blow meant for the last PC. That loss broke Zariel's hatred and she was redeemed. A reply warns that an \"it was all a dream\" reveal frustrates some tables. Another community writeup asks whether Lulu goes with Zariel or stays, and suggests Zariel joining the party as an NPC, or entering the Companion with Lulu." }
      ] },
      { t: "more", title: "Zariel's fates after the finale", src: ["Blog"], blocks: [
        { t: "p", text: "The Alexandrian lists three: dead, alive and unredeemed, or redeemed (judged most likely). Redeemed aftermath ideas include a farewell scene before she leaves for Mount Celestia, or her staying to reach out to her cultists. Killing her voids her contracts, which matters for Elturel. Decide which is plan A before the siege ends." }
      ] },
      { t: "more", title: "Her quarters, if the party ever sees them", src: ["Blog"], blocks: [
        { t: "p", text: "The Alexandrian's flying-fortress notes put her on the command deck most of the time, sometimes in quarters that are opulent and unsettling, with two empty sword brackets under a demon skull. Her half of the pact sits in a vault only she can open. Take the brackets: they say everything about her." }
      ] }
    ]
  },

  // ---------------------------------------------------------------------------
  "running-the-endgame": {
    title: "Running the Endgame",
    blocks: [
      { t: "note", title: "Top line", text: "Decide the ending first. Frame the finale as three tasks in any order (deal with Zariel, break the chains, return Elturel). Never let one roll decide Zariel. Bring back old threads from all three acts. Close with a time jump." },

      { t: "h", text: "1. Decide the Ending First" },
      { t: "list", items: [
        "Pick plan A before the Arkhan siege ends: redeem, bargain or fight. The information you hand the party steers the rest (Lulu pushes redemption, Gargauth pushes allies who might free him).",
        "Treat the Sword's wielder as a player choice. The wielder's alignment shift shapes the endgame.",
        "Echo all three acts: Kreeg, Gargauth, Yael, Olanthius and the Hellrider generals give the finale callbacks.",
        "Build a final test on the campaign's theme. For this table that is the Tiamat bargain and Law versus mercy, with a late betrayal on the table."
      ] },
      { t: "more", title: "Sources for this section", src: ["Blog", "Eventyr"], blocks: [
        { t: "list", items: [
          "{@url https://www.goodreads.com/author_blog_posts/20913417-running-descent-into-avernus-chapter-4-and-5|Goodreads author blog repost, \"Running Descent into Avernus Chapter 4 and 5\"}",
          "{@url https://thealexandrian.net/wordpress/47025/roleplaying-games/remixing-avernus-part-8-the-end|The Alexandrian, \"Remixing Avernus Part 8: The End\"}",
          "Eventyr Chapter 5 guide, \"DM's Resources for Chapter 5: Escape from Avernus\" (local library, search \"Zariel\" and \"Lulu\").",
          "Eventyr Chapter 5 guide, deals and opening (local library, search \"Zariel\" and \"Idyllglen\")."
        ] }
      ] },

      { t: "h", text: "2. The Scab" },
      { t: "list", items: [
        "The Scab is dense and linear. Eventyr treats it as about one adventuring day with a magical long rest in the middle; remind the players this is their last fight before the Citadel restores them.",
        "Add gnolls outside, run the Citadel as a plain crawl, and decide how gory it gets. Widen the crowded gnoll corridor.",
        "Draw the Scab in three layers. Low ceilings, pools of blood. Let the traitor Trantolox pause the last fight to bargain."
      ] },
      { t: "more", title: "Sources for this section", src: ["Blog", "Eventyr"], blocks: [
        { t: "list", items: [
          "{@url https://www.goodreads.com/author_blog_posts/20913417-running-descent-into-avernus-chapter-4-and-5|Goodreads blog repost (as above)}",
          "{@url http://thecampaign20xx.blogspot.com/2019/09/dungeons-dragons-guide-to-baldurs-gate.html|The Campaign 20XX guide to the book}",
          "Eventyr Chapter 4 guide, \"DM's Resources for Chapter 4: Sword of Zariel\" (local library, search \"Scab\" and \"Bleeding Citadel\")."
        ] }
      ] },

      { t: "h", text: "3. The Bleeding Citadel and Yael" },
      { t: "list", items: [
        "The Citadel door needs Lulu in the printed adventure. At this table the shard stands in (see {@side zariel|Playing Zariel}).",
        "Let Yael's ghost give a quiet tour first, with a stained glass window showing Zariel's fall. That way the vision does not depend on Lulu being present or alive.",
        "Levels from the book: 12 at the Citadel, 13 for the finale. The party is already 13, so scale the Citadel up, not down."
      ] },
      { t: "more", title: "Sources for this section", src: ["Blog", "Eventyr"], blocks: [
        { t: "list", items: [
          "{@url http://thecampaign20xx.blogspot.com/2019/09/dungeons-dragons-guide-to-baldurs-gate.html|The Campaign 20XX guide}",
          "Eventyr Chapter 4 guide, Idyllglen and Lulu (local library, search \"Idyllglen\", \"Lulu\" and \"Zariel\")."
        ] }
      ] },

      { t: "h", text: "4. Idyllglen" },
      { t: "list", items: [
        "Seven events; run only the ones that earn their time (three is plenty). Deaths inside are real.",
        "Eventyr lists a one-hour calm in the middle. For the Yeenoghu fight, make the Zariel statue something the party defends, so the fight matters even though Zariel arrives to end it. She can be delayed to about five rounds for a strong party.",
        "When the party succeeds the shard floats up and rejoins the blade. Play it as the moment hope arrives."
      ] },
      { t: "more", title: "Sources for this section", src: ["Blog", "Eventyr"], blocks: [
        { t: "list", items: [
          "{@url https://www.goodreads.com/author_blog_posts/20913417-running-descent-into-avernus-chapter-4-and-5|Goodreads blog repost}",
          "{@url http://thecampaign20xx.blogspot.com/2019/09/dungeons-dragons-guide-to-baldurs-gate.html|The Campaign 20XX guide}",
          "Eventyr Chapter 4 guide (local library, search \"Idyllglen\")."
        ] }
      ] },

      { t: "h", text: "5. The Finale" },
      { t: "p", text: "Three tasks in any order: deal with Zariel, break the chains, return Elturel. Redeem, bargain or fight are the three paths with Zariel. Bargains she may offer: killing a demon lord, handing over the Shield, an ultimate sacrifice, or serving her. She can offer one herself to save face." },
      { t: "p", text: "Do not use one Persuasion roll. Make it a group check where each PC argues, and let bad rolls cost something instead of ending the story. A fight in Elturel beforehand also helps." },
      { t: "checks", items: [
        { skill: "Persuasion", dc: 15, who: "each PC who argues", text: "Say the true thing in front of her. Each success lowers her guard by one step." },
        { skill: "Insight", dc: 17, who: "anyone", text: "Notice where she hesitates (Lulu, the Sword, Olanthius). That is the lever." },
        { skill: "History or Religion", dc: 18, who: "Drenwal or Aurora", text: "Recall what the Wall cost her. A correct name from the Charge gives advantage on the next argument." },
        { skill: "Persuasion", dc: 20, who: "Drenwal", text: "Use the Generals' Memories. One honest sentence from the Hellriders she once led." }
      ] },
      { t: "p", text: "Bring Kreeg back before Zariel. For this table, the Tiamat bargain and Zariel's Law are the same question seen from two sides: what do you owe the people you save. A late betrayal (Bel, Gargauth, or Mephistopheles) keeps the finale honest." },
      { t: "more", title: "Zariel's fates and the aftermath", src: ["Blog"], blocks: [
        { t: "p", text: "Dead, alive and unredeemed, or redeemed (judged most likely). Redeemed ideas: a farewell before Mount Celestia, or staying to reach her cultists. Ask who replaces her as Archduchess and how the Blood War shifts. Ask whether Lulu goes with Zariel or stays." }
      ] },
      { t: "more", title: "Sources for this section", src: ["Blog", "Forum", "Eventyr"], blocks: [
        { t: "list", items: [
          "{@url https://thealexandrian.net/wordpress/47025/roleplaying-games/remixing-avernus-part-8-the-end|The Alexandrian, \"Remixing Avernus Part 8\"}",
          "{@url https://thealexandrian.net/wordpress/47036/roleplaying-games/remixing-avernus-epilogue-part-2-elturels-return|The Alexandrian, \"Remixing Avernus Epilogue Part 2: Elturel's Return\"}",
          "{@url https://thealexandrian.net/wordpress/47005/roleplaying-games/remixing-avernus-part-7d-c-fortress-locations|The Alexandrian, flying fortress locations}",
          "{@url https://thealexandrian.net/wordpress/tag/descent-into-avernus/page/2|The Alexandrian, tag page for the remix series}",
          "{@url https://www.dndbeyond.com/forums/dungeons-dragons-discussion/story-lore/190012-descent-into-avernus-alt-ending|D&D Beyond forum, \"Descent into Avernus alt ending\"}",
          "{@url https://halflinghobbies.com/baldurs-gate-descent-into-avernus-10-things-you-need-to-know-before-you-run-it/|Halfling Hobbies, \"10 things you need to know before you run it\"}",
          "{@url https://www.dndcampaignresources.com/baldurs-gate-descent-into-avernus-resources|DM campaign resources roundup}",
          "Eventyr Chapter 5 guide (local library, search \"Zariel\" and \"Lulu\")."
        ] }
      ] },

      { t: "h", text: "6. Returning After Breaks" },
      { t: "list", items: [
        "Have the players recap first so you learn what they remember, then fill gaps briefly.",
        "Open with action after a few minutes of recap. A small time jump is fine if the ending allows.",
        "Hand out a one-page reference sheet with an NPC glossary. Track small details after each session.",
        "Give each player a short spotlight early, and bring back consequences of earlier choices.",
        "Fix the cause of the pause first. Cut threads nobody cared about. If you do skip time, let the players decide what their characters did."
      ] },
      { t: "more", title: "Sources for this section", src: ["Forum", "Blog"], blocks: [
        { t: "list", items: [
          "{@url https://www.enworld.org/threads/when-you-continue-playing-after-a-multi-month-break-tips-needed.682305/|EN World thread, \"When you continue playing after a multi-month break\"}",
          "{@url https://www.rjd20.com/2022/08/how-to-return-to-your-dnd-game.html|RJD20, \"How to return to your D&D game\"}",
          "{@url https://www.thegamer.com/dungeons-dragons-dnd-restart-campaign-hiatus-long-break/|The Gamer, restarting a campaign after a hiatus}",
          "{@url https://slyflourish.com/easy_tricks.html|Sly Flourish, easy tricks list}"
        ] }
      ] },

      { t: "h", text: "7. Pacing for Three Level-13 PCs" },
      { t: "list", items: [
        "Plan two or three encounters per day, not four to six. Three PCs burn resources fast.",
        "Use fewer, stronger enemies. Avoid fielding more foes than PCs; trim enemy numbers or HP by roughly a fifth to a quarter.",
        "Build exits: fleeing, surrender, environment, and a non-combat way out of the Arkhan siege.",
        "Allies (Moonkite, Veska, Ser Lucan) are run by the players in combat, weaker than the PCs, with no plot armor.",
        "Offer extra healing, clear recovery options and more consumables. Give every PC an NPC thread.",
        "Use group initiative (the house rule in the tracker) and call rolls only when failure matters.",
        "Close the campaign with a time jump: ask each player what their character does a year later."
      ] },
      { t: "more", title: "Sources for this section", src: ["Blog", "Forum"], blocks: [
        { t: "list", items: [
          "{@url https://anvilnink.com/dd-for-3-players/|Anvil & Ink, \"D&D for 3 players\"}",
          "{@url https://thedmlair.com/blogs/news/how-to-run-d-d-for-small-groups|The DM Lair, \"How to run D&D for small groups\"}",
          "{@url https://slyflourish.com/easy_tricks.html|Sly Flourish, easy tricks list}",
          "{@url https://www.goodreads.com/author_blog_posts/20913417-running-descent-into-avernus-chapter-4-and-5|Goodreads blog repost (the one-year time jump)}"
        ] }
      ] },
      { t: "note", title: "Not done", text: "Griffon's Saddlebag items are not listed here. The source files were not available when this page was written, and no items were invented. Add them when the DM supplies the text." }
    ]
  }

});
