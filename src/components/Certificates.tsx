'use client'

import { useEffect, useRef, useState } from 'react'

type Certificate = {
  title: string
  issuer: string
  dateRange: string
  jpg?: string
  credentialId?: string
  verifyLink?: string
  accent: string
  logo: string
}

const certificates: Certificate[] = [
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    dateRange: '2025',
    credentialId: '5DCEBTE0WLYU',
    jpg: '/certificates/deep-learning-specialization.jpg',
    verifyLink: 'https://coursera.org/verify/5DCEBTE0WLYU',
    accent: '#e63946',
    logo: '/certificates/DL_logo.png',
  },
  {
    title: 'Sequence Models',
    issuer: 'DeepLearning.AI',
    dateRange: '2025',
    credentialId: 'AGSTIN6MFW6H',
    jpg: '/certificates/sequence-models.jpg',
    verifyLink: 'https://coursera.org/verify/AGSTIN6MFW6H',
    accent: '#e63946',
    logo: '/certificates/DL_logo.png',
  },
  {
    title: 'Convolutional Neural Networks',
    issuer: 'DeepLearning.AI',
    dateRange: '2025',
    credentialId: 'VOPC3983POHV',
    jpg: '/certificates/convolutional-neural-networks.jpg',
    verifyLink: 'https://coursera.org/verify/VOPC3983POHV',
    accent: '#e63946',
    logo: '/certificates/DL_logo.png',
  },
  {
    title: 'Improving Deep Neural Networks',
    issuer: 'DeepLearning.AI',
    dateRange: '2025',
    jpg: '/certificates/improving-deep-neural-networks.jpg',
    accent: '#e63946',
    logo: '/certificates/DL_logo.png',
  },
  {
    title: 'Neural Networks and Deep Learning',
    issuer: 'DeepLearning.AI',
    dateRange: '2025',
    credentialId: '3520567IBKAP',
    jpg: '/certificates/neural-networks-deep-learning.jpg',
    verifyLink: 'https://coursera.org/verify/3520567IBKAP',
    accent: '#e63946',
    logo: '/certificates/DL_logo.png',
  },
  {
    title: 'Structuring ML Projects',
    issuer: 'DeepLearning.AI',
    dateRange: '2025',
    credentialId: 'PW7B3FJBJ8L5',
    jpg: '/certificates/structuring-ml-projects.jpg',
    verifyLink: 'https://coursera.org/verify/PW7B3FJBJ8L5',
    accent: '#e63946',
    logo: '/certificates/DL_logo.png',
  },
  {
    title: 'Data Science Workshop 2024',
    issuer: 'De La Salle University',
    dateRange: '2024',
    jpg: '/certificates/dlsu-workshop.jpg',
    accent: '#4af2a1',
    logo: '/certificates/dlsu_logo.png',
  },
  {
    title: 'Accenture Data Analytics & Visualization',
    issuer: 'Forage',
    dateRange: '2024',
    credentialId: 'hHvNNDaQemSPXKWTK',
    jpg: '/certificates/accenture-simulation.jpg',
    accent: '#a100ff',
    logo: '/certificates/ac_logo.png',
  },
  {
    title: 'Data Analysis with Python',
    issuer: 'freeCodeCamp',
    dateRange: '2023',
    jpg: '/certificates/fcc-python.jpg',
    accent: '#3b82f6',
    logo: '/certificates/fcc_logo.jpg',
  },
  {
    title: 'Data Analytics using Excel',
    issuer: 'Great Learning',
    dateRange: '2023',
    jpg: '/certificates/gr_excel.jpg',
    verifyLink: 'https://www.mygreatlearning.com/certificate/ETRAYBKU?referrer_code=GLZY-_MSHPD5Y',
    accent: '#3b82f6',
    logo: '/certificates/GL_logo.jpg',
  },
  {
    title: 'Introduction to Analytics',
    issuer: 'Great Learning',
    dateRange: '2023',
    jpg: '/certificates/gr_analytics.jpg',
    verifyLink: 'https://www.mygreatlearning.com/certificate/PGLBYALE?referrer_code=GLZY-_MSHPD5Y',
    accent: '#3b82f6',
    logo: '/certificates/GL_logo.jpg',
  },
  {
    title: 'Google Analytics',
    issuer: 'Google',
    dateRange: '2023',
    accent: '#34a853',
    verifyLink: 'https://support.google.com/analytics/answer/15068052#zippy=,get-started-using-google-analytics-introduction,go-further-with-advanced-features-in-google-analytics-advanced,answer-business-questions-with-google-analytics-intermediate,use-google-analytics-for-your-business-beginner',
    logo: '/certificates/google.png',
  },
]

