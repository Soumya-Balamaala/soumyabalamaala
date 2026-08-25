import { ACCODE, getJson } from './shared';

export interface Testimonial {
  id: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  authorAvatarUrl?: string;
  authorLinkedInUrl?: string;
  relationshipType: string;
  subjectLabel: string;
  content: string;
  initials: string;
  displayOrder: number;
}

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

  const displayOrderRaw = raw.displayOrder ?? raw.display_order ?? raw.sortOrder;
  const displayOrder = typeof displayOrderRaw === 'number' ? displayOrderRaw : Number(displayOrderRaw);

  return {
    id: str(raw.id, raw.trackId),
    authorName,
    authorTitle: str(raw.authorTitle, raw.role),
    authorCompany: str(raw.authorCompany, raw.company),
    authorAvatarUrl: str(raw.authorAvatarUrl) || undefined,
    authorLinkedInUrl: str(raw.authorLinkedInUrl) || undefined,
    relationshipType: str(raw.relationshipType, raw.relationship),
    subjectLabel: str(raw.subjectLabel),
    content: str(raw.content, raw.text),
    initials,
    displayOrder: Number.isFinite(displayOrder) ? displayOrder : Number.MAX_SAFE_INTEGER,
  };
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const result = await getJson<{ data: Record<string, unknown>[] }>(
    `/api/public/testimonials?accode=${ACCODE}`
  );
  const raw = Array.isArray(result?.data) ? result.data : [];
  return raw
    .map(normalizeTestimonial)
    .filter((t) => t.id && t.content)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
