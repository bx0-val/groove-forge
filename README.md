# Groove Forge

Groove Forge is a browser-based MIDI piano trainer for feel-first improvisation. It now teaches through a guided lesson loop instead of dropping the player into vague jamming.

## What It Teaches

- Hearing, copying, and varying short teacher phrases by ear
- Staying inside a small note palette
- Landing on target notes over a color or mode
- Leaving space instead of filling every beat
- Reusing motifs so accidents become vocabulary
- Shaping dynamics with MIDI velocity

## Practice Loop

Each lesson follows the same sequence:

```text
learn the move -> hear the teacher phrase -> copy it -> vary one thing -> review what happened
```

Scores are not generic points. Copy mode checks whether the player matched the model phrase. Variation mode checks whether the take stayed in the color, landed somewhere intentional, left space, reused a motif, and shaped touch.

The sound engine uses a soft electric-piano Web Audio synth with bass and pulse cues. It is still browser-native, but it is no longer the harsh placeholder beep from the first pass.

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
