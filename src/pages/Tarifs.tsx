import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../lib/useMeta';
import {
  Leaf,
  Star,
  Zap,
  Hand,
  Wind,
  Droplets,
  Tag,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import { supabase } from '../lib/supabase';
import type { Tarif } from '../lib/supabase';

// ─── Static config (icônes, couleurs, notes catégorie) ───────────────────────

interface CategoryConfig {
  icon: React.ReactNode;
  color: string;
  note?: string;
  promoNote?: string;
  infoText?: string;
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  'laser-femme': {
    icon: <Leaf size={18} />,
    color: 'nude',
  },
  'laser-homme': {
    icon: <Zap size={18} />,
    color: 'sage',
  },
  'forfaits-laser': {
    icon: <Star size={18} />,
    color: 'sand',
    promoNote: 'Forfait 2 zones : -20€\nForfait 3 zones : -30€\nForfait 4 zones : -40€',
  },
  'soins-visage': {
    icon: <Leaf size={18} />,
    color: 'sage',
  },
  kobido: {
    icon: <Hand size={18} />,
    color: 'nude',
  },
  massages: {
    icon: <Wind size={18} />,
    color: 'sand',
  },
  drainage: {
    icon: <Droplets size={18} />,
    color: 'sage',
  },
  cure: {
    icon: <Info size={18} />,
    color: 'nude',
    infoText: `Recommandations avant / après une séance laser\nAfin de garantir l'efficacité et la sécurité du traitement, merci de respecter les consignes suivantes :\n\nAVANT LA SÉANCE :\n- Ne pas s'exposer au soleil ou aux UV (minimum 2 semaines avant)\n- Ne pas appliquer d'autobronzant\n- Raser la zone 24 à 48h avant la séance\n- Ne pas appliquer de crème, huile, parfum ou déodorant le jour J\n- Ne pas prendre de médicaments photosensibilisants (certains antibiotiques, traitements spécifiques...)\n- Ne pas utiliser d'huiles essentielles sur la zone\n\nCONTRE-INDICATIONS :\n- Grossesse / allaitement\n- Prise de traitements photosensibilisants\n- Exposition solaire récente\n- Certaines pathologies (à voir ensemble lors du bilan)\n\nAPRÈS LA SÉANCE :\n- Éviter le soleil et les UV pendant au moins 2 semaines\n- Éviter le sport, sauna, hammam et chaleur excessive pendant 24 à 48h\n- Ne pas appliquer de produits irritants sur la zone\n- Hydrater la peau si nécessaire\n\nLe respect de ces recommandations est essentiel pour garantir des résultats optimaux et éviter tout risque.`,
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface PriceCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  items: Tarif[];
  note?: string;
  promoNote?: string;
  infoText?: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// Formate une note en séparant chaque "•" et chaque " - " sur sa propre ligne
function formatNote(note: string): string[] {
  return note
    .split('\n')
    .flatMap((line) => {
      // Sépare sur les "•"
      const bulletParts = line.split(/(?=•)/).map((s) => s.trim()).filter(Boolean);
      const parts = bulletParts.length > 1 ? bulletParts : [line.trim()];
      // Pour chaque segment, sépare aussi sur " - " (tiret entouré d'espaces)
      return parts.flatMap((segment) =>
        segment
          .split(/(?= - )/)
          .map((s) => s.trim())
          .filter(Boolean)
      );
    })
    .filter(Boolean);
}

// Compte les mots dans un tableau de lignes
function countWords(lines: string[]): number {
  return lines.join(' ').split(/\s+/).filter(Boolean).length;
}

// Tronque le texte après N mots en préservant les lignes
function truncateToWords(lines: string[], maxWords: number): { preview: string[]; rest: string[] } {
  let wordCount = 0;
  let cutLine = 0;
  let cutChar = 0;
  for (let i = 0; i < lines.length; i++) {
    const words = lines[i].split(/\s+/).filter(Boolean);
    if (wordCount + words.length >= maxWords) {
      const needed = maxWords - wordCount;
      cutLine = i;
      cutChar = words.slice(0, needed).join(' ').length;
      break;
    }
    wordCount += words.length;
    cutLine = i + 1;
    cutChar = -1;
  }
  if (cutChar === -1) {
    return { preview: lines.slice(0, cutLine), rest: lines.slice(cutLine) };
  }
  const truncatedLine = lines[cutLine].slice(0, cutChar);
  const remainderLine = lines[cutLine].slice(cutChar).trim();
  const preview = [...lines.slice(0, cutLine), truncatedLine].filter(Boolean);
  const rest = [remainderLine, ...lines.slice(cutLine + 1)].filter(Boolean);
  return { preview, rest };
}

const WORD_LIMIT = 18;

function ItemNote({ note }: { note: string }) {
  const [open, setOpen] = useState(false);
  const lines = formatNote(note);
  const totalWords = countWords(lines);
  const hasMore = totalWords > WORD_LIMIT;
  const { preview, rest } = hasMore ? truncateToWords(lines, WORD_LIMIT) : { preview: lines, rest: [] };
  const visible = open ? lines : preview;

  return (
    <div className="mt-1.5" onClick={(e) => e.preventDefault()}>
      <div className="space-y-0.5">
        {visible.map((line, i) => (
          <p key={i} className="font-sans text-xs text-stone-400 leading-relaxed">
            {line}{!open && i === visible.length - 1 && hasMore && rest.length > 0 ? '…' : ''}
          </p>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={(e) => { e.preventDefault(); setOpen((v) => !v); }}
          className="mt-1 inline-flex items-center gap-0.5 text-xs text-nude-500 hover:text-nude-700 font-medium transition-colors"
        >
          {open ? (
            <><ChevronUp size={11} /> Réduire</>
          ) : (
            <><ChevronDown size={11} /> En savoir plus</>
          )}
        </button>
      )}
    </div>
  );
}

function CategoryNote({ note }: { note: string }) {
  const [open, setOpen] = useState(false);
  const lines = formatNote(note);
  const totalWords = countWords(lines);
  const hasMore = totalWords > WORD_LIMIT;
  const { preview, rest } = hasMore ? truncateToWords(lines, WORD_LIMIT) : { preview: lines, rest: [] };
  const visible = open ? lines : preview;

  return (
    <div>
      <div className="space-y-0.5">
        {visible.map((line, i) => (
          <p key={i} className="text-xs text-stone-500 leading-relaxed">
            {line}{!open && i === visible.length - 1 && hasMore && rest.length > 0 ? '…' : ''}
          </p>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-1.5 inline-flex items-center gap-0.5 text-xs text-nude-500 hover:text-nude-700 font-medium transition-colors"
        >
          {open ? (
            <><ChevronUp size={11} /> Réduire</>
          ) : (
            <><ChevronDown size={11} /> En savoir plus</>
          )}
        </button>
      )}
    </div>
  );
}

function ColorBadge({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    nude: 'bg-nude-50 text-nude-700 border-nude-200 group-hover:bg-nude-200 group-hover:text-nude-800 group-hover:border-nude-300',
    sage: 'bg-sage-50 text-sage-700 border-sage-200 group-hover:bg-sage-200 group-hover:text-sage-800 group-hover:border-sage-300',
    sand: 'bg-sand-50 text-sand-700 border-sand-200 group-hover:bg-sand-200 group-hover:text-sand-800 group-hover:border-sand-300',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 ${map[color] ?? map.nude}`}>
      {children}
    </span>
  );
}

function PriceCategoryCard({ category }: { category: PriceCategory }) {
  const [infoOpen, setInfoOpen] = useState(false);

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

      {/* Promo Note */}
      {category.promoNote && (
        <div className="px-6 py-3 bg-sand-100 border-b border-sand-200 flex items-center gap-2">
          <Tag size={13} className="text-sand-600 shrink-0" />
          <p className="text-xs font-medium text-sand-700 whitespace-pre-line">{category.promoNote}</p>
        </div>
      )}

      {/* Info dépliable */}
      {category.infoText && (
        <div className="border-b border-nude-100 bg-nude-50/40 px-6 py-4">
          <div className="flex items-start gap-2 mb-2">
            <Info size={13} className="text-nude-500 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-nude-700 uppercase tracking-wide">Laser</p>
          </div>

          {/* Contenu — tronqué ou complet */}
          <div className={`text-xs text-stone-500 leading-relaxed space-y-2 ${!infoOpen ? 'line-clamp-2' : ''}`}>
            {category.infoText.split('\n\n').map((block, i) => {
              const lines = block.split('\n');
              const title = lines[0];
              const rest = lines.slice(1);
              return (
                <div key={i}>
                  {title && (
                    <p className={`font-semibold text-stone-600 ${i > 0 ? 'mt-2' : ''}`}>{title}</p>
                  )}
                  {rest.map((line, j) => (
                    <p key={j} className="pl-1">{line}</p>
                  ))}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setInfoOpen((v) => !v)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-nude-600 hover:text-nude-700 transition-colors"
          >
            {infoOpen ? (
              <><ChevronUp size={13} /> Réduire</>
            ) : (
              <><ChevronDown size={13} /> En savoir plus</>
            )}
          </button>
        </div>
      )}

      {/* Price Table */}
      <div className="divide-y divide-sand-50">
        {category.items.map((item) => (
          <a
            key={item.id}
            href="https://www.planity.com/soleana-bien-etre-31810-venerque"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between gap-4 px-6 py-4 hover:bg-nude-50/60 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-sans text-sm font-medium text-stone-700 group-hover:text-nude-700 transition-colors duration-200">
                  {item.name}
                </p>
                <ExternalLink
                  size={11}
                  className="text-nude-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 mt-0.5"
                />
              </div>
              {item.note && <ItemNote note={item.note} />}
            </div>
            <div className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
              <ColorBadge color={category.color}>
                {item.price}
              </ColorBadge>
            </div>
          </a>
        ))}
      </div>

      {/* Category Note */}
      {category.note && (
        <div className="px-6 py-4 bg-sand-50 border-t border-sand-100">
          <div className="flex items-start gap-2">
            <Info size={14} className="text-sand-500 mt-0.5 shrink-0" />
            <CategoryNote note={category.note} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Tarifs() {
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('tous');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('tarifs')
        .select('*')
        .eq('visible', true)
        .order('category_order', { ascending: true })
        .order('item_order', { ascending: true });

      if (!error && data) {
        const map = new Map<string, PriceCategory>();
        for (const tarif of data as Tarif[]) {
          if (!map.has(tarif.category_id)) {
            const config = CATEGORY_CONFIG[tarif.category_id] ?? { icon: <Tag size={18} />, color: 'nude' };
            map.set(tarif.category_id, {
              id: tarif.category_id,
              label: tarif.category_label,
              icon: config.icon,
              color: config.color,
              note: config.note,
              promoNote: config.promoNote,
              infoText: config.infoText,
              items: [],
            });
          }
          map.get(tarif.category_id)!.items.push(tarif);
        }
        setCategories(Array.from(map.values()));
      }
      setLoading(false);
    }
    load();
  }, []);

  const filterTabs = [
    { id: 'tous', label: 'Tous' },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ];

  const visibleCategories =
    activeFilter === 'tous'
      ? categories
      : categories.filter((c) => c.id === activeFilter);

  return (
    <>
      <PageMeta
        title="Tarifs soins & épilation laser Venerque | Soléana"
        description="Tous les tarifs de Soléana Bien-Être à Venerque (31) : épilation laser, Kobido, soins du visage, massages, drainage. Transparent, sans surprise. Réservez en ligne sur Planity."
      />
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-sand-50 to-cream section-padding">
        <div className="container-narrow">
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
          </div>
        </div>
      </section>

      {/* ── Laser Payment Banner ── */}

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
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card-service animate-pulse">
                  <div className="h-20 bg-stone-200 rounded-t-2xl" />
                  <div className="p-6 space-y-3">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex justify-between">
                        <div className="h-4 bg-stone-100 rounded w-2/3" />
                        <div className="h-4 bg-stone-100 rounded w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleCategories.map((category) => (
                <PriceCategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}

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
