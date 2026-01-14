import { ref } from 'vue';
import { defineStore } from 'pinia';

import { reqRouteDetail, reqRouteSummaryList } from '@/api/route';
import type { RouteDetail, RouteSummary } from '@/api/route';

export type RouteTab = 'transit' | 'walk';
export type RouteSortOption = 'fastest' | 'cheapest' | 'minimum-transfer' | 'minimum-walk';

export interface RouteCardView {
  summary_key: number;
  transport_type: RouteTab;
  total_minutes: number;
  departure_time_text: string;
  arrival_time_text: string;
  first_vehicle_time_text?: string;
}

export interface RouteDetailView {
  summary_key: number;
  segment_text_list: string[];
}

export const useRouteStore = defineStore('routeStore', () => {
  const g_route_tab = ref<RouteTab>('transit');
  const g_route_sort_option = ref<RouteSortOption>('fastest');

  const g_server_route_summary_list = ref<RouteSummary[]>([]);
  const g_server_route_detail = ref<RouteDetail | null>(null);

  const g_route_card_list = ref<RouteCardView[]>([]);
  const g_route_detail_view = ref<RouteDetailView | null>(null);

  function editRouteCardList() {
    g_route_card_list.value = g_server_route_summary_list.value.map((item) => ({
      summary_key: item.summary_key,
      transport_type: item.transport_type,
      total_minutes: item.total_minutes,
      departure_time_text: item.departure_time_text,
      arrival_time_text: item.arrival_time_text,
      first_vehicle_time_text: item.first_vehicle_time_text
    }));
  }

  function editRouteDetailView() {
    if (!g_server_route_detail.value) {
      g_route_detail_view.value = null;
      return;
    }

    g_route_detail_view.value = {
      summary_key: g_server_route_detail.value.summary.summary_key,
      segment_text_list: g_server_route_detail.value.segment_list.map(
        (segment) => `${segment.title}: ${segment.description} (${segment.duration_minutes}분)`
      )
    };
  }

  async function fetchRouteSummary(destination_key: number) {
    try {
      g_server_route_summary_list.value = await reqRouteSummaryList(destination_key);
    } catch (error) {
      console.warn('fetchRouteSummary error', error);
      g_server_route_summary_list.value = [];
    }
    editRouteCardList();
  }

  async function fetchRouteDetail(summary_key: number) {
    try {
      g_server_route_detail.value = await reqRouteDetail(summary_key);
    } catch (error) {
      console.warn('fetchRouteDetail error', error);
      g_server_route_detail.value = null;
    }
    editRouteDetailView();
  }

  function setRouteTab(tab: RouteTab) {
    g_route_tab.value = tab;
  }

  function setRouteSortOption(option: RouteSortOption) {
    g_route_sort_option.value = option;
  }

  return {
    g_route_tab,
    g_route_sort_option,
    g_route_card_list,
    g_route_detail_view,
    fetchRouteSummary,
    fetchRouteDetail,
    setRouteTab,
    setRouteSortOption
  };
});
