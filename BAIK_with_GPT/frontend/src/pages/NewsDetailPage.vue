<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import PrimaryButton from '@/components/PrimaryButton.vue';
import { useNewsStore } from '@/stores/newsStore';

const newsStore = useNewsStore();
const { g_news_detail_view } = storeToRefs(newsStore);

onMounted(() => {
  newsStore.fetchNewsDetail(1);
});
</script>

<template>
  <section class="news-detail">
    <header>
      <p>{{ g_news_detail_view?.news_type_text || '소식' }}</p>
      <h2>{{ g_news_detail_view?.title_text || '제목 없음' }}</h2>
    </header>

    <div class="news-detail__slider">
      <div
        v-for="index in g_news_detail_view?.image_count || 0"
        :key="index"
        class="news-detail__slide"
      />
      <p v-if="!g_news_detail_view?.image_count">이미지가 없습니다.</p>
    </div>

    <p class="news-detail__body">{{ g_news_detail_view?.body_text || '내용 준비 중' }}</p>

    <div class="news-detail__bottom">
      <PrimaryButton label="뒤로가기" theme="ghost" />
    </div>
  </section>
</template>

<style scoped>
.news-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.news-detail__slider {
  display: flex;
  gap: 16px;
}

.news-detail__slide {
  width: 320px;
  height: 200px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
}

.news-detail__body {
  line-height: 1.6;
  margin: 0;
}

.news-detail__bottom {
  display: flex;
  justify-content: flex-end;
}
</style>
