<script lang="ts">
  let createdNft = false;

  async function createNft() {
    createdNft = true;
  }
</script>

<div class="flex grow flex-col ml-4 overflow-hidden">
  <button
    class="text-ellipsis whitespace-nowrap overflow-hidden
                font-mono text-left
                h-10
                px-3 py-1.5
                text-gray-700 bg-white bg-clip-padding
                hover:bg-gray-300
                rounded
                transition ease-in-out
                focus:outline-none"
    on:click={createNft}
  >
    {#if createdNft}
      <a href="" class="">Click to visit</a>
    {:else}
      Click to create an NFT
    {/if}
  </button>

  <label for="data" class="text-white lowercase">
    Create NFT
    {#if createdNft}
      •
      <span class="text-green-500">created!</span>
    {/if}
  </label>
</div>
