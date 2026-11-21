---
name: spotify-scene-music
description: The DM plays table music from Spotify and loves Borislav Slavov; how the DM app opens a track per place and how to get real track ids
metadata:
  node_type: memory
  type: user
  originSessionId: 9cf8b5a1-56b6-4ae4-9868-4943c3ae0ac5
  modified: 2026-11-21T12:01:09.017Z
---

Karolis plays music at the table from Spotify (desktop app on the laptop) and said on 2026-11-21 that he has "a lot of amazing tracks on spotify specifically from borislav slavov" (Baldur's Gate 3, Divinity: Original Sin 2). He asked for a link per location that changes the song on a click. He wants sessions to "feel memorable": music, pictures and motion per place are welcome, not extras.

**How to apply:**
- When building a scene page or a player-facing screen, offer a Spotify link per place or scene. The Emporium page does it: `dm-app/js/emporium-cast.js` (`spotifyUri`, `play`) opens a `spotify:track:<id>` link in a hidden frame, no API and no login; links live in `dm-app/sessions/campaign-emporium-players.js` and the DM can paste his own on the page.
- Never type a Spotify id from memory. Read ids from Spotify's own page: `https://open.spotify.com/embed/album/<album id>` has a `__NEXT_DATA__` JSON with every track's title and `uri`. Albums used: BG3 OST `6JR4qLOXu96krMWxBTpXSR`, BG3 Streets and Taverns `1saifXYtppiHtSmQKDFggA`, D:OS2 OST `075yunM0zgzQvPk2oqSLaN`.
- Claude cannot hear the tracks: say that the picks are by title and reputation, and leave the choice to him.
- Not known as of 2026-11-21 (my open question, not his statement): whether the desktop app starts a track by itself when a `spotify:` link opens, or only shows it.
- Later on 2026-11-21 he wanted the music darker ("hellish tunes", "not only borislav slavov", the picks were "a bit too cheerful") and playlists made in his own Spotify, and he picked the MCP server `imprvhub/mcp-claude-spotify`. Set up on this PC: clone `C:\Users\kpaul\tools\mcp-claude-spotify` (compiled with `npx tsc`, installed with `--ignore-scripts`; code checked: talks only to Spotify and 127.0.0.1), launcher `C:\Users\kpaul\tools\spotify-mcp-launch.mjs` (reads `~/.spotify-dm/credentials.json` `{clientId, clientSecret}`, so they never pass through chat: the chat log is public), registered `claude mcp add spotify --scope user`. Login token: `~/.spotify-mcp/tokens.json` after the `auth-spotify` tool. Redirect URI in his Spotify app: `http://127.0.0.1:8888/callback`. The laptop has none of this.

Related: [[dnd-campaign]], [[free-tools-only]]
