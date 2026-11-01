---
name: dnd-orchestration-lessons
description: "Lessons from orchestrating the S12/S13 plan with one agent per slice (2026-11-01): pull first, agents kill by PID only, headless Chromium fallback"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 48775292-a99a-4fbd-becd-d482a794020a
  modified: 2026-11-01T11:53:02.150Z
---

Lessons from running `~/.claude/plans/hidden-cooking-tome.md` (2026-11-01, slices 0–9, merge commit `0183ce0`).

- **Always `git fetch && git status -sb` before planning or building in `DnD/`.** The laptop commits to origin
  (the DM runs sessions from it). On 2026-11-01 this checkout was 21 commits behind and the whole S11 file
  had been rewritten there; the divergence surfaced only when `/sync-context` built on origin/main.
- **Every agent brief must say: stop servers by PID, never `taskkill /IM python.exe|node.exe`.** Two agents
  killed by image name and took down every MCP server (Playwright, Open5e, jcodemunch) for the session.
- **Playwright MCP down? Drive the cached browser directly:**
  `~/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe --headless=new --disable-gpu --hide-scrollbars --window-size=1400,1000 --virtual-time-budget=6000 --screenshot=<win path> <url>`
  with `python -m http.server 8765` in `dm-app/`. `statblocks.html?s=<id>` and `index.html?s=<id>&view=combat`
  render stat blocks at load, so no clicking is needed to exercise `statblock.js`.
- **Agents report "Session 9 in the dropdown" after editing `sessions/index.js`:** it is their browser cache,
  not a bug; reload with cache disabled before filing it.
- **The laptop edits live while this PC works (2026-11-01, 10:44–13:50: 13 S12 commits).** Fetch again right
  before every commit, not only before planning. To merge a session file both sides rewrote: take the
  laptop's file as base (`git checkout --theirs`), replay this PC's diff with `patch -F 3 -r rejects`, then
  re-apply rejected hunks with an assert-count-1 Python script. `index.html?s=<id>#<scene-id>` opens a scene.
- **The "VPS backup" of `Extracted Text/` (Saddlebag + DiA OCR) does not exist** anywhere reachable; the DM
  supplies it later. Don't send another agent to look.

**Why:** each of these cost a round of rework or a blocked slice.
**How to apply:** put the PID rule and the pull check into every slice brief; use the chrome.exe fallback
instead of waiting on `/mcp`. Related: [[dnd-files-reference]], [[dm-app-primer-feedback]].
