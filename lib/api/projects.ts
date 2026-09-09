import { ACCODE, getJson } from './shared';

export interface PortfolioProject {
  id: string;
  projectName: string;
  tagline?: string;
  description: string;
  skills: string[];
  associatedWith: string;
  projectUrl?: string;
}

interface ProjectsPage {
  data: { items: PortfolioProject[]; page: number; pageSize: number; total: number };
}

export async function fetchPortfolioProjects(): Promise<PortfolioProject[]> {
  const items: PortfolioProject[] = [];
  let page = 1;
  for (;;) {
    const result = await getJson<ProjectsPage>(`/api/projects?accode=${ACCODE}&page=${page}&pageSize=50`);
    const pageItems = result?.data?.items ?? [];
    items.push(...pageItems);
    const total = result?.data?.total ?? items.length;
    if (pageItems.length === 0 || items.length >= total) break;
    page += 1;
  }
  return items;
}
