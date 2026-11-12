// Campaign-wide: the Wandering Emporium's shops, prices, haggling and floor events.
// Converted 2026-11-08 from wandering-emporium-reference.md (Session 8, priced for level 11). Edit here from now on.
window.CAMPAIGN = window.CAMPAIGN || { creatures: {}, side: {} };

Object.assign(window.CAMPAIGN.side, {
  "emporium-shops": {
    "title": "The Wandering Emporium: Shops and Prices",
    "blocks": [
      {
        "t": "note",
        "title": "Level 14",
        "text": "Priced for level 11 (Session 8). At level 14: magic items about +25%, services unchanged (DM's call)."
      },
      {
        "t": "p",
        "text": "The Emporium's shops, prices and haggling, converted from the Session 8 reference. Prices assume {@b Cordial} attitude and soul-coin payment; gp figures include the mortal surcharge. {@b SC/bargain only} = no gold, ever."
      },
      {
        "t": "h",
        "text": "The Shops"
      },
      {
        "t": "list",
        "items": [
          "{@side emporium-floor|The Floor Tonight (Session 14): rollable stock, four dens, the information market, rumours}",
          "{@side emporium-mahadi|Infernal Rapture (Mahadi)}",
          "{@side emporium-rassh|The Firesnake Forge (Rassh)}",
          "{@side emporium-burney|Burney the Barber}",
          "{@side emporium-fhetahla|From Here to Avernus (Fhet'Ahla)}",
          "{@side emporium-elliach|Ichor's Aweigh! (Elliach)}",
          "{@side emporium-zneth|Z'neth's Larva Farm}",
          "{@side emporium-bone-devil-informant|The Bone Devil Informant}",
          "{@side emporium-quick-prices|Quick prices: the cheat-sheet}",
          "{@side emporium-events|Running the floor: clock, truce, clientele, events}"
        ]
      },
      {
        "t": "note",
        "title": "EVERY PRICE AND DC BELOW IS (homebrew) SCAFFOLDING",
        "text": "{@b D&D fixes none of these numbers.} {@i Descent into Avernus} names the six shops and says they trade in soul coins, bargains, and favors — it gives {@b no price list, no repair cost, no haggle DC.} Everything in the tables below is invented to make the market {@i runnable} for a level-11, soul-coin-capable party. Tune freely. Where a table cell is genuinely canon (the fact that Rassh refuels war machines; that Burney can alter appearance; that Fhet'Ahla lends on infernal contracts), the {@i fact} is (book) but the {@i price} is still (homebrew)."
      },
      {
        "t": "h",
        "text": "The soul-coin economy"
      },
      {
        "t": "p",
        "text": "The Emporium is the {@b one place in Avernus where commerce works} — but it does not run on gold. It runs on souls."
      },
      {
        "t": "h",
        "text": "The currencies (in order of how much the market respects them)"
      },
      {
        "t": "table",
        "head": [
          "Currency",
          "What it is",
          "How the Emporium treats it"
        ],
        "rows": [
          [
            "{@b Soul coin (SC)}",
            "(book) A warm iron coin holding {@b one real, conscious, suffering damned soul.} The coin of the realm.",
            "{@b Principal currency.} Everything is priced in SC first."
          ],
          [
            "{@b Bargains / favors / obligations}",
            "(book) A promise, a service owed, a marked debt.",
            "{@b Prized above coin} for the {@i good} stuff. A favor can beat any gold price — but it becomes a {@i debt} (→ possibly a Fhet'Ahla contract)."
          ],
          [
            "{@b Gold (gp)}",
            "(book) Mostly worthless in Hell; grudgingly spendable {@i only here.}",
            "{@b Accepted at a poor rate}, with a sneer and a \"mortal surcharge.\" Never buys premium or soul-goods."
          ],
          [
            "{@b Soul-goods}",
            "(homebrew) Larvae, soul-stock, heartstones, un-notarized secrets — soul-value in kind.",
            "Traded like commodities (see Z'neth {@side emporium-zneth|§7.6}, Mahadi {@side emporium-mahadi|§7.1})."
          ]
        ]
      },
      {
        "t": "h",
        "text": "The conversion (set this once, tell the DM) (homebrew)"
      },
      {
        "t": "note",
        "title": "Note",
        "text": "{@b 1 SC ≈ 100 gp of infernal purchasing power.}"
      },
      {
        "t": "list",
        "items": [
          "This is a {@i deliberate} scaling choice so a soul-coin-capable, level-11 party faces {@b meaningful} costs — a soul coin should feel like real money, because it {@i is} a real soul (see the moral cost below).",
          "{@b Gold surcharge:} paying in gp costs {@b ~2× the SC-equivalent} (i.e. gold trades at roughly {@b half value} — call it {@b ~200 gp per 1 SC}), and comes with attitude. Some things (premium services, all soul-goods, Mahadi's best information, war-machine fuel) are {@b SC-or-bargain only} and {@i cannot be bought with gold at any rate.} Those rows are marked {@b SC/bargain only} in the tables.",
          "{@b Rounding for play:} when a table lists both, the gp figure already bakes in the surcharge. Use SC when the party pays in coin; use the gp figure when they insist on gold."
        ]
      },
      {
        "t": "h",
        "text": "The moral cost — say it once, then let it sit (book, per souls-and-celestial-power)"
      },
      {
        "t": "note",
        "title": "Note",
        "text": "{@b Spending a soul coin as {@i payment} is not the same as spending gold.}"
      },
      {
        "t": "list",
        "items": [
          "{@b Trading or handing over} a coin: the soul persists, still trapped — {@b reversible.} (This is how most Emporium purchases work; the coin changes hands, the soul suffers on.)",
          "{@b Spending a coin as {@i fuel}} (war-machine fuel, the Soul Coin Overdrive, feeding it to a Gondian core, draining it dry): the soul is {@b annihilated — true final death, no afterlife, not even {@i Wish}.} The Lady Vengeance {@i refuel} line ({@side emporium-rassh|§7.2}) is exactly this: every fuel-coin Rassh loads {@b erases a person forever.}",
          "{@b DM cue:} the merchants don't care. {@i Drenwal} should. When the party pays a fuel price in coins, remind them what a coin is. That is the price behind the price."
        ]
      },
      {
        "t": "h",
        "text": "What the party can pay with, this visit"
      },
      {
        "t": "p",
        "text": "They arrive holding (per the primer / digest): {@b loose soul coins}, {@b Red Ruth's soul-stock}, her {@b heartstone}, and the {@b Mordenkainen letter} — plus a party purse of gold that Avernus barely wants. Mahadi covets the last three (leverage/currency; {@side emporium-mahadi|§7.1}). Every table below assumes SC as the default and notes when a {@b bargain} or {@b soul-good} is the smarter pay."
      },
      {
        "t": "h",
        "text": "The haggling system"
      },
      {
        "t": "p",
        "text": "One market, one clean subsystem. Define it here; each shop just supplies a {@b Haggle DC} and an {@b Insight DC}."
      },
      {
        "t": "h",
        "text": "The check"
      },
      {
        "t": "p",
        "text": "When a price is on the table, a player may attempt {@b one} social check to move it. The player {@b picks the angle} and rolls that skill vs. the merchant's {@b Haggle DC}:"
      },
      {
        "t": "list",
        "items": [
          "{@b Persuasion} — reason, rapport, repeat-customer goodwill, \"Heroes of the Last Hill.\"",
          "{@b Intimidation} — leverage, menace (careful: the truce means {@i no violence}, so this is pure social pressure; overdo it and attitude drops).",
          "{@b Deception} — bluff a competing offer, feign disinterest, misrepresent what you carry."
        ]
      },
      {
        "t": "p",
        "text": "{@b One serious attempt per item per visit.} A second angle on the same item is at {@b disadvantage} (they've heard the pitch). Group \"help\" gives advantage only if a second PC plausibly contributes (a good-cop/bad-cop, a shared history). Party face + one assist is the intended shape."
      },
      {
        "t": "h",
        "text": "The result bands"
      },
      {
        "t": "table",
        "head": [
          "Roll vs. Haggle DC",
          "Outcome"
        ],
        "rows": [
          [
            "{@b Beat DC by 5+}",
            "Best case: {@b ~30% off}, {@i or} the listed discount {@b plus a thrown-in extra} (a minor consumable, a free small service, a scrap of information). Attitude ticks {@b up}."
          ],
          [
            "{@b Meet or beat DC}",
            "{@b 10–20% off} the listed price (DM picks within the band; use 20% on a clean beat, 10% on a squeaker), {@i or} a thrown-in extra of similar value."
          ],
          [
            "{@b Fail (miss by 1–4)}",
            "{@b Price holds.} No deal sweetener. Merchant's attitude {@b drops one step} for this visit (see tiers). The offer is still {@i available} at list."
          ],
          [
            "{@b Fail by 5+}",
            "{@b Soured.} The offer may be {@b withdrawn} for the visit, {@i or} the merchant slaps on an {@b inflated \"mortal tax\"} (+25% and gp-only). Relationship damaged into the next visit. With Mahadi/Fhet'Ahla, a bad fail can {@i cost a favor} to smooth over."
          ]
        ]
      },
      {
        "t": "list",
        "items": [
          "{@b Discounts stack with nothing.} One check, one band. Don't let a party re-roll a room.",
          "{@b Cap the discount.} The bands above are the ceiling. Some merchants {@b won't flex past a hard floor} (noted per shop) — beating the DC by 5+ on an inflexible item gets a {@i thrown-in extra}, not a bigger cut.",
          "{@b You barely haggle the apex predators.} {@b Mahadi} and {@b Fhet'Ahla} have high DCs {@i and} low caps — see their sections. Mahadi in particular treats a haggle as a {@i game he's letting you win}; the \"discount\" is usually a courtesy that deepens the hospitality debt."
        ]
      },
      {
        "t": "h",
        "text": "Attitude tiers (per-merchant, per-visit)"
      },
      {
        "t": "p",
        "text": "Each shop starts at a listed attitude. Haggle results, roleplay, and what the party carries move it. Attitude sets the {@i feel} and shifts the effective Haggle DC by ±2."
      },
      {
        "t": "table",
        "head": [
          "Tier",
          "Behavior",
          "Effect"
        ],
        "rows": [
          [
            "{@b Warm}",
            "Genuinely glad of the custom (Burney's default; any merchant after a great beat).",
            "Haggle DC {@b −2}; volunteers a tip or a small favor."
          ],
          [
            "{@b Cordial}",
            "Professional, transactional. Most merchants' default toward the \"Heroes of the Last Hill.\"",
            "List prices; DCs as written."
          ],
          [
            "{@b Wary}",
            "Guarded — a fumbled haggle, an implied threat, or carrying something they want.",
            "Haggle DC {@b +2}; gp-only for premium rows."
          ],
          [
            "{@b Cold}",
            "Insulted or spooked (fail-by-5, truce-breach vibes).",
            "No haggling; list or {@i mortal-tax} prices only; may refuse a sale."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Insight — read the merchant before you push"
      },
      {
        "t": "p",
        "text": "Each shop lists an {@b Insight DC} to clock its {@i real} attitude, its hard limits, and whether it wants something the party has. A success tells the player {@b where the floor is} (so they know when to stop pushing) and flags any hidden hook. This is the {@i safe} way to scout a haggle before committing the check."
      },
      {
        "t": "h",
        "text": "Paying in bargains / favors (the off-ledger channel) (homebrew)"
      },
      {
        "t": "note",
        "title": "Note",
        "text": "{@b A favor can beat any gold price.} It can also beat a soul-coin price — but it is never free."
      },
      {
        "t": "list",
        "items": [
          "Offering a {@b favor, service, or obligation} in place of coin can knock a price down hard (DM's call; often equivalent to a {@b 30%+ discount} or a waived fee) {@b or} unlock a {@b SC/bargain-only} item that gold simply can't buy.",
          "The catch: the favor becomes a {@b debt}, tracked. Small favors settle in play (deliver a message, certify a thing, spread a rumor). Large ones — anything Mahadi or Fhet'Ahla brokers — should be written down and, if big enough, {@b notarized into an infernal contract} (→ Fhet'Ahla, {@side emporium-fhetahla|§7.4}). An unpaid Emporium debt {@i compounds} and {@i follows the party.}",
          "{@b Mahadi's hospitality is the trap version of this} ({@side emporium-mahadi|§7.1}): the \"free\" thing is a favor {@b you didn't agree to price}, and he sets the rate later."
        ]
      },
      {
        "t": "h",
        "text": "Reading the shop sections"
      },
      {
        "t": "p",
        "text": "Every shop below follows the same shape so you can run any of them cold:"
      },
      {
        "t": "list",
        "items": [
          "{@b Proprietor + statline pointer} (CR/type — pull the block from npc-reference or 5e.tools if it ever matters; combat is off the table under the truce).",
          "{@b Attitude & Insight DC} — where they start and what a read reveals.",
          "{@b Stock / Services table} — columns {@b Item / Service | Price (SC / gp) | Haggle DC | Notes.}",
          "{@b Flex / won't-flex} — where haggling bites and where the floor is hard.",
          "{@b Signature hook / quirk} — the one thing that makes the stall memorable."
        ]
      },
      {
        "t": "p",
        "text": "Prices assume {@b Cordial} attitude and SC payment. gp figures include the surcharge. {@b SC/bargain only} = no gold, ever."
      }
    ]
  },
  "emporium-mahadi": {
    "title": "Emporium: Infernal Rapture (Mahadi)",
    "blocks": [
      {
        "t": "p",
        "text": "{@side emporium-shops|← All shops, haggling and the soul-coin economy}"
      },
      {
        "t": "p",
        "text": "{@b Proprietor:} {@b Mahadi}, rakshasa (CR 13; Magic Resistance, Limited Magic Immunity, Innate Spellcasting — see npc-reference and the primer's Truce appendix; never needed unless the truce breaks). Restaurant, spa, sanctuary, information hub, and procurement broker — the beating heart of the caravan."
      },
      {
        "t": "p",
        "text": "{@b Attitude:} {@b Cordial}, warm on the surface (he receives the party as returning \"Heroes of the Last Hill\"). Genuinely gracious; genuinely calculating. {@b Insight DC 18} (book) — he fears angering Asmodeus, and {@i every kindness is an investment}; a success reveals that his \"free\" offers are priced, just not yet."
      },
      {
        "t": "p",
        "text": "{@b Haggling Mahadi:} you barely do. His Haggle DC is {@b 20} and his {@b discount cap is 10%} — and even a success he frames as {@i \"for you, of course\"}, i.e. a courtesy that {@b adds to the hospitality debt} rather than truly saving coin. He will {@i never} be intimidated (Intimidation vs. Mahadi is at disadvantage and risks a Wary drop); Persuasion and Deception are the only real angles, and rapport/Red-Ruth-leverage matter more than the die."
      },
      {
        "t": "h",
        "text": "Menu — food & drink"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "The first course (\"on the house\")",
            "{@b Free} — see debt table",
            "—",
            "(book) The trap. Costs a {@i hospitality debt}, not coin."
          ],
          [
            "Full extraordinary meal (per guest)",
            "0.1 SC / 20 gp",
            "20",
            "Restorative, sublime. A safe, luxurious meal in Hell is itself a rarity."
          ],
          [
            "Rare infernal vintage (bottle)",
            "0.5 SC / 100 gp",
            "20",
            "Cardamom-and-sulfur; loosens tongues (advantage on the {@i next} social check made drunk on it — and impaired)."
          ],
          [
            "Private feast for the whole party",
            "1 SC / 200 gp",
            "20",
            "Includes the sanctuary of a {@b safe long rest} under truce. Debt-flavored if \"gifted.\""
          ]
        ]
      },
      {
        "t": "h",
        "text": "Spa / bath / pamper"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "The bath & soak",
            "0.2 SC / 40 gp",
            "20",
            "Removes 1 level of exhaustion; the safe rest that comes with it."
          ],
          [
            "Full pampering (the \"Red Ruth treatment\")",
            "1 SC / 200 gp",
            "20",
            "(homebrew tie) The service Ruth traded secrets for. Ends one non-magical malady; a day's genuine ease."
          ],
          [
            "Sanctuary long rest (per party, under truce)",
            "0.5 SC / 100 gp",
            "20",
            "Guaranteed uninterrupted rest — no random encounter, no ambush. Priceless in Avernus; debt-flavored if free."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Information pricing tiers (book base / homebrew tiers)"
      },
      {
        "t": "p",
        "text": "Mahadi is {@i exceptionally} well-informed. Coin buys the ordinary; the {@i good} answers cost bargains."
      },
      {
        "t": "table",
        "head": [
          "Tier",
          "Example question",
          "Price",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b Common}",
            "General Avernus geography, who's who, road conditions",
            "{@b 10 gp per question} (book)",
            "—",
            "The published rate. Cheap, plentiful, reliable-ish."
          ],
          [
            "{@b Uncommon}",
            "A warlord's disposition; where a named person was last seen; a bounty's terrain",
            "0.5 SC / 100 gp",
            "20",
            "Or a small favor."
          ],
          [
            "{@b Rare}",
            "A specific soul-lead; the truth behind a rumor; Bhaalspawn-arc intel (Drenwal/Dumal/Senna)",
            "{@b 1–3 SC or a bargain}",
            "22",
            "{@b SC/bargain only.} He'd rather be paid in Red Ruth's leftovers than coin ({@side emporium-mahadi|§7.1} gambit)."
          ],
          [
            "{@b Dangerous}",
            "Anything touching an archdevil's business; secrets Asmodeus would want reported",
            "{@b A named favor + a marked obligation}",
            "—",
            "{@b SC/bargain only.} He {@i will} report the asking upward. Selling it also puts the {@i party} on someone's ledger."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Exotic-goods procurement (book — \"commission rare/exotic/infernal goods via his network\")"
      },
      {
        "t": "p",
        "text": "Mahadi sources what the market floor can't. Commission it; wait for the caravan's contacts to deliver."
      },
      {
        "t": "table",
        "head": [
          "What he can source",
          "Lead time",
          "Price / cost",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "Mundane resupply in bulk (rations, ammo, oil, rope)",
            "Same visit",
            "list + 10%",
            "18",
            "Beneath him, but he'll have a stall runner handle it."
          ],
          [
            "Uncommon magic item / consumable (party's pick, DM-approved)",
            "1–3 days",
            "5 SC / 1,000 gp",
            "20",
            "Or a favor. He knows a devil who knows a devil."
          ],
          [
            "Rare magic item / bespoke infernal gear",
            "1 week+",
            "15–25 SC {@b or a significant bargain}",
            "22",
            "{@b SC/bargain only.} May require an errand as part-payment (a proto-bounty)."
          ],
          [
            "A specific piece of intel-as-object (a letter, a token, a name in writing)",
            "Varies",
            "{@b Bargain / favor}",
            "—",
            "{@b SC/bargain only.} This is how he'd \"acquire\" the Mordenkainen letter {@i from} the party — in reverse."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Hospitality-debt table (book engine, homebrew rates)"
      },
      {
        "t": "p",
        "text": "{@b Nothing here is free.} Each \"on the house\" kindness places the recipient in Mahadi's debt; he sets the price later, and each return visit {@b compounds} it. Track it. Refusing to settle escalates toward an infernal contract."
      },
      {
        "t": "table",
        "head": [
          "The \"free\" thing",
          "What it actually costs, later"
        ],
        "rows": [
          [
            "The free first course",
            "A {@b truthful answer} to one question Mahadi asks (about the party's business, their cargo, their plans)."
          ],
          [
            "A free soak / grooming referral",
            "A {@b small service} owed — carry a message, vouch for him, drop a word where he wants it heard."
          ],
          [
            "A gifted feast / free long rest",
            "A {@b named favor \"to be called\"} — undefined now, defined by Mahadi when convenient. The dangerous one."
          ],
          [
            "Accepting his \"generosity\" a {@i second} visit",
            "The prior debt {@b compounds}: what was a favor becomes a {@i favor plus interest} — often the thing he actually wants (Red Ruth's soul-stock, the heartstone, the letter)."
          ],
          [
            "Letting a debt sit across the arc",
            "It hardens toward a {@b Fhet'Ahla-notarized obligation} ({@side emporium-fhetahla|§7.4}). Now it's enforceable. Now it has a default clause."
          ]
        ]
      },
      {
        "t": "more",
        "title": "Playing Mahadi",
        "src": [
          "Book",
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Presence:} immaculate, unhurried, radiant with hospitality. The {@i hands are clasped backwards} — palms facing out, fingers folded the wrong way — and he never hides it, because he never needs to. He remembers every name, every prior order, every debt, and produces them like small gifts: {@i \"The heather-and-ash tea again? You have excellent memory. I have a better one.\"}",
              "{@b Voice:} warm, low, faintly musical, with the cadence of a maître d' who has all the time in the underworld. Never raises it. Never cackles. Speaks in courtesies that turn out to be terms. {@b Catchphrase:} {@i \"For you, of course.\"} (Every discount, every kindness, every trap wears it.)",
              "{@b Delighted by:} being {@i shown} something rare — a soul-good, a secret, Red Ruth's leftovers, a name he didn't have. Genuine appreciation of his food and his floor. A guest who plays the game well (he loves a worthy counterparty).",
              "{@b Irritated by:} vulgarity — threats, raised voices, haggling like a fishwife. He does not scowl; he {@i cools.} Insult the hospitality and the warmth stays on his face while it drains from the room.",
              "{@b The tell:} watch the pen and the smile. When the smile stays but the eyes go {@i still} — when he stops volunteering and starts only answering — the mood has turned Wary. When he sets his fingertips together and says {@i \"Let us not spoil a lovely evening,\"} the party has one sentence left before Cold.",
              "{@b As \"Heroes of the Last Hill\":} he receives them as honored returning guests — a reserved table, the good vintage, the first course pressed on them before they can decline. The reputation buys warmth and access; it does {@b not} buy off the debt. He is {@i investing} in heroes, and investors expect returns."
            ]
          }
        ]
      },
      {
        "t": "more",
        "title": "Bargaining — sample lines",
        "src": [
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Greeting:} {@i \"The Heroes of the Last Hill, returned to my floor. Sit — no, I insist, the good chairs. The first course is already on its way; we can discuss coin once you've eaten. One never bargains hungry.\"}",
              "{@b Meet/beat the DC (10–20% off):} {@i \"For you, of course — call it a courtesy between friends. And take the vintage; it pairs with the venison. Consider it... noted, and forgotten.\"} (The discount is real; the \"noted\" is the hook.)",
              "{@b Beat by 5+ (best case):} *\"Ah, you {@i are} good. Very well — my best price, and the private room for your rest, gratis. It pleases me to be generous with people who understand the value of a thing. We are going to do {@i such} business, you and I.\"*",
              "{@b Fail (price holds):} {@i \"A fair try, and I mean that. But this is my price, and my prices are as gracious as I am. Shall we say yes, and move on to pleasanter things?\"}",
              "{@b Fail by 5+ (soured):} {@i \"...I think we have misunderstood one another. The offer stands at the door price — in gold, and with the mortal's surcharge. Do enjoy the rest of your evening.\"} (Warmth on the face; winter in the voice.)",
              "{@b The hard won't-budge (the debt itself):} *\"Waive it? My dear, the coin was never the point. The {@i courtesy} was extended; the courtesy will be returned. That is not a fee I can discount — it is simply how the world balances. You understand.\"*",
              "{@b Close / walk-away:} {@i \"Go with my blessing, and come back soon — you always do. The caravan remembers its friends. And its ledgers.\"}"
            ]
          }
        ]
      },
      {
        "t": "h",
        "text": "More services & prices (homebrew)"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b The Backwards Feast} (signature seven-course tasting, per guest)",
            "0.4 SC / 80 gp",
            "20",
            "Each course served in reverse order of a mortal life. Restorative as a full meal {@i and} grants advantage on the party's next single Insight or Persuasion check while the memory lasts (until next long rest). Debt-flavored if \"gifted.\""
          ],
          [
            "{@b \"Cardamom & Sulfur\"} (Mahadi's signature cocktail)",
            "0.15 SC / 30 gp",
            "20",
            "Loosens the drinker's tongue {@i and} everyone at the table — advantage on one social check; the drinker is impaired (disadvantage on Wis saves) for the hour."
          ],
          [
            "{@b The Rakshasa's Repose} (deluxe spa package)",
            "1.5 SC / 300 gp",
            "22",
            "Bath, oils, grooming, a private soak {@i and} a sanctuary long rest: removes 1 exhaustion, ends one non-magical malady, and the rest cannot be interrupted. SC-preferred."
          ],
          [
            "{@b A table held} (standing reservation / safe seat, per visit)",
            "0.25 SC / 50 gp",
            "20",
            "A guaranteed place at his floor kept for you next stop — and word that you are {@i expected}, which discourages a rival from moving on you first."
          ],
          [
            "{@b Discreet procurement of a mortal comfort} (a Baldur's Gate luxury, a letter carried out of Hell, a specific wine)",
            "1 SC {@b or a favor}",
            "22",
            "{@b SC/bargain only.} He can get almost anything mortal into or out of Avernus — for a price he sets later."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Signature item — A Bottled True Memory (homebrew)"
      },
      {
        "t": "p",
        "text": "A single perfect memory, drawn whole and unblemished from a soul and sealed in a phial of warm smoked glass that shows the scene playing silently inside. Mahadi keeps a small, exquisite cellar of them — {@i \"the vintages that matter,\"} he calls them. He will part with one only for the right guest, and only for the right price."
      },
      {
        "t": "list",
        "items": [
          "{@b What it is:} a chosen true memory made {@i object.} Whose memory, and of what, is the transaction — Mahadi has, or can {@i acquire}, a memory relevant to the party's business (a warlord's true face, the last hour of a dead ally, the location seen by a soul now in a coin, the words of a contract as they were truly spoken).",
          "{@b Rules effect (level 12):} shattering the phial as an action lets one creature {@i live} the memory as though present — gaining, at the DM's discretion, a {@b definitive answer to one question} the memory can address, {@b or} advantage on all checks against a specific person, place, or contract for the next 24 hours (the party now {@i knows} them). A memory of a place functions as a one-use, perfectly reliable {@i scrying} of that place as it was. Single use; the memory is consumed.",
          "{@b Price:} {@b 15 SC, or (far more likely) a bargain} — a named favor to be called, plus something {@i shown} to him (Red Ruth's leftovers, a secret, a name for his cellar). {@b SC/bargain only.} The favor route is how he {@i wants} to sell it; the coin price is deliberately steep so the party trades in obligation instead.",
          "{@b Haggle:} barely (DC 22, cap 10%). You do not talk Mahadi down on a vintage. You can only choose {@i which currency} deepens the debt."
        ]
      },
      {
        "t": "p",
        "text": "{@b Won't flex on:} the {@i fact} of the debt. He'll happily \"discount\" coin prices as a courtesy (which deepens the debt); he will {@b not} waive the obligation attached to hospitality. {@b Signature hook:} the hands clasped backwards, the perfect memory, the bill you didn't know you were signing. The Red Ruth gambit (primer Act 2) is transacted {@i here.}"
      }
    ]
  },
  "emporium-rassh": {
    "title": "Emporium: The Firesnake Forge (Rassh)",
    "blocks": [
      {
        "t": "p",
        "text": "{@side emporium-shops|← All shops, haggling and the soul-coin economy}"
      },
      {
        "t": "p",
        "text": "{@b Proprietor:} {@b Rassh}, salamander smith (CR 5 salamander; the forge is worked by {@b fire snakes}). Buys and sells weapons and armor, {@b repairs equipment}, and — canonically — {@b repairs AND refuels infernal war machines.} The honest transaction on the floor: burns hot, talks little, delivers."
      },
      {
        "t": "p",
        "text": "{@b Attitude:} {@b Cordial}, blunt. No small talk, no games — a straight trade. {@b Insight DC 12} (he's the easiest read in the market; a success confirms his prices are firm-but-fair and he genuinely respects competent fighters, which is a small Persuasion angle)."
      },
      {
        "t": "p",
        "text": "{@b Haggling Rassh:} Haggle DC {@b 14}, cap {@b 20%}. He respects a good argument and {@i loathes} a bluff — {@b Deception vs. Rassh is at disadvantage} (fire snakes hiss; he knows metal and he knows liars). Persuasion (respect, repeat custom, a warrior's rapport) is the best angle. A thrown-in extra from him is usually {@b free basic repairs} or a handful of ammunition."
      },
      {
        "t": "h",
        "text": "Weapons & armor (stock)"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "Standard weapon (martial/simple)",
            "list gp (× surcharge if gp)",
            "14",
            "Forge-fresh, Avernus-hardened."
          ],
          [
            "Standard armor up to plate",
            "list gp",
            "14",
            "Fitted while you soak next door."
          ],
          [
            "Ammunition (arrows/bolts, ×20)",
            "0.05 SC / 10 gp",
            "14",
            "Bundle discounts easy."
          ],
          [
            "Silvered weapon",
            "+0.5 SC / +100 gp over base",
            "14",
            "Useful against the Emporium's less-friendly clientele elsewhere."
          ],
          [
            "{@b +1 weapon or armor} (limited stock)",
            "8 SC / 1,600 gp",
            "16",
            "One or two on hand; more via Mahadi's procurement ({@side emporium-mahadi|§7.1})."
          ],
          [
            "{@b Hellfire brand} (weapon, +1) (homebrew)",
            "12 SC / SC-preferred",
            "16",
            "+1; extra {@b 1d6 fire}; sheds dim light. Salamander-forged; hums when evil is near."
          ],
          [
            "{@b Firesnake fang dagger} (+1) (homebrew)",
            "6 SC / 1,200 gp",
            "15",
            "+1 dagger; on a hit, {@b 1/day} the blade \"spits\" for +2d6 fire (no save). Living-metal quirk: warm to the touch."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Repairs"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "Repair a damaged weapon/armor piece",
            "0.2 SC / 40 gp",
            "14",
            "Same visit. Often thrown in free on a good haggle."
          ],
          [
            "Restore a badly degraded item (rust, corrosion)",
            "0.5 SC / 100 gp",
            "14",
            "Undoes Rust Queen / acid damage and the like."
          ],
          [
            "Reforge a broken magic item (structure only)",
            "2 SC / 400 gp",
            "16",
            "Restores the {@i body}; won't restore lost enchantment."
          ]
        ]
      },
      {
        "t": "h",
        "text": "War-machine repair & REFUEL (book — his signature service)"
      },
      {
        "t": "p",
        "text": "This is why the party is here. Rassh services {@i and} refuels infernal war machines. {@b Refueling burns soul coins as fuel — annihilating the souls (see {@side emporium-shops|§2} moral cost).}"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "War-machine field repair (per 50 HP restored)",
            "1 SC / 200 gp",
            "15",
            "Patches, welds, replaced runners."
          ],
          [
            "{@b Refuel} (soul-coin fuel, per coin loaded)",
            "{@b 1 SC = 1 fuel-coin} (book: 1 coin ≈ 24h)",
            "—",
            "{@b SC/bargain only. The coins are annihilated as fuel.} Flag the moral cost every time."
          ],
          [
            "Full mechanical tune / systems check",
            "2 SC / 400 gp",
            "15",
            "Advantage on the machine's next control checks (DM's call)."
          ]
        ]
      },
      {
        "t": "h",
        "text": "THE LADY VENGEANCE — line item (campaign ship / homebrew price)"
      },
      {
        "t": "p",
        "text": "The beached, scorched Gondian-Portyr Hellship (AC 17, 350 HP, DT 15; one runner buckled, hull scorched — see loot-and-items). Rassh can get her {@i moving}; a true hull rebuild may still want {@b Bel's Forge} downstream."
      },
      {
        "t": "table",
        "head": [
          "Tier of repair",
          "Cost",
          "Time",
          "Notes"
        ],
        "rows": [
          [
            "{@b Get her running again} (field repair, straighten the runner, seal the hull enough to hover/sail)",
            "{@b 8 SC} {@i or} {@b 6 SC + a favor} {@i or} a completed bounty",
            "{@b ~2 days} (works through the visit)",
            "Restores mobility (hover 40 / Styx 60) and combat function. {@b The big-ticket line of the session.} Haggle DC {@b 16}, cap 20% — the favor route beats any coin price."
          ],
          [
            "{@b Refuel to sail}",
            "{@b +1 SC per 24h of travel} (fuel-coins, annihilated)",
            "Included in service time",
            "{@b SC/bargain only.} The moral cost lands here — remind Drenwal. 🎲 DIAL: the party may argue for the {@b clean Gondian core} fuel (per npc-reference Jeremy) to {@i avoid} burning souls."
          ],
          [
            "{@b Full hull rebuild} (undo the structural damage, not just patch)",
            "{@b Not available here} — needs {@b Bel's Forge}",
            "—",
            "(campaign) Rassh will say so plainly. Threads the arc toward Bel (primer Act 6)."
          ]
        ]
      },
      {
        "t": "more",
        "title": "Playing Rassh",
        "src": [
          "Book",
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Presence:} a coil of living fire in a serpent's body, twelve feet of red-orange muscle wound around the anvil, forge-heat rolling off him in a wave you feel from across the stall. The fire snakes flow through the coals like apprentices; he speaks around a mouthful of smoke and never stops working while he talks.",
              "{@b Voice:} a low, dry {@i hiss} under every word — the sizzle of quenched metal. Short sentences. No wasted breath. He states, he does not sell. {@b Catchphrase / tic:} {@i \"Metal doesn't lie.\"} (His whole worldview. He respects what holds an edge and distrusts what talks too much.)",
              "{@b Delighted by:} a well-kept weapon, a warrior who knows their gear, an honest description of what broke and how. Bring him a blade you love and he'll warm to you faster than any coin.",
              "{@b Irritated by:} haggling by {@i bluff.} Fire snakes hiss when they smell a lie; so does he. A padded story about a \"competing offer\" gets a flat {@i \"No,\"} and the price goes firm. He also has no patience for flinching at the refuel cost — {@i you} asked for fire.",
              "{@b The tell:} he goes quiet and the fire snakes still. When Rassh stops working the metal and {@i looks} at you — actually stops the hammer — you have either impressed him or lost him, and the next word tells you which.",
              "{@b As \"Heroes of the Last Hill\":} he doesn't gush, but he {@i rates} them — soldiers who won a real fight. That respect is worth a genuine small discount and his honest opinion on their gear, freely given. He'll say {@i \"You earned the steel. I'll do it right.\"} and mean it."
            ]
          }
        ]
      },
      {
        "t": "more",
        "title": "Bargaining — sample lines",
        "src": [
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Greeting:} {@i \"You're the ones from the ridge. Good. You'll have broken something worth fixing, then. Show me. Don't tell me — show me.\"}",
              "{@b Meet/beat the DC (10–20% off):} {@i \"Fair. You know what the work's worth, which is more than most. Take the price, and I'll re-edge the lot of you for nothing. Warriors should walk out sharp.\"}",
              "{@b Beat by 5+ (best case):} {@i \"...Hah. Good argument, no smoke in it. Best price, and a bundle of ammunition on the fire. Don't tell the room I went soft. I didn't. You just weren't wrong.\"}",
              "{@b Fail (price holds):} {@i \"No. That's the number. Metal, coal, my time — it costs what it costs. You want it done right or done cheap? Can't have both from me.\"}",
              "{@b Fail by 5+ (soured):} {@i \"Don't. I heard the lie before you finished it. The snakes heard it first. Price is the price, and it just went up for the insult. Come back when you're honest.\"}",
              "{@b The hard won't-budge (the refuel rate / annihilation):} {@i \"You want the ship to sail, it burns coins. One a day. And a coin's a soul, and it doesn't come back — I won't pretend otherwise and I won't cut the rate. That's not my cruelty. That's just how fire eats. Decide.\"}",
              "{@b Close / walk-away:} {@i \"It'll hold. Bring it back when it doesn't. And keep it oiled — I'll know if you didn't.\"}"
            ]
          }
        ]
      },
      {
        "t": "h",
        "text": "More services & prices (homebrew)"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b Adamantine plating service} (reinforce a suit of armor)",
            "3 SC / 600 gp",
            "16",
            "Any critical hit against the wearer becomes a normal hit. Salamander-welded seams; won't crack."
          ],
          [
            "{@b Firesnake-venom bolts / arrows} (×20)",
            "0.4 SC / 80 gp",
            "15",
            "On a hit, target takes +1d6 fire and is {@i marked} — the next attack against it before end of your next turn has advantage."
          ],
          [
            "{@b Ashfang throwing knives} (set of 6, returning heat)",
            "1 SC / 200 gp",
            "15",
            "+1 thrown daggers; on a hit deal +1d4 fire; a bonus action recalls a thrown blade to hand (it's warm, and it wants to come home)."
          ],
          [
            "{@b Heat-treat a weapon} (temporary flame edge)",
            "0.2 SC / 40 gp",
            "14",
            "For 24 hours the weapon deals +1d4 fire. Cheap, popular before a fight; the honest man's Hellfire brand."
          ],
          [
            "{@b Salvage & reforge} (turn a broken magic weapon's steel into a new mundane masterwork)",
            "1.5 SC / 300 gp",
            "16",
            "Won't recover the lost enchantment (see reforge, above) — but you keep the {@i good steel} as a fine +0 blade instead of scrap."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Signature item — Dragon-Scale Warplate (campaign — ties to the live copper/chromatic dragon threads)"
      },
      {
        "t": "p",
        "text": "Rassh's masterwork: a suit of scale-and-plate forged around a single salvaged {@b dragon scale} the party (or the caravan) brings him. He hammers the scale into the breast of the harness, and the whole suit takes on its temper — color, sheen, and the memory of the wyrm it came from. {@i \"Bring me the scale. I'll bring out the dragon.\"}"
      },
      {
        "t": "list",
        "items": [
          "{@b What it is:} (campaign hook) a bespoke suit of {@b Dragon Scale Mail} (rare), keyed to whatever dragon's scale is supplied — a live campaign thread (a chromatic scale from a battlefield trophy; and, if the DM ever wants to plant it, a {@i copper} scale that would quietly delight Burney next door — DM-only). Requires the scale as material, so it can't simply be bought off the shelf.",
          "{@b Rules effect (level 12):} {@b +1 AC} (armor is +1); {@b resistance to the damage type} of the dragon the scale came from; and {@b advantage on saving throws against the Frightful Presence} of dragons. Attunement.",
          "{@b Price:} {@b the scale + 18 SC}, {@i or} {@b the scale + a completed bounty/favor.} SC-preferred; a big-ticket line to rival the Lady Vengeance repair. The scale is the real gate — no scale, no plate.",
          "{@b Haggle:} DC 16, cap 20% on the {@i labor} coin only — he won't discount the craft below cost, and there's no discounting the scale (you either have it or you don't). The favor route beats the coin."
        ]
      },
      {
        "t": "p",
        "text": "{@b Won't flex on:} the {@b refuel} rate or the annihilation cost (fuel is fuel; the souls are real). He'll flex on labor/repair coin, not on materials. {@b Signature hook:} (homebrew, per the primer's fold-in DIAL) the Forge also stocks {@b shattersticks} — the homebrew \"Salamander Artificer\" is folded into Rassh."
      },
      {
        "t": "h",
        "text": "Shattersticks (homebrew)"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b Shatterstick} (single-use)",
            "0.5 SC / 100 gp each",
            "15",
            "Throw ≤ 60 ft as an action. {@b 5d6 thunder}, 10-ft radius, {@b DC 15 Dex} save for half. Also cracks stone/doors/war-machine plating. Needed for Shummrath's Pit downstream."
          ],
          [
            "Shattersticks, bundle of 3",
            "1.2 SC / 240 gp",
            "15",
            "Bulk rate; easy thrown-in extra on a good haggle."
          ]
        ]
      }
    ]
  },
  "emporium-burney": {
    "title": "Emporium: Burney the Barber",
    "blocks": [
      {
        "t": "p",
        "text": "{@side emporium-shops|← All shops, haggling and the soul-coin economy}"
      },
      {
        "t": "note",
        "title": "Not Tiamat's Curse",
        "text": "Her quiet cure works as {@spell remove curse}. It does {@b not} touch Tiamat's curse on Or'Henn: remove curse and greater restoration don't affect the gold scales or the Pull (see {@side arc-tiamat|Arc: Or'Henn and Tiamat})."
      },
      {
        "t": "p",
        "text": "{@b Proprietor:} {@b Burney} — presents as a warm, chatty human woman who gives a genuinely good shave. {@b [DM-ONLY SECRET — do not reveal at the table]} she is an {@b adult copper dragon} disguised as a human woman, an agent of {@b Bahamut}, near-impossible for fiends to detect, who may {@b discreetly aid good-aligned visitors.} She is the one {@i actually kind} soul on the floor. {@i Bank the secret; don't spend it.} (Pull the adult copper dragon block, CR 14, only in the extraordinarily unlikely event it ever matters.)"
      },
      {
        "t": "p",
        "text": "{@b Attitude:} {@b Warm} by default (the market's outlier — she {@i likes} people, especially the good-aligned). {@b Insight DC 20} — a success reveals only that she is {@i unaccountably genuine} and safer than she should be; the dragon truth is not on the table for a normal Insight check. Her warmth gives every haggle here {@b DC −2} baked in."
      },
      {
        "t": "p",
        "text": "{@b Haggling Burney:} Haggle DC {@b 12} (already low; friendly), cap 20%. She barely haggles because she barely charges — she's likelier to {@i give} a good-aligned party a discount unasked, or throw in a discreet healing \"on the house, dear.\" Intimidation is pointless and mildly insulting (Wary drop). Persuasion/rapport is the whole game and it works."
      },
      {
        "t": "h",
        "text": "Grooming"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "Shave, cut, and a hot towel",
            "0.05 SC / 10 gp",
            "12",
            "Removes the road; a small morale lift. Often free for the polite."
          ],
          [
            "Full grooming & fitting (look the part)",
            "0.2 SC / 40 gp",
            "12",
            "Advantage on the next Charisma check that hinges on {@i presentation} (an audience, a parley)."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Appearance alteration / disguise (book — \"magically alter or restore appearance\")"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "Restore appearance (erase scars, aging, war-damage)",
            "0.5 SC / 100 gp",
            "12",
            "Cosmetic magic; genuine, permanent, kind."
          ],
          [
            "{@b Alter appearance} (a new face, lasting)",
            "2 SC / 400 gp",
            "14",
            "Non-illusory change; you {@i look} like someone else. Lasts until she or another such art reverts it. Great for going unrecognized in Hell."
          ],
          [
            "{@b A face nobody in Hell will know} (deep disguise)",
            "3 SC {@b or a kindness}",
            "15",
            "(book flavor, rumor #8) A new identity, near-undetectable by fiends. {@b She'd waive the coin for the right good-aligned reason.}"
          ]
        ]
      },
      {
        "t": "h",
        "text": "Discreet healing menu (book \"quiet aid\" / homebrew prices)"
      },
      {
        "t": "p",
        "text": "She doesn't advertise it. Offered quietly, sometimes free, to those she reads as good."
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Effect",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "A soothing tonic",
            "Heals {@b 2d4+2} (as a Potion of Healing)",
            "0.25 SC / 50 gp",
            "12",
            "\"For the road, dear.\""
          ],
          [
            "Restorative treatment",
            "As {@i lesser restoration} (ends one disease/condition)",
            "0.75 SC / 150 gp",
            "13",
            "Quiet, no questions."
          ],
          [
            "Mending the deep hurt",
            "As {@i greater restoration} (removes a curse/level of exhaustion/reduction)",
            "2 SC / 400 gp",
            "15",
            "She'll do this for a good soul at cost — or free, if the story earns it."
          ],
          [
            "{@b A quiet word of true kindness}",
            "🎲 DM's discretion — a genuinely helpful nudge, warning, or blessing",
            "{@b Free}",
            "—",
            "[DM-only] This is the copper dragon helping. Use {@i sparingly}, off-ledger, as a mystery."
          ]
        ]
      },
      {
        "t": "more",
        "title": "Playing Burney",
        "src": [
          "Book",
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Presence:} a plump, rosy, comfortable-looking woman of middle years, sleeves rolled, a warm towel always over one arm, a chair that somehow feels safe the moment you sit in it. She works with a straight razor and a genuinely gentle hand, and she {@i hums} while she works. The stall smells of soap and warm water — the only clean smell on the floor.",
              "{@b Voice:} warm, chatty, motherly, unhurried. Calls everyone {@i \"dear\"} and {@i \"love\"} and means it. Asks after you like she remembers — and she does. {@b Catchphrase:} {@i \"There, now. That's better, isn't it?\"} (Said over a finished shave, a healed scar, a quiet mercy — all the same gentle {@i there, now.})",
              "{@b Delighted by:} kindness, especially kindness shown to someone who can't repay it. A guest who's gentle with the frightened mortal in the next chair. Small courtesies. She lights up at decency the way Mahadi lights up at leverage.",
              "{@b Irritated by:} cruelty and swagger. She won't scold — she just {@i cools}, goes quiet, and finds she's \"all booked up, dear.\" Threats slide off her like water; she's never once looked afraid, which a sharp PC might, someday, find strange.",
              "{@b The tell:} the humming. When Burney hums, all is well. When she goes quiet and {@i studies} you over the razor — kindly, but seeing something — she's decided something about your heart. (DM-only: that's the dragon looking.)",
              "{@b As \"Heroes of the Last Hill\":} she's {@i proud} of them, warmly and without agenda — {@i \"Heroes, and they came to see old Burney. Sit down, the both of you, you look like you've been through it.\"} The reputation buys the warmest welcome on the floor and, quietly, the benefit of the doubt on whether they're {@i good} — which, with Burney, is the only currency that truly matters."
            ]
          }
        ]
      },
      {
        "t": "more",
        "title": "Bargaining — sample lines",
        "src": [
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Greeting:} {@i \"Well, look at the state of you, dear — sit, sit. Road-dust an inch thick and a face like you haven't slept in a week. We'll fix that. We'll fix all of it. Now, who's first?\"}",
              "{@b Meet/beat the DC (10–20% off):} {@i \"Oh, don't fuss about the coin. Call it less, and I'll throw in a hot towel and something for that nasty cut on your arm — no, no, I saw it, hold still. There.\"}",
              "{@b Beat by 5+ (best case):} {@i \"You're good people, I can tell. Keep your coin, most of it — and here, a little tonic for the road, on the house. No, I insist. It's not every day heroes let an old woman fuss over them.\"}",
              "{@b Fail (price holds):} {@i \"That's already my kindest price, love — I'd be robbing my own till to go lower, and then how would I keep the soap in? It's a fair number for good work. Shall I begin?\"} (Even her \"no\" is warm.)",
              "{@b Fail by 5+ (soured — reserved for the cruel):} {@i \"...Do you know, I find I'm all booked up today. Try one of the other stalls, dear. They'll suit you better.\"} (The one Cold thing she does: quietly withhold her kindness from someone who scares her patrons.)",
              "{@b The hard won't-budge (she won't aid the cruel):} {@i \"I don't do that work for just anyone, love. Not the deep sort. That's for people I can look in the eye. And I don't much like what I see in yours. No charge, no service — off you go.\"}",
              "{@b Close / walk-away:} {@i \"There, now — good as new, and better than you came in. Mind how you go out there, dears. It's not kind, this place. You be kind anyway.\"}"
            ]
          }
        ]
      },
      {
        "t": "h",
        "text": "More services & prices (homebrew)"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b The full sit-down} (shave, cut, hot towel, and a listening ear)",
            "0.1 SC / 20 gp",
            "12",
            "Removes the road {@i and} a point of stress — the party's next long rest also ends one level of exhaustion (her chair does half the work of a rest). Often free for the kind."
          ],
          [
            "{@b \"Someone respectable\"} (disguise package: a Baldur's Gate merchant, a devil's clerk, a nobody)",
            "1 SC / 200 gp",
            "13",
            "A styled, lasting appearance change built to pass in a {@i specific} setting — advantage on Deception to pose as that role until reverted."
          ],
          [
            "{@b A quiet cure} (remove a specific curse she can reach)",
            "1.5 SC / 300 gp",
            "14",
            "As {@i remove curse.} Done gently, no questions, no ledger. Free for a good soul the story has earned."
          ],
          [
            "{@b Waking-ease draught} (calm the frightened)",
            "0.15 SC / 30 gp",
            "12",
            "Ends the {@i frightened} condition and grants advantage on the next save against fear. She keeps a shelf of it for the mortals who wander in shaking."
          ],
          [
            "{@b Match a lost face} (restore someone to how they looked before Hell changed them)",
            "0.75 SC / 150 gp",
            "13",
            "Cosmetic and kind — undo mutation-scarring, ichor-warping, a Fugue-faded face. She does this one nearly at cost; it {@i matters} to her."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Signature item — \"A Face Nobody in Hell Will Know\" (Deluxe) (book flavor / homebrew build)"
      },
      {
        "t": "p",
        "text": "Her masterwork of the trade, and the thing the floor whispers she {@i can} do (rumor #8): not a disguise but a {@i new person.} A slow, gentle, hours-long working that gives you a wholly new face, voice, and bearing — one that no fiend can see through, and that even {@i scrying} slides off of. She does it in the back, with the curtain drawn, and she does it right."
      },
      {
        "t": "list",
        "items": [
          "{@b What it is:} a lasting new identity — appearance and manner remade — built to be {@b undetectable by fiends.} Divination and truesight that would pierce an illusion find nothing to pierce, because nothing here is illusion; the change is {@i real.} Lasts until she (or comparable art) reverts it.",
          "{@b Rules effect (level 12):} the wearer counts as a different, unremarkable person: {@b immune to being magically identified or located by fiends} (fiendish {@i scrying}, {@i locate creature}, and truesight fail to recognize them), and gains advantage on all Deception checks to maintain the false identity. Reverts only by Burney's hand or {@i greater restoration}-grade magic.",
          "{@b Price:} {@b 4 SC — {@i or} a kindness.} [DM-only truth: for a genuinely good-aligned party with a good reason, she'll waive the coin entirely and do it {@i for the cause}, quietly, asking only that they use it well. She'll never say why she can afford to.] SC/kindness only; gold feels wrong to her for this and she'll gently decline it.",
          "{@b Haggle:} she barely charges to begin with (DC 15, cap 20%) — and for the right heart, the price isn't coin at all."
        ]
      },
      {
        "t": "p",
        "text": "{@b Won't flex on:} nothing, really — she under-charges. She {@i will} refuse to help someone she reads as cruel (a Cold-tier refusal). {@b Signature hook:} the only stall where \"free\" is {@i actually} free and carries no hook — the exact inverse of Mahadi. A careful party may someday wonder {@i why.}"
      }
    ]
  },
  "emporium-fhetahla": {
    "title": "Emporium: From Here to Avernus (Fhet'Ahla)",
    "blocks": [
      {
        "t": "p",
        "text": "{@side emporium-shops|← All shops, haggling and the soul-coin economy}"
      },
      {
        "t": "note",
        "title": "Session 13: Kreeg's Lien",
        "text": "Kreeg filed a claim against the ship at this desk (Session 13, Kreeg's Trap at the Emporium). Voiding a sealed instrument costs {@b 2 SC + surrender of the original, both signatories present}. Certifying or attesting a document: 0.25 SC. Fhet'Ahla is fair to the letter: prove the claim names an unregistered ship, or that only Zariel's own agent may claim her damages, and he suspends it."
      },
      {
        "t": "p",
        "text": "{@b Proprietor:} {@b Fhet'Ahla}, amnizu (CR 18 amnizu — squat, corpulent, wrinkled; never fought here, he's a banker). Runs an {@b infernal bank}: a soul-coin moneylender whose loans are secured by {@b infernal contracts.} {@b (campaign)} he is also {@b Mahadi's contract-notary} — the seal on the charter's soul-bounty instruments. Meticulous, unhurried, faintly bored by mortals who don't read."
      },
      {
        "t": "p",
        "text": "{@b Attitude:} {@b Cordial}, professionally cold. He doesn't dislike the party; he simply doesn't care, until they're a {@i counterparty.} {@b Insight DC 16} — a success reveals he is scrupulously {@i fair to the letter} and {@i ruthless past it}: the trap is never a lie, it's a clause. The rumor \"read {@i all} of it\" (primer rumor #7) is exact."
      },
      {
        "t": "p",
        "text": "{@b Haggling Fhet'Ahla:} Haggle DC {@b 18}, cap {@b 10%}, and he flexes on {@b fees and rates, never on the {@i terms}.} You can talk down an interest point; you cannot talk out a default clause. Intimidation is useless (amnizu; disadvantage, Wary). Deception is {@i dangerous} — he reads contracts {@i and} people, and a caught bluff sours the desk for the whole visit. Persuasion + actually reading the paper is the only respectable play."
      },
      {
        "t": "h",
        "text": "Soul-coin loans (book service / homebrew terms)"
      },
      {
        "t": "note",
        "title": "Note",
        "text": "{@b Borrow here only if you've read all of it.} Every loan is an infernal contract with a {@b default clause} that comes for the borrower's soul or service, not just their purse."
      },
      {
        "t": "table",
        "head": [
          "Loan product",
          "Principal",
          "Interest",
          "Collateral",
          "Default clause",
          "Haggle DC"
        ],
        "rows": [
          [
            "{@b Small line}",
            "up to 5 SC",
            "+25% due in 30 days",
            "A named possession or a favor",
            "On default, collateral forfeits {@i and} interest compounds weekly",
            "18"
          ],
          [
            "{@b Standard loan}",
            "up to 20 SC",
            "+50% due in 30 days",
            "Soul-goods, a magic item, or a marked service",
            "Default → the debt is {@b worked off in service} (the \"shadow works off the debt\" warlord — rumor #7)",
            "18"
          ],
          [
            "{@b Great loan}",
            "20 SC+",
            "+100% / negotiated",
            "{@b A soul as surety} (yours or a coin you hold)",
            "Default → the surety soul is {@b forfeit to the bank} (and can be spent — annihilated)",
            "20"
          ]
        ]
      },
      {
        "t": "list",
        "items": [
          "{@b The infernal catch (book):} these are {@i binding.} Asimov can flag the trap if asked (he reads fine print — primer Act 5); otherwise the party signs blind. {@b DM cue:} never let a loan be a clean gp transaction — it's a contract, and Fhet'Ahla's contracts {@i rot the borrower} if unpaid."
        ]
      },
      {
        "t": "h",
        "text": "Exchange & appraisal"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Rate",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "Exchange gp → SC",
            "~200 gp per 1 SC (the surcharge; poor rate)",
            "18",
            "He barely wants gold either."
          ],
          [
            "Exchange SC → gp",
            "~80 gp per 1 SC (he keeps the spread)",
            "18",
            "Rarely worth it."
          ],
          [
            "Appraise a soul-good / magic item",
            "0.1 SC / 20 gp per item",
            "16",
            "Honest to the copper — and he {@i remembers} what you showed him."
          ],
          [
            "Appraise Red Ruth's soul-stock / heartstone",
            "{@b Free} (he wants to {@i see} it)",
            "—",
            "(homebrew tie) He'll appraise it gladly — and word reaches Mahadi ({@side emporium-mahadi|§7.1}). Careful what you show."
          ]
        ]
      },
      {
        "t": "h",
        "text": "(campaign) Contract-notary fees — the soul-bounties"
      },
      {
        "t": "p",
        "text": "Fhet'Ahla is the fulcrum of the bounty board (primer Act 5). Nothing binds or voids without his seal. {@b These are {@i fees}, not the bounties' terms — do NOT restate the five bounties' fine print here; see orhenn-dm-primer.html / the primer.}"
      },
      {
        "t": "table",
        "head": [
          "Notary action",
          "Fee",
          "Notes"
        ],
        "rows": [
          [
            "{@b Seal a bounty instrument} (notarize: mark-in-ash → countersign → seal)",
            "{@b 0.5 SC per instrument} {@i or} the issuer covers it",
            "The binding step. Until sealed, the party may freely decline. Often the {@i issuer} pays this."
          ],
          [
            "{@b Void a sealed instrument}",
            "{@b 2 SC + surrender of the original}, both signatories present",
            "Backing out is {@i possible} but costs — deliberately more than sealing."
          ],
          [
            "{@b Certify / attest a document} (a writ, a letter, a claim)",
            "0.25 SC / 50 gp",
            "E.g. attesting Or'Henn's writ of reclamation (Bounty V payoff) once obtained."
          ],
          [
            "{@b Register a favor as an enforceable obligation}",
            "0.5 SC",
            "This is how a \"bargain\" ({@side emporium-shops|§3}) becomes a {@i contract.} Mahadi routes debts here to harden them."
          ]
        ]
      },
      {
        "t": "more",
        "title": "Playing Fhet'Ahla",
        "src": [
          "Book",
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Presence:} a squat, corpulent, deeply wrinkled devil folded behind a desk that is somehow always tidier than it should be. He does not rise, does not hurry, does not fidget. A pen moves in his fat fingers with unnerving precision; the ledger seems to fill itself. He looks {@i bored} — the boredom of something that has read every contract ever written and found them all obvious.",
              "{@b Voice:} flat, dry, precise, unhurried — a clerk reading terms aloud in a language he finds tedious to explain to children. No menace in the tone at all; the menace is in the {@i clauses.} {@b Catchphrase / tic:} {@i \"It is all in the document,\"} delivered whenever a party objects to something they didn't read.",
              "{@b Delighted by:} — he isn't, really. The closest he comes to pleasure is a counterparty who {@i reads}: someone who catches a clause, asks a sharp question, negotiates a fee like they mean it. He respects literacy the way Rassh respects a good edge.",
              "{@b Irritated by:} — also rare. But a {@i bluff} he catches (Deception) makes his pen pause, and that pause is the coldest thing on the floor. He does not forget it, and the desk turns Wary for the whole visit. He finds threats simply beneath comment.",
              "{@b The tell:} the pen. While Fhet'Ahla writes, the deal is proceeding as he expects. When the pen {@i stops} and he looks up — actually raising those heavy lids — something has surprised or displeased him, and the terms are about to get less generous.",
              "{@b As \"Heroes of the Last Hill\":} he is entirely unmoved by their fame; heroism is not a line item. He treats them with scrupulous, chilly courtesy — exactly as fairly, and exactly as ruthlessly, as anyone else. {@i \"Your reputation is noted. It does not alter the interest rate.\"} The party earns nothing from him but the truth of the paper — which, from him, is worth having."
            ]
          }
        ]
      },
      {
        "t": "more",
        "title": "Bargaining — sample lines",
        "src": [
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Greeting:} {@i \"Sit. Or stand; it is immaterial to the interest. You have come to borrow, to exchange, or to notarize. Tell me which, and read what I put before you. All of it. People who do not read are the reason I am wealthy.\"}",
              "{@b Meet/beat the DC (10–20% off):} {@i \"A reasonable point. I will reduce the fee — the fee, note, not the term. Half a point off the interest. The default clause remains as written, because the default clause is the reason the interest is as low as it is.\"}",
              "{@b Beat by 5+ (best case):} {@i \"...You read it. Good. Very well: the better rate, and I will waive the appraisal fee, since you clearly do not need to be told the value of things. It is refreshing. Do not let it become a habit; I dislike habits.\"}",
              "{@b Fail (price holds):} {@i \"No. The fee is the fee, and the fee is fair — I could show you the schedule, but you would only argue with arithmetic. Sign, or do not. The document does not mind either way.\"}",
              "{@b Fail by 5+ (soured):} {@i \"That was a lie, and a clumsy one. I read contracts; I read men; you are simpler than both. The desk is closed to you today. Come back when you have something true to say.\"} (The pen goes still.)",
              "{@b The hard won't-budge (the terms / default clause):} {@i \"You wish me to strike the default clause. I will not. A loan without a default clause is a gift, and I do not give gifts. The soul stands as surety, or there is no loan. That is not cruelty. That is the definition of the word 'loan.'\"}",
              "{@b Close / walk-away:} {@i \"Our business concludes. Keep your copy. Read it again on the road — people always find, on the second reading, the thing they signed on the first.\"}"
            ]
          }
        ]
      },
      {
        "t": "h",
        "text": "More services & prices (homebrew)"
      },
      {
        "t": "table",
        "head": [
          "Loan product / service",
          "Price / terms",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b Bridge advance} (very short loan, due at the caravan's {@i next} stop)",
            "up to 3 SC; +15% flat, due next stop",
            "18",
            "For a party caught short mid-visit. Cheap interest, brutally short fuse — miss the caravan and it compounds as a Standard loan."
          ],
          [
            "{@b Line of credit at the floor} (buy now across stalls, settle with him)",
            "0.5 SC opening fee; he covers up to 10 SC of purchases at +30%",
            "18",
            "He fronts the party's shopping and collects one debt. Convenient, and it puts {@i all} their obligations on his ledger."
          ],
          [
            "{@b Escrow a bargain} (hold a favor/item in trust until a condition is met)",
            "0.5 SC / 100 gp",
            "16",
            "Neutral third-party hold for a deal between the party and another patron. He is scrupulously honest — and {@i remembers} both sides."
          ],
          [
            "{@b Notarize a will / claim of ownership}",
            "0.25 SC / 50 gp",
            "16",
            "Makes a claim to property (a ship, a trophy, a title) infernally enforceable. Useful for the Lady Vengeance's paperwork."
          ],
          [
            "{@b Certify a death} (attest a named soul is truly gone / truly bound)",
            "0.5 SC / 100 gp",
            "17",
            "A binding legal fact — e.g. certifying Red Ruth's death for a buyer who won't take the party's word. Word of what you certify travels."
          ],
          [
            "{@b Buy out another's debt} (assume a third party's obligation)",
            "face value + 20%",
            "20",
            "Purchase someone's contract from him — leverage over that person, and a fresh debt of your own. Morally and mechanically loaded."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Signature item — The Unredeemed Collateral (campaign — a defaulted warlord's forfeit)"
      },
      {
        "t": "p",
        "text": "Behind the desk, in a locked strongbox that Fhet'Ahla never mentions unless asked directly, sits a rare magic item held as {@b unredeemed collateral} — surrendered by a warlord who borrowed against it, defaulted, and is now {@i working off the shadow of the debt} (the \"shadow works off the debt\" borrower, primer rumor #7). The bank owns it outright. The bank will sell it. The bank will not tell you the whole story."
      },
      {
        "t": "list",
        "items": [
          "{@b What it is:} [DM's pick, tied to a live thread] a genuinely useful {@b rare wondrous item or weapon} at level-11 tuning — e.g. a {@i Cloak of the Bat}, a {@i +2 weapon}, a {@i Ring of Spell Storing}, or a bespoke infernal relic. Whatever it is, it {@i belonged to someone who is still in Hell, still bound, and still remembers losing it.}",
          "{@b The complication (the price behind the price):} buying it means the {@b prior owner's grievance transfers to the buyer.} The defaulted warlord (or their faction) now has a reason to want it — and its new holder — back. Fhet'Ahla discloses this only if asked the right question (or on a {@b DC 18 Insight} / by asking Asimov to read the contract of forfeiture). {@i \"The item is unencumbered. The item's history is not. You asked what I am selling; I am selling the item.\"}",
          "{@b Price:} {@b 12–20 SC} (DM sets to the item), payable in coin — Fhet'Ahla has no romance about bargains, he wants {@b value}, though he'll take a soul-of-equal-appraised-worth. Rarely offered for a favor; he'd rather have the coin and keep the party {@i owing} him separately.",
          "{@b Haggle:} DC 20, cap 10%, on the {@i price} only — never on the disclosure. He will not misrepresent the history if asked plainly; he will simply not volunteer it. Caveat emptor is, to an amnizu, a form of love."
        ]
      },
      {
        "t": "p",
        "text": "{@b Won't flex on:} the {@i terms} of any contract or the default clauses — ever. Flexes only on fees/interest, and only a little. {@b Signature hook:} a ledger that writes itself; coins that clink into place; a devil who has never once been {@i wrong about the paperwork.}"
      }
    ]
  },
  "emporium-elliach": {
    "title": "Emporium: Ichor's Aweigh! (Elliach)",
    "blocks": [
      {
        "t": "p",
        "text": "{@side emporium-shops|← All shops, haggling and the soul-coin economy}"
      },
      {
        "t": "p",
        "text": "{@b Proprietor:} {@b Elliach}, human mage (use a {@b mage}, CR 6, if it ever matters — it won't). Buys and sells {@b demon ichor} — mutagenic, flesh-warping stuff. Drink it, gain a boon; or sprout something. A gamble, sold as opportunity."
      },
      {
        "t": "p",
        "text": "{@b Attitude:} {@b Cordial}, breezy, salesman-slick — undersells the risk, oversells the wonder. {@b Insight DC 14} — a success reveals he {@i genuinely doesn't know} which way a given dose will turn (the ichor is chaotic; that's not a con, it's the product). Great temptation for {@b Or'Henn} (already half-warped by Avernus) or any gambler."
      },
      {
        "t": "p",
        "text": "{@b Haggling Elliach:} Haggle DC {@b 13}, cap 20%. Easy to haggle — he wants volume and he {@i loves} a repeat customer to study. Deception works (he half-cons himself). A good beat throws in a {@b free \"sampler\" vial} (roll on the table below — the hook that keeps them coming back)."
      },
      {
        "t": "h",
        "text": "Demon-ichor products"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b Raw ichor vial} (unrefined)",
            "1 SC / 200 gp",
            "13",
            "Drink it and {@b roll on the Mutation/Boon table.} A gamble, every time."
          ],
          [
            "{@b Sampler vial} (half-dose, weaker)",
            "0.5 SC / 100 gp",
            "13",
            "Roll with {@b disadvantage} on the boon side / advantage on the mutation side — cheaper, worse odds."
          ],
          [
            "{@b Refined ichor} (one {@i known} effect)",
            "3 SC / 600 gp",
            "15",
            "Elliach has \"stabilized\" a specific benefit — pick from boons #1–4 below, no mutation risk. {@b SC-preferred.}"
          ],
          [
            "{@b He buys ichor / warped trophies}",
            "pays 0.5 SC per vial-equivalent",
            "14",
            "Demons drop ichor (see loot-and-items); he's a standing buyer. Sell high after a demon fight."
          ],
          [
            "Sell him a {@i warped body part / mutation sample}",
            "0.25–1 SC (DM's call)",
            "14",
            "Ghoulish, lucrative. He's {@i delighted.}"
          ]
        ]
      },
      {
        "t": "h",
        "text": "Mutation / Boon table (d10) (homebrew — roll on drinking raw ichor)"
      },
      {
        "t": "p",
        "text": "Drink a raw vial → roll d10. Fair warning is {@i not} Elliach's business. Effects last {@b 1 hour} unless noted; a {@b 1} is permanent until removed ({@i greater restoration} / {@i Tears of the Caged Star})."
      },
      {
        "t": "table",
        "head": [
          "d10",
          "Result",
          "Type"
        ],
        "rows": [
          [
            "1",
            "{@b Warp:} a lasting mutation — an extra eye, chitin patches, a lashing tail. −2 to a random ability; the tail gives you a grapple option. {@i Permanent} until magically removed.",
            "Mutation"
          ],
          [
            "2",
            "{@b Fleshcrawl:} disadvantage on the next 3 saves as your skin {@i reconsiders itself.} Nauseating.",
            "Mutation"
          ],
          [
            "3",
            "{@b Ichor-sick:} 2d6 poison damage now; poisoned condition 1 hour.",
            "Mutation"
          ],
          [
            "4",
            "{@b Squirm:} speed halved and disadvantage on Dex checks for 1 hour as limbs briefly rebel.",
            "Mutation"
          ],
          [
            "5",
            "{@b Null:} nothing. The ichor was inert. Elliach is {@i fascinated.}",
            "Neutral"
          ],
          [
            "6",
            "{@b Demon-thews:} advantage on Strength checks and Strength saves, 1 hour.",
            "Boon"
          ],
          [
            "7",
            "{@b Carapace:} +2 AC (natural armor grows in), 1 hour.",
            "Boon"
          ],
          [
            "8",
            "{@b Regenerative:} regain 2d6 HP now, and 5 HP at the start of each of your turns, 1 minute.",
            "Boon"
          ],
          [
            "9",
            "{@b Chaos-blooded:} resistance to fire {@i and} poison, 1 hour; your unarmed strikes deal +1d6 acid.",
            "Boon"
          ],
          [
            "10",
            "{@b Ascendant surge:} one ability score +2 (max 22) and advantage on all checks with it, 1 hour. The good stuff. Elliach will want the sample.",
            "Boon"
          ]
        ]
      },
      {
        "t": "more",
        "title": "Playing Elliach",
        "src": [
          "Book",
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Presence:} a wiry, bright-eyed human mage in an alchemist's apron stained a hundred colors, sleeves pushed up over forearms that carry a few {@i very} interesting scars. Vials clink at his belt. He gestures constantly, holds sample glasses up to the light, and has the restless energy of a man who genuinely cannot wait to see what happens next.",
              "{@b Voice:} fast, breezy, delighted, salesman-slick — the patter of someone who has talked people into worse ideas and enjoyed every one. Undersells the risk ({@i \"a little rough on the tongue\"}), oversells the wonder (*\"and then — antlers! or {@i genius}! who's to say!\"*). {@b Catchphrase:} *\"Ah, but that's the {@i fun} of it, isn't it?\"* (his answer to every worried question about side effects).",
              "{@b Delighted by:} a gambler, a repeat customer, and above all a {@i result} — someone who drinks and {@i changes.} A fresh mutation to study makes his whole day. He'll pay you to let him watch it wear off. Or'Henn is his dream client and he can smell it.",
              "{@b Irritated by:} — very little, honestly. He half-cons himself, so he doesn't take offense at a con. The one thing that deflates him is a party that won't {@i taste} anything: {@i \"You came to the ichor stall to buy... rope? For shame.\"}",
              "{@b The tell:} the more nervous the customer {@i should} be, the {@i wider} Elliach smiles. When he stops talking and just {@i watches} you drink — pen already out, notebook open — you are no longer a customer. You are an experiment, and he is thrilled.",
              "{@b As \"Heroes of the Last Hill\":} he greets them as {@i ideal} subjects — powerful, battle-hard, exactly the constitutions that make ichor {@i interesting.} The reputation buys a warm welcome and a free sampler, but be warned: he's flattering them toward the vial. {@i \"Heroes! Strong stock, resilient — you'd metabolize a raw dose beautifully. Purely a compliment. Purely.\"}"
            ]
          }
        ]
      },
      {
        "t": "more",
        "title": "Bargaining — sample lines",
        "src": [
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Greeting:} *\"Friends! You smell that? Sweet, with a little rot underneath — that's {@i possibility}, that is. First one's practically a gift for people of your reputation. Who's feeling lucky? Someone's always feeling lucky.\"*",
              "{@b Meet/beat the DC (10–20% off):} {@i \"Done, done, sold — and here, a sampler on the house, roll the little bones and see what you get. Repeat customers are my favorite kind of science.\"}",
              "{@b Beat by 5+ (best case):} *\"Oh, you drive a hard bargain, I {@i love} it — fine, my best price, {@i and} a stabilized dose so you know exactly what you're getting. That's the deluxe treatment. All I ask is you come tell me how it goes. For the notebook. For posterity.\"*",
              "{@b Fail (price holds):} *\"Ah, that's already generous, that is — this is {@i refined} work, stabilized, no nasty surprises. You're paying for the surprises {@i not} to happen. That's worth a coin, surely.\"*",
              "{@b Fail by 5+ (soured):} *\"Hm. No. You know, I don't think this batch is for you after all — temperamental stuff, wants a customer with the right {@i attitude.} Come back when you're feeling more adventurous. And less rude.\"*",
              "{@b The hard won't-budge (the randomness of raw ichor):} *\"You want me to {@i promise} what a raw vial does? Friend, I could no more promise that than promise the weather in Avernus. That's the whole product! If you want a sure thing, buy refined and pay for the certainty. The gamble's the gamble. I won't lie and say otherwise.\"*",
              "{@b Close / walk-away:} *\"Off you go — and if anything, ah, {@i sprouts} in the night, come straight back. I'll want to see it. I'll pay to see it. Bring the tail.\"*"
            ]
          }
        ]
      },
      {
        "t": "h",
        "text": "More services & prices (homebrew)"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b \"Bloodwrath\" strain} (refined, aggression)",
            "3 SC / 600 gp",
            "15",
            "Stabilized boon #6 (Demon-thews): advantage on Strength checks/saves for 1 hour, no mutation risk. Elliach's bestseller for front-liners."
          ],
          [
            "{@b \"Ironhide\" strain} (refined, defense)",
            "3 SC / 600 gp",
            "15",
            "Stabilized boon #7 (Carapace): +2 AC for 1 hour. Popular before a known fight."
          ],
          [
            "{@b \"Second Skin\" strain} (refined, recovery)",
            "3.5 SC / 700 gp",
            "15",
            "Stabilized boon #8 (Regenerative): 2d6 HP now + 5/turn for 1 minute. Slightly pricier — he can barely keep it stable."
          ],
          [
            "{@b Antitoxin of the flesh} (mutation-reverser, single dose)",
            "1 SC / 200 gp",
            "14",
            "Ends one {@i non-permanent} ichor mutation immediately (results 2–4). Won't touch a permanent Warp (result 1). Sold, of course, right next to the raw vials."
          ],
          [
            "{@b A guided tasting} (Elliach supervises a raw dose)",
            "0.25 SC / 50 gp on top of the vial",
            "13",
            "He watches, takes notes, and can end the effect early with his antitoxin if a {@i bad} mutation lands — a safety net for the price of being studied."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Signature item — The Perfected Strain (\"Elliach's Grail\") (homebrew)"
      },
      {
        "t": "p",
        "text": "The one vial in the case that doesn't glimmer with menace — a still, clear, faintly golden ichor Elliach has spent years {@i perfecting.} It is a raw ichor's dream outcome (result 10, Ascendant surge) made {@b permanent, stable, and downside-free.} He'll tell you it's the finest thing he's ever refined. He's right, and he's terrified of how much he's charging, and he wants to watch you drink it more than he wants the coin."
      },
      {
        "t": "list",
        "items": [
          "{@b What it is:} a single dose of stabilized apex ichor that grants a {@i lasting} boon with no mutation risk and no expiry — the gambler's grail, the reason people keep drinking the raw stuff hoping to get here for free.",
          "{@b Rules effect (level 12):} on drinking, choose {@b one ability score} and raise it {@b permanently by +1} (to a maximum of 20), {@i or} gain a permanent chosen minor mutation-as-boon with {@b no penalty} — DM's pick from: a prehensile tail (a free grapple option / extra unarmed strike), chitin patches (permanent +1 AC), or demon-adapted blood (permanent resistance to poison). One dose per creature, ever — a second does nothing but make Elliach very interested in why.",
          "{@b Price:} {@b 20 SC}, SC-strongly-preferred (he'll {@i consider} an equal soul-good, never gold). A genuine big-ticket temptation — especially dangling in front of Or'Henn. {@b SC/bargain only.}",
          "{@b Haggle:} barely (DC 17, cap 20% at the very most). He knows exactly what he has. A great haggle gets you a {@b free raw sampler} thrown in, never a real cut on the Grail — {@i \"the Grail is the Grail, friend.\"}"
        ]
      },
      {
        "t": "p",
        "text": "{@b Won't flex on:} the {@i randomness} of raw ichor (it is what it is) — only the refined product is a sure thing, and it costs. {@b Signature hook:} the sweet-rot smell in glass; a mage who is {@i thrilled} by whatever grows on you and will pay to study it."
      }
    ]
  },
  "emporium-zneth": {
    "title": "Emporium: Z'neth's Larva Farm",
    "blocks": [
      {
        "t": "p",
        "text": "{@side emporium-shops|← All shops, haggling and the soul-coin economy}"
      },
      {
        "t": "p",
        "text": "{@b Proprietor:} {@b Z'neth}, hobgoblin warlord (use a {@b hobgoblin warlord / captain} block if needed; won't be). {@b Buys and sells larvae} — the wormlike soul-forms of the damned, raw material of the Hells — and appraises soul-goods. The moral wince of the market: a pen of squirming larvae by the crate."
      },
      {
        "t": "p",
        "text": "{@b Attitude:} {@b Cordial}, coldly commercial — souls are inventory to him. {@b Insight DC 15} — a success reveals he is a {@b shrewd, patient buyer} who'll happily enter a {@b bidding war} for good soul-stock (relevant to Red Ruth's; {@side emporium-mahadi|§7.1} tie), and that he pays {@i below} true value to first-time sellers who don't haggle."
      },
      {
        "t": "p",
        "text": "{@b Haggling Z'neth:} Haggle DC {@b 15}, cap 20% (buying) / he'll raise his {@i buy} offer up to 20% on a good sell-side haggle. He respects Intimidation {@i a little} (hobgoblin; a warrior's leverage lands) and Deception poorly (he counts everything twice). A thrown-in extra is usually {@b appraisal for free} or a {@b lead on who else is buying.}"
      },
      {
        "t": "h",
        "text": "Larvae — buy / sell"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b Buy a larva} (common damned soul-form)",
            "0.5 SC / 100 gp each",
            "15",
            "The raw material of Hell. What a party {@i does} with one is its own moral question. {@b SC-preferred.}"
          ],
          [
            "Buy larvae by the crate (×10)",
            "4 SC / 800 gp",
            "15",
            "Bulk. He'd rather move volume."
          ],
          [
            "{@b Sell him a larva / soul-form}",
            "he pays 0.3 SC each (0.4 haggled)",
            "15",
            "He lowballs first-timers; haggle up."
          ],
          [
            "{@b Buy a \"quality\" larva} (a soul with residual power/knowledge)",
            "2–5 SC {@b or a bargain}",
            "17",
            "{@b SC/bargain only.} Rare stock; he'll source on commission."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Soul-good appraisal & buy rates [relevant to Red Ruth's soul-stock]"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Rate",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b Appraise soul-goods} (soul-stock, a coin, a heartstone)",
            "0.1 SC / 20 gp per item, or free on a haggle",
            "15",
            "Honest weight; then he makes an offer."
          ],
          [
            "{@b Buy Red Ruth's soul-stock} (per the primer, the party carries it)",
            "🎲 DM's call — {@b opening ~3–5 SC}, higher in a bidding war",
            "17",
            "(homebrew tie) He is a natural rival buyer if Mahadi's Red Ruth gambit escalates. Playing him against Mahadi can {@i raise the price} the party gets — or anger the rakshasa."
          ],
          [
            "{@b Buy a heartstone}",
            "offers 2–4 SC (he undervalues hag-craft; Mahadi wants it more)",
            "17",
            "{@b DM cue:} the heartstone is leverage, not just coin — Mahadi ({@side emporium-mahadi|§7.1}) will out-bid on {@i value-to-him.}"
          ]
        ]
      },
      {
        "t": "more",
        "title": "Playing Z'neth",
        "src": [
          "Book",
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Presence:} a broad, scarred hobgoblin in a stained leather apron, moving between the crates and pens with a stockman's brisk economy. He handles the larvae the way a butcher handles a carcass — without cruelty and without tenderness; they are {@i stock.} A tally-slate hangs at his hip and he marks it constantly. The pens {@i squirm}, and he doesn't notice the sound anymore.",
              "{@b Voice:} clipped, martial, transactional — a quartermaster's cadence. States weights, grades, and prices; wastes no words on sentiment because he genuinely feels none about the merchandise. {@b Catchphrase / tic:} {@i \"Sentiment's not on the scale.\"} (His flat answer to anyone who talks about the larvae like people.)",
              "{@b Delighted by:} — as close as he gets is a good {@i sell:} quality stock, a customer who knows grades, a bidding war he can sit back and profit from. He warms, faintly, to a fellow warrior — the hobgoblin in him respects someone who's held a line.",
              "{@b Irritated by:} squeamishness that wastes his time, and lowball {@i bluffs} — he counts everything twice and catches padding fast. Moralizing over the pens gets a shrug: {@i \"You're welcome to buy them all and free them. You won't. Next?\"}",
              "{@b The tell:} the slate. When Z'neth is marking his tally while he talks, the deal's routine. When he {@i stops} marking and folds his arms, he's decided you're either a serious buyer worth a real offer — or a time-waster he's about to dismiss. The pause is where the price moves.",
              "{@b As \"Heroes of the Last Hill\":} he rates them as {@i soldiers}, not saints — a warband that won a hard field, which he can respect and, more usefully, do business with. The reputation buys a straight offer instead of the first-timer lowball, and his professional candor. {@i \"You broke a real warband. Fine. Then you'll not waste my time haggling like a farmer. Grades and coin. Let's go.\"}"
            ]
          }
        ]
      },
      {
        "t": "more",
        "title": "Bargaining — sample lines",
        "src": [
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Greeting:} *\"Buying or selling. Say which. If you're just here to {@i look} and feel something about it, the pens are that way and I charge nothing for a conscience. If you're trading — grades and coin, and I'll give you a fair count. Fairer than most give you.\"*",
              "{@b Meet/beat the DC (10–20% off / better sell price):} {@i \"...Acceptable. I'll come up two coins on the lot — you know your weights, I'll not insult you with the first-timer's number. And I'll appraise whatever else you're carrying, no charge. Well?\"}",
              "{@b Beat by 5+ (best case):} {@i \"Hah. Hard bargainer. Fine — my best offer, and a name: there's another buyer on the floor circling the same stock. Play us right and you'll do better than either of us wants you to. Consider that a gift from one soldier to another.\"}",
              "{@b Fail (price holds):} {@i \"No. That's the number and the number's fair — I pay below sentiment, not below sense. You'll not find a better honest count on this floor. Take it or carry your stock back out.\"}",
              "{@b Fail by 5+ (soured):} {@i \"You're padding the count and I've weighed twice. Don't. The offer just dropped, and it'll drop again if you open your mouth. Sell straight or sell elsewhere.\"}",
              "{@b The hard won't-budge (he pays below sentiment):} *\"You want me to pay what the soul {@i meant to someone.} I can't. I pay what it weighs and what it'll fetch. It's a worm in a crate to me, same as the rest. If that turns your stomach — good. It should. But it won't change my number.\"*",
              "{@b Close / walk-away:} {@i \"Deal's done. Mark it, tally squares. Come back with stock, not stories. And watch who follows you out — you're carrying something half the floor can smell.\"}"
            ]
          }
        ]
      },
      {
        "t": "h",
        "text": "More services & prices (homebrew)"
      },
      {
        "t": "table",
        "head": [
          "Item / Service",
          "Price (SC / gp)",
          "Haggle DC",
          "Notes"
        ],
        "rows": [
          [
            "{@b Graded larva — \"Common\"} (standard damned soul-form)",
            "0.5 SC / 100 gp",
            "15",
            "(Baseline; see main table.) He grades all stock; this is the floor grade."
          ],
          [
            "{@b Graded larva — \"Vigorous\"} (a strong-willed soul, resists shaping)",
            "1 SC / 200 gp",
            "16",
            "Worth more to a shaper or a diviner; harder to control. He notes which are which."
          ],
          [
            "{@b Larva husbandry} (hold/feed a soul-form in his pens, per week)",
            "0.1 SC / 20 gp",
            "15",
            "Board a larva you're not ready to use. He'll keep it \"healthy,\" such as that word means here."
          ],
          [
            "{@b A grade & provenance report} (what a soul-form {@i was} in life)",
            "0.25 SC / 50 gp",
            "16",
            "He can read a larva's residue for name, station, manner of death — useful intel dressed as appraisal. Word of what you ask travels."
          ],
          [
            "{@b Broker a bidding war} (he sets rival buyers against each other on your behalf)",
            "he takes 15% of the final price",
            "17",
            "For a fee, he'll {@i run} the auction on your soul-stock — turning the Red Ruth gambit into coin. Playing him this way may still anger Mahadi ({@side emporium-mahadi|§7.1})."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Signature item — The Coin of a Knowing Soul (\"The Ledger-Keeper\") (homebrew — morally loaded)"
      },
      {
        "t": "p",
        "text": "Set apart from the pens, in a warded box Z'neth keeps for {@i quality} stock, is a single soul that did not go quiet — a damned bookkeeper, spy, or courtier who spent their life {@i knowing things} and remembers them still, screaming, inside a warm iron coin. Z'neth found it worth more intact than melted down. He'll sell it. He does not care what you do with it."
      },
      {
        "t": "list",
        "items": [
          "{@b What it is:} a named soul with residual knowledge — a \"quality larva\" ascended to a coin, tied to a live campaign lead (a warlord's true weakness; the route past a bounty's terrain; a secret an issuer is hiding; a name Mephistopheles's file is missing). The DM picks whose ledger it kept. It is a {@i person}, and it can be spoken with — which is the whole horror.",
          "{@b Rules effect (level 12):} a creature holding the coin can, once per long rest, spend 10 minutes {@i interrogating} the trapped soul (Charisma or Intimidation contest, or roleplay) to extract {@b one true, specific piece of the knowledge it carried in life} — a lead the party could not otherwise get. The soul bargains, lies by omission, and pleads; it wants release (destruction = annihilation) or restoration (a redemption thread). {@b The moral weight is the point:} using it well means using a suffering person as a search engine.",
          "{@b Price:} {@b 6 SC or a significant bargain.} SC/bargain only — Z'neth won't take gold for {@i quality} stock. He'll happily broker it to the highest bidder if the party dithers. A rival buyer (Mahadi, a night hag's agent) wants it too, which can drive a bidding war.",
          "{@b Haggle:} DC 17, cap 20%. He'll flex on price for a serious buyer; he will {@i not} pretend the coin is anything but a person, and he'll say so flatly if asked — that candor is his version of an honest scale."
        ]
      },
      {
        "t": "p",
        "text": "{@b Won't flex on:} the fact that he pays {@i below} sentiment (souls are stock, not people, to Z'neth). {@b Signature hook:} the crate of squirming larvae; the place the party {@i feels} what a soul is worth in Avernus — with Asimov in a box on their hip and Red Ruth's stock in their pack."
      }
    ]
  },
  "emporium-bone-devil-informant": {
    "title": "Emporium: The Bone Devil Informant",
    "blocks": [
      {
        "t": "p",
        "text": "{@side emporium-shops|← All shops, haggling and the soul-coin economy}"
      },
      {
        "t": "p",
        "text": "{@b Proprietor:} an unnamed {@b bone devil} (CR 9 bone devil; pull the block only if the truce breaks, which it won't at his stall). The floor's homebrew info-broker — the connective tissue that points the party at {@b Or'Henn} (primer Act 4) and can confirm Red Ruth rumors on the cheap-but-risky channel."
      },
      {
        "t": "p",
        "text": "{@b Attitude:} {@b Wary} by default — a fiend who deals in leverage and expects the same. {@b Insight DC 14} — a success reveals he trades {@i only} in things that cost the buyer something (blood, coin, a secret), and that his answers are {@i true but incomplete} unless well paid."
      },
      {
        "t": "p",
        "text": "{@b The core mechanic (homebrew, from npc-reference):}"
      },
      {
        "t": "note",
        "title": "Note",
        "text": "{@b DC 16 Persuasion to get a real answer. A soul coin grants advantage on that check.} {@i \"Powerful spellcasters know the way — but they'll not lift a finger without blood.\"}"
      },
      {
        "t": "h",
        "text": "Information pricing tiers"
      },
      {
        "t": "table",
        "head": [
          "Tier",
          "Example",
          "Price / mechanic",
          "Notes"
        ],
        "rows": [
          [
            "{@b A rumor}",
            "Which stalls buy what; who's in the market today",
            "10 gp / a small secret",
            "Freely bought; he's chatty about trivia."
          ],
          [
            "{@b A real answer}",
            "Where a person is; the truth behind a rumor; {@b the Or'Henn pointer}",
            "{@b DC 16 Persuasion} — {@i soul coin = advantage}",
            "The core mechanic. Fail → he shrugs and holds it; fail-by-5 → he feeds a {@i bent} answer (rumor table has two false ones)."
          ],
          [
            "{@b A confirmed lead}",
            "Confirm Red Ruth is dead / who cleaned out the Brambles",
            "DC 16 Persuasion {@b + a soul coin spent} (not just held)",
            "Cheaper and riskier than asking Mahadi — but Mahadi may {@i hear} the party was asking."
          ],
          [
            "{@b A dangerous truth}",
            "Anything an archdevil guards",
            "DC 18 Persuasion + {@b blood pay} (a pint, à la the Intermediaries)",
            "He means the \"blood\" line literally."
          ]
        ]
      },
      {
        "t": "p",
        "text": "{@b The Or'Henn pointer (primer hook):} on a success, he murmurs that {@i \"the estate-keeper who lost his garden to the demons is asking after work, out past the last light\"} — steering the party to Or'Henn (Act 4)."
      },
      {
        "t": "more",
        "title": "Playing the Bone Devil Informant",
        "src": [
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Presence:} a tall, gaunt, chitinous horror folded into the shadow of a stall it does not seem to own — all angles, dry-clicking joints, and a segmented tail whose stinger tip rests, always, a little too near the customer. It does not lean in. It waits, still as a stick insect, for you to come close enough to whisper.",
              "{@b Voice:} a dry, clicking rasp, slow and deliberate, every word placed like a chess piece. It speaks in {@i true} statements that are shaped like traps — precise, literal, and never quite the whole thing unless you pay for the whole thing. {@b Catchphrase:} *\"Truth is cheap. {@i Useful} truth costs blood.\"*",
              "{@b Delighted by:} — devils don't delight, but it {@i savors} a good transaction: a fat soul coin laid on the ledge, a genuine secret offered in trade, blood freely given. Payment is the closest thing it has to pleasure.",
              "{@b Irritated by:} hagglers who want the price {@i lowered.} It finds this baffling and slightly insulting — the price is the price; it is a devil, not a fishwife. It has no patience for those who want the answer but won't pay the cost. It simply goes silent and lets them leave empty.",
              "{@b The tell:} the tail. When the stinger is still and low, the deal is proceeding. When it {@i lifts} — a slow, deliberate curl — the informant has decided the party is either serious enough to pay in blood, or foolish enough to threaten it. Read the tail, and know which conversation you're in.",
              "{@b As \"Heroes of the Last Hill\":} it is {@i unimpressed} by reputation and mildly amused that heroes come to it at all — heroes, in its experience, pay poorly and moralize freely. Fame buys nothing here; only coin, secrets, and blood move its tongue. {@i \"Heroes. How nice. Heroes bleed the same red as cowards. Shall we?\"}"
            ]
          }
        ]
      },
      {
        "t": "more",
        "title": "Bargaining — sample lines",
        "src": [
          "Homebrew"
        ],
        "blocks": [
          {
            "t": "list",
            "items": [
              "{@b Greeting (a whisper as they approach):} {@i \"You've the look of people who need to know a thing. Everyone who comes to my corner does. I have answers. You have coin, or a secret, or a pint to spare. We'll get along.\"}",
              "{@b Meet/beat the DC (soul coin laid down / good pay):} *\"Ahh. A warm coin. Now {@i there's} a customer. For that, I'll tell you true, and I'll tell you {@i whole} — no gaps for you to fall through. Listen close; I say it once.\"*",
              "{@b Beat by 5+ (best case — coin spent + blood):} *\"Generous. Rare, in a hero. Then take the truth {@i and} the thread behind it — the name, the place, and the one thing the asker never thinks to ask. Consider the rest of it a gift. I so seldom get to be generous.\"*",
              "{@b Fail (holds — badly paid):} *\"...Mm. You've paid for {@i an} answer, not a good one. So: technically, the person you seek is 'in Avernus.' That is true. That is all your coin bought. Come back heavier.\"*",
              "{@b Fail by 5+ (soured — a bent answer):} *\"Of course. The one you want was last seen {@i east, past the boneyards.}\"* (It was west. He feeds one of the rumor table's false leads, smiles with too many teeth, and says nothing more.)",
              "{@b The hard won't-budge (the DC / the price is the price):} *\"Lower? You misunderstand the trade, hero. I am not {@i selling} to you. You are {@i paying} me, and the toll does not bend for a sad story or a hard look. Coin. Secret. Blood. Choose one, or move along and let a paying man through.\"*",
              "{@b Close / walk-away:} {@i \"Go, then. Mind the road. And when the cheap answer proves useless — and it will — you know which corner to bleed on next time.\"}"
            ]
          }
        ]
      },
      {
        "t": "h",
        "text": "More services & prices (homebrew)"
      },
      {
        "t": "table",
        "head": [
          "Info package / service",
          "Price / mechanic",
          "Notes"
        ],
        "rows": [
          [
            "{@b A name} (who {@i really} runs a thing / who to actually talk to)",
            "1 soul coin {@i or} a pint of blood",
            "A single true name, given whole. Cheap by his standards; a good opener."
          ],
          [
            "{@b A sealed map} (a route, a hideout, a bounty's terrain, marked and true)",
            "2 SC + a pint of blood",
            "Rolled, waxed, and honest — the blood is what makes it {@i complete} rather than \"mostly.\" Needed for reaching some bounty grounds."
          ],
          [
            "{@b A dossier} (everything he has on one person: habits, weakness, debts)",
            "3 SC + {@b blood pay} (2 pints) + DC 18 Persuasion",
            "Deep intel on a named target. The blood buys the parts he'd otherwise \"forget.\""
          ],
          [
            "{@b Confirm a death or a lie} (verify a specific claim, true/false, no hedging)",
            "1 SC {@i spent} (annihilated, not held)",
            "The spent coin buys certainty; a merely-{@i held} coin buys a hedge. Riskier and cheaper than asking Mahadi."
          ],
          [
            "{@b A dangerous truth} (something an archdevil guards)",
            "DC 18 Persuasion + {@b blood pay} (a pint) + a soul coin",
            "He means \"blood\" literally. Selling it may also put the {@i buyer} on someone's ledger (as with Mahadi's \"Dangerous\" tier)."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Signature item — The Sealed Confession (homebrew)"
      },
      {
        "t": "p",
        "text": "The one thing the informant keeps and will not simply {@i tell:} a single folded, wax-sealed vellum that it swears holds a {@b truth an archdevil would kill to bury} — a name in a ledger, the real reason a warlord fell, the location of a thing that was meant to stay lost (DM ties it to the arc's biggest live thread: Mephistopheles's grudge, Bhaalspawn intel, a soul-council secret). It has never opened it. It only sells it. {@i \"I don't know what's in it. That's why I've stayed alive to sell it.\"}"
      },
      {
        "t": "list",
        "items": [
          "{@b What it is:} a sealed, single-use revelation — a game-changing piece of intel the party cannot get anywhere else, delivered as a physical object so the {@i buying} is a scene and the {@i reading} is a decision.",
          "{@b Rules effect (level 12):} breaking the seal reveals {@b one campaign-pivotal truth} in full (DM's choice, keyed to the thread you most want to move) — no roll, no hedge, unambiguous. But the confession is {@i hot:} whoever the truth implicates learns it has surfaced (the seal is warded to {@i report} when broken), putting a powerful, patient enemy onto the party's trail. Knowing the truth and surviving knowing it are two different prices.",
          "{@b Price:} {@b blood pay + soul coins only} — a pint of blood from each PC who wants a share of the knowing, {@b plus 5 soul coins spent} (annihilated on the ledge as the \"seal-fee,\" which the informant frames as {@i \"paying the dead to keep quiet\"}). {@b No gold, ever; no ordinary bargain} — this is the one thing even a favor won't buy, because the informant only trusts what hurts to give.",
          "{@b Haggle:} {@b none.} {@i \"The price is the price, and the price is blood. Devils don't discount the truth. They just charge for it.\"} A failed push here doesn't lower the price — it makes the informant withdraw the offer for the visit."
        ]
      },
      {
        "t": "p",
        "text": "{@b Won't flex on:} the DC (he's a devil; the price is the price) — but the {@b soul-coin-for-advantage} lever is the intended \"discount.\" {@b Signature hook:} he never lies outright, but a badly-paid answer is {@i technically} true and {@i practically} useless. Blood always sweetens the deal."
      }
    ]
  },
  "emporium-quick-prices": {
    "title": "Emporium: Quick Prices",
    "blocks": [
      {
        "t": "p",
        "text": "{@side emporium-shops|← All shops}"
      },
      {
        "t": "p",
        "text": "The ~20 most likely transactions, at a glance. SC first; gp includes the mortal surcharge; {@b ★} = SC/bargain only."
      },
      {
        "t": "table",
        "head": [
          "#",
          "Item / Service",
          "Shop",
          "SC",
          "gp",
          "Haggle DC"
        ],
        "rows": [
          [
            "1",
            "Meal (per guest)",
            "Infernal Rapture",
            "0.1",
            "20",
            "20"
          ],
          [
            "2",
            "Bath / soak (−1 exhaustion)",
            "Infernal Rapture",
            "0.2",
            "40",
            "20"
          ],
          [
            "3",
            "Sanctuary long rest (party)",
            "Infernal Rapture",
            "0.5",
            "100",
            "20"
          ],
          [
            "4",
            "Common question",
            "Infernal Rapture",
            "—",
            "10",
            "—"
          ],
          [
            "5",
            "Rare intel / Bhaalspawn lead ★",
            "Infernal Rapture",
            "1–3",
            "★",
            "22"
          ],
          [
            "6",
            "Commission uncommon item",
            "Infernal Rapture",
            "5",
            "1,000",
            "20"
          ],
          [
            "7",
            "Repair weapon/armor",
            "Firesnake Forge",
            "0.2",
            "40",
            "14"
          ],
          [
            "8",
            "+1 weapon or armor",
            "Firesnake Forge",
            "8",
            "1,600",
            "16"
          ],
          [
            "9",
            "{@b Shatterstick} (5d6 thunder, DC 15 Dex)",
            "Firesnake Forge",
            "0.5",
            "100",
            "15"
          ],
          [
            "10",
            "{@b Lady Vengeance — get running}",
            "Firesnake Forge",
            "{@b 8} (or 6 + favor)",
            "~1,600",
            "16"
          ],
          [
            "11",
            "{@b Lady Vengeance — refuel /24h ★}",
            "Firesnake Forge",
            "{@b 1/day}",
            "★",
            "—"
          ],
          [
            "12",
            "Grooming / look the part",
            "Burney the Barber",
            "0.2",
            "40",
            "12"
          ],
          [
            "13",
            "Alter appearance (new face)",
            "Burney the Barber",
            "2",
            "400",
            "14"
          ],
          [
            "14",
            "Healing tonic (2d4+2)",
            "Burney the Barber",
            "0.25",
            "50",
            "12"
          ],
          [
            "15",
            "{@i Greater restoration}",
            "Burney the Barber",
            "2",
            "400",
            "15"
          ],
          [
            "16",
            "Standard loan (read the fine print!)",
            "From Here to Avernus",
            "up to 20",
            "—",
            "18"
          ],
          [
            "17",
            "Seal a bounty instrument",
            "From Here to Avernus",
            "0.5",
            "—",
            "—"
          ],
          [
            "18",
            "Appraise a soul-good / item",
            "From Here to Avernus",
            "0.1",
            "20",
            "16"
          ],
          [
            "19",
            "Raw ichor vial (gamble; roll d10)",
            "Ichor's Aweigh!",
            "1",
            "200",
            "13"
          ],
          [
            "20",
            "Refined ichor (known boon)",
            "Ichor's Aweigh!",
            "3",
            "600",
            "15"
          ],
          [
            "21",
            "Buy a larva",
            "Z'neth's Larva Farm",
            "0.5",
            "100",
            "15"
          ],
          [
            "22",
            "Sell Red Ruth's soul-stock ★",
            "Z'neth's Larva Farm",
            "~3–5+",
            "★",
            "17"
          ],
          [
            "23",
            "Real answer / lead",
            "Bone Devil Informant",
            "DC 16 Persuasion (SC = adv.)",
            "—",
            "—"
          ]
        ]
      },
      {
        "t": "note",
        "title": "Note",
        "text": "{@b Reminder for the DM:} every SC that changes hands is a trapped soul; every SC burned as {@i fuel} (line 11) is a soul {@i annihilated.} Price the coins; play the cost."
      }
    ]
  },
  "emporium-events": {
    "title": "Emporium: Running the Floor",
    "blocks": [
      {
        "t": "p",
        "text": "{@side emporium-shops|← All shops}"
      },
      {
        "t": "h",
        "text": "Running the floor"
      },
      {
        "t": "p",
        "text": "The Emporium is not a dungeon and it is not a shop with a counter — it's a {@i room full of charming predators} the party has to move through with their goals in their pockets and their tempers on a leash. Run it as {@b open shopping with a pulse}: the party wanders, the DM cuts to whatever stall or face is nearest to their intent, and every few beats you drop a floor event (below) to remind them the room is alive and watching. Keep the camera loose. Let players split up to work different stalls; the floor rewards a party that divides and gossips."
      },
      {
        "t": "p",
        "text": "{@b Pacing the open floor.} Don't roll for every step. Roll (or pick) an encounter/event when: the party lingers, the party {@i asks around}, someone flashes coin or a soul-good, or a scene needs a spark. Two to four floor events across a market visit is plenty — this is texture between the set-piece scenes (Mahadi, Or'Henn, the bounties), not a slog of random tables. When in doubt, pull an {@b Opportunity} to reward initiative and a {@b Complication} to raise the stakes, and let the rest breathe."
      },
      {
        "t": "h",
        "text": "Timekeeping — the caravan's clock (book + homebrew)"
      },
      {
        "t": "p",
        "text": "{@b (book)} The Wandering Emporium is {@i temporary and mobile.} It stops where the paying is good, unfolds off its war machines, does business, then packs itself back onto its wheels {@b in about an hour} and rolls on to the next patch of Hell. It is never a fixed location; it is a window that closes."
      },
      {
        "t": "p",
        "text": "{@b [HOMEBREW — the visit clock.} Give the party a runway so the market has pressure without a stopwatch. Default: {@b the Emporium is parked at the Last Hill for roughly 24–36 hours} (one long-rest-plus-a-morning of business). Announce it in-character through the greeter or Mahadi — {@i \"We move at the next tide of ash. You have until then.\"}"
      },
      {
        "t": "p",
        "text": "{@b Departure triggers (it leaves when any one fires):}"
      },
      {
        "t": "table",
        "head": [
          "Trigger",
          "What it means at the table"
        ],
        "rows": [
          [
            "{@b The clock runs out} (24–36 hrs of business)",
            "Default. The tents fold; the party gets a \"last call\" warning ~1 hour out."
          ],
          [
            "{@b The floor stops paying}",
            "If the crowd thins and no big deals are moving, Mahadi calls it early — the party's window shrinks."
          ],
          [
            "{@b A bigger power summons it}",
            "🎲 DIAL: Asmodeus, an archdevil, or a warlord with real coin can pull the caravan away {@i now.} Good for cutting a session that's dragging."
          ],
          [
            "{@b The peace is broken badly}",
            "A truce-break severe enough that Mahadi wants the offenders {@i gone} can end the party's visit on the spot (expulsion)."
          ]
        ]
      },
      {
        "t": "p",
        "text": "{@b Lingering costs — what it costs to overstay or push the window:}"
      },
      {
        "t": "list",
        "items": [
          "{@b Hospitality compounds.} (book) Every extra \"on the house\" course, soak, or shave taken while lingering {@b deepens the debt to Mahadi} (see hospitality-debt engine in the primer). Time spent basking is time spent owing.",
          "{@b The room learns you.} The longer the party stays, the more the {@i rival buyers, brokers, and old faces} clock what they're carrying (Ruth's leftovers, the capacitor, soul-stock). Attention is a lingering cost. Overstay and the Red Ruth bidding war heats up whether they wanted it to or not.",
          "{@b Miss the window, chase the caravan.} If the party dawdles and the Emporium departs before they finish (repairs, recruiting Or'Henn, sealing a bounty), the unfinished business becomes a {@i travel problem} — they must catch the caravan on the road (a Wasteland encounter, d20 result 13) or wait for its next stop, burning days off Asimov's one-week clock. {@b The visit clock and the Soul Council clock are meant to squeeze each other.}"
        ]
      },
      {
        "t": "h",
        "text": "How the wards and truce feel to move through (book + homebrew)"
      },
      {
        "t": "p",
        "text": "{@b (book)} Violence is forbidden; Mahadi and Asmodeus's backing enforce it. Make the {@i peace itself} a sensory thing so players feel the wrongness of a Hell where no one is fighting:"
      },
      {
        "t": "list",
        "items": [
          "{@b The hum.} Under the market noise there's a low, warm, tuning-fork hum — the supernatural wards. It's the same note as a soul coin, magnified. Players with a passive ear (or a {@b DC 12 Perception}) notice it never stops.",
          "{@b The weight on a raised hand.} (homebrew) When a PC {@i reaches for a weapon or begins a hostile spell}, describe the ward pressing back: the air thickens, the hum sharpens to a whine, the nearest devils go still and {@i interested.} No mechanic fires yet — it's a felt warning. A {@b DC 15 Insight} confirms: everyone here will side with the house, instantly, against a peace-breaker. The truce is not politeness. It's physics with teeth.",
          "{@b Feuds check at the door.} The greeter's \"any {@i quarrels} today?\" is a real ritual. Grudges don't vanish — they're {@i held}, pressurized, waiting for the road. Play the room as full of people who would very much like to kill each other and cannot, which is exactly why the smiles are so wide."
        ]
      },
      {
        "t": "h",
        "text": "Who's here right now — clientele table"
      },
      {
        "t": "p",
        "text": "Roll {@b d20} or pick to populate the floor — colorful patrons to bump into, each with a one-line hook. Most are truce-safe texture; several are seeded to the live campaign threads. Reuse freely; a good face can recur."
      },
      {
        "t": "table",
        "head": [
          "d20",
          "Who they are",
          "Hook"
        ],
        "rows": [
          [
            "1",
            "{@b A warlord's retinue} — merregons in matched harness, flanking a masked captain buying war-machine parts",
            "The captain served the front the party {@i broke} at the Last Hill and does not yet know their faces. Recognition is one bad word away."
          ],
          [
            "2",
            "{@b A soul-coin gambler} — a well-dressed cambion running a shell game with three warm iron coins",
            "Wins draw a crowd; losses draw worse. Offers to \"stake\" a PC — a debt dressed as a favor."
          ],
          [
            "3",
            "{@b A hungry broker} — a thin imp in an oversized waistcoat, sniffing for who's carrying soul-stock",
            "Makes the party as sellers of Ruth's leftovers within a minute of eye contact. Runs to a bigger buyer if brushed off."
          ],
          [
            "4",
            "{@b A Hellrider deserter} — cloak up, medals filed blank, drinking alone",
            "Recognizes Drenwal's bearing. Could be a lead on the order, a Bhaal-cult informer, or just a haunted man. {@b DC 14 Insight} to read which."
          ],
          [
            "5",
            "{@b A mortal in over their head} — a Baldur's Gate merchant who signed {@i something} and can't leave",
            "Begs the party to read his contract. It's real, it's binding, and Fhet'Ahla holds the seal. A mirror of the traps the party is about to sign."
          ],
          [
            "6",
            "{@b A rival buyer for Ruth's leftovers} — a veiled night hag's agent, unhurried, patient",
            "Openly outbids Mahadi for the heartstone / soul-stock. Turns the Red Ruth gambit into a {@i bidding war} the party can play both sides of."
          ],
          [
            "7",
            "{@b An old face from a past session} — a vendor or patron the party dealt with on their {@i first} Emporium visit",
            "\"You again. You still owe me a—\" 🎲 DIAL: a small debt, a warm greeting, or a grudge held quiet by the truce."
          ],
          [
            "8",
            "{@b A yugoloth mercenary} — an arcanaloth in a scholar's robe, reading contracts for a fee",
            "Will appraise any infernal fine print the party shows him — accurately — for a price. A rival channel to Asimov's rules-lawyering."
          ],
          [
            "9",
            "{@b A soul-coin debtor} — a chained shade working off a warlord's loan, polishing a war machine",
            "Whispers what he's overheard while invisible-to-notice. Cheap, frightened, surprisingly well-informed."
          ],
          [
            "10",
            "{@b A wasteland raider band} — Rust Queen scavengers haggling scrap, twitchy under the truce",
            "They {@i hate} being unable to rob the room. Easily baited; a PC who leans on them risks a truce-break that ends {@i the raiders'}, not the party's, visit — if the party doesn't swing first."
          ],
          [
            "11",
            "{@b A Mephistophelian agent} — a cold-eyed cambion in blue-black livery, asking careful questions",
            "(See set-piece below.) Mephistopheles's asset Dumal {@i slipped free} on the mountaintop and is loose in Avernus; the Archduke is {@i counting who last saw him.} This one is counting the party."
          ],
          [
            "12",
            "{@b A larva drover} — one of Z'neth's hands, herding a squirming crate to the pens",
            "Will pay coin for \"a soul in good condition.\" Eyes the capacitor. A wince, a temptation, and a threat all at once."
          ],
          [
            "13",
            "{@b A retired oracle's servant} — a mute homunculus wearing Red Ruth's household sigil, lost since her death",
            "Recognizes what the party carries. Follows them silently. Mahadi will pay to know who it's following."
          ],
          [
            "14",
            "{@b A devil noble on holiday} — an amnizu of station being carried on a palanquin, bored and acquisitive",
            "Might commission the party for a \"small errand\" on the road — a sixth bounty in all but name, if you want one."
          ],
          [
            "15",
            "{@b A Fort Knucklebone runner} — a redcap or kenku who knows {@b Mad Maggie}",
            "Carries gossip both ways. If the party's close to Maggie, delivers a barbed message about where they're headed and who runs this caravan."
          ],
          [
            "16",
            "{@b A Last-Hill survivor} — a maw demon or hobgoblin who {@i fled} the battle the party won",
            "(See set-piece below.) Wants to provoke a swing it can survive — because the {@i party} breaking the truce is its revenge."
          ],
          [
            "17",
            "{@b A soul-council clerk} — a spindly bone-white devil auditing the capacitor's paperwork from a distance",
            "Confirms Asimov's one-week clock is real and {@i watched.} Unnerving; makes the deadline feel administrated, not abstract."
          ],
          [
            "18",
            "{@b A too-generous stranger} — a beautiful, backwards-handed thing offering a soul coin \"as a gift\"",
            "(See set-piece below.) Nothing here is free. The gift is the hook."
          ],
          [
            "19",
            "{@b A Smiler the Defiler agent} — a masked scout leaving a folded note on a bench, then gone",
            "Smiler is {@i owed a banishment} by the party (thread). The note names a place, a price, and a grudge. He works by proxy; he'd never come in person."
          ],
          [
            "20",
            "{@b A grieving buyer at Burney's chair} — someone paying to have a face erased, weeping quietly",
            "Pure atmosphere and a small mercy. If a PC is kind, Burney (DM-only copper dragon) {@i notices} — bank it, don't spend it."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Emporium encounters & events"
      },
      {
        "t": "p",
        "text": "Because violence is forbidden, the drama here is {@b temptation, debt, gossip, and the risk of {@i almost} breaking the truce.} Run these two themed {@b d12s} — pull a {@b Complication} to raise stakes, an {@b Opportunity} to reward working the room. Each is truce-safe; the few that flirt with blows note that they resolve via {@b Mahadi's enforcement, not a fair fight} (full ladder in the primer's TRUCE appendix). Several are seeded to the live threads — mine them."
      },
      {
        "t": "h",
        "text": "Complications (d12)"
      },
      {
        "t": "table",
        "head": [
          "d12",
          "The beat",
          "How it can resolve / DCs"
        ],
        "rows": [
          [
            "1",
            "{@b A debt is called.} A creditor (Mahadi's clerk, or a past-session lender) presents an old obligation as due {@i now.}",
            "Pay in coin, favor, or a marked obligation; or {@b DC 16 Persuasion} to renegotiate terms. Refusing outright escalates to Fhet'Ahla's desk. (Set-piece 1.)"
          ],
          [
            "2",
            "{@b You're recognized.} A Last-Hill survivor (clientele 16) locks eyes and starts loudly narrating what the party did to their warband.",
            "Social only — the {@i goal} is to make a PC swing first. {@b DC 14 Wis save} to keep cool, or roleplay the restraint. If a PC strikes, Mahadi's enforcement lands on {@i them.} (Set-piece 3.)"
          ],
          [
            "3",
            "{@b The bidding war opens.} A rival buyer (clientele 6) publicly outbids Mahadi for Ruth's leftovers, forcing the party to choose a side.",
            "Play both against each other ({@b DC 15 Deception/Persuasion} to drive the price), pick a buyer, or refuse to sell and make {@i two} patient enemies."
          ],
          [
            "4",
            "{@b Mephistopheles is counting.} A cold agent (clientele 11) asks the party polite, precise questions about the Last Hill and where Dumal went.",
            "{@b DC 16 Insight} to clock the livery and the danger; {@b DC 15 Deception} to deflect. Every honest answer deepens Mephistopheles's ledger against them. (Set-piece 2.)"
          ],
          [
            "5",
            "{@b The free gift.} A backwards-handed stranger (clientele 18) presses a soul coin into a PC's hand \"as a kindness.\"",
            "Accepting opens a hospitality-style debt to Mahadi's network. {@b DC 18 Insight} to feel the hook. Refusing gracefully costs nothing; refusing {@i rudely} costs face."
          ],
          [
            "6",
            "{@b A soul the Cleric knows.} In Z'neth's larva pens or a gambler's coin, a soul the party {@i recognizes} surfaces.",
            "No combat solves it. Buy it (soul coins / a favor), leave it, or make a scene — a scene near the pens tempts a truce-break that only ends {@i badly.}"
          ],
          [
            "7",
            "{@b The overdue tab.} Mahadi's staff gently notes the party's hospitality debt from {@i this} and prior visits has compounded.",
            "Settle now (favor / soul-stock / a lead), or let it ride and let Mahadi's Red Ruth ask arrive with more leverage. Track it."
          ],
          [
            "8",
            "{@b Smiler's note.} A masked agent (clientele 19) leaves a folded provocation naming the banishment the party owes Smiler.",
            "Pure thread-planting. No roll needed to read it; {@b DC 15 Investigation} to spot the agent before they vanish and get one question."
          ],
          [
            "9",
            "{@b A raider tests the truce.} Rust Queen scavengers (clientele 10) crowd a PC, \"accidentally\" jostling for a reaction.",
            "The wards hum; the room watches. If the {@i raiders} escalate first, enforcement takes {@i them} — a lesson the party can just {@i watch} if they hold."
          ],
          [
            "10",
            "{@b The clock ticks louder.} A soul-council clerk (clientele 17) reminds the party, coolly, how many days Asimov has left.",
            "No roll — a pacing beat. Use it when the party is dawdling to make the departure clock and the soul clock bite together."
          ],
          [
            "11",
            "{@b A contract clerk mishears.} A stall tries to bind the party to terms they didn't agree to, buried in fast talk.",
            "{@b DC 15 Investigation} or {@b ask Asimov} to catch it (mirrors the bounty-trap mechanic); catch it and the clerk retreats, all smiles. Miss it and owe something small but real."
          ],
          [
            "12",
            "{@b An old face, a quiet grudge.} A past-session patron (clientele 7) the party wronged is {@i right there}, unable to act — and enjoying making them sweat.",
            "Roleplay. {@b DC 14 Insight} to gauge how much they know / hold over the party for the road ahead."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Opportunities (d12)"
      },
      {
        "t": "table",
        "head": [
          "d12",
          "The beat",
          "How it can resolve / DCs"
        ],
        "rows": [
          [
            "1",
            "{@b A lead falls out of a conversation.} Someone drops the exact rumor the party needs (tie to the d8 rumor table in the primer).",
            "{@b DC 13 Insight} to tell true from bent. Working the room {@i should} pay in real leads — reward it."
          ],
          [
            "2",
            "{@b The pointer to Or'Henn.} The Bone Devil Informant (or a floor whisper) mentions the dispossessed keeper at the edge of the light.",
            "{@b DC 16 Persuasion} (soul coin = advantage) for the full steer to Or'Henn. The connective tissue into recruitment."
          ],
          [
            "3",
            "{@b A rival buyer overpays.} The night hag's agent (clientele 6) offers {@i genuinely} good value for a soul-good — better than Mahadi.",
            "Real gold-in-Hell decision: take the better deal and slight Mahadi, or bank the rakshasa's goodwill. Both have a bill."
          ],
          [
            "4",
            "{@b A favor bank opens.} A grateful mortal (clientele 5) or debtor (clientele 9) offers information in exchange for a small kindness.",
            "No DC — the {@i reward for being decent} in a place that punishes it. Pays off later as a road-contact."
          ],
          [
            "5",
            "{@b A too-good soul-coin deal.} A gambler or broker floats a trade that's {@i almost} too favorable — a fistful of coin for something small.",
            "(Set-piece 4.) {@b DC 17 Insight} to find the catch; {@b ask Asimov} to read it cold. The catch is always there."
          ],
          [
            "6",
            "{@b Repair leverage.} Rassh will knock the Lady Vengeance's price down in exchange for a floor favor (settle a scrap dispute, certify some iron).",
            "{@b DC 14 Persuasion} to open the trade. Ties honest work on the floor to a concrete need."
          ],
          [
            "7",
            "{@b Free intel from the wards.} A PC attuned to the hum (clientele/ward flavor) overhears two devils {@i forced} to talk civilly, letting slip a secret.",
            "{@b DC 15 Perception} to catch the thread of it. The truce makes eavesdropping unusually rich — no one dares whisper."
          ],
          [
            "8",
            "{@b Burney's quiet kindness.} At the barber's chair, a PC is offered a discreet mend, a restored scar, or a face — no obvious price.",
            "The one genuinely good deal on the floor (DM-only: copper dragon). Small healing / disguise for a {@i kindness}, not a debt."
          ],
          [
            "9",
            "{@b A bounty issuer appears in person.} One of the five issuers (Serephine, Vhalzareth, et al.) is on the floor, warmer than their paper.",
            "A chance to size up an issuer before signing. {@b DC 15 Insight} to smell that the terms are too smooth. Feeds Act 5."
          ],
          [
            "10",
            "{@b A discount for the Heroes of the Last Hill.} A vendor, impressed (or currying favor), offers the party a real deal on their reputation alone.",
            "Reputation as currency. 🎲 DIAL: genuine goodwill, or bait to get them talking about the front — which Mephistopheles's agent is listening for."
          ],
          [
            "11",
            "{@b A road-contact for later.} A traveler (a devil noble, clientele 14; a Maggie runner, clientele 15) offers to be a future fixer.",
            "Bank a name. Pays off as a lead, a safe-ish stop, or a warning on a later leg."
          ],
          [
            "12",
            "{@b Asimov reads the room.} From the capacitor, Asimov flags a {@i specific} patron worth talking to — a lead only a dead bounty hunter would know.",
            "Free steer from the party's own dead man. Use to point them at whichever thread you want moving next."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Set-piece social encounters"
      },
      {
        "t": "p",
        "text": "Three fully written scenes. Run any as a spotlight; all resolve socially, and any flirtation with violence resolves via Mahadi's enforcement, not a fight the party can win."
      },
      {
        "t": "h",
        "text": "Set-piece 1 — The creditor calls the debt (homebrew)"
      },
      {
        "t": "p",
        "text": "{@b Who:} {@b Malfius Nine-Reeds}, Fhet'Ahla's clerk (or Mahadi's smiling steward, if you'd rather keep the notary clean for Act 5), approaches between courses with a slim folio."
      },
      {
        "t": "note",
        "title": "Note",
        "text": "*\"A trifle. Truly. But my ledger is a jealous thing, and it says the House extended you a {@i courtesy} — a rest, a repair, a first course 'on the house' — and courtesies, like coins, are meant to circulate. I've come to help it circulate. Nothing so vulgar as a demand. Merely... a reminder that a balance exists, and that balances prefer to be settled while the settling is {@i cordial.}\"*"
      },
      {
        "t": "p",
        "text": "{@b The beat:} The debt is real but not yet urgent — it's a {@i lever}, not a chokehold. The clerk wants the party to feel the weight of what \"free\" cost them, and to nudge them toward paying in the coin Mahadi actually wants: a lead on Red Ruth's leftovers."
      },
      {
        "t": "p",
        "text": "{@b How it resolves:}"
      },
      {
        "t": "list",
        "items": [
          "{@b Pay it plainly} — a soul coin, a favor, a marked obligation. Clean, and the clerk beams.",
          "{@b Renegotiate} — {@b DC 16 Persuasion} to convert the debt into a {@i service on the road} (a bounty, a delivery) rather than immediate payment. Success buys time; the debt follows them.",
          "{@b Deflect toward Ruth} — offer {@i information} about Red Ruth's death or effects in lieu of payment. The clerk's pen goes still; suddenly the debt is very forgivable. (This is the gambit closing its jaws softly.)",
          "{@b Refuse cold} — the debt escalates to Fhet'Ahla's desk and becomes a {@i written} instrument next visit. Never lethal — it's a rakshasa's patience, not a brawl. But the tab now has teeth."
        ]
      },
      {
        "t": "p",
        "text": "{@b Do not} let the debt be waved away for free. The peace, and the hospitality, only mean something if they cost."
      },
      {
        "t": "h",
        "text": "Set-piece 2 — The Mephistophelian agent, sniffing around (homebrew — ties to the Mephistopheles thread)"
      },
      {
        "t": "p",
        "text": "{@b Who:} A cambion in blue-black livery, cold and courteous, who has been {@i watching} the party since they arrived. He introduces himself as an \"actuary\" and asks to buy them a drink."
      },
      {
        "t": "note",
        "title": "Note",
        "text": "*\"You were at the Last Hill. No — don't be modest, it's not becoming in heroes. My lord takes an interest in what happened on that mountaintop. A certain... {@i asset} of his walked off that mountaintop when he ought to have burned on it. Dumal, I believe he was called. My lord does not misplace an investment — he {@i recovers} it, and he is ever so curious where a wounded flame crawls off to.\"* A thin smile. {@i \"I'm simply confirming names for the file. Yours, for instance. It's such a small thing, a name.\"}"
      },
      {
        "t": "p",
        "text": "{@b The beat:} Mephistopheles has a {@b fresh interest} in Dumal's escape (thread) — his asset is loose and wounded — and this agent is here to confirm the party's identities and learn what they know of where Dumal fled. Nothing binds; nothing threatens outright — the truce forbids it. The menace is entirely in the {@i filing.}"
      },
      {
        "t": "p",
        "text": "{@b How it resolves:}"
      },
      {
        "t": "list",
        "items": [
          "{@b DC 16 Insight} — read the livery and the danger: this is the eighth Hell's cold, and the party is being {@i catalogued} for later.",
          "{@b DC 15 Deception} — deflect, downplay their role, or feed him a bent name. Success buys distance; failure means Mephistopheles's ledger gets a clean entry.",
          "{@b Refuse to talk} — perfectly safe (truce), but the {@i refusal itself} is data: guilty men go quiet. The agent bows and files that, too.",
          "{@b Threaten him} — the wards hum, the room stills. He {@i wants} this; a truce-break by the party is a gift to his lord. Enforcement would land on the {@i PC}, not the agent. Play the temptation; make the restraint the player's."
        ]
      },
      {
        "t": "p",
        "text": "{@b Leaves behind:} the sense that a very cold, very patient archdevil now knows their names — a thread to pull across the arc."
      },
      {
        "t": "h",
        "text": "Set-piece 3 — The truce-baiting provocation (homebrew — ties to Last-Hill survivors)"
      },
      {
        "t": "p",
        "text": "{@b Who:} A {@b maw demon or hobgoblin survivor} of the warband the party broke at the Last Hill (clientele 16), who spots them across the floor and starts talking — loudly, for an audience."
      },
      {
        "t": "note",
        "title": "Note",
        "text": "{@i \"There they are! The 'Heroes of the Last Hill.'\"} Spit on the word. *\"You want to know what a hero smells like? Ash and cowardice. My brothers are meat on that ridge because of you. Come on, then. Come {@i finish it.} You've got the steel on your hip. I can see you want to. Right here. Right now. In front of everyone.\"*"
      },
      {
        "t": "p",
        "text": "{@b The beat:} This is the pressure the whole session is built on. The survivor {@i cannot} attack — the truce binds it too — so its revenge is to make {@b a PC swing first.} If a party member breaks the peace, the survivor gets to watch Mahadi's enforcement fall on the {@i hero}, and dies (or doesn't) satisfied. The bait is the point."
      },
      {
        "t": "p",
        "text": "{@b How it resolves:}"
      },
      {
        "t": "list",
        "items": [
          "{@b Hold the line} — {@b DC 14 Wisdom save} for a PC riding the battle-high, or simply roleplay the restraint. The wards press; the room leans in; a held temper is a {@i win} here.",
          "{@b Answer with words} — insults, cold dismissal, even intimidation are all {@i free} (a first verbal offense earns only Mahadi's warm smile). Let players vent verbally; the peace survives words.",
          "{@b Draw a weapon / ready a spell} — the market goes silent, enforcers drift close, {@b last warning.} The player still has one beat to stand down.",
          "{@b Strike} — the truce breaks {@i on the party.} Reach for {@b expulsion first} (Red Ruth deal poisoned, bounties revoked, Or'Henn recruitment jeopardized, the session's goals gone) — never a free fight, never a fair one. Lethal enforcement only if the table wants that wall (TRUCE appendix). The survivor's revenge is complete either way."
        ]
      },
      {
        "t": "p",
        "text": "{@b DM note:} Play the survivor as {@i pathetic and provoking}, not threatening. The horror is that the party could ruin everything by being {@i right} about wanting to kill it."
      },
      {
        "t": "h",
        "text": "Set-piece 4 — The too-good soul-coin deal (homebrew)"
      },
      {
        "t": "p",
        "text": "{@b Who:} A gambler-broker (clientele 2) or a hungry broker (clientele 3) sidles up with an offer that's {@i almost} insulting in its generosity."
      },
      {
        "t": "note",
        "title": "Note",
        "text": "*\"You look like people with an eye for value. So: three warm coins — three, feel the heat on them, real as your heartbeat — for that little trinket you're carrying. The heartstone, the soul-flake, the odd bit of Ruth's stock, whatever's lightest in your pack. Three coins for a bauble. Where's the harm? I'm overpaying and we both know it. That's how much I {@i like} you.\"*"
      },
      {
        "t": "p",
        "text": "{@b The beat:} The deal is genuinely favorable — which is exactly the problem. Either the broker is a front for a rival buyer (or Mahadi himself, testing what the party will part with), the \"coins\" carry a rider, or the \"bauble\" is worth vastly more than the party realizes and the broker knows it."
      },
      {
        "t": "p",
        "text": "{@b How it resolves:}"
      },
      {
        "t": "list",
        "items": [
          "{@b DC 17 Insight} — the price is {@i too} good; someone up the chain wants this badly, and the party is being underpaid for something pivotal (Ruth's leftovers, soul-stock).",
          "{@b Ask Asimov} — from the capacitor, he reads any rider on the coins or the true worth of the good, cold and clear (his rules-lawyer role).",
          "{@b DC 15 Investigation} on the coins — reveals a hidden clause: a mark, a summons, a debt that rides the coin to whoever spends it.",
          "{@b Take the deal blind} — that's the game. Let them. The consequence surfaces later, and Asimov gets to say {@i \"you should have asked.\"}"
        ]
      },
      {
        "t": "p",
        "text": "{@b DM note:} Never let a too-good deal be {@i clean.} The lesson of this floor is that generosity is the most expensive thing in Hell."
      },
      {
        "t": "h",
        "text": "NPC statline quick-reference"
      },
      {
        "t": "p",
        "text": "Pointers only — pull full statblocks from your reference of choice ({@b Monster Manual} / 5e.tools) if numbers are ever needed. Most floor interactions need {@i voice}, not initiative; these matter chiefly as color and, in the worst case, as the truce-enforcement wall."
      },
      {
        "t": "h",
        "text": "Shop owners & host"
      },
      {
        "t": "table",
        "head": [
          "NPC",
          "Statline base",
          "CR",
          "Key traits to remember"
        ],
        "rows": [
          [
            "{@b Mahadi} (Infernal Rapture)",
            "{@b Rakshasa}",
            "{@b CR 13}",
            "{@b Magic Resistance} (advantage on saves vs spells); {@b Limited Magic Immunity} (ignores spells 6th level and lower unless he allows them); illusion + Innate Spellcasting; reads thoughts. Runs the floor and the truce. Gracious host — never cackle."
          ],
          [
            "{@b Fhet'Ahla} (From Here to Avernus)",
            "{@b Amnizu}",
            "(per Monster Manual / {@i Descent into Avernus})",
            "Squat, corpulent devil; the infernal banker and, (campaign), the charter's contract-notary. Meticulous, unhurried. Fulcrum of the bounty-sealing. Not a fighter unless the whole floor is."
          ],
          [
            "{@b Rassh} (The Firesnake Forge)",
            "{@b Salamander}",
            "{@b CR 5}",
            "Fire-snake staff; Heated Body; forge-hot. Fixes and {@b refuels} the Lady Vengeance. The honest transaction on the floor — burns hot, talks little, delivers."
          ],
          [
            "{@b Elliach} (Ichor's Aweigh!)",
            "{@b Mage} (human)",
            "(NPC, ~CR 6)",
            "Spellcaster statline; buys/sells mutagenic demon ichor. Color and temptation, not a combatant."
          ],
          [
            "{@b Z'neth} (Z'neth's Larva Farm)",
            "{@b Hobgoblin warlord} (use hobgoblin captain/warlord)",
            "~CR 1–3",
            "Buys/sells larvae; appraises soul-goods. The moral wince of the market; a natural buyer if the Red Ruth gambit becomes a bidding war."
          ],
          [
            "{@b Burney the Barber}",
            "{@i \"Human woman\"} — {@b secretly an adult copper dragon} (Bahamut agent)",
            "{@b CR 14} (true form)",
            "{@b DM-ONLY.} Near-impossible for fiends to detect; may discreetly aid good visitors. On the floor she's just a kind barber with quiet healing. Bank the secret; don't spend it."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Likely floor NPCs & the enforcement contingency"
      },
      {
        "t": "table",
        "head": [
          "Role",
          "Statline",
          "CR",
          "Use"
        ],
        "rows": [
          [
            "{@b Info-broker}",
            "{@b Bone devil}",
            "{@b CR 9}",
            "The Bone Devil Informant; a Mephistophelian lieutenant; a bounty-hunter captain. Sting + poison. Rumors and leads on the floor; muscle only if the peace breaks."
          ],
          [
            "{@b Minor agents / messengers}",
            "{@b Imp}",
            "{@b CR 1}",
            "Greeters, Mahadi's stewards, brokers' runners, Smiler's proxies. Waistcoated and courteous. Shapechange, invisibility — good for eavesdroppers and go-betweens."
          ],
          [
            "{@b Cambion agents}",
            "{@b Cambion}",
            "CR 5",
            "Mephistophelian actuary, soul-coin gambler, a warlord's captain. Charming, dangerous, bound by the truce."
          ],
          [
            "{@b Assorted enforcement devils}",
            "{@b Merregon, barbed devil, bone devil, imp, \"assorted devils\"}",
            "4 / 5 / 9 / 1",
            "The truce-enforcement wall. If a PC breaks the peace, the {@i whole room} turns — treat as a table of assorted devils who all suddenly agree the intruder is the problem. {@b This is a punishment, not a balanced fight.} Reach for expulsion first (see the primer's TRUCE appendix); go lethal only as a deliberate wall. Pull statblocks from Monster Manual / 5e.tools if it truly comes to blows."
          ]
        ]
      },
      {
        "t": "note",
        "title": "Note",
        "text": "Full temperament, info-pricing, and the DC 18 Insight on Mahadi's Asmodeus-fear live in npc-reference. The truce-break adjudication ladder and enforcement guidance live in the primer's TRUCE appendix. Don't re-stat — run them."
      },
      {
        "t": "h",
        "text": "DM tips for the Emporium"
      },
      {
        "t": "p",
        "text": "A punch-list for keeping the floor sharp:"
      },
      {
        "t": "list",
        "items": [
          "{@b Keep Mahadi gracious, never cackling.} The warmth is 100% sincere on the surface; the menace is entirely in what the warmth {@i costs.} A rakshasa who twirls a mustache is a wasted rakshasa. The bill is the villainy.",
          "{@b Make debts feel real.} \"On the house\" is never free — track every courtesy taken, and let it compound across visits. When a debt is called (Set-piece 1), it should have {@i weight}, not be waved off. A debt the party forgets is a debt you're not running.",
          "{@b Never let a truce-break be free.} The peace only means something if breaking it {@i costs.} Reach for expulsion first — poison the deals, revoke the bounties, cost them the session's goals — before you ever reach for a statblock. Lethal enforcement is a wall, not a boss fight, and only if the table wants it.",
          "{@b The temptation IS the drama.} Most encounters here are social because the pressure is {@i restraint.} The Last-Hill survivor (Set-piece 3) exists to make a hero {@i want} to swing. Put the choice on the {@i player}, then honor whichever way they go.",
          "{@b Reward working the room with real leads.} A party that gossips, spends soul coins on brokers, and asks around should get {@i true, usable} information (the Or'Henn pointer, the rumor table, road-contacts). Don't make initiative feel like flavor — make it pay.",
          "{@b Weave the live threads in, don't dump them.} Mephistopheles counting the party, Mahadi wanting Ruth's leftovers, Smiler's owed banishment, the soul-council clock — plant one per scene as {@i texture.} Let them breathe; collect on them across the arc.",
          "{@b Let the two clocks squeeze.} The caravan's departure window and Asimov's one-week soul clock are meant to press on each other. If the party dawdles, tick both louder (Complication 10, clientele 17).",
          "{@b Kindness is the rarest currency.} Burney is the one genuinely good soul on the floor. If a PC is decent in a place that punishes decency, {@i notice} it — quietly. It's a small warm mystery to bank, not spend.",
          "{@b Split the party on purpose.} The floor is one of the few safe places to let PCs wander off alone and work different stalls. Cut between them; let gossip from one table land at another. A divided party on this floor is a {@i feature.}"
        ]
      }
    ]
  }
});
