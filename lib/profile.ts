// Single source of truth for portfolio content.
// Sourced from the owner's LinkedIn profile (Nov 2026) and exported profile PDF.

export const profile = {
  name: 'Udayabhanu Aich',
  title: 'Software Engineer · AI Engineer',
  company: 'SmallDay® IT Services Pvt. Ltd.',
  location: 'Bhubaneswar, Odisha, India',
  email: 'manish.7750944@gmail.com',
  github: 'https://github.com/Manish10000',
  linkedin: 'https://www.linkedin.com/in/udayabhanuaich',
  workStart: { year: 2023, month: 10 }, // Oct 2023
}

export function yearsOfExperience() {
  const now = new Date()
  const months = (now.getFullYear() - profile.workStart.year) * 12 + (now.getMonth() + 1 - profile.workStart.month)
  return Math.max(1, Math.floor(months / 12))
}

export const aboutParagraphs = [
  'Software Developer and AI Engineer building scalable backend systems and AI-powered applications with Python, Django, FastAPI and modern LLM technologies. I enjoy working at the intersection of backend engineering and AI systems — REST APIs, performance optimisation, payment integrations such as Razorpay, and high-concurrency applications.',
  'At SmallDay IT Services I contribute to AI-driven platforms such as the CodeXPro online assessment system: LLM-powered pipelines that turn job descriptions into structured technical assessments, AI proctoring with face detection and gaze tracking, and real-time monitoring dashboards over WebSockets.',
  'Beyond work I build AI and automation projects — an AI voice assistant for phone calls (Twilio Voice + Gemini), a WhatsApp AI automation bot (Python + Ollama), a FAISS-based RAG chatbot, and RightClick AI, a RAG-powered Chrome extension and Android keyboard.',
]

export const impact = [
  { value: '2000+', label: 'Concurrent candidates', detail: 'Docker Swarm environment sized for live assessments' },
  { value: '50+', label: 'Components migrated', detail: 'Angular → React, modular architecture' },
  { value: '70%', label: 'Fewer unauthorized attempts', detail: 'Single-session login & API hardening' },
  { value: '28%', label: 'Lower bounce rate', detail: 'A/B-tested layouts & mobile-first UI' },
]

export interface Role {
  title: string
  company: string
  type: string
  period: string
  location: string
  mode: string
  highlights: string[]
  tech: string[]
}

export const role: Role = {
  title: 'Software Engineer',
  company: 'SmallDay® IT Services Pvt. Ltd.',
  type: 'Full-time',
  period: 'Oct 2023 – Present',
  location: 'Bhubaneswar, Odisha, India',
  mode: 'On-site',
  highlights: [
    'Spearheaded CodexPro’s frontend — fast-loading, SEO-friendly Next.js landing pages and dynamic assessment interfaces — enabling onboarding of 5 new enterprise clients.',
    'Reduced bounce rate by 28% and lifted engagement through A/B-tested layouts, consistent UI components and mobile-first design.',
    'Engineered and deployed a secure, scalable Docker Swarm environment hosting Next.js, Django, Redis and supporting services, designed for 2000+ concurrent candidates.',
    'Built interactive real-time features with WebSockets (Django Channels + React): live proctoring, timer synchronisation and precise event tracking for test administrators.',
    'Implemented single-session login and API hardening — 70% fewer unauthorized access attempts and a 30% increase in assessment integrity scores.',
    'Built and reused 20+ React components (Hooks & HOCs, SRP/SoC/DRY) — 35% less front-end development time and 50% less code duplication.',
    'Led the migration of 50+ Angular components to React with a modular, maintainable architecture — 40% faster deployments and 25% fewer bug reports.',
    'Mentored 4 junior developers, ran 15+ code reviews weekly and introduced performance practices that cut page-load times by 20%.',
  ],
  tech: ['Next.js', 'React', 'Django', 'Docker Swarm', 'Redis', 'WebSocket', 'Terraform', 'AWS (EC2, CloudWatch)', 'GTM', 'PostHog'],
}

export interface Build {
  id: string
  name: string
  tagline: string
  period: string
  summary: string
  points: { title: string; text: string }[]
  tech: string[]
  href?: string
}

