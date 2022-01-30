<script lang="ts">
  import Controls2 from "./Controls2.svelte";
  import PlayRow from "./PlayRow.svelte";
  import Grid2 from "./Grid2.svelte";
  import LockRow from "./LockRow.svelte";
  import { fetchMusigen } from "../utils/musigen.svelte";

  let bpm: number = 100;
  let saved: boolean = false;
  let copied:boolean = false
  let grid: boolean[][] = [];

  async function aiAssist() {
    const musigenData = await fetchMusigen({grid, scale, bpm})
    grid = musigenData.grid
  }
</script>

<div
  class="w-full h-full flex flex-col items-center bg-neutral-900 overflow-y-hidden"
>
  <Controls2
    bind:saved
    bind:copied
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
