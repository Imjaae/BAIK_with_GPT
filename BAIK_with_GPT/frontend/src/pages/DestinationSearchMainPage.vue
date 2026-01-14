<script setup lang="ts">
import { storeToRefs } from 'pinia';

import MainHeader from '@/components/MainHeader.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TabSwitch from '@/components/TabSwitch.vue';
import { useDestinationStore } from '@/stores/destinationStore';

const destinationStore = useDestinationStore();
const { g_destination_main_tab } = storeToRefs(destinationStore);

function onChangeTab(value: string) {
  destinationStore.setDestinationMainTab(value as typeof g_destination_main_tab.value);
}
</script>

<template>
  <section class="destination-main">
    <MainHeader />
    <div class="destination-main__body">
      <header>
        <h2>목적지 찾기</h2>
        <p>정류장, 전철역, 주소, 카테고리, 직접입력 중 원하는 방식을 선택하세요.</p>
      </header>
      <TabSwitch
        :options="[
          { label: '정류장', value: 'busstop' },
          { label: '역', value: 'subway' },
          { label: '주소지', value: 'address' },
          { label: '카테고리', value: 'category' },
          { label: '직접입력', value: 'direct' }
        ]"
        :model-value="g_destination_main_tab"
        @update:model-value="onChangeTab"
      />
      <div class="destination-main__grid">
        <PrimaryButton label="정류장 찾기" />
        <PrimaryButton label="전철역 찾기" />
        <PrimaryButton label="주소지 찾기" />
        <PrimaryButton label="카테고리 찾기" />
        <PrimaryButton label="직접입력" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.destination-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 100px;
}

.destination-main__body {
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.destination-main__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
</style>
