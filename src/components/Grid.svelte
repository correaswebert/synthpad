<script lang="ts">
  import Row from "./Row.svelte";
  import { dimens, grid, synthState } from "../utils/store";
  import { decodeUrl } from "../utils/hash";
  import { onMount } from "svelte";

  function initGrid(): void {
    if (window.location.search === "") return;

    const dataUrl = window.location.search.split("=")[1];
    window.history.replaceState(null, "", window.location.origin);

    const synthData = decodeUrl(dataUrl);
    $grid = synthData.grid;
    $synthState.scale = synthData.scale;
    $synthState.bpm = synthData.bpm;
    $dimens.numRows = synthData.grid.length;
    $dimens.numCols = synthData.grid[0].length;
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

  onMount(initGrid);
</script>

<div class="flex flex-col">
  {#each Array($dimens.numRows) as _, rowIdx}
    <Row {rowIdx} />
  {/each}
</div>
