# Animation profile

Details for every animated clip and film: how each character, ship and monster looks, and what they
do in a fight. The DM (2026-11-13): "these small details matter a lot and lets keep tracking a
profile of them", "cuz then we can animate thavius kreeg".

- Everything here is from the DM unless it is marked **(guess)**. A guess is Claude's and waits for the DM.
- Add a line the moment the DM gives a new detail. Read this file before writing any prompt.
- Reference paintings: `dm-app/docs/style-test/higgsfield/paint-*.webp` (the current look). The older `toon-*.webp` are the cel-shaded set the DM moved away from. Prompts and job ids: same folder.

## The look

- Fight films are 2D animated, with the flow of a fast animated fantasy series for adults: fluid, the camera moves with the action, scenes change often. Photoreal read as "very static".
- One combat round is six seconds of film.
- Sound and voices: the horror of being in the Hells comes first. The first voice test had heroes shouting lines ("Fuel's dropping! Feed her, now!", "Sorry, friend.") and the DM called it "hella cringe": "less cringe voicelines more horror of the hells being there". So few words, no quips, no grins; screams, dread and the place itself carry the sound.
- 1080p. No generic soldiers or extras.
- Faces and finish (DM on the v2 cut and the first drawings): "the animation needs more refinement and lets move away from the AI slop faces". Each character needs a designed face of their own, drawn cleanly, and it has to hold in motion. Offered three face styles (`face-styles.webp`), the DM picked **B, painterly**: no outlines, faces and forms built from brushed light and colour, realistic bone structure, dark and moody. Later the same night the DM sent a crop of panel C and "use this artstyle for all": the look is now **C, dark anime**: thin precise ink lines, semi-realistic proportions, sharp narrow eyes, large hard black shadows, muted colour with a red firelight rim. Style reference: `style-c.png` (cropped from `face-styles.webp`); storyboard in that style: `storyboard-v6-ink.webp`. The sky chase film itself was still finished in **B, painted**: six painted rounds were already rendered when C was picked, a recut in C cost more credits than were left, and the DM chose to finish the painted one. Before the next film, ask which look.
- Stat block clips (dragon moves, the Mirror, the ship) stay photoreal and cinematic: the DM approved those.
- No morphing. At the end of round 1 of the sky chase Ser Lucan turned into Veska in the same pose; the DM: "i just hate the part where ser lucan morphs into veska", "thats crazy". Two characters who look alike never share a shot.
- Shots are made separately and cut together by hand (the DM asked, 2026-11-13): one beat per short clip, joined with ffmpeg, so a bad shot is retaken alone.
- Before a fight film, ask the DM about it round by round: the practice is in `fight-film-intake.md`.

## Heroes

| Who | Look | What they do on screen |
|---|---|---|
| **Drenwal** | Level 14 cleric. Hellrider plate inscribed with Bhaalspawn containment runes. Carries the Shield of Gargauth. | Powerful radiant spells. Calls a celestial ("celestial visitor"). Heals the others. Casts *toll the dead* with the Bhaal damage improvement (50 damage in one hit in the sky chase). |
| **Aurora** | Astral elf, warlock of the fey. Moonbow. Rides Moonkite. | Her arrows deal radiant damage. *Eldritch Smite*. Superconductor crit: the 170-damage arrow that nearly took Vistalancer's head off must look like massive damage. When she takes damage she misty steps and turns invisible. When a spell targets her, her supercharger rune activates and gives her force damage. |
| **Or'Henn** | Red dragonborn, wildfire druid. Under Tiamat's curse. Gold scales along the jaw **(guess, from the curse tracker)**. Wildfire spirit drawn as a fox of fire **(guess)**. | The curse stops him damaging the dragons, so he hides below deck. When he comes out he has to make a Wisdom save: show the curse working on him. *Mass cure wounds*. The breath weapon the curse gave him was a different fight, not the sky chase. |
| **Moonkite** | Celestial the size of a small horse, grace of a great cat, silver antlers, feathered wings, pale light. | Aurora's mount. Was in the sky chase. |
| **Ser Lucan** | Old Hellrider knight on Gondian mechanical legs of brass. | Shield and longsword. Took the breath attacks on deck. Swung at Flash after the harpoon hit. |
| **Sgt. Veska** | A woman with a ponytail. Broad, dented splint cuirass, Hellrider tabard faded to old brick, scar through one eyebrow. Carries a lance. (The app's stat block says close-cropped hair and an Oath-Blade: the DM's ponytail and lance win; stat block text unchanged.) | Was in the sky chase. From her stat block: two attacks a turn, Rally the Line, Sergeant's Rebuke when someone next to her attacks an ally, heavy crossbow at range. |
| **Colico Jack** | Has to "look like a proper pirate" (DM, 2026-11-13). The painted reference (a lean, sun-scorched pilot in a long coat) does not: redraw it before the next clip with him. | At the helm. Feeds the scrolls from the helm down a chute to the engine. Slings soul coins into the engine for the boost. |
| **Jeremy** | Gnome engineer, rugged and dusty, goggles, scorched leather apron, notebook on a chain. | In the engine room, watching the fuel levels and taking scrolls to feed into the engine. |

