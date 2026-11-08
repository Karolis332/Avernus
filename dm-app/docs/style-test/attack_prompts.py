"""Midjourney prompts for the dragons' stat block art (one image per attack), D&D style, styled after each chosen portrait.
Writes attack-prompts.txt: one line per job, "<label>\t<art file stem>\t<prompt>"."""
import os

SREF = {  # the chosen portrait of each dragon on the Midjourney CDN
    "skarrix": "https://cdn.midjourney.com/ec9507a4-e23f-478a-a7ef-583553959af9/0_2.png",
    "vhennic": "https://cdn.midjourney.com/944c8f9d-3f15-4b81-a15e-b371af63c047/0_2.png",
    "mirelle": "https://cdn.midjourney.com/cfdd2d38-6f19-4ebf-9033-d8f546317028/0_2.png",
    "praxamor": "https://cdn.midjourney.com/f3b7bf54-5c4a-44e3-9aa3-569dce5db307/0_0.png",
    "obatala": "https://cdn.midjourney.com/49a8e915-8983-4e78-8934-10b15ad7ee07/0_2.png",
}
WHO = {
    "skarrix": "Slarkas, an ancient black dragon: scowling heavy brow, broad square jaw dripping acid, bare-skull snout, horns curving forward, one milky blind eye, a broken sun-stamped lance head buried in his chest, near-black scales with an oily green sheen",
    "vhennic": "Vistalancer, an adult blue dragon: long narrow crocodile snout, haughty half-lidded eyes, one great steel-capped horn on his snout filed to a lance point, swept-back frills, azure scales fading to indigo, a round hole burned through his left wing",
    "mirelle": "Vermilius, a female adult green dragon: slender elegant face, sly smile, warm amber eyes, an ivory frill spotted with violet like an orchid, gold rings on her horns, a black handprint burned into her throat",
    "praxamor": "Flash, a young red dragon: short blunt snout, big eager eyes, stubby horns, glossy bright scarlet scales with glowing lava cracks, not a single scar",
    "obatala": "Obatala, an ancient white dragon: broad flat heavy face, small bored eyes, a beard of icicles, his right horn a broken stump capped in carved bronze, pale grey-blue soot-stained scales, steam rising, a lacquered howdah saddle with a small gilded shrine on his back",
}
WHERE = {
    "skarrix": "a black swamp under a rust-brown sky in Avernus",
    "vhennic": "grey ash dunes under a dim red sky in Avernus",
    "mirelle": "a ruined garden of black thorns in Avernus",
    "praxamor": "a cracked volcanic ridge in Avernus",
    "obatala": "a grey ash plain in Avernus",
}
BITE = {"skarrix": "acid spraying from the bite", "vhennic": "lightning arcing between his teeth",
        "mirelle": "green poison mist curling from her jaws", "praxamor": "embers spilling from his jaws",
        "obatala": "frost crusting on his fangs"}
BREATH = {"skarrix": ("acid-breath", "breathes a long straight line of hissing black-green acid that melts the ground"),
          "vhennic": ("lightning-breath", "breathes a long straight line of crackling blue lightning"),
          "mirelle": ("poison-breath", "breathes a billowing cone of green poison gas"),
          "praxamor": ("fire-breath", "breathes a roaring cone of fire"),
          "obatala": ("cold-breath", "breathes a cone of freezing white frost and ice crystals")}
