import { createResourceStore } from './createResourceStore';
import { fetchPortfolioProjects, PortfolioProject } from '@/lib/api/projects';

export const usePortfolioProjectsStore = createResourceStore<PortfolioProject[]>(
  'portfolio-projects',
  () => fetchPortfolioProjects(),
  []
);
