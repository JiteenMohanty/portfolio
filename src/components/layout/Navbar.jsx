import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Terminal as TerminalIcon, X } from 'lucide-react'
import { LogoMark } from '@/components/common/Logo'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { navLinks } from '@/constants/navigation'
import { useTerminal } from '@/components/terminal/Terminal'
import { profile } from '@/data/profile'
import { cn } from '@/utils/cn'

// The entire navbar IS the island — no header strip behind it. Collapsed,
// it's just a logo + the current dimension. Hover, tap, or focus it and it
// liquidly grows to reveal every route plus the terminal/theme/resume
// controls, all still inside the one dark capsule.
export function Navbar() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname
  const { openTerminal } = useTerminal()

  const activeLink = navLinks.find((l) => l.to === path)
  const collapsedLabel = activeLink ? activeLink.label : 'Menu'

  const handleNav = (e, to) => {
    e.preventDefault()
    setOpen(false)
    navigate(to)
  }

  // Click (or tap) anywhere outside collapses it — the primary close
  // mechanism on touch devices, and a safety net everywhere else.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4">
      <motion.div
        ref={rootRef}
        layout
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="pointer-events-auto max-w-[94vw] overflow-hidden rounded-[28px] border border-white/10 bg-[#0e0920]/70 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!open ? (
            <motion.button
              key="collapsed"
              layout
              onClick={() => setOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2.5 px-3 py-2"
            >
              <LogoMark className="h-6 w-6" />
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-medium text-white">{collapsedLabel}</span>
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Desktop: one wide row, everything inline */}
              <div className="hidden items-center gap-1 p-2 lg:flex">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                    navigate('/')
                  }}
                  className="mr-1 flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3 text-sm font-bold text-white"
                >
                  <LogoMark className="h-6 w-6" />
                  Jiteen<span className="text-brand">.</span>
                </a>

                <span className="mx-1 h-5 w-px bg-white/10" aria-hidden />

                {navLinks.map((l) => {
                  const active = path === l.to
                  return (
                    <a
                      key={l.to}
                      href={l.to}
                      onClick={(e) => handleNav(e, l.to)}
                      className={cn(
                        'relative z-10 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                        active ? 'text-white' : 'text-slate-400 hover:text-white',
                      )}
                    >
                      {l.label}
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/15"
                          transition={{ type: 'spring', stiffness: 480, damping: 14 }}
                        />
                      )}
                    </a>
                  )
                })}

                <span className="mx-1 h-5 w-px bg-white/10" aria-hidden />

                <button
                  onClick={openTerminal}
                  aria-label="Open terminal"
                  title="Terminal (Ctrl / ⌘ + K)"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <TerminalIcon className="h-4 w-4" />
                </button>
                <ThemeToggle />
                <a
                  href={profile.resumeUrl}
                  download
                  className="ml-1 inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </div>

              {/* Mobile / tablet: stacked panel */}
              <div className="w-[82vw] max-w-xs p-4 lg:hidden">
                <div className="flex items-center justify-between">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      navigate('/')
                    }}
                    className="flex items-center gap-2.5 text-[15px] font-bold text-white"
                  >
                    <LogoMark className="h-7 w-7" />
                    Jiteen<span className="text-brand">.</span>
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-0.5 border-t border-white/10 pt-3">
                  {navLinks.map((l) => {
                    const active = path === l.to
                    return (
                      <a
                        key={l.to}
                        href={l.to}
                        onClick={(e) => handleNav(e, l.to)}
                        className={cn(
                          'rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors',
                          active ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white',
                        )}
                      >
                        {l.label}
                      </a>
                    )
                  })}
                </div>

                <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
                  <button
                    onClick={openTerminal}
                    aria-label="Open terminal"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  >
                    <TerminalIcon className="h-4 w-4" />
                  </button>
                  <ThemeToggle />
                  <a
                    href={profile.resumeUrl}
                    download
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <Download className="h-4 w-4" />
                    Resume
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Navbar
