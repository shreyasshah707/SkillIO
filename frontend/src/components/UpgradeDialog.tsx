import { X, Check, Zap, Map, FolderOpen, Mic, TrendingUp } from 'lucide-react'

interface Props {
  dark: boolean
  onClose: () => void
}

const perks = [
  { icon: Map, label: 'Personalized Roadmaps' },
  { icon: FolderOpen, label: 'Curated Projects & IEEE Papers' },
  { icon: Mic, label: 'AI Mock Interviews' },
  { icon: TrendingUp, label: 'Advanced Learning Analytics' },
  { icon: Zap, label: '500 AI Credits / month' },
  { icon: Zap, label: 'Priority AI Response' },
]

export default function UpgradeDialog({ dark, onClose }: Props) {
  const c = {
    overlay: 'rgba(0,0,0,0.5)',
    card: dark ? '#181818' : '#FBF9F2',
    text: dark ? '#F3F3F3' : '#181818',
    muted: dark ? '#888' : '#666',
    border: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Roboto Condensed', sans-serif",
    }} onClick={onClose}>
      <div
        className="paper-card page-enter"
        onClick={e => e.stopPropagation()}
        style={{ background: c.card, border: `1px solid ${c.border}`, width: '100%', maxWidth: 460, padding: 36, position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: c.muted }}>
          <X size={18} />
        </button>

        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(92,107,192,0.1)', border: '1px solid rgba(92,107,192,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Zap size={22} color="#5C6BC0" />
        </div>

        <h2 className="display-mono" style={{ fontSize: 24, fontWeight: 600, color: c.text, letterSpacing: '-0.02em', marginBottom: 8 }}>Unlock Skill/IO Pro</h2>
        <p style={{ fontSize: 14, color: c.muted, marginBottom: 28, lineHeight: 1.6 }}>Get full access to roadmaps, projects, interviews, and advanced analytics to accelerate your placement journey.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {perks.map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(92,107,192,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={12} color="#5C6BC0" />
              </div>
              <span style={{ fontSize: 14, color: c.text }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary" onClick={onClose} style={{ flex: 1, fontSize: 15, padding: '13px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Zap size={15} />
            Upgrade to Pro — ₹799/mo
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: c.muted }}>7-day free trial · Cancel anytime</div>
      </div>
    </div>
  )
}
