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

### 2026-11-01 — Session 11 played (Crypt road) → S12/S13 plan grilled + approved
- **Did:** recorded what was played. Olanthius gave the party the shard and the Scab's location; Feonor delivered Cinderbloom. Drenwal's *knock* on the warded door carried 50 miles and drew Arkhan, the 4 tower dragons, Obatala and Krull, who wait outside because nothing evil can enter. The session stopped mid-fight: 5–8 ghosts plus wraiths from soul urns (improvised). The party holds the orb; Or'Henn has 0 scales; Lulu is not present; the Lady Vengeance is hidden in the mists. Plan approved: `~/.claude/plans/hidden-cooking-tome.md` (slices 0–9).
- **Why:** the DM wants to reconnect the table to the story. Each scene gets a short "run it" layer, with lore in expandable sections tagged with sources. Rulings: the Eldra link is DROPPED. House rule: a group of identical monsters shares one initiative and makes one collective save. The Arkhan siege is a puzzle with ways out, not a fight to win. Drenwal gains the Generals' Memories and Bhaal's Last Gasps (the Hellriders trained Bhaalspawn as weapons). Zariel starts to appear; recommended that she takes Lulu at the end of S12.
- **Open:** execute the slices in fresh sessions. Video only via paid fal/Kling, which needs a cap from the DM (the Sora API ended 2026-09-24). Images come from Codex `image_generation` on the ChatGPT plan.

### 2026-11-01 — Plan slice 0 done: endgame research; Saddlebag OCR is missing
- **Did:** `dm-app/docs/research/endgame-research.md` (scratch; slice 5 folds it into the `running-the-endgame` + `zariel` sides, then deletes it): 19 sources (15 fetched URLs + 4 local Eventyr Ch4/Ch5 entries) and 15 table takeaways. Progress is ticked in `~/.claude/plans/hidden-cooking-tome.md`.
- **Why:** the VPS was searched read-only and holds only the live dm-app site. There is no `Extracted Text/`, no DnD backup and no Griffon's Saddlebag file there or anywhere on this PC, so the Saddlebag shortlist was skipped rather than invented. Reddit is unreachable from the agent fetch tool (403), so no subreddit threads are cited.
- **Open:** the DM must supply the Saddlebag + DiA OCR (laptop or other backup) before slice 0c and the fixed top-tier loot (Locked decision 10) can be built; slices 6–7 use placeholders until then. Next: slice 1 (new blocks + statblock fields).

