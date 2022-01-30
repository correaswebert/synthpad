<script lang="ts">
  import Cell from "./Cell.svelte";

  export let row: boolean[];
  export let isRowAcive: boolean;
  export let isGridPlaying: boolean;
</script>

<div class="flex">
  <div class={`${isRowAcive ? "scale-95 -translate-x-1" : ""}`}>
    {#each row as active, idx}
      <Cell on:update bind:active cellIdx={idx} {isGridPlaying} />
    {/each}
  </div>
</div>
