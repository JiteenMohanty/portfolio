import { useEffect } from 'react'
import { modals } from './content'

/**
 * Section modal — six content variants sharing one glass panel shell.
 * Closes on the ✕ button, a backdrop click, or Escape.
 */
export function McuModal({ id, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const data = modals[id]
  if (!data) return null

  return (
    <div className="mcu-modal" role="dialog" aria-modal="true" aria-label={data.title}>
      <button className="mcu-veil" onClick={onClose} aria-label="Close" tabIndex={-1} />

      <div className="mcu-panel">
        <span className="mcu-panel-halftone" aria-hidden="true" />

        <button className="mcu-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <p className="mcu-modal-eyebrow">{data.eyebrow}</p>
        <h2 className="mcu-modal-title">{data.title}</h2>

        {id === 'about' && <AboutBody data={data} />}
        {id === 'projects' && <ProjectsBody data={data} />}
        {id === 'tech' && <TechBody data={data} />}
        {id === 'experience' && <ExperienceBody data={data} />}
        {id === 'education' && <EducationBody data={data} />}
        {id === 'contact' && <ContactBody data={data} />}
      </div>
    </div>
  )
}

function AboutBody({ data }) {
  return (
    <>
      {data.paragraphs.map((p) => (
        <p className="mcu-para" key={p}>
          {p}
        </p>
      ))}
      <div className="mcu-stats">
        {data.stats.map((s) => (
          <div
            className={`mcu-stat${s.accent ? ' mcu-stat--accent' : ''}`}
            key={s.label}
          >
            <p className="mcu-stat-label">{s.label}</p>
            <p className="mcu-stat-value">{s.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function ProjectsBody({ data }) {
  return (
    <div className="mcu-list">
      {data.items.map((p) => (
        <div className="mcu-row" key={p.name}>
          <div className="mcu-row-head">
            <h3 className="mcu-row-title">{p.name}</h3>
            <span className="mcu-row-year">{p.year}</span>
          </div>
          <p className="mcu-row-desc">{p.desc}</p>
          <p className="mcu-row-stack">{p.stack}</p>
        </div>
      ))}
    </div>
  )
}

function TechBody({ data }) {
  return (
    <div className="mcu-groups">
      {data.groups.map((g) => (
        <div key={g.label}>
          <p className="mcu-group-label">{g.label}</p>
          <div className="mcu-chip-row mcu-chip-row--modal">
            {g.items.map((item) => (
              <span
                className={`mcu-chip mcu-chip--modal${
                  g.tone === 'neutral' ? ' mcu-chip--neutral' : ''
                }`}
                key={item}
              >
                {item}
              </span>
            ))}
            {g.trailing && (
              <span className="mcu-chip mcu-chip--modal mcu-chip--red">
                {g.trailing.label}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperienceBody({ data }) {
  return (
    <div className="mcu-roles">
      {data.roles.map((r) => (
        <div
          className={`mcu-role${r.current ? ' mcu-role--current' : ''}`}
          key={r.dates + r.title}
        >
          <p className="mcu-role-dates">{r.dates}</p>
          <h3 className="mcu-role-title">{r.title}</h3>
          <p className="mcu-role-company">{r.company}</p>
          <p className="mcu-role-desc">{r.desc}</p>
        </div>
      ))}
    </div>
  )
}

function EducationBody({ data }) {
  const e = data.primary
  return (
    <>
      <div className="mcu-edu-card">
        <div className="mcu-row-head">
          <h3 className="mcu-row-title">{e.degree}</h3>
          <span className="mcu-row-year">{e.period}</span>
        </div>
        <p className="mcu-edu-school">{e.school}</p>
        <p className="mcu-row-desc">{e.desc}</p>
      </div>

      <p className="mcu-group-label">{data.secondaryLabel}</p>
      <div className="mcu-chip-row mcu-chip-row--modal">
        {data.secondary.map((s) => (
          <span className="mcu-chip mcu-chip--modal mcu-chip--neutral" key={s}>
            {s}
          </span>
        ))}
      </div>
    </>
  )
}

function ContactBody({ data }) {
  return (
    <>
      <p className="mcu-para" style={{ maxWidth: '56ch' }}>
        {data.intro}
      </p>
      <div className="mcu-tiles">
        {data.tiles.map((t) => (
          <a
            className="mcu-tile"
            key={t.label}
            href={t.href}
            target={t.href.startsWith('http') ? '_blank' : undefined}
            rel={t.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <span className="mcu-tile-label">{t.label}</span>
            <span className="mcu-tile-value">{t.value}</span>
          </a>
        ))}
      </div>
      <span className="mcu-badge">{data.badge}</span>
    </>
  )
}

export default McuModal
