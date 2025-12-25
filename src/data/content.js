// Portfolio Content Data
export const personalInfo = {
    name: "Ganesh Macharla",
    role: "ML Engineer | Creative Developer",
    tagline: "Building intelligent systems with code and creativity",
    bio: "A passionate Computer Science student exploring the intersection of Machine Learning and Web Development. Problem solver and Network Security enthusiast. I love turning complex problems into elegant, user-friendly solutions.",
    email: "ganeshmacharla@email.com",
    github: "https://github.com/GaneshMacharla",
    linkedin: "https://linkedin.com/in/ganeshmacharla",
    resume: "/resume.pdf"
};

export const skills = {
    programming: [
        { name: "Python", level: 90, icon: "🐍" },
        { name: "JavaScript", level: 85, icon: "⚡" },
        { name: "Java", level: 75, icon: "☕" },
        { name: "C++", level: 70, icon: "🔧" }
    ],
    machineLearning: [
        { name: "PyTorch", level: 85, icon: "🔥" },
        { name: "Scikit-learn", level: 88, icon: "📊" },
        { name: "Deep Learning", level: 80, icon: "🔮" },
        { name: "Computer Vision", level: 78, icon: "👁️" }
    ],
    webDev: [
        { name: "React", level: 88, icon: "⚛️" },
        { name: "Flask", level: 85, icon: "🌶️" },
        { name: "Node.js", level: 82, icon: "🟢" },
        { name: "HTML/CSS", level: 90, icon: "🎨" }
    ],
    tools: [
        { name: "Git", level: 90, icon: "📦" },
        { name: "Docker", level: 75, icon: "🐳" },
        { name: "VS Code", level: 95, icon: "💻" },
        { name: "Vercel", level: 85, icon: "▲" },
        { name: "Jupyter", level: 88, icon: "📓" }
    ]
};

export const projects = [
    {
        id: 1,
        title: "Digit Recognition App",
        subtitle: "Deep Learning",
        description: "An interactive handwritten digit recognition application using a PyTorch CNN model trained on MNIST dataset. Features a drawing canvas with real-time predictions and confidence scores.",
        techStack: ["React", "Flask", "PyTorch", "CNN", "HTML5 Canvas"],
        features: [
            "Interactive drawing canvas",
            "Real-time digit prediction",
            "CNN trained on MNIST dataset",
            "Confidence scores display"
        ],
        github: "https://github.com/GaneshMacharla/digitrecognition",
        demo: null,
        color: "#6366f1",
        icon: "🔢"
    },
    {
        id: 2,
        title: "LabXpert",
        subtitle: "Full-Stack AI Platform",
        description: "An innovative online platform designed to reduce lecturer workload through AI-based correction for quests and exams. Includes attendance tracking features for lab sessions.",
        techStack: ["React", "Node.js", "AI/ML", "MongoDB", "REST API"],
        features: [
            "AI-based exam correction",
            "Lab attendance tracking",
            "Quest management system",
            "Lecturer dashboard"
        ],
        github: "https://github.com/GaneshMacharla/labxpert",
        demo: null,
        color: "#8b5cf6",
        icon: "🔬"
    },
    {
        id: 3,
        title: "JNTUH Attendance Tracker",
        subtitle: "Web Application",
        description: "A student attendance tracking application deployed on Vercel, designed for JNTUH students to monitor and manage their attendance records efficiently.",
        techStack: ["Next.js", "React", "Vercel", "v0.app", "TypeScript"],
        features: [
            "Real-time attendance tracking",
            "Deployed on Vercel",
            "Student-friendly interface",
            "Automatic sync with v0.app"
        ],
        github: "https://github.com/GaneshMacharla/jntuh-student-attendance-tracker",
        demo: "https://vercel.com/ganimacharla456-8839s-projects/v0-attendance-tracker-app",
        color: "#a78bfa",
        icon: "📊"
    },
    {
        id: 4,
        title: "RAG Bot",
        subtitle: "AI Chatbot",
        description: "A Retrieval-Augmented Generation (RAG) chatbot that combines document retrieval with language model generation for intelligent, context-aware responses.",
        techStack: ["Python", "LangChain", "LLM", "Vector DB", "NLP"],
        features: [
            "Document retrieval system",
            "Context-aware responses",
            "Natural language processing",
            "Intelligent Q&A"
        ],
        github: "https://github.com/GaneshMacharla/ragbot",
        demo: null,
        color: "#f472b6",
        icon: "🤖"
    },
    {
        id: 5,
        title: "Simple Attendance",
        subtitle: "Utility App",
        description: "A streamlined attendance management system designed for simplicity and ease of use. Perfect for tracking attendance in classrooms or small organizations.",
        techStack: ["JavaScript", "HTML", "CSS", "LocalStorage"],
        features: [
            "Simple UI/UX",
            "Quick attendance marking",
            "Local data storage",
            "Export functionality"
        ],
        github: "https://github.com/GaneshMacharla/SimpleAttendance",
        demo: null,
        color: "#22c55e",
        icon: "✅"
    },
    {
        id: 6,
        title: "Tic Tac Toe",
        subtitle: "Game Development",
        description: "A classic Tic Tac Toe game implementation with a clean interface. Perfect for learning game logic and state management.",
        techStack: ["JavaScript", "HTML", "CSS", "Game Logic"],
        features: [
            "Two-player mode",
            "Win detection",
            "Clean UI",
            "Game reset"
        ],
        github: "https://github.com/GaneshMacharla/tictactoe",
        demo: null,
        color: "#eab308",
        icon: "🎮"
    }
];

export const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
];
