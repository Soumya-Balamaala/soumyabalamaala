import type { BasicInfo } from '@/lib/api/publicResume';

const clean = (v?: string) => (typeof v === 'string' ? v.trim() : '');

const shown = (url: string) => url.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');

function href(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function ProfileGrid({ info }: { info: BasicInfo }) {
  const hasPhoto = !!clean(info.photoUrl);
  const contacts: Array<{ label: string; text: string; link: string }> = [];
  const phone = clean(info.phone);
  const email = clean(info.email);
  if (phone) contacts.push({ label: 'Mobile', text: phone, link: `tel:${phone.replace(/\s+/g, '')}` });
  if (email) contacts.push({ label: 'Email', text: email, link: `mailto:${email}` });
  const linkedin = clean(info.linkedin);
  if (linkedin) contacts.push({ label: 'LinkedIn', text: linkedin, link: href(linkedin) });
  const portfolio = clean(info.portfolio);
  if (portfolio) contacts.push({ label: hasPhoto ? 'Web' : 'Portfolio', text: portfolio, link: href(portfolio) });
  const github = clean(info.github);
  if (github) contacts.push({ label: 'Github', text: github, link: href(github) });

  const attrs: Array<[string, string]> = [
    ['Location', clean(info.location)],
    ['Nationality', clean(info.nationality)],
    ['Visa Status', clean(info.visaStatus)],
    ['Notice Period', clean(info.noticePeriod)],
    ['Current CTC', clean(info.currentCtc)],
    ['Expected CTC', clean(info.expectedCtc)],
  ];
  const visibleAttrs = attrs.filter(([, v]) => v);

  if (!contacts.length && !visibleAttrs.length) return null;

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10pt] leading-snug text-black min-w-0">
      {contacts.map((c) => (
        <span key={c.link} className="break-words [overflow-wrap:anywhere]">
          <b>{c.label}:</b>{' '}
          <a href={c.link} className="hover:underline" target={c.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
            {shown(c.text)}
          </a>
        </span>
      ))}
      {visibleAttrs.map(([label, value]) => (
        <span key={label} className="break-words [overflow-wrap:anywhere]">
          <b>{label}:</b> {value}
        </span>
      ))}
    </div>
  );
}
