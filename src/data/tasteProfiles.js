export const tasteProfiles = {
  nujabes: {
    id: "nujabes",
    artist: "Nujabes",
    lens: "Loop as a room",
    mindset: "Make the harmony feel like a warm place, then say less than the loop invites.",
    bite: ["late entrance", "minor pentatonic answer", "warm 9th color", "loop restraint"],
    avoid: "Do not chase speed. The pocket is the sound.",
    practice: "Enter after the downbeat, play one answer, then leave the loop alone.",
    touch: "Soft first note, slightly firmer answer, no hard accents."
  },
  chetBaker: {
    id: "chet-baker",
    artist: "Chet Baker",
    lens: "Voice before instrument",
    mindset: "Phrase like a person who has to breathe. The empty space carries the line.",
    bite: ["short question", "audible breath", "falling answer", "soft target note"],
    avoid: "Do not fill the bar just because your hands can.",
    practice: "Sing the phrase once, play it once, then remove one note.",
    touch: "Feather-light attack with one clear note at the emotional center."
  },
  kanye: {
    id: "kanye",
    artist: "Kanye West",
    lens: "Chop the feeling, not the whole source",
    mindset: "Find a small soulful cell, repeat it until it becomes the hook, then make one bold harmonic move.",
    bite: ["two-beat chop", "gospel-ish lift", "hard repeat", "one dramatic bass turn"],
    avoid: "Do not quote a known sample or melody. Study the chop logic.",
    practice: "Repeat the same tiny cell three times, then change only the final landing.",
    touch: "Confident repeated notes with a heavier last landing."
  },
  harukaNakamura: {
    id: "haruka-nakamura",
    artist: "Haruka Nakamura",
    lens: "Memory through repetition",
    mindset: "Let the piano feel remembered instead of performed. Small changes should feel like light moving.",
    bite: ["soft ostinato", "add2/add9 color", "long sustain", "quiet return"],
    avoid: "Do not turn the atmosphere into a busy exercise.",
    practice: "Repeat a small shape twice, make the second one softer, then hold the color note.",
    touch: "Very soft, even touch with the color note allowed to ring."
  },
  marcusD: {
    id: "marcus-d",
    artist: "Marcus D",
    lens: "Cinematic jazz-hop lift",
    mindset: "Use a clean arpeggio to make the loop feel like it opens upward, then resolve plainly.",
    bite: ["arpeggio rise", "clear top note", "major 6 color", "cinematic resolve"],
    avoid: "Do not over-orchestrate the hand part. Let one rise do the work.",
    practice: "Play a rising broken chord, hold the high note, then answer lower.",
    touch: "Even climb with the top note slightly brighter."
  },
  ljones: {
    id: "ljones",
    artist: "Ljones",
    lens: "Dusty pocket",
    mindset: "Make the phrase feel sampled and slightly behind the grid without losing the pulse.",
    bite: ["behind-the-beat hit", "two-note motif", "low-register answer", "dusty restraint"],
    avoid: "Do not quantize your feeling to death.",
    practice: "Place the first note late on purpose and keep the motif small.",
    touch: "Muted, relaxed attack; no bright show-off notes."
  },
  nitsua: {
    id: "nitsua",
    artist: "Nitsua",
    lens: "Inward nostalgia loop",
    mindset: "Make a tiny descending memory and let it loop until it feels inevitable.",
    bite: ["descending cell", "plain minor color", "quiet repeat", "soft unresolved ending"],
    avoid: "Do not solve the phrase too quickly.",
    practice: "Descend, pause, repeat the memory with one note missing.",
    touch: "Gentle and inward; the last note should feel private."
  },
  ciseStarr: {
    id: "cise-starr",
    artist: "Cise Starr",
    lens: "MC cadence as melody",
    mindset: "Think in syllable groups and breath pockets. The piano line can rap without words.",
    bite: ["3-note syllable burst", "breath gap", "answer tag", "cadence memory"],
    avoid: "Do not write lyrics or imitate a specific verse. Steal the phrasing math.",
    practice: "Tap the rhythm like speech, then map only a few notes onto it.",
    touch: "Per-note accents like spoken emphasis, then a softer tag."
  },
  uyamaHiroto: {
    id: "uyama-hiroto",
    artist: "Uyama Hiroto",
    lens: "Spiritual modal air",
    mindset: "Let the line float over a modal room, with a wide breath and a peaceful color tone.",
    bite: ["modal root", "wide leap", "6/9 color", "air before resolve"],
    avoid: "Do not make the mode a scale worksheet.",
    practice: "Hold the room, leap to the color, then descend calmly.",
    touch: "Open, unforced attack with a ringing color note."
  }
};

export function getTasteProfile(id) {
  return tasteProfiles[id] ?? Object.values(tasteProfiles).find((profile) => profile.id === id);
}
