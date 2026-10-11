---
name: Player materials feedback
description: What Karolis wants in printable D&D player handouts and booklets
type: feedback
originSessionId: 00b6dc82-24db-4cdc-803b-0a1f287b229d
---
Karolis judges printable game artifacts by table-usability, not aesthetics-only:

1. **Strip AI metadata from player-facing files.** Midjourney prompts, AI generation instructions, and "how this was built" text do not belong in a player's booklet. They are working notes — remove before publishing.
   **Why:** A player at the table holds the booklet to look up rules, not to read prompts. Prompts in the booklet broke immersion.
   **How to apply:** Before delivering any character/encounter handout, scan for and remove `<pre>` blocks containing MJ prompts, "imagine" commands, or AI-build notes.

2. **One-page character sheet is non-negotiable.** "As in all DnD games" — the sheet must fit a single A4 page even if content is dense. Multi-page sheets are a failure.
   **Why:** Standard D&D table workflow assumes one sheet in front of the player. Pages 2-3 get lost.
   **How to apply:** When designing or fixing sheets, use compact 3-4 column print layouts with 8-9pt fonts and shrunk padding. Verify the rendered sheet is exactly 1 PDF page.

3. **Use all the space, make items bigger when there's room.** Empty whitespace at the bottom of a sheet is wasted real estate — fill it with bigger stat boxes, more weapon rows, a rage tracker, an exhaustion ladder, or a notes block.
   **Why:** A printed sheet has fixed real estate; small text in the top half + empty bottom half is worse than balanced bigger content.
   **How to apply:** After laying out a sheet, render and inspect — if any column ends >15% short of the page bottom, enlarge fonts or add a useful tracker.

4. **Each booklet section gets its own A4 page** in print mode, no spillovers.
   **Why:** Half-content pages (where a section bleeds onto the next physical page with just a trailing paragraph) look broken when handed to a player.
   **How to apply:** Enforce `width:210mm; height:297mm; overflow:hidden` on `.page` divs in `@media print`. Verify rendered PDF page count equals logical-section count.

5. **For barbarian/martial PCs, include explicit dice formulas and turn flow.** "What to roll, in what order" tables beat lore-heavy descriptions for a player learning the class.
   **Why:** Confirmed when Karolis asked for "easy to read barbarian combat tactics, what to roll etc" alongside the booklet — he wants table-time decision aids, not just flavor.
   **How to apply:** Include a "Step 1 / 2 / 3" combat flow page and a separate dice cheat sheet (d20 formula, advantage/disadvantage, crit rules, weapon damage lookup, DC scale).

6. **Communication style: Absolute Mode.** No emojis, no filler, no soft asks. Blunt directive phrasing, terminate after delivering material. (From global CLAUDE.md, but reinforced here for this project.)
