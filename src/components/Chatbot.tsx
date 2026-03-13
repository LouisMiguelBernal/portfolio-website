'use client'

import { useEffect, useRef, useState } from 'react'
import { buildContext } from '@/components/knowledge-base'

interface Message {
  role: 'user' | 'model'
  text: string
}

function buildSystemPrompt(): string {
  return `You are "Luigi", an AI assistant representing Louis Miguel Bernal on his portfolio website.
Your job is to answer visitor questions ONLY using the knowledge base below.

RULES:
- Answer based strictly on the knowledge base. Never invent details not present in it.
- Keep replies concise and friendly (2–4 sentences max).
- If a question cannot be answered from the knowledge base, say:
  "I don't have that info — feel free to reach out to Louis directly at miguellouis.work@gmail.com 😊"
- For contact/availability questions, always include Louis's email.
- Never break character. You are Luigi, Louis's assistant.

════════════════════════════════════════
KNOWLEDGE BASE
════════════════════════════════════════
${buildContext()}
════════════════════════════════════════`
}

const SUGGESTIONS = [
  "What's Louis's tech stack?",
  'Is Louis available for hire?',
  'Tell me about his projects',
  'What are his certifications?',
]

function useIsDark() {
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light')
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])
  return isDark
}

function useTheme(isDark: boolean) {
  return {
    panelBg:      isDark ? 'linear-gradient(160deg,#080f0c 0%,#050d0a 50%,#060e0b 100%)'
                         : 'linear-gradient(160deg,#f0faf5 0%,#e8f5ee 50%,#edf8f2 100%)',
    panelBorder:  isDark ? 'rgba(74,242,161,0.2)'    : 'rgba(10,102,194,0.2)',
    panelShadow:  isDark
      ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(74,242,161,0.08)'
      : '0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(10,102,194,0.08)',
    headerBg:     isDark ? 'linear-gradient(180deg,rgba(74,242,161,0.04) 0%,transparent 100%)'
                         : 'linear-gradient(180deg,rgba(74,242,161,0.08) 0%,transparent 100%)',
    headerBorder: isDark ? 'rgba(74,242,161,0.1)'    : 'rgba(10,102,194,0.12)',
    titleColor:   isDark ? '#fff'                    : '#0a1a10',
    titleShadow:  isDark ? '0 0 20px rgba(74,242,161,0.4)' : 'none',
    statusColor:  isDark ? 'rgba(74,242,161,0.5)'    : 'rgba(10,102,194,0.6)',
    closeBg:      isDark ? 'rgba(255,255,255,0.04)'  : 'rgba(0,0,0,0.04)',
    closeBorder:  isDark ? 'rgba(255,255,255,0.08)'  : 'rgba(0,0,0,0.1)',
    closeColor:   isDark ? 'rgba(255,255,255,0.4)'   : 'rgba(0,0,0,0.4)',
    userBubbleBg:   isDark
      ? 'linear-gradient(135deg,rgba(74,242,161,0.15) 0%,rgba(0,245,255,0.08) 100%)'
      : 'linear-gradient(135deg,rgba(10,102,194,0.12) 0%,rgba(74,242,161,0.08) 100%)',
    userBubbleBorder: isDark ? 'rgba(74,242,161,0.35)' : 'rgba(10,102,194,0.3)',
    userBubbleColor:  isDark ? '#d4fbe8'               : '#0a2a1a',
    aiBubbleBg:   isDark
      ? 'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(74,242,161,0.03) 100%)'
      : 'linear-gradient(135deg,rgba(255,255,255,0.8) 0%,rgba(74,242,161,0.05) 100%)',
    aiBubbleBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    aiBubbleColor:  isDark ? 'rgba(200,220,210,0.9)'  : '#1a2a20',
    aiBubbleShadow: isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.06)',
    userAvatarBg:    isDark ? 'linear-gradient(135deg,rgba(74,242,161,0.3),rgba(0,245,255,0.2))'
                            : 'linear-gradient(135deg,rgba(10,102,194,0.2),rgba(74,242,161,0.15))',
    userAvatarBorder: isDark ? 'rgba(74,242,161,0.4)' : 'rgba(10,102,194,0.35)',
    userAvatarColor:  isDark ? '#4af2a1'               : '#0a66c2',
    loadingBg:     isDark
      ? 'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(74,242,161,0.03))'
      : 'linear-gradient(135deg,rgba(255,255,255,0.9),rgba(74,242,161,0.05))',
    loadingBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    inputAreaBg:    isDark ? 'linear-gradient(0deg,rgba(74,242,161,0.03) 0%,transparent 100%)'
                           : 'linear-gradient(0deg,rgba(74,242,161,0.04) 0%,transparent 100%)',
    inputAreaBorder: isDark ? 'rgba(74,242,161,0.1)' : 'rgba(10,102,194,0.1)',
    inputBg:        isDark ? 'rgba(74,242,161,0.04)' : 'rgba(255,255,255,0.8)',
    inputBorderIdle: isDark ? 'rgba(74,242,161,0.12)' : 'rgba(10,102,194,0.15)',
    inputBorderActive: isDark ? 'rgba(74,242,161,0.4)' : 'rgba(10,102,194,0.5)',
    inputColor:     isDark ? '#d4fbe8'               : '#0a1a10',
    inputShadowActive: isDark
      ? '0 0 0 3px rgba(74,242,161,0.06),inset 0 0 20px rgba(74,242,161,0.03)'
      : '0 0 0 3px rgba(10,102,194,0.08)',
    orbMask: isDark ? '#080f0c' : '#edf8f2',
    gridOpacity: isDark ? 0.04 : 0.06,
    gridColor:   isDark ? '#4af2a1' : '#0a66c2',
  }
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
}

