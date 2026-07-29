import { BackToHub } from '@/components/layout/BackToHub'
import { Projects } from '@/components/sections/Projects'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Missions() {
  useDocumentTitle('Missions — Jiteen Mohanty')
  return (
    <>
      <BackToHub />
      <Projects />
    </>
  )
}
