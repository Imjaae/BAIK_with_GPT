<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import MainHeader from '@/components/MainHeader.vue';
import MapCanvas from '@/components/MapCanvas.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useDestinationStore } from '@/stores/destinationStore';

const destinationStore = useDestinationStore();
const { g_selected_subway_detail } = storeToRefs(destinationStore);

onMounted(() => {
  destinationStore.fetchSubwayDetail(1);
});
</script>

<template>
  <section class="destination-subway-detail">
    <MainHeader />

    <div class="destination-subway-detail__header">
      <h2>{{ g_selected_subway_detail?.name || '전철역' }}</h2>
      <p>호선 정보: {{ g_selected_subway_detail?.comment || '정보 없음' }}</p>
    </div>

    <div class="destination-subway-detail__grid">
      <section>
        <h3>상행 / 하행 도착 정보</h3>
        <InfoListCard title="상행" description="도착 정보 준비 중" />
        <InfoListCard title="하행" description="도착 정보 준비 중" />
      </section>
      <section>
        <h3>출구 정보</h3>
        <InfoListCard title="1번 출구" description="출구 정보 준비 중" />
        <InfoListCard title="2번 출구" description="출구 정보 준비 중" />
      </section>
      <section>
        <h3>지도 및 출구 위치</h3>
        <MapCanvas />
      </section>
    </div>

    <div class="destination-subway-detail__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="지도보기" />
      <PrimaryButton label="경로안내" />
    </div>
  </section>
</template>

<style scoped>
.destination-subway-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 80px;
}

.destination-subway-detail__header,
.destination-subway-detail__grid {
  padding: 0 32px;
}

.destination-subway-detail__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.destination-subway-detail__bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
}
</style>
