import { writeFileSync } from 'fs'
import { join } from 'path'

const API_KEY = 'a1c7de49ac3c4877233cc94305986f8f03ccf6552229fc6bdfd0ee05e2391445'
const VOICE_ID = 'pXaktRfpQXXfrG99ySBn'
const OUT_DIR = join(process.cwd(), 'public/audio')

const NARRATIONS = [
  // slide 0 - cover
  [
    "Programme de Visibilité Marchands. Partenariat Stratégique 2026.",
    "LOLLY Communication et PRIME Store s'associent pour transformer la communication de 314 marchands.",
    "Cette présentation a été construite spécifiquement pour votre réseau.",
    "Préparée pour Fatou Niane en avril 2026, par Amadou Mbaye Gueye, oudama@lolly.sn."
  ],
  // slide 1 - lolly
  [
    "LOLLY Communication — l'agence qui transforme les vitrines en leviers de croissance.",
    "Notre premier axe, la Production Créative : photographie et vidéo professionnelle, motion design, identité visuelle.",
    "Notre deuxième axe, la Stratégie Digitale : community management, campagnes d'acquisition, brand voice et storytelling.",
    "Notre troisième axe, la Formation : nous formons vos marchands pour les rendre autonomes sur les réseaux sociaux.",
    "En cinq ans : 60 clients accompagnés, 300 productions livrées, dans 12 secteurs d'activité.",
    "Nous ne construisons pas des campagnes — nous construisons des systèmes qui génèrent des résultats mesurables."
  ],
  // slide 2 - context
  [
    "PRIME Store — un acteur majeur du e-commerce sénégalais.",
    "314 marchands actifs sur la plateforme.",
    "41 catégories de produits et services.",
    "424 points de vente à Dakar et au Sénégal.",
    "Et une ambition claire : devenir LA marketplace de référence.",
    "La qualité de votre offre dépasse souvent la qualité de la communication de vos marchands. Un marchand invisible en ligne, c'est du chiffre d'affaires perdu — pour lui et pour PRIME Store."
  ],
  // slide 3 - truth
  [
    "Ce que révèle un audit de 20 boutiques comparables aux vôtres.",
    "7 marchands sur 10 n'ont pas de visuels produit professionnels.",
    "8 sur 10 publient moins d'une fois par semaine sur les réseaux sociaux.",
    "Moins de 300 abonnés Instagram en moyenne par boutique.",
    "Et le chiffre qui change tout : multiplié par 2,3 — les boutiques avec une présence digitale structurée vendent deux fois et demi plus.",
    "Ces chiffres s'appliquent très probablement à vos 314 marchands. Nous le vérifions gratuitement en 72 heures."
  ],
  // slide 4 - silence
  [
    "La question que personne ne pose.",
    "Vos marchands vendent.",
    "Mais qui le sait ?",
    "Dans un monde où la décision d'achat se prend en ligne, être invisible sur les réseaux, c'est ne pas exister. C'est la question à laquelle LOLLY répond, concrètement."
  ],
  // slide 5 - axes
  [
    "Notre approche repose sur deux axes complémentaires.",
    "Axe 1, prioritaire : le marketing des marchands. LOLLY prend en charge la communication de chaque marchand, avec des tarifs exclusifs 30 à 50 pourcent sous le marché. PRIME Store perçoit une commission sur chaque service acheté — sans produire, sans gérer.",
    "Axe 2, stratégique : la communication de PRIME Store elle-même. Identité de marque, contenu co-brandé, gestion réseaux sociaux. PRIME Store doit exister au-delà de ses marchands."
  ],
  // slide 6 - programme
  [
    "Un programme en 5 niveaux progressifs.",
    "Niveau 1 — Diagnostic gratuit. Audit flash offert à chaque marchand.",
    "Niveau 2 — Conseil. De 40 à 100 000 francs via PRIME. 20 pourcent de commission.",
    "Niveau 3 — À la carte. Photo, vidéo, design. De 30 à 250 000 francs. 30 pourcent de commission.",
    "Niveau 4 — Packs complets. De 100 à 650 000 francs. 35 pourcent de commission.",
    "Niveau 5 — Accompagnement mensuel. De 100 à 350 000 francs par mois. 40 pourcent de commission.",
    "PRIME ne produit rien — elle facilite l'introduction et perçoit sa commission.",
    "L'entonnoir prévu : 314 diagnostics, 150 en conseil, 80 à la carte, 45 en packs, et 12 en accompagnement mensuel."
  ],
  // slide 7 - retainer
  [
    "Un abonnement contenu mensuel pour faire rayonner PRIME Store.",
    "Plan Starter à 500 000 francs par mois : 5 contenus co-brandés, shooting chez 5 marchands.",
    "Plan Growth à 1 million par mois — le recommandé : 10 contenus, 2 vidéos institutionnelles, stratégie éditoriale et analyse de performance.",
    "Plan Scale à 1 million 800 par mois : 20 contenus, 4 vidéos par mois, gestion complète de communauté et consultant LOLLY dédié."
  ],
  // slide 8 - modeop
  [
    "Comment ça fonctionne concrètement ?",
    "Étape 1 — Diagnostic. PRIME facilite l'introduction. LOLLY réalise l'audit en 72 heures. Gratuit pour le marchand.",
    "Étape 2 — Production. Shooting photo et vidéo en boutique. Le marchand reçoit ses contenus à J+3.",
    "Étape 3 — Proposition commerciale. Services adaptés aux besoins identifiés, aux tarifs exclusifs PRIME. À J+14.",
    "Étape 4 — Rapport mensuel pour PRIME Store : marchands touchés, services activés, commissions générées. Transparence totale."
  ],
  // slide 9 - projection
  [
    "Les projections financières sur 12 mois — prudentes et vérifiables.",
    "44 à 80 millions de francs de valeur totale générée autour du programme.",
    "Et ce que PRIME perçoit directement : 8 à 25 millions de francs de commissions nettes. Sans production. Sans recrutement.",
    "Trois flux de revenus : l'abonnement mensuel, les commissions marchands, et les accompagnements récurrents.",
    "Ce que PRIME investit : l'abonnement mensuel. Ce que PRIME gagne : des commissions récurrentes sans mobiliser une seule ressource interne."
  ],
  // slide 10 - nextsteps
  [
    "La route vers le démarrage. Sans engagement immédiat.",
    "Étape 1 — Diagnostic gratuit en 72 heures. Nous auditons ensemble 10 marchands pilotes. Aucun frais. Si les résultats ne vous convainquent pas, vous ne payez rien.",
    "Étape 2 — Présentation formelle de la proposition, avec axes prioritaires, budget et indicateurs de succès.",
    "Étape 3 — Lancement pilote sur 10 marchands en mai 2026. Shootings, diagnostics, contenus livrés en 30 jours.",
    "Étape 4 — Déploiement complet sur les 314 marchands, avec activation du retainer PRIME Store, en juin-juillet 2026."
  ],
  // slide 11 - closing
  [
    "Vos marchands ont la qualité. Il leur manque la visibilité. LOLLY leur donne — et PRIME Store en récolte les fruits.",
    "LOLLY Communication transforme vos 314 marchands en vitrines digitales professionnelles. PRIME Store perçoit une commission sur chaque prestation — sans mobiliser une seule ressource interne.",
    "Alors : quels sont les 10 marchands qu'on audite en premier ?"
  ],
]

