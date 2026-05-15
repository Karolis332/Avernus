"""
Render 2 short Sora 2 test clips (different shot types) to validate quality
and motion physics before committing to a full 7-clip batch.

Each clip: 4s @ 1280x720, image-to-video.
Cost estimate: ~$0.40-1.50/clip * 2 = ~$0.80-3.00.
"""
import os
import io
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
from PIL import Image

HERE = Path(__file__).parent
V2_STILLS = HERE.parent / "generated" / "05_scene_shots_v2"
V3_STILLS = HERE.parent / "generated" / "09_stills_v3"
RESIZED = HERE.parent / "generated" / "17_sora_refs_1280x720"
OUT_DIR = HERE.parent / "generated" / "17_sora_test_scenes"
RESIZED.mkdir(parents=True, exist_ok=True)
OUT_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

SORA_SIZE = "1280x720"
SORA_SECONDS = "4"

# 2 contrasting test shots: 1 establishing/atmospheric, 1 action
TESTS = [
    {
        "slug": "01-ext-tunnel-mouth",
        "src": V2_STILLS / "shot-01-ext-tunnel-mouth.png",
        "prompt": (
            "Slow cinematic camera parallax push-in toward the tunnel mouth in an "
            "infernal Avernus wasteland. The Lady Vengeance hell-warship sits in "
            "the foreground, her engraved arcane cannons subtly settling, hellforge "
            "engine glow pulsing warmly. Ash particles drift across the frame. The "
            "blood river trickles slowly out of the tunnel mouth. Distant lightning "
            "flickers on the horizon. Dark fantasy oil-painting cinematic. "
            "Continuous atmospheric motion."
        ),
    },
    {
        "slug": "10-radiance-of-dawn-vs-kytons",
        "src": V3_STILLS / "shot-10-drenwal-radiance-of-dawn-vs-kytons.png",
        "prompt": (
            "WIDE TWO-SHOT in a dark fortress corridor. The bearded Hellrider "
            "cleric on the LEFT raises his hands and a massive 30-foot radius "
            "BURST of golden divine sunlight erupts outward from his position, "
            "radiant waves washing through the corridor. Three iron-wrapped "
            "kytons (chain devils, NOT horned demons) on the RIGHT stagger "
            "and smoke as the holy light hits them, their pale flesh blistering, "
            "barbed chains clattering loose. Cause-and-effect impact in one "
            "frame. Painterly oil-painting D&D cinematic. Camera mostly static, "
            "the radiant burst is the focal motion."
        ),
    },
]


def resize_for_sora(src: Path, dst: Path, target=(1280, 720)):
    if dst.exists():
        return dst
    img = Image.open(src).convert("RGB")
    img = img.resize(target, Image.LANCZOS)
    img.save(dst, "PNG")
    print(f"  resized -> {dst.name}")
    return dst


def gen(test):
    slug = test["slug"]
    out = OUT_DIR / f"sora-{slug}.mp4"
    if out.exists():
        print(f"  [SKIP] {out.name} exists")
        return True

    print(f"  Source: {test['src'].name}")
    resized = RESIZED / f"{slug}.png"
    resize_for_sora(test["src"], resized)

    print(f"  Submitting Sora 2 (size={SORA_SIZE}, seconds={SORA_SECONDS})...")
    try:
        with open(resized, "rb") as f:
            video = client.videos.create_and_poll(
                model="sora-2",
                prompt=test["prompt"],
                seconds=SORA_SECONDS,
                size=SORA_SIZE,
                input_reference=f,
            )
        print(f"  status: {video.status}, id: {video.id}")
        if video.status != "completed":
            print(f"  error: {video.error}")
            return False

        content = client.videos.download_content(video.id, variant="video")
        content.write_to_file(str(out))
        mb = out.stat().st_size / (1024 * 1024)
        print(f"  [OK] {out.name} ({mb:.1f} MB)")
        return True
    except Exception as e:
        print(f"  [FAIL] {str(e)[:400]}")
        return False


print("Rendering 2 Sora 2 test scenes...\n")
for t in TESTS:
    print(f"== {t['slug']} ==")
    gen(t)
    print()
print("DONE.")
