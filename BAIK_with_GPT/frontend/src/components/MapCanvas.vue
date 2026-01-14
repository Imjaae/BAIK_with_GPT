<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    zoomButton?: boolean;
  }>(),
  { zoomButton: false }
);
</script>

<template>
  <div class="map-canvas">
    <div class="map-canvas__grid">
      <div v-for="index in 25" :key="index" class="map-canvas__cell" />
    </div>
    <button
      v-if="props.zoomButton"
      type="button"
      class="map-canvas__zoom"
    >
      내 위치로 이동
    </button>
  </div>
</template>

<style scoped>
.map-canvas {
  position: relative;
  background: #062036;
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 320px;
}

.map-canvas__grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.map-canvas__cell {
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  background: rgba(52, 200, 255, 0.1);
}

.map-canvas__zoom {
  position: absolute;
  bottom: 24px;
  right: 24px;
  padding: 12px 24px;
  border-radius: 20px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
}
</style>
