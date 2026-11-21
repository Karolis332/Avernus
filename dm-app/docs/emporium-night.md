# The Emporium night: how to run it

Two windows from one file: **your page** (`dm-app/emporium.html`, on the laptop screen) and the **player screen**
(the same page with `?view=players`, on the table monitor). They follow each other. The music changes with the place.

## Once per computer

| Step | What to do |
|---|---|
| 1 | Get the latest files: `git pull` in the `DnD` folder (or GitHub Desktop, Fetch, Pull). |
| 2 | Install **Node.js** (the LTS, nodejs.org), **Firefox** and the **Spotify** desktop app, logged in to your Premium account. |
| 3 | Double-click **`dm-app/start-emporium.cmd`**. |
| 4 | On your page the music line says **"Set up the music (once on this computer)"**. Click it, paste the Client ID of your Spotify app (developer.spotify.com, Dashboard, the app, Settings, Client ID), press Save, then **Agree** on Spotify's page. It says "Spotify is connected". |
| 5 | Press **Ctrl+F5** once on your page: the browser may still hold old copies of the code. |

Everything the Emporium shows (map, shop paintings, item art) is in git: nothing to copy by hand.
The Client ID and the login stay in `~/.spotify-dm/` on that computer, never in the repo.

## Before the players sit down (5 minutes)

1. Double-click **`dm-app/start-emporium.cmd`**. Three things open:
   - a minimized window **"DM music helper - leave open"**: leave it open all night;
   - Spotify (set its volume low);
   - Firefox with your page.
2. The music line on your page reads **"♪ Quiet music is on."** If it shows a link, click it (see step 4 above).
3. Under the ledger, press **New night** if anything from a test is still there (it clears the ledger, the reveals,
   the opened letters and the secrets; the purses stay).
4. Type **the party's purse (SC)** and **the party's gold (gp)** under the ledger.
5. Press **📺 Player screen**. Drag the new window to the table monitor, click once inside it (that turns the sound on),
   press **F11**.

## During the night

| The table does | You press |
|---|---|
| Picks a place | Its pin, on either screen: both windows go there and its playlist starts. Untick **Monitor follows my clicks** to look at a stall privately. |
| Talks to the keeper | **Talk** tab: how to play them (voice, look, senses, what they want, their tell), lines in their voice, riddles, secrets. The top box has the tips on making it feel real. |
| Gets a riddle | Read it from the box, or press **Show riddle** to put it on the monitor. **Won**: press **Reveal**, the hidden item appears on the shelf with a glow. **Missed**: read the miss line. |
| Earns a secret about Avernus | **Show** under the secret: a "Secret uncovered" card comes up on the monitor. **Put away** when read. Only the hint shows; the truth stays folded on your side. |
| Wants to see an item | They click its card on the monitor, or you press **Buy** on its row: it comes up large with its art and rules. |
| Buys | **Buy** on the row, set the buyer, the haggle roll and coins or gold, then **Add to ledger**: SOLD stamp, coin sound, the purse counts down. |
| Wants to sell something | **Selling: what the floor pays** at the bottom of your page. Empty, it lists everything the stalls buy. Type a word to see who wants it; pick an item from the suggestions (or set a rarity) for the bank's, Burney's and Rassh's standing offers in SC and gp. A haggle roll total moves the offers. Add the coins to the purse yourself. |
| Hits a mysterious item | **Identify** names it on the monitor; **Veil again** hides the name. |
| Buys an Informant letter | It opens on the monitor by itself. **Open the seal** opens one without a sale. |
| Wants the whole painting | **Fold / unfold the shelves**. |
| Plays a game | **Games** tab (Soul Pit, the Rapture, the Forge, the Ichor): rules, rolls, payouts. |
| Fights at the Devil's Teeth | **The Ladder** tab: one-on-one bouts, nobody dies, a ladder for each character. Each opponent's stat block opens in place. |
| Leaves for the map | **Map on monitor**. |
| Ends the night | **Show the haul**: what everyone bought and the secrets they uncovered. |

## After the night

- **Copy as text** under the ledger and paste it into `campaign-state.md` (or give it to Claude).
- Close the helper's window. The next **New night** starts clean.

## When something goes wrong

| You see | Do this |
|---|---|
| "♪ Music helper off" | Close the page, double-click `start-emporium.cmd` again. |
| "Spotify did not answer" | Open Spotify, play any song once, click the place again. |
| "Spotify 403 … Premium" | The music needs Spotify Premium on the account that agreed. |
| A link instead of "Quiet music is on" | Click it: the login ran out or this computer is new. |
| "This login is out of date" after Agree | Press its **try again** link (the helper was restarted between the two steps). |
| The monitor does not follow | Open the player screen with the **📺** button on your page, not by typing the address; no private windows. |
| Old look, missing tabs or buttons | **Ctrl+F5** in both windows. |
| No sound on the monitor | Click once inside the player screen. |
| Node.js missing | The launcher says so: install the LTS from nodejs.org. |

## Where things live

| What | File |
|---|---|
| Launcher | `dm-app/start-emporium.cmd` |
| Music helper | `dm-app/tools/spotify-remote.mjs` (port 8888) |
| Stalls, stock, prices | `dm-app/sessions/campaign-emporium-market.js`, `-goods.js` |
| What the monitor shows (themes, lines, hidden rows, playlists) | `dm-app/sessions/campaign-emporium-players.js` |
| Talk: keepers, riddles, secrets | `dm-app/sessions/campaign-emporium-talk.js` |
| Sell guide (what the floor pays) | `dm-app/js/emporium-sell.js`; the stalls' own buy rates are `buys` in `-market.js` / `-goods.js` |
| Mini-games and the Ladder | `dm-app/sessions/campaign-emporium-minigames.js`, `-gauntlets.js` |
