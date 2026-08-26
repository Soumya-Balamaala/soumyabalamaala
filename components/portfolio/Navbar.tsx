'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ResumeDialog } from './ResumeDialog';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'My Story', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Recommendations', href: '#recommendations' },
  { label: 'Referral Hub', href: '/referral-hub' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileResumeOpen, setMobileResumeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-card border-b border-slate-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <a href="#hero" className="flex items-center gap-2">
          <Image
            src="/Portfolio_Logo_-1.png"
            alt="Soumya Balamaala logo"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
          <span className="hidden font-bold text-navy sm:block">Soumya Balamaala</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isRoute = link.href.startsWith('/');
            return (
              <li key={link.href}>
                {isRoute ? (
                  <Link
                    href={link.href}
                    className="group relative text-sm font-medium text-slate-text transition-colors hover:text-navy"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-200 group-hover:w-full" />
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="group relative text-sm font-medium text-slate-text transition-colors hover:text-navy"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-200 group-hover:w-full" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <ResumeDialog
          trigger={
            <button className="hidden rounded-pill bg-navy px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-navy-light hover:shadow-card md:inline-block">
              Hire Me
            </button>
          }
        />

        <button
          onClick={() => setOpen(!open)}
          className="text-navy md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-white border-t border-slate-100 md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {links.map((link) => {
                const isRoute = link.href.startsWith('/');
                return (
                  <li key={link.href}>
                    {isRoute ? (
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-center text-slate-text hover:text-navy"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-center text-slate-text hover:text-navy"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    setMobileResumeOpen(true);
                  }}
                  className="mt-2 block w-full rounded-pill bg-navy px-5 py-2 text-center font-semibold text-white"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeDialog open={mobileResumeOpen} onOpenChange={setMobileResumeOpen} />
    </motion.header>
  );
}
