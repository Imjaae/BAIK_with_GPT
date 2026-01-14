<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: '무엇을 도와드릴까요?'
  }
);
</script>

<template>
  <section class="avatar-prompt">
    <div class="avatar-prompt__avatar" />
    <div class="avatar-prompt__speech">{{ props.message }}</div>
  </section>
</template>

<style scoped>
.avatar-prompt {
  display: flex;
  gap: 24px;
  align-items: center;
}

.avatar-prompt__avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff, #1f7cff);
}

.avatar-prompt__speech {
  flex: 1;
  padding: 20px 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 28px;
}
</style>
