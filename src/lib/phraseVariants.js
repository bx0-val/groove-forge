function clampBeat(value, maxBeat) {
  return Math.max(0, Math.min(maxBeat, value));
}

function fitPhrase(phrase, bars) {
  const maxBeat = bars * 4 - 0.6;
  return phrase.map((note) => ({
    ...note,
    beat: clampBeat(note.beat, maxBeat),
    duration: Math.min(note.duration, Math.max(0.35, bars * 4 - note.beat))
  }));
}

function firstMotif(lesson) {
  const limit = Math.max(3, Math.ceil(lesson.demoPhrase.length * 0.45));
  return lesson.demoPhrase.slice(0, limit).map((note) => ({ ...note, velocity: Math.max(50, note.velocity - 8) }));
}

function answerTag(lesson) {
  const tail = lesson.demoPhrase.slice(Math.max(0, lesson.demoPhrase.length - 4));
  const startBeat = tail[0]?.beat ?? 0;
  return tail.map((note) => ({
    ...note,
    beat: Math.max(0, note.beat - startBeat + 1.5),
    velocity: Math.min(112, note.velocity + 4)
  }));
}

function delayedEntrance(lesson) {
  return fitPhrase(
    lesson.demoPhrase.map((note, index) => ({
      ...note,
      beat: note.beat + 0.5,
      velocity: index === 0 ? Math.max(48, note.velocity - 14) : note.velocity
    })),
    lesson.bars
  );
}

function touchGhost(lesson) {
  return lesson.demoPhrase.map((note, index) => ({
    ...note,
    duration: Math.max(0.28, note.duration * 0.82),
    velocity: index % 2 === 0 ? Math.max(46, note.velocity - 20) : Math.min(112, note.velocity + 8)
  }));
}

export function buildPhraseVariants(lesson) {
  return [
    {
      id: "teacher",
      title: "Teacher lick",
      label: "Full",
      rule: "Copy the complete phrase before changing it.",
      phrase: lesson.demoPhrase
    },
    {
      id: "skeleton",
      title: "Pocket skeleton",
      label: "Pocket",
      rule: "Play only the core notes and make the entrance feel locked.",
      phrase: firstMotif(lesson)
    },
    {
      id: "answer",
      title: "Answer tag",
      label: "Answer",
      rule: "Practice the ending as a memorable response.",
      phrase: answerTag(lesson)
    },
    {
      id: "late",
      title: "Late entrance",
      label: "Late",
      rule: "Let the groove speak first, then enter half a beat later.",
      phrase: delayedEntrance(lesson)
    },
    {
      id: "touch",
      title: "Touch ghost",
      label: "Touch",
      rule: "Same contour, exaggerated touch contrast.",
      phrase: touchGhost(lesson)
    }
  ];
}

export function applyPhraseVariant(lesson, variant) {
  return {
    ...lesson,
    demoPhrase: variant?.phrase ?? lesson.demoPhrase,
    activeVariant: variant ?? null
  };
}
