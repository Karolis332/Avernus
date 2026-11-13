"""Scratch: the seven hero beats of the sky chase redone as separate shots (DM's go for the key frames, 2026-11-13).
Adds the key frames to edit-specs.json (kf-h*) and the shot prompts to film-specs.json (h*). Nothing is started here.
usage: python hero_specs.py"""
import json
from pathlib import Path

OUT = Path(__file__).parent

PAINT = ("Paint one frame from a painterly animated feature film, dark horror in the Nine Hells: no ink outlines, forms built from brush-textured planes of light and colour "
         "with visible brushstrokes, realistic anatomy, deep shadows, a dark muted palette lit by red firelight, cinematic widescreen composition. "
         "Use the characters exactly as they are designed in the reference images: the same faces, costumes, colours and shapes. Nobody smiles. No text. ")
MOVE = "This is a freeze frame from the middle of a violent movement, not a pose. "
DECK = ("The place is the open deck of a flying warship under a burning red sky: the deck plates and the rail are black riveted iron, not wood; "
        "no masts, no sails, no rigging, no ropes, no other ship. ")

STILLS = {
    "kf-h1-drenwal-shield": [["cine-paint-drenwal.png"],
        PAINT + MOVE + DECK + "Low three-quarter front view, full body; no other people. The armoured cleric from the first image, with his red cape, his rune-inscribed dark plate "
        "and his black fiend-faced shield, is caught in the middle of throwing himself into the path of a blinding blue-white bolt of lightning that slants down from the upper right: "
        "he is mid-stride, front knee driving forward and bent deep, back foot just leaving the deck, his whole body leaning into the blow, his shield arm punched up and out "
        "so that the bolt bursts against the face of the shield in a spray of branching lightning, his head ducked behind the rim, teeth clenched, his cape and hair blown straight back "
        "by the blast, his flaming mace swung low behind him for balance. Sparks skitter across the iron plates.", "2k"],
    "kf-h3-drenwal-heal": [["cine-paint-drenwal.png"],
        PAINT + MOVE + DECK + "Flames lick across the plates. Low front view, full body. The armoured cleric from the first image is caught in the middle of a great upward swing "
        "of his flaming golden mace: striding forward out of the fire, his weight rolling onto his front foot, his torso twisted, the mace arm sweeping up past his shoulder in an arc "
        "that leaves a trail of golden light, his shield arm flung wide, his mouth open in a shout, his red cape swirling around him with the turn. "
        "Where the arc of light passes, a wave of warm golden radiance is starting to burst outward across the deck toward two fallen armoured figures who lie burning "
        "in the foreground, seen from behind as dark shapes. Embers swirl.", "2k"],
    "kf-h7-drenwal-toll": [["cine-paint-drenwal.png", "cine-paint-red.png"],
        PAINT + MOVE + DECK + "Low side view, full body. The armoured cleric from the first image is caught in the middle of a lunging step as he casts a death spell: "
        "his front foot stamping down, his body thrown forward, his right arm whipping out straight with the fingers splayed and the hand empty, his black fiend-faced shield "
        "swung back behind him, his eyes flaring blood-red, his red cape snapping out behind him, ragged streamers of black and crimson energy tearing from his open hand "
        "toward the upper right. There, in the background, the red dragon from the second image strains against a taut heavy harpoon chain at the iron rail, "
        "and above his horned head a huge spectral bell of black and crimson light is half formed, its edges still ragged smoke.", "2k"],
    "kf-h7-lucan-sword": [["cine-paint-lucan.png", "cine-paint-red.png"],
        PAINT + MOVE + DECK + "Low side view, full body; no other people. The old knight from the first image, with his steel helm, his red tabard, his shield and his mechanical legs "
        "of brass, is caught in the middle of a descending sword cut, moving from right to left: he pivots on his brass legs, his hips and shoulders turning through the blow, "
        "the longsword halfway down its arc with a streak of motion behind the blade, his shield tucked tight against his body, his tabard flaring with the turn, his jaw set. "
        "The blade is a hand's width from the scaled neck of the red dragon from the second image, whose neck and shoulder fill the left third of the frame, "
        "pinned against the iron rail by a taut heavy harpoon chain; the dragon's head is twisting away, jaws open. Sparks and chips of scale fly.", "2k"],
    "kf-h8-aurora-struck": [["cine-paint-aurora.png"],
        PAINT + MOVE + DECK + "Side view, full body; no other people. The astral elf archer from the first image, with her long white hair, her antlered circlet, her dark armour "
        "and her star-flecked cloak, is caught in the instant a blinding blue-white bolt of lightning from the upper left blasts her off her feet: she is in the air, "
        "hurled backward, her body arched, her arms flung wide, her head snapped back, her glowing white bow torn out of her hand and spinning away, her cloak and hair "
        "whipped forward around her by the blast, small arcs of lightning crawling over her armour, her boots a foot above the iron plates.", "2k"],
    "kf-h10-aurora-draw": [["cine-paint-aurora.png", "cine-paint-blue.png"],
        PAINT + MOVE + DECK + "Side view, the archer on the left facing right, seen from the knees up. The astral elf archer from the first image is caught in the middle of "
        "drawing her great glowing white bow: her bow arm driving out straight, her back and shoulder hauling the string back, the string hand just passing her jaw, "
        "her weight sinking onto her back leg, her white hair and star-flecked cloak whipping in the wind, her eyes narrowed along the arrow. "
        "The arrow blazes white-gold, with violet energy and thin lightning winding tighter around it. In the sky on the right the blue dragon from the second image "
        "dives straight at her, wings half folded, lightning gathering in his open throat; he fills a third of the frame.", "2k"],
    "kf-h11-aurora-tool": [["cine-paint-aurora.png", "cine-paint-red.png", "cine-paint-ship.png"],
        PAINT + "A quiet, slow moment after the fight. The place is a plain of black ash and cracked, dimly glowing rock under a dull red sky. "
        "The astral elf archer from the first image, burned and tired, soot on her face, kneels on one knee beside the huge scaled flank of the dead red dragon from the second image, "
        "which fills the right half of the frame, each scale as large as a shield. She holds a jagged length of scrap iron in both hands; it glows white-hot and is flowing like "
        "soft wax, already bent halfway into a long hooked scaling tool, and its light falls on her face and hands. Her bow is slung on her back. "
        "Far behind her in the haze, small, the black iron warship from the third image sits grounded on the plain: no masts, no sails. No other people.", "2k"],
}

