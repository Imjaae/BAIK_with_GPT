<script setup lang="ts">
const props = defineProps<{
  characterList: string[];
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
  <div class="character-tab">
    <button
      v-for="character in props.characterList"
      :key="character"
      type="button"
      class="character-tab__button"
      :data-active="character === props.modelValue"
      @click="onSelect(character)"
    >
      {{ character }}
    </button>
  </div>
</template>

<style scoped>
.character-tab {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.character-tab__button {
  height: 60px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
  cursor: pointer;
}

.character-tab__button[data-active='true'] {
  background: rgba(44, 164, 255, 0.3);
  border-color: rgba(44, 164, 255, 0.6);
}
</style>
