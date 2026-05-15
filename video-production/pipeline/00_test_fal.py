"""
Smoke-test fal.ai: (a) text-to-image no upload, (b) data-URI image-to-image.
"""
import os
import sys
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
OUT_DIR = HERE.parent / "generated" / "00_smoke_test"
OUT_DIR.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")

print(f"FAL_KEY loaded: {os.environ.get('FAL_KEY', '')[:10]}...")

# --- TEST 1: pure text-to-image (no upload, no ref) ---
print("\n[1] Text-to-image via flux schnell (cheapest, no ref needed)")
try:
    r = fal_client.subscribe(
        "fal-ai/flux/schnell",
        arguments={
            "prompt": "A tiny silver moon sigil on parchment, minimal dark fantasy aesthetic",
            "image_size": "square",
            "num_images": 1,
            "enable_safety_checker": False,
        },
        with_logs=False,
    )
    url = r["images"][0]["url"]
    out = OUT_DIR / "fal_text2img_smoke.png"
    out.write_bytes(requests.get(url, timeout=60).content)
    print(f"  [OK] {out.name} ({out.stat().st_size // 1024} KB) — inference works")
except Exception as e:
    print(f"  [FAIL] {str(e)[:400]}")
    sys.exit(1)

# --- TEST 2: data-URI image-to-image (bypass storage upload) ---
print("\n[2] Kontext edit via data URI (bypass fal storage)")
ref_path = HERE.parent / "refs" / "aurora" / "aurora-portrait-01.png"
b64 = base64.b64encode(ref_path.read_bytes()).decode()
data_uri = f"data:image/png;base64,{b64}"
print(f"  Data URI length: {len(data_uri)} chars (~{len(data_uri) // 1024} KB)")

try:
    r = fal_client.subscribe(
        "fal-ai/flux-pro/kontext/max",
        arguments={
            "prompt": "The same astral elf woman, but standing in a dark fantasy tavern, "
                      "warm lantern light, oil-painting style",
            "image_url": data_uri,
            "safety_tolerance": "6",
            "aspect_ratio": "1:1",
            "num_images": 1,
            "output_format": "png",
        },
        with_logs=False,
    )
    url = r["images"][0]["url"]
    out = OUT_DIR / "fal_kontext_smoke.png"
    out.write_bytes(requests.get(url, timeout=60).content)
    print(f"  [OK] {out.name} ({out.stat().st_size // 1024} KB) — data URI path works")
except Exception as e:
    print(f"  [FAIL] {str(e)[:400]}")
