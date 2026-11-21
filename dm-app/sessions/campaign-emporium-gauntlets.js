// Campaign-wide: Gristle's Ladder, one-on-one gauntlets behind the Devil's Teeth (Session 14), one ladder for each
// kind of fighter in the party: the frontline cleric, the rider-archer, the shapeshifting druid, and an open ladder
// for Veska, Lucan or anyone. HOMEBREW, written 2026-11-21 (DM: "combat one on one gauntlets ... for each type of
// player"). Stat blocks: SRD 5.1 monsters (CC BY 4.0) named for the Ring, plus Sootmaw and Gristle (homebrew).
// The vrock, the hezrou and the narzugon are the ones in campaign-world.js.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.side, {
  "emporium-gauntlets": {
    title: "Gristle's Ladder: One-on-One in the Ring",
    blocks: [
      { t: "p", text: "Behind the Devil's Teeth, a 30-foot circle of brass spikes on the boards: the Ring. Mahadi licenses it as the one place inside the wards where blows land, because blood for sport is good for business and death is not. Each ladder is three bouts in a row, one fighter against the Ring's champion of the night. The whole floor comes to watch." },
      { t: "h", text: "The Ring's Rules" },
      { t: "steps", items: [
        "{@b Nobody dies in the Ring.} A fighter dropped to 0 hit points is pulled out by the ward (the 'Red Hand') at 1 hit point, unconscious for a minute. A blow at a downed fighter simply stops in the air, and the crowd boos.",
        "{@b One on one.} Help from outside (a spell, a familiar, a summoned creature, advice that is really help) forfeits the bout. The Sky Ladder's mount is the one exception.",
        "{@b Buy-in 2 soul coins a bout}, paid before each bell. Yield at any time: keep what was won; the buy-in of the bout yielded is lost.",
        "{@b One minute between bouts.} One potion. No rest, and nobody else's spells.",
        "{@b Pressing on is the game.} A fighter can stop after any rung with the prizes so far."
      ] },
      { t: "note", title: "The crowd (Crowd tokens)", text: "A stylish move, a taunt that lands, a risky choice: give the fighter a Crowd token (3 at most). Spend one to reroll any d20 of theirs as the roar carries them. A dull round (Dodge, or hiding the whole time) loses one. Gristle loves the noise as much as they do." },
      { t: "table", caption: "Prizes on every ladder", head: ["Rung", "Prize"], rows: [
        ["1", "4 soul coins."],
        ["2", "8 soul coins, or one pick from Gristle's trophy rack: an {@item elixir of health|DMG}, a {@item potion of heroism|DMG} or a {@item bead of force|DMG}."],
        ["3", "The ladder's own prize (below), and the title {@b Champion of the Ladder}: until the bell every haggle DC on the floor is 2 lower for that fighter, and the Devil's Teeth's high rungs open without an ante."]
      ] },

      { t: "more", title: "The Dawn Ladder: for Drenwal (a frontline cleric)", src: ["Homebrew"], blocks: [
        { t: "p", text: "Endurance, keeping concentration, keeping your own mind. Every opponent attacks the cleric's will as much as his body." },
        { t: "table", head: ["Rung", "Opponent", "How it fights"], rows: [
          ["1", "{@c pit-chain-devil|Kettle}, a chain devil (CR 8)", "Chains at 10 feet and the Unnerving Mask: for Drenwal the face is Halvard's, or Dumal's (your pick). Wisdom saves every round."],
          ["2", "{@c pit-glabrezu|Ogroz}, a glabrezu, a prisoner of the Blood War (CR 9)", "Darkness, confusion, power word stun, then pincers. He goes free if he wins three bouts tonight: play him desperate, not cruel."],
          ["3", "{@c narzugon|Ser Haldric Vane, the Sold Oath} (the Legion's narzugon block, CR 11)", "A Hellrider once, who sold his oath generations ago; not one of the three at the jetty. He knows the blood on sight: 'I can smell your father on you, boy.' Every taunt is about the Watch."]
        ] },
        { t: "p", text: "{@b Prize: Haldric's Sunbadge} (homebrew, rare): the Hellrider's badge he gave up. Once per long rest, when Drenwal uses Warding Flare, the attacker also takes 2d8 radiant damage. Held up to a narzugon it is also the 'one hesitation' Gristle talks about." }
      ] },

      { t: "more", title: "The Sky Ladder: for Aurora (a rider and archer)", src: ["Homebrew"], blocks: [
        { t: "p", text: "Fought above the market, under the dome of the wards (it reaches 300 feet up). Rider and mount count as one fighter: Aurora may ride Moonkite, and the opponent may target either of them. Leaving the dome forfeits the bout." },
        { t: "table", head: ["Rung", "Opponent", "How it fights"], rows: [
          ["1", "{@c vrock|Skreech}, a vrock (CR 6)", "A brawler of the air: spores, then the stunning screech when she is close."],
          ["2", "{@c pit-bone-devil|Mother Quill}, a bone devil (CR 9)", "Slow in the air (40 feet), deadly up close: the sting poisons. The test is keeping her distance."],
          ["3", "{@c pit-erinyes|Vashti of the Thorn Choir}, an erinyes (CR 12)", "An archery duel at 150 feet: three arrows a turn, poison on every hit, and a parry if anyone closes in."]
        ] },
        { t: "p", text: "{@b Prize: Vashti's string} (homebrew, rare): a hell-silk bowstring. Ranged attacks with that bow ignore half and three-quarters cover, and once a day a hit can poison the target until the end of its next turn (DC 15 Constitution). It fits the Moonbow." }
      ] },

      { t: "more", title: "The Ash Ladder: for Or'Henn (a shapeshifter and fire-caster)", src: ["Homebrew"], blocks: [
        { t: "p", text: "Everything on this ladder shrugs off fire. It is the druid's test of everything else: thorns, sunbeams, beasts, earth, cunning." },
        { t: "table", head: ["Rung", "Opponent", "How it fights"], rows: [
          ["1", "{@c hezrou|Grulk}, a hezrou, a prisoner of the Blood War (CR 8)", "Stench and fists. Resists fire."],
          ["2", "{@c pit-sootmaw|Sootmaw}, the kennel-mother (CR 9)", "A hell hound grown huge, immune to fire. She hunts by smell, so a wild shape does not fool her."],
          ["3", "{@c pit-ashvex|Ashvex}, a young red dragon (CR 10)", "{@b A Pull trap.} Arkhan paid Gristle to put a dragon on Or'Henn's ladder. Ashvex fights fair, and when Or'Henn drops below half his hit points she holds back and offers: 'Ask me to stop, little cousin. Just ask.' Asking is asking a dragon for help: Tiamat's Pull."]
        ] },
        { t: "p", text: "{@b Prize:} 6 soul coins and a full batch of red scales from Ashvex's moult, enough for a Dragon-Scale Warplate at the Forge. {@b Want it clean?} Swap Ashvex for a second Sootmaw and drop the trap." }
      ] },

      { t: "more", title: "The Open Ladder: for Veska, Lucan, or anyone", src: ["Homebrew"], blocks: [
        { t: "p", text: "A straight brawl with Gristle's own crew. A warm-up for a level 14 hero; a real climb for Veska or Ser Lucan (CR 7 each), and a good way to give an ally a moment in the light." },
        { t: "table", head: ["Rung", "Opponent", "How it fights"], rows: [
          ["1", "{@c pit-bearded-devil|Glaive-Sergeant Ulk}, a bearded devil (CR 3)", "Glaive at reach and the infernal wound that keeps bleeding."],
          ["2", "{@c pit-hookjaw|Hookjaw}, a barbed devil (CR 5)", "Claws, tail, and flame thrown from across the Ring."],
          ["3", "{@c gristle|Gristle} himself, the Ladder's champion (CR 8)", "He climbs down from the barrel only for the third rung. He grapples, and his barbs bite anyone holding him."]
        ] },
        { t: "p", text: "{@b Prize:} a brass-capped barb from Gristle's own back (a +1 dagger), 6 soul coins, and the winner is welcome at every den in the Emporium for life." }
      ] }
    ]
  }
});

