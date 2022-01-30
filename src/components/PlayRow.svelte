<script lang="ts">
  import PlayIcon from "$icons/PlayIcon.svelte";
  import { dimens } from "../utils/store";
  import { playRow } from "../utils/music2";

  function handlePlay(idx: number) {
    playRow(idx);
  }
</script>

<div class="flex flex-col">
  {#each Array($dimens.numRows) as _, idx}
    <button on:click|capture={() => handlePlay(idx)}>
      <PlayIcon />
    </button>
  {/each}
</div>

<style>
  button {
    @apply w-24 h-24
    m-1
    flex justify-center items-center
    border border-zinc-900 rounded-lg
    transition
    active:bg-white;
  }
</style>
