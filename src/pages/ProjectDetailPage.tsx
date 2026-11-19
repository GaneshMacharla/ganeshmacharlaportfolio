import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Lock,
  MessageSquare,
} from 'lucide-react';
import { GitHubIcon } from '@/components/BrandIcons';
import { ProjectPreview } from '@/components/ProjectPreview';
import { projects } from '@/data/projects';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (project) {
      document.title = `${project.name} — Ganesh Macharla`;
    }
  }, [project]);

  if (!project) {
    return <NotFoundPage />;
  }

  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <button
        type="button"
        onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
        className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Back to Projects</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="inline-block rounded-md border border-indigo-400/25 bg-indigo-500/10 px-2.5 py-1 font-mono text-xs text-indigo-300">
          {project.category}
        </span>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-300">
          {project.tagline}
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>View Repository</span>
            </a>
          ) : (
            <span className="inline-flex max-w-xl items-start gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-300">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <span>{project.repoNote || 'Private Repository'}</span>
            </span>
          )}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span>Live Demo</span>
            </a>
          ) : null}

          <button
            type="button"
            onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            <span>Ask About This Project</span>
          </button>
        </div>

        {/* Visual Preview */}
        <div className="surface-card mt-8 rounded-2xl p-4 sm:p-6">
          <ProjectPreview previewType={project.previewType} name={project.name} />
        </div>

        {/* Overview & Problem/Solution */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="surface-card rounded-2xl p-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-indigo-300">
              Problem It Solves
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {project.problem}
            </p>
          </div>
          <div className="surface-card rounded-2xl p-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-indigo-300">
              Engineering Approach
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Capabilities & Architecture */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="surface-card rounded-2xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <CheckCircle2 className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              <span>Key Capabilities</span>
            </h2>
            <ul className="mt-4 space-y-2.5">
              {project.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card rounded-2xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <Layers className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              <span>System Architecture</span>
            </h2>
            <ul className="mt-4 space-y-2.5">
              {project.architecture.map((layer) => (
                <li
                  key={layer}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span>{layer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technologies */}
        <div className="surface-card mt-6 rounded-2xl p-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-slate-400">
            Technologies Used
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Pagination */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="surface-card flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:border-white/20"
            >
              <ArrowLeft className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  Previous Project
                </p>
                <p className="text-sm font-semibold text-white">{prevProject.name}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="surface-card flex items-center justify-end gap-3 rounded-xl px-4 py-3 text-right transition-colors hover:border-white/20"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  Next Project
                </p>
                <p className="text-sm font-semibold text-white">{nextProject.name}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
