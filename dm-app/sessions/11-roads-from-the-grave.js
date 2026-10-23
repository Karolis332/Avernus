// Session 11: the roads out of Uldrak's Grave. Three full branches (the Crypt of the Hellriders,
// the Scabrous Menagerie, the Stygian Dock) plus hook cards for the far sites.
// Uldrak comes from sessions/campaign-tower.js; this file overrides only his tactics.
window.SESSION = {
  id: "11-roads-from-the-grave",
  title: "Roads from the Grave",
  subtitle: "Session 11 · Descent into Avernus",
  summary: "After the dragons, three roads run out from Uldrak's Grave, and each ends at someone who owes the party an answer. Olanthius kneels in the Crypt of the Hellriders over the first shard of the Sword. Lady Urexiel keeps Or'Henn's staff, Kreeg's box and the ledger of the raid in the Scabrous Menagerie. Thavius Kreeg, the man who sold Elturel, runs the Stygian Dock as an amnizu. The players pick the road. Each branch runs on its own.",

  party: [
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 13. Sigil of the Binding drawn (Tier II). Carries the Shield of the Hidden Lord." },
    { id: "aurora", name: "Aurora", note: "Archfey Warlock 13 (Mystic Arcanum 7th). Rides the celestial Moonkite." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 13. Tiamat's curse: count his gold scales. Carries the Soul Capacitor." }
  ],

  allies: [
    { id: "veska", name: "Veska", note: "Hellrider of Elturel. The Dock is personal for her." },
    { id: "ser-lucan", name: "Ser Lucan the Reforged", note: "ally" },
    { id: "jeremy", name: "Jeremy", note: "Runs the Planar Core; Colico Jack flies the ship" },
    { id: "lulu", name: "Lulu", note: "Hollyphant. Wanted at the Crypt. In danger at the Dock." },
    { id: "moonkite", name: "Moonkite", note: "Celestial mount, Aurora's companion" },
    { id: "lady-vengeance", name: "Lady Vengeance (Colico Jack)", note: "AC 17 · HP 350 · DT 15" },
    { id: "uldrak", name: "Uldrak", note: "Only if he survived Session 10 and chose to stay." },
    { id: "feonor", name: "Feonor", note: "Geas-bound. Waiting at the Menagerie, or caged in it." }
  ],

  creatures: {

    "uldrak": Object.assign({}, window.CAMPAIGN.creatures.uldrak, {
      tactics: [
        "Session 11. Only if he stayed. He is CR 23: any fight here ends in two rounds if he swings. Use him as a voice, not a sword.",
        "At the Crypt, he stays outside the door, bowed: \"That is a grave for knights. I am too big to be polite in it.\"",
        "At the Menagerie, Urexiel offers everything in her vault for him. He laughs so hard the cages shake.",
        "At the Dock, the devils scatter. Kreeg talks at once, and lies twice as carefully.",
        "At will: {@spell greater restoration}. It gives back a memory the Styx took, but not one Kreeg wrote into his ledger."
      ]
    }),

    "feonor": {
      name: "Feonor",
      kind: "feonor",
      role: "Geas-bound archmage, sent to fetch Or'Henn's staff",
      description: "A tall, thin woman with milky-white eyes and ash in her hair, carrying a parasol of bone and skin that has been badly mended. She looks like she has not slept since the harpoon.",
      roleplay: [
        "Appearance: willowy human archmage in scorched necromancer's robes. Her mended parasol is her pride.",
        "Voice: whispers in short sentences, broken by long sighs.",
        "Wants: out of the geas, and out of Avernus without crawling back to Mahadi.",
        "Knows: the Pens, the handlers' rounds, the vault door, and Urexiel's price. She has drawn a map.",
        "Sample line: \"Your staff is behind three hundred cages and one very polite monster. You're welcome.\"",
        "The gap she has found: the geas says bring the staff. It says nothing about the box."
      ],
      source: { page: "bestiary", name: "Feonor", src: "BGDIA" },
      npc: true,
      tactics: [
        "Does what the geas says and not one inch more. She will not fight Urexiel for them.",
        "If no one has offered her anything, she pockets Kreeg's box in the vault and sells it to Mahadi later.",
        "If someone offers her passage home on the Lady Vengeance, she means it when she says yes."
      ]
    },

    "lulu": {
      name: "Lulu",
      kind: "lulu",
      role: "Hollyphant ally. Her memory is the road to the Citadel",
      description: "A small golden flying elephant with feathered wings, about the size of a big dog. Her glow is dim in Avernus, and brighter in the cold of the Crypt.",
      roleplay: [
        "Appearance: golden fur, soft wings, dark gentle eyes. Curls her trunk tight when she is scared.",
        "Voice: high, sweet, sincere. When an old memory surfaces, her voice goes low and old.",
        "Wants: to remember. She knows there was a sword, a paladin named Yael, and a flight from Hell.",
        "Knows: more than she can say. She was at the Crypt's gate once.",
        "Sample line: \"I know this door. I don't know how. Please don't make me go first.\""
      ],
      source: { page: "bestiary", name: "Lulu", src: "BGDIA" },
      npc: true,
      tactics: [
        "Does not fight. Hides behind whoever she trusts most.",
        "Her memory is a campaign prerequisite. If Kreeg's Forgetfulness hits her, see his Ledger of Forgetting trait."
      ]
    },

    "olanthius": {
      name: "Olanthius",
      kind: "olanthius",
      role: "Death knight, guilty witness, keeper of the first shard",
      source: { page: "bestiary", name: "Olanthius", src: "BGDIA" },
      homebrew: "Monster Manual death knight numbers. He fights at half heart: he pulls killing blows, uses Hellfire Orb only as a warning shot, and never strikes a downed character.",
      npc: true,
      sizeType: "Medium undead, lawful neutral",
      ac: 20, acNote: "plate, shield",
      hp: 180, hpFormula: "19d8 + 95",
      speed: "30 ft.",
      abilities: { str: 20, dex: 11, con: 20, int: 12, wis: 16, cha: 18 },
      saves: "Dex +6, Wis +9, Cha +10", skills: "",
      vulnerable: "", resist: "", immune: "necrotic, poison", condImmune: "exhaustion, frightened, poisoned",
      senses: "darkvision 120 ft., passive Perception 13",
      languages: "Celestial, Common, Infernal",
      cr: "17", xp: 18000, pb: 6,
      traits: [
        { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
        { name: "Marshal Undead", text: "Unless he is incapacitated, he and undead of his choice within 60 ft. have advantage on saving throws against features that turn undead." },
        { name: "Spellcasting", text: "19th-level paladin. Spell save DC 18, +10 to hit. 1st (4 slots): command, compelled duel, searing smite. 2nd (3): hold person, magic weapon. 3rd (3): dispel magic, elemental weapon. 4th (3): banishment, staggering smite. 5th (2): destructive wave." },
        { name: "Oathbreaker", text: "His spells that deal radiant damage deal necrotic damage instead." }
      ],
      actions: [
        { name: "Multiattack", text: "Three longsword attacks." },
        { name: "Longsword", text: "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 9 (1d8 + 5) slashing plus 18 (4d8) necrotic." },
        { name: "Hellfire Orb (1/Day)", text: "A ball of fire bursts at a point he can see within 120 ft. Each creature in a 20-ft. radius makes a DC 18 Dexterity saving throw: 35 (10d6) fire plus 35 (10d6) necrotic on a failure, half on a success. It spreads around corners." }
      ],
      bonus: [],
      reactions: [
        { name: "Parry", text: "Adds 6 to his AC against one melee attack that would hit him. He must see the attacker and hold a melee weapon." }
      ],
      tactics: [
        "This is a test, not a murder. He fights to see whether they fight with honour.",
        "If they accept a yield, do not gang up on a downed foe, and sheathe when he sheathes, he ends the duel himself and talks.",
        "If they play it as a murder, he fights to the end, and everything he knows dies with him.",
        "Compelled duel on whoever struck first. Hold person on anyone who attacks a kneeling or downed enemy."
      ],
      description: "A knight kneels at an open stone coffin. His armour is Hellrider steel gone black, and cold green fire burns behind his visor. He does not get up when you come in. He has been kneeling there for a hundred years.",
      roleplay: [
        "Appearance: blackened Hellrider plate, a rising sun ground off the breastplate. Green fire in the helm.",
        "Voice: slow and cold, like something pulled up a deep well. He never shouts.",
        "Wants: to stop remembering. He cannot. So he guards.",
        "Knows: the road to the Bleeding Citadel. Why the Sword was hidden. Where its hilt is. That a small star fell, and Zariel hated it.",
        "Sample line: \"If you've come to be forgiven for something, you're in the wrong crypt.\""
      ]
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
      role: "Amnizu dockmaster. The man who sold Elturel",
      source: { page: "bestiary", name: "Amnizu", src: "MTF" },
      homebrew: "Amnizu chassis from Mordenkainen's Tome of Foes; check the numbers against your book. Campaign addition: Ledger of Forgetting. Killed in the Nine Hells, he is destroyed for good.",
      npc: true,
      sizeType: "Medium fiend (devil), lawful evil",
      ac: 21, acNote: "natural armor",
      hp: 202, hpFormula: "27d8 + 81",
      speed: "30 ft., fly 40 ft.",
      abilities: { str: 11, dex: 13, con: 16, int: 20, wis: 12, cha: 18 },
      saves: "Dex +7, Con +9, Wis +7, Cha +10", skills: "Deception +10, Insight +7, Perception +7",
      vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered", immune: "fire, poison", condImmune: "poisoned",
      senses: "darkvision 120 ft., passive Perception 17",
      languages: "Common, Infernal, telepathy 1,000 ft.",
      cr: "18", xp: 20000, pb: 6,
      traits: [
        { name: "Devil's Sight", text: "Magical darkness doesn't impede his darkvision." },
        { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
        { name: "Innate Spellcasting", text: "Intelligence (spell save DC 19, +11 to hit). At will: {@spell charm person}, {@spell command}. 3/day: {@spell dominate monster}. 1/day: {@spell feeblemind}." },
        { name: "Ledger of Forgetting", text: "When a creature stunned by his Forgetfulness stays stunned for the full minute, Kreeg can take one memory of his choice instead of the last 5 hours, however old it is. He writes it in his ledger as a single line. Reading that line aloud to the creature gives the memory back. {@spell Greater restoration} does not. Burning the page loses it forever." }
      ],
      actions: [
        { name: "Multiattack", text: "Two Taint attacks, or Poison Mind and one Taint attack." },
        { name: "Taint", text: "Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 27 (5d10) necrotic." },
        { name: "Poison Mind", text: "One or two creatures he can see within 60 ft. make a DC 19 Wisdom saving throw. On a failure, each takes 26 (4d12) necrotic and is blinded until the start of his next turn." },
        { name: "Forgetfulness (Recharge 6)", text: "One creature he can see within 60 ft. makes a DC 18 Intelligence saving throw or is stunned for 1 minute. It repeats the save at the end of each of its turns, ending the effect on a success. If it stays stunned for the full minute, it forgets everything from the last 5 hours." }
      ],
      bonus: [],
      reactions: [
        { name: "Instinctive Attraction", text: "When a creature he can see targets him with a spell, the caster makes a DC 19 Wisdom saving throw. On a failure, the spell targets the creature closest to the caster instead, other than Kreeg or the caster. It fails against a caster who can't be charmed." }
      ],
      tactics: [
        "He would rather talk, and he would rather you forgot. Charm person and command before anything that hurts.",
        "Forgetfulness on whoever is carrying Lulu, or on Lulu herself if he has guessed who she is.",
        "Dominate monster on Uldrak or the strongest fighter, and turn them on their friends.",
        "Below 100 hit points he offers terms: his signature, for his life. He means it, this once.",
        "He never fights near the water's edge. He knows what the Styx does better than anyone."
      ],
      description: "A gaunt grey devil in a clerk's black robe, with a long bald skull, small dark wings folded like a coat, and fingers stained black with ink. On one finger, much too small for it now, is a High Overseer's ring with a cracked sun on it.",
      roleplay: [
        "Appearance: an amnizu. Inky fingers. The old ring. He keeps his face turned a little away, the way he did at the Ashen Garden.",
        "Voice: dry, precise, reasonable. He talks like a man explaining a fair price.",
        "Wants: out from under Zariel before Elturel touches the Styx and she collects him. His box back. His gardener back.",
        "Knows: everything about the contract. The Companion is a planetar in chains. The Creed Resolute. A living signatory can sign it away.",
        "Sample line: \"Gardener. You're late. The roses will be dead.\""
      ]
    },

    "barbed-devil": {
      name: "Barbed Devil (Dock Guard)",
      kind: "barbed-devil",
      role: "Wharf guard at the Stygian Dock",
      source: { page: "bestiary", name: "Barbed Devil", src: "MM" },
      npc: false,
      sizeType: "Medium fiend (devil), lawful evil",
      ac: 15, acNote: "natural armor",
      hp: 110, hpFormula: "13d8 + 52",
      speed: "30 ft.",
      abilities: { str: 16, dex: 17, con: 18, int: 12, wis: 14, cha: 14 },
      saves: "Str +6, Con +7, Wis +5, Cha +5", skills: "Deception +5, Insight +5, Perception +8",
      vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered", immune: "fire, poison", condImmune: "poisoned",
      senses: "darkvision 120 ft., passive Perception 18",
      languages: "Infernal, telepathy 120 ft.",
      cr: "5", xp: 1800, pb: 3,
      traits: [
        { name: "Barbed Hide", text: "At the start of each of its turns, it deals 5 (1d10) piercing to any creature grappling it." },
        { name: "Devil's Sight", text: "Magical darkness doesn't impede its darkvision." },
        { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." }
      ],
      actions: [
        { name: "Multiattack", text: "Three melee attacks (one Tail, two Claw), or two Hurl Flame." },
        { name: "Claw", text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing." },
        { name: "Tail", text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing." },
        { name: "Hurl Flame", text: "Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire. Flammable objects not worn or carried catch fire." }
      ],
      bonus: [], reactions: [],
      tactics: [
        "Shove intruders toward the edge of the wharf. One step more and it is the Styx.",
        "If Kreeg falls below half, they stop fighting and wait to see who their new master is."
      ],
      description: "A tall red devil covered in thorns, standing very still on the wharf with its arms folded.",
      roleplay: ["Bored. Counts barges. Speaks only to say a number."]
    }
  },

  scenes: [

    {
      id: "adventure-primer",
      title: "Adventure Primer",
      when: "",
      duration: "5 minutes (read before play)",
      banner: "art/official/lulu.webp",
      blocks: [
        { t: "p", text: "This session is designed for the three 13th-level characters of this campaign: Drenwal, Aurora and Or'Henn, with Veska, Ser Lucan, Jeremy, Lulu and Moonkite, and Colico Jack at the helm of the Lady Vengeance. It runs about four to five hours. It is a choice of roads. Three places lie within a few days of Uldrak's Grave, and each one holds someone who knows something the party needs. Expect them to finish one road tonight, maybe two." },
        { t: "note", title: "Check Session 10 Before You Start", text: "Write these down before play. Several scenes change because of them.\n\n{@b Is Uldrak alive, and does he stay?}\n{@b Did they catch a dragon alive,} or bring a carcass?\n{@b Who holds the orb of dragonkind:} the party, or Krull?\n{@b Did the curse jump?} If it did, use your own notes from last session's ending first.\n{@b How many gold scales} does Or'Henn have?\n{@b Did anyone touch the Styx,} and what did they forget?\n{@b What day of Feonor's geas is it?} The crow came on day 4." },

        { t: "h", text: "Background" },
        { t: "p", text: "The party has freed Uldrak and met Arkhan's dragons at his Grave. Now the map opens. Three people are close, and each one is a door." },
        { t: "p", text: "{@c olanthius|Olanthius} is a death knight who kneels in the Crypt of the Hellriders. A hundred years ago he watched the paladin Yael and the hollyphant Lulu carry the Sword of Zariel out of Hell, and he did nothing. He knows the road to the Bleeding Citadel. And under his empty coffin lies the first shard of the Sword: the hilt and crossguard." },
        { t: "p", text: "{@c urexiel|Lady Urexiel} is a yugoloth broker who keeps the Scabrous Menagerie. She paid for the raid that burned the Ashen Garden and killed Or'Henn's household. Her vault holds Cinderbloom, a Green Remnant, her ledger of the raid, and a puzzle box she thinks is a pretty toy. The box is Kreeg's copy of the contract that damned Elturel." },
        { t: "p", text: "{@c kreeg|Thavius Kreeg} sold Elturel to Zariel. Zariel remade him as an amnizu and set him to count souls at the Stygian Dock. He owned the Ashen Garden. Or'Henn served him for sixty years and never saw his face up close. The party worked out who he is in Session 8." },

        { t: "h", text: "Overview" },
        { t: "p", text: "This session has a shared opening, three branches and a shared ending. Run only the branch the players choose. If they finish one early, go back to Where We Left Off and let them pick again." },
        { t: "list", items: [
          "{@b Where We Left Off} (15 minutes). The morning after the dragons. Three roads, and the people who point down them.",
          "{@b The Crypt of the Hellriders} (about 2 hours). The Door, the Nave of Names, and the Kneeling Knight.",
          "{@b The Scabrous Menagerie} (about 2 to 3 hours). The Singing Aisle, the Pens, and the Trophy Vault.",
          "{@b The Stygian Dock} (about 1 to 2 hours). The Dock, and the Man Who Sold a City.",
          "{@b Ending the Session} (10 minutes). What they carried away, and what it cost."
        ] },

        { t: "h", text: "Adventure Hooks" },
        { t: "p", text: "{@b The Sword.} The Sword of Zariel is in three shards. The first is in the Crypt. Lulu dreams of a cold place and a man at a gate." },
        { t: "p", text: "{@b The staff.} Feonor's crow named the Menagerie. Urexiel will not sell Cinderbloom to her. Or'Henn has to go himself." },
        { t: "p", text: "{@b The traitor.} Veska has known since Session 8 that the man who sold her city is alive, two days up the Styx. She has not stopped thinking about it." },

        { t: "h", text: "Where things stand" },
        { t: "list", items: [
          "The party is 13th level.",
          "Sword shards held: none. The Fallen Three road: Haruman's piece only.",
          "Green Remnants: none of the three.",
          "Or'Henn is still under Tiamat's curse. Her visions come in his sleep.",
          "Feonor is geas-bound to fetch the staff. The geas lapses on day 30.",
          "Elturel still hangs on its chains, sinking toward the Styx.",
          "Lulu's memory is needed to free the Caged Star, which is where Drenwal's rebirth happens. The party does not know that."
        ] },
        { t: "note", title: "Running This Session", text: "Read the brown boxes in order and you can run each branch from them. Side paths hold the extra detail: {@side kreegs-bargains|Kreeg's Bargains} and {@side far-roads|The Far Roads}. Or'Henn's staff hunt is in {@side arc-orhenn|Arc: Or'Henn and Cinderbloom}, and Tiamat is in {@side arc-tiamat|Arc: Or'Henn and Tiamat}." }
      ]
    },

    {
      id: "where-we-left-off",
      title: "Where We Left Off",
      when: "",
      duration: "15 minutes",
      blocks: [
        { t: "p", text: "The session opens at Uldrak's Grave, the morning after the dragons. Change the read-aloud box to fit how the fight ended." },
        { t: "read", text: "The smoke is still going up from the Grave when the red sky turns to morning. The ash is black and glassy where the dragon fire hit it, and it cracks under your boots like thin ice.\n\nUldrak sits on the crossguard of his own sword, looking out at the waste with his chin on his fist. He has not stopped smiling since yesterday.\n\nOn the deck of the Lady Vengeance, Colico Jack has the charts out, weighted down with a wrench and a cold cup of something. He taps the map three times.\n\n\"Right,\" he says. \"Where now?\"" },

        { t: "h", text: "Event: Three Roads" },
        { t: "p", text: "Let each road come from someone at the table. Read the three short boxes one after another, then let the players argue." },
        { t: "read", text: "Lulu is sitting very still on the rail. \"There's a cold place,\" she says, quietly. \"West of here, a day, maybe. I dreamed it. There was a man at a gate, and he didn't stop us. I don't know who 'us' is.\"" },
        { t: "read", text: "Or'Henn's pocket is warm where he keeps the ash from Feonor's crow. It has drawn itself into a small arrow, pointing south and east, toward a sound you can almost hear: a long way off, a great many things in cages, all singing." },
        { t: "read", text: "Veska has not looked at the map. She is looking up the Styx, the way you came.\n\n\"He's up there,\" she says. \"Kreeg. Two days. Counting souls on a dock like a clerk.\" She turns her helmet over in her hands. \"I'm not asking. I'm telling you where I'll be looking.\"" },
        { t: "list", items: [
          "{@b The Crypt of the Hellriders.} About a day west. The first shard of the Sword, and the road to the Citadel. Bring Lulu.",
          "{@b The Scabrous Menagerie.} Two to three days south and east. Cinderbloom, Kreeg's box, and the woman who paid for the raid.",
          "{@b The Stygian Dock.} One to two days back up the Styx. Kreeg himself. Do not bring Lulu unprotected."
        ] },
        { t: "note", title: "DM Recommendation: Uldrak Goes Home", text: "Uldrak is CR 23. With him beside them, nothing on these three roads is dangerous. Recommended: after the dragons he leaves for Muspelheim to tell his father what he has done, and promises to come back for the last battle. \"When you go up against her, call me. I will hear.\" If the table begs, he stays for one road. His tactics say what changes at each site." },
        { t: "note", title: "If They Caught a Dragon", text: "A chained dragon in tow makes the Menagerie the obvious road: Urexiel will trade Cinderbloom for it. Every night it is in tow, roll once on the Small Visions table in {@side arc-tiamat|Arc: Or'Henn and Tiamat}. If it is Vermilius, it talks to Or'Henn every night, kindly." },
        { t: "choices", prompt: "Where do they go?", items: [
          { label: "The Crypt of the Hellriders", goto: "the-crypt-door" },
          { label: "The Scabrous Menagerie", goto: "the-singing-aisle" },
          { label: "The Stygian Dock", goto: "the-stygian-dock" },
          { label: "Somewhere further away", side: "far-roads" }
        ] }
      ]
    },

    {
      id: "the-crypt-door",
      title: "The Crypt of the Hellriders",
      when: "Only if they take the Crypt road",
      duration: "20 minutes",
      blocks: [
        { t: "p", text: "The Crypt is about a day's flight west of the Grave. It is a piece of Elturel that fell into Avernus with the city and never rotted. The cold inside is not infernal. It is grief that refuses to burn. Devils will not go in. Neither will Zariel." },
        { t: "note", title: "Running This Branch", text: "This is the quietest place in Avernus, and the saddest. There is only one fight here, and it is optional. Bring Lulu if the players let you: the Crypt is the best thing that can happen to her memory. Read the Nave before the Knight if you can. Drenwal should see his father's order before he hears how it ended." },

        { t: "h", text: "Event: The Cold Line" },
        { t: "read", text: "The heat stops at a line you can see.\n\nOne step back, the ground still bleeds red and the air still tastes of iron smoke. One step forward, and it is cold: a clean, church-stone cold that has nothing to do with Hell.\n\nAhead, a doorway of grey granite stands upright and whole, as if the city tore this one building loose and set it down gently. Above the door, worn but clear: a rider, a lance, and a rising sun. No fire has touched it. Nothing here wants to." },
        { t: "list", items: [
          "{@b Devils cannot cross the line.} Imps that have been following the ship stop at it and hiss.",
          "{@b Asimov goes quiet.} Inside the Soul Capacitor, his voice fades: the soul-traffic of Avernus cannot reach in here.",
          "{@b Tiamat goes quiet too.} For as long as Or'Henn is inside the Crypt, there are no visions. Tell his player. It is the first quiet he has had since the Monument.",
          "{@b Celestials are welcome.} Moonkite's light grows steadier. Lulu's glow brightens for the first time since Avernus."
        ] },

        { t: "h", text: "Event: The Door" },
        { t: "read", text: "The door has no handle and no lock. It is one slab of granite, ten feet high, and carved into it at the height of a rider's eyes are five words:\n\nSAY THE WORD, AND RIDE IN." },
        { t: "p", text: "The book's password comes from the Obelisk, and the party does not have it. Any one of these opens the door." },
        { t: "list", items: [
          "{@b Lulu.} If she is with them, she puts her trunk on the stone and whispers \"please.\" The door opens. It remembers her. She does not know why. This should be the easiest way in.",
          "{@b A name of the dead.} The door opens for anyone who speaks the name of a rider of the First Charge with grief in it. If Or'Henn says \"Eldra\" here for any reason (a prayer, a curse, a memory), it opens, and you have just learned something about his teacher.",
          "{@b The watchword.} The First Charge rode in shouting \"The sun will hold!\" A {@b DC 15 Intelligence (History or Religion)} check remembers it. Drenwal and Veska have advantage.",
          "{@b A bought word.} The merrenoloth ferryman on the Styx sells it for one soul coin. Or Asimov can take it as the payment for a delivered soul-bounty.",
          "{@b Force.} A {@b DC 25 Strength} check, {@spell passwall} or {@spell disintegrate}. {@spell Knock} does nothing: the door is not locked, it is waiting. Breaking in costs them: Olanthius knows. Every social check with him starts at disadvantage until someone apologises and he believes it."
        ] },
        { t: "p", text: "When they are inside, go to {@scene the-nave-of-names|The Nave of Names}." }
      ]
    },

    {
      id: "the-nave-of-names",
      title: "The Nave of Names",
      when: "Only if they enter the Crypt",
      duration: "20 to 30 minutes",
      blocks: [
        { t: "read", text: "A long hall of grey stone, two walls carved from floor to ceiling with names. Thousands of them. The riders of the First Charge, and every Hellrider since who died in Elturel's service.\n\nCold candles stand in rows along the walls. They will not light. The floor is worn smooth in two long grooves, where people knelt.\n\nAt the far end, beyond an arch, something green is glowing." },
        { t: "p", text: "Lulu goes quiet in here. At the end of the hall she turns toward the arch before anyone else does. She knows the way, and does not know how." },

        { t: "h", text: "Event: Eldra Vash" },
        { t: "p", text: "Combing the walls for any one name is a {@b DC 12 Intelligence (Investigation)} check. If Or'Henn is looking for his teacher, he finds her without a roll." },
        { t: "read", text: "Halfway down the older wall, under a hundred years of dust, the carving is deeper and rougher than the rest. Cut fast. Cut grieving.\n\nELDRA VASH.\n\nBeside it, a small badge in the stone: a golden sun, pierced by a sword. And under the name, scratched in by a different, shakier hand, much later:\n\n\"I should have stopped her. O.\"" },
        { t: "p", text: "Or'Henn has seen that badge before. Every day for sixty years, on a ring on Eldra's hand, while she showed him how to keep fire-moss alive in ash. Ask his player what he does." },
        { t: "note", title: "DM Only: Who Eldra Was", text: "Eldra Vash rode in the First Charge. The wall says she died there. She did not. She was taken alive, and her fey blood kept her young. Kreeg bought her for his Hell-side estate and set her to keep his garden. She kept it for a century, and she raised Or'Henn. She died in the raid that Urexiel paid for. Olanthius loved her, and has believed for a hundred years that she died in the Charge. Nobody has told him otherwise." },

        { t: "h", text: "Event: The Crimson Watch" },
        { t: "read", text: "One alcove is set apart from the rest. The stone rider on the tomb inside is unfinished: the sculptor stopped at the shoulders, as if he could not bring himself to carve the face. The red paint on the shield has flaked to the colour of dried blood.\n\nSomeone has left an offering on the plinth: a soldier's ration token, so old it has fused to the stone." },
        { t: "p", text: "This is the Crimson Watch, the order Drenwal's father served. Its honour roll is carved here, and Drenwal finds his father's name on it: HALVARD, FELL AT THE WALL. Veska knows that is a lie. The cult inside the Watch murdered him. Let Drenwal have the moment before Olanthius tells him how the order ended, and give Veska or Ser Lucan a line if they are here." },

        { t: "h", text: "Checks in the Nave" },
        { t: "list", items: [
          "{@b DC 15 Intelligence (Investigation):} among the tombs of the First Charge lie a {@b +1 lance} and a {@b Hellrider's Aegis} (a shield that gives advantage on saving throws against being frightened while in Avernus). Taking either without Olanthius's leave is a grave insult. If they do, he will not give them advantage on anything.",
          "{@b DC 13 Intelligence (Religion):} the cold candles are a vigil. They light only when someone in the Crypt is forgiven.",
          "{@b DC 14 Wisdom (Perception):} the green light beyond the arch does not flicker. Whatever is burning there has been burning a long time."
        ] },
        { t: "p", text: "When they go through the arch, go to {@scene the-kneeling-knight|The Kneeling Knight}." },
        { t: "map", id: "crypt-of-the-hellriders-40x30", note: "The Crypt. The Nave of Names runs down the middle; Olanthius kneels at the far end." }
      ]
    },

    {
      id: "the-kneeling-knight",
      title: "The Kneeling Knight",
      when: "Only if they enter the Crypt",
      duration: "45 to 60 minutes",
      blocks: [
        { t: "read", text: "At the heart of the Crypt, a knight kneels in front of an open stone coffin. There is no name on it. His armour is Hellrider steel gone black, and a cold green fire lives behind his visor.\n\nHe does not turn around.\n\n\"You've come a long way to look at a grave with no one in it,\" he says. His voice comes up out of the green light like something pulled from a deep well. \"That's fitting. I've knelt here a hundred years and found the same.\"\n\nHis gauntlets tighten on the edge of the stone.\n\n\"If you've come to be forgiven for something, you're in the wrong crypt. There's no forgiveness on these walls. Only names. Say your business, or leave me mine.\"" },
        { t: "p", text: "{@c olanthius|Olanthius} is a guilty witness. A hundred years ago he stood at the gate and watched Yael and Lulu carry the Sword out of Hell, and he let them pass. Then he stayed to guard the road they took, and told himself it was duty. The coffin is his own. He carved it and could not lie down in it, so he buried his honour there instead, and the hilt of the Sword with it." },

        { t: "h", text: "How He Opens Up" },
        { t: "list", items: [
          "{@b Eldra's name, from someone who knew her.} This is the master key. Advantage on every social check with him, and he speaks plainly. Run Event: Her Name.",
          "{@b Eldra's name read off the wall,} by strangers: advantage on the first check only.",
          "{@b No key:} one {@b DC 18 Charisma (Persuasion)} check with a real appeal to duty or honour. Grief-baiting fails and hardens him. On a success he gives the road and the reason, coldly.",
          "{@b If they fail, or ask to prove themselves,} he offers a trial: the Vigil or the Half-Heart Duel (below).",
          "{@b If they broke the door,} everything starts at disadvantage until someone apologises and he believes it."
        ] },

        { t: "h", text: "Event: Her Name" },
        { t: "read", text: "At the name, the green fire in the visor gutters. For one moment it is not a death knight's flame at all, but something smaller and older: a man's grief, with a man's face behind it.\n\n\"Where did you hear that name?\"\n\nIt is not a question. It is a wound.\n\n\"She wore the sun and sword into the Charge. I told her the sun would hold. I told her Zariel would hold.\" The great black shape bows until his brow nearly touches the stone. \"I have guarded a road for a hundred years so I would not have to remember the face of the woman who rode it first.\"" },
        { t: "p", text: "Now Or'Henn can tell him the truth: Eldra did not die in the Charge. She lived a hundred years in a garden in Hell, and she taught a red dragonborn boy to make things grow. Let the player say it." },
        { t: "read", text: "He is very still for a long time.\n\n\"She lived,\" he says at last. \"A hundred years. And I knelt here, mourning her, a day's ride away.\"\n\nThe green fire steadies. It is a different colour now, closer to blue.\n\n\"How did she die?\"" },
        { t: "p", text: "If they tell him about the raid, he asks who paid for it. If they know Urexiel's name, he repeats it once, to remember it. If they do not, he says: \"Find out. Then come back and tell me.\" From here on he answers anything, plainly." },

        { t: "h", text: "Event: Lulu Remembers" },
        { t: "p", text: "This fires the first time Olanthius names Yael or the gate while Lulu is present, key or no key. It is the strongest reason to bring her. Do not miss it." },
        { t: "read", text: "The little hollyphant goes very still. Her trunk lowers. And when she speaks, it is not her usual bright voice. It is something old, and cracked open.\n\n\"You. You were at the gate. You stood in the red light and you let us pass. Yael said your name. She said, 'He won't stop us, he hasn't the heart left to stop anything,' and she was crying when she said it.\"\n\nLulu is shaking.\n\n\"I remember the weight of it. The Sword. It was so heavy, and Yael's hands were burning, and I said I'd carry the memory so she wouldn't have to. And I did. I took all of it, and I made myself forget, so no one could ever pull the road out of me.\"" },
        { t: "p", text: "This is Lulu's fourth memory: the flight from Hell, and the raising of the Citadel. From now on she knows the shape of the road to the Bleeding Citadel. Mark it." },

        { t: "h", text: "Event: The Shard" },
        { t: "p", text: "When they ask about the Sword, he stands for the first time in a hundred years, and lifts a folded cloak out of the coffin." },
        { t: "read", text: "Inside the cloak is the hilt of a sword. Gold, gone dark. A crossguard shaped like two spread wings. Where the blade should be there is only a jagged stub, broken off a hand's width from the guard.\n\nIt is still warm.\n\n\"Someone brought it to me in the dark, wrapped in this,\" he says. \"I never saw a face. I have kept it. That is all I have done with my life since: kept it.\"\n\nHe does not hold it out.\n\n\"Yael died to carry that blade out of Hell. You want to carry it back in. Tell me why her death should be wasted.\"" },
        { t: "p", text: "He does not hand it over easily. They have to answer him. Any of these can win it with a {@b DC 15 Charisma (Persuasion)} check, or with no check if they argue it well:" },
        { t: "list", items: [
          "{@b Elturel.} A whole city, sinking. The Sword and the contract together are the only clean way to free it.",
          "{@b An oath.} A Hellrider swears to carry it. Veska can. Drenwal can.",
          "{@b Lulu.} If her memory has fired and she says Yael would want it, he gives it to her with no check at all."
        ] },
        { t: "p", text: "His condition, whatever they say: \"When it is whole, a Hellrider carries it. Not a devil. Not a god. Not a dragon.\" If Or'Henn has any gold scales, Olanthius looks at them and adds: \"Keep that one away from it. Something is looking out of his eye.\"" },
        { t: "note", title: "Who Broke the Sword", text: "Olanthius does not know who broke the Sword. That question is still yours to answer. He only knows the hilt came to him in the dark, in a Hellrider's cloak." },

        { t: "h", text: "Event: The Star That Fell" },
        { t: "p", text: "He gives this freely to a keyed party, or on a {@b DC 16 Wisdom (Insight)} check if he has warmed at all." },
        { t: "read", text: "\"There is one more thing, and I don't have a name for it. Near the end, after Zariel fell, a star came down. Not a devil's fire. A small light, gentle. The kind of thing that stops to help a dying man it has no reason to help.\n\nZariel hated it. I never saw her hate anything the way she hated that little falling mercy. She bleeds it still. Where her blood falls, they say, the mercy grows back. I don't know what it is. I know she would unmake the world to be rid of it.\"" },
        { t: "p", text: "Moonkite's light flickers, and it turns its head away. It will not say why. This is the party's first hard sign that the Caged Star is real. Do not give it a name yet." },

        { t: "h", text: "Event: How the Watch Ended" },
        { t: "p", text: "If Drenwal asks about the Crimson Watch, Olanthius tells him plainly: after the Charge, the Watch was hollowed out from inside by a cult of Bhaal. Good riders died for an order that was already rotten. He says it as a fact, not an accusation. Drenwal may take it either way." },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...choose the Vigil,} they keep watch at the coffin through one Avernus night (a long rest) without leaving and without drawing steel. At the end, each makes a {@b DC 14 Wisdom saving throw}. If at least two succeed, he trusts them as if they had the key. The cold candles light, one by one." },
        { t: "p", text: "{@b ...choose the Half-Heart Duel,} he rises and fights at half heart, to see whether they fight with honour. Run the encounter below." },
        { t: "p", text: "{@b ...attack him outright,} he fights to the end. If he is destroyed, everything he knows dies with him: the road, the reason, and the star. The hilt still lies in the coffin. His sword is a {@b +2 longsword} that sheds cold blue light." },
        { t: "p", text: "{@b ...just take the hilt,} he does not stop them. He only says, \"Then you are what I was,\" and kneels again. They lose his road and his warmth, and Lulu will not look at them for a day." },
        { t: "encounter", id: "half-heart-duel", title: "The Half-Heart Duel", combatants: [
          { c: "olanthius", n: 1 }
        ], notes: "A test, not a murder. He pulls killing blows and never strikes a downed character. Hellfire Orb only as a warning shot, aimed at empty stone. If they accept a yield and sheathe when he sheathes, he ends it himself and talks as if they had the key." },

        { t: "h", text: "Event: Before They Leave" },
        { t: "p", text: "Whether keyed or won, he can point them at Kostchtchie's Maw, where the second shard is frozen into the anchor-ice: \"You don't befriend the thing in the Maw. You point it.\" If the party is going to the Menagerie next, and he knows what Urexiel did, he asks one thing: \"Bring me her ledger. I want to read the line.\"" },
        { t: "choices", prompt: "When they leave the Crypt:", items: [
          { label: "Take another road", goto: "where-we-left-off" },
          { label: "End the session", goto: "ending" }
        ] }
      ]
    },

    {
      id: "the-singing-aisle",
      title: "The Scabrous Menagerie",
      when: "Only if they take the Menagerie road",
      duration: "20 to 30 minutes",
      banner: "art/official/feonor.webp",
      blocks: [
        { t: "p", text: "The Menagerie is two to three days from the Grave. The omen on the way: a long way off, a great many things in cages, all singing. It is the convergence of the campaign. Cinderbloom, Kreeg's box, a Green Remnant, the ledger of the raid and Or'Henn's three lost beasts are all here, whatever reason brought the party." },
        { t: "note", title: "Count the Days First", text: "Feonor's crow came on day 4, which was day 10 on her own road. So add 6 to every day on her table in {@side arc-orhenn|Arc: Or'Henn and Cinderbloom}.\n\n{@b Before day 14:} she is waiting outside the Menagerie, with a map. Run Event: Feonor at the Edge.\n{@b Day 14 or later:} she tried to steal the staff alone and was caught. She is in a cage in the Pens.\n{@b Day 30:} the geas lapses." },

        { t: "h", text: "Event: Feonor at the Edge" },
        { t: "read", text: "She is sitting on a rock at the top of the last rise, under her parasol, which has been mended with what looks like fishing line and spite. She does not get up.\n\n\"You took your time.\" A sigh. \"Your staff is behind three hundred cages and one very polite monster.\"\n\nShe holds out a folded sheet of skin. On it, in neat brown ink, is a map: aisles, gates, a vault, and a dotted line marked 'handlers, every ten minutes.'\n\n\"You're welcome,\" says Feonor." },
        { t: "p", text: "Her map gives {@b advantage on the first Dexterity (Stealth) check} inside the Pens. She will walk in with them if the geas requires it, and not one step further." },
        { t: "note", title: "Now Is the Time to Make Her an Offer", text: "Feonor wants out of Avernus, without crawling back to Mahadi. If someone offers her passage home on the Lady Vengeance, she says yes, and from then on she is a sour, useful ally who stays after day 30. If no one offers her anything, she has found the gap in the geas: it says bring the staff, and says nothing about the box. In the vault she pockets Kreeg's box and leaves. She sells it to Mahadi later." },

        { t: "h", text: "Event: The Singing Aisle" },
        { t: "read", text: "The road stops being a road and becomes an aisle. Cages line both sides, stacked three high, and the things inside have learned that footsteps mean either meat or a buyer. So they perform.\n\nA six-winged thing sings a lullaby in a dead priest's voice. Something with too many mouths recites the prices of its neighbours. A creature you have no name for pushes a hand through the bars, a clean human hand, and waves, small and polite, like a child at a window.\n\nThe whole avenue sings, and none of it is for you. It is an audition. Every beast here is trying to prove it is worth keeping. At the far end is the Killing Floor, and they can all smell it." },
        { t: "p", text: "Each character makes a {@b DC 14 Wisdom saving throw}. On a failure, they spend a minute staring at one cage they cannot look away from; ask the player what is in it. Or'Henn does not roll. Three voices in the chorus go silent when they see him, then frantic. They know him." },

        { t: "h", text: "Ways to the Vault" },
        { t: "list", items: [
          "{@b Walk in as buyers.} Urexiel deals before she fights. A handler leads them straight to the vault. A live dragon in chains makes her come out to meet them.",
          "{@b The writ} (Contract 5, if sealed). She must hand over Cinderbloom by law. Only the staff.",
          "{@b The ashwood compass} (Contract 3). Burned in the Pens, it pulls them straight to the vault with no wrong turns.",
          "{@b Feonor's map.} Advantage on the first Stealth check.",
          "{@b Her Key.} Tiamat's gift, for one gold scale. Urexiel bows, and hands the staff over. See {@side arc-tiamat|Arc: Or'Henn and Tiamat}.",
          "{@b Sneak in through the Pens.} Three group {@b DC 16 Dexterity (Stealth)} checks. Each failure means a handler patrol finds them."
        ] },
        { t: "choices", prompt: "How do they go in?", items: [
          { label: "As buyers, through the front", goto: "the-trophy-vault" },
          { label: "Through the Pens (a heist, a rescue, or Or'Henn's beasts)", goto: "the-pens" }
        ] }
      ]
    },

    {
      id: "the-pens",
      title: "The Pens",
      when: "Only if they go through the Pens",
      duration: "30 to 45 minutes",
      blocks: [
        { t: "read", text: "Behind the singing aisle, the Menagerie turns into a maze of iron. Narrow walkways run between pens, over pens, under pens. Chains hang everywhere, and some of them move by themselves. The air smells of straw, blood and something sweet that is meant to cover both.\n\nSomewhere ahead, a gate clangs, and you hear the clicking of something with too many legs, walking a slow, regular round." },

        { t: "h", text: "Event: The Estate-Beast Wing" },
        { t: "p", text: "Or'Henn's three lost beasts are here, penned as \"provenance exhibits\" beside a brass plate that reads: Ashen Garden. Acquired with the staff." },
        { t: "read", text: "The three pens go quiet when Or'Henn walks past.\n\nIn the first, an old hell hound with a grey muzzle stands up very slowly, as if it hurts, and puts its nose to the bars.\n\nIn the second, a black horse made of smoke and embers stops pacing.\n\nIn the third, a three-headed thing that has never once agreed with itself goes completely silent. All three heads turn the same way. Toward him." },
        { t: "list", items: [
          "{@b Ash,} the hell hound. Or'Henn raised her from a pup. Use the hell hound stat block.",
          "{@b Gorse,} the nightmare. She pulled the plough on the ash-beds. Use the nightmare stat block.",
          "{@b Thistle,} the chimera. It was always more trouble than it was worth, and Eldra loved it best. Use the chimera stat block."
        ] },
        { t: "p", text: "Or'Henn has {@b advantage on every Wisdom (Animal Handling) check} with them. Calming one so it follows him quietly is DC 15. If Urexiel opens a pen in a fight, these three turn on her, not on him." },
        { t: "note", title: "The Contract 1 Breaches", text: "If Contract 1 is the one that was sealed, Or'Henn is legally the groundskeeper of these three. Every infernal dawn one of them stays uncatalogued, the seal gets a breach mark. At three, the Chancery can seize what was recovered under it. Reclaiming them, culling them, or burying them here clears it." },

        { t: "h", text: "Event: The Handlers" },
        { t: "read", text: "It comes round the corner on its regular round: a man-sized insect in a leather apron, four arms, a trident in two hands and a hooked pole in the other two. It stops. Its head turns, a little at a time, until it is looking at you.\n\nIt clicks once." },
        { t: "p", text: "If the party fails a Stealth check, or loses a fight with the cages, the handlers come. On round 2, one teleports away to warn Urexiel. If they kill or stop it, she is still at her glass when they reach the vault. If not, she is waiting for them." },
        { t: "encounter", id: "handlers-in-the-aisle", title: "Handlers in the Aisle", combatants: [
          { c: "mezzoloth", n: 4 }
        ], notes: "Cloudkill into a crowded walkway, then trident and claws. One teleports to warn Urexiel on round 2. The noise wakes the pens: on round 3 a random cage door bursts and something joins in, against whoever is closest." },

        { t: "h", text: "Event: Feonor's Cage" },
        { t: "p", text: "Only from day 14 on. She is in a hanging cage over the Feeding Chute, with her parasol confiscated." },
        { t: "read", text: "\"Don't,\" says Feonor, from a cage above your heads, \"say anything.\"\n\nShe looks at you through the bars for a long moment.\n\n\"The lock is a three-pin. Left side. I'd do it myself but they took my hands' good mood.\"" },
        { t: "p", text: "Opening the cage is a {@b DC 15 Dexterity check} with thieves' tools, or any {@spell knock}. Freeing her earns a grudging debt that she does pay." },
        { t: "p", text: "When they reach the vault, go to {@scene the-trophy-vault|The Trophy Vault}." }
      ]
    },

    {
      id: "the-trophy-vault",
      title: "The Trophy Vault",
      when: "Only if they reach the Menagerie's vault",
      duration: "60 to 90 minutes",
      blocks: [
        { t: "read", text: "She does not stand up. She is arranging something behind glass with a jeweller's patience, and she speaks without turning around.\n\n\"You came up the singing aisle and you're still on your feet, so you're not stock. That leaves two kinds of guest.\"\n\nNow she turns, and her smile is a merchant's smile: warm, total, and entirely for sale.\n\n\"Buyers. Or the beginnings of a very fine new exhibit. I do love a matched set.\"\n\nHer eyes settle on Or'Henn, and something crosses her face. Not fear. The look of a collector who has seen this piece in a catalogue.\n\n\"You. I know your crest.\"" },
        { t: "p", text: "{@c urexiel|Lady Urexiel} deals before she fights. She has no grudge against the party. The Ashen Garden was a job. That is what makes the ledger so terrible." },

        { t: "h", text: "Event: The Vault" },
        { t: "read", text: "The vault is quieter than the Pens, because the things in here do not perform. They are already owned. Glass and iron cabinets, each with a brass plate.\n\nA single green shoot under a bell jar, the only living green you have seen since you came to Hell, breathing fog against the glass.\n\nOn a stand in the middle, an obsidian box that your eyes will not stay on. You keep finding yourself looking at the corner of the room instead, at the cabinet beside it, at anything else.\n\nUrexiel follows your gaze and mistakes it for admiration. \"That one,\" she says, delighted. \"Everyone does that. I have no idea what it is. Isn't it wonderful?\"" },
        { t: "read", text: "And on velvet behind glass, with a brass plate that reads Shepherd's Staff, Ashen Garden. Acquired as tribute: a staff of black ashwood, a cage of branches at the head, and inside it an ember gone dark, like a coal left out in the rain.\n\nAs Or'Henn steps closer, something in the dead ember stirs. One spark. It knows its keeper." },

        { t: "h", text: "Her Prices" },
        { t: "list", items: [
          "{@b Cinderbloom:} Or'Henn himself, in a cage beside it, the matched set. Or a live chromatic dragon. Or the writ, which forces her hand. Or Tiamat's Key.",
          "{@b The Green Remnant:} a dragon carcass, or ten soul coins.",
          "{@b The box:} cheap. \"Make me an offer. It doesn't like being looked at.\" Any pretty thing, or 500 gp.",
          "{@b The three beasts:} one soul coin each, or thrown in free with the staff. \"They belong together. I hate to split a set.\"",
          "{@b The ledger:} not for sale. \"My books are not for sale. My books are me.\"",
          "{@b Uldrak,} if he is here: everything in the vault, for him. She means it. He laughs so hard the cages shake."
        ] },

        { t: "h", text: "Event: The Box" },
        { t: "p", text: "Or'Henn knows the crest on its lid the moment he gets a clear look: three flames over an open ledger, ringed by a cracked sun. It is his old master's crest. It was on the gate of the Ashen Garden." },
        { t: "note", title: "DM Only: What the Box Is", text: "It is Kreeg's copy of the contract that sold Elturel. With his living hand and an infernal writ, it can void the sale. It opens three ways and no others: Kreeg's own hand, an amnizu writ dissolving his title, or Zariel. Lockpicks, force and {@spell knock} all fail: it is a legal object, not a lock. If they bring it near Kreeg, its ash seams warm and it leans toward him like a compass." },

        { t: "h", text: "Event: The Ledger" },
        { t: "p", text: "The ledger hangs chained at her hip. Getting a look at it takes a trick, a bargain, a {@b DC 18 Dexterity (Sleight of Hand)} check, or her death. If she is about to die in fire, warn them: Asimov speaks from the Capacitor. \"The book. The answer to who paid for this is in that book, and it burns when she does.\"" },
        { t: "read", text: "The bookkeeping is perfect. A demon warband, hired by the page. A garden, listed item by item as it was emptied. Wards, salvaged. Beasts, appraised.\n\nAnd low down, under the beasts, a single cost entered in the same neat hand as everything else.\n\nOne gardener, aged. Incidental.\n\nNot even a name." },
        { t: "p", text: "That line is Eldra. The rest of the ledger names the warband and the buyers above Urexiel who took the loot up the chain. Reading it is how the party follows the raid past this room. If she dies before they have it, the paper trail dies with her." },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...pay her,} she is charming about it, and lets them leave with exactly what they paid for. She is watching Or'Henn the whole time." },
        { t: "p", text: "{@b ...use the writ,} she stalls one round, tests the seal (her Insight against their Deception, if it is forged), then hands over the staff. Nothing else is named in it." },
        { t: "p", text: "{@b ...trade a live dragon,} she goes very quiet with pleasure, and the whole vault is open to them. The staff, the Remnant and the beasts. She throws the box in as a courtesy." },
        { t: "p", text: "{@b ...accept Tiamat's Key,} Or'Henn gets one gold scale, and Urexiel's face changes as if someone has spoken in her ear. She bows and gives him the staff. Free. She will not meet his eyes." },
        { t: "p", text: "{@b ...attack her,} run the fight below." },
        { t: "encounter", id: "urexiel-fight", title: "Lady Urexiel", combatants: [
          { c: "urexiel", n: 1 },
          { c: "mezzoloth", n: 2 }
        ], lair: "urexiel", notes: "Use 190 hit points if Veska or Ser Lucan fight. Grapple, then Barb Yank toward a cage. Collector's Verdict every turn. Lair actions on 20: Open a Pen, Feeding Chute, Trophy Light. Below half she falls back to the Killing Floor and opens every cage. If Or'Henn's three beasts get loose, they fight for him." },
        { t: "map", id: "avernus-encounter-map-40x40", note: "Stand-in for the vault and the Killing Floor. There is no official map of the Menagerie." },

        { t: "h", text: "Event: The Staff in His Hand" },
        { t: "read", text: "It is lighter than you remember. The ember is still dark. But it is warm, and it has always been yours." },
        { t: "p", text: "Cinderbloom is home, but it is not whole. Its ember will not light until the rite at Vaelisha, the Mother Ash, with three Green Remnants. The bell-jar shoot is the first." },
        { t: "choices", prompt: "When they leave the Menagerie:", items: [
          { label: "Take another road", goto: "where-we-left-off" },
          { label: "End the session", goto: "ending" }
        ] }
      ]
    },

    {
      id: "the-stygian-dock",
      title: "The Stygian Dock",
      when: "Only if they take the Dock road",
      duration: "20 to 30 minutes",
      blocks: [
        { t: "p", text: "The Dock is one to two days back up the Styx. The omen on the way: barges going downriver, low in the water, loaded with soul cargo. The lemures on board are all chanting numbers." },
        { t: "note", title: "Lulu and the Dock", text: "This is the most dangerous place in the campaign for Lulu. The Styx eats memory on contact, and so does Kreeg. If he works out what she is, his first thought is that Zariel would pay anything for what is in her head. Before they land, ask the table where Lulu stays. Do not tell them why it matters." },

        { t: "h", text: "Event: The Dock" },
        { t: "read", text: "A wharf of black iron runs out over the Styx on chains, longer than a street. Barges are tied up all along it. Lemures shuffle up the gangplanks in lines, each one carrying a box of soul coins on its head, and a red devil covered in thorns stands at the end of each line, counting.\n\nNobody shouts. The only sound is the chanting of numbers and the slow slap of black water against iron.\n\nAt the land end of the wharf is a tollhouse with a brass bell hanging by its door. There is a crest painted on the door: three flames over an open ledger, ringed by a cracked sun." },
        { t: "p", text: "Or'Henn knows the crest. And he knows the bell. It is the Ashen Garden's gate bell. He would know that crack in its lip anywhere. Three rings meant a keeper reporting to the master. The master always answered from behind a screen." },

        { t: "h", text: "Ways In" },
        { t: "list", items: [
          "{@b Or'Henn rings three times.} The door opens. Nobody stops him, or the people with him. Kreeg receives them in his office as if he has been expecting a report.",
          "{@b His true name.} If they have it from the Contract V coffer, speaking it at the door means he must hear them out, and he cannot use Forgetfulness on whoever spoke it.",
          "{@b Pose as buyers} of soul cargo: {@b DC 17 Charisma (Deception)}.",
          "{@b Veska walks up to the door and demands justice.} The guards close in. That is a fight.",
          "{@b Force.} Three barbed devils on the wharf, and Kreeg in the tollhouse. See the fight in the next scene."
        ] },
        { t: "p", text: "Go to {@scene the-man-who-sold-a-city|The Man Who Sold a City}." },
        { t: "map", id: "harbor-map-night-25x25", note: "Stand-in for the Stygian Dock. The water is the Styx: anything that falls in is targeted by feeblemind." }
      ]
    },

    {
      id: "the-man-who-sold-a-city",
      title: "The Man Who Sold a City",
      when: "Only if they reach Kreeg",
      duration: "45 to 60 minutes",
      blocks: [
        { t: "read", text: "The office is lined with ledgers, floor to ceiling, thousands of them, every spine labelled in the same neat hand. A lamp burns without smoke. Behind the desk, a grey figure in a clerk's black robe is writing, and does not look up.\n\nIt is a devil. Tall and gaunt, with a long bald skull and small dark wings folded down its back like a coat. Its fingers are stained black with ink. On one of them, much too small for it now, is a gold ring with a cracked sun on it.\n\n\"Gardener,\" it says, still writing. \"You're late. The roses will be dead.\"\n\nThen it looks up, and sees who you have brought with you, and puts down the pen." },
        { t: "p", text: "{@c kreeg|Thavius Kreeg} remembers everything. He made everyone else forget: his keepers, his servants, Or'Henn. That is why Or'Henn never saw his face. He is not ashamed of the sale. He is ashamed of being caught." },

        { t: "h", text: "What He Says First" },
        { t: "read", text: "\"Before your Hellrider does anything brave,\" he says, \"let me save you a mistake. You're in the Nine Hells. If you kill me here, I am gone. Not to some other hell. Gone.\"\n\nHe folds his ink-black hands.\n\n\"And with me goes the only hand that can unsign that contract. A dead debtor only forfeits. A living one can sign it away. Think about that before you think about anything else.\"" },
        { t: "p", text: "That is true, and it is the no-surprise rule: the players must know that a living Kreeg matters before they get the chance to kill him. Now they know." },

        { t: "h", text: "What He Knows" },
        { t: "list", items: [
          "{@b The Companion,} the second sun over Elturel, was a planetar in chains. It still is.",
          "{@b The Creed Resolute} is the clause that binds the souls of the faithful. Every soul in Elturel who swore the Creed belongs to Zariel when the city touches the Styx.",
          "{@b The copy.} There were two copies of the contract. Zariel holds the original. His own copy was in a box in his house, and a yugoloth's raid took it. He does not know which yugoloth.",
          "{@b Eldra.} His service records list her: \"Acquired, First Charge. Kept for the garden.\" He bought her. He says it the way he would say he bought a chair."
        ] },
        { t: "p", text: "What he wants, and what he will trade for it, is in {@side kreegs-bargains|Kreeg's Bargains}." },

        { t: "h", text: "Event: Veska and the Traitor" },
        { t: "read", text: "Veska takes off her helmet. Her hands are steady. Her voice is not.\n\n\"My mother swore the Creed,\" she says. \"She swore it on the cathedral steps with her hand on my head.\"\n\nKreeg looks at her for a moment.\n\n\"Then she is on page four thousand and eleven,\" he says. \"I can show you, if you like.\"" },
        { t: "p", text: "Let Veska's player, or the DM, decide what she does. If she draws, the barbed devils step in from the wharf, and Kreeg sighs." },

        { t: "h", text: "Event: The Shield Knows Him" },
        { t: "p", text: "The Shield of the Hidden Lord grows cold on Drenwal's arm. Gargauth knew Kreeg in the Vanthampur days, and whispers to Drenwal alone: \"Ask him what he paid me. Ask him about the cellar.\" Use it if you want the shield in the scene. Ignore it if not." },

        { t: "h", text: "Event: He Notices Lulu" },
        { t: "p", text: "Only if Lulu came ashore." },
        { t: "read", text: "His eyes find the little golden shape behind someone's legs, and stop.\n\n\"A hollyphant,\" he says softly. \"In Avernus. With a Hellrider, a sunlord's priest and my gardener.\" He tilts his long head. \"Oh. That's very interesting.\"\n\nHe smiles for the first time." },
        { t: "p", text: "He has guessed. From now on, Lulu is the only thing in the room he really wants. He will offer to trade for her, politely. If there is a fight, his first Forgetfulness is for her, or for whoever is holding her. See the Ledger of Forgetting trait." },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...bargain,} use {@side kreegs-bargains|Kreeg's Bargains}. He keeps the letter of every deal and nothing else." },
        { t: "p", text: "{@b ...use his true name,} he must answer every question truthfully, once each, and cannot use Forgetfulness on whoever holds the name. He hates them for it, quietly, forever." },
        { t: "p", text: "{@b ...try to take him alive,} it is the best result for Elturel and the hardest. He can fly and he can dominate. They need {@item dimensional shackles|DMG}, his true name, or a grip he cannot break. On the Lady Vengeance he is a prisoner who talks to everyone at night." },
        { t: "p", text: "{@b ...leave with nothing agreed,} he lets them go. At the door he uses Forgetfulness on the one who heard the most. \"Nothing personal. I just prefer to be a rumour.\"" },
        { t: "p", text: "{@b ...attack him,} run the fight below. Remember: killed here, he is destroyed for good, and the copy can never be signed away." },
        { t: "encounter", id: "dock-fight", title: "The Dock Fight", combatants: [
          { c: "kreeg", n: 1 },
          { c: "barbed-devil", n: 3 }
        ], notes: "Kreeg stays back and talks while he fights. Charm person and command first. Forgetfulness on Lulu or her carrier. Dominate monster on the strongest fighter. The devils shove people toward the water. Below 100 hit points Kreeg offers his signature for his life, and means it this once. His ledger of taken memories is on the desk: grabbing it is an action." },
        { t: "choices", prompt: "When they leave the Dock:", items: [
          { label: "Take another road", goto: "where-we-left-off" },
          { label: "End the session", goto: "ending" }
        ] }
      ]
    },

    {
      id: "ending",
      title: "Ending the Session",
      when: "",
      duration: "10 minutes",
      blocks: [
        { t: "p", text: "End when the road they chose is finished, or at a cliffhanger inside it. Read the outcomes that happened." },

        { t: "h", text: "Outcome: They Won the Shard" },
        { t: "read", text: "The hilt is wrapped in a Hellrider's cloak in the hold, and nobody can sleep near it. It is warm all night, like something breathing." },
        { t: "p", text: "Sword shards: 1 of 3. The Fallen Three road: 2 of 3 (Haruman and Olanthius). Lulu has her fourth memory. Olanthius may ride again at the very end, if they come back for him." },

        { t: "h", text: "Outcome: Olanthius Was Destroyed" },
        { t: "p", text: "They have the hilt, but his road, his reason and his star are gone. The way to the Citadel now leans on Bel and on Lulu's memories alone. The cold candles in the Nave never light." },

        { t: "h", text: "Outcome: Cinderbloom Came Home" },
        { t: "read", text: "That night, Or'Henn sleeps with the staff across his knees. Twice, someone on watch sees the dead ember glow, very faintly, as if it is dreaming." },
        { t: "p", text: "The staff is home but dark. Green Remnants: 1 of 3, if they got the bell jar. Next: Vaelisha, the Mother Ash. If they have Kreeg's box, every Tiamat vision now shows it." },

        { t: "h", text: "Outcome: Urexiel Is Dead" },
        { t: "p", text: "If they got the ledger first, they have the names of the warband and of the buyers above her. That is a new road. If they did not, the trail ends in ash. Either way, the Menagerie's cages are open, and Avernus has three hundred new monsters walking around in it." },

        { t: "h", text: "Outcome: Feonor's Leash" },
        { t: "p", text: "If they offered her passage home, she is theirs: she stays past day 30. If not, write down whether she took the box. On day 30 the geas ends, and she sells the party's route to whoever pays." },

        { t: "h", text: "Outcome: A Deal with Kreeg" },
        { t: "p", text: "Write down the exact words. He will keep them exactly. If no infernal notary sealed it, the deal is only as good as his fear of them." },

        { t: "h", text: "Outcome: Kreeg Is Their Prisoner" },
        { t: "read", text: "He sits in the brig of the Lady Vengeance with his wings bound, writing in a ledger nobody remembers giving him.\n\n\"Don't mind me,\" he says to whoever brings him water. \"I'm only keeping count.\"" },
        { t: "p", text: "The legal road to freeing Elturel is open: his hand, the copy, and a writ. Zariel will notice that her dockmaster is missing, within days." },

        { t: "h", text: "Outcome: Kreeg Is Destroyed" },
        { t: "p", text: "Veska sleeps through the night for the first time since Elturel fell. But the copy can never be signed away now. The only lever left on the contract is Zariel's original, and they must destroy it in her own hand." },

        { t: "h", text: "Outcome: Lulu Lost a Memory" },
        { t: "p", text: "If Kreeg wrote one of her memories in his ledger, it is on a single line on one page. Whoever holds that page holds part of the road to the Citadel. If the page burns, the Caged Star needs another way." },

        { t: "note", title: "Remember for Next Time", text: "Write down: the day of Feonor's geas. Or'Henn's gold scales. Contract 1 breach marks. Sword shards held. Green Remnants held. Who has Kreeg's box. Whether Kreeg is alive, and where. Which of Lulu's memories she has. Whether Uldrak is still with them." }
      ]
    }
  ],

  side: {

    "kreegs-bargains": {
      title: "Kreeg's Bargains",
      blocks: [
        { t: "p", text: "Kreeg is a bureaucrat who sold a city. He bargains the way he did then: reasonably, in good faith, and with one clause you did not read." },
        { t: "h", text: "What He Wants" },
        { t: "list", items: [
          "{@b Out from under Zariel.} When Elturel touches the Styx, the contract is complete. Then she collects him too. He wants to be somewhere else when that happens.",
          "{@b His box.} He does not know Urexiel has it. The ledger in her vault would tell him.",
          "{@b His gardener.} He wants Or'Henn back under contract. \"Nobody has ever kept the ash-roses alive like you.\"",
          "{@b Lulu,} if he has guessed who she is. He would sell what is in her head to Zariel for his freedom."
        ] },
        { t: "h", text: "What He Will Trade" },
        { t: "list", items: [
          "{@b Free, if they ask well:} the truth about the Companion and the Creed Resolute.",
          "{@b For a promise to get him out of Avernus:} his signature on the copy, when they bring him the box and a writ. This is the legal road to freeing Elturel.",
          "{@b For his box:} the location of the original. Zariel keeps it in her own hand. He knows where she keeps her hand.",
          "{@b For Or'Henn's service, one year:} Eldra's records, and the name of the slaver who sold her to him.",
          "{@b For Lulu:} anything. Refuse."
        ] },
        { t: "h", text: "The Catches" },
        { t: "list", items: [
          "A deal with a devil is a contract. If no infernal notary seals it, it binds only as long as he is afraid of them.",
          "He never lies. He leaves things out. Every deal has one clause about timing, and it favours him.",
          "If they promise him safe passage out of Avernus, the Lady Vengeance is the only ship that can take him. He will be aboard, with the crew, for the rest of the campaign.",
          "Killing him after a sealed deal breaks the deal, and the breach falls on whoever signed."
        ] },
        { t: "note", title: "DM Recommendation", text: "Let the players make the deal that frees Elturel with him, and make them hate it. The redemptive ending of this campaign is mercy for the people who least deserve it. Kreeg is the hardest test of that the party will meet before Zariel." }
      ]
    },

    "far-roads": {
      title: "The Far Roads (Short Hooks)",
      blocks: [
        { t: "p", text: "Three more sites are three days or more away. They are not written as full scenes for tonight. If the players turn toward one, give them the hook, play the journey, and end the session on arrival. The full notes are on each site's pin on the Campaign Map." },

        { t: "h", text: "The Arches of Ulloch" },
        { t: "p", text: "{@b Four to five days west. Omen:} every stone they pass has a riddle carved on it, and the riddles get harder." },
        { t: "read", text: "On the horizon, three great arches of red stone stand in a row, with nothing under them and nothing beyond. As you watch, something huge and winged settles on the middle one, folds its wings, and looks your way." },
        { t: "p", text: "An infernal sphinx guards a hidden door to the Bleeding Citadel. It is a back door: use it if the 33-day window is close and the Fallen Three road is not finished. Its price is a riddle trial or a fight." },

        { t: "h", text: "The Wrecked Flying Fortress" },
        { t: "p", text: "{@b Three to four days south and east. Omen:} a single speck circles the sky, and grows into a patrol." },
        { t: "read", text: "Jeremy comes up from the engine room with his hands black to the elbow. \"The core's humming,\" he says. \"Not ours. It's answering something. There's another set of rods out there, the spares, and they're still in the wreck.\"" },
        { t: "p", text: "The spare control rods and the fortress command cipher are Bel's price for his piece of the road. The party does not know he wants them yet. The Warden still guards the engine-well, Zariel's patrols hunt rod-thieves, and the Rust Queen's crew may be inside first." },

        { t: "h", text: "The Pit of Shummrath" },
        { t: "p", text: "{@b Four to five days north. Omen:} the Styx runs faster and louder, toward a sound like something breathing in a well." },
        { t: "read", text: "If they have the hilt, it turns in its cloak in the hold, all night, until it points north. In the morning it is still pointing." },
        { t: "p", text: "The third shard of the Sword, the point, lies at the bottom of the pit. Bel buried it and sat a pit fiend on it. Getting it means damming the Styx with shattersticks from the Firesnake Forge at the Emporium, waiting a day, and fighting a weakened pit fiend. Freeing Shummrath angers Bel." }
      ]
    }
  }
};
