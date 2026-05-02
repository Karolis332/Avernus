"""
Free fallback: Pollinations.ai (no API key, no auth, no moderation).
Quality: SDXL/Flux tier - decent but not Midjourney v6.
Cost: $0
"""
import urllib.parse
import urllib.request
from pathlib import Path

DND_ROOT = Path(__file__).parent.parent.parent
OUT_DIR = DND_ROOT / "Images"
OUT_DIR.mkdir(parents=True, exist_ok=True)

STYLE_TAIL = (
    " dark heroic fantasy oil painting character portrait, "
    "Dungeons and Dragons book illustration, Wayne Reynolds Tyler Jacobson "
    "painterly style, dramatic chiaroscuro lighting, sulphurous amber backlight, "
    "intricate weathered costume detail, vertical 3:4 portrait, "
    "no text, no watermark, no signature, no border"
)

PORTRAITS = [
    ("veska.png",
     "Heroic female human knight portrait, mid-thirties, weathered olive skin, "
     "dignified determined expression, dark-auburn hair pulled back, wearing dented "
     "red-and-ivory ceremonial knight regalia with silver sunburst emblem on chest "
     "plate, standing tall behind iron bars of a dungeon cell, warm orange torchlight "
     "from beyond the bars casting long shadows across her face."),
    ("yssel.png",
     "Young female tiefling rogue character portrait, twenties, magenta-violet skin, "
     "thin elegant curling black horns swept back, gold eyes with vertical pupils, "
     "short dark hair shaved close on one side, lean wiry build, wearing worn black "
     "leather adventurer coat with hidden pockets and a torn red sash, fingerless "
     "gloves, sly clever expression, sitting cross-legged behind iron bars, cold "
     "blue rim-light from behind, warm orange firelight from below."),
    ("monk.png",
     "Wise githzerai monk character portrait, gaunt ascetic frame, yellow-greenish "
     "skin, sunken deep-set silver-iris eyes, completely bald, sharp angular "
     "features, pointed ears, wearing simple weathered tan-and-grey wrapped monastic "
     "robes, glowing spiral tattoos on temples, hands raised in a meditative sigil, "
     "contemplative pose seated on stone, shafts of cold blue-white astral light "
     "leaking around him from impossible angles."),
    ("infant.png",
     "Quiet still life of an empty wicker bassinet on cold stone floor in a dark "
     "dungeon chamber, folded grey-white linen blanket inside, single dim warm "
     "candle in brass holder on the bassinet edge, heavy iron bars visible in dark "
     "background, loose iron chains arranged on stone floor, no figures, no people, "
     "only objects and light, atmospheric melancholic Caravaggio chiaroscuro "
     "still life oil painting."),
]


def fetch(filename: str, prompt: str, seed: int):
    full = prompt + STYLE_TAIL
    encoded = urllib.parse.quote(full)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1024&height=1536&model=flux&nologo=true&enhance=true&seed={seed}"
    out = OUT_DIR / filename
    print(f"[{filename}] fetching ({len(full)} char prompt)...", flush=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            data = resp.read()
        out.write_bytes(data)
        kb = len(data) // 1024
        if kb < 20:
            print(f"  [SUSPICIOUS] only {kb} KB - likely error response. First 200 bytes: {data[:200]!r}", flush=True)
        else:
            print(f"  [OK] {kb} KB", flush=True)
    except Exception as e:
        print(f"  [FAIL] {e}", flush=True)


def main():
    print(f"Output: {OUT_DIR}\nUsing Pollinations.ai (free, flux model)\n", flush=True)
    for i, (fn, prompt) in enumerate(PORTRAITS, 1):
        fetch(fn, prompt, seed=i * 137)
    print("\nDONE.", flush=True)


if __name__ == "__main__":
    main()
