<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import MainHeader from '@/components/MainHeader.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useBusStore } from '@/stores/busStore';

const busStore = useBusStore();
const { g_destination_search_card_list } = storeToRefs(busStore);

const g_selected_destination = computed(() => g_destination_search_card_list.value[0]);
</script>

<template>
  <section class="bus-destination-detail">
    <MainHeader />

    <section class="bus-destination-detail__content">
      <header>
        <h2>{{ g_selected_destination?.busstop_name_text || '정류장 선택' }}</h2>
        <p>선택한 정류장의 운행 버스를 확인하세요.</p>
      </header>

      <div class="bus-destination-detail__list">
        <InfoListCard
          v-for="detail in g_destination_search_card_list"
          :key="detail.busstop_name_text"
          :title="detail.busstop_name_text"
          :description="detail.bus_list_text"
        />
      </div>

      <div class="bus-destination-detail__action-row">
        <PrimaryButton label="이전" theme="secondary" />
        <PrimaryButton label="다음" theme="secondary" />
        <PrimaryButton label="뒤로가기" theme="ghost" />
        <PrimaryButton label="QR" />
      </div>
    </section>
  </section>
</template>

<style scoped>
.bus-destination-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bus-destination-detail__content {
  padding: 0 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bus-destination-detail__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
}

.bus-destination-detail__action-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
</style>
