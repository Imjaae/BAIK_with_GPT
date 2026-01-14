<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import MainHeader from '@/components/MainHeader.vue';
import MapCanvas from '@/components/MapCanvas.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useBusStore } from '@/stores/busStore';

const busStore = useBusStore();
const { g_bus_detail_section_list } = storeToRefs(busStore);

onMounted(() => {
  busStore.fetchBusDetail(1);
});
</script>

<template>
  <section class="bus-detail">
    <MainHeader />

    <div class="bus-detail__body">
      <section class="bus-detail__info">
        <InfoListCard
          v-for="section in g_bus_detail_section_list"
          :key="section.title"
          :title="section.title"
          :description="section.row_list.join(' / ')"
        />
      </section>
      <section>
        <h2>버스 노선</h2>
        <MapCanvas />
      </section>
    </div>

    <div class="bus-detail__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.bus-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 80px;
}

.bus-detail__body {
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;
}

.bus-detail__info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bus-detail__bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
}
</style>
