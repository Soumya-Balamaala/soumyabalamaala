import type { ResumeSection, TimelineEntry } from '@/lib/api/publicResume';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseYm(v?: string): { y: number; m: number } | null {
  const match = /^(\d{4})-(\d{1,2})/.exec(v ?? '');
  if (!match) return null;
  const m = Number(match[2]);
  if (m < 1 || m > 12) return null;
  return { y: Number(match[1]), m };
}

const fmt = (d: { y: number; m: number }) => `${MONTHS[d.m - 1]} ${d.y}`;

function dateLine(e: TimelineEntry): string {
  const start = parseYm(e.startDate);
  if (!start) return '';
  const end = e.current ? null : parseYm(e.endDate);
  const now = new Date();
  const last = end ?? { y: now.getFullYear(), m: now.getMonth() + 1 };
  // Inclusive of both months.
  const total = (last.y - start.y) * 12 + (last.m - start.m) + 1;
  let duration = '';
  if (total > 0) {
    const yrs = Math.floor(total / 12);
    const mos = total % 12;
    const parts = [];
    if (yrs) parts.push(`${yrs} Year${yrs > 1 ? 's' : ''}`);
    if (mos) parts.push(`${mos} Month${mos > 1 ? 's' : ''}`);
    duration = ` (${parts.join(' ')})`;
  }
  const endText = end ? fmt(end) : e.current || !e.endDate ? 'Present' : '';
  return `${fmt(start)}${endText ? ` - ${endText}` : ''}${duration}`;
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="space-y-2">
      {entries.map((e, i) => {
        const title = [e.title, e.organization].map((s) => s?.trim()).filter(Boolean).join(', ');
        const meta = [e.location, e.mode, e.employmentType].map((s) => s?.trim()).filter(Boolean).join(' | ');
        const dates = dateLine(e);
        return (
          <div key={i} className="break-inside-avoid-page">
            {(title || dates) && (
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                {title && (
                  <h3 className="text-[10.5pt] font-bold text-gray-900 break-words">
                    {e.link ? (
                      <a href={e.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                  </h3>
                )}
                {dates && <span className="text-[10pt] text-gray-800 whitespace-nowrap ml-auto">{dates}</span>}
              </div>
            )}
            {meta && <p className="text-[10pt] font-semibold text-gray-800">{meta}</p>}
            {e.description && (
              <div className="resume-html text-[10pt] text-gray-800 mt-0.5" dangerouslySetInnerHTML={{ __html: e.description }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function renderBody(section: ResumeSection) {
  const c = section.content ?? {};
  switch (section.type) {
    case 'richText':
      return c.html ? <div className="resume-html text-[10pt] text-gray-800" dangerouslySetInnerHTML={{ __html: c.html }} /> : null;
    case 'bulletList': {
      const items = (c.items ?? []).filter(Boolean);
      if (!items.length) return null;
      return (
        <ul className="list-disc pl-5 text-[10pt] text-gray-800 m-0">
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    }
    case 'keyValue': {
      const entries = (c.entries ?? []).filter((e) => e.key || e.value);
      if (!entries.length) return null;
      return (
        <ul className="list-disc pl-5 text-[10pt] text-gray-800 list-outside m-0">
          {entries.map((e, i) => (
            <li key={i} className="break-words">
              {e.key && <span className="font-semibold">{e.key}: </span>}
              {e.value}
            </li>
          ))}
        </ul>
      );
    }
    case 'timeline': {
      const entries = (c.entries ?? []) as TimelineEntry[];
      return entries.length ? <Timeline entries={entries} /> : null;
    }
    default:
      return null;
  }
}

export function SectionRenderer({ section }: { section: ResumeSection }) {
  const body = renderBody(section);
  if (!body) return null;
  return (
    <section className="mt-3">
      {section.title && (
        <h2 className="text-[12pt] font-bold uppercase text-black mb-1">{section.title}</h2>
      )}
      {body}
    </section>
  );
}
