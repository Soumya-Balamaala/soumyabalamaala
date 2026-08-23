import type { Metadata } from 'next';
import Link from 'next/link';
import { Quote, PenLine } from 'lucide-react';
import { SubpageHeader } from '@/components/portfolio/SubpageHeader';
import { Footer } from '@/components/portfolio/Footer';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/portfolio/motion';
import { recommendationsData } from '@/lib/portfolio-data';

export const metadata: Metadata = {
  title: 'Recommendations — Soumya Balamaala',
  description: 'What colleagues and managers say about working with Soumya Balamaala.',
};

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <SubpageHeader />
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-end sm:text-left">
              <div>
                <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">Recommendations</h1>
                <p className="mt-3 max-w-xl text-base text-slate-text">
                  Real perspectives from the managers and teammates I&apos;ve worked alongside.
                </p>
              </div>
              <Link
                href="/recommend"
                className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-navy px-6 py-3 font-semibold text-white shadow-card transition-colors hover:bg-navy-light"
              >
                <PenLine size={18} />
                Recommend Soumya
              </Link>
            </div>
          </Reveal>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
            {recommendationsData.map((rec) => (
              <StaggerItem key={rec.name}>
                <div className="flex h-full flex-col rounded-card border border-slate-100 bg-white p-6 text-center shadow-card md:text-left">
                  <Quote size={22} className="mx-auto mb-3 text-gold md:mx-0" />
                  <p className="flex-1 text-sm leading-relaxed text-slate-text">&ldquo;{rec.text}&rdquo;</p>
                  <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-sm font-bold text-navy">
                      {rec.initials}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy">{rec.name}</p>
                      <p className="text-xs text-slate-light">
                        {rec.role} · {rec.company}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <Footer />
    </main>
  );
}
