'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AlertTriangle } from 'lucide-react';
import { checkBackend } from '@/lib/checkBackend';

type Status = 'checking' | 'online' | 'blocked';

export function BackendGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>('checking');

  const runCheck = () => {
    setStatus('checking');
    checkBackend().then((result) => setStatus(result.reachable ? 'online' : 'blocked'));
  };

  useEffect(() => {
    runCheck();
  }, []);

  if (status === 'blocked') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-navy px-6 text-center">
        <Image
          src="/Portfolio_Logo_-1.png"
          alt="Soumya Balamaala"
          width={64}
          height={64}
          className="rounded-full"
        />
        <AlertTriangle size={28} className="text-gold" />
        <h1 className="text-xl font-bold text-white sm:text-2xl">We can&apos;t reach the server right now</h1>
        <p className="max-w-md text-sm text-white/70">
          This can happen on networks that block outside connections, such as a corporate or
          campus firewall. Please try again in a moment, or switch networks.
        </p>
        <button
          type="button"
          onClick={runCheck}
          className="mt-2 rounded-pill bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
