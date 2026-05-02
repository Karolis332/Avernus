"""
Fallback: generate NPC portraits via OpenAI gpt-image-1 (different billing from fal.ai).

Output: C:/Users/QuLeR/DnD/Images/<slug>.png
Cost: ~$0.17 per high-quality 1024x1536 portrait * 4 = ~$0.68
"""
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

HERE = Path(__file__).parent
DND_ROOT = HERE.parent.parent
OUT_DIR = DND_ROOT / "Images"
OUT_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

STYLE = (
    " Dark heroic fantasy oil painting character portrait, three-quarter pose, "
    "Dungeons and Dragons 5e Monster Manual / Player's Handbook book illustration, "
    "Wayne Reynolds and Tyler Jacobson and Todd Lockwood painterly style. "
    "Visible brushwork, dramatic volumetric chiaroscuro lighting, sulphurous amber backlight, "
    "cool steel mid-tones, deep shadow pools, atmospheric particle haze, "
    "intricate weathered costume detail. Vertical 3:4 composition. "
    "Concept art quality. No text, no watermark, no signature, no frame, "
    "not photorealistic, not 3D render."
)

PORTRAITS = [
    {
        "filename": "veska.png",
        "prompt": (
            "Heroic female human knight, mid-thirties, weathered olive skin, dignified "
            "determined expression. Dark-auburn hair pulled back. Wearing weathered "
            "red-and-ivory ceremonial Hellrider knight regalia with a silver sunburst "
            "emblem on the chest plate, dented from many battles, badge of an Elturian "
            "order of paladins. Standing tall inside an iron-barred chamber, hands on "
            "the bars, looking outward bravely. Warm orange torchlight from beyond the "
            "bars casts long shadows across her face. Inspirational fantasy character "
            "portrait."
        ),
    },
    {
        "filename": "yssel.png",
        "prompt": (
            "Young adult female tiefling adventurer, twenties. Magenta-violet skin, "
            "thin elegant curling black horns swept back, gold eyes with vertical "
            "pupils, short dark hair shaved close on one side. Lean wiry build. Worn "
            "black leather adventurer coat with many pockets, a red sash around her "
            "waist, fingerless gloves, scuffed boots. Clever sly expression, calculating, "
            "looking for an angle. Sitting cross-legged inside an iron-barred chamber, "
            "leaning casually against the bars. Cold blue rim-light from behind, warm "
            "orange firelight from below. Charismatic rogue character portrait."
        ),
    },
    {
        "filename": "monk.png",
        "prompt": (
            "Wise githzerai monk character, gaunt ascetic frame. Yellow-greenish skin, "
            "sunken deep-set eyes with pale silver irises, completely bald, long sharp "
            "angular features and pointed ears. Wearing simple weathered tan-and-grey "
            "wrapped monastic robes. Strange spiral tattoos on his temples that shimmer "
            "faintly with their own light. Eyes focused on a vision only he can see. "
            "Hands raised in a complex meditative sigil, fingers in an unusual geometry. "
            "Sitting on stone in a contemplative pose. Shafts of cold blue-white astral "
            "light leak around him from impossible angles, breaking the orange ambient "
            "light of the chamber. Mystical character portrait."
        ),
    },
    {
        "filename": "infant.png",
        "prompt": (
            "Quiet still life of an empty wicker bassinet on cold stone floor, with a "
            "folded grey-white linen blanket lying neatly inside. A single small "
            "burning candle in a brass candlestick on the bassinet's edge casts a warm "
            "circle of light. Heavy iron-barred chamber visible in the dark background. "
            "Loose iron chains arranged on the floor nearby. NO figures, NO people, "
            "ONLY objects and light. Atmospheric melancholic still life painting in the "
            "style of Caravaggio chiaroscuro meets dark fantasy."
        ),
    },
]


def generate(prompt_full: str, out_path: Path):
    print(f"  -> Generating: {out_path.name}", flush=True)
    result = client.images.generate(
        model="gpt-image-1",
        prompt=prompt_full,
        size="1024x1536",
        quality="high",
        n=1,
    )
    b64 = result.data[0].b64_json
    out_path.write_bytes(base64.b64decode(b64))
    kb = out_path.stat().st_size // 1024
    print(f"  [OK] {out_path.name} ({kb} KB)", flush=True)


def main():
    print(f"Generating {len(PORTRAITS)} NPC portraits via OpenAI gpt-image-1", flush=True)
    print(f"Output: {OUT_DIR}", flush=True)
    print(f"Estimated cost: ~${len(PORTRAITS) * 0.17:.2f}\n", flush=True)
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
            print(f"  [FAIL] {str(e)[:500]}", flush=True)
        print("", flush=True)
    print(f"DONE. {len(PORTRAITS) - failures}/{len(PORTRAITS)} succeeded.", flush=True)


if __name__ == "__main__":
    main()