function PlasmaOrb({ size = 38, orbMask }: { size?: number; orbMask: string }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', position: 'relative', flexShrink: 0 }}>
      <div style={{
        position: 'absolute', inset: '-3px', borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #4af2a1, #0a66c2, #4af2a1, #00f5ff, #4af2a1)',
        animation: 'orbSpin 3s linear infinite', opacity: 0.85,
      }} />
      <div style={{ position: 'absolute', inset: '2px', borderRadius: '50%', background: orbMask, zIndex: 1 }} />
      <div style={{
        position: 'absolute', inset: '4px', borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #00f5ff 0%, #0a66c2 30%, #4af2a1 60%, #050a07 100%)',
        animation: 'plasmaPulse 2s ease-in-out infinite', zIndex: 2,
        boxShadow: '0 0 12px rgba(74,242,161,0.6), inset 0 0 8px rgba(0,245,255,0.4)',
      }} />
      <div style={{
        position: 'absolute', inset: '4px', borderRadius: '50%',
        background: 'conic-gradient(from 180deg, transparent 60%, rgba(0,245,255,0.6) 80%, transparent 100%)',
        animation: 'orbSpin 1.5s linear infinite reverse', zIndex: 3,
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: size * 0.2, height: size * 0.2, borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 0 6px #fff, 0 0 12px #4af2a1',
        animation: 'sparkFlicker 1.8s ease-in-out infinite', zIndex: 4,
      }} />
    </div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '5px', padding: '4px 2px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: `hsl(${150 + i * 20}, 90%, 65%)`,
          animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          boxShadow: `0 0 6px hsl(${150 + i * 20}, 90%, 65%)`,
        }} />
      ))}
    </div>
  )
}

