import { useState, useEffect } from 'react'
import type { Page } from './types'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import { checkBackendHealth } from './api/skillioService'

export default function App() {
  // Default directly to dashboard to skip Auth & Onboarding
  const [page, setPage] = useState<Page>('dashboard')
  const [dark, setDark] = useState(true)

  // Toggle dark class on body
  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  // Ping FastAPI backend when the app mounts
  useEffect(() => {
    checkBackendHealth()
      .then((data) => console.log('✅ FastAPI Connected:', data))
      .catch((err) => console.error('❌ Connection Error:', err))
  }, [])

  const toggleDark = () => setDark(d => !d)

  return (
    <>
      {page === 'landing' && (
        <Landing
          dark={dark}
          toggleDark={toggleDark}
          onLogin={() => setPage('dashboard')}
          onSignup={() => setPage('dashboard')}
        />
      )}
      {page === 'dashboard' && (
        <Dashboard
          dark={dark}
          toggleDark={toggleDark}
          onLogout={() => setPage('landing')}
        />
      )}
    </>
  )
}