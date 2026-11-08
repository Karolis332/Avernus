"""v2 picks for Vermilius and Flash -> art/generated/<name>-<move>-v2.webp, plus the v1-vs-v2 sheet for the DM.
v1 stays the live art until the DM chooses (swap with use_v2.py)."""
import os
from PIL import Image, ImageDraw, ImageFont

PICKS = {  # stem: (job label, candidate)
    "vermilius-portrait": ("B02", 2), "flash-portrait": ("B03", 1),
    "vermilius-bite": ("B05", 3), "vermilius-claw": ("B06", 1), "vermilius-tail": ("B07", 2), "vermilius-poison-breath": ("B08", 1),
    "vermilius-frightful-presence": ("B09", 3), "vermilius-wing-attack": ("B10", 1), "vermilius-honeyed-voice": ("B11", 1),
    "flash-bite": ("B12", 2), "flash-claw": ("B13", 2), "flash-tail": ("B14", 2), "flash-fire-breath": ("B15", 0),
    "flash-frightful-presence": ("B16", 1), "flash-wing-attack": ("B17", 1), "flash-prove-it": ("B18", 2), "flash-overheat": ("B19", 2),
}
here = os.path.dirname(os.path.abspath(__file__))
art = os.path.join(here, "..", "..", "art", "generated")
for stem, (label, i) in PICKS.items():
    size = (896, 1344) if stem.endswith("portrait") else (1024, 683)
    Image.open(os.path.join(here, "mj", f"{label}-{stem}-{i}.jpg")).convert("RGB").resize(size, Image.LANCZOS) \
        .save(os.path.join(art, f"{stem}-v2.webp"), quality=86 if stem.endswith("portrait") else 85)

# sheet: per dragon, a v1 row over a v2 row, portrait first
W, H, PW, LAB = 300, 200, 134, 28
font = ImageFont.truetype("arial.ttf", 17)
big = ImageFont.truetype("arial.ttf", 26)
groups = [(n, [s for s in PICKS if s.startswith(n + "-")]) for n in ("vermilius", "flash")]
cols = max(len(g) for _, g in groups)
sheet = Image.new("RGB", (160 + PW + W * (cols - 1), 4 * (H + LAB)), "black")
d = ImageDraw.Draw(sheet)
y = 0
for name, stems in groups:
    for ver in ("v1", "v2"):
        d.text((8, y + LAB + 70), f"{name.title()}\n{ver}", fill="yellow" if ver == "v2" else "white", font=big)
        x = 160
        for s in stems:
            f = os.path.join(art, f"{s}{'-v2' if ver == 'v2' else ''}.webp")
            w = PW if s.endswith("portrait") else W
            sheet.paste(Image.open(f).convert("RGB").resize((w, H)), (x, y + LAB))
            d.text((x + 4, y + 4), s[len(name) + 1:], fill="white", font=font)
            x += w
        y += H + LAB
sheet.save(os.path.join(here, "v1-vs-v2-sheet.webp"), quality=82)
print(len(PICKS), "v2 webps + v1-vs-v2-sheet.webp")
