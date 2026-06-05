export const sourceFragments = {
  boplandMajor251Outline: {
    id: "bopland-major-251-outline",
    sourceKind: "lick-family",
    sourceName: "BopLand Major 2-5-1 treble-clef collection",
    sourceUrl: "https://bopland.org/database#treble-clef-licks/Major+2+5+1",
    license: "CC BY-SA 4.0",
    sourceIdea: "ii-V-I licks are short, reusable melodic cells over Dm7-G7-Cmaj-style movement.",
    extractedMaterial: ["Dm7 outline", "G7 guide-tone pull", "Cmaj landing"],
    beginnerAdaptation: "Use a chord outline followed by stepwise resolution instead of a longer bebop lick.",
    demoPhrase: [
      { note: "D4", beat: 0, duration: 0.55, velocity: 78 },
      { note: "F4", beat: 0.75, duration: 0.55, velocity: 86 },
      { note: "A4", beat: 1.5, duration: 0.55, velocity: 92 },
      { note: "C5", beat: 2.25, duration: 0.8, velocity: 96 },
      { note: "B4", beat: 4, duration: 0.55, velocity: 90 },
      { note: "G4", beat: 5, duration: 0.55, velocity: 82 },
      { note: "E4", beat: 6, duration: 0.55, velocity: 78 },
      { note: "C4", beat: 7.25, duration: 1.05, velocity: 74 }
    ]
  },
  openTheoryGuideTones: {
    id: "open-theory-guide-tones",
    sourceKind: "theory-pattern",
    sourceName: "Open Music Theory jazz voicings / guide tones",
    sourceUrl: "https://viva.pressbooks.pub/openmusictheory/chapter/jazz-voicings/",
    license: "CC BY-SA 4.0",
    sourceIdea: "Guide tones, especially thirds and sevenths, make chord movement audible with very few notes.",
    extractedMaterial: ["Gm7: Bb", "C7: E", "Fmaj7: A"],
    beginnerAdaptation: "Turn guide-tone voice leading into a right-hand melodic thread.",
    demoPhrase: [
      { note: "Bb3", beat: 0, duration: 0.85, velocity: 84 },
      { note: "D4", beat: 1, duration: 0.5, velocity: 74 },
      { note: "F4", beat: 2, duration: 0.5, velocity: 78 },
      { note: "E4", beat: 3, duration: 0.95, velocity: 92 },
      { note: "G4", beat: 4.5, duration: 0.45, velocity: 76 },
      { note: "A4", beat: 5.5, duration: 1.1, velocity: 90 },
      { note: "F4", beat: 7, duration: 0.9, velocity: 72 }
    ]
  },
  auralSkillsCallResponse: {
    id: "aural-skills-call-response",
    sourceKind: "pedagogy-pattern",
    sourceName: "Foundations of Aural Skills call-and-response",
    sourceUrl: "https://uen.pressbooks.pub/auralskills/chapter/call-and-response/",
    license: "CC BY",
    sourceIdea: "Call-response practice asks the learner to listen, retain, and answer a phrase instead of reading first.",
    extractedMaterial: ["short call", "breath", "shorter answer"],
    beginnerAdaptation: "Make silence and response length the target behavior.",
    demoPhrase: [
      { note: "G4", beat: 0, duration: 0.55, velocity: 72 },
      { note: "A4", beat: 1.25, duration: 0.55, velocity: 82 },
      { note: "C5", beat: 2.5, duration: 1.1, velocity: 90 },
      { note: "E4", beat: 5.25, duration: 0.55, velocity: 74 },
      { note: "D4", beat: 6.25, duration: 0.55, velocity: 70 },
      { note: "C4", beat: 7.25, duration: 1.05, velocity: 68 }
    ]
  },
  openTheoryMinor9: {
    id: "open-theory-minor-9",
    sourceKind: "theory-pattern",
    sourceName: "Open Music Theory jazz extensions",
    sourceUrl: "https://viva.pressbooks.pub/openmusictheory/chapter/jazz-voicings/",
    license: "CC BY-SA 4.0",
    sourceIdea: "Jazz color comes from extensions such as the 9th when they are voiced or landed intentionally.",
    extractedMaterial: ["Am ground", "G color", "B as 9th"],
    beginnerAdaptation: "Use B as a melodic landing over A minor instead of teaching a full voicing first.",
    demoPhrase: [
      { note: "A3", beat: 0, duration: 0.8, velocity: 76 },
      { note: "C4", beat: 1, duration: 0.65, velocity: 82 },
      { note: "E4", beat: 2, duration: 0.65, velocity: 88 },
      { note: "G4", beat: 3.5, duration: 0.8, velocity: 78 },
      { note: "B4", beat: 5, duration: 1.4, velocity: 94 }
    ]
  },
  openTheoryModalCell: {
    id: "open-theory-modal-cell",
    sourceKind: "modal-pattern",
    sourceName: "Open Music Theory jazz/chord-scale modal practice",
    sourceUrl: "https://viva.pressbooks.pub/openmusictheorycopy/part/jazz/",
    license: "CC BY-SA 4.0",
    sourceIdea: "Modal improvisation can focus on a small repeated cell instead of exhausting the full scale.",
    extractedMaterial: ["D root", "F minor color", "A open fifth"],
    beginnerAdaptation: "Repeat a D-F-A cell and vary only touch.",
    demoPhrase: [
      { note: "D4", beat: 0, duration: 0.75, velocity: 78 },
      { note: "F4", beat: 1.5, duration: 0.75, velocity: 88 },
      { note: "A4", beat: 3, duration: 1, velocity: 84 },
      { note: "D4", beat: 5, duration: 0.65, velocity: 70 },
      { note: "F4", beat: 6, duration: 0.65, velocity: 76 },
      { note: "D4", beat: 7, duration: 1.1, velocity: 72 }
    ]
  },
  jazznetTurnaroundA1: {
    id: "jazznet-turnaround-a1",
    sourceKind: "midi-extract",
    sourceName: "jazznet I-VI-ii-V-maj MIDI progression",
    sourceUrl: "https://zenodo.org/records/7192653",
    license: "CC BY 4.0",
    sourceFile: "midi/progressions/I-VI-ii-V-maj/A-1-I-VI-ii-V-maj-0.mid",
    sourceTool: "scripts/extract-jazznet-fragment.mjs using @tonejs/midi",
    sourceIdea: "A four-chord turnaround can be represented as stacked chord tones at two-beat intervals.",
    extractedMaterial: [
      "A1 C#2 E2 G#2 at beat 0",
      "F#2 A#2 C#3 E3 at beat 2",
      "B1 D2 F#2 A2 at beat 4",
      "E2 G#2 B2 D3 at beat 6"
    ],
    beginnerAdaptation: "Lift the chord-stack rhythm into a playable right-hand target-note loop in G major.",
    demoPhrase: [
      { note: "B3", beat: 0, duration: 0.55, velocity: 76 },
      { note: "D4", beat: 0.75, duration: 0.4, velocity: 70 },
      { note: "E4", beat: 2, duration: 0.75, velocity: 84 },
      { note: "G4", beat: 2.75, duration: 0.45, velocity: 74 },
      { note: "A4", beat: 4, duration: 0.75, velocity: 88 },
      { note: "C5", beat: 4.75, duration: 0.45, velocity: 76 },
      { note: "F#4", beat: 6, duration: 1.1, velocity: 90 },
      { note: "D4", beat: 7.25, duration: 0.65, velocity: 70 }
    ]
  }
};
