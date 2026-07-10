import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { HalftoneBackdrop, Aurora } from '@/components/common/Backgrounds'
import { SpiderPanel } from '@/components/common/SpiderPanel'

export default function NotFound() {
  useDocumentTitle('404 — Wrong dimension · Jiteen Mohanty')

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <HalftoneBackdrop />
      <Aurora />
      <div className="relative text-center">
        <div className="mb-6 flex justify-center">
          <SpiderPanel
            src="/images/spidey/frustrated.png"
            alt="Spider-Man throwing his hands up in alarm at an error"
            caption="Not this universe."
            accent="pop"
            rotate={-3}
            size="sm"
          />
        </div>
        <p className="font-mono text-sm text-brand">
          <span className="text-accent">jiteen@portfolio</span>:~$ cd /that-page
        </p>
        <h1 className="glitch mt-4 font-comic text-8xl uppercase tracking-wide sm:text-9xl">404</h1>
        <p className="mt-4 font-mono text-sm text-muted">
          bash: this dimension: No such universe or directory
        </p>
        <p className="mx-auto mt-4 max-w-md text-muted">
          This page got snapped into another universe. Let's swing you back to the right one.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" /> Swing back home
          </Link>
          <Link to="/#projects" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> See missions
          </Link>
        </div>
      </div>
    </section>
  )
}
