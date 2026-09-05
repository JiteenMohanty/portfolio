import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { UniverseProvider } from '@/universe/UniverseContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UniverseProvider>
          <App />
        </UniverseProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
