"""Rewire the campaign map: the Sword of Zariel is in THREE PIECES.

New structure
-------------
  The Fallen Three pieces are UNCHANGED -- they are still the road to the
  Citadel (Haruman done, Bel open, Olanthius open). That preserves Haruman's
  already-collected piece, Bel's rods-and-cipher trade, and Lulu's memory bypass.

  What changes: the Sword is not in the Citadel. It was taken apart and hidden
  in three hard places --

    1. Crypt of the Hellriders   (Olanthius guards it; he was there)
    2. Kostchtchie's Maw         (frozen into the anchors)
    3. Pit of Shummrath          (under the Styx, in the pit fiend's keeping)

  The Citadel's Sword chamber is EMPTY. The Citadel becomes the place the
  three fragments are reforged, which keeps every other thing already written
  into it: the Wound-Gate, the Hall of the Last Charge, Yael, Lulu's reunion
  and caging-memory, the door to Coram.

  Kostchtchie's Maw and the Pit of Shummrath move optional -> main.

Run after patch_dmapp_session9.py. Idempotent.
"""

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAP = os.path.join(ROOT, "dm-app-patches", "campaign-map.js")

SENTINEL = "Sword piece 1 of 3"


def in_pin(text, pin_id, pairs):
    """Apply (old, new) replacements only inside the given pin's block."""
    m = re.search(r'\n    \{\n      id: "' + pin_id + r'", title:', text)
    if not m:
        sys.exit(f"pin not found: {pin_id}")
    start = m.start()
    end = text.find("\n    },", start) + len("\n    },")
    block = text[start:end]
    for old, new in pairs:
        if old not in block:
            sys.exit(f"anchor missing in {pin_id}:\n  {old[:90]}")
        block = block.replace(old, new, 1)
    return text[:start] + block + text[end:]


