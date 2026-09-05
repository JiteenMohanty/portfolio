import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { TerminalProvider } from '@/components/terminal/Terminal'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { CrawlingSpider } from '@/components/common/CrawlingSpider'
import { useUniverse } from '@/universe/UniverseContext'
import { UniverseToggle } from '@/universe/UniverseToggle'
import Home from '@/pages/Home'
import Origin from '@/pages/Origin'
import Missions from '@/pages/Missions'
import Powers from '@/pages/Powers'
import Canon from '@/pages/Canon'
import ContactPage from '@/pages/ContactPage'
import ProjectDetail from '@/pages/ProjectDetail'
import NotFound from '@/pages/NotFound'

// Loaded on demand so three.js never lands in the bundle Miles visitors download.
const McuPortfolio = lazy(() => import('@/mcu/McuPortfolio'))

export default function App() {
  const { universe } = useUniverse()

  // The MCU universe is a self-contained single-screen composition — it renders
  // instead of the Miles shell (sidebar, routes, footer), not inside it.
  if (universe === 'mcu') {
    return (
      <>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <McuPortfolio />
        </Suspense>
        <UniverseToggle />
      </>
    )
  }

  return (
    <TerminalProvider>
      <ScrollManager />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Sidebar />
      <CrawlingSpider />

      {/* Offset content by the fixed left pane on desktop; the mobile top
          bar is cleared by each page's own top padding. */}
      <div className="lg:pl-64">
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/origin" element={<Origin />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/powers" element={<Powers />} />
            <Route path="/canon" element={<Canon />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <UniverseToggle />
    </TerminalProvider>
  )
}
