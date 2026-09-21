// Single source of truth for work history. Both universes read from here:
// the Miles sections/timeline use the full fields; the MCU universe uses the
// condensed `mcu*` fields and the `timeline` projection. Keep everything for a
// job in one entry so the two modes can never drift apart.
export const experience = [
  {
    company: 'Industrial IQ',
    url: 'https://www.industrial-iq.ai/',
    period: 'Sep 2026 – Present',
    current: true,
    summary: 'Forward Deployed Engineer — embedding with customers to design, build, and ship AI-driven software end-to-end.',
    roles: [{ title: 'Forward Deployed Engineer', period: 'Sep 2026 – Present' }],
    // MCU-universe condensed view (keeps that design's exact copy)
    mcuDates: 'SEP 2026 → NOW',
    mcuDesc: 'Embedding with customers to design, build, and ship AI-driven software end-to-end — from prototype through to deployment.',
    // Canon Events / journey projection
    timeline: {
      year: '2026',
      title: 'Joined Industrial IQ',
      detail: 'Forward Deployed Engineer — building AI-driven products with customers in the loop',
    },
    highlights: [
      {
        icon: 'Rocket',
        title: 'Forward Deployed',
        desc: "Embedded with customers, turning their problems into production software",
      },
      {
        icon: 'Sparkles',
        title: 'AI in the Loop',
        desc: 'Building AI-driven products from prototype through to deployment',
      },
    ],
    metrics: [],
    stack: [],
  },
  {
    company: 'Hansa Solutions',
    location: 'Hyderabad, India 🇮🇳',
    period: 'Feb 2024 – May 2026',
    summary: 'Backend & data systems for insurance-grade platforms, shipping to production for two years.',
    roles: [
      { title: 'Software Developer', period: 'Feb 2024 – May 2026' },
    ],
    mcuDates: '2024 → MAY 2026',
    mcuDesc: 'Backend services and data for insurance-grade platforms — REST APIs for policy admin and workflow automation, a multi-criteria search engine, AI extraction from inbound documents, and query tuning (~35% faster).',
    timeline: {
      year: '2024',
      title: 'Joined Hansa Solutions',
      detail: 'Software Developer — backend & data for insurance-grade platforms',
    },
    highlights: [
      {
        icon: 'Server',
        title: 'Backend Service Development',
        desc: 'REST APIs for policy admin, customer mgmt & workflow automation',
      },
      {
        icon: 'Search',
        title: 'Advanced Search Engine',
        desc: 'Multi-criteria search across customer, policy & transaction data',
      },
      {
        icon: 'FileText',
        title: 'AI Document Processing',
        desc: 'AI extracts structured data from inbound docs & emails',
      },
      {
        icon: 'Gauge',
        title: 'Database Optimization',
        desc: 'Faster queries via indexing & execution-plan tuning',
      },
      {
        icon: 'LifeBuoy',
        title: 'Production Support',
        desc: 'Root-cause analysis & Agile delivery in production',
      },
    ],
    metrics: [
      { value: '~35%', label: 'Faster DB response times' },
      { value: '2 yrs', label: 'Shipping to production' },
      { value: 'Enterprise', label: 'Insurance-grade systems' },
    ],
    stack: ['Java', 'Spring Boot', 'REST APIs', 'SQL Server', 'Oracle', 'Agile'],
  },
]

export default experience
