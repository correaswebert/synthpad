<script lang="ts">
  import { onMount } from "svelte";
  import Row from "./Row.svelte";
  import Controls from "./Controls.svelte";
import { playRow } from "../utils/music.svelte";

  let numRows: number = 8;
  let numCols: number = 7;
  let isPlaying: boolean = false;
  let currRow: number = 0;
  let bpm = 100;
  let playIntervalId: NodeJS.Timer

  let grid: boolean[][] = [];

  function clearGrid() {
    if (!grid.length) return
    for (let row = 0; row < numRows; row++)
      for (let col = 0; col < numCols; col++) 
        grid[row][col] = false;
    grid = grid
  }

  function emptyGrid() {
    grid = []
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
    clearInterval(playIntervalId)
    playIntervalId = setInterval(() => {
      playRow(grid[currRow]);
      currRow++;
      currRow %= numRows;
		},  60 * 1000 / bpm);
  }

  $: updateGrid(numRows, numCols);

  onMount(initGrid);
</script>

<div class="flex flex-col bg-neutral-900">
  <Controls bind:numRows bind:numCols bind:bpm on:clear={clearGrid} on:play={playGrid} />

  {#each grid as row}
    <Row bind:row />
  {/each}
</div>
