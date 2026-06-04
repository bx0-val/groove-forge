export const lessonSteps = [
  { id: "source", label: "Source", verb: "Know what you are stealing" },
  { id: "demo", label: "Hear", verb: "Listen before labels" },
  { id: "ear", label: "Ear", verb: "Name the motion" },
  { id: "copy", label: "Copy", verb: "Match the phrase" },
  { id: "compare", label: "Compare", verb: "Hear the gap" },
  { id: "fix", label: "Fix", verb: "Drill one thing" },
  { id: "vary", label: "Twist", verb: "Change one detail" }
];

export const lessons = [
  {
    id: "bopland-ii-v-i",
    title: "ii-V-I Doorway",
    subtitle: "Steal the outline, not random notes",
    world: "Ryo / bebop entry",
    level: "V3.0 Mission 1",
    skill: "Resolution vocabulary",
    bpm: 82,
    key: "C major over Dm7-G7-Cmaj",
    rootMidi: 50,
    palette: ["D", "E", "F", "G", "A", "B", "C"],
    targets: ["B", "E", "C"],
    bars: 4,
    source: {
      name: "BopLand treble-clef Major 2-5-1 lick collection",
      url: "https://bopland.org/database#treble-clef-licks/Major+2+5+1",
      license: "CC BY-SA 4.0",
      adaptation: "Beginner piano adaptation of the BopLand ii-V-I vocabulary category: chord outline first, stepwise resolution second."
    },
    progression: ["Dm7", "G7", "Cmaj7"],
    move: "Outline Dm7, then let G7 fall into C",
    why: "This is the jazz doorway. A ii-V-I line stops sounding like scale wandering when the first half names the chord and the second half resolves with gravity.",
    stealThis: "Climb through a chord shape, then answer by step into a guide tone.",
    listenFor: [
      "D-F-A-C says Dm7 without needing a left-hand chord.",
      "B is the guide tone that makes G7 want to resolve.",
      "E to C feels like arrival instead of just stopping."
    ],
    anatomy: [
      { label: "Chord outline", detail: "D-F-A-C is a stacked Dm7 shape turned into melody." },
      { label: "Guide tone", detail: "B is the third of G7 and points toward C major." },
      { label: "Landing", detail: "E-C gives the line a clear ending instead of a scale finish." }
    ],
    earCheck: {
      question: "After the phrase climbs, what happens?",
      options: ["It falls into the home chord", "It keeps climbing forever", "It repeats the same note"],
      answer: 0,
      success: "Right. Hear the climb first, then the resolution.",
      miss: "Listen again for the moment the line stops climbing and starts resolving."
    },
    steps: [
      "Hear the phrase once with no note names.",
      "Copy the exact contour: D, F, A, C, then B, G, E, C.",
      "For the twist, keep D-F-A-C and change only the final landing."
    ],
    demoPhrase: [
      { note: "D4", beat: 0, duration: 0.55, velocity: 78 },
      { note: "F4", beat: 0.75, duration: 0.55, velocity: 86 },
      { note: "A4", beat: 1.5, duration: 0.55, velocity: 92 },
      { note: "C5", beat: 2.25, duration: 0.8, velocity: 96 },
      { note: "B4", beat: 4, duration: 0.55, velocity: 90 },
      { note: "G4", beat: 5, duration: 0.55, velocity: 82 },
      { note: "E4", beat: 6, duration: 0.55, velocity: 78 },
      { note: "C4", beat: 7.25, duration: 1.05, velocity: 74 }
    ],
    copyGoal: "Copy the source line before decorating it.",
    varyGoal: "Keep the D-F-A-C opening and change only the last two notes.",
    drillGoal: "Play only B-G-E-C until the resolution feels inevitable.",
    remixPrompts: ["Move the ending to E instead of C.", "Delay B by half a beat.", "Play the first four notes softer."],
    reflection: "Could you hear the line resolving before you knew the note names?",
    scoringWeights: { echo: 30, palette: 15, target: 25, space: 10, motif: 15, dynamics: 5 }
  },
  {
    id: "guide-tone-thread",
    title: "Guide-Tone Thread",
    subtitle: "Make harmony audible with two-note gravity",
    world: "Bill Evans color",
    level: "V3.0 Mission 2",
    skill: "Guide-tone hearing",
    bpm: 74,
    key: "F major over Gm7-C7-Fmaj",
    rootMidi: 43,
    palette: ["G", "A", "Bb", "C", "D", "E", "F"],
    targets: ["Bb", "E", "A"],
    bars: 4,
    source: {
      name: "Open Music Theory jazz voicings / guide-tone voice leading",
      url: "https://viva.pressbooks.pub/openmusictheory/chapter/jazz-voicings/",
      license: "CC BY-SA 4.0",
      adaptation: "Turns the guide-tone voice-leading concept into a right-hand melodic thread for beginner copy-and-answer practice."
    },
    progression: ["Gm7", "C7", "Fmaj7"],
    move: "Let the 3rd and 7th pull the line",
    why: "Guide tones are the small notes that make a chord progression sound like it is moving somewhere. You do not need many notes when the important ones land clearly.",
    stealThis: "Target thirds and sevenths on strong beats; use passing notes only to connect them.",
    listenFor: [
      "Bb gives Gm7 its minor color.",
      "E turns C7 bright and unstable.",
      "A settles as the major color over F."
    ],
    anatomy: [
      { label: "Gm7 color", detail: "Bb is the third. It tells the ear this is minor." },
      { label: "C7 pull", detail: "E is the third of C7 and wants to move." },
      { label: "Fmaj arrival", detail: "A is the third of F and sounds open, not final-heavy." }
    ],
    earCheck: {
      question: "Which note sounds like the bright dominant color?",
      options: ["E", "F", "C"],
      answer: 0,
      success: "Yes. E is the C7 color that makes the progression move.",
      miss: "Listen for the note that feels brighter and more unstable than the rest."
    },
    steps: [
      "Hear Bb, E, and A as destinations, not passing notes.",
      "Copy the phrase and make each target a little stronger.",
      "Vary by changing the passing notes, not the guide-tone landings."
    ],
    demoPhrase: [
      { note: "Bb3", beat: 0, duration: 0.85, velocity: 84 },
      { note: "D4", beat: 1, duration: 0.5, velocity: 74 },
      { note: "F4", beat: 2, duration: 0.5, velocity: 78 },
      { note: "E4", beat: 3, duration: 0.95, velocity: 92 },
      { note: "G4", beat: 4.5, duration: 0.45, velocity: 76 },
      { note: "A4", beat: 5.5, duration: 1.1, velocity: 90 },
      { note: "F4", beat: 7, duration: 0.9, velocity: 72 }
    ],
    copyGoal: "Land Bb, E, and A with intention.",
    varyGoal: "Keep the target notes and change only the connector notes.",
    drillGoal: "Play Bb, then E, then A on strong beats. Nothing else.",
    remixPrompts: ["Start softer on Bb.", "Delay E by half a beat.", "End on F after A."],
    reflection: "Did the chord movement become audible without a left-hand voicing?",
    scoringWeights: { echo: 25, palette: 15, target: 30, space: 10, motif: 15, dynamics: 5 }
  },
  {
    id: "chet-breath",
    title: "Breath Before Notes",
    subtitle: "A phrase needs lungs",
    world: "Chet Baker restraint",
    level: "V3.0 Mission 3",
    skill: "Space and response",
    bpm: 68,
    key: "C major / A minor",
    rootMidi: 48,
    palette: ["C", "D", "E", "G", "A"],
    targets: ["E", "G", "C"],
    bars: 4,
    source: {
      name: "Foundations of Aural Skills call-and-response practice",
      url: "https://uen.pressbooks.pub/auralskills/chapter/call-and-response/",
      license: "CC BY",
      adaptation: "Uses the call-response requirement to make the player answer a short phrase with equal length and clear intention."
    },
    progression: ["C6", "Am7"],
    move: "Sing, breathe, answer",
    why: "Chet-like phrasing is not about many notes. It is about sounding like a person breathing. The silence is not empty; it sets up the answer.",
    stealThis: "Leave the middle empty. Let the answer be shorter than the question.",
    listenFor: [
      "The first three notes ask a question.",
      "The rest is long enough to feel like breath.",
      "The answer lands lower and calmer."
    ],
    anatomy: [
      { label: "Question", detail: "G-A-C rises like a sung pickup." },
      { label: "Breath", detail: "Two beats of silence make the answer feel human." },
      { label: "Answer", detail: "E-D-C comes down and closes the thought." }
    ],
    earCheck: {
      question: "What makes this phrase feel less like an exercise?",
      options: ["The silence before the answer", "The number of notes", "The top note only"],
      answer: 0,
      success: "Exactly. The breath is the lesson.",
      miss: "Listen again and count the empty space before the answer."
    },
    steps: [
      "Sing the first three notes before playing.",
      "Do not fill the gap.",
      "Answer with fewer notes than you want to play."
    ],
    demoPhrase: [
      { note: "G4", beat: 0, duration: 0.55, velocity: 72 },
      { note: "A4", beat: 1.25, duration: 0.55, velocity: 82 },
      { note: "C5", beat: 2.5, duration: 1.1, velocity: 90 },
      { note: "E4", beat: 5.25, duration: 0.55, velocity: 74 },
      { note: "D4", beat: 6.25, duration: 0.55, velocity: 70 },
      { note: "C4", beat: 7.25, duration: 1.05, velocity: 68 }
    ],
    copyGoal: "Copy the silence as precisely as the notes.",
    varyGoal: "Keep the breath and change only the answer ending.",
    drillGoal: "Play G-A-C, wait two beats, then answer with C only.",
    remixPrompts: ["Make the answer softer.", "End on E instead of C.", "Wait one extra half beat."],
    reflection: "Did the silence make the line sound more intentional?",
    scoringWeights: { echo: 25, palette: 10, target: 15, space: 35, motif: 10, dynamics: 5 }
  },
  {
    id: "evans-minor-9",
    title: "Minor 9 Glow",
    subtitle: "Make the color note feel chosen",
    world: "Bill Evans / lofi color",
    level: "V3.0 Mission 4",
    skill: "Color-tone landing",
    bpm: 70,
    key: "A minor 9",
    rootMidi: 45,
    palette: ["A", "B", "C", "D", "E", "G"],
    targets: ["B", "G"],
    bars: 4,
    source: {
      name: "Open Music Theory jazz extensions and voicing concepts",
      url: "https://viva.pressbooks.pub/openmusictheory/chapter/jazz-voicings/",
      license: "CC BY-SA 4.0",
      adaptation: "Turns the minor 9 color into a melodic target-note mission instead of a chord-symbol explanation."
    },
    progression: ["Am9"],
    move: "Aim at the 9th, then stop",
    why: "The 9th over a minor chord is the floating sound you keep reaching for. It only sounds tasteful when you arrive on it like you meant it.",
    stealThis: "Set the minor ground first, then let B glow as the destination.",
    listenFor: [
      "A and C establish the minor room.",
      "E gives the phrase stability before color.",
      "B floats because it is close to A but not resolved like C."
    ],
    anatomy: [
      { label: "Minor ground", detail: "A-C-E tells your ear where home is." },
      { label: "Soft color", detail: "G loosens the chord before the 9th appears." },
      { label: "Glow note", detail: "B is the 9th. Hold it like a destination." }
    ],
    earCheck: {
      question: "Which note is the color landing?",
      options: ["B", "C", "E"],
      answer: 0,
      success: "Yes. B is the note that makes A minor float.",
      miss: "Listen for the note that feels suspended but not wrong."
    },
    steps: [
      "Play A-C-E as the room.",
      "Copy the phrase and hold B long enough to hear the color.",
      "Vary by delaying B, not by adding more notes."
    ],
    demoPhrase: [
      { note: "A3", beat: 0, duration: 0.8, velocity: 76 },
      { note: "C4", beat: 1, duration: 0.65, velocity: 82 },
      { note: "E4", beat: 2, duration: 0.65, velocity: 88 },
      { note: "G4", beat: 3.5, duration: 0.8, velocity: 78 },
      { note: "B4", beat: 5, duration: 1.4, velocity: 94 }
    ],
    copyGoal: "Make B sound like a chosen color, not a wrong note.",
    varyGoal: "Approach B later or softer, then stop.",
    drillGoal: "Play A-C-E, then land on B and hold it.",
    remixPrompts: ["Approach B from C.", "Play B softer.", "End by falling from B to A."],
    reflection: "Could you hear the 9th before naming it?",
    scoringWeights: { echo: 25, palette: 20, target: 30, space: 10, motif: 10, dynamics: 5 }
  },
  {
    id: "lateef-modal-cell",
    title: "Modal Cell Room",
    subtitle: "Stay long enough to hear the mode",
    world: "Yusuf Lateef restraint",
    level: "V3.0 Mission 5",
    skill: "Modal repetition",
    bpm: 64,
    key: "D dorian",
    rootMidi: 50,
    palette: ["D", "E", "F", "G", "A", "B", "C"],
    targets: ["D", "F", "A"],
    bars: 4,
    source: {
      name: "Open Music Theory jazz/chord-scale modal practice",
      url: "https://viva.pressbooks.pub/openmusictheorycopy/part/jazz/",
      license: "CC BY-SA 4.0",
      adaptation: "Simplifies modal improvisation into a repeated three-note cell over a drone-like root."
    },
    progression: ["D dorian drone"],
    move: "Repeat the cell until the room appears",
    why: "Modal playing is not scale running. It is restraint. A tiny cell repeated with slight touch changes will sound more musical than seven notes sprayed across the keyboard.",
    stealThis: "Repeat D-F-A, then answer with one lower return.",
    listenFor: [
      "D holds the room together.",
      "F darkens the mode immediately.",
      "A keeps the phrase open enough to repeat."
    ],
    anatomy: [
      { label: "Drone root", detail: "D is not just a note. It is the floor." },
      { label: "Minor color", detail: "F tells the ear this is not bright major." },
      { label: "Cell memory", detail: "Repeating D-F-A makes small changes audible." }
    ],
    earCheck: {
      question: "What makes this modal instead of a scale run?",
      options: ["Repeating a small cell", "Using every note", "Playing faster"],
      answer: 0,
      success: "Right. Repetition makes the mode feel like a place.",
      miss: "Listen for the same small shape returning."
    },
    steps: [
      "Copy D-F-A without adding scale notes.",
      "Repeat the cell softer the second time.",
      "Vary by changing touch, not speed."
    ],
    demoPhrase: [
      { note: "D4", beat: 0, duration: 0.75, velocity: 78 },
      { note: "F4", beat: 1.5, duration: 0.75, velocity: 88 },
      { note: "A4", beat: 3, duration: 1, velocity: 84 },
      { note: "D4", beat: 5, duration: 0.65, velocity: 70 },
      { note: "F4", beat: 6, duration: 0.65, velocity: 76 },
      { note: "D4", beat: 7, duration: 1.1, velocity: 72 }
    ],
    copyGoal: "Copy the cell and keep the mode intact.",
    varyGoal: "Repeat the cell with one touch change.",
    drillGoal: "Play D-F-A twice; second time softer.",
    remixPrompts: ["Answer A with G.", "Repeat D-F only.", "Make the second cell quieter."],
    reflection: "Could you keep the room without adding notes?",
    scoringWeights: { echo: 25, palette: 20, target: 15, space: 15, motif: 20, dynamics: 5 }
  },
  {
    id: "jazznet-turnaround",
    title: "Turnaround Pocket",
    subtitle: "Make I-vi-ii-V feel like a loop",
    world: "Nujabes / Ryo loop room",
    level: "V3.0 Mission 6",
    skill: "Progression memory",
    bpm: 88,
    key: "G major I-vi-ii-V",
    rootMidi: 43,
    palette: ["G", "A", "B", "C", "D", "E", "F#"],
    targets: ["B", "E", "A", "F#"],
    bars: 4,
    source: {
      name: "jazznet CC BY piano-pattern MIDI progression categories",
      url: "https://zenodo.org/records/7192653",
      license: "CC BY 4.0",
      adaptation: "Uses the jazznet I-vi-ii-V progression family as a beginner loop mission with a playable right-hand contour."
    },
    progression: ["Gmaj7", "Em7", "Am7", "D7"],
    move: "Make the turnaround cycle without overplaying",
    why: "A lot of jazz and lofi vocabulary lives inside this loop. If you can hear the cycle and land one useful note per chord, your hands stop guessing.",
    stealThis: "Use one target per chord, then let the loop breathe.",
    listenFor: [
      "B colors G major.",
      "E pulls the phrase into the minor chord.",
      "A and F# make the ii-V want to loop back."
    ],
    anatomy: [
      { label: "I", detail: "B is the third of G and starts the loop clearly." },
      { label: "vi", detail: "E names the Em7 chord without a full arpeggio." },
      { label: "ii-V", detail: "A to F# points the ear back around." }
    ],
    earCheck: {
      question: "What is the loop doing?",
      options: ["Cycling through chord targets", "Sitting on one drone", "Climbing a full scale"],
      answer: 0,
      success: "Yes. One target per chord makes the loop audible.",
      miss: "Listen for the target note changing with each chord."
    },
    steps: [
      "Copy the four target notes first: B, E, A, F#.",
      "Add only the connector notes from the model.",
      "Vary by delaying one target, not by adding a run."
    ],
    demoPhrase: [
      { note: "B3", beat: 0, duration: 0.55, velocity: 76 },
      { note: "D4", beat: 0.75, duration: 0.4, velocity: 70 },
      { note: "E4", beat: 2, duration: 0.75, velocity: 84 },
      { note: "G4", beat: 2.75, duration: 0.45, velocity: 74 },
      { note: "A4", beat: 4, duration: 0.75, velocity: 88 },
      { note: "C5", beat: 4.75, duration: 0.45, velocity: 76 },
      { note: "F#4", beat: 6, duration: 1.1, velocity: 90 },
      { note: "D4", beat: 7.25, duration: 0.65, velocity: 70 }
    ],
    copyGoal: "Copy the loop targets before adding connector notes.",
    varyGoal: "Keep B, E, A, and F# but change one entrance.",
    drillGoal: "Play B, E, A, F# on beats 1, 3, 5, and 7.",
    remixPrompts: ["Delay E by half a beat.", "End on G after F#.", "Play only the four targets."],
    reflection: "Did you hear the chord loop instead of a pile of notes?",
    scoringWeights: { echo: 25, palette: 15, target: 30, space: 10, motif: 15, dynamics: 5 }
  }
];

export function getLesson(id) {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0];
}
