import { TerminalSquare } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { SectionBackdrop } from '@/components/common/Backgrounds'
import { aiStats } from '@/data/aiStats'
import { cn } from '@/utils/cn'

const MS_DAY = 86400000

function formatHour(h) {
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:00 ${period}`
}

// Builds a GitHub-style week grid (7 rows, one column per week) covering
// the full span from the first to the last active date, zero-filling gaps.
function buildWeeks(dayCounts, firstDate, lastDate) {
  const first = new Date(firstDate + 'T00:00:00')
  const last = new Date(lastDate + 'T00:00:00')
  const start = new Date(first)
  start.setDate(start.getDate() - start.getDay()) // back up to that week's Sunday
  const end = new Date(last)
  end.setDate(end.getDate() + (6 - end.getDay())) // forward to that week's Saturday

  const days = []
  for (let t = start.getTime(); t <= end.getTime(); t += MS_DAY) {
    const d = new Date(t)
    const key = d.toISOString().slice(0, 10)
    days.push({ key, count: dayCounts[key] ?? 0 })
  }

  const weeks = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  return weeks
}

function levelFor(count, max) {
  if (count === 0) return 0
  if (count >= max * 0.66) return 3
  if (count >= max * 0.33) return 2
  return 1
}

const levelClass = [
  'bg-white/[0.06]',
  'bg-brand/35',
  'bg-brand/65',
  'bg-brand',
]

export function AIStats() {
  const { dayCounts, firstActiveDate, lastActiveDate } = aiStats
  const weeks = buildWeeks(dayCounts, firstActiveDate, lastActiveDate)
  const max = Math.max(...Object.values(dayCounts))

  const stats = [
    ['sessions', aiStats.sessions],
    ['messages', aiStats.messages.toLocaleString()],
    ['total-tokens', `${(aiStats.totalTokens / 1e6).toFixed(1)}M (≈${aiStats.warAndPeaceMultiple}x War and Peace)`],
    ['active-days', aiStats.activeDays],
    ['current-streak', `${aiStats.currentStreak}d`],
    ['longest-streak', `${aiStats.longestStreak}d`],
    ['peak-hour', formatHour(aiStats.peakHour)],
    ['favorite-model', aiStats.favoriteModel],
  ]

  return (
    <section id="ai-stats" className="section relative overflow-hidden">
      <SectionBackdrop tint="accent" corner="tr" />
      <div className="container-px relative">
        <SectionHeading
          eyebrow="Powered by Karen"
          title="I build with AI. Here's the receipts."
          description="Real numbers, pulled from my own Claude Code history — not a vanity stat, an actual usage log."
        />

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e0920] shadow-card">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="ml-1 flex items-center gap-1.5 text-xs text-slate-400">
                <TerminalSquare className="h-3.5 w-3.5" />
                usage.log
              </span>
            </div>

            <div className="px-5 py-5 font-mono text-[13px] leading-relaxed sm:px-6 sm:py-6">
              <div className="flex gap-2">
                <span className="shrink-0 text-emerald-400">$</span>
                <span className="text-slate-500">claude-code --usage --all-time</span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-1.5 pl-4 sm:grid-cols-2">
                {stats.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 sm:justify-start">
                    <span className="text-slate-500">{label}</span>
                    <span className="text-slate-100">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <span className="shrink-0 text-emerald-400">$</span>
                <span className="text-slate-500">contribution-graph</span>
              </div>
              <div className="mt-3 flex gap-[3px] overflow-x-auto pl-4">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day) => (
                      <div
                        key={day.key}
                        title={`${day.key} — ${day.count} messages`}
                        className={cn('h-[11px] w-[11px] rounded-[2px]', levelClass[levelFor(day.count, max)])}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between pl-4 text-2xs text-slate-600">
                <span>{firstActiveDate}</span>
                <span>{lastActiveDate}</span>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="text-emerald-400">$</span>
                <span className="inline-block h-4 w-[7px] animate-blink bg-slate-400" aria-hidden />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default AIStats
