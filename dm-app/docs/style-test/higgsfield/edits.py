"""Scratch: fix a finished still with a nano_banana_2_1 4k edit (3 credits each).
Specs: edit-specs.json {key: [source png, prompt]}. State: cine-edits.json {key: job id}. Output: cine-<key>.png.
usage: python edits.py [key ...]"""
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

HF = r"C:\Users\kpaul\AppData\Roaming\npm\node_modules\@higgsfield\cli\vendor\hf.exe"
OUT = Path(__file__).parent
STATE = OUT / "cine-edits.json"
TAIL = " Photorealistic live-action film still, extremely detailed, same lighting and colour as the original."


def hf(*args: str) -> object:
    r = subprocess.run([HF, *args, "--json"], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit(f"FAILED {args[:3]}: {r.stderr.strip()[:300]}")
    return json.loads(r.stdout)


def main() -> None:
    specs = json.loads((OUT / "edit-specs.json").read_text(encoding="utf-8"))
    jobs = json.loads(STATE.read_text())
    for key in sys.argv[1:] or specs:
        src, prompt, *opt = specs[key]  # optional third item: resolution; a restyle then skips the photoreal tail
        if key in jobs:  # never pay twice
            continue
        imgs = []
        for i, one in enumerate(src if isinstance(src, list) else [src]):  # 5.5K sources fail as inputs: send a 4096-px copy
            small = OUT / f"edit-src-{key}-{i}.jpg"
            im = Image.open(OUT / one).convert("RGB")
            w = min(4096, max(im.width, 2048))
            im.resize((w, round(w * im.height / im.width)), Image.LANCZOS).save(small, quality=93)
            up = hf("upload", "create", str(small))
            imgs += ["--image", up["id"] if isinstance(up, dict) else up[0]["id"] if isinstance(up[0], dict) else up[0]]
        ids = hf("generate", "create", "nano_banana_2_1", *imgs, "--aspect_ratio", "16:9" if isinstance(src, list) else "auto",
                 "--resolution", opt[0] if opt else "4k", "--prompt", prompt if opt else prompt + TAIL)
        if not (isinstance(ids, list) and len(ids) == 1):
            sys.exit(f"STOP: {key} returned {ids!r}")
        jobs[key] = ids[0]
        STATE.write_text(json.dumps(jobs, indent=1))
    for key in sys.argv[1:] or specs:
        dst = OUT / f"cine-{key}.png"
        if not dst.exists():
            subprocess.run([HF, "generate", "wait", jobs[key], "--timeout", "6m", "--interval", "6s", "--quiet"], capture_output=True)
            d = hf("generate", "get", jobs[key])
            if not d.get("result_url"):
                print(key, "NO RESULT:", d.get("status"))
                continue
            urllib.request.urlretrieve(d["result_url"], dst)
        print(key, Image.open(dst).size, flush=True)


if __name__ == "__main__":
    main()
