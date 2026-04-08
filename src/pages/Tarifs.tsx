import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Star,
  Zap,
  Leaf,
  Hand,
  Wind,
  Droplets,
  Tag,
  Info,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import Breadcrumb from '../components/ui/Breadcrumb';

// ─── Types ───────────────────────────────────────────────────────────────────

interface PriceItem {
  name: string;
  price: string;
  note?: string;
}

interface PriceCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  items: PriceItem[];
  note?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const categories: PriceCategory[] = [
  {
    id: 'laser-femme',
    label: 'Épilation laser femme',
    icon: <Sparkles size={18} />,
    color: 'nude',
    items: [
      { name: 'Lèvre supérieure', price: '[PRIX À DÉFINIR]' },
      { name: 'Menton', price: '[PRIX À DÉFINIR]' },
      { name: 'Visage complet', price: '[PRIX À DÉFINIR]' },
      { name: 'Aisselles', price: '[PRIX À DÉFINIR]' },
      { name: 'Bras complets', price: '[PRIX À DÉFINIR]' },
      { name: 'Avant-bras', price: '[PRIX À DÉFINIR]' },
      { name: 'Maillot classique', price: '[PRIX À DÉFINIR]' },
      { name: 'Maillot intégral', price: '[PRIX À DÉFINIR]' },
      { name: 'Maillot brésilien', price: '[PRIX À DÉFINIR]' },
      { name: 'Demi-jambes', price: '[PRIX À DÉFINIR]' },
      { name: 'Jambes complètes', price: '[PRIX À DÉFINIR]' },
      { name: 'Orteils & pieds', price: '[PRIX À DÉFINIR]' },
      { name: 'Ventre (ligne de flottaison)', price: '[PRIX À DÉFINIR]' },
      { name: 'Dos complet', price: '[PRIX À DÉFINIR]' },
    ],
    note: 'Paiement en 3 ou 4 fois sans frais disponible pour les forfaits laser.',
  },
  {
    id: 'laser-homme',
    label: 'Épilation laser homme',
    icon: <Zap size={18} />,
    color: 'sage',
    items: [
      { name: 'Nuque', price: '[PRIX À DÉFINIR]' },
      { name: 'Oreilles', price: '[PRIX À DÉFINIR]' },
      { name: 'Nez', price: '[PRIX À DÉFINIR]' },
      { name: 'Sourcils', price: '[PRIX À DÉFINIR]' },
      { name: 'Barbe (contour)', price: '[PRIX À DÉFINIR]' },
      { name: 'Aisselles', price: '[PRIX À DÉFINIR]' },
      { name: 'Torse / pectoraux', price: '[PRIX À DÉFINIR]' },
      { name: 'Abdomen', price: '[PRIX À DÉFINIR]' },
      { name: 'Dos complet', price: '[PRIX À DÉFINIR]' },
      { name: 'Épaules', price: '[PRIX À DÉFINIR]' },
      { name: 'Bras complets', price: '[PRIX À DÉFINIR]' },
      { name: 'Jambes complètes', price: '[PRIX À DÉFINIR]' },
      { name: 'Demi-jambes', price: '[PRIX À DÉFINIR]' },
      { name: 'Maillot homme', price: '[PRIX À DÉFINIR]' },
    ],
    note: 'Paiement en 3 ou 4 fois sans frais disponible pour les forfaits laser.',
  },
  {
    id: 'forfaits-laser',
    label: 'Forfaits laser',
    icon: <Star size={18} />,
    color: 'sand',
    items: [
      { name: 'Forfait 6 séances – 1 zone', price: '[PRIX À DÉFINIR]' },
      { name: 'Forfait 8 séances – 1 zone', price: '[PRIX À DÉFINIR]' },
      { name: 'Forfait 10 séances – 1 zone', price: '[PRIX À DÉFINIR]' },
      { name: 'Forfait duo – 2 zones (6 séances)', price: '[PRIX À DÉFINIR]' },
      { name: 'Forfait trio – 3 zones (6 séances)', price: '[PRIX À DÉFINIR]' },
      { name: 'Forfait corps complet femme', price: 'Sur devis' },
      { name: 'Forfait corps complet homme', price: 'Sur devis' },
    ],
    note: 'Paiement en 3 ou 4 fois sans frais pour tout forfait laser. Contactez-nous pour un devis personnalisé selon vos zones et votre nombre de séances.',
  },
  {
    id: 'soins-visage',
    label: 'Soins visage',
    icon: <Leaf size={18} />,
    color: 'sage',
    items: [
      {
        name: 'Soin Éclat Express',
        price: '[PRIX À DÉFINIR]',
        note: 'Soin rapide et revitalisant pour un teint lumineux en toutes circonstances.',
      },
      {
        name: 'Soin Bio-Expert',
        price: '[PRIX À DÉFINIR]',
        note: 'Protocole naturel à base de formules bio pour peaux sensibles et exigeantes.',
      },
      {
        name: 'Soin Human',
        price: '[PRIX À DÉFINIR]',
        note: 'Soin holistique adapté à chaque type de peau, combinant technicité et bien-être.',
      },
    ],
  },
  {
    id: 'kobido',
    label: 'Kobido',
    icon: <Hand size={18} />,
    color: 'nude',
    items: [
      {
        name: 'Kobido express (30 min)',
        price: '[PRIX À DÉFINIR]',
        note: 'Massage facial tonifiant pour une pause ressourçante express.',
      },
      {
        name: 'Kobido complet (60 min)',
        price: '[PRIX À DÉFINIR]',
        note: 'Protocole complet pour un véritable lifting naturel et une détente profonde.',
      },
      {
        name: 'Soin Sublime & Kobido (90 min)',
        price: '[PRIX À DÉFINIR]',
        note: "Alliance d\'un soin visage personnalisé et d\'un massage Kobido pour un résultat optimal.",
      },
      { name: 'Forfait 3 séances Kobido complet', price: '[PRIX À DÉFINIR]' },
      { name: 'Forfait 5 séances Kobido complet', price: '[PRIX À DÉFINIR]' },
    ],
  },
  {
    id: 'massages',
    label: 'Massages',
    icon: <Wind size={18} />,
    color: 'sand',
    items: [
      {
        name: 'Massage Abhyanga (60 min)',
        price: '[PRIX À DÉFINIR]',
        note: "Massage ayurvédique aux huiles chaudes pour rééquilibrer le corps et l\'esprit.",
      },
      {
        name: 'Massage Balinais (60 min)',
        price: '[PRIX À DÉFINIR]',
        note: 'Alliance de pétrissage profond et de pressions douces pour une détente totale.',
      },
      {
        name: 'Massage Balinais (90 min)',
        price: '[PRIX À DÉFINIR]',
        note: 'Version prolongée pour une immersion bien-être complète.',
      },
      {
        name: 'Massage Pré-Natal (60 min)',
        price: '[PRIX À DÉFINIR]',
        note: 'Massage adapté aux futures mamans, réalisé en position sécurisée.',
      },
      {
        name: 'Massage Post-Natal (60 min)',
        price: '[PRIX À DÉFINIR]',
        note: "Massage doux et récupérateur pour accompagner le corps après l\'accouchement.",
      },
    ],
  },
  {
    id: 'drainage',
    label: 'Drainage & Maderothérapie',
    icon: <Droplets size={18} />,
    color: 'sage',
    items: [
      { name: 'Drainage lymphatique manuel (45 min)', price: '[PRIX À DÉFINIR]' },
      { name: 'Drainage lymphatique manuel (60 min)', price: '[PRIX À DÉFINIR]' },
      { name: 'Maderothérapie corps (45 min)', price: '[PRIX À DÉFINIR]' },
      { name: 'Maderothérapie corps (60 min)', price: '[PRIX À DÉFINIR]' },
      { name: 'Combo Drainage + Maderothérapie (75 min)', price: '[PRIX À DÉFINIR]' },
    ],
  },
  {
    id: 'cure',
    label: 'Cure 10 séances',
    icon: <Tag size={18} />,
    color: 'nude',
    items: [
      {
        name: 'Cure Drainage & Remodelage Naturel – 10 séances',
        price: 'Sur devis',
        note: 'Programme complet alliant drainage lymphatique et maderothérapie pour des résultats durables sur le galbe, la silhouette et la circulation.',
      },
    ],
    note: 'Programme personnalisé selon vos objectifs. Contactez-nous pour établir un devis et un planning adaptés.',
  },
];

