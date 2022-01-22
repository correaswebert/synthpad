<script lang="ts">
  let follower: HTMLDivElement;

  const mouseX = (event: MouseEvent): number => event.clientX;
  const mouseY = (event: MouseEvent): number => event.clientY;

  const positionElement = (event: MouseEvent) => {
    let mouse = {
      x: mouseX(event),
      y: mouseY(event),
    };

    follower.style.top = `${mouse.y}px`;
    follower.style.left = `${mouse.x}px`;
  };

  window.addEventListener("mousemove", (ev) => {
    setTimeout(() => positionElement(ev), 1)
  })
</script>

<div class="follower" bind:this={follower}>
  <div class="circle1" />
</div>

<style>
  .follower {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
  }

  .follower .circle1 {
    position: absolute;
    background: rgba(77, 77, 77, 0.5);
    border-radius: 50%;
    height: 2em;
    width: 2em;
  }
</style>
