---
name: dm-app-hosting
description: How the DM app is hosted and redeployed (VPS nginx site behind basic auth); never put host/credential details in the public repo
metadata:
  node_type: memory
  type: project
  originSessionId: 18e09db2-7ead-4d77-89e3-f44a316262f1
  modified: 2026-10-11T06:37:25.029Z
---

The DM app (`dm-app/`) is served by nginx on the shared VPS (address, SSH key and login: see the global `~/CLAUDE.md` portfolio section and the nginx site named `dm-app` on the box). It sits behind basic auth; the DM has the password. Another service on the VPS owns the neighbouring port: check `ss -ltnp` before touching nginx.

Redeploy from `dm-app/`: tar everything except `tests/`, `docs/`, `tools/`, `sessions/_fixture.js`, `sessions/_campaign-fixture.js`; pipe over ssh, extract to `/var/www/dm-app.new`, chown to www-data, then swap with `dm-app` / `dm-app.old`. About 160 MB, because the library PDFs and maps ship too.

**Why:** the GitHub repo is PUBLIC. Official art, maps, PDFs and sfx are gitignored and only exist locally and on the VPS behind auth. Host, port and credential details stay out of anything committed, including this memory once it's synced.

**How to apply:** after any content change, redeploy, then curl a few paths with auth (expect 200) and without (expect 401). Related: [[dm-prep-format]].
