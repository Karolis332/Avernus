# BITTER BREATH -- THE PALACE OF GORE
## A Three-Phase Boss Encounter for 3 Level 11 PCs

---

## DESIGN PHILOSOPHY

This encounter is built on six ingredients:

1. **The Meat** -- Bitter Breath as a multi-phase boss. Each phase is a different fight with different stat priorities, tactics, and personality.
2. **The Potatoes** -- Two lieutenants. A tank (Gorewarden Thakk, hobgoblin warlord) and a harasser (the Barbed Consort). They make the boss more dangerous, not just add HP to the room.
3. **The Veggies** -- Hobgoblin mooks. 1-HP minions (4e style). Flat 8 damage on hit. Roll only to hit. Reinforcement waves from the barracks door (secondary objective: seal it).
4. **The Wine** -- Three environments across three phases. Throne Room, the Descent, the Cage Chamber. Each changes the tactical map.
5. **The Sauce** -- Two ticking clocks. The Moonkite is dying (if they stall, it dies). Dumal is approaching (they cannot long rest after this).
6. **The Garnish** -- Mythic Phase. When Bitter Breath drops to 0 HP in Phase 2, he grabs the Moonkite's chains and absorbs celestial energy. HP resets. New abilities. The fight changes completely.

**Secondary objectives** are baked into each phase. Monster abilities are linked to destroyable objects in the environment. Players always have choices beyond "hit the boss."

**Spotlight design:**
- Asimov (Rogue): Stealth approaches, chain lockpicking, climbing the boss in Phase 3, the killing blow opportunity
- Aurora (Warlock): Moonkite connection, wand resonance against chains, the emotional payoff
- Drenwal (Cleric): Religion checks to purify chains, Bhaal temptation moments, Radiance of the Dawn against mooks, the moral weight

**Dialogue evolves at HP thresholds.** Bitter Breath is cold at 100%, angry at 75%, desperate at 50%, manic at 25%, silent at death.

---

## ENCOUNTER OVERVIEW

| Phase | Location | HP Pool | Enemies | Goal |
|-------|----------|---------|---------|------|
| **1: The Throne of Gore** | Throne Room | 280-140 (Bloodied) | Bitter Breath + Gorewarden Thakk + Barbed Consort + 6 mooks | Kill the lieutenants, destroy the Gore Throne (removes aura boost), seal the barracks door |
| **Intermission** | The Descent | -- | Skill challenge + RP | Chase Bitter Breath down the spiral, short rest opportunity, Bhaal vision |
| **2: The Siphon** | Cage Chamber | 140-0 | Bitter Breath (empowered by chains) + Chain Devil + 2 maw demons | Destroy the siphon chains (removes his regen), protect the Moonkite |
| **3: Stolen Starlight** | Cage Chamber (transformed) | 140 (reset) | Bitter Breath Ascendant (new abilities) | DPS race. Kill him before the Moonkite dies. Aurora can stabilize the Moonkite (costs her action). |

**Total HP across all phases:** 280 + 140 = 420 effective HP (but split across distinct fights with intermission, so it never feels like a slog).

**Estimated duration:** 2-2.5 hours total (Phase 1: 45 min, Intermission: 15 min, Phase 2: 30 min, Phase 3: 30-45 min).

---

## PRE-FIGHT: THE APPROACH

The party has entered the Palace of Gore through whichever route they chose (drainage tunnel, deception, or assault). They've dealt with (or bypassed) the lower-level maw demons and traps. Captain Grozz has been encountered (or not). They're now approaching the Throne Room.

**Read aloud as they reach the Throne Room entrance:**

> The passage opens into a vaulted chamber of fused bone and blackite stone. The ceiling is 30 feet high, ribbed with what look like the spines of enormous creatures. Gore drips from the joints -- not leaking. Pulsing. Like the building has a heartbeat.
>
> At the far end, on a throne of fused weapons and shattered shields, sits a figure smaller than you expected. Lean. Coiled. Horns swept back like blades. He's not lounging -- he's perched. Ready. One clawed hand rests on the armrest. The other holds a curved gutting blade, turning it slowly.
>
> Six hobgoblins in crude plate stand in formation before the throne. To the left, a massive hobgoblin in spiked full plate -- bigger than the others, scarred, gripping a tower shield and a cleaver. To the right, a barbed devil hangs from the ceiling by its own spines, flames licking between its claws.
>
> The figure on the throne looks up. His eyes are yellow. His voice is quiet.
>
> *"You smell like my brother's blood."*
>
> *"Sit down. I want to hear how he screamed."*

**If they attacked Smiler:** Add -- a crude message is carved into the wall near the entrance: "THE SMILER SENDS HIS REGARDS." Bitter Breath knew they were coming. No surprise round.

**If they freed Grozz:** Only 2 mooks instead of 6. Gorewarden Thakk is visibly agitated (he killed two deserters already).

---

## PHASE 1: THE THRONE OF GORE

### The Map

```
                    [BARRACKS DOOR]
                         |
                    [ MOOK SPAWN ]
                         |
   [PILLAR]                          [PILLAR]
      |                                  |
   [BARBED CONSORT                 [GOREWARDEN
    hangs from ceiling]              THAKK]
      |                                  |
   [BLOOD POOL]    [THRONE]    [BLOOD POOL]
   (difficult       raised      (difficult
    terrain)       platform      terrain)
                   5 ft up
      |                                  |
   [PILLAR]                          [PILLAR]
      |                                  |
   [  MOOK  ] [  MOOK  ] [  MOOK  ]
   [  MOOK  ] [  MOOK  ] [  MOOK  ]
      |                                  |
              [ ENTRANCE ]
```

