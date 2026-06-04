export const lessons = [
  {
    id: "echo",
    title: "Call & Response",
    subtitle: "Hear it, find it, vary it",
    bpm: 78,
    key: "D minor",
    palette: ["D", "F", "G", "A", "C"],
    targets: ["F", "A"],
    bars: 4,
    instruction: "Echo the phrase shape, then answer it with one small rhythmic change.",
    prompt: "D - F - A ... F - G - F",
    scoringWeights: { palette: 20, target: 25, space: 20, motif: 25, dynamics: 10 }
  },
  {
    id: "pocket",
    title: "Pocket Builder",
    subtitle: "Two notes can groove",
    bpm: 90,
    key: "C dorian",
    palette: ["C", "D", "Eb", "F", "G", "Bb"],
    targets: ["Eb", "Bb"],
    bars: 8,
    instruction: "Play short phrases behind the click. Leave the second half of each bar open.",
    prompt: "Use no more than three notes per bar.",
    scoringWeights: { palette: 20, target: 15, space: 30, motif: 15, dynamics: 20 }
  },
  {
    id: "color",
    title: "Minor 9 Color",
    subtitle: "Bill Evans without the textbook",
    bpm: 70,
    key: "A minor 9",
    palette: ["A", "B", "C", "E", "G"],
    targets: ["B", "G"],
    bars: 4,
    instruction: "Make the 9th feel intentional. Land on B or G at phrase endings.",
    prompt: "A C E G B is the color. Aim for B late.",
    scoringWeights: { palette: 25, target: 30, space: 15, motif: 20, dynamics: 10 }
  },
  {
    id: "modal",
    title: "Lateef Modal Room",
    subtitle: "Drone, restraint, character",
    bpm: 64,
    key: "F modal",
    palette: ["F", "G", "Ab", "C", "Eb"],
    targets: ["F", "Ab"],
    bars: 6,
    instruction: "Treat the bass as a room. Repeat one idea until it changes meaning.",
    prompt: "Stay sparse. Repeat a motif three times.",
    scoringWeights: { palette: 20, target: 15, space: 20, motif: 35, dynamics: 10 }
  }
];

export function getLesson(id) {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0];
}
