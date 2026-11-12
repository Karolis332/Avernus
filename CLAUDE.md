# Claude Code Configuration - RuFlo V3

## Same Context on Every Device (repo rule, set 2026-11-01)

The DM works from this PC and a laptop at the same time. Both must see exactly what was said and done.

- **Chat is logged automatically.** The Stop hook `.claude/hooks/chat-log.mjs` pushes every session's DM prompts and Claude replies to `.claude/logs/<date>-<session>.md` on `main` after each turn. Tool output and thinking are left out. Secrets, IP addresses and emails are redacted, but the repo is public: never paste credentials into chat.
- **Start of every session:** `git pull`, then read the newest `.claude/logs/` files from the other device and the Session Log below.
- **Push every finished unit at once.** A session file, a ruling, art or a fix is committed and pushed as soon as it is done, with its Session Log entry. Nothing stays local-only, except gitignored official art (VPS copy).
- **Pull before every commit.** The hook commits straight to `origin/main` without touching the working tree, so this checkout is always a few log commits behind.
- Check the hook with `node .claude/hooks/chat-log.mjs --test`. Push failures land in `%TEMP%/chat-log-errors.txt`.

## Behavioral Rules (Always Enforced)

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested
- NEVER save working files, text/mds, or tests to the root folder
- Never continuously check status after spawning a swarm — wait for results
- ALWAYS read a file before editing it
- NEVER commit secrets, credentials, or .env files

## File Organization

- NEVER save to root folder — use the directories below
- Use `/src` for source code files
- Use `/tests` for test files
- Use `/docs` for documentation and markdown files
- Use `/config` for configuration files
- Use `/scripts` for utility scripts
- Use `/examples` for example code

## Project Architecture

- Follow Domain-Driven Design with bounded contexts
- Keep files under 500 lines
- Use typed interfaces for all public APIs
- Prefer TDD London School (mock-first) for new code
- Use event sourcing for state changes
- Ensure input validation at system boundaries

### Project Config

- **Topology**: hierarchical-mesh
- **Max Agents**: 15
- **Memory**: hybrid
- **HNSW**: Enabled
- **Neural**: Enabled

## Build & Test

```bash
# Build
npm run build

# Test
npm test

# Lint
npm run lint
```

- ALWAYS run tests after making code changes
- ALWAYS verify build succeeds before committing

## Security Rules

- NEVER hardcode API keys, secrets, or credentials in source files
- NEVER commit .env files or any file containing secrets
- Always validate user input at system boundaries
- Always sanitize file paths to prevent directory traversal
- Run `npx @claude-flow/cli@latest security scan` after security-related changes

## Concurrency: 1 MESSAGE = ALL RELATED OPERATIONS

- All operations MUST be concurrent/parallel in a single message
- Use Claude Code's Task tool for spawning agents, not just MCP
- ALWAYS batch ALL todos in ONE TodoWrite call (5-10+ minimum)
- ALWAYS spawn ALL agents in ONE message with full instructions via Task tool
- ALWAYS batch ALL file reads/writes/edits in ONE message
- ALWAYS batch ALL Bash commands in ONE message

## Swarm Orchestration

- MUST initialize the swarm using CLI tools when starting complex tasks
- MUST spawn concurrent agents using Claude Code's Task tool
- Never use CLI tools alone for execution — Task tool agents do the actual work
- MUST call CLI tools AND Task tool in ONE message for complex work

### 3-Tier Model Routing (ADR-026)

| Tier | Handler | Latency | Cost | Use Cases |
|------|---------|---------|------|-----------|
| **1** | Agent Booster (WASM) | <1ms | $0 | Simple transforms (var→const, add types) — Skip LLM |
| **2** | Haiku | ~500ms | $0.0002 | Simple tasks, low complexity (<30%) |
| **3** | Sonnet/Opus | 2-5s | $0.003-0.015 | Complex reasoning, architecture, security (>30%) |

