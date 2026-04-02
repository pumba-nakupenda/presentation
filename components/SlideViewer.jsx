'use client'

import { Camera, BarChart2, GraduationCap, Store, LayoutGrid, MapPin, Trophy,
  ImageOff, WifiOff, EyeOff, TrendingUp, Megaphone, Star, Search,
  Lightbulb, Package, Repeat, Video, Send, BarChart, Globe, ClipboardList,
  Presentation, Rocket, Play, Zap, ArrowRight,
  Target, Shield, Eye, Link2, Layers, DollarSign, FileText, Percent,
  Download, Printer } from 'lucide-react'

const Y = 'var(--yellow)'
const W = 'var(--white)'
const T = 'var(--text)'
const M = 'var(--muted)'
const G = 'var(--gray)'
const L = 'var(--lgray)'
const D = 'var(--dark)'
const B = 'var(--black)'

const HL = (i, active) => active === i ? {
  outline: '2px solid rgba(254,215,0,0.45)',
  borderRadius: 4,
  boxShadow: '0 0 20px rgba(254,215,0,0.1)',
  transition: 'outline 0.35s, box-shadow 0.35s',
} : {
  outline: '2px solid transparent',
  borderRadius: 4,
  transition: 'outline 0.35s, box-shadow 0.35s',
}

const ICONS = { Camera, BarChart2, GraduationCap, Store, LayoutGrid, MapPin, Trophy,
  ImageOff, WifiOff, EyeOff, TrendingUp, Megaphone, Star, Search, Lightbulb, Package, Repeat,
  Video, Send, BarChart, Globe, ClipboardList, Presentation, Rocket, Play, Zap }

// Icônes par type de slide (3 par slide = une par section)
const DETAIL_ICONS = {
  cover:      [Target,    LayoutGrid,  Shield],
  lolly:      [Camera,    Zap,         Star],
  context:    [Store,     Trophy,      TrendingUp],
  truth:      [Search,    TrendingUp,  Lightbulb],
  silence:    [Eye,       EyeOff,      Megaphone],
  axes:       [Megaphone, Star,        Link2],
  programme:  [Layers,    Percent,     BarChart],
  retainer:   [Package,   Send,        TrendingUp],
  modeop:     [Search,    Camera,      ClipboardList],
  projection: [BarChart2, DollarSign,  Link2],
  nextsteps:  [Search,    FileText,    Rocket],
  closing:    [Target,    Shield,      ArrowRight],
}

