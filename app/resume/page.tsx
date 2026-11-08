import Link from 'next/link';
import { ResumeDocuments } from '@/components/resume/ResumeDocuments';
import { ResumeUnavailable } from '@/components/resume/ResumeUnavailable';
import { ResumeView } from '@/components/resume/ResumeView';
import { fetchPrimaryResume } from '@/lib/api/publicResume';

export const revalidate = 300;

export default async function ResumePage() {
  const result = await fetchPrimaryResume();
  if (!result.ok || !result.data?.primary) return <ResumeUnavailable />;

  const countries = result.data.countries ?? [];

  return (
    <main className="min-h-screen bg-gray-100 px-3 py-6 sm:px-6">
      {countries.length > 0 && (
        <nav aria-label="Resume versions" className="no-print mx-auto mb-4 flex w-full max-w-[210mm] flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-600">Other versions:</span>
          {countries.map((c) => (
            <Link key={c.slug} href={`/resume-${c.slug}`} className="rounded-full border border-purple-700 bg-white px-3 py-1 text-purple-800 hover:bg-purple-50">
              {c.label}
            </Link>
          ))}
        </nav>
      )}
      <ResumeDocuments segment="resume" resumeNode={<ResumeView resume={result.data.primary} />} />
    </main>
  );
}
