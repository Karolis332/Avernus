"""
Retry 3 failed v3 shots with:
- Shot 9: new ref = v3 shot 4 (lore-accurate kytons) instead of v2 shot 8 (horned drift)
- Shot 13: softer "sneak attack" phrasing, more atmospheric
- Shot 15: softer "fallen bodies" -> "defeated", atmospheric aftermath
"""
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
CANON = HERE.parent / "generated" / "01_character_canon"
V3_OUT = HERE.parent / "generated" / "09_stills_v3"
load_dotenv(HERE / ".env")

STYLE = (
    "Dark heroic fantasy oil painting. Dungeons & Dragons 5th edition Monster Manual "
    "illustration. Wayne Reynolds, Tyler Jacobson, Todd Lockwood style. Painterly "
    "brushwork, dramatic volumetric lighting, cool steel mid-tones, deep shadow "
    "pools, cinematic 16:9 composition."
)

KYTON_LORE = (
    "Each figure is a KYTON from D&D Monster Manual — iron-wrapped humanoid, NOT "
    "a horned demon. Tall muscular humanoid wrapped in heavy rusted barbed iron "
    "chains that pierce into their own pale grey scarred flesh at multiple points. "
    "Faces HIDDEN completely by simple crude metal skullcap masks with only "
    "eye-holes cut. NO horns. NO wings. NO red skin. NO tails. NO hooves. "
    "Multiple animated spiked chains coil around each kyton like hunting serpents. "
    "Body-horror industrial-cenobite aesthetic, NOT fire-demon aesthetic. Color "
    "palette: rust-iron, pale grey flesh, black blood."
)

TUNNEL = (
    "Drainage tunnel under the Palace of Gore in Avernus — blood-lacquered black "
    "stone walls, bone-ribbed vaulted ceiling, hellforge-iron braziers throwing "
    "flickering orange-red light, knee-deep pool of old crusted blood."
)

RETRIES = [
    {
        "num": 9,
        "slug": "09-devils-emerge-through-dust",
        # Force new ref — the v3 Shot 4 has CORRECT kytons, breaks the horn bias
        "ref": V3_OUT / "shot-04-pov-reveal-chain-devils.png",
        "prompt": (
            "WIDE SHOT at eye-level at the tunnel mouth. Dust is clearing from a "
            "recent tunnel collapse. THREE kytons stand in silhouette on the "
            "RIGHT side of the frame, advancing through the settling dust. "
            + KYTON_LORE + " Their multiple animated chains drag along the stone "
            "floor and coil slowly in the air around them like disturbed "
            "serpents. The masked faces tilt slowly as they scent the air. "
            "Menacing industrial-horror aesthetic. " + TUNNEL + " " + STYLE
        ),
    },
    {
        "num": 13,
        "slug": "13-asimov-rises-from-shadow",
        "ref": CANON / "asimov-canon-hero.png",
        "prompt": (
            "MEDIUM SHOT. The same hooded traveler from the reference image "
            "emerges slowly from a pool of deep shadow along a dungeon tunnel "
            "wall. Lean silhouette, deep hood pulled low, face mostly hidden. "
            "At his belt hangs an ornate bronze oil lamp with crystalline violet "
            "veins along its surface pulsing like circuitry, and soft violet "
            "smoke curling from the lamp's spout — the lamp stays firmly on his "
            "belt. In his hands he holds two shimmering translucent violet "
            "energy shapes formed from psionic mist, like dagger-shaped wisps "
            "of smoke with inner glow — NOT solid crystal, NOT metal, they "
            "flicker and waver. Silent vigilant pose. Camera angled so we see "
            "his profile against the dim tunnel light. " + TUNNEL + " " + STYLE
        ),
    },
    {
        "num": 15,
        "slug": "15-aftermath-way-forward",
        "ref": V3_OUT / "shot-10-drenwal-radiance-of-dawn-vs-kytons.png",
        "prompt": (
            "WIDE ATMOSPHERIC SHOT. The party of three stands in line on the "
            "LEFT side of a dark tunnel — a bearded human cleric in red-and-"
            "ivory robes with silver embroidery and a red shield lowered at his "
            "side; to his left a silver-haired astral elf holds an ornate "
            "silver bow at her thigh; to his right a hooded figure stands with "
            "a violet-glowing bronze lamp at his belt, empty hands gently "
            "trailing fading violet mist. The tunnel floor in front of them "
            "is quiet, scattered with loose rusted iron chains and the dim "
            "outlines of defeated foes partially obscured by rising dust. "
            "Down the tunnel on the RIGHT side of the frame, past the "
            "scattered chains, a distant warm orange glow — the Palace of "
            "Gore. The way forward is open. Peaceful post-combat moment. "
            "Painterly aftermath composition. " + TUNNEL + " " + STYLE
        ),
    },
]


def to_data_uri(p: Path) -> str:
    b64 = base64.b64encode(p.read_bytes()).decode()
    return f"data:image/png;base64,{b64}"


def gen(out_path: Path, ref: Path, prompt: str):
    print(f"  Ref: {ref.name}")
    result = fal_client.subscribe(
        "fal-ai/flux-pro/kontext",
        arguments={
            "prompt": prompt,
            "image_url": to_data_uri(ref),
            "safety_tolerance": "6",
            "aspect_ratio": "16:9",
            "num_images": 1,
            "output_format": "png",
        },
        with_logs=False,
    )
    url = result["images"][0]["url"]
    resp = requests.get(url, timeout=120)
    resp.raise_for_status()
    out_path.write_bytes(resp.content)
    kb = out_path.stat().st_size // 1024
    print(f"  [OK] {out_path.name} ({kb} KB)")


for r in RETRIES:
    print(f"\n== RETRY {r['num']}: {r['slug']} ==")
    out_path = V3_OUT / f"shot-{r['slug']}.png"
    # Overwrite existing blanks
    try:
        gen(out_path, r["ref"], r["prompt"])
    except Exception as e:
        print(f"  [FAIL] {str(e)[:300]}")

print("\nDONE retries.")
