import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Terminal as TerminalIcon } from 'lucide-react'
import { LogoMark } from '@/components/common/Logo'
import { Icon } from '@/components/common/Icon'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { SocialLinks } from '@/components/common/SocialLinks'
import { CornerWeb } from '@/components/common/Backgrounds'
import { navLinks } from '@/constants/navigation'
import { useTerminal } from '@/components/terminal/Terminal'
import { profile } from '@/data/profile'
import { cn } from '@/utils/cn'

// Width kept in sync with the lg:pl-64 offset on the page content (App.jsx).
const navItems = [{ label: 'Hub', to: '/', icon: 'Home' }, ...navLinks]

function NavList({ path, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((l) => {
        const active = path === l.to
        return (
          <Link
            key={l.to}
            to={l.to}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              active ? 'text-white' : 'text-slate-400 hover:text-white',
            )}
          >
            {active && (
              <motion.span
                layoutId="sidebar-active"
                className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                transition={{ type: 'spring', stiffness: 480, damping: 32 }}
              />
            )}
            <span
              className={cn(
                'grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors',
                active ? 'bg-brand/25 text-white' : 'bg-white/5 text-slate-400 group-hover:text-white',
              )}
            >
              <Icon name={l.icon} className="h-4 w-4" />
            </span>
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}

function BottomControls({ openTerminal, onClose }) {
  return (
    <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
      <a
        href={profile.resumeUrl}
        download
        onClick={onClose}
        className="flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
      >
        <Download className="h-4 w-4" />
        Resume
      </a>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            onClose?.()
            openTerminal()
          }}
          aria-label="Open terminal"
          title="Terminal (Ctrl / ⌘ + K)"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <TerminalIcon className="h-4 w-4" />
        </button>
        <ThemeToggle />
        <SocialLinks className="ml-auto" size="sm" />
      </div>
    </div>
  )
}

function Brand({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-2.5"
      aria-label="Jiteen Mohanty — hub"
    >
      <LogoMark className="h-8 w-8" />
      <span className="text-lg font-bold tracking-tight text-white">
        Jiteen<span className="text-brand">.</span>
      </span>
    </Link>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const path = location.pathname
  const { openTerminal } = useTerminal()

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close the drawer whenever the route changes (e.g. tapping a nav item).
  useEffect(() => {
    setOpen(false)
  }, [path])

  return (
    <>
      {/* ---- Desktop: fixed left pane ---- */}
      <aside className="fixed left-0 top-0 z-[70] hidden h-screen w-64 flex-col border-r border-white/10 bg-[#0e0920] p-5 lg:flex">
        <div className="pointer-events-none absolute right-0 top-0 text-white/[0.04]" aria-hidden>
          <CornerWeb size={150} className="-scale-x-100" />
        </div>
        <div className="relative flex h-full flex-col">
          <Brand />
          <div className="mt-8">
            <NavList path={path} />
          </div>
          <BottomControls openTerminal={openTerminal} />
        </div>
      </aside>

      {/* ---- Mobile: top bar + slide-in drawer ---- */}
      <header className="fixed inset-x-0 top-0 z-[70] flex h-14 items-center justify-between border-b border-white/10 bg-[#0e0920] px-4 lg:hidden">
        <Brand />
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-slate-950/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.aside
              className="fixed left-0 top-0 z-[90] flex h-screen w-[80vw] max-w-xs flex-col border-r border-white/10 bg-[#0e0920] p-5 lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              <div className="flex items-center justify-between">
                <Brand onClick={() => setOpen(false)} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-8">
                <NavList path={path} onNavigate={() => setOpen(false)} />
              </div>
              <BottomControls openTerminal={openTerminal} onClose={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
