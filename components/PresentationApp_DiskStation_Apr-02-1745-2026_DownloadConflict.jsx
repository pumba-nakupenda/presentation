'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, LayoutGrid, AlignLeft } from 'lucide-react'
import { slides } from '@/data/slides'
import SlideViewer from './SlideViewer'

const MONO = { fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontWeight: 900 }
const LATO = { fontFamily: 'var(--font-lato, Lato, sans-serif)' }

export default function PresentationApp() {
  const [slide, setSlide] = useState(0)
  const [mode, setMode]   = useState('synthese') // 'synthese' | 'detail'

  const prev = () => setSlide(s => Math.max(0, s - 1))
  const next = () => setSlide(s => Math.min(slides.length - 1, s + 1))

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--black)' }}>

      {/* ── NAVBAR ─────────────────────────────────── */}
      <nav style={{
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', background: 'rgba(10,10,10,.96)',
        borderBottom: '1px solid rgba(254,215,0,.12)', flexShrink: 0,
        backdropFilter: 'blur(12px)', zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ ...MONO, fontSize: 15, letterSpacing: 2, color: 'var(--yellow)' }}>
            LOLLY <span style={{ color: 'var(--white)' }}>× PRIME</span>
          </div>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.1)' }} />
          <div style={{ ...LATO, fontSize: 11, color: 'var(--muted)', letterSpacing: 1 }}>Présentation 2026</div>
        </div>

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
                  display: 'flex', alignItems: 'center', gap: 7, padding: '5px 13px',
                  background: active ? 'var(--yellow)' : 'transparent',
                  color: active ? 'var(--black)' : 'var(--muted)',
                  borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderBottom: 'none',
                  cursor: 'pointer', borderRadius: 3,
                  ...MONO, fontSize: 10, letterSpacing: 1,
                }}>
                <Icon size={12} />
                {label}
              </button>
            )
          })}
        </div>

        <div style={{ ...MONO, fontSize: 11, color: 'var(--muted)', letterSpacing: 1 }}>
          <span style={{ color: 'var(--yellow)' }}>{slide + 1}</span> / {slides.length}
        </div>
      </nav>

      {/* ── PROGRESS BAR ─────────────────────────── */}
      {(
        <div style={{ height: 2, background: 'rgba(254,215,0,.12)', flexShrink: 0 }}>
          <div style={{
            height: '100%',
            width: `${((slide + 1) / slides.length) * 100}%`,
            background: 'linear-gradient(90deg, var(--yellow), #fff8a0)',
            transition: 'width .3s ease',
            boxShadow: '0 0 8px rgba(254,215,0,.6)',
          }} />
        </div>
      )}

      {/* ── CONTENT ──────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        <>
            {/* Sidebar nav */}
            <div style={{
              width: 196, background: 'var(--dark)',
              borderRight: '1px solid rgba(255,255,255,.05)',
              overflowY: 'auto', flexShrink: 0,
            }}>
              {slides.map((s, i) => (
                <button key={s.id} onClick={() => setSlide(i)}
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

            {/* Slide + bottom nav */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <SlideViewer slide={slides[slide]} detailed={detailed} />
              </div>

              {/* Bottom nav bar */}
              <div style={{
                height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
                background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,.05)', flexShrink: 0,
              }}>
                <button onClick={prev} disabled={slide === 0}
                  className="nav-btn"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '7px 18px',
                    border: '1px solid rgba(255,255,255,.1)',
                    background: slide === 0 ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.06)',
                    color: slide === 0 ? 'var(--muted)' : 'var(--white)',
                    cursor: slide === 0 ? 'not-allowed' : 'pointer', borderRadius: 2,
                    ...MONO, fontSize: 10, letterSpacing: 1,
                  }}>
                  <ChevronLeft size={14} /> PRÉCÉDENT
                </button>

                <div style={{ display: 'flex', gap: 6 }}>
                  {slides.map((_, i) => (
                    <div key={i} onClick={() => setSlide(i)}
                      className="dot-btn"
                      style={{
                        width: i === slide ? 18 : 6, height: 6, borderRadius: 3,
                        background: i === slide ? 'var(--yellow)' : 'rgba(255,255,255,.15)',
                        boxShadow: i === slide ? '0 0 8px rgba(254,215,0,.5)' : 'none',
                      }} />
                  ))}
                </div>

                <button onClick={next} disabled={slide === slides.length - 1}
                  className="nav-btn"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '7px 18px',
                    border: '1px solid rgba(255,255,255,.1)',
                    background: slide === slides.length - 1 ? 'rgba(255,255,255,.03)' : 'rgba(254,215,0,.1)',
                    color: slide === slides.length - 1 ? 'var(--muted)' : 'var(--yellow)',
                    cursor: slide === slides.length - 1 ? 'not-allowed' : 'pointer', borderRadius: 2,
                    ...MONO, fontSize: 10, letterSpacing: 1,
                  }}>
                  SUIVANT <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <DownloadPanel />
        )}
      </div>
    </div>
  )
}