- Always check for `[AGENT_BOOSTER_AVAILABLE]` or `[TASK_MODEL_RECOMMENDATION]` before spawning agents
- Use Edit tool directly when `[AGENT_BOOSTER_AVAILABLE]`

## Swarm Configuration & Anti-Drift

- ALWAYS use hierarchical topology for coding swarms
- Keep maxAgents at 6-8 for tight coordination
- Use specialized strategy for clear role boundaries
- Use `raft` consensus for hive-mind (leader maintains authoritative state)
- Run frequent checkpoints via `post-task` hooks
- Keep shared memory namespace for all agents

```bash
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 8 --strategy specialized
```

## Swarm Execution Rules

- ALWAYS use `run_in_background: true` for all agent Task calls
- ALWAYS put ALL agent Task calls in ONE message for parallel execution
- After spawning, STOP — do NOT add more tool calls or check status
- Never poll TaskOutput or check swarm status — trust agents to return
- When agent results arrive, review ALL results before proceeding

## V3 CLI Commands

### Core Commands

| Command | Subcommands | Description |
|---------|-------------|-------------|
| `init` | 4 | Project initialization |
| `agent` | 8 | Agent lifecycle management |
| `swarm` | 6 | Multi-agent swarm coordination |
| `memory` | 11 | AgentDB memory with HNSW search |
| `task` | 6 | Task creation and lifecycle |
| `session` | 7 | Session state management |
| `hooks` | 17 | Self-learning hooks + 12 workers |
| `hive-mind` | 6 | Byzantine fault-tolerant consensus |

### Quick CLI Examples

```bash
npx @claude-flow/cli@latest init --wizard
npx @claude-flow/cli@latest agent spawn -t coder --name my-coder
npx @claude-flow/cli@latest swarm init --v3-mode
npx @claude-flow/cli@latest memory search --query "authentication patterns"
npx @claude-flow/cli@latest doctor --fix
```

## Available Agents (60+ Types)

### Core Development
`coder`, `reviewer`, `tester`, `planner`, `researcher`

### Specialized
`security-architect`, `security-auditor`, `memory-specialist`, `performance-engineer`

### Swarm Coordination
`hierarchical-coordinator`, `mesh-coordinator`, `adaptive-coordinator`

### GitHub & Repository
`pr-manager`, `code-review-swarm`, `issue-tracker`, `release-manager`

### SPARC Methodology
`sparc-coord`, `sparc-coder`, `specification`, `pseudocode`, `architecture`

## Memory Commands Reference

```bash
# Store (REQUIRED: --key, --value; OPTIONAL: --namespace, --ttl, --tags)
npx @claude-flow/cli@latest memory store --key "pattern-auth" --value "JWT with refresh" --namespace patterns

# Search (REQUIRED: --query; OPTIONAL: --namespace, --limit, --threshold)
npx @claude-flow/cli@latest memory search --query "authentication patterns"

# List (OPTIONAL: --namespace, --limit)
npx @claude-flow/cli@latest memory list --namespace patterns --limit 10

# Retrieve (REQUIRED: --key; OPTIONAL: --namespace)
npx @claude-flow/cli@latest memory retrieve --key "pattern-auth" --namespace patterns
```

## Quick Setup

```bash
claude mcp add claude-flow -- npx -y @claude-flow/cli@latest
npx @claude-flow/cli@latest daemon start
npx @claude-flow/cli@latest doctor --fix
```

## Claude Code vs CLI Tools

- Claude Code's Task tool handles ALL execution: agents, file ops, code generation, git
- CLI tools handle coordination via Bash: swarm init, memory, hooks, routing
- NEVER use CLI tools as a substitute for Task tool agents

## Support

- Documentation: https://github.com/ruvnet/claude-flow
- Issues: https://github.com/ruvnet/claude-flow/issues