HEAD = "A painterly animated feature film, dark horror. Keep the painting style of the first frame. One continuous shot, no cuts. "
TAIL = " Fast, weighty, full-body motion at normal speed, no slow motion. Audio: {audio}. No speech, no music, no captions."


def shot(start: str, text: str, camera: str, audio: str, duration: int = 3, tail: str = TAIL) -> dict:
    return {"mode": "image-to-video", "start": start, "refs": [], "duration": duration,
            "prompt": HEAD + text + f" Camera: {camera}." + tail.format(audio=audio)}


SHOTS = {
    "h1-drenwal-shield": shot("kf-h1-drenwal-shield.jpg",
        "The cleric plants his front foot and drops his weight behind the shield. The bolt drives him back a full step, his boots scraping across the iron. "
        "He snarls, shoves forward with his shoulder and heaves the shield up and aside, flinging the lightning off it into the sky. His cape whips behind him.",
        "slow push-in at chest height", "a deafening crack of lightning, a long electric roar, his wordless shout of effort, boots scraping on iron, wind"),
    "h3-drenwal-heal": shot("kf-h3-drenwal-heal.jpg",
        "The cleric finishes the upward swing of the mace, rising onto his toes, then drives it down with both shoulders and slams its head against the deck. "
        "A wave of golden light bursts out from the blow and rolls across the deck over the two fallen figures; the flames on them go out. His cape settles around him.",
        "low, pulling back ahead of the wave of light", "his wordless shout, a deep warm hum that swells, one heavy boom, flames snuffed out"),
    "h7-drenwal-toll": shot("kf-h7-drenwal-toll.jpg",
        "The cleric finishes the lunge and clenches his outstretched hand into a fist, wrenching it downward as if hauling on a rope. "
        "Above the dragon the black and crimson bell swings once and tolls; a shockwave of dark light crushes down on the head of the dragon. "
        "The dragon's roar chokes off and his head drops. The cleric's arm stays out, shaking.",
        "tilts up from his fist to the bell", "one enormous deep funeral bell toll, the roar of the dragon cut off, the creak of the chain, then near silence"),
    "h7-lucan-sword": shot("kf-h7-lucan-sword.jpg",
        "The old knight drives the cut down through with his whole body and the blade bites into the neck of the dragon; scales burst. "
        "He rips the sword back along the wound, steps through on his brass legs and snaps his shield up as the head of the dragon whips round at him.",
        "tracks with him at hip height", "steel biting through scale, the hiss and clank of brass pistons, the dragon bellowing, the chain rattling"),
    "h8-aurora-struck": shot("kf-h8-aurora-struck.jpg",
        "The archer is flung backward through the air, hits the iron deck on her shoulder, rolls twice and slides to a stop on her side, her cloak smoking, one arm stretched out. "
        "Her glowing bow clatters across the plates and comes to rest out of her reach. She does not get up.",
        "whips sideways with her as she flies, then holds still", "a crack of lightning, a cry cut short, a body hitting iron, the bow skittering away, wind"),
    "h10-aurora-draw": shot("kf-h10-aurora-draw.jpg",
        "The archer hauls the string the last inches to her ear, her whole back straining. She holds for one heartbeat as the arrow flares to blinding white. "
        "She looses: the string snaps forward, her bow arm kicks, her hair and cloak blow forward with the release, and the arrow leaves as a white-gold streak toward the diving dragon.",
        "slow push-in along the line of the arrow", "the rising hum of the charged arrow, her breath held, the snap of the bowstring, a shriek of air as the arrow leaves"),
    "h11-aurora-tool": shot("kf-h11-aurora-tool.jpg",
        "The glowing iron finishes flowing into a long hooked tool and cools to dull grey in her hands. She shifts her grip, sets the hook under the edge of one great red scale, "
        "braces her knee against the flank and leans her whole weight on the handle. The scale cracks, lifts and comes free into her other hand. She turns it over and looks at it.",
        "static", "wind over the plain, the soft ring of metal reshaping and cooling, a strained breath, one scale cracking loose", duration=4,
        tail=" Slow, tired, deliberate motion at normal speed. Audio: {audio}. No speech, no music, no captions."),
}

if __name__ == "__main__":
    for key, (srcs, _, _) in STILLS.items():
        missing = [s for s in srcs if not (OUT / s).exists()]
        assert not missing, (key, missing)
    for name, new in (("edit-specs.json", STILLS), ("film-specs.json", SHOTS)):
        path = OUT / name
        specs = json.loads(path.read_text(encoding="utf-8"))
        specs.update(new)
        path.write_text(json.dumps(specs, indent=1, ensure_ascii=False), encoding="utf-8")
        print(name, "+", len(new))
    print("clip seconds:", sum(s["duration"] for s in SHOTS.values()), "credits at 1080p:", 3.25 * sum(s["duration"] for s in SHOTS.values()))