**Key terrain:**
- **Gore Throne** -- Raised 5-ft platform. Bitter Breath starts here. The throne amplifies his Aura of Rot from 15 ft to **30 ft** while he's within 10 ft of it. **Destroying the throne** (AC 15, 40 HP, immune to poison/necrotic) shrinks the aura back to 15 ft. The throne visibly pulses with sickly energy -- describe it so players notice.
- **Blood pools** -- Two 10-ft pools of congealed blood. Difficult terrain. Creatures ending their turn in a pool take 1d6 necrotic.
- **Bone pillars** -- Four load-bearing pillars. Provide half cover. Can be destroyed (AC 14, 30 HP) but doing so causes ceiling debris (10-ft radius, DC 14 Dex, 2d10 bludgeoning) and opens sight lines.
- **Barracks door** -- Reinforced iron door in the back wall. Every 2 rounds (initiative 20), 1d4 hobgoblin mooks pour through. **Sealing the door** requires: DC 17 Athletics to bar it, DC 16 Thieves' Tools to jam the lock, or dealing 30 damage to collapse the frame. Once sealed, no more mooks.

### Enemies: Phase 1

**Bitter Breath** -- Uses his existing stat block. AC 19, HP 280. See full stat block in `bitter-breath-statblock.md`. In Phase 1, he fights tactically from the throne platform, using Rotten Breath to open and Skirmisher to reposition behind his lieutenants.

**Gorewarden Thakk** (Hobgoblin Warlord / Tank Lieutenant)

> *A wall of scarred muscle in spiked plate. His tower shield is bolted to his left arm -- it can't be disarmed because it IS the arm. He doesn't speak. He grunts. He positions himself between you and Bitter Breath like a living barricade.*

- AC 20 (spiked plate + shield), HP 90, Speed 30 ft.
- STR 18 (+4), DEX 12 (+1), CON 16 (+3), INT 10 (+0), WIS 14 (+2), CHA 8 (-1)
- **Shield Wall.** While Thakk is within 5 ft of Bitter Breath, attacks against Bitter Breath have disadvantage. Thakk can use his reaction to redirect one attack that hits Bitter Breath to himself instead.
- **Tactical Shove.** Bonus action. One creature within 5 ft makes DC 14 Str save or is pushed 10 ft and knocked prone. (Pushes PCs into blood pools or away from Bitter Breath.)
- **Multiattack.** Two cleaver attacks. *Melee:* +7 to hit, 1d10+4 slashing. On hit, Thakk can move 5 ft toward a creature without provoking opportunity attacks (herding PCs).
- **Martial Advantage.** Once per turn, +2d6 damage if an ally is within 5 ft of the target.
- **Phalanx Command (Recharge 5-6).** Bonus action. All hobgoblin mooks within 30 ft can use their reaction to move half their speed and make one attack.
- **Death trigger:** When Thakk dies, Bitter Breath snarls: *"Useless. Like all of them."* The remaining mooks make a DC 12 WIS save or become frightened of Bitter Breath for 1 round (they scatter, break formation -- opens him up).

**The Barbed Consort** (Barbed Devil / Ranged Harasser Lieutenant)

> *It hangs from the ceiling by its own barbs, swaying slightly, flames pooling in its palms. It watches the party with cold calculation. When it speaks, its voice is like tearing metal.*
>
> *"The master doesn't wish to be disturbed."*

- AC 15, HP 110, Speed 30 ft (ceiling climb 30 ft)
- Uses standard Barbed Devil stat block with one addition:
- **Hellfire Sniper.** While on the ceiling, the Consort has three-quarters cover (+5 AC = effective AC 20 from ranged attacks while up there). Getting it down requires: pulling it (DC 16 Athletics/telekinesis), destroying its ceiling anchor (AC 12, 20 HP), or flying up.
- **Counterspell.** 1/day. This is the key threat -- it will save this for Spirit Guardians, Banishment, or a clutch heal. Communicate it: the first time someone casts a spell, the Consort's eyes flash and it hisses. The second time, it uses Counterspell. Players should feel like they're managing a resource.
- **Hurl Flame.** 4d6 fire, 150 ft. Targets Aurora first (concentration breaker). Targets Drenwal second (Spirit Guardians concentration).
- **Death trigger:** When the Consort dies, it screeches and falls from the ceiling, crashing into the nearest blood pool. The impact sprays acidic blood -- creatures within 10 ft make DC 13 Dex save or take 2d6 acid.

**Hobgoblin Mooks** (1-HP Minions)

- AC 18 (chain mail + shield), 1 HP (die to any damage)
- Attack: +5 to hit, flat 8 damage (longsword, no roll)
- Martial Advantage: +7 damage (flat) if ally within 5 ft of target
- They fight in pairs. They're not threats individually -- they're action economy tax. They body-block Asimov from reaching Bitter Breath. They absorb opportunity attacks. They're the veggies.
- **Reinforcements:** Every 2 rounds (initiative 20), 1d4 mooks emerge from the barracks door. Maximum 8 mooks on the field at once.

### Lair Actions: Phase 1 (Initiative 20)

Choose one. Cannot repeat the same action two rounds in a row.

**1. Gore Geyser.** A geyser of pressurized blood erupts from the floor under one creature Bitter Breath can see. DC 16 Dex save or 3d8 necrotic damage and knocked prone. The eruption leaves a 10-ft radius of difficult terrain (congealed blood) until initiative 20 next round. *Describe it: the floor BULGES, then splits -- a column of hot, reeking blood blasts upward like a broken artery.*

**2. Bone Cage.** Bones erupt from the walls and floor to cage one creature. DC 16 Str save or restrained until end of their next turn. The cage has AC 12 and 25 HP -- allies can destroy it. *Describe it: ribs and femurs CRACK out of the stone, interlocking around [target] like a closing fist. The bones are still warm.*

**3. Bloodbath's Echo.** The gore throne pulses with residual demonic energy. Every creature within 30 ft of the throne (or 15 ft if the throne is destroyed) must make a DC 15 WIS save or be frightened of the throne (not Bitter Breath) until initiative 20 next round. Bitter Breath is immune. Frightened creatures can't willingly move closer to the throne -- this pushes melee PCs away from the boss. *Describe it: for a split second, a massive shape flickers over the throne -- Bloodbath's silhouette, mouth open in a silent roar. The air reeks of old gore and the feeling of being WATCHED crawls up your spine.*

**4. Mook Reinforcements (replaces the passive 2-round spawn if you want more control).** 1d4 hobgoblin mooks crash through the barracks door. Only available if the door is still open. *Describe it: iron bolts CLANG. The barracks door flies open and hobgoblins pour through, shoving each other to get to the front.*

