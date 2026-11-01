# Claude Code Configuration - RuFlo V3

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

### 2026-10-11 — DM app: tracker upgrades, Monument battle map, S9 text audit
- **Did:**
  - Tracker: creature names are clickable and open the stat block; rows re-sort when an init is edited.
  - Creature `init` field, which gives dragons their initiative bonus.
  - Spell-slot circles via `Core.parseSpellcasting()`.
  - Wider side panel, smaller left nav.
  - Map block accepts `src`.
  - Generated Monument battle map at `dm-app/maps/monument-battlemap.webp`, gitignored and deploy-only. `gen_event_art.py` gained `--ref`, `--max-width` and `--quality`.
  - S9 flavour-text audit (Krull rides Obatala, not the ship deck). Monk dead; Gith teacher replaced by the Gith's journal.
- **Why:** the paid CartographyAssets "Arkhan's Tower" pack (€4) is the tower INTERIOR, 10 floors, not the Monument. Only its style was matched. Art derived from a paid map stays out of the public repo. Image generation cost about $0.75 for 3 calls, against $0.50 approved.
- **Open:**
  - The map's tent sits beside the maw, not inside it.
  - Audit applied 60 fixes in S9. Not yet fixed:
    - optional D1–D4: Moonkite-arc links, Torogar "huge", gate skull colours;
    - stale facts outside S9: campaign-state.md (level 11, Asimov, Session 5), primer Or'Henn level 11 and Aurora as Warlock, campaign-arcs L306/L438 (Devil's Ride is at the Monument).
    - Trigger: next prep session.
  - Buy the €4 pack if the party ever enters the tower.

### 2026-10-23 — Reinstall restore + Session 10 "The Styx Run" built in the DM app
- **Did:**
  - Restored `DnD/` from GitHub after the Windows reinstall. Gitignored art, maps, PDFs and sfx were pulled back from the VPS (the pre-reinstall backup is gone; the VPS + this PC are the only copies).
  - The laptop's `da7a8a3`..`fa7fa3d` recorded Session 9 as played: party level 13, vial stolen, Word of Recall escape.
  - Session 10 is now a full session in the Session 9 format: primer, recap, Styx run, Sibriex, Uldrak's Grave, The Call, Wings Over the Grave, Ending, plus the orb, Krull's offer and curse-jump side panels.
  - The tower dragons, Krull and Arkhan moved into the new `sessions/campaign-tower.js`. Sessions override only `tactics`.
- **Why:**
  - DM rulings: Word of Recall went to the St. Cuthbert statue on the Lady Vengeance; nobody was left behind; Colico Jack pilots; Aurora is an Archfey Warlock; the Sibriex is not met yet.
  - The party's plan is to free Uldrak, then call Arkhan's dragons with his Orb of Dragonkind (SRD rules). The fight runs in waves so it stays survivable, and Vermilius baits the Or'Henn curse.
- **Open:**
  - DM's choices still open: one vial or two curses; the Solar's Helmet under the sword; whether Krull survived Session 9.
  - No art yet for Uldrak or the Styx (generating it costs money; ask first).
  - Krull's stat block links to the Session 9-only `raise-the-dead` panel; in Session 10 that link does nothing.

### 2026-10-23 — Or'Henn × Tiamat visions arc
- **Did:**
  - New campaign side `arc-tiamat` in `dm-app/sessions/campaign-arcs.js`: the five heads, each with one gift; gold scales 1–5 with escalating costs; a d8 Small Visions table; the orb-cage loophole.
  - New Session 10 scene `the-dragon-queens-garden`: Tiamat meets Or'Henn in the restored Ashen Garden and offers Her Law right before the dragon call.
  - Curse wording fixed everywhere to the DM's version: a dragon taking it wakes Tiamat in her true form.
- **Why:** DM rulings. There was no fight at the Monument (Word of Recall at once; Krull alive). Uldrak is restored and gave the party the orb. One vial, one curse. Or'Henn sees Tiamat's visions. Tiamat never lies to him; the danger is that every gift is true.
- **Open:**
  - Does Uldrak stay for the dragon fight? The encounter assumes yes.
  - The orb-cage loophole is a DM's choice; don't hint at it until Small Vision 2 comes up.

### 2026-10-23 — Session 11 "Roads from the Grave" built in the DM app
- **Did:** New `dm-app/sessions/11-roads-from-the-grave.js` (Session 9 format): shared opening, full Crypt / Menagerie / Dock branches, Ending outcomes, sides `kreegs-bargains` + `far-roads`. New stat blocks: Olanthius, Urexiel (with lair), mezzoloth handler, Kreeg (amnizu), barbed devil. Uldrak moved into `campaign-tower.js`; Session 10 now overrides only his tactics.
- **Why:** DM asked for every nearby scenario; chose full builds for the three close sites, hooks only for the far ones, password unknown (so five ways through the Crypt door). Kreeg follows the played Session 8 canon (amnizu at the Dock), not the older Vessper Hain plan.
- **Open:** Who broke the Sword is unruled. Eldra-was-bought-by-Kreeg is a proposed link. Kreeg's numbers are the MTF amnizu reconstructed, so check them against the book. There's no Menagerie or Dock battle map; stand-ins are used.

