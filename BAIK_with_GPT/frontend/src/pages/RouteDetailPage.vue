<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import MapCanvas from '@/components/MapCanvas.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useRouteStore } from '@/stores/routeStore';

const routeStore = useRouteStore();
const { g_route_detail_view } = storeToRefs(routeStore);

onMounted(() => {
  routeStore.fetchRouteDetail(1);
});
</script>

<template>
  <section class="route-detail">
    <header>
      <h2>경로 상세</h2>
      <p>선택한 경로의 모든 이동 정보를 확인하세요.</p>
    </header>

    <section class="route-detail__summary" v-if="g_route_detail_view">
      <InfoListCard
        :title="`전체 소요 시간: ${g_route_detail_view.segment_text_list.length} 단계`"
        :description="'탑승 및 하차 정보를 순서대로 확인하세요.'"
      />
      <MapCanvas />
      <div class="route-detail__segments">
        <article v-for="segment in g_route_detail_view.segment_text_list" :key="segment" class="route-detail__segment">
          {{ segment }}
        </article>
      </div>
    </section>

    <div class="route-detail__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.route-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.route-detail__segments {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.route-detail__segment {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.route-detail__bottom {
  display: flex;
  justify-content: space-between;
}
</style>
