"""Shop pictures for the Emporium player screen (emporium.html?view=players): one 16:9 painting per spot.

python emporium_shops.py forge [more ids]   paints the ids that have no job yet (2 credits each), then fetches them
python emporium_shops.py                    fetches whatever is already painted; pays for nothing
State: emporium-shops.json {id: job id}. To repaint a spot, delete its line there first.
Output: dm-app/art/generated/emporium-(id).webp (2560 wide); the 2k source stays in .playwright-mcp/hf/ (gitignored).
"""
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

HF = r"C:\Users\kpaul\AppData\Roaming\npm\node_modules\@higgsfield\cli\vendor\hf.exe"
HERE = Path(__file__).parent
STATE = HERE / "emporium-shops.json"
SOURCES = HERE.parents[3] / ".playwright-mcp" / "hf"
ART = HERE.parents[2] / "art" / "generated"
WIDTH = 2560  # wider than the monitor, so the picture can drift and move in on a part of the stall without going soft

OPEN = ("A wide painterly dark fantasy illustration, the establishing picture of one stall in a travelling night market "
        "in Avernus, the first layer of the Nine Hells, seen at eye level from where a customer stands. ")
# The goods list is drawn over the right side of the picture, so the subject sits left of centre.
FRAME = (" Composition: the subject fills the left and the centre of the frame. The right third of the frame is darker and "
         "quieter, in shadow, with nothing important in it.")
# The Rapture's goods list sits on the left of the monitor (theme side "left"), so its host stands on the right.
FRAMES = {"rapture": (" Composition: the host stands right of centre, large in the frame. The left third of the frame "
                      "is darker and quieter, in shadow, with nothing important in it.")}
# A keeper with official art is painted from it. The official file stays local (gitignored); only the new painting is kept.
REFS = {"rapture": HERE.parents[2] / "art" / "official" / "mahadi-true-form.webp"}
BACKDROP = " Far behind, strings of warm market lanterns and a hazy dark red sky."
INDOORS = {"soul-pit", "devils-teeth", "ninefingers"}  # inside a tent or a booth: no sky behind
LOOK = (" Gritty painterly brushwork with no outlines, realistic proportions, rich detail, deep shadows, a dark and uneasy "
        "mood, the look of a professional concept painting.")
# The Forge sample was painted with "No humans and no other customers." in place of the last sentence.
RULES = (" No text, no letters, no numbers, no writing on any sign, no border, no frame, no user interface. "
         "Only the figures described are in the picture, and nobody else.")

