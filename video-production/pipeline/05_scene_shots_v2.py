"""
Phase 5 (v2): Generate 15 scene stills for the Chain Devils screenplay v2.

Key improvements over v1:
- Shots ordered by narrative, using previous-shot-as-ref for continuity
- Character canons used only where identity lock critical
- Spatial grammar enforced in every prompt (party LEFT, devils RIGHT, etc.)
- Cinematography specs baked in (shot type, camera height, movement)

Cost: 15 * $0.04 = ~$0.60.
"""
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
CANON = HERE.parent / "generated" / "01_character_canon"
OUT_DIR = HERE.parent / "generated" / "05_scene_shots_v2"
OUT_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(HERE / ".env")

# Style block — same as canon for continuity
STYLE = (
    "Dark heroic fantasy oil painting. Dungeons & Dragons Descent into Avernus "
    "sourcebook illustration. Frank Frazetta, Todd Lockwood, Wayne Reynolds style "
    "fusion. Painterly brushwork, dramatic volumetric lighting, sulphurous amber "
    "backlight, warm rim-light, deep shadow pools, cinematic 16:9 composition, "
    "8K concept art quality, grit and ash overlay."
)

# Scene env anchors
TUNNEL_ENV = (
    "Drainage tunnels under the Palace of Gore in Avernus — blood-lacquered black "
    "stone walls, bone-ribbed vaulted ceiling, hellforge-iron braziers throwing "
    "flickering orange-red light, knee-deep pool of old crusted blood covering "
    "the floor, gore dripping from ceiling joints, oppressive infernal atmosphere, "
    "ash fog in the middle distance."
)

LADY_V = (
    "The Lady Vengeance — an armored Gondian-Portyr hell-warship, matte-black plating "
    "etched with brass runic scrollwork, engraved arcane cannons mounted along her "
    "flanks, a heavy Aether Harpoon on the prow, hellforge red-orange engine glow "
    "from vents, soul-coin overdrive glow in the undercarriage."
)

