import { ACCODE } from './shared';

const API_BASE = 'https://console.devmarvibe.com';

export interface TimelineEntry {
  title?: string;
  organization?: string;
  location?: string;
  mode?: string;
  employmentType?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  link?: string;
  description?: string;
}

export interface ResumeSection {
  id: string | number;
  title?: string;
  type: 'richText' | 'bulletList' | 'keyValue' | 'timeline' | string;
  order?: number;
  content?: {
    html?: string;
    items?: string[];
    entries?: Array<{ key?: string; value?: string } & TimelineEntry>;
  };
}

export interface BasicInfo {
  fullName?: string;
  title?: string;
  photoUrl?: string;
  phone?: string;
  email?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  location?: string;
  nationality?: string;
  visaStatus?: string;
  noticePeriod?: string;
  currentCtc?: string;
  expectedCtc?: string;
  links?: Array<{ label?: string; url?: string } | string>;
}

export interface CoverLetter {
  roleName?: string;
  companyName?: string;
  companyPerson?: string;
  candidateName?: string;
  candidateEmail?: string;
  candidatePhone?: string;
  keySkills?: string[];
  subject?: string;
  body?: string;
  updatedAt?: string;
}

export interface PublicResume {
  type?: 'primary' | 'country' | 'role' | string;
  label?: string;
  slug?: string;
  roleName?: string;
  basicInfo?: BasicInfo;
  sections?: ResumeSection[];
  coverLetter?: CoverLetter | null;
}

export interface CountryLink {
  countryCode?: string;
  label: string;
  slug: string;
}

export type FetchResult<T> = { ok: true; data: T } | { ok: false; status: number };

async function load<T>(path: string, init: RequestInit): Promise<FetchResult<T>> {
  try {
    const res = await fetch(`${API_BASE}${path}`, init);
    if (!res.ok) return { ok: false, status: res.status };
    const json = await res.json();
    return { ok: true, data: (json?.data ?? json) as T };
  } catch {
    return { ok: false, status: 503 };
  }
}

export function fetchPrimaryResume() {
  return load<{ version?: number; primary: PublicResume; countries?: CountryLink[] }>(
    `/api/public/resume?accode=${ACCODE}`,
    { next: { revalidate: 300 } }
  );
}

// Type is unknown before the response: slugs listed as countries are cached, anything else is treated as a private role link.
export async function fetchResumeBySegment(segment: string) {
  const primary = await fetchPrimaryResume();
  const isCountry = primary.ok && (primary.data.countries ?? []).some((c) => c.slug === segment);
  return load<{ version?: number; resume: PublicResume }>(
    `/api/public/resume/${encodeURIComponent(segment)}?accode=${ACCODE}`,
    isCountry ? { next: { revalidate: 300 } } : { cache: 'no-store' }
  );
}
