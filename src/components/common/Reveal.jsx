import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/animations/variants'

// Reveals children with a subtle fade-up when scrolled into view.
export function Reveal({ children, delay = 0, className, as = 'div', ...rest }) {
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export default Reveal
