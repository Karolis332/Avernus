"""
v7: fal.ai Flux Pro Kontext (standard tier) canonical character stills.
Uses data-URI instead of fal storage upload (bypasses 403 on that endpoint).

Cost: ~$0.04/image * 6 = ~$0.24.
"""
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
REFS_DIR = HERE.parent / "refs"
OUT_DIR = HERE.parent / "generated" / "01_character_canon"
OUT_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(HERE / ".env")

DND_AVERNUS_STYLE = (
    "Official Dungeons & Dragons 5th edition sourcebook illustration. "
    "Baldur's Gate: Descent into Avernus hardcover cover art direction. "
    "Style fusion of Wayne Reynolds, Tyler Jacobson, Todd Lockwood, Frank Frazetta, "
    "and Zdzislaw Beksinski. Dark heroic fantasy oil painting. Dramatic volumetric "
    "lighting with sulphurous amber backlight, warm rim-light, deep shadow, infernal "
    "red-orange atmospheric haze. Painterly brushwork, cinematic composition, "
    "8K concept art quality, grit and ash texture overlay."
)

AVERNUS_BG_WIDE = (
    "Setting: Avernus, the first layer of the Nine Hells. Obsidian ground cracked with "
    "glowing molten lava seams, distant rivers of blood, silhouettes of Zariel's "
    "infernal war machines on the far horizon, bone architecture jutting from ash "
    "plains, sulphurous red-orange sky with distant silent lightning, choking ash-fog."
)

AVERNUS_BG_CORRIDOR = (
    "Setting: interior corridor of the Palace of Gore in Avernus — blood-lacquered "
    "black stone walls, bone-ribbed vaulted ceiling, hellforge-iron braziers casting "
    "flickering orange-red light, gore dripping from ceiling joints, deep shadow pools."
)

TARGETS = [
    {
        "slug": "aurora",
        "ref": REFS_DIR / "aurora" / "aurora-portrait-01.png",
        "shots": [
            (
                "aurora-canon-hero",
                "Heroic fantasy character portrait of the same astral elf woman from the "
                "reference image: long silver-white hair flowing, luminous pale skin, sharp "
                "jade-green eyes, a small teal gemstone on her forehead set in a silver fey "
                "circlet, delicate silver fey tracery on her cheeks like frostwork, a "
                "high-collar dark olive-green traveling robe with intricate silver "
                "Celtic-knot embroidery and a teal pendant. She cradles an ornate silver "
                "ranger's shortbow of fused moonwood — the Moonbow of Celestial Warding — "
                "its bowstring a thread of pure starlight, a silver-gold radiant arrow "
                "beginning to manifest upon it. Focused serene expression, eyes catching "
                "starlight. Three-quarter portrait, shoulders up. " + AVERNUS_BG_WIDE + " "
                + DND_AVERNUS_STYLE
            ),
            (
                "aurora-canon-full-body",
                "Full-body heroic fantasy character portrait of the same astral elf woman — "
                "silver-white hair, jade-green eyes, teal forehead gem in silver circlet, "
                "fey tracery, olive-green robe with silver Celtic embroidery, dark fey-spun "
                "traveling cloak. At her hip hangs the legendary Quiver of Elemental Chaos: "
                "ornate lid with five arrow tips emerging through round holes, sculpted "
                "panels depicting the four Elemental Planes on its sides, four element "
                "buttons on top. Moonbow in hand. Confident stance, subtle smirk. Beside "
                "her on a crenellation: Whiskerbright, her familiar — currently an imp "
                "with cat mannerisms: small demonic body with bat wings and tiny horns, "
                "stretching like a cat, opalescent eyes. " + AVERNUS_BG_WIDE + " "
                + DND_AVERNUS_STYLE
            ),
        ],
    },
    {
        "slug": "drenwal",
        "ref": REFS_DIR / "drenwal" / "drenwal-portrait-01.png",
        "shots": [
            (
                "drenwal-canon-hero",
                "Heroic fantasy character portrait of the same human Hellrider cleric from "
                "the reference image: early 30s, shoulder-length wavy brunette hair, full "
                "brown beard, weathered warrior-priest face, a small red mark on his forehead, "
                "solemn resolute expression. He wears the red-and-ivory vestments of a "
                "Hellrider of Elturel — silver Celtic-knotwork embroidery throughout, "
                "silver-embossed plate cuirass, heavy traveling cloak lined in crimson, "
                "leather spellcasting gauntlet. He raises his left hand and a radiant "
                "compass-sigil of pure golden Lathandrian light blazes above his open palm — "
                "casting Word of Radiance. His right arm bears the Shield of the Hidden "
                "Lord: red-lacquered, silver diamond framework, central eye-in-sun sigil, "
                "with the faint grinning face of the devil Gargauth subtly carved into the "
                "silverwork. Three-quarter portrait. " + AVERNUS_BG_WIDE + " "
                + DND_AVERNUS_STYLE
            ),
            (
                "drenwal-canon-full-body",
                "Full-body heroic fantasy character portrait of the same Hellrider cleric "
                "— brunette hair, full beard, red-and-ivory Hellrider vestments with "
                "silver Celtic embroidery, silver plate cuirass, crimson-lined traveling "
                "cloak, leather gauntlet. He plants himself at the front of a bone-ribbed "
                "corridor, the ornate Shield of the Hidden Lord raised in a defensive "
                "wall-stance, a warding halo of Lathandrian golden light beginning to bloom "
                "around his head and shoulders. Resolute, serene but burdened. "
                + AVERNUS_BG_CORRIDOR + " " + DND_AVERNUS_STYLE
            ),
        ],
    },
    {
        "slug": "asimov",
        "ref": REFS_DIR / "asimov" / "asimov-portrait-01.png",
        "shots": [
            (
                "asimov-canon-hero",
                "Heroic fantasy character portrait of the same interdimensional bounty "
                "hunter soulknife rogue from the reference image: lean muscular frame, "
                "deep hood pulled low, half-shadowed sharp face, a black-and-charcoal "
                "travel coat with hidden armor plates, leather bandoliers and bracers "
                "etched with psionic runes. Violet psionic mist drifts from his gloved "
                "palms and two translucent shimmering violet daggers of psionic soulknife "
                "energy manifest in his hands — blades of smoke and light. On his belt, "
                "the Soul Capacitor: an ornate bronze genie-lamp laced with crystalline "
                "violet veins that pulse like circuitry, violet smoke curling from the "
                "spout. Three-quarter portrait, half his face in shadow, dramatic violet "
                "backlight. " + AVERNUS_BG_WIDE + " " + DND_AVERNUS_STYLE
            ),
            (
                "asimov-canon-full-body",
                "Full-body heroic fantasy character portrait of the same hooded soulknife "
                "rogue — deep hooded charcoal coat, lean silhouette, psionic-rune "
                "bandoliers, Soul Capacitor lamp pulsing violet at his belt, violet "
                "psionic mist coiling around his hands and ankles, translucent violet "
                "psychic daggers held low ready. He is a coiled shadow in a pool of "
                "corridor darkness, only partially illuminated by distant hellfire brazier "
                "light. " + AVERNUS_BG_CORRIDOR + " " + DND_AVERNUS_STYLE
            ),
        ],
    },
]


