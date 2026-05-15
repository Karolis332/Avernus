"""
Generate 22 scene stills for the Chain Devils scene.

Uses the character canons from 01_character_canon.py as refs for the
relevant character shots, ensuring consistency. Environment-only and
parchment-card shots use a neutral dark-fantasy style ref or t2i.

Cost: ~$0.04/image * 22 = ~$0.88 via flux-pro/kontext.
"""
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
CANON_DIR = HERE.parent / "generated" / "01_character_canon"
OUT_DIR = HERE.parent / "generated" / "02_scene_shots"
OUT_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(HERE / ".env")

# Style anchors — same as canon for visual continuity
STYLE = (
    "Dark heroic fantasy oil painting. Dungeons & Dragons Descent into Avernus "
    "sourcebook illustration. Painterly brushwork, Frank Frazetta and Todd Lockwood "
    "and Wayne Reynolds style fusion. Dramatic volumetric lighting, sulphurous amber "
    "backlight, warm rim-light, deep shadow, cinematic composition, 8K concept art "
    "quality, grit and ash texture."
)

# Environment anchors
PALACE_CORRIDOR = (
    "Interior corridor of the Palace of Gore in Avernus — blood-lacquered black stone "
    "walls, bone-ribbed vaulted ceiling, hellforge-iron braziers casting flickering "
    "orange-red light, gore dripping from ceiling joints, deep shadow pools along "
    "the floor, oppressive infernal atmosphere."
)

# Canon refs
AURORA_REF = CANON_DIR / "aurora-canon-full-body.png"
AURORA_HERO = CANON_DIR / "aurora-canon-hero.png"
DRENWAL_REF = CANON_DIR / "drenwal-canon-full-body.png"
DRENWAL_HERO = CANON_DIR / "drenwal-canon-hero.png"
ASIMOV_REF = CANON_DIR / "asimov-canon-full-body.png"
ASIMOV_HERO = CANON_DIR / "asimov-canon-hero.png"


