<script lang="ts">
  import Controls from "./Controls.svelte";
  import PlayRow from "./PlayRow.svelte";
  import Grid from "./Grid.svelte";
  import LockRow from "./LockRow.svelte";
</script>

<div
  class="
    w-full h-full
    flex flex-col items-center
    bg-neutral-900
    overflow-y-hidden"
>
  <Controls />

  <div class="grow flex my-2 -translate-x-8 overflow-y-auto no-scrollbar">
    <PlayRow />
    <Grid />
    <LockRow />
  </div>
</div>

<style>
  /* Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
