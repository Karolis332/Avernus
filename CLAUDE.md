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

### 2026-11-13 — Sky chase film finished: painted, eleven rounds, 65 s, live in Session 13; fight film intake practice
- **Did:** `dm-app/art/generated/sky-chase-film.mp4` (64.6 s, 1920x1080, sound, 45 MB; poster `.webp`; first cut `aa63b23`, recut the same day without the last 0.8 s of round 1, where Lucan morphed into Veska). New `dm-app/docs/fight-film-intake.md`: how Claude asks the DM about a fight round by round (one free telling, a round ledger, a four-question round card, a read-back as three beats), with the research behind it and the rule to render each beat as its own 3 s clip and cut by hand. The film plays in the S13 scene `sky-chase` (`13-out-of-the-crypt.js`, an `img` block with `video` under the read-aloud). Eleven six-second rounds in the painted look (style B): one `kling4_0` image-to-video clip per round at 1080p (19.5 credits) from a painted key frame (`nano_banana_2_1`, 2 credits). Specs `v5-r1` to `v5-r11` (round 4 is `v4-engine`) in `dm-app/docs/style-test/higgsfield/film-specs.json`, written by `v5_specs.py`; job ids in `film.json`; joined by `join_painted.sh`; source rounds local in `.playwright-mcp/hf/` (gitignored). New `dm-app/docs/animation-profile.md`: every detail the DM gave about the cast, the ship and the fight; read it before any clip. Earlier cuts stay in the docs folder: cel-shaded v2 (`sky-chase-film-v2.mp4`, 48 s), the rejected voice test, `sky-chase-painted-rounds-1-7.mp4`.
- **Why:** the DM's path: photoreal v1 "need more fluidity" → cel-shaded v2 "damn bro the last one slaps" → "lets move away from the AI slop faces" → picked B (painterly) → sent a crop of panel C (dark anime) with "use this artstyle for all" seconds after six painted rounds had started (117 credits, no cancel; Claude had read "show me the video" as a go). A style C film needed about 145 credits more than the balance, so the DM chose to finish the painted one (78 credits). No hero lines: a voice test was "hella cringe", "more horror of the hells being there". Lessons: render a batch only on an explicit yes; paint a key frame per shot, get it approved, then animate; six seconds holds three beats; the background of a reference image leaks into the shot; two look-alike characters in one shot morph into each other. DM after watching: "i just hate the part where ser lucan morphs into veska", "colico jack needs to look like a proper pirate", "can you generate sepparate scenes and cut them together manually to not waste tokens?" (yes: the same price per second, and a retake costs half), and he asked for a researched practice for prompting him round by round.
- **Open:** the DM will have the players say which style they liked most: photoreal v1 (`sky-chase-film-v1.mp4`), cel-shaded v2 (`sky-chase-film-v2.mp4`), painted (the film in the app); dark anime (C) exists only as stills. Higgsfield balance 189.75 credits after a 200 top-up. The DM chose a small test first (13.75 credits): `sky-chase-test-shot-veska-lance.mp4` (one 3 s shot made the new way: key frame painted mid-lunge, one beat, spec `t1-veska` via `test_specs.py`) against the stiffness, and Colico Jack redrawn as a pirate (`paint-jack-pirate.webp`, same helm and chute, so it can start a new round 4). DM on the shot: "the lance thrust is better", so hero beats are made that way from now on. The pirate Jack still waits for his verdict. Not yet cut into the film (hold film recuts until several new shots exist: each pushed version adds 45 MB to the repo history). Proposed next, waiting for a yes: key frames for the stiffest hero beats, then their shots. Known flaws, not retaken: round 8 is trimmed to 4.9 s (Kling drew a burning sailing ship behind Aurora); in round 9 Lucan and Aurora do not get up on screen; in round 11 the scaling scene plays on the deck and the tool forms from the glow of the bow, not from scrap iron. Claude's guesses in the film, for the DM to confirm: *toll the dead* as the killing blow on Flash, the curse as a five-headed shadow, Moonkite fighting with antlers. Claude cannot hear the clips: the DM judges the sound. Style C is still the DM's pick "for all": the storyboard `storyboard-v6-ink.webp` and its start frames exist, a full recut is about 227 credits. The app's ship stat block says two force cannons and Veska's says cropped hair and an Oath-Blade; the DM says one big cannon, a ponytail and a lance (app text unchanged). Next, in the DM's order: Dumal's attacks and transformations (about 180 credits; three form stills wait for an OK), then Thavius Kreeg.