# (shot_number, slug, ref_image_or_None, aspect_ratio, prompt)
SHOTS = [
    (
        1, "01-card-title", None, "16:9",
        "An aged parchment page on a background of blood-lacquered black stone. Rich "
        "warm candlelight. The page is blank but for a silver ink calligraphy title "
        "slowly appearing: 'THE DESCENT. PALACE OF GORE.' Ornate illuminated-manuscript "
        "border, dark fantasy aesthetic, cinematic framing. " + STYLE
    ),
    (
        2, "02-corridor-empty", None, "16:9",
        "Wide establishing shot looking down an empty corridor inside an infernal "
        "fortress. " + PALACE_CORRIDOR + " No figures present. The gore-pulse of the "
        "walls visible as faint red veins in the stone. Dramatic vanishing-point "
        "perspective, oppressive and expectant. " + STYLE
    ),
    (
        3, "03-chain-devil-drops", None, "16:9",
        "A single chain devil — a tall gaunt humanoid wrapped in iron chains with barbed "
        "hooks, pale scarred flesh, a skull-hooded face — drops down from a shadow alcove "
        "in the vaulted ceiling of the infernal corridor. Animated chains whip from the "
        "stone wall behind it, hellforge embers glowing along the chain links. Dynamic "
        "motion, cinematic angle. " + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        4, "04-three-chain-devils", None, "16:9",
        "Three chain devils materialize in a fortress corridor — tall gaunt humanoid "
        "figures wrapped in iron chains with barbed hooks, pale scarred flesh, skull-"
        "hooded faces. Chains whip from the masonry walls around them. Hellforge embers "
        "glowing on the chains. Menacing flanking formation. " + PALACE_CORRIDOR + " "
        + STYLE
    ),
    (
        5, "05-drenwal-shield-raised", DRENWAL_REF, "16:9",
        "The same Hellrider cleric from the reference image plants himself firmly at the "
        "front of an infernal fortress corridor, the ornate red-lacquered shield raised "
        "defiantly in front of him in a wall-stance. His brunette hair, beard, red-and-"
        "ivory vestments, silver cuirass, crimson cloak. Determined resolute expression. "
        + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        6, "06-shield-closeup", DRENWAL_HERO, "1:1",
        "Extreme close-up of the Shield of the Hidden Lord from the reference image: "
        "red-lacquered surface, silver diamond framework, central eye-in-sun sigil in "
        "gold, and — carved subtly into the silverwork of the upper edge — the archaic "
        "grinning face of the devil Gargauth, half-hidden in the filigree, faintly lit "
        "by corridor braziers. Intimate, unsettling. " + STYLE
    ),
    (
        7, "07-word-of-radiance", DRENWAL_REF, "16:9",
        "The same Hellrider cleric from the reference image stands firm at the front of "
        "an infernal corridor, his left hand raised — and a massive column of pure golden "
        "Lathandrian sunlight erupts from his position, radiant beams lancing outward in "
        "every direction, bathing the corridor in holy fire. The radiant burst is the "
        "focal point, with the cleric silhouetted within it. Casting Word of Radiance. "
        + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        8, "08-chain-devils-recoil", None, "16:9",
        "Three chain devils recoil in pain from a blinding column of golden radiant "
        "light at the center of an infernal corridor. Their pale scarred skin smokes "
        "and blisters where the holy light touches them, chains rattling, faces "
        "contorted in infernal agony. " + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        9, "09-aurora-draws-bow", AURORA_HERO, "16:9",
        "The same astral elf ranger-mage from the reference image slowly draws her "
        "ornate silver moonwood shortbow. Her fingers trace a glowing sigil along the "
        "starlight bowstring. Slow-motion composition, silver-white hair backlit, "
        "intense focus on her jade-green eyes. " + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        10, "10-arrow-materializes", AURORA_HERO, "16:9",
        "On the starlight bowstring of the silver moonwood bow held by the same astral "
        "elf from the reference image, a radiant arrow manifests from nothing — silver "
        "starlight shaft wrapped in a golden radiant corona, crackling with true-strike "
        "radiant energy. Close-up on the manifesting arrow, the elf's eyes and drawn "
        "hand visible in soft focus behind. " + STYLE
    ),
    (
        11, "11-aurora-eyes-starlight", AURORA_HERO, "1:1",
        "Extreme close-up of the same astral elf's face from the reference image — her "
        "jade-green eyes catching pure silver starlight, pupils reflecting the glow, a "
        "single strand of silver-white hair drifting across her brow, the faintest fey-"
        "tracery visible on her cheek. Intimate, mystical, focused. " + STYLE
    ),
    (
        12, "12-arrow-flight", None, "16:9",
        "A streaking radiant arrow of silver starlight cuts across a dark infernal "
        "corridor in mid-flight, leaving a comet-trail of silver-gold radiant light "
        "behind it. Frozen in a single motion-blurred frame. " + PALACE_CORRIDOR
        + " " + STYLE
    ),
    (
        13, "13-chain-devil-impact", None, "16:9",
        "A chain devil with a glowing radiant-burn hole punched clean through its chest, "
        "silver-gold light leaking from the wound, chains clattering loose, falling "
        "backward mid-collapse. Holy radiant light consuming the infernal figure. "
        + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        14, "14-ceiling-shadows", None, "16:9",
        "Low-angle shot looking up into the vaulted bone-ribbed ceiling shadows of the "
        "infernal corridor. Deep pools of darkness between the ribs, a single hint of "
        "movement in the upper right — a barely-visible silhouette crouching in the "
        "shadow. Ominous, expectant. " + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        15, "15-asimov-drops", ASIMOV_REF, "16:9",
        "The same hooded soulknife rogue from the reference image drops silently from "
        "the shadowed ceiling into a deep pool of darkness on the infernal corridor "
        "floor, landing in a crouch. Only his silhouette visible, faint violet psionic "
        "mist trailing from his hands. Behind him, a chain devil unaware of his arrival. "
        + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        16, "16-soul-capacitor-pulse", ASIMOV_HERO, "1:1",
        "Extreme close-up of the Soul Capacitor on the belt of the same hooded soulknife "
        "rogue from the reference image — an ornate bronze genie-lamp with crystalline "
        "violet veins pulsing along its surface like circuitry, violet smoke curling "
        "from its spout. Half of his face visible in the upper frame, bathed in violet "
        "underglow. Intimate, mystical. " + STYLE
    ),
    (
        17, "17-psychic-daggers-form", ASIMOV_HERO, "16:9",
        "The same hooded rogue from the reference image holds his hands out in front of "
        "him. Violet psionic mist coils around both of his palms and two translucent "
        "shimmering violet psychic daggers materialize in his grip — blades of smoke and "
        "light taking solid form. Dramatic close-up of the hands, the face shadowed "
        "behind. " + STYLE
    ),
    (
        18, "18-asimov-emerges", ASIMOV_REF, "16:9",
        "The same hooded soulknife rogue from the reference image steps silently out of "
        "a pool of shadow directly behind an unaware chain devil in an infernal corridor. "
        "His violet psychic daggers held low and ready, face hidden in deep hood shadow, "
        "completely silent approach. The chain devil's back is to him, oblivious. "
        + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        19, "19-sneak-attack-strike", None, "16:9",
        "A dynamic sneak-attack moment — dual translucent violet psychic daggers driving "
        "in from behind through the back of a chain devil, purple psionic light bursting "
        "out through the devil's ribcage in a brilliant violet flash. The striking hooded "
        "figure only partially visible behind the target. Explosive critical moment. "
        + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        20, "20-chain-devil-collapse", None, "16:9",
        "A chain devil mid-collapse onto the stone floor of an infernal corridor, its "
        "animated chains going slack and falling in loose loops to the ground, its body "
        "crumpling, ember-glow fading from the chain links. Smoke rising from the wound. "
        + PALACE_CORRIDOR + " " + STYLE
    ),
    (
        21, "21-aftermath-three-silhouettes", None, "16:9",
        "Wide shot of an infernal fortress corridor in the quiet aftermath of combat. "
        "Three silhouetted figures standing in the empty passage — a cleric with a "
        "raised shield, an elf archer with a lowered bow, a hooded rogue with violet "
        "mist dissipating from his hands. Fallen chain devil bodies and loose chains "
        "on the floor. Soft silver radiant glow fading in the air. " + PALACE_CORRIDOR
        + " " + STYLE
    ),
    (
        22, "22-card-ending", None, "16:9",
        "An aged parchment page with a silver moonkite sigil watermark at its center — "
        "an antlered silhouette between a stag, a crane, and a comet. Silver ink "
        "calligraphy across the page reads: 'The way to the cage was open.' Rich warm "
        "candlelight from the sides, dark fantasy illuminated-manuscript aesthetic, "
        "closing-card mood. " + STYLE
    ),
]


