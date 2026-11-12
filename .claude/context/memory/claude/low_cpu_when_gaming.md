---
name: low-cpu-when-gaming
description: When the DM says they are in a game, cap CPU and hold local heavy work (encodes, autoplaying video pages, new browser windows)
metadata:
  type: feedback
---

When the DM says they are gaming ("keep the cpu usage low i am in a deadlock game", 2026-11-12), run the `cpu-cap` skill at 25% (4 of 16 logical CPUs) and hold local heavy work: no ffmpeg encodes, no pages that autoplay video, no new browser windows. Remote rendering (Higgsfield) and polling are fine.

**Why:** the PC is also the gaming machine; a gallery page looping a dozen videos in Firefox and x264 encodes compete with the game. The cap does not cover Firefox.

**How to apply:** build galleries with `preload="metadata"` and no `autoplay`; queue encodes and the app update for when the DM says the match is over, and say so. Reset with `cpu-cap off` afterwards. Related: [[higgsfield-video]].
