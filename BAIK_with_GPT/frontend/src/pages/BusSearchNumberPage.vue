<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import MainHeader from '@/components/MainHeader.vue';
import NumericPad from '@/components/NumericPad.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TabSwitch from '@/components/TabSwitch.vue';
import { useBusStore } from '@/stores/busStore';

const busStore = useBusStore();
const { g_bus_number_search_card_list } = storeToRefs(busStore);

const g_search_tab = ref('bus');
const g_input_number = ref('');

onMounted(() => {
  busStore.fetchBusgroupByBusstop(1);
});

function onPadPress(value: string) {
  g_input_number.value = `${g_input_number.value}${value}`.slice(0, 4);
}

function onPadDelete() {
  g_input_number.value = g_input_number.value.slice(0, -1);
}
</script>

<template>
  <section class="bus-search">
    <MainHeader />
    <div class="bus-search__body">
      <div class="bus-search__left">
        <TabSwitch
          v-model="g_search_tab"
          :options="[
            { label: '목적지', value: 'destination' },
            { label: '버스번호', value: 'bus' }
          ]"
        />

        <div class="bus-search__input-box">
          <p>버스번호 입력</p>
          <div class="bus-search__input-display">{{ g_input_number || '번호를 입력하세요' }}</div>
        </div>
        <NumericPad @on-press="onPadPress" @on-delete="onPadDelete" />
        <div class="bus-search__action-row">
          <PrimaryButton label="이전" theme="secondary" />
          <PrimaryButton label="다음" theme="secondary" />
        </div>
      </div>
      <div class="bus-search__list">
        <InfoListCard
          v-for="busCard in g_bus_number_search_card_list"
          :key="busCard.bus_key"
          :title="busCard.bus_name_text"
          :subtitle="busCard.bus_type_text"
          :description="busCard.next_arrival_text"
        />
      </div>
    </div>

    <div class="bus-search__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.bus-search {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 120px;
}

.bus-search__body {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 32px;
  padding: 0 32px;
}

.bus-search__left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bus-search__input-box p {
  margin: 0 0 8px;
  color: rgba(255, 255, 255, 0.7);
}

.bus-search__input-display {
  min-height: 70px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 32px;
}

.bus-search__action-row {
  display: flex;
  gap: 12px;
}

.bus-search__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.bus-search__bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 32px 32px;
}
</style>
