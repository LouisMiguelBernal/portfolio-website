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

function CyberLinesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Nodes for the network lines
    const NODE_COUNT = 38
    interface Node {
      x: number; y: number; vx: number; vy: number
      pulse: number; pulseSpeed: number
    }
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.02,
    }))

    // Flowing data packets along edges
    interface Packet {
      from: number; to: number; t: number; speed: number; color: string
    }
    const packets: Packet[] = []
    const PACKET_COLORS = ['#4af2a1', '#7eb8f7', '#c084fc', '#4af2a1', '#4af2a1']

    const maybeSpawnPacket = () => {
      if (packets.length < 12 && Math.random() < 0.04) {
        const from = Math.floor(Math.random() * NODE_COUNT)
        // pick a close node
        let to = from
        let minDist = Infinity
        nodes.forEach((n, i) => {
          if (i === from) return
          const d = Math.hypot(n.x - nodes[from].x, n.y - nodes[from].y)
          if (d < 260 && d < minDist) { minDist = d; to = i }
        })
        if (to !== from) {
          packets.push({
            from, to, t: 0,
            speed: 0.004 + Math.random() * 0.006,
            color: PACKET_COLORS[Math.floor(Math.random() * PACKET_COLORS.length)],
          })
        }
      }
    }

    let frame = 0
    const draw = () => {
      animId = requestAnimationFrame(draw)
      frame++
      ctx.clearRect(0, 0, W, H)

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
        n.pulse += n.pulseSpeed
      })

      // Draw edges between close nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 220) {
            const alpha = (1 - dist / 220) * 0.18
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(74,242,161,${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw diagonal "cyber scan lines" — long diagonal streaks
      if (frame % 3 === 0) {
        const scanCount = 4
        for (let s = 0; s < scanCount; s++) {
          const prog = ((frame * 0.4 + s * (W / scanCount)) % (W + H))
          const x1 = prog - H
          const y1 = 0
          const x2 = prog
          const y2 = H
          const grad = ctx.createLinearGradient(x1, y1, x2, y2)
          grad.addColorStop(0, 'rgba(74,242,161,0)')
          grad.addColorStop(0.4, 'rgba(74,242,161,0)')
          grad.addColorStop(0.5, 'rgba(74,242,161,0.04)')
          grad.addColorStop(0.55, 'rgba(74,242,161,0.1)')
          grad.addColorStop(0.6, 'rgba(74,242,161,0.04)')
          grad.addColorStop(0.7, 'rgba(74,242,161,0)')
          grad.addColorStop(1, 'rgba(74,242,161,0)')
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.lineTo(x2 + 60, H)
          ctx.lineTo(x1 + 60, 0)
          ctx.closePath()
          ctx.fillStyle = grad
          ctx.fill()
        }
      }

      // Horizontal scan line
      const scanY = ((frame * 0.5) % (H + 80)) - 40
      const hGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30)
      hGrad.addColorStop(0, 'rgba(74,242,161,0)')
      hGrad.addColorStop(0.4, 'rgba(74,242,161,0.03)')
      hGrad.addColorStop(0.5, 'rgba(74,242,161,0.07)')
      hGrad.addColorStop(0.6, 'rgba(74,242,161,0.03)')
      hGrad.addColorStop(1, 'rgba(74,242,161,0)')
      ctx.fillStyle = hGrad
      ctx.fillRect(0, scanY - 30, W, 60)

      // Move & draw packets
      maybeSpawnPacket()
      for (let p = packets.length - 1; p >= 0; p--) {
        const pk = packets[p]
        pk.t += pk.speed
        if (pk.t >= 1) { packets.splice(p, 1); continue }
        const fn = nodes[pk.from], tn = nodes[pk.to]
        const px = fn.x + (tn.x - fn.x) * pk.t
        const py = fn.y + (tn.y - fn.y) * pk.t
        // trail
        const trailLen = 0.08
        const t0 = Math.max(0, pk.t - trailLen)
        const tx = fn.x + (tn.x - fn.x) * t0
        const ty = fn.y + (tn.y - fn.y) * t0
        const tGrad = ctx.createLinearGradient(tx, ty, px, py)
        tGrad.addColorStop(0, `${pk.color}00`)
        tGrad.addColorStop(1, `${pk.color}cc`)
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(px, py)
        ctx.strokeStyle = tGrad
        ctx.lineWidth = 2
        ctx.stroke()
        // dot
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = pk.color
        ctx.shadowBlur = 8
        ctx.shadowColor = pk.color
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Draw nodes
      nodes.forEach(n => {
        const glow = (Math.sin(n.pulse) + 1) / 2
        const r = 1.5 + glow * 1.2
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(74,242,161,${0.25 + glow * 0.35})`
        ctx.shadowBlur = 6 + glow * 6
        ctx.shadowColor = '#4af2a1'
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  )
}

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
        setLooping(l => !l)
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
      <div style={{ padding: '20px', minHeight: '220px' }}>
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px',
            color: line.color, lineHeight: '1.8',
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
      {/* Cyberlines canvas — replaces grid-bg */}
      <CyberLinesBackground />

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
