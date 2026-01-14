<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useTrafficStore } from '@/stores/trafficStore';

const trafficStore = useTrafficStore();
const { g_roadinfo_card_list } = storeToRefs(trafficStore);

onMounted(() => {
  trafficStore.fetchRoadinfoList();
});
</script>

<template>
  <section class="traffic-list">
    <header>
      <h2>실시간 도로교통 정보</h2>
      <p>혼잡 / 사고 / 지연 / 도로파손 정보를 확인하세요.</p>
    </header>

    <div class="traffic-list__cards">
      <InfoListCard
        v-for="item in g_roadinfo_card_list"
        :key="item.roadinfo_key"
        :title="item.title_text"
        :subtitle="item.info_type_text"
        :description="item.body_preview_text"
      />
    </div>

    <div class="traffic-list__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.traffic-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.traffic-list__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.traffic-list__bottom {
  display: flex;
  justify-content: space-between;
}
</style>
