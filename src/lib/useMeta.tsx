import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.soleana-bienetre.com';
const OG_IMAGE = `${SITE_URL}/og-share.jpg`;

interface PageMetaProps {
  title: string;
  description: string;
  /** URL canonique de la page (optionnel, déduit depuis window.location par défaut) */
  url?: string;
  /** Image de partage spécifique à la page (optionnel, logo-share.png par défaut) */
  image?: string;
}

export function PageMeta({ title, description, url, image }: PageMetaProps) {
  const pageUrl = url ?? (typeof window !== 'undefined' ? SITE_URL + window.location.pathname : SITE_URL);
  const pageImage = image ?? OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph — Facebook, WhatsApp, LinkedIn, iMessage… */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Soléana Bien-Être" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="1200" />
      <meta property="og:image:alt" content="Soléana Bien-Être – Institut de beauté à Venerque" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={pageImage} />
    </Helmet>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items, pageUrl }: { items: FAQItem[]; pageUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    url: pageUrl,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

/** Compat shim — ne fait rien, le composant PageMeta gère tout */
export function useMeta(_title: string, _description: string) {}
