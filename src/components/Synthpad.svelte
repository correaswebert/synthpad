<script lang="ts">
  import { onMount } from "svelte";
  import Row from "./Row.svelte";
  import Grid2 from "./Grid2.svelte";
  import Controls2 from "./Controls2.svelte";
  import PlayRow from "./PlayRow.svelte";
  import LockRow from "./LockRow.svelte";
  import { playRow, selectScale } from "../utils/music.svelte";
  import { decodeUrl, encodeUrl } from "../utils/hash.svelte";
  import { fetchMusigen } from "../utils/musigen.svelte";

  let numRows: number = 4;
  let numCols: number = 4;
  let isGridPlaying: boolean = false;
  let currRow: number = -1;
  let bpm: number = 100;
  let scale: string = "classic";
  let playIntervalId: NodeJS.Timer;
  let saved: boolean = false;
  let copied:boolean = false
  let grid: boolean[][] = [];
  let dataUrl: string = "";

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

  $: selectScale(scale);

  $: dataUrl = encodeUrl({ grid, scale, bpm });

</script>

<div
  class="w-full h-full flex flex-col items-center bg-neutral-900 overflow-y-hidden"
>
  <Controls2
    bind:saved
    bind:copied
    bind:dataUrl
    on:saved={saveGrid}
    on:musigen={aiAssist}
  />

  <div class="grow flex my-2 -translate-x-8 overflow-y-auto no-scrollbar">
    <PlayRow />
    <Grid2 />
    <LockRow />
  </div>
</div>

<style>
  /* Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
