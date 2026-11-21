"""Portraits of the Emporium's NPCs for the cast board (the DM clicks a name, the monitor shows the NPC).

python emporium_npcs.py mahadi [more ids]   paints the ids that have no job yet (2 credits each), then fetches them
python emporium_npcs.py                     fetches whatever is already painted; pays for nothing
State: emporium-npcs.json {id: job id}. To repaint one, delete its line there first.
Output: dm-app/art/generated/npc-(id).webp (1200 wide, 3:4). A keeper is painted from a crop of the stall painting,
so the portrait is the same person as in the shop.
"""
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

HF = r"C:\Users\kpaul\AppData\Roaming\npm\node_modules\@higgsfield\cli\vendor\hf.exe"
HERE = Path(__file__).parent
STATE = HERE / "emporium-npcs.json"
SOURCES = HERE.parents[3] / ".playwright-mcp" / "hf"
ART = HERE.parents[2] / "art" / "generated"
WIDTH = 1200

SAME = ("The reference picture shows the character in a wider scene. Paint a new picture of the same character: the same "
        "face, the same body, the same clothes and colours. ")
OPEN = "A half-length character portrait for a dark fantasy game. "
FRAME = (" The character faces the viewer and looks straight at them, filling the frame from the waist up, lit from one "
         "side by warm lantern light. The background is plain, very dark and smoky, and fades to black at every edge of "
         "the picture.")
LOOK = (" Gritty painterly brushwork with no outlines, realistic proportions, rich detail, deep shadows, a dark and uneasy "
        "mood, the look of a professional concept painting.")
RULES = " No text, no letters, no numbers, no border, no frame, no user interface. Only this one character, and nobody else."

# id: (stall whose painting holds the character or None, crop of that painting as fractions (left, top, right, bottom), who)
NPCS = {
    "mahadi": ("rapture", (0.42, 0.25, 0.72, 1.0),
               "Mahadi, the host of a great pavilion in a market of the Hells: a tall, broad-shouldered, elegant man in a "
               "long coat of red and gold silk with a high collar and many rings, his hands folded in front of his chest, "
               "with a warm, knowing, perfectly friendly smile that does not reach his eyes."),
}


def hf(*args: str) -> object:
    r = subprocess.run([HF, *args, "--json"], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit(f"FAILED {args[:3]}: {r.stderr.strip()[:300]}")
    return json.loads(r.stdout)


def reference(key: str, shop: str, box: tuple) -> list:
    im = Image.open(SOURCES / f"emporium-{shop}.png").convert("RGB")
    crop = im.crop((round(box[0] * im.width), round(box[1] * im.height), round(box[2] * im.width), round(box[3] * im.height)))
    small = SOURCES / f"npc-ref-{key}.jpg"
    crop.save(small, quality=93)
    up = hf("upload", "create", str(small))
    return ["--image", up["id"] if isinstance(up, dict) else up[0]["id"] if isinstance(up[0], dict) else up[0]]


def paint(key: str, jobs: dict) -> dict:
    shop, box, who = NPCS[key]
    ids = hf("generate", "create", "nano_banana_2_1", *(reference(key, shop, box) if shop else []),
             "--aspect_ratio", "3:4", "--resolution", "2k", "--prompt", (SAME if shop else "") + OPEN + who + FRAME + LOOK + RULES)
    if not (isinstance(ids, list) and len(ids) == 1):
        sys.exit(f"STOP: {key} returned {ids!r}")
    jobs = {**jobs, key: ids[0]}
    STATE.write_text(json.dumps(jobs, indent=1))  # saved at once: the CLI cannot list or cancel a job
    return jobs


def fetch(key: str, job: str) -> None:
    src = SOURCES / f"npc-{key}.png"
    if not src.exists():
        subprocess.run([HF, "generate", "wait", job, "--timeout", "6m", "--interval", "6s", "--quiet"], capture_output=True)
        d = hf("generate", "get", job)
        if not d.get("result_url"):
            print(key, "NO RESULT:", d.get("status"))
            return
        urllib.request.urlretrieve(d["result_url"], src)
    im = Image.open(src).convert("RGB")
    im.resize((WIDTH, round(WIDTH * im.height / im.width)), Image.LANCZOS).save(ART / f"npc-{key}.webp", quality=84)
    print(key, im.size, "saved", ART / f"npc-{key}.webp", flush=True)


def main() -> None:
    jobs = json.loads(STATE.read_text()) if STATE.exists() else {}
    unknown = [k for k in sys.argv[1:] if k not in NPCS]
    if unknown:
        sys.exit(f"No NPC written for: {unknown}")
    for key in sys.argv[1:]:
        if key not in jobs:  # never pay twice
            jobs = paint(key, jobs)
    for key, job in jobs.items():
        fetch(key, job)


if __name__ == "__main__":
    main()
