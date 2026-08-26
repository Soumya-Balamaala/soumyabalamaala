'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Reveal, SectionReveal, StaggerContainer, StaggerItem, ScalePop } from './motion';
import { skillsData } from '@/lib/portfolio-data';

export function Skills() {
  return (
    <SectionReveal id="skills" className="section-padding bg-gradient-to-b from-white to-sage-light/20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex items-center justify-center gap-3 md:justify-start">
            <span className="flex h-10 w-10 items-center justify-center rounded-card bg-sage text-white">
              <Sparkles size={20} />
            </span>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Skills &amp; Tech Stack</h2>
          </div>
        </Reveal>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {skillsData.map((group) => (
            <StaggerItem key={group.category}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 8px 30px 0 rgba(42,57,105,0.16)' }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-card border border-slate-100 bg-white p-5 text-center shadow-card md:text-left"
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-navy">
                  {group.category}
                </h3>
                <StaggerContainer className="flex flex-wrap justify-center gap-2 md:justify-start" staggerDelay={0.06}>
                  {group.skills.map((skill) => (
                    <ScalePop key={skill}>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className="inline-flex items-center rounded-pill border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-text transition-colors hover:border-gold hover:bg-gold/10 hover:text-navy"
                      >
                        {skill}
                      </motion.span>
                    </ScalePop>
                  ))}
                </StaggerContainer>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
