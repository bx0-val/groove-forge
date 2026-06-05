---
date: 2026-06-04
status: draft
product: Groove Forge
---

# Groove Forge Strategy

## Product Thesis

Groove Forge should teach beginners to make tasteful, feel-first piano phrases by ear through short call-response missions that sound good immediately.

The product is not a sheet-music course, not a generic theory app, and not a free-play toy with points. It is a musical practice game where the player hears a strong model, echoes it, compares their take to the model, fixes one specific thing, then remixes the idea.

## Target Problem

The target user has a MIDI keyboard and taste, but not much musical vocabulary. They know they like Ryo Fukui, Nujabes, Chet Baker, Bill Evans, Yusuf Lateef, jazz harmony, modal restraint, lofi loops, and lyrical phrasing. They do not want classical mastery or notation-first study. They want to sit down, sound musical, and slowly build ear, touch, timing, and phrase memory.

The hard part is that "riffing" without constraints turns into random note hunting. The app has to make the useful behavior feel like the fun behavior.

## Current Failure Mode

The current version is more educational than the first pass, but it still feels awkward because it explains music around the activity instead of making the activity feel musical.

Specific issues:

- The first screen is a lesson dashboard. The user has to parse structure before they get a satisfying sound.
- Feedback is score-like, but not corrective enough. It says what category changed, but it does not make the user hear the difference.
- The core sound still carries too little emotional reward. For this product, tone quality is part of pedagogy.
- "Copy" and "Vary" are good learning stages, but they need to feel like one flowing mission rather than separate UI modes.
- The game layer still risks feeling like compliance. It should feel like a groove is pulling the player forward.

## Strategic Shift

Move from "guided lesson dashboard" to "one groove mission."

Also move from "generated-from-scratch music toy" to "source-first practice system." The app should copy from legal/open music resources wherever possible: sampled instruments, MIDI pattern datasets, lick databases, jazz grammar projects, and open theory texts. Original work should happen in the adaptation layer: choosing the right fragment, simplifying it for the learner, transposing it, making it playable, and turning it into a feedback loop.

The current v3 implementation now includes a source-aware mission catalog, visible attribution/license/adaptation notes, extracted source material, ear checks before model-note reveal, A/B comparison controls, one-correction microdrills, and mission gating.

The next strategic layer is taste literacy. Groove Forge should give the learner a usable glimpse into how a favorite artist thinks without pretending to ship official artist lessons. Current taste studies are original exercises inspired by public, high-level musical instincts around Nujabes, Chet Baker, Kanye West, Haruka Nakamura, Marcus D, Ljones, Nitsua, Cise Starr, and Uyama Hiroto. The learning target is "what to bite": entrance timing, phrase length, breath, repetition, color-note choice, contour, cadence grouping, and restraint.

The current execution layer adds lesson-specific grooves: drum patterns, bass movement, and soft comping that run under teacher demos, practice runs, drills, and A/B comparison. This shifts evaluation from legal notes to taste under pressure: can the player put the lick in the pocket, keep the touch target, and vary one detail without destroying the feel?

The workout layer turns each lick into repeatable vocabulary. A lesson now exposes the full teacher phrase, pocket skeleton, answer tag, late entrance, and touch ghost, then runs the learner through Shadow, Pocket Lock, Touch Pass, Answer Tag, and Taste Twist. This is the core "honing machine" model: one beautiful idea, several executable forms, focused passes, and a score tied to the pass objective.

The v4.5 adaptive layer persists round outcomes and turns them into a mastery matrix. Each lesson is scored across Shadow, Pocket, Touch, Answer, and Twist, then the app recommends the next best rep. This gives the player a deliberate-practice loop: imitate, isolate, receive feedback, repeat the weak skill, vary under constraint, and retrieve the idea later.

Every session should run this loop:

1. Start a beautiful loop.
2. Hear a tiny teacher phrase.
3. Echo it on the MIDI keyboard.
4. Hear the teacher and player takes back-to-back.
5. Receive one correction only.
6. Retry for 20 seconds.
7. Unlock one remix twist.
8. Save the take into a riff diary for tomorrow.

