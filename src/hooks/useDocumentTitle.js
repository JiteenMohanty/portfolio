import { useEffect } from 'react'

const DEFAULT_TITLE = 'Jiteen Mohanty — Full Stack Engineer & Product Builder'
const DEFAULT_DESC =
  'Jiteen Mohanty is a Full Stack Engineer specializing in scalable backend systems, workflow automation, and AI-powered products.'

// Updates <title> and meta description per route; restores defaults on unmount.
export function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE
    if (description) {
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', description)
    }
    return () => {
      document.title = DEFAULT_TITLE
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', DEFAULT_DESC)
    }
  }, [title, description])
}

export default useDocumentTitle