const filterTabs = [
  { id: 'tous', label: 'Tous' },
  { id: 'laser-femme', label: 'Laser femme' },
  { id: 'laser-homme', label: 'Laser homme' },
  { id: 'forfaits-laser', label: 'Forfaits laser' },
  { id: 'soins-visage', label: 'Soins visage' },
  { id: 'kobido', label: 'Kobido' },
  { id: 'massages', label: 'Massages' },
  { id: 'drainage', label: 'Drainage' },
  { id: 'cure', label: 'Cure 10 séances' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColorBadge({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    nude: 'bg-nude-50 text-nude-700 border-nude-200',
    sage: 'bg-sage-50 text-sage-700 border-sage-200',
    sand: 'bg-sand-50 text-sand-700 border-sand-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${map[color] ?? map.nude}`}>
      {children}
    </span>
  );
}

function PriceCategoryCard({ category }: { category: PriceCategory }) {
  const headerColors: Record<string, string> = {
    nude: 'from-nude-600 to-nude-700',
    sage: 'from-sage-600 to-sage-700',
    sand: 'from-sand-600 to-sand-700',
  };

  return (
    <div id={category.id} className="card-service scroll-mt-32">
      {/* Card Header */}
      <div className={`bg-gradient-to-r ${headerColors[category.color] ?? headerColors.nude} p-6`}>
        <div className="flex items-center gap-3 text-white">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            {category.icon}
          </div>
          <h2 className="font-serif text-xl font-light tracking-wide">{category.label}</h2>
        </div>
      </div>

      {/* Price Table */}
      <div className="divide-y divide-sand-50">
        {category.items.map((item, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-4 px-6 py-4 hover:bg-sand-50/50 transition-colors duration-150"
          >
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm font-medium text-stone-700">{item.name}</p>
              {item.note && (
                <p className="font-sans text-xs text-stone-400 mt-0.5 leading-relaxed">{item.note}</p>
              )}
            </div>
            <div className="shrink-0">
              <ColorBadge color={category.color}>
                {item.price}
              </ColorBadge>
            </div>
          </div>
        ))}
      </div>

      {/* Category Note */}
      {category.note && (
        <div className="px-6 py-4 bg-sand-50 border-t border-sand-100">
          <div className="flex items-start gap-2">
            <Info size={14} className="text-sand-500 mt-0.5 shrink-0" />
            <p className="text-xs text-stone-500 leading-relaxed">{category.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Tarifs() {
  const [activeFilter, setActiveFilter] = useState<string>('tous');

  const visibleCategories =
    activeFilter === 'tous'
      ? categories
      : categories.filter((c) => c.id === activeFilter);

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-sand-50 to-cream section-padding">
        <div className="container-narrow">
          <Breadcrumb items={[{ label: 'Tarifs' }]} />
          <div className="mt-8 text-center">
            <span className="tag">Tarification transparente</span>
            <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-2">
              Nos tarifs
            </h1>
            <p className="mt-6 text-base md:text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Retrouvez l'ensemble de nos prestations et tarifs. Chaque soin est personnalisé
              selon vos besoins et votre peau, pour un résultat optimal.
            </p>

            {/* Disclaimer */}
            <div className="mt-8 inline-flex items-start gap-3 bg-white border border-sand-200 rounded-2xl px-6 py-4 text-left max-w-xl">
              <Info size={16} className="text-nude-500 mt-0.5 shrink-0" />
              <p className="text-xs text-stone-500 leading-relaxed">
                Les tarifs sont à titre indicatif et peuvent évoluer. Contactez-nous pour un
                devis personnalisé adapté à vos besoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Laser Payment Banner ── */}
      <div className="bg-nude-600 py-4">
        <div className="container-wide flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <CreditCard size={16} className="text-nude-200 shrink-0" />
          <p className="text-sm text-white">
            <span className="font-semibold">Épilation laser :</span> paiement en 3 ou 4 fois
            sans frais disponible sur les forfaits.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 text-nude-100 text-xs font-medium hover:text-white transition-colors underline underline-offset-2"
          >
            En savoir plus <ChevronRight size={12} />
          </Link>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-sand-100 shadow-sm">
        <div className="container-wide">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-200 ${
                  activeFilter === tab.id
                    ? 'bg-nude-600 text-white shadow-sm'
                    : 'bg-sand-50 text-stone-600 hover:bg-sand-100 hover:text-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Price Cards Grid ── */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visibleCategories.map((category) => (
              <PriceCategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Global note */}
          <div className="mt-12 bg-white border border-sand-200 rounded-2xl p-6 md:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Info size={18} className="text-nude-500" />
              <h3 className="font-serif text-lg text-stone-800 font-light">Informations tarifaires</h3>
            </div>
            <p className="text-sm text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Les tarifs affichés sont indicatifs et établis à titre d'information. Certaines
              prestations font l'objet d'un devis personnalisé selon la zone, le type de peau et
              le nombre de séances. N'hésitez pas à nous contacter pour plus d'informations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link to="/contact" className="btn-primary">
                Demander un devis
              </Link>
              <a href="tel:0762169814" className="btn-phone">
                07 62 16 98 14
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <CTABanner
        title="Prête à commencer votre parcours bien-être ?"
        subtitle="Réservez votre consultation ou appelez-nous pour un premier échange personnalisé."
      />
    </>
  );
}
