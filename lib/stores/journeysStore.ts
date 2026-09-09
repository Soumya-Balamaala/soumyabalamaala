import { createResourceStore } from './createResourceStore';
import { fetchTimeline } from '@/lib/api/journeys';
import type { TimelineEntry } from '@/lib/portfolio-data';

export const useJourneysStore = createResourceStore<TimelineEntry[]>('journeys', () => fetchTimeline(), []);
