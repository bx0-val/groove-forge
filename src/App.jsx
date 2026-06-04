import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Cable,
  CheckCircle2,
  Circle,
  Disc3,
  Eraser,
  Gamepad2,
  Gauge,
  Headphones,
  Keyboard,
  Lightbulb,
  ListMusic,
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
import { ensureAudioContext, playBass, playElectricPiano, playPulse } from "./lib/audioEngine";
import { lessonSteps, lessons } from "./lib/challenges";
import { createNoteEvent, midiToNote, pitchInSet } from "./lib/music";
import { phraseToMidiNotes, scoreTake } from "./lib/scoring";
import { useMidi } from "./hooks/useMidi";

const STORAGE_KEY = "groove-forge-state-v2";
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
  const [activeStep, setActiveStep] = useState("learn");
  const [isRunning, setIsRunning] = useState(false);
  const [runMode, setRunMode] = useState("copy");
  const [startedAt, setStartedAt] = useState(null);
  const [events, setEvents] = useState([]);
  const [lastScore, setLastScore] = useState(null);
  const [pulseOn, setPulseOn] = useState(true);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [coachNote, setCoachNote] = useState("Start by hearing the model phrase. Your job is to copy before you decorate.");
  const audioRef = useRef(null);
  const timersRef = useRef([]);
  const lesson = lessons.find((item) => item.id === selectedLessonId) ?? lessons[0];
  const beatMs = 60000 / lesson.bpm;
  const runLength = lesson.bars * 4 * beatMs;
  const now = useTicker(isRunning);
  const remaining = isRunning && startedAt ? runLength - (now - startedAt) : runLength;
  const progressRatio = isRunning && startedAt ? Math.min(1, (now - startedAt) / runLength) : 0;
  const phraseNotes = useMemo(() => phraseToMidiNotes(lesson.demoPhrase), [lesson]);
  const liveScore = useMemo(
    () => scoreTake(events, lesson, startedAt ?? performance.now(), runMode),
    [events, lesson, runMode, startedAt]
  );
  const activeScore = lastScore ?? liveScore;

  const getAudio = useCallback(() => {
    const ctx = ensureAudioContext(audioRef.current);
    audioRef.current = ctx;
    if (ctx?.state === "suspended") ctx.resume();
    return ctx;
  }, []);

  const clearTimers = useCallback((resetPlaying = true) => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    if (resetPlaying) setDemoPlaying(false);
  }, []);

  const playTone = useCallback(
    (midi, velocity = 90, delay = 0, duration = 1.05) => {
      const ctx = getAudio();
      playElectricPiano(ctx, midi, velocity, delay, duration);
    },
    [getAudio]
  );

  const handleNote = useCallback(
    (noteEvent) => {
      playTone(noteEvent.midi, noteEvent.velocity);
      if (!isRunning || !startedAt) return;
      setEvents((current) => [...current, noteEvent]);
    },
    [isRunning, playTone, startedAt]
  );

  const midi = useMidi(handleNote);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ journal, progress }));
  }, [journal, progress]);

  useEffect(() => {
    if (!isRunning || !startedAt || remaining > 0) return;
    finishRun();
  }, [isRunning, remaining, startedAt]);

  useEffect(() => {
    if (!isRunning || !pulseOn || !startedAt) return;
    const ctx = getAudio();
    let beat = 0;
    const id = window.setInterval(() => {
      playPulse(ctx, beat);
      if (beat % 4 === 0) playBass(ctx, lesson.rootMidi, 0, 0.45);
      beat += 1;
    }, beatMs);
    return () => window.clearInterval(id);
  }, [beatMs, getAudio, isRunning, lesson.rootMidi, pulseOn, startedAt]);

  useEffect(() => () => clearTimers(false), [clearTimers]);

  function playDemo() {
    clearTimers();
    setActiveStep("demo");
    setCoachNote("Listen for the shape first. Sing it once, then use Copy mode.");
    const ctx = getAudio();
    setDemoPlaying(true);

    for (let beat = 0; beat < lesson.bars * 4; beat += 1) {
      const id = window.setTimeout(() => {
        playPulse(ctx, beat);
        if (beat % 4 === 0) playBass(ctx, lesson.rootMidi, 0, 0.55);
      }, beat * beatMs);
      timersRef.current.push(id);
    }

    phraseNotes.forEach((note) => {
      const id = window.setTimeout(() => {
        playElectricPiano(ctx, note.midi, note.velocity, 0, note.duration * (beatMs / 1000));
      }, note.beat * beatMs);
      timersRef.current.push(id);
    });

    const done = window.setTimeout(() => setDemoPlaying(false), runLength + 120);
    timersRef.current.push(done);
  }

  function startRun(mode) {
    clearTimers();
    setRunMode(mode);
    setActiveStep(mode);
    setEvents([]);
    setLastScore(null);
    setStartedAt(performance.now());
    setIsRunning(true);
    setCoachNote(mode === "copy" ? lesson.copyGoal : lesson.varyGoal);
  }

  function finishRun() {
    const result = scoreTake(events, lesson, startedAt ?? performance.now(), runMode);
    setIsRunning(false);
    setLastScore(result);
    setActiveStep("review");
    setCoachNote(result.nextStep);
    setProgress((current) => {
      const prior = current[lesson.id] ?? { best: 0, runs: 0, copyPasses: 0 };
      return {
        ...current,
        [lesson.id]: {
          best: Math.max(prior.best, result.score),
          runs: prior.runs + 1,
          copyPasses: prior.copyPasses + (runMode === "copy" && result.echoMatches >= lesson.demoPhrase.length ? 1 : 0),
          last: result.score
        }
      };
    });
  }

  function resetRun() {
    clearTimers();
    setIsRunning(false);
    setStartedAt(null);
    setEvents([]);
    setLastScore(null);
    setCoachNote("Start by hearing the model phrase. Your job is to copy before you decorate.");
  }

  function chooseLesson(id) {
    resetRun();
    setSelectedLessonId(id);
    setActiveStep("learn");
  }

  function saveRiff() {
    if (!events.length || !lastScore) return;
    const take = {
      id: `${Date.now()}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      mode: runMode,
      score: lastScore.score,
      date: new Date().toLocaleString(),
      notes: events.slice(-24).map((event) => ({ midi: event.midi, note: event.note, velocity: event.velocity }))
    };
    setJournal((current) => [take, ...current].slice(0, 12));
  }

  function replayRiff(riff) {
    riff.notes.forEach((note, index) => {
      window.setTimeout(() => playTone(note.midi, note.velocity), index * 170);
    });
  }

  return (
    <main className="app-shell">
      <aside className="lesson-rail" aria-label="Lessons">
        <div className="brand">
          <div className="brand-mark"><Waves size={22} /></div>
          <div>
            <strong>Groove Forge</strong>
            <span>guided MIDI piano lab</span>
          </div>
        </div>

        <div className="rail-section">
          <p className="rail-label">Lesson path</p>
          {lessons.map((item) => {
            const lessonProgress = progress[item.id];
            const active = item.id === lesson.id;
            return (
              <button className={`lesson-card ${active ? "active" : ""}`} key={item.id} onClick={() => chooseLesson(item.id)}>
                <span className="lesson-icon">{active ? <Disc3 size={18} /> : <Circle size={12} />}</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.skill}</small>
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
          <p>{midi.activeInput ?? "Use a MIDI keyboard, screen keys, or computer keys."}</p>
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
            <p>{lesson.subtitle}</p>
          </div>
          <div className="topbar-actions">
            <button className={`icon-toggle ${pulseOn ? "on" : ""}`} onClick={() => setPulseOn((value) => !value)} title="Toggle pulse">
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
              <button className="primary-button" onClick={() => startRun("copy")}>
                <Play size={16} />
                Copy
              </button>
            )}
          </div>
        </header>

        <LessonCoach
          activeStep={activeStep}
          lesson={lesson}
          onDemo={playDemo}
          onCopy={() => startRun("copy")}
          onVary={() => startRun("vary")}
          demoPlaying={demoPlaying}
        />

        <div className="groove-board">
          <div className="board-header">
            <div>
              <span>{lesson.key}</span>
              <strong>{lesson.bpm} BPM</strong>
            </div>
            <div className="clock">{formatClock(remaining)}</div>
            <div>
              <span>{runMode === "copy" ? "Copy target" : "Variation target"}</span>
              <strong>{lesson.targets.join(" / ")}</strong>
            </div>
          </div>

          <GrooveLane
            lesson={lesson}
            events={events}
            phraseNotes={phraseNotes}
            progressRatio={progressRatio}
            runLength={runLength}
            startedAt={startedAt}
          />

          <div className="constraint-strip">
            <Constraint icon={<Target size={16} />} label="Allowed notes" value={lesson.palette.join(" ")} />
            <Constraint icon={<ListMusic size={16} />} label="Model phrase" value={lesson.demoPhrase.map((note) => note.note.replace(/\d$/, "")).join(" - ")} />
            <Constraint icon={<Gauge size={16} />} label="Rule" value={runMode === "copy" ? lesson.copyGoal : lesson.varyGoal} />
          </div>
        </div>

        <VirtualKeyboard lesson={lesson} onNote={(midiNote) => handleNote(createNoteEvent(midiNote, 98, "screen"))} />
      </section>

      <aside className="feedback-panel">
        <ScoreCard score={activeScore.score} title={lastScore ? "Run reviewed" : isRunning ? "Listening" : "Ready"} note={coachNote} />
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

        <div className="reflection-card">
          <div className="panel-heading">
            <Lightbulb size={18} />
            <h3>What to notice</h3>
          </div>
          <p>{lesson.reflection}</p>
        </div>

        <div className="actions-grid">
          <button className="secondary-button" onClick={saveRiff} disabled={!lastScore || !events.length}>
            <Save size={16} />
            Save take
          </button>
          <button className="secondary-button" onClick={() => setJournal([])} disabled={!journal.length}>
            <Eraser size={16} />
            Clear
          </button>
        </div>

        <RiffJournal journal={journal} replayRiff={replayRiff} />
      </aside>
    </main>
  );
}

function LessonCoach({ activeStep, lesson, onDemo, onCopy, onVary, demoPlaying }) {
  return (
    <section className="coach-board">
      <div className="stepper" aria-label="Lesson steps">
        {lessonSteps.map((step) => (
          <div className={`step-pill ${activeStep === step.id ? "active" : ""}`} key={step.id}>
            <span>{step.label}</span>
            <small>{step.verb}</small>
          </div>
        ))}
      </div>

      <div className="coach-grid">
        <article className="move-card">
          <div className="panel-heading">
            <BookOpen size={18} />
            <h2>{lesson.move}</h2>
          </div>
          <p>{lesson.why}</p>
          <div className="coach-actions">
            <button className="primary-button" onClick={onDemo}>
              <Headphones size={16} />
              {demoPlaying ? "Playing" : "Hear teacher"}
            </button>
            <button className="secondary-button" onClick={onCopy}>
              <Play size={16} />
              Copy it
            </button>
            <button className="secondary-button" onClick={onVary}>
              <Sparkles size={16} />
              Vary it
            </button>
          </div>
        </article>

        <article className="listen-card">
          <h3>Listen for</h3>
          <ul>
            {lesson.listenFor.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article className="steps-card">
          <h3>Do this</h3>
          <ol>
            {lesson.steps.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </article>
      </div>
    </section>
  );
}

function GrooveLane({ events, lesson, phraseNotes, progressRatio, runLength, startedAt }) {
  const totalBeats = lesson.bars * 4;
  return (
    <div className="lane" aria-label="Groove lane">
      <div className="playhead" style={{ left: `${progressRatio * 100}%` }} />
      {Array.from({ length: 8 }, (_, bar) => (
        <div className="beat-column" key={bar}>
          <span>{bar + 1}</span>
        </div>
      ))}
      {phraseNotes.map((note, index) => (
        <div
          className="note-chip ghost"
          key={`${note.note}-${note.beat}-${index}`}
          style={{
            left: `${Math.max(2, Math.min(96, (note.beat / totalBeats) * 100))}%`,
            top: `${15 + ((note.midi % 12) / 12) * 68}%`
          }}
        >
          {note.note.replace(/\d$/, "")}
        </div>
      ))}
      {events.slice(-32).map((event) => {
        const offset = startedAt ? ((event.timestamp - startedAt) / runLength) * 100 : 0;
        const laneY = 15 + ((event.midi % 12) / 12) * 68;
        return (
          <div
            className={`note-chip ${pitchInSet(event.midi, lesson.palette) ? "in" : "out"}`}
            key={event.id}
            style={{
              left: `${Math.max(1, Math.min(96, offset))}%`,
              top: `${laneY}%`
            }}
          >
            {event.pitchClass}
          </div>
        );
      })}
    </div>
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

function ScoreCard({ score, title, note }) {
  return (
    <div className="score-card">
      <div className="score-ring" style={{ "--score": `${score * 3.6}deg` }}>
        <span>{score}</span>
      </div>
      <div>
        <p className="panel-label">Coach score</p>
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
    </div>
  );
}

function RiffJournal({ journal, replayRiff }) {
  return (
    <div className="journal">
      <div className="panel-heading">
        <Trophy size={18} />
        <h3>Take journal</h3>
      </div>
      {journal.length === 0 ? (
        <p className="empty">Save a copy or variation take after review. Replay it tomorrow before starting a new one.</p>
      ) : (
        journal.map((riff) => (
          <button className="riff-row" key={riff.id} onClick={() => replayRiff(riff)}>
            <span>
              <strong>{riff.lessonTitle}</strong>
              <small>{riff.mode} mode - {riff.date}</small>
            </span>
            <em>{riff.score}</em>
          </button>
        ))
      )}
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
        <span>allowed notes glow; targets have amber feet</span>
      </div>
      <div className="keyboard">
        {keys.map((midi, index) => {
          const note = midiToNote(midi);
          const pitch = note.replace(/\d$/, "");
          const black = pitch.includes("#");
          const inPalette = pitchInSet(midi, lesson.palette);
          const isTarget = pitchInSet(midi, lesson.targets);
          return (
            <button
              key={midi}
              className={`piano-key ${black ? "black" : "white"} ${inPalette ? "allowed" : ""} ${isTarget ? "target" : ""}`}
              onClick={() => onNote(midi)}
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
