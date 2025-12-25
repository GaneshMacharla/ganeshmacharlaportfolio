import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/content';
import './Skills.css';

function SkillBar({ skill, index, isInView }) {
    return (
        <motion.div
            className="skill-item"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="skill-header">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-bar">
                <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
}

function SkillCategory({ title, skillList, delay, isInView }) {
    return (
        <motion.div
            className="skill-category glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
        >
            <h3 className="category-title">{title}</h3>
            <div className="skill-list">
                {skillList.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} isInView={isInView} />
                ))}
            </div>
        </motion.div>
    );
}

function Skills() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const categories = [
        { title: '💻 Programming', skills: skills.programming },
        { title: '🧠 Machine Learning', skills: skills.machineLearning },
        { title: '🌐 Web Development', skills: skills.webDev },
        { title: '🛠️ Tools & Platforms', skills: skills.tools }
    ];

    return (
        <section id="skills" className="skills-section section" ref={sectionRef}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-number">02</span>
                    <h2 className="section-title heading-lg">
                        Skills & <span className="text-gradient">Expertise</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                {/* Skills Grid */}
                <div className="skills-grid">
                    {categories.map((category, index) => (
                        <SkillCategory
                            key={category.title}
                            title={category.title}
                            skillList={category.skills}
                            delay={0.2 + index * 0.15}
                            isInView={isInView}
                        />
                    ))}
                </div>

                {/* Tech Stack Visual */}
                <motion.div
                    className="tech-stack-visual"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="tech-stack-label">Always exploring new technologies</p>
                    <div className="tech-icons">
                        {['Python', 'React', 'TensorFlow', 'Node.js', 'Three.js', 'Docker'].map((tech, i) => (
                            <span key={tech} className="tech-tag" style={{ animationDelay: `${i * 0.1}s` }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Skills;
