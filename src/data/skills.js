// Skills are shown as floating icon badges grouped by category — level is
// encoded as a small corner dot + revealed on hover/focus (see SkillIcon.jsx
// for the icon registry).

export const primarySkills = [
  { name: 'Java', icon: 'java' },
  { name: 'Spring Boot', icon: 'springboot' },
  { name: 'SQL', icon: 'sql' },
  { name: 'React', icon: 'react' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Flutter', icon: 'flutter' },
]

export const skillCategories = [
  {
    name: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Java', level: 'Expert', icon: 'java' },
      { name: 'Spring Boot', level: 'Expert', icon: 'springboot' },
      { name: 'REST APIs', level: 'Expert', icon: 'rest' },
      { name: 'Microservices', level: 'Advanced', icon: 'microservices' },
      { name: 'Spring Security / JWT', level: 'Advanced', icon: 'springsecurity' },
    ],
  },
  {
    name: 'Databases',
    icon: 'Database',
    skills: [
      { name: 'SQL', level: 'Expert', icon: 'sql' },
      { name: 'Query Optimization', level: 'Advanced', icon: 'queryopt' },
      { name: 'Oracle', level: 'Advanced', icon: 'oracle' },
      { name: 'SQL Server', level: 'Advanced', icon: 'sqlserver' },
      { name: 'MySQL', level: 'Advanced', icon: 'mysql' },
      { name: 'MongoDB', level: 'Advanced', icon: 'mongodb' },
    ],
  },
  {
    name: 'Frontend & Mobile',
    icon: 'Layout',
    skills: [
      { name: 'React', level: 'Advanced', icon: 'react' },
      { name: 'JavaScript', level: 'Advanced', icon: 'javascript' },
      { name: 'Flutter', level: 'Advanced', icon: 'flutter' },
      { name: 'Tailwind / Bootstrap', level: 'Proficient', icon: 'tailwind', icon2: 'bootstrap' },
    ],
  },
  {
    name: 'Cloud, AI & Messaging',
    icon: 'Sparkles',
    skills: [
      { name: 'Firebase / FCM', level: 'Advanced', icon: 'firebase' },
      { name: 'OpenAI Integration', level: 'Advanced', icon: 'openai' },
      { name: 'RabbitMQ', level: 'Proficient', icon: 'rabbitmq' },
      { name: 'Kafka', level: 'Exploring', icon: 'kafka' },
      { name: 'Twilio', level: 'Proficient', icon: 'twilio' },
    ],
  },
  {
    name: 'Tools & Practices',
    icon: 'Wrench',
    skills: [
      { name: 'Git / GitHub', level: 'Expert', icon: 'git', icon2: 'github' },
      { name: 'Postman', level: 'Advanced', icon: 'postman' },
      { name: 'Maven', level: 'Advanced', icon: 'maven' },
      { name: 'Agile / Scrum', level: 'Advanced', icon: 'agile' },
      { name: 'AI-Assisted Dev', level: 'Advanced', icon: 'aidev' },
    ],
  },
]

// Flat list for the marquee strip.
export const skillMarquee = [
  'Java', 'Spring Boot', 'REST APIs', 'Microservices', 'React', 'Flutter',
  'MongoDB', 'PostgreSQL', 'Oracle', 'SQL Server', 'Firebase', 'RabbitMQ',
  'OpenAI', 'Twilio', 'JWT', 'Git', 'Maven', 'Agile',
]

// Visual weighting for the expertise corner-dot + tooltip.
export const levelMeta = {
  Expert: { tone: 'brand', dots: 3 },
  Advanced: { tone: 'accent', dots: 2 },
  Proficient: { tone: 'muted', dots: 1 },
  Exploring: { tone: 'faint', dots: 1 },
}

export default skillCategories
