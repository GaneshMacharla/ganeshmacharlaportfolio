import { useState, useEffect } from 'react';
import { navLinks, personalInfo } from '../data/content';
import './Navbar.css';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Determine active section
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
                    <span className="logo-symbol">{'<'}</span>
                    <span className="logo-name">{personalInfo.name.split(' ')[0]}</span>
                    <span className="logo-symbol">{'/>'}</span>
                </a>

                {/* Desktop Navigation */}
                <ul className="navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <a
                    href={personalInfo.resume}
                    className="navbar-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Resume
                </a>

                {/* Mobile Menu Toggle */}
                <button
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-menu-links">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className={`mobile-nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
