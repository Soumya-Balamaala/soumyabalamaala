import { ACCODE, postJson } from './shared';

export interface ContactPayload {
  name: string;
  company?: string;
  services?: string;
  email: string;
  mobile: string;
  description?: string;
}

export async function submitContactForm(payload: ContactPayload): Promise<unknown> {
  return postJson('/api/contact', { accode: ACCODE, ...payload });
}
