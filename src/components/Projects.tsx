'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const projects = [
  {
    title: 'VisorAI',
    category: 'AI / MOBILE APP',
    description: 'A YOLOv11-Powered Mobile Application for Real-Time Detection of LTO Road Markings with Auditory Feedback. Assists drivers and pedestrians by identifying road markings through the camera and providing immediate audio cues.',
    tags: ['YOLOv11', 'Python', 'Mobile', 'Computer Vision'],
    accent: '#4af2a1',
    year: '2026',
    link: 'https://github.com/LouisMiguelBernal/VisorAI',
    github: 'https://github.com/LouisMiguelBernal/VisorAI',
    imgIntro: '/projects/VR_intro.jpg',
    img1: '/projects/VR_1.jpg',
  },
  {
    title: 'DeepS&P',
    category: 'AI / FINANCE',
    description: 'Institutional-grade S&P 500 AI forecasting platform powered by a 3-layer LSTM trained on 90+ years of historical data. Includes Monte Carlo simulation with up to 2,000 stochastic paths and dynamic financial dashboards.',
    tags: ['TensorFlow', 'LSTM', 'Monte Carlo', 'Finance'],
    accent: '#7eb8f7',
    year: '2026',
    link: 'https://deepsp500.streamlit.app/',
    github: 'https://github.com/LouisMiguelBernal/DeepSP',
    imgIntro: '/projects/DP_intro.jpg',
    img1: '/projects/DP_1.jpg',
  },
  {
    title: 'GiftxAI',
    category: 'AI / RAG SYSTEM',
    description: 'Enterprise-grade RAG-powered gift recommendation system leveraging Groq Llama 3.3, triple-validation for strict accuracy, and FAISS vector embeddings. Zero hallucinations with real-time performance metrics.',
    tags: ['LangChain', 'FAISS', 'Groq', 'RAG'],
    accent: '#c084fc',
    year: '2025',
    link: 'https://giftxai.streamlit.app/',
    github: 'https://github.com/LouisMiguelBernal/GiftxAI',
    imgIntro: '/projects/GA_intro.jpg',
    img1: '/projects/GA_1.jpg',
  },
  {
    title: 'XGE',
    category: 'ML / DATA SCIENCE',
    description: 'End-to-end machine learning pipeline predicting vehicle CO₂ emissions using XGBoost with feature engineering, SHAP explainability, and an interactive dashboard for real-time emission forecasting.',
    tags: ['XGBoost', 'SHAP', 'Python', 'Scikit-learn'],
    accent: '#fb923c',
    year: '2025',
    link: 'https://xge-ai.streamlit.app/',
    github: 'https://github.com/LouisMiguelBernal/XGE',
    imgIntro: '/projects/XG_intro.png',
    img1: '/projects/XG_1.png',
  },
  {
    title: 'QuantMaven',
    category: 'DATA / DASHBOARD',
    description: 'Interactive Streamlit trading dashboard integrating real-time stock data, technical indicators (RSI, Bollinger Bands), and 10 years of historical performance. Dynamic programming for max-profit optimization.',
    tags: ['Streamlit', 'YFinance', 'Plotly', 'Python'],
    accent: '#34d399',
    year: '2024',
    link: 'https://quantmaven.streamlit.app/',
    github: 'https://github.com/LouisMiguelBernal/QuantMaven',
    imgIntro: '/projects/QM_Intro.jpg',
    img1: '/projects/QM_1.png',
  },
]

function useScrollAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