Portable agent context: `.claude/context/` (memory from both Claude homes + last checkpoint; synced by `/sync-context`, restore with `--restore`).

## Session Log

Rolling context so a fresh session — or a different model, account or tool — starts where the
last one stopped. Append one entry per completed unit of work (shipped code, a decision, an
artifact, a resolved incident); commit it with the work it describes.

```
### YYYY-MM-DD — <topic>
- **Did:** what shipped, with commit SHAs / file paths / IDs
- **Why:** the decision and the reason, especially where the obvious choice was rejected
- **Open:** what is unfinished, expiring, or deferred — with the trigger
```

Newest last, **last 10 entries only** — this file loads into context every session, so an
unbounded log would eat the smart zone it exists to protect. Promote anything still valuable
past that into the body above, or into `brain/`. No secrets or customer PII: this is committed.

### 2026-11-08 — S13 exit R: Word of Recall to the Lady Vengeance vs Arkhan's powers
- **Did:** `13-out-of-the-crypt.js` The Ways Out: new exit **R** (run-it note, rule, who fits, Arkhan's counters, his hunt, hunt-roll table, skipped scenes); exit list + Combining Exits updated.
- **Why:** the party plans to recall to St. Cuthbert's statue on the ship (Drenwal's sanctuary since S9). Arkhan/Krull have no counterspell, dispel or scrying, so cast out of sight it just works. In sight, Vecna's Grip (silenced; the spell is verbal only) or slow is his answer, telegraphed. Teleport cannot follow a drifting ship, so he hunts instead.
- **Open:** DM to confirm the hunt roll (proposal), "Tiamat leans toward a loud mark" (proposal), and whether the staff's brass plate is still on. Drenwal + 5 = exactly the party, Veska, Lucan and Moonkite.

### 2026-11-08 — Dragon art files use campaign names; v2 Vermilius + Flash for the DM to choose
- **Did:** art files renamed to the names the table uses: `skarrix-*`→`slarkas-*`, `vhennic-*`→`vistalancer-*`, `mirelle-*`→`vermilius-*`, `praxamor-*`→`flash-*` (34 files, paths in `campaign-tower.js`). Creature ids stay `skarrix/vhennic/mirelle/praxamor` (internal keys used by links in S9–S14). v2 Midjourney set (adult, menacing) for Vermilius + Flash: 17 `art/generated/<name>-*-v2.webp`, compared in `dm-app/docs/style-test/v1-vs-v2-sheet.webp`.
- **Why:** DM: the two looked like kid dragons (the v1 prompts literally asked for round cheeks and big eyes); Slarkas and Vistalancer are fine. DM asked why the files had names nobody uses at the table.
- **Open:** DM picks v1 or v2 on the laptop. To make v2 live: `python dm-app/docs/style-test/use_v2.py vermilius flash` (one or both names; v1 kept as `-v1.webp`), then commit. Renaming the internal ids too is possible but touches every session file; not done.

### 2026-11-08 — v2 art live for Vermilius + Flash; look text matched; Scab pinned on the map
- **Did:** ran `use_v2.py vermilius flash`: the 17 adult v2 webps are the live `art/generated/<name>-*.webp`; v1 kept as `-v1.webp`. Look text rewritten to match: Vermilius (`campaign-tower.js` description + silhouette, S13 "crest raised") is deep forest green with a spined crest, no ivory/violet frill; Flash (`campaign-tower.js`, S13 read-aloud) has a full crown of new, unchipped horns. Character unchanged (Flash still the youngest, unscarred, Prove It intact). `campaign-map.js`: `bleeding-citadel` pin at x 40.3 / y 7.8, the dark castle in the northern range between the 2nd and 3rd pillars.
- **Why:** DM picked v2 for both. The book leaves the Scab/Citadel off the poster map (Olanthius or Bel reveals it); the DM placed it there.
- **Also:** S14 road read-aloud + shard feel changed from "west" to "north" (from the Crypt the new spot is north, a little east).
- **Open:** rulings from the entries above.

