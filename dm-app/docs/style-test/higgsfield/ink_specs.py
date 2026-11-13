"""Scratch: add restyle specs for the dark anime look the DM picked (panel C of face-styles.png) to edit-specs.json.
Each spec redraws one painted image with style-c.png as the style reference. Output: cine-ink-<name>.png.
usage: python ink_specs.py <source png> ...   (source cine-kf-r1.png -> key ink-kf-r1)"""
import json
import sys
from pathlib import Path

OUT = Path(__file__).parent
INK = ("Redraw the first image completely in the art style of the second image, which is only a style reference: a dark anime illustration. "
       "Thin precise black ink lines, semi-realistic proportions, sharp narrow eyes, large hard-edged black shadow shapes, flat muted desaturated colours with a red-orange firelight rim, "
       "a little fine hatching for shading; no painterly brush texture, no soft gradients, no glossy rendering. It must look as if the same artist drew both images. "
       "Keep the subject, composition, poses, costumes and every design detail of the first image exactly; do not copy the man from the second image.")

if __name__ == "__main__":
    path = OUT / "edit-specs.json"
    specs = json.loads(path.read_text(encoding="utf-8"))
    for src in sys.argv[1:]:
        assert (OUT / src).exists(), src
        key = "ink-" + src.removeprefix("cine-").removeprefix("paint-").removesuffix(".png")
        specs[key] = [[src, "style-c.png"], INK, "2k"]
        print(key)
    path.write_text(json.dumps(specs, indent=1, ensure_ascii=False), encoding="utf-8")
