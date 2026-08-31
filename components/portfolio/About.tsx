'use client';

import { motion } from 'framer-motion';
import { User, Globe2, Plane, FileCheck, Zap } from 'lucide-react';
import { Reveal, SectionReveal, StaggerContainer, StaggerItem } from './motion';
import { aboutInfo } from '@/lib/portfolio-data';

const icons = [Globe2, Plane, FileCheck, Zap];

const summary = [
  "Frontend Engineer with 4.9 years of experience architecting scalable, cross-platform UI/UX solutions using React.js and its ecosystem — including Next.js and TypeScript — currently expanding into Full Stack development with Node.js. I translate wireframes into reusable, high-performance components with Redux Toolkit, Tailwind CSS, and Material UI, integrating REST APIs and working across PostgreSQL, MongoDB, and Prisma on the backend.",
  "At M2P Fintech, I've resolved 100+ critical production incidents and delivered 20+ change requests across VKYC, DKYC, and OCAC modules while maintaining 100% uptime. Earlier, I built Dost AI at Solaiera.ai and led SPA transformations at Kapil Technologies and VMax, deploying on GCP, Firebase, and Vercel.",
];

export function About() {
  return (
    <SectionReveal id="about" className="section-padding bg-white">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-10 flex items-center justify-center gap-3 md:justify-start">
            <span className="flex h-10 w-10 items-center justify-center rounded-card bg-navy text-white">
              <User size={20} />
            </span>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">About Me</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4 text-center text-lg leading-relaxed text-slate-text md:text-left">
            {summary.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutInfo.map((info, i) => {
            const Icon = icons[i] ?? Globe2;
            return (
              <StaggerItem key={info.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-3 rounded-card border border-slate-100 bg-sage-light/30 p-4 shadow-card md:justify-start"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sage-dark shadow-sm">
                    <Icon size={18} />
                  </span>
                  <div className="text-center md:text-left">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-light">
                      {info.label}
                    </p>
                    <p className="text-sm font-bold text-navy">{info.value}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
