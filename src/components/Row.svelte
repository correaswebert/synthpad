<script lang="ts">
  import { playRow } from "../utils/music.svelte";
  import Cell from "./Cell.svelte";

  export let row: boolean[];
  export let isRowAcive: boolean;
  export let idx: number;
</script>

<div class={`flex ${isRowAcive ? "scale-95 -translate-x-6" : ""}`}>
  <button
    class="w-24 h-24 m-1 text-white bg-zinc-900 rounded-lg select-none transition ease-in delay-[50ms]"
    on:click|capture={() => playRow(row)}
  >
    {idx + 1}
  </button>

  {#each row as active, idx}
    <Cell bind:active cellIdx={idx} />
  {/each}
</div>
