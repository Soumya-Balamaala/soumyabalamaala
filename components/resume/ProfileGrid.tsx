import { Github, Globe, Linkedin, Mail, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import type { BasicInfo } from '@/lib/api/publicResume';

const clean = (v?: string) => (typeof v === 'string' ? v.trim() : '');

const shown = (url: string) => url.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');

function href(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function Item({ children }: { children: ReactNode }) {
  return <li className="flex items-start gap-2 min-w-0 break-words [overflow-wrap:anywhere] md:whitespace-nowrap">{children}</li>;
}

export function ProfileGrid({ info }: { info: BasicInfo }) {
  const contacts: Array<{ icon: ReactNode; text: string; link: string }> = [];
  const phone = clean(info.phone);
  const email = clean(info.email);
  if (phone) contacts.push({ icon: <Phone size={13} />, text: phone, link: `tel:${phone.replace(/\s+/g, '')}` });
  if (email) contacts.push({ icon: <Mail size={13} />, text: email, link: `mailto:${email}` });
  const portfolio = clean(info.portfolio);
  if (portfolio) contacts.push({ icon: <Globe size={13} />, text: portfolio, link: href(portfolio) });
  const linkedin = clean(info.linkedin);
  if (linkedin) contacts.push({ icon: <Linkedin size={13} />, text: linkedin, link: href(linkedin) });
  const github = clean(info.github);
  if (github) contacts.push({ icon: <Github size={13} />, text: github, link: href(github) });

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
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0.5 text-[10pt] text-black list-none p-0 m-0">
      {contacts.map((c) => (
        <Item key={c.link}>
          <span className="mt-[3px] text-black shrink-0">{c.icon}</span>
          <a href={c.link} className="hover:underline" target={c.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              {shown(c.text)}
          </a>
        </Item>
      ))}
      {visibleAttrs.map(([label, value]) => (
        <Item key={label}>
          <span>
            <span className="font-semibold">{label}:</span> {value}
          </span>
        </Item>
      ))}
    </ul>
  );
}