### 2026-11-15 — Session recorder (🎙 Record) + fight log in the tracker; film rework goes round by round; local folder of every video
- **Did:** fight log `713730e`: `dm-app/js/fightlog.js` + `js/tracker.js` write every fight start and end, turn and hit point change with the clock time to localStorage `dmapp:fightlog`. Recorder: header button `🎙 Record` → `dm-app/record.html` + `js/record.js`: one microphone, mono Opus 48 kbps (about 21 MB an hour), a piece saved to IndexedDB every 5 s (a reload or crash keeps everything up to the last piece; it is listed as "interrupted"), marks for fights not run in the tracker (Fight starts / New round / Fight ends / Mark with a note), screen wake lock; two downloads per recording: `session-<date>-<time>.webm` and `.marks.json` (the marks plus the tracker's fight log for that time span). Checked in the browser with a generated tone as the microphone: clean stop, reload mid-recording, both files, decoded length right. Tests `tests/fightlog.test.js`, `tests/record.test.js`. `/recordings/` and `/video-generations/` are gitignored. `C:\Users\kpaul\DnD\video-generations\`: every generated clip in full quality (80 clips, 985 MB, `index.html` gallery; rebuilt by `dm-app/docs/style-test/higgsfield/collect_videos.py`). Film rework: `hero_specs.py` in the same folder (mid-move key frames `kf-h*`, shots `h1` to `h11`); round 1 recut with the new Drenwal shield shot (DM: "good one"); round 3 *healing word* is on its third try (`h3c`; the DM's ruling is in `animation-profile.md`).
- **Why:** DM: "set up a way for me to record the session voice and then use the transcript for the video" (one room, Lithuanian with English terms, the laptop at the table, the tracker used sometimes). Audio and transcripts never go into this public repo, and the chat log is public too: quote fight facts only, never table talk. No speaker labels: one microphone cannot tell five voices apart; the tracker says whose turn it is. DM on the film: "lets iterate by 6s intervals" = one round at a time: render its shot, cut it in, show it, take notes, next.
- **Open:** the recorder has not run on the laptop with a real microphone: the DM tries it before the session of 2026-11-16 and keeps a phone recorder on the table as backup. Transcriber written the same day: `dm-app/tools/transcribe_session.py <audio>` (`faster-whisper` `large-v3`, `language="lt"`, word list `dm-app/tools/table-vocabulary.txt`) → `recordings/<date>/<name>.transcript.md` + `.segments.json` (`--segments` rebuilds the transcript without listening again). Tested (`python dm-app/tests/transcribe_test.py`): the sorting of speech under fight, round and turn. Never run: the listening itself. `faster-whisper` and the GPU libraries (`nvidia-cublas-cu12`, `nvidia-cudnn-cu12`) are not installed; the first run downloads a 3 GB model and needs about 4 GB of the 8 GB card, which was in use (5 GB, 74 %) on 2026-11-15, so the install and the first run wait for the DM's go. After a transcript exists: the round ledger in `dm-app/docs/fights/`. Film: round 3 "Stand!" waits for the DM's verdict; then round 4 with pirate Jack (approved), then rounds 7, 8, 10 and 11 (specs ready, not rendered); no recut of the film is pushed yet. Higgsfield balance 129.5 credits. The approved plan is in `~/.claude/plans/vast-coalescing-storm.md` (this PC only).

