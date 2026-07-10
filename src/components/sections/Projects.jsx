import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { SectionBackdrop } from '@/components/common/Backgrounds'
import { SpiderPanel } from '@/components/common/SpiderPanel'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  const [spotlight, ...rest] = projects

  return (
    <section id="projects" className="section relative overflow-hidden">
      <SectionBackdrop tint="accent" corner="tr" />
      <div className="container-px relative">
        <div className="flex items-start justify-between gap-8">
          <SectionHeading
            eyebrow="Missions"
            title="Selected missions, told as case studies."
            description="Each of these is a product I designed and built end-to-end. Open one to see the problem, the architecture, and what I learned."
          />
          <Reveal delay={0.15} className="hidden shrink-0 lg:block">
            <SpiderPanel
              src="/images/spidey/celebrating.png"
              alt="Spider-Man celebrating with fists raised — BUILD SUCCESSFUL on screen"
              caption="Ship it."
              accent="accent"
              rotate={3}
              size="sm"
            />
          </Reveal>
        </div>

        <div className="mt-14 space-y-6">
          <Reveal>
            <ProjectCard project={spotlight} featured />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
