import { createResourceStore } from './createResourceStore';
import { fetchResumes, Resume } from '@/lib/api/resumes';

export const useResumeStore = createResourceStore<Resume[]>('resumes', () => fetchResumes(), []);
