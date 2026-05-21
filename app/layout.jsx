import { Montserrat, Lato, MuseoModerno } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300','400','700','900'], variable: '--font-montserrat' })
const lato = Lato({ subsets: ['latin'], weight: ['300','400','700'], variable: '--font-lato' })
const museoModerno = MuseoModerno({ subsets: ['latin'], weight: ['900'], style: ['italic'], variable: '--font-museomoderno' })

export const metadata = {
  title: 'LOLLY × PRIME STORE — Présentation 2026',
  description: 'Programme de Visibilité Marchands — Partenariat Stratégique 2026',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${lato.variable} ${museoModerno.variable}`}>
      <body style={{ fontFamily: 'var(--font-lato, Lato, sans-serif)' }}>
        {children}
      </body>
    </html>
  )
}
