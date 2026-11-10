import type { PublicResume } from '@/lib/api/publicResume';
import { ProfileGrid } from './ProfileGrid';
import { SectionRenderer } from './SectionRenderer';

export function ResumeView({ resume }: { resume: PublicResume }) {
  const info = resume.basicInfo ?? {};
  const sections = [...(resume.sections ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const photo = info.photoUrl?.trim();

  return (
    <article className="resume-card bg-white shadow-lg w-full max-w-[210mm] h-full mx-auto p-4 sm:p-[10mm] sm:min-h-[297mm] text-gray-900 overflow-hidden">
      <header>
        <h1 className="text-[22pt] leading-tight font-bold break-words">{info.fullName?.trim()}</h1>
      </header>
      <div className="mt-1 pb-3 border-b border-black flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="min-w-0">
          <ProfileGrid info={info} />
        </div>
        {photo && (
          <div className="flex shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={info.fullName ?? 'Photo'} className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover" />
          </div>
        )}
      </div>
      {sections.map((s) => (
        <SectionRenderer key={s.id} section={s} />
      ))}
    </article>
  );
}
