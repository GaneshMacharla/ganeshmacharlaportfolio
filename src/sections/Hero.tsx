import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/BrandIcons';
import { HeroVisual } from '@/components/HeroVisual';
import { profile } from '@/data/profile';

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/[0.06] pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
    >
      {/* Subtle Grid + Radial Backdrop */}
      <div
        aria-hidden="true"
        className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Availability Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3.5 py-1.5 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>{profile.availability}</span>
            </div>

            <p className="font-mono text-sm font-medium text-indigo-300">
              {profile.name} · {profile.role}
            </p>

            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              {profile.headline}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {profile.description}
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white/25 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Let&apos;s Connect</span>
              </a>

              <a
                href={profile.resumeUrl}
                download={profile.resumeFilename}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:bg-white/[0.04] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-6">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                Connect
              </span>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{profile.email}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Architecture Card */}
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
