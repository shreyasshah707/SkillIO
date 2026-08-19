import { useState } from 'react'
import { Bookmark, ExternalLink, Clock, Star } from 'lucide-react'

interface Props { dark: boolean }

const projects = [
  { title: 'Auto-scaling Web App on AWS', category: 'Cloud', difficulty: 'Intermediate', hours: '40–60h', rating: 4.9, tags: ['AWS', 'EC2', 'RDS', 'Load Balancer'], desc: 'Build a production-grade web app with auto-scaling groups, RDS backend, and CloudWatch monitoring. Perfect for AWS Solutions Architect prep.', bookmarked: true },
  { title: 'Kubernetes Cluster with Monitoring', category: 'DevOps', difficulty: 'Advanced', hours: '50–80h', rating: 4.8, tags: ['K8s', 'Helm', 'Prometheus', 'Grafana'], desc: 'Deploy a multi-service app on Kubernetes with Helm chart packaging, HPA, and full observability stack.', bookmarked: false },
  { title: 'CI/CD Pipeline with GitHub Actions', category: 'DevOps', difficulty: 'Beginner', hours: '20–30h', rating: 4.7, tags: ['GitHub Actions', 'Docker', 'Terraform'], desc: 'Build end-to-end CI/CD: automated testing, Docker image builds, and blue-green deployment to a cloud environment.', bookmarked: true },
  { title: 'ML Model Serving at Scale', category: 'ML', difficulty: 'Advanced', hours: '60–90h', rating: 4.6, tags: ['FastAPI', 'Docker', 'Redis', 'gRPC'], desc: 'Productionize a trained ML model with REST + gRPC endpoints, Redis caching layer, and latency monitoring.', bookmarked: false },
]

const diffColor = (d: string) => d === 'Beginner' ? '#88D68A' : d === 'Intermediate' ? '#FFC77A' : '#EF9090'
const diffBg = (d: string) => d === 'Beginner' ? 'rgba(102,187,106,0.15)' : d === 'Intermediate' ? 'rgba(255,167,38,0.15)' : 'rgba(239,83,80,0.15)'

const glassCard = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}

export default function Projects({ dark }: Props) {
  const [filter, setFilter] = useState('All')
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set(['Auto-scaling Web App on AWS', 'CI/CD Pipeline with GitHub Actions']))
  const cats = ['All', 'DevOps', 'Cloud', 'ML']

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <div className="page-enter" style={{ padding: '28px', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.4)', marginBottom: 4 }}>Projects</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Curated with IEEE papers, GitHub refs, and datasets</p>
      </div>

      {/* Filter bar */}
      <div style={{ ...glassCard, padding: '14px 18px', marginBottom: 16, display: 'flex', gap: 8 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '7px 16px', borderRadius: 9,
            background: filter === c ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.07)',
            border: filter === c ? '1px solid rgba(255,255,255,0.35)' : '1px solid transparent',
            cursor: 'pointer',
            color: filter === c ? '#fff' : 'rgba(255,255,255,0.55)',
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: 13, fontWeight: filter === c ? 600 : 400,
            transition: 'all 0.15s',
          }}>{c}</button>
        ))}
      </div>

      {/* Projects grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {filtered.map(({ title, category, difficulty, hours, rating, tags, desc }) => {
          const bm = bookmarks.has(title)
          return (
            <div key={title} style={{ ...glassCard, padding: '22px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{category}</span>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: diffBg(difficulty), color: diffColor(difficulty), fontWeight: 600 }}>{difficulty}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{title}</div>
                </div>
                <button onClick={() => setBookmarks(s => { const n = new Set(s); bm ? n.delete(title) : n.add(title); return n })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: bm ? '#7E87D0' : 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                  <Bookmark size={16} fill={bm ? '#7E87D0' : 'none'} />
                </button>
              </div>

              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 14 }}>{desc}</p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {tags.map(t => (
                  <span key={t} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 7, background: 'rgba(92,107,192,0.2)', color: 'rgba(180,185,240,0.9)', border: '1px solid rgba(92,107,192,0.25)' }}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {hours}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12} fill="#FFC77A" color="#FFC77A" /> {rating}</span>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 9, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', color: '#fff', fontSize: 12, fontFamily: "'Roboto Condensed', sans-serif" }}>
                  <ExternalLink size={11} /> Start Project
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
