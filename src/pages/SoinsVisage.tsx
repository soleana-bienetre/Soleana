import { Link } from 'react-router-dom';
import {
  Leaf,
  Heart,
  Clock,
  CheckCircle,
  Phone,
  Star,
  Droplets,
  Shield,
  Zap,
  Calendar,
  ChevronRight,
  Award,
  Info,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import FAQAccordion from '../components/ui/FAQAccordion';
import { useSiteImages } from '../contexts/SiteImagesContext';
import { PageMeta, FAQSchema, ServiceSchema, BreadcrumbSchema } from '../lib/useMeta';
import { useCategoryTarifs } from '../lib/useTarifs';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface SoinCard {
  slug: string;
  tag: string;
  titre: string;
  sousTitre: string;
  duree: string;
  prix: string;
  description: string;
  bienfaits: string[];
  accentBg: string;
  accentText: string;
  iconBg: string;
  icon: React.ReactNode;
  highlight?: string;
}

const soins: SoinCard[] = [
  {
    slug: 'eclat-express',
    tag: 'Soin express',
    titre: 'Soin Éclat Express',
    sousTitre: "Un coup d\'éclat en moins d\'une heure",
    duree: '30 min',
    prix: 'Sur demande',
    description:
      "Le Soin Éclat Express est conçu pour les peaux ternes qui ont besoin d\'un boost lumineux rapide. Grâce à une combinaison ciblée de soins actifs, il unifie le teint, resserre les pores et restaure la vitalité de l\'épiderme en une seule séance. Idéal avant un événement ou en cure mensuelle pour maintenir l\'éclat au quotidien.",
    bienfaits: [
      'Teint unifié et lumineux dès la première séance',
      'Pores affinés et grain de peau lissé',
      'Hydratation immédiate et durable',
      'Séance courte adaptée aux emplois du temps chargés',
    ],
    accentBg: 'bg-sand-50',
    accentText: 'text-sand-700',
    iconBg: 'bg-sand-100',
    icon: <Zap size={22} className="text-sand-600" />,
  },
  {
    slug: 'bio-expert',
    tag: 'Soin signature',
    titre: 'Soin Visage Bio-Expert',
    sousTitre: "L\'expertise bio au service de votre peau",
    duree: '60 min',
    prix: '75€',
    description:
      'Le Soin Visage Bio-Expert est notre protocole phare issu de la gamme Estime & Sens. Il combine des actifs biologiques certifiés, des techniques de modelage facial et une personnalisation poussée selon votre type de peau. Peeling doux, masque actif, sérums concentrés : chaque étape est sélectionnée pour répondre précisément aux besoins de votre épiderme.',
    bienfaits: [
      "Actifs bio certifiés respectueux de l\'équilibre cutané",
      'Peeling enzymatique doux pour un renouvellement cellulaire',
      'Rééquilibrage du microbiome cutané',
      'Modelage facial pour stimuler la microcirculation',
      'Résultat visible et peau durablement améliorée',
    ],
    accentBg: 'bg-sage-50',
    accentText: 'text-sage-700',
    iconBg: 'bg-sage-100',
    icon: <Leaf size={22} className="text-sage-600" />,
    highlight: 'Soin le plus demandé',
  },
  {
    slug: 'human',
    tag: 'Soin visage',
    titre: 'Soin Visage Human',
    sousTitre: "Un soin issu de la gamme Human",
    duree: '60 min',
    prix: 'Sur demande',
    description:
      "Le Soin Visage Human est un soin du visage adapté aux femmes comme aux hommes, réalisé avec la gamme Human d'Estime & Sens. Il associe nettoyage, hydratation, modelage et actifs ciblés pour apporter confort, éclat et détente, selon les besoins de votre peau.",
    bienfaits: [
      'Nettoyage et hydratation adaptés aux besoins de la peau',
      'Modelage relaxant du visage',
      'Actifs ciblés selon le diagnostic cutané',
      'Confort, éclat et sensation de peau nette',
      'Soin adapté aux femmes comme aux hommes',
    ],
    accentBg: 'bg-nude-50',
    accentText: 'text-nude-700',
    iconBg: 'bg-nude-100',
    icon: <Award size={22} className="text-nude-600" />,
    highlight: 'Gamme Human',
  },
];

const ESTIME_HOMME_URL = 'https://www.estime-et-sens.fr/soin/homme/';

function SoinDescription({ soin }: { soin: SoinCard }) {
  if (soin.slug !== 'human') {
    return <>{soin.description}</>;
  }

  const linkText = 'Estime & Sens';
  const [before, after] = soin.description.split(linkText);

  return (
    <>
      {before}
      <a
        href={ESTIME_HOMME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-nude-700 underline underline-offset-2 hover:text-nude-800 transition-colors"
      >
        {linkText}
      </a>
      {after}
    </>
  );
}

const etapes = [
  {
    num: '01',
    titre: 'Accueil & diagnostic cutané',
    desc: 'Votre praticienne analyse votre peau : type cutané, problématiques (sécheresse, imperfections, éclat, âge), sensibilités et mode de vie. Ce bilan oriente le choix du soin et des actifs.',
    icon: <Star size={16} className="text-nude-600" />,
  },
  {
    num: '02',
    titre: 'Démaquillage & nettoyage',
    desc: 'Un double nettoyage en douceur élimine les impuretés, le maquillage et les résidus de pollution, préparant la peau à recevoir les actifs qui suivront.',
    icon: <Droplets size={16} className="text-nude-600" />,
  },
  {
    num: '03',
    titre: 'Exfoliation & peeling',
    desc: "Selon votre type de peau, un gommage enzymatique ou mécanique doux est appliqué pour débarrasser l\'épiderme des cellules mortes et favoriser le renouvellement cellulaire.",
    icon: <Leaf size={16} className="text-nude-600" />,
  },
  {
    num: '04',
    titre: 'Application des soins actifs',
    desc: 'Sérum concentré, masque personnalisé… chaque produit est sélectionné en fonction des résultats du diagnostic pour répondre précisément aux besoins de votre peau.',
    icon: <Leaf size={16} className="text-nude-600" />,
  },
  {
    num: '05',
    titre: 'Modelage & drainage',
    desc: 'Des techniques de modelage manuel stimulent la microcirculation, favorisent le drainage lymphatique et procurent une profonde détente.',
    icon: <Heart size={16} className="text-nude-600" />,
  },
  {
    num: '06',
    titre: 'Hydratation & protection finales',
    desc: "La séance se conclut par l\'application d\'une crème hydratante adaptée à votre peau. Votre praticienne vous remet ses conseils de soin à domicile.",
    icon: <Shield size={16} className="text-nude-600" />,
  },
];

const typesPeau = [
  {
    type: 'Peau sèche à très sèche',
    desc: 'Inconfort, tiraillements, manque de souplesse. Nos soins hydratants et nutritifs restaurent le film protecteur et apportent un confort durable.',
    icon: <Droplets size={20} />,
    bg: 'bg-nude-50',
    border: 'border-nude-200',
    iconColor: 'text-nude-600',
    iconBg: 'bg-nude-100',
  },
  {
    type: 'Peau mixte à grasse',
    desc: 'Brillances en zone T, pores dilatés, imperfections. Les formulations séborégulatrices équilibrent sans agresser et affinent le grain de peau.',
    icon: <Shield size={20} />,
    bg: 'bg-sage-50',
    border: 'border-sage-200',
    iconColor: 'text-sage-600',
    iconBg: 'bg-sage-100',
  },
  {
    type: 'Peau sensible & réactive',
    desc: "Rougeurs, réactivité, inconforts. Les actifs apaisants et les formulations hypoallergéniques d\'Estime & Sens calment et renforcent la barrière cutanée.",
    icon: <Heart size={20} />,
    bg: 'bg-sand-50',
    border: 'border-sand-200',
    iconColor: 'text-sand-600',
    iconBg: 'bg-sand-100',
  },
  {
    type: 'Peau mature & marquée',
    desc: "Relâchement, ridules, perte d\'éclat. Les protocoles anti-âge et tenseurs stimulent la synthèse de collagène et redensifient les tissus.",
    icon: <Leaf size={20} />,
    bg: 'bg-nude-50',
    border: 'border-nude-200',
    iconColor: 'text-nude-600',
    iconBg: 'bg-nude-100',
  },
  {
    type: 'Peau terne & fatiguée',
    desc: "Teint brouillé, manque de luminosité. Nos boosters d\'éclat et les soins énergisants restaurent la vitalité du teint en une seule séance.",
    icon: <Zap size={20} />,
    bg: 'bg-sage-50',
    border: 'border-sage-200',
    iconColor: 'text-sage-600',
    iconBg: 'bg-sage-100',
  },
  {
    type: 'Peau à tendance acnéique',
    desc: 'Comédons, points noirs, imperfections persistantes. Les actifs purifiants et les techniques de drainage agissent en profondeur sans déclencher de réactions.',
    icon: <Leaf size={20} />,
    bg: 'bg-sand-50',
    border: 'border-sand-200',
    iconColor: 'text-sand-600',
    iconBg: 'bg-sand-100',
  },
];

const bienfaits = [
  {
    icon: <Leaf size={24} className="text-nude-600" />,
    titre: 'Teint lumineux',
    desc: 'Résultat visible dès la première séance : teint unifié, peau repulpée et éclat retrouvé.',
  },
  {
    icon: <Shield size={24} className="text-nude-600" />,
    titre: 'Barrière renforcée',
    desc: 'Les actifs bio renforcent le film hydrolipidique et protègent durablement contre les agressions extérieures.',
  },
  {
    icon: <Heart size={24} className="text-nude-600" />,
    titre: 'Détente profonde',
    desc: 'Au-delà du soin esthétique, nos protocoles induisent un véritable état de relaxation grâce aux techniques de modelage.',
  },
  {
    icon: <Leaf size={24} className="text-nude-600" />,
    titre: 'Formules bio & éthiques',
    desc: 'Tous les produits Estime & Sens sont certifiés biologiques, vegan-friendly et formulés sans perturbateurs endocriniens.',
  },
  {
    icon: <Star size={24} className="text-nude-600" />,
    titre: 'Protocole sur-mesure',
    desc: 'Chaque soin est adapté à votre diagnostic du jour pour une réponse précise à vos besoins réels.',
  },
  {
    icon: <Award size={24} className="text-nude-600" />,
    titre: 'Expertise professionnelle',
    desc: 'Votre praticienne est formée aux techniques et produits Estime & Sens pour vous garantir un soin de haute qualité.',
  },
];

const faqItems = [
  {
    question: 'À quelle fréquence dois-je réaliser un soin visage ?',
    answer:
      "La fréquence idéale varie selon votre type de peau et vos objectifs. En règle générale, un soin mensuel est recommandé pour entretenir l\'équilibre cutané et maintenir les résultats. Pour traiter des problématiques spécifiques (acné, hyperpigmentation, anti-âge), votre praticienne peut préconiser des séances plus rapprochées au départ, espacées ensuite en phase d\'entretien.",
  },
  {
    question: 'Les soins Estime & Sens conviennent-ils aux peaux sensibles ?',
    answer:
      "Oui. La gamme Estime & Sens est précisément formulée pour respecter les peaux sensibles, réactives ou fragilisées, notamment après certains traitements ou cures, adaptée à vos besoins médicaux entraînant une période de grande sensibilité cutanée. Les formules sont hypoallergéniques, sans parfum de synthèse ni composants perturbateurs. Elles contiennent des actifs apaisants comme l\'aloe vera biologique, la camomille et le calendula. Un diagnostic préalable permet néanmoins de s\'assurer du protocole adapté à votre peau.",
  },
  {
    question: 'Quelle est la différence entre le Soin Bio-Expert et le Soin Human ?',
    answer:
      "Le Soin Bio-Expert est un soin personnalisé, adapté aux besoins spécifiques de votre peau au moment de la séance. Il convient aussi bien aux femmes qu'aux hommes, et s'appuie sur les actifs bio Estime & Sens pour nourrir, apaiser ou rééquilibrer la peau selon son état du jour. Le Soin Human utilise quant à lui une gamme spécifiquement formulée pour les hommes, avec des textures, des senteurs et des produits adaptés à la peau masculine — dont des produits dédiés à la barbe. Les deux soins sont distincts et sans notion de hiérarchie.",
  },
  {
    question: 'Puis-je me maquiller directement après un soin visage ?',
    answer:
      "Il est conseillé d\'attendre au minimum 4 à 6 heures après le soin avant d\'appliquer du maquillage, afin de laisser les actifs agir pleinement et la peau se stabiliser. Dans l\'idéal, profitez d\'une journée sans maquillage pour maximiser les bienfaits du soin. Votre praticienne vous donnera des recommandations personnalisées selon le protocole réalisé.",
  },
  {
    question: 'Les soins visage sont-ils adaptés aux hommes ?',
    answer:
      "Absolument. Nos soins visage s\'adressent à toutes et tous, quel que soit le genre. La peau masculine présente des caractéristiques spécifiques (épaisseur plus importante, séborrhée plus active, irritations liées au rasage) qui sont prises en compte lors du diagnostic et dans le choix du protocole adapté.",
  },
  {
    question: 'Comment préparer ma peau avant un soin visage ?',
    answer:
      "Arrivez de préférence sans maquillage, ou votre praticienne s\'en chargera au début du soin. Évitez d\'utiliser des produits exfoliants (gommages, rétinoïdes, acides) dans les 48 heures précédant le rendez-vous. Si vous avez récemment subi une exposition solaire importante, signalez-le à votre praticienne. Aucune préparation particulière n\'est nécessaire au-delà de ces précautions.",
  },
];

// ---------------------------------------------------------------------------
// Page principale
// ---------------------------------------------------------------------------

export default function SoinsVisage() {
  const { getUrl } = useSiteImages();
  const { getPrice } = useCategoryTarifs('soins-visage');

  const soinsWithPrices = soins.map((s) => ({ ...s, prix: getPrice(s.titre, s.prix) }));

  return (
    <main className="bg-cream">
      <PageMeta
        title="Soins du visage à Venerque – Sur-mesure | Soléana"
        description="Soins du visage personnalisés à Venerque (31) : hydratation, éclat, anti-âge et peau sensible. Diagnostic cutané offert avec produits bio Estime & Sens."
        url="https://www.soleana-bienetre.com/soins-visage"
      />
      <FAQSchema items={faqItems} pageUrl="https://www.soleana-bienetre.com/soins-visage" />
      <ServiceSchema
        name="Soins du visage"
        description="Soins du visage personnalisés à Venerque (31) : hydratation, éclat, anti-âge et peau sensible. Diagnostic cutané offert avec produits bio Estime & Sens."
        url="https://www.soleana-bienetre.com/soins-visage"
        serviceType="Soin du visage"
      />
      <BreadcrumbSchema items={[{ name: 'Soins du visage', url: 'https://www.soleana-bienetre.com/soins-visage' }]} />
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-nude-50 via-cream to-sand-50 overflow-hidden">
        <div className="absolute inset-0 bg-texture opacity-50 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-nude-200/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-sand-200/30 blur-2xl pointer-events-none" />

        <div className="relative container-wide section-padding">

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="tag">Institut Soléana Bien-Être · Venerque</span>
              <h1 className="mt-2 mb-6 text-stone-800 text-balance">
                Soins du visage<br />
                <span className="text-nude-600">à Venerque</span>
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-xl">
                À l'institut Soléana Bien-Être, chaque soin du visage commence par un diagnostic cutané
                personnalisé. Nous sélectionnons les protocoles et les actifs les mieux adaptés à votre
                peau pour vous offrir une expérience sur-mesure, à la fois efficace et profondément
                relaxante.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  <Calendar size={16} />
                  Prendre rendez-vous
                </Link>
                <a href="tel:0762169814" className="btn-phone">
                  <Phone size={16} />
                  07 62 16 98 14
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: <Leaf size={12} />, label: 'Produits bio certifiés' },
                  { icon: <Shield size={12} />, label: 'Diagnostic inclus' },
                  { icon: <Heart size={12} />, label: 'Peau sensible bienvenus' },
                  { icon: <Leaf size={12} />, label: 'Résultat visible' },
                ].map((b, i) => (
                  <span key={i} className="badge">
                    {b.icon}
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Colonne droite — Carte intro visuelle */}
            <div className="relative hidden lg:block">
              <div className="bg-white rounded-3xl p-8 shadow-md border border-sand-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-nude-100 flex items-center justify-center">
                    <Leaf size={18} className="text-nude-600" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-stone-800 text-sm">Soléana Bien-Être</p>
                    <p className="font-sans text-stone-400 text-xs">Institut de beauté · Venerque</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {soins.map((s) => (
                    <div
                      key={s.slug}
                      className={`flex items-center justify-between p-3 rounded-xl ${s.accentBg} border border-sand-100`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center`}>
                          {s.icon}
                        </div>
                        <div>
                          <p className="font-sans font-medium text-stone-700 text-sm">{s.titre}</p>
                          <p className="font-sans text-stone-400 text-xs">{s.duree}</p>
                        </div>
                      </div>
                      {s.highlight && (
                        <span className={`text-xs font-sans font-medium ${s.accentText} bg-white/60 px-2 py-0.5 rounded-full`}>
                          {s.highlight}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-sand-100">
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="text-sand-500 fill-sand-400" />
                    <Star size={14} className="text-sand-500 fill-sand-400" />
                    <Star size={14} className="text-sand-500 fill-sand-400" />
                    <Star size={14} className="text-sand-500 fill-sand-400" />
                    <Star size={14} className="text-sand-500 fill-sand-400" />
                  </div>
                  <span className="text-xs text-stone-400 font-sans">Soins certifiés bio Estime & Sens</span>
                </div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -bottom-4 -left-4 bg-sage-600 text-white rounded-2xl px-4 py-2 shadow-lg text-sm font-sans font-medium">
                <Leaf size={13} className="inline mr-1.5 mb-0.5" />
                100% bio & éthique
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* NOTRE APPROCHE                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <span className="tag">Notre philosophie</span>
          <h2 className="section-title mb-6">Notre approche des soins visage</h2>
          <p className="text-stone-600 leading-relaxed mb-4 text-lg">
            Chez Soléana Bien-Être, chaque soin du visage est pensé sur mesure. Avant de commencer,
            nous prenons le temps d'observer votre peau, d'échanger sur vos besoins et de réaliser
            un{' '}
            <strong className="text-stone-700 font-medium">diagnostic cutané précis</strong> afin
            d'adapter le soin.
          </p>
          <p className="text-stone-600 leading-relaxed mb-4 text-lg">
            Votre peau évolue au fil des saisons, du stress, de l'alimentation, des émotions ou encore
            des variations hormonales. C'est pourquoi chaque séance est ajustée avec soin : choix des
            actifs, gestuelle, intensité du modelage et conseils personnalisés sont adaptés pour répondre
            au plus près à ses besoins.
          </p>
          <p className="text-stone-600 leading-relaxed text-lg">
            Notre approche conjugue efficacité des formules et plaisir sensoriel. Vous repartez avec une
            peau transformée et un état d'esprit apaisé.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              {
                icon: <Star size={18} className="text-nude-600" />,
                titre: 'Diagnostic personnalisé',
                desc: 'Bilan cutané à chaque visite pour adapter précisément le protocole.',
              },
              {
                icon: <Leaf size={18} className="text-sage-600" />,
                titre: 'Actifs bio sélectionnés',
                desc: 'Des ingrédients certifiés biologiques pour une efficacité sans compromis.',
              },
              {
                icon: <Heart size={18} className="text-nude-600" />,
                titre: 'Bien-être global',
                desc: 'Soin du visage et relaxation réunis pour une expérience complète.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-sand-50 rounded-2xl p-5 border border-sand-100 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                  {item.icon}
                </div>
                <h4 className="font-serif text-base font-medium text-stone-800 mb-1">{item.titre}</h4>
                <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ESTIME & SENS                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-sage-50">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Texte */}
            <div>
              <span className="tag">Notre marque partenaire</span>
              <h2 className="section-title mb-6">
                Estime &amp; Sens — <br />
                <span className="text-sage-700">La beauté bio responsable</span>
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Soléana Bien-Être a choisi de travailler exclusivement avec la marque française{' '}
                <strong className="text-stone-700 font-medium">Estime &amp; Sens</strong>, référence dans
                le domaine des cosmétiques biologiques professionnels. Fondée sur des valeurs de respect —
                de la peau, des personnes et de la planète — cette gamme propose des formules d'une
                efficacité prouvée, sans compromis sur l'éthique.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Chaque produit est formulé en France à partir d'ingrédients d'origine naturelle
                sélectionnés pour leur pureté et leur biodisponibilité. Les actifs végétaux sont issus de
                cultures biologiques contrôlées, et les formules sont exemptes de parabènes, silicones,
                PEG, colorants et parfums de synthèse.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Une marque qui soigne aussi bien la peau que la conscience.
              </p>
            </div>

            {/* Valeurs de la marque */}
            <div className="bg-white rounded-3xl p-8 border border-sage-100 shadow-sm">
              <h3 className="font-serif text-xl font-light text-stone-800 mb-6">
                Les engagements Estime &amp; Sens
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Leaf size={16} className="text-sage-600" />,
                    label: 'Certifié Ecocert Cosmos Organic',
                    detail: 'Les formules respectent les standards biologiques les plus exigeants',
                  },
                  {
                    icon: <Shield size={16} className="text-sage-600" />,
                    label: 'Sans ingrédients controversés',
                    detail: 'Aucun perturbateur endocrinien, silicone, PEG ni paraben',
                  },
                  {
                    icon: <Heart size={16} className="text-sage-600" />,
                    label: 'Non testé sur les animaux',
                    detail: 'Engagement cruelty-free respecté à toutes les étapes',
                  },
                  {
                    icon: <CheckCircle size={16} className="text-sage-600" />,
                    label: 'Formulation française',
                    detail: 'Produits développés et fabriqués en France avec des actifs traçables',
                  },
                  {
                    icon: <Award size={16} className="text-sage-600" />,
                    label: 'Efficacité cliniquement éprouvée',
                    detail: 'Tests dermatologiques et études cliniques disponibles sur demande',
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-sage-100 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-sans font-medium text-stone-700 text-sm">{item.label}</p>
                      <p className="font-sans text-stone-400 text-xs leading-relaxed">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* LES 3 SOINS                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white" id="nos-soins">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">La carte des soins</span>
            <h2 className="section-title mb-4">Nos soins du visage</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Trois protocoles conçus pour répondre à toutes les attentes : de la pause express au rituel
              sensoriel complet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {soinsWithPrices.map((soin) => (
              <div
                key={soin.slug}
                className="card-service bg-white border border-sand-100 flex flex-col overflow-hidden"
              >
                {/* En-tête colorée */}
                <div className={`${soin.accentBg} px-6 pt-6 pb-4 border-b border-sand-100`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${soin.iconBg} flex items-center justify-center`}>
                      {soin.icon}
                    </div>
                    {soin.highlight && (
                      <span className={`text-xs font-sans font-semibold ${soin.accentText} bg-white px-2.5 py-1 rounded-full shadow-sm`}>
                        {soin.highlight}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-sans font-medium tracking-widest uppercase ${soin.accentText} mb-1 block`}>
                    {soin.tag}
                  </span>
                  <h3 className="font-serif text-2xl font-light text-stone-800 mb-0.5">{soin.titre}</h3>
                  <p className="text-sm text-stone-500 font-sans">{soin.sousTitre}</p>
                </div>

                {/* Corps */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Méta */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-sans text-stone-400">
                      <Clock size={12} />
                      {soin.duree}
                    </span>
                    <span className="text-stone-200">·</span>
                    <span className="font-sans font-semibold text-stone-700 text-sm">{soin.prix}</span>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed mb-5 flex-1">
                    <SoinDescription soin={soin} />
                  </p>

                  {/* Bienfaits */}
                  <div className="mb-5">
                    <p className="font-sans font-semibold text-stone-700 text-xs uppercase tracking-wider mb-3">
                      Bienfaits
                    </p>
                    <ul className="space-y-2">
                      {soin.bienfaits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-stone-500 leading-relaxed">
                          <CheckCircle size={12} className="text-sage-500 shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://www.planity.com/soleana-bien-etre-31810-venerque"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-center text-xs"
                  >
                    Réserver ce soin
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DÉROULEMENT D'UN SOIN VISAGE                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-nude-50">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="tag">Le protocole</span>
            <h2 className="section-title mb-4">Comment se déroule un soin visage ?</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              De votre arrivée à votre départ, chaque étape est pensée pour votre confort et l'efficacité
              du soin.
            </p>
          </div>

          <div className="relative">
            {/* Ligne verticale décorative */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-nude-200 hidden sm:block" />

            <div className="space-y-5">
              {etapes.map((etape, i) => (
                <div key={i} className="relative flex gap-5 sm:pl-10">
                  {/* Numéro */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-nude-300 text-nude-600 flex items-center justify-center font-sans font-bold text-sm shrink-0 shadow-sm">
                    {etape.num}
                  </div>
                  {/* Contenu */}
                  <div className="bg-white rounded-2xl p-5 flex-1 border border-sand-100 hover:shadow-sm transition-shadow duration-200 flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-nude-100 flex items-center justify-center shrink-0 mt-0.5">
                      {etape.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-light text-stone-800 mb-1">{etape.titre}</h4>
                      <p className="text-sm text-stone-500 leading-relaxed">{etape.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TYPES DE PEAU                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="tag">Pour toutes les peaux</span>
            <h2 className="section-title mb-4">Pour quel type de peau ?</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Nos soins s'adaptent à l'ensemble des types et problématiques cutanées. Le diagnostic initial
              garantit que chaque protocole répond précisément à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {typesPeau.map((tp, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 border ${tp.bg} ${tp.border} hover:shadow-sm transition-shadow duration-200`}
              >
                <div className={`w-10 h-10 rounded-xl ${tp.iconBg} flex items-center justify-center mb-3 ${tp.iconColor}`}>
                  {tp.icon}
                </div>
                <h4 className="font-serif text-lg font-light text-stone-800 mb-2">{tp.type}</h4>
                <p className="text-sm text-stone-500 leading-relaxed">{tp.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-sand-50 border border-sand-200 rounded-full px-5 py-2.5 text-stone-600 text-sm font-sans">
              <Info size={14} className="text-nude-500" />
              Vous ne savez pas à quel type de peau vous appartenez ? Notre diagnostic l'établit pour vous.
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BIENFAITS                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-gradient-to-br from-sand-50 to-nude-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="tag">Pourquoi choisir Soléana</span>
            <h2 className="section-title mb-4">Les bienfaits de nos soins</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Plus qu'un simple soin esthétique, nos protocoles associent performance cosmétiqu e et
              bien-être global pour vous offrir une transformation visible et durable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bienfaits.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-sand-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-nude-100 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h4 className="font-serif text-xl font-light text-stone-800 mb-2">{b.titre}</h4>
                <p className="text-sm text-stone-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="tag">Questions fréquentes</span>
            <h2 className="section-title mb-4">Vos questions sur les soins visage</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Toutes les réponses pour aborder votre premier soin en toute sérénité.
            </p>
          </div>
          <FAQAccordion items={faqItems} />
          <div className="mt-10 text-center">
            <p className="text-stone-500 text-sm mb-4">
              Une question spécifique à votre type de peau ?
            </p>
            <a href="tel:0762169814" className="btn-phone">
              <Phone size={15} />
              Nous appeler — 07 62 16 98 14
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA BANNER                                                          */}
      {/* ------------------------------------------------------------------ */}
      <CTABanner
        title="Votre peau mérite le meilleur des soins."
        subtitle="Prenez rendez-vous à Venerque pour un soin visage bio personnalisé, ou appelez-nous pour nous parler de votre peau."
      />
    </main>
  );
}
