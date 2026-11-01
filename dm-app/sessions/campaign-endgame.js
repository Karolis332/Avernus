// Endgame pieces shared by every session from Session 10 on: Arkhan's Gambit and Tiamat Reborn (scenes),
// Tiamat Risen (creature), Tiamat's Pull, Tiamat's Dominion and Uldrak's Errand (sides), Arkhan's endgame
// tactics and the two Fight Sequence phases. A session includes a scene with window.CAMPAIGN.scenes["..."]
// (Object.assign a different `when` onto a copy if it needs one). Load after campaign-crew.js, before sessions.
(function () {
  "use strict";
  window.CAMPAIGN = window.CAMPAIGN || {};
  var C = window.CAMPAIGN;
  C.creatures = C.creatures || {}; C.side = C.side || {}; C.scenes = C.scenes || {}; C.endgame = C.endgame || {};

  C.creatures["tiamat-risen"] = {
    "name": "Tiamat Risen",
    "kind": "tiamat",
    "role": "The Dragon Queen, half-born into Vermilius's body. Not her true form.",
    "source": {
      "page": "bestiary",
      "name": "Tiamat",
      "src": "FTD"
    },
    "homebrew": "Campaign homebrew, CR 24, built for a three-sided Session 10 fight against a level-13 party, not the published CR 30 Tiamat. She is unfinished: 250 HP rising by 50 a turn to 400.",
    "description": "Five heads on long necks rising out of a dead green dragon, still growing. The body is too small for what is inside it; scales of five colours keep pushing through the green, and the wings tear and regrow as she moves.",
    "sizeType": "Gargantuan fiend (dragon), chaotic evil",
    "ac": 22,
    "acNote": "natural armor",
    "hp": 400,
    "hpFormula": "starts at 250; see Unfinished",
    "speed": "40 ft., fly 120 ft.",
    "abilities": {
      "str": 30,
      "dex": 10,
      "con": 29,
      "int": 26,
      "wis": 26,
      "cha": 28
    },
    "saves": "Dex +7, Con +16, Wis +15, Cha +16",
    "skills": "Arcana +15, Insight +15, Perception +22, Religion +15",
    "vulnerable": "",
    "resist": "",
    "immune": "acid, cold, fire, lightning, poison; bludgeoning, piercing, and slashing from nonmagical attacks",
    "condImmune": "charmed (except by the orb of dragonkind), frightened, poisoned, stunned",
    "senses": "truesight 120 ft., passive Perception 32",
    "languages": "all",
    "cr": "24",
    "xp": 62000,
    "pb": 7,
    "traits": [
      {
        "name": "Unfinished",
        "text": "Tiamat Risen enters the fight with 250 hit points. At the start of each of her turns she regains 50 hit points, until she has regained 150 in total. If she drops to 0 hit points, the stolen body dies and she falls back into sleep at the Monument."
      },
      {
        "name": "Bound to Avernus",
        "text": "She cannot leave Avernus by any means. Asmodeus's prison still holds."
      },
      {
        "name": "Dread Majesty",
        "text": "A chromatic dragon that sees her for the first time makes a DC 20 Wisdom saving throw. On a failure it kneels to her until she harms it or for 1 minute. On a success it is immune for 24 hours. See Tiamat's Dominion."
      },
      {
        "name": "Five Heads",
        "text": "She has advantage on saving throws against being blinded, deafened, or knocked unconscious. Each head has its own breath (below); she can use only one breath per turn."
      },
      {
        "name": "Legendary Resistance (5/Day)",
        "text": "If she fails a saving throw, she can choose to succeed instead."
      },
      {
        "name": "Magic Resistance",
        "text": "She has advantage on saving throws against spells and other magical effects."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "text": "Tiamat Risen makes three Bite attacks, each with a different head, or uses one breath and makes one Bite."
      },
      {
        "name": "Bite",
        "text": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 21 (2d10 + 10) piercing damage plus 14 (4d6) damage of the head's type (fire, lightning, poison, acid or cold)."
      },
      {
        "name": "Red Breath (Recharge 5-6)",
        "text": "90-ft. cone. DC 24 Dexterity save. 56 (16d6) fire damage on a failure, half on a success."
      },
      {
        "name": "Blue Breath (Recharge 5-6)",
        "text": "120-ft. line, 10 ft. wide. DC 24 Dexterity save. 88 (16d10) lightning damage on a failure, half on a success."
      },
      {
        "name": "Green Breath (Recharge 5-6)",
        "text": "90-ft. cone. DC 24 Constitution save. 56 (16d6) poison damage on a failure, half on a success."
      },
      {
        "name": "Black Breath (Recharge 5-6)",
        "text": "120-ft. line, 10 ft. wide. DC 24 Dexterity save. 72 (16d8) acid damage on a failure, half on a success."
      },
      {
        "name": "White Breath (Recharge 5-6)",
        "text": "90-ft. cone. DC 24 Constitution save. 72 (16d8) cold damage on a failure, half on a success."
      }
    ],
    "legendary": {
      "count": 3,
      "intro": "Tiamat Risen can take 3 legendary actions, one at a time, at the end of another creature's turn. She regains them at the start of her turn.",
      "actions": [
        {
          "name": "Bite",
          "cost": 1,
          "text": "She makes one Bite attack."
        },
        {
          "name": "Command Her Children",
          "cost": 1,
          "text": "One chromatic dragon kneeling to her uses its reaction to make one attack."
        },
        {
          "name": "Wing Storm",
          "cost": 2,
          "text": "Each creature within 20 ft. makes a DC 25 Dexterity saving throw or takes 17 (2d6 + 10) bludgeoning damage and is knocked prone. She can then fly up to half her flying speed."
        },
        {
          "name": "Speak to the Gardener",
          "cost": 2,
          "text": "Or'Henn, if he can hear her, makes his Pull save at DC 20, even if the curse has left him. On a failure he is charmed by her until the end of his next turn."
        }
      ]
    },
    "tactics": [
      "Round 1: does not attack. She speaks: thanks Or'Henn, forgives Arkhan, and names Krull a traitor. Let the table see the split happen.",
      "Wants the orb more than anyone's death. Whoever holds it is her first target, and she bites to disarm, not to kill.",
      "Breath goes at Krull's side first: they are the ones who could leash her. The party comes second.",
      "Never fights to the death. Below 100 hit points she takes the sky and leaves, and Avernus hears her go."
    ],
    "roleplay": [
      "Five voices that finish each other's sentences. Warm, proud, patient. Only the white head threatens.",
      "She never lies. She does not need to.",
      "Sample line: \"You did this for me, little red. I will not forget it. I never forget anything.\""
    ]
  };

  C.side["tiamats-pull"] = {
    "title": "Tiamat's Pull",
    "blocks": [
      {
        "t": "p",
        "text": "Or'Henn's curse as a number, from 0 to 10, tracked from the first minute of Session 10. The higher it is, the harder the curse pulls him toward a dragon, and the worse it is when he fails."
      },
      {
        "t": "h",
        "text": "Starting Value"
      },
      {
        "t": "list",
        "items": [
          "2 at the start of the session, plus 1 for each gold scale he has."
        ]
      },
      {
        "t": "h",
        "text": "What Raises It"
      },
      {
        "t": "list",
        "items": [
          "{@b +2} The vision in The Dragon Queen's Garden.",
          "{@b +1} Each Small Vision (see {@side arc-tiamat|Arc: Or'Henn and Tiamat}).",
          "{@b +1} The first time he sees each chromatic dragon this session.",
          "{@b +1} He touches or uses the orb of dragonkind.",
          "{@b +2} He accepts one of Tiamat's gifts (and gains a gold scale)."
        ]
      },
      {
        "t": "h",
        "text": "What Lowers It"
      },
      {
        "t": "list",
        "items": [
          "{@b -1} Cinderbloom: expend 1 of the staff's charges as a reaction (or use it to reroll a failed Pull save). See {@side cinderbloom|Cinderbloom}.",
          "{@b -1} Once per scene, an ally talks him back: DC 15 Wisdom (Insight) or Charisma (Persuasion), as an action, within 30 ft.",
          "{@b -1} He rolls a natural 20 on a Pull save."
        ]
      },
      {
        "t": "h",
        "text": "The Pull Save"
      },
      {
        "t": "p",
        "text": "At the start of each of Or'Henn's turns in combat, if he can see a chromatic dragon or Tiamat, he makes a {@b Wisdom saving throw, DC 10 + his Pull}. Out of combat, he makes it when a dragon speaks to him. {@spell Protection from evil and good} on him gives advantage. A natural 1 also triggers a Small Vision."
      },
      {
        "t": "table",
        "caption": "On a Failed Pull Save",
        "head": [
          "Pull",
          "Effect until the start of his next turn"
        ],
        "rows": [
          [
            "0-3 Whispers",
            "Disadvantage on his first attack roll against a chromatic dragon. His fire damage to chromatic dragons is halved."
          ],
          [
            "4-6 The Leash",
            "He cannot target a chromatic dragon with an attack or a harmful spell. He must spend half his movement moving toward the nearest one."
          ],
          [
            "7-9 Kin",
            "He is charmed by the nearest chromatic dragon. On his turn he says aloud one line asking it for help. If a chromatic dragon within 60 ft. answers yes (its reaction), the curse jumps: see {@side if-the-curse-jumps|If the Curse Jumps}. An ally within 5 ft. can use a reaction to stop the words: grapple, a hand over his mouth, or {@spell silence}."
          ],
          [
            "10 Ask",
            "No save. He asks the nearest chromatic dragon for help. The DM decides if it says yes."
          ]
        ]
      },
      {
        "t": "note",
        "title": "Make It Visible",
        "text": "Say the number out loud when it changes. The players should feel it climbing all session, long before the fight."
      }
    ]
  };

  C.side["cinderbloom"] = {
    "title": "Cinderbloom",
    "blocks": [
      {
        "t": "p",
        "text": "{@i Staff, very rare (requires attunement by a druid).} Or'Henn's heirloom from the Ashen Garden. Source: Or'Henn's card ({@b orhenn-cinderbloom-and-contracts.html})."
      },
      {
        "t": "read",
        "text": "Living ashwood, warm as sun-baked stone. Its grain twists upward into a cage of blackened branches cradling a fist-sized ember that burns without fuel or smoke, brightening whenever beasts draw near or roots stir beneath the earth."
      },
      {
        "t": "p",
        "text": "It serves as a magic quarterstaff and a druidic spellcasting focus."
      },
      {
        "t": "list",
        "items": [
          "{@b Ashwood Weapon.} +2 bonus to attack and damage rolls made with this magic quarterstaff, and +2 to spell attack rolls while you hold it.",
          "{@b Cinderheart.} As a bonus action, expend 2 charges to send the ember streaking to a point within 60 ft. One creature within 5 ft. of that point makes a Dexterity saving throw against your spell save DC, taking 3d8 fire damage on a failure, half on a success. A 10-ft. radius of smouldering roots erupts there and is difficult terrain until the start of your next turn. The flames ignite unattended flammables but never harm plants you choose.",
          "{@b Rootwright Magic.} The staff has 10 charges. As a Magic action, expend charges to cast, using your spellcasting ability and spell save DC: {@spell entangle} (1), {@spell spike growth} (2), {@spell erupting earth} (3), {@spell plant growth} (3), {@spell wall of fire} (4). Cast from the staff, entangle, spike growth and plant growth can erupt black ashwood roots from bare stone, metal, bone or the blasted soil of Avernus; the growth crumbles to ash after 8 hours.",
          "{@b Recharge.} Regains 1d6 + 4 expended charges when the attuned bearer finishes a long rest, but only once every 24 hours. If you expend the last charge, roll a d20: on a 1 the ember goes dark and the staff becomes a nonmagical quarterstaff until it is planted in fertile soil and watered continuously for 8 hours.",
          "{@b Keeper of Fell Beasts.} Advantage on Wisdom (Animal Handling) checks with Beasts, Monstrosities or Fiends of Intelligence 6 or lower. As a Magic action, expend 4 charges and present the ember to one such creature within 30 ft. that can see it, if its challenge rating is no higher than your proficiency bonus: it makes a Wisdom saving throw against your spell save DC (with advantage if hostile) or is charmed for 1 hour, treating you as its trusted keeper and obeying simple bonus-action commands unless obviously suicidal. It repeats the save whenever it takes damage; on a success, or when the effect ends, it is immune for 24 hours."
        ]
      },
      {
        "t": "note",
        "title": "Campaign Rulings",
        "text": "{@b It knows his hand.} The ember lay dark in Urexiel's vault. It relights the moment Or'Henn grips it, with {@dice 1d6} charges; it refills normally on his next long rest. He attunes as a bonus action, because it was his.\n\n{@b Against Tiamat's curse.} While he holds it, Or'Henn can expend 1 charge as a reaction to lower his Pull by 1, or to reroll a failed Pull save ({@side tiamats-pull|Tiamat's Pull}). Tiamat hates it: it is the one thing in his hands she did not give him.\n\n{@b The brass plate.} PROPERTY OF THE SCABROUS MENAGERIE, screwed into the heel. It is a tracking sigil: Urexiel's hunters can find the staff until it is pried off and destroyed (an action and a DC 15 Strength check, or {@spell dispel magic} at DC 15)."
      },
      {
        "t": "h",
        "text": "Cinderbloom Rekindled"
      },
      {
        "t": "p",
        "text": "{@i Staff, legendary.} Its awakened form, through the Mother Ash quest: three Green Remnants and an 8-hour rite at Vaelisha, the Last Green of Avernus ({@side arc-orhenn|Arc: Or'Henn and Cinderbloom}). It keeps everything above and gains:"
      },
      {
        "t": "list",
        "items": [
          "{@b Greenfire Charges.} 14 charges; regains 2d6 + 4 on a long rest and no longer risks going dark.",
          "{@b Deepwood Casting.} Adds {@spell wall of thorns} (5), {@spell sunbeam} (6), {@spell fire storm} (7). Cinderheart deals 4d8, and against fiends its damage is radiant.",
          "{@b Bloom of the Last Green.} Once per day, as an action: a living grove in a 30-ft. radius for 1 minute. Allies inside regain 1d8 hit points at the start of each of your turns; a fiend that starts its turn there takes 2d8 radiant damage.",
          "{@b Warden's Hold.} Keeper of Fell Beasts affects Intelligence 8 or lower, and two creatures at once."
        ]
      }
    ]
  };

  C.side["tiamats-dominion"] = {
    "title": "Tiamat's Dominion",
    "blocks": [
      {
        "t": "p",
        "text": "Can Tiamat control other dragons? Not by any rule in the published books."
      },
      {
        "t": "list",
        "items": [
          "{@b The books:} no 5e stat block for Tiamat (Rise of Tiamat, Fizban's Treasury of Dragons) has a power to command dragons. Chromatic dragons see her as their creator and queen. They worship her, fear her and often serve her, but each one keeps its own mind and its own greed.",
          "{@b Why she is in Avernus:} she is imprisoned there and guards the way to Dis, against her will. The books leave the exact terms of her bargain with Asmodeus vague.",
          "{@b Campaign ruling (Dread Majesty):} her presence forces each dragon to choose. DC 20 Wisdom save the first time it sees her. A dragon that fails kneels until she harms it, or for 1 minute. A dragon that succeeds is free, and stays free for a day. Loyal ones (Flash) kneel without a save. Bonded ones (Obatala to Krull) save with advantage."
        ]
      },
      {
        "t": "note",
        "title": "Why This Is Better Than Control",
        "text": "If she could simply command them, the split would be automatic. This way every dragon's choice is a story: who kneels, who refuses, and who is too proud to be anyone's servant, even a god's."
      }
    ]
  };

  C.side["uldraks-errand"] = {
    "title": "Uldrak's Errand",
    "blocks": [
      {
        "t": "p",
        "text": "Uldrak left to find a weapon that can kill a god, because Arkhan will hunt the party with every dragon he has. He comes back in Tiamat Reborn, at the start of round 3, carrying something fiendish. He made a deal to get it."
      },
      {
        "t": "h",
        "text": "Who Has the Power to Make It"
      },
      {
        "t": "list",
        "items": [
          "{@b Table ruling: Bel, at Bel's Forge.} Bel was archduke of Avernus until Zariel took it from him. In the book he wants her disgraced and his throne back, and his forge is the greatest in the layer. {@b The weapon:} Gnashing Hunger, Yeenoghu's flail, recovered from the Demon Zapper field and reforged into a blade sized for an empyrean. A demon lord's hunger, beaten into shape on a devil's anvil. {@b The price:} when Tiamat falls, Uldrak marches with Bel against Zariel. A CR 23 empyrean on Bel's side of the war.",
          "{@b Mephistopheles} (Cania's Verdict) was considered and ruled out: too strong for this campaign.",
          "{@b Zariel} is possible but unlikely. She would rather the party died.",
          "{@b Asmodeus} gains from Tiamat's imprisonment. He would not sell this."
        ]
      },
      {
        "t": "note",
        "title": "Ruled: Bel",
        "text": "The weapon is Gnashing Hunger, Yeenoghu's flail reforged at Bel's Forge. Uldrak now owes Bel his sword arm against Zariel. Mephistopheles' Cania's Verdict is out: too strong."
      },
      {
        "t": "h",
        "text": "The Weapon in Play"
      },
      {
        "t": "list",
        "items": [
          "{@b Godsbane Strike.} Uldrak's attacks with it: +17 to hit, reach 15 ft. Hit: 39 (6d12) slashing plus 27 (6d8) necrotic. This damage ignores Tiamat's immunities and resistances.",
          "{@b Drinker.} When it hits Tiamat Risen, she cannot regain hit points (including Unfinished) until the start of Uldrak's next turn.",
          "{@b The Catch.} If it lands the blow that drops Tiamat Risen to 0 hit points, she does not go back to sleep at the Monument. She is destroyed in the Nine Hells, which by the campaign's rule means destroyed for good, and Bel collects his debt: Uldrak marches on Zariel. A goddess's death in Avernus shakes every layer of the Hells.",
          "{@b The Voice.} It laughs. The laughter is Yeenoghu's. On a natural 1, Uldrak makes a DC 18 Wisdom save or attacks the nearest creature, friend or foe."
        ]
      },
      {
        "t": "note",
        "title": "If the Orb Calls Him Early",
        "text": "The orb's magic still answers to him. If it is used and the party is losing, he hears it wherever he is, and comes, with or without the weapon finished."
      }
    ]
  };

  C.side["krulls-offer"] = {
    "title": "Krull's Offer",
    "blocks": [
      {
        "t": "p",
        "text": "{@c krull|Krull} arrives on {@c obatala|Obatala} in round 7, circles once out of reach, and raises a hand before anyone attacks. He speaks in Common, bored, as if he were reading a bill."
      },
      {
        "t": "read",
        "text": "\"Well. You have been busy.\"\n\nThe old tortle looks down at the smoking ground, at the empyrean, at whatever is left of his master's dragons. His face does not change.\n\n\"My lord Arkhan would like his orb. He would also like your heads, but he is a practical man, and I am a more practical one. Give me the glass, and I will take what is left of these beasts home. No one else needs to die today.\"\n\nHe smiles, very slightly.\n\n\"Most of all, not you.\""
      },
      {
        "t": "h",
        "text": "What He Really Wants"
      },
      {
        "t": "p",
        "text": "Krull covets Arkhan's place. With the orb, Arkhan's dragons would answer to him, not to Arkhan. He will not take it home."
      },
      {
        "t": "list",
        "items": [
          "{@b DC 18 Wisdom (Insight):} he is not hungry for Arkhan. He is hungry for himself.",
          "{@b If they name it out loud,} he does not deny it. \"A tower needs a priest who prays. Mine does not.\""
        ]
      },
      {
        "t": "h",
        "text": "If They Hand It Over"
      },
      {
        "t": "list",
        "items": [
          "The surviving dragons leave with him. The fight is over.",
          "They have armed a coup at Arkhan's Tower. Next time the party sees the tower, Krull is either running it or dead. Either way Arkhan is distracted, and the dragons that serve Krull remember who gave him the orb.",
          "Uldrak hates this, and says so. He does not stop them."
        ]
      },
      {
        "t": "h",
        "text": "If They Refuse"
      },
      {
        "t": "p",
        "text": "He sighs, and Obatala dives. Run his Session 10 tactics. He leaves when Obatala is bloodied: he does not die for Arkhan, and he will not die for an orb he could take another day."
      },
      {
        "t": "h",
        "text": "If They Counter-Offer"
      },
      {
        "t": "p",
        "text": "He listens. He is a bargainer before he is a priest. He will trade the surviving dragons' withdrawal for something that hurts Arkhan: news of the vial being spent, a promise not to come back to the tower, or one of the dead dragons' heads to prove to his master how badly this went."
      }
    ]
  };

  C.side["if-the-curse-jumps"] = {
    "title": "If the Curse Jumps",
    "blocks": [
      {
        "t": "p",
        "text": "Tiamat's mark on Or'Henn is a delivery system, not a wound. It pushes him to ask a dragon for help. When he does, it jumps into that dragon, and the dragon becomes the door. It burns out from the inside, and when it is gone, Tiamat wakes in her true form. Full background: {@side arc-tiamat|Arc: Or'Henn and Tiamat}."
      },
      {
        "t": "h",
        "text": "What Counts as Asking"
      },
      {
        "t": "list",
        "items": [
          "Any request for help made to a dragon, in any language: \"help me\", \"take it off me\", \"please\".",
          "Saying yes to a dragon's offer of help. Vermilius makes that offer on purpose.",
          "NOT: surrendering, bargaining, threatening, or asking a dragon a question.",
          "Telegraph it first. The moment before he speaks, he feels the mark lean toward the dragon like a hand reaching out. If he speaks anyway, enforce it."
        ]
      },
      {
        "t": "h",
        "text": "Event: The Mark Moves"
      },
      {
        "t": "read",
        "text": "The words are barely out of your mouth before you feel it go.\n\nIt peels off you like a wet shirt, all at once, and the relief is so sharp it nearly drops you to your knees. You can breathe. You did not know you could not breathe.\n\nAcross the ash, the dragon jerks as if struck. Its eyes, which were cunning a moment ago, go gold all the way across. Pure, flat, molten gold.\n\nIt does not look at you anymore. It looks down, at the ground, as if listening to something underneath."
      },
      {
        "t": "h",
        "text": "What Happens Next"
      },
      {
        "t": "list",
        "items": [
          "{@b Or'Henn is free.} Fully. The mark is gone.",
          "{@b The marked dragon is doomed.} It stops fighting for itself. It will not flee. If nobody kills it, the mark burns it from the inside at the next dawn.",
          "{@b The moment it dies, Tiamat wakes in her true form.} Whoever kills it. Uldrak, eager to kill dragons, will kill it unless someone stops him. Tell the players he is about to.",
          "{@b They can try to keep it alive.} Capture it, chain it, hold it with {@spell hold monster} until dawn. It will not stop the dawn. It buys them hours to decide where they want Tiamat to arrive."
        ]
      },
      {
        "t": "h",
        "text": "When Tiamat Comes"
      },
      {
        "t": "note",
        "title": "Not a Fight",
        "text": "Do not stat her. The campaign map already holds this as a Chapter 5 option: Tiamat breaks Elturel's chains, for a price. She arrives as a voice and a shape too big for the sky, five heads looking down from the clouds, and she is grateful in the way only a god can be: completely, and on her own terms. Arkhan, wherever he is, falls to his knees. This changes the endgame. Only run it if the party truly chose it."
      },
      {
        "t": "read",
        "text": "The dragon dies, and the sky tears.\n\nNot open. Tears, like cloth, and through the gap come five heads, each one larger than the Lady Vengeance, each one a different colour, all of them smiling.\n\nThe voice is five voices, and every one of them is pleased with you.\n\n\"Little druid. You asked so nicely.\""
      }
    ]
  };

  C.scenes["arkhans-gambit"] = {
    "id": "arkhans-gambit",
    "title": "Arkhan's Gambit",
    "when": "When the dragon fight turns the party's way (two dragons down or fleeing), or a day after they refuse to call",
    "duration": "30 to 45 minutes",
    "blocks": [
      {
        "t": "p",
        "text": "Arkhan has watched his dragons lose. He stops trying to win the fight and does the one thing he came to Avernus for: he takes the curse out of Or'Henn and puts it into a dragon, and Tiamat wakes. He has chosen {@c mirelle|Vermilius}, the green, who is devout and willing."
      },
      {
        "t": "note",
        "title": "Running This Scene",
        "text": "Arkhan arrives with his cronies: use any Session 9 stat blocks you like (Torogar, the white abishai). Add him and them to the tracker. The ritual takes three of Arkhan's turns. Tell the players what each step does as it happens. The whole scene is a race: can they stop him before the third step?"
      },
      {
        "t": "read",
        "text": "The sky over the Grave goes black, then gold.\n\nArkhan the Cruel steps out of nothing at the foot of the sword, with the Hand of Vecna raised and smoking. He does not look at the dead dragons. He does not look at you. He looks at Or'Henn.\n\n\"You have been carrying something of hers,\" he says, kindly. \"Let me take it off your hands.\"\n\nAbove him, the green dragon Vermilius folds its wings and comes down to land at his back, and bows its head to the ground like a dog waiting to be fed."
      },
      {
        "t": "h",
        "text": "The Offering (three of Arkhan's turns)"
      },
      {
        "t": "steps",
        "items": [
          "{@b Turn 1: Draw the Debt.} Arkhan's action. Or'Henn, if within 120 ft., makes a {@b DC 22 Charisma saving throw}. On a failure, a gold thread pulls out of his chest and runs to the Hand of Vecna. His Pull stops rising: the curse is leaving him. On a success, nothing happens and Arkhan tries again next turn (he will spend Legendary Resistance to keep his own concentration).",
          "{@b Turn 2: Bind the Vessel.} Arkhan's action. He winds the thread into Vermilius, who must be within 30 ft. of him. The thread is visible: AC 20, 30 hit points, harmed only by radiant or force damage. Cutting it snaps the curse back into Or'Henn at Pull 8.",
          "{@b Turn 3: The Sacrifice.} Arkhan kills Vermilius with one blow of Fane-Eater (automatic hit, the dragon does not resist). Tiamat wakes inside the body. Go to {@scene tiamat-reborn|Tiamat Reborn}."
        ]
      },
      {
        "t": "h",
        "text": "Ways to Stop It"
      },
      {
        "t": "list",
        "items": [
          "{@b Break his concentration.} Treat the ritual as concentration: any damage forces a Constitution save (DC 10 or half the damage). Arkhan has +15 and 4 Legendary Resistances. It will take a lot.",
          "{@b Move the vessel.} Push, pull or teleport Vermilius more than 30 ft. from Arkhan during turn 2 or 3, and the step fails.",
          "{@b Kill Vermilius first.} If the vessel dies before Arkhan's turn 3, the thread snaps back into Or'Henn at Pull 8. Arkhan picks a new vessel next round: the nearest chromatic dragon.",
          "{@b Let it happen.} Or'Henn is free of the curse for good. His gold scales stay gold. And Tiamat is awake."
        ]
      },
      {
        "t": "choices",
        "prompt": "Did Arkhan finish the Offering?",
        "items": [
          {
            "label": "Yes: Tiamat wakes",
            "goto": "tiamat-reborn"
          },
          {
            "label": "No: they stopped him",
            "goto": "ending"
          },
          {
            "label": "Krull's offer",
            "side": "krulls-offer"
          }
        ]
      }
    ]
  };

  C.scenes["tiamat-reborn"] = {
    "id": "tiamat-reborn",
    "title": "Tiamat Reborn",
    "when": "If Arkhan finishes the Offering",
    "duration": "60 to 90 minutes",
    "blocks": [
      {
        "t": "read",
        "text": "Vermilius dies without a sound.\n\nFor a heartbeat nothing happens. Then the green dragon's body splits down the spine like a seed husk, the way Uldrak's did, and something climbs out of it that is far too big to have been inside.\n\nOne head. Then two. Then five: red and blue and green and black and white, rising on long necks over the battlefield, and every one of them is looking at you.\n\nThe sky changes colour five times.\n\nEvery dragon in the air stops fighting.\n\n\"Thank you, little gardener,\" says the red head, in Or'Henn's mother's voice. \"Arkhan,\" says the white head, \"you may stand.\""
      },
      {
        "t": "note",
        "title": "She Is Not Finished",
        "text": "This is {@c tiamat-risen|Tiamat Risen}: a goddess half-born into a stolen body, not her true form. She starts at 250 hit points and regains 50 at the start of each of her turns until she reaches 400. The party is not meant to kill her today. They are meant to survive, and to decide which side of the split to stand on."
      },
      {
        "t": "h",
        "text": "The Dragons Choose"
      },
      {
        "t": "p",
        "text": "Tiamat cannot simply command dragons. No published stat block gives her that power. Chromatic dragons worship and fear her, but they keep their own minds. Here, her presence forces the choice. Each surviving dragon makes a {@b DC 20 Wisdom saving throw} the first time it sees her ({@side tiamats-dominion|Tiamat's Dominion})."
      },
      {
        "t": "list",
        "items": [
          "{@b Flash (red)} kneels without a save. He is a zealot. He fights for her.",
          "{@b Arkhan} rises and fights at her side. His Breath of the Five recharges at the start of each of his turns while she lives.",
          "{@b Krull} sees his chance, and turns. A goddess in a dragon's body is a dragon, and the orb of dragonkind can leash a dragon. He wants the orb, and he wants Arkhan's place. Obatala goes with him (advantage on the save: he trusts his rider more than his god).",
          "{@b Slarkas and Vistalancer} roll. A dragon that succeeds follows Krull. One that fails kneels to Tiamat until she harms it, or for 1 minute."
        ]
      },
      {
        "t": "read",
        "text": "Krull laughs. It is the first time you have heard him laugh.\n\nHe slaps Obatala's neck, and the white dragon wheels away from the goddess and roars at her, and two of the tower dragons wheel with him.\n\n\"The orb!\" Krull bellows down at you. \"Whoever holds it, hold it HIGH! She is wearing a dragon now! Leash her, and I will give you anything you want!\""
      },
      {
        "t": "h",
        "text": "Three Sides"
      },
      {
        "t": "list",
        "items": [
          "{@b Tiamat, Arkhan, Flash} (and Arkhan's cronies): want Or'Henn alive, the orb, and everyone else dead.",
          "{@b Krull, Obatala and the dragons who refused:} want the orb, Tiamat leashed, and Arkhan dead. They will not attack the party unless the party attacks them first, or refuses to hand over the orb.",
          "{@b The party} is in the middle, holding the one item both sides want."
        ]
      },
      {
        "t": "note",
        "title": "The Orb Against Tiamat",
        "text": "Anyone holding the orb can try to control Tiamat Risen: an action, and a DC 25 Charisma check (Or'Henn makes it with advantage, because she wants him). On a success she is charmed by the orb's holder until the end of their next turn and cannot attack them. On a failure, the orb's own trapped dragon turns on its holder: {@spell suggestion}, DC 18, from Tiamat herself. Krull will try to take the orb by force if nobody uses it well."
      },
      {
        "t": "h",
        "text": "Uldrak Returns"
      },
      {
        "t": "p",
        "text": "Bring him in at the start of round 3 of this fight, or the moment someone drops to 0 hit points, whichever comes first."
      },
      {
        "t": "read",
        "text": "The ground shakes.\n\nThen it shakes again, closer, and every head of the goddess turns at once toward the waste.\n\nUldrak comes over the ridge at a run, twenty feet of bronze and fire, and in his hands is a weapon that should not exist: black iron that drinks the light, and a long blade that weeps something red that is not blood. You can hear it. It is laughing.\n\n\"Mother of Dragons!\" he roars, and it is not a greeting. \"I have been small for three thousand years. Let me show you what I bought.\""
      },
      {
        "t": "p",
        "text": "Uldrak's numbers with Gnashing Hunger, Bel's reforged flail of Yeenoghu: {@side uldraks-errand|Uldrak's Errand}."
      },
      {
        "t": "encounter",
        "id": "tiamat-reborn",
        "title": "Tiamat Reborn",
        "combatants": [
          {
            "c": "tiamat-risen",
            "n": 1
          },
          {
            "c": "arkhan-the-cruel",
            "n": 1
          },
          {
            "c": "praxamor",
            "n": 1
          },
          {
            "c": "krull",
            "n": 1
          },
          {
            "c": "obatala",
            "n": 1
          },
          {
            "c": "skarrix",
            "n": 1
          },
          {
            "c": "vhennic",
            "n": 1
          }
        ],
        "notes": "Three-sided fight. Mark Krull's side in the tracker notes (Krull, Obatala, and whichever of Slarkas and Vistalancer passed the Dominion save). Carry over current hit points from the dragon fight. Tiamat Risen starts at 250 HP and regains 50 at the start of her turns until 400. Uldrak arrives at the start of round 3. XP: Tiamat Risen driven off 62,000; Arkhan killed 75,000."
      },
      {
        "t": "h",
        "text": "How It Ends"
      },
      {
        "t": "list",
        "items": [
          "{@b Tiamat Risen drops to 0 hit points:} the stolen body dies, and she goes back to sleep at the Monument, weaker. Unless Uldrak's weapon struck the final blow: then see his errand panel.",
          "{@b Tiamat leashed by the orb:} the orb turns gold, and Krull wants it more than anything in Avernus.",
          "{@b Tiamat flies:} she cannot leave Avernus (Asmodeus's prison still holds), but she is awake, and Avernus knows it. Everything changes. See the Ending."
        ]
      },
      {
        "t": "choices",
        "prompt": "How did it end?",
        "items": [
          {
            "label": "Go to the Ending",
            "goto": "ending"
          },
          {
            "label": "Uldrak's weapon",
            "side": "uldraks-errand"
          },
          {
            "label": "Can she control dragons?",
            "side": "tiamats-dominion"
          }
        ]
      }
    ]
  };

  // Session 10 onward: he is not in the dragon fight, he comes for the Offering.
  C.endgame.arkhanTactics = [
    "Session 10: he is not in the dragon fight. He arrives in {@scene arkhans-gambit|Arkhan's Gambit}, when the party is winning.",
    "His only goal is the Offering: three turns of ritual. He spends Legendary Resistance and legendary actions to protect his concentration, not to deal damage.",
    "Uses Command the Line to keep Vermilius beside him, and to have Flash breathe on whoever is hurting him.",
    "After Tiamat rises: fights at her side. Breath of the Five recharges every turn while she lives. Targets Krull before anyone else: a traitor first.",
    "Still teleports out at about 230 hit points, unless Tiamat is watching. In front of her, he will not run."
  ];

  // Fight Sequence phases for the two endgame scenes (statblocks.html left column).
  C.endgame.timeline = [
    {
      "phase": "Arkhan's Gambit",
      "events": [
        {
          "when": "Arkhan arrives",
          "tag": "round",
          "text": "Teleports in with his cronies and Vermilius kneels behind him. Add them to the tracker."
        },
        {
          "when": "Arkhan turn 1",
          "tag": "round",
          "text": "{@b Draw the Debt}: Or'Henn DC 22 Charisma save. Fail: gold thread to the Hand; his Pull stops rising."
        },
        {
          "when": "Arkhan turn 2",
          "tag": "round",
          "text": "{@b Bind the Vessel}: thread into Vermilius (within 30 ft.). Thread: AC 20, 30 HP, radiant/force only. Cut it: curse back at Pull 8."
        },
        {
          "when": "Arkhan turn 3",
          "tag": "round",
          "text": "{@b The Sacrifice}: Fane-Eater kills Vermilius. Tiamat wakes."
        },
        {
          "when": "Any damage to Arkhan",
          "tag": "every-turn",
          "text": "Concentration: Con save DC 10 or half damage (+15, 4 Legendary Resistances)."
        },
        {
          "when": "Vermilius moved 30+ ft. / killed early",
          "tag": "trigger",
          "text": "Step fails; curse snaps back at Pull 8; Arkhan picks the nearest dragon next round."
        }
      ]
    },
    {
      "phase": "Tiamat Reborn",
      "events": [
        {
          "when": "Her round 1",
          "tag": "round",
          "text": "She does not attack: thanks Or'Henn, forgives Arkhan, names Krull a traitor."
        },
        {
          "when": "Each dragon, first sight",
          "tag": "trigger",
          "text": "{@b DC 20 Wisdom save} ({@side tiamats-dominion|Dominion}). Flash kneels, no save. Obatala saves with advantage. Fail: kneels to Tiamat. Success: joins Krull."
        },
        {
          "when": "Start of her turns",
          "tag": "every-turn",
          "text": "Tiamat Risen regains {@b 50 HP} (250 up to 400) unless Uldrak's blade hit her since his last turn."
        },
        {
          "when": "Orb holder's action",
          "tag": "choice",
          "text": "Control Tiamat: DC 25 Charisma (Or'Henn with advantage). Success: charmed until end of holder's next turn. Fail: Tiamat's suggestion (DC 18)."
        },
        {
          "when": "Round 3 or first PC at 0 HP",
          "tag": "trigger",
          "text": "{@b Uldrak returns} with the fiendish blade. {@side uldraks-errand|Uldrak's Errand}."
        },
        {
          "when": "Tiamat below 100 HP",
          "tag": "trigger",
          "text": "She takes the sky and leaves. Avernus hears her go."
        },
        {
          "when": "Feonor",
          "tag": "trigger",
          "text": "Leaves by teleport when Tiamat rises, unless given a very good reason."
        }
      ]
    }
  ];
})();
