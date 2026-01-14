<script setup lang="ts">
import { ref } from 'vue';

import PrimaryButton from '@/components/PrimaryButton.vue';

const g_selected_do = ref('');
const g_selected_si = ref('');
const g_selected_dong = ref('');

const g_do_list = ref<string[]>([]);
const g_si_list = ref<string[]>([]);
const g_dong_list = ref<string[]>([]);

function selectDo(item: string) {
  g_selected_do.value = item;
}

function selectSi(item: string) {
  g_selected_si.value = item;
}

function selectDong(item: string) {
  g_selected_dong.value = item;
}
</script>

<template>
  <section class="destination-address">
    <header>
      <h2>목적지 찾기 - 주소지</h2>
      <p>도 / 시 / 동 순서로 주소지를 선택하세요.</p>
    </header>

    <div class="destination-address__columns">
      <div>
        <h3>도</h3>
        <button
          v-for="item in g_do_list"
          :key="item"
          type="button"
          :data-active="item === g_selected_do"
          @click="selectDo(item)"
        >
          {{ item }}
        </button>
        <p v-if="!g_do_list.length" class="destination-address__empty">도 정보가 없습니다.</p>
      </div>
      <div>
        <h3>시</h3>
        <button
          v-for="item in g_si_list"
          :key="item"
          type="button"
          :data-active="item === g_selected_si"
          @click="selectSi(item)"
        >
          {{ item }}
        </button>
        <p v-if="!g_si_list.length" class="destination-address__empty">시 정보가 없습니다.</p>
      </div>
      <div>
        <h3>동</h3>
        <button
          v-for="item in g_dong_list"
          :key="item"
          type="button"
          :data-active="item === g_selected_dong"
          @click="selectDong(item)"
        >
          {{ item }}
        </button>
        <p v-if="!g_dong_list.length" class="destination-address__empty">동 정보가 없습니다.</p>
      </div>
    </div>

    <div class="destination-address__bottom">
      <PrimaryButton label="이전" theme="secondary" />
      <PrimaryButton label="다음" theme="secondary" />
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.destination-address {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
}

.destination-address__columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.destination-address__columns h3 {
  margin-bottom: 12px;
}

.destination-address__columns button {
  width: 100%;
  min-height: 56px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.destination-address__columns button[data-active='true'] {
  background: rgba(31, 124, 255, 0.3);
}

.destination-address__empty {
  color: rgba(255, 255, 255, 0.5);
}

.destination-address__bottom {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
</style>
