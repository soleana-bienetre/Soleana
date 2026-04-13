import { Link } from 'react-router-dom';
import {
  Calendar,
  Phone,
  Heart,
  Leaf,
  Wind,
  Droplets,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Users,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import FAQAccordion from '../components/ui/FAQAccordion';
import { useSiteImages } from '../contexts/SiteImagesContext';
import { PageMeta } from '../lib/useMeta';

// ─── Data ────────────────────────────────────────────────────────────────────

const bienfaitsGlobaux = [
  {
    icon: Heart,
    title: 'Détente profonde',
    desc: 'Relâche les tensions physiques et mentales accumulées, favorisant un état de relaxation durable.',
  },
  {
    icon: Droplets,
    title: 'Meilleure circulation',
    desc: "Stimule la circulation sanguine et lymphatique, oxygène les tissus et favorise l'élimination des toxines.",
  },
  {
    icon: Wind,
    title: 'Équilibre intérieur',
    desc: "Harmonise le corps et l'esprit grâce à des techniques holistiques issues de traditions ancestrales.",
  },
  {
    icon: Leaf,
    title: 'Réduction du stress',
    desc: "Diminue le cortisol, l'hormone du stress, et favorise la libération d'endorphines et de sérotonine.",
  },
  {
    icon: Leaf,
    title: 'Soulagement musculaire',
    desc: 'Détend les muscles contractés, soulage les douleurs chroniques et améliore la mobilité articulaire.',
  },
  {
    icon: Shield,
    title: 'Renforcement immunitaire',
    desc: "Stimule le système immunitaire par l'activation du réseau lymphatique et la réduction du stress chronique.",
  },
];

const sessionSteps = [
  {
    number: '01',
    title: 'Accueil & bilan bien-être',
    desc: 'Discussion sur vos attentes, contre-indications éventuelles et choix du massage adapté à vos besoins du moment.',
  },
  {
    number: '02',
    title: 'Préparation & installation',
    desc: 'Installation confortable sur la table de massage, dans une ambiance apaisante (musique douce, lumière tamisée, huiles diffusées).',
  },
  {
    number: '03',
    title: "Rituel d'ouverture",
    desc: "Application des huiles et premières manœuvres d'échauffement pour préparer le corps à recevoir le soin.",
  },
  {
    number: '04',
    title: 'Massage proprement dit',
    desc: 'Déroulement du protocole choisi (Abhyanga, Balinais ou Prénatal) selon les techniques de la tradition sélectionnée.',
  },
  {
    number: '05',
    title: 'Retour au calme',
    desc: "Manœuvres finales d'apaisement, temps de silence pour laisser le corps intégrer les bienfaits du soin.",
  },
  {
    number: '06',
    title: 'Conseils post-séance',
    desc: 'Recommandations pour prolonger les bienfaits : hydratation, repos, fréquence des séances, huiles à domicile.',
  },
];

const precautions = [
  'Informer la praticienne de tout antécédent médical ou traitement en cours',
  "Éviter de manger un repas copieux dans l'heure précédant la séance",
  'Signaler immédiatement toute gêne ou douleur en cours de séance',
  'Prévoir un temps de repos après la séance pour en optimiser les bienfaits',
  'En cas de pathologie chronique, consulter votre médecin avant de commencer',
  'Éviter les soins en cas de fièvre, infection cutanée ou affection aiguë',
];

const faqItems = [
  {
    question: 'Comment choisir entre le massage Ayurvédique, Balinais et Prénatal ?',
    answer:
      'Le massage Ayurvédique Abhyanga est idéal si vous souffrez de fatigue chronique, de stress intense ou souhaitez un rééquilibrage global. Le Balinais convient mieux aux tensions musculaires profondes et aux personnes cherchant une détente intense. Le massage Prénatal est réservé aux femmes enceintes (à partir du 2e trimestre) et aux jeunes mamans. En cas de doute, votre praticienne vous guidera lors de la consultation initiale.',
  },
  {
    question: 'Les massages sont-ils contre-indiqués en cas de maladie ou de traitement médical ?',
    answer:
      "Certaines pathologies (phlébite, cancer évolutif, maladies infectieuses, fractures récentes) constituent des contre-indications absolues. D'autres nécessitent un accord médical préalable (anticoagulants, certaines maladies chroniques). En cas de doute, consultez toujours votre médecin avant de réserver une séance et informez votre praticienne de votre situation.",
  },
  {
    question: 'À quelle fréquence peut-on se faire masser ?',
    answer:
      'Une séance par semaine est idéale pour un effet cumulatif. En entretien, une séance toutes les 2 à 4 semaines suffit. En période de stress intense ou de fatigue, deux séances par semaine peuvent être envisagées temporairement. Votre praticienne adaptera les recommandations à votre situation personnelle.',
  },
  {
    question: "Les huiles utilisées sont-elles naturelles ? Que faire en cas d'allergie ?",
    answer:
      "Nous utilisons exclusivement des huiles végétales biologiques et des huiles essentielles pures. En cas d'allergie connue à certaines plantes ou huiles (sésame, noix de coco, etc.), informez-en votre praticienne avant la séance. Des huiles de substitution seront systématiquement proposées pour adapter le soin à vos contraintes.",
  },
  {
    question: 'Le massage bien-être est-il remboursé par la mutuelle ?',
    answer:
      'Les massages bien-être ne sont généralement pas remboursés par la Sécurité Sociale. Certaines mutuelles proposent des prises en charge partielles dans le cadre de forfaits « médecines douces » ou « bien-être ». Renseignez-vous auprès de votre complémentaire santé et demandez-nous une facture pour faciliter votre démarche.',
  },
  {
    question: 'Que se passe-t-il si je suis enceinte et souhaite un massage ?',
    answer:
      "Le massage prénatal est spécifiquement conçu pour les femmes enceintes, à partir du 2e trimestre de grossesse (après accord de votre médecin ou sage-femme). Le premier trimestre est une période de prudence où le massage corporel est déconseillé. Après l'accouchement, le massage post-natal est possible dès que vous vous en sentez capable, généralement à partir de 6 à 8 semaines.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Massages() {
  const { getUrl } = useSiteImages();
  return (
    <main className="min-h-screen bg-cream">
      <PageMeta
        title="Massages bien-être à Venerque – Détente profonde | Soléana"
        description="Massages relaxants et thérapeutiques à Venerque (31). Massage TEMANA, relaxant corps entier, ventre drainant. Laetitia vous accueille dans un cadre apaisant. Réservez en ligne."
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[72vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${getUrl('massages-hero')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/40 to-transparent" />
        <div className="relative z-10 container-wide pt-24 pb-16 md:pt-0 md:pb-24">
          <div className="max-w-3xl">
            <div className="mt-6 mb-4">
              <span className="tag text-nude-200">Rituels du monde</span>
            </div>
            <h1 className="font-serif font-light text-white leading-tight mb-5">
              Massages bien-être à Venerque –{' '}
              <em className="italic font-light">Soléana Bien-Être</em>
            </h1>
            <p className="text-nude-100 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-8">
              Des rituels de massage venus du monde entier pour nourrir votre corps, apaiser votre esprit
              et rétablir l'harmonie intérieure.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.planity.com/soleana-bien-etre-31810-venerque" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Calendar size={16} />
                Réserver un massage
              </a>
              <a href="tel:0762169814" className="btn-phone">
                <Phone size={16} />
                07 62 16 98 14
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── L'univers du massage bien-être ────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <span className="tag">Notre approche</span>
          <h2 className="section-title text-3xl md:text-4xl mb-6">
            L'univers du massage bien-être
          </h2>
          <p className="text-stone-600 leading-relaxed mb-5 max-w-2xl mx-auto">
            Chez <strong className="font-medium text-stone-800">Soléana Bien-Être</strong>, nous avons
            sélectionné trois traditions de massage parmi les plus complètes et les plus bienfaisantes
            au monde. Chacun répond à des besoins spécifiques et s'inscrit dans une vision globale
            du soin : <em>corps, esprit et énergie sont indissociables</em>.
          </p>
          <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Nos séances se déroulent dans un espace dédié au calme et à l'apaisement, avec des huiles
            végétales biologiques soigneusement sélectionnées, une ambiance sonore enveloppante et
            une praticienne à l'écoute de vos besoins. Chaque massage est un voyage intérieur.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="badge"><Leaf size={12} /> Huiles bio certifiées</span>
            <span className="badge"><Shield size={12} /> Techniques ancestrales</span>
            <span className="badge"><Heart size={12} /> Approche holistique</span>
            <span className="badge"><Users size={12} /> Sur-mesure</span>
          </div>
        </div>
      </section>

      {/* ── Les bienfaits globaux ──────────────────────────────────────── */}
      <section className="section-padding bg-sand-50 bg-texture">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Effets & vertus</span>
            <h2 className="section-title text-3xl md:text-4xl">Les bienfaits des massages</h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto">
              Au-delà de la simple détente, nos massages agissent en profondeur sur votre santé globale.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bienfaitsGlobaux.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-sand-100"
              >
                <div className="w-12 h-12 bg-sage-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-sage-700" />
                </div>
                <h3 className="font-serif text-lg font-light text-stone-800 mb-2">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MASSAGE AYURVÉDIQUE ABHYANGA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="abhyanga">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={getUrl('massages-main')}
                  alt="Massage Ayurvédique Abhyanga – Soléana Bien-Être Venerque"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-nude-600 text-white rounded-2xl p-5 shadow-xl">
                <p className="font-serif text-xl font-light">60 – 90 min</p>
                <p className="text-nude-200 text-xs mt-1">voyage intérieur</p>
              </div>
            </div>
            {/* Contenu */}
            <div className="order-1 lg:order-2">
              <span className="tag">Inde • Médecine ayurvédique</span>
              <h2 className="section-title text-3xl md:text-4xl mb-2">
                Massage Ayurvédique Abhyanga
              </h2>
              <p className="text-stone-500 font-serif italic text-lg mb-6">
                « L'onction sacrée du corps »
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                L'<strong className="font-medium text-stone-800">Abhyanga</strong> est le massage
                corps complet de la médecine ayurvédique indienne, l'une des plus anciennes traditions
                de santé au monde. Pratiqué depuis des millénaires, il consiste en l'application généreuse
                d'<strong className="font-medium text-stone-800">huiles végétales chaudes</strong>
                &nbsp;— choisies selon votre dosha (constitution énergétique) — sur l'ensemble du corps,
                du visage au bout des pieds.
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                Les manœuvres sont longues, lentes et enveloppantes, suivant le sens des méridiens
                énergétiques et des marmas (points vitaux ayurvédiques). L'Abhyanga ne traite pas
                seulement le corps physique : il harmonise les trois doshas (Vata, Pitta, Kapha),
                nourrit les tissus en profondeur et apporte un état de paix intérieure rare.
              </p>

              {/* Bienfaits */}
              <div className="bg-sand-50 rounded-2xl p-5 mb-6 border border-sand-100">
                <h3 className="font-serif text-base font-light text-stone-800 mb-3">Bienfaits</h3>
                <ul className="space-y-2">
                  {[
                    "Équilibre des doshas et de l'énergie vitale",
                    'Relaxation profonde du système nerveux',
                    'Amélioration de la circulation sanguine',
                    'Nourriture intense de la peau',
                    'Soulagement des douleurs musculaires et articulaires',
                    'Détoxification et stimulation du drainage',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pour qui */}
              <div className="bg-nude-50 rounded-2xl p-5 mb-6 border border-nude-100">
                <h3 className="font-serif text-base font-light text-stone-800 mb-2">Pour qui ?</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Idéal pour les personnes en situation de <strong className="text-stone-800">stress intense</strong>,
                  de <strong className="text-stone-800">fatigue chronique</strong>, de tensions corporelles
                  diffuses ou souhaitant une reconnexion profonde à elles-mêmes. Convient également
                  aux personnes souffrant de troubles du sommeil ou d'anxiété.
                </p>
              </div>

              <a href="https://www.planity.com/soleana-bien-etre-31810-venerque" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Calendar size={16} />
                Réserver un Abhyanga
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MASSAGE BALINAIS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-stone-50" id="balinais">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Contenu */}
            <div>
              <span className="tag">Bali • Indonésie</span>
              <h2 className="section-title text-3xl md:text-4xl mb-2">
                Massage Balinais
              </h2>
              <p className="text-stone-500 font-serif italic text-lg mb-6">
                « L'équilibre retrouvé »
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                Le <strong className="font-medium text-stone-800">massage Balinais</strong> est
                une technique de massage corps complet née sur l'île de Bali, en Indonésie. Il
                combine de manière unique quatre approches complémentaires : l'
                <strong className="font-medium text-stone-800">acupression</strong> sur les points
                énergétiques, des <strong className="font-medium text-stone-800">étirements doux</strong>,
                la <strong className="font-medium text-stone-800">réflexologie</strong> et l'
                <strong className="font-medium text-stone-800">aromathérapie</strong> par application
                d'huiles essentielles sélectionnées.
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                Les manœuvres alternent entre pressions fermes, pétrissages profonds et effleurages
                enveloppants — le tout dans un rythme fluide et continu qui plonge le corps dans un
                état de détente profonde. Le massage Balinais libère les nœuds de tension les plus
                tenaces et restaure la circulation énergétique dans tout l'organisme.
              </p>

              {/* Bienfaits */}
              <div className="bg-white rounded-2xl p-5 mb-6 border border-sand-100 shadow-sm">
                <h3 className="font-serif text-base font-light text-stone-800 mb-3">Bienfaits</h3>
                <ul className="space-y-2">
                  {[
                    'Relâchement profond des tensions musculaires',
                    'Libération des contractures chroniques',
                    'Stimulation de la circulation sanguine et lymphatique',
                    'Rééquilibrage énergétique par acupression',
                    'Amélioration de la flexibilité et de la mobilité',
                    "Soulagement des maux de dos, d'épaules et de nuque",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pour qui */}
              <div className="bg-sage-50 rounded-2xl p-5 mb-6 border border-sage-100">
                <h3 className="font-serif text-base font-light text-stone-800 mb-2">Pour qui ?</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Recommandé pour les personnes souffrant de
                  <strong className="text-stone-800"> tensions musculaires profondes</strong>,
                  de douleurs chroniques (dos, nuque, épaules) ou ayant besoin d'une
                  <strong className="text-stone-800"> détente intense et durable</strong>.
                  Parfait après une période de surmenage physique ou intellectuel.
                </p>
              </div>

              <a href="https://www.planity.com/soleana-bien-etre-31810-venerque" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Calendar size={16} />
                Réserver un massage Balinais
              </a>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={getUrl('massages-secondary')}
                  alt="Massage Balinais – Soléana Bien-Être Venerque"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-sage-700 text-white rounded-2xl p-5 shadow-xl">
                <p className="font-serif text-xl font-light">75 – 90 min</p>
                <p className="text-sage-200 text-xs mt-1">détente profonde</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MASSAGE PRÉ ET POST NATAL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="prenatal">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={getUrl('massages-tertiary')}
                  alt="Massage prénatal et postnatal – Soléana Bien-Être Venerque"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-nude-600 text-white rounded-2xl p-5 shadow-xl">
                <p className="font-serif text-xl font-light">60 min</p>
                <p className="text-nude-200 text-xs mt-1">douceur absolue</p>
              </div>
            </div>

            {/* Contenu */}
            <div className="order-1 lg:order-2">
              <span className="tag">Maternité • Périnatalité</span>
              <h2 className="section-title text-3xl md:text-4xl mb-2">
                Massage Pré et Post Natal
              </h2>
              <p className="text-stone-500 font-serif italic text-lg mb-6">
                « Prendre soin de vous, prendre soin de la vie »
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                La <strong className="font-medium text-stone-800">grossesse</strong> est une
                période de transformations intenses — physiques, émotionnelles et énergétiques.
                Notre massage prénatal est spécifiquement conçu et adapté pour accompagner les
                femmes enceintes avec douceur, sécurité et bienveillance.
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                Les techniques utilisées sont adaptées à chaque trimestre et à la morphologie
                spécifique de la grossesse : position en décubitus latéral sécurisé, manœuvres
                exclusivement en effleurage et pétrissage doux, sans pression sur le ventre ni
                les zones à éviter. Le massage post-natal accompagne quant à lui la jeune maman
                dans sa récupération physique et émotionnelle.
              </p>

              {/* Bienfaits */}
              <div className="bg-sand-50 rounded-2xl p-5 mb-5 border border-sand-100">
                <h3 className="font-serif text-base font-light text-stone-800 mb-3">Bienfaits</h3>
                <ul className="space-y-2">
                  {[
                    'Soulagement des douleurs dorsales et lombaires',
                    'Réduction des œdèmes et gonflements des membres',
                    'Diminution de la fatigue et amélioration du sommeil',
                    "Apaisement de l'anxiété et du stress prénatal",
                    "Préparation du corps à l'accouchement",
                    'Soutien émotionnel pour la jeune maman (post-natal)',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-nude-600 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contre-indications */}
              <div className="bg-amber-50 rounded-2xl p-5 mb-6 border border-amber-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-sans font-medium text-stone-800 text-sm mb-2">
                      Précautions importantes
                    </h3>
                    <ul className="space-y-1.5 text-xs text-stone-600 leading-relaxed">
                      <li>• Déconseillé au <strong>1<sup>er</sup> trimestre</strong> de grossesse</li>
                      <li>• Accord de votre médecin ou sage-femme recommandé</li>
                      <li>• Contre-indiqué en cas de grossesse à risque ou de placenta prævia</li>
                      <li>• Informez systématiquement votre praticienne de votre terme</li>
                    </ul>
                  </div>
                </div>
              </div>

              <a href="https://www.planity.com/soleana-bien-etre-31810-venerque" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Calendar size={16} />
                Réserver un massage prénatal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Déroulement d'une séance ───────────────────────────────────── */}
      <section className="section-padding bg-sand-50 bg-texture">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <span className="tag">Protocole</span>
            <h2 className="section-title text-3xl md:text-4xl">Déroulement d'une séance</h2>
            <p className="text-stone-500 mt-4 max-w-md mx-auto">
              Chaque séance est un moment unique, adapté à vos besoins du moment.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-sand-200 hidden md:block" />
            <div className="space-y-6">
              {sessionSteps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start relative">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-white border-2 border-sand-300 flex items-center justify-center z-10 shadow-sm">
                    <span className="font-serif text-sm font-light text-stone-600">{step.number}</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 flex-1 border border-sand-100 shadow-sm">
                    <h3 className="font-serif text-lg font-light text-stone-800 mb-1">{step.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Précautions générales ──────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="tag">Informations importantes</span>
            <h2 className="section-title text-3xl md:text-4xl">Précautions générales</h2>
            <p className="text-stone-500 mt-4 max-w-md mx-auto">
              Pour profiter pleinement de votre séance et en optimiser les bienfaits.
            </p>
          </div>
          <div className="bg-sand-50 rounded-3xl p-8 border border-sand-100">
            <ul className="space-y-4">
              {precautions.map((p, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-nude-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-nude-700 text-xs font-medium">{i + 1}</span>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">{p}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-stone-600">
                <strong className="text-stone-800">Important :</strong> nos massages bien-être sont
                des soins à visée relaxante et ne sauraient se substituer à un traitement médical.
                En cas de doute sur votre état de santé, consultez toujours votre médecin.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/contact" className="btn-primary">
              <Calendar size={16} />
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tarifs rapides ────────────────────────────────────────────── */}
      <section className="section-padding bg-stone-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          }}
        />
        <div className="relative z-10 container-wide">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-sans font-medium tracking-widest uppercase text-nude-300 mb-4">
              Tarifs
            </span>
            <h2 className="font-serif font-light text-white text-3xl md:text-4xl">
              Réservez votre massage
            </h2>
            <p className="text-stone-400 mt-4 max-w-md mx-auto text-sm">
              Séances à l'unité ou en forfait — contactez-nous pour un devis personnalisé.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                label: 'Massage Ayurvédique Abhyanga',
                duration: '60 ou 90 min',
                href: '#abhyanga',
              },
              {
                label: 'Massage Balinais',
                duration: '75 ou 90 min',
                href: '#balinais',
              },
              {
                label: 'Massage Pré & Post Natal',
                duration: '60 min',
                href: '#prenatal',
              },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="font-serif text-lg font-light text-white mb-2">{m.label}</h3>
                <div className="flex items-center gap-1.5 mb-5">
                  <Clock size={12} className="text-stone-400" />
                  <span className="text-xs text-stone-400">{m.duration}</span>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-nude-300 hover:text-nude-200 transition-colors group"
                >
                  Demander un devis
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="section-padding bg-sand-50">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="tag">Questions fréquentes</span>
            <h2 className="section-title text-3xl md:text-4xl">Vos questions sur les massages</h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <CTABanner
        title="Prête à vous offrir un moment de bien-être absolu ?"
        subtitle="Réservez votre massage bien-être à Venerque et laissez votre corps retrouver sa sérénité."
      />
    </main>
  );
}
