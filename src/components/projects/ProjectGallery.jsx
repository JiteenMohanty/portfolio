import { useState } from 'react'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { ProductMock } from '@/components/projects/ProductMock'

// Carousel when real screenshots exist; an honest representative visual when
// they don't (this portfolio ships without leaked client/product screenshots).
export function ProjectGallery({ project }) {
  const images = project.gallery ?? []
  const [idx, setIdx] = useState(0)

  if (images.length === 0) {
    return (
      <div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-elevated/30">
          <ProductMock accentKey={project.accent} />
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-faint">
          <ImageOff className="h-3.5 w-3.5" />
          Representative interface sketch — production screenshots available on request.
        </p>
      </div>
    )
  }

  const go = (dir) => setIdx((i) => (i + dir + images.length) % images.length)

  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-elevated/30">
        <img
          src={images[idx].src}
          alt={images[idx].alt ?? `${project.name} screenshot ${idx + 1}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/90 text-ink backdrop-blur transition-colors hover:border-brand/40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/90 text-ink backdrop-blur transition-colors hover:border-brand/40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? 'w-6 bg-brand' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectGallery
