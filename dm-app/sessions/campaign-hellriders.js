// Campaign-wide: the Hellriders. Olanthius (moved out of session 11), Veska and Ser Lucan as full allies,
// the Hellrider ghost and despairing wraith reskins, and the Drenwal arc (Generals' Memories + Bhaal's Last Gasps).
// Sessions reuse these blocks and override only tactics/description.
// Statistics for the ghost and wraith follow the openly licensed SRD chassis; every name, line and description is our own.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.creatures, {

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
      { name: "Longsword", art: "art/generated/olanthius-longsword.webp", text: "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 10 (1d8 + 6) slashing plus 22 (5d8) necrotic." },
      { name: "Hellfire Orb (1/Day)", art: "art/generated/olanthius-hellfire-orb.webp", text: "A ball of fire bursts at a point he can see within 120 ft. Each creature in a 20-ft. radius makes a DC 18 Dexterity saving throw: 35 (10d6) fire plus 35 (10d6) necrotic on a failure, half on a success. It spreads around corners." }
    ],
    bonus: [],
    legendary: {
      count: 3,
      intro: "Olanthius can take 3 legendary actions, one at a time, at the end of another creature's turn. He regains them at the start of his turn.",
      actions: [
        { name: "Longsword", art: "art/generated/olanthius-longsword.webp", cost: 1, text: "He makes one longsword attack." },
        { name: "Hold the Line", cost: 1, text: "He moves up to half his speed without provoking opportunity attacks, to stand between an enemy and a downed creature." },
        { name: "The Sun Will Hold", art: "art/generated/olanthius-the-sun-will-hold.webp", cost: 2, text: "Each undead of his choice within 60 ft. regains 20 hit points, and each creature he chooses within 30 ft. makes a DC 18 Wisdom saving throw or is frightened of him until the end of its next turn." }
      ]
    },
    reactions: [
      { name: "Parry", art: "art/generated/olanthius-parry.webp", text: "Adds 6 to his AC against one melee attack that would hit him. He must see the attacker and hold a melee weapon." }
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

  "veska": {
    name: "Veska",
    kind: "veska",
    role: "Hellrider sergeant of the Crimson Watch. Fearless, blunt, a rite-keeper",
    source: { page: "bestiary", name: "Veteran", src: "MM" },
    homebrew: "Built on the Monster Manual veteran, raised to CR 7 so she helps a 13th-level party without taking the spotlight: one big attack round, a rally, and a reaction. No spells. Her fear immunity and her rite work (officiating Drenwal's rebirth, re-consecrating a cracked sigil) are story, not stat block.",
    npc: false,
    sizeType: "Medium humanoid (human), lawful good",
    ac: 19, acNote: "splint armour, shield",
    hp: 119, hpFormula: "14d8 + 56",
    speed: "30 ft.",
    abilities: { str: 18, dex: 12, con: 18, int: 11, wis: 14, cha: 14 },
    saves: "Con +7, Wis +5, Cha +5", skills: "Athletics +7, Insight +5, Religion +3",
    vulnerable: "", resist: "", immune: "", condImmune: "frightened",
    senses: "passive Perception 12",
    languages: "Common, Infernal",
    cr: "7", xp: 2900, pb: 3,
    traits: [
      { name: "Unbroken Vigil", text: "Veska can't be frightened. She has advantage on saving throws against being charmed by fiends." },
      { name: "Watch-Keeper's Eye", text: "She knows a Bhaalspawn or a cultist of Bhaal on sight within 60 ft. if she can see them, even disguised. (Story use: she clocked Drenwal at once.)" }
    ],
    actions: [
      { name: "Multiattack", text: "Two Oath-Blade attacks, or two Heavy Crossbow attacks." },
      { name: "Oath-Blade", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) slashing damage, plus 5 (1d10) radiant damage if the target is a fiend or an undead." },
      { name: "Heavy Crossbow", text: "Ranged Weapon Attack: +4 to hit, range 100/400 ft., one target. Hit: 6 (1d10 + 1) piercing damage." }
    ],
    bonus: [
      { name: "Rally the Line (3/Day)", text: "One ally within 30 ft. who can hear her ends the frightened condition on itself and gains 8 (1d8 + 4) temporary hit points." }
    ],
    reactions: [
      { name: "Sergeant's Rebuke", text: "When a creature she can see within 5 ft. of her attacks one of her allies, she makes one Oath-Blade attack against that creature." }
    ],
    tactics: [
      "She holds the front beside the party's tank and rebukes anything that swings at a softer ally. She does not chase.",
      "Rally the Line the moment a PC or ally is frightened. Against ghosts and dragons it is her best action.",
      "Against fiends and undead her blade adds radiant damage, so point her at ghosts, wraiths and devils first.",
      "She will not leave Drenwal's side if the sigil cracks. If he is possessed, she is the one who says the watchword and puts a hand on the sigil.",
      "At a quarter hit points she falls back to the nearest ally who can heal, and says so."
    ],
    description: "A broad woman in a dented splint cuirass, her Hellrider tabard faded to the colour of old brick. She keeps her helmet under one arm, and her eyes never stop moving, counting the exits and the people she is responsible for.",
    roleplay: [
      "Appearance: broad shoulders, close-cropped dark hair, a scar through one eyebrow, a Crimson Watch sun-and-sword badge worn smooth by her thumb.",
      "Voice: plain, short, an old oath's cadence. She never raises it. When she is moved she gets quieter.",
      "Wants: to see the Watch's creed protected from the rot inside it, and to see Drenwal through, whichever way that goes. Open question: does she shield him, or watch him?",
      "Knows: the cult inside the Watch, the rites for the sigil, how her mother swore the Creed. Halvard did not fall at the Wall.",
      "Sample line: \"I don't need you unafraid. I need you here.\""
    ]
  },

  "ser-lucan": {
    name: "Ser Lucan the Reforged",
    kind: "ser-lucan",
    role: "Old Crimson Watch knight on Gondian legs. The party's shield",
    source: { page: "bestiary", name: "Knight", src: "MM" },
    homebrew: "Built on the Monster Manual knight, raised to CR 7 as a defender, not a striker. His whole job is to stand in front of someone. Gondian legs and Keep the Watch are our own. He is deliberately a bad choice to target: it is his job to be hit.",
    npc: false,
    sizeType: "Medium humanoid (human, part construct), lawful good",
    ac: 20, acNote: "plate, shield",
    hp: 127, hpFormula: "15d8 + 60",
    speed: "30 ft.",
    abilities: { str: 19, dex: 10, con: 18, int: 10, wis: 13, cha: 12 },
    saves: "Str +7, Con +7, Wis +4", skills: "Athletics +7, History +3",
    vulnerable: "", resist: "", immune: "poison", condImmune: "poisoned",
    senses: "darkvision 60 ft., passive Perception 11",
    languages: "Common",
    cr: "7", xp: 2900, pb: 3,
    traits: [
      { name: "Gondian Legs", text: "He can't be knocked prone, and difficult terrain from rubble, brambles or ash doesn't slow him." },
      { name: "Keep the Watch", text: "Reaction. When a creature he can see within 5 ft. is hit by an attack, he becomes the target instead and takes the hit. He can do this once per round." },
      { name: "Sigil Trick (1/Day)", text: "As a bonus action he touches a willing creature and traces a sun-and-sword on its skin. The next saving throw that creature makes within 24 hours against an effect from a Bhaal-aligned creature or source gets a +1 bonus." }
    ],
    actions: [
      { name: "Multiattack", text: "Two Warhammer attacks." },
      { name: "Warhammer", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) bludgeoning damage." },
      { name: "Shield Bash (Recharge 5-6)", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage, and the target must succeed on a DC 15 Strength saving throw or be pushed 5 ft. and knocked prone." }
    ],
    bonus: [], reactions: [],
    tactics: [
      "Before initiative, ask which ally he is guarding. It is Jeremy at the Core, the casters and the gun crews first, and Drenwal if the sigil is cracked.",
      "Keep the Watch every round it is up. He will take a dragon's bite meant for a wizard without comment.",
      "Shield Bash on anything that has reached a squishy ally. Prone devils are easy prey for the rest of the party.",
      "He does not retreat while someone he is guarding is in danger. If he drops, he says only: \"Keep the watch.\"",
      "Sigil Trick on Drenwal before any fight where Dumal or a Bhaalspawn is expected."
    ],
    description: "A knight in old Hellrider plate, one gauntlet bright, the rest scoured to a dull brown. Below the faulds he walks on Gondian legs of brass and gears, quiet and exact, and he never seems to tire.",
    roleplay: [
      "Appearance: silver beard cut short, a face weathered and calm, legs of brass piston and gear. The plate has been mended in a dozen different metals.",
      "Voice: slow, courteous, a man long out of practice at speech. He says \"my lord\" and \"my lady\" without irony.",
      "Wants: to finish Halvard's last errand: Find him. Find Dumal. Save him.",
      "Knows: the Watch before the rot. He remembers Halvard as a young man, and the Wall. He was fused into thorns for thirty years and does not dwell on it.",
      "Sample line: \"Keep the watch. That is all the creed ever asked. It is also the whole of it.\""
    ]
  },

  "hellrider-ghost": {
    name: "Hellrider ghost",
    kind: "hellrider-ghost",
    role: "A rider of the First Charge whose soul was bottled in an urn",
    source: { page: "bestiary", name: "Ghost", src: "MM" },
    homebrew: "SRD ghost chassis, CR 4. Frightful Visage and Possession DCs are 14 instead of 13 for a 13th-level table. Added Bound to Its Urn. Tuning: 6 ghosts and 3 wraiths is a hard fight for the party with two allies; use the group-initiative house rule (one initiative, one collective save per group of identical monsters).",
    npc: false,
    sizeType: "Medium undead, lawful neutral",
    ac: 11, acNote: "",
    hp: 45, hpFormula: "10d8",
    speed: "0 ft., fly 40 ft. (hover)",
    abilities: { str: 7, dex: 13, con: 10, int: 10, wis: 12, cha: 17 },
    saves: "", skills: "",
    vulnerable: "", resist: "acid, fire, lightning, thunder; bludgeoning, piercing and slashing from nonmagical attacks", immune: "cold, necrotic, poison",
    condImmune: "charmed, exhaustion, frightened, grappled, paralyzed, petrified, poisoned, prone, restrained",
    senses: "darkvision 60 ft., passive Perception 11",
    languages: "Common, and whatever it knew in life",
    cr: "4", xp: 1100, pb: 2,
    traits: [
      { name: "Ethereal Sight", text: "It sees 60 ft. into the Ethereal Plane while on the Material Plane, and the reverse." },
      { name: "Incorporeal Movement", text: "It can move through creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object." },
      { name: "Bound to Its Urn (homebrew)", text: "If an intact urn holding its soul is within 120 ft., a ghost reduced to 0 hit points re-forms at the urn in 1d4 rounds with half its hit points. An action to bless the urn or break it (DC 14 Wisdom (Religion) check, or the watchword said aloud by a Hellrider) frees the soul for good." }
    ],
    actions: [
      { name: "Withering Touch", art: "art/generated/hellrider-ghost-withering-touch.webp", text: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) necrotic damage." },
      { name: "Etherealness", art: "art/generated/hellrider-ghost-etherealness.webp", text: "It enters the Ethereal Plane from the Material Plane, or the reverse. In the Border Ethereal it is visible on the Material Plane, and the reverse, but cannot affect or be affected by anything on the other plane." },
      { name: "Horrifying Visage", art: "art/generated/hellrider-ghost-horrifying-visage.webp", text: "Each non-undead creature within 60 ft. that can see the ghost must succeed on a DC 14 Wisdom saving throw or be frightened for 1 minute. If the save fails by 5 or more, the target also ages 1d4 x 10 years (greater restoration reverses this within 24 hours). A frightened target repeats the save at the end of each of its turns. On a success, or when it ends, the target is immune to this ghost's Visage for 24 hours." },
      { name: "Possession (Recharge 6)", art: "art/generated/hellrider-ghost-possession.webp", text: "One humanoid the ghost can see within 5 ft. must succeed on a DC 14 Charisma saving throw or be possessed: the ghost vanishes and the target is incapacitated and loses control of its body. The ghost controls it, using the target's statistics but not its knowledge or class features, and cannot be targeted except by effects that turn undead. It lasts until the body drops to 0 hit points, the ghost ends it as a bonus action, or it is turned or forced out (dispel evil and good works). The target is immune for 24 hours afterwards." }
    ],
    bonus: [], reactions: [],
    castLines: [
      { spell: "Horrifying Visage", line: "The rider's helm tips back. Under it there is no face, only the last second of a charge: a mouth open mid-shout, eyes fixed on something enormous." },
      { spell: "Possession", line: "A cold hand presses to the chest. A cold voice asks, quite politely, if it may borrow the saddle." },
      { spell: "Withering Touch", line: "A gauntlet that was once warm, reaching out as if to steady a friend who is falling." }
    ],
    tactics: [
      "They fight as a unit: one initiative for the group, one collective save. They do not scatter.",
      "Horrifying Visage the first round to break the front line, then Withering Touch on whoever is frightened.",
      "Possession goes on the PC with the best weapon attack. The possessed one is not out of the fight, only out of control.",
      "If the party names a rider from the wall, speaks the watchword, or gives a Hellrider's honours at an urn, one ghost stops and listens. This is a way to shorten the fight.",
      "They were riders, not murderers. Once their urn is blessed they go quietly, and often say thank you."
    ],
    description: "A mounted shape of pale light stands over the urn it was bottled in, the ghost of a rider who never left the saddle. The tabard is a clean white. The sun-and-sword on it is the only part of him that is not fading.",
    roleplay: [
      "Appearance: translucent rider's mail, a helm with no face, a sun-and-sword badge that burns faintly.",
      "Voice: a distant shout carried on a cold wind, in the cadence of the Charge.",
      "Wants: to finish the ride, or to be let off it.",
      "Sample line: \"The sun will hold. The sun will hold. Why will the sun not hold?\""
    ]
  },

  "despairing-wraith": {
    name: "Despairing wraith",
    kind: "despairing-wraith",
    role: "A Hellrider who despaired inside the Crypt and was never laid to rest",
    source: { page: "bestiary", name: "Wraith", src: "MM" },
    homebrew: "SRD wraith chassis, CR 5. Added Weight of Despair. Story reason it can be in the Crypt at all: the ban on evil keeps out what enters, but these riders despaired inside, so nothing ever came in. They are grief, not malice.",
    npc: false,
    sizeType: "Medium undead, neutral",
    ac: 13, acNote: "",
    hp: 67, hpFormula: "9d8 + 27",
    speed: "0 ft., fly 60 ft. (hover)",
    abilities: { str: 6, dex: 16, con: 16, int: 12, wis: 14, cha: 15 },
    saves: "", skills: "",
    vulnerable: "", resist: "acid, cold, fire, lightning, thunder; bludgeoning, piercing and slashing from nonmagical attacks not made with silvered weapons", immune: "necrotic, poison",
    condImmune: "charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained",
    senses: "darkvision 60 ft., passive Perception 12",
    languages: "the languages it knew in life",
    cr: "5", xp: 1800, pb: 3,
    traits: [
      { name: "Incorporeal Movement", text: "It can move through creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object." },
      { name: "Sunlight Sensitivity", text: "In sunlight it has disadvantage on attack rolls, and on Wisdom (Perception) checks that rely on sight." },
      { name: "Weight of Despair (homebrew)", text: "A hostile creature that starts its turn within 10 ft. of the wraith has its speed reduced by 10 ft. until the start of its next turn. It is the weight of a dead man's grief, and works on anyone." }
    ],
    actions: [
      { name: "Life Drain", art: "art/generated/despairing-wraith-life-drain.webp", text: "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 21 (4d8 + 3) necrotic damage. The target must succeed on a DC 14 Constitution saving throw or its hit point maximum is reduced by the damage taken, until it finishes a long rest. It dies if this reduces its maximum to 0." },
      { name: "Create Specter", art: "art/generated/despairing-wraith-create-specter.webp", text: "It targets a humanoid within 10 ft. that has been dead no longer than 1 minute and died violently. The spirit rises as a specter in the corpse's space (or the nearest free space), under the wraith's control. No more than 7 specters at a time." }
    ],
    bonus: [], reactions: [],
    castLines: [
      { spell: "Life Drain", line: "It does not strike. It leans in, as someone does to rest, and the warmth leaves the room." },
      { spell: "Create Specter", line: "A fallen shape sits up beside its own body, looking puzzled, and then turns, with the same patient fury, to look at you." }
    ],
    tactics: [
      "They float in behind the ghosts. Weight of Despair makes the front line stick, so the ghosts keep their grip.",
      "Life Drain goes on a character who is already hurt, not the healthiest. It prefers whoever looks tired.",
      "Create Specter only if someone dies. Do not invite it: it is a cruel option, and the Crypt does not need to be crueller.",
      "A wraith does not flee. If its brothers are laid to rest, it hesitates, and a good appeal (DC 16 Wisdom (Religion or Persuasion)) can let it go.",
      "Silvered or magical weapons work as the SRD wraith. Radiant damage and turn-undead effects work, and the light looks like forgiveness."
    ],
    description: "A ragged cloak of dark, drifting where no wind blows, with a rider's helm in it and nothing inside the helm. Where it passes, the cold candles flicker, and every sound goes slower and heavier.",
    roleplay: [
      "Appearance: a Hellrider's tabard turned grey, a helm full of shadow, hands that end in strands of dark.",
      "Voice: hollow and level, as if reading a long list of names.",
      "Wants: for someone to say that the ride was not for nothing. Nobody ever has.",
      "Sample line: \"We rode in. We were told we would ride out.\""
    ]
  }

});

