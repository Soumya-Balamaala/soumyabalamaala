import { getJson } from './shared';

export async function fetchMasterOptions<T = unknown>(category: string): Promise<T> {
  const result = await getJson<{ data: T }>(`/api/master-options?category=${encodeURIComponent(category)}`);
  return result?.data;
}
