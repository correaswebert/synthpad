<script lang="ts">
  import LockIcon from "../icons/LockIcon.svelte";
  import { dimens } from "../utils/store";
  import { unit } from "../utils/store";
</script>

<div>
  {#each Array($dimens.numRows) as _, idx}
    <!-- TODO: handle the click -->
    <button style="width: {$unit}px; height: {$unit}px" on:click|capture>
      <LockIcon />
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
