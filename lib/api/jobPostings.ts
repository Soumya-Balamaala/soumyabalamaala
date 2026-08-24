import { ACCODE, getJson } from './shared';

export { ACCODE };

export type CustomFieldType = 'select' | 'checkbox' | 'date' | 'number' | 'text' | 'textarea';

export interface CustomField {
  id: string;
  label: string;
  type: CustomFieldType;
  required: boolean;
  options?: string[];
}

export interface JobPosting {
  id: string;
  postingCode: string;
  title: string;
  company: string;
  companyLogoUrl?: string;
  recruiterLinkedInUrl?: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  customFields: CustomField[];
}

// Field mapping confirmed against real postings from the live API:
// title, description (prose intro), responsibilities (real array field —
// some older postings crammed this into description instead, so we still
// fall back to description if responsibilities is empty), customFields
// ({id, type, label, required, options?}), companyName, companyLogoUrl,
// recruiterLinkedInUrl, workMode, employmentType, locationCity/Country,
// skills (used as requirements).
function normalizeJobPosting(raw: Record<string, unknown>): JobPosting {
  const str = (...candidates: unknown[]): string => {
    const found = candidates.find(
      (c) => (typeof c === 'string' && c.length > 0) || typeof c === 'number'
    );
    return found === undefined ? '' : String(found);
  };
  const list = (...candidates: unknown[]): string[] => {
    const found = candidates.find(
      (c) => (Array.isArray(c) && c.length > 0) || typeof c === 'string'
    );
    if (Array.isArray(found)) return found.map(String);
    if (typeof found === 'string') return found.split('\n').map((s) => s.trim()).filter(Boolean);
    return [];
  };
  const titleCase = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const customFields = Array.isArray(raw.customFields)
    ? (raw.customFields as Record<string, unknown>[]).map(
        (f): CustomField => ({
          id: str(f.id),
          label: str(f.label),
          type: (str(f.type) || 'text') as CustomFieldType,
          required: f.required === true,
          options: Array.isArray(f.options) ? f.options.map(String) : undefined,
        })
      )
    : [];

  const cityCountry = [str(raw.locationCity), str(raw.locationCountry)].filter(Boolean).join(', ');
  const logoPath = str(raw.companyLogoUrl);

  return {
    id: str(raw.id, raw._id, raw.jobId, raw.postingId, raw.slug),
    postingCode: str(raw.postingCode, raw.trackId),
    title: str(raw.title, raw.jobTitle, raw.role),
    company: str(raw.company, raw.companyName, ACCODE),
    companyLogoUrl: logoPath ? `${process.env.NEXT_PUBLIC_API_URL ?? ''}${logoPath}` : undefined,
    recruiterLinkedInUrl: str(raw.recruiterLinkedInUrl) || undefined,
    location: cityCountry || titleCase(str(raw.workMode)) || str(raw.location, raw.jobLocation, 'Remote'),
    type: str(raw.employmentType, raw.type, raw.jobType),
    description: str(raw.description, raw.summary),
    responsibilities: list(raw.responsibilities, raw.duties, raw.description),
    requirements: list(raw.skills, raw.requirements, raw.qualifications),
    customFields,
  };
}

export async function fetchJobPostings(): Promise<JobPosting[]> {
  const result = await getJson<{ data: Record<string, unknown>[] }>(
    `/api/public/job-postings?accode=${ACCODE}`
  );
  const rawJobs = Array.isArray(result?.data) ? result.data : [];
  return rawJobs.map(normalizeJobPosting).filter((job) => job.id);
}
