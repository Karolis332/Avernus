#!/usr/bin/env python3
"""Build dm-app/library/ from the Eventyr Complete DM's Bundle source folder.

Usage: python build_library.py [source_dir] [--out library_dir]

Idempotent: re-running overwrites library/maps, library/pdf, library.js,
library-text.js cleanly. library/ is gitignored (third-party copyrighted
material, never committed).
"""
import json
import os
import re
import sys

from PIL import Image
import fitz  # PyMuPDF

DEFAULT_SRC = (
    "C:\\Users\\QuLeR\\Desktop\\Baldur's Gate - Descent into Avernus"
    "\\Eventyr CDMB - Baldur\u2019s Gate_ Descent into Avernus"
    "\\Eventyr Games - Complete DM's Bundle - Descent into Avernus (v2.0)"
)
DEFAULT_OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "library")

PREFIX_RE = re.compile(r"^[A-Za-z]\d*\s*-\s*", re.IGNORECASE)
SIZE_RE = re.compile(r"(\d+\s*x\s*\d+)")
PRINTER_RE = re.compile(r"printer", re.IGNORECASE)
MIN_RE = re.compile(r"-min$", re.IGNORECASE)


def slugify(s):
    s = s.strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def strip_parens(s):
    return re.sub(r"\([^)]*\)", "", s)


def map_variant(name_no_ext):
    """Returns (variant, core) where variant is plain|grid|dm."""
    paren_content = ""
    m = re.search(r"\(([^)]*)\)", name_no_ext)
    if m:
        paren_content = m.group(1).lower()
    variant = "plain"
    if "dm" in paren_content:
        variant = "dm"
    elif "grid" in paren_content:
        variant = "grid"
    core = strip_parens(name_no_ext)
    core = MIN_RE.sub("", core.strip()).strip()
    core = PREFIX_RE.sub("", core)
    core = re.sub(r"\s+", " ", core).strip()
    return variant, core


def map_id_and_title(core):
    size_m = SIZE_RE.search(core)
    size = size_m.group(1).replace(" ", "") if size_m else ""
    title = SIZE_RE.sub("", core).strip()
    title = re.sub(r"\s+", " ", title).strip(" -")
    map_id = slugify(core)
    return map_id, title, size


def is_min(path):
    return "-min" in os.path.basename(path).lower()


def resize_save(src_path, dest_path, max_side):
    img = Image.open(src_path)
    img = img.convert("RGB")
    w, h = img.size
    scale = min(1.0, max_side / float(max(w, h)))
    if scale < 1.0:
        img = img.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.LANCZOS)
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    img.save(dest_path, "WEBP", quality=82)


def build_maps(src_root, out_dir):
    groups = {}  # id -> {title, chapter, size, variants: {plain/grid/dm: abs_path}}
    for dirpath, _dirnames, filenames in os.walk(src_root):
        chapter = os.path.relpath(dirpath, src_root).split(os.sep)[0]
        if chapter == ".":
            chapter = "General"
        for fn in filenames:
            if not fn.lower().endswith(".jpg"):
                continue
            name_no_ext = os.path.splitext(fn)[0]
            variant, core = map_variant(name_no_ext)
            if not core:
                continue
            map_id, title, size = map_id_and_title(core)
            if not map_id:
                continue
            full_path = os.path.join(dirpath, fn)
            g = groups.setdefault(map_id, {"title": title, "chapter": chapter, "size": size, "variants": {}})
            if g["chapter"] == "General" and chapter != "General":
                g["chapter"] = chapter
            existing = g["variants"].get(variant)
            if existing is None or (is_min(existing) and not is_min(full_path)):
                g["variants"][variant] = full_path

    maps_out = []
    maps_dir = os.path.join(out_dir, "maps")
    thumbs_dir = os.path.join(maps_dir, "thumbs")
    os.makedirs(maps_dir, exist_ok=True)
    os.makedirs(thumbs_dir, exist_ok=True)

    for map_id in sorted(groups.keys()):
        g = groups[map_id]
        out_variants = {}
        thumb_src = None
        for variant in ("plain", "grid", "dm"):
            src_path = g["variants"].get(variant)
            if not src_path:
                continue
            suffix = "" if variant == "plain" else "-" + variant
            rel = "maps/" + map_id + suffix + ".webp"
            dest = os.path.join(out_dir, rel)
            resize_save(src_path, dest, 2560)
            out_variants[variant] = rel
            if thumb_src is None:
                thumb_src = src_path
        if not out_variants:
            continue
        thumb_rel = "maps/thumbs/" + map_id + ".webp"
        resize_save(thumb_src, os.path.join(out_dir, thumb_rel), 400)
        maps_out.append({
            "id": map_id,
            "title": g["title"],
            "chapter": g["chapter"],
            "size": g["size"],
            "variants": out_variants,
            "thumb": thumb_rel
        })
    return maps_out


