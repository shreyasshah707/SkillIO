import { useState, useEffect } from 'react'
import { ArrowRight, Zap, Target, BookOpen, Briefcase, ChevronDown, Star, Check, Brain, Sparkles, TrendingUp, Code2, FileText } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'

interface Props {
  dark: boolean
  toggleDark: () => void
  onLogin: () => void
  onSignup: () => void
}

const features = [
  { icon: Brain, title: 'Syllabus Gap Finder', desc: 'Upload your curriculum. We map every missing industry skill in seconds.' },
  { icon: Target, title: 'Personalized Roadmaps', desc: 'AI-generated learning paths built around your career goal and timeline.' },
  { icon: Code2, title: 'Real-World Projects', desc: 'Curated projects with IEEE papers, GitHub refs, and datasets.' },
  { icon: FileText, title: 'Resume & ATS', desc: 'Build an ATS-optimized resume tailored to the roles you want.' },
  { icon: Briefcase, title: 'Mock Interviews', desc: 'Practice technical, behavioral, and coding rounds with AI feedback.' },
  { icon: TrendingUp, title: 'Progress Analytics', desc: 'Heatmaps, streaks, and skill growth charts to keep you consistent.' },
]

const howItWorks = [
  { n: '01', title: 'Upload Your Syllabus', desc: 'Drop your university PDF. Our AI reads every subject, topic, and module in seconds.', icon: BookOpen },
  { n: '02', title: 'Gap Analysis', desc: 'We compare your curriculum against 200+ industry job roles and surface the gaps ranked by urgency.', icon: Zap },
  { n: '03', title: 'Get Your Roadmap', desc: 'Receive a personalized learning plan ordered by career impact, with resources and timelines.', icon: Target },
  { n: '04', title: 'Track & Grow', desc: 'Build projects, practice interviews, and watch your industry readiness score climb week over week.', icon: TrendingUp },
]

const testimonials = [
  { name: 'Arjun Mehta', role: 'SWE Intern @ Google', text: 'Skill/IO showed me exactly what my curriculum was missing. Landed my dream internship in 4 months.', rating: 5 },
  { name: 'Priya Sharma', role: 'Data Analyst @ Flipkart', text: 'The skill gap analysis was eye-opening. I had no idea how far behind the industry my college was.', rating: 5 },
  { name: 'Rahul Verma', role: 'ML Engineer @ Swiggy', text: 'Ask Vector is like having a senior engineer available 24/7. Game changer for interview prep.', rating: 5 },
]

const plans = [
  { name: 'Free', price: '₹0', period: '/mo', features: ['Skill Gap Analysis', '20 AI Credits/mo', 'Basic Resume Builder', 'Community Access'], cta: 'Get Started', highlight: false },
  { name: 'Pro', price: '₹799', period: '/mo', features: ['Everything in Free', 'Roadmaps & Projects', '500 AI Credits/mo', 'Mock Interviews', 'Advanced Analytics', 'Priority AI'], cta: 'Start Free Trial', highlight: true },
  { name: 'Team', price: '₹2,499', period: '/mo', features: ['Everything in Pro', 'Up to 10 seats', 'Team Analytics', 'Custom Roadmaps', 'Dedicated Support'], cta: 'Contact Sales', highlight: false },
]

const faqs = [
  { q: 'How does the skill gap analysis work?', a: 'Upload your university syllabus as a PDF. Our AI extracts topics, compares them against industry job descriptions, and surfaces the gaps — ranked by importance.' },
  { q: 'What is Ask Vector?', a: 'Ask Vector is your AI learning companion. Ask anything about a concept, get code explanations, practice problems, or career advice — all in one conversational interface.' },
  { q: 'Are the roadmaps actually personalized?', a: 'Yes. Roadmaps are generated based on your current semester, branch, career goal, and daily study availability — not generic templates.' },
  { q: 'Can I use Skill/IO for free?', a: 'Absolutely. The free plan includes skill analysis, 20 AI credits per month, and basic resume tools. Upgrade for roadmaps, projects, and interviews.' },
]

