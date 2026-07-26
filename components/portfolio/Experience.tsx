'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { Reveal } from './motion';
import { timelineData } from '@/lib/portfolio-data';

export function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="section-padding bg-white">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-12 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-card bg-gold text-navy">
              <Briefcase size={20} />
            </span>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Experience &amp; Education
            </h2>
          </div>
        </Reveal>

        <div ref={ref} className="relative">
          {/* track */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100 md:left-1/2 md:-translate-x-1/2" />
          {/* animated progress */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-4 top-2 bottom-2 w-0.5 origin-top timeline-line md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-10">
            {timelineData.map((entry, i) => {
              const isWork = entry.type === 'work';
              const Icon = isWork ? Briefcase : GraduationCap;
              const accent = isWork ? 'bg-navy text-white' : 'bg-sage text-white';
              const ring = isWork ? 'ring-navy/20' : 'ring-sage/20';
              const onLeft = i % 2 === 0;

              return (
                <li key={`${entry.title}-${i}`} className="relative pl-14 md:pl-0">
                  {/* node dot */}
                  <span
                    className={`absolute left-4 top-1.5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full ${accent} ring-4 ${ring} md:left-1/2`}
                  >
                    <Icon size={16} />
                  </span>

                  <motion.div
                    initial={{ opacity: 0, x: onLeft ? -30 : 30, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className={`md:w-1/2 ${onLeft ? 'md:pr-10 md:text-left' : 'md:ml-auto md:pl-10'}`}
                  >
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-card border border-slate-100 bg-white p-5 shadow-card"
                    >
                      <span
                        className={`inline-block rounded-pill px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${isWork ? 'bg-navy/10 text-navy' : 'bg-sage/15 text-sage-dark'
                          }`}
                      >
                        {isWork ? 'Work' : 'Education'}
                      </span>
                      <h3 className="mt-2 text-base font-bold text-navy">{entry.title}</h3>
                      <p className="text-sm font-semibold text-sage-dark">{entry.organization}</p>
                      {entry.location && (
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-light md:justify-end">
                          <MapPin size={12} /> {entry.location}
                        </p>
                      )}
                      <p className="mt-1 text-xs font-medium text-slate-light">{entry.duration}</p>
                      <ul
                        className={`mt-3 space-y-1.5 text-sm text-slate-text list-disc list-inside ${onLeft ? 'md:text-left' : ''
                          }`}
                      >
                        {entry.bullets.map((b, bi) => (
                          <li key={bi} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
