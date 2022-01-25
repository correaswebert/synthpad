<script lang="ts">
  import { onMount } from "svelte";
  import Row from "./Row.svelte";
  import Controls from "./Controls.svelte";
  import { playRow, selectScale } from "../utils/music.svelte";
  import { decodeUrl, encodeUrl } from "../utils/hash.svelte";
  import { fetchMusigen } from "../utils/musigen.svelte";

  let numRows: number = 4;
  let numCols: number = 8;
  let isGridPlaying: boolean = false;
  let currRow: number = -1;
  let bpm: number = 100;
  let scale: string = "classic";
  let playIntervalId: NodeJS.Timer;
  let saved: boolean = false;
  let copied:boolean = false
  let grid: boolean[][] = [];
  let dataUrl: string = "";

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
    if (window.location.search === "") return;

    const dataUrl = window.location.search.split("=")[1];
    window.history.replaceState(null, "", window.location.origin);

    const synthData = decodeUrl(dataUrl);
    grid = synthData.grid;
    scale = synthData.scale;
    bpm = synthData.bpm;
    numRows = grid.length;
    numCols = grid[0].length;
  }

  function updateGrid(newNumRows: number, newNumCols: number): void {
    const oldGrid = [...grid];
    emptyGrid();

    for (let rowIdx = 0; rowIdx < newNumRows; rowIdx++) {
      const newRow = [...Array(newNumCols)].fill(false);
      grid = [...grid, newRow];
    }

    if (oldGrid.length === 0) return;
    const minRows = Math.min(oldGrid.length, newNumRows);
    const minCols = Math.min(oldGrid[0].length, newNumCols);

    for (let rowIdx = 0; rowIdx < minRows; rowIdx++) {
      for (let cellIdx = 0; cellIdx < minCols; cellIdx++) {
        grid[rowIdx][cellIdx] = oldGrid[rowIdx][cellIdx];
      }
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

  function saveGrid() {
    const urlData = encodeUrl({ grid, scale, bpm });
    console.log(urlData);
  }

  function unsetSaved() {
    saved = false;
    copied = false;
  }

  async function aiAssist() {
    const musigenData = await fetchMusigen({grid, scale, bpm})
    grid = musigenData.grid
  }

  $: updateGrid(numRows, numCols);

  $: selectScale(scale);

  $: dataUrl = encodeUrl({ grid, scale, bpm });

  onMount(initGrid);
</script>

<div
  class="w-full h-full flex flex-col items-center bg-neutral-900 overflow-y-hidden"
>
  <Controls
    bind:numRows
    bind:numCols
    bind:bpm
    bind:scale
    bind:saved
    bind:copied
    bind:dataUrl
    on:clear={clearGrid}
    on:play={playGrid}
    on:pause={pauseGrid}
    on:stop={stopGrid}
    on:replay={playGrid}
    on:saved={saveGrid}
    on:musigen={aiAssist}
  />

  <div class="grow my-2 -translate-x-8 overflow-y-auto no-scrollbar">
    {#each grid as row, idx}
      <Row
        on:update={unsetSaved}
        {isGridPlaying}
        isRowAcive={currRow === idx}
        {idx}
        bind:row
      />
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
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
