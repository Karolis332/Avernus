"""Full rules text for the Emporium's stock, from the System Reference Document 5.1 (CC BY 4.0), via Open5e.

python dm-app/tools/build_item_text.py      downloads the SRD magic items and spells, matches them to the stock,
                                            writes dm-app/sessions/campaign-emporium-item-text.js
A row with no SRD item (homebrew, or a book item outside the SRD) keeps the Emporium's own line: nothing is invented.
A scroll or a spellwrought tattoo gets the text of its spell.
"""
import json
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

APP = Path(__file__).resolve().parent.parent
OUT = APP / "sessions" / "campaign-emporium-item-text.js"
API = "https://api.open5e.com/v1/{}/?document__slug=wotc-srd&limit=500&format=json"
CREDIT = ("Rules text: System Reference Document 5.1 by Wizards of the Coast LLC, "
          "licensed under CC BY 4.0 (creativecommons.org/licenses/by/4.0), via Open5e.")
ROWS_JS = ("var p=require('path'),a=process.argv[1];var C=require(p.join(a,'js','core.js')),"
           "M=require(p.join(a,'sessions','campaign-emporium-goods.js'));var o=[];"
           "M.spots.forEach(function(s){(s.stock||[]).forEach(function(i){o.push([s.id,C.stripTags(i.name)]);});});"
           "console.log(JSON.stringify(o));")

# Stock name (lower case) -> SRD item name, where the names differ. A second value picks one kind of a family item.
ALIAS = {
    "arrow of dragon slaying": ("Arrow of Slaying", None),
    "dragon slayer, a hellrider's longsword": ("Dragon Slayer", None),
    "adamantine full plate": ("Adamantine Armor", None),
    "armour of cold resistance, breastplate": ("Armor of Resistance", None),
    "white dragon scale mail": ("Dragon Scale Mail", None),
    "lance, +2": ("Weapon, +1, +2, or +3", None),
    "flame tongue, a greatsword": ("Flame Tongue", None),
    "belt of hill giant strength": ("Belt of Giant Strength", None),
    "potion of hill giant strength": ("Potion of Giant Strength", None),
    "potion of frost giant strength": ("Potion of Giant Strength", None),
    "potion of fire giant strength": ("Potion of Giant Strength", None),
    "potion of cloud giant strength": ("Potion of Giant Strength", None),
    "potion of greater healing": ("Potion of Healing", None),
    "potion of superior healing": ("Potion of Healing", None),
    "potion of supreme healing": ("Potion of Healing", None),
    "keoghtom's ointment": ("Restorative Ointment", None),
    "luckstone": ("Stone of Good Luck (Luckstone)", None),
    "heward's handy haversack": ("Handy Haversack", None),
    "instant fortress (daern's)": ("Instant Fortress", None),
    "feather token: anchor": ("Feather Token", "anchor"),
    "feather token: bird": ("Feather Token", "bird"),
    "ring of resistance (acid)": ("Ring of Resistance", None),
    "potion of resistance (cold)": ("Potion of Resistance", None),
    "potion of resistance (acid or poison)": ("Potion of Resistance", None),
    "wand of the war mage, +1": ("Wand of the War Mage, +1, +2, or +3", None),
    "ioun stone, protection": ("Ioun Stone", "protection"),
    "ioun stone, awareness": ("Ioun Stone", "awareness"),
    "ioun stone, reserve": ("Ioun Stone", "reserve"),
    "figurine of wondrous power, bronze griffon": ("Figurine of Wondrous Power", "bronze griffon"),
    "figurine of wondrous power, silver raven": ("Figurine of Wondrous Power", "silver raven"),
    "elemental gem, red corundum": ("Elemental Gem", None),
    "iron bands of bilarro": ("Iron Bands of Binding", None),
    "horn of valhalla, silver": ("Horn of Valhalla", None),
    "iron flask, occupied": ("Iron Flask", None),
}
SPELL_ROW = re.compile(r"^(?:scroll of |spellwrought tattoo: )(.+)$", re.I)


def download(kind: str) -> list:
    req = urllib.request.Request(API.format(kind), headers={"User-Agent": "dm-app item text"})
    with urllib.request.urlopen(req, timeout=60) as r:
        page = json.load(r)
    if page.get("next"):
        sys.exit(f"{kind}: more than one page, raise the limit")
    return page["results"]


