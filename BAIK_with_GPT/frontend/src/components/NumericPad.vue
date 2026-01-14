<script setup lang="ts">
const emit = defineEmits<{
  (event: 'onPress', value: string): void;
  (event: 'onDelete'): void;
}>();

const digitList = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
</script>

<template>
  <div class="numeric-pad">
    <button
      v-for="digit in digitList"
      :key="digit"
      type="button"
      class="numeric-pad__button"
      @click="emit('onPress', digit)"
    >
      {{ digit }}
    </button>
    <button type="button" class="numeric-pad__button -wide" @click="emit('onDelete')">삭제</button>
  </div>
</template>

<style scoped>
.numeric-pad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.numeric-pad__button {
  height: 80px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  font-size: 32px;
  color: #fff;
  cursor: pointer;
}

.numeric-pad__button.-wide {
  grid-column: span 3;
  background: rgba(255, 0, 0, 0.25);
}
</style>
