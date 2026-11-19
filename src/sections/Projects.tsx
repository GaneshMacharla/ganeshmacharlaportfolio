import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Lock } from 'lucide-react';
import { GitHubIcon } from '@/components/BrandIcons';
import { ProjectPreview } from '@/components/ProjectPreview';
import { SectionHeader } from '@/components/SectionHeader';
import { projects } from '@/data/projects';

export function Projects() {
  return (
    <section id="projects" className="border-b border-white/[0.06] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          eyebrow="Featured Projects"
          title="Selected Systems &"
          highlight="Products"
          subtitle="Real products spanning AI voice agents, an Android booking app, content publishing automation, RAG assistants, and full-stack web platforms."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="surface-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                {/* Preview */}
                <ProjectPreview previewType={project.previewType} name={project.name} />

                {/* Category & Title */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="rounded-md border border-indigo-400/25 bg-indigo-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-indigo-300">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">
                  {project.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {project.description}
                </p>

                {/* Problem Solved */}
                <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    Problem Solved
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {project.problem}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                  ) : (
                    <span
                      title={project.repoNote}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs text-slate-400"
                    >
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Private Repo</span>
                    </span>
                  )}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Live Demo</span>
                    </a>
                  ) : null}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/15 px-3.5 py-1.5 text-xs font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
