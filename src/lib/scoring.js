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

function oneCorrection({ empty, notes, lesson, mode, echo, paletteScore, targetScore, spaceScore, motifScore, dynamicsScore, density }) {
  if (empty) {
    return {
      type: "listen",
      title: "Hear it before touching keys",
      action: "Press Hear teacher, sing the first three notes, then play only the first note back.",
      why: "The app cannot train your ear if the model phrase never enters your head first.",
      drill: "Hear, hum, play the first note, stop."
    };
  }

  if (notes.length > lesson.demoPhrase.length + 3) {
    return {
      type: "space",
      title: "Cut the extra notes",
      action: "Play the model phrase with two fewer notes than you want to add. Silence counts.",
      why: "Overplaying hides the source phrase, so the take becomes random motion instead of vocabulary.",
      drill: lesson.drillGoal ?? "Play the first half of the model, then leave a full beat of silence."
    };
  }

  if (paletteScore < 75) {
    return {
      type: "palette",
      title: "Stay inside the source color",
      action: `Use only ${lesson.palette.join(", ")} until the phrase sounds boring.`,
      why: "The note set is the style boundary. Breaking it too early turns practice into guessing.",
      drill: `Play only ${lesson.palette.slice(0, 4).join("-")} and stop.`
    };
  }

  if (density > 1.2) {
    return {
      type: "space",
      title: "Cut the extra notes",
      action: "Play the model phrase with two fewer notes than you want to add. Silence counts.",
      why: "Overplaying hides the source phrase, so the take becomes random motion instead of vocabulary.",
      drill: lesson.drillGoal ?? "Play the first half of the model, then leave a full beat of silence."
    };
  }

  if (mode === "copy" && echo.matches < lesson.demoPhrase.length) {
    const expected = lesson.demoPhrase[echo.matches]?.note?.replace(/\d$/, "") ?? lesson.demoPhrase[0].note.replace(/\d$/, "");
    return {
      type: "copy",
      title: "Copy before remixing",
      action: `Your next note should be ${expected}. Replay the teacher and match the phrase up to that note.`,
      why: "Copying builds vocabulary. Remixing before copying turns into note hunting.",
      drill: `Play only up to ${expected}, then stop.`
    };
  }

  if (targetScore < 60) {
    return {
      type: "target",
      title: "Land on the important note",
      action: `Aim the ending at ${lesson.targets.join(" or ")} and hold it long enough to hear the color.`,
      why: "Jazz lines sound intentional when important tones arrive on purpose.",
      drill: lesson.drillGoal ?? `Play one short phrase that ends on ${lesson.targets[0]}.`
    };
  }

  if (spaceScore < 55) {
    return {
      type: "space",
      title: "Leave the breath intact",
      action: "Play the phrase, then wait a full beat before answering.",
      why: "The pause is part of the source material; without it the phrase loses shape.",
      drill: "Play three notes, count one beat of silence, then answer with one note."
    };
  }

  if (motifScore < 45 && mode !== "copy") {
    return {
      type: "motif",
      title: "Bring back the source idea",
      action: "Repeat one rhythm or two-note shape from the model before inventing anything new.",
      why: "Variation works when the listener can still recognize what was varied.",
      drill: lesson.drillGoal ?? "Repeat the first two notes twice with different touch."
    };
  }

  if (dynamicsScore < 35 && notes.length > 1) {
    return {
      type: "touch",
      title: "Shape the phrase with touch",
      action: "Play the question softer and the answer slightly stronger.",
      why: "Touch makes a copied phrase sound like music instead of a typed sequence.",
      drill: "Same notes twice: first soft, second stronger."
    };
  }

  return {
    type: "success",
    title: mode === "copy" ? "Copied. Now steal it." : "Good variation. Keep it.",
    action: mode === "copy" ? lesson.varyGoal : lesson.reflection,
    why: "The take preserved the source behavior well enough to move from copying into controlled variation.",
    drill: lesson.remixPrompts?.[0] ?? lesson.drillGoal ?? "Change one detail and replay the comparison."
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

  const correction = oneCorrection({
    empty,
    notes,
    lesson,
    mode,
    echo,
    paletteScore,
    targetScore,
    spaceScore,
    motifScore,
    dynamicsScore,
    density
  });

  const nextStep = correction.action;

  return { score, categories, nextStep, correction, noteCount: notes.length, echoMatches: echo.matches };
}

export function phraseToMidiNotes(phrase) {
  return phrase.map((item) => ({ ...item, midi: noteToMidi(item.note), pitchClass: pitchClass(item.note) }));
}
