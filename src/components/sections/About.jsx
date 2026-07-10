import { motion } from 'framer-motion'
import { Sparkles, Compass, Hammer } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { profile } from '@/data/profile'
import { staggerContainer, childFadeUp, viewportOnce } from '@/animations/variants'

const traitIcons = { Curious: Compass, Practical: Sparkles, Builder: Hammer }

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Origin Story"
          title="I turn problems into APIs, APIs into products."
          description="Backend-first, product-minded, and curious about the humans on the other side of the screen."
        />

        {/* One short bio line — not an essay */}
        <Reveal className="mt-10 max-w-2xl">
          <p className="text-pretty text-lg leading-relaxed text-ink">{profile.aboutBio}</p>
        </Reveal>

        {/* Quick facts */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {profile.aboutStats.map((s) => (
            <motion.div
              key={s.label}
              variants={childFadeUp}
              className="rounded-2xl border border-border bg-elevated/50 p-4"
            >
              <div className="text-2xl font-bold text-brand">{s.value}</div>
              <div className="mt-1 text-xs leading-snug text-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Traits — compact chips, not paragraphs */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 flex flex-wrap gap-3"
        >
          {profile.traits.map((t) => {
            const Icon = traitIcons[t.label] ?? Sparkles
            return (
              <motion.div
                key={t.label}
                variants={childFadeUp}
                className="card card-hover flex items-center gap-3 px-5 py-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{t.label}</h3>
                  <p className="text-xs text-muted">{t.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Roles */}
        <Reveal className="mt-8 flex flex-wrap gap-2">
          {profile.roles.map((r) => (
            <span key={r} className="chip">
              {r}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default About
