import { useState, useRef } from 'react'
import { Upload, FileText, Image, FileCheck, X, ChevronRight } from 'lucide-react'

interface Props { dark: boolean; onSyllabusUploaded?: () => void }

const glassCard = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}

const metrics = [
  { label: 'Data Structures', score: 72, color: '#5C6BC0' },
  { label: 'Algorithms', score: 58, color: '#7E57C2' },
  { label: 'System Design', score: 34, color: '#EF9090' },
  { label: 'Cloud / DevOps', score: 28, color: '#EF9090' },
  { label: 'Web Development', score: 81, color: '#88D68A' },
]

const skillMatrix = [
  { skill: 'React.js', level: 'Intermediate', industry: 'Advanced', gap: 2, priority: 'High' },
  { skill: 'Kubernetes', level: 'Beginner', industry: 'Advanced', gap: 5, priority: 'Critical' },
  { skill: 'System Design', level: 'Beginner', industry: 'Advanced', gap: 5, priority: 'Critical' },
  { skill: 'Node.js', level: 'Intermediate', industry: 'Intermediate', gap: 0, priority: 'None' },
  { skill: 'AWS', level: 'Beginner', industry: 'Advanced', gap: 4, priority: 'High' },
  { skill: 'SQL', level: 'Intermediate', industry: 'Intermediate', gap: 1, priority: 'Medium' },
]

const radarPoints = [
  { label: 'DSA', value: 72 },
  { label: 'Web', value: 81 },
  { label: 'Cloud', value: 28 },
  { label: 'System', value: 34 },
  { label: 'Algo', value: 58 },
]

function RadarChart() {
  const cx = 110, cy = 110, r = 80
  const sides = radarPoints.length
  const angle = (2 * Math.PI) / sides
  const point = (i: number, val: number) => {
    const a = -Math.PI / 2 + i * angle
    const d = (val / 100) * r
    return { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) }
  }
  const outerPts = radarPoints.map((_, i) => point(i, 100))
  const valuePts = radarPoints.map((p, i) => point(i, p.value))
  const toPath = (pts: { x: number; y: number }[]) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'
  return (
    <svg width={220} height={220}>
      {[20, 40, 60, 80, 100].map(v => (
        <polygon key={v} points={radarPoints.map((_, i) => { const p = point(i, v); return `${p.x},${p.y}` }).join(' ')}
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      ))}
      {outerPts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      ))}
      <path d={toPath(valuePts)} fill="rgba(92,107,192,0.25)" stroke="#5C6BC0" strokeWidth={2} />
      {valuePts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill="#5C6BC0" />)}
      {radarPoints.map((pt, i) => {
        const p = point(i, 118)
        return <text key={i} x={p.x} y={p.y} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.6)" dominantBaseline="middle">{pt.label}</text>
      })}
    </svg>
  )
}

function getFileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase()
  if (['png', 'jpg', 'jpeg', 'webp'].includes(ext ?? '')) return <Image size={18} color="#7E87D0" />
  return <FileText size={18} color="#7E87D0" />
}

