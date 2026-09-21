// Skills are shown as floating icon badges grouped by category — level is
// encoded as a small corner dot + revealed on hover/focus (see SkillIcon.jsx
// for the icon registry).

export const primarySkills = [
  { name: 'Claude Code', icon: 'claudecode' },
  { name: 'SDD', icon: 'sdd' },
  { name: 'Mobile Dev', icon: 'mobile' },
  { name: 'React', icon: 'react' },
  { name: 'Spring Boot', icon: 'springboot' },
  { name: 'Java', icon: 'java' },
  { name: 'SQL', icon: 'sql' },
]

export const skillCategories = [
  {
    name: 'AI in the Loop',
    icon: 'Sparkles',
    skills: [
      { name: 'Claude Code', level: 'Advanced', icon: 'claudecode' },
      { name: 'Spec-Driven Development', level: 'Advanced', icon: 'sdd' },
      { name: 'AI-Assisted Dev', level: 'Advanced', icon: 'aidev' },
      { name: 'OpenAI / LLMs', level: 'Advanced', icon: 'openai' },
    ],
  },
  {
    name: 'Product & Mobile',
    icon: 'Layout',
    skills: [
      { name: 'Mobile Development', level: 'Advanced', icon: 'mobile' },
      { name: 'React', level: 'Advanced', icon: 'react' },
      { name: 'JavaScript', level: 'Advanced', icon: 'javascript' },
      { name: 'Flutter', level: 'Advanced', icon: 'flutter' },
      { name: 'Tailwind / Bootstrap', level: 'Proficient', icon: 'tailwind', icon2: 'bootstrap' },
    ],
  },
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
      { name: 'MongoDB', level: 'Advanced', icon: 'mongodb' },
      { name: 'Oracle', level: 'Advanced', icon: 'oracle' },
      { name: 'SQL Server', level: 'Advanced', icon: 'sqlserver' },
      { name: 'Query Optimization', level: 'Advanced', icon: 'queryopt' },
    ],
  },
  {
    name: 'Delivery & Tools',
    icon: 'Wrench',
    skills: [
      { name: 'Git / GitHub', level: 'Expert', icon: 'git', icon2: 'github' },
      { name: 'Customer Delivery', level: 'Advanced', icon: 'delivery' },
      { name: 'Agile / Scrum', level: 'Advanced', icon: 'agile' },
      { name: 'Postman', level: 'Advanced', icon: 'postman' },
      { name: 'Firebase / FCM', level: 'Proficient', icon: 'firebase' },
    ],
  },
]

// Flat list for the marquee strip.
export const skillMarquee = [
  'Claude Code', 'Spec-Driven Dev', 'Mobile Development', 'React', 'Flutter',
  'AI-Assisted Dev', 'OpenAI', 'Java', 'Spring Boot', 'REST APIs',
  'Microservices', 'SQL', 'MongoDB', 'Git', 'Agile', 'Postman',
]

// MCU universe's tech-stack grouping. Lives here (not in mcu/content.js) so all
// skill/tech content has a single home — edit both views in one file.
export const mcuTechGroups = [
  {
    label: 'AI in the loop',
    tone: 'blue',
    items: [
      'Claude Code',
      'Spec-Driven Development',
      'AI-Assisted Dev',
      'OpenAI / LLMs',
      'Agentic systems',
    ],
  },
  {
    label: 'Product & mobile',
    tone: 'blue',
    items: ['Mobile Development', 'React', 'JavaScript', 'Flutter', 'Tailwind / Bootstrap'],
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
    ],
  },
  {
    label: 'Delivery & tools',
    tone: 'neutral',
    items: ['Git / GitHub', 'Customer delivery', 'Agile', 'Postman', 'Firebase / FCM'],
    trailing: { label: 'Kafka — exploring', tone: 'red' },
  },
]

// Visual weighting for the expertise corner-dot + tooltip.
export const levelMeta = {
  Expert: { tone: 'brand', dots: 3 },
  Advanced: { tone: 'accent', dots: 2 },
  Proficient: { tone: 'muted', dots: 1 },
  Exploring: { tone: 'faint', dots: 1 },
}

export default skillCategories
