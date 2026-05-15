"""
Iteration 23 — STYLE + MOTION CALIBRATION v2
Apply 2026 Sora 2 best practices from sora-research-2026.md.

Key changes vs iter 22:
  * Style: line FIRST (OpenAI Cookbook template ordering)
  * Vox Machina + Fortiche (Arcane) anchor — only style language proven to
    invoke stylized animation on sora-2.
  * Single-object pinning ("a single longbow with one nocked arrow" + "the
    same arrowhead from start to finish; no duplicate arrows")
  * 180-degree shutter / motion blur permission
  * Beat-timed Actions block (anticipation → draw → anchor) per Cookbook
  * Trailing exclude: block (duplicated arrows, ghosting limbs, photoreal
    skin, rotoscope smoothness)
  * Stripped photoreal-leakage terms (cinematic / 8K / DSLR / realistic)
  * One camera move per shot
  * Characters API for ~95% Aurora consistency across all calibration
    variants — bootstrapped from a clean reference clip + cached locally

Two-phase workflow (auto-resumes per phase):

  Phase A — Aurora character bootstrap (one-time):
    1. Resize aurora-portrait-01.png → 1280x720 letterboxed PNG
    2. Generate one neutral 4s reference clip via Sora using that PNG as
       input_reference + style-first prompt
    3. Upload that MP4 via videos.create_character → character_id
    4. Cache id + name to aurora_character.json

  Phase B — Style calibration variants:
    For each of 4 style anchors, render bow-draw shot using the new template
    + extra_body={"characters": [{"id": ...}]} so Aurora stays locked.

Cost ceiling: Phase A ~$1.50 (one-time). Phase B ~$5-7 per round.
"""
import json
import os
import sys
from pathlib import Path

# Windows cp1252 console can't print Unicode arrows / em-dashes — force UTF-8.
try:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except Exception:
    pass

from dotenv import load_dotenv
from openai import OpenAI
from PIL import Image

HERE = Path(__file__).parent
OUT = HERE.parent / "generated" / "23_style_cal_v2"
OUT.mkdir(parents=True, exist_ok=True)
REF_DIR = HERE.parent / "refs" / "aurora"
CHARACTER_CACHE = OUT / "aurora_character.json"
AURORA_REF_RESIZED = OUT / "aurora_ref_1280x720.png"
AURORA_REF_CLIP = OUT / "aurora_character_base.mp4"
AURORA_REF_CLIP_TRIMMED = OUT / "aurora_character_base_trimmed.mp4"
# Characters API requires 2.0 <= duration <= 4.0 seconds. Sora often returns
# slightly over (~4.30s). Trim to a safe 3.8s before upload.
CHARACTER_TRIM_SECONDS = 3.8

SIZE = "1280x720"
TARGET_W, TARGET_H = 1280, 720

load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


# Reusable style anchors per research §6.
STYLE_VOXFORTICHE = (
    "Style: 2D-3D hybrid animation in the style of Fortiche (Arcane) and "
    "Titmouse (The Legend of Vox Machina). Hand-painted brushwork, bold "
    "ink linework, dramatic chiaroscuro shadows, saturated teal-and-amber "
    "palette, 24fps animated cadence with held expressive keyframes. "
    "Painted backgrounds, animated film grade. Not photorealistic, not "
    "3D-rendered CGI, not anime cel-shading."
)

STYLE_PAINTERLY = (
    "Style: Painterly hand-drawn 2D fantasy animation with oil-painted "
    "textures and visible brushstrokes. Bold ink outlines on characters, "
    "dramatic chiaroscuro, rich saturated palette with teal and amber "
    "accents. 24fps animated cadence, hand-keyed, no rotoscope smoothness. "
    "Painted backgrounds, animated film grade. Not photorealistic, not "
    "3D-rendered CGI."
)

STYLE_TITMOUSE = (
    "Style: Hand-keyed 2D animated fantasy in the limited-animation tradition "
    "of Titmouse (Vox Machina) and Powerhouse (Castlevania). Bold ink "
    "linework, flat saturated color regions with painted-texture overlays, "
    "anime-style highlight pops, dramatic shadow contrast. 24fps animated "
    "cadence with held expressive frames. Painted backgrounds. Not "
    "photorealistic, not 3D CGI."
)

STYLE_HYBRID_OIL = (
    "Style: 2D-3D hybrid animation, hand-painted oil-on-canvas textures with "
    "visible brushstrokes, soft watercolor wash on backgrounds, bold ink "
    "linework on characters, filmic motion blur for animated realism. "
    "Saturated teal-amber palette, dramatic chiaroscuro lighting, 24fps "
    "animated cadence. Animated film grade. Not photorealistic, not 3D "
    "CGI, not anime."
)

# ---------------------------------------------------------------------------
# Phase A — Aurora character bootstrap
# ---------------------------------------------------------------------------

