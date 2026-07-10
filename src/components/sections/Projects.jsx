import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/common/Reveal'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  const [spotlight, ...rest] = projects

  return (
    <section id="projects" className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Missions"
          title="Selected missions, told as case studies."
          description="Each of these is a product I designed and built end-to-end. Open one to see the problem, the architecture, and what I learned."
        />

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
