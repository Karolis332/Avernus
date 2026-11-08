"""Unpack a Playwright evaluate dump ({index: dataURL}) into <label>-<index>.jpg files, then delete the dump.
Usage: python unpack.py 1D skarrix"""
import base64, json, os, sys

label, name = sys.argv[1], sys.argv[2]
here = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(here, f"{label}.json")
raw = open(src, encoding="utf-8").read()
data = json.loads(raw)
if isinstance(data, str):  # ponytail: the tool may wrap the result in a JSON string
    data = json.loads(data)
for i, url in data.items():
    if i.startswith("_"):  # job metadata
        print(i, url)
        continue
    if not url.startswith("data:image"):
        print("[FAIL]", label, i, url[:40])
        continue
    out = os.path.join(here, f"{label}-{name}-{i}.jpg")
    open(out, "wb").write(base64.b64decode(url.split(",", 1)[1]))
    print("[OK]", os.path.basename(out), os.path.getsize(out))
os.remove(src)
