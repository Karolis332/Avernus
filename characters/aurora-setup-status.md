# Aurora Builder — Local Setup Status

## What's done

| Step | Status | Location |
|---|---|---|
| Aurora installer downloaded (zipped MSI) | DONE | `C:\Users\QuLeR\Downloads\Aurora\Aurora-Setup.zip` |
| Installer extracted | DONE | `C:\Users\QuLeR\Downloads\Aurora\Aurora-Setup\Aurora Setup.msi` |
| 2024-content repo cloned (AuroraLegacy/elements, includes 2024 PHB) | DONE | `C:\Users\QuLeR\Downloads\Aurora\AuroraLegacy-elements\` |
| Old custom content sync (programmatic) | BLOCKED | Windows "Access denied" on `Documents\5e Character Builder\custom` directory itself when robocopy attempts to time-stamp it. Likely Controlled Folder Access / OneDrive Known-Folder protection. |

## Manual steps to complete

1. **Run installer:**
   - Double-click `C:\Users\QuLeR\Downloads\Aurora\Aurora-Setup\Aurora Setup.msi`
   - Accept defaults.

2. **Add 2024 content via Aurora's own update flow** (this bypasses the file lock entirely — Aurora has write access to its own user folder):
   - Launch Aurora → **Additional Content** tab.
   - Paste this URL into the "Add new" field:
     ```
     https://raw.githubusercontent.com/AuroraLegacy/elements/master/AuroraLegacy.index
     ```
   - Click **Download**.
   - Click **Update Content Files**.
   - When prompted, **restart Aurora**.

3. **Verify 2024 PHB loaded:**
   - In Aurora → **Sources** tab → look for entries like:
     - `Core` (v0.2.7) — should include "Player's Handbook (2024)"
     - `Supplements`
     - `Unearthed Arcana`
     - `Collaborations`
   - Toggle the 2024 PHB source ON, toggle the 2014 PHB source OFF (or leave both on if you want mixed-edition).

## What's in AuroraLegacy/elements (2024)

The local clone at `C:\Users\QuLeR\Downloads\Aurora\AuroraLegacy-elements\` contains:

- `core/players-handbook-2024.index` — 2024 PHB master index
- `core/players-handbook-2024/` — XML files for 2024 classes, species, feats, spells, equipment
- Plus full 2014 PHB / DMG / MM / Xanathar's / Tasha's / etc. supplements
- Plus Unearthed Arcana, third-party (Critical Role, Kobold Press, MCDM, etc.)

## If you'd rather sync files manually

The Windows access issue affects automated tools. To bypass:

1. Open File Explorer as admin.
2. Navigate to `C:\Users\QuLeR\Documents\5e Character Builder\`.
3. Right-click `custom` → Properties → Security → grant your user "Full control" → also disable any "Controlled Folder Access" entry covering Documents.
4. Then drag-and-drop everything from `C:\Users\QuLeR\Downloads\Aurora\AuroraLegacy-elements\` (except `.git\` and `README.md`) into `custom\`, overwriting.

But the in-app method (step 2 above) is strictly easier — recommended.

## Cleanup notes

- The git clone (`AuroraLegacy-elements\`) can be deleted after content loads in Aurora, ~80 MB.
- The Setup.zip + extracted MSI can be deleted after install, ~80 MB.
- The temporary `aurora_setup.ps1` in repo root can be deleted; it was scaffolding that didn't pan out.

## Aurora's status

Aurora Builder development was officially postponed in Oct 2020 (single maintainer). The app still works on Windows 11. AuroraLegacy is the fan-maintained community fork of the content (XML) repo and is current as of Nov 2024 with 2024 PHB integration; the app binary itself is unchanged from v1.0.3.
