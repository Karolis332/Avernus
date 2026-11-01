// Campaign-wide: annotated Avernus map (objectives, blood prices, Eventyr progression, DM state).
// Pin x/y are % of the map image, set on the landmark icon. No x/y = off the map (ledger only).
// Canon as of 2026-10-11 (session 9 prep). Edit statuses in the app; edit text here.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

window.CAMPAIGN.map = {
  id: "avernus",
  title: "Avernus",
  image: "maps/avernus-dm.webp",
  playerImage: "maps/avernus-player.webp",

  stages: [
    {
      id: "ch3a",
      title: "3a · Arrival & the Intermediaries",
      summary: "Eventyr opens the sandbox at Fort Knucklebone, where Mad Maggie's dream quest shows the Fallen Three. Three Intermediaries can find them: Mordenkainen, Red Ruth and Mephistopheles. Gate: one of them agrees to help. Here: done. The real Mordenkainen gave all three locations."
    },
    {
      id: "ch3b",
      title: "3b · Blood Pay",
      summary: "Every Intermediary wants the same price: a pint of blood from a powerful creature. Four sources, each with a task: Arkhan's vial of Tiamat's blood, the cursed empyrean Uldrak, the prisoner in the Obelisk, or the pit fiend Shummrath. Gate: blood delivered buys a Fallen One's location. Here: the locations came free, yet the party still hunts Tiamat's blood (session 9)."
    },
    {
      id: "ch3c",
      title: "3c · The Fallen Three & Final Tasks",
      summary: "The party seeks one of the Fallen Three, and each sets a last task: feed Haruman's body to the sibriex, bring Bel the control rods, or free Kostchtchie for Olanthius. Eventyr can add the Arches of Ulloch as the only door to the Citadel. Gate: a Fallen One names the way. Here: the road needs all three pieces, or Lulu's full memory. Haruman's piece is held. The Sword itself waits in the Citadel missing one small shard, which Olanthius keeps at the Crypt (Eventyr's option, ruled 2026-10-23)."
    },
    {
      id: "ch4",
      title: "Chapter 4 · The Sword of Zariel",
      summary: "Eventyr runs this as one adventuring day: climb the Scab, enter the Bleeding Citadel, survive the Idyllglen dream, claim the Sword. Gate: a worthy hand holds the Sword of Zariel. HERE IT IS BIGGER: the Citadel stands only in a 33-day window, Yael's resting place replaces Idyllglen, and the Sword waits on its dais missing one shard, which cracked off in Zariel's last battle. Olanthius has it. The shard carries the party into the vision trial, then rejoins the blade."
    },
    {
      id: "ch5",
      title: "Chapter 5 · Escape from Avernus",
      summary: "The ending is three jobs in any order: deal with Zariel (redeem, bargain or fight), break Elturel's chains, and send the city home. Gate: Elturel is back on the Material Plane. Here: the Sword breaks the chains, Kreeg's contract voids the sale, and freeing Coram earns the redemptive ending."
    }
  ],

  pins: [
    // ---------- 3a: Arrival & the Intermediaries ----------
    {
      id: "fort-knucklebone", title: "Fort Knucklebone",
      stage: "ch3a", path: "main", status: "done",
      objective: "Take Mad Maggie's dream quest and learn who the Fallen Three are.",
      bloodPrice: "Paid. Nothing is owed, but Maggie's goodwill is thin. A cold return is a risk.",
      blood: 0,
      eventyr: "Start of 3a. The dream quest shows the Fallen Three and hints at the Intermediaries.",
      requires: ["Arrival in Avernus."],
      unlocks: ["The Fallen Three, by name.", "The Intermediaries."],
      sessions: 1,
      dmChoices: ["Done. Bloodbath fell on the approach and Rasheem absorbed him. His wreck gave the Moonkite Cage Key.", "The fort has no icon on the official map, so it stays off the plate."],
      alternatives: ["Maggie is a fallback source of a Green Remnant.", "Chukka and Clonk can still repair war machines."]
    },
    {
      id: "tower-of-urm", title: "Tower of Urm",
      x: 39.6, y: 43.5,
      stage: "ch3a", path: "main", status: "done",
      objective: "Get an Intermediary to find the Fallen Three.",
      bloodPrice: "Paid in a fight: the leaking simulacrum was cut down. The real Mordenkainen trades knowledge, never favors.",
      blood: 1,
      eventyr: "3a Intermediary, one of three. In Eventyr he wants powerful blood before he helps.",
      requires: ["Rumor of a mad archmage in a crooked spire."],
      unlocks: ["The locations of all three Fallen Three.", "Drenwal's cure: die, and be reborn in the eyes of a god who never claimed him."],
      sessions: 1,
      dmChoices: ["Two towers: the simulacrum first, then the real Mordenkainen in a mirrored second tower.", "He gave all three locations with no blood price. That skipped most of 3b."],
      alternatives: ["He now tests anyone who claims a past visit (DC 15 Insight, both ways).", "Still a paid source of endgame lore."]
    },
    {
      id: "bone-brambles", title: "Bone Brambles",
      x: 11.0, y: 68.5,
      stage: "ch3a", path: "optional", status: "done",
      objective: "Deal with Red Ruth, the night hag Intermediary.",
      bloodPrice: "Paid. Red Ruth is dead. Her hoard of secrets and ingredients rides in the party's packs.",
      blood: 1,
      eventyr: "3a Intermediary. She brews the blood and sends her mind out to find the Fallen Three.",
      requires: ["Nothing. Any party can walk in."],
      unlocks: ["Ser Lucan, cut free and rebuilt.", "Red Ruth's leftovers, which Mahadi wants."],
      sessions: 1,
      dmChoices: ["Red Ruth was killed, not bargained with.", "The thicket is dying. It is set dressing now."],
      alternatives: ["Sell the leftovers to Mahadi for a lead or a better price."]
    },
    {
      id: "mirror-of-mephistar", title: "Mirror of Mephistar",
      x: 76.9, y: 8.8,
      stage: "ch3a", path: "optional", status: "changed",
      objective: "Buy true answers from Mephistopheles. Dumal is heading here too.",
      bloodPrice: "Per answer: Blood Pay (a level of exhaustion, or a permanent -1 to one ability score) or 5 soul coins. A spent coin annihilates its soul.",
      blood: 2,
      eventyr: "3a Intermediary. His cambion Rigorath carries questions through the mirror.",
      requires: ["The Obelisk password, for a clean audience (optional).", "A quiet approach. Arrive loud and 4 ice devils and a bone devil block the way."],
      unlocks: ["What Urexiel's vault holds: the staff, Kreeg's box, a Green Remnant.", "The copy-versus-original contract law.", "A pointer toward the Solar's Helmet.", "What {@c dumal|Dumal} asked for."],
      sessions: 1,
      dmChoices: ["Not needed as an Intermediary: Mordenkainen already paid out.", "Dumal escaped the Demon Zapper and is coming here to petition Mephistopheles against the party. See {@side arc-dumal|Dumal's arc}."],
      alternatives: ["Pick Dumal's timing: arriving with the party, already gone, or mid-audience.", "Mephistopheles is a third bidder for Kreeg's living hand.", "Skip it. Nothing breaks."],
      blocks: [
        { t: "h", text: "How to Run It From Here" },
        { t: "steps", items: [
          "Before the session, decide when Dumal arrives.",
          "On the glare-ice shelf, a quiet party is only watched. A loud one is stopped.",
          "Rigorath steps out of the mirror. State the price plainly, every time.",
          "Every answer is true and aimed at Zariel. DC 16 Insight shows the aim.",
          "If a soul coin is spent, the soul screams once and is gone. Let Lulu object."
        ] }
      ]
    },

    // ---------- 3b: Blood Pay ----------
    {
      id: "obelisk", title: "The Obelisk",
      x: 4.7, y: 24.3,
      stage: "ch3b", path: "optional", status: "changed",
      objective: "Rule what the party won here: the passwords to the Crypt and to the Mirror.",
      bloodPrice: "Ubbalex's deal is still unsigned. Eventyr's price is worse: a willing creature must take the prisoner's place forever.",
      blood: 2,
      eventyr: "3b Blood Pay option. A balor (Ubbalux) is trapped inside. A willing replacement frees it, and its blood pays an Intermediary.",
      requires: ["Already visited. Nothing more."],
      unlocks: ["The password to the Crypt of the Hellriders.", "The password to the Mirror of Mephistar.", "Ubbalex's deal, if anyone signs."],
      sessions: 0.5,
      dmChoices: ["Visited. The party tried many ways to pry out the passwords. The payoff is not ruled yet.", "The prisoner is played as Ubbalex, a patient devil broker with an open offer, not Eventyr's balor."],
      alternatives: ["Buy the words instead (Mahadi, Rigorath), or force the doors and pay in blood.", "Eventyr route: Krikendolt from the Spawning Trees takes the prisoner's place."],
      blocks: [
        { t: "note", title: "Rule It Now", text: "Pick one: a full password, a riddle, a false lead, or a debt to Ubbalex. Write it in this pin's note. Until then the Crypt and the Mirror stay vague." }
      ]
    },
    {
      id: "arkhans-tower", title: "Arkhan's Tower",
      x: 9.1, y: 14.8,
      stage: "ch3b", path: "main", status: "open",
      objective: "Get the vial of Tiamat's blood that Arkhan the Cruel wears at his neck.",
      bloodPrice: "A good creature's life: Arkhan asks for the Moonkite, then Lulu. On the way in, four adult dragons (CR 14 to 17) attack the ship: a real chance of a dead hero before anyone talks. Wrong Arkhan and it is a fight they should lose. Escape is the win.",
      blood: 3,
      eventyr: "3b Blood Pay. Krull leads the party to the Monument; trade a good creature, or take the blood by force.",
      requires: ["The Lady Vengeance, to fight the dragons from the deck and to run.", "A reason to want the blood. DM: confirm what it buys."],
      unlocks: ["Tiamat's blood.", "Arkhan's lore on Zariel, Bel, the Sword and Mephistopheles.", "News of Dumal on the road to the Mirror, for a favor owed."],
      sessions: 1,
      dmChoices: ["Upscaled to threaten a level 12 party: four adult dragons (black CR 14, green CR 15, blue CR 16, red CR 17), Obatala as an elder adult white dragon (CR 18), Krull CR 12, Torogar CR 15, Arkhan CR 22 (345 HP, AC 23).", "The dragon ambush taxes the party's resources before the talking starts. Obatala calls the halt.", "Arkhan names Aurora's bonded {@c moonkite|Moonkite} first, so the price is personal. See {@side arc-moonkite|the Moonkite's arc}.", "Krull may double-cross. Gargauth offers a side bargain."],
      alternatives: ["Eventyr's other good creature: Krikendolt, the soft-hearted bearded devil at the Spawning Trees. Still a good creature's death.", "Walk away and bleed someone else: Uldrak, Shummrath or the Obelisk's prisoner.", "Fight, grab the vial, and run for the ship."],
      session: "09-arkhans-tower",
      blocks: [
        { t: "h", text: "How to Run It From Here" },
        { t: "steps", items: [
          "Run session 9 as written.",
          "Write the outcome in this pin's note: who was given, or how the party fled.",
          "If the Moonkite died, mark the Caged Star pin {@b changed}: freeing Coram needs a new celestial witness.",
          "If Lulu died, her memory road is gone. The Citadel now needs all three Fallen Three pieces.",
          "Tiamat now has an interest in the party. That is a Chapter 5 lever (see the Monument pin)."
        ] },
        { t: "note", title: "What Does the Blood Buy?", text: "Not ruled yet. Good options: the Blood Pay at the Citadel's door; a stand-in for a missing Fallen Three piece; a bribe for Bel or Mephistopheles; or the book's use, spilled on Avernus to break Uldrak's curse." }
      ]
    },
    {
      id: "monument-to-tiamat", title: "Monument to Tiamat",
      x: 12.6, y: 9.0,
      stage: "ch3b", path: "main", status: "open",
      objective: "Meet Arkhan where he prays to Tiamat, and hear his price.",
      bloodPrice: "This is where the price is paid, or refused. Refuse and push, and the party faces Arkhan (CR 22), Torogar (CR 15), Krull (CR 12), a dozen white abishai and Obatala (elder adult white, CR 18) overhead. Deadly: running for the ship is the win. Any gift from Arkhan ties the party to Tiamat.",
      blood: 3,
      eventyr: "3b, the same step as Arkhan's Tower: Krull leads the party here for the trade.",
      requires: ["Krull's escort from the tower."],
      unlocks: ["Tiamat's voice, and a Chapter 5 option: Tiamat breaks Elturel's chains, for a price."],
      sessions: 0,
      dmChoices: ["Played inside session 9 (the bone field and the skull), so it adds no sessions.", "Arkhan's court is upscaled to match: Arkhan CR 22, Torogar CR 15, Krull CR 12. The chimera Asojano joins only as an escalation."],
      alternatives: ["Chapter 5, the Ire of Tiamat: bargain through Arkhan for the Dragon Queen to destroy the chains. A debt to a goddess."],
      session: "09-arkhans-tower"
    },
    {
      id: "stygian-dock", title: "Stygian Dock",
      x: 46.0, y: 58.0,
      stage: "ch3c", path: "optional", status: "open",
      objective: "Find Thavius Kreeg, the traitor who damned Elturel, reborn by Zariel as an amnizu. Or'Henn is the way in; his true name sits in the Contract V coffer.",
      bloodPrice: "A CR 18 amnizu on his own dock, with Styx water at his back. His signature is Forgetfulness: psychic damage and stun, and sustained it erases HOURS OF MEMORY. Do not bring Lulu here unprotected -- her memory is a hard prerequisite for freeing the Caged Star, and therefore for Drenwal's rebirth.",
      blood: 3,
      eventyr: "Not an Eventyr node. Campaign-specific: welded on in Session 8 when the party deduced the estate-master's identity.",
      requires: ["Or'Henn, who served him without knowing it.", "Ideally his true name (Contract V coffer) as leverage."],
      unlocks: ["A direct line to the contract that damned Elturel.", "The Companion (imprisoned planetar) and the Creed Resolute souls.", "Possibly a way to break the contract itself."],
      sessions: 1,
      dmChoices: ["Killed in the Nine Hells, he is destroyed for good.", "He can be bargained with instead of fought -- he is a bureaucrat who sold a city.", "The party's stated Session 10 route runs through here on the way to Uldrak's Grave."],
      alternatives: ["Skip him: the Fallen Three remain the main road to the Citadel."],
      blocks: [
        { t: "note", title: "The Memory Trap", text: "Their route to Uldrak runs up the Styx and through this dock. The river erases memory on contact; the amnizu erases memory as a signature power. Lulu's full memory is required to free the Caged Star, which is where Drenwal's rebirth happens. Two memory threats, aimed squarely at the one resource the campaign cannot replace -- and the party does not know it." }
      ]
    },
    {
      id: "uldraks-grave", title: "Uldrak's Grave",
      x: 27.5, y: 82.0,
      stage: "ch3b", path: "optional", status: "open",
      objective: "Help Uldrak, an empyrean cursed into a spined devil, kill a dragon. He pays in blood.",
      bloodPrice: "A dragon fight at Arkhan's Tower, with real death risk. If Uldrak dies, there is no blood.",
      blood: 2,
      eventyr: "3b Blood Pay option. Eventyr's twist: his curse breaks when he helps slay a dragon, not with Tiamat's blood.",
      requires: ["Word of a spined devil who swears he is an empyrean (Fhet'Ahla's imps know).", "A dragon. The tower's dragons are the nearest."],
      unlocks: ["Empyrean blood.", "A grateful empyrean who may stand with the party at the end."],
      sessions: 1,
      dmChoices: ["Not introduced in this campaign yet."],
      alternatives: ["The book's version: spill Tiamat's blood here to break the curse. That gives the session 9 vial a use.", "His gargantuan helmet could be where the Solar's Helmet lies (DM call)."]
    },
    {
      id: "pit-of-shummrath", title: "Pit of Shummrath",
      x: 19.5, y: 33.3,
      stage: "ch3b", path: "optional", status: "open",
      objective: "Dam the Styx over the pit and bleed the pit fiend Shummrath.",
      bloodPrice: "Shattersticks bought at the Emporium, a day of waiting by the dammed river, then a fight with a weakened pit fiend. Bel jailed him, so freeing him angers Bel.",
      blood: 2,
      eventyr: "3b Blood Pay option. The salamanders at the Firesnake Forge sell the explosives.",
      requires: ["Shattersticks from the Firesnake Forge (Wandering Emporium).", "Word of the pit, from Bel's old smiths."],
      unlocks: ["Pit fiend blood.", "A freed, furious pit fiend loose on Avernus."],
      sessions: 1.5,
      dmChoices: ["Not introduced in this campaign yet.", "Back to optional on 2026-10-23: the three-shard split was dropped for Eventyr's one-shard version, and no shard is here."],
      alternatives: ["Leave Shummrath jailed, and let Bel know you know. Leverage at the Forge."]
    },
    {
      id: "spawning-trees", title: "Spawning Trees",
      x: 83.7, y: 59.5,
      stage: "ch3b", path: "optional", status: "open",
      objective: "Save Krikendolt, a soft-hearted bearded devil, from his bullying comrades.",
      bloodPrice: "Low in the fight. High if the party then hands him over: he counts as a good creature, so trading him is a sacrifice.",
      blood: 1,
      eventyr: "3b helper site. Krikendolt will take the Obelisk prisoner's place, and he passes Arkhan's good-creature test.",
      requires: ["A traveler's rumor (Smiler, the Emporium)."],
      unlocks: ["A willing substitute for the Obelisk.", "A third candidate for Arkhan's price."],
      sessions: 0.5,
      dmChoices: ["Not introduced yet. A ready answer if the party will not give up the Moonkite or Lulu."],
      alternatives: ["Keep him as crew. Lulu would adore him."]
    },
    {
      id: "palace-of-gore", title: "Palace of Gore",
      stage: "ch3b", path: "optional", status: "done",
      objective: "Break Bitter Breath and free the Moonkite.",
      bloodPrice: "Paid: Aurora spent her one Wish. Bitter Breath died a mortal man, Aldwin Ardentwine.",
      blood: 2,
      eventyr: "3b travel encounter: Eventyr's Bitter Rivals adventure, with Smiler the Defiler.",
      requires: ["Done."],
      unlocks: ["The {@c moonkite|Moonkite}, bonded to Aurora.", "Veska and the githzerai monk, freed."],
      sessions: 1,
      dmChoices: ["Homebrew site, not on the official map.", "One Wish ended it. The same Wish broke the Moonkite's cage, and it bonded to Aurora on the spot."],
      alternatives: ["Go back for Aldwin's signet and hidden letter.", "A lesser warlord may claim the ruin if it is ignored."]
    },
    {
      id: "demon-zapper", title: "The Demon Zapper",
      x: 29.4, y: 56.0,
      stage: "ch3b", path: "optional", status: "done",
      objective: "Turn the Zapper on Yeenoghu's avatar and Dumal.",
      bloodPrice: "Paid: Asimov died, his soul saved in the Soul Capacitor. Dumal escaped in black smoke.",
      blood: 3,
      eventyr: "3b helper site. In the book its captive unicorn is a good creature Arkhan would take.",
      requires: ["Done."],
      unlocks: ["Tears of the Caged Star, a clue to Coram.", "{@c dumal|Dumal's} open arc."],
      sessions: 1,
      dmChoices: ["Rebuilt as the session 7 climax: the party lured Yeenoghu's avatar and Dumal into the kill-field and fired the machine.", "Yeenoghu's avatar is destroyed. The machine is burnt out. Its discharge was raw Tears of the Caged Star.", "The book's captive unicorn is not used here. The Moonkite came from the Palace of Gore."],
      alternatives: ["Return to mark Asimov's death site: one free intel relay through the Capacitor.", "One last vial of Tears clings in the coils (DC 15 Arcana)."]
    },

    // ---------- 3c: The Fallen Three & Final Tasks ----------
    {
      id: "harumans-hill", title: "Haruman's Hill",
      x: 59.4, y: 23.5,
      stage: "ch3c", path: "main", status: "done",
      objective: "Face Haruman, Zariel's loyal general, and take the first piece of the road.",
      bloodPrice: "Paid in a hard fight. Haruman fought to the end.",
      blood: 2,
      eventyr: "3c, one of the Fallen Three. He says nothing alive; Eventyr has the party feed his body to the sibriex to read his memory.",
      requires: ["His location, from Mordenkainen."],
      unlocks: ["Fallen Three: 1 of 3. The Haruman piece, one third of the Citadel's blood-price."],
      sessions: 1,
      dmChoices: ["Done. His trophy was ruled the Haruman piece, so the sibriex step was skipped."],
      alternatives: ["None left. The site is spent."]
    },
    {
      id: "hellwasp-nests", title: "Hellwasp Nests",
      x: 41.8, y: 32.5,
      stage: "ch3c", path: "optional", status: "skipped",
      objective: "Hellwasps raid the party: an extra fight near Haruman's Hill.",
      bloodPrice: "Stolen gear, or a stolen ally. Hellwasps grab and fly.",
      blood: 1,
      eventyr: "3c filler. Pair it with Haruman's Hill, or drop it in when the party rests too easy.",
      requires: ["Nothing. They come to you."],
      unlocks: ["Nothing on the road. Pressure only."],
      sessions: 0.5,
      dmChoices: ["Skipped once Haruman's Hill was done."],
      alternatives: ["Use it as a travel encounter when a session runs short."]
    },
    {
      id: "sibriex", title: "Sibriex",
      x: 45.7, y: 64.3,
      stage: "ch3c", path: "optional", status: "open",
      objective: "Free the sibriex, feed it Haruman's body, and read the way to the Citadel.",
      bloodPrice: "A sibriex loose on Avernus. Abominations follow it.",
      blood: 2,
      eventyr: "3c final task for Haruman.",
      requires: ["Haruman's body."],
      unlocks: ["The way to the Bleeding Citadel (Eventyr)."],
      sessions: 1,
      dmChoices: ["The Haruman errand here is spent -- the trophy supplied the piece -- so it is a temptation, not a quest.", "RE-OPENED for session 10: the party flies past it (flight scrolls, overland) on the way to Uldrak Grave. Scene written in 10-the-styx-run.js.", "It smells Tiamat curse on Or Henn and explains the mechanism for free.", "DIAL: it offers to MAKE a dragon for the curse to step into. Cut this if you want Tiamat to stay caged.", "A sibriex spawn still roams the travel table."],
      alternatives: ["If a piece is lost, the sibriex can read memory from another body."]
    },
    {
      id: "bels-forge", title: "Bel's Forge",
      x: 75.1, y: 26.5,
      stage: "ch3c", path: "main", status: "open",
      objective: "Hear Bel's price on the first visit, then trade him the spare control rods and the fortress command cipher for the second piece of the road.",
      bloodPrice: "A deal with a CR 25 pit fiend who never lies and never gives. Fire giants in the work-halls. Arkhan's 'regards' make him colder.",
      blood: 2,
      eventyr: "3c, one of the Fallen Three. His final task: the adamantine rods from the Wrecked Flying Fortress.",
      requires: ["Bel's price: the spare rod set and the command cipher, still in the wreck. The party does not know he wants them yet; the first audience reveals it.", "Shummrath, his prisoner, still jailed."],
      unlocks: ["Bel's price, on the first visit.", "Fallen Three: 2 of 3, on the trade.", "Intel on Zariel, and the caged celestial (Coram).", "A host for filing Kreeg's contract: Bel would love to preside."],
      sessions: 2,
      dmChoices: ["The ship's half of the rods is done: the primary rods are installed. Bel's half, the spare set and the cipher, is still in the wreck.", "Two visits: 1.5 sessions for the first audience, 0.5 for the trade.", "His truesight sees the Soul Capacitor on Or'Henn."],
      alternatives: ["Beat the piece out of him. Deadly, and the cipher is lost to the party.", "A party that guesses he wants Zariel's adamantine can fetch the spares first and trade in one visit.", "Eventyr's twist, Bel stalls until Haruman is dead, is already met."],
      blocks: [
        { t: "h", text: "How to Run It From Here" },
        { t: "steps", items: [
          "The slag mountains: Zariel's devils test the ship on the approach.",
          "Area A, the soul-coin haulage floor. Area B, the work-halls and the trial.",
          "Area C, the iron throne. Bel reads the party. He never lies.",
          "He names his price: the spare rods and the fortress command cipher, still in the wreck. The cipher is what he truly wants.",
          "Plant the caged-celestial hint and his offer to preside over Kreeg's contract.",
          "Return visit: the party hands over the spares and the cipher. Mark the Fallen Three at 2 of 3."
        ] },
        { t: "map", id: "bel-s-forge-35x30", title: "Bel's Forge" }
      ]
    },
    {
      id: "wrecked-flying-fortress", title: "Wrecked Flying Fortress",
      x: 65.8, y: 86.3,
      stage: "ch3c", path: "main", status: "changed",
      objective: "Go back for the spare rod set and the fortress command cipher, Bel's price. The primary rods are already in the ship.",
      bloodPrice: "The Warden still guards the engine-well, and Zariel's patrols hunt rod-thieves (Front B). Dawdle and the Rust Queen's crew is inside first.",
      blood: 2,
      eventyr: "3c final task for Bel.",
      requires: ["Bel's price, learned at the Forge. Until then the party has no reason to go back.", "Getting there before the Rust Queen."],
      unlocks: ["Bel's price. The cipher is the real prize; the spares are proof of the raid.", "Already won: {@c lady-vengeance|the Lady Vengeance} whole again, with full speed, both force cannons and the Soul Coin Overdrive."],
      sessions: 1,
      dmChoices: ["The primary rods are taken and installed: the DM ruled the ship repaired on 2026-10-11. See {@side ship-upgrades|Ship Upgrades}.", "The spare set and the command cipher are still in the wreck. The party does not know Bel wants them."],
      alternatives: ["The Rust Queen strips them first: buy them from her hoard, or raid it.", "Never go back: Bel is never paid. Beat his piece out of him, or lean on Lulu's memory."],
      blocks: [
        { t: "note", title: "The Return Run", text: "Half a session to one session. The Warden fight and the patrol's soft clock still apply. If the party ignored the Rust Queen twice, her crew is already inside." },
        { t: "map", id: "wrecked-flying-fortress-40x20", title: "Wrecked Flying Fortress" }
      ]
    },
    {
      id: "crypt-of-the-hellriders", title: "Crypt of the Hellriders",
      x: 22.7, y: 70.5,
      stage: "ch3c", path: "main", status: "open",
      objective: "Win the third piece of the ROAD from Olanthius, the guilty witness, with Lulu there to hear him -- and take the one SHARD missing from the Sword, which cracked off in Zariel's last battle and which he has kept ever since.",
      bloodPrice: "A death knight. Without Drenwal's truth about Halvard it is one DC 18 Persuasion, then a trial or a fight. Lulu relives the flight from Hell.",
      blood: 2,
      eventyr: "3c, one of the Fallen Three. His final task in Eventyr: free Kostchtchie to distract Zariel.",
      requires: ["The password from the Obelisk, or force, a trick, or a bought word.", "Drenwal: the truth that the Bhaal cult murdered his father Halvard, whose name Olanthius carved as fallen at the wall."],
      unlocks: ["The Sword's missing shard (Eventyr's option): it opens the Citadel's vision trial, then rejoins the blade.", "Olanthius's piece of the Fallen Three road.", "Lulu's Stage 4 memory: the flight, and the raising of the Citadel.", "The Coram clue: he saw the star fall."],
      sessions: 1.5,
      dmChoices: ["Olanthius is a witness, not the one who hid the Sword. Yael and Lulu carried it out; the shard cracked off in Zariel's last battle, and he picked it up off the field.", "He will not hand the shard over easily. Taking it means answering for what the Sword cost Yael.", "He argues against taking the Sword: it would waste Yael's death."],
      alternatives: ["Eventyr's price: free Kostchtchie first.", "Kill him: the road survives, the plain talk does not.", "Skip him: Lulu's memory, finished inside the Citadel, still opens the door."],
      blocks: [
        { t: "h", text: "How to Run It From Here" },
        { t: "steps", items: [
          "Rule the Obelisk password first.",
          "The approach: the air turns wrongly cold. Devils will not follow.",
          "The Nave of Names, then the Hellrider tombs.",
          "Olanthius kneels at the empty sarcophagus. He opens with grief, not a sword.",
          "Drenwal's truth about Halvard is the master key: advantage on every social check, plain speech, and the shard.",
          "When he names Yael, Lulu's memory fires. Do not miss it.",
          "Mark the Fallen Three at 3 of 3, and Lulu's stage."
        ] },
        { t: "map", id: "crypt-of-the-hellriders-40x30", title: "Crypt of the Hellriders" }
      ]
    },
    {
      id: "kostchtchies-maw", title: "Kostchtchie's Maw",
      x: 93.0, y: 22.8,
      stage: "ch3c", path: "optional", status: "open",
      objective: "Break the three ice anchors and free Kostchtchie to make war on Zariel.",
      bloodPrice: "A demon lord loose and owing nothing. Schedule one bill: a raid on a place they love, a tribute demand, or a grudge against Or'Henn.",
      blood: 3,
      eventyr: "3c final task for Olanthius.",
      requires: ["Nothing. A bargain, not a dungeon."],
      unlocks: ["Skip one Citadel-window penalty, or weaken one Zariel encounter.", "Chapter 5, Divided Attention: once a round Zariel loses a Legendary Resistance or a lair action."],
      sessions: 1.5,
      dmChoices: ["An optional lever. Olanthius asks for it, as in the book, but does not demand it.", "Back to optional on 2026-10-23: the three-shard split was dropped, and no shard is here."],
      alternatives: ["Leave him frozen. No penalty.", "Chapter 5: Kostchtchie is one of Eventyr's demon-lord allies against Zariel."]
    },
    {
      id: "arches-of-ulloch", title: "Arches of Ulloch",
      x: 6.7, y: 50.5,
      stage: "ch3c", path: "optional", status: "open",
      objective: "Get past the infernal sphinx that guards the hidden door to the Citadel.",
      bloodPrice: "A guardian fight or a riddle trial, right before the Citadel.",
      blood: 2,
      eventyr: "End of 3c. Eventyr makes the Arches the only way in to the hidden Citadel.",
      requires: ["The way to the Citadel, from a Fallen One."],
      unlocks: ["Passage to the Bleeding Citadel (Eventyr)."],
      sessions: 1,
      dmChoices: ["Not used so far. Here the Citadel is reached in a 33-day window by Lulu's memory or the Fallen Three road."],
      alternatives: ["A back door: if the window is missed or both roads fail, the Arches open a way in, at a price.", "Skip it."]
    },
    {
      id: "wandering-emporium", title: "The Wandering Emporium",
      stage: "ch3c", path: "main", status: "changed",
      objective: "The hub: unmask Kreeg as 'Vessper Hain', work the contracts, chase soul-bounties.",
      bloodPrice: "Every deal has a clause. Spent soul coins are dead souls. Kreeg forces a choice: justice or mercy, and a living signer is worth more.",
      blood: 2,
      eventyr: "Eventyr's information hub through Chapter 3. The Firesnake Forge sells Shattersticks.",
      requires: ["Nothing. It finds the party within a day."],
      unlocks: ["Kreeg's living hand, a key to the contract.", "Mahadi's hint that a living signer matters.", "Shattersticks, contracts, and a buyer for Red Ruth's leftovers."],
      sessions: 0.5,
      dmChoices: ["Kreeg hides here as 'Vessper Hain'.", "Or'Henn sealed on as the Soul Capacitor's carrier. Asimov's soul is saved; the Council clock is closed.", "Mahadi loved Feonor and will want news of her."],
      alternatives: ["Kreeg bolts if the puzzle box comes near him.", "Mephistopheles and Urexiel also bid for Kreeg."],
      blocks: [
        { t: "h", text: "How to Run It From Here" },
        { t: "steps", items: [
          "Give two clear hints that a living signer matters before any chance to kill Kreeg. No gotchas.",
          "If the party holds the box, it warms and tugs near him.",
          "Capture him or turn him. Either keeps the legal lever alive.",
          "If he dies anyway, switch to the slower path: a certified transcript from the amnizu registry."
        ] },
        { t: "map", id: "infernal-contract-thavius-kreeg", title: "Kreeg's Contract" }
      ]
    },
    {
      id: "ashen-garden", title: "The Ashen Garden",
      stage: "ch3c", path: "optional", status: "open",
      objective: "Walk Or'Henn's burned home. Find the staff's trail and Eldra's grave.",
      bloodPrice: "Grief more than blood. The crest on the ruin is Kreeg's: a reveal that hurts.",
      blood: 1,
      eventyr: "Not in Eventyr. Campaign homebrew, the start of Or'Henn's staff hunt.",
      requires: ["Or'Henn's wish to go home."],
      unlocks: ["Drag-marks to the Weeping Furrow.", "A Green Remnant seed at Eldra's grave."],
      sessions: 1,
      dmChoices: ["Feonor walks this trail under Or'Henn's Geas. See {@side arc-orhenn|Or'Henn's arc}.", "The staff hunt is on hold while she runs it."],
      alternatives: ["Skip it: nothing at the Crypt depends on it."]
    },
    {
      id: "weeping-furrow", title: "The Weeping Furrow",
      stage: "ch3c", path: "optional", status: "open",
      objective: "Break Kharzug the Root-Eater and learn who carried the staff up the chain.",
      bloodPrice: "A regenerating barlgura (about CR 9) in a trench that fights back. Only fire or radiance stops his healing.",
      blood: 2,
      eventyr: "Not in Eventyr. Staff hunt, step two.",
      requires: ["The drag-marks from the Ashen Garden, or Feonor's report."],
      unlocks: ["Lady Urexiel's name, and the road to the Scabrous Menagerie."],
      sessions: 1,
      dmChoices: ["Feonor may get here first."],
      alternatives: ["Let Feonor do it, and meet her at the Menagerie."]
    },
    {
      id: "scabrous-menagerie", title: "The Scabrous Menagerie",
      stage: "ch3c", path: "optional", status: "open",
      objective: "Raid or bargain with Lady Urexiel's vault: Or'Henn's staff, a Green Remnant, and Kreeg's puzzle box.",
      bloodPrice: "A yugoloth broker who paid for the raid on the Ashen Garden. Heist or war. Feonor may turn on the party here.",
      blood: 3,
      eventyr: "Not in Eventyr. The campaign's convergence dungeon.",
      requires: ["Urexiel's name (the Weeping Furrow, the Mirror, or Feonor)."],
      unlocks: ["Cinderbloom, Or'Henn's staff.", "Kreeg's box: the copy of the contract, the legal lever.", "A Green Remnant (1 of 3)."],
      sessions: 2,
      dmChoices: ["Feonor is Geas-bound to fetch the staff from here. Each casting lasts 30 days; track re-casts."],
      alternatives: ["Skip the copy: burn Zariel's original at the climax instead.", "Feonor delivers the staff and the box is never found."],
      blocks: [
        { t: "note", title: "Why It Matters", text: "This vault is the only way to win the legal lever before the final fight. Without the copy, the clean ending rides on burning the original in the middle of the battle." }
      ]
    },
    {
      id: "vaelisha", title: "Vaelisha, the Mother Ash",
      stage: "ch3c", path: "optional", status: "open",
      objective: "The 8-hour rite: three Green Remnants turn Cinderbloom into Cinderbloom Rekindled.",
      bloodPrice: "None to enter. The cost of leaving fires once, as they go.",
      blood: 1,
      eventyr: "Not in Eventyr. The capstone of the staff hunt.",
      requires: ["Cinderbloom.", "Three Green Remnants. She gives one herself.", "Her name, from Maggie, the Garden's records, or Or'Henn's instinct."],
      unlocks: ["Cinderbloom Rekindled.", "A true safe rest.", "A cutting to replant the Ashen Garden in the epilogue."],
      sessions: 1,
      dmChoices: ["Waits on the staff hunt."],
      alternatives: ["Skip it: the staff stays as it was, and the Garden stays ash."]
    },

    // ---------- Chapter 4: The Sword of Zariel ----------
    {
      id: "bleeding-citadel", title: "The Bleeding Citadel",
      stage: "ch4", path: "main", status: "changed",
      objective: "Reach the Citadel in a 33-day window, get inside, and claim the Sword of Zariel. It waits on its dais, missing one shard.",
      bloodPrice: "Blood Pay at the door. A vision trial in the Hall of the Last Charge. Lulu relives Yael's death. Miss the window and Elturel drops a Rung.",
      blood: 3,
      eventyr: "All of Chapter 4: the Scab, the Citadel gate, the Idyllglen dream, the Sword. One adventuring day.",
      requires: ["The shard from the Crypt, ideally. Without it Lulu's memory alone opens the vision trial, and the Sword stays notched (DM's choice what that costs).", "The road: all three Fallen Three pieces, or Lulu's final memory.", "A live window. It was 12 days out at the last count."],
      unlocks: ["The Sword of Zariel, whole again -- the physical lever.", "Lulu's reunion with Yael.", "Lulu's caging-memory, the door to Coram."],
      sessions: 2.5,
      dmChoices: ["The Sword waits on its dais as in the book, missing one shard (Eventyr's option, ruled 2026-10-23). It cracked off in Zariel's last battle; Olanthius kept it.", "The shard is the conduit for the vision trial. When the trial ends it flies up and rejoins the blade in a burst of light.", "The interior is this campaign's own: the Plain of Kneeling Penitents, the Wound-Gate, the Hall of the Last Charge, Yael's resting place, the Sword's chamber.", "The gate opens to grief or Blood Pay, never to force."],
      alternatives: ["Off-window: hold a vigil at the scar (1d6 each day; 1-2 means a threat finds the camp).", "Run the book's Scab and Idyllglen instead, with the maps below."],
      blocks: [
        { t: "h", text: "How to Run It From Here" },
        { t: "steps", items: [
          "Count the days. Arrive in the window, or plan the vigil.",
          "The Plain of Kneeling Penitents: the petrified faithful.",
          "The Wound-Gate: grief or Blood Pay opens it.",
          "The Hall of the Last Charge: a personal Wisdom trial for each character.",
          "Yael's resting place: Lulu's final memory and the reunion. Give it room.",
          "The Sword's chamber: the Sword glowing on its dais, with a notch in the blade. The shard they carry starts to pull toward it.",
          "The shard carries them into the vision, then flies home onto the blade. Then the worthiness test: \"The hero who becomes one with this blade exists no longer.\" Sincerity lowers the DC.",
          "Before they leave, state the three endings plainly."
        ] },
        { t: "map", id: "the-scab-level-1-30x30", title: "The Scab (book route)" },
        { t: "map", id: "idyllglen-100x65", title: "Idyllglen (book route)" }
      ]
    },
    {
      id: "caged-star", title: "The Caged Star (Coram)",
      stage: "ch4", path: "optional", status: "open",
      objective: "Free Coram-of-Small-Mercies: cure Drenwal and starve Zariel's stolen celestial power.",
      bloodPrice: "Drenwal must die and be reborn. The Moonkite must be alive to witness, and Lulu must remember the caging.",
      blood: 2,
      eventyr: "Not in Eventyr. Campaign homebrew that meets the main road at the Citadel.",
      requires: ["The Solar's Helmet, for the bearing.", "Lulu's caging-memory, recovered at Yael's resting place.", "The {@c moonkite|Moonkite} as celestial witness."],
      unlocks: ["The redemptive ending.", "Drenwal's rebirth, with Veska officiating.", "Zariel offered her old self back."],
      sessions: 1.5,
      dmChoices: ["The cage's location is left unwritten on purpose. The Helmet points to it in play."],
      alternatives: ["If the Moonkite went to Arkhan, find another celestial witness, or this road closes."]
    },

    // ---------- Chapter 5: Escape from Avernus ----------
    {
      id: "elturel", title: "Elturel: Zariel's Audience",
      stage: "ch5", path: "main", status: "changed",
      objective: "Over the sinking city, pull the levers: the Sword breaks the chains, the contract voids the sale, and Zariel is dealt with.",
      bloodPrice: "Zariel at full power. One lever alone leaves a scar: coined souls lost for good, a half-damned district, or a hero's cure denied.",
      blood: 3,
      eventyr: "Chapter 5: deal with Zariel (redeem, bargain or fight), break the chains, and free the planetar in the Companion to send the city home.",
      requires: ["The Sword of Zariel.", "The contract: Kreeg's copy filed, or the original burned in the fight.", "Lulu, whose final memory fires before initiative."],
      unlocks: ["The ending: compromised, clean, or redemptive."],
      sessions: 2,
      dmChoices: ["Three phases: the Audience (talk), the Fall (battle over the city), the Lever (a win condition, not a hit point bar).", "Ending tiers replace the book's list of outcomes."],
      alternatives: ["Other chain-breakers: Zariel's own hand, Tiamat through Arkhan, or the demon Crokek'toeck from the Scab.", "The book's ways home: strike the Companion with the Sword, a fiend's aid, or Bel's adamantine rods (the ship's rods now).", "Eventyr's allies: Olanthius may come to help, Kostchtchie to distract, Bel to strike."],
      blocks: [
        { t: "h", text: "How to Run It From Here" },
        { t: "steps", items: [
          "Before initiative: Lulu's final memory.",
          "Phase 1, the Audience. Let them talk; Zariel answers as a general.",
          "Phase 2, the Fall. Battle over the city as it sinks.",
          "Phase 3, the Lever. The fight ends when the levers are pulled, not when her hit points run out.",
          "Read the tier they earned, and run the escape."
        ] },
        { t: "map", id: "avernus-crater-encounter-map-50x50", title: "Avernus Crater" }
      ]
    },
    {
      id: "the-escape", title: "The Ride Home",
      stage: "ch5", path: "main", status: "changed",
      objective: "Fly the Lady Vengeance out ahead of the city in a chase across Avernus.",
      bloodPrice: "The Overdrive: each soul coin burned annihilates a soul. Failed checks wound the city.",
      blood: 2,
      eventyr: "Not in the book or Eventyr. Both end once Elturel is home.",
      requires: ["{@c lady-vengeance|The Lady Vengeance} whole (done).", "{@c jeremy|Jeremy} at the helm.", "Lulu aboard."],
      unlocks: ["The aftermath, told by tier."],
      sessions: 1,
      dmChoices: ["A group skill challenge, DC 15 to 18.", "Each freed soul gives +1 to one check. Each burned soul gives +3."],
      alternatives: ["The Styx Watchtowers make a natural gauntlet on the way out.", "If the party built the mercy engine, the Grace Drive replaces the Overdrive. See {@side ship-upgrades|Ship Upgrades}."],
      blocks: [
        { t: "map", id: "avernus-river-styx-encounter-map-50x50", title: "River Styx" }
      ]
    },
    {
      id: "finish-estimate", title: "Sessions to Finish",
      stage: "ch5", path: "main", status: "open",
      objective: "Estimate how many sessions are left, at 3 to 4 hours each.",
      bloodPrice: "None. A planning note.",
      blood: 0,
      eventyr: "Eventyr: Chapter 3 runs 5 to 15 sessions, Chapter 4 is one adventuring day, Chapter 5 is short.",
      requires: ["Keep the pin statuses current; the counter does the sum."],
      unlocks: ["A date for the finale."],
      sessions: 0,
      dmChoices: ["Counted from the state on 2026-10-11.", "The three-shard split was dropped on 2026-10-23 for Eventyr's one-shard version (the shard is at the Crypt), so the Maw and the Pit are optional again and the estimate below stands."],
      alternatives: ["See {@side campaign-progression|The Road to the End} for every branch."],
      blocks: [
        { t: "note", title: "The Estimate", text: "Main path: about {@b 11.5 sessions}, session 9 included. That is Arkhan, two visits to Bel with a return run to the wreck for his spare rods and cipher, the Crypt, the Citadel, the climax and the escape, reaching the clean ending by burning Zariel's original contract.\n\nEvery open site: about {@b 25 sessions}. Nobody plays them all: the four blood sources replace each other, and Feonor shortens the staff hunt.\n\nMost likely: {@b about 17 sessions}. That is the main path plus the Menagerie, Vaelisha, Coram and Dumal at the Mirror.\n\nTake 0.5 off if the wreck run is quick or Bel's price is guessed early. Add 1 or 2 for each missed Citadel window they wait out. Bel and the Crypt alone are 4 to 7 days of travel, and the window was 12 days out: plan for a miss." }
      ]
    }
  ]
};

