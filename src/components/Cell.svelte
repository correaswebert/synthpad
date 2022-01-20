<script lang="ts">
  let active = false;
  let focused = false;

  const addFocus = () => {
    focused = true;
  };
  const removeFocus = () => {
    focused = false;
  };

  const toggleActive = () => {
    active = !active;
  };
</script>

<button
  class="w-24 h-24 m-1 bg-zinc-900 rounded-lg select-none transition ease-in delay-[50ms]"
  class:active
  class:focused
  on:mouseenter={addFocus}
  on:mouseleave={removeFocus}
  on:focus
  on:click={toggleActive}
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
