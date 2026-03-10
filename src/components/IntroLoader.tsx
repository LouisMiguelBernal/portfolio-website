'use client'

import { useEffect, useRef, useState } from 'react'

const BOOT_LINES = [
  { text: 'Initializing runtime environment...', delay: 0 },
  { text: 'Loading neural architecture [3 → 2 → 1]...', delay: 180 },
  { text: 'Mounting model weights.............. OK', delay: 360 },
  { text: 'Compiling portfolio data pipeline... OK', delay: 540 },
  { text: 'Connecting inference engine......... OK', delay: 700 },
  { text: '──────────────────────────────────────', delay: 860 },
  { text: '✓  MODEL READY', delay: 980, accent: true },
]

const css = `
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes logoSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes nnPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
  @keyframes orbitSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes orbitPlanetPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
  @keyframes sunGlow {
    0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(1)}
    50%{opacity:1;transform:translate(-50%,-50%) scale(1.3)}
  }
`

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'boot' | 'logo' | 'exit'>('boot')
  const [logoVisible, setLogoVisible] = useState(false)
  const onDoneRef = useRef(onDone)

  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(v => [...v, i])
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100))
      }, 300 + line.delay))
    })

    const last = 300 + BOOT_LINES[BOOT_LINES.length - 1].delay

    timers.push(setTimeout(() => setPhase('logo'), last + 200))
    timers.push(setTimeout(() => setLogoVisible(true), last + 400))
    timers.push(setTimeout(() => setPhase('exit'), last + 2400))
    timers.push(setTimeout(() => {
    onDoneRef.current?.()
    window.dispatchEvent(new Event('intro:done'))
}, last + 2950))

    return () => timers.forEach(clearTimeout)
  }, [])

  const maxLine = visibleLines.length ? Math.max(...visibleLines) : -1

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#020507',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.5s ease' : 'none',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      <style>{css}</style>

      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(74,242,161,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,242,161,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(74,242,161,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── BOOT phase ── */}
      {phase === 'boot' && (
        <div style={{ width: '100%', maxWidth: '580px', padding: '0 32px' }}>

          {/* Terminal dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(74,242,161,0.4)', letterSpacing: '0.1em', marginLeft: '8px' }}>
              lmbernal@portfolio ~ model.boot
            </span>
          </div>

          {/* Lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {BOOT_LINES.map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: 'monospace', fontSize: '13px',
                  color: line.accent ? '#4af2a1' : 'rgba(74,242,161,0.65)',
                  letterSpacing: '0.04em',
                  opacity: visibleLines.includes(i) ? 1 : 0,
                  transform: visibleLines.includes(i) ? 'translateX(0)' : 'translateX(-8px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  fontWeight: line.accent ? 700 : 400,
                }}
              >
                {line.accent ? '' : '> '}{line.text}
                {i === maxLine && !line.accent && (
                  <span style={{ animation: 'blink 1s step-end infinite', marginLeft: '2px' }}>▮</span>
                )}
              </div>
            ))}
          </div>

          {/* Progress */}
          <div style={{ marginTop: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '10px', color: 'rgba(74,242,161,0.4)', marginBottom: '6px', letterSpacing: '0.08em' }}>
              <span>LOADING PORTFOLIO</span>
              <span>{progress}%</span>
            </div>
            <div style={{ height: '2px', background: 'rgba(74,242,161,0.1)', borderRadius: '1px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #4af2a1, #7eb8f7)',
                borderRadius: '1px',
                transition: 'width 0.3s ease',
                boxShadow: '0 0 8px rgba(74,242,161,0.6)',
              }} />
            </div>
          </div>
        </div>
      )}

      {/* ── GALAXY phase ── */}
      {(phase === 'logo' || phase === 'exit') && (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '320px', height: '320px' }}>

          {/* Ring 1 — 3 green planets */}
          <div style={{
            position: 'absolute', width: '220px', height: '220px',
            borderRadius: '50%', border: '1px solid rgba(74,242,161,0.12)',
            animation: 'orbitSpin 7s linear infinite',
            opacity: logoVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.2s',
          }}>
            {[0, 120, 240].map((deg, i) => (
              <div key={i} style={{
                position: 'absolute', width: '8px', height: '8px', borderRadius: '50%',
                background: '#4af2a1', boxShadow: '0 0 8px 2px rgba(74,242,161,0.7)',
                top: '50%', left: '50%',
                transform: `rotate(${deg}deg) translateX(110px) translateY(-50%)`,
                animation: `orbitPlanetPulse 2s ease-in-out infinite ${i * 0.4}s`,
              }} />
            ))}
          </div>

          {/* Ring 2 — 4 blue planets reverse */}
          <div style={{
            position: 'absolute', width: '160px', height: '160px',
            borderRadius: '50%', border: '1px solid rgba(126,184,247,0.15)',
            animation: 'orbitSpin 4.5s linear infinite reverse',
            opacity: logoVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.4s',
          }}>
            {[0, 90, 180, 270].map((deg, i) => (
              <div key={i} style={{
                position: 'absolute', width: '5px', height: '5px', borderRadius: '50%',
                background: '#7eb8f7', boxShadow: '0 0 6px 2px rgba(126,184,247,0.6)',
                top: '50%', left: '50%',
                transform: `rotate(${deg}deg) translateX(80px) translateY(-50%)`,
                animation: `orbitPlanetPulse 1.8s ease-in-out infinite ${i * 0.3}s`,
              }} />
            ))}
          </div>

          {/* Ring 3 — wide dashed slow */}
          <div style={{
            position: 'absolute', width: '270px', height: '270px',
            borderRadius: '50%', border: '1px dashed rgba(74,242,161,0.07)',
            animation: 'orbitSpin 12s linear infinite',
            opacity: logoVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.6s',
          }}>
            {[0, 180].map((deg, i) => (
              <div key={i} style={{
                position: 'absolute', width: '4px', height: '4px', borderRadius: '50%',
                background: 'rgba(74,242,161,0.5)',
                top: '50%', left: '50%',
                transform: `rotate(${deg}deg) translateX(135px) translateY(-50%)`,
              }} />
            ))}
          </div>

          {/* Center sun */}
          <div style={{
            position: 'relative', zIndex: 2,
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? 'scale(1)' : 'scale(0.4)',
            transition: 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '120px', height: '120px',
              background: 'radial-gradient(circle, rgba(74,242,161,0.18) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'sunGlow 3s ease-in-out infinite',
            }} />
            <svg width="90" height="90" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="16" stroke="#4af2a1" strokeWidth="0.8"
                strokeDasharray="5 3" opacity="0.4"
                style={{ animation: 'logoSpin 6s linear infinite', transformOrigin: '18px 18px' }}
              />
              <circle cx="18" cy="18" r="12" stroke="#7eb8f7" strokeWidth="0.6"
                strokeDasharray="3 5" opacity="0.2"
                style={{ animation: 'logoSpin 4s linear infinite reverse', transformOrigin: '18px 18px' }}
              />
              <circle cx="18" cy="18" r="9" fill="rgba(74,242,161,0.07)" stroke="rgba(74,242,161,0.25)" strokeWidth="0.8" />
              <circle cx="10" cy="12" r="2" fill="#4af2a1" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 0s' }} />
              <circle cx="10" cy="18" r="2" fill="#4af2a1" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 0.35s' }} />
              <circle cx="10" cy="24" r="2" fill="#4af2a1" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 0.7s' }} />
              <circle cx="18" cy="14.5" r="2" fill="#4af2a1" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 0.9s' }} />
              <circle cx="18" cy="21.5" r="2" fill="#4af2a1" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 1.2s' }} />
              <circle cx="26" cy="18" r="2.3" fill="#4af2a1" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 1.6s' }} />
              <line x1="12" y1="12" x2="16" y2="14.5" stroke="#4af2a1" strokeWidth="0.7" opacity="0.45" />
              <line x1="12" y1="12" x2="16" y2="21.5" stroke="#4af2a1" strokeWidth="0.7" opacity="0.2" />
              <line x1="12" y1="18" x2="16" y2="14.5" stroke="#4af2a1" strokeWidth="0.7" opacity="0.45" />
              <line x1="12" y1="18" x2="16" y2="21.5" stroke="#4af2a1" strokeWidth="0.7" opacity="0.45" />
              <line x1="12" y1="24" x2="16" y2="14.5" stroke="#4af2a1" strokeWidth="0.7" opacity="0.2" />
              <line x1="12" y1="24" x2="16" y2="21.5" stroke="#4af2a1" strokeWidth="0.7" opacity="0.45" />
              <line x1="20" y1="14.5" x2="23.7" y2="18" stroke="#4af2a1" strokeWidth="0.7" opacity="0.55" />
              <line x1="20" y1="21.5" x2="23.7" y2="18" stroke="#4af2a1" strokeWidth="0.7" opacity="0.55" />
              <circle r="1.2" fill="#4af2a1" opacity="0.95">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin="0s" path="M10,12 L18,14.5" />
              </circle>
              <circle r="1.2" fill="#4af2a1" opacity="0.95">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.6s" path="M10,24 L18,21.5" />
              </circle>
              <circle r="1.2" fill="#4af2a1" opacity="0.95">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin="1.2s" path="M18,14.5 L26,18" />
              </circle>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
