<script lang="ts">
  import { playCell } from "../utils/music.svelte";

  export let cellIdx: number;
  export let active: boolean;
  export let isGridPlaying: boolean

  let focused = false;

  const addFocus = () => {
    focused = true;
  };
  const removeFocus = () => {
    focused = false;
  };

  function clickHandler() {
    active = !active;
    if (active && !isGridPlaying) playCell(cellIdx);
  }
</script>

<button
  class="w-24 h-24 m-1 bg-zinc-900 border border-white rounded-lg select-none transition ease-in delay-[50ms]"
  class:active
  class:focused
  on:mouseenter={addFocus}
  on:mouseleave={removeFocus}
  on:click={clickHandler}
/>

<style>
  button.focused {
    box-shadow: 0px 0px 8px 2px rgb(255, 255, 255, 0.5);
  }

  button.active {
    background-color: #eee;
    box-shadow: 0px 0px 8px 2px rgb(255, 255, 255, 0.5);
  }
</style>
