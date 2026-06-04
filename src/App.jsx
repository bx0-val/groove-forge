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
import { ensureAudioContext, playBass, playElectricPiano, playPulse, preloadPrimarySamples } from "./lib/audioEngine";
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
  const [activeStep, setActiveStep] = useState("source");
  const [isRunning, setIsRunning] = useState(false);
  const [runMode, setRunMode] = useState("copy");
  const [runInstruction, setRunInstruction] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [events, setEvents] = useState([]);
  const [lastScore, setLastScore] = useState(null);
  const [pulseOn, setPulseOn] = useState(true);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [coachNote, setCoachNote] = useState("Start by hearing the model phrase. Your job is to copy before you decorate.");
  const [heardLessons, setHeardLessons] = useState({});
  const [earAnswers, setEarAnswers] = useState({});
  const audioRef = useRef(null);
  const timersRef = useRef([]);
  const demoRequestRef = useRef(0);
  const lesson = lessons.find((item) => item.id === selectedLessonId) ?? lessons[0];
  const beatMs = 60000 / lesson.bpm;
  const runLength = lesson.bars * 4 * beatMs;
  const now = useTicker(isRunning);
  const remaining = isRunning && startedAt ? runLength - (now - startedAt) : runLength;
  const progressRatio = isRunning && startedAt ? Math.min(1, (now - startedAt) / runLength) : 0;
  const phraseNotes = useMemo(() => phraseToMidiNotes(lesson.demoPhrase), [lesson]);
  const heardDemo = Boolean(heardLessons[lesson.id]);
  const earAnswer = earAnswers[lesson.id] ?? null;
  const notesRevealed = heardDemo || earAnswer !== null || Boolean(lastScore);
  const liveScore = useMemo(
    () => scoreTake(events, lesson, startedAt ?? performance.now(), runMode),
    [events, lesson, runMode, startedAt]
  );
  const activeScore = lastScore ?? liveScore;
  const displayCorrection =
    isRunning && runMode === "drill" && runInstruction
      ? {
          title: "Microdrill in progress",
          action: runInstruction,
          why: "This narrowed retry is the one thing to fix before going back to the full phrase.",
          drill: runInstruction
        }
      : activeScore.correction;

  const getAudio = useCallback(() => {
    const ctx = ensureAudioContext(audioRef.current);
    audioRef.current = ctx;
    if (ctx?.state === "suspended") ctx.resume();
    return ctx;
  }, []);

  const clearTimers = useCallback((resetPlaying = true) => {
    demoRequestRef.current += 1;
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

  async function playDemo() {
    clearTimers();
    const demoRequest = demoRequestRef.current + 1;
    demoRequestRef.current = demoRequest;
    setActiveStep("demo");
    setCoachNote("Loading the acoustic piano, then listen for the shape.");
    const ctx = getAudio();
    setDemoPlaying(true);
    await preloadPrimarySamples(ctx);
    if (demoRequest !== demoRequestRef.current) return;
    setHeardLessons((current) => ({ ...current, [lesson.id]: true }));
    setCoachNote("Listen for the shape first. Sing it once, then use Copy mode.");

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

    const done = window.setTimeout(() => {
      setDemoPlaying(false);
      if (demoRequest === demoRequestRef.current) setActiveStep("ear");
    }, runLength + 120);
    timersRef.current.push(done);
  }

  function startRun(mode, instruction = null) {
    clearTimers();
    setRunMode(mode);
    setRunInstruction(instruction);
    setActiveStep(mode === "drill" ? "fix" : mode);
    setEvents([]);
    setLastScore(null);
    setStartedAt(performance.now());
    setIsRunning(true);
    setCoachNote(instruction ?? (mode === "copy" ? lesson.copyGoal : mode === "drill" ? lesson.drillGoal : lesson.varyGoal));
  }

  function finishRun() {
    const result = scoreTake(events, lesson, startedAt ?? performance.now(), runMode);
    setIsRunning(false);
    setLastScore(result);
    setActiveStep("compare");
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
    setRunInstruction(null);
    setCoachNote("Start by hearing the model phrase. Your job is to copy before you decorate.");
  }

  function chooseLesson(id) {
    resetRun();
    setSelectedLessonId(id);
    setActiveStep("source");
    setCoachNote("Steal the source idea first, then copy it by ear.");
  }

  function answerEarCheck(index) {
    const correct = index === lesson.earCheck.answer;
    setEarAnswers((current) => ({ ...current, [lesson.id]: index }));
    setActiveStep(correct ? "copy" : "ear");
    setCoachNote(correct ? lesson.earCheck.success : lesson.earCheck.miss);
  }

  function playComparison() {
    if (!events.length || !startedAt) return;
    clearTimers(false);
    setActiveStep("compare");
    setCoachNote("First the source phrase, then your take. Listen for the one gap before fixing it.");
    const ctx = getAudio();
    const phraseEndBeat = Math.max(...phraseNotes.map((note) => note.beat + note.duration), 8);
    const userOffsetMs = (phraseEndBeat + 1.5) * beatMs;

    phraseNotes.forEach((note) => {
      const id = window.setTimeout(() => {
        playElectricPiano(ctx, note.midi, note.velocity, 0, note.duration * (beatMs / 1000));
      }, note.beat * beatMs);
      timersRef.current.push(id);
    });

    events
      .filter((event) => event.type === "noteon")
      .filter((event) => (event.timestamp - startedAt) / beatMs <= phraseEndBeat + 0.5)
      .slice(0, 24)
      .forEach((event) => {
        const id = window.setTimeout(() => {
          playElectricPiano(ctx, event.midi, event.velocity, 0, 0.75);
        }, userOffsetMs + Math.max(0, event.timestamp - startedAt));
        timersRef.current.push(id);
      });
  }

  function startMicrodrill() {
    const instruction = lastScore?.correction?.drill ?? lesson.drillGoal;
    startRun("drill", instruction);
  }

  function saveRiff() {
    if (!events.length || !lastScore) return;
    const take = {
      id: `${Date.now()}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      sourceName: lesson.source.name,
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
                  <small>{item.world}</small>
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
            <p>{lesson.level} - {lesson.subtitle}</p>
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
              <button className="primary-button" onClick={() => startRun("copy")} disabled={!heardDemo}>
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
          canPractice={heardDemo}
          onEarAnswer={answerEarCheck}
          heardDemo={heardDemo}
          earAnswer={earAnswer}
          notesRevealed={notesRevealed}
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
              <span>{runMode === "copy" ? "Copy target" : runMode === "drill" ? "Drill target" : "Variation target"}</span>
              <strong>{lesson.targets.join(" / ")}</strong>
            </div>
          </div>

          <GrooveLane
            lesson={lesson}
            events={events}
            phraseNotes={phraseNotes}
            notesRevealed={notesRevealed}
            progressRatio={progressRatio}
            runLength={runLength}
            startedAt={startedAt}
          />

          <div className="constraint-strip">
            <Constraint icon={<Target size={16} />} label="Allowed notes" value={lesson.palette.join(" ")} />
            <Constraint icon={<ListMusic size={16} />} label="Model phrase" value={notesRevealed ? lesson.demoPhrase.map((note) => note.note.replace(/\d$/, "")).join(" - ") : "Listen first - no labels yet"} />
            <Constraint icon={<Gauge size={16} />} label="Rule" value={runInstruction ?? (runMode === "copy" ? lesson.copyGoal : runMode === "drill" ? lesson.drillGoal : lesson.varyGoal)} />
          </div>
        </div>

        <VirtualKeyboard lesson={lesson} onNote={(midiNote) => handleNote(createNoteEvent(midiNote, 98, "screen"))} />
      </section>

      <aside className="feedback-panel">
        <ScoreCard score={activeScore.score} title={lastScore ? "Run reviewed" : isRunning ? "Listening" : "Ready"} note={coachNote} />
        <CorrectionCard
          correction={displayCorrection}
          canCompare={Boolean(lastScore && events.length)}
          canDrill={Boolean(lastScore)}
          onCompare={playComparison}
          onDrill={startMicrodrill}
        />
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

function LessonCoach({ activeStep, lesson, onDemo, onCopy, onVary, canPractice, onEarAnswer, heardDemo, earAnswer, notesRevealed, demoPlaying }) {
  const selectedEar = earAnswer !== null ? lesson.earCheck.options[earAnswer] : null;
  const earCorrect = earAnswer === lesson.earCheck.answer;

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
        <article className="source-card">
          <div className="source-kicker">{lesson.world}</div>
          <h3>Steal this move</h3>
          <p>{lesson.stealThis}</p>
          <div className="source-box">
            <strong>{lesson.source.name}</strong>
            <span>{lesson.source.license}</span>
            <small>{lesson.source.adaptation}</small>
          </div>
        </article>

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
            <button className="secondary-button" onClick={onCopy} disabled={!canPractice}>
              <Play size={16} />
              Copy it
            </button>
            <button className="secondary-button" onClick={onVary} disabled={!canPractice}>
              <Sparkles size={16} />
              Vary it
            </button>
          </div>
        </article>

        <article className="ear-card">
          <h3>Ear check</h3>
          <p>{heardDemo ? lesson.earCheck.question : "Hear the source phrase before the app shows the note names."}</p>
          <div className="ear-options">
            {lesson.earCheck.options.map((option, index) => (
              <button
                className={`ear-option ${earAnswer === index ? "selected" : ""} ${earAnswer === index && earCorrect ? "correct" : ""}`}
                disabled={!heardDemo}
                key={option}
                onClick={() => onEarAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedEar && <small>{earCorrect ? lesson.earCheck.success : lesson.earCheck.miss}</small>}
        </article>

        <article className="listen-card">
          <h3>Phrase anatomy</h3>
          <ol>
            {lesson.anatomy.map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ol>
          {!notesRevealed && <p className="note-reveal">Note names reveal after hearing or answering the ear check.</p>}
        </article>

        <article className="steps-card">
          <h3>Practice script</h3>
          <ol>
            {lesson.steps.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </article>
      </div>
    </section>
  );
}

function GrooveLane({ events, lesson, phraseNotes, notesRevealed, progressRatio, runLength, startedAt }) {
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
          className={`note-chip ghost ${notesRevealed ? "" : "hidden-label"}`}
          key={`${note.note}-${note.beat}-${index}`}
          style={{
            left: `${Math.max(2, Math.min(96, (note.beat / totalBeats) * 100))}%`,
            top: `${15 + ((note.midi % 12) / 12) * 68}%`
          }}
        >
          {notesRevealed ? note.note.replace(/\d$/, "") : "?"}
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

function CorrectionCard({ correction, canCompare, canDrill, onCompare, onDrill }) {
  return (
    <div className="correction-card">
      <div className="panel-heading">
        <Target size={18} />
        <h3>Fix this next</h3>
      </div>
      <strong>{correction.title}</strong>
      <p>{correction.action}</p>
      <small>{correction.why}</small>
      <div className="correction-actions">
        <button className="secondary-button" onClick={onCompare} disabled={!canCompare}>
          <Headphones size={16} />
          Replay A/B
        </button>
        <button className="primary-button" onClick={onDrill} disabled={!canDrill}>
          <Target size={16} />
          Microdrill
        </button>
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
