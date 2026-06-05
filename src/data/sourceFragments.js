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
  },
  nujabesRoomLoop: {
    id: "nujabes-room-loop",
    sourceKind: "artist-flow-study",
    sourceName: "Nujabes-inspired loop-room taste study",
    sourceUrl: "https://en.wikipedia.org/wiki/Nujabes",
    license: "Original educational exercise inspired by public artist style discussion",
    sourceIdea: "A warm jazz-hop loop often feels strongest when the melody enters late, answers simply, and leaves room.",
    extractedMaterial: ["late entrance", "minor pentatonic answer", "9th color", "restraint"],
    beginnerAdaptation: "Use D minor pentatonic plus E as a color note, with no fast runs.",
    demoPhrase: [
      { note: "D4", beat: 0.75, duration: 0.55, velocity: 68 },
      { note: "F4", beat: 1.5, duration: 0.55, velocity: 78 },
      { note: "A4", beat: 2.5, duration: 0.85, velocity: 84 },
      { note: "C5", beat: 4.25, duration: 0.75, velocity: 82 },
      { note: "A4", beat: 5.25, duration: 0.5, velocity: 72 },
      { note: "G4", beat: 6.25, duration: 0.55, velocity: 70 },
      { note: "E4", beat: 7.25, duration: 1.05, velocity: 76 }
    ]
  },
  kanyeChopCell: {
    id: "kanye-chop-cell",
    sourceKind: "artist-flow-study",
    sourceName: "Kanye-inspired soul-chop taste study",
    sourceUrl: "https://en.wikipedia.org/wiki/Kanye_West",
    license: "Original educational exercise inspired by public production-style discussion",
    sourceIdea: "A small soulful cell can become the hook when it repeats hard and the last landing changes the room.",
    extractedMaterial: ["repeated chop cell", "gospel-ish lift", "strong final landing", "sample logic"],
    beginnerAdaptation: "Repeat an E-G-B cell, then land lower so the change feels arranged instead of random.",
    demoPhrase: [
      { note: "E4", beat: 0, duration: 0.35, velocity: 86 },
      { note: "G4", beat: 0.55, duration: 0.35, velocity: 92 },
      { note: "B4", beat: 1.1, duration: 0.55, velocity: 96 },
      { note: "E4", beat: 2, duration: 0.35, velocity: 84 },
      { note: "G4", beat: 2.55, duration: 0.35, velocity: 90 },
      { note: "B4", beat: 3.1, duration: 0.55, velocity: 94 },
      { note: "D4", beat: 5, duration: 0.7, velocity: 88 },
      { note: "G4", beat: 6, duration: 0.65, velocity: 94 },
      { note: "E4", beat: 7.25, duration: 0.9, velocity: 82 }
    ]
  },
  harukaMemoryOstinato: {
    id: "haruka-memory-ostinato",
    sourceKind: "artist-flow-study",
    sourceName: "Haruka Nakamura-inspired memory ostinato",
    sourceUrl: "https://harukanakamura.com/",
    license: "Original educational exercise inspired by public artist style discussion",
    sourceIdea: "A soft repeated piano shape can feel like memory when the second pass is quieter and the color note rings.",
    extractedMaterial: ["soft ostinato", "add2 color", "second pass quieter", "held memory note"],
    beginnerAdaptation: "Repeat F-G-A-G, then answer with D-C-A without adding density.",
    demoPhrase: [
      { note: "F4", beat: 0, duration: 0.75, velocity: 58 },
      { note: "G4", beat: 1, duration: 0.75, velocity: 64 },
      { note: "A4", beat: 2, duration: 0.75, velocity: 66 },
      { note: "G4", beat: 3, duration: 0.9, velocity: 58 },
      { note: "F4", beat: 4.25, duration: 0.75, velocity: 48 },
      { note: "G4", beat: 5.25, duration: 0.75, velocity: 52 },
      { note: "D5", beat: 6.25, duration: 1.3, velocity: 62 }
    ]
  },
  marcusCinematicLift: {
    id: "marcus-cinematic-lift",
    sourceKind: "artist-flow-study",
    sourceName: "Marcus D-inspired cinematic jazz-hop lift",
    sourceUrl: "https://chillhop.com/artists/13652-marcus-d/",
    license: "Original educational exercise inspired by public artist style discussion",
    sourceIdea: "A clean broken chord can make a loop open upward before a plain answer brings it back.",
    extractedMaterial: ["rising arpeggio", "major 6 color", "held top note", "lower answer"],
    beginnerAdaptation: "Use a Bb major color rise, hold G/A, then resolve down without extra notes.",
    demoPhrase: [
      { note: "Bb3", beat: 0, duration: 0.5, velocity: 74 },
      { note: "D4", beat: 0.75, duration: 0.5, velocity: 78 },
      { note: "F4", beat: 1.5, duration: 0.55, velocity: 84 },
      { note: "G4", beat: 2.25, duration: 0.85, velocity: 88 },
      { note: "A4", beat: 4, duration: 1.0, velocity: 92 },
      { note: "F4", beat: 5.5, duration: 0.55, velocity: 78 },
      { note: "D4", beat: 6.5, duration: 0.55, velocity: 72 },
      { note: "C4", beat: 7.25, duration: 0.85, velocity: 68 }
    ]
  },
  ljonesDustPocket: {
    id: "ljones-dust-pocket",
    sourceKind: "artist-flow-study",
    sourceName: "Ljones-inspired dusty pocket study",
    sourceUrl: "https://ljones.bandcamp.com/",
    license: "Original educational exercise inspired by public artist style discussion",
    sourceIdea: "A phrase can feel sampled when the first hit sits late and the motif stays small.",
    extractedMaterial: ["late first hit", "two-note motif", "low answer", "dusty pocket"],
    beginnerAdaptation: "Use a C minor pentatonic pocket and place the first note slightly after beat 1.",
    demoPhrase: [
      { note: "C4", beat: 0.35, duration: 0.45, velocity: 66 },
      { note: "Eb4", beat: 1.45, duration: 0.55, velocity: 76 },
      { note: "C4", beat: 2.85, duration: 0.55, velocity: 62 },
      { note: "G3", beat: 4.25, duration: 0.65, velocity: 70 },
      { note: "Bb3", beat: 5.55, duration: 0.5, velocity: 74 },
      { note: "Eb4", beat: 6.75, duration: 0.85, velocity: 68 }
    ]
  },
  nitsuaInwardLoop: {
    id: "nitsua-inward-loop",
    sourceKind: "artist-flow-study",
    sourceName: "Nitsua-inspired inward loop study",
    sourceUrl: "https://nitsua.bandcamp.com/",
    license: "Original educational exercise inspired by public artist style discussion",
    sourceIdea: "A nostalgic loop often descends simply, repeats quietly, and refuses to over-resolve.",
    extractedMaterial: ["descending memory", "minor color", "quiet repeat", "soft unresolved ending"],
    beginnerAdaptation: "Use E-C-A as the memory, then repeat with B/C as a softer tag.",
    demoPhrase: [
      { note: "E4", beat: 0, duration: 0.8, velocity: 66 },
      { note: "C4", beat: 1.25, duration: 0.7, velocity: 60 },
      { note: "A3", beat: 2.5, duration: 0.9, velocity: 58 },
      { note: "B3", beat: 4.25, duration: 0.7, velocity: 54 },
      { note: "C4", beat: 5.5, duration: 0.85, velocity: 58 },
      { note: "G3", beat: 7, duration: 1.0, velocity: 52 }
    ]
  },
  ciseCadenceAnswer: {
    id: "cise-cadence-answer",
    sourceKind: "artist-flow-study",
    sourceName: "Cise Starr-inspired cadence answer study",
    sourceUrl: "https://en.wikipedia.org/wiki/Cyne",
    license: "Original educational exercise inspired by public artist/cadence study",
    sourceIdea: "Rap cadence can become melodic phrasing when syllable groups, breath, and answer tags map onto notes.",
    extractedMaterial: ["3-note burst", "breath gap", "answer tag", "spoken accent"],
    beginnerAdaptation: "Tap the rhythm as speech first, then play only D-F-A-G-F-D-F.",
    demoPhrase: [
      { note: "D4", beat: 0, duration: 0.28, velocity: 82 },
      { note: "D4", beat: 0.45, duration: 0.28, velocity: 76 },
      { note: "F4", beat: 0.9, duration: 0.42, velocity: 88 },
      { note: "A4", beat: 2.25, duration: 0.35, velocity: 92 },
      { note: "G4", beat: 2.75, duration: 0.35, velocity: 74 },
      { note: "F4", beat: 4, duration: 0.6, velocity: 82 },
      { note: "D4", beat: 5.5, duration: 0.55, velocity: 64 },
      { note: "F4", beat: 6.5, duration: 0.85, velocity: 70 }
    ]
  },
  uyamaModalAir: {
    id: "uyama-modal-air",
    sourceKind: "artist-flow-study",
    sourceName: "Uyama Hiroto-inspired modal air study",
    sourceUrl: "https://tower.jp/artist/info/508213",
    license: "Original educational exercise inspired by public artist style discussion",
    sourceIdea: "A modal jazz-hop line can float by leaping to a color note, breathing, then resolving without running the scale.",
    extractedMaterial: ["modal root", "wide leap", "6/9 color", "calm descent"],
    beginnerAdaptation: "Use G dorian, leap into D/E color, and return through Bb/A slowly.",
    demoPhrase: [
      { note: "G4", beat: 0, duration: 0.85, velocity: 70 },
      { note: "A4", beat: 1.5, duration: 0.75, velocity: 74 },
      { note: "D5", beat: 3, duration: 0.9, velocity: 86 },
      { note: "E5", beat: 4.5, duration: 0.85, velocity: 82 },
      { note: "D5", beat: 5.25, duration: 0.5, velocity: 70 },
      { note: "Bb4", beat: 6.5, duration: 0.55, velocity: 68 },
      { note: "A4", beat: 7.5, duration: 0.9, velocity: 64 }
    ]
  }
};
