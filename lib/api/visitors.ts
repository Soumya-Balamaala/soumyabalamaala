import { ACCODE, postJson } from './shared';

export async function trackVisitor(page: string, url: string): Promise<void> {
  try {
    await postJson('/api/visitors/post', { accode: ACCODE, page, url });
  } catch (error) {
    // Analytics tracking must never break the page.
    console.error('Failed to track visitor:', error);
  }
}
