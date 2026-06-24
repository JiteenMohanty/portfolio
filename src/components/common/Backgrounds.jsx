import { cn } from '@/utils/cn'

// Faint grid that fades toward the bottom.
export function GridBackdrop({ className }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 bg-grid-fade [background-size:44px_44px] opacity-[0.5] mask-fade-b',
        className,
      )}
    />
  )
}

// Soft, slowly drifting aurora blobs (brand + accent).
export function Aurora({ className }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px] animate-float-slow" />
      <div className="absolute top-20 -right-20 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[120px] animate-float" />
      <div className="absolute -bottom-32 -left-16 h-[24rem] w-[24rem] rounded-full bg-brand/10 blur-[110px] animate-float-slow" />
    </div>
  )
}

export default GridBackdrop
