import { writable } from "svelte/store";

export const isPadPlaying = writable(false);
export const dimens = writable({
  numRows: 16,
  numCols: 4,
});

export const grid = writable<boolean[][]>([[]]);
