import { describe, expect, it } from "vitest";
import { lessons } from "./challenges";
import { scoreTake } from "./scoring";
import { noteToMidi, pitchClass } from "./music";

const lesson = lessons[0];

function event(midi, pitchClass, timestamp, velocity = 90) {
  return { type: "noteon", midi, pitchClass, timestamp, velocity };
}

function phraseEvent(note, timestamp, velocity = 90) {
  const midi = noteToMidi(note);
  return event(midi, pitchClass(midi), timestamp, velocity);
}

describe("scoreTake", () => {
  it("does not award points for an empty take", () => {
    const result = scoreTake([], lesson, 1000);
    expect(result.score).toBe(0);
    expect(result.categories.every((category) => category.score === 0)).toBe(true);
  });

  it("rewards constrained target-note playing", () => {
    const result = scoreTake(
      [
        event(62, "D", 1000, 60),
        event(65, "F", 1600, 82),
        event(69, "A", 2200, 104),
        event(65, "F", 2800, 76)
      ],
      lesson,
      1000
    );

    expect(result.categories.find((category) => category.id === "palette").score).toBe(100);
    expect(result.categories.find((category) => category.id === "target").score).toBeGreaterThan(0);
    expect(result.categories.find((category) => category.id === "dynamics").score).toBeGreaterThan(0);
  });

  it("recognizes a copied teacher phrase", () => {
    const beatMs = 60000 / lesson.bpm;
    const result = scoreTake(
      lesson.demoPhrase.map((note) => phraseEvent(note.note, 1000 + note.beat * beatMs, note.velocity)),
      lesson,
      1000,
      "copy"
    );

    expect(result.echoMatches).toBe(lesson.demoPhrase.length);
    expect(result.categories.find((category) => category.id === "echo").score).toBeGreaterThan(90);
    expect(result.nextStep).toBe(lesson.reflection);
  });

  it("penalizes notes outside the palette", () => {
    const result = scoreTake(
      [
        event(61, "C#", 1000),
        event(63, "D#", 1200),
        event(62, "D", 1400)
      ],
      lesson,
      1000
    );

    expect(result.categories.find((category) => category.id === "palette").score).toBeLessThan(50);
  });
});
