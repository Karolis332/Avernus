# Chain Devils — Cinematic Scene v1

**Scope:** ~60 seconds. No voice acting. "Illuminated journal" aesthetic — painted stills + short motion clips + orchestral bed + SFX + on-screen quoted character dialogue in parchment cards.

**Goal:** Prove the pipeline on one scene. If it lands, templatize for weekly recap.

**Setting:** Palace of Gore — the Descent corridor between the Throne Room and the Cage Chamber (Phase 2 approach). Bone ribs overhead, blood-lacquered stone, hellforge-iron braziers. Chain Devils ambush from alcoves, chains animating from the walls.

---

## CHARACTERS (visuals you need to send)

For each PC, provide 2–3 reference images (any angle, any style — I'll normalize via character sheet + Flux/Midjourney character-ref). If you have tokens from Foundry/Owlbear, those work.

| PC | Reference needs | Key visual anchors |
|---|---|---|
| **Drenwal** (Light Cleric, Hellrider) | Face + full body + Shield of the Hidden Lord | Solar/Lathander iconography, warding-flare halo, bronze-ink cleric's garb, the Shield's Gargauth face carved into it |
| **Aurora** (Archfey Warlock) | Face + full body + Moonbow of Celestial Warding | Silver-fey markings, moonkite bond starlight, Moonbow (bow + wand fused, silver veins, starlight bowstring), fey cloak |
| **Asimov** (Soulknife Rogue) | Face + full body + Soul Capacitor | Interdimensional bounty-hunter attire, purple psionic glow, Soul Capacitor lamp on belt with crystalline veins, psychic soul knife manifesting as translucent purple daggers |
| **Chain Devils** (Kyton) | — | Iron-bound humanoid, scarred flesh, animated spiked chains, skull-hooded faces, hellforge embers |
| **Rasheem** (optional cameo) | — | Asimov's **genie lamp patron** and ranking member of an **interdimensional bounty hunter syndicate**. Not a sidekick — an employer. Tall theatrical efreeti, elaborate dark robes, purple psionic aura tied to the Soul Capacitor. Visual read: high-ranking soul-trade operator. Appears as smoke-and-silhouette from the lamp when speaking, not as a bystander in combat. |

Send reference images into `C:\Users\QuLeR\DnD\video-production\refs\` and I'll generate the consistency package from there.

---

## SCENE SCRIPT (beats, no dialogue track)

**0:00–0:05 — Cold open.** Silence. Parchment card fades in: *"The Descent. Palace of Gore."* Sound: distant heartbeat-pulse of gore in the walls.

**0:05–0:12 — The ambush.** Three chain devils drop from shadow alcoves along the corridor. Chains whip out of the masonry behind them. Music: low brass hit.

**0:12–0:22 — Drenwal holds the line.** He plants himself at the front. The Shield of the Hidden Lord raises. A parchment card overlays: *"The Hidden Lord's face grinned up at him. He ignored it."* He speaks — in-text only, no audio — *Word of Radiance*. A column of sunlight erupts from his position. Two chain devils recoil.

**0:22–0:34 — Aurora's True Strike.** Aurora draws the Moonbow. Slow-mo: her fingers trace a sigil along the bowstring. An arrow forms from nothing — silver starlight with a radiant corona. Parchment card: *"True Strike. The Moonkite guided her aim."* Release. The arrow crosses the corridor in one frame of blazing radiant light and punches through a chain devil's chest. Radiant burn-through.

**0:34–0:48 — Asimov in shadow.** Camera cuts to the ceiling. Asimov drops into a pool of darkness behind the last chain devil. His Soul Capacitor pulses purple. Two translucent psychic daggers materialize in his hands. Parchment card: *"From the shadow, unseen."* He steps through the chain devil's blind spot — sneak attack: both daggers drive in from behind, purple psionic light erupting through the devil's ribs.

**0:48–0:55 — Aftermath.** Chains clatter to the floor. Drenwal's radiance dims. Aurora lowers the Moonbow — silver light holding in the air a second longer. Asimov's daggers dissolve back into mist.

**0:55–1:00 — Card out.** Parchment card: *"The way to the cage was open."* Silver Moonkite sigil watermark. Hard cut to black.

---

## SHOT LIST

| # | Duration | Type | Description | Gen tool |
|---|---|---|---|---|
| 1 | 2s | Still → slow zoom | Parchment card title over blood-lacquered stone texture | Flux (still) + Resolve (zoom) |
| 2 | 3s | Motion clip | Corridor wide shot, gore-pulse lighting, empty | Kling 2.0 image-to-video |
| 3 | 2s | Motion clip | Chain devil drops from alcove, chains rattle from wall | Kling img2vid |
| 4 | 2s | Motion clip | Two more chain devils materialize flanking | Kling img2vid |
| 5 | 2s | Still → push-in | Drenwal front view, Shield raised | Flux (still) + Resolve push |
| 6 | 1s | Still | Shield of Hidden Lord close-up, Gargauth face | Flux |
| 7 | 3s | Motion clip | Word of Radiance column of sunlight erupting around Drenwal | Veo 3 (motion) |
| 8 | 2s | Motion clip | Chain devils recoil, skin smoking | Kling img2vid |
| 9 | 2s | Still → slow-mo | Aurora draws Moonbow, sigil trace on string | Flux + Resolve |
| 10 | 3s | Motion clip | Arrow materializes — silver starlight + radiant corona | Veo 3 (best for glow) |
| 11 | 1s | Still | Aurora's eyes catching the starlight | Flux |
| 12 | 2s | Motion clip | Arrow crosses corridor — radiant streak | Veo 3 |
| 13 | 2s | Motion clip | Chain devil hit — radiant punch-through, burn hole | Kling (gore permitted) |
| 14 | 2s | Motion clip | Camera tilts up to ceiling shadows | Kling img2vid |
| 15 | 2s | Motion clip | Asimov drops silently, lands in shadow pool | Kling img2vid |
| 16 | 2s | Still | Soul Capacitor pulsing, Asimov face half-lit purple | Flux |
| 17 | 2s | Motion clip | Psychic daggers materialize in both hands | Veo 3 (effects) |
| 18 | 3s | Motion clip | Asimov steps from shadow behind last chain devil | Kling img2vid |
| 19 | 2s | Motion clip | Dual-dagger strike, psionic eruption through ribs | Kling img2vid |
| 20 | 2s | Still | Chain devil collapsing, chains falling slack | Flux |
| 21 | 2s | Motion clip | Aftermath — three silhouettes in corridor, silver glow fading | Kling img2vid |
| 22 | 3s | Still → fade | Final parchment card + Moonkite sigil watermark | Flux + Resolve |

**Total:** ~22 shots, ~50 seconds of content + 10s of cards/transitions.

**Motion-clip cost at fal.ai pricing:** ~14 motion clips × $0.30 avg = ~$4.20. Still images: 15 × $0.05 = $0.75. Total gen cost: ~$5 per scene.

---

## PROMPT TEMPLATES (copy-paste into Flux / Midjourney / Kling)

Paste these as base prompts, append character ref image URL or CREF code.

**Base style suffix (append to every prompt):**
```
dark fantasy oil painting, illuminated manuscript aesthetic, cinematic lighting, rembrandt chiaroscuro, muted blood-red and silver palette, painterly texture, gold leaf accents, highly detailed, Frank Frazetta meets Greg Rutkowski meets Zdzisław Beksiński, 16:9
```

**Shot 2 — corridor wide:**
```
a dungeon corridor in Avernus, bone-rib vaulted ceiling, blood-lacquered blackite stone walls that pulse faintly red, iron braziers with cold orange flame, gore dripping from ceiling joints, dark atmosphere, deep shadows, no characters visible, {BASE}
```

**Shots 3–4 — chain devils:**
```
a kyton chain devil dropping from a shadow alcove, tall gaunt humanoid wrapped in iron chains with hooks and barbs, pale scarred flesh, a skull-hooded face, animated chains whipping out of the masonry around it, embers glowing on the chain links, terrifying, {BASE}
```

**Shot 5–6 — Drenwal with Shield:**
```
{DRENWAL_REF} a human light cleric in bronze-ink robes with solar iconography, planting his feet at the front of a corridor, raising a large round shield carved with the grinning face of a devil (the Shield of the Hidden Lord, Gargauth), warding-flare halo of golden light beginning to form around him, determined expression, {BASE}
```

**Shot 7 — Word of Radiance:**
```
{DRENWAL_REF} a column of pure sunlight erupting from a light cleric, radiant burst, golden-white rays lancing outward in a 5-foot radius, holy fire, chain devils recoiling at the edges, {BASE}
```

**Shot 9–12 — Aurora Moonbow + True Strike arrow:**
```
{AURORA_REF} an archfey warlock drawing a silver bow made of fused moonwood and celestial wand, starlight bowstring, fey cloak, silver markings on her skin, a radiant arrow materializing on the string out of pure starlight with a golden radiant corona, slow motion, atmospheric dust, {BASE}
```

**Shot 13 — chain devil hit by radiant arrow:**
```
a chain devil with a glowing radiant-burn hole punched clean through its chest, silver-gold light leaking from the wound, chains clattering, mid-fall, {BASE}
```

**Shot 15–17 — Asimov shadow + daggers:**
```
{ASIMOV_REF} an interdimensional bounty hunter soulknife rogue dropping from a ceiling shadow into a pool of darkness behind an enemy, purple psionic glow from a crystalline lamp on his belt (Soul Capacitor), two translucent purple psychic daggers materializing in his hands as smoke-like blades, mysterious, {BASE}
```

**Shot 18–19 — sneak attack:**
```
{ASIMOV_REF} the soulknife rogue driving two translucent purple psychic daggers into a chain devil's back from behind, the devil's ribs erupting with purple psionic light, radiant-psychic crit moment, {BASE}
```

**Shot 22 — closing card:**
```
an illuminated parchment page with a silver moonkite sigil watermark, aged paper, ink calligraphy slowly revealing the words "The way to the cage was open", candlelight, {BASE}
```

---

## AUDIO PLAN (no voice acting)

| Layer | Content | Source |
|---|---|---|
| Music bed | 60s dark-fantasy orchestral cue — low strings, hammered dulcimer, tense build → radiant swell at 0:22 → percussive hit at 0:48 → resolve | Suno v4 "dark fantasy orchestral D&D combat, 60 seconds, builds to radiant catharsis then resolves to silver ambience" |
| Ambient | gore-pulse heartbeat of the walls, distant chain rattles, Avernus wind | freesound.org (CC0) |
| SFX | chain drop (x3), shield raise metallic, radiant explosion whoosh, bowstring release, starlight arrow flight, radiant impact, psionic dagger materialize (glass-shatter reversed), dagger stab wet crunch, body fall, parchment page turn | freesound + ZapSplat |
| On-screen text SFX | ink-scratching for parchment cards | freesound |

**Typography for parchment cards:** IM Fell English (free, public-domain serif that reads as illuminated manuscript) — rendered in After Effects or Remotion with a handwritten-ink reveal.

---

## ASSEMBLY PIPELINE

**Tools:**
- **Flux (fal.ai)** — still keyframes with character ref
- **Kling 2.0 / Veo 3 (fal.ai)** — image-to-video motion clips
- **Suno v4** — music bed
- **DaVinci Resolve** (free) — edit, color, parchment card overlays, export
- **After Effects or Remotion** — parchment card animation templates (one-time build, reuse every scene)

**Build order:**
1. Lock character refs (from your images) — produce 1 canonical "character sheet" stills per PC via Flux (~20 min).
2. Generate all 22 shots in parallel batches (~1 hour).
3. Suno music bed — 3 variants, pick best (~15 min).
4. Sound design pass in Resolve — layer SFX on timeline (~45 min).
5. Edit to music beats — hard cuts on orchestral hits (~1 hour).
6. Parchment cards overlay with ink-reveal animations (~30 min).
7. Color grade — push blacks, warm highlights, silver-cool on Aurora shots (~20 min).
8. Export 1080p H.264, upload to YouTube/Drive.

**Total time (first time):** ~5–6 hours for 60 seconds.
**Templatized (sessions 2+):** ~2–3 hours per 60s scene.

---

## SUCCESS CRITERIA FOR v1

- Character consistency across 22 shots (same Drenwal, same Aurora, same Asimov)
- Music bed lands on the 3 combat beats (Word of Radiance / Arrow release / Dagger strike)
- Parchment cards feel integrated, not pasted-on
- No voice gap — silent-film grammar reads as *aesthetic*, not limitation
- Under $10 total gen cost

If v1 lands: roll out to full session recap, ~5 minutes, 80+ shots, ~$25 gen cost per episode, ~10h production. Then templatize and automate via Python like `shorts-generator`.

---

## WHAT I NEED FROM YOU TO START

**Received (2026-04-24):**
- ✓ Asimov portrait + 4-pose action sheet + Soul Capacitor → `refs/asimov/`
- ✓ Rasheem reference → `refs/rasheem/`
- ✓ Drenwal portrait → `refs/drenwal/`
- ✓ Drenwal backstory (see CHARACTER LORE section below)
- ✓ Aurora portrait + Whiskerbright (pearl-white cat form) → `refs/aurora/`
- ✓ Aurora prologue prose (Baldur's Gate pre-meeting POV) — candidate for v0 Prologue episode
- ✓ Quiver of Elemental Chaos spec (Griffon's Saddlebag legendary) — visual prop added

**Visual anchors locked from refs:**
- **Asimov:** hooded lean silhouette, dark coat, crouching/action poses, purple psionic smoke manifesting from hands, dark grey + deep purple palette
- **Soul Capacitor:** ornate bronze genie-lamp with crystalline purple veins, purple flame/smoke erupting from spout
- **Rasheem:** tall theatrical efreeti, elaborate dark robes, purple psionic aura, syndicate-operator / bounty-handler energy (not companion)
- **Drenwal:** human male early-30s, long brunette hair, full beard, weathered warrior-priest face, small red forehead scar. Red + ivory Hellrider robes with silver Celtic-knotwork embroidery, silver-embossed breastplate, leather spellcasting gauntlet. Radiant compass-sigil casting visual.
- **Shield of the Hidden Lord:** red-lacquered, silver diamond framework, central eye-in-sun sigil. For Gargauth-reveal beats: ink the Hidden Lord's face INTO the existing shield design rather than swapping it — keeps continuity with the reference.
- **Aurora:** astral elf — long silver-white hair, pale skin, elongated ears, green eyes, subtle silver fey-markings on cheeks. **Teal third-eye gem** on forehead with silver circlet. Diamond-shaped pale-gem earrings. High-collar olive/forest-green robe with silver embroidery and central teal pendant. Quirky-smirk baseline expression — don't sanitize it.
- **Moonbow of Celestial Warding:** bow + archfey pact-wand fused. Silver-veined moonwood limbs, bowstring of pure starlight that hums, arrows materialize as silver-gold starlight on draw.
- **Quiver of Elemental Chaos:** legendary quiver with 5-hole lid, Elemental-Plane panels on sides, 4 element buttons on top (Air/Earth/Fire/Water). Arrows visible through the lid holes with element-specific effects (ice arrow = frosted, snowflake-shedding). Worn at Aurora's hip or strapped to her back.
- **Whiskerbright:** Feywild cat in base form (opalescent pearl-white, marble-sculpted aesthetic). In Hell: **imp body with cat mannerisms** — bat wings, small horns, demonic silhouette, but stretches like a cat, tail-flicks, looks unimpressed. Play the body/soul mismatch for quiet comedy.

**Still needed:**
1. **Optional:** any existing art of the Palace of Gore corridor or chain devils — if not, I generate from scratch
2. **fal.ai API key** (or confirm swap to Runway/OpenAI)
3. **Suno account** (free tier works for v1)
4. **Green light on 60s scope** (chain-devils) — or switch to v0 Prologue (Aurora's Baldur's Gate pre-meeting, lower complexity)

Once Drenwal + Aurora refs land, I drive the full pipeline without further input until edit stage, where you pick between 2–3 music variants and approve the final cut.

---

## CHARACTER LORE (for parchment-card writing, series arc)

### Drenwal — Cleric of Helm (possibly; his faith is fragile), bearer of the Hidden Lord

**Origin:** Baldur's Gate, Dock District. Family of four.
- **Mara** — mother. Herbalist, devout follower of Helm. Kind, reserved, secretive.
- **Delryn** — father. Strict paladin, Hellrider, died "in the line of duty" when Drenwal was 14. (Truth uncertain — could have been a drunken failure, a Bhaal-cursed end, or a lie Mara protected him from.)
- **Dumal** — older brother. Left home young, never reconnected. Now confirmed **Bhaalspawn** hunting the party.

**Path:** At 14, after his father's death, Drenwal joined the clergy of Helm's Shieldhall against his mother's wishes — trying to continue the legacy. **Not built for plate** — too lean for paladin track, so he chose the clergy instead. Trained as an acolyte for a decade+. Then apprenticed to the Hellriders as a cleric. Trained as a **Watcher of the Fallen** — herbalist knowledge fused with divine magic. Proved himself on expeditions (notably curing a goblin-poisoned comrade, Mohan, who became a friend).

**Internal contradictions (the engine of his arc):**
- Fears failing his father's legacy. His skills are his armor. Doubts if it's enough.
- Dumal's disappearance haunts him. Mara will not discuss it. (Now: Dumal is a Bhaalspawn. What does that make Drenwal? What did Delryn know?)
- **Has never heard Helm's voice.** The god's presence is unquestionable to him in theory — but he has no personal contact. His faith is a facade.
- Now carries the **Shield of the Hidden Lord** — Gargauth whispers to him constantly. The only divine voice he's ever heard... is a devil's.

**Allies:**
- **Mohan** — fellow Hellrider, fanatical, loyal friend
- **Alaric** — veteran cleric of Helm, Watcher of the Fallen, father-figure mentor

**Narrative hooks (seeds for future parchment cards / scenes):**
- "A cleric of Helm, now wearing the Hidden Lord's face on his shield."
- "His father fell in the line of duty. Or so his mother told him."
- "He had never heard Helm's voice. He had heard the Shield speak, though."
- "His brother left when they were both young. He never knew why. He is beginning to suspect."

**Implications for the Mordenkainen cure ("die and be reborn in the eyes of another god"):**
The cure reframes through this backstory. The "other god" might be:
- **Lathander** — rebirth, dawn, light (Light domain aligns mechanically, symbolically, and with his mother's house of gentle faith)
- **Ilmater** — the endurer, fits his herbalist-healer nature and his mother's quieter path
- **His mother's Helm** — a cleaner version, free of his father's projection of the god
- **Gargauth** — the trap. The Hidden Lord is actively positioning.
The tension: Drenwal has never really chosen his god. He inherited Helm from his father. The cure forces a real choice — and every major NPC with a divine stake will reach for him in that heartbeat.

### Aurora "Rory" Windsnap — Astral Elf Archfey Warlock, bound to the Moonkite

**Origin:** Baldur's Gate, street-level. Astral elf with Feywild connection — "the world shimmers faintly" at the edge of her vision from constant ambient magic-sensitivity.

**Self-image:** More comfortable weaving protective wards and debating magical ethics than navigating rooms full of military brass. Quirky, slightly strange, naturally curious. *"It's just another puzzle. And I'm very good at puzzles."* That's her coping mantra.

**Pre-campaign hooks:**
- **Wardrick** stole her spellbook (unresolved pre-campaign theft)
- A **Harper agent** connected her to **Ulder Ravengard** on the premise that Ravengard could help
- Connected to **Sees-All-Colors** — a Tabaxi NPC warning of a **"frozen apocalypse"** — who ended up taking Aurora's seat at the Hellriders' council meeting (the campaign opener)
- Spellbook + cult-activity-in-Baldur's-Gate + frozen-apocalypse thread = her puzzle to solve

**Companions:**
- **Whiskerbright** — Feywild cat familiar, opalescent fur, inscrutable gaze. Currently in **imp body / cat personality** due to Avernus adaptation. Visual comedy goldmine.

**Items:**
- **Moonbow of Celestial Warding** — fused from her enchanted bow (archfey pact weapon) + Wand of Celestial Warding, completed during Moonkite rescue. Silver-starlight bowstring, arrows manifest as silver-gold light on draw.
- **Quiver of Elemental Chaos** (Griffon's Saddlebag legendary) — 5-hole lid, 4 element buttons, elemental-plane side panels. Produces Air / Earth / Fire / Water ammunition with element-specific effects.

**Role (mechanical):** sustained ranged DPS with radiant specialization. **True Strike** cantrip (2024 PHB) lets her channel weapon attack through the cantrip — on the Moonbow, this translates into radiant damage on the enchanted arrow shots.

**Arc:**
- Patron: **The Moonkite** — celestial-fey imprisoned at the Palace of Gore for decades, drained by Bitter Breath. Bond predates Aurora's birth.
- Moonkite freed, Moonbow received.
- Mount arc in progress: Moonkite recovering, may serve as mount after 2–3 long rests.
- Long-term: the Moonkite wants to **leave Avernus**. Aurora must balance the mission vs. the Moonkite's survival — it deteriorates 1 max HP/day in Avernus.

**Narrative hooks (seeds for parchment cards):**
- *"The world shimmered faintly. It always had. She was the only one who saw it."*
- *"The spellbook had been stolen. She told herself that was the worst thing that had ever happened to her. She was wrong."*
- *"Whiskerbright was unimpressed. He was always unimpressed. It was comforting."*
- *"It's just another puzzle. And I'm very good at puzzles."* (her mantra — can recur across episodes as the puzzles get worse)

### Asimov — Soulknife Rogue, interdimensional bounty hunter

**Current campaign facts:**
- **Patron/handler:** Rasheem, high-ranking operator in an **interdimensional bounty hunter syndicate**. Not a companion — an employer who pays in soul-processing upgrades via the **Soul Capacitor** (the lamp).
- Contract style: "consumed, not killed" — Rasheem values finesse
- Soul Capacitor tier: **Medium Souls** unlocked post-Bloodbath (2 slots, Psionic Surge, Soul Shiv, Memory Siphon, Soul Mask, Psionic Echo)
- Future contract seed: Rasheem hinted at a "significant" next bounty. Unseen but coming.
- Role: burst DPS, stealth, infiltration; psychic soul knife manifestation
