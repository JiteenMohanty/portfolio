import { BackToHub } from '@/components/layout/BackToHub'
import { ResumeSection } from '@/components/sections/ResumeSection'
import { Contact } from '@/components/sections/Contact'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function ContactPage() {
  useDocumentTitle('Contact — Jiteen Mohanty')
  return (
    <>
      <BackToHub />
      <ResumeSection />
      <Contact />
    </>
  )
}
