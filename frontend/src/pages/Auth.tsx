import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react'
import astronautImg from '../imports/nicolas-lobos-kGtFjYdm7DI-unsplash.jpg'

interface Props {
  mode: 'login' | 'signup'
  dark: boolean
  toggleDark: () => void
  onBack: () => void
  onAuth: () => void
  onSwitch: (m: 'login' | 'signup') => void
}

export default function Auth({ mode, dark, toggleDark, onBack, onAuth, onSwitch }: Props) {
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Roboto Condensed', sans-serif", background: '#111' }}>

      {/* LEFT — astronaut image hero */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minWidth: 0 }}>
        <img
          src={astronautImg}
          alt="Astronaut walking on Mars-like red rock landscape"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Gradient overlay — darker at bottom so text is legible */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.6) 100%)' }} />

        {/* Back link */}
        <button onClick={onBack} style={{ position: 'absolute', top: 28, left: 32, zIndex: 2, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '7px 16px', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', fontSize: 13, fontFamily: "'Roboto Condensed', sans-serif" }}>
          <ArrowLeft size={14} />
          Back to Home
        </button>

        {/* Hero text pinned to bottom-left */}
        <div style={{ position: 'absolute', bottom: 56, left: 48, right: 48, zIndex: 2 }}>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 18, textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            Your AI Career<br />Intelligence<br />Platform
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, marginBottom: 24, maxWidth: 380 }}>
            Bridge the gap between college and industry with AI-powered guidance
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {['AI-powered skill gap analysis', 'Personalized career roadmaps', 'Resume & interview optimization'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={10} color="#fff" />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            Trusted by 12,000+ Students and Undergrads
          </div>
        </div>
      </div>

      {/* RIGHT — dark glass auth panel */}
      <div style={{ width: 480, flexShrink: 0, background: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', position: 'relative' }}>

        {/* Auth card */}
        <div className="page-enter" style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 22, padding: 36, backdropFilter: 'blur(20px)' }}>
          <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 24, fontWeight: 600, color: '#F3F3F3', letterSpacing: '-0.02em', marginBottom: 6 }}>
            {mode === 'login' ? 'Welcome back.' : 'Create account'}
          </h2>
          <p style={{ fontSize: 13, color: '#777', marginBottom: 28 }}>
            {mode === 'login' ? 'Sign in to continue' : 'Start Your AI Powered Learner Journey'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: 11, color: '#666', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>FULL NAME</label>
                <input className="paper-input" placeholder="Arjun Mehta" value={name} onChange={e => setName(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#F3F3F3' }} />
              </div>
            )}
            <div>
              <label style={{ fontSize: 11, color: '#666', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>EMAIL</label>
              <input className="paper-input" type="email" placeholder="employee@example.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#F3F3F3' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: '#666', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input className="paper-input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && onAuth()}
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#F3F3F3', paddingRight: 44 }} />
                <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666', display: 'flex' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginTop: -6 }}>
                <span style={{ fontSize: 12, color: '#5C6BC0', cursor: 'pointer' }}>Forgot password?</span>
              </div>
            )}

            <button onClick={onAuth} style={{ width: '100%', padding: '13px 0', marginTop: 4, background: '#F3F3F3', color: '#111', border: 'none', borderRadius: 12, fontFamily: "'Roboto Condensed', sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Continue
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: 12, color: '#555' }}>Or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['G  Continue with Google', 'Continue with GitHub'].map(label => (
              <button key={label} onClick={onAuth} style={{ width: '100%', padding: '12px 0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#ccc', fontSize: 14, fontFamily: "'Roboto Condensed', sans-serif", cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >{label}</button>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: '#555' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <span onClick={() => onSwitch(mode === 'login' ? 'signup' : 'login')} style={{ color: '#5C6BC0', cursor: 'pointer', fontWeight: 600 }}>
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