## The Lady Vengeance

- A long black iron flying galley with the harpoon at her bow. She flies bow first.
- She is several levels large: a big ship with decks below decks. A chute runs from the helm down to the engine room.
- **One big force cannon.** The app's stat block still says two (port and starboard): open, the DM decides whether the stat block changes.
- A crow's nest above the ship.
- The statue of St. Cuthbert is at the bottom of the ship, not on deck.
- Automatons man the cannon and the harpoon.
- The engine: a soul coin is black. When one goes in there are screams, because a soul is being sacrificed.

## Dragons

- **Flash** (red) and **Vistalancer** (blue): breath attacks and wing attacks. The characters burn when the fire hits them.
- **Obatala**: "she", in the Hells, her scales melting in the heat, ancient and grandiose, the same face in every shot.

## Fights

- **Sky chase (Session 13):** the beats are in `campaign-state.md` (Session 13, How the fight went). Cuts and specs: `dm-app/docs/style-test/higgsfield/` (`sky-chase-film-v2.mp4`, `film-specs.json`). The DM on the v2 cut: "damn bro the last one slaps", "we are going on a very good direction", "we can make the cinematic longer". The next cut must also show:
  - the attacks of each character, and more voice lines;
  - Moonkite and Veska; automatons manning the cannon and the harpoon; Jeremy in the engine room;
  - a black soul coin going in, with the screams of the soul;
  - the dragons' wing attacks, and the characters burning;
  - Drenwal healing the others, and his *toll the dead* for 50;
  - Tiamat's curse working on Or'Henn while he hides below, unable to damage the dragons, and his Wisdom save when he comes out;
  - Aurora's misty step and invisibility when she is hurt, and her arrow doing massive damage;
  - the ship flying bow first (in v2 she flew backwards), with the crow's nest and the one cannon;
  - an ending, slow: they carry the harpooned dragon downward and Aurora uses *fabricate* to make a tool to remove the scales.
  - **The finished film (2026-11-13):** `dm-app/art/generated/sky-chase-film.mp4`, 64.6 s, eleven painted rounds, in the app under Session 13, Sky Chase. Round by round: 1 the dive and Vistalancer's lightning on Drenwal's shield; 2 Or'Henn below, the curse stops his strike; 3 Flash's fire, Aurora to mist, the wing slam, Drenwal heals; 4 Jack at the helm, the chute, Jeremy at the gauges; 5 the black soul coin burns and the ship surges; 6 automatons on the cannon and the harpoon; 7 lance, sword, Moonkite, and the bell of *toll the dead*; 8 Vistalancer bursts up and drops Lucan and Aurora; 9 Or'Henn breaks the shadow and heals; 10 Aurora's arrow; 11 the dragon laid down and the scaling tool.
  - Not in it: the supercharger rune, Drenwal's celestial, any spoken line. Guesses that are in it **(guess)**: *toll the dead* as the killing blow on Flash, drawn as a black and crimson bell; the curse as a five-headed shadow; Moonkite fighting with lowered antlers.
  - Cut out by hand: the last 0.8 s of round 1, where Lucan morphed into Veska (so Veska is first seen clearly in round 3).
  - Flaws left in (no credits for retakes): Colico Jack in round 4 is not a proper pirate; round 8 is cut short because a sailing ship appeared behind Aurora; the fallen do not get up on screen in round 9; the scaling scene in round 11 plays on the deck, and the tool forms from the bow's glow.
- **Thavius Kreeg:** to animate next, after the sky chase film and Dumal. No details yet.
