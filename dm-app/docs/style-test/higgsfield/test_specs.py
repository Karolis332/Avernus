"""Scratch: specs for the small test of 2026-11-13 (stiff characters, Colico Jack as a pirate).
Adds two stills to edit-specs.json and one 3 s shot to film-specs.json.
usage: python test_specs.py"""
import json
from pathlib import Path

OUT = Path(__file__).parent

PAINT = ("Paint one frame from a painterly animated feature film, dark horror in the Nine Hells: no ink outlines, forms built from brush-textured planes of light and colour "
         "with visible brushstrokes, realistic anatomy, deep shadows, a dark muted palette lit by red firelight, cinematic widescreen composition. "
         "Use the characters exactly as they are designed in the reference images: the same faces, costumes, colours and shapes. Nobody smiles. No text. ")

STILLS = {
    # Colico Jack: the DM wants "a proper pirate". Same composition as the round 4 start frame, so it can replace it.
    "paint-jack-pirate": ["cine-paint-jack.png",
        "Edit this painting. Keep the painting style, the lighting, the composition, the iron wheel, the chute and his pose exactly. "
        "Keep the same man: lean, sun-scorched, hollow cheeks, hard haunted eyes, grim, not smiling. "
        "Change him into a proper pirate captain of a hell-ship: a battered black tricorne hat over a faded red bandana, long dark hair tied back, "
        "a short rough black beard, a gold hoop in one ear, a weathered long captain's coat of dark oxblood leather with tarnished brass buttons and wide turned-back cuffs, "
        "worn open over a loose stained linen shirt, a wide red sash under a broad leather belt with a heavy brass buckle, a cutlass in a scabbard at his hip, "
        "a baldric across his chest with two old pistols, tall folded sea boots, heavy rings on his fingers. "
        "Everything is worn, scorched and salt-crusted; nothing clean or theatrical. No parrot, no eye patch, no skull and crossbones. No text.",
        "2k"],
    # Test shot 1: a key frame caught in the middle of the move, not a pose (cure 1 for stiff characters).
    "kf-t1-veska": [["cine-paint-veska.png", "cine-paint-red.png"],
        PAINT + "This is a freeze frame from the middle of a violent movement, not a pose. Side view, full body, on the tilting black iron deck of a flying warship "
        "under a burning red sky; no other people. The sergeant from the first image, a broad strong woman with a long dark ponytail tied high, a scar through her left eyebrow, "
        "a dented splint-mail cuirass and a faded brick-red tabard, is caught mid-lunge, moving from left to right: her whole weight thrown forward over a deeply bent front knee, "
        "her back leg stretched out straight behind her with the heel off the deck, hips and shoulders twisted into the thrust, both arms driving a long steel lance forward, "
        "her ponytail and tabard streaming back behind her, teeth bared, off balance and falling into the strike. "
        "The lance point is an arm's length from the throat of the red dragon from the second image, whose huge head and neck fill the right third of the frame, "
        "held against the ship's rail by a barbed iron harpoon and a taut heavy chain in his shoulder, jaws open, recoiling. Sparks and embers streak past with the motion.",
        "2k"],
}

SHOTS = {
    # One beat, one subject, one camera move, three seconds; the prompt names the body, not the effect (cures 2 and 3).
    "t1-veska": {"mode": "image-to-video", "start": "kf-t1-veska.jpg", "refs": [], "duration": 3,
        "prompt": "A painterly animated feature film, dark horror. Keep the painting style of the first frame. One continuous shot, no cuts. "
                  "The sergeant drives off her back foot, twists her hips and shoulders and rams the lance forward with her whole body. "
                  "The point punches into the throat of the red dragon. She follows through, shoving it deeper with all her weight, her ponytail and tabard snapping forward, "
                  "then wrenches her shoulders back and tears the lance free in a spray of dark blood. "
                  "The dragon jerks his head back and roars, straining against the chain; scales and embers fly. "
                  "Camera: tracks sideways with her lunge at shoulder height. Fast, weighty, full-body motion at normal speed, no slow motion. "
                  "Audio: a grunt of effort, steel punching through scale, the dragon roaring, the chain clanking, wind. No speech, no music, no captions."},
}

if __name__ == "__main__":
    for name, new in (("edit-specs.json", STILLS), ("film-specs.json", SHOTS)):
        path = OUT / name
        specs = json.loads(path.read_text(encoding="utf-8"))
        specs.update(new)
        path.write_text(json.dumps(specs, indent=1, ensure_ascii=False), encoding="utf-8")
        print(name, "+", ", ".join(new))
