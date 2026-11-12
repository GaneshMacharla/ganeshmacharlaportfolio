import { motion } from 'framer-motion';
import { Award, CheckCircle2, Trophy } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { achievements } from '@/data/experience';

const CATEGORY_ICON = {
  'Academic Rank': Trophy,
  Certification: Award,
  'Engineering Milestone': CheckCircle2,
} as const;

export function Achievements() {
  return (
    <section id="achievements" className="border-b border-white/[0.06] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05"
          eyebrow="Achievements & Certifications"
          title="Verified"
          highlight="Milestones"
          subtitle="Academic rankings, specialized machine learning credentials, and end-to-end engineering outcomes."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {achievements.map((item, idx) => {
            const Icon = CATEGORY_ICON[item.category];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="surface-card flex flex-col justify-between rounded-2xl p-6"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/25 bg-indigo-500/10 text-indigo-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs text-indigo-300">
                    {item.issuerOrContext}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
