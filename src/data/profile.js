// Central source of truth for personal / brand information.
export const profile = {
  name: 'Jiteen Mohanty',
  firstName: 'Jiteen',
  title: 'Full Stack Engineer',
  altTitle: 'Software Engineer · Product Builder · AI Enthusiast',
  location: '🇮🇳 India',
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

  // About section — kept short on purpose; nobody reads a wall of text.
  aboutBio:
    "Backend-first engineer who ships the unglamorous parts that make products actually work — APIs, data, and the systems behind them. I've built enterprise insurance platforms, an AI claims processor, and a society-management app end-to-end, solo.",

  aboutStats: [
    { value: '2+', label: 'Years shipping to production' },
    { value: '3', label: 'Platforms built end-to-end' },
    { value: 'Solo', label: '& team delivery' },
    { value: '🇮🇳', label: 'Based in India' },
  ],

  traits: [
    {
      label: 'Curious',
      desc: 'Digs until the system makes sense.',
    },
    {
      label: 'Practical',
      desc: 'Ships what holds up in production.',
    },
    {
      label: 'Builder',
      desc: "Ideas don't count until they exist.",
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
