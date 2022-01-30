<script lang="ts">
  import Cell2 from "./Cell2.svelte";
  import { synthState, dimens } from "../utils/store";

  export let rowIdx: number;

  $: isActive = $synthState.activeRowIdx === rowIdx;
</script>

<div class="flex">
  <div class={`${isActive ? "scale-95 -translate-x-1" : ""}`}>
    {#each Array($dimens.numCols) as _, cellIdx}
      <Cell2 on:update {cellIdx} {rowIdx} />
    {/each}
  </div>
</div>
