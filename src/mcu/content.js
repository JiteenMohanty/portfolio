// Content for the MCU universe.
//
// The design is deliberately minimal, so this holds condensed copy derived from
// the canonical data in src/data/*. Hard facts (name, email, socials, résumé)
// are pulled straight from `profile` so there is still one source of truth.

import { profile } from '@/data/profile'

export const hero = {
  eyebrow: 'Friendly neighbourhood engineer',
  name: profile.name,
  tagline:
    'Full-stack engineer building scalable backends, workflow automation, and AI-powered products — end to end.',
}

export const cards = [
  {
    id: 'about',
    eyebrow: '01 / origin',
    title: 'About',
    body: 'Backend-first engineer shipping the unglamorous parts that make products actually work.',
    area: 'about',
    origin: '8% -6%',
  },
  {
    id: 'projects',
    eyebrow: '02 / case files',
    title: 'Projects',
    body: 'Three platforms built end-to-end — society ops, agentic pentesting, legal marketplace.',
    area: 'projects',
    origin: '92% -6%',
  },
  {
    id: 'tech',
    eyebrow: '03 / web-shooters',
    title: 'Tech stack',
    chips: ['Java', 'Spring Boot', 'React', 'SQL'],
    more: '+21 more',
    area: 'tech',
    origin: '8% -6%',
  },
  {
    id: 'experience',
    eyebrow: '04 / patrol log',
    title: 'Experience',
    body: 'Associate Software Developer at Hansa Solutions — 2024 to now.',
    area: 'experience',
    origin: '92% -6%',
  },
  {
    id: 'education',
    eyebrow: '05 / training arc',
    title: 'Education',
    body: "B.Tech, Computer Science — Siksha 'O' Anusandhan, 2024.",
    area: 'education',
    origin: '8% 106%',
  },
  {
    id: 'contact',
    eyebrow: '06 / signal',
    title: 'Contact',
    body: `${profile.email} — open to product & backend-heavy roles.`,
    area: 'contact',
    origin: '92% 106%',
  },
]

export const cta = {
  resumeUrl: profile.resumeUrl,
  resumeMeta: 'PDF · 185KB',
  caption: 'Hover the mask · no scrolling required',
}

export const about = {
  eyebrow: '01 / origin story',
  title: 'About',
  paragraphs: [profile.aboutBio, profile.brandStatement],
  stats: [
    { label: 'Based', value: 'India' },
    { label: 'Focus', value: 'Backend & systems' },
    { label: 'Currently', value: 'Hansa Solutions' },
    { label: 'Open to', value: 'Product & backend-heavy roles', accent: true },
  ],
}

export const projects = {
  eyebrow: '02 / case files',
  title: 'Projects',
  items: [
    {
      name: 'Sniper',
      year: '2026',
      desc: 'An agentic AI platform that plans and runs real penetration tests across ~23 security tools, then judges its own report before the engagement counts as done.',
      stack: 'Python · FastAPI · LangGraph · PostgreSQL',
      href: '/projects/sniper',
    },
    {
      name: 'Home Hub',
      year: '2025',
      desc: 'Society and visitor management for residential communities — residents, security, and supervisors in one real-time system. Built solo.',
      stack: 'Flutter · Spring Boot · Firebase · MongoDB',
      href: '/projects/home-hub',
    },
    {
      name: 'LegalConnectIndia',
      year: '2023',
      desc: 'An e-marketplace connecting citizens with verified legal professionals. 1st place at HackerWar 4.0, built for Smart India Hackathon SIH1286.',
      stack: 'Node.js · Express · MongoDB',
      href: '/projects/legalconnect-india',
    },
  ],
}

export const tech = {
  eyebrow: '03 / web-shooters',
  title: 'Tech stack',
  groups: [
    {
      label: 'Front of house',
      tone: 'blue',
      items: ['React', 'JavaScript', 'Flutter', 'Tailwind / Bootstrap'],
    },
    {
      label: 'Back of house',
      tone: 'neutral',
      items: [
        'Java',
        'Spring Boot',
        'REST APIs',
        'Microservices',
        'Spring Security / JWT',
        'SQL',
        'MongoDB',
        'Oracle',
      ],
    },
    {
      label: 'Keeping it airborne',
      tone: 'neutral',
      items: ['Firebase / FCM', 'OpenAI', 'RabbitMQ', 'Twilio', 'Git / GitHub'],
      trailing: { label: 'Kafka — exploring', tone: 'red' },
    },
  ],
}

export const experience = {
  eyebrow: '04 / patrol log',
  title: 'Experience',
  roles: [
    {
      dates: '2025 → NOW',
      title: 'Associate Software Developer',
      company: 'Hansa Solutions',
      desc: 'Backend services for policy admin and workflow automation, plus AI extraction of structured data from inbound documents and email.',
      current: true,
    },
    {
      dates: '2024',
      title: 'Software Developer',
      company: 'Hansa Solutions',
      desc: 'Built a multi-criteria search engine across customer, policy, and transaction data for insurance-grade systems.',
    },
    {
      dates: 'FEB 2024',
      title: 'Trainee Software Developer',
      company: 'Hansa Solutions',
      desc: 'Database optimization through indexing and execution-plan tuning — around 35% faster query response times.',
    },
  ],
}

export const education = {
  eyebrow: '05 / training arc',
  title: 'Education',
  primary: {
    degree: 'B.Tech, Computer Science & Engineering',
    period: '2020 → 2024',
    school: "Siksha 'O' Anusandhan University",
    desc: 'Graduated June 2024 with a CGPA of 8.1 / 10, in Bhubaneswar, India.',
  },
  secondaryLabel: 'Earlier',
  secondary: ['Class XII — CBSE · 84.4%', 'Class X — CBSE · 89.4%'],
}

export const contact = {
  eyebrow: '06 / signal',
  title: 'Contact',
  intro:
    'Point the searchlight anywhere below. Email is fastest — usually within a day.',
  tiles: [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'GitHub', value: '@JiteenMohanty', href: profile.socials.github },
    {
      label: 'LinkedIn',
      value: '/in/jiteen-mohanty',
      href: profile.socials.linkedin,
    },
    {
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
    },
  ],
  badge: `● ${profile.availabilityNote.toUpperCase()}`,
}

export const modals = { about, projects, tech, experience, education, contact }
