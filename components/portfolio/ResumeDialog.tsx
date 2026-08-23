'use client';

import type { ReactNode } from 'react';
import { Download, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

const resumeOptions = [
  { label: 'Indian Resume', file: '/SoumyaB_4.8YOE.pdf', filename: 'SoumyaB_4.8YOE.pdf' },
  { label: 'UAE Resume', file: '/SoumyaB_UAE_4.8YOE.pdf', filename: 'SoumyaB_UAE_4.8YOE.pdf' },
];

interface ResumeDialogProps {
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ResumeDialog({ trigger, open, onOpenChange }: ResumeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="rounded-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-navy">Download My Resume</DialogTitle>
          <DialogDescription>Choose the version that fits the role you&apos;re hiring for.</DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-3">
          {resumeOptions.map((r) => (
            <a
              key={r.file}
              href={r.file}
              download={r.filename}
              className="flex items-center justify-between gap-3 rounded-card border border-slate-100 bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-navy">
                  <FileText size={18} />
                </span>
                <span className="text-sm font-bold text-navy">{r.label}</span>
              </span>
              <Download size={18} className="text-sage-dark" />
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
