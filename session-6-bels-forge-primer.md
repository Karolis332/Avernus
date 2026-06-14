# Session 6 Primer — The Demon Zapper, the Ambush & Bel's Forge

**Date:** TBD &nbsp;·&nbsp; **Length:** 4–5 hours &nbsp;·&nbsp; **Party:** 3 PCs, Level 11

**The PCs**

- **Drenwal** — Light Cleric, Bhaalspawn. **Carries the Shield of the Hidden Lord (Gargauth).** The object everyone wants tonight.
- **Aurora** — Archfey Warlock. Moonkite-mounted, Moonbow of Celestial Warding. (Ring of Wishes is spent — no Wish access.)
- **Asimov** — Soulknife Rogue. Soul Capacitor + the genie Rasheem.
- **Lulu** — hollyphant companion. Her conscience is a plot lever tonight.

---

!!! howto "How to use this primer — read this first"
    **This document is two sessions of material in one file.**

    - **PART A — The Demon Zapper** is *the next session*: free the genie, get the letter, survive the ambush. Run this.
    - **PART B — Bel's Forge** is *the destination the letter unlocks*. Run it if Part A finishes early, or open it next session.

    **Navigation:** use the left sidebar to jump to any beat. The bar under the title jumps to the big landmarks. Headings light up as you scroll so you always know where you are.

    **Tags:** **[CANON]** = straight from the lorebook · **[HOMEBREW]** = our additions (Dumal, the meters, Blood Pay) · **⚔️** = combat · **🎲 DIAL** = a DM choice with no wrong answer.

---

## ▶ Run Order — the session at a glance {#run-order}

> **The whole session in one breath:** They came to free a genie and leave with a letter to Bel. They get the letter — then the genie turns on them for Drenwal's Shield, and **Dumal walks out of the smog.** They leave bleeding, but they leave with the road to Bel's Forge.

| # | Beat | ~Time | The one thing you do |
|---|---|---|---|
| 1 | **A1 · Free the genie** | 30 min | Cash in Red Ruth's method → break Ralzala's pact. (Optional: free the unicorn.) |
| 2 | **A2 · The bargain paid** | 15 min | Ralzala gives the **letter + directions**. *Hand the letter out. Let them relax.* |
| 3 | **A3 · The ambush** ⚔️ | 60–80 min | Genie lunges for the Shield → **Dumal erupts.** Three-cornered fight. |
| 4 | **A4 · Aftermath** | 20 min | Dumal exits (or dies — your dial). Unicorn's fate. Update the meters. |
| 5 | **Travel** | 10 min | 18–30 hrs to Bel's Forge. Optional 1 encounter roll. |
| 6 | **PART B · Bel's Forge** | if time | Letter softens the giant-test → bargain → the road to the Bleeding Citadel. |

**Prep checklist before you sit down:**

