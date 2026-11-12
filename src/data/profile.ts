export interface SocialLink {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  href: string;
  handle: string;
}

export interface AboutPillar {
  title: string;
  description: string;
}

export const profile = {
  name: 'Ganesh Macharla',
  shortName: 'Ganesh',
  initials: 'GM',
  role: 'Full-Stack Developer | AI Engineer | AI Automation Specialist',
  headline: 'I Turn Ideas Into Intelligent Digital Products.',
  description:
    'I build scalable web applications, AI-powered solutions, intelligent voice agents, and automation workflows that solve real-world problems.',
  availability: 'Open to Software & AI Engineering Internships · Freelance',
  location: 'Hyderabad, Telangana, India',
  email: 'ganeshmacharla2020@gmail.com',
  resumeUrl: '/resume.pdf',
  resumeFilename: 'Ganesh_Macharla_Resume.pdf',
  githubUrl: 'https://github.com/GaneshMacharla',
  linkedinUrl: 'https://linkedin.com/in/ganesh-macharla',
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/GaneshMacharla',
      handle: '@GaneshMacharla',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/ganesh-macharla',
      handle: 'in/ganesh-macharla',
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:ganeshmacharla2020@gmail.com',
      handle: 'ganeshmacharla2020@gmail.com',
    },
  ] satisfies SocialLink[],
  about: {
    intro:
      "I'm a B.Tech Computer Science student specializing in Artificial Intelligence & Machine Learning at JNTUH College of Engineering, Hyderabad. My work sits at the intersection of full-stack software engineering, applied AI, and workflow automation.",
    body:
      'From designing real-time AI voice agent consoles and retrieval-augmented document assistants to shipping Dockerized web platforms, I enjoy taking messy real-world bottlenecks and turning them into reliable, thoughtfully engineered software.',
    statement:
      "I don't just learn technologies. I use them to build products, experiment with ideas, and solve practical problems.",
    pillars: [
      {
        title: 'Full-Stack Product Engineering',
        description:
          'Architecting responsive React + TypeScript interfaces backed by clean FastAPI, Django, or Node.js APIs and PostgreSQL data layers.',
      },
      {
        title: 'Generative AI & RAG Systems',
        description:
          'Building document ingestion, chunking, vector retrieval, reranking, and grounded LLM pipelines with ChromaDB, LangChain, and LangGraph.',
      },
      {
        title: 'AI Agents & Voice Automation',
        description:
          'Developing conversational voice employees and multi-step agent workflows that connect LLMs to telephony, knowledge bases, and external tools.',
      },
      {
        title: 'Practical Builder Mindset',
        description:
          'Focused on shipping working, maintainable software—prioritizing system reliability, clean interfaces, and solving concrete user problems.',
      },
    ] satisfies AboutPillar[],
  },
} as const;

export const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
] as const;
