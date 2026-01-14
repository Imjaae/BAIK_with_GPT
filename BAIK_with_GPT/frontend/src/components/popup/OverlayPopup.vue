<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    visible: boolean;
    title: string;
  }>(),
  {
    visible: false
  }
);

const emit = defineEmits<{
  (event: 'onClose'): void;
}>();
</script>

<template>
  <div v-if="props.visible" class="overlay-popup">
    <div class="overlay-popup__panel">
      <header class="overlay-popup__header">
        <h2>{{ props.title }}</h2>
        <button type="button" class="overlay-popup__close" @click="emit('onClose')">닫기</button>
      </header>
      <div class="overlay-popup__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay-popup {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.overlay-popup__panel {
  width: 80vw;
  max-width: 1400px;
  background: #0e2034;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 24px;
}

.overlay-popup__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.overlay-popup__close {
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
}
</style>
