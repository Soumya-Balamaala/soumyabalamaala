import { ACCODE, getJson } from './shared';

export interface Testimonial {
  id: string;
  authorName: string;
  content: string;
  role: string;
  company: string;
  initials: string;
  authorAvatarUrl?: string;
}

// Best-effort field mapping — the public GET has returned an empty list so
// far (no approved testimonials yet), so these fallbacks are unverified
// against a real record. They mirror the field names used when submitting
// a testimonial (see RecommendSoumya.tsx / POST /api/public/testimonials).
function normalizeTestimonial(raw: Record<string, unknown>): Testimonial {
  const str = (...candidates: unknown[]): string => {
    const found = candidates.find((c) => typeof c === 'string' && c.length > 0);
    return (found as string) ?? '';
  };

  const authorName = str(raw.authorName, raw.name);
  const initials = authorName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return {
    id: str(raw.id, raw.trackId),
    authorName,
    content: str(raw.content, raw.text),
    role: str(raw.role),
    company: str(raw.company),
    initials,
    authorAvatarUrl: str(raw.authorAvatarUrl) || undefined,
  };
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const result = await getJson<{ data: Record<string, unknown>[] }>(
    `/api/public/testimonials?accode=${ACCODE}`
  );
  const raw = Array.isArray(result?.data) ? result.data : [];
  return raw.map(normalizeTestimonial).filter((t) => t.id && t.content);
}
