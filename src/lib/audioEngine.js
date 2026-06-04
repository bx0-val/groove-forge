import { DrumMachine, Smolken, SplendidGrandPiano } from "smplr";

const instrumentsByContext = new WeakMap();

export function ensureAudioContext(existing) {
  if (existing) {
    warmSampleInstruments(existing);
    return existing;
  }
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = AudioContext ? new AudioContext() : null;
  if (ctx) warmSampleInstruments(ctx);
  return ctx;
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

function markReady(state, key, instrument) {
  instrument.ready
    .then(() => {
      state[`${key}Ready`] = true;
    })
    .catch(() => {
      state[`${key}Ready`] = false;
    });
}

function warmSampleInstruments(ctx) {
  if (!ctx || instrumentsByContext.has(ctx)) return instrumentsByContext.get(ctx);

  const state = {
    piano: null,
    bass: null,
    drums: null,
    pianoReady: false,
    bassReady: false,
    drumsReady: false
  };

  try {
    state.piano = SplendidGrandPiano(ctx, {
      volume: 96,
      decayTime: 0.8
    });
    markReady(state, "piano", state.piano);
  } catch {
    state.piano = null;
  }

  try {
    state.bass = Smolken(ctx, {
      instrument: "Pizzicato",
      volume: 62
    });
    markReady(state, "bass", state.bass);
  } catch {
    state.bass = null;
  }

  try {
    state.drums = DrumMachine(ctx, {
      instrument: "TR-808",
      volume: 42
    });
    markReady(state, "drums", state.drums);
  } catch {
    state.drums = null;
  }

  instrumentsByContext.set(ctx, state);
  return state;
}

export function preloadPrimarySamples(ctx) {
  const state = warmSampleInstruments(ctx);
  if (!state) return Promise.resolve();
  return Promise.allSettled([
    state.piano?.ready,
    state.bass?.ready,
    state.drums?.ready
  ]);
}

export function midiFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function playFallbackElectricPiano(ctx, midi, velocity = 90, delay = 0, duration = 1.05) {
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

export function playElectricPiano(ctx, midi, velocity = 90, delay = 0, duration = 1.05) {
  if (!ctx) return;
  const state = warmSampleInstruments(ctx);
  const when = ctx.currentTime + delay;

  if (state?.piano) {
    const playSample = () => state.piano.start({
      note: midi,
      velocity,
      time: Math.max(ctx.currentTime, when),
      duration,
      lpfCutoffHz: 4200
    });

    if (state.pianoReady) {
      playSample();
    } else {
      state.piano.ready.then(playSample).catch(() => {
        playFallbackElectricPiano(ctx, midi, velocity, delay, duration);
      });
    }
    return;
  }

  playFallbackElectricPiano(ctx, midi, velocity, delay, duration);
}

function playFallbackPulse(ctx, beatIndex = 0, delay = 0) {
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

export function playPulse(ctx, beatIndex = 0, delay = 0) {
  if (!ctx) return;
  const state = warmSampleInstruments(ctx);
  const when = ctx.currentTime + delay;

  if (state?.drums && state.drumsReady) {
    try {
      state.drums.start({
        note: beatIndex % 4 === 0 ? "kick" : "hat",
        time: when,
        velocity: beatIndex % 4 === 0 ? 58 : 34,
        duration: 0.12
      });
      return;
    } catch {
      playFallbackPulse(ctx, beatIndex, delay);
      return;
    }
  }

  playFallbackPulse(ctx, beatIndex, delay);
}

function playFallbackBass(ctx, midi, delay = 0, duration = 0.7) {
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

export function playBass(ctx, midi, delay = 0, duration = 0.7) {
  if (!ctx) return;
  const state = warmSampleInstruments(ctx);
  const when = ctx.currentTime + delay;

  if (state?.bass && state.bassReady) {
    state.bass.start({
      note: midi - 12,
      velocity: 76,
      time: when,
      duration
    });
    return;
  }

  playFallbackBass(ctx, midi, delay, duration);
}
