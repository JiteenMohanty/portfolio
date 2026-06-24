import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '@/data/profile'
import { cn } from '@/utils/cn'

const items = [
  { label: 'GitHub', href: profile.socials.github, Icon: Github, external: true },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: Linkedin, external: true },
  { label: 'Email', href: profile.socials.email, Icon: Mail, external: false },
]

export function SocialLinks({ className, size = 'md' }) {
  const dims = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10'
  const icon = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {items.map(({ label, href, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={cn(
            'grid place-items-center rounded-xl border border-border bg-surface text-muted',
            'transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand',
            dims,
          )}
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