Object.assign(window.CAMPAIGN.creatures, {
  "pit-chain-devil": {
    name: "Kettle, Chain Devil", kind: "chain-devil", role: "The Ring's opener on the Dawn Ladder",
    source: { page: "bestiary", name: "Chain Devil", src: "MM" }, npc: false,
    sizeType: "Medium fiend (devil), lawful evil", ac: 16, acNote: "natural armor", hp: 85, hpFormula: "10d8 + 40", speed: "30 ft.",
    abilities: { str: 18, dex: 15, con: 18, int: 11, wis: 12, cha: 14 },
    saves: "Con +7, Wis +4, Cha +5", skills: "", vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    immune: "fire, poison", condImmune: "poisoned", senses: "darkvision 120 ft., passive Perception 11", languages: "Infernal, telepathy 120 ft.",
    cr: "8", xp: 3900, pb: 3,
    traits: [
      { name: "Devil's Sight", text: "Magical darkness doesn't impede the devil's darkvision." },
      { name: "Magic Resistance", text: "The devil has advantage on saving throws against spells and other magical effects." }
    ],
    actions: [
      { name: "Multiattack", text: "The devil makes two attacks with its chains." },
      { name: "Chain", text: "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage. The target is grappled (escape DC 14) if the devil isn't already grappling a creature. Until this grapple ends, the target is restrained and takes 7 (2d6) piercing damage at the start of each of its turns." },
      { name: "Animate Chains (Recharges after a Short or Long Rest)", text: "Up to four chains the devil can see within 60 feet of it magically sprout razor-edged barbs and animate under the devil's control, provided that the chains aren't being worn or carried. Each animated chain is an object with AC 20, 20 hit points, resistance to piercing damage, and immunity to psychic and thunder damage. When the devil uses Multiattack on its turn, it can use each animated chain to make one additional chain attack. An animated chain can grapple one creature of its own but can't make attacks while grappling. An animated chain reverts to its inanimate state if reduced to 0 hit points or if the devil is incapacitated or dies. (In the Ring: the spikes' chains, two of them.)" }
    ],
    reactions: [
      { name: "Unnerving Mask", text: "When a creature the devil can see starts its turn within 30 feet of the devil, the devil can create the illusion that it looks like one of the creature's departed loved ones or bitter enemies. If the creature can see the devil, it must succeed on a DC 14 Wisdom saving throw or be frightened until the end of its turn." }
    ]
  },

  "pit-glabrezu": {
    name: "Ogroz, Glabrezu", kind: "glabrezu", role: "A prisoner of the Blood War, fighting for his freedom",
    source: { page: "bestiary", name: "Glabrezu", src: "MM" }, npc: false,
    sizeType: "Large fiend (demon), chaotic evil", ac: 17, acNote: "natural armor", hp: 157, hpFormula: "15d10 + 75", speed: "40 ft.",
    abilities: { str: 20, dex: 15, con: 21, int: 19, wis: 17, cha: 16 },
    saves: "Str +9, Con +9, Wis +7, Cha +7", skills: "", vulnerable: "", resist: "cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "poison", condImmune: "poisoned", senses: "truesight 120 ft., passive Perception 13", languages: "Abyssal, telepathy 120 ft.",
    cr: "9", xp: 5000, pb: 4,
    traits: [
      { name: "Innate Spellcasting", text: "The glabrezu's spellcasting ability is Intelligence (spell save DC 16). It can innately cast the following spells, requiring no material components. At will: {@spell darkness}, {@spell detect magic}, {@spell dispel magic}. 1/day each: {@spell confusion}, {@spell fly}, {@spell power word stun}." },
      { name: "Magic Resistance", text: "The glabrezu has advantage on saving throws against spells and other magical effects." }
    ],
    actions: [
      { name: "Multiattack", text: "The glabrezu makes four attacks: two with its pincers and two with its fists. Alternatively, it makes two attacks with its pincers and casts one spell." },
      { name: "Pincer", text: "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a Medium or smaller creature, it is grappled (escape DC 15). The glabrezu has two pincers, each of which can grapple only one target." },
      { name: "Fist", text: "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage." }
    ]
  },

  "pit-bone-devil": {
    name: "Mother Quill, Bone Devil", kind: "bone-devil", role: "The Sky Ladder's second rung",
    source: { page: "bestiary", name: "Bone Devil", src: "MM" }, npc: false,
    sizeType: "Large fiend (devil), lawful evil", ac: 19, acNote: "natural armor", hp: 142, hpFormula: "15d10 + 60", speed: "40 ft., fly 40 ft.",
    abilities: { str: 18, dex: 16, con: 18, int: 13, wis: 14, cha: 16 },
    saves: "Int +5, Wis +6, Cha +7", skills: "Deception +7, Insight +6", vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    immune: "fire, poison", condImmune: "poisoned", senses: "darkvision 120 ft., passive Perception 12", languages: "Infernal, telepathy 120 ft.",
    cr: "9", xp: 5000, pb: 4,
    traits: [
      { name: "Devil's Sight", text: "Magical darkness doesn't impede the devil's darkvision." },
      { name: "Magic Resistance", text: "The devil has advantage on saving throws against spells and other magical effects." }
    ],
    actions: [
      { name: "Multiattack", text: "The devil makes three attacks: two with its claws and one with its sting." },
      { name: "Claw", text: "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 8 (1d8 + 4) slashing damage." },
      { name: "Sting", text: "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success." }
    ]
  },

  "pit-erinyes": {
    name: "Vashti of the Thorn Choir, Erinyes", kind: "erinyes", role: "The Sky Ladder's champion: an archer",
    source: { page: "bestiary", name: "Erinyes", src: "MM" }, npc: false,
    sizeType: "Medium fiend (devil), lawful evil", ac: 18, acNote: "plate", hp: 153, hpFormula: "18d8 + 72", speed: "30 ft., fly 60 ft.",
    abilities: { str: 18, dex: 16, con: 18, int: 14, wis: 14, cha: 18 },
    saves: "Dex +7, Con +8, Wis +6, Cha +8", skills: "", vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    immune: "fire, poison", condImmune: "poisoned", senses: "truesight 120 ft., passive Perception 12", languages: "Infernal, telepathy 120 ft.",
    cr: "12", xp: 8400, pb: 4,
    traits: [
      { name: "Hellish Weapons", text: "The erinyes's weapon attacks are magical and deal an extra 13 (3d8) poison damage on a hit (included in the attacks)." },
      { name: "Magic Resistance", text: "The erinyes has advantage on saving throws against spells and other magical effects." }
    ],
    actions: [
      { name: "Multiattack", text: "The erinyes makes three attacks." },
      { name: "Longsword", text: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 13 (3d8) poison damage." },
      { name: "Longbow", text: "Ranged Weapon Attack: +7 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 13 (3d8) poison damage, and the target must succeed on a DC 14 Constitution saving throw or be poisoned. The poison lasts until it is removed by the lesser restoration spell or similar magic." }
    ],
    reactions: [
      { name: "Parry", text: "The erinyes adds 4 to its AC against one melee attack that would hit it. To do so, the erinyes must see the attacker and be wielding a melee weapon." }
    ]
  },

  "pit-ashvex": {
    name: "Ashvex, Young Red Dragon", kind: "young-red-dragon", role: "The Ash Ladder's champion, and Arkhan's errand",
    source: { page: "bestiary", name: "Young Red Dragon", src: "MM" }, npc: false,
    homebrew: "SRD young red dragon. One trait added for the Ring: Mercy, the Pull trap. Swap her for a second Sootmaw to keep the ladder clean.",
    sizeType: "Large dragon, chaotic evil", ac: 18, acNote: "natural armor", hp: 178, hpFormula: "17d10 + 85", speed: "40 ft., climb 40 ft., fly 80 ft.",
    abilities: { str: 23, dex: 10, con: 21, int: 14, wis: 11, cha: 19 },
    saves: "Dex +4, Con +9, Wis +4, Cha +8", skills: "Perception +8, Stealth +4", vulnerable: "", resist: "",
    immune: "fire", condImmune: "", senses: "blindsight 30 ft., darkvision 120 ft., passive Perception 18", languages: "Common, Draconic",
    cr: "10", xp: 5900, pb: 4,
    traits: [
      { name: "Mercy (the Pull trap)", text: "When Or'Henn drops below half his hit points, Ashvex holds back and offers: 'Ask me to stop, little cousin. Just ask.' If he asks out loud, he has asked a dragon for help: run Tiamat's Pull. She was paid to make the offer, and she makes it kindly." }
    ],
    actions: [
      { name: "Multiattack", text: "The dragon makes three attacks: one with its bite and two with its claws." },
      { name: "Bite", text: "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 3 (1d6) fire damage." },
      { name: "Claw", text: "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage." },
      { name: "Fire Breath (Recharge 5-6)", text: "The dragon exhales fire in a 30-foot cone. Each creature in that area must make a DC 17 Dexterity saving throw, taking 56 (16d6) fire damage on a failed save, or half as much damage on a successful one." }
    ]
  },

  "pit-sootmaw": {
    name: "Sootmaw, the Kennel-Mother", kind: "hell-hound", role: "The Ash Ladder's second rung",
    source: { page: "bestiary", name: "Hell Hound", src: "MM" }, npc: false,
    homebrew: "A hell hound grown to CR 9 for a one-on-one with a level 14 druid. Her nose ignores wild shape.",
    sizeType: "Large fiend, lawful evil", ac: 16, acNote: "natural armor", hp: 152, hpFormula: "16d10 + 64", speed: "60 ft.",
    abilities: { str: 20, dex: 14, con: 18, int: 6, wis: 14, cha: 8 },
    saves: "Con +8, Wis +6", skills: "Perception +10", vulnerable: "", resist: "",
    immune: "fire", condImmune: "", senses: "darkvision 60 ft., passive Perception 20", languages: "understands Infernal but can't speak it",
    cr: "9", xp: 5000, pb: 4,
    traits: [
      { name: "Keen Hearing and Smell", text: "Sootmaw has advantage on Wisdom (Perception) checks that rely on hearing or smell." },
      { name: "Nose for Souls", text: "She knows a creature by its smell whatever shape it wears. A shapechanged creature she has smelled gains nothing from looking like something else." },
      { name: "Ashen Hide", text: "A creature that hits Sootmaw with a melee attack while within 5 feet of her takes 5 (1d10) fire damage." }
    ],
    actions: [
      { name: "Multiattack", text: "Sootmaw makes two bite attacks." },
      { name: "Bite", text: "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage plus 10 (3d6) fire damage." },
      { name: "Fire Breath (Recharge 5-6)", text: "Sootmaw exhales fire in a 30-foot cone. Each creature in that area must make a DC 16 Dexterity saving throw, taking 45 (13d6) fire damage on a failed save, or half as much damage on a successful one." }
    ],
    reactions: [
      { name: "Snap", text: "When a creature within 5 feet of Sootmaw changes its shape or casts a spell, she makes one bite attack against it." }
    ]
  },

  "pit-bearded-devil": {
    name: "Glaive-Sergeant Ulk, Bearded Devil", kind: "bearded-devil", role: "The Open Ladder's first rung",
    source: { page: "bestiary", name: "Bearded Devil", src: "MM" }, npc: false,
    sizeType: "Medium fiend (devil), lawful evil", ac: 13, acNote: "natural armor", hp: 52, hpFormula: "8d8 + 16", speed: "30 ft.",
    abilities: { str: 16, dex: 15, con: 15, int: 9, wis: 11, cha: 11 },
    saves: "Str +5, Con +4, Wis +2", skills: "", vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    immune: "fire, poison", condImmune: "poisoned", senses: "darkvision 120 ft., passive Perception 10", languages: "Infernal, telepathy 120 ft.",
    cr: "3", xp: 700, pb: 2,
    traits: [
      { name: "Devil's Sight", text: "Magical darkness doesn't impede the devil's darkvision." },
      { name: "Magic Resistance", text: "The devil has advantage on saving throws against spells and other magical effects." },
      { name: "Steadfast", text: "The devil can't be frightened while it can see an allied creature within 30 feet of it." }
    ],
    actions: [
      { name: "Multiattack", text: "The devil makes two attacks: one with its beard and one with its glaive." },
      { name: "Beard", text: "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. While poisoned in this way, the target can't regain hit points. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success." },
      { name: "Glaive", text: "Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 8 (1d10 + 3) slashing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 12 Constitution saving throw or lose 5 (1d10) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 5 (1d10). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing." }
    ]
  },

  "pit-hookjaw": {
    name: "Hookjaw, Barbed Devil", kind: "barbed-devil", role: "The Open Ladder's second rung",
    source: { page: "bestiary", name: "Barbed Devil", src: "MM" }, npc: false,
    sizeType: "Medium fiend (devil), lawful evil", ac: 15, acNote: "natural armor", hp: 110, hpFormula: "13d8 + 52", speed: "30 ft.",
    abilities: { str: 16, dex: 17, con: 18, int: 12, wis: 14, cha: 14 },
    saves: "Str +6, Con +7, Wis +5, Cha +5", skills: "Deception +5, Insight +5, Perception +8", vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    immune: "fire, poison", condImmune: "poisoned", senses: "darkvision 120 ft., passive Perception 18", languages: "Infernal, telepathy 120 ft.",
    cr: "5", xp: 1800, pb: 3,
    traits: [
      { name: "Barbed Hide", text: "At the start of each of its turns, the barbed devil deals 5 (1d10) piercing damage to any creature grappling it." },
      { name: "Devil's Sight", text: "Magical darkness doesn't impede the devil's darkvision." },
      { name: "Magic Resistance", text: "The devil has advantage on saving throws against spells and other magical effects." }
    ],
    actions: [
      { name: "Multiattack", text: "The devil makes three melee attacks: one with its tail and two with its claws. Alternatively, it can use Hurl Flame twice." },
      { name: "Claw", text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage." },
      { name: "Tail", text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage." },
      { name: "Hurl Flame", text: "Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire damage. If the target is a flammable object that isn't being worn or carried, it also catches fire." }
    ]
  },

  "gristle": {
    name: "Gristle, Champion of the Ladder", kind: "barbed-devil", role: "Barbed devil, the Devil's Teeth's keeper and the Ring's last rung",
    source: { page: "bestiary", name: "Barbed Devil", src: "MM" }, npc: false,
    homebrew: "The SRD barbed devil raised to CR 8: more hit points, a grappling tail, Catch the Blade, and Showman.",
    sizeType: "Medium fiend (devil), lawful evil", ac: 17, acNote: "natural armor, brass-capped barbs", hp: 144, hpFormula: "17d8 + 68", speed: "30 ft.",
    abilities: { str: 18, dex: 17, con: 18, int: 12, wis: 14, cha: 16 },
    saves: "Str +7, Con +7, Wis +5, Cha +6", skills: "Athletics +7, Deception +6, Intimidation +9, Perception +8", vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
    immune: "fire, poison", condImmune: "poisoned", senses: "darkvision 120 ft., passive Perception 18", languages: "Infernal, Common, telepathy 120 ft.",
    cr: "8", xp: 3900, pb: 3,
    traits: [
      { name: "Barbed Hide", text: "At the start of each of his turns, Gristle deals 11 (2d10) piercing damage to any creature grappling him or grappled by him." },
      { name: "Devil's Sight", text: "Magical darkness doesn't impede Gristle's darkvision." },
      { name: "Magic Resistance", text: "Gristle has advantage on saving throws against spells and other magical effects." },
      { name: "Showman", text: "Whenever his opponent spends a Crowd token, Gristle gains 5 temporary hit points. He loves the noise too." }
    ],
    actions: [
      { name: "Multiattack", text: "Gristle makes three attacks: two with his claws and one with his tail. Alternatively, he uses Hurl Flame twice." },
      { name: "Claw", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage." },
      { name: "Tail", text: "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) piercing damage, and the target is grappled (escape DC 15)." },
      { name: "Hurl Flame", text: "Ranged Spell Attack: +6 to hit, range 150 ft., one target. Hit: 17 (5d6) fire damage." }
    ],
    reactions: [
      { name: "Catch the Blade", text: "When Gristle is hit by a melee weapon attack, the attacker makes a DC 15 Strength saving throw. On a failure the weapon sticks in his barbs: the attacker lets go of it, or is pulled 5 feet toward him. Pulling it free takes an action and a DC 15 Strength (Athletics) check." }
    ]
  }
});
