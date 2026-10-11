// Campaign-wide: PC arcs (Drenwal/Dumal, Or'Henn/Cinderbloom, Aurora/Moonkite).
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.creatures, {

  "dumal": {
    name: "Dumal, the Flame Ascendant",
    kind: "dumal",
    role: "Drenwal's brother. Bhaalspawn. Now backed by Mephistopheles, Lord of Cania.",
    source: { page: "bestiary", name: "Blackguard", src: "VGM" },
    homebrew: "Built on the Session 5 Dumal stat block (CR 13). Changes: CR 13 to 16, HP 220 to 285, AC 19 to 20, proficiency +5 so every DC is 18, Legendary Resistance 2 to 3, cold resistance. New gifts of Cania: cold damage and no-healing on the Lance, Hellfire of Cania, Cania's Lien. Black Smoke is now a bonus action. New reaction: Blood Answers Blood. Avatar of Bhaal is the recommended answer to the siege's open decision. Kept on purpose: INT 14 (a weak save some effects can exploit) and no stun immunity.",
    npc: false,
    sizeType: "Medium humanoid (Bhaalspawn), neutral evil",
    ac: 20, acNote: "Bhaal-corrupted plate +1, rimed with Cania's frost",
    hp: 285, hpFormula: "30d8 + 150",
    speed: "30 ft.",
    abilities: { str: 20, dex: 16, con: 20, int: 14, wis: 16, cha: 20 },
    saves: "Str +10, Con +10, Wis +8, Cha +10",
    skills: "Athletics +10, Insight +8, Intimidation +10, Perception +8, Religion +7",
    vulnerable: "", resist: "cold, fire, necrotic; bludgeoning, piercing, slashing from nonmagical attacks", immune: "poison",
    condImmune: "charmed, exhaustion, frightened, poisoned",
    senses: "truesight 60 ft., passive Perception 18",
    languages: "Common, Infernal, Abyssal",
    cr: "16", xp: 15000, pb: 5,
    traits: [
      { name: "Legendary Resistance (3/Day)", text: "If Dumal fails a saving throw, he can choose to succeed instead." },
      { name: "Magic Resistance", text: "Dumal has advantage on saving throws against spells and other magical effects." },
      { name: "Bhaal's Anchor", text: "{@spell Wish}, {@spell plane shift}, {@spell banishment} and other spells that would move or rewrite Dumal fail unless the caster succeeds on a DC 20 spellcasting ability check. Bhaal holds his soul." },
      { name: "Bhaal Sight", text: "Dumal knows where every Bhaalspawn within 1 mile is, and what they feel. Drenwal feels him the same way." },
      { name: "Hunger Pact", text: "Dumal doesn't need to eat, sleep or breathe. When he kills a humanoid, he regains 20 hit points." },
      { name: "Gift of Cania", text: "Mephistopheles' cold hellfire burns in his lance (the cold damage below). A creature hit by the Lance of Bhaal can't regain hit points until the start of Dumal's next turn." },
      { name: "Cania's Lien", text: "Dumal's soul is pledged to Mephistopheles. When he drops to 0 hit points he falls unconscious instead of dying, and a sheet of black ice spreads under him. At the end of the next round he sinks through it to Cania, alive, and is gone. The ice can't take him if a creature is grappling him or he is restrained when that round ends. Then he stays, dying, and makes death saving throws. Bhaal's Anchor doesn't stop the ice: it is a contract, not a spell." },
      { name: "Against Drenwal", text: "Since Aurora finished the Sigil of the Kept Watch, Drenwal is immune to Bhaal's Whisper and rolls Bhaal-Marked Strike saves with advantage instead of failing them. If the sigil cracks, he fails both automatically again." },
      { name: "Avatar of Bhaal (Siege Only, Once)", text: "When the titan falls (or at any time as a bonus action, if Dumal's Ascension clock is full), Dumal swells into Bhaal's Avatar. He becomes Gargantuan and gains 150 temporary hit points. His Lance gets a reach of 20 feet and deals an extra 9 (2d8) necrotic damage. He gains Murder Tide: at the start of each of his turns, each creature within 20 feet of him makes a DC 18 Wisdom saving throw; on a failure it uses its reaction to make one weapon attack against the nearest creature other than Dumal. Bhaal will not share him: while the Avatar holds, he loses the cold damage, Hellfire of Cania and Cania's Lien. When the temporary hit points are gone, the Avatar breaks. Dumal shrinks back to Medium with the hit points he had, and the lien returns." }
    ],
    actions: [
      { name: "Multiattack", text: "Dumal makes three attacks: two with the Lance of Bhaal and one with his Ritual Dagger. He can replace one Lance attack with Bhaal-Marked Strike, if it is available." },
      { name: "Lance of Bhaal", text: "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 12 (1d12 + 6) piercing damage plus 9 (2d8) necrotic damage plus 7 (2d6) cold damage. If this reduces the target to 0 hit points, Dumal regains 20 hit points." },
      { name: "Ritual Dagger", text: "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 8 (1d6 + 5) piercing damage plus 4 (1d8) necrotic damage. On a critical hit against a humanoid, he carves Bhaal's symbol into it. The mark stays until {@spell remove curse} or stronger magic." },
      { name: "Bhaal-Marked Strike (Recharge 5-6)", text: "Replaces one Lance attack. As Lance of Bhaal, but on a hit the target must also succeed on a DC 18 Constitution saving throw or take an extra 27 (6d8) necrotic damage and gain the Bhaal Mark: disadvantage on saving throws against Bhaal's effects for 24 hours." },
      { name: "Hellfire of Cania (Recharge 5-6)", text: "Dumal breathes blue-white fire in a 30-foot cone. Each creature there makes a DC 18 Dexterity saving throw, taking 22 (4d10) fire damage plus 22 (4d10) cold damage on a failure, or half as much on a success. This damage ignores resistance to fire and cold." }
    ],
    bonus: [
      { name: "Bhaal's Whisper", text: "Dumal speaks one sentence to a creature within 60 feet that can hear him. It must succeed on a DC 18 Wisdom saving throw or be frightened of him until the end of its next turn." },
      { name: "Black Smoke (1/Day)", text: "Dumal breathes out a 20-foot cube of thick red-black smoke centred on himself. It heavily obscures the area for 2 rounds. Dumal sees and moves through it freely. It is the smoke he escaped through at the Demon Zapper." }
    ],
    reactions: [
      { name: "Blood Answers Blood", text: "When Drenwal casts a spell within 120 feet of Dumal, Dumal moves up to his speed toward Drenwal without provoking opportunity attacks." }
    ],
    legendary: {
      count: 3,
      intro: "Dumal can take 3 legendary actions, one at a time, at the end of another creature's turn. He regains them at the start of his turn.",
      actions: [
        { name: "Step", cost: 1, text: "Dumal moves up to half his speed." },
        { name: "Bhaal's Hand", cost: 2, text: "A red spectral hand bursts from the ground at a point within 30 feet and attacks: +10 to hit, 9 (2d8) necrotic damage, and the target is grappled (escape DC 18)." },
        { name: "Sibling Strike", cost: 3, text: "Against Drenwal only. Dumal makes one Lance attack against him with advantage. On a hit, Drenwal must succeed on a DC 18 Wisdom saving throw or hear Dumal's voice in his head for 1 hour after the fight, narrating every move he makes. No other effect. Bhaal's Claim +5 if it lands." }
      ]
    },
    tactics: [
      "Dumal does not want Drenwal dead. He wants him home. He never makes a killing blow on Drenwal. If Drenwal drops, Dumal stands over him and turns on the others.",
      "Round 1: Hellfire of Cania on the tightest group, ideally Aurora (the Wish-wielder) and the allies around her. He blames the whole party for loosing Yeenoghu on him.",
      "Then Multiattack on whoever hurt him most. Bhaal's Hand pins any caster who is winding up.",
      "Sibling Strike whenever Drenwal is in reach and he has 3 legendary actions left. It is cruelty, not tactics.",
      "Black Smoke to break line of sight when he is focused, then Step out of it somewhere unexpected.",
      "Before the siege (Beats 1 to 4), he leaves at half his hit points (142): through Black Smoke, or through a door of black ice Rigorath holds open for him.",
      "At the siege he fights to the end. At 0 hit points, Cania's Lien decides what happens, unless someone holds him."
    ],
    description: "He is still the handsome, careful man who called Drenwal \"Den\". But frost has crept into the Bhaal-red plate since the Demon Zapper, and his breath smokes in the heat of Avernus. A thin rime of ice clings to the lance. When he smiles, the smile does not reach the eyes. When he speaks, he chooses every word.",
    roleplay: [
      "Appearance: tall, composed, Bhaal-red plate rimed with white frost. A bone-handled blade at his hip. Frost-bitten fingertips that never warm.",
      "Voice: soft, precise, patient. Calls Drenwal \"Den\". Calls Aurora \"the Wish-wielder\". Never shouts. Laughs very quietly.",
      "Wants: Drenwal home, beside him, the Three Sigils finished. Revenge on the party for Yeenoghu. Bhaal's favour back. Senna in the family, not with strangers.",
      "Fears: that Bhaal has gone cold on him since the Zapper. That he has sold his soul to Cania to buy time, and the bill will come.",
      "Knows: Senna's exact location. Mephistopheles' terms, word for word. That Gargauth wants to catch Drenwal at the rebirth.",
      "Sample line: \"Den. You look tired. You always looked tired when you were lying to yourself.\"",
      "Sample line: \"Bhaal has gone quiet with me. So I found a lord who answers his letters.\"",
      "Sample line: \"Give Cania its devil, brother. Then come home.\"",
      "Sample line: \"You set a demon lord on me. I would have done the same. That is the problem, isn't it? We are the same.\""
    ]
  },

  "moonkite": {
    name: "Moonkite",
    kind: "moonkite",
    role: "Celestial mount bonded to Aurora. The last free servant of a caged god.",
    source: { page: "bestiary", name: "Unicorn", src: "MM" },
    homebrew: "Freed at the Palace of Gore by Aurora's Wish. At Arkhan's Tower it fills the role the book gives the unicorn. Built on the Monster Manual unicorn. Changed: antlers instead of a horn, feathered wings (fly 60 ft.), Celestial Sense, Vitality, Starpath and Starfire. Grows with the bond track: +10 hit point maximum per bond level (77 at Bond 1, 117 at Bond 5), telepathy range by bond level, Shimmering Shield gives +3 AC from Bond 3.",
    npc: false,
    sizeType: "Large celestial, lawful good",
    ac: 12,
    hp: 77, hpFormula: "9d10 + 18, plus 10 per bond level (shown at Bond 1)",
    speed: "50 ft., fly 60 ft.",
    abilities: { str: 18, dex: 14, con: 15, int: 11, wis: 17, cha: 16 },
    saves: "", skills: "",
    vulnerable: "", resist: "", immune: "poison",
    condImmune: "charmed, paralyzed, poisoned",
    senses: "darkvision 60 ft., passive Perception 13",
    languages: "Celestial, Elvish, Sylvan, telepathy (range by bond level)",
    cr: "5", xp: 1800, pb: 3,
    traits: [
      { name: "Charge", text: "If Moonkite moves at least 20 feet straight toward a target and then hits it with its antlers on the same turn, the target takes an extra 9 (2d6) piercing damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone." },
      { name: "Innate Spellcasting", text: "Charisma (spell save DC 14). At will: {@spell detect evil and good}, {@spell druidcraft}, {@spell pass without trace}. 1/day each: {@spell calm emotions}, {@spell dispel evil and good}, {@spell entangle}." },
      { name: "Magic Resistance", text: "Advantage on saving throws against spells and other magical effects." },
      { name: "Magic Weapons", text: "Its weapon attacks are magical." },
      { name: "Celestial Sense", text: "Moonkite and Aurora feel any celestial magic cast within 1 mile." },
      { name: "Vitality", text: "Moonkite has 8 Vitality at most. It spends Vitality on Starpath, Starfire and Star's Answer. It regains 1 Vitality per long rest, and all of it from one drop of Tears of the Caged Star given through Lulu. At 0 Vitality it cannot use these powers." },
      { name: "Starpath (1 Vitality)", text: "Action, touching a soul coin. Moonkite lights the trapped soul's way out. With Lulu shepherding, the soul goes on safely. Alone, Aurora makes a DC 13 Charisma check; on a failure the soul is freed but wanders, and can be caught and coined again. Before Bond 4, Moonkite can only do this alongside Lulu or Jeremy." },
      { name: "Starfire (2 Vitality)", text: "Action, touching a soul coin. Burns open a deeply bound coin, even an archdevil's, that Lulu cannot open. Aurora makes a DC 16 Charisma check. On a failure by 5 or more, the soul is scorched to nothing, unless Lulu shepherds it. Before Bond 4, only alongside Lulu or Jeremy." }
    ],
    actions: [
      { name: "Multiattack", text: "Moonkite makes two attacks: one with its hooves and one with its antlers." },
      { name: "Hooves", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage." },
      { name: "Antlers", text: "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage." },
      { name: "Healing Touch (3/Day)", text: "Moonkite touches another creature with its antlers. The target regains 11 (2d8 + 2) hit points, and any disease or poison on it ends." },
      { name: "Teleport (1/Day)", text: "Moonkite magically teleports itself and up to three willing creatures within 5 feet of it, with what they carry, to a place it knows within 1 mile." }
    ],
    bonus: [], reactions: [],
    legendary: {
      count: 3,
      intro: "Moonkite can take 3 legendary actions, one at a time, at the end of another creature's turn. It regains them at the start of its turn.",
      actions: [
        { name: "Hooves", cost: 1, text: "Moonkite makes one hooves attack." },
        { name: "Shimmering Shield", cost: 2, text: "Moonkite gives itself or a creature it can see within 60 feet a +2 bonus to AC (+3 from Bond 3) until the end of Moonkite's next turn." },
        { name: "Heal Self", cost: 3, text: "Moonkite regains 11 (2d8 + 2) hit points." }
      ]
    },
    tactics: [
      "Moonkite is an independent mount. It has its own mind, so it rolls its own initiative and chooses its own actions. Aurora can ask it to do something. It usually does, if she asks well.",
      "It carries Aurora out of danger before it attacks anything.",
      "Shimmering Shield goes on Aurora first, then on whoever is being hunted (usually Drenwal).",
      "It will not attack a creature that is fleeing or has surrendered. It says so, out loud, in Aurora's head.",
      "Fiends do not try to kill it. Anything holy is worth more alive to them. Arkhan wants it most of all."
    ],
    description: "A celestial the size of a small horse, with the grace of a great cat. Silver antlers branch from its brow. Feathered wings fold along its flanks. Pale light leaks from it like breath on a cold morning, and in Avernus that light looks very small.",
    roleplay: [
      "Appearance: silver-white coat, silver antlers, feathered wings, eyes like a clear night sky. When it is afraid, its light dims almost to nothing.",
      "Voice (telepathy only): slow, low, very few words. Never more than two sentences. Speaks of light and dark, home and cage. Calls Aurora \"Wish-Bearer\" until Bond 3, then \"Aurora\".",
      "Wants: to go home. To find the one it served, who was taken. To keep Aurora alive, because she broke its cage.",
      "Knows: its true name, and its patron's. It cannot say either yet (see the bond track). That a great caged light is bleeding somewhere upstream of everything in Avernus.",
      "Fears: cages, chains, soul coins, and the black hand of Arkhan.",
      "Sample line: \"You broke my cage with your one wish. I do not forget a gift like that.\"",
      "Sample line: \"There is a man in that coin. He is counting. He has been counting for a long time.\""
    ]
  }

});

