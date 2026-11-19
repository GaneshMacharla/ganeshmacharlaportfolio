export interface Project {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  capabilities: string[];
  architecture: string[];
  technologies: string[];
  githubUrl: string | null;
  repoNote?: string;
  /** closed-source, revenue-generating product */
  commercial?: boolean;
  liveUrl: string | null;
  previewType: 'choranta' | 'poojari' | 'publisher' | 'website' | 'bookmind' | 'labxpert' | 'digit';
  accentClass: string;
}

export const projects: Project[] = [
  {
    slug: 'choranta',
    name: 'Choranta',
    category: 'AI Voice Agent Platform',
    tagline: 'AI voice agent platform that answers and makes business calls automatically',
    description:
      'An AI voice agent platform for businesses to configure, test, deploy, and monitor voice agents that handle inbound and outbound calls.',
    problem:
      'Businesses lose customer inquiries and spend hours handling repetitive calls such as appointment bookings, lead qualification, and routine support.',
    solution:
      'Built an end-to-end voice agent platform combining a React + TypeScript operations console, FastAPI backend, Supabase PostgreSQL persistence, knowledge-base grounding, and telephony carrier integration.',
    capabilities: [
      'AI voice agent creation with versioned configurations and lifecycle management',
      'Automated inbound and outbound calling with busy-caller callback support',
      'Knowledge-base integration for grounded, business-specific responses',
      'Natural multilingual/Hinglish conversational flows via AI speech & LLM APIs',
      'Call logging, usage tracking, and operational monitoring console',
    ],
    architecture: [
      'React + TypeScript + Tailwind operations console and landing interface',
      'FastAPI layered service architecture (API, Services, Repositories, SQLAlchemy)',
      'JWT-authenticated role-based operator access and Supabase PostgreSQL schema',
      'Telephony & AI voice API integration for real-time call orchestration',
    ],
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'Supabase',
      'AI APIs',
      'Telephony APIs',
    ],
    githubUrl: null,
    repoNote:
      'Source code is private because Choranta is a commercial, revenue-generating AI voice agent platform. A live demo and architecture walkthrough are available on request.',
    commercial: true,
    liveUrl: null,
    previewType: 'choranta',
    accentClass: 'from-emerald-400/20 via-teal-500/10 to-transparent',
  },
  {
    slug: 'poojari',
    name: 'Poojari',
    category: 'Android App / Marketplace',
    tagline: 'Android app for booking verified Pujaris for ceremonies, with online Dakshina payments',
    description:
      'A two-sided Android marketplace that connects devotees with verified Pujaris for Griha Pravesh, Satyanarayana Puja, Homams, and other ceremonies, with Pujaris setting their own prices.',
    problem:
      'Families find Pujaris by word of mouth, with no clear pricing, availability, or way to confirm and pay for a booking in advance.',
    solution:
      'Built a native Kotlin + Jetpack Compose app with separate Devotee and Pujari flows, Firebase Auth/Firestore/Storage, Razorpay checkout through Cloud Functions, push notifications, and a Next.js admin panel for Pujari verification.',
    capabilities: [
      'Mobile OTP login with Devotee and Pujari roles',
      'Puja → location → date and time-of-day booking flow with available-Pujari listing',
      'Pujari-set pricing, availability calendar, bookings, and earnings dashboard',
      'Razorpay Dakshina checkout with server-side order creation',
      'Push notifications for booking updates and a Telugu/English interface',
      'Service-area gating, Pujari verification workflow, and samagri checklist',
    ],
    architecture: [
      'Kotlin + Jetpack Compose Android app with a repository layer and Room cache',
      'Firebase Auth, Firestore, Storage, and Cloud Messaging',
      'Cloud Functions for Razorpay order creation and booking lifecycle triggers',
      'Next.js admin panel for verifying Pujaris and tracking bookings',
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Cloud Functions', 'Razorpay', 'Next.js'],
    githubUrl: null,
    repoNote:
      'Source code is private because Poojari is a commercial, revenue-generating product. An app demo is available on request.',
    commercial: true,
    liveUrl: null,
    previewType: 'poojari',
    accentClass: 'from-orange-400/20 via-amber-500/10 to-transparent',
  },
  {
    slug: 'youtube-auto-publisher',
    name: 'YouTube Auto-Publisher',
    category: 'Automation',
    tagline: 'Hands-free YouTube Shorts publishing pipeline for multiple channels',
    description:
      'An automation dashboard that takes a folder of rendered short videos, reads each caption file, and publishes them to one or more YouTube channels on a schedule through the YouTube Data API.',
    problem:
      'Posting short videos daily across channels means repetitive manual uploads, copy-pasting titles and descriptions, and keeping track of what went live.',
    solution:
      'Built a Flask service with a web dashboard that scans a video folder, parses captions into titles and descriptions, schedules posts, and uploads them with resumable uploads, tracking API quota and retrying failures.',
    capabilities: [
      'Multi-channel Google OAuth: connect any number of YouTube channels once',
      'Folder scan that pairs each video with its caption file automatically',
      'Scheduling by start date, time of day, and number of posts',
      'Resumable uploads via YouTube Data API v3 with a background scheduler',
      'Daily quota estimation, publish log, retry, and publish-all controls',
    ],
    architecture: [
      'Python Flask REST API with a 60-second background scheduler',
      'YouTube Data API v3 with OAuth 2.0 refresh tokens per channel',
      'Caption parser that derives titles and descriptions from text files',
      'Vanilla JS dashboard for scheduling, logs, and quota',
    ],
    technologies: ['Python', 'Flask', 'YouTube Data API', 'OAuth 2.0', 'JavaScript'],
    githubUrl: 'https://github.com/GaneshMacharla/igytscheduler',
    liveUrl: null,
    previewType: 'publisher',
    accentClass: 'from-rose-400/20 via-red-500/10 to-transparent',
  },
  {
    slug: 'power-fitness-gym',
    name: 'Power Fitness Gym',
    category: 'Business Website',
    tagline: 'Lead-generating website for a gym in Medchal, Hyderabad',
    description:
      'A fast, mobile-first website for Power Fitness Gym in Medchal that turns local visitors into enquiries through WhatsApp, with programs, gallery, offers and location in one page.',
    problem:
      'A local gym needed an online presence that works on phones, shows its facilities and offers, and makes it effortless for new members to get in touch.',
    solution:
      'Designed and built a responsive landing page with scroll animations, a WhatsApp-first enquiry flow, Google Maps integration and on-page SEO, deployed on Vercel with no build step.',
    capabilities: [
      'Mobile-first responsive design with a dark theme and orange brand accent',
      'Floating WhatsApp button and a contact form that opens a pre-filled WhatsApp chat',
      'Scroll-triggered animations and animated counters',
      'Embedded Google Maps location and on-page SEO for local search',
    ],
    architecture: [
      'Static HTML, CSS and vanilla JavaScript for instant loading',
      'Deployed on Vercel with optimized images and video',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO', 'Vercel'],
    githubUrl: 'https://github.com/GaneshMacharla/powerfitnessgym',
    liveUrl: 'https://powerfitnessgym-psi.vercel.app',
    previewType: 'website',
    accentClass: 'from-orange-400/20 via-red-500/10 to-transparent',
  },
  {
    slug: 'bookmind',
    name: 'BookMind',
    category: 'Generative AI / RAG',
    tagline: 'AI-powered PDF knowledge assistant with semantic retrieval and reranking',
    description:
      'A Retrieval-Augmented Generation (RAG) PDF knowledge assistant that ingests documents, builds persistent vector indexes, and delivers context-aware answers to natural language questions.',
    problem:
      'Searching through dense technical books and long PDFs manually is slow, and standard keyword search misses conceptual context.',
    solution:
      'Implemented a complete document pipeline that extracts PDF text, applies overlapping chunking, embeds chunks into ChromaDB, rewrites conversational queries, reranks results with a cross-encoder, and synthesizes grounded answers.',
    capabilities: [
      'PDF document parsing and page-aware text extraction',
      'Fixed-size overlapping text chunking for context preservation',
      'Dense vector embeddings stored in persistent ChromaDB collections',
      'Semantic similarity search paired with CrossEncoder reranking',
      'Context-aware question answering with conversational history rewriting',
    ],
    architecture: [
      'PyPDF ingestion and normalized sliding-window chunker',
      'SentenceTransformer embeddings persisted in ChromaDB vector collections',
      'Cross-encoder reranking stage for higher retrieval precision',
      'LLM inference layer via Groq with FastAPI and Streamlit interfaces',
    ],
    technologies: ['Python', 'Streamlit', 'ChromaDB', 'Embeddings', 'RAG', 'LLMs'],
    githubUrl: null,
    repoNote: 'Private / local build — walkthrough available on request',
    liveUrl: null,
    previewType: 'bookmind',
    accentClass: 'from-indigo-400/20 via-blue-500/10 to-transparent',
  },
  {
    slug: 'labxpert',
    name: 'LabXpert',
    category: 'Full-Stack Development',
    tagline: 'Full-stack laboratory management platform automating academic lab workflows',
    description:
      'A laboratory management platform built to digitize and streamline college lab sessions—handling quests, quizzes, time-windowed scheduling, and location-verified attendance.',
    problem:
      'Managing daily lab tasks, quizzes, submissions, and physical lab attendance manually creates heavy administrative overhead for lecturers and students.',
    solution:
      'Developed a containerized full-stack platform with Django and React backed by PostgreSQL, enabling configurable lab tasks, automated workflows, and campus location-based authentication.',
    capabilities: [
      'Automated lab workflow management for lecturers and students',
      'Daily quests, quizzes, and lab task scheduling with start/end windows',
      'Location-based authentication restricting lab access to authorized campus zones',
      'Containerized environment with Docker for reproducible deployment',
    ],
    architecture: [
      'React frontend for student submissions and lecturer management dashboards',
      'Django backend exposing structured REST workflows and validation',
      'PostgreSQL relational schema containerized with Docker',
    ],
    technologies: ['Django', 'React', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/GaneshMacharla/labxpert',
    liveUrl: null,
    previewType: 'labxpert',
    accentClass: 'from-violet-400/20 via-purple-500/10 to-transparent',
  },
  {
    slug: 'digit-recognition',
    name: 'Digit Recognition',
    category: 'Machine Learning',
    tagline: 'Interactive handwritten digit classifier powered by a trained neural network',
    description:
      'A handwritten digit recognition web application featuring an interactive drawing canvas paired with a Python/Flask inference backend that classifies digits and outputs prediction confidence.',
    problem:
      'Demonstrating and testing image classification models interactively requires bridging raw canvas pixel input with preprocessing and real-time model inference.',
    solution:
      'Built a React drawing interface connected to a Flask API that normalizes 28×28 grayscale inputs and runs inference through a trained neural network model with input validation and confidence scores.',
    capabilities: [
      'Interactive HTML5 drawing canvas for sketching handwritten digits',
      '28×28 pixel resizing and normalization preprocessing pipeline',
      'Real-time digit classification with per-class confidence feedback',
      'Input validation and clear error handling between client and Flask API',
    ],
    architecture: [
      'React UI with interactive canvas capture and confidence visualization',
      'Flask REST endpoint handling image decoding and tensor normalization',
      'Trained neural network / PyTorch CNN inference model on MNIST digits',
    ],
    technologies: ['Python', 'Flask', 'React', 'Machine Learning'],
    githubUrl: 'https://github.com/GaneshMacharla/digitrecognition',
    liveUrl: null,
    previewType: 'digit',
    accentClass: 'from-sky-400/20 via-cyan-500/10 to-transparent',
  },
];
