# Groove Forge

Groove Forge is a browser-based MIDI piano trainer for feel-first improvisation. It teaches through constrained runs instead of open noodling: every score category maps to a concrete practice behavior.

## What It Teaches

- Echoing and varying short phrases by ear
- Staying inside a small note palette
- Landing on target notes over a color or mode
- Leaving space instead of filling every beat
- Reusing motifs so accidents become vocabulary
- Shaping dynamics with MIDI velocity

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

The core loop is:

```text
hear -> constrain -> riff -> get specific feedback -> save the best moment -> reuse it
```

Free play is not the teacher. Constraints, comparison, repetition, and retained motifs are the teacher. The game layer exists to make that practice loop feel immediate and repeatable.
