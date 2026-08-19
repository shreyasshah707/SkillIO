import { useState } from 'react'
import { Mic, MicOff, Play, RotateCcw, ChevronRight, Star } from 'lucide-react'

interface Props { dark: boolean }

type InterviewType = 'technical' | 'behavioral' | 'coding'
type State = 'select' | 'question' | 'answer' | 'feedback'

const questions: Record<InterviewType, string[]> = {
  technical: [
    'Explain the difference between REST and GraphQL. When would you choose one over the other?',
    'How does a load balancer work? What are the different load balancing algorithms?',
    'What is the CAP theorem and how does it apply to distributed systems?',
  ],
  behavioral: [
    'Tell me about a time you had to debug a critical production issue under pressure.',
    'Describe a situation where you had to learn a new technology quickly. How did you approach it?',
    'How do you prioritize tasks when you have multiple deadlines?',
  ],
  coding: [
    'Given an array of integers, find the two numbers that add up to a target sum. Return their indices.',
    'Implement a function that validates whether a string of brackets is balanced.',
    'Design a simple LRU Cache with O(1) get and put operations.',
  ],
}

const feedbackData = {
  score: 72,
  strengths: ['Good structure in your answer', 'Mentioned relevant trade-offs', 'Clear communication'],
  improvements: ['Add a concrete example from experience', 'Discuss time/space complexity', 'Quantify impact with numbers'],
  modelAnswer: 'REST uses fixed endpoints and is stateless, great for simple CRUD operations. GraphQL uses a single endpoint where clients specify exactly what data they need — ideal for complex, nested data relationships and reducing over-fetching. Choose REST for simplicity and caching; GraphQL for flexible frontends and aggregating multiple data sources.',
}

const glassCard = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}

export default function Interview({ dark }: Props) {
  const [type, setType] = useState<InterviewType>('technical')
  const [state, setState] = useState<State>('select')
  const [qIdx, setQIdx] = useState(0)
  const [recording, setRecording] = useState(false)
  const [answer, setAnswer] = useState('')

  const currentQ = questions[type][qIdx]

  const types: { id: InterviewType; label: string; desc: string }[] = [
    { id: 'technical', label: 'Technical', desc: 'System design, CS fundamentals' },
    { id: 'behavioral', label: 'Behavioral', desc: 'STAR method, soft skills' },
    { id: 'coding', label: 'Coding', desc: 'DSA, problem-solving' },
  ]

  return (
    <div className="page-enter" style={{ padding: '28px', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.4)', marginBottom: 4 }}>Interview Prep</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Practice with AI, get scored feedback</p>
      </div>

      {state === 'select' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
          {types.map(({ id, label, desc }) => (
            <button key={id} onClick={() => { setType(id); setState('question'); setQIdx(0) }} style={{
              padding: '28px 24px', borderRadius: 18,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.18)',
              cursor: 'pointer', textAlign: 'left',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              transition: 'transform 0.15s, background 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.16)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{desc}</div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 4, color: '#7E87D0', fontSize: 13, fontWeight: 600 }}>
                Start round <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>
      )}

      {(state === 'question' || state === 'answer') && (
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ ...glassCard, padding: '28px', marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 14 }}>
              {type.toUpperCase()} · Q{qIdx + 1} of {questions[type].length}
            </div>
            <p style={{ fontSize: 17, color: '#fff', lineHeight: 1.65, fontWeight: 500 }}>{currentQ}</p>
          </div>

          {state === 'question' && (
            <div style={{ ...glassCard, padding: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>Type your answer or use voice recording</p>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Start typing your answer..."
                style={{ width: '100%', minHeight: 140, padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', fontSize: 14, fontFamily: "'Roboto Condensed', sans-serif", color: '#fff', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
                <button onClick={() => setRecording(!recording)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: recording ? '#EF5350' : 'rgba(255,255,255,0.1)', cursor: 'pointer', color: '#fff', fontFamily: "'Roboto Condensed', sans-serif", fontSize: 14 }}>
                  {recording ? <MicOff size={15} /> : <Mic size={15} />}
                  {recording ? 'Stop Recording' : 'Record Answer'}
                </button>
                <button onClick={() => setState('feedback')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', color: '#fff', fontFamily: "'Roboto Condensed', sans-serif", fontSize: 14, fontWeight: 600 }}>
                  <Play size={14} /> Get Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {state === 'feedback' && (
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Score */}
          <div style={{ ...glassCard, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: feedbackData.score > 80 ? 'rgba(102,187,106,0.15)' : 'rgba(255,167,38,0.15)', border: `3px solid ${feedbackData.score > 80 ? '#88D68A' : '#FFC77A'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="display-mono" style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{feedbackData.score}</span>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Good answer — room to improve</div>
              <div style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill={i < 3 ? '#FFC77A' : 'none'} color={i < 3 ? '#FFC77A' : 'rgba(255,255,255,0.2)'} />)}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button onClick={() => { setState('question'); setAnswer('') }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', cursor: 'pointer', fontSize: 13, color: '#fff', fontFamily: "'Roboto Condensed', sans-serif" }}>
                <RotateCcw size={13} /> Retry
              </button>
              {qIdx < questions[type].length - 1 && (
                <button onClick={() => { setQIdx(i => i + 1); setState('question'); setAnswer('') }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: 13, color: '#fff', fontFamily: "'Roboto Condensed', sans-serif" }}>
                  Next Q <ChevronRight size={13} />
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ ...glassCard, padding: '22px 24px' }}>
              <div style={{ fontSize: 12, color: '#88D68A', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 12 }}>STRENGTHS</div>
              {feedbackData.strengths.map(s => <div key={s} style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 8, display: 'flex', gap: 8 }}><span style={{ color: '#88D68A' }}>✓</span>{s}</div>)}
            </div>
            <div style={{ ...glassCard, padding: '22px 24px' }}>
              <div style={{ fontSize: 12, color: '#FFC77A', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 12 }}>IMPROVE</div>
              {feedbackData.improvements.map(s => <div key={s} style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 8, display: 'flex', gap: 8 }}><span style={{ color: '#FFC77A' }}>↗</span>{s}</div>)}
            </div>
          </div>

          <div style={{ ...glassCard, padding: '22px 24px' }}>
            <div style={{ fontSize: 12, color: '#7E87D0', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 12 }}>MODEL ANSWER</div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>{feedbackData.modelAnswer}</p>
          </div>

          <button onClick={() => setState('select')} style={{ alignSelf: 'flex-start', padding: '10px 20px', borderRadius: 11, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', cursor: 'pointer', fontSize: 13, color: '#fff', fontFamily: "'Roboto Condensed', sans-serif" }}>
            ← Back to sessions
          </button>
        </div>
      )}
    </div>
  )
}
