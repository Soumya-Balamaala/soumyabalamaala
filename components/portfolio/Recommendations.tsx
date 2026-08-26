'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Quote, ArrowRight } from 'lucide-react';
import { Reveal, SectionReveal, StaggerContainer, StaggerItem } from './motion';
import { TestimonialCard } from './TestimonialCard';
import { fetchTestimonials, Testimonial } from '@/lib/api/testimonials';

export function Recommendations() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchTestimonials()
      .then(setTestimonials)
      .catch((error) => console.error('Failed to load testimonials:', error))
      .finally(() => setLoaded(true));
  }, []);

  // The section only mounts once testimonials finish loading, so the
  // browser's automatic hash-scroll (e.g. arriving via /#recommendations)
  // can fire before this exists in the DOM — retry it once we're mounted.
  useEffect(() => {
    if (loaded && testimonials.length > 0 && window.location.hash === '#recommendations') {
      document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loaded, testimonials.length]);

  if (!loaded || testimonials.length === 0) return null;

  const preview = testimonials.slice(0, 3);

  return (
    <SectionReveal id="recommendations" className="section-padding bg-gradient-to-b from-white to-sage-light/20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex items-center justify-center gap-3 md:justify-start">
            <span className="flex h-10 w-10 items-center justify-center rounded-card bg-gold text-navy">
              <Quote size={20} />
            </span>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Recommendations</h2>
          </div>
        </Reveal>

        <StaggerContainer className="flex flex-wrap justify-center gap-6" staggerDelay={0.08}>
          {preview.map((rec) => (
            <StaggerItem key={rec.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
              <TestimonialCard testimonial={rec} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mt-10 flex justify-center" delay={0.1}>
          <Link
            href="/peer-recommendations"
            className="inline-flex items-center gap-2 rounded-pill border-2 border-navy px-6 py-3 font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            View More <ArrowRight size={18} />
          </Link>
        </Reveal>
      </div>
    </SectionReveal>
  );
}
