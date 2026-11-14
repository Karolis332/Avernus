---
name: session-recordings-private
description: Table recordings and transcripts are private; quote only fight facts in chat; ask before any GPU transcription run
metadata:
  node_type: memory
  type: feedback
  originSessionId: 0da2ec32-82ca-4301-a7e3-feccc57304d0
  modified: 2026-11-14T23:25:42.999Z
---

The DM records game sessions with the DM app's Record page (`dm-app/record.html`, since 2026-11-15) and Claude turns the transcript into round ledgers for the fight films ([[animation-profile]], [[higgsfield-video]]).

- Audio, marks files and transcripts live in `C:\Users\kpaul\DnD\recordings\` (gitignored). Never commit them, never copy them into `docs/`.
- The chat log of every session is pushed to the public repo. When reading a transcript, write only fight facts in chat (who did what, damage, spells). Never quote table talk, jokes or anything personal a player said.
- A round ledger in `dm-app/docs/fights/` is in English, fight facts only, each line tagged tracker / heard / guess.
- Transcription (`dm-app/tools/transcribe_session.py`, faster-whisper large-v3) is a GPU job on the DM's 8 GB card: check `nvidia-smi` and ask for a go before installing or running it. Lithuanian with English D&D terms: expect wrong words, trust the tracker stamps over the voice.

**Why:** the players are recorded in a private room, the repo and its chat log are public (the DM's own rule: nothing private in the repo), and the DM games on the same graphics card (see [[low-cpu-when-gaming]]). My reading: the players' consent covers making fight films, not publishing what they said.

**How to apply:** any time a recording, a marks file or a transcript is opened, or a ledger is written.
