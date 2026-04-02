import Link from 'next/link'

export const metadata = {
  title: '404 — Page introuvable · LOLLY × PRIME',
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>

        {/* Logo */}
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: 15,
          letterSpacing: 3,
          color: '#FED700',
          marginBottom: 48,
        }}>
          <span style={{ color: '#FED700' }}>LOLLY</span>
          {' '}
          <span style={{ color: '#ffffff' }}>× PRIME</span>
        </div>

        {/* 404 number */}
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1,
          color: 'rgba(254,215,0,.08)',
          letterSpacing: -4,
          marginBottom: 24,
          userSelect: 'none',
        }}>
          404
        </div>

        {/* Message */}
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: 13,
          letterSpacing: 3,
          color: '#FED700',
          marginBottom: 12,
        }}>
          PAGE INTROUVABLE
        </div>

        <p style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: 13,
          color: '#555',
          letterSpacing: 0.5,
          lineHeight: 1.6,
          marginBottom: 40,
        }}>
          Cette page n'existe pas ou a été déplacée.
        </p>

        {/* CTA */}
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '11px 22px',
          background: '#FED700',
          color: '#0A0A0A',
          textDecoration: 'none',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: 10,
          letterSpacing: 2,
          borderRadius: 2,
        }}>
          ← RETOUR À LA PRÉSENTATION
        </Link>

        <div style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: 10,
          color: '#333',
          letterSpacing: 1,
          marginTop: 48,
        }}>
          LOLLY Communication · Dakar, Sénégal
        </div>
      </div>
    </div>
  )
}
