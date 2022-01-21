<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BinIcon from "../icons/BinIcon.svelte";
  import PauseIcon from "../icons/PauseIcon.svelte";
  import PlayIcon from "../icons/PlayIcon.svelte";
  import StopIcon from "../icons/StopIcon.svelte";

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
    Rows
    <input
      min={minNumRows}
      max={maxNumRows}
      type="number"
      bind:value={numRows}
    />
  </label>

  <label for="numCols">
    Cols
    <input
      min={minNumCols}
      max={maxNumCols}
      type="number"
      bind:value={numCols}
    />
  </label>
</div>

<div class="flex justify-around">
  <label for="bpm">
    BPM
    <input
      class="form-control
        px-3
        py-1.5
        text-gray-700 bg-white bg-clip-padding
        rounded
        transition ease-in-out
        focus:outline-none"
      min={0}
      max={1000}
      type="number"
      bind:value={bpm}
      on:change={debounceReplay}
    />
  </label>

  <div>
    <button class="border-0 text-white active:bg-transparent" on:click={() => dispatch("clear")}>
      <BinIcon />
    </button>

    <button class="border-0 text-white active:bg-transparent" on:click={toggleIsPlaying}>
      {#if isPlaying === true}
        <PauseIcon />
      {:else}
        <PlayIcon />
      {/if}
    </button>

    <button class="border-0 text-white active:bg-transparent" on:click={stopPlaying}>
      <StopIcon />
    </button>
  </div>

  <select
    class="appearance-none
      px-3 py-1.5
      text-gray-700 bg-white
      rounded
      transition ease-in-out
      focus:border-blue-600 focus:outline-none"
    aria-label="Select scale"
  >
    <option value="classic" selected>classic</option>
    <option value="pentatonic">pentatonic</option>
    <option value="chromatic">chromatic</option>
    <option value="major">major</option>
    <option value="harmonic minor">harmonic minor</option>
  </select>
</div>