### Phase 1 Tactics

**Round 1 -- The Opener:**
- Bitter Breath uses **Rotten Breath** on the clustered party as they enter (40-ft cone, DC 17 Con, 8d8 poison + 4d6 necrotic, stun on fail by 5+). **IMPORTANT: Replace "stunned" with "dazed"** -- the target can choose to take EITHER an action, a bonus action, OR movement on their turn. Still hurts. Doesn't delete a player's entire turn.
- Thakk moves to intercept the closest melee PC (probably Drenwal). Shoves them toward a blood pool.
- The Barbed Consort opens with Hurl Flame on Aurora. Sets the tone: your concentration is under threat.
- Mooks form a screen between the party and the throne.
- **Lair action:** Gore Geyser under whoever is closest to the throne.

**Round 2-3 -- The Grind:**
- Bitter Breath uses Multiattack on wounded PCs (Blood Frenzy advantage). Uses Skirmisher to dart behind Thakk after attacking.
- Legendary actions: Reposition to avoid Asimov's flanking. Gutripper Strike on Drenwal to break Spirit Guardians concentration. If Asimov is isolated, Bone Cage lair action to restrain him.
- The Consort saves Counterspell for the first big spell (Spirit Guardians or Banishment). After that, it focuses Hurl Flame.
- Mooks harass the backline. Two mooks on Aurora. Two mooks on whoever is casting.

**When Thakk dies:**
- Mooks scatter (frightened 1 round). This opens Bitter Breath up. The fight shifts -- now the party can reach him.

**When the Consort dies:**
- No more Counterspell threat. Casters can breathe. Bitter Breath compensates by using Evasive Gore more aggressively.

### Bloodied Transition (140 HP) -- Phase 1 Ends

When Bitter Breath reaches 140 HP, read:

> Bitter Breath staggers. For the first time, he looks hurt. Blood -- his own, thick and dark -- drips from a wound on his flank. He touches it. Looks at his fingers.
>
> His expression doesn't shift to fear. It shifts to something worse.
>
> *"You want to take everything from me. My brother. My throne. My fortress."*
>
> He grabs the armrest of the gore throne and RIPS it free -- a jagged slab of fused weapons and bone, now a makeshift weapon. He swings it into the nearest pillar. The pillar CRACKS. Dust rains from the ceiling.
>
> *"Then come TAKE it."*
>
> He turns and BOLTS. Not through a door -- through the FLOOR. His horns punch through the stone behind the throne, opening a ragged hole. You hear him crashing down into the level below. Toward the prison. Toward the Moonkite.
>
> The room shudders. From below, you feel it -- a pulse of silver light. Then a scream that isn't sound. It's inside your heads. The Moonkite knows what's coming.

**Mechanical transition:**
- Bitter Breath drops through the floor to the Cage Chamber (one level below, behind the throne).
- Remaining enemies: any surviving mooks or the Consort fight for 1 more round, then flee or surrender.
- The party can follow immediately (drop through the hole, DC 12 Acrobatics or take 1d6 bludgeoning) or take the spiral passage (slower but no damage).

---

## INTERMISSION: THE DESCENT (15 minutes real time)

This is the breather. The pizza-arriving break. The party resets before Phase 2.

### Short Rest Opportunity

The party can take a short rest in the spiral passage leading down. The air gets colder and cleaner as they descend -- the Moonkite's aura pushes back the corruption.

- **Moonkite's Residual Healing:** Anyone who short rests within 30 ft of the cage regains +1 hit die (bonus). The silver light is soothing. Describe it as the only clean, beautiful thing they've encountered in Avernus.
- **Warlock slots recover.** This is critical. Aurora needs her spell slots for Phase 2/3.
- **Rogue hit dice.** Asimov probably spent resources. Let him recover.
- **Cleric spell management.** Drenwal decides which spells to keep. This decision matters.

### Roleplay Beats During the Rest

**Aurora hears the Moonkite:**
> Not words. A melody -- like wind through crystal. Sad, exhausted, but *aware*. It knows someone is here. It knows Aurora is here. The Wand of Celestial Warding glows steadily -- not pulsing anymore. Matching the rhythm of the cage's silver light. Connected.
>
> And underneath the melody, a new note. Fear. Something is touching the chains. Something is pulling on its light. *Hurry.*

**Drenwal -- Bhaal flash:**
> A jolt behind Drenwal's eyes. A vision, fast and violent: Dumal, miles away, standing at the edge of the river of blood. Looking south. Looking toward the Palace. He felt it when the party arrived -- Bhaal's children can sense each other at proximity. He's coming. Not today. But soon.
>
> Then Gargauth's voice, oily and intimate: *"Kill the demon quickly, Drenwal. Use everything you have. Don't hold back. After all... you'll need practice. For what comes next."*
>
> **Bhaal Influence: tick to 4/6** (proximity to violence, urge to kill Bitter Breath rather than negotiate).

**Asimov -- Soul Capacitor reaction:**
> The Soul Capacitor hums. Warm. The crystalline channels pulse purple -- they're sensing something below. A soul. A *strong* soul. Rasheem's voice, distant, half-amused: *"That's a medium-grade soul down there, Asimov. Maybe leaning heavy. Kill it clean and the lamp drinks deep."*
>
> The implication: Bitter Breath's soul is worth capturing. If Asimov delivers the killing blow, the Soul Capacitor can consume it. This is a bounty.

### What Bitter Breath Is Doing (Below)

While the party rests, Bitter Breath has reached the Cage Chamber and begun draining the Moonkite. He rips the chain devil guard aside (kills it himself -- no loyalty) and grabs two of the siphon chains. He's pulling celestial energy into himself to heal and empower for the next fight.

**Mechanical consequence of resting:** For every 10 minutes the party waits, Bitter Breath regains 20 HP (max back to 140, his Phase 2 starting HP). If they rush immediately (no rest), he starts Phase 2 at 140 HP but hasn't fully connected to the chains yet -- the siphon regen is weaker (5 HP/round instead of 10). **Reward urgency without punishing the rest.** Even if they rest, the fight is winnable. They just face a tougher version.

---

