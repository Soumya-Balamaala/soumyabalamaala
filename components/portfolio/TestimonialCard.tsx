import { Quote, Linkedin } from 'lucide-react';
import { Testimonial } from '@/lib/api/testimonials';
import { labelize, resolveApiUrl } from '@/lib/utils';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { authorName, authorTitle, authorCompany, authorAvatarUrl, authorLinkedInUrl, relationshipType, subjectLabel, content, initials } =
    testimonial;

  return (
    <div className="relative flex h-full min-w-0 flex-col rounded-card border border-slate-100 bg-white p-6 text-left shadow-card">
      {authorLinkedInUrl && (
        <a
          href={authorLinkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${authorName} on LinkedIn`}
          className="absolute right-5 top-5 text-slate-light transition-colors hover:text-navy"
        >
          <Linkedin size={16} />
        </a>
      )}
      <Quote size={22} className="mb-3 text-gold" />
      <p className="flex-1 break-words text-sm leading-relaxed text-slate-text">&ldquo;{content}&rdquo;</p>

      {subjectLabel && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-sage-dark">{subjectLabel}</p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy/10 text-sm font-bold text-navy">
          {authorAvatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={resolveApiUrl(authorAvatarUrl)} alt={authorName} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </span>
        <div>
          <p className="text-sm font-bold text-navy">{authorName}</p>
          {authorTitle && <p className="text-xs text-slate-light">{authorTitle}</p>}
          {authorCompany && <p className="text-xs text-slate-light">{authorCompany}</p>}
          {relationshipType && (
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-light/70">
              {labelize(relationshipType)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
