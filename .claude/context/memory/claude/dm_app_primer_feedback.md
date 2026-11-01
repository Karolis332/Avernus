---
name: dm-app-primer-feedback
description: "How Karolis wants DM-app session primers written — deep DM context with sources, easy to scan, lore collapsed, separate combat screen, group-monster house rule"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 86f4ea79-4f0b-4e0c-b8e6-493c8aafe9b3
  modified: 2026-11-01T11:52:54.739Z
---

Session primers in `dm-app/` must give the DM far more background than the players get: what every referenced thing IS (Lulu's memories, the Fallen Three, the shard, Eldra-type homebrew links), where it comes from (official book page vs Eventyr Games ruling vs homebrew), and why it matters. Keep the running text easy to read; put extra lore in expandable sections. He also wants a separate screen for stat blocks + fight tracking, Religion/knowledge checks that pay out lore, a world view (Emporium route, factions/gangs, villain plans), and per-PC progression beats (e.g. Aurora + Moonkite).

**Why:** Session 11 (played ~2026-10-30): he misread the homebrew Eldra link mid-session because the primer assumed knowledge he didn't have; the table never got it. Said (2026-11-01): "I as a DM need to know a lot more about the thing they are speaking about."

**How to apply:** Every scene gets a short "run it" layer + collapsed lore with source tags. Never introduce a homebrew link without a plain-language DM explanation. Grill for played outcomes first — he improvises (e.g. the Crypt urn fight) and wants improv kept, not replaced. House rule (2026-11-01): a group of identical monsters shares one initiative and makes one collective saving throw. See [[descent-avernus-master-primer]], [[player-materials-feedback]].

**More rules (2026-11-01):** item/loot tables are at least d20 (or d100), never d6/d8. Every room is referenced by its map code (C1, C2g...) in the scene text. Fights should be puzzles built on a hard choice in the setting's own theme (e.g. Hellrider choices), not plain damage races. Campaign side sections are colour-coded to the session's chapters (app.js chapter dots). Clue the players into lore (how would they know?) instead of stating it in read-aloud. "Astra" = Codex model `gpt-6-astra` for image generation. Every page that renders creatures (index, statblocks, crew) must load every campaign-*.js file; `dm-app/tests/creature-audit.js` checks references. The DM also edits sessions from the laptop at the same time: fetch before editing and merge (laptop wins, re-apply on top). See [[dnd-orchestration-lessons]].
