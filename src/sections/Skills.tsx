import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { skillCategories } from '@/data/skills';

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const visibleCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <section id="skills" className="border-b border-white/[0.06] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="02"
          eyebrow="Technical Skills"
          title="Stack & Core"
          highlight="Capabilities"
          subtitle="Technologies I use across production interfaces, backend APIs, AI agents, retrieval pipelines, and cloud deployment."
        />

        {/* Category Filter */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="mb-8 flex flex-wrap gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              selectedCategory === 'all'
                ? 'border-indigo-400/50 bg-indigo-500/15 text-indigo-200'
                : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selectedCategory === cat.id
                  ? 'border-indigo-400/50 bg-indigo-500/15 text-indigo-200'
                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="surface-card rounded-2xl p-6"
            >
              <div className="mb-4">
                <h3 className="font-display text-lg font-semibold text-white">
                  {category.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {category.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-slate-200 transition-colors hover:border-indigo-400/40 hover:bg-indigo-500/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
