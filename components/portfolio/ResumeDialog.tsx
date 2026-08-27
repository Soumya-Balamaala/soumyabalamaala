'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Download, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { trackResumeDownload, Resume } from '@/lib/api/resumes';
import { getBrowserLocation } from '@/lib/geolocation';
import { trackVisitor } from '@/lib/api/visitors';
import { resolveApiUrl } from '@/lib/utils';
import { useResumeStore } from '@/lib/stores/resumeStore';

interface ResumeDialogProps {
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ResumeDialog({ trigger, open, onOpenChange }: ResumeDialogProps) {
  const { data: resumes, status, load } = useResumeStore();
  const loading = status === 'idle' || status === 'loading';
  const error = status === 'error';

  useEffect(() => {
    load();
  }, [load]);

  const handleDownload = (resume: Resume) => {
    if (!resume.resume) return;

    // Trigger the download via a temporary, programmatically-created link
    // (never rendered/exposed as a static href) so it starts immediately,
    // without waiting on the tracking calls below.
    const link = document.createElement('a');
    link.href = resolveApiUrl(resume.resume);
    if (resume.downloadFileName) link.download = resume.downloadFileName;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Record the visit right as the download starts, not before.
    trackVisitor(`resume-download-${resume.resumeType.toLowerCase()}`, window.location.href);
    getBrowserLocation().then(({ city, state, country }) => {
      trackResumeDownload({
        resumeType: resume.resumeType,
        resumeId: resume.id,
        contextType: 'portfolio',
        city,
        state,
        country,
      }).catch((err) => console.error('Failed to track resume download:', err));
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="rounded-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-navy">Download My Resume</DialogTitle>
          <DialogDescription>Choose the version that fits the role you&apos;re hiring for.</DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-3">
          {loading ? (
            <p className="py-4 text-center text-sm text-slate-light">Loading...</p>
          ) : error ? (
            <p className="py-4 text-center text-sm text-red-600">
              Couldn&apos;t load resumes right now. Please try again later.
            </p>
          ) : resumes.length === 0 ? (
            <p className="py-4 text-center text-sm text-slate-light">No resumes available right now.</p>
          ) : (
            resumes.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleDownload(r)}
                className="flex items-center justify-between gap-3 rounded-card border border-slate-100 bg-white p-4 text-left shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <FileText size={18} />
                  </span>
                  <span className="text-sm font-bold text-navy">{r.label ?? r.resumeType}</span>
                </span>
                <Download size={18} className="text-sage-dark" />
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
