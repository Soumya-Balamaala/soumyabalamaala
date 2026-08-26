'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function SubpageHeader() {
  const router = useRouter();

  return (
    <header className="border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Portfolio_Logo_-1.png"
            alt="Soumya Balamaala logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-bold text-navy">Soumya Balamaala</span>
        </Link>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-pill border-2 border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    </header>
  );
}
