<script lang="ts">
  import { playCell } from "../utils/music";
  import { synthState, grid } from "../utils/store";
  import {unit} from "../utils/store"

  export let rowIdx: number;
  export let cellIdx: number;

  let focused = false;

  const addFocus = () => {
    focused = true;
  };
  const removeFocus = () => {
    focused = false;
  };

  function clickHandler() {
    $grid[rowIdx][cellIdx] = !active;

    // checking for not being previously active
    if (!active && !$synthState.playing) playCell(cellIdx);
  }

  $: active = $grid[rowIdx][cellIdx]
</script>

<button
  style="width: {$unit}px; height: {$unit}px"
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

  /* @apply w-24 h-24 */
  /* m-1 */
  button {
    @apply
    bg-zinc-900
    border border-white rounded
    select-none
    transition ease-in delay-[50ms];
    margin: 2px
  }
</style>
