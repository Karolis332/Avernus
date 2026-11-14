"""Copy every generated video on this PC into one sorted folder with a gallery page.
Re-run after new renders: it copies only files that are missing or changed.
usage: python collect_videos.py"""
import html
import shutil
from pathlib import Path

HF = Path(__file__).parent
REPO = HF.parents[1]
DEST = REPO / "video-generations"

# (folder, title, what it is, [(source dir, glob), ...]); the first group that matches a file keeps it.
GROUPS: list[tuple[str, str, str, list[tuple[Path, str]]]] = [
    ("07-sky-chase-rework-shots", "Sky chase: rework, shot by shot (painted)",
     "Single hero beats made the new way (key frame painted mid-move, one beat per 3 s shot) and the rounds recut with them. Not in the film yet.",
     [(HF, "film-t1-*.mp4"), (HF, "film-h*.mp4"), (HF, "round*-new.mp4")]),
    ("06-sky-chase-painted", "Sky chase: painted film (the one in the app)",
     "Style B, painterly. Eleven six-second rounds and the joined film that plays in Session 13.",
     [(HF, "film-v5-*.mp4"), (HF, "sky-chase-painted-*.mp4"), (REPO / "dm-app/art/generated", "sky-chase-film.mp4")]),
    ("05-sky-chase-style-tests", "Sky chase: tests between the cuts",
     "The voice test with hero lines (rejected) and the first painted test of the helm and chute (became round 4).",
     [(HF, "film-v3-*.mp4"), (HF, "film-v4-*.mp4")]),
    ("04-sky-chase-v2-cel-shaded", "Sky chase: v2, cel-shaded 2D",
     "Eight rounds, one flowing take each, and the joined 48 s film.",
     [(HF, "film-v2-*.mp4"), (HF, "sky-chase-film-v2.mp4")]),
    ("03-sky-chase-v1-photoreal", "Sky chase: v1, photoreal",
     "Three hard cuts a round, the first samples and the joined 48 s film.",
     [(HF, "film-chase-sample.mp4"), (HF, "film-test-*.mp4"), (HF, "film-r*.mp4"), (HF, "sky-chase-film-v1.mp4")]),
    ("02-stat-block-cinematics-1080p", "Stat block clips: photoreal cinematics (1080p)",
     "Obatala's moves, Dumal's Hellfire, the Mirror of Mephistar, the Lady Vengeance and her cannon. The app plays re-encoded copies from dm-app/art/generated.",
     [(HF, "cine-*.mp4")]),
    ("01-first-drafts-720p", "First drafts (720p, painted stills)",
     "The first Higgsfield clips, before the cinematic look: Obatala in snow, then in the Hells.",
     [(HF, "snow-*.mp4"), (HF, "hells-*.mp4"), (HF, "obatala-*.mp4"), (HF, "dumal-*.mp4"), (HF, "lady-*.mp4"), (HF, "mirror-*.mp4")]),
    ("00-other", "Other clips found in the scratch folder",
     "Not made with the Higgsfield scripts; where they came from was not recorded.",
     [(HF.parent, "*.mp4")]),
]

NOTES = {
    "film-h3-drenwal-heal.mp4": "Unused: the mace slam the DM said looks like he kills them.",
    "film-h3b-drenwal-word.mp4": "Unused: the whispered word with pale light.",
    "film-h3c-drenwal-stand.mp4": "Healing word as the DM described it: \"Stand!\" and a bright yellow light.",
    "film-t1-veska.mp4": "The first test against stiff characters. DM: \"the lance thrust is better\".",
    "film-v3-engine.mp4": "Rejected: hero voice lines (\"hella cringe\").",
    "film-v5-r1.mp4": "Uncut: the last 0.8 s morphs Lucan into Veska.",
    "film-v5-r8.mp4": "Uncut: a sailing ship appears behind Aurora in the last second.",
    "sky-chase-film.mp4": "The film in the app (Session 13, Sky Chase).",
    "round1-new.mp4": "Round 1 recut with Drenwal's new shield shot. DM: \"good one\".",
    "round3-new.mp4": "Round 3 recut with the \"Stand!\" shot. Waits for the DM's verdict.",
}


def same(src: Path, dst: Path) -> bool:
    return dst.exists() and dst.stat().st_size == src.stat().st_size and dst.stat().st_mtime >= src.stat().st_mtime


def collect() -> list[tuple[str, str, str, list[Path]]]:
    taken: set[Path] = set()
    out = []
    for folder, title, about, sources in GROUPS:
        files = sorted({f for d, pattern in sources for f in d.glob(pattern)} - taken, key=lambda f: f.name)
        taken |= set(files)
        target = DEST / folder
        target.mkdir(parents=True, exist_ok=True)
        for f in files:
            if not same(f, target / f.name):
                shutil.copy2(f, target / f.name)
        out.append((folder, title, about, files))
    return out


def gallery(groups: list[tuple[str, str, str, list[Path]]]) -> str:
    parts = ["<!doctype html><meta charset='utf-8'><title>Video generations</title><style>"
             "body{background:#14100e;color:#e8dccb;font:15px/1.5 system-ui,sans-serif;margin:24px auto;max-width:1800px;padding:0 20px}"
             "h1{font-size:22px}h2{font-size:18px;margin:34px 0 4px}p{margin:4px 0 12px;color:#bfb2a0}"
             ".g{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:14px}"
             "video{width:100%;border-radius:6px;background:#000}figure{margin:0}figcaption{font-size:13px;color:#bfb2a0}b{color:#f1e6d4}"
             "</style><h1>Every video generated for the campaign</h1>"
             "<p>Copies of the full-quality files. Nothing plays by itself: press play on a clip.</p>"]
    for folder, title, about, files in sorted(groups, key=lambda g: g[0]):
        size = sum(f.stat().st_size for f in files) // 2**20
        parts.append(f"<h2>{html.escape(title)}</h2><p>{html.escape(about)} <b>{len(files)} clips, {size} MB</b>, folder <code>{folder}</code>.</p><div class='g'>")
        for f in files:
            note = NOTES.get(f.name, "")
            parts.append(f"<figure><video src='{folder}/{f.name}' controls preload='metadata'></video>"
                         f"<figcaption><b>{f.name}</b> {html.escape(note)}</figcaption></figure>")
        parts.append("</div>")
    return "".join(parts)


if __name__ == "__main__":
    found = collect()
    (DEST / "index.html").write_text(gallery(found), encoding="utf-8")
    total = sum(len(g[3]) for g in found)
    for folder, _, _, files in sorted(found, key=lambda g: g[0]):
        print(f"{len(files):3d}  {folder}")
    print(total, "clips,", sum(f.stat().st_size for g in found for f in g[3]) // 2**20, "MB ->", DEST)
