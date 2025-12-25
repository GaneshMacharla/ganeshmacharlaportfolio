import { useState, useEffect } from 'react';

export function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / totalHeight;
            setScrollProgress(progress);
            setScrollY(window.scrollY);

            // Calculate current section (assuming 5 sections)
            const sectionHeight = window.innerHeight;
            const section = Math.floor(window.scrollY / sectionHeight);
            setCurrentSection(Math.min(section, 4));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { scrollProgress, scrollY, currentSection };
}

export default useScrollProgress;
