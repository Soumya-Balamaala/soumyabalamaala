'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Download, FileText } from 'lucide-react';
import { ACCODE } from '@/lib/api/shared';

type Tab = 'resume' | 'letter';

// A4 (210 x 297mm) minus the 10mm @page margins in globals.css.
const CONTENT_W_MM = 190;
const CONTENT_H_MM = 277;
const MAX_PAGES = 2;
// Headroom for space left at page ends when whole entries move to the next page.
const BREAK_SLACK = 0.9;
const PX_PER_MM = 96 / 25.4;

/**
 * Lays the resume out at print width and returns the zoom (<= 1) that keeps it
 * within MAX_PAGES. When shrinking, the card is widened by 1/zoom so after zoom it
 * still fills the page width; that reflow makes it shorter, so iterate to converge.
 */
function fitResumeToPages(): { zoom: number; widthMm: number } {
  const panel = document.getElementById('panel-resume');
  const card = panel?.querySelector<HTMLElement>('.resume-card');
  if (!panel || !card) return { zoom: 1, widthMm: CONTENT_W_MM };

  const limit = MAX_PAGES * CONTENT_H_MM * PX_PER_MM * BREAK_SLACK;
  const prevPanel = panel.getAttribute('style');
  const prevCard = card.getAttribute('style');
  // The panel may be hidden on mobile when the cover letter tab is active.
  panel.style.cssText = 'display:block!important';
  const measure = (widthMm: number) => {
    card.style.cssText = `width:${widthMm}mm!important;max-width:none!important;min-height:0!important;height:auto!important;padding:0!important;overflow:visible!important`;
    return card.offsetHeight;
  };

  // Visual height at a given zoom = laid-out height at the widened width * zoom.
  const fits = (z: number) => measure(CONTENT_W_MM / z) * z <= limit;
  let zoom = 1;
  if (!fits(1)) {
    // Binary search for the largest zoom that still fits.
    let lo = 0.2;
    let hi = 1;
    for (let i = 0; i < 12; i++) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) lo = mid;
      else hi = mid;
    }
    zoom = lo;
  }

  if (prevPanel === null) panel.removeAttribute('style');
  else panel.setAttribute('style', prevPanel);
  if (prevCard === null) card.removeAttribute('style');
  else card.setAttribute('style', prevCard);

  return { zoom, widthMm: CONTENT_W_MM / zoom };
}

interface Props {
  // Backend segment used to count the view: "resume" (primary), "{slug}" (country)
  // or "{slug}-{token}" (role). Must not carry the "resume-" URL prefix, or the
  // backend finds no matching resume and the view is not recorded.
  segment: string;
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

  function savePdf(which: Tab) {
    const body = document.body;
    body.dataset.printing = which;
    if (which === 'resume') {
      const { zoom, widthMm } = fitResumeToPages();
      body.style.setProperty('--resume-zoom', String(zoom));
      body.style.setProperty('--resume-width', `${widthMm}mm`);
    }
    const done = () => {
      delete body.dataset.printing;
      body.style.removeProperty('--resume-zoom');
      body.style.removeProperty('--resume-width');
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
  }

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
        <button type="button" onClick={() => savePdf('resume')} className={`${btn} bg-black text-white hover:bg-gray-800`}>
          <Download size={16} /> Download
        </button>
        {hasLetter && (
          <button type="button" onClick={() => savePdf('letter')} className={`${btn} border border-black text-black bg-white hover:bg-gray-100`}>
            <FileText size={16} /> Download Cover Letter
          </button>
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
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${tab === t ? 'bg-white text-black shadow' : 'text-gray-600'}`}
            >
              {t === 'resume' ? 'Resume' : 'Cover Letter'}
            </button>
          ))}
        </div>
      )}

      <div className={hasLetter ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch print:block' : ''}>
        <div id="panel-resume" role={hasLetter ? 'tabpanel' : undefined} aria-labelledby={hasLetter ? 'tab-resume' : undefined} className={`min-w-0 h-full print:h-auto ${hasLetter && tab !== 'resume' ? 'hidden lg:block' : ''}`}>
          {resumeNode}
        </div>
        {hasLetter && (
          <div id="panel-letter" role="tabpanel" aria-labelledby="tab-letter" className={`min-w-0 h-full print:h-auto ${tab !== 'letter' ? 'hidden lg:block' : ''}`}>
            {letterNode}
          </div>
        )}
      </div>
    </div>
  );
}
