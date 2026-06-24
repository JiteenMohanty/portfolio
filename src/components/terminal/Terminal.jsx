import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalSquare, X } from 'lucide-react'
import { useTypedPhrase } from '@/hooks/useEasterEgg'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { primarySkills } from '@/data/skills'
import {
  helpLines,
  musicLines,
  futureLines,
  secretLines,
} from '@/data/terminal'

const TerminalContext = createContext({ openTerminal: () => {}, closeTerminal: () => {} })

// eslint-disable-next-line react-refresh/only-export-components
export const useTerminal = () => useContext(TerminalContext)

const PROMPT = 'jiteen@portfolio:~$'

const intro = [
  L(`Welcome. You found the terminal. 👋`),
  L(`Type `, ['help', 'cmd'], ` and hit Enter. Try `, ['whois', 'cmd'], `, `, ['projects', 'cmd'], `, or `, ['music', 'cmd'], `.`),
]

// helper to build a line of mixed segments. Each extra arg is either a
// string, or [text, kind] / [text, kind, action].
function L(...segments) {
  return segments.map((s) =>
    typeof s === 'string' ? { text: s } : { text: s[0], kind: s[1], action: s[2] },
  )
}

export function TerminalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openTerminal = useCallback(() => setOpen(true), [])
  const closeTerminal = useCallback(() => setOpen(false), [])

  // Type "whois jiteen" anywhere to summon it.
  useTypedPhrase('whois jiteen', openTerminal)

  // Ctrl / Cmd + K toggles it.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <TerminalContext.Provider value={{ openTerminal, closeTerminal }}>
      {children}
      <CommandTerminal open={open} onClose={closeTerminal} />
    </TerminalContext.Provider>
  )
}

function CommandTerminal({ open, onClose }) {
  const navigate = useNavigate()
  const [history, setHistory] = useState(() => [{ kind: 'output', lines: intro }])
  const [value, setValue] = useState('')
  const [cmdLog, setCmdLog] = useState([])
  const [logIdx, setLogIdx] = useState(-1)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  const goTo = useCallback(
    (to) => {
      onClose()
      navigate(to)
    },
    [navigate, onClose],
  )

  const run = useCallback(
    (raw) => {
      const cmd = raw.trim().toLowerCase()
      const echo = { kind: 'input', text: raw }
      let out

      switch (cmd) {
        case '':
          setHistory((h) => [...h, echo])
          return
        case 'help':
          out = [
            L(`Available commands:`),
            ...helpLines.map((h) => L([`  ${h.cmd.padEnd(10)}`, 'cmd'], h.desc)),
          ]
          break
        case 'whois':
        case 'whois jiteen':
        case 'about':
          out = [
            L([profile.name, 'accent'], ` — ${profile.title}`),
            L(`${profile.altTitle}`),
            L(''),
            L(profile.brandStatement),
            L(''),
            L([`location `, 'muted'], profile.location),
            L([`mission  `, 'muted'], `turn complex processes into intuitive experiences`),
          ]
          break
        case 'projects':
        case 'ls': {
          out = [L(`I have shipped:`), L('')]
          projects.forEach((p) => {
            out.push(
              L(
                [`  → `, 'muted'],
                [p.name, 'cmd', () => goTo(`/projects/${p.slug}`)],
                [`  (${p.type})`, 'muted'],
              ),
            )
          })
          out.push(L(''))
          out.push(L([`click a name to open its case study.`, 'muted']))
          break
        }
        case 'skills':
          out = [
            L(`core toolkit:`),
            L('  ' + primarySkills.join('  ·  ')),
            L(''),
            L([`backend-first`, 'accent'], `, with React on top and AI in the loop.`),
          ]
          break
        case 'music':
          out = musicLines.map((l) => L(l))
          break
        case 'future':
          out = futureLines.map((l) => L(l))
          break
        case 'secret':
          out = secretLines.map((l) => L([l, 'accent']))
          break
        case 'social':
        case 'contact':
          out = [
            L([`github   `, 'muted'], [profile.socials.github.replace('https://', ''), 'link', () => window.open(profile.socials.github, '_blank')]),
            L([`linkedin `, 'muted'], [`in/jiteen-mohanty`, 'link', () => window.open(profile.socials.linkedin, '_blank')]),
            L([`email    `, 'muted'], [profile.email, 'link', () => (window.location.href = profile.socials.email)]),
          ]
          break
        case 'resume':
        case 'cv':
          out = [L([`opening resume…`, 'accent'])]
          window.open(profile.resumeUrl, '_blank')
          break
        case 'clear':
        case 'cls':
          setHistory([])
          return
        case 'exit':
        case 'quit':
        case 'q':
          onClose()
          return
        default:
          out = [
            L([`command not found: `, 'muted'], cmd),
            L([`type `, 'muted'], ['help', 'cmd'], [` for the list.`, 'muted']),
          ]
      }

      setHistory((h) => [...h, echo, { kind: 'output', lines: out }])
    },
    [goTo, onClose],
  )

  const onSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) {
      setCmdLog((l) => [value, ...l])
    }
    run(value)
    setValue('')
    setLogIdx(-1)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setLogIdx((i) => {
        const next = Math.min(i + 1, cmdLog.length - 1)
        if (cmdLog[next] !== undefined) setValue(cmdLog[next])
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setLogIdx((i) => {
        const next = Math.max(i - 1, -1)
        setValue(next === -1 ? '' : cmdLog[next] ?? '')
        return next
      })
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  // Focus input & scroll to bottom when opened / on new output.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history, open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Interactive terminal"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e14] font-mono text-[13px] leading-relaxed shadow-2xl"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="ml-1 flex items-center gap-1.5 text-xs text-slate-400">
                <TerminalSquare className="h-3.5 w-3.5" /> jiteen — zsh
              </span>
              <button
                onClick={onClose}
                className="ml-auto text-slate-500 transition-colors hover:text-slate-200"
                aria-label="Close terminal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div ref={bodyRef} className="max-h-[52vh] overflow-y-auto px-4 py-3.5 text-slate-300">
              {history.map((entry, i) =>
                entry.kind === 'input' ? (
                  <div key={i} className="flex gap-2 whitespace-pre-wrap break-words">
                    <span className="shrink-0 text-emerald-400">{PROMPT}</span>
                    <span className="text-slate-100">{entry.text}</span>
                  </div>
                ) : (
                  <div key={i} className="mb-2 mt-0.5">
                    {entry.lines.map((segs, j) => (
                      <div key={j} className="whitespace-pre-wrap break-words">
                        {segs.map((s, k) => (
                          <Segment key={k} seg={s} />
                        ))}
                      </div>
                    ))}
                  </div>
                ),
              )}

              {/* Active input line */}
              <form onSubmit={onSubmit} className="flex gap-2">
                <span className="shrink-0 text-emerald-400">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal input"
                  className="flex-1 bg-transparent text-slate-100 caret-emerald-400 outline-none"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Segment({ seg }) {
  const kindClass = {
    cmd: 'text-indigo-300',
    accent: 'text-emerald-300',
    muted: 'text-slate-500',
    link: 'text-indigo-300 underline decoration-dotted underline-offset-2',
  }
  const cls = kindClass[seg.kind] ?? 'text-slate-300'
  if (seg.action) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          seg.action()
        }}
        className={`${cls} transition-opacity hover:opacity-80`}
      >
        {seg.text}
      </button>
    )
  }
  return <span className={cls}>{seg.text}</span>
}

export default TerminalProvider
