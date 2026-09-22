import { useEffect, useState } from 'react'
import { Lightbulb, LightbulbOff } from 'lucide-react'
import { useTheme } from '@/theme/ThemeProvider'
import { VisitorCounter } from '@/components/common/VisitorCounter'
import { HeroStage } from './HeroStage'
import { McuModal } from './McuModal'
import { hero, cards, cta } from './content'
import './mcu.css'

/**
 * MCU universe — a single-viewport (no-scroll on desktop) landing page.
 * Nine grid regions frame the central 3D showpiece; six of them are cards that
 * open a glass-morphic modal with that section's full content.
 *
 * Two lighting moods share the global theme: light is the studio composition;
 * dark drops the room and hangs a 3D pendant lamp that lights the figure.
 */
export default function McuPortfolio() {
  const [open, setOpen] = useState(null)
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  // Neutralize the Miles theme's page background so it can't show through on
  // overscroll. The `dark` class on <html> (set by ThemeProvider) drives the
  // dark composition via CSS scoped to html.dark .mcu-root.
  useEffect(() => {
    document.documentElement.classList.add('mcu-active')
    return () => document.documentElement.classList.remove('mcu-active')
  }, [])

  return (
    <div className="mcu-root">
      <div className="mcu-wash" aria-hidden="true" />
      <div className="mcu-grid-lines" aria-hidden="true" />

      <button
        type="button"
        className="mcu-lamp-toggle"
        onClick={toggleTheme}
        aria-label={dark ? 'Switch on the lights' : 'Dim the lights'}
        title={dark ? 'Lights on' : 'Lights off'}
      >
        {dark ? <Lightbulb className="h-4 w-4" /> : <LightbulbOff className="h-4 w-4" />}
      </button>

      <div className="mcu-grid">
        <header className="mcu-hero mcu-area-hero">
          <p className="mcu-hero-eyebrow">{hero.eyebrow}</p>
          <h1>{hero.name}</h1>
          <p className="mcu-hero-tagline">{hero.tagline}</p>
        </header>

        {cards.map((card) => (
          <button
            type="button"
            key={card.id}
            className={`mcu-card mcu-area-${card.area}${
              card.id === 'tech' ? ' mcu-card--tech' : ''
            }`}
            onClick={() => setOpen(card.id)}
          >
            <span
              className="mcu-halftone"
              aria-hidden="true"
              style={{ '--origin': card.origin }}
            />
            <p className="mcu-eyebrow">{card.eyebrow}</p>
            <h2 className="mcu-card-title">{card.title}</h2>

            {card.chips ? (
              <div className="mcu-chip-row">
                {card.chips.map((c) => (
                  <span className="mcu-chip" key={c}>
                    {c}
                  </span>
                ))}
                <span className="mcu-chip mcu-chip--muted">{card.more}</span>
              </div>
            ) : (
              <p className="mcu-card-body">{card.body}</p>
            )}

            <span className="mcu-card-cta">OPEN →</span>
          </button>
        ))}

        <HeroStage dark={dark} />

        <div className="mcu-cta mcu-area-cta">
          <div className="mcu-cta-row">
            <a className="mcu-btn-primary" href={cta.resumeUrl} download>
              Download résumé <span>{cta.resumeMeta}</span>
            </a>
            <button
              type="button"
              className="mcu-btn-secondary"
              onClick={() => setOpen('contact')}
            >
              Get in touch
            </button>
            <a
              className="mcu-btn-secondary"
              href={cta.methodsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {cta.methodsLabel} ↗
            </a>
          </div>
          <p className="mcu-caption">{cta.caption}</p>
          <VisitorCounter className="mcu-visitors" />
        </div>
      </div>

      {open && <McuModal id={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