def resize_aurora_ref() -> Path:
    """Letterbox aurora-portrait-01.png to exact 1280x720."""
    if AURORA_REF_RESIZED.exists():
        print(f"[SKIP] {AURORA_REF_RESIZED.name} already resized.")
        return AURORA_REF_RESIZED
    src = REF_DIR / "aurora-portrait-01.png"
    img = Image.open(src).convert("RGB")
    # Fit-within with letterbox (preserves aspect, no distortion)
    img.thumbnail((TARGET_W, TARGET_H), Image.LANCZOS)
    canvas = Image.new("RGB", (TARGET_W, TARGET_H), (16, 12, 18))  # near-black
    cx = (TARGET_W - img.width) // 2
    cy = (TARGET_H - img.height) // 2
    canvas.paste(img, (cx, cy))
    canvas.save(AURORA_REF_RESIZED, "PNG")
    print(f"[OK] Resized aurora ref → {AURORA_REF_RESIZED.name} ({TARGET_W}x{TARGET_H})")
    return AURORA_REF_RESIZED


AURORA_LORE = (
    "Aurora is a stylized animated astral elf woman: long flowing "
    "silver-white hair, luminous pale skin with delicate silver fey-tracery "
    "patterns on her cheeks like frostwork, sharp jade-green eyes, a small "
    "teal gemstone set in a silver fey circlet on her forehead. She wears a "
    "high-collar dark olive-green traveling robe with silver Celtic-knotwork "
    "embroidery and a teal pendant. Painted-illustration look, not "
    "photorealistic."
)


def bootstrap_aurora_reference_clip(ref_image_path: Path) -> Path:
    """Generate a clean 4s Aurora reference clip for Characters API upload."""
    if AURORA_REF_CLIP.exists():
        print(f"[SKIP] {AURORA_REF_CLIP.name} already rendered.")
        return AURORA_REF_CLIP
    prompt = (
        f"{STYLE_VOXFORTICHE}\n\n"
        f"{AURORA_LORE}\n\n"
        "Aurora stands centered in three-quarter profile against a softly "
        "out-of-focus dark stone background. She is calm, breathing slowly, "
        "looking off-camera-left. Her hair drifts gently in a faint breeze.\n\n"
        "Cinematography:\n"
        "  Camera: locked-off medium portrait, no movement.\n"
        "  Lens: 50mm equivalent, shallow depth of field.\n"
        "  Lighting: warm key from camera-left, cool teal rim from "
        "camera-right; dramatic chiaroscuro.\n"
        "  Mood: serene, anticipatory.\n\n"
        "Actions:\n"
        "  - Beat 1 (0-2s): she breathes in slowly, eyes steady.\n"
        "  - Beat 2 (2-4s): her gaze drifts a fraction toward camera; the "
        "fey-tracery on her cheeks faintly catches the light.\n\n"
        "Background Sound: soft distant ambient hum, subtle breath.\n\n"
        "exclude: photorealistic skin pores, duplicated features, ghosting "
        "limbs, rotoscope smoothness, multiple Auroras, 8K detail, DSLR "
        "look, anime cel-shading."
    )
    print("== Bootstrapping Aurora reference clip (sora-2 base, 4s, 1280x720)")
    with open(ref_image_path, "rb") as ref:
        video = client.videos.create_and_poll(
            model="sora-2",
            prompt=prompt,
            seconds="4",
            size=SIZE,
            input_reference=ref,
        )
    print(f"  status: {video.status}, id: {video.id}")
    if video.status != "completed":
        raise RuntimeError(f"Aurora bootstrap clip failed: {video.error}")
    content = client.videos.download_content(video.id, variant="video")
    content.write_to_file(str(AURORA_REF_CLIP))
    mb = AURORA_REF_CLIP.stat().st_size / (1024 * 1024)
    print(f"  [OK] {AURORA_REF_CLIP.name} ({mb:.1f} MB)")
    return AURORA_REF_CLIP


def trim_clip_for_character_api(source: Path, target: Path,
                                max_seconds: float = CHARACTER_TRIM_SECONDS) -> Path:
    """Re-encode video to <= max_seconds. Characters API requires 2-4s and
    Sora often returns ~4.30s. Re-encode (not stream copy) to hit exact length."""
    if target.exists():
        print(f"[SKIP] {target.name} already trimmed.")
        return target
    import subprocess
    import imageio_ffmpeg
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg, "-y", "-i", str(source),
        "-t", f"{max_seconds:.2f}",
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-c:a", "copy",
        "-movflags", "+faststart",
        str(target),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg trim failed: {result.stderr[-500:]}")
    mb = target.stat().st_size / (1024 * 1024)
    print(f"  [OK] Trimmed -> {target.name} ({mb:.1f} MB, {max_seconds:.1f}s)")
    return target


