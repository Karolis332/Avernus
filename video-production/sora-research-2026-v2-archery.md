# Sora 2 Archery Shot — Iter 23 Failure Analysis & Iter 24 Plan
*Compiled 2026-04-26. Targets the three failures observed in the Aurora bow-draw test: arrowhead drift, anatomically wrong grip, broken bimanual coordination. All findings sourced from live URLs fetched this session.*

> **Carry-forward from v1:** Style-first prompt order, Characters API for Aurora identity, single-arrow pinning, motion-blur permission, 4s clip discipline. All retained. Sora deprecation 2026-09-24 still applies — fallback path matters.

---

## Group A — Known Sora 2 Artifact Classes

### A1. Weapon / rigid-prop fidelity

The community has not produced a viral named "arrow-bending" report, but the pattern is documented at category level. From the OpenAI developer community on prop deformation: *"objects teleporting, clothing changes, and scene lighting resets... remedies include simplifying motion, re-specifying state, and reinforcing continuity phrases such as 'object permanence maintained'"* ([Skywork — Sora 2 Troubleshooting](https://skywork.ai/blog/sora-2-how-to-fix-its-5-most-annoying-errors/)). DataCamp's review confirms swords specifically as a stress case: *"users can drop themselves into a sword fight on a pirate ship... Sora 2 still struggles with spatial coherence, basic editing logic, and subtle physical realism"* ([DataCamp — Sora 2 Examples & Critiques](https://www.datacamp.com/blog/sora-2)). Skywork on physics boundaries: *"Sora's physics simulation boundaries cluster around specific scenarios such as liquids, **small objects**, and cloth"* ([Skywork — Behind the Scenes](https://skywork.ai/blog/behind-the-scenes-sora-2-technical-innovations-best-practices-2025/)). An arrow is exactly that — a small, thin, rigid object, the model's worst case. Recommended mitigations: *"tighten constraints (e.g., 'rigid body,' 'no deformation on collision')"* (Skywork).

**Iter 24 implication:** the arrowhead-mid-shaft failure is a known thin-rigid-prop class. Add explicit rigidity language and reduce frame count where the arrow needs to track.

### A2. Hand articulation

VEED's aggregation of Reddit/X reports nails the failure mode: *"finger-counting mismatch — where you ask for a video of someone counting on their fingers, but the numbers don't match the hand gestures — one of Sora 2's most frequent flaws"* ([VEED — Sora 2 Prompts](https://www.veed.io/learn/sora-2-prompts)). October 2025 model updates claimed *"hand generation (+15% accuracy)"* ([sora2.ink — Features](https://sora2.ink/sora-2-features/)) — still mid-tier. Working anti-artifact tail from the community: *"Hands and faces photorealistic, anatomically correct, no extra limbs or fused fingers... Five fingers per hand, natural skin folds, subtle veins, short clean nails, realistic knuckle movement"* (VEED). Skywork's grip-specific guidance: *"For grip artifacts (cup floating, fingers passing through a handle), explicitly state physical rules… Limit dynamic interactions. Focus on one physics action at a time"* ([Skywork](https://skywork.ai/blog/sora-2-how-to-fix-its-5-most-annoying-errors/)). And the structural advice from sider.ai: *"slow the motion, increase depth of field a touch (f/4), and add strict constraints like 'stable facial features; five fingers per hand; consistent skin texture.' Avoid rapid head turns and ultra-close-ups on complex motion"* ([Sider.ai](https://sider.ai/blog/ai-tools/how-to-create-realistic-videos-with-sora-2-without-losing-your-weekend-or-your-mind)).

**Iter 24 implication:** spell out the Mediterranean three-finger draw atomically (index above nock, middle+ring below, thumb relaxed, **string** in distal joints — not the shaft). Combine with motion-blur permission so the model is allowed to smear instead of mis-articulate.

### A3. Bimanual coordinated action

No isolated archery thread surfaced. The general signal is that complex coordinated motion fails late in the clip. From DataCamp's analysis of a multi-actor physics test: *"the physical dynamics look pretty convincing for most of the video, but if you look at the very last frames (the last 0.5 seconds), you'll see that the skater's legs stretch into an impossible and almost deforming shape... the cat does an impossible pirouette"* ([DataCamp](https://www.datacamp.com/blog/sora-2)). Combining-motions advice: *"Combining 2-3 camera movements for cinematic complexity drops success rate to 65-75%"* and *"Sora 2 sometimes struggles with too many simultaneous actions"* ([sora2.ink — Camera Movement Guide](https://sora2.ink/sora-2-camera-movement-guide/)).

**Iter 24 implication:** bimanual draw is two simultaneous articulated actions. Drop one — anchor the bow-arm pose statically and only animate the draw arm, or freeze both and only animate breath + release.

---

## Group B — Workaround Strategies

### B4. Image-to-video with pre-posed reference

Confirmed working pattern. From CometAPI: *"For consistent style across videos, use the 'input_reference' parameter. Generate a reference image first (with DALL-E or MidJourney) and feed it to Sora 2 — this locks in character design or color schemes"* ([CometAPI](https://www.cometapi.com/can-sora-turn-a-still-image-into-motion/)). The Nano Banana → Sora 2 workflow has a documented practitioner pattern: *"Pick 1-2 small motions, max"* and *"Forgetting to refine the Nano Banana image can make Sora 2 render faces weirdly — fix the still before animating"* ([Skywork — Nano Banana → Sora 2](https://skywork.ai/blog/nano-banana-to-sora-2-video-workflow-explained/)). The example shipped: *"Animate the kid—she taps the glass twice like she's pointing at a croissant. The camera slowly moves from the kid to the glass case"* — precisely the locked-pose-with-micro-motion shape we want for archery. Sora 2's behavior is anchor-frame plus generative: *"The model uses the image as an anchor for the first frame, while your text prompt defines what happens next"* ([OpenAI Video Generation API](https://developers.openai.com/api/docs/guides/video-generation)). Strict resolution requirement re-confirmed: *"Inpaint image must match the requested width and height"* ([Apiyi](https://help.apiyi.com/en/sora-2-api-inpaint-image-size-error-solution-en.html)).

### B5. Static-camera + locked-pose

This is the strongest signal in the entire research. The Cookbook itself prescribes the fix verbatim: *"If a shot keeps misfiring, strip it back: **freeze the camera, simplify the action, clear the background**. Once it works, layer additional complexity step by step"* ([OpenAI Cookbook — Sora 2 Prompting Guide](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide)). And *"Each shot should have one clear camera move and one clear subject action."* Sora 2 even shipped a preset for this: *"Sora 2 now offers a 'Static locked' preset: zero camera movement for pure subject-in-frame stability"* ([sora2.ink — Camera Movement Guide](https://sora2.ink/sora-2-camera-movement-guide/)). Canonical recovery loop: *"If a shot fails to render correctly, lock the camera position and simplify actions first. Once successful, gradually add complexity."*

### B6. `videos.extend` and `videos.edits` (the "remix" surface)

Authoritative API spec from OpenAI's video-generation guide:

- **Extend** — `POST /v1/videos/extensions`: *"Continue an existing completed video and create a new stitched result... Extensions preserve motion, camera direction, and scene continuity. A single video can be extended up to six times for a maximum of 120 seconds total. The system uses the full source clip as context."* Crucial caveat: *"Extensions currently accept only a source video and prompt. **They don't support characters or image references.**"* ([OpenAI Video Generation API](https://developers.openai.com/api/docs/guides/video-generation)).
- **Edits / remix** — `POST /v1/videos/{video_id}/edits`: *"Make targeted adjustments to existing videos without regenerating everything from scratch... Reuses the original structure, continuity, and composition while applying the modification. Smaller, focused edits preserve more of the original fidelity and reduce the risk of introducing artifacts."*
- Community-confirmed remix semantics: *"Don't like your video? Prompt again with the previous video ID for a tune-up"* ([OpenAI Forum — How to merge Sora2 videos](https://community.openai.com/t/how-to-merge-sora2-videos/1361454)).

**Hard constraint for our case:** because Aurora's identity is locked via Characters API, **we cannot use `extensions` after the first clip without losing her** — extensions don't accept character refs. This kills naive Plan Y.

### B7. Sequential-beat chaining

Practitioner pattern from `mshumer/sora-extend`: *"the final frame of each generated clip is captured and fed into the subsequent generation step as contextual input, helping with visual consistency"* ([github.com/mshumer/sora-extend](https://github.com/mshumer/sora-extend)). The official Cookbook stops short of the same trick but does endorse stitching: *"you may see better results by stitching together two 4 second clips in editing instead of generating a single 8 second clip"* (Cookbook). Sider.ai's keyframe-resume technique: *"generate a video, extract a frame, and then use that frame as an input image for a new generation or a remix... if everything was good until a weird artifact at the end, you can take the last clear frame before the artifact and tell Sora 2 (via an image anchor) to continue from there"* ([Sider.ai](https://sider.ai/blog/ai-tools/how-to-create-realistic-videos-with-sora-2-without-losing-your-weekend-or-your-mind)). This works because `input_reference` does support character continuity through the image anchor, while `extensions` doesn't.

---

## Group C — Stylized Action Priors

### C8. Stylized > photoreal for impossible action

Caution flag from theaivideocreator: *"References like 'in the style of Blade Runner,' 'like a Wes Anderson scene,' or 'animation style like Studio Ghibli' can backfire if the model misinterprets, so use with caution"* ([theaivideocreator — Cheatsheet](https://www.theaivideocreator.ai/p/sora-2-prompting-cheatsheet)). The fix: describe markers, don't just name the studio. Working Ghibli descriptor stack: *"watercolor backgrounds, soft outlines, nature-focused scenery, pastel color use, rounded shapes"*. PJ Ace's verified Sora prompt format that worked: *"Recreate this in the style of Studio Ghibli, intricately detailed. Make sure the composition, colors and vibe is similar"* ([@PJaccetturo on X](https://x.com/PJaccetturo/status/1905151200099795067)).

### C9. Fortiche / Arcane

No verified Fortiche+archery template surfaced — the closest is the descriptor-stack pattern. From v1 research, our anchor `2D-3D hybrid animation in the style of Fortiche (Arcane) and Titmouse (Vox Machina); hand-painted brushwork, bold ink linework, dramatic chiaroscuro, saturated teal-and-amber palette, 24fps animated cadence with held expressive keyframes` already follows the markers-not-name-only pattern. Keep it.

---

## Group D — Sora 2 Alternatives

Side-by-side from multiple 2026 comparisons. Table compiled from [vidguru](https://www.vidguru.ai/blog/veo-3.1-vs-kling-v2.1-vs-sora-2-ultimate-comparison-2025.html), [aimlapi](https://aimlapi.com/blog/google-veo-3-1), [vo3ai](https://www.vo3ai.com/blog/sora-2-pro-vs-kling-30-vs-veo-31-best-ai-video-model-for-character-animation-and-2026-03-17), [unifically](https://unifically.com/blogs/sora-kling-veo-api-comparison):

| Capability | Winner | Direct quote |
|---|---|---|
| Hand fidelity / weapon grip | **Kling 2.6** | *"No motion blur on hands, natural facial expressions"* |
| Martial / weapon choreography | **Kling 2.6** | *"Motion Control transfers dance moves, martial arts, gestures with full-body precision"* — upload a 3-30s reference video, motion is transferred onto the AI character |
| Realistic prop physics | **Sora 2** | *"Objects fall, bounce, and interact with realistic weight and momentum"* |
| Cinematic look / final pass | **Veo 3.1** | *"Exceptional detail on hand movements"* in chef-knife test |

Consensus pipeline: *"Using Nano Banana for character systems, Sora 2 Pro for primary rendering, **Kling for motion**, and Veo 3.1 for final stylization is becoming the standard production workflow"* (vo3ai). For *this specific shot* (bow-draw, hands-on-string, bimanual), **Kling 2.6 with Motion Control + a real human archery reference video is the off-ramp** if Plan X fails.

---

## ITERATION 24 STRATEGY

**Plan X — image-anchor, locked-pose, micro-motion only.** Picked because: (a) the Cookbook explicitly prescribes "freeze the camera, simplify the action" as the recovery loop; (b) `extensions` cannot carry the Aurora Character ID forward, killing Plan Y; (c) Plan Z (model-swap to Kling) is the *escalation* if X fails, not the first move — we still have Sora budget and Aurora is already Characters-API-locked. Plan X solves all three failure modes simultaneously: arrowhead pinned by the still, grip rendered correctly by Nano Banana (image models nail static archery anatomy), bimanual coordination eliminated because both arms are pre-posed and only breath/string-twang/hair animate.

### Pipeline

1. **Generate the anchor still in Nano Banana** (or Midjourney v7) at exactly 1280x720 PNG. Refine in Lovart if face/fingers drift. Keep one and only one arrow on the string.
2. **Pillow-resize verify** to 1280x720 before upload (bytes-true match — Sora rejects mismatched dims).
3. **Call `videos.create`** with `input_reference` + Characters API ref + the locked-pose prompt below. Duration **4s**.
4. **If the release beat is needed**, run a *second* `videos.create` with a new anchor still (Aurora at the moment of release, string forward, arrow gone) and prompt for the 0.5s aftermath — do NOT use `extensions` (loses Aurora).
5. **Stitch in editing** (AVIDemux lossless concat per the OpenAI Forum thread).

### Anchor still prompt for Nano Banana

```
Aurora, half-elf ranger from Vox Machina / Arcane visual style, photographed
at the exact instant of full draw. Three-finger Mediterranean grip on a
linen bowstring: index finger above the nocked arrow, middle and ring
fingers below the nock, thumb relaxed and curled inward. The string is
held in the distal pads of the fingers, NOT the palm. Bowstring drawn
to her right cheek anchor, just under the corner of her mouth. A single
broadhead arrow nocked on the string, arrowhead forward at the bow's
riser, fletching at her ear. Left arm fully extended, locked at the elbow,
hand wrapped around the longbow grip. Recurve longbow bent into a clean
D-shape. Three-quarter front view, mid-chest framing. Painterly Fortiche/
Arcane brushwork, ink linework, teal-and-amber palette, dramatic
chiaroscuro. 1280x720.
```

### Sora 2 call — locked-pose animate

```python
from openai import OpenAI
client = OpenAI()

PROMPT = """
Style: 2D-3D hybrid animation in the style of Fortiche (Arcane) and Titmouse
(Vox Machina); painterly brushwork, ink linework, dramatic chiaroscuro,
saturated teal-and-amber palette, 24fps animated cadence with held
expressive keyframes. Animated film grade, painted backgrounds. Not
photorealistic, not 3D-rendered CGI.

Aurora is at full draw, holding the pose. Both arms are locked rigid and
do NOT move. The single nocked arrow is a rigid body — the arrowhead
stays at the bow's riser, the fletching stays at her ear. Object
permanence maintained on the arrow throughout the entire clip.

Cinematography:
  Camera: STATIC LOCKED OFF, no pan, no push, no tilt. Mid-chest framing,
    three-quarter front view.
  Lens: 50mm equivalent, f/4 depth of field.
  Lighting: warm key from camera-right, cool teal rim from camera-left.
  Mood: held tension, breath-hold, eye on target.

Actions:
  - Beat 1 (0.0-2.0s): Aurora holds full draw, motionless. Only her chest
    rises and falls once with a slow inhale. Loose strands of hair drift
    in a faint breeze. Eyes lock on an off-screen target.
  - Beat 2 (2.0-3.5s): the bowstring trembles by one pixel from held
    tension. Arrowhead does not move. Fingers do not reposition.
  - Beat 3 (3.5-4.0s): the string releases — fingers open in one frame,
    string snaps forward, arrow exits frame-right with natural motion blur
    on a 180-degree shutter. Fingers and bow-arm stay in their original
    positions through the release.

Background Sound: faint wind, single bowstring twang on release, no music.

Exclude: duplicated arrows, arrowhead drifting along the shaft, fused or
extra fingers, palm grip, fist grip, fingers wrapping the arrow shaft,
both arms moving, camera movement, photorealistic skin pores, rotoscope
smoothness, foot sliding, ghosting limbs.
"""

with open("aurora_full_draw_1280x720.png", "rb") as ref:
    video = client.videos.create(
        model="sora-2",  # base, not pro — 4s clip, base is fine
        prompt=PROMPT,
        size="1280x720",
        seconds="4",
        input_reference=ref,
        characters=[{"id": "char_aurora_v1"}],  # carry-forward from v1 setup
    )
print(video.id)
```

### Why this resolves the three failures

1. **Arrowhead drift** — the Nano Banana still pins the arrow's geometry pixel-exact at frame 1. The prompt explicitly declares the arrow a rigid body with object permanence. Camera is locked, so there's no parallax drift.
2. **Wrong grip** — Nano Banana renders static archery anatomy correctly when given an atomic anatomical description. The prompt then forbids the failure modes by name (`palm grip, fist grip, fingers wrapping the arrow shaft`). Sora interpolates from a correct frame instead of inventing a hand pose.
3. **Bimanual coordination broken** — eliminated entirely. Both arms are locked in the still, and the prompt says they don't move. The only motion is breath (single chest rise), hair drift, string tremor, and a one-frame release in the last 0.5s. Single physics action per Skywork's "one physics action at a time" rule.

### Failure escalation

If iter 24 still misfires after 3 attempts:
- **Escalation 1 (Plan Y-modified):** keep Plan X clip A as final-rest-pose, then run a second `videos.create` with `input_reference` set to the *last clean frame* of clip A (sora-extend pattern) for the release beat. This sidesteps the `extensions`-no-characters constraint.
- **Escalation 2 (Plan Z):** swap to **Kling 2.6 with Motion Control**. Shoot a 5-second iPhone clip of someone drawing a bow, upload as motion-control reference, apply Aurora's character to the motion. Per the comparison data, Kling outperforms Sora on hand fidelity and weapon choreography specifically. This is the intended off-ramp before Sora's 2026-09-24 shutdown anyway.

---

## Sources (fetched this session)

- [OpenAI Cookbook — Sora 2 Prompting Guide](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide)
- [OpenAI Video Generation API guide](https://developers.openai.com/api/docs/guides/video-generation)
- [OpenAI Forum — How to merge Sora2 videos](https://community.openai.com/t/how-to-merge-sora2-videos/1361454)
- [github.com/mshumer/sora-extend](https://github.com/mshumer/sora-extend)
- [Skywork — Sora 2 Troubleshooting (5 errors)](https://skywork.ai/blog/sora-2-how-to-fix-its-5-most-annoying-errors/)
- [Skywork — Behind the Scenes / Best Practices](https://skywork.ai/blog/behind-the-scenes-sora-2-technical-innovations-best-practices-2025/)
- [Skywork — Nano Banana → Sora 2 workflow](https://skywork.ai/blog/nano-banana-to-sora-2-video-workflow-explained/)
- [VEED — Effective Sora 2 Prompts](https://www.veed.io/learn/sora-2-prompts)
- [Sider.ai — Realistic Sora 2 videos guide](https://sider.ai/blog/ai-tools/how-to-create-realistic-videos-with-sora-2-without-losing-your-weekend-or-your-mind)
- [DataCamp — Sora 2 Examples & Critiques](https://www.datacamp.com/blog/sora-2)
- [sora2.ink — Camera Movement Guide](https://sora2.ink/sora-2-camera-movement-guide/)
- [sora2.ink — Sora 2 Features](https://sora2.ink/sora-2-features/)
- [CometAPI — Can Sora turn a still into motion](https://www.cometapi.com/can-sora-turn-a-still-image-into-motion/)
- [Apiyi — input_reference dimension errors](https://help.apiyi.com/en/sora-2-api-inpaint-image-size-error-solution-en.html)
- [theaivideocreator — Sora 2 Cheatsheet](https://www.theaivideocreator.ai/p/sora-2-prompting-cheatsheet)
- [PJ Ace on X — Studio Ghibli Sora prompt](https://x.com/PJaccetturo/status/1905151200099795067)
- [vidguru — Veo 3.1 vs Kling vs Sora 2](https://www.vidguru.ai/blog/veo-3.1-vs-kling-v2.1-vs-sora-2-ultimate-comparison-2025.html)
- [aimlapi — Veo 3.1 vs Sora 2 vs Kling](https://aimlapi.com/blog/google-veo-3-1)
- [vo3ai — Sora 2 Pro vs Kling 3.0 vs Veo 3.1](https://www.vo3ai.com/blog/sora-2-pro-vs-kling-30-vs-veo-31-best-ai-video-model-for-character-animation-and-2026-03-17)
- [unifically — Sora vs Kling vs Veo API comparison](https://unifically.com/blogs/sora-kling-veo-api-comparison)
