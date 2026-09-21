// Registry mapping skill keys to a real brand logo (react-icons) where one
// exists, or a thoughtful lucide stand-in for concepts that have no logo
// (e.g. "Microservices", "Query Optimization"). Colors are the brands' own,
// rendered on a fixed-dark tile so every logo keeps its real-world contrast
// regardless of the site's light/dark theme (same trick as the terminal).
import {
  SiSpringboot, SiMysql, SiMongodb, SiReact, SiJavascript, SiFlutter,
  SiTailwindcss, SiBootstrap, SiFirebase, SiRabbitmq, SiApachekafka,
  SiGit, SiGithub, SiPostman, SiApachemaven,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import {
  Workflow, Boxes, ShieldCheck, Database, Gauge, RefreshCw, Sparkles,
  Bot, MessageCircle, TerminalSquare, ClipboardCheck, Smartphone, Rocket,
} from 'lucide-react'

export const skillIconRegistry = {
  java: { Comp: FaJava, color: '#ED8B00' },
  springboot: { Comp: SiSpringboot, color: '#6DB33F' },
  rest: { Comp: Workflow, color: '#818CF8' },
  microservices: { Comp: Boxes, color: '#818CF8' },
  springsecurity: { Comp: ShieldCheck, color: '#34D399' },

  sql: { Comp: Database, color: '#38BDF8' },
  queryopt: { Comp: Gauge, color: '#FBBF24' },
  oracle: { Comp: Database, color: '#F80000' },
  sqlserver: { Comp: Database, color: '#CC2927' },
  mysql: { Comp: SiMysql, color: '#4479A1' },
  mongodb: { Comp: SiMongodb, color: '#47A248' },

  react: { Comp: SiReact, color: '#61DAFB' },
  javascript: { Comp: SiJavascript, color: '#F7DF1E' },
  flutter: { Comp: SiFlutter, color: '#02569B' },
  tailwind: { Comp: SiTailwindcss, color: '#38BDF8' },
  bootstrap: { Comp: SiBootstrap, color: '#7952B3' },

  firebase: { Comp: SiFirebase, color: '#FFCA28' },
  openai: { Comp: Bot, color: '#FFFFFF' },
  rabbitmq: { Comp: SiRabbitmq, color: '#FF6600' },
  kafka: { Comp: SiApachekafka, color: '#FFFFFF' },
  twilio: { Comp: MessageCircle, color: '#F22F46' },

  git: { Comp: SiGit, color: '#F05032' },
  github: { Comp: SiGithub, color: '#FFFFFF' },
  postman: { Comp: SiPostman, color: '#FF6C37' },
  maven: { Comp: SiApachemaven, color: '#C71A36' },
  agile: { Comp: RefreshCw, color: '#34D399' },
  aidev: { Comp: Sparkles, color: '#A78BFA' },

  // FDE / AI-in-the-loop toolkit
  claudecode: { Comp: TerminalSquare, color: '#D97757' },
  sdd: { Comp: ClipboardCheck, color: '#38BDF8' },
  mobile: { Comp: Smartphone, color: '#34D399' },
  delivery: { Comp: Rocket, color: '#F59E0B' },
}

export function SkillGlyph({ skillKey, className }) {
  const meta = skillIconRegistry[skillKey]
  if (!meta) return null
  const { Comp, color } = meta
  return <Comp className={className} style={{ color }} />
}

export default skillIconRegistry
