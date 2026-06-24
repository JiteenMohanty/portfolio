// Skills are shown as categorized cards with expertise badges
// (no progress bars, per the design brief).

export const primarySkills = [
  'Java',
  'Spring Boot',
  'SQL',
  'React',
  'MongoDB',
  'Firebase',
  'Flutter',
]

export const skillCategories = [
  {
    name: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Java', level: 'Expert' },
      { name: 'Spring Boot', level: 'Expert' },
      { name: 'REST APIs', level: 'Expert' },
      { name: 'Microservices', level: 'Advanced' },
      { name: 'Spring Security / JWT', level: 'Advanced' },
    ],
  },
  {
    name: 'Databases',
    icon: 'Database',
    skills: [
      { name: 'SQL', level: 'Expert' },
      { name: 'Query Optimization', level: 'Advanced' },
      { name: 'Oracle', level: 'Advanced' },
      { name: 'SQL Server', level: 'Advanced' },
      { name: 'MySQL', level: 'Advanced' },
      { name: 'MongoDB', level: 'Advanced' },
    ],
  },
  {
    name: 'Frontend & Mobile',
    icon: 'Layout',
    skills: [
      { name: 'React', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'Flutter', level: 'Advanced' },
      { name: 'Tailwind / Bootstrap', level: 'Proficient' },
    ],
  },
  {
    name: 'Cloud, AI & Messaging',
    icon: 'Sparkles',
    skills: [
      { name: 'Firebase / FCM', level: 'Advanced' },
      { name: 'OpenAI Integration', level: 'Advanced' },
      { name: 'RabbitMQ', level: 'Proficient' },
      { name: 'Kafka', level: 'Exploring' },
      { name: 'Twilio', level: 'Proficient' },
    ],
  },
  {
    name: 'Tools & Practices',
    icon: 'Wrench',
    skills: [
      { name: 'Git / GitHub', level: 'Expert' },
      { name: 'Postman', level: 'Advanced' },
      { name: 'Maven', level: 'Advanced' },
      { name: 'Agile / Scrum', level: 'Advanced' },
      { name: 'AI-Assisted Dev', level: 'Advanced' },
    ],
  },
]

// Flat list for the marquee strip.
export const skillMarquee = [
  'Java', 'Spring Boot', 'REST APIs', 'Microservices', 'React', 'Flutter',
  'MongoDB', 'PostgreSQL', 'Oracle', 'SQL Server', 'Firebase', 'RabbitMQ',
  'OpenAI', 'Twilio', 'JWT', 'Git', 'Maven', 'Agile',
]

// Visual weighting for the expertise badges.
export const levelMeta = {
  Expert: { tone: 'brand', dots: 3 },
  Advanced: { tone: 'accent', dots: 2 },
  Proficient: { tone: 'muted', dots: 1 },
  Exploring: { tone: 'faint', dots: 1 },
}

export default skillCategories
