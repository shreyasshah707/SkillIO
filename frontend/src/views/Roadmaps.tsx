import { useState } from 'react'
import { Check, Circle, Lock } from 'lucide-react'

interface Props { dark: boolean }

const tracks = ['DevOps Engineer', 'ML Engineer', 'Frontend Lead', 'Backend Engineer', 'Cloud Architect']

const milestones = [
  { phase: 'Foundation', weeks: '1–4', done: true, tasks: ['Linux & Bash scripting', 'Git version control', 'Networking fundamentals', 'Docker basics'] },
  { phase: 'Containerization', weeks: '5–8', done: true, tasks: ['Docker Compose', 'Container registries', 'Multi-stage builds', 'Docker networking'] },
  { phase: 'Kubernetes', weeks: '9–14', done: false, tasks: ['Pod & Deployment concepts', 'Services & Ingress', 'Helm charts', 'StatefulSets & PVCs'] },
  { phase: 'CI/CD Pipelines', weeks: '15–18', done: false, tasks: ['GitHub Actions', 'Jenkins pipelines', 'ArgoCD GitOps', 'Testing strategies'] },
  { phase: 'Cloud Platforms', weeks: '19–24', done: false, tasks: ['AWS core services', 'Terraform IaC', 'Monitoring & Alerting', 'Cost optimization'] },
]

const glassCard = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}

export default function Roadmaps({ dark }: Props) {
  const [activeTrack, setActiveTrack] = useState(0)

  return (
    <div className="page-enter" style={{ padding: '28px', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.4)', marginBottom: 4 }}>Roadmaps</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>AI-generated learning paths tailored to your goal</p>
      </div>

      {/* Track selector */}
      <div style={{ ...glassCard, padding: '16px 20px', marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tracks.map((t, i) => (
          <button key={t} onClick={() => setActiveTrack(i)} style={{
            padding: '8px 16px', borderRadius: 10,
            background: activeTrack === i ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
            border: activeTrack === i ? '1px solid rgba(255,255,255,0.35)' : '1px solid transparent',
            cursor: 'pointer',
            color: activeTrack === i ? '#fff' : 'rgba(255,255,255,0.55)',
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: 13, fontWeight: activeTrack === i ? 600 : 400,
            transition: 'all 0.15s',
          }}>{t}</button>
        ))}
      </div>

      {/* Progress overview */}
      <div style={{ ...glassCard, padding: '22px 28px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 28 }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 6 }}>OVERALL PROGRESS</div>
          <div className="display-mono" style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>38%</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>2 of 5 phases complete · 12 weeks remaining</div>
        </div>
        <div style={{ flex: 1, height: 8, borderRadius: 8, background: 'rgba(255,255,255,0.1)' }}>
          <div style={{ height: '100%', borderRadius: 8, background: 'linear-gradient(90deg, #5C6BC0, #7E57C2)', width: '38%', transition: 'width 0.8s' }} />
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>Est. completion: <strong style={{ color: '#fff' }}>Dec 2025</strong></div>
      </div>

      {/* Timeline */}
      <div style={{ ...glassCard, padding: '24px 28px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 24 }}>{tracks[activeTrack]} — Learning Timeline</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {milestones.map(({ phase, weeks, done, tasks }, i) => (
            <div key={phase} style={{ display: 'flex', gap: 16, paddingBottom: i < milestones.length - 1 ? 28 : 0, position: 'relative' }}>
              {/* Timeline line */}
              {i < milestones.length - 1 && (
                <div style={{ position: 'absolute', left: 15, top: 32, bottom: 0, width: 2, background: done ? '#5C6BC0' : 'rgba(255,255,255,0.1)', zIndex: 0 }} />
              )}
              {/* Icon */}
              <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? '#5C6BC0' : 'rgba(255,255,255,0.1)', border: done ? 'none' : '2px solid rgba(255,255,255,0.2)', zIndex: 1 }}>
                {done ? <Check size={14} color="#fff" /> : i === 2 ? <Circle size={14} color="#5C6BC0" /> : <Lock size={12} color="rgba(255,255,255,0.4)" />}
              </div>
              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{phase}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Weeks {weeks}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tasks.map(t => (
                    <span key={t} style={{
                      fontSize: 12, padding: '4px 10px', borderRadius: 8,
                      background: done ? 'rgba(92,107,192,0.3)' : 'rgba(255,255,255,0.08)',
                      color: done ? 'rgba(200,200,255,0.9)' : 'rgba(255,255,255,0.55)',
                      border: done ? '1px solid rgba(92,107,192,0.3)' : '1px solid rgba(255,255,255,0.1)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
