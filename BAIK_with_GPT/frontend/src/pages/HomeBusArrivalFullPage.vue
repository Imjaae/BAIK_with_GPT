<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import ArrivalGrid from '@/components/ArrivalGrid.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useHomeStore } from '@/stores/homeStore';

const router = useRouter();
const homeStore = useHomeStore();
const { g_arrival_card_list } = storeToRefs(homeStore);

function onClickClose() {
  router.back();
}
</script>

<template>
  <section class="arrival-full">
    <header class="arrival-full__header">
      <div>
        <h1>전체 도착 버스 보기</h1>
        <p>정류장 기준 18개의 도착 정보를 제공합니다.</p>
      </div>
      <PrimaryButton label="닫기" theme="ghost" @on-click="onClickClose" />
    </header>
    <ArrivalGrid :arrival-list="g_arrival_card_list" />
  </section>
</template>

<style scoped>
.arrival-full {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.arrival-full__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
