export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    subtitle: 'Core languages for systems, scripting, and full-stack delivery',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C++'],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'Responsive, accessible interfaces with modern tooling',
    skills: ['React.js', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    subtitle: 'API design, authentication, business logic, and services',
    skills: ['FastAPI', 'Django', 'REST APIs', 'Node.js'],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    subtitle: 'Applied ML, retrieval pipelines, LLM orchestration, and agents',
    skills: [
      'Machine Learning',
      'Generative AI',
      'RAG',
      'LangChain',
      'LangGraph',
      'LLM Integration',
      'AI Agents',
    ],
  },
  {
    id: 'infra',
    title: 'Databases & Infrastructure',
    subtitle: 'Relational stores, vector databases, containers, and deployment',
    skills: [
      'PostgreSQL',
      'Supabase',
      'ChromaDB',
      'Git',
      'GitHub',
      'Docker',
      'Vercel',
    ],
  },
];
