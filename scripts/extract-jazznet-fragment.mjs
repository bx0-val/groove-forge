import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import midiPackage from "@tonejs/midi";

const { Midi } = midiPackage;

function round(value, places = 3) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

function noteEvent(note, firstTick, ticksPerBeat) {
  return {
    note: note.name,
    beat: round((note.ticks - firstTick) / ticksPerBeat),
    duration: round(note.durationTicks / ticksPerBeat),
    velocity: Math.max(42, Math.min(110, Math.round(note.velocity * 120)))
  };
}

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/extract-jazznet-fragment.mjs <midi-file>");
  process.exit(1);
}

const midi = new Midi(await readFile(file));
const notes = midi.tracks.flatMap((track) => track.notes).sort((a, b) => a.ticks - b.ticks || a.midi - b.midi);
const firstTick = notes[0]?.ticks ?? 0;
const phrase = notes.slice(0, 16).map((note) => noteEvent(note, firstTick, midi.header.ppq));

const payload = {
  sourceFile: basename(file),
  ticksPerBeat: midi.header.ppq,
  bpm: Math.round(midi.header.tempos[0]?.bpm ?? 88),
  phrase
};

console.log(JSON.stringify(payload, null, 2));