export const builds: Build[] = [
  {
    id: 'codexpro',
    name: 'CodeXPro (Codexpro.ai)',
    tagline: 'AI-driven online coding assessment platform',
    period: 'Oct 2023 – Present',
    summary:
      'Backend and AI engineering for an online coding assessment platform used for technical evaluation and automated testing, built at SmallDay IT Services.',
    points: [
      { title: 'AI-driven assessment generation', text: 'LLM pipelines extract skills, experience levels and competency areas from job descriptions and generate structured assessments with proper difficulty distribution and time allocation.' },
      { title: 'AI question generation & validation', text: 'Gemini API generates and validates questions, combined with internal question banks; admin review workflows and overrides keep quality high.' },
      { title: 'AI proctoring system', text: 'TensorFlow and computer vision for face detection, gaze tracking and multi-person detection to maintain exam integrity.' },
      { title: 'Real-time analytics dashboard', text: 'Live monitoring dashboards over WebSockets and Server-Sent Events, with role-based access control and caching for high concurrency.' },
      { title: 'Payment integration', text: 'Razorpay lifecycle — order creation, verification, refunds and webhook handling — with internal dashboards for transaction monitoring.' },
      { title: 'API management & optimisation', text: 'API-key management with usage tracking, quotas and IP monitoring; JMeter load testing; database tuning and caching.' },
    ],
    tech: ['Django', 'FastAPI', 'Python', 'PostgreSQL', 'Gemini API', 'TensorFlow', 'WebSockets', 'SSE', 'Razorpay', 'JMeter', 'AWS', 'Redis', 'Docker'],
  },
  {
    id: 'rightclick',
    name: 'RightClick AI',
    tagline: 'RAG-powered Chrome extension & Android AI keyboard',
    period: 'Apr 2026 – May 2026',
    summary:
      'Local-first AI productivity platform with three parts: a Chrome extension, a Python/FastAPI backend and an Android AI keyboard — grounding AI answers in your own documents.',
    points: [
      { title: 'Chrome extension', text: 'Right-click AI actions (grammar fix, professional rewrite, RAG-based reply, text description) that auto-replace selected text using context from your own documents. Manifest V3.' },
      { title: 'Android AI keyboard', text: 'Custom QWERTY keyboard with AI reply generation, screenshot OCR (Google ML Kit) and document-aware personalised responses. Kotlin.' },
      { title: 'Python backend', text: 'FastAPI + MongoDB + Ollama (LLaMA 3.1) powering both clients: RAG pipeline, Sentence Transformers vector search, JWT multi-user auth and secure document upload.' },
      { title: 'Local-first by design', text: 'Multi-user isolated storage and zero cloud dependency for AI inference; Docker + Docker Compose deployment.' },
    ],
    tech: ['Python', 'FastAPI', 'MongoDB', 'Ollama', 'FAISS', 'Sentence Transformers', 'Kotlin', 'ML Kit', 'Chrome MV3', 'JWT', 'Docker'],
    href: 'https://github.com/Manish10000',
  },
  {
    id: 'call2order',
    name: 'Call2Order',
    tagline: 'Two-way AI voice assistant for phone calls',
    period: 'Personal build',
    summary:
      'A two-way AI phone-call assistant built with the Twilio Voice API and Google Gemini, using real-time WebSocket event streams for multi-turn conversations.',
    points: [
      { title: 'Telephony', text: 'Twilio Voice integration with TwiML generation and webhooks.' },
      { title: 'Conversation', text: 'Real-time transcription and text-to-speech with multi-turn conversation flow powered by Gemini.' },
      { title: 'Streaming', text: 'WebSocket event streaming between the phone line and the Python backend.' },
    ],
    tech: ['Python', 'Twilio Voice', 'Gemini', 'WebSockets', 'TwiML'],
  },
  {
    id: 'more',
    name: 'WhatsApp AI Bot & RAG Chatbot',
    tagline: 'Automation and document Q&A experiments',
    period: 'Personal builds',
    summary:
      'A WhatsApp AI automation bot using Python and Ollama with local LLMs, and a Retrieval-Augmented Generation chatbot using FAISS for document-based question answering.',
    points: [
      { title: 'WhatsApp automation', text: 'Local-LLM powered replies and automation flows with Python and Ollama.' },
      { title: 'RAG chatbot', text: 'FAISS vector index for document-grounded question answering.' },
    ],
    tech: ['Python', 'Ollama', 'FAISS', 'RAG'],
  },
]

