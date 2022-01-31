<script lang="ts">
  import BinIcon from "../../icons/BinIcon.svelte";
  import PauseIcon from "../../icons/PauseIcon.svelte";
  import PlayIcon from "../../icons/PlayIcon.svelte";
  import StopIcon from "../../icons/StopIcon.svelte";

  import { synthState } from "../../utils/store";
  import { playGrid, pauseGrid, stopGrid, clearGrid } from "../../utils/music";

  let isPlaying = $synthState.playing;

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
</script>

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
