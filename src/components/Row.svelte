<script>
  import Cell from "./Cell.svelte";

  const numCells = 7;
</script>

<div class="flex">
  {#each { length: numCells } as _}
    <Cell />
  {/each}
</div>
