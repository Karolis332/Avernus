// Session 13: the Scab and the gates of the Bleeding Citadel. Follows Session 12 (the Crypt siege; Lulu taken by Zariel's riders by default).
// Areas S1-S14 are our own run-it blocks built from the Eventyr Chapter 4 guide (local library) and the printed adventure's layout; no text is copied.
// Campaign creatures (vrock, hezrou, narzugon) come from campaign-world.js; this file overrides only their tactics.
// New creatures here use openly licensed SRD chassis (gnoll, dretch, nalfeshnee, barbed devil, shadow-demon-like) with our own numbers and names.
window.SESSION = {
  id: "13-the-scab",
  title: "The Scab",
  subtitle: "Session 13 · Descent into Avernus",
  summary: "The shard leads the party down the Scab road, past the Blood War's leftovers, to a hill-sized wound in Avernus with a cathedral buried in it. Inside the Scab are gnolls, demons and a caged beast that belongs to Yeenoghu. Every fight has an exit, because the party is three level-13 heroes and the day is long. Zariel is felt in a pool of blood, not met. At the end the doors of the Bleeding Citadel open to the shard in Lulu's place.",

  party: [
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 13. Sigil of the Binding (Tier II). Shield of the Hidden Lord. Gasps start outside the Crypt." },
    { id: "aurora", name: "Aurora", note: "Archfey Warlock 13. Rides Moonkite. Bond 1 (2 points) plus whatever Session 12 gave." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 13. 0 gold scales unless the curse moved. Holds the orb or knows who does." }
  ],
  allies: [
    { id: "veska-banner-captain", name: "Veska, Banner-Captain", note: "Upgraded in the Crypt (if she survived it)." },
    { id: "ser-lucan-named", name: "Ser Lucan, Named Among the Living", note: "Upgraded in the Crypt (if he survived it)." },
    { id: "veska", name: "Veska", note: "Hellrider sergeant. Only if the Crypt upgrade did not happen." },
    { id: "ser-lucan", name: "Ser Lucan the Reforged", note: "Only if the Crypt upgrade did not happen." },
    { id: "moonkite", name: "Moonkite", note: "Celestial mount. Bond track in arc-moonkite." },
    { id: "lulu", name: "Lulu", note: "Absent by default: Zariel's riders took her. Alternative: still aboard the hidden ship." },
    { id: "jeremy", name: "Jeremy", note: "On the Lady Vengeance with Colico Jack, hidden in the mists." }
  ],

  creatures: {

    // ---- campaign creatures: tactics only ----
    "vrock": Object.assign({}, window.CAMPAIGN.creatures.vrock, { tactics: [
      "Session 13. At the statue they heal from it, so they stay inside its 30 feet and screech from there.",
      "Screech first on anyone who stands near the statue. Spores on whoever goes for the statue.",
      "On the road they strike a lone flyer first (Moonkite) and fly off when hurt."
    ] }),
    "hezrou": Object.assign({}, window.CAMPAIGN.creatures.hezrou, { tactics: [
      "Session 13. In the food-fight pool they are already hurt and angry. They turn on the party only if a PC strikes one or touches the corpse.",
      "On the road the hezrou holds the front while vrocks dive. When it falls the pack loses heart."
    ] }),
    "narzugon": Object.assign({}, window.CAMPAIGN.creatures.narzugon, { tactics: [
      "Session 13. A herald, not a hunter. It is here to see whether the shard moves and to count who carries it. It reports; it does not fight unless the carrier raises a hand."
    ] }),

    // ---- new: gnolls (SRD gnoll chassis, own numbers) ----
    "scab-gnoll": {
      name: "Scab Gnoll", kind: "gnoll", source: { page: "bestiary", name: "Gnoll", src: "MM" }, role: "Yeenoghu's raider. Eats first, asks never.",
      homebrew: "SRD gnoll chassis with more hit points and a better bite, so a group of six matters to a level-13 party.",
      npc: false, sizeType: "Medium humanoid (gnoll), chaotic evil", ac: 15, acNote: "hide armour, shield",
      hp: 33, hpFormula: "6d8 + 6", speed: "30 ft.",
      abilities: { str: 15, dex: 12, con: 12, int: 6, wis: 10, cha: 7 }, saves: "", skills: "",
      vulnerable: "", resist: "", immune: "", condImmune: "", senses: "darkvision 60 ft., passive Perception 10", languages: "Gnoll",
      cr: "1", xp: 200, pb: 2,
      traits: [ { name: "Rampage", text: "When the gnoll reduces a creature to 0 hit points with a melee attack on its turn, it can use a bonus action to move up to half its speed and make a bite attack." } ],
      actions: [
        { name: "Bite", text: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage." },
        { name: "Spear", text: "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 6 (1d6 + 3) piercing damage, or 7 (1d8 + 3) if used with two hands." }
      ],
      bonus: [], reactions: [],
      tactics: ["They rush the nearest bleeding creature and ignore the rest. A group shares one initiative and one saving throw.", "They break and run when the pack lord or Targ Nar falls."]
    },
    "gnoll-packlord": {
      name: "Gnoll Pack Lord", kind: "gnoll", source: { page: "bestiary", name: "Gnoll Pack Lord", src: "MM" }, role: "Pack lord. Eats first, and shares last.",
      homebrew: "Our own block on the SRD gnoll chassis. Eventyr suggests replacing the 15 mundane gnolls of S13 with 5 pack lords; this is that.",
      npc: false, sizeType: "Medium humanoid (gnoll), chaotic evil", ac: 15, acNote: "scab-plate",
      hp: 52, hpFormula: "8d8 + 16", speed: "30 ft.",
      abilities: { str: 17, dex: 13, con: 14, int: 8, wis: 11, cha: 10 }, saves: "", skills: "",
      vulnerable: "", resist: "", immune: "", condImmune: "", senses: "darkvision 60 ft., passive Perception 10", languages: "Gnoll",
      cr: "3", xp: 700, pb: 2,
      traits: [
        { name: "Rampage", art: "art/generated/gnoll-packlord-rampage.webp", text: "As the scab gnoll's Rampage." },
        { name: "Pack Howl (Recharge 5-6)", art: "art/generated/gnoll-packlord-pack-howl.webp", text: "As a bonus action the pack lord howls. Each gnoll within 30 feet (not itself) adds 1d4 to its next attack roll before the end of the pack lord's next turn." }
      ],
      actions: [
        { name: "Multiattack", text: "Two attacks: one bite and one flail." },
        { name: "Bite", art: "art/generated/gnoll-packlord-bite.webp", text: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage." },
        { name: "Flail", art: "art/generated/gnoll-packlord-flail.webp", text: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) bludgeoning damage." }
      ],
      bonus: [], reactions: [],
      tactics: ["Howl on round 1, then pick the same target as the others. They fight in the widened corridor, not the narrow one."]
    },
    "targ-nar": Object.assign({}, {
      name: "Targ Nar, Fang of Yeenoghu", kind: "gnoll", source: { page: "bestiary", name: "Gnoll Fang of Yeenoghu", src: "MM" }, role: "Gnoll war-leader. The loudest laugh in the Scab.",
      homebrew: "Our own block on the SRD gnoll chassis, scaled up. The book gives the character; these numbers are ours.",
      npc: false, sizeType: "Medium humanoid (gnoll), chaotic evil", ac: 16, acNote: "scab-plate",
      hp: 120, hpFormula: "16d8 + 48", speed: "35 ft.",
      abilities: { str: 20, dex: 14, con: 17, int: 9, wis: 12, cha: 14 }, saves: "Con +6, Wis +4", skills: "Intimidation +5",
      vulnerable: "", resist: "", immune: "", condImmune: "frightened", senses: "darkvision 60 ft., passive Perception 11", languages: "Abyssal, Gnoll",
      cr: "7", xp: 2900, pb: 3,
      traits: [
        { name: "Rampage", text: "As the scab gnoll's Rampage." },
        { name: "Gnawing Frenzy", text: "While bloodied, the first creature Targ Nar hits each turn also takes 7 (2d6) necrotic damage." }
      ],
      actions: [
        { name: "Multiattack", text: "Three attacks: one bite and two flails." },
        { name: "Bite", text: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage." },
        { name: "Flail", text: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 10 (1d10 + 5) bludgeoning damage." }
      ],
      bonus: [], reactions: [],
      tactics: ["He lets the pack lords go first, then wades in. He wants the shard, or the carrier's heart; Yeenoghu gets whichever he is given.", "Below 40 hit points he laughs and keeps fighting. He does not surrender."]
    }),

    // ---- new: demons of the Scab ----
    "bulezau": {
      name: "Rot Demon (bulezau)", kind: "bulezau", source: { page: "bestiary", name: "Bulezau", src: "MTF" }, role: "Goat-headed demon. Smells like a grave in summer.",
      homebrew: "Our own block. The book names the demon; the numbers and the aura are ours.",
      npc: false, sizeType: "Medium fiend (demon), chaotic evil", ac: 14, acNote: "natural armor",
      hp: 45, hpFormula: "7d8 + 14", speed: "30 ft.",
      abilities: { str: 16, dex: 13, con: 15, int: 5, wis: 11, cha: 6 }, saves: "", skills: "",
      vulnerable: "", resist: "cold, fire, lightning", immune: "poison", condImmune: "poisoned", senses: "darkvision 60 ft., passive Perception 10", languages: "understands Abyssal, can't speak",
      cr: "2", xp: 450, pb: 2,
      traits: [ { name: "Rot Stench", text: "A creature that starts its turn within 10 feet of the demon must succeed on a DC 12 Constitution saving throw or be poisoned until the start of its next turn." } ],
      actions: [
        { name: "Multiattack", text: "Two attacks: one bite and one tail." },
        { name: "Bite", text: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage plus 3 (1d6) necrotic damage." },
        { name: "Barbed Tail", text: "Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 6 (1d6 + 3) piercing damage." }
      ],
      bonus: [], reactions: [],
      tactics: ["They throw themselves at whatever is in front of them and never retreat; their master's displeasure is worse. They fight to the death."]
    },
    "barlgura": {
      name: "Barlgura (invisible ambusher)", kind: "barlgura", source: { page: "bestiary", name: "Barlgura", src: "MM" }, role: "Ape-shaped demon that hides in the walls.",
      homebrew: "Our own block. The book names the demon; the numbers and the invisibility are ours.",
      npc: false, sizeType: "Large fiend (demon), chaotic evil", ac: 15, acNote: "natural armor",
      hp: 68, hpFormula: "8d10 + 24", speed: "40 ft., climb 40 ft.",
      abilities: { str: 18, dex: 15, con: 16, int: 7, wis: 14, cha: 9 }, saves: "Dex +5, Con +6", skills: "Perception +5, Stealth +5",
      vulnerable: "", resist: "cold, fire, lightning", immune: "poison", condImmune: "poisoned", senses: "darkvision 120 ft., passive Perception 15", languages: "Abyssal",
      cr: "4", xp: 1100, pb: 2,
      traits: [
        { name: "Unseen", text: "As a bonus action the barlgura turns invisible. The invisibility ends when it attacks or takes damage." },
        { name: "Reckless", text: "At the start of its turn it can give itself advantage on all melee attacks that turn; attacks against it then have advantage until its next turn." }
      ],
      actions: [
        { name: "Multiattack", text: "Three attacks: two fists and one bite." },
        { name: "Fist", text: "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage." },
        { name: "Bite", text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage." }
      ],
      bonus: [], reactions: [],
      tactics: ["They wait until all the party is in the chamber, then drop. They attack casters and the bandaging medic first, because the blood from the ceiling is their work."]
    },
    "dretch": {
      name: "Dretch (digger)", kind: "dretch", role: "Small grey demon. Digs where it is told.",
      source: { page: "bestiary", name: "Dretch", src: "MM" }, homebrew: "SRD dretch, unchanged. Run them as one group.",
      npc: false, sizeType: "Small fiend (demon), chaotic evil", ac: 11, acNote: "natural armor",
      hp: 18, hpFormula: "4d6 + 4", speed: "20 ft.",
      abilities: { str: 11, dex: 11, con: 12, int: 5, wis: 8, cha: 3 }, saves: "", skills: "",
      vulnerable: "", resist: "cold, fire, lightning", immune: "poison", condImmune: "poisoned", senses: "darkvision 60 ft., passive Perception 9", languages: "Abyssal, telepathy 60 ft. (limited)",
      cr: "1/4", xp: 50, pb: 2,
      traits: [], actions: [
        { name: "Multiattack", text: "Two attacks: one bite and one claws." },
        { name: "Bite", text: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage." },
        { name: "Claws", text: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage." },
        { name: "Fetid Cloud (1/Day)", text: "A 10-foot-radius cloud of green gas spreads around corners. Each creature in it must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn." }
      ],
      bonus: [], reactions: [],
      tactics: ["They keep digging until hit. They are afraid of Vatilan and more afraid of Trantolox. A group shares one initiative."]
    },
    "vatilan": {
      name: "Vatilan, the Digging Overseer", kind: "shadow-demon", source: { page: "bestiary", name: "Shadow Demon", src: "MM" }, role: "Shadow demon. Screams in Abyssal at the diggers.",
      homebrew: "Our own block: a shadow demon in all but name, numbers ours.",
      npc: false, sizeType: "Medium fiend (demon), chaotic evil", ac: 13, acNote: "",
      hp: 66, hpFormula: "12d8 + 12", speed: "30 ft., fly 30 ft.",
      abilities: { str: 1, dex: 17, con: 12, int: 14, wis: 13, cha: 14 }, saves: "Dex +5, Cha +4", skills: "Stealth +7",
      vulnerable: "radiant", resist: "acid, fire, necrotic, thunder; bludgeoning, piercing and slashing from nonmagical attacks", immune: "cold, lightning, poison", condImmune: "exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained", senses: "darkvision 120 ft., passive Perception 11", languages: "Abyssal, telepathy 120 ft.",
      cr: "4", xp: 1100, pb: 2,
      traits: [
        { name: "Incorporeal Movement", text: "It can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object." },
        { name: "Light Sensitivity", text: "While in bright light, it has disadvantage on attack rolls and on Perception checks that rely on sight." }
      ],
      actions: [ { name: "Claws", text: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) psychic damage, or 17 (4d6 + 3) if the demon had advantage on the attack roll." } ],
      bonus: [], reactions: [],
      tactics: ["If attacked, it flies for S14 through the walls to warn Trantolox. Cutting it off is the whole point of the fight.", "Fights from the dark and flees from the light."]
    },
    "alazub": {
      name: "Alazub, the Chained Spy", kind: "barbed-devil", role: "Barbed devil in chains. Zariel's spy among the demons.",
      source: { page: "bestiary", name: "Barbed Devil", src: "MM" },
      homebrew: "SRD barbed devil, reduced to 25 hit points by torture. He fights only to escape.",
      npc: false, sizeType: "Medium fiend (devil), lawful evil", ac: 15, acNote: "natural armor",
      hp: 25, hpFormula: "bound; 25 hp left of 13d8+39", speed: "30 ft.",
      abilities: { str: 16, dex: 17, con: 18, int: 12, wis: 14, cha: 14 }, saves: "Str +6, Con +7, Wis +5, Cha +5", skills: "Deception +5, Insight +5",
      vulnerable: "", resist: "cold; bludgeoning, piercing and slashing from nonmagical attacks that aren't silvered", immune: "fire, poison", condImmune: "poisoned", senses: "darkvision 120 ft., passive Perception 12", languages: "Infernal, telepathy 120 ft.",
      cr: "5", xp: 1800, pb: 3,
      traits: [
        { name: "Barbed Hide", text: "At the start of each of its turns, it deals 5 (1d10) piercing damage to any creature grappling it." },
        { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." }
      ],
      actions: [ { name: "Claw", text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage." }, { name: "Hurl Flame", text: "Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire damage." } ],
      bonus: [], reactions: [],
      tactics: ["He talks. He trades what he knows for his freedom and reports the party to Zariel the moment he can. He never lies outright."]
    },

    // ---- new: Trantolox and Crokek'toeck ----
    "trantolox": {
      name: "Trantolox, the Deserter Lord", kind: "nalfeshnee", role: "Demon lord of the diggers. Will bargain.",
      source: { page: "bestiary", name: "Nalfeshnee", src: "MM" },
      homebrew: "SRD nalfeshnee chassis (the book makes Trantolox a nalfeshnee, CR 13). The deserter flavour is ours: he walked out of a Blood War warband to find Crokek'toeck and sell the Citadel to the highest bidder. Flees below 60 hit points.",
      npc: false, sizeType: "Large fiend (demon), chaotic evil", ac: 18, acNote: "natural armor",
      hp: 184, hpFormula: "16d10 + 96", speed: "20 ft., fly 30 ft.",
      abilities: { str: 21, dex: 10, con: 22, int: 19, wis: 12, cha: 15 }, saves: "Con +11, Int +9, Wis +6, Cha +7", skills: "",
      vulnerable: "", resist: "cold, fire, lightning; bludgeoning, piercing and slashing from nonmagical attacks", immune: "poison", condImmune: "poisoned", senses: "truesight 120 ft., passive Perception 11", languages: "Abyssal, telepathy 120 ft.",
      cr: "13", xp: 10000, pb: 5,
      traits: [ { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." } ],
      actions: [
        { name: "Multiattack", text: "Uses Horror Nimbus if available, then three attacks: one bite and two claws." },
        { name: "Bite", art: "art/generated/trantolox-bite.webp", text: "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 32 (5d10 + 5) piercing damage." },
        { name: "Claw", art: "art/generated/trantolox-claw.webp", text: "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) slashing damage." },
        { name: "Horror Nimbus (Recharge 5-6)", art: "art/generated/trantolox-horror-nimbus.webp", text: "The demon shimmers with a multicolored light. Each creature within 15 feet that can see it must succeed on a DC 15 Wisdom saving throw or be frightened for 1 minute. A creature repeats the save at the end of each of its turns, and is immune for 24 hours once it succeeds." },
        { name: "Teleport", art: "art/generated/trantolox-teleport.webp", text: "The demon magically teleports up to 120 feet to an unoccupied space it can see." }
      ],
      bonus: [], reactions: [],
      tactics: [
        "Before the fight he stops it: truesight sees the party first. He offers an alliance and an even split of the Citadel's treasure. Make the offer sound clever, because it is.",
        "If the offer is refused he fights with the bulezaus at the door, and Horror Nimbus on round 1. If Vatilan escaped he has had time to set up.",
        "Below 60 hit points he teleports away. The bulezaus fight to the death. If Crokek'toeck is loose, he flees toward it, not away."
      ]
    },
    "crokek-toeck": {
      name: "Crokek'toeck, Yeenoghu's Beast", kind: "gnoll-hound", source: { page: "bestiary", name: "Crokek'toeck", src: "BGDIA" }, role: "Huge fiend. A lost pet that is also a siege engine.",
      homebrew: "Our own Huge-fiend block, roughly CR 13. The book names and imprisons it; the form and numbers are ours. It is not built to be killed in one fight: the party's win is getting past it. It leaves after three rounds to find Yeenoghu.",
      npc: false, sizeType: "Huge fiend (demon), chaotic evil", ac: 17, acNote: "bone plates",
      hp: 230, hpFormula: "20d12 + 100", speed: "50 ft., burrow 20 ft. (scab only)",
      abilities: { str: 26, dex: 14, con: 21, int: 6, wis: 12, cha: 8 }, saves: "Con +10, Wis +6", skills: "Perception +6",
      vulnerable: "", resist: "cold, fire, lightning; bludgeoning, piercing and slashing from nonmagical attacks", immune: "poison", condImmune: "poisoned, frightened", senses: "darkvision 120 ft., blindsight 60 ft., passive Perception 16", languages: "understands Abyssal",
      cr: "13", xp: 10000, pb: 5,
      traits: [
        { name: "Blood Scent", text: "It knows where every bleeding or bloodied creature within 120 feet is, and has advantage on attack rolls against creatures that are below their hit point maximum." },
        { name: "Tunnelling", text: "When it burrows through the scab it leaves a 30-foot-wide passage behind it." }
      ],
      actions: [
        { name: "Multiattack", text: "Three attacks: one bite and two claws." },
        { name: "Bite", art: "art/generated/crokek-toeck-bite.webp", text: "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 26 (4d8 + 8) piercing damage. A Large or smaller target is grappled (escape DC 18) and the beast can swallow-bite it as a second bite on its next turn for the same damage." },
        { name: "Claw", art: "art/generated/crokek-toeck-claw.webp", text: "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) slashing damage." },
        { name: "Howl of the Hungry God (Recharge 5-6)", art: "art/generated/crokek-toeck-howl-of-the-hungry-god.webp", text: "Each creature within 60 feet that can hear it must succeed on a DC 17 Wisdom saving throw or be frightened until the end of its next turn. Gnolls and demons that hear it have advantage on their next attack roll." }
      ],
      bonus: [], reactions: [],
      tactics: [
        "It is freed with a roar, not a plan. It goes for the nearest bleeding creature, then the loudest, then whoever blocks the passage.",
        "Three rounds, then it leaves through the scab to find Yeenoghu. It leaves sooner if it takes 100 damage, if a bleeding decoy goes the other way, or if Trantolox tries to command it.",
        "If it leaves, it takes its tunnel with it. The party walks through the hole it made."
      ]
    }
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
        { t: "p", text: "Session 12 ended with the party out of the Crypt, or on its way, and Lulu gone. This session is the Scab: a hill-sized wound in Avernus with the Bleeding Citadel buried in it. The road is short, the dungeon is crowded, and the last fight is at the door. It ends as the doors open to the shard." },

        { t: "h", text: "At a Glance" },
        { t: "list", items: [
          "{@b 1 · The Road to the Scab (30 min).} The shard leads. One road encounter, Moonkite's beat, a possible Gasp.",
          "{@b 2 · The Mouth of the Scab (20 min).} The gnolls outside, the climb, the dark, the blood.",
          "{@b 3 to 5 · The Scab, levels 1 to 3 (about 2 hours).} Areas S1 to S14. Three real fights, a few optional, one chase.",
          "{@b 6 · Zariel's Presence, part 2 (15 min).} She is felt in a pool of blood. She asks for a parley.",
          "{@b 7 · The Gates of the Bleeding Citadel (15 min).} The shard opens the door. The cliffhanger. Then the {@side the-sword-reforged|Sword Reforged} side if the session has time."
        ] },

        { t: "h", text: "What Happened Last Time" },
        { t: "p", text: "Read this to the players. Then ask each of them one question about it before you go on." },
        { t: "read", text: "You came out of the Crypt of the Hellriders carrying a shard of the Sword of Zariel and the road to the Scab. Behind you the Crypt's cold line was already thinning. In front of you was a long red road.\n\nYou left a siege behind, or a bargain, or a ride of cold riders going out into the dark. Whatever it cost, it is paid.\n\nThen the Lady Vengeance's wards went white for a held breath, and riders in white and gold came and took Lulu. Nobody was hurt. One of them said she would be safe. The shard in your pack has been humming ever since, in a marching rhythm." },
        { t: "p", text: "Branch the opening in one line, whichever way they left:" },
        { t: "list", items: [
          "{@b By the orb.} They hold it, and four dragons may still be on a long road behind them. Arkhan did not chase the orb; he follows Or'Henn.",
          "{@b By the Last Ride.} The riders are at rest. The Crypt is quiet. Veska is lighter.",
          "{@b By Uldrak.} His promise is spent. He will not be at the Citadel. Tiamat noticed.",
          "{@b By Krull's double-cross.} Krull has the orb or a debt. Torogar is on the road.",
          "{@b By parley.} Arkhan has the orb and kept his word to the letter: his dragons stood back for a day. He promised nothing for himself, and he still wants Or'Henn alive and Drenwal casting.",
          "{@b By extraction.} The Lady Vengeance came for them and is no longer hidden."
        ] },
        { t: "p", text: "{@b Lulu, default:} Zariel's riders took her. {@b Alternative:} the wards held and she is still aboard; she can sense the Scab, which makes the shard a backup. See {@side zariel|Playing Zariel}." },

        { t: "note", title: "House Rule: Groups", text: "A group of identical monsters shares {@b one initiative} and makes {@b one collective saving throw} (one d20 for the group). Hit points stay individual. Used here for the gnolls, the diggers and the rot demons." },

        { t: "h", text: "Check Before You Start" },
        { t: "list", items: [
          "{@b Or'Henn's scales.} 0 unless the curse moved. If a gold scale was ever taken, tell him how many.",
          "{@b The orb.} Who holds it. {@b Arkhan} is behind them either way: with the vial spent, Or'Henn's curse is his last road to Tiamat.",
          "{@b The shard.} It is in someone's pack. Pick who carries it. It matters at the gates.",
          "{@b Moonkite's Bond.} Points from Session 12. Keep it on Aurora's sheet.",
          "{@b Drenwal's Watch pool.} Gasps start outside the Crypt. Did one happen in Session 12? Where does the pool stand?",
          "{@b Allies.} Veska and Ser Lucan are with the party. Check whether either is a fiend or undead; the door's light matters (scene 7).",
          "The wider world is in {@side world-state|The World Right Now}. The Citadel window is estimated at Day 17."
        ] },

        { t: "more", title: "How to pace the Scab (one adventuring day)", src: ["Eventyr"], blocks: [
          { t: "p", text: "Eventyr reads the chapter as one adventuring day, with an artificial long rest halfway: the Citadel itself restores the party. So the Scab is the party's last fight before a full restore. Three level-13 PCs cannot take every room." },
          { t: "list", items: [
            "{@b Do these:} S11 the statue, S13 the gnoll corridor and S14 the door. Those are the three real fights.",
            "{@b Cut or shorten these:} S3, S4, S5 and S9. Each has a stealth or talk way past it.",
            "{@b Run, do not fight:} S10, Crokek'toeck. The win is getting past it.",
            "{@b Talk, not fight:} S6 and S7. They are information and a hazard.",
            "{@b Every fight has an exit.} Fleeing, a bargain, the environment, or a way to stop it with a check."
          ] }
        ] }
      ]
    },

    // =====================================================================
    // 1 THE ROAD TO THE SCAB
    // =====================================================================
    {
      id: "the-road-to-the-scab",
      title: "The Road to the Scab",
      when: "",
      duration: "30 minutes",
      blocks: [
        { t: "read", text: "The road runs west and down, across black glass and old battlefields. Far ahead there is a hill that is the wrong shape. As you get closer you see it is not rock. It is a scab, a great pink crust the size of a mountain, with chains the thickness of towers running into it from every direction." },
        { t: "img", src: "art/generated/env-road-to-the-scab.webp", caption: "The road to the Scab.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "env", sight: "Burnt carts, a standard with the sun cut out, a hill that pulses very slightly.", sound: "Chains groaning under strain, a long way off.", smell: "Iron, old bread, rot under it.", feel: "The shard hums against your ribs. It is warm, and it tugs west." },

        { t: "h", text: "The Shard Leads" },
        { t: "p", text: "Lulu used to be the way to the Citadel. Now the shard is. It tugs toward the Scab like a compass needle that wants to go home. Do not tell them which way is right: let the hum say it." },
        { t: "list", items: [
          "{@b Carrying it.} Whoever carries it feels the pull in their hand. It gets warmer when they walk straight and cools when they stray.",
          "{@b Scouting.} Moonkite or a flyer can see the Scab for miles. The shard does not need that, but it is a nice way to give Aurora the lead.",
          "{@b If it is dropped, hidden or locked in a box.} The hum thins but does not stop. It cannot be fooled for long."
        ] },
        { t: "more", title: "How the shard stands in for Lulu", src: ["Eventyr", "Homebrew"], blocks: [
          { t: "p", text: "{@b Eventyr:} the shard can be the thing that guides the party and that opens the way, so the story does not depend on Lulu being alive and present. {@b Homebrew:} the shard hums when Zariel's will turns toward it, so her presence in scene 6 is felt through it." },
          { t: "p", text: "{@b Why this link exists:} Lulu is gone by default, and the road must still work. The shard is the cheapest honest answer." }
        ] },
        { t: "more", title: "If you don't want it: Lulu is still aboard", src: ["Homebrew"], blocks: [
          { t: "list", items: [
            "{@b She comes along.} Lulu leads, as in the book. She can feel Crokek'toeck and the way to the doors. The shard is just a warm bit of metal.",
            "{@b She is sick.} Lulu points the way but cannot go into the Scab. The shard does the rest, and the party is nervous without her.",
            "{@b She is a voice.} Lulu speaks through a sending or the ship's trumpet at set moments (S9, S14). Nice if you want Jeremy to have a job."
          ] }
        ] },

        { t: "h", text: "Avernus on the Road" },
        { t: "p", text: "Roll once, or pick. The road is short, so one encounter is plenty." },
        { t: "table", caption: "The Scab Road (d6)", head: ["d6", "Who", "What they want, and how it ends"], rows: [
          ["1", "A Blood War pack: 2 {@c vrock|vrocks} and a {@c hezrou|hezrou}", "They want a soul and a story. Fight, or lead them off with bait. The pack breaks when the hezrou falls."],
          ["2", "A {@c narzugon|narzugon} herald of Zariel", "A second writ. It counts who carries the shard and goes. It starts a fight only if someone raises a hand."],
          ["3", "A Bhaal cell hunting Drenwal: {@c bhaal-fanatic|fanatics}", "They want the Shield and the sigil. They are weak alone and dangerous in the dark. Drenwal's Gasp may fire here."],
          ["4", "Mahadi's caravan at the mouth of the road", "The last honest shop before the window. No fight. See {@side world-state|The World Right Now}."],
          ["5", "Haruman's leaderless riders", "Deserters and sell-swords: veterans and a knight. They will sell their loyalty to whoever holds the Haruman piece."],
          ["6", "A Cania envoy: {@c ice-devil-agent|the envoy}", "An offer that is true and poisoned. Mephistopheles wants the Shield. No fight unless they insult him."]
        ] },
        { t: "encounter", id: "road-pack", title: "Road encounter 1: the Blood War pack", combatants: [ { c: "vrock", n: 2 }, { c: "hezrou", n: 1 } ], notes: "Run the vrocks as one group with one initiative and one collective save, the hezrou on its own. To soften: cut one vrock. Exits: bait (a bleeding body on the road), the hezrou's fall, or Moonkite flying the pack off." },

        { t: "more", title: "Moonkite: The Bleeding Road (Beat S13)", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Trigger:} the first camp on the Scab road. {@b What happens:} it goes quiet for a long time, then: \"Something upstream bleeds. It smells like home, and it is wrong.\" It asks Aurora what colour the sky was where she was born, so it can remember its own." },
          { t: "p", text: "{@b Bond:} +1 for a real talk, +1 for asking about its past (once per bond level). Full rules and Shared Senses in {@side arc-moonkite|Arc: Aurora and Moonkite}." }
        ] },
        { t: "more", title: "Drenwal: a Gasp on the road", src: ["Homebrew"], blocks: [
          { t: "p", text: "If Drenwal is {@b bloodied} on the road, fire a Bhaal's Last Gasp: Constitution save, DC 14 at Tier II. The Gasp rules, the Watch pool and what each result does are in {@side arc-drenwal|Arc: Drenwal and the Hellrider Memories}. Do not repeat them here." }
        ] },

        { t: "choices", prompt: "The Scab is in front of them.", items: [
          { label: "On to the mouth of the Scab", goto: "the-mouth-of-the-scab" }
        ] }
      ]
    },

    // =====================================================================
    // 2 THE MOUTH OF THE SCAB
    // =====================================================================
    {
      id: "the-mouth-of-the-scab",
      title: "The Mouth of the Scab",
      when: "",
      duration: "20 minutes",
      blocks: [
        { t: "read", text: "Up close the Scab is not a hill but a wound the size of one. The skin of it is rust and rope, the swamp around it is red, and a great round mouth gapes near the top, ringed with chains. Gnolls are camped at its lip, laughing, and one of them is sharpening a bone on another's skull." },
        { t: "img", src: "art/generated/env-scab-mouth.webp", caption: "The mouth of the Scab.", credit: "Generated art." },
        { t: "env", sight: "A swamp of blood, a crust of red scab, black chains running into it. Gnolls round a fire of broken carts.", sound: "Gnoll laughter, chains, a slow wet drip.", smell: "Iron and copper and rot.", feel: "The ground is slightly warm and slightly wrong." },
        { t: "map", id: "the-scab-level-1-30x30", note: "Level 1: the entrance, the first pools and the Window (S1 to S5, by the pool rooms). Check the key on the map." },

        { t: "h", text: "The Gnolls Outside" },
        { t: "encounter", id: "mouth-gnolls", title: "Gnolls at the mouth", combatants: [ { c: "scab-gnoll", n: 6 }, { c: "gnoll-packlord", n: 1 } ], notes: "Eventyr's addition: gnolls outside, so the party earns the mouth. Six gnolls and a pack lord is a medium fight; cut to four gnolls if resources are low. Exits: sneak up the back (DC 14 Stealth as a group), bait them with a bleeding body, or climb past while Moonkite draws them off. They break when the pack lord falls." },

        { t: "h", text: "The Climb and the Dark" },
        { t: "checks", items: [
          { skill: "Athletics", dc: 15, who: "each climber", text: "Climb the outer scab to the mouth near the top. Optional: two checks. A first fail needs a DC 13 Dexterity save or a 50-foot fall; a second fail infects the climber with the scab's blood." },
          { skill: "Perception", dc: 12, who: "anyone", text: "The lower 100 feet is hard as rock (a 5-foot cube has AC 17, 18 hp). The upper 200 feet is soft (AC 9, 10 hp)." },
          { skill: "Arcana or Religion", dc: 14, who: "anyone", text: "The scab is the wound of something very old, which Avernus has been bleeding into for ages." }
        ] },
        { t: "note", title: "Inside the Scab", text: "{@b Darkness.} No light unless the area says so. {@b Surfaces.} Dug by demon claws. {@b Pools of blood} are difficult terrain; a creature in the blood makes a DC 13 Wisdom save or gains the flaw \"I am cruel and uncaring toward others\" for 8 hours (dispel evil and good ends it). {@b Tunnels} are 10 feet wide unless stated." },
        { t: "more", title: "Why the Scab is shaped like this", src: ["Book", "Eventyr", "Homebrew"], blocks: [
          { t: "p", text: "{@b Book:} the Scab is a mass of dried blood and flesh around the Bleeding Citadel, with demon-dug tunnels through it. {@b Eventyr:} the map is split into three levels from the cross-section, with the S13 corridor widened to make room for the gnoll fight." },
          { t: "p", text: "{@b Why this link exists:} so you can run the Scab as a dungeon with a map, rather than a cross-section drawing." }
        ] },
        { t: "choices", prompt: "The mouth is open.", items: [
          { label: "Down into the Scab: level 1", goto: "the-scab-level-1" }
        ] }
      ]
    },

    // =====================================================================
    // 3 THE SCAB, LEVEL 1 (S1 to S5)
    // =====================================================================
    {
      id: "the-scab-level-1",
      title: "The Scab, Level 1",
      when: "",
      duration: "40 minutes",
      blocks: [
        { t: "map", id: "the-scab-level-1-30x30", note: "Level 1. The pool rooms are S3, S4 and S5." },

        { t: "h", text: "Area S1 · The Oozing Entrance" },
        { t: "read", text: "A wound the width of a house yawns near the top of the scab, and the warm dark below it breathes." },
        { t: "img", src: "art/generated/env-scab-level-1.webp", caption: "Level 1: the Window in the wound.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "p", text: "A 20-foot-wide tube drops into the dark. Climbing down is easy (DC 12 Athletics, or a rope). At the bottom is the first pool of blood: this is where you remind them of the flaw rule." },

        { t: "h", text: "Area S2 · The Angelic Window" },
        { t: "read", text: "The scab has been clawed off one wall, and behind it is a pane of blue and gold glass in which an angel's face is looking a long way off." },
        { t: "p", text: "A 20-foot window, unbreakable, with abjuration magic in it. A good creature that touches it gains 20 temporary hit points, once per 24 hours. {@b Cost:} nothing. This is a free gift to show them the Citadel is real and listening." },
        { t: "more", title: "Why the window is here", src: ["Book", "Eventyr", "Homebrew"], blocks: [
          { t: "p", text: "The windows are the Citadel's: they show Zariel's fall in Yael's tour inside (see {@side the-sword-reforged|The Sword Reforged}). Plant the angel's face now so the tour pays off." }
        ] },

        { t: "h", text: "Area S3 · The Drowned Hag" },
        { t: "read", text: "Five goat-headed demons crouch round a pool of blood, watching a robed body float in it." },
        { t: "p", text: "A hag called Yiggleblight was helping Trantolox find Crokek'toeck, and he suspected treachery and had her drowned. {@b Treasure:} a 5,000 gp diamond and a flask of River Styx water in her robes; optionally a pair of dimensional shackles." },
        { t: "encounter", id: "s3-rot-demons", title: "S3 (optional): the rot demons", combatants: [ { c: "bulezau", n: 4 } ], notes: "Optional fight. Cut from five to four. Exits: the demons are intent on the body, so DC 13 Stealth as a group slips past; or Intimidation DC 15 shows them a bigger thing than themselves. A group of four shares one initiative and one save." },

        { t: "h", text: "Area S4 · The Bloody Downpour" },
        { t: "read", text: "Blood streams from a gaping wound in the ceiling into a pool that covers the floor, and something on the walls is watching you cross it." },
        { t: "p", text: "A 40-foot chamber. Barlguras have been invisible on the walls since they tore the wound; they attack when anyone enters and chase. Bandaging the ceiling wound takes a healer's kit, a DC 15 Medicine check and 5 minutes, and exposes the medic to the blood; cure wounds closes it too." },
        { t: "encounter", id: "s4-barlguras", title: "S4 (optional): the ambush on the walls", combatants: [ { c: "barlgura", n: 2 } ], notes: "Optional. Cut from three to two. Passive Perception 16 or an active DC 16 spots the ripple of their movement on the wall. They are invisible until they attack. Exit: leave the pool by the way you came; they will not leave the walls." },

        { t: "h", text: "Area S5 · The Food Fight" },
        { t: "read", text: "Two toad-bodied demons wade waist-deep in blood, bellowing as they claw at each other over a half-eaten bearded devil." },
        { t: "p", text: "Left alone, the fight goes on until one is dead and the other is down to 30 hit points. The party has advantage on Stealth to sneak past. {@b Treasure:} the corpse still clutches a +1 glaive." },
        { t: "encounter", id: "s5-hezrou", title: "S5 (optional): the hezrou pair", combatants: [ { c: "hezrou", n: 2 } ], notes: "Optional. If they start the fight, the hezrou are already hurt and turn on the party only if one is struck. Better: let them kill each other for free, then take on the winner at 30 hit points. Exit: sneak past with advantage, or bait one with the devil corpse." },

        { t: "more", title: "Moonkite and the Window", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Beat (optional):} Moonkite stops at S2. Its light brightens and it says, in Aurora's head: \"This is what the sky looks like when it is not red.\" No bond points, but it is a nice quiet moment." }
        ] },
        { t: "choices", prompt: "Level 1 is behind them.", items: [
          { label: "Down to level 2", goto: "the-scab-level-2" }
        ] }
      ]
    },

    // =====================================================================
    // 4 THE SCAB, LEVEL 2 (S6 to S10)
    // =====================================================================
    {
      id: "the-scab-level-2",
      title: "The Scab, Level 2",
      when: "",
      duration: "45 minutes",
      blocks: [
        { t: "map", id: "the-scab-level-2-30x30", note: "Level 2. The larder, the hag's lair, the diggers and Crokek'toeck's prison." },

        { t: "h", text: "Area S6 · The Torture Chamber" },
        { t: "read", text: "Two chains hang from the ceiling, ending in hyena skulls that bite into a screaming devil. Three horse-sized flies jab it with their mouthparts." },
        { t: "img", src: "art/generated/env-scab-level-2.webp", caption: "Level 2: chains, flies and bones.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "p", text: "{@c alazub|Alazub} (a barbed devil, down to 25 hit points) came to spy on Trantolox for Zariel. Three fly-demons (use giant wasp stats, or skip them) are torturing him for what he knows. Trantolox wants him to talk." },
        { t: "checks", items: [
          { skill: "Medicine", dc: 15, who: "anyone", text: "Remove a chain without hurting him. Otherwise a chain comes off as an action and deals 2d6 piercing damage to the devil. (Chains: AC 19, 15 hp, immune to cold, fire, poison and psychic.)" },
          { skill: "Deception vs Insight", dc: 13, who: "anyone", text: "Contested (DC 13 if you want a flat number). Convince him Zariel sent you. If it works he is relaxed; if not he wants a deal." },
          { skill: "Persuasion", dc: 15, who: "anyone", text: "He tells you that the demons found the Citadel's door but cannot get in, and that a shadow demon found Yeenoghu's lost beast and is trying to dig it free." }
        ] },
        { t: "p", text: "If they will not free him he offers his information for his freedom. Whatever they do, if they mention the Sword he will try to report to Zariel. That feeds scene 6." },

        { t: "h", text: "Area S7 · Trantolox's Larder" },
        { t: "read", text: "A roar of hellish flies over a floor of mutilated devils and gnawed bones; a hole in the middle shows another dark cavern below." },
        { t: "p", text: "A 20-foot cavern with the dead of three bearded devils, two barbed devils and a bone devil. Four swarms of insects attack anything that is not a fiend. {@b Cost:} the swarms. Fiends and anyone passing as one (Drenwal with the right mask?) are left alone. SRD swarm of insects; run the four as one group." },

        { t: "h", text: "Area S8 · The Hag's Lair" },
        { t: "read", text: "A tunnel two feet high leads to a cyst of bones and weeping sores, its niches full of stoppered flasks, black orbs and skulls." },
        { t: "p", text: "Yiggleblight's den. A DC 12 Investigation, or detect magic, finds the good loot: a heartstone shaped like a baby's fist, a stitched-flesh soul bag, an iron flask with a flesh golem in it, and three soul coins. Six poisons in finger-bone tubes. Three obsidian orbs worth 100 gp each. The rest is hag junk: a cowbell, a noose, nine gnoll skulls." },
        { t: "more", title: "Moonkite and the soul coins", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Beat (optional):} Moonkite hears the coins before anyone sees them: \"There is a man in that coin. He is counting.\" If Aurora frees a soul with its help, +1 Bond (honouring what it is, per {@side arc-moonkite|Arc: Aurora and Moonkite}). Burning one in front of it costs a point." }
        ] },

        { t: "h", text: "Area S9 · The Digging Demons" },
        { t: "read", text: "A mob of small grey demons claws and bites a hole into the floor, while a thing of shadow screams at them in Abyssal." },
        { t: "p", text: "From here the scab is hard as rock. {@c vatilan|Vatilan} (a shadow demon) and seven dretches are digging toward S10. The shard shivers in the carrier's hand, so hard it nearly slips: something huge is near. If attacked, Vatilan flies to S14 to warn Trantolox, which turns the last fight into an ambush." },
        { t: "encounter", id: "s9-diggers", title: "S9 (optional): the diggers", combatants: [ { c: "vatilan", n: 1 }, { c: "dretch", n: 7 } ], notes: "Optional. The seven dretches are one group (one initiative, one collective save); Vatilan is on his own. The fight's point is stopping Vatilan before he reaches S14. To shorten: cut to four dretches. Exit: slip past while they dig (DC 15 Stealth as a group) and let Vatilan stay busy." },

        { t: "h", text: "Area S10 · Crokek'toeck's Prison" },
        { t: "read", text: "Behind a thin wall of living scab something enormous breathes, wound in chains of its own pain." },
        { t: "p", text: "{@c crokek-toeck|Crokek'toeck} is held incapacitated and restrained here, behind a wall about 20 feet thick. If the wall is breached the beast is free, and it tunnels a 30-foot-wide passage and attacks whatever is in its path. Trantolox tries to command it and cannot. After three rounds Trantolox flees, and Crokek'toeck leaves to find Yeenoghu." },
        { t: "encounter", id: "s10-crokek", title: "S10 (run, do not fight): the beast breaks free", combatants: [ { c: "crokek-toeck", n: 1 } ], notes: "Not a fight to win: it is a Huge fiend, roughly CR 13, built to be survived. Run it as three rounds. It leaves after round 3, or sooner if it takes 100 damage, or if a bleeding decoy goes the other way. Escape routes: down the dug passage into S11, behind the chains in S7, or up the soft upper scab where it cannot burrow as fast. If a PC is swallowed, the party has one round of its next turn to pull them free (DC 18 Athletics)." },
        { t: "checks", items: [
          { skill: "Nature or Arcana", dc: 15, who: "anyone", text: "It follows blood, not sight. A bleeding decoy that runs the other way buys the party the round." },
          { skill: "Intimidation", dc: 20, who: "a bloodied PC", text: "Stare it down for one round. Only works while its master is not in earshot." },
          { skill: "Athletics or Acrobatics", dc: 14, who: "each runner", text: "Out-run it down its own passage without being grabbed." }
        ] },
        { t: "more", title: "Why it is here (and why it must leave)", src: ["Book", "Eventyr", "Homebrew"], blocks: [
          { t: "p", text: "{@b Book:} Crokek'toeck is a creature lost by Yeenoghu, imprisoned in the Scab. Trantolox's diggers are trying to free it. {@b Eventyr:} if you foreshadowed it, freeing it is a good moment to complicate the last fight. We use it as a chase, so the party meets a monster too big to beat and learns to survive one." },
          { t: "p", text: "{@b Why this link exists:} it sets up the Yeenoghu fight at Idyllglen, which is where the beast is going." }
        ] },

        { t: "choices", prompt: "Level 2 is behind them.", items: [
          { label: "Down to level 3", goto: "the-scab-level-3" }
        ] }
      ]
    },

    // =====================================================================
    // 5 THE SCAB, LEVEL 3 (S11 to S14)
    // =====================================================================
    {
      id: "the-scab-level-3",
      title: "The Scab, Level 3",
      when: "",
      duration: "60 minutes",
      blocks: [
        { t: "map", id: "the-scab-level-3-30x30", note: "Level 3. The statue, the offal heap, the widened gnoll corridor and the door." },

        { t: "h", text: "Area S11 · The Statue of Yeenoghu" },
        { t: "read", text: "A nine-foot idol of hulking scab-flesh stands in the middle of the room, and the gnolls and vulture-demons are dancing round it." },
        { t: "img", src: "art/generated/env-scab-level-3.webp", caption: "Level 3: the idol of scab-flesh.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "p", text: "Six gnolls and three vrocks cackle round the statue. It is carved of hard scab: AC 17, 60 hit points, immune to poison and psychic. Demons and gnolls within 30 feet gain 10 hit points at the start of their turn. When destroyed it explodes: every creature within 30 feet takes 4d10 piercing damage (DC 15 Dexterity halves)." },
        { t: "encounter", id: "s11-statue", title: "S11 (real fight): the statue", combatants: [ { c: "vrock", n: 2 }, { c: "scab-gnoll", n: 6 } ], notes: "Real fight. Cut from three vrocks to two. The statue heals them, so the party should destroy it first. The vrocks form one group, the gnolls another. Exits: break the statue from range (the explosion also hits them), or lead them out of its 30 feet." },
        { t: "more", title: "Who tells the party about the statue", src: ["Eventyr"], blocks: [
          { t: "p", text: "Lulu would explain the statue's power. Eventyr offers two replacements if she is not here: Gargauth in the Shield of the Hidden Lord can fill in (and enjoys it), or you simply describe dark energy seeping from the statue to the fiends and closing their wounds." }
        ] },

        { t: "h", text: "Area S12 · Trantolox's Chamber" },
        { t: "read", text: "A massive heap of bones and offal sits in the middle of an otherwise empty chamber." },
        { t: "p", text: "Nothing is here but the heap. A DC 12 Investigation finds an eversmoking bottle in the offal. This is a breather and a quiet room to hear what is coming: the gnolls in S13 are close." },

        { t: "h", text: "Area S13 · The Cackling Gnolls" },
        { t: "read", text: "A long corridor, and far down it, laughter and the click of claws on the scab." },
        { t: "p", text: "Targ Nar and his pack wait for anything that comes. If the party has no light and each makes a DC 10 Stealth check, the gnolls are surprised. The corridor is widened on the map, so the pack can come at them from more than one side." },
        { t: "encounter", id: "s13-gnolls", title: "S13 (real fight): the corridor", combatants: [ { c: "targ-nar", n: 1 }, { c: "gnoll-packlord", n: 4 } ], notes: "Real fight. Eventyr suggests replacing the fifteen mundane gnolls with pack lords; four pack lords and Targ Nar is a hard fight for three level-13 PCs with allies. The four pack lords are one group (one initiative, one collective save); Targ Nar is on his own. Exits: break the pack lords and the rest flee; fall back down the narrow tunnel so the pack comes at them one at a time." },

        { t: "h", text: "Area S14 · The Entrance to the Citadel" },
        { t: "read", text: "A wide cavern, and in its far wall two huge brass doors with a blindfolded angel carved on them. Demons are throwing themselves at the doors, and a fat, tusked thing with tiny wings is shouting at them." },
        { t: "p", text: "{@c trantolox|Trantolox} commands three {@c bulezau|rot demons} against the doors, which will not open to them. He has truesight to 120 feet. If Vatilan escaped from S9, they are ready and it is an ambush. If not, the party has the high ground and a moment." },
        { t: "p", text: "{@b Before the fight,} Trantolox sees them and speaks. He offers an alliance: the party opens the door (they are good-aligned, he is not), and they split what is inside. He is lying only about the split." },
        { t: "encounter", id: "s14-trantolox", title: "S14 (real fight): Trantolox at the door", combatants: [ { c: "trantolox", n: 1 }, { c: "bulezau", n: 3 } ], notes: "Real fight and the last one before the Citadel restores the party, so do not be shy. Trantolox is CR 13 but low on damage and not very durable against magic weapons. He pauses the fight to bargain if it starts badly. The rot demons are one group and fight to the death. If Crokek'toeck is loose, he flees toward it. Exits: a deal (see the choice below), his flight below 60 hit points, or Moonkite's light driving the bulezaus back." },
        { t: "more", title: "What Trantolox wants, and what he'll do for it", src: ["Homebrew", "Eventyr"], blocks: [
          { t: "p", text: "{@b Eventyr:} give the party a chance to talk to the treacherous Trantolox, who may pause a fight to bargain. {@b Homebrew:} he is a deserter from a Blood War warband who hopes to sell what is inside the Citadel to the highest archduke, and he knows Zariel's riders are coming." },
          { t: "list", items: [
            "{@b If they ally.} He takes his share and turns on them in the Citadel, or betrays them to Zariel.",
            "{@b If they refuse politely.} He fights, but lets the bulezaus take the first hits.",
            "{@b If they offer him something.} He gives the door a push and leaves. The bulezaus still fight."
          ] }
        ] },
        { t: "choices", prompt: "The door is quiet, or is not yet.", items: [
          { label: "A pool of blood goes still", goto: "zariels-presence-part-2" },
          { label: "Straight to the doors", goto: "the-gates-of-the-bleeding-citadel" }
        ] }
      ]
    },

    // =====================================================================
    // 6 ZARIEL'S PRESENCE, PART 2
    // =====================================================================
    {
      id: "zariels-presence-part-2",
      title: "Zariel's Presence, Part 2",
      when: "After the fight at S14, or whenever the party stops to breathe",
      duration: "15 minutes",
      blocks: [
        { t: "p", text: "Session 12 gave signs. This is the second beat: a presence, not a meeting. She does not enter the scene. She watches, and she lets them know it. Full guide in {@side zariel|Playing Zariel}." },
        { t: "img", src: "art/generated/env-zariels-presence.webp", caption: "Zariel, far down in the blood mirror.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "read", text: "The blood in the nearest pool stops moving. It goes flat and dark as a mirror, and in it, very far down, a woman stands with her back to you, hand resting where a sword would hang.\n\nShe does not turn. The shard in your pack goes quiet, as if it were holding its breath.\n\n\"I am told you carry something of mine,\" says a calm, tired voice, from everywhere at once. \"Bring it to me. Then I will tell you the cost of keeping what is yours.\"" },
        { t: "env", sight: "A pool of blood gone still as glass, a figure at the bottom of it with her back turned.", sound: "Nothing at all. The Scab holds its breath.", smell: "Cold iron, no rot, for the length of the voice.", feel: "The kind of attention you feel when a general reads your name off a list." },

        { t: "h", text: "What She Wants Them to Feel" },
        { t: "list", items: [
          "{@b Measured.} She has counted them, the way she counted everyone she ever led.",
          "{@b Invited, not threatened.} The terms are plain. She does not raise her voice, because she has never needed to.",
          "{@b Late.} She has been waiting a long time and is neither angry nor in a hurry."
        ] },
        { t: "p", text: "She asks for a parley, not a surrender. She does not repeat herself. If Alazub reported the Sword to her, she knows already which of them carries the shard, and she says so by naming the carrier's trade, never their name." },

        { t: "h", text: "What Lulu's Absence Means" },
        { t: "list", items: [
          "{@b If her riders have Lulu (default).} The voice stops. A second voice, small and clear, says one line in its own words: \"I am all right. Please be kind to her.\" It is the first sign Lulu is not a prisoner in the usual sense.",
          "{@b If Lulu is aboard.} She does not mention Lulu. Her silence is the loudest thing in the scene.",
          "{@b Either way,} the shard is the party's only way in, and Zariel has just told them she knows it."
        ] },
        { t: "checks", items: [
          { skill: "Insight", dc: 15, who: "anyone", text: "She is not lying. She never does. She is also not offering mercy; she is offering a schedule." },
          { skill: "History or Religion", dc: 17, who: "Drenwal or Aurora", text: "The way she stands is the way a commander stands after the roll is read and nobody answers. She is grieving, in her own manner." },
          { skill: "Persuasion", dc: 16, who: "anyone", text: "Ask her a real question. She will answer one, shortly, and the answer will be true." }
        ] },
        { t: "more", title: "If you don't want a presence here", src: ["Homebrew"], blocks: [
          { t: "list", items: [
            "{@b A dream instead.} She speaks at the next rest, not in the blood. Nobody sees her.",
            "{@b A mirror in the Citadel.} Hold her until the Citadel's windows, where she is just another figure in the glass.",
            "{@b Through the shard.} The shard hums and the carrier hears her; nobody else does."
          ] }
        ] },
        { t: "choices", prompt: "She is gone. The doors are still ahead.", items: [
          { label: "To the doors", goto: "the-gates-of-the-bleeding-citadel" }
        ] }
      ]
    },

    // =====================================================================
    // 7 THE GATES OF THE BLEEDING CITADEL
    // =====================================================================
    {
      id: "the-gates-of-the-bleeding-citadel",
      title: "The Gates of the Bleeding Citadel",
      when: "",
      duration: "15 minutes",
      blocks: [
        { t: "read", text: "The doors are brass, taller than a church, and a blindfolded angel is carved across both of them with her sword half out. The frame is gold runes. Even the rot of the Scab seems to keep back from them by a few paces." },
        { t: "img", src: "art/generated/env-citadel-gates.webp", caption: "The gates of the Bleeding Citadel.", credit: "Generated art (Codex, gpt-6-astra)." },
        { t: "env", sight: "Brass doors with a blindfolded angel, a frame of gold-inlaid runes, scab pulled back from the frame.", sound: "A very faint hymn, as if from the far end of a long hall.", smell: "Wax and clean stone, for the first time since the Crypt.", feel: "The shard in the carrier's hand is hot." },
        { t: "p", text: "The doors are indestructible and have abjuration on them. The runes carry a warning that only the pure of heart may part them. {@b In the printed adventure} a good-aligned creature opens them only with Lulu within 60 feet, and otherwise a voice offers to let them in if they bring her." },

        { t: "h", text: "Opening the Door with the Shard" },
        { t: "p", text: "Eventyr's \"Replacing Lulu\" option: the shard is the conduit. A good-aligned creature who carries it and presses a hand to the door opens it. If nobody carrying it is good, the door does not move; a voice asks for the shard to be given to someone who is." },
        { t: "list", items: [
          "{@b Who may open it.} Any good-aligned creature holding the shard. Drenwal, with his Shield, may have trouble; give the shard to someone else if that suits the story.",
          "{@b What the shard does.} It hums to the same rhythm as the hymn behind the door. When both reach the same beat, the doors part.",
          "{@b When the doors open.} S14 fills with bright light. Fiends and undead there take 8d10 radiant damage (DC 22 Constitution save halves). Check your allies: if any is a fiend or undead, warn them or move them."
        ] },
        { t: "note", title: "Gargauth and the Shield", text: "Drenwal's Shield holds Gargauth, a devil. The door's light does not pass through the Shield's face; Gargauth goes very quiet, and the metal grows briefly cold. Use this as a quiet scare, not a damage roll, unless the table wants one." },
        { t: "more", title: "If you don't want it: Lulu is here (or comes later)", src: ["Eventyr", "Homebrew"], blocks: [
          { t: "list", items: [
            "{@b Lulu is aboard.} The door opens as in the book: a good creature, with Lulu within 60 feet. The shard is a second key.",
            "{@b Lulu is Zariel's.} The door does not open for the shard alone: a voice says \"Bring Lulu here\" until the party makes a bargain with the riders waiting in the dark. This turns the end of the session into a deal.",
            "{@b Neither works.} The door opens for the sword's wielder-to-be only after Yael's ghost is satisfied. Add a skill check against the door's riddle."
          ] }
        ] },
        { t: "more", title: "Moonkite: The Gate Knows the Light (Beat S13)", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Trigger:} the gates. Moonkite's light flares on its own and the gate answers with a hum the party can feel. It asks Aurora whether to go in at all: \"It is the cage. I am afraid. I will go if you ask. I would rather you asked.\" It needs her to ask, not tell." },
          { t: "list", items: [
            "{@b Bond +2} (once) if she asks, lets it say no, and walks in beside it.",
            "{@b Bond -1} if she orders it through after it asked to wait.",
            "{@b Bond -3} if anyone offers it to Zariel or a devil as a price, even as a bluff."
          ] },
          { t: "p", text: "Full rules in {@side arc-moonkite|Arc: Aurora and Moonkite}. If Zariel looks at it, she knows what it is; she says nothing yet." }
        ] },
        { t: "more", title: "Sources and what the book gives you here", src: ["Book", "Eventyr"], blocks: [
          { t: "p", text: "The doors, the inscription and the light on opening are the printed adventure's. Eventyr's resource for Chapter 4 offers the shard-as-conduit replacement. See also {@side running-the-endgame|Running the Endgame}, section 3." }
        ] },

        { t: "read", text: "The doors part without a sound, and light pours out. It burns the blood and grit off your clothes. It burns the cold out of your bones. For the first time since you came into Avernus, you can feel your whole body.\n\nBeyond the doors is a cathedral. At the far end, on a dais, in a stone, a sword is glowing. And in front of it the air flickers, like a figure that has not yet decided to appear." },
        { t: "note", title: "Cliffhanger", text: "End on the glowing sword and the figure that is not there. Do not run Yael yet unless there is time: the session's job is done. Continue with {@side the-sword-reforged|The Sword Reforged} at the start of the next session." },
        { t: "choices", prompt: "The Citadel is open.", items: [
          { label: "Open The Sword Reforged", side: "the-sword-reforged" },
          { label: "End the session", goto: "ending" }
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
        { t: "p", text: "End on the open doors and the glowing sword. Read the outcomes that happened." },
        { t: "h", text: "Outcome: The Doors Open" },
        { t: "p", text: "They go in. The Citadel's light gives a full long rest, as in the printed adventure. This is the session's win. Run {@side the-sword-reforged|The Sword Reforged} next." },
        { t: "h", text: "Outcome: Trantolox Escaped" },
        { t: "p", text: "He is below 60 hit points and gone. He tells Zariel's riders where the shard is, or he sells it to Bel. He is back in Chapter 5 with a grudge." },
        { t: "h", text: "Outcome: They Made a Deal with Trantolox" },
        { t: "p", text: "He is inside the Citadel with them, or waiting at the door. He betrays them at the dais if the table likes that, or leaves if the offer was good." },
        { t: "h", text: "Outcome: Crokek'toeck Left" },
        { t: "p", text: "It is gone to find Yeenoghu. It will be at Idyllglen. The Scab has a 30-foot hole in it." },
        { t: "h", text: "Outcome: Alazub Reported" },
        { t: "p", text: "Zariel knows the party wants the Sword. The meeting in Chapter 5 starts with her already knowing." },

        { t: "h", text: "XP and Level" },
        { t: "p", text: "The printed adventure expects level 12 at the Citadel and 13 for the finale. This party is already 13." },
        { t: "list", items: [
          "{@b Default:} no level-up at the Citadel. The party stays 13, and you scale Chapter 5 up, not down: add a creature, raise a DC, or give an enemy legendary actions.",
          "{@b Reward instead:} the Citadel's full restore is the reward. Award story XP (an adventure-sized chunk) but do not level.",
          "{@b If the table wants a level:} give level 14 at the end of Idyllglen, and tune Chapter 5 to match."
        ] },

        { t: "note", title: "Remember for Next Time", text: "Write down: who carries the shard. Which Scab fights they did, skipped or fled. Whether Vatilan reached S14. Whether Alazub lived and what he heard. Whether Crokek'toeck was freed and which way it went. What Trantolox was offered, and whether he lived. Moonkite's bond points and any Gasp. Drenwal's Generals' Memories. Whether Lulu is with Zariel. Which allies are in the Citadel." }
      ]
    }
  ],

  side: {
    "the-sword-reforged": {
      title: "The Sword Reforged",
      blocks: [
        { t: "note", title: "The one-line version", text: "Inside the Citadel the party rests, meets Yael's ghost on a quiet tour, walks the Idyllglen vision with the shard as its key, and watches the shard fly back to the blade. Then someone picks the Sword up, or nobody does. It does not depend on Lulu." },

        { t: "h", text: "The Citadel in Brief" },
        { t: "list", items: [
          "{@b The light.} A restoring light burns the blood off them. They get the benefit of a long rest; this is the party's reward for the Scab.",
          "{@b The hall.} A cathedral with a path of pillars to a raised dais carved with Celestial runes. A longsword glows in a stone on top.",
          "{@b The inscription.} The dais warns that the hero who becomes one with the blade is no more. Read it as a hook, not a threat: it means the vision, not death.",
          "{@b Magic.} Detect magic finds abjuration and evocation on everything."
        ] },
        { t: "more", title: "Sources for the Citadel", src: ["Book", "Eventyr"], blocks: [
          { t: "p", text: "The layout, the long rest and the inscription are the printed adventure's. Eventyr's resource suggests giving the party a longer rest and a tour so the scene is not a rush into the vision. {@b Homebrew:} none here; it is the Book's room." }
        ] },

        { t: "h", text: "Yael's Ghost: The Quiet Tour" },
        { t: "p", text: "In the book Yael appears, points at Lulu, and the vision starts at once. Eventyr offers a quiet tour first, which means the vision does not depend on Lulu. Use it." },
        { t: "read", text: "A woman in plate armour, with a thin scar on her cheek, is standing beside you as if she had always been there. She is looking at the sword with sad eyes.\n\n\"It is beautiful, is it not,\" she says. \"I am afraid you cannot wield it. Yet.\"" },
        { t: "list", items: [
          "{@b Window 1: the fall.} An archdevil offers his hand to an angel. She takes it, and her wings wither and her halo becomes a ring of hellfire. \"It seemed sudden. It was the end of a promise she made long before.\"",
          "{@b Window 2: the Charge.} Zariel before her fall fights demons, with knights on horses beside her. \"We followed her into Hell because we believed in her.\"",
          "{@b Window 3: the hamlet.} A peaceful village on a sunny day, then fire. The ghost glows brighter. \"To wield the Sword, you must first understand its wielder.\" Then light, and the vision."
        ] },
        { t: "p", text: "She answers questions about who she is and why she is here. {@b Olanthius:} if the party met him in the Crypt, Yael knows his name and says it, and Drenwal hears the weight in her voice." },
        { t: "more", title: "Yael as the quiet guide", src: ["Eventyr", "Homebrew"], blocks: [
          { t: "p", text: "{@b Eventyr:} give Yael the tour so Lulu's memory is not required. {@b Homebrew:} the shard is the conduit, so when the vision starts it is the shard that opens it, not Lulu. If Lulu is aboard she can stand beside it and the memory is hers; if not, the memory belongs to the blade and the ghost." }
        ] },

        { t: "h", text: "The Idyllglen Vision" },
        { t: "map", id: "idyllglen-100x65", note: "Idyllglen: a hamlet on fire, a statue of Zariel in the square, the temple of Lathander as the safe place." },
        { t: "p", text: "The party stands at the edge of a burning village. The townsfolk are figments of the memory; deaths are real. Seven events happen. Eventyr and the community notes say to run only the ones that earn their time (three is plenty): one fight, one quiet break, one that matters." },
        { t: "table", caption: "The seven events", head: ["#", "Event", "Run it?"], rows: [
          ["1", "A hyena demon and a brave dog outside the temple.", "Skip, or a one-line opener."],
          ["2", "A six-armed marilith (Garoknul) attacks townsfolk. She teleports away at 50 hit points.", "Run it: a short, flashy fight."],
          ["3", "Five villagers, mad with demon ichor, attack. Killing one costs a Lulu-flavoured penalty in the book.", "Optional. Good moral test."],
          ["4", "An hour of calm. A voice tells them to rest.", "Run it as a breath, not a short rest."],
          ["5", "Barlgura and dretches west, gnolls south, a vrock overhead.", "Optional: run if you want a second fight."],
          ["6", "Yeenoghu arrives and attacks anyone, or the statue.", "Run it. Make the statue worth defending."],
          ["7", "Zariel arrives in a beam of light and drives Yeenoghu away. Time freezes.", "Run it. This is the heart of the vision."]
        ] },
        { t: "list", items: [
          "{@b Hazards.} The haze beyond the map and 120 feet up deals 4d10 psychic (DC 15 Wisdom halves). Burning buildings and trees deal 3d6 fire (DC 15 Constitution halves). Deaths inside are real and permanent.",
          "{@b Pacing.} For the Yeenoghu fight, make the Zariel statue something the party defends, so the fight matters. Zariel can be delayed to about round five for a strong party.",
          "{@b Time.} Run three events and the break. That is about an hour at the table."
        ] },
        { t: "more", title: "What Drenwal's Generals' Memories do here", src: ["Homebrew"], blocks: [
          { t: "p", text: "The payoff is in {@side arc-drenwal|Arc: Drenwal and the Hellrider Memories}: the table of memories held (0 or 1, 2 or 3, all 4) and what each changes at Idyllglen. Apply it at the start of the vision: advantage on the first save, Yael speaking to him by name, or the General's seat with one honest answer. Do not repeat the table here." }
        ] },
        { t: "more", title: "What the book says about Idyllglen", src: ["Book", "Eventyr"], blocks: [
          { t: "p", text: "A dream-vision of Zariel's last day as a hero. In the book it is Lulu's memory. Eventyr lists the seven events and the hazards. A DC 20 History or Religion check reveals that long ago gnolls attacked Idyllglen, a cleric of Lathander prayed, and Zariel and her riders came to the rescue." }
        ] },

        { t: "h", text: "The Shard Rejoins the Blade" },
        { t: "read", text: "Light flashes. You are back in the cathedral, on your knees in front of the dais, and the shard in your hand is lifting out of your palm. It rises and turns once in the air, and settles into the notch in the blade, and the crack closes like a mouth. The hum stops. The silence it leaves is enormous." },
        { t: "p", text: "{@b Ending of the vision.} Yael tells them what they have seen. In the book, Lulu remembers all of it and Yael fades with a word of luck. At our table Lulu may not be here, so Yael tells it, and Zariel's voice is what the party remembers. Play it as the moment hope arrives." },

        { t: "h", text: "Claiming and Attuning the Sword" },
        { t: "p", text: "Any character who survived the vision can draw the Sword. If it accepts them, it attunes at once. The wielder is the players' choice; do not decide it for them." },
        { t: "list", items: [
          "{@b The light.} When the Sword is drawn, the Citadel and the Scab outside burst into blinding light. Creatures in the Scab are hurled away and badly hurt; those inside the Citadel take no harm.",
          "{@b The wielder's pull.} The Sword is a legendary weapon, and its power presses on the wielder's alignment. Watch it: the endgame hinges on that shift.",
          "{@b The Sword's powers.} A radiant weapon against fiends, with an angelic edge and its own gifts. These are the printed item's; see it for the exact bonuses, extra damage, spells and drawbacks."
        ] },
        { t: "more", title: "The Sword's effects (the Book's item)", src: ["Book"], blocks: [
          { t: "p", text: "The Sword of Zariel is a legendary longsword with radiant power against fiends and an angelic character to it. Use the printed item for every number, spell and alignment rule: see the printed item for the full text. We do not reproduce it here." },
          { t: "p", text: "{@b Who it favours.} The Sword approves or it does not; if it does not, the draw fails. Let a refusal be a story beat, not a punishment." }
        ] },
        { t: "more", title: "If you don't want the Sword to be wielded", src: ["Eventyr", "Homebrew"], blocks: [
          { t: "list", items: [
            "{@b Nobody wants it.} It stays in the stone. The party can carry it unattuned as a delivery for Zariel, a bargaining chip, or a key for Chapter 5.",
            "{@b Zariel takes it.} If she is redeemed she takes the Sword. Eventyr suggests replacing it with a sun blade so nobody feels cheated.",
            "{@b It shatters.} If Zariel is destroyed the Sword bursts into shards with her. Eventyr suggests letting the wielder take an angelic form once a day for a minute, with truesight, flight and a high Charisma.",
            "{@b Share it.} Let two PCs share the attunement across a long rest; the Sword is too bright for any one of them."
          ] }
        ] },

        { t: "h", text: "Sources and Other Tables' Takes" },
        { t: "more", title: "Where this comes from", src: ["Book", "Eventyr", "Blog", "Forum"], blocks: [
          { t: "list", items: [
            "{@url https://www.goodreads.com/author_blog_posts/20913417-running-descent-into-avernus-chapter-4-and-5|Goodreads author blog repost, \"Running Descent into Avernus Chapter 4 and 5\"}",
            "{@url http://thecampaign20xx.blogspot.com/2019/09/dungeons-dragons-guide-to-baldurs-gate.html|The Campaign 20XX guide to the book}",
            "{@url https://thealexandrian.net/wordpress/47025/roleplaying-games/remixing-avernus-part-8-the-end|The Alexandrian, \"Remixing Avernus Part 8: The End\"}",
            "{@url https://www.dndbeyond.com/forums/dungeons-dragons-discussion/story-lore/190012-descent-into-avernus-alt-ending|D&D Beyond forum, \"Descent into Avernus alt ending\"}",
            "Eventyr Chapter 4 guide, \"DM's Resources for Chapter 4: Sword of Zariel\" (local library, search \"Idyllglen\", \"Yael\" and \"Bleeding Citadel\").",
            "More in {@side running-the-endgame|Running the Endgame}."
          ] }
        ] }
      ]
    }
  }
};
