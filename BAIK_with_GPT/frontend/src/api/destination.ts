import type { ReqBusstop, ReqShop, ReqSubway } from './models';

export async function reqBusstopListByKeyword(keyword: string): Promise<ReqBusstop[]> {
  console.info('reqBusstopListByKeyword called', keyword);
  throw new Error('reqBusstopListByKeyword is not wired to the backend yet.');
}

export async function reqBusstopDetail(busstop_key: number): Promise<ReqBusstop | undefined> {
  console.info('reqBusstopDetail called', busstop_key);
  throw new Error('reqBusstopDetail is not wired to the backend yet.');
}

export async function reqSubwayListByRegion(region_keyword: string): Promise<ReqSubway[]> {
  console.info('reqSubwayListByRegion called', region_keyword);
  throw new Error('reqSubwayListByRegion is not wired to the backend yet.');
}

export async function reqSubwayDetail(subway_key: number): Promise<ReqSubway | undefined> {
  console.info('reqSubwayDetail called', subway_key);
  throw new Error('reqSubwayDetail is not wired to the backend yet.');
}

export async function reqShopListByCategory(category_code: string): Promise<ReqShop[]> {
  console.info('reqShopListByCategory called', category_code);
  throw new Error('reqShopListByCategory is not wired to the backend yet.');
}
