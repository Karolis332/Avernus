"""
Phase 7: Fetch free SFX samples for the Chain Devils scene.

Sources: Pixabay Sound Effects (CC0, no API key required) and a curated list
of direct download URLs for battle-appropriate sounds.

Output: sfx/*.mp3 or .wav — labeled by role in the timeline.
"""
import os
from pathlib import Path
import requests

HERE = Path(__file__).parent
OUT_DIR = HERE.parent / "generated" / "07_sfx"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Direct CDN URLs for CC0 / public-domain / Pixabay-free sound effects.
# Sources verified: Pixabay (Content License = free for commercial use, no attribution required).
SFX_LIBRARY = [
    # Ambient bed
    {
        "slug": "ambient-dungeon-wind",
        "url": "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
        "role": "bed for whole scene — low rumble cave wind",
    },
    # Magic / spellcasting
    {
        "slug": "magic-spell-arcane-cast",
        "url": "https://cdn.pixabay.com/download/audio/2022/10/30/audio_a6ec7e3fa6.mp3",
        "role": "Shot 2: Aurora Arcane Eye cast",
    },
    {
        "slug": "magic-whoosh-divine",
        "url": "https://cdn.pixabay.com/download/audio/2022/05/13/audio_38eba76b03.mp3",
        "role": "Shot 10: Drenwal Word of Radiance burst",
    },
    # Cannon + explosion
    {
        "slug": "cannon-fire-deep",
        "url": "https://cdn.pixabay.com/download/audio/2022/01/19/audio_0d77e0a9f7.mp3",
        "role": "Shot 7: arcane cannon recoil + force blast launch",
    },
    {
        "slug": "explosion-impact-heavy",
        "url": "https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6ccf3232f.mp3",
        "role": "Shot 8: tunnel collapse impact",
    },
    # Chains
    {
        "slug": "chains-rattle-1",
        "url": "https://cdn.pixabay.com/download/audio/2022/10/29/audio_1e4fc46547.mp3",
        "role": "Shots 4, 9, 13: chain devil chains moving",
    },
    # Bow + arrow
    {
        "slug": "arrow-release-radiant",
        "url": "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8e7d0d8fc.mp3",
        "role": "Shot 12: arrow release + flight",
    },
    {
        "slug": "arrow-impact-flesh",
        "url": "https://cdn.pixabay.com/download/audio/2022/04/20/audio_00b47a5c5c.mp3",
        "role": "Shot 12: arrow radiant impact",
    },
    # Psionic / dagger
    {
        "slug": "magic-crackle-psionic",
        "url": "https://cdn.pixabay.com/download/audio/2022/10/30/audio_944b7beefd.mp3",
        "role": "Shots 13, 14: psychic daggers form + strike crackle",
    },
    {
        "slug": "dagger-strike-wet",
        "url": "https://cdn.pixabay.com/download/audio/2022/04/27/audio_0625c1539c.mp3",
        "role": "Shot 14: Asimov sneak attack impact",
    },
    # Transitions / cards
    {
        "slug": "parchment-turn",
        "url": "https://cdn.pixabay.com/download/audio/2022/03/10/audio_7f87b02bd8.mp3",
        "role": "Shots 1, 5, 15: parchment card reveals",
    },
    # Body fall
    {
        "slug": "body-fall-wet",
        "url": "https://cdn.pixabay.com/download/audio/2022/03/10/audio_20ac95aa8e.mp3",
        "role": "Shots 12, 14: chain devils collapse into blood",
    },
]


def fetch(item):
    out = OUT_DIR / f"{item['slug']}.mp3"
    if out.exists() and out.stat().st_size > 0:
        print(f"  [SKIP] {out.name} already exists ({out.stat().st_size // 1024} KB)")
        return True
    try:
        r = requests.get(item["url"], timeout=60, headers={"User-Agent": "Mozilla/5.0"})
        r.raise_for_status()
        out.write_bytes(r.content)
        kb = len(r.content) // 1024
        print(f"  [OK] {out.name} ({kb} KB) -- {item['role']}")
        return True
    except Exception as e:
        print(f"  [FAIL] {item['slug']}: {str(e)[:200]}")
        return False


def main():
    total = len(SFX_LIBRARY)
    done = 0
    failures = 0
    print(f"Fetching {total} SFX samples from Pixabay (CC0)...\n")
    for item in SFX_LIBRARY:
        done += 1
        print(f"== [{done}/{total}] {item['slug']} ==")
        if not fetch(item):
            failures += 1
        print()
    print(f"\nDONE. {total - failures}/{total} SFX in: {OUT_DIR}")


if __name__ == "__main__":
    main()