The product should feel closer to a playable call-response instrument than a lesson page.

## Product Principles

- Good sound first. If the loop and piano tone do not make the player want to touch the keys, the app has already lost.
- One move at a time. Each mission teaches one behavior: wait, land, echo contour, use a color tone, repeat a motif, soften touch, answer a phrase.
- Ear before names. The app should play and ask the user to hear, hum, tap, or choose before showing note labels.
- Feedback must replay the mistake. The most important correction is an A/B playback, not a paragraph.
- Scores must unlock a better musical constraint, not reward button pressing.
- Constraints should feel like style. A limited palette should sound like a Nujabes loop room or Lateef modal drone, not like a rule sheet.
- Taste should be explicit. Each artist-flow study should tell the player what instinct to copy, what behavior to avoid, and how to practice it.
- The groove is part of the teacher. Timing and touch should be scored against the lesson pocket, not treated as decoration.
- The next rep should be chosen by evidence. If pocket is weak, the app should not ask for a clever twist yet.
- Saved riffs become curriculum. Yesterday's phrase should return in a new key, rhythm, or groove.

## Professional Readiness

Current answer: not fully professional-grade yet, but the v4.5 loop is credible enough to justify deeper investment.

What is credible now:

- Beautiful enough sampled piano to make practice rewarding.
- Groove-backed practice instead of dry note quizzes.
- Ear-first imitation before labels.
- Source/taste provenance and noncommercial artist-flow studies.
- Focused workout rounds with immediate corrective feedback.
- Adaptive mastery matrix and next-rep recommendation.

What blocks a paid product:

- More authored lesson volume and progression arcs.
- Better groove/audio mixing and instrument controls.
- More external/open-source content ingestion.
- Onboarding that gets a beginner to a satisfying first sound in under a minute.
- Stronger accessibility and cross-browser MIDI testing.
- Human review of lesson musicality from real players.

## North Star UX

The first viewport should be a single playable mission:

```text
Tonight: D minor call-response
Listen -> Echo -> Compare -> Fix -> Twist
```

The player presses one button, hears a rich loop, hears the teacher phrase, then plays. The app immediately plays the teacher take and the player take back-to-back, then says one concrete thing:

```text
You started right, but rushed the answer. Try the same notes and wait half a beat before F.
```

That is the learning moment.

## Audience

Primary:

- Adult beginner with a MIDI keyboard.
- Strong taste, low formal training.
- Wants jazz/lofi/modal feel without reading notation.
- Easily bored by dry lessons and easily lost in unstructured free play.

Secondary:

- Beatmakers who can draw MIDI but want their hands to play with better pocket and velocity.
- Casual pianists who want improvisation vocabulary instead of classical repertoire.

## Metrics

Learning metrics:

- Echo accuracy after one retry.
- Timing improvement between first and second take.
- Copy-to-vary completion rate.
- Number of saved riffs replayed on a later session.
- Percent of missions where the player completes the A/B correction loop.

Experience metrics:

- Time to first satisfying sound.
- Sessions completed without opening instructions.
- Retry count per mission.
- Return rate the next day.

## Work Tracks

### Track 1: Sound As Motivation

Replace the browser oscillator instrument with sample-based instruments and groove loops. The current code now uses `smplr` for sampled acoustic grand piano, sampled pizzicato bass, and TR-808 pulse cues, with synthesized fallback only for failure cases. Teacher playback waits for the primary samples before starting. Tone.js, `@tonejs/piano`, and WebAudioFonts remain viable deeper options if the app needs heavier scheduling, Salamander Grand Piano samples, or broader SoundFont playback.

### Track 2: One Groove Mission

Rebuild the UI around a single guided mission stage. Keep lessons, progress, and journal secondary. The main surface should be:

```text
hear phrase -> echo phrase -> compare playback -> one fix -> retry -> twist
```

### Track 3: Corrective Feedback

Replace generic scoring emphasis with one selected correction. The current scoring engine now returns a correction object with title, action, rationale, and drill. It detects the biggest learning issue in a take and generates a tiny drill:

