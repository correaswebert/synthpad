<script lang="ts">
  import { onMount } from "svelte";
  import Row from "./Row.svelte";
  import Controls from "./Controls.svelte";
  import { playRow, selectScale } from "../utils/music.svelte";

  let numRows: number = 8;
  let numCols: number = 10;
  let isGridPlaying: boolean = false;
  let currRow: number = -1;
  let bpm: number = 100;
  let scale: string = "classic"
  let playIntervalId: NodeJS.Timer;

  let grid: boolean[][] = [];

  function clearGrid() {
    if (!grid.length) return;
    for (let row = 0; row < numRows; row++)
      for (let col = 0; col < numCols; col++) grid[row][col] = false;
    grid = grid;
  }

  function emptyGrid() {
    grid = [];
  }

  function initGrid(): void {
    emptyGrid();

    for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
      const newRow = [...Array(numCols)].fill(false);
      grid = [...grid, newRow];
    }
  }

  function updateGrid(numRows: number, numCols: number): void {
    emptyGrid();

    for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
      const newRow = [...Array(numCols)].fill(false);
      grid = [...grid, newRow];
    }
  }

  function playGrid() {
    isGridPlaying = true;
    clearInterval(playIntervalId);
    playIntervalId = setInterval(() => {
      currRow = (currRow + 1) % numRows;
      playRow(grid[currRow]);
    }, (60 * 1000) / bpm);
  }

  function pauseGrid() {
    isGridPlaying = false;
    clearInterval(playIntervalId);
  }

  function stopGrid() {
    isGridPlaying = false;
    clearInterval(playIntervalId);
    currRow = -1;
  }

  $: updateGrid(numRows, numCols);

  $: selectScale(scale)

  onMount(initGrid);
</script>

<div class="w-full h-full flex flex-col items-center bg-neutral-900 overflow-y-hidden">
  <Controls
    bind:numRows
    bind:numCols
    bind:bpm
    bind:scale
    on:clear={clearGrid}
    on:play={playGrid}
    on:pause={pauseGrid}
    on:stop={stopGrid}
    on:replay={playGrid}
  />

  <div class="grow my-2 -translate-x-8 overflow-y-auto no-scrollbar">
    {#each grid as row, idx}
      <Row {isGridPlaying} isRowAcive={currRow === idx} {idx} bind:row />
    {/each}
  </div>
</div>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
      display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
  }
</style>