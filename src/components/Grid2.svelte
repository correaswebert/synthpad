<script lang="ts">
  import Row2 from "./Row2.svelte";
  import { dimens, grid } from "../utils/store";

  let isGridPlaying: boolean = false;
  let currRow: number = -1;

  function emptyGrid() {
    $grid = [];
  }

  function updateGrid(newNumRows: number, newNumCols: number): void {
    const oldGrid = [...$grid];
    emptyGrid();

    // generate the updated grid
    for (let rowIdx = 0; rowIdx < newNumRows; rowIdx++) {
      const newRow = [...Array(newNumCols)].fill(false);
      $grid = [...$grid, newRow];
    }

    if (oldGrid.length === 0) return;

    const minRows = Math.min(oldGrid.length, newNumRows);
    const minCols = Math.min(oldGrid[0].length, newNumCols);

    // reinitialize the old values
    for (let rowIdx = 0; rowIdx < minRows; rowIdx++) {
      for (let cellIdx = 0; cellIdx < minCols; cellIdx++) {
        $grid[rowIdx][cellIdx] = oldGrid[rowIdx][cellIdx];
      }
    }
  }

  $: updateGrid($dimens.numRows, $dimens.numCols);
</script>

<div class="flex flex-col">
  {#each $grid as row, idx}
    <Row2 {isGridPlaying} isRowAcive={currRow === idx} bind:row />
  {/each}
</div>
