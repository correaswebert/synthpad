<script lang="ts">
  import UndoIcon from "../../icons/UndoIcon.svelte";
  import RedoIcon from "../../icons/RedoIcon.svelte";
  import RobotIcon from "../../icons/RobotIcon.svelte";
  import { fetchMusigen } from "../../utils/musigen";
  import { grid, synthState } from "../../utils/store";

  async function musigenHelper() {
    try {
      const musigenResponse = await fetchMusigen({
        bpm: $synthState.bpm,
        grid: $grid,
        scale: $synthState.scale,
      });

      $grid = musigenResponse.grid;
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="flex">
  <button class="p-4 relative inline-block" on:click={() => {}}>
    <UndoIcon />
  </button>

  <button class="p-4 relative inline-block" on:click={() => {}}>
    <RedoIcon />
  </button>

  <button class="p-4 relative inline-block" on:click={musigenHelper}>
    <RobotIcon />
  </button>
</div>
