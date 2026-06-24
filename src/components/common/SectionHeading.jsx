import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { staggerContainer, childFadeUp, viewportOnce } from '@/animations/variants'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}) {
  const centered = align === 'center'
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        'flex flex-col gap-4',
        centered && 'items-center text-center',
        'max-w-2xl',
        centered && 'mx-auto',
        className,
      )}
    >
      {eyebrow && (
        <motion.span variants={childFadeUp} className="eyebrow">
          <span className="h-px w-6 bg-brand/60" aria-hidden />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={childFadeUp}
        className="text-balance text-3xl font-bold leading-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={childFadeUp}
          className="text-pretty text-base leading-relaxed text-muted sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeading
