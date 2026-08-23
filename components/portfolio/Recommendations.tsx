'use client';

import Link from 'next/link';
import { Quote, ArrowRight } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from './motion';
import { recommendationsData } from '@/lib/portfolio-data';

export function Recommendations() {
  const preview = recommendationsData.slice(0, 3);

  return (
    <section id="recommendations" className="section-padding bg-gradient-to-b from-white to-sage-light/20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex items-center justify-center gap-3 md:justify-start">
            <span className="flex h-10 w-10 items-center justify-center rounded-card bg-gold text-navy">
              <Quote size={20} />
            </span>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Recommendations</h2>
          </div>
        </Reveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {preview.map((rec) => (
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

        <Reveal className="mt-10 flex justify-center" delay={0.1}>
          <Link
            href="/recommendations"
            className="inline-flex items-center gap-2 rounded-pill border-2 border-navy px-6 py-3 font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            View More <ArrowRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
