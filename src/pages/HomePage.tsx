import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollFade } from '@/components/ScrollFade';
import { About } from '@/sections/About';
import { Achievements } from '@/sections/Achievements';
import { Contact } from '@/sections/Contact';
import { Experience } from '@/sections/Experience';
import { Hero } from '@/sections/Hero';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Ganesh Macharla — Websites, Apps & AI Automation';
  }, []);

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const target = document.getElementById(state.scrollTo);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 60);
      }
    }
  }, [location.state]);

  return (
    <>
      <ScrollFade variant="hero">
        <Hero />
      </ScrollFade>
      <ScrollFade>
        <About />
      </ScrollFade>
      <ScrollFade>
        <Skills />
      </ScrollFade>
      <Projects />
      <ScrollFade>
        <Experience />
      </ScrollFade>
      <ScrollFade>
        <Achievements />
      </ScrollFade>
      <ScrollFade>
        <Contact />
      </ScrollFade>
    </>
  );
}
