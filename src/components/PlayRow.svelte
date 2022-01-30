<script lang="ts">
  import PlayIcon from "$icons/PlayIcon.svelte";
  import { dimens, grid } from "../utils/store";
  import { playRow } from "../utils/music.svelte";

  function handlePlay(idx: number) {
    playRow($grid[idx])
  }
</script>

<div class="flex flex-col">
  {#each Array($dimens.numRows) as _, idx}
    <button
      class="
        w-24 h-24
        m-1
        flex justify-center items-center
        border border-zinc-900 rounded-lg
        transition
        active:bg-white"
      on:click|capture={() => handlePlay(idx)}
    >
      <PlayIcon />
    </button>
  {/each}
</div>
