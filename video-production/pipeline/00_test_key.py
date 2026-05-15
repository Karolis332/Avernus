"""
Smoke test the OpenAI key.
- Confirms key works
- Generates 1 tiny image (cheapest possible) to prove image access
- Reports cost estimate before any real gens
"""
import os
import sys
import base64
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

HERE = Path(__file__).parent
load_dotenv(HERE / ".env")

api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    print("ERROR: OPENAI_API_KEY not found in .env")
    sys.exit(1)

print(f"[ok] key loaded (length {len(api_key)}, starts {api_key[:12]}...)")

client = OpenAI(api_key=api_key)

# 1. Check models endpoint — proves key valid
print("\n[1/2] Listing available models (proves key is valid)...")
try:
    models = client.models.list()
    image_models = [m.id for m in models.data if "image" in m.id.lower() or "dall" in m.id.lower()]
    video_models = [m.id for m in models.data if "sora" in m.id.lower() or "video" in m.id.lower()]
    print(f"  Image-capable models visible: {image_models}")
    print(f"  Video-capable models visible: {video_models or '(none — Sora 2 may require separate tier access)'}")
except Exception as e:
    print(f"  ERROR: {e}")
    sys.exit(1)

# 2. Generate cheapest possible image — prove image access + save proof
print("\n[2/2] Generating 1 low-quality test image (1024x1024, gpt-image-1, low quality)...")
print("  This should cost ~$0.01 and take ~10-20 seconds.\n")

out_dir = HERE.parent / "generated" / "00_smoke_test"
out_dir.mkdir(parents=True, exist_ok=True)

try:
    result = client.images.generate(
        model="gpt-image-1",
        prompt="A tiny silver moonkite sigil, ink on parchment, minimal dark fantasy aesthetic",
        size="1024x1024",
        quality="low",
        n=1,
    )
    b64 = result.data[0].b64_json
    img_bytes = base64.b64decode(b64)
    out_path = out_dir / "smoke_test_sigil.png"
    out_path.write_bytes(img_bytes)
    size_kb = len(img_bytes) // 1024
    print(f"[ok] Generated image saved: {out_path}")
    print(f"  File size: {size_kb} KB")
    print(f"\nSMOKE TEST PASSED. Key works, image gen works.")
    print(f"Estimated cost so far: ~$0.01")
except Exception as e:
    print(f"[fail] Image generation error: {e}")
    print(f"\nPossible causes:")
    print(f"  - Organization has no image-gen access (check platform.openai.com/settings)")
    print(f"  - Billing not set up")
    print(f"  - Key scope too restricted")
    sys.exit(1)
