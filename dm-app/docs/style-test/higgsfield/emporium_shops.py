"""Shop pictures for the Emporium player screen (emporium.html?view=players): one 16:9 painting per spot.

python emporium_shops.py forge [more ids]   paints the ids that have no job yet (2 credits each), then fetches them
python emporium_shops.py                    fetches whatever is already painted; pays for nothing
State: emporium-shops.json {id: job id}. To repaint a spot, delete its line there first.
Output: dm-app/art/generated/emporium-<id>.webp (1920 wide); the 2k source stays in .playwright-mcp/hf/ (gitignored).
"""
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

HF = r"C:\Users\kpaul\AppData\Roaming\npm\node_modules\@higgsfield\cli\vendor\hf.exe"
HERE = Path(__file__).parent
STATE = HERE / "emporium-shops.json"
SOURCES = HERE.parents[3] / ".playwright-mcp" / "hf"
ART = HERE.parents[2] / "art" / "generated"

OPEN = ("A wide painterly dark fantasy illustration, the establishing picture of one stall in a travelling night market "
        "in Avernus, the first layer of the Nine Hells, seen at eye level from where a customer stands. ")
# The goods list is drawn over the right side of the picture, so the subject sits left of centre.
FRAME = (" Composition: the subject fills the left and the centre of the frame. The right third of the frame is darker and "
         "quieter, in shadow, with nothing important in it. Far behind, strings of warm market lanterns and a hazy dark red sky.")
LOOK = (" Gritty painterly brushwork with no outlines, realistic proportions, rich detail, deep shadows, a dark and uneasy "
        "mood, the look of a professional concept painting.")
RULES = (" No text, no letters, no numbers, no writing on any sign, no border, no frame, no user interface. "
         "No humans and no other customers.")

SCENES = {
    "forge": (
        "The Firesnake Forge: a huge spiked iron war machine, an armoured infernal wagon, has been opened like a clam shell "
        "and its engine block turned into a forge full of white-orange coals. Small fire snakes, serpents made of living "
        "flame, coil through the coals carrying tongs and hammers in their mouths. The smith is a salamander: a large "
        "creature with the muscular torso and arms of a man and the long coiled body of a great serpent instead of legs, "
        "covered in dark red and black scales with glowing orange cracks, with a crest of flame-like spines on his head and "
        "down his back. He works at a black anvil with his hammer raised, half turned away from the viewer. Racks of swords, "
        "spear heads, sheaves of arrows, shields and pieces of plate armour hang on the opened hull plates; a quenching "
        "trough steams; chains and hooks hang overhead. Fierce orange forge light, sparks and embers in the air."
    ),
}


def hf(*args: str) -> object:
    r = subprocess.run([HF, *args, "--json"], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit(f"FAILED {args[:3]}: {r.stderr.strip()[:300]}")
    return json.loads(r.stdout)


def paint(key: str, jobs: dict) -> dict:
    ids = hf("generate", "create", "nano_banana_2_1", "--aspect_ratio", "16:9", "--resolution", "2k",
             "--prompt", OPEN + SCENES[key] + FRAME + LOOK + RULES)
    if not (isinstance(ids, list) and len(ids) == 1):
        sys.exit(f"STOP: {key} returned {ids!r}")
    jobs = {**jobs, key: ids[0]}
    STATE.write_text(json.dumps(jobs, indent=1))  # saved at once: the CLI cannot list or cancel a job
    return jobs


def fetch(key: str, job: str) -> None:
    src = SOURCES / f"emporium-{key}.png"
    if not src.exists():
        subprocess.run([HF, "generate", "wait", job, "--timeout", "6m", "--interval", "6s", "--quiet"], capture_output=True)
        d = hf("generate", "get", job)
        if not d.get("result_url"):
            print(key, "NO RESULT:", d.get("status"))
            return
        urllib.request.urlretrieve(d["result_url"], src)
    im = Image.open(src).convert("RGB")
    im.resize((1920, round(1920 * im.height / im.width)), Image.LANCZOS).save(ART / f"emporium-{key}.webp", quality=84)
    print(key, im.size, "->", ART / f"emporium-{key}.webp", flush=True)


def main() -> None:
    jobs = json.loads(STATE.read_text()) if STATE.exists() else {}
    unknown = [k for k in sys.argv[1:] if k not in SCENES]
    if unknown:
        sys.exit(f"No scene written for: {unknown}")
    for key in sys.argv[1:]:
        if key not in jobs:  # never pay twice
            jobs = paint(key, jobs)
    for key, job in jobs.items():
        fetch(key, job)


if __name__ == "__main__":
    main()
