<script lang="ts">
  import Cell from "./Cell.svelte";

  export let row: boolean[]
</script>

<div class="flex">
  {#each row as active, idx}
    <Cell bind:active cellIdx={idx} />
  {/each}
</div>
