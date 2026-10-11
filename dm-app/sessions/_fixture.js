// Small test session for the dm-app itself. Not registered in sessions/index.js
// (the real session list is owned by the content agent). Load with
// index.html?s=_fixture — app.js falls back to loading sessions/_fixture.js
// directly even though it isn't listed, since the file exists at that path.
window.SESSION = {
  id: "_fixture",
  title: "Fixture Session",
  subtitle: "DM App self-test · not a real session",
  summary: "Two scenes, one side path, two creatures (one legendary+lair), one encounter.",

  party: [
    { id: "aria", name: "Aria", note: "Fighter 5" },
    { id: "borin", name: "Borin", note: "Cleric 5" }
  ],
  allies: [
    { id: "veska", name: "Veska", note: "Hellrider scout" }
  ],

  creatures: {
    "goblin-scout": {
      name: "Goblin Scout",
      kind: "goblin-scout",
      role: "Weak skirmisher",
      source: { page: "bestiary", name: "Goblin", src: "MM" },
      npc: false,
      sizeType: "Small humanoid (goblinoid), neutral evil",
      ac: 15, acNote: "leather armor, shield",
      hp: 7, hpFormula: "2d6",
      speed: "30 ft.",
      abilities: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 },
      saves: "", skills: "Stealth +6",
      vulnerable: "", resist: "", immune: "", condImmune: "",
      senses: "darkvision 60 ft., passive Perception 9",
      languages: "Common, Goblin",
      cr: "1/4", xp: 50, pb: 2,
      traits: [{ name: "Nimble Escape", text: "Can take the Disengage or Hide action as a bonus action." }],
      actions: [{ name: "Scimitar", text: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage." }],
      bonus: [], reactions: [],
      tactics: ["Shoots from range first.", "Flees at half HP toward {@c skarrix|Skarrix}."]
    },
    "skarrix": {
      name: "Skarrix",
      kind: "young-black-dragon",
      role: "Tower dragon (black)",
      source: { page: "bestiary", name: "Young Black Dragon", src: "MM" },
      homebrew: "HP cut for a resource-tax fight.",
      npc: false,
      sizeType: "Large dragon, chaotic evil",
      ac: 18, acNote: "natural armor",
      hp: 60, hpFormula: "13d10 + 13",
      speed: "40 ft., fly 80 ft., swim 40 ft.",
      abilities: { str: 19, dex: 14, con: 15, int: 12, wis: 11, cha: 15 },
      saves: "Dex +5, Con +4", skills: "Perception +6, Stealth +5",
      vulnerable: "", resist: "", immune: "acid", condImmune: "",
      senses: "blindsight 30 ft., darkvision 120 ft., passive Perception 16",
      languages: "Common, Draconic",
      cr: "6", xp: 2300, pb: 3,
      traits: [{ name: "Amphibious", text: "Can breathe air and water." }],
      actions: [{ name: "Bite", text: "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage." }],
      bonus: [], reactions: [],
      legendary: {
        count: 3,
        intro: "Skarrix can take 3 legendary actions, choosing from the options below. Only one may be used at a time and only at the end of another creature's turn.",
        actions: [{ name: "Tail Attack", cost: 1, text: "Melee Weapon Attack: +6 to hit, one target. Hit: 10 (2d6+3) bludgeoning damage." }]
      },
      lair: { initiative: 20, text: "Cracks open in the tower floor; everyone within 10 ft. of a crack must save or fall prone in rubble." },
      tactics: ["Opens with lair action if available.", "Targets the weakest-looking PC first.", "Flees above the tower at 10 HP."]
    }
  },

  scenes: [
    {
      id: "arrival",
      title: "Arrival at the Tower Gate",
      when: "",
      duration: "30 minutes",
      banner: "art/official/krull.webp",
      blocks: [
        { t: "read", text: "The tower door hangs ajar. A faint draconic growl echoes from above.\n\nSomething small skitters in the rubble." },
        { t: "p", text: "{@c goblin-scout|A goblin scout} watches from the shadows. Roll {@dice 1d20} for a surprise check." },
        { t: "note", title: "DM note", text: "If the party is loud, skip straight to {@scene tower-fight|the tower fight}." },
        {
          t: "choices", prompt: "What do the party do?",
          items: [
            { label: "Sneak in", goto: "tower-fight" },
            { label: "Check the side passage", side: "side-passage" }
          ]
        }
      ]
    },
    {
      id: "tower-fight",
      title: "The Tower Fight",
      when: "",
      blocks: [
        { t: "h", text: "Skarrix Descends" },
        { t: "list", items: ["{@c skarrix|Skarrix} drops from the rafters.", "The floor cracks — lair action territory."] },
        {
          t: "encounter",
          id: "tower-fight-enc",
          title: "Tower Showdown",
          combatants: [
            { c: "goblin-scout", n: 2 },
            { c: "skarrix", n: 1 }
          ],
          lair: "skarrix",
          notes: "Lair action triggers at initiative 20 if Skarrix is present."
        }
      ]
    }
  ],

  side: {
    "side-passage": {
      title: "The Side Passage",
      blocks: [
        { t: "read", text: "A narrow crawlspace smells of sulfur and old bones." },
        { t: "p", text: "A cache here holds a {@item longsword}." }
      ]
    }
  }
};
