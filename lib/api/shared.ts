export const ACCODE = 'SOU';

// No server-side proxy — always call the backend directly at its absolute
// URL. Client-side calls will fail with CORS errors until the backend sends
// Access-Control-Allow-Origin headers for this app's origin.
export function resolveUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL ?? ''}${path}`;
}

export async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(resolveUrl(path), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Request failed: ${path} (${response.status})`);
  }
  return response.json();
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(resolveUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = result?.respdesc || result?.message || `Request failed: ${path} (${response.status})`;
    throw new Error(message);
  }
  return result as T;
}
