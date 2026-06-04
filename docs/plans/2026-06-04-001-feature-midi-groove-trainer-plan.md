---
date: 2026-06-04
topic: midi-groove-trainer
status: completed
origin: user request in current thread
---

# Plan: MIDI Groove Trainer Web App

## Problem Frame
Build a full-featured browser app that teaches feel-first piano improvisation with MIDI keyboard input. The app must avoid rewarding unstructured noodling by using deliberate constraints, immediate feedback, repetition, and recall.

## Scope Boundaries
- In scope: browser-based app, Web MIDI detection/input, MIDI simulator fallback, guided lessons, game-like challenge loop, scoring, progress/journal state, polished responsive UI.
- In scope: educational model centered on echoing, constrained riffing, target-note resolution, motif variation, timing/pocket, chord-color recognition, and saved riff reuse.
- Out of scope: backend accounts, paid content, actual copyrighted artist audio, full sheet-music curriculum, production DAW/audio engine.

## Key Technical Decisions
- Use React + Vite for a greenfield interactive frontend.
- Use Web MIDI API when available, with a keyboard/click simulator fallback so the app works without hardware during QA.
- Keep scoring transparent: every point maps to a learning behavior such as target-note landing, rhythmic placement, motif reuse, silence, dynamics, and note-set control.
- Use localStorage for progress and riff-journal persistence.
- Use Web Audio only for lightweight synth feedback and metronome cues, avoiding external audio assets.

## Implementation Units

### U1: App scaffold and design system
Files: `package.json`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles.css`
Goal: Create a polished responsive single-page app shell with lesson navigation, challenge stage, live feedback, and progress/journal regions.
Test scenarios: production build succeeds; desktop and mobile layouts do not overflow; primary controls are reachable by keyboard and pointer.

### U2: MIDI and simulator input layer
Files: `src/hooks/useMidi.js`, `src/lib/music.js`, `src/App.jsx`
Goal: Detect MIDI access, connect available inputs, normalize note-on/note-off messages, and provide a simulator fallback with computer keyboard support.
Test scenarios: app shows MIDI unavailable/ready states; simulated notes produce the same normalized note events as MIDI; unsupported browsers remain usable.

### U3: Deliberate-practice challenge engine
Files: `src/lib/challenges.js`, `src/lib/scoring.js`, `src/App.jsx`
Goal: Implement challenge definitions, active run state, note-event recording, timing windows, target-note checks, motif/repetition checks, silence checks, velocity-shape feedback, and scoring labels.
Test scenarios: valid notes inside the palette score; out-of-palette notes are flagged; target-note landings are detected; score explanation lists learning behaviors instead of vague praise.

### U4: Gamified curriculum and riff journal
Files: `src/lib/challenges.js`, `src/App.jsx`, `src/styles.css`
Goal: Provide campaign-style lessons inspired by loop rooms, call-and-response, chord colors, pocket practice, and modal rooms; save best riff takes locally and support replay/clear.
Test scenarios: selecting a lesson changes constraints; finishing a run records progress; saving a riff persists after reload; clearing journal removes saved riffs.

### U5: Verification and handoff
Files: `README.md`, optional test/config files
Goal: Document local run/build steps, MIDI browser limitations, fallback behavior, and educational design rationale.
Test scenarios: `npm run build` passes; app runs locally; browser workflow verifies MIDI fallback, challenge scoring, progress, journal, and responsive layout.

## Risks
- Web MIDI support is browser-specific; fallback must be first-class.
- Scoring can accidentally incentivize random play; every score category must tie to a concrete learning behavior.
- A game-like UI can become decorative; the core interaction must remain hear, echo, constrain, riff, receive feedback, save, repeat.

## Verification
- `npm install`
- `npm run build`
- Start dev server and verify app in browser at desktop and mobile widths.
- Confirm simulated note input works without a MIDI keyboard.
- Confirm localStorage progress and journal behavior.
