---
name: higgsfield-video
description: Higgsfield CLI recipe for campaign spell/attack video clips (Kling 4.0 image-to-video), measured costs, and the create --wait charge trap
metadata:
  type: reference
---

The DM bought Higgsfield Plus on 2026-11-12 (1200 credits) for campaign video clips; the tool is the official CLI `@higgsfield/cli` (`higgsfield`, `higgs`, `hf`), signed in on this PC. Never run `higgsfield auth token` (prints the token) and strip emails from `account status` output.

**Recipe that works** (first clip: Obatala's Cold Breath, job `76b95a7c-b7ea-4423-97a0-87b57368a758`):
1. Start frame = a Midjourney still as jpg (candidates in `dm-app/docs/style-test/mj/`). `higgsfield upload create <file>` or reuse an id from `upload list --image`.
2. `higgsfield generate create kling4_0 --mode image-to-video --start-image <upload_id> --duration 5 --resolution 720p --aspect_ratio auto --prompt "..." --json` prints the job id at once.
3. `higgsfield generate wait <id> --timeout 9m --interval 10s --quiet --json` (about 3.5 min), then curl `result_url`.
4. Re-encode for the repo: `ffmpeg -c:v libx264 -crf 25 -preset slow -movflags +faststart -c:a aac -b:a 96k` (8.4 MB to 1.25 MB), save as `dm-app/art/generated/<id>-<move>.mp4`, add `video:` beside `art:` on the action.

**Trap:** two `generate create ... --wait` calls (local file path, 1080p) were each charged 16.25 credits and returned `[]` / "request failed (no response received)" with no job in `generate list`. Cause not isolated (the working call differed in three ways: no `--wait`, an upload id, 720p). Do not use `--wait` on create.

**Costs measured:** `kling4_0` image-to-video 5 s: 720p 11.25, 1080p 16.25. `seedance_2_5` 5 s 720p 35. `veo3_1` fast 6 s 24. Price a call for free with `generate cost`.

**Prompt pattern the DM's feedback produced:** "Static shot, fixed camera, no camera movement" + the creature stays planted + one or two clear actions (inhale, then a wide spreading cone) + "Keep the gritty painterly dark fantasy illustration style of the image". The DM rejected a code-drawn clip ("stick figure") and a beam that "looks like a leash". Related: [[free-tools-only]].
