# DM App — session data format

The app (`index.html`) is generic. Each session is one data file in `sessions/`.
To prep a new session: copy a session file, edit it, add it to `sessions/index.js`.

All scripts are classic `<script>` tags (no ES modules, no fetch of JSON) so the app also opens from `file://`.

## Files

| Path | What |
|---|---|
| `index.html` | App shell. Loads `sessions/index.js`, `media/media.js`, then the chosen session. `index.html?s=<id>`; default = last entry in `SESSIONS`. |
| `sessions/index.js` | `window.SESSIONS = [{ id: "09-arkhans-tower", title: "Session 9: Arkhan's Tower" }]` |
| `sessions/<id>.js` | `window.SESSION = { ... }` (below) |
| `media/media.js` | `window.MEDIA = { "<kind>": { sounds: [...], videos: [...] } }`, shared by all sessions |
| `art/official/<kind>.webp` | Official art (gitignored, never committed: public repo) |
| `art/generated/<kind>.webp` | Generated art for anything without official art |

## SESSION

```js
window.SESSION = {
  id: "09-arkhans-tower",
  title: "Arkhan's Tower",
  subtitle: "Session 9 · Descent into Avernus",
  summary: "One short paragraph: what this session is about.",

  party:  [ { id: "drenwal", name: "Drenwal", note: "Light Cleric 12" } ],   // HP/AC/init typed in the tracker
  allies: [ { id: "veska", name: "Veska", note: "Hellrider" } ],             // optional rows in the tracker

  creatures: { "<id>": CREATURE },          // every creature/NPC that can be clicked
  scenes:    [ SCENE ],                     // the main path, in play order
  side:      { "<id>": { title: "…", blocks: [ BLOCK ] } }   // side paths, open in the right panel
};
```

### CREATURE

```js
{
  name: "Skarrix",
  kind: "young-black-dragon",       // art + media lookup key (art/official/<kind>.webp, MEDIA[kind])
  role: "Tower dragon (black)",     // one line shown under the name
  source: { page: "bestiary", name: "Young Black Dragon", src: "MM" },   // 5e.tools link of the base creature
  homebrew: "HP cut, no legendary resistance. Tuned for a resource-tax fight.",   // optional note
  npc: false,                        // true = no stat block (portrait, link, note, tactics only)

  // stat block (omit all of these when npc: true)
  sizeType: "Large dragon, chaotic evil",
  ac: 18, acNote: "natural armor",
  hp: 84, hpFormula: "13d10 + 13",
  speed: "40 ft., fly 80 ft., swim 40 ft.",
  abilities: { str: 27, dex: 14, con: 13, int: 12, wis: 11, cha: 15 },
  saves: "Dex +5, Con +4",  skills: "Perception +6, Stealth +5",
  vulnerable: "", resist: "", immune: "acid", condImmune: "",
  senses: "blindsight 30 ft., darkvision 120 ft., passive Perception 16",
  languages: "Common, Draconic",
  cr: "6", xp: 2300, pb: 3,
  traits:    [ { name: "Amphibious", text: "…" } ],
  actions:   [ { name: "Bite", text: "Melee Weapon Attack: +11 to hit, …" } ],
  bonus:     [],  reactions: [],
  legendary: { count: 3, intro: "…", actions: [ { name: "Strike", cost: 1, text: "…" } ] },   // optional
  lair:      { initiative: 20, text: "…" },                                                  // optional

  tactics: [ "Ordered, plain-English steps: what it does first, second, when it flees." ],
  description: "Optional. What the DM reads when it appears (shown as a brown read-aloud box in the panel).",
  roleplay: [ "Optional. Appearance: …", "Voice: …", "Wants: …", "Knows: …", "Sample line: \"…\"" ]
}
```

Initiative modifier = DEX mod (the tracker rolls d20 + DEX mod). Legendary `count` gives the tracker its pips.

### SCENE