## PHASE 2: THE SIPHON

### The Map -- Cage Chamber

```
         [ COLLAPSED CEILING ]
          (rubble, half cover)

  [CHAIN 1]                    [CHAIN 2]
  anchored                      anchored
  to west                       to east
  wall                          wall
      \                           /
       \                         /
        \       [CAGE]          /
         \    10 ft sphere     /
          \   suspended       /
           \  in center      /
  [CHAIN 3] \    |          / [CHAIN 4]
  anchored    \   |        /   anchored
  to floor     \  |       /    to ceiling
                [BITTER BREATH]
                gripping chains 2 & 3
                  |
                  |
           [ SPIRAL ENTRANCE ]
           (party enters here)

  [MAW DEMON]              [MAW DEMON]
  feeding in                feeding in
  blood trough              blood trough
```

**Key terrain:**
- **The Cage** -- 10-ft sphere of hellforged adamantine, suspended by 4 chains. Silver-blue light pulses weakly inside. The Moonkite is visible -- folded wings, antlers, diminished. The cage is centered in the room, 10 ft off the ground.
- **The 4 Siphon Chains** -- Each chain runs from the cage to an anchor point (2 walls, 1 floor, 1 ceiling). They pulse with sickly orange light. **Each chain has AC 14, 25 HP, and is immune to poison and necrotic.** They are vulnerable to radiant damage. Destroying a chain weakens Bitter Breath (see below).
- **Blood troughs** -- Channels in the floor carry the river of blood through the room. Difficult terrain. Two maw demons feed here.
- **Collapsed ceiling rubble** -- Half cover in the northwest corner. Good position for Aurora (ranged cover).
- **Low ceiling** -- Only 15 ft here (compared to 30 ft in the Throne Room). No flying. Tight. Claustrophobic. The silver light from the cage creates sharp shadows.

### The Scene

> You drop into the chamber and the temperature plummets. The air is cleaner here -- cold, almost sharp -- but threaded with something electric. Wrong.
>
> The cage hangs in the center of the room. A 10-foot sphere of black metal, suspended by four chains that run into the walls, floor, and ceiling. Each chain pulses with sick orange light. Inside the cage, something moves. Silver-white. Folded. Fading.
>
> Bitter Breath is wrapped around two of the chains. His claws dig into the metal. Orange light crawls up his arms and into his horns, which are now faintly glowing. His wounds from the throne room are closing. Slowly. Visibly.
>
> He's feeding on the Moonkite.
>
> He turns his head. His eyes have changed. One is still yellow. The other has a ring of silver in it, stolen starlight leaking into his iris.
>
> *"You're too slow."*
>
> His voice is different. Steadier. Colder. The desperation from the throne room is gone. He's found his second wind.
>
> *"Every second you wasted up there, I was down here. Drinking. Do you know what celestial light tastes like?"*
>
> He releases one chain and drops to the floor. His aura pulses. The air around him shimmers with heat-haze, but the haze is tinged silver.
>
> *"It tastes like winning."*

### Enemies: Phase 2

**Bitter Breath (Siphon State)** -- His stat block changes.

