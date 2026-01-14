import { ref } from 'vue';
import { defineStore } from 'pinia';

import { reqRoadinfoDetail, reqRoadinfoList } from '@/api/traffic';
import type { ReqRoadinfo } from '@/api/models';

export interface RoadinfoCardView {
  roadinfo_key?: number;
  info_type_text: string;
  title_text: string;
  body_preview_text: string;
}

export interface RoadinfoDetailView {
  info_type_text: string;
  title_text: string;
  body_text: string;
  image_count: number;
}

export const useTrafficStore = defineStore('trafficStore', () => {
  const g_server_roadinfo_list = ref<ReqRoadinfo[]>([]);
  const g_server_roadinfo_detail = ref<ReqRoadinfo | null>(null);

  const g_roadinfo_card_list = ref<RoadinfoCardView[]>([]);
  const g_roadinfo_detail_view = ref<RoadinfoDetailView | null>(null);

  function editRoadinfoCardList() {
    g_roadinfo_card_list.value = g_server_roadinfo_list.value.map((item) => ({
      roadinfo_key: item.roadinfo_key,
      info_type_text: item.info_type ?? '정보',
      title_text: item.title ?? '제목 없음',
      body_preview_text: item.body_str ?? '내용 준비 중'
    }));
  }

  function editRoadinfoDetailView() {
    if (!g_server_roadinfo_detail.value) {
      g_roadinfo_detail_view.value = null;
      return;
    }

    g_roadinfo_detail_view.value = {
      info_type_text: g_server_roadinfo_detail.value.info_type ?? '정보',
      title_text: g_server_roadinfo_detail.value.title ?? '제목 없음',
      body_text: g_server_roadinfo_detail.value.body_str ?? '내용 준비 중',
      image_count: g_server_roadinfo_detail.value.image_filekey_list?.length ?? 0
    };
  }

  async function fetchRoadinfoList() {
    try {
      g_server_roadinfo_list.value = await reqRoadinfoList();
    } catch (error) {
      console.warn('fetchRoadinfoList error', error);
      g_server_roadinfo_list.value = [];
    }
    editRoadinfoCardList();
  }

  async function fetchRoadinfoDetail(roadinfo_key: number) {
    try {
      g_server_roadinfo_detail.value = (await reqRoadinfoDetail(roadinfo_key)) ?? null;
    } catch (error) {
      console.warn('fetchRoadinfoDetail error', error);
      g_server_roadinfo_detail.value = null;
    }
    editRoadinfoDetailView();
  }

  return {
    g_roadinfo_card_list,
    g_roadinfo_detail_view,
    fetchRoadinfoList,
    fetchRoadinfoDetail
  };
});
