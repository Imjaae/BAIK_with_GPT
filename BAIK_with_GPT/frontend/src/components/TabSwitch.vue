<script setup lang="ts">
export interface TabOption {
  label: string;
  value: string;
}

const props = defineProps<{
  options: TabOption[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

function onSelect(value: string) {
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="tab-switch">
    <button
      v-for="option in props.options"
      :key="option.value"
      type="button"
      class="tab-switch__button"
      :data-active="option.value === props.modelValue"
      @click="onSelect(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.tab-switch {
  display: flex;
  gap: 8px;
}

.tab-switch__button {
  flex: 1;
  min-height: 64px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  cursor: pointer;
}

.tab-switch__button[data-active='true'] {
  background: linear-gradient(90deg, #1fd2ff 0%, #1a7bff 100%);
  border-color: transparent;
  color: #fff;
  font-weight: 600;
}
</style>
