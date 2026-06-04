import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createNoteEvent, KEYBOARD_MAP, normalizeMidiMessage } from "../lib/music";

export function useMidi(onNote) {
  const [status, setStatus] = useState("idle");
  const [inputs, setInputs] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const noteHandler = useRef(onNote);

  useEffect(() => {
    noteHandler.current = onNote;
  }, [onNote]);

  const emitSimulated = useCallback((midi, velocity = 92) => {
    noteHandler.current(createNoteEvent(midi, velocity, "simulator"));
  }, []);

  const requestAccess = useCallback(async () => {
    if (!navigator.requestMIDIAccess) {
      setStatus("unsupported");
      return;
    }

    try {
      setStatus("requesting");
      const access = await navigator.requestMIDIAccess({ sysex: false });
      const nextInputs = [...access.inputs.values()];
      setInputs(nextInputs.map((input) => ({ id: input.id, name: input.name || "MIDI input" })));
      setStatus(nextInputs.length ? "ready" : "no-inputs");

      nextInputs.forEach((input) => {
        input.onmidimessage = (message) => {
          const event = normalizeMidiMessage(message);
          if (event?.type === "noteon") {
            noteHandler.current({
              ...createNoteEvent(event.midi, event.velocity, "midi"),
              rawNote: event.note
            });
          }
        };
      });

      setActiveInput(nextInputs[0]?.name ?? null);
      access.onstatechange = () => {
        const refreshed = [...access.inputs.values()];
        setInputs(refreshed.map((input) => ({ id: input.id, name: input.name || "MIDI input" })));
        setStatus(refreshed.length ? "ready" : "no-inputs");
      };
    } catch (error) {
      setStatus("denied");
    }
  }, []);

  useEffect(() => {
    const down = (event) => {
      if (event.repeat) return;
      const midi = KEYBOARD_MAP[event.key.toLowerCase()];
      if (midi) emitSimulated(midi, 86 + Math.round(Math.random() * 32));
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [emitSimulated]);

  return useMemo(
    () => ({ status, inputs, activeInput, requestAccess, emitSimulated }),
    [status, inputs, activeInput, requestAccess, emitSimulated]
  );
}
