---
name: DnD project layout
description: Map of campaign files under C:\Users\kpaul\DnD\ — what's where
type: reference
originSessionId: 00b6dc82-24db-4cdc-803b-0a1f287b229d
---
Campaign root: `C:\Users\kpaul\DnD\`

Key files:
- `DM prep .md` + `Extracted Text/DM Prep Notes.md` — large master prep doc (4.5k lines, ~9MB) with NPCs, encounters, lore tables
- `sessions/YYYY-MM-DD.md` — per-session recaps
- `characters/` — PC booklets and statblocks (HTML for styled, MD for plain)
- `campaign-state.md` — current campaign threads
- `npc-reference.md` / `locations-reference.md` / `loot-and-items.md` — quick lookups
- `bitter-breath-*.md` + `bloodbath-statblock.md` + `tempo-statblock.md` — custom boss statblocks
- `encounter-tables.md` / `encounter-appendix.md` — encounter math + smog mechanics
- `session-*-primer.html/md` — pre-session handouts
- `palace-of-gore-session.html` — Palace of Gore session
- `Extracted Text/*.txt` — OCR'd 5e source books (PHB, DMG, Avernus chapters, MM expansions, Tome of Beasts, Vault of Magic, Griffon's Saddlebag, Eventyr Games)
- `bloodreina-bundle/` — built printable PDF bundle (regenerable from `characters/bloodreina.html`)

`brain/` vault at `C:\Users\kpaul\brain\` is unrelated (SaaS product memory, not D&D).

**How to apply:** When user asks "find X" or "what about Y", check the small reference files first (`npc-reference.md`, `campaign-state.md`, `encounter-tables.md`) before grepping the giant DM prep file. For 5e rules lookups, the `Extracted Text/*.txt` files have full book OCR.
