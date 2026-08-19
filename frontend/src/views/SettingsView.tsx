import { useState } from 'react'
import { User, Palette, Bell, CreditCard, Shield, Zap, Sun, Moon } from 'lucide-react'

interface Props { dark: boolean; toggleDark: () => void }

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'theme', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'credits', label: 'AI Credits', icon: Zap },
] as const

const glassCard = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}

export default function SettingsView({ dark, toggleDark }: Props) {
  const [tab, setTab] = useState<string>('profile')
  const [notifs, setNotifs] = useState({ streaks: true, tips: true, updates: false, promo: false })

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} style={{ width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', background: value ? '#5C6BC0' : 'rgba(255,255,255,0.15)', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: value ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
    </button>
  )

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff', fontSize: 14, fontFamily: "'Roboto Condensed', sans-serif",
    outline: 'none', boxSizing: 'border-box' as const,
  }

  return (
    <div className="page-enter" style={{ padding: '32px 36px', maxWidth: 900, margin: '0 auto', fontFamily: "'Roboto Condensed', sans-serif" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: '#7E87D0', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 6 }}>PREFERENCES</div>
        <h1 className="display-mono" style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>Settings</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>
        {/* Tabs sidebar */}
        <div style={{ ...glassCard, padding: 10, height: 'fit-content' }}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 10,
                display: 'flex', alignItems: 'center', gap: 9,
                background: tab === id ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: tab === id ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                cursor: 'pointer',
                color: tab === id ? '#fff' : 'rgba(255,255,255,0.5)',
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: 13, fontWeight: tab === id ? 600 : 400,
                textAlign: 'left',
                transition: 'all 0.14s',
              }}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div style={{ ...glassCard, padding: 28 }}>
          {tab === 'profile' && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Profile</div>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 28 }}>
                <div style={{ width: 68, height: 68, borderRadius: 20, background: 'linear-gradient(135deg, #5C6BC0, #7E57C2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>A</span>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Arjun Mehta</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>arjun@college.edu</div>
                  <button style={{ marginTop: 8, fontSize: 12, color: '#7E87D0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Roboto Condensed', sans-serif" }}>Change avatar</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['Full Name', 'Arjun Mehta'], ['Email', 'arjun@college.edu'], ['University', 'IIT Delhi'], ['Branch', 'Computer Science'], ['Semester', 'Semester 5']].map(([label, val]) => (
                  <div key={label}>
                    <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.04em', display: 'block', marginBottom: 5 }}>{label.toUpperCase()}</label>
                    <input defaultValue={val} style={inputStyle} />
                  </div>
                ))}
                <button style={{ width: 'fit-content', fontSize: 14, padding: '10px 22px', marginTop: 8, borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', cursor: 'pointer', fontFamily: "'Roboto Condensed', sans-serif" }}>Save changes</button>
              </div>
            </div>
          )}

          {tab === 'theme' && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Appearance</div>
              <div style={{ display: 'flex', gap: 0, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', maxWidth: 360 }}>
                {[
                  { label: 'Light', icon: Sun, value: false, preview: '#F7F3E9' },
                  { label: 'Dark', icon: Moon, value: true, preview: '#111111' },
                ].map(({ label, icon: Icon, value, preview }) => {
                  const active = dark === value
                  return (
                    <button key={label} onClick={() => { if (dark !== value) toggleDark() }} style={{
                      flex: 1, padding: '28px 20px',
                      background: active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                      transition: 'background 0.25s',
                      borderRight: label === 'Light' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                    }}>
                      <div style={{ width: 56, height: 36, borderRadius: 10, background: preview, border: active ? '2px solid #fff' : '2px solid rgba(255,255,255,0.2)', transition: 'border-color 0.25s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} color={value ? '#F3F3F3' : '#181818'} />
                      </div>
                      <span style={{ fontSize: 13, color: active ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: active ? 700 : 400, fontFamily: "'Roboto Condensed', sans-serif" }}>{label}</span>
                    </button>
                  )
                })}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>
                {dark ? 'Dark mode is active — easy on the eyes.' : 'Light mode is active — crisp and clear.'}
              </p>
            </div>
          )}

          {tab === 'notifications' && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Notifications</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { key: 'streaks', label: 'Daily streak reminders', desc: "Get notified if you haven't studied today" },
                  { key: 'tips', label: 'Learning tips', desc: 'Weekly tips to improve your readiness score' },
                  { key: 'updates', label: 'Product updates', desc: 'New features and improvements' },
                  { key: 'promo', label: 'Promotional emails', desc: 'Offers and discounts' },
                ].map(({ key, label, desc }) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <div style={{ fontSize: 14, color: '#fff', marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{desc}</div>
                    </div>
                    <Toggle value={notifs[key as keyof typeof notifs]} onChange={() => setNotifs(n => ({ ...n, [key]: !n[key as keyof typeof notifs] }))} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'billing' && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Billing & Subscription</div>
              <div style={{ background: 'rgba(92,107,192,0.15)', border: '1px solid rgba(92,107,192,0.3)', borderRadius: 14, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#7E87D0', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 6 }}>CURRENT PLAN</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Free Plan</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>20 AI credits/month · Basic features</div>
                <button style={{ marginTop: 16, fontSize: 14, padding: '10px 22px', borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', cursor: 'pointer', fontFamily: "'Roboto Condensed', sans-serif" }}>Upgrade to Pro</button>
              </div>
            </div>
          )}

          {tab === 'credits' && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 24 }}>AI Credits</div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                {[{ label: 'Used this month', value: '6', color: '#fff' }, { label: 'Remaining', value: '14', color: '#88D68A' }, { label: 'Total (Free)', value: '20', color: 'rgba(255,255,255,0.5)' }].map(({ label, value, color }) => (
                  <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '16px 18px' }}>
                    <div className="mono" style={{ fontSize: 28, fontWeight: 600, color }}>{value}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ height: '100%', borderRadius: 6, background: '#5C6BC0', width: '30%' }} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Resets on Sept 1, 2025 · <span style={{ color: '#7E87D0', cursor: 'pointer' }}>Upgrade for 500/mo</span></div>
            </div>
          )}

          {tab === 'security' && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Security</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.04em', display: 'block', marginBottom: 5 }}>CURRENT PASSWORD</label>
                  <input type="password" placeholder="••••••••" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.04em', display: 'block', marginBottom: 5 }}>NEW PASSWORD</label>
                  <input type="password" placeholder="••••••••" style={inputStyle} />
                </div>
                <button style={{ width: 'fit-content', fontSize: 14, padding: '10px 22px', borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', cursor: 'pointer', fontFamily: "'Roboto Condensed', sans-serif" }}>Update password</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
