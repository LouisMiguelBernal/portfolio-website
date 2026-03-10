'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────── DATA ─────────────────────────── */

const skillGroups = [
  {
    category: 'AI & Machine Learning',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer dashed orbit */}
        <circle cx="12" cy="12" r="9.5" strokeWidth="0.7" strokeOpacity="0.3" strokeDasharray="1.4 2.2"/>
        {/* Mid ring */}
        <circle cx="12" cy="12" r="6" strokeWidth="0.6" strokeOpacity="0.2"/>
        {/* Core processor */}
        <rect x="9.5" y="9.5" width="5" height="5" rx="1.2" strokeWidth="1.5"/>
        {/* Core inner dot */}
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" opacity="0.9"/>
        {/* Traces to cardinal nodes */}
        <line x1="12" y1="9.5" x2="12" y2="5.5" strokeWidth="1"/>
        <line x1="14.5" y1="12" x2="18.5" y2="12" strokeWidth="1"/>
        <line x1="12" y1="14.5" x2="12" y2="18.5" strokeWidth="1"/>
        <line x1="9.5" y1="12" x2="5.5" y2="12" strokeWidth="1"/>
        {/* Cardinal nodes */}
        <circle cx="12" cy="4.5" r="1.3" strokeWidth="1.3"/>
        <circle cx="19.5" cy="12" r="1.3" strokeWidth="1.3"/>
        <circle cx="12" cy="19.5" r="1.3" strokeWidth="1.3"/>
        <circle cx="4.5" cy="12" r="1.3" strokeWidth="1.3"/>
        {/* Diagonal circuit traces */}
        <line x1="14.1" y1="9.9" x2="16.8" y2="7.2" strokeWidth="0.8" strokeOpacity="0.55"/>
        <line x1="9.9" y1="9.9" x2="7.2" y2="7.2" strokeWidth="0.8" strokeOpacity="0.55"/>
        <line x1="14.1" y1="14.1" x2="16.8" y2="16.8" strokeWidth="0.8" strokeOpacity="0.55"/>
        <line x1="9.9" y1="14.1" x2="7.2" y2="16.8" strokeWidth="0.8" strokeOpacity="0.55"/>
        {/* Corner accent dots */}
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" opacity="0.5"/>
        <circle cx="6.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" opacity="0.5"/>
        <circle cx="17.5" cy="17.5" r="0.8" fill="currentColor" stroke="none" opacity="0.5"/>
        <circle cx="6.5" cy="17.5" r="0.8" fill="currentColor" stroke="none" opacity="0.5"/>
      </svg>
    ),
    color: '#c084fc',
    glow: 'rgba(192,132,252,0.22)',
    bg: 'rgba(192,132,252,0.06)',
    skills: [
      { name: 'PyTorch / TensorFlow', level: 100 },
      { name: 'Scikit-learn', level: 99 },
      { name: 'LangChain / RAG', level: 99 },
      { name: 'Computer Vision (YOLO)', level: 99 },
      { name: 'NLP / Transformers', level: 98 },
    ],
  },
  {
    category: 'Frontend',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: '#4af2a1',
    glow: 'rgba(74,242,161,0.22)',
    bg: 'rgba(74,242,161,0.06)',
    skills: [
      { name: 'React / Next.js', level: 99 },
      { name: 'TypeScript', level: 98 },
      { name: 'CSS / Tailwind', level: 97 },
      { name: 'React Native', level: 96 },
      { name: 'Figma / UI Design', level: 95 },
    ],
  },
  {
    category: 'Backend & Data',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.22)',
    bg: 'rgba(96,165,250,0.06)',
    skills: [
      { name: 'Python / FastAPI', level: 99 },
      { name: 'SQL / PostgreSQL', level: 98 },
      { name: 'Node.js / Express', level: 98 },
      { name: 'Pandas / NumPy', level: 98 },
      { name: 'Power BI / Excel', level: 97 },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.22)',
    bg: 'rgba(251,146,60,0.06)',
    skills: [
      { name: 'Docker', level: 94 },
      { name: 'Git / GitHub', level: 96 },
      { name: 'Vercel / Deployment', level: 95 },
      { name: 'Streamlit', level: 96 },
      { name: 'Jupyter / Colab', level: 94 },
    ],
  },
]

