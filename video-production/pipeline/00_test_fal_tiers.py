"""
Try models at increasing price points to find what the balance supports.
"""
import os
import base64
from pathlib import Path
from dotenv import load_dotenv
import fal_client
import requests

HERE = Path(__file__).parent
OUT_DIR = HERE.parent / "generated" / "00_smoke_test"
OUT_DIR.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")

ref_path = HERE.parent / "refs" / "aurora" / "aurora-portrait-01.png"
b64 = base64.b64encode(ref_path.read_bytes()).decode()
data_uri = f"data:image/png;base64,{b64}"

TRIALS = [
    {
        "label": "Flux Dev (~$0.025, t2i only, no ref)",
        "model": "fal-ai/flux/dev",
        "args": {
            "prompt": "An astral elf ranger-mage with silver-white hair, dark fantasy oil painting",
            "image_size": "square_hd",
            "num_images": 1,
        },
        "out": "tier_flux_dev.png",
    },
    {
        "label": "Flux Pro 1.1 Ultra (~$0.04, t2i only)",
        "model": "fal-ai/flux-pro/v1.1-ultra",
        "args": {
            "prompt": "An astral elf ranger-mage with silver-white hair, dark fantasy oil painting",
            "num_images": 1,
            "aspect_ratio": "1:1",
        },
        "out": "tier_flux_pro_ultra.png",
    },
    {
        "label": "Flux Redux Dev (~$0.025, ref-to-image)",
        "model": "fal-ai/flux/dev/redux",
        "args": {
            "image_url": data_uri,
            "image_size": "square_hd",
            "num_images": 1,
        },
        "out": "tier_flux_redux_dev.png",
    },
    {
        "label": "Flux Kontext [pro] (~$0.04, same as Max tier)",
        "model": "fal-ai/flux-pro/kontext",
        "args": {
            "prompt": "Same astral elf, in a dark fantasy tavern, oil painting style",
            "image_url": data_uri,
            "aspect_ratio": "1:1",
            "safety_tolerance": "6",
        },
        "out": "tier_flux_kontext_pro.png",
    },
]

for t in TRIALS:
    print(f"\n== {t['label']} ==")
    try:
        r = fal_client.subscribe(t["model"], arguments=t["args"], with_logs=False)
        url = r["images"][0]["url"]
        out = OUT_DIR / t["out"]
        out.write_bytes(requests.get(url, timeout=60).content)
        print(f"  [OK] {out.name} ({out.stat().st_size // 1024} KB)")
    except Exception as e:
        print(f"  [FAIL] {str(e)[:250]}")
