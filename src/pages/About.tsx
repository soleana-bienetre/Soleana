import { useSiteImages } from '../contexts/SiteImagesContext';
import { PageMeta } from '../lib/useMeta';
import { Link } from 'react-router-dom';
import {
  Heart,
  Ear,
  Feather,
  Shield,
  User,
  Star,
  CheckCircle2,
  Leaf,
  Quote,
  Award,
  Clock,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';

const ESTIME_SENS_IMAGE =
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/essences-destime.webp';

const values = [
  {
    icon: Ear,
    title: 'Écoute',
    description:
      'Chaque consultation commence par un échange sincère. Laetitia prend le temps de comprendre vos besoins, vos attentes et vos préférences pour vous proposer le soin le plus adapté.',
    color: 'bg-nude-50',
    iconColor: 'text-nude-600',
  },
  {
    icon: Feather,
    title: 'Douceur',
    description:
      "La douceur est au cœur de chaque geste. Qu'il s'agisse d'une épilation, d'un soin du visage ou d'un massage, vous êtes entre les mains expertes et attentionnées de votre praticienne.",
    color: 'bg-sand-50',
    iconColor: 'text-sand-600',
  },
  {
    icon: Shield,
    title: 'Professionnalisme',
    description:
      "Fort d'un parcours alliant le monde médical et l'esthétique, Laetitia allie rigueur, formation continue et utilisation de matériels et produits de haute qualité.",
    color: 'bg-sage-50',
    iconColor: 'text-sage-600',
  },
  {
    icon: User,
    title: 'Personnalisation',
    description:
      'Aucun protocole standardisé ici. Chaque soin est adapté à votre morphologie, votre peau, vos préférences et vos objectifs. Vous repartez avec un programme pensé uniquement pour vous.',
    color: 'bg-ecru-50',
    iconColor: 'text-ecru-700',
  },
];

const formations = [
  {
    title: 'Formation massage TEMANA',
    description:
      "Technique de massage profond intégrant mobilisations articulaires et travail musculaire, pour un relâchement global du corps et de l'esprit.",
    type: 'Bien-être',
    color: 'border-nude-300 bg-nude-50',
    badgeColor: 'bg-nude-100 text-nude-700',
    icon: Heart,
  },
  {
    title: 'Formation socle laser AESTAM Paris',
    description:
      "Formation de référence en épilation laser auprès de l'Institut AESTAM Paris, école spécialisée dans les technologies laser et les protocoles de sécurité avancés.",
    type: 'Technologie laser',
    color: 'border-ecru-300 bg-ecru-50',
    badgeColor: 'bg-ecru-100 text-ecru-800',
    icon: Leaf,
  },
  {
    title: 'Certificat Socio-Esthétique',
    description:
      "Diplôme permettant d'exercer l'esthétique auprès de personnes fragilisées (malades, personnes âgées, personnes en situation de précarité), en milieu médical ou associatif.",
    type: "Diplôme d'État",
    color: 'border-sage-300 bg-sage-50',
    badgeColor: 'bg-sage-100 text-sage-700',
    icon: Award,
  },
  {
    title: "Diplôme d'État Infirmière",
    description:
      "Formation complète au soin infirmier, base d'une approche rigoureuse, bienveillante et médicalement informée du bien-être et de la santé.",
    type: 'Médical',
    color: 'border-stone-200 bg-stone-50',
    badgeColor: 'bg-stone-100 text-stone-600',
    icon: Shield,
  },
  {
    title: 'Diplôme Aide-soignante',
    description:
      "Expérience du soin humain quotidien, de l'accompagnement et du confort des patients — une sensibilité précieuse dans l'approche holistique du bien-être.",
    type: 'Médical',
    color: 'border-stone-200 bg-stone-50',
    badgeColor: 'bg-stone-100 text-stone-600',
    icon: User,
  },
  {
    title: 'BP Esthétique Cosmétique Parfumerie',
    description:
      "Brevet Professionnel en esthétique, attestant d'une maîtrise complète des techniques esthétiques professionnelles et de la relation client en institut.",
    type: 'Esthétique',
    color: 'border-sand-300 bg-sand-50',
    badgeColor: 'bg-sand-100 text-sand-700',
    icon: Star,
  },
  {
    title: 'CAP Esthétique Cosmétique Parfumerie',
    description:
      "Première formation professionnelle qui a posé les bases solides du métier d'esthéticienne, socle indispensable à l'exercice de la profession.",
    type: 'Esthétique',
    color: 'border-sand-300 bg-sand-50',
    badgeColor: 'bg-sand-100 text-sand-700',
    icon: Star,
  },
];

const reasons = [
  {
    icon: Award,
    title: 'Un double parcours unique',
    description:
      "L'alliance du milieu médical (infirmière, aide-soignante) et de l'esthétique confère à Laetitia une approche du corps et du soin particulièrement complète et bienveillante.",
  },
  {
    icon: Heart,
    title: 'Une relation de confiance',
    description:
      "Dès la première séance, vous vous sentez écoutée, respectée et entre de bonnes mains. La qualité de l'accueil fait partie intégrante du soin chez Soléana.",
  },
  {
    icon: Leaf,
    title: "Des produits d'exception",
    description:
      "Soléana utilise la gamme Estime & Sens, des cosmétiques naturels, biologiques et fabriqués en France, formulés pour respecter la peau et l'environnement.",
  },
  {
    icon: Leaf,
    title: 'Protocoles personnalisés',
    description:
      'Pas de copier-coller : chaque soin est adapté à votre peau, vos besoins du moment et vos objectifs. Votre praticienne ajuste son protocole à chaque séance.',
  },
  {
    icon: Clock,
    title: 'Flexibilité & disponibilité',
    description:
      "Avec des horaires flexibles et la réservation en ligne 24h/24, prendre soin de soi s'intègre facilement dans votre emploi du temps.",
  },
  {
    icon: CheckCircle2,
    title: 'Un cadre certifié & sécurisé',
    description:
      "Le matériel laser est homologué et conforme aux normes en vigueur. Les protocoles d'hygiène et de sécurité sont irréprochables à chaque prestation.",
  },
];

export default function About() {
  const { getUrl } = useSiteImages();

  return (
    <main>
      <PageMeta
        title="À propos Soléana | Institut bien-être & esthétique Venerque"
        description="Découvrez l’univers Soléana à Venerque : un institut qui unit expertise esthétique, soins experts et accompagnement sur mesure pour votre bien-être."
        url="https://www.soleana-bienetre.com/a-propos"
      />
      {/* ── PAGE HERO ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getUrl('about-hero')}
            alt="Institut Soléana Bien-Être – espace d'accueil"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/65 via-stone-900/50 to-stone-900/70" />
        </div>
        <div className="relative z-10 container-narrow">
          <div className="mt-8">
            <span className="tag text-nude-200">Notre histoire</span>
            <h1 className="font-serif font-light text-white text-4xl sm:text-5xl md:text-6xl mt-2 mb-6 leading-tight">
              Un lieu qui nous<br />
              <em className="text-nude-200">ressemble</em>
            </h1>
            <p className="text-white/75 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              Découvrez le parcours de Laetitia Sevrin, les valeurs qui fondent Soléana
              Bien-Être, et pourquoi tant de clientes nous font confiance depuis notre ouverture.
            </p>
          </div>
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5]">
                <img
                  src={getUrl('about-portrait')}
                  alt="Accueil de l'institut Soléana Bien-Être à Venerque"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Floating quote badge */}
              <div className="absolute -bottom-6 left-4 right-4 md:-right-6 glass-card p-5 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-nude-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Quote size={16} className="text-nude-600" />
                  </div>
                  <div>
                    <p className="font-serif text-base md:text-lg font-light text-stone-700 italic leading-snug">
                      "Un cocon chaleureux et apaisant, pensé pour votre bien-être."
                    </p>
                    <p className="font-sans text-stone-400 text-xs mt-2">— Laetitia Sevrin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="pt-8 lg:pt-0">
              <span className="tag">Qui suis-je ?</span>
              <h2 className="section-title text-4xl md:text-5xl mb-8">
                Mon<br />
                <em>parcours</em>
              </h2>
              <div className="space-y-5 text-stone-600 leading-relaxed">
                <p>
                  Avant de fonder Soléana Bien-Être, j'ai consacré de nombreuses
                  années au soin des autres dans le milieu médical, d'abord comme
                  <strong className="text-stone-800"> aide-soignante</strong>, puis comme
                  <strong className="text-stone-800"> infirmière diplômée d'État</strong>. Ces
                  années passées au contact des patients m'ont forgé une sensibilité profonde
                  à l'être humain, une écoute bienveillante et une approche globale du soin.
                </p>
                <p>
                  En parallèle, ma passion pour l'esthétique n'a jamais faibli. Titulaire
                  d'un <strong className="text-stone-800">CAP</strong> et d'un{' '}
                  <strong className="text-stone-800">BP Esthétique Cosmétique Parfumerie</strong>,
                  j'ai également obtenu un{' '}
                  <strong className="text-stone-800">Certificat de Socio-Esthétique</strong>,
                  attestant de ma capacité à prendre soin des personnes les plus vulnérables
                  avec respect et expertise.
                </p>
                <p>
                  C'est la rencontre de ces deux univers — le médical et l'esthétique —
                  qui a donné naissance à Soléana Bien-Être. Formée au{' '}
                  <strong className="text-stone-800">massage TEMANA</strong> et à
                  l'<strong className="text-stone-800">épilation laser par l'Institut AESTAM Paris</strong>,
                  je propose aujourd'hui des soins d'une qualité rare, alliant
                  techniques avancées et présence humaine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ───────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container-wide">
          <div className="text-center mb-8">
            <span className="tag">L'institut en images</span>
            <h2 className="section-title text-3xl md:text-4xl">
              Nos espaces,<br />
              <em>pensés pour votre confort</em>
            </h2>
          </div>
          {(() => {
            const fixed = [
              { key: 'about-gallery-1', url: getUrl('about-gallery-1'), label: 'Espace d\'accueil', sub: 'Un cadre chaleureux dès l\'entrée', fit: 'object-cover object-center' },
              { key: 'about-gallery-3', url: getUrl('about-gallery-3'), label: 'Cabine massage & détente', sub: 'Huiles Estime & Sens, 100% naturelles', fit: 'object-cover object-center' },
              { key: 'about-gallery-4', url: getUrl('about-gallery-4'), label: 'Salle de soins', sub: 'Un espace pensé pour votre confort', fit: 'object-cover object-center' },
            ];
            const extra = ['about-gallery-5', 'about-gallery-6']
              .map((k) => ({ key: k, url: getUrl(k) }))
              .filter((e) => e.url && !e.url.startsWith('/Capture'))
              .map((e) => ({ key: e.key, url: e.url, label: 'Institut Soléana', sub: '', fit: 'object-cover object-center' }));
            const allPhotos = [...fixed, ...extra];
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allPhotos.map((photo) => (
                  <div key={photo.key} className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] group bg-stone-50">
                    <img
                      src={photo.url}
                      alt={`${photo.label} – Soléana Bien-Être`}
                      className={`w-full h-full ${photo.fit} transition-transform duration-500 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {photo.label && (
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-serif text-lg font-light">{photo.label}</p>
                        {photo.sub && <p className="font-sans text-xs text-white/70 mt-0.5">{photo.sub}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── QUOTE ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-nude-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container-narrow text-center">
          <Quote size={40} className="text-nude-200 mx-auto mb-6" />
          <blockquote>
            <p className="font-serif font-light text-white text-2xl md:text-3xl lg:text-4xl italic leading-relaxed max-w-3xl mx-auto text-balance">
              "Après plusieurs années dans le soin en tant qu'infirmière et aide-soignante,
              et ayant également vécu une expérience dans l'esthétique, j'ai souhaité créer
              un lieu qui me ressemble : un cocon chaleureux et apaisant, pensé pour votre
              bien-être et votre détente."
            </p>
            <footer className="mt-8">
              <p className="font-sans text-nude-100 font-medium tracking-wide">Laetitia Sevrin</p>
              <p className="font-sans text-nude-200/70 text-sm mt-1">Fondatrice de Soléana Bien-Être</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Ce qui nous guide</span>
            <h2 className="section-title text-4xl md:text-5xl">
              Nos valeurs,<br />
              <em>au cœur de chaque soin</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl p-7 border border-sand-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className={`w-14 h-14 rounded-full ${value.color} flex items-center justify-center mx-auto mb-5`}>
                  <value.icon size={26} className={value.iconColor} />
                </div>
                <h3 className="font-serif text-2xl font-light text-stone-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATIONS ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-sand-50 bg-texture">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Parcours & diplômes</span>
            <h2 className="section-title text-4xl md:text-5xl">
              Formations &<br />
              <em>qualifications</em>
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto mt-4 text-base">
              Un parcours professionnel riche et diversifié, au service de votre bien-être.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {formations.map((formation, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-6 ${formation.color} transition-all duration-300 hover:shadow-sm`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shrink-0 shadow-sm">
                    <formation.icon size={18} className="text-stone-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 mb-2">
                      <h4 className="font-serif text-lg font-light text-stone-800 flex-1">
                        {formation.title}
                      </h4>
                    </div>
                    <span className={`inline-block text-xs font-sans font-medium px-2.5 py-1 rounded-full mb-3 ${formation.badgeColor}`}>
                      {formation.type}
                    </span>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {formation.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="tag">Pourquoi Soléana ?</span>
              <h2 className="section-title text-4xl md:text-5xl mb-6">
                Pourquoi choisir<br />
                <em>Soléana Bien-Être ?</em>
              </h2>
              <p className="text-stone-600 leading-relaxed mb-8 text-base md:text-lg">
                Il existe de nombreux instituts de beauté, mais Soléana Bien-Être se distingue
                par une approche profondément humaine, une expertise multidisciplinaire
                et un engagement sincère envers votre bien-être.
              </p>
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
                <img
                  src={getUrl('about-why')}
                  alt="Cabine de soins et épilation laser – Soléana Bien-Être"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                  <span className="badge bg-white/80 backdrop-blur-sm">Parking gratuit</span>
                  <span className="badge bg-white/80 backdrop-blur-sm">Réservation en ligne</span>
                  <span className="badge bg-white/80 backdrop-blur-sm">Note 5/5</span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-sand-50 border border-sand-100 hover:border-nude-200 hover:bg-nude-50/50 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <reason.icon size={20} className="text-nude-600" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-light text-stone-800 mb-1.5">
                      {reason.title}
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTIME & SENS ──────────────────────────────────────────────── */}
      <section className="section-padding bg-sage-50">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video lg:aspect-square">
              <img
                src={getUrl('about-estime-sens')}
                alt="Cabine de massage avec huiles Estime & Sens – Soléana Bien-Être"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = ESTIME_SENS_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 to-transparent" />
              <div className="absolute bottom-5 left-5 glass-card px-4 py-3">
                <div className="flex items-center gap-2">
                  <Leaf size={16} className="text-sage-600" />
                  <span className="font-sans font-medium text-stone-700 text-sm">Cosmétiques naturels & bio</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="tag text-sage-600">Nos produits</span>
              <h2 className="section-title text-4xl md:text-5xl mb-6">
                La gamme<br />
                <em className="text-sage-700">Estime & Sens</em>
              </h2>
              <p className="text-stone-600 leading-relaxed mb-5 text-base md:text-lg">
                Chez Soléana Bien-Être, nous avons fait le choix exigeant de travailler
                exclusivement avec la marque <strong className="text-stone-800">Estime & Sens</strong>,
                une référence française dans le domaine de la cosmétique naturelle et biologique.
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                Née d'une philosophie de respect — respect de la peau, des personnes
                et de la planète — la gamme Estime & Sens propose des soins aux textures
                sensorielles exceptionnelles, formulés à partir d'actifs naturels certifiés,
                sans perturbateurs endocriniens ni substances controversées.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                Chaque produit est pensé pour sublimer votre peau tout en respectant
                son équilibre naturel. Du nettoyant à la crème hydratante, en passant
                par les masques et les sérums, chaque texture est un véritable rituel
                de douceur pour les sens.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  'Certifié bio',
                  'Fabriqué en France',
                  'Vegan & cruelty-free',
                  'Sans perturbateurs',
                  'Sensoriel & efficace',
                ].map((label) => (
                  <span key={label} className="badge border-sage-200 bg-white/70">
                    <Leaf size={11} className="text-sage-500" />
                    {label}
                  </span>
                ))}
              </div>
              <Link to="/tarifs" className="btn-secondary border-sage-400 text-sage-700 hover:bg-sage-50 hover:border-sage-500">
                Découvrir nos soins
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINI REASSURANCE ─────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white border-t border-sand-100">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Star, value: '5/5', label: 'Note clients' },
              { icon: Award, value: '7+', label: 'Diplômes & formations' },
              { icon: Heart, value: '100%', label: 'Soins personnalisés' },
              { icon: Leaf, value: 'Bio', label: 'Produits certifiés' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-nude-50 flex items-center justify-center">
                  <stat.icon size={22} className="text-nude-600" />
                </div>
                <p className="font-serif text-3xl font-light text-stone-800">{stat.value}</p>
                <p className="font-sans text-stone-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <CTABanner
        title="Prête à vivre l'expérience Soléana ?"
        subtitle="Prenez rendez-vous en ligne ou appelez Laetitia pour un premier échange. Un accueil chaleureux vous attend."
      />
    </main>
  );
}
