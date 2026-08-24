import { ACCODE, getJson } from './shared';

export interface TenantConfig {
  accode: string;
  settings: {
    name?: string;
    logo?: string;
    professionalPic?: string;
    socialLinks?: { platform: string; url: string }[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export async function fetchTenantConfig<T = TenantConfig>(): Promise<T> {
  const result = await getJson<{ data: T }>(`/api/tenants/${ACCODE}/config`);
  return result?.data;
}
