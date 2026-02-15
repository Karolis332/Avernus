# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a **D&D 5e campaign knowledge base** for running *Baldur's Gate: Descent into Avernus*. The DM uses Claude Code during sessions as a quick-reference assistant. When the DM asks a question, search the curated files below first, then fall back to `Extracted Text/` for raw sourcebook data.

## How to Help During Sessions

The DM will ask questions like:
- "What does Red Ruth say when they arrive?"  → Check `npc-reference.md`
- "What's at the Tower of Urm?" → Check `locations-reference.md`
- "Roll on the travel encounter table" → Check `encounter-tables.md`
- "What loot should I give?" → Check `loot-and-items.md`
- "What happened last session?" → Check `campaign-state.md`
- "What's the stat block for a narzugon?" → Check `encounter-tables.md`, then `Extracted Text/Chapter 3...Stat Blocks.txt`

For deep dives into specific sourcebook content (spell descriptions, monster abilities, magic item details), search `Extracted Text/*.txt`.

## Curated Reference Files (Start Here)

| File | Contents |
|------|----------|
| `campaign-state.md` | Current party status, what they know, active plot threads, session log |
| `npc-reference.md` | Every NPC with personality, dialogue, DCs, and mechanics |
| `locations-reference.md` | All sandbox locations with travel times, hazards, encounters, loot |
| `encounter-tables.md` | Random tables, warlord profiles, monster quick stats, combat templates |
| `loot-and-items.md` | Magic items, evolving items, loot tables, currency, homebrew items |
| `session-primer-next.md` | Detailed prep for the upcoming session |

## Campaign Overview

**Party:** 3 players, level 11. Currently at Fort Knucklebone, post-Dream Sequence.

**Sandbox Structure:**
Fort Knucklebone → Intermediaries (Mordenkainen / Red Ruth / Mephistopheles) → Blood Pay (Arkhan / Uldrak / Ubbalux / Shummrath) → Fallen Three (Olanthius / Bel / Haruman) → Arches of Ulloch → Bleeding Citadel

**Player Characters:**
- **Drenwal** — Hellrider, child of Bhaal. Gargauth tempts him via the Shield. Brother Dumal (Bhaalspawn) is hunting him in Avernus. Amulet connection severed.
- **Aurora** — Linked to the Moonkite (imprisoned celestial-fey). Wand of Celestial Warding pulses near Moonkite essence. Drawn deeper into Avernus.
- *(Third PC backstory not yet documented)*

## Raw Source Data

`Extracted Text/` contains text dumps of all PDFs (48 files, ~4000 pages). Key files:
- `DM Prep Notes.md` — 9MB master prep document (sandbox rewrites, all NPC dialogue, stat blocks, character arcs)
- `Campaign Summary - ChatGPT Project.txt` / `Chat Summary - ChatGPT Project.txt` — Planning summaries
- Eventyr chapter resources (DM cheatsheets, encounter advice, stat blocks per chapter)
- Core rulebooks: PHB 2024, DMG 2024, Monster Manuals, Tome of Beasts, Vault of Magic, Griffon's Saddlebag

## Session Workflow

After each session, the DM updates `campaign-state.md` with:
- Session summary (what happened)
- Consequences (who was helped/angered/bargained with)
- Faction agenda updates
- Evolving item progress
- Bhaal/Gargauth influence scores
