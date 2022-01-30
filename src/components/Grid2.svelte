<script lang="ts">
  import Row2 from "./Row2.svelte";
  import { dimens, grid, synthState } from "../utils/store";
  import { playRow } from "../utils/music2";

  let currRow: number = -1;
  let playIntervalId: NodeJS.Timer;
  let bpm = 150;

  export function clearGrid() {
    if (!$grid.length) return;

    for (let row = 0; row < $dimens.numRows; row++) {
      for (let col = 0; col < $dimens.numCols; col++) {
        $grid[row][col] = false;
      }
    }

    $grid = $grid;
  }

  function updateGrid(newNumRows: number, newNumCols: number): void {
    const oldGrid = [...$grid];
    $grid = [];

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
  {#each Array($dimens.numRows) as _, rowIdx}
    <Row2 {rowIdx} />
  {/each}
</div>
