'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, MapPin, UserPlus } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from './motion';
import { useJobPostingsStore } from '@/lib/stores/jobPostingsStore';
import { ReferralUploadForm } from './ReferralUploadForm';

export function ReferralHub() {
  const { data: jobs, status, load } = useJobPostingsStore();
  const jobsLoading = status === 'idle' || status === 'loading';
  const jobsError = status === 'error';

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-sage-light/20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">Referral Hub</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-text">
              Browse roles I can refer you for, or submit your resume directly.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div id="open-jobs">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-card bg-navy text-white">
                  <Briefcase size={20} />
                </span>
                <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Open Referral Jobs</h2>
              </div>
            </Reveal>

            {jobsLoading ? (
              <p className="text-left text-sm text-slate-light">Loading open roles...</p>
            ) : jobsError ? (
              <p className="text-left text-sm text-red-600">
                Couldn&apos;t load open roles right now. Please try again later.
              </p>
            ) : jobs.length === 0 ? (
              <p className="text-left text-sm text-slate-light">
                No open referral roles right now — check back soon.
              </p>
            ) : (
              <StaggerContainer className="grid gap-6" staggerDelay={0.07}>
                {jobs.map((job) => (
                  <StaggerItem key={job.id} className="mx-auto w-full max-w-md sm:max-w-none">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-full flex-col rounded-card border border-slate-100 bg-white p-6 text-left shadow-card"
                    >
                      {job.type && (
                        <span className="mb-3 inline-block w-fit rounded-pill bg-sage-light/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-sage-dark">
                          {job.type}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-navy">{job.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-text">{job.company}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-light">
                        <MapPin size={12} /> {job.location}
                      </p>
                      <Link
                        href={`/referral-hub/${job.postingCode}/apply`}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-pill border-2 border-navy px-4 py-2 text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                      >
                        Apply
                      </Link>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>

          <div id="referral-upload">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-card bg-gold text-navy">
                  <UserPlus size={20} />
                </span>
                <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Submit Your Resume</h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ReferralUploadForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
