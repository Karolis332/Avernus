window.SESSION = {
  id: "09-arkhans-tower",
  title: "Arkhan's Tower",
  subtitle: "Session 9 · Descent into Avernus",
  summary: "The party flies to Arkhan's Tower for the vial of Tiamat's blood. The tower's dragons attack on the way in. Krull brings them to Arkhan, who names his price: a good creature's death. If they refuse and push their luck, Arkhan fights them, and they have to run for the ship.",

  party: [
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 13. Sigil of the Binding drawn (Tier II of the Three Sigils); only the kinslaying remains. Carries the Shield of the Hidden Lord, with Gargauth trapped inside." },
    { id: "aurora", name: "Aurora", note: "Level 13 (class not yet ruled -- campaign-state.md has her as Archfey Warlock). Rides the celestial Moonkite." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 13. Afflicted with Tiamat's curse. Carries the Soul Capacitor." }
  ],

  allies: [
    { id: "veska", name: "Veska", note: "Hellrider" },
    { id: "ser-lucan", name: "Ser Lucan the Reforged", note: "ally" },
    { id: "jeremy", name: "Jeremy", note: "Pilots the Lady Vengeance" },
    { id: "moonkite", name: "Moonkite", note: "Celestial mount, Aurora's companion" },
    { id: "lady-vengeance", name: "Lady Vengeance (Jeremy)", note: "AC 17 · HP 350 · DT 15" }
  ],

  creatures: {

    "feonor": {
      name: "Feonor",
      kind: "feonor",
      role: "Geas-bound hunter, sent after Or'Henn's staff",
      description: "A tall, thin woman with milky-white eyes, ash in her hair, and a parasol made of bone and stretched human skin, now snapped in half. She moves like someone who is very tired and very angry.",
      roleplay: [
        "Appearance: willowy human archmage, necromancer's robes torn and scorched by the harpoon. Milky eyes that never seem to blink.",
        "Voice: whispers in short sentences, broken by long, frustrated sighs.",
        "Wants: to be free of the geas. Until then, does exactly what it says and not one inch more.",
        "Knows: the road to Kharzug and Lady Urexiel's vault, where Or'Henn's staff is. Mahadi still pines for her.",
        "Sample line: \"Your staff. Yes. I heard you the first time.\" (sigh)",
        "Background: neutral evil archmage-necromancer. Mahadi's \"one that got away.\" See {@side who-is-feonor|Who is Feonor?}"
      ],
      source: { page: "bestiary", name: "Feonor", src: "BGDIA" },
      npc: true,
      tactics: [
        "Does the geas-bound task, grudgingly, and does not fight the party.",
        "Watches for any seam in the geas that lets her twist the letter of the task."
      ]
    },

    "lulu": {
      name: "Lulu",
      kind: "lulu",
      role: "Hollyphant ally, Arkhan's second choice of sacrifice",
      description: "A small, golden, flying elephant with feathered wings, about the size of a big dog. She smells faintly of warm feathers. In Avernus her glow is dim, and she flinches at every scream on the wind.",
      roleplay: [
        "Appearance: golden fur, soft feathered wings, dark gentle eyes. Curls her trunk tight against her chest when she is scared.",
        "Voice: high, sweet and sincere. Says \"please\" a lot. Talks to herself when her memories stir.",
        "Wants: to remember. She knows she loved Zariel and that Zariel fell. She knows there was a sword, and a flight from Hell.",
        "Knows: more than she can say. The road to the Sword runs through her memory, and she does not know it yet.",
        "Sample line: \"I understand. I am small, and I am good, and that is what he wants. I am frightened. But I understand.\"",
        "This session: Arkhan asks for her if the party will not give up Moonkite."
      ],
      source: { page: "bestiary", name: "Lulu", src: "BGDIA" },
      npc: true,
      tactics: [
        "Stays close to the party and trusts them not to hand her over.",
        "Does not fight Arkhan's people; she is a target in this scene, not a combatant."
      ]
    },

    "torogar-steelfist": {
      name: "Torogar Steelfist",
      kind: "torogar-steelfist",
      role: "Arkhan's minotaur bodyguard and muscle. Owns the Devil's Ride parked by the tent.",
      source: { page: "bestiary", name: "Torogar Steelfist", src: "BGDIA" },
      homebrew: "Scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons: HP 168 to 250, AC 17 to 19, a third scimitar attack, Legendary Resistance 1/day.",
      description: "A huge, savage minotaur in scorched leather, horns capped with iron. Flames crawl over his gauntlets when he clenches his fists. He smells like a forge and a slaughterhouse. He watches the party's hands, never their faces.",
      roleplay: [
        "Personality: Torogar Steelfist lives to fight and to guard Arkhan. Nothing else matters to him, except his Devil's Ride.",
        "Voice: grunts, short words, Abyssal curses.",
        "Wants: a reason to start.",
        "Sample line: \"Talk is done when he says talk is done.\""
      ],
      npc: false,
      sizeType: "Large monstrosity, lawful evil",
      ac: 19, acNote: "natural armor",
      hp: 250, hpFormula: "20d10 + 140",
      speed: "40 ft.",
      abilities: { str: 25, dex: 17, con: 24, int: 8, wis: 9, cha: 16 },
      saves: "Str +12, Con +12", skills: "Athletics +12, Intimidation +8",
      vulnerable: "", resist: "", immune: "", condImmune: "",
      senses: "darkvision 60 ft., passive Perception 9",
      languages: "Common, Abyssal",
      cr: "15", xp: 13000, pb: 5,
      traits: [
        { name: "Special Equipment", text: "Gauntlets of flaming fury, belt of fire giant strength (STR 21 without it). Carries a soul coin." },
        { name: "Goring Rush", text: "Immediately after a Dash, can make one horn attack." },
        { name: "Rage", text: "Bonus action, 1 minute: advantage on Str checks/saves, +3 melee damage, resistance to bludgeoning/piercing/slashing. Recharges on a short or long rest." },
        { name: "Legendary Resistance (1/Day)", text: "If Torogar fails a saving throw, he can choose to succeed instead." }
      ],
      actions: [
        { name: "Multiattack", text: "Three scimitars, one horns." },
        { name: "Scimitar", text: "Melee Weapon Attack: +12 to hit, reach 5 ft. Hit: 10 (1d6 + 7) slashing plus 3 (1d6) fire." },
        { name: "Horns", text: "Melee Weapon Attack: +12 to hit, reach 5 ft. Hit: 16 (2d8 + 7) piercing." }
      ],
      bonus: [], reactions: [],
      tactics: [
        "Rages the instant the showdown opens.",
        "Parks himself between {@c arkhan-the-cruel|Arkhan} and the nearest melee character. The wall; does not chase.",
        "If Arkhan commands it, grapples Moonkite's rider instead of goring her. Arkhan wants Moonkite alive.",
        "In {@scene the-escape|the escape}, grabs the slowest fleeing character among the bones by the tent. That character must use a turn to break free. If nobody steals his Devil's Ride, he rides it after the party."
      ]
    },

    "manticore": {
      name: "Chango",
      kind: "manticore",
      role: "Arkhan's manticore companion and skirmisher",
      source: { page: "bestiary", name: "Manticore", src: "MM" },
      homebrew: "Scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons: Huge, HP 68 to 199, about 60 damage a round, Tail Spike Volley hits up to 3 targets.",
      description: "A lion's body, bat wings, and a face that is almost a man's, with a grin far too wide and full of teeth. Its tail bristles with iron-hard spikes. It lounges by the tent like a dog, chewing something that used to have fingers.",
      roleplay: [
        "Personality: Chango is lazy, spiteful and loyal to Arkhan. Loves to shoot things that run.",
        "Voice: a human-sounding laugh, and nothing else.",
        "Sample line: (a low chuckle, as it flicks its tail and a spike thunks into the bone beside your foot)"
      ],
      npc: false,
      sizeType: "Huge monstrosity, lawful evil",
      ac: 15, acNote: "natural armor",
      hp: 199, hpFormula: "19d12 + 76",
      speed: "40 ft., fly 60 ft.",
      abilities: { str: 21, dex: 16, con: 18, int: 7, wis: 12, cha: 8 },
      saves: "", skills: "Perception +5",
      vulnerable: "", resist: "", immune: "", condImmune: "",
      senses: "darkvision 60 ft., passive Perception 15",
      languages: "",
      cr: "9", xp: 5000, pb: 4,
      traits: [
        { name: "Tail Spike Regrowth", text: "Chango has 36 tail spikes; used ones regrow when it takes a long rest." }
      ],
      actions: [
        { name: "Multiattack", text: "One bite, two claws and one tail spike, or one Tail Spike Volley." },
        { name: "Bite", text: "Melee Weapon Attack: +9 to hit, reach 10 ft. Hit: 18 (3d8 + 5) piercing." },
        { name: "Claw", text: "Melee Weapon Attack: +9 to hit, reach 5 ft. Hit: 14 (2d8 + 5) slashing." },
        { name: "Tail Spike", text: "Ranged Weapon Attack: +7 to hit, range 100/200 ft., one target. Hit: 18 (4d8) piercing." },
        { name: "Tail Spike Volley", text: "Ranged Weapon Attack against up to three creatures it can see: +7 to hit, range 100/200 ft. Hit: 18 (4d8) piercing each." }
      ],
      bonus: [], reactions: [],
      tactics: [
        "Skirmishes at range with Tail Spike Volleys rather than closing into melee.",
        "Harries whoever tries to flee toward the ship.",
        "In {@scene the-escape|the escape}, rains spikes on the open ground between the skull and the ship."
      ]
    },

    "white-abishai": {
      name: "White Abishai",
      kind: "white-abishai",
      role: "Tiamat's draconic devils. A dozen stand guard around Arkhan's tent; scores more nest behind the skull.",
      source: { page: "bestiary", name: "White Abishai", src: "MTF" },
      homebrew: "Scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons: HP 68 to 178, CR 6 to 9, third attack, cold on the longsword.",
      description: "Man-sized reptilian devils with white scales, white leathery wings and gleaming longswords. They chatter and hiss to each other all the time. The chatter stops at once when Arkhan speaks, or when Tiamat does.",
      roleplay: [
        "Personality: fanatic and hungry. Nobody is sure whether they serve Tiamat or are Asmodeus's jailers keeping her here. They never say.",
        "Voice: hissing Draconic, and telepathy that feels like cold fingers on the back of the neck.",
        "Sample line (telepathic): \"Guest. Guest. Only a guest. For now.\""
      ],
      npc: false,
      sizeType: "Medium fiend (devil), lawful evil",
      ac: 16, acNote: "natural armor",
      hp: 178, hpFormula: "21d8 + 84",
      speed: "30 ft., fly 40 ft.",
      abilities: { str: 18, dex: 12, con: 18, int: 11, wis: 12, cha: 13 },
      saves: "Str +8, Con +8, Wis +5", skills: "",
      vulnerable: "", resist: "bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered",
      immune: "cold, fire, poison", condImmune: "poisoned",
      senses: "darkvision 120 ft., passive Perception 11",
      languages: "Draconic, Infernal, telepathy 120 ft.",
      cr: "9", xp: 5000, pb: 4,
      traits: [
        { name: "Devil's Sight", text: "Magical darkness doesn't impede the abishai's darkvision." },
        { name: "Magic Resistance", text: "The abishai has advantage on saving throws against spells and other magical effects." },
        { name: "Magic Weapons", text: "The abishai's weapon attacks are magical." },
        { name: "Reckless", text: "At the start of its turn, the abishai can gain advantage on all melee weapon attack rolls it makes during that turn, but attack rolls against it have advantage until the start of its next turn." }
      ],
      actions: [
        { name: "Multiattack", text: "The abishai makes three attacks: two with its longsword and one with its claws." },
        { name: "Longsword", text: "Melee Weapon Attack: +8 to hit, reach 5 ft. Hit: 13 (2d8 + 4) slashing plus 3 (1d6) cold." },
        { name: "Claw", text: "Melee Weapon Attack: +8 to hit, reach 5 ft. Hit: 15 (2d10 + 4) slashing." },
        { name: "Bite", text: "Melee Weapon Attack: +8 to hit, reach 5 ft. Hit: 7 (1d6 + 4) piercing plus 7 (2d6) cold." }
      ],
      bonus: [],
      reactions: [
        { name: "Vicious Reprisal", text: "In response to taking damage, the abishai makes a bite attack against a random creature within 5 ft. of it. If no creature is in reach, it moves up to half its speed toward an enemy it can see, without provoking opportunity attacks." }
      ],
      tactics: [
        "Stand in a ring around the tent and watch while the showdown is close.",
        "Only join if the party is clearly winning. 1d4+1 rush in to tip the fight back toward Arkhan.",
        "Use Reckless for advantage on melee attacks, accepting the counter-advantage against them.",
        "Bite a random adjacent creature with Vicious Reprisal whenever they take damage."
      ]
    },

    "asojano": {
      name: "Asojano",
      kind: "chimera",
      role: "Chimera that lairs deep in the skull. Arkhan's friend. Optional escalation only.",
      source: { page: "bestiary", name: "Chimera", src: "MM" },
      homebrew: "Scaled for a L12 party of 3 + allies + the Lady Vengeance's force cannons: Huge, HP 114 to 200, three bites, fire breath 7d8 to 10d8.",
      description: "A lion's body with three heads: a lion, a black-horned goat, and a small red dragon. It squeezes out of the dark at the back of the skull's maw, smoke curling from the dragon head's nostrils, and pads to Arkhan's side like a hound.",
      roleplay: [
        "Personality: Asojano thinks of Arkhan as a friend, and of everyone else as food.",
        "Voice: three heads, three noises: a roar, a bleat and a hiss. It understands Draconic but cannot speak.",
        "Sample line: (all three heads turn toward the weakest character at once)"
      ],
      npc: false,
      sizeType: "Huge monstrosity, chaotic evil",
      ac: 17, acNote: "natural armor",
      hp: 200, hpFormula: "16d12 + 96",
      speed: "30 ft., fly 60 ft.",
      abilities: { str: 23, dex: 11, con: 22, int: 3, wis: 14, cha: 10 },
      saves: "", skills: "Perception +10",
      vulnerable: "", resist: "", immune: "", condImmune: "",
      senses: "darkvision 60 ft., passive Perception 20",
      languages: "understands Draconic but can't speak",
      cr: "12", xp: 8400, pb: 4,
      traits: [],
      actions: [
        { name: "Multiattack", text: "Asojano makes three Bite attacks (lion, goat and dragon heads) and one Claws attack. When its fire breath is available, it can use the breath in place of one bite." },
        { name: "Bite", text: "Melee Weapon Attack: +10 to hit, reach 10 ft. Hit: 17 (2d10 + 6) piercing." },
        { name: "Claws", text: "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 13 (2d6 + 6) slashing." },
        { name: "Fire Breath (Recharge 5-6)", text: "The dragon head exhales fire in a 30-ft. cone. DC 18 Dexterity save, 45 (10d8) fire, half on a success." }
      ],
      bonus: [], reactions: [],
      tactics: [
        "Not in the showdown roster. Arrives only if Arkhan spends a bonus action to call him (DM choice).",
        "Flies over the party and breathes fire on the biggest group first.",
        "Then bites whoever is hurting Arkhan most.",
        "If Arkhan teleports away, Asojano flees back into the skull."
      ]
    }

  },

  scenes: [

    {
      id: "adventure-primer",
      title: "Adventure Primer",
      when: "",
      duration: "5 minutes (read before play)",
      banner: "art/official/arkhan-the-cruel.webp",
      blocks: [
        { t: "p", text: "This session is designed for the three 13th-level characters of this campaign: Drenwal, Aurora and Or'Henn, with their allies Veska, Ser Lucan, Jeremy and Lulu. It runs about four to five hours. It is a social session between two hard fights: a real aerial battle with four adult dragons on the way in, and, if the characters wrong Arkhan, a showdown they are not meant to win." },
        { t: "note", title: "Tell the Players Before You Start", text: "Say this out of character, before the first scene: \"Arkhan's Tower is the most dangerous place you have been. If you pick a fight here, characters can die, and stay dead. Talking, paying, or running are all valid plans.\"" },
        { t: "h", text: "Background" },
        { t: "p", text: "{@c arkhan-the-cruel|Arkhan the Cruel} is a dragonborn paladin and the most devoted champion of Tiamat, the five-headed dragon queen. Tiamat is trapped in Avernus. Arkhan has sworn to set her free." },
        { t: "p", text: "On a short trip to a distant world called Exandria, Arkhan took the {@item Hand of Vecna|DMG}, a dead god's hand. He cut off his own hand to wear it. The Hand gives him terrible power, but it is slowly eating him. One whole side of his body is rotting. The only thing that holds the rot back is death: he must use the Hand to snuff out the life of good creatures." },
        { t: "p", text: "Arkhan wears a small crystal vial of Tiamat's own blood on a chain around his neck. The characters want that vial. He will trade it, but his price is always the same: the death of a good creature, given to the Hand." },
        { t: "p", text: "Arkhan's black tower stands on the plains of Avernus. His priest, the old tortle {@c krull|Krull}, runs it for him, with the elder white dragon {@c obatala|Obatala} and four adult dragons. Arkhan himself is not at home. He is camped at the Monument to Tiamat, a colossal dragon skull leaning against a mountain, where Tiamat answers prayers in five voices." },
        { t: "h", text: "Overview" },
        { t: "p", text: "This session has eleven scenes and takes about four to five hours to play. Arkhan's Tricks happens only if they refuse the price. The Fight and the Escape happen only if they wrong Arkhan. The Ending always runs." },
        { t: "list", items: [
          "{@b Where We Left Off} (5 minutes). Feonor, beaten and geas-bound, walks away to fetch Or'Henn's staff.",
          "{@b Across the Wastes} (20 minutes). The Lady Vengeance flies over bone fields, past a soul-coin cart and the Blood War, and across the River Styx. Arkhan's Tower rises out of an ash storm.",
          "{@b The Dragons Attack} (45 minutes). The tower's four adult dragons dive on the ship. A real fight, ended by Krull.",
          "{@b Krull Arrives} (20 minutes). Krull calls off the dragons, heals everyone, and notices Moonkite.",
          "{@b The Road to the Skull} (20 minutes). Krull rides with the party to the Monument to Tiamat. Abishai rush out to meet them.",
          "{@b The Monument to Tiamat} (30 minutes). The skull, the tent, Tiamat's five voices, and Arkhan.",
          "{@b Arkhan's Price} (30 to 45 minutes). He asks for Moonkite, then for Lulu.",
          "{@b Arkhan's Tricks} (20 minutes, only if they refuse). Gargauth and Krull become his tools.",
          "{@b The Fight with Arkhan} (45 minutes, only if they wrong him). A lethal fight. The goal is to run.",
          "{@b The Escape} (20 to 30 minutes, only after the fight). Four legs back to the ship.",
          "{@b Ending the Session} (10 minutes). What the party walks away with, and what it cost."
        ] },
        { t: "h", text: "Adventure Hooks" },
        { t: "p", text: "{@b Tiamat's blood.} The party needs the vial on Arkhan's neck. {@b DM: confirm with the table, before play, what they need it for.} Two suggested uses are given in {@scene ending|Ending the Session}." },
        { t: "p", text: "{@b Feonor.} Last session the Lady Vengeance's harpoon tore {@c feonor|Feonor} off her war machine. Or'Henn beat her and laid a geas on her: she must bring back his ashen staff. She is alive and leashed. She leaves at the start of this session." },
        { t: "p", text: "{@b Moonkite.} In the book, Krull only leads visitors to Arkhan if they bring something Arkhan values, such as the unicorn freed from the Demon Zapper. In this campaign that role goes to Moonkite, Aurora's mount, freed at the Palace of Gore. Krull senses it the moment he sees it, and that is why the door opens." },
        { t: "h", text: "Where things stand" },
        { t: "list", items: [
          "Asimov's soul is safe inside the Soul Capacitor that Or'Henn carries. He sometimes speaks to Or'Henn.",
          "Dumal, Drenwal's brother, is alive. Drenwal last scried him heading for the Mirror of Mephistar to ask Mephistopheles for help against the party.",
          "Drenwal's shield holds the devil Gargauth, who whispers. Arkhan will notice.",
          "Elturel still hangs in the sky of Avernus on its chains, sinking slowly toward the River Styx."
        ] },
        { t: "note", title: "Running This Session", text: "Read the brown boxes in order and you can run most of the session from them. The DM text around each box tells you what to do next. Side paths (the links that open on the right) hold the extra detail: what Arkhan knows, what Krull says on the way, the two tricks, raising the dead, and the soul coin overdrive. Open them only when the table goes there." }
      ]
    },

    {
      id: "on-the-way",
      title: "Where We Left Off",
      when: "",
      duration: "5 minutes",
      blocks: [
        { t: "p", text: "The session opens over the wreck of Feonor's war machine, moments after the last session ended." },
        { t: "read", text: "The harpoon chain still smokes. Feonor lies in the wreck of her war machine, her parasol of bone and skin snapped in half beside her. Her milky eyes find Or'Henn. The geas has its hook in her now. She must bring back his staff.\n\nShe gets up slowly. She spits ash and blood onto the cracked ground. She does not say thank you, and she does not say goodbye. She turns and walks away into the red haze, and the heat swallows her." },
        { t: "p", text: "{@c feonor|Feonor} leaves to do her task. She does not come back this session. If the table needs a reminder of who she is, open {@side who-is-feonor|Who is Feonor?}" },
        { t: "p", text: "When the characters are back aboard, go to {@scene the-crossing|Across the Wastes}." }
      ]
    },

    {
      id: "the-crossing",
      title: "Across the Wastes",
      when: "",
      duration: "20 minutes",
      banner: "art/official/adult-white-dragon.webp",
      blocks: [
        { t: "p", text: "Arkhan's Tower lies a few hours' flight from Feonor's wreck. The Lady Vengeance crosses the wastes to get there. The characters see the worst of Avernus along the way. Nothing here is a fight unless the characters start one." },
        { t: "note", title: "Running This Scene", text: "This is the journey. Read the events in order and let the players react between them. If time is short, skip the soul-coin cart and the Blood War, but keep the River Styx and the tower." },

        { t: "h", text: "Event: Leaving the Wreck" },
        { t: "read", text: "Jeremy opens the throttle. The Lady Vengeance shudders, groans, and lifts off the ash. Feonor's wreck shrinks to a black smear below.\n\nHot wind pours over the rail. It smells of sulfur and burnt hair, and under that, something sweeter and worse: meat left too long in the sun. The sky is the colour of an open wound. There is no sun. The light comes from everywhere at once, dull and red, and it makes everyone's skin look boiled." },

        { t: "h", text: "Event: The Bone Fields" },
        { t: "read", text: "For an hour you fly over bones. Fields of them, white and yellow and brown, stretching to the horizon like dirty snow. Ribcages as big as houses. Skulls with horns. Small skulls, too many of them. The wind rolls them along the ground, and they click and rattle like teeth.\n\nHere and there lie the wrecks of infernal war machines, black iron hulks split open like beetles. One is still burning. Something inside it is screaming, and it does not stop screaming as you pass.\n\nFlies rise from the field in clouds so thick they drum against the hull. When they hit your lips, they taste of rot." },

        { t: "h", text: "Event: The Soul-Coin Cart" },
        { t: "read", text: "Below, a cart crawls along a road of packed ash. A dozen chained, weeping things pull it. They might once have been people. Two horned devils walk beside it with whips.\n\nThe cart is heaped with coins. The coins are glowing. The coins are crying. You can hear them from up here: thousands of thin voices, all begging at once.\n\nOne devil looks up at your ship and grins. Then it goes back to its whip." },
        { t: "img", src: "art/generated/event-soul-coin-cart.webp", caption: "The soul-coin cart, seen from the deck.", credit: "Generated art (gpt-image-1)." },
        { t: "p", text: "These are soul coins on their way to the war. Each one is a trapped soul. The devils do not chase the ship. If the characters land, the drivers flee and leave the cart behind. Freeing the souls is possible with Lulu, Moonkite or Jeremy's Gondian method, but it takes time the party may not want to spend." },
        { t: "p", text: "If Or'Henn is on deck, the Soul Capacitor grows warm against him. Asimov's voice whispers in his ear: \"So many. Do not look too long, old dragon.\"" },

        { t: "h", text: "Event: The Blood War" },
        { t: "read", text: "Far to the east, the horizon flickers. Fire. Lightning. Something black pours over a ridge like spilled oil. It is the Blood War: demons and devils tearing each other apart, as they have for longer than anyone remembers.\n\nThe wind brings the sound in pieces. Horns. A roar. A scream as long as a song. Then it brings the smell, guts and bile and burning fat, and someone on deck throws up over the rail.\n\nAbove it all, very far away, a city hangs in the red sky on great chains. Elturel. Its towers still stand. Its light is still on. For now." },

        { t: "h", text: "Event: Crossing the River Styx" },
        { t: "read", text: "The ground falls away into a wide black valley. At the bottom runs the River Styx.\n\nIt does not look like water. It looks like oil, thick and slow, with a skin that wrinkles as it moves. Things float in it. A horse. Half a devil. A wooden door. Faces rise to the surface, open their mouths without a sound, and sink again.\n\nA cold mist hangs over the river. It smells of nothing at all. After hours of rot and sulfur, that is the worst part. It smells like a place where even memory has been washed away.\n\nJeremy takes the ship low to stay under the ash clouds. The hull skims thirty feet above the black water." },
        { t: "map", id: "styx-watchtower-45x20", note: "Use this map if the characters land on the riverbank or stop at the old watchtower. Otherwise the crossing happens in the air." },
        { t: "p", text: "Halfway across, a swollen demon carcass in the river bursts as the ship passes over it." },
        { t: "read", text: "With a wet crack, a huge bloated body in the river splits open. A fountain of black water and rotten guts sprays up over the rail and rains across the deck." },
        { t: "steps", items: [
          "Each character on deck makes a DC 13 Dexterity saving throw. On a success, they dodge the spray.",
          "On a failure, the Styx touches their skin. They make a DC 15 Intelligence saving throw.",
          "On a failed Intelligence save, the water steals memories. The character forgets the last day, plus one memory the player chooses: a face, a name, or a promise. The memories come back if a {@spell greater restoration} is cast on them.",
          "A character who falls fully into the river is targeted by {@spell feeblemind} (DC 20 Intelligence save, repeated at the start of each turn in the water until it fails). After 30 days under it, their memories are gone for good. Only a reckless choice should put someone in the river."
        ] },
        { t: "note", title: "Why the Styx Matters", text: "This is the river Elturel is sinking toward. When the chains finally pull the city down into this water, every soul in it becomes a devil. If no one at the table says it, Veska says it, quietly, looking up at the city in the sky." },

        { t: "h", text: "Event: The Ash Storm" },
        { t: "read", text: "On the far bank, the wind turns hot and grey. An ash storm rolls toward you like a wall. For ten minutes there is nothing but grit in your eyes, grit in your teeth, the taste of burnt bone on your tongue, and the ship's lanterns glowing orange in the dark.\n\nThen the storm tears open." },
        { t: "read", text: "Far ahead stands a tower. It is black, and it is tall, taller than any tower you have seen, and its walls are lined with burnt skulls stuck on iron spikes. Near the top it splits into five thin spires. They curl toward the sky like the fingers of a claw.\n\nSomething huge and white is flying slow circles around the top. A dragon. His scales are grey with ash.\n\nAs the ship draws closer, you see movement on the walls. Figures shuffle back and forth along the ramparts. They are dead. Some still have skin. Some do not." },
        { t: "read", text: "The wind turns and brings the tower's smell: old smoke, wet stone, and the thick, greasy stink of bodies rotting in the heat. Some of the skulls on the spikes still have hair. On the walls, the guards turn all together, and look up at your ship." },

        { t: "h", text: "Arkhan's Tower" },
        { t: "p", text: "Arkhan built this tower to study the Hand of Vecna and to find a way to free Tiamat. His dragons tore its black obsidian out of the volcanoes of Avernus. Arkhan is not here today. His priest Krull minds the tower while he is away." },
        { t: "h", text: "The Spire" },
        { t: "p", text: "Nine storeys of black obsidian, hundreds of feet tall. Near the top it splits into five spires like the fingers of a claw. Each finger is a dragon's lair." },
        { t: "h", text: "The Five Spires" },
        { t: "p", text: "The tallest spire belongs to {@c obatala|Obatala}, the white dragon. Frost forms on its stones and steams away in the heat. The other four belong to the adult dragons. The black spire drips acid and stinks of swamp. The blue spire is fused to glass at the tip and crackles with static. The green spire is choked with ash-vines and smells sickly sweet. The red spire is scorched black and always warm to the touch; its dragon is the youngest." },
        { t: "h", text: "The Ramparts" },
        { t: "p", text: "Charred skulls on iron spikes ring the walls. About fifty skeletons and thirty zombies stand guard, shuffling and rotting, never resting. They do not leave the walls unless the tower itself is attacked. Treat them as scenery, not a fight." },
        { t: "h", text: "The Gate" },
        { t: "p", text: "Black iron doors scored with claw marks. Five old dragon skulls, one of each colour, are spiked above them: dragons that once told Arkhan no. Nailed across the doors are the remains of earlier challengers, kept as a warning: a paladin's armour with the paladin still inside it, a giant's flayed hand, a wizard's robes stiff with old blood, and a row of helmets, each with its owner's head still in it. This is the first warning. Make sure the players see it." },
        { t: "h", text: "Inside the Tower" },
        { t: "p", text: "The characters will not see this. Krull never lets visitors in. The tower holds his experiments, laboratories, morgues full of bodies waiting to be raised, dragon hatcheries, and Arkhan's private rooms. If the characters ever break in, the treasure there is warded, and its details are up to you." },
        { t: "h", text: "Checks on the Approach" },
        { t: "p", text: "Characters with a passive Wisdom (Perception) of 14 or higher notice four smaller shapes uncurling from the four lower spires, and the white dragon turning his head toward the ship. The party is not surprised when the dragons dive." },
        { t: "p", text: "A successful DC 15 Intelligence (History or Religion) check recalls what the tales say: the tower belongs to Arkhan the Cruel, Tiamat's champion; he wears a hand that is not his own; and he always keeps his word, to the letter." },
        { t: "p", text: "When the ship is a mile out, go to {@scene dragons-attack|The Dragons Attack}." }
      ]
    },

    {
      id: "dragons-attack",
      title: "The Dragons Attack",
      when: "",
      duration: "45 minutes",
      banner: "art/official/young-red-dragon.webp",
      blocks: [
        { t: "p", text: "Four dragons live in the tower's lower spires. In the book they fight to the death to defend it. Here they are adults, and they fly out to meet the {@c lady-vengeance|Lady Vengeance} before it ever reaches the walls. Obatala, circling above, roars to wake Krull and does not join in." },
        { t: "note", title: "Pacing the Breath Weapons", text: "Do the maths before you roll: four adult breaths in one round average about 239 damage, roughly six times a Deadly encounter. So pace them. In round 1 the dragons strafe the SHIP and its gun crews, not the PCs. In any round after that, at most 2 breath weapons target PCs; the rest go at the ship. The end conditions do not change: the fight stops when one dragon falls, at the end of round 4, or when the party is clearly losing." },
        { t: "note", title: "Why the Dragons Attack", text: "This is a real fight. The ship's force cannons would shred young dragons in one round, so these are adults, and they fight to win. It ends when one dragon falls, at the end of round 4, or when the party is clearly losing. Then Krull arrives on Obatala's back and calls the halt. It shows the characters, before they meet Arkhan, how dangerous this place is." },

        { t: "h", text: "Event: The Dragons Dive" },
        { t: "read", text: "The white dragon at the top of the tower throws back his head and roars. The sound hits the ship like a wave. Your teeth ache. The deck boards hum under your feet.\n\nFour shapes drop from the four lower spires: black, blue, green and red. They fall like stones. Then their wings snap open with a crack you feel in your chest. They do not call out. They do not ask who you are. They dive straight at your ship.\n\nThe black one comes first, jaws open, acid hanging from its teeth in long strings. Where it grabs the rail, the wood smokes and bubbles. The stink is unbearable: rotten eggs, swamp mud and burning flesh." },
        { t: "img", src: "art/generated/event-dragons-attack.webp", caption: "Four shapes drop from the four lower spires, and dive.", credit: "Generated art (gpt-image-1)." },
        { t: "p", text: "The four dragons are {@c skarrix|Slarkas} (black), {@c vhennic|Vistalancer} (blue), {@c mirelle|Vermilius} (green) and {@c praxamor|Flash} (red). Roll initiative." },
        { t: "h", text: "How the Dragons Fight" },
        { t: "steps", items: [
          "First round. All four dragons dive at the ship. They strafe the hull and the gun crews, not the PCs.",
          "Second round. Slarkas and Flash keep attacking the ship. Vistalancer breathes on whichever character is doing the most damage, and Vermilius on the biggest cluster of characters. That is the most breath weapons that ever target PCs in one round: two.",
          "Third round. The dragons breathe again if they can, and use Wing Attack to knock gunners off the cannons. Each dragon uses Wingover the first time a ship weapon targets it each round.",
          "The fight ends when one dragon falls, or the party is clearly losing, or the fourth round is over. Then read the box at the end of this scene."
        ] },
        { t: "h", text: "What the Dragons Say" },
        { t: "list", items: [
          "Vermilius taunts in Common as she circles: \"Pretty boat. It will make a lovely coffin.\" When she sees Moonkite: \"Oh, is that a celestial I smell? The master will want that.\"",
          "Vistalancer counts every hit out loud in Draconic: \"One. Two. Three.\"",
          "Flash shrieks in Draconic. If anyone calls him small or young, he loses his temper and attacks that character next, even if it makes no sense.",
          "Slarkas only curses, in Draconic. Mostly it just melts things."
        ] },
        { t: "note", title: "The Ship", text: "The {@c lady-vengeance|Lady Vengeance} has AC 17, 350 hit points and a damage threshold of 15. Jeremy flies her. A crew member can fire one of the two force cannons as an action (8d10 force each). The aether harpoon (4d12) can pin a dragon to the ship so everyone can hit it, but a pinned dragon can also reach the deck. Every dragon's breath beats the damage threshold. Each round Jeremy makes a DC 15 Intelligence (Arcana) check to keep the core steady; on a failure, she loses 10 feet of speed or one cannon goes silent until his next turn. The {@side soul-coin-overdrive|Soul Coin Overdrive} is not used here. Save it for the escape." },
        { t: "h", text: "Moonkite in the Air" },
        { t: "p", text: "Aurora can take Moonkite off the deck and fight one dragon in open air. Vermilius goes for her gladly, but none of the dragons tries to kill Moonkite. They have been told about celestials. Anything holy is the master's." },
        { t: "h", text: "Checks During the Fight" },
        { t: "p", text: "A character who watches the dragons and succeeds on a DC 14 Wisdom (Insight) check notices that they are defending, not hunting. If the ship turns away from the tower, they let it go. A successful DC 13 Intelligence (Arcana) check names each dragon's colour and breath: acid, lightning, poison and fire." },
        { t: "h", text: "If Things Go Wrong" },
        { t: "list", items: [
          "A character drops to 0 hit points: a dragon does not waste attacks on a downed character while others are still fighting.",
          "The party is clearly losing: end the fight. Obatala dives with Krull (read the box below).",
          "A dragon is about to die: it fights on. If it drops, the fight ends there. Krull can still save it."
        ] },
        { t: "encounter", id: "dragons-attack-fight", title: "The Four Tower Dragons", combatants: [
          { c: "skarrix", n: 1 },
          { c: "vhennic", n: 1 },
          { c: "mirelle", n: 1 },
          { c: "praxamor", n: 1 }
        ], notes: "Real fight against four adults. End it the moment one dragon drops, the party is clearly losing, or round 4 ends. Then Krull lands." },
        { t: "h", text: "Event: The Second Roar" },
        { t: "read", text: "A second roar shakes the sky, deeper than the first. The white dragon is diving, straight down from the top of the tower, faster than anything that big should move.\n\nOn his back, small and still, sits a figure in ceremonial armour." },
        { t: "img", src: "art/generated/event-obatala-dives.webp", caption: "The second roar: Obatala comes down out of the sky, with Krull on his back.", credit: "Generated art (gpt-image-1)." },
        { t: "p", text: "Go to {@scene krull-arrives|Krull Arrives}." }
      ]
    },

    {
      id: "krull-arrives",
      title: "Krull Arrives",
      when: "",
      duration: "20 minutes",
      banner: "art/official/krull.webp",
      blocks: [
        { t: "p", text: "Obatala's first roar woke {@c krull|Krull}. The old priest does not want the guests dead. Dead guests bring nothing to Arkhan. Krull only leads visitors to his master if they carry something Arkhan values. Otherwise he tells them to leave at once or die. This time, he sees Moonkite, and changes his mind." },

        { t: "h", text: "Event: Krull's Welcome" },
        { t: "read", text: "\"ENOUGH!\"\n\nThe white dragon roars the word, and it lands like a dropped anvil. The great white dragon swoops in between your ship and the attackers and hangs there in the air, his wings beating so hard the ship rocks. Frost spreads across the hull where his breath brushes it, and melts at once into dirty water. He opens his jaws and breathes, not at you, but straight up. A cone of freezing white roars into the red clouds. For one heartbeat snow falls on the deck. Then it turns to warm, dirty rain.\n\nOn the dragon's back sits an old tortle in ceremonial armour. His shell is carved all over with tiny runes. He looks tired. \"You have made your point, children. All of you.\"\n\nThe four dragons hiss and snap, but they pull back toward their spires. The red one goes last, and slowly." },
        { t: "p", text: "The white dragon is {@c obatala|Obatala}. The tortle is Krull, Arkhan's priest and seneschal. The dragons obey him, grumbling. Any dragon that fled stays gone." },
        { t: "h", text: "Event: Landing at the Gate" },
        { t: "read", text: "Krull points down. \"Land there, at the gate. Slowly.\"\n\nThe ship drifts the last mile in silence. The dragons sit on their spires and watch it all the way. On the walls, the dead guards turn their heads to follow you. Jeremy sets the Lady Vengeance down on a flat black terrace in front of the tower's gate, and the hull groans as it settles.\n\nObatala lands beside you. The ground shakes. Krull slides down from the dragon's back, slow and careful, like an old man getting off a horse. He walks to the nearest wounded dragon as it lands, and lays a wrinkled hand on its torn side. Soft grey light. The flesh knits shut.\n\nThen he walks to the foot of your gangplank and waits for your wounded to come down to him. He heals them too, without asking and without waiting for thanks. His hands are cold and dry, and they smell of incense and grave dirt." },
        { t: "p", text: "Krull heals everyone who was hurt, dragons included. This is a real courtesy, not a trick. If a character died, he says \"Tsk,\" and then, calmly: \"Arkhan can bring that one back. For a price.\" See {@side raise-the-dead|Raise the Dead}." },

        { t: "h", text: "Event: The Ghouls" },
        { t: "read", text: "Up close, you see what is nailed to the tower's gate. A paladin's armour, dented and black with old blood, with the paladin still inside it. A row of helmets, each with a head still in it, eyes pecked out. A wizard's robes, stiff as boards. Flies crawl over all of it. Someone has carved a word into the iron above them in Common: GUESTS.\n\nThe iron gate creaks open. Four ghouls shuffle out behind the old priest. Their skin is grey and tight over their bones. Each one is gnawing something: a rib, a finger, a long thigh bone with meat still on it. They stare at you with wet yellow eyes. One of them drools onto the stones.\n\nKrull clicks his tongue. The ghouls flinch and look at the ground." },
        { t: "p", text: "The ghouls are Krull's assistants. They do not attack unless he lets them. Krull will not let the characters into the tower under any circumstances. If they ask, he says: \"I do not let guests inside. Nothing personal. The last guest became furniture.\"" },

        { t: "h", text: "Event: Krull Sees Moonkite" },
        { t: "read", text: "Krull's eyes move over your party, slow and careful, like a merchant pricing a cart. They stop on Moonkite, and stay there.\n\n\"Ah,\" he says softly. \"Now I understand why you came. And why he will want to see you.\"\n\nHe turns to the white dragon. \"We are going to the Monument, Obatala. Our guests will follow.\" Then he turns back to you. \"Arkhan is not here. He is at the Monument to Tiamat, praying. I will take you to him. Keep your ship behind Obatala and keep your hands away from your weapons. My master dislikes guests who arrive angry.\"" },
        { t: "note", title: "Krull's Rule", text: "Krull only leads visitors to Arkhan if they bring something Arkhan values. Moonkite is that thing. Krull does not say so out loud, but a character who reads him well can work it out (see below)." },

        { t: "h", text: "Checks with Krull" },
        { t: "list", items: [
          "A successful DC 15 Wisdom (Insight) check shows that the healing was sincere, and Krull is not leading them into an ambush.",
          "A successful DC 18 Wisdom (Insight) check shows that he is looking at Moonkite the way a buyer looks at goods. Moonkite is the reason they are welcome.",
          "A successful DC 20 Wisdom (Insight) check catches something sour on his face when he says Arkhan's name. He does not love his master as much as he says.",
          "A successful DC 15 Intelligence (Religion) check reads the runes on his shell: hundreds of prayers to Tiamat, each one cut by hand."
        ] },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...attack Krull when he lands.} Krull pulls into his shell. Obatala, an elder adult dragon stronger than any of the four, fights for real, with his full stat block, and the other dragons come back. From inside his shell Krull says, \"Children, you are being very foolish.\" After one round he calls a second halt. If the characters keep fighting, Krull says, \"Leave at once, or die,\" and means it. Let them run for open sky." },
        { t: "p", text: "{@b ...refuse to follow him.} Krull shrugs. \"Then leave at once, or die. Those are the two choices visitors get here.\" He lets them go. If they want to wait at the tower for Arkhan instead, Krull allows it outside the walls. Arkhan comes home in a day or two, with Torogar, but without his chimera. Run the talk outside the gate and ignore the skull." },
        { t: "p", text: "{@b ...try to fly straight to the Monument without him.} Krull will not say where it is. From the air, a DC 18 Wisdom (Survival) check follows a thin line of smoke to it after several hours. When they arrive unescorted, all twelve white abishai rush the ship and surround it, swords drawn. Arkhan still talks to them if they show him Moonkite, but he is colder, and he makes them wait." },
        { t: "p", text: "{@b ...ask about Arkhan.} Krull answers politely and says little. The real conversation happens on the way. See {@side krull-on-the-walk|What Krull Says on the Way}." },
        { t: "p", text: "When the characters agree to follow, go to {@scene to-the-monument|The Road to the Skull}." }
      ]
    },

    {
      id: "to-the-monument",
      title: "The Road to the Skull",
      when: "",
      duration: "20 minutes",
      banner: "art/official/white-abishai.webp",
      blocks: [
        { t: "p", text: "The Monument to Tiamat is several hours away by air, at the foot of a black mountain. Krull rides on Obatala's back, and the white dragon flies alongside the ship, close enough to talk across the rail. The tower dragons still standing follow far behind, sulking, and settle on the mountain above the skull. This is the party's best chance to learn about Arkhan before they meet him." },
        { t: "note", title: "Running This Scene", text: "Read the travel boxes and let the players question Krull between them. His answers are in {@side krull-on-the-walk|What Krull Says on the Way}. End the scene with the abishai rushing out, so the players arrive at the Monument already nervous." },

        { t: "h", text: "Event: Krull Flies Alongside" },
        { t: "read", text: "Krull climbs back onto Obatala, slow and careful. The white dragon climbs into the red sky, and Jeremy follows. Then Obatala drops in beside your ship, so close that one great wing almost brushes the rail, and Krull leans toward you from his back.\n\n\"It is a long way,\" he calls across. \"And I am old. And Obatala is not much of a talker.\"\n\nHe looks at each of you in turn, and for once he is not smiling. \"One thing, children, before we go, and I will say it plainly. Do not fight him. I have watched many champions try. I buried what was left of them. Talk to him, pay him, or walk away. Those are the ways out.\"\n\nThe four ghouls stay behind at the gate. They watch the ship go until it is out of sight." },

        { t: "h", text: "Event: The Field of Spikes" },
        { t: "read", text: "The bone fields give way to cracked red rock and slow rivers of glowing lava. Then you pass over a plain of iron spikes, hundreds of them in neat rows. Every spike holds someone.\n\nMost are still. Some are not. Their moans rise on the hot wind and fade behind you. A flock of small winged things hops from spike to spike, tearing off strips. The smell rises with the heat: old blood, opened bellies, and burnt hair." },
        { t: "p", text: "If anyone asks, Krull shrugs: \"Deserters. Debtors. A few liars. Avernus does not waste anything.\"" },

        { t: "h", text: "Event: The Old Battlefield" },
        { t: "read", text: "You fly over a battlefield that ended a few days ago. Demons and devils lie where they fell, tangled together, swelling and splitting in the heat. Carrion things with too many legs crawl in and out of them.\n\nThe foul stench of guts and regurgitated body parts fills the air. Demon blood boils on the hot rock in black, stinking bubbles. Somebody gags.\n\nKrull breathes in deeply, like an old man smelling fresh bread." },

        { t: "h", text: "Event: The Mountain and the Smoke" },
        { t: "read", text: "After hours, a black mountain rises ahead, jagged as a broken tooth. A thin line of yellow smoke climbs from its foot.\n\nKrull points. \"There. Tell your pilot to set down on the ridge. Not closer. The guards at the skull are... eager.\"" },
        { t: "read", text: "At the foot of the mountain lies a skull. A dragon's skull, so big a castle could sit inside its open jaws. It leans back against the rock as if the dragon died resting there. Bones lie all around it, ribs and spines and leg bones, each one as big as a house. Yellow smoke curls out of the skull's mouth and drifts up the mountain. It stinks of sulfur even from here.\n\nJust beside the skull, in open ground, stands a big black tent, like a general's tent in a war camp. Beside it squats a machine of black iron on two great spiked wheels.\n\nAround the tent, a dozen figures stand and chatter. They are the size of men, with white scales, white bat-like wings, and long swords that catch the red light." },

        { t: "h", text: "Event: The Abishai Rush" },
        { t: "read", text: "The moment your ship touches the ridge, the chattering stops. Twelve white heads turn at once. Twelve pairs of wings snap open. They come up the slope at you, fast and low, hissing, swords out.\n\nKrull raises one hand. \"Tiamat's children,\" he calls in Draconic, sounding bored. \"These are guests. Arkhan will want them.\"\n\nThe devils stop ten feet away. They do not lower their swords. Then one steps in, leans close to the nearest of you and breathes in, long and slow, as if tasting you. Its breath is ice cold and smells of old meat." },
        { t: "p", text: "These are {@c white-abishai|white abishai}, Tiamat's draconic devils. They rush anything that comes near the skull, and stop only for Krull's word or for something Arkhan values. Then they fall back into a ring around the tent and watch." },
        { t: "note", title: "Why the Devils Obey Krull", text: "Krull does not control the abishai. They are Tiamat's own devils, made from the souls of her dead worshippers, and they serve her chain of command: Tiamat, then her chosen champion Arkhan, then Arkhan's priest. Krull speaks with Arkhan's authority, so they stop when he speaks. They do not like it, which is why the swords stay up. If Krull falls out of Arkhan's favour (see {@side krull-trick|the Krull trick}), they stop listening to him at once." },

        { t: "h", text: "Checks on the Road" },
        { t: "list", items: [
          "A character who watches the route and succeeds on a DC 15 Wisdom (Survival) check remembers the straightest line from the skull back to the ridge. This helps in {@scene the-escape|the escape}: that character has advantage on the bone-field check there.",
          "Characters with a passive Wisdom (Perception) of 15 or higher see Krull look at the skull with something like longing, and then hide it.",
          "A successful DC 14 Wisdom (Insight) check on the abishai shows that they badly want to attack. Only fear of Arkhan holds them back."
        ] },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...refuse to land on the ridge and fly straight at the skull.} The abishai swarm into the air around the ship, hissing. Krull sighs: \"Children.\" Jeremy has to set down among the bones by the tent, and every abishai keeps a hand on its sword the whole time." },
        { t: "p", text: "{@b ...attack the abishai.} This is madness without an army, and Krull says so. Dozens more boil out of the caves behind the skull. Krull shouts them down after one exchange of blows. Arkhan walks out of his tent and gives his {@b last warning} (see Event: The Last Warning in {@scene arkhans-price|Arkhan's Price}; paraphrase it: he is standing outside, and the swords are already out). If the characters keep fighting, go to {@scene the-fight|The Fight with Arkhan}, and add 1d4 + 1 {@c white-abishai|white abishai} to the tracker at once with Add creature, because they were attacked." },
        { t: "p", text: "Go to {@scene the-monument|The Monument to Tiamat}." }
      ]
    },

    {
      id: "the-monument",
      title: "The Monument to Tiamat",
      when: "",
      duration: "30 minutes",
      banner: "art/official/arkhan-the-cruel.webp",
      blocks: [
        { t: "p", text: "Arkhan is camped here to pray. He tells Tiamat how his fight with the Hand of Vecna is going. Prayers spoken into the skull's mouth reach her. When she answers, she speaks in five voices at once, out of the dark. At the back of the skull, a tunnel runs down toward wherever she is kept. Nobody goes in." },
        { t: "note", title: "Arkhan's Rot", text: "The Hand of Vecna is slowly corrupting Arkhan. One side of his body is decomposing. To hold the rot back he must use the Hand to snuff out the life of good creatures. That is why he wants a good creature's death for the vial. Giving him one is an evil act. Let the players see the rot before they hear the price, so the price makes sense when it comes." },

        { t: "h", text: "The Monument, Area by Area" },
        { t: "h", text: "The Bone Field" },
        { t: "p", text: "Bones the size of houses lie everywhere around the skull: ribs like arches, leg bones like fallen towers. The biggest, a dragon's spine and ribcage curving across the ground between the ridge and the skull, form a maze of narrow, shadowed paths, lit by iron braziers. Smaller bones crunch underfoot on every step. Flies are thick here, and the ground is sticky." },
        { t: "h", text: "The Skull" },
        { t: "p", text: "A colossal dragon's skull leans against the mountain. Its open jaws could hold a small castle. Acrid yellow smoke drifts out of the maw, and the heat from inside is like an open oven. Every few breaths, from deep within, comes the sound of something enormous breathing slowly." },
        { t: "h", text: "The Maw" },
        { t: "p", text: "The floor inside the jaws is smooth stone, slick with soot. Here worshippers leave offerings and speak their prayers into the dark. A small black prayer-tent stands just inside the jaws. Tiamat hears them. The offerings are piled against the back teeth (see Treasure, below)." },
        { t: "h", text: "The Eye Sockets and the Caves" },
        { t: "p", text: "White abishai sleep in the skull's empty eye sockets. Behind the skull, the mountain is full of hot, stinking caves, and those caves are full of abishai: white, black, green, blue and red, far too many to count. Are they guarding Tiamat, or guarding the world from her? They never say. A small party that attacks this place will be buried in devils." },
        { t: "h", text: "The Tunnel" },
        { t: "p", text: "At the very back of the skull, a tunnel leads down into the dark toward Tiamat's lair. Deep inside it lairs {@c asojano|Asojano}, Arkhan's chimera. The characters should not go in. If they try, the abishai stop them, and so does common sense." },
        { t: "h", text: "Arkhan's Tent" },
        { t: "p", text: "A big military tent of black hide, pitched in open ground just beside the skull. Next to it stands a throne of dragon bones, where Arkhan holds court in the open. Inside: a worn rug, a map table, a brazier, and a small field altar to Tiamat with five candles, one of each colour. {@c manticore|Chango}, Arkhan's manticore, sprawls across the entrance. {@c torogar-steelfist|Torogar Steelfist}, his minotaur bodyguard, stands beside the flap." },
        { t: "h", text: "The Devil's Ride" },
        { t: "p", text: "Parked next to the tent is Torogar's {@b Devil's Ride}, a two-wheeled infernal war machine of black iron and spikes, with skulls bolted to the handlebars. It runs on a burning soul coin. It matters in {@scene the-escape|the escape}." },

        { t: "h", text: "Event: Through the Bones" },
        { t: "read", text: "Krull leads you down through the bones. Small ones crunch under your boots. Big ones loom over you like the ribs of a burned ship. The flies are so thick you breathe them. The ground is sticky, and it pulls at your feet.\n\nThe closer you get to the skull, the hotter it gets. The smoke from the maw stings your eyes and tastes of sulfur and scorched hair. And under the buzzing of the flies, from deep inside the skull, you hear something breathing. Slow. Enormous. Patient." },
        { t: "h", text: "Event: Arkhan's Demonstration" },
        { t: "p", text: "This is the third warning. Before the talk begins, the characters see what Arkhan can do. A captured adult gold dragon lies chained in front of the skull's maw, an offering for the Hand. Arkhan kills it while they watch." },
        { t: "read", text: "In front of the skull's maw, a dragon lies in chains. A gold dragon, almost as long as your ship, its scales dull and cracked, iron spikes driven through both wings into the ground. It lifts its head as you come out of the bones, and its eyes are full of hope. Then it sees Krull, and the hope goes out of them.\n\nA tall dragonborn in black armour stands beside it. He does not look at you. He raises his left hand, a shrivelled black thing, and points one finger at the dragon's head. A thread of green-black light leaps from the nail. The gold dragon convulses once, from snout to tail. Its scales go grey. Its eyes go white. Then it is still, and the smell of its death rolls over you, hot and sweet and rotten.\n\nThe dragonborn lifts his battleaxe and brings it down once, lazily, through the dragon's neck. The axe goes through scale and bone like a knife through bread. Frost spreads across the gold where it bites.\n\nOnly then does he turn to look at you. \"Forgive me,\" he says softly. \"It was hungry. Come in.\"" },
        { t: "p", text: "Arkhan used the Hand of Vecna ({@spell finger of death}) and one swing of Fane-Eater. For a moment after the kill, the rotting side of his face looks less grey. It does not last. It never does, and that is why he still needs Moonkite. That cost the Hand 5 of its 12 charges: if a fight comes later today, he starts it with 7." },
        { t: "read", text: "At the tent, a huge minotaur in scorched leather blocks the way. Flames crawl over his iron gauntlets when he flexes his fists. At his feet sprawls a manticore with a man's face and a grin far too wide, chewing something that used to have fingers. It laughs at you, a very human laugh.\n\nKrull bows to the minotaur. The minotaur does not bow back. He pulls the tent flap aside." },

        { t: "h", text: "Event: Arkhan" },
        { t: "read", text: "Inside, the tent smells of incense, and under the incense, of rotting meat.\n\nThe dragonborn from the skull has gone in ahead of you. He sits on a camp stool before a small altar with five candles. He wears black plate made from a dragon's scales. A battleaxe rests across his knees, and the air around its blade is frosted white. At his throat, on a chain, hangs a small crystal vial. The dark blood inside it moves on its own.\n\nHe turns to look at you, and you see the other half of his face. It is grey and sunken. The scales are peeling away from it in patches, and underneath, the flesh is soft and dark. His left hand is not his. It is black and shrivelled, with long yellow nails, fixed to his wrist with iron staples." },
        { t: "read", text: "\"You survived my dragons' welcome. Good. They do overdo things, and I would hate for this to end before we have talked.\"\n\nHis voice is soft and polite. He does not stand.\n\n\"Sit, if you like. Stand ready, if you would rather. I already know what you want.\" He touches the vial with his good hand, without looking at it. \"Tiamat's blood. Everyone who comes here wants Tiamat's blood. What interests me is what you will give for it.\"" },
        { t: "p", text: "This is {@c arkhan-the-cruel|Arkhan the Cruel}. He is calm, polite and very dangerous. He does not attack first. He wants to make a deal." },

        { t: "h", text: "Event: The Five Voices" },
        { t: "p", text: "Use this the first time someone mentions Moonkite, or when Arkhan steps out to pray into the maw, or whenever the room needs a chill." },
        { t: "read", text: "The smoke drifting from the skull's maw stops moving. Outside the tent, every abishai drops to its knees at once.\n\nFrom deep in the dark, a voice speaks. No. Five voices. One hisses. One crackles. One bubbles. One rasps like ice. One roars like a furnace. Each one finishes what the last one started.\n\n\"A star-beast.\" \"In our house.\" \"How kind.\" \"How very...\" \"...kind.\"\n\nThen the smoke moves again, and the voices are gone. Arkhan smiles with half of his face." },

        { t: "h", text: "Checks at the Monument" },
        { t: "list", items: [
          "Characters with a passive Wisdom (Perception) of 16 or higher see movement in the skull's eye sockets and the caves behind it: dozens more abishai, of every colour. Fighting here means fighting all of them.",
          "A successful DC 12 Wisdom (Medicine) check shows that half of Arkhan's body is dying, and the rot is spreading.",
          "A successful DC 18 Wisdom (Insight) check shows that Arkhan is in pain all the time, and that he is watching Krull more closely than he watches the party.",
          "A successful DC 18 Intelligence (Arcana or History) check identifies the hand as the Hand of Vecna, an artifact of a lich who became a god. Wearing it means cutting off your own hand first. It grants terrible spells, and it slowly corrupts its owner.",
          "A successful DC 15 Intelligence (Religion) check recognises the skull as a shrine where Tiamat hears prayers. On a 20 or higher, the character also knows that Tiamat is imprisoned somewhere in Avernus, and that the tunnel probably leads to her.",
          "Any character who sizes Arkhan up and succeeds on a DC 10 Wisdom (Insight) or Intelligence (Arcana) check simply knows it: they cannot win this fight, and they would be lucky to escape it. This is the fourth warning. Call for it."
        ] },

        { t: "h", text: "Treasure" },
        { t: "p", text: "Offerings to Tiamat are piled against the back teeth of the maw. Taking any of them counts as robbing Tiamat. Arkhan treats it as an insult, and the fight starts." },
        { t: "list", items: [
          "A silver diadem set with sapphires, taken from some noble's head (750 gp).",
          "An onyx statuette of a five-headed dragon with gemstone eyes (2,500 gp).",
          "A blue dragon's tooth carved with Draconic prayers (250 gp).",
          "A bronze bowl holding three {@item soul coin|BGDIA}s, still whispering.",
          "A small chest of mixed coins from a dozen worlds (1,200 gp).",
          "A {@item potion of fire breath|DMG} in a red glass bottle shaped like a dragon's head."
        ] },
        { t: "p", text: "Krull carries a {@item +1 maul|DMG}, five healing potions ({@item potion of healing|DMG}) and two soul coins in his sling bag." },
        { t: "p", text: "When Arkhan names his price, go to {@scene arkhans-price|Arkhan's Price}." }
      ]
    },

    {
      id: "arkhans-price",
      title: "Arkhan's Price",
      when: "",
      duration: "30 to 45 minutes",
      banner: "art/official/arkhan-the-cruel.webp",
      blocks: [
        { t: "p", text: "Arkhan wants the characters to give him a good creature to kill with the Hand of Vecna. The death feeds the Hand and holds back his rot. He asks for two, one after the other: first Moonkite, then Lulu. He will trade the vial for either one, and he will keep his word exactly." },
        { t: "note", title: "Running the Negotiation", text: "Arkhan is never in a hurry. He answers questions (see {@side what-arkhan-knows|What Arkhan Knows}), he listens to offers, and he is honest about what he wants. The price never changes: a good creature's death. Everything else is open to talk." },

        { t: "h", text: "Event: The First Price" },
        { t: "read", text: "Arkhan raises the black hand and turns it slowly in the candlelight. The fingers twitch on their own.\n\n\"You see what I carry. It gives me everything. It also eats me, a little more each day.\" He touches the rotting side of his face. \"It must be fed, or it takes the rest of me. And it only eats one thing: the life of something good.\"\n\nHis eyes go past you to Moonkite.\n\n\"The star-beast. I can smell the upper heavens on it from here. Give it to me, and the vial is yours before the hour is out. A fair trade: one bright life, for a god's own blood.\"" },
        { t: "p", text: "{@c moonkite|Moonkite} understands. Its light dims to almost nothing. It presses itself against Aurora and does not move. Let Aurora's player answer. Do not hurry them." },

        { t: "h", text: "Event: The Second Price" },
        { t: "p", text: "If the characters refuse, Arkhan does not argue. He simply moves on." },
        { t: "read", text: "\"No? Sentimental. Well, I am not unreasonable.\" He smiles like a man doing you a favour.\n\n\"The little elephant, then. The hollyphant. She is smaller. Quieter. Worth less to my queen than the star-beast. But she is good all the way through. I can taste it from here.\" He leans back. \"One good death, your choice which. Then we part as friends.\"" },
        { t: "h", text: "Lulu's Reaction" },
        { t: "read", text: "Lulu's trunk curls tight against her chest. Her wings fold flat. For a long moment she says nothing at all.\n\nThen, in a very small voice: \"I understand. I am small, and I am good, and that is what he wants.\" She looks up at you. \"I am frightened. But I understand.\"" },
        { t: "p", text: "DM choice: Lulu may offer herself, to spare Moonkite and to get the party what it needs. If she does, she means it. The characters can still say no. If the characters refuse to give her, she cries quietly with relief and does not leave their side for the rest of the session." },

        { t: "h", text: "Haggling with Arkhan" },
        { t: "p", text: "The characters can try to talk Arkhan into a better deal. What moves him, and what never does:" },
        { t: "list", items: [
          "{@b Persuasion, DC 20.} On a success, Arkhan adds a sweetener, but never changes the price. He might add safe passage from Avernus's dragons, or one free {@spell raise dead} for a character whose body he holds, or an answer from {@side what-arkhan-knows|What Arkhan Knows} for free.",
          "{@b Intimidation.} It always fails. He laughs, kindly. On a 25 or higher, he respects the nerve, and the next Persuasion check against him has advantage.",
          "{@b Deception, DC 22.} To pass off a creature as good when it is not. Arkhan tastes goodness through the Hand (\"I can taste it from here\"), so a lie about alignment is found out at the altar. A failed lie is an insult: go to {@scene the-fight|the fight}."
        ] },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...offer a different good creature.} Arkhan accepts any truly good creature, willing or not. Allies count. Veska is a Hellrider and good to the bone, and Arkhan says so if no one else does. If the party offers an ally, that ally hears it." },
        { t: "p", text: "{@b ...offer an evil creature, such as a captured devil.} He refuses. \"My queen has evil in plenty. The Hand does not eat what it already owns.\"" },
        { t: "p", text: "{@b ...offer gold, magic or soul coins.} He is tempted, and says so, but no. \"Gold does not stop rot.\" Soul coins make him pause: a soul coin is a soul, but not a good one, and not alive. Still no." },
        { t: "p", text: "{@b ...offer service.} He is interested. He asks for one task, later, no questions asked. This is where Gargauth speaks up; see {@side gargauth-trick|The Gargauth Trick}. Service alone still does not buy the vial: the Hand must eat." },
        { t: "p", text: "{@b ...try to steal the vial.} Arkhan sees invisible creatures and misses nothing within reach. A character must make a DC 25 Dexterity (Sleight of Hand) check, and only if something else is holding his attention (Tiamat's voices, Krull's outburst, a fight). Without a distraction, it fails automatically. On a failure, his rotting hand closes on the thief's wrist: \"That was rude.\" The fight starts, and he gets a free Fane-Eater attack on the thief first. On a success, the chain snaps and the vial is theirs. He notices at the end of his next turn, and the fight starts anyway." },
        { t: "p", text: "{@b ...cast a spell on him mid-talk.} A harmful spell is an attack: go to the fight. A spell like {@spell detect thoughts} touches a mind full of five whispering voices; the caster must succeed on a DC 15 Wisdom saving throw or be stunned until the end of their next turn. Arkhan just smiles. If someone casts {@spell zone of truth}, he agrees happily. He has not lied once." },
        { t: "p", text: "{@b ...ask about the vial.} A successful DC 17 Intelligence (Arcana or Religion) check confirms it is truly a goddess's blood. It is warm. It is still alive. It moves toward whoever holds it, and it whispers in Draconic when it is dark." },

        { t: "h", text: "Event: The Last Warning" },
        { t: "p", text: "Read this the moment a character draws a weapon, insults Arkhan to his face, starts a hostile spell, or reaches for the vial. Arkhan gives exactly one beat. If the character backs down, the talk goes on. If not, roll initiative." },
        { t: "read", text: "Nobody moves. Outside, twelve swords whisper out of twelve sheaths. The minotaur's fists catch fire. Deep in the skull, something enormous stops breathing to listen.\n\nArkhan does not stand. He does not reach for his axe. He only lifts one finger of the black hand.\n\n\"You get one,\" he says quietly. \"That was it.\"" },
        { t: "choices", prompt: "What do the characters do?", items: [
          { label: "Agree to give Moonkite or Lulu (or another good creature)", goto: "ending" },
          { label: "Refuse both", goto: "arkhans-tricks" },
          { label: "Insult Arkhan, try to steal the vial, or attack him", goto: "the-fight" },
          { label: "Ask Arkhan questions first", side: "what-arkhan-knows" }
        ] }
      ]
    },

    {
      id: "arkhans-tricks",
      title: "Arkhan's Tricks",
      when: "Only if they refuse the price",
      duration: "20 minutes",
      banner: "art/official/krull.webp",
      blocks: [
        { t: "p", text: "A simple no does not make Arkhan angry. He has waited a long time. He would rather win a deal than a fight, so he tries to change the board. He uses one or both of two tricks: {@side gargauth-trick|the Gargauth trick} and {@side krull-trick|the Krull trick}." },
        { t: "note", title: "Why Arkhan Plays Tricks", text: "A fight costs him blood, time and Hand charges. A trick costs him nothing. Each trick either gets him a deal, or gets him leverage over someone in the room. Neither trick is a fight by itself. If the characters insult him, try to steal the vial or attack him at any point, go to the fight." },

        { t: "h", text: "Event: The Refusal" },
        { t: "read", text: "Arkhan is quiet for a long moment. The candles on the little altar gutter, though there is no wind.\n\n\"No to the star-beast. No to the little elephant.\" He nods slowly, as if you have told him the weather. \"Then we are still friends. Friends who want different things.\"\n\nHe stands for the first time since you came in. In the low tent, he is very tall. The rotting side of him creaks inside the armour, and the smell of it rolls across the tent, sweet and thick, like meat left in a cellar.\n\n\"Let us see,\" he says gently, \"who in this room wants something.\"" },

        { t: "h", text: "Running the Tricks" },
        { t: "steps", items: [
          "Arkhan turns to Drenwal's shield first. Open {@side gargauth-trick|The Gargauth Trick}.",
          "If that does not get a deal, he turns on Krull. Open {@side krull-trick|The Krull Trick}.",
          "After each trick, Arkhan asks once more, politely, for Moonkite or Lulu.",
          "If the characters still refuse and stay polite, Arkhan lets them leave. Go to {@scene ending|Ending the Session}: no vial, no fight, and an open door."
        ] },

        { t: "h", text: "Event: Drenwal's Shield Whispers" },
        { t: "p", text: "Whenever the talk turns to service, debts or rebirth, the Shield of the Hidden Lord grows cold on Drenwal's arm. Only Drenwal hears what comes out of it." },
        { t: "read", text: "A low, kind voice, very close to your ear, the way it always is: \"Careful, Drenwal. He is not lying. That is what makes him dangerous. Let me help you.\"" },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...leave politely without a deal.} Arkhan lets them go. Krull walks them back to the ship. Arkhan's offer stays open: \"Come back when the price seems smaller. It will.\" The tower is not hostile." },
        { t: "p", text: "{@b ...try to turn Krull against Arkhan themselves.} A successful DC 18 Charisma (Persuasion) check, made where Arkhan cannot hear, gets a long look from Krull and the words, \"Not today, child.\" Then it plants a seed: the next time the Krull trick fires, Krull turns on Arkhan." },
        { t: "p", text: "{@b ...lose their temper.} Go to {@scene the-fight|The Fight with Arkhan}." },

        { t: "choices", prompt: "After the tricks, what happens?", items: [
          { label: "The characters accept a deal", goto: "ending" },
          { label: "The characters leave politely with no deal", goto: "ending" },
          { label: "The characters insult Arkhan, steal the vial, or attack", goto: "the-fight" }
        ] }
      ]
    },

    {
      id: "the-fight",
      title: "The Fight with Arkhan",
      when: "Only if they wrong Arkhan",
      duration: "45 minutes",
      banner: "art/official/arkhan-the-cruel.webp",
      blocks: [
        { t: "p", text: "{@c arkhan-the-cruel|Arkhan} is far stronger than the characters. This fight is not meant to be won. The characters' real goal is to get back to the ship alive." },
        { t: "note", title: "It Happens", text: "The players were told before the session, warned at the gate, warned by Krull, shown the gold dragon, and given a last warning. Now do not fudge. A character who falls next to Arkhan dies: a melee hit from within 5 ft. on a dying character is a critical hit, each one counts as two failed death saves, and he attacks three times a turn. {@b Ruling:} if the party gets the body out, Drenwal's own {@spell revivify} and {@spell raise dead} work by the normal rules. But Arkhan keeps whatever falls in his temple. A character who dies in the showdown and is left behind can only come back through Krull brokering Arkhan's {@spell raise dead}, at Arkhan's price (see {@side raise-the-dead|Raise the Dead}). Tell the players plainly, once more, that running is the right call." },

        { t: "h", text: "Event: The Fight Begins" },
        { t: "read", text: "Arkhan sighs, the way a teacher sighs at a slow pupil.\n\n\"Torogar.\"\n\nThe minotaur roars, and fire bursts over both his fists. Outside, twelve swords hiss from twelve sheaths at once. The manticore is suddenly on its feet, tail raised, spikes rattling.\n\nArkhan rises and lifts his axe. Frost runs down the blade. Golden-red light, Tiamat's own light, flares along the edge.\n\nAnd from deep in the skull, five voices laugh." },
        { t: "map", src: "maps/monument-battlemap.webp", title: "The Monument to Tiamat", note: "The skull is on the left, facing you, jaws wide open, with a small prayer-tent inside the maw. Arkhan's black tent and bone throne stand just right of it, in open ground: Arkhan, Torogar and Chango start there. The dragon spine and ribcage on the right, with its three braziers, is the bone maze; the characters come in through it. The dark rocky rise along the right edge is the slope up to the ridge, where the Lady Vengeance waits off-map. Not drawn: the mountain the skull leans on, and Torogar's Devil's Ride (put a token beside Arkhan's tent)." },

        { t: "h", text: "Who Fights" },
        { t: "p", text: "Arkhan, his bodyguard {@c torogar-steelfist|Torogar}, his manticore {@c manticore|Chango}, and {@c krull|Krull}, unless Krull already turned on Arkhan. If the characters start winning, Arkhan orders the {@c white-abishai|white abishai} around the tent to join in: 1d4 + 1 of them arrive." },
        { t: "p", text: "{@b Optional escalation.} As a bonus action, Arkhan can call {@c asojano|Asojano}, the chimera that lairs deep in the skull. Asojano is not in the fight below. Use him only if the characters are doing far better than expected, and add him to the tracker with Add creature." },

        { t: "h", text: "The Skull Breathes" },
        { t: "read", text: "From the dark of the skull's maw comes a hiss, then a rumble. A cone of burning colour rolls out across the bones. It is aimed at you, and only you. It curls around Arkhan as if it loves him." },
        { t: "p", text: "Once every round, on initiative count 20, one of Tiamat's five voices hisses from the skull and breathes a 30-foot cone at the characters and their allies (Arkhan's lair action). Cycle the colours: white (cold), black (acid), green (poison), blue (lightning), red (fire)." },

        { t: "h", text: "How Arkhan Fights, in Order" },
        { t: "steps", items: [
          "First turn. He attacks Drenwal three times, because the healer keeps the party alive. He orders Torogar to block the nearest fighter.",
          "Aurora and Moonkite. He does not kill them. He grabs them with the Hand of Vecna, because he still wants Moonkite.",
          "Or'Henn. He attacks him next, especially after Or'Henn changes into a beast.",
          "Spellcasters. Anyone who casts a spell to stop him becomes his next target.",
          "Fallen allies. If Torogar or Krull drops, Arkhan uses {@spell revivify} on them as soon as he can.",
          "When he is down to half his hit points, he teleports home to his tower with as many allies as he can take. He never risks losing the Hand of Vecna or his axe."
        ] },

        { t: "h", text: "If the Characters..." },
        { t: "p", text: "{@b ...grab the vial.} Arkhan fights carefully and teleports out sooner, the moment any of his allies drops." },
        { t: "p", text: "{@b ...hide in the skull's maw.} The breath comes from inside. Every cone hits them, and the abishai roosts are right above." },
        { t: "p", text: "{@b ...run for the ship.} That is the right call. Go to {@scene the-escape|the Escape}." },

        { t: "h", text: "Event: Arkhan Withdraws" },
        { t: "p", text: "Read this when Arkhan reaches half his hit points and teleports away." },
        { t: "read", text: "Arkhan staggers. For the first time, he looks surprised. Black blood runs from the rotting side of his face.\n\n\"Enough,\" he says quietly. \"Torogar. Krull. To me.\"\n\nThe black hand closes into a fist. The air folds. And Arkhan, and whoever stands beside him, are simply gone. Only the smell of him stays behind, sweet and rotten.\n\nThe abishai scream with fury. And from the skull, very softly, five voices say: \"Run.\"" },

        { t: "encounter", id: "the-fight-combat", title: "The Showdown", combatants: [
          { c: "arkhan-the-cruel", n: 1 },
          { c: "torogar-steelfist", n: 1 },
          { c: "manticore", n: 1 },
          { c: "krull", n: 1 }
        ], lair: "arkhan-the-cruel", notes: "Krull only fights if he hasn't already turned on Arkhan. If the party is clearly winning, add 1d4+1 white abishai from around the tent. Asojano is optional (Add creature)." },
        { t: "p", text: "When the characters run, go to {@scene the-escape|the Escape}." }
      ]
    },

    {
      id: "the-escape",
      title: "The Escape",
      when: "Only after the fight",
      duration: "20 to 30 minutes",
      banner: "art/official/adult-white-dragon.webp",
      blocks: [
        { t: "p", text: "The characters run for the {@c lady-vengeance|Lady Vengeance} in four legs. Arkhan stays at the skull, or has already teleported home. Torogar, Chango, Obatala and any tower dragons still standing chase them. If Arkhan teleported away, whoever he took with him is gone too: skip their part of each leg." },
        { t: "note", title: "Running the Escape", text: "Run each leg as one or two rounds. Read the box, show the obstacle, call for the check, and move on. Keep it fast. The danger is real, but the party should usually make it." },
        { t: "map", src: "maps/monument-battlemap.webp", title: "The Monument to Tiamat", note: "Same map as the fight. The characters run from Arkhan's tent beside the skull, through the spine-and-rib maze on the right, then up the dark rocky rise along the right edge to the ridge, where the ship comes in low off-map." },

        { t: "h", text: "Leg 1: The Tent" },
        { t: "read", text: "You run. Behind you the tent goes up in flames, and the minotaur comes through the burning canvas like a bull through a fence, horns down, fists blazing.\n\nThe skull hisses again. Another cone of colour rolls across the bones after you." },
        { t: "p", text: "{@b Obstacle.} Torogar grabs the slowest character. That character must use their action to break free: a Strength (Athletics) or Dexterity (Acrobatics) check against Torogar's Strength (Athletics) check. The skull breathes one last time (DC 16 save, as in the fight)." },
        { t: "p", text: "{@b Success:} the character tears loose and runs. {@b Failure:} Torogar keeps hold. The others can come back to help, or Moonkite can swoop in and snatch the character away." },

        { t: "h", text: "Leg 2: The Devil's Ride and the Bone Maze" },
        { t: "read", text: "The bones rise around you, ribs like arches and skulls like houses, and every path looks the same. Flies burst up in clouds. Behind you, something coughs and roars into life: Torogar's war machine. Its furnace glows with a burning soul coin, and the soul inside is screaming." },
        { t: "p", text: "{@b Obstacle.} The maze, and the Devil's Ride. The characters need to find the way out. One character makes a DC 14 Wisdom (Survival) or Intelligence (Investigation) check for the group. A character who memorised the route on the way in has advantage." },
        { t: "p", text: "{@b Success:} straight out, one round. {@b Failure:} a wrong turn costs a round, and Chango gets a free volley of tail spikes at the group." },
        { t: "p", text: "{@b The Devil's Ride is a chance.} If a character reaches it before Torogar does, they can steal it. Getting it moving takes a DC 15 Dexterity check (add proficiency with land vehicles), and a new check each round to keep it upright on the bones. It can carry the driver and one passenger, and it outruns anything on foot. If no one takes it, Torogar rides it after them." },

        { t: "h", text: "Leg 3: The Open Sky" },
        { t: "read", text: "You burst out of the bones onto the open slope. The sky above is full of wings. The great white dragon drops out of the clouds, roaring, and frost hisses into steam on the rocks around you. Smaller dragons scream behind it.\n\nThe manticore laughs from somewhere above, and iron spikes rain down around you, thunk, thunk, thunk, into the bone and the ground." },
        { t: "p", text: "{@b Obstacle.} Obatala's Frightful Presence (DC 16 Wisdom save) and the spike volleys. Every character on foot also makes a DC 15 Dexterity (Acrobatics) check to keep their footing on the loose slope." },
        { t: "p", text: "{@b Success:} the character keeps running. {@b Failure:} they fall prone, take one tail spike hit (18 piercing), and lose half their movement this round. Frightened characters can still run; they just cannot come closer to Obatala." },

        { t: "h", text: "Leg 4: The Ship" },
        { t: "read", text: "And there she is. The Lady Vengeance comes over the ridge low and fast, Jeremy screaming something you cannot hear, the cannons blazing at the dragons. She drops so low her keel scrapes the rocks. The rail is right there.\n\nJump." },
        { t: "p", text: "{@b Obstacle.} Jeremy brings the ship in low without being told. Each character on foot makes a DC 12 Strength (Athletics) or Dexterity (Acrobatics) check to jump aboard. Jeremy makes a DC 15 Intelligence (Arcana) check to keep the ship steady while Obatala's breath hits the hull." },
        { t: "p", text: "{@b Success:} aboard, and away. {@b Failure:} the character misses the rail and falls. The aether harpoon can catch them (+9 to hit, as a rescue, not an attack) and reel them in. If Jeremy fails his check, the ship lurches: everyone on deck makes a DC 12 Dexterity save or falls prone." },
        { t: "note", title: "The Soul Coin Overdrive", text: "If things go very badly, see {@side soul-coin-overdrive|Soul Coin Overdrive}." },
        { t: "p", text: "{@b If the characters stole the vial or killed Krull,} Arkhan teleports onto the ship's deck once, as a last scare. He says one sentence: \"I will remember your faces.\" Then he is gone again." },

        { t: "encounter", id: "the-escape-chase", title: "The Chase", combatants: [
          { c: "obatala", n: 1 },
          { c: "torogar-steelfist", n: 1 },
          { c: "manticore", n: 1 }
        ], notes: "Add any tower dragons from the dragon ambush that are still standing. Drop anyone who teleported out with Arkhan." },

        { t: "h", text: "Event: Away" },
        { t: "read", text: "The ship climbs. Obatala follows for a long time, a white shape in the red murk, roaring. Then, at last, he turns back.\n\nBehind you, the great skull grows small against the mountain. The smoke from its maw rises straight up, slow and patient, as if nothing at all has happened. You are bleeding. The deck is scorched. Someone is laughing, and someone is crying, and it might be the same person." },
        { t: "p", text: "Go to {@scene ending|Ending the Session}." }
      ]
    },

    {
      id: "ending",
      title: "Ending the Session",
      when: "",
      duration: "10 minutes",
      blocks: [
        { t: "p", text: "Find the outcome below that matches what happened, read its box, and note what changes for the campaign." },

        { t: "h", text: "Outcome: Moonkite Was Given" },
        { t: "read", text: "Arkhan lays the black hand on Moonkite's brow, almost gently. The celestial's light flares once, bright as a star, so bright the abishai cover their eyes. Then it goes out.\n\nFor one moment the rotting side of Arkhan's face is smooth and whole. He closes his eyes and breathes out. Then he lifts the chain from his neck and puts the warm vial in your hand.\n\n\"A fair trade,\" he says. \"My queen thanks you.\"" },
        { t: "p", text: "The party has the blood. Aurora loses her companion. {@b Campaign change:} freeing the Caged Star needed Moonkite as its celestial witness. That road now needs another witness, or it is closed. Moonkite may not be gone for good: see {@side arc-moonkite|Arc: Aurora and Moonkite}, Branch B. Within 10 days, a vial of Tears of the Caged Star can call it back. Arkhan is cordial to the party from now on." },

        { t: "h", text: "Outcome: Lulu Was Given" },
        { t: "read", text: "Lulu does not struggle. She looks back at you once, and her trunk lifts, as if she wants to say something. Then the black hand touches her, and her small golden light goes out like a candle.\n\nIn the silence afterward, you can hear the flies. Arkhan puts the warm vial in your hand. It feels heavier than it should." },
        { t: "p", text: "The party has the blood. The whole party grieves. {@b Campaign change:} Lulu's memories were the most direct road to the Bleeding Citadel and the Sword of Zariel. That road is gone. The Fallen Three are now the only way to the Citadel. Moonkite grieves her, and soul-freeing loses its shepherd (see {@side arc-moonkite|Arc: Aurora and Moonkite}, Branch A). Freeing the Caged Star also needed her memory. Arkhan is cordial to the party from now on." },

        { t: "h", text: "Outcome: Another Good Creature Was Given" },
        { t: "p", text: "Use the Moonkite box, changed to fit. If it was an ally such as Veska, the other allies remember. Note it in the campaign log: some of them may not stay." },

        { t: "h", text: "Outcome: They Left Politely, With No Deal" },
        { t: "read", text: "Krull walks you back up the slope to the ship. He says nothing for a long time. At the rail he stops.\n\n\"He will still be here,\" the old tortle says. \"And the price will still be the price. It always is.\" He climbs onto Obatala and is gone." },
        { t: "p", text: "No vial. No fight. The door stays open, and the tower is not hostile." },

        { t: "h", text: "Outcome: They Fought and Escaped" },
        { t: "read", text: "Somewhere far behind you, a dragon is still roaring. You are alive. You have nothing to show for it but burns and bruises and the memory of five voices laughing in the dark.\n\nArkhan the Cruel knows your faces now." },
        { t: "p", text: "No vial, unless they stole it. Arkhan is now their enemy, and any return to the tower starts as a fight. Write down what happened to Krull: loyal, turned, or dead." },

        { t: "h", text: "Outcome: A Character Died" },
        { t: "p", text: "Krull offers to have Arkhan bring that character back to life. See {@side raise-the-dead|Raise the Dead}. Only one character a day. The price is a favour, a soul coin or a debt." },

        { t: "h", text: "What the Vial Does" },
        { t: "p", text: "The vial holds a few spoonfuls of Tiamat's living blood. It is warm, it moves, and it whispers in Draconic in the dark. {@b DM: confirm with the table what the party needs it for.} Two suggested uses:" },
        { t: "list", items: [
          "{@b Uldrak's curse (the book's road).} Spilled on the ground of Avernus at Uldrak's Grave, it breaks the curse on Uldrak, an empyrean that Tiamat turned into a spined devil. Restored, he gives the party a gallon of his own empyrean blood, then plane shifts home to his god, Surtur. (In the book that blood frees the dao Ralzala at the Demon Zapper; in this campaign that link is already spent.)",
          "{@b A price at the Mirror of Mephistar.} Mephistopheles collects the blood of powers. The vial buys a full, honest answer from his mirror, and perhaps news of Dumal, who was last seen heading there."
        ] },

        { t: "note", title: "Remember for Next Time", text: "Write down: did the Gargauth trick happen, and what did Drenwal promise? What happened to Krull? Who was given, if anyone? Is the tower friendly, open, or hostile? Did anyone touch the Styx, and what did they forget?" }
      ]
    }

  ],

  side: {

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

    "krull-on-the-walk": {
      title: "What Krull Says on the Way",
      blocks: [
        { t: "p", text: "On the way to the Monument, Krull rides on Obatala's back, alongside the Lady Vengeance, close enough to talk across the rail. He is talkative in a slow, dry way. He answers almost anything, and each answer has a little hook in it." },
        { t: "list", items: [
          "{@b About Arkhan:} \"A great man. A very great man. He gave his own hand for our queen. Lately he gives more than that.\" He touches the left side of his own face, and says no more.",
          "{@b About the Hand:} \"It eats. He feeds it. Do not let him touch you with it, children, unless you have agreed to something.\"",
          "{@b The warning (always say this one):} \"Do not fight him. I have watched many champions try. I buried what was left of them.\"",
          "{@b About the price:} \"He will ask for something good. He always does. Do not argue about the price. Argue about the extras.\"",
          "{@b About himself:} \"I have served Tiamat for a hundred and twelve years. I carved every prayer on this shell myself. She has never answered one of them directly.\" A pause. \"She answers him.\"",
          "{@b About the dragons:} \"Children. Bored children. The red one is called Flash. Do not call him that to his face.\"",
          "{@b About the tower:} \"My workshops. My dead. His rooms. The nurseries. No, you may not see them.\"",
          "{@b About Moonkite:} he looks at it a long time. \"Beautiful. I am sorry.\" He does not explain."
        ] },
        { t: "note", title: "What Krull Wants", text: "Krull wants Arkhan's place. A character who asks the right question, and succeeds on a DC 20 Wisdom (Insight) check, hears it under every answer. Krull will not act on it today unless Arkhan pushes him (see {@side krull-trick|The Krull Trick})." }
      ]
    },

    "gargauth-trick": {
      title: "The Gargauth Trick",
      blocks: [
        { t: "p", text: "Arkhan deals with fiends for a living. In the middle of the talk, his eyes find what is bound inside Drenwal's shield." },
        { t: "read", text: "Arkhan's eyes flick to the shield on Drenwal's arm, and stay there a beat too long.\n\n\"Hm. You carry a passenger, priest. I know that kind of prison. Old work. Proud work.\" He smiles. \"Tell your little exile he and I can speak more plainly than you and I can, if he is willing.\"" },
        { t: "p", text: "The devil Gargauth is trapped in the Shield of the Hidden Lord. He does not want to help Arkhan, and he does not want to help Drenwal. He wants to be the god who catches Drenwal when he dies and is reborn, and to own him forever after. Every move he makes serves that." },
        { t: "p", text: "Pass Drenwal's player a secret note, or take them aside. Gargauth whispers through the shield, to Drenwal only:" },
        { t: "read", text: "\"He will take the little elephant and never trouble you again. Or, and he does not know I am telling you this, he would give you the blood for a promise: your service, after your rebirth. He thinks he is dealing with me. Let him think it. It costs you nothing to let two devils believe they are clever.\"" },
        { t: "h", text: "If Drenwal Agrees" },
        { t: "p", text: "Gargauth oversold it. Arkhan accepts a promise of service as a sweetener, but the Hand must still eat: the vial still costs a good creature's death. A promise does not replace the price. But it does go on the books. Drenwal now owes Arkhan one service after his rebirth, and Gargauth was the one who brokered it. Raise Gargauth's Bargain on the campaign tracker (suggested: +3)." },
        { t: "h", text: "If Drenwal Refuses" },
        { t: "read", text: "The shield goes quiet. Then, so softly it might be imagined: \"As you like. I will be here when you change your mind.\"" },
        { t: "note", title: "Gargauth's Angle", text: "Gargauth wins either way. If Drenwal agrees, he owes a devil and Gargauth held the pen. If he refuses, he remembers that Gargauth knew a way out and he did not take it. Play Gargauth as the only one in the room who seems to be on Drenwal's side. He is not." }
      ]
    },

    "krull-trick": {
      title: "The Krull Trick",
      blocks: [
        { t: "p", text: "Arkhan knows Krull has wanted his place for a hundred years. He uses the characters as an audience, and Krull as the knife." },
        { t: "read", text: "Arkhan turns to the old tortle as if he has just remembered him.\n\n\"Krull healed you today, did he not. Gentle old Krull. He has been gentle a long time. Gentle enough that our queen has not tasted his devotion in... what is it now, Krull? A century?\" He smiles. \"She wonders, sometimes, whether gentleness is a virtue, or a vacancy.\"" },
        { t: "read", text: "Krull goes very still. His old eyes stop blinking. The runes on his shell, a hundred years of prayers, seem to darken in the candlelight. Outside, the abishai stop chattering." },
        { t: "p", text: "Krull loses his temper. Choose what he does:" },
        { t: "list", items: [
          "{@b He turns on the characters,} to prove he is loyal. He attacks one of them with his maul. Arkhan watches, lets it go one round, then raises his good hand: \"Enough. You see how my people love me. Shall we start again, as friends?\" Arkhan now holds the moral high ground, and the party owes him for stopping it.",
          "{@b He turns on Arkhan,} finally reaching for the champion's place. He casts {@spell contagion} or swings his maul. Arkhan kills him in a round or two, without hurry. Then he turns to the party: \"See what betrayal earns here. I would never do that to you.\""
        ] },
        { t: "p", text: "Read this only if Krull dies." },
        { t: "read", text: "The old tortle falls without a sound. His shell cracks on the stone floor, and a hundred years of prayers split down the middle.\n\nArkhan wipes his axe on the rug. \"Tsk,\" he says, in Krull's own voice, and smiles." },
        { t: "note", title: "Krull Is Not an Escape Hatch", text: "Arkhan steers this. Whichever way Krull breaks, Arkhan gains leverage. Do not let Krull's outburst solve the scene for free. If Krull dies, Arkhan can still raise him later, and might. If the characters insult Arkhan, try to steal the vial or attack him, go to {@scene the-fight|The Fight with Arkhan}." }
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

    "soul-coin-overdrive": {
      title: "Soul Coin Overdrive",
      blocks: [
        { t: "p", text: "If the escape is going very badly, Jeremy can feed a soul coin into the core of the {@c lady-vengeance|Lady Vengeance}. For one minute she becomes a monster. This uses the ship's own Soul Coin Overdrive (engineer, once per fight)." },
        { t: "h", text: "What It Does" },
        { t: "list", items: [
          "It lasts 1 minute, and the ship can do it only once per fight.",
          "The ship's speed doubles.",
          "Her weapons deal an extra 2d10 radiant and force damage.",
          "Any enemy that starts its turn within 30 feet of the hull takes {@dice 2d10} fire and {@dice 2d10} radiant damage.",
          "Allies aboard gain +2 AC and advantage on saves against being charmed or frightened."
        ] },
        { t: "h", text: "The Cost" },
        { t: "p", text: "Burning a coin destroys the soul inside it forever. No afterlife, no rest, nothing. A player must ask for it out loud. Do not let it pass as bookkeeping." },
        { t: "read", text: "Jeremy holds the coin up for a second. It is warm and it is crying, very quietly. Then he drops it into the core.\n\nThe scream fills the whole ship. It goes on, and on, and then it stops, and the silence afterward is the loudest thing you have ever heard. The engines roar. The deck shakes. The ship leaps forward like something let off a chain." },
        { t: "p", text: "If Or'Henn is aboard, the Soul Capacitor goes ice cold for a moment. Asimov says nothing at all." },
        { t: "h", text: "The Risk" },
        { t: "p", text: "Roll a d20 when the coin goes in. On a 1 to 5, the core backlashes: the ship takes 44 (8d10) force damage, and her engines and cannons die for {@dice 1d4} rounds. It can make things worse before it makes them better." },
        { t: "note", title: "When to Use It", text: "Save it for {@scene the-escape|the escape}. It is not used during {@scene dragons-attack|the dragon ambush}. Lulu will beg them not to." }
      ]
    },

    "who-is-feonor": {
      title: "Who is Feonor?",
      blocks: [
        { t: "p", text: "{@c feonor|Feonor} is a willowy, neutral evil archmage and necromancer with milky-white eyes and a parasol made of bone and human skin. She whispers in short sentences broken by long, frustrated sighs." },
        { t: "p", text: "Mahadi, the rakshasa master of the Wandering Emporium, brought her to Avernus out of love. She got bored, stole one of his infernal war machines, and left without a word. He still calls her \"the one that got away.\"" },
        { t: "p", text: "Last session, the Lady Vengeance's aether harpoon tore her off her war machine. Or'Henn defeated her and laid a {@spell geas} on her: she must bring back his ashen staff, {@b Cinderbloom}." },
        { t: "h", text: "How the Geas Holds Her" },
        { t: "list", items: [
          "If she acts against the task, she takes 5d10 psychic damage, once a day.",
          "The geas lasts 30 days. Track when it needs to be cast again.",
          "The task forces her down the same trail the party would walk: to the warlord Kharzug at the Weeping Furrow, and then to Lady Urexiel's vault, where the staff sits as tribute."
        ] },
        { t: "h", text: "What She Might Do" },
        { t: "p", text: "She does exactly what the geas says, and not one inch more. She is always looking for a gap in the words. If the geas lapses, or she finds a way to twist its letter, she is a betrayal waiting to happen. She might bargain the staff away to Urexiel, or lead the party into the vault as bait." },
        { t: "p", text: "Read this only when Feonor is seen again, in a later session." },
        { t: "read", text: "She is thinner than you remember, and angrier, and she carries something long wrapped in black cloth. \"Your staff,\" she says. \"Yes. I heard you the first time.\" And then a long, tired sigh." },
        { t: "note", title: "Decide Before She Returns", text: "Is she a recurring frenemy, a bought-off ally, or a knife waiting to turn? She is alive and leashed, and she is not this session's problem." }
      ]
    }

  }
};