# Shot definitions: (num, slug, ref_canon (or None), ref_previous_shot_slug (or None), prompt)
# ref_previous_shot_slug lets us chain continuity from earlier shots in this batch.
SHOTS = [
    (
        1, "01-ext-tunnel-mouth", None, None,
        "EXTERIOR WIDE ESTABLISHING SHOT, camera low and distant. "
        + LADY_V + " parked at the mouth of a vast drainage tunnel cut into the "
        "black Avernus stone of a cliff face. A river of dark blood trickles out "
        "of the tunnel past her hull. Orange-red hellforge engine light spilling "
        "from her flanks. Sulphurous amber-red sky above, obsidian wasteland behind, "
        "distant silhouettes of Zariel's infernal war machines on the horizon. "
        "The tunnel mouth is a black maw on the right side of the frame. Painterly "
        "cinematic composition. " + STYLE
    ),
    (
        2, "02-aurora-arcane-eye-cast", "aurora-canon-hero", None,
        "MEDIUM SHOT, camera at eye-level. The same astral elf ranger-mage from the "
        "reference image stands on the left side of the frame at the mouth of a "
        "dark infernal tunnel, her right hand raised. A small translucent spectral "
        "eyeball construct — silver-violet fey magic, shot through with arcane "
        "veins, a floating Arcane Eye spell — is forming in the air before her "
        "fingertips. Her eyes are closed in concentration, her silver-white hair "
        "drifting in the infernal updraft, teal forehead gem softly glowing. Behind "
        "her in soft focus: two dark figures (her companions). " + TUNNEL_ENV + " "
        + STYLE
    ),
    (
        3, "03-pov-eye-drift", None, "01-ext-tunnel-mouth",
        "POINT-OF-VIEW SHOT from a floating magical eye. The camera IS the eye — "
        "drifting slowly forward down a long dark infernal tunnel. Blood-lacquered "
        "black walls sliding past on the left and right. Knee-deep pool of crusted "
        "blood on the tunnel floor below. Distant hellforge braziers throwing "
        "flickering red-orange light ahead. The frame edges are softened by a "
        "silver-violet arcane haze — we are seeing through a spell. Ominous, "
        "expectant. " + TUNNEL_ENV + " " + STYLE
    ),
    (
        4, "04-pov-reveal-chain-devils", None, "03-pov-eye-drift",
        "POINT-OF-VIEW SHOT from the floating magical eye. The corridor has opened "
        "into a wider chamber. In the flickering red light, FIVE CHAIN DEVILS — "
        "tall gaunt humanoids wrapped in iron chains with barbed hooks, pale scarred "
        "flesh, skull-hooded faces — stand in waiting formation. Animated spiked "
        "chains coil in the air around them like nesting serpents. Hellforge "
        "embers glow along the chain links. One devil has begun to turn its head "
        "toward the camera — its empty eye-sockets snapping open in alarm. Silver-"
        "violet arcane haze at the frame edges. Ominous, terrifying reveal. "
        + TUNNEL_ENV + " " + STYLE
    ),
    (
        5, "05-aurora-breaks-concentration", "aurora-canon-hero", None,
        "EXTREME CLOSE-UP, camera tight on Aurora's face. The same astral elf "
        "ranger-mage from the reference image — her jade-green eyes snap OPEN "
        "violently, pupils dilating, breath caught. The silver-violet arcane eye "
        "sigil at her fingertips in the foreground dissipates into sparks. Her "
        "expression: alarm, alertness, decision. She is about to warn the others. "
        "Warm amber rim-light from a nearby brazier, deep shadow on the other side "
        "of her face. " + STYLE
    ),
    (
        6, "06-party-on-lady-v-deck", None, "01-ext-tunnel-mouth",
        "MEDIUM THREE-SHOT on the deck of the Lady Vengeance at the tunnel mouth. "
        "On the LEFT side of the frame: an astral elf woman with silver-white hair "
        "and olive-green robes (Aurora), her hand lowered, just having reported. "
        "In the CENTER: a bearded human Hellrider cleric with brunette hair, "
        "red-and-ivory vestments, silver breastplate, one gauntleted hand resting "
        "on the brass-and-bone arcane cannon mounted on the ship's rail — the "
        "cannon is already aimed down the tunnel (right-of-frame). On the RIGHT, "
        "partially faded into shadow: a lean hooded rogue with a violet-glowing "
        "bronze lamp at his belt. The rogue's form already dissolving into the "
        "darkness. Drenwal gives a single nod. Decision made. " + STYLE
    ),
    (
        7, "07-cannon-fires-force-blast", None, "06-party-on-lady-v-deck",
        "WIDE CINEMATIC SHOT, camera side-angle. The arcane cannon of the Lady "
        "Vengeance hell-warship RECOILS in the foreground-left with a crack of "
        "blue-white magical discharge. A spherical FORCE BLAST — translucent "
        "sapphire wavefront crackling with runic energy — launches from the "
        "cannon's muzzle and travels rapidly down the dark tunnel in the right "
        "side of the frame. The concussion wave is visible as rippling air. "
        "Sparks, smoke, blue light. Dust and debris starting to erupt at the "
        "tunnel mouth. Dynamic motion-frame composition. " + TUNNEL_ENV + " "
        + STYLE
    ),
    (
        8, "08-tunnel-collapse-impact", None, "04-pov-reveal-chain-devils",
        "WIDE INTERIOR SHOT inside the deep tunnel. The sapphire force blast IMPACTS "
        "the chain devils in the chamber — the wavefront slamming them backward, "
        "two are thrown against the walls, stone cracks, the bone-ribbed ceiling "
        "begins collapsing downward in chunks. Blood-pool rippling violently. Dust "
        "and rubble erupting outward. Three chain devils are staggering but still "
        "standing in the foreground-right. Two more are emerging from a side alcove "
        "the collapse didn't reach. Catastrophic motion-frame. " + TUNNEL_ENV + " "
        + STYLE
    ),
    (
        9, "09-devils-emerge-through-dust", None, "08-tunnel-collapse-impact",
        "WIDE SHOT, camera at eye-level at the tunnel mouth. Dust is clearing. "
        "THREE CHAIN DEVILS stand in silhouette on the RIGHT side of the frame — "
        "iron-wrapped tall gaunt humanoids, barbed chains coiling slowly in the "
        "air around them, hellforge embers crackling along the chain links. Their "
        "skull-hooded faces and pale scarred flesh are just visible through the "
        "settling dust. They begin to advance. Menacing, cinematic. " + TUNNEL_ENV
        + " " + STYLE
    ),
    (
        10, "10-drenwal-word-of-radiance-vs-devils", "drenwal-canon-hero", None,
        "WIDE TWO-SHOT, camera at low eye-level in the tunnel. On the LEFT side "
        "of the frame: the same human Hellrider cleric from the reference image "
        "— brunette hair, full beard, red-and-ivory vestments with silver Celtic "
        "embroidery, silver breastplate, crimson cloak — plants his red-lacquered "
        "shield forward and raises his left hand, a COLUMN OF PURE GOLDEN "
        "LATHANDRIAN SUNLIGHT erupting outward from his position. Radiant beams "
        "lance across the frame toward the RIGHT side where THREE CHAIN DEVILS "
        "are staggering and smoking, their pale skin blistering from the holy "
        "light, chains clattering. Cause and effect in a single frame. Dramatic. "
        + TUNNEL_ENV + " " + STYLE
    ),
    (
        11, "11-aurora-nocks-radiant-arrow", "aurora-canon-hero", None,
        "MEDIUM SHOT, camera at shoulder-height, Aurora in profile facing RIGHT. "
        "The same astral elf ranger-mage from the reference image draws her ornate "
        "silver moonwood shortbow smoothly, starlight bowstring pulled to her "
        "cheek. A radiant silver-gold arrow of pure starlight MANIFESTS on the "
        "string as she draws — True Strike magic channeled through the bow, "
        "arrow surrounded by a golden radiant corona. Her jade-green eyes are "
        "locked on target (off-frame right). Behind her in soft focus: fading "
        "golden radiant light from Drenwal's spell, one chain devil wounded but "
        "standing. " + TUNNEL_ENV + " " + STYLE
    ),
    (
        12, "12-arrow-flight-impact", None, "11-aurora-nocks-radiant-arrow",
        "WIDE HORIZONTAL SHOT showing the full length of the tunnel corridor. "
        "The radiant silver-gold arrow streaks from LEFT to RIGHT across the "
        "frame, leaving a comet trail of radiant starlight. On the right side "
        "of the frame the arrow IMPACTS the center chain devil — punches cleanly "
        "through its chest in a burst of silver-gold holy light. The devil "
        "arches backward mid-fall, chains going slack, its body beginning to "
        "collapse into the blood-pool below. One continuous dynamic motion. "
        + TUNNEL_ENV + " " + STYLE
    ),
    (
        13, "13-asimov-rises-from-shadow", "asimov-canon-hero", None,
        "MEDIUM SHOT, camera angled behind the remaining chain devils (visible in "
        "the frame-right foreground as dark silhouettes). Behind them, in a pool "
        "of deep shadow along the tunnel wall, the same hooded soulknife rogue "
        "from the reference image is RISING silently from the darkness — "
        "lean silhouette, hood pulled low, Soul Capacitor lamp pulsing violet "
        "at his belt. Violet psionic mist is coiling around his gloved hands and "
        "condensing into TWO TRANSLUCENT VIOLET PSYCHIC DAGGERS taking solid form. "
        "The chain devils have not noticed him. Perfectly positioned. " + TUNNEL_ENV
        + " " + STYLE
    ),
    (
        14, "14-asimov-sneak-attack", None, "13-asimov-rises-from-shadow",
        "DYNAMIC MEDIUM SHOT. The hooded rogue drives both translucent violet "
        "psychic daggers forward and upward into the back of the nearest chain "
        "devil — a brilliant burst of violet psionic light erupts through the "
        "devil's ribcage from within. The devil convulses, chains going slack, "
        "collapsing forward into the blood-pool. Behind the rogue, the last "
        "chain devil is turning, raising its barbed chains to strike — but is "
        "not yet in range. Explosive critical-hit moment. " + TUNNEL_ENV + " "
        + STYLE
    ),
    (
        15, "15-aftermath-way-forward", None, "10-drenwal-word-of-radiance-vs-devils",
        "WIDE AFTERMATH SHOT. The party stands in line on the LEFT side of the "
        "tunnel — the bearded Hellrider cleric (center-left) with his red shield "
        "lowered at his side, the silver-haired astral elf (left) with the "
        "Moonbow held low at her thigh, the hooded rogue (center, partly in "
        "shadow) with violet psionic mist dissipating from his hands. Across "
        "from them in the foreground, the blood-pool is crusted with FIVE FALLEN "
        "CHAIN DEVILS, loose chains strewn across the stone, faint remaining "
        "silver glow of radiant damage on the bodies. Down the tunnel on the "
        "RIGHT side of the frame, past the slain, a distant orange glow — the "
        "Palace of Gore. The way forward is open. Painterly aftermath "
        "composition. " + TUNNEL_ENV + " " + STYLE
    ),
]


