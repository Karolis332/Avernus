"""
Phase 9 (v3): Re-render the 6 shots that failed D&D lore accuracy.

Key corrections enforced via prompt:
- KYTON chain devils: iron-wrapped humanoids, NOT horned demons. Masked faces.
- Soul Capacitor: bronze lamp ON BELT, not in hand.
- Psychic blades: translucent psionic energy, NOT solid crystal.
- Drenwal radiant spell re-labeled as Radiance of the Dawn (30-ft burst — mechanically accurate for the big column visual).

Cost: 6 * $0.04 = ~$0.24.
"""
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
CANON = HERE.parent / "generated" / "01_character_canon"
V2_STILLS = HERE.parent / "generated" / "05_scene_shots_v2"
OUT_DIR = HERE.parent / "generated" / "09_stills_v3"
OUT_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(HERE / ".env")

STYLE = (
    "Dark heroic fantasy oil painting. Dungeons & Dragons 5th edition Monster Manual "
    "illustration. Wayne Reynolds, Tyler Jacobson, Todd Lockwood style. Painterly "
    "brushwork, dramatic volumetric lighting, sulphurous amber backlight, cool steel "
    "mid-tones, deep shadow pools, cinematic 16:9 composition, 8K concept art quality."
)

# LORE-ACCURATE KYTON DESCRIPTION (drop into every chain-devil shot)
KYTON = (
    "Each chain devil is a KYTON from D&D Monster Manual — NOT a horned demon. "
    "Each kyton is a tall muscular humanoid figure wrapped head-to-toe in heavy "
    "rusted barbed iron chains that pierce directly into their own pale grey "
    "scarred flesh at multiple points, like grotesque body-modification piercings. "
    "Their faces are HIDDEN completely by simple crude metal skullcap masks with "
    "only eye-holes cut. NO horns. NO bat-wings. NO red demonic skin. NO tails. "
    "NO cloven hooves. Multiple animated spiked chains rise and coil around each "
    "kyton's body like hunting serpents. Body-horror industrial undead aesthetic, "
    "uncanny and cold — like Clive Barker cenobites, NOT like traditional fire "
    "demons. Color palette: cold rust-iron, pale grey-white flesh, black blood, "
    "muted."
)

SOUL_CAPACITOR = (
    "At his waist, clipped to his belt at hip-level (NOT in his hand), hangs the "
    "Soul Capacitor — an ornate bronze oil lamp with crystalline violet veins "
    "pulsing along its bronze surface like living circuitry, and violet psionic "
    "smoke curling constantly from the lamp's spout. The lamp remains firmly on "
    "his belt throughout the shot."
)

PSYCHIC_BLADES = (
    "In his hands he holds two PSYCHIC SOUL KNIVES — translucent shimmering "
    "violet-purple blades formed from pure psionic energy, NOT solid crystal, "
    "NOT metal. The blades flicker and waver slightly like smoke shaped into "
    "dagger form, with a glowing inner light. You can see faintly through them."
)

TUNNEL_ENV = (
    "Drainage tunnels under the Palace of Gore in Avernus — blood-lacquered black "
    "stone walls, bone-ribbed vaulted ceiling, hellforge-iron braziers throwing "
    "flickering orange-red light, knee-deep pool of old crusted blood covering "
    "the floor, gore dripping from ceiling joints, oppressive infernal atmosphere."
)

