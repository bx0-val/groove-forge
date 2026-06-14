export const workoutRounds = [
  {
    id: "shadow",
    title: "Shadow",
    badge: "Copy",
    mode: "copy",
    variantId: "teacher",
    focus: "echo",
    instruction: (lesson) => `Copy ${lesson.title} exactly. No taste without imitation first.`,
    win: "Full phrase in your hands."
  },
  {
    id: "pocket",
    title: "Pocket Lock",
    badge: "Timing",
    mode: "copy",
    variantId: "skeleton",
    focus: "pocket",
    instruction: (lesson) => `Play the skeleton only. Make it sit in the ${lesson.groove.name}.`,
    win: "Entrance and answer sit inside the beat."
  },
  {
    id: "touch",
    title: "Touch Pass",
    badge: "Feel",
    mode: "copy",
    variantId: "touch",
    focus: "dynamics",
    instruction: (lesson) => lesson.taste?.touch ?? "Play the same idea with clear touch contrast.",
    win: "The lick breathes instead of typing itself."
  },
  {
    id: "answer",
    title: "Answer Tag",
    badge: "Memory",
    mode: "copy",
    variantId: "answer",
    focus: "target",
    instruction: () => "Practice the ending until it feels like a response you can reuse.",
    win: "The ending becomes a phrase in your vocabulary."
  },
  {
    id: "twist",
    title: "Taste Twist",
    badge: "Remix",
    mode: "vary",
    variantId: "late",
    focus: "motif",
    instruction: (lesson) => lesson.remixPrompts[0] ?? "Change one detail and keep the source behavior.",
    win: "Variation keeps the fingerprint."
  }
];
