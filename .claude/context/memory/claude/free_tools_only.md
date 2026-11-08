---
name: free-tools-only
description: DM wants no paid tools/subscriptions; tool suggestions should be free image-generation models (fantasy-tuned)
metadata:
  node_type: memory
  type: feedback
  originSessionId: 16eecd26-b48f-4343-bac4-9b7135775299
  modified: 2026-11-08T01:20:37.581Z
---

When suggesting tools for the campaign, only free ones, and mainly image-generation models tuned for fantasy/D&D art. Paid picks (Syrinscape, Meshy/Tripo subscriptions) were rejected 2026-11-07.

**Why:** the DM said "I don't want any paid ones, and I want mainly image generation tuned models".

**Decision 2026-11-07:** astra only (gpt-6-astra via Codex) for all campaign art; local ComfyUI and Gemini were offered and declined.

**Update 2026-11-08:** quality beats free for the dragon art. The free tools were tried and failed:
- Pollinations drew the wrong subject.
- The HF FLUX Space hit its quota after 3 images.
- Local DreamShaper XL in `C:/Users/kpaul/imggen` gave every dragon the same face.
- Local FLUX.1-schnell is blocked: the HF repo is gated (401).

The DM then offered to pay for Codex credits, or for Midjourney "if you can use it properly". Midjourney has no official API, and its MCPs are wrappers that risk breaking its terms of service.

**Midjourney (2026-11-08):** the DM bought the Basic plan ($10/mo, about 200 jobs, renews Dec 8, 2026). There is no official API. Prompts live in `dm-app/docs/style-test/midjourney-prompts.txt`; picks are saved to `dm-app/docs/style-test/mj/`.

**DM override (2026-11-08):** the DM explicitly told Claude to drive midjourney.com through Playwright ("just use playwright… we have done it before"). Rules:
- The DM logs in themselves. Claude never types passwords or 2FA codes.
- Submit one job at a time, slowly, and only the jobs asked for (12). The AceDataCloud MCP is registered at user scope but not authenticated and not needed.

**Overnight run (2026-11-08, "i want all to be doen"):** 43 attack jobs (38 + 5 re-rolls). Each dragon's portrait served as `--sref`; breath and dive shots needed `--sw 40` plus an explicit "side view"/"seen from below", or they collapsed into head shots. Pipeline: `dm-app/docs/style-test/step.sh`.

**How to apply:** astra first. When the plan allowance runs out, ask whether to buy Codex credits rather than falling back to weak free tools. Distinct faces and scars need a strong model (astra). Related: [[dm-app-primer-feedback]].
