import { writable } from "svelte/store";

export const dimens = writable({
  numRows: 4,
  numCols: 4,
});

export const grid = writable<boolean[][]>([[]]);
export const dataUrl = writable("")

export const synthState = writable({
  playing: false,
  activeRowIdx: -1,
  bpm: 150,
  scale: "major",
});
