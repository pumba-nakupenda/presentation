import Script from 'next/script';
import Logo from './_components/Logo';
import AcademyBodyClass from './_components/AcademyBodyClass';

export const metadata = {
  title: 'LOLLY Academy — 4 chemins pour faire bouger ta com',
  description:
    'LOLLY Academy : 4 offres de formation pour vendre, reprendre la main, piloter et transmettre. Cohorte 1 le 15 juin 2026.',
  openGraph: {
    title: 'LOLLY Academy — Quel est ton défi de communication aujourd’hui ?',
    description:
      '4 chemins pour faire bouger ta com. FONDATIONS, REPRISE EN MAIN, PILOTAGE, POSTURE. Cohorte 1 le 15 juin 2026.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function AcademyLayout({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-lolly-paper, #FAFAF7)',
        color: '#000',
      }}
      className="academy-body"
    >
      <AcademyBodyClass />
      {/* Plausible Analytics — domaine lolly.sn. Charge la définition de window.plausible() côté client. */}
      <Script
        defer
        data-domain="lolly.sn"
        src="https://plausible.io/js/script.tagged-events.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };`}
      </Script>
      <header
        style={{
          background: 'transparent',
          padding: '24px 24px 0',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <Logo />
      </header>
      {children}
    </div>
  );
}
