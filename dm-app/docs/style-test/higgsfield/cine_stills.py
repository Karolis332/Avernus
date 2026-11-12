"""Scratch: cinematic 4k film stills (Cinematic Studio 2.5) for the approved look. State: cine-stills.json {key: job id}."""
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

HF = r"C:\Users\kpaul\AppData\Roaming\npm\node_modules\@higgsfield\cli\vendor\hf.exe"
OUT = Path(__file__).parent
CINE_DRAGON = str(OUT / "cine-dragon-ref.jpg")           # the approved cinematic dragon, downscaled (the 5.5K job id failed as a reference)
FACE = "efd9b777-cbda-4e6a-b2a9-0a8264ee9351"          # painted face the DM called perfect
extra = json.loads((OUT / "stills-extra.json").read_text())

CINE = "Cinematic film still from a high-budget dark fantasy epic, shot on an anamorphic lens. "
HELL = ("The setting is Avernus, the first layer of the Nine Hells: a burning red-orange sky (never grey or overcast), "
        "columns of black smoke, drifting embers, jagged black volcanic rock, distant rivers of lava, hellish orange rim light. ")
DRAGON = ("The dragon is the same colossal ancient white dragon as in the reference images: the same face, the same two dark "
          "horns wrapped in gold bands, the short horn on her snout, glowing pale blue eyes, grey-white hide. Her white scales "
          "are melting in the heat and sloughing off her face, neck and flanks like candle wax, raw grey flesh in patches, "
          "meltwater steaming. She is vast as a cathedral, with four legs and two wings. ")
ALONE = " No people, no soldiers and no armies anywhere in the frame; rock spires and boulders give the scale."
DETAIL = (" Photorealistic and extremely detailed: every scale, rivet, horn ridge, dripping strand and grain of ash sharply "
          "rendered, realistic textures, volumetric smoke, dramatic contrast, gritty and grim, subtle film grain.")
