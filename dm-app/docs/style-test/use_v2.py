"""Make the v2 art live for a dragon: <name>-*.webp becomes <name>-*-v1.webp, <name>-*-v2.webp becomes <name>-*.webp.
Usage (from the repo root): python dm-app/docs/style-test/use_v2.py vermilius flash"""
import glob, os, sys

art = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "art", "generated")
for name in sys.argv[1:]:
    for v2 in glob.glob(os.path.join(art, f"{name}-*-v2.webp")):
        live = v2[: -len("-v2.webp")] + ".webp"
        os.replace(live, live[: -len(".webp")] + "-v1.webp")
        os.replace(v2, live)
        print("live:", os.path.basename(live))
