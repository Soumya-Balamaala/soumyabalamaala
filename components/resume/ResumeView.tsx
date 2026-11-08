import type { PublicResume } from '@/lib/api/publicResume';
import { ProfileGrid } from './ProfileGrid';
import { SectionRenderer } from './SectionRenderer';

export function ResumeView({ resume }: { resume: PublicResume }) {
  const info = resume.basicInfo ?? {};
  const sections = [...(resume.sections ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const photo = info.photoUrl?.trim();

  return (
    <article className="resume-card bg-white shadow-lg w-full max-w-[210mm] h-full mx-auto p-4 sm:p-[10mm] sm:min-h-[297mm] text-gray-900 overflow-hidden">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-[22pt] leading-tight font-bold uppercase break-words">{info.fullName?.trim()}</h1>
          {info.title?.trim() && <p className="text-[12pt] text-gray-700 break-words mb-2">{info.title}</p>}
          <ProfileGrid info={info} />
        </div>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={info.fullName ?? 'Photo'} className="h-20 w-20 sm:h-28 sm:w-28 rounded-full object-cover shrink-0" />
        )}
      </header>
      <div className="border-t border-gray-400 mt-2" />
      {sections.map((s) => (
        <SectionRenderer key={s.id} section={s} />
      ))}
    </article>
  );
}
