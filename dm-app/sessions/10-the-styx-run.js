// Session 10 shell. Built because no session 10 existed in the app yet.
// The Sibriex scene is complete and runnable; the rest is scaffolding to grow.
window.SESSION = {
  id: "10-the-styx-run",
  title: "The Styx Run",
  subtitle: "Session 10 · Descent into Avernus",
  summary: "The party runs the River Styx toward Uldrak's Grave to spill Tiamat's blood and free the empyrean. They are skipping the Stygian Dock. On the way they pass the chained sibriex, which wants out, and which can smell what Or'Henn is carrying.",

  party: [
    { id: "drenwal", name: "Drenwal", note: "Light Cleric 13. Sigil of the Binding drawn (Tier II); only the kinslaying remains. Carries the Shield of the Hidden Lord." },
    { id: "aurora", name: "Aurora", note: "Level 13. Rides the celestial Moonkite." },
    { id: "orhenn", name: "Or'Henn", note: "Wildfire Druid 13. Afflicted with Tiamat's curse. Carries the Soul Capacitor." }
  ],

  allies: [
    { id: "veska", name: "Veska", note: "Hellrider" },
    { id: "ser-lucan", name: "Ser Lucan the Reforged", note: "ally" },
    { id: "jeremy", name: "Jeremy", note: "Pilots the Lady Vengeance" },
    { id: "lulu", name: "Lulu", note: "Hollyphant. HER MEMORY IS A CAMPAIGN PREREQUISITE -- see the warning in scene 1." },
    { id: "moonkite", name: "Moonkite", note: "Celestial mount, Aurora's companion" },
    { id: "lady-vengeance", name: "Lady Vengeance (Jeremy)", note: "AC 17 · HP 350 · DT 15" }
  ],

  creatures: {

    "sibriex": {
      name: "The Sibriex",
      kind: "sibriex",
      role: "A chained flesh-sculptor that wants to be let down",
      source: { page: "bestiary", name: "Sibriex", src: "MTF" },
      homebrew: "Stats as the party's own encounter table: AC 19, HP 150, CR 18, Squirt Bile, Warp Creature, 3 legendary actions. Campaign change: the Haruman errand that once justified this site is already spent (the trophy supplied the piece), so the sibriex is no longer a quest-giver. It is a temptation, and it has read what rides in Or'Henn's blood.",
      npc: true,
      sizeType: "Large fiend (demon), chaotic evil",
      description: "A vast bloated head the size of a cart, hanging in rusted chains over a pit of its own leavings. No body worth the name: a sagging mass of folds, a lipless mouth, and long thin arms that end in fingers far too delicate for something so huge. Flesh it has shaped lies heaped below -- things with too many joints, still breathing. It smells of vinegar and birth.",
      roleplay: [
        "Appearance: a head in chains, eyes like wet stones, the skin running with pale bile.",
        "Voice: slow, wet, amused. Never raises it. Uses the plural 'we' for itself.",
        "Wants: down. Only that. Everything it offers is rent toward that one end.",
        "Knows: how to read a memory out of dead flesh. How curses ride in blood, because it writes them into flesh for a living.",
        "Sample line: \"Ahh. The old lizard carries a queen's debt in him. We can smell her signature. We know that hand, little druid. We have copied it.\"",
        "Sample line: \"Let us down and we will tell you. We will even tell you true. We have no reason to lie to the short-lived.\"",
        "Never: begs. It has been here a long time and expects to be here longer."
      ],
      ac: 19, acNote: "unnatural resilience",
      hp: 150,
      cr: "18", xp: 20000,
      tactics: [
        "Opens with Warp Creature on whoever looks most physically perfect (Aurora or Moonkite).",
        "Squirt Bile at 120 ft. against anyone trying to cut the chains.",
        "Never pursues: it cannot. It fights to make leaving expensive, not to win.",
        "Legendary actions: a Bile squirt, or a Warp against a creature that moved within 60 ft."
      ]
    }

  },

  scenes: [

    {
      id: "the-sibriex",
      title: "The Sibriex",
      when: "On the Styx run, between the Dock and Uldrak's Grave",
      duration: "35 to 50 minutes",
      blocks: [
        { t: "p", text: "The party is running the Styx toward {@b Uldrak's Grave} to spill Tiamat's blood and break the empyrean's curse. They have chosen to skip the Stygian Dock. This site is on the way, and it is optional: the Haruman errand that once made the sibriex necessary is already spent -- his trophy supplied the piece. So this is not a quest. It is a temptation with a mouth." },

        { t: "note", title: "⚠ BEFORE THIS SCENE: the memory problem", text: "Lulu's full memory is a hard prerequisite for freeing the Caged Star, and the Caged Star is where Drenwal's rebirth happens. The Styx erases memory on contact. Decide NOW how Lulu is being carried and whether she is shielded from spray -- and make the players decide it out loud, without telling them why it matters. If anyone goes into the water, run the forgetting." },

        { t: "h", text: "Event: Something Is Hanging Over the River" },
        { t: "read", text: "The gorge narrows, and the Styx goes quiet the way water does under a low roof.\n\nChains come out of the rock on both sides -- ships' chains, each link as long as a man -- and where they meet, something hangs.\n\nIt is a head. Only a head, the size of a cart, bloated and pale and slick, with long thin arms trailing from under its jaw like roots from a pulled weed. Below it the bank is heaped with things that are still breathing and should not be: too many joints, too many faces, arranged.\n\nThe eyes open. They are perfectly calm.\n\n\"Oh,\" it says, wetly, delighted. \"Visitors. Come closer. We will not reach you. We cannot.\"" },

        { t: "h", text: "What It Wants" },
        { t: "p", text: "Down. That is the whole of it. Everything the {@c sibriex|sibriex} offers is rent paid toward one end: being let out of the chains. It does not beg, it does not threaten, and it does not lie -- lying would cost it the only currency it has." },
        { t: "note", title: "The Price, and What It Costs You", text: "Freeing it is the campaign map's stated blood price for this site: {@b a sibriex loose on Avernus, and abominations follow it.} That is a permanent change to the waste, not a one-session consequence. Let the players hear the cost plainly -- the sibriex itself will tell them, because it does not care." },

        { t: "h", text: "What It Offers" },
        { t: "list", items: [
          "{@b It reads memory out of dead flesh.} Bring it a body and it will tell you what that body knew. The party no longer needs this for Haruman -- but if a Fallen Three piece is ever lost, this is the replacement, and the sibriex will remind them of that.",
          "{@b It knows the shape of Or'Henn's curse.} It writes curses into flesh for a living, and it recognises this one's author. It will describe the mechanism exactly and for free, because a frightened customer is a generous one: the curse wants him to ask a dragon for help, and the dragon pays for it.",
          "{@b It shapes flesh.} This is the dangerous offer. See the side panel."
        ] },
        { t: "p", text: "Open {@side what-the-sibriex-offers|What the Sibriex Offers} when they start bargaining." },

        { t: "h", text: "Event: It Smells the Curse" },
        { t: "p", text: "Run this the moment Or'Henn comes within about sixty feet, whatever else is happening." },
        { t: "read", text: "The head turns -- not the chains, just the head, wrongly, like a doll's.\n\n\"Ahh.\" The sound goes on too long. \"The old lizard carries a queen's debt in him. We can smell her signature from here. Five hands in one hand.\"\n\nThe lipless mouth stretches.\n\n\"Does he know what it is for yet? It is not a punishment, little druid. Nobody curses a gardener out of spite. It is a leash, and it is pulling you toward something with wings. You will ask. They always ask.\"" },
        { t: "p", text: "This is the party's first outside confirmation of the curse's purpose. The sibriex will not stop talking about it, because frightened people pay." },

        { t: "h", text: "Checks at the Chains" },
        { t: "list", items: [
          "A successful {@b DC 15 Intelligence (Arcana or Religion)} check identifies it as a sibriex: a demon that sculpts flesh, usually found chained by devils who want its work but not its freedom.",
          "A successful {@b DC 18 Wisdom (Insight)} check: every word it has said is true. That is what should worry them.",
          "A successful {@b DC 16 Intelligence (Investigation)} on the chains: devil-forged, maintained recently. Someone is still paying to keep it here. [DM: Bel is the obvious someone.]",
          "A character who looks at the heaped flesh below and succeeds on a {@b DC 14 Wisdom (Perception)} check sees that some of it is wearing the remains of Hellrider tabards."
        ] },

        { t: "h", text: "If the Characters Attack It" },
        { t: "p", text: "It cannot chase them and it knows it. It fights to make leaving expensive. {@b It is CR 18 and the party is three 13th-level characters} -- survivable, but a real cost in resources immediately before Uldrak. There is nothing to win here: it carries no treasure, and killing it closes the memory-reading option permanently." },
        { t: "encounter", id: "sibriex-fight", title: "The Thing in the Chains", combatants: [
          { c: "sibriex", n: 1 }
        ], notes: "Optional and pointless by design. Warp Creature first, Squirt Bile at anyone on the chains. If the party disengages, it lets them go and says something kind." },

        { t: "h", text: "Event: Passing By" },
        { t: "p", text: "If the party simply keeps going -- which is the sensible play -- give them this as the gorge opens up again." },
        { t: "read", text: "The chains fall behind. The gorge widens. The quiet lets go of the water.\n\nBehind you, unhurried, it calls after you -- not shouting, just pitched to carry:\n\n\"When the lizard asks a dragon for help. Come back and tell us what it cost. We do so like to hear how our sister's work turns out.\"" },

        { t: "choices", prompt: "What do the characters do?", items: [
          { label: "Pass it by", goto: "the-sibriex" },
          { label: "Bargain with it", side: "what-the-sibriex-offers" },
          { label: "Free it", side: "what-the-sibriex-offers" },
          { label: "Attack it", goto: "the-sibriex" }
        ] }
      ]
    }

  ],

  side: {

    "what-the-sibriex-offers": {
      title: "What the Sibriex Offers",
      blocks: [
        { t: "p", text: "Everything here is true. The sibriex trades in accuracy because it is the only thing it has left to sell. Its price is always the same: the chains." },

        { t: "h", text: "1. Reading a body" },
        { t: "p", text: "Bring it a corpse and it tells you what the corpse knew. {@b Price:} freedom, or a living creature to shape. The party does not need this now -- Haruman's piece came from the trophy -- but keep it in your pocket. If a Fallen Three piece is ever lost, this is the campaign's stated replacement." },

        { t: "h", text: "2. The curse, explained" },
        { t: "p", text: "{@b Price:} free. It enjoys this part." },
        { t: "read", text: "\"It is a courier, not a wound. It rides him until he is frightened enough to ask a dragon for help -- and a dragon will help, they are proud that way. Then it steps across. Then it opens him up, and she comes through.\"\n\nIt sounds admiring.\n\n\"We would have done it the same. Perhaps we did. We have been here a long time and we have written a great many things into a great many people.\"" },
        { t: "p", text: "Confirm for the players: the vial they are carrying undoes this, and they are about to pour it into the ground at Uldrak's Grave. Do not editorialise. Let them do the arithmetic." },

        { t: "h", text: "3. It can make a dragon" },
        { t: "note", title: "🎲 DIAL -- the dangerous offer [HOMEBREW]", text: "Use this only if you want the Tiamat ending on the table. A sibriex shapes flesh; the curse needs a dragon to step into. So it offers to MAKE one -- take a willing creature, or one of the things breathing on the bank, and warp it into something draconic enough for the curse to accept.\n\nIf you run this, be clear that it works, and be clear what it means: Or'Henn walks away clean, a made thing dies, and Tiamat comes through anyway. The curse does not care whether the dragon was born or built.\n\nIf you would rather keep Tiamat caged, cut this entirely. The sibriex simply says the curse will only take a true dragon, and that is that." },

        { t: "h", text: "What It Will Not Do" },
        { t: "list", items: [
          "It will not lift the curse. It is not hers and it cannot countermand a god.",
          "It will not touch the Soul Capacitor. \"That is a contract. We do flesh.\"",
          "It will not come with them. It cannot leave the gorge under its own power even unchained -- someone must carry it, and it will happily watch them realise that."
        ] }
      ]
    }

  }
};
