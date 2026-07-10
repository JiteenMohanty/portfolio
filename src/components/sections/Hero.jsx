import { motion } from 'framer-motion'
import {
  ArrowRight, Download, Server, Code2, Database, Sparkles, Workflow, Boxes,
} from 'lucide-react'
import { HalftoneBackdrop, Aurora, CornerWeb } from '@/components/common/Backgrounds'
import { SocialLinks } from '@/components/common/SocialLinks'
import { profile } from '@/data/profile'
import { staggerContainer, childFadeUp } from '@/animations/variants'

const nodes = [
  { label: 'Spring Boot', Icon: Server, x: 17, y: 15, delay: 0, rot: -4 },
  { label: 'React', Icon: Code2, x: 82, y: 11, delay: 0.6, rot: 3 },
  { label: 'OpenAI', Icon: Sparkles, x: 90, y: 52, delay: 1.1, rot: -3 },
  { label: 'MongoDB', Icon: Database, x: 73, y: 86, delay: 0.3, rot: 4 },
  { label: 'REST API', Icon: Workflow, x: 12, y: 76, delay: 0.9, rot: -2 },
]

// Extra unlabeled spokes so the web has a full frame, not just five threads.
const frameAnchors = [
  { x: 50, y: 2 },
  { x: 98, y: 30 },
  { x: 98, y: 78 },
  { x: 50, y: 98 },
  { x: 2, y: 78 },
  { x: 2, y: 30 },
]

// Concentric "capture spiral" rings, each an irregular polygon (not a
// perfect circle) so it reads as hand-spun silk rather than a target.
function webRing(radius, wobble) {
  const points = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2
    const r = radius + Math.sin(i * 2.3) * wobble
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`
  })
  return `M ${points.join(' L ')} Z`
}

// A little spider on a thread, swinging under the top edge.
function SpiderDangle({ className = '' }) {
  return (
    <div className={`pointer-events-none origin-top animate-swing ${className}`} aria-hidden>
      <div className="mx-auto h-24 w-px bg-ink/30 sm:h-32" />
      <svg viewBox="0 0 24 22" className="-mt-0.5 h-5 w-5 text-ink" aria-hidden>
        <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M9 9 C5 8 4 5 3 3" />
          <path d="M8.5 12 C4 12 2 10 1 8" />
          <path d="M9 15 C5 16 3 18 2 20" />
          <path d="M15 9 C19 8 20 5 21 3" />
          <path d="M15.5 12 C20 12 22 10 23 8" />
          <path d="M15 15 C19 16 21 18 22 20" />
        </g>
        <circle cx="12" cy="6" r="2.4" fill="currentColor" />
        <ellipse cx="12" cy="13.5" rx="3.6" ry="5" fill="currentColor" />
      </svg>
    </div>
  )
}

function HeroGraphic({ className = '' }) {
  const spokeTargets = [...nodes, ...frameAnchors]

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[460px] ${className}`}>
      {/* the web itself — radial spokes + sagging capture rings */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g stroke="rgb(var(--brand))" strokeWidth="0.35" strokeOpacity="0.4" fill="none">
          {spokeTargets.map((n, i) => (
            <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} />
          ))}
          <path d={webRing(14, 1)} />
          <path d={webRing(26, 1.4)} />
          <path d={webRing(38, 1.8)} strokeOpacity="0.28" />
          <path d={webRing(48, 2)} strokeOpacity="0.16" />
        </g>
      </svg>

      {/* center node — the hub the web is spun from */}
      <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-gradient-to-br from-brand to-pop text-white shadow-glow">
        <div className="text-center">
          <Boxes className="mx-auto h-7 w-7" />
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider">
            build
          </span>
        </div>
      </div>

      {/* THWIP! sticker */}
      <div className="absolute left-[60%] top-[30%] -rotate-6 rounded-lg border-2 border-[#18102c] bg-amber-300 px-2.5 py-0.5 font-comic text-base tracking-wider text-[#18102c] shadow-[3px_3px_0_0_#18102c]">
        THWIP!
      </div>

      {/* tech chips — caught in the web, each wrapped by a few strands */}
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${n.delay}s` }}
        >
          <div className="relative" style={{ transform: `rotate(${n.rot}deg)` }}>
            {/* silk wrapped over the top-left corner */}
            <svg viewBox="0 0 40 24" className="absolute -left-2 -top-2.5 h-5 w-8 text-ink/30" aria-hidden>
              <path d="M2 20 C6 10 14 4 22 2" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M6 22 C10 13 17 7 24 5" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-ink shadow-soft backdrop-blur">
              <n.Icon className="h-3.5 w-3.5 text-brand" />
              {n.label}
            </div>
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
      <HalftoneBackdrop />
      <Aurora />

      {/* corner web + dangling spider */}
      <div className="absolute right-0 top-0 -scale-x-100 text-ink/20" aria-hidden>
        <CornerWeb />
      </div>
      <SpiderDangle className="absolute right-[16%] top-0 hidden md:block" />

      <div className="container-px relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="show">
          {profile.available && (
            <motion.div variants={childFadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availabilityNote}
            </motion.div>
          )}

          {/* comic caption box */}
          <motion.p variants={childFadeUp} className="eyebrow flex !text-[17px]">
            {profile.hero.greeting}
          </motion.p>

          <motion.h1
            variants={childFadeUp}
            className="glitch mt-5 text-balance font-comic text-5xl font-normal uppercase leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl"
          >
            Your <span className="gradient-text">friendly neighborhood</span> full‑stack engineer.
          </motion.h1>

          <motion.p
            variants={childFadeUp}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.hero.subheadline}
          </motion.p>

          <motion.div variants={childFadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View Missions
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
