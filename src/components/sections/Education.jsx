import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { Icon } from '@/components/common/Icon'
import { education } from '@/data/education'
import { staggerContainer, childFadeUp, viewportOnce } from '@/animations/variants'

export function Education() {
  const [primary, ...rest] = education

  return (
    <section id="education" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Training Arc"
          title="Every hero trains first."
          description="Computer Science, and the discipline of doing the work well."
        />

        <div className="mt-12 space-y-5">
          {/* Highlighted degree */}
          <Reveal className="card relative overflow-hidden p-7">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand/[0.07] to-transparent" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <Icon name={primary.icon} className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold sm:text-xl">{primary.degree}</h3>
                  <p className="mt-1 font-medium text-muted">{primary.school}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-faint">
                    <MapPin className="h-3.5 w-3.5" />
                    {primary.location} · {primary.note}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                <span className="rounded-full bg-brand/10 px-4 py-1.5 text-sm font-bold text-brand">
                  {primary.score}
                </span>
                <span className="text-sm font-medium text-muted">{primary.period}</span>
              </div>
            </div>
          </Reveal>

          {/* School milestones */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-5 sm:grid-cols-2"
          >
            {rest.map((e) => (
              <motion.div key={e.degree} variants={childFadeUp} className="card card-hover p-6">
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-elevated text-muted">
                    <Icon name={e.icon} className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border bg-elevated px-3 py-1 text-sm font-bold text-ink">
                    {e.score}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold">{e.degree}</h3>
                <p className="mt-1 text-sm text-muted">{e.school}</p>
                <p className="mt-1 text-xs text-faint">{e.period}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Education