Adjustments from Phase 1:
- **HP:** 140 (carried from Phase 1 bloodied threshold, +0 to +40 depending on how long the party waited)
- **Siphon Regeneration:** At the start of each of his turns, Bitter Breath regains HP equal to 10 x the number of intact chains (max 40 HP/round with all 4 chains, 30 with 3, 20 with 2, 10 with 1, 0 with none). **This is the secondary objective. Destroy the chains.**
- **Corrupted Aura.** His Aura of Rot gains an additional effect: creatures that fail the DC 17 CON save also take 1d6 necrotic damage (the Moonkite's stolen energy weaponized).
- **Chain Leash (new bonus action, replaces Skirmisher).** Bitter Breath grabs a chain and swings to any point within 20 ft of an intact chain. This gives him insane mobility in this room -- he swings around the cage, through the party, repositioning constantly.
- **All other stats remain the same.** Same AC, same attacks, same legendary actions.

**Siphon Chain Mechanics:**

| Chain | Location | AC | HP | Effect When Destroyed |
|-------|----------|----|----|----------------------|
| Chain 1 | West wall | 14 | 25 | Regen drops by 10/round. Cage shudders. Silver light flares. |
| Chain 2 | East wall | 14 | 25 | Regen drops by 10/round. Bitter Breath loses Chain Leash if this was his anchor chain. |
| Chain 3 | Floor | 14 | 25 | Regen drops by 10/round. The cage drops 3 ft (still suspended by remaining chains). |
| Chain 4 | Ceiling | 14 | 25 | Regen drops by 10/round. Cage swings wildly -- creatures within 5 ft make DC 13 Dex or take 2d6 bludgeoning. |

- **Radiant vulnerability:** Chains take double damage from radiant attacks. Drenwal's Sacred Flame, Radiance of the Dawn, or Aurora's wand-channeled starlight arrows. This is a spotlight moment for the casters.
- **Thieves' Tools:** Asimov can use thieves' tools on a chain anchor (DC 17) as an action to disable the chain without destroying it. Quieter, more surgical. Rogue spotlight.
- **Religion check:** Drenwal can attempt a DC 15 Religion check as an action while touching a chain to channel divine energy and purify it. On success, the chain shatters and the Moonkite's light flares brighter -- all allies within 30 ft regain 1d8 HP. Cleric spotlight.

**2 Maw Demons** (CR 5, 137 HP each)
- Standard stat block. AC 13, Bite +6 (4d8+4 piercing).
- They're feeding in the blood troughs when the party arrives. They join the fight on round 2 (finishing their meal).
- They're feral -- they attack whoever is closest. Bitter Breath doesn't control them; he tolerates them.
- If the party dealt with them during infiltration, they're already dead. Skip them.

### Lair Actions: Phase 2 (Initiative 20)

The lair shifts. The cage chamber has different hazards than the throne room. Choose one per round. Cannot repeat.

**1. Chain Lash.** One intact siphon chain whips free and lashes at a creature within 15 ft of the cage. +10 to hit, 3d6 bludgeoning + 2d6 necrotic (stolen celestial energy). On hit, the target is pulled 10 ft toward the cage. *Describe it: the chain SNAPS like a living thing -- it moves too fast, too purposeful, like a striking snake made of black iron.*

**2. Silver Scream.** The Moonkite convulses inside the cage. A pulse of psychic anguish radiates outward. Every creature within 30 ft makes a DC 14 WIS save or takes 2d8 psychic damage and is dazed until end of their next turn (choose: action, bonus action, or movement). Aurora has advantage on this save (the Moonkite is trying not to hurt her). *Describe it: the silver light inside the cage flares white-hot, then contracts. A sound that isn't sound hits you -- grief, exhaustion, terror. Not aimed at you. Just... radiating. The Moonkite is screaming.*

**3. Gore Eruption.** The blood troughs overflow. Gore floods a 15-ft-radius section of the floor. All creatures in the area must make a DC 14 STR save or fall prone. The area becomes difficult terrain for 1 round. *Describe it: the blood channels SURGE. Thick, hot, reeking -- the floor is suddenly a slick of gore. Something underneath the Palace is pumping it faster, as if the building itself is panicking.*

**4. Cage Pulse (only available when 2+ chains are destroyed).** The weakening cage emits a burst of raw celestial energy. Every creature within 20 ft makes a DC 15 CON save or takes 3d6 radiant damage. Bitter Breath takes this damage too (the stolen energy is becoming unstable). *Describe it: the cage RINGS like a bell. Silver light explodes outward -- blinding, warm, violent. For a split second, you see the Moonkite clearly: vast wings, fractured antlers, an eye that looks directly at you.*

### Phase 2 Tactics

**Bitter Breath fights to protect the chains.** He knows his regeneration depends on them. His tactics shift from the Throne Room:

- He uses **Chain Leash** to swing between anchor points, hitting PCs as he passes (Flaying Rush from chain-to-chain).
- He positions himself between the party and whichever chain they're targeting.
- Legendary **Gutripper Strike** on anyone attacking a chain (interrupt their focus).
- Legendary **Reposition** to bodyblock the chain the Rogue is trying to pick.
- If Drenwal tries to purify a chain (Religion check), Bitter Breath uses his reaction (**Evasive Gore**) to reposition next to the Cleric and break his concentration.
- Rotten Breath if it recharges -- aim it through the party AND a chain. PCs dodge but the chain doesn't (chains auto-fail DEX saves). Wait -- this hurts his own chain. He won't do this. He PROTECTS the chains.

**When chains are destroyed:**
- 1 chain down: Bitter Breath snarls. *"That changes nothing."*
- 2 chains down: He's visibly weakened. The silver ring in his eye flickers. *"You don't understand what you're doing. This power was WASTED on that thing. I'm USING it."*
- 3 chains down: His regen is almost gone (only 10/round). He becomes reckless. Blood Frenzy on everyone, not just wounded PCs. He stops protecting the last chain and goes full offense. *"ENOUGH. If I can't keep it, neither can you."*
- 4 chains down: Regen stops. Bitter Breath is diminished. The stolen silver light in his eye is guttering. He's back to his base stat block. The cage groans -- with all chains broken, it's barely holding together. The Moonkite's light pulses stronger.

### Phase 2 Ends: Zero HP / The Grab

When Bitter Breath reaches 0 HP in Phase 2, **Relentless triggers** (1/day, drops to 1 HP instead).

Read:

> Bitter Breath crumples. One knee hits the floor. His gutting blade clatters from his hand. For a moment -- one moment -- it's over.
>
> Then his hand shoots out and grabs the nearest intact chain. Or, if all chains are broken, he grabs the cage itself.
>
> His fingers close around the metal. Orange light flares. Then silver. Then BOTH, swirling together, crawling up his arm like fire under the skin.
>
> He screams. Not in pain. In *hunger*.

**If chains remain:** He rips a chain free from the cage with raw force. The chain dissolves into light and pours into him. The Moonkite SHRIEKS -- a sound so pure it cracks the stone walls.

**If no chains remain:** He tears at the cage itself, ripping a panel loose. Raw, unfiltered Moonkite light blasts into him.

> His body convulses. His horns crack and regrow -- longer, branching, threaded with silver veins. His wounds seal shut, but the new skin is wrong -- pale, luminous, shot through with light that doesn't belong in him. His eyes are both silver now. Stolen starlight.
>
> He stands. He's taller. His aura isn't rot anymore -- it's cold. Clean. Corrupted purity.
>
> He doesn't speak. He just looks at you. And for the first time, you see something in his expression that wasn't there before.
>
> Contempt.
>
> **Bitter Breath has entered his Mythic Phase.**

---

## PHASE 3: STOLEN STARLIGHT

### The Mythic Phase

Everything changes. Communicate this to the players directly: *"Bitter Breath absorbs the Moonkite's power and resets. This is the final phase."*

The room transforms. The cage is cracked open (one panel torn away). Silver-white light floods the chamber, mixing with the orange corruption in swirling patterns on the walls. The blood in the troughs has gone cold and still. The air vibrates.

### Bitter Breath Ascendant -- New Stat Block

**HP:** 140 (reset). This is a new pool -- NOT added to his previous HP. The fight has been going long enough. 140 HP against a level 11 party is 3-4 rounds of focused fire. That's the target.

| Stat | Change from Base |
|------|-----------------|
| AC | 19 (unchanged) |
| HP | 140 (reset) |
| Speed | 50 ft, **fly 30 ft (hover)** -- spectral wings of corrupted starlight |
| Damage Immunities | Fire, poison, **radiant** (stolen from the Moonkite) |
| New Resistance | Cold becomes **immunity** |

**New/Modified Traits:**

- **Aura of Corrupted Starlight (replaces Aura of Rot).** Any creature that starts its turn within 15 ft of Bitter Breath must succeed on a DC 17 CON save or take **2d6 cold damage** and have their speed halved until end of their next turn. The aura is silver-white with streaks of sickly orange. It's beautiful and wrong.
- **Celestial Theft.** Bitter Breath has advantage on saving throws against spells cast by fey or celestial-linked creatures (targets Aurora specifically -- her patron is celestial-fey). She feels this as a violation -- *her* patron's power being used against her.
- **Unstable Radiance.** At the start of each of Bitter Breath's turns, the stolen energy pulses. Every creature within 5 ft takes 1d6 radiant damage (involuntary -- he can't control it). He also takes 1d6 radiant damage himself (the energy is burning him from inside). **He is dying.** Even if the party does nothing, he'll kill himself in 23 rounds. But the Moonkite will be dead long before that.
- **Relentless: SPENT.** He already used it in the Phase 2 transition. It's gone.
- **Legendary Resistance: SPENT.** Track how many he used in Phase 1 and 2. Whatever remains carries over. If he's out, he's out. The spellcasters can now land their big saves.