function Bubble({ msg, isNew, t, orbMask }: {
  msg: Message; isNew?: boolean
  t: ReturnType<typeof useTheme>
  orbMask: string
}) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '14px',
      animation: isNew ? 'chatFadeUp 0.3s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
      alignItems: 'flex-end', gap: '8px',
    }}>
      {!isUser && <PlasmaOrb size={28} orbMask={orbMask} />}
      <div style={{
        maxWidth: '78%', padding: '11px 15px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser ? t.userBubbleBg : t.aiBubbleBg,
        borderWidth: '1px', borderStyle: 'solid',
        borderColor: isUser ? t.userBubbleBorder : t.aiBubbleBorder,
        fontFamily: 'var(--font-sans)', fontSize: '13.5px', lineHeight: 1.65,
        color: isUser ? t.userBubbleColor : t.aiBubbleColor,
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        backdropFilter: 'blur(8px)',
        boxShadow: isUser ? '0 4px 20px rgba(74,242,161,0.08)' : t.aiBubbleShadow,
        position: 'relative',
      }}>
        {!isUser && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit',
            background: 'linear-gradient(180deg,transparent 0%,rgba(74,242,161,0.03) 50%,transparent 100%)',
            backgroundSize: '100% 8px',
            animation: 'scanLine 4s linear infinite',
            pointerEvents: 'none',
          }} />
        )}
        {msg.text}
      </div>
      {isUser && (
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
          background: t.userAvatarBg,
          borderWidth: '1px', borderStyle: 'solid', borderColor: t.userAvatarBorder,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 700, color: t.userAvatarColor,
          fontFamily: 'var(--font-mono)',
          boxShadow: '0 0 10px rgba(74,242,161,0.2)',
        }}>U</div>
      )}
    </div>
  )
}