Object.assign(window.CAMPAIGN.side, {
  "campaign-progression": {
    title: "The Road to the End",
    blocks: [
      { t: "p", text: "This is the full road through Avernus, as Eventyr Games lays it out, and how this campaign bends it. Eventyr turns Chapter 3 into a chain of choices. At each link the party picks one of several sites, so no single site is ever required. The map pins follow the same order." },
      { t: "h", text: "How Eventyr Builds the Road" },
      { t: "steps", items: [
        "{@b Arrival.} Fort Knucklebone. The dream quest names the Fallen Three: Haruman, Bel and Olanthius.",
        "{@b The Intermediaries.} Mordenkainen (Tower of Urm), Red Ruth (Bone Brambles) or Mephistopheles (Mirror of Mephistar) can find the Fallen Three.",
        "{@b Blood Pay.} Each Intermediary wants powerful blood: Arkhan's vial of Tiamat's blood, the empyrean Uldrak, the Obelisk's prisoner, or the pit fiend Shummrath.",
        "{@b The Fallen Three.} Seek one. Each sets a last task: feed Haruman to the sibriex, bring Bel the control rods, or free Kostchtchie for Olanthius.",
        "{@b The way in.} Optionally, the Arches of Ulloch are the only door to the hidden Bleeding Citadel.",
        "{@b Chapter 4.} The Scab, the Citadel, the Idyllglen dream, the Sword. One adventuring day.",
        "{@b Chapter 5.} Deal with Zariel, break the chains, and send Elturel home."
      ] },
      { t: "p", text: "Eventyr pads the gaps with the Hellwasp Nests, the Wandering Emporium, Smiler the Defiler and its Bitter Rivals adventure. Levels run from 7 at the fort to 11 at the Citadel." },
      { t: "h", text: "Where This Campaign Stands" },
      { t: "list", items: [
        "{@b Arrival: done.} Fort Knucklebone and the dream quest.",
        "{@b Intermediaries: done.} The real Mordenkainen gave all three locations, and no blood was asked. Red Ruth is dead.",
        "{@b Blood Pay: in play.} The party wants Tiamat's blood anyway. Session 9 is Arkhan's Tower. What the blood buys is not ruled yet.",
        "{@b Fallen Three: 1 of 3.} Haruman is dead and his piece is held. Bel and Olanthius are found.",
        "{@b The ship: whole.} The Lady Vengeance has her primary rods, full speed, both cannons and the Overdrive (ruled 2026-10-11). Bel's spare rods and cipher are still in the wreck.",
        "{@b Bigger road.} This campaign needs all three pieces, or Lulu's full memory, not just one Fallen One. Two levers save Elturel: the Sword and Kreeg's contract."
      ] },
      { t: "h", text: "The Branches Still Open" },
      { t: "list", items: [
        "{@b Arkhan's price.} Moonkite given: the Coram road needs a new witness. Lulu given: her memory road is gone, so all three pieces are needed. Neither: the party runs, and the blood comes from somewhere else, or not at all.",
        "{@b Bel's price.} The party does not know it yet. His first audience names it: the spare rods and the command cipher, still in the wreck. One more trip, unless the Rust Queen gets there first.",
        "{@b The Crypt.} The Obelisk password decides how gently it opens. Drenwal's father opens Olanthius.",
        "{@b The contract.} The copy waits in Urexiel's vault, the original in Zariel's hand. Either one, with the Sword, gives the clean ending.",
        "{@b Kreeg.} Alive, he opens the box and signs. Dead, the party needs the slower registry transcript.",
        "{@b Coram.} The Solar's Helmet, Lulu's caging-memory and the Moonkite together free the Caged Star. That is the redemptive ending.",
        "{@b Kostchtchie.} Freeing him weakens Zariel at the end, and sends a bill later.",
        "{@b The window.} Every missed 33-day window drops Elturel one Rung. It never comes back up."
      ] },
      { t: "h", text: "Editing the Road for Your Choices" },
      { t: "steps", items: [
        "After each session, open the map and set each touched pin: {@b done}, {@b open}, {@b skipped} or {@b changed}.",
        "Write what happened in the pin's note: who paid, what was won, what was ruled.",
        "Mark a site {@b skipped} when another site gave the same key. The sessions counter drops it.",
        "Mark a site {@b changed} when you rewired it but it still lies ahead. It still counts.",
        "When a ruling changes the road itself (a new key, a dead ally, a lost piece), change the pin's text in the campaign data so the next session starts from the truth."
      ] },
      { t: "note", title: "The Spine", text: "When the table drifts, come back to one line: free Elturel. The Sword breaks the chains. The contract unwrites the sale. Coram makes it a mercy instead of a war. How many of the three they bring decides the ending." }
    ]
  }
});
