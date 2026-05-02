"""
Free battle map generation via Pollinations.ai (flux model).
"""
import urllib.parse
import urllib.request
from pathlib import Path

DND_ROOT = Path(__file__).parent.parent.parent
OUT_DIR = DND_ROOT / "Images"
OUT_DIR.mkdir(parents=True, exist_ok=True)

MAPS = [
    ("map-cage-chamber.png", 1024, 1024,
     "Top-down tactical battlemap of a circular subterranean chamber in an infernal "
     "fortress, bird's-eye view, painted dark fantasy style, subtle 5-foot square "
     "grid lines overlaid. The chamber is roughly 60 feet across, low ceiling. Floor "
     "of black blackite stone fused with white bone fragments. CENTER: a massive "
     "10-foot-diameter spherical iron cage suspended in the middle, hanging 10 feet "
     "off the floor, hellforged dark adamantine with hairline cracks, faint silver-"
     "white glow emanating outward through cracks. Four thick black iron chains "
     "anchor the cage to walls, floor, and ceiling, each pulsing with sickly orange "
     "energy. Two empty dry blood-troughs carved on east and west sides. One ankle-"
     "deep active blood font in the center-south, dark crimson. Northwest corner: "
     "pile of broken stone rubble (collapsed ceiling, half-cover). South side: a "
     "wide arched opening leading to a spiral stone staircase. Cool silver-blue glow "
     "from the cage center, sickly orange chain glow. Brimstone particles. Painted "
     "VTT battle map quality, no text, no labels, no character tokens, no compass "
     "rose, pure environment."),

    ("map-throne-room.png", 1024, 1280,
     "Top-down tactical battlemap of a long rectangular infernal throne hall, bird's-"
     "eye view, painted dark fantasy style, subtle 5-foot square grid lines. Hall is "
     "roughly 60 feet wide and 100 feet long, oriented vertically. Black blackite "
     "stone floor with white bone fragments fused into texture. TOP CENTER: raised "
     "stone dais with a massive throne built of fused weapons broken shields and "
     "femurs, throne pulsing with orange-red runes. Behind throne (top): four iron "
     "cages hanging on chains from ceiling, suspended above two large dark blood "
     "pools. Left and right of throne: two large oval blood pools, 10 feet wide. "
     "Top-left corner: heavy iron-banded reinforced barracks door. Four stone "
     "pillars throughout the room, ribbed with bone motifs. Four hellfire braziers "
     "along walls throwing orange-red light. Bottom edge: wide arched stone "
     "entrance. Sulphurous orange torchlight, cool blue-grey corner shadows, "
     "bloodstains streaking the floor. VTT battle map quality, no text, no labels, "
     "no character tokens, pure environment."),

    ("map-tunnel-junction.png", 1024, 1024,
     "Top-down tactical battlemap of a small hexagonal hub chamber in a subterranean "
     "blood-vein network beneath an infernal palace, bird's-eye view, painted dark "
     "fantasy style, subtle 5-foot square grid lines. Chamber is roughly 30 feet "
     "across, bone-vaulted ceiling visible as ribbed arches from above. Floor: "
     "ankle-deep dark cold blood like still oil, with three small dry stone islands "
     "rising in the center for footing. Four tunnels branch out from the chamber "
     "(one in each cardinal direction): NORTH tunnel glowing faint silver-blue, "
     "EAST tunnel warm orange-red glow, WEST tunnel cool grey-white misty, SOUTH "
     "tunnel pure black silent. Each tunnel mouth roughly 10 feet wide with worn "
     "stone arches. Southwest corner: jagged collapsed shaft of fallen rubble (the "
     "way the party arrived, cannon-blasted). Single low-burning hellfire brazier "
     "on one stone island. VTT battle map quality, no text, no labels, no character "
     "tokens, no compass rose, pure environment."),
]


def fetch(filename: str, w: int, h: int, prompt: str, seed: int):
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width={w}&height={h}&model=flux&nologo=true&enhance=true&seed={seed}"
    out = OUT_DIR / filename
    print(f"[{filename}] {w}x{h} fetching...", flush=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=240) as resp:
            data = resp.read()
        out.write_bytes(data)
        kb = len(data) // 1024
        print(f"  [OK] {kb} KB", flush=True)
    except Exception as e:
        print(f"  [FAIL] {e}", flush=True)


def main():
    print(f"Output: {OUT_DIR}\n", flush=True)
    for i, (fn, w, h, prompt) in enumerate(MAPS, 1):
        fetch(fn, w, h, prompt, seed=i * 4242)
    print("\nDONE.", flush=True)


if __name__ == "__main__":
    main()
