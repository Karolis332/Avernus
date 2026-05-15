"""
Build a self-contained offline ZIP of the Session 4 primer.
Drops onto a USB stick, copies to another PC, opens in any browser, no internet.
"""
import zipfile
from pathlib import Path
from datetime import datetime

DND_ROOT = Path(__file__).parent.parent.parent
OUT = DND_ROOT / "session-4-offline.zip"

# Files to include (relative to DND_ROOT)
INCLUDE_FILES = [
    "session-4-bitter-breath-primer.html",
    "session-4-bitter-breath-primer.md",
    "bitter-breath-boss-encounter.md",
    "bitter-breath-statblock.md",
    "campaign-state.md",
]

# All PNGs the primer references
INCLUDE_IMAGES = [
    "Images/Bitter Breath.png",
    "Images/aurora.png",
    "Images/thakk.png",
    "Images/consort.png",
    "Images/veska.png",
    "Images/yssel.png",
    "Images/monk.png",
    "Images/infant.png",
    "Images/map-cage-chamber.png",
    "Images/map-throne-room.png",
    "Images/map-tunnel-junction.png",
]

README_TEXT = f"""SESSION 4 — BITTER BREATH (Palace of Gore)
Offline DM Prep Package
Built: {datetime.now().strftime("%Y-%m-%d %H:%M")}

==============================================================
HOW TO USE
==============================================================

1. Extract this ZIP anywhere (USB stick, Desktop, anywhere).
2. Open `session-4-bitter-breath-primer.html` in any modern browser
   (Chrome, Edge, Firefox, Safari).

That's it. No internet required. No installation. No dependencies.

==============================================================
WHAT'S INSIDE
==============================================================

- session-4-bitter-breath-primer.html
    The interactive primer. Open this. Has live trackers (Vitality,
    Legendary Resistance, Round, Hostage cages, Bitter Breath HP),
    initiative tracker with editable PC/enemy values, full encounter
    walkthrough across 3 phases, cast gallery with portraits, battle
    maps, stat blocks, loot table, and DM cues.

- session-4-bitter-breath-primer.md
    Plain-text markdown version of the primer if you prefer that.

- bitter-breath-boss-encounter.md
    The original boss encounter design notes.

- bitter-breath-statblock.md
    Original stat block reference.

- campaign-state.md
    Current campaign state for context.

- Images/
    All portraits and battle maps the HTML references. Loaded by
    relative path - leave the folder structure intact.

==============================================================
TRACKERS
==============================================================

State persists in your browser's localStorage. If you switch browsers
or use Incognito, trackers reset. Use the same browser/profile across
sessions to keep your state.

==============================================================
KEYBOARD SHORTCUTS
==============================================================

- n        Next turn
- R        Reroll all initiative
- v / V    Vitality -1 / +1
- l / L    LR -1 / +1
- Left/Right  Round -1 / +1
- Esc      Close lightbox

==============================================================
BACKUP
==============================================================

Source repo: https://github.com/Karolis332/Avernus
"""


def main():
    if OUT.exists():
        OUT.unlink()
    print(f"Building {OUT.name}...", flush=True)
    total_bytes = 0
    file_count = 0
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        # Files
        for rel in INCLUDE_FILES:
            src = DND_ROOT / rel
            if src.exists():
                zf.write(src, arcname=rel)
                size = src.stat().st_size
                total_bytes += size
                file_count += 1
                print(f"  + {rel} ({size // 1024} KB)", flush=True)
            else:
                print(f"  ! MISSING: {rel}", flush=True)
        # Images
        for rel in INCLUDE_IMAGES:
            src = DND_ROOT / rel
            if src.exists():
                zf.write(src, arcname=rel)
                size = src.stat().st_size
                total_bytes += size
                file_count += 1
                print(f"  + {rel} ({size // 1024} KB)", flush=True)
            else:
                print(f"  ! MISSING: {rel}", flush=True)
        # README inside the zip
        zf.writestr("README.txt", README_TEXT)
        file_count += 1
        print(f"  + README.txt", flush=True)
    zip_size = OUT.stat().st_size
    print(f"\nDone.", flush=True)
    print(f"  File count: {file_count}", flush=True)
    print(f"  Source size: {total_bytes / 1024 / 1024:.1f} MB", flush=True)
    print(f"  ZIP size: {zip_size / 1024 / 1024:.1f} MB (compressed)", flush=True)
    print(f"  Path: {OUT}", flush=True)


if __name__ == "__main__":
    main()
