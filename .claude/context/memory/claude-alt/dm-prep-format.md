---
name: dm-prep-format
description: "How the DM wants session prep delivered — book-order, plain English, interactive DM app, not dense primers"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 18e09db2-7ead-4d77-89e3-f44a316262f1
  modified: 2026-10-11T06:29:43.827Z
---

Session prep must read like an official D&D adventure book: every step in play order, plain simple English, short sentences, read-aloud text in brown boxes. No dense paragraphs, tables of "codes", file paths, or jargon walls.

As of 2026-10-11 the target format is an interactive DM app (`dm-app/`, one data file per session): 3 columns (scenes / scene / click-open side panel), side paths open in the panel, clicking a creature shows art + stat block + tactics, initiative tracker where the DM types party initiative and monsters auto-roll, strong search, 5e.tools links, official art first (generated second), monster sounds + fan videos. Hosted on the VPS so it opens from the laptop.

The explicit model is the official **"Baldur's Gate: The Fall of Elturel"** PDF (text in `Extracted Text/`): Adventure Primer first (Background / Overview with durations / Hooks), chapters with banner + "Estimated Duration", "Event: …" sections, DM prose in third-person present, "Read or paraphrase the following:" before boxed text, bold creature names, checks woven into prose, purpose sidebars. Full visceral read-aloud narration for travel too (e.g. crossing the Styx, stench of Avernus). Official book text the DM pastes = canonical base.

**Why:** the first Arkhan primer (dense, tables, DM-jargon) was unusable at the table — the user said "I don't understand the primer", "too many codes", "in the DnD books all the steps are written in order".

**How to apply:** for any future session prep, write a new `dm-app/sessions/<id>.js` per `dm-app/SESSION-FORMAT.md` instead of a markdown primer. Keep text simple; put detail behind clicks. Campaign-wide content (ship, arcs, the annotated Avernus map with objectives / blood prices / Eventyr stages / sessions-left) lives in `dm-app/sessions/campaign-*.js` and is shared by every session.

Visual taste (2026-10-11): "like an old map or adventure book", "no animations", "slick". Enemies must actually threaten the party (L12 ×3 + allies + the Lady Vengeance's force cannons); the DM wants consequences telegraphed in-fiction and then enforced ("if they fuck around they find out — it happens").

Mission (2026-10-11): build "the best possible D&D primer tool". Stage 1 (campaign layer + map) shipped; Stage 2 = a generator that drafts session files from book text + DM notes + campaign state, needs its own grill/PRD. See [[dm-app-hosting]].
