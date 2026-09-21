// The Canon Events journey (Miles universe). Non-work milestones are curated
// here; the work milestones are projected from the single work-history source
// in experience.js, so job titles/dates can never contradict the MCU universe.
import { experience } from './experience'

const workEvent = (company) => {
  const job = experience.find((e) => e.company === company)
  return {
    year: job.timeline.year,
    title: job.timeline.title,
    detail: job.timeline.detail,
    href: job.url,
    kind: 'work',
  }
}

// kind drives the icon + accent color on the journey timeline.
export const journey = [
  {
    year: '2018',
    title: 'Completed Class X',
    detail: 'Army Public School, Gopalpur — 89.4% (CBSE)',
    kind: 'education',
  },
  {
    year: '2020',
    title: 'Completed Class XII',
    detail: 'Army Public School, Gopalpur — 84.4% (CBSE)',
    kind: 'education',
  },
  {
    year: '2020',
    title: 'Started B.Tech in CSE',
    detail: "Siksha 'O' Anusandhan University, Bhubaneswar",
    kind: 'education',
  },
  {
    year: '2023',
    title: 'Won HackerWar 4.0',
    detail: '1st place with Team HackTivist — LegalConnectIndia (Smart India Hackathon · SIH1286)',
    kind: 'award',
  },
  {
    year: '2024',
    title: 'Graduated B.Tech',
    detail: 'CGPA 8.1 / 10 · June 2024',
    kind: 'education',
  },
  workEvent('Hansa Solutions'),
  {
    year: '2025',
    title: 'Built Home Hub',
    detail: 'Shipped a society & visitor-management product as sole developer',
    kind: 'project',
  },
  {
    year: '2026',
    title: 'Built Sniper',
    detail: 'An agentic AI platform that runs real penetration tests, end-to-end',
    kind: 'project',
  },
  workEvent('Industrial IQ'),
  {
    year: 'Next',
    title: 'Building products at scale',
    detail: 'Turning ideas into systems people love using',
    kind: 'future',
  },
]

export default journey