_uri_cache = {}


def to_data_uri(path: Path) -> str:
    key = str(path)
    if key not in _uri_cache:
        b64 = base64.b64encode(path.read_bytes()).decode()
        _uri_cache[key] = f"data:image/png;base64,{b64}"
    return _uri_cache[key]


def resolve_ref(canon_slug, prev_slug):
    """Pick the ref image for a shot."""
    if canon_slug:
        return CANON / f"{canon_slug}.png"
    if prev_slug:
        return OUT_DIR / f"shot-{prev_slug}.png"
    return None


def gen_shot(out_path: Path, ref_path, prompt: str):
    print(f"  Ref: {ref_path.name if ref_path else '(none, t2i)'}")
    print(f"  Prompt length: {len(prompt)}")
    if ref_path is not None:
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
    else:
        result = fal_client.subscribe(
            "fal-ai/flux-pro/v1.1-ultra",
            arguments={
                "prompt": prompt,
                "num_images": 1,
                "aspect_ratio": "16:9",
                "output_format": "png",
                "safety_tolerance": "6",
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
    print(f"Generating {total} v2 scene stills with spatial/continuity discipline...\n")
    for num, slug, canon_slug, prev_slug, prompt in SHOTS:
        done += 1
        out_path = OUT_DIR / f"shot-{slug}.png"
        print(f"== SHOT {num}: {slug} ==")
        if out_path.exists():
            print(f"  [SKIP] already exists")
            print(f"  [{done}/{total}]\n")
            continue
        ref_path = resolve_ref(canon_slug, prev_slug)
        if ref_path is not None and not ref_path.exists():
            # Previous shot not yet generated — this shouldn't happen if order is right
            print(f"  [WARN] ref missing: {ref_path.name}, falling back to t2i")
            ref_path = None
        try:
            gen_shot(out_path, ref_path, prompt)
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
