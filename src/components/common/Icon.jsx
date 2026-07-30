// Registry that maps the string icon names used in /data to lucide icons.
// Explicit imports keep tree-shaking effective (small bundle).
import {
  Server, Search, FileText, Gauge, LifeBuoy, Users, ScanLine, ShieldCheck,
  LayoutDashboard, Wrench, GitBranch, Bell, MessageCircle, Smartphone, Database,
  Send, KeyRound, FolderKanban, Sparkles, FileSearch, Workflow, BellRing,
  Monitor, Radio, GraduationCap, Compass, Layers, Layout, School, Briefcase,
  Rocket, Trophy, Telescope, Code2, Bot, Star, CalendarCheck, Scale, ThumbsUp,
  Crosshair, Bug, Network, Gavel, Activity, KeySquare, Boxes, Target, Radar,
  Link2, FileCheck2, Home,
} from 'lucide-react'

const registry = {
  Server, Search, FileText, Gauge, LifeBuoy, Users, ScanLine, ShieldCheck,
  LayoutDashboard, Wrench, GitBranch, Bell, MessageCircle, Smartphone, Database,
  Send, KeyRound, FolderKanban, Sparkles, FileSearch, Workflow, BellRing,
  Monitor, Radio, GraduationCap, Compass, Layers, Layout, School, Briefcase,
  Rocket, Trophy, Telescope, Code2, Bot, Star, CalendarCheck, Scale, ThumbsUp,
  Crosshair, Bug, Network, Gavel, Activity, KeySquare, Boxes, Target, Radar,
  Link2, FileCheck2, Home,
}

// kind -> icon name for the journey timeline.
export const kindIcon = {
  education: 'GraduationCap',
  work: 'Briefcase',
  project: 'Rocket',
  award: 'Trophy',
  future: 'Telescope',
}

export function Icon({ name, ...props }) {
  const Cmp = registry[name] ?? Code2
  return <Cmp {...props} />
}

export default Icon
