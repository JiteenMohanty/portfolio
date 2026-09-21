import { Link } from 'react-router-dom'
import { ArrowUp, Heart } from 'lucide-react'
import { LogoMark } from '@/components/common/Logo'
import { SocialLinks } from '@/components/common/SocialLinks'
import { SpiderPanel } from '@/components/common/SpiderPanel'
import { VisitorCounter } from '@/components/common/VisitorCounter'
import { navLinks } from '@/constants/navigation'
import { profile } from '@/data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-10 border-t border-border bg-surface/40">
      <div className="container-px py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <span className="text-base font-bold tracking-tight">Jiteen Mohanty</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.brandStatement} Currently a {profile.currentRole} at {profile.company}.
            </p>
            <SocialLinks className="mt-5" size="sm" />
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Connect
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a className="text-sm text-muted transition-colors hover:text-ink" href={profile.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
                <li>
                  <a className="text-sm text-muted transition-colors hover:text-ink" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
                <li>
                  <a className="text-sm text-muted transition-colors hover:text-ink" href={profile.socials.email}>Email</a>
                </li>
                <li>
                  <a className="text-sm text-muted transition-colors hover:text-ink" href={profile.courses.url} target="_blank" rel="noopener noreferrer">Methods — Courses</a>
                </li>
                <li>
                  <a className="text-sm text-muted transition-colors hover:text-ink" href={profile.resumeUrl} download>Resume</a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                  Psst…
                </h3>
                <SpiderPanel
                  src="/images/spidey/facepalms.png"
                  alt="Spider-Man facepalming at an error on screen"
                  accent="pop"
                  rotate={4}
                  size="xs"
                  className="hidden !w-16 shrink-0 sm:block"
                />
              </div>
              <p className="mt-4 max-w-[16rem] text-sm text-muted">
                Try typing{' '}
                <code className="rounded-md border border-border bg-elevated px-1.5 py-0.5 font-mono text-xs text-brand">
                  whois jiteen
                </code>{' '}
                anywhere on this page.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="flex items-center gap-1.5 text-xs text-faint">
            © {year} Jiteen Mohanty · Built with
            <Heart className="h-3.5 w-3.5 text-brand" /> and great responsibility — React,
            Tailwind & Framer Motion
          </p>
          <div className="flex items-center gap-4">
            <VisitorCounter />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              Swing to top
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
