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
        <h1 className="text-[22pt] leading-tight font-bold uppercase break-words">{info.fullName?.trim()}</h1>
        {info.title?.trim() && <p className="text-[12pt] leading-tight text-gray-700 break-words">{info.title}</p>}
      </header>
      <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3 items-start">
        <div className="md:col-span-2 min-w-0">
          <ProfileGrid info={info} />
        </div>
        {photo && (
          <div className="flex md:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={info.fullName ?? 'Photo'} className="h-24 w-24 rounded-full object-cover" />
          </div>
        )}
      </div>
      <div className="border-t border-gray-400 mt-2" />
      {sections.map((s) => (
        <SectionRenderer key={s.id} section={s} />
      ))}
    </article>
  );
}
