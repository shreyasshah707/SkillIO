import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Mic, Sparkles } from 'lucide-react'

interface Props { dark: boolean }

type Msg = { role: 'user' | 'ai'; text: string; ts: string }

const suggestions = [
  { text: 'How do I become a DevOps Engineer in 6 months?' },
  { text: 'Analyze my resume for DevOps roles' },
  { text: 'What skills am I missing for Cloud?' },
  { text: 'Suggest projects for my portfolio' },
]

const aiReplies = [
  "Great question! Here's a structured 6-month DevOps roadmap: **Month 1–2** — Linux fundamentals, bash scripting, Git. **Month 3** — Docker and containerization basics. **Month 4** — Kubernetes orchestration. **Month 5** — CI/CD pipelines with GitHub Actions. **Month 6** — Cloud platforms (AWS/GCP) and monitoring with Prometheus. Focus on building 2–3 real projects alongside each phase.",
  "Based on your skill profile, your resume is missing these high-impact DevOps keywords: Kubernetes, Terraform, Jenkins, AWS ECS. Add a 'Tools & Technologies' section and quantify impact — e.g., 'Reduced deployment time by 40% using CI/CD pipelines'.",
  "For Cloud engineering, you're currently missing: AWS core services (EC2, S3, RDS, Lambda), Infrastructure as Code (Terraform), Cloud security fundamentals, and Cost optimization. I recommend starting with the AWS Cloud Practitioner certification — it's achievable in 4–6 weeks with 1–2 hours daily.",
  "Here are 3 portfolio projects that will get you noticed:\n1. **Auto-scaling web app** on AWS with load balancer + RDS\n2. **Kubernetes cluster** with Helm charts and Prometheus monitoring\n3. **Full CI/CD pipeline** — GitHub → Jenkins → Docker → Kubernetes deployment",
]

const hour = new Date().getHours()
const timeGreeting = hour < 5 ? 'Burning the midnight oil' : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

export default function AskVector({ dark }: Props) {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  const send = (text?: string) => {
    const msg = text || input.trim()
    if (!msg) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setStarted(true)
    setMsgs(m => [...m, { role: 'user', text: msg, ts: now }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, {
        role: 'ai',
        text: aiReplies[Math.floor(Math.random() * aiReplies.length)],
        ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    }, 1600)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Empty state greeting */}
      {!started && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
          <h2 style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 600, color: '#fff',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            textAlign: 'center', marginBottom: 10,
          }}>
            {timeGreeting}, Arjun?
          </h2>
          <p style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', marginBottom: 40 }}>
            vector · career intelligence
          </p>

          {/* Suggestion cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 580, width: '100%', padding: '0 24px' }}>
            {suggestions.map(({ text }) => (
              <button
                key={text}
                onClick={() => send(text)}
                style={{
                  padding: '16px 18px',
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 14,
                  fontSize: 13, color: '#fff',
                  fontFamily: "'Roboto Condensed', sans-serif",
                  cursor: 'pointer', textAlign: 'left',
                  lineHeight: 1.5,
                  transition: 'transform 0.15s, background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {started && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', gap: 10, alignItems: 'flex-start' }}>
              {m.role === 'ai' && (
                <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(255,255,255,0.25)' }}>
                  <Sparkles size={14} color="#7E87D0" />
                </div>
              )}
              <div style={{
                maxWidth: '64%',
                padding: '12px 16px',
                borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: m.role === 'user' ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: 14, color: '#fff', lineHeight: 1.6,
                boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
              }}>
                {m.text}
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 6, textAlign: m.role === 'user' ? 'right' : 'left' }}>{m.ts}</div>
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={14} color="#7E87D0" />
              </div>
              <div style={{ padding: '14px 18px', borderRadius: '16px 16px 16px 4px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', gap: 5 }}>
                <div className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#5C6BC0' }} />
                <div className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#5C6BC0' }} />
                <div className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#5C6BC0' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Floating input at bottom */}
      <div style={{ padding: '0 24px 28px', flexShrink: 0 }}>
        <div style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 18,
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
          padding: '14px 18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Ask Vector anything about your career..."
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                fontSize: 14, color: '#fff', fontFamily: "'Roboto Condensed', sans-serif",
              }}
            />
            <button style={{ width: 34, height: 34, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Paperclip size={16} />
            </button>
            <button style={{ width: 34, height: 34, borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mic size={16} />
            </button>
            <button
              onClick={() => send()}
              style={{ width: 36, height: 36, borderRadius: 10, background: input.trim() ? '#5C6BC0' : 'rgba(255,255,255,0.1)', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s', flexShrink: 0 }}
            >
              <Send size={15} color={input.trim() ? '#fff' : 'rgba(255,255,255,0.3)'} />
            </button>
          </div>
          {/* Quick actions */}
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {[
              { icon: '⚡', label: 'Flash · Smart' },
              { icon: '↑', label: 'Upload Resume' },
              { icon: '◎', label: 'Analyze GitHub' },
            ].map(({ icon, label }) => (
              <button key={label} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 8,
                background: 'rgba(255,255,255,0.08)', border: 'none',
                fontSize: 12, color: 'rgba(255,255,255,0.55)', cursor: 'pointer',
                fontFamily: "'Roboto Condensed', sans-serif",
                transition: 'background 0.14s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              >
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
