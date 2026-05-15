# Wolves of Welton — Session-Day Quick-Start

**Adventure:** Winghorn Press, *The Wolves of Welton* (2nd–3rd lvl 5E oneshot)
**Repo:** https://github.com/Karolis332/Avernus
**Last updated:** 2026-05-15

---

## 30 SECONDS BEFORE PLAYERS ARRIVE

1. **Open the interactive HTML** in a browser tab (full-screen on second monitor if possible):
   ```
   C:\Users\QuLeR\DnD\wolves-of-welton-primer.html
   ```
2. **Queue the pre-show music** (Tabletop Audio — Pastoral). See soundtrack file for the full cue list.
3. **Roll d6 once.** That's the rumor you'll seed first in Scene 2.
4. **Read the cold open** from the HTML (Scene 1, blockquote at the top).

---

## FILES IN THIS BUNDLE

| File | Use |
|---|---|
| `wolves-of-welton-primer.md` | Reading copy. Plain markdown. Open in Obsidian/VS Code/anywhere. |
| `wolves-of-welton-primer.html` | **Run from this during the session.** Live trackers, initiative, council vote, soundtrack search buttons. |
| `wolves-of-welton-soundtrack.md` | Scene-by-scene cue sheet with primary + 2 backup tracks per cue. |
| `WOLVES-OF-WELTON-SESSION-QUICKSTART.md` | This file. |

---

## ASKING CLAUDE MID-SESSION

The session context is persisted to Claude memory and the repo. **Any fresh Claude session in this repo** (`C:\Users\QuLeR\DnD\`) auto-loads:
- `memory/wolves_of_welton_oneshot.md` — design notes, NPC names, tuning warnings
- `memory/MEMORY.md` — full index pointer

**Mid-session prompts that work:**
- `"what's Bolt's HP and breath weapon DC?"`
- `"remind me what Featherock said about the wolves"`
- `"what triggers the peace negotiation?"`
- `"what does Flame want vs Bolt?"`
- `"if the party kills Bolt and lets Flame live, what happens long-term?"`
- `"what's the council vote threshold?"`
- `"what soundtrack cue plays during the Flame Betrayal?"`

If you want a hard reference, just paste the file path:
- `read C:\Users\QuLeR\DnD\wolves-of-welton-primer.md scene 5`

---

## PARTY TUNING REMINDER

| Party | Use |
|---|---|
| **4 PCs @ lvl 2** | **Level-2 Tuned Statblocks** (in primer, sidebar "★ Lvl-2 Tuned"). Flame/Bolt 35 HP, breath 2d6/DC 12 gated to round 2+. **Skip Scene 4.** |
| 4 PCs @ lvl 3 | Defaults work. Optional Scene 4. |
| 5 PCs @ lvl 3 | +2 wolves Scene 1, Flame/Bolt to 60 HP each. |
| 3 PCs @ lvl 2 | Defaults from "Party of 3 at level 2" tuning. |

---

## THE 3 THINGS THAT CAN'T GO WRONG

1. **Don't let players skip Featherock.** If they do, drop a hint from Leanor: *"Poor Willen upstairs — he was on the posse. Says wild things now."*
2. **Bolt MUST get a chance to speak.** If the party doesn't trigger Peace via the tracker, find a narrative reason (a wolf knocked through the chimney lands at their feet and gasps "wait —" before dying).
3. **The Flame Betrayal must surprise.** Do not telegraph. Roll a fake attack die for Flame while Bolt is talking, then describe her biting Bolt instead of any PC.

---

## REPO COMMANDS (if you need them)

```bash
# Pull the latest version from GitHub (if you edit on another machine)
cd C:\Users\QuLeR\DnD && git pull

# Push any in-session notes you write to the primer
cd C:\Users\QuLeR\DnD && git add wolves-of-welton-* && git commit -m "session notes" && git push
```

---

## POST-SESSION CHECKLIST

- [ ] XP awarded (track in the primer's XP table)
- [ ] Gold split (800 gp council reward)
- [ ] Note any in-session deviations in the primer (and commit)
- [ ] If wolves survived: write a 2-line follow-up hook for next session
- [ ] If a PC died: note whether Bolt offered concessions (chaos branch)
