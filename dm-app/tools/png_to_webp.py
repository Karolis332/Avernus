"""Convert a PNG to a small webp: png_to_webp.py <in.png> <out.webp> [max_width] [quality]."""
import sys
from pathlib import Path
from PIL import Image

def main() -> None:
    src, dst = Path(sys.argv[1]), Path(sys.argv[2])
    max_w = int(sys.argv[3]) if len(sys.argv) > 3 else 1024
    quality = int(sys.argv[4]) if len(sys.argv) > 4 else 80
    img = Image.open(src).convert("RGB")
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "WEBP", quality=quality)
    print(f"[OK] {dst} ({dst.stat().st_size // 1024} KB)")

if __name__ == "__main__":
    main()