export default function SkillAnalysis({ dark: _dark, onSyllabusUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [analysed, setAnalysed] = useState(false)
  const [analysing, setAnalysing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => setFile(f)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleDone = () => {
    setAnalysing(true)
    setTimeout(() => {
      setAnalysing(false)
      setAnalysed(true)
      onSyllabusUploaded?.()
    }, 1800)
  }

  if (!analysed) {
    return (
      <div className="page-enter" style={{ padding: '40px 48px', maxWidth: 700, margin: '0 auto', fontFamily: "'Roboto Condensed', sans-serif" }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, color: '#4EC9B0', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace" }}>SKILL_ANALYSIS.EXE</div>
          <h1 className="display-mono" style={{ fontSize: 30, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>Upload Your Syllabus</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            Drop your course syllabus — PDF, Word doc, or a photo. We map it against industry requirements and surface your skill gaps.
          </p>
        </div>

        <div
          style={{
            ...glassCard,
            padding: '48px 40px',
            textAlign: 'center',
            cursor: 'pointer',
            borderColor: dragging ? 'rgba(78,201,176,0.6)' : file ? 'rgba(78,201,176,0.35)' : 'rgba(255,255,255,0.18)',
            background: dragging ? 'rgba(78,201,176,0.08)' : file ? 'rgba(78,201,176,0.05)' : 'rgba(255,255,255,0.1)',
            transition: 'all 0.2s',
          }}
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

          {file ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(78,201,176,0.12)', border: '1px solid rgba(78,201,176,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileCheck size={26} color="#4EC9B0" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{file.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{(file.size / 1024).toFixed(0)} KB · ready to analyse</div>
              </div>
              <button onClick={e => { e.stopPropagation(); setFile(null) }}
                style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '5px 12px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: "'Roboto Condensed', sans-serif" }}>
                <X size={12} /> Remove
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px dashed rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={24} color="rgba(255,255,255,0.4)" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 6 }}>Drop your syllabus here</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>or click to browse files</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' as const }}>
          {[{ icon: '📄', label: 'PDF' }, { icon: '📝', label: 'DOCX / DOC' }, { icon: '🖼️', label: 'PNG / JPG' }].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              <span>{icon}</span> {label}
            </div>
          ))}
        </div>

        {file && (
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleDone} disabled={analysing} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: 14, border: 'none',
              background: analysing ? 'rgba(78,201,176,0.2)' : 'rgba(78,201,176,0.9)',
              color: analysing ? 'rgba(255,255,255,0.6)' : '#0a0a0a',
              fontSize: 15, fontWeight: 700, fontFamily: "'Roboto Condensed', sans-serif",
              cursor: analysing ? 'default' : 'pointer', transition: 'all 0.2s',
            }}>
              {analysing ? (
                <>
                  <span style={{ display: 'flex', gap: 4 }}>
                    <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', display: 'inline-block' }} />
                    <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', display: 'inline-block' }} />
                    <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', display: 'inline-block' }} />
                  </span>
                  Analysing...
                </>
              ) : <>Done — Analyse <ChevronRight size={16} /></>}
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="page-enter" style={{ padding: '28px 32px', fontFamily: "'Roboto Condensed', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: '#4EC9B0', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>ANALYSIS_COMPLETE</div>
          <h1 className="display-mono" style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>Skill Analysis</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {file && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 10, background: 'rgba(78,201,176,0.1)', border: '1px solid rgba(78,201,176,0.25)', fontSize: 12, color: '#4EC9B0' }}>
              {getFileIcon(file.name)}
              {file.name.length > 28 ? file.name.slice(0, 25) + '...' : file.name}
            </div>
          )}
          <button onClick={() => { setAnalysed(false); setFile(null) }}
            style={{ padding: '7px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: 12, cursor: 'pointer', fontFamily: "'Roboto Condensed', sans-serif" }}>
            Re-upload
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ ...glassCard, padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.05em' }}>READINESS SCORE</div>
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={60} cy={60} r={50} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={10} />
              <circle cx={60} cy={60} r={50} fill="none" stroke="#5C6BC0" strokeWidth={10}
                strokeDasharray={`${(54 / 100) * 314} ${314 - (54 / 100) * 314}`} strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="display-mono" style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1 }}>54%</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>vs 76% avg</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#FFC77A', background: 'rgba(255,199,122,0.1)', border: '1px solid rgba(255,199,122,0.2)', borderRadius: 8, padding: '5px 14px' }}>Needs Improvement</div>
        </div>

        <div style={{ ...glassCard, padding: '24px 28px' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 20 }}>SKILL BREAKDOWN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {metrics.map(({ label, score, color }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{label}</span>
                  <span style={{ fontSize: 12, color, fontWeight: 700, fontFamily: "'Roboto Mono', monospace" }}>{score}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 6, background: color, width: `${score}%`, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ ...glassCard, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.05em', alignSelf: 'flex-start' }}>RADAR MAP</div>
          <RadarChart />
        </div>
        <div style={{ ...glassCard, padding: '24px 28px' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 18 }}>GAP SUMMARY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { area: 'Cloud & DevOps', gap: 'Large gap — 72% of JDs require K8s/Terraform', urgency: 'Critical' },
              { area: 'System Design', gap: 'Core interview topic with 0% current coverage', urgency: 'Critical' },
              { area: 'Algorithms', gap: 'Moderate gap — needs 3–4 weeks focused practice', urgency: 'High' },
              { area: 'React.js', gap: 'Close to intermediate target', urgency: 'Medium' },
            ].map(({ area, gap, urgency }) => (
              <div key={area} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{area}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 6, background: urgency === 'Critical' ? 'rgba(239,83,80,0.2)' : urgency === 'High' ? 'rgba(255,167,38,0.15)' : 'rgba(92,107,192,0.15)', color: urgency === 'Critical' ? '#EF9090' : urgency === 'High' ? '#FFC77A' : '#7E87D0' }}>{urgency}</span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{gap}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...glassCard, padding: '24px 28px' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 18 }}>SKILL MATRIX</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
          <thead>
            <tr>
              {['Skill', 'Your Level', 'Industry Req', 'Gap', 'Priority'].map(h => (
                <th key={h} style={{ textAlign: 'left', fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skillMatrix.map(({ skill, level, industry, gap, priority }) => (
              <tr key={skill}>
                <td style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 13, color: '#fff', fontWeight: 500 }}>{skill}</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{level}</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{industry}</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: "'Roboto Mono', monospace", fontSize: 12, color: gap > 3 ? '#EF9090' : gap > 0 ? '#FFC77A' : '#88D68A' }}>{gap > 0 ? `+${gap}` : '–'}</td>
                <td style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 7, background: priority === 'Critical' ? 'rgba(239,83,80,0.2)' : priority === 'High' ? 'rgba(255,167,38,0.12)' : priority === 'Medium' ? 'rgba(92,107,192,0.12)' : 'rgba(255,255,255,0.06)', color: priority === 'Critical' ? '#EF9090' : priority === 'High' ? '#FFC77A' : priority === 'Medium' ? '#7E87D0' : 'rgba(255,255,255,0.3)' }}>{priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
