'use client'

import { useEffect, useRef, useState } from 'react'

const roles = ['AI Engineer', 'Data Analyst', 'Computer Vision Engineer', 'Data Scientist', 'Software Engineer']

const terminalLines = [
  { delay: 0,    color: 'var(--text-subtle)', text: '$ python train_model.py' },
  { delay: 600,  color: 'var(--accent)',      text: '✓ Loading dataset... 48,293 records' },
  { delay: 1200, color: 'var(--text-muted)',  text: '→ Preprocessing pipeline complete' },
  { delay: 1800, color: 'var(--accent-2)',    text: '⬡ Training LSTM [epoch 50/50]' },
  { delay: 2400, color: 'var(--text-muted)',  text: '→ val_loss: 0.0021 · val_acc: 98.7%' },
  { delay: 3000, color: 'var(--accent)',      text: '✓ Model saved → ./models/best.pt' },
  { delay: 3600, color: '#c084fc',            text: '◈ Deploying to production...' },
  { delay: 4200, color: 'var(--accent)',      text: '✓ Live at api.miguel.dev/v2' },
]

const stats = [
  { label: 'Accuracy', value: '98.7%', color: 'var(--accent)', bar: 0.987 },
  { label: 'F1 Score',  value: '0.964', color: 'var(--accent-2)', bar: 0.964 },
  { label: 'AUC-ROC',  value: '0.991', color: '#c084fc', bar: 0.991 },
]

function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [looping, setLooping] = useState(false)

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = []
    const run = () => {
      setVisibleLines(0)
      terminalLines.forEach((line, i) => {
        const t = setTimeout(() => setVisibleLines(i + 1), line.delay + 300)
        timeouts.push(t)
      })
      const reset = setTimeout(() => {
        setLooping(l => !l) // trigger re-run
      }, terminalLines[terminalLines.length - 1].delay + 2800)
      timeouts.push(reset)
    }
    run()
    return () => timeouts.forEach(clearTimeout)
  }, [looping])

  return (
    <div style={{
      background: 'var(--bg-2)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '12px 16px',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>
          miguel@portfolio ~ model_training
        </span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '20px', minHeight: '220px' }}>
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px',
            color: line.color, lineHeight: '1.8',
            opacity: 1,
            animation: 'termFadeIn 0.2s ease',
          }}>
            {line.text}
          </div>
        ))}
        {visibleLines < terminalLines.length && (
          <span style={{
            display: 'inline-block', width: '8px', height: '14px',
            background: 'var(--accent)', borderRadius: '1px',
            animation: 'blink 1s step-end infinite', marginTop: '2px',
            verticalAlign: 'middle',
          }} />
        )}
      </div>
    </div>
  )
}

