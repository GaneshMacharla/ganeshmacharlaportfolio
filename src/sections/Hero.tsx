import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Download } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/BrandIcons';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

const SERVICES = ['Websites', 'Android Apps', 'AI Voice Agents', 'Automation'];

const HEADLINE: Array<{ text: string; accent?: boolean }> = [
  { text: 'I' },
  { text: 'turn' },
  { text: 'ideas' },
  { text: 'into' },
  { text: 'intelligent', accent: true },
  { text: 'digital', accent: true },
  { text: 'products.', accent: true },
];

const MARQUEE = [
  'React', 'TypeScript', 'Next.js', 'Kotlin', 'Jetpack Compose', 'FastAPI', 'Django', 'Flask',
  'Firebase', 'Supabase', 'PostgreSQL', 'Razorpay', 'LLMs', 'RAG', 'LangGraph', 'Voice AI',
  'YouTube API', 'Docker', 'Vercel',
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [serviceIdx, setServiceIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setServiceIdx((i) => (i + 1) % SERVICES.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  const stats = [
    { value: `${projects.length}`, label: 'Projects shipped' },
    { value: '4', label: 'Platforms: web, Android, voice, automation' },
    { value: '#8', label: 'State rank, TS ECET (CSE)' },
  ];

  return (
    <section id="home" className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pt-[34vh] pb-10 sm:px-6 lg:px-8 lg:pt-10">
        <div className="max-w-3xl lg:max-w-[40rem]">
          {/* availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/[0.08] px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-sm tracking-wide text-slate-400"
          >
            Hi, I&apos;m <span className="text-white">{profile.name}</span>
          </motion.p>

          {/* kinetic headline */}
          <h1 className="mt-3 font-display text-[2.6rem] leading-[1.02] font-bold tracking-tight text-white sm:text-6xl lg:text-[4.4rem]">
            {HEADLINE.map((word, i) => (
              <span key={word.text} className="inline-block overflow-hidden pr-[0.22em] align-bottom">
                <motion.span
                  initial={{ y: '110%', rotate: 6 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease }}
                  className={`inline-block ${word.accent ? 'text-gradient-anim' : ''}`}
                >
                  {word.text}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* rotating services */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 flex items-center gap-3 font-display text-xl text-slate-300 sm:text-2xl"
          >
            <span className="text-slate-500">I build</span>
            <span className="relative inline-flex h-[1.4em] min-w-[9ch] overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={SERVICES[serviceIdx]}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="absolute left-0 font-semibold whitespace-nowrap text-cyan-300"
                >
                  {SERVICES[serviceIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {profile.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-shine group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">
              <span>See my work</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/[0.08]"
            >
              Start a project
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFilename}
              className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
            <span className="mx-1 hidden h-5 w-px bg-white/15 sm:block" aria-hidden="true" />
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full p-2.5 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white">
              <GitHubIcon className="h-4.5 w-4.5" />
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full p-2.5 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white">
              <LinkedInIcon className="h-4.5 w-4.5" />
            </a>
          </motion.div>

          {/* stats */}
          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/[0.08] pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-white sm:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-[11px] leading-snug text-slate-400 sm:text-xs">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mx-auto mb-6 hidden flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase lg:flex"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </motion.a>

      {/* tech marquee */}
      <div className="relative border-y border-white/[0.06] bg-black/20 py-4 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee flex w-max gap-10 font-display text-sm font-medium tracking-wide text-slate-400">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
              {t}
              <span className="text-indigo-400/60" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
