export const groovePatterns = {
  jazzhopRoom: {
    id: "jazzhop-room",
    name: "Dusty jazz-hop room",
    feel: "Laid-back kick, soft backbeat, warm minor comp",
    swing: "behind",
    drums: [
      { note: "kick", beat: 0, velocity: 72 },
      { note: "hat", beat: 0.5, velocity: 26 },
      { note: "snare", beat: 1.85, velocity: 48 },
      { note: "hat", beat: 2.5, velocity: 24 },
      { note: "kick", beat: 3.15, velocity: 58 },
      { note: "snare", beat: 3.85, velocity: 44 },
      { note: "hat", beat: 3.5, velocity: 22 }
    ],
    bass: [
      { note: "D2", beat: 0, duration: 0.78, velocity: 70 },
      { note: "A1", beat: 2.35, duration: 0.5, velocity: 58 },
      { note: "C2", beat: 3.1, duration: 0.55, velocity: 62 }
    ],
    comp: [
      { notes: ["F3", "C4", "E4"], beat: 0.1, duration: 1.4, velocity: 38 },
      { notes: ["G3", "C4", "F4"], beat: 2.1, duration: 1.2, velocity: 34 }
    ]
  },
  swingBrush: {
    id: "swing-brush",
    name: "Soft swing brush",
    feel: "Gentle two-and-four with a walking root hint",
    swing: "light",
    drums: [
      { note: "hat", beat: 0, velocity: 26 },
      { note: "hat", beat: 0.66, velocity: 18 },
      { note: "snare", beat: 1.95, velocity: 38 },
      { note: "hat", beat: 2, velocity: 24 },
      { note: "hat", beat: 2.66, velocity: 18 },
      { note: "snare", beat: 3.95, velocity: 36 }
    ],
    bass: [
      { note: "G2", beat: 0, duration: 0.45, velocity: 58 },
      { note: "B2", beat: 1, duration: 0.42, velocity: 52 },
      { note: "C2", beat: 2, duration: 0.45, velocity: 58 },
      { note: "E2", beat: 3, duration: 0.42, velocity: 52 }
    ],
    comp: [
      { notes: ["Bb3", "E4", "A4"], beat: 1.75, duration: 1.0, velocity: 30 },
      { notes: ["A3", "D4", "G4"], beat: 3.75, duration: 0.85, velocity: 28 }
    ]
  },
  breathBallad: {
    id: "breath-ballad",
    name: "Breath ballad",
    feel: "Sparse pulse with room for vocal phrasing",
    swing: "open",
    drums: [
      { note: "kick", beat: 0, velocity: 44 },
      { note: "hat", beat: 2, velocity: 20 },
      { note: "snare", beat: 3.9, velocity: 24 }
    ],
    bass: [
      { note: "C2", beat: 0, duration: 1.2, velocity: 54 },
      { note: "A1", beat: 2.75, duration: 0.85, velocity: 46 }
    ],
    comp: [
      { notes: ["E3", "A3", "D4"], beat: 0.05, duration: 2.2, velocity: 30 },
      { notes: ["C3", "G3", "E4"], beat: 3.1, duration: 1.4, velocity: 24 }
    ]
  },
  soulChop: {
    id: "soul-chop",
    name: "Soul chop bounce",
    feel: "Hard repeat with a small gospel lift",
    swing: "straight-heavy",
    drums: [
      { note: "kick", beat: 0, velocity: 76 },
      { note: "hat", beat: 0.5, velocity: 30 },
      { note: "snare", beat: 2, velocity: 58 },
      { note: "hat", beat: 2.5, velocity: 28 },
      { note: "kick", beat: 3, velocity: 62 },
      { note: "hat", beat: 3.5, velocity: 26 }
    ],
    bass: [
      { note: "E2", beat: 0, duration: 0.65, velocity: 74 },
      { note: "B1", beat: 1.1, duration: 0.35, velocity: 54 },
      { note: "D2", beat: 3, duration: 0.5, velocity: 60 }
    ],
    comp: [
      { notes: ["E3", "G3", "B3"], beat: 0, duration: 0.55, velocity: 42 },
      { notes: ["E3", "G3", "B3"], beat: 2, duration: 0.55, velocity: 42 },
      { notes: ["D3", "G3", "B3"], beat: 3.05, duration: 0.65, velocity: 36 }
    ]
  },
  memoryHaze: {
    id: "memory-haze",
    name: "Memory haze",
    feel: "Barely-there pulse with soft suspended piano",
    swing: "floating",
    drums: [
      { note: "hat", beat: 0, velocity: 16 },
      { note: "hat", beat: 2, velocity: 14 },
      { note: "snare", beat: 3.9, velocity: 18 }
    ],
    bass: [
      { note: "F2", beat: 0, duration: 1.6, velocity: 44 },
      { note: "D2", beat: 2.5, duration: 1.1, velocity: 38 }
    ],
    comp: [
      { notes: ["F3", "G3", "C4"], beat: 0.05, duration: 2.8, velocity: 24 },
      { notes: ["D3", "A3", "E4"], beat: 2.8, duration: 2.1, velocity: 22 }
    ]
  },
  cinematicLift: {
    id: "cinematic-lift",
    name: "Cinematic lift",
    feel: "Wide major color over a clean boom-bap frame",
    swing: "lifted",
    drums: [
      { note: "kick", beat: 0, velocity: 68 },
      { note: "hat", beat: 1, velocity: 24 },
      { note: "snare", beat: 2, velocity: 50 },
      { note: "kick", beat: 2.75, velocity: 48 },
      { note: "hat", beat: 3, velocity: 22 },
      { note: "snare", beat: 3.9, velocity: 42 }
    ],
    bass: [
      { note: "Bb1", beat: 0, duration: 0.75, velocity: 66 },
      { note: "F2", beat: 2.2, duration: 0.5, velocity: 52 },
      { note: "G2", beat: 3, duration: 0.55, velocity: 56 }
    ],
    comp: [
      { notes: ["D3", "F3", "A3"], beat: 0.2, duration: 1.2, velocity: 34 },
      { notes: ["G3", "Bb3", "D4"], beat: 2.15, duration: 1.2, velocity: 32 }
    ]
  },
  dustPocket: {
    id: "dust-pocket",
    name: "Dust pocket",
    feel: "Late kick, dry snare, muted minor bed",
    swing: "late",
    drums: [
      { note: "kick", beat: 0.12, velocity: 64 },
      { note: "hat", beat: 0.75, velocity: 18 },
      { note: "snare", beat: 2.08, velocity: 44 },
      { note: "hat", beat: 2.75, velocity: 18 },
      { note: "kick", beat: 3.2, velocity: 54 },
      { note: "snare", beat: 3.92, velocity: 36 }
    ],
    bass: [
      { note: "C2", beat: 0.2, duration: 0.7, velocity: 58 },
      { note: "G1", beat: 2.3, duration: 0.5, velocity: 50 },
      { note: "Bb1", beat: 3.15, duration: 0.55, velocity: 52 }
    ],
    comp: [
      { notes: ["Eb3", "Bb3", "C4"], beat: 0.25, duration: 1.3, velocity: 28 },
      { notes: ["G2", "Eb3", "Bb3"], beat: 2.2, duration: 1.1, velocity: 26 }
    ]
  },
  inwardLoop: {
    id: "inward-loop",
    name: "Inward loop",
    feel: "Quiet minor loop with a soft open ending",
    swing: "private",
    drums: [
      { note: "kick", beat: 0, velocity: 46 },
      { note: "hat", beat: 1.5, velocity: 16 },
      { note: "snare", beat: 3.8, velocity: 26 }
    ],
    bass: [
      { note: "A1", beat: 0, duration: 1.1, velocity: 48 },
      { note: "E2", beat: 2.6, duration: 0.8, velocity: 42 }
    ],
    comp: [
      { notes: ["C3", "E3", "G3"], beat: 0.1, duration: 1.9, velocity: 25 },
      { notes: ["B2", "E3", "G3"], beat: 2.85, duration: 1.25, velocity: 22 }
    ]
  },
  cadencePocket: {
    id: "cadence-pocket",
    name: "Cadence pocket",
    feel: "Speech-like hats and a low minor pocket",
    swing: "speech",
    drums: [
      { note: "kick", beat: 0, velocity: 62 },
      { note: "hat", beat: 0.45, velocity: 22 },
      { note: "hat", beat: 0.9, velocity: 22 },
      { note: "snare", beat: 2, velocity: 50 },
      { note: "hat", beat: 2.75, velocity: 20 },
      { note: "snare", beat: 3.8, velocity: 36 }
    ],
    bass: [
      { note: "D2", beat: 0, duration: 0.65, velocity: 62 },
      { note: "A1", beat: 2.2, duration: 0.5, velocity: 50 }
    ],
    comp: [
      { notes: ["F3", "A3", "C4"], beat: 0.05, duration: 1.0, velocity: 30 },
      { notes: ["D3", "G3", "A3"], beat: 2.2, duration: 1.1, velocity: 28 }
    ]
  },
  modalAir: {
    id: "modal-air",
    name: "Modal air",
    feel: "Open dorian room with a calm pulse",
    swing: "open",
    drums: [
      { note: "kick", beat: 0, velocity: 48 },
      { note: "hat", beat: 1, velocity: 18 },
      { note: "snare", beat: 2.8, velocity: 26 },
      { note: "hat", beat: 3.5, velocity: 16 }
    ],
    bass: [
      { note: "G1", beat: 0, duration: 1.2, velocity: 50 },
      { note: "D2", beat: 2.7, duration: 0.8, velocity: 42 }
    ],
    comp: [
      { notes: ["Bb2", "E3", "A3"], beat: 0.1, duration: 2.0, velocity: 26 },
      { notes: ["C3", "F3", "A3"], beat: 2.8, duration: 1.4, velocity: 24 }
    ]
  }
};

export function getGroovePattern(id) {
  return groovePatterns[id] ?? groovePatterns.jazzhopRoom;
}
