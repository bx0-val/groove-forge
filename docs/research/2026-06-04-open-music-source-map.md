---
date: 2026-06-04
topic: open-music-source-map
status: draft
---

# Research: Source-First Music Stack

## Correction

Groove Forge should not generate all musical/audio material from scratch.

The app should assemble existing legal/open building blocks:

- sampled instruments for good tone,
- open MIDI/pattern datasets for vocabulary,
- jazz lick databases for idiomatic phrases,
- music-theory libraries for transposition and chord/scale logic,
- existing improvisation tools for grammar and pedagogy.

Creativity belongs in the adaptation: choosing, simplifying, transposing, sequencing, comparing, and drilling.

## Adopted Immediately

### `smplr`

Use: sample-based browser instrument stack.

Why it matters:

- Provides no-setup sampled instruments for Web Audio.
- Includes `Soundfont`, `SplendidGrandPiano`, `ElectricPiano`, `DrumMachine`, `Smolken` bass, `Sequencer`, and effects.
- Uses hosted sample sets, so the app does not need a backend just to sound decent.

Current implementation:

- `SplendidGrandPiano` sampled acoustic grand piano.
- `Smolken` sampled pizzicato bass.
- `DrumMachine` TR-808 pulse cues.
- Old oscillator synth retained only as failure fallback.
- Teacher playback waits for the sampled instruments before starting, so the first demo does not mask the change with the old synth tone.

### `tonal`

Use: note, MIDI, pitch-class, and phrase-transposition helpers.

Current implementation:

- `src/lib/music.js` now delegates note-to-MIDI conversion and transposition to `tonal`.
- Existing normalized pitch-class comparisons are preserved so flat-spelled lesson content still scores correctly against MIDI notes.

Source: https://github.com/tonaljs/tonal

Source: https://github.com/danigb/smplr

### `@tonejs/midi`

Use: parse MIDI source files into app-friendly phrase fragments.

Current implementation:

- `scripts/extract-jazznet-fragment.mjs` parses a MIDI file and emits beat/duration/velocity phrase JSON.
- The first inspected source file is `midi/progressions/I-VI-ii-V-maj/A-1-I-VI-ii-V-maj-0.mid` from jazznet.
- The app stores the extracted chord-stack material plus the beginner adaptation in `src/data/sourceFragments.js`.

Source: https://github.com/Tonejs/Midi

## Audio/Synthesis Candidates

### `@tonejs/piano`

Use: high-quality multisampled acoustic piano.

Notes:

- Uses Salamander Grand Piano samples.
- Up to 16 velocity levels across 88 keys, sampled every third note.
- Strong candidate if the product wants a realistic acoustic piano path.

Source: https://github.com/tambien/Piano

### Tone.js

Use: scheduling, sample playback, transport, loops, effects.

Notes:

- Good fit for tight groove scheduling and A/B playback.
- Can load sample maps through `Tone.Sampler`.
- More framework than we need for the current patch, but valuable once the mission loop becomes timing-heavy.

Source: https://tonejs.github.io/

### WebAudioFonts

Use: broad SoundFont/MIDI playback.

Notes:

- MIT projects.
- Hosts thousands of presets derived from open-source SoundFont banks.
- Useful if the app grows into full MIDI-file playback or wants self-hostable SoundFont preset conversion.

Source: https://webaudiofonts.com/

## Riff/Pattern Sources

### BopLand

Use: idiomatic jazz licks.

Notes:

- Hundreds/thousands of licks over common chord progressions.
- Licks are searchable by tune/progression and available across keys.
- Licensed CC BY-SA 4.0, which means attribution and share-alike requirements must be respected.
- Best use: import/adapt short lick fragments into missions, store attribution, and teach the pattern through echo/transpose/remix.

Source: https://bopland.org/home

### jazznet

Use: piano pattern MIDI.

Notes:

- 162,520 labeled piano patterns including chords, arpeggios, scales, and progressions.
- MIDI archive is small enough to inspect locally compared with the full audio dataset.
- Licensed CC BY 4.0.
- Best use: seed chord/arpeggio/scale pattern drills and generate controlled variations.

Local inspection:

- Downloaded `midi.tar.gz` to the temp directory only, not the repo.
- Archive contains `midi/arpeggios`, `midi/chords`, `midi/progressions`, and `midi/scales`.
- Progression files are organized by formula and key, e.g. `midi/progressions/I-i#-ii-V/A-1-I-i#-ii-V-0.mid`.

Source: https://zenodo.org/records/7192653

### Jazzomat / Weimar Jazz Database

Use: real jazz solo analysis.

Notes:

- Research project focused on creative processes in jazz solo improvisation.
- Provides tooling and databases for melodic/rhythmic pattern analysis.
- Best use: mine contour, density, rhythm, and phrase-length distributions from real solos, then adapt those traits into original exercises.

Source: https://jazzomat.hfm-weimar.de/index.html

### PiJAMA

Use: solo jazz piano MIDI transcriptions for research.

Notes:

- Over 200 hours of solo jazz piano automatic MIDI annotations.
- License is CC BY-NC 4.0, so it is research/non-commercial only unless licensing changes.
- Best use: private analysis and prototyping, not redistributable commercial app content.

Source: https://zenodo.org/records/8354955

### Impro-Visor

Use: jazz grammar, licks, style files, and pedagogy.

Notes:

- GPL-licensed educational jazz improvisation software.
- Includes licks, grammar-based generation, style extraction, MIDI import/export, and note-advice concepts.
- Best use: study architecture and possibly use compatible GPL-derived content only if the product is comfortable with GPL obligations.

Source: https://github.com/Impro-Visor/Impro-Visor

## Theory/Transformation Libraries

### Tonal

Use: JavaScript music-theory operations.

Notes:

- Notes, intervals, chords, scales, modes, keys, MIDI conversion, transposition, roman numerals, and more.
- Should replace hand-rolled note/scale logic once the app starts importing and transposing real material.

Source: https://github.com/tonaljs/tonal

### Open Music Theory

Use: explanation and curriculum grounding.

Notes:

- Open-source interactive theory textbook.
- CC BY-SA 4.0.
- Covers theory, including pop/jazz-related material.
- Best use: adapt explanations and terminology with attribution, not invent theory copy from scratch.

Source: https://openmusictheory.github.io/

## License Rules

- MIT libraries: safe to use with attribution in docs/package metadata.
- CC BY material: can adapt and redistribute with attribution.
- CC BY-SA material: acceptable for this project; keep attribution and source notes visible.
- CC BY-NC material: acceptable for this project because it is explicitly non-commercial.
- GPL material: acceptable for this project when useful; keep provenance visible.
- Copyrighted standards/Real Book/recordings: avoid hardcoding melodies or commercial recordings directly.

## Next Build Plan

1. Keep `smplr` as the default sound stack.
2. Source metadata fields have been added to lesson definitions:
   - `source.name`
   - `source.url`
   - `source.license`
   - `source.adaptation`
3. Replace the current hand-authored source adaptations with imported/curated source fragments once the import pipeline is ready.
4. Use `tonal` for transposition and scale/chord logic.
5. Download and inspect jazznet MIDI locally, then select small patterns that match beginner missions.
6. Use BopLand fragments for ii-V-I, minor ii-V-I, blues, and turnaround missions.
7. Use Jazzomat/Weimar for phrase-shape analytics rather than direct copying.
8. Keep the mission loop source-aware: copy, transpose, vary, compare, and replay.