SCENES = {
    "forge": (
        "The Firesnake Forge: a huge spiked iron war machine, an armoured infernal wagon, has been opened like a clam shell "
        "and its engine block turned into a forge full of white-orange coals. Small fire snakes, serpents made of living "
        "flame, coil through the coals carrying tongs and hammers in their mouths. The smith is a salamander: a large "
        "creature with the muscular torso and arms of a man and the long coiled body of a great serpent instead of legs, "
        "covered in dark red and black scales with glowing orange cracks, with a crest of flame-like spines on his head and "
        "down his back. He works at a black anvil with his hammer raised, half turned away from the viewer. Racks of swords, "
        "spear heads, sheaves of arrows, shields and pieces of plate armour hang on the opened hull plates; a quenching "
        "trough steams; chains and hooks hang overhead. Fierce orange forge light, sparks and embers in the air."
    ),
    "jetty": (
        "The jetty: a pier of black planks hung on heavy chains over the black water of the river Styx, a lantern on every "
        "post, seen from the market end looking down its length. Moored at the far end is a long black iron flying galley, "
        "several decks tall, with a great harpoon launcher at her bow and a crow's nest above her; the severed heads of two "
        "dragons are lashed to her prow, one red and one blue. On the left, where the planks meet a shelf of grey ice, "
        "three riders in black plate armour sit motionless on black horses whose manes and hooves are fire, watching the "
        "ship. Cold mist drifts over the water; the lanterns make pools of warm light on the wet planks."
    ),
    "gate": (
        "The gate of the market: two huge spiked iron war machines, armoured infernal wagons, parked nose to nose so that "
        "their rams form an arch over the way in. A large sheet of parchment is nailed to the hull of the left one with an "
        "iron spike: a wanted notice, its writing only illegible scratches, its red wax seal still wet and dripping. On the "
        "roofs of the war machines stand two small horned devils with brass speaking trumpets, calling out. Through the "
        "arch, a ring of lantern light and a great red silk pavilion in the distance. Torches burn on iron poles; grey ash "
        "drifts down."
    ),
    "rapture": (
        "Infernal Rapture: the entrance of a pavilion of deep red silk four storeys high, with gold ribs and gold tassels, "
        "glowing from within like a paper lantern. In front of the open entrance, large in the frame, stands the host in "
        "his true form, a rakshasa, exactly the figure in the reference image: the head of a great white tiger with black "
        "stripes, pale blue eyes, long white whiskers and a thick ruff of white fur, on a tall, broad-shouldered man's "
        "body; furred hands with long dark claws and gold rings; a pale grey-blue mantle draped over one shoulder and "
        "wrapped round his chest, over robes of deep violet banded with gold, and a wide brown sash at the waist. He bows "
        "slightly in welcome, one clawed hand held open toward the viewer, a pleased smile that shows his fangs, half lit "
        "by the lanterns and half in shadow. A new pose and a new place, the same face, fur and clothes as the reference; "
        "take nothing else from the reference image. Behind him the entrance is drawn open on a hall of low tables set with silver and crystal, "
        "steaming dishes, hanging brass lamps and heaped cushions; a stair curls up to a high table. Golden motes of light "
        "hang in the warm air and steam rises through the floor from the baths below."
    ),
    "barber": (
        "The barber's stall: a small stall under a red and white striped awning, with one old leather barber's chair, a "
        "shelf of bottles, tonics, combs, razors and jars of ink, a cracked mirror, and a big copper basin of clean hot "
        "water steaming on an iron stand. The barber is a sturdy, cheerful, middle-aged woman with her sleeves rolled up "
        "and a clean apron, stropping a razor, seen from the side as she turns toward the empty chair. Warm lamp light the "
        "colour of honey and curling white steam: the one friendly, homely corner of a hellish market."
    ),
    "bank": (
        "The bank: a heavy armoured iron carriage on great wheels with a counter cut into its side, a brass grille and a "
        "set of brass scales on the counter. Behind the counter, filling the carriage from floor to roof, is an iron cage "
        "crammed with pawned treasures: rings on hooks, cloaks, wands, swords, a harp, holy symbols and small chests, each "
        "with a blank paper tag on a string. The banker sits behind the grille: a squat, heavy devil with a large bald "
        "head, a wide mouth with small tusks and small leathery wings folded behind a high-collared banker's coat, writing "
        "in a ledger with a quill, eyes lowered. Cold candle light glints on gold; coins stand in neat towers."
    ),
    "ichor": (
        "The alchemist's wagon: a wagon built of glass and brass, crowded with vats, coiled tubes, retorts and shelves of "
        "jars and bottles that glow from inside in acid green, violet and sickly yellow, bubbling. A thin, cheerful man in "
        "a stained leather apron and round spectacles leans over the counter, seen in profile, holding out a long tasting "
        "spoon that drips glowing liquid; two fingers of that hand are a different colour from the rest. Coloured vapour "
        "and rising bubbles in the air, glints on the glass, puddles of glowing spill on the ground."
    ),
    "larva": (
        "The larva farm: a row of low, wet wooden pens under a sagging tarpaulin, slick with slime, and in the pens dozens "
        "of pale, fat, maggot-like larvae as long as a forearm, heaped and squirming in the shadow, a few with the faint "
        "suggestion of a sad human face. A hobgoblin warlord walks the rails, seen from the side: tall and broad, with dark "
        "orange skin, in a general's long coat with tarnished braid over armour, a grading stick in his hand. Behind the "
        "pens stands a patched war tent with a torn banner over its door, and crates of weapons and armour. Sickly "
        "yellow-green lantern light, drifting mist, a damp, cold gloom."
    ),
    "informant": (
        "The informant: no stall at all, only a narrow black gap between two parked iron war machines. Folded into that "
        "dark sits a bone devil: a very tall, gaunt, skeletal devil with dry skin stretched over its bones, a skull-like "
        "head, thin folded wings and a long scorpion tail curled round its feet. It holds a satchel stuffed with papers "
        "and scrolls on its knees and a quill pen in its long fingers, and it looks straight at the viewer with two small "
        "points of pale light for eyes. One guttering lantern on the ground, loose blank sheets of paper on the frozen "
        "dirt, smoke drifting through the gap."
    ),
    "soul-pit": (
        "A gambling den inside a big, dark purple tent: a sunken ring of wooden benches steps down to a round table covered "
        "in green felt, lit from above by a ring of hanging lanterns. On the felt lie two bone dice and a heap of thick "
        "black coins that glow faintly from within. The dealer stands at the table: a handsome cambion with small curved "
        "horns, red-brown skin and folded bat wings, in a gambler's waistcoat, one open hand over the dice, smiling. Round "
        "the ring a crowd three deep of devils is only dark silhouettes with raised fists against the lantern smoke. "
        "Violet haze."
    ),
    "devils-teeth": (
        "A dice den under a dark tent: an upended iron-bound barrel serves as the table, with two large dice of yellowed "
        "bone on its lid and a tall glass jar full of teeth and fangs beside them. Behind the barrel squats a barbed devil: "
        "a lean, man-sized devil covered from head to tail in sharp barbs and spines, with glowing eyes and long clawed "
        "fingers, holding out an open palm for the next stake. Behind him a few hyena-headed gnolls and small winged imps "
        "are dim silhouettes. Red ember light, sparks and smoke."
    ),
    "ninefingers": (
        "A fortune-teller's booth hung with heavy, dark violet curtains, lit by a single tall candle whose flame stands "
        "perfectly still. Behind a small round table sits a night hag: a gaunt old woman with dark blue-violet skin, small "
        "horns, long white hair and ragged black robes, her face mostly hidden in the shadow of her hood, her long-nailed "
        "hands laying out a fan of old playing cards face up on the cloth; the cards are painted with small portraits of "
        "faces. A bulging leather sack as big as a child sits on the floor by her chair, tied with cord. Dust motes in the "
        "candle light and deep darkness between the curtains."
    ),
    "hourglass": (
        "The bookmaker's stand: an hourglass taller than a man, its glass bulbs full of fine black sand falling in a thin "
        "stream, held in a stand made of long pale bones. Beside it, at a high clerk's desk, stands a bone devil in a neat "
        "dark clerk's coat: a tall, gaunt, skeletal devil with dry skin over bone, a skull-like head with a hooked smile, "
        "folded wings and a scorpion tail, an open ledger in front of it and a pen in its hand. Ash falls slowly through "
        "the lamp light like sand; a single lamp, long shadows, a cold stillness."
    ),
    "bell": (
        "The edge of the market: the last iron war machine at the rim of the camp, with a tall iron mast rising from its "
        "roof and a great black iron bell hanging from the mast. Below it a faintly glowing red line runs across the "
        "ground. On the near side of the line, warm lantern light and trampled dirt. On the far side, a road of pale ice "
        "runs away into thick grey fog and falling snow. Nobody is there. Snowflakes drift across the line and melt in the "
        "warm light. A cold, waiting silence."
    ),
}


