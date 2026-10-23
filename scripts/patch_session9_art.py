"""Embed the generated Session 9 art into sessions/09-arkhans-tower.js.

Reads the live file pulled from the DM app, inserts two {t:"img"} blocks using
the app's existing convention (see art/generated/event-soul-coin-cart.webp in
'Across the Wastes'), and writes an upload-ready copy.

Idempotent: re-running will not duplicate the blocks.
"""

import os
import sys

SRC = os.path.expanduser(r"~/AppData/Local/Temp/dmapp-s9.js")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "dm-app-patches", "09-arkhans-tower.js")

IMG = ('        {{ t: "img", src: "art/generated/{name}.webp", '
       'caption: "{cap}", credit: "Generated art (gpt-image-1)." }},\n')

# (anchor line that the image is inserted BEFORE, image name, caption)
INSERTS = [
    ('{ t: "p", text: "The four dragons are {@c skarrix|Slarkas}',
     "event-dragons-attack",
     "Four shapes drop from the four lower spires, and dive."),
    ('{ t: "p", text: "Go to {@scene krull-arrives|Krull Arrives}." }',
     "event-obatala-dives",
     "The second roar: Obatala comes down out of the sky, with Krull on his back."),
]


def main():
    if not os.path.exists(SRC):
        sys.exit(f"source not found: {SRC}\nRe-download 09-arkhans-tower.js first.")
    text = open(SRC, encoding="utf-8").read()

    added = 0
    for anchor, name, cap in INSERTS:
        if f'"art/generated/{name}.webp"' in text:
            print(f"  already present: {name}")
            continue
        i = text.find(anchor)
        if i < 0:
            sys.exit(f"anchor not found for {name}:\n  {anchor[:70]}")
        line_start = text.rfind("\n", 0, i) + 1
        text = text[:line_start] + IMG.format(name=name, cap=cap) + text[line_start:]
        print(f"  inserted: {name}")
        added += 1

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)
    print(f"\nwrote {OUT}  ({added} block(s) added, {len(text)} bytes)")


if __name__ == "__main__":
    main()
