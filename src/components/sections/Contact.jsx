import { useState } from 'react'
import { Mail, Copy, Check, MapPin } from 'lucide-react'
import { Reveal } from '@/components/common/Reveal'
import { SocialLinks } from '@/components/common/SocialLinks'
import { Aurora, SectionBackdrop } from '@/components/common/Backgrounds'
import { profile } from '@/data/profile'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <section id="contact" className="section relative overflow-hidden">
      <SectionBackdrop tint="brand" corner="br" />
      <div className="container-px relative">
        <Reveal className="card relative overflow-hidden">
          <Aurora className="opacity-60" />
          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
            <span className="eyebrow justify-center">
              <span className="h-px w-6 bg-brand/60" aria-hidden />
              Contact
            </span>

            <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-bold leading-tight sm:text-5xl">
              Got a problem in your <span className="gradient-text">neighborhood</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-muted sm:text-lg">
              Have a product to build, a role to fill, or just want to talk systems and AI? My
              inbox is open.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={profile.socials.email} className="btn-primary w-full sm:w-auto">
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
              <button onClick={copyEmail} className="btn-ghost w-full sm:w-auto">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-accent" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy email
                  </>
                )}
              </button>
            </div>

            <div className="mt-10 flex flex-col items-center gap-5">
              <SocialLinks />
              <div className="flex items-center gap-4 text-sm text-faint">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {profile.availabilityNote}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