**New/Modified Actions:**

- **Multiattack.** Two Starlight Gutripper attacks + one Corrupted Gore attack (or Starlight Breath if available).
- **Starlight Gutripper.** +13 to hit, reach 5 ft. Hit: 2d8+7 slashing + **2d6 radiant** (replaces necrotic). On crit, the target is blinded until end of their next turn (flash of stolen starlight). The bleeding effect is gone -- replaced by something worse.
- **Corrupted Gore.** +13 to hit, reach 5 ft. Hit: 2d10+7 piercing + **2d8 cold** (corrupted celestial ice). DC 17 Dex save or Bitter Breath passes through to the opposite side and attacks again. Same as before but cold damage.
- **Starlight Breath (Recharge 5-6, replaces Rotten Breath).** 40-ft cone. DC 17 CON save. **6d8 radiant + 4d6 cold.** Half on success. Creatures that fail by 5+ are **dazed** until end of their next turn. *Describe it: Bitter Breath opens his mouth and a beam of silver-white light -- pure, blinding, cold as the void between stars -- erupts from his throat. It's not breath. It's the Moonkite's scream weaponized.*
- **Skirmisher** remains (bonus action Dash or Disengage).

**Modified Legendary Actions (Mythic Actions -- all available every round):**

- **Reposition.** Move up to half speed (including fly) without provoking.
- **Starlight Strike.** One Starlight Gutripper attack.
- **Nova Rush (Costs 2 Actions, replaces Flaying Rush).** Bitter Breath flies up to his speed. Silver-cold energy radiates from him. Each creature he passes within 10 ft of (expanded from 5 ft) must make a DC 17 DEX save or take **3d6 radiant + 2d6 cold** damage. He can make one Gutripper at the end. *Describe it: he moves like a comet. A trail of silver-white light follows him, and where it touches the ground, frost blooms.*

### The Ticking Clock: The Moonkite Is Dying

This is the sauce. The stakes beyond "kill the boss."

**Moonkite Vitality Tracker:** The Moonkite starts Phase 3 at 5 Vitality. At the end of every round (initiative 0), the Moonkite loses 1 Vitality. **At 0, the Moonkite dies.**

- **5 Vitality:** Silver light is strong. The cage glows. Hope.
- **4 Vitality:** Light flickers. The Moonkite's wings tremble. Aurora's wand dims slightly.
- **3 Vitality:** Light is fading. The song is barely audible. Aurora feels cold.
- **2 Vitality:** Barely a glow. The antlers inside the cage are cracking. Aurora's wand goes dark.
- **1 Vitality:** Almost gone. A single thread of silver light. Aurora feels something inside her chest PULLING -- the bond is fraying.
- **0 Vitality:** The Moonkite dies. The light goes out. Aurora's wand shatters. The Moonbow fusion cannot happen. The patron bond breaks. *This is the fail state.*

