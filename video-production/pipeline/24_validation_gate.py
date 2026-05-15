"""
Iteration 24 — VALIDATION GATE (~$0.75 total spend)

Per v3 readiness report: pre-spend gate to validate the HYBRID pipeline
before any further full-shot generation. Tests THE THREE failures from
iter 23 (arrowhead drift, wrong grip, broken bimanual motion) head-to-head
on Sora 2 base vs Kling 2.6 Pro, with a clean anchor still locking the
hard pose at frame 1.

Phases (auto-resume per phase via [SKIP] caching):

  Phase A — Anchor still generation (~$0.05)
    fal.ai Flux 1.1 Pro Ultra at 16:9 → Pillow letterbox to exact 1280x720.
    Atomic anatomical description of the three-finger Mediterranean grip.
    User can replace the cached PNG manually if the auto-gen still is off,
    then re-run; phases B+C will pick up the replacement.

  Phase B — Sora 2 base render (~$0.40, standard tier for fast feedback)
    Locked-pose prompt with Cookbook-verified style line.
    input_reference = anchor still (locks frame 1).
    extra_body characters[0][id] = Aurora character_id from iter 23.
    4s @ 1280x720.

  Phase C — Kling 2.6 Pro image-to-video (~$0.30)
    Same anchor still, same locked-pose prompt.
    No motion-control reference (skipped for validation; would require
    an iPhone clip we don't have yet).
    5s @ 1080p with audio.

Compare A/B/C side-by-side. Decision matrix:
  - Sora wins on hands → Plan X (locked-pose Sora) confirmed for character shots
  - Kling wins on hands → escalate to Plan Z (Kling Motion Control) for hero combat
  - Both fail   → still is wrong; escalate image gen to MJ + Nano Banana refine

Production tier (iter 25+) switches Sora to batch tier (50% off) once the
technique is proven to work at standard tier here.
"""
import json
import os
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except Exception:
    pass

import fal_client
import requests
from dotenv import load_dotenv
from openai import OpenAI
from PIL import Image

HERE = Path(__file__).parent
OUT = HERE.parent / "generated" / "24_validation_gate"
OUT.mkdir(parents=True, exist_ok=True)

# Reuse Aurora character_id from iter 23 cache
ITER23_CHARACTER_CACHE = (
    HERE.parent / "generated" / "23_style_cal_v2" / "aurora_character.json"
)

ANCHOR_STILL_RAW = OUT / "aurora_anchor_raw.png"
ANCHOR_STILL = OUT / "aurora_anchor_1280x720.png"
SORA_OUT = OUT / "B_sora2_base_locked_pose.mp4"
KLING_OUT = OUT / "C_kling26_pro_i2v.mp4"

SIZE_W, SIZE_H = 1280, 720
SIZE_STR = "1280x720"

load_dotenv(HERE / ".env")
openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
os.environ.setdefault("FAL_KEY", os.environ["FAL_KEY"])


# ---------------------------------------------------------------------------
# Shared style + scene description (Cookbook-aligned per v3 research)
# ---------------------------------------------------------------------------

# Cookbook-verified opener (only stylized-animation style line OpenAI itself
# ships with a linked working sora-2 result). Supplement with our chiaroscuro
# + teal-amber descriptors which are untested but cheap.
STYLE_OPENER = (
    "Style: Hand-painted 2D/3D hybrid animation with soft brush textures, "
    "warm tungsten lighting, and a tactile, stop-motion feel. Painterly "
    "brushwork, bold ink linework, dramatic chiaroscuro shadows, saturated "
    "teal-and-amber palette, 24fps animated cadence with held expressive "
    "keyframes. Painted backgrounds, animated film grade. Not "
    "photorealistic, not 3D-rendered CGI, not anime cel-shading."
)

AURORA_AT_FULL_DRAW = (
    "Aurora is a stylized animated astral elf woman with long flowing "
    "silver-white hair, luminous pale skin with delicate silver fey-tracery "
    "patterns on her cheeks, sharp jade-green eyes, a small teal gemstone "
    "in a silver fey circlet on her forehead. She wears a high-collar dark "
    "olive-green traveling robe with silver Celtic-knotwork embroidery and "
    "a teal pendant.\n\n"
    "She is at full draw on an ornate silver recurve longbow. THREE-FINGER "
    "MEDITERRANEAN GRIP on the bowstring: index finger above the nocked "
    "arrow, middle and ring fingers below the nock, thumb relaxed and "
    "curled inward. The string sits in the distal pads of her fingers — "
    "NOT in the palm, fingers do NOT wrap the arrow shaft itself. A SINGLE "
    "broadhead arrow is nocked on the string, arrowhead forward at the "
    "bow's riser, fletching at her right cheek anchor just under the "
    "corner of her mouth. Left arm fully extended, locked at the elbow, "
    "left hand wrapped around the longbow grip. Recurve bent into a clean "
    "D-shape. Both arms are locked rigid in this held pose. Three-quarter "
    "front view, mid-chest framing.\n\n"
    "The arrow is a rigid body — the arrowhead is at the bow's riser end, "
    "the fletching is at her ear, and this geometry stays pixel-stable "
    "throughout. Object permanence maintained on the arrow."
)

