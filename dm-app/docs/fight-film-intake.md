# Fight film intake: from the DM's memory to six-second rounds

How Claude asks the DM about a fight so that every round of film shows what happened at the table.
The DM (2026-11-13): "how to realistically prompt me for 6 second intervals so that I can describe what
happens in each round and then you can legit plan the actions around that".

One combat round is six seconds of film. Six seconds holds **three beats**. So the questions have to
end in exactly this for each round: three things the viewer sees, each with who, what, and the result.

## What the research says

| Finding | Where it is from | What we do with it |
|---|---|---|
| Let the person tell the whole event first, without interruption, and ask them to leave nothing out. Then ask only about what they raised, in their order. Open questions, no leading or either/or questions. | Cognitive interview ([Simply Psychology](https://www.simplypsychology.org/cognitive-interview.html)): 41% more correct details in a meta-analysis | Step 1 is one free telling. Questions come after. |
| The same method also raises wrong details (one meta-analysis: 61% more errors; the page calls the rise "small but real"). | Same page | Every line is tagged **DM said** or **guess**, and read back before a credit is spent. |
| A fight beat is one physical exchange with a cause and a result. Record the action, the result, and who has the upper hand after it. Reversals get the emphasis. Show impacts, not wind-ups; frame a hit on the one who takes it. | [Storyboarding a fight scene](https://www.screenweaver.ai/blog/storyboarding-fight-scene) | The round card asks for the result and the change, not only the action. |
| About one beat every two or three seconds. One camera move per shot; a hard camera move plus a hard subject move gets unstable. Words must describe what the viewer can see. | [Kling prompting guide](https://www.screenweaver.ai/blog/prompting-kling-guide), citing Kling's camera guide | Three beats in six seconds. One camera move a shot. |
| Image-to-video prompt = "Subject + Movement, Background + Movement". Simple sentences. "A description that significantly deviates from the image may cause a camera cut or transition." Complex physical movement is hard. | [Kling's own image-to-video guide](https://kling.ai/quickstart/image-to-video-guide) | The start frame must already show the scene of the shot. The prompt says only what moves. |
| Kling 4.0: write beats as second ranges ("0-2 s: framing, one action, camera move"), one action per range; the ranges must add up to the clip length or the model invents shots. "Hard cuts" or "One continuous shot, no cuts". One sentence per reference image; references on plain backgrounds. End with an "Audio:" line. | [PixelDojo Kling 4.0 guide](https://pixeldojo.ai/guides/kling-4-0-prompting-guide) (third party; **not tested by us**) | Try the second ranges on the next multi-beat clip. |
| Overloaded motion makes the subject morph mid-shot; the cure is one beat per clip. | Third-party Kling guides, from search summaries (pages not read) | Matches what we saw. See below. |

**Measured on our own film (the sky chase):**
- Six seconds holds three beats. A fourth is cut off (the soul burning in the first chute test).
- Two characters who look alike in one shot turn into each other: Lucan became Veska at the end of round 1. The DM: "i just hate the part where ser lucan morphs into veska".
- The background of a reference image leaks into the shot: Aurora's reference grew a sailing ship in round 8 and moved the ending onto the deck in round 11.
- There is no cancel and no seed. Every render is a new take, and it is paid for.

## The intake, step by step

**Step 0. Cast and stage (once a fight).** Claude fills this from the app (the encounter, the stat blocks, `animation-profile.md`) and asks only for what is missing: who was there, where each one stood, how it started, how it ended.

**Step 1. Tell it once.** Claude asks one thing: *"Tell me the fight the way you would tell a friend. Any order, typos fine, leave nothing out, even the small stuff."* The DM writes as many short messages as he likes. Claude does not ask anything until the DM says he is done.

**Step 2. The round ledger.** Claude sorts the telling into a table, one row per turn: round, who, what they did, the result (damage, who dropped, what changed). A gap stays a "?"; Claude does not fill it. The DM fixes rows.

**Step 3. The round card.** This is the six-second prompt. One card per round, four questions, one line each:

1. **The moment.** What is the one thing from this round the table still talks about?
2. **Also seen.** Up to two more things that must be on screen: who does what to whom.
3. **The change.** What is different when the round ends: who is down, hurt, moved, afraid; who has the upper hand?
4. **The look.** One thing about how it looked or sounded, if you remember one.

Two short answers are allowed: **"skip"** (the round folds into the next one) and **"big"** (the round gets two clips, twelve seconds).

**Step 4. Read-back.** Claude writes the round as three rows and the DM says yes or fixes it:

| Seconds | Who | What we see | Result | Camera | Sound |
|---|---|---|---|---|---|

**Step 5. Key frame, then motion.** One painted frame per shot (2 credits), the DM's yes, then the clip. No batch without an explicit yes to that batch.

**Rules for Claude while asking**
- Ask "what did Aurora do?", never "did Aurora shoot?" and never "A or B?".
- Numbers matter: 170 damage has to look bigger than 50. Ask for the number when it is missing.
- A guess is marked **(guess)** in the ledger and asked about in the read-back. It never goes into a prompt unmarked.
- What a character looks like comes from `animation-profile.md`, not from the card. A new detail goes into the profile the moment the DM gives it.

## From a round card to shots

- **Budget:** three beats of about two seconds. The moment may take three seconds; the others share the rest.
- **Too much for one round:** more than three must-show beats, or more than one change of place, means "big" (two clips) or folding a beat into the next round. Say so before rendering.
- **One shot = one subject doing one visible thing, one camera move, one result.**
- **Separate shots, cut by hand** (the DM asked, 2026-11-13). Render each beat as its own three-second clip, the shortest Kling makes (9.75 credits at 1080p, the same price per second as a six-second clip), trim it to 1.5 to 2.5 seconds, and join with ffmpeg (`join_painted.sh`). What it buys:
  - a bad beat is retaken alone, for 9.75 instead of 19.5;
  - two look-alike characters never share a clip, so they cannot morph;
  - the cut lands where we choose, and trimming is free.
- **When one six-second take is still right:** a single flowing move that must not be cut, such as the flight of an arrow or the ship surging away.
- **Start frame per shot.** It must already show the place of the shot. References are single figures on plain backgrounds, one sentence each in the prompt.
- **Prompt for one shot:** "[Subject] [one movement]. [Background] [its movement]. Camera: [one move]. Ends on [result]. Audio: [sounds]. No speech."

## Stiff characters

The DM on the painted film (2026-11-13): "the characters are looking very stiff". In the frames they stand in the pose of the key frame while effects move around them (Drenwal with the shield, Aurora with the bow).

Likely causes:
- Kling's own guide warns that an image it reads as a painting or a still is "prone to generating static videos", with the camera moving instead of the subject. Our start frames are paintings of posed heroes.
- Three beats in one clip leave each body about two seconds, enough for a change of pose but not for a full move.
- The cel-shaded v2 cut had no start frames (reference-to-video) and moved more freely; its faces were the problem.

**First test (2026-11-13, 11.75 credits):** `style-test/higgsfield/sky-chase-test-shot-veska-lance.mp4`, Veska's lance thrust as its own three-second shot with cures 1, 2 and 3 (key frame `kf-t1-veska.webp`, spec `t1-veska`). In the frames her whole body travels: she lunges, shoves the lance in, wrenches it free, turns and recovers; face and style hold. She does hold the shove for about a second. The DM: "the lance thrust is better". So cures 1, 2 and 3 are the method from here on. Cures 4 and 5 are untested.

Cures:
1. Paint the key frame **mid-move**: off balance, weapon half-way through the swing, cloak and hair already flying. Never a hero pose.
2. Name the body in the prompt, not the effect: "plants the back foot, twists at the hips, drives the lance forward and follows through", in simple sentences.
3. One beat per three-second clip, so the whole clip is one move.
4. Give the clip an end frame as well: a start and an end pose that are far apart force the body to travel.
5. For pure action beats, use reference-to-video without a start frame and keep start frames for close-ups, where the face matters more than the motion.

## Worked example: round 7 of the sky chase

- **Card.** The moment: Drenwal's *toll the dead* kills Flash **(guess, to confirm)**. Also seen: Veska's lance and Lucan's sword hit him on the chain; Moonkite rams him. The change: Flash hangs dead from the harpoon chain. The look: a black and crimson bell **(guess)**.
- **Shots, cut by hand:** (1) Veska alone drives the lance in, 2 s. (2) Lucan alone, the sword bites, 1.5 s. (3) Drenwal's hand, the bell tolls, Flash sags, 2.5 s. Moonkite's ram folds into shot 1 as background or is cut.
- In the film as rendered this round was one six-second clip with Lucan and Veska side by side. It held, but round 1 did not.

## Better than memory: capture it at the table

The tracker in the app keeps only the current state (hit points, initiative, conditions); no round is written down. A one-line note per turn, saved as the fight runs, would give the ledger of step 2 for free. Not built. It touches `js/tracker.js`, so it needs a plan and the DM's yes first.
