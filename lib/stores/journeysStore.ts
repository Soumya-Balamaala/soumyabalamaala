import { createResourceStore } from './createResourceStore';
import { fetchJourneys, JourneyEntry } from '@/lib/api/journeys';

export const useJourneysStore = createResourceStore<JourneyEntry[]>('journeys', () => fetchJourneys(), []);
