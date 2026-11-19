export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  location?: string;
  type: 'Education' | 'Building' | 'Certification';
  description: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuerOrContext: string;
  category: 'Academic Rank' | 'Certification' | 'Engineering Milestone';
  description: string;
}

export const timeline: TimelineItem[] = [
  {
    id: 'btech-jntuh',
    period: '2025 — May 2028',
    title: 'B.Tech in CSE (Artificial Intelligence & Machine Learning)',
    organization: 'JNTUH College of Engineering, Hyderabad',
    location: 'Hyderabad, Telangana',
    type: 'Education',
    description:
      'Pursuing undergraduate engineering in Computer Science with a specialization in Artificial Intelligence and Machine Learning while actively building full-stack and AI products.',
    highlights: [
      'Focusing on machine learning, deep learning, algorithms, and software systems',
      'Applying coursework directly to RAG pipelines, voice agents, and full-stack web apps',
    ],
  },
  {
    id: 'ai-product-building',
    period: '2024 — Present',
    title: 'Freelance Full-Stack & AI Automation Developer',
    organization: 'Independent',
    type: 'Building',
    description:
      'Designing and building practical software products across AI voice automation, retrieval-augmented generation, and containerized web applications.',
    highlights: [
      'Built Choranta, an AI voice employee platform using React, TypeScript, FastAPI, Supabase, and telephony APIs',
      'Built Poojari, a native Android booking app (Kotlin, Jetpack Compose, Firebase, Razorpay) with a Next.js admin panel',
      'Built a YouTube Shorts auto-publishing pipeline with multi-channel OAuth, scheduling, and quota tracking',
      'Built BookMind, a RAG PDF knowledge assistant powered by ChromaDB, embeddings, and LLMs',
      'Built LabXpert (Django, React, PostgreSQL, Docker) and a handwritten Digit Recognition app (Flask, React, ML)',
    ],
  },
  {
    id: 'coursera-ml',
    period: '2025',
    title: 'Machine Learning Specialization',
    organization: 'Coursera — DeepLearning.AI & Stanford (Andrew Ng)',
    type: 'Certification',
    description:
      'Completed foundational and applied machine learning training covering supervised learning, neural networks, backpropagation, and model optimization.',
    highlights: [
      'Implemented neural networks and digit classification pipelines from core mathematical principles',
      'Applied embeddings, classification, and model evaluation practices across personal AI projects',
    ],
  },
  {
    id: 'diploma-gpt',
    period: '2022 — May 2025',
    title: 'Diploma in Computer Science & Engineering',
    organization: 'Government Polytechnic College, Masab Tank',
    location: 'Hyderabad, Telangana',
    type: 'Education',
    description:
      'Completed foundational engineering education in computer science, programming, relational databases, and web application development.',
    highlights: [
      'Built core proficiency in Python, C++, JavaScript, SQL, and software architecture',
      'Secured 8th Rank in ECET (Computer Science stream) for lateral entry into B.Tech',
    ],
  },
];

export const achievements: AchievementItem[] = [
  {
    id: 'ecet-rank-8',
    title: '8th Rank in ECET (Computer Science & Engineering)',
    issuerOrContext: 'Engineering Common Entrance Test · Telangana',
    category: 'Academic Rank',
    description:
      'Secured 8th state rank in the Computer Science and Engineering stream among diploma candidates competing for lateral entry into B.Tech programs.',
  },
  {
    id: 'ml-specialization',
    title: 'Machine Learning Specialization',
    issuerOrContext: 'Andrew Ng · Coursera / DeepLearning.AI',
    category: 'Certification',
    description:
      'Verified completion covering supervised learning, neural networks, gradient descent, regularization, and practical model training workflows.',
  },
  {
    id: 'end-to-end-ai-products',
    title: 'End-to-End AI & Full-Stack Product Execution',
    issuerOrContext: 'Choranta · Poojari · YouTube Auto-Publisher · BookMind · LabXpert',
    category: 'Engineering Milestone',
    description:
      'Built six distinct systems spanning AI voice telephony, a native Android booking marketplace with payments, YouTube publishing automation, RAG pipelines, Dockerized web apps, and neural network inference.',
  },
];
