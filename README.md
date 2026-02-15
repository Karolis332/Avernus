# Descent into Avernus - DM Session Toolkit

A curated knowledge base for running **Baldur's Gate: Descent into Avernus** with Claude Code as your live session assistant.

**Party:** 3 strong level 11 PCs — Soulknife Rogue (Drenwal), Warlock (Aurora), Cleric (TBD)

## How It Works

1. **Clone this repo** to whatever device you're running sessions from
2. **Open a terminal** in the repo folder and run `claude` (Claude Code CLI)
3. **Ask anything** about your campaign during the session — NPCs, locations, loot, encounters, rules

Claude reads the `CLAUDE.md` file automatically and knows where everything lives. You can ask things like:

- *"The party just arrived at the Bone Brambles. What does Red Ruth want?"*
- *"Roll me a wasteland encounter"*
- *"What's Gargauth's angle with Drenwal right now?"*
- *"The party wants to negotiate with Princeps Kovic. What DC and what does he want?"*
- *"What loot should I drop after this fight?"*
- *"Remind me of Gor'ash's stat block"*

## What's in the Repo

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Instructions for Claude — reads this automatically |
| `campaign-state.md` | Living tracker: what the party knows, active threads, session log |
| `session-primer-next.md` | Pre-written next session prep: opening scene, NPC dialogue, hooks |
| `npc-reference.md` | Every NPC with personality, key dialogue, DCs, mechanics |
| `locations-reference.md` | All locations with travel times, hazards, encounters, loot |
| `encounter-tables.md` | Encounter tables, monster stats, boss stat blocks |
| `loot-and-items.md` | Magic items, evolving items, loot tables, wild magic apples |
| `PC Backstories.md` | Player character backstories and motivations |
| `DM prep .md` | Full DM prep notes (master reference, 9MB) |

## After Every Session — What to Update

This is the most important part. Spend 5-10 minutes after each session updating these files so the next Claude instance has full context.

### 1. `campaign-state.md` — MUST UPDATE

Add a new entry to the **Session Log** section at the bottom:

```markdown
### Session [number] — [date]
- **Location:** Where the party ended up
- **Key events:** What happened (2-5 bullet points)
- **Decisions made:** Which path they chose, who they sided with, deals struck
- **NPCs encountered:** Who they met, impressed, angered, or killed
- **Items gained/lost:** Loot, soul coins spent, items used
- **Combat:** Any fights and outcomes
- **Unresolved hooks:** Cliffhangers, open threads for next time
```

Also update these sections in campaign-state.md:
- **What the Party Knows** — add any new revelations
- **Active Plot Threads** — mark resolved threads, add new ones
- **Party Resources** — update soul coin count, spell slots situation, HP/conditions

### 2. `session-primer-next.md` — REWRITE FOR NEXT SESSION

After updating campaign state, rewrite the session primer:
- Opening scene (where did we leave off?)
- NPC dialogue ready for whoever they'll likely talk to next
- 2-3 possible paths forward based on what happened
- Character-specific hooks (Drenwal/Aurora moments)
- Prepared encounters for the likely direction

You can ask Claude to help draft this based on what happened.

### 3. `npc-reference.md` — UPDATE IF NEEDED

Only update if:
- An NPC's attitude toward the party changed
- An NPC was killed or a new NPC was introduced
- Important new dialogue or deals were established

### 4. `loot-and-items.md` — UPDATE IF NEEDED

Only update if:
- Evolving items leveled up
- New homebrew items were introduced
- Items were consumed or destroyed

## Tips

- **Keep campaign-state.md concise.** It's a reference, not a novel. Bullet points > paragraphs.
- **Session primers are disposable.** Rewrite them completely after each session.
- **Ask Claude to help.** After a session, tell Claude what happened and ask it to update the files for you.
- **The DM prep .md has everything.** If Claude can't find something in the curated files, it can search the full prep notes.

## Raw Source Data

The `Extracted Text/` folder (gitignored) contains text versions of all PDF sourcebooks and supplements. These stay on your local machine and give Claude deep access to rules, monsters, and official content when needed.