const techStack = [
  { name: 'FAISS', color: '#c084fc' },
  { name: 'Groq', color: '#4af2a1' },
  { name: 'HuggingFace', color: '#fb923c' },
  { name: 'OpenCV', color: '#60a5fa' },
  { name: 'LSTM', color: '#c084fc' },
  { name: 'XGBoost', color: '#4af2a1' },
  { name: 'LightGBM', color: '#60a5fa' },
  { name: 'CatBoost', color: '#fb923c' },
  { name: 'SHAP', color: '#c084fc' },
  { name: 'Optuna', color: '#4af2a1' },
  { name: 'MLflow', color: '#60a5fa' },
  { name: 'Weights & Biases', color: '#fb923c' },
  { name: 'Apriori', color: '#c084fc' },
  { name: 'KMeans', color: '#4af2a1' },
  { name: 'PCA', color: '#60a5fa' },
  { name: 't-SNE', color: '#fb923c' },
  { name: 'UMAP', color: '#c084fc' },
  { name: 'Monte Carlo', color: '#4af2a1' },
  { name: 'Seaborn', color: '#60a5fa' },
  { name: 'Matplotlib', color: '#fb923c' },
  { name: 'Plotly', color: '#c084fc' },
  { name: 'Tableau', color: '#4af2a1' },
  { name: 'MongoDB', color: '#60a5fa' },
  { name: 'Redis', color: '#fb923c' },
]

/* ─────────────────── RADAR CHART ─────────────────────────── */

function RadarChart({ group }: { group: typeof skillGroups[0] }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 300) }, [])

  const cx = 110, cy = 110, R = 85
  const n = group.skills.length
  const angles = group.skills.map((_, i) => (i * 2 * Math.PI) / n - Math.PI / 2)
  const gridLevels = [0.25, 0.5, 0.75, 1]
  const polyPoints = (scale: number) =>
    angles.map(a => `${cx + R * scale * Math.cos(a)},${cy + R * scale * Math.sin(a)}`).join(' ')

  const dataPoints = angles.map((a, i) => ({
    x: cx + R * (group.skills[i].level / 100) * Math.cos(a),
    y: cy + R * (group.skills[i].level / 100) * Math.sin(a),
  }))

  const id = group.category.replace(/[\s/&]/g, '')

  return (
    <svg viewBox="0 0 220 220" width="200" height="200" style={{ overflow: 'visible', flexShrink: 0 }}>
      <defs>
        <radialGradient id={`rg-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={group.color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={group.color} stopOpacity="0.02" />
        </radialGradient>
        <filter id={`blur-${id}`}>
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {gridLevels.map(lvl => (
        <polygon key={lvl} points={polyPoints(lvl)} fill="none"
          stroke={group.color} strokeOpacity={lvl === 1 ? 0.18 : 0.07}
          strokeWidth={lvl === 1 ? 1.2 : 0.6}
          strokeDasharray={lvl < 1 ? '3,4' : undefined}
        />
      ))}

      {angles.map((a, i) => (
        <line key={i} x1={cx} y1={cy}
          x2={cx + R * Math.cos(a)} y2={cy + R * Math.sin(a)}
          stroke={group.color} strokeOpacity="0.1" strokeWidth="0.8"
        />
      ))}

      {/* Glow copy */}
      <polygon
        points={mounted ? dataPoints.map(p => `${p.x},${p.y}`).join(' ') : polyPoints(0.01)}
        fill={group.color} fillOpacity="0.08" stroke={group.color}
        strokeWidth="3" strokeOpacity="0.4"
        filter={`url(#blur-${id})`}
        style={{ transition: 'points 1.3s cubic-bezier(0.16,1,0.3,1)' }}
      />
      {/* Sharp fill */}
      <polygon
        points={mounted ? dataPoints.map(p => `${p.x},${p.y}`).join(' ') : polyPoints(0.01)}
        fill={`url(#rg-${id})`} stroke={group.color} strokeWidth="1.8"
        style={{ transition: 'points 1.3s cubic-bezier(0.16,1,0.3,1)' }}
      />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={mounted ? p.x : cx} cy={mounted ? p.y : cy} r="3.5"
          fill={group.color}
          style={{ transition: `cx 1.3s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, cy 1.3s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms` }}
        />
      ))}

      <circle cx={cx} cy={cy} r="2.5" fill={group.color} opacity="0.5" />

      {/* % labels on outer ring */}
      {[25, 50, 75].map(pct => (
        <text key={pct}
          x={cx + R * (pct / 100) * Math.cos(-Math.PI / 2) + 5}
          y={cy + R * (pct / 100) * Math.sin(-Math.PI / 2)}
          fill={group.color} fillOpacity="0.35"
          fontSize="7" fontFamily="monospace"
        >
          {pct}
        </text>
      ))}
    </svg>
  )
}

