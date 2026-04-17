'use client'

import { useEffect, useRef, useState } from 'react'

const experience = [
  {
    role: 'Quantitative Data & Systems Engineer',
    company: 'FloatInfinity · Sydney, Australia',
    period: 'March 2026 — Present',
    desc: '• Developed an end-to-end NLP/ML quantitative trading algorithm across 15+ instruments, training sentiment and macro regime classification models on real-time market sentiment signals, macroeconomic indicators, institutional positioning flows, and options market data extracting 50+ engineered features across technical momentum, sentiment, and macroeconomic signal layers, achieving 72% directional accuracy and a backtested Sharpe Ratio of 1.8.<br /><br />• Built an Automated Reporting Dashboard consolidating real-time telemetry from Azure Resources, Azure Policy, Azure Patching, and Azure Backup into a unified operational intelligence layer, engineering REST API ingestion pipelines and SQL-optimized data models with incremental deduplication, cutting incident detection time by 50%, reducing manual reporting overhead by 70–80%, and achieving 99.9% system availability.<br /><br />• Engineered end-to-end ETL pipelines and SQL-optimized data models (SQLAlchemy) with intelligent deduplication and incremental updates across 4+ enterprise platforms, reducing data redundancy by 65%, improving query performance by 3x, and enabling real-time Azure resource monitoring that increased cloud governance visibility by 80%+.',
    tags: ['Azure', 'NLP', 'XGBoost', 'Scikit-learn', 'Python', 'SQL', 'REST APIs', 'Git'],
    type: 'work',
  },
  {
    role: 'Data Analyst',
    company: 'PASIA – Procurement and Supply Institute of Asia',
    period: 'June 2025 — August 2025',
    desc: 'Optimized SQL ETL pipelines for automated ingestion and transformation of high-volume procurement data, ensuring 99% consistency across departments and daily data refreshes for real-time insights.',
    tags: ['Python', 'SQL', 'PowerBI', 'Excel'],
    type: 'work',
  },
  {
    role: 'Director — Programming & Creatives Committee',
    company: 'Computer Science & Information Technology Program Council',
    period: '2022 — 2025',
    desc: 'Led the programming and creatives committee, overseeing technical initiatives, event development, and creative direction across the organization.',
    tags: ['Programming', 'Project Management', 'Creative Direction'],
    type: 'org',
  },
  {
    role: 'Executive Committee Director — Finance & Public Relations',
    company: 'DLSUD Council of Student Organizations',
    period: '2022 — 2024',
    desc: 'Managed financial planning and public relations strategies for the student organization, coordinating cross-functional teams and external communications.',
    tags: ['Finance', 'Public Relations', 'Collaborative Leadership'],
    type: 'org',
  },
  {
    role: 'BS Computer Science — Intelligent Systems',
    company: 'De La Salle University Dasmariñas',
    period: '2022 — Present',
    desc: "Pursuing a Bachelor of Science in Computer Science with specialization in Intelligent Systems. Consistent Dean's Lister from 1st Year through 3rd Year.",
    tags: ['Machine Learning', 'AI', 'Data Science', "Dean's Lister"],
    type: 'edu',
  },
  {
    role: 'Gr. 12 Specialist — Programming & Algorithm Dept.',
    company: 'Technosaders · De La Salle Medical and Health Sciences Institute',
    period: '2021 — 2022',
    desc: 'Served as a specialist for the Programming and Algorithm Department, applying collaborative leadership and analytical skills in Cavite, Calabarzon, Philippines.',
    tags: ['Robotics', 'Analytical Skills', 'Algorithms'],
    type: 'org',
  },
]

const photos = [
  '/pictures/1.jpg',
  '/pictures/2.jpg',
  '/pictures/3.jpg',
  '/pictures/4.jpg',
  '/pictures/5.jpg',
  '/pictures/6.jpg',
  '/pictures/7.jpg',
  '/pictures/8.jpg',
]

const TYPE_ICON: Record<string, string> = {
  work: '◈',
  org:  '◉',
  edu:  '⬡',
}

const TYPE_COLOR: Record<string, string> = {
  work: '#c084fc',
  org:  'var(--accent-2)',
  edu:  'var(--accent)',
}

const TYPE_COLOR_RAW: Record<string, string> = {
  work: '#c084fc',
  org:  '#60a5fa',
  edu:  '#4af2a1',
}