```js
{
  id: "dragons-attack",
  title: "The Dragons Attack",
  when: "",                          // "" = always happens. Otherwise e.g. "Only if they wrong Arkhan"
  duration: "30 minutes",            // optional. Shown as "Estimated Duration: …" under the title
  banner: "art/official/tower.webp", // optional. Wide chapter banner above the title; missing file is skipped silently
  blocks: [ BLOCK ]
}
```

### BLOCK types

| `t` | Fields | Renders as |
|---|---|---|
| `read` | `text` | **Brown read-aloud box** (book style). Blank line = new paragraph. |
| `p` | `text` | Paragraph |
| `h` | `text` | Sub-heading |
| `steps` | `items: [text]` | Numbered steps, in play order |
| `list` | `items: [text]` | Bullet list |
| `note` | `title`, `text` | DM sidebar box |
| `table` | `caption`, `head: []`, `rows: [[]]` | Rollable table (only for dice tables) |
| `choices` | `prompt`, `items: [{ label, goto: "<scene id>" } or { label, side: "<side id>" }]` | Big decision buttons |
| `encounter` | `id`, `title`, `combatants: [{ c: "<creature id>", n: 1 }]`, `lair: "<creature id>"` (optional), `notes` | Inline initiative tracker |
| `map` | `id` (library map id), `title` (optional), `note` (optional) | Thumbnail card; click opens the map in the right panel (Plain/Grid/DM + open full size). If `id` isn't in the library, renders a muted "Map not available on this device" note — never crashes. |
| `img` | `src`, `caption` (optional), `credit` (optional) | Full-width book-plate illustration (double-rule parchment frame), italic caption below. Lazy-loaded; if the image fails to load, the whole figure hides itself. `tools/gen_event_art.py` generates art for `art/generated/`. |

The first `p` block of a scene gets a decorative drop cap (book style). Every `read`
block automatically gets a "Read or paraphrase the following:" lead-in line above it.
An `h` block whose text starts with `Event:` or `Area` renders as a small-caps
book-style section heading instead of a plain sub-heading.

### Inline tags (in any `text`)

| Tag | Result |
|---|---|
| `{@c id}` / `{@c id\|label}` | Creature link, opens its panel |
| `{@side id\|label}` | Opens a side path in the panel |
| `{@scene id\|label}` | Jumps to a scene |
| `{@spell name}` / `{@spell name\|src}` | 5e.tools spell link (default src PHB) |
| `{@item name\|src}` | 5e.tools item link (default src DMG) |
| `{@dice 2d6}` | Click to roll |
| `{@b text}` / `{@i text}` | Bold / italic |

### MEDIA entry

```js
"young-red-dragon": {
  sounds: [ { label: "Roar", src: "media/sfx/young-red-dragon-roar.mp3", credit: "Pixabay — <author>", license: "Pixabay Content License" } ],
  videos: [ { label: "Fan animation: …", url: "https://www.youtube.com/watch?v=…", credit: "<channel>" } ]
}
```

## Campaign layer

Stage 1. Shared campaign-wide content (ship, NPCs, PC arcs, the annotated map) that works in
every session without being copied per session. Plain `<script>` tags, same rule as everything
else: no modules, no fetch.

