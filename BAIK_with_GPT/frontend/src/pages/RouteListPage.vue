<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TabSwitch from '@/components/TabSwitch.vue';
import { useRouteStore } from '@/stores/routeStore';

const routeStore = useRouteStore();
const { g_route_card_list, g_route_tab, g_route_sort_option } = storeToRefs(routeStore);

const sortOptionList = [
  { label: '최단시간', value: 'fastest' },
  { label: '최소비용', value: 'cheapest' },
  { label: '최소환승', value: 'minimum-transfer' },
  { label: '최소도보', value: 'minimum-walk' }
];

onMounted(() => {
  routeStore.fetchRouteSummary(1);
});

function onChangeTab(value: string) {
  routeStore.setRouteTab(value as typeof g_route_tab.value);
}

function onChangeSort(value: string) {
  routeStore.setRouteSortOption(value as typeof g_route_sort_option.value);
}
</script>

<template>
  <section class="route-list">
    <header>
      <h2>경로 목록</h2>
      <p>현재 위치에서 목적지까지의 추천 경로</p>
    </header>

    <TabSwitch
      :options="[
        { label: '대중교통', value: 'transit' },
        { label: '도보', value: 'walk' }
      ]"
      :model-value="g_route_tab"
      @update:model-value="onChangeTab"
    />

    <div class="route-list__sort">
      <button
        v-for="option in sortOptionList"
        :key="option.value"
        type="button"
        :data-active="option.value === g_route_sort_option"
        @click="onChangeSort(option.value)">
        {{ option.label }}
      </button>
    </div>

    <div class="route-list__cards">
      <InfoListCard
        v-for="card in g_route_card_list"
        :key="card.summary_key"
        :title="`${card.total_minutes}분`"
        :subtitle="card.transport_type === 'transit' ? '대중교통' : '도보'"
        :description="`${card.departure_time_text} ~ ${card.arrival_time_text}`"
      >
        <p v-if="card.first_vehicle_time_text">첫 대중교통 도착: {{ card.first_vehicle_time_text }}</p>
      </InfoListCard>
    </div>

    <div class="route-list__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.route-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.route-list__sort {
  display: flex;
  gap: 12px;
}

.route-list__sort button {
  flex: 1;
  height: 60px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
}

.route-list__sort button[data-active='true'] {
  background: rgba(31, 124, 255, 0.3);
}

.route-list__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.route-list__bottom {
  display: flex;
  justify-content: space-between;
}
</style>
