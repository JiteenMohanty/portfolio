import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Icon, kindIcon } from '@/components/common/Icon'
import { journey } from '@/data/timeline'
import { viewportOnce } from '@/animations/variants'
import { cn } from '@/utils/cn'

const kindStyle = {
  education: { dot: 'bg-brand', chip: 'bg-brand/10 text-brand', icon: 'text-brand' },
  work: { dot: 'bg-accent', chip: 'bg-accent/10 text-accent-strong dark:text-accent', icon: 'text-accent-strong dark:text-accent' },
  project: { dot: 'bg-amber-400', chip: 'bg-amber-400/10 text-amber-600 dark:text-amber-300', icon: 'text-amber-500' },
  award: { dot: 'bg-amber-400', chip: 'bg-amber-400/10 text-amber-600 dark:text-amber-300', icon: 'text-amber-500' },
  future: { dot: 'bg-gradient-to-br from-brand to-accent', chip: 'bg-brand/10 text-brand', icon: 'text-brand' },
}

function Node({ item, align }) {
  const s = kindStyle[item.kind] ?? kindStyle.education
  const right = align === 'right'
  return (
    <div className={cn('flex flex-col', right ? 'lg:items-start' : 'lg:items-end')}>
      <div
        className={cn(
          'card card-hover w-full max-w-md p-5',
          right ? 'lg:text-left' : 'lg:text-right',
        )}
      >
        <div
          className={cn(
            'flex items-center gap-2.5',
            right ? 'lg:flex-row' : 'lg:flex-row-reverse',
          )}
        >
          <span className={cn('grid h-9 w-9 place-items-center rounded-xl bg-elevated', s.icon)}>
            <Icon name={kindIcon[item.kind]} className="h-[18px] w-[18px]" />
          </span>
          <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', s.chip)}>
            {item.year}
          </span>
        </div>
        <h3 className="mt-3 font-semibold text-ink">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
      </div>
    </div>
  )
}

export function Journey() {
  return (
    <section id="journey" className="section">
      <div className="container-px">
        <SectionHeading
          align="center"
          eyebrow="Journey"
          title="From first commit to building products."
          description="The path so far — school, a hackathon win, enterprise engineering, and products of my own."
        />

        <ol className="relative mx-auto mt-14 max-w-4xl">
          {/* spine */}
          <span
            aria-hidden
            className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-gradient-to-b from-border via-border to-transparent lg:left-1/2"
          />

          {journey.map((item, i) => {
            const align = i % 2 === 0 ? 'left' : 'right'
            const s = kindStyle[item.kind] ?? kindStyle.education
            return (
              <motion.li
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-7 last:mb-0 lg:grid lg:grid-cols-2 lg:gap-x-12"
              >
                {/* dot */}
                <span
                  className={cn(
                    'absolute left-4 top-5 z-10 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-base lg:left-1/2',
                    s.dot,
                  )}
                />
                <div
                  className={cn(
                    'pl-12 lg:pl-0',
                    align === 'left' ? 'lg:col-start-1 lg:pr-12' : 'lg:col-start-2 lg:pl-12',
                  )}
                >
                  <Node item={item} align={align} />
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Journey
