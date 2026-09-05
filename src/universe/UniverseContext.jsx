import { createContext, useContext, useCallback, useEffect, useState } from 'react'

/**
 * Which visual universe the site is rendering:
 *   'miles' — the original multi-page Spider-Verse portfolio
 *   'mcu'   — the single-screen hero grid with the 3D suit
 *
 * Persisted so a visitor's choice survives a reload.
 */

const STORAGE_KEY = 'universe'
const UniverseContext = createContext({
  universe: 'miles',
  setUniverse: () => {},
  toggleUniverse: () => {},
})

function getInitialUniverse() {
  if (typeof window === 'undefined') return 'miles'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'miles' || stored === 'mcu') return stored
  } catch {
    /* storage unavailable — fall through to the default */
  }
  return 'miles'
}

export function UniverseProvider({ children }) {
  const [universe, setUniverseState] = useState(getInitialUniverse)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, universe)
    } catch {
      /* non-fatal */
    }
  }, [universe])

  const setUniverse = useCallback((next) => setUniverseState(next), [])
  const toggleUniverse = useCallback(
    () => setUniverseState((u) => (u === 'miles' ? 'mcu' : 'miles')),
    [],
  )

  return (
    <UniverseContext.Provider value={{ universe, setUniverse, toggleUniverse }}>
      {children}
    </UniverseContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUniverse() {
  return useContext(UniverseContext)
}
