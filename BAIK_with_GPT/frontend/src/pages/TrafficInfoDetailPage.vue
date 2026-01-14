<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import PrimaryButton from '@/components/PrimaryButton.vue';
import { useTrafficStore } from '@/stores/trafficStore';

const trafficStore = useTrafficStore();
const { g_roadinfo_detail_view } = storeToRefs(trafficStore);

onMounted(() => {
  trafficStore.fetchRoadinfoDetail(1);
});
</script>

<template>
  <section class="traffic-detail">
    <header>
      <h2>{{ g_roadinfo_detail_view?.title_text || '도로교통 정보' }}</h2>
      <p>{{ g_roadinfo_detail_view?.info_type_text || '정보' }}</p>
    </header>

    <div class="traffic-detail__photo" />
    <p class="traffic-detail__body">{{ g_roadinfo_detail_view?.body_text || '내용 준비 중' }}</p>

    <div class="traffic-detail__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.traffic-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.traffic-detail__photo {
  width: 100%;
  height: 420px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.1);
}

.traffic-detail__body {
  line-height: 1.6;
  margin: 0;
}

.traffic-detail__bottom {
  display: flex;
  justify-content: space-between;
}
</style>
