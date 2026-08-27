import { createResourceStore } from './createResourceStore';
import { fetchJobPostings, JobPosting } from '@/lib/api/jobPostings';

export const useJobPostingsStore = createResourceStore<JobPosting[]>(
  'job-postings',
  () => fetchJobPostings(),
  []
);
