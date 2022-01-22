<script lang="ts">
  export let saved: boolean
</script>

<svg
  class="{saved ? 'fill-cyan-500' : 'fill-transparent'} stroke-cyan-500 hover:fill-cyan-700"
  xmlns="http://www.w3.org/2000/svg"
  x="0"
  y="0"
  width="30"
  height="30"
  viewBox="0 0 24 24"
>
  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
</svg>
