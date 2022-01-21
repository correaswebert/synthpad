<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let isPlaying = false

  export let numRows
  export let numCols
  export let bpm

  const dispatch = createEventDispatcher()

  const minNumRows = 4
  const maxNumRows = 16
  const minNumCols = 7
  const maxNumCols = 12

  function toggleIsPlaying() {
    isPlaying = !isPlaying
    dispatch('play')
  }
</script>

<div class="flex">
  <label for="numRows">
    Number of rows
    <input min={minNumRows} max={maxNumRows} type="number" bind:value={numRows} />
  </label>

  <label for="numCols">
    Number of cols
    <input min={minNumCols} max={maxNumCols} type="number" bind:value={numCols} />
  </label>

  <label for="bpm">
    BPM
    <input min={0} max={1000} type="number" bind:value={bpm} />
  </label>
</div>

<button class="text-white" on:click={toggleIsPlaying}>
  {isPlaying ? 'Pause' : 'Play'}
</button>

<button class="text-white" on:click={() => dispatch('clear')}>
  Clear grid
</button>
