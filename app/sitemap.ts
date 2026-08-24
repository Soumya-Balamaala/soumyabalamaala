import type { MetadataRoute } from 'next';
import { fetchJobPostings } from '@/lib/api/jobPostings';

const BASE_URL = 'https://soumyabalamaala.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/recommend`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/recommendations`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/referral-hub`, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const jobs = await fetchJobPostings().catch(() => []);
  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${BASE_URL}/referral-hub/${job.postingCode}/apply`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...jobRoutes];
}