_data_uri_cache = {}


def to_data_uri(path: Path) -> str:
    key = str(path)
    if key not in _data_uri_cache:
        b64 = base64.b64encode(path.read_bytes()).decode()
        _data_uri_cache[key] = f"data:image/png;base64,{b64}"
    return _data_uri_cache[key]


def gen_with_ref(out_path: Path, ref_path: Path, prompt: str):
    print(f"  Generating: {out_path.name}")
    print(f"  Prompt length: {len(prompt)} chars")

    result = fal_client.subscribe(
        "fal-ai/flux-pro/kontext",
        arguments={
            "prompt": prompt,
            "image_url": to_data_uri(ref_path),
            "safety_tolerance": "6",
            "aspect_ratio": "1:1",
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
    print(f"  [OK] Saved ({kb} KB)")


def main():
    total = sum(len(t["shots"]) for t in TARGETS)
    done = 0
    failures = 0
    print(f"Generating {total} D&D Avernus canons via fal.ai Flux Pro Kontext...\n")
    for target in TARGETS:
        print(f"== {target['slug'].upper()} ==")
        for shot_name, prompt in target["shots"]:
            done += 1
            out_path = OUT_DIR / f"{shot_name}.png"
            if out_path.exists():
                print(f"  [SKIP] {out_path.name} already exists")
                continue
            try:
                gen_with_ref(out_path, target["ref"], prompt)
            except Exception as e:
                failures += 1
                print(f"  [FAIL] {str(e)[:300]}")
            print(f"  [{done}/{total}]\n")
    print(f"\nDONE. {total - failures}/{total} canons in: {OUT_DIR}")
    if failures:
        print(f"WARN: {failures} failed")
    print(f"Est. cost: ~${(total - failures) * 0.04:.2f}")


if __name__ == "__main__":
    main()
