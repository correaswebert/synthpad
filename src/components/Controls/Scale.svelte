<script lang="ts">
  import { synthState } from "../../utils/store";
</script>

<div class="flex flex-col ml-4">
  <select
    class="appearance-none
              h-10
              px-3 py-1
              text-gray-700 bg-white
              rounded
              transition ease-in-out
              focus:border-blue-600 focus:outline-none"
    aria-label="Select scale"
    bind:value={$synthState.scale}
  >
    <option value="classic" selected>classic</option>
    <option value="pentatonic">pentatonic</option>
    <option value="chromatic">chromatic</option>
    <option value="major">major</option>
    <option value="harmonic_minor">harmonic minor</option>
  </select>
  <label for="scale" class="text-white lowercase"> Scale </label>
</div>
