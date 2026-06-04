import { describe, expect, it } from "vitest";
import { lessons } from "./challenges";
import { scoreTake } from "./scoring";

const lesson = lessons[0];

function event(midi, pitchClass, timestamp, velocity = 90) {
  return { type: "noteon", midi, pitchClass, timestamp, velocity };
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
