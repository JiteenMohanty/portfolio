import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { cn } from '@/utils/cn'

const VISITED_KEY = 'jiteen-portfolio-visited'

// Counts unique visitors, not page views. "Unique" is enforced with a
// localStorage flag — the first visit POSTs (increments), every visit after
// that just GETs (reads). That means it resets if someone clears site data
// or comes back from a different browser/device — an inherent limit of any
// approach that doesn't require visitors to log in.
export function VisitorCounter({ className }) {
  const [count, setCount] = useState(null)

  useEffect(() => {
    const alreadyCounted = localStorage.getItem(VISITED_KEY)
    const method = alreadyCounted ? 'GET' : 'POST'
    if (!alreadyCounted) localStorage.setItem(VISITED_KEY, '1')

    fetch('/api/visitors', { method })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setCount(data.count))
      .catch(() => {})
  }, [])

  if (count === null) return null

  // Colour comes from the caller (contexts differ: dark sidebar vs MCU); the
  // icon inherits currentColor.
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs', className)}>
      <Eye className="h-3.5 w-3.5" />
      {count.toLocaleString()} visitors
    </span>
  )
}

export default VisitorCounter
