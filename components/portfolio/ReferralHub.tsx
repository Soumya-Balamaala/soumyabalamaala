'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, MapPin, Send, Users, CheckCircle2, Loader2 } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from './motion';
import { referralJobsData } from '@/lib/portfolio-data';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  role: z.string().min(2, 'Please tell me the role you are interested in'),
});

type FormValues = z.infer<typeof schema>;

export function ReferralHub() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log('Referral network signup:', data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <section className="section-padding pb-0">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">Referral Hub</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-text">
              Browse roles I can refer you for, or join my network so I can refer you when a fit comes up.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section 1: Open Referral Jobs */}
      <section id="open-jobs" className="section-padding">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-8 flex items-center justify-center gap-3 md:justify-start">
              <span className="flex h-10 w-10 items-center justify-center rounded-card bg-navy text-white">
                <Briefcase size={20} />
              </span>
              <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Open Referral Jobs</h2>
            </div>
          </Reveal>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.07}>
            {referralJobsData.map((job) => (
              <StaggerItem key={job.id} className="mx-auto w-full max-w-md sm:max-w-none">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full flex-col rounded-card border border-slate-100 bg-white p-6 text-center shadow-card md:text-left"
                >
                  <span className="mx-auto mb-3 inline-block w-fit rounded-pill bg-sage-light/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-sage-dark md:mx-0">
                    {job.type}
                  </span>
                  <h3 className="text-sm font-bold text-navy">{job.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-text">{job.company}</p>
                  <p className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-light md:justify-start">
                    <MapPin size={12} /> {job.location}
                  </p>
                  <Link
                    href={`/referral-hub/jobs/${job.id}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-pill border-2 border-navy px-4 py-2 text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    Apply
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 2: Join My Referral Network */}
      <section id="join-network" className="section-padding bg-gradient-to-b from-white to-sage-light/20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-8 flex items-center justify-center gap-3 md:justify-start">
              <span className="flex h-10 w-10 items-center justify-center rounded-card bg-gold text-navy">
                <Users size={20} />
              </span>
              <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Join My Referral Network</h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-card border border-slate-100 bg-white p-6 shadow-card md:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-light/50 text-sage-dark"
                    >
                      <CheckCircle2 size={32} />
                    </motion.span>
                    <h3 className="text-lg font-bold text-navy">You&apos;re on the list!</h3>
                    <p className="mt-1 text-sm text-slate-text">
                      I&apos;ll reach out when a role that fits comes up.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-pill border-2 border-navy px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                  >
                    <p className="text-center text-sm leading-relaxed text-slate-text md:text-left">
                      Share your details and I&apos;ll refer you to my network when a matching opportunity opens up.
                    </p>
                    <StaggerContainer className="space-y-4" staggerDelay={0.06}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <StaggerItem>
                          <Field label="Name" error={errors.name?.message}>
                            <input {...register('name')} className="form-input" />
                          </Field>
                        </StaggerItem>
                        <StaggerItem>
                          <Field label="Email" error={errors.email?.message}>
                            <input {...register('email')} type="email" className="form-input" />
                          </Field>
                        </StaggerItem>
                      </div>
                      <StaggerItem>
                        <Field label="Role You're Interested In" error={errors.role?.message}>
                          <input {...register('role')} className="form-input" />
                        </Field>
                      </StaggerItem>
                    </StaggerContainer>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-navy px-6 py-3 font-semibold text-white shadow-card transition-colors hover:bg-navy-light disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Join Network
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-center md:text-left">
      <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
