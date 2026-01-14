import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { reqBusArrivalList } from '@/api/bus';
import { reqBusstopDetail } from '@/api/destination';
import type { ReqBusarrival, ReqBusstop } from '@/api/models';

export interface HomeArrivalCard {
  log_arrival_key?: number;
  bus_name_text: string;
  arrival_time_text: string;
  remain_stop_text: string;
  low_floor_visible: boolean;
  busy_stat?: string;
}

export interface HomeStationSummary {
  station_name_text: string;
  station_number_text: string;
}

export interface HomeWeatherSummary {
  icon_name: string;
  status_text: string;
  temperature_text: string;
}

export interface HomeAirSummary {
  status_text: string;
}

export interface HomeHumiditySummary {
  status_text: string;
}

export interface HomeMapCategory {
  code: string;
  label: string;
  selected: boolean;
}

const MAP_CATEGORY_LIST: HomeMapCategory[] = [
  { code: 'all', label: '전체', selected: true },
  { code: 'food', label: '식당', selected: false },
  { code: 'cafe', label: '카페', selected: false },
  { code: 'bank', label: '은행', selected: false },
  { code: 'hospital', label: '병원', selected: false }
];

export const useHomeStore = defineStore('homeStore', () => {
  const g_server_busarrival_list = ref<ReqBusarrival[]>([]);
  const g_server_busstop_detail = ref<ReqBusstop | null>(null);

  const g_arrival_card_list = ref<HomeArrivalCard[]>([]);
  const g_station_summary = ref<HomeStationSummary>({
    station_name_text: '정류장 이름',
    station_number_text: '00000'
  });
  const g_weather_summary = ref<HomeWeatherSummary>({
    icon_name: 'sunny',
    status_text: '맑음',
    temperature_text: '--°C'
  });
  const g_air_summary = ref<HomeAirSummary>({
    status_text: '정보 없음'
  });
  const g_humidity_summary = ref<HomeHumiditySummary>({
    status_text: '정보 없음'
  });
  const g_header_clock_text = ref('00.00 (월) 오전 00:00');
  const g_map_category_list = ref<HomeMapCategory[]>([...MAP_CATEGORY_LIST]);

  const g_selected_map_category_code = computed(() => {
    return g_map_category_list.value.find((item) => item.selected)?.code ?? 'all';
  });

  function editArrivalCardList() {
    g_arrival_card_list.value = g_server_busarrival_list.value.map((item) => ({
      log_arrival_key: item.log_arrival_key,
      bus_name_text: item.bus_key ? `버스 ${item.bus_key}` : '버스 정보 없음',
      arrival_time_text: item.arrival_time ? item.arrival_time : '도착 정보 없음',
      remain_stop_text: item.busstop_key ? `${item.busstop_key}번 정류장` : '정류장 정보 없음',
      low_floor_visible: item.upper_yn === 1,
      busy_stat: item.busy_stat
    }));
  }

  function editStationSummary() {
    if (!g_server_busstop_detail.value) {
      g_station_summary.value = {
        station_name_text: '정류장 정보 없음',
        station_number_text: '-'
      };
      return;
    }

    g_station_summary.value = {
      station_name_text: g_server_busstop_detail.value.name ?? '정류장',
      station_number_text: g_server_busstop_detail.value.busstop_id ?? '-'
    };
  }

  function editMapCategory(code: string) {
    g_map_category_list.value = g_map_category_list.value.map((item) => ({
      ...item,
      selected: item.code === code
    }));
  }

  async function fetchHomeOverview(busstop_key: number) {
    try {
      g_server_busarrival_list.value = await reqBusArrivalList(busstop_key);
    } catch (error) {
      console.warn('fetchHomeOverview arrival error', error);
      g_server_busarrival_list.value = [];
    }
    editArrivalCardList();

    try {
      g_server_busstop_detail.value = (await reqBusstopDetail(busstop_key)) ?? null;
    } catch (error) {
      console.warn('fetchHomeOverview busstop error', error);
      g_server_busstop_detail.value = null;
    }
    editStationSummary();
    updateHeaderClock();
  }

  function updateHeaderClock(date_value = new Date()) {
    const weekdayFormatter = new Intl.DateTimeFormat('ko-KR', {
      weekday: 'short'
    });
    const hour24 = date_value.getHours();
    const meridiem = hour24 >= 12 ? '오후' : '오전';
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const minuteText = String(date_value.getMinutes()).padStart(2, '0');
    const yearText = String(date_value.getFullYear());
    const monthText = String(date_value.getMonth() + 1).padStart(2, '0');
    const dayText = String(date_value.getDate()).padStart(2, '0');
    const weekdayText = weekdayFormatter.format(date_value);

    g_header_clock_text.value = `${yearText}.${monthText}.${dayText} (${weekdayText}) ${meridiem} ${String(
      hour12
    ).padStart(2, '0')}:${minuteText}`;
  }

  return {
    g_arrival_card_list,
    g_station_summary,
    g_weather_summary,
    g_air_summary,
    g_humidity_summary,
    g_header_clock_text,
    g_map_category_list,
    g_selected_map_category_code,
    fetchHomeOverview,
    editMapCategory,
    updateHeaderClock
  };
});