### 2026-11-08 — Live S13: Word of Recall → Sky Chase (scene + chase.html tracker + spells vs the ship); combat-view ally fix
- **Did:** `13-out-of-the-crypt.js` new scene `sky-chase` with encounter `sky-chase` (Flash + Vistalancer): band chase (Lost/Far/Near/Close, DC 15 helm, 2 rounds Far = escape, 2 rounds Close = caught), Haste-on-the-Core ruling, Wingover note. New `dm-app/chase.html` (header button ⛵ Chase): live tracker (gap, helm roller with bonuses, ship HP with fire resistance + threshold 15 + mishap table, dragon HP marks, breath recharge, Leg. Res., Overdrive/Haste/Blink/Overclock timers, log; localStorage `dmapp:chase:13-sky-chase`) and a filterable table of all 144 cleric/druid/warlock spells of levels 1–3 with their ship/chase use. `js/combat.js` `3577c71`: ally stat blocks load on click or on the ally's turn.
- **Why:** at the table the party cast Word of Recall to the Lady Vengeance, the ship ran full throttle from the dragons, and the soul coin (Overdrive) was spent. Rulings made live: Haste and Blink can be cast into the Core (3rd level, DC 15 Arcana guide check, Core flare on a fail); misty step through the Core DC 13; general rule DC 11/13/15 by spell level.
- **Also:** new `dm-app/curse.html` (header button 🐉 Curse): Or'Henn's curse tracker built on the `tiamats-pull` + `arc-tiamat` panels: Pull 0–10 meter with tier effects, Pull save roller (DC 10 + Pull, nat 1 = Small Vision, nat 20 = −1, Cinderbloom reroll), raise/lower buttons, first-sight checklist, gold scales 0–5 with their effects, the six gifts, Small Visions d8, Cold Line pause, curse-jumped state; localStorage `dmapp:curse:orhenn`. DM asked that the curse progress as he fights dragons: **fight progression (proposal)** added to the tracker and to `campaign-endgame.js` Tiamat's Pull: +1 per failed Pull save in a fight, +1 the first time in a fight he damages each chromatic dragon.
- **Level 14:** DM says the party is level 14. Updated S13/S14/Compass party notes, S14 XP section (next level 15 at 260,000), Divine Intervention 14%, `campaign-state.md`. Tower dragon notes said "scaled for L12": checked for 3×L14 (hard 11,400 / deadly 17,100 XP), each dragon is still hard-to-deadly, so stats unchanged. Sessions 9–12 left as played. Not rescaled: Tiamat Risen (CR 24, built for L13) and Olanthius (CR 20); review before the finale.
- **Styx trip:** the party sails from Uldrak's Grave up the Styx to the Wandering Emporium, now anchored near the Mirror of Mephistar (DM). New S13 scene `up-the-styx` (3 days at 60 ft., d8 daily events, Styx forgetting, clocks for the heads/blood/Pull/Arkhan) with a **Soul Burn** rule (proposal) for burning coins for speed: DM set 1 coin = 1 hour at double speed (120 ft., saves 1 hour of a ~36-hour trip). Coins in an unbroken chain get harder: coin n → Core Con save DC 10+2n (fail: 44 force, engines dead 1d4 h), feeder Wis DC 10+2n (n×1d6 psychic), everyone aboard from coin 3 Wis DC 8+2n (1 exhaustion). The chain breaks after an hour with no coin. Plus the Soul Burn track (1–2 / 3–4 / 5–6 / 7+ coins per long rest). `campaign-map.js`: Emporium pin at x 72.3 / y 17.9 (the jetty on the Styx below the Mirror).
- **Stygian Dock:** S13 scene `passing-the-stygian-dock` rebuilt on the book (p. 123–124, the DM pasted it) and upscaled for L14: Bazelsteen (horned devil mechanic, ~CR 14), Test Run 221 (bathysphere), Demon Raid (6 max-HP vrocks + Glabrezu Ravager ~CR 12 cutting the chain), Zariel's flying fortress moored and refuelling (DM: it is there) with 3 Fortress Bone Devils (~CR 12) and a fortress lance. Kreeg keeps the fuel ledger and moves during the raid: Kreeg override with Ledger Unbound (phase 2 at 171 HP) + 2 Chain Wardens (~CR 10, moor the ship). Encounters `dock-demon-raid`, `dock-kreeg`, `dock-fortress-guard`; maps: harbor night (dock), River Styx (barge), Styx Watchtower (Kreeg's tower). DM: Bazelsteen and Kreeg both run and defend the Dock (joint masters; `dock-kreeg` is now Kreeg + Bazelsteen + 2 Chain Wardens + 6 barbed devils, for if the party turns on the Dock). Official art (amnizu, horned/chain/bone/barbed devil, glabrezu, vrock, narzugon) downloaded from 5e.tools into the gitignored `dm-app/art/official/` on this PC only: copy it to the laptop/VPS by hand. Strong rewards (proposal): Bazelsteen's upgrade, Kreeg's Ledger (restores memories, incl. Lulu's), High Overseer's Ring, contract copy, 40 soul coins + 15 metal.
- **Kreeg hunts, then Zariel (DM):** S13 `kreegs-trap-at-the-emporium` is now Kreeg's interception at the Throat (a gorge half a day before the Emporium, so Mahadi's truce never applies): night memory theft, river chain, the Ledger's Due barge, parley, boarding (encounter `kreegs-gangplank`). If he fails: `zariels-lesson` (Zariel CR 26 from the book, added to `campaign-world.js`; three rounds, three lessons, Zariel's Mark). Emporium shop guide converted to side panels in `campaign-emporium.js` (`emporium-shops` + one per shop).
- **Open:** record the chase result, ship HP, Gasp save and the Lulu option (a/b/c), Or'Henn's Pull and scales in `campaign-state.md`. One soul coin was destroyed by the Overdrive. Chase rules are a table proposal; the DM may tune DCs.

