'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Globe, Heart } from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Reveal } from './motion';
import { contactInfo } from '@/lib/portfolio-data';
import { APP_VERSION } from '@/config';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'My Story', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Referral Hub', href: '/referral-hub' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
  { icon: Github, href: contactInfo.github, label: 'GitHub' },
  { icon: Globe, href: contactInfo.portfolio, label: 'Portfolio' },
];

export function Footer() {
  return (
    <Reveal>
      <footer className="bg-navy-dark px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-3">
              <Image
                src="/Portfolio_Logo_-1.png"
                alt="Soumya Balamaala logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <p className="text-lg font-bold text-white/70">Soumya Balamaala</p>
            </div>
            <p className="max-w-xs text-center text-sm text-white/70 md:text-left">
              Frontend &amp; Full Stack Developer crafting scalable, user-focused web and mobile
              experiences.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Quick Links</h4>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {quickLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <li key={link.href}>
                    <NextLink
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </NextLink>
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold">Connect</h4>
            <div className="flex gap-3">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-navy"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-1 border-t border-white/10 pt-6 text-center">
          <p className="flex items-center gap-1.5 text-sm text-white/60">
            Made with <Heart size={14} className="text-gold" /> by Soumya Balamaala
          </p>
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Soumya Balamaala. All rights reserved. · v{APP_VERSION}
          </p>
        </div>
      </footer>
    </Reveal>
  );
}
