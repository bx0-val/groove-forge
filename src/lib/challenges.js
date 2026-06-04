export const lessonSteps = [
  { id: "learn", label: "Learn", verb: "Understand the move" },
  { id: "demo", label: "Hear", verb: "Listen before playing" },
  { id: "copy", label: "Copy", verb: "Play the model phrase" },
  { id: "vary", label: "Vary", verb: "Change one thing" },
  { id: "review", label: "Review", verb: "Name what improved" }
];

export const lessons = [
  {
    id: "echo",
    title: "Call & Response",
    subtitle: "Make one phrase answer another",
    skill: "Phrase memory",
    bpm: 78,
    key: "D minor",
    rootMidi: 50,
    palette: ["D", "F", "G", "A", "C"],
    targets: ["F", "A"],
    bars: 4,
    move: "Singable question, smaller answer",
    why: "Improvising stops feeling random when your second phrase clearly answers the first. This lesson makes you copy a tiny melodic shape, then alter one thing so it still sounds related.",
    listenFor: [
      "The first phrase climbs to A, so the answer should not start from nowhere.",
      "The landing note F sounds settled because it is inside the D minor color.",
      "The rest is part of the phrase; silence tells the listener where the idea ends."
    ],
    steps: [
      "Hum the demo once before touching the keys.",
      "Copy the exact notes: D, F, A, then F, G, F.",
      "Vary only the rhythm or final note. Do not add extra notes yet."
    ],
    demoPhrase: [
      { note: "D4", beat: 0, duration: 0.7, velocity: 82 },
      { note: "F4", beat: 1, duration: 0.7, velocity: 88 },
      { note: "A4", beat: 2, duration: 1.1, velocity: 96 },
      { note: "F4", beat: 4, duration: 0.7, velocity: 78 },
      { note: "G4", beat: 5, duration: 0.7, velocity: 84 },
      { note: "F4", beat: 6, duration: 1.2, velocity: 74 }
    ],
    copyGoal: "Play the model phrase close enough that your fingers and ear agree.",
    varyGoal: "Keep the same contour, but change the rhythm or final landing.",
    reflection: "Could you sing the answer before you played it?",
    scoringWeights: { echo: 30, palette: 15, target: 20, space: 15, motif: 15, dynamics: 5 }
  },
  {
    id: "pocket",
    title: "Pocket Builder",
    subtitle: "Make two notes feel intentional",
    skill: "Timing feel",
    bpm: 88,
    key: "C dorian",
    rootMidi: 48,
    palette: ["C", "D", "Eb", "F", "G", "Bb"],
    targets: ["Eb", "Bb"],
    bars: 4,
    move: "Repeat fewer notes with better placement",
    why: "A groove does not need many notes. It needs notes that land with a pulse and leave space for the loop to breathe.",
    listenFor: [
      "The phrase waits instead of rushing into every beat.",
      "Eb gives the mode its minor color.",
      "The repeated C to Eb cell becomes a hook because it returns."
    ],
    steps: [
      "Tap the pulse before you play.",
      "Copy the C to Eb answer without filling the gaps.",
      "Vary by moving the same rhythm to G or Bb."
    ],
    demoPhrase: [
      { note: "C4", beat: 0.25, duration: 0.45, velocity: 76 },
      { note: "Eb4", beat: 1.5, duration: 0.6, velocity: 88 },
      { note: "C4", beat: 3.25, duration: 0.45, velocity: 72 },
      { note: "Eb4", beat: 4.5, duration: 0.7, velocity: 92 },
      { note: "Bb3", beat: 6.5, duration: 0.9, velocity: 82 }
    ],
    copyGoal: "Copy the waiting rhythm, not just the note names.",
    varyGoal: "Use the same rhythm with one new target note.",
    reflection: "Did the empty space make the phrase stronger?",
    scoringWeights: { echo: 25, palette: 15, target: 15, space: 30, motif: 10, dynamics: 5 }
  },
  {
    id: "color",
    title: "Minor 9 Color",
    subtitle: "Hear the note that makes it glow",
    skill: "Chord color",
    bpm: 70,
    key: "A minor 9",
    rootMidi: 45,
    palette: ["A", "B", "C", "E", "G"],
    targets: ["B", "G"],
    bars: 4,
    move: "Land on the 9th without sounding lost",
    why: "The note B over A minor is not random decoration. It is the 9th, and it creates the floating Bill Evans / lofi color when you arrive there on purpose.",
    listenFor: [
      "A and C establish minor.",
      "B sounds suspended because it is close to the root but not resolved like C.",
      "G softens the phrase and keeps it from sounding like an exercise."
    ],
    steps: [
      "Play A and C to hear the minor ground.",
      "Copy the phrase until B feels like a destination.",
      "Vary by delaying B, not by adding more scale notes."
    ],
    demoPhrase: [
      { note: "A3", beat: 0, duration: 0.8, velocity: 78 },
      { note: "C4", beat: 1, duration: 0.65, velocity: 84 },
      { note: "E4", beat: 2, duration: 0.65, velocity: 88 },
      { note: "G4", beat: 3, duration: 0.9, velocity: 78 },
      { note: "B4", beat: 5, duration: 1.3, velocity: 96 }
    ],
    copyGoal: "Make B sound like a chosen color, not a wrong note.",
    varyGoal: "Approach B later or softer, then stop.",
    reflection: "Did you hear the 9th before naming it?",
    scoringWeights: { echo: 25, palette: 20, target: 30, space: 10, motif: 10, dynamics: 5 }
  },
  {
    id: "modal",
    title: "Modal Room",
    subtitle: "Stay in one world long enough to hear it",
    skill: "Modal restraint",
    bpm: 64,
    key: "F modal",
    rootMidi: 41,
    palette: ["F", "G", "Ab", "C", "Eb"],
    targets: ["F", "Ab"],
    bars: 4,
    move: "Repeat one small cell over a drone",
    why: "A mode becomes musical when you let the listener live inside it. Repetition turns a small cell into a room instead of a scale run.",
    listenFor: [
      "The drone makes F feel like home.",
      "Ab darkens the room immediately.",
      "Repeating the same cell makes small changes easier to hear."
    ],
    steps: [
      "Listen to the F drone and hum the first two notes.",
      "Copy the small F, Ab, C cell.",
      "Vary by repeating it softer, not faster."
    ],
    demoPhrase: [
      { note: "F3", beat: 0, duration: 0.9, velocity: 78 },
      { note: "Ab3", beat: 1.5, duration: 0.9, velocity: 88 },
      { note: "C4", beat: 3, duration: 1, velocity: 82 },
      { note: "Ab3", beat: 5, duration: 0.9, velocity: 72 },
      { note: "F3", beat: 6.5, duration: 1.2, velocity: 78 }
    ],
    copyGoal: "Copy the cell and hear how Ab changes the room.",
    varyGoal: "Repeat the cell with one dynamic change.",
    reflection: "Could you keep the mood without adding notes?",
    scoringWeights: { echo: 25, palette: 20, target: 15, space: 15, motif: 20, dynamics: 5 }
  }
];

export function getLesson(id) {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0];
}
