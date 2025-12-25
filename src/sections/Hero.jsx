import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { personalInfo } from '../data/content';
import './Hero.css';

function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title letters
            gsap.from('.hero-title .char', {
                opacity: 0,
                y: 50,
                rotateX: -90,
                stagger: 0.05,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: 1.2
            });

            // Animate role
            gsap.from('.hero-role', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 1.8
            });

            // Animate tagline
            gsap.from('.hero-tagline', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 2.1
            });

            // Animate CTA buttons
            gsap.from('.hero-cta', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 2.4
            });

            // Animate scroll indicator
            gsap.from('.scroll-indicator', {
                opacity: 0,
                y: -20,
                duration: 0.8,
                delay: 2.8
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Split name into characters for animation
    const nameChars = personalInfo.name.split('').map((char, i) => (
        <span key={i} className="char" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));

    return (
        <section id="home" className="hero-section section" ref={heroRef}>
            <div className="hero-content">
                {/* Greeting */}
                <motion.p
                    className="hero-greeting"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <span className="greeting-wave">👋</span> Hi, I'm
                </motion.p>

                {/* Name */}
                <h1 className="hero-title heading-xl" ref={titleRef}>
                    {nameChars}
                </h1>

                {/* Role */}
                <p className="hero-role">
                    <span className="role-bracket">{'<'}</span>
                    <span className="role-text text-gradient">{personalInfo.role}</span>
                    <span className="role-bracket">{'/>'}</span>
                </p>

                {/* Tagline */}
                <p className="hero-tagline">{personalInfo.tagline}</p>

                {/* CTA Buttons */}
                <div className="hero-cta">
                    <a href="#projects" className="btn btn-primary">
                        <span>View Projects</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="#contact" className="btn btn-secondary">
                        <span>Get in Touch</span>
                    </a>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator">
                    <div className="scroll-mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                    <span className="scroll-text">Scroll to explore</span>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="hero-decoration">
                <div className="decoration-line line-1"></div>
                <div className="decoration-line line-2"></div>
                <div className="decoration-circle"></div>
            </div>
        </section>
    );
}

export default Hero;
