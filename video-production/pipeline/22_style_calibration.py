"""
Iteration 22 — STYLE + MOTION CALIBRATION

Goal: lock the Vox Machina-style animated aesthetic + fluid motion on the
cheapest possible Sora-2 config before scaling to the full 15-shot pipeline.

Strategy:
  - Single subject (Aurora drawing the Moonbow) — known character archetype,
    fluid motion test (draw + nock + release), single-character (no monster
    rendering risk yet), VFX is just bowstring glow.
  - 4 prompt variants per run, varying ONLY the style anchor language.
  - sora-2 BASE tier, 4s, 1280x720 = ~$1-1.50 per clip, ~$4-6 total per run.
  - Style anchor LEADS the prompt; lore + action follow; negations front-loaded.
  - Same seed action across all 4 → A/B comparable.

Workflow:
  1. Run script. Eyeball 4 outputs.
  2. Pick winner(s). Comment out losers in VARIANTS list.
  3. Tweak surviving prompts (motion language, negation placement, etc).
  4. Rerun. Repeat until style + animation both locked.
  5. Once locked, port the winning style anchor into 23_full_pipeline.py.

Cost ceiling: ~$6 per calibration round.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

HERE = Path(__file__).parent
OUT = HERE.parent / "generated" / "22_style_cal"
OUT.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# Subject is identical across all variants — only style anchor differs.
SUBJECT_ACTION = (
    "An astral elf woman with long flowing silver-white hair, luminous pale skin, "
    "and sharp jade-green eyes, wearing a high-collar dark olive-green traveling "
    "robe with silver embroidery, stands in profile facing screen-right. She "
    "smoothly draws an ornate silver shortbow to her cheek in fluid slow-motion. "
    "As she draws, a radiant silver-gold arrow of pure starlight materializes on "
    "the bowstring, blooming with a golden corona of light. Her hair drifts "
    "gently in an unseen breeze. Dark stone tunnel setting with flickering "
    "orange-red brazier light from screen-left."
)

# Negation block — front-loaded so Sora doesn't anchor to its photoreal default.
NEGATIONS = (
    "NOT photorealistic. NOT live-action footage. NOT a real person. NOT "
    "video-game cutscene CGI. NOT 3D-rendered photoreal."
)

# Variants test 4 different style anchor strategies.
VARIANTS = [
    {
        "slug": "v01-voxmachina",
        "style": (
            "Hand-drawn 2D animated fantasy cinematic in the visual style of "
            "Critical Role: The Legend of Vox Machina (animated series). "
            "Painterly hand-painted backgrounds, bold ink linework on characters, "
            "rich saturated colors with strong shadow contrast, expressive "
            "frame-by-frame animation, anime-inspired motion easing. "
            "Cel-shaded surfaces. Every frame alive with fluid motion."
        ),
    },
    {
        "slug": "v02-arcane",
        "style": (
            "Stylized 2.5D animated cinematic in the visual style of Netflix's "
            "Arcane (Fortiche Studio). Painterly textured surfaces with visible "
            "brushstrokes, hand-keyed character animation with snappy fluid "
            "easing, dramatic rim lighting and color-graded palette, ink-line "
            "outlines integrated into the painterly look. Painted-frame aesthetic, "
            "every shot composed like a moving illustration."
        ),
    },
    {
        "slug": "v03-celshaded",
        "style": (
            "Cel-shaded 3D fantasy animation with bold ink-line outlines, flat "
            "saturated color regions, anime-style highlight pops, and painterly "
            "background plates. Inspired by Castlevania (Powerhouse Animation) "
            "and Genndy Tartakovsky fight cinematography. Smooth fluid character "
            "motion with anticipation-and-release timing. Strongly stylized — "
            "looks like a frame from an animated film, not a render."
        ),
    },
    {
        "slug": "v04-ghibli-fantasy",
        "style": (
            "Hand-painted 2D fantasy animation in the tradition of Studio Ghibli "
            "and classic Disney key-frame animation, fused with dark-fantasy D&D "
            "tone. Watercolor-painted backgrounds, expressive character "
            "animation with weight and follow-through, soft volumetric lighting, "
            "warm-and-cool color palette. Animated film aesthetic — every frame "
            "could be a painted cel."
        ),
    },
]


def build_prompt(style_anchor: str) -> str:
    # Order matters: style anchor + negations FIRST, subject + action SECOND.
    # Sora 2 weights leading tokens harder than trailing ones.
    return f"{style_anchor} {NEGATIONS} {SUBJECT_ACTION}"


print(f"Running {len(VARIANTS)} style calibration variants on sora-2 base "
      f"(4s @ 1280x720)...\n")
print(f"Estimated cost: ~$1-1.50 per clip, ~${len(VARIANTS)}-{len(VARIANTS)*1.5:.0f} "
      f"total\n")

for v in VARIANTS:
    out_path = OUT / f"sora-{v['slug']}.mp4"
    if out_path.exists():
        print(f"[SKIP] {out_path.name}")
        continue
    print(f"== {v['slug']} ==")
    prompt = build_prompt(v["style"])
    try:
        video = client.videos.create_and_poll(
            model="sora-2",
            prompt=prompt,
            seconds="4",
            size="1280x720",
        )
        print(f"  status: {video.status}, id: {video.id}")
        if video.status == "completed":
            content = client.videos.download_content(video.id, variant="video")
            content.write_to_file(str(out_path))
            mb = out_path.stat().st_size / (1024 * 1024)
            print(f"  [OK] {out_path.name} ({mb:.1f} MB)")
        else:
            print(f"  [FAIL] {video.error}")
    except Exception as e:
        print(f"  [FAIL] {str(e)[:300]}")
    print()

print("DONE. Eyeball outputs in generated/22_style_cal/.")
print("Pick the winning style anchor, then iterate motion/negation language.")
