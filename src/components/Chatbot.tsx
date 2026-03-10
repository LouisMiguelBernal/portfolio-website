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

// ── Detect theme from Navbar (watches data-theme on <html>) ───────────────
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

// ── Theme tokens ───────────────────────────────────────────────────────────
function useTheme(isDark: boolean) {
  return {
    panelBg:      isDark ? 'linear-gradient(160deg,#080f0c 0%,#050d0a 50%,#060e0b 100%)'
                         : 'linear-gradient(160deg,#f0faf5 0%,#e8f5ee 50%,#edf8f2 100%)',
    panelBorder:  isDark ? 'rgba(74,242,161,0.2)'    : 'rgba(10,102,194,0.2)',
    panelShadow:  isDark
      ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(74,242,161,0.08), 0 0 60px rgba(74,242,161,0.05)'
      : '0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(10,102,194,0.08), 0 0 40px rgba(74,242,161,0.08)',
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
    orbMask:       isDark ? '#080f0c'               : '#edf8f2',
    gridOpacity:   isDark ? 0.04                    : 0.06,
    gridColor:     isDark ? '#4af2a1'               : '#0a66c2',
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

function FabOrb({ open, pulse, onClick, orbMask, visible }: {
  open: boolean; pulse: boolean; onClick: () => void; orbMask: string; visible: boolean
}) {
  return (
    <button onClick={onClick} style={{
      position: 'fixed', bottom: '24px', right: '24px',
      width: '60px', height: '60px', borderRadius: '50%',
      background: 'transparent', border: 'none', cursor: 'pointer',
      zIndex: 10000, padding: 0,
      // Fade-in when intro is done
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(12px)',
      transition: 'opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      {pulse && !open && (<>
        <div style={{
          position: 'absolute', inset: '-8px', borderRadius: '50%',
          border: '1px solid rgba(74,242,161,0.4)',
          animation: 'fabRing 2s ease-out infinite',
        }} />
        <div style={{
          position: 'absolute', inset: '-16px', borderRadius: '50%',
          border: '1px solid rgba(74,242,161,0.2)',
          animation: 'fabRing 2s ease-out 0.5s infinite',
        }} />
      </>)}
      {!open && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #4af2a1, #0a66c2, #00f5ff, #4af2a1)',
          animation: 'orbSpin 3s linear infinite',
        }} />
      )}
      <div style={{
        position: 'absolute', inset: '2px', borderRadius: '50%',
        background: open
          ? orbMask
          : 'radial-gradient(circle at 35% 35%, #00f5ff 0%, #0a4a3a 40%, #050a07 100%)',
        transition: 'background 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: open ? 'none' : '0 0 20px rgba(74,242,161,0.4),inset 0 0 15px rgba(0,245,255,0.2)',
        borderWidth: open ? '1px' : '0px',
        borderStyle: 'solid',
        borderColor: open ? 'rgba(74,242,161,0.3)' : 'transparent',
      }}>
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4af2a1" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <>
            <div style={{
              position: 'absolute', inset: '4px', borderRadius: '50%',
              background: 'conic-gradient(from 90deg, transparent 70%, rgba(255,255,255,0.5) 85%, transparent 100%)',
              animation: 'orbSpin 1.2s linear infinite',
            }} />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 4px #4af2a1)' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </>
        )}
      </div>
    </button>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const isDark  = useIsDark()
  const t       = useTheme(isDark)

  const [open, setOpen]           = useState(false)
  const [introReady, setIntroReady] = useState(false)   // ← gates the FAB
  const [messages, setMessages]   = useState<Message[]>([
    { role: 'model', text: "Hey there! 👋 I'm Luigi, Louis's AI assistant. Ask me anything about his skills, projects, experience, or availability!" }
  ])
  const [newIdx, setNewIdx]       = useState<number | null>(null)
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [pulse, setPulse]         = useState(true)
  const bottomRef                 = useRef<HTMLDivElement>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)

  // ── Wait for IntroLoader to signal it's done ──────────────────────────
  useEffect(() => {
    const handler = () => {
      // Small extra delay so the intro fade-out fully completes before FAB pops in
      setTimeout(() => setIntroReady(true), 300)
    }
    window.addEventListener('intro:done', handler)
    return () => window.removeEventListener('intro:done', handler)
  }, [])

  // Gate FAB until IntroLoader fires intro:done
  useEffect(() => {
    const handler = () => setTimeout(() => setIntroReady(true), 300)
    window.addEventListener('intro:done', handler)
    return () => window.removeEventListener('intro:done', handler)
  }, [])

  useEffect(() => { if (open) setPulse(false) }, [open])
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
        @keyframes orbSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes plasmaPulse{ 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.85;transform:scale(0.96)} }
        @keyframes sparkFlicker{ 0%,100%{opacity:1;transform:translate(-50%,-50%)scale(1)} 50%{opacity:0.6;transform:translate(-50%,-50%)scale(0.7)} }
        @keyframes chatDot    { 0%,80%,100%{transform:scale(0.7);opacity:0.3} 40%{transform:scale(1.3);opacity:1} }
        @keyframes chatFadeUp { from{opacity:0;transform:translateY(12px)scale(0.97)} to{opacity:1;transform:translateY(0)scale(1)} }
        @keyframes chatSlideUp{ from{opacity:0;transform:translateY(24px)scale(0.95)} to{opacity:1;transform:translateY(0)scale(1)} }
        @keyframes fabRing    { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(1.8);opacity:0} }
        @keyframes scanLine   { 0%{background-position:0 -100%} 100%{background-position:0 200%} }
        @keyframes headerGlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes gridMove   { 0%{transform:translateY(0)} 100%{transform:translateY(40px)} }

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

      {/* ── Chat Panel — only mount after intro is done ── */}
      {introReady && open && (
        <div style={{
          position: 'fixed', bottom: '96px', right: '24px',
          width: '370px', height: '540px',
          background: t.panelBg,
          borderWidth: '1px', borderStyle: 'solid', borderColor: t.panelBorder,
          borderRadius: '24px',
          display: 'flex', flexDirection: 'column',
          boxShadow: t.panelShadow,
          zIndex: 9999, overflow: 'hidden',
          animation: 'chatSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}>

          {/* BG grid lines */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', opacity: t.gridOpacity }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                position: 'absolute', left: 0, right: 0, top: `${i * 45}px`, height: '1px',
                background: `linear-gradient(90deg, transparent, ${t.gridColor}, transparent)`,
                animation: `gridMove ${3 + i * 0.2}s linear infinite`,
              }} />
            ))}
          </div>

          {/* ── Header ── */}
          <div style={{
            padding: '14px 18px',
            borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: t.headerBorder,
            display: 'flex', alignItems: 'center', gap: '12px',
            position: 'relative', zIndex: 1,
            background: t.headerBg,
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
                  color: t.titleColor, margin: 0, letterSpacing: '0.04em',
                  textShadow: t.titleShadow,
                }}>LUIGI</p>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  color: '#4af2a1', letterSpacing: '0.15em',
                  background: 'rgba(74,242,161,0.1)',
                  border: '1px solid rgba(74,242,161,0.3)',
                  padding: '1px 6px', borderRadius: '4px',
                }}>AI v2</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                <div style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: '#4af2a1', boxShadow: '0 0 8px #4af2a1',
                  animation: 'sparkFlicker 2s ease-in-out infinite',
                }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  color: t.statusColor, letterSpacing: '0.1em',
                }}>ONLINE · AI ASSISTANT</span>
              </div>
            </div>

            <button className="close-btn" onClick={() => setOpen(false)} style={{
              background: t.closeBg,
              borderWidth: '1px', borderStyle: 'solid', borderColor: t.closeBorder,
              borderRadius: '8px', width: '30px', height: '30px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: t.closeColor, transition: 'all 0.15s',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* ── Messages ── */}
          <div className="chat-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 8px', position: 'relative', zIndex: 1 }}>
            {messages.map((m, i) => (
              <Bubble key={i} msg={m} isNew={i === newIdx} t={t} orbMask={t.orbMask} />
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '14px', animation: 'chatFadeUp 0.25s ease' }}>
                <PlasmaOrb size={28} orbMask={t.orbMask} />
                <div style={{
                  padding: '10px 15px', borderRadius: '18px 18px 18px 4px',
                  background: t.loadingBg,
                  borderWidth: '1px', borderStyle: 'solid', borderColor: t.loadingBorder,
                  backdropFilter: 'blur(8px)',
                }}>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Suggestions ── */}
          {messages.length === 1 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px', position: 'relative', zIndex: 1 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} className="chat-suggestion" onClick={() => sendMessage(s)}>{s}</button>
              ))}
            </div>
          )}

          {/* ── Input ── */}
          <div style={{
            padding: '12px 14px',
            borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: t.inputAreaBorder,
            display: 'flex', gap: '10px', alignItems: 'center',
            position: 'relative', zIndex: 1,
            background: t.inputAreaBg,
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
                flex: 1,
                background: t.inputBg,
                borderWidth: '1px', borderStyle: 'solid',
                borderColor: input ? t.inputBorderActive : t.inputBorderIdle,
                borderRadius: '12px', padding: '10px 14px',
                fontFamily: 'var(--font-mono)', fontSize: '13px',
                color: t.inputColor,
                transition: 'all 0.2s',
                boxSizing: 'border-box' as const,
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
                borderColor: input.trim() && !loading
                  ? 'transparent'
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

      {/* FAB — always rendered but invisible/inert until introReady */}
      <FabOrb
        open={open}
        pulse={pulse}
        onClick={() => setOpen(o => !o)}
        orbMask={t.orbMask}
        visible={introReady}
      />
    </>
  )
}
