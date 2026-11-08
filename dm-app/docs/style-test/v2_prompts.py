"""v2 of Vermilius and Flash: the DM found v1 too kid-like (the v1 prompts asked for round cheeks and big eyes).
Phase 1 (SREF_V2 empty): 4 portrait jobs. Phase 2 (SREF_V2 filled with the chosen v2 portraits): + attack jobs.
Writes v2-prompts.txt: "<label>\t<file stem>\t<prompt>", labels B01.."""
import os
from attack_prompts import BITE, BREATH, STYLE, WHERE

SREF_V1_GOOD = "https://cdn.midjourney.com/ec9507a4-e23f-478a-a7ef-583553959af9/0_2.png https://cdn.midjourney.com/944c8f9d-3f15-4b81-a15e-b371af63c047/0_2.png"  # Slarkas + Vistalancer, the DM liked these
NO = "--no people, rider, watermark, letters, cute, baby, chibi, cartoon, round cheeks"
PORTRAIT = {
    "vermilius": ("mirelle", "Close-up portrait of Vermilius, a huge female adult green dragon, ancient, cunning and predatory: a long narrow wedge-shaped head with a crocodile jaw, a thin cruel smile showing rows of fangs, narrow amber eyes with slit pupils under heavy brow ridges, long swept-back horns ringed with thin gold bands. A tall crest flares at the neck into a wide ivory frill spotted with violet, like a poisonous orchid. A black long-fingered handprint is burned into the scales of her throat. Weathered deep emerald scales. A thread of green smoke curls from one nostril. Dark ruined garden of black thorns in Avernus."),
    "flash": ("praxamor", "Close-up portrait of Flash, a red dragon in his prime, young but already huge and deadly: a long angular snout, a heavy jaw full of long fangs, narrow burning eyes full of arrogance and hunger, mouth open in a roar, long swept-back horns, a spined frill, glossy bright scarlet scales with glowing lava cracks between them, heat shimmer, not a single scar. Cracked volcanic ridge in Avernus."),
}
WHO = {
    "vermilius": "Vermilius, a huge female adult green dragon: long narrow wedge-shaped crocodile head, thin cruel smile with rows of fangs, narrow amber slit-pupil eyes, long swept-back horns ringed with gold bands, an ivory frill spotted with violet like an orchid, a black handprint burned into her throat, deep emerald scales",
    "flash": "Flash, a huge red dragon in his prime: long angular snout, heavy fanged jaw, narrow burning arrogant eyes, long swept-back horns, spined frill, glossy bright scarlet scales with glowing lava cracks, not a single scar",
}
SIGNATURE = {
    "vermilius": [("honeyed-voice", "Vermilius leans close and speaks softly, hypnotic and dangerous, a thread of green smoke curling from her nostrils in a slow spiral, her amber eyes glowing")],
    "flash": [("prove-it", "Flash rears up on his hind legs on a volcanic crag, wings flared wide, and roars a challenge at the sky, embers in the air"),
              ("overheat", "Flash overheating, the lava cracks between his scales blazing white-hot, steam and smoke pouring off him, glowing like a forge, in pain and fury")],
}
SREF_V2 = {  # chosen v2 portraits (B02-2, B03-1)
    "vermilius": "https://cdn.midjourney.com/9020ee7c-a4b7-4dcd-b139-1a35c949baf8/0_2.png",
    "flash": "https://cdn.midjourney.com/91b57529-5938-432e-9c39-0ee4e65c005c/0_1.png",
}


def jobs():
    for name, (old, text) in PORTRAIT.items():
        tail = f"{STYLE.replace(', dynamic action scene', '')} --ar 2:3 --raw --v 7 --profile srutin4"
        yield f"{name}-portrait", f"{text} {tail} {NO}"
        yield f"{name}-portrait", f"{text} {tail} --sref {SREF_V1_GOOD} --sw 50 {NO}"
    for name, sref in SREF_V2.items():
        old = PORTRAIT[name][0]
        nick = WHO[name].split(",")[0]
        his = "her" if name == "vermilius" else "his"
        moves = [
            ("bite", f"{nick} lunges jaws-first toward the viewer, teeth bared, {BITE[old]}"),
            ("claw", f"{nick} rakes a huge taloned forefoot across the frame toward the viewer, motion blur on the claws"),
            ("tail", f"Full body, {nick} whips {his} long spiked tail around in a sweeping strike, ash and debris flung into the air"),
            (BREATH[old][0], f"Side view, {nick} {BREATH[old][1]}"),
            ("frightful-presence", f"{nick} rears up with wings spread wide and roars, an aura of terror, looming over the viewer from a low angle"),
            ("wing-attack", f"Full body, {nick} beats {his} huge wings downward in a blast of wind that hurls ash and debris, lifting off the ground"),
        ] + SIGNATURE[name]
        for move, action in moves:
            yield f"{name}-{move}", f"{action}. {WHO[name]}. Setting: {WHERE[old]}. {STYLE} --ar 3:2 --raw --v 7 --profile srutin4 --sref {sref} --sw 50 {NO}"


if __name__ == "__main__":
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "v2-prompts.txt")
    rows = list(jobs())
    assert len(rows) == 4 + (15 if len(SREF_V2) == 2 else 0), len(rows)
    with open(out, "w", encoding="utf-8") as f:
        for i, (stem, prompt) in enumerate(rows, 1):
            f.write(f"B{i:02d}\t{stem}\t{prompt}\n")
    print(len(rows), "prompts ->", out)