/* ──────────────────────── SKILL ROW ───────────────────────── */

function SkillRow({ skill, color, index }: {
  skill: { name: string; level: number }
  color: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const [barW, setBarW] = useState('0%')
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setBarW(`${skill.level}%`), index * 110 + 250)
        obs.disconnect()
      }
    }, { threshold: 0.6 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [skill.level, index])

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '9px 12px', borderRadius: '10px',
        background: hovered ? `${color}10` : 'transparent',
        border: `1px solid ${hovered ? color + '35' : 'transparent'}`,
        transition: 'all 0.22s ease', cursor: 'default', position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', left: 0, top: '7px', bottom: '7px', width: '2.5px',
        borderRadius: '2px', background: `linear-gradient(180deg, ${color}, ${color}55)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.22s ease',
        boxShadow: hovered ? `0 0 8px ${color}` : 'none',
      }} />

      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px',
        color: hovered ? color : 'var(--text-subtle)',
        minWidth: '20px', letterSpacing: '0.04em',
        transition: 'color 0.22s ease', paddingLeft: '5px',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: '13.5px',
        color: hovered ? 'var(--text)' : 'var(--text-muted)',
        flex: 1, transition: 'color 0.22s ease',
        fontWeight: hovered ? 500 : 400, letterSpacing: '-0.01em',
      }}>
        {skill.name}
      </span>

      <div style={{
        width: '88px', height: '5px', background: 'var(--bg-3)',
        borderRadius: '3px', overflow: 'hidden', flexShrink: 0, position: 'relative',
        boxShadow: hovered ? `inset 0 0 0 1px ${color}30` : 'none',
        transition: 'box-shadow 0.22s ease',
      }}>
        <div style={{
          height: '100%', width: barW,
          background: hovered
            ? `linear-gradient(90deg, ${color}, ${color}cc)`
            : `linear-gradient(90deg, ${color}99, ${color}44)`,
          borderRadius: '3px',
          transition: 'width 1s cubic-bezier(0.16,1,0.3,1), background 0.22s ease',
          boxShadow: hovered ? `0 0 10px ${color}90, 0 0 3px ${color}` : 'none',
          position: 'relative', overflow: 'hidden',
        }}>
          {hovered && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              animation: 'shimmer 1.2s ease-in-out infinite',
            }} />
          )}
        </div>
      </div>

      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        color: hovered ? color : 'var(--text-subtle)',
        minWidth: '34px', textAlign: 'right',
        fontWeight: hovered ? 700 : 400, transition: 'color 0.22s ease',
      }}>
        {skill.level}%
      </span>
    </div>
  )
}

/* ──────────────────────── SKILL CARD ──────────────────────── */

function SkillCard({ group, delay, isActive, onClick }: {
  group: typeof skillGroups[0]
  delay: number
  isActive: boolean
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
  }, [])

  const avgLevel = Math.round(group.skills.reduce((s, sk) => s + sk.level, 0) / group.skills.length)
  const circumference = 2 * Math.PI * 20

  return (
    <div
      ref={ref}
      className="section-animate skill-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        background: isActive
          ? group.bg
          : hovered ? 'var(--bg-3)' : 'var(--bg-2)',
        border: `1px solid ${isActive ? group.color + '55' : hovered ? group.color + '30' : 'var(--bg-3)'}`,
        borderRadius: '22px', padding: '28px 24px',
        transitionDelay: `${delay}s`, position: 'relative', overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-5px) scale(1.005)' : 'translateY(0) scale(1)',
        boxShadow: isActive
          ? `0 0 0 1px ${group.color}30, 0 28px 70px ${group.color}18, 0 4px 20px rgba(0,0,0,0.3)`
          : hovered
            ? `0 22px 55px ${group.color}12, 0 4px 16px rgba(0,0,0,0.25)`
            : '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      {/* Dynamic mouse-following spotlight */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: hovered
          ? `radial-gradient(circle 200px at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${group.color}14, transparent 70%)`
          : 'none',
        transition: 'background 0.08s ease',
      }} />

      {/* Top gradient line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${group.color}, transparent)`,
        opacity: isActive ? 1 : hovered ? 0.7 : 0.25, transition: 'opacity 0.3s ease',
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px',
        background: `radial-gradient(circle, ${group.color}${isActive ? '1a' : hovered ? '10' : '07'}, transparent 70%)`,
        pointerEvents: 'none', transition: 'all 0.3s ease',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px',
            background: `linear-gradient(135deg, ${group.color}22, ${group.color}0a)`,
            border: `1px solid ${group.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: group.color, flexShrink: 0,
            boxShadow: (hovered || isActive) ? `0 0 24px ${group.color}35, 0 0 8px ${group.color}20` : 'none',
            transition: 'box-shadow 0.3s ease',
          }}>
            {group.icon}
          </div>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-sans)', fontSize: '15.5px', fontWeight: 700,
              color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '4px',
            }}>
              {group.category}
            </h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: group.color, letterSpacing: '0.08em' }}>
                {group.skills.length} SKILLS
              </span>
              <span style={{ color: 'var(--text-subtle)', fontSize: '9px' }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>
                AVG {avgLevel}%
              </span>
            </div>
          </div>
        </div>

        {/* Circular ring */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="24" cy="24" r="20" fill="none" stroke="var(--bg-3)" strokeWidth="3.5" />
            <circle cx="24" cy="24" r="20" fill="none" stroke={group.color} strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - avgLevel / 100)}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1)',
                filter: `drop-shadow(0 0 5px ${group.color}90)`,
              }}
            />
          </svg>
          <span style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800,
            color: group.color,
          }}>
            {avgLevel}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, ${group.color}45, var(--bg-3), transparent)`,
        marginBottom: '12px',
      }} />

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {group.skills.map((skill, i) => (
          <SkillRow key={skill.name} skill={skill} color={group.color} index={i} />
        ))}
      </div>

      {/* Radar hint */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        marginTop: '16px',
        opacity: hovered && !isActive ? 0.7 : 0,
        transition: 'opacity 0.22s ease',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={group.color} strokeWidth="2.5">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/>
        </svg>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9.5px',
          color: group.color, letterSpacing: '0.1em',
        }}>
          CLICK FOR RADAR
        </span>
      </div>
    </div>
  )
}