ANIMATE_ONLY_MICRO_MOTION = (
    "Cinematography:\n"
    "  Camera: STATIC LOCKED OFF, no pan, no push, no tilt. Mid-chest "
    "framing, three-quarter front view.\n"
    "  Lens: 50mm equivalent, f/4 depth of field.\n"
    "  Lighting: warm amber key from camera-right, cool teal rim from "
    "camera-left.\n"
    "  Mood: held tension, breath-hold, eye on target.\n\n"
    "Actions:\n"
    "  - Beat 1 (0.0-2.0s): Aurora holds full draw, motionless. Her chest "
    "rises and falls once with a slow inhale. Loose strands of hair drift "
    "in a faint breeze. Eyes lock on an off-screen target down-frame.\n"
    "  - Beat 2 (2.0-3.5s): the bowstring trembles by one pixel from held "
    "tension. Arrowhead does not move. Fingers do not reposition.\n"
    "  - Beat 3 (3.5-4.0s): the string releases — fingers open in one "
    "frame, string snaps forward, arrow exits frame-right with natural "
    "motion blur on a 180-degree shutter. Fingers and bow-arm stay in "
    "their original positions through the release.\n\n"
    "Background Sound: faint cavern wind, single bowstring twang on "
    "release, no music."
)

EXCLUDE_TAIL = (
    "Exclude: duplicated arrows, multiple arrowheads, arrowhead drifting "
    "along the shaft, fused or extra fingers, palm grip, fist grip, "
    "fingers wrapping the arrow shaft, both arms moving, camera movement, "
    "photorealistic skin pores, rotoscope smoothness, foot sliding, "
    "ghosting limbs, motion morphing, anime cel-shading, 3D-rendered CGI "
    "look, 8K detail, DSLR look."
)


def build_locked_pose_prompt() -> str:
    return (
        f"{STYLE_OPENER}\n\n"
        f"{AURORA_AT_FULL_DRAW}\n\n"
        f"{ANIMATE_ONLY_MICRO_MOTION}\n\n"
        f"{EXCLUDE_TAIL}"
    )


# ---------------------------------------------------------------------------
# Phase A — Anchor still gen via fal.ai Flux 1.1 Pro Ultra
# ---------------------------------------------------------------------------

ANCHOR_STILL_PROMPT = (
    "Painterly hand-painted 2D/3D hybrid fantasy animation illustration, "
    "soft brush textures, dramatic chiaroscuro, saturated teal-and-amber "
    "palette, bold ink linework, animated film grade. Not photorealistic.\n\n"
    + AURORA_AT_FULL_DRAW
    + "\n\nLighting: warm amber key from camera-right, cool teal rim from "
    "camera-left. Background: dark Avernus stone tunnel, blurred and "
    "out-of-focus, single flickering hellforge brazier off screen-left. "
    "Single arrow only, one arrowhead at the bow's riser end. Anatomically "
    "correct three-finger Mediterranean archery grip."
)


def generate_anchor_still() -> Path:
    """fal.ai Flux 1.1 Pro Ultra → 16:9 raw → Pillow letterbox to 1280x720."""
    if ANCHOR_STILL.exists():
        print(f"[SKIP] {ANCHOR_STILL.name} already present (manual replace OK).")
        return ANCHOR_STILL

    if not ANCHOR_STILL_RAW.exists():
        print("== Phase A: generating anchor still via fal Flux 1.1 Pro Ultra")
        result = fal_client.subscribe(
            "fal-ai/flux-pro/v1.1-ultra",
            arguments={
                "prompt": ANCHOR_STILL_PROMPT,
                "aspect_ratio": "16:9",
                "num_images": 1,
                "enable_safety_checker": False,
                "raw": False,
            },
            with_logs=False,
        )
        # fal returns {"images": [{"url": ..., "width": ..., "height": ...}]}
        url = result["images"][0]["url"]
        print(f"  [OK] Generated -> {url}")
        resp = requests.get(url, timeout=60)
        resp.raise_for_status()
        ANCHOR_STILL_RAW.write_bytes(resp.content)
        print(f"  [OK] Downloaded -> {ANCHOR_STILL_RAW.name} "
              f"({len(resp.content)/1024:.0f} KB)")

    # Letterbox to exact 1280x720 (Sora rejects mismatched dims)
    img = Image.open(ANCHOR_STILL_RAW).convert("RGB")
    img.thumbnail((SIZE_W, SIZE_H), Image.LANCZOS)
    canvas = Image.new("RGB", (SIZE_W, SIZE_H), (16, 12, 18))
    cx = (SIZE_W - img.width) // 2
    cy = (SIZE_H - img.height) // 2
    canvas.paste(img, (cx, cy))
    canvas.save(ANCHOR_STILL, "PNG")
    print(f"  [OK] Letterboxed -> {ANCHOR_STILL.name} ({SIZE_W}x{SIZE_H})")
    return ANCHOR_STILL


# ---------------------------------------------------------------------------
# Phase B — Sora 2 base render with locked-pose + Characters API
# ---------------------------------------------------------------------------

