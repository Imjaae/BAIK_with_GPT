<script setup lang="ts">
import { storeToRefs } from 'pinia';

import CharacterTab from '@/components/CharacterTab.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useDestinationStore } from '@/stores/destinationStore';

const destinationStore = useDestinationStore();
const { g_direct_input_text } = storeToRefs(destinationStore);
const chosungList = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function onAppendChosung(value: string) {
  destinationStore.setDirectInputText(`${g_direct_input_text.value}${value}`);
}

function onDelete() {
  destinationStore.setDirectInputText(g_direct_input_text.value.slice(0, -1));
}
</script>

<template>
  <section class="destination-direct">
    <header>
      <h2>목적지 찾기 - 직접입력</h2>
      <p>초성 입력으로 목적지를 빠르게 찾습니다.</p>
    </header>

    <div class="destination-direct__display">
      {{ g_direct_input_text || '초성을 입력하세요' }}
    </div>

    <CharacterTab :character-list="chosungList" :model-value="''" @update:model-value="onAppendChosung" />

    <div class="destination-direct__action">
      <PrimaryButton label="삭제" theme="secondary" @on-click="onDelete" />
      <PrimaryButton label="검색" />
    </div>
  </section>
</template>

<style scoped>
.destination-direct {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
}

.destination-direct__display {
  min-height: 80px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 36px;
}

.destination-direct__action {
  display: flex;
  gap: 16px;
}
</style>
