import type { ReqRoadinfo } from './models';

export async function reqRoadinfoList(): Promise<ReqRoadinfo[]> {
  console.info('reqRoadinfoList called');
  throw new Error('reqRoadinfoList is not wired to the backend yet.');
}

export async function reqRoadinfoDetail(roadinfo_key: number): Promise<ReqRoadinfo | undefined> {
  console.info('reqRoadinfoDetail called', roadinfo_key);
  throw new Error('reqRoadinfoDetail is not wired to the backend yet.');
}
