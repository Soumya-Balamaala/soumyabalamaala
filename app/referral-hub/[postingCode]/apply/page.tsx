import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Briefcase, MapPin, CheckCircle2, Linkedin } from 'lucide-react';
import { SubpageHeader } from '@/components/portfolio/SubpageHeader';
import { Footer } from '@/components/portfolio/Footer';
import { Reveal } from '@/components/portfolio/motion';
import { JobApplicationForm } from '@/components/portfolio/JobApplicationForm';
import { VisitorTracker } from '@/components/portfolio/VisitorTracker';
import { fetchJobPostings } from '@/lib/api/jobPostings';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ postingCode: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postingCode } = await params;
  const jobs = await fetchJobPostings();
  const job = jobs.find((j) => j.postingCode === postingCode);
  if (!job) return { title: 'Job Not Found — Soumya Balamaala' };
  return buildMetadata({
    title: `${job.title} — Referral Hub — Soumya Balamaala`,
    description: job.description || `${job.title} at ${job.company} — referred by Soumya Balamaala.`,
    path: `/referral-hub/${job.postingCode}/apply`,
    ...(job.companyLogoUrl ? { image: job.companyLogoUrl } : {}),
  });
}

export default async function JobDetailPage({ params }: PageProps) {
  const { postingCode } = await params;
  const jobs = await fetchJobPostings();
  const job = jobs.find((j) => j.postingCode === postingCode);
  if (!job) notFound();

  return (
    <main className="min-h-screen bg-white">
      <VisitorTracker page="job-apply" />
      <SubpageHeader />

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div className="rounded-card border border-slate-100 bg-white p-6 text-left shadow-card md:p-8">
                {job.type && (
                  <span className="mb-3 inline-block w-fit rounded-pill bg-sage-light/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-sage-dark">
                    {job.type}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  {job.companyLogoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={job.companyLogoUrl}
                      alt={job.company}
                      loading="lazy"
                      className="h-10 w-10 shrink-0 rounded-card object-contain"
                    />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-navy text-white">
                      <Briefcase size={20} />
                    </span>
                  )}
                  <h1 className="text-2xl font-extrabold text-navy sm:text-3xl">{job.title}</h1>
                </div>
                <p className="mt-2 flex items-center gap-2 text-base font-semibold text-slate-text">
                  {job.company}
                  {job.recruiterLinkedInUrl && (
                    <a
                      href={job.recruiterLinkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-light transition-colors hover:text-navy"
                      aria-label={`${job.company} on LinkedIn`}
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-light">
                  <MapPin size={14} /> {job.location}
                </p>

                {job.description && (
                  <p className="mt-4 text-sm leading-relaxed text-slate-text">{job.description}</p>
                )}

                <div className="mt-6 space-y-6">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Responsibilities</h2>
                    <ul className="mt-3 space-y-1.5 text-sm text-slate-text">
                      {job.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-sage-dark" />
                          <span className="text-left">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {job.requirements.length > 0 && (
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Requirements</h2>
                      <ul className="mt-3 space-y-1.5 text-sm text-slate-text">
                        {job.requirements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-gold-dark" />
                            <span className="text-left">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mb-4 text-left text-xl font-extrabold text-navy">
                Apply for this role
              </h2>
              <JobApplicationForm jobId={job.id} jobTitle={job.title} customFields={job.customFields} />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
