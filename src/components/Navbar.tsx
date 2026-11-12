import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { navItems, profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';

const SECTION_IDS = navItems.map((item) => item.id);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const activeSection = useActiveSection(SECTION_IDS, isHome);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);

    if (!isHome) {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? 'border-b border-white/[0.08] bg-[#07080d]/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-[#07080d]/40 backdrop-blur-md'
      }`}
    >
      <nav
        aria-label="Primary Navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="group flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-display text-sm font-bold tracking-tight text-indigo-300 transition-colors group-hover:border-indigo-400/50 group-hover:bg-indigo-500/10">
            {profile.initials}
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-white sm:text-base">
            {profile.name}
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = isHome && activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-lg border border-white/10 bg-white/[0.06]"
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFilename}
            className="hidden items-center gap-2 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-2 text-xs font-medium text-indigo-200 transition-all hover:border-indigo-400/60 hover:bg-indigo-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:border-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/[0.08] bg-[#090b12]/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) => {
                const isActive = isHome && activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`block rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white/[0.08] text-white'
                        : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className="pt-2">
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFilename}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-400/30 bg-indigo-500/15 px-4 py-2.5 text-sm font-medium text-indigo-200 transition-colors hover:bg-indigo-500/25"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