async function generateSlide(slideIdx, segments) {
  const text = segments.join(' ')
  console.log(`Generating slide ${slideIdx}...`)

  const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.45, similarity_boost: 0.85, style: 0.3, use_speaker_boost: true }
    })
  })

  if (!resp.ok) {
    const err = await resp.text()
    throw new Error(`Slide ${slideIdx}: HTTP ${resp.status} — ${err}`)
  }

  const data = await resp.json()

  // Save MP3
  const audioBuffer = Buffer.from(data.audio_base64, 'base64')
  writeFileSync(join(OUT_DIR, `slide-${slideIdx}.mp3`), audioBuffer)

  // Extract segment start times from character alignment
  const charTimes = data.alignment.character_start_times_seconds

  // Find time of first character of each segment
  const segmentTimings = []
  let charOffset = 0
  for (let i = 0; i < segments.length; i++) {
    segmentTimings.push({ elem: i, time: charTimes[charOffset] ?? 0 })
    charOffset += segments[i].length
    if (i < segments.length - 1) charOffset += 1 // space between segments
  }

  writeFileSync(join(OUT_DIR, `slide-${slideIdx}.json`), JSON.stringify({ segments: segmentTimings }, null, 2))
  console.log(`✓ Slide ${slideIdx}: ${segments.length} segments, ${(audioBuffer.length/1024).toFixed(0)}KB`)
  console.log(`  Timings: ${segmentTimings.map(s => s.time.toFixed(1)+'s').join(', ')}`)
}

for (let i = 0; i < NARRATIONS.length; i++) {
  await generateSlide(i, NARRATIONS[i])
  if (i < NARRATIONS.length - 1) await new Promise(r => setTimeout(r, 600))
}
console.log('✅ All done!')
