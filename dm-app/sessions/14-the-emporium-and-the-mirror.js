// Session 14: the Wandering Emporium (anchored near the Mirror of Mephistar) and the Mirror itself.
// Follows Session 13 as played (2026-11-08): Flash and Vistalancer killed, Kreeg beaten at the Throat, the Stygian Dock raided,
// the session ended near the Emporium. The Scab is now Session 15.
// Threads that meet here: Arkhan's hunt (he bought three clauses from Mahadi before the party arrived: the puzzle), Dumal as the
// Champion of the Mirror (pledged to Mephistopheles for the Slayer form and a worse one), Maelys the Thorn-Crowned (Glasya's,
// with an erinyes), and Drenwal's third sigil. DM rulings 2026-11-12. HOMEBREW throughout unless marked (book).
// Floor panels (stock, dens, information market, rumours) live in campaign-emporium-games.js.
(function () {
  var C = (window.CAMPAIGN && window.CAMPAIGN.creatures) || {};
  function base(id) { return C[id] || {}; }
  function traitsOf(id) { return (C[id] && C[id].traits) ? C[id].traits : []; }

  window.SESSION = {
    id: "14-the-emporium-and-the-mirror",
    title: "The Emporium and the Mirror",
    subtitle: "Session 14 · Descent into Avernus",
    summary: "The Lady Vengeance reaches the Wandering Emporium with two dragon heads on her prow and the Stygian Dock burning behind her. Under Mahadi's truce the floor is open: shops, dens, brokers. But Arkhan was here first, and what he bought from Mahadi is a trap with three clauses the party must find and pick apart before the bell. Then the Mirror of Mephistar, half a day across the ice, where Dumal walks out of the black glass as its Champion, Maelys the Thorn-Crowned comes down the crag with Glasya's erinyes, and every devil present wants a Bhaalspawn on its list. Drenwal can draw the third sigil tonight. Arkhan follows, carefully, and waits for the party to be tired.",

    party: [
      { id: "drenwal", name: "Drenwal", note: "Light Cleric 14. Sigil of the Binding (Tier II). Carries the Shield of the Hidden Lord. Tonight: the third sigil is on the table." },
      { id: "aurora", name: "Aurora", note: "Archfey Warlock 14. Rides Moonkite. Dumal blames her most (the Wish-wielder)." },
      { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 14. Tiamat's curse: Pull and gold scales as recorded after Session 13. Carries the Soul Capacitor and the Orb of Dragonkind." }
    ],

    allies: [
      { id: "veska-banner-captain", name: "Veska, Banner-Captain", note: "CR 10. Can re-consecrate a cracked sigil." },
      { id: "ser-lucan-named", name: "Ser Lucan, Named Among the Living", note: "CR 10." },
      { id: "moonkite", name: "Moonkite", note: "Celestial mount. Starpath frees souls from coins won at the Soul Pit." },
      { id: "jeremy", name: "Jeremy", note: "On the Lady Vengeance. Tuned Vanes fitted; cannons +2d10 fire." },
      { id: "colico-jack", name: "Colico Jack", note: "Hunter ranger 9, on the ship." },
      { id: "lulu", name: "Lulu", note: "Default: taken by Zariel's riders at the end of Session 12, held in the Basalt Citadel. If the DM ruled she is aboard: she objects to every soul coin spent, and the hag wants her memories." },
      { id: "lady-vengeance", name: "The Lady Vengeance", note: "Fly 60 ft. (120 with Overdrive). Hit points as recorded after the sky chase." }
    ],

    creatures: {
      // ---------------------------------------------------------------
      // THE EMPORIUM
      // ---------------------------------------------------------------
      "mahadi": {
        name: "Mahadi",
        kind: "rakshasa",
        role: "Master of the Wandering Emporium. Rakshasa. Host, broker, and party to Arkhan's contract.",
        source: { page: "bestiary", name: "Rakshasa", src: "MM" },
        homebrew: "(book) CR 13, the Emporium's truce is backed by Asmodeus. Never fought unless the truce breaks; if it does, use the MM rakshasa and remember his Limited Magic Immunity. Full shop and haggling notes: the Shops and Prices panel.",
        npc: true,
        description: "A tiger-headed man in a merchant's silk, hands turned the wrong way round, who receives the party as returning friends and means it exactly as much as a ledger means it.",
        roleplay: [
          "Voice: warm, unhurried, delighted by everything. He never says no; he says 'that would be expensive.'",
          "Wants: the party's debt kept alive (it is worth more every day), the dragon heads sold through his floor, and Tiamat's champion owing him a favour. All three are already arranged.",
          "Will not: break a contract he has sealed. Asmodeus's seal is on the truce and on Arkhan's deal both. He will sell the party their own debt back with a smile.",
          "Tell (Insight DC 14): he touches the ledger on the counter whenever the debt is mentioned. The ledger is where the clause lives.",
          "Sample line: \"Two heads on the prow! My dear friends. You must let me put you up. No, no, it is already covered.\"",
          "Sample line: \"A gentleman has an interest in your debt. I would be delighted to sell it back to you. Shall we say three times its weight?\"",
          "Sample line: \"The bell is not mine. The bell belongs to whoever summons the Emporium. Tonight that is a queen. I only ring it.\""
        ]
      },

      "narzugon": Object.assign({}, base("narzugon"), {
        tactics: [
          "Session 14: three of them at the jetty on nightmares, Zariel's riders with the Writ of Hunt. They cannot act inside the wards and do not try. They salute Hellriders.",
          "When the bell rings and the wards fold, they ride at the ship's gangplank first, to hold it for Arkhan. They fight to the death; Zariel does not take riders back.",
          "If the party leaves by the Styx or the sky before the bell, they follow the Styx and are half a day behind at the Mirror."
        ]
      }),

      // ---------------------------------------------------------------
      // THE MIRROR
      // ---------------------------------------------------------------
      "rigorath": {
        name: "Rigorath, Factotum of the Mirror",
        kind: "cambion",
        role: "Mephistopheles' cambion. Steps out of the black ice to hear petitions, steps back to carry them.",
        source: { page: "bestiary", name: "Cambion", src: "MM" },
        homebrew: "(book, Eventyr 3a Intermediary) Use the MM cambion (CR 5) if it ever matters. He does not fight; the escort does, and only if attacked. He is the auctioneer tonight.",
        npc: true,
        description: "A slim devil in a clerk's black, frost on his eyelashes, who steps out of the glass as if through a curtain. He has the manners of a man who has never once been interrupted.",
        roleplay: [
          "Voice: precise, pleased, never warm. States every price plainly, every time. Calls Drenwal 'the third'.",
          "Wants: Drenwal's contract for Cania, with Gargauth on a shelf as the sweetener. Three Bhaalspawn on one sheet of ice is the best night of his career.",
          "Rule of the glass: 'No blood before the Mirror unless it is Bhaal's.' He means it as an invitation.",
          "Sample line: \"Three of the Lord of Murder's children, on my ice, in one night. It is a pleasure. And a rarity.\"",
          "Sample line: \"Every lord of the Nine keeps a list. A Bhaalspawn is the line at the top that nobody has filled. My lord has filled his. Lady Glasya has filled hers. You, priest, are the last empty line in Hell.\"",
          "Sample line: \"The price is the price. Blood, freely given, or five coins. The coins scream. That is not a metaphor.\""
        ]
      },

      "ice-devil-agent": Object.assign({}, base("ice-devil-agent"), {
        role: "The Mirror's escort. Four of them and a bone devil lieutenant hold formation on the glare-ice shelf.",
        tactics: [
          "Session 14: they are a gate, not an ambush. They fight only if the party strikes them or the Mirror. A quiet approach is only watched.",
          "If the Mirror is attacked they defend it to the death and call Rigorath back through it. If Dumal or Maelys is attacked they do nothing: 'the Lord of Murder's business.'",
          "If Arkhan lands on the shelf uninvited, two of them step between him and the glass. Mephistopheles does not share his customers with Tiamat."
        ]
      }),

      "bone-devil-lieutenant": {
        name: "Bone Devil Lieutenant of the Mirror",
        kind: "bone-devil",
        role: "Commands the Mirror's escort. Keeps the rota Rigorath's scribes sell on the floor.",
        source: { page: "bestiary", name: "Bone Devil", src: "MM" },
        homebrew: "(book) MM bone devil, unchanged.",
        npc: false,
        sizeType: "Large fiend (devil), lawful evil",
        ac: 19, acNote: "natural armor",
        hp: 142, hpFormula: "15d10 + 60",
        speed: "40 ft., fly 40 ft.",
        abilities: { str: 18, dex: 16, con: 18, int: 13, wis: 14, cha: 16 },
        saves: "Int +5, Wis +6, Cha +7", skills: "Deception +7, Insight +6",
        vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered", immune: "fire, poison", condImmune: "poisoned",
        senses: "darkvision 120 ft., passive Perception 12",
        languages: "Infernal, telepathy 120 ft.",
        cr: "9", xp: 5000, pb: 4,
        traits: [
          { name: "Devil's Sight", text: "Magical darkness doesn't impede the devil's darkvision." },
          { name: "Magic Resistance", text: "The devil has advantage on saving throws against spells and other magical effects." }
        ],
        actions: [
          { name: "Multiattack", text: "The devil makes two attacks: one with its claws and one with its sting." },
          { name: "Claw", text: "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 8 (1d8 + 4) slashing damage." },
          { name: "Sting", text: "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success." }
        ],
        bonus: [], reactions: [],
        tactics: [
          "Stands at the top of the ice shelf and watches. Fights only with the escort, and only if the party starts it.",
          "If it fights: sting the healer, claw whoever is on the ice. It flies over the slick."
        ]
      },

      // ---------------------------------------------------------------
      // DUMAL, CHAMPION OF THE MIRROR (three forms)
      // ---------------------------------------------------------------
      "dumal": Object.assign({}, base("dumal"), {
        name: "Dumal, Champion of the Mirror",
        role: "Drenwal's brother. Bhaalspawn. Mephistopheles' Champion, sleeping in the black glass until Rigorath calls him.",
        homebrew: (base("dumal").homebrew || "") + " Session 14 (DM ruling 2026-11-12): he has pledged his Bhaalspawn blood to Mephistopheles in exchange for the Slayer form, and a worse one after it. First form as in the Arcs file (CR 16, 285 HP). At 0 hit points he does not sink into the ice: the Slayer rises ({@c dumal-slayer|second form}). The Ravager ({@c dumal-ravager|third form}) comes only if his Ascension clock is full, or if Drenwal draws the third sigil in Maelys's blood while Dumal still stands.",
        traits: traitsOf("dumal").filter(function (t) { return t.name !== "Cania's Lien" && t.name.indexOf("Avatar of Bhaal") !== 0; }).concat([
          { name: "Champion of the Mirror", text: "While Dumal is within 60 feet of the Mirror of Mephistar he regains 10 hit points at the start of each of his turns, unless he took radiant damage since his last turn. If the Mirror is broken, this ends and so does the Pledge below: he can die." },
          { name: "The Pledge (replaces Cania's Lien)", text: "When Dumal drops to 0 hit points, he does not die. Black ice sheets over him, cracks, and {@c dumal-slayer|the Slayer} rises in his space with its own hit points and whatever Legendary Resistance Dumal had left. Spells and conditions on Dumal end. If the Mirror is broken before this happens, the Pledge fails: he falls at 0 hit points, dying, a man." },
          { name: "Gift of Cania (improved)", text: "Mephistopheles' cold hellfire burns in his lance. A creature hit by the Lance of Bhaal can't regain hit points until the start of Dumal's next turn, and takes 7 (2d6) extra cold damage (included below)." }
        ]),
        tactics: [
          "He steps out of the glass when Rigorath names him. He does not strike first. He wants Den to listen.",
          "If it comes to blows: Hellfire of Cania on the tightest group (Aurora and the allies near her), then Multiattack on whoever hurt him most. Bhaal's Hand pins a caster. Never a killing blow on Drenwal.",
          "He fights near the Mirror: the Champion trait heals him there. Pull him off the ice and he loses it.",
          "At 0 hit points: the Pledge. Say it out loud: 'This is what I bought.' Then run the Slayer.",
          "If Maelys attacks Drenwal, Dumal turns on her at once, Multiattack and all. 'Not him. He is mine to bring home.' Use it: the siblings can be made to fight each other."
        ],
        roleplay: (base("dumal").roleplay || []).concat([
          "Sample line (Session 14): \"I sold the rest of me for a shape, Den. You would not believe what it feels like to stop being afraid.\"",
          "Sample line (to Maelys): \"You were always the loud one, sister. One blade. One voice. One god. Which of us is he, then?\"",
          "Sample line (the offer): \"Kill the elf with me. Draw your third seal in her blood. Then there are two of us, and we are both Cania's, and nobody in Hell can touch us.\""
        ])
      }),

      "dumal-slayer": {
        name: "The Slayer (Dumal, second form)",
        kind: "slayer",
        role: "Bhaal's murder-shape, bought from Mephistopheles. Rises when Dumal falls. Lasts ten rounds.",
        source: { page: "bestiary", name: "Dumal the Flame Ascendant", src: "homebrew" },
        homebrew: "HOMEBREW, from the Bhaalspawn Slayer of the Baldur's Gate saga, built for three level-14 PCs plus two CR 10 allies. Fresh hit points; shares Dumal's remaining Legendary Resistance. Drenwal is its weakness (Blood Knows Blood) and its blind spot (Dumal's will).",
        npc: false,
        sizeType: "Large monstrosity (Bhaalspawn avatar), chaotic evil",
        ac: 19, acNote: "natural armor, rimed",
        hp: 200, hpFormula: "16d10 + 112",
        speed: "50 ft., climb 50 ft.",
        abilities: { str: 24, dex: 20, con: 24, int: 10, wis: 14, cha: 18 },
        saves: "Str +13, Dex +11, Con +13, Wis +8", skills: "Athletics +13, Perception +8, Stealth +11",
        vulnerable: "", resist: "cold, fire; bludgeoning, piercing, and slashing from nonmagical attacks", immune: "necrotic, poison", condImmune: "charmed, exhaustion, frightened, poisoned",
        senses: "truesight 60 ft., passive Perception 18",
        languages: "understands Common, Infernal and Abyssal but can't speak",
        cr: "18", xp: 20000, pb: 6,
        traits: [
          { name: "Legendary Resistance (shared)", text: "The Slayer has whatever Legendary Resistance uses Dumal had left when he fell." },
          { name: "Ten Rounds", text: "At the end of the Slayer's tenth turn, or when it drops to 0 hit points, it collapses into Dumal at 0 hit points, unconscious and making death saving throws, unless {@c dumal-ravager|the Ravager} takes him first (see that block for when)." },
          { name: "Murder Sense", text: "The Slayer knows the current hit points of every creature within 60 feet of it. Its attacks against a creature below half its hit point maximum score a critical hit on a roll of 19 or 20." },
          { name: "Bhaal's Hunger", text: "When the Slayer reduces a creature to 0 hit points, it regains 25 hit points and has advantage on its next attack roll. If it took radiant damage since its last turn, this trait doesn't work (Cania's seal on the loan)." },
          { name: "Blood Knows Blood", text: "Drenwal's attacks and spells against the Slayer are made with advantage or, for saves, the Slayer rolls with disadvantage, and they deal an extra 9 (2d8) radiant damage: the sigils on his skin burn. The Slayer can't make opportunity attacks against him." },
          { name: "Dumal's Will", text: "The Slayer never makes an attack that would reduce Drenwal to 0 hit points: it pulls the blow and he stays at 1. At the start of each of its turns, if Drenwal is below half his hit points, roll a d6: on a 1 or 2 Dumal's will slips and this trait is off until the start of the Slayer's next turn." },
          { name: "Rend of the Lord of Murder", text: "The Slayer's claw attacks ignore resistance to slashing damage." }
        ],
        actions: [
          { name: "Multiattack", text: "The Slayer makes three attacks: two with its claws and one with its maw, or three with its claws." },
          { name: "Claw", text: "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) slashing damage plus 7 (2d6) necrotic damage." },
          { name: "Maw", text: "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 20 (3d8 + 7) piercing damage plus 10 (3d6) necrotic damage, and the target must succeed on a DC 20 Constitution saving throw or be unable to regain hit points until the end of the Slayer's next turn." },
          { name: "Slaughter Leap (Recharge 5-6)", text: "The Slayer leaps up to 40 feet to an unoccupied space it can see, without provoking opportunity attacks. Each creature within 10 feet of where it lands must succeed on a DC 18 Dexterity saving throw or take 22 (4d10) slashing damage and be knocked prone." },
          { name: "Scream of the Lord of Murder (1/Day)", text: "Used the first time the Slayer drops below 100 hit points. Each creature within 60 feet that can hear it must succeed on a DC 18 Wisdom saving throw or take 27 (6d8) psychic damage and be frightened of the Slayer for 1 minute (repeat the save at the end of each turn). Drenwal is immune (the Kept Watch)." }
        ],
        bonus: [], reactions: [],
        legendary: {
          count: 3,
          intro: "The Slayer can take 3 legendary actions, one at a time, at the end of another creature's turn. It regains them at the start of its turn.",
          actions: [
            { name: "Claw", cost: 1, text: "The Slayer makes one claw attack." },
            { name: "Lunge", cost: 1, text: "The Slayer moves up to half its speed without provoking opportunity attacks." },
            { name: "Bhaal's Eye", cost: 2, text: "One creature the Slayer can see within 60 feet must succeed on a DC 18 Wisdom saving throw or be marked until the end of the Slayer's next turn: the Slayer's attacks against it deal an extra 9 (2d8) necrotic damage and it can't hide from the Slayer. Not Drenwal." }
          ]
        },
        tactics: [
          "It rises in Dumal's space. Spend the first legendary action on Lunge toward Aurora: the grudge survives the change.",
          "Murder Sense: it goes for whoever is lowest, every time, except Drenwal. Say the numbers out loud when it looks at someone; the players will feel it.",
          "Slaughter Leap into the allies (Veska, Lucan, Moonkite) when they bunch. Bhaal's Hunger wants a kill: Moonkite is the likeliest. Make that visible.",
          "Round 10: it collapses. If the Ravager condition is met, the ice takes him instead. Otherwise Dumal is on the ice, dying, and the party chooses: the third sigil, a heal, or nothing."
        ],
        description: "The ice over him cracks from inside. What stands up is not a man: a thing of red-black muscle and too many joints, a skull with a lot of teeth and no eyes, and the frost of Cania still clinging to it like a brand. Drenwal's sigils burn under his shirt. The thing turns its head toward him first, and then, deliberately, away."
      },

      "dumal-ravager": {
        name: "The Ravager (Dumal, third form)",
        kind: "ravager",
        role: "The worse one. Mephistopheles' full price, paid in Bhaal's shape and Cania's fire. Only if the clock is full, or Drenwal draws the third sigil in Maelys's blood while Dumal still stands.",
        source: { page: "bestiary", name: "Dumal the Flame Ascendant", src: "homebrew" },
        homebrew: "HOMEBREW, the Ravager of the Baldur's Gate saga. A finale-grade fight (CR 21) for the ice: use it only on the conditions above, or when the DM wants the party to feel what Dumal sold. When it drops to 0 hit points Dumal dies for good and the Mirror takes his soul, unless the Mirror was broken first.",
        npc: false,
        sizeType: "Huge fiend (Bhaalspawn avatar), chaotic evil",
        ac: 20, acNote: "natural armor, black ice",
        hp: 250, hpFormula: "20d12 + 120",
        speed: "40 ft., fly 40 ft. (hover, on wings of cold hellfire)",
        abilities: { str: 28, dex: 16, con: 22, int: 12, wis: 16, cha: 22 },
        saves: "Str +16, Con +13, Wis +10, Cha +13", skills: "Perception +10, Intimidation +13",
        vulnerable: "", resist: "bludgeoning, piercing, and slashing from nonmagical attacks", immune: "cold, fire, necrotic, poison", condImmune: "charmed, exhaustion, frightened, paralyzed, poisoned",
        senses: "truesight 120 ft., passive Perception 20",
        languages: "Common, Infernal, Abyssal",
        cr: "21", xp: 33000, pb: 7,
        traits: [
          { name: "Legendary Resistance (3/Day)", text: "Fresh: Mephistopheles' gift. If the Ravager fails a saving throw, it can choose to succeed instead." },
          { name: "Magic Resistance", text: "The Ravager has advantage on saving throws against spells and other magical effects." },
          { name: "Aura of Cold Hellfire", text: "A creature that starts its turn within 10 feet of the Ravager takes 7 (2d6) cold damage and 7 (2d6) fire damage. Healing received by a creature in the aura is halved." },
          { name: "Blood Knows Blood", text: "As the Slayer: Drenwal's attacks and spells against it have advantage (its saves against them disadvantage) and deal an extra 9 (2d8) radiant damage. It can't make opportunity attacks against him. Dumal's Will is gone: the Ravager will kill him." },
          { name: "Chains of Cania", text: "As a bonus action, iron chains burst from the ice at a creature within 60 feet. It must succeed on a DC 20 Strength saving throw or be restrained. The chain has AC 20, 30 hit points, immunity to cold, poison and psychic damage. A creature can repeat the save at the end of its turn." },
          { name: "The Pledge's Price", text: "When the Ravager drops to 0 hit points, Dumal dies. No lien, no return: the Mirror takes his soul and Mephistopheles has his Bhaalspawn. If the Mirror was broken first, the Ravager collapses into Dumal at 1 hit point, mortal, with nothing left to sell." }
        ],
        actions: [
          { name: "Multiattack", text: "The Ravager makes three attacks: two with its talons and one with its jaws." },
          { name: "Talon", text: "Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 25 (3d10 + 9) slashing damage plus 10 (3d6) cold damage." },
          { name: "Jaws of Hellfire", text: "Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 27 (4d8 + 9) piercing damage plus 14 (4d6) fire damage. If this reduces a creature to 0 hit points, the Ravager regains 30 hit points." },
          { name: "Hellfire Breath (Recharge 5-6)", text: "A 60-foot cone of blue-white fire. Each creature there must make a DC 20 Dexterity saving throw, taking 44 (8d10) fire damage and 44 (8d10) cold damage on a failed save, or half as much on a success. A creature that fails is also blinded by frost until the end of its next turn." }
        ],
        bonus: [], reactions: [],
        legendary: {
          count: 3,
          intro: "The Ravager can take 3 legendary actions, one at a time, at the end of another creature's turn. It regains them at the start of its turn.",
          actions: [
            { name: "Talon", cost: 1, text: "The Ravager makes one talon attack." },
            { name: "Wing of Frost", cost: 2, text: "The Ravager flies up to half its speed. Each creature within 10 feet of it at any point during this movement must succeed on a DC 20 Dexterity saving throw or take 13 (3d8) cold damage and be knocked prone." },
            { name: "Bhaal's Decree", cost: 3, text: "One creature the Ravager can see within 60 feet, other than Drenwal, must succeed on a DC 20 Wisdom saving throw or be paralyzed until the end of its next turn." }
          ]
        },
        tactics: [
          "It makes Drenwal watch. It attacks everyone but him first: Veska by preference (a Hellrider; the cult taught the brothers that the order killed their father).",
          "Hellfire Breath on the ship's deck if the Lady Vengeance is in the fight; otherwise on the allies.",
          "Chains of Cania on Aurora before Moonkite can carry her off. Bhaal's Decree on whoever is about to heal.",
          "Below 80 hit points it goes for Drenwal, because Bhaal is in charge now and Bhaal wants one child left."
        ],
        description: "The Slayer does not fall. It keeps rising. Wings of blue fire open from its back and the ice under it runs like water and freezes again as iron chains. The face, for one second, is Dumal's, and it is screaming. Then it is nobody's."
      },

      // ---------------------------------------------------------------
      // MAELYS THE THORN-CROWNED (Glasya's), and her erinyes
      // ---------------------------------------------------------------
      "maelys": {
        name: "Maelys the Thorn-Crowned",
        kind: "maelys",
        role: "Bhaalspawn. Elf assassin. Glasya's Blade. Came for both brothers.",
        source: { page: "bestiary", name: "Assassin", src: "MM" },
        homebrew: "HOMEBREW (from the early campaign prep: a silent executioner who dominates beasts and plants fear in dreams). Built for level 14 on an assassin chassis, CR 15. Glasya promised her the Slayer form for a brother's head; she has not got it yet. Pronoun: she (the DM may flip it).",
        npc: false,
        sizeType: "Medium humanoid (elf, Bhaalspawn), neutral evil",
        ac: 18, acNote: "studded leather of living thorns",
        hp: 210, hpFormula: "28d8 + 84",
        speed: "40 ft., climb 40 ft.",
        abilities: { str: 14, dex: 22, con: 16, int: 15, wis: 16, cha: 18 },
        saves: "Dex +11, Con +8, Wis +8", skills: "Stealth +16, Perception +8, Deception +9, Animal Handling +8, Acrobatics +11",
        vulnerable: "", resist: "necrotic, poison; bludgeoning, piercing, and slashing from nonmagical attacks", immune: "", condImmune: "charmed, frightened",
        senses: "darkvision 120 ft., truesight 30 ft. (Bhaal-Sight), passive Perception 18",
        languages: "Common, Elvish, Infernal, Abyssal",
        cr: "15", xp: 13000, pb: 5,
        traits: [
          { name: "Legendary Resistance (2/Day)", text: "If Maelys fails a saving throw, she can choose to succeed instead." },
          { name: "Bhaal Sight", text: "Maelys knows where every Bhaalspawn within 1 mile is, and what they feel. Drenwal and Dumal feel her the same way." },
          { name: "Assassinate", text: "During her first turn, Maelys has advantage on attack rolls against any creature that hasn't taken a turn. Any hit she scores against a surprised creature is a critical hit." },
          { name: "Evasion", text: "When Maelys is subjected to an effect that allows a Dexterity saving throw to take only half damage, she takes no damage on a success and half on a failure." },
          { name: "Crown of Thorns", text: "Beasts and monstrosities within 60 feet of Maelys that can see her must succeed on a DC 17 Wisdom saving throw at the start of their turn or be charmed by her until the start of their next turn; a charmed creature obeys her next command. Moonkite is a celestial and immune; the nightmares at the jetty are not." },
          { name: "Dreams of Suffering", text: "Any creature that took a long rest within 1 mile of Maelys in the last day has disadvantage on its first saving throw against her. The party at the Emporium qualifies: she was on the floor." },
          { name: "Glasya's Mark", text: "Maelys can't be charmed or frightened, and when she drops to 0 hit points for the first time in a day, the erinyes with her may use its reaction to fly to her and carry her off: she is stable at 1 hit point in the erinyes's arms. If the erinyes is dead or more than 60 feet away, she dies." },
          { name: "Against Drenwal", text: "The Kept Watch makes Drenwal immune to her Thorned Dream and lets him save against Illusion of Suffering with advantage. She knows it. She goes for the people around him instead." }
        ],
        actions: [
          { name: "Multiattack", text: "Maelys makes three attacks with Bhaal's Twin Blades, or two and one Thorn Lash." },
          { name: "Bhaal's Twin Blades", text: "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 10 (1d8 + 6) slashing damage plus 10 (3d6) necrotic damage. One Blade: if both blade attacks in a turn hit the same creature, it must succeed on a DC 17 Constitution saving throw or take 22 (4d10) extra necrotic damage and be unable to regain hit points until the start of Maelys's next turn." },
          { name: "Thorn Lash", text: "Ranged Weapon Attack: +11 to hit, range 30 ft., one target. Hit: 13 (2d6 + 6) piercing damage, and the target is grappled (escape DC 17) and pulled 10 feet toward Maelys." },
          { name: "Illusion of Suffering (Recharge 5-6)", text: "Each creature of Maelys's choice within 30 feet that can see her must succeed on a DC 17 Wisdom saving throw or take 33 (6d10) psychic damage and, until the end of its next turn, see its allies as dying: it has disadvantage on attack rolls against Maelys and can't take the Help action." }
        ],
        bonus: [
          { name: "Silent Step", text: "Maelys teleports up to 30 feet to an unoccupied space she can see. Until the start of her next turn she is invisible to any creature that didn't see her arrive, and her next attack has advantage." },
          { name: "Sic", text: "One beast or monstrosity charmed by her Crown of Thorns uses its reaction to move up to its speed and make one attack." }
        ],
        reactions: [
          { name: "Parry", text: "Maelys adds 4 to her AC against one melee attack that would hit her. She must see the attacker and be wielding a blade." },
          { name: "Uncanny Dodge", text: "When an attacker she can see hits her with an attack, she halves the damage." }
        ],
        legendary: {
          count: 3,
          intro: "Maelys can take 3 legendary actions, one at a time, at the end of another creature's turn. She regains them at the start of her turn.",
          actions: [
            { name: "Blade", cost: 1, text: "Maelys makes one attack with Bhaal's Twin Blades." },
            { name: "Step", cost: 1, text: "Maelys uses Silent Step." },
            { name: "Thorned Dream", cost: 2, text: "One creature she can see within 60 feet must succeed on a DC 17 Wisdom saving throw or be incapacitated until the end of its next turn, seeing its own death. Not Drenwal." }
          ]
        },
        tactics: [
          "She does not speak until someone bleeds. Her first move is Assassinate on the lowest ally in reach, usually from a Silent Step behind Lucan.",
          "One Blade on a healer: the no-healing rider is the point. Illusion of Suffering when three or more are bunched.",
          "She wants Dumal dead more than Drenwal: Dumal is the one Glasya wants beaten. If Dumal becomes the Slayer, she goes for it with everything, and Thorned Dream on whoever could stop her.",
          "She runs at 50 hit points if the erinyes is alive to carry her. She does not run from Drenwal.",
          "Her message, if she ever speaks: 'One voice. One blade. One god. You are not him.' Then: 'He is not him either.'"
        ],
        description: "An elf in a crown of living thorns, eyes with no white in them, red to the rim. Two short blades that drip though they have not cut anything yet. She does not walk down the crag so much as arrive at the bottom of it. The erinyes behind her lands like a verdict.",
        roleplay: [
          "Appearance: slight, pale, a crown of thorns that grows while you watch. Two curved blades. Nothing on her belt but a key: Glasya's.",
          "Voice: rarely used. When she speaks it is in a whisper that everyone hears. Calls Dumal 'the loud one'. Calls Drenwal nothing.",
          "Wants: a brother's head for Glasya, and the Slayer form for herself. The family reduced to one. Bhaal's favour, which she believes she already has.",
          "Fears: that Glasya lied, and the Slayer goes to whichever Bhaalspawn kills first. (True.)",
          "Knows: Senna's name, not her address. The Mirror's rota. That Arkhan is overhead.",
          "Sample line: \"Two of you. Good. I only brought two blades.\""
        ]
      },

      "erinyes-of-glasya": {
        name: "Erinyes, Glasya's Herald",
        kind: "erinyes",
        role: "Glasya's devil, sent with Maelys. Carries Glasya's bid for Drenwal, and Maelys if she falls.",
        source: { page: "bestiary", name: "Erinyes", src: "MM" },
        homebrew: "(book) MM erinyes, CR 12, with the rope of entanglement variant and one added trait: Glasya's Herald. Under Asmodeus's truce at the Emporium she can walk the floor; Dumal cannot.",
        npc: false,
        sizeType: "Medium fiend (devil), lawful evil",
        ac: 18, acNote: "plate",
        hp: 153, hpFormula: "18d8 + 72",
        speed: "30 ft., fly 60 ft.",
        abilities: { str: 18, dex: 16, con: 18, int: 14, wis: 14, cha: 18 },
        saves: "Dex +7, Con +8, Wis +6, Cha +8", skills: "",
        vulnerable: "", resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered", immune: "fire, poison", condImmune: "poisoned",
        senses: "truesight 120 ft., passive Perception 12",
        languages: "Infernal, telepathy 120 ft.",
        cr: "12", xp: 8400, pb: 4,
        traits: [
          { name: "Hellish Weapons", text: "The erinyes's weapon attacks are magical and deal an extra 13 (3d8) poison damage on a hit (included below)." },
          { name: "Magic Resistance", text: "The erinyes has advantage on saving throws against spells and other magical effects." },
          { name: "Glasya's Herald", text: "She carries a contract with Drenwal's name already on it and a blank where the price goes. While she holds it, she can't be surprised, and any Bhaalspawn that strikes her has disadvantage on the attack: the Lady of the Sixth does not like her property damaged." }
        ],
        actions: [
          { name: "Multiattack", text: "The erinyes makes three attacks." },
          { name: "Longsword", text: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 13 (3d8) poison damage." },
          { name: "Longbow", text: "Ranged Weapon Attack: +7 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 13 (3d8) poison damage, and the target must succeed on a DC 14 Constitution saving throw or be poisoned. The poison lasts until it is removed by the lesser restoration spell or similar magic." },
          { name: "Rope of Entanglement", text: "The erinyes throws a rope at a creature within 30 feet. The target must succeed on a DC 15 Dexterity saving throw or be restrained (escape DC 15 Strength or Dexterity)." }
        ],
        bonus: [],
        reactions: [
          { name: "Parry", text: "The erinyes adds 4 to its AC against one melee attack that would hit it. To do so, it must see the attacker and be wielding a melee weapon." },
          { name: "Carry Her Off", text: "When Maelys drops to 0 hit points within 60 feet, the erinyes flies to her and lifts her (see Glasya's Mark)." }
        ],
        tactics: [
          "She is not here to win the fight. She is here to make Glasya's bid, keep Maelys alive, and leave with a signature or a body.",
          "Longbow from the air at whoever is healing. Rope of Entanglement on Moonkite's rider.",
          "If Rigorath's escort moves against Maelys she fights them: Glasya and Mephistopheles are not friends.",
          "If Maelys dies for good she withdraws at once, with the contract. Glasya will send another herald, later, with the same blank."
        ],
        description: "A woman in black plate with wings like a crow's and a scroll case on her hip, who looks at Drenwal the way a clerk looks at a signature.",
        roleplay: [
          "Voice: courteous, bored, exact. Addresses Drenwal as 'the third' too; the devils have compared notes.",
          "Sample line: \"My lady's offer is simple, priest. Kill your brother. The third seal is yours. Afterwards, one night a year, your blade in her service. She will not ask twice; she has the elf for that.\""
        ]
      },

      // ---------------------------------------------------------------
      // ARKHAN'S HUNT (survivors)
      // ---------------------------------------------------------------
      "arkhan-the-cruel": Object.assign({}, base("arkhan-the-cruel"), {
        tactics: [
          "Session 14. He has lost two dragons to this party and will not lose a third to haste. He bought Mahadi's three clauses a day before the party arrived and now he waits in the clouds over the Styx with Krull on Obatala and Slarkas, for the bell.",
          "He does not attack the Emporium, the ship under way, or the Mirror's shelf uninvited. He attacks a tired party on open ice, or a ship moored under a fallen ward.",
          "If the debt was called and Or'Henn walked to the ward's edge: Arkhan makes Tiamat's offer himself, politely, the Pull save at DC 10 + Pull + 2. He does not grab him. He wants him to ask.",
          "At the Mirror he lands only if the party is below half strength or when they leave the shelf. He lands behind them, between them and the ship. Krull casts blade barrier across the way back. Slarkas takes the sky; Obatala, the ground; Vermilius holds the road.",
          "Rigorath's escort will not let him near the glass. He does not care about the glass. 'The druid and the priest. The rest of you, I have no further use for.' Still true.",
          "If the fight turns: teleport home with Krull and whoever is standing. He brings the fallen back with revivify. He did it for a manticore; he will do it for a dragon's rider, not for a dragon."
        ]
      }),
      "krull": Object.assign({}, base("krull"), {
        tactics: [
          "Session 14: he was on the Emporium floor two nights ago, lost at the Devil's Teeth, bought two larvae from Z'neth with a gold scale, and sold the party's death-days to the Timekeeper for Arkhan. The floor remembers him.",
          "In the fight he stays on Obatala and casts: blade barrier across the party's line back to the ship, then spirit guardians, then nothing clever. He counts the minutes.",
          "He will still take a better offer. The double-cross from Session 13 (The Ways Out, D) is still open."
        ]
      }),
      "obatala": Object.assign({}, base("obatala"), {
        tactics: [
          "Session 14: Krull's mount, the ground dragon. He lands on the ice if Arkhan does, between the party and the ship. Rimeground on the shelf makes the whole approach a slide.",
          "He is the dragon who would take Or'Henn's curse willingly if Krull told him to. That is Arkhan's quiet second plan. He has not been told yet."
        ]
      }),
      "skarrix": Object.assign({}, base("skarrix"), {
        tactics: [
          "Session 14: the sky dragon. He does not land. Acid on the ship's deck, then Lance Dive on whoever is in the open, then up again.",
          "He wants his tooth back (it is on the floor, at Gristle's table or Rassh's). Show it and he comes down for it. Old Wound still works."
        ]
      }),
      "mirelle": Object.assign({}, base("mirelle"), {
        tactics: [
          "Session 14: she holds the ice road between the Emporium and the Mirror, in the fog, out of sight. A party on foot meets her; a flying ship passes over her.",
          "She does not fight on the road. She talks. Honeyed Voice: 'He is tired, your druid. I could carry him. Just ask.' Pull save for Or'Henn, DC 10 + Pull.",
          "She rejoins Arkhan only when he lands. Until then she is a voice in the fog."
        ]
      })
    },

    // =====================================================================
    // SCENES
    // =====================================================================
    scenes: [
      // -----------------------------------------------------------------
      // 1 ADVENTURE PRIMER
      // -----------------------------------------------------------------
      {
        id: "adventure-primer",
        title: "Adventure Primer",
        when: "",
        blocks: [
          { t: "p", text: "Session 13 ended near the Wandering Emporium with the party two dragons up, one amnizu down and the Stygian Dock on fire behind them. This session is three places and one night: {@b the Emporium} under Mahadi's truce (the floor, the dens, and Arkhan's deal), {@b the ice road}, and {@b the Mirror of Mephistar}, where everyone who wants a Bhaalspawn turns up at once. The Scab is {@b Session 15}." },
          { t: "h", text: "What Happened (read or paraphrase)" },
          { t: "read", text: "You came out of the Crypt on a Word of Recall and the Lady Vengeance ran for her life with two dragons on her tail. Then she turned. Flash, the red, is a head on your prow. Vistalancer, the blue, is the other one. You burned soul coins to outrun the news and raided the Stygian Dock on the way past, and the fortress that was refuelling there is not refuelling any more. Thavius Kreeg caught you in a gorge half a day short of here, and you beat him. Now the fog thins, and there is a city on war machines parked on the Styx bank, lanterns lit, and a hum under the market noise like a tuning fork the size of a cathedral. The Wandering Emporium. Everybody here would like to kill you, and nobody can." },
          { t: "h", text: "The Clocks" },
          { t: "table", caption: "Running clocks (set the numbers before play)", head: ["Clock", "State", "What it does"], rows: [
            ["{@b The bell}", "Default: dawn, about 10 hours after arrival. Mahadi sells delay by the hour.", "When it rings the Emporium folds and the truce with it. See {@scene the-bell|The Bell}."],
            ["{@b Arkhan's hunt}", "Arkhan, Krull on Obatala, Slarkas in the clouds. Vermilius on the ice road.", "No roll while the party is inside the wards. Hunt roll (survivors) every 8 hours the ship sits anywhere else."],
            ["{@b Zariel}", "Fortress crippled 1d4 days (roll now). Three narzugons at the jetty. Writ of Hunt posted: 100 SC the ship, 20 a head, 50 the druid alive.", "The riders act when the wards fall. The bounty makes the floor's hunters friendly in a way that is not."],
            ["{@b The heads}", "Spoil about now without gentle repose, salt (Burney, 1 SC each) or a cold ship.", "Spoiled heads are still proof; they are no longer a sale."],
            ["{@b Dumal's Ascension}", "DM's number (the Compass estimates 4 of 6). Going to the Mirror tonight is 'acting against him' and stops the session tick.", "At 6 the Ravager is available to him. At less, only the Slayer."],
            ["{@b Or'Henn's Pull}", "As recorded after Session 13.", "Vermilius on the road, the hag's card, Arkhan at the ward's edge: three saves tonight if the party walks into all of them."]
          ] },
          { t: "h", text: "What They Carry" },
          { t: "list", items: [
            "Two dragon heads; 4 bottles of dragon blood (2 red, 2 blue, 5 doses each); red scales (cannons), blue scales (Tuned Vanes), and probably more.",
            "The shard of the Sword of Zariel; the Orb of Dragonkind; the Shield of the Hidden Lord (Gargauth); Cinderbloom; the Soul Capacitor.",
            "From the Dock and the Throat, if taken: Kreeg's Ledger (returns one memory a day), the High Overseer's Ring, the contract copy, soul coins and infernal metal. {@b Record what they have before the dens open.}",
            "Soul coins: the DM's count. Five souls were destroyed in Session 13; the dens will ask for more."
          ] },
          { t: "h", text: "The Night's Premise" },
          { t: "p", text: "{@b Each devil wants a Bhaalspawn in their list.} The archdevils keep lists of what they own, and a child of the Lord of Murder is the line at the top none of them had filled. Now two are filled: Mephistopheles has {@c dumal|Dumal}, Glasya has {@c maelys|Maelys}. {@b Drenwal is the last empty line in Hell}, and tonight he is standing on the one sheet of ice where both lords have a clerk. {@c rigorath|Rigorath} will say it out loud: it is a pleasure, and a rarity." },
          { t: "p", text: "{@b Arkhan} plays a different game. He wants Or'Henn and the priest, in that order, and he has learned that this party wins fights it chooses. So he bought the one thing nobody can fight: a contract. The puzzle of the first half is finding its three clauses and breaking them before the bell. The second half is what he does when they have." },
          { t: "h", text: "Running Order" },
          { t: "steps", items: [
            "{@scene two-heads-on-the-prow|Arrival}: Mahadi's welcome, the riders at the jetty, the first clue.",
            "{@scene the-floor|The floor}: shops, dens, brokers. Let the players roll dice for an hour. Seed the clues.",
            "{@scene the-deal-arkhan-made|The deal}: the puzzle. Three clauses, three counters, or the consequences.",
            "{@scene the-bell|The bell}: leaving the wards, the hunt, the ice road.",
            "{@scene the-glass-that-sings|The Mirror}: the shelf, the escort, the price, the answers.",
            "{@scene each-devil-wants-a-bhaalspawn|The auction}: Dumal out of the glass, Maelys down the crag, the bids.",
            "{@scene the-third-sigil|The third sigil}: Drenwal's final seal, if he takes it.",
            "{@scene blood-on-the-ice|Blood on the ice}: the fight, in whatever shape they chose.",
            "{@scene ending|Ending}: outcomes, rewards, the Scab."
          ] },
          { t: "note", title: "Three PCs", text: "The Emporium half is social and dice: no danger to life, real danger to coins, memories and years. The Mirror half can become three fights at once. It should not. Use the sequencing table in {@scene blood-on-the-ice|Blood on the Ice}: the devils do not fight each other's champions unprovoked, and Arkhan waits. The party decides how many enemies they have by whom they strike." },
          { t: "p", text: "Floor panels: {@side emporium-floor|The Floor Tonight} (stock, dens, information market, rumours). Shop prices: {@side emporium-shops|Shops and Prices}. Mirror answers: {@side mirror-answers|What the Mirror Knows}. Drenwal: {@side sigil-of-mastery|The Sigil of Mastery}. Dumal's forms: {@side dumals-three-forms|Dumal's Three Forms}." }
        ]
      },

      // -----------------------------------------------------------------
      // 2 ARRIVAL
      // -----------------------------------------------------------------
      {
        id: "two-heads-on-the-prow",
        title: "Two Heads on the Prow",
        when: "",
        duration: "20 minutes",
        blocks: [
          { t: "read", text: "The criers see you before you see them. 'The dragon-killers! The Lady Vengeance! Two heads!' The call runs down the jetty ahead of the ship, stall to stall, and by the time the gangplank drops, the floor has turned to look. A tiger-headed man in silk is waiting at the foot of it with his hands folded the wrong way round, smiling as if you have made his year. Behind him, three riders in black barding sit their nightmares at the end of the jetty and do not move. One of them salutes the Hellriders on your deck. Slowly." },
          { t: "env", sight: "Lanterns on chains, war machines unfolded into shopfronts, a crowd that is mostly devils and does not shove.", sound: "The ward hum under everything, the criers, a dice table roaring somewhere.", smell: "Hot iron, spiced meat, the Styx.", feel: "The air thickens on a hand that drifts toward a weapon. Nobody draws." },
          { t: "h", text: "Mahadi's Welcome" },
          { t: "p", text: "{@c mahadi|Mahadi} offers the party the sanctuary of a safe long rest under the truce and refuses payment for it. 'It is already covered.' That is {@b the first clue}: {@b Insight DC 14} says he is hiding who covered it, and {@b Insight DC 18} that he is pleased about it in a way that is not about money. He will not say more at the gangplank. He will say it over supper: 'A gentleman has an interest in your debt.'" },
          { t: "p", text: "The {@b hospitality debt} is the book's engine (Mahadi's panel): the party owes him from Session 8, and every free thing tonight adds to it. The debt is now Arkhan's. See {@scene the-deal-arkhan-made|The Deal Arkhan Made}." },
          { t: "h", text: "The Riders" },
          { t: "p", text: "Three {@c narzugon|narzugons} with Zariel's Writ of Hunt. They do not act inside the wards and say so if asked: 'When the bell rings, Hellrider.' The Writ is posted on the gate: {@b 100 soul coins for the ship, 20 a head, 50 for the druid alive.} Bounty hunters on the floor read it too." },
          { t: "h", text: "The Heads" },
          { t: "p", text: "Everybody wants to see them. Burney will salt them (1 SC each, 30 days). Z'neth will buy the sapphire rings off Vistalancer's horn if they are still on it. Mahadi would be {@i honoured} to lodge them in his strongroom overnight. {@b Do not let him}: lodged goods are sold goods under clause two." },
          { t: "choices", prompt: "Where first?", items: [
            { label: "Supper with Mahadi (the debt)", goto: "the-deal-arkhan-made" },
            { label: "The floor: shops, dens, brokers", goto: "the-floor" },
            { label: "Straight to the Mirror, skip the night", goto: "the-bell" }
          ] }
        ]
      },

      // -----------------------------------------------------------------
      // 3 THE FLOOR
      // -----------------------------------------------------------------
      {
        id: "the-floor",
        title: "The Floor: Shops, Dens, Brokers",
        when: "",
        duration: "60 to 90 minutes",
        blocks: [
          { t: "p", text: "The hub. Everything the players can buy, roll for, lose or learn tonight is in {@side emporium-floor|The Floor Tonight}. This scene is how to run it." },
          { t: "h", text: "The Shops" },
          { t: "list", items: [
            "{@side emporium-stock-today|Today's shelf}: roll a d8 per stall the party visits, a d20 once for a rare find, and the d6 price swing on every purchase. Prices are the Session 8 list plus 25% for magic items (level 14).",
            "Sell: Elliach buys dragon blood (6 SC a bottle, 8 for red); Rassh buys scales and will cut warplate; Z'neth buys soul-goods. Rassh will not touch the heads: 'Not mine to buy. Ask the host.' That is a clue."
          ] },
          { t: "h", text: "The Dens" },
          { t: "p", text: "Four of them, each a game the players play with their own dice, each with a Volatile table where the game turns into the plot. One den per PC who wants one, three hands, then a Volatile roll." },
          { t: "table", caption: "The dens", head: ["Den", "Stakes", "What it seeds"], rows: [
            ["{@side den-soul-pit|The Soul Pit}", "Soul coins", "Arkhan's obsidian marker in the pot (Volatile 4); a true name; a soul the party knows."],
            ["{@side den-devils-teeth|The Devil's Teeth}", "Gold, then teeth", "Krull's gold scale; the narzugon at the ring; a map of the Scab; Slarkas's tooth."],
            ["{@side den-ninefingers|Ninefingers' Table}", "Memories", "Lulu's memory in the bag; Senna's street; the fortress gate password; a card the Mirror now knows."],
            ["{@side den-hourglass|The Hourglass}", "Years", "The party's death-days, sold to Arkhan; Vistalancer's year; a question for a decade."]
          ] },
          { t: "h", text: "The Brokers" },
          { t: "p", text: "{@side emporium-information-market|The information market} lists every seller, every likely question, the true answer and the bent one. {@side emporium-rumours|Rumours} are free with a shave. Three are false." },
          { t: "h", text: "Who Is Here Tonight" },
          { t: "list", items: [
            "{@b Maelys} was on the floor two nights ago and has not been seen since. Her {@c erinyes-of-glasya|erinyes} is at Infernal Rapture, drinking, under the truce, perfectly polite. She will speak to Drenwal if he approaches: Glasya's bid, early. She will not say where Maelys is.",
            "{@b Krull} was here. Gristle, Z'neth and the Timekeeper all remember him. Arkhan was here the night before that.",
            "{@b Dumal's last recruiter} is a larva in Z'neth's pens. 'The Slayer, and the worse one after.'",
            "{@b Bounty hunters:} a warlord's captain and two cambions read the Writ and start pricing the party. They cannot act in the wards. They can tell the riders which gangplank.",
            "{@b The clientele table} and the d12 Complications and Opportunities in {@side emporium-events|Emporium events} still apply. Use one of each if the night drags."
          ] },
          { t: "note", title: "Clue tracking", text: "Six clues to Arkhan's deal are scattered through the floor (listed in the next scene). The party needs two to understand there is a contract and four to know all three clauses. Mahadi gives the first free at supper. Tick them off as they land." },
          { t: "choices", prompt: "When they have had enough of the floor", items: [
            { label: "Supper with Mahadi: the deal", goto: "the-deal-arkhan-made" },
            { label: "The bell: leaving", goto: "the-bell" }
          ] }
        ]
      },

      // -----------------------------------------------------------------
      // 4 THE DEAL ARKHAN MADE
      // -----------------------------------------------------------------
      {
        id: "the-deal-arkhan-made",
        title: "The Deal Arkhan Made",
        when: "",
        duration: "30 to 45 minutes",
        blocks: [
          { t: "p", text: "A day before the party arrived, {@c arkhan-the-cruel|Arkhan} walked in under the truce with {@c krull|Krull}, the dragons circling outside, and did business with {@c mahadi|Mahadi} till the small hours. He paid in soul coins, in a sapphire from Vistalancer's horn (Krull cut one off at the Crypt), and in a favour owed to the house of Asmodeus by Tiamat's champion. He bought three clauses, every one of them legal under the truce. {@b This is a puzzle, not a fight:} find the clauses, break them, or pay for not breaking them when the bell rings." },
          { t: "h", text: "The Three Clauses" },
          { t: "table", caption: "What Arkhan bought", head: ["Clause", "What it says", "What it does"], rows: [
            ["{@b 1. The Debt}", "Mahadi assigned the party's hospitality debt (Session 8, plus anything free tonight) to Arkhan. The holder of a hospitality debt may call it once, in the host's hearing, for 'a small service'.", "Arkhan's service: {@b 'The druid walks with me to the edge of the wards, alone, and listens to my queen's offer.'} Under the truce nobody can stop it. At the edge the truce is a line on the ground; Tiamat's offer is made in person (Pull save, DC 10 + Pull + 2). He does not grab Or'Henn. He wants him to ask."],
            ["{@b 2. The Heads}", "Right of first refusal on any dragon part sold, lodged or valued on the Emporium's floor, at double the best bid.", "The heads cannot be sold here without going to Arkhan. Anything lodged with Mahadi 'for safekeeping' is on the floor. Burney's salting is a service, not a sale: safe. Z'neth buying the rings: a sale."],
            ["{@b 3. The Bell}", "Tiamat's champion has formally summoned the Emporium to the Monument to Tiamat for a fair. Mahadi accepted. The caravan packs at the hour set: {@b dawn}.", "When the bell rings the wards fold with the stalls. Everything outside the ship is in the open, under three dragons and three riders. The ship moored at the jetty is a target the moment the hum stops."]
          ] },
          { t: "h", text: "Finding Out" },
          { t: "table", caption: "Six clues (two to know there is a deal, four to know all three clauses)", head: ["#", "Where", "Check", "What it gives"], rows: [
            ["1", "Supper with Mahadi", "Free. Insight DC 14 for the tone.", "'A gentleman has an interest in your debt.' He will sell it back: 15 SC or a service to Asmodeus's house. Clause 1."],
            ["2", "The criers / Rassh", "Rassh, if asked to buy a head: 'Not mine to buy. Ask the host.' Persuasion DC 12 for why.", "Someone holds first refusal on dragon parts. Clause 2."],
            ["3", "Infernal Rapture's high table", "Perception DC 15 (the smell of old meat on a chair; a black scale under it). Investigation DC 13 to place it.", "Arkhan sat here. A tall dragonborn who never used his left hand (the Hand of Vecna)."],
            ["4", "The bone devil informant", "Real-answer tier (DC 16 Persuasion, soul coin held = advantage).", "All three clauses, word for word. He read them over a clerk's shoulder."],
            ["5", "Velluc at the Soul Pit", "Win a hand, or Volatile 4.", "Arkhan's obsidian marker: a wager 'to be collected by the holder of the debt'. Clause 1, and that the debt was sold."],
            ["6", "Mahadi's ledger on the counter", "Perception DC 16 to read upside down; Sleight of Hand DC 18 to turn the page.", "'Party of the Last Hill: debt assigned. Dragon parts: reserved. Summons: Monument, dawn.' All three, in Mahadi's hand."]
          ] },
          { t: "h", text: "Breaking Them" },
          { t: "table", caption: "Counters (any one per clause is enough)", head: ["Clause", "Counter", "Cost / check"], rows: [
            ["1. The Debt", "{@b Buy it back} from Mahadi before Arkhan calls it. Mahadi sells it at three times its weight: 15 SC, or one service to the house of Asmodeus (DM's choice of favour, called later).", "15 SC or a favour."],
            ["1. The Debt", "{@b Discharge it.} A hospitality debt is paid by hospitality: host Mahadi on the Lady Vengeance, formally, for one hour, and feed him something he has never eaten. Dragon's blood counts. He cannot refuse an invitation under his own truce.", "A bottle of blood, Persuasion DC 15 to make it formal."],
            ["1. The Debt", "{@b Void it.} The debt dies if the host breaks hospitality first. Mahadi will not. But if the party can prove he sold the debt without telling them (clue 6, the ledger), {@b Kreeg's Ledger} or the contract copy's law (a true copy sworn by its signer) lets a cleric of law argue it: Persuasion DC 20 with the proof, in front of the floor. Mahadi concedes with a smile and raises their price for everything else.", "Proof + DC 20."],
            ["1. The Debt", "{@b Take nothing free tonight.} Does not kill the Session 8 debt, but keeps it small: the service Arkhan can ask is then 'a conversation', not 'a walk'. Or'Henn listens from inside the wards.", "Discipline."],
            ["2. The Heads", "{@b Do not sell or lodge them.} Keep them aboard, salted by Burney (a service). Sell the blood and scales instead: those are not 'parts' in the clause's wording (Mahadi wrote it narrow on purpose: he wanted the blood trade).", "1 SC per head."],
            ["2. The Heads", "{@b Sell them to Arkhan on purpose,} at the table, under the truce, for something worth more than two heads: a day's head start (he swears it on Tiamat: he keeps oaths), or the name of the dragon in the Orb, or Obatala's leash. He will pay. He wants nobody else to have them.", "A parley with Arkhan. Run his lines from Session 13's Talking to Arkhan panel."],
            ["3. The Bell", "{@b Buy hours.} Mahadi sells delay: 2 SC per hour, up to six. The summons stands; it is only later.", "2 SC per hour."],
            ["3. The Bell", "{@b Counter-summon.} The Emporium goes where a bigger power calls it. A word from Mephistopheles (the Mirror), Bel, or a Writ in Zariel's name (the riders carry one) outranks Tiamat's champion. Rigorath will sell a summons for the usual price; the riders will not help; Bel is far.", "A Mirror answer, or ingenuity."],
            ["3. The Bell", "{@b Leave before it.} The ship under way is not hunted (the exit R rule). Fly to the Mirror in the dark: 3 hours over the ice, above Vermilius's road.", "No cost. The night is shorter."]
          ] },
          { t: "h", text: "If They Do Not" },
          { t: "table", caption: "Consequences at the bell", head: ["Clause left standing", "What Arkhan gets"], rows: [
            ["1. The Debt", "Or'Henn at the ward's edge, alone with Arkhan for one minute. Tiamat's offer, in person. One Pull save at DC 10 + Pull + 2; a fail is +2 Pull and a Small Vision. If Or'Henn asks a dragon for help out loud, Obatala is right there."],
            ["2. The Heads", "The heads (if sold or lodged). Flash's true name goes back to Tiamat's shrine. Arkhan's dragons get +2 on their first attack roll against the ship tonight: morale."],
            ["3. The Bell", "The ship moored under a fallen ward. Hunt roll is automatic. The riders hold the gangplank; Slarkas is over the deck; Obatala lands on the jetty. The party fights its way out of a car park."]
          ] },
          { t: "h", text: "Mahadi at the Table" },
          { t: "p", text: "He is never the villain of this. He is the house. He admires the party for finding the clauses and says so. He admires Arkhan for buying them and says that too. Every counter above is a sale he is happy to make. {@b Sample line:} 'I do not take sides, my dear friends. I take commissions.' If the party threatens him, the hum sharpens and he looks sad: 'Please. Not under my roof. You would lose the only place in Hell that likes you.'" },
          { t: "note", title: "The puzzle's shape", text: "Three clauses, each with three or four outs, and the players choose which to pay for. The best solutions cost coins the dens wanted, so the night has a budget. A party that finds all six clues and breaks all three clauses leaves the Emporium clean and Arkhan has to do this the hard way, on the ice. That is the reward." },
          { t: "choices", prompt: "Next", items: [
            { label: "Back to the floor", goto: "the-floor" },
            { label: "The bell: leaving", goto: "the-bell" }
          ] }
        ]
      },

      // -----------------------------------------------------------------
      // 5 THE BELL
      // -----------------------------------------------------------------
      {
        id: "the-bell",
        title: "The Bell: Leaving the Wards",
        when: "",
        duration: "20 minutes",
        blocks: [
          { t: "read", text: "A single iron bell, somewhere above the market, rings once. The hum changes key. All across the floor, stalls begin to fold themselves back into war machines, lanterns go out one string at a time, and the devils who have been smiling at you for ten hours stop smiling and look up." },
          { t: "p", text: "When it rings depends on the puzzle: dawn by default, later if they bought hours, or never for them if they left first. The moment the wards fold, everything outside the ship is open ground." },
          { t: "h", text: "Who Is Outside" },
          { t: "list", items: [
            "{@c arkhan-the-cruel|Arkhan} with {@c krull|Krull} on {@c obatala|Obatala}, and {@c skarrix|Slarkas}, in the clouds over the Styx. They come down only on a moored ship or a party on open ground.",
            "Three {@c narzugon|narzugons} at the jetty. They ride for the gangplank.",
            "Bounty hunters from the floor: a warlord's captain and two cambions. They follow the riders and loot what the riders kill.",
            "{@c mirelle|Vermilius} on the ice road to the Mirror, in the fog, a voice. She does not fight on the road."
          ] },
          { t: "h", text: "The Hunt (Arkhan's survivors)" },
          { t: "table", caption: "Hunt roll: once per 8 hours the ship sits anywhere outside the wards", head: ["Roll d20 + modifiers", "Result"], rows: [
            ["17 or lower", "The clouds hold. Nothing finds the ship."],
            ["18 or higher", "Slarkas finds it. He does not fight alone; Arkhan knows within the hour."],
            ["+2", "The force cannons fired in the last day."],
            ["+2", "Or'Henn's Pull is 6 or higher."],
            ["+2", "The heads ride on the prow, or were sold here (clause 2 left standing)."],
            ["+5", "The brass plate is still on Or'Henn's staff."],
            ["Automatic", "The ship was moored at the jetty when the bell rang (clause 3 left standing)."],
            ["No roll", "The ship moved that period. On the Mirror's shelf, it is not the ship Arkhan is watching."]
          ] },
          { t: "h", text: "Three Ways to the Mirror" },
          { t: "table", caption: "The ice road", head: ["Way", "Time", "What they meet"], rows: [
            ["{@b Fly}, the Lady Vengeance over the ice", "3 hours", "Nothing: Vermilius is below the fog. Land on the shelf's edge: the escort watches. The ship on the shelf is in Arkhan's sight when he lands."],
            ["{@b Walk}, the ship hidden on the Styx", "8 hours across glare ice", "Vermilius on the road (Honeyed Voice, a Pull save), then the shelf. The ship is safe. The party arrives tired: one long rest short of the fight. Arkhan likes this."],
            ["{@b Skip the Mirror}", "Straight to the Scab road, Session 15", "Dumal's clock keeps ticking (+1 at the end of the session). The siege comes to the ship, wherever it is, with the Ravager available. Maelys follows the party; Glasya's bid comes on the road."]
          ] },
          { t: "p", text: "{@b If the party leaves before the bell,} the riders follow the Styx and are half a day behind at the Mirror; Arkhan follows carefully, out of sight, as he has all night. {@b If they leave at the bell,} run the gangplank: narzugons at the plank, Slarkas over the deck, the ship's cannons, and Overdrive if they have a coin left. Obatala lands on the jetty only if Or'Henn is on it." },
          { t: "choices", prompt: "Next", items: [
            { label: "The Mirror", goto: "the-glass-that-sings" },
            { label: "They skip it: the Scab road", goto: "ending" }
          ] }
        ]
      },

      // -----------------------------------------------------------------
      // 6 THE MIRROR
      // -----------------------------------------------------------------
      {
        id: "the-glass-that-sings",
        title: "The Glass That Sings: the Mirror of Mephistar",
        when: "",
        duration: "30 minutes",
        blocks: [
          { t: "read", text: "The ice begins a mile out: a frozen skin over the waste, then a crag of it rising like a wave that forgot to fall. Set into the crag, a sheet of black glass forty feet high, so cold the air over it sings one thin note without stopping. Four ice devils and a bone devil stand on the shelf below it in a line that has not moved for a very long time. In the glass, behind your own reflections, there is the shape of a man, kneeling." },
          { t: "env", sight: "Glare ice, black glass, your own faces, and him.", sound: "The note. Nothing else.", feel: "Cold enough to hurt. The shard in Drenwal's pack is warm by comparison." },
          { t: "h", text: "The Shelf" },
          { t: "steps", items: [
            "{@b The approach} is sheer glare-ice: {@b DC 15 Acrobatics} to cross without falling prone and sliding 15 feet toward the drop. A flying ship lands on the shelf's edge; the escort watches it do so.",
            "{@b Quiet} and the escort ({@c ice-devil-agent|four ice devils} and a {@c bone-devil-lieutenant|bone devil}) only watch. {@b Loud} (a drawn weapon, a hostile spell, a demand) and they close ranks between the party and the glass. This is a gate, not an ambush (book).",
            "{@b Call,} and {@c rigorath|Rigorath} steps out of the glass. He states the price: {@b Blood Pay} (one level of exhaustion, or a permanent -1 to one ability score) or {@b five soul coins} per answer. Coins scream.",
            "{@b Lulu,} if she is aboard, objects to every coin. If she is not, Moonkite does: he feels the souls go."
          ] },
          { t: "h", text: "The Answers" },
          { t: "p", text: "Every answer is {@b true}, and every answer is {@b aimed at Zariel}: Mephistopheles wants her weakened, humiliated or gone, and sells the party whatever gets them there. {@b Insight DC 16} shows the aim. The full list is in {@side mirror-answers|What the Mirror Knows}. Let the players ask; the table answers." },
          { t: "p", text: "{@b The man in the glass.} If anyone asks who he is, Rigorath smiles: 'The Champion of the Mirror. He sleeps until he is needed. Shall I need him?' Drenwal's Bhaal-Sight already knows: it is {@c dumal|Dumal}, and he is not asleep. He is listening." },
          { t: "note", title: "Price of the Mirror in practice", text: "Blood Pay is the sane price: a level of exhaustion per answer, two or three answers before the fight. Make the exhaustion matter on the ice. A party that pays in coins buys the answers with five screams each; play each one." },
          { t: "choices", prompt: "When the questions are done, or when Drenwal looks at the glass too long", items: [
            { label: "Rigorath calls the Champion", goto: "each-devil-wants-a-bhaalspawn" }
          ] }
        ]
      },

      // -----------------------------------------------------------------
      // 7 THE AUCTION
      // -----------------------------------------------------------------
      {
        id: "each-devil-wants-a-bhaalspawn",
        title: "Each Devil Wants a Bhaalspawn",
        when: "",
        duration: "30 to 45 minutes",
        blocks: [
          { t: "read", text: "Rigorath lays one hand flat on the glass. 'Champion.' The kneeling shape stands up inside the ice and walks forward, and the ice does not stop him. Frost falls off him like dust. Red plate gone white at the edges. The same careful face. 'Den,' says Dumal. 'You came. I knew you would. Stay. You should hear what I am worth.'" },
          { t: "p", text: "{@c dumal|Dumal} is Mephistopheles' Champion now. He pledged his Bhaalspawn blood, all of it, 'his undying lust and power' as the clerks wrote it, for a shape: {@b the Slayer}, and a worse one after it if his master is satisfied. He is not afraid any more, and that is the most frightening thing about him. He does not strike first. He talks." },
          { t: "h", text: "What Dumal Says" },
          { t: "list", items: [
            "{@b What he bought.} 'I sold the rest of me for a shape. You would not believe what it feels like to stop being afraid.' He will show them a little: frost runs up his arm and his hand is a claw for a second.",
            "{@b What he wants.} Drenwal home. 'Kill the elf with me, Den. Draw your third seal in her blood. Then there are two of us, we are both Cania's, and nobody in Hell can touch us.' He does not yet know Maelys is here. Bhaal-Sight tells him a moment later.",
            "{@b What he knows.} Senna's address. Mephistopheles' terms word for word. That Arkhan is overhead ('the dragon-man wants your druid; I want you; we are not competing').",
            "{@b What he will not do.} Strike Drenwal down. Ever. Everyone else is negotiable."
          ] },
          { t: "h", text: "Maelys Arrives" },
          { t: "read", text: "Something comes down the crag that does not slip. An elf in a crown of thorns, red to the rim of her eyes, two short blades already wet. Behind her a woman in black plate with a crow's wings lands like a verdict and opens a scroll case. The elf looks at Dumal, then at Drenwal, then at the blades in her hands, and whispers so that everyone hears: 'Two of you. Good. I only brought two blades.'" },
          { t: "p", text: "{@c maelys|Maelys the Thorn-Crowned} is {@b Glasya's}. The {@c erinyes-of-glasya|erinyes} is her herald and her leash. Glasya promised Maelys the Slayer form for a brother's head. The same shape Mephistopheles has already given Dumal. {@b Devils are consistent:} the shape goes to whichever Bhaalspawn kills first, and both lords know it. Rigorath, when he sees her, does not reach for the escort. He laughs." },
          { t: "read", text: "'Three of the Lord of Murder's children,' says Rigorath, 'on my ice, in one night.' He bows to Maelys, to Dumal, and last and lowest to Drenwal. 'Every lord of the Nine keeps a list. A Bhaalspawn is the line at the top that nobody had filled. My lord has filled his. The Lady of the Sixth has filled hers. You, priest, are the last empty line in Hell. It is a pleasure. And a rarity. Shall we begin?'" },
          { t: "h", text: "The Bids" },
          { t: "table", caption: "Everyone bids for Drenwal (and Arkhan for Or'Henn)", head: ["Bidder", "Through", "The offer", "The hook", "The true cost"], rows: [
            ["{@b Mephistopheles}", "Rigorath", "'Your rebirth, done in ice. You die on the Mirror and rise clean: no Bhaal, no sigils' crack, no sickness.' It is a real rebirth, in the eyes of another god.", "It is Drenwal's cure, word for word (Mordenkainen's: die and be reborn in another god's eyes). The god is Mephistopheles.", "He rises as Cania's. The Shield of the Hidden Lord goes on a shelf in Cania. Gargauth screams from Drenwal's arm when this is said."],
            ["{@b Glasya}", "The erinyes", "'Kill your brother. The third seal is yours. Afterwards, one night a year, your blade in my lady's service.'", "It completes the Three Sigils the way the cult always meant: a kinslaying, with a devil's blessing. Cheap, and it makes the Slayer fight easier (Dumal dead before he rises).", "A night a year is a murder a year. Glasya is Asmodeus's daughter; the contract passes upward."],
            ["{@b Dumal}", "Himself", "'Kill the elf with me. Draw your seal in her blood. We are both Cania's, and we are the last two.'", "The only bid that keeps Dumal alive and Senna safe, by his lights. He means it.", "Drenwal would be Cania's too, by association: Rigorath will say so. And the Ravager wakes if Drenwal draws the sigil in Maelys's blood while Dumal stands (Bhaal's attention)."],
            ["{@b Maelys}", "Her blades", "No offer. 'One voice. One blade. One god. You are not him. He is not him either.'", "She is not bidding. She is the knife the other bids are made with.", "Nothing. She wants both brothers dead and Glasya's shape for herself."],
            ["{@b Gargauth}", "The Shield, in Drenwal's head", "'Neither of them. Keep me out of Cania and I will show you the rite that needs no kin's blood.'", "A way out that does not cost a sibling. Tempting.", "A lie. The rite he means needs Senna's. Gargauth's Bargain +5 if Drenwal listens."],
            ["{@b Arkhan}", "Himself, if he lands", "Not for Drenwal. 'The druid. The rest of you, I have no further use for.' To Or'Henn: 'Ask. Any of them. Obatala is right here.'", "He lands behind the party, between them and the ship, only when they are tired. The escort steps between him and the glass.", "Tiamat. Always Tiamat."]
          ] },
          { t: "h", text: "How It Breaks" },
          { t: "p", text: "Rigorath's rule of the glass: {@b 'No blood before the Mirror unless it is Bhaal's.'} He wants the siblings to fight; the escort will not interfere with Bhaalspawn killing Bhaalspawn. The first strike decides the shape of {@scene blood-on-the-ice|the fight}:" },
          { t: "table", caption: "Who strikes first", head: ["First strike", "What happens"], rows: [
            ["{@b Maelys} (default, if the talk runs long: she is bored)", "She Assassinates the lowest ally near Drenwal. Dumal turns on her at once: 'Not him.' The siblings fight each other and the party chooses a side, or neither."],
            ["{@b Drenwal} at Dumal", "Dumal fights, pulling his blows on Drenwal. Maelys waits for the Slayer, then goes for it. The erinyes shoots whoever heals."],
            ["{@b Drenwal} at Maelys", "The erinyes defends her; Dumal helps Drenwal, delighted. Glasya's bid is withdrawn. If Drenwal kills Maelys and draws the sigil while Dumal stands: the Ravager."],
            ["{@b The party} at Rigorath or the Mirror", "The escort fights. Dumal defends the glass. Maelys picks off the wounded. The worst version. Say so if they ask."],
            ["{@b Nobody}", "Drenwal refuses every bid out loud. Gargauth's Bargain -3, Bhaal's Claim -5, and Rigorath, disappointed, declares the sheet open: 'Then the lords may collect what they can.' Maelys strikes. Dumal defends Drenwal."]
          ] },
          { t: "choices", prompt: "Next", items: [
            { label: "Drenwal draws the third sigil (now or mid-fight)", goto: "the-third-sigil" },
            { label: "Blood on the ice", goto: "blood-on-the-ice" }
          ] }
        ]
      },

      // -----------------------------------------------------------------
      // 8 THE THIRD SIGIL
      // -----------------------------------------------------------------
      {
        id: "the-third-sigil",
        title: "The Third Sigil: Drenwal's Final Seal",
        when: "If Drenwal kills a Bhaalspawn tonight, or chooses the rebirth instead",
        duration: "15 minutes",
        blocks: [
          { t: "p", text: "The Three Sigils are the cult's road to {@b master} the blood: the Leash (done, Aurora's Sigil of the Kept Watch), the Binding (done, Session 9, in Dumal's blood), and {@b Mastery: the last living Bhaalspawn dies by his hand}. Tonight there are two Bhaalspawn on the ice who are not Drenwal, and both of them are trying to make him choose. The full rules, both Tier III roads and the catch are in {@side sigil-of-mastery|The Sigil of Mastery}. This scene is the moment." },
          { t: "h", text: "The Rite (homebrew, fixed tonight)" },
          { t: "steps", items: [
            "{@b The kill is his.} A Bhaalspawn (Dumal, the Slayer, or Maelys) is reduced to 0 hit points by Drenwal's own weapon or hand, or by a spell he casts within 5 feet of it. Not an ally's blow, not the ship's cannon.",
            "{@b The blood is fresh.} Within 1 minute of the kill, as an action, he draws the sigil on his own chest in it. {@b Religion DC 15}; Veska standing beside him gives advantage; the Kept Watch lets him attempt it even while frightened.",
            "{@b The words are Bhaal's.} He says the Lord of Murder's name as a title ('Father'). Lulu, if present, cries out. Moonkite screams. Torm's oath on the sun and the sword goes cold on Drenwal's tongue for a day: no Divine Intervention until the next dawn.",
            "{@b Then the road decides.} Count his Marks ({@side sigil-of-mastery|the panel}): Watch Marks ahead and Bhaal's Claim below 65, he is {@b the Severed Blood}. Blood Marks ahead or Claim at 65 or more, he is {@b the Ascendant}. Tell him which before he draws it: he can feel the difference."
          ] },
          { t: "h", text: "The Catch" },
          { t: "p", text: "{@b Senna lives.} The sigil holds, but it is not whole: Bhaal knows the count. Once per long rest, at a quiet moment, Bhaal asks for her by name: {@b Wisdom save DC 15} or Bhaal's Claim +5. The Severed Blood's powers do not crack from this; the Ascendant's climb. {@b The only way to make it whole without her} is the rebirth: Drenwal dies and is reborn bearing all three sigils, and the cycle breaks instead of completing. Mephistopheles just offered exactly that, in his own glass. So did Torm, on the ship, in Session 8. The difference is whose eyes he opens in." },
          { t: "h", text: "What the Devils Do" },
          { t: "p", text: "The moment the sigil completes, every bid on the ice doubles. Rigorath says so. A Bhaalspawn who has mastered the blood is no longer a rarity; he is {@i the} rarity. The erinyes writes a new number on Glasya's contract without being asked. Arkhan, if he is there, looks at Drenwal for the first time as if he were a dragon." },
          { t: "h", text: "If He Refuses" },
          { t: "p", text: "Out loud, in front of Dumal: Bhaal's Claim -5, Gargauth's Bargain -3, and Dumal understands something he did not want to. 'Then it will have to be me, Den.' He fights to be killed by his brother. The Slayer's Dumal's Will trait stays on. If Drenwal will not take the kill even then, Maelys will, and the Slayer shape goes to her: Glasya wins the night, and Session 15 has a Slayer in it that is not family." },
          { t: "choices", prompt: "Next", items: [
            { label: "Blood on the ice", goto: "blood-on-the-ice" },
            { label: "The ending", goto: "ending" }
          ] }
        ]
      },

      // -----------------------------------------------------------------
      // 9 THE FIGHT
      // -----------------------------------------------------------------
      {
        id: "blood-on-the-ice",
        title: "Blood on the Ice",
        when: "",
        duration: "90 minutes",
        blocks: [
          { t: "p", text: "Three fights are possible on the shelf. They should not all happen at once, and the party decides which happen at all. Use the sequencing table, then the encounters." },
          { t: "table", caption: "Sequencing for three PCs plus Veska, Lucan and Moonkite", head: ["Situation", "Run"], rows: [
            ["The siblings fight each other and the party picks a side", "Encounter A with Maelys as a third party: she and Dumal attack each other first. The party's enemy is whoever they strike. Hardest for the DM, best for the table."],
            ["The party fights Dumal", "Encounter A. Maelys waits for the Slayer, then attacks {@i it}. If the party kills the Slayer before she can, she turns on them: Encounter B, with the party already spent. Warn with her Thorned Dream on an ally the round before."],
            ["The party fights Maelys", "Encounter B. Dumal helps, pulling nothing. The erinyes carries Maelys off at 0. Dumal is still a bid afterwards, not a fight, unless they turn on him."],
            ["The party attacks the Mirror or Rigorath", "Encounter C first (the escort), with Dumal defending the glass as the Champion. Maelys picks off the wounded. Do not soften it."],
            ["Arkhan", "Encounter D, {@b only} when the party drops below half strength or leaves the shelf. He lands behind them. If the party is still fresh when the ice is quiet, he does not land at all: he follows them to the Scab."]
          ] },
          { t: "h", text: "The Ice" },
          { t: "list", items: [
            "Glare ice: a creature that Dashes or is shoved must succeed on {@b DC 15 Acrobatics} or fall prone and slide 10 feet in the direction it was moving. Obatala's Rimeground makes the whole shelf count.",
            "{@b The Mirror:} AC 20, 100 hit points, immune to cold, poison and psychic damage, resistant to everything but radiant and thunder. Breaking it ends Mephistopheles' audience (no more answers, ever), turns the escort hostile, ends Dumal's Champion healing and {@b his Pledge}: he can die, and so can the Ravager without the Mirror taking him. Rigorath steps back through it before it shatters, and remembers.",
            "{@b The drop:} the shelf ends in a 60-foot fall onto ice (6d6). Slaughter Leap and Wing of Frost push toward it on purpose."
          ] },
          { t: "h", text: "Encounters" },
          { t: "encounter", id: "dumal-champion", title: "A. Dumal, Champion of the Mirror (three forms)", combatants: [
            { c: "dumal", n: 1 }, { c: "maelys", n: 1 }, { c: "erinyes-of-glasya", n: 1 }
          ], notes: "Add Maelys and the erinyes only if they engage. Dumal first form 285 HP, healing 10 a turn near the glass unless hit by radiant. At 0: the Slayer rises in his space with 200 HP (add dumal-slayer). At the Slayer's end: Dumal dying on the ice, or the Ravager if the clock is full or Drenwal drew the sigil in Maelys's blood while Dumal stood (add dumal-ravager, 250 HP). See Dumal's Three Forms." },
          { t: "encounter", id: "maelys-and-the-herald", title: "B. Maelys and Glasya's Herald", combatants: [
            { c: "maelys", n: 1 }, { c: "erinyes-of-glasya", n: 1 }
          ], notes: "Maelys Assassinates the lowest ally near Drenwal from a Silent Step. The erinyes shoots healers from the air and carries Maelys off at 0 (she is at 1 HP, stable, in the erinyes's arms; kill the erinyes first if the party wants her dead). Dreams of Suffering: the party's first save against her is at disadvantage (they rested at the Emporium)." },
          { t: "encounter", id: "the-escort", title: "C. The Mirror's Escort", combatants: [
            { c: "ice-devil-agent", n: 4 }, { c: "bone-devil-lieutenant", n: 1 }
          ], notes: "Only if the party strikes the Mirror, Rigorath or the escort. Deadly on its own (4 x CR 14 + CR 9). They defend the glass and call Rigorath back through it. If the party is quiet, they never act." },
          { t: "encounter", id: "arkhans-moment", title: "D. Arkhan's Moment", combatants: [
            { c: "arkhan-the-cruel", n: 1 }, { c: "krull", n: 1 }, { c: "obatala", n: 1 }, { c: "skarrix", n: 1 }
          ], notes: "Only when the party is below half strength or leaves the shelf. He lands behind them, between them and the ship. Krull: blade barrier across the way back. Slarkas stays in the air. Obatala on the ground. Vermilius holds the road and joins only if Or'Henn runs. The escort keeps Arkhan 60 ft. from the glass. If it turns: he teleports home with Krull." },
          { t: "h", text: "The Slayer, at the Table" },
          { t: "steps", items: [
            "When Dumal hits 0, stop. Read the Slayer's description. Say: 'This is what he bought.'",
            "Say the Murder Sense numbers aloud when it looks at someone: 'It knows you have 23 left.'",
            "Drenwal's attacks against it have advantage and burn (+2d8 radiant). It will not kill him; it will kill everyone else. Make the players see that Drenwal is the only one it is afraid of.",
            "Round 10, or 0 hit points: it collapses into Dumal, dying. Three choices on the ice: the third sigil (Drenwal's kill, within a minute), a heal (Dumal lives, a man, and Mephistopheles' Pledge is spent: he is free of it, and knows it), or nothing (he dies in 3 rounds; the Mirror takes him)."
          ] },
          { t: "h", text: "XP (suggested, DM's call)" },
          { t: "table", caption: "Level 15 at 260,000", head: ["Enemy", "XP"], rows: [
            ["Dumal, first form (CR 16)", "15,000"],
            ["The Slayer (CR 18)", "20,000"],
            ["The Ravager (CR 21)", "33,000"],
            ["Maelys (CR 15)", "13,000"],
            ["Glasya's erinyes (CR 12)", "8,400"],
            ["The escort, if fought (4 x CR 14 + CR 9)", "51,000"],
            ["Arkhan's moment, if fought to a retreat", "half of Arkhan (37,500) + Krull + the dragons engaged"],
            ["The puzzle: all three clauses broken", "9,000 (a hard encounter's worth, for three)"]
          ] },
          { t: "choices", prompt: "Next", items: [
            { label: "The third sigil, if the kill was his", goto: "the-third-sigil" },
            { label: "Ending", goto: "ending" }
          ] }
        ]
      },

      // Shared endgame scenes (campaign-endgame.js): the Gambit can fire on the ice if Or'Henn asks Obatala for help.
      Object.assign({}, (window.CAMPAIGN.scenes || {})["arkhans-gambit"] || { id: "arkhans-gambit", title: "Arkhan's Gambit", blocks: [] }, { when: "If Or'Henn asks a dragon for help on the ice: Obatala is right there, and Arkhan has waited all night for it" }),
      Object.assign({}, (window.CAMPAIGN.scenes || {})["tiamat-reborn"] || { id: "tiamat-reborn", title: "Tiamat Reborn", blocks: [] }, { when: "If the curse jumped on the ice and the vessel dies" }),

      // -----------------------------------------------------------------
      // 10 ENDING
      // -----------------------------------------------------------------
      {
        id: "ending",
        title: "Ending the Session",
        when: "",
        blocks: [
          { t: "p", text: "End on the ice, or on the ship with the Mirror's note fading behind them. Read the outcomes that happened." },
          { t: "table", caption: "Outcomes to record", head: ["Thread", "Possible ends"], rows: [
            ["{@b Dumal}", "Dead by Drenwal's hand (sigil available). Dead by another's (the Mirror takes him; Mephistopheles has his Bhaalspawn in a jar). Healed on the ice: alive, free of the Pledge, a man, and Drenwal's. Taken as the Ravager: gone. Still in the glass: the siege comes later."],
            ["{@b Maelys}", "Dead (Glasya sends another herald later, with the same blank). Carried off at 1 HP: she returns in Session 15 or the finale, with the Slayer form if she got a kill. Fled."],
            ["{@b Drenwal}", "Tier III: the Severed Blood or the Ascendant (record which, and Bhaal's Claim). Refused: Claim -5, Gargauth -3. Took a devil's bid: record whose, and the price."],
            ["{@b Arkhan}", "Clauses broken (which). Did he land. Did Or'Henn walk to the edge. What he paid for the heads, if anything. Where he is now: following, always."],
            ["{@b Or'Henn}", "Pull and gold scales after the night: Vermilius's voice, the hag's card, Arkhan's offer, the Mirror. Did he ask."],
            ["{@b The Mirror}", "Intact (Mephistopheles remembers the party as customers) or broken (he remembers them as a debt). Answers bought, and how paid: exhaustion or screams."],
            ["{@b The Emporium}", "Debt status, coins lost, memories lost, years lost, teeth lost. Mahadi's opinion of them. Where the caravan went (the Monument, unless counter-summoned)."]
          ] },
          { t: "h", text: "Rewards" },
          { t: "table", caption: "What is on the ice afterwards", head: ["Item", "What it is"], rows: [
            ["{@b The Lance of Bhaal} (Dumal's)", "+2 lance. On a hit, 2d8 necrotic; the target can't regain hit points until the start of the wielder's next turn. A Bhaalspawn wielding it adds its Charisma modifier to the necrotic damage. Cold to the touch forever: Cania's gift is in it. Attunement by a Bhaalspawn only, or by anyone who pays Blood Pay to the Mirror."],
            ["{@b Bhaal's Twin Blades} (Maelys's)", "Two +1 shortswords. Both hit the same creature in a turn: 2d10 necrotic. Attuned together as one item. A non-Bhaalspawn wielder has nightmares (no long-rest benefit on a DC 13 Wis fail, once)."],
            ["{@b The Crown of Thorns}", "Wondrous, requires attunement. Beasts within 30 ft. must save (DC 15 Wis) or be charmed by the wearer for 1 minute. The wearer's eyes turn red while attuned. Or'Henn would find it useful and Tiamat would find him easier to see: Pull +1 while attuned."],
            ["{@b Glasya's contract}", "A scroll with Drenwal's name and a blank. Unsigned, it is a weapon: a devil shown it believes Glasya has a claim on the party. Advantage on Intimidation against devils below CR 15. Signed, it is a contract."],
            ["{@b Chains of Cania} (if the Ravager was fought)", "Three iron chains, 50 ft., that can hold a demon-beast. One of the ways Crokek'toeck can be held in Session 15, or the chains of Elturel can be replaced for a day."],
            ["{@b The Mirror's answers}", "Whatever they bought. The ones aimed at Zariel are the ones they will use."]
          ] },
          { t: "h", text: "What Happens After the Scab (for the DM)" },
          { t: "p", text: "Session 15 is the Scab and the gates of the Bleeding Citadel. Inside the Citadel (Session 16): Yael's ghost, the Sword reforged with the shard, and {@b Lulu restored}. By the book Lulu's memories come back in full when the Sword of Zariel is claimed; in our campaign she must be {@i there}, which means getting her out of the Basalt Citadel first if Zariel's riders took her, or carrying her in if she is aboard. Then Chapter 5: Zariel (redeem, bargain or fight), the chains (Zariel's hand, Kreeg's contract, Crokek'toeck's jaws, or Tiamat as the trap), and Elturel returned. The personal arcs land inside that: Drenwal's rebirth or his Tier III, Or'Henn's curse and Tiamat, Moonkite's caged patron. See the Compass." },
          { t: "note", title: "Record", text: "Everything in the outcomes table, the party's soul coin count, and the Dumal clock. If Maelys lives with the Slayer form, add her to Session 15's Scab as a hunter on the party's trail." }
        ]
      }
    ],

    // =====================================================================
    // SIDE PATHS
    // =====================================================================
    side: {
      "mirror-answers": {
        title: "What the Mirror Knows (archdevil-grade, aimed at Zariel)",
        blocks: [
          { t: "p", text: "Per answer: Blood Pay (one level of exhaustion, or a permanent -1 to one ability score) or five soul coins. {@b Every answer is true. Every answer is aimed at Zariel.} Insight DC 16 shows the aim. Mephistopheles wants Zariel weakened, humiliated, redeemed out of her throne, or dead; he does not care which." },
          { t: "table", caption: "Likely questions", head: ["Question", "True answer", "The aim"], rows: [
            ["How do we break Elturel's chains?", "Four ways. Zariel's own hand. The contract: a living signer can unsign it, or the {@b original}, which is in the vault of her Basalt Citadel; Kreeg's copy alone cannot, but a copy sworn by its signer can. Crokek'toeck's jaws, chained under the Scab: they were forged to chew what Zariel forges. Or Tiamat, who would break them and keep the city.", "Every road but Tiamat's goes through Zariel's house or Zariel's shame."],
            ["Where is Lulu?", "(Default) In the Basalt Citadel, in the gallery under the corpse-hung wall, silenced, unharmed. Zariel visits her every night and does not speak. (If aboard) 'With you. Every devil on that floor knew it.'", "A party in the Basalt Citadel is a knife in Zariel's house."],
            ["Can Zariel be redeemed?", "Yes. She fears it more than the Sword. The Sword whole, in a pure hand, shows her what she was. The shard alone shows her nothing. The doors of the Bleeding Citadel open for the ones who stayed at their post: that is why she cannot enter, and why Yael's ghost holds the hilt.", "A redeemed Zariel is no longer Lord of the First. Mephistopheles would like that very much."],
            ["How do we reforge the Sword?", "The Citadel's heart, the shard, a pure heart to hold it, and Yael's hand to give it. It takes one night and the Citadel's window: it shows itself every 33 days.", "True, and useless to him except that it hurts her."],
            ["How long does Elturel have?", "The DM's number, in days. He says it exactly and adds: 'She is counting too.'", "Hurry makes mistakes."],
            ["What is in the Scab?", "The Blood War's front. Trantolox's demons dig toward the Citadel. Chained on the third level: Crokek'toeck, Yeenoghu's beast, which the demons mean to loose on Zariel's legion. 'Its master was banished from Avernus by your ship's ward. Its master's {@i pet} was not.' (Seed for Session 15.)", "A loosed Crokek'toeck is Zariel's problem. He wants it loosed."],
            ["Or'Henn's curse?", "It moves only into a dragon that takes it willingly. Obatala would, if Krull told him to; Krull has not been told. The dragon in the Orb is a wish away. Her true form needs a vessel older than any dragon on Avernus. Through an adult, she comes half-born.", "Tiamat loose is Zariel's war lost. He likes that too, from a distance."],
            ["What did Arkhan buy from Mahadi?", "All three clauses, word for word, and the price. 'My lord's clerks read every contract Asmodeus seals. It is a courtesy between lords.'", "A party that beats Arkhan stays alive to bother Zariel."],
            ["Which god should Drenwal be reborn in?", "'Any god with eyes. Torm has a claim since your oath on the sun and the sword. The one your brother says Mordenkainen is building has no eyes yet. Mine, for instance, are open.' Then the bid.", "Drenwal on Cania's list."],
            ["Where is Senna?", "'A street in a city you have never seen, in the house of a Harper called Issa. Your brother has known for two years.' He gives the street for a second payment.", "Nothing to do with Zariel. He charges double for it."],
            ["Kreeg?", "The DM's ruling from the Throat, exactly. If alive: 'He is looking for a new master. He has written to mine.'", "Kreeg in Mephistopheles' hand is the contract in his hand."],
            ["Who is the elf?", "'Maelys, Glasya's Blade. The Lady of the Sixth promised her the shape my lord has already given your brother. The shape goes to whichever Bhaalspawn kills first. Devils are consistent.'", "He enjoys this one."],
            ["Zariel's fortress?", "At the Basalt Citadel, crippled, flying again in (the rolled) days. A side gate's password is on the Emporium floor in a hag's bag.", "He would like the party inside it."]
          ] }
        ]
      },

      "dumals-three-forms": {
        title: "Dumal's Three Forms (phase steps)",
        blocks: [
          { t: "steps", items: [
            "{@b First form:} {@c dumal|Dumal, Champion of the Mirror}. 285 HP, AC 20, CR 16. Heals 10 a turn within 60 ft. of the glass unless he took radiant damage. Pulls his blows on Drenwal.",
            "{@b At 0 HP: the Pledge.} Black ice sheets over him and cracks. {@c dumal-slayer|The Slayer} rises in his space: 200 HP, AC 19, CR 18, ten rounds. Shares Dumal's remaining Legendary Resistance. Dumal's Will: it pulls its blows on Drenwal too, with a 1-in-3 slip each turn he is below half.",
            "{@b At the Slayer's end} (round 10 or 0 HP): collapse into Dumal at 0 HP, dying, {@b unless} the Ravager condition is met.",
            "{@b The Ravager condition:} Dumal's Ascension clock is full (6), {@b or} Drenwal drew the third sigil in Maelys's blood while Dumal still stood. Then {@c dumal-ravager|the Ravager}: 250 HP, AC 20, CR 21, fresh Legendary Resistance, no mercy for Drenwal. At 0 HP Dumal dies for good and the Mirror takes his soul.",
            "{@b Breaking the Mirror} (AC 20, 100 HP) at any point ends the Champion healing and the Pledge: whatever form he is in collapses at its next 0 HP into Dumal, mortal, at 1 HP. The escort turns hostile and Mephistopheles' audience is over for the campaign."
          ] },
          { t: "note", title: "Budget", text: "Three level-14 PCs with Veska, Lucan and Moonkite can take the first two forms in a row if nobody else is fighting them; the Ravager on top of that is a finale. Use the Ravager only on the condition, or when the DM wants the ice to be the night Drenwal remembers." }
        ]
      },

      "sigil-of-mastery": {
        title: "The Sigil of Mastery: Drenwal's Final Seal (Tier III)",
        blocks: [
          { t: "p", text: "From {@b drenwal-bhaal-blood.md}: the Three Sigils are the cult's path to master the blood, the same ritual that forged Dumal. Tier I is the Kept Watch (the leash). Tier II is the Binding (Session 9, in Dumal's blood). {@b Tier III is Mastery: the last living Bhaalspawn dies by his hand.} Which Tier III he gets depends on how he has carried the first two." },
          { t: "h", text: "Which Road (count before he draws it)" },
          { t: "table", caption: "Marks (3 per tier, plus the meter)", head: ["Watch Marks (Coram's road)", "Blood Marks (Bhaal's road)"], rows: [
            ["Denied a Bhaal or fiend save; spared or protected; re-consecrated with Veska; struck the cult; refused Bhaal out loud.", "Nova spam; killed greedily; Bhaal's Claim climbed; relapsed; killed someone Dumal pointed at."],
            ["{@b Severed Blood} if Watch Marks are ahead {@b and} Bhaal's Claim is below 65.", "{@b Ascendant} if Blood Marks are ahead {@b or} Bhaal's Claim is 65 or more."]
          ] },
          { t: "h", text: "The Severed Blood (the salvation road, mastered as a tool)" },
          { t: "list", items: [
            "{@b Always on:} resistance to necrotic damage; fiend hits halved {@i every} turn, not once; immune to the frightened condition; Bhaal-Sight to 5 miles; the Kept Watch's save advantages stand.",
            "{@b Watch pool: 5 charges per long rest.} Sanguine Flame +3d8 necrotic (on a kill, heal 15 to an ally). Kept Watch aura 15 ft.: +2 AC, advantage against fear and fiends. Slaughter Stayed works on himself too.",
            "{@b Mark of the Watch:} 1 minute, +1 attack, +2 to hit, hits frighten (his DC). {@b No crack check at the end.} 1/long rest.",
            "{@b Capstone, Companion's Judgment (1/long rest):} for 1 minute his radiant and necrotic damage ignore resistance and treat immunity as resistance; fiends and Bhaalspawn have disadvantage on attacks against him; when he reduces a fiend or Bhaalspawn to 0 hit points, allies within 30 ft. gain 15 temporary hit points.",
            "{@b The cost that stays:} the blood is mastered, not gone. The rebirth is still the only cure. Senna's catch applies (DC 15 Wis per long rest or Claim +5), but the powers never crack from it."
          ] },
          { t: "h", text: "The Ascendant (the damnation road, raw power)" },
          { t: "list", items: [
            "{@b Always on:} +2 Strength and Constitution (max 22); Hunger Pact: regain 20 hit points when he kills a humanoid; every weapon hit deals +2d8 necrotic; Bhaal's Whisper as a bonus action (one creature, DC = his spell DC, frightened until the end of its next turn).",
            "{@b Avatar of Bhaal (1/long rest):} 10 rounds, Large, 60 temporary hit points, claws (+2d10 slashing on his weapon attacks, reach 10 ft.), immune to necrotic. He looks like the Slayer, smaller, with his own face.",
            "{@b What he loses:} the Kept Watch aura ends; Veska can no longer re-consecrate him; Lulu and Moonkite cannot bear to be within 10 ft. of him while the Avatar is up; Torm's claim is withdrawn.",
            "{@b The climb:} Bhaal's Claim +5 every long rest, and +15 per cold-blooded kill. At 100 he is the Flame Ascendant, an NPC, and the DM runs him. Dumal's road, exactly."
          ] },
          { t: "h", text: "The Rebirth Out (the synthesis)" },
          { t: "p", text: "If Drenwal dies and is reborn in the eyes of another god {@b while bearing all three sigils}, the cycle breaks instead of completing: he returns as the Severed Blood permanently, with no catch, no climb, and Senna safe. The gods on offer: {@b Torm} (his oath on the sun and the sword, Session 8; a claim held, not yet spent), {@b the one Mordenkainen is building} (Dumal's claim; unverified), and tonight {@b Mephistopheles}, who means it literally and would own the result. The book's Ultimate Sacrifice in the finale is the same door from the other side." },
          { t: "note", title: "DM dials still open", text: "Is the ritual genuine, the cult's lie, or twistable? Tonight it is {@b genuine and twistable}: it works, it is Bhaal's design, and the rebirth twists it. Who is 'the last one'? Tonight: any Bhaalspawn by his hand completes the seal; Senna is the catch, not the requirement. Change either before play if you want the gut-punch version." }
        ]
      }
    }
  };
})();