O = [CINE_DRAGON, FACE]
SPECS = {
    "rimeground": (O, CINE + HELL + DRAGON + "Low-angle wide shot: she has just landed and stands with all four feet planted, wings half folded, head low, glaring at the lens. A wide ring of white frost is spreading outward from under her claws across the scorched black ground, ice crackling over glowing lava fissures, and at the edge of the ring the frost is already melting into deep steaming black mud." + ALONE),
    "bite": (O, CINE + HELL + DRAGON + "Low-angle shot from the ground looking up: her enormous head lunges down toward the lens with jaws stretched wide, rows of long teeth, frost mist pouring from her throat, strings of meltwater flying. Her forefeet are planted on either side of the frame and her wings spread behind her against the burning sky." + ALONE),
    "claw": (O, CINE + HELL + DRAGON + "Low-angle shot: her massive foreclaw slams down in the foreground, talons as long as swords gouging the black rock, shattered stone, sparks and ash exploding outward. Her head hangs low behind the claw, one glowing blue eye fixed on the lens, lips curled back from her teeth." + ALONE),
    "tail": (O, CINE + HELL + DRAGON + "Wide shot from the side: she stands with all four legs planted and her head turned back over her shoulder, and her long spiked tail whips in a great arc across the foreground, smashing through a row of black rock spires; broken stone, sparks and ash fly." + ALONE),
    "frightful-presence": (O, CINE + HELL + DRAGON + "Wide low-angle shot from the front: she rears up to her full height with both wings spread wide enough to fill the sky and roars straight at the lens, jaws stretched wide, eyes blazing pale blue, a chain swinging from one horn. The roar blasts ash, embers and loose stones outward toward the lens." + ALONE),
    "riders-wing": (O, CINE + HELL + DRAGON + "Wide shot from the side: she stands her ground with one rider on her back, a tortle priest (a broad turtle-man with a domed shell, in dark robes and armour) seated in a black lacquered howdah saddle hung with chains and charms and topped with a small gilded shrine. She has swept her near wing up and forward like a huge shield in front of the rider, the leathery membrane stretched taut, and bolts of white force and flaming arrows from off-screen burst against it. She snarls toward the attack. No other people and no soldiers in the frame."),
    "wing-attack": (O, CINE + HELL + DRAGON + "Low-angle wide shot from the front: she crouches and slams both vast wings down and outward, and a shockwave of ash, embers, steam and broken rock blasts across the scorched ground toward the lens. Her feet are just leaving the ground." + ALONE),
    "dumal-hellfire": ([r"C:\Users\kpaul\DnD\dm-app\docs\style-test\mj\H03-dumal-hellfire-0.jpg"], CINE + "A field of black ice in Avernus, the first layer of the Nine Hells, under a burning red-orange sky (never grey), black smoke, embers, fires on the cliffs behind. The man from the reference image, with the same face and the same dark red-and-black plate armour and tattered black cloak (a handsome, careful-faced man with short dark hair, frost whitening the edges of his red plate), stands alone, planted with his feet wide, one hand on a great sword driven point-down into the ice before him. He leans forward and breathes a huge cone of blue-white hellfire from his open mouth: it starts at his lips and spreads wide, thirty feet across at its far end, half flame and half frost, and where it lands jagged spikes of ice burst from the ground while fire flares behind them. Side view from a low angle, wide shot so the whole cone is in frame. No other people in the frame."),
    "mirror": ([extra["mirror"]], CINE + "The same scene and composition as the reference image, as a photoreal film still: a field of ice lying across the scorched waste of Avernus under a burning red-orange hell sky (never grey), and rising from it a crag of ice shaped like a frozen wave that forgot to fall. Set into the crag is the Mirror of Mephistar, a towering flawless sheet of black glass forty feet high, smoking with cold. Deep inside the glass, the dim shape of a man in plate armour kneeling. On the ice shelf below stand four ice devils (tall pale insect-like devils with mandibles and long spears) and one skeletal bone devil with a scorpion tail, in a motionless line. In the foreground three small adventurers seen from behind walk toward it across cracked glare ice. Cold blue light glows inside the ice. No soldiers and no armies."),
    "lady-vengeance": ([extra["lady-vengeance"]], CINE + "The same ship design as in the reference image, as a photoreal film still: the Lady Vengeance, an infernal flying warship, hangs in the burning red-orange sky of Avernus (never grey) like a black blade: a long lean galley hull of riveted black infernal iron plating, no sails and no balloon, rows of gun-ports glowing orange along both flanks, a huge barbed harpoon launcher jutting from her bow, cold blue-white light from the planar engine core crackling along her keel, heat haze and embers trailing from her stern, a stone statue of a saint on her foredeck. She flies high over the black River Styx winding through the scorched wasteland, jagged mountains on the horizon. Seen from below in three-quarter view, epic scale."),
    "mirror2": ([], CINE + "Live-action photography, not a painting. A field of glare ice lies across the scorched volcanic waste of Avernus under a burning red-orange hell sky (never grey), black smoke and embers. From the ice rises a crag of ice shaped like a great frozen wave that curls over and never fell. Set into the face of the crag is the Mirror of Mephistar: a towering flawless rectangular sheet of black glass forty feet high, polished like obsidian, smoking with cold, darkly reflecting the red sky. Deep inside the glass, dim behind the reflections, the shape of a man in plate armour kneeling. On the ice shelf at the foot of the mirror stand four ice devils (tall pale insect-like devils with mandibles, segmented carapaces and long spears) and one skeletal bone devil with a scorpion tail, in a motionless line. In the foreground three small cloaked adventurers seen from behind walk toward it across the cracked ice. Cold blue light glows inside the ice. Wide establishing shot, epic scale. No soldiers and no armies."),
    "lady-vengeance2": ([], CINE + "Live-action photography, not a painting. The Lady Vengeance, an infernal flying warship, hangs in the burning red-orange sky of Avernus like a black blade: a long, lean galley hull of riveted black infernal iron plating streaked with soot and rust, no sails and no balloon, rows of gun-ports glowing orange along both flanks, a huge barbed harpoon launcher jutting from her bow, cold blue-white light from the planar engine core crackling along her keel, heat haze and embers trailing from her stern, a weathered stone statue of a saint on her foredeck. She flies high over the black River Styx winding through the scorched volcanic wasteland, jagged mountains on the horizon. Seen from below in three-quarter view, epic scale."),
    "frightful-presence2": (O, CINE + HELL + DRAGON + "Wide low-angle shot from directly in front: she rears up on her hind legs to her full height, forelegs raised with talons spread, both wings spread wide enough to fill the sky, and roars straight down at the lens, jaws stretched wide, eyes blazing pale blue. The roar blasts ash, embers and loose stones outward toward the lens. She wears no chains." + ALONE),
    "riders-wing2": (O, CINE + HELL + DRAGON + "Live-action look, not a painting. Wide shot from the side: she stands her ground with one rider on her back: a tortle priest, a hulking humanoid with the head and shell of a great tortoise, wearing dark priest's robes and scale armour, seated in a black lacquered howdah saddle hung with chains and charms. She has swept her near wing up and forward like a huge shield in front of the rider, the leathery membrane stretched taut and backlit by the red sky, and bolts of white force and flaming arrows from off-screen burst against it. She snarls toward the attack. No other people and no soldiers in the frame."),
    "tail3": (O, CINE + HELL + DRAGON + "Wide shot from the front three-quarter view: she stands broad and heavy on all four thick legs, each leg clearly visible and planted like a pillar, with a thick muscular neck and the same massive blunt head as in the reference turned toward the lens, wings half raised. Her long spiked tail whips around from behind her in a great arc across the foreground, smashing through a row of black rock spires; broken stone, sparks and ash fly." + ALONE),
}
_extra = OUT / "cine-specs-extra.json"  # later specs live here: {key: [[refs], prompt]}; CINE and DETAIL are added
if _extra.exists():
    SPECS.update({k: (v[0], CINE + v[1]) for k, v in json.loads(_extra.read_text(encoding="utf-8")).items()})



