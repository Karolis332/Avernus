"""Item pictures for the Emporium player screen: 16 items per painting (a 4 x 4 sheet), shown as sprites.

python emporium_items.py 0 [more sheet numbers]   paints the sheets that have no job yet (2 credits each), then fetches
python emporium_items.py                          fetches what is painted and rewrites the map; pays for nothing
python emporium_items.py --list                   prints which items are on which sheet; pays for nothing
State: emporium-items.json {sheet: {job, keys}}. The keys of a painted sheet are frozen there, so stock added later
never moves a picture. To repaint a sheet, delete its entry and its source png in .playwright-mcp/hf/ first.
Output: dm-app/art/generated/emporium-items-NN.webp and dm-app/sessions/campaign-emporium-item-art.js (key: [sheet, cell]).
Sheets are painted at 4k (1024 px a tile) and stored 3072 wide (768 px a tile): the DM asked for more detail than the
first 2k sample of sheet 0 (job 5b8c64f0-7241-4c6e-8c3f-3b6ac6ffad77, kept as emporium-items-00-2k.png).
"""
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

HF = r"C:\Users\kpaul\AppData\Roaming\npm\node_modules\@higgsfield\cli\vendor\hf.exe"
HERE = Path(__file__).parent
APP = HERE.parents[2]
STATE = HERE / "emporium-items.json"
PHRASES = HERE / "emporium-item-phrases.json"  # key: what the item looks like; a key not listed is drawn from its name
SOURCES = APP.parent / ".playwright-mcp" / "hf"
ART = APP / "art" / "generated"
MAP = APP / "sessions" / "campaign-emporium-item-art.js"
SIDE = 4  # tiles per row and per column
HOLD = ("informant|",)  # stock being rewritten: planned only with --all, so no sheet is painted for rows that change
RESOLUTION = "4k"
STORED = 3072  # width of the stored sheet in pixels
ROWS_JS = ("var p=require('path'),a=process.argv[1];var C=require(p.join(a,'js','core.js')),"
           "M=require(p.join(a,'sessions','campaign-emporium-goods.js'));var o=[];"
           "M.spots.forEach(function(s){(s.stock||[]).forEach(function(i){o.push([s.id+'|'+C.stripTags(i.name),C.stripTags(i.name)]);});});"
           "console.log(JSON.stringify(o));")

OPEN = ("A sheet of sixteen separate item illustrations for the shop screen of a dark fantasy game, laid out as a strict "
        "grid of four rows and four columns of equal square tiles, separated by thin black lines. Each tile holds exactly "
        "one item, centred, drawn large so that it fills about four fifths of its tile, seen at a three-quarter angle, on "
        "a plain, very dark brown background with a soft warm glow behind the item. ")
LOOK = (" Every item is painted like a treasured relic in a museum case, with a great deal of fine detail: engraving and "
        "filigree in the metal, the grain of the wood, stitching, creases and wear in the leather, nicks, scratches and "
        "soot, small gems and inlays, sharp bright highlights along the edges and soft reflected firelight. Gritty "
        "painterly brushwork with no outlines, realistic proportions, deep shadows, the look of a professional concept "
        "painting. No text, no letters, no numbers, no labels, no captions, no border round the sheet.")
ORDINAL = ["Row 1", "Row 2", "Row 3", "Row 4"]


