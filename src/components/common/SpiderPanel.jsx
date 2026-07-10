import { cn } from '@/utils/cn'

const shadowColor = {
  brand: 'rgb(var(--brand))',
  accent: 'rgb(var(--accent))',
  pop: 'rgb(var(--pop))',
}

// A comic-book panel: white paper, thick ink border, hard offset shadow,
// slight pin-angle rotation. Stays white-on-ink in both themes on purpose —
// same "always a printed sticker" trick as the .eyebrow caption box.
export function SpiderPanel({
  src,
  alt,
  caption,
  rotate = -2,
  accent = 'brand',
  size = 'md',
  className,
}) {
  const dims = {
    xs: 'w-24 sm:w-28',
    sm: 'w-40 sm:w-48',
    md: 'w-56 sm:w-64',
    lg: 'w-72 sm:w-80',
  }

  return (
    <figure
      className={cn('inline-block shrink-0', dims[size], className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="overflow-hidden rounded-lg border-[3px] bg-white"
        style={{
          borderColor: '#18102c',
          boxShadow: `7px 7px 0 0 ${shadowColor[accent] ?? shadowColor.brand}`,
        }}
      >
        <img src={src} alt={alt} loading="lazy" className="block w-full" />
      </div>
      {caption && (
        <figcaption
          className="mt-2 inline-block -rotate-1 rounded border-2 bg-white px-2 py-0.5 font-comic text-sm tracking-wide"
          style={{ borderColor: '#18102c', color: '#18102c' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default SpiderPanel
