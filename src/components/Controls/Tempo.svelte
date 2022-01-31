<script lang="ts">
  import { synthState } from "../../utils/store";
</script>

<div class="flex flex-col mr-4">
  <input
    class="form-control
        h-10
        px-3 py-1.5
        text-gray-700 bg-white bg-clip-padding
        rounded
        transition ease-in-out
        focus:outline-none"
    min={0}
    max={1000}
    type="number"
    bind:value={$synthState.bpm}
  />
  <label for="bpm" class="text-white lowercase"> BPM </label>
</div>
