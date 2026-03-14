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

        /* ── Logo glow ── */
        .logo-glow-wrapper {
          position: relative;
          width: 38px;
          height: 38px;
          border-radius: 9px;
          flex-shrink: 0;
          overflow: hidden;
          /* subtle spinning conic border via outline trick using ::before */
          padding: 1.5px;
          background: conic-gradient(
            from 0deg,
            rgba(74,242,161,0.0)  0%,
            rgba(74,242,161,0.7) 30%,
            rgba(74,242,161,0.0) 55%,
            rgba(74,242,161,0.4) 80%,
            rgba(74,242,161,0.0) 100%
          );
          box-shadow:
            0 0 6px  rgba(74,242,161,0.30),
            0 0 16px rgba(74,242,161,0.12);
          animation: subtleGlow 3s ease-in-out infinite, spinBorder 4s linear infinite;
        }

        .logo-glow-inner {
          width: 100%;
          height: 100%;
          border-radius: 7px;
          overflow: hidden;
          display: block;
        }

        .logo-glow-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @keyframes subtleGlow {
          0%, 100% {
            box-shadow:
              0 0 5px  rgba(74,242,161,0.25),
              0 0 14px rgba(74,242,161,0.10);
          }
          50% {
            box-shadow:
              0 0 9px  rgba(74,242,161,0.45),
              0 0 24px rgba(74,242,161,0.18);
          }
        }

        @keyframes spinBorder {
          from { background-position: 0% 0%; }
          to   { }
        }

        /* We rotate the wrapper's conic-gradient by animating a pseudo */
        .logo-glow-wrapper::before {
          content: '';
          position: absolute;
          inset: -50%;
          background: conic-gradient(
            from 0deg,
            rgba(74,242,161,0.0)  0%,
            rgba(74,242,161,0.75) 25%,
            rgba(74,242,161,0.0)  50%,
            rgba(74,242,161,0.45) 75%,
            rgba(74,242,161,0.0)  100%
          );
          animation: rotateConic 4s linear infinite;
          z-index: 0;
          border-radius: 50%;
        }

        .logo-glow-inner {
          position: relative;
          z-index: 1;
        }

        @keyframes rotateConic {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
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

          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-glow-wrapper">
              <div className="logo-glow-inner">
                <img src="/favicon.ico" alt="Logo" />
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px', color: 'var(--text)', letterSpacing: '-0.01em' }}>
              Louis Miguel Bernal
            </span>
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
