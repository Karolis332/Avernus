"""
Smoke test Sora 2 via OpenAI API.
Goal: verify (a) text-to-video works, (b) image-to-video works with our shot stills,
(c) understand exact parameters + cost before running 7 hero clips.
"""
import os
import time
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

HERE = Path(__file__).parent
OUT_DIR = HERE.parent / "generated" / "00_smoke_test"
OUT_DIR.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

REF_STILL = HERE.parent / "generated" / "05_scene_shots_v2" / "shot-01-ext-tunnel-mouth.png"

print("=" * 60)
print("SORA 2 SMOKE TEST")
print("=" * 60)

# 1) List video models on key
print("\n[1/3] Listing video models on key...")
try:
    models = client.models.list()
    video_models = [m.id for m in models.data if "sora" in m.id.lower() or "video" in m.id.lower()]
    print(f"  Visible: {video_models}")
except Exception as e:
    print(f"  [FAIL] {str(e)[:200]}")

# 2) Try text-to-video minimal call to learn the API
print("\n[2/3] Text-to-video (minimal) on sora-2...")
try:
    video = client.videos.create_and_poll(
        model="sora-2",
        prompt="A small silver moon rune slowly glowing on aged parchment, dark fantasy.",
        seconds="4",
        size="720x1280",  # try portrait first
    )
    print(f"  [OK] video object:")
    print(f"       id={video.id}")
    print(f"       status={video.status}")
    print(f"       attrs={[a for a in dir(video) if not a.startswith('_')]}")
except Exception as e:
    print(f"  [FAIL] {str(e)[:400]}")
    # Try landscape size
    print("\n  retry with size=1280x720...")
    try:
        video = client.videos.create_and_poll(
            model="sora-2",
            prompt="A small silver moon rune slowly glowing on aged parchment, dark fantasy.",
            seconds="4",
            size="1280x720",
        )
        print(f"  [OK] video.id={video.id}, status={video.status}")
    except Exception as e2:
        print(f"  [FAIL2] {str(e2)[:400]}")

# 3) Image-to-video with shot 1 still
print("\n[3/3] Image-to-video on sora-2 with reference still...")
print(f"  Ref still: {REF_STILL.name}")
try:
    with open(REF_STILL, "rb") as f:
        video = client.videos.create_and_poll(
            model="sora-2",
            prompt=(
                "Slow cinematic camera parallax push-in toward the tunnel mouth. "
                "Hellforge engine glow pulsing. Ash drifting. Painterly dark fantasy."
            ),
            seconds="4",
            size="1280x720",
            input_reference=f,
        )
    print(f"  [OK] video.id={video.id}, status={video.status}")
    # Download
    out = OUT_DIR / f"sora_smoke_{video.id}.mp4"
    content = client.videos.download_content(video.id, variant="video")
    content.write_to_file(str(out))
    mb = out.stat().st_size / (1024 * 1024)
    print(f"  [OK] downloaded: {out.name} ({mb:.1f} MB)")
except Exception as e:
    print(f"  [FAIL] {str(e)[:400]}")
