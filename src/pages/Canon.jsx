import { BackToHub } from '@/components/layout/BackToHub'
import { Journey } from '@/components/sections/Journey'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Canon() {
  useDocumentTitle('Canon Events — Jiteen Mohanty')
  return (
    <>
      <BackToHub />
      <Journey />
    </>
  )
}
