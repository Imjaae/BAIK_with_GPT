<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

import CharacterTab from '@/components/CharacterTab.vue';
import InfoListCard from '@/components/InfoListCard.vue';
import MainHeader from '@/components/MainHeader.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TabSwitch from '@/components/TabSwitch.vue';
import { useBusStore } from '@/stores/busStore';

const busStore = useBusStore();
const { g_destination_search_card_list } = storeToRefs(busStore);

const g_search_tab = ref('destination');
const g_selected_consonant = ref('ㄱ');
const consonantList = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

onMounted(() => {
  busStore.fetchBusgroupByBusstop(1);
});
</script>

<template>
  <section class="bus-destination">
    <MainHeader />
    <div class="bus-destination__body">
      <div class="bus-destination__left">
        <TabSwitch
          v-model="g_search_tab"
          :options="[
            { label: '목적지', value: 'destination' },
            { label: '버스번호', value: 'bus' }
          ]"
        />
        <CharacterTab v-model="g_selected_consonant" :character-list="consonantList" />
        <div class="bus-destination__action-row">
          <PrimaryButton label="이전" theme="secondary" />
          <PrimaryButton label="다음" theme="secondary" />
        </div>
      </div>
      <div class="bus-destination__list">
        <InfoListCard
          v-for="card in g_destination_search_card_list"
          :key="card.busstop_name_text"
          :title="card.busstop_name_text"
          :description="card.bus_list_text"
        />
      </div>
    </div>
    <div class="bus-destination__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.bus-destination {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bus-destination__body {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 32px;
  padding: 0 32px;
}

.bus-destination__left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bus-destination__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.bus-destination__action-row {
  display: flex;
  gap: 12px;
}

.bus-destination__bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 32px 32px;
}
</style>
