import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

// Small "return to the hub" affordance shown at the top of every spoke route.
export function BackToHub() {
  return (
    <div className="container-px pt-24 sm:pt-28">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to the hub
      </Link>
    </div>
  )
}

export default BackToHub
