'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Download, Eye, FileText, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { fetchResumes, trackResumeDownload, Resume } from '@/lib/api/resumes';
import { getBrowserLocation } from '@/lib/geolocation';
import { trackVisitor } from '@/lib/api/visitors';
import { resolveApiUrl } from '@/lib/utils';

interface ResumeDialogProps {
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ResumeDialog({ trigger, open, onOpenChange }: ResumeDialogProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    fetchResumes()
      .then(setResumes)
      .catch((err) => {
        console.error('Failed to load resumes:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleView = (resume: Resume) => {
    if (!resume.resume) return;
    trackVisitor(`resume-view-${resume.resumeType.toLowerCase()}`, window.location.href);
    window.open(resolveApiUrl(resume.resume), '_blank', 'noopener,noreferrer');
  };

  const handleDownload = async (resume: Resume) => {
    if (!resume.resume) return;

    const { city, state, country } = await getBrowserLocation();
    trackResumeDownload({
      resumeType: resume.resumeType,
      resumeId: resume.id,
      contextType: 'portfolio',
      city,
      state,
      country,
    }).catch((err) => console.error('Failed to track resume download:', err));

    trackVisitor(`resume-download-${resume.resumeType.toLowerCase()}`, window.location.href);

    // The file is served cross-origin (the backend, not this site), where the
    // <a download> attribute isn't reliably honored — fetch it as a blob and
    // save it through a same-origin blob: URL instead, so the filename we
    // set is guaranteed rather than left to the server's own suggestion.
    setDownloadingId(resume.id);
    try {
      const response = await fetch(resolveApiUrl(resume.resume));
      if (!response.ok) throw new Error(`Download failed (${response.status})`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'SoumyaB_React_4.8YOE.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Failed to download resume:', err);
    } finally {
      setDownloadingId(null);
    }
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
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 rounded-card border border-slate-100 bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <FileText size={18} />
                  </span>
                  <span className="text-sm font-bold text-navy">{r.label ?? r.resumeType}</span>
                </span>
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleView(r)}
                    aria-label={`View ${r.label ?? r.resumeType} resume`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-slate-light transition-colors hover:bg-sage-light/40 hover:text-navy"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    type="button"
                    disabled={downloadingId === r.id}
                    onClick={() => handleDownload(r)}
                    aria-label={`Download ${r.label ?? r.resumeType} resume`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sage-dark transition-colors hover:bg-sage-light/40 disabled:opacity-70"
                  >
                    {downloadingId === r.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Download size={18} />
                    )}
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
