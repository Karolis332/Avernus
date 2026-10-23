"""Generate Session 9 scene art with gpt-image-1, matching the app's house style.

Style reference: art/generated/event-soul-coin-cart.webp -- dark painterly
oil-on-canvas, muted desaturated earth tones, heavy shadow, a thin band of
ember-orange sky, 3:2.

Reads the key from ~/.codex/.env. Writes webp into art/generated/.
Usage:  python scripts/gen_session9_art.py [name ...]
"""

import base64
import io
import json
import os
import sys
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "art", "generated")

STYLE = (
    "Dark painterly oil painting on aged canvas in the manner of a classical "
    "old-master work: muted, desaturated earth tones, deep shadow, soft diffuse "
    "light, visible brushwork and canvas grain, a thin band of ember-orange light "
    "along the horizon. Grim, sombre, restrained -- not bright, not glossy, not "
    "digital-illustration shiny. No text, no lettering, no watermark, no border, "
    "no frame."
)

JOBS = {
    "event-dragons-attack": (
        "Four adult dragons dive together on a black infernal warship in the red "
        "sky of Hell, seen from high above and slightly behind the ship. The "
        "vessel is a long galley of riveted dark iron plating, gun ports glowing "
        "dull orange along both flanks, a heavy iron harpoon jutting from the bow; "
        "tiny crew figures on her deck give the scale. The four dragons, each "
        "clearly distinct: a lean BLACK dragon with a bare skull-like face, long "
        "strings of acid hanging from its jaws, nearest and largest in frame; a "
        "sleek BLUE dragon with one great horn on its snout, static crackling "
        "across its scales; a GREEN dragon with a frilled neck and a long mocking "
        "smile; and a smaller blood-RED dragon with heat shimmering off its back. "
        "Far below and behind, a tall black spired tower rises out of an ash storm "
        "on a cracked red waste. Sense of weight, speed and real danger. " + STYLE
    ),
    "event-obatala-dives": (
        "A colossal elder WHITE dragon plunges straight down out of a red-black "
        "sky, far larger than anything else in the frame, wings swept back, jaws "
        "open mid-roar. His white scales are stained grey with ash and soot and "
        "steam visibly in the heat of Hell; meltwater runs from his hide and frost "
        "rimes his claws. High on his back, small and perfectly still, sits a very "
        "old tortle priest in ceremonial plate armour -- calm, unafraid, holding "
        "nothing. Behind and below him the upper spires of a black tower and a "
        "wall of ash storm. Steep downward perspective that makes the dragon "
        "overwhelming and the rider tiny. " + STYLE
    ),
}


def load_key():
    env = os.path.expanduser("~/.codex/.env")
    with open(env, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line.startswith("OPENAI_API_KEY=") and len(line) > 15:
                return line.split("=", 1)[1].strip()
    raise SystemExit(f"no OPENAI_API_KEY found in {env}")


def generate(name, prompt, key):
    body = json.dumps({
        "model": "gpt-image-1",
        "prompt": prompt,
        "size": "1536x1024",
        "quality": "high",
        "n": 1,
    }).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=600) as resp:
        payload = json.load(resp)

    img = Image.open(io.BytesIO(base64.b64decode(payload["data"][0]["b64_json"])))
    os.makedirs(OUT_DIR, exist_ok=True)
    dest = os.path.join(OUT_DIR, name + ".webp")
    img.convert("RGB").save(dest, "WEBP", quality=90, method=6)
    usage = payload.get("usage") or {}
    print(f"  {name}.webp  {img.size[0]}x{img.size[1]}  "
          f"{os.path.getsize(dest) // 1024} KB  tokens={usage.get('total_tokens', '?')}")
    return dest


if __name__ == "__main__":
    key = load_key()
    wanted = sys.argv[1:] or list(JOBS)
    for n in wanted:
        if n not in JOBS:
            raise SystemExit(f"unknown job {n!r}; known: {', '.join(JOBS)}")
        print(f"generating {n} ...")
        generate(n, JOBS[n], key)
