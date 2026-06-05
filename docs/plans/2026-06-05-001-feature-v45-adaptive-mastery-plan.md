---
date: 2026-06-05
status: active
feature: v45-adaptive-mastery
origin: user request for professional-level v4.5 taste/execution tool
---

# V4.5 Adaptive Mastery Plan

## Problem Frame

Groove Forge has tasteful source lessons, artist-flow studies, groove-backed playback, phrase variants, and workout rounds. It is still not professional-grade because the app does not yet make improvement measurable or adaptive. A user can play rounds, but the product does not strongly answer: what did I improve, what is weak, what should I practice next, and why is this pedagogically coherent?

## Scope

Build a v4.5 layer that turns the current workout deck into an adaptive practice system:

- Persist workout-round outcomes across sessions.
- Compute mastery across concrete musical skills.
- Recommend the next best rep based on weak skill evidence.
- Show a professional "quality bar" in the UI without turning the app into a theory article.
- Add focused tests around mastery calculation and recommendation behavior.

## Non-Goals

- No backend, subscriptions, payments, user accounts, or analytics.
- No copyrighted recordings or exact artist transcriptions.
- No large visual redesign or landing page.
- No full pedagogy textbook in the app UI.

## Requirements Trace

- "professional level tool" -> expose objective progress and adaptive next action.
- "justify someone paying for it" -> make the app behave like a coach, not a static lesson page.
- "sound fun and pedagogical frameworks" -> align the practice loop with imitation, deliberate practice, immediate feedback, variation, and retrieval.
- "v4.5" -> ship a visible upgrade beyond previous taste/groove/workout slices.

## Implementation Units

### U1: Mastery Model

Files:

- Create: `src/lib/mastery.js`
- Modify tests: `src/lib/scoring.test.js`

Approach:

- Define skill dimensions: Shadow, Pocket, Touch, Answer, Twist.
- Map workout-round focus scores into those dimensions.
- Compute lesson mastery from persisted round results plus lesson progress.
- Return level labels and a next recommended round.

Test scenarios:

- Empty history recommends Shadow or Pocket based on no evidence.
- Weak pocket score recommends Pocket Lock.
- Complete strong round history returns high mastery and a harder next rep.

### U2: Persist Round Outcomes

Files:

- Modify: `src/App.jsx`

Approach:

- Extend local storage state to include `roundResults`.
- Preserve compatibility with existing saved state.
- Store score, focus score, round id, lesson id, variant id, timestamp, and run mode.

Test scenarios:

- Covered through rendered browser flow and unit mastery helpers.

### U3: Adaptive Coach UI

Files:

- Modify: `src/App.jsx`
- Modify: `src/styles.css`

Approach:

- Add a "Mastery matrix" panel in the feedback rail.
- Show each skill dimension with a score and standard.
- Add "Next best rep" button that starts the recommended workout round.
- Surface a compact professional bar: copy, pocket, touch, memory, twist.

Test scenarios:

- Browser QA verifies panel renders, recommendation starts a run, and no console errors.
- Mobile QA verifies no horizontal overflow.

### U4: Documentation

Files:

- Modify: `README.md`
- Modify: `STRATEGY.md`

Approach:

- State clearly that the app is not yet a complete commercial product, but v4.5 adds adaptive mastery behavior.
- Document the pedagogical loop in product language: imitate, isolate, feedback, vary, retrieve.

## Verification

- `npm test`
- `npm run build`
- `git diff --check`
- Browser QA desktop: app loads, mastery matrix renders, next rep starts a workout round.
- Browser QA mobile: mastery matrix renders without horizontal overflow.

## Risks

- The UI could become dense. Keep the mastery card compact and action-oriented.
- Mastery scores are heuristic. Label them as training signals, not absolute musicianship.
- Local storage compatibility must remain tolerant of prior saved state.
