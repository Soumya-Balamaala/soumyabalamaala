import { ACCODE, getJson } from './shared';
import type { TimelineEntry } from '@/lib/portfolio-data';

export interface JourneyEntry {
  id: string;
  type: 'experience' | 'education';
  durationFrom: string;
  durationTo?: string;
  current?: boolean;
  // experience fields
  role?: string;
  companyName?: string;
  location?: string;
  mode?: string;
  description?: string[];
  skills?: string[];
  // education fields
  degree?: string;
  branch?: string;
  college?: string;
  cgpaOrPercentage?: string;
}

interface JourneysPage {
  data: { items: JourneyEntry[]; page: number; pageSize: number; total: number };
}

export async function fetchJourneys(): Promise<JourneyEntry[]> {
  const items: JourneyEntry[] = [];
  let page = 1;
  // Paginate defensively — today total fits in one page, but nothing
  // guarantees that stays true as more entries get added.
  for (;;) {
    const result = await getJson<JourneysPage>(`/api/journeys?accode=${ACCODE}&page=${page}&pageSize=50`);
    const pageItems = result?.data?.items ?? [];
    items.push(...pageItems);
    const total = result?.data?.total ?? items.length;
    if (pageItems.length === 0 || items.length >= total) break;
    page += 1;
  }
  return items;
}

function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function toTimelineEntry(entry: JourneyEntry): TimelineEntry {
  const from = formatMonthYear(entry.durationFrom);
  const to = entry.current ? 'Present' : entry.durationTo ? formatMonthYear(entry.durationTo) : 'Present';
  const duration = `${from} to ${to}`;

  if (entry.type === 'education') {
    return {
      type: 'education',
      title: [entry.degree, entry.branch].filter(Boolean).join(', '),
      organization: entry.college ?? '',
      duration,
      bullets: entry.cgpaOrPercentage ? [`Score: ${entry.cgpaOrPercentage}`] : [],
    };
  }

  return {
    type: 'work',
    title: entry.role ?? '',
    organization: entry.companyName ?? '',
    location: entry.location,
    duration,
    bullets: entry.description ?? [],
  };
}
