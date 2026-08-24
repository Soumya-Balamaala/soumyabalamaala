'use client';

import { useEffect } from 'react';
import { trackVisitor } from '@/lib/api/visitors';

export function VisitorTracker({ page }: { page: string }) {
  useEffect(() => {
    trackVisitor(page, window.location.href);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
