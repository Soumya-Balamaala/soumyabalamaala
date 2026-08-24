import { ACCODE, getJson, postJson } from './shared';

export interface Resume {
  id: number;
  resumeType: string;
  label?: string;
  fileUrl?: string;
  [key: string]: unknown;
}

export async function fetchResumes(accountType: string = 'personal'): Promise<Resume[]> {
  const result = await getJson<{ data: Resume[] }>(
    `/api/public/resumes?accode=${ACCODE}&accountType=${encodeURIComponent(accountType)}`
  );
  return Array.isArray(result?.data) ? result.data : [];
}

export interface ResumeDownloadPayload {
  resumeType: string;
  resumeId: number;
  contextType: string;
  city?: string;
  state?: string;
  country?: string;
}

// The documented payload nests city/state/country/contextType under a
// `downloadedBy` object — the live API rejects that shape with
// "downloadedBy: Required" regardless of content. Confirmed by testing
// against the deployed backend that these fields must be flat, top-level.
export async function trackResumeDownload(payload: ResumeDownloadPayload): Promise<void> {
  await postJson('/api/resume-downloads', { accode: ACCODE, ...payload });
}
