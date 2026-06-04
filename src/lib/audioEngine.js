export function ensureAudioContext(existing) {
  if (existing) return existing;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return AudioContext ? new AudioContext() : null;
}

function connectEnvelope(ctx, destination, when, velocity, duration) {
  const gain = ctx.createGain();
  const peak = Math.min(0.42, Math.max(0.08, velocity / 260));
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(peak, when + 0.018);
  gain.gain.exponentialRampToValueAtTime(peak * 0.42, when + 0.16);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  gain.connect(destination);
  return gain;
}

export function midiFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

export function playElectricPiano(ctx, midi, velocity = 90, delay = 0, duration = 1.05) {
  if (!ctx) return;
  const when = ctx.currentTime + delay;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2600 + velocity * 12, when);
  filter.Q.setValueAtTime(0.8, when);
  filter.connect(ctx.destination);

  const envelope = connectEnvelope(ctx, filter, when, velocity, duration);
  const frequency = midiFrequency(midi);
  const partials = [
    { ratio: 1, gain: 0.78, type: "sine", detune: 0 },
    { ratio: 2, gain: 0.18, type: "sine", detune: 4 },
    { ratio: 3.01, gain: 0.08, type: "triangle", detune: -5 }
  ];

  partials.forEach((partial) => {
    const osc = ctx.createOscillator();
    const partGain = ctx.createGain();
    osc.type = partial.type;
    osc.frequency.setValueAtTime(frequency * partial.ratio, when);
    osc.detune.setValueAtTime(partial.detune, when);
    partGain.gain.setValueAtTime(partial.gain, when);
    osc.connect(partGain).connect(envelope);
    osc.start(when);
    osc.stop(when + duration + 0.08);
  });
}

export function playPulse(ctx, beatIndex = 0, delay = 0) {
  if (!ctx) return;
  const when = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(beatIndex % 4 === 0 ? 880 : 660, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.08, when + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.09);
  osc.connect(gain).connect(ctx.destination);
  osc.start(when);
  osc.stop(when + 0.11);
}

export function playBass(ctx, midi, delay = 0, duration = 0.7) {
  if (!ctx) return;
  const when = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(midiFrequency(midi), when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.12, when + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(when);
  osc.stop(when + duration + 0.04);
}
