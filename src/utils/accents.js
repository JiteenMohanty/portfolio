// Per-project accent theming shared across the card + case-study page.
export const accents = {
  indigo: {
    text: 'text-brand',
    bg: 'bg-brand/10',
    border: 'border-brand/30',
    grad: 'from-brand to-accent',
    dot: 'bg-brand',
    ring: 'group-hover:border-brand/40',
    tint: 'rgb(var(--brand))',
  },
  emerald: {
    text: 'text-accent-strong dark:text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/30',
    grad: 'from-accent to-brand',
    dot: 'bg-accent',
    ring: 'group-hover:border-accent/40',
    tint: 'rgb(var(--accent))',
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-300',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/30',
    grad: 'from-amber-400 to-orange-400',
    dot: 'bg-amber-400',
    ring: 'group-hover:border-amber-400/40',
    tint: '#f59e0b',
  },
}

export const getAccent = (key) => accents[key] ?? accents.indigo

export default getAccent
