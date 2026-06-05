import { describe, expect, it } from "vitest";
import { lessons } from "./challenges";
import { scoreTake } from "./scoring";
import { noteToMidi, pitchClass } from "./music";
import { buildPhraseVariants, applyPhraseVariant } from "./phraseVariants";
import { evaluateLessonMastery, summarizeProfessionalReadiness } from "./mastery";
import { workoutRounds } from "../data/workoutRounds";
import { tasteProfiles } from "../data/tasteProfiles";

const lesson = lessons[0];

function event(midi, pitchClass, timestamp, velocity = 90) {
  return { type: "noteon", midi, pitchClass, timestamp, velocity };
}

function phraseEvent(note, timestamp, velocity = 90) {
  const midi = noteToMidi(note);
  return event(midi, pitchClass(midi), timestamp, velocity);
}

describe("scoreTake", () => {
  it("keeps the v3 mission catalog source-aware", () => {
    lessons.forEach((item) => {
      expect(item.source).toMatchObject({
        name: expect.any(String),
        url: expect.stringMatching(/^https:\/\//),
        license: expect.any(String),
        adaptation: expect.any(String)
      });
      expect(item.earCheck.options.length).toBeGreaterThanOrEqual(3);
      expect(item.anatomy.length).toBeGreaterThan(0);
      expect(item.drillGoal).toBeTruthy();
      expect(item.source.fragmentId).toBeTruthy();
      expect(item.source.material.length).toBeGreaterThan(0);
      expect(item.unlock).toBeTruthy();
      expect(item.groove).toMatchObject({
        name: expect.any(String),
        feel: expect.any(String),
        drums: expect.any(Array),
        bass: expect.any(Array),
        comp: expect.any(Array)
      });
      expect(item.groove.drums.length).toBeGreaterThan(0);
      expect(item.groove.bass.length).toBeGreaterThan(0);
      expect(item.groove.comp.length).toBeGreaterThan(0);
      expect(item.remixPrompts.length).toBeGreaterThanOrEqual(3);
      const variants = buildPhraseVariants(item);
      expect(variants.length).toBeGreaterThanOrEqual(5);
      expect(variants.map((variant) => variant.id)).toEqual(["teacher", "skeleton", "answer", "late", "touch"]);
      variants.forEach((variant) => {
        expect(variant.phrase.length).toBeGreaterThan(0);
        expect(variant.rule).toBeTruthy();
      });
      expect(item.taste).toMatchObject({
        artist: expect.any(String),
        lens: expect.any(String),
        mindset: expect.any(String),
        avoid: expect.any(String),
        practice: expect.any(String)
      });
      expect(item.taste.bite.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("keeps workout rounds mapped to playable phrase variants", () => {
    const variants = buildPhraseVariants(lesson);
    workoutRounds.forEach((round) => {
      const variant = variants.find((item) => item.id === round.variantId);
      expect(variant).toBeTruthy();
      expect(round.instruction(lesson)).toBeTruthy();
      expect(["copy", "vary", "drill"]).toContain(round.mode);
      expect(["echo", "pocket", "dynamics", "target", "motif"]).toContain(round.focus);
    });
  });

  it("scores a selected phrase form against that form, not the original full lick", () => {
    const variant = buildPhraseVariants(lesson).find((item) => item.id === "skeleton");
    const variantLesson = applyPhraseVariant(lesson, variant);
    const beatMs = 60000 / variantLesson.bpm;
    const result = scoreTake(
      variantLesson.demoPhrase.map((note) => phraseEvent(note.note, 1000 + note.beat * beatMs, note.velocity)),
      variantLesson,
      1000,
      "copy"
    );

    expect(result.echoMatches).toBe(variantLesson.demoPhrase.length);
    expect(result.categories.find((category) => category.id === "echo").score).toBeGreaterThan(90);
  });

  it("recommends the weakest focused workout round from mastery evidence", () => {
    const roundResults = {
      [`${lesson.id}:shadow`]: { score: 88, focus: 92 },
      [`${lesson.id}:pocket`]: { score: 44, focus: 41 },
      [`${lesson.id}:touch`]: { score: 77, focus: 79 },
      [`${lesson.id}:answer`]: { score: 82, focus: 80 },
      [`${lesson.id}:twist`]: { score: 74, focus: 72 }
    };

    const mastery = evaluateLessonMastery(lesson, {}, roundResults);
    expect(mastery.nextRound.id).toBe("pocket");
    expect(mastery.nextDimension.id).toBe("pocket");
    expect(mastery.readyForTaste).toBe(false);
  });

  it("summarizes professional readiness as a strict training signal", () => {
    const roundResults = Object.fromEntries(
      ["shadow", "pocket", "touch", "answer", "twist"].map((round) => [`${lesson.id}:${round}`, { score: 90, focus: 90 }])
    );
    const summary = summarizeProfessionalReadiness([lesson], {}, roundResults);
    expect(summary.average).toBe(90);
    expect(summary.readyLessons).toBe(1);
    expect(summary.paidGradeSignal).toBe(true);
  });

  it("keeps artist-flow studies broad, explicit, and non-quote based", () => {
    const requiredProfiles = [
      "nujabes",
      "chetBaker",
      "kanye",
      "harukaNakamura",
      "marcusD",
      "ljones",
      "nitsua",
      "ciseStarr",
      "uyamaHiroto"
    ];

    requiredProfiles.forEach((profileId) => {
      expect(tasteProfiles[profileId]).toBeTruthy();
      expect(tasteProfiles[profileId].bite.length).toBeGreaterThanOrEqual(3);
      expect(tasteProfiles[profileId].avoid.toLowerCase()).not.toContain("exact");
    });

    const artistStudies = lessons.filter((item) => item.source.kind === "artist-flow-study");
    expect(artistStudies.length).toBeGreaterThanOrEqual(8);
    artistStudies.forEach((item) => {
      expect(item.unlock.type).toBe("open");
      expect(item.source.license.toLowerCase()).toContain("original educational exercise");
      expect(item.why.length).toBeGreaterThan(80);
    });
  });

  it("does not award points for an empty take", () => {
    const result = scoreTake([], lesson, 1000);
    expect(result.score).toBe(0);
    expect(result.categories.every((category) => category.score === 0)).toBe(true);
    expect(result.correction.type).toBe("listen");
  });

  it("rewards constrained target-note playing", () => {
    const result = scoreTake(
      [
        event(62, "D", 1000, 60),
        event(65, "F", 1600, 82),
        event(71, "B", 2200, 104),
        event(64, "E", 2800, 76)
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
    expect(result.categories.find((category) => category.id === "pocket").score).toBeGreaterThan(90);
    expect(result.correction.type).toBe("success");
    expect(result.nextStep).toBe(lesson.varyGoal);
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
    expect(result.correction.type).toBe("palette");
  });

  it("turns dense wandering into a space microdrill", () => {
    const result = scoreTake(
      Array.from({ length: 14 }, (_, index) => event(62 + (index % 5), "D", 1000 + index * 110)),
      lesson,
      1000
    );

    expect(result.correction.type).toBe("space");
    expect(result.correction.drill).toBeTruthy();
  });
});
