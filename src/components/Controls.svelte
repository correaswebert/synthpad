<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let isPlaying = false;

  export let numRows: number;
  export let numCols: number;
  export let bpm: number;

  const dispatch = createEventDispatcher();

  const minNumRows = 4;
  const maxNumRows = 16;
  const minNumCols = 7;
  const maxNumCols = 12;

  let debounceTimerId: NodeJS.Timeout;

  function toggleIsPlaying() {
    isPlaying = !isPlaying;
    if (isPlaying) dispatch("play");
    else dispatch("pause");
  }

  function stopPlaying() {
    isPlaying = false;
    dispatch("stop");
  }

  const debounceReplay = () => {
    clearTimeout(debounceTimerId);
    debounceTimerId = setTimeout(() => dispatch("replay"), 100);
  };
</script>

<div class="flex">
  <label for="numRows">
    Number of rows
    <input
      min={minNumRows}
      max={maxNumRows}
      type="number"
      bind:value={numRows}
    />
  </label>

  <label for="numCols">
    Number of cols
    <input
      min={minNumCols}
      max={maxNumCols}
      type="number"
      bind:value={numCols}
    />
  </label>

  <label for="bpm">
    BPM
    <input
      min={0}
      max={1000}
      type="number"
      bind:value={bpm}
      on:change={debounceReplay}
    />
  </label>
</div>

<button class="text-white" on:click={toggleIsPlaying}>
  {isPlaying ? "Pause" : "Play"}
</button>

<button class="text-white" on:click={stopPlaying}> Stop </button>

<button class="text-white" on:click={() => dispatch("clear")}>
  Clear grid
</button>
