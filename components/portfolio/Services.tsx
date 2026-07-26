'use client';

import { motion } from 'framer-motion';
import {
  Code, Palette, PenLine, Share2, Megaphone, Server, Search, Calculator,
  type LucideIcon, Briefcase,
} from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from './motion';
import { servicesData } from '@/lib/portfolio-data';

const iconMap: Record<string, LucideIcon> = {
  Code, Palette, PenLine, Share2, Megaphone, Server, Search, Calculator,
};

export function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-card bg-sage text-white">
              <Briefcase size={20} />
            </span>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Services</h2>
          </div>
        </Reveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.07}>
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName] ?? Code;
            return (
              <StaggerItem key={service.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group h-full rounded-card border border-slate-100 bg-white p-6 shadow-card hover:shadow-card-hover"
                >
                  <motion.span
                    whileHover={{ rotate: [-5, 0] }}
                    transition={{ duration: 0.2 }}
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-card bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-white"
                  >
                    <Icon size={24} />
                  </motion.span>
                  <h3 className="mb-2 text-sm font-bold text-navy">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-text">{service.description}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
