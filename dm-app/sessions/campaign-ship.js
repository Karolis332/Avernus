// Campaign-wide: the Lady Vengeance, infernal metal, ship upgrades, Jeremy.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.creatures, {

  "lady-vengeance": {
    name: "The Lady Vengeance",
    kind: "lady-vengeance",
    role: "The party's warship. Jeremy flies her and keeps her alive",
    source: { page: "bestiary", name: "Lady Vengeance", src: "HB" },
    homebrew: "Shown repaired: the adamantine control rods are in, so she has full speed, both force cannons and the Soul Coin Overdrive. If she is ever crippled again (rods torn out, Core wrecked), she drops to half speed, one cannon and no Overdrive until new rods go in. This is the base ship. Add upgrades from the Ship Upgrades page as the party builds them.",
    npc: false,
    description: "The Lady Vengeance hangs in the red sky like a black blade: a long galley of riveted infernal plating, gun-ports glowing along both flanks, the Aether Harpoon jutting from her bow. Under the deck the Planar Core thrums. You feel it in your teeth before you hear it.",
    sizeType: "Gargantuan vehicle (Gondian-Portyr hellship, galley class)",
    ac: 17, acNote: "reinforced infernal plating",
    hp: 350, hpFormula: "damage threshold 15, mishap threshold 30",
    speed: "fly 40 ft. (hover), 60 ft. on the Styx",
    abilities: { str: 22, dex: 8, con: 20 },
    saves: "", skills: "",
    vulnerable: "", resist: "fire, poison", immune: "psychic; fire from nonmagical sources",
    condImmune: "blinded, charmed, deafened, frightened, paralyzed, petrified, poisoned, stunned, unconscious",
    senses: "", languages: "",
    traits: [
      { name: "Stations", text: "Five stations. {@b Helm} (three-quarters cover): steers her. {@b Port and starboard cannons} (half cover): one gunner each. {@b Aether Harpoon} (half cover, at the bow): one harpooner. {@b Planar Core} (total cover, below deck): the engineer, usually {@c jeremy|Jeremy}. A station with nobody in it does nothing." },
      { name: "Acts on the Crew's Turns", text: "The ship has no initiative of her own. Each station acts on the turn of whoever stands at it. If no one takes the Drive action, she keeps the same course and speed as on her last turn. With no one at the helm she fails every Dexterity saving throw." },
      { name: "Damage Threshold 15", text: "She ignores any single hit that deals 14 damage or less. A hit of 15 or more deals its full damage." },
      { name: "Mishaps (Threshold 30)", text: "When she takes 30 or more damage from one hit while moving, or fails an ability check by 5 or more, roll {@dice 1d6}. {@b 1 Core flare:} anyone at the Core takes {@dice 3d6} fire at the start of each of their turns. {@b 2 Locked helm:} she can only fly straight. {@b 3 Core rupture:} speed drops by 20 ft. {@b 4 Gun jam:} one weapon of the DM's choice is silent. {@b 5 Smoke:} the helm is heavily obscured. {@b 6 Shed plating:} her damage threshold drops to 5. A crew member at the spot ends the mishap with an action and a DC 15 Strength or Dexterity check with tools (DC 20 for a gun jam)." },
      { name: "Bloodied (175 Hit Points)", text: "She lists and catches fire. At the start of each round she takes {@dice 2d6} fire damage, ignoring her resistance and damage threshold, until someone puts the fire out with Damage Control." },
      { name: "Sinking (0 Hit Points)", text: "She is going down into Avernus. Everyone aboard has until the end of the next round to get off, or rides her into the ash. Getting her back is a campaign quest, not a repair." },
      { name: "Repairs", text: "Out of combat, a crew member with smith's or tinker's tools spends 1 hour and 1 piece of infernal metal and makes a DC 13 check: she regains {@dice 4d10} hit points (half that on a failure; the metal is used either way). Without metal, a full day of Jeremy's work restores {@dice 2d10}. An Infernal Repair Kit gives advantage on these checks. See {@side infernal-metal|Infernal Metal}." },
      { name: "Crew and Hold", text: "She fights at full strength with five crew. She berths twelve, carries an alchemist's table and a small armory, and her hold takes 200 pieces of infernal metal." }
    ],
    actions: [
      { name: "Force Cannon (Port or Starboard)", text: "Ranged Spell Attack: +9 to hit, range 600/2,400 ft., one target. Hit: 44 (8d10) force damage. A gunner fires as their action. Each cannon fires once per round." },
      { name: "Aether Harpoon", text: "Ranged Weapon Attack: +9 to hit, range 120 ft., one creature, object or vehicle. Hit: 26 (4d12) piercing damage, and the target is tethered to the ship (escape DC 16 Strength). A tethered target can't move farther from the ship. At the start of the harpooner's turn, the winch drags a Huge or smaller target 20 ft. toward her. A Gargantuan target drags the ship instead." },
      { name: "Maintain Core (Engineer)", text: "DC 15 Intelligence (Arcana) or tinker's tools check, every round. Success: full power. Failure: she loses 10 ft. of speed or one cannon goes silent until the engineer's next turn (DM's choice). Skipping it counts as a failure." },
      { name: "Damage Control (Anyone)", text: "DC 13 check with tools, or Jeremy's tinker's tools. Success: she regains {@dice 2d6} hit points, or one fire or Core flare goes out." },
      { name: "Overclock (Engineer)", text: "DC 18 Intelligence (Arcana) check. Success: her speed doubles until the start of the engineer's next turn. Failure: the Core sputters and she can't move until then." },
      { name: "Scroll Feed (Engineer)", text: "The engineer feeds the Core a spell scroll of 2nd level or lower, and the spell takes effect on the whole ship. Favourites: {@spell blur} (attacks against her have disadvantage), {@spell misty step} (the whole ship blinks 60 ft.), {@spell web} or {@spell grease} on boarders, {@spell gust of wind} to clear smoke." }
    ],
    bonus: [
      { name: "Dash (Helm)", text: "The pilot makes the ship Dash or Disengage." },
      { name: "Soul Coin Overdrive (Engineer, 1/Fight)", text: "The engineer drops a soul coin into the Core. For 1 minute: her speed doubles, her weapons deal an extra 2d10 radiant and force damage, any enemy that starts its turn within 30 ft. of the hull takes {@dice 2d10} fire and {@dice 2d10} radiant damage, and allies aboard gain +2 AC and advantage on saves against being charmed or frightened. Roll a d20 as the coin goes in. On a 1 to 5 the Core backlashes: she takes 44 (8d10) force damage and her engines and cannons die for {@dice 1d4} rounds. The soul in the coin is destroyed forever. A player must ask for this out loud." }
    ],
    reactions: [
      { name: "Shield Scroll (Engineer)", text: "When she is hit by an attack, the engineer feeds a {@spell shield} scroll into the Core: +5 AC against that attack and until the start of the engineer's next turn." }
    ],
    tactics: [
      "Before initiative, ask the players to place everyone: helm, two cannons, harpoon, Core. Jeremy takes the Core unless told otherwise. Allies can man a gun.",
      "Every round, Jeremy's first job is Maintain Core. Roll it in the open. A failure is drama: a cannon coughs and goes dark.",
      "Gunners and the harpooner act on their own turns. The harpoon pins a flyer so both cannons can hit it next round. Use it on diving dragons and devils.",
      "Smart enemies go for the crew, not the hull. Every dead gunner is a silent cannon. Devils that reach the Core go for Jeremy. Ser Lucan's Keep the Watch exists for this.",
      "Say the threshold out loud. \"The bolt pings off the plating\" tells the players small hits don't matter, and makes the big ones land harder.",
      "At 175 hit points she lists and burns. Describe the smoke. Damage Control now matters every round.",
      "The Overdrive is a player's call, said out loud. Never suggest it twice. If the party built the mercy engine, the Grace Drive replaces it (see {@side ship-upgrades|Ship Upgrades}).",
      "At 0 hit points she goes down. Count the round out loud so everyone knows how long they have to get off."
    ]
  },

  "jeremy": {
    name: "Jeremy",
    kind: "jeremy",
    role: "Gondian gnome engineer, master of the Lady Vengeance's Planar Core",
    source: { page: "bestiary", name: "Jeremy", src: "HB" },
    npc: true,
    homebrew: "Not a fighter. Intelligence (tinker's tools) +10, Intelligence (Arcana) +7, passive Perception 12. If something attacks him: AC 12, 38 hit points, and he ducks behind the Core (three-quarters cover). He can only build what he has a schematic for (see Jeremy Learns).",
    description: "A gnome in a leather apron scorched black at the hem, up to his elbows in the ship's open flank. Goggles are pushed up into soot-grey hair. A fat notebook stuffed with loose pages hangs from his belt on a chain. He talks to the ship more kindly than he talks to people.",
    roleplay: [
      "Appearance: small, quick, always filthy. Burn scars on both forearms. Never without the notebook.",
      "Voice: gruff and fast. Swears at the machine, then apologises to it. Calls the ship \"she\" and \"the old girl\". Rarely looks up from the work while he talks.",
      "Wants: to keep her flying, and to fly her clean. He is a Gondian, an artificer of Gond, and Gondians built the hellships to run on reagents and the weave. The Portyr sponsors who paid for her wanted soul coins. Jeremy studied the hell-machines and built the Overdrive for them. He has not forgiven himself.",
      "Knows: every rivet of the ship. How to un-coin a soul the Gondian way, slowly, at the Core. How he built Ser Lucan's legs with Aurora's help. That the metal he needs is in wrecks, devils, Bel's Forge and the Rust Queen's hoard.",
      "Keeps: the notebook. Every fuel, every fault, every repair. He writes down the name of every soul he frees. The Overdrive page has a column of tally marks and no names.",
      "Sample line: \"She'll fly. At half a limp, with one fist, but she'll fly. Don't ask her to run.\"",
      "Sample line: \"That one's got about four hours of thrust in it. You want to fly, or you want to be squeamish?\"",
      "Sample line: \"Give me the coin and a scroll and an hour, and whoever's in there walks out. Or give me the coin and ten seconds. Your call. It's always your call.\""
    ],
    tactics: [
      "In a fight, goes straight to the Core and stays there. His action every round is Maintain Core (+10 against DC 15). He switches to Damage Control (+10 against DC 13) only when she is burning or below half.",
      "Never burns a soul coin on his own. A player must ask. He asks back once, \"You sure?\", then does it, and makes a mark in the notebook.",
      "If the party built the mercy engine, he pushes the Grace Drive instead, and says so loudly.",
      "If a devil reaches the Core, he yells for help and keeps working. He never leaves the Core while she is in the air.",
      "Between fights he does three things: repairs, salvage (he is the best salvager aboard) and building upgrades. He also un-coins souls, one an hour, with the ship grounded, burning a spell scroll or 50 gp of reagents for each. Only an archdevil's coin needs a check: DC 16 Arcana, and a failure just means try again tomorrow."
    ]
  }

});