_uri_cache = {}


def to_data_uri(path: Path) -> str:
    key = str(path)
    if key not in _uri_cache:
        b64 = base64.b64encode(path.read_bytes()).decode()
        _uri_cache[key] = f"data:image/png;base64,{b64}"
    return _uri_cache[key]


def gen_shot(out_path: Path, ref_path, aspect_ratio: str, prompt: str):
    print(f"  Prompt length: {len(prompt)} chars, aspect: {aspect_ratio}, ref: "
          f"{ref_path.name if ref_path else '(none, t2i)'}")
    if ref_path is not None:
        # kontext: ref + prompt
        result = fal_client.subscribe(
            "fal-ai/flux-pro/kontext",
            arguments={
                "prompt": prompt,
                "image_url": to_data_uri(ref_path),
                "safety_tolerance": "6",
                "aspect_ratio": aspect_ratio,
                "num_images": 1,
                "output_format": "png",
            },
            with_logs=False,
        )
    else:
        # pure t2i — flux-pro/v1.1-ultra for quality parity
        result = fal_client.subscribe(
            "fal-ai/flux-pro/v1.1-ultra",
            arguments={
                "prompt": prompt,
                "num_images": 1,
                "aspect_ratio": aspect_ratio,
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
    print(f"Generating {total} scene shots for Chain Devils scene...\n")
    for shot_num, slug, ref, ar, prompt in SHOTS:
        done += 1
        out_path = OUT_DIR / f"shot-{slug}.png"
        print(f"== SHOT {shot_num}: {slug} ==")
        if out_path.exists():
            print(f"  [SKIP] already exists")
            print(f"  [{done}/{total}]\n")
            continue
        try:
            gen_shot(out_path, ref, ar, prompt)
        except Exception as e:
            failures += 1
            print(f"  [FAIL] {str(e)[:300]}")
        print(f"  [{done}/{total}]\n")
    print(f"\nDONE. {total - failures}/{total} shots in: {OUT_DIR}")
    if failures:
        print(f"WARN: {failures} failed — check and rerun (cached shots skip).")
    print(f"Est. cost: ~${(total - failures) * 0.04:.2f}")


if __name__ == "__main__":
    main()