def stock() -> list:
    r = subprocess.run(["node", "-e", ROWS_JS, str(APP)], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit("could not read the stock: " + r.stderr.strip()[:300])
    return json.loads(r.stdout)


def blocks(desc: str) -> list:
    """Markdown paragraphs as strings; a table as {"table": [[cells], ...]}; quoted stat blocks are dropped."""
    out = []
    for para in desc.replace("\r", "").split("\n\n"):
        lines = [ln.strip() for ln in para.strip().split("\n") if ln.strip()]
        if not lines or lines[0].startswith(">"):
            continue
        if lines[0].startswith("|"):
            rows = [[c.strip() for c in ln.strip("|").split("|")] for ln in lines if not re.match(r"^\|[\s:|-]+\|?$", ln)]
            out.append({"table": rows})
        else:
            out.append(" ".join(ln.lstrip("*# ").strip() if ln.startswith("* ") else ln for ln in lines))
    return out


def pick(paras: list, kind: str) -> list:
    """The family's opening paragraphs and the part about one kind (Feather Token: anchor)."""
    heads = [i for i, p in enumerate(paras) if isinstance(p, str) and p.startswith("**")]
    mine = [i for i in heads if kind.lower() in paras[i][:60].lower()]
    if not mine:
        return paras
    start = mine[0]
    end = next((i for i in heads if i > start), len(paras))
    intro = [p for p in paras[:heads[0]] if isinstance(p, str)]
    return intro + paras[start:end]


def item_entry(it: dict, kind) -> dict:
    att = it.get("requires_attunement") or ""
    line = f"{it['type']}, {it['rarity']}" + (f" ({att})" if att else "")
    paras = blocks(it["desc"])
    return {"type": line, "text": pick(paras, kind) if kind else paras}


def spell_entry(sp: dict, how: str) -> dict:
    head = f"{sp['level']} {sp['school'].lower()}" if sp["level"] != "Cantrip" else f"{sp['school']} cantrip"
    comp = sp["components"] + (f" ({sp['material'].rstrip('.')})" if sp.get("material") else "")
    conc = "Concentration, up to " if sp.get("requires_concentration") in (True, "True") and not sp["duration"].lower().startswith("concentration") else ""
    stats = (f"**Casting Time:** {sp['casting_time']}  ·  **Range:** {sp['range']}  ·  **Components:** {comp}  ·  "
             f"**Duration:** {conc}{sp['duration']}")
    text = [stats] + blocks(sp["desc"])
    if sp.get("higher_level"):
        text.append("**_At Higher Levels._** " + sp["higher_level"])
    return {"type": f"{how}: {sp['name']}, {head}", "text": text}


def main() -> None:
    items = {i["name"].lower(): i for i in download("magicitems")}
    spells = {s["name"].lower(): s for s in download("spells")}
    entries, rows, missed = {}, {}, []
    for spot, name in stock():
        low = name.lower()
        m = SPELL_ROW.match(name)
        if m and m.group(1).lower() in spells:
            sp = spells[m.group(1).lower()]
            how = "Spell scroll" if low.startswith("scroll") else "Spellwrought tattoo"
            ident = f"{how}: {sp['name']}"
            entries.setdefault(ident, spell_entry(sp, how))
        else:
            srd, kind = ALIAS.get(low, (None, None))
            it = items.get((srd or name).lower())
            if not it:
                missed.append(f"{spot}|{name}")
                continue
            ident = it["name"] + (f": {kind}" if kind else "")
            entries.setdefault(ident, item_entry(it, kind))
        rows[f"{spot}|{name}"] = ident
    data = {"credit": CREDIT, "entries": entries, "rows": rows}
    OUT.write_text(
        "// Full rules text of the Emporium's stock, for the item pop-up (player screen and DM page).\n"
        "// Written by tools/build_item_text.py from the SRD 5.1 (CC BY 4.0, see credit): do not edit by hand.\n"
        "(function () {\n  \"use strict\";\n  var TEXT = " + json.dumps(data, indent=1, ensure_ascii=False) + ";\n"
        "  if (typeof module !== \"undefined\" && module.exports) module.exports = TEXT;\n"
        "  else window.EMPORIUM_ITEM_TEXT = TEXT;\n})();\n", encoding="utf-8", newline="\n")
    print(f"{len(rows)} rows matched to {len(entries)} SRD entries; {len(missed)} keep their own line")
    print("own line:", ", ".join(missed))


if __name__ == "__main__":
    main()
