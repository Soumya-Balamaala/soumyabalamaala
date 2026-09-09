import { createResourceStore } from './createResourceStore';
import { fetchPortfolioProjects, portfolioProjectsFallback, PortfolioProject } from '@/lib/api/projects';

// Falls back to the bundled static projects if the live API is unreachable,
// so the section always renders real content instead of an error state.
export const usePortfolioProjectsStore = createResourceStore<PortfolioProject[]>(
  'portfolio-projects',
  () => fetchPortfolioProjects().catch((error) => {
    console.error('Falling back to static portfolio projects data:', error);
    return portfolioProjectsFallback;
  }),
  portfolioProjectsFallback
);
