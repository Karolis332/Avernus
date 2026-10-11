"""
Generate one piece of event/scene art for the DM app via OpenAI gpt-image-1.

Reads OPENAI_API_KEY from the video-production/pipeline .env file (python-dotenv) —
never prints or writes the key. Generates exactly one 1536x1024 image at quality
"high" (~$0.25), retrying once on API error, then converts it with Pillow to a
webp (max 1600px wide, quality 85) at the given output path.

Usage:
    python tools/gen_event_art.py <slug> "<prompt>" art/generated/event-<slug>.webp
"""
import argparse
import base64
import os
import sys
import time
from io import BytesIO
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI
from PIL import Image

PIPELINE_ENV = Path(r"C:\Users\QuLeR\DnD\video-production\pipeline\.env")
MAX_WIDTH = 1600
WEBP_QUALITY = 85


def generate_png_bytes(prompt: str, ref_paths: list[Path] | None = None) -> bytes:
    """Generate via text prompt, or (with ref_paths) via images.edit using those
    images as style/content reference — no mask, so it's a full regeneration
    guided by the reference(s), not a crop/inpaint."""
    load_dotenv(PIPELINE_ENV)
    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    def call() -> bytes:
        if ref_paths:
            files = [open(p, "rb") for p in ref_paths]
            try:
                result = client.images.edit(
                    image=files,
                    prompt=prompt,
                    model="gpt-image-1",
                    size="1536x1024",
                    quality="high",
                    n=1,
                )
            finally:
                for f in files:
                    f.close()
        else:
            result = client.images.generate(
                model="gpt-image-1",
                prompt=prompt,
                size="1536x1024",
                quality="high",
                n=1,
            )
        return base64.b64decode(result.data[0].b64_json)

    last_err: Exception | None = None
    for attempt in range(2):  # one try + one retry on error, never more
        try:
            return call()
        except Exception as e:  # noqa: BLE001 - surfaced to the caller below
            last_err = e
            if attempt == 0:
                print(f"  [RETRY] generation failed, retrying once: {str(e)[:200]}", flush=True)
                time.sleep(2)
    raise RuntimeError(f"image generation failed after retry: {last_err}")


def resized_dimensions(width: int, height: int, max_width: int) -> tuple[int, int]:
    if width <= max_width:
        return width, height
    return max_width, round(height * max_width / width)


def convert_to_webp(png_bytes: bytes, out_path: Path, max_width: int = MAX_WIDTH, quality: int = WEBP_QUALITY) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img = Image.open(BytesIO(png_bytes)).convert("RGB")
    new_size = resized_dimensions(img.width, img.height, max_width)
    if new_size != img.size:
        img = img.resize(new_size, Image.LANCZOS)
    img.save(out_path, "WEBP", quality=quality)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("slug", help="Event slug, e.g. soul-coin-cart")
    parser.add_argument("prompt", help="Full image prompt")
    parser.add_argument("out", help="Output .webp path")
    parser.add_argument("--max-width", type=int, default=MAX_WIDTH, help=f"Max webp width in px (default {MAX_WIDTH})")
    parser.add_argument("--quality", type=int, default=WEBP_QUALITY, help=f"Webp quality (default {WEBP_QUALITY})")
    parser.add_argument("--ref", nargs="+", type=Path, default=None, help="Reference image(s) for images.edit instead of a plain text-to-image generate")
    args = parser.parse_args()

    out_path = Path(args.out)
    print(f"Generating art for '{args.slug}' -> {out_path}", flush=True)
    png_bytes = generate_png_bytes(args.prompt, args.ref)
    convert_to_webp(png_bytes, out_path, args.max_width, args.quality)
    kb = out_path.stat().st_size // 1024
    print(f"[OK] {out_path} ({kb} KB)", flush=True)


def _selftest() -> None:
    assert resized_dimensions(1536, 1024, 1600) == (1536, 1024)  # already under max: untouched
    assert resized_dimensions(3200, 2048, 1600) == (1600, 1024)  # scaled down, aspect kept
    print("selftest ok", flush=True)


if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == "--selftest":
        _selftest()
    else:
        main()
