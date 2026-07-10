import { cn } from '@/utils/cn'

const tones = {
  success: 'border-accent/30 bg-accent/10 text-accent-strong dark:text-accent',
  progress: 'border-brand/30 bg-brand/10 text-brand',
  complete: 'border-sky-400/40 bg-sky-400/10 text-sky-600 dark:text-sky-300',
  award: 'border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-300',
  brand: 'border-brand/30 bg-brand/10 text-brand',
  neutral: 'border-border bg-elevated text-muted',
}

export function Badge({ tone = 'neutral', children, className, dot = false, icon: IconCmp }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        tones[tone] ?? tones.neutral,
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
      {IconCmp && <IconCmp className="h-3.5 w-3.5" aria-hidden />}
      {children}
    </span>
  )
}

export default Badge
