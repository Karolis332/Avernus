// Crew companions the DM hands to players to run in a fight (one each).
// Each is built on an official chassis, named in `homebrew`, tuned to roughly a level 9-10 character.
// Adds to window.CAMPAIGN.creatures; load after campaign-map.js and before any session file.
(function () {
  "use strict";
  window.CAMPAIGN = window.CAMPAIGN || {};
  var C = window.CAMPAIGN.creatures = window.CAMPAIGN.creatures || {};

  C["veska"] = {
    name: "Veska",
    kind: "veska",
    role: "Hellrider of Elturel. Fear-immune knight, the party's anchor",
    source: { page: "bestiary", name: "Knight", src: "MM" },
    homebrew: "Chassis: Knight (MM, CR 3), upscaled to about CR 8 for a level 9-10 strength ally: 112 HP, two lance attacks, Hellrider's Oath, Devil-Bane Arms, Hellrider's Charge. Keeps the Knight's Leadership and Parry.",
    description: "A tall woman in dented Hellrider plate, the grey of the order scorched almost black. She smiles rarely and never in a fight.",
    npc: false,
    sizeType: "Medium humanoid (human), lawful good",
    ac: 18, acNote: "plate, shield",
    hp: 112, hpFormula: "15d8 + 45",
    speed: "30 ft. (60 ft. mounted)",
    abilities: { str: 18, dex: 12, con: 16, int: 11, wis: 14, cha: 15 },
    saves: "Str +7, Con +6, Wis +5", skills: "Athletics +7, Insight +5, Intimidation +5, Perception +5",
    vulnerable: "", resist: "", immune: "", condImmune: "frightened",
    senses: "passive Perception 15",
    languages: "Common, Infernal",
    cr: "8", xp: 3900, pb: 3,
    traits: [
      { name: "Hellrider's Oath", text: "Veska is immune to being frightened, and allies within 10 ft. of her have advantage on saving throws against being frightened." },
      { name: "Devil-Bane Arms", text: "Her weapon attacks are magical and silvered, and deal an extra 7 (2d6) radiant damage to fiends." }
    ],
    actions: [
      { name: "Multiattack", text: "Veska makes two Blessed Lance or Longsword attacks." },
      { name: "Blessed Lance", text: "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 11 (1d12 + 4) piercing damage." },
      { name: "Longsword", text: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage." },
      { name: "Hellrider's Charge (Recharge 5-6)", text: "If Veska moved at least 20 ft. straight toward the target, one lance hit deals an extra 10 (3d6) damage and the target makes a DC 15 Strength saving throw or is knocked prone." },
      { name: "Leadership (Recharges after a Short or Long Rest)", text: "For 1 minute, whenever a nonhostile creature she can see within 30 ft. makes an attack roll or a saving throw, it can add a d4 to the roll, as long as it can hear her. A creature can benefit from only one Leadership die at a time. Ends if she is incapacitated." }
    ],
    reactions: [
      { name: "Parry", text: "Veska adds 3 to her AC against one melee attack that would hit her. She must see the attacker and be holding a melee weapon." },
      { name: "Shield the Fallen", text: "When an ally she can see within 5 ft. takes damage, she takes half of it instead." }
    ],
    playerGuide: [
      "Stay next to Drenwal or whoever is most exposed. Your aura stops fear: frightened allies near you get advantage.",
      "Your turn: Multiattack with the lance (reach 10 ft.). Against fiends, add 2d6 radiant every hit.",
      "Hellrider's Charge whenever you can run 20 ft. straight at something first. Roll a d6 at the start of each turn: on a 5-6 it is back.",
      "Leadership once per rest, early in the fight: everyone near you adds a d4.",
      "Reactions: Parry (+3 AC) for yourself, or Shield the Fallen (take half) for a friend. Only one per round, so choose.",
      "Never flee. A Hellrider does not run from Hell."
    ],
    tactics: [
      "Anchors the line beside Drenwal. Charges whatever is attacking him.",
      "Leadership in round 1. Shield the Fallen on any character below half."
    ]
  };

  C["ser-lucan"] = {
    name: "Ser Lucan the Reforged",
    kind: "ser-lucan",
    role: "Old Crimson Watch Hellrider on Gondian automaton legs. The shield",
    source: { page: "bestiary", name: "Knight", src: "MM" },
    homebrew: "Chassis: Knight (MM, CR 3) rebuilt as a defender, about CR 7 for a level 9-10 strength ally: 136 HP, AC 19, Cannot Be Kept Down, Keep the Watch, Iron Charge. Same block as the Session 6 fight cards.",
    description: "An old knight with a young man's posture, standing on two legs of brass and black iron that hiss when he moves. Halvard's last words are scratched inside his shield.",
    npc: false,
    sizeType: "Medium humanoid (human), lawful neutral",
    ac: 19, acNote: "Hellrider plate, automaton legs",
    hp: 136, hpFormula: "16d8 + 64",
    speed: "30 ft. (35 ft. if soul-coin fueled)",
    abilities: { str: 16, dex: 10, con: 18, int: 11, wis: 14, cha: 13 },
    saves: "Con +7, Wis +5", skills: "Athletics +6, Perception +5",
    vulnerable: "", resist: "necrotic", immune: "", condImmune: "frightened",
    senses: "passive Perception 15",
    languages: "Common",
    cr: "7", xp: 2900, pb: 3,
    traits: [
      { name: "Cannot Be Kept Down", text: "The first time Lucan would drop to 0 hit points in a fight, he drops to 1 instead." },
      { name: "Automaton Legs", text: "He can't be knocked prone or grappled by the legs, and difficult terrain doesn't slow him. Disadvantage on Dexterity (Stealth) checks." },
      { name: "Hellrider's Watch", text: "Lucan and allies within 10 ft. of him have advantage on saving throws against effects from fiends." }
    ],
    actions: [
      { name: "Multiattack", text: "Lucan makes two Hellrider Longsword attacks." },
      { name: "Hellrider Longsword", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 3) slashing damage plus 4 (1d8) radiant damage." },
      { name: "Iron Charge (Recharge 5-6)", text: "Lucan moves up to his speed in a straight line. The first creature in his path takes 12 (2d8 + 3) bludgeoning damage and must succeed on a DC 14 Strength saving throw or be knocked prone." }
    ],
    reactions: [
      { name: "Keep the Watch", text: "When a creature he can see within 5 ft. of him is hit by an attack, Lucan becomes the target instead and takes the hit." }
    ],
    playerGuide: [
      "Your job is to be hit instead of your friends. Stand next to the most fragile person on the field (or the gun crew).",
      "Keep the Watch: when someone next to you is hit, you take it instead. Use it every round.",
      "Your turn: two longsword attacks, each with 1d8 radiant on top.",
      "Iron Charge to knock a big thing prone or break up a crowd. Roll a d6 at the start of each turn: on a 5-6 it is back.",
      "You can't be knocked prone or slowed, and the first time you hit 0 HP you stay up at 1. Be brave with it.",
      "If Drenwal goes down, say Halvard's last words out loud: Drenwal gets advantage on his next death save."
    ],
    tactics: [
      "Stands in front of the weakest character and takes the hits.",
      "Keep the Watch every round; Iron Charge on anything Large that reaches the deck."
    ]
  };

  C["lulu"] = {
    name: "Lulu",
    kind: "lulu",
    role: "Hollyphant, Zariel's old companion. A healer whose memory the campaign needs",
    source: { page: "bestiary", name: "Lulu", src: "BGDIA" },
    homebrew: "Chassis: Hollyphant (Descent into Avernus, CR 5). Hit points raised from 30 to 66 so she survives a dragon fight at level 9-10 strength; everything else is the book's.",
    description: "A small golden flying elephant with feathered wings, about the size of a big dog. She curls her trunk tight against her chest when she is scared.",
    npc: false,
    sizeType: "Small celestial, lawful good",
    ac: 18, acNote: "natural armor",
    hp: 66, hpFormula: "12d6 + 24",
    speed: "30 ft., fly 120 ft. (in mammoth form)",
    abilities: { str: 10, dex: 11, con: 14, int: 16, wis: 19, cha: 16 },
    saves: "Dex +3, Con +5, Cha +6",
    vulnerable: "", resist: "bludgeoning, piercing, and slashing from nonmagical attacks", immune: "poison", condImmune: "poisoned",
    senses: "passive Perception 14",
    languages: "Celestial, telepathy 120 ft.",
    cr: "5", xp: 1800, pb: 3,
    traits: [
      { name: "Aura of Invulnerability", text: "An invisible 10-foot-radius sphere surrounds her. Spells of 5th level or lower cast from outside it can't affect creatures or objects inside it, and their areas exclude it. She can use an action to suppress the aura until her concentration ends." },
      { name: "Innate Spellcasting", text: "Wisdom (spell save DC 15), no material components. At will: {@spell light}. 2/day each: {@spell bless}, {@spell cure wounds}, {@spell protection from evil and good}. 1/day each: {@spell banishment}, {@spell heal}, {@spell raise dead}, {@spell shapechange} (golden mammoth with feathered wings, fly 120 ft.), {@spell teleport} (no chance of error)." },
      { name: "Magic Weapons", text: "Her weapon attacks are magical." }
    ],
    actions: [
      { name: "Tusks", text: "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage." },
      { name: "Trumpet (3/Day)", text: "A trumpet blast heard 600 ft. away, and a 30-ft. cone of energy, her choice. Blasting: DC 14 Constitution save, 17 (5d6) thunder damage and deafened for 1 minute on a failure, half and not deafened on a success. Sparkles: DC 14 Constitution save, 22 (4d8 + 4) radiant damage on a failure, half on a success." }
    ],
    playerGuide: [
      "You are the healer and the shield, not a fighter. Your tusks do almost nothing.",
      "Your aura is a moving fortress: spells of 5th level or lower from outside your 10 ft. bubble can't touch anyone inside it. Hide the casters and the wounded in it, especially against Arkhan's Hand of Vecna.",
      "Heal (once): 70 HP and cures blindness, deafness and disease. Save it for someone about to die.",
      "Cure wounds and bless twice each. Protection from evil and good on Or'Henn gives him advantage on his Pull saves.",
      "Trumpet three times: Sparkles (radiant) against fiends, Blasting against everything else.",
      "Banishment once: send one problem away for a minute. Stay off the rail and away from the Styx."
    ],
    tactics: [
      "Stays on the ship near the wounded; aura over the casters.",
      "Heal is her emergency button; Trumpet of Sparkles against fiends."
    ]
  };

  C["feonor"] = {
    name: "Feonor",
    kind: "feonor",
    role: "Archmage, freed from Or'Henn's geas. Fights beside the party once, if asked nicely",
    source: { page: "bestiary", name: "Mage", src: "MM" },
    homebrew: "Chassis: Mage (MM, CR 6, a 9th-level wizard). Hit points raised from 40 to 66 for a level 9-10 strength ally; spells are the Mage's.",
    description: "A sharp-faced woman in scorched robes, one sleeve gone and the arm under it still smoking. She is furious, and very good at what she does.",
    npc: false,
    sizeType: "Medium humanoid (human), neutral",
    ac: 12, acNote: "15 with mage armor",
    hp: 66, hpFormula: "12d8 + 12",
    speed: "30 ft.",
    abilities: { str: 9, dex: 14, con: 12, int: 17, wis: 12, cha: 11 },
    saves: "Int +6, Wis +4", skills: "Arcana +6, History +6",
    vulnerable: "", resist: "", immune: "", condImmune: "",
    senses: "passive Perception 11",
    languages: "Common, Draconic, Infernal, Elvish",
    cr: "6", xp: 2300, pb: 3,
    traits: [
      { name: "Spellcasting", text: "9th-level spellcaster, Intelligence (spell save DC 14, +6 to hit). Cantrips: {@spell fire bolt}, {@spell light}, {@spell mage hand}, {@spell prestidigitation}. 1st (4 slots): {@spell detect magic}, {@spell mage armor}, {@spell magic missile}, {@spell shield}. 2nd (3): {@spell misty step}, {@spell suggestion}. 3rd (3): {@spell counterspell}, {@spell fireball}, {@spell fly}. 4th (3): {@spell greater invisibility}, {@spell ice storm}. 5th (1): {@spell cone of cold}." }
    ],
    actions: [
      { name: "Dagger", text: "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage." }
    ],
    playerGuide: [
      "Cast mage armor before the fight (AC 15). You are fragile: stay back, behind Lucan or inside Lulu's aura.",
      "Counterspell (3rd level) is your best move: stop Arkhan's Hand of Vecna, or a dragon's spell.",
      "Fireball on groups, cone of cold (once) on a dragon that is already hurt, fire bolt when you are out of slots.",
      "Fly on a friend who needs to reach a dragon in the sky, or on yourself to escape.",
      "Greater invisibility on Veska or yourself. Shield (reaction, +5 AC) when something hits you.",
      "You do not like these people. You will leave the moment Tiamat rises unless someone gives you a very good reason."
    ],
    tactics: [
      "Counterspells Arkhan once, with relish.",
      "Leaves by misty step and fly when Tiamat rises."
    ]
  };
})();