/* ─────────────────── RADAR MODAL ───────────────────────────── */

function RadarModal({ group, onClose }: { group: typeof skillGroups[0]; onClose: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 10) }, [])

  const handleClose = () => { setVisible(false); setTimeout(onClose, 320) }

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        opacity: visible ? 1 : 0, transition: 'opacity 0.32s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg)',
          border: `1px solid ${group.color}45`,
          borderRadius: '28px', padding: '40px',
          maxWidth: '580px', width: '100%',
          boxShadow: `0 50px 130px ${group.color}22, 0 0 0 1px ${group.color}20`,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(24px)',
          transition: 'transform 0.36s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative',
        }}
      >
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: '40px', right: '40px', height: '2px',
          background: `linear-gradient(90deg, transparent, ${group.color}, transparent)`,
        }} />

        <button onClick={handleClose} style={{
          position: 'absolute', top: '18px', right: '18px',
          width: '34px', height: '34px', borderRadius: '10px',
          background: 'var(--bg-3)', border: '1px solid var(--border)',
          color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
          transition: 'all 0.2s ease',
        }}>×</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: `linear-gradient(135deg, ${group.color}28, ${group.color}0a)`,
            border: `1px solid ${group.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: group.color, boxShadow: `0 0 24px ${group.color}30`,
          }}>
            {group.icon}
          </div>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-sans)', fontSize: '21px', fontWeight: 800,
              color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: '4px',
            }}>
              {group.category}
            </h3>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              color: group.color, letterSpacing: '0.1em',
            }}>
              COMPETENCY RADAR
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '28px', alignItems: 'center', flexWrap: 'wrap' }}>
          <RadarChart group={group} />

          <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {group.skills.map((s) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: group.color, flexShrink: 0,
                  opacity: 0.45 + (s.level / 100) * 0.55,
                  boxShadow: `0 0 8px ${group.color}`,
                }} />
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '13px',
                  color: 'var(--text-muted)', flex: 1,
                }}>
                  {s.name}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '12px',
                  color: group.color, fontWeight: 700,
                }}>
                  {s.level}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────── TECH BADGE ───────────────────────────── */

function TechBadge({ item }: { item: typeof techStack[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: '11.5px',
        color: hovered ? item.color : 'var(--text-muted)',
        background: hovered ? `${item.color}10` : 'var(--bg-3)',
        border: `1px solid ${hovered ? item.color + '55' : 'var(--border)'}`,
        padding: '6px 14px', borderRadius: '8px',
        transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'default', letterSpacing: '0.02em', display: 'inline-block',
        transform: hovered ? 'translateY(-4px) scale(1.06)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 8px 24px ${item.color}22, 0 0 0 1px ${item.color}25` : 'none',
      }}
    >
      {item.name}
    </span>
  )
}

