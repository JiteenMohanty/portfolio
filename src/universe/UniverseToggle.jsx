import { useUniverse } from './UniverseContext'
import './universe-toggle.css'

/**
 * Always-on switch between the two designs. Pinned bottom-right so it clears
 * the Miles sidebar / mobile top bar and the MCU card grid alike.
 */
export function UniverseToggle() {
  const { universe, setUniverse } = useUniverse()

  return (
    <div
      className="universe-toggle"
      role="group"
      aria-label="Switch portfolio universe"
    >
      <button
        type="button"
        className={universe === 'miles' ? 'is-active' : ''}
        aria-pressed={universe === 'miles'}
        onClick={() => setUniverse('miles')}
      >
        Miles Morales
      </button>
      <button
        type="button"
        className={universe === 'mcu' ? 'is-active' : ''}
        aria-pressed={universe === 'mcu'}
        onClick={() => setUniverse('mcu')}
      >
        MCU
      </button>
    </div>
  )
}

export default UniverseToggle
