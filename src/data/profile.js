// Central source of truth for personal / brand information.
export const profile = {
  name: 'Jiteen Mohanty',
  firstName: 'Jiteen',
  title: 'Forward Deployed Engineer',
  altTitle: 'Forward Deployed Engineer · Product Builder · AI Enthusiast',
  location: '🇮🇳 India',
  available: true,

  // Current role / status, shown as the "live" pill across hero, contact, footer.
  company: 'Industrial IQ',
  currentRole: 'Forward Deployed Engineer',
  availabilityNote: 'Forward Deployed Engineer @ Industrial IQ',

  email: 'jiteen.dev@gmail.com',
  resumeUrl: '/resume.pdf',

  socials: {
    github: 'https://github.com/JiteenMohanty',
    linkedin: 'https://www.linkedin.com/in/jiteen-mohanty-61b814133',
    email: 'mailto:jiteen.dev@gmail.com',
  },

  // Course site — "Methods for building software with AI in the loop."
  courses: {
    url: 'https://methods-taupe.vercel.app/',
    label: 'Methods',
    desc: 'Courses on building software with AI in the loop',
  },

  // Hero copy
  hero: {
    greeting: 'Meanwhile, in India…',
    headline: 'Your friendly neighborhood full-stack engineer.',
    subheadline:
      "Hi, I'm Jiteen — I build scalable backend systems, workflow automation, and AI-powered products, end-to-end. No radioactive spider required.",
  },

  // One-line brand statement used across the site
  brandStatement:
    'I build products that transform complex processes into intuitive experiences.',

  // About section — kept short on purpose; nobody reads a wall of text.
  aboutBio:
    "Backend-first engineer who ships the unglamorous parts that make products actually work — APIs, data, and the systems behind them. I've built enterprise insurance platforms, an AI claims processor, and a society-management app end-to-end, solo. Now a Forward Deployed Engineer at Industrial IQ, building AI-driven products with customers in the loop.",

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
    'Friendly Neighborhood Engineer',
    'Full Stack Engineer',
    'Product Builder',
    'Backend-first Engineer',
    'AI Enthusiast',
  ],
}

export default profile
