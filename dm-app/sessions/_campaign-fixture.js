// Dev/test fixture for the campaign layer (Stage 1). Loaded ONLY when the
// URL has ?fixture=1 (see js/app.js's wantsCampaignFixture) — never a static
// <script> tag, never loaded by default. Mirrors the window.CAMPAIGN contract
// in SESSION-FORMAT.md so the map view, nav, search and ledger all have
// something realistic to render during development and Playwright checks.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.creatures, {
  "pit-fiend-warden": {
    name: "Rhazzik",
    kind: "pit-fiend",
    role: "Warden of the Bel's Forge chain gang",
    source: { page: "bestiary", name: "Pit Fiend", src: "MM" },
    npc: false,
    sizeType: "Large fiend (devil), lawful evil",
    ac: 19, acNote: "natural armor",
    hp: 103, hpFormula: "11d10 + 44",
    speed: "30 ft., fly 60 ft.",
    abilities: { str: 26, dex: 14, con: 24, int: 22, wis: 18, cha: 24 },
    saves: "Dex +8, Con +13, Wis +10, Cha +13", skills: "",
    vulnerable: "", resist: "cold; fire", immune: "", condImmune: "poisoned",
    senses: "truesight 120 ft., passive Perception 14",
    languages: "Infernal, telepathy 120 ft.",
    cr: "20", xp: 25000, pb: 6,
    traits: [{ name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." }],
    actions: [{ name: "Bite", text: "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 22 (4d6 + 8) piercing damage plus 35 (10d6) fire damage." }],
    bonus: [], reactions: [],
    tactics: ["Opens with its fear aura on the party's frontline.", "Targets spellcasters once revealed."]
  }
});

Object.assign(window.CAMPAIGN.side, {
  "soul-coin-market": {
    title: "The Soul Coin Market",
    blocks: [
      { t: "read", text: "A gaunt broker in a patchwork coat spreads soul coins across a bone table." },
      { t: "p", text: "{@c pit-fiend-warden|Rhazzik} watches from the shadows, unwilling to deal directly." }
    ]
  }
});

window.CAMPAIGN.map = {
  id: "avernus-fixture",
  title: "Avernus (fixture)",
  image: "maps/avernus-dm.webp",
  playerImage: "maps/avernus-player.webp",
  stages: [
    { id: "ch3", title: "Chapter 3: Avernus", summary: "The sandbox: find allies, find a way out." },
    { id: "ch4", title: "Chapter 4: Fortress of Conflagration", summary: "Bel's war machine, deep in the Blood War." }
  ],
  pins: [
    {
      id: "arkhans-tower", title: "Arkhan's Tower", x: 9, y: 15,
      stage: "ch3", path: "main", status: "open",
      objective: "Recover the three skull gems from Arkhan's tower.",
      bloodPrice: "A soul coin bribe, or a fight with Arkhan's dragon guard.",
      blood: 2,
      eventyr: "Early Chapter 3 — the party's first real foothold in Avernus.",
      requires: [], unlocks: ["{@side soul-coin-market|The Soul Coin Market}"],
      sessions: 1,
      dmChoices: ["Arkhan buffed to CR 22 for a resource-tax ambush, not a straight fight."],
      alternatives: ["Bargain for the gems instead of fighting."],
      session: "09-arkhans-tower"
    },
    {
      id: "harumans-hill", title: "Haruman's Hill", x: 55, y: 28,
      stage: "ch3", path: "optional", status: "done",
      objective: "Free the hollyphant Lulu from the hill giant's camp.",
      bloodPrice: "None — a straightforward rescue.",
      blood: 0,
      eventyr: "Optional ally pickup; Lulu can guide the party to Zariel's palace later.",
      requires: [], unlocks: [],
      sessions: 1,
      dmChoices: [], alternatives: []
    },
    {
      id: "bels-forge", title: "Bel's Forge", x: 74, y: 30,
      stage: "ch4", path: "main", status: "open",
      objective: "Infiltrate the forge and sabotage the war machine's engine.",
      bloodPrice: "A named ally's life, offered to Bel's foreman as payment for entry.",
      blood: 3,
      eventyr: "Chapter 4 centerpiece — the Blood War made concrete.",
      requires: ["Access granted by {@c pit-fiend-warden|Rhazzik}, or a forged writ."],
      unlocks: [],
      sessions: 2,
      dmChoices: ["Added Rhazzik as a named warden the party can bargain with."],
      alternatives: ["Steal a writ instead of bargaining."]
    },
    {
      id: "zariels-oubliette", title: "Zariel's Oubliette", x: 30, y: 60,
      stage: "ch4", path: "optional", status: "skipped",
      objective: "A side vault under the palace, rumored to hold Zariel's old relics.",
      bloodPrice: "Risk of waking a bound pit fiend.",
      blood: 1,
      eventyr: "Optional Chapter 4 detour.",
      requires: [], unlocks: [],
      sessions: 1,
      dmChoices: ["Skipped — the party never learned the vault existed."],
      alternatives: []
    },
    {
      id: "chapter-4-aftermath", title: "Chapter 4 Aftermath",
      stage: "ch4", path: "optional", status: "changed",
      objective: "Off-map: fallout from whatever happened at the forge, resolved in downtime.",
      bloodPrice: "Whatever was spent at Bel's Forge.",
      blood: 0,
      eventyr: "Bridges Chapter 4 into Chapter 5.",
      requires: [], unlocks: [],
      sessions: 1,
      dmChoices: ["Resolved narratively, off-screen."],
      alternatives: []
    }
  ]
};
