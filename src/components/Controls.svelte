<script lang="ts">
  export let isPlaying = false

  export let numRows = 4
  export let numCols = 4

  function toggleIsPlaying() {
    isPlaying = !isPlaying
  }
</script>

<div class="flex">
  <label for="numRows">
    Number of rows
    <input min="4" max="16" type="number" bind:value={numRows} />
  </label>

  <label for="numCols">
    Number of cols
    <input min="7" max="12" type="number" bind:value={numCols} />
  </label>
</div>

<button class="text-white" on:click={toggleIsPlaying}>
  {isPlaying ? 'Pause' : 'Play'}
</button>

<button class="text-white" on:click={toggleIsPlaying}>
  Clear grid
</button>
