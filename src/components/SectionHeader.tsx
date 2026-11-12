import { motion } from 'framer-motion';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  highlight,
  subtitle,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-14"
    >
      <div className="mb-3 flex items-center gap-3 font-mono text-xs tracking-widest text-indigo-400 uppercase">
        <span>{index}</span>
        <span className="h-px w-8 bg-indigo-500/40" aria-hidden="true" />
        <span className="text-slate-400">{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}{' '}
        {highlight ? (
          <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            {highlight}
          </span>
        ) : null}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
