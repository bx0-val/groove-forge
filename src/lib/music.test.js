import { describe, expect, it } from "vitest";
import { createNoteEvent, midiToNote, normalizeMidiMessage, noteToMidi, transposePhrase } from "./music";

describe("music helpers", () => {
  it("converts between MIDI numbers and note names", () => {
    expect(midiToNote(60)).toBe("C4");
    expect(noteToMidi("F#3")).toBe(54);
    expect(noteToMidi("Eb4")).toBe(63);
  });

  it("normalizes MIDI note on and note off messages", () => {
    expect(normalizeMidiMessage({ data: [0x90, 62, 100] })).toMatchObject({
      type: "noteon",
      midi: 62,
      note: "D4",
      velocity: 100
    });

    expect(normalizeMidiMessage({ data: [0x90, 62, 0] })).toMatchObject({
      type: "noteoff",
      midi: 62
    });
  });

  it("creates simulator note events with pitch classes", () => {
    const event = createNoteEvent(69, 88, "test");
    expect(event).toMatchObject({ note: "A4", pitchClass: "A", velocity: 88, source: "test" });
  });

  it("transposes phrases through tonal instead of bespoke note math", () => {
    const phrase = [{ note: "Bb3", beat: 0 }, { note: "E4", beat: 1 }];
    expect(transposePhrase(phrase, "2M").map((note) => note.note)).toEqual(["C4", "F#4"]);
  });
});
