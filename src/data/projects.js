// Detailed project case studies. Consumed by both the Projects grid
// and the per-project case-study pages (/projects/:slug).

export const projects = [
  {
    slug: 'home-hub',
    name: 'Home Hub',
    tagline: 'Society & visitor management, reimagined for residential communities.',
    type: 'Freelance Product',
    period: '2025',
    role: 'Sole Developer',
    accent: 'emerald',
    featured: true,
    status: { label: 'Delivered to client', tone: 'success' },

    summary:
      'A modern society and visitor-management platform that replaces paper logbooks and scattered WhatsApp groups with one real-time system for residents, security, and supervisors.',

    overview:
      'Home Hub is a society and visitor-management platform built to eliminate fragmented communication and inefficient visitor tracking inside residential communities. It unifies residents, security guards, and supervisors into a single real-time system — built end-to-end as the sole developer.',

    problem:
      "Residential societies run on paper visitor logs, phone-call complaints, and announcements scattered across WhatsApp groups. There's no single source of truth — guards can't verify visitors quickly, residents miss approvals, and management has zero visibility into day-to-day operations.",

    solution:
      'I designed and built role-based apps for residents, security, and supervisors from a single codebase. Visitors are logged at the gate and instantly routed to the right flat for approval, with push and WhatsApp notifications closing the loop in seconds. Complaints, dues, and announcements all live in one auditable system.',

    responsibilities: [
      'System & data architecture',
      'Spring Boot backend & REST APIs',
      'Flutter cross-platform app (3 roles)',
      'Firebase Cloud Messaging push pipeline',
      'Twilio WhatsApp integration',
      'Approval workflows & notifications',
    ],

    stack: ['Flutter', 'Spring Boot', 'Firebase', 'MongoDB', 'FCM', 'Twilio', 'REST APIs'],

    features: [
      { icon: 'Users', title: 'Resident Management', desc: 'Onboard residents by flat with verified profiles and household members.' },
      { icon: 'ScanLine', title: 'Visitor Tracking', desc: 'Gate-to-flat visitor logging with photo, purpose, and live status.' },
      { icon: 'ShieldCheck', title: 'Security Dashboard', desc: 'Guards verify, approve, and log entries and exits in real time.' },
      { icon: 'LayoutDashboard', title: 'Supervisor Dashboard', desc: 'Society-wide oversight of staff, complaints, and activity.' },
      { icon: 'Wrench', title: 'Complaint Management', desc: 'Residents raise and track maintenance requests to resolution.' },
      { icon: 'GitBranch', title: 'Approval Workflows', desc: 'Visitor and request approvals routed to the right resident.' },
      { icon: 'Bell', title: 'Push Notifications', desc: 'Instant FCM alerts for visitors, approvals, and announcements.' },
      { icon: 'MessageCircle', title: 'WhatsApp Integration', desc: 'Two-way visitor alerts and resident responses over WhatsApp via Twilio.' },
    ],

    architecture: {
      summary:
        'A Spring Boot REST backend backed by MongoDB and Firebase serves a single Flutter codebase across resident, security, and supervisor roles. Event-driven notifications fan out through Firebase Cloud Messaging and Twilio WhatsApp.',
      style: 'layered',
      layers: [
        { name: 'Clients', icon: 'Smartphone', items: ['Resident app', 'Security app', 'Supervisor app'] },
        { name: 'API', icon: 'Server', items: ['Spring Boot REST', 'Auth & roles', 'Workflow engine'] },
        { name: 'Data', icon: 'Database', items: ['MongoDB', 'Firebase'] },
        { name: 'Messaging', icon: 'Send', items: ['FCM push', 'Twilio WhatsApp'] },
      ],
    },

    challenges: [
      {
        title: 'WhatsApp integration via Twilio',
        desc: 'The hardest part was reliable two-way WhatsApp: sending templated visitor alerts and parsing resident approve/deny replies through Twilio webhooks — keeping the gate flow fast and idempotent against duplicate callbacks.',
      },
      {
        title: 'One codebase, three roles',
        desc: 'Residents, security, and supervisors needed very different experiences from a single Flutter app, without bloating navigation or leaking permissions across roles.',
      },
    ],

    results: [
      { value: '3', label: 'User roles in one app' },
      { value: '2', label: 'Notification channels (FCM + WhatsApp)' },
      { value: '8', label: 'Core modules shipped' },
      { value: '1', label: 'Unified source of truth' },
    ],

    links: { live: null, github: null, note: 'Private — delivered client product' },
    gallery: [],
  },

  {
    slug: 'ai-claims-platform',
    name: 'AI-Powered Claims Processing Platform',
    tagline: 'Microservices + AI that turn manual claim verification into an automated workflow.',
    type: 'Personal Product',
    period: 'Jan 2026 – Apr 2026',
    role: 'Solo — Architecture to AI',
    accent: 'indigo',
    featured: true,
    status: { label: 'Build complete · Not yet deployed', tone: 'complete' },

    summary:
      'An AI-powered insurance-claims platform built on independently deployable Spring Boot microservices, with OpenAI document analysis and event-driven workflows that keep humans in the loop for approvals.',

    overview:
      'A personal product designed and developed independently: an AI-powered insurance-claims platform on a modular microservice backend. It ingests claim documents, extracts structured data, runs assessment and fraud checks, and drives claims through an automated, role-aware workflow.',

    problem:
      'Insurance claims demand extensive manual document verification — adjusters read PDFs, cross-check policies, and flag fraud by hand. It is slow, inconsistent, and hard to scale.',

    solution:
      'AI-powered document assessment plus workflow automation. Documents are ingested and parsed, claims are scored for risk, and each claim flows through a status-driven lifecycle — with humans kept in the loop for approvals, not replaced by the model.',

    responsibilities: [
      'Microservice architecture & system design',
      'Spring Boot services — controllers, services, repos, DTOs',
      'JWT auth & role-based access control',
      'OpenAI document-analysis integration',
      'Event-driven messaging with RabbitMQ',
      'Data modeling across PostgreSQL & MongoDB',
    ],

    stack: ['Spring Boot', 'React', 'OpenAI', 'RabbitMQ', 'PostgreSQL', 'MongoDB', 'Spring Security', 'JWT'],

    features: [
      { icon: 'KeyRound', title: 'Authentication & RBAC', desc: 'Centralized JWT auth with roles for Policyholders, Adjusters, Investigators, and Admins.' },
      { icon: 'FolderKanban', title: 'Claims Management', desc: 'Submit, track, and manage claims across their full lifecycle.' },
      { icon: 'Sparkles', title: 'AI Verification', desc: 'AI-assisted document assessment and fraud-signal analysis.' },
      { icon: 'FileSearch', title: 'Document Analysis', desc: 'Automated extraction of structured data from claim documents.' },
      { icon: 'Workflow', title: 'Workflow Automation', desc: 'Status-driven progression from submission to settlement.' },
      { icon: 'BellRing', title: 'Event-Driven Notifications', desc: 'Real-time stakeholder updates over RabbitMQ messaging.' },
    ],

    architecture: {
      summary:
        'Independently deployable Spring Boot microservices communicate over REST and RabbitMQ events. A React client talks to the services, auth is centralized behind JWT, and AI document processing runs as its own isolated service.',
      style: 'microservices',
      services: [
        { name: 'auth-service', icon: 'KeyRound', desc: 'Spring Security + JWT, role-based access control', tech: 'PostgreSQL' },
        { name: 'claim-service', icon: 'FolderKanban', desc: 'Claim lifecycle, assessment & status tracking', tech: 'PostgreSQL' },
        { name: 'ai-service', icon: 'Sparkles', desc: 'OpenAI document analysis & data extraction', tech: 'MongoDB' },
        { name: 'notification-service', icon: 'BellRing', desc: 'Event-driven stakeholder notifications', tech: 'RabbitMQ' },
      ],
      client: { name: 'React Client', icon: 'Monitor' },
      bus: { name: 'RabbitMQ event bus', icon: 'Radio' },
    },

    challenges: [
      {
        title: 'Designing for independent services',
        desc: 'Splitting claims, auth, notifications, and AI into services that stay decoupled — and deciding what travels over synchronous REST versus asynchronous RabbitMQ events.',
      },
      {
        title: 'Trustworthy AI in the loop',
        desc: 'Using OpenAI to extract and assess document data while keeping outputs structured, validated, and auditable. AI accelerates the adjuster — it never silently decides.',
      },
    ],

    results: [
      { value: '4+', label: 'Independent microservices' },
      { value: '4', label: 'RBAC roles supported' },
      { value: 'AI', label: 'Document verification automated' },
      { value: '2', label: 'Databases, chosen by fit' },
    ],

    links: { live: null, github: null, note: 'Complete — deployment pending' },
    gallery: [
      { src: '/projects/ai-claims/screenshot-dashboard.png', alt: 'Claims dashboard — live stats, status breakdown chart, and recent AI activity' },
      { src: '/projects/ai-claims/screenshot-claims.png', alt: 'Claims list — policy number, claimant, type, AI review status, and amount' },
      { src: '/projects/ai-claims/screenshot-claim-detail.png', alt: 'Claim detail — AI analysis panel with risk score, summary, and recommended action' },
      { src: '/projects/ai-claims/screenshot-documents.png', alt: 'Document upload — attach supporting files to an existing claim' },
      { src: '/projects/ai-claims/screenshot-login.png', alt: 'Login screen — branded entry point for the AI Claims Processing Platform' },
    ],
  },

  {
    slug: 'legalconnect-india',
    name: 'LegalConnectIndia',
    tagline: 'An e-marketplace connecting citizens with legal professionals — built for Smart India Hackathon problem SIH1286.',
    type: 'Hackathon Winner',
    period: '2023',
    role: 'Full Stack & Pitch',
    team: 'Team HackTivist',
    award: '1st Place · HackerWar 4.0',
    context: 'Smart India Hackathon · SIH1286 · Ministry of Law & Justice',
    accent: 'amber',
    featured: false,
    status: { label: '🏆 HackerWar 4.0 Winner', tone: 'award' },

    summary:
      'A hackathon-winning e-marketplace that connects citizens with verified legal professionals — advocates, mediators, notaries and more — built for Smart India Hackathon problem statement SIH1286 (Ministry of Law & Justice).',

    overview:
      'LegalConnectIndia won 1st place at HackerWar 4.0 with Team HackTivist. Built for Smart India Hackathon problem SIH1286 under the Ministry of Law & Justice, it centralizes the discovery, engagement, and management of legal services — turning a fragmented ecosystem into a single, transparent digital platform for citizens and legal professionals alike.',

    problem:
      'Accessing legal services in India is fragmented and confusing. Citizens rely on personal references, local networks, or endless manual searching to find help — making it hard to identify the right professional, judge their credibility, track a case, or communicate transparently throughout the process.',

    solution:
      'A marketplace where citizens identify the most relevant legal professionals for their specific need, connect with them, schedule consultations, track ongoing cases, communicate securely, and leave feedback after service — making legal help accessible and transparent while helping professionals reach a wider audience.',

    responsibilities: [
      'Frontend — responsive UI & provider-discovery flows',
      'Backend — Node.js / Express REST APIs',
      'Data — MongoDB & Mongoose, user & provider management',
      'Chatbot interaction flows & user dashboard',
      'Final presentation deck & pitch to the judges',
    ],

    stack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],

    features: [
      { icon: 'Bot', title: 'AI-Assisted Legal Guidance', desc: 'A chatbot guides users through questions to pinpoint the right category of legal help.' },
      { icon: 'Scale', title: 'Service Provider Discovery', desc: 'Find advocates, arbitrators, mediators, notaries, and document writers by need.' },
      { icon: 'Star', title: 'Ratings & Reputation', desc: 'Providers carry ratings and reviews from past clients for transparent, informed choices.' },
      { icon: 'CalendarCheck', title: 'Consultation Scheduling', desc: 'Book consultations directly with a chosen legal professional.' },
      { icon: 'LayoutDashboard', title: 'Case Tracking Dashboard', desc: 'Monitor the status and progress of a legal matter from one place.' },
      { icon: 'MessageCircle', title: 'Secure Messaging', desc: 'Built-in communication between citizens and professionals — no third-party apps.' },
    ],

    architecture: {
      summary:
        'A MERN-inspired architecture: a Bootstrap / JavaScript client talks to Node + Express REST APIs, with citizens and legal-service-providers modeled in MongoDB through Mongoose.',
      style: 'layered',
      layers: [
        { name: 'Client', icon: 'Monitor', items: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'] },
        { name: 'Server', icon: 'Server', items: ['Node.js', 'Express REST APIs'] },
        { name: 'Data', icon: 'Database', items: ['MongoDB', 'Mongoose'] },
      ],
    },

    challenges: [
      {
        title: 'Designing a two-sided marketplace',
        desc: 'Modeling both citizens and many kinds of legal professionals — advocates, mediators, notaries, document writers — plus the discovery, trust, and onboarding flows that connect them.',
      },
      {
        title: '24 hours, judge-ready',
        desc: 'Building a working full-stack platform and a compelling pitch for a real Ministry of Law & Justice problem statement, inside a single 24-hour cycle.',
      },
    ],

    results: [
      { value: '1st', label: 'Place · HackerWar 4.0' },
      { value: '₹10K', label: 'Winning prize' },
      { value: 'SIH1286', label: 'Ministry of Law & Justice' },
      { value: '6', label: 'Team HackTivist members' },
    ],

    teamMembers: [
      'Subrat Kumar Sahu',
      'Jiteen Mohanty',
      'Santanu Kumar Mishra',
      'Sunil Kumar Pradhan',
      'K. Nameesha',
      'Swetaparna Mishra',
    ],

    photo: {
      src: '/projects/legalconnect/team.jpg',
      mobileSrc: '/projects/legalconnect/team-winners.jpg',
      alt: 'Team HackTivist receiving the 1st place prize at HackerWar 4.0',
      badge: '🏆 HackerWar 4.0 Winners',
      caption: 'Team HackTivist — 1st Place, HackerWar 4.0 (Smart India Hackathon qualifier)',
      // Highlight region of the winning team within the full photo (in %).
      region: { left: 28.5, top: 25.5, width: 36.3, height: 67.5 },
    },

    links: { live: null, github: null, note: 'Smart India Hackathon · SIH1286 · 2023' },
    gallery: [],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)

export default projects
