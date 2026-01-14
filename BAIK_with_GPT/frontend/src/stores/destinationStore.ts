import { ref } from 'vue';
import { defineStore } from 'pinia';

import {
  reqBusstopDetail,
  reqBusstopListByKeyword,
  reqShopListByCategory,
  reqSubwayDetail,
  reqSubwayListByRegion
} from '@/api/destination';
import type { ReqBusstop, ReqShop, ReqSubway } from '@/api/models';

export type DestinationMainTab = 'busstop' | 'subway' | 'address' | 'category' | 'direct';

export interface BusstopSearchView {
  busstop_key?: number;
  name_text: string;
  direction_text: string;
}

export interface SubwaySearchView {
  subway_key?: number;
  name_text: string;
  comment_text: string;
}

export interface ShopCategoryView {
  shop_key?: number;
  name_text: string;
  phone_text: string;
}

export interface CategoryStage {
  stage: 'primary' | 'secondary' | 'tertiary';
  title: string;
  option_list: string[];
}

export const useDestinationStore = defineStore('destinationStore', () => {
  const g_destination_main_tab = ref<DestinationMainTab>('busstop');

  const g_server_busstop_search_list = ref<ReqBusstop[]>([]);
  const g_server_subway_search_list = ref<ReqSubway[]>([]);
  const g_server_shop_list = ref<ReqShop[]>([]);

  const g_busstop_search_view_list = ref<BusstopSearchView[]>([]);
  const g_subway_search_view_list = ref<SubwaySearchView[]>([]);
  const g_shop_category_view_list = ref<ShopCategoryView[]>([]);

  const g_category_stage_list = ref<CategoryStage[]>([
    { stage: 'primary', title: '대분류', option_list: [] },
    { stage: 'secondary', title: '중분류', option_list: [] },
    { stage: 'tertiary', title: '소분류', option_list: [] }
  ]);

  const g_direct_input_text = ref('');

  const g_selected_busstop_detail = ref<ReqBusstop | null>(null);
  const g_selected_subway_detail = ref<ReqSubway | null>(null);
  const g_selected_shop_detail = ref<ReqShop | null>(null);

  function editBusstopSearchViewList() {
    g_busstop_search_view_list.value = g_server_busstop_search_list.value.map((item) => ({
      busstop_key: item.busstop_key,
      name_text: item.name ?? '정류장',
      direction_text: item.comment ?? '방향 정보 없음'
    }));
  }

  function editSubwaySearchViewList() {
    g_subway_search_view_list.value = g_server_subway_search_list.value.map((item) => ({
      subway_key: item.subway_key,
      name_text: item.name ?? '전철역',
      comment_text: item.comment ?? '노선 정보 없음'
    }));
  }

  function editShopCategoryViewList() {
    g_shop_category_view_list.value = g_server_shop_list.value.map((item) => ({
      shop_key: item.shop_key,
      name_text: item.name ?? '장소',
      phone_text: item.comment ?? '연락처 정보 없음'
    }));
  }

  async function fetchBusstopSearch(keyword: string) {
    try {
      g_server_busstop_search_list.value = await reqBusstopListByKeyword(keyword);
    } catch (error) {
      console.warn('fetchBusstopSearch error', error);
      g_server_busstop_search_list.value = [];
    }
    editBusstopSearchViewList();
  }

  async function fetchSubwaySearch(keyword: string) {
    try {
      g_server_subway_search_list.value = await reqSubwayListByRegion(keyword);
    } catch (error) {
      console.warn('fetchSubwaySearch error', error);
      g_server_subway_search_list.value = [];
    }
    editSubwaySearchViewList();
  }

  async function fetchShopByCategory(category_code: string) {
    try {
      g_server_shop_list.value = await reqShopListByCategory(category_code);
    } catch (error) {
      console.warn('fetchShopByCategory error', error);
      g_server_shop_list.value = [];
    }
    editShopCategoryViewList();
  }

  async function fetchBusstopDetail(busstop_key: number) {
    try {
      g_selected_busstop_detail.value = (await reqBusstopDetail(busstop_key)) ?? null;
    } catch (error) {
      console.warn('fetchBusstopDetail error', error);
      g_selected_busstop_detail.value = null;
    }
  }

  async function fetchSubwayDetail(subway_key: number) {
    try {
      g_selected_subway_detail.value = (await reqSubwayDetail(subway_key)) ?? null;
    } catch (error) {
      console.warn('fetchSubwayDetail error', error);
      g_selected_subway_detail.value = null;
    }
  }

  async function fetchShopDetail(shop_key: number) {
    try {
      const matchedShop = g_server_shop_list.value.find((shop) => shop.shop_key === shop_key);
      g_selected_shop_detail.value = matchedShop ?? null;
    } catch (error) {
      console.warn('fetchShopDetail error', error);
      g_selected_shop_detail.value = null;
    }
  }

  function setDestinationMainTab(tab: DestinationMainTab) {
    g_destination_main_tab.value = tab;
  }

  function setDirectInputText(value: string) {
    g_direct_input_text.value = value;
  }

  return {
    g_destination_main_tab,
    g_busstop_search_view_list,
    g_subway_search_view_list,
    g_shop_category_view_list,
    g_category_stage_list,
    g_direct_input_text,
    g_selected_busstop_detail,
    g_selected_subway_detail,
    g_selected_shop_detail,
    fetchBusstopSearch,
    fetchSubwaySearch,
    fetchShopByCategory,
    fetchBusstopDetail,
    fetchSubwayDetail,
    fetchShopDetail,
    setDestinationMainTab,
    setDirectInputText
  };
});
