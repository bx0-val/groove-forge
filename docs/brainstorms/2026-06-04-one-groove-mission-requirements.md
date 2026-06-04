---
date: 2026-06-04
topic: one-groove-mission
status: draft
origin: ce-brainstorm plus ce-riffrec framing
---

# Requirements: One Groove Mission

## Goal

Rebuild the next version of Groove Forge around a single mission that teaches one musical move through listening, echoing, playback comparison, targeted correction, and remix.

The mission should be fun before it is explained.

## User Story

As a beginner with a MIDI keyboard, I want to press start, hear a good loop, copy a small phrase, hear exactly how my take differs, and retry one fix so I slowly build real musical feel instead of randomly pressing keys.

## Core Loop

```text
Start groove
Hear teacher phrase
Echo phrase
Hear A/B playback
Fix one thing
Retry short drill
Unlock one twist
Save take
```

## First Mission

Name: D Minor Answer

Learning behavior:

- Copy a six-note melodic answer.
- Leave the silence intact.
- Land on F or A.
- Change only one thing after copying.

Vibe:

- Lofi D minor room.
- Warm Rhodes or felt piano.
- Soft bass root.
- Subtle drums or pulse.
- No harsh metronome-first sound.

## Functional Requirements

### P0: Mission Stage

- The app opens directly into the current mission.
- The primary visible action is "Start groove."
- Lesson navigation is secondary.
- The app shows only the current phase and next action.
- The player never sees a generic dashboard before hearing sound.

### P0: Teacher Phrase Playback

- The teacher phrase is scheduled against the groove.
- The phrase can be replayed without starting a scoring run.
- The visual phrase appears after the first listen, not before.
- The user is prompted to hum or internally hear the answer before playing.

### P0: Echo Recording

- MIDI, computer keyboard, and on-screen keys all create the same note events.
- The app records timing, pitch, duration, and velocity where available.
- Copy mode rejects progress if the user skips the teacher phrase.
- Copy mode emphasizes matching contour and silence, not just note count.

### P0: A/B Playback

- After a take, the app replays the teacher phrase and player phrase back-to-back.
- The player can replay the comparison.
- The phrase view highlights the largest difference.
- The app shows one correction, not a list of all possible flaws.

### P0: One-Correction Coach

The feedback engine chooses one next step using this priority order:

1. No meaningful input.
2. Too many notes.
3. Wrong pitch palette.
4. Missed copy contour.
5. Rushed or late entrance.
6. Missed landing note.
7. No space.
8. No dynamic shape.

The correction must be phrased as an action:

```text
Wait until beat 2, then play F-G-F and stop.
```

### P0: Microdrill Retry

- The correction creates a short retry state.
- The retry lasts 10 to 20 seconds.
- The retry narrows the allowed action.
- Passing the retry unlocks the twist phase.

### P0: Twist Phase

The twist allows one variation only:

- Change final landing note.
- Delay the answer.
- Make the first note softer.
- Repeat the motif one more time.

The app should make "vary one thing" feel like a creative unlock, not an instruction panel.

### P0: Audio Upgrade

- Replace the current oscillator-led piano with a sample-based Rhodes or felt piano.
- Add a loop bed with separate levels for keys, bass, and pulse.
- Support user-triggered audio start to satisfy browser audio requirements.
- Preserve the current Web MIDI fallback path because Web MIDI is browser-limited.

### P1: Ear-First Mode

- Hide note names before the first copy attempt.
- Let the player choose whether the model went up, down, or repeated before showing notes.
- Reveal note names after the player has listened or attempted.

### P1: Riff Diary As Curriculum

- Save the player's best take with timing, notes, and mission context.
- Bring one saved take back the next day as a warmup.
- Ask for one transformation: fewer notes, new landing, same rhythm, new key.

### P1: Artist-World Content

- Create vibe worlds inspired by the user's taste references without using copyrighted songs.
- Each world maps to a behavior:
  - Chet: breath and sparse melody.
  - Nujabes: loop pocket and pentatonic answer.
  - Evans: color-tone landing.
  - Ryo: bright swing answer.
  - Lateef: modal restraint.

## Learning Requirements

- Every mission has a model phrase.
- Every score category maps to a named behavior.
- Every failed run creates one next action.
- No reward can be earned by playing outside the mission constraint.
- Free play must be framed as remixing a learned phrase.

## UX Requirements

- First screen: mission, not curriculum.
- Text should be sparse and action-oriented.
- Explanations appear after the player has heard the sound.
- The phrase visualization should support comparison, not become a falling-note reflex game.
- The UI should feel like a studio/practice room, not an analytics dashboard.

## Riffrec Feedback Status

No Riffrec recording or bundle was provided in this turn. This brief is based on the current app screenshot, local files, and direct user feedback that the app is "awkward" and still does not promote learning strongly enough.

Recommended Riffrec capture for the next pass:

1. Record three minutes using the current app from a fresh page load.
2. Narrate every moment of confusion, boredom, or "this sounds bad."
3. Include at least one copy attempt and one variation attempt.
4. Attach the Riffrec bundle so the next analysis can separate UI confusion, sound dissatisfaction, and learning-loop failure.

## Acceptance Criteria

- A new user can start playing within 10 seconds.
- The first sound is musically pleasant enough to invite another note.
- The user always knows the next action.
- The app can replay teacher and user takes back-to-back.
- The app gives one corrective action after a failed take.
- The user cannot advance by random noodling.
- The player can save a take and hear it later.

## Build Sequence

1. Refactor app state into a mission state machine.
2. Add A/B playback for teacher and player phrases.
3. Replace scoring summary with one-correction selection.
4. Add microdrill retry states.
5. Upgrade audio to sample-based instrument and groove bed.
6. Redesign the first viewport around one mission.
7. Add ear-first reveal behavior.
8. Connect saved takes to future warmups.

