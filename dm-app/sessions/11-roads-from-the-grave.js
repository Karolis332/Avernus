// Session 11: the roads out of Uldrak's Grave. Three full branches (the Crypt of the Hellriders,
// the Scabrous Menagerie, the Stygian Dock) plus hook cards for the far sites.
// Uldrak comes from sessions/campaign-tower.js; this file overrides only his tactics.
window.SESSION = {
  id: "11-roads-from-the-grave",
  title: "Roads from the Grave",
  subtitle: "Session 11 · Descent into Avernus",
  summary: "After the dragons, three roads run out from Uldrak's Grave, and each ends at someone who owes the party an answer. Olanthius kneels in the Crypt of the Hellriders over the one shard missing from the Sword. Lady Urexiel keeps Or'Henn's staff, Kreeg's box and the ledger of the raid in the Scabrous Menagerie. Thavius Kreeg, the man who sold Elturel, runs the Stygian Dock as an amnizu. The players pick the road. Each branch runs on its own.",

  party: [
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 13. Sigil of the Binding drawn (Tier II). Carries the Shield of the Hidden Lord." },
    { id: "aurora", name: "Aurora", note: "Archfey Warlock 13 (Mystic Arcanum 7th). Rides the celestial Moonkite." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 13. Tiamat's curse: carry his Pull number over from Session 10 (see Tiamat's Pull). Cinderbloom arrives this session, with Feonor. Carries the Soul Capacitor." }
  ],

  allies: [
    { id: "veska", name: "Veska", note: "Hellrider of Elturel. The Dock is personal for her." },
    { id: "ser-lucan", name: "Ser Lucan the Reforged", note: "ally" },
    { id: "jeremy", name: "Jeremy", note: "Runs the Planar Core; Colico Jack flies the ship" },
    { id: "lulu", name: "Lulu", note: "Hollyphant. Wanted at the Crypt. In danger at the Dock." },
    { id: "moonkite", name: "Moonkite", note: "Celestial mount, Aurora's companion" },
    { id: "lady-vengeance", name: "Lady Vengeance (Colico Jack)", note: "AC 17 · HP 350 · DT 15" },
    { id: "uldrak", name: "Uldrak", note: "Away at Bel's Forge, buying a weapon that can kill Tiamat. Returns when she rises, or when the orb is used and the party is losing." },
    { id: "feonor", name: "Feonor", note: "Geas-bound. She stole Cinderbloom and is bringing it to Or'Henn: she arrives during the Crypt siege. Stays only if asked nicely; leaves when Tiamat rises." }
  ],

    creatures: {
    "mummy-captain": {
      "name": "Captain Aldous Varn",
      "kind": "mummy-lord",
      "role": "The officer who gave the order to run. Mummy lord chassis",
      "source": {
        "page": "bestiary",
        "name": "Mummy Lord",
        "src": "MM"
      },
      "homebrew": "Campaign NPC on a mummy lord's numbers (MM, CR 15), with his priest spells replaced by a Hellrider's commands. Not the book's.",
      "description": "A tall figure in grave-cloth and the rags of an officer's tabard, his shield turned face-down on his back. His eyes are two points of grey light.",
      "sizeType": "Medium undead, lawful evil",
      "ac": 17,
      "acNote": "natural armor",
      "hp": 97,
      "hpFormula": "13d8 + 39",
      "speed": "20 ft.",
      "abilities": {
        "str": 18,
        "dex": 10,
        "con": 17,
        "int": 11,
        "wis": 18,
        "cha": 16
      },
      "saves": "Con +8, Int +5, Wis +9, Cha +8",
      "skills": "History +5, Religion +5",
      "vulnerable": "fire",
      "resist": "",
      "immune": "necrotic, poison; bludgeoning, piercing, and slashing from nonmagical attacks",
      "condImmune": "charmed, exhaustion, frightened, paralyzed, poisoned",
      "senses": "darkvision 60 ft., passive Perception 14",
      "languages": "Common, Celestial",
      "cr": "15",
      "xp": 13000,
      "pb": 5,
      "traits": [
        {
          "name": "Magic Resistance",
          "text": "The captain has advantage on saving throws against spells and other magical effects."
        },
        {
          "name": "Rejuvenation",
          "text": "A destroyed captain gains a new body in 24 hours if his shield, turned face-down in the eastern tomb, is intact. Turning it face-up and laying it on Olanthius's coffin ends him for good."
        },
        {
          "name": "Shame",
          "text": "He cannot attack Olanthius, and if Olanthius orders him to kneel, he must."
        }
      ],
      "actions": [
        {
          "name": "Multiattack",
          "text": "The captain can use his Dreadful Glare and makes one attack with his rotting fist."
        },
        {
          "name": "Rotting Fist",
          "text": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage plus 21 (6d6) necrotic damage. A creature must succeed on a DC 16 Constitution saving throw or be cursed with mummy rot: it can't regain hit points, and its hit point maximum decreases by 10 (3d6) every 24 hours. The curse lasts until removed by remove curse or other magic."
        },
        {
          "name": "Dreadful Glare",
          "text": "One creature within 60 ft. that can see him makes a DC 16 Wisdom saving throw or is frightened until the end of his next turn; failing by 5 or more also paralyzes it for the same duration."
        }
      ],
      "legendary": {
        "count": 3,
        "intro": "The captain can take 3 legendary actions, one at a time, at the end of another creature's turn. He regains them at the start of his turn.",
        "actions": [
          {
            "name": "Attack",
            "cost": 1,
            "text": "He makes one rotting fist attack or uses his Dreadful Glare."
          },
          {
            "name": "Order the Line",
            "cost": 1,
            "text": "One mummy he can see uses its reaction to make a rotting fist attack."
          },
          {
            "name": "Run",
            "cost": 2,
            "text": "Each creature within 10 ft. makes a DC 16 Wisdom saving throw or must use its reaction to move its speed away from him. He remembers giving that order."
          }
        ]
      },
      "tactics": [
        "Opens with Dreadful Glare on the strongest-looking fighter, then rotting fist on whoever is frightened.",
        "Uses Order the Line every round. The mummies fight in ranks, the way Hellriders were taught.",
        "If anyone says the word \"glory\", he flinches: disadvantage on his next attack."
      ],
      "roleplay": [
        "Voice: a dry whisper, still giving orders.",
        "Wants: to be forgiven, and he knows he will not be.",
        "Sample line: \"I gave the order. I would give it again. They would all have died.\""
      ]
    },

    "wraith": {
      "name": "Hellrider Wraith",
      "kind": "wraith",
      "role": "Restless dead of the First Charge. Upscaled for a level-13 party",
      "homebrew": "Chassis: Wraith (MM, CR 5), upscaled to about CR 9: 112 HP, +8 to hit, two Life Drains a turn, DC 16.",
      "source": {
        "page": "bestiary",
        "name": "Wraith",
        "src": "MM"
      },
      "sizeType": "Medium undead, neutral evil",
      "ac": 15,
      "hp": 112,
      "hpFormula": "15d8 + 45",
      "speed": "0 ft., fly 60 ft. (hover)",
      "abilities": {
        "str": 6,
        "dex": 16,
        "con": 16,
        "int": 12,
        "wis": 14,
        "cha": 15
      },
      "resist": "acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
      "immune": "necrotic, poison",
      "condImmune": "charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained",
      "senses": "darkvision 60 ft., passive Perception 12",
      "languages": "the languages it knew in life",
      "cr": "9",
      "xp": 5000,
      "pb": 4,
      "traits": [
        {
          "name": "Incorporeal Movement",
          "text": "The wraith can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
        },
        {
          "name": "Sunlight Sensitivity",
          "text": "While in sunlight, the wraith has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight."
        }
      ],
      "actions": [
        {
          "name": "Multiattack",
          "text": "The wraith makes two Life Drain attacks."
        },
        {
          "name": "Life Drain",
          "text": "Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 21 (4d8 + 3) necrotic damage. The target must succeed on a DC 16 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken, until it finishes a long rest. The target dies if this reduces its hit point maximum to 0."
        },
        {
          "name": "Create Specter",
          "text": "The wraith targets a humanoid within 10 feet of it that has been dead for no longer than 1 minute and died violently. The target's spirit rises as a specter under the wraith's control. It can control no more than seven specters at once."
        }
      ],
      "tactics": [
        "Rises only if the dead are disturbed. Goes for whoever broke the urn or took from a tomb."
      ]
    },
    "specter": {
      "name": "Specter",
      "kind": "specter",
      "role": "Restless dead",
      "source": {
        "page": "bestiary",
        "name": "Specter",
        "src": "MM"
      },
      "sizeType": "Medium undead, chaotic evil",
      "ac": 12,
      "hp": 22,
      "hpFormula": "5d8",
      "speed": "0 ft., fly 50 ft. (hover)",
      "abilities": {
        "str": 1,
        "dex": 14,
        "con": 11,
        "int": 10,
        "wis": 10,
        "cha": 11
      },
      "resist": "acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
      "immune": "necrotic, poison",
      "condImmune": "charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious",
      "senses": "darkvision 60 ft., passive Perception 10",
      "languages": "understands all languages it knew in life but can't speak",
      "cr": "1",
      "xp": 200,
      "pb": 2,
      "traits": [
        {
          "name": "Incorporeal Movement",
          "text": "The specter can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
        },
        {
          "name": "Sunlight Sensitivity",
          "text": "While in sunlight, the specter has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight."
        }
      ],
      "actions": [
        {
          "name": "Life Drain",
          "text": "Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) necrotic damage. The target must succeed on a DC 10 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken, until it finishes a long rest."
        }
      ]
    },
    "ghost": {
      "name": "Ghost of the First Charge",
      "kind": "ghost",
      "role": "A Hellrider who never left. Answers one question, then fades",
      "source": {
        "page": "bestiary",
        "name": "Ghost",
        "src": "MM"
      },
      "npc": true,
      "sizeType": "Medium undead, lawful good",
      "ac": 11,
      "hp": 45,
      "hpFormula": "10d8",
      "speed": "0 ft., fly 40 ft. (hover)",
      "abilities": {
        "str": 7,
        "dex": 13,
        "con": 10,
        "int": 10,
        "wis": 12,
        "cha": 17
      },
      "resist": "acid, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
      "immune": "cold, necrotic, poison",
      "condImmune": "charmed, exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained",
      "senses": "darkvision 60 ft., passive Perception 11",
      "languages": "Common, Celestial",
      "cr": "4",
      "xp": 1100,
      "pb": 2,
      "traits": [
        {
          "name": "Ethereal Sight",
          "text": "The ghost can see 60 ft. into the Ethereal Plane when it is on the Material Plane, and vice versa."
        },
        {
          "name": "Incorporeal Movement",
          "text": "The ghost can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."
        }
      ],
      "actions": [
        {
          "name": "Withering Touch",
          "text": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) necrotic damage."
        },
        {
          "name": "Etherealness",
          "text": "The ghost enters the Ethereal Plane from the Material Plane, or vice versa."
        },
        {
          "name": "Horrifying Visage",
          "text": "Each non-undead creature within 60 ft. that can see the ghost makes a DC 13 Wisdom saving throw or is frightened for 1 minute; failing by 5 or more also ages it 1d4 x 10 years. Repeat the save at the end of each turn. A creature that succeeds is immune for 24 hours. Greater restoration within 24 hours reverses the aging."
        },
        {
          "name": "Possession (Recharge 6)",
          "text": "One humanoid within 5 ft. makes a DC 13 Charisma saving throw or is possessed until the body drops to 0 hit points, the ghost ends it as a bonus action, or it is turned or forced out (dispel evil and good)."
        }
      ],
      "roleplay": [
        "Appearance: a pale rider in Hellrider grey, half-transparent, still wearing the wound that killed him.",
        "Wants: someone to say his name aloud. It is on the wall. He will not tell them which one.",
        "Knows: the Charge. He will answer one question about it truthfully, then fade."
      ],
      "tactics": [
        "Does not attack unless attacked. If attacked, Horrifying Visage, then Etherealness, and he is gone."
      ]
    },
    "mummy": {
      "name": "Mummy (The Ones Who Ran)",
      "kind": "mummy",
      "role": "Hellriders who fled the Charge, entombed in shame",
      "source": {
        "page": "bestiary",
        "name": "Mummy",
        "src": "MM"
      },
      "sizeType": "Medium undead, lawful evil",
      "ac": 13,
      "acNote": "natural armor",
      "hp": 97,
      "hpFormula": "13d8 + 39",
      "speed": "20 ft.",
      "abilities": {
        "str": 16,
        "dex": 8,
        "con": 15,
        "int": 6,
        "wis": 10,
        "cha": 12
      },
      "saves": "Wis +2",
      "vulnerable": "fire",
      "resist": "",
      "immune": "necrotic, poison; bludgeoning, piercing, and slashing from nonmagical attacks",
      "condImmune": "charmed, exhaustion, frightened, paralyzed, poisoned",
      "senses": "darkvision 60 ft., passive Perception 10",
      "languages": "the languages it knew in life",
      "cr": "3",
      "xp": 700,
      "pb": 2,
      "actions": [
        {
          "name": "Multiattack",
          "text": "The mummy can use its Dreadful Glare and makes one attack with its rotting fist."
        },
        {
          "name": "Rotting Fist",
          "text": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage plus 10 (3d6) necrotic damage. A creature must succeed on a DC 12 Constitution saving throw or be cursed with mummy rot: it can't regain hit points, and its hit point maximum decreases by 10 (3d6) every 24 hours. If this reduces its hit point maximum to 0, it dies and turns to dust. The curse lasts until removed by remove curse or other magic."
        },
        {
          "name": "Dreadful Glare",
          "text": "The mummy targets one creature it can see within 60 ft. If the target can see it, the target makes a DC 11 Wisdom saving throw or is frightened until the end of the mummy's next turn; failing by 5 or more also paralyzes it for the same duration. A creature that succeeds is immune to the Dreadful Glare of all mummies (but not mummy lords) for 24 hours."
        }
      ],
      "tactics": [
        "Only if the eastern C6 tomb is opened. If Olanthius is present, they kneel to him instead of attacking."
      ]
    },
    "arkhan-the-cruel": Object.assign({}, window.CAMPAIGN.creatures["arkhan-the-cruel"], { tactics: window.CAMPAIGN.endgame.arkhanTactics }),

    "uldrak": Object.assign({}, window.CAMPAIGN.creatures.uldrak, {
      role: "Empyrean, away at Bel's Forge. Comes back when Tiamat rises",
      tactics: [
        "Not on these roads. He left the Grave for Bel's Forge to buy a blade that can kill Tiamat ({@side uldraks-errand|Uldrak's Errand}).",
        "Returns at the start of round 3 of {@scene tiamat-reborn|Tiamat Reborn}, or the moment the orb is used while the party is losing.",
        "At the Crypt, if he is somehow here, he stays outside the door, bowed: \"That is a grave for knights. I am too big to be polite in it.\"",
        "At will: {@spell greater restoration}. It gives back a memory the Styx took, but not one Kreeg wrote into his ledger."
      ]
    }),

    "feonor": Object.assign({}, window.CAMPAIGN.creatures.feonor, {
      role: "Archmage. Stole Cinderbloom and brings it to Or'Henn in the Crypt; free of the geas once he takes it",
      npc: false,
      roleplay: [
        "Appearance: willowy human archmage in scorched robes, one sleeve gone and the arm under it still bandaged. Her mended parasol is her pride.",
        "Voice: short sentences, long sighs. Furious, and very tired.",
        "Wants: out of Avernus without crawling back to Mahadi. Passage home on the Lady Vengeance would buy her for the rest of the campaign.",
        "Knows: the Menagerie's layout and the handlers' round. She has been in that vault once and will not go back in.",
        "Sample line: \"I have done what you made me do. Ask nicely, druid, and I will burn one thing for you before I go. One.\""
      ],
      tactics: [
        "At the Crypt: arrives during the siege with the staff (Feonor Brings the Staff). Will not go deeper than area C2. \"I have had enough of graves.\"",
        "If Arkhan comes: counterspells the Hand of Vecna once, with relish, then fights from range behind Lucan or inside Lulu's aura.",
        "Leaves by misty step and fly the moment Tiamat rises, unless someone gives her a very good reason."
      ]
    }),

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
      role: "Death knight, guilty witness, keeper of the Sword's missing shard",
      source: { page: "bestiary", name: "Olanthius", src: "BGDIA" },
      homebrew: "Upscaled from the Monster Manual death knight to CR 20 for three level-13 characters with companions: 285 HP, AC 21, +13, longsword 5d8 necrotic, 3 legendary actions, Legendary Resistance 2/day. He fights at half heart: he pulls killing blows, uses Hellfire Orb only as a warning shot, and never strikes a downed character.",
      npc: true,
      sizeType: "Medium undead, lawful neutral",
      ac: 21, acNote: "plate, shield",
      hp: 285, hpFormula: "30d8 + 150",
      speed: "30 ft.",
      abilities: { str: 22, dex: 11, con: 20, int: 12, wis: 16, cha: 18 },
      saves: "Str +12, Dex +6, Wis +9, Cha +10", skills: "Athletics +12, History +7, Insight +9",
      vulnerable: "", resist: "", immune: "necrotic, poison", condImmune: "exhaustion, frightened, poisoned",
      senses: "darkvision 120 ft., passive Perception 13",
      languages: "Celestial, Common, Infernal",
      cr: "20", xp: 25000, pb: 6,
      traits: [
        { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
        { name: "Legendary Resistance (2/Day)", text: "If he fails a saving throw, he can choose to succeed instead." },
        { name: "Marshal Undead", text: "Unless he is incapacitated, he and undead of his choice within 60 ft. have advantage on saving throws against features that turn undead." },
        { name: "Spellcasting", text: "19th-level paladin. Spell save DC 18, +10 to hit. 1st (4 slots): command, compelled duel, searing smite. 2nd (3): hold person, magic weapon. 3rd (3): dispel magic, elemental weapon. 4th (3): banishment, staggering smite. 5th (2): destructive wave." },
        { name: "Oathbreaker", text: "His spells that deal radiant damage deal necrotic damage instead." }
      ],
      actions: [
        { name: "Multiattack", text: "Three longsword attacks." },
        { name: "Longsword", text: "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 10 (1d8 + 6) slashing plus 22 (5d8) necrotic." },
        { name: "Hellfire Orb (1/Day)", text: "A ball of fire bursts at a point he can see within 120 ft. Each creature in a 20-ft. radius makes a DC 18 Dexterity saving throw: 35 (10d6) fire plus 35 (10d6) necrotic on a failure, half on a success. It spreads around corners." }
      ],
      bonus: [],
      legendary: {
        count: 3,
        intro: "Olanthius can take 3 legendary actions, one at a time, at the end of another creature's turn. He regains them at the start of his turn.",
        actions: [
          { name: "Longsword", cost: 1, text: "He makes one longsword attack." },
          { name: "Hold the Line", cost: 1, text: "He moves up to half his speed without provoking opportunity attacks, to stand between an enemy and a downed creature." },
          { name: "The Sun Will Hold", cost: 2, text: "Each undead of his choice within 60 ft. regains 20 hit points, and each creature he chooses within 30 ft. makes a DC 18 Wisdom saving throw or is frightened of him until the end of its next turn." }
        ]
      },
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
        "Knows: the road to the Bleeding Citadel. Why the Sword was hidden. Where its missing shard is. That a small star fell, and Zariel hated it.",
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

  timeline: [
    {
      "phase": "All Session",
      "events": [
        {
          "when": "Start",
          "tag": "trigger",
          "text": "Or'Henn's {@b Pull} carries over from Session 10. Say the number. Rules: {@side tiamats-pull|Tiamat's Pull}."
        },
        {
          "when": "First sight of each chromatic dragon",
          "tag": "trigger",
          "text": "Pull {@b +1}. While one is in sight, he makes the Pull save at the start of each of his turns."
        },
        {
          "when": "Arkhan's hunt lands",
          "tag": "trigger",
          "text": "Add Arkhan and the surviving tower dragons to the tracker. Run {@scene arkhans-gambit|Arkhan's Gambit}. At the Crypt the fight is at the door, cold side, no devils."
        }
      ]
    },
    {
      "phase": "The Crypt of the Hellriders",
      "events": [
        {
          "when": "Approach: the Cold Line",
          "tag": "trigger",
          "text": "Devils stop at it and hiss. Asimov goes quiet. {@b Tiamat goes quiet: Pull paused inside.} Lulu brightens; Moonkite's light steadies."
        },
        {
          "when": "C1. Sealed Gates",
          "tag": "choice",
          "text": "Pass phrase \"For Glory\" ({@b DC 15 History/Religion}, Drenwal and Veska at advantage, Lucan knows it); Lulu says \"please\" (no roll); Drenwal speaks his father's name, Halvard, with grief; or a bought word."
        },
      {"when": "Knock cast", "tag": "trigger", "text": "The spell fails; the bang carries. Arkhan's hunt arrives. Ship gone: no cannons. Go to {@scene knock-at-the-gates|Knock at the Gates}."},
      {"when": "Knock, round 1", "tag": "round", "text": "Arkhan comes halfway down the stair and asks once. Refused: Flash breathes down the stairwell (DC 21 Dex)."},
      {"when": "Knock, rounds 2+", "tag": "every-turn", "text": "Vecna's Grip on Or'Henn (DC 22 Con), then grapple (+15 Athletics) and drag 20 ft. a turn up the stair. {@b Inside the Cold Line he cannot draw the curse.} Past the doorway: Pull resumes, the Offering begins."},
      {"when": "Knock, end of round 3", "tag": "trigger", "text": "Or \"For Glory\", or Lulu's \"please\": the gates open. Olanthius holds the doorway, Hellfire Orb up the stair. Fight beside him: advantage on his first check. Arkhan withdraws: the siege begins."},
        {
          "when": "C2. Funerary Chambers",
          "tag": "trigger",
          "text": "Crimson Watch alcove (central chamber): HALVARD, FELL AT THE WALL, and under it \"I carved what the dead told me. O.\" Drenwal finds it with no roll. Veska knows it is a lie. Lucan finds his own name."
        },
      {"when": "Feonor arrives", "tag": "choice", "text": "Invisible, by fly, past the dragons: {@scene feonor-brings-the-staff|Feonor Brings the Staff}. Ember relights in Or'Henn's hand with 1d6 charges; geas ends. Green flare = the ship comes."},
        {
          "when": "C3 / C6 checks",
          "tag": "choice",
          "text": "{@b C3, DC 13 Religion:} the cold candles light when someone is forgiven. {@b C6, DC 15 Perception:} secret doors. West: +1 lance and Hellrider's Aegis (ask first). East: the Ones Who Ran, eight mummies."
        },
        {
          "when": "C5. Olanthius",
          "tag": "choice",
          "text": "{@b Book key: someone has read his journal (C7)}; without it he fights. {@b Campaign bonus: Drenwal tells him the truth about Halvard} (murdered by the Bhaal cult inside the Watch): advantage on everything, shard with no check. A Hellrider's oath or the Crimson Watch's name = advantage once. No key: {@b DC 18 Persuasion}, honour not grief. Fail: the Vigil ({@b DC 14 Wis}, two must pass) or the Half-Heart Duel."
        },
        {
          "when": "He names Yael",
          "tag": "trigger",
          "text": "{@b Lulu Remembers}: her fourth memory. From now on she knows the road to the Bleeding Citadel. Mark it."
        },
        {
          "when": "The Shard",
          "tag": "choice",
          "text": "{@b DC 15 Persuasion} (Elturel, an oath, or Lulu's word: no check if her memory fired). His condition: a Hellrider carries the whole Sword. He warns them to keep Or'Henn's gold eye away from it."
        },
        {
          "when": "The Star That Fell",
          "tag": "trigger",
          "text": "Freely to a keyed party, else {@b DC 16 Insight}. Moonkite looks away. First hard sign of the Caged Star; do not name it yet."
        },
        {
          "when": "Half-Heart Duel",
          "tag": "every-turn",
          "text": "Compelled duel on whoever struck first. Hold person on anyone who hits a downed or kneeling foe. He ends it himself if they fight with honour."
        },
        {
          "when": "Before They Leave",
          "tag": "trigger",
          "text": "He gives the Kostchtchie task (\"You don't befriend the thing in the Maw. You point it.\") and asks Drenwal for the names of the cult that murdered Halvard."
        }
      ]
    }
  ].concat(window.CAMPAIGN.endgame.timeline),

  companions: [
    {
      "id": "veska",
      "creature": "veska",
      "name": "Veska",
      "role": "Hellrider of Elturel. This is her order's crypt.",
      "inFight": "Half-Heart Duel: she will not strike Olanthius. She holds the line beside Drenwal and calls the yield. Against Arkhan she fights as in Session 10.",
      "behaviour": [
        "Takes her helmet off at the Cold Line and does not put it back on inside.",
        "Finds names she knew on the wall. Give her one: the rider who trained her.",
        "Speaks to Olanthius as a Hellrider to a Hellrider: advantage on the first Persuasion check if she makes it.",
        "If Drenwal reads HALVARD, FELL AT THE WALL, she tells him the truth there, in front of the stone."
      ]
    },
    {
      "id": "ser-lucan",
      "creature": "ser-lucan",
      "name": "Ser Lucan the Reforged",
      "role": "Old Crimson Watch. The order thought him dead: his name may be on the wall.",
      "inFight": "Will not draw steel in the Crypt unless Olanthius draws first. Keep the Watch on whoever the compelled duel lands on.",
      "behaviour": [
        "Finds his own name carved among the dead and says nothing for a long while.",
        "Knows the watchword. He says \"The sun will hold\" at the door if no one else does, and it costs him to say it.",
        "When Olanthius tells how the Watch ended, Lucan confirms it. He was there."
      ]
    },
    {
      "id": "lulu",
      "creature": "lulu",
      "name": "Lulu",
      "role": "Hollyphant. The Crypt remembers her.",
      "inFight": "Stays out of the duel. Aura over the wounded; cure wounds on whoever Olanthius drops.",
      "behaviour": [
        "Opens the door with \"please\". She does not know why it works.",
        "Goes to the arch before anyone else. She knows the way and does not know how.",
        "{@b Lulu Remembers} fires the first time Olanthius names Yael or the gate. Do not miss it.",
        "If she is handed the shard, it hums in her trunk."
      ]
    },
    {
      "id": "moonkite",
      "creature": "moonkite",
      "name": "Moonkite",
      "role": "Celestial mount. Welcome here.",
      "inFight": "Carries Aurora clear, then Shimmering Shield on whoever is lowest.",
      "behaviour": [
        "Its light grows steadier inside the Cold Line.",
        "At The Star That Fell it flickers and turns its head away. It will not say why."
      ]
    },
    {
      "id": "feonor",
      "creature": "feonor",
      "name": "Feonor",
      "role": "Arrives during the siege with Cinderbloom. Free of the geas once Or'Henn takes it.",
      "inFight": "Counterspells Arkhan's Hand of Vecna once. Fireball and cone of cold from range. Leaves when Tiamat rises.",
      "behaviour": [
        "Arrives invisible during the siege, by fly, past the dragons. Will not go deeper than area C2: \"I have had enough of graves.\"",
        "Urexiel's hunters are following the staff. Feonor knows it and says so."
      ]
    },
    {
      "id": "lady-vengeance",
      "creature": "lady-vengeance",
      "name": "The Lady Vengeance (Colico Jack)",
      "role": "Away, hiding from the dragons. Jack needs a signal to come back.",
      "inFight": "Not in the fight at the gates. If signalled, she can come back for the party, and the dragons will see her coming.",
      "behaviour": [
        "Jack will not cross the line. \"Ships don't go in churches.\"",
        "Jeremy keeps Maintain Core going every round regardless (+10 vs DC 15)."
      ]
    },
    {
      "id": "uldrak",
      "creature": "uldrak",
      "name": "Uldrak (returning)",
      "role": "Away at Bel's Forge. Returns when Tiamat rises.",
      "inFight": "Arrives at the start of round 3 of Tiamat Reborn, or when the orb is used and the party is losing. Goes straight for Tiamat.",
      "behaviour": [
        "With Gnashing Hunger: {@side uldraks-errand|Uldrak's Errand}.",
        "Grabs Arkhan (contested Athletics) rather than let him teleport away."
      ]
    }
  ],

  scenes: [

    {
      id: "adventure-primer",
      title: "Adventure Primer",
      when: "",
      duration: "5 minutes (read before play)",
      banner: "art/official/lulu.webp",
      blocks: [
        { t: "p", text: "This session is designed for the three 13th-level characters of this campaign: Drenwal, Aurora and Or'Henn, with Veska, Ser Lucan, Jeremy, Lulu and Moonkite, and Colico Jack at the helm of the Lady Vengeance. It runs about four to five hours. It is a choice of roads. Three places lie within a few days of Uldrak's Grave, and each one holds someone who knows something the party needs. Expect them to finish one road tonight, maybe two." },
        { t: "note", title: "Check Session 10 Before You Start", text: "Write these down before play. Several scenes change because of them.\n\n{@b Or'Henn's Pull number} from Session 10.\n{@b Did they catch a dragon alive,} or bring a carcass?\n{@b Who holds the orb of dragonkind:} the party, or Krull?\n{@b Did the curse jump?} If it did, use your own notes from last session's ending first.\n{@b How many gold scales} does Or'Henn have?\n{@b Did anyone touch the Styx,} and what did they forget?\n{@b Did they fight the dragons at the Grave,} or fly before calling?" },

        { t: "h", text: "Background" },
        { t: "p", text: "The party has freed Uldrak, taken his orb as payment for the vial, and watched him walk off to buy a god-killing blade. Arkhan's dragons are hunting them. Now the map opens. Three people are close, and each one is a door." },
        { t: "p", text: "{@c olanthius|Olanthius} is a death knight who kneels in the Crypt of the Hellriders. A hundred years ago he watched the paladin Yael and the hollyphant Lulu carry the Sword of Zariel out of Hell, and he did nothing. He knows the road to the Bleeding Citadel. And in his empty coffin lies the one piece missing from the Sword: a sliver of the blade that broke off in Zariel's last battle." },
        { t: "p", text: "{@c urexiel|Lady Urexiel} is a yugoloth broker who keeps the Scabrous Menagerie. She paid for the raid that burned the Ashen Garden and killed Or'Henn's household. Her vault held Cinderbloom until Feonor stole it in Session 10; it still holds a Green Remnant, her ledger of the raid, and a puzzle box she thinks is a pretty toy. The box is Kreeg's copy of the contract that damned Elturel." },
        { t: "p", text: "{@c kreeg|Thavius Kreeg} sold Elturel to Zariel. Zariel remade him as an amnizu and set him to count souls at the Stygian Dock. He owned the Ashen Garden. Or'Henn served him for sixty years and never saw his face up close. The party worked out who he is in Session 8." },

        { t: "h", text: "Overview" },
        { t: "p", text: "This session has a shared opening, three branches and a shared ending. Run only the branch the players choose. If they finish one early, go back to Where We Left Off and let them pick again." },
        { t: "list", items: [
          "{@b Where We Left Off} (15 minutes). At the Grave, with or without a dragon fight behind them. Three roads, and the people who point down them.",
          "{@b The Crypt of the Hellriders} (about 2 hours). The Door, the Nave of Names, and the Kneeling Knight.",
          "{@b The Scabrous Menagerie} (about 2 to 3 hours). The Singing Aisle, the Pens, and the Trophy Vault.",
          "{@b The Stygian Dock} (about 1 to 2 hours). The Dock, and the Man Who Sold a City.",
          "{@b Ending the Session} (10 minutes). What they carried away, and what it cost."
        ] },

        { t: "h", text: "Adventure Hooks" },
        { t: "p", text: "{@b The Sword.} The Sword of Zariel waits in the Bleeding Citadel, missing one shard. The shard is in the Crypt. Lulu dreams of a cold place and a man at a gate." },
        { t: "p", text: "{@b The staff.} Table ruling: Feonor stole Cinderbloom from the vault and is bringing it to Or'Henn; she arrives during the Crypt ({@scene feonor-brings-the-staff|Feonor Brings the Staff}). Its brass plate is a tracking sigil, so Urexiel's hunters are on the party's trail." },
        { t: "p", text: "{@b The traitor.} Veska has known since Session 8 that the man who sold her city is alive, two days up the Styx. She has not stopped thinking about it." },

        { t: "h", text: "Where things stand" },
        { t: "list", items: [
          "The party is 13th level.",
          "The Sword's missing shard: not found yet. The Fallen Three road: Haruman's piece only.",
          "Green Remnants: none of the three.",
          "Or'Henn is still under Tiamat's curse. Her visions come in his sleep.",
          "Feonor's geas is fulfilled. She is free, and stays only if asked nicely.",
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
        { t: "p", text: "The session opens at Uldrak's Grave. Table ruling: the party is flying for the Crypt of the Hellriders. Use whichever read-aloud fits: they fought the dragons at the Grave, or they lifted off before calling them." },
        { t: "note", title: "Carry Over From Session 10", text: "Or'Henn's {@b Pull} number, as it stood ({@side tiamats-pull|Tiamat's Pull}). The orb of dragonkind, and who carries it. Cinderbloom is still with Feonor, who is on her way. Uldrak away." },
        { t: "h", text: "If They Fought the Dragons" },
        { t: "read", text: "The smoke is still going up from the Grave when the red sky turns to morning. The ash is black and glassy where the dragon fire hit it, and it cracks under your boots like thin ice.\n\nThe sword stands alone in the ash. Uldrak is a day gone toward Bel's Forge, and the ground has finally stopped shaking.\n\nOn the deck of the Lady Vengeance, Colico Jack has the charts out, weighted down with a wrench and a cold cup of something. He taps the map three times.\n\n\"Right,\" he says. \"Where now?\"" },
        { t: "h", text: "If They Never Called Them" },
        { t: "read", text: "The orb rides in the hold, wrapped in three cloaks, and everyone on deck knows exactly where it is.\n\nBehind you, the sword at the Grave shrinks into the haze. Nobody has said the word \"dragon\" since you lifted off.\n\nColico Jack has the charts out, weighted down with a wrench and a cold cup of something. He taps the map three times.\n\n\"Right,\" he says. \"Where now? And how fast?\"" },

        { t: "h", text: "Event: Three Roads" },
        { t: "p", text: "Let each road come from someone at the table. Read the three short boxes one after another, then let the players argue." },
        { t: "read", text: "Lulu is sitting very still on the rail. \"There's a cold place,\" she says, quietly. \"West of here, a day, maybe. I dreamed it. There was a man at a gate, and he didn't stop us. I don't know who 'us' is.\"" },
        { t: "read", text: "Something tugs at the back of Or'Henn's mind, like a fishhook on a line: the geas he laid on Feonor. She is out there, and she is coming closer, carrying something heavy. South and east, a long way off, something is counting its losses, and a great many things in cages are singing about it." },
        { t: "read", text: "Veska has not looked at the map. She is looking up the Styx, the way you came.\n\n\"He's up there,\" she says. \"Kreeg. Two days. Counting souls on a dock like a clerk.\" She turns her helmet over in her hands. \"I'm not asking. I'm telling you where I'll be looking.\"" },
        { t: "list", items: [
          "{@b The Crypt of the Hellriders.} About a day west. The shard missing from the Sword, and the road to the Citadel. Bring Lulu.",
          "{@b The Scabrous Menagerie.} Two to three days south and east. The Green Remnant, Or'Henn's three beasts, Kreeg's box, and the woman who paid for the raid. She wants her staff back.",
          "{@b The Stygian Dock.} One to two days back up the Styx. Kreeg himself. Do not bring Lulu unprotected."
        ] },
        { t: "note", title: "They Chose the Crypt", text: "Table ruling: the party is going to the Crypt first. Run the three boxes anyway, so the other roads are on the table for later, then go straight to {@scene the-crypt-door|The Crypt of the Hellriders}." },
        { t: "note", title: "Uldrak Is Away", text: "He gave them the orb as payment for the vial and walked off toward Bel's Forge to buy a weapon that can kill Tiamat. He is not on these roads. He comes back when Tiamat rises, or when the orb is used and the party is losing. {@side uldraks-errand|Uldrak's Errand}." },
        { t: "note", title: "Arkhan's Hunt", text: "Arkhan is coming with every dragon he has. If the dragons were fought at the Grave, he catches up in a day or two, on his own choice of ground. If they were never called, the hunt finds the party on this road: at the Crypt, outside the Cold Line; at the Menagerie, in the Singing Aisle; at the Dock, on Kreeg's wharf. Add Arkhan and the surviving tower dragons to the tracker and run {@scene arkhans-gambit|Arkhan's Gambit}. Or'Henn's Pull rises by 1 the first time he sees each chromatic dragon on this road, and he makes his Pull save at the start of each of his turns while one is in sight." },
        { t: "note", title: "If They Caught a Dragon", text: "A chained dragon in tow makes the Menagerie the obvious road: Urexiel will trade the Green Remnant and the three beasts for it, and forgive the theft of the staff. Every night it is in tow, roll once on the Small Visions table in {@side arc-tiamat|Arc: Or'Henn and Tiamat}. If it is Vermilius, it talks to Or'Henn every night, kindly." },
        { t: "choices", prompt: "Where do they go?", items: [
          { label: "The Crypt of the Hellriders", goto: "the-crypt-door" },
          { label: "The Scabrous Menagerie", goto: "the-singing-aisle" },
          { label: "The Stygian Dock", goto: "the-stygian-dock" },
          { label: "Somewhere further away", side: "far-roads" }
        ] }
      ]
    },

    {
      "id": "the-crypt-door",
      "title": "Crypt of the Hellriders",
      "when": "Only if they take the Crypt road",
      "duration": "60 to 90 minutes",
      "blocks": [
        {
          "t": "p",
          "text": "The Crypt of the Hellriders lies about a day's flight west of Uldrak's Grave. It is a piece of Elturel that fell into Avernus with the city and never rotted. Here the Hellriders who died at Zariel's side were laid to rest, and here her general Olanthius has knelt for a hundred years. The cold inside is not infernal. It is grief that refuses to burn. Devils will not go in. Neither will Zariel."
        },
        {
          "t": "note",
          "title": "Campaign Changes",
          "text": "In this campaign Olanthius keeps the Sword's missing shard (Eventyr's one-shard option), Drenwal's father Halvard is on the Crimson Watch's honour roll, and Drenwal is the key to Olanthius. Tiamat cannot reach Or'Henn inside: his Pull is paused for as long as he is within the Cold Line ({@side tiamats-pull|Tiamat's Pull})."
        },
        {
          "t": "h",
          "text": "Approaching the Crypt"
        },
        {
          "t": "p",
          "text": "When the characters reach the crypt, read:"
        },
        {
          "t": "read",
          "text": "The heat stops at a line you can see.\n\nOne step back, the ground still bleeds red and the air still tastes of iron smoke. One step forward, and it is cold: a clean, church-stone cold that has nothing to do with Hell.\n\nAhead, a doorway of grey granite stands upright and whole, as if the city tore this one building loose and set it down gently. Above it, worn but clear: a rider, a lance, and a rising sun. Before it, in two long rows, dozens of armoured knights kneel in the frost with their heads bowed. None of them move. None of them have moved in a hundred years."
        },
        {
          "t": "img",
          "src": "art/generated/event-crypt-cold-line.webp",
          "caption": "The Cold Line. The dead of the First Charge kneel at the door, still at prayer.",
          "credit": "Generated art (gpt-image-1)."
        },
        {
          "t": "p",
          "text": "The kneeling knights are the remains of Hellriders who died outside the crypt. Their armour serves as their caskets, and their bones stay upright inside it as though in prayer. Each wears the faded regalia of Elturel. They are only dead; disturbing them angers the restless dead in area C2."
        },
        {
          "t": "p",
          "text": "The line marks the edge of the crypt's influence. While inside it:"
        },
        {
          "t": "list",
          "items": [
            "{@b Devils cannot cross.} Imps following the ship stop at the line and hiss.",
            "{@b Asimov goes quiet} inside the Soul Capacitor: the soul-traffic of Avernus cannot reach in here.",
            "{@b Tiamat goes quiet.} No visions, no Pull saves and no Pull gains for Or'Henn. Tell his player. It is the first quiet he has had since the Monument.",
            "{@b Celestials are welcome.} Moonkite's light steadies. Lulu's glow brightens for the first time since Avernus.",
            "{@b Dragons and mortals can cross.} So can Arkhan, who is a man, not a devil. If his hunt catches the party here, the fight is at the door on the cold side, with no devils in it. Run {@scene arkhans-gambit|Arkhan's Gambit}."
          ]
        },
        {
          "t": "map",
          "id": "crypt-of-the-hellriders-40x30",
          "note": "Map 3.3: Crypt of the Hellriders. 1 square = 5 feet. C1 at the top, C5 and C7 to the east, the two C6 rooms behind secret doors (S)."
        },
        {
          "t": "h",
          "text": "Encounters in the Crypt"
        },
        {
          "t": "p",
          "text": "The following descriptions correspond to areas marked on map 3.3. The entire crypt is terribly cold and wreathed in ankle-deep mist. All rooms and passages are 10 feet tall and hewn from solid rock. There is no light inside except what the characters bring, and the green glow from area C5."
        },
        {
          "t": "h",
          "text": "C1. Sealed Gates"
        },
        {
          "t": "p",
          "text": "When the characters descend the stairs into the catacombs, read:"
        },
        {
          "t": "read",
          "text": "A pair of basalt doors block the passage ahead, their surfaces engraved with a relief of a knight locked in combat with a devil. Both wield burning swords.\n\nBeneath the relief, at the height of a rider's eyes, five words are cut into the stone: SAY THE WORD, AND RIDE IN."
        },
        {
          "t": "p",
          "text": "The doors have no handles, locks or bolts. They are magically locked, hardened and enchanted to resist magic: any spell cast to unlock, damage or reshape them automatically fails. Characters can bypass them with {@spell dimension door} or similar magic, or slip through the cracks between them with {@spell gaseous form}. Otherwise the doors open for any one of the following, spoken within 10 feet of them. They grind open slowly, and close again on their own after 1 hour unless held or wedged."
        },
        {
          "t": "list",
          "items": [
            "{@b The pass phrase, \"For Glory.\"} It was the battle cry of the First Charge. A successful {@b DC 15 Intelligence (History or Religion)} check recalls it; Drenwal and Veska have advantage, and Ser Lucan simply knows it. It can also be learned from the Obelisk's prisoner, as the book has it.",
            "{@b Lulu.} If she is with them, she puts her trunk on the stone and whispers \"please.\" The doors open. They remember her. She does not know why. This should be the easiest way in.",
            "{@b A name of the dead,} spoken with grief, of any Hellrider who died in Elturel's service. If Drenwal says his father's name, Halvard, here for any reason (a prayer, a curse, a memory), the doors open.",
            "{@b A bought word.} The merrenoloth ferryman on the Styx sells the pass phrase for one soul coin, if the party met him."
          ]
        },
        {
          "t": "p",
          "text": "{@b Table ruling: they cast knock.} The spell fails, but its bang carries. Go to {@scene knock-at-the-gates|Knock at the Gates}.\n\nIf the characters break in by force or trick, Olanthius knows. Every check with him starts at disadvantage until someone apologises and he believes it."
        },
        {
          "t": "h",
          "text": "Encounter: Knock at the Gates"
        },
        {
          "t": "p",
          "text": "Arkhan's hunt at the foot of the stair, inside the Cold Line. Full scene: {@scene knock-at-the-gates|Knock at the Gates}."
        },
        {
          "t": "encounter",
          "id": "knock-at-the-gates",
          "title": "Knock at the Gates",
          "combatants": [
            {
              "c": "arkhan-the-cruel",
              "n": 1
            },
            {
              "c": "krull",
              "n": 1
            },
            {
              "c": "praxamor",
              "n": 1
            },
            {
              "c": "obatala",
              "n": 1
            },
            {
              "c": "mirelle",
              "n": 1
            }
          ],
          "notes": "Same fight as the Knock at the Gates scene (shared tracker). Flash, Obatala and Vermilius stay outside the Cold Line and only breathe down the stairwell. Krull casts from Obatala at the top of the stair. Olanthius opens the gates at the end of round 3."
        },
        {
          "t": "h",
          "text": "C2. Funerary Chambers"
        },
        {
          "t": "p",
          "text": "There are several funerary chambers in the catacombs. When the characters enter one of these rooms for the first time, read:"
        },
        {
          "t": "read",
          "text": "Mist curls around your ankles. The walls of this chamber are carved from floor to ceiling with names, thousands of them, cut small and close together like lines in a ledger. Stone urns stand in niches along the walls, their lids sealed with wax gone black with age.\n\nCold candles stand in rows below the names. They will not light. The floor in front of the walls is worn into two smooth grooves, where people knelt."
        },
        {
          "t": "img",
          "src": "art/generated/event-crypt-nave-of-names.webp",
          "caption": "A funerary chamber. At the far end, beyond the arch, something green is glowing.",
          "credit": "Generated art (gpt-image-1)."
        },
        {
          "t": "p",
          "text": "The names are the riders of the First Charge, and every Hellrider since who died in Elturel's service. The urns hold their ashes. Combing the walls for any one name takes a minute and a successful {@b DC 12 Intelligence (Investigation)} check. Lulu goes quiet in these rooms, and at every junction she turns toward area C5 before anyone else does. She knows the way, and does not know how."
        },
        {
          "t": "h",
          "text": "The Crimson Watch (Central Chamber)"
        },
        {
          "t": "p",
          "text": "One alcove in the large central chamber is set apart from the rest. When a character looks into it, read:"
        },
        {
          "t": "read",
          "text": "The stone rider on the tomb inside is unfinished: the sculptor stopped at the shoulders, as if he could not bring himself to carve the face. The red paint on the shield has flaked to the colour of dried blood. Above it, the honour roll of the Crimson Watch runs up the wall, and the newest names at the bottom are the freshest cuts in the whole crypt.\n\nNear the bottom, one name: HALVARD, FELL AT THE WALL.\n\nAnd under it, scratched in by a different, shakier hand:\n\n\"I carved what the dead told me. O.\""
        },
        {
          "t": "p",
          "text": "This is the Crimson Watch, the order Drenwal's father served. Drenwal finds his father's name with no roll. Veska knows the line is a lie: the Bhaal cult inside the Watch murdered Halvard. Let Drenwal have the moment, and give Veska or Ser Lucan a line. Ser Lucan finds his own name here too, among the dead, though he is standing in front of it.",
        },
        {
          "t": "note",
          "title": "DM Only: Who Carves the Names",
          "text": "Olanthius does. The dead of Elturel pass through Avernus, and the Hellriders among them stop at the Cold Line to give him their names and how they fell. He carves each one himself. Halvard's spirit, or someone wearing his name, told him \"the wall.\" That was the cult's story. Olanthius has carved a lie into the one honest wall in Hell, and does not know it. When Drenwal tells him the truth, that is the master key in area C5."
        },
        {
          "t": "h",
          "text": "Encounter: The Restless Dead"
        },
        {
          "t": "p",
          "text": "The Hellriders who stayed in Hell when the others fled do not all rest. If anyone breaks an urn, takes anything from a tomb without Olanthius's leave, or disturbs the kneeling knights outside, three {@c wraith|wraiths} and eight {@c specter|specters} rise from the walls of the nearest funerary chamber and attack, and the {@c ghost|ghost} turns hostile. A {@c ghost|ghost} of the First Charge also haunts these rooms. It does not attack unless attacked; it will answer one question about the Charge, then fade, asking only that someone say its name aloud."
        },
        {
          "t": "encounter",
          "id": "crypt-restless-dead",
          "title": "The Restless Dead",
          "combatants": [
          {
            "c": "wraith",
            "n": 3
          },
          {
            "c": "specter",
            "n": 8
          },
          {
            "c": "ghost",
            "n": 1
          }
        ],
          "notes": "Only if the dead are disturbed. Upscaled for three level-13 characters plus allies: the wraiths are Hellrider Wraiths (see their stat block: 112 HP, two Life Drains, Create Specter). Wraiths turn anyone they kill into a specter. Olanthius ends it from C5 after 3 rounds, or when the thief puts back what was taken: \"Enough.\""
        },
        {
          "t": "h",
          "text": "C3. Prayer Niches"
        },
        {
          "t": "p",
          "text": "{@b No encounter.}"
        },
        {
          "t": "p",
          "text": "Narrow niches open off the passages here, each just large enough for one person to kneel."
        },
        {
          "t": "read",
          "text": "A shallow niche holds a single cold candle on a stone shelf, and a worn kneeling-step polished smooth by a great many knees. On the wall above, someone has scratched a tally of days that goes on far longer than anyone should have to count."
        },
        {
          "t": "p",
          "text": "A successful {@b DC 13 Intelligence (Religion)} check reveals that the cold candles throughout the crypt are a vigil: they light only when someone inside the crypt is forgiven. The tallies are Olanthius's. He counts the days since the Charge."
        },
        {
          "t": "h",
          "text": "C4. Mist Well"
        },
        {
          "t": "p",
          "text": "{@b No encounter.} The well itself is the hazard (DC 14 Wisdom, below)."
        },
        {
          "t": "read",
          "text": "A round stone well sits in the corner of this chamber, its rim carved with riders. The mist that fills the crypt rises from it, slow and cold, and spills over the rim onto the floor."
        },
        {
          "t": "p",
          "text": "The well is the source of the crypt's cold. A character who looks into it sees, for one heartbeat, the First Charge riding out of Elturel under a clear sky: a {@b DC 14 Wisdom} saving throw, or they are overcome by grief and have disadvantage on their next ability check. Celestials looking in see something else: Lulu sees Yael's face and has to be led away. The well holds no treasure."
        },
        {
          "t": "h",
          "text": "C5. The Kneeling Knight"
        },
        {
          "t": "p",
          "text": "Olanthius kneels in the long hall to the east, among the tombs of Zariel's generals. Go to {@scene the-kneeling-knight|C5. The Kneeling Knight}."
        },
        {
          "t": "h",
          "text": "Encounter: The Half-Heart Duel"
        },
        {
          "t": "p",
          "text": "Only if no one has read his journal, if the talk fails, or if they ask to prove themselves. He is CR 20."
        },
        {
          "t": "encounter",
          "id": "half-heart-duel",
          "title": "The Half-Heart Duel",
          "combatants": [
            {
              "c": "olanthius",
              "n": 1
            }
          ],
          "notes": "A test, not a murder. He pulls killing blows and never strikes a downed character. Hellfire Orb only as a warning shot, aimed at empty stone. If they accept a yield and sheathe when he sheathes, he ends it himself and talks as if they had read the journal."
        },
        {
          "t": "h",
          "text": "C6. Hidden Tombs"
        },
        {
          "t": "p",
          "text": "Two small chambers lie behind secret doors (marked S on the map). A character who searches the walls near one finds its door with a successful {@b DC 15 Wisdom (Perception)} check."
        },
        {
          "t": "h",
          "text": "Western Tomb: The Last Arms"
        },
        {
          "t": "read",
          "text": "Behind the secret door is a small, square room, its floor misted white. On a stone bier lie a lance and a shield, laid side by side as if their owner set them down and meant to come back."
        },
        {
          "t": "p",
          "text": "{@b Treasure.} A {@item +1 lance|DMG} and a {@b Hellrider's Aegis}, a shield that gives advantage on saving throws against being frightened while in Avernus. Taking either without Olanthius's leave is a grave insult: it wakes the restless dead (area C2), and Olanthius will not give the party advantage on anything. Asked properly, he gives them both, to a Hellrider."
        },
        {
          "t": "h",
          "text": "Eastern Tomb: The Ones Who Ran (Encounter)"
        },
        {
          "t": "read",
          "text": "This room is sealed with wax and iron, and the mist inside is grey instead of white. Eight figures lie wrapped in grave-cloth on shelves cut into the walls. Their shields have been turned face-down."
        },
        {
          "t": "p",
          "text": "These are Hellriders who broke and fled at the Charge, and were brought back here in shame. They were never forgiven, and they have not forgotten. Opening the tomb wakes eight {@c mummy|mummies} led by {@b Captain Aldous Varn}, the officer who gave the order to run ({@c mummy-captain|mummy captain}). If Olanthius is present, they kneel to him instead of attacking, and he says, \"Not even them. Not yet.\""
        },
        {
          "t": "encounter",
          "id": "crypt-ones-who-ran",
          "title": "The Ones Who Ran",
          "combatants": [
          {
            "c": "mummy",
            "n": 8
          },
          {
            "c": "mummy-captain",
            "n": 1
          }
        ],
          "notes": "Optional. Upscaled: the mummies are the book's, with 97 HP each; the captain is a mummy lord chassis. Mummy rot is the real threat: the cursed can't regain hit points until remove curse. Fire is their weakness."
        },
        {
          "t": "h",
          "text": "C7. Olanthius's Quarters"
        },
        {
          "t": "p",
          "text": "{@b No encounter.}"
        },
        {
          "t": "p",
          "text": "A secret door at the north end of area C5 leads to this room. Olanthius does not hide it from anyone who asks."
        },
        {
          "t": "read",
          "text": "A narrow study, as plain as a soldier's tent. A stone desk, a stool, a shelf of books gone soft with damp. On the desk lies a single journal bound in cracked red leather, open, a pen laid across it as if its writer has only stepped away."
        },
        {
          "t": "p",
          "text": "This is {@b Olanthius's journal}, and it is the key to the whole crypt: as in the book, he will not parley with anyone who has not read it. It is his account of the Hellriders' charge into Avernus, Zariel's fall, his own death and unwilling return, and a hundred years of shame. Reading it takes about ten minutes. A character who reads it understands that he hates Zariel, mourns Yael, and wants Zariel distracted so the Sword can be reached.\n\n{@b Treasure.} On the shelf, a map of Avernus marked in Olanthius's hand with the road to the Bleeding Citadel. He gives it freely to a party he trusts."
        }
      ]
    },

    {
      "id": "knock-at-the-gates",
      "title": "Knock at the Gates",
      "when": "Table ruling: they cast knock on the C1 gates",
      "duration": "45 to 75 minutes",
      "blocks": [
        {
          "t": "p",
          "text": "The characters cast {@spell knock} on the Sealed Gates. The gates are enchanted to resist magic, so the spell fails, but {@spell knock} makes a loud knock audible out to 300 feet, and in the still cold of the Cold Line it carries much farther. Arkhan's hunt has been quartering the waste for them. They hear it."
        },
        {
          "t": "note",
          "title": "Who Is Here",
          "text": "The Lady Vengeance has flown off to hide, with Colico Jack and Jeremy aboard. Feonor is not with them: she is still on her way with the staff. At the gates are Drenwal, Aurora (with Moonkite), Or'Henn, Veska, Ser Lucan and Lulu. There are no cannons in this fight."
        },
        {
          "t": "p",
          "text": "When the echo of the knock dies away, read:"
        },
        {
          "t": "read",
          "text": "The knock booms down the stair and comes back up again, and up, and out, rolling across the waste like a bell.\n\nThe basalt doors do not move.\n\nFor a long moment there is nothing. Then, far above you, past the granite doorway, the red sky goes dark with wings. Something very large lands on the frost outside, and the kneeling knights in their rows shiver in their armour.\n\nA voice comes down the stairwell, calm and polite, and it echoes off the cold stone.\n\n\"Gardener. You have something of my queen's. Come up, and we will speak like civilised people.\""
        },
        {
          "t": "h",
          "text": "The Situation"
        },
        {
          "t": "list",
          "items": [
            "{@b The party is trapped.} The gates behind them are sealed. The only way out is the stair, 40 feet long and 10 feet wide, up to the granite doorway and the Cold Line.",
            "{@b The dragons cannot come in.} The crypt's passages are 10 feet tall; a Huge dragon cannot fit down the stair. They can only breathe down it. A cone aimed down the stairwell catches everyone on the stair and the first 20 feet in front of the gates.",
            "{@b Devils cannot cross the Cold Line.} Arkhan's abishai stop at the frost and hiss.",
            "{@b Arkhan and Krull can.} Arkhan is a man, not a devil, and Krull is a tortle. Arkhan walks down the stair himself. Krull stays at the top, on Obatala, healing and casting.",
            "{@b Tiamat is silent here.} Or'Henn is inside the Cold Line, so he makes no Pull saves, and {@b Arkhan cannot draw the curse out of him.} To run the Offering ({@scene arkhans-gambit|Arkhan's Gambit}), Arkhan must first drag Or'Henn up the stair and out past the granite doorway."
          ]
        },
        {
          "t": "h",
          "text": "What Arkhan Does"
        },
        {
          "t": "steps",
          "items": [
            "{@b Round 1.} He comes halfway down the stair and asks, once, politely, for Or'Henn to walk up with him. If they refuse, Flash breathes fire down the stairwell (DC 21 Dexterity, the full cone) and Arkhan attacks whoever is closest to Or'Henn.",
            "{@b Rounds 2 and on.} Vecna's Grip on Or'Henn (DC 22 Constitution or restrained and silenced), then he tries to haul him: a grapple (Arkhan +15 Athletics; Or'Henn may use Athletics or Acrobatics), dragging him 20 feet a turn up the stair. Command the Line sends Krull's spells at anyone trying to break the grapple.",
            "{@b If Or'Henn is hauled past the doorway,} the Pull resumes at once and Arkhan begins the Offering on his next turn ({@scene arkhans-gambit|Arkhan's Gambit}). Vermilius is waiting outside to be the vessel.",
            "{@b If he is losing,} Arkhan still teleports out at about 230 hit points, unless Tiamat is watching. Here she is not."
          ]
        },
        {
          "t": "h",
          "text": "The Gates Open"
        },
        {
          "t": "p",
          "text": "At the end of round 3, or as soon as someone says the pass phrase \"For Glory\", or Lulu touches the doors and whispers \"please\", the gates grind open behind the party. Read:"
        },
        {
          "t": "read",
          "text": "Behind you, stone grinds on stone. The basalt doors are opening, slowly, and cold green light spills out across your shadows.\n\nIn the gap stands a knight in blackened plate, a long sword in his hand, green fire burning behind his visor.\n\n\"Someone knocked,\" he says. He looks past you, up the stair, at Arkhan. \"And you have brought Tiamat's dog onto holy ground.\"\n\nHe steps through the doors, and the mist parts around his boots.\n\n\"Inside. All of you. Now.\""
        },
        {
          "t": "p",
          "text": "{@c olanthius|Olanthius} has no love for Tiamat's champion. He holds the doorway: anyone who retreats behind him is safe from Arkhan for as long as he stands there. He casts {@b Hellfire Orb} at the top of the stair once, at Krull and the dragons. If the party fights beside him rather than hiding behind him, they start his scene ({@scene the-kneeling-knight|C5. The Kneeling Knight}) with {@b advantage on the first check}, and the trespass of the knock is forgotten."
        },
        {
          "t": "p",
          "text": "Arkhan does not fight a death knight on his own holy ground for a gardener. He withdraws up the stair: \"I can wait. You cannot.\" The dragons settle outside the Cold Line. The crypt is now under siege, and the ship is somewhere out in the waste."
        },
        {
          "t": "encounter",
          "id": "knock-at-the-gates",
          "title": "Knock at the Gates",
          "combatants": [
            {
              "c": "arkhan-the-cruel",
              "n": 1
            },
            {
              "c": "krull",
              "n": 1
            },
            {
              "c": "praxamor",
              "n": 1
            },
            {
              "c": "obatala",
              "n": 1
            },
            {
              "c": "mirelle",
              "n": 1
            }
          ],
          "notes": "Flash, Obatala and Vermilius stay outside the Cold Line: they act only to breathe down the stairwell (one breath per round between them) or to take the vessel role in Arkhan's Gambit. Krull casts from Obatala's back at the top of the stair. Allies: Veska, Ser Lucan, Lulu, Moonkite; add Olanthius at the end of round 3. No ship, no cannons."
        },
        {
          "t": "h",
          "text": "Aftermath: The Siege"
        },
        {
          "t": "list",
          "items": [
            "Inside, the party explores the crypt (areas C2 to C7) while Arkhan waits outside. Every hour, roll a d6: on a 1, a dragon breathes down the stair to remind them he is there.",
            "Olanthius's road to the Citadel and his map in area C7 now matter for a new reason: there may be another way out. Decide whether the crypt has one (the Mist Well in area C4 is the obvious candidate).",
            "The Lady Vengeance can come back for them. Jack will need a signal, and the dragons will see it too."
          ]
        },
        {
          "t": "choices",
          "prompt": "How does it go?",
          "items": [
            {
              "label": "The gates open: inside with Olanthius",
              "goto": "the-kneeling-knight"
            },
            {
              "label": "Arkhan drags Or'Henn out",
              "goto": "arkhans-gambit"
            },
            {
              "label": "Tiamat's Pull rules",
              "side": "tiamats-pull"
            }
          ]
        }
      ]
    },

    {
      "id": "feonor-brings-the-staff",
      "title": "Feonor Brings the Staff",
      "when": "During the Crypt siege (after Knock at the Gates), or whenever you want it",
      "duration": "15 to 20 minutes",
      "blocks": [
        {
          "t": "p",
          "text": "Feonor stole Cinderbloom from the Trophy Vault of the Scabrous Menagerie, as Or'Henn's {@spell geas} commanded, and the geas has pulled her to him ever since. She has followed it across the waste to the Crypt. Arkhan's dragons are circling outside. She slips past them under {@spell greater invisibility}, with {@spell fly}, and down the stair."
        },
        {
          "t": "note",
          "title": "Running This Scene",
          "text": "Run it once the gates are open and the party is inside, during a lull in the siege, or while Arkhan is still on the stair if you want her to arrive mid-fight (she counterspells the Hand of Vecna first, and hands over the staff after). It gives Or'Henn his staff before the Crypt's hardest choices."
        },
        {
          "t": "p",
          "text": "When she arrives, read:"
        },
        {
          "t": "read",
          "text": "The mist at your feet stirs, though there is no wind.\n\nThen the air beside you shimmers like heat over a forge, and a woman stumbles out of nothing onto the cold stone floor.\n\nFeonor. Her robes are scorched to the knee. One sleeve is gone, and the arm under it is wrapped in something that is still smoking. A mended parasol hangs from her belt. She is holding a long bundle of red velvet against her chest the way you would hold a child.\n\nShe looks back once, up toward the stair and the dragons beyond it. Then she walks to Or'Henn, and holds the bundle out.\n\n\"Take it,\" she says. \"Take it, and let me go.\""
        },
        {
          "t": "p",
          "text": "When Or'Henn takes it, read:"
        },
        {
          "t": "read",
          "text": "The velvet falls away. Under it is a staff of grey ashwood, carved with leaves, and a little brass plate screwed into the heel: PROPERTY OF THE SCABROUS MENAGERIE. At its head, inside a cage of blackened branches, sits a dark ember the size of a heart.\n\nAs Or'Henn's fingers close on it, the ember flickers. Once. Twice.\n\nThen it catches, and burns, low and red and steady, and the ash in the cage of branches is warm as sun-baked stone. Somewhere in the crypt, very faintly, a cold candle gutters."
        },
        {
          "t": "h",
          "text": "Cinderbloom"
        },
        {
          "t": "list",
          "items": [
            "{@b It knows his hand.} The ember relights at his touch with {@dice 1d6} charges, and refills normally (1d6 + 4) on his next long rest. He attunes as a bonus action.",
            "{@b Inside the Cold Line} it works normally. Its curse benefit (expend 1 charge: Pull -1, or reroll a Pull save) matters the moment he steps back outside.",
            "{@b The full card,} with the Rekindled upgrade: {@side cinderbloom|Cinderbloom}. Give the player the card ({@b orhenn-cinderbloom-and-contracts.html} prints it)."
          ]
        },
        {
          "t": "h",
          "text": "What Happened"
        },
        {
          "t": "list",
          "items": [
            "{@b She stole it.} Urexiel would not sell it. Feonor broke into the Trophy Vault, took the staff and nothing else, and teleported out with a mezzoloth's trident through her arm.",
            "{@b The geas is fulfilled.} The moment Or'Henn takes the staff, the spell ends. She is free, and she knows it. She is also very, very angry.",
            "{@b Urexiel knows.} The brass plate is a tracking sigil. Urexiel's hunters will follow the staff until the plate is destroyed (an action and a DC 15 Strength check, or dispel magic, DC 15). The rest of the vault (the ledger, the Green Remnant, Kreeg's puzzle box) is still in the Menagerie, so that road still matters.",
            "{@b She saw the ship.} On her way in she passed the Lady Vengeance, hidden in a gully an hour west. Jack told her to say: one green flare, and he comes, dragons or no dragons."
          ]
        },
        {
          "t": "h",
          "text": "Feonor's Terms"
        },
        {
          "t": "read",
          "text": "\"I have done what you made me do,\" Feonor says. \"I will not do it twice. Ask me nicely, druid, and I will burn one thing for you before I go. One.\""
        },
        {
          "t": "p",
          "text": "If Or'Henn asks nicely, she stays for one fight and counterspells Arkhan's Hand of Vecna once. If he threatens her, or tries to lay a new geas, she leaves the way she came and becomes an enemy for the rest of the campaign. If someone offers her passage home on the Lady Vengeance, she says yes, and means it. Either way, she leaves the moment Tiamat rises."
        },
        {
          "t": "p",
          "text": "{@b If Olanthius is present,} he watches her for a long moment, then says: \"Another one who came in without knocking properly.\" He lets her stay in area C2. She will not go deeper. \"I have had enough of graves.\""
        },
        {
          "t": "choices",
          "prompt": "What next?",
          "items": [
            {
              "label": "The staff's full card",
              "side": "cinderbloom"
            },
            {
              "label": "Back to the Kneeling Knight",
              "goto": "the-kneeling-knight"
            },
            {
              "label": "Arkhan comes back down the stair",
              "goto": "arkhans-gambit"
            },
            {
              "label": "Tiamat's Pull",
              "side": "tiamats-pull"
            }
          ]
        }
      ]
    },

    {
      id: "the-kneeling-knight",
      title: "C5. The Kneeling Knight",
      when: "Only if they enter the Crypt",
      duration: "45 to 60 minutes",
      blocks: [
        { t: "p", text: "This long hall holds the tombs of Zariel's generals, four sealed sarcophagi carved with riders, and one more, open and empty, at the heart of the room. Cold green light fills it. When the characters enter, read:" },
        { t: "read", text: "At the heart of the Crypt, a knight kneels in front of an open stone coffin. There is no name on it. His armour is Hellrider steel gone black, and a cold green fire lives behind his visor.\n\nHe does not turn around.\n\n\"You've come a long way to look at a grave with no one in it,\" he says. His voice comes up out of the green light like something pulled from a deep well. \"That's fitting. I've knelt here a hundred years and found the same.\"\n\nHis gauntlets tighten on the edge of the stone.\n\n\"If you've come to be forgiven for something, you're in the wrong crypt. There's no forgiveness on these walls. Only names. Say your business, or leave me mine.\"" },
        { t: "img", src: "art/generated/event-crypt-kneeling-knight.webp", caption: "Olanthius, at a grave with no one in it.", credit: "Generated art (gpt-image-1)." },
        { t: "p", text: "{@c olanthius|Olanthius} was one of Zariel's generals, with Haruman and Yael. When Zariel fell, he would not serve her tyranny; she raised him as a death knight to bind him to her, and he despises her still. He knows where Yael hid the Sword of Zariel: the Bleeding Citadel. The coffin is his own. He carved it and could not lie down in it, so he keeps the Sword's missing shard in it instead." },

        { t: "h", text: "How He Opens Up" },
        { t: "list", items: [
          "{@b His journal (the book's key).} As in the book, Olanthius will not parley with anyone who has not read his journal, which lies on the desk in area C7. If no one has, he rises and fights: run the Half-Heart Duel. If someone has, he talks.",
          "{@b Drenwal's truth about his father (campaign bonus).} On top of the journal. If Drenwal tells him that Halvard did not fall at the wall, that the Bhaal cult inside the Crimson Watch murdered him, the party has advantage on every social check with Olanthius, he speaks plainly, and he gives the shard without a check. Run Event: His Name.",
          "{@b A Hellrider's oath, or the Crimson Watch's name,} from Veska, Ser Lucan or Drenwal: advantage on the first check only.",
          "{@b Journal read, but no other key:} one {@b DC 18 Charisma (Persuasion)} check with a real appeal to duty or honour, to win the shard. Grief-baiting fails and hardens him. He gives the road to the Citadel either way, coldly, once they have freed Kostchtchie.",
          "{@b If they fail, or ask to prove themselves,} he offers a trial: the Vigil or the Half-Heart Duel (below).",
          "{@b If they broke the door,} everything starts at disadvantage until someone apologises and he believes it."
        ] },

        { t: "h", text: "Event: His Name" },
        { t: "p", text: "Run this when Drenwal names his father, or asks about the Crimson Watch's roll." },
        { t: "read", text: "At the name, the green fire in the visor gutters.\n\n\"Halvard,\" he says. \"I carved that name. The dead came to the line and told me how he fell, and I cut it into the stone with my own hand. Fell at the wall.\" The great black helm turns toward Drenwal. \"You have his jaw.\"" },
        { t: "p", text: "Now Drenwal can tell him the truth: Halvard did not fall at the wall. The Bhaal cult hollowing out the Crimson Watch murdered him, and the story of the wall was theirs. Let the player say it." },
        { t: "read", text: "He is very still for a long time.\n\n\"Then I have carved a lie,\" he says at last, \"into the only honest wall in Hell.\"\n\nThe green fire steadies. It is a different colour now, closer to blue.\n\n\"Who?\"" },
        { t: "p", text: "If Drenwal names the cult, or Dumal, Olanthius repeats the name once, to remember it. \"Find them. Then come back and tell me, and I will carve the truth.\" From here on he answers anything, plainly, and the shard is Drenwal's for the asking. If Drenwal comes back with the truth later, the cold candles in the Crimson Watch alcove light." },

        { t: "h", text: "Event: Lulu Remembers" },
        { t: "p", text: "This fires the first time Olanthius names Yael while Lulu is present, key or no key. It is the strongest reason to bring her. Do not miss it." },
        { t: "read", text: "The little hollyphant goes very still. Her trunk lowers. And when she speaks, it is not her usual bright voice. It is something old, and cracked open.\n\n\"You. You were there. You rode at her right hand, and Haruman at her left, and Yael said you were the best of them. When she fell, Yael said your name. She said, 'He will not follow her. He has too much heart for that,' and she was crying when she said it.\"\n\nLulu is shaking.\n\n\"I remember the weight of it. The Sword. It was so heavy, and Yael's hands were burning, and I said I'd carry the memory so she wouldn't have to. And I did. We hid it where she would never find it. I took all of it, and I made myself forget, so no one could ever pull the road out of me.\"" },
        { t: "p", text: "This is Lulu's fourth memory: the flight from Hell, and the raising of the Citadel. From now on she knows the shape of the road to the Bleeding Citadel. Mark it." },

        { t: "h", text: "Event: The Shard" },
        { t: "p", text: "When they ask about the Sword, he stands for the first time in a hundred years, and lifts a folded cloak out of the coffin." },
        { t: "read", text: "Inside the cloak is a sliver of bright metal as long as a hand: sharp along one edge, broken jagged along the other. It glows faintly, like a coal that will not go out. If Lulu is near, it hums.\n\n\"It broke off in her last battle, the day she fell,\" he says. \"I picked it up off the field. The rest of the blade went with Yael and the little one. This stayed with me. I have kept it. That is all I have done with my life since: kept it.\"\n\nHe does not hold it out.\n\n\"The Sword is waiting, missing this. Yael gave her life to hide it from Zariel. You want to make it whole again. Tell me why her death should be wasted.\"" },
        { t: "p", text: "He does not hand it over easily. They have to answer him. Any of these can win it with a {@b DC 15 Charisma (Persuasion)} check, or with no check if they argue it well:" },
        { t: "list", items: [
          "{@b Elturel.} A whole city, sinking. The Sword and the contract together are the only clean way to free it.",
          "{@b An oath.} A Hellrider swears to carry it. Veska can. Drenwal can.",
          "{@b Lulu.} If her memory has fired and she says Yael would want it, he gives it to her with no check at all."
        ] },
        { t: "p", text: "His condition, whatever they say: \"When it is whole, a Hellrider carries it. Not a devil. Not a god. Not a dragon.\" If Or'Henn has any gold scales, Olanthius looks at them and adds: \"Keep that one away from it. Something is looking out of his eye.\"" },
        { t: "note", title: "How the Sword Broke", text: "Nobody broke it on purpose. It cracked in Zariel's last battle, as she fell, and this sliver came away. Yael and Lulu carried the rest to the Bleeding Citadel, where it waits on its dais with a notch in the blade. This is the book's Chapter 4 with Eventyr Games' one-shard option.\n\nThe shard has a small spark of its own and wants to go home. A {@b DC 15 Intelligence (Arcana)} check feels it pulling toward the Citadel. In the Citadel it carries the party into the vision trial, and when the trial ends it flies up and rejoins the blade in a burst of light." },

        { t: "h", text: "Event: The Star That Fell" },
        { t: "p", text: "He gives this freely to a keyed party, or on a {@b DC 16 Wisdom (Insight)} check if he has warmed at all." },
        { t: "read", text: "\"There is one more thing, and I don't have a name for it. Near the end, after Zariel fell, a star came down. Not a devil's fire. A small light, gentle. The kind of thing that stops to help a dying man it has no reason to help.\n\nZariel hated it. I never saw her hate anything the way she hated that little falling mercy. She bleeds it still. Where her blood falls, they say, the mercy grows back. I don't know what it is. I know she would unmake the world to be rid of it.\"" },
        { t: "p", text: "Moonkite's light flickers, and it turns its head away. It will not say why. This is the party's first hard sign that the Caged Star is real. Do not give it a name yet." },

        { t: "h", text: "Event: Yael" },
        { t: "p", text: "Olanthius mourns Yael's final passing. If the party tells him her ghost guards the Sword, or later returns from the Bleeding Citadel, he kneels for a long time. He swears fealty to any character attuned to the Sword of Zariel, and from then on he can join them against Zariel." },

        { t: "h", text: "Event: How the Watch Ended" },
        { t: "p", text: "If Drenwal asks about the Crimson Watch, Olanthius tells him plainly: after the Charge, the Watch was hollowed out from inside by a cult of Bhaal. Good riders died for an order that was already rotten. He says it as a fact, not an accusation. Drenwal may take it either way." },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...choose the Vigil,} they keep watch at the coffin through one Avernus night (a long rest) without leaving and without drawing steel. At the end, each makes a {@b DC 14 Wisdom saving throw}. If at least two succeed, he trusts them as if they had the key. The cold candles light, one by one." },
        { t: "p", text: "{@b ...choose the Half-Heart Duel,} he rises and fights at half heart, to see whether they fight with honour. Run the encounter below." },
        { t: "p", text: "{@b ...attack him outright,} he fights to the end. If he is destroyed, everything he knows dies with him: the road, the reason, and the star. The shard still lies in the coffin. His sword is a {@b +2 longsword} that sheds cold blue light." },
        { t: "p", text: "{@b ...just take the shard,} he does not stop them. He only says, \"Then you are what I was,\" and kneels again. They lose his road and his warmth, and Lulu will not look at them for a day." },
        { t: "encounter", id: "half-heart-duel", title: "The Half-Heart Duel", combatants: [
          { c: "olanthius", n: 1 }
        ], notes: "A test, not a murder. He pulls killing blows and never strikes a downed character. Hellfire Orb only as a warning shot, aimed at empty stone. If they accept a yield and sheathe when he sheathes, he ends it himself and talks as if they had the key." },

        { t: "h", text: "Event: Before They Leave" },
        { t: "p", text: "Whether keyed or won, he gives them the last task the book gives him: free Kostchtchie, the demon lord frozen at the Maw, so Zariel looks the other way while they go for the Citadel. \"You don't befriend the thing in the Maw. You point it.\" If Drenwal told him the truth about Halvard, he asks one thing: \"Bring me their names. All of them. I have a wall to correct.\"" },
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
        { t: "note", title: "Count the Days First", text: "Table ruling (Session 10): Feonor already stole the staff and brought it to the party; her geas is fulfilled. Skip Event: Feonor at the Edge and Event: Feonor's Cage. If she came along, she waits on the ship: she has been in this building once and will not go back in." },

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
        { t: "map", src: "art/outlines/menagerie-outline.svg", title: "The Scabrous Menagerie (outline)", note: "DM overview of all four wings, the handlers' round, the Feeding Chutes and Feonor's rock." },
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
        { t: "note", title: "Table Ruling: The Staff Is Gone", text: "Feonor stole Cinderbloom and gave it to Or'Henn in the Crypt. Every bargain below that names the staff is now about the Green Remnant, the three beasts, the ledger, or Urexiel's forgiveness for the theft. Her first demand: the staff back, or its price, one soul coin for every day it has been missing. She knows exactly who has it: the brass plate told her." },
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
        { t: "map", src: "art/outlines/vault-outline.svg", title: "Trophy Vault and Killing Floor (outline)", note: "Battle outline, 1 square = 5 ft. Urexiel starts at her desk; she falls back down the corridor to the Killing Floor." },

        { t: "h", text: "Event: The Staff in His Hand" },
        { t: "note", title: "Already Happened", text: "Or'Henn took the staff from Feonor in the Crypt ({@scene feonor-brings-the-staff|Feonor Brings the Staff}). Skip the box below unless the players want to replay the moment. Full card: {@side cinderbloom|Cinderbloom}." },
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
        { t: "map", src: "art/outlines/dock-outline.svg", title: "The Stygian Dock (outline)", note: "Battle outline, 1 square = 5 ft: the tollhouse, the wharf, three barges and the guard posts." },
        { t: "map", id: "harbor-map-night-25x25", note: "Painted option for the wharf and the tollhouse. The water is the Styx: anything that falls in is targeted by feeblemind." },
        { t: "map", id: "low-lantern-40x22", note: "Painted option for the soul barges moored along the wharf." }
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
          "{@b Eldra.} His service records list her: \"Acquired, Material Plane. Druid. Kept for the garden.\" He bought her. He says it the way he would say he bought a chair."
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
        { t: "p", text: "{@b ...try to take him alive,} it is the best result for Elturel and the hardest. He can fly, he can dominate, and his Escape Clause pulls him out at 0 hit points. They need {@item dimensional shackles|DMG} or his true name to stop it. On the Lady Vengeance he is a prisoner who talks to everyone at night." },
        { t: "p", text: "{@b ...leave with nothing agreed,} he lets them go. At the door he uses Forgetfulness on the one who heard the most. \"Nothing personal. I just prefer to be a rumour.\"" },
        { t: "p", text: "{@b ...attack him,} run the fight below. Remember: killed here, he is destroyed for good, and the copy can never be signed away." },
        { t: "encounter", id: "dock-fight", title: "The Dock Fight", combatants: [
          { c: "kreeg", n: 1 },
          { c: "barbed-devil", n: 3 }
        ], lair: "kreeg", notes: "A deadly fight: CR 22 with legendary and lair actions, plus three guards. Kreeg stays back and talks while he fights. Forgetfulness on Lulu or her carrier. Dominate monster on the strongest fighter. Strike from the Record on the healer. The devils shove people toward the water. Below 100 hit points he offers his signature for his life. At 0 he uses the Escape Clause unless they have his true name or shackles on him. His ledger of taken memories is on the desk: grabbing it is an action." },
        { t: "map", id: "under-the-villa-65x40", note: "The ledger room under the tollhouse, where the Escape Clause takes him. This is the Vanthampur cellar where Kreeg hid in the book, reused." },
        { t: "choices", prompt: "When they leave the Dock:", items: [
          { label: "Take another road", goto: "where-we-left-off" },
          { label: "End the session", goto: "ending" }
        ] }
      ]
    },

    Object.assign({}, window.CAMPAIGN.scenes["arkhans-gambit"], { when: "If Arkhan's hunt catches them on this road" }),
    Object.assign({}, window.CAMPAIGN.scenes["tiamat-reborn"], { when: "If Arkhan finishes the Offering" }),

    {
      id: "ending",
      title: "Ending the Session",
      when: "",
      duration: "10 minutes",
      blocks: [
        { t: "p", text: "End when the road they chose is finished, or at a cliffhanger inside it. Read the outcomes that happened." },

        { t: "h", text: "Outcome: They Won the Shard" },
        { t: "read", text: "The shard is wrapped in a Hellrider's cloak in the hold, and nobody can sleep near it. It glows all night, and it hums whenever Lulu walks past." },
        { t: "p", text: "The Sword's missing shard is theirs. In the Citadel it opens the vision trial and then rejoins the blade. The Fallen Three road: 2 of 3 (Haruman and Olanthius). Lulu has her fourth memory. Olanthius may ride again at the very end, if they come back for him." },

        { t: "h", text: "Outcome: Olanthius Was Destroyed" },
        { t: "p", text: "They have the shard, but his road, his reason and his star are gone. The way to the Citadel now leans on Bel and on Lulu's memories alone. The cold candles in the Nave never light." },

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

        { t: "note", title: "Remember for Next Time", text: "Write down: Or'Henn's Pull and gold scales. Contract 1 breach marks. Whether they hold the shard. Green Remnants held. Who has Kreeg's box. Whether Kreeg is alive, and where. Which of Lulu's memories she has. Whether Uldrak has come back, and what he owes Bel." }
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
        { t: "p", text: "{@b Four to five days north. Omen:} the Styx runs faster and louder, toward a sound like something breathing at the bottom of a well." },
        { t: "read", text: "The river bends, and in the middle of the bend the water goes down. Not over a fall. Down: a round hole in the Styx itself, with the black water pouring into it from every side and never filling it.\n\nFrom far below, something very large is laughing." },
        { t: "p", text: "The pit fiend Shummrath is jailed under the river by Bel. Damming the Styx with shattersticks from the Firesnake Forge at the Emporium, then waiting a day, drains the pit and weakens him. His blood is one of the Blood Pay sources for the Citadel gate. Freeing him angers Bel." }
      ]
    }
  }
};
