import { Sparkles, TrendingUp, UploadCloud } from 'lucide-react'
import type { DashView } from '../types'

interface Props { dark: boolean; setView: (v: DashView) => void; syllabusUploaded: boolean }

const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
const dayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

const skillCoverage = [
  { label: 'Frontend', pct: 78 },
  { label: 'Backend', pct: 62 },
  { label: 'Cloud', pct: 40 },
  { label: 'DevOps', pct: 35 },
  { label: 'AI/ML', pct: 55 },
]

const criticalGaps = [
  { skill: 'Kubernetes', gap: 6, level: 'Critical' },
  { skill: 'AWS', gap: 5, level: 'High' },
  { skill: 'Redis', gap: 5, level: 'High' },
  { skill: 'CI/CD', gap: 5, level: 'High' },
  { skill: 'System Design', gap: 5, level: 'Critical' },
]

const weekData = [68, 70, 69, 73, 76, 78, 82]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const glassCard = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}

function MiniLineChart({ data, days }: { data: number[]; days: string[] }) {
  const min = Math.min(...data) - 4
  const max = Math.max(...data) + 4
  const range = max - min
  const w = 260, h = 90
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * (w - 20) + 10,
    y: h - ((v - min) / range) * (h - 24) - 8,
  }))
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const area = `${path} L ${pts[pts.length - 1].x} ${h + 8} L ${pts[0].x} ${h + 8} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h + 30}`} style={{ overflow: 'visible' }}>
      {[60, 68, 76, 84, 90].map(v => (
        <g key={v}>
          <line x1={10} y1={h - ((v - min) / range) * (h - 24) - 8} x2={w - 10} y2={h - ((v - min) / range) * (h - 24) - 8} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <text x={5} y={h - ((v - min) / range) * (h - 24) - 5} fontSize={9} fill="rgba(255,255,255,0.3)" textAnchor="end">{v}</text>
        </g>
      ))}
      <path d={area} fill="rgba(92,107,192,0.15)" />
      <path d={path} fill="none" stroke="#5C6BC0" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#5C6BC0" />
      ))}
      {days.map((d, i) => (
        <text key={d} x={pts[i].x} y={h + 20} fontSize={9} fill="rgba(255,255,255,0.35)" textAnchor="middle">{d}</text>
      ))}
    </svg>
  )
}

function ReadinessRing({ pct }: { pct: number }) {
  const r = 52, circ = 2 * Math.PI * r
  const dash = circ * (pct / 100)
  return (
    <div style={{ position: 'relative', width: 120, height: 120 }}>
      <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={60} cy={60} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={10} />
        <circle cx={60} cy={60} r={r} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth={10}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <circle cx={60} cy={60} r={r} fill="none" stroke="#5C6BC0" strokeWidth={10}
          strokeDasharray={`${dash * 0.18} ${circ - dash * 0.18}`} strokeLinecap="round" opacity={0.6}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span className="display-mono" style={{ fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{pct}%</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>↑ 4% this week</span>
      </div>
    </div>
  )
}

export default function DashHome({ dark: _dark, setView, syllabusUploaded }: Props) {
  if (!syllabusUploaded) {
    return (
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: 32, fontFamily: "'Roboto Condensed', sans-serif", textAlign: 'center' }}>
        {/* Greeting */}
        <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
          {greeting}, Arjun
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 48, fontFamily: "'Roboto Mono', monospace", letterSpacing: '0.04em' }}>
          {dayStr}
        </p>

        {/* Upload CTA card */}
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px dashed rgba(255,255,255,0.2)',
          borderRadius: 24,
          padding: '52px 64px',
          maxWidth: 520,
          width: '100%',
        }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <UploadCloud size={28} color="rgba(255,255,255,0.5)" />
          </div>
          <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 10, letterSpacing: '-0.01em' }}>
            Upload your syllabus to get started
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 32 }}>
            Your dashboard is waiting. Upload your course syllabus in Skill Analysis — we'll map your skills, find gaps, and build your personalised career roadmap.
          </p>
          <button
            onClick={() => setView('skill-analysis')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 30px', borderRadius: 14,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: '#fff', fontSize: 14, fontWeight: 600,
              fontFamily: "'Roboto Condensed', sans-serif",
              cursor: 'pointer', transition: 'background 0.18s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >
            <UploadCloud size={15} /> Go to Skill Analysis
          </button>
        </div>

        {/* Locked sections row */}
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Career Readiness', 'Skill Coverage', 'Critical Gaps', 'Weekly Progress'].map(label => (
            <div key={label} style={{ padding: '8px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
              🔒 {label}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter" style={{ padding: '28px', minHeight: '100%' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
            {greeting}, Arjun
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontFamily: "'Roboto Mono', monospace" }}>
            {dayStr} · DevOps Engineer track
          </p>
        </div>
        <button onClick={() => setView('ask-vector')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 18px', height: 40, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 12, cursor: 'pointer', color: '#fff', fontSize: 14, fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 600 }}>
          <Sparkles size={15} /> Ask Vector
        </button>
      </div>

      {/* Top 2 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16, marginBottom: 16 }}>
        {/* Career Readiness */}
        <div style={{ ...glassCard, padding: '28px 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <ReadinessRing pct={82} />
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: 6 }}>Career Readiness</div>
            <div className="display-mono" style={{ fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1 }}>82%</div>
            <div style={{ fontSize: 13, color: '#88D68A', display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
              <TrendingUp size={13} /> ↑ 4% this week
            </div>
          </div>
        </div>

        {/* Skill Coverage */}
        <div style={{ ...glassCard, padding: '24px 28px' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 18 }}>SKILL COVERAGE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {skillCoverage.map(({ label, pct }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{label}</span>
                  <span className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 5, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 5, background: pct > 65 ? 'rgba(255,255,255,0.85)' : '#5C6BC0', width: `${pct}%`, transition: 'width 0.8s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom 2 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Critical Skill Gaps */}
        <div style={{ ...glassCard, padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Critical Skill Gaps</div>
            <button onClick={() => setView('skill-analysis')} style={{ fontSize: 12, color: '#7E87D0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 600 }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {criticalGaps.map(({ skill, gap, level }) => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{skill}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>gap: {gap}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    padding: '3px 10px', borderRadius: 7,
                    background: level === 'Critical' ? 'rgba(239,83,80,0.25)' : 'rgba(255,255,255,0.1)',
                    color: level === 'Critical' ? '#EF9090' : 'rgba(255,255,255,0.7)',
                  }}>{level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Progress */}
        <div style={{ ...glassCard, padding: '24px 28px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Weekly Progress</div>
          <MiniLineChart data={weekData} days={days} />
        </div>
      </div>
    </div>
  )
}
