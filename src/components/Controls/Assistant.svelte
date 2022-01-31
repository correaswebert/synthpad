<script lang="ts">
  import UndoIcon from "../../icons/UndoIcon.svelte";
  import RedoIcon from "../../icons/RedoIcon.svelte";
  import RobotIcon from "../../icons/RobotIcon.svelte";

  function musigenHelper() {}
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
