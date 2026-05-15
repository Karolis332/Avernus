# Sora 2 / sora-2-pro Research Report — D&D Animated Short
*Compiled 2026-04-26 from live OpenAI Cookbook, fal.ai, DataCamp, Skywork, AI/ML API docs, and prompt-engineering blogs.*

> **DEPRECATION FLAG (loud).** OpenAI is sunsetting Sora: app closes 2026-04-26, Videos API + `sora-2`, `sora-2-pro` shut down **2026-09-24**. Whatever pipeline we build now needs a Kling 3.0 / Seedance 2.0 / Veo 3.1 fallback by August. Source: [DataCamp](https://www.datacamp.com/tutorial/sora-2-api-guide), [CyberLink](https://www.cyberlink.com/blog/trending-topics/5406/openai-sora-alternative).

---

## 1. Sora 2 Prompt Structure (Official, 2026)

OpenAI's Cookbook prescribes a strict ordering — **Style → Scene → Cinematography → Actions → Dialogue → Background Sound** — not action-first. Style is established up front so it propagates ([OpenAI Cookbook](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide)):

```
Style: [aesthetic anchor — single sentence]
[Prose scene description: characters, costumes, setting, weather]
Cinematography:
  Camera: [framing + movement]
  Lens: [focal length, DOF]
  Lighting: [key + fill direction]
  Mood: [tone words]
Actions:
  - Beat 1
  - Beat 2
  - Beat 3
Dialogue: [optional, short]
Background Sound: [diegetic cues]
```

**One camera move + one subject action per shot.** "Each shot should have one clear camera move and one clear subject action." Length: 80-150 words is the sweet spot ([WaveSpeedAI](https://wavespeed.ai/blog/posts/sora-2-prompting-tips-better-videos-2026/)). fal.ai inverts the order slightly — shot description first, then subject/action, then style — but the OpenAI guide is the authoritative source for sora-2 specifically ([fal.ai](https://fal.ai/learn/devs/how-to-write-prompts-sora-2)).

> **CONTRADICTS YOUR MENTAL MODEL:** Style is FIRST per OpenAI's own template, not woven through. The bow-draw prompt should open with `Style: Hand-painted 2D/3D hybrid animation...` — not bury it after the action description.

---

## 2. Motion Artifact Mitigation (Duplication / Ghost Limbs)

Root cause: complex articulation + multi-object motion + reflective surfaces inflate temporal artifacts; longer clips compound drift. Fixes from Skywork, Atlabs, and Apiyi:

- **Name specific limbs/objects** rather than letting the model improvise: "right hand grips the bowstring at the cheek anchor" beats "she draws the bow." ([Skywork](https://skywork.ai/blog/sora-2-how-to-fix-its-5-most-annoying-errors/))
- **Minimize hand articulation** — pin pose explicitly; under-specify nothing the model could double.
- **Reduce element count** — fewer simultaneous moving props = less duplication. The bow + arrow + draw-hand + bowstring is already 4 articulated elements.
- **Explicit single-object language**: "a single arrow nocked to the string", "one continuous draw motion", "the same arrowhead throughout the shot". ([Atlabs](https://www.atlabs.ai/blog/sora-2-prompt-guide))
- **Avoid reflective surfaces** in frame; they amplify temporal artifacts.
- **Add motion blur cue**: "180-degree shutter; natural motion blur on the arrow tip" — gives the model permission to smear instead of duplicate ([Atlabs](https://www.atlabs.ai/blog/sora-2-prompt-guide)).
- **Beat-time the action**: "in the final 0.5s the string releases" — prevents the model interpolating two release events.

---

## 3. Fluid Motion Language (Anticipation / Action / Follow-through)

The OpenAI robot-bulb example is a textbook three-act animation beat list ([Cookbook](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide)):

```
Actions:
- The robot taps the bulb; sparks crackle.        # anticipation
- It flinches, dropping the bulb, eyes widening.  # action
- The bulb tumbles in slow motion; it catches it just in time.  # climax
- A puff of steam escapes its chest — relief and pride.  # follow-through
```

Verb taxonomy that produces fluid motion ([Higgsfield](https://higgsfield.ai/blog/SORA-2-Prompt-Guide-How-to-Create-Viral-Videos-Like-a-Pro), [YoungUrbanProject](https://www.youngurbanproject.com/sora-prompts-for-ai-video-generation/)):

- **Energetic verbs**: leap, crash, hurl, snap, glide, surge, sweep — outperform "moves."
- **Temporal modifiers**: *slowly, gradually, sudden, in one continuous motion, holding for a beat.*
- **Numbered counts**: "four steps," "in the final second," "for two beats" — anchors timing.
- **Special treatments named explicitly**: `slow motion`, `motion blur`, `timelapse` go in the prompt; **frame rate cannot be controlled via prompt** — that's an API container parameter ([Apiyi](https://help.apiyi.com/sora-2-prompt-basic-guide-10min-202510.html)).
- **24fps animated cadence with held expressive frames** is a phrase that successfully invokes the Vox Machina/Arcane keyframe-y rhythm vs. the 60fps floaty-AI look.

---

## 4. `input_reference` (Image-to-Video) — Confirmed Working

Both `sora-2` and `sora-2-pro` accept `input_reference`. Verified from multiple sources ([OpenAI Cookbook](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide), [DataCamp](https://www.datacamp.com/tutorial/sora-2-api-guide), [PromptVid](https://promptvid.site/blog/sora-2-image-input-reference-guide)).

**Hard constraints:**
- Formats: `image/jpeg`, `image/png`, `image/webp`
- **Image dimensions must equal target video `size` exactly.** Pillow-resize first or you get `Inpaint image must match the requested width and height` ([Apiyi](https://help.apiyi.com/en/sora-2-api-inpaint-image-size-error-solution-en.html)).
- **Human faces in reference images are rejected** by content moderation. Stylized/painted character art is safer.
- Behavior: anchor for the **first frame**, while text prompt drives the motion. Style, palette, costume, and silhouette propagate.

**Python SDK:**
```python
from openai import OpenAI
client = OpenAI()

with open("aurora_ref_1280x720.png", "rb") as ref:
    video = client.videos.create(
        model="sora-2-pro",
        prompt="...full prompt...",
        size="1280x720",
        seconds="8",
        input_reference=ref,
    )
```
Source: [DataCamp](https://www.datacamp.com/tutorial/sora-2-api-guide). The SDK accepts a binary file handle directly; multipart is handled internally.

---

## 5. Multi-Shot Character/Prop Continuity

Three real mechanisms, ranked by reliability ([AIFreeAPI](https://www.aifreeapi.com/en/posts/sora-2-character-consistency)):

1. **Characters API (~95% consistency).** Upload a 2-4s 720p-1080p MP4 clip in 16:9 or 9:16 → returns `character_id`. Reference up to **2 character IDs per generation**, and **mention the character by name verbatim in the prompt**. Endpoint: `POST /v1/videos/characters` ([OpenAI Cookbook](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide)).
   ```json
   "characters": [{ "id": "char_aurora_v1" }]
   ```
   Note: **human-likeness uploads blocked by default** — but fantasy/illustrated characters and non-human subjects work. For Aurora as a stylized animated character, this is the play.
2. **`input_reference` per shot (~85-90%).** Same hero still fed as anchor frame for every shot.
3. **Character bible prompting (~70-80%).** Identical paragraph of physical description copy-pasted into every shot prompt. Fragile.

**No exposed `seed` parameter on Sora 2 / sora-2-pro.** Confirmed — DataCamp, the API ref fetch, and the SDK signature have no seed field. Identical prompts produce different results across calls.

> **CONTRADICTS YOUR MENTAL MODEL:** Fixed seeds are not a tool here. Stop planning around seed reuse; budget for Characters API uploads instead.

---

## 6. Stylized Animation Anchors (Vox Machina / Arcane)

No public Cookbook example names *Vox Machina* or *Arcane*. The closest officially-validated phrase is the robot-bulb prompt's `Style:` line ([OpenAI Cookbook](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide)):

> "Hand-painted 2D/3D hybrid animation with soft brush textures, warm tungsten lighting, and a tactile, stop-motion feel."

Community-validated stylization phrases that hold and resist photoreal leakage ([Imagine.art](https://www.imagine.art/blogs/sora-2-prompt-guide), [Skywork](https://skywork.ai/blog/how-to-craft-effective-sora-2-animation-prompts-easily/), [Medium / James Palm](https://james-palm.medium.com/best-sora-2-prompts-styles-3995ffded338)):

- `2D-3D hybrid animation in the style of Fortiche` (Arcane studio — actually invokable).
- `painterly brushwork, oil-painted textures, bold ink linework`
- `Titmouse-style limited animation cadence`
- `dramatic chiaroscuro shadows, rich saturated palette with teal and amber accents`
- `24fps animated cadence, hand-keyed, no rotoscope smoothness`
- `subtle watercolor wash and painterly textures; filmic motion blur for animated realism`

Generic terms to **avoid** because they pull photoreal: "cinematic," "realistic," "high detail," "8K," "DSLR." Replace with `animated film grade`, `frame-by-frame keyframes`, `painted backgrounds`.

---

## 7. Duration Choice for Action Beats

**Authoritative supported `seconds` values from the OpenAI Cookbook: `'4', '8', '12', '16', '20'`** ([OpenAI Cookbook](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide)). The Cookbook does not split this matrix by sora-2 vs sora-2-pro, but third-party docs disagree:

- DataCamp / AI/ML API list standard sora-2 as 4/8/12 only and sora-2-pro as 10/15/25 ([DataCamp](https://www.datacamp.com/tutorial/sora-2-api-guide)).
- developers.openai.com video-generation guide lists 8/16/20 across both models.

Until verified against your account, treat **4, 8, 12 as the safe sora-2 base set** and probe 16/20 only on sora-2-pro.

**Community consensus on quality vs duration ([Cookbook](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide), [MindStudio](https://www.mindstudio.ai/blog/sora-2-vs-sora-2-pro-upgrade-worth-it)):**

| Duration | Use | Artifact risk |
|----------|-----|---------------|
| 4s | One beat (draw OR release) | Lowest |
| 8s | Full anticipation→action→follow-through | Moderate |
| 12s | Multi-beat sequence with camera move | Highest on sora-2 base |

OpenAI's own recommendation: **"stitch two 4-second clips in editing instead of a single 8-second clip."** For the bow-draw, the sweet spot is **two 4s clips** (draw + release/impact) joined on the loose, not one 8s clip.

---

## 8. Negative Prompting on Sora 2

**No dedicated negative-prompt parameter exists.** Negation is done in natural language ([Apiyi](https://help.apiyi.com/sora-2-prompt-basic-guide-10min-202510.html), [QubitFlow](https://qubitflow.wordpress.com/2025/08/22/comprehensive-catalogue-of-constraints-negatives-for-sora-prompt/)). It works, with caveats:

- **Place negations at the END of the prompt**, after style + scene + actions. Trailing `exclude:` block is common.
- **Be specific** — "not photorealistic" is too vague; pair with format avoidance: `"not photorealistic, not 3D-rendered CGI, not vector art, not anime cel-shading."`
- **Working negation phrasings**: `"exclude: rolling-shutter wobble, ghosting, duplicated limbs, foot sliding, motion morphing, photorealistic skin pores"`.
- **Don't repeat** the same negation — over-constraining suppresses creativity and can produce a worse result.
- **Don't use loaded verbs** ("don't show blood") — content moderation reads them positively.

---

## ACTIONABLE FOR OUR PIPELINE

Concrete edits to the Aurora bow-draw test before the next render:

1. **Move `Style:` to the absolute first line.** Anchor: `Style: 2D-3D hybrid animation in the style of Fortiche (Arcane) and Titmouse (Vox Machina); hand-painted brushwork, bold ink linework, dramatic chiaroscuro, saturated teal-and-amber palette, 24fps animated cadence with held expressive keyframes.`
2. **Split the 8s clip into two 4s clips.** Clip A: nock + draw + anchor. Clip B: hold + release + arrow flight. Cut on the anchor frame in post.
3. **Upload Aurora as a Characters API entry.** Generate one clean 2-4s 720p reference clip of her standing/turning, POST to `/v1/videos/characters`, then reference `char_aurora_v1` + name "Aurora" verbatim in every prompt. This is the only ~95% consistency path; seeds won't save us.
4. **Match `input_reference` dimensions to `size` exactly** (1280x720 PNG) and pre-resize via Pillow before upload. Stop assuming Sora resizes.
5. **Pin the bow as a single object explicitly**: `"a single longbow with one nocked arrow throughout the shot; the same arrowhead is visible from start to finish; no duplicate arrows."`
6. **Beat-time the action**: `Actions:` list — `- Beat 1 (0-1s): Aurora's right hand grips the string at three-finger draw. - Beat 2 (1-3s): she draws to the cheek anchor in one continuous motion. - Beat 3 (3-4s): held tension, breath, eye on target.`
7. **Add motion blur permission**: `"180-degree shutter, natural motion blur on the bowstring during release; one continuous motion, no morphing between frames."`
8. **Strip photoreal-leakage terms** ("cinematic," "realistic detail," "8K"). Replace with `"animated film grade, painted backgrounds, no photorealistic skin texture."`
9. **Append a tight negative tail**: `"exclude: duplicated arrows, extra fingers, ghosting limbs, photorealistic faces, rotoscope smoothness, rolling-shutter wobble, foot sliding."`
10. **Drop human-face references in `input_reference`** — they get rejected. Use stylized character art (e.g., a Midjourney/Nano Banana Aurora portrait already in the Vox Machina style) at exact target resolution.
11. **Limit to one camera move per clip**: `"slow 35mm push-in, locked-off horizon"` — not a push-in plus a tilt plus a rack-focus.
12. **Stop expecting seed reuse to lock continuity.** Sora 2 has no exposed seed. Continuity = Characters API + identical Style line + identical character description block in every prompt.

---

## Sources
- [OpenAI Cookbook — Sora 2 Prompting Guide (Mar 2026 update)](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide)
- [OpenAI Developers — Video Generation API guide](https://developers.openai.com/api/docs/guides/video-generation)
- [DataCamp — Sora 2 API With Python](https://www.datacamp.com/tutorial/sora-2-api-guide)
- [fal.ai — How to Write Prompts That Work for Sora 2](https://fal.ai/learn/devs/how-to-write-prompts-sora-2)
- [WaveSpeedAI — Sora 2 Prompting Tips 2026](https://wavespeed.ai/blog/posts/sora-2-prompting-tips-better-videos-2026/)
- [Atlabs — Best Practices Sora 2 Prompting 2026](https://www.atlabs.ai/blog/sora-2-prompt-guide)
- [Skywork — Sora 2 Troubleshooting (5 errors)](https://skywork.ai/blog/sora-2-how-to-fix-its-5-most-annoying-errors/)
- [Skywork — Effective Sora 2 Animation Prompts](https://skywork.ai/blog/how-to-craft-effective-sora-2-animation-prompts-easily/)
- [Apiyi — Sora 2 Image Dimension Errors](https://help.apiyi.com/en/sora-2-api-inpaint-image-size-error-solution-en.html)
- [Apiyi — Sora 2 Duration / seconds error](https://help.apiyi.com/en/sora-2-api-seconds-duration-error-solution-en.html)
- [Apiyi — Sora 2 10-min Basic Guide](https://help.apiyi.com/sora-2-prompt-basic-guide-10min-202510.html)
- [PromptVid — Sora 2 Image Input Reference Guide](https://promptvid.site/blog/sora-2-image-input-reference-guide)
- [AIFreeAPI — Character Consistency Guide](https://www.aifreeapi.com/en/posts/sora-2-character-consistency)
- [QubitFlow — Constraints/Negatives Catalogue](https://qubitflow.wordpress.com/2025/08/22/comprehensive-catalogue-of-constraints-negatives-for-sora-prompt/)
- [Higgsfield — Sora 2 Prompt Guide](https://higgsfield.ai/blog/SORA-2-Prompt-Guide-How-to-Create-Viral-Videos-Like-a-Pro)
- [MindStudio — Sora 2 vs Sora 2 Pro](https://www.mindstudio.ai/blog/sora-2-vs-sora-2-pro-upgrade-worth-it)
- [Imagine.art — Sora 2 Prompt Guide](https://www.imagine.art/blogs/sora-2-prompt-guide)
- [Medium / James Palm — 50+ Sora 2 Prompts Tested](https://james-palm.medium.com/best-sora-2-prompts-styles-3995ffded338)
- [CyberLink — Sora Shutdown / Alternatives](https://www.cyberlink.com/blog/trending-topics/5406/openai-sora-alternative)
