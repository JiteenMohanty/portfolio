export const experience = [
  {
    company: 'Hansa Solutions',
    location: 'Hyderabad, India',
    period: 'Feb 2024 – May 2026',
    summary:
      'Owned backend services and data solutions powering insurance policy administration, customer management, and business-process automation — growing from trainee to associate while shipping into production.',
    // Role progression within the company
    roles: [
      { title: 'Trainee Software Developer', period: 'Feb 2024' },
      { title: 'Software Developer', period: '2024' },
      { title: 'Associate Software Developer', period: '2025 – Present' },
    ],
    highlights: [
      {
        icon: 'Server',
        title: 'Backend Service Development',
        desc: 'Designed and maintained enterprise backend services and RESTful APIs for insurance policy administration, customer management, and workflow automation — using layered architecture, dependency injection, and reusable service components.',
      },
      {
        icon: 'Search',
        title: 'Advanced Search Engine',
        desc: 'Built a dynamic multi-criteria search supporting partial and composite queries across customer, policy, and transaction datasets, with optimized retrieval strategies that improved search performance and UX.',
      },
      {
        icon: 'FileText',
        title: 'AI Document Processing',
        desc: 'Engineered automated document-ingestion workflows that integrate external AI/ML services to extract structured data from inbound emails and documents into standardized JSON for downstream systems.',
      },
      {
        icon: 'Gauge',
        title: 'Database Optimization',
        desc: 'Cut response times ~35% across SQL Server and Oracle through indexing strategies, execution-plan analysis, query optimization, and parallel query execution.',
      },
      {
        icon: 'LifeBuoy',
        title: 'Production Support',
        desc: 'Performed root-cause analysis across application and database layers, and collaborated with stakeholders on change requests, estimation, and Agile delivery in production environments.',
      },
    ],
    metrics: [
      { value: '~35%', label: 'Faster DB response times' },
      { value: '2+ yrs', label: 'Shipping to production' },
      { value: '3', label: 'Roles — trainee to associate' },
      { value: 'Enterprise', label: 'Insurance-grade systems' },
    ],
    stack: ['Java', 'Spring Boot', 'REST APIs', 'SQL Server', 'Oracle', 'Agile'],
  },
]

export default experience
