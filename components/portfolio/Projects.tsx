'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink } from 'lucide-react';
import { Reveal, SectionReveal, StaggerContainer, StaggerItem } from './motion';
import { usePortfolioProjectsStore } from '@/lib/stores/portfolioProjectsStore';

export function Projects() {
  // Falls back to bundled static data if the API is unreachable, so this
  // never actually surfaces an error state — see portfolioProjectsStore.
  const { data: projectsData, status, load } = usePortfolioProjectsStore();
  const loading = status === 'idle' || status === 'loading';

  useEffect(() => {
    load();
  }, [load]);

  return (
    <SectionReveal id="projects" className="section-padding bg-gradient-to-b from-sage-light/20 to-white">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex items-center justify-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-card bg-navy text-white">
              <FolderGit2 size={20} />
            </span>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Projects</h2>
          </div>
        </Reveal>

        {loading ? (
          <p className="text-left text-sm text-slate-light">Loading projects...</p>
        ) : projectsData.length === 0 ? (
          <p className="text-left text-sm text-slate-light">No projects listed yet.</p>
        ) : (
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.07}>
          {projectsData.map((project) => (
            <StaggerItem key={project.id} className="mx-auto h-full w-full max-w-md sm:max-w-none">
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group flex h-full flex-col rounded-card border border-slate-100 bg-white p-6 text-left shadow-card hover:shadow-card-hover"
              >
                <div className="mb-1 flex w-full items-start justify-between gap-3">
                  <h3 className="text-base font-bold leading-snug text-navy">{project.projectName}</h3>
                  {project.projectUrl ? (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open project"
                      className="mt-0.5 shrink-0 text-slate-light transition-colors group-hover:text-gold"
                    >
                      <ExternalLink size={18} />
                    </a>
                  ) : (
                    <FolderGit2 size={18} className="mt-0.5 shrink-0 text-slate-lighter" />
                  )}
                </div>

                <span className="mb-3 inline-block w-fit rounded-pill bg-sage-light/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-sage-dark">
                  {project.associatedWith}
                </span>

                {project.tagline && (
                  <p className="mb-3 text-sm font-medium italic leading-snug text-slate-text">
                    {project.tagline}
                  </p>
                )}

                <p className="mb-5 text-sm leading-relaxed text-slate-text">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap justify-start gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-pill bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-text transition-colors group-hover:bg-gold/10 group-hover:text-navy"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
        )}
      </div>
    </SectionReveal>
  );
}
