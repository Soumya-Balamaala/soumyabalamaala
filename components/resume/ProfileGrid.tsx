import type { ReactNode } from 'react';
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

  const items: Array<{ key: string; label: string; value: ReactNode }> = [
    ...contacts.map((c) => ({
      key: c.link,
      label: c.label,
      value: (
        <a href={c.link} className="hover:underline" target={c.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
          {shown(c.text)}
        </a>
      ),
    })),
    ...visibleAttrs.map(([label, value]) => ({ key: label, label, value })),
  ];

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10pt] leading-snug text-black min-w-0">
      {items.map((it, i) => (
        <span key={it.key} className="break-words [overflow-wrap:anywhere]">
          <b>{it.label}:</b> {it.value}
          {/* Separator after every pair except the last. */}
          {i < items.length - 1 && <span aria-hidden="true" className="ml-2">|</span>}
        </span>
      ))}
    </div>
  );
}