// ─── PRINT / PDF ──────────────────────────────────────────────────────────────
function buildPrintHTML(slides) {
  const pages = slides.map(slide => {
    const d = slide.detail
    if (!d) return ''
    return `
      <div class="page">
        <div class="doc-header">
          <div class="doc-meta">LOLLY × PRIME STORE · Présentation 2026</div>
          <h1>${slide.label}</h1>
          ${slide.tag ? `<div class="doc-tag">${slide.tag}</div>` : ''}
        </div>
        <div class="intro">${d.intro}</div>
        ${d.sections.map((s, i) => `
          <div class="section">
            <h2><span class="h2-line"></span>${s.title}</h2>
            <p>${s.body}</p>
          </div>
          ${i < d.sections.length - 1 ? '<hr>' : ''}
        `).join('')}
        <div class="callout"><p>${d.callout}</p></div>
        <div class="doc-footer">
          <span>LOLLY Communication · Dakar, Sénégal</span>
          <span>oudama@lolly.sn · Avril 2026</span>
        </div>
      </div>`
  }).join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <title>LOLLY × PRIME Store — Présentation Détaillée 2026</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;color:#1a1a1a}
    .page{padding:56px 64px;max-width:800px;margin:0 auto;page-break-after:always}
    .page:last-child{page-break-after:avoid}
    .doc-meta{font-size:8px;letter-spacing:4px;text-transform:uppercase;font-weight:900;
      background:#1a1a1a;color:#FED700;display:inline-block;padding:3px 8px;margin-bottom:14px}
    h1{font-size:30px;font-weight:900;color:#1a1a1a;line-height:1.15;margin-bottom:6px}
    .doc-tag{font-size:11px;color:#888;letter-spacing:1px;margin-bottom:0}
    .doc-header{border-bottom:2px solid #FED700;padding-bottom:22px;margin-bottom:28px}
    .intro{border-left:3px solid #FED700;padding:14px 18px;background:#fffef0;
      margin-bottom:32px;font-size:13.5px;line-height:1.9;font-style:italic;color:#333}
    .section{margin-bottom:24px}
    h2{font-size:11px;font-weight:900;letter-spacing:2px;text-transform:uppercase;
      color:#1a1a1a;margin-bottom:10px;display:flex;align-items:center;gap:8px}
    .h2-line{display:inline-block;width:18px;height:2px;background:#FED700;flex-shrink:0}
    .section p{font-size:13px;line-height:1.9;color:#444}
    hr{border:none;border-top:1px solid #eee;margin:24px 0}
    .callout{padding:14px 18px;background:#1a1a1a;border-left:3px solid #FED700;margin-top:6px}
    .callout p{font-size:12px;font-weight:900;color:#FED700;line-height:1.7}
    .doc-footer{margin-top:32px;padding-top:14px;border-top:1px solid #eee;
      display:flex;justify-content:space-between;font-size:9px;color:#aaa;letter-spacing:1px}
    @media print{@page{margin:0}.page{padding:40px 48px}}
  </style></head><body>${pages}</body></html>`
}

function openPrint(html) {
  const iframe = document.createElement('iframe')
  iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;border:none;'
  document.body.appendChild(iframe)
  iframe.contentDocument.write(html)
  iframe.contentDocument.close()
  const prev = document.title
  document.title = 'LOLLY × PRIME Store — Présentation 2026'
  setTimeout(() => {
    iframe.contentWindow.focus()
    iframe.contentWindow.print()
    setTimeout(() => { document.body.removeChild(iframe); document.title = prev }, 2000)
  }, 400)
}

function downloadPDF(slide) {
  openPrint(buildPrintHTML([slide]))
}

function downloadFullPDF(allSlides) {
  if (!allSlides) return
  openPrint(buildPrintHTML(allSlides.filter(s => s.detail)))
}

const mono = { fontFamily: 'Montserrat', fontWeight: 900 }
const lato = { fontFamily: 'Lato' }

const Tag = ({ children }) => (
  <div style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: Y, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
    <span style={{ display: 'inline-block', width: 36, height: 1, background: Y }} />
    {children}
  </div>
)

const Title = ({ children, size = 32 }) => (
  <h2 style={{ ...mono, fontSize: size, color: W, lineHeight: 1.1, marginBottom: 8 }}
    dangerouslySetInnerHTML={{ __html: children.replace(/(<em>.*?<\/em>)/g, m => m) }} />
)

const IBox = ({ children }) => (
  <div style={{ padding: '14px 18px', background: G, borderLeft: `3px solid ${Y}`, marginTop: 16 }}>
    <p style={{ ...lato, fontSize: 13, color: T, lineHeight: 1.7 }}>{children}</p>
  </div>
)

const BlackBox = ({ title, body }) => (
  <div style={{ padding: '14px 18px', background: '#0D0D00', borderLeft: `3px solid ${Y}`, marginTop: 12 }}>
    <div style={{ ...mono, fontSize: 10, color: Y, letterSpacing: 1, marginBottom: 6 }}>{title}</div>
    <p style={{ ...lato, fontSize: 12.5, color: T, lineHeight: 1.7 }}>{body}</p>
  </div>
)

const StatCard = ({ num, lbl, accent }) => (
  <div className={`card${accent ? ' card-accent' : ''}`} style={{
    background: G, padding: '20px 16px',
    borderLeft: `3px solid ${accent ? Y : 'rgba(254,215,0,.15)'}`,
    flex: 1,
  }}>
    <div style={{ ...mono, fontSize: 28, color: accent ? Y : W, lineHeight: 1, marginBottom: 6 }}>{num}</div>
    <div style={{ ...lato, fontSize: 11, color: M, lineHeight: 1.4 }}>{lbl}</div>
  </div>
)

const slideWrap = (mob) => ({
  flex: 1, overflow: 'auto',
  padding: mob ? '24px 18px' : '40px 56px',
  background: 'var(--black)',
})

// ─── SLIDES ──────────────────────────────────────────────────────────────────

function SlideCover({ isMobile, activeElem = -1 }) {
  return (
    <div style={{
      ...slideWrap(isMobile), display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(254,215,0,.04), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: Y, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, ...HL(0, activeElem) }}>
        <span style={{ width: 40, height: 1, background: Y, display: 'inline-block' }} />
        Programme 2026 · Valeur totale générée · 12 mois
      </div>
      <div style={HL(1, activeElem)}>
        <h1 style={{ ...mono, fontSize: isMobile ? 44 : 64, color: W, lineHeight: 1, marginBottom: 20 }}>
          <span style={{ color: Y }}>LOLLY</span><br />
          <span style={{ fontSize: isMobile ? 28 : 40, color: M, fontWeight: 300 }}>×</span><br />
          PRIME STORE
        </h1>
      </div>
      <div style={HL(2, activeElem)}>
        <p style={{ ...lato, fontSize: 16, fontWeight: 300, color: M, maxWidth: 480, lineHeight: 1.7, marginBottom: 40 }}>
          Programme de Visibilité Marchands<br />
          Partenariat Stratégique 2026
        </p>
      </div>
      <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', ...HL(3, activeElem) }}>
        {[['Préparé pour', 'Fatou Niane, PRIME Store'], ['Contact', 'Amadou Mbaye Gueye'], ['Email', 'oudama@lolly.sn'], ['Date', 'Avril 2026']].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: M, marginBottom: 4 }}>{l}</div>
            <div style={{ ...mono, fontSize: 13, color: W }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ ...mono, position: 'absolute', right: '4%', top: '50%', transform: 'translateY(-50%)', fontSize: 180, color: 'rgba(254,215,0,.025)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>PRIME</div>
    </div>
  )
}

function SlideLolly({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile) }}>
      <div style={HL(0, activeElem)}>
        <Tag>{data.tag}</Tag>
        <h2 style={{ ...mono, fontSize: 28, color: W, marginBottom: 6, lineHeight: 1.15 }}>
          L'agence qui transforme les vitrines<br />en <span style={{ color: Y }}>leviers de croissance.</span>
        </h2>
        <p style={{ ...lato, fontSize: 13, color: M, marginBottom: 20 }}>5 ans d'expérience · 60+ clients · Dakar, Sénégal</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Expertises */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.expertises.map((ex, idx) => {
            const Icon = ICONS[ex.icon]
            return (
              <div key={ex.badge} style={HL(idx + 1, activeElem)}>
                <div className="card" style={{ background: G, padding: '18px 20px', display: 'flex', gap: 14 }}>
                  <div style={{ width: 38, height: 38, background: 'rgba(254,215,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 2 }}>
                    {Icon && <Icon size={17} color={Y} strokeWidth={1.8} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: Y, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>{ex.badge}</div>
                    <div style={{ ...mono, fontSize: 13, color: W, marginBottom: 6 }}>{ex.title}</div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {ex.items.map(it => (
                        <li key={it} style={{ ...lato, fontSize: 11, color: T, display: 'flex', gap: 7 }}>
                          <span style={{ color: Y, flexShrink: 0 }}>→</span>{it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats + sectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, ...HL(4, activeElem) }}>
            {data.stats.map(s => (
              <div key={s.num} style={{ background: G, padding: '16px', textAlign: 'center' }}>
                <div style={{ ...mono, fontSize: 26, color: Y }}>{s.num}</div>
                <div style={{ ...lato, fontSize: 10, color: M, lineHeight: 1.4 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
          <div style={HL(5, activeElem)}>
            <IBox>
              <strong style={{ color: W }}>Secteurs :</strong> {data.sectors}<br /><br />
              <strong style={{ color: Y }}>Notre différence :</strong> nous construisons des systèmes de communication qui génèrent des résultats mesurables.
            </IBox>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideContext({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile) }}>
      <div style={HL(0, activeElem)}>
        <Tag>{data.tag}</Tag>
        <h2 style={{ ...mono, fontSize: 30, color: W, marginBottom: 6 }}>
          PRIME Store, <span style={{ color: Y }}>un acteur majeur</span><br />du e-commerce sénégalais.
        </h2>
        <p style={{ ...lato, fontSize: 13, color: M, marginBottom: 24, lineHeight: 1.6 }}>{data.desc}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 3, marginBottom: 20 }}>
        {data.stats.map((s, idx) => {
          const Icon = ICONS[s.icon]
          return (
            <div key={s.num} style={{ background: G, padding: '22px 16px', borderLeft: '3px solid transparent', transition: 'all .3s', ...HL(idx + 1, activeElem) }}>
              <div style={{ width: 32, height: 32, background: 'rgba(254,215,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderRadius: 2 }}>
                {Icon && <Icon size={15} color={Y} strokeWidth={2} />}
              </div>
              <div style={{ ...mono, fontSize: 28, color: Y, lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
              <div style={{ ...lato, fontSize: 11, color: M, lineHeight: 1.4 }}>{s.lbl}</div>
            </div>
          )
        })}
      </div>
      <div style={HL(5, activeElem)}>
        <IBox>{data.insight}</IBox>
      </div>
    </div>
  )
}

function SlideTruth({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile) }}>
      <div style={HL(0, activeElem)}>
        <Tag>{data.tag}</Tag>
        <h2 style={{ ...mono, fontSize: 28, color: W, marginBottom: 6, lineHeight: 1.15 }}>
          Ce que révèle un audit de <span style={{ color: Y }}>20 boutiques PRIME Store.</span>
        </h2>
        <p style={{ ...lato, fontSize: 13, color: M, marginBottom: 22, lineHeight: 1.6 }}>{data.desc}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 3, marginBottom: 20 }}>
        {data.stats.map((s, idx) => {
          const Icon = ICONS[s.icon]
          return (
            <div key={s.num} style={{ background: G, padding: '20px 16px', borderLeft: `3px solid ${s.accent ? Y : 'rgba(254,215,0,.12)'}`, ...HL(idx + 1, activeElem) }}>
              <div style={{ width: 32, height: 32, background: 'rgba(254,215,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, borderRadius: 2 }}>
                {Icon && <Icon size={15} color={Y} strokeWidth={2} />}
              </div>
              <div style={{ ...mono, fontSize: 26, color: s.accent ? Y : W, lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
              <div style={{ ...lato, fontSize: 11, color: M, lineHeight: 1.4 }}>{s.lbl}</div>
            </div>
          )
        })}
      </div>
      <div style={HL(5, activeElem)}>
        <BlackBox title="Notre approche" body={data.insight} />
      </div>
    </div>
  )
}

function SlideSilence({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{
      ...slideWrap(isMobile), display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
    }}>
      <div style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: M, marginBottom: 32, ...HL(0, activeElem) }}>{data.sub}</div>
      <div style={HL(1, activeElem)}>
        <span style={{ ...mono, fontSize: isMobile ? 32 : 52, color: W, display: 'block', lineHeight: 1.15, maxWidth: 700 }}>{data.question}</span>
      </div>
      <div style={HL(2, activeElem)}>
        <span style={{ ...mono, fontSize: isMobile ? 32 : 52, color: Y, display: 'block', lineHeight: 1.15, maxWidth: 700 }}>{data.questionAccent}</span>
      </div>
      <div style={{ width: 60, height: 3, background: Y, marginTop: 40, ...HL(3, activeElem) }} />
    </div>
  )
}

function SlideAxes({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile) }}>
      <div style={HL(0, activeElem)}>
        <Tag>{data.tag}</Tag>
        <h2 style={{ ...mono, fontSize: 30, color: W, marginBottom: 6 }}>
          Deux axes,<br /><span style={{ color: Y }}>une vision cohérente.</span>
        </h2>
        <p style={{ ...lato, fontSize: 13, color: M, marginBottom: 22, lineHeight: 1.6 }}>{data.desc}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
        {data.axes.map((axe, idx) => {
          const Icon = ICONS[axe.icon]
          return (
            <div key={axe.badge} style={HL(idx + 1, activeElem)}>
              <div className="card" style={{ background: G, padding: '28px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(254,215,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 2 }}>
                    {Icon && <Icon size={20} color={Y} strokeWidth={1.8} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: Y, letterSpacing: 2, textTransform: 'uppercase', padding: '3px 9px', background: 'rgba(254,215,0,.1)', width: 'fit-content', marginBottom: 5 }}>{axe.badge}</div>
                    <div style={{ ...mono, fontSize: 17, color: W }}>{axe.title}</div>
                  </div>
                </div>
                <div style={{ ...lato, fontSize: 12, color: Y, fontStyle: 'italic', marginBottom: 14, lineHeight: 1.5 }}>{axe.hook}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {axe.items.map(it => (
                    <li key={it} style={{ ...lato, fontSize: 12.5, color: T, display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                      <span style={{ color: Y, flexShrink: 0, marginTop: 2 }}>→</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SlideProgramme({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile) }}>
      <div style={HL(0, activeElem)}>
        <Tag>{data.tag}</Tag>
        <h2 style={{ ...mono, fontSize: 28, color: W, marginBottom: 18 }}>
          Un programme en <span style={{ color: Y }}>5 niveaux.</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr .55fr', gap: 20 }}>
        <div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {(isMobile ? ['Niveau', 'Service', 'Via PRIME', 'Comm.'] : ['Niveau', 'Service', 'Marché', 'Via PRIME', 'Comm.']).map(h => (
                    <th key={h} style={{ background: Y, color: B, ...mono, fontSize: isMobile ? 8 : 9, letterSpacing: 1, textTransform: 'uppercase', padding: isMobile ? '7px 8px' : '9px 12px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, i) => (
                  <tr key={i} style={HL(i + 1, activeElem)}>
                    <td style={{ padding: isMobile ? '8px 8px' : '10px 12px', background: i % 2 === 0 ? G : D, ...mono, fontSize: isMobile ? 9 : 11, color: Y, borderBottom: '1px solid rgba(255,255,255,.04)' }}>{row.level}</td>
                    <td style={{ padding: isMobile ? '8px 8px' : '10px 12px', background: i % 2 === 0 ? G : D, ...lato, fontSize: isMobile ? 10 : 11, color: T, borderBottom: '1px solid rgba(255,255,255,.04)' }}>{row.service}</td>
                    {!isMobile && <td style={{ padding: '10px 12px', background: i % 2 === 0 ? G : D, ...lato, fontSize: 11, color: M, textDecoration: 'line-through', borderBottom: '1px solid rgba(255,255,255,.04)' }}>{row.marche}</td>}
                    <td style={{ padding: isMobile ? '8px 8px' : '10px 12px', background: i % 2 === 0 ? G : D, ...mono, fontSize: isMobile ? 9 : 11, color: Y, borderBottom: '1px solid rgba(255,255,255,.04)', whiteSpace: 'nowrap' }}>{row.prime}</td>
                    <td style={{ padding: isMobile ? '8px 8px' : '10px 12px', background: i % 2 === 0 ? G : D, ...lato, fontSize: isMobile ? 9 : 11, color: M, borderBottom: '1px solid rgba(255,255,255,.04)' }}>{row.comm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={HL(6, activeElem)}>
            <p style={{ ...lato, fontSize: 11, color: M, marginTop: 10, lineHeight: 1.5 }}>* {data.note}</p>
          </div>
        </div>
        {/* Funnel */}
        <div style={{ background: G, padding: '18px', ...HL(7, activeElem) }}>
          <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: Y, marginBottom: 14 }}>Entonnoir d'engagement</div>
          {data.funnel.map((f, i) => (
            <div key={i} style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ height: 28, background: `rgba(254,215,0,${0.12 + i * 0.14})`, width: `${f.pct}%`, display: 'flex', alignItems: 'center', paddingLeft: 10, transition: 'width .5s ease' }}>
                  <span style={{ ...mono, fontSize: 9, color: i >= 3 ? B : Y }}>{f.label}</span>
                </div>
              </div>
              <div style={{ ...mono, fontSize: 11, color: Y, flexShrink: 0, width: 36, textAlign: 'right' }}>{f.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SlideRetainer({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile) }}>
      <div style={HL(0, activeElem)}>
        <Tag>{data.tag}</Tag>
        <h2 style={{ ...mono, fontSize: 28, color: W, marginBottom: 6 }}>
          Un abonnement contenu pour <span style={{ color: Y }}>faire rayonner PRIME.</span>
        </h2>
        <p style={{ ...lato, fontSize: 13, color: M, marginBottom: 24, lineHeight: 1.6 }}>{data.desc}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 3 }}>
        {data.plans.map((plan, idx) => (
          <div key={plan.name} style={HL(idx + 1, activeElem)}>
            <div className={`card${plan.featured ? ' card-accent' : ''}`} style={{
              background: plan.featured ? Y : G, padding: '26px 22px',
              display: 'flex', flexDirection: 'column', gap: 12,
              position: 'relative', overflow: 'hidden',
            }}>
              <div>
                <div style={{ display: 'inline-block', padding: '3px 10px', background: plan.featured ? 'rgba(0,0,0,.15)' : 'rgba(254,215,0,.1)', color: plan.featured ? B : Y, ...mono, fontSize: 8, letterSpacing: 2, marginBottom: 8 }}>{plan.badge.toUpperCase()}</div>
                <div style={{ ...mono, fontSize: 18, color: plan.featured ? B : W }}>{plan.name}</div>
              </div>
              <div>
                <div style={{ ...mono, fontSize: 26, color: plan.featured ? B : Y, lineHeight: 1 }}>{plan.price}</div>
                <div style={{ ...lato, fontSize: 11, color: plan.featured ? 'rgba(0,0,0,.6)' : M }}>{plan.sub}</div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {plan.items.map(it => (
                  <li key={it} style={{ ...lato, fontSize: 12, color: plan.featured ? B : T, display: 'flex', gap: 8 }}>
                    <span style={{ fontWeight: 700, flexShrink: 0 }}>✓</span>{it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideModeOp({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile) }}>
      <div style={HL(0, activeElem)}>
        <Tag>{data.tag}</Tag>
        <h2 style={{ ...mono, fontSize: 30, color: W, marginBottom: 6 }}>
          Comment ça fonctionne <span style={{ color: Y }}>concrètement ?</span>
        </h2>
        <p style={{ ...lato, fontSize: 13, color: M, marginBottom: 30, lineHeight: 1.6 }}>{data.desc}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 3 }}>
        {data.steps.map((step, idx) => (
          <div key={step.num} style={HL(idx + 1, activeElem)}>
            <div className="card" style={{ background: G, padding: '22px 18px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ ...mono, fontSize: 36, color: L, lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
              <div style={{ ...mono, fontSize: 15, color: W, marginBottom: 10 }}>{step.title}</div>
              <div style={{ ...lato, fontSize: 12, color: T, lineHeight: 1.5, marginBottom: 12 }}>{step.desc}</div>
              <div style={{ ...mono, fontSize: 9, color: Y, letterSpacing: 1 }}>{step.tag}</div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: Y, transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform .4s' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideProjection({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile) }}>
      <div style={HL(0, activeElem)}>
        <Tag>{data.tag}</Tag>
        <h2 style={{ ...mono, fontSize: 30, color: W, marginBottom: 6 }}>
          Ce que ce partenariat <span style={{ color: Y }}>peut générer.</span>
        </h2>
        <p style={{ ...lato, fontSize: 13, color: M, marginBottom: 22, lineHeight: 1.6 }}>{data.desc}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {data.kpis.map((k, idx) => (
            <div key={k.main} style={{ background: G, padding: '22px 20px', borderLeft: `3px solid ${k.accent ? Y : 'rgba(254,215,0,.2)'}`, ...HL(idx + 1, activeElem) }}>
              <div style={{ fontSize: 10, color: M, letterSpacing: 1, marginBottom: 8 }}>{k.sub.includes('valeur') ? 'VALEUR TOTALE DU PROGRAMME — 3 FLUX COMBINÉS' : 'CE QUE PRIME PERÇOIT (COMMISSIONS REVERSÉES)'}</div>
              <div style={{ ...mono, fontSize: k.accent ? 36 : 28, color: Y, lineHeight: 1, marginBottom: 8 }}>{k.main}</div>
              <div style={{ ...lato, fontSize: 12, color: T, lineHeight: 1.6 }}>{k.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background: G, padding: '20px', ...HL(3, activeElem) }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: Y, textTransform: 'uppercase', marginBottom: 18 }}>Répartition des revenus — 3 flux</div>
          {data.bars.map(b => (
            <div key={b.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ ...lato, fontSize: 12, color: T }}>{b.label}</span>
                <span style={{ ...mono, fontSize: 12, color: Y }}>~{b.pct}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,.08)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${b.pct}%`, background: Y, borderRadius: 3, transition: 'width .8s ease' }} />
              </div>
            </div>
          ))}
          <div style={HL(4, activeElem)}>
            <BlackBox title="Alignement des intérêts" body={data.insight} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideNextSteps({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile) }}>
      <div style={HL(0, activeElem)}>
        <Tag>{data.tag}</Tag>
        <h2 style={{ ...mono, fontSize: 30, color: W, marginBottom: 6 }}>
          La route vers <span style={{ color: Y }}>le démarrage.</span>
        </h2>
        <p style={{ ...lato, fontSize: 13, color: M, marginBottom: 22, lineHeight: 1.6 }}>{data.desc}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.steps.map((step, i) => (
          <div key={step.num} style={{ display: 'flex', gap: 0, background: G, ...HL(i + 1, activeElem) }}>
            <div style={{ width: 56, background: i === 0 ? Y : L, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ ...mono, fontSize: 20, color: i === 0 ? B : 'rgba(255,255,255,.2)' }}>{step.num}</span>
            </div>
            <div style={{ padding: '14px 20px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 5, flexWrap: 'wrap' }}>
                <div style={{ ...mono, fontSize: 13, color: W }}>{step.title}</div>
                {step.badge && (
                  <div style={{ padding: '2px 9px', background: Y, color: B, ...mono, fontSize: 8, letterSpacing: 1.5 }}>{step.badge}</div>
                )}
              </div>
              <div style={{ ...lato, fontSize: 12, color: T, lineHeight: 1.6, marginBottom: 6 }}>{step.detail}</div>
              <div style={{ ...mono, fontSize: 9, color: Y, letterSpacing: 1 }}>{step.when}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideClosing({ data, isMobile, activeElem = -1 }) {
  return (
    <div style={{ ...slideWrap(isMobile), display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'flex-start' : 'center' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${Y}, transparent)` }} />
      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: M, marginBottom: 20 }}>LOLLY Communication · Dakar, Sénégal</div>
      <div style={HL(0, activeElem)}>
        <blockquote style={{ ...mono, fontSize: 22, color: W, lineHeight: 1.5, maxWidth: 680, marginBottom: 24, whiteSpace: 'pre-line' }}>
          "{data.quote.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block', color: i === 2 ? Y : W }}>{line}</span>
          ))}"
        </blockquote>
      </div>
      <div style={{ width: 60, height: 3, background: Y, marginBottom: 24 }} />
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 28 }}>
        {[['Contact', 'Amadou Mbaye Gueye'], ['Email', 'oudama@lolly.sn'], ['Prochaine étape', 'Diagnostic gratuit →']].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: M, marginBottom: 4 }}>{l}</div>
            <div style={{ ...mono, fontSize: 13, color: l === 'Prochaine étape' ? Y : W }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 20px', background: G, borderLeft: '3px solid rgba(254,215,0,.3)', maxWidth: 600, marginBottom: 20, ...HL(1, activeElem) }}>
        <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: M, marginBottom: 8 }}>Pour votre direction — en une phrase</div>
        <p style={{ ...lato, fontSize: 13, color: T, lineHeight: 1.7, fontStyle: 'italic' }}>{data.pitch}</p>
      </div>
      <div style={{ padding: '16px 20px', background: 'rgba(254,215,0,.08)', border: '1px solid rgba(254,215,0,.2)', maxWidth: 600, ...HL(2, activeElem) }}>
        <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: Y, marginBottom: 8 }}>Question de closing</div>
        <p style={{ ...mono, fontSize: 14, color: W }}>{data.question}</p>
      </div>
    </div>
  )
}

// ─── DETAIL SLIDE ─────────────────────────────────────────────────────────────
function DetailSlide({ slide, allSlides, isMobile }) {
  const d = slide.detail
  const sectionIcons = DETAIL_ICONS[slide.type] || [Target, FileText, ArrowRight]

  if (!d) return (
    <div style={{ flex: 1, overflow: 'auto', background: B, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ ...lato, color: M, fontSize: 13 }}>Pas de version détaillée pour cette slide.</div>
    </div>
  )

  const hPad = isMobile ? '0 18px' : '0 48px'
  const vPad = isMobile ? '28px 0' : '48px 0'

  return (
    <div style={{ flex: 1, overflow: 'auto', background: B, padding: vPad }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: hPad }}>

        {/* Document header */}
        <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ ...mono, fontSize: 9, letterSpacing: 4, color: Y, textTransform: 'uppercase', marginBottom: 14 }}>
            LOLLY × PRIME STORE · Présentation 2026
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: 16, flexDirection: isMobile ? 'column' : 'row' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ ...mono, fontSize: isMobile ? 24 : 32, color: W, lineHeight: 1.15, marginBottom: 8 }}>
                {slide.label}
              </h1>
              {slide.tag && (
                <div style={{ ...lato, fontSize: 11, color: M, letterSpacing: 1 }}>{slide.tag}</div>
              )}
            </div>
            {/* Download buttons */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: 6, flexShrink: 0 }}>
              <button onClick={() => downloadPDF(slide)} className="nav-btn" style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '7px 13px',
                background: 'rgba(254,215,0,.1)', border: '1px solid rgba(254,215,0,.25)',
                color: Y, cursor: 'pointer', borderRadius: 2, ...mono, fontSize: 9, letterSpacing: 1,
              }}>
                <Printer size={11} /> CETTE PAGE
              </button>
              <button onClick={() => downloadFullPDF(allSlides)} className="nav-btn" style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '7px 13px',
                background: Y, border: 'none',
                color: B, cursor: 'pointer', borderRadius: 2, ...mono, fontSize: 9, letterSpacing: 1,
              }}>
                <Download size={11} /> {isMobile ? 'COMPLET' : 'PRÉSENTATION COMPLÈTE'}
              </button>
            </div>
          </div>
        </div>

        {/* Intro paragraph */}
        <p style={{ ...lato, fontSize: 14, color: T, lineHeight: 2, marginBottom: 36, fontStyle: 'italic', borderLeft: `2px solid rgba(254,215,0,.35)`, paddingLeft: 20 }}>
          {d.intro}
        </p>

        {/* Sections with icons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 36 }}>
          {d.sections.map((s, i) => {
            const Icon = sectionIcons[i] || Target
            return (
              <div key={i}>
                <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  {/* Icon column */}
                  <div style={{ flexShrink: 0, paddingTop: 2 }}>
                    <div style={{
                      width: 40, height: 40, background: 'rgba(254,215,0,.08)',
                      border: '1px solid rgba(254,215,0,.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3,
                    }}>
                      <Icon size={17} color={Y} strokeWidth={1.6} />
                    </div>
                  </div>
                  {/* Text column */}
                  <div style={{ flex: 1 }}>
                    <h2 style={{ ...mono, fontSize: 12, color: W, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
                      {s.title}
                    </h2>
                    <p style={{ ...lato, fontSize: 13.5, color: T, lineHeight: 1.95 }}>
                      {s.body}
                    </p>
                  </div>
                </div>
                {i < d.sections.length - 1 && (
                  <div style={{ margin: '28px 0 28px 58px', height: 1, background: 'rgba(255,255,255,.05)' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Callout */}
        <div style={{ padding: '18px 22px', background: 'rgba(254,215,0,.05)', borderLeft: `3px solid ${Y}` }}>
          <p style={{ ...mono, fontSize: 12.5, color: Y, lineHeight: 1.75 }}>{d.callout}</p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 36, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,.05)', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ ...lato, fontSize: 10, color: 'rgba(255,255,255,.18)', letterSpacing: 1 }}>LOLLY Communication · Dakar, Sénégal</div>
          <div style={{ ...lato, fontSize: 10, color: 'rgba(255,255,255,.18)', letterSpacing: 1 }}>oudama@lolly.sn · Avril 2026</div>
        </div>

      </div>
    </div>
  )
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────
export default function SlideViewer({ slide, mode, allSlides, isMobile, slideScale = 1, activeElem = -1 }) {
  if (!slide) return null
  const props = { data: slide, isMobile, activeElem }

  if (mode === 'detail') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div key={`d-${slide.id}`} className="slide-in" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <DetailSlide slide={slide} allSlides={allSlides} isMobile={isMobile} />
        </div>
      </div>
    )
  }

  let content
  switch (slide.type) {
    case 'cover':      content = <SlideCover isMobile={isMobile} activeElem={activeElem} />; break
    case 'lolly':      content = <SlideLolly {...props} />; break
    case 'context':    content = <SlideContext {...props} />; break
    case 'truth':      content = <SlideTruth {...props} />; break
    case 'silence':    content = <SlideSilence {...props} />; break
    case 'axes':       content = <SlideAxes {...props} />; break
    case 'programme':  content = <SlideProgramme {...props} />; break
    case 'retainer':   content = <SlideRetainer {...props} />; break
    case 'modeop':     content = <SlideModeOp {...props} />; break
    case 'projection': content = <SlideProjection {...props} />; break
    case 'nextsteps':  content = <SlideNextSteps {...props} />; break
    case 'closing':    content = <SlideClosing {...props} />; break
    default:           content = <div style={{ padding: 40, color: M }}>Slide inconnue</div>
  }

  // Mobile: scrollable container, natural reflow
  if (isMobile) {
    return (
      <div style={{ height: '100%', overflowY: 'auto', background: 'var(--black)' }}>
        <div key={slide.id} className="slide-in" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          {content}
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div key={slide.id} className="slide-in" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {content}
      </div>
    </div>
  )
}
