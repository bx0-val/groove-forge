---
date: 2026-06-04
topic: groove-forge-v3-source-driven-learning
status: completed
origin: user request in current thread plus docs/brainstorms/2026-06-04-one-groove-mission-requirements.md
---

# Plan: Groove Forge V3 Source-Driven Learning

## Problem Frame

The app now sounds much better with sampled acoustic piano, but the learning content still feels like a generated placeholder. The next version must stop inventing musical raw material and turn existing open/legal music knowledge into concrete practice missions.

The product bar for this pass is "v3.0" relative to the current v0.0001 learning state: source-aware lesson content, visible attribution, ear-first steps, A/B playback, one-correction coaching, and microdrills that teach real musical behaviors instead of generic scoring.

## Scope Boundaries

In scope:

- Replace vague lesson definitions with a richer source-driven mission catalog.
- Add source/license/adaptation metadata to each mission.
- Add musician-world framing tied to the user's taste references without copying copyrighted recordings.
- Add ear-first checks before note-name reveal.
- Add A/B teacher-vs-player replay after a take.
- Add one-correction feedback and microdrill retry actions.
- Use `tonal` for music-theory utilities rather than bespoke note conversion where practical.
- Keep Web MIDI, computer keyboard, screen keyboard, sampled acoustic piano, progress, and riff journal working.

Out of scope:

- Bulk-importing BopLand or jazznet into the repo.
- Copying copyrighted standards, Real Book melodies, or commercial recordings.
- Backend accounts, analytics, cloud sync, or paid curriculum.
- Full notation rendering.
- Full MIDI-file ingestion UI.

## Requirements Trace

- R1: The first lesson path must read like real musical vocabulary, not abstract "jazz vibe" cards.
- R2: Each mission must show where its source idea came from and what was adapted.
- R3: The app must teach by hearing, copying, comparing, fixing, and remixing.
- R4: A failed take must produce one concrete next action, not a wall of score categories.
- R5: The user must be able to replay teacher and player takes back-to-back.
- R6: Ear development must be present in the UI before the app shows all note names.
- R7: The app must keep the good acoustic piano sound and not regress MIDI/fallback behavior.
- R8: Tests must cover scoring/correction and source metadata basics.

## Key Technical Decisions

- KTD1: Keep React/Vite and the existing single-page app, but restructure the learning surface around a mission object rather than generic challenges.
- KTD2: Add source/adaptation metadata inside `src/lib/challenges.js` first. This is smaller and safer than building a remote importer before the lesson model is right.
- KTD3: Use `tonal` in `src/lib/music.js` for note, MIDI, and pitch-class conversion. This reduces brittle hand-rolled music theory code and prepares for transposition.
- KTD4: Add correction selection inside `src/lib/scoring.js` so UI feedback and tests share the same learning logic.
- KTD5: Implement A/B comparison in `src/App.jsx` using existing recorded note events and the sampled acoustic piano.
- KTD6: Keep source licenses visible in docs and UI. Use open/legal categories and pattern families; do not embed copyrighted melodies.

## Implementation Units

### U1: Source-Driven Mission Catalog

Files:

- Modify: `src/lib/challenges.js`
- Modify: `src/lib/scoring.test.js`
- Modify: `README.md`

Goal:

Replace the current four generated-feeling lessons with a v3 mission catalog built around source-aware jazz practice behaviors:

- BopLand ii-V-I vocabulary / short reshufflable lick fragments.
- Open Music Theory guide-tone and voicing concepts.
- jazznet piano-pattern categories for arpeggio/chord/progression practice.
- Foundations call-response pedagogy.
- Artist-world framing inspired by Chet Baker, Nujabes, Bill Evans, Ryo Fukui, and Yusuf Lateef without copying recordings.

Patterns to follow:

- Existing `lessons` object shape in `src/lib/challenges.js`.
- Existing test pattern in `src/lib/scoring.test.js`.

Test scenarios:

- Every mission has source name, source URL, license, adaptation note, ear check, anatomy, and drill metadata.
- Demo phrases remain parseable by `phraseToMidiNotes`.
- First mission remains usable for copy-mode scoring tests.

### U2: Real Music Utilities

Files:

- Modify: `src/lib/music.js`
- Modify: `src/lib/music.test.js`
- Modify: `package.json`
- Modify: `package-lock.json`

Goal:

Use `tonal` for note-to-MIDI, MIDI-to-note, pitch-class, and transposition helpers. Keep flat spellings where the lesson content uses them.

Patterns to follow:

- Existing exported helper names so app code does not need a full rewrite.

Test scenarios:

- `Eb4`, `Bb3`, and `Ab3` round-trip correctly.
- MIDI note names preserve useful flats when requested by lesson content.
- Transposition can move a short phrase by interval.

### U3: A/B Comparison And One-Correction Coach

Files:

- Modify: `src/lib/scoring.js`
- Modify: `src/lib/scoring.test.js`
- Modify: `src/App.jsx`

Goal:

After a take, the app should identify the most important correction, show one next action, and let the user hear teacher and player phrases back-to-back.

Patterns to follow:

- Existing `scoreTake` return object.
- Existing timer-based playback in `playDemo`.

Test scenarios:

- Empty take returns a `correction` focused on listening first.
- Too many notes returns a density/space correction.
- Out-of-palette notes return a color correction.
- Copied model returns a copy success correction.
- A/B playback button is disabled before a reviewed take and enabled after a reviewed take.

### U4: Ear-First Mission UI

Files:

- Modify: `src/App.jsx`
- Modify: `src/styles.css`

Goal:

Make the app feel like a mission instead of a dashboard:

- Show source/adaptation metadata.
- Add an ear-check choice after hearing the teacher.
- Hide model note names until the player has listened or answered the ear check.
- Show phrase anatomy and "steal this move" content.
- Show microdrill action with a button to start the narrowed retry.

Patterns to follow:

- Existing component decomposition in `src/App.jsx`.
- Existing panel/card CSS system in `src/styles.css`.

Test scenarios:

- App loads with v3 source metadata visible.
- Clicking "Hear teacher" reveals ear-check context.
- Choosing the correct ear check shows positive feedback and note reveal.
- Completing a take shows a correction and enables microdrill/replay controls.
- Mobile layout does not overlap or clip key controls.

### U5: Documentation And Verification

Files:

- Modify: `README.md`
- Modify: `STRATEGY.md`
- Modify: `docs/research/2026-06-04-open-music-source-map.md`

Goal:

Document the v3 content model, legal source posture, local run/build steps, and source-first roadmap.

Test scenarios:

- `npm test` passes.
- `npm run build` passes.
- Browser flow validates app load, hear teacher, ear check, copy run, A/B replay, microdrill, and mobile viewport.

## Risks

- Source-derived missions can still feel fake if adaptation notes are too abstract. Mitigation: phrase each mission as an actual move with concrete notes, timing, and one thing to steal.
- A/B comparison can be too long if it replays the entire 4-bar run. Mitigation: replay phrase-length teacher and player excerpts.
- Hiding note names can frustrate users if there is no reveal path. Mitigation: reveal after hearing or answering the ear check.
- `tonal` may spell notes differently than current flat-based content. Mitigation: retain `preferredName`/normalization behavior in helpers and tests.
- Hosted samples remain a runtime dependency. Mitigation: keep fallback synth and browser verification.

## Verification

- Run `npm test`.
- Run `npm run build`.
- Start or reuse the dev server at `http://127.0.0.1:5173`.
- Browser-test desktop:
  - App renders without framework overlay.
  - Console has no relevant errors or warnings.
  - Hear teacher loads acoustic piano and reveals listening state.
  - Ear check works.
  - Simulated keyboard input records a take.
  - Review shows one correction.
  - A/B comparison can be triggered.
  - Microdrill can be started.
- Browser-test mobile:
  - First viewport remains readable.
  - Main mission controls are reachable.
  - No text overlap in mission/source/correction panels.
