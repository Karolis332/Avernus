---
name: browser-firefox
description: "Open the DM app and images in Firefox, not the Windows default (Edge)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 7a924c0c-00c7-40ea-9e89-b643f55ad1ad
  modified: 2026-11-07T23:26:15.912Z
---

Open pages and images for the DM in **Firefox**: `"/c/Program Files/Mozilla Firefox/firefox.exe" -new-tab "<file:///...>"`, run in the background.

**Why:** the registry's default http handler is Edge (MSEdgeHTM), but the DM uses Firefox and asked why Edge opened (2026-11-08). `cmd //c start "" file.jpg` also hung the shell once.

**How to apply:** never use `start msedge` or a bare `start` for the DM's viewing. Launch firefox.exe with `-new-tab`. See [[dm-app-primer-feedback]].
