<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import InfoListCard from '@/components/InfoListCard.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import { useNewsStore } from '@/stores/newsStore';

const newsStore = useNewsStore();
const { g_news_card_list } = storeToRefs(newsStore);

onMounted(() => {
  newsStore.fetchNewsList();
});
</script>

<template>
  <section class="news-list">
    <header>
      <h2>안양시 소식</h2>
      <p>공지 / 이벤트 / 사건 / 긴급 소식을 확인하세요.</p>
    </header>

    <div class="news-list__items">
      <InfoListCard
        v-for="item in g_news_card_list"
        :key="item.news_key"
        :title="item.title_text"
        :subtitle="item.news_type_text"
        :description="item.summary_text"
      />
      <p v-if="!g_news_card_list.length" class="news-list__empty">소식이 없습니다.</p>
    </div>

    <div class="news-list__pagination">
      <button type="button">이전</button>
      <span>1 / 1</span>
      <button type="button">다음</button>
    </div>
  </section>
</template>

<style scoped>
.news-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.news-list__items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.news-list__pagination {
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;
}

.news-list__pagination button {
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
}

.news-list__empty {
  color: rgba(255, 255, 255, 0.6);
}
</style>
