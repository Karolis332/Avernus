"""
Phase 3: Generate motion clips for hero shots via Kling 2.1 Standard (fal.ai).

Only 7 of the 22 scene shots need motion — the rest will get Ken Burns
pan-zoom in DaVinci Resolve (free, fast, aesthetic-appropriate).

Cost: ~$0.25/5s clip * 7 = ~$1.75.
"""
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
SCENE_DIR = HERE.parent / "generated" / "02_scene_shots"
OUT_DIR = HERE.parent / "generated" / "03_motion_clips"
OUT_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(HERE / ".env")

MOTION_SHOTS = [
    {
        "still": SCENE_DIR / "shot-03-chain-devil-drops.png",
        "slug": "03-chain-devil-drops",
        "prompt": (
            "The chain devil drops silently from the shadowed ceiling alcove, chains "
            "whipping from the stone walls behind it, hellforge embers trailing off the "
            "barbs. Slow descent into a defensive crouch. Subtle ash particles drifting "
            "in the red corridor light. Cinematic slow motion, painterly oil-painting "
            "aesthetic preserved throughout."
        ),
    },
    {
        "still": SCENE_DIR / "shot-07-word-of-radiance.png",
        "slug": "07-word-of-radiance",
        "prompt": (
            "A column of pure golden Lathandrian sunlight erupts outward from the cleric "
            "at the center — radiant beams lancing in every direction, expanding rapidly "
            "and bathing the bone-ribbed corridor in holy fire. The cleric stands resolute "
            "within the light, shield raised. Camera stays mostly static to emphasize the "
            "light expansion. Painterly oil-painting aesthetic."
        ),
    },
    {
        "still": SCENE_DIR / "shot-10-arrow-materializes.png",
        "slug": "10-arrow-materializes",
        "prompt": (
            "A radiant arrow of silver starlight materializes on the bowstring from thin "
            "air — particles of silver-gold light coalescing into solid form, a radiant "
            "corona blooming around the arrow. Slow motion, macro focus on the arrow. "
            "The astral elf's drawn hand and focused eye visible in soft focus behind. "
            "Painterly oil-painting aesthetic."
        ),
    },
    {
        "still": SCENE_DIR / "shot-12-arrow-flight.png",
        "slug": "12-arrow-flight",
        "prompt": (
            "A radiant silver-gold arrow streaks across the dark infernal corridor at "
            "blinding speed, leaving a comet trail of radiant starlight behind it. "
            "Horizontal camera track follows the arrow flight, dramatic motion blur. "
            "Painterly oil-painting aesthetic preserved."
        ),
    },
    {
        "still": SCENE_DIR / "shot-13-chain-devil-impact.png",
        "slug": "13-chain-devil-impact",
        "prompt": (
            "The chain devil is struck by the radiant arrow — a silver-gold burst of holy "
            "light erupts from its chest wound, its body arches backward mid-fall, chains "
            "clattering loose and falling slack. The radiant light consumes the infernal "
            "figure as it collapses. Cinematic slow motion, painterly oil-painting "
            "aesthetic."
        ),
    },
    {
        "still": SCENE_DIR / "shot-17-psychic-daggers-form.png",
        "slug": "17-psychic-daggers-form",
        "prompt": (
            "Violet psionic mist coils around the rogue's gloved palms and condenses into "
            "two translucent shimmering violet psychic daggers — blades of smoke and light "
            "taking solid form. Macro focus on the hands, face shadowed behind. Subtle "
            "crackling psionic energy. Painterly oil-painting aesthetic."
        ),
    },
    {
        "still": SCENE_DIR / "shot-19-sneak-attack-strike.png",
        "slug": "19-sneak-attack-strike",
        "prompt": (
            "Two translucent violet psychic daggers drive forward from behind into the "
            "chain devil's back — purple psionic light bursts out through the devil's "
            "ribcage in a brilliant violet flash. Fast dynamic strike, motion blur on the "
            "daggers, explosive critical-hit moment. Painterly oil-painting aesthetic "
            "preserved."
        ),
    },
]


def to_data_uri(path: Path) -> str:
    b64 = base64.b64encode(path.read_bytes()).decode()
    return f"data:image/png;base64,{b64}"


def gen_clip(shot: dict):
    slug = shot["slug"]
    out_path = OUT_DIR / f"clip-{slug}.mp4"
    if out_path.exists():
        print(f"  [SKIP] {out_path.name} already exists")
        return True

    print(f"  Prompt: {shot['prompt'][:100]}...")
    print(f"  Still:  {shot['still'].name}")
    print(f"  (queueing; typical 1-3 min wait)")

    try:
        result = fal_client.subscribe(
            "fal-ai/kling-video/v2.1/standard/image-to-video",
            arguments={
                "prompt": shot["prompt"],
                "image_url": to_data_uri(shot["still"]),
                "duration": "5",
                "aspect_ratio": "16:9",
                "negative_prompt": "blurry, low quality, watermark, text overlay, cartoon, flat colors",
            },
            with_logs=False,
        )
        video_url = result["video"]["url"]
        resp = requests.get(video_url, timeout=180)
        resp.raise_for_status()
        out_path.write_bytes(resp.content)
        mb = out_path.stat().st_size / (1024 * 1024)
        print(f"  [OK] {out_path.name} ({mb:.1f} MB)")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)[:300]}")
        return False


def main():
    total = len(MOTION_SHOTS)
    done = 0
    failures = 0
    print(f"Generating {total} hero motion clips via Kling 2.1 Standard...\n")
    for shot in MOTION_SHOTS:
        done += 1
        print(f"== [{done}/{total}] {shot['slug']} ==")
        if not gen_clip(shot):
            failures += 1
        print()
    print(f"\nDONE. {total - failures}/{total} clips in: {OUT_DIR}")
    if failures:
        print(f"WARN: {failures} failed")
    print(f"Est. cost: ~${(total - failures) * 0.25:.2f}")


if __name__ == "__main__":
    main()
