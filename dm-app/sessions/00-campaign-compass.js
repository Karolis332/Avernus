// Campaign Compass: where the campaign stands after Session 11, the road to the end, how the book ends,
// Eventyr Games' take on the ending, and how this campaign differs. Not a playable session.
// Eventyr quotes are kept short and credited; the full PDFs are in the Library (gitignored, this device only).
// Campaign creatures come from the campaign-*.js files; this file defines none.
window.SESSION = {
  id: "00-campaign-compass",
  title: "Campaign Compass",
  subtitle: "Where we are and how it ends · Descent into Avernus",
  summary: "One place to see where the campaign stands now that the party knows where the Scab is. It covers the next steps in order, how the printed adventure ends, how Eventyr Games suggests running that ending (with quotes), and what this table has changed. Read it before planning Session 13 and the finale.",

  party: [
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 13. Sigil of the Binding (Tier II). Holds the Shield of the Hidden Lord." },
    { id: "aurora", name: "Aurora", note: "Archfey Warlock 13. Rides Moonkite (Bond 1)." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 13. Tiamat's curse, 0 gold scales. Holds Cinderbloom and the Orb of Dragonkind." }
  ],
  allies: [],
  creatures: {},

  scenes: [
    // =====================================================================
    // 1 WHERE WE ARE
    // =====================================================================
    {
      id: "where-we-are",
      title: "Where We Are",
      when: "State mid-Session 12: the party is still inside the Crypt",
      blocks: [
        { t: "note", title: "The one-line version", text: "In book terms the party is at the {@b end of Chapter 3 and the door of Chapter 4}. They hold the Sword's missing shard and know the road (the Scab). First they have to get out of the Crypt of the Hellriders, with Arkhan and five dragons waiting at the door." },
        { t: "img", src: "art/generated/env-road-to-the-scab.webp", caption: "The road to the Scab: the next step once the siege is broken." },
        { t: "h", text: "The party" },
        { t: "list", items: [
          "{@b Level 13}, three PCs: {@b Drenwal} (Light Cleric), {@b Aurora} (Archfey Warlock, on Moonkite), {@b Or'Henn} (Wildfire Druid). House rule: level 15 at 260,000 XP, then +60,000 per level.",
          "{@b With them in the Crypt:} {@c veska|Veska} and {@c ser-lucan|Ser Lucan} (both upgraded in the Crypt if they survive it), Moonkite.",
          "{@b Hidden in the mists:} the Lady Vengeance, with Colico Jack, Jeremy and {@b Lulu}. Default ruling: Zariel's riders take Lulu at the end of Session 12 (DM to confirm).",
          "{@b They hold:} Olanthius's {@b shard} of the Sword of Zariel, the {@b Orb of Dragonkind} (Uldrak's gift), the {@b Shield of the Hidden Lord} (Gargauth inside), {@b Cinderbloom} (Or'Henn's staff, delivered by Feonor)."
        ] },
        { t: "h", text: "Where they stand" },
        { t: "list", items: [
          "{@b Inside the Crypt of the Hellriders, Session 12 half played.} Done: the three urn waves and the Scales of Mercy (the shade was {@b Yael}; the party chose the insignia). Still ahead: the Archive, Wings at the Door, the way out. Full recap: Session 12, What Happened Last Time.",
          "{@b Outside the door:} {@c arkhan-the-cruel|Arkhan}, the four tower dragons ({@c skarrix|Slarkas}, {@c vhennic|Vistalancer}, {@c mirelle|Vermilius}, {@c praxamor|Flash}), {@c obatala|Obatala} and {@c krull|Krull}. Nothing evil can enter while the ward holds. The ward clock is at 0 of 6.",
          "{@b Arkhan's goal now:} kill the party, take Or'Henn hostage, and force Drenwal to call a gold dragon with {@spell planar ally}, so the curse can be moved into a dragon and Tiamat wakes. Session 12, Wings at the Door, runs it."
        ] },
        { t: "h", text: "The Fallen Three (the book's road to the Citadel)" },
        { t: "list", items: [
          "{@b Haruman:} killed. His piece is held.",
          "{@b Olanthius:} met in Session 11. He gave the shard and the location of the Scab.",
          "{@b Bel:} not met. The party carries Ralzala's letter of introduction. He wants the adamantine rods from the Wrecked Flying Fortress."
        ] },
        { t: "h", text: "Clocks running" },
        { t: "list", items: [
          "{@b Elturel sinking} toward the Styx. Days left: not fixed yet (see Decisions to Lock).",
          "{@b The Bleeding Citadel's window:} it shows itself every 33 days. Next window: not fixed yet.",
          "{@b Or'Henn's curse:} a clock, not a status. Every vision and every kind offer is pressure to ask a dragon for help. See {@side arc-tiamat|Arc: Or'Henn and Tiamat}.",
          "{@b Dumal:} alive, wounded, hunting Senna. His clock is estimated at 4 of 6.",
          "{@b Day count:} about Day 12 since the end of Session 5 (an estimate). See {@side world-state|The World Right Now}."
        ] },
        { t: "more", title: "Or'Henn's curse: how it works, in one place", src: ["Homebrew"], blocks: [
          { t: "list", items: [
            "{@b What it does.} It pushes Or'Henn to ask a dragon for help, aloud and meaning it. The curse moves only if that dragon then {@b willingly takes it} (DM ruling 2026-11-08: that is the catch; it can never be forced on a dragon). Then the dragon becomes the door. When that dragon dies, whoever kills it, Tiamat wakes.",
            "{@b Is an adult dragon enough?} Enough to wake her, not to free her. Through an adult vessel she comes as {@c tiamat-risen|Tiamat Risen}: half-born in the dragon's body, one head a round over five rounds, 250 to 550 hit points. Her true form (the CR 30 goddess) stays in her prison.",
            "{@b The pressure.} {@side tiamats-pull|Tiamat's Pull} (Wisdom save, DC 10 + Pull) and the gold scales from her gifts. At 5 scales he cannot refuse the next chromatic dragon that offers help. See {@side arc-tiamat|Arc: Or'Henn and Tiamat}.",
            "{@b Arkhan's two ways.} At the Crypt: hostage Or'Henn, {@spell geas} on Drenwal to call a gold dragon, Fane-Eater at Or'Henn's throat until he asks it for help and the gold dragon, being good, says yes to save him. In the endgame: he rips the curse out with the Hand of Vecna (DC 22 Charisma), binds it into Vermilius, who wants it, and kills her. See Arkhan's Gambit in the campaign endgame.",
            "{@b Ways out.} Her blood (spent on Uldrak), her word (Or'Henn kneels as her champion), {@spell wish}, or the dragon in the orb (DM's choice)."
          ] },
          { t: "p", text: "{@b Open, needs a ruling:} (1) Session 12's exit X says Tiamat wakes in her true form; the endgame says half-born. Pick one. (2) If Vermilius dies before the sacrifice, Arkhan takes \"the nearest chromatic dragon\", but an unwilling dragon cannot take the curse at all (DM ruling 2026-11-08). Flash would volunteer; Slarkas and Vistalancer would not." }
        ] }
      ]
    },

    // =====================================================================
    // 2 THE ROAD AHEAD
    // =====================================================================
    {
      id: "the-road-ahead",
      title: "The Road Ahead",
      when: "The next steps, in play order",
      blocks: [
        { t: "steps", items: [
          "{@b Break the siege} (Session 12). It is a puzzle with seven ways out, not a fight to win. Each dragon now has its own way to be lured, turned or baited (see their panels).",
          "{@b Leaving the Crypt:} Bhaal's Last Gasps start for Drenwal. Zariel notices the party. By default her riders take Lulu.",
          "{@b The Scab} (Session 13). The shard pulls toward it. Inside: Trantolox's demons, the shadow demon digging out {@b Crokek'toeck} (Yeenoghu's lost beast), and the gates of the Bleeding Citadel.",
          "{@b The Bleeding Citadel.} The shard opens the doors. Yael's ghost gives the tour. The shard carries the party into the {@b Idyllglen} vision, then flies back onto the blade. Claiming the Sword destroys the Citadel. See the side panel {@b The Sword Reforged} in Session 13.",
          "{@b Chapter 5: the finale.} Three jobs, in any order: deal with Zariel, break the chains, return Elturel. See How the Book Ends below.",
          "{@b Land the personal arcs} before or inside the finale: Drenwal's rebirth or Sigil 3, Or'Henn's curse and Tiamat, and Moonkite's lost patron for Aurora."
        ] },
        { t: "h", text: "Optional roads that feed the finale" },
        { t: "list", items: [
          "{@b Bel's Forge:} charms, an ice devil and the adamantine rods (with the Wrecked Flying Fortress). The rods are one of the book's ways to free the planetar.",
          "{@b The Stygian Dock:} {@c kreeg|Thavius Kreeg} holds the contract that damned Elturel. Breaking it is one of the book's ways to break the chains, and Or'Henn's old service to Kreeg makes it personal.",
          "{@b Kostchtchie's Maw:} optional again. Freeing him gives Zariel a distraction in the finale.",
          "{@b The Scabrous Menagerie:} Urexiel and Or'Henn's Green Remnants.",
          "{@b The Wandering Emporium:} Mahadi's trade, and Asimov's soul-bounties."
        ] },
        { t: "note", title: "Pacing for three PCs", text: "The book assumes four to six level-13 characters for the finale. This party is three. Allies are not a bonus here; they are the plan. Eventyr's own advice fits: give the players control of allied NPCs in the last fight. See {@side running-the-endgame|Running the Endgame}, section 7." }
      ]
    },

    // =====================================================================
    // 3 HOW THE BOOK ENDS
    // =====================================================================
    {
      id: "how-the-book-ends",
      title: "How the Book Ends",
      when: "The printed adventure, Chapters 4 and 5",
      blocks: [
        { t: "img", src: "art/generated/env-citadel-gates.webp", caption: "The gates of the Bleeding Citadel." },
        { t: "h", text: "Chapter 4: Sword of Zariel" },
        { t: "steps", items: [
          "{@b The Scab:} a hill-sized wound of living tissue with a demon-infested dungeon inside. It ends at the Citadel's gates.",
          "{@b The doors:} they open only for a good-aligned creature while Lulu is within 60 ft. Without her, a voice says to bring Lulu.",
          "{@b Inside:} the Sword on its dais. The carving reads, {@i \"The hero who becomes one with this blade exists no longer.\"} Yael's ghost appears; Lulu's memory wakes and carries everyone to {@b Idyllglen}.",
          "{@b Idyllglen:} a dream of the battle where Zariel saved the town from Yeenoghu's gnolls, the day she chose to march on Avernus.",
          "{@b Claiming the Sword:} Lulu tells the whole story of Zariel's fall. Taking the Sword destroys the Bleeding Citadel."
        ] },
        { t: "h", text: "Chapter 5: Escape from Avernus" },
        { t: "p", text: "Eventyr sums up the book's scattered endings in three jobs:" },
        { t: "read", text: "\"The characters need to accomplish three things before the end: Deal with Zariel, Archduke of Avernus. Break the Chains pulling Elturel down. Return Elturel to the Material Plane.\"\n\nEventyr Games, DM's Resources, Chapter 5, p. 1" },
        { t: "more", title: "Job 1 · Deal with Zariel (redeem, bargain or fight)", src: ["Book p.148–152", "Eventyr"], blocks: [
          { t: "p", text: "{@b Redeem her.} Bring the Sword within 10 ft. of Zariel, argue for her return to the heavens, and make a {@b DC 25 Charisma (Persuasion)} check. The DC drops by 5 if Lulu or Olanthius is present, by 10 if both are. On a success she takes the Sword and becomes an angel again, the party gets a blessing of health and a feather that summons her for an hour, and she shatters the Companion herself, which frees the planetar, who returns Elturel." },
          { t: "p", text: "{@b Bargain with her.} She frees Elturel in exchange for one of these: destroying a demon lord (Baphomet, Yeenoghu or Kostchtchie); the Shield of the Hidden Lord, after which the party must destroy the freed Gargauth; {@b the Ultimate Sacrifice}, the soul of a good cleric or paladin of 10th level or higher; or the party's own service, forever." },
          { t: "p", text: "{@b Fight her.} 580 hit points, AC 21, regeneration. Killing her frees Elturel's people and breaks the chains, but does not bring the city home." }
        ] },
        { t: "more", title: "Job 2 · Break the chains (four ways in the book)", src: ["Book", "Eventyr"], blocks: [
          { t: "list", items: [
            "{@b By Zariel's hand}, if she is redeemed or bargained with.",
            "{@b Break the contract} between Zariel and Thavius Kreeg, or kill Zariel.",
            "{@b The Ire of Tiamat:} a deal with Arkhan, and the dragon goddess destroys the chains.",
            "{@b The Jaws of Crokek'toeck}, if he was freed from the Scab: smear a celestial's or paladin's blood on the chains and he chews through them."
          ] }
        ] },
        { t: "more", title: "Job 3 · Return Elturel (free the planetar in the Companion)", src: ["Book", "Eventyr"], blocks: [
          { t: "list", items: [
            "{@b One blow from the Sword of Zariel.} Zariel does it if redeemed or bargained with; otherwise the party can, and the blow may destroy the Sword.",
            "{@b Bel's nine adamantine rods}, driven into the Companion.",
            "{@b Evil's aid:} an archdevil or demon lord shatters it (Tiamat, Bel, or Gargauth if released)."
          ] }
        ] },
        { t: "more", title: "The book's set piece: Endgame in Elturel", src: ["Book p.154", "Eventyr"], blocks: [
          { t: "steps", items: [
            "{@b River's Edge:} Elturel is sinking into the Styx while demons and devils fight in its shadow. Two horned devils attack.",
            "{@b Field of Flames:} three group checks to cross the battlefield, then two hezrous fighting the pit fiend Lucille.",
            "{@b Showdown:} Zariel is fighting a balor and is down to 450 hit points after four rounds. If the party fights her, she flees to her flying fortress at 100 hit points."
          ] }
        ] }
      ]
    },

    // =====================================================================
    // 4 EVENTYR'S ENDING
    // =====================================================================
    {
      id: "eventyrs-ending",
      title: "Eventyr's Ending",
      when: "What the Eventyr Games guides change or add",
      blocks: [
        { t: "read", text: "\"Of all the chapters in Baldur's Gate: Descent into Avernus, this chapter is by far the most open-ended chapter. ... This allows you to craft the ending that best fits your campaign.\"\n\nEventyr Games, Chapter 5, p. 1" },
        { t: "h", text: "1. The information decides the road" },
        { t: "p", text: "Eventyr's core advice: the information the party has decides which ending they can reach. Eventyr frames it as the DM picking a preferred ending; at this table the party chooses, so the job is to put the clues for every road in reach, through NPCs (Lulu, Gargauth, Olanthius) and through what they can see from the steppe, and let them pick." },
        { t: "h", text: "2. Redemption as a group check, not one roll" },
        { t: "read", text: "\"You can have the tempted – but unsure – Zariel ask each of the party members to make an argument for why she should take the sword and rejoin the celestial host, from their unique perspective.\"\n\nEventyr Games, Chapter 5, p. 4" },
        { t: "list", items: [
          "Collective {@b DC 15} (unless NPCs already lowered it). A logical argument can use Intelligence or Wisdom instead of Charisma.",
          "A character who refuses, or has no argument, fails automatically.",
          "{@b Half or more succeed}, and Zariel takes the Sword."
        ] },
        { t: "h", text: "3. Redemption has a price, and a new enemy arrives" },
        { t: "read", text: "\"... the bargain.. reversed.. back to.. how he found me..\"\n\nZariel, as a solar again. Gory wounds open on her body and she falls to her knees. Eventyr Games, Chapter 5, p. 4" },
        { t: "p", text: "She asks the party to protect her while she heals. That gives the finale a fight even when redemption works. Eventyr's candidates for the new foe: Kostchtchie coming for his hammer, Bel striking while she is weak, or Tiamat:" },
        { t: "read", text: "\"If Arkhan the Cruel or Tiamat have featured heavily in the campaign, you can have the dragon goddess make her move immediately following Zariel's redemption.\"\n\nEventyr Games, Chapter 5, p. 4" },
        { t: "note", title: "Why this matters at our table", text: "Arkhan and Tiamat have featured more heavily here than anywhere in the book. Eventyr's option is already half-built: {@side tiamats-dominion|Tiamat's Dominion}, Tiamat Risen and the coalition in the campaign endgame file. If the party chooses redemption, Tiamat's rising is the natural follow-up fight." },
        { t: "h", text: "4. Zariel's lines when a fight turns" },
        { t: "more", title: "If Zariel is winning", src: ["Eventyr"], blocks: [
          { t: "read", text: "\"You have fought well, but to continue now would be wasteful. Put down your arms and let us talk. There might be ways you can serve me better than by dying.\"" },
          { t: "p", text: "She demands the party's service or the Ultimate Sacrifice, and offers their lives (dead characters raised) in return. A hard enough bargain might still buy Elturel." }
        ] },
        { t: "more", title: "If Zariel is losing", src: ["Eventyr"], blocks: [
          { t: "read", text: "\"Why are we dying to kill each other? The real evil is out there, on the field, clawing through flesh and bones with demonic claws. ... This fight is futile. Wasteful.\"" },
          { t: "p", text: "Instead of fleeing at 100 hit points, she offers a second chance. If the party still has the Sword, they can try redemption again {@b with advantage}. Otherwise she offers a bargain: a demon lord on the field, or betraying their own unlikely allies, for Elturel." }
        ] },
        { t: "h", text: "5. Allies against Zariel" },
        { t: "list", items: [
          "{@b Olanthius} walks up and denounces her: {@i \"If you can break your oath of servitude to the Lord of Light, surely it is only fitting that I break my oath to you as well.\"} He soaks damage and may be destroyed.",
          "{@b Elturel's survivors} drop from the city at the right moment: Ulder Ravengard on a griffon of radiant light, Hellriders on summoned pegasi. Let the players run them.",
          "{@b Bel} helps only indirectly: swear to destroy Zariel without naming him, and he gives a charm per character and an ice devil.",
          "{@b Arkhan}, in the book an option: ten days to muster white abishai. Eventyr warns he will try to take Zariel's throne afterwards."
        ] },
        { t: "h", text: "6. The Chapter 4 changes we already use" },
        { t: "list", items: [
          "{@b The shard instead of Lulu} (Eventyr's Chapter 1 guide): {@i \"The shard functions as the conduit for the characters' spirit journey into Idyllglen.\"} After Idyllglen, {@i \"the shard floats up to the sword and reattaches itself in a burst of gleaming light.\"}",
          "{@b Yael's tour} (Chapter 4 guide): she answers questions about Zariel and the Sword only with {@i \"Let me show you,\"} and leads the party to the stained-glass windows.",
          "{@b After the finale} (Chapter 4 guide): a redeemed Zariel takes the Sword, so give its wielder a sun blade in its place. If Zariel is destroyed, the Sword can burst into shards with her."
        ] },
        { t: "more", title: "Eventyr's three example endings (summary)", src: ["Eventyr"], blocks: [
          { t: "list", items: [
            "{@b 1.} Olanthius joins after the Sword; redemption succeeds; Bel attacks the weakened Zariel; Olanthius dies holding him off; Zariel frees Elturel.",
            "{@b 2.} Gargauth urges allies; a deal with Bel; Zariel intercepts the party at the Companion; Elturel's survivors turn the fight; Zariel offers a demon lord bargain.",
            "{@b 3.} Lulu pushes for redemption; it fails; Gargauth urges a cleric or paladin to offer their soul; Zariel wants the Shield too; Gargauth is freed and fought; the sacrifice gives redemption a second chance."
          ] },
          { t: "p", text: "Also in the guide: a d20 Battlefield Events table for fights under, in and over Elturel, and Zariel's full tactics. Open the Chapter 5 PDF in the Library." }
        ] }
      ]
    },

    // =====================================================================
    // 5 HOW OURS DIFFERS
    // =====================================================================
    {
      id: "how-ours-differs",
      title: "How Our Campaign Differs",
      when: "Book → Eventyr → this table",
      blocks: [
        { t: "list", items: [
          "{@b The Sword.} Book: whole on its dais. Ours: Eventyr's one-shard version. A shard cracked off in Zariel's last battle; Olanthius kept it and gave it to the party. It opens the doors and carries them into Idyllglen.",
          "{@b Lulu.} Book: the key to the doors, the vision and Zariel's story. Ours: not with the party; by default Zariel's riders take her at the end of Session 12. She becomes Zariel's leverage and a reason to face her. Her full memory is still needed for Drenwal's rebirth at the Caged Star.",
          "{@b Yael.} Book: Zariel's general, who hid the Sword and died guarding it. Ours (Session 12 ruling): Yael left her post at the devil gate to save a child; the breach lost the invasion, and Zariel, still an angel, executed her. The Bleeding Citadel rose where Yael died. Her ghost and Lulu carried the Sword there.",
          "{@b The doors.} Book: a good-aligned creature with Lulu nearby. Ours: the doors open only for the pure of heart, and the shard opens them. That is why Zariel knows the place and still cannot enter.",
          "{@b Arkhan and Tiamat.} Book: a possible ally; the Ire of Tiamat is a deal. Ours: the enemy. The vial went to Uldrak, so Or'Henn's curse is live, and a dragon taking it wakes Tiamat in her true form. The Ire of Tiamat is a trap here, not a deal.",
          "{@b Uldrak.} Book-true: the vial freed him. He went to Bel's Forge to reforge Yeenoghu's flail as Gnashing Hunger, and can come back for the last battle.",
          "{@b Thavius Kreeg.} Book fate (an amnizu at the Stygian Dock), plus our link: he was Or'Henn's estate-master. Breaking the contract is Or'Henn's road.",
          "{@b The Hellriders.} The Crypt gives the party Veska and Ser Lucan as stronger allies, and Drenwal the Generals' Memories. They fill the role of Eventyr's Hellriders on pegasi in the finale.",
          "{@b Party size.} Book: four to six characters. Ours: three, at level 13, with a slower XP curve after 15. The finale needs allies on the table."
        ] },
        { t: "note", title: "A convergence worth using", text: "The book's {@b Ultimate Sacrifice} asks for the soul of a good cleric or paladin of 10th level or higher, and it gives redemption a second chance with advantage. Drenwal is a level-13 Light Cleric whose cure is to die and be reborn in the eyes of another god. Offering himself to Zariel could be both: the sacrifice that frees Elturel and the death that starts his rebirth. Proposal only; it is the DM's call, and it works best if the player finds it." }
      ]
    },

    // =====================================================================
    // 6 DECISIONS TO LOCK
    // =====================================================================
    {
      id: "decisions-to-lock",
      title: "Decisions to Lock",
      when: "Before Session 13, and before the finale",
      blocks: [
        { t: "h", text: "Before Session 13" },
        { t: "list", items: [
          "Is {@b Lulu taken} at the end of Session 12? (Default: yes, by Zariel's riders.)",
          "{@b Planar Ally for a gold dragon}: does Arkhan's forced version work? And is Conjure Celestial the 2014 or the 2024 version?",
          "{@b Crokek'toeck}: should he get loose in the Scab? If he does, the book's Jaws option opens for breaking the chains.",
          "{@b The day count}: confirm Day 12 and Dumal at 4 of 6."
        ] },
        { t: "h", text: "Before the finale" },
        { t: "list", items: [
          "{@b The ending is the party's choice.} The DM's job is to make every road visible and prepped: redeem Zariel (Eventyr's group check), bargain with her, or fight her. If they redeem her and Tiamat is loose, Tiamat's rising is the follow-up fight.",
          "{@b Every way to break the chains should be findable:} Zariel's hand, Kreeg's contract (through Or'Henn), Crokek'toeck's jaws, or Tiamat (a trap here). Make sure each has at least one clue in play.",
          "{@b Elturel's clock:} how many days are left, and can the party see the city from the steppe? Eventyr: a visible, sinking city pushes them to hurry; a known deadline lets them gather allies.",
          "{@b Drenwal's road:} is the Three Sigils ritual genuine, a cult lie, or twistable? Is \"the last Bhaalspawn\" Senna, Dumal or himself?",
          "{@b Plane Shift and Resurrection} at level 13: why the party can't just leave, and whether Asimov's soul can come back."
        ] }
      ]
    },

    // =====================================================================
    // 7 SOURCES
    // =====================================================================
    {
      id: "sources",
      title: "Sources",
      when: "",
      blocks: [
        { t: "list", items: [
          "{@b Eventyr Games}, {@i DM's Resources for Baldur's Gate: Descent into Avernus}, J. A. Valeur, 2020: Chapter 5 \"Escape from Avernus\" (pp. 1–8), Chapter 4 \"Sword of Zariel\" (pp. 2–4), the Chapter 4 cheat sheet, and Chapter 1 (the shard replacing Lulu). Short quotes only. The full PDFs are in the app's Library on this device.",
          "{@b Baldur's Gate: Descent into Avernus} (Wizards of the Coast): page numbers as Eventyr cites them: Zariel's Wrath p. 148, Serving Zariel p. 149, the Ultimate Sacrifice p. 152, Endgame in Elturel p. 154.",
          "{@b Our rulings:} `campaign-state.md` and the Session Log in the repo's `CLAUDE.md`."
        ] }
      ]
    }
  ],

  side: {}
};
