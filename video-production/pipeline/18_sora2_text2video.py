"""
Sora 2 text-to-video tests (NO reference image).
Goal: lifelike CGI-quality motion. Drop the painterly oil-painting style.

Two contrasting tests:
1. Atmospheric establishing — Lady Vengeance approaching tunnel
2. Combat hero — Drenwal Radiance of the Dawn vs kytons

Cost: ~$0.40-1.50/clip * 2 = ~$0.80-3.00.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

HERE = Path(__file__).parent
OUT_DIR = HERE.parent / "generated" / "18_sora_text2video"
OUT_DIR.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

SIZE = "1280x720"
SECONDS = "4"

# Lifelike-animation style suffix — replace painterly oil aesthetic with
# cinematic CGI realism
STYLE = (
    "Cinematic high-budget 3D animated film. AAA CGI quality, lifelike physics, "
    "natural lighting and shadows, atmospheric volumetric haze, photorealistic "
    "textures, dynamic camera motion, continuous fluid animation in every frame. "
    "Reference quality: between Pixar / Weta Digital / Blizzard cinematic CGI. "
    "NOT painterly. NOT illustrated. NOT cartoon. Lifelike living world."
)

TESTS = [
    {
        "slug": "01-lady-vengeance-approach",
        "prompt": (
            "EXTERIOR WIDE ESTABLISHING SHOT, slow camera dolly forward. A massive "
            "armored hell-warship called the Lady Vengeance — matte-black plating "
            "etched with brass runic scrollwork, multiple engraved arcane cannons "
            "mounted along her flanks, hellforge red-orange engine glow venting steam "
            "from side ports — sits parked at the mouth of a vast drainage tunnel cut "
            "into black obsidian Avernus stone. A river of dark blood trickles slowly "
            "from the tunnel mouth past her hull. Sulphurous amber-red sky above, "
            "obsidian wasteland behind, distant silhouettes of infernal war machines "
            "on the horizon. Ash particles drift across the frame on a faint wind. "
            "Distant lightning flickers silently. Setting: Avernus, the first layer "
            "of the Nine Hells in Dungeons & Dragons. " + STYLE
        ),
    },
    {
        "slug": "10-radiance-vs-kytons",
        "prompt": (
            "WIDE TWO-SHOT in a dark stone fortress corridor underground in the "
            "infernal Nine Hells. On the LEFT side of the frame stands a bearded "
            "human warrior-priest — early thirties, brunette hair, full beard, "
            "ornate red-and-ivory ceremonial vestments with silver Celtic knotwork "
            "embroidery, silver-embossed plate cuirass, holding a large round "
            "red-lacquered heraldic shield with a central golden eye-and-sun "
            "sigil. He raises both hands and a massive 30-foot radius BURST of "
            "pure golden divine sunlight ERUPTS outward from his position, "
            "radiant waves washing through the corridor in every direction. On "
            "the RIGHT side: three kytons (D&D chain devils — tall iron-wrapped "
            "humanoid figures, NOT horned demons, NOT red-skinned) wrapped head-"
            "to-toe in heavy rusted barbed iron chains piercing into their own "
            "pale grey scarred flesh, faces hidden by simple metal skullcap masks "
            "with eye-holes. The kytons stagger backward, their pale flesh "
            "blistering and smoking from the holy light, animated barbed chains "
            "around them clattering loose. Cause-and-effect impact in one frame. "
            + STYLE
        ),
    },
]


def gen(t):
    slug = t["slug"]
    out = OUT_DIR / f"sora-t2v-{slug}.mp4"
    if out.exists():
        print(f"  [SKIP] {out.name} exists")
        return True
    print(f"  Submitting Sora 2 t2v (size={SIZE}, seconds={SECONDS})...")
    try:
        video = client.videos.create_and_poll(
            model="sora-2",
            prompt=t["prompt"],
            seconds=SECONDS,
            size=SIZE,
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


print("Rendering 2 Sora 2 text-to-video tests (lifelike-CGI style, no ref images)...\n")
for t in TESTS:
    print(f"== {t['slug']} ==")
    gen(t)
    print()
print("DONE.")