- [ ] Print/copy the **Letter of Introduction** as a physical handout (Beat A2).
- [ ] Decide the **Dumal Dial** (retreat vs. death) *before* initiative — see [The Dial](#the-dial).
- [ ] Have these blocks open: **Dumal**, **Ralzala the dao**, **Bone Devil**, **Unicorn**.
- [ ] Confirm the current **Bhaal / Gargauth** meter values (S5 baseline: Bhaal 50 / Gargauth 35).

---

## ▶ Where we are {#where-we-are}

### Last session — the Bone Brambles

The party fought through the night hag **Red Ruth's** thorn-warren and **killed her**. The prize: **the method to free the genie** — the dao **Ralzala**, bound by an infernal pact at the **Demon Zapper**.

> **[CANON]** Red Ruth is the one the dao believes "knows how to free it from its pact." She supplies the method — *"the dao must drink the blood of someone even less free than itself,"* or your homebrewed substitute. *(Ch. 3 DMs Resources.)*

### Why the genie matters

Ralzala is the **gatekeeper to Bel's Forge.** In exchange for freedom she gives **directions to Bel's Forge AND a letter of introduction** — the thing that turns Bel from "prove yourselves to a pit fiend" into "a known quantity." **The letter is the prize. Bel is the destination.**

### Fallen Three — progress

The three beings who each know part of the path to the **Bleeding Citadel** (where **Zariel's Sword** waits to free Elturel):

| Fallen Three | Location | Status |
|---|---|---|
| **Haruman** of the Crimson Legion | Haruman's Hill | ✅ **Killed** (1/3) — "Haruman piece" held for Blood Pay |
| **Bel**, former Archduke of Avernus | **Bel's Forge** | ◀ **DESTINATION** (needs Ralzala's letter) |
| **Olanthius**, Zariel's fallen general | Crypt of the Hellriders | ⏳ Remaining |

### The clock &nbsp;[HOMEBREW]

The Bleeding Citadel manifests on a **33-day tide.** Next window: **~15 days** out. Elturel keeps sinking.

### Threads riding in

- **Dumal the Flame Ascendant** [HOMEBREW] — Drenwal's full-ascendant Bhaalspawn brother. Last contact: the carved symbol at the Palace, *"He misses you."* **Tonight he stops watching and strikes.**
- **Bhaal / Gargauth meters** [HOMEBREW] — carry forward (S5 baseline: **Bhaal 50 / Gargauth 35**). Both the dao and Dumal pull on these.
- **The Shield of the Hidden Lord (Gargauth)** — Drenwal carries it. **This is what Ralzala betrays the party to seize.** The Shield is the hinge of the whole night.

---

## ▶ Statblock reference index

Verified live via the **Open5e MCP** (`mcp__open5e__get`) where SRD. Non-SRD entries flagged.

| Creature | Role | AC | HP | CR | Speed | Source |
|---|---|---|---|---|---|---|
| **Dumal** | The ambusher (solo boss) | 20 | 350 | 16 | 40 | [HOMEBREW] → [block](#statblock-dumal) |
| **Ralzala the dao** | Genie / betrayer | 18 | 187 | 11 | 30, burrow 30, fly 30 | **MM (non-SRD)** → [block](#statblock-ralzala) |
| **Bone Devil** | Dumal's cover | 19 | 142 | 9 | 40, fly 40 | `bone-devil` ✓ |
| **Unicorn** | The Demon Zapper | 12 | 67 | 5 | 50 | `unicorn` ✓ (radiant; fiends hate it) |
| **Bel** | Bel's Forge climax | 19 | 300 | 25 | 30, fly 60 | appendix; chassis `pit-fiend` ✓ → [block](#statblock-bel) |
| **Fire Giant** ×4 | Bel's "test" | 18 | 162 | 9 | 30 | `fire-giant` ✓ |
| **Salamander** | Forge guards | 15 | 90 | 5 | 30 | `salamander` ✓ |
| **Lemure** | Forge/Zapper slaves | 7 | 13 | 0 | 15 | `lemure` ✓ |

> The **dao** and **spined devil** are **not in the Open5e SRD** (404 confirmed). Dao supplied from the Monster Manual.

**Live at table:**

```
mcp__open5e__get    { resource_type: "monsters", slug: "bone-devil" }
mcp__open5e__get    { resource_type: "monsters", slug: "unicorn" }
mcp__open5e__get    { resource_type: "monsters", slug: "fire-giant" }
mcp__open5e__search { query: "imprisonment", resource_type: "spells" }
```

---

## ▶ Design thesis

> They came to collect a favor. Bhaal came to collect *them.*

Three things make the night land:

1. **The win is real, then it's taxed.** They *will* get the letter — withholding it makes the betrayal feel cheap. The drama is **what it costs to walk away with it.**
2. **Greed and hunger arrive together.** Canon already has Ralzala turn on them for the Shield. Fuse it with the ambush: her betrayal opens the fight, and **Dumal erupts into the chaos.**
3. **The unicorn is the out.** A trapped celestial that blasts fiends with light. Free it and the party's worst enemies — the Bone Devil, Bhaal-corrupted Dumal — become its targets. **Mercy is a weapon here.**

**Win state:** they leave with **the letter**, the unicorn's fate decided, the Shield kept (or lost — a real risk), and **Dumal's first true strike survived.**

---

# PART A — The Demon Zapper {#part-a}

## A · The location &nbsp;[CANON]

A **Demon Zapper** — a **unicorn trapped in an infernal contraption** that lures demons close and burns them with **radiant beams**. Beside it, bound by an infernal pact, waits the dao **Ralzala**: proud, disgruntled, desperate to be free — and fully intending to rob the party the moment her debt is paid.

### Read-aloud — arrival

> The plain crackles. Ahead, lashed inside a cage of black iron and humming wire, a **unicorn** stands — its horn forced upward, leashed to a lens of burning glass. Every time a demon drifts too near, the lens flares and a lance of white light burns it to ash. The unicorn's eyes are very old and very tired.
>
> Lounging in its shadow, picking ash from one fingernail, is a broad-shouldered figure of living stone and smoke. The dao smiles like a landlord who has already counted your coin.
>
> *"You came back. And you smell of hag's blood. Good — then you know the price of my pact. Pay it, little priests, and I keep my word: directions to Bel's anvil, and a letter to keep his giants off your throats. Pay it."*

---

## A1 · Free the genie

### What happens

The party delivers **the method recovered from Red Ruth** — the blood, the rite, whatever broke the infernal pact. Run it as the payoff to last session, not a fresh puzzle.

!!! mechanics "Mechanics — breaking the pact"
    - **If you want a roll:** group **DC 16 Arcana or Religion** (auto-success if they carry the literal component Red Ruth named).
    - **On failure:** the pact lashes back — **4d8 necrotic** split among the casters — then it breaks anyway. *Do not gate the session behind a die.*

### Optional — free the unicorn &nbsp;[moral + tactical hook]

Freeing the *dao* does **not** free the *unicorn*. Lulu fixates on it:

> *"It's like me. It's been here so long it's forgotten the sky. Please."*

- **To free it:** DC 15 thieves' tools / DC 18 STR on the cage, or *dispel magic* on the lens.
- **Why bother:** it arms the battlefield for the ambush — a free, fiend-hating **radiant artillery piece** (see [the unicorn wildcard](#the-unicorn-as-wildcard)).
- **[HOMEBREW] Meters:** Gargauth **−3** / Coram **+3** for the mercy. Bhaal whispers it's a waste.

---

## A2 · The bargain paid — the win

**Ralzala keeps her word first.** *(Canon: she fulfills the bargain before betraying.)* She hands over:

- 📜 **The Letter of Introduction** — sealed in stone-wax, addressed to Bel in Infernal. **Hand this out as a physical prop.** At Bel's Forge it grants **advantage on the opening Persuasion** and lets Bel **waive or soften the fire-giant test**.
- 🗺️ **Directions to Bel's Forge** — 18–30 hours across the plains.
- 💬 *Optional warning:* *"Bel hates the new queen more than he hates breathing. Offer him Zariel's throat and he'll give you anything. Beg, and he'll forge you into a doorstop."*

> **Let the table exhale here.** They got it. The letter is in Drenwal's hands. *Then the floor drops.*

---

## A3 · The ambush ⚔️ &nbsp;[HOMEBREW + canon betrayal, fused] {#ambush}

### Primary staging — betrayal into ambush &nbsp;(recommended)

The instant the letter changes hands, Ralzala's greed locks onto the **Shield of the Hidden Lord**. *(Canon: the dao betrays them "spurred on by Gargauth or simply desiring their riches.")* She lunges for it —

### Read-aloud — Dumal arrives

> *"…though, a courtesy for a courtesy, priest. That trinket on your arm — the Hidden Lord's face — I've wanted it a thousand years. I'll be having it now."*
>
> Steel rings. The unicorn screams. And the smog to the north peels open.
>
> A figure in Hellrider grey walks out of it — unhurried, smiling, a lance of dried blood in his hand. He looks at the dao the way you look at a fly in your drink.
>
> *"Den. You've been busy. Killing hags, freeing genies, running errands for devils. And this one wants to rob you. How tiresome. Step aside, stone-thing — he's mine, and you're in my light."*

### The three sides

| Side | Wants | Behavior |
|---|---|---|
| **The party** | Keep the Shield, survive | — |
| **Ralzala** | The Shield + an exit | Grab-and-flee. **Flees at <50 HP.** Fears Dumal — may bolt Round 2, or try to bargain the Shield *to* him. **Not** his ally. |
| **Dumal** | Drenwal *changed*, not dead | Lets the others bloody each other, then walks through the survivors. |

### The unicorn as wildcard

If freed in A1, it targets **fiends** each round with its horn — Bone Devil first.

!!! mechanics "Unicorn radiant beam"
    A PC can steer the lens (**DC 12**) to fire deliberately: **2d8+9 radiant**. At DM discretion the Zapper recognizes Bhaal's corruption in **Dumal** and will target him too. **Telegraph this** — it's the party's pressure valve against a CR-16 solo boss, and the cleanest way to chew through his 350 HP.

### Alternate staging — interrupted rite &nbsp;🎲

Prefer Dumal hitting *during* the freeing? He erupts in A1 before the dao is loose. Then Ralzala is a **caged wildcard** — free her mid-fight and she might help (to escape) or grab the Shield and bolt. Messier; use if your table likes chaos.

---

## A · Statblocks

### Statblock — Dumal &nbsp;[HOMEBREW boss] {#statblock-dumal}

<div class="statblock">
<div class="sb-name">Dumal of Elturel, the Flame Ascendant<span class="sb-tag">Homebrew Boss</span></div>
<div class="sb-type">Medium humanoid (Bhaalspawn), neutral evil · CR 16 (solo boss — built to threaten 3 strong level-11 PCs)</div>
<div class="sb-rule"></div>
<div class="sb-line"><span class="sb-attr">Armor Class</span> 20 (Bhaal-corrupted plate +1) — <em>22 while bloodied</em></div>
<div class="sb-line"><span class="sb-attr">Hit Points</span> 350 (28d10 + 196)</div>
<div class="sb-line"><span class="sb-attr">Speed</span> 40 ft.</div>
<div class="sb-rule"></div>
<div class="sb-abilities">
<div><div class="ab">STR</div><div class="sc">22 (+6)</div></div>
<div><div class="ab">DEX</div><div class="sc">18 (+4)</div></div>
<div><div class="ab">CON</div><div class="sc">24 (+7)</div></div>
<div><div class="ab">INT</div><div class="sc">14 (+2)</div></div>
<div><div class="ab">WIS</div><div class="sc">18 (+4)</div></div>
<div><div class="ab">CHA</div><div class="sc">20 (+5)</div></div>
</div>
<div class="sb-rule"></div>
<div class="sb-line"><span class="sb-attr">Saving Throws</span> STR +11, DEX +9, CON +12, WIS +9, CHA +10</div>
<div class="sb-line"><span class="sb-attr">Skills</span> Athletics +11, Insight +9, Intimidation +10, Perception +9</div>
<div class="sb-line"><span class="sb-attr">Damage Resistances</span> cold, fire, necrotic; bludgeoning, piercing, slashing from nonmagical attacks</div>
<div class="sb-line"><span class="sb-attr">Damage Immunities</span> poison</div>
<div class="sb-line"><span class="sb-attr">Condition Immunities</span> charmed, exhaustion, frightened, poisoned</div>
<div class="sb-line"><span class="sb-attr">Senses</span> truesight 120 ft., passive Perception 19</div>
<div class="sb-line"><span class="sb-attr">Languages</span> Common, Infernal</div>
<div class="sb-line"><span class="sb-attr">Proficiency Bonus</span> +5</div>
<div class="sb-rule"></div>
<p class="sb-entry"><strong>Legendary Resistance (3/Day).</strong> If Dumal fails a saving throw, he can choose to succeed instead.</p>
<p class="sb-entry"><strong>Magic Resistance.</strong> Dumal has advantage on saving throws against spells and other magical effects.</p>
<p class="sb-entry"><strong>Bhaal's Anchor.</strong> <em>Banishment</em>, <em>plane shift</em>, <em>imprisonment</em>, <em>wish</em>, and other reality-altering or forced-teleport magic fail against Dumal unless the caster succeeds on a DC 22 spellcasting ability check. He cannot be involuntarily removed from the battlefield. <em>(Aurora's ring is empty anyway.)</em></p>
<p class="sb-entry"><strong>Bhaal Sight.</strong> Dumal automatically senses every Bhaalspawn within 1 mile and reads their current emotional state. <em>This is why the ambush works — he felt Drenwal relax the instant the letter changed hands.</em></p>
<p class="sb-entry"><strong>Hunger Pact.</strong> Dumal needs no air, food, drink, or sleep. Whenever he reduces a creature to 0 hit points, he regains 30 hit points and one expended use of Bhaal's Whisper.</p>
<div class="sb-phase"><strong>Avatar of Slaughter (Bloodied).</strong> While Dumal has 175 hit points or fewer, Bhaal floods him: his AC rises by 2, he makes one extra attack on his Multiattack, and each of his weapon hits deals an extra 9 (2d8) necrotic damage. The smoke around him turns red and begins to scream.</div>
<div class="sb-section">Actions</div>
<p class="sb-entry"><strong>Multiattack.</strong> Dumal makes three Lance of Bhaal attacks. He can replace one with a Ritual Dagger attack, or with Bhaal-Marked Strike when it is available. <em>(Four attacks while bloodied.)</em></p>
<p class="sb-entry"><strong>Lance of Bhaal.</strong> <em>Melee Weapon Attack:</em> +11 to hit, reach 10 ft., one target. <em>Hit:</em> 13 (1d12 + 6) piercing plus 13 (3d8) necrotic. If this reduces the target to 0 hit points, Dumal triggers Hunger Pact.</p>
<p class="sb-entry"><strong>Ritual Dagger.</strong> <em>Melee Weapon Attack:</em> +11 to hit, reach 5 ft., one target. <em>Hit:</em> 9 (1d6 + 6) piercing plus 9 (2d8) necrotic. On a critical hit against a humanoid, Dumal carves a permanent Bhaal symbol into the wound (removable with <em>remove curse</em>).</p>
<p class="sb-entry"><strong>Bhaal-Marked Strike (Recharge 5–6).</strong> Dumal makes one Lance of Bhaal attack. On a hit, the target must succeed on a DC 18 Constitution saving throw or take an extra 36 (8d8) necrotic damage and gain the <strong>Bhaal Mark</strong> (disadvantage on saving throws against Dumal's effects for 24 hours). <strong>Drenwal automatically fails this save.</strong> <em>Play it for horror, not the numbers.</em></p>
<p class="sb-entry"><strong>Slaughter Nova (Recharge 6).</strong> Bhaal's hunger erupts in a 20-foot-radius sphere centered on Dumal. Each other creature in the area makes a DC 18 Dexterity saving throw, taking 45 (10d8) necrotic damage on a failure or half as much on a success. A creature reduced to 0 hit points by this can't be stabilized for 1 minute. <em>His answer to being surrounded.</em></p>
<p class="sb-entry"><strong>Bhaal Smoke (1/Day).</strong> Dumal fills a 30-foot cube within 5 ft. of him with screaming red smoke. The area is heavily obscured to everyone but Dumal, who moves through it freely. It lasts 2 rounds. <strong>His exit tool.</strong></p>
<div class="sb-section">Bonus Actions</div>
<p class="sb-entry"><strong>Bhaal's Whisper.</strong> Dumal speaks one sentence to a creature he can see within 60 ft. The target must succeed on a DC 18 Wisdom saving throw or be frightened of him until the end of its next turn. <strong>Drenwal auto-fails unless he spent his previous turn praying to a non-Bhaal god.</strong></p>
<p class="sb-entry"><strong>Blood Step.</strong> Dumal moves up to his speed without provoking opportunity attacks. If he ends his move adjacent to a creature, he makes one Ritual Dagger attack against it. <em>(Lets him reach the backline or run down Aurora's mount.)</em></p>
<div class="sb-section">Reactions</div>
<p class="sb-entry"><strong>Murderous Riposte.</strong> When a creature Dumal can see within 10 ft. hits him with a melee attack, he makes one Lance of Bhaal attack against that creature.</p>
<p class="sb-entry"><strong>Bhaal's Refusal (1/Day).</strong> When an effect would move Dumal against his will, banish him, or incapacitate him, he ends that effect on himself before it takes hold.</p>
<div class="sb-section">Legendary Actions</div>
<p class="sb-entry">Dumal can take 3 legendary actions, choosing from the options below. Only one legendary action can be used at a time, and only at the end of another creature's turn. He regains spent legendary actions at the start of his turn.</p>
<p class="sb-entry"><strong>Step (Costs 1).</strong> Dumal moves up to half his speed without provoking opportunity attacks.</p>
<p class="sb-entry"><strong>Bhaal's Hand (Costs 1).</strong> A spectral red hand claws a point Dumal can see within 30 ft.: +10 to hit, one target, 9 (2d8) necrotic damage, and the target is grappled (escape DC 18).</p>
<p class="sb-entry"><strong>Lance (Costs 2).</strong> Dumal makes one Lance of Bhaal attack.</p>
<p class="sb-entry"><strong>Reaping Arc (Costs 2).</strong> Each creature within 10 ft. of Dumal makes a DC 18 Dexterity saving throw or takes 14 (4d6) slashing-and-necrotic damage.</p>
<p class="sb-entry"><strong>Sibling Strike (Costs 3, only vs. Drenwal).</strong> Dumal makes one Lance of Bhaal attack against Drenwal with advantage. On a hit, Drenwal hears Dumal narrating his every move mockingly for 1 hour after combat (roleplay only). <strong>Bhaal +5</strong> if it lands.</p>
<div class="sb-rule"></div>
<p class="sb-entry"><strong>Last Rites (if the Dial = death).</strong> When Dumal drops to 0 hit points, Bhaal's claim detonates: each creature within 20 ft. takes 28 (8d6) necrotic damage (DC 18 Dexterity save for half) as a pillar of red light tears him out of the world.</p>
</div>

### Statblock — Ralzala the dao &nbsp;(Monster Manual; non-SRD) {#statblock-ralzala}

<div class="statblock">
<div class="sb-name">Ralzala the Dao<span class="sb-tag">MM · non-SRD</span></div>
<div class="sb-type">Large elemental (genie, dao), neutral evil · CR 11</div>
<div class="sb-rule"></div>
<div class="sb-line"><span class="sb-attr">Armor Class</span> 18 (natural armor)</div>
<div class="sb-line"><span class="sb-attr">Hit Points</span> 187 (15d10 + 105)</div>
<div class="sb-line"><span class="sb-attr">Speed</span> 30 ft., burrow 30 ft., fly 30 ft. (hover)</div>
<div class="sb-rule"></div>
<div class="sb-abilities">
<div><div class="ab">STR</div><div class="sc">23 (+6)</div></div>
<div><div class="ab">DEX</div><div class="sc">12 (+1)</div></div>
<div><div class="ab">CON</div><div class="sc">24 (+7)</div></div>
<div><div class="ab">INT</div><div class="sc">14 (+2)</div></div>
<div><div class="ab">WIS</div><div class="sc">13 (+1)</div></div>
<div><div class="ab">CHA</div><div class="sc">16 (+3)</div></div>
</div>
<div class="sb-rule"></div>
<div class="sb-line"><span class="sb-attr">Saving Throws</span> INT +6, WIS +5, CHA +7</div>
<div class="sb-line"><span class="sb-attr">Senses</span> darkvision 120 ft., passive Perception 11</div>
<div class="sb-line"><span class="sb-attr">Languages</span> Terran</div>
<div class="sb-rule"></div>
<p class="sb-entry"><strong>Elemental Demise.</strong> If Ralzala dies, her body disintegrates into a pile of her equipment.</p>
<p class="sb-entry"><strong>Earth Glide.</strong> She can burrow through nonmagical earth and stone without disturbing it.</p>
<p class="sb-entry"><strong>Sure-Footed.</strong> Advantage on Strength and Dexterity saving throws against being knocked prone.</p>
<p class="sb-entry"><strong>Innate Spellcasting.</strong> Spellcasting ability is Charisma (save DC 15). <em>At will:</em> detect evil and good, detect magic, stone shape. <em>3/day each:</em> passwall, move earth, tongues. <em>1/day each:</em> conjure elemental (earth only), gaseous form, invisibility, phantasmal killer, plane shift, wall of stone.</p>
<div class="sb-section">Actions</div>
<p class="sb-entry"><strong>Multiattack.</strong> Ralzala makes two fist attacks or two maul attacks.</p>
<p class="sb-entry"><strong>Fist.</strong> <em>Melee Weapon Attack:</em> +10 to hit, reach 5 ft., one target. <em>Hit:</em> 12 (2d6 + 6) bludgeoning damage.</p>
<p class="sb-entry"><strong>Maul of the Dao.</strong> <em>Melee Weapon Attack:</em> +10 to hit, reach 5 ft., one target. <em>Hit:</em> 17 (3d6 + 6) bludgeoning damage, and the target must succeed on a DC 18 Strength saving throw or be knocked prone.</p>
</div>

!!! homebrew "Ralzala's betrayal behavior"
    She isn't fighting a war — she wants the **Shield** and an exit. Grab-and-**earth-glide**, go **invisible/gaseous** to disengage, **flees below ~50 HP**. If she pries the Shield off Drenwal (contested STR / disarm ruling), she's gone underground with it → instant future quest (chase the dao to recover Gargauth's prison). With Dumal present, she fears him more than she wants the loot → likely bolts Round 2.

### Statblock — Bone Devil &nbsp;(`bone-devil` ✓)

<div class="statblock">
<div class="sb-name">Bone Devil<span class="sb-tag">SRD ✓</span></div>
<div class="sb-type">Large fiend (devil), lawful evil · CR 9</div>
<div class="sb-rule"></div>
<div class="sb-line"><span class="sb-attr">Armor Class</span> 19 (natural armor)</div>
<div class="sb-line"><span class="sb-attr">Hit Points</span> 142 (15d10 + 60)</div>
<div class="sb-line"><span class="sb-attr">Speed</span> 40 ft., fly 40 ft.</div>
<div class="sb-rule"></div>
<div class="sb-abilities">
<div><div class="ab">STR</div><div class="sc">18 (+4)</div></div>
<div><div class="ab">DEX</div><div class="sc">16 (+3)</div></div>
<div><div class="ab">CON</div><div class="sc">18 (+4)</div></div>
<div><div class="ab">INT</div><div class="sc">13 (+1)</div></div>
<div><div class="ab">WIS</div><div class="sc">14 (+2)</div></div>
<div><div class="ab">CHA</div><div class="sc">16 (+3)</div></div>
</div>
<div class="sb-rule"></div>
<div class="sb-line"><span class="sb-attr">Saving Throws</span> INT +5, WIS +6, CHA +7</div>
<div class="sb-line"><span class="sb-attr">Skills</span> Deception +7, Insight +6</div>
<div class="sb-line"><span class="sb-attr">Damage Resistances</span> cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered</div>
<div class="sb-line"><span class="sb-attr">Damage Immunities</span> fire, poison</div>
<div class="sb-line"><span class="sb-attr">Condition Immunities</span> poisoned</div>
<div class="sb-line"><span class="sb-attr">Senses</span> darkvision 120 ft., passive Perception 12</div>
<div class="sb-line"><span class="sb-attr">Languages</span> Infernal, telepathy 120 ft.</div>
<div class="sb-rule"></div>
<p class="sb-entry"><strong>Devil's Sight.</strong> Magical darkness doesn't impede the devil's darkvision.</p>
<p class="sb-entry"><strong>Magic Resistance.</strong> Advantage on saving throws against spells and other magical effects.</p>
<div class="sb-section">Actions</div>
<p class="sb-entry"><strong>Multiattack.</strong> The bone devil makes two claw attacks and one sting attack.</p>
<p class="sb-entry"><strong>Claw.</strong> <em>Melee Weapon Attack:</em> +8 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage.</p>
<p class="sb-entry"><strong>Sting.</strong> <em>Melee Weapon Attack:</em> +8 to hit, reach 10 ft., one target. <em>Hit:</em> 13 (2d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned for 1 minute.</p>
<div class="sb-phase"><strong>At the table.</strong> Flies — use the vertical axis. Drops from the smog on Round 1 onto the highest-damage PC, then covers Dumal's exit.</div>
</div>

---

## A · Dumal's combat doctrine

1. **Round 1 — the walk.** He lets the dao and party tangle. The Bone Devil drops from the smog onto the highest-damage PC. Dumal advances (40 ft.), opens with **Bhaal's Whisper** on Drenwal, and burns legendary actions on **Step** + **Bhaal's Hand** to pin a backliner. He is in no hurry — let the dread build.
2. **Round 2 — first blood.** He reaches Drenwal and leads with **Bhaal-Marked Strike** → the Mark. *"Stop pretending, Den."* Then Multiattack (three Lances) on whoever is closest. **Murderous Riposte** punishes the first melee PC who lands on him.
3. **Round 3+ — the grind.** Surrounded? **Slaughter Nova.** He will **ritual-kill the dao, a lemure, or a downed PC** to heal **30** and make a point. **Blood Step** runs down Aurora's mount or the healer. Sibling Strike whenever the legendary actions are free.
4. **Bloodied (≤175 HP) — Avatar of Slaughter.** This is the gear change that makes him *feel* like a god's champion: **+2 AC, a fourth attack, +2d8 necrotic on every hit,** the smoke screaming red. Lean into the escalation out loud.
5. **At 25% HP (≤88) — the exit.** If the **Dial = retreat:** **disengage → Bhaal Smoke → Bone Devil covers → gone.** If the **Dial = death:** he fights to 0 and **Last Rites** detonates. Decide which *before* initiative.

**Parting line:**

> *"You kept the Hidden Lord's face and you kept your own. For now. Bring both to Bel — I'll be interested to see which one he bargains with."*

---

## The Dial — does Dumal die? &nbsp;🎲 [DM choice] {#the-dial}

!!! dial "Pick this BEFORE initiative — don't waffle mid-fight"
    **Default — No (recommended).** Bhaal extracts him at 0 HP (a column of red light, screaming faces) → **Bhaal +15** (a debt owed). The arc continues to Sessions 7–9.

    **If you want it to END here.** You asked for the ambush — so let it pay off if they earn it. Bhaal *abandons a failed instrument* with contempt; Drenwal feels the brother-link snap like a tendon; **Bhaal's Claim drops 20**; and the **Senna** thread (the third sibling) becomes the party's to chase instead of Dumal's.

    Both are good stories. Commit before you roll.

---

## A · Influence triggers &nbsp;[HOMEBREW]

| Trigger | Meter | Δ |
|---|---|---|
| Free the trapped **unicorn** | Gargauth **−3**, Coram **+3** | mercy the Shield hates |
| Let Dumal land **Sibling Strike** | Bhaal **+5** | the brother-hook deepens |
| Drenwal **rages / kills with Bhaal hunger** | Bhaal **+6** | feeds the Claim |
| Party **loses the Shield** to the dao | Gargauth **−10** | the Hidden Lord is *furious*, leash slackens — new quest opens |
| Drive Dumal off **without** Drenwal landing the kill | Bhaal **−4** | restraint denies the god a debt |
| **Dumal dies** (the Dial) | Bhaal **−20** | god abandons a failed instrument |
| Ritual-kill witnessed (Dumal heals on a kill) | Bhaal **+3** | Drenwal sees what he could become |

---

## A4 · Aftermath

- **The unicorn:** freed → it bows to Lulu and flees toward the few clean winds in Avernus (a future ally seed). Still caged → it dies when the Zapper is wrecked, and Lulu grieves (Gargauth +2 if they left it).
- **The dao:** fled with or without the Shield. If she took it → the **chase-the-dao** quest is live. If she died → her equipment pile may hold a soul coin or two.
- **Dumal:** gone or dead per the Dial. **Update the meters now** before you forget.
- **In hand:** Ralzala's **letter + directions to Bel's Forge.** On to Part B.

---

# PART B — Bel's Forge {#part-b}

> Run now if Part A wrapped fast, or open **next** session here. The letter is what makes this scene land *soft* instead of *deadly.*

**Travel:** 18–30 hrs across the Plains of Avernus [CANON]. Optional 1 roll on the S5 Avernus encounter table.

## B · The location &nbsp;[CANON]

A **colossal furnace-fortress** over a lake of magma where **Bel forges infernal weapons and war machines**, fueled by magma and damned souls. Guards: **fire giants** (smiths/enforcers), **salamanders** (tending metal), **lemure slaves** at the bellows.

Bel — **former Lord of Avernus**, the pit fiend who **cut off Zariel's hand** — now serves as Zariel's warlord and **hates her** with a thousand years of patience.

### Read-aloud — approach

> A fortress the size of a city squats over a wound in the world — a lake of magma feeding a thousand chimneys, the clang of hammers rolling across the plain like a slow heartbeat. Chains of pale weeping things turn the great bellows. Fire giants the height of siege towers work the anvils without looking up.
>
> On a throne of cooling iron sits something that used to own all of this — and intends to again. It watches you with the patience of a creature that has already read the letter you carry.

---

## B1 · The test — four fire giants

[CANON] Bel tests the party with **four fire giants** to see if they're worth his breath, and **may intervene before any giant dies.**

!!! mechanics "Running the test"
    - **With Ralzala's letter:** Bel reads it and **waives the test** (or reduces it to one giant "for form's sake"). The letter is a literal fast-pass — reward it. Want a fight anyway? Run **2 giants** and call it the instant a PC is bloodied.
    - **Without the letter:** full canon test. 4× **Fire Giant** (AC 18, 162 HP, greatsword +11 / 28, rock +11 / 29). **Stop the moment a giant drops OR a PC hits 0** → *"Enough. You'll do."*
    - **Terrain:** magma channels = shove for **3d6 fire**. Giants are **fire-immune** — don't let players waste fireballs.

---

## B2 · The bargain with Bel

Bel is **articulate, cold, transactional** — a weapons-foundry CEO who used to be a head of state. **Truesight 120 ft.:** he sees Asimov coming, sees through Aurora's illusions, knows the instant anyone lies.

### What Bel wants &nbsp;[CANON]

The **adamantine control rods** of the **Wrecked Flying Fortress** — leverage against Zariel. He'll send them to the **Sibriex** (knows the rods' location) or straight to the **Arches of Ulloch** (teleport gate). Or simply: a promise to **move against Zariel.**

### The lever &nbsp;[CANON]

**DC 18 Persuasion** cuts his demands to **a single favor.** **With the letter: advantage** (or auto-success on a good pitch):

> *"Every move you ask of us is a knife in Zariel's back — why make us run errands?"*

### What Bel gives

- The campaign-critical reveal: **the Arches of Ulloch are the ONLY way to the Bleeding Citadel** (Asmodeus hid it).
- A **warning:** Zariel will *sense* their moves against her.

### Bel reads the party

- **Drenwal:** *"There's a slaughter-god in your marrow, little priest. I can smell it cooking."* He treats Bhaal as a loud, stupid neighbor — which unnerves Drenwal more than fear would. If Dumal survived Part A: *"And your brother's been sniffing at my plains. Keep your family feud off my anvil."*
- **The Shield:** with truesight he **sees Gargauth** — *"You carry a prisoner on your arm. Be careful which exile you trust."* (If the dao took it: *"You smell of the Hidden Lord but I see no shield. Careless."*)
- **Asimov:** clocks the Soul Capacitor instantly — *"You eat souls and keep the receipts. We should talk, thief, when your friends aren't listening."* (Rasheem / future-bounty hook.)

---

## B3 · The onward path

```
BEL ──(yes)──► needs CONTROL RODS ──► SIBRIEX (DC 17 CHA, may lie) ──► ARCHES OF ULLOCH
                                            │                                  │
                                            └──► WRECKED FLYING FORTRESS ◄──────┘
                                                 (6 vrocks, bone whelks,
                                                  necromantic remorhaz — get rods)
                                                          │
                                                          ▼
                                    BACK TO BEL ──► BLEEDING CITADEL  (or skip via the Arches)
```

**Pacing:** you won't reach the Sibriex/Fortress this session. End on the bargain struck and the Arches named.

---

## Statblock — Bel &nbsp;(book appendix; OCR HP corrected) {#statblock-bel}

!!! danger "Combat is a consequence, not a plan"
    Only if the party turns the Forge hostile (swings first, kills a giant after "Enough", attacks the throne). Bel is **CR 25** — he fights to **expel, not kill** (a TPK in his Forge is wasted leverage against Zariel).

<div class="statblock">
<div class="sb-name">Bel, Warlord of Avernus<span class="sb-tag">Appendix · CR 25</span></div>
<div class="sb-type">Large fiend (devil), lawful evil · CR 25</div>
<div class="sb-rule"></div>
<div class="sb-line"><span class="sb-attr">Armor Class</span> 19 (natural armor)</div>
<div class="sb-line"><span class="sb-attr">Hit Points</span> 300 (24d10 + 168)</div>
<div class="sb-line"><span class="sb-attr">Speed</span> 30 ft., fly 60 ft.</div>
<div class="sb-rule"></div>
<div class="sb-abilities">
<div><div class="ab">STR</div><div class="sc">28 (+9)</div></div>
<div><div class="ab">DEX</div><div class="sc">14 (+2)</div></div>
<div><div class="ab">CON</div><div class="sc">26 (+8)</div></div>
<div><div class="ab">INT</div><div class="sc">25 (+7)</div></div>
<div><div class="ab">WIS</div><div class="sc">19 (+4)</div></div>
<div><div class="ab">CHA</div><div class="sc">26 (+8)</div></div>
</div>
<div class="sb-rule"></div>
<div class="sb-line"><span class="sb-attr">Saving Throws</span> DEX +10, CON +16, WIS +12</div>
<div class="sb-line"><span class="sb-attr">Skills</span> Arcana +14, Deception +15, Insight +11, Persuasion +15</div>
<div class="sb-line"><span class="sb-attr">Damage Resistances</span> cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered</div>
<div class="sb-line"><span class="sb-attr">Damage Immunities</span> fire, poison</div>
<div class="sb-line"><span class="sb-attr">Condition Immunities</span> poisoned</div>
<div class="sb-line"><span class="sb-attr">Senses</span> truesight 120 ft., passive Perception 14</div>
<div class="sb-line"><span class="sb-attr">Languages</span> Infernal, telepathy 120 ft.</div>
<div class="sb-rule"></div>
<p class="sb-entry"><strong>Fear Aura.</strong> Any creature hostile to Bel that starts its turn within 20 ft. of him must succeed on a DC 23 Wisdom saving throw or be frightened until the start of its next turn.</p>
<p class="sb-entry"><strong>Magic Resistance.</strong> Advantage on saving throws against spells and other magical effects.</p>
<p class="sb-entry"><strong>Magic Weapons.</strong> Bel's weapon attacks are magical.</p>
<p class="sb-entry"><strong>Legendary Resistance (3/Day).</strong> If Bel fails a saving throw, he can choose to succeed instead.</p>
<p class="sb-entry"><strong>Innate Spellcasting.</strong> Spellcasting ability is Charisma (save DC 23). <em>At will:</em> detect magic, fireball. <em>3/day each:</em> dispel magic, hold monster, mirror image, mislead, raise dead, teleport, wall of fire. <em>2/day each:</em> imprisonment, meteor swarm.</p>
<div class="sb-section">Actions</div>
<p class="sb-entry"><strong>Multiattack.</strong> Bel makes two greatsword attacks and one tail attack.</p>
<p class="sb-entry"><strong>Greatsword.</strong> <em>Melee Weapon Attack:</em> +16 to hit, reach 10 ft., one target. <em>Hit:</em> 23 (4d6 + 9) slashing damage plus 21 (6d6) fire damage.</p>
<p class="sb-entry"><strong>Tail.</strong> <em>Melee Weapon Attack:</em> +16 to hit, reach 15 ft., one target. <em>Hit:</em> 25 (3d10 + 9) bludgeoning damage, and the target must succeed on a DC 23 Constitution saving throw or be stunned until the end of its next turn.</p>
<div class="sb-section">Legendary Actions</div>
<p class="sb-entry">Bel can take 3 legendary actions, choosing from the options below. Only one can be used at a time, and only at the end of another creature's turn. He regains spent legendary actions at the start of his turn.</p>
<p class="sb-entry"><strong>Cast a Spell (Costs 1).</strong> Bel casts fireball.</p>
<p class="sb-entry"><strong>Tactical Edge (Costs 2).</strong> Bel picks an ally he can see; that ally rolls a d6 and subtracts the result from the next attack roll made against it or Bel before Bel's next turn.</p>
<p class="sb-entry"><strong>Summon Ice Devil (Costs 3).</strong> Bel summons an ice devil in an unoccupied space within 60 ft.; it acts as his ally.</p>
<div class="sb-phase"><strong>Doctrine.</strong> Bel fights to <strong>expel, not kill</strong> — a TPK in his Forge wastes his leverage against Zariel. He opens with meteor swarm or wall of fire to make a point, then re-offers terms. He stabilizes downed PCs and has them dragged out.</div>
</div>

**Supporting:** Fire Giant ×4 (above) · Salamander (AC 15 / HP 90 / CR 5, **Heated Body** 2d6 fire on melee, tail grapple DC 14, **vuln. cold**).

---

## B · Loot

- **An infernal weapon forged to order** (DM pick from *Infernal Weapons* / *Vault of Magic*) — soul-fueled greatsword, or a weapon that ignores fire resistance. Price: a **soul coin** or a **future favor**, not gold.
- **1d4 soul coins** for a real service.
- **Intel (free with the bargain):** Arches of Ulloch location + Wrecked Flying Fortress approach.
- **[HOMEBREW] Blood Pay:** Bel's blood (a former archduke's) is a top-tier Bleeding Citadel component — he'll **never** give it willingly (CR 25). Plant the want; a *gifted vial* as a down-payment is a generous DM call.

---

# Reference {#reference}

## Mid-session request protocol

Paste any of these for a seconds-fast reply:

- `quick statblock: <creature>` → table-ready (Open5e-verified live)
- `dumal line: <situation>` / `bel line: <situation>` / `dao line: <situation>` → in-voice dialogue
- `ruling: <edge case>` → fast defensible call + the RAW behind it
- `tracker: <event>` → which meter moves, by how much
- `lore: <topic>` → canon on the Demon Zapper / Bel / Zariel / Avernus
- `scale: <±PCs / difficulty>` → re-tuned encounter math

Live lookups: `mcp__open5e__get / search / rag_search`. Spell slugs `srd-2024_<name>` or bare; monster slugs plain kebab (`bone-devil`, `fire-giant`, `unicorn`).

## The two lines to remember

> **Bhaal didn't send Dumal to kill Drenwal.** He sent him to remind Drenwal what he is — at the exact moment Drenwal felt clever.

> **Bel doesn't want a fight.** He wants Zariel to lose. The letter says you might help with that.