/* ─────────────────── FLOATING PARTICLES ───────────────────── */

function FloatingDots() {
  const [dots, setDots] = useState<Array<{
    x: number; y: number; size: number; color: string; delay: number; duration: number; driftX: number; driftY: number
  }>>([])

  useEffect(() => {
    const colors = ['#c084fc', '#4af2a1', '#60a5fa', '#fb923c']
    setDots(Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      color: colors[i % colors.length],
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 8,
      driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 40,
    })))
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${d.x}%`, top: `${d.y}%`,
          width: `${d.size}px`, height: `${d.size}px`, borderRadius: '50%',
          background: d.color, opacity: 0.18,
          animation: `floatDot-${i} ${d.duration}s ${d.delay}s ease-in-out infinite alternate`,
          boxShadow: `0 0 ${d.size * 4}px ${d.color}`,
        }} />
      ))}
      <style>{dots.map((d, i) => `
        @keyframes floatDot-${i} {
          0%   { transform: translate(0, 0); opacity: 0.1; }
          50%  { opacity: 0.22; }
          100% { transform: translate(${d.driftX}px, ${d.driftY}px); opacity: 0.1; }
        }
      `).join('')}</style>
    </div>
  )
}

/* ────────────────────────── MAIN ───────────────────────────── */

export default function Skills() {
  const headRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const [activeGroup, setActiveGroup] = useState<typeof skillGroups[0] | null>(null)

  useEffect(() => {
    const animate = (ref: React.RefObject<HTMLElement | null>) => {
      const el = ref.current
      if (!el) return
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
      }, { threshold: 0.1 })
      obs.observe(el)
      return () => obs.disconnect()
    }
    animate(headRef as React.RefObject<HTMLElement>)
    animate(techRef as React.RefObject<HTMLElement>)
  }, [])

  const totalSkills = skillGroups.reduce((s, g) => s + g.skills.length, 0)

  return (
    <section id="skills" style={{
      padding: '120px 32px',
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--bg-3)',
      borderBottom: '1px solid var(--bg-3)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <FloatingDots />

      {/* BG radial glows */}
      <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(192,132,252,0.035) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-150px', left: '-150px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(74,242,161,0.03) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* ── HEADER ── */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            border: '1px solid var(--border)', borderRadius: '999px',
            padding: '5px 14px', marginBottom: '20px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Skills
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
          }}>
            Technologies &amp; Tools
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '460px', lineHeight: 1.65 }}>
            A breakdown of my technical stack across AI, web, data, and infrastructure.{' '}
            <span style={{ color: 'var(--text-subtle)', fontSize: '14px' }}>Click any card for a radar view.</span>
          </p>
        </div>

        {/* ── CARDS 2×2 ── */}
        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '18px',
          marginBottom: '48px',
        }}>
          {skillGroups.map((group, i) => (
            <SkillCard
              key={group.category}
              group={group}
              delay={i * 0.07}
              isActive={activeGroup?.category === group.category}
              onClick={() => setActiveGroup(prev =>
                prev?.category === group.category ? null : group
              )}
            />
          ))}
        </div>

        {/* ── ALSO WORKED WITH ── */}
        <div ref={techRef} className="section-animate">
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--bg-3)',
            borderRadius: '22px', padding: '32px 36px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Rainbow top */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, #c084fc, #60a5fa, #4af2a1, #fb923c)',
            }} />
            <div style={{
              position: 'absolute', top: '-50px', right: '-50px',
              width: '220px', height: '220px',
              background: 'radial-gradient(circle, rgba(96,165,250,0.07), transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)',
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.14em' }}>
                ALSO WORKED WITH
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--bg-3)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.08em' }}>
                {techStack.length} TOOLS
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {techStack.map(item => (
                <TechBadge key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {activeGroup && <RadarModal group={activeGroup} onClose={() => setActiveGroup(null)} />}

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        .skill-card { will-change: transform; }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
