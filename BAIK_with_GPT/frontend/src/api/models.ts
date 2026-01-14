export interface ReqBus {
  bus_key?: number;
  busgroup_key?: number;
  bus_id?: string;
  car_no?: string;
  name?: string;
  comment?: string;
  engine_type?: string;
  floor2_yn?: number;
  low_yn?: number;
  tot_seat?: number;
}

export interface ReqBusarrival {
  log_arrival_key?: number;
  bus_key?: number;
  busstop_key?: number;
  arrival_time?: string;
  upper_yn?: number;
  total_seat?: number;
  use_seat?: number;
  busy_stat?: string;
}

export interface ReqBusgroup {
  busgroup_key?: number;
  busgroup_name?: string;
  bus_type?: string;
  busmap_image_filekey?: number;
  first_time?: string;
  last_time?: string;
  term_time?: number;
  busstop_key_list?: number[];
  comment?: string;
  juso?: string;
  si?: string;
  gu?: string;
  dong?: string;
  tel?: string;
  mobile?: string;
  ceo_name?: string;
  open_date?: string;
  company_no?: string;
}

export interface ReqBusstop {
  busstop_key?: number;
  busstop_id?: string;
  name?: string;
  comment?: string;
  upper_yn?: number;
  map_x?: number;
  map_y?: number;
  juso?: string;
  si?: string;
  gu?: string;
  dong?: string;
  image_filekey_list?: number[];
}

export interface BusgroupWithBuses {
  busgroup: ReqBusgroup;
  bus_list: ReqBus[];
}

export interface ResBusgroupsWithBuses {
  busgroup_list: BusgroupWithBuses[];
}

export interface ReqGugan {
  gugan_key?: number;
  busgroup_key?: number;
  fr_busstop_key?: number;
  to_busstop_key?: number;
  term_min?: number;
}

export interface ReqShop {
  shop_key?: number;
  name?: string;
  comment?: string;
  map_x?: number;
  map_y?: number;
  juso?: string;
  si?: string;
  gu?: string;
  dong?: string;
  image_filekey_list?: number[];
}

export interface ReqSubway {
  subway_key?: number;
  name?: string;
  comment?: string;
  upper_yn?: number;
  map_x?: number;
  map_y?: number;
  juso?: string;
  si?: string;
  gu?: string;
  dong?: string;
  image_filekey_list?: number[];
}

export interface ReqRoadinfo {
  roadinfo_key?: number;
  info_type?: string;
  title?: string;
  body_str?: string;
  image_filekey_list?: number[];
}

export interface ReqSsnews {
  news_key?: number;
  news_type?: string;
  title?: string;
  body_str?: string;
  image_filekey_list?: number[];
  body_image_filekey_list?: number[];
}

export interface ReqSspage {
  page_key?: number;
  name?: string;
  url?: string;
  comment?: string;
}

export interface ReqSspagelog {
  log_page_key?: number;
  page_key?: number;
  start_time?: string;
}
