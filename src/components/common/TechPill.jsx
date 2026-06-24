import { cn } from '@/utils/cn'

export function TechPill({ children, className, accent = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium',
        accent
          ? 'border-brand/25 bg-brand/10 text-brand'
          : 'border-border bg-elevated text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default TechPill