**Aurora can stabilize the Moonkite.** On her turn, she can use an action to channel her wand toward the cage. DC 12 Arcana (easy -- you want her to succeed). On success, the Vitality loss pauses for 1 round (the Moonkite doesn't lose Vitality at the end of that round). She can do this as many times as she wants, but each action spent stabilizing is an action not spent attacking.

This creates the core tension of Phase 3: **Aurora must choose between damage and saving her patron.** If the party kills Bitter Breath fast enough, she never has to choose. If the fight drags, she has to sacrifice DPS to keep the Moonkite alive.

**Asimov can help.** If Asimov uses his Psychic Whispers to connect with Aurora, she can stabilize the Moonkite as a bonus action instead of an action (the telepathic link amplifies her focus). Rogue supporting the Warlock -- team play.

**Drenwal can help.** A DC 15 Religion check (action) while touching the cage channels divine light into the Moonkite, restoring 1 Vitality. But Bhaal's influence tries to corrupt the channel -- on a roll of 5 or lower (after modifiers), the energy turns necrotic and the Moonkite loses 1 Vitality instead. Risk/reward for the Cleric.

### Lair Actions: Phase 3 (Initiative 20)

The lair is breaking apart. The stolen energy is destabilizing the Palace. Choose one per round.

**1. Starlight Detonation.** A chain anchor (or cage fragment) explodes with stored celestial energy. One creature within 20 ft of the cage makes a DC 16 DEX save or takes 4d6 radiant damage. On a hit, the creature is pushed 15 ft away from the cage. *Describe it: a shard of adamantine chain DETONATES -- silver-white fire erupts from the anchor point, scorching the walls.*

**2. Structural Collapse.** A section of ceiling collapses (10-ft radius, Bitter Breath chooses the point). DC 15 DEX save or 3d10 bludgeoning and restrained under rubble. Restrained creatures can free themselves (DC 15 Athletics) or be freed by an ally (action, DC 13 Athletics). The rubble creates difficult terrain permanently. *Describe it: the stone GROANS. Cracks spider across the ceiling. Then a section falls -- a ton of blackite and bone crashing down.*

**3. Moonkite's Agony.** The Moonkite convulses. A wave of raw emotion radiates outward. Every creature in the room makes a DC 15 WIS save. On failure, the creature is overwhelmed with the Moonkite's pain -- they are **incapacitated until the end of their next turn** (they can't act, but they can move). On success, they take 1d6 psychic damage but can act normally. **Aurora automatically succeeds** (the bond protects her). **Bitter Breath automatically fails** (the stolen energy resonates against him -- he loses his next bonus action). *Describe it: the silver light inside the cage SCREAMS. Not sound. FEELING. Grief. Loss. Centuries of imprisonment compressed into one pulse. You taste tears you haven't cried.*

**4. The Palace Shudders.** The entire building trembles. Every creature on the ground makes a DC 13 DEX save or falls prone. All ground becomes difficult terrain until initiative 20 next round. Loose objects fall from shelves and walls. Bitter Breath (hovering) is unaffected. *Describe it: the floor BUCKS. The walls groan. Dust and bone fragments rain from the ceiling. The Palace is dying.*

### Phase 3 Tactics

Bitter Breath fights like an animal with a god's power. No tactics. No formations. Pure aggression.

- **Round 1:** Opens with Starlight Breath (if recharged from Phase 2 transition). Uses Nova Rush legendary action immediately after to cross the room and hit as many PCs as possible.
- **Subsequent rounds:** Multiattack on whichever PC is closest. Flies between targets using Reposition. Focuses Aurora if she's stabilizing the Moonkite -- he understands what she's doing and wants to stop it.
- **When below 70 HP:** He can't fly straight anymore. The corrupted wings flicker. His movement becomes erratic -- describe him crashing into walls, leaving silver-streaked impact craters. He starts hitting harder but missing more (describe it as wild swings -- don't actually change his stats, just the narration).
- **When below 35 HP:** He stops talking entirely. Stops making sounds. Just fights. Silent. Relentless. The stolen light is eating him alive -- his skin cracks and silver bleeds from the fissures.

### Dialogue: Phase 3

**Opening (140 HP):**
> *"I spent my entire life in his shadow. Smaller. Weaker. The runt."*
> *(pause)*
> *"Not anymore."*

**At 100 HP (first real damage):**
> *(to Aurora)* *"You want this thing back? Your little god in a cage? Look at what I've done with its power. I've done MORE with it in MINUTES than it did in CENTURIES."*

**At 70 HP (struggling):**
> *"My brother sat on that throne and got fat and drunk and DIED. I was supposed to be different. I WAS different."*

**At 35 HP (silent -- no dialogue. Actions only. Describe his face: empty, focused, beyond language).**

**At 0 HP (death):**
Read the Death Throes section below.

### Death Throes

When Bitter Breath reaches 0 HP in Phase 3, he dies. No Relentless (already spent). No last stand. He drops.

> Bitter Breath's knees buckle. The stolen starlight flares one final time -- his whole body outlined in silver-white -- and then it tears free.
>
> The light rips out of him. Through his horns, his eyes, his wounds. It's not an explosion -- it's an exorcism. The Moonkite's power was never his. And it's leaving.
>
> **Every creature within 15 ft of Bitter Breath makes a DC 15 CON save or takes 4d6 radiant + 2d6 cold damage (half on success).**
>
> The light streams upward and into the cage. The cracked panels glow. The Moonkite absorbs its stolen essence.
>
> Bitter Breath lies on the stone floor. The horns are dark. The silver is gone. He looks... smaller than you remember. Just a demon. Just a brother who wanted to be more.
>
> Silence. Then the cage hums. A single, pure note. Not grief anymore.
>
> Hope.

**Moonkite Vitality:** The Death Throes energy restores 2 Vitality to the Moonkite (the stolen essence returns). If the Moonkite was at 1 Vitality, it's now at 3. If it was at 3, it's now at 5 (full). This is a reward -- the party's victory directly heals what they came to save.

---

## AFTERMATH

### The Moonkite Freed

Proceed to the Moonkite freeing sequence from `session-primer-next.md` (Act 5). The cage is already damaged from Phase 2 and 3 -- the skill challenge DCs are reduced by 2 if chains were destroyed during the fight. If ALL 4 chains were destroyed in Phase 2, skip the skill challenge entirely -- the cage panels slide apart on their own when Aurora uses the key.

### Loot

From Bitter Breath's body:
- **Bitter Breath's Gutripper** -- +1 shortsword, 2d6 slashing + 1d6 necrotic, on crit the target bleeds (1d6 necrotic/round until healed). Good for Asimov if he wants a physical backup weapon.
- **Corrupted Starlight Shard** -- A horn fragment threaded with fading silver veins. Worth 3 soul coins to the right buyer. If Aurora touches it, the Moonkite recoils -- it's painful. If consumed by the Soul Capacitor, it counts as a Medium Soul (Bitter Breath's soul, if Asimov delivered the killing blow).
- **3 soul coins** -- from Bitter Breath's belt pouch.

From the Throne Room (if they go back):
- **Crude map of Avernus** -- shows locations of Blood Pay sites (marked with Xs). Bitter Breath was planning raids.
- **Bloodbath's Fang** -- A broken tusk from the original throne, still warm. Component for future crafting.

