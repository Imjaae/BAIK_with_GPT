<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import ArrivalGrid from '@/components/ArrivalGrid.vue';
import AvatarPrompt from '@/components/AvatarPrompt.vue';
import MainHeader from '@/components/MainHeader.vue';
import MapCanvas from '@/components/MapCanvas.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useHomeStore } from '@/stores/homeStore';

const homeStore = useHomeStore();
const { g_arrival_card_list, g_map_category_list } = storeToRefs(homeStore);

onMounted(() => {
  homeStore.fetchHomeOverview(1);
});

function onClickMapCategory(categoryCode: string) {
  homeStore.editMapCategory(categoryCode);
}
</script>

<template>
  <section class="home-screen">
    <MainHeader />

    <section class="home-screen__arrival-section">
      <header class="section-header">
        <div>
          <h2>실시간 도착 정보</h2>
          <p>현재 운행 중인 버스 도착 예정 시간</p>
        </div>
        <PrimaryButton label="전체 도착 버스 보기" />
      </header>
      <ArrivalGrid :arrival-list="g_arrival_card_list" />
    </section>

    <section class="home-screen__map-section">
      <div class="section-header">
        <div>
          <h2>주변 지도</h2>
          <p>정류장 중심 주변 정보</p>
        </div>
        <PrimaryButton label="지도 전체보기" theme="secondary" />
      </div>
      <div class="map-category">
        <button
          v-for="category in g_map_category_list"
          :key="category.code"
          type="button"
          class="map-category__button"
          :data-active="category.selected"
          @click="onClickMapCategory(category.code)"
        >
          {{ category.label }}
        </button>
      </div>
      <MapCanvas />
    </section>

    <section class="home-screen__avatar-section">
      <div class="section-header">
        <div>
          <h2>아바타 안내</h2>
          <p>음성 기반 상담</p>
        </div>
        <PrimaryButton label="대화 시작" />
      </div>
      <AvatarPrompt />
    </section>
  </section>
</template>

<style scoped>
.home-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 120px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  margin: 0;
}

.section-header p {
  margin: 4px 0 0;
  color: rgba(255, 255, 255, 0.7);
}

.home-screen__arrival-section,
.home-screen__map-section,
.home-screen__avatar-section {
  padding: 0 32px;
}

.map-category {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.map-category__button {
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
}

.map-category__button[data-active='true'] {
  background: rgba(31, 210, 255, 0.2);
  border-color: rgba(31, 210, 255, 0.6);
}
</style>
