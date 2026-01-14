<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import MainHeader from '@/components/MainHeader.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useDestinationStore } from '@/stores/destinationStore';

const destinationStore = useDestinationStore();
const { g_selected_shop_detail } = storeToRefs(destinationStore);

onMounted(() => {
  destinationStore.fetchShopDetail(1);
});
</script>

<template>
  <section class="destination-category-detail">
    <MainHeader />

    <div class="destination-category-detail__card">
      <div class="destination-category-detail__photo" />
      <div>
        <h2>{{ g_selected_shop_detail?.name || '장소 이름' }}</h2>
        <p>카테고리: {{ g_selected_shop_detail?.comment || '정보 없음' }}</p>
        <p>운영 시간: 정보 없음</p>
        <p>전화번호: 정보 없음</p>
      </div>
    </div>

    <div class="destination-category-detail__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="지도보기" />
      <PrimaryButton label="경로안내" />
    </div>
  </section>
</template>

<style scoped>
.destination-category-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 80px;
}

.destination-category-detail__card {
  display: flex;
  gap: 24px;
  padding: 32px;
}

.destination-category-detail__photo {
  width: 320px;
  height: 240px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.1);
}

.destination-category-detail__bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
}
</style>
