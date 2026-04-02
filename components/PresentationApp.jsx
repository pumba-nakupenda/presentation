'use client'
// v2
import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, LayoutGrid, AlignLeft, FileText, Volume2, VolumeX, Pause, Play, Maximize, Minimize } from 'lucide-react'
import { slides } from '@/data/slides'
import SlideViewer from './SlideViewer'

const MONO = { fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontWeight: 900 }
const LATO = { fontFamily: 'var(--font-lato, Lato, sans-serif)' }

const DESIGN_W = 900 // natural design width for scale computation
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function PresentationApp() {
  const [slide, setSlide]     = useState(0)
  const [mode, setMode]       = useState('synthese')
  const [vw, setVw]           = useState(1280)
  const [playing, setPlaying]     = useState(false)
  const [muted, setMuted]         = useState(false)
  const [audioPct, setAudioPct]   = useState(0)
  const [audioTime, setAudioTime] = useState('0:00')
  const [guideMode, setGuideMode] = useState(false)
  const [activeElem, setActiveElem]       = useState(-1)
  const [slideSegments, setSlideSegments] = useState([])
  const [fullscreen, setFullscreen] = useState(false)
  const audioRef                  = useRef(null)
  const seekBarRef                = useRef(null)
  const sessionRef                = useRef(null)   // tracking session id
  const viewRef                   = useRef(null)   // current slide view id
  const slideEnteredAt            = useRef(null)   // timestamp when slide was entered
  const sessionStartAt            = useRef(null)

  const isMobile = vw < 768

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Fullscreen sync
  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  // Tracking — session start
  useEffect(() => {
    sessionStartAt.current = Date.now()
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'session_start', user_agent: navigator.userAgent }),
    })
      .then(r => r.json())
      .then(d => { sessionRef.current = d.session_id })
      .catch(() => {})

    return () => {
      // session end
      const total = Math.round((Date.now() - sessionStartAt.current) / 1000)
      if (sessionRef.current) {
        navigator.sendBeacon('/api/track', JSON.stringify({ type: 'session_end', session_id: sessionRef.current, total_seconds: total }))
      }
    }
  }, [])

  // Tracking — slide enter
  const trackSlideEnter = (slideIdx) => {
    slideEnteredAt.current = Date.now()
    if (!sessionRef.current) return
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'slide_enter', session_id: sessionRef.current, slide_index: slideIdx, slide_label: slides[slideIdx]?.label }),
    })
      .then(r => r.json())
      .then(d => { viewRef.current = d.view_id })
      .catch(() => {})
  }

  const trackSlideLeave = () => {
    if (!viewRef.current || !slideEnteredAt.current) return
    const dur = Math.round((Date.now() - slideEnteredAt.current) / 1000)
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'slide_leave', view_id: viewRef.current, duration_seconds: dur }),
    }).catch(() => {})
    viewRef.current = null
  }

  // Load + auto-play when slide changes (if already playing)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    setAudioPct(0)
    setAudioTime('0:00')
    audio.src = `${BASE}/audio/slide-${slide}.mp3`
    audio.muted = muted
    if (playing) {
      audio.load()
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.load()
    }
    // Load timestamps JSON
    fetch(`${BASE}/audio/slide-${slide}.json`)
      .then(r => r.json())
      .then(d => setSlideSegments(d.segments || []))
      .catch(() => setSlideSegments([]))
    setActiveElem(-1)
  }, [slide])

  const handleTimeUpdate = () => {
    const a = audioRef.current
    if (!a || !a.duration) return
    setAudioPct(a.currentTime / a.duration)
    const s = Math.floor(a.currentTime)
    setAudioTime(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`)
    // Find active element from segments
    if (slideSegments.length > 0) {
      let active = 0
      for (let i = 0; i < slideSegments.length; i++) {
        if (a.currentTime >= slideSegments[i].time) active = slideSegments[i].elem
      }
      setActiveElem(active)
    }
  }

  const handleSeek = (e) => {
    const bar = seekBarRef.current
    const audio = audioRef.current
    if (!bar || !audio || !audio.duration) return
    const rect = bar.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = pct * audio.duration
    setAudioPct(pct)
  }

  // Sync mute
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      if (!audio.src || audio.src === window.location.href) {
        audio.src = `${BASE}/audio/slide-${slide}.mp3`
        audio.load()
      }
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  const slideScale = isMobile ? Math.min(vw / DESIGN_W, 1) : 1

  const goTo = (idx) => {
    trackSlideLeave()
    setSlide(idx)
    trackSlideEnter(idx)
  }
  const prev = () => goTo(Math.max(0, slide - 1))
  const next = () => goTo(Math.min(slides.length - 1, slide + 1))

  // Track first slide on mount (once session is ready — poll briefly)
  useEffect(() => {
    const t = setTimeout(() => trackSlideEnter(0), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--black)' }}>
      <audio ref={audioRef} onEnded={() => {
        setPlaying(false); setAudioPct(0); setAudioTime('0:00'); setActiveElem(-1)
        if (guideMode && slide < slides.length - 1) {
          const nextSlide = slide + 1
          goTo(nextSlide)
          setTimeout(() => {
            const audio = audioRef.current
            if (audio) {
              audio.play().then(() => setPlaying(true)).catch(() => {})
            }
          }, 150)
        } else if (guideMode && slide === slides.length - 1) {
          setGuideMode(false)
        }
      }} onTimeUpdate={handleTimeUpdate} />

      {/* ── NAVBAR ─────────────────────────────────── */}
      <nav style={{
        height: isMobile ? 48 : 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 14px' : '0 24px',
        background: 'rgba(10,10,10,.96)',
        borderBottom: '1px solid rgba(254,215,0,.12)', flexShrink: 0,
        backdropFilter: 'blur(12px)', zIndex: 100,
      }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <div style={{ ...MONO, fontSize: isMobile ? 12 : 15, letterSpacing: 2, color: 'var(--yellow)' }}>
            LOLLY <span style={{ color: 'var(--white)' }}>× PRIME</span>
          </div>
          {!isMobile && (
            <>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.1)' }} />
              <div style={{ ...LATO, fontSize: 11, color: 'var(--muted)', letterSpacing: 1 }}>Présentation 2026</div>
            </>
          )}
        </div>

        {/* Center */}
        <div style={{ display: 'flex', gap: 2, background: 'rgba(255,255,255,.05)', borderRadius: 4, padding: 3 }}>
          {[
            { id: 'synthese', label: 'SYNTHÈSE', Icon: LayoutGrid },
            { id: 'detail',   label: 'DÉTAILLÉ',  Icon: AlignLeft  },
          ].map(({ id, label, Icon }) => {
            const active = mode === id
            return (
              <button key={id} onClick={() => setMode(id)}
                className={`tab-btn${active ? ' active' : ''}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: isMobile ? '5px 10px' : '5px 13px',
                  background: active ? 'var(--yellow)' : 'transparent',
                  color: active ? 'var(--black)' : 'var(--muted)',
                  borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: 'none',
                  cursor: 'pointer', borderRadius: 3,
                  ...MONO, fontSize: isMobile ? 9 : 10, letterSpacing: 1,
                }}>
                <Icon size={11} />
                {!isMobile && label}
              </button>
            )
          })}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, flex: 1 }}>

          {/* Audio controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Guide mode */}
            <button onClick={() => {
              const next = !guideMode
              setGuideMode(next)
              if (next && !playing) {
                const audio = audioRef.current
                if (audio) {
                  if (!audio.src || audio.src === window.location.href) {
                    audio.src = `${BASE}/audio/slide-${slide}.mp3`
                    audio.load()
                  }
                  audio.play().then(() => setPlaying(true)).catch(() => {})
                }
              }
            }} title={guideMode ? 'Arrêter le guide' : 'Mode guide — lecture automatique'}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '4px 8px',
                background: guideMode ? 'rgba(254,215,0,.2)' : 'transparent',
                border: `1px solid ${guideMode ? 'rgba(254,215,0,.5)' : 'rgba(255,255,255,.1)'}`,
                borderRadius: 3, cursor: 'pointer', color: guideMode ? 'var(--yellow)' : 'var(--muted)',
                ...MONO, fontSize: 9, letterSpacing: 1,
              }}>
              {guideMode ? '● GUIDE' : 'GUIDE'}
            </button>
            {/* Play/Pause */}
            <button onClick={togglePlay} title={playing ? 'Pause' : 'Lancer la narration'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28,
                background: playing ? 'var(--yellow)' : 'rgba(254,215,0,.1)',
                border: `1px solid ${playing ? 'var(--yellow)' : 'rgba(254,215,0,.25)'}`,
                borderRadius: '50%', cursor: 'pointer',
                color: playing ? 'var(--black)' : 'var(--yellow)', flexShrink: 0,
              }}>
              {playing ? <Pause size={11} /> : <Play size={11} />}
            </button>

            {/* Seek bar + time */}
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  ref={seekBarRef}
                  onClick={handleSeek}
                  title="Cliquer pour naviguer"
                  style={{
                    width: 100, height: 3, borderRadius: 2,
                    background: 'rgba(255,255,255,.12)',
                    cursor: 'pointer', position: 'relative', flexShrink: 0,
                  }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '100%',
                    width: `${audioPct * 100}%`,
                    background: 'var(--yellow)',
                    borderRadius: 2,
                    transition: playing ? 'none' : 'width .2s',
                  }} />
                  {/* Thumb */}
                  <div style={{
                    position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)',
                    left: `${audioPct * 100}%`,
                    width: 8, height: 8, borderRadius: '50%',
                    background: 'var(--yellow)',
                    boxShadow: '0 0 4px rgba(254,215,0,.8)',
                    opacity: audioPct > 0 ? 1 : 0,
                    transition: playing ? 'none' : 'left .2s',
                  }} />
                </div>
                <div style={{ ...MONO, fontSize: 9, color: 'var(--muted)', letterSpacing: 0, minWidth: 26 }}>
                  {audioTime}
                </div>
              </div>
            )}

            {/* Mute */}
            <button onClick={() => setMuted(m => !m)} title={muted ? 'Activer le son' : 'Couper le son'}
              style={{
                display: 'flex', alignItems: 'center',
                padding: '4px 5px', background: 'transparent',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 3, cursor: 'pointer',
                color: muted ? 'var(--muted)' : 'rgba(255,255,255,.5)',
              }}>
              {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
            </button>
          </div>

          <a
            href={`${BASE}/docs/notes-reunion.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            title="Notes de réunion — 02/04/2026"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: isMobile ? '4px 8px' : '4px 10px',
              background: 'rgba(254,215,0,.08)',
              border: '1px solid rgba(254,215,0,.2)',
              borderRadius: 3, cursor: 'pointer', textDecoration: 'none',
              color: 'var(--yellow)',
              ...MONO, fontSize: isMobile ? 8 : 9, letterSpacing: 1,
              transition: 'background .2s',
            }}
          >
            <FileText size={11} />
            {!isMobile && 'NOTES RÉU.'}
          </a>
          {/* Fullscreen */}
          {!isMobile && (
            <button onClick={toggleFullscreen} title={fullscreen ? 'Quitter le plein écran' : 'Plein écran'}
              style={{
                display: 'flex', alignItems: 'center',
                padding: '4px 5px', background: 'transparent',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 3, cursor: 'pointer',
                color: fullscreen ? 'var(--yellow)' : 'rgba(255,255,255,.4)',
              }}>
              {fullscreen ? <Minimize size={11} /> : <Maximize size={11} />}
            </button>
          )}

          <div style={{ ...MONO, fontSize: 11, color: 'var(--muted)', letterSpacing: 1 }}>
            <span style={{ color: 'var(--yellow)' }}>{slide + 1}</span>/{slides.length}
          </div>
        </div>
      </nav>

      {/* ── PROGRESS BAR ─────────────────────────── */}
      <div style={{ height: 2, background: 'rgba(254,215,0,.12)', flexShrink: 0 }}>
        <div style={{
          height: '100%',
          width: `${((slide + 1) / slides.length) * 100}%`,
          background: 'linear-gradient(90deg, var(--yellow), #fff8a0)',
          transition: 'width .3s ease',
          boxShadow: '0 0 8px rgba(254,215,0,.6)',
        }} />
      </div>

      {/* ── CONTENT ──────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>

        {/* Sidebar — desktop only */}
        {!isMobile && (
          <div style={{
            width: 196, background: 'var(--dark)',
            borderRight: '1px solid rgba(255,255,255,.05)',
            overflowY: 'auto', flexShrink: 0,
          }}>
            {slides.map((s, i) => (
              <button key={s.id} onClick={() => goTo(i)}
                className={`sidebar-btn${slide === i ? ' active' : ''}`}
                style={{
                  width: '100%', padding: '11px 16px', textAlign: 'left',
                  background: slide === i ? 'rgba(254,215,0,.08)' : 'transparent',
                  borderTop: 'none', borderRight: 'none',
                  borderLeft: `3px solid ${slide === i ? 'var(--yellow)' : 'transparent'}`,
                  borderBottom: '1px solid rgba(255,255,255,.03)',
                  cursor: 'pointer',
                }}>
                <div style={{
                  ...MONO, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase',
                  color: slide === i ? 'var(--yellow)' : 'var(--muted)', marginBottom: 3,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ ...LATO, fontSize: 11, color: slide === i ? 'var(--white)' : 'var(--muted)' }}>
                  {s.label}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Slide + bottom nav */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <SlideViewer slide={slides[slide]} mode={mode} allSlides={slides} isMobile={isMobile} slideScale={slideScale} activeElem={activeElem} />
          </div>

          {/* Bottom nav bar */}
          <div style={{
            height: isMobile ? 56 : 52,
            display: 'flex', alignItems: 'center',
            justifyContent: isMobile ? 'space-between' : 'center',
            padding: isMobile ? '0 14px' : '0',
            gap: isMobile ? 0 : 16,
            background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,.05)', flexShrink: 0,
          }}>
            <button onClick={prev} disabled={slide === 0}
              className="nav-btn"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: isMobile ? '10px 16px' : '7px 18px',
                border: '1px solid rgba(255,255,255,.1)',
                background: slide === 0 ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.06)',
                color: slide === 0 ? 'var(--muted)' : 'var(--white)',
                cursor: slide === 0 ? 'not-allowed' : 'pointer', borderRadius: 2,
                ...MONO, fontSize: 10, letterSpacing: 1,
              }}>
              <ChevronLeft size={14} />
              {!isMobile && 'PRÉCÉDENT'}
            </button>

            {isMobile ? (
              /* Mobile: slide label + mini dots */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ ...LATO, fontSize: 11, color: 'var(--white)', maxWidth: 160, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {slides[slide].label}
                </div>
                <div style={{ display: 'flex', gap: 3 }}>
                  {slides.map((_, i) => (
                    <div key={i} onClick={() => goTo(i)}
                      className="dot-btn"
                      style={{
                        width: i === slide ? 12 : 4, height: 4, borderRadius: 2,
                        background: i === slide ? 'var(--yellow)' : 'rgba(255,255,255,.2)',
                        boxShadow: i === slide ? '0 0 6px rgba(254,215,0,.5)' : 'none',
                        cursor: 'pointer',
                      }} />
                  ))}
                </div>
              </div>
            ) : (
              /* Desktop: full dots */
              <div style={{ display: 'flex', gap: 6 }}>
                {slides.map((_, i) => (
                  <div key={i} onClick={() => goTo(i)}
                    className="dot-btn"
                    style={{
                      width: i === slide ? 18 : 6, height: 6, borderRadius: 3,
                      background: i === slide ? 'var(--yellow)' : 'rgba(255,255,255,.15)',
                      boxShadow: i === slide ? '0 0 8px rgba(254,215,0,.5)' : 'none',
                      cursor: 'pointer',
                    }} />
                ))}
              </div>
            )}

            <button onClick={next} disabled={slide === slides.length - 1}
              className="nav-btn"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: isMobile ? '10px 16px' : '7px 18px',
                border: '1px solid rgba(255,255,255,.1)',
                background: slide === slides.length - 1 ? 'rgba(255,255,255,.03)' : 'rgba(254,215,0,.1)',
                color: slide === slides.length - 1 ? 'var(--muted)' : 'var(--yellow)',
                cursor: slide === slides.length - 1 ? 'not-allowed' : 'pointer', borderRadius: 2,
                ...MONO, fontSize: 10, letterSpacing: 1,
              }}>
              {!isMobile && 'SUIVANT'}
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
