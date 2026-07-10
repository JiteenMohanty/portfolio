import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/common/SectionHeading'
import { funFacts } from '@/data/funFacts'
import { staggerContainer, childFadeUp, viewportOnce } from '@/animations/variants'

export function FunFacts() {
  return (
    <section id="fun" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Beyond the Mask"
          title="When the mask comes off."
          description="A few things that keep me curious, creative, and caffeinated."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {funFacts.map((f, i) => (
            <motion.div
              key={f.title}
              variants={childFadeUp}
              whileHover={{ y: -4 }}
              className={`card group relative overflow-hidden p-6 ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="absolute -right-6 -top-6 text-7xl opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-20">
                {f.emoji}
              </div>
              <div className="relative">
                <span className="text-3xl">{f.emoji}</span>
                <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </motion.div>
          ))}

          {/* terminal teaser card */}
          <motion.div
            variants={childFadeUp}
            className="card flex flex-col justify-between bg-[#0e0920] p-6 font-mono text-sm text-slate-300"
          >
            <div>
              <span className="text-emerald-400">jiteen@portfolio:~$</span>{' '}
              <span className="text-slate-100">whois jiteen</span>
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-emerald-400" />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Type <span className="text-indigo-300">whois jiteen</span> anywhere — there's a
              hidden terminal.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FunFacts
