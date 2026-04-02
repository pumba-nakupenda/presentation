'use client'

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

// Polices system (on ne peut pas load Google Fonts facilement côté client)
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#0A0A0A',
    fontFamily: 'Helvetica',
    paddingTop: 36,
    paddingBottom: 52,
    paddingLeft: 80,
    paddingRight: 36,
  },
  sidebar: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: 56,
    backgroundColor: '#FED700',
  },
  sidebarNum: {
    position: 'absolute',
    left: 0, width: 56,
    textAlign: 'center',
    color: '#000000',
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    top: '40%',
  },
  headerLine: {
    position: 'absolute',
    left: 68, right: 36, top: 22,
    borderTopWidth: 1,
    borderTopColor: '#FED700',
  },
  headerText: {
    position: 'absolute',
    left: 68, top: 12,
    color: '#777777',
    fontSize: 7,
    letterSpacing: 1,
  },
  headerRight: {
    position: 'absolute',
    right: 36, top: 12,
    color: '#FED700',
    fontSize: 7,
  },
  footerLine: {
    position: 'absolute',
    left: 68, right: 36, bottom: 38,
    borderTopWidth: 1,
    borderTopColor: '#FED700',
  },
  footerText: {
    position: 'absolute',
    left: 68, bottom: 26,
    color: '#777777',
    fontSize: 7,
  },
  footerRight: {
    position: 'absolute',
    right: 36, bottom: 26,
    color: '#777777',
    fontSize: 7,
  },

  // Content
  tag: {
    color: '#FED700',
    fontSize: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  h1: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  h2: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  accent: { color: '#FED700' },
  body: {
    color: '#E8E8E8',
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  muted: {
    color: '#777777',
    fontSize: 8,
    lineHeight: 1.5,
  },
  yellow: { color: '#FED700' },

  row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  card: {
    backgroundColor: '#1C1C1C',
    padding: 12,
    flex: 1,
  },
  cardNum: {
    color: '#FED700',
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  cardLbl: { color: '#777777', fontSize: 8, lineHeight: 1.4 },

  ibox: {
    backgroundColor: '#111111',
    borderLeftWidth: 3,
    borderLeftColor: '#FED700',
    padding: 12,
    marginTop: 10,
  },

  separator: {
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    marginVertical: 12,
  },

  bullet: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 5,
  },
  bulletArrow: { color: '#FED700', fontSize: 9, width: 12 },
  bulletText: { color: '#E8E8E8', fontSize: 9, flex: 1, lineHeight: 1.4 },

  // Table
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#FED700',
    padding: '6 8',
  },
  tableHeaderCell: {
    color: '#000000',
    fontFamily: 'Helvetica-Bold',
    fontSize: 7,
    letterSpacing: 0.5,
    flex: 1,
  },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,.04)' },
  tableCell: { color: '#E8E8E8', fontSize: 8, flex: 1, padding: '6 8' },
  tableCellAccent: { color: '#FED700', fontFamily: 'Helvetica-Bold', fontSize: 8, flex: 1, padding: '6 8' },

  // Step
  stepRow: { flexDirection: 'row', marginBottom: 8, backgroundColor: '#1C1C1C' },
  stepNum: { width: 40, backgroundColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center', padding: '8 0' },
  stepNumText: { color: '#FED700', fontFamily: 'Helvetica-Bold', fontSize: 16 },
  stepContent: { flex: 1, padding: '8 12' },
  stepTitle: { color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 10, marginBottom: 3 },
  stepDetail: { color: '#E8E8E8', fontSize: 8, lineHeight: 1.4, marginBottom: 3 },
  stepTag: { color: '#FED700', fontSize: 7, letterSpacing: 0.5 },

  // Retainer
  planGrid: { flexDirection: 'row', gap: 6, marginBottom: 10 },
  plan: { flex: 1, padding: 12, backgroundColor: '#1C1C1C' },
  planFeat: { flex: 1, padding: 12, backgroundColor: '#FED700' },
  planBadge: { fontSize: 7, letterSpacing: 1, marginBottom: 5 },
  planName: { fontFamily: 'Helvetica-Bold', fontSize: 12, marginBottom: 4 },
  planPrice: { fontFamily: 'Helvetica-Bold', fontSize: 18, marginBottom: 2 },
  checkItem: { flexDirection: 'row', gap: 5, marginBottom: 3 },
  checkMark: { fontSize: 8, width: 10 },
  checkText: { fontSize: 8, flex: 1, lineHeight: 1.3 },
})

