import { ref } from 'vue';
import { defineStore } from 'pinia';

import { reqNewsDetail, reqNewsList } from '@/api/news';
import type { ReqSsnews } from '@/api/models';
import type { NewsListItem } from '@/api/news';

export interface NewsCardView {
  news_key?: number;
  news_type_text: string;
  title_text: string;
  summary_text: string;
}

export interface NewsDetailView {
  news_type_text: string;
  title_text: string;
  body_text: string;
  image_count: number;
}

export const useNewsStore = defineStore('newsStore', () => {
  const g_server_news_list = ref<NewsListItem[]>([]);
  const g_server_news_detail = ref<ReqSsnews | null>(null);

  const g_news_card_list = ref<NewsCardView[]>([]);
  const g_news_detail_view = ref<NewsDetailView | null>(null);

  function editNewsCardList() {
    g_news_card_list.value = g_server_news_list.value.map((item) => ({
      news_key: item.news_key,
      news_type_text: item.news_type ?? '소식',
      title_text: item.title ?? '제목 없음',
      summary_text: item.summary_text ?? item.body_str ?? '내용 준비 중'
    }));
  }

  function editNewsDetailView() {
    if (!g_server_news_detail.value) {
      g_news_detail_view.value = null;
      return;
    }

    g_news_detail_view.value = {
      news_type_text: g_server_news_detail.value.news_type ?? '소식',
      title_text: g_server_news_detail.value.title ?? '제목 없음',
      body_text: g_server_news_detail.value.body_str ?? '내용 준비 중',
      image_count:
        (g_server_news_detail.value.body_image_filekey_list ?? g_server_news_detail.value.image_filekey_list ?? [])
          .length
    };
  }

  async function fetchNewsList() {
    try {
      g_server_news_list.value = await reqNewsList();
    } catch (error) {
      console.warn('fetchNewsList error', error);
      g_server_news_list.value = [];
    }
    editNewsCardList();
  }

  async function fetchNewsDetail(news_key: number) {
    try {
      g_server_news_detail.value = (await reqNewsDetail(news_key)) ?? null;
    } catch (error) {
      console.warn('fetchNewsDetail error', error);
      g_server_news_detail.value = null;
    }
    editNewsDetailView();
  }

  return {
    g_news_card_list,
    g_news_detail_view,
    fetchNewsList,
    fetchNewsDetail
  };
});
