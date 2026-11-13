"""Scratch: write the ten painted rounds (v5) into film-specs.json. Each round is image-to-video from its key frame.
usage: python v5_specs.py"""
import json
from pathlib import Path

OUT = Path(__file__).parent
PL = ("A painterly animated feature film, dark horror in the Nine Hells: no outlines, forms built from brush-textured painted light and colour with visible brushstrokes, realistic anatomy, deep shadows. "
      "Keep the painting style of the first frame for the whole shot. Fluid, weighty, fast motion; the camera is never still. The shot starts on the first frame: ")


def spec(start: str, refs: list[str], text: str, sound: str) -> dict:
    return {"mode": "image-to-video", "start": start, "refs": [f"ref-paint-{r}.jpg" for r in refs], "duration": 6,
            "prompt": PL + text + f" No speech and no dialogue from anyone. Sound: {sound}. No captions, no text on screen."}


ROUNDS = {
    "v5-r1": spec("kf-r1.jpg", ["drenwal", "lucan", "veska"],
                  "the two dragons dive after the fleeing iron warship, wings folding, closing fast, and the camera dives with them down onto her deck. The blue dragon sweeps alongside and breathes a blinding line of lightning down the length of the deck: the armoured cleric from the first reference image steps into it and catches it on his black fiend-faced shield, lightning bursting around him, while the old knight from the second reference image and the sergeant with the lance from the third reference image brace behind their shields at his shoulders, driven back a step in a shower of sparks. His lightning spent, the blue dragon folds his wings and drops straight down into the floor of black ash clouds, which swallow him.",
                  "roaring wind, dragon roars, a deafening crack of lightning, grunts of effort"),
    "v5-r2": spec("kf-r2.jpg", [],
                  "fire and lightning stab down through the grating; the dragonborn druid flinches and throws himself flat between the crates as flames pour through. He rises on one knee, snarling, and thrusts his flame-tipped staff up toward the roaring shapes passing over the grating: the fire on his staff gutters and dies, the gold scales on his jaw flare bright, and the five-headed shadow on the wall behind him swells and turns its heads toward him. His arm shakes and drops. He cannot strike. He curls back into the dark between the crates with the fox of fire pressed against him as the shadow of a dragon passes overhead.",
                  "muffled roars and thunder from above, groaning iron, five hissing voices whispering over each other, his ragged breathing"),
    "v5-r3": spec("kf-r3.jpg", ["drenwal"],
                  "the fire of the red dragon pours over the deck; the knight and the sergeant burn behind their glowing shields, crying out in pain, and the elf archer, her cloak alight, dissolves into silver mist and vanishes from sight. The dragon lunges over the rail and slams his wing across the deck like a falling wall, hurling the knight and the sergeant tumbling across the iron. The camera whips to the armoured cleric from the reference image: he raises his glowing mace overhead and a wave of warm golden light rolls out from him over the two fallen fighters; the flames on them die and they push themselves up.",
                  "the roar of fire, screams of pain, the boom of the wing strike, a deep warm hum of healing light"),
    "v5-r5": spec("kf-r5.jpg", ["ship"],
                  "inside the black engine core the pale face and clawing hands of the trapped soul strain against the cage bars, screaming, and are dragged back into the dark; the face stretches, tears apart into smoke and burns away. The gnome engineer keeps his face turned away and his eyes shut. The core ignites from black to blinding white; the gauge needles swing hard over; the room shakes. Cut to outside: the black iron warship from the reference image erupts with blue-white fire from her stern and surges forward, bow first, with a thunderclap, tearing away across the red sky.",
                  "one long human scream of agony that breaks into many voices and is cut off, then a rising engine howl and a thunderclap"),
    "v5-r6": spec("kf-r6.jpg", [],
                  "the brass automaton heaves the breech shut as the second one spins the aiming wheel; the crystal rings of the huge cannon blaze to full charge and it fires, then again and again, bolt after bolt of blinding blue-white force, the gun slamming back on its carriage. The bolts burst against the chest and wing of the red dragon; he shrieks and tumbles. The camera whips forward along the deck to the bow, where a third brass automaton swings the great barbed harpoon launcher round, sights along it and fires: the harpoon streaks out trailing its heavy chain and punches deep into the shoulder of the red dragon; the chain snaps taut.",
                  "the rising whine of the cannon charging, three thunderous shots, the shriek of a dragon, the crack of the harpoon launcher, chain running out and snapping taut"),
    "v5-r7": spec("kf-r7.jpg", ["drenwal"],
                  "the sergeant drives her lance into the throat of the chained dragon as the longsword of the old knight bites into his neck beside it; scales and dark blood fly. The winged, antlered steed slams into his flank with lowered antlers in a burst of starlight. The dragon rears against the chain. The camera whips to the armoured cleric from the reference image: he thrusts out his open hand, his eyes flaring blood-red, and a huge spectral bell of black and crimson light appears above the dragon and tolls once; a shockwave of dark light crushes down through the skull of the dragon. His roar chokes off, his eyes go dark, and he sags and hangs dead from the chain.",
                  "steel on scale, the dragon bellowing, one enormous deep funeral bell toll, then near silence and the creak of the chain"),
    "v5-r8": spec("kf-r8.jpg", ["lucan", "aurora"],
                  "the blue dragon rockets up out of the storm past the hull, wreathed in lightning, twists in the air above the deck and breathes: his lightning blasts across the deck. The old knight from the first reference image is hurled backward and crashes down, armour smoking; the astral elf archer from the second reference image, caught with her bow half drawn, is thrown off her feet and lies still, her glowing bow skittering away across the iron. Armour plates tear off the flank of the ship and whirl away; she lists, burning, trailing smoke.",
                  "the storm bursting open, a deafening crack of lightning, a cry cut short, tearing metal"),
    "v5-r9": spec("kf-r9.jpg", [],
                  "the druid is frozen half out of the hatch as the five-headed shadow in the smoke bends over him, its heads whispering, and the gold scales on his jaw burn brighter. He cries out through his teeth, squeezes his eyes shut and tears himself free: the shadow recoils and thins into smoke. He climbs onto the deck and drives his flame-tipped staff down beside the fallen: a fox of living fire leaps from it and bursts into a ring of green-gold healing flame that rolls outward across the deck. The gauntlet of the old knight closes on his sword; the eyes of the elf archer open and her hand finds her bow.",
                  "five hissing voices whispering over each other, his strangled cry, then a rush of fire like a held breath let go"),
    "v5-r10": spec("kf-r10.jpg", [],
                   "the archer holds at full draw as the blue dragon dives at her with lightning gathering in his throat; the arrow blazes brighter, violet energy and lightning winding tighter around it. She looses. The camera flies with the arrow as it streaks across the red sky, a white-gold comet, and strikes the dragon in the throat: a colossal explosion of radiant light and violet lightning blows half his neck away, tears the scales from his chest and shreds one wing; his head hangs by a strip of hide. The lightning in him dies. He falls, turning slowly, into the ash clouds, which close over him.",
                   "the hum of the charged arrow, the snap of the bowstring, a shattering explosion, the roar of the dragon cut off, then wind"),
    "v5-r11": spec("kf-r11.jpg", ["aurora"],
                   "a slow, quiet shot. The battered warship sinks the last few yards and lays the dead red dragon, hanging beneath her on the harpoon chain, down on the black plain in a soft cloud of ash. Slow cut to the ground beside the carcass: the astral elf archer from the reference image, burned and tired, holds a jagged piece of scrap iron in both hands; it glows, softens and flows like wax into a long hooked scaling tool. She sets its edge under one great red scale on the flank of the dragon and levers the scale free.",
                   "wind, the creak of chain and tired iron, embers ticking, the soft ring of metal reshaping, one scale cracking loose"),
}

if __name__ == "__main__":
    path = OUT / "film-specs.json"
    specs = json.loads(path.read_text(encoding="utf-8"))
    for key, one in ROUNDS.items():
        missing = [f for f in [one["start"], *one["refs"]] if not (OUT / f).exists()]
        assert not missing, (key, missing)
    specs.update(ROUNDS)
    path.write_text(json.dumps(specs, indent=1, ensure_ascii=False), encoding="utf-8")
    print(len(ROUNDS), "rounds written; longest prompt", max(len(v["prompt"]) for v in ROUNDS.values()))
