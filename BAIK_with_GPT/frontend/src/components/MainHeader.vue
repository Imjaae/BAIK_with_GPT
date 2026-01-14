<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useHomeStore } from '@/stores/homeStore';

const homeStore = useHomeStore();
const { g_header_clock_text, g_station_summary, g_weather_summary, g_air_summary, g_humidity_summary } =
  storeToRefs(homeStore);
</script>

<template>
  <header class="main-header">
    <div class="main-header__time-block">
      <p class="main-header__clock-text">{{ g_header_clock_text }}</p>
      <p class="main-header__station-text">
        {{ g_station_summary.station_name_text }} · {{ g_station_summary.station_number_text }}
      </p>
    </div>
    <div class="main-header__info-block">
      <div class="main-header__info-item">
        <span class="main-header__info-title">날씨</span>
        <strong>{{ g_weather_summary.status_text }}</strong>
        <span>{{ g_weather_summary.temperature_text }}</span>
      </div>
      <div class="main-header__info-item">
        <span class="main-header__info-title">미세먼지</span>
        <strong>{{ g_air_summary.status_text }}</strong>
      </div>
      <div class="main-header__info-item">
        <span class="main-header__info-title">습도</span>
        <strong>{{ g_humidity_summary.status_text }}</strong>
      </div>
    </div>
  </header>
</template>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.main-header__time-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.main-header__clock-text {
  font-size: 32px;
  margin: 0;
}

.main-header__station-text {
  margin: 0;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
}

.main-header__info-block {
  display: flex;
  gap: 24px;
}

.main-header__info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.main-header__info-title {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}
</style>
