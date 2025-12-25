import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/content';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-text-line', {
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 40,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const highlights = [
        { icon: '🎯', title: 'Focus', desc: 'Machine Learning & AI' },
        { icon: '💻', title: 'Code', desc: 'Clean & Scalable' },
        { icon: '🚀', title: 'Drive', desc: 'Continuous Learning' },
        { icon: '🤝', title: 'Approach', desc: 'Collaborative' }
    ];

    return (
        <section id="about" className="about-section section" ref={sectionRef}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-number">01</span>
                    <h2 className="section-title heading-lg">
                        About <span className="text-gradient">Me</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="about-grid">
                    {/* Text Content */}
                    <div className="about-content">
                        <p className="about-text-line about-intro">
                            I'm a passionate developer with a deep interest in the intersection of
                            <span className="highlight"> Machine Learning</span> and
                            <span className="highlight"> Web Development</span>.
                        </p>

                        <p className="about-text-line">
                            {personalInfo.bio}
                        </p>

                        <p className="about-text-line">
                            When I'm not coding, you'll find me exploring new technologies,
                            contributing to open-source projects, or diving deep into research papers
                            about the latest advancements in AI.
                        </p>

                        <p className="about-text-line">
                            I believe in writing clean, maintainable code and creating solutions
                            that not only work but also provide exceptional user experiences.
                        </p>
                    </div>

                    {/* Highlights Grid */}
                    <motion.div
                        className="about-highlights"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {highlights.map((item, index) => (
                            <div key={index} className="highlight-card glass-card">
                                <span className="highlight-icon">{item.icon}</span>
                                <h3 className="highlight-title">{item.title}</h3>
                                <p className="highlight-desc">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    className="about-stats"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="stat-item">
                        <span className="stat-number">10+</span>
                        <span className="stat-label">Projects Completed</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">5+</span>
                        <span className="stat-label">Technologies Mastered</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">∞</span>
                        <span className="stat-label">Curiosity to Learn</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;
