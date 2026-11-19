import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { CursorGlow } from '@/components/CursorGlow';
import { Footer } from '@/components/Footer';
import { IntroOverlay } from '@/components/IntroOverlay';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';

const ParticleScene = lazy(() =>
  import('@/components/ParticleScene').then((m) => ({ default: m.ParticleScene })),
);

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-[#07080d] text-[#f4f6fb]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-indigo-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to main content
          </a>

          <IntroOverlay />
          <Suspense fallback={null}>
            <ParticleScene />
          </Suspense>
          <CursorGlow />

          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />

            <main id="main-content" className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