def main():
    t = open(MAP, encoding="utf-8").read()
    if SENTINEL in t:
        print("already patched -- nothing to do")
        return

    # ---------------------------------------------------- 1. Crypt: piece 1/3
    t = in_pin(t, "crypt-of-the-hellriders", [
        ('objective: "Win the third piece from Olanthius, the guilty witness, with Lulu there to hear him."',
         'objective: "Win the third piece of the ROAD from Olanthius, the guilty witness, with Lulu there to hear him -- and take the first SHARD OF THE SWORD, which he has been guarding down here since the flight."'),
        ('unlocks: ["Fallen Three: 3 of 3.",',
         'unlocks: ["Sword piece 1 of 3 -- the hilt and the crossguard.", "Fallen Three: 3 of 3.",'),
        ('dmChoices: ["Olanthius is a witness, not the one who hid the Sword. Yael and Lulu carried it out."',
         'dmChoices: ["Olanthius is a witness, not the one who BROKE the Sword -- but he is the one who kept a shard. Yael and Lulu carried the Sword out; it was taken apart afterward and scattered.", "He will not hand the shard over easily. Taking it means answering for what the Sword cost Yael."'),
    ])

    # ------------------------------------------- 2. Kostchtchie's Maw: piece 2/3
    t = in_pin(t, "kostchtchies-maw", [
        ('stage: "ch3c", path: "optional", status: "open",',
         'stage: "ch3c", path: "main", status: "open",'),
        ('objective: "Break the three ice anchors and free Kostchtchie to make war on Zariel."',
         'objective: "Break the three ice anchors, free Kostchtchie to make war on Zariel -- and cut the second shard of the Sword out of the ice it is frozen into."'),
        ('requires: ["Nothing. A bargain, not a dungeon."]',
         'requires: ["Nothing, for the bargain.", "For the shard: something that can work the anchor-ice, and something that can survive what is under it. [DM: THIS SITE NEEDS A REAL GUARDIAN NOW -- see dmChoices.]"]'),
        ('unlocks: ["Skip one Citadel-window penalty, or weaken one Zariel encounter.",',
         'unlocks: ["Sword piece 2 of 3 -- the blade\'s forte, the half nearest the hand.", "Skip one Citadel-window penalty, or weaken one Zariel encounter.",'),
        ('dmChoices: ["An optional lever. Olanthius does not demand it here."]',
         'dmChoices: ["NO LONGER OPTIONAL: a Sword shard is here, so this is main path.", "WARNING -- as written this was the easiest site on the board (requires: nothing, a bargain not a dungeon). A Sword shard cannot sit somewhere free. Give the ice a keeper before this is played: Kostchtchie himself wants the shard and will trade it for his freedom, or the anchors are warded and something old is sleeping under them.", "The cleanest version: Kostchtchie HAS the shard, knows what it is, and the price of it is letting him out. That makes the demon lord bill the party already owes into the cost of the Sword."]'),
    ])

    # ------------------------------------------- 3. Pit of Shummrath: piece 3/3
    t = in_pin(t, "pit-of-shummrath", [
        ('stage: "ch3b", path: "optional", status: "open",',
         'stage: "ch3b", path: "main", status: "open",'),
        ('objective: "Dam the Styx over the pit and bleed the pit fiend Shummrath."',
         'objective: "Dam the Styx over the pit, bleed the pit fiend Shummrath -- and take the third shard of the Sword, which Bel jailed him with and which is why he is still down there."'),
        ('unlocks: ["Pit fiend blood.",',
         'unlocks: ["Sword piece 3 of 3 -- the point.", "Pit fiend blood.",'),
        ('dmChoices: ["Not introduced in this campaign yet."]',
         'dmChoices: ["NO LONGER OPTIONAL: a Sword shard is here, so this is main path.", "Not introduced in this campaign yet.", "The jailing reads better with the shard in it: Bel did not imprison Shummrath for rebellion, he imprisoned the thing he had hidden and left a pit fiend sitting on it. Bel knows exactly what is down there, which gives the Forge visit a second layer.", "This site still pays pit fiend blood, so it now does double duty: a shard AND a Blood Pay source."]'),
    ])

    # --------------------------------------------- 4. The Citadel: empty chamber
    t = in_pin(t, "bleeding-citadel", [
        ('objective: "Reach the Citadel in a 33-day window, get inside, and claim the Sword of Zariel."',
         'objective: "Reach the Citadel in a 33-day window, get inside, and REFORGE the Sword of Zariel from the three shards. The Sword is not here. Its chamber is empty, and has been since the flight."'),
        ('requires: ["The road: all three Fallen Three pieces, or Lulu\'s final memory.",',
         'requires: ["All three SHARDS of the Sword (Crypt, Kostchtchie\'s Maw, Pit of Shummrath). Without them the chamber is just a room.", "The road: all three Fallen Three pieces, or Lulu\'s final memory.",'),
        ('unlocks: ["The Sword of Zariel, the physical lever.",',
         'unlocks: ["The Sword of Zariel, reforged -- the physical lever.",'),
        ('"The Sword\'s chamber: a worthiness test. Sincerity lowers the DC.",',
         '"The Sword\'s chamber: EMPTY. Let them see that first, and let it land. Then the shards they are carrying start to pull toward the empty cradle.",\n          "The reforging: lay the three shards in the cradle. A worthiness test, not a crafting check. Sincerity lowers the DC.",'),
        ('dmChoices: ["The interior is this campaign\'s own:',
         'dmChoices: ["THE SWORD IS IN THREE PIECES and hidden elsewhere -- the empty chamber is the reveal, and the reforging is the climax of the chapter.", "Who broke it, and why, is still open [TO RULE]: Yael and Lulu carried the Sword out, and someone took it apart afterward so that no one hand could pick it up again. Olanthius kept a shard, Bel buried one under a pit fiend, and one went into the ice at the Maw.", "The interior is this campaign\'s own:'),
    ])

    # ------------------------------------------------------ 5. stage summaries
    t = t.replace(
        'summary: "A short, linear chapter that Eventyr runs as one adventuring day: climb the Scab, enter the Bleeding Citadel, survive the Idyllglen dream, claim the Sword. Gate: a worthy hand holds the Sword of Zariel. Here: the Citadel stands only in a 33-day window, and Yael\'s resting place replaces Idyllglen."',
        'summary: "Eventyr runs this as one adventuring day: climb the Scab, enter the Bleeding Citadel, survive the Idyllglen dream, claim the Sword. Gate: a worthy hand holds the Sword of Zariel. HERE IT IS BIGGER: the Citadel stands only in a 33-day window, Yael\'s resting place replaces Idyllglen, and the Sword is NOT in its chamber. It was broken into three shards and hidden at the Crypt, the Maw and the Pit. Chapter 4 is the reforging, not the finding."',
        1)

    t = t.replace(
        'Here: the road needs all three pieces, or Lulu\'s full memory. Haruman\'s piece is held."',
        'Here: the road needs all three pieces, or Lulu\'s full memory. Haruman\'s piece is held. SEPARATELY, the three shards of the Sword itself are hidden at the Crypt, Kostchtchie\'s Maw and the Pit of Shummrath -- the Fallen Three find the Citadel, the shards fill it."',
        1)

    # ----------------------------------------------------- 6. session estimate
    t = t.replace(
        'dmChoices: ["Counted from the state on 2026-10-11, with session 9 still to play."]',
        'dmChoices: ["Counted from the state on 2026-10-11, BEFORE the Sword was split into three shards.", "ADD ABOUT 3 SESSIONS: Kostchtchie\'s Maw (1.5) and the Pit of Shummrath (1.5) moved from optional to main path. Main path is now roughly 14.5 sessions, most-likely roughly 20."]',
        1)

    with open(MAP, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(t)
    print(f"campaign-map.js rewired for 3 Sword shards ({len(t):,} bytes)")


if __name__ == "__main__":
    main()
