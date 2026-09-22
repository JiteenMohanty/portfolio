// View layer for the MCU universe.
//
// This file holds only the MCU design's *presentation* (eyebrows, grid origins,
// layout tone) — every fact is projected from the canonical sources in
// src/data/* so the two universes can never drift apart. The Miles universe
// renders the full data; MCU renders this condensed view of the same source.

import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { getProject } from '@/data/projects'
import { mcuTechGroups } from '@/data/skills'

const current = experience[0]

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
    chips: ['Claude Code', 'SDD', 'Mobile', 'React'],
    more: '+20 more',
    area: 'tech',
    origin: '8% -6%',
  },
  {
    id: 'experience',
    eyebrow: '04 / patrol log',
    title: 'Experience',
    body: `${current.roles[0].title} at ${current.company} — since Sept 2026.`,
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
    body: `${profile.email} — always happy to talk shop.`,
    area: 'contact',
    origin: '92% 106%',
  },
]

export const cta = {
  resumeUrl: profile.resumeUrl,
  resumeMeta: 'PDF · 185KB',
  methodsUrl: profile.courses.url,
  methodsLabel: profile.courses.label,
  caption: 'Slowly spinning showpiece · click & hold the figure to pause',
}

export const about = {
  eyebrow: '01 / origin story',
  title: 'About',
  paragraphs: [profile.aboutBio, profile.brandStatement],
  stats: [
    { label: 'Based', value: 'India' },
    { label: 'Focus', value: 'Backend & systems' },
    { label: 'Currently', value: profile.company },
    { label: 'Role', value: profile.currentRole, accent: true },
  ],
}

// Case files — projected from the canonical project list, in MCU's own order.
const mcuProjectOrder = ['sniper', 'home-hub', 'legalconnect-india']
export const projects = {
  eyebrow: '02 / case files',
  title: 'Projects',
  items: mcuProjectOrder.map((slug) => {
    const p = getProject(slug)
    return {
      name: p.name,
      year: p.period,
      desc: p.mcuDesc,
      stack: p.mcuStack,
      href: `/projects/${p.slug}`,
    }
  }),
}

export const tech = {
  eyebrow: '03 / web-shooters',
  title: 'Tech stack',
  groups: mcuTechGroups,
}

// Patrol log — projected from the single work-history source.
export const experienceModal = {
  eyebrow: '04 / patrol log',
  title: 'Experience',
  roles: experience.map((job) => ({
    dates: job.mcuDates,
    title: job.roles[0].title,
    company: job.company,
    href: job.url,
    desc: job.mcuDesc,
    current: job.current,
  })),
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
  learning: {
    text: 'Still learning — and documenting it as I go.',
    href: profile.courses.url,
    label: 'Methods ↗',
  },
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
      label: 'Methods',
      value: 'Courses · AI in the loop',
      href: profile.courses.url,
    },
  ],
  badge: `● ${profile.availabilityNote.toUpperCase()}`,
}

export const modals = {
  about,
  projects,
  tech,
  experience: experienceModal,
  education,
  contact,
}