def build_docs(src_root, out_dir):
    docs_out = []
    texts_out = {}
    pdf_dir = os.path.join(out_dir, "pdf")
    for dirpath, _dirnames, filenames in os.walk(src_root):
        chapter = os.path.relpath(dirpath, src_root).split(os.sep)[0]
        if chapter == ".":
            chapter = "General"
        chapter_slug = slugify(chapter)
        for fn in filenames:
            if not fn.lower().endswith(".pdf"):
                continue
            if PRINTER_RE.search(fn):
                continue
            src_path = os.path.join(dirpath, fn)
            doc_id = slugify(os.path.splitext(fn)[0])
            title = os.path.splitext(fn)[0].replace("_", " ")
            title = re.sub(r"\s+", " ", title).strip()
            rel_dest = "pdf/" + chapter_slug + "/" + fn
            dest_path = os.path.join(out_dir, rel_dest)
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            with open(src_path, "rb") as fsrc, open(dest_path, "wb") as fdst:
                fdst.write(fsrc.read())

            pages_text = []
            try:
                pdf = fitz.open(src_path)
                for page in pdf:
                    text = page.get_text()
                    text = re.sub(r"\s+", " ", text).strip()
                    pages_text.append(text)
                pdf.close()
            except Exception as e:
                print("WARN: could not extract text from %s: %s" % (fn, e))

            docs_out.append({
                "id": doc_id,
                "title": title,
                "chapter": chapter,
                "file": rel_dest,
                "pages": len(pages_text)
            })
            texts_out[doc_id] = pages_text
    return docs_out, texts_out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--out")]
    out_dir = DEFAULT_OUT
    for a in sys.argv[1:]:
        if a.startswith("--out="):
            out_dir = a.split("=", 1)[1]
    src_root = args[0] if args else DEFAULT_SRC
    if not os.path.isdir(src_root):
        print("Source folder not found: %s" % src_root)
        sys.exit(1)

    maps_out = build_maps(src_root, out_dir)
    docs_out, texts_out = build_docs(src_root, out_dir)

    lib_js = "window.LIBRARY = %s;\n" % json.dumps({"maps": maps_out, "docs": docs_out}, indent=2)
    with open(os.path.join(out_dir, "library.js"), "w", encoding="utf-8") as f:
        f.write(lib_js)

    text_js = "window.LIBRARY_TEXT = %s;\n" % json.dumps(texts_out, indent=0)
    text_path = os.path.join(out_dir, "library-text.js")
    with open(text_path, "w", encoding="utf-8") as f:
        f.write(text_js)

    text_size = os.path.getsize(text_path)
    print("Maps: %d" % len(maps_out))
    print("Docs: %d" % len(docs_out))
    print("library-text.js size: %d bytes (%.1f KB)" % (text_size, text_size / 1024.0))

    total = 0
    for dirpath, _dirnames, filenames in os.walk(out_dir):
        for fn in filenames:
            total += os.path.getsize(os.path.join(dirpath, fn))
    print("library/ total size: %d bytes (%.1f MB)" % (total, total / 1024.0 / 1024.0))


if __name__ == "__main__":
    main()
