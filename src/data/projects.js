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
    slug: 'sniper',
    name: 'Sniper',
    tagline: 'An agentic AI platform that runs real penetration tests — planning, executing, and judging its own security assessment end-to-end.',
    type: 'Personal Product',
    period: '2026',
    role: 'Solo — Architecture to Agent',
    accent: 'indigo',
    featured: true,
    status: { label: 'AI agent · Autonomous pentesting', tone: 'progress' },

    summary:
      'A network penetration-testing platform where an LLM-driven agent — not a human — plans and drives the assessment, orchestrating ~23 real security tools, attempting bounded exploitation, and validating its own report before the job counts as done.',

    overview:
      "Sniper is a pentest platform where an agent runs the engagement. Point it at a target and it orchestrates ~23 real security tools (nmap, ZAP, Nuclei, Nikto, sslyze and more), reasons over what they find, attempts bounded proof-of-concept exploitation, correlates individual findings into multi-step attack chains, and writes a report — all without a human choosing which tool to run next. An independent 'judge' pass then reviews that report for completeness before the engagement is allowed to count as complete, so the system checks its own work.",

    problem:
      'Real penetration testing is expert-gated and slow — a human has to choose each tool, interpret its output, chain low-severity findings into a real attack path, and write the report. The tools are automatable; the reasoning between them never was, so most targets simply never get tested.',

    solution:
      "Put an LLM agent in the operator seat, with guardrails. A planner picks and orders the tooling, ~20+ scanners run as isolated containers, an agentic pipeline reasons over the findings and attempts bounded exploitation, and a separate judge phase validates the report before sign-off. Multi-key rotation keeps a rate-limited API key from taking a scan down, and every phase, tool run, and LLM call is fully traced — so the agent's behavior is auditable, not a black box.",

    responsibilities: [
      'Agentic orchestration with LangGraph & LangChain',
      'FastAPI backend, async SQLAlchemy, Postgres & Redis',
      '~23 security tools as isolated per-scan containers',
      'Multi-provider LLM layer with auto key-rotation & failover',
      'Independent LLM judge for report validation',
      'Full-pipeline tracing via SigNoz (OpenTelemetry + ClickHouse)',
    ],

    stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'PostgreSQL', 'Redis', 'React', 'TypeScript', 'Docker', 'SigNoz'],

    features: [
      { icon: 'Crosshair', title: 'Agent-Driven Planning', desc: 'An LLM planner selects and orders the tools to run based on target type and chosen depth — no human picks the next step.' },
      { icon: 'Radar', title: '~23 Tools Orchestrated', desc: 'nmap, ZAP, Nuclei, Nikto, sslyze, Katana, Feroxbuster and more, each an isolated, disposable container per scan.' },
      { icon: 'Bug', title: 'Bounded Exploitation', desc: 'Crawling, vulnerability discovery, and proof-of-concept exploitation within configurable intrusiveness limits.' },
      { icon: 'Link2', title: 'Attack-Chain Correlation', desc: 'A reasoning phase links individual findings into full multi-step attack chains, not just a flat list of issues.' },
      { icon: 'Gavel', title: 'Self-Judging Reports', desc: 'An independent LLM judge reviews the assembled report for completeness and quality before an engagement is marked complete.' },
      { icon: 'Activity', title: 'Full Observability', desc: 'Every phase, tool run, and LLM call is traced through SigNoz — the agent is auditable, not a black box.' },
    ],

    architecture: {
      summary:
        'A FastAPI backend drives a LangGraph agent through plan → scan → reason → validate → report. Security tools run as isolated Docker containers per scan; a multi-provider LLM layer with automatic key-rotation feeds the agent, and the whole pipeline is traced through a self-hosted SigNoz stack.',
      style: 'layered',
      layers: [
        { name: 'Clients', icon: 'Monitor', items: ['React + TypeScript UI', 'Node/Express BFF'] },
        { name: 'Agent Core', icon: 'Bot', items: ['FastAPI', 'LangGraph pipeline', 'LLM key-rotation'] },
        { name: 'Tooling', icon: 'Boxes', items: ['~23 scanners', 'Isolated per-scan containers'] },
        { name: 'Data & Ops', icon: 'Database', items: ['PostgreSQL', 'Redis', 'SigNoz tracing'] },
      ],
    },

    challenges: [
      {
        title: 'Keeping an autonomous agent bounded',
        desc: 'Letting an LLM drive real exploitation tooling while guaranteeing it stays within the chosen intrusiveness level — safe-active by default, with brute-force and higher-friction checks off unless explicitly permitted.',
      },
      {
        title: 'Surviving LLMs against a live workload',
        desc: 'A single rate-limited API key can not be allowed to kill a running scan — automatic multi-provider key rotation and failover keep the agent moving, and full tracing makes every decision auditable.',
      },
    ],

    results: [
      { value: '~23', label: 'Security tools orchestrated' },
      { value: '7', label: 'Report export formats' },
      { value: 'Judge', label: 'Validates its own reports' },
      { value: '100%', label: 'Traced — every phase & LLM call' },
    ],

    links: { live: null, github: null, note: 'Private — personal product' },
    gallery: [
      { src: '/projects/sniper/new-scan.png', alt: 'New Security Scan — target address, scan depth (Quick / Standard / Deep), and assessment mode selection' },
      { src: '/projects/sniper/tool-matrix.png', alt: 'Scanner Tool Matrix — 23 security tools with per-tool container images and timeouts, plus safety controls' },
      { src: '/projects/sniper/api-keys.png', alt: 'API Key Management — multi-key buckets with rotation, priority, and per-key health for LLM failover' },
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
