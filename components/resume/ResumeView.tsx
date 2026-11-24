import type { PublicResume } from "@/lib/api/publicResume";
import { ProfileGrid } from "./ProfileGrid";
import { SectionRenderer } from "./SectionRenderer";

export function ResumeView({ resume }: { resume: PublicResume }) {
  const info = resume.basicInfo ?? {};
  const sections = [...(resume.sections ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const photo = info.photoUrl?.trim();

  return (
    <article className="resume-card bg-white shadow-lg w-full max-w-[210mm] h-full mx-auto p-4 sm:p-[10mm] sm:min-h-[297mm] text-gray-900 overflow-hidden">
      <div className="pb-3 border-b border-black last:border-b-0 flex flex-col sm:flex-row print:flex-row sm:items-center print:items-center gap-4">
        {photo && (
          <div className="flex shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={info.fullName ?? "Photo"}
              className="h-20 w-20 sm:h-32 sm:w-32 rounded-full object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-[22pt] leading-none font-bold break-words mb-2">
            {info.fullName?.trim()}
          </h1>
          <ProfileGrid info={info} />
        </div>
      </div>
      {sections.map((s) => (
        <SectionRenderer key={s.id} section={s} />
      ))}
    </article>
  );
}
