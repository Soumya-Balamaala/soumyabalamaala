'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { fetchResumes, trackResumeDownload, Resume } from '@/lib/api/resumes';

interface ResumeDialogProps {
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ResumeDialog({ trigger, open, onOpenChange }: ResumeDialogProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchResumes()
      .then(setResumes)
      .catch((err) => {
        console.error('Failed to load resumes:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = (resumeType: string, resumeId: number) => {
    trackResumeDownload({
      resumeType,
      resumeId,
      contextType: 'portfolio',
    }).catch((err) => console.error('Failed to track resume download:', err));
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
              <a
                key={r.id}
                href={r.fileUrl}
                download={`${r.resumeType}.pdf`}
                onClick={() => handleDownload(r.resumeType, r.id)}
                className="flex items-center justify-between gap-3 rounded-card border border-slate-100 bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <FileText size={18} />
                  </span>
                  <span className="text-sm font-bold text-navy">{r.label ?? r.resumeType}</span>
                </span>
                <Download size={18} className="text-sage-dark" />
              </a>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