const PageLayout = ({ children, secNum }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.sidebar} />
    {secNum !== undefined && (
      <Text style={styles.sidebarNum}>{String(secNum).padStart(2, '0')}</Text>
    )}
    <View style={styles.headerLine} />
    <Text style={styles.headerText}>LOLLY COMMUNICATION</Text>
    <Text style={styles.headerRight}>LOLLY × PRIME STORE — 2026</Text>
    <View style={styles.footerLine} />
    <Text style={styles.footerText}>oudama@lolly.sn · LOLLY Communication, Dakar, Sénégal</Text>
    {children}
  </Page>
)

const Bullet = ({ text }) => (
  <View style={styles.bullet}>
    <Text style={styles.bulletArrow}>→</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
)

const IBox = ({ title, body }) => (
  <View style={styles.ibox}>
    {title && <Text style={[styles.body, { color: '#FED700', fontFamily: 'Helvetica-Bold', marginBottom: 4 }]}>{title}</Text>}
    <Text style={styles.body}>{body}</Text>
  </View>
)

export default function PrimePDF() {
  return (
    <Document title="LOLLY × PRIME STORE — Présentation 2026" author="LOLLY Communication">

      {/* ── COUVERTURE ─────────────────────────────────── */}
      <Page size="A4" style={{ backgroundColor: '#000000', padding: 60, fontFamily: 'Helvetica' }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, backgroundColor: '#FED700' }} />
        <View style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 8, backgroundColor: '#FED700' }} />
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, backgroundColor: '#FED700' }} />

        <View style={{ marginTop: 40 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
            <View style={{ width: 100, height: 22, backgroundColor: '#1A1800', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#FED700', fontSize: 7, letterSpacing: 1 }}>DOSSIER CONFIDENTIEL</Text>
            </View>
          </View>
          <Text style={{ color: '#FFFFFF', fontSize: 52, fontFamily: 'Helvetica-Bold', lineHeight: 1.1, marginBottom: 4 }}>LOLLY</Text>
          <Text style={{ color: '#FED700', fontSize: 32, fontFamily: 'Helvetica-Bold', marginBottom: 4 }}>×</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 40, fontFamily: 'Helvetica-Bold', marginBottom: 24 }}>PRIME STORE</Text>
          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 4 }}>Programme de Visibilité Marchands</Text>
          <Text style={{ color: '#888888', fontSize: 14, marginBottom: 32 }}>Partenariat Stratégique 2026</Text>
          <View style={{ width: 160, height: 2, backgroundColor: '#FED700', marginBottom: 24 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 4 }}>Transformons vos 314 marchands</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 12, marginBottom: 40 }}>en vitrines digitales performantes.</Text>
          <Text style={{ color: '#444444', fontSize: 9, marginBottom: 3 }}>Préparé pour : Fatou Niane, PRIME Store</Text>
          <Text style={{ color: '#444444', fontSize: 9, marginBottom: 3 }}>Contact : Amadou Mbaye Gueye · oudama@lolly.sn</Text>
          <Text style={{ color: '#444444', fontSize: 9 }}>Avril 2026</Text>
        </View>
      </Page>

      {/* ── QUI EST LOLLY ? ──────────────────────────────── */}
      <PageLayout secNum={1}>
        <Text style={styles.tag}>00 — Notre identité</Text>
        <Text style={styles.h1}>Qui est LOLLY Communication ?</Text>
        <Text style={[styles.body, { marginBottom: 14 }]}>Agence créative & digitale basée à Dakar — photographie, vidéo, stratégie digitale, formation.</Text>

        <View style={styles.row}>
          {[['5+', 'Années d\'exp.'], ['60+', 'Clients'], ['300+', 'Productions'], ['12+', 'Secteurs']].map(([n, l]) => (
            <View key={n} style={styles.card}>
              <Text style={styles.cardNum}>{n}</Text>
              <Text style={styles.cardLbl}>{l}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.h2, { marginTop: 10 }]}>Nos 3 expertises</Text>
        {[
          ['Production créative', 'Photographie & vidéo pro · Motion design · Identité visuelle'],
          ['Stratégie digitale', 'Community management · Campagnes notoriété · Brand voice'],
          ['Formation', 'Formation comm. digitale · Coaching entrepreneurs · Ateliers réseaux'],
        ].map(([t, d]) => (
          <View key={t} style={{ backgroundColor: '#1C1C1C', padding: '8 12', marginBottom: 6, flexDirection: 'row', gap: 10 }}>
            <Text style={{ color: '#FED700', fontFamily: 'Helvetica-Bold', fontSize: 9, width: 120 }}>{t}</Text>
            <Text style={{ color: '#E8E8E8', fontSize: 8, flex: 1, lineHeight: 1.4 }}>{d}</Text>
          </View>
        ))}

        <IBox title="Notre différence :" body="Nous construisons des systèmes de communication qui génèrent des résultats mesurables — pas seulement du contenu." />
      </PageLayout>

      {/* ── CONTEXTE + VÉRITÉ ─────────────────────────────── */}
      <PageLayout secNum={2}>
        <Text style={styles.tag}>01 — Contexte & réalité terrain</Text>
        <Text style={styles.h1}>PRIME Store & la réalité de ses marchands.</Text>

        <View style={styles.row}>
          {[['314', 'Marchands actifs'], ['41', 'Catégories produits'], ['424', 'Points de vente'], ['#1', 'Ambition marketplace']].map(([n, l]) => (
            <View key={n} style={styles.card}>
              <Text style={styles.cardNum}>{n}</Text>
              <Text style={styles.cardLbl}>{l}</Text>
            </View>
          ))}
        </View>

        <View style={styles.separator} />
        <Text style={[styles.h2, { marginBottom: 10 }]}>Ce que révèle un audit (20 boutiques similaires)</Text>

        <View style={styles.row}>
          {[['7/10', 'Sans visuels pro'], ['8/10', 'Peu actifs réseaux'], ['<300', 'Abonnés Instagram'], ['×2,3', 'Ventes avec présence digitale']].map(([n, l], i) => (
            <View key={n} style={[styles.card, { borderLeftWidth: 3, borderLeftColor: i === 3 ? '#FED700' : 'rgba(254,215,0,.15)' }]}>
              <Text style={[styles.cardNum, { color: i === 3 ? '#FED700' : '#FFFFFF', fontSize: 16 }]}>{n}</Text>
              <Text style={styles.cardLbl}>{l}</Text>
            </View>
          ))}
        </View>

        <IBox
          title="La question que personne ne pose :"
          body="Vos marchands vendent. Mais qui le sait ? L'invisibilité digitale est le principal frein à leur croissance — et donc à celle de PRIME Store."
        />
      </PageLayout>

      {/* ── AXES ─────────────────────────────────────────── */}
      <PageLayout secNum={3}>
        <Text style={styles.tag}>02 — Notre approche</Text>
        <Text style={styles.h1}>Deux axes, une vision cohérente.</Text>
        <Text style={[styles.body, { marginBottom: 14 }]}>LOLLY intervient à deux niveaux complémentaires.</Text>

        <View style={{ backgroundColor: '#1C1C1C', padding: 14, marginBottom: 10 }}>
          <Text style={[styles.tag, { marginBottom: 6 }]}>Axe 1 — Prioritaire · Marketing des marchands</Text>
          <Text style={[styles.body, { color: '#FED700', fontStyle: 'italic', marginBottom: 8 }]}>"Vos marchands vendent mieux = PRIME Store performe mieux."</Text>
          {['Diagnostic communication offert à chaque marchand', 'Création de contenus : photos, vidéos, visuels réseaux', 'Formation & accompagnement communication digitale', 'Tarifs exclusifs 30 à 50 % sous le marché'].map(t => <Bullet key={t} text={t} />)}
        </View>

        <View style={{ backgroundColor: '#1C1C1C', padding: 14 }}>
          <Text style={[styles.tag, { marginBottom: 6 }]}>Axe 2 — Stratégique · Communication PRIME Store</Text>
          <Text style={[styles.body, { color: '#FED700', fontStyle: 'italic', marginBottom: 8 }]}>"PRIME Store doit exister au-delà de ses marchands."</Text>
          {['Identité de marque & brand voice PRIME', 'Création de contenu UGC pour la plateforme', 'Gestion réseaux sociaux (Instagram, TikTok, LinkedIn)', 'Campagnes de notoriété et acquisition'].map(t => <Bullet key={t} text={t} />)}
        </View>
      </PageLayout>

      {/* ── PROGRAMME ────────────────────────────────────── */}
      <PageLayout secNum={4}>
        <Text style={styles.tag}>03 — Programme marchands</Text>
        <Text style={styles.h1}>Un programme en 5 niveaux.</Text>

        <View style={styles.tableHeader}>
          {['Niveau', 'Service', 'Prix marché', 'Via PRIME', 'Commission'].map(h => (
            <Text key={h} style={styles.tableHeaderCell}>{h}</Text>
          ))}
        </View>
        {[
          ['1 — Diagnostic', 'Audit flash communication', '75 000 F', 'GRATUIT', '—'],
          ['2 — Conseil', 'Session 1h · Plan comm · Formation', '75K–300K', '40K–100K F', '20 %'],
          ['3 — À la carte', 'Photo · Vidéo · Design', '50K–600K', '30K–250K F', '30 %'],
          ['4 — Packs', 'Découverte · Visibilité · Impact · Premium', '200K–1,8M', '100K–650K F', '35 %'],
          ['5 — Accompagnement', 'Abonnement Essentiel · Business · VIP', '200K–1,2M/mois', '100K–350K/mois', '40 %'],
        ].map((row, i) => (
          <View key={i} style={[styles.tableRow, { backgroundColor: i % 2 === 0 ? '#1C1C1C' : '#111111' }]}>
            <Text style={styles.tableCellAccent}>{row[0]}</Text>
            {row.slice(1).map((cell, j) => <Text key={j} style={styles.tableCell}>{cell}</Text>)}
          </View>
        ))}

        <Text style={[styles.muted, { marginTop: 8 }]}>* Commission = % que LOLLY reverse à PRIME sur chaque prestation. Vous ne produisez rien — vous touchez une commission.</Text>
      </PageLayout>

      {/* ── ABONNEMENT ───────────────────────────────────── */}
      <PageLayout secNum={5}>
        <Text style={styles.tag}>04 — Abonnement de production mensuel</Text>
        <Text style={styles.h1}>Un abonnement contenu pour faire rayonner PRIME.</Text>
        <Text style={[styles.body, { marginBottom: 16 }]}>Chaque mois, LOLLY produit du contenu UGC co-brandé PRIME Store — livré, prêt à publier.</Text>

        <View style={styles.planGrid}>
          {[
            { badge: 'STARTER', name: 'Starter', price: '500 000 F', sub: '/ mois', color: '#1C1C1C', textColor: '#FED700', bodyColor: '#E8E8E8', items: ['5 contenus co-brandés PRIME', 'Shooting 5 marchands/mois', 'Livraison réseaux sociaux', 'Rapport mensuel'] },
            { badge: 'RECOMMANDÉ', name: 'Growth', price: '1 000 000 F', sub: '/ mois', color: '#FED700', textColor: '#000000', bodyColor: '#000000', items: ['10 contenus co-brandés PRIME', '2 vidéos institutionnelles', 'Stratégie éditoriale', 'Rapport + analyse performance'] },
            { badge: 'SCALE', name: 'Scale', price: '1 800 000 F', sub: '/ mois', color: '#1C1C1C', textColor: '#FED700', bodyColor: '#E8E8E8', items: ['20 contenus co-brandés PRIME', '4 vidéos PRIME Store/mois', 'Stratégie + community mgt', 'Consultant dédié LOLLY'] },
          ].map(plan => (
            <View key={plan.name} style={{ flex: 1, backgroundColor: plan.color, padding: 12 }}>
              <Text style={[styles.planBadge, { color: plan.textColor }]}>{plan.badge}</Text>
              <Text style={[styles.planName, { color: plan.textColor }]}>{plan.name}</Text>
              <Text style={[styles.planPrice, { color: plan.textColor }]}>{plan.price}</Text>
              <Text style={[styles.muted, { color: plan.textColor === '#000000' ? 'rgba(0,0,0,.6)' : '#777777', marginBottom: 8 }]}>{plan.sub}</Text>
              {plan.items.map(it => (
                <View key={it} style={styles.checkItem}>
                  <Text style={[styles.checkMark, { color: plan.textColor }]}>✓</Text>
                  <Text style={[styles.checkText, { color: plan.bodyColor }]}>{it}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </PageLayout>

      {/* ── MODE OP + PROJECTION ─────────────────────────── */}
      <PageLayout secNum={6}>
        <Text style={styles.tag}>05 — Mode opératoire · 06 — Projection</Text>
        <Text style={styles.h1}>Comment ça marche & ce que ça génère.</Text>

        {[
          ['01', 'Diagnostic', 'PRIME facilite l\'introduction. LOLLY réalise un audit express de chaque marchand.', '100 % des marchands'],
          ['02', 'Production', 'Shooting photo & vidéo en boutique. Livraison sous 72h.', 'J+3'],
          ['03', 'Proposition', 'Services adaptés — tarifs exclusifs PRIME, 30 à 50 % sous le marché.', 'J+14'],
          ['04', 'Rapport PRIME', 'Rapport mensuel : marchands, services, commissions, visibilité.', 'Mensuel'],
        ].map(([n, t, d, tag]) => (
          <View key={n} style={styles.stepRow}>
            <View style={[styles.stepNum, { backgroundColor: n === '01' ? '#FED700' : '#2A2A2A' }]}>
              <Text style={[styles.stepNumText, { color: n === '01' ? '#000000' : 'rgba(255,255,255,.2)' }]}>{n}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{t}</Text>
              <Text style={styles.stepDetail}>{d}</Text>
              <Text style={styles.stepTag}>{tag}</Text>
            </View>
          </View>
        ))}

        <View style={styles.separator} />
        <Text style={[styles.h2, { marginBottom: 10 }]}>Projection financière — 12 mois</Text>
        <View style={styles.row}>
          <View style={[styles.card, { borderLeftWidth: 3, borderLeftColor: '#FED700', flex: 1.2 }]}>
            <Text style={[styles.muted, { marginBottom: 4 }]}>VALEUR TOTALE DU PROGRAMME</Text>
            <Text style={[styles.cardNum, { fontSize: 26 }]}>44M – 80M</Text>
            <Text style={styles.cardLbl}>FCFA de services générés / an</Text>
          </View>
          <View style={[styles.card, { flex: 1 }]}>
            <Text style={[styles.muted, { marginBottom: 4 }]}>COMMISSIONS REVERSÉES À PRIME</Text>
            <Text style={[styles.cardNum, { fontSize: 20 }]}>8M – 25M</Text>
            <Text style={styles.cardLbl}>FCFA / an · sans ressources internes</Text>
          </View>
        </View>
        <IBox body="Ce que PRIME investit : l'abonnement mensuel (500K → 1,8M FCFA/mois). Ce que PRIME gagne : commissions sur chaque service marchand. ROI : 4 à 14x." />
      </PageLayout>

      {/* ── PROCHAINES ÉTAPES + CLOSING ──────────────────── */}
      <PageLayout secNum={7}>
        <Text style={styles.tag}>07 — Prochaines étapes</Text>
        <Text style={styles.h1}>La route vers le démarrage.</Text>
        <Text style={[styles.body, { marginBottom: 14 }]}>Sans engagement immédiat. On commence par comprendre — ensuite on chiffre.</Text>

        {[
          { n: '01', t: 'Diagnostic gratuit — 2 à 3 jours', d: 'Analyse PRIME Store + 10 marchands pilotes. Si les résultats ne vous convainquent pas, vous ne payez rien.', when: 'Démarrage dès validation', badge: 'ZÉRO ENGAGEMENT' },
          { n: '02', t: 'Présentation formelle', d: 'Proposition personnalisée présentée à votre direction.', when: '5 jours après le diagnostic' },
          { n: '03', t: 'Lancement pilote — 10 marchands', d: 'Shootings, diagnostics, contenus livrés en 30 jours.', when: 'Mai 2026' },
          { n: '04', t: 'Déploiement programme complet', d: 'Déploiement sur l\'ensemble du réseau + retainer PRIME Store.', when: 'Juin – Juillet 2026' },
        ].map(s => (
          <View key={s.n} style={[styles.stepRow, { marginBottom: 6 }]}>
            <View style={[styles.stepNum, { backgroundColor: s.n === '01' ? '#FED700' : '#2A2A2A', width: 44 }]}>
              <Text style={[styles.stepNumText, { color: s.n === '01' ? '#000000' : 'rgba(255,255,255,.2)', fontSize: 14 }]}>{s.n}</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 3 }}>
                <Text style={styles.stepTitle}>{s.t}</Text>
                {s.badge && <Text style={{ backgroundColor: '#FED700', color: '#000000', fontSize: 7, padding: '1 6', fontFamily: 'Helvetica-Bold' }}>{s.badge}</Text>}
              </View>
              <Text style={styles.stepDetail}>{s.d}</Text>
              <Text style={styles.stepTag}>{s.when}</Text>
            </View>
          </View>
        ))}

        <View style={[styles.ibox, { marginTop: 14 }]}>
          <Text style={[styles.body, { color: '#FED700', fontFamily: 'Helvetica-Bold', marginBottom: 6 }]}>Pour votre direction — en une phrase</Text>
          <Text style={[styles.body, { fontStyle: 'italic' }]}>"LOLLY Communication transforme nos 314 marchands en vitrines digitales professionnelles. PRIME Store capte des commissions sur chaque prestation — sans mobiliser une seule ressource interne."</Text>
        </View>

        <View style={{ borderWidth: 1, borderColor: 'rgba(254,215,0,.3)', padding: 14, marginTop: 10, backgroundColor: 'rgba(254,215,0,.05)' }}>
          <Text style={[styles.tag, { marginBottom: 6 }]}>Question de closing</Text>
          <Text style={{ color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 12 }}>Quels sont les 10 marchands qu'on audite en premier ?</Text>
        </View>
      </PageLayout>

      {/* ── DOS ──────────────────────────────────────────── */}
      <Page size="A4" style={{ backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center', fontFamily: 'Helvetica' }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, backgroundColor: '#FED700' }} />
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, backgroundColor: '#FED700' }} />
        <Text style={{ color: '#FED700', fontSize: 48, fontFamily: 'Helvetica-Bold', marginBottom: 8 }}>LOLLY</Text>
        <Text style={{ color: '#888888', fontSize: 13, marginBottom: 6 }}>Des mots qui touchent, des images qui marquent.</Text>
        <Text style={{ color: '#555555', fontSize: 9 }}>oudama@lolly.sn · Dakar, Sénégal</Text>
        <Text style={{ color: '#333333', fontSize: 8, position: 'absolute', bottom: 20 }}>LOLLY Communication © 2026</Text>
      </Page>

    </Document>
  )
}
