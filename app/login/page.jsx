'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MONO = { fontFamily: 'Montserrat, sans-serif', fontWeight: 900 }
const LATO = { fontFamily: 'Lato, sans-serif' }

export default function LoginPage() {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    if (pwd === 'PRIMEXLOLLY') {
      document.cookie = 'prime_auth=PRIMEXLOLLY; path=/PRIME; max-age=86400; SameSite=Lax'
      router.push('/')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0A0A0A', padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...MONO, fontSize: 22, letterSpacing: 3, color: '#FED700', marginBottom: 6 }}>
            LOLLY <span style={{ color: '#fff' }}>× PRIME</span>
          </div>
          <div style={{ ...LATO, fontSize: 11, color: '#777', letterSpacing: 2 }}>
            PRÉSENTATION CONFIDENTIELLE
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#111', border: '1px solid rgba(254,215,0,.12)',
          padding: '36px 32px', borderRadius: 4,
        }}>
          <div style={{ ...MONO, fontSize: 13, color: '#FED700', letterSpacing: 2, marginBottom: 24 }}>
            ACCÈS SÉCURISÉ
          </div>

          <form onSubmit={submit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ ...LATO, fontSize: 11, color: '#777', letterSpacing: 1, display: 'block', marginBottom: 8 }}>
                MOT DE PASSE
              </label>
              <input
                type="password"
                value={pwd}
                onChange={e => { setPwd(e.target.value); setError(false) }}
                placeholder="••••••••••"
                autoFocus
                style={{
                  width: '100%', padding: '12px 14px',
                  background: '#1C1C1C', border: `1px solid ${error ? '#ff4444' : 'rgba(255,255,255,.1)'}`,
                  color: '#fff', fontSize: 15, borderRadius: 2, outline: 'none',
                  fontFamily: 'monospace', letterSpacing: 3,
                  boxSizing: 'border-box',
                  transition: 'border-color .2s',
                }}
              />
              {error && (
                <div style={{ ...LATO, fontSize: 11, color: '#ff6666', marginTop: 8, letterSpacing: .5 }}>
                  Mot de passe incorrect.
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !pwd}
              style={{
                width: '100%', padding: '12px',
                background: pwd && !loading ? '#FED700' : 'rgba(254,215,0,.2)',
                color: pwd && !loading ? '#0A0A0A' : '#555',
                border: 'none', cursor: pwd && !loading ? 'pointer' : 'not-allowed',
                borderRadius: 2, ...MONO, fontSize: 11, letterSpacing: 2,
                transition: 'all .2s',
              }}
            >
              {loading ? 'CHARGEMENT...' : 'ACCÉDER →'}
            </button>
          </form>
        </div>

        <div style={{ ...LATO, fontSize: 10, color: '#444', textAlign: 'center', marginTop: 24, letterSpacing: 1 }}>
          LOLLY Communication · Dakar, Sénégal
        </div>
      </div>
    </div>
  )
}
