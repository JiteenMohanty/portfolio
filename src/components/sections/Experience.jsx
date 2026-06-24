import { motion } from 'framer-motion'
import { Building2, MapPin, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { Icon } from '@/components/common/Icon'
import { TechPill } from '@/components/common/TechPill'
import { experience } from '@/data/experience'
import { staggerContainer, childFadeUp, viewportOnce } from '@/animations/variants'

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Experience"
          title="Shipping enterprise systems into production."
          description="Where I learned to make backends fast, search smart, and documents process themselves."
        />

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

                <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-muted">
                  {job.summary}
                </p>

                {/* Metrics */}
                <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
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

                {/* Highlights */}
                <motion.div
                  variants={staggerContainer(0.07)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className="mt-8 grid gap-4 sm:grid-cols-2"
                >
                  {job.highlights.map((h) => (
                    <motion.div
                      key={h.title}
                      variants={childFadeUp}
                      className="group flex gap-4 rounded-2xl border border-transparent p-3 transition-colors hover:border-border hover:bg-elevated/40"
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-strong dark:text-accent">
                        <Icon name={h.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-ink">{h.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{h.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

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
