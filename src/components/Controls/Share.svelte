<script lang="ts">
  import SaveIcon from "../../icons/SaveIcon.svelte";
  import ShareIcon from "../../icons/ShareIcon.svelte";

  import { dataUrl, grid, synthState } from "../../utils/store";
  import { encodeUrl } from "../../utils/hash";

  let saved: boolean;
  let copied = false;

  function saveData() {
    saved = true;
  }

  async function copyUrl() {
    if (!copied) {
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      const url = `${origin}${pathname}?dataUrl=${$dataUrl}`;
      await navigator.clipboard.writeText(url);
    }
    copied = true;
  }

  function updateSavedStates(_grid: boolean[][]) {
    copied = false;
    saved = false;
  }

  $: updateSavedStates($grid);

  $: $dataUrl = encodeUrl({
    grid: $grid,
    scale: $synthState.scale,
    bpm: $synthState.bpm,
  });
</script>

<div class="flex mx-8">
  <button class="p-4" on:click={saveData}>
    <SaveIcon bind:saved />
  </button>

  <button class="p-4 relative inline-block" on:click={copyUrl}>
    <ShareIcon bind:copied />
  </button>
</div>
