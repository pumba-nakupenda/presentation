# Handoff — LOL-128 Page-carte LOLLY Academy

**De** : Claude Code · 2026-05-21 16:18 Africa/Dakar
**Pour** : OUDAMA (validation N2) · puis Claude (Cowork) si correction copywriting
**Branche** : `codex/lol-128-page-academy` sur `pumba-nakupenda/presentation`
**Status** : preview prête, attente GO N2 OUDAMA avant merge sur `main`

## Ce qui est livré

7 routes Next.js sous `/academy/*` (rewrite Vercel depuis `/PRIME/academy/*`) :

| URL | Contenu |
|---|---|
| `/academy` | Hero + 4 cartes (FONDATIONS / REPRISE EN MAIN / PILOTAGE / POSTURE) + bandeau jaune diagnostic + bloc noir conseil 30 min (Calendly + WhatsApp) + footer |
| `/academy/fondations` | Problème → promesse → programme → format → pricing → CTA WhatsApp + formulaire |
| `/academy/reprise-en-main` | idem |
| `/academy/pilotage` | idem |
| `/academy/posture` | idem (pricing « à partir de » sans early bird) |
| `/academy/diagnostic` | 5 questions React → scoring par offre → recommandation + alternatives |
| `/academy/inscription` | Formulaire d'intérêt → ouvre WhatsApp pré-rempli + mailto draft |

## Validations OUDAMA capturées avant code

- **Paiement** : pas de Wave en ligne. CTA `Réserver ma place` = WhatsApp pré-rempli avec coordonnées attendues, + formulaire d'inscription interne en CTA secondaire (ouvre WhatsApp + mailto au submit, pas de stockage serveur).
- **Conseil 30 min** : 2 boutons côte à côte — Calendly principal + WhatsApp secondaire. Calendly URL placeholder à confirmer : `https://calendly.com/lolly-sn/conseil-30min`.
- **Diagnostic** : composant React natif, 5 questions à choix multiples, scoring par offre, recommandation à la fin.
- **URL** : `/academy/diagnostic`.

## Conformité charte LOLLY

- Polices : Montserrat Black titres, Lato corps, MuseoModerno Black Italic pour le mot `LOLLY` partout, via `next/font/google` (préchargement automatique).
- Couleurs : FED700 + 000 uniquement (+ paper #FAFAF7 fond clair). `@theme` Tailwind 4 dans `app/globals.css`.
- Pas d'émoji dans les textes publiés.
- Mot `LOLLY` rendu via classe `.lolly-wordmark` partout.

## Tracking analytics

- Plausible chargé par `next/script` avec `data-domain="lolly.sn"` (à vérifier que `lolly.sn` est bien dans le compte Plausible LOLLY ; sinon adapter).
- Helper `app/academy/_components/Track.js` détecte aussi `window.gtag` si GA4 actif.
- Événements :
  - `click_carte_{offre}` au clic sur chaque carte profil
  - `click_diagnostic_start` (hero + bannière jaune)
  - `click_diagnostic_complete` avec prop `recommended`
  - `click_diagnostic_to_offer` (depuis la page diagnostic vers une offre)
  - `click_conseil_30min` avec prop `via=calendly|whatsapp` et éventuellement `offer`
  - `click_reserver_paiement_wave_{offre}` avec prop `channel=whatsapp|form`
  - `inscription_form_submit` avec prop `offer`

## Points à valider visuellement (N2 OUDAMA)

1. Copywriting des 4 cartes profils (problème + description) — texte conforme au brief v1 du 18/05.
2. Lecture mobile (cible 80 % trafic) — empilement vertical des cartes, boutons tappables.
3. Couleurs FED700 dans Plausible + cohérence avec la maquette.
4. Bandeau jaune diagnostic : taille du CTA, lisibilité noir sur jaune.
5. Bloc conseil 30 min : 2 boutons (Calendly + WhatsApp) côte à côte → s'empilent en mobile.
6. CTA WhatsApp pré-rempli : ouvrir un de ces liens et vérifier que le texte arrive bien dans WhatsApp Web.
7. Diagnostic : faire le quiz 2 fois, vérifier que la recommandation a du sens.

## Points qui peuvent encore bouger (placeholders)

- `CONTACT.calendly` dans `app/academy/_lib/offers.js` — actuellement `https://calendly.com/lolly-sn/conseil-30min`. Si l'URL réelle diffère, modifier ce fichier seul.
- `CONTACT.whatsapp` = `+221772354747` — confirmé conformément au pied de page LOLLY existant.
- `CONTACT.email` = `oudama@lolly.sn` — confirmé.

## Workflow après ton GO N2

1. Merge `codex/lol-128-page-academy` sur `main` (interface GitHub ou `gh pr merge`).
2. Vercel auto-deploy de `main` sur `lolly.sn`.
3. Tester live `https://lolly.sn/academy` et sous-routes.
4. Passer `LOL-128` à `terminé` dans Linear, claim CLAIMS.md à `terminé`.
5. Mettre à jour les bios TikTok / Insta / LinkedIn vers `https://lolly.sn/academy`.

## Handoff vers Claude (Cowork) — si correction copywriting

Le copywriting des 4 cartes vient du brief `BRIEF_PAGE_CARTE_ACADEMY.md` v1 (2026-05-18). Si OUDAMA veut réécrire les titres-problèmes ou les descriptions, modifier uniquement `app/academy/_lib/offers.js` (fichier de données central, source de vérité unique pour les 4 offres). Pas besoin de toucher aux composants.
