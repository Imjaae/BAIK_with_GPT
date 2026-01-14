<script setup lang="ts">
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useDestinationStore } from '@/stores/destinationStore';

const destinationStore = useDestinationStore();
const { g_category_stage_list, g_shop_category_view_list } = storeToRefs(destinationStore);

function onClickCategory(stage: string, label: string) {
  destinationStore.fetchShopByCategory(`${stage}:${label}`);
}
</script>

<template>
  <section class="destination-category">
    <header>
      <h2>목적지 찾기 - 카테고리</h2>
      <p>대분류부터 소분류까지 순차적으로 선택하세요.</p>
    </header>

    <div class="destination-category__stage-grid">
      <div v-for="stage in g_category_stage_list" :key="stage.stage" class="stage-column">
        <h3>{{ stage.title }}</h3>
        <button
          v-for="option in stage.option_list"
          :key="option"
          type="button"
          @click="onClickCategory(stage.stage, option)"
        >
          {{ option }}
        </button>
        <p v-if="!stage.option_list.length" class="stage-column__empty">옵션이 없습니다.</p>
      </div>
    </div>

    <div class="destination-category__result">
      <InfoListCard
        v-for="shop in g_shop_category_view_list"
        :key="shop.shop_key"
        :title="shop.name_text"
        :description="shop.phone_text"
      />
    </div>

    <div class="destination-category__bottom">
      <PrimaryButton label="이전" theme="secondary" />
      <PrimaryButton label="다음" theme="secondary" />
      <PrimaryButton label="뒤로가기" theme="ghost" />
      <PrimaryButton label="QR" />
    </div>
  </section>
</template>

<style scoped>
.destination-category {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.destination-category__stage-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.stage-column h3 {
  margin-bottom: 12px;
}

.stage-column button {
  display: block;
  width: 100%;
  min-height: 56px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.stage-column__empty {
  color: rgba(255, 255, 255, 0.5);
}

.destination-category__result {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.destination-category__bottom {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
</style>
