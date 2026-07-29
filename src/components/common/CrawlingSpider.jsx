import { useEffect, useRef, useState } from 'react'

// A small spider that, at random intervals, picks a random point on the
// screen and crawls to it — legs scuttling, body rotated toward its heading.
// It does NOT follow the cursor; it just wanders. Fixed + pointer-events-none
// so it never interferes with the page, and it stays put for anyone who
// prefers reduced motion.
const SIZE = 26 // px, roughly the spider's body+legs footprint

function randomPoint() {
  const m = 40 // keep it off the very edges
  return {
    x: m + Math.random() * (window.innerWidth - m * 2),
    y: m + Math.random() * (window.innerHeight - m * 2),
  }
}

export function CrawlingSpider() {
  const [enabled, setEnabled] = useState(false)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [angle, setAngle] = useState(0)
  const [crawling, setCrawling] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
    // Skip on coarse-pointer/small screens — less real estate, more in the way.
    if (window.innerWidth < 640) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Seed at a random spot, hidden just off the flow of attention.
    setPos(randomPoint())

    let cancelled = false
    const clearTimers = () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }

    const scheduleNext = () => {
      // Idle a while, then scuttle to a new random point.
      const idle = 4000 + Math.random() * 9000
      const t = setTimeout(() => {
        if (cancelled) return
        const target = randomPoint()
        setPos((prev) => {
          const dx = target.x - prev.x
          const dy = target.y - prev.y
          // Body points head-first along the direction of travel (+90° so the
          // SVG, which is drawn head-up, aligns with the heading vector).
          setAngle((Math.atan2(dy, dx) * 180) / Math.PI + 90)
          return prev
        })
        // Next tick: actually move (lets the rotation apply first).
        const t2 = setTimeout(() => {
          if (cancelled) return
          setCrawling(true)
          setPos(target)
          // Crawl duration scales a bit with distance; matches the CSS below.
          const t3 = setTimeout(() => {
            if (cancelled) return
            setCrawling(false)
            scheduleNext()
          }, 2600)
          timers.current.push(t3)
        }, 90)
        timers.current.push(t2)
      }, idle)
      timers.current.push(t)
    }

    scheduleNext()
    return () => {
      cancelled = true
      clearTimers()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60]"
      style={{
        width: SIZE,
        height: SIZE,
        transform: `translate3d(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px, 0) rotate(${angle}deg)`,
        transition: crawling
          ? 'transform 2.6s cubic-bezier(0.45, 0, 0.55, 1)'
          : 'transform 0.25s ease-out',
        willChange: 'transform',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={SIZE}
        height={SIZE}
        className={crawling ? 'spider-crawl' : ''}
      >
        <g
          className="text-ink dark:text-ink"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        >
          {/* left legs */}
          <path className="leg leg-l1" d="M10 8 C6 6 4 4 2 3" />
          <path className="leg leg-l2" d="M9.5 11 C5 10 3 9 1 8.5" />
          <path className="leg leg-l3" d="M9.5 13 C5 14 3 15 1 16" />
          <path className="leg leg-l4" d="M10 15.5 C6 17 4 19 2.5 21" />
          {/* right legs */}
          <path className="leg leg-r1" d="M14 8 C18 6 20 4 22 3" />
          <path className="leg leg-r2" d="M14.5 11 C19 10 21 9 23 8.5" />
          <path className="leg leg-r3" d="M14.5 13 C19 14 21 15 23 16" />
          <path className="leg leg-r4" d="M14 15.5 C18 17 20 19 21.5 21" />
        </g>
        {/* body */}
        <g className="text-ink" fill="currentColor">
          <circle cx="12" cy="8" r="2.3" />
          <ellipse cx="12" cy="13.5" rx="3.4" ry="4.6" />
        </g>
      </svg>
    </div>
  )
}

export default CrawlingSpider
