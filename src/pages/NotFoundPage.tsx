import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found — Ganesh Macharla';
  }, []);

  return (
    <section className="flex min-h-[72vh] items-center justify-center px-4 py-20">
      <div className="surface-card max-w-lg rounded-2xl p-8 text-center sm:p-10">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/25 bg-indigo-500/10 text-indigo-300">
          <Compass className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="font-mono text-xs tracking-widest text-indigo-400 uppercase">
          404 · Route Not Found
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The URL you followed may have moved or been mistyped. Head back to the portfolio home to explore projects and get in touch.
        </p>
        <div className="mt-7 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
