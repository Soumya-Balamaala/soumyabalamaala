import { createResourceStore } from './createResourceStore';
import { fetchSkills, skillsFallback, SkillsEntry } from '@/lib/api/skills';

// Falls back to the bundled static skills if the live API is unreachable,
// so the section always renders real content instead of an error state.
export const useSkillsStore = createResourceStore<SkillsEntry[]>(
  'skills',
  () => fetchSkills().catch((error) => {
    console.error('Falling back to static skills data:', error);
    return skillsFallback;
  }),
  skillsFallback
);
