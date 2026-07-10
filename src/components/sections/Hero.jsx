import { motion } from 'framer-motion'
import {
  ArrowRight, Download, Server, Code2, Database, Sparkles, Workflow, Boxes,
} from 'lucide-react'
import { GridBackdrop, Aurora } from '@/components/common/Backgrounds'
import { SocialLinks } from '@/components/common/SocialLinks'
import { profile } from '@/data/profile'
import { staggerContainer, childFadeUp } from '@/animations/variants'

const nodes = [
  { label: 'Spring Boot', Icon: Server, x: 17, y: 15, delay: 0 },
  { label: 'React', Icon: Code2, x: 82, y: 11, delay: 0.6 },
  { label: 'OpenAI', Icon: Sparkles, x: 90, y: 52, delay: 1.1 },
  { label: 'MongoDB', Icon: Database, x: 73, y: 86, delay: 0.3 },
  { label: 'REST API', Icon: Workflow, x: 12, y: 76, delay: 0.9 },
]

function HeroGraphic({ className = '' }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[460px] ${className}`}>
      {/* connecting lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {nodes.map((n) => (
          <line
            key={n.label}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="rgb(var(--brand))"
            strokeWidth="0.4"
            strokeOpacity="0.35"
            strokeDasharray="1.5 2"
          />
        ))}
      </svg>

      {/* dashed orbit ring */}
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border animate-spin-slow" />

      {/* center node */}
      <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-gradient-to-br from-brand to-accent text-white shadow-glow">
        <div className="text-center">
          <Boxes className="mx-auto h-7 w-7" />
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider">
            build
          </span>
        </div>
      </div>

      {/* tech chips */}
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${n.delay}s` }}
        >
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-ink shadow-soft backdrop-blur">
            <n.Icon className="h-3.5 w-3.5 text-brand" />
            {n.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      <GridBackdrop />
      <Aurora />

      <div className="container-px relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="show">
          {profile.available && (
            <motion.div variants={childFadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availabilityNote}
              <span className="text-faint">· 🇮🇳 India</span>
            </motion.div>
          )}

          <motion.p variants={childFadeUp} className="text-base font-medium text-brand">
            {profile.hero.greeting}
          </motion.p>

          <motion.h1
            variants={childFadeUp}
            className="mt-2 text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            I build <span className="gradient-text">products</span> that solve real-world problems.
          </motion.h1>

          <motion.p
            variants={childFadeUp}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.hero.subheadline}
          </motion.p>

          <motion.div variants={childFadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={profile.resumeUrl} download className="btn-ghost">
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={childFadeUp} className="mt-8 flex items-center gap-4">
            <SocialLinks />
            <span className="hidden h-px w-10 bg-border sm:block" />
            <span className="hidden text-sm text-faint sm:block">{profile.altTitle}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="hidden lg:block"
        >
          <HeroGraphic />
        </motion.div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-muted md:flex"
      >
        <span className="text-2xs font-medium uppercase tracking-widest">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-border p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-muted" />
        </span>
      </a>
    </section>
  )
}

export default Hero
