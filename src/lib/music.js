export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_TO_SHARP = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#"
};

export function normalizePitchClass(value) {
  return FLAT_TO_SHARP[value] ?? value;
}

export function midiToNote(midi) {
  const name = NOTE_NAMES[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}

export function noteToMidi(note) {
  const match = note.match(/^([A-G][#b]?)(-?\d)$/);
  if (!match) return null;
  return (Number(match[2]) + 1) * 12 + NOTE_NAMES.indexOf(normalizePitchClass(match[1]));
}

export function normalizeMidiMessage(message) {
  const [status, note, velocity = 0] = message.data;
  const command = status & 0xf0;
  if (command === 0x90 && velocity > 0) {
    return { type: "noteon", midi: note, note: midiToNote(note), velocity };
  }
  if (command === 0x80 || (command === 0x90 && velocity === 0)) {
    return { type: "noteoff", midi: note, note: midiToNote(note), velocity: 0 };
  }
  return null;
}

export const KEYBOARD_MAP = {
  a: 60,
  w: 61,
  s: 62,
  e: 63,
  d: 64,
  f: 65,
  t: 66,
  g: 67,
  y: 68,
  h: 69,
  u: 70,
  j: 71,
  k: 72,
  o: 73,
  l: 74,
  p: 75,
  ";": 76
};

export function createNoteEvent(midi, velocity = 92, source = "simulator") {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type: "noteon",
    midi,
    note: midiToNote(midi),
    pitchClass: NOTE_NAMES[midi % 12],
    velocity,
    source,
    timestamp: performance.now()
  };
}

export function pitchClass(noteOrMidi) {
  if (typeof noteOrMidi === "number") return NOTE_NAMES[noteOrMidi % 12];
  return normalizePitchClass(noteOrMidi.replace(/-?\d$/, ""));
}

export function pitchInSet(noteOrMidi, pitchSet) {
  const normalized = pitchClass(noteOrMidi);
  return pitchSet.map(normalizePitchClass).includes(normalized);
}
