<script lang="ts">
  import Cell from "./Cell.svelte";
  import { synthState, dimens } from "../utils/store";

  export let rowIdx: number;

  $: isActive = $synthState.activeRowIdx === rowIdx;
</script>

<div class="flex">
  <div class={`${isActive ? "scale-95 -translate-x-1" : ""}`}>
    {#each Array($dimens.numCols) as _, cellIdx}
      <Cell on:update {cellIdx} {rowIdx} />
    {/each}
  </div>
</div>
