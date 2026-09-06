import { ACCODE, getJson } from './shared';

export interface SkillsEntry {
  id: string;
  skillsCategory: string;
  skills: string[];
}

interface SkillsPage {
  data: { items: SkillsEntry[]; page: number; pageSize: number; total: number };
}

export async function fetchSkills(): Promise<SkillsEntry[]> {
  const items: SkillsEntry[] = [];
  let page = 1;
  for (;;) {
    const result = await getJson<SkillsPage>(`/api/skills?accode=${ACCODE}&page=${page}&pageSize=50`);
    const pageItems = result?.data?.items ?? [];
    items.push(...pageItems);
    const total = result?.data?.total ?? items.length;
    if (pageItems.length === 0 || items.length >= total) break;
    page += 1;
  }
  return items;
}
