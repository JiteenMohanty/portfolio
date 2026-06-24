import { useEffect } from 'react'

// Watches global keystrokes for a typed phrase (default "whois jiteen")
// and fires the callback. Ignores typing inside inputs/textareas.
export function useTypedPhrase(phrase, onMatch) {
  useEffect(() => {
    let buffer = ''
    const target = phrase.toLowerCase()

    const onKeyDown = (e) => {
      const el = e.target
      const tag = el?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || el?.isContentEditable) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key.length === 1) {
        buffer = (buffer + e.key.toLowerCase()).slice(-target.length)
        if (buffer === target) {
          buffer = ''
          onMatch()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [phrase, onMatch])
}

export default useTypedPhrase
