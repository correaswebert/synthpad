import * as Tone from "tone";
import { grid, synthState, dimens } from "./store";
import { get } from "svelte/store";

// FIX: type to be determined
let synth: any;
let playIntervalId: NodeJS.Timer;

let scales = {
  classic: [
    "B3",
    "C#4",
    "F#4",
    "G#4",
    "C#5",
    "D#5",
    "E5",
    "G#5",
    "B5",
    "C#6",
    "F#6",
    "G#6",
  ],
  pentatonic: [
    "C4",
    "D4",
    "E4",
    "G4",
    "A4",
    "C5",
    "D5",
    "E5",
    "G5",
    "A5",
    "C6",
    "D6",
  ],
  chromatic: [
    "C5",
    "C#5",
    "D5",
    "Eb5",
    "E5",
    "F5",
    "F#5",
    "G5",
    "G#5",
    "A5",
    "Bb5",
    "B5",
  ],
  major: [
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
    "D5",
    "E5",
    "F5",
    "G5",
  ],
  harmonic_minor: [
    "A4",
    "B4",
    "C5",
    "D5",
    "E5",
    "F5",
    "G#5",
    "A5",
    "B5",
    "C6",
    "D6",
    "E6",
  ],
};

let synthpad: {
  playing: boolean;
  activeRowIdx: number;
  bpm: number;
  scale: string;
};

let synthpadGrid: boolean[][];

let playing: boolean;
let activeRowIdx: number;
let bpm: number;
let scale: string;


let selectedScale = scales[synthpad?.scale ?? "major"];
const possibleScales = Object.keys(scales);

const unsubSynthState = synthState.subscribe((state) => {
  synthpad = state;
  playing = state.playing
  activeRowIdx = state.activeRowIdx
  bpm = state.bpm
  selectedScale = scales[state.scale]
});

const unsubGrid = grid.subscribe((grid) => {
  synthpadGrid = grid;
});

export const selectScale = (scale: string) => {
  if (possibleScales.includes(scale)) selectedScale = scales[scale];
};

export const initAudio = async () => {
  synth = new Tone.PolySynth(Tone.Synth).toDestination();
  synth.set({ detune: -1200 });
};

export const playRow = async (rowIdx: number) => {
  if (!synth) await initAudio();

  let notesToPlay: string[] = [];

  synthpadGrid[rowIdx].forEach((isCellActive, idx) => {
    if (isCellActive) notesToPlay.push(selectedScale[idx]);
  });

  synth.triggerAttackRelease(notesToPlay, "16n");
};

export const playCell = async (index: number) => {
  if (!synth) await initAudio();
  synth.triggerAttackRelease(selectedScale[index], "16n");
};

export function playGrid() {
  let synthDimens = get(dimens);

  playing = true;
  clearInterval(playIntervalId);

  playIntervalId = setInterval(() => {
    activeRowIdx = (activeRowIdx + 1) % synthDimens.numRows;
    synthState.set({ ...synthpad, activeRowIdx });
    playRow(activeRowIdx);
  }, (60 * 1000) / bpm);
}

export function pauseGrid() {
  playing = false;
  synthState.set({ ...synthpad, playing: false });
  clearInterval(playIntervalId);
}

export function stopGrid() {
  clearInterval(playIntervalId);
  synthState.set({ ...synthpad, activeRowIdx: -1, playing: false });
}

export function clearGrid() {
  let synthDimens = get(dimens);

  if (!synthpadGrid.length) return;

  for (let row = 0; row < synthDimens.numRows; row++) {
    for (let col = 0; col < synthDimens.numCols; col++) {
      synthpadGrid[row][col] = false;
    }
  }

  grid.update(() => synthpadGrid);
}

export function destroySubscriptions() {
  unsubSynthState();
  unsubGrid();
}
