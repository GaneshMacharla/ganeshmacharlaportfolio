import { motion } from 'framer-motion';
import { Award, Code2, GraduationCap } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { timeline } from '@/data/experience';

const TYPE_ICON = {
  Education: GraduationCap,
  Building: Code2,
  Certification: Award,
} as const;

export function Experience() {
  return (
    <section id="experience" className="border-b border-white/[0.06] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04"
          eyebrow="Experience & Journey"
          title="Education &"
          highlight="Builder Timeline"
          subtitle="My academic foundation in computer science and AI, paired with hands-on product building and specialized ML training."
        />

        <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-white/[0.1] sm:before:left-6">
          {timeline.map((item, idx) => {
            const Icon = TYPE_ICON[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="relative pl-14 sm:pl-16"
              >
                <div className="absolute top-5 left-0 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0e111a] text-indigo-300 sm:h-12 sm:w-12">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </div>

                <div className="surface-card rounded-2xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-md border border-indigo-400/25 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[11px] text-indigo-300">
                      {item.type}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {item.organization}
                    {item.location ? (
                      <span className="text-slate-500"> · {item.location}</span>
                    ) : null}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3.5">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
