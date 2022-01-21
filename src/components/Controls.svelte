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
  export let scale: string

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

<div class="sticky top-0 z-10 bg-zinc-900 w-full flex flex-col justify-center items-center border-b border-white">
  <div class="flex my-4">
    <div class="flex flex-col mx-4">
      <input
        class="form-control
                h-10
                px-3 py-1.5
                text-gray-700 bg-white bg-clip-padding
                rounded
                transition ease-in-out
                focus:outline-none"
        min={minNumCols}
        max={maxNumCols}
        type="number"
        bind:value={numCols}
      />
      <label for="cols" class="text-white lowercase"> Cols </label>
    </div>

    <div class="flex flex-col mx-4">
      <input
        class="form-control
                h-10
                px-3 py-1.5
                text-gray-700 bg-white bg-clip-padding
                rounded
                transition ease-in-out
                focus:outline-none"
        min={minNumRows}
        max={maxNumRows}
        type="number"
        bind:value={numRows}
      />
      <label for="rows" class="text-white lowercase"> Rows </label>
    </div>
  </div>

  <div class="flex justify-around items-center my-4 w-2/4">
    <div class="flex flex-col mx-4">
      <input
        class="form-control
              h-10
              px-3 py-1.5
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
      <label for="bpm" class="text-white lowercase"> BPM </label>
    </div>

    <div class="flex mx-4 pb-6">
      <button class="p-4" on:click={() => dispatch("clear")}>
        <BinIcon />
      </button>

      <button class="p-4" on:click={toggleIsPlaying}>
        {#if isPlaying === true}
          <PauseIcon />
        {:else}
          <PlayIcon />
        {/if}
      </button>

      <button class="p-4" on:click={stopPlaying}>
        <StopIcon />
      </button>
    </div>

    <div class="flex flex-col mx-4">
      <select
        class="appearance-none
              h-10
              px-3 py-1
              text-gray-700 bg-white
              rounded
              transition ease-in-out
              focus:border-blue-600 focus:outline-none"
        aria-label="Select scale"
        bind:value={scale}
      >
        <option value="classic" selected>classic</option>
        <option value="pentatonic">pentatonic</option>
        <option value="chromatic">chromatic</option>
        <option value="major">major</option>
        <option value="harmonic_minor">harmonic minor</option>
      </select>
      <label for="scale" class="text-white lowercase"> Scale </label>
    </div>
  </div>
</div>
