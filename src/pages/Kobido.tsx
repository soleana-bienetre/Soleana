import { Link } from 'react-router-dom';
import {
  Leaf,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  Zap,
  Heart,
  Sun,
  Droplets,
  Shield,
  Calendar,
  Phone,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import FAQAccordion from '../components/ui/FAQAccordion';
import { useSiteImages } from '../contexts/SiteImagesContext';
import { PageMeta } from '../lib/useMeta';
import { useCategoryTarifs } from '../lib/useTarifs';

// ─── Data ────────────────────────────────────────────────────────────────────

const bienfaits = [
  {
    icon: Zap,
    title: 'Lifting des contours',
    desc: "Raffermit l'ovale du visage, redéfinit la mâchoire et atténue le relâchement cutané grâce aux manœuvres de sculpture musculaire.",
  },
  {
    icon: Droplets,
    title: 'Stimulation de la circulation',
    desc: 'Active la microcirculation sanguine et lymphatique pour nourrir les cellules en profondeur et oxygéner les tissus.',
  },
  {
    icon: Heart,
    title: 'Relâchement musculaire',
    desc: 'Libère les tensions accumulées dans les muscles du visage (mâchoire, front, tempes) pour un visage détendu et apaisé.',
  },
  {
    icon: Sun,
    title: 'Teint lumineux',
    desc: "Booste l'éclat naturel du teint, efface la grisaille et unifie le grain de peau pour un éclat immédiat.",
  },
  {
    icon: Leaf,
    title: 'Drainage & dépigmentation',
    desc: "Favorise l'élimination des toxines et réduit les poches, cernes et gonflements par des manœuvres de drainage précises.",
  },
  {
    icon: Leaf,
    title: 'Effet anti-âge global',
    desc: "Stimule la production de collagène et d'élastine, atténue les rides fines et redonne de la densité à la peau.",
  },
];

const steps = [
  {
    number: '01',
    title: 'Accueil & consultation',
    description: 'Échange sur vos attentes, votre état de peau et vos éventuelles contre-indications.',
  },
  {
    number: '02',
    title: 'Démaquillage & préparation',
    description: "Nettoyage doux de la peau, application d'une huile végétale adaptée à votre type de peau.",
  },
  {
    number: '03',
    title: 'Échauffement & relâchement',
    description: "Manœuvres d'effleurement pour détendre les muscles du visage, du cou et du décolleté.",
  },
  {
    number: '04',
    title: 'Drainage lymphatique facial',
    description: 'Mouvements rythmiques pour stimuler la circulation et éliminer les toxines.',
  },
  {
    number: '05',
    title: 'Manœuvres de lifting',
    description: 'Techniques rapides et précises héritées du Kobido traditionnel pour raffermir les contours.',
  },
  {
    number: '06',
    title: 'Modelage & sculpture',
    description: "Pressions et pincements ciblés pour remodeler l'ovale du visage et estomper les rides.",
  },
  {
    number: '07',
    title: 'Finalisation & masque (option)',
    description: "Application d'un sérum ou masque nourrissant pour sceller les bienfaits du soin.",
  },
];

const forfaits = [
  {
    title: 'Kobido à la séance',
    duration: '60 min',
    description: 'Séance complète de massage facial japonais avec manœuvres de lifting, drainage et sculpture du visage.',
    highlight: false,
  },
  {
    title: 'Kobido en forfait',
    duration: '5 ou 10 séances',
    description: 'Cure intensive pour des résultats durables. Idéal pour un vrai programme anti-âge naturel.',
    highlight: true,
  },
  {
    title: 'Kobido express à la séance',
    duration: '30 min',
    description: 'Version condensée ciblant les gestes essentiels de lifting et de drainage. Parfait avant un événement.',
    highlight: false,
  },
  {
    title: 'Kobido express en forfait',
    duration: '5 ou 10 séances',
    description: "Programme express pour maintenir l'éclat du visage au quotidien, sans rogner sur son agenda.",
    highlight: false,
  },
  {
    title: 'Soin Sublime & Kobido à la séance',
    duration: '90 min',
    description: "L'alliance d'un soin visage premium et du Kobido pour une expérience beauté d'exception.",
    highlight: true,
  },
  {
    title: 'Soin Sublime & Kobido en forfait',
    duration: '5 ou 10 séances',
    description: 'Le nec plus ultra des soins visage en cure. Résultats spectaculaires et durables garantis.',
    highlight: false,
  },
];

const faqItems = [
  {
    question: 'Combien de séances faut-il pour voir des résultats avec le Kobido ?',
    answer:
      "Les effets sont visibles dès la première séance : teint lumineux, traits détendus, visage plus tonique. Pour un effet lifting durable, une cure de 5 à 10 séances est recommandée, à raison d'une séance par semaine. Les résultats se consolident au fil des séances et se maintiennent ensuite avec des entretiens réguliers.",
  },
  {
    question: 'Le Kobido est-il douloureux ?',
    answer:
      "Non, le Kobido n'est pas douloureux. Certaines manœuvres peuvent être intenses sur des zones particulièrement tendues (mâchoire, tempes, front), mais elles restent agréables. La praticienne adapte la pression à votre sensibilité tout au long de la séance.",
  },
  {
    question: 'À quel âge peut-on commencer le Kobido ?',
    answer:
      "Le Kobido est accessible dès l'âge adulte, sans limite d'âge supérieure. Il est même particulièrement recommandé à partir de 35-40 ans, lorsque la peau commence à perdre de son élasticité. Plus tôt il est intégré dans une routine beauté, plus l'effet préventif est efficace.",
  },
  {
    question: 'Quelle est la différence entre le Kobido express et le Kobido complet ?',
    answer:
      "Le Kobido express (30 min) se concentre sur les manœuvres essentielles de lifting et de drainage, idéal pour un coup d'éclat rapide avant un événement. Le Kobido complet (60 min) inclut en plus un travail approfondi sur le décolleté, le cuir chevelu, et des manœuvres de sculpture du visage plus poussées pour un résultat anti-âge global.",
  },
  {
    question: 'Le Kobido convient-il à tous les types de peau ?',
    answer:
      "Oui, le Kobido s'adapte à tous les types de peau — normale, sèche, mixte, mature. En revanche, il est contre-indiqué en cas de peau inflammatoire active (acné kystique, eczéma en poussée, couperose sévère), de blessures cutanées ouvertes, ou en post-opératoire récent. En cas de doute, consultez votre praticienne.",
  },
  {
    question: 'Peut-on pratiquer le Kobido pendant la grossesse ?',
    answer:
      "Le Kobido facial est généralement déconseillé au cours du premier trimestre de grossesse. À partir du second trimestre, il peut être envisagé avec l'accord de votre médecin, en adaptant certaines manœuvres. Informez toujours votre praticienne de votre état de grossesse en début de séance.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Kobido() {
  const { getUrl } = useSiteImages();
  const { tarifs: kobidoTarifs } = useCategoryTarifs('kobido');

  return (
    <main className="min-h-screen bg-cream">
      <PageMeta
        title="Kobido à Venerque – Lifting naturel japonais | Soléana"
        description="Découvrez le Kobido, massage facial japonais aux effets liftants visibles dès la 1ère séance. Tonifie, sculpte et illumine le visage naturellement. Réservez à Venerque."
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[72vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${getUrl('kobido-hero')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent" />
        <div className="relative z-10 container-wide pt-24 pb-16 md:pt-0 md:pb-24">
          <div className="max-w-3xl">
            <div className="mt-6 mb-4">
              <span className="tag text-nude-200">Soin Signature</span>
            </div>
            <h1 className="font-serif font-light text-white leading-tight mb-5">
              Kobido à Venerque –{' '}
              <em className="italic font-light">Lifting japonais du visage</em>
            </h1>
            <p className="text-nude-100 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-8">
              Le lifting naturel du visage d'origine japonaise
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

      {/* ── Qu'est-ce que le Kobido ? ──────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <span className="tag">Origines & histoire</span>
              <h2 className="section-title text-3xl md:text-4xl mb-6">
                Qu'est-ce que le Kobido ?
              </h2>
              <p className="text-stone-600 leading-relaxed mb-5">
                Le <strong className="font-medium text-stone-800">Kobido</strong> — « Kobidō » (古美道) en japonais,
                littéralement « l'ancienne voie de la beauté » — est une technique de massage facial née au
                Japon au <strong className="font-medium text-stone-800">XV<sup>e</sup> siècle</strong>. Pratiqué
                à l'origine à la cour impériale japonaise, il a été transmis de maître à élève pendant des
                siècles avant d'être codifié et exporté en Occident.
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                Véritable <strong className="font-medium text-stone-800">lifting naturel sans injection</strong>,
                le Kobido associe des manœuvres rapides et précises — effleurages, pétrissages, percussions,
                pressions acuponcturales — pour raffermir les contours, redonner de l'éclat et estomper
                visiblement les signes du temps.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Contrairement aux soins visage classiques, le Kobido travaille en profondeur sur les muscles
                faciaux, le tissu conjonctif et la microcirculation, offrant des résultats comparables à ceux
                d'un lifting chirurgical, en totalement non invasif.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="badge">
                  <Leaf size={12} />
                  100 % naturel
                </span>
                <span className="badge">
                  <Shield size={12} />
                  Non invasif
                </span>
                <span className="badge">
                  <Star size={12} />
                  XV<sup>e</sup> siècle
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={getUrl('kobido-main')}
                  alt="Massage Kobido – soin lifting naturel du visage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-nude-600 text-white rounded-2xl p-5 shadow-xl">
                <p className="font-serif text-3xl font-light">+600</p>
                <p className="text-xs font-medium text-nude-100 mt-1">ans d'histoire japonaise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Les bienfaits ──────────────────────────────────────────────── */}
      <section className="section-padding bg-sand-50 bg-texture">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Effets & vertus</span>
            <h2 className="section-title text-3xl md:text-4xl">Les bienfaits du Kobido</h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto">
              Un soin aux effets multiples, visibles dès la première séance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bienfaits.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Kobido Express vs Complet ──────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Choisir son format</span>
            <h2 className="section-title text-3xl md:text-4xl">Kobido express vs Kobido complet</h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto">
              Deux formats adaptés à votre emploi du temps et à vos objectifs beauté.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Express */}
            <div className="rounded-3xl border-2 border-sand-200 p-8 bg-sand-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sand-200 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-stone-600" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-light text-stone-800">Kobido Express</h3>
                  <span className="text-sm text-stone-500">30 minutes</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Manœuvres de lifting ciblées',
                  'Drainage lymphatique accéléré',
                  'Éclat immédiat garanti',
                  'Idéal avant un événement',
                  "Parfait pour l'entretien régulier",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-stone-600">
                    <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-stone-400 italic">
                Format idéal pour les personnes au planning chargé ou en cure d'entretien.
              </p>
            </div>

            {/* Complet */}
            <div className="rounded-3xl border-2 border-nude-300 p-8 bg-nude-50 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-nude-600 text-white text-xs font-medium rounded-full">
                  Recommandé
                </span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-nude-200 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-nude-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-light text-stone-800">Kobido Complet</h3>
                  <span className="text-sm text-stone-500">60 minutes</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Travail approfondi sur le décolleté',
                  'Massage du cuir chevelu inclus',
                  "Sculpture complète de l'ovale",
                  'Manœuvres anti-rides avancées',
                  'Résultats anti-âge globaux',
                  'Cure intensive recommandée',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-stone-600">
                    <CheckCircle2 className="w-4 h-4 text-nude-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-stone-400 italic">
                Pour des résultats durables, une cure de 5 à 10 séances est recommandée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Soin Sublime & Kobido ──────────────────────────────────────── */}
      <section className="section-padding bg-stone-900 text-white overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          }}
        />
        <div className="relative z-10 container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-xs font-sans font-medium tracking-widest uppercase text-nude-300 mb-4">
                Soin d'exception
              </span>
              <h2 className="font-serif font-light text-white text-3xl md:text-4xl mb-6">
                Le Soin Sublime & Kobido
              </h2>
              <p className="text-stone-300 leading-relaxed mb-5">
                Le <strong className="text-white font-medium">Soin Sublime & Kobido</strong> est notre protocole
                premium : une fusion parfaite entre un soin visage haute-performance aux actifs nobles
                (acide hyaluronique, extraits botaniques, huiles précieuses) et les manœuvres ancestrales
                du Kobido japonais.
              </p>
              <p className="text-stone-300 leading-relaxed mb-5">
                En 90 minutes d'un rituel d'exception, votre peau est nourrie, repulpée et sculptée. Les actifs
                cosmétiques pénètrent en profondeur grâce aux manœuvres de massage qui décuplent leur absorption,
                tandis que le Kobido redessine et raffermit les contours du visage.
              </p>
              <p className="text-stone-300 leading-relaxed mb-8">
                Vous repartez avec un visage visiblement transformé : traits reposés, teint éclatant, peau
                rebondie et contours redéfinis — le résultat ultime d'un soin visage d'exception.
              </p>
              <a href="https://www.planity.com/soleana-bien-etre-31810-venerque" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Calendar size={16} />
                Réserver ce soin
              </a>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img
                  src={getUrl('kobido-secondary')}
                  alt="Soin Sublime et Kobido – soin visage premium Soléana Bien-Être"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-nude-600 rounded-2xl p-5 shadow-xl">
                <p className="text-white font-serif text-2xl font-light">90 min</p>
                <p className="text-nude-200 text-xs mt-1">de pure excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Déroulement d'une séance ───────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <span className="tag">Pas à pas</span>
            <h2 className="section-title text-3xl md:text-4xl">Déroulement d'une séance</h2>
            <p className="text-stone-500 mt-4 max-w-md mx-auto">
              Chaque séance de Kobido suit un protocole précis pour vous offrir une expérience optimale.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-sand-200 hidden md:block" />
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start relative">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-nude-50 border-2 border-nude-200 flex items-center justify-center z-10">
                    <span className="font-serif text-sm font-light text-nude-700">{step.number}</span>
                  </div>
                  <div className="bg-sand-50 rounded-2xl p-5 flex-1 border border-sand-100">
                    <h3 className="font-serif text-lg font-light text-stone-800 mb-1">{step.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Fréquence recommandée ──────────────────────────────────────── */}
      <section className="section-padding bg-sage-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="tag">Programme</span>
            <h2 className="section-title text-3xl md:text-4xl">Fréquence recommandée</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-sage-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-sage-700" />
                </div>
                <h3 className="font-serif text-xl font-light text-stone-800">Première cure</h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Pour amorcer un vrai travail de fond anti-âge, nous recommandons une cure initiale de{' '}
                <strong className="text-stone-800">5 à 10 séances</strong>, à raison d'une séance par semaine.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Les résultats sont progressifs et se consolident au fil des séances. Dès la 3<sup>e</sup> ou
                4<sup>e</sup> séance, les effets de lifting et de luminosité sont significatifs.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-sage-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-nude-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-nude-700" />
                </div>
                <h3 className="font-serif text-xl font-light text-stone-800">Séances d'entretien</h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Après la cure initiale, une séance d'entretien{' '}
                <strong className="text-stone-800">toutes les 2 à 4 semaines</strong> suffit
                à maintenir les résultats obtenus et à continuer de progresser.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Pour un coup d'éclat ponctuel, une séance avant un événement important suffit — les
                effets sont immédiats et durent plusieurs jours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Forfaits ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-white" id="forfaits">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Tarifs</span>
            <h2 className="section-title text-3xl md:text-4xl">Nos forfaits Kobido</h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto">
              Des formules adaptées à chaque objectif et à chaque emploi du temps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forfaits.map((f) => (
              <div
                key={f.title}
                className={`rounded-3xl p-7 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  f.highlight
                    ? 'border-nude-300 bg-nude-50 shadow-md'
                    : 'border-sand-200 bg-white shadow-sm'
                }`}
              >
                {f.highlight && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-nude-600 text-white text-xs font-medium rounded-full">
                      Populaire
                    </span>
                  </div>
                )}
                <h3 className="font-serif text-lg font-light text-stone-800 mb-2">{f.title}</h3>
                <div className="flex items-center gap-1.5 mb-4">
                  <Clock size={12} className="text-stone-400" />
                  <span className="text-xs text-stone-500">{f.duration}</span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">{f.description}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-nude-600 hover:text-nude-700 transition-colors group"
                >
                  Demander un devis
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
          {kobidoTarifs.length > 0 && (
            <div className="mt-10 max-w-lg mx-auto rounded-2xl border border-sand-200 overflow-hidden">
              {kobidoTarifs.map((t, i) => (
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
            <h2 className="section-title text-3xl md:text-4xl">Vos questions sur le Kobido</h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <CTABanner
        title="Offrez à votre visage le soin qu'il mérite"
        subtitle="Réservez votre séance de Kobido à Venerque et découvrez les effets d'un lifting naturel japonais."
      />
    </main>
  );
}
