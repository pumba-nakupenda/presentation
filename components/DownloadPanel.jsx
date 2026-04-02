'use client'

import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Download, FileText, Presentation, Smartphone, Eye } from 'lucide-react'
import PrimePDF from './PrimePDF'

const Y = 'var(--yellow)'
const MONO = { fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', fontWeight: 900 }
const LATO = { fontFamily: 'var(--font-lato, Lato, sans-serif)' }

const DocCard = ({ icon: Icon, tag, title, desc, action }) => (
  <div style={{
    background: 'var(--gray)', padding: '26px 22px',
    borderLeft: '3px solid rgba(254,215,0,.18)',
    display: 'flex', flexDirection: 'column', gap: 14, transition: 'border-left-color .3s',
  }}
    onMouseEnter={e => e.currentTarget.style.borderLeftColor = Y}
    onMouseLeave={e => e.currentTarget.style.borderLeftColor = 'rgba(254,215,0,.18)'}
  >
    <div style={{ display: 'flex', gap: 14 }}>
      <div style={{ width: 44, height: 44, background: 'rgba(254,215,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, flexShrink: 0 }}>
        <Icon size={20} color={Y} strokeWidth={1.8} />
      </div>
      <div>
        <div style={{ fontSize: 8, color: Y, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>{tag}</div>
        <div style={{ ...MONO, fontSize: 15, color: 'var(--white)', marginBottom: 5 }}>{title}</div>
        <div style={{ ...LATO, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
    {action}
  </div>
)

const Btn = ({ href, filename, children, outline }) => (
  <a href={href} download={filename} target={filename ? undefined : '_blank'} rel="noopener" style={{
    display: 'inline-flex', alignItems: 'center', gap: 7,
    padding: '9px 18px', borderRadius: 2, textDecoration: 'none',
    border: outline ? '1px solid rgba(254,215,0,.3)' : 'none',
    background: outline ? 'transparent' : Y,
    color: outline ? Y : 'var(--black)',
    ...MONO, fontSize: 10, letterSpacing: 1, cursor: 'pointer', transition: 'opacity .2s',
  }}
    onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
  >
    {children}
  </a>
)

export default function DownloadPanel() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '40px 52px' }}>

      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: Y, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ display: 'inline-block', width: 32, height: 1, background: Y }} />
          Téléchargements
        </div>
        <h1 style={{ ...MONO, fontSize: 30, color: 'var(--white)', lineHeight: 1.1, marginBottom: 8 }}>
          Tous vos documents<br /><span style={{ color: Y }}>en un clic.</span>
        </h1>
        <p style={{ ...LATO, fontSize: 13, color: 'var(--muted)', maxWidth: 500, lineHeight: 1.7 }}>
          Le PDF est généré dans le navigateur via <code style={{ color: Y }}>@react-pdf/renderer</code> — zéro serveur, zéro dépendance externe.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 860 }}>

        {/* ── PDF react-pdf (généré dans le navigateur) ── */}
        <DocCard
          icon={FileText}
          tag="Généré par @react-pdf/renderer · Next.js"
          title="Dossier PDF complet"
          desc="10 pages design LOLLY — couverture noire, sidebar jaune, tous les tableaux, KPIs et plans. Généré en direct dans le navigateur, aucun serveur requis."
          action={
            <PDFDownloadLink document={<PrimePDF />} fileName="LOLLY_PRESENTATION_PRIME_2026_react.pdf">
              {({ loading, error }) => (
                <button disabled={loading} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '9px 18px', borderRadius: 2,
                  background: loading ? 'rgba(254,215,0,.35)' : Y,
                  color: 'var(--black)', border: 'none',
                  cursor: loading ? 'wait' : 'pointer',
                  ...MONO, fontSize: 10, letterSpacing: 1, transition: 'opacity .2s',
                }}>
                  {loading ? (
                    <>
                      <span style={{ width: 12, height: 12, border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                      Génération...
                    </>
                  ) : error ? '⚠ Erreur — réessayer' : (
                    <><Download size={12} /> Télécharger le PDF</>
                  )}
                </button>
              )}
            </PDFDownloadLink>
          }
        />

        {/* ── Présentation HTML ── */}
        <DocCard
          icon={Presentation}
          tag="Présentation interactive · 12 slides"
          title="Slides HTML (scroll-snap)"
          desc="Animations reveal, particles, cursor custom, funnel interactif, counter animé. Idéal pour présenter sur écran ou projecteur en plein écran."
          action={
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn href="/PRESENTATION_LOLLY_PRIME_2026.html" filename="PRESENTATION_LOLLY_PRIME_2026.html">
                <Download size={12} /> Télécharger HTML
              </Btn>
              <Btn href="/PRESENTATION_LOLLY_PRIME_2026.html" outline>
                <Eye size={12} /> Ouvrir
              </Btn>
            </div>
          }
        />

        {/* ── Guide mobile ── */}
        <DocCard
          icon={Smartphone}
          tag="Guide pour téléphone · Scripts complets"
          title="Guide de présentation"
          desc="Speeches mot à mot, marqueurs de silence (2s / 3s / 4s), réponses aux objections, question de closing. Idéal sur téléphone pendant la présentation."
          action={
            <Btn href="/GUIDE_PRESENTATION_PRIME_2026.html" filename="GUIDE_PRESENTATION_PRIME_2026.html">
              <Download size={12} /> Télécharger le guide
            </Btn>
          }
        />

        {/* ── PDF statique ── */}
        <DocCard
          icon={FileText}
          tag="PDF statique · Reportlab"
          title="Dossier PDF pré-généré"
          desc="Version PDF générée côté serveur — disponible instantanément, même contenu que la version react-pdf, identique en termes de design LOLLY."
          action={
            <Btn href="/LOLLY_PRESENTATION_PRIME_2026.pdf" filename="LOLLY_PRESENTATION_PRIME_2026.pdf">
              <Download size={12} /> Télécharger PDF
            </Btn>
          }
        />
      </div>

      {/* Stack technique */}
      <div style={{ marginTop: 36, padding: '18px 22px', background: 'var(--dark)', borderLeft: '3px solid rgba(254,215,0,.15)', maxWidth: 860 }}>
        <div style={{ fontSize: 8, color: Y, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Stack technique</div>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[
            ['Framework', 'Next.js 14 · App Router'],
            ['PDF navigateur', '@react-pdf/renderer'],
            ['Icônes', 'Lucide React'],
            ['Polices', 'Next/Font · Montserrat + Lato'],
            ['Export', 'Static (next export)'],
            ['Deploy', 'Vercel / GitHub Pages'],
          ].map(([l, v]) => (
            <div key={l}>
              <div style={{ ...LATO, fontSize: 9, color: 'var(--muted)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>{l}</div>
              <div style={{ ...MONO, fontSize: 11, color: 'var(--white)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
