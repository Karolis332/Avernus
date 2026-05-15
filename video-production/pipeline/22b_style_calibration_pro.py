"""
Iteration 22b — STYLE + MOTION CALIBRATION (sora-2-PRO fallback)

Same 4 style variants as 22_style_calibration.py but rendered on sora-2-pro.
Use this if 22_style_calibration.py base outputs are still photoreal /
under-stylized — Pro tier holds stylized aesthetics significantly better.

Cost ceiling: ~$15-25 per round (vs ~$5 on base).

Outputs to a separate folder so base + Pro results can be compared
side-by-side without overwrite.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

HERE = Path(__file__).parent
OUT = HERE.parent / "generated" / "22b_style_cal_pro"
OUT.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

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

NEGATIONS = (
    "NOT photorealistic. NOT live-action footage. NOT a real person. NOT "
    "video-game cutscene CGI. NOT 3D-rendered photoreal."
)

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
    return f"{style_anchor} {NEGATIONS} {SUBJECT_ACTION}"


print(f"Running {len(VARIANTS)} style calibration variants on sora-2-PRO "
      f"(4s @ 1280x720)...\n")
print(f"Estimated cost: ~$3-6 per clip, ~$15-25 total\n")

for v in VARIANTS:
    out_path = OUT / f"sora-pro-{v['slug']}.mp4"
    if out_path.exists():
        print(f"[SKIP] {out_path.name}")
        continue
    print(f"== {v['slug']} ==")
    prompt = build_prompt(v["style"])
    try:
        video = client.videos.create_and_poll(
            model="sora-2-pro",
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

print("DONE. Eyeball outputs in generated/22b_style_cal_pro/.")
