"""Patch the DM app files with post-Session 9 state.

Sources are the live files pulled from the VPS into %TEMP%; outputs land in
dm-app-patches/ ready to upload over sessions/ on the server.

  09-arkhans-tower.js  -> party levels 12 -> 13 (+ the two art blocks)
  campaign-arcs.js     -> Sigil #2 done in arc-dumal; Tiamat's curse in arc-orhenn
  campaign-map.js      -> new Stygian Dock landmark pin

Idempotent: re-running will not duplicate anything.
"""

import os
import re
import sys

TMP = os.path.expanduser(r"~/AppData/Local/Temp")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "dm-app-patches")

# ---------------------------------------------------------------- session file
LEVELS = [
    ('note: "Light Cleric 12. Carries the Shield of the Hidden Lord, with Gargauth trapped inside."',
     'note: "Light Cleric 13. Sigil of the Binding drawn (Tier II of the Three Sigils); '
     'only the kinslaying remains. Carries the Shield of the Hidden Lord, with Gargauth trapped inside."'),
    ('note: "Level 12 (class not yet ruled). Rides the celestial Moonkite."',
     'note: "Level 13 (class not yet ruled -- campaign-state.md has her as Archfey Warlock). '
     'Rides the celestial Moonkite."'),
    ('note: "Wildfire Druid 12. Carries the Soul Capacitor."',
     'note: "Wildfire Druid 13. Afflicted with Tiamat\'s curse. Carries the Soul Capacitor."'),
    ("This session is designed for the three 12th-level characters of this campaign",
     "This session is designed for the three 13th-level characters of this campaign"),
]

# ------------------------------------------------------------------ arcs file
SIGIL_NOTE = (
    '      { t: "note", title: "Session 9: the Binding Is Drawn", text: "Drenwal has '
    'completed SIGIL #2, the Binding, in Dumal\'s blood -- taken when he wounded his '
    'brother at the Last Hill. He is Tier II on the Three Sigils road.\\n\\nRemember what '
    'that road is: the Sigils and the Rebirth are RIVAL cures, and the Sigils are the '
    'ritual that forged Dumal himself. Step 3 is all that remains: kill the last living '
    'Bhaalspawn. The survivors are Dumal, Senna (about six) and Drenwal.\\n\\nFollowed '
    'honestly, his own ritual ends with his own death -- which is also Mordenkainen\'s '
    'rebirth. That convergence is the redemption out, and Veska officiates either way. '
    'Lock the three open decisions in drenwal-bhaal-blood.md before step 3 comes up." },\n'
)

CURSE_NOTE = (
    '      { t: "note", title: "Session 9: Tiamat\'s Curse", text: "Or\'Henn is cursed. It '
    'is not an affliction, it is a delivery mechanism: it pressures him into ASKING A '
    'DRAGON FOR HELP, transfers to that dragon, sacrifices the dragon, and summons '
    'Tiamat. Doing nothing is not safety -- it is a clock.\\n\\nThis is Arkhan\'s win '
    'condition delivered by proxy. Freeing Tiamat is his whole purpose, and he told the '
    'party what the blood does for free because he wanted them to want it.\\n\\nTwo cures '
    'compete. The stolen vial breaks curses she laid (safe, but spends the vial, which the '
    'party means to pour out at Uldrak\'s Grave). The dragon-transfer clears Or\'Henn and '
    'summons her -- and the map already lists that as a Chapter 5 option: Tiamat breaks '
    'Elturel\'s chains, for a price.\\n\\nLikeliest dragon asked: Obatala. Krull is the '
    'only friendly face at that tower." },\n'
)

# ------------------------------------------------------------------- map file
STYGIAN_PIN = '''    {
      id: "stygian-dock", title: "Stygian Dock",
      x: 46.0, y: 58.0,
      stage: "ch3c", path: "optional", status: "open",
      objective: "Find Thavius Kreeg, the traitor who damned Elturel, reborn by Zariel as an amnizu. Or'Henn is the way in; his true name sits in the Contract V coffer.",
      bloodPrice: "A CR 18 amnizu on his own dock, with Styx water at his back. His signature is Forgetfulness: psychic damage and stun, and sustained it erases HOURS OF MEMORY. Do not bring Lulu here unprotected -- her memory is a hard prerequisite for freeing the Caged Star, and therefore for Drenwal's rebirth.",
      blood: 3,
      eventyr: "Not an Eventyr node. Campaign-specific: welded on in Session 8 when the party deduced the estate-master's identity.",
      requires: ["Or'Henn, who served him without knowing it.", "Ideally his true name (Contract V coffer) as leverage."],
      unlocks: ["A direct line to the contract that damned Elturel.", "The Companion (imprisoned planetar) and the Creed Resolute souls.", "Possibly a way to break the contract itself."],
      sessions: 1,
      dmChoices: ["Killed in the Nine Hells, he is destroyed for good.", "He can be bargained with instead of fought -- he is a bureaucrat who sold a city.", "The party's stated Session 10 route runs through here on the way to Uldrak's Grave."],
      alternatives: ["Skip him: the Fallen Three remain the main road to the Citadel."],
      blocks: [
        { t: "note", title: "The Memory Trap", text: "Their route to Uldrak runs up the Styx and through this dock. The river erases memory on contact; the amnizu erases memory as a signature power. Lulu's full memory is required to free the Caged Star, which is where Drenwal's rebirth happens. Two memory threats, aimed squarely at the one resource the campaign cannot replace -- and the party does not know it." }
      ]
    },
'''


def patch(path_in, path_out, fn):
    if not os.path.exists(path_in):
        sys.exit(f"missing source: {path_in}")
    text = open(path_in, encoding="utf-8").read()
    text, n = fn(text)
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(path_out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)
    print(f"  {os.path.basename(path_out):24} {n} change(s)  {len(text):,} bytes")


def do_session(t):
    n = 0
    for old, new in LEVELS:
        if old in t:
            t = t.replace(old, new, 1)
            n += 1
    return t, n


def do_arcs(t):
    n = 0
    if "Session 9: the Binding Is Drawn" not in t:
        anchor = t.find('"arc-dumal": {')
        i = t.find('blocks: [', anchor) + len('blocks: [\n')
        t = t[:i] + SIGIL_NOTE + t[i:]
        n += 1
    if "Session 9: Tiamat's Curse" not in t:
        anchor = t.find('"arc-orhenn": {')
        i = t.find('blocks: [', anchor) + len('blocks: [\n')
        t = t[:i] + CURSE_NOTE + t[i:]
        n += 1
    return t, n


def do_map(t):
    if 'id: "stygian-dock"' in t:
        return t, 0
    m = re.search(r'\n    \{\n      id: "uldraks-grave"', t)
    if not m:
        sys.exit("could not find uldraks-grave anchor in campaign-map.js")
    return t[:m.start() + 1] + STYGIAN_PIN + t[m.start() + 1:], 1


if __name__ == "__main__":
    print("patching DM app files:")
    patch(os.path.join(OUT_DIR, "09-arkhans-tower.js"),
          os.path.join(OUT_DIR, "09-arkhans-tower.js"), do_session)
    patch(os.path.join(TMP, "dmapp", "sessions_campaign-arcs.js"),
          os.path.join(OUT_DIR, "campaign-arcs.js"), do_arcs)
    patch(os.path.join(TMP, "dmapp", "sessions_campaign-map.js"),
          os.path.join(OUT_DIR, "campaign-map.js"), do_map)
