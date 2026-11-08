"""Contact sheet per dragon: one row per attack (A-label, stem), 4 candidates each, labelled 0-3."""
import glob, os, sys
from PIL import Image, ImageDraw, ImageFont

here = os.path.dirname(os.path.abspath(__file__))
rows = [l.rstrip("\n").split("\t") for l in open(os.path.join(here, "attack-prompts.txt"), encoding="utf-8")]
W, H = 360, 240
font = ImageFont.truetype("arial.ttf", 22)
for sid in sorted({r[1].split("-")[0] for r in rows}):
    mine = [r for r in rows if r[1].startswith(sid + "-")]
    sheet = Image.new("RGB", (W * 4 + 200, H * len(mine)), "black")
    d = ImageDraw.Draw(sheet)
    for y, (label, stem, _) in enumerate(mine):
        d.text((8, y * H + 8), f"{label}\n{stem[len(sid)+1:]}", fill="white", font=font)
        for i in range(4):
            im = Image.open(os.path.join(here, "mj", f"{label}-{stem}-{i}.jpg")).convert("RGB").resize((W, H))
            sheet.paste(im, (200 + i * W, y * H))
            d.text((200 + i * W + 6, y * H + 4), str(i), fill="yellow", font=font)
    out = os.path.join(here, "mj", f"sheet-{sid}.jpg")
    sheet.save(out, quality=80)
    print(out, sheet.size)
