import {
  Calendar,
  Phone,
  Droplets,
  Leaf,
  Zap,
  Shield,
  CheckCircle2,
  Clock,
  Layers,
  Activity,
  Star,
  AlertCircle,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import FAQAccordion from '../components/ui/FAQAccordion';
import { useSiteImages } from '../contexts/SiteImagesContext';
import { PageMeta, FAQSchema, ServiceSchema, BreadcrumbSchema } from '../lib/useMeta';
import { useCategoryTarifs } from '../lib/useTarifs';

// ─── Data ────────────────────────────────────────────────────────────────────

const bienfaitsCombines = [
  {
    icon: Droplets,
    title: 'Réduction des œdèmes',
    desc: 'Le drainage Vodder élimine les excès liquidiens des tissus, soulageant les gonflements des jambes, des bras et du visage.',
  },
  {
    icon: Shield,
    title: 'Renforcement immunitaire',
    desc: 'En stimulant la circulation de la lymphe, les deux techniques boostent la production de lymphocytes et la réponse immunitaire.',
  },
  {
    icon: Leaf,
    title: 'Détoxification profonde',
    desc: "Accélère l'élimination des déchets métaboliques et des toxines stagnantes dans les tissus grâce à l'activation lymphatique.",
  },
  {
    icon: Zap,
    title: 'Réduction de la cellulite',
    desc: 'La maderothérapie brise mécaniquement les amas graisseux tandis que le drainage facilite leur évacuation naturelle.',
  },
  {
    icon: Activity,
    title: 'Sculpture de la silhouette',
    desc: 'Les rouleaux en bois exercent des pressions ciblées pour remodeler et affiner la silhouette, particulièrement sur les zones rebelles.',
  },
  {
    icon: Layers,
    title: 'Amélioration de la texture cutanée',
    desc: "Atténue la peau d'orange, améliore l'élasticité et redonne de la tonicité à la peau en stimulant la production de collagène.",
  },
];

const sessionSteps = [
  {
    number: '01',
    title: 'Bilan & consultation',
    desc: 'Évaluation de votre état de santé, de vos objectifs (drainage, remodelage, ou les deux) et des éventuelles contre-indications.',
  },
  {
    number: '02',
    title: 'Préparation de la peau',
    desc: "Application d'une huile végétale de qualité pour faciliter le glissement des instruments ou des mains et hydrater la peau.",
  },
  {
    number: '03',
    title: 'Activation lymphatique initiale',
    desc: "Manœuvres douces d'activation des ganglions lymphatiques principaux pour ouvrir les voies d'évacuation.",
  },
  {
    number: '04',
    title: 'Protocole principal',
    desc: 'Drainage manuel méthode Vodder et/ou maderothérapie selon la séance prévue, en suivant le protocole défini.',
  },
  {
    number: '05',
    title: 'Drainage de clôture',
    desc: "Manœuvres finales douces pour acheminer les toxines libérées vers les voies d'élimination naturelles.",
  },
  {
    number: '06',
    title: 'Conseils & hydratation',
    desc: "Recommandations post-séance : boire 1,5 L d'eau, éviter l'alcool, repos relatif pour optimiser l'effet drainant.",
  },
];

const faqItems = [
  {
    question: 'Quelle est la différence entre le drainage Vodder et la maderothérapie ?',
    answer:
      "Le drainage lymphatique méthode Vodder est un massage manuel très doux qui agit sur le réseau lymphatique pour éliminer les œdèmes et stimuler l'immunité. La maderothérapie est un massage avec des instruments en bois qui agit mécaniquement sur les tissus graisseux pour sculpter la silhouette et réduire la cellulite. Les deux sont complémentaires : le drainage prépare et clôture la cure, la maderothérapie constitue le cœur du travail de remodelage.",
  },
  {
    question: 'Combien de séances faut-il pour voir des résultats visibles ?',
    answer:
      "Des résultats sont généralement perceptibles dès la 3e ou 4e séance : sensation de jambes légères, réduction des gonflements, peau plus lisse. Pour des résultats durables sur la silhouette et la cellulite, une cure complète de 10 séances est recommandée. Les effets se consolident sur 4 à 6 semaines après la cure, à condition d'adopter une alimentation équilibrée et une activité physique régulière.",
  },
  {
    question: 'La maderothérapie est-elle douloureuse ?',
    answer:
      "La maderothérapie peut être intense, notamment sur les zones de cellulite fibrosée (cuisses, fessiers, genoux). Les pressions sont adaptées à votre tolérance et à l'évolution de votre peau au fil des séances. En début de cure, des rougeurs légères et une légère sensibilité sont normales et passagères. La pression est toujours ajustée selon vos retours.",
  },
  {
    question: 'Le drainage lymphatique est-il indiqué après une liposuccion ou une chirurgie ?',
    answer:
      "Oui, le drainage lymphatique post-opératoire est fortement recommandé après une liposuccion, une abdominoplastie ou toute chirurgie esthétique. Il accélère la résorption des œdèmes, réduit les risques de fibrose et améliore la récupération. Il convient cependant d'attendre l'accord de votre chirurgien et de commencer par des manœuvres très douces.",
  },
  {
    question: 'Qui peut bénéficier du drainage lymphatique Vodder ?',
    answer:
      "Le drainage Vodder est indiqué pour les personnes souffrant d'œdèmes chroniques, de jambes lourdes, de lymphœdème, de fibromyalgie, en récupération post-opératoire, ou souhaitant simplement une détoxification profonde. Il est contre-indiqué en cas de phlébite, d'insuffisance cardiaque décompensée, d'infection aiguë ou de cancer évolutif non traité.",
  },
  {
    question: "Peut-on combiner la cure drainage avec d'autres soins de l'institut ?",
    answer:
      "Absolument. La cure drainage et remodelage se marie idéalement avec des massages bien-être (Abhyanga, Balinais) en alternance, et avec des soins visage (Kobido, Soin Sublime) qui complètent le travail de drainage à l'échelle du visage. Votre praticienne peut vous aider à composer un programme personnalisé combinant plusieurs types de soins.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Drainage() {
  const { getUrl } = useSiteImages();
  const { tarifs: drainageTarifs, getPrice: getDrainagePrice } = useCategoryTarifs('drainage');
  const drainagePrice = getDrainagePrice('Drainage lymphatique Vodder', '65€');
  const maderoPrice = getDrainagePrice('Maderothérapie', '80€');

  return (
    <main className="min-h-screen bg-cream">
      <PageMeta
        title="Drainage lymphatique & Maderothérapie Venerque | Soléana"
        description="Drainage lymphatique Vodder et maderothérapie à Venerque (31). Jambes légères, silhouette affinée et récupération post-op avec protocoles certifiés Soléana."
        url="https://www.soleana-bienetre.com/drainage-lymphatique"
      />
      <FAQSchema items={faqItems} pageUrl="https://www.soleana-bienetre.com/drainage-lymphatique" />
      <ServiceSchema
        name="Drainage lymphatique & Maderothérapie"
        description="Drainage lymphatique Vodder et maderothérapie à Venerque (31). Jambes légères, silhouette affinée et récupération post-op avec protocoles certifiés."
        url="https://www.soleana-bienetre.com/drainage-lymphatique"
        serviceType="Drainage lymphatique"
      />
      <BreadcrumbSchema items={[{ name: 'Drainage lymphatique', url: 'https://www.soleana-bienetre.com/drainage-lymphatique' }]} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[72vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${getUrl('drainage-hero')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/45 to-transparent" />
        <div className="relative z-10 container-wide pt-24 pb-16 md:pt-0 md:pb-24">
          <div className="max-w-3xl">
            <div className="mt-6 mb-4">
              <span className="tag text-nude-200">Drainage & Remodelage</span>
            </div>
            <h1 className="font-serif font-light text-white leading-tight mb-5">
              Drainage lymphatique &{' '}
              <em className="italic font-light">Maderothérapie à Venerque</em>
            </h1>
            <p className="text-nude-100 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-8">
              Deux techniques complémentaires pour drainer, détoxifier et sculpter naturellement votre silhouette.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.planity.com/soleana-bien-etre-31810-venerque" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Calendar size={16} />
                Réserver une séance
              </a>
              <a href="tel:0762169814" className="btn-phone">
                <Phone size={16} />
                07 62 16 98 14
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Drainage lymphatique méthode Vodder ───────────────────────── */}
      <section className="section-padding bg-white" id="vodder">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Contenu */}
            <div>
              <span className="tag">Méthode Vodder • 1932</span>
              <h2 className="section-title text-3xl md:text-4xl mb-6">
                Le drainage lymphatique méthode Vodder
              </h2>
              <p className="text-stone-600 leading-relaxed mb-5">
                Le <strong className="font-medium text-stone-800">drainage lymphatique méthode Vodder</strong> est
                une technique de massage manuel créée par le Dr Emil Vodder et son épouse Estrid
                dans les années 1930. Il s'agit aujourd'hui de la méthode de référence mondiale
                en matière de drainage lymphatique manuel.
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                Le principe repose sur des mouvements manuels très doux, lents et rythmiques —
                principalement des <strong className="font-medium text-stone-800">cercles stationnaires, des pompes et des rotations</strong> —
                qui imitent la pulsation naturelle de la lymphe pour en accélérer la circulation
                dans les vaisseaux lymphatiques superficiels.
              </p>
              <p className="text-stone-600 leading-relaxed mb-7">
                Contrairement à un massage classique, la pression exercée est très faible
                (à peine le poids d'une pièce de monnaie) et les mouvements ne suivent jamais
                le sens de la circulation veineuse mais celui, spécifique, de la lymphe vers
                les ganglions lymphatiques.
              </p>

              {/* Bienfaits Vodder */}
              <div className="bg-sand-50 rounded-2xl p-5 border border-sand-100">
                <h3 className="font-serif text-base font-light text-stone-800 mb-3">Bienfaits principaux</h3>
                <ul className="space-y-2">
                  {[
                    'Réduction significative des œdèmes et gonflements',
                    'Stimulation et renforcement du système immunitaire',
                    'Effet détoxifiant profond sur les tissus',
                    'Soulagement des jambes lourdes',
                    'Action anti-cellulite par évacuation des toxines',
                    'Apaisement du système nerveux parasympathique',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={getUrl('drainage-main')}
                  alt="Drainage lymphatique méthode Vodder – Soléana Bien-Être"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-sage-700 text-white rounded-2xl p-5 shadow-xl">
                <p className="font-serif text-2xl font-light text-white">60 min · {drainagePrice}</p>
                <p className="text-sage-200 text-xs mt-1">Méthode Vodder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── La maderothérapie ─────────────────────────────────────────── */}
      <section className="section-padding bg-stone-50" id="maderotherapie">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={getUrl('drainage-secondary')}
                  alt="Maderothérapie – massage avec instruments en bois"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-nude-600 text-white rounded-2xl p-5 shadow-xl">
                <p className="font-serif text-xl font-light text-white">60 min · {maderoPrice}</p>
                <p className="text-nude-200 text-xs mt-1">Maderothérapie</p>
              </div>
            </div>

            {/* Contenu */}
            <div className="order-1 lg:order-2">
              <span className="tag">Colombie • Origines latinas</span>
              <h2 className="section-title text-3xl md:text-4xl mb-6">
                La maderothérapie
              </h2>
              <p className="text-stone-600 leading-relaxed mb-5">
                La <strong className="font-medium text-stone-800">maderothérapie</strong> (du
                latin <em>madera</em>, « bois ») est une technique de massage corporel qui utilise
                des <strong className="font-medium text-stone-800">instruments en bois naturel</strong>
                — rouleaux, ventouses, cuillères, planches — de formes et tailles variées pour
                travailler les zones graisseuses et raffermissantes du corps.
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                Née en Colombie dans les années 1980, la maderothérapie s'est rapidement répandue
                en Amérique latine avant de conquérir l'Europe. Elle agit mécaniquement en exerçant
                des pressions ciblées sur les tissus adipeux pour les briser et faciliter leur
                évacuation par la voie lymphatique.
              </p>
              <p className="text-stone-600 leading-relaxed mb-7">
                La technique associe des mouvements de roulage, de pressage et de drainage qui
                stimulent simultanément la circulation sanguine et lymphatique, favorisent la
                lipolyse (destruction des cellules graisseuses) et tonifient la peau en profondeur.
              </p>

              {/* Bienfaits Madero */}
              <div className="bg-nude-50 rounded-2xl p-5 border border-nude-100">
                <h3 className="font-serif text-base font-light text-stone-800 mb-3">Bienfaits principaux</h3>
                <ul className="space-y-2">
                  {[
                    'Sculpture et affinement de la silhouette',
                    "Réduction visible de la cellulite et peau d'orange",
                    'Drainage des graisses localisées',
                    'Raffermissement et tonification de la peau',
                    "Amélioration de l'élasticité et de la texture cutanée",
                    'Activation de la circulation sanguine locale',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-nude-600 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quelle différence entre les deux ? ───────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Comparatif</span>
            <h2 className="section-title text-3xl md:text-4xl">
              Quelle différence entre les deux ?
            </h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto">
              Deux techniques complémentaires qui ne s'opposent pas — elles se complètent parfaitement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Drainage Vodder */}
            <div className="rounded-3xl border-2 border-sage-200 p-8 bg-sage-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-sage-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-light text-stone-800">Drainage Vodder</h3>
                  <span className="text-xs text-stone-500 font-medium">Manuel • Très doux</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Outil', value: 'Mains de la praticienne' },
                  { label: 'Pression', value: 'Très légère (superficielle)' },
                  { label: 'Cible', value: 'Réseau lymphatique' },
                  { label: 'Action principale', value: 'Drainer, détoxifier, immunité' },
                  { label: 'Indiqué pour', value: 'Œdèmes, jambes lourdes, immunité' },
                  { label: 'Sensation', value: 'Relaxante, apaisante' },
                ].map(({ label, value }) => (
                  <li key={label} className="flex items-start justify-between gap-3 text-sm border-b border-sage-100 pb-2 last:border-0">
                    <span className="text-stone-500 shrink-0">{label}</span>
                    <span className="text-stone-800 font-medium text-right">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Maderothérapie */}
            <div className="rounded-3xl border-2 border-nude-200 p-8 bg-nude-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-nude-200 rounded-full flex items-center justify-center">
                  <Layers className="w-5 h-5 text-nude-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-light text-stone-800">Maderothérapie</h3>
                  <span className="text-xs text-stone-500 font-medium">Instruments en bois • Intense</span>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Outil', value: 'Rouleaux, planches en bois' },
                  { label: 'Pression', value: 'Modérée à forte (profonde)' },
                  { label: 'Cible', value: 'Tissu adipeux & cellulite' },
                  { label: 'Action principale', value: 'Sculpter, raffermir, drainer' },
                  { label: 'Indiqué pour', value: 'Cellulite, silhouette, tonicité' },
                  { label: 'Sensation', value: 'Intense, tonifiante' },
                ].map(({ label, value }) => (
                  <li key={label} className="flex items-start justify-between gap-3 text-sm border-b border-nude-100 pb-2 last:border-0">
                    <span className="text-stone-500 shrink-0">{label}</span>
                    <span className="text-stone-800 font-medium text-right">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-stone-500 text-sm mt-8 max-w-lg mx-auto">
            Dans notre <strong className="text-stone-700">Cure Drainage & Remodelage Naturel</strong>,
            les deux techniques sont combinées de manière structurée pour des résultats optimaux.
          </p>
        </div>
      </section>

      {/* ── Les bienfaits combinés ─────────────────────────────────────── */}
      <section className="section-padding bg-sand-50 bg-texture">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Effets & vertus</span>
            <h2 className="section-title text-3xl md:text-4xl">Les bienfaits combinés</h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto">
              Ensemble, le drainage Vodder et la maderothérapie offrent des résultats spectaculaires.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bienfaitsCombines.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-sand-100"
              >
                <div className="w-12 h-12 bg-nude-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-nude-600" />
                </div>
                <h3 className="font-serif text-lg font-light text-stone-800 mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Déroulement d'une séance ───────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <span className="tag">Protocole</span>
            <h2 className="section-title text-3xl md:text-4xl">Déroulement d'une séance</h2>
            <p className="text-stone-500 mt-4 max-w-md mx-auto">
              Un protocole rigoureux pour maximiser les effets de chaque séance.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-sand-200 hidden md:block" />
            <div className="space-y-6">
              {sessionSteps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start relative">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-nude-50 border-2 border-nude-200 flex items-center justify-center z-10">
                    <span className="font-serif text-sm font-light text-nude-700">{step.number}</span>
                  </div>
                  <div className="bg-sand-50 rounded-2xl p-5 flex-1 border border-sand-100">
                    <h3 className="font-serif text-lg font-light text-stone-800 mb-1">{step.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LA CURE DRAINAGE & REMODELAGE NATUREL – 10 séances
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden bg-stone-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/6663372/pexels-photo-6663372.jpeg?auto=compress&cs=tinysrgb&w=1400)',
          }}
        />
        <div className="relative z-10 container-wide">
          {/* En-tête de la cure */}
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-sans font-medium tracking-widest uppercase text-nude-300 mb-4">
              Programme Signature
            </span>
            <h2 className="font-serif font-light text-white text-3xl md:text-5xl mb-4 leading-tight">
              La Cure Drainage & Remodelage Naturel
            </h2>
            <div className="inline-block bg-nude-600 text-white px-5 py-2 rounded-full font-serif text-xl font-light mb-5">
              10 séances
            </div>
            <p className="text-stone-300 max-w-2xl mx-auto leading-relaxed">
              Notre programme phare, conçu pour transformer durablement votre silhouette et votre
              bien-être par une approche structurée combinant drainage lymphatique et maderothérapie.
            </p>
          </div>

          {/* Structure de la cure */}
          <div className="max-w-3xl mx-auto mb-14">
            <div className="space-y-4">
              {/* Séance 1 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 bg-sage-600 rounded-full flex items-center justify-center">
                  <span className="font-serif text-white text-lg font-light">1</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-lg font-light text-white">Séance 1 – Drainage d'ouverture</h3>
                    <span className="badge bg-sage-800 text-sage-200 border-sage-700 text-xs">Drainage Vodder</span>
                  </div>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Bilan complet de départ, mesures et photos (avec accord). Drainage lymphatique
                    intégral méthode Vodder pour activer le réseau lymphatique, ouvrir les voies de
                    drainage et préparer les tissus aux séances de maderothérapie à venir. Prise de
                    conscience corporelle et définition des zones prioritaires.
                  </p>
                </div>
              </div>

              {/* Séances 2 à 9 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 bg-nude-600 rounded-full flex items-center justify-center">
                  <span className="font-serif text-white text-sm font-light text-center leading-tight">2–9</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-serif text-lg font-light text-white">
                      Séances 2 à 9 – Remodelage intensif
                    </h3>
                    <span className="badge bg-nude-800 text-nude-200 border-nude-700 text-xs">
                      Maderothérapie
                    </span>
                  </div>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Huit séances de maderothérapie avec protocole progressif et ciblé : activation
                    des zones de cellulite, sculpture des contours, drainage mécanique et raffermissement
                    cutané. Chaque séance débute par quelques manœuvres de drainage Vodder pour activer
                    la lymphe et se conclut par des effleurages drainants. Le protocole est adapté en
                    fonction de l'évolution de votre peau et de vos ressentis.
                  </p>
                </div>
              </div>

              {/* Séance 10 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-start gap-5">
                <div className="shrink-0 w-14 h-14 bg-sage-600 rounded-full flex items-center justify-center">
                  <span className="font-serif text-white text-lg font-light">10</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-lg font-light text-white">Séance 10 – Drainage de clôture</h3>
                    <span className="badge bg-sage-800 text-sage-200 border-sage-700 text-xs">Drainage Vodder</span>
                  </div>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    Drainage lymphatique complet pour accompagner l'élimination des dernières toxines
                    libérées au cours de la cure et finaliser le travail de remodelage. Bilan de fin
                    de cure, évaluation des résultats et conseils personnalisés pour maintenir et
                    prolonger les bénéfices à domicile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Infos pratiques de la cure */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center">
              <Clock className="w-6 h-6 text-nude-300 mx-auto mb-3" />
              <h4 className="font-serif text-base font-light text-white mb-1">Rythme idéal</h4>
              <p className="text-stone-300 text-sm">1 à 2 séances par semaine</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center">
              <Activity className="w-6 h-6 text-nude-300 mx-auto mb-3" />
              <h4 className="font-serif text-base font-light text-white mb-1">Durée totale</h4>
              <p className="text-stone-300 text-sm">5 à 10 semaines environ</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center">
              <Star className="w-6 h-6 text-nude-300 mx-auto mb-3" />
              <h4 className="font-serif text-base font-light text-white mb-1">Objectif</h4>
              <p className="text-stone-300 text-sm">Bien-être + esthétique durable</p>
            </div>
          </div>

          {/* Description de la cure */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center mb-10">
            <p className="text-stone-300 leading-relaxed text-sm mb-4">
              La cure Drainage & Remodelage Naturel est un{' '}
              <strong className="text-white">programme structuré bien-être et esthétique</strong> :
              elle ne se contente pas de travailler la silhouette, elle rééquilibre le terrain lymphatique,
              améliore la qualité de la peau, booste l'immunité et procure un profond sentiment de légèreté
              et de vitalité.
            </p>
            <p className="text-stone-300 leading-relaxed text-sm">
              Pour des résultats optimaux et durables, la cure est idéalement associée à une{' '}
              <strong className="text-white">alimentation équilibrée</strong>, une{' '}
              <strong className="text-white">hydratation suffisante</strong> (minimum 1,5 L d'eau par jour)
              et une <strong className="text-white">activité physique régulière</strong> légère
              (marche, natation, yoga).
            </p>
          </div>

          {/* Avertissement */}
          <div className="max-w-2xl mx-auto bg-amber-900/40 border border-amber-700/50 rounded-2xl p-5 flex items-start gap-3 mb-10">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-amber-200 text-sm leading-relaxed">
              <strong>Contre-indications :</strong> phlébite, thrombose, insuffisance cardiaque
              décompensée, cancer évolutif, infection cutanée active. En cas de doute, consultez
              votre médecin avant de commencer la cure.
            </p>
          </div>

          <div className="text-center">
            <a href="https://www.planity.com/soleana-bien-etre-31810-venerque" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Calendar size={16} />
              Réserver la cure 10 séances
            </a>
          </div>
        </div>
      </section>

      {/* ── Tarifs ────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white" id="tarifs">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Tarifs</span>
            <h2 className="section-title text-3xl md:text-4xl">Nos formules</h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto">
              Séances à l'unité ou en cure, selon vos objectifs et vos besoins.
            </p>
          </div>
          <div className="max-w-md mx-auto rounded-3xl p-6 border-2 border-nude-300 bg-nude-50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3">
              <span className="px-3 py-1 bg-nude-600 text-white text-xs font-medium rounded-full">
                Programme phare
              </span>
            </div>
            <h3 className="font-serif text-base font-light text-stone-800 mb-2">Cure Drainage & Remodelage</h3>
            <div className="flex items-center gap-1.5 mb-3">
              <Clock size={11} className="text-stone-400" />
              <span className="text-xs text-stone-500">10 séances</span>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed mb-5">
              Notre programme signature complet pour transformer votre silhouette et votre bien-être.
            </p>
            <p className="text-lg font-semibold text-nude-700">669€</p>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: 'Drainage Vodder à la séance',
                duration: '60 min',
                price: '65€',
                desc: "Séance de drainage lymphatique méthode Vodder pour soulager les œdèmes et stimuler l'immunité.",
              },
              {
                title: 'Drainage Vodder en forfait',
                duration: '5 ou 10 séances',
                price: '310€ à 590€',
                desc: 'Cure drainante pour traiter les œdèmes chroniques, les jambes lourdes ou accompagner une chirurgie.',
              },
              {
                title: 'Maderothérapie à la séance',
                duration: '60 min',
                price: '80€',
                desc: 'Séance de massage avec instruments en bois pour drainer et sculpter les zones ciblées.',
              },
              {
                title: 'Maderothérapie au forfait',
                duration: '5 ou 10 séances',
                price: '360€ à 690€',
                desc: 'Forfait de maderothérapie pour accompagner le remodelage et travailler les zones ciblées sur plusieurs séances.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl p-6 border-2 border-sand-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-serif text-base font-light text-stone-800 mb-2">{f.title}</h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <Clock size={11} className="text-stone-400" />
                  <span className="text-xs text-stone-500">{f.duration}</span>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed mb-5">{f.desc}</p>
                <p className="text-lg font-semibold text-nude-700">{f.price}</p>
              </div>
            ))}
          </div>
          {drainageTarifs.length > 0 && (
            <div className="mt-10 max-w-lg mx-auto rounded-2xl border border-sand-200 overflow-hidden">
              {drainageTarifs.map((t, i) => (
                <a
                  key={t.id}
                  href="https://www.planity.com/soleana-bien-etre-31810-venerque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between px-5 py-3 hover:bg-sand-50 transition-colors ${i > 0 ? 'border-t border-sand-100' : ''}`}
                >
                  <span className="text-sm text-stone-700">{t.name}</span>
                  <span className="text-sm font-semibold text-nude-700 shrink-0 ml-4">{t.price}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-sand-50">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="tag">Questions fréquentes</span>
            <h2 className="section-title text-3xl md:text-4xl">
              Vos questions sur le drainage et la maderothérapie
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <CTABanner
        title="Prête à retrouver légèreté et éclat ?"
        subtitle="Réservez votre séance de drainage ou commencez votre cure de remodelage à Venerque dès aujourd'hui."
      />
    </main>
  );
}
