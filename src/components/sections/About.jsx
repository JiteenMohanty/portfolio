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
          eyebrow="About"
          title="I turn complex processes into software people love to use."
          description="Backend-first, product-minded, and curious about the humans on the other side of the screen."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Narrative */}
          <Reveal className="space-y-5">
            {profile.about.map((para, i) => (
              <p
                key={i}
                className={`text-pretty leading-relaxed ${
                  i === 0 ? 'text-lg text-ink' : 'text-muted'
                }`}
              >
                {para}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              {profile.roles.map((r) => (
                <span key={r} className="chip">
                  {r}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Traits */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {profile.traits.map((t) => {
              const Icon = traitIcons[t.label] ?? Sparkles
              return (
                <motion.div
                  key={t.label}
                  variants={childFadeUp}
                  className="card card-hover flex gap-4 p-5"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{t.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{t.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
