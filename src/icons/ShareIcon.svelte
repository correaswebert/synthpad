<script lang="ts">
  export let copied: boolean;
</script>

<svg
  class="{copied
    ? 'fill-cyan-500'
    : 'fill-transparent'} stroke-cyan-500 hover:fill-cyan-700"
  xmlns="http://www.w3.org/2000/svg"
  x="0"
  y="0"
  width="30"
  height="30"
  viewBox="0 0 24 24"
>
  <circle cx="18" cy="5" r="3" />
  <circle cx="6" cy="12" r="3" />
  <circle cx="18" cy="19" r="3" />
  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
</svg>