Object.assign(window.CAMPAIGN.side, {

  "infernal-metal": {
    title: "Infernal Metal",
    blocks: [
      { t: "p", text: "Infernal metal is Avernian iron that has soaked in hellfire for centuries. It stays warm to the touch, rings like a bell when struck, and holds an enchantment the way a sponge holds water. Hell forges its war machines, weapons and armour from it, and Gondian craft can rework it." },
      { t: "p", text: "{@c jeremy|Jeremy} counts it in {@b pieces}. One piece is a plate or ingot about the size of an axe head, roughly 10 pounds. Every ship upgrade costs pieces (see {@side ship-upgrades|Ship Upgrades}), and so do repairs: one piece per hour of repair work. The party has to choose between patching the hull and building something new." },
      { t: "note", title: "Starting Stake", text: "Nothing is on the books yet. If the party hauled salvage off earlier wrecks, give them {@dice 2d6} pieces to start. A full refit of the ship takes about 140 pieces. A session with one wreck, one fight and one site on it should yield 25 to 40." },

      { t: "h", text: "Salvaging Wrecked War Machines" },
      { t: "p", text: "The plains of Avernus are littered with dead war machines. On each travel day, roll a d6. On a 5 or 6, a wreck lies within an hour of the route. Roll a d6 for its size: 1 to 3 small, 4 or 5 medium, 6 big. A war machine the party wrecks in a fight counts too, and if they strip it within the hour, the salvage check has advantage." },
      { t: "table", caption: "Wreck yields", head: ["Wreck", "Examples", "Yield (success)", "Time", "DC"], rows: [
        ["Small", "Devil's ride, tormentor", "{@dice 1d4}", "1 hour", "12"],
        ["Medium", "Demon grinder, scavenger, a patrol's war rig", "{@dice 2d6}", "4 hours", "14"],
        ["Big", "A warlord's fortress-machine, the Wrecked Flying Fortress", "{@dice 4d6} a day, for up to 3 days", "8 hours a day", "16"]
      ] },
      { t: "h", text: "How to Salvage" },
      { t: "steps", items: [
        "{@b Look before you cut.} One character makes a DC 13 Wisdom (Perception) or Intelligence (Investigation) check on the wreck. On a failure, roll {@dice 1d4} for a hazard: {@b 1} the furnace is still lit (the first salvager takes {@dice 3d6} fire); {@b 2} something nests inside (roll on the travel encounter table); {@b 3} the frame is unstable (the salvage check has disadvantage); {@b 4} a soul coin still sits in the dead furnace, whispering. On a success, they spot the hazard and avoid it. A soul coin is found either way.",
        "{@b Pick the salvager.} One character makes the check: Intelligence with smith's or tinker's tools, Intelligence (Arcana), or Strength (Athletics) to tear it apart by force. Jeremy can do it himself (+10), but then he is off the ship. Anyone else who helps for the whole time gives advantage.",
        "{@b Spend the time.} See the table. A big wreck takes a full day for each roll. Every hour here is an hour on the campaign clocks.",
        "{@b Roll against the DC.} Success: roll the full yield. Failure: half the yield, rounded down. Failure by 5 or more: the frame collapses or the furnace blows. The salvager makes a DC 15 Dexterity saving throw, taking {@dice 4d6} bludgeoning damage on a failure or half on a success, and the yield is lost (on a big wreck, only that day's yield).",
        "{@b Load it.} Ten pounds a piece. The hold takes 200 pieces. Write the total on the campaign tracker."
      ] },

      { t: "h", text: "Stripping Devils and Constructs" },
      { t: "p", text: "Devils who carry hell-forged weapons or armour, and constructs made of iron, are walking stockpiles. The check is Intelligence (Religion) for a fiend, Intelligence (Arcana) for a construct, or Intelligence with smith's tools for either. The DC is 10 + half the creature's challenge rating. Success yields everything; failure yields half, rounded down; failure by 5 or more ruins it all. Time depends on size: 1 hour for Medium, 2 for Large, 4 for Huge." },
      { t: "table", caption: "Yield by foe", head: ["Foe", "Examples", "Yield"], rows: [
        ["Armed lesser devil (CR 1 to 5)", "Bearded devil's glaive, merregon's armour", "1 piece (no check, 10 minutes)"],
        ["Armed greater devil (CR 6 to 12)", "Horned devil's fork, a war devil's harness", "{@dice 1d4}"],
        ["Infernal champion (CR 13+)", "A narzugon's armour, lance and hell-tack; a pit fiend's mace", "{@dice 2d4}"],
        ["Helmed horror", "Bel's Forge, Zariel's sentries", "{@dice 1d4}"],
        ["Iron golem or forge construct", "Bel's Forge, the Wrecked Flying Fortress", "{@dice 4d6}"]
      ] },
      { t: "p", text: "Devils made of flesh and bone (spined devils, bone devils, imps) carry nothing worth melting down." },

      { t: "h", text: "Buying It" },
      { t: "table", caption: "Sellers", head: ["Seller", "Price", "Stock", "The catch"], rows: [
        ["Mahadi's scrap-dealers, the Wandering Emporium", "150 gp a piece", "{@dice 2d6} a visit; new stock each time the Emporium moves (about weekly)", "None. They buy salvage back at 50 gp."],
        ["Mad Maggie, Fort Knucklebone", "No gold, ever. One secret or one memory", "{@dice 1d6+2} pieces for each, up to 3 a visit", "A memory sold to Maggie is gone for good. The player picks it; the DM decides how its loss shows."],
        ["Bel's quartermasters, Bel's Forge", "1 soul coin for 5 pieces, or 300 gp a piece", "Up to 30 a visit", "Bel burns the coins in his furnaces. Say so."],
        ["The Rust Queen", "300 gp a piece", "Up to 40", "One ingot in every sale carries a tracking rune (DC 18 Arcana to find). After that she always knows where the ship is."]
      ] },

      { t: "h", text: "Quest Rewards" },
      { t: "list", items: [
        "{@b The Wrecked Flying Fortress, a return trip.} The rods are gone, but her hull is a big wreck: 3 days of salvage. Zariel's patrols watch it. Each day, roll a d6; on a 1 or 2 a patrol arrives.",
        "{@b Zariel's patrol war machines.} Each one the party wrecks is a medium wreck, salvaged with advantage if they strip it within the hour. Their infernal cannon barrels are the rare part for Blast Shells.",
        "{@b The Rust Queen's hoard.} If they beat her or rob her: 40 pieces and one set of adamantine bars (the rare part for the Adamantine Keel). She also holds a captured Gondian mechanic.",
        "{@b Bel.} Pays 20 pieces for any service he asks of them, on top of his other terms.",
        "{@b Mahadi.} Any job he offers can pay 10 pieces instead of its gold.",
        "{@b Kharzug's midden, the Weeping Furrow.} {@dice 1d6} pieces of salvage iron among the bones.",
        "{@b Arkhan's Tower.} Krull's workshops hold 10 pieces. He trades them only if the party left on good terms."
      ] },

      { t: "h", text: "Losing It" },
      { t: "list", items: [
        "{@b Rust monsters.} If the Rust Queen sends a swarm and the hold is left unguarded overnight, they eat {@dice 2d6} pieces before anyone wakes.",
        "{@b Scrap-riders.} The Rust Queen's boarders go for the hold first. If they get away, so does half the metal aboard."
      ] }
    ]
  },

  "ship-upgrades": {
    title: "Ship Upgrades",
    blocks: [
      { t: "p", text: "The {@c lady-vengeance|Lady Vengeance} can be improved along four tracks: Armament, Hull & Defence, Engine & Mobility, and the Soul Engine. Each track has three tiers, and each tier needs the one below it. Every upgrade costs pieces of {@side infernal-metal|infernal metal}, sometimes a rare part, and days of work. {@c jeremy|Jeremy} can only build an upgrade if he has its schematic (see {@side jeremy-learns|Jeremy Learns})." },

      { t: "h", text: "How to Install an Upgrade" },
      { t: "steps", items: [
        "{@b Check the schematic.} Jeremy must know it, unless Mad Maggie or Bel does the fitting (see the table below).",
        "{@b Check the tier.} The tier below in the same track must already be installed.",
        "{@b Pay the cost.} Take the metal and any rare part out of the hold. They are committed now.",
        "{@b Pick a place.} Tier I and II upgrades can be built in the hold while the ship travels. Tier III needs her grounded at a safe berth: the Wandering Emporium, Fort Knucklebone, or Bel's Forge. Every day of work is a day on the campaign clocks.",
        "{@b Count the days.} A character with smith's or tinker's tools who works the whole build gives Jeremy advantage on the install check. Each casting of {@spell fabricate} does one day's work (minimum 1 day).",
        "{@b Roll the install check.} On the last day, Jeremy makes an Intelligence (tinker's tools) check (+10) against the upgrade's DC.",
        "{@b Success:} it works. Read the first-firing box if there is one. {@b Failure:} a quarter of the metal is ruined (round up) and must be replaced, and he works half the days again before rolling again. {@b Failure by 5 or more:} it blows on the test firing. The ship takes {@dice 3d10} force damage, half the metal is lost, and the rare part survives.",
        "{@b Taking one out.} Jeremy can strip an upgrade in 1 day and recover half its metal. Rare parts are lost."
      ] },
      { t: "table", caption: "Who can fit an upgrade", head: ["Fitter", "Where", "What", "Price", "Check"], rows: [
        ["Jeremy", "Anywhere (tier III grounded)", "Anything he has the schematic for", "Metal and parts only", "He rolls the install check"],
        ["Mad Maggie, with Chukka and Clonk", "Fort Knucklebone", "Tier I and II Armament, Hull and Engine", "Metal, parts, and one secret or memory per tier", "None, it always works. Roll a d6: on a 1 the kenku add something nobody asked for (a horn that honks every cannon shot, a redcap stowaway). Jeremy learns the schematic by watching."],
        ["Bel", "Bel's Forge", "Any tier, any track except the mercy path, in half the time", "Metal, parts, and 1 soul coin per tier or a service", "None. Every part carries his forge-mark, and through it he always knows where the ship is. He never lies: asked straight, he says so. Jeremy learns the schematic by watching."]
      ] },

      { t: "h", text: "Track 1: Armament" },
      { t: "table", caption: "Armament", head: ["Tier", "Upgrade", "Metal", "Rare part", "Days", "Install DC", "Fitted by"], rows: [
        ["I", "Flak Mortars", "6", "None", "1", "13", "Jeremy, Maggie, Bel"],
        ["II", "Blast Shells", "12", "An infernal cannon barrel", "3", "15", "Jeremy, Maggie, Bel"],
        ["III", "Spinal Lance", "20", "A fiend's heart (CR 11 or higher)", "7", "18", "Jeremy, Bel"]
      ] },
      { t: "p", text: "{@b Flak Mortars (anti-air).} Two short mortars on the rails, one crew each (half cover). {@b Flak Burst} (action): the gunner picks a point in the air within 300 ft. Each creature in a 20-foot-radius sphere there makes a DC 15 Dexterity saving throw, taking 22 (4d10) piercing damage on a failure or half on a success. A flier that fails can't move closer to the ship until the start of its next turn. {@b Flak Screen} (reaction, once per round per mortar): when a flying creature the gunner can see moves within 60 ft. of the ship, it makes the same save or takes 11 (2d10) piercing damage and its speed is halved until the end of its turn. This is the answer to diving dragons and devils." },
      { t: "read", text: "Jeremy slaps the firing plate and both mortars cough at once. Two black shells climb into the red sky and burst into a ragged cloud of iron splinters. For a moment, the air above the ship rains metal. Something screams up there.\n\nJeremy does not look up. \"That's for the dragons,\" he says. \"Let them dive now.\"" },
      { t: "p", text: "{@b Blast Shells.} Each force cannon gains a second firing mode, adapted from the infernal cannons Zariel's patrols carry. {@b Blast Shell} (a gunner's action, instead of a normal shot): pick a point within 600 ft. Each creature and vehicle in a 20-foot radius makes a DC 16 Dexterity saving throw, taking 33 (6d10) force damage on a failure or half on a success. A Large or smaller creature that fails is pushed 10 ft. from the centre and knocked prone; if it was flying, it drops 10 ft. instead. A war machine that fails suffers a mishap." },
      { t: "p", text: "{@b Spinal Lance.} A Gondian lance runs the length of the keel and fires from the bow. It starts each fight charged. Firing it takes two actions in the same round: the engineer's (charging, which counts as a failed Maintain Core) and a gunner's at the bow. The lance blasts a line 300 ft. long and 10 ft. wide straight ahead, so the pilot must point the ship. Each creature and vehicle in the line makes a DC 18 Dexterity saving throw, taking 66 (12d10) force damage on a failure or half on a success. The lance ignores damage thresholds and deals double damage to objects and war machines. After firing, roll a d6 at the start of each round; on a 6 it is charged again." },

      { t: "h", text: "Track 2: Hull & Defence" },
      { t: "table", caption: "Hull & Defence", head: ["Tier", "Upgrade", "Metal", "Rare part", "Days", "Install DC", "Fitted by"], rows: [
        ["I", "Riveted Plating", "5", "None", "1", "13", "Jeremy, Maggie, Bel"],
        ["II", "Hellfire Rails", "10", "None", "3", "15", "Jeremy, Maggie, Bel"],
        ["III", "Adamantine Keel", "18", "A set of adamantine bars", "10", "18", "Jeremy, Bel"]
      ] },
      { t: "p", text: "{@b Riveted Plating.} Her hit point maximum rises from 350 to 400 (bloodied at 200), and her mishap threshold from 30 to 40." },
      { t: "p", text: "{@b Hellfire Rails.} Iron rails ring the hull, wired to the Core. {@b Shock the Rails} (the engineer's bonus action, 3 times per fight): each hostile creature touching the outer hull, rails or rigging (clinging, climbing, landing or biting) makes a DC 16 Constitution saving throw, taking 22 (4d10) lightning damage on a failure or half on a success. A creature that fails lets go, and falls if it can't fly. Crew and allies wearing one of Jeremy's copper grounding tags are safe. He makes a dozen." },
      { t: "p", text: "{@b Adamantine Keel.} Her AC rises from 17 to 19 and her damage threshold from 15 to 20. Any critical hit against her becomes a normal hit. Rust monsters and the Rust Queen's corrosion can't harm her hull. The bars come from the Rust Queen's hoard, or from Bel's stores at his price." },

      { t: "h", text: "Track 3: Engine & Mobility" },
      { t: "table", caption: "Engine & Mobility", head: ["Tier", "Upgrade", "Metal", "Rare part", "Days", "Install DC", "Fitted by"], rows: [
        ["I", "Tuned Vanes", "6", "None", "1", "13", "Jeremy, Maggie, Bel"],
        ["II", "Gyro Helm", "10", "None", "3", "15", "Jeremy, Maggie, Bel"],
        ["III", "Weave Jump", "18", "A celestial shard, or one dose of Tears of the Caged Star", "7", "18", "Jeremy only"]
      ] },
      { t: "p", text: "{@b Tuned Vanes.} Her flying speed rises from 40 to 60 ft. (120 ft. under Overdrive). Overclock gets easier: the DC drops from 18 to 15." },
      { t: "p", text: "{@b Gyro Helm.} {@b Evasive Bank} (the pilot's reaction, 3 times per fight): when an attack roll is made against the ship, it has disadvantage; or when she makes a Dexterity saving throw, she has advantage. In a chase she gets 3 extra Dash actions before anyone checks for exhaustion, and the DM rerolls any chase complication that only makes sense on the ground." },
      { t: "p", text: "{@b Weave Jump.} Once per long rest, as an action, the engineer makes a DC 16 Intelligence (Arcana) check (Jeremy +7). Success: the ship and everyone aboard teleport up to 1 mile, to a point Jeremy can see or has stood on in the last day. Failure: she still jumps, but lands {@dice 1d10} × 100 ft. off course in a random direction and takes 22 (4d10) force damage. In the escape from Avernus, a successful jump counts as one success on the escape checks. No devil knows this trick; it comes from the githzerai." },

      { t: "h", text: "Track 4: The Soul Engine" },
      { t: "p", text: "The Core's heart. Tier I is neutral. At tier II the party must choose a path: {@b mercy} (the Gondian way, which runs on freed souls) or {@b Portyr} (the sponsors' way, which runs on burned ones). Jeremy will not build both into one Core; they would tear it apart. Switching paths means stripping the old tiers first." },
      { t: "table", caption: "The Soul Engine", head: ["Tier", "Upgrade", "Metal", "Rare part", "Days", "Install DC", "Fitted by"], rows: [
        ["I", "Ballast Chamber", "4", "None", "1", "13", "Jeremy only"],
        ["II (mercy)", "Grace Lantern", "10", "A blessing freely given (see below)", "3", "15", "Jeremy only"],
        ["II (Portyr)", "Soul Injector", "10", "One soul coin, burned to temper it", "3", "15", "Jeremy, Bel"],
        ["III (mercy)", "Choir Core", "22", "A vial of Tears of the Caged Star", "7", "18", "Jeremy only"],
        ["III (Portyr)", "Soul Furnace", "20", "A fiend's heart (CR 11 or higher)", "7", "18", "Jeremy, Bel"]
      ] },
      { t: "p", text: "{@b Ballast Chamber.} A lead-lined, rune-cut vault beside the Core. Un-coining takes 30 minutes a coin instead of an hour, and the ship can fly at half speed while it runs instead of sitting grounded. The vault holds up to 20 soul coins in silence, so Lulu can sleep again. The Overdrive backlashes only on a 1 to 3 instead of 1 to 5." },
      { t: "p", text: "{@b Grace Lantern (mercy).} A glass lantern hangs over the Core. Each time a soul is freed aboard the ship, by Jeremy, Lulu, {@side arc-moonkite|the Moonkite}, Drenwal or anyone, the lantern catches its thanks, and the ship gains 1 Grace. She holds up to 3. {@b Tailwind} (the engineer's bonus action, spend 1 Grace): for 1 minute her speed rises by 20 ft. and her weapons deal an extra {@dice 1d10} radiant damage. In the escape from Avernus, each Grace spent adds +1 to one escape check, on top of the tailwind freed souls already give. The rare part is a blessing given freely: a feather from Lulu, a long rest Aurora and the Moonkite spend at the Core, or one dose of Tears of the Caged Star." },
      { t: "p", text: "{@b Soul Injector (Portyr).} The Overdrive can run twice per fight, and while it runs her weapons deal an extra 3d10 instead of 2d10. The coin can go in from the helm as well as the Core. Every use still destroys a soul. Jeremy builds it if ordered. He does not argue. He stops singing to the ship." },
      { t: "p", text: "{@b Choir Core (mercy): the soul-free Overdrive.} Prerequisite: the Grace Lantern, and at least 10 souls freed aboard the ship by any method. The lantern now holds up to 5 Grace, and the Core un-coins a soul every 10 minutes at full speed. {@b Grace Drive} (the engineer's bonus action, spend 3 Grace, once per fight): for 1 minute her speed doubles, her weapons deal an extra 2d10 radiant damage, any fiend that starts its turn within 30 ft. of the hull takes {@dice 3d10} radiant damage, and allies aboard gain +2 AC and advantage on saves against being charmed or frightened. No backlash roll. No soul is spent. To keep the Grace Drive running, the party has to keep freeing souls." },
      { t: "read", text: "Jeremy opens the lantern's little hatch. There is no scream this time. There is a sound like a crowd drawing breath, and the light that pours out of the Core is gold, not green.\n\nThe deck stops shaking. The Lady Vengeance rises, steady as a held hand, and races forward on a wind that smells, impossibly, of rain. Jeremy opens his notebook and does not write a tally mark." },
      { t: "p", text: "{@b Soul Furnace (Portyr).} Prerequisite: the Soul Injector. {@b Damnation Drive} replaces the Overdrive: it lasts until the end of the fight, her weapons deal an extra 3d10, her aura deals {@dice 3d10} fire and {@dice 3d10} necrotic, and the backlash comes only on a natural 1. Each activation burns two soul coins. Lulu will not stay aboard a ship with this engine in it. She leaves until it is torn out." },
      { t: "note", title: "Running the Fork", text: "Do not hide the choice. Jeremy lays both plans on the table and lets the party pick. He already has the Portyr plans (the sponsors paid for them). The mercy plans must be earned. That is the point: the easy road is right there, and the good one costs effort." },

      { t: "h", text: "Full Refit" },
      { t: "p", text: "{@b Every track maxed: 141 pieces on the mercy path (139 on the Portyr path).} Armament 38, Hull & Defence 33, Engine & Mobility 34, Soul Engine 36 (mercy) or 34 (Portyr). Rare parts: an infernal cannon barrel, a fiend's heart (two on the Portyr path), a set of adamantine bars, a celestial shard or a dose of Tears, a freely given blessing and a vial of Tears (mercy only). At 25 to 40 pieces a session, that is four to six sessions of hard salvage. The tier I upgrades Jeremy already knows cost 21 pieces together: a good first goal." }
    ]
  },

  "jeremy-learns": {
    title: "Jeremy Learns",
    blocks: [
      { t: "p", text: "{@b The rule:} {@c jeremy|Jeremy} can only build an upgrade whose schematic he knows. Each schematic goes in his notebook, and once it is there it stays. Mad Maggie and Bel can fit upgrades he doesn't know, and he learns them by watching." },

      { t: "h", text: "What He Already Knows" },
      { t: "list", items: [
        "Every system the Lady Vengeance already has. He built half of them.",
        "{@b Flak Mortars} (Armament I). Gondian ships always carried them.",
        "{@b Riveted Plating} (Hull I). He has patched her hull a hundred times.",
        "{@b Tuned Vanes} (Engine I). How the Gondian design ran before the Portyr refit.",
        "{@b Ballast Chamber} (Soul Engine I). His own Gondian work.",
        "{@b Soul Injector} (Soul Engine II, Portyr). The sponsors paid for these plans. He hates that he has them."
      ] },

      { t: "h", text: "Four Ways to Learn" },
      { t: "table", caption: "At a glance (DCs for tier I / II / III)", head: ["Way", "Time", "Jeremy's check", "On a failure"], rows: [
        ["Study a working machine", "1 day", "Intelligence (tinker's tools) +10 with advantage, DC 13 / 15 / 18", "The day is spent; try again tomorrow. Fail by 5+: the machine breaks into a wreck."],
        ["Study a wreck", "2 days", "Intelligence (tinker's tools) +10, DC 13 / 15 / 18", "The days are spent. Fail by 5+: he takes it apart wrong and needs another wreck."],
        ["Read blueprints", "1 day per tier", "Tier I and II: automatic. Tier III: Intelligence (Arcana) +7, DC 15", "One more day, then roll again."],
        ["Be taught", "2 days per tier", "None", "Nothing. The teacher's price is paid up front."],
        ["Reverse-engineer in battle", "1 day after the fight", "Intelligence (Arcana) +7, DC 15 / 17 / 20", "Half a schematic: advantage on his next try by any other way. Fail by 5+: he learns it wrong (see below)."]
      ] },
      { t: "p", text: "{@b Studying a machine.} He needs a machine that has the thing. A working one (captured, borrowed, bought) is easier: he can run it and watch it work. A wreck has to be read from the pieces. Blueprints written in Infernal take 2 extra days unless someone aboard reads Infernal." },
      { t: "p", text: "{@b Being taught.} Each teacher has a price and a limit. {@b Mad Maggie} teaches tier I and II Armament, Hull and Engine, for one secret or memory per tier. {@b Bel} teaches anything infernal (never the mercy path), for 1 soul coin per tier or a service; he teaches the Soul Furnace for free, because he wants it built. {@b The Gith's journal}, recovered from his body, teaches only the Weave Jump: his own cramped hand, half of it about the river of mirrors. Reading it takes 2 days, no check, but it is a one-time source — the lesson is spent once learned. {@b A Gondian} teaches the mercy path for free: the tinker who turns up on the road wants a soul-freeing favour first, and the mechanic the Rust Queen holds wants his freedom." },
      { t: "p", text: "{@b Reverse-engineering in battle.} Jeremy must be aboard, conscious, and see the enemy weapon fire at least twice in the same fight. It does not have to hit. After the fight he makes the check. On a failure by 5 or more he learns it wrong, and only the DM knows: the first install check for that upgrade has disadvantage, and if it fails, he finds the flaw and the next try is normal." },
      { t: "read", text: "In the middle of the fight, Jeremy is standing at the rail. Not ducking. Notebook open, pencil moving. A shell bursts forty feet off the bow and he does not even flinch.\n\n\"Again,\" he mutters at the enemy gun. \"Fire again, you beautiful thing. Show me the breech.\"" },

      { t: "h", text: "Where the Schematics Are" },
      { t: "table", caption: "Schematics to find", head: ["Schematic", "Track and tier", "Where in Avernus"], rows: [
        ["Blast Shells", "Armament II", "The infernal cannons on Zariel's patrol war machines (study a wreck, or watch one fire). Bel teaches it. Blueprints in Bel's Forge."],
        ["Spinal Lance", "Armament III", "Blueprints in the keel-vault of the Wrecked Flying Fortress (the flagship carried one). Bel teaches it. Zariel's own fortress fires one in the endgame."],
        ["Hellfire Rails", "Hull II", "Fort Knucklebone: Chukka and Clonk wired Maggie's walls with them, and Maggie teaches it. The rigs of the Rust Queen's scrap-riders."],
        ["Adamantine Keel", "Hull III", "Bel's Forge: his smiths forge Zariel's keels, and Bel teaches it. The keel of the Wrecked Flying Fortress (a big wreck, 2 days of study)."],
        ["Gyro Helm", "Engine II", "Any working devil's ride or tormentor (capture one, or borrow one at Fort Knucklebone). Mahadi sells a blueprint for 1,000 gp."],
        ["Weave Jump", "Engine III", "The Gith's journal, recovered from his body. One-time read, 2 days, no check. Nowhere else in Hell."],
        ["Grace Lantern", "Soul Engine II (mercy)", "Watch Lulu or the Moonkite free a soul aboard the ship: it counts as studying a working machine. The Gondian tinker on the road teaches it for a soul-freeing favour."],
        ["Choir Core", "Soul Engine III (mercy)", "The Gondian mechanic held by the Rust Queen (rescue or ransom him). Or Jeremy designs it himself once he has freed 10 souls with his own hands."],
        ["Soul Furnace", "Soul Engine III (Portyr)", "Bel teaches it, gladly and for free. The engine of any of Zariel's fortress-machines."]
      ] },

      { t: "h", text: "How Jeremy Grows" },
      { t: "p", text: "Gondians write everything down. Every new schematic makes the next one easier. Count the schematics he learns beyond the five he starts with." },
      { t: "list", items: [
        "{@b 3 new schematics: Steady Hands.} Maintain Core becomes a bonus action for him, so he can also do Damage Control or feed a scroll in the same turn.",
        "{@b 5 new schematics: Gond's Eye.} +2 to his install checks, study checks and reverse-engineering checks.",
        "{@b 7 new schematics: Wonderbringer.} Once per long rest, he turns one failed check of his (install, Maintain Core, salvage or study) into a success.",
        "{@b 10 souls freed by his own hand:} he can design the Choir Core with no other source. He writes every one of their names in the notebook."
      ] },
      { t: "note", title: "Track It", text: "Keep two numbers on the campaign tracker: new schematics learned, and souls freed aboard the ship. The first makes Jeremy better. The second unlocks the mercy engine." }
    ]
  }

});