// ── Robot FAB ─────────────────────────────────────────────────────────────
function RobotFab({ open, onClick, visible, isDark }: {
  open: boolean
  onClick: () => void
  visible: boolean
  isDark: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [showCloud, setShowCloud] = useState(false)
  const [cloudOpacity, setCloudOpacity] = useState(0)

  const triggerCloud = () => {
    setShowCloud(true)
    setTimeout(() => setCloudOpacity(1), 60)
    setTimeout(() => setCloudOpacity(0), 3200)
    setTimeout(() => setShowCloud(false), 5800)
  }

  useEffect(() => {
    if (!visible || open) return
    const t = setTimeout(triggerCloud, 1200)
    return () => clearTimeout(t)
  }, [visible, open])

  useEffect(() => {
    if (!visible || open) return
    const interval = setInterval(triggerCloud, 14000)
    return () => clearInterval(interval)
  }, [visible, open])

  // ── Theme tokens for robot ──────────────────────────────────────────────
  const accent     = isDark ? '#4af2a1' : '#0a8c50'
  const accentDim  = isDark ? '#2ec47a' : '#0a6e34'
  const bodyTop    = isDark ? '#1a3324' : '#d4ede2'   // light: soft grey-green
  const bodyBot    = isDark ? '#0c1a12' : '#aacfbc'
  const stroke     = isDark ? '#3de899' : '#0a8c50'
  const eyeC       = isDark ? '#4af2a1' : '#0a7a44'
  const screenBg   = isDark ? '#091a0f' : '#e4f5ec'
  const bracketC   = isDark ? 'rgba(74,242,161,0.5)' : 'rgba(10,120,60,0.55)'
  const smileC     = isDark ? 'rgba(74,242,161,0.5)' : 'rgba(10,120,60,0.55)'
  const neckFill   = isDark ? '#0c1610' : '#c0dece'
  const chestFill  = isDark ? 'rgba(74,242,161,0.07)' : 'rgba(10,140,80,0.1)'
  const chestBord  = isDark ? 'rgba(74,242,161,0.22)' : 'rgba(10,140,80,0.3)'
  const phoneBg    = isDark ? '#060d08' : '#0a2814'
  const phoneScr   = isDark ? 'rgba(74,242,161,0.18)' : 'rgba(74,242,161,0.25)'
  const phoneLn1   = isDark ? 'rgba(74,242,161,0.65)' : 'rgba(74,242,161,0.8)'
  const phoneLn2   = isDark ? 'rgba(74,242,161,0.4)'  : 'rgba(74,242,161,0.5)'
  const armStroke  = isDark ? 'rgba(74,242,161,0.3)'  : 'rgba(10,140,80,0.35)'
  const shadowC    = isDark ? 'rgba(74,242,161,0.28)' : 'rgba(10,140,80,0.28)'
  const shine      = 'rgba(255,255,255,0.8)'
  const cloudBg    = isDark ? 'rgba(6,14,10,0.94)'    : 'rgba(255,255,255,0.97)'
  const cloudBord  = isDark ? 'rgba(74,242,161,0.55)' : 'rgba(10,140,80,0.6)'
  const cloudText  = isDark ? '#4af2a1'                : '#0a6e34'
  const dropShadow = isDark
    ? (hovered ? 'drop-shadow(0 6px 16px rgba(74,242,161,0.55))' : 'drop-shadow(0 3px 10px rgba(74,242,161,0.3)) drop-shadow(0 2px 6px rgba(0,0,0,0.55))')
    : (hovered ? 'drop-shadow(0 6px 16px rgba(10,140,80,0.5))'  : 'drop-shadow(0 3px 10px rgba(10,140,80,0.28)) drop-shadow(0 2px 6px rgba(0,0,0,0.18))')

  return (
    <div style={{
      position: 'fixed', bottom: '20px', right: '20px',
      zIndex: 10000,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.6s cubic-bezier(0.34,1.56,0.64,1), transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
      pointerEvents: visible ? 'auto' : 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>

      {/* Speech cloud */}
      {showCloud && !open && (
        <div style={{
          position: 'absolute',
          bottom: '76px',
          right: '4px',
          opacity: cloudOpacity,
          transform: cloudOpacity === 1 ? 'translateY(0)' : 'translateY(5px)',
          transition: 'opacity 2s ease, transform 2s ease',
          pointerEvents: 'none',
          zIndex: 3,
        }}>
          <svg width="70" height="44" viewBox="0 0 70 44" fill="none"
            style={{ filter: `drop-shadow(0 3px 9px ${cloudBord}88)` }}>
            <path d="M7 32 Q2 32 2 26 Q2 20 8 19 Q7 13 13 10 Q16 4 24 6 Q27 1 34 2 Q42 1 45 7 Q52 6 55 12 Q61 12 62 19 Q67 20 67 26 Q67 32 61 32 Q57 37 51 35 Q47 41 39 40 Q33 43 27 39 Q21 42 15 39 Q7 39 7 32 Z"
              fill={cloudBg} stroke={cloudBord} strokeWidth="1.2"/>
            <text x="34" y="23" textAnchor="middle" dominantBaseline="middle"
              fontFamily="monospace" fontSize="13" fontWeight="700"
              fill={cloudText} letterSpacing="0.5">Hi! 👋</text>
            <path d="M50 35 Q54 41 48 44 Q44 38 46 35 Z"
              fill={cloudBg} stroke={cloudBord} strokeWidth="1"/>
          </svg>
        </div>
      )}

      {/* Robot button — viewBox 50×62, head is ~18px tall vs body 22px */}
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '50px',
          height: '62px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          position: 'relative',
          transform: hovered ? 'translateY(-3px) scale(1.08)' : 'translateY(0) scale(1)',
          transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          animation: !open ? 'robotFloat 3.2s ease-in-out infinite' : 'none',
          filter: dropShadow,
        }}
      >
        {/* SVG: 50 wide × 62 tall
            Antenna zone:  y 0–9
            Head:          y 9–27  (18px tall, 30px wide) ← smaller head
            Neck:          y 27–32
            Body:          y 32–56 (24px tall, 34px wide) ← proportionally larger
            Arms hang from body sides
        */}
        <svg width="50" height="62" viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fHead" x1="10" y1="9" x2="40" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={bodyTop}/>
              <stop offset="100%" stopColor={bodyBot}/>
            </linearGradient>
            <linearGradient id="fBody" x1="8" y1="32" x2="42" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={bodyTop}/>
              <stop offset="100%" stopColor={bodyBot}/>
            </linearGradient>
            <radialGradient id="fScreen" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor={screenBg}/>
              <stop offset="100%" stopColor={isDark ? '#040a06' : '#cceedd'}/>
            </radialGradient>
            <radialGradient id="fEyeHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={`${eyeC}55`}/>
              <stop offset="100%" stopColor={`${eyeC}00`}/>
            </radialGradient>
            <filter id="fGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="1.4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ── Antenna center ── */}
          <rect x="23" y="1.5" width="4" height="7.5" rx="2" fill={accentDim}/>
          <circle cx="25" cy="1.5" r="2.6" fill={accent} filter="url(#fGlow)"/>

          {/* ── Antenna side nubs ── */}
          <line x1="19" y1="5" x2="14.5" y2="2.5" stroke={accentDim} strokeWidth="1.3" strokeLinecap="round"/>
          <circle cx="13.8" cy="2" r="1.7" fill={accentDim} filter="url(#fGlow)"/>
          <line x1="31" y1="5" x2="35.5" y2="2.5" stroke={accentDim} strokeWidth="1.3" strokeLinecap="round"/>
          <circle cx="36.2" cy="2" r="1.7" fill={accentDim} filter="url(#fGlow)"/>

          {/* ── Head: 30w × 18h, centred at x=10..40 ── */}
          <rect x="10" y="9" width="30" height="18" rx="7" fill="url(#fHead)" stroke={stroke} strokeWidth="1"/>
          {/* sheen */}
          <rect x="14" y="11" width="22" height="3.5" rx="2" fill="rgba(255,255,255,0.08)"/>

          {/* ── Visor: inset 3px each side, 12px tall ── */}
          <rect x="13" y="12" width="24" height="12" rx="4.5" fill="url(#fScreen)" stroke={`${eyeC}55`} strokeWidth="0.7"/>

          {open ? (
            /* X eyes when chat open */
            <>
              <line x1="17.5" y1="16" x2="21.5" y2="20" stroke={eyeC} strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="21.5" y1="16" x2="17.5" y2="20" stroke={eyeC} strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="28.5" y1="16" x2="32.5" y2="20" stroke={eyeC} strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="32.5" y1="16" x2="28.5" y2="20" stroke={eyeC} strokeWidth="1.8" strokeLinecap="round"/>
            </>
          ) : (
            <>
              {/* Left eye */}
              <circle cx="19.5" cy="18" r="3.6" fill="url(#fEyeHalo)"/>
              <circle cx="19.5" cy="18" r="2.5" fill={eyeC} filter="url(#fGlow)"
                style={{ transformOrigin: '19.5px 18px', animation: 'eyeBlink 4.5s ease-in-out infinite' }}/>
              <circle cx="18.6" cy="17.1" r="0.85" fill={shine}/>

              {/* Right eye */}
              <circle cx="30.5" cy="18" r="3.6" fill="url(#fEyeHalo)"/>
              <circle cx="30.5" cy="18" r="2.5" fill={eyeC} filter="url(#fGlow)"
                style={{ transformOrigin: '30.5px 18px', animation: 'eyeBlink 4.5s ease-in-out 0.2s infinite' }}/>
              <circle cx="29.6" cy="17.1" r="0.85" fill={shine}/>

              {/* Scan brackets (visor corners) */}
              <path d="M15 13.5 L15 16 M15 13.5 L17.5 13.5" stroke={bracketC} strokeWidth="0.8" strokeLinecap="round"/>
              <path d="M35 13.5 L35 16 M35 13.5 L32.5 13.5" stroke={bracketC} strokeWidth="0.8" strokeLinecap="round"/>
              <path d="M15 22.5 L15 20 M15 22.5 L17.5 22.5" stroke={bracketC} strokeWidth="0.8" strokeLinecap="round"/>
              <path d="M35 22.5 L35 20 M35 22.5 L32.5 22.5" stroke={bracketC} strokeWidth="0.8" strokeLinecap="round"/>
            </>
          )}

          {/* Smile below visor */}
          {!open && (
            <path d="M19 25.5 Q25 28.5 31 25.5" stroke={smileC} strokeWidth="1" strokeLinecap="round" fill="none"/>
          )}

          {/* ── Neck ── */}
          <rect x="21" y="27" width="8" height="5" rx="2" fill={neckFill} stroke={`${stroke}33`} strokeWidth="0.7"/>

          {/* ── Body: 34w × 24h ── */}
          <rect x="8" y="32" width="34" height="24" rx="8" fill="url(#fBody)" stroke={stroke} strokeWidth="1"/>
          <rect x="12" y="34" width="26" height="4" rx="2.5" fill="rgba(255,255,255,0.06)"/>

          {/* Chest panel */}
          <rect x="14" y="38" width="22" height="11" rx="3.5" fill={chestFill} stroke={chestBord} strokeWidth="0.65"/>
          <circle cx="20" cy="43.5" r="1.8" fill={eyeC} filter="url(#fGlow)"/>
          <circle cx="25" cy="43.5" r="1.2" fill={accentDim} style={{ opacity: 0.6 }}/>
          <circle cx="30" cy="43.5" r="1.8" fill={eyeC} filter="url(#fGlow)"/>

          {/* ── Left arm ── */}
          <rect x="-0.5" y="33" width="7" height="13" rx="3.3" fill="url(#fBody)" stroke={armStroke} strokeWidth="0.85"
            transform="rotate(-9 3 39.5)"/>
          <circle cx="1.5" cy="48" r="3" fill="url(#fBody)" stroke={armStroke} strokeWidth="0.8"/>

          {/* ── Right arm + phone ── */}
          <rect x="43.5" y="33" width="7" height="13" rx="3.3" fill="url(#fBody)" stroke={armStroke} strokeWidth="0.85"
            transform="rotate(9 47 39.5)"/>
          {/* Phone */}
          <rect x="44" y="47" width="7" height="10" rx="2" fill={phoneBg} stroke={`${eyeC}88`} strokeWidth="0.8"/>
          <rect x="45.1" y="48.3" width="4.8" height="6.5" rx="1.3" fill={phoneScr}/>
          <line x1="46.2" y1="50" x2="48.8" y2="50" stroke={phoneLn1} strokeWidth="0.65"/>
          <line x1="46.2" y1="51.5" x2="48.8" y2="51.5" stroke={phoneLn2} strokeWidth="0.65"/>
          <line x1="46.2" y1="53" x2="47.8" y2="53" stroke={phoneLn2} strokeWidth="0.65" opacity="0.6"/>
        </svg>

        {/* Ground glow */}
        <div style={{
          position: 'absolute', bottom: '-4px', left: '50%',
          transform: 'translateX(-50%)',
          width: '32px', height: '5px',
          background: `radial-gradient(ellipse, ${shadowC} 0%, transparent 70%)`,
          borderRadius: '50%',
          animation: !open ? 'shadowPulse 3.2s ease-in-out infinite' : 'none',
        }} />
      </button>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const isDark  = useIsDark()
  const t       = useTheme(isDark)

  const [open, setOpen]             = useState(false)
  const [introReady, setIntroReady] = useState(false)
  const [messages, setMessages]     = useState<Message[]>([
    { role: 'model', text: "Hey there! 👋 I'm Luigi, Louis's AI assistant. Ask me anything about his skills, projects, experience, or availability!" }
  ])
  const [newIdx, setNewIdx]         = useState<number | null>(null)
  const [input, setInput]           = useState('')
  const [loading, setLoading]       = useState(false)
  const bottomRef                   = useRef<HTMLDivElement>(null)
  const inputRef                    = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = () => setTimeout(() => setIntroReady(true), 300)
    window.addEventListener('intro:done', handler)
    return () => window.removeEventListener('intro:done', handler)
  }, [])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 150) }, [open])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const newMessages: Message[] = [...messages, { role: 'user', text: trimmed }]
    setMessages(newMessages)
    setNewIdx(newMessages.length - 1)
    setInput('')
    setLoading(true)

    const history = [
      { role: 'system', content: buildSystemPrompt() },
      ...newMessages.slice(1).map(m => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.text,
      })),
    ]

    try {
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY
      if (!apiKey) throw new Error('NEXT_PUBLIC_GROQ_API_KEY is not set')

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: history,
          max_tokens: 350,
          temperature: 0.4,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`)
      const reply = data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't get a response. Reach Louis at miguellouis.work@gmail.com 😊"
      setMessages(prev => { setNewIdx(prev.length); return [...prev, { role: 'model', text: reply }] })
    } catch (err) {
      setMessages(prev => {
        setNewIdx(prev.length)
        return [...prev, { role: 'model', text: `Error: ${err instanceof Error ? err.message : 'Unknown error'}. Reach Louis at miguellouis.work@gmail.com 😊` }]
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  return (
    <>
      <style>{`
        @keyframes orbSpin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes plasmaPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.85;transform:scale(0.96)} }
        @keyframes sparkFlicker{ 0%,100%{opacity:1;transform:translate(-50%,-50%)scale(1)} 50%{opacity:0.6;transform:translate(-50%,-50%)scale(0.7)} }
        @keyframes chatDot     { 0%,80%,100%{transform:scale(0.7);opacity:0.3} 40%{transform:scale(1.3);opacity:1} }
        @keyframes chatFadeUp  { from{opacity:0;transform:translateY(12px)scale(0.97)} to{opacity:1;transform:translateY(0)scale(1)} }
        @keyframes chatSlideUp { from{opacity:0;transform:translateY(24px)scale(0.95)} to{opacity:1;transform:translateY(0)scale(1)} }
        @keyframes scanLine    { 0%{background-position:0 -100%} 100%{background-position:0 200%} }
        @keyframes headerGlow  { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes gridMove    { 0%{transform:translateY(0)} 100%{transform:translateY(40px)} }

        @keyframes robotFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-7px); }
        }
        @keyframes shadowPulse {
          0%,100% { opacity:1; transform:translateX(-50%) scaleX(1); }
          50%     { opacity:0.35; transform:translateX(-50%) scaleX(0.65); }
        }
        @keyframes eyeBlink {
          0%,90%,100% { transform:scaleY(1); }
          95%         { transform:scaleY(0.08); }
        }

        .chat-input:focus { outline: none; }
        .chat-input::placeholder { color: ${isDark ? 'rgba(74,242,161,0.3)' : 'rgba(10,102,194,0.35)'}; }

        .chat-suggestion {
          background: ${isDark ? 'rgba(74,242,161,0.04)' : 'rgba(10,102,194,0.05)'} !important;
          border: 1px solid ${isDark ? 'rgba(74,242,161,0.15)' : 'rgba(10,102,194,0.2)'} !important;
          border-radius: 20px !important;
          padding: 5px 12px !important;
          font-family: var(--font-mono) !important;
          font-size: 11px !important;
          color: ${isDark ? 'rgba(74,242,161,0.6)' : 'rgba(10,102,194,0.7)'} !important;
          cursor: pointer !important;
          transition: all 0.2s !important;
          white-space: nowrap !important;
          letter-spacing: 0.04em !important;
        }
        .chat-suggestion:hover {
          background: ${isDark ? 'rgba(74,242,161,0.12)' : 'rgba(10,102,194,0.1)'} !important;
          border-color: ${isDark ? 'rgba(74,242,161,0.5)' : 'rgba(10,102,194,0.45)'} !important;
          color: ${isDark ? '#4af2a1' : '#0a66c2'} !important;
          box-shadow: 0 0 12px ${isDark ? 'rgba(74,242,161,0.15)' : 'rgba(10,102,194,0.12)'} !important;
        }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #4af2a1, #0a66c2);
          border-radius: 3px;
        }
        .send-btn:hover:not(:disabled) {
          box-shadow: 0 0 24px rgba(74,242,161,0.5) !important;
          transform: scale(1.05) !important;
        }
        .close-btn:hover {
          background: rgba(255,80,80,0.12) !important;
          color: #ff6b6b !important;
          border-color: rgba(255,80,80,0.3) !important;
        }
      `}</style>

      {/* ── Chat Panel ── */}
      {introReady && open && (
        <div style={{
          position: 'fixed', bottom: '106px', right: '20px',
          width: '370px', height: '540px',
          background: t.panelBg,
          borderWidth: '1px', borderStyle: 'solid', borderColor: t.panelBorder,
          borderRadius: '24px',
          display: 'flex', flexDirection: 'column',
          boxShadow: t.panelShadow,
          zIndex: 9999, overflow: 'hidden',
          animation: 'chatSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', opacity: t.gridOpacity }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                position: 'absolute', left: 0, right: 0, top: `${i * 45}px`, height: '1px',
                background: `linear-gradient(90deg, transparent, ${t.gridColor}, transparent)`,
                animation: `gridMove ${3 + i * 0.2}s linear infinite`,
              }} />
            ))}
          </div>

          {/* Header */}
          <div style={{
            padding: '14px 18px',
            borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: t.headerBorder,
            display: 'flex', alignItems: 'center', gap: '12px',
            position: 'relative', zIndex: 1, background: t.headerBg,
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, transparent, #4af2a1, #00f5ff, #0a66c2, transparent)',
              animation: 'headerGlow 2.5s ease-in-out infinite',
            }} />
            <PlasmaOrb size={44} orbMask={t.orbMask} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700,
                  color: t.titleColor, margin: 0, letterSpacing: '0.04em', textShadow: t.titleShadow,
                }}>LUIGI</p>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#4af2a1',
                  letterSpacing: '0.15em', background: 'rgba(74,242,161,0.1)',
                  border: '1px solid rgba(74,242,161,0.3)', padding: '1px 6px', borderRadius: '4px',
                }}>AI v2</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                <div style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: '#4af2a1', boxShadow: '0 0 8px #4af2a1',
                  animation: 'sparkFlicker 2s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: t.statusColor, letterSpacing: '0.1em' }}>
                  ONLINE · AI ASSISTANT
                </span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setOpen(false)} style={{
              background: t.closeBg, borderWidth: '1px', borderStyle: 'solid', borderColor: t.closeBorder,
              borderRadius: '8px', width: '30px', height: '30px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: t.closeColor, transition: 'all 0.15s',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 8px', position: 'relative', zIndex: 1 }}>
            {messages.map((m, i) => (
              <Bubble key={i} msg={m} isNew={i === newIdx} t={t} orbMask={t.orbMask} />
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '14px', animation: 'chatFadeUp 0.25s ease' }}>
                <PlasmaOrb size={28} orbMask={t.orbMask} />
                <div style={{
                  padding: '10px 15px', borderRadius: '18px 18px 18px 4px',
                  background: t.loadingBg, borderWidth: '1px', borderStyle: 'solid',
                  borderColor: t.loadingBorder, backdropFilter: 'blur(8px)',
                }}>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px', position: 'relative', zIndex: 1 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} className="chat-suggestion" onClick={() => sendMessage(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 14px',
            borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: t.inputAreaBorder,
            display: 'flex', gap: '10px', alignItems: 'center',
            position: 'relative', zIndex: 1, background: t.inputAreaBg,
          }}>
            <input
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Luigi anything..."
              disabled={loading}
              style={{
                flex: 1, background: t.inputBg,
                borderWidth: '1px', borderStyle: 'solid',
                borderColor: input ? t.inputBorderActive : t.inputBorderIdle,
                borderRadius: '12px', padding: '10px 14px',
                fontFamily: 'var(--font-mono)', fontSize: '13px', color: t.inputColor,
                transition: 'all 0.2s', boxSizing: 'border-box' as const,
                boxShadow: input ? t.inputShadowActive : 'none',
              }}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #4af2a1, #00c97a)'
                  : isDark ? 'rgba(74,242,161,0.06)' : 'rgba(10,102,194,0.06)',
                borderWidth: '1px', borderStyle: 'solid',
                borderColor: input.trim() && !loading ? 'transparent'
                  : isDark ? 'rgba(74,242,161,0.12)' : 'rgba(10,102,194,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                color: input.trim() && !loading ? '#050a07' : isDark ? 'rgba(74,242,161,0.3)' : 'rgba(10,102,194,0.3)',
                transition: 'all 0.2s',
                boxShadow: input.trim() && !loading ? '0 0 16px rgba(74,242,161,0.35)' : 'none',
              }}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* ── Robot FAB ── */}
      <RobotFab
        open={open}
        onClick={() => setOpen(o => !o)}
        visible={introReady}
        isDark={isDark}
      />
    </>
  )
}
