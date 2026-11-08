import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CoverLetterView } from '@/components/resume/CoverLetterView';
import { ResumeDocuments } from '@/components/resume/ResumeDocuments';
import { ResumeUnavailable } from '@/components/resume/ResumeUnavailable';
import { ResumeView } from '@/components/resume/ResumeView';
import { fetchResumeBySegment } from '@/lib/api/publicResume';

type Params = { params: Promise<{ segment: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { segment } = await params;
  const result = await fetchResumeBySegment(segment);
  if (result.ok && result.data?.resume?.type === 'role') {
    return { robots: { index: false, follow: false } };
  }
  return {};
}

export default async function ResumeSegmentPage({ params }: Params) {
  const { segment } = await params;
  const result = await fetchResumeBySegment(segment);

  if (!result.ok) {
    if (result.status === 404) notFound();
    return <ResumeUnavailable />;
  }
  const resume = result.data?.resume;
  if (!resume) return <ResumeUnavailable />;

  const letter = resume.type === 'role' ? resume.coverLetter : null;

  return (
    <main className="min-h-screen bg-gray-100 px-3 py-6 sm:px-6">
      <ResumeDocuments
        segment={`resume-${segment}`}
        resumeNode={<ResumeView resume={resume} />}
        letterNode={letter ? <CoverLetterView letter={letter} fallbackName={resume.basicInfo?.fullName} /> : undefined}
      />
    </main>
  );
}
