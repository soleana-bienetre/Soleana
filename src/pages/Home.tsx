import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Star,
  MapPin,
  Phone,
  Clock,
  Car,
  Calendar,
  Sparkles,
  Heart,
  Shield,
  Leaf,
  Zap,
  Hand,
  Waves,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import FAQAccordion from '../components/ui/FAQAccordion';
import { testimonials } from '../data/testimonials';

const faqItems = [
  {
    question: 'Comment prendre rendez-vous chez Soléana Bien-Être ?',
    answer:
      "Vous pouvez réserver votre séance directement en ligne via notre système de réservation, disponible 24h/24 et 7j/7. Vous pouvez également nous contacter par téléphone au 07 62 16 98 14 pendant les heures d\'ouverture. Nous vous recommandons d\'anticiper votre rendez-vous, notamment pour les soins du visage et l\'épilation laser.",
  },
  {
    question: "L\'épilation laser est-elle douloureuse ?",
    answer:
      "L\'épilation laser est généralement bien tolérée. La sensation est souvent décrite comme un léger picotement. Laetitia adapte les paramètres du laser en fonction de votre phototype et de votre sensibilité pour un confort optimal tout au long de la séance. La plupart des clientes sont agréablement surprises par la douceur du traitement.",
  },
  {
    question: "Combien de séances sont nécessaires pour l\'épilation laser ?",
    answer:
      "Le nombre de séances varie selon la zone traitée, la densité du poil et votre profil hormonal. En moyenne, comptez entre 6 et 10 séances pour un résultat durable. Un bilan personnalisé est réalisé lors de votre première consultation afin d\'établir un programme adapté à vos besoins.",
  },
  {
    question: "Qu\'est-ce que le Kobido et quels sont ses bienfaits ?",
    answer:
      `Le Kobido est un massage facial japonais ancestral, surnommé "le lifting naturel". Il associe des manœuvres de pétrissage profond, de stimulation des points d\'acupression et de drainage lymphatique pour tonifier les muscles du visage, illuminer le teint et atténuer les signes du temps. Les résultats sont visibles dès la première séance.`,
  },
  {
    question: 'Y a-t-il un parking à disposition ?',
    answer:
      "Oui, un parking gratuit est disponible à proximité de l\'institut, ce qui rend notre accès très pratique, que vous veniez de Venerque, d\'Auterive, de Labarthe-sur-Lèze ou des communes voisines. L\'adresse complète est : 1 Rue de la Fraternité, 31810 Venerque.",
  },
];

const services = [
  {
    icon: Zap,
    title: 'Épilation laser',
    slug: 'epilation-laser',
    description:
      'Une solution durable et efficace pour une peau durablement lisse. Protocole adapté à chaque phototype pour un confort maximal.',
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Technologie avancée',
  },
  {
    icon: Sparkles,
    title: 'Soins du visage',
    slug: 'soins-visage',
    description:
      "Des soins sur-mesure pour révéler l\'éclat naturel de votre peau. Hydratation, éclat, anti-âge : des rituels personnalisés avec des produits d\'exception.",
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Soin signature',
  },
  {
    icon: Hand,
    title: 'Kobido',
    slug: 'kobido',
    description:
      'Le massage facial japonais ancestral, véritable lifting naturel. Tonifie, sculpte et illumine le visage pour un teint rayonnant.',
    image: 'https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Art japonais',
  },
  {
    icon: Heart,
    title: 'Massages bien-être',
    slug: 'massages',
    description:
      'Des massages profonds et enveloppants pour relâcher les tensions, apaiser le corps et retrouver une harmonie intérieure profonde.',
    image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Détente totale',
  },
  {
    icon: Waves,
    title: 'Drainage & Maderothérapie',
    slug: 'drainage-maderotherapie',
    description:
      'Des techniques manuelles et aux galets de bois pour stimuler la circulation, réduire la cellulite et redessiner les contours du corps.',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Modelage corps',
  },
];

const reassuranceItems = [
  {
    icon: Shield,
    title: 'Expertise certifiée',
    desc: 'Diplômée & formée aux dernières techniques',
  },
  {
    icon: Heart,
    title: 'Cadre cocooning',
    desc: 'Un cocon chaleureux pensé pour votre détente',
  },
  {
    icon: Sparkles,
    title: 'Soins personnalisés',
    desc: 'Chaque protocole est adapté à vos besoins',
  },
  {
    icon: Car,
    title: 'Parking gratuit',
    desc: 'Accès facile depuis toute la région',
  },
  {
    icon: Calendar,
    title: 'Réservation en ligne',
    desc: 'Disponible 24h/24, 7j/7',
  },
];

const hours = [
  { day: 'Lundi', time: 'Fermé', closed: true },
  { day: 'Mardi', time: '09:00 – 18:00', closed: false },
  { day: 'Mercredi', time: '09:00 – 11:00', closed: false },
  { day: 'Jeudi', time: '09:00 – 20:00', closed: false },
  { day: 'Vendredi', time: '09:00 – 18:00', closed: false },
  { day: 'Samedi', time: '09:00 – 13:30', closed: false },
  { day: 'Dimanche', time: 'Fermé', closed: true },
];

export default function Home() {
  useEffect(() => {
    document.title =
      "Soléana Bien-Être | Institut de bien-être et d\'esthétique à Venerque (31810)";
  }, []);

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/hero-spa.png"
            alt="Moment de détente au spa – Soléana Bien-Être à Venerque"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/50 to-stone-900/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-transparent to-stone-900/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-2xl">
            <p className="tag text-nude-200 tracking-widest mb-5 text-xs md:text-sm">
              Venerque · Haute-Garonne (31)
            </p>
            <h1 className="font-serif font-light text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-balance">
              Institut de bien-être<br className="hidden sm:block" />
              <span className="italic text-nude-200"> et d'esthétique</span><br className="hidden sm:block" />
              à Venerque
            </h1>
            <p className="text-lg md:text-xl text-white/85 font-light max-w-xl mb-10 leading-relaxed">
              Un espace de soin et de détente pensé pour vous.
              Épilation laser, soins du visage, Kobido, massages et modelage corps
              — tous les soins signés Soléana Bien-Être.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link to="/contact" className="btn-primary text-base px-8 py-4 shadow-lg shadow-nude-900/30">
                <Calendar size={18} />
                Prendre rendez-vous
              </Link>
              <Link to="/soins" className="btn-outline-light text-base px-8 py-4">
                <Sparkles size={18} />
                Découvrir les soins
              </Link>
            </div>

            {/* Rating badge */}
            <div className="mt-10 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-ecru-400 text-ecru-400" />
                ))}
              </div>
              <span className="text-white/90 text-sm font-medium">5/5 – Avis clients vérifiés</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-xs tracking-widest uppercase font-sans">Découvrir</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── REASSURANCE BAR ──────────────────────────────────────────────── */}
      <section className="bg-white border-b border-sand-100 py-8 md:py-10">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {reassuranceItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-nude-50 flex items-center justify-center group-hover:bg-nude-100 transition-colors duration-200">
                  <item.icon size={22} className="text-nude-600" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-stone-800 text-sm">{item.title}</p>
                  <p className="font-sans text-stone-500 text-xs mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5]">
                <img
                  src="/decouvir.png"
                  alt="Institut Soléana Bien-Être – espace soin"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 md:right-0 glass-card p-5 max-w-[200px] shadow-xl">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-ecru-500 text-ecru-500" />
                  ))}
                </div>
                <p className="font-serif text-stone-800 text-sm leading-snug">
                  "Un vrai moment de bonheur, je recommande !"
                </p>
                <p className="font-sans text-stone-400 text-xs mt-2">— Sophie M., Venerque</p>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <span className="tag">Notre histoire</span>
              <h2 className="section-title text-4xl md:text-5xl mb-6">
                Bienvenue chez<br />
                <em>Soléana Bien-Être</em>
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4 text-base md:text-lg">
                Soléana Bien-Être est un institut de soin et d'esthétique niché à Venerque,
                en Haute-Garonne. Fondé par Laetitia Sevrin, il est né d'un désir profond :
                créer un lieu chaleureux, bienveillant et professionnel, où chaque personne
                se sent accueillie et choyée.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8 text-base">
                De l'épilation laser aux soins du visage, du Kobido aux massages bien-être,
                chaque soin est pensé pour vous ressourcer en profondeur. Ici, la technique
                rencontre la douceur, pour des résultats visibles et une expérience inoubliable.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Épilation laser', 'Soins visage', 'Kobido', 'Massages', 'Maderothérapie'].map((s) => (
                  <span key={s} className="badge">{s}</span>
                ))}
              </div>
              <Link to="/a-propos" className="btn-secondary">
                Découvrir notre histoire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
      <section className="section-padding bg-sand-50 bg-texture">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Nos prestations</span>
            <h2 className="section-title text-4xl md:text-5xl mb-4">
              Des soins d'exception,<br />
              <em>pensés pour vous</em>
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto text-base">
              De la beauté du visage à la sérénité du corps, découvrez notre gamme
              complète de soins esthétiques et bien-être.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <Link
                key={service.slug}
                to={`/soins/${service.slug}`}
                className={`card-service group ${idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  <span className="absolute top-4 left-4 tag bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-nude-700 text-xs font-medium">
                    {service.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-nude-50 flex items-center justify-center shrink-0">
                      <service.icon size={18} className="text-nude-600" />
                    </div>
                    <h3 className="font-serif text-xl font-light text-stone-800 group-hover:text-nude-700 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-nude-600 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                    En savoir plus
                    <ChevronDown size={14} className="-rotate-90" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/soins" className="btn-primary">
              Voir tous nos soins & tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT LAETITIA ───────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <span className="tag">Votre praticienne</span>
              <h2 className="section-title text-4xl md:text-5xl mb-6">
                Laetitia Sevrin<br />
                <em className="text-nude-600 text-3xl md:text-4xl">fondatrice de Soléana</em>
              </h2>

              <blockquote className="relative mb-8 pl-6 border-l-2 border-nude-300">
                <Quote size={28} className="text-nude-200 mb-3" />
                <p className="font-serif text-xl md:text-2xl font-light text-stone-700 italic leading-relaxed">
                  "Après plusieurs années dans le soin en tant qu'infirmière et aide-soignante,
                  j'ai souhaité créer un lieu qui me ressemble : un cocon chaleureux et apaisant,
                  pensé pour votre bien-être."
                </p>
                <footer className="mt-4 font-sans text-sm text-stone-400">— Laetitia Sevrin, fondatrice</footer>
              </blockquote>

              <p className="text-stone-600 leading-relaxed mb-6">
                Forte d'un parcours riche entre le monde du soin médical et l'esthétique,
                Laetitia a réuni ces deux univers pour offrir une approche globale, bienveillante
                et professionnelle du bien-être. Son expertise repose sur des formations
                reconnues et une passion sincère pour l'accompagnement humain.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {['Infirmière', 'Aide-soignante', 'BP esthétique', 'Formation laser AESTAM', 'Massage TEMANA', 'Socio-esthétique'].map((d) => (
                  <span key={d} className="badge">{d}</span>
                ))}
              </div>

              <Link to="/a-propos" className="btn-secondary">
                Son parcours complet
              </Link>
            </div>

            {/* Photo */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4]">
                <img
                  src="https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Laetitia Sevrin – praticienne Soléana Bien-Être"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
              </div>
              {/* Credential badge */}
              <div className="absolute -top-5 -left-4 md:left-0 glass-card p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                    <Leaf size={18} className="text-sage-600" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-stone-800 text-sm">Produits bio</p>
                    <p className="font-sans text-stone-400 text-xs">Gamme Estime & Sens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-nude-50">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="tag">Témoignages</span>
            <h2 className="section-title text-4xl md:text-5xl mb-4">
              Ce que disent<br />
              <em>nos clientes</em>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-ecru-500 text-ecru-500" />
                ))}
              </div>
              <span className="text-stone-500 font-sans text-sm ml-1">5/5 – Note moyenne</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.filter((t) => t.name !== '[Prénom N.]').map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-7 shadow-sm border border-nude-100 hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-ecru-400 text-ecru-400" />
                  ))}
                </div>
                {testimonial.service && (
                  <span className="badge mb-4 self-start">{testimonial.service}</span>
                )}
                <blockquote className="flex-1 font-serif text-lg font-light text-stone-700 italic leading-relaxed mb-5">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-sand-100">
                  <div className="w-10 h-10 rounded-full bg-nude-100 flex items-center justify-center shrink-0">
                    <span className="font-sans font-semibold text-nude-700 text-sm">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-stone-800 text-sm">{testimonial.name}</p>
                    <div className="flex items-center gap-1 text-stone-400 text-xs">
                      <MapPin size={11} />
                      <span>{testimonial.location}</span>
                      {testimonial.date && <span>· {testimonial.date}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/avis" className="btn-secondary">
              Voir tous les avis
            </Link>
          </div>
        </div>
      </section>

      {/* ── LOCAL SEO ────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <span className="tag">Secteur desservi</span>
          <h2 className="section-title text-3xl md:text-4xl mb-6">
            Votre institut de bien-être<br />
            <em>au cœur du sud toulousain</em>
          </h2>
          <p className="text-stone-600 leading-relaxed mb-6 text-base md:text-lg">
            Idéalement situé à <strong className="text-stone-800">Venerque (31810)</strong>,
            Soléana Bien-Être accueille les clientes de toute la région :
            <strong className="text-stone-800"> Auterive</strong>,{' '}
            <strong className="text-stone-800">Labarthe-sur-Lèze</strong>,{' '}
            <strong className="text-stone-800">Eaunes</strong>,{' '}
            <strong className="text-stone-800">Noé</strong>,{' '}
            <strong className="text-stone-800">Cintegabelle</strong>,{' '}
            <strong className="text-stone-800">Miremont</strong>,{' '}
            <strong className="text-stone-800">Le Fauga</strong> et plus largement
            tout le sud du département de la Haute-Garonne.
          </p>
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            À seulement 25 minutes de Toulouse, notre institut est facilement accessible
            depuis l'ensemble de la vallée de l'Ariège. Parking gratuit sur place,
            réservation en ligne disponible à toute heure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Venerque', 'Auterive', 'Labarthe-sur-Lèze', 'Eaunes', 'Noé', 'Cintegabelle', 'Miremont', 'Le Fauga'].map((ville) => (
              <span key={ville} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sand-50 border border-sand-200 rounded-full text-stone-600 text-sm">
                <MapPin size={12} className="text-nude-400" />
                {ville}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOURS + CONTACT ──────────────────────────────────────────────── */}
      <section className="section-padding bg-stone-50 bg-texture">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-sand-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-nude-50 flex items-center justify-center">
                  <Clock size={20} className="text-nude-600" />
                </div>
                <h3 className="font-serif text-2xl font-light text-stone-800">Horaires d'ouverture</h3>
              </div>
              <ul className="space-y-2.5">
                {hours.map((h) => (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between text-sm py-2 border-b border-sand-50 last:border-0 ${
                      h.closed ? 'text-stone-400' : 'text-stone-700'
                    }`}
                  >
                    <span className="font-medium font-sans">{h.day}</span>
                    <span className={`font-sans ${h.closed ? 'italic text-stone-400' : 'text-stone-600'}`}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 p-3 bg-sage-50 rounded-xl border border-sage-100">
                <p className="text-sage-700 text-xs font-sans leading-relaxed">
                  <CheckCircle2 size={12} className="inline mr-1.5" />
                  Réservation en ligne disponible 24h/24 – Prise de rendez-vous simple et rapide.
                </p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="lg:col-span-1 rounded-2xl overflow-hidden shadow-sm border border-sand-100 min-h-[280px] relative bg-sand-100">
              <img
                src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Soléana Bien-Être – 1 Rue de la Fraternité, Venerque"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="w-14 h-14 rounded-full bg-nude-600 shadow-lg flex items-center justify-center mb-4">
                  <MapPin size={24} className="text-white" />
                </div>
                <p className="font-serif text-xl text-stone-800 mb-1">Soléana Bien-Être</p>
                <p className="font-sans text-stone-600 text-sm">1 Rue de la Fraternité</p>
                <p className="font-sans text-stone-600 text-sm mb-4">31810 Venerque</p>
                <a
                  href="https://maps.google.com/?q=1+Rue+de+la+Fraternité+31810+Venerque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-5 py-2.5"
                >
                  Itinéraire GPS
                </a>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-sand-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-nude-50 flex items-center justify-center">
                  <Phone size={20} className="text-nude-600" />
                </div>
                <h3 className="font-serif text-2xl font-light text-stone-800">Nous contacter</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-widest mb-1.5">Téléphone</p>
                  <a
                    href="tel:0762169814"
                    className="font-serif text-2xl text-stone-800 hover:text-nude-600 transition-colors"
                  >
                    07 62 16 98 14
                  </a>
                </div>
                <div>
                  <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-widest mb-1.5">Adresse</p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    1 Rue de la Fraternité<br />
                    31810 Venerque<br />
                    Haute-Garonne (31)
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-widest mb-1.5">Accès</p>
                  <div className="flex items-center gap-2 text-stone-600 text-sm">
                    <Car size={15} className="text-sage-500 shrink-0" />
                    <span>Parking gratuit à proximité</span>
                  </div>
                </div>
              </div>
              <div className="mt-7 flex flex-col gap-3">
                <Link to="/contact" className="btn-primary justify-center">
                  <Calendar size={16} />
                  Prendre rendez-vous
                </Link>
                <a href="tel:0762169814" className="btn-phone justify-center">
                  <Phone size={16} />
                  07 62 16 98 14
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINI FAQ ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="tag">Questions fréquentes</span>
            <h2 className="section-title text-4xl md:text-5xl">
              Vos questions,<br />
              <em>nos réponses</em>
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
          <div className="text-center mt-10">
            <p className="text-stone-500 text-sm mb-4">Vous avez d'autres questions ?</p>
            <Link to="/contact" className="btn-secondary">
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <CTABanner
        title="Offrez-vous un moment rien que pour vous"
        subtitle="Réservez votre soin en ligne ou appelez-nous — Laetitia se fera un plaisir de vous accueillir."
      />
    </main>
  );
}
