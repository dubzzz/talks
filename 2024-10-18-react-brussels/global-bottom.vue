<template>
  <footer
    v-if="$nav.currentLayout !== 'cover'"
    class="absolute bottom-0 left-0 right-0 p-2"
    style="font-size: 0.8em; z-index: 1000"
  >
    <div style="display: flex; gap: 4px; color: rgb(247, 147, 35); align-items: center">
      <img
        src="/assets/github-white.png"
        style="height: 12px; border: none; background: none; margin: 0px"
      />
      dubzzz
    </div>
    <div style="display: flex; gap: 4px; color: rgb(247, 147, 35); align-items: center">
      <img
        src="/assets/x.png"
        style="height: 12px; border: none; background: none; margin: 0px"
      />
      ndubien
    </div>
    <div style="display: flex; gap: 4px; color: rgb(247, 147, 35); align-items: center">
      <img
        src="/assets/npm.png"
        style="
          height: 12px;
          border: none;
          background: none;
          margin: 0px;
          filter: hue-rotate(45deg);
        "
      />
      fast-check
    </div>
  </footer>
</template>

<script>
await navigator.wakeLock.request("screen");
</script>
