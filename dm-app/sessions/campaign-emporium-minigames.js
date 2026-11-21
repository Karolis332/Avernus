// Campaign-wide: small games on the Emporium floor (Session 14), played with real dice in a few minutes each.
// Three more tables at the Soul Pit, a drinking contest at the Rapture, an endurance test at the Forge, a tasting
// at Ichor's. HOMEBREW, written 2026-11-21 (DM: "mini games as well as in the soul pit"). Shown in the Games tab
// of each spot on emporium.html (sessions/campaign-emporium-talk.js says which spot has which).
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.side, {
  "mini-imp-skulls": {
    title: "Imp Skulls (the Soul Pit's quick table)",
    blocks: [
      { t: "p", text: "{@b 1 player against the house, about a minute.} A bowl of six real imp skulls, carved as dice. Stake: 1 soul coin, or 100 gp at the low end of the bench." },
      { t: "steps", items: [
        "Roll a d6 (the player rolls the skull) and add it to the pile. Again, as often as the player likes.",
        "A {@b 1} and the imp bites: the pile is gone and the turn ends. The player may stop before that and keep the pile.",
        "Velluc rolls for the house in the open, the same way, and stops the moment he beats the player's pile (or bites).",
        "Higher pile wins; a tie goes to the house. A win pays the stake back once more. A pile of {@b 20 or more} is a 'full skull' and pays twice."
      ] },
      { t: "note", title: "For the DM", text: "Stopping between 15 and 20 is the smart play, and the crowd jeers anyone who stops under 10. Let the player roll every die and say the pile out loud each time." },
      { t: "table", caption: "Cheating", head: ["Try", "What happens"], rows: [
        ["Swap a skull (Sleight of Hand)", "Against Velluc's passive Perception 17. Caught: walked to the edge of the wards."],
        ["A spell on the skulls", "Arcana DC 15 first shows they are warded: any spell on them makes them bite the caster (1d4 piercing) and the crowd laughs."],
        ["Distract Velluc (Deception or Performance DC 16)", "He rolls one die fewer before stopping. Legal, and he admires it."]
      ] },
      { t: "table", caption: "d4, when the player wins three in a row: the skulls start talking", head: ["d4", "What the skull says"], rows: [
        ["1", "'Bet on the fat lemure.' (Advantage on the next Lemure Derby bet.)"],
        ["2", "'The dealer cheats when he praises you.' (True: it is Velluc's tell.)"],
        ["3", "It bites for real and keeps the drop of blood. Mahadi knows where the player is until dawn."],
        ["4", "It whispers a name the player knows, someone who lost big here tonight. Use a rumour from the floor's table."]
      ] }
    ]
  },

  "mini-lemure-derby": {
    title: "The Lemure Derby",
    blocks: [
      { t: "p", text: "{@b The whole Pit bets, about three minutes a race.} Four lemures in greased lanes, 30 feet to a line of salt. Velluc books the odds and pays them. Stakes: soul coins or gold, any amount the house accepts (up to 10 coins a bet)." },
      { t: "table", caption: "The runners", head: ["Lane", "Runner", "Moves each round", "Odds"], rows: [
        ["1", "Old Wet: steady, damp, beloved", "1d6 + 1 ft.", "2 to 1"],
        ["2", "The Magistrate: was one, in life", "1d8 ft.", "3 to 1"],
        ["3", "Gristle's Pride: hungry", "2d4 ft. Roll a d6 first: on a 1 it eats the runner next to it (that one is out)", "4 to 1"],
        ["4", "Little Mayor: fast and lazy", "1d12 ft. On a 1 it falls asleep: from then on roll a d6 each round, 4 or more and it wakes", "6 to 1"]
      ] },
      { t: "steps", items: [
        "The players bet. Each round the DM rolls every runner's die and says where they are. First past 30 feet wins; a dead heat is a d20 each, high wins.",
        "Once a race, a player may shout their runner on: Performance DC 15, and it gets +2 feet that round. Legal, and the crowd loves it.",
        "Every round, roll a d8 for the Pit (below)."
      ] },
      { t: "table", caption: "d8 each round: the Pit", head: ["d8", "What happens"], rows: [
        ["1", "A hell hound pup gets loose in the lanes: every runner moves 2 feet less this round."],
        ["2", "The two slowest runners bump and merge into one blob. It moves with the better of their dice from now on."],
        ["3", "Somebody throws a coin: the leader stops to look at it and does not move this round."],
        ["4-8", "Nothing but noise."]
      ] },
      { t: "table", caption: "Cheating", head: ["Try", "What happens"], rows: [
        ["A cantrip on a runner (thaumaturgy, prestidigitation, mage hand)", "The crowd sees spells: Stealth DC 17 to hide the casting. Caught: walked out, and every bet the party made is void."],
        ["Speak with animals or a beast's sense", "Lemures are fiends, not beasts: nothing happens, and a lemure stares at the druid with terrible hope."]
      ] },
      { t: "note", title: "Three wins in a race day", text: "Velluc pays, sourly, and gives the winner the winning runner 'as a souvenir'. It follows them like a duckling. It is a damned soul: Z'neth will buy it back for 1 coin, or it can be freed aboard the ship like any larva (your call)." }
    ]
  },

  "mini-liars-coin": {
    title: "Liar's Coin (bluffing, 2 to 6 players)",
    blocks: [
      { t: "p", text: "{@b About two minutes a round.} The game the dealers play among themselves, and Velluc's favourite. Played with soul coins in closed fists." },
      { t: "steps", items: [
        "Everyone at the table, Velluc too, hides 0, 1, 2 or 3 soul coins in a closed fist. Those coins are the pot.",
        "Going round the table, each names a total for all the fists together. No total may be named twice. Velluc names his last.",
        "Everyone opens. The closest guess takes every coin shown. An exact guess also takes 1 coin from the house. A tie splits the pot.",
        "Once a round, a player may stare down one fist: Insight against that player's Deception (Velluc's is +8). A win tells whether the fist holds nothing, one, or more."
      ] },
      { t: "note", title: "When someone guesses exactly twice in a row", text: "Velluc cheats: a coin 'appears' in his fist after the call. Perception DC 18 to see it. Caught, he pays the whole table double to keep it quiet, and he never forgets the face." }
    ]
  },

  "mini-hosts-toast": {
    title: "The Host's Toast (a drinking contest at the high table)",
    blocks: [
      { t: "p", text: "{@b Up to six drinkers, the hall watching, about five minutes.} Mahadi's cellar, five cups poured one at a time. Each cup is a Constitution save. A drinker who fails two saves is out; the last one upright wins." },
      { t: "table", caption: "The five cups", head: ["Cup", "Save DC", "On a failed save"], rows: [
        ["1. Elturian summer wine", "12", "Homesick: the drinker says one true thing about home, out loud."],
        ["2. Styx-chilled gin", "14", "Forgets the last ten minutes. A friend who reminds them brings it back."],
        ["3. Hellfire brandy", "15", "3d6 fire damage, and they breathe smoke for a minute: advantage on Intimidation, disadvantage on Stealth."],
        ["4. Mirror-ice vodka", "17", "Can only speak the truth for ten minutes (no save, no spell needed)."],
        ["5. The Host's Own", "19", "Poisoned until dawn, and charmed by Mahadi for an hour: he asks one small question, and they answer it honestly."]
      ] },
      { t: "list", items: [
        "Advantage on the saves: dwarves, and anyone resistant to poison. Immune to poison: the drink tastes of nothing, and Mahadi pours them the Host's Own at every cup.",
        "{@b Prize:} the Cask of Elturian summer wine, or 5 soul coins, or one honest answer from Mahadi about anything except the deal he is part of."
      ] },
      { t: "note", title: "The catch (DM)", text: "The Toast is on the house unless someone pays the 1-coin buy-in. Free cups go on the hospitality debt like everything free here, and the debt is not Mahadi's to hold tonight. A player who insists on paying makes him beam: 'Ah. You have been listening.'" }
    ]
  },

  "mini-hold-the-iron": {
    title: "Hold the Iron (Rassh's test)",
    blocks: [
      { t: "p", text: "{@b One player, a minute or two.} Rassh lifts a bar of infernal iron out of the coals with his tail, glowing, and holds it out: 'Hold her.'" },
      { t: "steps", items: [
        "Each round the bar is held: 2d6 fire damage, then a Constitution save, DC 10 + 2 for every round so far. A failed save drops the bar.",
        "Resistance halves the damage. Immunity to fire does not help: Rassh hisses 'that's not holding', and the bar burns the soul instead (the damage is necrotic).",
        "Count the rounds held. The crowd counts with him."
      ] },
      { t: "table", caption: "What holding earns", head: ["Rounds", "Rassh gives"], rows: [
        ["3", "Respect: the Forge's haggle DC is 2 lower for this player."],
        ["5", "A free sheaf of +1 arrows, or one weapon edged: +1 damage until the next long rest."],
        ["7", "He forges a small thing of the player's design for nothing (up to uncommon, your call)."],
        ["9 or more", "He tells them about the old maker's mark (the Forge's secret) and calls them by their kill from then on."]
      ] },
      { t: "note", title: "The smith's way", text: "A player with Smith's tools, or Arcana DC 15, can name the metal instead: infernal iron from the old archduke's fire, quenched in the Styx. That earns the 3-round reward without the burns." }
    ]
  },

  "mini-tasters-flight": {
    title: "The Taster's Flight (Ichor's Aweigh!)",
    blocks: [
      { t: "p", text: "{@b One player, a minute.} Six vials with no labels in a rack. The player picks three, or rolls 3d6 (reroll doubles). 1 gp each, or free if they promise to come back and tell Elliach what happened." },
      { t: "table", caption: "The rack (d6)", head: ["d6", "Vial", "Effect"], rows: [
        ["1", "Glabrezu's Grip", "For 10 minutes the drinker's hands are pincers: advantage on grapples, but nothing small can be held (no material components, no writing)."],
        ["2", "Imp Tongue", "Speaks and understands Infernal for an hour, and everything they say comes out rhyming."],
        ["3", "Chill of the Styx", "Resistance to fire for an hour, and one prepared spell (the DM picks) is forgotten until a long rest."],
        ["4", "Vrock Sneeze", "They sneeze at once: everyone else within 5 feet makes a DC 13 Constitution save or is poisoned for a round."],
        ["5", "Hellflower Bloom", "Flowers grow from their hair for a day: advantage on Persuasion with anyone who likes flowers, disadvantage on Deception with fiends."],
        ["6", "The Good Stuff", "2d4 + 2 temporary hit points and darkvision 60 feet (or 30 more) for an hour."]
      ] },
      { t: "note", title: "Guess first", text: "Before drinking, Medicine or Alchemist's supplies DC 14 names a vial's ingredients. Right: that bottle is free, and Elliach throws in a stabilised ichor (fire resistance)." }
    ]
  }
});
