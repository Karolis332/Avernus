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

### 2026-11-07 — Campaign Compass primer (where we are, book vs Eventyr vs ours)
- **Did:** new `dm-app/sessions/00-campaign-compass.js`, first in the session dropdown (the app still opens the last session by default). Seven chapters: Where We Are, The Road Ahead, How the Book Ends, Eventyr's Ending (short credited quotes from the gitignored Library PDFs: Ch5 pp. 1–8, Ch4, Ch1 shard), How Our Campaign Differs, Decisions to Lock, Sources.
- **Why:** the DM asked for one outline of the campaign stage and ending now that the party knows the Scab. Recommended finale: Zariel's redemption run as Eventyr's group check, then Tiamat rises as the final foe (Eventyr suggests exactly this when Arkhan/Tiamat featured heavily). Flagged: the book's Ultimate Sacrifice converges with Drenwal's die-and-be-reborn cure.
- **Open:** the ending is the party's choice, not the DM's (wording fixed); the DM still locks Elturel's days left and who can break the chains (Decisions to Lock chapter). Quotes stay short because the repo is public.

### 2026-11-07 — Session 13 "The Scab" rebuilt by the book + curse explainer
- **Did:** `13-the-scab.js`: book stat blocks and counts (S3 5 bulezau, S4 3 barlgura, S6 3 chasme, S7 4 insect swarms, S11 3 vrock + 6 gnoll, S13 Targ Nar 100 HP + 15 gnolls; Trantolox a nalfeshnee who flees below 60 HP). Our additions are labelled (the gnolls at the mouth are optional; Eventyr's pack-lord swap is only offered). Compass: "Or'Henn's curse: how it works" block; Arkhan link fixed (`arkhan-the-cruel`). `campaign-tower.js`: Vistalancer's hole is in the left wing and Obatala's stump is his right horn, to match the portraits.
- **Why:** the DM asked for the Scab prepared by the book. No published rule makes an unwilling dragon hold still for Arkhan's vessel step, so the Compass leaves that as a DM call.
- **Open:** Crokek'toeck runs on STAND-IN numbers (the 5etools block could not be fetched). The DM still has to rule on true form vs a half-born Tiamat. Per-dragon attack art (36 astra images) is being generated.

### 2026-11-08 — Session 13 "Out of the Crypt" split from S12; Uldrak's Cue + curse scenarios; Scab → S14
- **Did:** `3502842` the curse moves only if the dragon **willingly takes it** (DM ruling). New `dm-app/sessions/13-out-of-the-crypt.js`: S12 recap read-aloud (urns, riddles, trials, loot, Yael/insignia), opens at the foot of the C1 stair. Moved from S12: Wings at the Door, Ways Out, Breakout, Gasp, Zariel Notices, Ending, siege creature overrides, `arkhan-talks`. New scenes `uldraks-cue` (4 cues table) + `tiamats-curse` (scenarios A–F), plus the shared Gambit/Reborn. `13-the-scab.js` renamed to `14-the-scab.js`. Links in S10–S14 + Compass all resolve; render checked headless.
- **Why:** DM: S12 was played to the end of the Crypt; the next game night starts as the party leaves it. S12 keeps only what was played, so it stays a record.
- **Open:** DM to rule: the unfinished blade (proposal), true form vs half-born (proposal: killed before dawn = Tiamat Risen, burned out at dawn = true form), Obatala living or undead. Art: 6 style-test portraits queued for 03:47 (Codex limit) → `dm-app/docs/style-test/sheet.jpg`; the 36 attack images wait for DM approval; 25 old-style attack webps are still uncommitted.

### 2026-11-08 — S13 door: objects of interest, the ward explained, Vermilius intro
- **Did:** `13-out-of-the-crypt.js` Wings at the Door: 8 object boxes (kneeling dead, carved sun, Arkhan's hand/empty vial chain, Slarkas's lance head, Vistalancer's horn+wing, Vermilius's handprint+rings, Flash, Obatala's horn+Krull's shrine), each with a read-aloud line plus seen-before / tied-to / tonight. "The Ward: What It Is" + read-aloud hum; clock rewritten for S13 only (start 2 of 6, +1 per hour waited, per loud act, per evil magic across; visible tick = knight bows). Vermilius's Kindness got a when/who/wants intro. Primer: "What They Carry Out" table (orb, shard, mark, Soul Capacitor, Shield, Sigil, Sun Blade).
- **Why:** the DM said the old clock text made no sense ("what clock") and asked for full context on every object, tied to what the party has seen. S11 sets the Cold Line at the frost edge ~60 ft beyond the doorway, past the kneeling dead, not at the threshold: S13 now matches (Flash moved off the roof to a rock spur outside the line). "Uldrak's coin" was never established, so it is gone: call him by name or through the orb.
- **Open:** DM to rule: Slarkas's rider = Marshal Dunmere (proposal), −1 ward when a cold candle lights (proposal). Midjourney portrait run (12 prompts, `dm-app/docs/style-test/midjourney-prompts.txt`) not started.

### 2026-11-08 — Midjourney dragon art (5 portraits + 38 attacks) + D&D book look
- **Did:** Midjourney via Playwright on the DM's account (DM logged in; one job at a time). Portraits: D&D picks 1D-2/2D-2/3D-2/4D-0/5D-2 → `art/generated/<id>-portrait.webp`. Attacks: 43 jobs (38 + 5 re-rolls at `--sw 40`), one pick each → 38 `art/generated/<id>-<move>.webp` (1024x683); 18 `art` fields added in `campaign-tower.js` (Frightful Presence, Wing Attack, every signature move). Pipeline + picks in `dm-app/docs/style-test/` (`attack_prompts.py`, `picks.py`, `step.sh`, review sheet `attacks-sheet.webp`). New `css/book.css` (PHB look: Solbera fonts CC BY-SA 4.0, Homebrewery frames MIT, two columns ≥980px) linked from index/statblocks/crew.
- **Why:** DM: astra gave every dragon the same face; Vox Machina style read too cartoonish, so D&D style. Each portrait is the `--sref` for its dragon's attacks to keep faces consistent. The sref pulled breath/dive shots back to head shots, hence the re-rolls.
- **Open:** DM to review `attacks-sheet.webp` and name swaps (all 4 candidates per job are in `docs/style-test/mj/`, gitignored jpgs). Remove the `book.css` link to get the old look back. MJ fast hours ≈ 2h left (renews 2026-12-08). Rulings still open from the entries above.

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
- **Open:** record the chase result, ship HP, Gasp save and the Lulu option (a/b/c), Or'Henn's Pull and scales in `campaign-state.md`. One soul coin was destroyed by the Overdrive. Chase rules are a table proposal; the DM may tune DCs.

### 2026-11-08 — The Bleeding Citadel is Zariel's headquarters (DM ruling)
- **Did:** `14-the-scab.js` (summary, primer note "The Citadel Is Zariel's Headquarters", Scab = demons' siege mines, Alazub's line, Zariel's Presence read-aloud from her wall, gates note "Getting the Shard Past Her", ending, Sword light breaks her HQ); `campaign-map.js` (ch4 summary, Citadel pin objective/dmChoices/steps); `campaign-world.js` Playing Zariel (wants the Sword kept broken, HQ, Lulu); S13 `zariel-notices` motive line; Compass (window, Scab, Citadel, doors); `campaign-state.md` Sword thread + dragon summary.
- **Why:** DM: the Citadel is Zariel's current HQ and she does not want the Sword reforged. Picked: the sanctum still refuses her (she guards what she cannot touch); the Scab stays as Blood War siege works; her motive is to stop the reforging (a whole Sword could redeem or destroy her), and to keep Lulu silenced or close.
- **Open:** the 33-day window now applies to the sanctum doors (assumed; DM to confirm). The book's "Zariel flees to her flying fortress" (Compass, Chapter 5) left as is. S12 (played) still says she cannot go in, which stays true of the sanctum.
