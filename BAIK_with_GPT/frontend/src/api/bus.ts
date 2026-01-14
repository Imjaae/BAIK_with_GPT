import type {
  ReqBus,
  ReqBusarrival,
  ReqBusgroup,
  ReqGugan,
  ResBusgroupsWithBuses
} from './models';

export interface BusDetailBundle {
  busgroup?: ReqBusgroup;
  bus_list: ReqBus[];
  gugan_list: ReqGugan[];
}

export async function reqBusgroupsByBusstop(busstop_key: number): Promise<ResBusgroupsWithBuses> {
  console.info('reqBusgroupsByBusstop called', busstop_key);
  throw new Error('reqBusgroupsByBusstop is not wired to the backend yet.');
}

export async function reqBusArrivalList(busstop_key: number): Promise<ReqBusarrival[]> {
  console.info('reqBusArrivalList called', busstop_key);
  throw new Error('reqBusArrivalList is not wired to the backend yet.');
}

export async function reqBusDetail(bus_key: number): Promise<BusDetailBundle> {
  console.info('reqBusDetail called', bus_key);
  throw new Error('reqBusDetail is not wired to the backend yet.');
}
