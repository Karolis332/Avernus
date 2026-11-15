---
name: no-code-in-heredocs
description: "DnD repo: empty files named 0, 40, 0)) appear after edits or commands containing '>' (the cmd /c hooks); delete them before every commit. Write scripts with the Write tool, not heredocs"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 0da2ec32-82ca-4301-a7e3-feccc57304d0
  modified: 2026-11-15T09:45:57.449Z
---

In `C:\Users\kpaul\DnD`, empty files with names like `0`, `40`, `30`, `0))`, `0})`, `null.,` appear in the current folder (repo root, `dm-app/`, `dm-app/sessions/`) after an Edit, Write or Bash call whose text holds a `>` comparison. Before every commit: `git status --short`, check each stray is 0 bytes, delete it.

**Why:** found 2026-11-15. The project hooks in `.claude/settings.json` are `cmd /c node %CLAUDE_PROJECT_DIR%/.claude/helpers/hook-handler.cjs <event>`. Under Git Bash `/c` is rewritten to a path, so cmd starts interactive and runs the hook's stdin JSON as commands: `> 0` becomes a redirect that creates (or empties) a file named after the next word. My earlier reading, that heredocs caused it, was wrong; heredocs with code only failed for quoting reasons. The fix is `cmd //c` or calling `node` directly; it is the DM's config, so I reported it (Session Log 2026-11-15) and did not change it. If the hooks are fixed, drop this memory.

**How to apply:** keep writing multi-line scripts to `C:\Users\kpaul\DnD\.playwright-mcp\` with the Write tool and running the file (heredocs with nested quotes still fail). Never name a real file like a bare number in this repo while the hooks are unfixed: a `> N` in any tool input would empty it. Related: [[dnd-orchestration-lessons]].
