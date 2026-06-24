import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { Icon } from '@/components/common/Icon'
import { skillCategories, primarySkills, skillMarquee, levelMeta } from '@/data/skills'
import { staggerContainer, childFadeUp, viewportOnce } from '@/animations/variants'
import { cn } from '@/utils/cn'

const dotTone = {
  brand: 'bg-brand',
  accent: 'bg-accent',
  muted: 'bg-muted',
  faint: 'bg-faint/60',
}

function LevelBadge({ level }) {
  const meta = levelMeta[level] ?? levelMeta.Proficient
  return (
    <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-faint">
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              i < meta.dots ? dotTone[meta.tone] : 'bg-border',
            )}
          />
        ))}
      </span>
      {level}
    </span>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Skills"
          title="A backend-first toolkit, with range."
          description="Deep where it counts — Java, Spring Boot and data — and comfortable across the stack, mobile, and AI."
        />

        {/* Core skills */}
        <Reveal className="mt-10 flex flex-wrap gap-2.5">
          {primarySkills.map((s) => (
            <span
              key={s}
              className="rounded-xl border border-brand/25 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand"
            >
              {s}
            </span>
          ))}
        </Reveal>

        {/* Categories */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((cat) => (
            <motion.div key={cat.name} variants={childFadeUp} className="card card-hover p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-elevated text-brand">
                  <Icon name={cat.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-ink">{cat.name}</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {cat.skills.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted">{s.name}</span>
                    <LevelBadge level={s.level} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee */}
        <div className="relative mt-10 overflow-hidden mask-fade-x py-2">
          <div className="flex w-max animate-marquee gap-3">
            {[...skillMarquee, ...skillMarquee].map((s, i) => (
              <span
                key={i}
                className="whitespace-nowrap rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
