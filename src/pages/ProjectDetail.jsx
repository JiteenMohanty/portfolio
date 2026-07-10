import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Github, ExternalLink, Trophy, Users, Target,
  Lightbulb, Puzzle, CheckCircle2, Lock, CircleDot, Scale,
} from 'lucide-react'
import { projects, getProject } from '@/data/projects'
import { Badge } from '@/components/common/Badge'
import { TechPill } from '@/components/common/TechPill'
import { Icon } from '@/components/common/Icon'
import { Reveal } from '@/components/common/Reveal'
import { GridBackdrop } from '@/components/common/Backgrounds'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { TeamPhoto } from '@/components/projects/TeamPhoto'
import { SpiderPanel } from '@/components/common/SpiderPanel'
import { ArchitectureDiagram } from '@/components/projects/ArchitectureDiagram'
import { getAccent } from '@/utils/accents'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { staggerContainer, childFadeUp, viewportOnce } from '@/animations/variants'
import { cn } from '@/utils/cn'

function Block({ eyebrow, title, children, className }) {
  return (
    <Reveal className={cn('mx-auto max-w-5xl', className)}>
      <div className="mb-6">
        <span className="eyebrow">
          <span className="h-px w-6 bg-brand/60" aria-hidden />
          {eyebrow}
        </span>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{title}</h2>
      </div>
      {children}
    </Reveal>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  useDocumentTitle(
    project ? `${project.name} — Jiteen Mohanty` : 'Project not found',
    project?.summary,
  )

  if (!project) {
    return (
      <div className="container-px flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold text-brand">404</p>
        <h1 className="mt-2 text-2xl font-bold">Project not found</h1>
        <Link to="/#projects" className="btn-primary mt-6">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
      </div>
    )
  }

  const a = getAccent(project.accent)
  const isAward = project.status?.tone === 'award'
  const idx = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <article className="pb-12 pt-28 sm:pt-32">
      {/* Header */}
      <header className="relative overflow-hidden">
        <GridBackdrop className="opacity-40" />
        <div className="container-px relative">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>

          <div className="mx-auto mt-8 max-w-5xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={cn('chip border-transparent', a.bg, a.text)}>{project.type}</span>
              <Badge tone={project.status.tone} icon={isAward ? Trophy : undefined} dot={!isAward}>
                {project.status.label}
              </Badge>
              {project.team && (
                <span className="chip">
                  <Users className="h-3.5 w-3.5" /> {project.team}
                </span>
              )}
              {project.context && (
                <span className="chip">
                  <Scale className="h-3.5 w-3.5" /> {project.context}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-balance text-3xl font-bold leading-tight sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-muted">
              {project.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-faint">
              <span><span className="text-muted">Role:</span> {project.role}</span>
              <span className="hidden h-3 w-px bg-border sm:block" />
              <span><span className="text-muted">Timeline:</span> {project.period}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <TechPill key={s} accent>
                  {s}
                </TechPill>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {project.links?.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <ExternalLink className="h-4 w-4" /> Live site
                </a>
              )}
              {project.links?.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Github className="h-4 w-4" /> Source
                </a>
              )}
              {project.links?.note && (
                <span className="inline-flex items-center gap-1.5 text-sm text-faint">
                  <Lock className="h-3.5 w-3.5" /> {project.links.note}
                </span>
              )}
            </div>
          </div>

          {/* Hero visual — winning team photo when available, else gallery */}
          <Reveal className="mx-auto mt-10 max-w-5xl" delay={0.1}>
            {project.photo ? (
              <TeamPhoto photo={project.photo} teamMembers={project.teamMembers} />
            ) : (
              <ProjectGallery project={project} />
            )}
          </Reveal>
        </div>
      </header>

      {/* Body */}
      <div className="container-px mt-20 space-y-20">
        {/* Overview */}
        <Block eyebrow="Overview" title="What it is">
          <p className="text-pretty text-lg leading-relaxed text-muted">{project.overview}</p>
        </Block>

        {/* Problem / Solution */}
        <Reveal className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="card p-7">
            <div className="flex items-center gap-2.5 text-rose-500">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-500/10">
                <Target className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-ink">The Problem</h3>
            </div>
            <p className="mt-4 text-pretty leading-relaxed text-muted">{project.problem}</p>
          </div>
          <div className="card p-7">
            <div className="flex items-center gap-2.5 text-accent-strong dark:text-accent">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10">
                <Lightbulb className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-ink">The Solution</h3>
            </div>
            <p className="mt-4 text-pretty leading-relaxed text-muted">{project.solution}</p>
          </div>
        </Reveal>

        {/* Responsibilities */}
        {project.responsibilities?.length > 0 && (
          <Block eyebrow="My role" title="What I owned">
            <div className="grid gap-3 sm:grid-cols-2">
              {project.responsibilities.map((r) => (
                <div key={r} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                  <CheckCircle2 className={cn('h-[18px] w-[18px] shrink-0', a.text)} />
                  <span className="text-sm text-muted">{r}</span>
                </div>
              ))}
            </div>
          </Block>
        )}

        {/* Features */}
        <Block eyebrow="Features" title="What it does">
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {project.features.map((f) => (
              <motion.div key={f.title} variants={childFadeUp} className="card card-hover p-5">
                <span className={cn('grid h-10 w-10 place-items-center rounded-xl', a.bg, a.text)}>
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Block>

        {/* Architecture */}
        <Block eyebrow="Architecture" title="How it's built">
          <p className="mb-8 max-w-3xl text-pretty leading-relaxed text-muted">
            {project.architecture.summary}
          </p>
          <ArchitectureDiagram architecture={project.architecture} accentKey={project.accent} />
        </Block>

        {/* Challenges */}
        <Block eyebrow="Challenges" title="The hard parts">
          <SpiderPanel
            src="/images/spidey/hands.png"
            alt="Spider-Man with his head in his hands at a stack overflow error"
            caption="Every project has one of these."
            accent={project.accent === 'amber' ? 'pop' : 'brand'}
            rotate={-2}
            size="sm"
            className="float-right ml-6 mb-4 hidden sm:block"
          />
          <div className="space-y-4">
            {project.challenges.map((c, i) => (
              <div key={c.title} className="card flex gap-4 p-6">
                <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', a.bg, a.text)}>
                  {i === 0 ? <Puzzle className="h-5 w-5" /> : <CircleDot className="h-5 w-5" />}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-pretty leading-relaxed text-muted">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* Results */}
        <Block eyebrow="Results" title="The outcome">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {project.results.map((r) => (
              <div key={r.label} className={cn('rounded-2xl border p-5 text-center', a.border, a.bg)}>
                <div className={cn('text-3xl font-bold', a.text)}>{r.value}</div>
                <div className="mt-2 text-xs leading-snug text-muted">{r.label}</div>
              </div>
            ))}
          </div>
        </Block>

        {/* Next project */}
        <Reveal className="mx-auto max-w-5xl">
          <Link
            to={`/projects/${next.slug}`}
            className="card card-hover group flex items-center justify-between gap-4 p-6 sm:p-8"
          >
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-faint">
                Next project
              </span>
              <h3 className="mt-1 text-xl font-bold transition-colors group-hover:text-brand">
                {next.name}
              </h3>
            </div>
            <ArrowRight className="h-6 w-6 shrink-0 text-faint transition-all group-hover:translate-x-1 group-hover:text-brand" />
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
