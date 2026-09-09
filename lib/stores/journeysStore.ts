import { createResourceStore } from './createResourceStore';
import { fetchTimeline } from '@/lib/api/journeys';
import { timelineData, type TimelineEntry } from '@/lib/portfolio-data';

// Falls back to the bundled static timeline if the live API is unreachable
// (e.g. today's CORS gap on the backend), so the section always renders
// real content instead of an error state.
export const useJourneysStore = createResourceStore<TimelineEntry[]>(
  'journeys',
  () => fetchTimeline().catch((error) => {
    console.error('Falling back to static timeline data:', error);
    return timelineData;
  }),
  timelineData
);