def get_or_create_aurora_character(ref_clip_path: Path) -> dict:
    """Upload Aurora ref clip → Characters API, cache id locally."""
    if CHARACTER_CACHE.exists():
        cached = json.loads(CHARACTER_CACHE.read_text(encoding="utf-8"))
        print(f"[SKIP] Aurora character cached: id={cached['id']}")
        return cached
    print("== Uploading Aurora reference clip to Characters API")
    with open(ref_clip_path, "rb") as f:
        resp = client.videos.create_character(name="Aurora", video=f)
    # Response has .id; convert to dict for caching
    payload = {
        "id": getattr(resp, "id", None),
        "name": "Aurora",
        "raw": resp.model_dump() if hasattr(resp, "model_dump") else str(resp),
    }
    CHARACTER_CACHE.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"  [OK] character_id={payload['id']}")
    return payload


# ---------------------------------------------------------------------------
# Phase B — Style calibration variants (bow draw)
# ---------------------------------------------------------------------------

def build_bow_draw_prompt(style_anchor: str) -> str:
    """OpenAI Cookbook template: Style → Scene → Cinematography → Actions →
    Background Sound → exclude. Single camera move. Single subject action."""
    return (
        f"{style_anchor}\n\n"
        f"{AURORA_LORE} She stands in profile facing screen-right in a dark "
        "Avernus stone tunnel lit by a single flickering hellforge brazier "
        "off screen-left. She holds a single ornate silver longbow in her "
        "left hand with one nocked silver-gold starlight arrow on the "
        "string — the same arrowhead remains visible from start to finish; "
        "no duplicate arrows.\n\n"
        "Cinematography:\n"
        "  Camera: slow 35mm push-in from medium to medium-close, locked "
        "horizon, single continuous move.\n"
        "  Lens: 50mm equivalent, shallow depth of field, subject sharp.\n"
        "  Lighting: warm amber key from screen-left, cool teal rim from "
        "screen-right; dramatic chiaroscuro shadows on the tunnel walls.\n"
        "  Mood: focused, anticipatory, controlled tension.\n\n"
        "Actions:\n"
        "  - Beat 1 (0-1s): Aurora's right hand grips the bowstring at a "
        "three-finger draw; her stance settles, weight back foot.\n"
        "  - Beat 2 (1-3s): in one continuous motion she draws the bow "
        "smoothly to a cheek anchor; the starlight arrow stays one single "
        "arrow throughout; her hair lifts a fraction with the motion.\n"
        "  - Beat 3 (3-4s): held at full draw, breath held, eye locked on "
        "target down-frame; the bowstring trembles with tension.\n\n"
        "Background Sound: low cavern ambience, distant chain rattle, soft "
        "creak of bowstring tension, controlled breath.\n\n"
        "180-degree shutter, natural motion blur on the bowstring during "
        "the draw; one continuous motion, no morphing between frames.\n\n"
        "exclude: duplicated arrows, multiple arrowheads, extra fingers, "
        "ghosting limbs, photorealistic skin pores, rotoscope smoothness, "
        "rolling-shutter wobble, foot sliding, motion morphing, anime "
        "cel-shading, 3D-rendered CGI look, DSLR photoreal grade, 8K detail."
    )


VARIANTS = [
    {"slug": "v01-voxfortiche", "style": STYLE_VOXFORTICHE},
    {"slug": "v02-painterly",   "style": STYLE_PAINTERLY},
    {"slug": "v03-titmouse",    "style": STYLE_TITMOUSE},
    {"slug": "v04-hybrid-oil",  "style": STYLE_HYBRID_OIL},
]


def render_calibration(character: dict) -> None:
    print(f"\nRunning {len(VARIANTS)} calibration variants on sora-2 base "
          f"(4s @ {SIZE}) with character_id={character['id']}\n")
    for v in VARIANTS:
        out_path = OUT / f"sora-{v['slug']}.mp4"
        if out_path.exists():
            print(f"[SKIP] {out_path.name}")
            continue
        prompt = build_bow_draw_prompt(v["style"])
        print(f"== {v['slug']} ==")
        try:
            video = client.videos.create_and_poll(
                model="sora-2",
                prompt=prompt,
                seconds="4",
                size=SIZE,
                # Multipart form encoding requires explicit array indices —
                # nested {"characters": [{"id": ...}]} flattens incorrectly to
                # `characters[].id` which the API rejects. Use bracket notation.
                extra_body={"characters[0][id]": character["id"]},
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


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    print("=" * 64)
    print("Phase A: Aurora character bootstrap")
    print("=" * 64)
    ref_image = resize_aurora_ref()
    ref_clip = bootstrap_aurora_reference_clip(ref_image)
    ref_clip_trimmed = trim_clip_for_character_api(ref_clip, AURORA_REF_CLIP_TRIMMED)
    character = get_or_create_aurora_character(ref_clip_trimmed)

    print()
    print("=" * 64)
    print("Phase B: Style calibration with locked Aurora")
    print("=" * 64)
    render_calibration(character)

    print("\nDONE.")
    print(f"Outputs: {OUT}")
    print("Compare to iter 22 outputs in generated/22_style_cal/ —")
    print("expect (1) less arrowhead duplication, (2) Aurora identity locked,")
    print("(3) more deliberate animated cadence vs floaty AI motion.")


if __name__ == "__main__":
    main()
