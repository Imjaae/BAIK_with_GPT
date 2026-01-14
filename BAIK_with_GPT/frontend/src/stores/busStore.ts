import { ref } from 'vue';
import { defineStore } from 'pinia';

import { reqBusDetail, reqBusgroupsByBusstop } from '@/api/bus';
import type { BusDetailBundle } from '@/api/bus';
import type { ReqBus, ReqBusgroup, ResBusgroupsWithBuses } from '@/api/models';

export interface BusNumberSearchCard {
  bus_key?: number;
  bus_name_text: string;
  bus_type_text: string;
  next_arrival_text: string;
}

export interface DestinationSearchCard {
  busstop_name_text: string;
  bus_list_text: string;
}

export interface BusDetailSection {
  title: string;
  row_list: string[];
}

function mapBusTypeText(busgroup?: ReqBusgroup): string {
  if (!busgroup?.bus_type) {
    return '일반';
  }

  const typeMap: Record<string, string> = {
    A: '간선',
    B: '지선',
    C: '광역',
    D: '순환'
  };

  return typeMap[busgroup.bus_type] ?? '일반';
}

export const useBusStore = defineStore('busStore', () => {
  const g_server_busgroup_bundle = ref<ResBusgroupsWithBuses | null>(null);
  const g_server_bus_detail = ref<BusDetailBundle | null>(null);

  const g_bus_number_search_card_list = ref<BusNumberSearchCard[]>([]);
  const g_destination_search_card_list = ref<DestinationSearchCard[]>([]);
  const g_bus_detail_section_list = ref<BusDetailSection[]>([]);
  const g_selected_bus_key = ref<number | null>(null);

  function editBusNumberSearchList() {
    if (!g_server_busgroup_bundle.value) {
      g_bus_number_search_card_list.value = [];
      return;
    }

    g_bus_number_search_card_list.value = g_server_busgroup_bundle.value.busgroup_list.flatMap(
      (bundle) =>
        bundle.bus_list.map((bus: ReqBus) => ({
          bus_key: bus.bus_key,
          bus_name_text: bus.name ?? '버스',
          bus_type_text: mapBusTypeText(bundle.busgroup),
          next_arrival_text: '도착 정보 준비 중'
        }))
    );
  }

  function editDestinationSearchList() {
    if (!g_server_busgroup_bundle.value) {
      g_destination_search_card_list.value = [];
      return;
    }

    g_destination_search_card_list.value = g_server_busgroup_bundle.value.busgroup_list.map(
      (bundle) => ({
        busstop_name_text: bundle.busgroup?.comment ?? '정류장',
        bus_list_text: bundle.bus_list
          .map((bus) => bus.name ?? bus.bus_id ?? '-')
          .join(', ')
      })
    );
  }

  function editBusDetailSections() {
    if (!g_server_bus_detail.value) {
      g_bus_detail_section_list.value = [];
      return;
    }

    const busgroup = g_server_bus_detail.value.busgroup;
    const infoSection: BusDetailSection = {
      title: '버스 기본 정보',
      row_list: [
        `노선명: ${busgroup?.busgroup_name ?? '-'}`,
        `차량 종류: ${mapBusTypeText(busgroup)}`,
        `첫차/막차: ${(busgroup?.first_time ?? '--:--')} / ${(busgroup?.last_time ?? '--:--')}`
      ]
    };

    const termText = busgroup?.term_time ? `${busgroup.term_time}분` : '정보 없음';
    const stationCountText = g_server_bus_detail.value.gugan_list.length
      ? `${g_server_bus_detail.value.gugan_list.length + 1}개 정류장`
      : '정보 없음';

    const scheduleSection: BusDetailSection = {
      title: '운행 정보',
      row_list: [`배차 간격: ${termText}`, `운행 정류장 수: ${stationCountText}`]
    };

    g_bus_detail_section_list.value = [infoSection, scheduleSection];
  }

  async function fetchBusgroupByBusstop(busstop_key: number) {
    try {
      g_server_busgroup_bundle.value = await reqBusgroupsByBusstop(busstop_key);
    } catch (error) {
      console.warn('fetchBusgroupByBusstop error', error);
      g_server_busgroup_bundle.value = { busgroup_list: [] };
    }

    editBusNumberSearchList();
    editDestinationSearchList();
  }

  async function fetchBusDetail(bus_key: number) {
    g_selected_bus_key.value = bus_key;
    try {
      g_server_bus_detail.value = await reqBusDetail(bus_key);
    } catch (error) {
      console.warn('fetchBusDetail error', error);
      g_server_bus_detail.value = { bus_list: [], gugan_list: [] };
    }

    editBusDetailSections();
  }

  return {
    g_bus_number_search_card_list,
    g_destination_search_card_list,
    g_bus_detail_section_list,
    g_selected_bus_key,
    fetchBusgroupByBusstop,
    fetchBusDetail
  };
});
