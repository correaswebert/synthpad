<script lang="ts">
  import Dimensions from "./Dimensions.svelte";
  import Nft from "./Nft.svelte";
  import Tempo from "./Tempo.svelte";
  import Player from "./Player.svelte";
  import Share from "./Share.svelte";
  import Assistant from "./Assistant.svelte";
  import Scale from "./Scale.svelte";
</script>

<div
  class="
    sticky top-0 z-10 
    w-full
    bg-zinc-900
    flex flex-col justify-center items-center
    border-b border-white"
>
  <div class="w-3/4 max-w-5xl">
    <div class="flex mt-4 w-full">
      <Dimensions />
      <Nft />
    </div>

    <div class="flex justify-between items-center w-full my-4">
      <Tempo />

      <div class="flex mx-4 pb-6">
        <Player />
        <Share />
        <Assistant />
      </div>

      <Scale />
    </div>
  </div>
</div>