```js
// sessions/campaign-*.js. Any number of files, all loaded before the session file.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };
Object.assign(window.CAMPAIGN.creatures, { "<id>": CREATURE });   // same CREATURE shape as above
Object.assign(window.CAMPAIGN.side,      { "<id>": { title, blocks: [BLOCK] } });

// sessions/campaign-map.js
window.CAMPAIGN.map = {
  id: "avernus", title: "Avernus",
  image: "maps/avernus-dm.webp", playerImage: "maps/avernus-player.webp",   // gitignored official art
  stages: [ { id: "ch3", title: "Chapter 3: Avernus", summary: "…" } ],      // progression, in order
  pins: [ PIN ]
};
PIN = {
  id: "arkhans-tower", title: "Arkhan's Tower",
  x: 9.1, y: 14.8,             // % of image width/height. Omit both = off-map (ledger only)
  stage: "ch3", path: "main",  // "main" | "optional"
  status: "open",              // pre-filled default: "done" | "open" | "skipped" | "changed"
  objective: "One line.",
  bloodPrice: "One line: what it costs.",
  blood: 2,                    // 0–3 severity, drawn as drops on the badge
  eventyr: "One line: where Eventyr's progression places this.",
  requires: ["text, may use {@…} tags"], unlocks: ["…"],
  sessions: 1,                 // estimated sessions to finish this objective
  dmChoices: ["What this campaign already changed here."],
  alternatives: ["Other ways this can go."],
  session: "09-arkhans-tower", // optional: opens that session
  blocks: [BLOCK]              // optional extra detail, rendered with the normal block renderer
};
```

- **Merge:** `js/core.js`'s `mergeCampaign(session, campaign)` combines them — session wins on
  key conflicts (`SESSION.creatures = {...CAMPAIGN.creatures, ...SESSION.creatures}`, same for
  `side`). Works when `window.CAMPAIGN` is undefined or a `campaign-*.js` file is missing.
- **Left nav:** a "Campaign" group lists `CAMPAIGN.side` entries in insertion order (titles come
  from the merged session, so a session override wins there too).
- **Map view:** header button or key `M` opens it; `L`/Library and `M`/Map are mutually
  exclusive full-screen modes of the center column, same toggle pattern as the library view.
  Esc closes it. Zoom (buttons + wheel) and drag-to-pan, a Fit button, a DM/Player image toggle.
  Pins are positioned by `x`/`y` as a % of the image, so they stay on their landmarks at every
  zoom level. Clicking a pin (on the map, in the ledger, or from search) opens the existing
  right panel via `DMPanel.open("raw", …)` — the pin detail view is built in `js/campaign-map.js`
  and panel.js never needs to know about pins.
- **Progression ledger:** inside the map view, lists `stages` in order with each stage's pins
  underneath, a status glyph per pin, and a sessions-left counter.
- **DM state:** status (done/open/skipped/changed) + a free-text note per pin, saved to
  `localStorage["dmapp:campaign:<map.id>"] = { "<pinId>": { status, note } }`. Overrides the pin
  defaults (`DMCore.applyPinState`). Export/Import (JSON) and Reset-to-defaults live in the ledger.
- **Sessions left:** `DMCore.countSessionsLeft(pins, state)` — main = sum of `sessions` over
  main-path pins whose effective status is `open` or `changed`; all = the same over every pin.
- **Search:** pins get a "Map" category (distinct from the library's "Maps"); selecting one opens
  the map view focused on that pin.
- **Dev fixture:** `sessions/_campaign-fixture.js` — loaded only with `?fixture=1` in the URL,
  never registered, never loaded by default.

## Library

`dm-app/library/` (gitignored — third-party copyrighted material, never committed) holds
every map and PDF from the Eventyr Complete DM's Bundle, generated by
`tools/build_library.py <source folder>`. Re-run it any time the source bundle changes;
it overwrites `library/` cleanly.

- `library/maps/<id>[-grid|-dm].webp` + `library/maps/thumbs/<id>.webp` — resized map art
- `library/pdf/<chapter-slug>/<file>.pdf` — books, printer-friendly twins skipped
- `library/library.js` → `window.LIBRARY = { maps: [...], docs: [...] }`
- `library/library-text.js` → `window.LIBRARY_TEXT = { "<doc id>": ["page 1 text", ...] }`,
  loaded lazily (only once the DM starts typing in search) so startup stays fast

In the app: the header **Library** button (or key `L`) opens a Maps/Books browser in the
center column. A scene can embed a map inline with the `map` block (see BLOCK types above).
Search includes "Maps" (title/chapter) and "Book pages" (full-text, opens the PDF at
`#page=N`) result groups.