### 2026-11-15 — Session 14 primer made ready for the table: numbers to set, DM background with sources, lore checks, maps
- **Did:** `dm-app/sessions/14-the-emporium-and-the-mirror.js`: Adventure Primer gets a Record reminder, *Before Play: Numbers to Set* (12 rows: what Session 13 left unrecorded, the default the primer assumes, where it bites) and *DM Background* (9 collapsed entries with source chips: the Emporium and the truce, Arkhan, Bhaalspawn and the devils' lists, Dumal so far, the Slayer and the Ravager, Mephistopheles and Glasya, the Mirror, the Three Sigils and the rebirth, the Shield and the riders). Knowledge checks that pay out lore in five scenes (arrival, the deal, the Mirror, the auction, the fight). Maps from the library (Eventyr 3a): `frozen-river-15x30` (ice road), `ice-dome-50x50` (the Mirror's shelf; the map has no printed codes, so the primer names M1 the Mirror, M2 the raised centre, M3 the shelf, M4 the ice huts, M5 the pools, M6 the drop), `snowy-avernus-30x30` (Arkhan's moment). `campaign-state.md` Active Session Prep points at it. Checked in the browser (every scene: no missing map, no broken image, no console error) and with `tests/link-audit.js`.
- **Why:** the DM asked for the primer for tomorrow. The session was already built (2026-11-12) but had none of the three things his primer rules ask for: collapsed lore with sources, checks that give the players the lore, and maps with room codes.
- **Open:** the 12 numbers are the DM's to set at the recap; nothing in `campaign-state.md` was changed for them. Book page numbers are not given in the background entries (chapter only): the DM has the book. No map of the Emporium floor is in the library (no fighting there under the truce). The maps and official art are gitignored: on the laptop they show only if the library folder was copied there.

### 2026-11-15 — Emporium market page (🏪 Emporium): clickable map, about 300 priced items in soul coins and gold, finder, ledger
- **Did:** new `dm-app/emporium.html` + `js/emporium.js` (header button `🏪 Emporium`, own window): a painted top-down map with 14 numbered spots (7 stalls, 4 dens, jetty, gate, bell); a click shows Stock on named shelves, Tonight's rack, Services (the old panels as they are), Favours, Buys, Tonight (Session 14 hooks) and Play. Data: `sessions/campaign-emporium-market.js` (the spots, favours, buys, first half of the stock) and `sessions/campaign-emporium-goods.js` (second half, merged in): 304 priced rows, 36 to 50 a stall, one very rare "crown jewel" and one favour-only legendary per stall. Every row has a gold price: `goldPrice` uses the app's own rule of 200 gp to the soul coin; Burney takes gold at par (100 gp) for cures and chair work (`gold: { used: 100 }`); 20 rows are `scOnly` (the crown jewels, Mahadi's two terms, the soul-goods). Tools: "coins to spend" and "gold to spend" (greys what is out of reach and lists everything in reach across the market, services included), search, a buying bar with Pay in coins or gold and the haggle bands, a ledger in both currencies with both purses (localStorage `dmapp:emporium:ledger`, `dmapp:emporium:state`), Copy as text. Map art `art/generated/emporium-map.webp` (Higgsfield `nano_banana_2_1`, 4 credits, prompts in `docs/style-test/higgsfield/emporium-map-prompt-*.txt`); the drawn SVG plan stays as the fallback. Tests: `tests/emporium.test.js` (helpers + an audit of the data: price bands, shelves, panels exist, gold prices). Checked in the browser at 1600 and 1366 px wide: every spot and tab, purchases in both currencies, reload, copy.
- **Why:** DM: "an extra primer for the wandering emporium with a top to bottom map ... where I can click on each shop and see extended stock, features, favors, what can they buy for soul coins", "the players will want a very big shopping session", then "also need to buy things for gold" and "there should be more merchandise". Prices follow one scale (common up to 1 SC, uncommon 2 to 7, rare 8 to 16, very rare 25 to 40, legendary never for coin); used-up things sit below it. The level 14 "+25 %" note in `campaign-emporium.js` is about the old Session 8 prices, not a gold rate, so gold is a flat 200. Stock is written for this party (Aurora's bow, Drenwal's diamonds and spell components, Or'Henn, Moonkite, Veska and Lucan, the ship) and tied to Arkhan's three clauses.
- **Open:** Claude's own additions, marked in the text, for the DM to keep or cut: Krull sold Obatala's shed scales to Rassh; Maelys bought Bloodwrath; the banker's "a contract exists" clue; the bank has about 60 coins to change for gold; 1 ingot = 5 infernal metal; hunt roll modifiers on a few rows; Burney's par rate. Item effects are one-line summaries from memory: the item's own text wins (Helm of Devil Command and Platinum Scarf are the loosest). Six places in the old Session 8 menus show a raw `{@i ...}` tag (a tag nested inside another; the parser in `js/core.js` does not nest): not touched. **Hook bug:** the hooks in `.claude/settings.json` run `cmd /c node ...`; under Git Bash `/c` is rewritten to a path, cmd starts interactive and runs the hook's JSON, so every `>` in an edit or command creates an empty file named after the next word (`0`, `40`, `0))`) in the current folder, and could empty a real file with that name. Fix: `cmd //c`, or call `node` directly. Not changed: it is the DM's config.

### 2026-11-21 — Emporium player screen (📺 Player screen): the shopping night as a game on the table monitor
- **Did:** `dm-app/emporium.html?view=players`, opened with the new `📺 Player screen` button on the 🏪 Emporium page (drag to the monitor, F11, one click for sound). The painted map with 14 pins → each stall as a full-screen painting with slow drift, glow and its own particles and colours, the keeper, a greeting, shelf tabs and cards (name, rarity colour, price in SC and gp, on hand, one player-safe line) → spotlight on one item, SOLD stamp, purse countdown, toasts, coin and reveal chimes (WebAudio), "The night's haul". New files: `sessions/campaign-emporium-players.js` (themes, greetings, `hide`, `say` with about 110 player lines, `music` links), `js/emporium-cast.js` (`DMEmporiumCast`: tested helpers + the DM control strip: follow tick, Map on monitor, Show the haul, music tick and link fields), `js/emporium-players.js`, `css/emporium-players.css`, `tests/emporium-players.test.js` (helpers + an audit that no DC, clause or DM note reaches the monitor). `js/emporium.js` hooks: a pin click moves both windows, `Buy` holds the item up, `Add to ledger` stamps it, `Reveal` / `Hide again` on hidden rows. The windows talk through localStorage (`dmapp:emporium:screen`, `:revealed`, `:cast`, plus the old `:ledger` and `:state`): the same file with `?view=players`, as the combat window does. Art: `art/generated/emporium-forge.webp` (Higgsfield `nano_banana_2_1` 2k, 2 credits; driver `docs/style-test/higgsfield/emporium_shops.py`); a spot with no picture shows a zoomed crop of the map. Session 14's floor scene has the how-to line. Music (`43d35ab` had the fields empty): 15 Borislav Slavov tracks, one per place plus the market's own (Baldur's Gate 3, its Streets and Taverns album, Divinity: Original Sin 2); the ids were read from Spotify's own album embed pages, not typed; picked by title and reputation, since Claude cannot hear them. The DM pastes his own link over any of them in the "Music here" field on his page (saved in the browser). **Later the same night, after the DM tried it:** all 14 spots painted (`art/generated/emporium-(id).webp`, 2560 wide; 13 more for 26 credits, balance 97.5; Ninefingers cropped: the painting came with a white paper edge). **DM ruling: a soul coin costs 350 gp** (`GOLD_RATE` in `js/emporium.js`, the 60 gp figures of the old menus in `campaign-emporium.js`, texts, tests; Burney's chair stays at 100 gp to the coin: Claude's choice, the DM has not ruled). **White dragon scale mail is no longer for coin** (DM: "too overpowered and quite convenient", "could cost a deal", "they could craft the scales harvested from the dragons they killed"): it is a favour-only row behind the anvil with a deal Claude proposed (an oath to bring Rassh a scale cut from Obatala; +2 on the hunt roll while it is worn), and "Dragon-Scale Warplate, cut from your own kills" (6 SC plus a batch of scales, red or blue, about 6 hours) is a fixed row on the open shelf. Spotify: the page itself now goes to the `spotify:` link, because a hidden frame may open an app link only once in ten seconds in Firefox (Claude's reading of "it only opened one track"; a track does start by itself).
- **Why:** DM: "like a video game"; "an html that I share on the other screen ... they pick where to click and it opens up an image of either the forge or any other shops with the list of good that are available without special checks"; "the shop info that we have is shown on my part of the screen"; "each shop has its own theme, it can slightly move"; a Spotify link per location (Borislav Slavov); "I want this session to feel memorable". One shared monitor: no phones, no server. Hidden until `Reveal`: the favour-only rows and five rows learned by a clue or a check. Music is a `spotify:` link opened in the desktop app: no API, no login.
- **Open:** checked in the browser at 1920x1080 with both windows over http (follow both ways, spotlight, SOLD, purse, reveal, haul, Escape, all 14 spots) and one load from disk in headless Firefox. Not checked: the two windows from disk on the laptop with the real monitor (same mechanism as the combat window), and whether Spotify starts a track by itself or needs one press of play: the DM tries the ▶ button once. The other 13 pictures (26 credits, balance 123.5) wait for the DM's yes to the Forge look: their scenes are written in `emporium_shops.py` (nothing in them shows a keeper's secret: Burney is a woman at a chair, Mahadi a man in a silk coat, no dragon over the bell), and `python emporium_shops.py <spot ids>` paints and installs them. A code edit made through a shell heredoc turned the regex `\b` into a backspace byte: write scripts with the Write tool. **The DM's wishes of 2026-11-21, not built yet:** "the styling for the forge visual is amazing"; a playlist for each place, not one track; "a full unique visual that is semi animated and maybe even changes based on the sections for every shop"; "feel like a game like slay the spire but with more animations that are slight"; art for every item on click; visuals of Mahadi and "all the npcs that can be found in the emporium"; on his side "some dialogue starter which done well can unlock more of the shop, like a little riddle". Known flaw: the goods list covers the keeper in the Rapture, the Bank, the Larva Farm and partly the Barber (the keeper stands right of centre in those paintings).
