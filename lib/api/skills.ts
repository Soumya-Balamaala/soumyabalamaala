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

// Bundled fallback, mirroring the live data — used when the API is
// unreachable so the section still renders real content.
export const skillsFallback: SkillsEntry[] = [
  { id: 'frontend', skillsCategory: 'Frontend', skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript'] },
  { id: 'backend', skillsCategory: 'Backend', skills: ['Node.js', 'Express.js'] },
  { id: 'ui-framework', skillsCategory: 'UI Framework', skills: ['Material UI', 'Tailwind CSS', 'Styled Components'] },
  { id: 'mobile', skillsCategory: 'Mobile (Beginner)', skills: ['React Native with CLI', 'React Native with Expo'] },
  {
    id: 'state-management',
    skillsCategory: 'State Management',
    skills: ['Redux', 'Redux Toolkit', 'Redux Saga', 'Zustand', 'TanStack Query'],
  },
  { id: 'version-control', skillsCategory: 'Version Control', skills: ['Git', 'GitHub'] },
  { id: 'testing-library', skillsCategory: 'Testing Library', skills: ['Jest'] },
  { id: 'api-integrations', skillsCategory: 'API Implementation & Integrations', skills: ['REST'] },
  { id: 'hosting-deployment', skillsCategory: 'Hosting and Deployment', skills: ['Firebase', 'Vercel'] },
  { id: 'ai-assisted-tools', skillsCategory: 'AI Assisted Tools', skills: ['Claude', 'GitHub Co-pilot'] },
  {
    id: 'database-orm',
    skillsCategory: 'Database & ORM',
    skills: ['PostgreSQL', 'MongoDB', 'Prisma', 'Sequelize'],
  },
];
