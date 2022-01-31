import { writable, derived } from "svelte/store";

export const dimens = writable({
  numRows: 4,
  numCols: 4,
});

export const width = writable(0);
export const unit = derived([width, dimens], ([$width, $dimens]) =>
  // error in small devices occuring because of Controls.svelte
  // that is not scaled, so the clientWidth is different!
  Math.min($width / ($dimens.numCols + 4), 96)
);
export const isMobile = derived(width, $width => ($width < 576))

export const grid = writable<boolean[][]>([[]]);
export const dataUrl = writable("");

export const synthState = writable({
  playing: false,
  activeRowIdx: -1,
  bpm: 150,
  scale: "major",
});
