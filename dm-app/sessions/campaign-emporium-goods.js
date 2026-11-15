// More merchandise for the Wandering Emporium's stalls (emporium.html): the second half of the stock.
// Loaded after campaign-emporium-market.js. It returns that market with these rows added to each
// stall's stock; the first file's object is not changed. Same rules as there: HOMEBREW, the same
// price scale, c: true = used up, scOnly: true = soul coins or a bargain only. g is the shelf, and a
// shelf named in the first file gets these rows too. Most of this is what gold buys well: gear,
// supplies, spell components, hired hands and more of the cage. Official items are named, not
// reprinted: the one-line effects are summaries, the item's own text wins.
// tests/emporium.test.js audits the merged market.
(function () {
  "use strict";
  var inNode = typeof module !== "undefined" && module.exports;
  var base = inNode ? require("./campaign-emporium-market.js") : window.EMPORIUM_MARKET;
  function shelf(g, rows) { return rows.map(function (r) { return Object.assign({ g: g }, r); }); }

  var MORE = {
    // ------------------------------------------------------------------ Infernal Rapture
    rapture: [].concat(
      shelf("The scroll room", [
        { name: "Scroll of {@spell remove curse}", rarity: "uncommon", sc: 2, c: true, qty: "2", note: "Cleric or warlock. Ends a curse on a creature, or the hold of a cursed item. It does nothing to Tiamat's curse, and Mahadi says so before the sale: refunds bore him." },
        { name: "Scroll of {@spell sending}", rarity: "uncommon", sc: 1.5, c: true, qty: "3", note: "Cleric. Twenty-five words to anyone the caster knows, and a reply. To another plane it fails 1 time in 20. A word to Elturel or Baldur's Gate, or to the ship from the Mirror's shelf." },
        { name: "Scroll of {@spell protection from energy}", rarity: "uncommon", sc: 2, c: true, qty: "2", note: "Cleric or druid. One creature has resistance to acid, cold, fire, lightning or thunder for an hour (concentration)." },
        { name: "Scroll of {@spell freedom of movement}", rarity: "rare", sc: 3, c: true, note: "Cleric or druid. An hour, no concentration: no paralysis, no restraint, no grapple or chain that holds, and hard ground costs nothing." },
        { name: "Scroll of {@spell dimension door}", rarity: "rare", sc: 3, c: true, qty: "2", note: "Aurora (warlock list). 500 ft. to any place she can name, with one passenger. Off a deck, out of a grip, across the ward's line." },
        { name: "Scroll of {@spell hold monster}", rarity: "rare", sc: 4, c: true, note: "Aurora. Wisdom save or paralysed for a minute, a new save each turn. A paralysed flier falls. A dragon's Legendary Resistance eats it: it is for the rider, not the mount." },
        { name: "{@item Scroll of protection|DMG} (fiends)", rarity: "rare", sc: 3, c: true, qty: "2", note: "Anyone can read it. For 5 minutes no fiend can come within 5 ft. of the reader or reach in, unless it passes a DC 15 Charisma check. It moves with the reader. The helmsman's friend." },
        { name: "Scroll of {@spell forbiddance}", rarity: "very rare", sc: 6, c: true, note: "Cleric, 10 minutes to cast. For a day nothing teleports onto the ship, and a fiend that boards takes 5d10 radiant then and on each of its turns aboard. My reading: the ward rides the deck when she moves. The DM may rule that it stays where it was cast." }
      ]),
      shelf("The back room", [
        { name: "{@item Sending stones|DMG}, a pair", rarity: "uncommon", sc: 3, note: "One stays with Jeremy at the helm. Once a day each: twenty-five words to the other stone, and a reply." },
        { name: "{@item Helm of comprehending languages|DMG}", rarity: "uncommon", sc: 2, note: "Read and understand any language at will. Infernal blueprints cost no extra days, and a contract can be read before it is signed." },
        { name: "{@item Lantern of revealing|DMG}", rarity: "uncommon", sc: 3, note: "Invisible creatures and things show in its 30 ft. of bright light. The house hangs them at its doors, which says something about the guests." },
        { name: "{@item Cape of the mountebank|DMG}", rarity: "rare", sc: 9, note: "Once a day, {@spell dimension door}, in a puff of smoke. It smells of brimstone. Here nobody will notice." },
        { name: "{@item Portable hole|DMG}", rarity: "rare", sc: 12, note: "A black cloth that opens a hole 6 ft. across and 10 ft. deep, and folds to a handkerchief. Two dragon heads fit. What lies in the party's own hole is not 'lodged' with anyone (clause 2)." },
        { name: "Feather token: anchor", rarity: "rare", sc: 1.5, c: true, qty: "2", note: "Quaal's. Touched to a ship: for 24 hours she cannot be moved by any means, not by a tow, a chain or a dragon's grip. Touch her again to end it." },
        { name: "Feather token: bird", rarity: "rare", sc: 2, c: true, qty: "1", note: "Quaal's. A roc that obeys and cannot attack, for a day: it carries 500 lb. at 16 miles an hour. Three people to the Mirror above the fog, if nothing with wings disputes the sky." }
      ]),
      shelf("Outfitted for the ice road", [
        { name: "Winter furs, a full set", rarity: "mundane", sc: 0.2, qty: "enough for the crew", note: "Coat, hood, mittens and boots, cut to fit while the buyer eats. Advantage on saves against the cold of the ice road and the Mirror's shelf." },
        { name: "Mountaineer's trunk", rarity: "mundane", sc: 0.3, qty: "3", note: "Ice axes, crampons, pitons and 200 ft. of silk rope for six. Advantage on checks to climb or cross ice, and a fall into a crevasse stops at the rope." },
        { name: "Heated pavilion tent", rarity: "mundane", sc: 0.5, qty: "2", note: "Red silk for eight, with a brazier that makes no smoke. A long rest on the ice is a comfortable one. {@b Catch:} red silk on white ice shows for a mile." },
        { name: "Ship's stores for a month", rarity: "mundane", sc: 1, note: "Food, water, lamp oil and rope for the Lady Vengeance and everyone aboard for thirty days, carried to the jetty by his staff. The old menu's bulk resupply, with its 10 % already in." },
        { name: "A case of mortal comforts", rarity: "mundane", sc: 0.3, qty: "5", note: "Baldur's Gate tobacco, Calishite coffee, sugar, soap. Given as a gift it moves a Wary keeper or a warlord's sergeant to Cordial, once each. It does not work on Mahadi: he sold it." }
      ]),
      shelf("What a spell needs", [
        { name: "Gem-studded feasting bowl, 1,000 gp", rarity: "mundane", sc: 10, c: true, qty: "1", note: "The component for {@spell heroes' feast}, used up by the casting. Drenwal or Or'Henn lay the feast themselves on the morning it matters, with no kitchen near and no debt. The cooked one is 5 SC, and cheaper for a reason." },
        { name: "Silver scrying mirror, 1,000 gp", rarity: "mundane", sc: 10, qty: "1", note: "The focus for {@spell scrying}; not used up. Cleric, druid and warlock can all cast it. {@b Catch:} it hung in his bath-house. For a tenday Mahadi sees whoever looks into it (Arcana DC 17 to notice, {@spell dispel magic} against DC 16 to clean it)." },
        { name: "Offerings for {@spell divination}, 25 gp", rarity: "mundane", sc: 0.25, c: true, qty: "4", note: "Incense and a kid from the kitchen, used up (Drenwal). One question about something in the next 7 days, and a short true answer. Ask about the bell." },
        { name: "Powdered silver and iron, 100 gp", rarity: "mundane", sc: 1, c: true, qty: "3", note: "For {@spell magic circle} (cleric or warlock, a minute to cast), used up. For an hour fiends cannot enter a 10-ft. circle, or cannot leave it. Draw it round the helm before the bell." }
      ])
    ),

    // ------------------------------------------------------------------ The Firesnake Forge
    forge: [].concat(
      shelf("Off the rack", [
        { name: "Arrows or bolts, a case of 100", rarity: "mundane", sc: 0.25, c: true, note: "Hell-forged heads, five sheaves at the rack price. For the crew's bows and a long night." },
        { name: "Silvered arrows, a sheaf of 20", rarity: "mundane", sc: 1, c: true, qty: "4", note: "Devils shrug off steel that is neither magic nor silver. For the crew's bows and anyone's second weapon. The Moonbow does not need them." },
        { name: "Crew arms, a chest", rarity: "mundane", sc: 1.5, qty: "2", note: "Six sets of legion surplus: chain shirt, shield, spear, light crossbow and 40 bolts. It arms whoever stays aboard. He files Zariel's mark off for nothing and enjoys it." },
        { name: "Spare lances, a rack of 4", rarity: "mundane", sc: 0.3, note: "Hellrider pattern, ash and infernal iron. Veska breaks them." },
        { name: "Spyglass, an officer's", rarity: "mundane", sc: 3, qty: "1", note: "For the crow's nest. In clear sky a lookout with it sees wings at twice the distance: the ship is not surprised from the air. It does nothing in fog." }
      ]),
      shelf("For the Lady Vengeance", [
        { name: "Deck ballista and 20 bolts", rarity: "mundane", sc: 2, extra: "+ 2 metal", qty: "1", note: "A second weapon station, bolted down in an hour: +6 to hit, range 120/480 ft., 3d10 piercing. An action to load, one to aim and one to fire, so two hands work it. Silvered bolts are 1 SC for ten." },
        { name: "Smoke pots for the stern, a set of 4", rarity: "mundane", sc: 0.5, c: true, qty: "3 sets", note: "Lit and dropped by anyone aft as a bonus action: a 40-ft. ball of black smoke hangs behind her for a minute. My ruling: the helm check that round has advantage against anything that hunts by eye. A dragon flies through it. A rider's aim does not." }
      ]),
      shelf("Arms", [
        { name: "{@item Javelin of lightning|DMG}", rarity: "uncommon", sc: 2, qty: "3", note: "Thrown, it becomes a bolt: 4d6 lightning along a 120-ft. line (DC 13 Dexterity for half), and its target takes the javelin and the lightning both. Once a day each. Blue dragon work, and he will not say whose." },
        { name: "Lance, +2", rarity: "rare", sc: 10, note: "For Veska: +2 to hit and damage, and it bites devils and riders as magic. From a Hellrider who did not turn. Rassh asks who will carry it before he names the price." },
        { name: "{@item Flame tongue|DMG}, a greatsword", rarity: "rare", sc: 12, note: "A word lights it: +2d6 fire on every hit, and light for 40 ft. Attunement. Wasted on devils. The white dragon's scales are already running in this heat." },
        { name: "{@item Sun blade|DMG}", rarity: "rare", sc: 14, note: "A hilt until its bearer wakes it: a blade of sunlight, +2, radiant damage, 1d8 more to undead, light as a rapier. Attunement. It was pawned twice and came back twice: nobody on this floor can hold it for long. For Lucan." },
        { name: "Boar spear of warning", rarity: "uncommon", sc: 5, note: "{@item Weapon of warning|DMG}. Its bearer has advantage on initiative, and the bearer and friends within 30 ft. cannot be surprised and wake at the first sign of a fight. Attunement. For the watch at the bell." },
        { name: "{@item Dagger of venom|DMG}", rarity: "rare", sc: 8, note: "+1. Once a day it coats itself: DC 15 Constitution or 2d10 poison and poisoned for a minute. No use on devils; good on their hired help." },
        { name: "{@item Gauntlets of ogre power|DMG}", rarity: "uncommon", sc: 4, note: "Strength 19. Attunement." },
        { name: "{@item Belt of hill giant strength|DMG}", rarity: "rare", sc: 10, note: "Strength 21. Attunement. He uses it to hold up his apron and will need another belt." }
      ]),
      shelf("Armour and shields", [
        { name: "Shield, +2", rarity: "rare", sc: 9, note: "+2 to AC on top of the shield's own. No attunement. The boss is a devil's face with the horns filed off." },
        { name: "{@item Arrow-catching shield|DMG}", rarity: "rare", sc: 9, note: "+2 to AC against ranged attacks, and a reaction takes an arrow meant for someone within 5 ft. Attunement. For whoever stands beside the druid." },
        { name: "{@item Glamoured studded leather|DMG}", rarity: "rare", sc: 9, note: "+1, and a bonus action makes it look like any clothes or armour: court silks at the high table, a rider's black on the jetty. For Aurora." }
      ]),
      shelf("For Moonkite and the Hellriders", [
        { name: "{@item Horseshoes of speed|DMG}", rarity: "rare", sc: 9, note: "+30 ft. to a mount's walking speed, nothing for its wings. Fitted to Moonkite in an hour. It does not like the forge, and Rassh does not like being looked at that way." }
      ])
    ),

    // ------------------------------------------------------------------ Burney the Barber
    barber: [].concat(
      shelf("Tonics and cures", [
        { name: "{@item Potion of healing|DMG}", rarity: "common", sc: 0.25, c: true, qty: "12", note: "2d4 + 2 hit points. The soothing tonic from her menu, corked to carry. In gold it is 25 gp: she is the only keeper who takes gold at par." },
        { name: "Healer's kit", rarity: "mundane", sc: 0.05, c: true, qty: "6", note: "Ten uses: a dying creature is stable, no check needed. She packs each one herself and adds a boiled sweet." },
        { name: "Antitoxin", rarity: "mundane", sc: 0.5, c: true, qty: "6", note: "An hour of advantage on saves against poison. Cheap insurance against the green dragon's breath, for everyone who does not get the periapt." },
        { name: "Blessed water, a flask", rarity: "common", sc: 0.25, c: true, qty: "8", note: "Thrown: 2d6 radiant to a fiend or an undead. She fills them from the basin. Nobody asks who blessed it." },
        { name: "Smelling salts", rarity: "common", sc: 0.3, c: true, qty: "6", note: "An action under a friend's nose ends frightened or charmed on that friend, once per bottle. Against a dragon's Frightful Presence it buys back a turn." },
        { name: "Scentless soap", rarity: "common", sc: 0.25, c: true, qty: "4", note: "A wash with it and a creature has no scent for 8 hours: hounds, and anything else that tracks by smell, have disadvantage to follow it." },
        { name: "Ointment for {@spell true seeing}, 25 gp", rarity: "mundane", sc: 0.25, c: true, qty: "3", note: "The component, used up (Drenwal, 6th level). An hour of truesight to 120 ft.: the host's hands, a rider who is not seen, what is really in the iron flask." },
        { name: "Rare oils for {@spell reincarnate}, 1,000 gp", rarity: "mundane", sc: 10, c: true, qty: "1", note: "The component, used up. Or'Henn's answer to a death within 10 days: a new body in an hour, of whatever kind the table rolls. The soul must be free and willing." }
      ]),
      shelf("Ink", [
        { name: "Spellwrought tattoo: {@spell death ward}", rarity: "rare", sc: 4, c: true, qty: "1", note: "Anyone can use it once: for 8 hours the first drop to 0 hit points becomes 1. Mahadi's scroll is 3 SC and needs a cleric." },
        { name: "Spellwrought tattoo: {@spell pass without trace}", rarity: "uncommon", sc: 1.5, c: true, qty: "2", note: "Anyone, once: for an hour (concentration) everyone within 30 ft. has +10 to Stealth and leaves no tracks. The whole party past the riders, or up the ice road under the fog." },
        { name: "Coiling grasp tattoo", rarity: "uncommon", sc: 3, note: "An action: ink reaches out 15 ft., DC 14 Strength save or 3d6 force and grappled until it breaks free. Attunement. She draws it as ivy." }
      ]),
      shelf("Faces", [
        { name: "Disguise kit with horns and a tail", rarity: "mundane", sc: 0.25, note: "Paints, wigs, false horns, a tail on a belt. With ten minutes of her showing how, anyone has advantage to pass as a tiefling or a cambion at a glance." },
        { name: "{@item Cloak of many fashions|XGE}", rarity: "common", sc: 0.5, note: "Changes cut and colour at a word. Not armour, and no disguise against anyone who looks twice, but it is the best-dressed thing on the jetty." }
      ]),
      shelf("The drawer under the basin", [
        { name: "{@item Periapt of wound closure|DMG}", rarity: "uncommon", sc: 4, note: "Its wearer is stable whenever dying, and every Hit Die spent heals double. Attunement." },
        { name: "{@item Boots of the winterlands|DMG}", rarity: "uncommon", sc: 4, note: "Resistance to cold, no slowing on ice or snow, comfort in any frost. Attunement. Like the banker's ring of warmth, a cheap answer to Obatala, and this one keeps its wearer's feet." },
        { name: "{@item Broom of flying|DMG}", rarity: "uncommon", sc: 7, note: "Fly speed 50 ft. (30 with more than 200 lb. aboard), no attunement, and it comes when called from a mile off. She sweeps the hair up with it and it tries to help." }
      ])
    ),

    // ------------------------------------------------------------------ From Here to Avernus
    bank: [].concat(
      shelf("Gems for the great spells", [
        { name: "Ruby dust, 1,000 gp", rarity: "mundane", sc: 10, qty: "1", note: "For {@spell forbiddance} (Drenwal, 10 minutes to cast). Not used up unless the ward is made permanent, so one purchase wards the ship every day he has the slot: nothing teleports aboard, and a fiend that boards takes 5d10 radiant. Mahadi sells the scroll for 6." },
        { name: "Diamond and opal dust, 1,000 gp", rarity: "mundane", sc: 10, c: true, qty: "1", note: "For {@spell symbol} (Drenwal, a minute to cast), used up. A glyph on the gangplank or a hatch: stunning, fear, sleep or pain for whoever crosses it uninvited. It breaks if the thing it is on moves more than 10 ft.: for a moored ship only." },
        { name: "Incense and powdered diamond, 200 gp", rarity: "mundane", sc: 2, c: true, qty: "3", note: "For {@spell glyph of warding} (Drenwal, an hour to cast), used up. A stored spell or 5d8 damage waiting on a hatch or a plank. It also breaks if moved more than 10 ft.: set it while she is moored." },
        { name: "A pair of platinum rings, 50 gp each", rarity: "mundane", sc: 1, qty: "2 pairs", note: "For {@spell warding bond}; not used up. One on Drenwal, one on whoever stands in front: +1 to AC and saves and resistance to all damage for an hour, and the cleric takes the same damage the other does." }
      ]),
      shelf("The cage: rings", [
        { name: "{@item Ring of mind shielding|DMG}", rarity: "uncommon", sc: 4, note: "Magic cannot read its wearer's thoughts, lies or nature. Attunement. A wearer who dies can go into the ring instead of the river, and a soul in the ring cannot be coined. {@b Catch:} somebody is already in it (the DM chooses who; a Hellrider scout is the easy answer) and has to be talked out first." },
        { name: "{@item Ring of feather falling|DMG}", rarity: "rare", sc: 8, note: "Fall 60 ft. a round and land unhurt. Attunement. For whoever is not on Moonkite when the deck tilts." },
        { name: "{@item Ring of evasion|DMG}", rarity: "rare", sc: 9, note: "3 charges: a reaction turns a failed Dexterity save into a success. A dragon's breath, up to three times a day. Attunement." }
      ]),
      shelf("The cage: cloaks, boots and bracers", [
        { name: "{@item Winged boots|DMG}", rarity: "uncommon", sc: 7, note: "Fly at walking speed for up to 4 hours a day, in pieces as small as a minute. Attunement. Tag: a courier, 'returned'." },
        { name: "{@item Boots of speed|DMG}", rarity: "rare", sc: 12, note: "Click the heels: walking speed doubled, and opportunity attacks against the wearer have disadvantage, for up to 10 minutes a day. Attunement." },
        { name: "{@item Wings of flying|DMG}", rarity: "rare", sc: 14, note: "A cloak that becomes wings for an hour, fly speed 60 ft., then rests 1d12 hours. Attunement. Tag: a cambion who could already fly. Vanity." },
        { name: "{@item Bracers of defense|DMG}", rarity: "rare", sc: 10, note: "+2 to AC for a wearer with no armour and no shield. Attunement. For Or'Henn, if he wears no hide." }
      ]),
      shelf("The cage: wands and rods", [
        { name: "{@item Wand of lightning bolts|DMG}", rarity: "rare", sc: 13, note: "7 charges, DC 15: 8d6 lightning down a 100-ft. line, more for more charges. Fire does nothing to most devils and cold little. Lightning they have no answer to. Attunement by a spellcaster." },
        { name: "{@item Immovable rod|DMG}", rarity: "uncommon", sc: 3, note: "Press the button and it stays where it is, holding 8,000 lb. (DC 30 Strength to shift it). A step in the air, a bar across a hatch, a hitch nothing can drag." },
        { name: "{@item Wand of secrets|DMG}", rarity: "uncommon", sc: 2, note: "3 charges: it pulses and points at the nearest secret door or trap within 30 ft. Infernal Rapture has four of the first and one of the second." }
      ]),
      shelf("The cage: holy things and charms", [
        { name: "Ioun stone, protection", rarity: "rare", sc: 12, note: "A dusty rose prism that circles its owner's head: +1 to AC. Attunement." },
        { name: "Ioun stone, awareness", rarity: "rare", sc: 10, note: "A dark blue rhomboid: its owner cannot be surprised. Attunement. For the watch, or for the helm." },
        { name: "Ioun stone, reserve", rarity: "rare", sc: 13, note: "A purple prism that holds 3 levels of spells for later, cast by whoever owns it. Attunement." },
        { name: "{@item Gem of seeing|DMG}", rarity: "rare", sc: 10, note: "3 charges: 10 minutes of truesight to 120 ft., looking through it. The host's hands, what stands unseen on the jetty, what is in the flask. Attunement." },
        { name: "{@item Amulet of proof against detection and location|DMG}", rarity: "uncommon", sc: 5, note: "Its wearer cannot be found or watched by divination: no scrying, no locating. Attunement. It does nothing against eyes, noses or a Writ with a drawing on it." },
        { name: "{@item Medallion of thoughts|DMG}", rarity: "uncommon", sc: 4, note: "3 charges: {@spell detect thoughts}, DC 13. Attunement. It fails on the host, and the banker sells it knowing that." },
        { name: "Figurine of wondrous power, bronze griffon", rarity: "rare", sc: 11, note: "A griffon for 6 hours, once every 5 days: a second flying mount, for Veska or Lucan. Tag: a Hellrider scout." },
        { name: "Figurine of wondrous power, silver raven", rarity: "uncommon", sc: 3, note: "A raven for 12 hours, then two days as silver. It carries a message as {@spell animal messenger}: ship to party and back." },
        { name: "Elemental gem, red corundum", rarity: "uncommon", sc: 2, c: true, qty: "1", note: "Broken, it calls a fire elemental for an hour as {@spell conjure elemental}: it obeys while the one who broke it concentrates, and turns on everyone if that slips. On the ice, against a white dragon, it is a wall that walks." },
        { name: "{@item Chime of opening|DMG}", rarity: "rare", sc: 4, c: true, note: "Ten strikes left. Each opens one lock, latch or lid within 120 ft. It is not quiet. Tag: a thief, crossed out twice." }
      ])
    ),

    // ------------------------------------------------------------------ Ichor's Aweigh!
    ichor: [].concat(
      shelf("Potions", [
        { name: "{@item Potion of climbing|DMG}", rarity: "common", sc: 0.3, c: true, qty: "4", note: "An hour: a climbing speed equal to walking speed, and advantage on Athletics to climb. Ice walls, a hull, a pavilion pole." },
        { name: "{@item Potion of comprehension|WDMM}", rarity: "common", sc: 0.3, c: true, qty: "3", note: "An hour of {@spell comprehend languages}. Read an Infernal blueprint, or a contract before signing it." },
        { name: "{@item Potion of watchful rest|WDMM}", rarity: "common", sc: 0.3, c: true, qty: "4", note: "For 8 hours magic cannot put the drinker to sleep, and a long rest spent wide awake on watch still counts." },
        { name: "{@item Potion of growth|DMG}", rarity: "uncommon", sc: 1, c: true, qty: "2", note: "Large for 1d4 hours, no concentration: +1d4 weapon damage and advantage on Strength checks and saves." },
        { name: "Red courage", rarity: "uncommon", sc: 1.5, c: true, qty: "4", note: "An hour: the drinker cannot be frightened. {@b Catch:} for the same hour, disadvantage on Insight and Perception. The label reads 'you will not see it coming, and you will not mind'." },
        { name: "{@item Potion of poison|DMG}", rarity: "uncommon", sc: 1, c: true, qty: "2", note: "Looks, smells and tastes like a potion of healing. 3d6 poison at once and again each turn while it lasts (DC 13 Constitution to fight it down). He sells it honestly labelled, 'for a gift'." },
        { name: "{@item Potion of frost giant strength|DMG}", rarity: "rare", sc: 2, c: true, qty: "1", note: "Strength 23 for 1 hour." },
        { name: "{@item Potion of gaseous form|DMG}", rarity: "rare", sc: 2.5, c: true, qty: "1", note: "An hour as mist, fly speed 10 ft., through any crack. Out of a net, a grip, a strongroom, or something's gullet." },
        { name: "{@item Potion of cloud giant strength|DMG}", rarity: "very rare", sc: 6, c: true, qty: "1", note: "Strength 27 for 1 hour. He asks to watch." },
        { name: "{@item Potion of longevity|DMG}", rarity: "very rare", sc: 8, c: true, qty: "1", note: "The drinker grows 1d6 + 6 years younger: it undoes the Hourglass's years for one hero, without Burney. Each bottle after a hero's first has a growing chance (10 % more each time) to add the years instead." }
      ]),
      shelf("Oils and dusts", [
        { name: "{@item Oil of sharpness|DMG}", rarity: "very rare", sc: 6, c: true, qty: "1", note: "One blade or 5 arrows: +3 to hit and damage for an hour." },
        { name: "Silversheen", rarity: "common", sc: 0.5, c: true, qty: "5", note: "A wipe of it and one weapon or ten arrows count as silvered for an hour. Plain steel against devils." }
      ]),
      shelf("Poisons and coatings", [
        { name: "Drow poison", rarity: "mundane", sc: 0.75, c: true, qty: "3 doses", note: "On a weapon: DC 13 Constitution or poisoned for an hour, and asleep as well if the save fails by 5 or more. For a bounty hunter someone wants to question. Devils are immune." },
        { name: "Essence of ether", rarity: "mundane", sc: 1, c: true, qty: "2", note: "Breathed in: DC 15 Constitution or poisoned and unconscious for 8 hours; a blow or a shake wakes them. One vial through a keyhole or into a helmet." },
        { name: "Truth serum", rarity: "mundane", sc: 0.75, c: true, qty: "3", note: "Swallowed: DC 11 Constitution or poisoned for an hour and unable to knowingly lie, as {@spell zone of truth}. Devils are immune to poison, so it does nothing to Kreeg or to a keeper. It works on a mortal captain." },
        { name: "Torpor", rarity: "mundane", sc: 1, c: true, qty: "2", note: "Swallowed: DC 15 Constitution or poisoned for 4d6 hours and unable to act while it lasts. In a drink, before the bell." },
        { name: "Midnight tears", rarity: "mundane", sc: 2, c: true, qty: "1", note: "Swallowed, and nothing happens until midnight. Then DC 17 Constitution: 9d6 poison, half on a save. The alibi is in the bottle." }
      ]),
      shelf("Things to throw", [
        { name: "Alchemist's fire, a crate of 6", rarity: "mundane", sc: 2, c: true, qty: "2 crates", note: "Thrown 20 ft.: 1d4 fire at the start of each of the target's turns until it is put out. Fire does nothing to devils. It does plenty to nets, pens, awnings and a white dragon's running scales." },
        { name: "Acid, a rack of 6 vials", rarity: "mundane", sc: 1, c: true, qty: "2 racks", note: "Thrown 20 ft.: 2d6 acid. One vial ruins a lock; three eat through a link of ordinary chain (DM's call for infernal iron)." },
        { name: "Bottled steam mephit", rarity: "common", sc: 1, c: true, qty: "3", note: "Smashed: a 20-ft.-radius cloud of scalding fog for a minute. Nothing sees through it, and anything that starts its turn inside takes 1d8 fire. Cover for a gangplank. It blinds the party's own archers too." },
        { name: "Tangle-pitch, a pot", rarity: "common", sc: 0.75, c: true, qty: "4", note: "Thrown 20 ft.: a 10-ft. square of black glue. DC 14 Strength save or restrained; an action and a DC 14 Strength check tears free. It burns." }
      ]),
      shelf("For the ship", [
        { name: "Core coolant, a carboy", rarity: "uncommon", sc: 2, c: true, qty: "2", note: "Poured into the Core before a hard run: advantage on the Core's next Constitution save (a Soul Burn chain or an Overdrive). Brewed for war machines. It is blue and very cold." }
      ]),
      shelf("The back of the wagon", [
        { name: "{@item Eversmoking bottle|DMG}", rarity: "uncommon", sc: 3, note: "Unstoppered, smoke pours out: 60 ft. of it at once and 10 ft. more each round, to 120 ft., until it is stoppered again. Not used up. A moderate wind clears it in a minute, so it hides a moored ship, not one under way." }
      ])
    ),

    // ------------------------------------------------------------------ Z'neth's Larva Farm
    larva: [].concat(
      shelf("War-band surplus", [
        { name: "Hobgoblin veterans, six for a tenday", rarity: "mundane", sc: 4, c: true, qty: "1 squad", note: "The rear guard of his old band with their sergeant (a hobgoblin captain and five veterans). They hold a gangplank or a deck against devils and bounty hunters and follow orders exactly. They will not fight a dragon: they break at Frightful Presence. {@b Catch:} paid in advance, and Z'neth knows where they are posted." },
        { name: "Devil's Ride, with a harpoon flinger", rarity: "mundane", sc: 6, qty: "1", note: "An infernal war machine for a rider and a passenger (the book's Devil's Ride, speed 120 ft.). It burns a soul coin a day. Lashed to the deck for ground runs: the ice road in two hours instead of eight, and heard at the Mirror long before it arrives." },
        { name: "Infernal iron chain, 100 ft.", rarity: "mundane", sc: 0.5, qty: "3", note: "It holds a prisoner, a war machine, or for a while something Huge (DC 26 Strength to burst)." },
        { name: "Hell-forged caltrops, a sack", rarity: "mundane", sc: 0.1, c: true, qty: "6", note: "Covers a 10-ft. square of deck or gangplank. A creature that walks in makes a DC 15 Dexterity save or takes 1 piercing, stops, and loses 10 ft. of speed until healed. Boarders in boots notice. Boarders with hooves notice more." },
        { name: "Weighted deck net", rarity: "mundane", sc: 1, qty: "2", note: "Strung over the open deck in ten minutes. A flier of Large size or smaller that lands or dives through it makes a DC 15 Dexterity save or is restrained (DC 15 Strength, or 10 slashing damage, to get free). It does not stop a dragon. It stops what rides down beside one." },
        { name: "Signal rockets, a case of 6", rarity: "mundane", sc: 0.3, c: true, note: "Red, green and white, seen for ten miles. The ship calls the party, or the party the ship. {@b Catch:} everyone else who is looking sees them too." },
        { name: "Manacles with a devil's-key lock", rarity: "mundane", sc: 0.3, qty: "6", note: "DC 25 to break or to pick. Made for prisoners with claws, and sized for a mortal on request." },
        { name: "Soul-coin strongbox, Mammon lock", rarity: "mundane", sc: 1, qty: "2", note: "Holds 100 coins; DC 25 to pick. Coins inside cannot be counted, smelled or scried from outside. The party's forty are being counted right now by half the floor." },
        { name: "Abyssal chickens, a crate of 6", rarity: "mundane", sc: 0.3, note: "Ugly, loud, edible, and they fly badly. Thrown from the rail, one draws the stoop of a hungry dragon or a pack of vrocks once (DM's call). Somebody aboard will name them." }
      ]),
      shelf("Tools made of souls", [
        { name: "Soul-glass spectacles", rarity: "uncommon", sc: 3, scOnly: true, note: "Lenses ground from a spent coin. The wearer sees whether a creature carries a soul of its own, a sold one, or none: a devil wearing a face, a construct, the hollow. {@b Catch:} they also show every soul in every coin the wearer carries, looking back." },
        { name: "Grave-whistle", rarity: "common", sc: 0.5, scOnly: true, note: "Bone, and only the dead hear it. Every larva, lemure and soul-form within 300 ft. turns toward the blower, and the ones who still remember a name come closer. A distraction in the pens, or a way to find who is in them." }
      ]),
      shelf("The warlord's own chest", [
        { name: "{@item Rope of entanglement|DMG}", rarity: "rare", sc: 8, note: "30 ft. An action and a word: it whips out at a creature within 20 ft., DC 15 Dexterity or restrained. AC 20, 20 hit points, and it mends itself." },
        { name: "{@item Horn of blasting|DMG}", rarity: "rare", sc: 9, note: "A 30-ft. cone: 5d6 thunder and deafened for a minute (DC 15 Constitution for half and no deafness). Glass and ice take it badly. One blast in five it bursts in the blower's hands for 10d6 fire." },
        { name: "{@item Mace of terror|DMG}", rarity: "rare", sc: 10, note: "3 charges: every creature the bearer chooses within 30 ft. makes a DC 15 Wisdom save or is frightened for a minute and must run. Attunement. A narzugon cannot be frightened. His nightmare can." },
        { name: "{@item Sword of wounding|DMG}", rarity: "rare", sc: 12, note: "What it cuts does not close: hit points lost to it come back only with rest, and once a turn a hit leaves a wound that bleeds 1d4 necrotic every turn until a DC 15 Constitution save. Attunement. His own, from the war he lost." }
      ])
    ),

    // ------------------------------------------------------------------ The Bone Devil Informant
    informant: [].concat(
      shelf("Maps and plans", [
        { name: "Sketch of the Mirror's shelf", rarity: "uncommon", sc: 2, note: "The Mirror, the raised centre, the ice huts, the pools and the drop (M1 to M6 on the Session 14 map), and where the escort stands. The party places itself before initiative, not after." },
        { name: "Chart of the upper air", rarity: "common", sc: 1, note: "Where the fog tops out and where the ash winds run. Above the fog a ship is seen for ten miles. Inside it she is hidden and half blind: my ruling is hunt roll -1 and disadvantage on helm checks while she stays in it." }
      ]),
      shelf("The Writ, the riders and Zariel", [
        { name: "The riders' written orders, a copy", rarity: "uncommon", sc: 3, note: "They may not cross the ward. They take the druid alive. And the Writ names a ship 'at her moorings': one under way is not theirs to stop. That is why a ship that leaves before the bell is not hunted." },
        { name: "Lantern codes of Zariel's fleet", rarity: "uncommon", sc: 2, note: "This tenday's signals. Once, the Lady Vengeance can answer a patrol's challenge, or the flying fortress's, as a supply tender: Deception with advantage, and no check at all from a distance if she also carries the forged papers." },
        { name: "Toll receipts for the Styx chains", rarity: "common", sc: 1, c: true, qty: "3", note: "Stamped in advance. Each passes one toll chain or watchtower without stopping. The stamps are real; the clerk who sold them is in Z'neth's pens." }
      ]),
      shelf("The dragons and their riders", [
        { name: "A hunter's plate of an old white dragon", rarity: "uncommon", sc: 2, note: "How far the breath reaches, how often it comes back, how far the fear carries. Read the buyer Obatala's breath and Frightful Presence lines from her stat block. A margin note: 'In this heat the belly scales run.'" },
        { name: "What Arkhan paid for on this floor", rarity: "uncommon", sc: 3, extra: "+ a pint of blood", note: "Three receipts: death-days from the Hourglass, a chair at the high table, one notary fee at the bank. It proves a contract exists and who signed first. It counts as one of the two clues for 'there is a deal', never toward the clauses." },
        { name: "The bids on the heads, so far", rarity: "common", sc: 1, note: "Mahadi's clerk 25, a collector in Dis 20 by letter, a warlord's captain 18. Clause 2 pays double the best, so the party learns the heads would go for 50 each, and go. Reading his list is not valuing. Asking him to add to it is." }
      ]),
      shelf("Papers to carry", [
        { name: "Writing case with a forger's kit", rarity: "mundane", sc: 0.3, note: "Infernal ink, vellum, quills, and wax that takes any seal pressed into it once. What a forgery needs, proficiency or not." },
        { name: "A legion pay-book, blank", rarity: "common", sc: 1, c: true, qty: "2", note: "Fill in a name, and any devil of merregon rank or lower takes the bearer for a paid auxiliary until an officer looks at it." },
        { name: "Translation while you wait", rarity: "mundane", sc: 0.25, c: true, qty: "per page or blueprint", note: "He reads Infernal blueprints, contracts and letters into Common, correctly. The Forge's blueprints then cost no extra days. {@b Catch:} he keeps a copy of everything he reads." }
      ]),
      shelf("The floor and its people", [
        { name: "The floor's price sheet", rarity: "common", sc: 1, note: "What each keeper paid for what is on the shelf tonight. Advantage on one haggle check at each stall." },
        { name: "The keepers, a page each", rarity: "common", sc: 0.5, qty: "7 pages", note: "What moves each one off list price: Rassh a dragon kill, Burney a kindness, the banker news of Kreeg, Elliach a new sample, Z'neth a full pen, Mahadi nothing. Read the buyer that stall's Play tab." },
        { name: "Whose souls are in your coins", rarity: "uncommon", sc: 2, note: "He holds the purse for a minute and writes: names, trades, how each was taken. Three of the forty are Elturians (the DM decides who). Z'neth's scales say how much is left in a coin. This says who." },
        { name: "Mahadi's guest book, the last tenday", rarity: "uncommon", sc: 2, note: "Who dined at the high table, drawn, not named: a dragonborn in black plate who smelled of old meat, twice; an erinyes of Malbolge. One page has been cut out. He is afraid of whoever was on it." }
      ])
    )
  };

  var MARKET = Object.assign({}, base, {
    spots: base.spots.map(function (s) {
      return MORE[s.id] ? Object.assign({}, s, { stock: s.stock.concat(MORE[s.id]) }) : s;
    })
  });

  if (inNode) module.exports = MARKET;
  if (typeof window !== "undefined") window.EMPORIUM_MARKET = MARKET;
})();
