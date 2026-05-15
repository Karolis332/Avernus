"""
Phase 14: Convert the 7 remaining static shots into motion clips.
This eliminates Ken Burns pan-zoom entirely — every shot becomes continuously
animated, which is the v4 clunkiness root cause.

Cost: 7 * $0.49 Kling Pro = ~$3.43.
"""
import base64
from pathlib import Path
from dotenv import load_dotenv
import os
import fal_client
import requests

HERE = Path(__file__).parent
V2_STILLS = HERE.parent / "generated" / "05_scene_shots_v2"
V3_STILLS = HERE.parent / "generated" / "09_stills_v3"
OUT_DIR = HERE.parent / "generated" / "14_motion_stills_converted"
OUT_DIR.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")

# Each shot: pick the correct source still and prompt strong continuous motion
MOTION_SHOTS = [
    {
        "still": V2_STILLS / "shot-01-ext-tunnel-mouth.png",
        "slug": "01-ext-tunnel-mouth",
        "prompt": (
            "Slow cinematic camera PARALLAX push-in toward the tunnel mouth. The "
            "Lady Vengeance hell-warship sits in the foreground — her engraved "
            "arcane cannons subtly settling, hellforge engine glow pulsing "
            "warmly, steam venting from side ports. Particles of ash drift "
            "across the frame from right to left. The blood river trickles out "
            "of the tunnel mouth in slow flowing motion. Distant lightning "
            "flickers on the horizon. Continuous atmospheric motion throughout. "
            "Painterly dark fantasy oil-painting aesthetic preserved. NO still "
            "frames. Every element has motion."
        ),
    },
    {
        "still": V2_STILLS / "shot-02-aurora-arcane-eye-cast.png",
        "slug": "02-aurora-arcane-eye-cast",
        "prompt": (
            "The astral elf ranger-mage on the LEFT side of the frame slowly "
            "raises her right hand. Silver-violet fey magic gathers at her "
            "fingertips and condenses — a small translucent spectral eyeball "
            "construct MATERIALIZES and begins to float forward, shimmering. "
            "Her silver-white hair drifts gently in a magical updraft. The "
            "teal gem on her forehead pulses softly with fey light. Her eyes "
            "are closed in concentration. Subtle continuous motion throughout. "
            "Painterly dark fantasy oil-painting aesthetic preserved."
        ),
    },
    {
        "still": V2_STILLS / "shot-05-aurora-breaks-concentration.png",
        "slug": "05-aurora-breaks-concentration",
        "prompt": (
            "EXTREME CLOSE-UP on the astral elf's face. Her jade-green eyes "
            "SNAP OPEN sharply, pupils dilating in alarm. Her breath catches "
            "visibly. The silver-violet arcane sigil at her fingertips in the "
            "foreground dissipates into fast-dispersing sparks. A single "
            "strand of silver-white hair falls across her brow as she tilts "
            "her head sharply to the side (toward off-frame companions). "
            "Quick decisive reaction motion. Painterly oil-painting aesthetic "
            "preserved."
        ),
    },
    {
        "still": V2_STILLS / "shot-06-party-on-lady-v-deck.png",
        "slug": "06-party-on-lady-v-deck",
        "prompt": (
            "Three-shot on the ship deck. The astral elf on the LEFT just "
            "finishes speaking (lips closing) and turns her head to look at "
            "the bearded cleric in the center. The cleric in the CENTER gives "
            "a single grim nod of decision and places his gauntleted hand on "
            "the arcane cannon. The hooded rogue on the RIGHT gradually dissolves "
            "further into shadow as violet psionic mist begins rising softly "
            "from his Soul Capacitor lamp at his belt. Subtle ship engine glow "
            "pulses warmly beneath them. Atmospheric ash drifts slowly. "
            "Continuous natural character motion. Painterly oil-painting "
            "aesthetic preserved."
        ),
    },
    {
        "still": V3_STILLS / "shot-09-devils-emerge-through-dust.png",
        "slug": "09-devils-emerge-through-dust",
        "prompt": (
            "The three iron-wrapped kytons slowly ADVANCE forward through the "
            "settling dust. Their heavy barbed chains drag along the stone "
            "floor and coil upward in the air around them like disturbed "
            "serpents. The masked faces tilt from side to side as they scent "
            "the air. Dust continues settling around their feet. Forward "
            "menacing motion toward the camera. Painterly oil-painting "
            "industrial-horror aesthetic preserved. NOT horned demons — kytons."
        ),
    },
    {
        "still": V2_STILLS / "shot-11-aurora-nocks-radiant-arrow.png",
        "slug": "11-aurora-nocks-radiant-arrow",
        "prompt": (
            "The astral elf ranger-mage on the LEFT smoothly DRAWS her silver "
            "moonwood shortbow — her draw arm pulls the starlight bowstring "
            "back to her cheek. As she draws, a radiant silver-gold arrow "
            "MATERIALIZES on the string from nothing, a golden radiant corona "
            "blooming around the arrow shaft as True Strike magic channels "
            "through the bow. Her jade eyes lock onto the target off-frame "
            "right, pupils narrowing. Her silver-white hair drifts slightly. "
            "Tense, deliberate motion. Painterly oil-painting aesthetic "
            "preserved."
        ),
    },
    {
        "still": V3_STILLS / "shot-15-aftermath-way-forward.png",
        "slug": "15-aftermath-way-forward",
        "prompt": (
            "Atmospheric aftermath. The three party members on the LEFT stand "
            "slowly breathing in the dim tunnel — the cleric lowers his shield "
            "further, the elf lowers her bow to her thigh, the rogue's violet "
            "psionic mist dissipates slowly from his hands. Dust and embers "
            "drift through the air continuously. The distant orange glow of "
            "the Palace of Gore at the end of the tunnel RIGHT pulses softly. "
            "Subtle ambient motion throughout — no dead frames. Painterly "
            "oil-painting aesthetic preserved."
        ),
    },
]


def to_data_uri(p: Path) -> str:
    return f"data:image/png;base64,{base64.b64encode(p.read_bytes()).decode()}"


def gen(shot):
    slug = shot["slug"]
    out_path = OUT_DIR / f"clip-{slug}.mp4"
    if out_path.exists():
        print(f"  [SKIP] {out_path.name} exists")
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
                "negative_prompt": "blurry, low quality, watermark, text overlay, cartoon, flat colors, anatomy drift, warped faces, still frame, frozen motion, horns, bat wings, demon",
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
print(f"Converting {total} static shots to motion clips via Kling 2.1 Pro...\n")
for s in MOTION_SHOTS:
    done += 1
    print(f"== [{done}/{total}] {s['slug']} ==")
    if not gen(s):
        failures += 1
    print()
print(f"\nDONE. {total - failures}/{total} clips in: {OUT_DIR}")
print(f"Est. cost: ~${(total - failures) * 0.49:.2f}")
