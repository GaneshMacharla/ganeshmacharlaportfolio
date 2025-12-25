import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/content';
import './Projects.css';

function ProjectCard({ project, index, isInView }) {
    return (
        <motion.div
            className="project-card glass-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            style={{ '--project-color': project.color }}
        >
            {/* Project Icon */}
            <div className="project-icon">
                <span>{project.icon}</span>
            </div>

            {/* Project Header */}
            <div className="project-header">
                <span className="project-subtitle">{project.subtitle}</span>
                <h3 className="project-title">{project.title}</h3>
            </div>

            {/* Description */}
            <p className="project-description">{project.description}</p>

            {/* Features */}
            <ul className="project-features">
                {project.features.map((feature, i) => (
                    <li key={i} className="feature-item">
                        <span className="feature-check">✓</span>
                        {feature}
                    </li>
                ))}
            </ul>

            {/* Tech Stack */}
            <div className="project-tech">
                {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                ))}
            </div>

            {/* Links */}
            <div className="project-links">
                <a
                    href={project.github}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>View Code</span>
                </a>
                {project.demo && (
                    <a
                        href={project.demo}
                        className="project-link primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        <span>Live Demo</span>
                    </a>
                )}
            </div>

            {/* Decorative Glow */}
            <div className="project-glow"></div>
        </motion.div>
    );
}

function Projects() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="projects-section section" ref={sectionRef}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-number">03</span>
                    <h2 className="section-title heading-lg">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <div className="section-line"></div>
                    <p className="section-subtitle">
                        Here are some of my favorite projects that showcase my skills in ML and Web Development
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </div>

                {/* View More */}
                <motion.div
                    className="projects-cta"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <a
                        href="https://github.com/GaneshMacharla"
                        className="btn btn-secondary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>View All Projects on GitHub</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default Projects;
