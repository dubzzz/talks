<template>
  <footer
    v-if="$nav.currentLayout !== 'cover'"
    class="absolute bottom-0 left-0 right-0 p-2"
    style="font-size: 0.8em; z-index: 1000"
  >
    <div style="display: flex; gap: 4px; color: rgb(222, 49, 206); align-items: center">
      <img
        src="/assets/github-white.png"
        style="height: 12px; border: none; background: none; margin: 0px"
      />
      dubzzz
    </div>
    <div style="display: flex; gap: 4px; color: rgb(222, 49, 206); align-items: center">
      <img
        src="/assets/bluesky.svg"
        style="height: 12px; border: none; background: none; margin: 0px"
      />
      @nicolas.dubien.me
    </div>
    <div style="display: flex; gap: 4px; color: rgb(222, 49, 206); align-items: center">
      <img
        src="/assets/npm.png"
        style="
          height: 12px;
          border: none;
          background: none;
          margin: 0px;
        "
      />
      fast-check
    </div>
  </footer>
</template>

<script>
navigator.wakeLock.request("screen");
</script>
