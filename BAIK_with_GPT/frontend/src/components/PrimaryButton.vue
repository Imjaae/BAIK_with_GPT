<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    theme?: 'primary' | 'secondary' | 'ghost';
  }>(),
  {
    theme: 'primary'
  }
);

const emit = defineEmits<{
  (event: 'onClick'): void;
}>();

function onBtnClick() {
  emit('onClick');
}
</script>

<template>
  <button type="button" class="primary-button" :data-theme="props.theme" @click="onBtnClick">
    {{ props.label }}
  </button>
</template>

<style scoped>
.primary-button {
  min-width: 160px;
  padding: 20px 28px;
  border-radius: 16px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(180deg, #34c8ff 0%, #125ce0 100%);
}

.primary-button[data-theme='secondary'] {
  background: rgba(255, 255, 255, 0.16);
}

.primary-button[data-theme='ghost'] {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
}
</style>
