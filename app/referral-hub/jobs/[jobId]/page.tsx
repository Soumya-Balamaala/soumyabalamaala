import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { SubpageHeader } from '@/components/portfolio/SubpageHeader';
import { Footer } from '@/components/portfolio/Footer';
import { Reveal } from '@/components/portfolio/motion';
import { JobApplicationForm } from '@/components/portfolio/JobApplicationForm';
import { referralJobsData } from '@/lib/portfolio-data';

interface PageProps {
  params: Promise<{ jobId: string }>;
}

export function generateStaticParams() {
  return referralJobsData.map((job) => ({ jobId: job.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { jobId } = await params;
  const job = referralJobsData.find((j) => j.id === jobId);
  if (!job) return { title: 'Job Not Found — Soumya Balamaala' };
  return {
    title: `${job.title} — Referral Hub — Soumya Balamaala`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { jobId } = await params;
  const job = referralJobsData.find((j) => j.id === jobId);
  if (!job) notFound();

  return (
    <main className="min-h-screen bg-white">
      <SubpageHeader />

      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-card border border-slate-100 bg-white p-6 text-center shadow-card md:p-8 md:text-left">
              <span className="mx-auto mb-3 inline-block w-fit rounded-pill bg-sage-light/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-sage-dark md:mx-0">
                {job.type}
              </span>
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-navy text-white">
                  <Briefcase size={20} />
                </span>
                <h1 className="text-2xl font-extrabold text-navy sm:text-3xl">{job.title}</h1>
              </div>
              <p className="mt-2 text-base font-semibold text-slate-text">{job.company}</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-sm text-slate-light md:justify-start">
                <MapPin size={14} /> {job.location}
              </p>

              <p className="mt-6 text-sm leading-relaxed text-slate-text">{job.description}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Responsibilities</h2>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-text">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start justify-center gap-2 md:justify-start">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-sage-dark" />
                        <span className="text-left">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Requirements</h2>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-text">
                    {job.requirements.map((item, i) => (
                      <li key={i} className="flex items-start justify-center gap-2 md:justify-start">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-gold-dark" />
                        <span className="text-left">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <h2 className="mb-4 text-center text-xl font-extrabold text-navy md:text-left">
              Apply for this role
            </h2>
            <JobApplicationForm jobTitle={job.title} />
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