- Too many notes: "Play only the first three notes and stop."
- Rushed timing: "Wait until beat 2 before answering."
- Wrong color: "Hold B over A minor until it stops sounding wrong."
- No motif: "Repeat the same two-note shape twice."
- Flat touch: "Play the first note soft, answer stronger."
- Bad pocket: "Replay the teacher and copy the entrance timing before adding notes."

### Track 4: Ear-First Progression

Add missions where labels are hidden until after the player listens. Use choice, echo, and replay before theory language.

### Track 5: Riff Diary

Saved takes should become future prompts. The app should ask the player to replay yesterday's riff, move it to a nearby key, change the landing note, or answer it with fewer notes.

### Track 6: Source Mining

Build a small source-ingestion layer:

- BopLand for CC BY-SA lick vocabulary over standard progressions.
- jazznet for CC BY piano-pattern MIDI and generated pattern scripts.
- Jazzomat/Weimar for analyzing real jazz solo contour/rhythm patterns.
- Impro-Visor for GPL jazz grammar and style concepts.
- Open Music Theory for CC BY-SA explanations and vocabulary.

Each imported/adapted idea should store its source, license, original context, simplification, transposition, and learning behavior.

Because this is explicitly non-commercial, GPL, CC BY-NC, research, and freely available software/datasets are acceptable sources. The constraint is not commercial licensing risk; it is keeping the source trail honest and avoiding direct embedding of copyrighted commercial recordings or fake-book melodies.

### Track 7: Taste Profiles

Build lessons around artist-flow profiles:

- Nujabes: late entrance, warm minor answer, loop restraint.
- Chet Baker: sung question, breath, shorter answer.
- Kanye West: tiny soul-chop cell, hard repeat, one arranged landing.
- Haruka Nakamura: soft ostinato, memory, suspended color.
- Marcus D: cinematic arpeggio lift, clear top note, plain resolve.
- Ljones: dusty behind-the-beat pocket and small motif.
- Nitsua: inward descending loop and unresolved nostalgia.
- Cise Starr: MC cadence grouping translated into piano rhythm.
- Uyama Hiroto: modal room, airy leap, calm color-tone descent.

These profiles should stay visible in the lesson UI as mindset, bite traits, practice target, touch target, and guardrail. They are original educational exercises, not copied songs.

### Track 8: Taste Workouts

Convert each phrase into playable forms:

- Full phrase for imitation.
- Skeleton for pocket.
- Answer tag for memory.
- Late entrance for restraint.
- Touch ghost for dynamics.

Then run focused rounds over those forms so the learner repeats one taste idea until it becomes usable vocabulary.

## Non-Goals

- Classical notation curriculum.
- Full song library.
- Copyrighted artist lessons.
- Broad DAW or production suite.
- Multiplayer.
- Long explanations before playing.
- Rewards that can be earned by random input.

## External Grounding

- Yousician emphasizes real-instrument play, lesson plans, progress tracking, and instant feedback on accuracy and timing: https://yousician.com/
- Melodics frames MIDI practice around guided paths, rhythm/timing feedback, velocity control, and structured lessons for producers: https://melodics.com/blog/beginners-guide-to-music-production
- MDN notes that Web MIDI is not universally available and requires secure contexts, so fallback input must remain first-class: https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
- Tone.js provides browser audio scheduling plus sample and sampler APIs that can support a better piano/Rhodes sound: https://tonejs.github.io/
- `smplr` provides sampled instruments, drums, bass, sequencing, and browser-hosted samples with an MIT code license: https://github.com/danigb/smplr
- BopLand provides a CC BY-SA jazz lick database intended for improvising musicians: https://bopland.org/home
- jazznet provides CC BY piano-pattern MIDI and scripts for generating new piano patterns: https://zenodo.org/records/7192653
- Jazzomat/Weimar provides a research corpus and tools for studying jazz solo improvisation patterns: https://jazzomat.hfm-weimar.de/index.html
- Impro-Visor is GPL jazz improvisation software with licks, grammars, styles, MIDI import/export, and educational jazz-advice concepts: https://github.com/Impro-Visor/Impro-Visor
- Open Music Theory is an open-source, CC BY-SA interactive music theory textbook: https://openmusictheory.github.io/
