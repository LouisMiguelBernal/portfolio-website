'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    const initial = stored || 'dark'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial === 'light' ? 'light' : '')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next === 'light' ? 'light' : '')
    localStorage.setItem('theme', next)
  }

  return (
    <>
      {/* All nav background colors handled via CSS variables here — never hardcoded */}
      <style>{`
        .navbar-scrolled {
          background: var(--bg-2) !important;
          border-bottom: 1px solid var(--border) !important;
          backdrop-filter: blur(16px) !important;
        }
        .mobile-menu-panel {
          background: var(--bg-2);
          backdrop-filter: blur(16px);
        }
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-right { display: flex !important; }
        }
      `}</style>

      <nav
        className={scrolled ? 'navbar-scrolled' : ''}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '12px 0' : '20px 0',
          background: 'transparent',
          backdropFilter: 'none',
          borderBottom: 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Animated Logo Mark */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Rotating outer dashed ring */}
                <circle
                  cx="18" cy="18" r="16"
                  stroke="var(--accent)" strokeWidth="1"
                  strokeDasharray="5 3"
                  opacity="0.35"
                  style={{ animation: 'logoSpin 10s linear infinite', transformOrigin: '18px 18px' }}
                />
                {/* Inner bg */}
                <circle cx="18" cy="18" r="13" fill="var(--accent-dim)" stroke="rgba(74,242,161,0.2)" strokeWidth="1" />

                {/* Input layer nodes */}
                <circle cx="10" cy="12" r="2" fill="var(--accent)" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 0s' }} />
                <circle cx="10" cy="18" r="2" fill="var(--accent)" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 0.35s' }} />
                <circle cx="10" cy="24" r="2" fill="var(--accent)" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 0.7s' }} />

                {/* Hidden layer nodes */}
                <circle cx="18" cy="14.5" r="2" fill="var(--accent)" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 0.9s' }} />
                <circle cx="18" cy="21.5" r="2" fill="var(--accent)" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 1.2s' }} />

                {/* Output node */}
                <circle cx="26" cy="18" r="2.3" fill="var(--accent)" style={{ animation: 'nnPulse 2.8s ease-in-out infinite 1.6s' }} />

                {/* Connections input to hidden */}
                <line x1="12" y1="12" x2="16" y2="14.5" stroke="var(--accent)" strokeWidth="0.7" opacity="0.45" />
                <line x1="12" y1="12" x2="16" y2="21.5" stroke="var(--accent)" strokeWidth="0.7" opacity="0.2" />
                <line x1="12" y1="18" x2="16" y2="14.5" stroke="var(--accent)" strokeWidth="0.7" opacity="0.45" />
                <line x1="12" y1="18" x2="16" y2="21.5" stroke="var(--accent)" strokeWidth="0.7" opacity="0.45" />
                <line x1="12" y1="24" x2="16" y2="14.5" stroke="var(--accent)" strokeWidth="0.7" opacity="0.2" />
                <line x1="12" y1="24" x2="16" y2="21.5" stroke="var(--accent)" strokeWidth="0.7" opacity="0.45" />

                {/* Connections hidden to output */}
                <line x1="20" y1="14.5" x2="23.7" y2="18" stroke="var(--accent)" strokeWidth="0.7" opacity="0.55" />
                <line x1="20" y1="21.5" x2="23.7" y2="18" stroke="var(--accent)" strokeWidth="0.7" opacity="0.55" />

                {/* Traveling signal dots */}
                <circle r="1.2" fill="var(--accent)" opacity="0.95">
                  <animateMotion dur="2.2s" repeatCount="indefinite" begin="0s" path="M10,12 L18,14.5" />
                </circle>
                <circle r="1.2" fill="var(--accent)" opacity="0.95">
                  <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.7s" path="M10,24 L18,21.5" />
                </circle>
                <circle r="1.2" fill="var(--accent)" opacity="0.95">
                  <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.4s" path="M18,14.5 L26,18" />
                </circle>
              </svg>
              <style>{`
                @keyframes logoSpin {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(360deg); }
                }
                @keyframes nnPulse {
                  0%, 100% { opacity: 0.4; }
                  50%      { opacity: 1; }
                }
              `}</style>
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px', color: 'var(--text)', letterSpacing: '-0.01em' }}>Louis Miguel Bernal</span>
          </a>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: active === link.href ? 'var(--accent)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  transition: 'color 0.2s, background 0.2s',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--text)'; (e.target as HTMLElement).style.background = 'var(--bg-3)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = active === link.href ? 'var(--accent)' : 'var(--text-muted)'; (e.target as HTMLElement).style.background = 'transparent'; }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/certificates/resume.pdf"
              target="_blank"
              style={{
                marginLeft: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--accent)',
                border: '1px solid rgba(74,242,161,0.3)',
                padding: '7px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => { const el = e.target as HTMLElement; el.style.background = 'var(--accent-dim)'; el.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { const el = e.target as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(74,242,161,0.3)'; }}
            >
              Resume ↗
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                marginLeft: '8px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: 'var(--text-muted)',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'var(--bg-3)'
                el.style.borderColor = 'var(--accent)'
                el.style.color = 'var(--accent)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'var(--surface)'
                el.style.borderColor = 'var(--border)'
                el.style.color = 'var(--text-muted)'
              }}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile right side: theme toggle + burger */}
          <div style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="mobile-right">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: 'var(--text-muted)',
              }}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: '4px' }}
              aria-label="Menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                {menuOpen
                  ? <><path d="M6 18L18 6M6 6l12 12" /></>
                  : <><path d="M4 6h16M4 12h16M4 18h16" /></>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="mobile-menu-panel"
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              borderBottom: '1px solid var(--border)',
              padding: '16px 32px 24px',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}
          >
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '14px',
                  color: 'var(--text-muted)', textDecoration: 'none',
                  padding: '10px 0', borderBottom: '1px solid var(--bg-3)',
                }}>
                {link.label}
              </a>
            ))}
            <a href="/certificates/resume.pdf" target="_blank" style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--accent)', textDecoration: 'none' }}>
              Resume ↗
            </a>
          </div>
        )}
      </nav>
    </>
  )
}
