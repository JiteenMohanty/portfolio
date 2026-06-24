// Central source of truth for personal / brand information.
export const profile = {
  name: 'Jiteen Mohanty',
  firstName: 'Jiteen',
  title: 'Full Stack Engineer',
  altTitle: 'Software Engineer · Product Builder · AI Enthusiast',
  location: 'India',
  available: true,
  availabilityNote: 'Open to product & backend-heavy roles',

  email: 'jiteen.dev@gmail.com',
  phone: '+91 93480 51139',
  resumeUrl: '/resume.pdf',

  socials: {
    github: 'https://github.com/JiteenMohanty',
    linkedin: 'https://www.linkedin.com/in/jiteen-mohanty-61b814133',
    email: 'mailto:jiteen.dev@gmail.com',
  },

  // Hero copy
  hero: {
    greeting: "Hi, I'm Jiteen.",
    headline: 'I build products that solve real-world problems.',
    subheadline:
      'Full Stack Engineer specializing in scalable backend systems, workflow automation, AI-powered solutions, and end-to-end product development.',
  },

  // One-line brand statement used across the site
  brandStatement:
    'I build products that transform complex processes into intuitive experiences.',

  // About section narrative
  about: [
    "I'm a backend-first Full Stack Engineer who likes living where messy real-world processes meet clean software. For the last 2+ years I've designed and shipped enterprise backend services, REST APIs, and workflow automation that quietly run the unglamorous parts of a business.",
    'From enterprise insurance systems to AI-powered platforms and a society-management product I built solo, I enjoy turning fuzzy ideas into systems people actually love using. I care as much about the experience on top as the architecture underneath.',
    'I enjoy understanding both technical systems and the people using them — that mix of empathy and engineering is what makes a product feel obvious instead of complicated.',
  ],

  traits: [
    {
      label: 'Curious',
      desc: 'I dig until I understand the system and the people inside it.',
    },
    {
      label: 'Practical',
      desc: 'I optimize for what ships and holds up in production.',
    },
    {
      label: 'Builder',
      desc: 'Ideas only matter once they exist and someone is using them.',
    },
  ],

  roles: [
    'Full Stack Engineer',
    'Product Builder',
    'Backend-first Engineer',
    'AI Enthusiast',
    'Curious Problem Solver',
  ],
}

export default profile
