"""
Test sora-2-pro at 4s with action-dense prompts.
Strategy: generate 4s, then trim to best 1-2s peak in post.

Two contrasting scenes for evaluation.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

HERE = Path(__file__).parent
OUT = HERE.parent / "generated" / "20_sora_pro_test"
OUT.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

LIFELIKE = (
    "Cinematic high-budget AAA CGI animation, lifelike physics, photorealistic "
    "textures and lighting, dynamic camera motion, dense atmospheric particles. "
    "Reference quality: Weta Digital / Blizzard cinematic / League of Legends "
    "cinematic / Final Fantasy CGI cutscene. Lifelike living scene, every frame "
    "alive with motion."
)

TESTS = [
    {
        "slug": "drenwal-radiance-burst",
        "prompt": (
            "Dynamic close-up shot. A bearded warrior-priest in red-and-ivory "
            "robes with silver embroidery raises his hand and a MASSIVE golden "
            "burst of holy radiant light EXPLODES outward from his palm in a "
            "30-foot wave. Cinematic shockwave physics, debris and dust kicked "
            "outward by the radiant pressure, motion blur on the expanding "
            "light front. The priest's cloak whips back from the blast. Camera "
            "shakes lightly. Underground stone fortress corridor in the Nine "
            "Hells. " + LIFELIKE
        ),
    },
    {
        "slug": "kyton-emerge-from-dust",
        "prompt": (
            "Wide cinematic shot. Three IRON-WRAPPED HUMANOIDS — kytons from "
            "Dungeons & Dragons, NOT horned demons — wrapped head-to-toe in "
            "heavy rusted barbed iron chains piercing into their pale grey "
            "scarred flesh, faces hidden by simple metal skullcap masks with "
            "eye-holes — STRIDE forward through settling dust in a dark "
            "infernal stone tunnel. Their multiple barbed chains DRAG and "
            "RATTLE across the stone floor and coil upward in the air around "
            "them like animated serpents. Heavy menacing forward motion, "
            "dust swirling around their feet. " + LIFELIKE
        ),
    },
]


for t in TESTS:
    out_path = OUT / f"sora-pro-{t['slug']}.mp4"
    if out_path.exists():
        print(f"[SKIP] {out_path.name}")
        continue
    print(f"\n== {t['slug']} (sora-2-pro, 4s, 1280x720) ==")
    try:
        video = client.videos.create_and_poll(
            model="sora-2-pro",
            prompt=t["prompt"],
            seconds="4",
            size="1280x720",
        )
        print(f"  status: {video.status}, id: {video.id}")
        if video.status == "completed":
            content = client.videos.download_content(video.id, variant="video")
            content.write_to_file(str(out_path))
            mb = out_path.stat().st_size / (1024 * 1024)
            print(f"  [OK] {out_path.name} ({mb:.1f} MB)")
        else:
            print(f"  [FAIL] {video.error}")
    except Exception as e:
        print(f"  [FAIL] {str(e)[:300]}")