def hf(*args: str) -> object:
    r = subprocess.run([HF, *args, "--json"], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit(f"FAILED {args[:3]}: {r.stderr.strip()[:300]}")
    return json.loads(r.stdout)


def prompt(key: str) -> str:
    return OPEN + SCENES[key] + FRAMES.get(key, FRAME) + ("" if key in INDOORS else BACKDROP) + LOOK + RULES


def reference(key: str) -> list:
    """The --image flag for a spot painted from official art (as PNG, in the gitignored sources folder), or nothing."""
    if key not in REFS:
        return []
    png = SOURCES / f"ref-{key}.png"
    Image.open(REFS[key]).convert("RGB").save(png)
    return ["--image", str(png)]


def paint(key: str, jobs: dict) -> dict:
    ids = hf("generate", "create", "nano_banana_2_1", "--aspect_ratio", "16:9", "--resolution", "2k",
             *reference(key), "--prompt", prompt(key))
    if not (isinstance(ids, list) and len(ids) == 1):
        sys.exit(f"STOP: {key} returned {ids!r}")
    jobs = {**jobs, key: ids[0]}
    STATE.write_text(json.dumps(jobs, indent=1))  # saved at once: the CLI cannot list or cancel a job
    return jobs


def fetch(key: str, job: str) -> None:
    src = SOURCES / f"emporium-{key}.png"
    if not src.exists():
        subprocess.run([HF, "generate", "wait", job, "--timeout", "6m", "--interval", "6s", "--quiet"], capture_output=True)
        d = hf("generate", "get", job)
        if not d.get("result_url"):
            print(key, "NO RESULT:", d.get("status"))
            return
        urllib.request.urlretrieve(d["result_url"], src)
    im = Image.open(src).convert("RGB")
    im.resize((WIDTH, round(WIDTH * im.height / im.width)), Image.LANCZOS).save(ART / f"emporium-{key}.webp", quality=84)
    print(key, im.size, "->", ART / f"emporium-{key}.webp", flush=True)


def main() -> None:
    jobs = json.loads(STATE.read_text()) if STATE.exists() else {}
    unknown = [k for k in sys.argv[1:] if k not in SCENES]
    if unknown:
        sys.exit(f"No scene written for: {unknown}")
    for key in sys.argv[1:]:
        if key not in jobs:  # never pay twice
            jobs = paint(key, jobs)
    for key, job in jobs.items():
        fetch(key, job)


if __name__ == "__main__":
    main()
