<template>
  <footer
    v-if="$nav.currentLayout !== 'cover'"
    class="absolute bottom-0 left-0 right-0 p-2"
    style="font-size: 0.8em; z-index: 1000"
  >
    <div style="display: flex; gap: 4px; color: #555; align-items: center">
      <img
        src="/assets/github-white.png"
        style="height: 12px; border: none; background: none; margin: 0px; filter: invert(1);"
      />
      dubzzz
    </div>
    <div style="display: flex; gap: 4px; color: #1185fe; align-items: center">
      <img
        src="/assets/bluesky.svg"
        style="height: 12px; border: none; background: none; margin: 0px"
      />
      @nicolas.dubien.me
    </div>
    <div style="display: flex; gap: 4px; color: #cb3837; align-items: center">
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

  <!-- Pigment Timeline -->
  <div
    v-if="$nav.currentPage >= 6 && $nav.currentPage <= 17 && $nav.currentLayout !== 'cover'"
    :class="['pigment-timeline', { 'pigment-timeline-old': ($nav.currentPage === 6 || $nav.currentPage === 10 || $nav.currentPage === 14) && $nav.clicks >= 1 || ($nav.currentPage === 7 || $nav.currentPage === 11 || $nav.currentPage === 15) && $nav.clicks < 1 }]"
  >
    <div class="pigment-timeline-items">
      <span class="pigment-timeline-pill">Virtualized grids</span>
      <span class="pigment-timeline-sep"></span>
      <span class="pigment-timeline-pill">Clever reloads</span>
      <span class="pigment-timeline-sep"></span>

      <!-- Phase 1: ~1k cells (slides 5-9) -->
      <span v-if="$nav.currentPage < 10" class="pigment-timeline-pill">~1k cells</span>

      <!-- Phase 2: Millions (slides 10-13) -->
      <span
        v-if="$nav.currentPage >= 10 && $nav.currentPage < 14"
        :class="['pigment-timeline-pill', { 'pigment-timeline-highlight': $nav.currentPage === 10 }]"
      >Millions of cells</span>

      <!-- Phase 3: Billions (slides 14-17) -->
      <span
        v-if="$nav.currentPage >= 14"
        :class="['pigment-timeline-pill', { 'pigment-timeline-highlight': $nav.currentPage === 14 }]"
      >Billions of cells</span>

      <template v-if="$nav.currentPage >= 14">
        <span class="pigment-timeline-sep"></span>
        <span
          :class="['pigment-timeline-pill', { 'pigment-timeline-highlight': $nav.currentPage === 14 }]"
        >Large set of options</span>
      </template>
    </div>

    <!-- Toast on crack 2 (slide 10) -->
    <div v-if="$nav.currentPage === 10 && $nav.clicks === 0" class="pigment-timeline-toast">
      <span style="font-size: 1.3em">📈</span>
      <span>The product grew &mdash; <b>Millions of cells</b></span>
    </div>

    <!-- Toast on crack 3 (slide 14) -->
    <div v-if="$nav.currentPage === 14 && $nav.clicks === 0" class="pigment-timeline-toast">
      <span style="font-size: 1.3em">📈</span>
      <span>The product grew &mdash; <b>Billions of cells</b> &amp; <b>Large set of options</b></span>
    </div>
  </div>
</template>

<script>
navigator.wakeLock.request("screen");
</script>