export const skillGroups = [
  {
    key: 'claude',
    file: 'claude_ai.ts',
    title: 'Claude & AI Engineering',
    skills: ['Anthropic Claude', 'Claude Agent SDK', 'Anthropic API', 'Claude Code Subagents', 'MCP', 'RAG', 'LLMs', 'Generative AI', 'Prompt Engineering', 'Conversational AI', 'Chatbot Development', 'Information Retrieval', 'Gemini API', 'Ollama', 'TensorFlow', 'FAISS', 'Sentence Transformers'],
  },
  {
    key: 'backend',
    file: 'backend.py',
    title: 'Backend & Real-time',
    skills: ['Python', 'Django', 'Django REST Framework', 'FastAPI', 'WebSocket', 'Server-Sent Events', 'Twilio', 'Redis', 'PostgreSQL', 'MySQL', 'MongoDB', 'Web Caching', 'API Testing', 'Razorpay'],
  },
  {
    key: 'frontend',
    file: 'frontend.tsx',
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript Frameworks', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    key: 'cloud',
    file: 'cloud.tf',
    title: 'Cloud & DevOps',
    skills: ['AWS (S3, Bedrock, SageMaker, EC2, CloudWatch)', 'Docker', 'Docker Swarm', 'Terraform', 'GitOps', 'DevOps', 'Git', 'GTM', 'PostHog'],
  },
  {
    key: 'practice',
    file: 'practice.md',
    title: 'Engineering Practice',
    skills: ['Scalable Architecture', 'Production Systems', 'Optimizing Performance', 'Proctoring', 'Real-time Simulation', 'Automation', 'Selenium', 'JMeter', 'Technology Evaluation', 'Project Management'],
  },
]

export interface Cert {
  title: string
  issuer: string
  issued: string
  expires?: string
  credentialId?: string
  url?: string
  featured?: boolean
  score?: string
  description?: string
  skills?: string[]
}

export const certs: Cert[] = [
  {
    title: 'Claude Certified Architect – Foundations',
    issuer: 'Anthropic',
    issued: 'Jun 2026',
    expires: 'Dec 2026',
    credentialId: 'je8LqTD75mzcTatfKfF2Nw',
    url: 'https://www.credly.com/badges/6388a92b-0917-4503-a40d-44049677a57d',
    featured: true,
    score: '903 / 1000',
    description:
      'Proctored exam validating the ability to design and build production-grade applications with Claude using Claude Code, the Claude Agent SDK, the Claude API and the Model Context Protocol (MCP).',
    skills: ['AI System Design', 'Claude Agent SDK', 'Claude Code configuration', 'Context Management', 'Generative AI Architecture', 'Large Language Models (LLMs)', 'Multi-Agent Orchestration', 'Production reliability', 'Prompt Engineering', 'Structured output', 'Tool & MCP design'],
  },
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Jan 2026',
    expires: 'Jan 2029',
    url: 'https://www.credly.com/badges/01e34951-d9f1-48d9-af6a-db1d413f8da3/linked_in_profile',
    description: 'AI/ML fundamentals on AWS — Amazon Bedrock, SageMaker, responsible AI and LLM deployment on the cloud.',
    skills: ['AWS SageMaker', 'Amazon Bedrock', 'Artificial Intelligence'],
  },
  { title: 'Building with the Claude API', issuer: 'Anthropic', issued: 'May 2026', credentialId: 'qrqzhwipo23z' },
  { title: 'Claude Code in Action', issuer: 'Anthropic', issued: 'May 2026', credentialId: 'm8nsqknaju3b' },
  { title: 'Introduction to Model Context Protocol', issuer: 'Anthropic', issued: 'May 2026', credentialId: 'qg48p6or7br3' },
  { title: 'Introduction to agent skills', issuer: 'Anthropic', issued: 'May 2026', credentialId: 'ep2mhdbp7ki5' },
  { title: 'Claude 101', issuer: 'Anthropic', issued: 'May 2026', credentialId: 'tzukqc7o3voo' },
]

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    field: 'Computer Science',
    school: 'Indira Gandhi Institute of Technology (IGIT), Sarang',
    period: '2021 – 2023',
    skills: ['FastAPI', 'Git'],
  },
  {
    degree: 'Bachelor’s degree',
    field: 'Chemistry',
    school: 'Utkal University · e-Tech Residential Degree College',
    period: 'Sep 2018 – Sep 2021',
    skills: [],
  },
]

export const community = [
  { title: 'Google DevFest Bhubaneswar 2025', detail: 'Attended — spec-driven RAG, Firebase AI Logic, Gemini on Cloud and ethical Agentic AI; “Gemma in Action” workshop.' },
  { title: 'Agentic AI Conference · Data Science Dojo', detail: 'Attended — September 2025.' },
]
