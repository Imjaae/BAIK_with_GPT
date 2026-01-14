<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TabSwitch from '@/components/TabSwitch.vue';
import { useDestinationStore } from '@/stores/destinationStore';
import type { DestinationMainTab } from '@/stores/destinationStore';

const destinationStore = useDestinationStore();
const { g_subway_search_view_list, g_destination_main_tab } = storeToRefs(destinationStore);

const g_selected_region = ref('전체');
const regionList = ['전체', '안양시', '의왕시', '과천시'];

function onChangeRegion(region: string) {
  g_selected_region.value = region;
  destinationStore.fetchSubwaySearch(region);
}

function onUpdateMainTab(value: string) {
  destinationStore.setDestinationMainTab(value as DestinationMainTab);
}
</script>

<template>
  <section class="destination-subway">
    <header class="destination-subway__header">
      <div>
        <h2>목적지 찾기 - 역명</h2>
        <p>지역을 선택해 역을 찾습니다.</p>
      </div>
      <TabSwitch
        :options="[
          { label: '정류장', value: 'busstop' },
          { label: '역', value: 'subway' },
          { label: '주소지', value: 'address' },
          { label: '카테고리', value: 'category' },
          { label: '직접입력', value: 'direct' }
        ]"
        :model-value="g_destination_main_tab"
        @update:model-value="onUpdateMainTab"
      />
    </header>

    <div class="destination-subway__regions">
      <button
        v-for="region in regionList"
        :key="region"
        type="button"
        :data-active="region === g_selected_region"
        @click="onChangeRegion(region)"
      >
        {{ region }}
      </button>
    </div>

    <div class="destination-subway__list">
      <InfoListCard
        v-for="item in g_subway_search_view_list"
        :key="item.subway_key"
        :title="item.name_text"
        :description="item.comment_text"
      />
    </div>

    <div class="destination-subway__bottom">
      <PrimaryButton label="이전" theme="secondary" />
      <PrimaryButton label="다음" theme="secondary" />
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.destination-subway {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.destination-subway__regions {
  display: flex;
  gap: 12px;
}

.destination-subway__regions button {
  padding: 12px 20px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
}

.destination-subway__regions button[data-active='true'] {
  background: rgba(31, 124, 255, 0.3);
}

.destination-subway__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.destination-subway__bottom {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
</style>
