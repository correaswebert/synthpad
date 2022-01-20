<script>
  import Row from "./Row.svelte";

  const numRows = 8;
</script>

<div class="flex flex-col bg-neutral-900">
  {#each { length: numRows } as _}
    <Row />
  {/each}
</div>
