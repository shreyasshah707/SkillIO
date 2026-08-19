import { useState } from 'react'
import { Download, Plus, Sparkles, AlertCircle, CheckCircle } from 'lucide-react'

interface Props { dark: boolean }

const suggestions = [
  { keyword: 'System Design', status: 'missing', impact: 'High' },
  { keyword: 'REST API', status: 'present', impact: 'High' },
  { keyword: 'React.js', status: 'present', impact: 'Medium' },
  { keyword: 'Docker', status: 'missing', impact: 'High' },
  { keyword: 'SQL / PostgreSQL', status: 'present', impact: 'Medium' },
  { keyword: 'CI/CD Pipeline', status: 'missing', impact: 'Medium' },
  { keyword: 'LLM Integration', status: 'missing', impact: 'High' },
]

const glassCard = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}

export default function Resume({ dark }: Props) {
  const [atsScore] = useState(64)
  const [activeSection, setActiveSection] = useState('experience')

  return (
    <div className="page-enter" style={{ padding: '32px 36px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Roboto Condensed', sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 11, color: '#7E87D0', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 6 }}>RESUME BUILDER</div>
          <h1 className="display-mono" style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>Resume & ATS</h1>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, padding: '10px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', cursor: 'pointer', fontFamily: "'Roboto Condensed', sans-serif" }}>
          <Download size={15} /> Export PDF
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Editor side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 4, width: 'fit-content' }}>
            {['experience', 'education', 'skills', 'projects'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                style={{
                  padding: '8px 16px', borderRadius: 9, fontSize: 13, fontWeight: activeSection === tab ? 600 : 400,
                  background: activeSection === tab ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: activeSection === tab ? '1px solid rgba(255,255,255,0.2)' : 'none',
                  color: activeSection === tab ? '#fff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  fontFamily: "'Roboto Condensed', sans-serif",
                  textTransform: 'capitalize',
                  transition: 'all 0.15s',
                }}
              >{tab}</button>
            ))}
          </div>

          {/* Section content */}
          <div style={{ ...glassCard, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', textTransform: 'capitalize' }}>{activeSection}</div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#7E87D0', fontSize: 13, fontFamily: "'Roboto Condensed', sans-serif" }}>
                <Plus size={14} /> Add entry
              </button>
            </div>

            {activeSection === 'experience' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { role: 'Software Engineering Intern', company: 'Razorpay', period: 'Jun 2024 – Aug 2024', bullets: ['Built payment retry logic reducing failed transactions by 18%', 'Designed REST APIs consumed by 3 product teams', 'Migrated legacy cron jobs to event-driven architecture'] },
                  { role: 'Open Source Contributor', company: 'Apache Airflow', period: 'Jan 2024 – present', bullets: ['Fixed 4 critical bugs in the scheduler module', 'Added documentation for 12 new operators'] },
                ].map(({ role, company, period, bullets }) => (
                  <div key={role} style={{ paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{role}</div>
                      <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{period}</div>
                    </div>
                    <div style={{ fontSize: 13, color: '#7E87D0', marginBottom: 10 }}>{company}</div>
                    <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {bullets.map(b => <li key={b} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeSection !== 'experience' && (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
                <Plus size={20} style={{ marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
                Add your {activeSection} entries
              </div>
            )}
          </div>

          {/* AI suggestions */}
          <div style={{ background: 'rgba(92,107,192,0.12)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(92,107,192,0.25)', borderRadius: 18, padding: 20 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
              <Sparkles size={14} color="#7E87D0" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#7E87D0' }}>AI SUGGESTION</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
              Quantify the impact of your Razorpay internship more specifically. Instead of "reducing failed transactions by 18%", add the monetary value if possible — "saving ~₹2.4L in monthly transaction losses."
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* ATS Score */}
          <div style={{ ...glassCard, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 16 }}>ATS SCORE</div>
            <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 16px' }}>
              <svg width={100} height={100} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={50} cy={50} r={40} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={8} />
                <circle cx={50} cy={50} r={40} fill="none" stroke={atsScore < 50 ? '#EF9090' : atsScore < 75 ? '#FFC77A' : '#88D68A'} strokeWidth={8}
                  strokeDasharray={`${(atsScore / 100) * 251} ${251 - (atsScore / 100) * 251}`} strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="display-mono" style={{ fontSize: 24, fontWeight: 600, color: '#fff' }}>{atsScore}</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>/ 100</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#FFC77A', fontWeight: 600 }}>Needs improvement</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Add missing keywords to improve</div>
          </div>

          {/* Keyword suggestions */}
          <div style={{ ...glassCard, padding: 22 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 14 }}>KEYWORD GAPS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {suggestions.map(({ keyword, status, impact }) => (
                <div key={keyword} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    {status === 'present'
                      ? <CheckCircle size={13} color="#88D68A" />
                      : <AlertCircle size={13} color={impact === 'High' ? '#EF9090' : '#FFC77A'} />}
                    <span style={{ fontSize: 13, color: '#fff' }}>{keyword}</span>
                  </div>
                  <span style={{ fontSize: 11, color: impact === 'High' ? '#EF9090' : '#FFC77A', fontWeight: 600 }}>{status === 'missing' ? impact : '✓'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
