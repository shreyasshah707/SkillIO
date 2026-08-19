import { useState } from 'react'
import { ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react'
import saturnBg from '../imports/alessandro-ferrari-6SZ_zpTt7gE-unsplash.jpg'

interface Props {
  dark: boolean
  onComplete: () => void
}

const steps = [
  {
    key: 'name',
    question: "What's your name?",
    hint: "We'll personalize everything for you.",
    type: 'text',
    placeholder: 'Arjun Mehta',
    options: [] as string[],
  },
  {
    key: 'education',
    question: 'Which university are you at?',
    hint: 'Helps us understand your curriculum structure.',
    type: 'text',
    placeholder: 'e.g. IIT Delhi, VIT Vellore...',
    options: [] as string[],
  },
  {
    key: 'branch',
    question: "What's your branch / major?",
    hint: 'We use this to map your syllabus to industry skills.',
    type: 'options',
    placeholder: '',
    options: ['Computer Science', 'Electronics & Communication', 'Mechanical', 'Civil', 'Data Science', 'AI & ML', 'Other'],
  },
  {
    key: 'semester',
    question: 'Which semester are you in?',
    hint: 'Sets your timeline for the roadmap.',
    type: 'options',
    placeholder: '',
    options: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
  },
  {
    key: 'goal',
    question: "What's your career goal?",
    hint: 'We build your roadmap around this.',
    type: 'options',
    placeholder: '',
    options: ['Software Engineer', 'Data Scientist', 'ML Engineer', 'Frontend Developer', 'DevOps Engineer', 'Product Manager', 'Researcher', 'Startup Founder'],
  },
  {
    key: 'experience',
    question: 'How would you rate your current skill level?',
    hint: 'Be honest — we calibrate to where you actually are.',
    type: 'options',
    placeholder: '',
    options: ['Complete Beginner', 'Know the basics', 'Intermediate', 'Advanced'],
  },
  {
    key: 'hours',
    question: 'How many hours can you study per day?',
    hint: "We'll use this to set a realistic timeline.",
    type: 'options',
    placeholder: '',
    options: ['Less than 1 hour', '1–2 hours', '2–4 hours', '4+ hours'],
  },
]

export default function Onboarding({ dark: _dark, onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [inputVal, setInputVal] = useState('')
  const [done, setDone] = useState(false)

  const current = steps[step]
  const pct = (step / steps.length) * 100

  const handleNext = () => {
    const val = current.type === 'text' ? inputVal : answers[current.key]
    if (!val) return
    setAnswers(prev => ({ ...prev, [current.key]: val }))
    setInputVal('')
    if (step < steps.length - 1) {
      setStep(s => s + 1)
    } else {
      setDone(true)
      setTimeout(onComplete, 1800)
    }
  }

  const glassCard = {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 24,
    boxShadow: '0 8px 48px rgba(0,0,0,0.35)',
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Roboto Condensed', sans-serif" }}>
        <img src={saturnBg} alt="" aria-hidden style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 0 }} />
        <div style={{ ...glassCard, padding: '48px 56px', textAlign: 'center', position: 'relative', zIndex: 1 }} className="page-enter">
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(78,201,176,0.12)', border: '2px solid #4EC9B0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check size={28} color="#4EC9B0" />
          </div>
          <h2 className="display-mono" style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            You're all set, {answers['name']?.split(' ')[0] || 'there'}!
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Building your personalized dashboard...</p>
          <div style={{ marginTop: 24, display: 'flex', gap: 6, justifyContent: 'center' }}>
            <div className="typing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#4EC9B0' }} />
            <div className="typing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#4EC9B0' }} />
            <div className="typing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#4EC9B0' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', fontFamily: "'Roboto Condensed', sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Saturn bg */}
      <img src={saturnBg} alt="" aria-hidden style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.58)', zIndex: 0 }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={13} color="#111" />
        </div>
        <span className="display-mono" style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Skill/IO</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: "'IBM Plex Mono', monospace" }}>{step + 1}/{steps.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'relative', zIndex: 1, height: 2, background: 'rgba(255,255,255,0.1)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #4EC9B0, #5C6BC0)', transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)', borderRadius: '0 4px 4px 0' }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px' }}>
        <div className="page-enter" style={{ width: '100%', maxWidth: 580 }} key={step}>
          {/* Glass card */}
          <div style={{ ...glassCard, padding: '44px 48px' }}>
            <div style={{ marginBottom: 8, fontSize: 11, color: '#4EC9B0', fontWeight: 700, letterSpacing: '0.08em', fontFamily: "'IBM Plex Mono', monospace" }}>
              STEP_{step + 1}.OF_{steps.length}
            </div>
            <h2 className="display-mono" style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.25 }}>
              {current.question}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>{current.hint}</p>

            {current.type === 'text' ? (
              <input
                autoFocus
                placeholder={current.placeholder}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNext()}
                style={{
                  width: '100%', fontSize: 16, padding: '14px 18px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 12, color: '#fff', outline: 'none',
                  fontFamily: "'Roboto Condensed', sans-serif",
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(78,201,176,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.18)')}
              />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {current.options.map(opt => {
                  const selected = answers[current.key] === opt
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswers(prev => ({ ...prev, [current.key]: opt }))}
                      style={{
                        padding: '13px 16px',
                        borderRadius: 12,
                        border: selected ? '1.5px solid rgba(78,201,176,0.7)' : '1px solid rgba(255,255,255,0.15)',
                        background: selected ? 'rgba(78,201,176,0.12)' : 'rgba(255,255,255,0.05)',
                        color: selected ? '#4EC9B0' : 'rgba(255,255,255,0.6)',
                        fontFamily: "'Roboto Condensed', sans-serif",
                        fontSize: 14,
                        fontWeight: selected ? 600 : 400,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.09)' }}
                      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36 }}>
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontSize: 14, fontFamily: "'Roboto Condensed', sans-serif', transition: 'color 0.15s'" }}>
                  <ArrowLeft size={15} /> Back
                </button>
              ) : <div />}
              <button
                onClick={handleNext}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 15, padding: '12px 28px',
                  borderRadius: 12, cursor: 'pointer',
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  fontFamily: "'Roboto Condensed', sans-serif",
                  fontWeight: 600,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              >
                {step === steps.length - 1 ? 'Finish' : 'Continue'} <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 24 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 6, background: i === step ? '#4EC9B0' : i < step ? 'rgba(78,201,176,0.4)' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
