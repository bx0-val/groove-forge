import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Cable,
  CheckCircle2,
  Circle,
  Disc3,
  Eraser,
  Gamepad2,
  Gauge,
  Keyboard,
  Play,
  RotateCcw,
  Save,
  Sparkles,
  Square,
  Target,
  Trophy,
  Volume2,
  Waves
} from "lucide-react";
import { lessons } from "./lib/challenges";
import { createNoteEvent, midiToNote } from "./lib/music";
import { scoreTake } from "./lib/scoring";
import { useMidi } from "./hooks/useMidi";

const STORAGE_KEY = "groove-forge-state-v1";
const KEY_LABELS = ["A", "W", "S", "E", "D", "F", "T", "G", "Y", "H", "U", "J", "K", "O", "L", "P", ";"];

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? { journal: [], progress: {} };
  } catch {
    return { journal: [], progress: {} };
  }
}

function formatClock(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function useTicker(active) {
  const [now, setNow] = useState(performance.now());
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setNow(performance.now()), 80);
    return () => window.clearInterval(id);
  }, [active]);
  return now;
}

export default function App() {
  const saved = useMemo(loadState, []);
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0].id);
  const [journal, setJournal] = useState(saved.journal);
  const [progress, setProgress] = useState(saved.progress);
  const [isRunning, setIsRunning] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [events, setEvents] = useState([]);
  const [lastScore, setLastScore] = useState(null);
  const [metronome, setMetronome] = useState(true);
  const audioRef = useRef(null);
  const lesson = lessons.find((item) => item.id === selectedLessonId) ?? lessons[0];
  const runLength = lesson.bars * 4 * (60000 / lesson.bpm);
  const now = useTicker(isRunning);
  const remaining = isRunning && startedAt ? runLength - (now - startedAt) : runLength;
  const progressRatio = isRunning && startedAt ? Math.min(1, (now - startedAt) / runLength) : 0;

  const playTone = useCallback((midi, velocity = 80) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = audioRef.current ?? new AudioContext();
    audioRef.current = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    osc.frequency.value = frequency;
    osc.type = "triangle";
    gain.gain.setValueAtTime(Math.min(0.22, velocity / 620), ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.58);
  }, []);

  const handleNote = useCallback(
    (noteEvent) => {
      playTone(noteEvent.midi, noteEvent.velocity);
      if (!isRunning || !startedAt) return;
      setEvents((current) => [...current, noteEvent]);
    },
    [isRunning, startedAt, playTone]
  );

  const midi = useMidi(handleNote);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ journal, progress }));
  }, [journal, progress]);

  useEffect(() => {
    if (!isRunning || !startedAt || remaining > 0) return;
    finishRun();
  }, [isRunning, startedAt, remaining]);

  useEffect(() => {
    if (!isRunning || !metronome || !startedAt) return;
    const beatMs = 60000 / lesson.bpm;
    const id = window.setInterval(() => {
      const midi = 36;
      playTone(midi, 42);
    }, beatMs);
    return () => window.clearInterval(id);
  }, [isRunning, startedAt, metronome, lesson.bpm, playTone]);

  function startRun() {
    setEvents([]);
    setLastScore(null);
    setStartedAt(performance.now());
    setIsRunning(true);
  }

  function finishRun() {
    const result = scoreTake(events, lesson, startedAt ?? performance.now());
    setIsRunning(false);
    setLastScore(result);
    setProgress((current) => {
      const prior = current[lesson.id] ?? { best: 0, runs: 0 };
      return {
        ...current,
        [lesson.id]: {
          best: Math.max(prior.best, result.score),
          runs: prior.runs + 1,
          last: result.score
        }
      };
    });
  }

  function resetRun() {
    setIsRunning(false);
    setStartedAt(null);
    setEvents([]);
    setLastScore(null);
  }

  function saveRiff() {
    if (!events.length || !lastScore) return;
    const take = {
      id: `${Date.now()}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      score: lastScore.score,
      date: new Date().toLocaleString(),
      notes: events.slice(-24).map((event) => ({ midi: event.midi, note: event.note, velocity: event.velocity }))
    };
    setJournal((current) => [take, ...current].slice(0, 12));
  }

  function replayRiff(riff) {
    riff.notes.forEach((note, index) => {
      window.setTimeout(() => playTone(note.midi, note.velocity), index * 160);
    });
  }

  const liveScore = useMemo(
    () => scoreTake(events, lesson, startedAt ?? performance.now()),
    [events, lesson, startedAt]
  );
  const activeScore = lastScore ?? liveScore;

  return (
    <main className="app-shell">
      <aside className="lesson-rail" aria-label="Lessons">
        <div className="brand">
          <div className="brand-mark"><Waves size={22} /></div>
          <div>
            <strong>Groove Forge</strong>
            <span>MIDI feel trainer</span>
          </div>
        </div>

        <div className="rail-section">
          <p className="rail-label">Campaign</p>
          {lessons.map((item) => {
            const lessonProgress = progress[item.id];
            const active = item.id === lesson.id;
            return (
              <button
                className={`lesson-card ${active ? "active" : ""}`}
                key={item.id}
                onClick={() => {
                  resetRun();
                  setSelectedLessonId(item.id);
                }}
              >
                <span className="lesson-icon">{active ? <Disc3 size={18} /> : <Circle size={12} />}</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </span>
                <em>{lessonProgress?.best ? lessonProgress.best : "--"}</em>
              </button>
            );
          })}
        </div>

        <div className="midi-panel">
          <div>
            <Cable size={18} />
            <strong>{midi.status === "ready" ? "MIDI ready" : "MIDI optional"}</strong>
          </div>
          <p>{midi.activeInput ?? "Use a MIDI keyboard, mouse, or computer keys A-L."}</p>
          <button className="secondary-button" onClick={midi.requestAccess}>
            <Keyboard size={16} />
            Connect MIDI
          </button>
        </div>
      </aside>

      <section className="stage">
        <header className="topbar">
          <div>
            <h1>{lesson.title}</h1>
            <p>{lesson.instruction}</p>
          </div>
          <div className="topbar-actions">
            <button className={`icon-toggle ${metronome ? "on" : ""}`} onClick={() => setMetronome((value) => !value)} title="Toggle metronome">
              <Volume2 size={18} />
            </button>
            <button className="secondary-button" onClick={resetRun}>
              <RotateCcw size={16} />
              Reset
            </button>
            {isRunning ? (
              <button className="primary-button stop" onClick={finishRun}>
                <Square size={16} />
                Finish
              </button>
            ) : (
              <button className="primary-button" onClick={startRun}>
                <Play size={16} />
                Start run
              </button>
            )}
          </div>
        </header>

        <div className="groove-board">
          <div className="board-header">
            <div>
              <span>{lesson.key}</span>
              <strong>{lesson.bpm} BPM</strong>
            </div>
            <div className="clock">{formatClock(remaining)}</div>
            <div>
              <span>Target</span>
              <strong>{lesson.targets.join(" / ")}</strong>
            </div>
          </div>

          <div className="lane" aria-label="Groove lane">
            <div className="playhead" style={{ left: `${progressRatio * 100}%` }} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
              <div className="beat-column" key={bar}>
                <span>{bar + 1}</span>
              </div>
            ))}
            {events.slice(-32).map((event, index) => {
              const offset = startedAt ? ((event.timestamp - startedAt) / runLength) * 100 : 0;
              const laneY = 15 + ((event.midi % 12) / 12) * 68;
              return (
                <div
                  className={`note-chip ${lesson.palette.includes(event.pitchClass) ? "in" : "out"}`}
                  key={event.id}
                  style={{
                    left: `${Math.max(1, Math.min(96, offset))}%`,
                    top: `${laneY}%`,
                    animationDelay: `${index * 12}ms`
                  }}
                >
                  {event.pitchClass}
                </div>
              );
            })}
          </div>

          <div className="constraint-strip">
            <Constraint icon={<Target size={16} />} label="Palette" value={lesson.palette.join(" ")} />
            <Constraint icon={<Activity size={16} />} label="Prompt" value={lesson.prompt} />
            <Constraint icon={<Gauge size={16} />} label="Rule" value={`${lesson.bars} bars, save only intentional takes`} />
          </div>
        </div>

        <VirtualKeyboard lesson={lesson} onNote={(midiNote) => handleNote(createNoteEvent(midiNote, 98, "screen"))} />
      </section>

      <aside className="feedback-panel">
        <div className="score-card">
          <div className="score-ring" style={{ "--score": `${activeScore.score * 3.6}deg` }}>
            <span>{activeScore.score}</span>
          </div>
          <div>
            <p className="panel-label">Run score</p>
            <h2>{lastScore ? "Take complete" : isRunning ? "Listening" : "Ready"}</h2>
            <p>{activeScore.nextStep}</p>
          </div>
        </div>

        <div className="feedback-list">
          {activeScore.categories.map((category) => (
            <div className="feedback-row" key={category.id}>
              <div className="feedback-title">
                {category.score > 70 ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
                <strong>{category.label}</strong>
                <span>{category.score}</span>
              </div>
              <p>{category.detail}</p>
              <div className="meter"><span style={{ width: `${category.score}%` }} /></div>
            </div>
          ))}
        </div>

        <div className="actions-grid">
          <button className="secondary-button" onClick={saveRiff} disabled={!lastScore || !events.length}>
            <Save size={16} />
            Save riff
          </button>
          <button className="secondary-button" onClick={() => setJournal([])} disabled={!journal.length}>
            <Eraser size={16} />
            Clear
          </button>
        </div>

        <div className="journal">
          <div className="panel-heading">
            <Trophy size={18} />
            <h3>Riff journal</h3>
          </div>
          {journal.length === 0 ? (
            <p className="empty">Finish a run and save a take. The app will make you reuse your best accidents.</p>
          ) : (
            journal.map((riff) => (
              <button className="riff-row" key={riff.id} onClick={() => replayRiff(riff)}>
                <span>
                  <strong>{riff.lessonTitle}</strong>
                  <small>{riff.date}</small>
                </span>
                <em>{riff.score}</em>
              </button>
            ))
          )}
        </div>
      </aside>
    </main>
  );
}

function Constraint({ icon, label, value }) {
  return (
    <div className="constraint">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function VirtualKeyboard({ lesson, onNote }) {
  const keys = Array.from({ length: 17 }, (_, index) => 60 + index);
  return (
    <div className="keyboard-wrap">
      <div className="panel-heading">
        <Gamepad2 size={18} />
        <h3>Play surface</h3>
        <span>Computer keys mirror the keyboard</span>
      </div>
      <div className="keyboard">
        {keys.map((midi, index) => {
          const note = midiToNote(midi);
          const pitch = note.replace(/\d$/, "");
          const black = pitch.includes("#");
          const inPalette = lesson.palette.includes(pitch);
          const isTarget = lesson.targets.includes(pitch);
          return (
            <button
              key={midi}
              className={`piano-key ${black ? "black" : "white"} ${inPalette ? "allowed" : ""} ${isTarget ? "target" : ""}`}
              onClick={() => onNote(midi)}
              style={{ "--i": index }}
            >
              <span>{pitch}</span>
              <small>{KEY_LABELS[index]}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
