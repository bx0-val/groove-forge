import { pitchClass } from "./music";

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function rhythmBucket(event, start, beatMs) {
  return Math.round((event.timestamp - start) / beatMs);
}

export function scoreTake(events, lesson, startedAt) {
  const notes = events.filter((event) => event.type === "noteon");
  const weights = lesson.scoringWeights;
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const empty = notes.length === 0;
  const beatMs = 60000 / lesson.bpm;

  const inPalette = notes.filter((event) => lesson.palette.includes(event.pitchClass)).length;
  const targetHits = notes.filter((event) => lesson.targets.includes(event.pitchClass)).length;
  const paletteScore = empty ? 0 : clamp((inPalette / notes.length) * 100);
  const targetScore = empty ? 0 : clamp(Math.min(1, targetHits / Math.max(2, Math.ceil(notes.length / 4))) * 100);

  const elapsedBeats = notes.length ? Math.max(1, (notes.at(-1).timestamp - startedAt) / beatMs) : lesson.bars * 4;
  const density = notes.length / Math.max(1, elapsedBeats);
  const spaceScore = empty ? 0 : clamp(100 - Math.max(0, density - 0.9) * 55 - Math.max(0, 0.25 - density) * 80);

  const buckets = new Map();
  notes.forEach((event) => {
    const key = `${pitchClass(event.midi)}@${rhythmBucket(event, startedAt, beatMs) % 8}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  });
  const repeats = [...buckets.values()].filter((value) => value > 1).reduce((sum, value) => sum + value, 0);
  const motifScore = clamp(Math.min(1, repeats / 4) * 100);

  const velocities = notes.map((event) => event.velocity);
  const velocitySpread = velocities.length > 1 ? Math.max(...velocities) - Math.min(...velocities) : 0;
  const dynamicsScore = clamp(Math.min(1, velocitySpread / 45) * 100);

  const categories = [
    {
      id: "palette",
      label: "Note palette",
      score: paletteScore,
      detail: empty ? "Play notes from the allowed color set." : `${inPalette}/${notes.length} notes stayed inside ${lesson.key}.`
    },
    {
      id: "target",
      label: "Target landing",
      score: targetScore,
      detail: targetHits ? `You resolved on ${lesson.targets.join(" or ")}.` : `Aim phrase endings at ${lesson.targets.join(" or ")}.`
    },
    {
      id: "space",
      label: "Space",
      score: spaceScore,
      detail: empty ? "Play a short phrase, then stop before it becomes clutter." : density > 1.2 ? "Too dense. Leave rests so phrases can breathe." : "The phrase density leaves room for groove."
    },
    {
      id: "motif",
      label: "Motif",
      score: motifScore,
      detail: repeats ? "A recognizable rhythmic/pitch cell came back." : "Repeat one tiny idea before adding more notes."
    },
    {
      id: "dynamics",
      label: "Dynamics",
      score: dynamicsScore,
      detail: velocitySpread ? "Velocity changed enough to shape the line." : "Try soft-to-loud or loud-to-soft phrasing."
    }
  ];

  const score = clamp(
    categories.reduce((sum, category) => sum + category.score * weights[category.id], 0) / totalWeight
  );

  const nextStep =
    empty
      ? "Start with three notes, leave space, and land on the target."
      : score > 82
      ? "Keep the motif and move it to a new target note."
      : score > 62
        ? "Repeat the run with fewer notes and a clearer landing."
        : "Slow down: echo the prompt, then answer with only three notes.";

  return { score, categories, nextStep, noteCount: notes.length };
}
