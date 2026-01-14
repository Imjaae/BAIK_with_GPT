<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import ArrivalGrid from '@/components/ArrivalGrid.vue';
import InfoListCard from '@/components/InfoListCard.vue';
import MainHeader from '@/components/MainHeader.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useDestinationStore } from '@/stores/destinationStore';
import { useHomeStore } from '@/stores/homeStore';

const destinationStore = useDestinationStore();
const homeStore = useHomeStore();

const { g_selected_busstop_detail, g_shop_category_view_list } = storeToRefs(destinationStore);
const { g_arrival_card_list } = storeToRefs(homeStore);

onMounted(() => {
  destinationStore.fetchBusstopDetail(1);
});
</script>

<template>
  <section class="destination-busstop-detail">
    <MainHeader />
    <div class="destination-busstop-detail__header">
      <h2>{{ g_selected_busstop_detail?.name || '정류장' }}</h2>
      <p>정류장 번호: {{ g_selected_busstop_detail?.busstop_id || '-' }}</p>
      <p>방향 정보: {{ g_selected_busstop_detail?.comment || '정보 없음' }}</p>
    </div>

    <section class="destination-busstop-detail__section">
      <header>
        <h3>전체 도착 버스</h3>
      </header>
      <ArrivalGrid :arrival-list="g_arrival_card_list" />
    </section>

    <section class="destination-busstop-detail__section">
      <header>
        <h3>주변 장소</h3>
      </header>
      <div class="destination-busstop-detail__places">
        <InfoListCard
          v-for="place in g_shop_category_view_list"
          :key="place.shop_key"
          :title="place.name_text"
          :description="place.phone_text"
        />
        <p v-if="!g_shop_category_view_list.length" class="destination-busstop-detail__empty">
          주변 장소 정보가 없습니다.
        </p>
      </div>
    </section>

    <div class="destination-busstop-detail__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="지도보기" />
      <PrimaryButton label="경로안내" />
    </div>
  </section>
</template>

<style scoped>
.destination-busstop-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 90px;
}

.destination-busstop-detail__header {
  padding: 0 32px;
}

.destination-busstop-detail__section {
  padding: 0 32px;
}

.destination-busstop-detail__places {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.destination-busstop-detail__empty {
  color: rgba(255, 255, 255, 0.6);
}

.destination-busstop-detail__bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
}
</style>
