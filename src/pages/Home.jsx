import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Education } from '@/components/sections/Education'
import { Journey } from '@/components/sections/Journey'
import { FunFacts } from '@/components/sections/FunFacts'
import { ResumeSection } from '@/components/sections/ResumeSection'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Journey />
      <FunFacts />
      <ResumeSection />
      <Contact />
    </>
  )
}
