"""The chosen Midjourney candidate per dragon attack -> art/generated/<stem>.webp (1024x683)."""
import os
from PIL import Image

PICKS = {  # stem: (job label, candidate index)
    "skarrix-bite": ("A01", 2), "skarrix-claw": ("A02", 0), "skarrix-tail": ("A03", 2), "skarrix-acid-breath": ("A39", 2),
    "skarrix-frightful-presence": ("A05", 2), "skarrix-wing-attack": ("A06", 2), "skarrix-old-wound": ("A40", 0),
    "vhennic-bite": ("A08", 2), "vhennic-claw": ("A09", 1), "vhennic-tail": ("A10", 1), "vhennic-lightning-breath": ("A11", 1),
    "vhennic-frightful-presence": ("A12", 2), "vhennic-wing-attack": ("A13", 2), "vhennic-lance-dive": ("A41", 1), "vhennic-clean-exit": ("A42", 0),
    "mirelle-bite": ("A16", 0), "mirelle-claw": ("A17", 3), "mirelle-tail": ("A18", 3), "mirelle-poison-breath": ("A19", 3),
    "mirelle-frightful-presence": ("A20", 2), "mirelle-wing-attack": ("A21", 3), "mirelle-honeyed-voice": ("A22", 2),
    "praxamor-bite": ("A23", 2), "praxamor-claw": ("A24", 0), "praxamor-tail": ("A25", 2), "praxamor-fire-breath": ("A26", 0),
    "praxamor-frightful-presence": ("A27", 2), "praxamor-wing-attack": ("A28", 3), "praxamor-prove-it": ("A29", 2), "praxamor-overheat": ("A30", 0),
    "obatala-bite": ("A31", 2), "obatala-claw": ("A32", 1), "obatala-tail": ("A33", 1), "obatala-cold-breath": ("A43", 2),
    "obatala-frightful-presence": ("A35", 0), "obatala-wing-attack": ("A36", 1), "obatala-rimeground": ("A37", 0), "obatala-riders-wing": ("A38", 2),
}
NAMES = {"skarrix": "slarkas", "vhennic": "vistalancer", "mirelle": "vermilius", "praxamor": "flash"}  # file names use the campaign names (2026-11-08)
here = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(here, "..", "..", "art", "generated")
assert len(PICKS) == 38
for stem, (label, i) in PICKS.items():
    src = os.path.join(here, "mj", f"{label}-{stem}-{i}.jpg")
    Image.open(src).convert("RGB").resize((1024, 683), Image.LANCZOS).save(os.path.join(out_dir, NAMES.get(stem.split("-")[0], stem.split("-")[0]) + stem[stem.index("-"):] + ".webp"), quality=85)
print(len(PICKS), "webps written")
