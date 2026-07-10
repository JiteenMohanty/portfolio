import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { Icon } from '@/components/common/Icon'
import { SkillGlyph } from '@/components/common/SkillIcon'
import { skillCategories, primarySkills, skillMarquee, levelMeta } from '@/data/skills'
import { staggerContainer, childFadeUp, viewportOnce } from '@/animations/variants'
import { cn } from '@/utils/cn'

const dotTone = {
  brand: 'bg-brand',
  accent: 'bg-accent',
  muted: 'bg-muted',
  faint: 'bg-faint/60',
}

// A floating rounded-square logo tile. Level is encoded as a small corner
// dot and spelled out in a hover/focus tooltip — no "name : level" text row.
function SkillBadge({ skill, index = 0, size = 'md' }) {
  const meta = skill.level ? levelMeta[skill.level] : null
  const delay = (index % 6) * 0.35
  const duration = 3.6 + (index % 4) * 0.3
  const dims = size === 'lg' ? 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]' : 'h-14 w-14 sm:h-16 sm:w-16'
  const iconDim = size === 'lg' ? 'h-7 w-7' : 'h-6 w-6'

  return (
    <div className="group relative flex flex-col items-center gap-2">
      <div
        tabIndex={0}
        role="img"
        aria-label={skill.level ? `${skill.name} — ${skill.level}` : skill.name}
        className={cn(
          'relative grid animate-wobble place-items-center rounded-2xl border border-white/10 bg-[#150e28] shadow-soft transition-transform duration-300 will-change-transform hover:animate-none hover:scale-110 focus-visible:animate-none focus-visible:scale-110',
          dims,
        )}
        style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      >
        {skill.icon2 ? (
          <span className="flex items-center gap-1">
            <SkillGlyph skillKey={skill.icon} className={iconDim} />
            <SkillGlyph skillKey={skill.icon2} className={iconDim} />
          </span>
        ) : (
          <SkillGlyph skillKey={skill.icon} className={iconDim} />
        )}

        {meta && (
          <span
            className={cn('absolute -right-1 -top-1 h-3 w-3 rounded-full ring-2 ring-base', dotTone[meta.tone])}
            aria-hidden
          />
        )}

        {/* Tooltip */}
        <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-surface px-2.5 py-1 text-2xs font-medium text-ink opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          {skill.name}
          {skill.level ? ` · ${skill.level}` : ''}
        </span>
      </div>
      <span className="max-w-[4.5rem] text-center text-2xs leading-tight text-faint">{skill.name}</span>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Powers"
          title="A backend-first power set, with range."
          description="Deep where it counts — Java, Spring Boot and data — and comfortable across the stack, mobile, and AI."
        />

        {/* Core skills */}
        <Reveal className="mt-12 flex flex-wrap justify-center gap-6 sm:justify-start">
          {primarySkills.map((s, i) => (
            <SkillBadge key={s.name} skill={s} index={i} size="lg" />
          ))}
        </Reveal>

        {/* Level legend */}
        <Reveal className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-2xs text-faint">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand" /> Expert
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" /> Advanced
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted" /> Proficient
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-faint/60" /> Exploring
          </span>
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
            <motion.div key={cat.name} variants={childFadeUp} className="card p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-elevated text-brand">
                  <Icon name={cat.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-ink">{cat.name}</h3>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-4 gap-y-7">
                {cat.skills.map((s, i) => (
                  <SkillBadge key={s.name} skill={s} index={i} />
                ))}
              </div>
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
