'use client';

import { motion } from 'framer-motion';
import { User, Globe2, Plane, FileCheck, Zap } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from './motion';
import { aboutInfo } from '@/lib/portfolio-data';

const icons = [Globe2, Plane, FileCheck, Zap];

const summary =
  'Strategic Frontend Developer with 4.5+ years of expertise in React.js and Material UI, architecting scalable, cross-platform UI/UX solutions across fintech, healthcare-tech, and enterprise product environments. Currently expanding into Full Stack development with Node.js and Express.js to deliver end-to-end technical excellence and drive seamless product integration. Skilled in translating wireframes into reusable, high-performance components, integrating REST APIs, and deploying applications on cloud platforms such as Google Cloud Platform, Firebase, and Vercel.';

export function About() {
  return (
    <section id="about" className="section-padding bg-white">
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
          <p className="text-center text-lg leading-relaxed text-slate-text md:text-left">{summary}</p>
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
    </section>
  );
}