### 2026-11-01 — Plan slices 1–7 + 9 shipped: S12 "Siege of the Crypt", S13 "The Scab", app upgrades
- **Did:** one sonnet agent per slice, orchestrator reviewed + committed: `fb8f2cd` blocks `more`/`checks`/`env` + statblock `castLines`/attack `art`; `9125be9` group initiative + collective saves (house rule); `4f184a0` combat pop-out (`?view=combat`, key C, storage sync); `4ae4172` `campaign-hellriders.js` (Olanthius, Veska, Ser Lucan, ghost/wraith, side `arc-drenwal`), Moonkite beats, Eldra dropped; `49c3f60` `campaign-world.js` (sides `world-state` key W, `zariel`, `running-the-endgame`, `{@url}` tag, kreeg/urexiel/mezzoloth moved out of S11); `3ff19a4` S12; `c4bca14` S13 (+ side `the-sword-reforged`); this commit: `campaign-state.md` brought to the post-S11 state.
- **Why:** DM rulings from the grill. Trantolox is a nalfeshnee (source), not a barbed devil. Dragon ids stay skarrix/vhennic/mirelle/praxamor with display names Slarkas/Vistalancer/Vermilius/Flash. The "Session 9 in the dropdown" report was browser cache, not a bug.
- **Merge (same day):** this checkout was 21 commits behind origin (the laptop's 2026-10-23 S11 rewrite: Crypt areas C1–C7, Drenwal's truth about Halvard as the key to Olanthius, `campaign-endgame.js`, `campaign-crew.js`, `statblocks.html`, `crew.html`). Merged origin/main in; the laptop's S11 and map rulings win, this PC's changes re-applied on top: Olanthius/Kreeg/Urexiel/mezzoloth ported to the campaign files with the laptop's numbers (S11 keeps tactics overrides), Eldra dropped everywhere per the 11-01 ruling, S12 Archive sentence aligned to the Halvard key. The "Yael's name as Crypt key" wording from slice 4 was discarded. Merged tree verified in headless Chromium (`statblocks.html` S11, S12 combat view, S12 primer render; MCP Playwright was down, so cached `ms-playwright` chrome.exe was driven directly).
- **Later rulings (same day):** Arkhan was arriving as the party went in and they shut the door; he never came inside (S12 recap + Wings at the Door fixed; laptop S11's stair fight was prep only). Eldra is flavour only: the laptop's flavour lines are restored in S10/S11/arcs/map; the name was invented in prep, not by the DM; the primer's Hellrider version is shelved, not deleted.
- **Open:** slice 8 art: done, see the next entry. Saddlebag OCR missing everywhere (DM will supply; placeholders stay). DM to confirm: Day 12 count, Dumal clock 4/6, Lulu taken at the end of S12, S13 map-level split (S1–5/S6–10/S11–14). Agents killed python and node processes (MCP servers down: `/mcp` to reconnect). Always `git pull` before planning on this PC. No deploy.

### 2026-11-01 — S12 merged with the laptop: urn hard choices, room key, Arkhan's hostage plan, monster primer fix
- **Did:** `c000ce8`, merges `070aecf` + `336f73d`, then the art commit. S12: map 3.3 room key (C1–C7, party in C2g), DM Context chapter, a Hellrider hard choice on each laptop urn wave (wounded/line, burning gate, truth/comfort), every loot table d20, Arkhan wants the party dead + Or'Henn hostage + Drenwal Geas'd into Planar Ally for a gold dragon (vial spent on Uldrak). `statblocks.html`/`crew.html` load campaign-hellriders/world (Hellrider creatures and Cania's Envoy were missing); S13 portrait sources; chapter colour bars + campaign dots (`js/app.js`); `dm-app/tests/creature-audit.js`. Scene art for 10 empty chapters via Codex `gpt-6-astra` (= the DM's "astra").
- **Why:** the laptop pushed 13 S12 commits during this work (three waves, Marshal Dunmere, Urn Hoard, Riders' Bequest); its file won and this PC's changes were re-applied on top. My fallen-rider/herald creatures were dropped as redundant; the laptop's Wings image kept; laptop d6/d8 entries kept as the first rows of the d20 tables.
- **Open:** check on the map that the left/middle/right trial doorways are C2f/C2e/C2a, and east vs west C6. Gold dragon via Planar Ally is a DM ruling. Saddlebag OCR still missing. Day 12, Dumal 4/6, Lulu taken: unconfirmed. Laptop: `git pull` before editing S12.

### 2026-11-01 — Same-context rule (chat log hook) + individual dragon portraits
- **Did:** `e0cdc33` Stop hook `.claude/hooks/chat-log.mjs` pushes each session's DM prompts + Claude replies (redacted) to `.claude/logs/` on main via git plumbing; rule at the top of this file. Five astra portraits `dm-app/art/generated/{skarrix,vhennic,mirelle,praxamor,obatala}-portrait.webp`, wired with a new per-creature `portrait` field (`js/statblock.js`, falls back to the kind's art).
- **Why:** the DM works from the PC and the laptop at once and wants identical context. Logs live outside `.claude/context/` because `/sync-context` wipes that folder. The DM wants each dragon to be an individual (look, scars, personality).
- **Open:** written dragon character profiles not yet in `campaign-tower.js` (a safety filter stopped that step; ask the DM how to proceed). Obatala's broken horn did not render. Next: a single group image mixing all five, once the DM has looked at the portraits.

### 2026-11-01 — Live S12 (desktop PC): Tiamat waking, urn waves, ally upgrades, loot, Yael ruling, XP house rule
- **Did:**
  - `b688014` Tiamat Risen wakes over five rounds (250 to 550 HP, one head a round, AC 19 until fully born, killable only by radiant or Gnashing Hunger until then). The party's chance is the coalition: Krull, Obatala, Vistalancer (the timid blue, no save), the Lady Vengeance on a green flare, and Uldrak from round 3.
  - `773e964` S12 Urn Hall as three urns in three waves. Wave 1 carries the S11 Restless Dead tracker; then Hellrider Lance Wraiths (CR 10); then the miniboss Marshal Aubrec Dunmere, the Last Banner (CR 15), with a banner aura and a Stand Down mercy route. Five scenes illustrated with `gpt-image-2.5-sunburst`. `statblocks.html` and `crew.html` load campaign-hellriders/world.
  - `a37a3f2` post-Crypt allies: `veska-banner-captain` and `ser-lucan-named` (both CR 10). Handout PDFs are in `~/dnd/handouts/Session12-Crew-*.pdf`, outside the repo.
  - Loot:
    - Trial tables raised a tier.
    - Urn Hoard: Sun Blade, Horn of the First Charge, Dragon Slayer.
    - Rolled grave goods per urn (the laptop later made these d20).
    - Riders' Bequest, a static item per PC: Amulet of the Devout +2, Rod of the Pact Keeper +2, Moon Sickle +2.
    - Bonuses for a strong run.
  - Trials:
    - Left/middle/right doorways.
    - Roll of the Charge run guide with the nine names.
    - Scales tilt rules.
    - Generals' Seats as a rank ordering by sun rays (Zariel 4, Haruman 3, Olanthius 2, Yael 1; Olanthius's filed helm is the trap).
  - `159ab2f` `index.html?s=<id>#<scene>` deep-links to a scene.
