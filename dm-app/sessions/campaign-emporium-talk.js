// The DM's side of talking to the Wandering Emporium (emporium.html, the Talk tab of each spot): how to play each
// keeper, lines to say in their voice, a riddle or opener that unlocks something, and the Avernus secrets the
// players can uncover. Written 2026-11-21 (DM: "riddles", "phrases as well as descriptions on how to make it feel
// authentic", "secrets they can uncover about Avernus"; secrets are hints, never the endgame said outright).
//   spots[id]  voice, look, senses, wants, tell: how to play them · phrases: [when, line] ·
//              riddles: { title, ask, answer, hints, win, lose, reveal (a hidden row of this spot), secret (an id) } ·
//              secrets: { id, title, thread, earn, say, truth } · games: side panels for the Games tab
// Only secrets[].say reaches the monitor (the DM presses Show): tests/emporium-talk.test.js keeps DM wording out of it.
// Claude's additions, for the DM to keep or cut: every riddle, the Zariel window, the riders' one hesitation.
(function () {
  "use strict";

  var TALK = {
    guide: [
      "{@b Senses first, then the keeper.} One smell, one sound, one thing moving. Then the keeper's habit, before the first word.",
      "{@b A habit beats an accent.} Keep one physical thing going the whole scene: Mahadi's backward hands, Rassh never turning round, Gristle counting.",
      "{@b Prices out loud, in soul coins first.} 'Four coins.' Gold is the afterthought of the poor.",
      "{@b Silence sells.} After a price, stop talking. Whoever speaks next pays more.",
      "{@b Everyone wants something that is not coin.} Look at 'Wants' before the scene: it makes them bargain like people.",
      "{@b Hell is polite.} Nobody threatens inside the wards; they mention things. 'It would be a shame' is a threat here.",
      "{@b A riddle is a door, not a test.} Close answers get a nod. Stuck after two tries: give the first hint as the keeper's own aside. A funny wrong answer earns a smaller prize.",
      "{@b A secret is earned, then spoken.} Read the line aloud, press Show, and let the monitor hold it while the players argue. Never explain it: the truth under it is yours.",
      "{@b End every stall on a hook:} a name, a warning, a price for later."
    ],

    spots: {
      rapture: {
        voice: "Warm, unhurried, a little musical. 'My friends', 'my guests', 'dragon-killers', never a name until they have paid for something. He laughs before he says no.",
        look: "A tall host in gold-stitched silk with a tiger's patience. His hands are on backwards, palms where the backs should be, and he folds them that way when he listens.",
        senses: "Cardamom, roasting meat and rosewater, with hot metal from the kitchens under it. Music somewhere that is always just finishing a song.",
        wants: "To be owed. Every free thing goes on the hospitality debt, and tonight he enjoys watching the party not know whose lever that debt is.",
        tell: "When he lies he is generous: he gives something away in the same breath.",
        phrases: [
          ["Welcome", "Friends! Dragon-killers! Sit, eat, be easy. It is already covered."],
          ["Offering", "For you, the cellar. For you, the baths. For you... ah, you are the one who refuses things. I like you best."],
          ["Haggling", "A price is a conversation. Let us not end it so soon."],
          ["Refusing", "No. But what a lovely question. Ask me another."],
          ["Warning", "Inside my wards no one may harm you. Outside, I am only a merchant, and merchants do not go outside."],
          ["Farewell", "Go well. Come back richer. Everyone comes back."]
        ],
        riddles: [{
          title: "The Host's Question",
          ask: "Mahadi pours, does not drink, and asks: 'Tell me the one thing on my floor that is not for sale. Guess right and I will show you what I keep in lead.'",
          answer: "The truce (the peace of the wards). 'Your word' or 'the bell' get a laugh and a smaller prize.",
          hints: ["'Everyone here uses it, and no one pays for it.'", "'Even the devils behave because of it.'"],
          win: "He opens the lead box: the Talisman of pure good is on his shelf (still for a favour only). It visibly hurts him to hold the box.",
          lose: "He is delighted anyway: 'Another cup, then.' The cup is free, and free things go on the debt.",
          reveal: "Talisman of pure good"
        }],
        secrets: [{
          id: "zariels-paper", title: "Where the Archduchess keeps the paper", thread: "Elturel's contract",
          earn: "Pay for a meal in coin (not on the house) or win The Host's Toast, then ask him about the fallen city. Or Persuasion DC 18 at the high table.",
          say: "Every lord of Hell keeps their best contracts close. The Archduchess keeps one closer than her sword. A thing she is afraid to lose, she carries.",
          truth: "Zariel holds the {@b original} of the contract that damned Elturel; destroying it breaks the chains. The copy in Kreeg's puzzle box is the legal lever (adopted endgame canon). Mahadi knows how archdevils keep paper; he does not say 'on her person' or 'destroy it'."
        }],
        games: ["mini-hosts-toast"]
      },

      forge: {
        voice: "A hiss under every word, short sentences, more to the metal than to people. Weapons are 'she'. Customers are 'buyer' until they have killed something, then the kill: 'Dragon-killer.'",
        look: "A long red serpent body coiled round the anvil, a smith's arms, a beard of flame. He works with his back to you and turns only for a real question.",
        senses: "Heat you feel in your teeth, a hammer ringing on infernal iron, fire snakes clicking as they carry tongs. Everything smells of scorched hair.",
        wants: "Dragon parts, and a quench worthy of the old lance head. He keeps the black dragon's tooth as bait: he wants that dragon near his forge.",
        tell: "When he lies the coals dim. When he is impressed he stops hammering.",
        phrases: [
          ["Greeting", "Dragon-killers. Say what you want. The metal is listening."],
          ["Appraising", "She is good work. Whoever made her is dead. Pity."],
          ["Haggling", "You do not haggle with a forge. You feed it."],
          ["Refusing", "Not that one. That one is waiting for someone better than you."],
          ["Pleased", "Ha. Hold her. Feel that? That is the right weight."],
          ["Farewell", "Go kill something. Bring me the pieces."]
        ],
        riddles: [{
          title: "The Smith's Riddle",
          ask: "Without turning round: 'I am born in fire and killed in water, and the killing makes me strong. What am I?'",
          answer: "Forged steel, quenched (a blade). 'A quench' or 'tempered steel' also wins.",
          hints: ["He taps the bucket of black Styx water by his tail.", "'Every blade on my rack died once.'"],
          win: "He turns round and lifts the cloth behind the anvil: the Dragonlance, unquenched, is on his shelf (still for a favour only; his price is on the Favours tab).",
          lose: "He goes back to hammering. A second wrong guess and he hisses the answer himself, and everything costs 1 coin more tonight.",
          reveal: "Dragonlance, unquenched"
        }],
        secrets: [{
          id: "bels-mark", title: "The old maker's mark", thread: "Bel",
          earn: "Win Hold the Iron, or bring him an infernal war-machine part to read. Or Smith's tools or Arcana DC 17 while he works.",
          say: "Every engine on this floor came out of the same fire. Look under the Archduchess's brand. The old maker still strikes his own mark first, small, where only a smith would look. He has not forgotten whose layer this was.",
          truth: "Bel, the archduke Zariel replaced, still forges her war machines and marks them as his own: he serves himself and wants his seat back (book). The party knows Bel holds part of the way to the Citadel; this says he will help whoever weakens Zariel, as long as his name is not on it. Run Bel's Forge as a negotiation."
        }],
        games: ["mini-hold-the-iron"]
      },

      barber: {
        voice: "Warm and quick; 'love' to everyone; a joke while she works, and she laughs at her own punchlines. Never a cruel word, not even about devils.",
        look: "Copper-red hair pinned up, sleeves rolled, a striped apron. Her eyes are a shade too bright, like a coin in the sun. She hums while she shaves.",
        senses: "Hot clean water and lavender soap: the only clean smell on the floor. Scissors snipping, a razor on a strop.",
        wants: "To help without being seen to help. Tonight she watches Or'Henn: she knows what the curse wants, and she must never be asked.",
        tell: "When something worries her she makes a joke at once, a bad one.",
        phrases: [
          ["Greeting", "Sit down, love. You look like you've had a week of it."],
          ["Working", "Hold still. I've only taken one ear off this century, and he deserved it."],
          ["Offering a riddle", "Tell you what. Answer me a riddle and the shave's on me. Properly free, not the host's kind of free."],
          ["Kind refusal", "Not that, love. Some things you don't buy in a place like this."],
          ["If Or'Henn starts to ask her for help", "Shh. Don't ask me for anything, sweetheart. Tell me a joke instead."],
          ["Farewell", "Off you go. Come back alive, I'll want to hear how it ends."]
        ],
        riddles: [{
          title: "Burney's Riddle",
          ask: "She flips a copper over her knuckles: 'What has a face and a crown and a value, and is worth nothing the moment you need it most?'",
          answer: "A coin. 'A soul coin' wins too, and she laughs: 'Ooh, dark. I like you.'",
          hints: ["She flips the copper again, slower.", "'You've all got pockets full of them.'"],
          win: "The shave is free, truly (nothing goes on any debt). She opens the bottom drawer: the Platinum scarf is on her shelf (still for a favour only).",
          lose: "'Close, love.' She tells the answer with a wink, and the next one is on the house anyway.",
          reveal: "Platinum scarf"
        }, {
          title: "A riddle for Burney",
          ask: "If a player offers her a riddle back, she plays fair: 'Your turn, love. Make it hard.'",
          answer: "The player's own riddle. She rolls a d20 + 5 against DC 15 to answer it at once; on a miss she is delighted and sulks for a full minute.",
          win: "She tells them a secret, free: What the curse wants.",
          lose: "She answers it, beams, and gives them a joke back.",
          secret: "curse-wants-an-address"
        }],
        secrets: [{
          id: "curse-wants-an-address", title: "What the curse wants", thread: "Tiamat's curse",
          earn: "Win either riddle, or Or'Henn sits in her chair and does not ask her for anything.",
          say: "Some curses aren't a weight, love. They're a letter looking for an address. They want to be handed on. So whatever you do, don't hand it to anyone kind enough to take it.",
          truth: "Tiamat's curse jumps into a dragon that Or'Henn asks for help out loud, and a dragon carrying it is how Tiamat wakes (our curse). Burney is an adult copper dragon and Bahamut's agent: she is warning him off asking anyone, herself above all, without saying why. If the players guess what she is: 'A girl has secrets.'"
        }]
      },

      bank: {
        voice: "Dry and exact; never raises her voice; the number first, then the sentence. The customer is 'the account': 'The account would like to borrow.'",
        look: "A tall amnizu with a long thin face, a sleeve stained with ink and a quill she never dips. She reads upside down faster than you read the right way up.",
        senses: "Old paper and sealing wax, a cold draught from the cage, a quill that never stops scratching.",
        wants: "Collateral: the ship, the heads, or one memory as security. She offers good rates to get them.",
        tell: "When the account is in trouble she becomes kinder.",
        phrases: [
          ["Greeting", "Good evening. Your balance with this house is zero. Shall we change that?"],
          ["Lending", "Twenty coins, against the ship. One coin in five a week. You will find no better on the layer."],
          ["Reading a contract", "Clause four. You will want to read clause four."],
          ["Refusing", "The house declines. The house always declines a second time, so do not ask."],
          ["A polite threat", "Every item in the cage belonged to someone who was certain."],
          ["Farewell", "Your name is in the ledger now. That is not a threat. It is a service."]
        ],
        riddles: [{
          title: "The Fine Print",
          ask: "She slides a short loan across the counter: 'Twenty coins, no interest. Sign here. Find what is wrong with it and the cage opens one shelf higher.'",
          answer: "The repayment date reads 'the day the debtor's name is next spoken in Elturel'. If the city never comes home the debt never falls due, and the house keeps the collateral for ever. Investigation DC 16, or a player who reads the line aloud and catches it.",
          hints: ["She taps the last line twice.", "'Read the date as a lawyer would.'"],
          win: "She opens the top shelf: the Iron flask, occupied, is in the cage (still for a favour only). The account has earned her respect: haggle DC 2 lower here tonight.",
          lose: "If they sign, they get 20 coins now, and a tag with their name hangs in the cage until Elturel is home.",
          reveal: "Iron flask, occupied"
        }],
        secrets: [{
          id: "living-hand", title: "A living hand on the paper", thread: "Elturel's contract",
          earn: "Pass The Fine Print, or pay 2 coins for 'an opinion on infernal contract law'.",
          say: "This house never lets a debtor die before the paper is finished with him. A dead man's debt passes to his master. A living hand can still sign it away, or sign it again. Here, a living signatory is worth more than his soul.",
          truth: "Adopted canon: the copy of Elturel's contract plus Kreeg's {@b living} hand plus an infernal writ can void or renegotiate the sale. After Session 13 Kreeg's fate is yours: if he is dead, the hint turns sour, and the original in Zariel's keeping is the lever left."
        }]
      },

      ichor: {
        voice: "Cheerful and fast, a salesman's patter with too many adjectives. He laughs at side effects. 'Probably' is his favourite word.",
        look: "A thin man in a stained apron, goggles pushed up. Three fingers on his left hand are newer than the rest, and not the same colour. Everything he holds is glowing.",
        senses: "Burnt sugar, sulphur, and cut grass that never grew here; bubbling, a hiss of steam, and a jar that rings when it should not.",
        wants: "Dragon blood, red if he can get it, and a volunteer for the Perfected Strain.",
        tell: "When he lies about a side effect he offers you a second spoon.",
        phrases: [
          ["Greeting", "A taste? Go on. Most of it is perfectly safe, and the rest is very interesting."],
          ["Selling", "This one's stable. Mostly. Ninety per cent. Eighty."],
          ["About his fingers", "These? Oh, these are new. Better than the old ones, honestly."],
          ["Buying blood", "Is that dragon? Is that red dragon? Oh, you lovely, terrible people."],
          ["An honest warning", "Read the label. Every catch is on the label. I'm not a monster, I'm a chemist."],
          ["Farewell", "Come back and tell me what happened! For science!"]
        ],
        riddles: [{
          title: "The Taster's Guess",
          ask: "He holds out three spoons: 'Name what's in one, and the next bottle's on me.'",
          answer: "Spoon 1 is Styx water: no taste at all, and the taster forgets the last minute (Wisdom DC 12). Spoon 2 is imp blood, bitter and warm. Spoon 3 is crushed hellflower, the kind growing out of Or'Henn's armour: he knows it at once.",
          win: "A free stabilised ichor. If Or'Henn named the hellflower, Elliach opens the back of the wagon: the Potion of dragon's majesty is there (still for a favour only, and read its catch).",
          lose: "They forget the taste and have to buy another spoon to try again (1 gp).",
          reveal: "Potion of dragon's majesty"
        }],
        secrets: [{
          id: "what-the-river-keeps", title: "What the river keeps", thread: "Lulu and the Sword",
          earn: "Name the Styx water in The Taster's Guess, or buy anything made from it and ask how it works.",
          say: "Styx water doesn't destroy a memory. Nothing in Hell destroys anything; it's wasteful. It moves it. The river keeps what it takes, down in the silt. And a memory always wants to go back to where it was last carried.",
          truth: "Lulu's lost memories are the path to the Bleeding Citadel and the Sword (adopted canon), and she is restored at the Sword (your ruling for Session 16). This says memories come back, and where: where they were last carried. Elliach knows nothing of Lulu; the players make the link."
        }],
        games: ["mini-tasters-flight"]
      },

      larva: {
        voice: "A clipped officer's bark; he reports rather than chats and gives rank first: 'Soldier.' 'Captain.' Souls are stock, and he is ashamed of nothing, or acts it.",
        look: "A hobgoblin in a general's coat with one epaulette torn off, a grading stick under his arm. Over his tent hangs his old war-band's banner with its colours cut out.",
        senses: "Wet canvas and brine, the soft sound of larvae moving, and a murmur like a far-off crowd, which is the larvae talking.",
        wants: "To sell out before the bell and never be recognised. His war-band was broken; he would rather sell souls than be one.",
        tell: "When his pride is touched he straightens his coat.",
        phrases: [
          ["Greeting", "Graded stock, fair weight, no refunds. Keep your fingers outside the rails."],
          ["Selling", "That one was a magistrate. Very docile. Good for a Choir Core."],
          ["About the Elturians", "Taken the day the city fell. Clean stock. Nobody has claimed them."],
          ["Pride", "I commanded four hundred, soldier. Now I command these. They obey better."],
          ["Refusing", "Not that pen. That pen is not for sale, and you did not see it."],
          ["Farewell", "Dismissed."]
        ],
        riddles: [{
          title: "The Officer's Riddle",
          ask: "He tests them like recruits: 'I have a thousand mouths and no voice. I eat the brave and the coward alike. I am cheaper than a sword. What am I?'",
          answer: "A war (the Blood War). 'An army' wins too, with a grunt.",
          hints: ["He looks up at the banner over his tent.", "'I fed every one of these pens myself.'"],
          win: "He salutes, and shows them the kobold from the dragonborn's train (the row appears on the monitor). Grudging respect: the pens' prices drop by a quarter for the party.",
          lose: "'Recruits.' He turns his back. Prices stand.",
          reveal: "A kobold from Arkhan's train"
        }],
        secrets: [{
          id: "not-yet", title: "'Not yet' in the pen books", thread: "Elturel's clock",
          earn: "Answer the Officer's Riddle, or buy the Elturian pen or the child out.",
          say: "Every soul in Avernus is written in a book. The ones from the fallen city aren't written as stock. They're written 'not yet'. Held, not owned. Collateral. 'Not yet' ends when the river has the city. Then they are stock like everyone else.",
          truth: "Elturel hangs in chains and is being drawn down toward the Styx (book). Its people are bound by the contract but not yet the devils' souls: freed before it sinks, they go home; after, they are lost. The days left are yours (Elturel's days, in the Session 14 numbers)."
        }]
      },

      informant: {
        voice: "A dry whisper with clicks between words, as if counting. Never a name, only a description: 'the cleric with the sun', 'the old red'. He speaks of now in the past tense, as if already writing it down.",
        look: "A bone devil folded small between two war machines, a satchel of paper on its knees, a pen behind where an ear would be. Its sting rests across its lap like a walking stick.",
        senses: "Dry ink and the musty sweetness of old paper; a pen that writes down everything you say.",
        wants: "Information more than coin. Everything the party tells him is on his shelf for the next buyer.",
        tell: "When he writes nothing down, he already knew it.",
        phrases: [
          ["Greeting", "You are the ones with the heads. I have your page already. Buy something else."],
          ["Selling", "The answer is ready. The question costs extra."],
          ["Bartering", "Tell me one thing I do not know, and I will tell you one thing you should."],
          ["Refusing", "That page is sold. To whom is a separate page."],
          ["Warning", "Everything you say here, I sell. Including this."],
          ["Farewell", "Noted."]
        ],
        riddles: [{
          title: "A True Thing for a True Thing",
          ask: "'One for one. Tell me something true I do not know. If yours is worth more than mine, I owe you.'",
          answer: "Anything true from the party's own road that has not happened in public: what the Mirror sold them, what Lulu said, what Drenwal saw. Insight DC 15 on him: did he write it down? If he did not, he already knew it, and they owe him another.",
          win: "He opens a page for nothing: What Krull sold on this floor appears on the monitor. Twice won: the secret below.",
          lose: "He writes it down and nods. The next buyer gets it.",
          reveal: "What Krull sold on this floor"
        }],
        secrets: [{
          id: "the-high-window", title: "The highest window", thread: "Zariel",
          earn: "Win A True Thing for a True Thing twice, or pay 4 coins and one true memory.",
          say: "She was an angel once. Everyone knows that. What nobody says: she still looks up. In every fortress she holds, the highest window faces the sky she fell from, and no devil is allowed to close it.",
          truth: "Zariel can be redeemed (book), and the redemptive ending is the best one (Sword, contract, Coram). The window is our image for what she still misses: it tells the party she is not wholly a devil yet. The window itself is Claude's addition."
        }]
      },

      "soul-pit": {
        voice: "Silky and fast, a croupier's patter. He loves every loser out loud, calls the bets in Infernal and translates them with a wink.",
        look: "A cambion in a dealer's waistcoat, wings folded tight like a shut umbrella, rings on every finger and one horn capped in gold.",
        senses: "Sweat, spilled wine and brimstone; dice clacking, the crowd roaring at every stop, soul coins hissing faintly as they change hands.",
        wants: "Big pots and a famous loser. A dragon-killer who loses a soul coin at his table is a week of business.",
        tell: "When the house is about to cheat, he compliments the player's luck.",
        phrases: [
          ["Greeting", "Place your bets! The house loves a winner, and it loves a loser more."],
          ["Calling the roll", "Dice up! Souls down!"],
          ["To a winner", "Ohhh, the crowd likes you. Careful. The crowd is fickle."],
          ["To a loser", "Don't cry for the coin, friend. It's in a better place. Well. A warmer one."],
          ["Catching a cheat", "Ah-ah. The wards see everything, and so do I. Walk with me to the edge."],
          ["Farewell", "Leaving so soon? The dice will miss you."]
        ],
        riddles: [{
          title: "Double or Nothing",
          ask: "He holds out a closed fist: 'Tell me what I'm holding and the house pays double your stake.'",
          answer: "Nothing: the fist is empty. Perception or Insight DC 17 sees the palm. Whoever says 'nothing' makes him roar with laughter, and he pays.",
          win: "Double the stake, and he talks: the secret below.",
          lose: "The stake is lost, of course.",
          secret: "the-hound-under-the-scab"
        }],
        secrets: [{
          id: "the-hound-under-the-scab", title: "The hound under the Scab", thread: "The Scab",
          earn: "Win Double or Nothing, or win three hands in a row at any Soul Pit game.",
          say: "Lost a fortune on a hound once. The thing they keep under the Scab: they say its jaws can chew through a chain the Archduchess forged herself. Never saw it. I paid for the rumour, though, so now it's yours.",
          truth: "Session 15: Crokek'toeck's Jaws of the Hungry God chew a chain Zariel forged in 1d4 + 1 rounds (the Jaws payoff table in 15-the-scab.js). The players will wonder which of her chains they want chewed. Elturel's are the obvious guess; whether the Jaws can reach those is yours to rule."
        }],
        games: ["mini-imp-skulls", "mini-lemure-derby", "mini-liars-coin"]
      },

      "devils-teeth": {
        voice: "Loud and gravelly, a barker's shout. He counts everything ('One! Two!') and laughs with his whole spiny body. Everyone is 'meat' until they win a rung.",
        look: "A barbed devil hunched over a barrel with a jar of teeth at his elbow. His spines are capped in brass for show, and his three gold teeth were someone else's.",
        senses: "Blood and spilled ale on the boards, dice rattling in a cup, teeth clinking in the jar, gnolls cackling on the low rungs.",
        wants: "A champion for the Ladder, and teeth from somebody famous.",
        tell: "When he is scared he stops counting.",
        phrases: [
          ["Greeting", "Two dice. One barrel. Ante up, or keep your teeth."],
          ["Rolling", "One! Two! Bite!"],
          ["To a winner", "Ha! The meat bites back!"],
          ["To a loser", "Open wide."],
          ["Inviting to the Ladder", "Want a real game? Climb my Ladder. Three rungs. One of you, one of them, no help, no dying. Probably."],
          ["Farewell", "Keep your teeth, meat. You'll want them for screaming."]
        ],
        riddles: [{
          title: "The Barker's Count",
          ask: "He shakes the jar at the strongest-looking one: 'How many teeth in here? Within ten, and your first rung on the Ladder is free.'",
          answer: "217. Investigation DC 15 counts to within twenty; Perception DC 18 to within ten.",
          win: "The first rung of the Ladder is free, and he leans in and tells them about the riders: the secret below.",
          lose: "He keeps one of their copper pieces in the jar 'as a tooth', and laughs about it all night.",
          secret: "what-the-riders-sold"
        }],
        secrets: [{
          id: "what-the-riders-sold", title: "What the riders sold", thread: "The riders",
          earn: "Win any rung of the Ladder, or win the Barker's Count.",
          say: "Those knights at the jetty were paladins once. Sold their oaths for a horse that breathes fire. Funny thing about a sold oath: the buyer keeps the paper, and the knight keeps the shame. Show one the badge he gave up and he'll hesitate. Once.",
          truth: "Narzugons are fallen paladins bound by contract to an archdevil (D&D canon). The one hesitation is ours: holding up a Hellrider's badge, or naming the order a rider left, costs that narzugon its next action, once per rider. Veska of the Crimson Watch may know which order a rider came from."
        }],
        games: ["emporium-gauntlets"]
      },

      ninefingers: {
        voice: "Sweet and slow, a grandmother's voice. 'Dearie', 'my lamb'. She hums lullabies and asks after their mothers.",
        look: "An old woman behind a candle that does not flicker, nine fingers, and a soul bag the size of a child at her feet that sometimes shifts. Her cards have faces; some are the players'.",
        senses: "Candle wax and dried lavender over something rotten, cards slapping softly, a faint crying from the bag, then hush.",
        wants: "A memory of Lulu's more than anything on the floor. She already has one, and wants the set.",
        tell: "When she wants something badly she stops humming.",
        phrases: [
          ["Greeting", "Sit, dearie. I have dealt you in already."],
          ["Dealing", "Here's your mother's face. Shall we play for it?"],
          ["Winning", "Oh, that one was sweet. I'll keep it somewhere warm."],
          ["Losing", "Take it back, lamb. It was never mine to keep. Yet."],
          ["If Lulu is mentioned", "The little golden elephant? Oh, I know her. I have a piece of her right here."],
          ["Farewell", "Sleep well tonight. I'll know if you don't."]
        ],
        riddles: [{
          title: "The Hag's Lullaby",
          ask: "She hums, then asks: 'The more of me you take, the more you leave behind. What am I?'",
          answer: "Footsteps. 'Memories' is a fair answer too: she smiles far too wide and says 'Clever lamb.'",
          hints: ["She walks two fingers across the table.", "'You left some outside my curtain.'"],
          win: "She turns one card face up for one look, not to keep: the secret below.",
          lose: "Her fee is a tiny memory: the player forgets the taste of their favourite food until dawn.",
          secret: "the-hollyphant-card"
        }],
        secrets: [{
          id: "the-hollyphant-card", title: "The card with the little elephant", thread: "Lulu and the Sword",
          earn: "Win The Hag's Lullaby, or win a hand of Memory Faro and ask for this card instead of the stake.",
          say: "A card with a face, held up for one breath: a little golden elephant, crying, carrying something too heavy for her. A sword wrapped in a banner. She is flying out of Hell, not into it. Behind her, a paladin holds the door.",
          truth: "Adopted canon: the Sword of Zariel was carried out of Hell by the paladin Yael and the hollyphant Lulu, who gave up her memories to raise the Bleeding Citadel and hide it. This is one of Lulu's lost memories (rumour 7 is true). It tells the party Lulu carried the Sword. Buying the card back lets her remember this moment when she is restored."
        }]
      },

      hourglass: {
        voice: "Precise and amused. He speaks in odds and dates: 'three to one', 'a Tuesday in your seventieth year'. His smile turns up at the corners like a hook.",
        look: "A bone devil in a clerk's coat beside a tall glass of black sand on a bone stand, and a ledger with a page for everyone alive on the floor.",
        senses: "Sand falling, never stopping and never emptying; dry bone; a ticking from inside the ledger.",
        wants: "Years, and long odds. Tonight he runs a book on one big question.",
        tell: "When the odds turn against the house the sand runs faster.",
        phrases: [
          ["Greeting", "Everyone has time to spend. Shall we see how much of yours?"],
          ["Offering a bet", "One year against three. A fair price for a young knee."],
          ["Winning", "Thank you. You won't miss it until you're old. And then you will."],
          ["Losing", "The glass gives back. It always gives back. With interest, eventually."],
          ["About his book", "I'm taking bets on a date. Everyone on the floor has a guess."],
          ["Farewell", "Don't waste it."]
        ],
        riddles: [{
          title: "The Question in the Book",
          ask: "'Guess what my book is on, and I'll tell you the odds for nothing.'",
          answer: "The day Elturel goes under the Styx. Anyone who says 'Elturel' or 'the city' has it.",
          hints: ["He turns the ledger round: the page is headed with a sun, the Companion.", "'A city, a river, a day.'"],
          win: "He shows them the odds: the secret below.",
          lose: "He winks: 'Bet a year and I'll tell you.'",
          secret: "the-odds-on-elturel"
        }],
        secrets: [{
          id: "the-odds-on-elturel", title: "The odds on the fallen city", thread: "Elturel's clock",
          earn: "Guess the question in his book, or place any bet at the Hourglass and ask.",
          say: "My book is on the day the fallen city goes under. The odds have shortened twice this month. Someone is pulling harder on the chains. Or something is giving way.",
          truth: "Elturel's chains draw it toward the Styx (book). 'Shortened twice' is a clock prompt: use your number for Elturel's days. 'Something is giving way' cuts both ways on purpose: the Companion's light failing (book), or the party's own acts loosening the hold."
        }]
      },

      jetty: {
        voice: "The three riders speak flat and formal, as one: no contractions, no threats, only statements. They never move their mounts.",
        look: "Black barding, nightmares breathing smoke onto the ice, a pennant with the sun of Elturel's riders and the sword torn out of it.",
        senses: "Sulphur from the nightmares, the creak of the planks on their chains, the Styx slapping below.",
        wants: "The bell. They cannot act inside the wards, and they say so, because they want the party to know exactly where the line is.",
        tell: "When a Hellrider's name is spoken, the leader's mount stamps once.",
        phrases: [
          ["When the party passes", "We cannot touch you here. We are not here to touch you."],
          ["About the Writ", "The Writ is lawful. The bell is soon."],
          ["To Drenwal", "You wear the sun. We wore it once."],
          ["To Veska or Lucan", "The Watch still rides, then. Good. It will be an honour."],
          ["If insulted", "Noted. After the bell."],
          ["At the bell", "Now."]
        ],
        riddles: [],
        secrets: [{
          id: "the-pennant", title: "The sun on the pennant", thread: "Zariel",
          earn: "Veska studies the pennant (History DC 15), or someone asks a rider about it. They cannot act here, but they answer.",
          say: "Their pennant is the sun of Elturel's riders with the sword torn out. She kept the sun. You don't keep what you don't miss.",
          truth: "Zariel led Elturel's first Hellriders into Avernus and fell with them (book); the torn-sword pennant is ours. A redemption hint that pairs with the Informant's high window: she still carries what she was."
        }]
      },

      gate: {
        voice: "The criers are imps on the roofs: shrill, fast, rhyming when they can. The bounty hunters below speak low and price everything.",
        look: "Two war machines nose to nose for an arch, the Writ nailed to the left one, imps on every roof calling names.",
        senses: "Wet paint on the Writ, engine oil, imps shrieking every arrival's name and what they carry.",
        wants: "Gossip. The criers will cry anything for a copper, and stop crying it for a silver.",
        tell: "An imp who is paid to lie cries it twice.",
        phrases: [
          ["An arrival", "Two heads on a prow, and a druid in tow! Twenty a head, and fifty for the red!"],
          ["Paid to cry", "Hear it, hear it! The dragon-killers buy the drinks!"],
          ["A bounty hunter", "Nothing personal. You are a number on a wall, and the number is good."],
          ["Paid to stop", "Crying stopped! For an hour. Maybe two."]
        ],
        riddles: [],
        secrets: []
      }
    }
  };

  if (typeof module !== "undefined" && module.exports) module.exports = TALK;
  if (typeof window !== "undefined") window.EMPORIUM_TALK = TALK;
})();
