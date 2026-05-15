"""
Phase 10: Re-render 4 motion clips from v3 lore-accurate stills.

Kept from v2 (no lore issue): clips 03, 07, 08, 12.
Re-rendered here: clips 04, 10, 13, 14.

Cost: 4 * $0.49 = ~$1.96 (Kling 2.1 Pro).
"""
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests
import os

HERE = Path(__file__).parent
V3_STILLS = HERE.parent / "generated" / "09_stills_v3"
OUT_DIR = HERE.parent / "generated" / "10_motion_v3"
OUT_DIR.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")

MOTION_SHOTS = [
    {
        "still": V3_STILLS / "shot-04-pov-reveal-chain-devils.png",
        "slug": "04-pov-reveal-kytons",
        "prompt": (
            "The camera drifts forward one more step into the chamber. The five "
            "iron-wrapped kytons slowly turn their masked heads in unison toward "
            "the camera, skullcap masks pivoting. The animated chains around "
            "them undulate slowly like disturbed serpents. A subtle silver-violet "
            "arcane haze at the frame edges pulses once — we are watching through "
            "a scouting spell. Cinematic slow tension, industrial-horror mood. "
            "Painterly oil-painting aesthetic preserved."
        ),
    },
    {
        "still": V3_STILLS / "shot-10-drenwal-radiance-of-dawn-vs-kytons.png",
        "slug": "10-radiance-of-dawn-vs-kytons",
        "prompt": (
            "The cleric on the LEFT side of the frame raises both hands and a "
            "massive 30-foot radius golden sunlight burst — Radiance of the Dawn "
            "channel divinity — erupts outward from his position, radiant waves "
            "washing across the corridor in every direction. The iron-wrapped "
            "kytons on the RIGHT stagger and smoke as the holy wave hits them, "
            "their pale flesh blistering where the light touches, animated chains "
            "clattering loose and falling limp. Cause and effect in one frame. "
            "Camera stays mostly static to emphasize the radiant expansion. "
            "Painterly oil-painting aesthetic preserved throughout."
        ),
    },
    {
        "still": V3_STILLS / "shot-13-asimov-rises-from-shadow.png",
        "slug": "13-asimov-emerges",
        "prompt": (
            "The hooded rogue steps forward slowly from the pool of shadow, "
            "silent and vigilant. The two translucent violet psionic energy blades "
            "in his hands flicker and waver like smoke finding its shape. Violet "
            "smoke continues to curl softly from the ornate bronze lamp on his "
            "belt. He remains alert, watching. Slow atmospheric motion. Painterly "
            "oil-painting aesthetic preserved."
        ),
    },
    {
        "still": V3_STILLS / "shot-14-asimov-sneak-attack.png",
        "slug": "14-sneak-attack-vs-kyton",
        "prompt": (
            "The hooded rogue drives both translucent violet psionic blades "
            "forward into the iron-wrapped kyton. A brilliant burst of violet "
            "psionic light erupts through the kyton's masked body from within. "
            "The kyton convulses, chains going slack, body folding forward. "
            "Fast decisive strike, motion blur on the blades, explosive "
            "critical-hit moment. Painterly oil-painting aesthetic preserved."
        ),
    },
]


def to_data_uri(p: Path) -> str:
    return f"data:image/png;base64,{base64.b64encode(p.read_bytes()).decode()}"


def gen(shot: dict):
    slug = shot["slug"]
    out_path = OUT_DIR / f"clip-{slug}.mp4"
    if out_path.exists():
        print(f"  [SKIP] {out_path.name} already exists")
        return True
    print(f"  Still: {shot['still'].name}")
    try:
        result = fal_client.subscribe(
            "fal-ai/kling-video/v2.1/pro/image-to-video",
            arguments={
                "prompt": shot["prompt"],
                "image_url": to_data_uri(shot["still"]),
                "duration": "5",
                "aspect_ratio": "16:9",
                "negative_prompt": "blurry, low quality, watermark, text overlay, cartoon, anatomy drift, extra limbs, warped faces, horns, bat wings, demon",
            },
            with_logs=False,
        )
        url = result["video"]["url"]
        resp = requests.get(url, timeout=180)
        resp.raise_for_status()
        out_path.write_bytes(resp.content)
        mb = out_path.stat().st_size / (1024 * 1024)
        print(f"  [OK] {out_path.name} ({mb:.1f} MB)")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)[:300]}")
        return False


total = len(MOTION_SHOTS)
done = 0
failures = 0
print(f"Re-rendering {total} motion clips from v3 lore-accurate stills...\n")
for shot in MOTION_SHOTS:
    done += 1
    print(f"== [{done}/{total}] {shot['slug']} ==")
    if not gen(shot):
        failures += 1
    print()
print(f"\nDONE. {total - failures}/{total} clips in: {OUT_DIR}")
print(f"Est. cost: ~${(total - failures) * 0.49:.2f}")
