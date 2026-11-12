"""Scratch driver for Kling 4.0 image-to-video clips. State: specs.json {key: {start, prompt}}, clips.json {key: job id}.
usage: python clips.py start | poll"""
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

HF = r"C:\Users\kpaul\AppData\Roaming\npm\node_modules\@higgsfield\cli\vendor\hf.exe"
OUT = Path(__file__).parent
SPECS, STATE = OUT / "specs.json", OUT / "clips.json"


def hf(*args: str) -> tuple[int, str, str]:
    r = subprocess.run([HF, *args, "--json"], capture_output=True, text=True, encoding="utf-8")
    return r.returncode, r.stdout, r.stderr


def start() -> None:
    specs = json.loads(SPECS.read_text(encoding="utf-8"))
    state = json.loads(STATE.read_text()) if STATE.exists() else {}
    for key, spec in specs.items():
        if key in state:  # never pay twice
            continue
        src = spec["start"]
        if Path(src).exists():  # local file: upload first, never pass a path to create
            code, out, err = hf("upload", "create", src)
            if code:
                sys.exit(f"upload failed for {key}: {err[:200]}")
            up = json.loads(out)
            src = up["id"] if isinstance(up, dict) else up[0]["id"] if isinstance(up[0], dict) else up[0]
        code, out, err = hf("generate", "create", "kling4_0", "--mode", "image-to-video", "--start-image", src,
                            "--duration", "5", "--resolution", spec.get("resolution", "720p"), "--aspect_ratio", "auto",
                            "--prompt", spec["prompt"])
        if code and "rate_limit_reached" in err:
            print(key, "WAITING: six clips already rendering"); break
        ids = json.loads(out) if not code else None
        if not (isinstance(ids, list) and len(ids) == 1):
            sys.exit(f"STOP at {key}: {err[:300] or out[:300]}")
        state[key] = ids[0]
        STATE.write_text(json.dumps(state, indent=1))
        print(key, "started", ids[0], flush=True)


def poll() -> None:
    state = json.loads(STATE.read_text()) if STATE.exists() else {}
    for key, jid in state.items():
        dst = OUT / f"{key}.mp4"
        if dst.exists():
            print(key, "have"); continue
        code, out, err = hf("generate", "get", jid)
        d = json.loads(out) if not code else {"status": "ERR " + err[:80]}
        if d.get("result_url"):
            urllib.request.urlretrieve(d["result_url"], dst); print(key, "saved")
        else:
            print(key, d["status"])


if __name__ == "__main__":
    {"start": start, "poll": poll}[sys.argv[1]]()
