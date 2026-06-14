import { workoutRounds } from "../data/workoutRounds";

export const masteryDimensions = [
  {
    id: "shadow",
    label: "Shadow",
    standard: "Can copy the phrase before decorating it.",
    roundId: "shadow",
    fallbackCategory: "echo"
  },
  {
    id: "recall",
    label: "Recall",
    standard: "Can produce the phrase from memory without immediate playback.",
    roundId: "recall",
    fallbackCategory: "echo"
  },
  {
    id: "pocket",
    label: "Pocket",
    standard: "Can place the lick inside the groove.",
    roundId: "pocket",
    fallbackCategory: "pocket"
  },
  {
    id: "touch",
    label: "Touch",
    standard: "Can shape velocity and weight intentionally.",
    roundId: "touch",
    fallbackCategory: "dynamics"
  },
  {
    id: "answer",
    label: "Answer",
    standard: "Can reuse the phrase ending as vocabulary.",
    roundId: "answer",
    fallbackCategory: "target"
  },
  {
    id: "twist",
    label: "Twist",
    standard: "Can vary one detail while keeping the fingerprint.",
    roundId: "twist",
    fallbackCategory: "motif"
  }
];

function scoreFromRound(roundResults, lessonId, roundId) {
  return roundResults?.[`${lessonId}:${roundId}`]?.focus ?? roundResults?.[`${lessonId}:${roundId}`]?.score ?? null;
}

function hasStrongShadowEvidence(roundResults, lessonId) {
  const result = roundResults?.[`${lessonId}:shadow`];
  return Boolean(result && result.score >= 75 && result.focus >= 75);
}

function levelFromScore(score) {
  if (score >= 86) return "clean";
  if (score >= 72) return "usable";
  if (score >= 55) return "rough";
  return "weak";
}

export function evaluateLessonMastery(lesson, progress = {}, roundResults = {}) {
  const lessonProgress = progress[lesson.id] ?? {};
  const dimensions = masteryDimensions.map((dimension) => {
    const roundScore = scoreFromRound(roundResults, lesson.id, dimension.roundId);
    const fallback = dimension.id === "shadow" ? lessonProgress.best ?? 0 : 0;
    const score = Math.max(0, Math.min(100, Math.round(roundScore ?? fallback)));
    return {
      ...dimension,
      score,
      level: levelFromScore(score),
      complete: score >= 75
    };
  });

  const average = dimensions.length
    ? Math.round(dimensions.reduce((sum, dimension) => sum + dimension.score, 0) / dimensions.length)
    : 0;
  const completeCount = dimensions.filter((dimension) => dimension.complete).length;
  const recall = dimensions.find((dimension) => dimension.id === "recall");
  const strongShadow = hasStrongShadowEvidence(roundResults, lesson.id);
  const eligibleDimensions = strongShadow ? dimensions : dimensions.filter((dimension) => dimension.id !== "recall");
  const nextDimension =
    (strongShadow && recall?.score < 75 ? recall : null) ??
    eligibleDimensions.find((dimension) => dimension.score < 55) ??
    [...eligibleDimensions].sort((a, b) => a.score - b.score)[0] ??
    dimensions[0];
  const nextRound = workoutRounds.find((round) => round.id === nextDimension.roundId) ?? workoutRounds[0];

  return {
    average,
    completeCount,
    total: dimensions.length,
    level: levelFromScore(average),
    dimensions,
    nextRound,
    nextDimension,
    readyForTaste: average >= 78 && completeCount >= 5
  };
}

export function summarizeProfessionalReadiness(lessons, progress = {}, roundResults = {}) {
  const mastery = lessons.map((lesson) => evaluateLessonMastery(lesson, progress, roundResults));
  const average = mastery.length
    ? Math.round(mastery.reduce((sum, item) => sum + item.average, 0) / mastery.length)
    : 0;
  const readyLessons = mastery.filter((item) => item.readyForTaste).length;
  return {
    average,
    readyLessons,
    totalLessons: lessons.length,
    level: levelFromScore(average),
    paidGradeSignal: average >= 75 && readyLessons >= Math.ceil(lessons.length * 0.35)
  };
}
