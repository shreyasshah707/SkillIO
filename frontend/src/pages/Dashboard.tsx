import { useState } from 'react'
import { Bell, Search } from 'lucide-react'
import type { DashView } from '../types'
import Sidebar from '../components/Sidebar'
import DashHome from '../views/DashHome'
import AskVector from '../views/AskVector'
import SkillAnalysis from '../views/SkillAnalysis'
import Resume from '../views/Resume'
import SettingsView from '../views/SettingsView'
import Roadmaps from '../views/Roadmaps'
import Projects from '../views/Projects'
import Interview from '../views/Interview'
import Progress from '../views/Progress'
import saturnBg from '../imports/alessandro-ferrari-6SZ_zpTt7gE-unsplash.jpg'

interface Props { dark: boolean; toggleDark: () => void; onLogout: () => void }

export default function Dashboard({ dark, toggleDark, onLogout }: Props) {
  const [view, setView] = useState<DashView>('home')
  const [collapsed, setCollapsed] = useState(false)
  const [syllabusUploaded, setSyllabusUploaded] = useState(false)

  const renderView = () => {
    switch (view) {
      case 'home': return <DashHome dark={dark} setView={setView} syllabusUploaded={syllabusUploaded} />
      case 'ask-vector': return <AskVector dark={dark} />
      case 'skill-analysis': return <SkillAnalysis dark={dark} onSyllabusUploaded={() => setSyllabusUploaded(true)} />
      case 'resume': return <Resume dark={dark} />
      case 'settings': return <SettingsView dark={dark} toggleDark={toggleDark} />
      case 'roadmaps': return <Roadmaps dark={dark} />
      case 'projects': return <Projects dark={dark} />
      case 'interview': return <Interview dark={dark} />
      case 'progress': return <Progress dark={dark} />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Roboto Condensed', sans-serif", position: 'relative' }}>
      {/* Full-page saturn background */}
      <img src={saturnBg} alt="" aria-hidden style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 0 }} />

      {/* Sidebar */}
      <Sidebar view={view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed} dark={dark} onLogout={onLogout} />

      {/* Main column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0, position: 'relative', zIndex: 1 }}>
        {/* Glass capsule header */}
        <header style={{ padding: '14px 24px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            flex: 1, maxWidth: 420,
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 100,
            padding: '8px 18px',
          }}>
            <Search size={14} color="rgba(255,255,255,0.5)" />
            <input placeholder="Search skills, roadmaps, resources..." style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 13, color: '#fff', fontFamily: "'Roboto Condensed', sans-serif" }} />
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            <button style={{ width: 38, height: 38, borderRadius: 100, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Bell size={15} />
              <div style={{ position: 'absolute', top: 8, right: 8, width: 6, height: 6, borderRadius: '50%', background: '#EF5350' }} />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: 100, background: 'linear-gradient(135deg,#5C6BC0,#7E57C2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderView()}
        </main>
      </div>
    </div>
  )
}
