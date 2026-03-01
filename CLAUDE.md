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

**Party:** 3 players, level 11 (strong party). Currently at Fort Knucklebone, post-Dream Sequence.

**Sandbox Structure:**
Fort Knucklebone → Intermediaries (Mordenkainen / Red Ruth / Mephistopheles) → Blood Pay (Arkhan / Uldrak / Ubbalux / Shummrath) → Fallen Three (Olanthius / Bel / Haruman) → Arches of Ulloch → Bleeding Citadel

**Player Characters:**
- **Drenwal** — Light Cleric. Hellrider, child of Bhaal. Gargauth tempts him via the Shield. Brother Dumal (Bhaalspawn) hunting him. Amulet connection severed. Primary healer/support/frontline. Light domain features (Warding Flare, Radiance of the Dawn, Corona of Light), Spirit Guardians, Spiritual Weapon, Divine Intervention (hijacked by Bhaal). Cure: must die and be reborn in the eyes of another god.
- **Aurora** — Archfey Warlock. Linked to the Moonkite (imprisoned celestial-fey patron). Wand of Celestial Warding (evolving item) pulses near Moonkite essence. Eldritch Blast + invocations for consistent ranged damage. Fey Presence, Misty Escape, Beguiling Defenses. Limited spell slots but powerful when used.
- **Asimov** — Soulknife Rogue. Interdimensional bounty hunter. Genie companion Rasheem (fence/guildmaster). Soul Capacitor (evolving item). Psychic Blades + Sneak Attack = high single-target burst. Psychic Whispers for telepathic coordination.

**Companions:**
- **Lulu** — Hollyphant. Zariel's former companion. Recovered fragmented memories via Mad Maggie's Dream Sequence. Emotional, loyal, tied to the main quest.
- **Whiskerbright** — Aurora's familiar, currently in imp form (Avernus adaptation).

**Transport:** The **Lady Vengeance** — Gondian-Portyr Hellship. AC 17, 350 HP, 2 Arcane Cannons, Aether Harpoon, Soul Coin Overdrive. See `loot-and-items.md` for full stats.

**Party Strengths:** High burst damage (Soulknife Asimov), sustained ranged damage (Archfey Warlock Aurora), healing/support/AoE (Light Cleric Drenwal). Good at stealth (Rogue expertise), social encounters (Warlock Cha + Fey Presence), and sustain (Cleric healing). Radiance of the Dawn is strong AoE but Dumal's Radiance Defiler converts it to necrotic. Weak to action economy pressure — only 3 PCs, so encounters need minions to threaten them.

**Encounter Design Notes:** This is a strong, synergistic party. Scale encounters UP from standard 3-player guidelines. See `encounter-tables.md` for detailed scaling philosophy.

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
