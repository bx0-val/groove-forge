import { noteToMidi, pitchClass, pitchInSet } from "./music";

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function rhythmBucket(event, start, beatMs) {
  return Math.round((event.timestamp - start) / beatMs);
}

function expectedPitchClasses(lesson) {
  return lesson.demoPhrase.map((note) => pitchClass(note.note));
}

function copyScore(notes, lesson, startedAt, beatMs) {
  if (!notes.length) {
    return {
      score: 0,
      detail: "Listen to the model, then play the first note back before adding anything.",
      matches: 0
    };
  }

  const expected = expectedPitchClasses(lesson);
  const compared = notes.slice(0, expected.length);
  const matches = compared.filter((event, index) => pitchClass(event.midi) === expected[index]).length;
  const pitchScore = clamp((matches / expected.length) * 100);

  const timingScores = compared.map((event, index) => {
    const expectedBeat = lesson.demoPhrase[index]?.beat ?? index;
    const playedBeat = (event.timestamp - startedAt) / beatMs;
    const drift = Math.abs(playedBeat - expectedBeat);
    return clamp(100 - drift * 42);
  });
  const timingScore = timingScores.length
    ? clamp(timingScores.reduce((sum, value) => sum + value, 0) / timingScores.length)
    : 0;

  return {
    score: clamp(pitchScore * 0.72 + timingScore * 0.28),
    detail:
      matches === expected.length
        ? "The model phrase is in your fingers. Now change one thing on purpose."
        : `${matches}/${expected.length} notes matched the model. Copy before you decorate.`,
    matches
  };
}

export function scoreTake(events, lesson, startedAt, mode = "vary") {
  const notes = events.filter((event) => event.type === "noteon");
  const weights = lesson.scoringWeights;
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const empty = notes.length === 0;
  const beatMs = 60000 / lesson.bpm;

  const inPalette = notes.filter((event) => pitchInSet(event.midi, lesson.palette)).length;
  const targetHits = notes.filter((event) => pitchInSet(event.midi, lesson.targets)).length;
  const paletteScore = empty ? 0 : clamp((inPalette / notes.length) * 100);
  const targetScore = empty ? 0 : clamp(Math.min(1, targetHits / Math.max(1, Math.ceil(notes.length / 4))) * 100);

  const elapsedBeats = notes.length ? Math.max(1, (notes.at(-1).timestamp - startedAt) / beatMs) : lesson.bars * 4;
  const density = notes.length / Math.max(1, elapsedBeats);
  const spaceScore = empty ? 0 : clamp(100 - Math.max(0, density - 0.85) * 58 - Math.max(0, 0.22 - density) * 70);

  const buckets = new Map();
  notes.forEach((event) => {
    const key = `${pitchClass(event.midi)}@${rhythmBucket(event, startedAt, beatMs) % 8}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  });
  const repeats = [...buckets.values()].filter((value) => value > 1).reduce((sum, value) => sum + value, 0);
  const motifScore = clamp(Math.min(1, repeats / 3) * 100);

  const velocities = notes.map((event) => event.velocity);
  const velocitySpread = velocities.length > 1 ? Math.max(...velocities) - Math.min(...velocities) : 0;
  const dynamicsScore = clamp(Math.min(1, velocitySpread / 38) * 100);
  const echo = copyScore(notes, lesson, startedAt, beatMs);

  const categories = [
    {
      id: "echo",
      label: mode === "copy" ? "Copy the model" : "Keep the motif",
      score: mode === "copy" ? echo.score : Math.max(echo.score, motifScore),
      detail: mode === "copy" ? echo.detail : motifScore > 55 ? "Your variation still sounds related to the model." : "Bring back part of the model phrase so this is variation, not wandering."
    },
    {
      id: "palette",
      label: "Stay in the color",
      score: paletteScore,
      detail: empty ? `Use only ${lesson.palette.join(", ")} first.` : `${inPalette}/${notes.length} notes stayed inside ${lesson.key}.`
    },
    {
      id: "target",
      label: "Land somewhere",
      score: targetScore,
      detail: targetHits ? `You found ${lesson.targets.join(" or ")} as a landing color.` : `Aim an ending at ${lesson.targets.join(" or ")} so the phrase resolves.`
    },
    {
      id: "space",
      label: "Leave space",
      score: spaceScore,
      detail: empty ? "Play the phrase, then stop. The rest is part of the line." : density > 1.15 ? "Too dense. You are covering the groove instead of answering it." : "The phrase leaves enough air to hear the groove."
    },
    {
      id: "motif",
      label: "Repeat one idea",
      score: motifScore,
      detail: repeats ? "A small pitch/rhythm cell returned, so the line has memory." : "Repeat one small shape before inventing a new one."
    },
    {
      id: "dynamics",
      label: "Shape touch",
      score: dynamicsScore,
      detail: velocitySpread ? "Your touch changed enough to create shape." : "Try one soft note and one stronger note so the phrase breathes."
    }
  ];

  const score = clamp(
    categories
      .filter((category) => weights[category.id])
      .reduce((sum, category) => sum + category.score * weights[category.id], 0) / totalWeight
  );

  const nextStep =
    empty
      ? "Press Hear first, hum the phrase, then play only the model notes."
      : mode === "copy" && echo.matches >= lesson.demoPhrase.length
        ? lesson.reflection
      : mode === "copy" && echo.matches < lesson.demoPhrase.length
        ? "Stay in copy mode until the model phrase feels boring. Then vary it."
      : score > 82
          ? lesson.reflection
          : score > 62
            ? mode === "copy" ? "Copy again with fewer timing drifts." : "Keep the same idea and move only the ending."
            : "Slow down: sing it, play it, then leave a full beat of silence.";

  return { score, categories, nextStep, noteCount: notes.length, echoMatches: echo.matches };
}

export function phraseToMidiNotes(phrase) {
  return phrase.map((item) => ({ ...item, midi: noteToMidi(item.note), pitchClass: pitchClass(item.note) }));
}