SIGNATURE = {
    "skarrix": [("old-wound", "Slarkas recoils and flinches as radiant holy light flares from the sun-stamped lance head buried in his chest, smoke rising from the old wound, his blind eye squeezed shut")],
    "vhennic": [("lance-dive", "Vistalancer dives steeply out of the red sky horn-first like a knight's lance, wings folded back, lightning trailing behind him"),
                ("clean-exit", "Vistalancer wheels away fast and high into the clouds, wounded, a crackle of lightning covering his escape, glancing back over his shoulder")],
    "mirelle": [("honeyed-voice", "Vermilius leans close and speaks softly, hypnotic and kind, a thread of green smoke curling from her nostrils in a slow spiral, her warm amber eyes glowing")],
    "praxamor": [("prove-it", "Flash rears up on his hind legs on a volcanic crag and roars a challenge, chest puffed out, trying to look bigger than he is, embers in the air"),
                 ("overheat", "Flash overheating, the lava cracks between his scales blazing white-hot, steam and smoke pouring off him, glowing like a forge, in pain and fury")],
    "obatala": [("rimeground", "Obatala lands heavily and the ground beneath him turns to steaming mud and creeping frost, ice spreading outward in rings"),
                ("riders-wing", "Obatala curls one great wing over the old tortle priest riding in the howdah on his back, shielding him from a burst of fire")],
}
STYLE = "Dungeons & Dragons monster illustration, painterly WOTC sourcebook style, dynamic action scene, realistic, muted desaturated palette, dramatic low-key lighting, no text"
# Re-rolls after the first pass: the portrait sref pulled these back to a static head shot. Lower --sw, spell out the action.
RETRY = [
    ("skarrix", "acid-breath", "Side view, Slarkas spews a long straight jet of hissing black-green acid from his open jaws across the swamp, the acid melting and steaming the ground where it lands"),
    ("skarrix", "old-wound", "Slarkas rears back in pain, a broken golden sun-stamped lance head stuck deep in his scaled chest blazing with holy white-gold light, smoke rising from the wound, his blind eye squeezed shut"),
    ("vhennic", "lance-dive", "Seen from below, Vistalancer in mid-air flight dives steeply down out of the red sky, head thrust forward, the steel-capped horn on his snout aimed like a knight's lance, wings folded back, blue lightning trailing behind him"),
    ("vhennic", "clean-exit", "Seen from behind and below, Vistalancer flies away high into dark storm clouds, wounded, glancing back over his shoulder, a crackle of blue lightning covering his escape"),
    ("obatala", "cold-breath", "Side view, Obatala breathes a huge cone of freezing white frost and swirling ice crystals from his open jaws across the plain, everything in the blast freezing over"),
]


def jobs():
    for sid in SREF:
        name = WHO[sid].split(",")[0]
        moves = [
            ("bite", f"{name} lunges jaws-first toward the viewer, teeth bared, {BITE[sid]}"),
            ("claw", f"{name} rakes a huge taloned forefoot across the frame toward the viewer, motion blur on the claws"),
            ("tail", f"{name} whips his spiked tail around in a sweeping strike, ash and debris flung into the air"),
            (BREATH[sid][0], f"{name} {BREATH[sid][1]}"),
            ("frightful-presence", f"{name} rears up with wings spread wide and roars, an aura of terror, looming over the viewer from a low angle"),
            ("wing-attack", f"{name} beats his huge wings downward in a blast of wind that hurls ash and debris, lifting off the ground"),
        ] + SIGNATURE[sid]
        for move, action in moves:
            if sid == "mirelle":
                action = action.replace(" his ", " her ")
            no = "--no watermark, letters" if move == "riders-wing" else "--no people, rider, watermark, letters"
            yield f"{sid}-{move}", f"{action}. {WHO[sid]}. Setting: {WHERE[sid]}. {STYLE} --ar 3:2 --raw --v 7 --profile srutin4 --sref {SREF[sid]} {no}"
    for sid, move, action in RETRY:
        yield f"{sid}-{move}", f"{action}. {WHO[sid]}. Setting: {WHERE[sid]}. {STYLE} --ar 3:2 --raw --v 7 --profile srutin4 --sref {SREF[sid]} --sw 40 --no people, rider, watermark, letters"


if __name__ == "__main__":
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "attack-prompts.txt")
    rows = list(jobs())
    assert len(rows) == 38 + len(RETRY), len(rows)
    with open(out, "w", encoding="utf-8") as f:
        for i, (stem, prompt) in enumerate(rows, 1):
            f.write(f"A{i:02d}\t{stem}\t{prompt}\n")
    print(len(rows), "prompts ->", out)