# (num, slug, ref_path, prompt)
SHOTS = [
    (
        4, "04-pov-reveal-chain-devils",
        V2_STILLS / "shot-03-pov-eye-drift.png",
        "POINT-OF-VIEW SHOT from a floating magical scouting eye looking forward. "
        "The corridor has opened into a wider chamber. In the flickering red and "
        "cool grey light, FIVE KYTONS stand in waiting formation. "
        + KYTON + " One kyton has begun to turn its head toward the camera, its "
        "masked face pivoting slowly. The frame edges are softened by a silver-"
        "violet arcane haze — we are seeing through a scouting spell. Ominous, "
        "uncanny reveal. Industrial-horror mood, not demonic mood. "
        + TUNNEL_ENV + " " + STYLE
    ),
    (
        9, "09-devils-emerge-through-dust",
        V2_STILLS / "shot-08-tunnel-collapse-impact.png",
        "WIDE SHOT at eye-level at the tunnel mouth. Dust is clearing from the "
        "recent tunnel collapse. THREE KYTONS stand in silhouette on the RIGHT "
        "side of the frame, advancing through the settling dust. "
        + KYTON + " Their multiple animated chains drag along the stone floor "
        "and coil in the air around them. Menacing, cold, industrial-horror "
        "aesthetic. " + TUNNEL_ENV + " " + STYLE
    ),
    (
        10, "10-drenwal-radiance-of-dawn-vs-kytons",
        CANON / "drenwal-canon-hero.png",
        "WIDE TWO-SHOT at low eye-level in the tunnel. On the LEFT side of the "
        "frame: the same human Hellrider Light Cleric from the reference image — "
        "brunette hair, full beard, red-and-ivory vestments with silver Celtic "
        "embroidery, silver breastplate, crimson cloak, leather spellcasting "
        "gauntlet. He plants his red-lacquered shield forward and throws both "
        "hands out, channeling RADIANCE OF THE DAWN — a 30-foot radius BURST of "
        "pure golden Lathandrian sunlight centered on him, the radiant wave "
        "washing outward through the corridor in every direction. Holy light "
        "fills the frame. On the RIGHT side of the frame: THREE KYTONS stagger "
        "and smoke as the radiant wave hits them — "
        + KYTON + " — their pale scarred flesh blistering from the holy light, "
        "animated chains clattering and falling loose, masked faces tilted "
        "backward. Cause and effect in a single frame. " + TUNNEL_ENV + " "
        + STYLE
    ),
    (
        13, "13-asimov-rises-from-shadow",
        CANON / "asimov-canon-hero.png",
        "MEDIUM SHOT, camera angled from behind the remaining kytons (visible in "
        "the frame-right foreground as silhouettes). Behind them, in a pool of "
        "deep shadow along the tunnel wall, the same hooded soulknife rogue "
        "from the reference image is RISING silently from the darkness. Lean "
        "silhouette, hood pulled low. " + SOUL_CAPACITOR + " " + PSYCHIC_BLADES
        + " The kytons have not noticed him. He is perfectly positioned for a "
        "sneak attack from behind. " + TUNNEL_ENV + " " + STYLE
    ),
    (
        14, "14-asimov-sneak-attack",
        OUT_DIR / "shot-13-asimov-rises-from-shadow.png",  # chain from v3 shot 13
        "DYNAMIC MEDIUM SHOT. The same hooded soulknife rogue from the previous "
        "shot drives both translucent violet psionic blades forward and upward "
        "into the back of the nearest kyton — a brilliant burst of violet "
        "psionic light erupts through the kyton's masked body from within. The "
        "kyton convulses, animated chains going slack and collapsing to the "
        "ground, masked face tilted back, body folding forward into the blood-"
        "pool. " + SOUL_CAPACITOR + " Explosive critical-hit moment, motion "
        "blur on the psionic blades. " + KYTON + " " + TUNNEL_ENV + " " + STYLE
    ),
    (
        15, "15-aftermath-way-forward",
        OUT_DIR / "shot-10-drenwal-radiance-of-dawn-vs-kytons.png",  # chain from v3 shot 10
        "WIDE AFTERMATH SHOT. The party of three stands in line on the LEFT side "
        "of the tunnel — the bearded Hellrider Light Cleric (center-left) with "
        "his red shield lowered at his side, the silver-haired astral elf "
        "warlock (far left) with the Moonbow held low at her thigh, the hooded "
        "soulknife rogue (center, partly in shadow) with the violet-glowing "
        "bronze Soul Capacitor lamp at his belt, violet psionic mist "
        "dissipating from his empty hands. Across from them in the foreground "
        "right, the blood-pool is crusted with FIVE FALLEN KYTONS — "
        + KYTON + " — their bodies crumpled, chains strewn across the stone, "
        "masked faces turned sideways, a faint remaining silver-gold glow of "
        "radiant damage still on the bodies. Down the tunnel on the right side "
        "of the frame, past the slain, a distant orange glow — the Palace of "
        "Gore. The way forward is open. Painterly aftermath composition. "
        + TUNNEL_ENV + " " + STYLE
    ),
]


_uri_cache = {}


def to_data_uri(path: Path) -> str:
    key = str(path)
    if key not in _uri_cache:
        b64 = base64.b64encode(path.read_bytes()).decode()
        _uri_cache[key] = f"data:image/png;base64,{b64}"
    return _uri_cache[key]


def gen_shot(out_path: Path, ref_path: Path, prompt: str):
    print(f"  Ref: {ref_path.name}")
    print(f"  Prompt length: {len(prompt)}")
    result = fal_client.subscribe(
        "fal-ai/flux-pro/kontext",
        arguments={
            "prompt": prompt,
            "image_url": to_data_uri(ref_path),
            "safety_tolerance": "6",
            "aspect_ratio": "16:9",
            "num_images": 1,
            "output_format": "png",
        },
        with_logs=False,
    )
    out_url = result["images"][0]["url"]
    resp = requests.get(out_url, timeout=120)
    resp.raise_for_status()
    out_path.write_bytes(resp.content)
    kb = out_path.stat().st_size // 1024
    print(f"  [OK] {out_path.name} ({kb} KB)")


def main():
    total = len(SHOTS)
    done = 0
    failures = 0
    print(f"Re-rendering {total} shots with D&D lore accuracy...\n")
    for num, slug, ref, prompt in SHOTS:
        done += 1
        out_path = OUT_DIR / f"shot-{slug}.png"
        print(f"== SHOT {num}: {slug} ==")
        if out_path.exists():
            print(f"  [SKIP] already exists")
            print(f"  [{done}/{total}]\n")
            continue
        if not ref.exists():
            print(f"  [WAIT] ref missing: {ref.name} — skipping (chain dependency)")
            failures += 1
            print(f"  [{done}/{total}]\n")
            continue
        try:
            gen_shot(out_path, ref, prompt)
        except Exception as e:
            failures += 1
            print(f"  [FAIL] {str(e)[:300]}")
        print(f"  [{done}/{total}]\n")
    print(f"\nDONE. {total - failures}/{total} shots in: {OUT_DIR}")
    if failures:
        print(f"WARN: {failures} failed")
    print(f"Est. cost: ~${(total - failures) * 0.04:.2f}")


if __name__ == "__main__":
    main()
