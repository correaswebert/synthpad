<script lang="ts">
  import { onMount } from "svelte";
  import Row from "./Row.svelte";
  import Controls from "./Controls.svelte";
  import { playRow } from "../utils/music.svelte";

  let numRows: number = 8;
  let numCols: number = 7;
  let isGridPlaying: boolean = false;
  let currRow: number = -1;
  let bpm = 100;
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
    isGridPlaying = true
    clearInterval(playIntervalId);
    playIntervalId = setInterval(() => {
      currRow = (currRow + 1) % numRows;
      playRow(grid[currRow]);
    }, (60 * 1000) / bpm);
  }

  function pauseGrid() {
    isGridPlaying = false
    clearInterval(playIntervalId);
  }
  
  function stopGrid() {
    isGridPlaying = false
    clearInterval(playIntervalId)
    currRow = -1
  }

  $: updateGrid(numRows, numCols);

  onMount(initGrid);
</script>

<div class="flex flex-col bg-neutral-900">
  <Controls
    bind:numRows
    bind:numCols
    bind:bpm
    on:clear={clearGrid}
    on:play={playGrid}
    on:pause={pauseGrid}
    on:stop={stopGrid}
  />

  {#each grid as row, idx}
    <Row isGridPlaying={isGridPlaying} isRowAcive={currRow === idx} idx={idx} bind:row />
  {/each}
</div>