def hf(*args: str, busy_ok: bool = False) -> object:
    """busy_ok: return None when the plan's limit of jobs at once is reached (nothing is charged then)."""
    r = subprocess.run([HF, *args, "--json"], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        if busy_ok and "rate_limit_reached" in r.stderr + r.stdout:
            return None
        sys.exit(f"FAILED {args[:3]}: {r.stderr.strip()[:300]}")
    return json.loads(r.stdout)


def stock_rows() -> list:
    r = subprocess.run(["node", "-e", ROWS_JS, str(APP)], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit("could not read the stock: " + r.stderr.strip()[:300])
    return sorted(json.loads(r.stdout), key=lambda row: not row[0].startswith("forge|"))  # the Forge first: the test sheet


def plan(state: dict) -> dict:
    """Sheet number: [(key, name) x 16]. Painted sheets keep their keys; rows with no picture yet fill new sheets."""
    names = dict(row for row in stock_rows() if "--all" in sys.argv or not row[0].startswith(HOLD))
    sheets = {int(n): [(k, names.get(k, k.split("|", 1)[1])) for k in s["keys"]] for n, s in state.items()}
    taken = {k for s in state.values() for k in s["keys"]}
    todo = [(k, n) for k, n in names.items() if k not in taken]
    number = 0
    while todo:
        while number in sheets:
            number += 1
        sheets[number], todo = todo[:SIDE * SIDE], todo[SIDE * SIDE:]
    return sheets


def prompt(items: list, phrases: dict) -> str:
    lines = []
    for row in range(SIDE):
        cells = items[row * SIDE:(row + 1) * SIDE]
        if cells:
            lines.append(ORDINAL[row] + ", left to right: " + "; ".join(
                f"{i + 1}) {phrases.get(key, name)}" for i, (key, name) in enumerate(cells)) + ".")
    empty = SIDE * SIDE - len(items)
    return OPEN + " ".join(lines) + (f" The last {empty} tiles are empty and dark." if empty else "") + LOOK


def paint(number: int, items: list, phrases: dict, state: dict) -> dict:
    args = ("generate", "create", "nano_banana_2_1", "--aspect_ratio", "1:1", "--resolution", RESOLUTION,
            "--prompt", prompt(items, phrases))
    ids = hf(*args, busy_ok=True)
    if ids is None:  # the Plus plan runs 8 jobs at once: wait for the queued sheets, then ask again
        print("all job slots busy: fetching the queued sheets first", flush=True)
        for n, s in state.items():
            fetch(n, s["job"])
        ids = hf(*args)
    if not (isinstance(ids, list) and len(ids) == 1):
        sys.exit(f"STOP: sheet {number} returned {ids!r}")
    state = {**state, str(number): {"job": ids[0], "keys": [k for k, _ in items]}}
    STATE.write_text(json.dumps(state, indent=1))  # saved at once: the CLI cannot list or cancel a job
    return state


def fetch(number: str, job: str) -> bool:
    src = SOURCES / f"emporium-items-{int(number):02d}.png"
    if not src.exists():
        subprocess.run([HF, "generate", "wait", job, "--timeout", "6m", "--interval", "6s", "--quiet"], capture_output=True)
        d = hf("generate", "get", job)
        if not d.get("result_url"):
            print("sheet", number, "NO RESULT:", d.get("status"))
            return False
        urllib.request.urlretrieve(d["result_url"], src)
    out = ART / f"emporium-items-{int(number):02d}.webp"
    Image.open(src).convert("RGB").resize((STORED, STORED), Image.LANCZOS).save(out, quality=82)
    print("sheet", number, "->", out, flush=True)
    return True


def write_map(state: dict, ready: list) -> None:
    at = {key: [int(n), cell] for n in ready for cell, key in enumerate(state[n]["keys"])}
    data = {"side": SIDE, "sheets": {n: f"art/generated/emporium-items-{int(n):02d}.webp" for n in ready}, "at": at}
    MAP.write_text(
        "// Item pictures of the Emporium: which sheet and which tile (row by row) shows a stock row.\n"
        "// Written by docs/style-test/higgsfield/emporium_items.py: do not edit by hand.\n"
        "(function () {\n  \"use strict\";\n  var ART = " + json.dumps(data, indent=1, ensure_ascii=False).replace("\n", "\n  ") + ";\n"
        "  if (typeof module !== \"undefined\" && module.exports) module.exports = ART;\n"
        "  else window.EMPORIUM_ITEM_ART = ART;\n})();\n", encoding="utf-8", newline="\n")
    print("map:", len(at), "items on", len(ready), "sheets")


def main() -> None:
    state = json.loads(STATE.read_text()) if STATE.exists() else {}
    phrases = json.loads(PHRASES.read_text(encoding="utf-8")) if PHRASES.exists() else {}
    sheets = plan(state)
    if "--list" in sys.argv:
        for number in sorted(sheets):
            print(number, "painted" if str(number) in state else "-", [k for k, _ in sheets[number]])
        return
    for arg in sys.argv[1:]:
        number = int(arg)
        if number not in sheets:
            sys.exit(f"no sheet {number}: there are {len(sheets)}")
        if str(number) not in state:  # never pay twice
            state = paint(number, sheets[number], phrases, state)
    write_map(state, [n for n, s in state.items() if fetch(n, s["job"])])


if __name__ == "__main__":
    main()
