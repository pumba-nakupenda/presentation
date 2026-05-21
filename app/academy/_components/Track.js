// Helper de tracking analytics. Détecte Plausible OU GA4 si disponibles côté window,
// sinon log noop. Pas de dépendance dure : on greffe les scripts dans <head> via le layout.

export function track(event, props = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.plausible === 'function') {
      window.plausible(event, { props });
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, props);
    }
    // Dev fallback — visible dans la console
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.info('[track]', event, props);
    }
  } catch {
    /* noop */
  }
}
