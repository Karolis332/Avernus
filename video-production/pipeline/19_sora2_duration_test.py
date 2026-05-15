"""
Test what 'seconds' values Sora 2 accepts.
Goal: find the shortest valid duration so we can shoot 1-3s ultra-dense clips.
Also test sora-2-pro for max quality since clips will be short.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

HERE = Path(__file__).parent
OUT = HERE.parent / "generated" / "19_sora_duration_test"
OUT.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# Try short durations on sora-2 first (cheaper)
SHORT_PROMPT = (
    "Cinematic close-up: a bearded warrior-priest in red and ivory ceremonial "
    "robes raises his hand and a brilliant golden burst of holy radiant light "
    "EXPLODES outward from his palm. Massive radiant shockwave, cinematic CGI "
    "quality, lifelike physics, AAA film production, dynamic camera shake."
)

# Test which seconds values work
TESTS = [
    ("sora-2",     "1", "1280x720"),
    ("sora-2",     "2", "1280x720"),
    ("sora-2",     "3", "1280x720"),
    ("sora-2-pro", "2", "1280x720"),  # PRO at 2s for quality reference
]

for model, seconds, size in TESTS:
    label = f"{model}_{seconds}s_{size}"
    out_path = OUT / f"test_{label}.mp4"
    if out_path.exists():
        print(f"[SKIP] {out_path.name}")
        continue
    print(f"\n== Testing {label} ==")
    try:
        video = client.videos.create_and_poll(
            model=model,
            prompt=SHORT_PROMPT,
            seconds=seconds,
            size=size,
        )
        print(f"  status: {video.status}, id: {video.id}")
        if video.status == "completed":
            content = client.videos.download_content(video.id, variant="video")
            content.write_to_file(str(out_path))
            mb = out_path.stat().st_size / (1024 * 1024)
            print(f"  [OK] {out_path.name} ({mb:.1f} MB)")
        else:
            print(f"  [FAIL] {video.error}")
    except Exception as e:
        print(f"  [FAIL] {str(e)[:300]}")
