import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { GridBackdrop, Aurora } from '@/components/common/Backgrounds'

export default function NotFound() {
  useDocumentTitle('404 — Page not found · Jiteen Mohanty')

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <GridBackdrop />
      <Aurora />
      <div className="relative text-center">
        <p className="font-mono text-sm text-brand">
          <span className="text-accent">jiteen@portfolio</span>:~$ cd /that-page
        </p>
        <h1 className="mt-4 font-display text-7xl font-bold sm:text-9xl">404</h1>
        <p className="mt-4 font-mono text-sm text-muted">
          bash: that page: No such file or directory
        </p>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you're looking for took a different route. Let's get you back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link to="/#projects" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> See projects
          </Link>
        </div>
      </div>
    </section>
  )
}
