'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Download, FileText } from 'lucide-react';
import { ACCODE } from '@/lib/api/shared';

type Tab = 'resume' | 'letter';

interface Props {
  segment: string; // "resume" | "resume-{slug}"
  resumeNode: ReactNode;
  letterNode?: ReactNode;
}

export function ResumeDocuments({ segment, resumeNode, letterNode }: Props) {
  const [tab, setTab] = useState<Tab>('resume');
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ resume: null, letter: null });
  const hasLetter = Boolean(letterNode);

  useEffect(() => {
    const key = `resume-visit:${segment}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      /* storage unavailable: still send */
    }
    fetch(`https://console.devmarvibe.com/api/public/resume-events?accode=${ACCODE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ segment }),
      keepalive: true,
    }).catch(() => {});
  }, [segment]);

  const pdfHref = segment === 'resume' ? '/resume/download' : `/${segment}/download`;
  const letterHref = `/${segment}/cover-letter/download`;

  function onKeyDown(e: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const next: Tab = e.key === 'ArrowLeft' || e.key === 'Home' ? 'resume' : 'letter';
    setTab(next);
    refs.current[next]?.focus();
  }

  const btn = 'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors';

  return (
    <div className="mx-auto w-full max-w-[210mm] lg:max-w-[calc(420mm+1.5rem)]">
      <div className="no-print flex flex-wrap gap-2 mb-4">
        <a href={pdfHref} className={`${btn} bg-purple-700 text-white hover:bg-purple-800`}>
          <Download size={16} /> Download PDF
        </a>
        {hasLetter && (
          <a href={letterHref} className={`${btn} border border-purple-700 text-purple-800 bg-white hover:bg-purple-50`}>
            <FileText size={16} /> Download Cover Letter
          </a>
        )}
      </div>

      {hasLetter && (
        <div role="tablist" aria-label="Documents" onKeyDown={onKeyDown} className="no-print lg:hidden flex gap-1 mb-4 rounded-lg bg-gray-200 p-1">
          {(['resume', 'letter'] as const).map((t) => (
            <button
              key={t}
              ref={(el) => {
                refs.current[t] = el;
              }}
              role="tab"
              id={`tab-${t}`}
              aria-selected={tab === t}
              aria-controls={`panel-${t}`}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${tab === t ? 'bg-white text-purple-800 shadow' : 'text-gray-600'}`}
            >
              {t === 'resume' ? 'Resume' : 'Cover Letter'}
            </button>
          ))}
        </div>
      )}

      <div className={hasLetter ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch' : ''}>
        <div id="panel-resume" role={hasLetter ? 'tabpanel' : undefined} aria-labelledby={hasLetter ? 'tab-resume' : undefined} className={`min-w-0 h-full ${hasLetter && tab !== 'resume' ? 'hidden lg:block' : ''}`}>
          {resumeNode}
        </div>
        {hasLetter && (
          <div id="panel-letter" role="tabpanel" aria-labelledby="tab-letter" className={`min-w-0 h-full ${tab !== 'letter' ? 'hidden lg:block' : ''}`}>
            {letterNode}
          </div>
        )}
      </div>
    </div>
  );
}
