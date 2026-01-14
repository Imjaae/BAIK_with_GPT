<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle?: string;
  description?: string;
}>();
</script>

<template>
  <article class="info-card">
    <div class="info-card__title-row">
      <span class="info-card__subtitle" v-if="props.subtitle">{{ props.subtitle }}</span>
      <h3 class="info-card__title">{{ props.title }}</h3>
    </div>
    <p v-if="props.description" class="info-card__description">{{ props.description }}</p>
    <slot />
  </article>
</template>

<style scoped>
.info-card {
  padding: 16px 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.info-card__title-row {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.info-card__subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.info-card__title {
  margin: 0;
  font-size: 24px;
}

.info-card__description {
  margin: 12px 0 0;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);
}
</style>
