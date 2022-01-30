<script lang="ts">
  import LockIcon from "../icons/LockIcon.svelte";
  import { dimens } from "../utils/store";
</script>

<div class="flex flex-col">
  {#each Array($dimens.numRows) as _, idx}
    <!-- TODO: handle the click -->
    <button on:click|capture>
      <LockIcon />
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
