import { BackToHub } from '@/components/layout/BackToHub'
import { About } from '@/components/sections/About'
import { Education } from '@/components/sections/Education'
import { FunFacts } from '@/components/sections/FunFacts'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Origin() {
  useDocumentTitle('Origin Story — Jiteen Mohanty')
  return (
    <>
      <BackToHub />
      <About />
      <Education />
      <FunFacts />
    </>
  )
}
