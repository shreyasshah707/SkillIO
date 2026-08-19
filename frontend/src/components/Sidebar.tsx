import { LayoutDashboard, MessageCircle, BarChart2, Map, FolderOpen, FileText, Mic, TrendingUp, Settings, LogOut, Sparkles } from 'lucide-react'
import type { DashView } from '../types'

interface Props {
  view: DashView
  setView: (v: DashView) => void
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  dark: boolean
  onLogout: () => void
}

const navItems = [
  { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'ask-vector', label: 'Ask Vector', icon: MessageCircle },
  { id: 'skill-analysis', label: 'Skill Analysis', icon: BarChart2 },
  { id: 'roadmaps', label: 'Roadmaps', icon: Map },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'interview', label: 'Interview', icon: Mic },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const

export default function Sidebar({ view, setView, collapsed, setCollapsed, dark, onLogout }: Props) {
  return (
    <aside style={{
      width: collapsed ? 72 : 240,
      flexShrink: 0,
      height: '100vh',
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(255,255,255,0.07)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      borderRight: '1px solid rgba(255,255,255,0.1)',
      transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1)',
      overflow: 'hidden',
    }}>
      {/* Logo row */}
      <div style={{ padding: collapsed ? '22px 0' : '22px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.08)', justifyContent: collapsed ? 'center' : 'flex-start', minHeight: 68 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Sparkles size={15} color="#111" />
        </div>
        {!collapsed && <span className="display-mono" style={{ fontSize: 16, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}>Skill/IO</span>}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', overflowX: 'hidden' }}>
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = view === id
          return (
            <button
              key={id}
              onClick={() => setView(id as DashView)}
              title={collapsed ? label : undefined}
              style={{
                width: '100%',
                padding: collapsed ? '11px 0' : '11px 14px',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                border: active ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
                cursor: 'pointer',
                color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                textAlign: 'left',
                transition: 'all 0.15s',
                backdropFilter: active ? 'blur(10px)' : 'none',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.09)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <Icon size={17} strokeWidth={active ? 2.2 : 1.8} style={{ flexShrink: 0 }} />
              {!collapsed && label}
            </button>
          )
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '10px 10px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%', padding: collapsed ? '11px 0' : '11px 14px', borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 11, justifyContent: collapsed ? 'center' : 'flex-start',
            background: 'transparent', border: '1px solid transparent', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', fontFamily: "'Roboto Condensed', sans-serif", fontSize: 14,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
        >
          <LogOut size={17} strokeWidth={1.8} style={{ flexShrink: 0 }} />
          {!collapsed && 'Sign Out'}
        </button>
      </div>

      {/* Collapse toggle — dark rounded-square terminal button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        style={{
          position: 'absolute',
          top: 18,
          right: -48,
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'rgba(14,14,14,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          transition: 'background 0.18s, border-color 0.18s',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 13,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.82)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(30,30,30,0.95)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(14,14,14,0.88)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        }}
      >
        {collapsed ? '|>' : '|<'}
      </button>
    </aside>
  )
}
