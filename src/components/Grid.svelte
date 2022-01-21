<script lang="ts">
  import { onMount } from 'svelte';
  import Row from "./Row.svelte";
  import Controls from "./Controls.svelte";

  let numRows: number = 8;
  let numCols: number = 7

  let grid: boolean[][] = [];

  function clearGrid() {
    grid = []
  }

  function initGrid(): void {
    clearGrid()

    for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
      const newRow = [...Array(numCols)].fill(false)
      grid = [...grid, newRow]
    }
  }
  
  function upgradeGrid(numRows: number, numCols: number): void {
    clearGrid();
    
    for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
      const newRow = [...Array(numCols)].fill(false)
      grid = [...grid, newRow]
    }
  }

  $: upgradeGrid(numRows, numCols)

  onMount(initGrid)
</script>

<div class="flex flex-col bg-neutral-900">
  <Controls bind:numRows bind:numCols />
  {#each grid as row}
    <Row bind:row />
  {/each}
</div>
