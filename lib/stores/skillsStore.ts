import { createResourceStore } from './createResourceStore';
import { fetchSkills, SkillsEntry } from '@/lib/api/skills';

export const useSkillsStore = createResourceStore<SkillsEntry[]>('skills', () => fetchSkills(), []);
