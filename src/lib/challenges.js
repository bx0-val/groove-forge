import { sourceFragments } from "../data/sourceFragments";
import { getGroovePattern } from "../data/groovePatterns";
import { getTasteProfile } from "../data/tasteProfiles";

function sourceFrom(fragment) {
  return {
    fragmentId: fragment.id,
    name: fragment.sourceName,
    url: fragment.sourceUrl,
    license: fragment.license,
    kind: fragment.sourceKind,
    idea: fragment.sourceIdea,
    material: fragment.extractedMaterial,
    adaptation: fragment.beginnerAdaptation,
    sourceFile: fragment.sourceFile,
    sourceTool: fragment.sourceTool
  };
}

function tasteFrom(id) {
  const profile = getTasteProfile(id);
  if (!profile) throw new Error(`Unknown taste profile: ${id}`);
  return profile;
}

function grooveFrom(id) {
  return getGroovePattern(id);
}

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
    taste: tasteFrom("nujabes"),
    groove: grooveFrom("swingBrush"),
    level: "V3.0 Mission 1",
    unlock: { type: "open", label: "Start here" },
    skill: "Resolution vocabulary",
    bpm: 82,
    key: "C major over Dm7-G7-Cmaj",
    rootMidi: 50,
    palette: ["D", "E", "F", "G", "A", "B", "C"],
    targets: ["B", "E", "C"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.boplandMajor251Outline)
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
    demoPhrase: sourceFragments.boplandMajor251Outline.demoPhrase,
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
    taste: tasteFrom("haruka-nakamura"),
    groove: grooveFrom("swingBrush"),
    level: "V3.0 Mission 2",
    unlock: { type: "previous", lessonId: "bopland-ii-v-i", minScore: 75, label: "Pass ii-V-I Doorway" },
    skill: "Guide-tone hearing",
    bpm: 74,
    key: "F major over Gm7-C7-Fmaj",
    rootMidi: 43,
    palette: ["G", "A", "Bb", "C", "D", "E", "F"],
    targets: ["Bb", "E", "A"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.openTheoryGuideTones)
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
    demoPhrase: sourceFragments.openTheoryGuideTones.demoPhrase,
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
    taste: tasteFrom("chet-baker"),
    groove: grooveFrom("breathBallad"),
    level: "V3.0 Mission 3",
    unlock: { type: "previous", lessonId: "guide-tone-thread", minScore: 75, label: "Pass Guide-Tone Thread" },
    skill: "Space and response",
    bpm: 68,
    key: "C major / A minor",
    rootMidi: 48,
    palette: ["C", "D", "E", "G", "A"],
    targets: ["E", "G", "C"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.auralSkillsCallResponse)
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
    demoPhrase: sourceFragments.auralSkillsCallResponse.demoPhrase,
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
    taste: tasteFrom("nitsua"),
    groove: grooveFrom("inwardLoop"),
    level: "V3.0 Mission 4",
    unlock: { type: "previous", lessonId: "chet-breath", minScore: 75, label: "Pass Breath Before Notes" },
    skill: "Color-tone landing",
    bpm: 70,
    key: "A minor 9",
    rootMidi: 45,
    palette: ["A", "B", "C", "D", "E", "G"],
    targets: ["B", "G"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.openTheoryMinor9)
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
    demoPhrase: sourceFragments.openTheoryMinor9.demoPhrase,
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
    taste: tasteFrom("uyama-hiroto"),
    groove: grooveFrom("modalAir"),
    level: "V3.0 Mission 5",
    unlock: { type: "previous", lessonId: "evans-minor-9", minScore: 75, label: "Pass Minor 9 Glow" },
    skill: "Modal repetition",
    bpm: 64,
    key: "D dorian",
    rootMidi: 50,
    palette: ["D", "E", "F", "G", "A", "B", "C"],
    targets: ["D", "F", "A"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.openTheoryModalCell)
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
    demoPhrase: sourceFragments.openTheoryModalCell.demoPhrase,
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
    taste: tasteFrom("nujabes"),
    groove: grooveFrom("jazzhopRoom"),
    level: "V3.0 Mission 6",
    unlock: { type: "previous", lessonId: "lateef-modal-cell", minScore: 75, label: "Pass Modal Cell Room" },
    skill: "Progression memory",
    bpm: 88,
    key: "G major I-vi-ii-V",
    rootMidi: 43,
    palette: ["G", "A", "B", "C", "D", "E", "F#"],
    targets: ["B", "E", "A", "F#"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.jazznetTurnaroundA1)
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
    demoPhrase: sourceFragments.jazznetTurnaroundA1.demoPhrase,
    copyGoal: "Copy the loop targets before adding connector notes.",
    varyGoal: "Keep B, E, A, and F# but change one entrance.",
    drillGoal: "Play B, E, A, F# on beats 1, 3, 5, and 7.",
    remixPrompts: ["Delay E by half a beat.", "End on G after F#.", "Play only the four targets."],
    reflection: "Did you hear the chord loop instead of a pile of notes?",
    scoringWeights: { echo: 25, palette: 15, target: 30, space: 10, motif: 15, dynamics: 5 }
  },
  {
    id: "nujabes-loop-room",
    title: "Loop Room Restraint",
    subtitle: "Enter late, answer warm, leave space",
    world: "Nujabes taste study",
    taste: tasteFrom("nujabes"),
    groove: grooveFrom("jazzhopRoom"),
    level: "Taste Study 1",
    unlock: { type: "open", label: "Taste study" },
    skill: "Jazz-hop restraint",
    bpm: 84,
    key: "D minor / Dorian color",
    rootMidi: 50,
    palette: ["D", "E", "F", "G", "A", "C"],
    targets: ["A", "C", "E"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.nujabesRoomLoop)
    },
    progression: ["Dm9", "G13"],
    move: "Let the loop start before you speak",
    why: "This study teaches the thing beginners usually miss in Nujabes-like phrasing: the melody is not trying to dominate the loop. It enters after the room is established and gives one warm answer.",
    stealThis: "Start late, use a small D minor answer, and land E as the floating color.",
    listenFor: [
      "The phrase does not start on beat 1.",
      "D-F-A-C is enough to imply the room.",
      "E feels like glow because the line does not over-explain it."
    ],
    anatomy: [
      { label: "Late door", detail: "The first note waits, so the loop feels like it already existed." },
      { label: "Warm answer", detail: "D-F-A-C is a simple minor-pentatonic answer." },
      { label: "Color exit", detail: "E is the 9th color. It floats because the phrase stops." }
    ],
    earCheck: {
      question: "What gives the phrase its laid-back feeling?",
      options: ["It enters after the downbeat", "It uses the whole scale", "It plays every beat"],
      answer: 0,
      success: "Right. The late entrance is the pocket.",
      miss: "Listen again for how the phrase lets beat 1 pass before speaking."
    },
    steps: [
      "Count beat 1 silently before playing.",
      "Copy the D-F-A-C answer without adding notes.",
      "Land on E and stop."
    ],
    demoPhrase: sourceFragments.nujabesRoomLoop.demoPhrase,
    copyGoal: "Copy the late entrance and the E color landing.",
    varyGoal: "Keep the late entrance; change only the last note.",
    drillGoal: "Wait one beat, play D-F-A, then stop.",
    remixPrompts: ["Start one half beat later.", "End on C instead of E.", "Make the first note softer."],
    reflection: "Did restraint make the loop feel more expensive?",
    scoringWeights: { echo: 25, palette: 15, target: 25, space: 20, motif: 10, dynamics: 5 }
  },
  {
    id: "kanye-soul-chop",
    title: "Soul Chop Hook",
    subtitle: "Repeat the cell until it becomes the hook",
    world: "Kanye taste study",
    taste: tasteFrom("kanye"),
    groove: grooveFrom("soulChop"),
    level: "Taste Study 2",
    unlock: { type: "open", label: "Taste study" },
    skill: "Repetition as arrangement",
    bpm: 88,
    key: "E minor / gospel color",
    rootMidi: 40,
    palette: ["E", "G", "A", "B", "D"],
    targets: ["G", "B", "E"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.kanyeChopCell)
    },
    progression: ["Em", "G", "D", "Em"],
    move: "Make one chopped cell carry the bar",
    why: "The lesson is not to copy a famous sample. It is to understand the arranging instinct: a tiny cell repeats with confidence, then one landing changes the emotion.",
    stealThis: "Repeat E-G-B twice exactly, then make the ending feel arranged.",
    listenFor: [
      "The first two cells are nearly the same.",
      "The repeated rhythm makes the phrase feel sampled.",
      "The last E is plain, heavy, and final."
    ],
    anatomy: [
      { label: "Cell", detail: "E-G-B is the whole hook idea." },
      { label: "Repeat", detail: "The second pass proves the cell is intentional." },
      { label: "Turn", detail: "D-G-E changes the room without needing a new melody." }
    ],
    earCheck: {
      question: "What makes this feel like a chop instead of a run?",
      options: ["The same small cell repeats", "It uses more notes each time", "It avoids rhythm"],
      answer: 0,
      success: "Yes. The repeat is the production move.",
      miss: "Listen for the same E-G-B shape happening twice."
    },
    steps: [
      "Copy E-G-B twice with the same rhythm.",
      "Make the second repeat just as confident as the first.",
      "Change only the final landing."
    ],
    demoPhrase: sourceFragments.kanyeChopCell.demoPhrase,
    copyGoal: "Copy the repeated chop before changing anything.",
    varyGoal: "Keep the two repeats and change only the last landing.",
    drillGoal: "Play E-G-B, rest, E-G-B. Nothing else.",
    remixPrompts: ["Land on B instead of E.", "Make the repeat louder.", "Delay the final D."],
    reflection: "Did repetition make the simple cell feel like a hook?",
    scoringWeights: { echo: 30, palette: 10, target: 20, space: 10, motif: 25, dynamics: 5 }
  },
  {
    id: "haruka-memory",
    title: "Memory Ostinato",
    subtitle: "Repeat softer until the color rings",
    world: "Haruka Nakamura taste study",
    taste: tasteFrom("haruka-nakamura"),
    groove: grooveFrom("memoryHaze"),
    level: "Taste Study 3",
    unlock: { type: "open", label: "Taste study" },
    skill: "Soft repetition",
    bpm: 62,
    key: "F add2 / D color",
    rootMidi: 41,
    palette: ["F", "G", "A", "C", "D", "E"],
    targets: ["G", "D", "A"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.harukaMemoryOstinato)
    },
    progression: ["Fadd2", "Dm7"],
    move: "Make the second pass feel remembered",
    why: "Haruka Nakamura-like taste is not about impressive harmony first. It is soft repetition, a small change in touch, and a color note allowed to linger.",
    stealThis: "Repeat F-G-A-G, then make the return quieter and hold D.",
    listenFor: [
      "The ostinato is almost child-simple.",
      "The second pass is softer, not busier.",
      "D turns the phrase into memory instead of a loop exercise."
    ],
    anatomy: [
      { label: "Ostinato", detail: "F-G-A-G is the memory shape." },
      { label: "Touch change", detail: "The repeat is quieter, making the line feel human." },
      { label: "Color hold", detail: "D is the 6th/add color that keeps the piano floating." }
    ],
    earCheck: {
      question: "What changes on the second pass?",
      options: ["The touch gets softer", "The phrase doubles in speed", "The harmony disappears"],
      answer: 0,
      success: "Right. The learning target is touch, not note count.",
      miss: "Listen for the second pass becoming quieter."
    },
    steps: [
      "Copy the first four notes evenly.",
      "Repeat the idea softer.",
      "Hold D and do not decorate it."
    ],
    demoPhrase: sourceFragments.harukaMemoryOstinato.demoPhrase,
    copyGoal: "Copy the same soft shape and hold the color note.",
    varyGoal: "Keep the ostinato; make the second pass even quieter.",
    drillGoal: "Play F-G-A-G twice. Second time softer.",
    remixPrompts: ["Hold A instead of D.", "Use C as the final note.", "Make every note quieter."],
    reflection: "Did the repeated shape feel more emotional because it stayed simple?",
    scoringWeights: { echo: 25, palette: 15, target: 20, space: 15, motif: 15, dynamics: 10 }
  },
  {
    id: "marcus-cinematic-lift",
    title: "Cinematic Lift",
    subtitle: "Rise once, then resolve plainly",
    world: "Marcus D taste study",
    taste: tasteFrom("marcus-d"),
    groove: grooveFrom("cinematicLift"),
    level: "Taste Study 4",
    unlock: { type: "open", label: "Taste study" },
    skill: "Arpeggio lift",
    bpm: 78,
    key: "Bb major 6",
    rootMidi: 46,
    palette: ["Bb", "C", "D", "F", "G", "A"],
    targets: ["D", "G", "A"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.marcusCinematicLift)
    },
    progression: ["Bbmaj6", "Gm7"],
    move: "Open the loop upward with one broken chord",
    why: "The Marcus D-type instinct here is cinematic clarity. A single arpeggio lift can make a loop feel wide if the top note lands cleanly and the answer comes down.",
    stealThis: "Rise through Bb-D-F-G, hold A, then answer down.",
    listenFor: [
      "The line rises like an opening shot.",
      "A is bright because the chord already feels stable.",
      "The lower answer keeps it from becoming flashy."
    ],
    anatomy: [
      { label: "Broken chord", detail: "Bb-D-F gives the ear a clean major room." },
      { label: "Lift", detail: "G and A add a cinematic 6/major color." },
      { label: "Answer", detail: "F-D-C returns the line to earth." }
    ],
    earCheck: {
      question: "Where is the emotional peak?",
      options: ["The held A", "The first Bb", "The final C only"],
      answer: 0,
      success: "Yes. The top color note is the scene opening.",
      miss: "Listen for the high note that gets the most space."
    },
    steps: [
      "Copy the rising broken chord.",
      "Hold the A like the phrase peak.",
      "Answer lower without adding a run."
    ],
    demoPhrase: sourceFragments.marcusCinematicLift.demoPhrase,
    copyGoal: "Copy the upward lift and held A.",
    varyGoal: "Keep the rise and change only the lower answer.",
    drillGoal: "Play Bb-D-F-G-A, hold A, then stop.",
    remixPrompts: ["End on Bb instead of C.", "Make the climb quieter.", "Delay the held A."],
    reflection: "Did one clean rise create more drama than many notes?",
    scoringWeights: { echo: 25, palette: 15, target: 25, space: 10, motif: 15, dynamics: 10 }
  },
  {
    id: "ljones-dust-pocket",
    title: "Dust Pocket",
    subtitle: "Play late on purpose",
    world: "Ljones taste study",
    taste: tasteFrom("ljones"),
    groove: grooveFrom("dustPocket"),
    level: "Taste Study 5",
    unlock: { type: "open", label: "Taste study" },
    skill: "Behind-the-beat pocket",
    bpm: 76,
    key: "C minor pentatonic",
    rootMidi: 36,
    palette: ["C", "Eb", "F", "G", "Bb"],
    targets: ["Eb", "G", "Bb"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.ljonesDustPocket)
    },
    progression: ["Cm7"],
    move: "Make lateness feel intentional",
    why: "The dusty pocket is not random bad timing. The first hit leans late, the motif stays small, and the low answer keeps the phrase grounded.",
    stealThis: "Place C late, answer with Eb, then keep the phrase low and small.",
    listenFor: [
      "The first C is after the grid.",
      "C-Eb returns like a sample fragment.",
      "The lower G/Bb answer gives the pocket weight."
    ],
    anatomy: [
      { label: "Late hit", detail: "The phrase starts behind beat 1 on purpose." },
      { label: "Dust motif", detail: "C to Eb is the whole fingerprint." },
      { label: "Low answer", detail: "G-Bb-Eb keeps it muted and grounded." }
    ],
    earCheck: {
      question: "What timing choice creates the dusty pocket?",
      options: ["The first note sits late", "Every note is exactly straight", "The phrase rushes ahead"],
      answer: 0,
      success: "Right. Late can be musical when the motif stays controlled.",
      miss: "Listen for the first note landing after the beat."
    },
    steps: [
      "Wait a hair before the first C.",
      "Repeat the C-Eb fingerprint.",
      "Answer lower without bright notes."
    ],
    demoPhrase: sourceFragments.ljonesDustPocket.demoPhrase,
    copyGoal: "Copy the late first hit and small motif.",
    varyGoal: "Keep the late first note; change only the low answer.",
    drillGoal: "Play late C, then Eb. Stop.",
    remixPrompts: ["Make the first C later.", "End on G.", "Repeat C-Eb twice."],
    reflection: "Did your timing feel laid back without falling apart?",
    scoringWeights: { echo: 25, palette: 15, target: 20, space: 20, motif: 15, dynamics: 5 }
  },
  {
    id: "nitsua-inward-loop",
    title: "Inward Loop",
    subtitle: "Descend, pause, leave it unresolved",
    world: "Nitsua taste study",
    taste: tasteFrom("nitsua"),
    groove: grooveFrom("inwardLoop"),
    level: "Taste Study 6",
    unlock: { type: "open", label: "Taste study" },
    skill: "Nostalgic contour",
    bpm: 70,
    key: "A minor",
    rootMidi: 45,
    palette: ["A", "B", "C", "D", "E", "G"],
    targets: ["C", "E", "G"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.nitsuaInwardLoop)
    },
    progression: ["Am7", "C"],
    move: "Let a descending memory loop quietly",
    why: "The Nitsua-like move is a small private memory, not a grand statement. The line descends, pauses, and ends without fully solving itself.",
    stealThis: "Play E-C-A as the memory, then answer with a softer B-C-G tag.",
    listenFor: [
      "The first three notes descend like a remembered tune.",
      "The pause keeps it reflective.",
      "G ends softly without closing the whole feeling."
    ],
    anatomy: [
      { label: "Memory", detail: "E-C-A is the whole emotional shape." },
      { label: "Pause", detail: "The gap makes the repeat feel inward." },
      { label: "Unresolved tag", detail: "B-C-G answers without making a big ending." }
    ],
    earCheck: {
      question: "What keeps this phrase nostalgic instead of triumphant?",
      options: ["It descends and ends softly", "It climbs to a loud high note", "It uses a fast scale"],
      answer: 0,
      success: "Yes. The descent and soft ending create the feeling.",
      miss: "Listen for the phrase falling, waiting, then ending quietly."
    },
    steps: [
      "Copy E-C-A as one memory.",
      "Leave the pause alone.",
      "Answer softly and do not force resolution."
    ],
    demoPhrase: sourceFragments.nitsuaInwardLoop.demoPhrase,
    copyGoal: "Copy the descending memory and quiet tag.",
    varyGoal: "Keep E-C-A; remove one note from the answer.",
    drillGoal: "Play E-C-A, wait, then G.",
    remixPrompts: ["End on A instead of G.", "Make the answer softer.", "Delay B by half a beat."],
    reflection: "Did the phrase feel better when it refused to over-resolve?",
    scoringWeights: { echo: 25, palette: 20, target: 15, space: 20, motif: 15, dynamics: 5 }
  },
  {
    id: "cise-cadence-answer",
    title: "Cadence Answer",
    subtitle: "Make the piano line rap without words",
    world: "Cise Starr taste study",
    taste: tasteFrom("cise-starr"),
    groove: grooveFrom("cadencePocket"),
    level: "Taste Study 7",
    unlock: { type: "open", label: "Taste study" },
    skill: "Speech rhythm",
    bpm: 86,
    key: "D minor cadence",
    rootMidi: 50,
    palette: ["D", "F", "G", "A", "C"],
    targets: ["F", "A"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.ciseCadenceAnswer)
    },
    progression: ["Dm7"],
    move: "Turn syllable rhythm into melody",
    why: "This does not copy a verse. It steals the useful musical idea: short syllable groups, breath gaps, and an answer tag can make a piano phrase feel spoken.",
    stealThis: "Play a tight D-D-F burst, breathe, then answer A-G-F and tag D-F.",
    listenFor: [
      "The first group feels like three syllables.",
      "The breath gap keeps the cadence readable.",
      "The final D-F tag sounds like an answer."
    ],
    anatomy: [
      { label: "Burst", detail: "D-D-F is a syllable group, not a scale idea." },
      { label: "Breath", detail: "The gap makes room for the next phrase." },
      { label: "Tag", detail: "D-F answers like a short spoken ending." }
    ],
    earCheck: {
      question: "What are you copying from rap cadence here?",
      options: ["Syllable grouping and breath", "A lyric", "A full song melody"],
      answer: 0,
      success: "Exactly. It is phrasing math, not a quote.",
      miss: "Listen for the grouped rhythm and the breath gap."
    },
    steps: [
      "Tap the rhythm on the desk first.",
      "Play only the D-D-F burst.",
      "Add the answer tag after the breath."
    ],
    demoPhrase: sourceFragments.ciseCadenceAnswer.demoPhrase,
    copyGoal: "Copy the speech rhythm and breath gap.",
    varyGoal: "Keep the rhythm; change only the last tag.",
    drillGoal: "Tap D-D-F, wait, then play F.",
    remixPrompts: ["Move the tag to A.", "Make the burst softer.", "Add a longer breath before the tag."],
    reflection: "Did thinking in syllables change how the line felt?",
    scoringWeights: { echo: 30, palette: 10, target: 15, space: 20, motif: 20, dynamics: 5 }
  },
  {
    id: "uyama-modal-air",
    title: "Modal Air",
    subtitle: "Leap to color, breathe, descend calmly",
    world: "Uyama Hiroto taste study",
    taste: tasteFrom("uyama-hiroto"),
    groove: grooveFrom("modalAir"),
    level: "Taste Study 8",
    unlock: { type: "open", label: "Taste study" },
    skill: "Modal color and space",
    bpm: 72,
    key: "G dorian / 6-9 color",
    rootMidi: 43,
    palette: ["G", "A", "Bb", "C", "D", "E", "F"],
    targets: ["A", "D", "E"],
    bars: 4,
    source: {
      ...sourceFrom(sourceFragments.uyamaModalAir)
    },
    progression: ["Gm9", "C13"],
    move: "Float over the mode without running it",
    why: "The Uyama Hiroto-like instinct here is air: root, lift, color, breath, calm return. The point is modal feeling, not scale coverage.",
    stealThis: "Ground G, leap to D/E color, then fall through Bb to A.",
    listenFor: [
      "G establishes the modal room.",
      "D and E are wide enough to feel airy.",
      "Bb to A returns gently instead of resolving hard."
    ],
    anatomy: [
      { label: "Room", detail: "G and A say the mode before the leap." },
      { label: "Air", detail: "D to E creates the 6/9 color space." },
      { label: "Calm return", detail: "Bb to A descends without a scale run." }
    ],
    earCheck: {
      question: "Why does this feel modal instead of like a scale worksheet?",
      options: ["It uses a few color notes with space", "It plays every scale note", "It avoids a root"],
      answer: 0,
      success: "Right. The color notes and space create the room.",
      miss: "Listen for the leap to D/E and the calm return."
    },
    steps: [
      "Copy G-A with patience.",
      "Leap to D/E and let the color ring.",
      "Return through Bb-A without filling the gap."
    ],
    demoPhrase: sourceFragments.uyamaModalAir.demoPhrase,
    copyGoal: "Copy the modal leap and calm descent.",
    varyGoal: "Keep G-A-D/E; change only the final return.",
    drillGoal: "Play G, wait, leap to D, wait, then A.",
    remixPrompts: ["End on G instead of A.", "Hold E longer.", "Remove Bb from the return."],
    reflection: "Did the mode feel like a place instead of a list?",
    scoringWeights: { echo: 25, palette: 15, target: 25, space: 20, motif: 10, dynamics: 5 }
  }
];

export function getLesson(id) {
  return lessons.find((lesson) => lesson.id === id) ?? lessons[0];
}
