import { getAccent } from '@/utils/accents'
import { cn } from '@/utils/cn'

// Abstract, screenshot-free "product" visual — a stylised app dashboard
// tinted to the project accent. Keeps galleries premium without real images.
export function ProductMock({ accentKey = 'indigo', className, dense = false }) {
  const a = getAccent(accentKey)
  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-[0.14]', a.grad)} />
      <div className="absolute inset-0 bg-dots opacity-50" />

      {/* floating app window */}
      <div className="absolute inset-x-5 top-6 bottom-[-1px] rounded-t-2xl border border-border bg-surface/85 shadow-soft backdrop-blur sm:inset-x-8">
        {/* window bar */}
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-faint/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-faint/30" />
          <span className={cn('ml-2 h-2.5 w-20 rounded-full', a.bg)} />
        </div>

        <div className="flex gap-3 p-4">
          {/* sidebar */}
          <div className="hidden w-1/4 flex-col gap-2 sm:flex">
            <span className={cn('h-2 w-full rounded-full', a.bg)} />
            <span className="h-2 w-3/4 rounded-full bg-elevated" />
            <span className="h-2 w-2/3 rounded-full bg-elevated" />
            <span className="h-2 w-3/4 rounded-full bg-elevated" />
            <span className={cn('mt-2 h-2 w-1/2 rounded-full', a.bg)} />
          </div>

          {/* content */}
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-border bg-elevated/60 p-2">
                  <span className={cn('block h-2 w-2/3 rounded-full', a.bg)} />
                  <span className="mt-1.5 block h-3 w-full rounded bg-elevated" />
                </div>
              ))}
            </div>
            {!dense && (
              <div className="space-y-2 rounded-lg border border-border bg-elevated/40 p-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={cn('h-4 w-4 shrink-0 rounded-md', a.bg)} />
                    <span className="h-2 flex-1 rounded-full bg-elevated" />
                    <span className="h-2 w-10 rounded-full bg-elevated" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductMock
