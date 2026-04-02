import { Montserrat, Lato } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300','400','700','900'], variable: '--font-montserrat' })
const lato = Lato({ subsets: ['latin'], weight: ['300','400','700'], variable: '--font-lato' })

export const metadata = {
  title: 'LOLLY × PRIME STORE — Présentation 2026',
  description: 'Programme de Visibilité Marchands — Partenariat Stratégique 2026',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${lato.variable}`}>
      <body style={{ fontFamily: 'var(--font-lato, Lato, sans-serif)', overflow: 'hidden', height: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
