import { createResourceStore } from './createResourceStore';
import { fetchTenantConfig, TenantConfig } from '@/lib/api/tenant';

export const useTenantStore = createResourceStore<TenantConfig | null>(
  'tenant-config',
  () => fetchTenantConfig(),
  null
);
