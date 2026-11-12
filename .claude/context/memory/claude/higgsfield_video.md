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

**Traps:** two `generate create ... --wait` calls (local file path, 1080p) were each charged 16.25 credits and printed `[]` / "request failed (no response received)", so no job id was captured. Do not use `--wait` on create. `generate list` never shows Kling jobs (only `generate get <id>` finds them), so save every id to a file at once; those two clips may exist in the web library. Plus allows 6 `kling4_0` jobs at once; a 7th create is refused (`rate_limit_reached`) and not charged. The CLI has no cancel.

**Restyle a still first** when the picture is wrong: `generate create nano_banana_2_1 --image <upload_id> --aspect_ratio auto --resolution 2k --prompt "Edit this painting. Keep the same dragon, pose, composition and painterly style. Change ..."` = 2 credits, under a minute; the job id works as `--start-image` for Kling.

**Art direction (DM, 2026-11-12):** Obatala is "she", she is in the Hells (Avernus backdrop, never snowfields), "her scales are melting due to the heat", and everything should be "more grandiose, it is an ancient dragon" (full-body wide shots, tiny figures for scale). "The dragon's face needs to be the same" in every picture and "the cold breath version of the face is perfect": that face is `dm-app/docs/style-test/obatala-face-reference.webp`; pass it as the second `--image` when painting any Obatala still. Front views drift whiter and thinner, so say "broad, heavy, blunt-snouted, weathered grey-blue". The Kling-generated sounds are approved.

**Batch rule:** twice a batch of six was rendering when the DM's correction arrived (135 credits of drafts, no cancel). The DM steers in real time: after any change of look, show stills or one clip and wait for a go before a batch.

**Wanted next (DM):** a cast board, like a soundboard: a player-facing window on a second monitor, and a DM board of buttons with previews; one click casts the clip or still to the player window.

**Quality bar (DM, 2026-11-12):** the 720p clips from painted stills "look a lot low quality": "i need details", "like proper cinematics". Cause measured: at 720p in a wide shot the subject is a few hundred pixels and the detail smears; the app re-encode was not the cause. Cinematic recipe (sample `cine-cold-breath.mp4`, job `5c6418a1-6263-490b-a3a2-e8a3dd26897b`): `cinematic_studio_2_5` still at 4k with the face reference (4 credits, 5504x3072, photoreal film still; it painted a grey sky, fixed with a `nano_banana_2_1` 4k edit, 3 credits), then `kling4_0` at 1080p (16.25 per 5 s) with "Cinematic shot, low angle, very slow push-in ... photorealistic, highly detailed". Dearer tiers not yet tried: `cinematic_studio_video_4_0` 1080p = 80 credits per 5 s (160 for 10 s); `topaz_video` upscale to 2160p (no cost estimate available). Never render 720p again for this DM.

**Cinematic set (2026-11-12):** the DM picked the cinematic sample ("left one good") with one fix: "the soldiers in the background dont fit in to the theme". No generic soldiers or extras in any frame; write "No people, no soldiers" and let rock spires give scale (only scene figures: Krull the tortle rider, the Mirror's devils and three cloaked adventurers). Lessons from the eleven stills: a 5.5K job id fails as a `cinematic_studio_2_5` reference (seven jobs failed, uncharged), so upload a 2048 px jpg (`cine-dragon-ref.jpg`); it paints grey skies about one time in three and copies a painted reference's style, so drop painted references and fix skies with a `nano_banana_2_1` 4k edit (3 credits); check every still for sky, face, leg count and stray chains before paying 16.25 for the clip. All eleven clips are `cine-*.mp4` in `.playwright-mcp/hf/` (job ids in `clips.json`).

**Costs measured:** `kling4_0` image-to-video 5 s: 720p 11.25, 1080p 16.25. `seedance_2_5` 5 s 720p 35. `veo3_1` fast 6 s 24. Price a call for free with `generate cost`.

**Prompt pattern the DM's feedback produced:** "Static shot, fixed camera, no camera movement" + the creature stays planted + one or two clear actions (inhale, then a wide spreading cone) + "Keep the gritty painterly dark fantasy illustration style of the image". The DM rejected a code-drawn clip ("stick figure") and a beam that "looks like a leash". Related: [[free-tools-only]].
