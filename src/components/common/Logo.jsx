import { Link } from 'react-router-dom'

// Abstract "product-builder" monogram — two stacked blocks forming a J/M.
export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand))" />
          <stop offset="100%" stopColor="rgb(var(--accent))" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="9" fill="url(#logoGrad)" />
      <path
        d="M11 9.5h10M16 9.5v10.2a2.8 2.8 0 0 1-5.4 1.1"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22.5" cy="21" r="1.7" fill="white" />
    </svg>
  )
}

export function Logo({ withText = true }) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      aria-label="Jiteen Mohanty — home"
    >
      <span className="transition-transform duration-300 ease-out-expo group-hover:rotate-6">
        <LogoMark />
      </span>
      {withText && (
        <span className="text-[15px] font-bold tracking-tight text-ink">
          Jiteen<span className="text-brand">.</span>
        </span>
      )}
    </Link>
  )
}

export default Logo
