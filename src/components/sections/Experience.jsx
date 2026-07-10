import { Building2, MapPin, ArrowRight, TerminalSquare } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { SectionBackdrop } from '@/components/common/Backgrounds'
import { SpiderPanel } from '@/components/common/SpiderPanel'
import { TechPill } from '@/components/common/TechPill'
import { experience } from '@/data/experience'

// Presented like a CLI status log, not a wall of prose — the format itself
// is meant to read as "this person thinks in systems."
function TerminalLog({ job }) {
  const slug = job.company.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e0920] shadow-card">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-1 flex items-center gap-1.5 text-xs text-slate-400">
          <TerminalSquare className="h-3.5 w-3.5" />
          {slug}.log
        </span>
      </div>

      <div className="px-5 py-5 font-mono text-[13px] leading-relaxed sm:px-6 sm:py-6">
        <div className="flex gap-2">
          <span className="shrink-0 text-emerald-400">$</span>
          <span className="text-slate-500">whoami</span>
        </div>
        <p className="mt-1.5 pl-4 text-slate-100">{job.summary}</p>

        <div className="mt-5 flex gap-2">
          <span className="shrink-0 text-emerald-400">$</span>
          <span className="text-slate-500">ship --highlights</span>
        </div>
        <div className="mt-2.5 space-y-2.5 pl-4">
          {job.highlights.map((h) => (
            <div key={h.title} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
              <span className="flex shrink-0 items-baseline gap-2 sm:w-[14rem]">
                <span className="text-emerald-400">✓</span>
                <span className="font-semibold text-slate-100">{h.title}</span>
              </span>
              <span className="text-slate-500">{h.desc}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <span className="text-emerald-400">$</span>
          <span className="inline-block h-4 w-[7px] animate-blink bg-slate-400" aria-hidden />
        </div>
      </div>
    </div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section relative overflow-hidden">
      <SectionBackdrop tint="brand" corner="tl" />
      <div className="container-px relative">
        <div className="flex items-start justify-between gap-8">
          <SectionHeading
            eyebrow="The Day Job"
            title="Shipping enterprise systems into production."
            description="Where I learned to make backends fast, search smart, and documents process themselves."
          />
          <Reveal delay={0.15} className="hidden shrink-0 lg:block">
            <SpiderPanel
              src="/images/spidey/legs_stretched.png"
              alt="Spider-Man leaned back, feet up on the desk, coding one-handed"
              caption="Just another day."
              accent="brand"
              rotate={-3}
              size="sm"
            />
          </Reveal>
        </div>

        <div className="mt-14 space-y-8">
          {experience.map((job) => (
            <Reveal key={job.company} className="card overflow-hidden">
              {/* Header */}
              <div className="flex flex-col gap-5 border-b border-border bg-elevated/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{job.company}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </p>
                  </div>
                </div>
                <span className="inline-flex h-fit items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-muted">
                  {job.period}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                {/* Role progression */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                  {job.roles.map((r, i) => (
                    <div key={r.title} className="flex items-center gap-2">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                          i === job.roles.length - 1
                            ? 'bg-brand/10 text-brand'
                            : 'bg-elevated text-muted'
                        }`}
                      >
                        {r.title}
                      </span>
                      {i < job.roles.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-faint" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Metrics — the numbers do the talking */}
                <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {job.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-border bg-elevated/50 p-4"
                    >
                      <div className="text-2xl font-bold text-brand">{m.value}</div>
                      <div className="mt-1 text-xs leading-snug text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Terminal-style log of what actually shipped */}
                <div className="mt-8">
                  <TerminalLog job={job} />
                </div>

                {/* Stack */}
                <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                  {job.stack.map((s) => (
                    <TechPill key={s}>{s}</TechPill>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
