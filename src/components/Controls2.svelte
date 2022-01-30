<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BinIcon from "../icons/BinIcon.svelte";
  import PauseIcon from "../icons/PauseIcon.svelte";
  import PlayIcon from "../icons/PlayIcon.svelte";
  import StopIcon from "../icons/StopIcon.svelte";
  import SaveIcon from "../icons/SaveIcon.svelte";
  import ShareIcon from "../icons/ShareIcon.svelte";
  import UndoIcon from "../icons/UndoIcon.svelte";
  import RedoIcon from "../icons/RedoIcon.svelte";
  import RobotIcon from "../icons/RobotIcon.svelte";
  import { dimens, synthState, dataUrl, grid } from "../utils/store";
  import { playGrid, pauseGrid, stopGrid, clearGrid } from "../utils/music2";
  import { encodeUrl } from "../utils/hash2";

  let isPlaying = $synthState.playing;
  let saved: boolean;
  let copied = false;

  const dispatch = createEventDispatcher();

  const minNumRows = 4;
  const maxNumRows = 16;
  const minNumCols = 7;
  const maxNumCols = 12;

  let debounceTimerId: NodeJS.Timeout;
  let createdNft = false;

  function toggleIsPlaying() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playGrid();
    } else {
      pauseGrid();
    }
  }

  function stopPlaying() {
    isPlaying = false;
    stopGrid();
  }

  function saveData() {
    if (!saved) dispatch("saved");
    saved = true;
  }

  async function copyUrl() {
    if (!copied) {
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      const url = `${origin}${pathname}?dataUrl=${$dataUrl}`;
      await navigator.clipboard.writeText(url);
      dispatch("copied");
    }
    copied = true;
  }

  async function createNft() {
    createdNft = true;
  }

  const debounceReplay = () => {
    clearTimeout(debounceTimerId);
    debounceTimerId = setTimeout(() => dispatch("replay"), 100);
  };

  function musigenHelper() {
    dispatch("musigen");
  }

  function updateSavedStates(_grid: boolean[][]) {
    copied = false;
    saved = false;
  }

  $: updateSavedStates($grid)

  $: $dataUrl = encodeUrl({
    grid: $grid,
    scale: $synthState.scale,
    bpm: $synthState.bpm,
  });
</script>

<div
  class="sticky top-0 z-10 bg-zinc-900 w-full flex flex-col justify-center items-center border-b border-white"
>
  <div class="w-3/4 max-w-5xl">
    <div class="flex mt-4 w-full">
      <div class="flex flex-col mr-4">
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
          bind:value={$dimens.numCols}
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
          bind:value={$dimens.numRows}
        />
        <label for="rows" class="text-white lowercase"> Rows </label>
      </div>

      <div class="flex grow flex-col ml-4 overflow-hidden">
        <button
          class="text-ellipsis whitespace-nowrap overflow-hidden
                font-mono text-left
                h-10
                px-3 py-1.5
                text-gray-700 bg-white bg-clip-padding
                hover:bg-gray-300
                rounded
                transition ease-in-out
                focus:outline-none"
          on:click={createNft}
        >
          {#if createdNft}
            <a href="" class="">Click to visit</a>
          {:else}
            Click to create an NFT
          {/if}
        </button>

        <label for="data" class="text-white lowercase">
          Create NFT
          {#if createdNft}
            •
            <span class="text-green-500">created!</span>
          {/if}
        </label>
      </div>
    </div>

    <div class="flex justify-between items-center w-full my-4">
      <div class="flex flex-col mr-4">
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
          bind:value={$synthState.bpm}
          on:change={debounceReplay}
        />
        <label for="bpm" class="text-white lowercase"> BPM </label>
      </div>

      <div class="flex mx-4 pb-6">
        <div class="flex">
          <button class="p-4" on:click={clearGrid}>
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

        <div class="flex mx-8">
          <button class="p-4" on:click={saveData}>
            <SaveIcon bind:saved />
          </button>

          <button class="p-4 relative inline-block" on:click={copyUrl}>
            <ShareIcon bind:copied />
          </button>
        </div>

        <div class="flex">
          <button class="p-4 relative inline-block" on:click={() => {}}>
            <UndoIcon />
          </button>

          <button class="p-4 relative inline-block" on:click={() => {}}>
            <RedoIcon />
          </button>

          <button class="p-4 relative inline-block" on:click={musigenHelper}>
            <RobotIcon />
          </button>
        </div>
      </div>

      <div class="flex flex-col ml-4">
        <select
          class="appearance-none
              h-10
              px-3 py-1
              text-gray-700 bg-white
              rounded
              transition ease-in-out
              focus:border-blue-600 focus:outline-none"
          aria-label="Select scale"
          bind:value={$synthState.scale}
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
</div>
