# Groove Forge

Groove Forge is a browser-based MIDI piano trainer for feel-first improvisation. It now teaches through source-driven missions: hear an attributed musical idea, answer an ear check, copy the phrase, compare your take against the teacher, fix one thing, then remix.

The current build adds a taste curriculum: original playable studies inspired by Nujabes, Chet Baker, Kanye West, Haruka Nakamura, Marcus D, Ljones, Nitsua, Cise Starr, and Uyama Hiroto. These are not copied songs or commercial melodies. They are bite-sized flow studies that make the learner practice the musical instinct: late entrance, breath, sample-chop repetition, soft ostinato, cinematic lift, dusty pocket, inward descent, MC cadence, and modal air.

The latest loop adds lesson-specific grooves: each mission has a drum pocket, bass movement, and soft piano comping bed. Demos, copy runs, variation runs, microdrills, and A/B comparison now happen over the same pocket, so execution means playing the lick in the groove rather than just passing a note quiz.

It now has a taste workout deck. Each lesson can be practiced as multiple lick forms: full teacher phrase, pocket skeleton, answer tag, delayed entrance, and touch ghost. The workout rounds force the player through Shadow, Pocket Lock, Touch Pass, Answer Tag, and Taste Twist so the same idea becomes vocabulary instead of a one-off exercise.

## What It Teaches

- BopLand-style ii-V-I vocabulary and short reshufflable lick fragments
- Open Music Theory guide-tone and jazz-color concepts
- jazznet-style chord/progression target-note practice
- Call-response phrasing, silence, and breath
- Modal-cell repetition and restraint
- Artist-flow taste profiles: what to bite, what to avoid, and how to practice it
- Original noncommercial style studies that teach public, high-level artist instincts without embedding copyrighted recordings
- Groove-backed practice with kick/snare/hat patterns, bass lines, and comp chords per lesson
- Pocket scoring that checks whether the lick sits near the teacher rhythm
- Twist cards that turn each learned lick into concrete variation challenges
- Lick forms for skeleton, answer, late-entry, and touch-focused practice
- Workout rounds that track focused execution passes per lesson
- A/B teacher-vs-player comparison
- One-correction microdrills
- A gated mission path that unlocks the next idea only after a real copy pass

## Practice Loop

Each mission follows the same sequence:

```text
source -> hear -> ear check -> copy -> compare -> fix -> twist
```

The app hides model note names until the player has listened or answered the ear check. Copy and variation runs are disabled until the model has been heard.

Scores are not generic points. Copy mode checks whether the player matched the model phrase. Variation mode checks whether the take stayed in the color, landed somewhere intentional, left space, reused a motif, and shaped touch. Every run also returns a single correction with an action and microdrill.

The sound engine now uses `smplr` sample-based instruments first: a sampled acoustic grand piano, sampled pizzicato bass, and TR-808 pulse/drum cues. The old browser-native synth remains only as a failure fallback, and teacher playback waits for samples before starting.

## MIDI Support

The app uses the Web MIDI API when the browser supports it. Chrome and Edge are the practical targets. Web MIDI requires a secure context, so local development through Vite works on `localhost` / `127.0.0.1`.

If MIDI is unavailable, the app remains usable through:

- The on-screen piano keyboard
- Computer keys `A W S E D F T G Y H U J K O L P ;`

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Design Rationale

The product rule is:

```text
no score before a model, no riff before a constraint, no reward without a reason
```

Free play is not the teacher. Explanation, demonstration, copying, variation, and retained motifs are the teacher. The game layer exists to make that practice loop feel immediate and repeatable.

## Source-First Direction

The app should stop inventing every musical and audio primitive from scratch. Future content should mine legal/open sources such as BopLand jazz licks, jazznet piano-pattern MIDI, Jazzomat/Weimar transcription analysis, Impro-Visor grammars, and Open Music Theory explanations, then adapt those into tiny teachable missions with attribution and license notes.

Current missions include source metadata in the app: source name, source URL, license, extracted material, source file/tool when available, and the adaptation made for beginner piano practice.

This is a personal/non-commercial learning app, so GPL, CC BY-NC, research datasets, and freely available open tools are acceptable inputs as long as the app keeps the source trail visible.

The artist-flow lessons use the same trail, but label themselves as original educational taste studies. The point is to study compositional instincts and phrasing behavior, not to transcribe protected melodies.
