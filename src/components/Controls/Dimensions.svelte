<script lang="ts">
  import { dimens } from "../../utils/store";

  const minNumRows = 4;
  const maxNumRows = 16;
  const minNumCols = 7;
  const maxNumCols = 12;
</script>

<div class="flex">
  <div class="flex flex-col mr-4">
    <input
      class="form-control
            h-10
            px-3 py-1.5
            text-gray-700 bg-white bg-clip-padding
            rounded
            transition ease-in-out
            focus:outline-none"
      min={minNumCols}
      max={maxNumCols}
      type="number"
      bind:value={$dimens.numCols}
    />
    <label for="cols" class="text-white lowercase"> Cols </label>
  </div>

  <div class="flex flex-col mx-4">
    <input
      class="form-control
            h-10
            px-3 py-1.5
            text-gray-700 bg-white bg-clip-padding
            rounded
            transition ease-in-out
            focus:outline-none"
      min={minNumRows}
      max={maxNumRows}
      type="number"
      bind:value={$dimens.numRows}
    />
    <label for="rows" class="text-white lowercase"> Rows </label>
  </div>
</div>