const LASALLIAN_SCHOOLS = [
  {
    logo: '/about/dlsud.png',
    short: 'DLSUD',
    detail: 'BS Computer Science',
    sub: 'Intelligent Systems',
    period: '2022 — 2026',
    grade: '3.83 GPA',
    badge: "Dean's Lister",
  },
  {
    logo: '/about/hsi.png',
    short: 'DLSMHSI',
    detail: 'STEM',
    sub: 'Health Allied Science',
    period: '2020 — 2022',
    grade: '95 avg',
    badge: 'High Honors',
  },
  {
    logo: '/about/dlsud.png',
    short: 'DLSUD JHS',
    detail: 'Junior High School',
    sub: 'De La Salle Dasmariñas',
    period: '2016 — 2020',
    grade: '95 avg',
    badge: 'High Distinction',
  },
  {
    logo: '/about/sfa.png',
    short: 'Saint Francis',
    detail: 'Elementary',
    sub: 'La Salle Green Hills Supervised',
    period: '2010 — 2016',
    grade: '94 avg',
    badge: 'High Honors',
  },
]

function useScrollAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

function PhotoSlideshow() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [sliding, setSliding] = useState(false)

  const advance = (next: number) => {
    if (sliding) return
    setPrev(current)
    setSliding(true)
    setCurrent(next)
    setTimeout(() => { setPrev(null); setSliding(false) }, 550)
  }

  useEffect(() => {
    const id = setInterval(() => { advance((current + 1) % photos.length) }, 3200)
    return () => clearInterval(id)
  }, [current, sliding])

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0.7; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0);     opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0.7; }
        }
      `}</style>
      <div style={{ marginBottom: '28px' }}>
        <div style={{
          width: '100%', aspectRatio: '4 / 3', borderRadius: '20px',
          overflow: 'hidden', position: 'relative',
          background: 'var(--surface)', border: '1px solid var(--border)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-2), #c084fc)',
            zIndex: 4,
          }} />
          {prev !== null && (
            <img src={photos[prev]} alt="" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', animation: 'slideOutLeft 0.55s ease forwards', zIndex: 1,
            }} />
          )}
          <img key={current} src={photos[current]} alt={`Photo ${current + 1}`} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            animation: sliding ? 'slideInRight 0.55s ease forwards' : 'none', zIndex: 2,
          }} />
          <div style={{
            position: 'absolute', bottom: '12px', right: '12px', zIndex: 5,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            borderRadius: '20px', padding: '4px 10px',
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: '#fff', letterSpacing: '0.06em',
          }}>
            {current + 1} / {photos.length}
          </div>
          {([{ dir: -1, side: 'left' as const }, { dir: 1, side: 'right' as const }]).map(({ dir, side }) => (
            <button key={side}
              onClick={() => advance((current + dir + photos.length) % photos.length)}
              style={{
                position: 'absolute', top: '50%', [side]: '10px',
                transform: 'translateY(-50%)', zIndex: 5,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%',
                width: '32px', height: '32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
              aria-label={dir === -1 ? 'Previous' : 'Next'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {dir === -1 ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
              </svg>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
          {photos.map((_, i) => (
            <button key={i} onClick={() => advance(i)} aria-label={`Go to photo ${i + 1}`}
              style={{
                width: i === current ? '22px' : '6px', height: '6px', borderRadius: '3px',
                background: i === current ? 'var(--accent)' : 'var(--border)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const orbRef       = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [orbColor, setOrbColor]   = useState(TYPE_COLOR_RAW['work'])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const line = lineRef.current
      const orb  = orbRef.current
      if (!line || !orb) return
      const lineRect    = line.getBoundingClientRect()
      const viewportMid = window.innerHeight * 0.5
      const progress    = Math.max(0, Math.min(1, (viewportMid - lineRect.top) / lineRect.height))
      orb.style.top = `${progress * lineRect.height}px`

      let closestIdx = 0, closestDist = Infinity
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - viewportMid)
        if (dist < closestDist) { closestDist = dist; closestIdx = i }
      })
      setActiveIdx(closestIdx)
      setOrbColor(TYPE_COLOR_RAW[experience[closestIdx].type])
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div ref={lineRef} style={{
        position: 'absolute', left: '6px', top: '6px', bottom: '0',
        width: '1px', background: 'var(--bg-3)',
      }} />
      <div ref={orbRef} style={{
        position: 'absolute', left: '-1px', top: '6px',
        width: '15px', height: '15px', borderRadius: '50%',
        background: orbColor,
        boxShadow: `0 0 14px ${orbColor}99, 0 0 28px ${orbColor}44`,
        zIndex: 10, transition: 'background 0.4s ease, box-shadow 0.4s ease',
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {experience.map((exp, i) => {
          const color    = TYPE_COLOR[exp.type]
          const colorRaw = TYPE_COLOR_RAW[exp.type]
          const isActive = i === activeIdx
          return (
            <div key={i} ref={el => { itemRefs.current[i] = el }} className="exp-card"
              style={{
                position: 'relative', background: 'var(--bg-2)',
                border: `1px solid ${isActive ? colorRaw + '55' : 'var(--border)'}`,
                borderRadius: '16px', padding: '20px 20px 20px 32px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                cursor: 'default', willChange: 'transform',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.025) translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px ${colorRaw}44`
                e.currentTarget.style.borderColor = colorRaw + '88'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = isActive ? colorRaw + '55' : 'var(--border)'
              }}
            >
              <div style={{
                position: 'absolute', left: 0, top: '12px', bottom: '12px',
                width: '3px', borderRadius: '2px',
                background: isActive ? `linear-gradient(180deg, ${colorRaw}, ${colorRaw}44)` : 'var(--bg-3)',
                transition: 'background 0.4s ease',
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>{exp.role}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.03em', flexShrink: 0 }}>{exp.period}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color, marginBottom: '10px', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ opacity: 0.7 }}>{TYPE_ICON[exp.type]}</span>
                {exp.company}
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '12px' }} dangerouslySetInnerHTML={{ __html: exp.desc }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', background: 'var(--bg-3)', padding: '2px 8px', borderRadius: '3px' }}>{tag}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const DUST_COUNT = 18
function randomBetween(a: number, b: number) { return a + Math.random() * (b - a) }

function InfoCard({ label, value, href, logo, color, colorDim, colorBorder, colorGlow, isGitHub }: {
  label: string; value: string; href: string; logo: string
  color: string; colorDim: string; colorBorder: string; colorGlow: string
  isGitHub?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; size: number; delay: number; duration: number; opacity: number }[]>([])

  useEffect(() => {
    setParticles(Array.from({ length: DUST_COUNT }, (_, i) => ({
      id: i, x: randomBetween(5, 95), size: randomBetween(2, 5),
      delay: randomBetween(0, 2.4), duration: randomBetween(1.8, 3.2), opacity: randomBetween(0.35, 0.9),
    })))
  }, [])

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        background: isGitHub ? 'var(--github-card-bg)' : colorDim,
        border: `1px solid ${hovered ? color : colorBorder}`,
        borderRadius: '16px', padding: '16px 20px',
        textDecoration: 'none', position: 'relative', overflow: 'hidden',
        transform: hovered ? 'scale(1.035) translateY(-3px)' : 'scale(1) translateY(0)',
        boxShadow: hovered ? `0 20px 48px ${colorGlow}, 0 0 0 1px ${color}44` : 'none',
        transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${color}99, transparent)` }} />
      {particles.map(p => (
        <span key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: '-6px',
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: '50%', background: color, opacity: p.opacity,
          animation: `dustFall ${p.duration}s ${p.delay}s ease-in infinite`,
          pointerEvents: 'none', zIndex: 0,
        }} />
      ))}
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px',
        background: isGitHub ? '#ffffff' : 'var(--bg)',
        border: `1px solid ${colorBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, boxShadow: `0 0 16px ${colorGlow}`,
        padding: '8px', zIndex: 1, position: 'relative',
      }}>
        <img src={logo} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: isGitHub ? 'var(--github-card-text)' : 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</p>
      </div>
      <svg style={{ color, flexShrink: 0, opacity: 0.7, position: 'relative', zIndex: 1 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      <style>{`
        :root { --github-card-bg: rgba(16,20,17,0.92); --github-card-text: #F2F5F3; }
        @media (prefers-color-scheme: light) { :root { --github-card-bg: rgba(35,41,37,0.08); --github-card-text: #232925; } }
        @keyframes dustFall {
          0%   { transform: translateY(0) scale(1);    opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.5; }
          100% { transform: translateY(80px) scale(0.2); opacity: 0; }
        }
      `}</style>
    </a>
  )
}

function InfoCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <InfoCard label="Work" value="FloatInfinity · Sydney, Australia" href="https://www.floatinfinity.com.au" logo="/about/fl.png"
        color="#a855f7" colorDim="rgba(168,85,247,0.10)" colorBorder="rgba(168,85,247,0.30)" colorGlow="rgba(168,85,247,0.22)" />
      <InfoCard label="School" value="DLSUD — BSCS Intelligent Systems" href="https://www.dlsud.edu.ph/" logo="/about/dlsud.png"
        color="#16a34a" colorDim="rgba(22,163,74,0.10)" colorBorder="rgba(22,163,74,0.30)" colorGlow="rgba(22,163,74,0.22)" />
      <InfoCard label="GitHub" value="github.com/LouisMiguelBernal" href="https://github.com/LouisMiguelBernal" logo="/about/github.png"
        color="#E4EBE6" colorDim="rgba(16,20,17,0.92)" colorBorder="rgba(182,191,184,0.35)" colorGlow="rgba(228,235,230,0.10)" isGitHub />
      <InfoCard label="LinkedIn" value="linkedin.com/in/louisbernal" href="https://www.linkedin.com/in/louisbernal/" logo="/about/linkedin.png"
        color="#0ea5e9" colorDim="rgba(14,165,233,0.10)" colorBorder="rgba(14,165,233,0.30)" colorGlow="rgba(14,165,233,0.22)" />
    </div>
  )
}

function LasallianSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <div style={{
      marginTop: '56px',
      background: 'linear-gradient(135deg, rgba(22,163,74,0.06), rgba(22,163,74,0.01))',
      border: '1px solid rgba(22,163,74,0.20)',
      borderRadius: '24px',
      padding: '32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Corner glows */}
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.10), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,242,161,0.06), transparent 70%)', pointerEvents: 'none' }} />

      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #16a34a88, #4af2a155, transparent)' }} />

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#16a34a', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Academic Heritage
          </p>
        </div>
        <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px', letterSpacing: '-0.01em' }}>
          True Blooded Lasallian
        </h4>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          From elementary to university — a decade of Lasallian formation
        </p>
      </div>

      {/* ── Grid: 4-col desktop, horizontal scroll on mobile ── */}
      <style>{`
        .lasallian-scroll-wrapper {
          position: relative;
        }
        .lasallian-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          position: relative;
        }
        @media (max-width: 640px) {
          .lasallian-grid {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 12px;
            padding-bottom: 8px;
          }
          .lasallian-grid::-webkit-scrollbar { height: 3px; }
          .lasallian-grid::-webkit-scrollbar-track { background: transparent; }
          .lasallian-grid::-webkit-scrollbar-thumb { background: rgba(22,163,74,0.35); border-radius: 2px; }
          .lasallian-card {
            flex: 0 0 72vw !important;
            max-width: 72vw !important;
            scroll-snap-align: start;
          }
        }
      `}</style>

      <div className="lasallian-scroll-wrapper">
        {/* Connecting line — desktop only, hidden on mobile via overflow */}
        <div style={{
          position: 'absolute', top: '46px',
          left: '12.5%', right: '12.5%',
          height: '1px',
          background: 'linear-gradient(90deg, #16a34a66, #4af2a144, #16a34a66)',
          zIndex: 0, pointerEvents: 'none',
        }} />

        <div className="lasallian-grid">
          {LASALLIAN_SCHOOLS.map((school, i) => {
            const isHovered = hoveredIdx === i
            return (
              <div
                key={i}
                className="lasallian-card"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center',
                  background: isHovered ? 'rgba(22,163,74,0.09)' : 'rgba(22,163,74,0.03)',
                  border: `1px solid ${isHovered ? 'rgba(22,163,74,0.40)' : 'rgba(22,163,74,0.12)'}`,
                  borderRadius: '16px',
                  /* extra top padding since we removed the step bubble */
                  padding: '20px 12px 16px',
                  position: 'relative', zIndex: 1,
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: isHovered ? '0 16px 32px rgba(22,163,74,0.15)' : 'none',
                  transition: 'all 0.28s ease', cursor: 'default',
                }}
              >
                {/* Logo */}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: 'var(--bg)',
                  border: `1px solid ${isHovered ? 'rgba(22,163,74,0.45)' : 'rgba(22,163,74,0.18)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '8px', marginBottom: '12px',
                  boxShadow: isHovered ? '0 0 18px rgba(22,163,74,0.25)' : 'none',
                  transition: 'all 0.28s ease',
                }}>
                  <img src={school.logo} alt={school.short} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                {/* Name */}
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.3 }}>
                  {school.short}
                </p>

                {/* Detail */}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px', lineHeight: 1.5 }}>
                  {school.detail}
                </p>

                {/* Sub */}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.5, opacity: 0.75 }}>
                  {school.sub}
                </p>

                {/* Period */}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#16a34a', marginBottom: '8px' }}>
                  {school.period}
                </p>

                {/* Grade + badge */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4af2a1', background: 'rgba(74,242,161,0.10)', padding: '2px 8px', borderRadius: '4px' }}>
                    {school.grade}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#16a34a', background: 'rgba(22,163,74,0.12)', padding: '1px 6px', borderRadius: '3px' }}>
                    {school.badge}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer quote */}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(22,163,74,0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '3px', height: '28px', borderRadius: '2px', background: 'linear-gradient(180deg, #16a34a, #4af2a1)', flexShrink: 0 }} />
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic', opacity: 0.85 }}>
          "Enter to learn, leave to serve" — rooted in Lasallian values since 2010.
        </p>
      </div>
    </div>
  )
}

export default function About() {
  const headRef  = useRef<HTMLDivElement>(null)
  const bioRef   = useRef<HTMLDivElement>(null)
  const expRef   = useRef<HTMLDivElement>(null)
  const lasalRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(headRef  as React.RefObject<HTMLElement>)
  useScrollAnimation(bioRef   as React.RefObject<HTMLElement>)
  useScrollAnimation(expRef   as React.RefObject<HTMLElement>)
  useScrollAnimation(lasalRef as React.RefObject<HTMLElement>)

  return (
    <section id="about" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            border: '1px solid var(--border)', borderRadius: '999px',
            padding: '5px 14px', marginBottom: '20px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Information
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
          }}>
            Professional Overview
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.65 }}>
            A peek into my background, roles, and the journey.
          </p>
        </div>

        {/* Two-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'stretch' }}>

          {/* Bio column */}
          <div ref={bioRef} className="section-animate" style={{ display: 'flex', flexDirection: 'column' }}>
            <PhotoSlideshow />
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '20px' }}>
              A <span style={{ color: 'var(--text)' }}>graduating Computer Science student</span> at De La Salle University Dasmariñas,
              specializing in Intelligent Systems — with a GPA of{' '}
              <span style={{ color: 'var(--accent)' }}>3.83/4.0</span> and a consistent
              <span style={{ color: 'var(--accent)' }}> Dean's Lister</span> standing throughout my academic career.
              My work sits at the intersection of data engineering, machine learning, and applied analytics,
              with a focus on building scalable solutions that drive measurable outcomes.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '32px' }}>
              Beyond the classroom, I take on leadership roles in technical organizations,
              develop independent projects, and continuously explore emerging tools in the
              data and AI space. Currently based in{' '}
              <span style={{ color: 'var(--text)' }}>Cavite, Philippines</span>.
            </p>
            <InfoCards />

            {/* Legend */}
            <div style={{ marginTop: 'auto', paddingTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {[
                { label: 'Work',         color: '#c084fc' },
                { label: 'Organization', color: '#60a5fa' },
                { label: 'Education',    color: '#4af2a1' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%', background: l.color,
                    boxShadow: `0 0 6px ${l.color}cc, 0 0 14px ${l.color}66`, flexShrink: 0,
                  }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline column */}
          <div ref={expRef} className="section-animate">
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-subtle)', letterSpacing: '0.1em', marginBottom: '28px' }}>
              WORK EXPERIENCE & EDUCATION
            </h3>
            <Timeline />
          </div>

        </div>

        {/* Lasallian section */}
        <div ref={lasalRef} className="section-animate">
          <LasallianSection />
        </div>

      </div>
    </section>
  )
}
