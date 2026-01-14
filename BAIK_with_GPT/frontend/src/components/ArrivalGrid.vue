<script setup lang="ts">
import type { HomeArrivalCard } from '@/stores/homeStore';

const props = defineProps<{
  arrivalList: HomeArrivalCard[];
}>();
</script>

<template>
  <div class="arrival-grid">
    <article v-for="arrival in props.arrivalList" :key="arrival.log_arrival_key" class="arrival-card">
      <h3 class="arrival-card__title">{{ arrival.bus_name_text }}</h3>
      <p class="arrival-card__time">{{ arrival.arrival_time_text }}</p>
      <p class="arrival-card__remain">{{ arrival.remain_stop_text }}</p>
      <span v-if="arrival.low_floor_visible" class="arrival-card__badge">저상버스</span>
      <span v-if="arrival.busy_stat" class="arrival-card__badge -busy">혼잡: {{ arrival.busy_stat }}</span>
    </article>
  </div>
</template>

<style scoped>
.arrival-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.arrival-card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.arrival-card__title {
  margin: 0;
  font-size: 28px;
}

.arrival-card__time {
  margin: 6px 0;
  font-size: 20px;
}

.arrival-card__remain {
  margin: 0 0 12px;
  color: rgba(255, 255, 255, 0.7);
}

.arrival-card__badge {
  display: inline-block;
  margin-right: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  background: rgba(52, 200, 255, 0.2);
  font-size: 14px;
}

.arrival-card__badge.-busy {
  background: rgba(255, 130, 0, 0.3);
}
</style>