- **Why (table rulings):**
  - The Scales shade was **Yael**. She watched the devil gate during the invasion and left her post to save a child. The breach lost the invasion, and **Zariel, still an angel, executed her**.
  - The party split, then chose the insignia (Zariel's verdict).
  - The **Bleeding Citadel rose where Yael died**. Her ghost and Lulu carried the Sword there after the fall. The doors open only for the pure of heart, so Zariel knows the place and cannot enter.
  - **XP house rule:** level 15 is 260,000, then +60,000 per level (20 is 560,000), because the party earns a lot per session. The urn fight is worth 50,600 XP.
- **Open:**
  - Whether Conjure Celestial is the 2014 or 2024 version (affects the ruling note).
  - Loot for the C6 Ones Who Ran fight.
  - Check on the map that the doorways are C2f/C2e/C2a.
  - The VPS has still not been redeployed (its host key changed).

### 2026-11-07 — Five dragons made individuals (lore + Vox Machina bar)
- **Did:** `campaign-tower.js`: Slarkas, Vistalancer, Vermilius, Flash and Obatala each got a lore-based look (Monster Manual traits per colour), a scar matching the astra portrait, an allegiance, wants/fears, a table tell, sample lines and a homebrew signature move (Old Wound + Slow Melt; Lance Dive + Clean Exit; Honeyed Voice; Prove It + Overheat; Rimeground + Rider's Wing). S12 overrides give each its own siege role and a way to lure, turn or bait it.
- **Why:** the DM wants five distinct dragons, like Vox Machina's Chroma Conclave, not one block in five colours. Vermilius is **she** (S9 was played that way); S12's "he" is fixed. Vistalancer is vain *and* timid (endgame canon), reconciled as a careful show-off. Vermilius's throat handprint = Arkhan's Hand of Vecna, the mark of the vessel.
- **Open:** DM to approve the signature moves and hooks (Slarkas's lance rider buried in the Crypt; Flash's true name Praxamor). The group image with all five is still to come.

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
