import { Trophy } from 'lucide-react'
import { cn } from '@/utils/cn'

// Spotlights the winning team within a larger group photo:
// surroundings are desaturated/dimmed, the team is kept bright inside an
// accent frame, with a floating badge and hover-revealed member names.
// On mobile it swaps to a winner-focused crop.
export function TeamPhoto({ photo, teamMembers = [], highlightName = 'Jiteen Mohanty', className }) {
  const r = photo.region
  const clip = `inset(${r.top}% ${(100 - (r.left + r.width)).toFixed(2)}% ${(100 - (r.top + r.height)).toFixed(2)}% ${r.left}%)`

  return (
    <figure className={cn('m-0', className)}>
      {/* ---- Desktop: spotlight on full photo ---- */}
      <div className="group relative hidden overflow-hidden rounded-2xl border border-border bg-black sm:block">
        {/* dimmed + desaturated base */}
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="block w-full select-none transition-[filter] duration-500 ease-out [filter:brightness(0.40)_saturate(0.5)] group-hover:[filter:brightness(0.62)_saturate(0.7)]"
        />
        {/* bright, full-color winning team (clipped to region) */}
        <img
          src={photo.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: clip, WebkitClipPath: clip }}
        />
        {/* accent frame around the team */}
        <div
          className="pointer-events-none absolute rounded-xl shadow-[0_0_44px_-6px_rgba(251,191,36,0.55)] ring-2 ring-amber-400/90 transition-all duration-500 group-hover:ring-amber-300"
          style={{ left: `${r.left}%`, top: `${r.top}%`, width: `${r.width}%`, height: `${r.height}%` }}
        />
        {/* floating badge */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-black/55 px-3 py-1.5 text-xs font-bold text-amber-300 backdrop-blur">
          <Trophy className="h-3.5 w-3.5" />
          {photo.badge?.replace('🏆 ', '')}
        </div>
        {/* hover hint */}
        <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-2.5 py-1 text-2xs font-medium text-slate-300 backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
          Hover to meet the team →
        </span>
        {/* names panel (reveals on hover) */}
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm font-bold text-white">Team HackTivist — 1st Place Winner</p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
            {teamMembers.map((m, i) => (
              <span key={m}>
                <span className={m === highlightName ? 'font-semibold text-amber-300' : ''}>{m}</span>
                {i < teamMembers.length - 1 && <span className="text-slate-500"> · </span>}
              </span>
            ))}
          </p>
        </figcaption>
      </div>

      {/* ---- Mobile: winner-focused crop ---- */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-black sm:hidden">
        <img src={photo.mobileSrc} alt={photo.alt} loading="lazy" className="block w-full select-none" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-black/55 px-2.5 py-1 text-2xs font-bold text-amber-300 backdrop-blur">
          <Trophy className="h-3 w-3" />
          {photo.badge?.replace('🏆 ', '')}
        </div>
      </div>

      <figcaption className="mt-3 text-xs text-faint">{photo.caption}</figcaption>

      {/* member chips — always visible (the hover panel is desktop-only) */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {teamMembers.map((m) => (
          <span
            key={m}
            className={cn(
              'chip',
              m === highlightName && 'border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-300',
            )}
          >
            {m}
            {m === highlightName && ' (me)'}
          </span>
        ))}
      </div>
    </figure>
  )
}

export default TeamPhoto
