import { cn } from '@/utils/cn'

// Ben-Day halftone print texture that fades toward the bottom.
export function HalftoneBackdrop({ className }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 bg-halftone mask-fade-b', className)}
    />
  )
}

// Kept as an alias so any straggling imports keep working.
export const GridBackdrop = HalftoneBackdrop

// Soft, slowly drifting aurora blobs — Spidey red, glitch cyan, magenta.
export function Aurora({ className }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px] animate-float-slow" />
      <div className="absolute top-20 -right-20 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[120px] animate-float" />
      <div className="absolute -bottom-32 -left-16 h-[24rem] w-[24rem] rounded-full bg-pop/15 blur-[110px] animate-float-slow" />
    </div>
  )
}

// A quarter spider-web anchored to a corner. Colors via currentColor —
// set text-* and opacity on the wrapper. rotate lets it hang off any corner.
export function CornerWeb({ className, size = 220 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      className={cn('pointer-events-none', className)}
    >
      {/* concentric web rings (slightly slack, like real webbing) */}
      <path d="M0 18 Q13 15 18 0" />
      <path d="M0 38 Q28 32 38 0" />
      <path d="M0 60 Q44 51 60 0" />
      <path d="M0 84 Q61 72 84 0" />
      {/* radial spokes */}
      <path d="M0 0 L98 41" />
      <path d="M0 0 L82 82" />
      <path d="M0 0 L41 98" />
      <path d="M0 0 L98 8" />
      <path d="M0 0 L8 98" />
    </svg>
  )
}

const tintBg = { brand: 'bg-brand/10', accent: 'bg-accent/10', pop: 'bg-pop/10' }
const cornerPos = {
  tr: 'right-0 top-0',
  tl: 'left-0 top-0 -scale-x-100',
  br: 'right-0 bottom-0 -scale-y-100',
  bl: 'left-0 bottom-0 -scale-x-100 -scale-y-100',
}
const blobPos = {
  tr: 'right-[-8%] top-[-18%]',
  tl: 'left-[-8%] top-[-18%]',
  br: 'right-[-8%] bottom-[-18%]',
  bl: 'left-[-8%] bottom-[-18%]',
}

// Static (no JS animation) per-section texture: halftone dots, one soft
// color blob, and a faint corner web. Cheap enough to repeat down the page —
// this is what turns "bland background" into "still obviously the same comic."
export function SectionBackdrop({ tint = 'brand', corner = 'tr', className }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-halftone opacity-60 mask-fade-b" />
      <div className={cn('absolute h-[26rem] w-[26rem] rounded-full blur-[110px]', blobPos[corner], tintBg[tint])} />
      <div className={cn('absolute text-ink/[0.05]', cornerPos[corner])}>
        <CornerWeb size={240} />
      </div>
    </div>
  )
}

export default HalftoneBackdrop
