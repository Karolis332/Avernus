"""
Sora 2 base (cheap) + D&D-canonical aesthetic + lore-accurate behaviors.
Style anchor: Critical Role Vox Machina animated cinematic.

3 hero shots first, evaluate, then scale to full pipeline.

Cost: sora-2 base 4s * 3 = ~$1.20-3.60 estimate.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

HERE = Path(__file__).parent
OUT = HERE.parent / "generated" / "21_sora_dnd_hero_test"
OUT.mkdir(parents=True, exist_ok=True)
load_dotenv(HERE / ".env")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# D&D-canonical animated cinematic style
DND_STYLE = (
    "Stylized cinematic Dungeons & Dragons animated film, in the visual tradition "
    "of Critical Role's Vox Machina animated series and Dragon Age cinematic "
    "trailers. Painterly stylized 3D rendering with bold linework, rich saturated "
    "colors with strong shadow contrast, dynamic camera, lore-accurate D&D "
    "iconography. NOT photorealistic, NOT live-action — stylized D&D animation. "
    "Every frame alive with motion."
)

# Lore-accurate character / monster references (concise)
DRENWAL_LORE = (
    "A human warrior-priest cleric of the Light domain — early thirties, brunette "
    "shoulder-length hair, full brown beard, weathered resolute face. Wears the "
    "red-and-ivory ceremonial vestments of a Hellrider of Elturel with intricate "
    "silver Celtic-knotwork embroidery and a silver-embossed plate cuirass. "
    "Crimson-lined heavy traveling cloak. Holds a large round red-lacquered "
    "heraldic shield with a central golden sun-and-eye sigil — the Shield of the "
    "Hidden Lord. Leather spellcasting gauntlet on his casting hand."
)

AURORA_LORE = (
    "An astral elf woman with long flowing silver-white hair, luminous pale skin, "
    "sharp jade-green eyes, a small teal gemstone set in a silver fey circlet on "
    "her forehead, delicate silver fey-tracery patterns on her cheeks like "
    "frostwork. She wears a high-collar dark olive-green traveling robe with "
    "fine silver Celtic knotwork embroidery and a teal pendant. She wields the "
    "Moonbow of Celestial Warding — an ornate silver moonwood shortbow with a "
    "starlight bowstring."
)

ASIMOV_LORE = (
    "A lean hooded soulknife rogue in a long charcoal-black travel coat with "
    "concealed armor plates, leather bandoliers and bracers etched with violet "
    "psionic runes. Hood pulled low, face mostly hidden in shadow. AT HIS BELT "
    "AT HIP-LEVEL hangs the Soul Capacitor — an ornate bronze oil lamp laced "
    "with crystalline violet veins pulsing like circuitry, violet smoke curling "
    "from its spout. The lamp stays on his belt at all times — never in hand. "
    "In his hands he wields TRANSLUCENT SHIMMERING VIOLET PSIONIC BLADES — "
    "Soulknife psychic energy daggers made of pure psionic mist taking dagger "
    "form, you can see faintly through them. NOT solid crystal, NOT metal."
)

KYTON_LORE = (
    "Multiple KYTON chain devils — D&D Monster Manual canonical: tall iron-"
    "wrapped humanoid figures, NOT horned demons, NOT red-skinned. Each kyton "
    "is wrapped head-to-toe in heavy rusted barbed iron chains that pierce "
    "directly into their own pale grey scarred flesh as grotesque body-"
    "modification piercings. Faces COMPLETELY HIDDEN by simple metal skullcap "
    "masks with only eye-holes cut. NO horns, NO bat-wings, NO tails, NO "
    "hooves. Multiple animated barbed chains rise and coil around each kyton "
    "like hunting serpents. Industrial body-horror cenobite aesthetic, NOT "
    "fire-demon aesthetic."
)

TUNNEL_ENV = (
    "Setting: dark drainage tunnel in the Palace of Gore in Avernus (the first "
    "layer of the Nine Hells in D&D) — blood-lacquered black stone walls, "
    "bone-ribbed vaulted ceiling, hellforge-iron braziers casting flickering "
    "orange-red light, knee-deep pool of crusted blood on the floor."
)

TESTS = [
    {
        "slug": "01-drenwal-radiance-of-dawn",
        "prompt": (
            "MEDIUM ACTION SHOT, dynamic camera angle. " + DRENWAL_LORE + " "
            "He plants his shield forward and channels his Light domain "
            "Channel Divinity — RADIANCE OF THE DAWN — by raising his hands "
            "and unleashing a 30-foot radius BURST of pure golden divine "
            "Lathandrian sunlight outward from his position. The radiant "
            "wave washes through the corridor in every direction. His "
            "cloak whips back from the divine pressure. " + TUNNEL_ENV + " "
            + DND_STYLE
        ),
    },
    {
        "slug": "02-aurora-true-strike-arrow",
        "prompt": (
            "DYNAMIC MEDIUM SHOT in profile. " + AURORA_LORE + " She draws "
            "the Moonbow smoothly to her cheek — and as she draws, she "
            "casts True Strike, channeling radiant magic through the bow. "
            "A radiant silver-gold arrow of pure starlight MATERIALIZES on "
            "the bowstring, wreathed in a blooming golden radiant corona. "
            "She RELEASES — the arrow streaks across the frame in a comet-"
            "trail of starlight. " + TUNNEL_ENV + " " + DND_STYLE
        ),
    },
    {
        "slug": "03-asimov-soulknife-sneak-attack",
        "prompt": (
            "DYNAMIC MEDIUM SHOT from behind a kyton. " + ASIMOV_LORE + " "
            "He emerges silently from a pool of deep shadow behind an "
            "unaware kyton — " + KYTON_LORE + " (one kyton in this shot, "
            "back to camera). The rogue's two translucent violet psionic "
            "Soulknife blades are held low. He DRIVES both psionic blades "
            "forward and upward into the kyton's back — a brilliant burst "
            "of violet psionic light EXPLODES outward through the kyton's "
            "iron-wrapped chest from within. The kyton convulses, chains "
            "going slack, body folding forward. " + TUNNEL_ENV + " "
            + DND_STYLE
        ),
    },
]

print(f"Rendering {len(TESTS)} D&D-canonical hero shots via sora-2 base (4s @ 1280x720)...\n")
for t in TESTS:
    out_path = OUT / f"sora-{t['slug']}.mp4"
    if out_path.exists():
        print(f"[SKIP] {out_path.name}")
        continue
    print(f"== {t['slug']} ==")
    try:
        video = client.videos.create_and_poll(
            model="sora-2",
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
    print()
print("DONE.")
