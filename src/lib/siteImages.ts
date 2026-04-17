export type ImageSlot = {
  key: string;
  label: string;
  page: string;
  section: string;
  defaultUrl: string;
  alt: string;
  aspect: '16/9' | '4/5' | '4/3' | '1/1' | 'free';
};

export const IMAGE_REGISTRY: ImageSlot[] = [
  // ── Accueil ──────────────────────────────────────────────────────────────
  {
    key: 'home-hero',
    label: 'Fond hero principal',
    page: 'Accueil',
    section: 'Bannière hero',
    defaultUrl: '/hero-spa.png',
    alt: 'Institut Soléana Bien-Être à Venerque',
    aspect: '16/9',
  },
  {
    key: 'home-discover',
    label: 'Photo section "Découvrir"',
    page: 'Accueil',
    section: 'Section découverte',
    defaultUrl: '/decouvir.png',
    alt: 'Soins bien-être Soléana Venerque',
    aspect: '4/5',
  },
  {
    key: 'home-laetitia',
    label: 'Photo section "Votre praticienne"',
    page: 'Accueil',
    section: 'Section Laetitia Sevrin',
    defaultUrl: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Praticienne%20de%20bien-etre.webp',
    alt: 'Laetitia Sevrin – praticienne Soléana Bien-Être',
    aspect: '4/5',
  },
  {
    key: 'home-service-epilation',
    label: 'Carte soin – Épilation laser',
    page: 'Accueil',
    section: 'Cartes soins',
    defaultUrl: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Épilation laser – Soléana Bien-Être',
    aspect: '16/9',
  },
  {
    key: 'home-service-soins-visage',
    label: 'Carte soin – Soins du visage',
    page: 'Accueil',
    section: 'Cartes soins',
    defaultUrl: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Soins du visage – Soléana Bien-Être',
    aspect: '16/9',
  },
  {
    key: 'home-service-kobido',
    label: 'Carte soin – Kobido',
    page: 'Accueil',
    section: 'Cartes soins',
    defaultUrl: 'https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Kobido massage facial – Soléana Bien-Être',
    aspect: '16/9',
  },
  {
    key: 'home-service-massages',
    label: 'Carte soin – Massages bien-être',
    page: 'Accueil',
    section: 'Cartes soins',
    defaultUrl: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Massages bien-être – Soléana Bien-Être',
    aspect: '16/9',
  },
  {
    key: 'home-service-drainage',
    label: 'Carte soin – Drainage & Maderothérapie',
    page: 'Accueil',
    section: 'Cartes soins',
    defaultUrl: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Drainage lymphatique et maderothérapie – Soléana Bien-Être',
    aspect: '16/9',
  },

  // ── À propos ─────────────────────────────────────────────────────────────
  {
    key: 'about-hero',
    label: 'Fond hero',
    page: 'À propos',
    section: 'Bannière en-tête',
    defaultUrl: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Accueil-soleana-venerque.webp',
    alt: 'Institut Soléana Bien-Être – espace d\'accueil',
    aspect: '16/9',
  },
  {
    key: 'about-portrait',
    label: 'Portrait / Photo story',
    page: 'À propos',
    section: 'Section "Le parcours de Laetitia"',
    defaultUrl: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Accueil-soleana-venerque.webp',
    alt: 'Accueil de l\'institut Soléana Bien-Être à Venerque',
    aspect: '4/5',
  },
  {
    key: 'about-gallery-1',
    label: 'Galerie – Espace accueil',
    page: 'À propos',
    section: 'Galerie photos (1ère image)',
    defaultUrl: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Accueil-soleana-venerque.webp',
    alt: 'Espace d\'accueil – Soléana Bien-Être',
    aspect: '4/3',
  },
  {
    key: 'about-gallery-2',
    label: 'Galerie – Cabine laser & soins',
    page: 'À propos',
    section: 'Galerie photos (2ème image)',
    defaultUrl: '/Capture_d\'écran_2026-04-05_à_21.18.01.png',
    alt: 'Cabine soins et laser – Soléana Bien-Être',
    aspect: '4/3',
  },
  {
    key: 'about-gallery-3',
    label: 'Galerie – Cabine massage',
    page: 'À propos',
    section: 'Galerie photos (3ème image)',
    defaultUrl: '/Capture_d\'écran_2026-04-05_à_21.18.10.png',
    alt: 'Cabine massage – Soléana Bien-Être',
    aspect: '4/3',
  },
  {
    key: 'about-why',
    label: 'Photo "Pourquoi Soléana"',
    page: 'À propos',
    section: 'Section pourquoi nous choisir',
    defaultUrl: '/Capture_d\'écran_2026-04-05_à_21.18.01.png',
    alt: 'Cabine de soins et épilation laser – Soléana Bien-Être',
    aspect: '16/9',
  },
  {
    key: 'about-estime-sens',
    label: 'Photo Estime & Sens',
    page: 'À propos',
    section: 'Section produits Estime & Sens',
    defaultUrl: '/Capture_d\'écran_2026-04-05_à_21.18.10.png',
    alt: 'Cabine de massage avec huiles Estime & Sens',
    aspect: '1/1',
  },
  {
    key: 'about-gallery-4',
    label: 'Galerie – Photo supplémentaire 1',
    page: 'À propos',
    section: 'Galerie photos (optionnel)',
    defaultUrl: '',
    alt: 'Institut Soléana Bien-Être',
    aspect: '4/3',
  },
  {
    key: 'about-gallery-5',
    label: 'Galerie – Photo supplémentaire 2',
    page: 'À propos',
    section: 'Galerie photos (optionnel)',
    defaultUrl: '',
    alt: 'Institut Soléana Bien-Être',
    aspect: '4/3',
  },
  {
    key: 'about-gallery-6',
    label: 'Galerie – Photo supplémentaire 3',
    page: 'À propos',
    section: 'Galerie photos (optionnel)',
    defaultUrl: '',
    alt: 'Institut Soléana Bien-Être',
    aspect: '4/3',
  },

  // ── Kobido ────────────────────────────────────────────────────────────────
  {
    key: 'kobido-hero',
    label: 'Photo de couverture (hero)',
    page: 'Kobido',
    section: 'Bannière en-tête',
    defaultUrl: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Massage Kobido lifting naturel – Soléana Bien-Être',
    aspect: '16/9',
  },
  {
    key: 'kobido-main',
    label: 'Photo principale',
    page: 'Kobido',
    section: 'Section présentation',
    defaultUrl: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Massage Kobido lifting naturel japonais',
    aspect: '4/3',
  },
  {
    key: 'kobido-secondary',
    label: 'Photo secondaire',
    page: 'Kobido',
    section: 'Section bienfaits',
    defaultUrl: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Soin du visage Kobido Soléana',
    aspect: '4/3',
  },

  // ── Massages ──────────────────────────────────────────────────────────────
  {
    key: 'massages-hero',
    label: 'Photo de couverture (hero)',
    page: 'Massages bien-être',
    section: 'Bannière en-tête',
    defaultUrl: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Massage bien-être Soléana Venerque',
    aspect: '16/9',
  },
  {
    key: 'massages-main',
    label: 'Photo principale',
    page: 'Massages bien-être',
    section: 'Section présentation',
    defaultUrl: 'https://images.pexels.com/photos/5938408/pexels-photo-5938408.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Massage bien-être Soléana Venerque',
    aspect: '4/3',
  },
  {
    key: 'massages-secondary',
    label: 'Photo secondaire',
    page: 'Massages bien-être',
    section: 'Section types de massages',
    defaultUrl: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Massage relaxant Soléana',
    aspect: '4/3',
  },
  {
    key: 'massages-tertiary',
    label: 'Photo tertiaire',
    page: 'Massages bien-être',
    section: 'Section complémentaire',
    defaultUrl: 'https://images.pexels.com/photos/7646811/pexels-photo-7646811.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Massage corps Soléana',
    aspect: '4/3',
  },

  // ── Drainage ──────────────────────────────────────────────────────────────
  {
    key: 'drainage-hero',
    label: 'Photo de couverture (hero)',
    page: 'Drainage & Maderothérapie',
    section: 'Bannière en-tête',
    defaultUrl: 'https://images.pexels.com/photos/6663371/pexels-photo-6663371.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Drainage lymphatique Soléana Venerque',
    aspect: '16/9',
  },
  {
    key: 'drainage-main',
    label: 'Photo principale',
    page: 'Drainage & Maderothérapie',
    section: 'Section présentation',
    defaultUrl: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Drainage lymphatique Soléana Venerque',
    aspect: '4/3',
  },
  {
    key: 'drainage-secondary',
    label: 'Photo secondaire',
    page: 'Drainage & Maderothérapie',
    section: 'Section maderothérapie',
    defaultUrl: 'https://images.pexels.com/photos/5938409/pexels-photo-5938409.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Maderothérapie modelage corps Soléana',
    aspect: '4/3',
  },

  // ── Soins du visage ───────────────────────────────────────────────────────
  {
    key: 'soins-visage-main',
    label: 'Photo principale',
    page: 'Soins du visage',
    section: 'Section présentation',
    defaultUrl: 'https://images.pexels.com/photos/5938408/pexels-photo-5938408.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Soin du visage Soléana Venerque',
    aspect: '4/3',
  },
  {
    key: 'soins-visage-secondary',
    label: 'Photo secondaire',
    page: 'Soins du visage',
    section: 'Section soins',
    defaultUrl: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Soins esthétiques visage Soléana',
    aspect: '4/3',
  },
];

export function getSlotsByPage(): Record<string, ImageSlot[]> {
  return IMAGE_REGISTRY.reduce<Record<string, ImageSlot[]>>((acc, slot) => {
    if (!acc[slot.page]) acc[slot.page] = [];
    acc[slot.page].push(slot);
    return acc;
  }, {});
}
