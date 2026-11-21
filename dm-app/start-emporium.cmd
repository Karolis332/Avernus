@echo off
rem The Emporium night in one double-click: the music helper, Spotify, and the DM page in Firefox.
rem How to run the night: dm-app/docs/emporium-night.md
cd /d "%~dp0"
where node >nul 2>nul || (
  echo Node.js is missing on this computer: install the LTS from https://nodejs.org, then double-click this again.
  pause
  exit /b 1
)
rem the helper, unless it already runs; its window stays minimized: leave it open all night
curl -s -m 2 http://127.0.0.1:8888/status >nul 2>nul || start "DM music helper - leave open" /min node tools\spotify-remote.mjs
start "" spotify:
start "" firefox "%~dp0emporium.html"
