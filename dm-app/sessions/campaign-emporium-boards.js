// The Emporium's games as the PLAYERS see them on the monitor (emporium.html?view=players): a card that says how the
// game plays, what it costs and what it pays, and a live board the DM drives from the Games tab (js/emporium-boards.js).
// Player-safe text only: no DCs to beat for cheating, no tells, nobody's secret (tests/emporium-boards.test.js checks).
// The full rules stay in sessions/campaign-emporium-minigames.js and -gauntlets.js. HOMEBREW, 2026-11-21.
(function () {
  var LADDER_HOW = ["One on one in the Ring. Nobody dies: the Red Hand pulls a fallen fighter out.",
    "Help from outside forfeits the bout.", "One minute and one potion between bouts. Stop after any rung and keep the prizes."];
  var LADDER_PAYS = ["4 soul coins", "8 soul coins, or a pick from Gristle's trophy rack"];
  function ladder(title, fighter, rungs, prize) {
    return { kind: "ladder", panel: "emporium-gauntlets", title: title, fighter: fighter, how: LADDER_HOW,
      buyIn: "2 soul coins a bout", pays: "Every rung pays; the third makes a Champion of the Ladder",
      rungs: rungs.map(function (r, i) { return { name: r, prize: i < 2 ? LADDER_PAYS[i] : prize + ", and the title Champion of the Ladder" }; }) };
  }
  var BOARDS = {
    "ladder-dawn": ladder("The Dawn Ladder", "Drenwal", ["Kettle, a chain devil", "Ogroz, a glabrezu of the Blood War", "Ser Haldric Vane, the Sold Oath"], "Haldric's Sunbadge"),
    "ladder-sky": ladder("The Sky Ladder", "Aurora", ["Skreech, a vrock", "Mother Quill, a bone devil", "Vashti of the Thorn Choir, an erinyes"], "Vashti's string"),
    "ladder-ash": ladder("The Ash Ladder", "Or'Henn", ["Grulk, a hezrou of the Blood War", "Sootmaw, the kennel-mother", "Ashvex, a young red dragon"], "6 soul coins and a batch of red scales"),
    "ladder-open": ladder("The Open Ladder", "Veska", ["Glaive-Sergeant Ulk, a bearded devil", "Hookjaw, a barbed devil", "Gristle himself"], "Gristle's own barb (a +1 dagger) and 6 soul coins"),

    "mini-lemure-derby": { kind: "race", title: "The Lemure Derby", length: 30,
      how: ["Four lemures in greased lanes, 30 feet to a line of salt. First past the salt wins.", "Shout your runner on once a race: if the crowd hears you, it gets +2 feet.", "Every round the Pit does something. Usually noise."],
      buyIn: "Any bet up to 10 soul coins, or gold", pays: "Velluc pays the odds on the winner",
      runners: [
        { name: "Old Wet", odds: "2 to 1", die: [1, 6, 1], blurb: "steady, damp, beloved" },
        { name: "The Magistrate", odds: "3 to 1", die: [1, 8, 0], blurb: "was one, in life" },
        { name: "Gristle's Pride", odds: "4 to 1", die: [2, 4, 0], eats: true, blurb: "hungry" },
        { name: "Little Mayor", odds: "6 to 1", die: [1, 12, 0], sleeps: true, blurb: "fast and lazy" }
      ],
      pit: ["A hell hound pup gets loose in the lanes: every runner moves 2 feet less.", "The two slowest bump and merge into one blob.",
        "Somebody throws a coin: the leader stops to look at it.", "", "", "", "", ""] },

    "mini-imp-skulls": { kind: "pot", title: "Imp Skulls", target: 20,
      how: ["Roll the skull and add it to your pile, as often as you dare.", "A 1 and the imp bites: the pile is gone.", "Stop when you like. Velluc then rolls for the house until he beats you, or bites.", "Higher pile wins; a tie goes to the house."],
      buyIn: "1 soul coin (or 100 gp at the low end of the bench)", pays: "A win pays the stake back once more; a pile of 20 or more pays twice" },

    "mini-liars-coin": { kind: "card", title: "Liar's Coin",
      how: ["Everyone hides 0 to 3 soul coins in a closed fist: those coins are the pot.", "Round the table, each names a total for all the fists. No total twice. Velluc names last.", "Everyone opens. The closest guess takes every coin shown; an exact guess takes one more from the house. A tie splits the pot.", "Once a round you may stare down one fist."],
      buyIn: "The coins in your fist", pays: "The pot" },

    "mini-hosts-toast": { kind: "toast", title: "The Host's Toast",
      how: ["Five cups, poured one at a time. Each one tests your Constitution.", "Fail twice and you are out. The last one upright wins."],
      buyIn: "On the house, or 1 soul coin", pays: "The Cask of Elturian summer wine, or 5 soul coins, or one honest answer from the Host",
      cups: ["Elturian summer wine", "Styx-chilled gin", "Hellfire brandy", "Mirror-ice vodka", "The Host's Own"],
      drinkers: "Drenwal, Aurora, Or'Henn" },

    "mini-hold-the-iron": { kind: "iron", title: "Hold the Iron",
      how: ["Rassh holds out a bar of infernal iron straight from the coals: 'Hold her.'", "Every round it burns (2d6 fire), then a Constitution save that gets harder each round. Drop it and it is over.", "The crowd counts with him."],
      buyIn: "Free", pays: "What Rassh gives at 3, 5, 7 and 9 rounds",
      rewards: { 3: "Respect: the Forge's prices soften for you", 5: "A sheaf of +1 arrows, or a weapon edged", 7: "A small thing of your own design, forged for nothing", 9: "The story of the old maker's mark" } },

    "mini-tasters-flight": { kind: "vials", title: "The Taster's Flight", pick: 3,
      how: ["Six vials with no labels. Pick three, or roll for them.", "Guess what's in one before you drink, and that one is free."],
      buyIn: "1 gp a vial, or free if you come back and tell Elliach what happened", pays: "Whatever is in the vial",
      vials: [["Glabrezu's Grip", "Your hands are pincers for ten minutes."], ["Imp Tongue", "Infernal for an hour, and everything you say rhymes."],
        ["Chill of the Styx", "Fire can't touch you for an hour, but a spell slips your mind."], ["Vrock Sneeze", "You sneeze. Everyone near you regrets it."],
        ["Hellflower Bloom", "Flowers grow from your hair for a day."], ["The Good Stuff", "A rush of vigour, and you can see in the dark."]] }
  };
  // which boards each Games panel drives (the Ladder panel has four)
  var BY_PANEL = { "emporium-gauntlets": ["ladder-dawn", "ladder-sky", "ladder-ash", "ladder-open"] };
  Object.keys(BOARDS).forEach(function (id) { if (/^mini-/.test(id)) BY_PANEL[id] = [id]; });

  var out = { boards: BOARDS, byPanel: BY_PANEL };
  if (typeof module !== "undefined" && module.exports) module.exports = out;
  if (typeof window !== "undefined") window.EMPORIUM_BOARDS = out;
})();