function MetricsCard() {
  return (
    <div style={{
      background: 'var(--bg-2)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Model Metrics
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'var(--accent)', background: 'var(--accent-dim)',
          padding: '2px 8px', borderRadius: '4px',
        }}>
          LIVE
        </span>
      </div>
      {stats.map((s, i) => (
        <div key={i} style={{ marginBottom: i < stats.length - 1 ? '14px' : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{s.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: s.color, fontWeight: 600 }}>{s.value}</span>
          </div>
          <div style={{ height: '4px', background: 'var(--bg-3)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${s.bar * 100}%`,
              background: s.color, borderRadius: '2px',
              animation: 'barGrow 1.2s ease both',
              animationDelay: `${i * 0.2}s`,
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function TechStackCard() {
  const techs = [
    { label: 'PyTorch',     color: '#fb923c' },
    { label: 'TensorFlow',  color: 'var(--accent)' },
    { label: 'LangChain',   color: '#c084fc' },
    { label: 'FastAPI',     color: 'var(--accent-2)' },
    { label: 'PostgreSQL',  color: 'var(--accent-2)' },
    { label: 'Docker',      color: 'var(--accent-2)' },
    { label: 'YOLOv11',     color: 'var(--accent)' },
    { label: 'Scikit-learn',color: '#fb923c' },
  ]
  return (
    <div style={{
      background: 'var(--bg-2)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
        Tech Stack
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {techs.map((t, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: t.color,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '4px 10px', borderRadius: '6px',
            letterSpacing: '0.02em',
          }}>
            {t.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 32px 80px',
      }}
    >
      {/* Background grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Gradient orbs */}
      <div style={{
        position: 'absolute', top: '15%', right: '-5%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(74,242,161,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(126,184,247,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative' }}>
        <div ref={containerRef} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
        className="hero-grid"
        >

          {/* ── LEFT: Text content ── */}
          <div>
            {/* Status badge */}
            <div style={{ marginBottom: '32px', animation: 'fadeUp 0.6s ease both', animationDelay: '0.1s' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'var(--accent)', background: 'var(--accent-dim)',
                border: '1px solid rgba(74,242,161,0.2)',
                padding: '6px 14px', borderRadius: '100px', letterSpacing: '0.05em',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse-glow 2s ease infinite' }} />
                Let's Build Something Impactful
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              animation: 'fadeUp 0.7s ease both',
              animationDelay: '0.2s',
              color: 'var(--text)',
            }}>
              Hi, I'm Miguel.
            </h1>

            {/* Typed role */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3.5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '32px',
              animation: 'fadeUp 0.7s ease both',
              animationDelay: '0.3s',
              height: 'clamp(2rem, 5vw, 4.5rem)',
              display: 'flex', alignItems: 'flex-start',
            }}>
              <span className="gradient-text">{displayed}</span>
              <span style={{ display: 'inline-block', width: '3px', height: '0.85em', marginLeft: '6px', marginTop: '0.1em', background: 'var(--accent)', borderRadius: '2px', animation: 'blink 1s step-end infinite' }} />
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: '460px',
              marginBottom: '40px',
              fontWeight: 400,
              animation: 'fadeUp 0.7s ease both',
              animationDelay: '0.4s',
            }}>
              I architect machine learning systems with rigorous data pipelines, optimized model training, and production deployment. Building intelligent solutions grounded in statistical learning and real-world impact.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', animation: 'fadeUp 0.7s ease both', animationDelay: '0.5s' }}>
              <a
                href="#projects"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '14px',
                  background: 'var(--accent)', color: '#050a07',
                  padding: '13px 28px', borderRadius: '8px',
                  textDecoration: 'none', fontWeight: 500,
                  transition: 'all 0.25s ease', letterSpacing: '0.01em',
                  border: '1px solid var(--accent)',
                }}
                onMouseEnter={e => { const el = e.target as HTMLElement; el.style.background = '#3dd98c'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(74,242,161,0.25)'; }}
                onMouseLeave={e => { const el = e.target as HTMLElement; el.style.background = 'var(--accent)'; el.style.transform = ''; el.style.boxShadow = ''; }}
              >
                View My Work
              </a>
              <a
                href="#contact"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '14px',
                  background: 'transparent', color: 'var(--text)',
                  padding: '13px 28px', borderRadius: '8px',
                  textDecoration: 'none', fontWeight: 400,
                  border: '1px solid var(--border)', letterSpacing: '0.01em',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { const el = e.target as HTMLElement; el.style.borderColor = 'var(--text-subtle)'; el.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { const el = e.target as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.transform = ''; }}
              >
                Get In Touch
              </a>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'flex', gap: '40px', flexWrap: 'wrap',
              marginTop: '56px',
              paddingTop: '32px',
              borderTop: '1px solid var(--bg-3)',
              animation: 'fadeUp 0.7s ease both',
              animationDelay: '0.7s',
            }}>
              {[
                { num: '4+',  label: 'Years Experience' },
                { num: '47+', label: 'Projects Shipped' },
                { num: '50+', label: 'Models Deployed' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text)', lineHeight: 1, marginBottom: '4px' }}>{stat.num}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Visual cards ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '16px',
            animation: 'fadeUp 0.8s ease both',
            animationDelay: '0.5s',
          }}
          className="hero-right"
          >
            <TerminalCard />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <MetricsCard />
              <TechStackCard />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'fadeIn 1s ease 1.2s both',
      }}>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--text-subtle), transparent)' }} />
      </div>

      <style>{`
        @keyframes termFadeIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes barGrow {
          from { width: 0; }
        }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  )
}
