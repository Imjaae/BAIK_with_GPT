<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import MapCanvas from '@/components/MapCanvas.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useHomeStore } from '@/stores/homeStore';

const router = useRouter();
const homeStore = useHomeStore();
const { g_map_category_list } = storeToRefs(homeStore);

function onClickClose() {
  router.back();
}

function onClickCategory(code: string) {
  homeStore.editMapCategory(code);
}
</script>

<template>
  <section class="map-full">
    <header class="map-full__header">
      <div>
        <h1>지도 전체보기</h1>
        <p>카테고리를 선택하여 장소 정보를 확인하세요.</p>
      </div>
      <PrimaryButton label="닫기" theme="ghost" @on-click="onClickClose" />
    </header>

    <div class="map-full__category">
      <button
        v-for="category in g_map_category_list"
        :key="category.code"
        type="button"
        class="map-full__category-button"
        :data-active="category.selected"
        @click="onClickCategory(category.code)"
      >
        {{ category.label }}
      </button>
    </div>

    <MapCanvas zoom-button />

    <div class="map-full__action-row">
      <PrimaryButton label="내 위치로 이동" theme="secondary" />
      <PrimaryButton label="장소 상세" />
    </div>
  </section>
</template>

<style scoped>
.map-full {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.map-full__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.map-full__header h1 {
  margin: 0;
}

.map-full__category {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.map-full__category-button {
  padding: 10px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
}

.map-full__category-button[data-active='true'] {
  background: rgba(31, 210, 255, 0.2);
}

.map-full__action-row {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
}
</style>
