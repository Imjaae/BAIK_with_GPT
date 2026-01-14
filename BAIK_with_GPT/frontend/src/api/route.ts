import type { ReqGugan } from './models';

export interface RouteSummary {
  summary_key: number;
  transport_type: 'transit' | 'walk';
  total_minutes: number;
  departure_time_text: string;
  arrival_time_text: string;
  first_vehicle_time_text?: string;
}

export interface RouteDetailSegment {
  title: string;
  description: string;
  duration_minutes: number;
  related_bus_key?: number;
}

export interface RouteDetail {
  summary: RouteSummary;
  segment_list: RouteDetailSegment[];
  gugan_list: ReqGugan[];
}

export async function reqRouteSummaryList(destination_key: number): Promise<RouteSummary[]> {
  console.info('reqRouteSummaryList called', destination_key);
  throw new Error('reqRouteSummaryList is not wired to the backend yet.');
}

export async function reqRouteDetail(summary_key: number): Promise<RouteDetail> {
  console.info('reqRouteDetail called', summary_key);
  throw new Error('reqRouteDetail is not wired to the backend yet.');
}