From the Cage Chamber:
- **Siphon Chain Links** -- Fragments of the destroyed chains. Each link is worth 1 soul coin. 4 chains x 3 links = up to 12 soul coins in raw materials.
- **Cage Fragment** -- Hellforged adamantine panel. Incredibly valuable. Could be reforged into armor or a shield by a master smith (Bel's Forge? Uldrak?).

### Soul Capacitor Bounty

If Asimov dealt the killing blow, the Soul Capacitor consumes Bitter Breath's soul. Rasheem's voice: *"Now THAT'S a catch. Bitter Breath. CR sixteen and change, ascended form. The syndicate is going to love this. Hold tight, Asimov -- I'm processing."*

**Bitter Breath Bounty Soul (Medium Soul, permanent imprint):**
- **Passive -- Brother's Spite:** When Asimov is below half HP, his Psychic Blades deal an additional 1d6 cold damage (the desperate fury of a creature that refused to die).
- **Active -- Stolen Breath (1/LR):** As an action, Asimov exhales a 15-ft cone of necrotic cold. DC 15 CON save, 3d6 necrotic + 2d6 cold, half on save. Creatures that fail are dazed until end of their next turn.
- **Active -- Chain Leash (1/LR):** As a bonus action, Asimov throws a psychic chain at a creature within 30 ft. DC 14 STR save or the creature is pulled 15 ft toward Asimov. Good for setting up Sneak Attack.

### Palace Collapse

10 minutes after Bitter Breath dies, the Palace of Gore begins to collapse (the Moonkite's energy was holding it together). The party has time to loot and leave.

### Cliffhanger: Dumal's Message

As they exit, Drenwal sees it -- carved into the stone above the exit:

> **A symbol of Bhaal. And below it, in Infernal: "I SEE YOU, BROTHER."**

---

## QUICK REFERENCE CARD

### Phase 1 Cheat Sheet
- **BB:** AC 19, 280 HP. Rotten Breath (dazed, not stunned). Skirmisher. Blood Frenzy.
- **Thakk:** AC 20, 90 HP. Shield Wall (disadvantage on BB attacks). Redirects hits. Shove.
- **Consort:** AC 15 (20 on ceiling), 110 HP. Hurl Flame. Counterspell 1/day.
- **Mooks:** AC 18, 1 HP. Flat 8 damage. Spawn 1d4 every 2 rounds from barracks door.
- **Lair:** Gore Geyser / Bone Cage / Bloodbath's Echo / Mook Reinforcement
- **Secondary objectives:** Destroy Throne (AC 15, 40 HP) = shrink aura. Seal Barracks Door (DC 17 Athletics / DC 16 Thieves / 30 dmg) = stop mooks.
- **Transition:** At 140 HP, BB smashes through floor. Phase 1 ends.

### Phase 2 Cheat Sheet
- **BB:** AC 19, 140 HP. Chain Leash (swing mobility). Siphon Regen (10 HP x chains/round).
- **Chains:** AC 14, 25 HP each, 4 total. Vulnerable to radiant. Religion DC 15 to purify. Thieves DC 17 to disable.
- **Maw Demons:** AC 13, 137 HP each. Bite +6, 4d8+4. Join round 2.
- **Lair:** Chain Lash / Silver Scream / Gore Eruption / Cage Pulse (2+ chains broken)
- **Transition:** At 0 HP, Relentless triggers. BB grabs chain/cage. Mythic Phase begins.

### Phase 3 Cheat Sheet
- **BB Ascendant:** AC 19, 140 HP (reset). Fly 30. Radiant immune. Starlight Gutripper (2d6 radiant). Starlight Breath (6d8 radiant + 4d6 cold). Nova Rush (10-ft wide Flaying Rush + radiant/cold).
- **Moonkite Vitality:** Starts at 5. Loses 1/round. At 0 = Moonkite dies. Aurora stabilizes (action, DC 12 Arcana, pauses loss 1 round). Asimov's Psychic Whispers lets Aurora do this as bonus action instead.
- **Lair:** Starlight Detonation / Structural Collapse / Moonkite's Agony / Palace Shudders
- **Death Throes:** 15 ft radius, DC 15 CON, 4d6 radiant + 2d6 cold. Restores 2 Moonkite Vitality.
- **Relentless:** SPENT. Legendary Resistance: TRACK from earlier phases.

### Dialogue Checkpoints
| HP Threshold | Tone | Sample Line |
|-------------|------|-------------|
| 100% (Phase 1) | Cold, dismissive | *"You smell like my brother's blood. Sit down."* |
| 75% (Phase 1) | Angry, personal | *"You fed him to a genie? You didn't have the dignity to kill him properly."* |
| 50% / Bloodied (Transition) | Desperate, fleeing | *"Then come TAKE it."* (smashes through floor) |
| Phase 2 opening | Steadier, fed | *"Every second you wasted, I was drinking. It tastes like winning."* |
| Phase 3 opening | Quiet megalomania | *"I spent my entire life in his shadow. Not anymore."* |
| Phase 3, 70 HP | Grief | *"I was supposed to be different."* |
| Phase 3, 35 HP | Silent | No words. Just the fight. |
| 0 HP (death) | -- | The light tears free. Silence. Then the cage hums. |

---

## DM TIPS

**Scaling on the fly:**
- Fight too easy? Add maw demons in Phase 2. Increase Moonkite Vitality loss to 2/round in Phase 3.
- Fight too hard? Thakk surrenders at half HP. Reduce Siphon Regen to 5/chain. Extend Moonkite Vitality to 7.
- Phase 3 dragging? Reduce Ascendant HP to 100. Or have the Moonkite help -- it lashes out at Bitter Breath for 3d6 radiant on its own (initiative 0, once, when Vitality hits 2).

**Roll saves in the open.** Let them see Bitter Breath fail. Let them see him burn a Legendary Resistance. Narrate it: *"He fails -- and you see something in his expression, a twitch, a refusal. He shakes it off. That's his second Legendary Resistance."* They're chipping away at a second resource pool. It gives the fight shape.

**Track Legendary Resistances visibly.** Put 3 tokens on the table. Remove one each time. When they're gone, the players know. They'll save their big spells. That moment when the last resistance drops and someone lands Banishment or Hold Monster -- that's the moment they'll remember.

**Describe the damage.** Not "you hit for 23 damage." Instead: *"Your psychic blade punches through his shoulder. Silver light leaks from the wound like a broken lamp. He hisses and the light cauterizes the cut -- but not all the way."*

**Let the intermission breathe.** Don't rush through the short rest. This is where the roleplay happens. Let them strategize. Let Aurora feel the Moonkite. Let Drenwal wrestle with Bhaal. Let Asimov hear Rasheem's bounty offer. These moments make the boss fight feel like a story, not just a combat.

**The mythic phase transition is your biggest moment.** Stand up if you're sitting. Lower your voice. Describe the transformation slowly. Then tell them directly: *"He resets. This is the final phase."* Video games show the health bar refill. You should too.

**Aurora's choice in Phase 3 is the heart of the encounter.** She has to choose between damage and saving her patron. Don't tell her what to do. Let her figure it out. If Asimov connects with Psychic Whispers (bonus action stabilize), reward that team play with narration -- *"The telepathic link hums. Aurora's wand pulses in sync with Asimov's lamp. For a moment, they're one system -- rogue and warlock, psionic and celestial, feeding power into the cage together."*

**The death should feel final.** Bitter Breath is not a villain who gets a redemption arc. He's a brother who wanted to be more and wasn't. Let that be sad. Let the party feel the weight of it. Then let the Moonkite's hope fill the silence.
