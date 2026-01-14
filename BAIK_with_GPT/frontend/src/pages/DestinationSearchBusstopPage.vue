<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TabSwitch from '@/components/TabSwitch.vue';
import { useDestinationStore } from '@/stores/destinationStore';
import type { DestinationMainTab } from '@/stores/destinationStore';

const destinationStore = useDestinationStore();
const { g_busstop_search_view_list, g_destination_main_tab } = storeToRefs(destinationStore);

const g_search_keyword = ref('');
const keyboardRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

function onClickKey(char: string) {
  g_search_keyword.value = `${g_search_keyword.value}${char}`;
}

function onClickDelete() {
  g_search_keyword.value = g_search_keyword.value.slice(0, -1);
}

function onClickSearch() {
  destinationStore.fetchBusstopSearch(g_search_keyword.value);
}

function onUpdateMainTab(value: string) {
  destinationStore.setDestinationMainTab(value as DestinationMainTab);
}
</script>

<template>
  <section class="destination-busstop">
    <header class="destination-busstop__header">
      <div>
        <h2>목적지 찾기 - 정류장</h2>
        <p>검색어가 포함된 버스 정류장을 찾습니다.</p>
      </div>
      <TabSwitch
        :options="[
          { label: '정류장', value: 'busstop' },
          { label: '역', value: 'subway' },
          { label: '주소지', value: 'address' },
          { label: '카테고리', value: 'category' },
          { label: '직접입력', value: 'direct' }
        ]"
        :model-value="g_destination_main_tab"
        @update:model-value="onUpdateMainTab"
      />
    </header>

    <div class="destination-busstop__search">
      <PrimaryButton label="이전" theme="secondary" />
      <div class="destination-busstop__input">
        <input v-model="g_search_keyword" type="text" placeholder="정류장 이름을 입력하세요" />
        <button type="button" @click="onClickDelete">삭제</button>
        <button type="button" @click="onClickSearch">검색</button>
      </div>
    </div>

    <div class="destination-busstop__keyboard">
      <div v-for="row in keyboardRows" :key="row" class="destination-busstop__keyboard-row">
        <button
          v-for="char in row.split('')"
          :key="char"
          type="button"
          @click="onClickKey(char)"
        >
          {{ char.toUpperCase() }}
        </button>
      </div>
      <div class="destination-busstop__keyboard-row">
        <button type="button">숫자 전환</button>
        <button type="button">한/영</button>
        <button type="button" class="destination-busstop__keyboard-search" @click="onClickSearch">
          검색
        </button>
        <button type="button">음성</button>
      </div>
    </div>

    <div class="destination-busstop__list">
      <InfoListCard
        v-for="item in g_busstop_search_view_list"
        :key="item.busstop_key"
        :title="item.name_text"
        :description="item.direction_text"
      />
    </div>
  </section>
</template>

<style scoped>
.destination-busstop {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
}

.destination-busstop__header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.destination-busstop__search {
  display: flex;
  gap: 16px;
  align-items: center;
}

.destination-busstop__input {
  flex: 1;
  display: flex;
  gap: 12px;
}

.destination-busstop__input input {
  flex: 1;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: #fff;
  font-size: 22px;
  padding: 0 16px;
  height: 64px;
}

.destination-busstop__input button {
  min-width: 120px;
  border-radius: 16px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.destination-busstop__keyboard {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.destination-busstop__keyboard-row {
  display: flex;
  gap: 8px;
}

.destination-busstop__keyboard-row button {
  flex: 1;
  min-height: 56px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #fff;
  font-size: 20px;
}

.destination-busstop__keyboard-search {
  background: rgba(31, 124, 255, 0.4) !important;
}

.destination-busstop__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
</style>
