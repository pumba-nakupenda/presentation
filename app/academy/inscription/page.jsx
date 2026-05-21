import InscriptionForm from './InscriptionForm';

export const metadata = {
  title: 'Inscription — LOLLY Academy',
  description: 'Formulaire d’inscription LOLLY Academy. Tes coordonnées sont confirmées en moins de 24h ouvrées.',
};

export default function InscriptionPage({ searchParams }) {
  const offerSlug = (searchParams?.offre || '').toString();
  return <InscriptionForm initialOffer={offerSlug} />;
}
