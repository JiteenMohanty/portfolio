import { Link } from 'react-router-dom'
import { ArrowUpRight, Trophy } from 'lucide-react'
import { Badge } from '@/components/common/Badge'
import { TechPill } from '@/components/common/TechPill'
import { ProductMock } from '@/components/projects/ProductMock'
import { getAccent } from '@/utils/accents'
import { cn } from '@/utils/cn'

export function ProjectCard({ project, featured = false }) {
  const a = getAccent(project.accent)
  const isAward = project.status?.tone === 'award'

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        'card card-hover group relative flex flex-col overflow-hidden',
        featured && 'lg:grid lg:grid-cols-2 lg:items-stretch',
      )}
    >
      {/* Visual */}
      <div
        className={cn(
          'relative border-b border-border bg-elevated/30',
          featured ? 'aspect-[16/10] lg:aspect-auto lg:border-b-0 lg:border-r' : 'aspect-[16/10]',
        )}
      >
        <ProductMock accentKey={project.accent} dense={!featured} />
        <div className="absolute left-3 top-3 z-10">
          <span className={cn('chip border-transparent', a.bg, a.text)}>{project.type}</span>
        </div>
        <div className="absolute right-3 top-3 z-10">
          <Badge tone={project.status.tone} icon={isAward ? Trophy : undefined} dot={!isAward}>
            {project.status.label}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-pretty text-xl font-bold leading-snug">{project.name}</h3>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        </div>

        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, featured ? 7 : 5).map((s) => (
            <TechPill key={s}>{s}</TechPill>
          ))}
          {project.stack.length > (featured ? 7 : 5) && (
            <span className="inline-flex items-center px-1 text-xs text-faint">
              +{project.stack.length - (featured ? 7 : 5)}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-xs font-medium text-faint">
            {project.role} · {project.period}
          </span>
          <span className={cn('text-sm font-semibold transition-colors', a.text)}>
            View case study
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
