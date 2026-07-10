import { Eye, Download, FileText } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { profile } from '@/data/profile'

function ResumePaper() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-brand/20 to-accent/20 blur-2xl" />
      <div className="aspect-[1/1.3] overflow-hidden rounded-2xl border border-border bg-white p-6 text-slate-900 shadow-card">
        {/* header */}
        <div className="border-b border-slate-200 pb-3">
          <h3 className="font-display text-lg font-bold leading-tight">{profile.name}</h3>
          <p className="text-[11px] font-medium text-slate-500">
            Software Engineer · Full Stack Java Developer
          </p>
          <p className="mt-1 text-[9px] text-slate-400">
            {profile.email} · {profile.phone}
          </p>
        </div>

        {/* body skeleton with real headings */}
        <div className="mt-3 space-y-3">
          {[
            { h: 'Professional Summary', lines: 2 },
            { h: 'Experience — Hansa Solutions', lines: 3 },
            { h: 'Projects', lines: 2 },
            { h: 'Education — SOA University', lines: 1 },
          ].map((s) => (
            <div key={s.h}>
              <p className="text-[9px] font-bold uppercase tracking-wide text-brand">{s.h}</p>
              <div className="mt-1.5 space-y-1">
                {Array.from({ length: s.lines }).map((_, i) => (
                  <span
                    key={i}
                    className="block h-1.5 rounded-full bg-slate-200"
                    style={{ width: `${92 - i * 12}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF tag */}
      <span className="absolute -right-3 -top-3 inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-2xs font-bold text-muted shadow-soft">
        <FileText className="h-3 w-3 text-brand" /> PDF
      </span>
    </div>
  )
}

export function ResumeSection() {
  return (
    <section id="resume" className="section">
      <div className="container-px">
        <div className="card relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="The Dossier"
                title="The one-page version."
                description="Prefer the traditional format? View it inline or grab the PDF — everything on this site, condensed."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Eye className="h-4 w-4" />
                  View Resume
                </a>
                <a href={profile.resumeUrl} download className="btn-ghost">
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </div>

            <Reveal className="order-first lg:order-last">
              <ResumePaper />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection
