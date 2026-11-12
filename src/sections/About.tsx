import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Quote, Terminal } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { profile } from '@/data/profile';

export function About() {
  return (
    <section id="about" className="border-b border-white/[0.06] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          eyebrow="About Me"
          title="Engineering Intelligent"
          highlight="Products"
          subtitle="B.Tech Computer Science (AI & ML) student focused on full-stack development, generative AI, RAG systems, and practical automation."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Narrative & Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="space-y-6 lg:col-span-5"
          >
            <p className="text-base leading-relaxed text-slate-300">
              {profile.about.intro}
            </p>
            <p className="text-base leading-relaxed text-slate-400">
              {profile.about.body}
            </p>

            {/* Personal Statement */}
            <blockquote className="surface-card rounded-2xl p-5">
              <Quote className="mb-3 h-5 w-5 text-indigo-400" aria-hidden="true" />
              <p className="font-display text-lg font-medium leading-snug text-white">
                &ldquo;{profile.about.statement}&rdquo;
              </p>
            </blockquote>

            {/* Verified Quick Metadata */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  <GraduationCap className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                  <span>Degree</span>
                </div>
                <p className="mt-1 text-sm font-medium text-white">
                  B.Tech CSE (AI &amp; ML)
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                  <span>Location</span>
                </div>
                <p className="mt-1 text-sm font-medium text-white">
                  Hyderabad, India
                </p>
              </div>
            </div>
          </motion.div>

          {/* Four Pillars */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {profile.about.pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="surface-card flex flex-col justify-between rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-400/25 bg-indigo-500/10 text-indigo-300">
                      <Terminal className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
