import { BackToHub } from '@/components/layout/BackToHub'
import { Skills } from '@/components/sections/Skills'
import { AIStats } from '@/components/sections/AIStats'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Powers() {
  useDocumentTitle('Powers — Jiteen Mohanty')
  return (
    <>
      <BackToHub />
      <Skills />
      <AIStats />
    </>
  )
}
