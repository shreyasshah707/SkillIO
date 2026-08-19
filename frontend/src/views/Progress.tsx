import { Flame, TrendingUp, Award, Target } from 'lucide-react'

interface Props { dark: boolean }

const weeklyScores = [62, 65, 64, 70, 74, 78, 82]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const heatData = (() => {
  const d: number[] = []
  for (let i = 0; i < 84; i++) d.push(Math.random() > 0.35 ? Math.floor(Math.random() * 4) + 1 : 0)
  return d
})()

const heatColor = (v: number) => {
  if (v === 0) return 'rgba(255,255,255,0.06)'
  return `rgba(92,107,192,${[0.2, 0.4, 0.65, 0.9][v - 1]})`
}

const achievements = [
  { icon: '🔥', label: '7-Day Streak', earned: true },
  { icon: '⚡', label: 'First Roadmap', earned: true },
  { icon: '🎯', label: '80% Readiness', earned: false },
  { icon: '🏆', label: 'Interview Ace', earned: false },
  { icon: '📄', label: 'ATS Champion', earned: true },
  { icon: '🚀', label: 'Cloud Certified', earned: false },
]

const skillGrowth = [
  { label: 'DevOps', before: 20, after: 35 },
  { label: 'Frontend', before: 55, after: 78 },
  { label: 'Cloud', before: 18, after: 40 },
  { label: 'Backend', before: 48, after: 62 },
]

const glassCard = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}

function AreaChart({ data, days }: { data: number[]; days: string[] }) {
  const min = Math.min(...data) - 4, max = Math.max(...data) + 4, range = max - min
  const w = 320, h = 80
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * (w - 20) + 10, y: h - ((v - min) / range) * (h - 16) - 4 }))
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const area = `${path} L ${pts[pts.length - 1].x} ${h + 4} L ${pts[0].x} ${h + 4} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h + 24}`}>
      <path d={area} fill="rgba(92,107,192,0.15)" />
      <path d={path} fill="none" stroke="#5C6BC0" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#5C6BC0" />)}
      {days.map((d, i) => <text key={d} x={pts[i].x} y={h + 18} fontSize={9} fill="rgba(255,255,255,0.35)" textAnchor="middle">{d}</text>)}
    </svg>
  )
}

export default function Progress({ dark }: Props) {
  return (
    <div className="page-enter" style={{ padding: '28px', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.4)', marginBottom: 4 }}>Progress</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Learning analytics and growth tracking</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 16 }}>
        {[
          { icon: TrendingUp, label: 'Readiness Score', value: '82%', delta: '+14%', color: '#88D68A' },
          { icon: Flame, label: 'Current Streak', value: '7 days', delta: 'Best: 12', color: '#FFC77A' },
          { icon: Target, label: 'Skills Improved', value: '8', delta: 'this month', color: '#5C6BC0' },
          { icon: Award, label: 'Achievements', value: '3/6', delta: 'earned', color: '#9E7AC2' },
        ].map(({ icon: Icon, label, value, delta, color }) => (
          <div key={label} style={{ ...glassCard, padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} color={color} />
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{label.toUpperCase()}</span>
            </div>
            <div className="display-mono" style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{value}</div>
            <div style={{ fontSize: 11, color, marginTop: 3 }}>{delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Weekly chart */}
        <div style={{ ...glassCard, padding: '22px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Weekly Readiness Score</div>
          <AreaChart data={weeklyScores} days={days} />
        </div>

        {/* Skill growth */}
        <div style={{ ...glassCard, padding: '22px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 18 }}>Skill Growth</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {skillGrowth.map(({ label, before, after }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{label}</span>
                  <span style={{ fontSize: 11, color: '#88D68A', fontWeight: 600 }}>+{after - before}%</span>
                </div>
                <div style={{ position: 'relative', height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.1)' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 6, background: 'rgba(255,255,255,0.2)', width: `${before}%` }} />
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 6, background: '#5C6BC0', width: `${after}%`, transition: 'width 0.8s' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Before: {before}%</span>
                  <span style={{ fontSize: 10, color: '#7E87D0' }}>Now: {after}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Heatmap */}
        <div style={{ ...glassCard, padding: '22px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Activity — Last 12 Weeks</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
            {Array.from({ length: 12 }, (_, week) =>
              Array.from({ length: 7 }, (_, day) => {
                const val = heatData[week * 7 + day] ?? 0
                return <div key={`${week}-${day}`} title={`${val} sessions`} style={{ aspectRatio: '1', background: heatColor(val), borderRadius: 3, transition: 'opacity 0.15s', cursor: 'default' }} onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')} />
              })
            )}
          </div>
          <div style={{ display: 'flex', gap: 5, marginTop: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Less</span>
            {[0, 1, 2, 3, 4].map(v => <div key={v} style={{ width: 10, height: 10, borderRadius: 2, background: heatColor(v) }} />)}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>More</span>
          </div>
        </div>

        {/* Achievements */}
        <div style={{ ...glassCard, padding: '22px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Achievements</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {achievements.map(({ icon, label, earned }) => (
              <div key={label} style={{ textAlign: 'center', padding: '14px 8px', borderRadius: 12, background: earned ? 'rgba(92,107,192,0.18)' : 'rgba(255,255,255,0.05)', border: earned ? '1px solid rgba(92,107,192,0.3)' : '1px solid rgba(255,255,255,0.08)', opacity: earned ? 1 : 0.45 }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 10, color: earned ? '#7E87D0' : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
