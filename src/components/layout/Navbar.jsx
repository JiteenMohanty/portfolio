import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Terminal as TerminalIcon } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { navLinks, sectionIds } from '@/constants/navigation'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useTerminal } from '@/components/terminal/Terminal'
import { profile } from '@/data/profile'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const onHome = location.pathname === '/'
  const activeId = useScrollSpy(sectionIds)
  const { openTerminal } = useTerminal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (e, href) => {
    e.preventDefault()
    const id = href.slice(1)
    setOpen(false)
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', href)
    } else {
      navigate('/' + href)
    }
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-base/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = onHome && activeId === l.href.slice(1)
            return (
              <a
                key={l.href}
                href={onHome ? l.href : '/' + l.href}
                onClick={(e) => handleNav(e, l.href)}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-brand"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openTerminal}
            aria-label="Open terminal"
            title="Terminal (Ctrl / ⌘ + K)"
            className="hidden h-9 w-9 place-items-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-brand/40 hover:text-brand sm:grid"
          >
            <TerminalIcon className="h-4 w-4" />
          </button>

          <ThemeToggle />

          <a
            href={profile.resumeUrl}
            download
            className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>

          <button
            className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface text-ink md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={'/' + l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-muted transition-colors hover:bg-elevated hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              <a href={profile.resumeUrl} download className="btn-primary mt-2 w-full">
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
