---
name: spotify-scene-music
description: The DM plays table music from Spotify and loves Borislav Slavov; how the DM app opens a track per place and how to get real track ids
metadata:
  node_type: memory
  type: user
  originSessionId: 9cf8b5a1-56b6-4ae4-9868-4943c3ae0ac5
  modified: 2026-11-21T01:17:31.740Z
---

Karolis plays music at the table from Spotify (desktop app on the laptop) and said on 2026-11-21 that he has "a lot of amazing tracks on spotify specifically from borislav slavov" (Baldur's Gate 3, Divinity: Original Sin 2). He asked for a link per location that changes the song on a click. He wants sessions to "feel memorable": music, pictures and motion per place are welcome, not extras.

**How to apply:**
- When building a scene page or a player-facing screen, offer a Spotify link per place or scene. The Emporium page does it: `dm-app/js/emporium-cast.js` (`spotifyUri`, `play`) opens a `spotify:track:<id>` link in a hidden frame, no API and no login; links live in `dm-app/sessions/campaign-emporium-players.js` and the DM can paste his own on the page.
- Never type a Spotify id from memory. Read ids from Spotify's own page: `https://open.spotify.com/embed/album/<album id>` has a `__NEXT_DATA__` JSON with every track's title and `uri`. Albums used: BG3 OST `6JR4qLOXu96krMWxBTpXSR`, BG3 Streets and Taverns `1saifXYtppiHtSmQKDFggA`, D:OS2 OST `075yunM0zgzQvPk2oqSLaN`.
- Claude cannot hear the tracks: say that the picks are by title and reputation, and leave the choice to him.
- Not known as of 2026-11-21 (my open question, not his statement): whether the desktop app starts a track by itself when a `spotify:` link opens, or only shows it.

Related: [[dnd-campaign]], [[free-tools-only]]
