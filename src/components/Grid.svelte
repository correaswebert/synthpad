<script lang="ts">
  import { onMount } from "svelte";
  import Row from "./Row.svelte";
  import Controls from "./Controls.svelte";

  let numRows: number = 8;
  let numCols: number = 7;

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

  $: updateGrid(numRows, numCols);

  onMount(initGrid);
</script>

<div class="flex flex-col bg-neutral-900">
  <Controls bind:numRows bind:numCols on:clear={clearGrid} />

  {#each grid as row}
    <Row bind:row />
  {/each}
</div>