def hf(*args: str) -> object:
    r = subprocess.run([HF, *args, "--json"], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit(f"FAILED {args[:3]}: {r.stderr.strip()[:300]}")
    return json.loads(r.stdout)


def main() -> None:
    path = OUT / "cine-stills.json"
    jobs = json.loads(path.read_text()) if path.exists() else {}
    only = sys.argv[1:]
    for key, (refs, prompt) in SPECS.items():
        if key in jobs or (only and key not in only):  # never pay twice
            continue
        media = []
        for ref in refs:
            if Path(ref).exists():
                up = hf("upload", "create", ref)
                ref = up["id"] if isinstance(up, dict) else up[0]["id"] if isinstance(up[0], dict) else up[0]
            media += ["--image", ref]
        ids = hf("generate", "create", "cinematic_studio_2_5", *media, "--aspect_ratio", "16:9", "--resolution", "4k",
                 "--prompt", prompt + DETAIL)
        if not (isinstance(ids, list) and len(ids) == 1):
            sys.exit(f"STOP: {key} returned {ids!r}")
        jobs[key] = ids[0]
        path.write_text(json.dumps(jobs, indent=1))
    done = []
    for key, jid in jobs.items():
        dst = OUT / f"cine-{key}.png"
        if not dst.exists():
            subprocess.run([HF, "generate", "wait", jid, "--timeout", "6m", "--interval", "6s", "--quiet"], capture_output=True)
            d = hf("generate", "get", jid)
            if not d.get("result_url"):
                print(key, "NO RESULT:", d.get("status"))
                continue
            urllib.request.urlretrieve(d["result_url"], dst)
        done.append(key)
        print(key, Image.open(dst).size, flush=True)
    for name, keys in (("cine-stills-a.jpg", done[:6]), ("cine-stills-b.jpg", done[6:])):
        if not keys:
            continue
        sheet = Image.new("RGB", (3 * 640, 2 * 358))
        for i, key in enumerate(keys):
            sheet.paste(Image.open(OUT / f"cine-{key}.png").convert("RGB").resize((640, 358)), ((i % 3) * 640, (i // 3) * 358))
        sheet.save(OUT / name, quality=85)


if __name__ == "__main__":
    main()