function ShieldIcon({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(4,6,10,0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'lbFadeIn 0.15s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '880px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: cert.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
            {cert.issuer} · {cert.dateRange}
          </p>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '17px', color: 'var(--text)' }}>
            {cert.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '8px', color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            padding: '7px 16px', cursor: 'pointer',
            letterSpacing: '0.08em', transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text-subtle)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          ESC ✕
        </button>
      </div>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '880px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '14px', overflow: 'hidden', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: '300px', maxHeight: '72vh',
          animation: 'lbSlideUp 0.18s ease',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${cert.accent}, transparent)` }} />
        {cert.jpg ? (
          <img src={cert.jpg} alt={cert.title} style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', display: 'block' }} />
        ) : (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>
              CERTIFICATE AVAILABLE UPON REQUEST
            </p>
          </div>
        )}
      </div>

      <p style={{ marginTop: '14px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>
        CLICK OUTSIDE OR PRESS ESC TO CLOSE
      </p>
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────
function CertCard({ cert, onOpen }: { cert: Certificate; onOpen: () => void }) {
  const [logoError, setLogoError] = useState(false)

  return (
    <div
      className="cert-card"
      style={{
        width: '300px',
        minHeight: '420px',
        flexShrink: 0,
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        willChange: 'transform',
      }}
    >
      {/* Top row: logo + shield */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{
          width: '80px', height: '80px', background: '#fff',
          borderRadius: '14px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', overflow: 'hidden', flexShrink: 0,
        }}>
          {!logoError ? (
            <img
              src={cert.logo} alt={cert.issuer}
              onError={() => setLogoError(true)}
              style={{ width: '62px', height: '62px', objectFit: 'contain' }}
            />
          ) : (
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '20px', color: 'var(--bg-3)' }}>
              {cert.issuer.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <div style={{
          width: '34px', height: '34px', background: 'var(--surface)',
          borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', border: '1px solid var(--border)', flexShrink: 0,
        }}>
          <ShieldIcon color={cert.accent} />
        </div>
      </div>

      {/* Issuer + year */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
          color: cert.accent, letterSpacing: '0.06em', textTransform: 'uppercase',
          maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {cert.issuer}
        </span>
        <span style={{ color: 'var(--text-subtle)', fontSize: '12px' }}>·</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{cert.dateRange}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-sans)', fontSize: '17px', fontWeight: 700,
        color: 'var(--text)', lineHeight: 1.35, marginBottom: '24px',
        letterSpacing: '-0.01em', flex: 1,
      }}>
        {cert.title}
      </h3>

      {/* View button */}
      {cert.jpg ? (
        <button
          onClick={onOpen}
          className="cert-view-btn"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
            width: '100%',
            background: 'var(--accent-2-dim)',
            border: '1px solid var(--border)',
            borderRadius: '8px', padding: '11px 16px',
            color: 'var(--accent-2)', fontFamily: 'var(--font-sans)',
            fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            transition: 'background 0.2s, border-color 0.2s', marginBottom: '18px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--accent-2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-2-dim)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          View Certificate
        </button>
      ) : (
        <div style={{ height: '44px', marginBottom: '18px' }} />
      )}

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '14px' }} />

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.03em' }}>
          {cert.credentialId ? `ID: ${cert.credentialId.slice(0, 10)}` : 'Credential ID: —'}
        </span>
        {cert.verifyLink ? (
          <a
            href={cert.verifyLink} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Verify
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        ) : (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>—</span>
        )}
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Certificates() {
  const headRef = useRef<HTMLDivElement>(null)
  const [activeCert, setActiveCert] = useState<Certificate | null>(null)
  const [paused, setPaused] = useState(false)
  const isDragging = useRef(false)

  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  // Global mouseup so releasing outside the track still resumes
  useEffect(() => {
    const onMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false
        setPaused(false)
      }
    }
    window.addEventListener('mouseup', onMouseUp)
    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [])

  return (
    <section id="certificates" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div ref={headRef} className="section-animate" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', marginBottom: '56px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          border: '1px solid var(--border)', borderRadius: '999px',
          padding: '5px 14px', marginBottom: '20px',
        }}>
          <ShieldIcon color="var(--accent)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Credentials
          </span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
        }}>
          Professional Certifications
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.65 }}>
          Certificates I have picked up on my Personal Career journey
        </p>
      </div>

      {/* ── Marquee ── */}
      <div style={{ position: 'relative' }}>
        <div style={{ overflow: 'hidden', paddingBottom: '8px' }}>
          <div
            className="marquee-track"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              if (!isDragging.current) setPaused(false)
            }}
            onMouseDown={() => {
              isDragging.current = true
              setPaused(true)
            }}
            onMouseUp={() => {
              isDragging.current = false
              setPaused(false)
            }}
            style={{
              display: 'flex',
              gap: '20px',
              width: 'max-content',
              padding: '12px 0 16px',
              animation: 'marquee 40s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
              willChange: 'transform',
              userSelect: 'none',
              cursor: isDragging.current ? 'grabbing' : 'grab',
            }}
          >
            {certificates.map((cert, i) => (
              <CertCard key={`a-${i}`} cert={cert} onOpen={() => setActiveCert(cert)} />
            ))}
            {certificates.map((cert, i) => (
              <CertCard key={`b-${i}`} cert={cert} onOpen={() => setActiveCert(cert)} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeCert && <Lightbox cert={activeCert} onClose={() => setActiveCert(null)} />}

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes lbSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (hover: hover) {
          .cert-card:hover {
            transform: translateY(-6px) !important;
            border-color: var(--accent-2) !important;
            box-shadow: 0 20px 48px rgba(0,0,0,0.2) !important;
          }
        }

        @media (hover: none) {
          .cert-card:hover {
            transform: none !important;
            box-shadow: none !important;
            border-color: var(--border) !important;
          }
        }
      `}</style>
    </section>
  )
}