export default function Landing({ dark, toggleDark, onLogin, onSignup }: Props) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const bg = dark ? '#111111' : '#F7F3E9'
  const card = dark ? 'rgba(24,24,24,0.85)' : 'rgba(251,249,242,0.85)'
  const text = dark ? '#F3F3F3' : '#181818'
  const muted = dark ? '#888' : '#666'
  const border = dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.09)'
  const glassCard = dark
    ? 'rgba(30,30,30,0.7)'
    : 'rgba(255,255,255,0.72)'
  const glassBlur = 'blur(20px) saturate(1.5)'

  return (
    <div style={{ background: bg, color: text, minHeight: '100vh', fontFamily: "'Roboto Condensed', sans-serif" }}>

      {/* ─── CAPSULE NAV ─── */}
      <div style={{ position: 'fixed', top: 20, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
        <nav style={{
          display: 'flex', alignItems: 'center', gap: 0,
          background: scrolled
            ? dark ? 'rgba(20,20,20,0.88)' : 'rgba(247,243,233,0.92)'
            : dark ? 'rgba(20,20,20,0.7)' : 'rgba(247,243,233,0.8)',
          backdropFilter: 'blur(24px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
          border: `1px solid ${border}`,
          borderRadius: 100,
          padding: '8px 8px 8px 20px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          transition: 'background 0.3s, box-shadow 0.3s',
          maxWidth: 780, width: '100%',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 32 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: dark ? '#F3F3F3' : '#181818', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={13} color={dark ? '#111' : '#F7F3E9'} />
            </div>
            <span className="display-mono" style={{ fontSize: 15, fontWeight: 600, color: text, whiteSpace: 'nowrap' }}>Skill/IO</span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 4, flex: 1 }}>
            {['Features', 'How It Works', 'Pricing', 'FAQ'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                style={{ color: muted, textDecoration: 'none', fontSize: 14, fontWeight: 500, padding: '6px 14px', borderRadius: 100, transition: 'background 0.15s, color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = text }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = muted }}
              >{link}</a>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 8 }}>
            <ThemeToggle dark={dark} toggle={toggleDark} />
            <button onClick={onLogin} style={{ padding: '8px 18px', borderRadius: 100, border: `1px solid ${border}`, background: 'transparent', color: muted, fontFamily: "'Roboto Condensed', sans-serif", fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Log in
            </button>
            <button onClick={onSignup} style={{ padding: '9px 20px', borderRadius: 100, border: 'none', background: dark ? '#F3F3F3' : '#181818', color: dark ? '#111' : '#F7F3E9', fontFamily: "'Roboto Condensed', sans-serif", fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Get Started
            </button>
          </div>
        </nav>
      </div>

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: 160, paddingBottom: 120, paddingLeft: 80, paddingRight: 80, maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div className="page-enter">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: dark ? 'rgba(92,107,192,0.14)' : 'rgba(92,107,192,0.09)', border: '1px solid rgba(92,107,192,0.22)', borderRadius: 100, padding: '5px 14px', marginBottom: 28 }}>
              <Zap size={11} color="#5C6BC0" />
              <span style={{ fontSize: 11, color: '#5C6BC0', fontWeight: 700, letterSpacing: '0.06em' }}>AI-POWERED EDUCATION</span>
            </div>
            <h1 className="display-mono" style={{ fontSize: 'clamp(38px, 5vw, 60px)', fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.03em', marginBottom: 24, color: text }}>
              Bridge the gap<br />between college<br /><span style={{ color: '#5C6BC0' }}>and industry.</span>
            </h1>
            <p style={{ fontSize: 17, color: muted, lineHeight: 1.65, maxWidth: 440, marginBottom: 40 }}>
              Skill/IO analyzes your syllabus, finds missing skills, and builds a personalized roadmap to make you industry-ready — before graduation.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={onSignup} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, padding: '13px 28px', borderRadius: 100 }}>
                Start for free <ArrowRight size={16} />
              </button>
              <button onClick={onLogin} style={{ padding: '13px 24px', borderRadius: 100, border: `1px solid ${border}`, background: 'transparent', color: muted, fontFamily: "'Roboto Condensed', sans-serif", fontSize: 15, cursor: 'pointer' }}>
                See a demo
              </button>
            </div>
            <div style={{ display: 'flex', gap: 28, marginTop: 40 }}>
              {[['2,400+', 'Students'], ['94%', 'Placement Rate'], ['4.9★', 'Rating']].map(([n, l]) => (
                <div key={l}>
                  <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: text }}>{n}</div>
                  <div style={{ fontSize: 12, color: muted }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero glass card */}
          <div className="page-enter" style={{ animationDelay: '0.07s' }}>
            <div style={{ background: glassCard, backdropFilter: glassBlur, WebkitBackdropFilter: glassBlur, border: `1px solid ${border}`, borderRadius: 24, padding: 32, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
              <div style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${border}` }}>
                  <BookOpen size={18} color={muted} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: text }}>Skill Gap Report</div>
                  <div style={{ fontSize: 12, color: muted }}>Computer Science · Sem 5</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: '#5C6BC0', background: 'rgba(92,107,192,0.1)', padding: '4px 10px', borderRadius: 8, fontWeight: 700 }}>72% Ready</span>
              </div>
              <div style={{ fontSize: 12, color: muted, fontWeight: 600, marginBottom: 12, letterSpacing: '0.04em' }}>MISSING SKILLS</div>
              {[
                { skill: 'System Design', gap: 'Critical', pct: 15, color: '#EF5350' },
                { skill: 'LLM Fine-tuning', gap: 'High', pct: 35, color: '#FFA726' },
                { skill: 'DevOps / CI-CD', gap: 'Medium', pct: 58, color: '#FFA726' },
                { skill: 'API Design', gap: 'Low', pct: 78, color: '#66BB6A' },
              ].map(({ skill, gap, pct, color }) => (
                <div key={skill} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: text }}>{skill}</span>
                    <span style={{ fontSize: 11, color, fontWeight: 700 }}>{gap}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 4, background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }}>
                    <div style={{ height: '100%', borderRadius: 4, background: color, width: `${pct}%` }} />
                  </div>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${border}`, paddingTop: 14, marginTop: 6 }}>
                <div style={{ background: 'rgba(92,107,192,0.08)', border: '1px solid rgba(92,107,192,0.15)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: text }}>
                  <span style={{ color: '#5C6BC0', fontWeight: 600 }}>Next →</span> Start System Design roadmap
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 12, justifyContent: 'flex-end' }}>
                {[0, 1, 2].map(i => <div key={i} className="typing-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#5C6BC0' }} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" style={{ padding: '100px 80px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, color: '#5C6BC0', fontWeight: 700, letterSpacing: '0.07em', marginBottom: 12 }}>WHAT WE DO</div>
          <h2 className="display-mono" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', color: text, marginBottom: 14 }}>Everything you need<br />to get industry-ready.</h2>
          <p style={{ fontSize: 16, color: muted, maxWidth: 460, margin: '0 auto' }}>One platform. Every tool a student needs between now and their first job offer.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ background: glassCard, backdropFilter: glassBlur, WebkitBackdropFilter: glassBlur, border: `1px solid ${border}`, borderRadius: 20, padding: 28, boxShadow: '0 2px 20px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(92,107,192,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, border: '1px solid rgba(92,107,192,0.15)' }}>
                <Icon size={18} color="#5C6BC0" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: text, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS — TIMELINE ─── */}
      <section id="how-it-works" style={{ padding: '100px 80px', borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 11, color: '#5C6BC0', fontWeight: 700, letterSpacing: '0.07em', marginBottom: 12 }}>THE PROCESS</div>
            <h2 className="display-mono" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', color: text }}>How Skill/IO works</h2>
          </div>

          {/* Vertical timeline */}
          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
            {/* Center line */}
            <div style={{ position: 'absolute', left: 36, top: 24, bottom: 24, width: 2, background: `linear-gradient(to bottom, #5C6BC0, rgba(92,107,192,0.1))`, borderRadius: 2 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {howItWorks.map(({ n, title, desc, icon: Icon }, i) => (
                <div key={n} style={{ display: 'flex', gap: 24, paddingBottom: i < howItWorks.length - 1 ? 40 : 0 }}>
                  {/* Node */}
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: glassCard, backdropFilter: glassBlur, WebkitBackdropFilter: glassBlur, border: `2px solid ${i === 0 ? '#5C6BC0' : border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: i === 0 ? '0 0 0 6px rgba(92,107,192,0.1)' : 'none', position: 'relative', zIndex: 2 }}>
                      <Icon size={22} color={i === 0 ? '#5C6BC0' : muted} />
                    </div>
                  </div>
                  {/* Card */}
                  <div style={{ flex: 1, paddingBottom: 8 }}>
                    <div style={{ background: glassCard, backdropFilter: glassBlur, WebkitBackdropFilter: glassBlur, border: `1px solid ${border}`, borderRadius: 18, padding: '22px 26px', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <span className="display-mono" style={{ fontSize: 13, color: '#5C6BC0', fontWeight: 700 }}>{n}</span>
                        <div style={{ height: 1, flex: 1, background: border }} />
                      </div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: text, marginBottom: 8 }}>{title}</div>
                      <div style={{ fontSize: 14, color: muted, lineHeight: 1.65 }}>{desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: '100px 80px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 className="display-mono" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', color: text }}>Students love Skill/IO</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {testimonials.map(({ name, role, text: t, rating }) => (
            <div key={name} style={{ background: glassCard, backdropFilter: glassBlur, WebkitBackdropFilter: glassBlur, border: `1px solid ${border}`, borderRadius: 20, padding: 28, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                {Array.from({ length: rating }).map((_, i) => <Star key={i} size={13} fill="#FFA726" color="#FFA726" />)}
              </div>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.7, marginBottom: 18 }}>"{t}"</p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: text }}>{name}</div>
                <div style={{ fontSize: 12, color: muted }}>{role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" style={{ padding: '100px 80px', borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, color: '#5C6BC0', fontWeight: 700, letterSpacing: '0.07em', marginBottom: 12 }}>PRICING</div>
            <h2 className="display-mono" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', color: text }}>Simple, honest pricing</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, maxWidth: 900, margin: '0 auto' }}>
            {plans.map(({ name, price, period, features: f, cta, highlight }) => (
              <div key={name} style={{
                background: highlight ? (dark ? 'rgba(92,107,192,0.18)' : 'rgba(92,107,192,0.07)') : glassCard,
                backdropFilter: glassBlur, WebkitBackdropFilter: glassBlur,
                border: highlight ? '1.5px solid rgba(92,107,192,0.35)' : `1px solid ${border}`,
                borderRadius: 22, padding: 32, position: 'relative',
                boxShadow: highlight ? '0 8px 40px rgba(92,107,192,0.12)' : '0 2px 20px rgba(0,0,0,0.05)',
              }}>
                {highlight && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#5C6BC0', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 14px', borderRadius: 100, letterSpacing: '0.05em' }}>MOST POPULAR</div>}
                <div style={{ fontSize: 15, fontWeight: 700, color: text, marginBottom: 8 }}>{name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 24 }}>
                  <span className="display-mono" style={{ fontSize: 36, fontWeight: 700, color: text }}>{price}</span>
                  <span style={{ fontSize: 13, color: muted }}>{period}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {f.map(feat => (
                    <div key={feat} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Check size={13} color="#5C6BC0" />
                      <span style={{ fontSize: 13, color: muted }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <button onClick={onSignup} style={{
                  width: '100%', padding: '12px 0', borderRadius: 100,
                  border: highlight ? 'none' : `1px solid ${border}`,
                  background: highlight ? (dark ? '#F3F3F3' : '#181818') : 'transparent',
                  color: highlight ? (dark ? '#111' : '#fff') : muted,
                  fontFamily: "'Roboto Condensed', sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}>{cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ padding: '100px 80px', borderTop: `1px solid ${border}`, maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="display-mono" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', color: text }}>FAQ</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map(({ q, a }, i) => (
              <div key={i} style={{ background: glassCard, backdropFilter: glassBlur, WebkitBackdropFilter: glassBlur, border: `1px solid ${border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: '100%', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: text, fontFamily: "'Roboto Condensed', sans-serif", fontSize: 15, fontWeight: 600, textAlign: 'left', gap: 12 }}>
                  {q}
                  <ChevronDown size={16} color={muted} style={{ transition: 'transform 0.2s', transform: faqOpen === i ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
                </button>
                {faqOpen === i && <div style={{ padding: '0 24px 20px', fontSize: 14, color: muted, lineHeight: 1.65 }}>{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ padding: '80px', borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="display-mono" style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em', color: text, marginBottom: 16 }}>Ready to close the gap?</h2>
          <p style={{ fontSize: 16, color: muted, marginBottom: 32 }}>Join 2,400+ students already using Skill/IO to accelerate their careers.</p>
          <button onClick={onSignup} className="btn-primary" style={{ fontSize: 16, padding: '14px 40px', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Create free account <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: '36px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: dark ? '#F3F3F3' : '#181818', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={12} color={dark ? '#111' : '#F7F3E9'} />
          </div>
          <span className="display-mono" style={{ fontSize: 14, fontWeight: 600, color: text }}>Skill/IO</span>
        </div>
        <div style={{ fontSize: 13, color: muted }}>© 2025 Skill/IO. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Contact'].map(l => <span key={l} style={{ fontSize: 13, color: muted, cursor: 'pointer' }}>{l}</span>)}
        </div>
      </footer>
    </div>
  )
}