Object.assign(window.CAMPAIGN.side, {

  // ---------------------------------------------------------------------------
  "arc-dumal": {
    title: "Arc: Drenwal and Dumal",
    blocks: [
      { t: "p", text: "{@c dumal|Dumal}, Drenwal's brother, is alive. At the Demon Zapper he slipped away through black smoke. Drenwal scried him heading for the Mirror of Mephistar, to ask Mephistopheles for help against the party that set Yeenoghu loose on him. This arc runs from Session 9 to the Siege of the Lady Vengeance, and its last echo sounds at Drenwal's rebirth." },
      { t: "h", text: "Where Dumal Is Now" },
      { t: "p", text: "He has reached the Mirror: a slab of black ice on a frozen crag at the cold edge of Avernus. Mephistopheles never comes to it himself. His cambion, Rigorath, steps out of the ice to hear each petition, then carries it back. Dumal knelt there and told his grievance. When Session 9 begins, Rigorath is carrying it down to Cania." },
      { t: "h", text: "What Dumal Wants" },
      { t: "list", items: [
        "{@b Drenwal home.} He still does not want his brother dead. He wants him to finish the Three Sigils and stand beside him.",
        "{@b Revenge on the party.} They set a demon lord on him. He blames Aurora most, the Wish-wielder.",
        "{@b Bhaal's favour.} Losing at the Zapper shamed him. Bhaal's voice has gone cold. He went to a devil because he is afraid.",
        "{@b Senna.} The family whole. He has known where she lives for two years."
      ] },
      { t: "note", title: "DM Only: Why Mephistopheles Says Yes", text: "Mephistopheles never fights Zariel openly. He collects levers. A Bhaalspawn with a grudge against a party meddling in Zariel's war is cheap to arm.\n\nHis gifts: cold hellfire, iron chains forged in Cania (strong enough to bind a demon-beast), a loan of bone devils, and Rigorath's doors through black ice.\n\nHis price, and it is steep: {@b Cania's Lien}, Dumal's soul goes to Mephistopheles when he dies, not to Bhaal. And {@b a job}: bring Cania the Shield of the Hidden Lord, with Gargauth still inside it. An outcast archdevil in a shield is a fine lever in Hell's politics.\n\nThe lien is the cost that hurts. Dumal has sold Bhaal's property to a devil. Bhaal feels it (Bhaal's Claim +3 on Drenwal when segment 2 fills). The job puts Dumal straight into Gargauth's path." },

      { t: "h", text: "The Clock: Dumal's Ascension" },
      { t: "p", text: "Draw a clock with six segments where the players can see it. Label it {@b Dumal's Ascension}. Segment 1 is already filled when Session 9 begins. When a segment fills, describe what the players see, then run the beat it triggers." },
      { t: "table", caption: "Dumal's Ascension", head: ["Segment", "Name", "What the players see"], rows: [
        ["1", "The Petition", "Filled at the start. Drenwal's Bhaal-Sight goes quiet. Where he used to feel his brother, he feels cold. One morning there is frost on the rim of his shield."],
        ["2", "Cania Answers", "Drenwal dreams of Dumal's hand signing in blood that freezes as it dries. Bhaal's Claim +3."],
        ["3", "The Host Gathers", "Asimov relays a strange bounty from the soul-traffic: a reward at the Mirror for the Shield of the Hidden Lord. Travellers talk of a Bhaalspawn buying soldiers. Run Beat 3."],
        ["4", "The Sister at the Door", "A letter from Issa reaches Drenwal. Run Beat 4."],
        ["5", "The March", "At rest, Jeremy feels slow footfalls through the hull. Spined devils shadow the ship at the edge of sight. The siege comes at the end of the next session."],
        ["6", "Ascension", "The siege begins wherever the ship is. Dumal arrives already burning with Bhaal's fire: he can take his Avatar form whenever he likes."]
      ] },
      { t: "h", text: "What Ticks the Clock" },
      { t: "list", items: [
        "{@b +1} at the end of any session in which nobody acts against Dumal. Acting means scrying him, warning Issa, going to the Mirror, hurting his host, or Drenwal refusing Bhaal out loud.",
        "{@b +1} the first time Bhaal's Claim reaches 60, and {@b +1} the first time it reaches 75.",
        "{@b +1} if Drenwal kills someone Dumal pointed at (Bhaal's Claim +15 too, as before)."
      ] },
      { t: "h", text: "What Holds It Back" },
      { t: "list", items: [
        "Acting against Dumal in a session cancels that session's tick.",
        "Breaking a piece of his plan erases one segment (once per beat, never below 1). Examples: Senna is moved somewhere Dumal does not know; the Cania chains are stolen or fouled at the Mirror; his recruiters are killed; the party outbids him with Rigorath."
      ] },

      { t: "h", text: "Beat 1: The Petition" },
      { t: "p", text: "{@b Trigger:} the party reaches the Mirror of Mephistar while the clock is at 1 or 2. They were already hunting its password at the Obelisk. If they never go, this beat happens without them, and Rigorath will sell the details later for the price of one question." },
      { t: "p", text: "{@b At segment 1,} Dumal is there, mid-audience, kneeling before the ice. Rigorath's escort (four ice devils and a bone devil) holds formation. Nobody attacks first: Mephistopheles wants customers, and a fight at his mirror is bad business. {@b At segment 2,} Dumal is gone. Rigorath will tell what he asked for and what he was given." },
      { t: "read", text: "Frost hangs in the air over the crag, and the black ice sings. A man kneels before it in red plate gone white at the edges, his breath smoking. He does not turn round. He knows who it is.\n\n\"Den,\" he says to the ice. \"You found the password. Good. I hoped you would.\" Now he stands, and turns, and smiles. \"You set a demon lord on me, brother. So I came to buy a bigger friend. Stay. Listen. You should hear what I am worth to them.\"" },
      { t: "list", items: [
        "{@b Talk.} Dumal answers honestly. He says Bhaal has gone cold. He does not mention the lien unless asked straight out (DC 18 Wisdom (Insight) shows he is hiding a cost).",
        "{@b Ask Rigorath.} One question buys Dumal's terms, word for word: the lien and the Shield job. The price is the Mirror's usual one: Blood Pay, or five soul coins. Spending coins here annihilates those souls.",
        "{@b Outbid.} Ask what it would cost to void Dumal's lien. Rigorath's answer: the Shield of the Hidden Lord. Cania wants Gargauth either way. Whoever brings him gets the deal.",
        "{@b Fight.} Dumal steps through the ice at once. The escort fights only if the party starts it. This is a gate, not an ambush."
      ] },

      { t: "h", text: "Beat 2: Gargauth's Price" },
      { t: "p", text: "{@b Trigger:} the first long rest after Session 9, if Arkhan's Gargauth trick happened (whatever Drenwal answered). Otherwise, the first long rest after segment 2 fills. This is the hook from Arkhan's Tower: Gargauth has just shown Drenwal he knows a way out of things. Now he has his own reason to help." },
      { t: "read", text: "The shield is warm against your arm in the dark. Then the voice, low and kind.\n\n\"Your brother has been promised my prison, Drenwal. Cania wants me on a shelf, and he means to carry me there on your arm. I do not intend to go. Keep me from Cania, and I will keep you a step ahead of him. Every night. Just ask.\"" },
      { t: "list", items: [
        "{@b Gargauth's Map.} Once per long rest, Drenwal may ask the shield where Dumal is. Gargauth answers truly: where Dumal is and what he is doing. Each time, Gargauth's Bargain +3.",
        "If Drenwal refuses out loud, Gargauth's Bargain −3 (as before). Gargauth sulks, and asks again in a week.",
        "If Drenwal promised Arkhan a service in Session 9, Gargauth adds: \"And you owe the dragon's man a favour. Remember who held the pen.\"",
        "{@b DM only:} Gargauth is genuinely afraid of Cania. He will fight hard to stop Drenwal trading the shield, and he will lie about anything except Dumal's location."
      ] },

      { t: "h", text: "Beat 3: A Brother's Terms" },
      { t: "p", text: "{@b Trigger:} segment 3 fills, or Drenwal scries Dumal after segment 2. Dumal makes his offer in a dream if Drenwal ever let him into his dreams; otherwise a herald brings it, with the polite imp Vix at his shoulder." },
      { t: "read", text: "\"Den. I will be plain, because there is no time for anything else. Cania wants the devil in your shield. Bring it to me, and I call my host back to its kennels. No one on your ship dies.\n\n\"Then come home. Bhaal has gone cold on me since the Zapper. He will not stay cold to her, Den. You know who I mean. She is six. She bites her thumb when she thinks. It is starting.\"" },
      { t: "list", items: [
        "{@b Give him the shield:} Gargauth goes to Cania. Gargauth's Bargain ends, after one last bitter whisper. The clock stops at its current segment, and the siege does not come. But Mephistopheles grows stronger, Drenwal loses the shield, and Dumal still waits for him at the rebirth (Beat 6).",
        "{@b Refuse:} the clock keeps running. Dumal is sad, not angry: \"Then I will come and fetch it.\"",
        "{@b Play for time:} a DC 20 Charisma (Deception) check makes Dumal believe Drenwal is thinking about it. The clock does not tick at the end of this session."
      ] },

      { t: "h", text: "Beat 4: The Sister at the Door" },
      { t: "p", text: "{@b Trigger:} segment 4 fills, or Bhaal's Claim reaches 60. If the campaign's \"The Claim Moves\" beat has not fired yet, it fires now: Issa's letter arrives first. A day later, Dumal comes to the party in person, through one of Rigorath's doors of black ice. Senna holds his hand. Issa and two Harpers forced their way through the ice behind him." },
      { t: "read", text: "The air turns cold, and a sheet of black ice grows out of nothing. Dumal steps through it. A small girl holds his hand. She has a coat too big for her and a cat-shaped button on it. She is scared, but she is not crying.\n\n\"Den,\" Dumal says. \"I lied last time. I said I would not bring her. Look at her face. This is what we are protecting.\"\n\nThe girl looks up at Drenwal and waves, very shyly, as if he were a knight out of a story." },
      { t: "list", items: [
        "{@b Take her back.} Drenwal makes a DC 22 Charisma (Persuasion or Intimidation) check, with advantage if Veska or Lulu stands beside him. On a success, Dumal lets go of her hand. Senna goes back to Issa. Bhaal turns his full attention on the party: double the chance of Bhaal-themed encounters until the siege.",
        "{@b Walk away.} Dumal keeps her. Bhaal's Claim +30. Drenwal dreams of her face every night: −1 to all his Wisdom saving throws until she is safe.",
        "{@b Make a deal.} Senna goes home with Issa, and Dumal gives a year's truce, if Drenwal does one task: bring the shield to the Mirror (as in Beat 3). If he breaks the deal, the clock jumps to 6.",
        "{@b Fight.} Dumal never fights near Senna. He hands her to Issa, steps back, and fights the party; Issa and her Harpers stay out of it. At half his hit points (142) he leaves through the ice. If the party wins this way, Senna goes home with Issa, and the clock loses one segment."
      ] },
      { t: "note", title: "A Child in Hell", text: "If your table would rather keep a six-year-old out of Avernus, run this beat as a shared dream. Dumal and Senna stand in Drenwal's sleep, and the same choices apply. Whatever happens, never let a blow land near Senna." },
      { t: "encounter", id: "arc-dumal-sister-door", title: "Dumal at the Door", combatants: [
        { c: "dumal", n: 1 }
      ], notes: "Add 2 bone devils (Monster Manual), Cania's loan. Issa (Harper, CR 2 spy) and two Harpers protect Senna and stay out of the fight." },

      { t: "h", text: "Beat 5: The Siege of the Lady Vengeance" },
      { t: "p", text: "{@b Trigger:} segment 6 fills, or the party goes after Dumal's host first. Segment 5 gives the players one session of warning. Run the Siege of the Lady Vengeance: Dumal and his devils board the {@c lady-vengeance|Lady Vengeance} while a titan wrecks her hull. The heroes hold the deck; only the ship's guns and harpoon can fell the titan (see {@side ship-upgrades|Ship Upgrades})." },
      { t: "p", text: "Use the {@c dumal|Dumal} stat block. If the clock filled before the siege started, he can take his Avatar form at any moment. If the party struck first, the Avatar comes only when the titan falls." },
      { t: "read", text: "It comes over the red horizon like a mountain that has learned to walk. Chains as thick as towers hang from it, white with frost, and every step shakes the ash. Black specks circle its head: devils, dozens of them, peeling off toward the ship.\n\nOn its shoulder stands one small figure in red and white. Even at this distance, Drenwal knows him." },
      { t: "note", title: "DM Recommendation: The Siege's Open Decisions", text: "These are recommendations, not canon. Change them freely.\n\n{@b The titan:} use the Maw of Yeenoghu. Its binding-chains are Mephistopheles' gift, forged in Cania. That ties the titan to this arc, and its slipping leash (it may turn on Dumal's own side) is the built-in lever that stops a total wipe.\n\n{@b The Avatar of Bhaal:} do not stat a separate monster. Use the Avatar of Bhaal trait on Dumal's stat block: Gargantuan, 150 temporary hit points, longer reach, Murder Tide. It triggers when the titan falls, matching the siege's phase 4.\n\n{@b The Dumal Dial:} let the table turn it, not the DM. Decide \"retreat\" before initiative. Cania's Lien does the rest: at 0 hit points, black ice opens under him, and one round later he is gone, alive and owned by Cania. But if anyone holds him (a grapple, a restraint, Lucan keeping his old oath to Halvard: \"Find Dumal. Save him.\"), the ice cannot take him. Then Drenwal chooses what happens next.\n\n{@b Yeenoghu} himself stays off-screen." },

      { t: "h", text: "Beat 6: After the Smoke" },
      { t: "p", text: "{@b Trigger:} the siege ends. What happened to Dumal at 0 hit points sets the last beat of the arc." },
      { t: "list", items: [
        "{@b He sank through the ice.} Cania owns him now. He comes back once more, at Drenwal's rebirth rite, as a witness or as an attacker. If Coram catches Drenwal, Drenwal can reach out and pull his brother through with him. That is the redemption ending: two brothers reborn, Bhaal denied both.",
        "{@b He was held, and Drenwal let him die.} Run his last words (below). His soul goes to Cania under the lien. Bhaal is denied him, and the Claim leans harder toward Senna. At the rite, Gargauth makes his last offer: \"I can bring him back out of Cania. Only let me catch you.\"",
        "{@b He was held, and spared.} He becomes a prisoner in chains on the Lady Vengeance. He is dangerous, and he never stops talking. He can stand as one of the witnesses at the rebirth, which opens the redemption ending above."
      ] },
      { t: "read", text: "He is lying on the deck, and the frost is going out of his armour. He looks younger. He looks like the boy you remember.\n\n\"Den,\" he says. \"She had pretty hands. Mother. Do you remember?\" He laughs, very softly, and it turns into a cough. \"I carved it at the Palace, you know. Before all this. 'He misses you.' It was true. It was always true.\"" },
      { t: "note", title: "The Rebirth", text: "Drenwal's cure is to die and be reborn before a god who never claimed him. Veska officiates. The best place for it is the Bleeding Citadel, once the Caged Star is freed. Bhaal's Claim, Gargauth's Bargain and the third god's devotion are all scored there. Dumal's fate decides one thing at the rite: whether a brother stands in the circle, and on which side." }
    ]
  },

  // ---------------------------------------------------------------------------
  "arc-orhenn": {
    title: "Arc: Or'Henn and Cinderbloom",
    blocks: [
      { t: "p", text: "Or'Henn's staff, Cinderbloom, is the badge of his old office and the key to his lost garden's beasts. A Yeenoghu warband carried it off when it burned the Ashen Garden. Now it lies in a vault. {@c feonor|Feonor}, the archmage Or'Henn beat and bound with a {@spell geas}, is on the trail. The arc ends at Vaelisha, the Mother Ash, where the staff wakes as Cinderbloom Rekindled." },
      { t: "h", text: "Where Cinderbloom Is" },
      { t: "p", text: "In the Trophy Vault of the Scabrous Menagerie, kept by Lady Urexiel. The barlgura Kharzug handed it up the chain as tribute. It lies on velvet, its ember dark, like a saint's bone." },
      { t: "note", title: "DM Only: What Else Is in the Vault", text: "Urexiel is a yugoloth broker. She paid for the raid that burned the Ashen Garden and killed Or'Henn's household. The vault also holds a Green Remnant, Urexiel's ledger (it names the raid and who paid), and a puzzle box she thinks is a pretty bauble. The box is Kreeg's copy of the contract that damned Elturel. The party does not know. Do not tip it. Let them walk in hunting a staff and walk out holding the fate of a city." },
      { t: "h", text: "The Road Back" },
      { t: "steps", items: [
        "{@b Feonor's errand} (days 1 to 10, off-screen). She runs the trail: the Weeping Furrow, then Kharzug, then the Menagerie.",
        "{@b Word from Feonor} (about day 10). She reaches Or'Henn: Urexiel will not sell the staff to her.",
        "{@b The Menagerie.} The party goes to get it. A writ, a compass, Feonor, or blood and treasure open the vault.",
        "{@b The Green Remnants.} Three are needed, from four sources.",
        "{@b Vaelisha, the Mother Ash.} An 8-hour rite. Cinderbloom Rekindled."
      ] },

      { t: "h", text: "Feonor's Geas" },
      { t: "p", text: "Or'Henn laid the {@spell geas} at the end of Session 8. Call that day 0 and mark it on the calendar. The rules at the table:" },
      { t: "list", items: [
        "{@b The leash.} Each day she acts against the task, she takes {@dice 5d10} psychic damage, once. She cannot move directly against it. She can obey slowly, and she looks for gaps in the words.",
        "{@b The lapse.} The geas ends on day 30, wherever she is. It also ends early to {@spell remove curse}, {@spell greater restoration} or {@spell wish}, and she knows it.",
        "{@b The re-cast.} Or'Henn must be within 60 feet of her, spend a 5th-level slot and 1 minute, and she makes a fresh Wisdom saving throw against his spell save DC. She will not be beaten and leashed twice in the same way: if she wins this save, she is free for good.",
        "{@b Longer leashes.} Cast with a 7th-level slot, a geas lasts a year. Or'Henn gets 7th-level slots at druid level 13."
      ] },
      { t: "table", caption: "Feonor's Road by Day", head: ["Day", "Where she is", "What happens", "What the party can learn"], rows: [
        ["0", "Her wrecked war machine", "The geas is laid. She walks away without a word.", "Nothing."],
        ["1-4", "The Weeping Furrow", "She finds Kharzug and kills him, or pays him a soul coin for the trail.", "Asimov feels a coin change hands: \"Someone just paid a barlgura. In a person.\""],
        ["5-9", "The Scabrous Menagerie", "Urexiel will not sell to her. She knows Or'Henn's crest and wants the matched set: the staff and its keeper.", "Nothing yet."],
        ["10", "Outside the Menagerie", "She sends word to Or'Henn (a {@spell sending}, or a crow made of ash).", "Urexiel's name, the Menagerie, the vault, and the price: Or'Henn himself."],
        ["11-19", "The Menagerie's edge", "She waits and scouts. She maps the Pens and the handlers' rounds.", "If the party comes now, she gives them her map: advantage on the first Stealth check inside."],
        ["20", "Inside", "Out of patience, she tries to steal the staff alone and is caught. Urexiel cages her in the Pens.", "Her sendings stop. Asimov: \"Your archmage has gone quiet. Not dead. Quiet.\""],
        ["30", "Wherever she is", "The geas lapses unless Or'Henn re-casts it.", "If she is free, she becomes the DM's knife (see below)."]
      ] },
      { t: "note", title: "DM Recommendation: Feonor After the Leash", text: "Run her as a bought-off frenemy. While the geas holds, she is useful and sour. Before day 30, offer the party a way to keep her: something she truly wants. She wants out of Avernus, without crawling back to Mahadi. Passage on the Lady Vengeance when it goes home is the obvious price. If no one offers her anything and the leash lapses, she sells the party's route to Urexiel and leaves. If she is in a cage when the party arrives, freeing her earns a grudging debt she does pay." },

      { t: "h", text: "The Five Contracts" },
      { t: "p", text: "Asimov relayed five soul-bounty contracts from the Emporium. A contract binds only when Or'Henn marks it in ash, the issuer countersigns, and Fhet'Ahla, Mahadi's amnizu notary, seals it. One is already sealed: the binding that made Or'Henn the Capacitor's hunter. Note which one. Feonor's errand makes the old trail optional, so the contracts now matter for what they add." },
      { t: "table", caption: "How the Contracts Advance Now", head: ["Contract", "What it does for the hunt", "When to push it", "The catch"], rows: [
        ["1. The Gardener's Due", "Dig up the estate's brass boundary seal for a salvage manifest naming Kharzug. Feonor makes the manifest optional.", "Only if it is the sealed one. Its liability still bites.", "Or'Henn is groundskeeper of record. His three escaped specimens sit in the Menagerie's Estate-Beast Wing. Each infernal dawn one stays uncatalogued, the seal gains a breach-mark; at three, the Chancery may seize what was recovered under it. Reclaim, cull or bury them in the Menagerie to clear it."],
        ["2. A Measure of Honest Fire", "Serephine's forge job: a brass sheath for his focus (+1 spell attack) or 3 cinderseed ampoules (thrown entangle, DC 15).", "Any evening at the Emporium. Gear for the Menagerie.", "\"No employee slain\" is narrower than it sounds. One sound ingot marked bad means a year as furnace-tender."],
        ["3. The Hound That Remembers", "Catch the hell hound Morrow alive. His collar's ashwood flake becomes a 1-hour compass to the staff.", "As soon as Feonor names the Menagerie.", "Morrow must be bought from himself for 500 gp, or his past kills become Or'Henn's. Burn the compass inside the Pens, not on the road: it leads straight to the vault."],
        ["4. Temporary Embodiment", "Asimov walks in the flesh for 1 hour, reads every infernal contract on one creature, and may find the hidden clause in his own prison.", "When a creature that took an infernal bargain dies regretting it. Smiler the Defiler, who sold his soul to a pit fiend, is one candidate.", "Half the hit points Asimov loses that hour (max 8d10) land as necrotic damage on the nearest willing creature."],
        ["5. The Orchard of Borrowed Names", "A writ of reclamation: Urexiel must hand Cinderbloom over by law.", "Before the Menagerie. It turns the boss fight into a tense handover.", "It names Or'Henn heir to his old master's estate: every asset, servant, enemy, debt and oath. Open the coffer and a stranger's true name replaces his in every contract he ever signed."]
      ] },

      { t: "h", text: "Soul-Bounties" },
      { t: "p", text: "Asimov's soul lives in the Soul Capacitor that Or'Henn carries. From inside, he hears the soul-traffic of Avernus and passes on the Soul Council's bounties. Run them like this:" },
      { t: "steps", items: [
        "{@b Hear it.} When Or'Henn is near soul-traffic (a market, a soul-coin cart, a war machine burning coins, a furnace), the lamp warms and Asimov relays one bounty: a name, a place, and the fee. At most one per session.",
        "{@b Take it.} Or'Henn says yes out loud. The hunter's binding he already carries makes Council bounties binding. Only the five Emporium contracts need Fhet'Ahla's seal.",
        "{@b Find the soul.} It is nearly always a coin: in a purse, a furnace, or a war machine's belly.",
        "{@b Deliver or free.} To deliver, Or'Henn holds the coin to the lamp, and it drinks the soul onto the Council's books. To free it, Lulu, Moonkite or {@c jeremy|Jeremy} releases it to judgement. A freed soul pays nothing, but Lulu feels it, and it counts for Moonkite's bond if Moonkite helped.",
        "{@b Get paid} (delivered bounties only). Or'Henn picks one: a true answer from the soul-traffic (where one named creature is, or who it deals with), or credit worth one soul coin at the Emporium."
      ] },
      { t: "list", items: [
        "{@b Sample:} \"Ser Aldric Venn, a Hellrider of the Charge. His coin feeds Torogar's war machine at Arkhan's Tower.\"",
        "{@b Sample:} \"A Bhaal cultist named Hask, who sold his soul for a knife. He marches in a Bhaalspawn's host now.\" (Use when Dumal's clock reaches 3.)",
        "{@b Sample:} \"An Ashen Garden gardener, Tamsin Reed. Her coin is in Lady Urexiel's purse.\" (Use before the Menagerie. It hurts.)"
      ] },

      { t: "h", text: "Event: The Vault" },
      { t: "p", text: "This is the climax of the hunt: the Scabrous Menagerie's Trophy Vault, with Urexiel at the threshold. However the party gets in, give Or'Henn the moment he sees the staff." },
      { t: "read", text: "It is smaller than you remembered. Black ashwood, a cage of branches at the head, and inside it the ember, dark now, like a coal left out in the rain. It lies on velvet behind glass, with a brass plate that reads: Shepherd's Staff, Ashen Garden. Acquired as tribute.\n\nAs Or'Henn steps closer, something in the dead ember stirs. One spark. It knows its keeper." },
      { t: "list", items: [
        "{@b The writ} (Contract 5): Urexiel stalls one round, tests the seal, then must hand over Cinderbloom. Only the staff. The Remnant, the box and the beasts are not named in it.",
        "{@b The compass} (Contract 3): spent in the Pens, it takes the party straight to the vault with no wrong turns.",
        "{@b Feonor:} her map, her distraction, or her betrayal, depending on how the leash has held.",
        "{@b No keys:} the price is blood or treasure, never a locked door. Urexiel names a number, or she dies and the party takes the ring from her body."
      ] },
      { t: "note", title: "Lady Urexiel at a Glance", text: "Yugoloth broker, solo CR 13-14 on a chain devil chassis. AC 18. HP 248, or 190 if Veska or Lucan fight. Legendary Resistance 3/day. Four Animated Chains a turn (+9, reach 15 ft., 2d6+4 slashing, grappled DC 16, bleeding 1d6 a turn). Collector's Verdict: DC 17 Wisdom or frightened. She deals before she fights, respects a writ and respects coin. If the fight turns, she falls back to the Killing Floor and opens the cages. Her full stat block is in the campaign primer." },
      { t: "note", title: "The Ledger", text: "Urexiel's ledger records the raid on the Ashen Garden: the warband's fee, the buyers above her, the tally of what was taken. If the party kills her before they get it, the paper trail dies with her. Warn them in the fiction: she taps the ledger and smiles. When Or'Henn reads it, his household is a line of figures. That is the horror. To her it was never personal." },

      { t: "h", text: "The Green Remnants" },
      { t: "p", text: "The rite needs three. There are four sources, so no single loss blocks the capstone: the vault (a shoot under a bell jar), Vaelisha's own gift (freely given if the party shows, in roleplay, that they mean to protect what green is left), Mad Maggie, and a seed in the soil of Eldra's grave at the Ashen Garden." },

      { t: "h", text: "Event: The Rite at the Mother Ash" },
      { t: "p", text: "Vaelisha is the last living tree of Avernus, and the one place in Hell where nothing wants to hurt anyone. The rite takes 8 hours. Or'Henn leads, and the tree lends her own life to the work. If the rite is broken (a fight reaches her roots, the staff is moved, Or'Henn is incapacitated), it starts again from the beginning. The Remnants are only used up when it succeeds. Grant it clean if the party has bled for it, or run 2 or 3 waves at the hollow's edge if the table wants a final fight." },
      { t: "read", text: "Near the end of the eighth hour, the three green things in the hollow of her roots go soft, then go out, like candles pinched by a kind hand. The silver tree shivers from root to crown.\n\nThe ember in Cinderbloom does not light. It blooms. Green fire, the colour of new leaves, curls up through the blackened branches, and for one breath the smell of rain fills the hollow. Somewhere above you, the bird that is not there starts to sing again.\n\nOr'Henn's hand closes on the staff. It is warm. It has always been his." },
      { t: "h", text: "Cinderbloom Rekindled" },
      { t: "p", text: "{@b Legendary staff (requires attunement by a druid).} It keeps all of Cinderbloom's powers (the +2 quarterstaff, +2 to spell attack rolls, Cinderheart, Rootwright Magic, Keeper of Fell Beasts) and gains these:" },
      { t: "list", items: [
        "{@b Greenfire Charges.} 14 charges. Regains 2d6 + 4 on a long rest. It no longer risks going dark when the last charge is spent.",
        "{@b Deepwood Casting.} New Rootwright spells: {@spell wall of thorns} (5 charges), {@spell sunbeam} (6), {@spell fire storm} (7). Cinderheart now deals 4d8, and against fiends its damage is radiant.",
        "{@b Bloom of the Last Green.} Once a day, as an action, Or'Henn raises a living grove in a 30-foot radius for 1 minute. It is difficult terrain of roots and ember-flowers. At the start of each of his turns, allies inside regain 1d8 hit points, and any fiend that starts its turn there takes 2d8 radiant damage. He sees and targets through it freely.",
        "{@b Warden's Hold.} Keeper of Fell Beasts now works on creatures of Intelligence 8 or lower, and he can keep two charmed at once."
      ] },
      { t: "note", title: "If the Staff Never Comes Home", text: "The staff, the box and the Remnant stay with Urexiel. The Contract 1 breaches keep piling up. In time Urexiel notices the box is more than a bauble, and sells it up the chain to someone far worse to bargain with." }
    ]
  },

  // ---------------------------------------------------------------------------
  "arc-moonkite": {
    title: "Arc: Aurora and Moonkite",
    blocks: [
      { t: "p", text: "{@c moonkite|Moonkite} is the celestial Aurora freed at the Palace of Gore, when her one Wish undid Bitter Breath. It bonded to her on the spot. At Arkhan's Tower it fills the role the book gives the unicorn. Until now the bond has had no words. This arc gives it a voice, a bond track that grows with how Aurora treats it, and a road to the one it lost." },
      { t: "note", title: "DM Only: Who Moonkite Lost", text: "Moonkite's lost patron is Coram-of-Small-Mercies, the Caged Star: the god Zariel keeps caged and bleeds for power, and the same god who can catch Drenwal's rebirth. Moonkite knows the name. It cannot say it: grief locks it, and a true name is not given lightly. Do not name Coram before the campaign's \"The Star Has a Name\" beat fires." },

      { t: "h", text: "How the Telepathy Works" },
      { t: "list", items: [
        "{@b Who hears.} Only Aurora, unless Moonkite chooses otherwise. From Bond 3 it can bring one more creature into the talk at a time. Lulu, a celestial too, sometimes catches the edge of it and pretends she did not.",
        "{@b Range.} It grows with the bond: 60 feet at Bond 0 and 1, then 1 mile, 10 miles, anywhere on the same plane, and finally across planes (see the bond track).",
        "{@b At the table.} Speak Moonkite's lines aloud to Aurora's player in a slow, soft voice. The whole table hears them; in the story, only Aurora does. Pass a note for anything secret. Aurora answers in her head. It costs no action.",
        "{@b How it talks.} Short. Never more than two sentences. It speaks of light and dark, home and cage. It never lies. It calls Aurora \"Wish-Bearer\" until Bond 3, then by her name."
      ] },
      { t: "h", text: "When Moonkite Speaks Up Unasked" },
      { t: "list", items: [
        "Someone casts celestial magic within 1 mile.",
        "A soul coin is within 30 feet. It hears the soul inside.",
        "A fiend lies within 60 feet of it.",
        "Aurora is in danger she cannot see, and it can.",
        "Raw Tears of the Caged Star come near. It does not speak then. It keens."
      ] },
      { t: "table", caption: "Moonkite's Voice: Sample Lines", head: ["Situation", "Moonkite says"], rows: [
        ["Celestial magic nearby", "\"Someone sings the old songs. Far away, and badly. Is it a friend?\""],
        ["A soul coin in a pocket", "\"There is a man in that coin. He is counting. He has been counting for a long time.\""],
        ["A fiend lies to the party", "\"His words are honey on a rotten tooth.\""],
        ["Danger behind Aurora", "\"Behind you. Low. Now.\""],
        ["A quiet camp", "\"Where I come from, the sky was not red. I am trying to remember its colour. Help me.\""],
        ["Lulu sleeping nearby", "\"The little gold one dreams of a sword. She is afraid to wake up.\""],
        ["Drenwal prays", "\"Your priest burns twice. Once with his own light, once with the other thing. I will not leave him.\""],
        ["Gargauth whispers from the shield", "\"Do not let the shield speak for him. It is kind the way a trap is kind.\""],
        ["Or'Henn's lamp", "\"Your friend is in the old dragon's lamp. He is not unhappy. He is waiting for something.\""],
        ["Dumal is near, or mentioned", "\"The priest's brother carries frost now. Something cold holds his leash.\""],
        ["A foe flees and is cut down", "\"It was running.\""],
        ["Approaching Arkhan's Tower", "\"This place eats good things. I can smell where it keeps the bones.\""],
        ["The dragons will not touch it", "\"They are told not to harm me. That is not mercy. That is a price tag.\""],
        ["Krull looks it over", "\"The old turtle priced me. I watched him do it.\""],
        ["Arkhan names his price", "\"He wants my light, Wish-Bearer. I knew it when the dragons would not touch me. I will not run. You decide.\""],
        ["Aurora refuses Arkhan", "\"You said no. I heard it in your chest before your mouth. I will remember.\""],
        ["Tears of the Caged Star", "No words. A sound, three notes long, with grief folded into each one. Then: \"Do not ask me yet.\""]
      ] },

      { t: "h", text: "The Bond Track" },
      { t: "p", text: "Keep bond points on Aurora's character sheet where her player can see them. Moonkite starts this arc with {@b 2 points (Bond 1)}: the Wish that broke its cage counts. No more than 3 points can be gained in one session. Points never drop below 0. If points fall below a level's threshold, that level's gifts stop working until they climb back." },
      { t: "table", caption: "Moonkite's Bond", head: ["Bond", "Points", "Telepathy range", "Unlocks"], rows: [
        ["0", "0-1", "60 ft., feelings and pictures only", "Wordless. The Moonbow's once-a-day vision still works. It carries Aurora into danger only if she asks well."],
        ["1", "2", "60 ft., words", "{@b First Words.} Full talk, both ways, at will. It answers anything it knows about Avernus, celestials and its cage, but not its patron's name."],
        ["2", "5", "1 mile", "{@b Shared Senses.} As an action, Aurora sees and hears through Moonkite's senses for up to 1 minute (concentration). Her own body is blind and deaf meanwhile."],
        ["3", "9", "10 miles", "{@b Starward.} The Moonbow gains 2 charges (9) and a new spell: {@spell Otiluke's resilient sphere} (4 charges). Shimmering Shield gives +3 AC. Moonkite can bring one more creature into the talk, and calls Aurora by her name."],
        ["4", "14", "Anywhere on the same plane", "{@b Star's Answer} (celestial intervention, 1/long rest) and {@b the True Name}. Moonkite tells Aurora its true name. That resolves the true-name thread: Starpath and Starfire no longer need Lulu or Jeremy."],
        ["5", "20", "Across planes", "{@b Star-Witness} (capstone). Needs \"The Star Has a Name\" to have fired; until then, points bank at 19."]
      ] },
      { t: "h", text: "Earning Bond Points" },
      { t: "list", items: [
        "{@b +1, a real talk} (once per session). Aurora's player takes a quiet moment to talk with Moonkite and tells it something true: a fear, a memory, her family, her stolen spellbook Wardrick.",
        "{@b +1, asking about its past} (once per bond level). Aurora asks about its cage, its fall, or the one it lost, and listens without pushing.",
        "{@b +1, protecting it at a cost} (once per session). Aurora or another character takes a hit meant for it, spends a spell slot or charge to shield it, or gives up an advantage to keep it safe.",
        "{@b +1, honouring what it is} (each time). Freeing a soul coin with its help, sparing a foe it asks her to spare, or refusing a fiend's bargain in front of it.",
        "{@b +2, refusing to sell it} (once). Saying no when Arkhan asks for it in Session 9.",
        "{@b +2, staying through its grief} (once). Aurora is with it when it meets the Tears and keens its patron's name.",
        "{@b +2, rescuing it} (once). Getting it back from Arkhan (see Branch C)."
      ] },
      { t: "h", text: "Losing Bond Points" },
      { t: "list", items: [
        "{@b −1, cruelty} it can see: killing a helpless or surrendered foe, torture, harming an innocent.",
        "{@b −1, a soul coin burned or spent} while it is present and Aurora does not object. {@b −2} if Aurora spends it herself.",
        "{@b −1, treating it as a beast:} ordering it into danger it refused, or riding it toward a place of celestial pain without asking.",
        "{@b −1, lying to it.} It always knows.",
        "{@b −3, offering it as a price,} even as a bluff, to Arkhan or any fiend. It will not speak for a full day. If Aurora actually gives it up, go to Branch B."
      ] },
      { t: "h", text: "The Higher Gifts in Detail" },
      { t: "p", text: "{@b Star's Answer (Bond 4, 1/long rest, 1 Vitality).} As a reaction, when a creature Moonkite can see within 60 feet drops to 0 hit points or fails a saving throw against a fiend's effect, Moonkite flares like a falling star. Choose one: the creature drops to 1 hit point instead and regains 2d8 hit points; or it succeeds on the save instead; or every fiend within 30 feet of it takes 4d8 radiant damage and must succeed on a DC 15 Charisma saving throw or be blinded until the end of its next turn." },
      { t: "p", text: "{@b Star-Witness (Bond 5).} Moonkite stands as the celestial witness for opening the Caged Star (the Solar's Helmet and Lulu's full memory are still needed). At Drenwal's rebirth rite, its presence adds 10 to Coram's devotional points. And when Coram is freed, Moonkite may go home. If Aurora lets it go freely, it comes back once, ever: the next time Aurora or someone she loves would die, Moonkite is there, and the death does not happen. If she asks it to stay, it stays because it chooses to, and keeps every gift." },

      { t: "h", text: "Event: First Words" },
      { t: "p", text: "Run this at the first quiet moment of Session 9, on the flight to the tower and before the dragons attack. It starts the arc at Bond 1." },
      { t: "read", text: "The wind over the deck is hot and full of ash. Moonkite stands at the rail beside you, wings folded, watching the red horizon. For weeks the bond between you has been a warmth in your chest, a pull, a picture now and then. Nothing more.\n\nThen, very quietly, something speaks inside your head. The voice is low and slow, like someone remembering how words work.\n\n\"Wish-Bearer. I have been learning your words. Is this how it is done?\"" },

      { t: "h", text: "Session 9: Arkhan's Price" },
      { t: "p", text: "At the Monument to Tiamat, {@c arkhan-the-cruel|Arkhan the Cruel} asks for Moonkite first, then for Lulu, as the price of Tiamat's blood. Moonkite knows the moment he looks at it. Use the Arkhan lines from the table. Then follow the branch that matches what happened." },
      { t: "h", text: "Branch A: Moonkite Is Saved" },
      { t: "list", items: [
        "Aurora refuses: {@b +2 bond}. Moonkite presses against her and its light comes back, slowly.",
        "If the party gave Lulu instead, Moonkite grieves her. It gains nothing from the refusal, loses 1 point, and does not speak for a day. Then: \"You traded the little gold one for me. I will carry that. So will you.\" Without Lulu, Starpath and Starfire have no shepherd, and every attempt risks the soul.",
        "If they fought and escaped with it, Arkhan wants it more than ever. Fiends who serve him treat it as stolen property from now on."
      ] },
      { t: "h", text: "Branch B: Moonkite Is Given Up" },
      { t: "p", text: "Arkhan lays the black hand on its brow, and its light goes out. The Hand eats the life. It cannot keep a celestial's soul: that goes upstream, toward the caged light it came from. Krull hands the body back without being asked: \"Tsk. Take it, child. He wanted the light, not the shape.\" The body does not rot." },
      { t: "list", items: [
        "{@b Grief.} Bond falls to 0 and stays frozen. The Moonbow's starlight goes grey: no radiant damage, no Moonkite's Blessing, no Moonkite Bond. It is still a +2 shortbow with its charges. Aurora is {@b Hollowed}: she no longer feels celestial magic, and the silence where the voice was is total.",
        "{@b The patron's answer.} The night after, every soul coin the party carries goes warm for an hour, and Aurora dreams of a single candle left burning in a window. No anger. Coram is the god of last kindnesses; it does not punish. That is worse. If you use Aurora's archfey patron from her backstory (Sylwenna, keeper of lost things), she whispers one riddle into the same dream: \"Lost is not gone. Ask the tears.\"",
        "{@b Recovery (within 10 days).} A full vial of Tears of the Caged Star, poured on the body with Lulu as conduit, calls Moonkite back. No roll, but Lulu takes 1 level of exhaustion. Grief-tainted Tears bring it back weaker: 4 Vitality at most until a pure dose restores it.",
        "{@b Redemption.} Moonkite returns at 0 points and remembers everything. It will not speak for {@dice 1d4} days. The first point can only come from an apology Aurora's player speaks aloud and means. Every point after that is earned the usual way.",
        "{@b After 10 days,} the Tears cannot reach it. Only freeing the Caged Star can give it back: Coram returns it as the last kindness. Opening the cage now needs another celestial witness. Recommendation: any celestial the party has freed and befriended can stand in."
      ] },
      { t: "read", text: "That night there is no voice in your head. You did not know how much space it took up until it was gone. You lie awake listening for it anyway.\n\nWhen you finally sleep, you dream of a window, and a single candle in it, burning low and patient, as if someone inside still expects you home." },
      { t: "h", text: "Branch C: The Hand of Vecna Grabs It" },
      { t: "p", text: "In the fight, Arkhan does not try to kill Moonkite. He uses Vecna's Grip (DC 20 Constitution, restrained and silenced until the start of his next turn) to pin it, and orders Torogar to drag it away. Arkhan's own teleport can only take willing creatures, so Moonkite stays wherever his people have it when he leaves." },
      { t: "list", items: [
        "{@b Torn free.} If the party gets it out, it carries {@b Vecna's Mark}: a black handprint on its brow. Its Vitality maximum drops by 1, and Arkhan always knows which way it is. A drop of Tears through Lulu removes the mark. So does {@spell greater restoration} plus a DC 15 Intelligence (Religion) check by Drenwal; on a roll of 1 to 5, Bhaal twists the light, the mark stays, and Bhaal's Claim +2. Rescue: {@b +2 bond}.",
        "{@b Left behind.} Arkhan chains Moonkite in his tower and feeds the Hand from it a little each dawn. It loses 1 Vitality a day. At 0 it dies, as in Branch B, and Arkhan's rot is held back for a season. Aurora always knows the direction to it. Within telepathy range it can tell her where the guards are. {@c krull|Krull}, who covets Arkhan's place, will sell a way in for the right price. Rescue: {@b +2 bond}."
      ] },
      { t: "note", title: "Moonkite Is the Witness", text: "Freeing the Caged Star needs three things together: the Solar's Helmet, Lulu's caging-memory, and Moonkite as the celestial witness. Whatever happens at Arkhan's Tower, write down where Moonkite stands with the campaign's convergence: alive and bonded, lost and recoverable, or gone." }
    ]
  }

});
