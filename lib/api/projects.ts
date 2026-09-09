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

// Bundled fallback, mirroring the live data — used when the API is
// unreachable so the section still renders real content.
export const portfolioProjectsFallback: PortfolioProject[] = [
  {
    id: 'vkyc-dkyc-ocac',
    projectName: 'VKYC, DKYC and OCAC',
    tagline: 'Fintech verification modules powering real-time KYC workflows in production.',
    description: 'Resolved 100+ critical production incidents and shipped 20+ change requests while maintaining 100% uptime.',
    skills: ['React.js', 'REST APIs', 'Production Support', 'Performance Optimization'],
    associatedWith: 'M2P Fintech',
  },
  {
    id: 'dost-ai',
    projectName: 'Dost AI',
    tagline: 'An autism-support product helping children build and follow daily routines.',
    description: 'Built modular, reusable React components and deployed the app seamlessly via Firebase/GCP.',
    skills: ['React.js', 'Firebase', 'Google Cloud Platform', 'REST APIs'],
    associatedWith: 'Solaiera.ai',
  },
  {
    id: 'kapil-technologies-website',
    projectName: 'Kapil Technologies Website',
    tagline: "The company's public-facing website paired with an internal admin platform.",
    description: 'Transformed a static site into a dynamic SPA with file uploads and a custom Admin Panel.',
    skills: ['React.js', 'SPA Architecture', 'Admin Panel', 'API Integration'],
    associatedWith: 'Kapil Technologies PvT Ltd',
  },
  {
    id: 'prohealthi',
    projectName: 'ProHealthI',
    tagline: 'An admin panel built to streamline healthcare operations.',
    description: 'Led UI development and API integration to meet tight, EOD-critical deployment deadlines.',
    skills: ['React.js', 'REST APIs', 'UI Development'],
    associatedWith: 'VMax e-Solutions Pvt Ltd',
  },
  {
    id: 'talentkind',
    projectName: 'Talentkind.com',
    tagline: 'A recruitment platform with dedicated Trainer, Talent, and Employer modules.',
    description: 'Converted UI wireframes into reusable React components and integrated APIs to speed up releases.',
    skills: ['React.js', 'Component Architecture', 'API Integration'],
    associatedWith: 'Talentkind Solutions LLP',
  },
  {
    id: 'dmv-app-console',
    projectName: 'DMV App Console',
    tagline: 'A multi-tenant SaaS platform enabling individuals, recruiters, and companies to manage branded workspaces, hiring pipelines, and leads.',
    description: 'Designed isolated tenant architecture, JWT-based role access, and premium billing, exposed via REST APIs for external integration.',
    skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Sequelize', 'JWT', 'Resend/SMTP', 'Vercel'],
    associatedWith: 'Personal',
    projectUrl: 'https://console.devmarvibe.com',
  },
];
