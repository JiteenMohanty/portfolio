import { ChevronDown } from 'lucide-react'
import { Icon } from '@/components/common/Icon'
import { getAccent } from '@/utils/accents'
import { cn } from '@/utils/cn'

// Renders a microservices OR layered architecture from project.architecture.
export function ArchitectureDiagram({ architecture, accentKey = 'indigo' }) {
  const a = getAccent(accentKey)

  if (architecture.style === 'microservices') {
    return (
      <div className="space-y-5">
        {/* Client */}
        <div className="flex justify-center">
          <Node icon={architecture.client?.icon} label={architecture.client?.name} accent={a} solid />
        </div>
        <Connector />

        {/* Services */}
        <div className="grid gap-3 sm:grid-cols-2">
          {architecture.services.map((svc) => (
            <div key={svc.name} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center gap-2.5">
                <span className={cn('grid h-9 w-9 place-items-center rounded-lg', a.bg, a.text)}>
                  <Icon name={svc.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="font-mono text-sm font-semibold text-ink">{svc.name}</span>
                <span className="ml-auto rounded-md border border-border bg-elevated px-2 py-0.5 text-2xs font-medium text-muted">
                  {svc.tech}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{svc.desc}</p>
            </div>
          ))}
        </div>

        {/* Event bus */}
        {architecture.bus && (
          <>
            <Connector />
            <div className="flex justify-center">
              <div className={cn('inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium', a.border, a.bg, a.text)}>
                <Icon name={architecture.bus.icon} className="h-4 w-4" />
                {architecture.bus.name}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  // Layered
  return (
    <div className="space-y-2">
      {architecture.layers.map((layer, i) => (
        <div key={layer.name}>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5 sm:w-44 sm:shrink-0">
                <span className={cn('grid h-9 w-9 place-items-center rounded-lg', a.bg, a.text)}>
                  <Icon name={layer.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="font-semibold text-ink">{layer.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-lg border border-border bg-elevated px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {i < architecture.layers.length - 1 && (
            <div className="flex justify-center py-1">
              <ChevronDown className="h-4 w-4 text-faint" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function Node({ icon, label, accent, solid }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold',
        solid ? cn(accent.bg, accent.text, accent.border) : 'border-border bg-surface text-ink',
      )}
    >
      {icon && <Icon name={icon} className="h-4 w-4" />}
      {label}
    </div>
  )
}

function Connector() {
  return (
    <div className="flex justify-center">
      <ChevronDown className="h-5 w-5 text-faint" />
    </div>
  )
}

export default ArchitectureDiagram