### 2026-10-23 — S11 follow-up: one-shard Sword, Kreeg CR 22, outline maps
- **Did:** Sword ruling changed to Eventyr's one-shard version across S11, `campaign-map.js` and `campaign-state.md`. Kreeg rebuilt to CR 22 (342 HP, AC 22, legendary + Dock lair actions, Escape Clause). New original SVG outline maps in `dm-app/art/outlines/` (menagerie, vault, dock) from `dm-app/tools/gen_outlines.py`. Reused painted maps: harbor-map-night, low-lantern, under-the-villa.
- **Why:** checked against the book: the official adventure never breaks the Sword. The DM picked Eventyr's option: one shard cracked off in Zariel's last battle, and Olanthius keeps it. That puts Kostchtchie's Maw and the Pit of Shummrath back to optional. The DM wanted Kreeg in Arkhan's tier.
- **Open:** The Menagerie still has no painted map, only the outline.

### 2026-10-23 — S10 travel fix + stat-block page (desktop PC)
- **Did:** `2041958` Session 10 journey rewritten as "The Flight to the Grave": table ruling, everyone flew overland on flight scrolls with the Lady Vengeance alongside, not up the Styx. River events and the Lulu-stays-dry choice cut; Sibriex stays optional as a gorge fly-by; the Grave's river rules are unchanged. New `dm-app/statblocks.html?s=<id>`: every creature in a session on one printable page, encounter order first, sharing spell-slot state with the main app.
- **Why:** the DM wanted the primer and the stat blocks side by side at the table. NPCs that have full numbers (the sibriex) show stats on that page.
- **Open:** VPS not redeployed: SSH host key for the VPS changed after the reinstall; verify the fingerprint before trusting it. Session 11's opening and the Dock road still assume the old route only loosely; recheck after Session 10 is played.

### 2026-10-23 — Live Session 10 rulings + Session 11 re-pointed at the Crypt (desktop PC)
- **Did:** Uldrak gave the orb as payment for the vial and left for Bel's Forge (Gnashing Hunger, Yeenoghu's flail reforged; Cania's Verdict ruled out as too strong). Feonor brought Cinderbloom in person; geas fulfilled. New shared `dm-app/sessions/campaign-endgame.js`: Arkhan's Gambit + Tiamat Reborn scenes, Tiamat Risen (homebrew CR 24), sides Tiamat's Pull / Dominion / Uldrak's Errand / Krull's Offer / If the Curse Jumps, Arkhan's endgame tactics, Fight Sequence phases. Arkhan CR 25, Krull CR 17. `campaign-crew.js`: Veska, Ser Lucan (Knight chassis), Lulu (Hollyphant), Feonor (Mage) with `strategy` for player sheets. Session 11 now opens with the party flying for the Crypt: Uldrak away, Feonor free, staff out of Urexiel's vault, Pull carried over and paused inside the Cold Line, Arkhan's hunt can land on any road. Fight screen `statblocks.html` (sequence | stat blocks | initiative) and `crew.html` player sheets; PDFs for Veska and Lucan in `~/dnd/handouts/` (outside the repo: art).
- **Why:** table rulings during play. Tiamat cannot command dragons in any published block, so Dread Majesty (DC 20 Wis, kneel or choose) makes the three-way split a choice per dragon.
- **Open:** VPS not redeployed (host key changed after the reinstall; verify fingerprint). Known dead links from Session 9: `what-arkhan-knows`, `raise-the-dead`. Lulu's Session 11 creature is the old npc block (no stats); the crew sheet for her reads from the campaign block only in Session 10.

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
- **Merge (same day):** this checkout was 21 commits behind origin (the laptop's 2026-10-23 S11 rewrite: Crypt areas C1–C7, Drenwal's truth about Halvard as the key to Olanthius, `campaign-endgame.js`, `campaign-crew.js`, `statblocks.html`, `crew.html`). Merged origin/main in; the laptop's S11 and map rulings win, this PC's changes re-applied on top: Olanthius/Kreeg/Urexiel/mezzoloth ported to the campaign files with the laptop's numbers (S11 keeps tactics overrides), Eldra dropped everywhere per the 11-01 ruling, S12 Archive sentence aligned to the Halvard key. The "Yael's name as Crypt key" wording from slice 4 was discarded. Browser pass on the merged `statblock.js` not done (MCP servers down).
- **Open:** slice 8 art is blocked until the DM runs `codex login` (401; `dm-app/tools/png_to_webp.py` untracked + untested). Saddlebag OCR missing everywhere (DM will supply; placeholders stay). DM to confirm: Day 12 count, Dumal clock 4/6, Lulu taken at the end of S12, the primer's 39 Eldra mentions, S13 map-level split (S1–5/S6–10/S11–14), and whether Arkhan crossed the Cold Line (laptop S11) or waited outside (grill; S12 assumes outside). Agents killed python and node processes (MCP servers down: `/mcp` to reconnect). Always `git pull` before planning on this PC. No deploy.
