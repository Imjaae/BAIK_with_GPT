import type { ReqSsnews } from './models';

export interface NewsListItem extends ReqSsnews {
  summary_text?: string;
}

export async function reqNewsList(): Promise<NewsListItem[]> {
  console.info('reqNewsList called');
  throw new Error('reqNewsList is not wired to the backend yet.');
}

export async function reqNewsDetail(news_key: number): Promise<ReqSsnews | undefined> {
  console.info('reqNewsDetail called', news_key);
  throw new Error('reqNewsDetail is not wired to the backend yet.');
}
