"""
One-shot NPC portrait generator for Session 4 (Bitter Breath).

Generates head-and-shoulders character portraits in WotC-book oil-painting style
for the NPCs that don't have official 5e art (custom hostages + reflavored
lieutenants).

Output: C:/Users/QuLeR/DnD/Images/<slug>.png
Cost: ~$0.06 per portrait * 4 = ~$0.24
"""
import os
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
DND_ROOT = HERE.parent.parent
OUT_DIR = DND_ROOT / "Images"
OUT_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(HERE / ".env")

STYLE = (
    " Dark heroic fantasy oil painting, character portrait, three-quarter pose, "
    "Dungeons & Dragons 5th edition Monster Manual / Player's Handbook book illustration. "
    "Wayne Reynolds, Tyler Jacobson, Todd Lockwood, Steven Belledin painterly style. "
    "Painterly visible brushwork, dramatic volumetric chiaroscuro lighting, "
    "sulphurous amber backlight, cool steel mid-tones, deep shadow pools, "
    "atmospheric particle haze, intricate weathered costume detail. "
    "Vertical 3:4 portrait composition. 8K concept art quality. "
    "NO text, NO watermark, NO signature, NO frame, NOT photorealistic, NOT 3D render."
)

PORTRAITS = [
    {
        "filename": "veska.png",
        "prompt": (
            "Female human Hellrider sergeant of Elturel, captured and beaten. Mid-thirties, "
            "weathered olive skin, fresh diagonal scar across one cheek, split lip. "
            "Tangled dark-auburn hair pulled back, dirty. Wearing tattered remains of "
            "red-and-ivory Hellrider colors with a silver Lathandrian sun emblem on the "
            "chest plate, dented and bloodstained. Iron manacles on her wrists, chain "
            "trailing into the foreground. Defiant exhausted expression — jaw set, eyes "
            "burning. Kneeling inside a rusted iron cage, gripping the bars. Sulphurous "
            "orange brazier-light from outside the cage casts long bar-shadows across "
            "her face."
        ),
    },
    {
        "filename": "yssel.png",
        "prompt": (
            "Young female tiefling smuggler, late teens. Magenta-violet skin, thin "
            "elegant curling black horns swept back, gold eyes with vertical pupils, "
            "short dark hair shaved close on one side and longer on the other. Lean wiry "
            "build. Worn black leather smuggler's coat with hidden inner pockets, a torn "
            "red sash around her waist, fingerless gloves, scuffed boots. One eye recently "
            "blackened from a beating, blood crusted at her nostril. Smirking despite the "
            "situation — calculating, looking for an angle. Sitting cross-legged inside a "
            "rusted iron cage, leaning casually against the bars. Cold blue rim-light from "
            "behind, warm orange firelight from below."
        ),
    },
    {
        "filename": "monk.png",
        "prompt": (
            "Half-mad githzerai monk, gaunt and ascetic. Yellow-greenish skin, sunken "
            "deep-set eyes with pale silver irises, completely bald, long sharp angular "
            "features and pointed ears. Wearing simple tattered tan-and-grey wrapped "
            "robes of a githzerai zerth, frayed at the edges, stained with planar dust. "
            "Strange spiral tattoos on his temples that appear to shimmer faintly with "
            "their own light. Lips parted, mouthing silent words, eyes focused on a vision "
            "only he can see. Hands raised in a complex protective sigil, fingers in an "
            "unnatural geometry. Sitting on stone in a rusted iron cage. Shafts of cold "
            "blue-white planar light leak around him from impossible angles, breaking the "
            "infernal red-orange ambient light of the chamber."
        ),
    },
    {
        "filename": "infant.png",
        "prompt": (
            "Tragic still life: a single small bundle of grey-white linen swaddling-cloth "
            "lying inside a cold rusted iron cage. The bundle is tiny, only one small "
            "infant hand visible peeking from the wraps, the head turned away into the "
            "fabric — NO face visible, NO features. The cage is harsh and oversized, "
            "thick black iron bars dominating the composition, casting hard cross-hatched "
            "shadows. A single dim warm candle illuminates only the bundle and the "
            "immediate cage floor of cold stone. Heavy chains hang from above. Restraint, "
            "stillness, oppressive composition — the weight of innocence in a horrible "
            "place. NO violence, NO faces, only quiet tragic atmosphere."
        ),
    },
    {
        "filename": "thakk.png",
        "prompt": (
            "Hell Knight devil commander (Narzugon), lawful evil. Massive armored "
            "humanoid, seven feet tall, wall-of-muscle build. Wearing black spiked full "
            "plate armor crusted with dried blood and Hellrider trophy-skulls. A massive "
            "tower shield is BOLTED directly into the flesh of his left arm — the metal "
            "fused with the bone, no straps, you can see scar tissue around the rivets. "
            "His right hand grips a serrated cleaver-sword. His face is a brutal "
            "scarred devilish visage with downward-curving horns, glowing yellow eyes, "
            "tusks, no expression. Standing in formation pose, shield forward, ready to "
            "absorb a charge. Background: gore-stone walls of an Avernal throne room, "
            "flickering hellfire braziers, sulphurous orange backlight casting his "
            "silhouette."
        ),
    },
]


def generate(prompt_full: str, out_path: Path):
    print(f"  -> Generating: {out_path.name}", flush=True)
    result = fal_client.subscribe(
        "fal-ai/flux-pro/v1.1-ultra",
        arguments={
            "prompt": prompt_full,
            "aspect_ratio": "3:4",
            "num_images": 1,
            "output_format": "png",
            "safety_tolerance": "6",
        },
        with_logs=False,
    )
    out_url = result["images"][0]["url"]
    resp = requests.get(out_url, timeout=180)
    resp.raise_for_status()
    out_path.write_bytes(resp.content)
    kb = out_path.stat().st_size // 1024
    print(f"  [OK] {out_path.name} ({kb} KB)", flush=True)


def main():
    print(f"Generating {len(PORTRAITS)} NPC portraits to: {OUT_DIR}", flush=True)
    print(f"Estimated cost: ~${len(PORTRAITS) * 0.06:.2f}\n", flush=True)
    failures = 0
    for i, p in enumerate(PORTRAITS, 1):
        out_path = OUT_DIR / p["filename"]
        print(f"[{i}/{len(PORTRAITS)}] {p['filename']}", flush=True)
        if out_path.exists() and out_path.stat().st_size > 50_000:
            print(f"  [SKIP] already exists ({out_path.stat().st_size // 1024} KB)\n", flush=True)
            continue
        full_prompt = p["prompt"] + STYLE
        try:
            generate(full_prompt, out_path)
        except Exception as e:
            failures += 1
            print(f"  [FAIL] {str(e)[:400]}", flush=True)
        print("", flush=True)
    print(f"DONE. {len(PORTRAITS) - failures}/{len(PORTRAITS)} succeeded.", flush=True)


if __name__ == "__main__":
    main()