// ── Desktop accordion card ────────────────────────────────────────────────────
function ProjectCard({
  project,
  isActive,
  onHover,
}: {
  project: typeof projects[0]
  isActive: boolean
  onHover: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const showDetail = isActive && hovered

  return (
    <div
      onMouseEnter={() => { setHovered(true); onHover() }}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        width: isActive ? '620px' : '110px',
        height: '580px',
        border: `1px solid ${isActive ? project.accent + '55' : 'var(--border)'}`,
        boxShadow: isActive
          ? `0 28px 72px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}18`
          : '0 4px 20px rgba(0,0,0,0.25)',
        transition: 'width 0.55s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Intro image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${project.imgIntro})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transition: 'transform 0.6s ease',
        transform: isActive && hovered ? 'scale(1.05)' : 'scale(1)',
      }} />

      {/* _1 screenshot on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${project.img1})`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        opacity: showDetail ? 1 : 0,
        transition: 'opacity 0.55s ease',
      }} />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isActive
          ? showDetail
            ? 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.1) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.05) 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 100%)',
        transition: 'background 0.45s ease',
        zIndex: 2,
      }} />

      {/* Accent stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        opacity: isActive ? 1 : 0.45,
        transition: 'opacity 0.4s ease', zIndex: 3,
      }} />

      {/* Year badge */}
      {isActive && (
        <div style={{
          position: 'absolute', top: '18px', right: '18px', zIndex: 4,
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: 'rgba(255,255,255,0.5)',
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.06em',
        }}>
          {project.year}
        </div>
      )}

      {/* Collapsed vertical label */}
      {!isActive && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px',
            color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em',
            writingMode: 'vertical-rl', textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            textShadow: '0 2px 8px rgba(0,0,0,0.9)', whiteSpace: 'nowrap',
          }}>
            {project.title}
          </span>
        </div>
      )}

      {/* Expanded content */}
      {isActive && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '28px', zIndex: 4,
          transform: showDetail ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.35s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: project.accent,
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}35`,
            padding: '3px 10px', borderRadius: '999px',
            letterSpacing: '0.1em', marginBottom: '10px',
          }}>
            {project.category}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-sans)', fontSize: '24px', fontWeight: 700,
            color: '#fff', letterSpacing: '-0.02em',
            marginBottom: showDetail ? '10px' : '0',
            lineHeight: 1.15, transition: 'margin-bottom 0.3s ease',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            {project.title}
          </h3>

          <div style={{
            maxHeight: showDetail ? '90px' : '0px', overflow: 'hidden',
            opacity: showDetail ? 1 : 0,
            transition: 'max-height 0.4s ease, opacity 0.35s ease',
            marginBottom: showDetail ? '14px' : '0',
          }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, margin: 0 }}>
              {project.description}
            </p>
          </div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '6px',
            maxHeight: showDetail ? '60px' : '0px', overflow: 'hidden',
            opacity: showDetail ? 1 : 0,
            transition: 'max-height 0.4s ease 0.05s, opacity 0.35s ease 0.05s',
            marginBottom: showDetail ? '16px' : '0',
          }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                color: project.accent, background: `${project.accent}15`,
                border: `1px solid ${project.accent}25`,
                padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.04em',
              }}>{tag}</span>
            ))}
          </div>

          <div style={{
            display: 'flex', gap: '10px', alignItems: 'center',
            maxHeight: showDetail ? '50px' : '0px', overflow: 'hidden',
            opacity: showDetail ? 1 : 0,
            transition: 'max-height 0.4s ease 0.1s, opacity 0.35s ease 0.1s',
          }}>
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: '#050a07', background: project.accent,
                padding: '8px 16px', borderRadius: '6px',
                textDecoration: 'none', fontWeight: 600, letterSpacing: '0.03em',
                transition: 'opacity 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 14px', borderRadius: '6px',
                textDecoration: 'none', transition: 'background 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
              {project.year}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Mobile stacked card ───────────────────────────────────────────────────────
function MobileCard({ project }: { project: typeof projects[0] }) {
  const [tapped, setTapped] = useState(false)

  return (
    <div
      onClick={() => setTapped(t => !t)}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        height: tapped ? '460px' : '220px',
        border: `1px solid ${tapped ? project.accent + '55' : 'var(--border)'}`,
        boxShadow: tapped ? `0 16px 48px rgba(0,0,0,0.4)` : '0 4px 16px rgba(0,0,0,0.2)',
        transition: 'height 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {/* Intro image always */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${project.imgIntro})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transition: 'transform 0.5s ease',
        transform: tapped ? 'scale(1.04)' : 'scale(1)',
      }} />

      {/* Screenshot on tap */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${project.img1})`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        opacity: tapped ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }} />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: tapped
          ? 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.1) 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)',
        transition: 'background 0.4s ease',
        zIndex: 2,
      }} />

      {/* Accent stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        zIndex: 3,
      }} />

      {/* Tap hint — only when collapsed */}
      {!tapped && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px', zIndex: 4,
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'rgba(255,255,255,0.45)',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.06em',
        }}>
          TAP
        </div>
      )}

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '20px', zIndex: 4,
      }}>
        {/* Category */}
        <div style={{
          display: 'inline-flex',
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          color: project.accent,
          background: `${project.accent}18`,
          border: `1px solid ${project.accent}35`,
          padding: '2px 8px', borderRadius: '999px',
          letterSpacing: '0.1em', marginBottom: '8px',
        }}>
          {project.category}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700,
          color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: tapped ? '10px' : '0',
          transition: 'margin-bottom 0.3s ease',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <div style={{
          maxHeight: tapped ? '100px' : '0px', overflow: 'hidden',
          opacity: tapped ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.35s ease',
          marginBottom: tapped ? '12px' : '0',
        }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, margin: 0 }}>
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '5px',
          maxHeight: tapped ? '60px' : '0px', overflow: 'hidden',
          opacity: tapped ? 1 : 0,
          transition: 'max-height 0.4s ease 0.05s, opacity 0.35s ease 0.05s',
          marginBottom: tapped ? '14px' : '0',
        }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: project.accent, background: `${project.accent}15`,
              border: `1px solid ${project.accent}25`,
              padding: '2px 7px', borderRadius: '4px',
            }}>{tag}</span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex', gap: '8px',
          maxHeight: tapped ? '50px' : '0px', overflow: 'hidden',
          opacity: tapped ? 1 : 0,
          transition: 'max-height 0.4s ease 0.1s, opacity 0.35s ease 0.1s',
        }}>
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: '#050a07', background: project.accent,
              padding: '8px 14px', borderRadius: '6px',
              textDecoration: 'none', fontWeight: 600, flexShrink: 0,
            }}
          >
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: 'rgba(255,255,255,0.85)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '8px 12px', borderRadius: '6px',
              textDecoration: 'none', flexShrink: 0,
            }}
          >
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}>
            {project.year}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const headRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(headRef as React.RefObject<HTMLElement>)

  const [activeIndex, setActiveIndex] = useState(0)
  const prev = useCallback(() => setActiveIndex(i => (i - 1 + projects.length) % projects.length), [])
  const next = useCallback(() => setActiveIndex(i => (i + 1) % projects.length), [])

  return (
    <section id="projects" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <div>
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
                Projects
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
            }}>
              Things I've Built
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '460px', lineHeight: 1.65 }}>
              End-to-End Projects Showcasing my Expertise in AI Development
            </p>
          </div>

          {/* Arrows — desktop only */}
          <div className="proj-arrows" style={{ display: 'flex', gap: '10px' }}>
            {[{ fn: prev, dir: 'left' }, { fn: next, dir: 'right' }].map(({ fn, dir }) => (
              <button key={dir} onClick={fn} style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'var(--surface)', border: '1px solid var(--border)',
                color: 'var(--text-muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: accordion row ── */}
        <div className="proj-desktop" style={{ display: 'flex', gap: '12px', alignItems: 'stretch', overflowX: 'hidden' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} isActive={i === activeIndex} onHover={() => setActiveIndex(i)} />
          ))}
        </div>

        {/* Desktop dot indicators */}
        <div className="proj-desktop" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
          {projects.map((p, i) => (
            <button key={i} onClick={() => setActiveIndex(i)} style={{
              width: i === activeIndex ? '28px' : '8px', height: '8px',
              borderRadius: '4px',
              background: i === activeIndex ? projects[activeIndex].accent : 'var(--border)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.35s ease',
            }} />
          ))}
        </div>

        {/* ── MOBILE: stacked tap cards ── */}
        <div className="proj-mobile" style={{ display: 'none', flexDirection: 'column', gap: '16px' }}>
          {projects.map(p => (
            <MobileCard key={p.title} project={p} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .proj-desktop { display: none !important; }
          .proj-mobile   { display: flex !important; }
          .proj-arrows   { display: none !important; }
        }
      `}</style>
    </section>
  )
}
