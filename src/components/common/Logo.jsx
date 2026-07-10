import { Link } from 'react-router-dom'

// "J" monogram caught in a web — red-to-magenta tile with faint web strands
// radiating from the top-left corner, and a tiny spider dangling on the dot.
export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand))" />
          <stop offset="100%" stopColor="rgb(var(--pop))" />
        </linearGradient>
        <clipPath id="logoClip">
          <rect x="2" y="2" width="28" height="28" rx="9" />
        </clipPath>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="9" fill="url(#logoGrad)" />
      {/* web strands from the top-left corner */}
      <g clipPath="url(#logoClip)" stroke="white" strokeWidth="0.9" opacity="0.32" fill="none">
        <path d="M2 11 A9 9 0 0 0 11 2" />
        <path d="M2 18 A16 16 0 0 0 18 2" />
        <path d="M2 25 A23 23 0 0 0 25 2" />
        <path d="M2 2 L14 14" />
        <path d="M2 8 L11 11" />
        <path d="M8 2 L11 11" />
      </g>
      <path
        d="M11 9.5h10M16 9.5v10.2a2.8 2.8 0 0 1-5.4 1.1"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* the J's dot, hanging from a thread like a spider */}
      <path d="M22.5 15v4" stroke="white" strokeWidth="0.8" opacity="0.7" />
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
