'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, MapPin, Linkedin, Github, Globe, Phone } from 'lucide-react';
import { contactInfo } from '@/lib/portfolio-data';
import { useTenantStore } from '@/lib/stores/tenantStore';
import { resolveApiUrl } from '@/lib/utils';
import { ResumeDialog } from './ResumeDialog';
import Image from 'next/image';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const socials = [
  { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
  { icon: Github, href: contactInfo.github, label: 'GitHub' },
  { icon: Globe, href: contactInfo.portfolio, label: 'Portfolio' },
  { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'Email' },
  { icon: Phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}`, label: 'Phone' },
];

export function Hero() {
  const { data: tenantConfig, load } = useTenantStore();

  useEffect(() => {
    load();
  }, [load]);

  const pic = tenantConfig?.settings?.professionalPic;
  const profilePic = pic ? resolveApiUrl(pic) : '/Soumya.png';

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-x-hidden bg-gradient-to-br from-white via-white to-sage-light/30 pt-24"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-sage/20 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:px-12 lg:grid-cols-2 lg:gap-8">
        <motion.div variants={container} initial="hidden" animate="visible" className="min-w-0 text-center lg:text-left">
          <motion.p
            variants={item}
            className="mb-3 inline-flex items-center gap-2 rounded-pill border border-sage/30 bg-sage-light/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sage-dark"
          >
            <MapPin size={14} /> Hyderabad, India
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold leading-tight text-navy sm:text-5xl lg:text-6xl"
          >
            Soumya Balamaala
          </motion.h1>

          <motion.h2
            variants={item}
            className="mt-3 text-lg font-bold text-sage-dark sm:text-xl"
          >
            Frontend Engineer | React.js &amp; Full Stack Development
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base leading-relaxed text-slate-text"
          >
            Strategic Frontend Engineer with 4.5+ years of expertise in React.js and Material UI,
            expanding into Full Stack development with Node.js and Express.js.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <ResumeDialog
              trigger={
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-2 rounded-pill bg-navy px-6 py-3 font-semibold text-white shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <Download size={18} /> Download Resume
                </motion.button>
              }
            />
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              href="#contact"
              className="inline-flex items-center gap-2 rounded-pill border-2 border-navy px-6 py-3 font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              <Mail size={18} /> Contact Me
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-sm transition-colors hover:border-gold hover:bg-gold/10 hover:text-navy"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="relative justify-self-center lg:block"
        >
          <div className="relative h-80 w-80 overflow-hidden rounded-full bg-gradient-to-br from-navy via-navy-light to-sage p-1 shadow-card-hover lg:h-96 lg:w-96">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
              <Image
                src={profilePic}
                alt="Soumya Balamaala — Frontend Engineer"
                fill
                priority
                className={`object-cover object-top ${profilePic === '/Soumya.png' ? 'scale-125' : ''}`}
              />
            </div>
          </div>
          <div className="absolute -right-4 top-12 rounded-card bg-gold px-4 py-2 text-xs font-bold text-navy shadow-gold">
            4.5+ yrs
          </div>
          <div className="absolute -left-4 bottom-16 rounded-card bg-sage px-4 py-2 text-xs font-bold text-white shadow-card">
            React.js Expert
          </div>
        </motion.div>
      </div>
    </section>
  );
}
