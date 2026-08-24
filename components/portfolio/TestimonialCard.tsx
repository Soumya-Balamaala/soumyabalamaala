import { Quote, Linkedin } from 'lucide-react';
import { Testimonial } from '@/lib/api/testimonials';
import { labelize, resolveApiUrl } from '@/lib/utils';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { authorName, authorTitle, authorCompany, authorAvatarUrl, authorLinkedInUrl, relationshipType, subjectLabel, content, initials } =
    testimonial;

  return (
    <div className="flex h-full min-w-0 flex-col rounded-card border border-slate-100 bg-white p-6 text-center shadow-card md:text-left">
      <Quote size={22} className="mx-auto mb-3 text-gold md:mx-0" />
      <p className="flex-1 break-words text-sm leading-relaxed text-slate-text">&ldquo;{content}&rdquo;</p>

      {subjectLabel && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-sage-dark">{subjectLabel}</p>
      )}

      <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy/10 text-sm font-bold text-navy">
          {authorAvatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={resolveApiUrl(authorAvatarUrl)} alt={authorName} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </span>
        <div>
          <div className="flex items-center justify-center gap-1.5 md:justify-start">
            <p className="text-sm font-bold text-navy">{authorName}</p>
            {authorLinkedInUrl && (
              <a
                href={authorLinkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${authorName} on LinkedIn`}
                className="text-slate-light transition-colors hover:text-navy"
              >
                <Linkedin size={14} />
              </a>
            )}
          </div>
          <p className="text-xs text-slate-light">{[authorTitle, authorCompany].filter(Boolean).join(' · ')}</p>
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