def load_aurora_character() -> dict:
    if not ITER23_CHARACTER_CACHE.exists():
        raise RuntimeError(
            f"Aurora character cache missing at {ITER23_CHARACTER_CACHE}. "
            "Run iter 23 bootstrap first."
        )
    return json.loads(ITER23_CHARACTER_CACHE.read_text(encoding="utf-8"))


def render_sora(anchor_path: Path, character: dict) -> Path:
    if SORA_OUT.exists():
        print(f"[SKIP] {SORA_OUT.name} already rendered.")
        return SORA_OUT
    print(f"\n== Phase B: Sora 2 base render (locked-pose + character_id={character['id']})")
    prompt = build_locked_pose_prompt()
    with open(anchor_path, "rb") as ref:
        video = openai_client.videos.create_and_poll(
            model="sora-2",
            prompt=prompt,
            seconds="4",
            size=SIZE_STR,
            input_reference=ref,
            extra_body={"characters[0][id]": character["id"]},
        )
    print(f"  status: {video.status}, id: {video.id}")
    if video.status != "completed":
        raise RuntimeError(f"Sora render failed: {video.error}")
    content = openai_client.videos.download_content(video.id, variant="video")
    content.write_to_file(str(SORA_OUT))
    mb = SORA_OUT.stat().st_size / (1024 * 1024)
    print(f"  [OK] {SORA_OUT.name} ({mb:.1f} MB)")
    return SORA_OUT


# ---------------------------------------------------------------------------
# Phase C — Kling 2.6 Pro image-to-video on fal.ai
# ---------------------------------------------------------------------------

def render_kling(anchor_path: Path) -> Path:
    if KLING_OUT.exists():
        print(f"[SKIP] {KLING_OUT.name} already rendered.")
        return KLING_OUT
    print("\n== Phase C: Kling 2.6 Pro image-to-video (fal.ai)")
    # Upload anchor still to fal CDN so Kling can fetch it
    image_url = fal_client.upload_file(str(anchor_path))
    print(f"  Uploaded anchor -> {image_url}")
    # Kling i2v doesn't take long-form Cookbook prompts well; collapse to
    # the action-only descriptor per fal Kling guide ("focus on how the
    # character looks and the environment").
    kling_prompt = (
        "An astral elf archer in dark olive robe holds full draw on a "
        "silver longbow with a single nocked arrow, three-finger Mediterranean "
        "grip on the string, both arms locked rigid, breath held. The "
        "bowstring trembles with held tension, hair drifts faintly. In the "
        "final half second the string releases and the arrow exits "
        "frame-right with natural motion blur. Painterly hand-painted 2D/3D "
        "hybrid animation, dramatic chiaroscuro, saturated teal-and-amber "
        "palette."
    )
    result = fal_client.subscribe(
        "fal-ai/kling-video/v2.6/pro/image-to-video",
        arguments={
            "prompt": kling_prompt,
            "image_url": image_url,
            "duration": "5",  # Kling 2.6 supports "5" or "10"
            "negative_prompt": (
                "duplicated arrows, multiple arrowheads, fused fingers, "
                "palm grip, fist grip, fingers wrapping the arrow shaft, "
                "camera movement, photorealistic skin pores, ghosting limbs"
            ),
            "cfg_scale": 0.5,
        },
        with_logs=False,
    )
    video_url = result["video"]["url"]
    print(f"  [OK] Generated -> {video_url}")
    resp = requests.get(video_url, timeout=120)
    resp.raise_for_status()
    KLING_OUT.write_bytes(resp.content)
    mb = KLING_OUT.stat().st_size / (1024 * 1024)
    print(f"  [OK] {KLING_OUT.name} ({mb:.1f} MB)")
    return KLING_OUT


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    print("=" * 64)
    print("Iter 24 — VALIDATION GATE (~$0.75 budget)")
    print("=" * 64)

    # Phase A
    anchor = generate_anchor_still()

    # Phase B (Sora 2)
    character = load_aurora_character()
    try:
        render_sora(anchor, character)
    except Exception as e:
        print(f"  [FAIL Sora] {str(e)[:300]}")

    # Phase C (Kling 2.6 Pro)
    try:
        render_kling(anchor)
    except Exception as e:
        print(f"  [FAIL Kling] {str(e)[:300]}")

    print()
    print("=" * 64)
    print("DONE.")
    print(f"Outputs: {OUT}")
    print("Compare side-by-side:")
    print(f"  A. {ANCHOR_STILL.name}  (anchor still)")
    print(f"  B. {SORA_OUT.name}  (Sora 2 base, locked-pose, Aurora-locked)")
    print(f"  C. {KLING_OUT.name}  (Kling 2.6 Pro, image-to-video)")
    print()
    print("Decision matrix:")
    print("  Sora wins on hands -> Plan X confirmed (locked-pose Sora) for character shots")
    print("  Kling wins on hands -> escalate to Kling Motion Control for hero combat")
    print("  Both fail            -> still is wrong; escalate image gen to MJ+Nano Banana")


if __name__ == "__main__":
    main()
