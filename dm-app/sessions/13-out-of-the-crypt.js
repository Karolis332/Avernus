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
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 14. Sigil of the Binding (Tier II). Carries the Shield of the Hidden Lord." },
    { id: "aurora", name: "Aurora", note: "Archfey Warlock 14. Rides Moonkite." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 14. Tiamat's curse: 0 gold scales. Carries the Soul Capacitor." }
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
    // ---- Stygian Dock fight (S13, written at the table 2026-11-08): Kreeg at home + his wardens ----
    "kreeg": Object.assign({}, window.CAMPAIGN.creatures.kreeg, {
      homebrew: window.CAMPAIGN.creatures.kreeg.homebrew + " Session 13 (party level 14 with two CR 10 allies and a warship, fresh from killing two adult dragons): at home on his Dock he gains Ledger Unbound (a second phase at 171 hit points) and a fourth legendary action in that phase. Numbers otherwise unchanged.",
      traits: window.CAMPAIGN.creatures.kreeg.traits.concat([
        { name: "Ledger Unbound (homebrew, second phase)", text: "The first time Kreeg drops to 171 hit points or fewer, every ledger in the tollhouse bursts open and the pages pour out around him. Until he dies or escapes: {@b (1)} a 15-ft. storm of pages moves with him; it is difficult terrain, and a creature that enters it or starts its turn there makes a DC 20 Dexterity saving throw, taking 17 (5d6) slashing damage on a failure or half as much on a success; {@b (2)} his Forgetfulness recharges on a 4–6; {@b (3)} he can take 4 legendary actions instead of 3. Read it aloud: \"Every name in Elturel,\" he says, \"and every one of them paid.\"" },
        { name: "Master of the Dock (homebrew)", text: "While Kreeg is on the Dock, devils on it have advantage on saving throws against being frightened or charmed, and he always knows where each of them is." }
      ]),
      tactics: [
        "Round 1: he talks while the wardens act. Command (\"Kneel\") on the biggest fighter, suggestion on Veska (\"Put the sword down, rider; your mother is on page four thousand and eleven\").",
        "Forgetfulness on Lulu, or whoever carries her, or whoever holds the Sword shard. In phase two it comes back fast: use it every time it recharges.",
        "Poison Mind on clustered casters (three targets, DC 22 Wis, 5d12 necrotic and blinded). Strike from the Record on the healer.",
        "Dominate monster on the strongest melee PC or ally, and walk them to the wharf edge.",
        "Dockmaster's Order every turn on the chain devils: chains grab, then drag toward the edge.",
        "Below 100 hit points he offers terms: his signature, for his life. He means it, this once. At 0 he uses the Escape Clause into the ledger room under the tollhouse."
      ]
    }),

    "dock-chain-warden": {
      name: "Chain Warden (Chain Devil)",
      kind: "chain-devil",
      role: "Kreeg's dock warden: keeps the barge chains, and the ships tied to them",
      source: { page: "bestiary", name: "Chain Devil", src: "MM" },
      homebrew: "Monster Manual chain devil (CR 8) raised to about CR 10 for a level-14 party: 136 HP, +10 to hit, grapple escape DC 17, Unnerving Mask DC 16, and it can animate the Dock's mooring chains (up to six, Huge ones) and the river chain.",
      npc: false,
      sizeType: "Medium fiend (devil), lawful evil",
      ac: 17, acNote: "natural armor",
      hp: 136, hpFormula: "16d8 + 64",
      speed: "30 ft.",
      abilities: { str: 20, dex: 15, con: 18, int: 11, wis: 12, cha: 14 },
      saves: "Con +8, Wis +5, Cha +6",
      skills: "Athletics +9",
      resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
      immune: "fire, poison",
      condImmune: "poisoned",
      senses: "darkvision 120 ft., passive Perception 11",
      languages: "Infernal, telepathy 120 ft.",
      cr: "10", xp: 5900, pb: 4,
      traits: [
        { name: "Devil's Sight", text: "Magical darkness doesn't impede its darkvision." },
        { name: "Magic Resistance", text: "It has advantage on saving throws against spells and other magical effects." }
      ],
      actions: [
        { name: "Multiattack", text: "Two Chain attacks, plus one attack with each animated chain." },
        { name: "Chain", text: "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 13 (2d6 + 6) slashing damage. The target is grappled (escape DC 17) if the devil isn't already grappling a creature. Until the grapple ends, the target is restrained and takes 7 (2d6) piercing damage at the start of each of its turns." },
        { name: "Animate Chains (recharges after a short or long rest)", text: "Up to six chains it can see within 60 ft. sprout razor barbs and animate under its control (mooring chains, barge chains, the river chain). Each is an object with AC 20, 25 hit points, resistance to piercing damage and immunity to psychic and thunder damage. Each animated chain can make one Chain attack (reach 10 ft. from the chain) when the devil uses Multiattack. A Huge mooring chain that hits the Lady Vengeance instead {@b moors her}: she can't move until the chain is destroyed or the helm wins a Strength contest (ship Str 22 vs. the devil's Athletics +9). A chain reduced to 0 hit points falls inanimate." }
      ],
      reactions: [
        { name: "Unnerving Mask", text: "When a creature it can see starts its turn within 30 ft. of it, it shows that creature the face of a loved one or a hated enemy. The creature makes a DC 16 Wisdom saving throw or is frightened of the devil until the end of its turn. For Or'Henn, the face is his old master behind the screen; for Veska, her mother." }
      ],
      tactics: [
        "One warden on the wharf, one on the moored barges. Round 1: Animate Chains. Moor the Lady Vengeance first, then grab whoever is nearest the edge.",
        "Drag grappled creatures toward the water: a creature pushed or dragged off the wharf falls into the Styx (the DC 15 Intelligence save, and lair-action feeblemind)."
      ],
      description: "A tall devil wrapped head to toe in barbed chain, links of black iron grown into its skin. The chains clink when it breathes. It wears no face of its own: when it looks at you, it wears one of yours."
    },

    "bazelsteen": {
      name: "Bazelsteen (Horned Devil Mechanic)",
      kind: "horned-devil",
      role: "Zariel's dockmaster of machines at the Stygian Dock (book p. 123). Would rather tinker than fight",
      source: { page: "bestiary", name: "Horned Devil", src: "MM" },
      homebrew: "Book: a horned devil (CR 11) who runs the Stygian Dock's repairs. Raised to about CR 14 for a level-14 party: 250 HP, AC 19, +12 to hit, DC 18 tail wound, Hurl Flame 6d6, and two legendary actions from his tools.",
      npc: true,
      sizeType: "Large fiend (devil), lawful evil",
      ac: 19, acNote: "natural armor, oil-black",
      hp: 250, hpFormula: "20d10 + 140",
      speed: "20 ft., fly 60 ft.",
      abilities: { str: 24, dex: 17, con: 24, int: 18, wis: 16, cha: 17 },
      saves: "Str +12, Dex +8, Wis +8, Cha +8",
      skills: "Arcana +9, Investigation +9",
      resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
      immune: "fire, poison",
      condImmune: "poisoned",
      senses: "darkvision 120 ft., passive Perception 13",
      languages: "Infernal, telepathy 120 ft.",
      cr: "14", xp: 11500, pb: 5,
      traits: [
        { name: "Devil's Sight", text: "Magical darkness doesn't impede his darkvision." },
        { name: "Magic Resistance", text: "He has advantage on saving throws against spells and other magical effects." },
        { name: "Machine Whisperer", text: "He knows every infernal war machine and ship on sight: its weak points, its upgrades, and how much it would fetch." }
      ],
      actions: [
        { name: "Multiattack", text: "Three melee attacks: two with his fork and one with his tail. He can use Hurl Flame in place of any melee attack." },
        { name: "Fork", text: "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 16 (2d8 + 7) piercing damage." },
        { name: "Tail", text: "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 11 (1d8 + 7) piercing damage. The target (not undead or a construct) makes a DC 18 Constitution saving throw or loses 10 (3d6) hit points at the start of each of its turns from an infernal wound. Each further hit raises the wound by 10 (3d6). A DC 12 Medicine check (action) or any magical healing closes it." },
        { name: "Hurl Flame", text: "Ranged Spell Attack: +9 to hit, range 150 ft., one target. Hit: 21 (6d6) fire damage. A flammable object that isn't worn or carried ignites." }
      ],
      legendary: {
        count: 2,
        intro: "Bazelsteen can take 2 legendary actions, at the end of another creature's turn.",
        actions: [
          { name: "Wrench", cost: 1, text: "One war machine or ship within 30 ft. regains 4d10 hit points, or loses 10 ft. of speed until his next turn (he knows where to hit)." },
          { name: "Coal Spit", cost: 2, text: "He spits his red-hot coal: 15-ft. cone, DC 18 Dexterity saving throw, 14 (4d6) fire damage, half on a success." }
        ]
      },
      tactics: [
        "He does not want this fight. He wants a test crew. He fights demons first, intruders second, and the party last.",
        "If the test run succeeded and Kreeg moves on the party, he takes the party's side for 2 rounds: the bathysphere is his, and so are its pilots.",
        "Below 125 hit points he flies to the fortress (or away) and comes back with 3 barbed devils."
      ],
      description: "A big horned devil black with engine oil from horns to tail, chewing a shard of red-hot coal that smokes between his teeth. Tools hang from his belt where other devils hang skulls."
    },

    "glabrezu-ravager": {
      name: "Glabrezu Ravager",
      kind: "glabrezu",
      role: "The raid's demon: lands on the barge to cut the bathysphere's chain (book p. 124)",
      source: { page: "bestiary", name: "Glabrezu", src: "MM" },
      homebrew: "Book: a glabrezu (CR 9). Raised to about CR 12 for a level-14 party: 230 HP, +11 to hit, pincers 2d10 + 7, grapple escape DC 17, spell DC 18.",
      npc: false,
      sizeType: "Large fiend (demon), chaotic evil",
      ac: 18, acNote: "natural armor",
      hp: 230, hpFormula: "20d10 + 120",
      speed: "40 ft.",
      abilities: { str: 24, dex: 15, con: 22, int: 19, wis: 17, cha: 16 },
      saves: "Str +11, Con +10, Wis +7, Cha +7",
      skills: "Athletics +11",
      resist: "cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks",
      immune: "poison",
      condImmune: "poisoned",
      senses: "truesight 120 ft., passive Perception 13",
      languages: "Abyssal, telepathy 120 ft.",
      cr: "12", xp: 8400, pb: 4,
      traits: [
        { name: "Innate Spellcasting", text: "Intelligence (spell save DC 18). At will: {@spell darkness}, {@spell detect magic}, {@spell dispel magic}. 1/day each: {@spell confusion}, {@spell fly}, {@spell power word stun}." },
        { name: "Magic Resistance", text: "It has advantage on saving throws against spells and other magical effects." }
      ],
      actions: [
        { name: "Multiattack", text: "Four attacks: two with its pincers and two with its fists. Or two pincer attacks and one spell. Or the Cut the Chain action and one pincer attack." },
        { name: "Pincer", text: "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) bludgeoning damage. A Medium or smaller target is grappled (escape DC 17). Each pincer can grapple one target." },
        { name: "Fist", text: "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 11 (2d4 + 6) bludgeoning damage." },
        { name: "Cut the Chain", text: "It snips at the bathysphere's chain: DC 20 Strength check (+11). On a success the chain parts and the bathysphere sinks to the riverbed. A creature can shield the chain: then the glabrezu must instead destroy a chain segment (AC 19, 40 hit points) first." }
      ],
      tactics: [
        "Turn 1: Cut the Chain. It keeps trying every turn. Three turns, then Bazelsteen returns and drives it off.",
        "Darkness on the crane operator; power word stun on anyone with fewer than 150 hit points who stands between it and the chain."
      ],
      description: "A dog-headed demon twice a man's height, with two great crab pincers and a second pair of small human hands folded at its belly."
    },

    "fortress-bone-devil": {
      name: "Fortress Bone Devil",
      kind: "bone-devil",
      role: "One of three bone devils that circle Zariel's flying fortress while it refuels (book p. 123)",
      source: { page: "bestiary", name: "Bone Devil", src: "MM" },
      homebrew: "Monster Manual bone devil (CR 9) raised to about CR 12 for a level-14 party: 190 HP, +10 to hit, sting 2d8 + 6 plus 5d6 poison, DC 17.",
      npc: false,
      sizeType: "Large fiend (devil), lawful evil",
      ac: 19, acNote: "natural armor",
      hp: 190, hpFormula: "20d10 + 80",
      speed: "40 ft., fly 40 ft.",
      abilities: { str: 22, dex: 16, con: 18, int: 13, wis: 14, cha: 16 },
      saves: "Int +5, Wis +6, Cha +7",
      skills: "Deception +7, Insight +6",
      resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
      immune: "fire, poison",
      condImmune: "poisoned",
      senses: "darkvision 120 ft., passive Perception 12",
      languages: "Infernal, telepathy 120 ft.",
      cr: "12", xp: 8400, pb: 4,
      traits: [
        { name: "Devil's Sight", text: "Magical darkness doesn't impede its darkvision." },
        { name: "Magic Resistance", text: "It has advantage on saving throws against spells and other magical effects." }
      ],
      actions: [
        { name: "Multiattack", text: "Three attacks: two with its claws and one with its sting." },
        { name: "Claw", text: "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 10 (1d8 + 6) slashing damage." },
        { name: "Sting", text: "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (2d8 + 6) piercing damage plus 17 (5d6) poison damage, and the target makes a DC 17 Constitution saving throw or is poisoned for 1 minute. It repeats the save at the end of each of its turns." }
      ],
      tactics: [
        "They guard the fortress, not the dock. They come down only if someone fights near the fortress, flies close to it, or raises an alarm.",
        "If Lulu is seen, they take her alive: grapple and fly for the fortress."
      ],
      description: "A tall skeletal devil with skin stretched tight over its bones, a scorpion's tail curled over its back, wings like torn sails."
    },

    // Copied from Session 11 (the Dock's wharf watch), for Passing the Stygian Dock.
    "barbed-devil": {
      "name": "Barbed Devil (Dock Guard)",
      "kind": "barbed-devil",
      "role": "Wharf guard at the Stygian Dock",
      "source": {
        "page": "bestiary",
        "name": "Barbed Devil",
        "src": "MM"
      },
      "npc": false,
      "sizeType": "Medium fiend (devil), lawful evil",
      "ac": 15,
      "acNote": "natural armor",
      "hp": 110,
      "hpFormula": "13d8 + 52",
      "speed": "30 ft.",
      "abilities": {
        "str": 16,
        "dex": 17,
        "con": 18,
        "int": 12,
        "wis": 14,
        "cha": 14
      },
      "saves": "Str +6, Con +7, Wis +5, Cha +5",
      "skills": "Deception +5, Insight +5, Perception +8",
      "vulnerable": "",
      "resist": "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
      "immune": "fire, poison",
      "condImmune": "poisoned",
      "senses": "darkvision 120 ft., passive Perception 18",
      "languages": "Infernal, telepathy 120 ft.",
      "cr": "5",
      "xp": 1800,
      "pb": 3,
      "traits": [
        {
          "name": "Barbed Hide",
          "text": "At the start of each of its turns, it deals 5 (1d10) piercing to any creature grappling it."
        },
        {
          "name": "Devil's Sight",
          "text": "Magical darkness doesn't impede its darkvision."
        },
        {
          "name": "Magic Resistance",
          "text": "Advantage on saving throws against spells and other magical effects."
        }
      ],
      "actions": [
        {
          "name": "Multiattack",
          "text": "Three melee attacks (one Tail, two Claw), or two Hurl Flame."
        },
        {
          "name": "Claw",
          "text": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing."
        },
        {
          "name": "Tail",
          "text": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing."
        },
        {
          "name": "Hurl Flame",
          "text": "Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire. Flammable objects not worn or carried catch fire."
        }
      ],
      "bonus": [],
      "reactions": [],
      "tactics": [
        "Shove intruders toward the edge of the wharf. One step more and it is the Styx.",
        "If Kreeg falls below half, they stop fighting and wait to see who their new master is."
      ],
      "description": "A tall red devil covered in thorns, standing very still on the wharf with its arms folded.",
      "roleplay": [
        "Bored. Counts barges. Speaks only to say a number."
      ]
    },


    "arkhan-the-cruel": Object.assign({}, window.CAMPAIGN.creatures["arkhan-the-cruel"], {
      castLines: [
        { spell: "Vecna's Grip", line: "He does not raise the black hand. He closes it, slowly, around nothing, and something across the yard closes around you." },
        { spell: "Branding Smite", line: "Fane-Eater lights from the inside, the colour of an old sunrise, and the air near it sweetens like a church." },
        { spell: "Geas", line: "\"Walk with me,\" he says, \"and be glad of it.\" The words sit in your head like a nail someone has politely hammered in." },
        { spell: "Revivify", line: "A cold thumb on a dead brow. \"Not yet,\" says Arkhan, to the corpse, as if it had asked to leave." },
        { spell: "Teleport (Hand of Vecna)", line: "He bows to the doorway, all courtesy, and is simply not on the ridge any more." }
      ],
      tactics: [
        "Session 13. He cannot cross the Cold Line, the edge of the frost outside the doorway, and he does not try. He stands one step beyond it, patient, and talks; the cold carries his voice down the stair to the C1 gates. He is the siege.",
        "The vial of Tiamat's blood is spent: the party poured it into Uldrak. Or'Henn's curse is his last road to his queen. He wants the party dead, except two: Or'Henn alive as a hostage, and Drenwal alive to cast.",
        "His plan: take Or'Henn, Geas Drenwal into calling a gold dragon, and hold Fane-Eater at Or'Henn's throat until Or'Henn asks that dragon for help. The curse jumps and Tiamat wakes. See Arkhan's Plan in {@scene wings-at-the-door|Wings at the Door}.",
        "He keeps his word to the letter and never lies. The orb no longer buys anything from him. His one offer: \"Send me the druid and the priest, and the rest of you walk.\"",
        "He does not fight at the door. If the ward falls (6 of 6), he walks in with Krull and goes for Or'Henn, not the kill: Vecna's Grip, a grapple, then back up the stair and out past the line. The fight is {@scene the-breakout|The Breakout}. It is not a fight to win: the exits are the win.",
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
        "Strafes anyone who crosses the line with a Lance Dive, then climbs out of reach. He will chase a flying PC (Moonkite) for a mile.",
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
        "Session 13. Flash (red) clings to a spur of black rock just outside the line, level with the carved sun over the doorway, and glares at it. He cannot enter. He is the proudest and the first to snap.",
        "Frightful Presence on anyone who looks up. Fire breath at any PC who walks out across the frost toward the line. Arkhan has forbidden breath down the stair: it could kill Or'Henn.",
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
          "{@b 2 · Wings at the Door (30 min).} Arkhan's offer, what they see at the door (each object and where they saw it before), the ward, Vermilius's kindness.",
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
          "{@b The Crypt's ward:} start it at {@b 2 of 6} unless you tracked it in Session 12. What it is, how to describe it and what ticks it: {@scene wings-at-the-door|Wings at the Door}.",
          "{@b Uldrak} is at Bel's Forge. Read {@scene uldraks-cue|Uldrak's Cue} before play.",
          "The wider world is in {@side world-state|The World Right Now}."
        ] },

        { t: "h", text: "What They Carry Out" },
        { t: "p", text: "The objects that matter tonight, where the party got them, and what each one does at the door. Check the sheets for who holds what." },
        { t: "table", caption: "Objects of interest the party carries", head: ["Object", "Where it came from", "Why it matters tonight"], rows: [
          ["Orb of Dragonkind", "It sat in the pommel of Uldrak's sword at the Grave. Uldrak gave it to them as payment for the vial (Session 10).", "Arkhan can feel it. It can lead the dragons away (exit A), reach Uldrak (cue 2), and it holds a dragon of its own (Scenario E). Holding it takes attunement and a DC 15 Charisma check."],
          ["The shard of the Sword of Zariel", "Olanthius picked it up off the field the day Zariel fell and kept it for a hundred years. He gave it to them in the Crypt.", "It glows like a coal that will not go out and pulls toward the Citadel (DC 15 Arcana). Zariel's writ asks for it by name. Olanthius's condition: a Hellrider carries it, not a devil, a god or a dragon."],
          ["Tiamat's mark (0 gold scales)", "Or'Henn's curse, since the Monument.", "Silent inside the Cold Line; outside, Tiamat's Pull starts again. It moves only to a dragon that willingly takes it (DM ruling 2026-11-08)."],
          ["Soul Capacitor (Asimov)", "Asimov died fighting Dumal, and his soul was saved in it. Or'Henn carries it.", "Asimov goes quiet inside the line. The moment Or'Henn steps past it, the soul-traffic of Avernus floods back in. Suggestion: the first thing Asimov hears is riders in white and gold asking after a hollyphant (foreshadows {@scene zariel-notices|Zariel Notices})."],
          ["Shield of the Hidden Lord", "Drenwal's. Gargauth, an outcast archdevil, is bound inside it.", "Mephistopheles wants it. His envoy may be waiting at the foot of the hill once the dragons leave ({@c ice-devil-agent|Cania's Envoy})."],
          ["Sigil of the Binding (Tier II)", "Drenwal's leash on Bhaal's blood. Only the kinslaying is left.", "Inside the Crypt the Hellriders' vigil holds Bhaal back. Outside, only the sigil does: {@scene bhaals-first-gasp|Bhaal's First Gasp}."],
          ["Sun Blade (if taken)", "The Urn Hoard, Session 12.", "Radiant. The lance head in Slarkas's chest burns when it comes near, and everyone can see him flinch."]
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
        { t: "p", text: "{@b Where everyone stands.} The party is inside the C1 gates at the foot of the 40-foot stair. The gates are shut, as they left them. At the top of the stair is the granite doorway they came in by, with the rider, the lance and the rising sun carved over it. Outside the doorway the frost runs about 60 feet out, with the two rows of kneeling dead on it, and ends at the Cold Line, the edge of the ward (Session 11). Everything evil waits beyond that edge. {@b The frost is safe ground:} the party can walk out among the kneeling knights and talk to Arkhan face to face, a step apart, with the line between them. He does not knock. He speaks, and the cold carries his voice down the stair like a voice down a well. If the party will not open the gates, he talks through them and the scene runs the same, but they see the dragons only when someone climbs the stair. When they open the gates and climb, read:" },
        { t: "map", id: "crypt-of-the-hellriders-40x30", note: "C1, at the top of the map: the gates, and the 40-foot stair up to the doorway and the cold line." },
        { t: "read", text: "The gates of the Crypt swing in. The stair climbs forty feet above you to the granite doorway, and the doorway is full of red sky.\n\nAt the top you come out onto the frost. The kneeling dead are still there in their two long rows, heads bowed, as they were when you came. At the far end of the rows the frost stops, as clean as a line drawn with a rule, and beyond that line the sky is full of wings.\n\nOn the west ridge a black dragon the size of a barn lies with its chin on its claws. High above, a blue one cuts slow circles, lightning crawling on its wings. A green one has settled nearest the line and sits quite still, head tilted, as if it were listening to music from a house it has not been invited into. A red one clings to a spur of black rock beside the line, level with the carved sun over the door, and glares at it. To the north, on a hill, a great white shape with an old tortle on its back.\n\nAnd at the end of the rows, one step outside the line, a tall dragonborn in black plate. The left side of his face is grey. Fane-Eater hangs at his hip, and his hands are open at his sides: one scaled, one black and shrivelled, stapled on at the wrist.\n\n\"Good morning,\" says Arkhan the Cruel. \"You had something of mine. A little red glass. You poured it into a dead giant.\" He smiles with the half of his face that can. \"I am not angry. I want you to know that.\"" },
        { t: "img", src: "art/generated/event-crypt-wings-at-the-door.webp", caption: "Arkhan at the cold line, his dragons behind him.", credit: "Generated art (gpt-image-2.5)." },
        { t: "env", sight: "Five dragons in a ring beyond the line; the kneeling dead on the frost; Arkhan's grey half-face turned away from the light.", sound: "Wings. The ward's low hum, like one held note. Krull's prayers, very faint.", smell: "Smoke, old meat, incense from the north hill. On the frost side, clean cold stone.", feel: "Everyone outside is patient. That is the frightening part." },

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
            "{@b Take the hostage.} Or'Henn by choice. Any PC will do if it makes Or'Henn ask, because the asking can be for someone else. Arkhan can only take someone who comes past the Cold Line, or after the ward falls. Vecna's Grip (DC 22 Constitution, restrained and silenced) holds them, then he drags them away from the line.",
            "{@b Bind the priest.} He casts {@spell geas} on Drenwal (DC 22 Wisdom): call a gold dragon. Acting against it costs 5d10 psychic damage, once a day. If the Geas fails, the blade at the hostage's throat is the order instead.",
            "{@b The call.} Drenwal's 6th-level spell is {@spell planar ally}. By the rules it brings a celestial, an elemental or a fiend, so a gold dragon is a DM's ruling: Drenwal's god sends one, because a priest is begging. Divine Intervention also works if it lands (14% at level 14).",
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
          { skill: "Arcana", dc: 15, who: "anyone", text: "The ward is the Crypt's grief holding a line. It is cracked, not broken, and it weakens in steps you can feel in your teeth. Tell them how many of the 6 are gone." }
        ] },

        { t: "more", title: "Moonkite at the door", src: ["Homebrew"], blocks: [
          { t: "p", text: "Moonkite speaks to Aurora alone, softly: \"He is at the door. He is not angry. He is patient. That is worse.\" No bond change. It should make her player look at the door and think about what Arkhan wants from her." }
        ] },

        { t: "h", text: "Where Each One Waits" },
        { t: "list", items: [
          "{@c skarrix|Slarkas} (black). The west ash ridge, crouched low like a skull in a swamp. Sullen. Spits acid at the line to see who flinches. Charges any Hellrider banner. Radiant hurts him.",
          "{@c vhennic|Vistalancer} (blue). Circling high, steel-capped horn glinting. Reports to Arkhan. Strafes anyone who crosses the line. The easiest to turn: show him the odds.",
          "{@c mirelle|Vermilius} (green). Nearest the cold line, perched and still, crest raised. The kindest voice outside. Speaks to Or'Henn alone. Arkhan's black handprint is on her throat.",
          "{@c praxamor|Flash} (red). A rock spur just outside the line, level with the carved sun, rearing and roaring. Proud. First to snap. Fire breath at anyone on the frost. Call him small and he breaks ranks.",
          "{@c obatala|Obatala} and {@c krull|Krull}. The north hill. Krull counts minutes. Obatala does not move unless Krull clicks his tongue."
        ] },

        { t: "h", text: "What They Can See at the Door" },
        { t: "p", text: "Every object out here is something the party has seen before, or something tied to a story they already know. Each box below has a line to read when someone looks closely, where they saw it before, what it is tied to, and how it plays tonight. Open the ones the players look at." },

        { t: "more", title: "The kneeling dead on the frost", src: ["DiA Ch. 3", "Homebrew"], blocks: [
          { t: "read", text: "Two long rows of knights kneel in the frost, heads bowed, exactly as they were when you came. Their plate is the faded white and gold of Elturel, rimed with ice. Through the gap in one visor you can see bone. None of them have moved in a hundred years." },
          { t: "list", items: [
            "{@b Seen before:} Session 11, on the walk in to the Cold Line. These are Hellriders who died outside the Crypt; their armour is their casket, and their bones stay upright inside it, as if in prayer (the book).",
            "{@b Tied to:} the First Charge. Their names are on the C2 walls, and their brothers' ashes were in the urns the party broke open in Session 12. Veska and Ser Lucan know the regalia on sight.",
            "{@b Tonight:} they are the ward's clock that everyone can see. Each time the ward weakens, the knight nearest the line bows lower, until its helm touches the frost. If the ward fails, the frost melts off them and they topple in their rows. On the Last Ride (exit B), every one of them lifts its head as the riders pass, then is still.",
            "{@b Do not touch:} disturbing them angers the dead inside (Session 11)."
          ] }
        ] },

        { t: "more", title: "The carved sun over the doorway", src: ["DiA Ch. 3", "Homebrew"], blocks: [
          { t: "read", text: "Over the granite doorway, worn but clear: a rider, a lance and a rising sun. Frost lies in the grooves of the carving and does not melt, even with a red dragon breathing twenty feet away." },
          { t: "list", items: [
            "{@b Seen before:} Session 11, over the door as they came in. The same sun is stamped on the lead seals of the urns (Session 12), on the old regalia of the kneeling dead, and on the lance head in Slarkas's chest.",
            "{@b Tied to:} Elturel, and the Hellriders' oath. Zariel's banner later tonight ({@scene zariel-notices|Zariel Notices}) is this same sun with the sword torn out of it: she was the sword. When the writ arrives, put its seal next to this carving and let a player notice.",
            "{@b Tonight:} Slarkas will not look at it. Flash glares at it from his spur, because the others told him the sun is what hurt Slarkas."
          ] }
        ] },

        { t: "more", title: "Arkhan: the black hand, the grey face, the empty chain", src: ["DiA Ch. 3", "Homebrew"], blocks: [
          { t: "read", text: "He stands easy, like a man at a garden gate. The left side of his face is grey and sunken, the scales peeling, and a sweet smell of old meat comes off him. His left hand is not his own: black, shrivelled and long-nailed, fixed to his wrist with iron staples. Frost forms on the air around the axe at his hip. At his throat hangs a fine chain, and on it, nothing at all." },
          { t: "list", items: [
            "{@b Seen before:} Session 9, at his tower. Then a small crystal vial hung on that chain, and the dark blood inside it moved on its own. The party poured that blood into Uldrak in Session 10. The empty chain is the vial they took from him.",
            "{@b The hand} is the Hand of Vecna (the book). It keeps him alive and it rots him; to hold back the rot he must snuff out good lives. The same hand left the print on Vermilius's throat.",
            "{@b Fane-Eater,} his battleaxe, frosts the air around it. It lights the colour of an old sunrise when he smites.",
            "{@b Tonight:} he touches the empty chain whenever he speaks of his queen. Let a player see it (DC 12 Insight): it is the only thing he has lost that he minds."
          ] }
        ] },

        { t: "more", title: "Slarkas's lance head", src: ["Homebrew"], blocks: [
          { t: "read", text: "Buried in the black dragon's chest, below the shoulder, is the head of a lance: pale steel stamped with a sun. His scales have grown around it in a ridge. It still shines a little, and when the light from the doorway touches it, he flinches. His left eye is milky white." },
          { t: "list", items: [
            "{@b Seen before:} on Slarkas at the tower (Session 9), and over the Styx if he came in Session 10. Now, after the urns, the party can recognise the sun on it.",
            "{@b Tied to:} the First Charge. More than a hundred years ago a Hellrider put that sun-blessed lance through his chest, and the holy fire burned out his eye. He never let anyone pull it out: he wants to remember. That rider is buried in this Crypt, and the name is on the C2 wall.",
            "{@b Proposal (DM to rule):} the rider was {@b Marshal Aubrec Dunmere}, the Last Banner from the third urn. If Veska now carries his banner, Slarkas is looking at the colours of the knight who maimed him. That is why the banner breaks his orders.",
            "{@b Tonight:} radiant light makes the lance head burn (the Sun Blade from the Urn Hoard). Lure: a Hellrider banner pulls him off his post for 2 rounds. His line at the banner: \"I remember that sun. I kept a piece of it.\""
          ] }
        ] },

        { t: "more", title: "Vistalancer's steel horn and the hole in his wing", src: ["Homebrew"], blocks: [
          { t: "read", text: "The blue dragon's single horn is capped in forged steel, banded with rings and filed to a lance point. Through his left wing, a hole the size of a shield, burned clean. He keeps that wing angled away from you and flies a little crooked." },
          { t: "list", items: [
            "{@b Seen before:} the tower (Session 9), and over the Styx if he came in Session 10.",
            "{@b Tied to:} the Lady Vengeance. The hole is a force-cannon shot. If her guns hit him at the tower, it was this ship, and he has not forgiven it. If the ship comes in (exit F), he goes for it first.",
            "{@b Tonight:} he is vain and careful. Mentioning the hole aloud (DC 13 Perception to spot how he hides it) gives advantage on the check to turn him. He wants to win without risk and to be admired."
          ] }
        ] },

        { t: "more", title: "Vermilius's handprint and her gold rings", src: ["Homebrew"], blocks: [
          { t: "read", text: "A black handprint is burned into the green dragon's throat: long, thin fingers, and the scales there never grew back. Gold rings climb both her horns, more than you can count at a glance. A thread of green smoke curls from one nostril." },
          { t: "list", items: [
            "{@b Seen before:} the tower, Session 9.",
            "{@b The handprint} is Arkhan's: he once took her by the throat with the Hand of Vecna. She thinks it is an honour, and she is right. It marks her as the vessel he chose for the curse. {@spell detect magic} shows necromancy in it, and it is cold to the touch.",
            "{@b The rings:} one for every creature that ever asked her for help. Ask her and she will say so, smiling. That is exactly what she wants from Or'Henn tonight.",
            "{@b Tonight:} her smoke curls when she tells the truth and stops when she lies. To Or'Henn it never stops."
          ] }
        ] },

        { t: "more", title: "Flash: the dragon with no scars", src: ["Homebrew"], blocks: [
          { t: "read", text: "The red is the youngest and the loudest: glossy scarlet, with cracks glowing between his scales like lava under a crust. His horns are a crown of new spikes, too many and too sharp, without a chip on any of them. There is not one scar on him anywhere, and the other dragons keep glancing at the places where scars would be." },
          { t: "list", items: [
            "{@b Seen before:} the tower (Session 9), and at Uldrak's Grave if he fought there (Session 10: he landed on the sword's crossguard and duelled Uldrak).",
            "{@b Tied to:} his true name is Praxamor. Arkhan's people call him Flash, and he hates it.",
            "{@b Tonight:} call him small and he attacks that PC alone, at once. Call him Praxamor and you get one round of his attention. He wants a scar, and for Tiamat to look at him: he would volunteer as a second vessel ({@scene tiamats-curse|Tiamat's Curse}, D)."
          ] }
        ] },

        { t: "more", title: "Obatala's bronze horn and Krull's shrine", src: ["Homebrew"], blocks: [
          { t: "read", text: "The white dragon's right horn is a stump capped in carved bronze, cut all over with tiny runes. On his back sits a lacquered howdah hung with chains and charms, a little gilded shrine on top. In it sits an old tortle whose shell is carved with the same tiny runes. His lips move. He is counting." },
          { t: "list", items: [
            "{@b Seen before:} Session 9, when Obatala's roar woke Krull at the tower; Session 10, when Krull parleyed from his back.",
            "{@b Tied to:} Obatala snapped that horn hauling Krull out of an ice crevasse in the far north, long before Avernus. Krull carved the cap and cut a prayer to Tiamat into it, in the runes on his shell. The shrine is to Tiamat. Obatala belongs to Krull, not to Arkhan and not to Tiamat.",
            "{@b Tonight:} Krull is counting the ward (DC 14 Insight: he is timing it, and not for Arkhan). Turn Krull and Obatala turns with him (exit D)."
          ] }
        ] },

        { t: "h", text: "The Ward: What It Is" },
        { t: "p", text: "{@b In one line:} the Cold Line is the Crypt's ward. It is the edge of the frost where the heat of Avernus stops, and {@b nothing evil can step over it.} The party walked across it in Session 11." },
        { t: "list", items: [
          "{@b Why it exists.} The Crypt is a piece of Elturel that fell into Hell whole. Its cold is the city's grief for the First Charge, a grief that refuses to burn. The cold candles inside are the same vigil (Session 11, C3).",
          "{@b Who crosses it.} Mortals, celestials, the party and the dead of the Charge cross freely. Devils and Arkhan's dragons cannot. Breath and spells can reach across, but every evil thing that reaches across strains it.",
          "{@b Why it is failing.} Drenwal's {@spell knock} on the warded gates (Session 11) rang through the cold like a bell. That is how Arkhan heard it fifty miles away, and it cracked the ward. Cracked, not broken: the ward is tired, and it tires a little more with every hour and every loud thing done at it."
        ] },
        { t: "read", text: "Stand still on the frost and you can hear it: a low hum, like one long note held by a choir that has been singing for a hundred years. It comes up out of the ground, through the kneeling dead. Listen longer and you hear what is wrong with it. Now and then the note wavers, the way a tired voice does, and catches, and holds again." },

        { t: "h", text: "The Ward Clock" },
        { t: "p", text: "The ward has 6 boxes. When all 6 are gone, it fails. Show the boxes to the table." },
        { t: "list", items: [
          "{@b Where it starts:} {@b 2 of 6.} By Session 12's rules the urns cost one box and the trials one more, plus one for each trial that was forced. If you tracked something else, use that.",
          "{@b How a tick looks:} the hum drops a note, the frost edge draws back a pace, and the kneeling knight nearest the line bows lower. Describe it every time, so the players see the clock without hearing a number.",
          "{@b +1} for each hour the party waits inside. This is Arkhan's \"every hour a little lower\".",
          "{@b +1} for each loud act at the line: a shout at the dragons, an attack across it, a loud spell cast outward, or an insult that makes Arkhan smile.",
          "{@b +1} when an evil creature reaches across with magic: Arkhan's Vecna's Grip or Command the Line, a spell from Krull, a breath into the frost. Arkhan does this sparingly. He wants the ward down, but not before he has his hostage.",
          "{@b −1, once (proposal):} if someone in the Crypt is forgiven tonight, a cold candle lights below, and the hum steadies.",
          "{@b At 3:} the quiet that hid Or'Henn from Tiamat thins. Give him one Small Vision (below).",
          "{@b At 5:} Tiamat speaks to him outright, in a voice he knows.",
          "{@b At 6:} the ward fails. The frost melts off the kneeling dead and they fall in their rows. Evil can enter. Arkhan walks in with Krull, the dragons crowd the doorway but cannot fit, and the fight is {@scene the-breakout|The Breakout}."
        ] },
        { t: "more", title: "Why a clock", src: ["Homebrew"], blocks: [
          { t: "p", text: "It makes the party safe enough to think and trapped enough that thinking has a deadline. They always know how long they have, and most ticks are their own choices: take the time, take the noise, or take the shortcut." }
        ] },

        { t: "h", text: "Vermilius's Kindness" },
        { t: "p", text: "{@b When:} the first time Or'Henn comes up onto the frost where she can see him, or the moment the table goes quiet after Arkhan's offer." },
        { t: "list", items: [
          "{@b Who she is:} {@c mirelle|Vermilius}, the green dragon from Arkhan's tower (Session 9). Arkhan's handprint is on her throat: she is the vessel he chose. Her faith is in Tiamat, not in him.",
          "{@b What she wants:} Or'Henn to ask her for help, aloud. The curse moves only into a dragon that {@b willingly takes it}, and no dragon in Avernus is more willing. Each gold ring on her horns is someone who asked before him.",
          "{@b Why it works:} every word she says to him is true. He is tired. She would take it. If she does, Tiamat wakes when she dies (exit X in {@scene the-ways-out|The Ways Out}).",
          "{@b How she plays:} she never attacks first and speaks to Or'Henn only, in low Draconic. Everyone else hears it as a purr. Her smoke never stops curling while she talks to him."
        ] },
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
          "{@b E} parley with Arkhan. {@b F} the Lady Vengeance. {@b R} Word of Recall to the ship. {@b X} Vermilius's kind offer (the trap)."
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
          { t: "p", text: "{@b Mechanic.} He said: \"When you go up against her, call me. I will hear.\" The party can call him now: his name shouted at the sky, or a call through the orb that once sat in his sword's pommel (Session 10). He arrives in two rounds." },
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

        { t: "more", title: "R · Word of Recall (home to the Lady Vengeance)", src: ["PHB", "Homebrew"], blocks: [
          { t: "note", title: "Run It Tonight", text: "Cast inside the Crypt, out of Arkhan's sight: it works, and nothing he has can stop it. Cast where he can see Drenwal: he answers with Vecna's Grip. After they vanish, he cannot follow by teleport; he hunts. Unlike exit F, the ship stays hidden. That is the prize, and the reason Arkhan wants to stop it." },
          { t: "p", text: "{@b The rule.} {@spell word of recall} is a 6th-level cleric spell: 1 action, {@b verbal component only}. Drenwal and up to five willing creatures within 5 feet teleport to his sanctuary, the statue of St. Cuthbert on the Lady Vengeance's deck. He set it before Session 9 and escaped the Monument with it. They land at the statue wherever the ship has drifted. It uses his only 6th-level slot (Light Cleric 14)." },
          { t: "p", text: "{@b Who fits.} Drenwal plus five: Aurora, Or'Henn, Veska, Ser Lucan and Moonkite. That is everyone, exactly. Olanthius stays in C5 anyway. Anyone extra (a freed rider, someone they rescue) means someone else stays behind. Make them choose." },
          { t: "p", text: "{@b Inside, door shut: let it work.} Arkhan has no counterspell, no dispel magic and no scrying, and neither does anyone with him: Krull's list has no silence and no counterspell. The ward only keeps evil from coming in; nothing in our prep stops teleportation going out. The party set this up three sessions ago, and Arkhan watched it work at the Monument. Reward the plan." },
          { t: "p", text: "{@b In his sight (the doorway, the stair, past the line): his two answers.} Both come from the Hand of Vecna, and both work as a legendary action (cost 2), so he uses them at the end of the turn just before Drenwal's." },
          { t: "list", items: [
            "{@b Vecna's Grip} (4 charges). One creature within 60 ft.: {@b DC 22 Constitution} save or restrained and {@b silenced} until the start of Arkhan's next turn. Word of Recall is verbal only, so a silenced Drenwal cannot cast it. This is the answer he saves his charges for.",
            "{@b Slow} (2 charges). {@b DC 22 Wisdom} save. When a slowed creature casts a spell with a casting time of 1 action, it rolls a d20. On an 11 or higher, the spell takes effect only on its next turn, and it must use its action then to finish it. Arkhan gets a full round to Grip or strike.",
            "{@b Telegraph it.} When the party bunches up around Drenwal, Arkhan raises the Hand: \"Not twice, priest.\" They saw that hand at the Monument. Fair warning.",
            "{@b Ways around him.} He must see the target. Magical darkness or {@spell fog cloud} blocks his sight; his darkvision does not see through magical darkness. Stepping back behind the door also works, and so does a Legendary Resistance spent on someone else first. A failed Grip lasts only until his next turn: Drenwal casts on the turn after."
          ] },
          { t: "p", text: "{@b He cannot follow by teleport.} {@spell teleport} needs a destination he knows, and a ship drifting in storm clouds is not a place he has seen. At best that counts as \"description\": 43% mishap. He will not gamble his body on it. He teleports home to the tower instead." },
          { t: "p", text: "{@b What he does instead (his hunt).} Vistalancer and Flash sweep the storm clouds: the fastest dragon with blindsight, and the one eager to prove himself. Slarkas and Obatala hold the Crypt in case it was a trick. At dawn Krull casts {@spell divination}: \"Where will the druid be when the Pull takes him?\" Answer him with a riddle about a saint on a deck. Arkhan's line, to his dragons: \"The curse brings the druid to me. I need only wait.\"" },
          { t: "table", caption: "Hunt roll (proposal): once per 8 hours the ship stays in one place", head: ["Roll d20 + modifiers", "Result"], rows: [
            ["17 or lower", "The clouds hold. Nothing finds the ship."],
            ["18 or higher", "Vistalancer finds it. He looks and does not fight alone (Clean Exit). Arkhan knows by the next 8 hours."],
            ["+2", "The force cannons fired in the last day."],
            ["+2", "Or'Henn's Pull is 6 or higher: the mark is loud, and Tiamat leans toward it (proposal)."],
            ["+5", "The brass plate is still on Or'Henn's staff: Urexiel's hunters track it and sell the ship to Arkhan."],
            ["No roll", "The ship moved that period."]
          ] },
          { t: "p", text: "{@b What they skip.} The Breakout. Still run {@scene bhaals-first-gasp|Bhaal's First Gasp}, {@scene zariel-notices|Zariel Notices} and {@scene ending|the Ending}; they happen on deck." }
        ] },

        { t: "more", title: "X · Vermilius's kind offer (the Tiamat trap)", src: ["Homebrew"], blocks: [
          { t: "p", text: "{@b Mechanic.} Vermilius offers to take the curse. If Or'Henn says, aloud and meaning it, that he asks Vermilius for help, the curse jumps to the green dragon. Vermilius is the kindest, so it looks like a rescue." },
          { t: "p", text: "{@b Effect.} The curse leaves Or'Henn. For a moment he feels light. Then Vermilius changes, the other dragons kneel, and under Avernus something vast turns over in its sleep. Tiamat wakes in her true form. The siege lifts because the dragons have a new queen." },
          { t: "p", text: "{@b Cost.} Everything. This is the exit Arkhan wants. It works, it is true, and it is the end of the party's ability to pretend Tiamat is asleep. Do not warn the players. Let it be tempting." },
          { t: "p", text: "{@b The forced version.} The same trap with a gold dragon and a blade at Or'Henn's throat. See Arkhan's Plan in {@scene wings-at-the-door|Wings at the Door}." },
          { t: "p", text: "{@b Alternative (the cage loophole).} If Small Vision row 2 came up, a clever player may ask the dragon {@i inside the orb.} See {@side arc-tiamat|Arc: Or'Henn and Tiamat} (DM's Choice: The Dragon in the Orb). The recommended result is the orb becomes a gold cage. The curse leaves Or'Henn, Tiamat wakes only halfway, and Arkhan would burn Avernus to own the orb." },
          { t: "p", text: "{@b Every way the curse can move tonight:} {@scene tiamats-curse|Tiamat's Curse: Scenarios}." }
        ] },

        { t: "note", title: "Combining Exits", text: "Exits stack. A common good answer: the Last Ride clears the lane, the Lady Vengeance picks them up, Uldrak waits as the last resort. The Orb run can go with either. Giving Arkhan the orb (E) closes A and the cage loophole. Word of Recall (R) cast out of Arkhan's sight needs nothing else. Let them combine, and add the costs together." },

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
        ], notes: "Flash drops from his spur; Vistalancer strafes from above. They want the carrier of the orb. The run is three rounds to cover the open ground. Breath beats the ship's damage threshold. Retreat below 60 hit points." },
        { t: "encounter", id: "arkhan-at-the-line", title: "Only if the ward fails: Arkhan and Krull", combatants: [
          { c: "arkhan-the-cruel", n: 1 },
          { c: "krull", n: 1 }
        ], notes: "A fight the party should lose. Arkhan walks in with Krull; Krull casts blade barrier across the escape route. Arkhan goes for Or'Henn first: Vecna's Grip, a grapple, then back up the stair. Everyone else he is happy to kill. The goal is the exit, not Arkhan. At roughly half hit points Arkhan withdraws; he does not risk Fane-Eater." },

        { t: "h", text: "Survival Tuning" },
        { t: "list", items: [
          "{@b Escape is the win.} Reward a clean exit with story, not XP. Do not reward killing a dragon.",
          "{@b Dragons do not enter.} Keep them out of the Crypt. They fight at the line and the lane. Any PC who stays inside is safe.",
          "{@b If Arkhan takes Or'Henn,} the goal becomes getting him back before the gold dragon comes. Arkhan's Plan in {@scene wings-at-the-door|Wings at the Door} lists the ways to break it.",
          "{@b Breath goes at the frost and the line,} never down the stair, and only at a PC who walks out. Never kill a PC in round 1.",
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
          ["1 · Called at the door", "Exit C: his name, shouted to the sky", "2 rounds later, on the ridge", "Unfinished", "His promise. He will not be at the Citadel or the last fight. Tiamat noticed him."],
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
    // SKY CHASE (after Word of Recall: the Lady Vengeance runs)
    // =====================================================================
    {
      id: "sky-chase",
      title: "Sky Chase: The Lady Vengeance Runs",
      when: "After exit R or F, when Arkhan's sweepers find the ship",
      duration: "30 to 45 minutes",
      blocks: [
        { t: "read", text: "The mist tears open behind the stern. A red shape comes through it first, too fast, roaring before it is close enough to matter. Behind and above it, a blue one, silent, lightning crawling along its wings, holding its distance like a hawk that has done this before.\n\nUnder your boots the Planar Core climbs to a scream. Colico Jack leans on the helm and grins without any humour at all. \"Hold on to something.\"" },
        { t: "note", title: "Run It Fast", text: "Homebrew chase (proposal, written at the table 2026-11-08). The gap is counted in {@b bands}, not feet. Each round: the {@b helm rolls}, the {@b gap moves}, the {@b crew act}, then the {@b dragons act} by the gap. Three ways out: the gap reaches {@b Lost}, the dragons are {@b driven off}, or the ship is {@b caught} and it becomes a deck fight." },
        { t: "encounter", id: "sky-chase", title: "Sky Chase: Flash and Vistalancer", combatants: [
          { c: "praxamor", n: 1 }, { c: "vhennic", n: 1 }
        ], notes: "Add the Lady Vengeance from Allies (Add + Init). Stations: Helm, Port cannon, Starboard cannon, Harpoon, Core (Jeremy unless a PC takes it). The ship acts on the crew's turns. Start the gap at Far." },

        { t: "h", text: "The Gap" },
        { t: "table", caption: "Bands (start at Far)", head: ["Band", "What reaches", "Dragons do"], rows: [
          ["Lost", "Nothing", "Escaped. The chase is over."],
          ["Far", "Force cannons only (600/2,400 ft.)", "Close in, no attack."],
          ["Near", "Cannons, harpoon (120 ft.), spells", "Breath if recharged; otherwise close in."],
          ["Close", "Everything, melee", "Claws, bites, Wing Attack on the deck. Flash may land."]
        ] },

        { t: "h", text: "Each Round" },
        { t: "steps", items: [
          "{@b Helm roll.} DC 15 Wisdom (Survival) or vehicle proficiency. Bonuses stack: +5 Haste (on the Core or the pilot, see below), +5 Overdrive or Overclock running, +2 the pilot took Dash.",
          "{@b Move the gap.} Success: one band away. Failure: one band closer. Fail by 5 or more: one band closer and roll a mishap.",
          "{@b Crew act} on their initiative. Cannons +9, 8d10 force. Harpoon +9, 4d12 piercing and tethered (escape DC 16 Strength). Jeremy rolls Maintain Core (DC 15) every turn: on a failure she loses 10 ft. or a cannon goes dark.",
          "{@b Dragons act} by the band they are in (table above)."
        ] },

        { t: "h", text: "How It Ends" },
        { t: "list", items: [
          "{@b Escape.} The gap reaches Lost, or stays at Far for 2 rounds in a row: the mist swallows her.",
          "{@b Driven off.} {@c vhennic|Vistalancer} leaves below 112 hit points (Clean Exit). {@c praxamor|Flash} overheats below 128 (breath on 4 to 6, glows, cannot hide) and retreats below 60, screaming.",
          "{@b Caught.} The gap is Close at the end of 2 rounds in a row: it becomes a normal fight on the deck."
        ] },

        { t: "h", text: "The Ship" },
        { t: "list", items: [
          "{@c lady-vengeance|Lady Vengeance}: AC 17, 350 HP, {@b damage threshold 15} (every breath gets through). One hit of 30+ = mishap (d6). Bloodied at 175: 2d6 fire each round until Damage Control (DC 13).",
          "{@b Overdrive} (Jeremy, 1 per fight, soul coin): speed doubles and counts +5 on the helm roll; foes starting within 30 ft. take 2d10 fire + 2d10 radiant. d20 1 to 5: 44 force to the ship, engines and cannons dead for 1d4 rounds. The soul is destroyed.",
          "{@b Overclock} (DC 18 Arcana): speed doubles until Jeremy's next turn, +5 on the helm roll. Failure: she cannot move until then (an automatic helm failure).",
          "{@b Scroll Feed:} a {@spell misty step} scroll blinks the whole ship: the gap moves one band away at once. {@spell Blur}: attacks against her have disadvantage."
        ] },

        { t: "h", text: "Haste on the Ship (table ruling)" },
        { t: "list", items: [
          "{@b On the Core} (Jeremy guides it in; a 3rd-level spell over Scroll Feed's 2nd-level limit, so optional DC 15 Arcana, failure = Core flare: 3d6 fire to whoever is at the Core each turn). The ship: +5 on the helm roll, AC 19, advantage on Dexterity saves. The caster concentrates: the dragons aim at them. When it ends the Core stalls: one round of no movement and no cannons, an automatic helm failure.",
          "{@b On the pilot} (rules as written): the extra action is a Dash, +2 on the helm roll and +2 AC for the pilot only. When it ends the pilot loses a turn and she holds course."
        ] },

        { t: "h", text: "The Dragons" },
        { t: "list", items: [
          "{@c praxamor|Flash} (red, fly 80). Presses in hard; wants a scar. Fire Breath 60-ft. cone, DC 21 Dex, 63 (18d6). {@b Bait:} call him small and Prove It marks that PC; he ignores the ship to go for them, straight into harpoon range.",
          "{@c vhennic|Vistalancer} (blue, fly 80). Shadows and reports; does not fight alone. Lightning Breath 90-ft. line, DC 19 Dex, 66 (12d10). Lance Dive on anyone on deck at Close. Leaves below 112 with Clean Exit, and Arkhan hears where the ship went.",
          "{@b Wingover} (both, reaction, once a round): the first ship-weapon attack against each dragon has disadvantage (a saving-throw weapon deals half). Fire both cannons at the same dragon: the second shot is clean."
        ] },

        { t: "note", title: "After the Chase", text: "Escaped: the ship is hidden again, but the next hunt roll (exit R) gets +5 for a day. Driven off: Arkhan knows the heading. Caught and won: the hull is scorched and every dragon knows her. Whatever happens, write down the ship's hit points and whether the Overdrive coin was spent." }
      ]
    },

    // =====================================================================
    // UP THE STYX TO THE EMPORIUM (played 2026-11-08, after the Sky Chase)
    // =====================================================================
    {
      id: "up-the-styx",
      title: "Up the Styx to the Emporium",
      when: "After the Sky Chase: the ship runs from Uldrak's Grave to the Wandering Emporium near the Mirror of Mephistar",
      duration: "20 to 40 minutes",
      blocks: [
        { t: "read", text: "The Lady Vengeance drops out of the mist and finds the Styx where it always is: a long, slow wound across the waste, dark and oily, and quiet in a way no river should be. Jeremy brings her down until the keel almost touches it, and the Core changes its note.\n\nBehind you, two heads lie on the deck, one red and one blue, and the Avernus heat has already started on them. Ahead, far to the north and east, past the dock and the watchtowers and the hill where Haruman's banner used to fly, the Mirror of Mephistar catches the light. Somewhere near it, the Emporium is waiting." },
        { t: "note", title: "Run It Fast", text: "Homebrew travel (proposal, written at the table 2026-11-08). The route runs from Uldrak's Grave in the south-west, along the Styx past the Styx Watchtowers, the Stygian Dock and Haruman's Hill, to the north-east, where the Emporium has anchored near the Mirror of Mephistar. Call it {@b 3 days} on the river: she flies 60 ft. over the Styx instead of 40. Roll {@b one event a day} on the table below. The ship keeps moving, so there is {@b no hunt roll} while she travels (exit R rule)." },

        { t: "h", text: "Clocks Running During the Trip" },
        { t: "list", items: [
          "{@b The heads:} they spoil in 3 days without {@spell gentle repose} or salting (DC 14 Survival with salt and smoke). The trip is 3 days. Drenwal's {@spell gentle repose} buys 10 days per casting.",
          "{@b The blood:} 2 wine bottles from each dragon, 10 doses each, potent for 7 days unless brewed. Fhet'Ahla at the Emporium buys bottles (about 5 soul coins each).",
          "{@b Or'Henn's Pull:} the start-of-session value is 2 + his gold scales. On the river, a chromatic dragon sighted far off still counts (+1 the first time each). Track it on the Curse page.",
          "{@b Arkhan:} he learns at dawn that Flash and Vistalancer did not come back. He does not know where the ship is. If the heads ride on the prow, anyone who sees the ship can tell him (+2 on his hunt roll whenever she stops)."
        ] },

        { t: "h", text: "Burning Coins for Speed" },
        { t: "p", text: "Overdrive was built for one fight. On the road (proposal): {@b each soul coin gives 1 hour at double speed}, 120 ft. on the Styx. An hour at double speed covers two hours of river, so {@b every coin saves 1 hour}. The trip is about 36 hours under way (3 days); halving it takes 18 coins. Every coin destroys a soul forever." },
        { t: "h", text: "The Chain: Each Coin in a Row Is Harder" },
        { t: "p", text: "Coins fed one after another without a break form a {@b chain}. Number them: the 1st coin in the chain is {@b n = 1}, the next {@b n = 2}, and so on. The chain breaks only when the Core runs a full hour with no coin in it. Each coin, roll these saves when it goes in:" },
        { t: "table", caption: "Saves for coin n of the chain", head: ["Who", "Save", "On a failure"], rows: [
          ["{@b The Core} (the ship)", "Constitution (+5), {@b DC 10 + 2n}", "Backlash: 44 (8d10) force to the ship, engines and cannons dead for 1d4 hours, and the chain ends."],
          ["{@b The feeder} (whoever drops the coin in)", "Wisdom, {@b DC 10 + 2n}", "The soul grabs on: {@b n × 1d6 psychic} damage, and they hear its last words (the player gets one line of a stranger's life). Fail by 5 or more: frightened of the Core for 1 hour."],
          ["{@b Everyone aboard} (from the 3rd coin in a chain)", "Wisdom, {@b DC 8 + 2n}", "1 level of exhaustion: the screaming gets into them. Undead and constructs are immune; Lulu automatically fails."]
        ] },
        { t: "list", items: [
          "{@b DCs at a glance:} coin 1: 12 / 12. Coin 2: 14 / 14. Coin 3: 16 / 16 (crew 14). Coin 4: 18 / 18 (crew 16). Coin 5: 20 / 20 (crew 18). Coin 6: 22 / 22 (crew 20). By the 5th or 6th coin something breaks.",
          "{@b Breaking the chain} (one hour with no coin) resets n to 1. So the safe rhythm is coin, rest hour, coin: each pair saves 1 hour of a 2-hour stretch.",
          "{@b Helps:} Jeremy guiding it (advantage on the Core save if he takes no other action that hour); {@spell protection from evil and good} on the feeder (advantage on the feeder's save); {@spell heroism} or {@spell beacon of hope} for the crew's saves."
        ] },
        { t: "p", text: "On top of the chain, count {@b all} coins burned since the last long rest on the {@b Soul Burn} track. These effects stack:" },
        { t: "table", caption: "Soul Burn (coins burned since the last long rest)", head: ["Coins", "What happens (stacks)"], rows: [
          ["1–2", "{@b The Core screams.} A thin sound under the hum that only the dying hear. Lulu, if aboard, cannot sleep. Jeremy will not look at whoever ordered it."],
          ["3–4", "{@b The burned stay.} Faces in the steam, voices in the hull at night. The next long rest: each creature aboard makes a DC 13 Wisdom save or gains no benefit from Hit Dice that rest and wakes with 1 level of exhaustion."],
          ["5–6", "{@b A beacon.} The ship trails grey soul-smoke you can see for miles, and every soul-eater in Avernus can smell it. Roll a Styx Road event {@b twice} each day (take both), and the watchtowers report her automatically. Arkhan and Zariel's riders learn her heading by the next dawn."],
          ["7+", "{@b The Core tears.} Every Core save is made with disadvantage. Each further coin also deals 2d10 force to the hull. At dusk, 1d4 {@c crypt-specter|specters} (the burned, half-formed and furious) rise out of the Core and attack whoever fed them in."]
        ] },
        { t: "list", items: [
          "{@b Drenwal} (Light cleric): burning a soul is not nothing. If he approves it, play his god's silence. If he refuses, his word counts double with the crew.",
          "{@b The Soul Engine choice:} on the mercy path, every coin burned costs 1 Grace (if the Grace Lantern is fitted) and Jeremy's next install check has disadvantage. On the Portyr path it is what the engine was built for: no extra cost, which is the point.",
          "{@b Freeing instead of burning:} a coin that is un-coined (the Ballast Chamber, or Lulu, Drenwal, the Moonkite) frees a soul instead. Slower, kinder, and the ship gains Grace if she has the lantern.",
          "{@b It clears:} the Soul Burn count resets after a long rest with no coin burned during it."
        ] },

        { t: "h", text: "The Styx Itself" },
        { t: "list", items: [
          "{@b Touching the water:} a creature splashed or dunked makes a {@b DC 15 Intelligence save} or forgets the last day, plus one memory the player chooses (the Session 10 rule). Uldrak's {@spell greater restoration} brings it back; so does any {@spell greater restoration}.",
          "{@b Flying low:} rough water or a bad turn means a DC 13 Dexterity save for anyone at the rails.",
          "{@b Drinking or pouring Styx water into anything:} don't. The Core will not take it."
        ] },

        { t: "table", caption: "Styx Road Events (d8, once a day)", head: ["d8", "Event"], rows: [
          ["1", "{@b The watchtowers.} A Styx Watchtower flashes a mirror at the ship: who goes there? Bluff it (DC 15 Deception, with Zariel's or Bel's name), hide in the mist (DC 15 helm check), or ignore it. On a failure the tower reports a black galley heading north-east. Zariel's riders hear by nightfall."],
          ["2", "{@b The Blood War on the bank.} Demons and devils killing each other across a mile of ash. Nobody looks up unless the ship fires. Loot after: a DC 14 Investigation check on the edges of the field finds 1d4 soul coins or a broken infernal weapon."],
          ["3", "{@b The Stygian Dock.} Traffic: barges, an infernal galley, a merfolk-fiend toll keeper. Pay 1 soul coin or talk (DC 15 Persuasion). A chance to sell a bottle of blood or a vial early, and to hear rumours: two dragons fell from the sky in the south, and Arkhan is asking who did it."],
          ["4", "{@b The forgetting fog.} White mist rolls off the water. Everyone on deck: DC 13 Dexterity save or the spray touches them (then the DC 15 Intelligence save). Lulu, if she is aboard, must be below decks."],
          ["5", "{@b Scavengers.} The heads draw {@c vrock|vrocks}: 1d3 + 1 of them circle, screeching, then dive for the trophies. A short fight on deck. Their spores (Spores, recharge 6) are the real threat to the crew."],
          ["6", "{@b The green on the horizon.} {@c mirelle|Vermilius} shadows the ship for an hour, high and far, and never comes in range. At dusk a green-smoke voice reaches Or'Henn alone: \"You were very brave. You must be so tired.\" Pull save (out of combat rule)."],
          ["7", "{@b Zariel's sign.} A {@c narzugon|narzugon} rides the riverbank on a nightmare, keeping pace with the ship, saying nothing. It turns away at the next bend. If Lulu was taken, it carries one of her feathers on its lance."],
          ["8", "{@b Quiet water.} Nothing finds them. The Core hums; a safe long rest. Good moment for {@spell speak with dead} on the heads, brewing the blood, or the Veska and Ser Lucan scene."]
        ] },

        { t: "h", text: "Arriving at the Emporium" },
        { t: "p", text: "The {@b Wandering Emporium} has anchored near the {@b Mirror of Mephistar}: the great glass in the north-east, where the cold starts. The traders know the ship (Or'Henn sealed on as the Soul Capacitor's carrier). Two dragon heads on the deck turn every head on the quay. Expect offers before the gangplank is down: Fhet'Ahla for the blood and the essence, Rassh for scales, teeth and horn, and someone quietly asking who killed them, for a buyer who will not give his name (Arkhan, through a broker)." },
        { t: "note", title: "Remember for Next Time", text: "Days on the river, events rolled, who touched the Styx and what they forgot, whether the heads are preserved, what was sold at the Dock, and what the watchtowers saw." }
      ]
    },

    // =====================================================================
    // THE STYGIAN DOCK (book p. 123-124, upscaled for level 14 + Kreeg)
    // Written at the table 2026-11-08. Book text paraphrased; numbers raised.
    // =====================================================================
    {
      id: "passing-the-stygian-dock",
      title: "The Stygian Dock",
      when: "On the Styx road to the Emporium. Zariel's flying fortress is moored here tonight",
      duration: "1 to 2 hours",
      blocks: [
        { t: "read", text: "Two enormous iron arms reach out from the cliffs and straddle the Styx, a hundred feet above the water, hung with clamps and chains and bars big enough to hold a ship the size of a town.\n\nOne is being held right now. Between the arms hangs a citadel of black basalt shaped like a sword blade, point down over the river. It thrums. Out of the Styx below it, souls are being pulled up into its belly in screaming ribbons, and the sound does not stop.\n\nThree skeletal shapes circle it slowly, like gulls round a fishing boat. On the dock, devils in threes walk the rails. And on a rusty barge a few hundred yards downriver, a devil black with engine oil is swearing at a crane." },
        { t: "note", title: "Run It Fast", text: "Book p. 123–124, numbers raised for three level-14 PCs plus Veska, Ser Lucan, Moonkite and the ship. {@b Who is here:} {@c bazelsteen|Bazelsteen} runs the machines (book). {@c kreeg|Thavius Kreeg} keeps the fuel ledger: every soul the fortress drinks is counted by him (our campaign). {@b Zariel's flying fortress} is moored and refuelling, guarded by 3 {@c fortress-bone-devil|bone devils}. The party can {@b A} slip past, {@b B} take Bazelsteen's deal (Test Run 221, then the Demon Raid), or {@b C} go to Kreeg. The demon raid is Kreeg's moment: he moves while Bazelsteen is away." },
        { t: "map", id: "harbor-map-night-25x25", title: "The Dock platform (use the harbour as the dock's upper arms)", note: "Stand-in: the dock is a 100-ft.-high iron service platform. The edges drop to the Styx." },
        { t: "map", id: "avernus-river-styx-encounter-map-50x50", title: "The barge and the river (Test Run 221, the Demon Raid)", note: "Put Bazelsteen's barge mid-river with the crane at its stern. The riverbed is 40 ft. down." },
        { t: "map", id: "styx-watchtower-45x20", title: "Kreeg's ledger tower (the tollhouse)", note: "Stand-in: T1 the counting floor, T2 Kreeg's office (the chains on the walls are the ledger chains), T3 the roof. The ledger room is under T1: his Escape Clause goes there." },

        { t: "h", text: "Zariel's Flying Fortress (moored)" },
        { t: "list", items: [
          "{@b Book:} her 450-ft. flying fortress, a basalt citadel shaped like a sword blade, serviced here and fuelled with souls drawn out of the Styx. She pilots it by thought.",
          "{@b Tonight:} Zariel is {@b not} aboard (her herald may be). The crew is busy refuelling. The 3 {@c fortress-bone-devil|bone devils} guard the fortress, not the dock: they come down only for a fight near it, a flyer that comes close, or an alarm.",
          "{@b Lulu:} if a bone devil sees her, it tries to take her alive and fly her aboard. Keep her below decks. The writ said Zariel wants her.",
          "{@b If they make trouble near the fortress:} the bone devils join in on round 2, and on round 4 the fortress's own guns wake: a {@b fortress lance} each round on initiative 0, 120 ft. line, DC 18 Dexterity save, 44 (8d10) force, half on a success. Run, or stop fighting.",
          "{@b It leaves:} when the fuelling ends (1d4 hours after they arrive), it casts off and flies north-west. After that the dock is just a dock."
        ] },

        { t: "h", text: "A · Slip Past" },
        { t: "list", items: [
          "Patrols: 12 {@c barbed-devil|barbed devils} in four groups of three. They warn ships off and attack intruders. They do not stop ships that keep moving on the river.",
          "Sailing straight past under the fortress: helm DC 15 Stealth or Deception (with the soul-smoke trail: DC 18). Fail: a patrol of 3 hails the ship, and anyone who talks back gets Bazelsteen swooping down to deal with them (go to B).",
          "Dragon heads on the prow: every devil looks. That is not hidden, but it is very persuasive (advantage on Intimidation here)."
        ] },

        { t: "h", text: "B · Bazelsteen's Deal" },
        { t: "p", text: "{@c bazelsteen|Bazelsteen} likes machines more than people. He looks the Lady Vengeance over, names three things wrong with her, and offers: crew his test and he repairs her and fits one upgrade free. He does not want money. He wants pilots he doesn't mind losing." },
        { t: "h", text: "Test Run 221" },
        { t: "steps", items: [
          "{@b The bathysphere:} a 10-ft. iron-and-glass diving bell hanging from the barge's crane on a rusty chain, with suction tubes underneath. Up to four Medium crew. He swears it is watertight. Air: 1 hour for one, 15 minutes each for four. He plans 10 minutes.",
          "{@b The prize:} \"Whoever sucks up the most silted souls gets a soul coin.\"",
          "{@b The dive:} down 40 ft. to the riverbed. Souls in the current claw and scream at the glass. Visibility 10 ft.",
          "{@b Each minute:} each crew member at a suction station makes a Dexterity check. The result is the number of silted souls they siphon into the tanks (dials on each tank).",
          "{@b Opening the hatch} underwater floods the bell: Styx exposure for everyone inside (DC 15 Intelligence save or forget)."
        ] },

        { t: "h", text: "The Demon Raid (10 minutes in)" },
        { t: "p", text: "Book: ten vrocks hit the dock and Bazelsteen flies off to fight them; then a glabrezu lands on the barge to cut the chain. Here, for level 14, the raid is fewer but harder demons, and the moment Bazelsteen leaves, {@b Kreeg comes down the dock}. Roll initiative. The crew in the bell don't know what's happening above, and the barge doesn't know what's happening below." },
        { t: "list", items: [
          "{@b Round 1:} 6 {@c vrock|vrocks} (maximum hit points, 152; Spores DC 16) hit the dock and the barge. Bazelsteen goes to the dock.",
          "{@b Round 2:} the {@c glabrezu-ravager|Glabrezu Ravager} lands on the barge and starts on the chain: DC 20 Strength check each turn. If the chain parts, the bell sinks and stays down until salvaged. Shielding the chain forces it to break a segment first (AC 19, 40 HP).",
          "{@b The crane:} a PC at the controls uses an action and a DC 17 Intelligence (Arcana) check to work it. Three successes in a row bring the bell up. Fail by 5+: the bell drags 2d10 ft. across the bed, 2d4 bludgeoning to everyone inside.",
          "{@b Round 3:} {@c kreeg|Kreeg} arrives with 2 {@c dock-chain-warden|Chain Wardens}. He wants Lulu, the shard, Flash's head, or Or'Henn, in that order, and the bell is a very good hostage: \"Shall I count to ten, or to the bottom of the river?\" The chain wardens animate the dock's chains to moor the Lady Vengeance.",
          "{@b Round 5:} Bazelsteen comes back. If the bell is still on its chain, he drives the glabrezu off and, if the test was going well, turns on Kreeg's chain wardens for 2 rounds: those are his chains. If the chain broke, he calls Test Run 221 a failure and leaves the sunk crew to their fate.",
          "{@b Air:} the crew in the bell start to suffocate when the air runs out (15 minutes for four)."
        ] },
        { t: "encounter", id: "dock-demon-raid", title: "The Demon Raid on the Barge", combatants: [
          { c: "vrock", n: 6 }, { c: "glabrezu-ravager", n: 1 }
        ], notes: "Book p. 124, raised: 6 vrocks at max HP (152, Spores DC 16) instead of 10, and the glabrezu at about CR 12. The glabrezu arrives round 2 and goes for the chain (DC 20 Strength). Add Bazelsteen from round 5 as an ally against the demons." },
        { t: "encounter", id: "dock-kreeg", title: "Kreeg at the Dock (from round 3 of the raid, or if they go to him)", combatants: [
          { c: "kreeg", n: 1 }, { c: "dock-chain-warden", n: 2 }, { c: "barbed-devil", n: 3 }
        ], lair: "kreeg", notes: "Kreeg (CR 22, Ledger Unbound at 171 HP: page storm, Forgetfulness on 4–6, 4 legendary actions). Chain Wardens moor the ship with Huge chains. Barbed devils are a dock patrol that answers his Dockmaster's Order. Killed here he is gone for good, and Elturel's contract with him: he says so first. Below 100 HP he offers his signature for his life." },
        { t: "encounter", id: "dock-fortress-guard", title: "Only if they fight near the fortress: the bone devils", combatants: [
          { c: "fortress-bone-devil", n: 3 }
        ], notes: "They join on round 2. From round 4 the fortress lance fires on initiative 0: 120-ft. line, DC 18 Dex, 8d10 force. They take Lulu alive if they can." },

        { t: "h", text: "C · Go In to Kreeg" },
        { t: "p", text: "His tollhouse sits at the root of the docking arms, a squat basalt tower with a cracked bell over the door: the Ashen Garden's gate bell. Or'Henn rings three times and the door opens. Kreeg receives them as if a keeper has come to report. If they fight here, use the encounter above without the demons; if they talk, he wants the same things, and tonight he can sell them to Zariel's fortress across the dock within the hour." },
        { t: "read", text: "\"Before your Hellrider does anything brave,\" he says, not looking up, \"you are in the Nine Hells. Kill me here and I am gone, and with me the only hand that can unsign that contract.\" He blots the page. \"Two dragons in one night. My gardener has grown. And you've brought them to her front door. Do sit.\"" },

        { t: "h", text: "Rewards (proposal: strong, for level 14)" },
        { t: "table", caption: "What they can win at the Dock", head: ["From", "Reward"], rows: [
          ["{@b Test Run 221 (bell back up)}", "Book: Bazelsteen fully repairs the ship and gives one free upgrade, and a soul coin to the best siphoner. Here, the upgrade is one of: {@b Soul-Siphon Intake} (Overdrive can burn 10 silted souls instead of a soul coin, with no Soul Burn; they are already lost), {@b Infernal Hull Clamps} (+2 AC and damage threshold 20), a {@b second Aether Harpoon} at the stern, or the {@b Gyro Helm} (tier II engine) fitted free."],
          ["{@b The silted souls}", "The tank dials are a currency: 10 silted souls = 1 soul coin at the Emporium, or fuel for the Intake. Bazelsteen lets them keep what they siphoned if the test succeeded."],
          ["{@b Kreeg's Ledger} (if they take it)", "Legendary, requires attunement. Once a day, read one line aloud to give back a memory taken by Forgetfulness, the Styx, or anything else. {@b It can restore Lulu's memory.} Holding it, you know any creature's true name written in it (Kreeg's own is on the first page)."],
          ["{@b The High Overseer's Ring}", "Very rare, attunement. +2 to spell save DCs and spell attacks; {@spell modify memory} once per day. Elturel's cracked-sun seal: it opens doors in Elturel."],
          ["{@b The contract copy}", "In the ledger room. Elturel's contract, signed in Kreeg's hand. Burned, signed away by a living Kreeg, or carried to Zariel: the legal lever to break the chains."],
          ["{@b The ledger room's strongbox}", "40 soul coins and 15 infernal metal (the next ship upgrades need metal)."],
          ["{@b XP}", "Raid: 6 vrocks (13,800) + Glabrezu Ravager (8,400). Kreeg 41,000, Chain Wardens 5,900 each, barbed devils 1,800 each, bone devils 8,400 each. Split three ways."]
        ] },
        { t: "note", title: "Remember for Next Time", text: "Did the bell come back up? Silted souls siphoned (per PC). Which upgrade Bazelsteen fitted. Did Kreeg see Lulu? Is Kreeg alive, captured, signed, or escaped? What did the fortress see, and where did it fly?" }
      ]
    },

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
        { t: "p", text: "{@b What she means} (DM ruling 2026-11-08): \"the Citadel\" is the Bleeding Citadel. She cannot enter it, but she wants them to come to its door, where her legion can take the shard. A whole Sword could redeem her or destroy her, and she wants neither. Lulu knows the way back to who she was; Zariel wants her silenced or kept close. She watches all of it from her Basalt Citadel to the west." },
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
