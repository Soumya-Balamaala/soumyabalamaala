import { resolveUrl } from '@/lib/api/shared';

export interface BackendCheckResult {
  reachable: boolean;
  reason?: 'timeout' | 'network_blocked';
}

const CHECK_TIMEOUT_MS = 6000;

export async function checkBackend(): Promise<BackendCheckResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);

  try {
    const response = await fetch(resolveUrl('/api/public/health'), {
      cache: 'no-store',
      signal: controller.signal,
    });
    return { reachable: response.ok };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return { reachable: false, reason: 'timeout' };
    }
    return { reachable: false, reason: 'network_blocked' };
  } finally {
    clearTimeout(timeout);
  }
}
