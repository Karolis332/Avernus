---
name: no-code-in-heredocs
description: "On this PC's Git Bash tool, never pass JS or long Python through a heredoc; write a script file with the Write tool and run it"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 0da2ec32-82ca-4301-a7e3-feccc57304d0
  modified: 2026-11-14T23:25:47.774Z
---

Do not send source code through a Bash heredoc (`python - <<'EOF' ...`) on this machine when the text holds triple quotes, `>` comparisons or JavaScript. Write the script to the scratch folder (`C:\Users\kpaul\DnD\.playwright-mcp\`) with the Write tool and run the file.

**Why:** it failed twice on 2026-11-14/15 ("unexpected EOF while looking for matching quote"), and part of the text was still run by the shell: a line with `rows.length > 0` created an empty file `dm-app/0` in the repo. My reading: the tool wraps the command, so the heredoc quoting is not safe.

**How to apply:** any multi-line edit or generator script. One-line `python -c "..."` and `node -e '...'` without nested quotes are fine. If a stray empty file named like a number shows up in `git status`, this is where it came from: delete it.