Object.assign(window.CAMPAIGN.side, {

  // ---------------------------------------------------------------------------
  // Drenwal: the Hellriders trained Bhaalspawn, and the Kept Watch sigil is their tool.
  // ---------------------------------------------------------------------------
  "arc-drenwal": {
    title: "Arc: Drenwal and the Hellrider Memories",
    blocks: [
      { t: "p", text: "Two tracks for {@b Drenwal} that run through the Crypt and out to the Citadel. {@b The Generals' Memories} open while he is still in the Crypt: four visions of the riders who once leashed the blood he carries, each with a small boon, and they pay off at Idyllglen. {@b Bhaal's Last Gasps} begin only once he steps back out into Avernus, as he prepares for the third sigil. They use the existing meters from his sigil notes: Bhaal's Claim, the Watch pool, the Marks, and the cracked-sigil rule." },
      { t: "note", title: "Run it in one breath", text: "In the Crypt: solve a puzzle, Drenwal gets a memory (a short read-aloud) and a small boon. Outside the Crypt: when he is bloodied, drained or cracked, Bhaal reaches for him. One save. A pass is a small win. A fail costs him, and you decide whether he refuses it." },

      { t: "more", title: "The new canon, in plain words", src: ["Homebrew"], blocks: [
        { t: "p", text: "{@b The Hellriders trained Bhaalspawn as their ultimate weapons, and they tamed the blood.} Zariel's order did not only kill what Bhaal made. It took the children, kept the watch over them night after night, and taught the blood to heed a leash. The Kept Watch sigil is the leash itself: the Hellriders' taming tool." },
        { t: "p", text: "{@b Why this link exists:} so that Drenwal's sigil has a history, so the Crypt can hand him something real, and so Bhaal has a reason to reach for him whenever the leash is weak." },
        { t: "p", text: "{@b What it means at the table:} when Drenwal is weakened (bloodied, the Watch pool empty, or the sigil cracked), the blood remembers it was once a weapon, and Bhaal can reach him through the same door the Hellriders used." },
        { t: "more", title: "Optional extension: the Three Sigils as the cult's corruption", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Suggestion, not decided.} The Hellriders designed only the first sigil, the leash. The cult inside the Crimson Watch later added two more, and turned the taming tool into a way to master the blood. That is how the cult made Dumal." },
          { t: "p", text: "{@b Why bother:} it makes Drenwal's choice a real one. The leash is the order's honour, and the Three Sigils are the order's rot, drawn on the same body. Drop it if the DM would rather the Sigils stay a cult invention from nowhere." }
        ] }
      ] },

      { t: "h", text: "The Generals' Memories" },
      { t: "p", text: "Four memories, one for each general who once kept the watch. Each opens when the Crypt gives Drenwal a way to touch what they left behind. The puzzle assignments below are suggestions, so move them to match the scenes you actually run. A memory costs him a short moment of absence: his body stands still for a few heartbeats while the vision plays." },
      { t: "table", caption: "The four memories", head: ["#", "General", "Opens when", "Boon (small)"], rows: [
        ["1", "Zariel as commander", "He solves the Generals' Seats puzzle (any tier).", "{@b Banner Discipline.} 1/long rest: an ally within 30 ft. who can hear him adds his Wisdom modifier (minimum +1) to a saving throw against fear or charm."],
        ["2", "Haruman", "The Roll of the Charge, or the first reading of the order's annals.", "{@b Hard Lesson.} 1/long rest: after seeing the roll, he may add +2 to a Last Gasp save."],
        ["3", "Olanthius", "The Scales of Mercy, or Olanthius letting him read the journal.", "{@b Kneeling Vigil.} Advantage on the Constitution save at the end of Mark of the Watch."],
        ["4", "Yael", "The Hellrider Archive, once Olanthius's journal has been read in full.", "{@b Weight Carried.} 1/long rest: when a Last Gasp save fails by 5 or more, treat it as failing by less than 5."]
      ] },
      { t: "note", title: "DM tip", text: "Hand out the boons as scraps of the memory, not as a list: a sentence of the vision, then one line of mechanics. The player writes down what they got." },

      { t: "more", title: "Memory 1: Zariel as commander", src: ["Homebrew"], blocks: [
        { t: "read", text: "A muster-yard under a sky that is still blue. Hundreds of riders in clean white tabards stand in lines you can feel more than see. A woman in white-and-gold armour walks the line, wings folded, and every rider she passes stands a little straighter.\n\nShe does not raise her voice. \"Mercy is a thing you carry,\" she says. \"It is not a thing you hand out.\"\n\nHer hand rests on your shoulder. You are certain she would die for any rider here. You are also certain she is already counting how many she will have to spend." },
        { t: "p", text: "{@b What it gives him:} how Zariel commanded, and the first sign that her love and her arithmetic were never separate. Zariel's fall is Book canon; this vision is Homebrew." },
        { t: "p", text: "{@b Why this link exists:} it makes Zariel a person before she becomes an enemy, which the Chapter 5 confrontation needs." }
      ] },
      { t: "more", title: "Memory 2: Haruman", src: ["Homebrew"], blocks: [
        { t: "read", text: "A cold yard. A boy of about twelve sits cross-legged on the flagstones in a rider's tabard far too big for him, his hands bound in front of him with a loop of iron chain. A broad, scarred man kneels in front of him.\n\nHe draws a sun and a sword on the boy's palm in ash. \"We keep,\" he says. \"You rest.\"\n\nThe boy's eyes go black. They come back. The man does not flinch, and does not stop. \"Again,\" he says." },
        { t: "p", text: "{@b What it gives him:} the taming drill, the nightly watch and the four words. This is the origin of the Kept Watch sigil, as the Hellriders practised it. In the printed adventure Haruman is Zariel's loyal general and one of the Fallen Three, whom the party has already killed; the drill is Homebrew." },
        { t: "p", text: "{@b Why this link exists:} Haruman is dead and cannot teach, but a dead man's memory can. It is also the first hint that Drenwal's sigil is a Hellrider tool." }
      ] },
      { t: "more", title: "Memory 3: Olanthius", src: ["Homebrew"], blocks: [
        { t: "read", text: "A gate in red light. A man with a shield on his arm sits beside a sleeping child at a campfire and does not blink. The fire burns down. The sky does not change. He is still awake.\n\nOn the fortieth night the child stirs and asks him why he is not tired. \"Because you are still here,\" he says, \"and someone has to be glad about that.\"\n\nYou feel the effort in him, and the love under the effort." },
        { t: "p", text: "{@b What it gives him:} the other half of the taming: the watcher's patience. In the printed adventure Olanthius is a Hellrider who became a death knight guarding the road to the Citadel, and the vigil here is Homebrew." },
        { t: "p", text: "{@b Why this link exists:} it explains why Olanthius kneels, and why he can recognise Drenwal's sigil when he sees it." }
      ] },
      { t: "more", title: "Memory 4: Yael", src: ["Homebrew"], blocks: [
        { t: "read", text: "Fire in your hands though nothing is burning. You are carrying something much heavier than it looks, and it hums against your palms. A golden shape presses against your leg and says, \"I have the rest. Walk.\"\n\nBehind you a gate closes on a man who does not follow. You feel the exact moment she decides not to look back." },
        { t: "p", text: "{@b What it gives him:} the weight of the Sword and the cost of carrying it. In the printed adventure Yael and Lulu carry the Sword of Zariel out of Hell; the memory itself is Homebrew." },
        { t: "p", text: "{@b Why this link exists:} Yael is the only general who kept the Sword, and Idyllglen is her place. Drenwal carries her weight before he meets her ghost." }
      ] },

      { t: "more", title: "Payoff at Idyllglen", src: ["Book", "Homebrew"], blocks: [
        { t: "p", text: "{@b Book:} Idyllglen is the dream-vision the party walks into at the Citadel when the Sword is claimed. {@b Homebrew:} the more memories Drenwal holds, the more of the vision is his to walk." },
        { t: "table", head: ["Memories held", "What changes at Idyllglen"], rows: [
          ["0 or 1", "He watches as a stranger. Nothing changes."],
          ["2 or 3", "He stands in the line of riders. Yael's shade speaks to him by name, and he has advantage on his first save in the vision."],
          ["All 4", "He is given the General's seat. The vision's shades hear him before anyone else, the party has advantage on the vision's first check or save, and Yael answers one question truthfully."]
        ] },
        { t: "p", text: "{@b Why this link exists:} so the Crypt puzzles are not a side trip. They decide how the Citadel's climax lands for Drenwal." }
      ] },

      { t: "h", text: "Bhaal's Last Gasps" },
      { t: "p", text: "A Gasp is Bhaal reaching for Drenwal through the old taming door. They do not start inside the Crypt, where the vigil is still alive. They begin the first time Drenwal steps out into Avernus (Session 12, scene 7), and run until he is reborn or masters the blood." },
      { t: "table", caption: "Triggers (any one starts a Gasp)", head: ["Trigger", "When it fires", "Limit"], rows: [
        ["Bloodied", "At the end of any turn on which Drenwal took damage and is at or below half his hit points.", "Once per long rest"],
        ["Watch pool empty", "The moment he spends his last Watch charge, or at dawn with none left.", "Once per long rest"],
        ["Sigil cracked", "The moment the sigil cracks, and again each dawn while it stays cracked.", "Once per trigger, then once per dawn"]
      ] },
      { t: "p", text: "{@b The save.} Constitution, DC 12 + the sigil tier he has reached (Tier II = DC 14). Advantage while the sigil is uncracked. +2 to the DC if two triggers are live at once. +2 if Dumal or another Bhaalspawn is within a mile (Bhaal-Sight tells him)." },
      { t: "table", caption: "What happens", head: ["Result", "Effect", "Feeds"], rows: [
        ["Success", "A cold flicker. Nothing else. Bhaal feels the door was shut.", "Counts as a denied Bhaal save: two successes make one Watch Mark. Coram +1 if he used no Watch charge."],
        ["Fail by 1 to 4", "{@b Finish It.} On his next turn he must use his action to attack, or cast a damaging spell at, the nearest creature below half hit points (friend or foe). He can refuse by spending a Watch charge.", "Bhaal's Claim +4. If he obeys against a surrendered, helpless or allied target: 1 Blood Mark. If he refuses by spending a charge to spare: Coram +1 and no Claim from the charge."],
        ["Fail by 5 or more", "{@b Relapse.} Bhaal seizes his body, as in the possession beat. He is DM-controlled until he is subdued, or an ally says the watchword and puts a hand on the sigil (DC 14 Wisdom (Religion) or Charisma (Persuasion)). The sigil cracks, if it was not already.", "Bhaal's Claim +8, 1 Blood Mark. Veska can re-consecrate the sigil and scrub the Blood Mark if he repents."]
      ] },
      { t: "list", items: [
        "{@b Loop warning.} Refusing Finish It spends a charge, which may empty the pool and trigger the next Gasp. That is the point. A tired watcher is the one in danger.",
        "{@b The cracked-sigil rule is unchanged:} powers offline until re-consecrated. The Gasp only adds a reason for the crack to hurt.",
        "{@b The boons help:} Hard Lesson (+2 to a Gasp save), Weight Carried (a bad relapse becomes a lesser failure) and Kneeling Vigil (advantage on the Mark of the Watch save) are the Memories' return on investment.",
        "{@b Allies:} Veska knows the words. Ser Lucan's Sigil Trick gives a +1 on the next save against Bhaal-aligned effects, so use it before a fight."
      ] },
      { t: "read", text: "It begins with a breath that is not yours. It comes in slow, old, patient, and it smells of salt and rust. It is not a voice. It is the shape a voice would take if the god behind it had died, and the dying had not finished." },
      { t: "more", title: "How the Gasp feeds Claim and Marks", src: ["Homebrew"], blocks: [
        { t: "p", text: "{@b Claim.} Failures raise Bhaal's Claim by 4 or 8. Successes raise nothing, since the sigil is doing its job and the Claim no longer rises from temptation alone. The existing crack and relapse line (around 65) still applies." },
        { t: "p", text: "{@b Marks.} A Gasp is a way to earn either kind. Resisting counts toward Watch Marks. Obeying against a helpless target, or a relapse, earns a Blood Mark. These are the same Marks the sigil already advances on, so nothing new needs tracking." },
        { t: "p", text: "{@b Why this link exists:} it gives Bhaal something to do between Dumal scenes, so the Claim moves even when Dumal is offstage, and it keeps the leash-or-master choice in front of Drenwal at the moments he is weakest." }
      ] }
    ]
  }

});
