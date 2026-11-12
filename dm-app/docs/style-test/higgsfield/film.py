"""Scratch driver for the fight film: one Kling 4.0 clip per six-second round (19.5 credits at 1080p).
Specs: film-specs.json {key: {mode, refs: [files or ids], start, end, duration, prompt}}. State: film.json {key: job id}.
usage: python film.py start [key ...] | poll"""
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

HF = r"C:\Users\kpaul\AppData\Roaming\npm\node_modules\@higgsfield\cli\vendor\hf.exe"
OUT = Path(__file__).parent
SPECS, STATE, UPLOADS = OUT / "film-specs.json", OUT / "film.json", OUT / "film-uploads.json"


def hf(*args: str) -> tuple[int, str, str]:
    r = subprocess.run([HF, *args, "--json"], capture_output=True, text=True, encoding="utf-8")
    return r.returncode, r.stdout, r.stderr


def media_id(src: str, uploads: dict[str, str]) -> str:
    """Upload a local file once and reuse its id; never pass a path to create."""
    if not (OUT / src).exists():
        return src  # already an upload or job id
    if src not in uploads:
        code, out, err = hf("upload", "create", str(OUT / src))
        if code:
            sys.exit(f"upload failed for {src}: {err[:200]}")
        up = json.loads(out)
        uploads[src] = up["id"] if isinstance(up, dict) else up[0]["id"] if isinstance(up[0], dict) else up[0]
        UPLOADS.write_text(json.dumps(uploads, indent=1))
    return uploads[src]


def start(only: list[str]) -> None:
    specs = json.loads(SPECS.read_text(encoding="utf-8"))
    state = json.loads(STATE.read_text()) if STATE.exists() else {}
    uploads = json.loads(UPLOADS.read_text()) if UPLOADS.exists() else {}
    for key, spec in specs.items():
        if key in state or (only and key not in only):  # never pay twice
            continue
        args = ["generate", "create", "kling4_0", "--mode", spec["mode"], "--duration", str(spec.get("duration", 6)),
                "--resolution", "1080p", "--aspect_ratio", "16:9", "--prompt", spec["prompt"]]
        if spec.get("start"):
            args += ["--start-image", media_id(spec["start"], uploads)]
        if spec.get("end"):
            args += ["--end-image", media_id(spec["end"], uploads)]
        for ref in spec.get("refs", []):
            args += ["--image-references", media_id(ref, uploads)]
        code, out, err = hf(*args)
        if code and "rate_limit_reached" in err:
            print(key, "WAITING: six clips already rendering")
            break
        ids = json.loads(out) if not code else None
        if not (isinstance(ids, list) and len(ids) == 1):
            sys.exit(f"STOP at {key}: {err[:400] or out[:400]}")
        state[key] = ids[0]
        STATE.write_text(json.dumps(state, indent=1))
        print(key, "started", ids[0], flush=True)


def poll() -> None:
    state = json.loads(STATE.read_text()) if STATE.exists() else {}
    for key, jid in state.items():
        dst = OUT / f"film-{key}.mp4"
        if dst.exists():
            continue
        code, out, err = hf("generate", "get", jid)
        d = json.loads(out) if not code else {"status": "ERR " + err[:80]}
        if d.get("result_url"):
            urllib.request.urlretrieve(d["result_url"], dst)
            print(key, "saved")
        else:
            print(key, d["status"])


if __name__ == "__main__":
    start(sys.argv[2:]) if sys.argv[1] == "start" else poll()
