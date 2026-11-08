import type { CoverLetter } from '@/lib/api/publicResume';

export function CoverLetterView({ letter, fallbackName }: { letter: CoverLetter; fallbackName?: string }) {
  const name = letter.candidateName?.trim() || fallbackName?.trim() || '';
  const parsed = letter.updatedAt ? new Date(letter.updatedAt) : new Date();
  const date = (Number.isNaN(parsed.getTime()) ? new Date() : parsed).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const skills = (letter.keySkills ?? []).filter(Boolean);
  const contact = [letter.candidateEmail, letter.candidatePhone].map((s) => s?.trim()).filter(Boolean).join(' | ');
  const person = letter.companyPerson?.trim();

  return (
    <article className="resume-card bg-white shadow-lg w-full max-w-[210mm] h-full mx-auto p-4 sm:p-[12mm] sm:min-h-[297mm] text-[10pt] text-gray-900 overflow-hidden">
      <div className="break-words">
        <p className="font-bold text-[12pt]">{name}</p>
        {contact && <p>{contact}</p>}
      </div>
      <p className="mt-4">{date}</p>
      <div className="mt-4">
        {person && <p>{person}</p>}
        {letter.companyName?.trim() && <p>{letter.companyName}</p>}
      </div>
      {letter.subject?.trim() && <p className="mt-4 font-bold">{letter.subject}</p>}
      <p className="mt-4">{person ? `Dear ${person},` : 'Dear Hiring Manager,'}</p>
      {letter.body && <div className="resume-html mt-3 break-words" dangerouslySetInnerHTML={{ __html: letter.body }} />}
      {skills.length > 0 && (
        <p className="mt-4 bg-purple-50 border-l-4 border-purple-700 px-3 py-1.5 break-words">
          <span className="font-semibold">Key skills:</span> {skills.join(' | ')}
        </p>
      )}
      <p className="mt-6">Sincerely,</p>
      <p className="mt-1">{name}</p>
    </article>
  );
}
