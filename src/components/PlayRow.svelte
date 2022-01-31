<script lang="ts">
  import PlayIcon from "$icons/PlayIcon.svelte";
  import { dimens } from "../utils/store";
  import { playRow } from "../utils/music";
  import {unit} from "../utils/store"
</script>

<div class="flex flex-col">
  {#each Array($dimens.numRows) as _, idx}
    <button
      style="width: {$unit}px; height: {$unit}px"
      on:click|capture={() => playRow(idx)}
    >
      <PlayIcon />
    </button>
  {/each}
</div>

<style>
  button {
    @apply m-1
    flex justify-center items-center
    border border-zinc-900 rounded-lg
    transition
    active:bg-white;
  }
</style>