### 2026-11-08 — Zariel watches from her Basalt Citadel; the Bleeding Citadel stays hers to fear, not hold (DM ruling, revised the same night)
- **Did:** revised `3e051a6` (first version made the Bleeding Citadel her HQ; DM changed it). Now: `14-the-scab.js` (summary, primer note "Where Zariel Is, and What She Wants", Scab = Blood War front, her presence from a basalt wall far off, gates note "Getting the Shard Past Her" with the herald's Lulu-for-shard offer, ending, Sword drawn → she knows, her flying fortress launches = the clock); `campaign-map.js` new pin `zariels-basalt-citadel` (x 28.6 / y 7.4, the black needle spire, stage ch5) + Citadel pin dmChoice + ch4 summary; `campaign-world.js` Playing Zariel (Sword kept broken, Lulu, where she is); S13 writ motive line; Compass (Scab front, Citadel, flying fortress moored at the Basalt Citadel); `campaign-state.md` Sword thread ruling + dragon summary.
- **Why:** DM: Zariel's stronghold is her Basalt Citadel [D&D CANON, DMG Avernus: corpse-hung basalt citadel], placed on the needle spire west of the Scab, half a day's flight, with her 450-ft. flying fortress [D&D CANON, BGDIA] moored there. The Bleeding Citadel is back to the book (Yael's resting place, doors refuse her; 33-day window unchanged). Kept: her motive (stop the reforging; Lulu silenced or close) and that she watches the Citadel because she cannot enter.
- **Open:** where Lulu is held if taken (Basalt Citadel suggested on the pin, DM's call). S12 (played) unchanged.

### 2026-11-12 — Session 14 "The Emporium and the Mirror" built; the Scab is now Session 15; S13 results recorded
- **Did:** `campaign-state.md` S13 results (Flash and Vistalancer dead, Kreeg beaten at the Throat, ended near the Emporium). New `dm-app/sessions/14-the-emporium-and-the-mirror.js`: 10 scenes (arrival, the floor, Arkhan's three-clause deal with Mahadi as a puzzle with 6 clues and counters, the bell + hunt roll for the surviving dragons, the Mirror, the auction, the third sigil, the fight with a sequencing table, ending) + the shared Gambit/Reborn scenes. Creatures: Mahadi, Rigorath, Mirror escort, Dumal as Champion with the Slayer (CR 18, 200 HP, ten rounds) and the Ravager (CR 21, 250 HP) forms, Maelys the Thorn-Crowned (CR 15, Glasya's), erinyes herald, hunt overrides for Arkhan/Krull/Obatala/Slarkas/Vermilius. Sides: What the Mirror Knows, Dumal's Three Forms, the Sigil of Mastery (Severed Blood vs Ascendant, the Senna catch, the rebirth out). New `campaign-emporium-games.js`: rollable stock per stall + d20 rare finds + price swing, four dens with real-dice games and Volatile tables (Soul Pit, Devil's Teeth, Ninefingers' Memory Faro, the Hourglass), the information market (true and bent answers), d12 rumours. `14-the-scab.js` → `15-the-scab.js`; index/Compass/world/map/arcs/tower (two dragons DEAD)/endgame updated. New `tests/link-audit.js`; `what-arkhan-knows` + `raise-the-dead` moved from S9 into `campaign-tower.js` so Arkhan's links resolve everywhere.
- **Why:** DM rulings 2026-11-12: Arkhan waits and makes a deal with Mahadi beforehand (a puzzle); Dumal appears out of the Mirror as its Champion, having pledged his Bhaalspawn power to Mephistopheles for the Slayer form "or the deadlier one"; Maelys (the blade sibling) also appears with a devil of her own, Glasya's: "each devil wants a Bhaalspawn in their list, a pleasure and a rarity"; the final seal for Drenwal to prepare him for battle. Den stakes: soul coins, memories, years. Maelys stays "she" (the early prep); the DM may flip it.
- **Open:** S15: buff Crokek'toeck "strong as hell" + a Yeenoghu reappearance (DM asked; next unit, seeded in the Mirror's Scab answer). Lulu's restoration: at the Sword in the Bleeding Citadel (S16), so she must be fetched from the Basalt Citadel first if taken. Still unrecorded from S13: Kreeg's fate and loot, Pull and scales, ship HP, the Gasp, the Lulu option. DM numbers: the bell hour, Elturel's days, Dumal's clock.

### 2026-11-12 — Crokek'toeck buffed to a CR 20 mythic; Yeenoghu's Shadow rides it (S15)
- **Did:** `15-the-scab.js`: `crokek-toeck` rebuilt (CR 20, 330 HP, Legendary Resistance, swallow, tail, Scab-Quake, lair actions, Jaws of the Hungry God: chews a chain Zariel forged in 1d4+1 rounds) + new `crokek-toeck-ridden` (CR 22, 200 fresh HP, Yeenoghu's flail, Aura of the Gnoll God, Spawn of Slaughter, Call the Pack). S10 scene rewritten: two phases, three ways to tear the Shadow out (the ship's century ward within 300 ft, Moonkite's dispel evil and good, 60 radiant in a round), run-and-hunted rules, the Jaws payoff table (Bhaalspawn blood trail, Chains of Cania, the statue's head, Targ Nar's horn), outcomes, XP. Compass decision ruled. Render-checked headless (index + statblocks, S14 and S15): no console errors.
- **Why:** DM (2026-11-12): "Crokek'toeck buffed and strong as hell, maybe some sort of Yeenoghu reappearance." The S7 century ward bars the banished manifestation, not a god reaching into his own hound, so the reappearance is a puzzle (tear it out) rather than a rematch.
- **Open:** the Lady Vengeance has to be at the Scab's mouth for the ward option: say so in the S15 primer when the DM confirms where the ship parks. Art: both phases reuse the gnoll-hound art.

### 2026-11-12 — First spell clip: Dumal's Hellfire of Cania (procedural video, to iterate)
- **Did:** `dm-app/tools/spellclip_hellfire.py` (numpy + Pillow draw each frame, ffmpeg encodes; no source art) → `dm-app/art/generated/dumal-hellfire-of-cania.mp4` (6 s, 1280x720, 1.7 MB) + poster `.webp`, attached to the action in `campaign-arcs.js` through the existing `art`/`video` fields (shows in S14's Dumal block).
- **Why:** the DM asked for video snapshots of Dumal's spells made by the model itself, then "do one for us to iterate". Claude has no video output, so the clip is drawn by code. `--sheet 0.9,1.35,2.6` gives a contact sheet in ~3 s; the full render takes ~4 min.
- **Open:** DM to judge the look. The silhouette figure is the weak part: a painted Dumal still as the base layer, or Midjourney image-to-video, are the upgrades. Not yet done: Bhaal-Marked Strike, Bhaal's Hand, Black Smoke, Bhaal's Whisper; Slayer's Slaughter Leap and Scream; Ravager's Hellfire Breath, Chains of Cania, Wing of Frost.

### 2026-11-12 — Higgsfield cinematic clips (1080p): Obatala's eight moves, Dumal's Hellfire, the Mirror of Mephistar, the Lady Vengeance
- **Did:** eleven photoreal clips live in `dm-app/art/generated/` (1928x1072, 5 s, with sound, 36 MB in all; stills 1920x1072 `.webp` under the same names): `obatala-{cold-breath,rimeground,bite,claw,tail,frightful-presence,riders-wing,wing-attack}`, `dumal-hellfire-of-cania`, `env-mirror-of-mephistar`, `lady-vengeance`. `campaign-tower.js`: `video` on Obatala's Rimeground, Bite, Claw, Tail, Frightful Presence, Rider's Wing and both legendary actions (Cold Breath had it). App code from `7ac5b3f` the same day: `js/render.js` an `img` block with `video` plays the clip with the still as poster; `js/statblock.js` a creature with `video` plays it from its portrait. Recipe: `cinematic_studio_2_5` still at 4k 16:9 (4 credits) with a 2048-px dragon reference + the painted face job, a `nano_banana_2_1` 4k edit where the sky came out grey or the look painted (3 credits), `kling4_0` image-to-video 5 s 1080p (16.25 credits), then `ffmpeg -nostdin` x264 crf 22 faststart. Drivers, prompts and job ids are saved in `dm-app/docs/style-test/higgsfield/` (`cine_stills.py`, `edits.py`, `clips.py` and their json; any result can be fetched again with `generate get <job id>`); the 4k sources and the review pages (`gallery-cinematic.html`, `gallery-round2.html`) stay local in `.playwright-mcp/hf/` (gitignored). Face reference: `dm-app/docs/style-test/obatala-face-reference.webp`. Round 2 the same day: the Mirror still and clip redone with four ice devils and the bone devil large in frame; Frightful Presence re-animated with more body motion and the camera held close; two force cannon clips, `lady-vengeance-force-cannon` (on the Force Cannon action) and `lady-vengeance-gunners-view` (on Stations) in `campaign-ship.js`. Stills get fixed with `.playwright-mcp/hf/edits.py` (`nano_banana_2_1` 4k, 3 credits); `ffmpeg` needs `-nostdin` inside a `while read` loop.
- **Why:** DM (2026-11-12): Obatala is "she", "she is in the hells", "her scales are melting due to the heat"; "more grandiose it is an ancient dragon"; "the dragons face needs to be the same"; the first 720p painted clips "look a lot low quality", "i need details", "like proper cinematics"; the DM picked the photoreal sample, without "the soldiers in the background" (no extras in any shot); the generated sounds are good. Measured cause of the soft look: 720p on wide shots plus loose painted stills, not the app re-encode. Two batches (135 credits) were rendering when corrections arrived and the CLI has no cancel: after a change of look show one sample and wait. Never `--wait` on `generate create` (charged twice, no job id); `generate list` never shows Kling jobs; Plus runs 6 Kling jobs at once; a 5.5K job id fails as a reference (downscale it). Round 2 (DM): the Mirror's devils "look completely like stick figures" (a wide shot made them tiny: move the camera in); "maybe more motion in the dragon" but "it does feel heavy and powerful, I like that".
- **Open:** Dumal (DM): "all of Dumal's forms", the base form "clearly indicative that he is a bhaalspawn", then "all of Dumal's attacks and transformations animated but after the cinematic movie of the fight". Stills of the three forms wait for the DM's OK in `dm-app/docs/style-test/higgsfield/` (`dumal-champion.webp`, `dumal-slayer.webp`, `dumal-ravager.webp`); not animated, not in the app. Fight film: see the 2026-11-13 entry. Only Frightful Presence has the extra motion; the other seven dragon clips are unchanged. Cast board (DM asked): a player-facing window on a second monitor and a DM board of buttons with previews, click to cast a visual to it; not started. App text still says "he" for Obatala and melting icicles, not scales (DM to paste the book passage). Two early `--wait` charges (32.5 credits): look in the Higgsfield web library or claim them. Browsers cache art and js: hard refresh once (Ctrl+F5).

### 2026-11-13 — Sky chase film: animated v2 cut, the DM's notes for v3, animation profile
- **Did:** v2 of the fight film is 2D animated: `dm-app/docs/style-test/higgsfield/sky-chase-film-v2.mp4` (48 s, eight six-second rounds, `5f1fb39`; full-quality copy local in `.playwright-mcp/hf/`). Recipe: redraw each reference with a `nano_banana_2_1` 2k edit (2 credits; `toon-*.webp`, prompts in `edit-specs.json`), then one `kling4_0` `reference-to-video` clip per round (19.5 credits at 1080p; specs `v2-r1` to `v2-r8` in `film-specs.json`, driver `film.py`, job ids in `film.json`). New `dm-app/docs/animation-profile.md`: every detail the DM gave about the cast, the ship and the fight. Drawn for v3: corrected ship (crow's nest, one cannon, no statue on deck), Moonkite, Veska, Jeremy, an automaton gunner. Voice test round `sky-chase-v3-test-engine-room.mp4` (spec `v3-engine`: the lines are written in quotes in the Kling prompt).
- **Why:** DM on v1 (photoreal, three hard cuts a round): "need more fluidity", "more combat from the characters", "replicate the flow of vox machina and animation stylization". On v2: "damn bro the last one slaps", "we are going on a very good direction", "we can make the cinematic longer", then a long list of what it must also show (in the profile, under Fights). "these small details matter a lot and lets keep tracking a profile of them", "cuz then we can animate thavius kreeg". Kling invented a ship with white sails in a wide shot: exteriors start from the ship still (image-to-video, 3 s, 9.75 credits).
- **Open:** v3 plan is 14 rounds (84 s): keep v2 rounds 1, 2, 5, 6, 7, 8, render seven more new rounds plus three short inserts, about 235 credits with retakes and voices. Balance 98: the DM was told about 140 more are needed, and about 180 for Dumal after. The DM has not judged the voice test or the new drawings. Claude cannot hear the clips: the DM judges every voice. The app's ship stat block says two force cannons, the DM says one big cannon (`campaign-ship.js` unchanged, DM to decide). Film not in the app yet (planned home: an `img` block with `video` in the S13 scene `sky-chase`). Order after the film: Dumal's attacks and transformations, then Thavius Kreeg.
