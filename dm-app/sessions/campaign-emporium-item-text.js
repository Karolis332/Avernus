// Full rules text of the Emporium's stock, for the item pop-up (player screen and DM page).
// Written by tools/build_item_text.py from the SRD 5.1 (CC BY 4.0, see credit): do not edit by hand.
(function () {
  "use strict";
  var TEXT = {
 "credit": "Rules text: System Reference Document 5.1 by Wizards of the Coast LLC, licensed under CC BY 4.0 (creativecommons.org/licenses/by/4.0), via Open5e.",
 "entries": {
  "Spell scroll: Revivify": {
   "type": "Spell scroll: Revivify, 3rd-level conjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Touch  ·  **Components:** V, S, M (Diamonds worth 300gp, which the spell consumes)  ·  **Duration:** Instantaneous",
    "You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can't return to life a creature that has died of old age, nor can it restore any missing body parts."
   ]
  },
  "Spell scroll: Counterspell": {
   "type": "Spell scroll: Counterspell, 3rd-level abjuration",
   "text": [
    "**Casting Time:** 1 reaction, which you take when you see a creature within 60 feet of you casting a spell  ·  **Range:** 60 feet  ·  **Components:** S  ·  **Duration:** Instantaneous",
    "You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a success, the creature's spell fails and has no effect.",
    "**_At Higher Levels._** When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used."
   ]
  },
  "Spell scroll: Banishment": {
   "type": "Spell scroll: Banishment, 4th-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** 60 feet  ·  **Components:** V, S, M (An item distasteful to the target)  ·  **Duration:** Concentration, up to Up to 1 minute",
    "You attempt to send one creature that you can see within range to another plane of existence. The target must succeed on a charisma saving throw or be banished. If the target is native to the plane of existence you're on, you banish the target to a harmless demiplane. While there, the target is incapacitated. The target remains there until the spell ends, at which point the target reappears in the space it left or in the nearest unoccupied space if that space is occupied. If the target is native to a different plane of existence than the one you're on, the target is banished with a faint popping noise, returning to its home plane. If the spell ends before 1 minute has passed, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied. Otherwise, the target doesn't return.",
    "**_At Higher Levels._** When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th."
   ]
  },
  "Spell scroll: Death Ward": {
   "type": "Spell scroll: Death Ward, 4th-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Touch  ·  **Components:** V, S  ·  **Duration:** 8 hours",
    "You touch a creature and grant it a measure of protection from death. The first time the target would drop to 0 hit points as a result of taking damage, the target instead drops to 1 hit point, and the spell ends. If the spell is still in effect when the target is subjected to an effect that would kill it instantaneously without dealing damage, that effect is instead negated against the target, and the spell ends."
   ]
  },
  "Spell scroll: Greater Restoration": {
   "type": "Spell scroll: Greater Restoration, 5th-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Touch  ·  **Components:** V, S, M (Diamond dust worth at least 100gp, which the spell consumes)  ·  **Duration:** Instantaneous",
    "You imbue a creature you touch with positive energy to undo a debilitating effect. You can reduce the target's exhaustion level by one, or end one of the following effects on the target: - One effect that charmed or petrified the target - One curse, including the target's attunement to a cursed magic item - Any reduction to one of the target's ability scores - One effect reducing the target's hit point maximum"
   ]
  },
  "Spell scroll: Dispel Evil and Good": {
   "type": "Spell scroll: Dispel Evil and Good, 5th-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Self  ·  **Components:** V, S, M (Holy water or powdered silver and iron)  ·  **Duration:** Concentration, up to Up to 1 minute",
    "Shimmering energy surrounds and protects you from fey, undead, and creatures originating from beyond the Material Plane. For the duration, celestials, elementals, fey, fiends, and undead have disadvantage on attack rolls against you. You can end the spell early by using either of the following special functions.",
    "**Break Enchantment.** As your action, you touch a creature you can reach that is charmed, frightened, or possessed by a celestial, an elemental, a fey, a fiend, or an undead. The creature you touch is no longer charmed, frightened, or possessed by such creatures.",
    "**Dismissal.** As your action, make a melee spell attack against a celestial, an elemental, a fey, a fiend, or an undead you can reach. On a hit, you attempt to drive the creature back to its home plane. The creature must succeed on a charisma saving throw or be sent back to its home plane (if it isn't there already). If they aren't on their home plane, undead are sent to the Shadowfell, and fey are sent to the Feywild."
   ]
  },
  "Spell scroll: Word of Recall": {
   "type": "Spell scroll: Word of Recall, 6th-level conjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** 5 feet  ·  **Components:** V  ·  **Duration:** Instantaneous",
    "You and up to five willing creatures within 5 feet of you instantly teleport to a previously designated sanctuary. You and any creatures that teleport with you appear in the nearest unoccupied space to the spot you designated when you prepared your sanctuary (see below). If you cast this spell without first preparing a sanctuary, the spell has no effect. You must designate a sanctuary by casting this spell within a location, such as a temple, dedicated to or strongly linked to your deity. If you attempt to cast the spell in this manner in an area that isn't dedicated to your deity, the spell has no effect."
   ]
  },
  "Spell scroll: Heal": {
   "type": "Spell scroll: Heal, 6th-level evocation",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** 60 feet  ·  **Components:** V, S  ·  **Duration:** Instantaneous",
    "Choose a creature that you can see within range. A surge of positive energy washes through the creature, causing it to regain 70 hit points. This spell also ends blindness, deafness, and any diseases affecting the target. This spell has no effect on constructs or undead.",
    "**_At Higher Levels._** When you cast this spell using a spell slot of 7th level or higher, the amount of healing increases by 10 for each slot level above 6th."
   ]
  },
  "Spell scroll: Wind Walk": {
   "type": "Spell scroll: Wind Walk, 6th-level transmutation",
   "text": [
    "**Casting Time:** 1 minute  ·  **Range:** 30 feet  ·  **Components:** V, S, M (Fire and holy water)  ·  **Duration:** 8 hours",
    "You and up to ten willing creatures you can see within range assume a gaseous form for the duration, appearing as wisps of cloud. While in this cloud form, a creature has a flying speed of 300 feet and has resistance to damage from nonmagical weapons. The only actions a creature can take in this form are the Dash action or to revert to its normal form. Reverting takes 1 minute, during which time a creature is incapacitated and can't move. Until the spell ends, a creature can revert to cloud form, which also requires the 1-minute transformation. If a creature is in cloud form and flying when the effect ends, the creature descends 60 feet per round for 1 minute until it lands, which it does safely. If it can't land after 1 minute, the creature falls the remaining distance."
   ]
  },
  "Spell scroll: Raise Dead": {
   "type": "Spell scroll: Raise Dead, 5th-level necromancy",
   "text": [
    "**Casting Time:** 1 hour  ·  **Range:** Touch  ·  **Components:** V, S, M (A diamond worth at least 500gp, which the spell consumes)  ·  **Duration:** Instantaneous",
    "You return a dead creature you touch to life, provided that it has been dead no longer than 10 days. If the creature's soul is both willing and at liberty to rejoin the body, the creature returns to life with 1 hit point. This spell also neutralizes any poisons and cures nonmagical diseases that affected the creature at the time it died. This spell doesn't, however, remove magical diseases, curses, or similar effects; if these aren't first removed prior to casting the spell, they take effect when the creature returns to life. The spell can't return an undead creature to life. This spell closes all mortal wounds, but it doesn't restore missing body parts. If the creature is lacking body parts or organs integral for its survival-its head, for instance-the spell automatically fails. Coming back from the dead is an ordeal. The target takes a -4 penalty to all attack rolls, saving throws, and ability checks. Every time the target finishes a long rest, the penalty is reduced by 1 until it disappears."
   ]
  },
  "Spell scroll: Holy Aura": {
   "type": "Spell scroll: Holy Aura, 8th-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Self  ·  **Components:** V, S, M (A tiny reliquary worth at least 1,000gp containing a sacred relic, such as a scrap of cloth from a saint's robe or a piece of parchment from a religious text)  ·  **Duration:** Concentration, up to Up to 1 minute",
    "Divine light washes out from you and coalesces in a soft radiance in a 30-foot radius around you. Creatures of your choice in that radius when you cast this spell shed dim light in a 5-foot radius and have advantage on all saving throws, and other creatures have disadvantage on attack rolls against them until the spell ends. In addition, when a fiend or an undead hits an affected creature with a melee attack, the aura flashes with brilliant light. The attacker must succeed on a constitution saving throw or be blinded until the spell ends."
   ]
  },
  "Spell scroll: Resurrection": {
   "type": "Spell scroll: Resurrection, 7th-level necromancy",
   "text": [
    "**Casting Time:** 1 hour  ·  **Range:** Touch  ·  **Components:** V, S, M (A diamond worth at least 1,000gp, which the spell consumes)  ·  **Duration:** Instantaneous",
    "You touch a dead creature that has been dead for no more than a century, that didn't die of old age, and that isn't undead. If its soul is free and willing, the target returns to life with all its hit points. This spell neutralizes any poisons and cures normal diseases afflicting the creature when it died. It doesn't, however, remove magical diseases, curses, and the like; if such effects aren't removed prior to casting the spell, they afflict the target on its return to life. This spell closes all mortal wounds and restores any missing body parts. Coming back from the dead is an ordeal. The target takes a -4 penalty to all attack rolls, saving throws, and ability checks. Every time the target finishes a long rest, the penalty is reduced by 1 until it disappears. Casting this spell to restore life to a creature that has been dead for one year or longer taxes you greatly. Until you finish a long rest, you can't cast spells again, and you have disadvantage on all attack rolls, ability checks, and saving throws."
   ]
  },
  "Bag of Holding": {
   "type": "Wondrous item, uncommon",
   "text": [
    "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.",
    "If the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.",
    "Placing a _bag of holding_ inside an extradimensional space created by a _handy haversack_, _portable hole_, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
   ]
  },
  "Decanter of Endless Water": {
   "type": "Wondrous item, uncommon",
   "text": [
    "This stoppered flask sloshes when shaken, as if it contains water. The decanter weighs 2 pounds.",
    "You can use an action to remove the stopper and speak one of three command words, whereupon an amount of fresh water or salt water (your choice) pours out of the flask. The water stops pouring out at the start of your next turn. Choose from the following options:",
    "\"Stream\" produces 1 gallon of water. \"Fountain\" produces 5 gallons of water. \"Geyser\" produces 30 gallons of water that gushes forth in a geyser 30 feet long and 1 foot wide. As a bonus action while holding the decanter, you can aim the geyser at a creature you can see within 30 feet of you. The target must succeed on a DC 13 Strength saving throw or take 1d4 bludgeoning damage and fall prone. Instead of a creature, you can target an object that isn't being worn or carried and that weighs no more than 200 pounds. The object is either knocked over or pushed up to 15 feet away from you."
   ]
  },
  "Handy Haversack": {
   "type": "Wondrous item, rare",
   "text": [
    "This backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet. The large central pouch can hold up to 8 cubic feet or 80 pounds of material. The backpack always weighs 5 pounds, regardless of its contents.",
    "Placing an object in the haversack follows the normal rules for interacting with objects. Retrieving an item from the haversack requires you to use an action. When you reach into the haversack for a specific item, the item is always magically on top.",
    "The haversack has a few limitations. If it is overloaded, or if a sharp object pierces it or tears it, the haversack ruptures and is destroyed. If the haversack is destroyed, its contents are lost forever, although an artifact always turns up again somewhere. If the haversack is turned inside out, its contents spill forth, unharmed, and the haversack must be put right before it can be used again. If a breathing creature is placed within the haversack, the creature can survive for up to 10 minutes, after which time it begins to suffocate.",
    "Placing the haversack inside an extradimensional space created by a _bag of holding_, _portable hole_, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
   ]
  },
  "Mantle of Spell Resistance": {
   "type": "Wondrous item, rare (requires attunement)",
   "text": [
    "You have advantage on saving throws against spells while you wear this cloak."
   ]
  },
  "Ring of Spell Storing": {
   "type": "Ring, rare (requires attunement)",
   "text": [
    "This ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. When found, it contains 1d6 - 1 levels of stored spells chosen by the GM.",
    "Any creature can cast a spell of 1st through 5th level into the ring by touching the ring as the spell is cast. The spell has no effect, other than to be stored in the ring. If the ring can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.",
    "While wearing this ring, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the ring is no longer stored in it, freeing up space."
   ]
  },
  "Instant Fortress": {
   "type": "Wondrous item, rare",
   "text": [
    "You can use an action to place this 1-inch metal cube on the ground and speak its command word. The cube rapidly grows into a fortress that remains until you use an action to speak the command word that dismisses it, which works only if the fortress is empty.",
    "The fortress is a square tower, 20 feet on a side and 30 feet high, with arrow slits on all sides and a battlement atop it. Its interior is divided into two floors, with a ladder running along one wall to connect them. The ladder ends at a trapdoor leading to the roof. When activated, the tower has a small door on the side facing you. The door opens only at your command, which you can speak as a bonus action. It is immune to the _knock_ spell and similar magic, such as that of a _chime of opening_.",
    "Each creature in the area where the fortress appears must make a DC 15 Dexterity saving throw, taking 10d10 bludgeoning damage on a failed save, or half as much damage on a successful one. In either case, the creature is pushed to an unoccupied space outside but next to the fortress. Objects in the area that aren't being worn or carried take this damage and are pushed automatically.",
    "The tower is made of adamantine, and its magic prevents it from being tipped over. The roof, the door, and the walls each have 100 hit points,",
    "immunity to damage from nonmagical weapons excluding siege weapons, and resistance to all other damage. Only a _wish_ spell can repair the fortress (this use of the spell counts as replicating a spell of 8th level or lower). Each casting of _wish_ causes the roof, the door, or one wall to regain 50 hit points."
   ]
  },
  "Carpet of Flying": {
   "type": "Wondrous item, very rare",
   "text": [
    "You can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it.",
    "Four sizes of _carpet of flying_ exist. The GM chooses the size of a given carpet or determines it randomly.",
    {
     "table": [
      [
       "d100",
       "Size",
       "Capacity",
       "Flying Speed"
      ],
      [
       "01-20",
       "3 ft. × 5 ft.",
       "200 lb.",
       "80 feet"
      ],
      [
       "21-55",
       "4 ft. × 6 ft.",
       "400 lb.",
       "60 feet"
      ],
      [
       "56-80",
       "5 ft. × 7 ft.",
       "600 lb.",
       "40 feet"
      ],
      [
       "81-100",
       "6 ft. × 9 ft.",
       "800 lb.",
       "30 feet"
      ]
     ]
    },
    "A carpet can carry up to twice the weight shown on the table, but it flies at half speed if it carries more than its normal capacity."
   ]
  },
  "Talisman of Pure Good": {
   "type": "Wondrous item, legendary (requires attunement by a creature of good alignment)",
   "text": [
    "This talisman is a mighty symbol of goodness. A creature that is neither good nor evil in alignment takes 6d6 radiant damage upon touching the talisman. An evil creature takes 8d6 radiant damage upon touching the talisman. Either sort of creature takes the damage again each time it ends its turn holding or carrying the talisman.",
    "If you are a good cleric or paladin, you can use the talisman as a holy symbol, and you gain a +2 bonus to spell attack rolls while you wear or hold it.",
    "The talisman has 7 charges. If you are wearing or holding it, you can use an action to expend 1 charge from it and choose one creature you can see on the ground within 120 feet of you. If the target is of evil alignment, a flaming fissure opens under it. The target must succeed on a DC 20 Dexterity saving throw or fall into the fissure and be destroyed, leaving no remains. The fissure then closes, leaving no trace of its existence. When you expend the last charge, the talisman disperses into motes of golden light and is destroyed."
   ]
  },
  "Spell scroll: Remove Curse": {
   "type": "Spell scroll: Remove Curse, 3rd-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Touch  ·  **Components:** V, S  ·  **Duration:** Instantaneous",
    "At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner's attunement to the object so it can be removed or discarded."
   ]
  },
  "Spell scroll: Sending": {
   "type": "Spell scroll: Sending, 3rd-level evocation",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Unlimited  ·  **Components:** V, S, M (A short piece of fine copper wire)  ·  **Duration:** 1 round",
    "You send a short message of twenty-five words or less to a creature with which you are familiar. The creature hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables creatures with Intelligence scores of at least 1 to understand the meaning of your message. You can send the message across any distance and even to other planes of existence, but if the target is on a different plane than you, there is a 5 percent chance that the message doesn't arrive."
   ]
  },
  "Spell scroll: Protection from Energy": {
   "type": "Spell scroll: Protection from Energy, 3rd-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Touch  ·  **Components:** V, S  ·  **Duration:** Concentration, up to Up to 1 hour",
    "For the duration, the willing creature you touch has resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder."
   ]
  },
  "Spell scroll: Freedom of Movement": {
   "type": "Spell scroll: Freedom of Movement, 4th-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Touch  ·  **Components:** V, S, M (A leather strap, bound around the arm or a similar appendage)  ·  **Duration:** 1 hour",
    "You touch a willing creature. For the duration, the target's movement is unaffected by difficult terrain, and spells and other magical effects can neither reduce the target's speed nor cause the target to be paralyzed or restrained. The target can also spend 5 feet of movement to automatically escape from nonmagical restraints, such as manacles or a creature that has it grappled. Finally, being underwater imposes no penalties on the target's movement or attacks."
   ]
  },
  "Spell scroll: Dimension Door": {
   "type": "Spell scroll: Dimension Door, 4th-level conjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** 500 feet  ·  **Components:** V  ·  **Duration:** Instantaneous",
    "You teleport yourself from your current location to any other spot within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction, such as \"200 feet straight downward\" or \"upward to the northwest at a 45-degree angle, 300 feet.\" You can bring along objects as long as their weight doesn't exceed what you can carry. You can also bring one willing creature of your size or smaller who is carrying gear up to its carrying capacity. The creature must be within 5 feet of you when you cast this spell. If you would arrive in a place already occupied by an object or a creature, you and any creature traveling with you each take 4d6 force damage, and the spell fails to teleport you."
   ]
  },
  "Spell scroll: Hold Monster": {
   "type": "Spell scroll: Hold Monster, 5th-level enchantment",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** 90 feet  ·  **Components:** V, S, M (A small piece of iron)  ·  **Duration:** Concentration, up to Up to 1 minute",
    "Choose a creature you can see within range. The target must make a saving throw of Wisdom or be paralyzed for the duration of the spell. This spell has no effect against the undead. At the end of each round, the target can make a new saving throw of Wisdom. If successful, the spell ends for the creature.",
    "**_At Higher Levels._** When you cast this spell using a level 6 or higher location, you can target an additional creature for each level of location beyond the fifth. The creatures must be within 30 feet o f each other when you target them."
   ]
  },
  "Spell scroll: Forbiddance": {
   "type": "Spell scroll: Forbiddance, 6th-level abjuration",
   "text": [
    "**Casting Time:** 10 minutes  ·  **Range:** Touch  ·  **Components:** V, S, M (A sprinkling of holy water, rare incense, and powdered ruby worth at least 1,000 gp)  ·  **Duration:** 24 hours",
    "You create a ward against magical travel that protects up to 40,000 square feet of floor space to a height of 30 feet above the floor. For the duration, creatures can't teleport into the area or use portals, such as those created by the gate spell, to enter the area. The spell proofs the area against planar travel, and therefore prevents creatures from accessing the area by way of the Astral Plane, Ethereal Plane, Feywild, Shadowfell, or the plane shift spell. In addition, the spell damages types of creatures that you choose when you cast it. Choose one or more of the following: celestials, elementals, fey, fiends, and undead. When a chosen creature enters the spell's area for the first time on a turn or starts its turn there, the creature takes 5d10 radiant or necrotic damage (your choice when you cast this spell). When you cast this spell, you can designate a password. A creature that speaks the password as it enters the area takes no damage from the spell. The spell's area can't overlap with the area of another forbiddance spell. If you cast forbiddance every day for 30 days in the same location, the spell lasts until it is dispelled, and the material components are consumed on the last casting."
   ]
  },
  "Helm of Comprehending Languages": {
   "type": "Wondrous item, uncommon",
   "text": [
    "While wearing this helm, you can use an action to cast the _comprehend languages_ spell from it at will."
   ]
  },
  "Lantern of Revealing": {
   "type": "Wondrous item, uncommon",
   "text": [
    "While lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5* foot radius."
   ]
  },
  "Cape of the Mountebank": {
   "type": "Wondrous item, rare",
   "text": [
    "This cape smells faintly of brimstone. While wearing it, you can use it to cast the _dimension door_ spell as an action. This property of the cape can't be used again until the next dawn.",
    "When you disappear, you leave behind a cloud of smoke, and you appear in a similar cloud of smoke at your destination. The smoke lightly obscures the space you left and the space you appear in, and it dissipates at the end of your next turn. A light or stronger wind disperses the smoke."
   ]
  },
  "Portable Hole": {
   "type": "Wondrous item, rare",
   "text": [
    "This fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. It unfolds into a circular sheet 6 feet in diameter.",
    "You can use an action to unfold a _portable hole_ and place it on or against a solid surface, whereupon the _portable hole_ creates an extradimensional hole 10 feet deep. The cylindrical space within the hole exists on a different plane, so it can't be used to create open passages. Any creature inside an open _portable hole_ can exit the hole by climbing out of it.",
    "You can use an action to close a _portable hole_ by taking hold of the edges of the cloth and folding it up. Folding the cloth closes the hole, and any creatures or objects within remain in the extradimensional space. No matter what's in it, the hole weighs next to nothing.",
    "If the hole is folded up, a creature within the hole's extradimensional space can use an action to make a DC 10 Strength check. On a successful check, the creature forces its way out and appears within 5 feet of the _portable hole_ or the creature carrying it. A breathing creature within a closed _portable hole_ can survive for up to 10 minutes, after which time it begins to suffocate.",
    "Placing a _portable hole_ inside an extradimensional space created by a _bag of holding_, _handy haversack_, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
   ]
  },
  "Feather Token: anchor": {
   "type": "Wondrous item, rare",
   "text": [
    "This tiny object looks like a feather. Different types of feather tokens exist, each with a different single* use effect. The GM chooses the kind of token or determines it randomly.",
    "**_Anchor_**. You can use an action to touch the token to a boat or ship. For the next 24 hours, the vessel can't be moved by any means. Touching the token to the vessel again ends the effect. When the effect ends, the token disappears."
   ]
  },
  "Feather Token: bird": {
   "type": "Wondrous item, rare",
   "text": [
    "This tiny object looks like a feather. Different types of feather tokens exist, each with a different single* use effect. The GM chooses the kind of token or determines it randomly.",
    "**_Bird_**. You can use an action to toss the token 5 feet into the air. The token disappears and an enormous, multicolored bird takes its place. The bird has the statistics of a roc, but it obeys your simple commands and can't attack. It can carry up to 500 pounds while flying at its maximum speed (16 miles an hour for a maximum of 144 miles per day, with a one-hour rest for every 3 hours of flying), or 1,000 pounds at half that speed. The bird disappears after flying its maximum distance for a day or if it drops to 0 hit points. You can dismiss the bird as an action."
   ]
  },
  "Arrow of Slaying": {
   "type": "Weapon (arrow), very rare",
   "text": [
    "An _arrow of slaying_ is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both _arrows of dragon slaying_ and _arrows of blue dragon slaying_. If a creature belonging to the type, race, or group associated with an _arrow of slaying_ takes damage from the arrow, the creature must make a DC 17 Constitution saving throw, taking an extra 6d10 piercing damage on a failed save, or half as much extra damage on a successful one.",
    "Once an _arrow of slaying_ deals its extra damage to a creature, it becomes a nonmagical arrow.",
    "Other types of magic ammunition of this kind exist, such as _bolts of slaying_ meant for a crossbow, though arrows are most common."
   ]
  },
  "Bracers of Archery": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons."
   ]
  },
  "Efficient Quiver": {
   "type": "Wondrous item, uncommon",
   "text": [
    "Each of the quiver's three compartments connects to an extradimensional space that allows the quiver to hold numerous items while never weighing more than 2 pounds. The shortest compartment can hold up to sixty arrows, bolts, or similar objects. The midsize compartment holds up to eighteen javelins or similar objects. The longest compartment holds up to six long objects, such as bows, quarterstaffs, or spears.",
    "You can draw any item the quiver contains as if doing so from a regular quiver or scabbard."
   ]
  },
  "Dragon Slayer": {
   "type": "Weapon (any sword), rare",
   "text": [
    "You gain a +1 bonus to attack and damage rolls made with this magic weapon.",
    "When you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon's type. For the purpose of this weapon, \"dragon\" refers to any creature with the dragon type, including dragon turtles and wyverns."
   ]
  },
  "Mace of Disruption": {
   "type": "Weapon (mace), rare (requires attunement)",
   "text": [
    "When you hit a fiend or an undead with this magic weapon, that creature takes an extra 2d6 radiant damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature becomes frightened of you until the end of your next turn.",
    "While you hold this weapon, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet."
   ]
  },
  "Adamantine Armor": {
   "type": "Armor (medium or heavy), uncommon",
   "text": [
    "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit."
   ]
  },
  "Armor of Resistance": {
   "type": "Armor (light), rare (requires attunement)",
   "text": [
    "You have resistance to one type of damage while you wear this armor. The GM chooses the type or determines it randomly from the options below.",
    {
     "table": [
      [
       "d10",
       "Damage Type"
      ],
      [
       "1",
       "Acid"
      ],
      [
       "2",
       "Cold"
      ],
      [
       "3",
       "Fire"
      ],
      [
       "4",
       "Force"
      ],
      [
       "5",
       "Lightning"
      ],
      [
       "6",
       "Necrotic"
      ],
      [
       "7",
       "Poison"
      ],
      [
       "8",
       "Psychic"
      ],
      [
       "9",
       "Radiant"
      ],
      [
       "10",
       "Thunder"
      ]
     ]
    }
   ]
  },
  "Dragon Scale Mail": {
   "type": "Armor (scale mail), very rare (requires attunement)",
   "text": [
    "Dragon scale mail is made of the scales of one kind of dragon. Sometimes dragons collect their cast-off scales and gift them to humanoids. Other times, hunters carefully skin and preserve the hide of a dead dragon. In either case, dragon scale mail is highly valued.",
    "While wearing this armor, you gain a +1 bonus to AC, you have advantage on saving throws against the Frightful Presence and breath weapons of dragons, and you have resistance to one damage type that is determined by the kind of dragon that provided the scales (see the table).",
    "Additionally, you can focus your senses as an action to magically discern the distance and direction to the closest dragon within 30 miles of you that is of the same type as the armor. This special action can't be used again until the next dawn.",
    {
     "table": [
      [
       "Dragon",
       "Resistance"
      ],
      [
       "Black",
       "Acid"
      ],
      [
       "Blue",
       "Lightning"
      ],
      [
       "Brass",
       "Fire"
      ],
      [
       "Bronze",
       "Lightning"
      ],
      [
       "Copper",
       "Acid"
      ],
      [
       "Gold",
       "Fire"
      ],
      [
       "Green",
       "Poison"
      ],
      [
       "Red",
       "Fire"
      ],
      [
       "Silver",
       "Cold"
      ],
      [
       "White",
       "Cold"
      ]
     ]
    }
   ]
  },
  "Javelin of Lightning": {
   "type": "Weapon (javelin), uncommon",
   "text": [
    "This javelin is a magic weapon. When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet. Each creature in the line excluding you and the target must make a DC 13 Dexterity saving throw, taking 4d6 lightning damage on a failed save, and half as much damage on a successful one. The lightning bolt turns back into a javelin when it reaches the target. Make a ranged weapon attack against the target. On a hit, the target takes damage from the javelin plus 4d6 lightning damage.",
    "The javelin's property can't be used again until the next dawn. In the meantime, the javelin can still be used as a magic weapon."
   ]
  },
  "Weapon, +1, +2, or +3": {
   "type": "Weapon (any), uncommon (+1), rare (+2), or very rare (+3)",
   "text": [
    "You have a bonus to attack and damage rolls made with this magic weapon. The bonus is determined by the weapon's rarity."
   ]
  },
  "Flame Tongue": {
   "type": "Weapon (any sword), rare (requires attunement)",
   "text": [
    "You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword."
   ]
  },
  "Sun Blade": {
   "type": "Weapon (longsword), rare (requires attunement)",
   "text": [
    "This item appears to be a longsword hilt. While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear. While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with the _sun blade_.",
    "You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage.",
    "The sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each."
   ]
  },
  "Dagger of Venom": {
   "type": "Weapon (dagger), rare",
   "text": [
    "You gain a +1 bonus to attack and damage rolls made with this magic weapon.",
    "You can use an action to cause thick, black poison to coat the blade. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 15 Constitution saving throw or take 2d10 poison damage and become poisoned for 1 minute. The dagger can't be used this way again until the next dawn."
   ]
  },
  "Gauntlets of Ogre Power": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher."
   ]
  },
  "Belt of Giant Strength": {
   "type": "Wondrous item, varies (requires attunement)",
   "text": [
    "While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt's score, the item has no effect on you.",
    "Six varieties of this belt exist, corresponding with and having rarity according to the six kinds of true giants. The _belt of stone giant strength_ and the _belt of frost giant strength_ look different, but they have the same effect.",
    {
     "table": [
      [
       "Type",
       "Strength",
       "Rarity"
      ],
      [
       "Hill giant",
       "21",
       "Rare"
      ],
      [
       "Stone/frost giant",
       "23",
       "Very rare"
      ],
      [
       "Fire giant",
       "25",
       "Very rare"
      ],
      [
       "Cloud giant",
       "27",
       "Legendary"
      ],
      [
       "Storm giant",
       "29",
       "Legendary"
      ]
     ]
    }
   ]
  },
  "Arrow-Catching Shield": {
   "type": "Armor (shield), rare (requires attunement)",
   "text": [
    "You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead."
   ]
  },
  "Glamoured Studded Leather": {
   "type": "Armor (studded leather), rare",
   "text": [
    "While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor's command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like, including color, style, and accessories, but the armor retains its normal bulk and weight. The illusory appearance lasts until you use this property again or remove the armor."
   ]
  },
  "Horseshoes of Speed": {
   "type": "Wondrous item, rare",
   "text": [
    "These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they increase the creature's walking speed by 30 feet."
   ]
  },
  "Potion of Healing": {
   "type": "Potion, varies",
   "text": [
    "You regain hit points when you drink this potion. The number of hit points depends on the potion's rarity, as shown in the Potions of Healing table. Whatever its potency, the potion's red liquid glimmers when agitated.",
    "**Potions of Healing (table)**",
    {
     "table": [
      [
       "Potion of ...",
       "Rarity",
       "HP Regained"
      ],
      [
       "Healing",
       "Common",
       "2d4 + 2"
      ],
      [
       "Greater healing",
       "Uncommon",
       "4d4 + 4"
      ],
      [
       "Superior healing",
       "Rare",
       "8d4 + 8"
      ],
      [
       "Supreme healing",
       "Very rare",
       "10d4 + 20"
      ]
     ]
    }
   ]
  },
  "Restorative Ointment": {
   "type": "Wondrous item, uncommon",
   "text": [
    "This glass jar, 3 inches in diameter, contains 1d4 + 1 doses of a thick mixture that smells faintly of aloe. The jar and its contents weigh 1/2 pound.",
    "As an action, one dose of the ointment can be swallowed or applied to the skin. The creature that receives it regains 2d8 + 2 hit points, ceases to be poisoned, and is cured of any disease."
   ]
  },
  "Hat of Disguise": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "While wearing this hat, you can use an action to cast the _disguise self_ spell from it at will. The spell ends if the hat is removed."
   ]
  },
  "Spellwrought tattoo: Revivify": {
   "type": "Spellwrought tattoo: Revivify, 3rd-level conjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Touch  ·  **Components:** V, S, M (Diamonds worth 300gp, which the spell consumes)  ·  **Duration:** Instantaneous",
    "You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can't return to life a creature that has died of old age, nor can it restore any missing body parts."
   ]
  },
  "Spellwrought tattoo: Lesser Restoration": {
   "type": "Spellwrought tattoo: Lesser Restoration, 2nd-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Touch  ·  **Components:** V, S  ·  **Duration:** Instantaneous",
    "You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned."
   ]
  },
  "Periapt of Health": {
   "type": "Wondrous item, uncommon",
   "text": [
    "You are immune to contracting any disease while you wear this pendant. If you are already infected with a disease, the effects of the disease are suppressed you while you wear the pendant."
   ]
  },
  "Necklace of Adaptation": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "While wearing this necklace, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors (such as _cloudkill_ and _stinking cloud_ effects, inhaled poisons, and the breath weapons of some dragons)."
   ]
  },
  "Periapt of Proof against Poison": {
   "type": "Wondrous item, rare",
   "text": [
    "This delicate silver chain has a brilliant-cut black gem pendant. While you wear it, poisons have no effect on you. You are immune to the poisoned condition and have immunity to poison damage."
   ]
  },
  "Amulet of Health": {
   "type": "Wondrous item, rare (requires attunement)",
   "text": [
    "Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher."
   ]
  },
  "Stone of Good Luck (Luckstone)": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "While this polished agate is on your person, you gain a +1 bonus to ability checks and saving throws."
   ]
  },
  "Spellwrought tattoo: Death Ward": {
   "type": "Spellwrought tattoo: Death Ward, 4th-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Touch  ·  **Components:** V, S  ·  **Duration:** 8 hours",
    "You touch a creature and grant it a measure of protection from death. The first time the target would drop to 0 hit points as a result of taking damage, the target instead drops to 1 hit point, and the spell ends. If the spell is still in effect when the target is subjected to an effect that would kill it instantaneously without dealing damage, that effect is instead negated against the target, and the spell ends."
   ]
  },
  "Spellwrought tattoo: Pass without Trace": {
   "type": "Spellwrought tattoo: Pass without Trace, 2nd-level abjuration",
   "text": [
    "**Casting Time:** 1 action  ·  **Range:** Self  ·  **Components:** V, S, M (Ashes from a burned leaf of mistletoe and a sprig of spruce)  ·  **Duration:** Concentration, up to Up to 1 hour",
    "A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, each creature you choose within 30 feet of you (including you) has a +10 bonus to Dexterity (Stealth) checks and can't be tracked except by magical means. A creature that receives this bonus leaves behind no tracks or other traces of its passage."
   ]
  },
  "Periapt of Wound Closure": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "While you wear this pendant, you stabilize whenever you are dying at the start of your turn. In addition, whenever you roll a Hit Die to regain hit points, double the number of hit points it restores."
   ]
  },
  "Boots of the Winterlands": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "These furred boots are snug and feel quite warm. While you wear them, you gain the following benefits:",
    "You have resistance to cold damage. You ignore difficult terrain created by ice or snow. You can tolerate temperatures as low as -50 degrees Fahrenheit without any additional protection. If you wear heavy clothes, you can tolerate temperatures as low as -100 degrees Fahrenheit."
   ]
  },
  "Broom of Flying": {
   "type": "Wondrous item, uncommon",
   "text": [
    "This wooden broom, which weighs 3 pounds, functions like a mundane broom until you stand astride it and speak its command word. It then hovers beneath you and can be ridden in the air. It has a flying speed of 50 feet. It can carry up to 400 pounds, but its flying speed becomes 30 feet while carrying over 200 pounds. The broom stops hovering when you land.",
    "You can send the broom to travel alone to a destination within 1 mile of you if you speak the command word, name the location, and are familiar with that place. The broom comes back to you when you speak another command word, provided that the broom is still within 1 mile of you."
   ]
  },
  "Ring of Warmth": {
   "type": "Ring, uncommon (requires attunement)",
   "text": [
    "While wearing this ring, you have resistance to cold damage. In addition, you and everything you wear and carry are unharmed by temperatures as low as -50 degrees Fahrenheit."
   ]
  },
  "Ring of Free Action": {
   "type": "Ring, rare (requires attunement)",
   "text": [
    "While you wear this ring, difficult terrain doesn't cost you extra movement. In addition, magic can neither reduce your speed nor cause you to be paralyzed or restrained."
   ]
  },
  "Ring of Resistance": {
   "type": "Ring, rare (requires attunement)",
   "text": [
    "You have resistance to one damage type while wearing this ring. The gem in the ring indicates the type, which the GM chooses or determines randomly.",
    {
     "table": [
      [
       "d10",
       "Damage Type",
       "Gem"
      ],
      [
       "1",
       "Acid",
       "Pearl"
      ],
      [
       "2",
       "Cold",
       "Tourmaline"
      ],
      [
       "3",
       "Fire",
       "Garnet"
      ],
      [
       "4",
       "Force",
       "Sapphire"
      ],
      [
       "5",
       "Lightning",
       "Citrine"
      ],
      [
       "6",
       "Necrotic",
       "Jet"
      ],
      [
       "7",
       "Poison",
       "Amethyst"
      ],
      [
       "8",
       "Psychic",
       "Jade"
      ],
      [
       "9",
       "Radiant",
       "Topaz"
      ],
      [
       "10",
       "Thunder",
       "Spinel"
      ]
     ]
    }
   ]
  },
  "Ring of Protection": {
   "type": "Ring, rare (requires attunement)",
   "text": [
    "You gain a +1 bonus to AC and saving throws while wearing this ring."
   ]
  },
  "Cloak of Elvenkind": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage you. Pulling the hood up or down requires an action."
   ]
  },
  "Cloak of Protection": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "You gain a +1 bonus to AC and saving throws while you wear this cloak."
   ]
  },
  "Cloak of Displacement": {
   "type": "Wondrous item, rare (requires attunement)",
   "text": [
    "While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you. If you take damage, the property ceases to function until the start of your next turn. This property is suppressed while you are incapacitated, restrained, or otherwise unable to move."
   ]
  },
  "Wand of Magic Missiles": {
   "type": "Wand, uncommon",
   "text": [
    "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the _magic missile_ spell from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.",
    "The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed."
   ]
  },
  "Wand of the War Mage, +1, +2, or +3": {
   "type": "Wand, uncommon (+1), rare (+2), or very rare (+3) (requires attunement by a spellcaster)",
   "text": [
    "While holding this wand, you gain a bonus to spell attack rolls determined by the wand's rarity. In addition, you ignore half cover when making a spell attack."
   ]
  },
  "Wand of Binding": {
   "type": "Wand, rare (requires attunement by a spellcaster)",
   "text": [
    "This wand has 7 charges for the following properties. It regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.",
    "**_Spells_**. While holding the wand, you can use an action to expend some of its charges to cast one of the following spells (save DC 17): _hold monster_ (5 charges) or _hold person_ (2 charges).",
    "**_Assisted Escape_**. While holding the wand, you can use your reaction to expend 1 charge and gain advantage on a saving throw you make to avoid being paralyzed or restrained, or you can expend 1 charge and gain advantage on any check you make to escape a grapple."
   ]
  },
  "Brooch of Shielding": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the _magic missile_ spell."
   ]
  },
  "Pearl of Power": {
   "type": "Wondrous item, uncommon (requires attunement by a spellcaster)",
   "text": [
    "While this pearl is on your person, you can use an action to speak its command word and regain one expended spell slot. If the expended slot was of 4th level or higher, the new slot is 3rd level. Once you use the pearl, it can't be used again until the next dawn."
   ]
  },
  "Necklace of Prayer Beads": {
   "type": "Wondrous item, rare (requires attunement by a cleric, druid, or paladin)",
   "text": [
    "This necklace has 1d4 + 2 magic beads made from aquamarine, black pearl, or topaz. It also has many nonmagical beads made from stones such as amber, bloodstone, citrine, coral, jade, pearl, or quartz. If a magic bead is removed from the necklace, that bead loses its magic.",
    "Six types of magic beads exist. The GM decides the type of each bead on the necklace or determines it randomly. A necklace can have more than one bead of the same type. To use one, you must be wearing the necklace. Each bead contains a spell that you can cast from it as a bonus action (using your spell save DC if a save is necessary). Once a magic bead's spell is cast, that bead can't be used again until the next dawn.",
    {
     "table": [
      [
       "d20",
       "Bead of...",
       "Spell"
      ],
      [
       "1-6",
       "Blessing",
       "Bless"
      ],
      [
       "7-12",
       "Curing",
       "Cure wounds (2nd level) or lesser restoration"
      ],
      [
       "13-16",
       "Favor",
       "Greater restoration"
      ],
      [
       "17-18",
       "Smiting",
       "Branding smite"
      ],
      [
       "19",
       "Summons",
       "Planar ally"
      ],
      [
       "20",
       "Wind walking",
       "Wind walk"
      ]
     ]
    }
   ]
  },
  "Staff of Healing": {
   "type": "Staff, rare (requires attunement by a bard, cleric, or druid)",
   "text": [
    "This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spellcasting ability modifier: _cure wounds_ (1 charge per spell level, up to 4th), _lesser restoration_ (2 charges), or _mass cure wounds_ (5 charges).",
    "The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff vanishes in a flash of light, lost forever."
   ]
  },
  "Iron Flask": {
   "type": "Wondrous item, legendary",
   "text": [
    "This iron bottle has a brass stopper. You can use an action to speak the flask's command word, targeting a creature that you can see within 60 feet of you. If the target is native to a plane of existence other than the one you're on, the target must succeed on a DC 17 Wisdom saving throw or be trapped in the flask. If the target has been trapped by the flask before, it has advantage on the saving throw. Once trapped, a creature remains in the flask until released. The flask can hold only one creature at a time. A creature trapped in the flask doesn't need to breathe, eat, or drink and doesn't age.",
    "You can use an action to remove the flask's stopper and release the creature the flask contains. The creature is friendly to you and your companions for 1 hour and obeys your commands for that duration. If you give no commands or give it a command that is likely to result in its death, it defends itself but otherwise takes no actions. At the end of the duration, the creature acts in accordance with its normal disposition and alignment.",
    "An _identify_ spell reveals that a creature is inside the flask, but the only way to determine the type of creature is to open the flask. A newly discovered bottle might already contain a creature chosen by the GM or determined randomly.",
    {
     "table": [
      [
       "d100",
       "Contents"
      ],
      [
       "1-50",
       "Empty"
      ],
      [
       "51-54",
       "Demon (type 1)"
      ],
      [
       "55-58",
       "Demon (type 2)"
      ],
      [
       "59-62",
       "Demon (type 3)"
      ],
      [
       "63-64",
       "Demon (type 4)"
      ],
      [
       "65",
       "Demon (type 5)"
      ],
      [
       "66",
       "Demon (type 6)"
      ],
      [
       "67",
       "Deva"
      ],
      [
       "68-69",
       "Devil (greater)"
      ],
      [
       "70-73",
       "Devil (lesser)"
      ],
      [
       "74-75",
       "Djinni"
      ],
      [
       "76-77",
       "Efreeti"
      ],
      [
       "78-83",
       "Elemental (any)"
      ],
      [
       "84-86",
       "Invisible stalker"
      ],
      [
       "87-90",
       "Night hag"
      ],
      [
       "91",
       "Planetar"
      ],
      [
       "92-95",
       "Salamander"
      ],
      [
       "96",
       "Solar"
      ],
      [
       "97-99",
       "Succubus/incubus"
      ],
      [
       "100",
       "Xorn"
      ]
     ]
    }
   ]
  },
  "Ring of Mind Shielding": {
   "type": "Ring, uncommon (requires attunement)",
   "text": [
    "While wearing this ring, you are immune to magic that allows other creatures to read your thoughts, determine whether you are lying, know your alignment, or know your creature type. Creatures can telepathically communicate with you only if you allow it.",
    "You can use an action to cause the ring to become invisible until you use another action to make it visible, until you remove the ring, or until you die.",
    "If you die while wearing the ring, your soul enters it, unless it already houses a soul. You can remain in the ring or depart for the afterlife. As long as your soul is in the ring, you can telepathically communicate with any creature wearing it. A wearer can't prevent this telepathic communication."
   ]
  },
  "Ring of Feather Falling": {
   "type": "Ring, rare (requires attunement)",
   "text": [
    "When you fall while wearing this ring, you descend 60 feet per round and take no damage from falling."
   ]
  },
  "Ring of Evasion": {
   "type": "Ring, rare (requires attunement)",
   "text": [
    "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. When you fail a Dexterity saving throw while wearing it, you can use your reaction to expend 1 of its charges to succeed on that saving throw instead."
   ]
  },
  "Winged Boots": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "While you wear these boots, you have a flying speed equal to your walking speed. You can use the boots to fly for up to 4 hours, all at once or in several shorter flights, each one using a minimum of 1 minute from the duration. If you are flying when the duration expires, you descend at a rate of 30 feet per round until you land.",
    "The boots regain 2 hours of flying capability for every 12 hours they aren't in use."
   ]
  },
  "Boots of Speed": {
   "type": "Wondrous item, rare (requires attunement)",
   "text": [
    "While you wear these boots, you can use a bonus action and click the boots' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect.",
    "When the boots' property has been used for a total of 10 minutes, the magic ceases to function until you finish a long rest."
   ]
  },
  "Wings of Flying": {
   "type": "Wondrous item, rare (requires attunement)",
   "text": [
    "While wearing this cloak, you can use an action to speak its command word. This turns the cloak into a pair of bat wings or bird wings on your back for 1 hour or until you repeat the command word as an action. The wings give you a flying speed of 60 feet. When they disappear, you can't use them again for 1d12 hours."
   ]
  },
  "Bracers of Defense": {
   "type": "Wondrous item, rare (requires attunement)",
   "text": [
    "While wearing these bracers, you gain a +2 bonus to AC if you are wearing no armor and using no shield."
   ]
  },
  "Wand of Lightning Bolts": {
   "type": "Wand, rare (requires attunement by a spellcaster)",
   "text": [
    "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the _lightning bolt_ spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.",
    "The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed."
   ]
  },
  "Immovable Rod": {
   "type": "Rod, uncommon",
   "text": [
    "This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success."
   ]
  },
  "Wand of Secrets": {
   "type": "Wand, uncommon",
   "text": [
    "The wand has 3 charges. While holding it, you can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of you, the wand pulses and points at the one nearest to you. The wand regains 1d3 expended charges daily at dawn."
   ]
  },
  "Ioun Stone: protection": {
   "type": "Wondrous item, varies (requires attunement)",
   "text": [
    "An _Ioun stone_ is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of _Ioun stone_ exist, each type a distinct combination of shape and color.",
    "When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.",
    "A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.",
    "**_Protection (Rare)_**. You gain a +1 bonus to AC while this dusty rose prism orbits your head."
   ]
  },
  "Ioun Stone: awareness": {
   "type": "Wondrous item, varies (requires attunement)",
   "text": [
    "An _Ioun stone_ is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of _Ioun stone_ exist, each type a distinct combination of shape and color.",
    "When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.",
    "A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.",
    "**_Awareness (Rare)_**. You can't be surprised while this dark blue rhomboid orbits your head."
   ]
  },
  "Ioun Stone: reserve": {
   "type": "Wondrous item, varies (requires attunement)",
   "text": [
    "An _Ioun stone_ is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of _Ioun stone_ exist, each type a distinct combination of shape and color.",
    "When you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.",
    "A stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.",
    "**_Reserve (Rare)_**. This vibrant purple prism stores spells cast into it, holding them until you use them. The stone can store up to 3 levels worth of spells at a time. When found, it contains 1d4 - 1 levels of stored spells chosen by the GM.",
    "Any creature can cast a spell of 1st through 3rd level into the stone by touching it as the spell is cast. The spell has no effect, other than to be stored in the stone. If the stone can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.",
    "While this stone orbits your head, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the stone is no longer stored in it, freeing up space."
   ]
  },
  "Gem of Seeing": {
   "type": "Wondrous item, rare (requires attunement)",
   "text": [
    "This gem has 3 charges. As an action, you can speak the gem's command word and expend 1 charge. For the next 10 minutes, you have truesight out to 120 feet when you peer through the gem.",
    "The gem regains 1d3 expended charges daily at dawn."
   ]
  },
  "Amulet of Proof against Detection and Location": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "While wearing this amulet, you are hidden from divination magic. You can't be targeted by such magic or perceived through magical scrying sensors."
   ]
  },
  "Medallion of Thoughts": {
   "type": "Wondrous item, uncommon (requires attunement)",
   "text": [
    "The medallion has 3 charges. While wearing it, you can use an action and expend 1 charge to cast the _detect thoughts_ spell (save DC 13) from it. The medallion regains 1d3 expended charges daily at dawn."
   ]
  },
  "Figurine of Wondrous Power: bronze griffon": {
   "type": "Wondrous item, rarity by figurine",
   "text": [
    "A _figurine of wondrous power_ is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.",
    "The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.",
    "The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.",
    "**_Bronze Griffon (Rare)_**. This bronze statuette is of a griffon rampant. It can become a griffon for up to 6 hours. Once it has been used, it can't be used again until 5 days have passed."
   ]
  },
  "Figurine of Wondrous Power: silver raven": {
   "type": "Wondrous item, rarity by figurine",
   "text": [
    "A _figurine of wondrous power_ is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.",
    "The creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.",
    "The creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.",
    "**_Silver Raven (Uncommon)_**. This silver statuette of a raven can become a raven for up to 12 hours. Once it has been used, it can't be used again until 2 days have passed. While in raven form, the figurine allows you to cast the _animal messenger_ spell on it at will."
   ]
  },
  "Elemental Gem": {
   "type": "Wondrous item, uncommon",
   "text": [
    "This gem contains a mote of elemental energy. When you use an action to break the gem, an elemental is summoned as if you had cast the _conjure elemental_ spell, and the gem's magic is lost. The type of gem determines the elemental summoned by the spell.",
    {
     "table": [
      [
       "Gem",
       "Summoned Elemental"
      ],
      [
       "Blue sapphire",
       "Air elemental"
      ],
      [
       "Yellow diamond",
       "Earth elemental"
      ],
      [
       "Red corundum",
       "Fire elemental"
      ],
      [
       "Emerald",
       "Water elemental"
      ]
     ]
    }
   ]
  },
  "Chime of Opening": {
   "type": "Wondrous item, rare",
   "text": [
    "This hollow metal tube measures about 1 foot long and weighs 1 pound. You can strike it as an action, pointing it at an object within 120 feet of you that can be opened, such as a door, lid, or lock. The chime issues a clear tone, and one lock or latch on the object opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens.",
    "The chime can be used ten times. After the tenth time, it cracks and becomes useless."
   ]
  },
  "Potion of Resistance": {
   "type": "Potion, uncommon",
   "text": [
    "When you drink this potion, you gain resistance to one type of damage for 1 hour. The GM chooses the type or determines it randomly from the options below.",
    {
     "table": [
      [
       "d10",
       "Damage Type"
      ],
      [
       "1",
       "Acid"
      ],
      [
       "2",
       "Cold"
      ],
      [
       "3",
       "Fire"
      ],
      [
       "4",
       "Force"
      ],
      [
       "5",
       "Lightning"
      ],
      [
       "6",
       "Necrotic"
      ],
      [
       "7",
       "Poison"
      ],
      [
       "8",
       "Psychic"
      ],
      [
       "9",
       "Radiant"
      ],
      [
       "10",
       "Thunder"
      ]
     ]
    }
   ]
  },
  "Potion of Water Breathing": {
   "type": "Potion, uncommon",
   "text": [
    "You can breathe underwater for 1 hour after drinking this potion. Its cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it."
   ]
  },
  "Potion of Giant Strength": {
   "type": "Potion, varies",
   "text": [
    "When you drink this potion, your Strength score changes for 1 hour. The type of giant determines the score (see the table below). The potion has no effect on you if your Strength is equal to or greater than that score.",
    "This potion's transparent liquid has floating in it a sliver of fingernail from a giant of the appropriate type. The _potion of frost giant strength_ and the _potion of stone giant strength_ have the same effect.",
    {
     "table": [
      [
       "Type of Giant",
       "Strength",
       "Rarity"
      ],
      [
       "Hill giant",
       "21",
       "Uncommon"
      ],
      [
       "Frost/stone giant",
       "23",
       "Rare"
      ],
      [
       "Fire giant",
       "25",
       "Rare"
      ],
      [
       "Cloud giant",
       "27",
       "Very rare"
      ],
      [
       "Storm giant",
       "29",
       "Legendary"
      ]
     ]
    }
   ]
  },
  "Potion of Heroism": {
   "type": "Potion, rare",
   "text": [
    "For 1 hour after drinking it, you gain 10 temporary hit points that last for 1 hour. For the same duration, you are under the effect of the _bless_ spell (no concentration required). This blue potion bubbles and steams as if boiling."
   ]
  },
  "Potion of Clairvoyance": {
   "type": "Potion, rare",
   "text": [
    "When you drink this potion, you gain the effect of the _clairvoyance_ spell. An eyeball bobs in this yellowish liquid but vanishes when the potion is opened."
   ]
  },
  "Potion of Mind Reading": {
   "type": "Potion, rare",
   "text": [
    "When you drink this potion, you gain the effect of the _detect thoughts_ spell (save DC 13). The potion's dense, purple liquid has an ovoid cloud of pink floating in it."
   ]
  },
  "Potion of Invisibility": {
   "type": "Potion, very rare",
   "text": [
    "This potion's container looks empty but feels as though it holds liquid. When you drink it, you become invisible for 1 hour. Anything you wear or carry is invisible with you. The effect ends early if you attack or cast a spell."
   ]
  },
  "Potion of Flying": {
   "type": "Potion, very rare",
   "text": [
    "When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour and can hover. If you're in the air when the potion wears off, you fall unless you have some other means of staying aloft. This potion's clear liquid floats at the top of its container and has cloudy white impurities drifting in it."
   ]
  },
  "Potion of Speed": {
   "type": "Potion, very rare",
   "text": [
    "When you drink this potion, you gain the effect of the _haste_ spell for 1 minute (no concentration required). The potion's yellow fluid is streaked with black and swirls on its own."
   ]
  },
  "Oil of Slipperiness": {
   "type": "Potion, uncommon",
   "text": [
    "This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of a _freedom of movement_ spell for 8 hours.",
    "Alternatively, the oil can be poured on the ground as an action, where it covers a 10-foot square, duplicating the effect of the _grease_ spell in that area for 8 hours."
   ]
  },
  "Oil of Etherealness": {
   "type": "Potion, rare",
   "text": [
    "Beads of this cloudy gray oil form on the outside of its container and quickly evaporate. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the _etherealness_ spell for 1 hour."
   ]
  },
  "Dust of Disappearance": {
   "type": "Wondrous item, uncommon",
   "text": [
    "Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its magic takes effect. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature."
   ]
  },
  "Potion of Climbing": {
   "type": "Potion, common",
   "text": [
    "When you drink this potion, you gain a climbing speed equal to your walking speed for 1 hour. During this time, you have advantage on Strength (Athletics) checks you make to climb. The potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking the bottle fails to mix the colors."
   ]
  },
  "Potion of Growth": {
   "type": "Potion, uncommon",
   "text": [
    "When you drink this potion, you gain the \"enlarge\" effect of the _enlarge/reduce_ spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process."
   ]
  },
  "Potion of Poison": {
   "type": "Potion, uncommon",
   "text": [
    "This concoction looks, smells, and tastes like a _potion of healing_ or other beneficial potion. However, it is actually poison masked by illusion magic. An _identify_ spell reveals its true nature.",
    "If you drink it, you take 3d6 poison damage, and you must succeed on a DC 13 Constitution saving throw or be poisoned. At the start of each of your turns while you are poisoned in this way, you take 3d6 poison damage. At the end of each of your turns, you can repeat the saving throw. On a successful save, the poison damage you take on your subsequent turns decreases by 1d6. The poison ends when the damage decreases to 0."
   ]
  },
  "Potion of Gaseous Form": {
   "type": "Potion, rare",
   "text": [
    "When you drink this potion, you gain the effect of the _gaseous form_ spell for 1 hour (no concentration required) or until you end the effect as a bonus action. This potion's container seems to hold fog that moves and pours like water."
   ]
  },
  "Oil of Sharpness": {
   "type": "Potion, very rare",
   "text": [
    "This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. The oil can coat one slashing or piercing weapon or up to 5 pieces of slashing or piercing ammunition. Applying the oil takes 1 minute. For 1 hour, the coated item is magical and has a +3 bonus to attack and damage rolls."
   ]
  },
  "Eversmoking Bottle": {
   "type": "Wondrous item, uncommon",
   "text": [
    "Smoke leaks from the lead-stoppered mouth of this brass bottle, which weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke pours out in a 60-foot radius from the bottle. The cloud's area is heavily obscured. Each minute the bottle remains open and within the cloud, the radius increases by 10 feet until it reaches its maximum radius of 120 feet.",
    "The cloud persists as long as the bottle is open. Closing the bottle requires you to speak its command word as an action. Once the bottle is closed, the cloud disperses after 10 minutes. A moderate wind (11 to 20 miles per hour) can also disperse the smoke after 1 minute, and a strong wind (21 or more miles per hour) can do so after 1 round."
   ]
  },
  "Pipes of Haunting": {
   "type": "Wondrous item, uncommon",
   "text": [
    "You must be proficient with wind instruments to use these pipes. They have 3 charges. You can use an action to play them and expend 1 charge to create an eerie, spellbinding tune. Each creature within 30 feet of you that hears you play must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. If you wish, all creatures in the area that aren't hostile toward you automatically succeed on the saving throw. A creature that fails the saving throw can repeat it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these pipes for 24 hours. The pipes regain 1d3 expended charges daily at dawn."
   ]
  },
  "Iron Bands of Binding": {
   "type": "Wondrous item, rare",
   "text": [
    "This rusty iron sphere measures 3 inches in diameter and weighs 1 pound. You can use an action to speak the command word and throw the sphere at a Huge or smaller creature you can see within 60 feet of you. As the sphere moves through the air, it opens into a tangle of metal bands.",
    "Make a ranged attack roll with an attack bonus equal to your Dexterity modifier plus your proficiency bonus. On a hit, the target is restrained until you take a bonus action to speak the command word again to release it. Doing so, or missing with the attack, causes the bands to contract and become a sphere once more.",
    "A creature, including the one restrained, can use an action to make a DC 20 Strength check to break the iron bands. On a success, the item is destroyed, and the restrained creature is freed. If the check fails, any further attempts made by that creature automatically fail until 24 hours have elapsed.",
    "Once the bands are used, they can't be used again until the next dawn."
   ]
  },
  "Dimensional Shackles": {
   "type": "Wondrous item, rare",
   "text": [
    "You can use an action to place these shackles on an incapacitated creature. The shackles adjust to fit a creature of Small to Large size. In addition to serving as mundane manacles, the shackles prevent a creature bound by them from using any method of extradimensional movement, including teleportation or travel to a different plane of existence. They don't prevent the creature from passing through an interdimensional portal.",
    "You and any creature you designate when you use the shackles can use an action to remove them. Once every 30 days, the bound creature can make a DC 30 Strength (Athletics) check. On a success, the creature breaks free and destroys the shackles."
   ]
  },
  "Horn of Valhalla": {
   "type": "Wondrous item, rare (silver or brass), very rare (bronze) or legendary (iron)",
   "text": [
    "You can use an action to blow this horn. In response, warrior spirits from the Valhalla appear within 60 feet of you. They use the statistics of a berserker. They return to Valhalla after 1 hour or when they drop to 0 hit points. Once you use the horn, it can't be used again until 7 days have passed.",
    "Four types of _horn of Valhalla_ are known to exist, each made of a different metal. The horn's type determines how many berserkers answer its summons, as well as the requirement for its use. The GM chooses the horn's type or determines it randomly.",
    {
     "table": [
      [
       "d100",
       "Horn Type",
       "Berserkers Summoned",
       "Requirement"
      ],
      [
       "01-40",
       "Silver",
       "2d4 + 2",
       "None"
      ],
      [
       "41-75",
       "Brass",
       "3d4 + 3",
       "Proficiency with all simple weapons"
      ],
      [
       "76-90",
       "Bronze",
       "4d4 + 4",
       "Proficiency with all medium armor"
      ],
      [
       "91-00",
       "Iron",
       "5d4 + 5",
       "Proficiency with all martial weapons"
      ]
     ]
    },
    "If you blow the horn without meeting its requirement, the summoned berserkers attack you. If you meet the requirement, they are friendly to you and your companions and follow your commands."
   ]
  },
  "Rope of Entanglement": {
   "type": "Wondrous item, rare",
   "text": [
    "This rope is 30 feet long and weighs 3 pounds. If you hold one end of the rope and use an action to speak its command word, the other end darts forward to entangle a creature you can see within 20 feet of you. The target must succeed on a DC 15 Dexterity saving throw or become restrained.",
    "You can release the creature by using a bonus action to speak a second command word. A target restrained by the rope can use an action to make a DC 15 Strength or Dexterity check (target's choice). On a success, the creature is no longer restrained by the rope.",
    "The rope has AC 20 and 20 hit points. It regains 1 hit point every 5 minutes as long as it has at least 1 hit point. If the rope drops to 0 hit points, it is destroyed."
   ]
  },
  "Horn of Blasting": {
   "type": "Wondrous item, rare",
   "text": [
    "You can use an action to speak the horn's command word and then blow the horn, which emits a thunderous blast in a 30-foot cone that is audible 600 feet away. Each creature in the cone must make a DC 15 Constitution saving throw. On a failed save, a creature takes 5d6 thunder damage and is deafened for 1 minute. On a successful save, a creature takes half as much damage and isn't deafened. Creatures and objects made of glass or crystal have disadvantage on the saving throw and take 10d6 thunder damage instead of 5d6.",
    "Each use of the horn's magic has a 20 percent chance of causing the horn to explode. The explosion deals 10d6 fire damage to the blower and destroys the horn."
   ]
  },
  "Mace of Terror": {
   "type": "Weapon (mace), rare (requires attunement)",
   "text": [
    "This magic weapon has 3 charges. While holding it, you can use an action and expend 1 charge to release a wave of terror. Each creature of your choice in a 30-foot radius extending from you must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success.",
    "The mace regains 1d3 expended charges daily at dawn."
   ]
  },
  "Sword of Wounding": {
   "type": "Weapon (any sword), rare (requires attunement)",
   "text": [
    "Hit points lost to this weapon's damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means.",
    "Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature's turns, it takes 1d4 necrotic damage for each time you've wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success."
   ]
  }
 },
 "rows": {
  "rapture|Scroll of revivify": "Spell scroll: Revivify",
  "rapture|Scroll of counterspell": "Spell scroll: Counterspell",
  "rapture|Scroll of banishment": "Spell scroll: Banishment",
  "rapture|Scroll of death ward": "Spell scroll: Death Ward",
  "rapture|Scroll of greater restoration": "Spell scroll: Greater Restoration",
  "rapture|Scroll of dispel evil and good": "Spell scroll: Dispel Evil and Good",
  "rapture|Scroll of word of recall": "Spell scroll: Word of Recall",
  "rapture|Scroll of heal": "Spell scroll: Heal",
  "rapture|Scroll of wind walk": "Spell scroll: Wind Walk",
  "rapture|Scroll of raise dead": "Spell scroll: Raise Dead",
  "rapture|Scroll of holy aura": "Spell scroll: Holy Aura",
  "rapture|Scroll of resurrection": "Spell scroll: Resurrection",
  "rapture|Bag of holding": "Bag of Holding",
  "rapture|Decanter of endless water": "Decanter of Endless Water",
  "rapture|Heward's handy haversack": "Handy Haversack",
  "rapture|Mantle of spell resistance": "Mantle of Spell Resistance",
  "rapture|Ring of spell storing": "Ring of Spell Storing",
  "rapture|Instant fortress (Daern's)": "Instant Fortress",
  "rapture|Carpet of flying": "Carpet of Flying",
  "rapture|Talisman of pure good": "Talisman of Pure Good",
  "rapture|Scroll of remove curse": "Spell scroll: Remove Curse",
  "rapture|Scroll of sending": "Spell scroll: Sending",
  "rapture|Scroll of protection from energy": "Spell scroll: Protection from Energy",
  "rapture|Scroll of freedom of movement": "Spell scroll: Freedom of Movement",
  "rapture|Scroll of dimension door": "Spell scroll: Dimension Door",
  "rapture|Scroll of hold monster": "Spell scroll: Hold Monster",
  "rapture|Scroll of forbiddance": "Spell scroll: Forbiddance",
  "rapture|Helm of comprehending languages": "Helm of Comprehending Languages",
  "rapture|Lantern of revealing": "Lantern of Revealing",
  "rapture|Cape of the mountebank": "Cape of the Mountebank",
  "rapture|Portable hole": "Portable Hole",
  "rapture|Feather token: anchor": "Feather Token: anchor",
  "rapture|Feather token: bird": "Feather Token: bird",
  "forge|Arrow of dragon slaying": "Arrow of Slaying",
  "forge|Bracers of archery": "Bracers of Archery",
  "forge|Efficient quiver": "Efficient Quiver",
  "forge|Dragon slayer, a Hellrider's longsword": "Dragon Slayer",
  "forge|Mace of disruption": "Mace of Disruption",
  "forge|Adamantine full plate": "Adamantine Armor",
  "forge|Armour of cold resistance, breastplate": "Armor of Resistance",
  "forge|White dragon scale mail": "Dragon Scale Mail",
  "forge|Javelin of lightning": "Javelin of Lightning",
  "forge|Lance, +2": "Weapon, +1, +2, or +3",
  "forge|Flame tongue, a greatsword": "Flame Tongue",
  "forge|Sun blade": "Sun Blade",
  "forge|Dagger of venom": "Dagger of Venom",
  "forge|Gauntlets of ogre power": "Gauntlets of Ogre Power",
  "forge|Belt of hill giant strength": "Belt of Giant Strength",
  "forge|Arrow-catching shield": "Arrow-Catching Shield",
  "forge|Glamoured studded leather": "Glamoured Studded Leather",
  "forge|Horseshoes of speed": "Horseshoes of Speed",
  "barber|Potion of greater healing": "Potion of Healing",
  "barber|Potion of superior healing": "Potion of Healing",
  "barber|Potion of supreme healing": "Potion of Healing",
  "barber|Keoghtom's ointment": "Restorative Ointment",
  "barber|Hat of disguise": "Hat of Disguise",
  "barber|Spellwrought tattoo: revivify": "Spellwrought tattoo: Revivify",
  "barber|Spellwrought tattoo: lesser restoration": "Spellwrought tattoo: Lesser Restoration",
  "barber|Periapt of health": "Periapt of Health",
  "barber|Necklace of adaptation": "Necklace of Adaptation",
  "barber|Periapt of proof against poison": "Periapt of Proof against Poison",
  "barber|Amulet of health": "Amulet of Health",
  "barber|Luckstone": "Stone of Good Luck (Luckstone)",
  "barber|Potion of healing": "Potion of Healing",
  "barber|Spellwrought tattoo: death ward": "Spellwrought tattoo: Death Ward",
  "barber|Spellwrought tattoo: pass without trace": "Spellwrought tattoo: Pass without Trace",
  "barber|Periapt of wound closure": "Periapt of Wound Closure",
  "barber|Boots of the winterlands": "Boots of the Winterlands",
  "barber|Broom of flying": "Broom of Flying",
  "bank|Ring of warmth": "Ring of Warmth",
  "bank|Ring of free action": "Ring of Free Action",
  "bank|Ring of resistance (acid)": "Ring of Resistance",
  "bank|Ring of protection": "Ring of Protection",
  "bank|Cloak of elvenkind": "Cloak of Elvenkind",
  "bank|Cloak of protection": "Cloak of Protection",
  "bank|Cloak of displacement": "Cloak of Displacement",
  "bank|Wand of magic missiles": "Wand of Magic Missiles",
  "bank|Wand of the war mage, +1": "Wand of the War Mage, +1, +2, or +3",
  "bank|Wand of binding": "Wand of Binding",
  "bank|Brooch of shielding": "Brooch of Shielding",
  "bank|Pearl of power": "Pearl of Power",
  "bank|Necklace of prayer beads": "Necklace of Prayer Beads",
  "bank|Staff of healing": "Staff of Healing",
  "bank|Iron flask, occupied": "Iron Flask",
  "bank|Ring of mind shielding": "Ring of Mind Shielding",
  "bank|Ring of feather falling": "Ring of Feather Falling",
  "bank|Ring of evasion": "Ring of Evasion",
  "bank|Winged boots": "Winged Boots",
  "bank|Boots of speed": "Boots of Speed",
  "bank|Wings of flying": "Wings of Flying",
  "bank|Bracers of defense": "Bracers of Defense",
  "bank|Wand of lightning bolts": "Wand of Lightning Bolts",
  "bank|Immovable rod": "Immovable Rod",
  "bank|Wand of secrets": "Wand of Secrets",
  "bank|Ioun stone, protection": "Ioun Stone: protection",
  "bank|Ioun stone, awareness": "Ioun Stone: awareness",
  "bank|Ioun stone, reserve": "Ioun Stone: reserve",
  "bank|Gem of seeing": "Gem of Seeing",
  "bank|Amulet of proof against detection and location": "Amulet of Proof against Detection and Location",
  "bank|Medallion of thoughts": "Medallion of Thoughts",
  "bank|Figurine of wondrous power, bronze griffon": "Figurine of Wondrous Power: bronze griffon",
  "bank|Figurine of wondrous power, silver raven": "Figurine of Wondrous Power: silver raven",
  "bank|Elemental gem, red corundum": "Elemental Gem",
  "bank|Chime of opening": "Chime of Opening",
  "ichor|Potion of resistance (cold)": "Potion of Resistance",
  "ichor|Potion of resistance (acid or poison)": "Potion of Resistance",
  "ichor|Potion of water breathing": "Potion of Water Breathing",
  "ichor|Potion of hill giant strength": "Potion of Giant Strength",
  "ichor|Potion of fire giant strength": "Potion of Giant Strength",
  "ichor|Potion of heroism": "Potion of Heroism",
  "ichor|Potion of clairvoyance": "Potion of Clairvoyance",
  "ichor|Potion of mind reading": "Potion of Mind Reading",
  "ichor|Potion of invisibility": "Potion of Invisibility",
  "ichor|Potion of flying": "Potion of Flying",
  "ichor|Potion of speed": "Potion of Speed",
  "ichor|Oil of slipperiness": "Oil of Slipperiness",
  "ichor|Oil of etherealness": "Oil of Etherealness",
  "ichor|Dust of disappearance": "Dust of Disappearance",
  "ichor|Potion of climbing": "Potion of Climbing",
  "ichor|Potion of growth": "Potion of Growth",
  "ichor|Potion of poison": "Potion of Poison",
  "ichor|Potion of frost giant strength": "Potion of Giant Strength",
  "ichor|Potion of gaseous form": "Potion of Gaseous Form",
  "ichor|Potion of cloud giant strength": "Potion of Giant Strength",
  "ichor|Oil of sharpness": "Oil of Sharpness",
  "ichor|Eversmoking bottle": "Eversmoking Bottle",
  "larva|Pipes of haunting": "Pipes of Haunting",
  "larva|Iron bands of Bilarro": "Iron Bands of Binding",
  "larva|Dimensional shackles": "Dimensional Shackles",
  "larva|Horn of Valhalla, silver": "Horn of Valhalla",
  "larva|Rope of entanglement": "Rope of Entanglement",
  "larva|Horn of blasting": "Horn of Blasting",
  "larva|Mace of terror": "Mace of Terror",
  "larva|Sword of wounding": "Sword of Wounding"
 }
};
  if (typeof module !== "undefined" && module.exports) module.exports = TEXT;
  else window.EMPORIUM_ITEM_TEXT = TEXT;
})();
