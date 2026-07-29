import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SectionBackdrop, CornerWeb } from '@/components/common/Backgrounds'
import { Icon } from '@/components/common/Icon'
import { navLinks } from '@/constants/navigation'
import { staggerContainer, childFadeUp, viewportOnce } from '@/animations/variants'
import { cn } from '@/utils/cn'

const accentTile = {
  brand: 'bg-brand/10 text-brand',
  accent: 'bg-accent/10 text-accent-strong dark:text-accent',
  pop: 'bg-pop/10 text-pop',
}

// The hub. Instead of scrolling through ten stacked sections, visitors pick
// a "dimension" to jump into — each portal routes to a short, focused page.
export function PortalHub() {
  return (
    <section id="portals" className="section relative overflow-hidden">
      <SectionBackdrop tint="pop" corner="bl" />
      <div className="container-px relative">
        <SectionHeading
          align="center"
          eyebrow="Enter the Spider-Verse"
          title="Pick a dimension."
          description="No endless scroll. Every door opens to one short, focused corner of the story — jump straight to what you came for."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {navLinks.map((l) => (
            <motion.div key={l.to} variants={childFadeUp}>
              <Link
                to={l.to}
                className="card card-hover group relative flex h-full flex-col overflow-hidden p-6"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 text-ink/[0.05] transition-colors group-hover:text-ink/[0.09]">
                  <CornerWeb size={130} />
                </div>

                <span className={cn('grid h-12 w-12 place-items-center rounded-2xl', accentTile[l.accent] ?? accentTile.brand)}>
                  <Icon name={l.icon} className="h-6 w-6" />
                </span>

                <h3 className="mt-5 font-comic text-2xl uppercase tracking-wide text-ink">
                  {l.label}
                </h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">
                  {l.blurb}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Enter
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PortalHub
