"""
Phase 6 (v2): Generate 8 motion clips for Chain Devils screenplay v2.
Uses Kling 2.1 PRO for better physics than Standard.

Cost: 8 * $0.49 = ~$3.92.
"""
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
STILLS_V2 = HERE.parent / "generated" / "05_scene_shots_v2"
OUT_DIR = HERE.parent / "generated" / "06_motion_clips_v2"
OUT_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(HERE / ".env")

# Motion clips — for each the starting frame is the scene still, and the prompt
# describes ONLY the motion that should happen within the 5 seconds.
MOTION_SHOTS = [
    {
        "still": STILLS_V2 / "shot-03-pov-eye-drift.png",
        "slug": "03-pov-eye-drift",
        "prompt": (
            "The camera drifts slowly forward through the dark infernal tunnel. Subtle "
            "forward dolly motion, ash particles drifting, distant hellforge braziers "
            "flickering. Silver-violet arcane haze softening frame edges — we are "
            "seeing through a scouting spell. Painterly oil-painting aesthetic preserved, "
            "slow ominous pace, no sudden cuts."
        ),
    },
    {
        "still": STILLS_V2 / "shot-04-pov-reveal-chain-devils.png",
        "slug": "04-pov-reveal-chain-devils",
        "prompt": (
            "The camera drifts forward one more step into the chamber. The chain devils "
            "slowly turn their heads, skull-hooded faces pivoting toward the camera. One "
            "devil's eye-sockets snap open in alarm. Chains around them undulate slowly "
            "like disturbed snakes. The silver-violet arcane haze at the frame edges "
            "pulses once. Reveal beat, cinematic slow tension. Painterly oil-painting "
            "aesthetic preserved."
        ),
    },
    {
        "still": STILLS_V2 / "shot-07-cannon-fires-force-blast.png",
        "slug": "07-cannon-fires-force-blast",
        "prompt": (
            "The arcane cannon RECOILS in the foreground-left. A spherical sapphire "
            "force-blast wavefront launches from the cannon muzzle and rapidly "
            "travels down the dark tunnel toward the right side of the frame. "
            "Visible concussion air-ripple. Sparks, smoke, blue runic discharge. "
            "Dust starts erupting at the tunnel mouth as the blast enters. Dynamic "
            "explosive launch. Painterly oil-painting aesthetic preserved."
        ),
    },
    {
        "still": STILLS_V2 / "shot-08-tunnel-collapse-impact.png",
        "slug": "08-tunnel-collapse-impact",
        "prompt": (
            "The sapphire force-blast wavefront slams through the chamber. The chain "
            "devils are thrown backward by the concussion, two striking the walls. "
            "The bone-ribbed ceiling cracks and collapses downward in chunks of stone "
            "and bone. Blood-pool ripples violently. Dust and rubble erupt outward. "
            "Catastrophic destructive motion, multiple simultaneous elements. "
            "Painterly oil-painting aesthetic preserved."
        ),
    },
    {
        "still": STILLS_V2 / "shot-10-drenwal-word-of-radiance-vs-devils.png",
        "slug": "10-drenwal-word-of-radiance-vs-devils",
        "prompt": (
            "The cleric on the LEFT raises his left hand and a column of pure golden "
            "sunlight erupts outward, radiant beams lancing across the frame toward "
            "the RIGHT. The three chain devils on the right stagger and smoke as the "
            "holy light hits them, their pale skin blistering, chains clattering "
            "loose. Cause and effect in one frame. Camera stays mostly static. "
            "Painterly oil-painting aesthetic preserved throughout."
        ),
    },
    {
        "still": STILLS_V2 / "shot-12-arrow-flight-impact.png",
        "slug": "12-arrow-flight-impact",
        "prompt": (
            "The radiant silver-gold arrow on the left-side archer's bow RELEASES. "
            "The arrow streaks from LEFT to RIGHT across the full length of the tunnel "
            "corridor, leaving a comet trail of radiant starlight. On the right side "
            "of the frame the arrow IMPACTS the center chain devil — punches cleanly "
            "through its chest in a burst of silver-gold holy light. The devil arches "
            "backward, chains going slack, body beginning to collapse. One continuous "
            "dynamic motion, horizontal camera track. Painterly oil-painting aesthetic "
            "preserved."
        ),
    },
    {
        "still": STILLS_V2 / "shot-13-asimov-rises-from-shadow.png",
        "slug": "13-asimov-rises-from-shadow",
        "prompt": (
            "The hooded rogue rises silently from the pool of shadow along the tunnel "
            "wall — smooth vertical rise, almost supernatural. Violet psionic mist "
            "coils more thickly around his gloved hands and condenses further into two "
            "translucent psychic daggers taking solid form. The chain devils in the "
            "foreground have not yet noticed him. Slow dread motion. Painterly "
            "oil-painting aesthetic preserved."
        ),
    },
    {
        "still": STILLS_V2 / "shot-14-asimov-sneak-attack.png",
        "slug": "14-asimov-sneak-attack",
        "prompt": (
            "The hooded rogue drives both translucent violet psychic daggers forward "
            "and upward into the back of the nearest chain devil. A brilliant burst "
            "of violet psionic light erupts through the devil's ribcage from within. "
            "The devil convulses, chains falling slack, body collapsing forward into "
            "the blood-pool. Fast decisive strike, motion blur on the daggers, "
            "explosive critical-hit moment. Painterly oil-painting aesthetic preserved."
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
    if not shot["still"].exists():
        print(f"  [WAIT] still not ready: {shot['still'].name}")
        return False

    print(f"  Still:  {shot['still'].name}")
    print(f"  (Kling 2.1 Pro, 5s, queueing...)")

    try:
        result = fal_client.subscribe(
            "fal-ai/kling-video/v2.1/pro/image-to-video",
            arguments={
                "prompt": shot["prompt"],
                "image_url": to_data_uri(shot["still"]),
                "duration": "5",
                "aspect_ratio": "16:9",
                "negative_prompt": "blurry, low quality, watermark, text overlay, cartoon, flat colors, anatomy drift, extra limbs, warped faces",
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
    print(f"Generating {total} v2 motion clips via Kling 2.1 PRO...\n")
    for shot in MOTION_SHOTS:
        done += 1
        print(f"== [{done}/{total}] {shot['slug']} ==")
        if not gen_clip(shot):
            failures += 1
        print()
    print(f"\nDONE. {total - failures}/{total} clips in: {OUT_DIR}")
    if failures:
        print(f"WARN: {failures} failed")
    print(f"Est. cost: ~${(total - failures) * 0.49:.2f}")


if __name__ == "__main__":
    main()
