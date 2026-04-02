import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { slides } from '@/data/slides'

const MONO = { fontFamily: 'Montserrat, sans-serif', fontWeight: 900 }
const LATO = { fontFamily: 'Lato, sans-serif' }

function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

function fmtDur(s) {
  if (!s) return '—'
  if (s < 60) return `${s}s`
  return `${Math.floor(s / 60)}m${String(s % 60).padStart(2, '0')}s`
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('prime_auth')?.value
  if (auth !== 'PRIMEXLOLLY') redirect('/login')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: sessions } = await supabase
    .from('prime_sessions')
    .select('*, prime_slide_views(*)')
    .order('created_at', { ascending: false })
    .limit(50)

  // Aggregate time per slide across all sessions
  const slideTotals = Array(slides.length).fill(0)
  const slideViews  = Array(slides.length).fill(0)
  sessions?.forEach(s => {
    s.prime_slide_views?.forEach(v => {
      if (v.slide_index < slides.length) {
        slideTotals[v.slide_index] += v.duration_seconds || 0
        slideViews[v.slide_index]++
      }
    })
  })
  const maxTotal = Math.max(...slideTotals, 1)

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', padding: '32px 24px', ...LATO }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ ...MONO, fontSize: 11, color: '#FED700', letterSpacing: 3, marginBottom: 8 }}>
            LOLLY × PRIME — TABLEAU DE BORD
          </div>
          <div style={{ fontSize: 28, ...MONO, color: '#fff' }}>Tracking de lecture</div>
          <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{sessions?.length || 0} session(s) enregistrée(s)</div>
        </div>

        {/* Heatmap slides */}
        <div style={{ background: '#111', border: '1px solid rgba(254,215,0,.1)', padding: '24px', marginBottom: 32, borderRadius: 4 }}>
          <div style={{ ...MONO, fontSize: 10, color: '#FED700', letterSpacing: 2, marginBottom: 20 }}>TEMPS MOYEN PAR SLIDE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {slides.map((s, i) => {
              const avg = slideViews[i] > 0 ? Math.round(slideTotals[i] / slideViews[i]) : 0
              const pct = (slideTotals[i] / maxTotal) * 100
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ ...MONO, fontSize: 9, color: '#555', width: 20, textAlign: 'right', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontSize: 11, color: '#888', width: 160, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</div>
                  <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,.05)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: pct > 60 ? '#FED700' : pct > 30 ? 'rgba(254,215,0,.6)' : 'rgba(254,215,0,.25)', borderRadius: 2, transition: 'width .4s' }} />
                  </div>
                  <div style={{ ...MONO, fontSize: 10, color: '#FED700', width: 40, textAlign: 'right', flexShrink: 0 }}>{fmtDur(avg)}</div>
                  <div style={{ fontSize: 10, color: '#444', width: 32, textAlign: 'right', flexShrink: 0 }}>{slideViews[i]}×</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sessions list */}
        <div style={{ background: '#111', border: '1px solid rgba(254,215,0,.1)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
            <div style={{ ...MONO, fontSize: 10, color: '#FED700', letterSpacing: 2 }}>SESSIONS RÉCENTES</div>
          </div>
          {!sessions?.length && (
            <div style={{ padding: 32, color: '#444', fontSize: 13, textAlign: 'center' }}>Aucune session encore.</div>
          )}
          {sessions?.map(s => {
            const viewCount = s.prime_slide_views?.length || 0
            const slidesVisited = [...new Set(s.prime_slide_views?.map(v => v.slide_index) || [])].length
            return (
              <div key={s.id} style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,.04)', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <div style={{ fontSize: 12, color: '#fff' }}>{fmt(s.created_at)}</div>
                  <div style={{ fontSize: 10, color: '#444', marginTop: 2, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.user_agent?.split('(')[0]?.trim() || 'Inconnu'}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...MONO, fontSize: 16, color: '#FED700' }}>{slidesVisited}</div>
                  <div style={{ fontSize: 9, color: '#555', letterSpacing: 1 }}>SLIDES</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...MONO, fontSize: 16, color: '#fff' }}>{fmtDur(s.total_seconds)}</div>
                  <div style={{ fontSize: 9, color: '#555', letterSpacing: 1 }}>DURÉE</div>
                </div>
                <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', maxWidth: 280 }}>
                  {slides.map((sl, i) => {
                    const view = s.prime_slide_views?.find(v => v.slide_index === i)
                    const dur = view?.duration_seconds || 0
                    const opacity = view ? Math.max(0.2, Math.min(1, dur / 30)) : 0.05
                    return (
                      <div key={i} title={`${sl.label}: ${fmtDur(dur)}`} style={{
                        width: 14, height: 14, borderRadius: 2,
                        background: `rgba(254,215,0,${opacity})`,
                        border: view ? '1px solid rgba(254,215,0,.2)' : '1px solid rgba(255,255,255,.05)',
                      }} />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 24, fontSize: 10, color: '#333', textAlign: 'center', letterSpacing: 1 }}>
          LOLLY Communication · Données PRIME Store · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}
