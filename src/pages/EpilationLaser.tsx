import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Clock,
  Phone,
  AlertCircle,
  Sun,
  Snowflake,
  Shield,
  Star,
  Info,
  Calendar,
  Users,
  Leaf,
  ExternalLink,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import FAQAccordion from '../components/ui/FAQAccordion';
import { PageMeta, FAQSchema, ServiceSchema, BreadcrumbSchema } from '../lib/useMeta';
import { useCategoryTarifs } from '../lib/useTarifs';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PLANITY_URL = 'https://www.planity.com/soleana-bien-etre-31810-venerque';

const DIAG_ENTRY = { zone: 'Diagnostic gratuit', prix: 'Offert' };

const conseilsAvant: string[] = [
  'Raser la zone à traiter 24 à 48 h avant la séance (ne pas épiler à la cire ni à la pince)',
  "Ne pas s\'exposer au soleil ou aux UV 2 semaines avant la séance",
  'Éviter les crèmes autobronzantes et les produits photosensibilisants',
  'Prévenir votre praticienne de tout traitement médical en cours',
  'Arriver avec une peau propre, sans déodorant ni parfum sur la zone',
  "Informer votre praticienne en cas de grossesse, d\'allaitement ou de maladie de peau",
];

const conseilsApres: string[] = [
  'Appliquer une crème apaisante ou un gel aloe vera sur la zone traitée',
  'Éviter tout contact avec la chaleur (bain chaud, sauna, hammam) pendant 48 h',
  "Ne pas s\'exposer au soleil sans écran total (SPF 50+) pendant 2 semaines",
  "Attendre quelques jours avant de raser afin d\'éviter toute irritation.",
  'Les poils commenceront à chuter naturellement environ 10 jours après la séance.',
  'Éviter les frottements et vêtements serrés sur la zone traitée',
  'Hydrater quotidiennement la peau entre les séances',
];

const faqItems = [
  {
    question: "L\'épilation laser est-elle douloureuse ?",
    answer:
      "La technologie laser utilisée à Soléana Bien-Être est conçue pour maximiser le confort. La sensation ressentie s\'apparente à un léger picotement ou à un élastique qui claquerait sur la peau. L\'intensité dépend de la zone traitée et de la sensibilité de chacune. Des systèmes de refroidissement intégrés permettent d\'atténuer la chaleur en temps réel.",
  },
  {
    question: 'Combien de séances sont nécessaires pour un résultat durable ?',
    answer:
      "En moyenne, il faut entre 6 et 10 séances pour obtenir un résultat durable. Ce nombre varie selon la zone traitée, votre type de peau, la couleur et la densité du poil, ainsi que votre profil hormonal. Des séances d\'entretien annuelles ou bisannuelles peuvent être nécessaires, notamment en cas de fluctuations hormonales.",
  },
  {
    question: 'À quelle fréquence dois-je revenir entre les séances ?',
    answer:
      "Les séances sont espacées de 6 à 8 semaines afin de respecter les cycles de croissance du poil. Cet intervalle est crucial : traiter le poil pendant sa phase active de croissance (anagène) garantit l\'efficacité de la séance. Votre praticienne établira un calendrier personnalisé lors du diagnostic gratuit.",
  },
  {
    question: "L\'épilation laser convient-elle à tous les types de peau ?",
    answer:
      "L\'épilation laser est efficace sur la majorité des phototypes. Les résultats sont optimaux sur les peaux claires avec des poils foncés. Sur les peaux mates à foncées, des protocoles adaptés sont mis en place pour garantir sécurité et efficacité. En revanche, le laser n\'est pas indiqué sur les poils blancs, blonds très clairs ou roux, car ces pigmentations n\'absorbent pas suffisamment la lumière.",
  },
  {
    question: 'Que se passe-t-il lors du diagnostic gratuit ?',
    answer:
      "Le diagnostic gratuit est un rendez-vous d\'environ 20 à 30 minutes pendant lequel votre praticienne analyse votre phototype, la nature de vos poils et vos antécédents médicaux. Elle vous explique le protocole adapté à votre profil, répond à toutes vos questions et établit un devis personnalisé. Aucune séance n\'a lieu lors de ce premier rendez-vous si vous le souhaitez.",
  },
  {
    question: 'Puis-je continuer à me raser entre les séances ?',
    answer:
      'Oui, le rasage est autorisé et même recommandé entre les séances. En revanche, il est impératif de ne pas épiler à la cire, à la pince ou au fil, car ces méthodes retirent le bulbe pileux — cible de la lumière laser — et rendraient la séance inefficace.',
  },
  {
    question: 'Comment fonctionne la cure épilation ?',
    answer:
      "La cure épilation propose 7 séances payantes, et la 8e est offerte après les 7 séances réalisées. En cas d\'arrêt anticipé, les séances effectuées sont recalculées au tarif unitaire et la différence est créditée en avoir utilisable sur des soins, massages ou produits. Au-delà de 6 séances réalisées, l\'avoir est limité à 1 séance maximum. Aucun remboursement en espèces n\'est effectué.",
  },
  {
    question: "Y a-t-il des contre-indications à l\'épilation laser ?",
    answer:
      "Certaines situations nécessitent de reporter ou d\'adapter les séances : grossesse et allaitement, exposition solaire récente (bronzage actif), prise de médicaments photosensibilisants, certaines maladies de peau (psoriasis, eczéma actif), antécédents de keloides ou de cicatrices hypertrophiques. Un bilan complet est effectué lors du diagnostic pour identifier toute contre-indication.",
  },
];

// ---------------------------------------------------------------------------
// Sous-composants
// ---------------------------------------------------------------------------

interface ZoneTableProps {
  titre: string;
  genre: 'Femme' | 'Homme';
  zones: { zone: string; prix: string }[];
  accentClass: string;
  headerClass: string;
}

function ZoneTable({ titre, genre, zones, accentClass, headerClass }: ZoneTableProps) {
  return (
    <div className="card-service overflow-hidden">
      <div className={`${headerClass} px-6 py-4 flex items-center gap-3`}>
        <span className="font-serif text-2xl font-light text-white">{titre}</span>
        <span className="badge bg-white/20 text-white border-white/30 text-xs">
          {genre}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-100">
              <th className="text-left px-6 py-3 font-sans font-semibold text-stone-500 uppercase tracking-wider text-xs">
                Zone
              </th>
              <th className="text-right px-6 py-3 font-sans font-semibold text-stone-500 uppercase tracking-wider text-xs">
                Tarif séance
              </th>
            </tr>
          </thead>
          <tbody>
            {zones.map((row, i) => (
              <tr
                key={i}
                onClick={() => window.open(PLANITY_URL, '_blank', 'noopener,noreferrer')}
                className={`border-b border-sand-50 transition-colors duration-150 cursor-pointer group ${
                  row.zone === 'Diagnostic gratuit'
                    ? 'bg-sage-50 hover:bg-sage-100'
                    : i % 2 === 0
                    ? 'bg-white hover:bg-sand-50'
                    : 'bg-sand-50/40 hover:bg-sand-50'
                }`}
              >
                <td className="px-6 py-3.5 font-sans text-stone-700">
                  {row.zone === 'Diagnostic gratuit' ? (
                    <span className="flex items-center gap-2">
                      <Star size={14} className="text-sage-600 shrink-0" />
                      <span className="font-medium text-sage-700">{row.zone}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      {row.zone}
                      <ExternalLink size={11} className="text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </span>
                  )}
                </td>
                <td
                  className={`px-6 py-3.5 text-right font-sans font-medium ${
                    row.zone === 'Diagnostic gratuit'
                      ? 'text-sage-700'
                      : accentClass
                  }`}
                >
                  {row.prix}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-sand-50 border-t border-sand-100">
        <p className="text-xs text-stone-400 font-sans">
          * Tarifs indicatifs — nous contacter pour un devis personnalisé.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page principale
// ---------------------------------------------------------------------------

export default function EpilationLaser() {
  const { byCategory } = useCategoryTarifs(['laser-femme', 'laser-homme', 'forfaits-laser']);

  const zonesFemme = [DIAG_ENTRY, ...byCategory('laser-femme').map((t) => ({ zone: t.name, prix: t.price }))];
  const zonesHomme = [DIAG_ENTRY, ...byCategory('laser-homme').map((t) => ({ zone: t.name, prix: t.price }))];

  return (
    <main className="bg-cream">
      <PageMeta
        title="Épilation laser à Venerque – Résultats durables | Soléana"
        description="Épilation laser certifiée AESTAM à Venerque (31). Protocole adapté à votre phototype pour une peau lisse durablement. Diagnostic gratuit chez Soléana."
        url="https://www.soleana-bienetre.com/epilation-laser"
      />
      <FAQSchema items={faqItems} pageUrl="https://www.soleana-bienetre.com/epilation-laser" />
      <ServiceSchema
        name="Épilation laser"
        description="Épilation laser certifiée AESTAM à Venerque (31). Protocole adapté à votre phototype pour une peau lisse durablement. Diagnostic gratuit."
        url="https://www.soleana-bienetre.com/epilation-laser"
        serviceType="Épilation laser"
      />
      <BreadcrumbSchema items={[{ name: 'Épilation laser', url: 'https://www.soleana-bienetre.com/epilation-laser' }]} />
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-sand-50 via-nude-50 to-cream overflow-hidden">
        <div className="absolute inset-0 bg-texture opacity-60 pointer-events-none" />

        {/* Decorative circle */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-nude-100/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-sand-200/30 blur-2xl pointer-events-none" />

        <div className="relative container-wide section-padding">

          <div className="mt-8 max-w-3xl">
            <span className="tag">Institut Soléana Bien-Être · Venerque</span>
            <h1 className="mt-2 mb-6 text-stone-800 text-balance">
              Épilation laser<br />
              <span className="text-nude-600">à Venerque</span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mb-8">
              Dites adieu aux poils indésirables avec l'épilation laser proposée à l'institut Soléana Bien-Être,
              situé au cœur de Venerque. Notre technologie de pointe, associée à une approche personnalisée,
              vous garantit confort, sécurité et résultats durables. Toutes les zones du corps et tous les
              phototypes sont accueillis après un diagnostic préalable gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.planity.com/soleana-bien-etre-31810-venerque" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Calendar size={16} />
                Réserver mon diagnostic gratuit
              </a>
              <a href="tel:0762169814" className="btn-phone">
                <Phone size={16} />
                07 62 16 98 14
              </a>
            </div>

            {/* Quick badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: <Star size={12} />, label: 'Diagnostic offert' },
                { icon: <Shield size={12} />, label: 'Protocole sécurisé' },
                { icon: <Users size={12} />, label: 'Femme & Homme' },
                { icon: <Leaf size={12} />, label: 'Résultats durables' },
              ].map((b, i) => (
                <span key={i} className="badge">
                  {b.icon}
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* QU'EST-CE QUE L'ÉPILATION LASER ?                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Texte */}
            <div>
              <span className="tag">La technologie</span>
              <h2 className="section-title mb-6">
                Qu'est-ce que l'épilation laser ?
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                L'épilation laser repose sur le principe de la{' '}
                <strong className="text-stone-700 font-medium">photothermolyse sélective</strong> : une
                lumière monochromatique est absorbée par la mélanine contenue dans le bulbe pileux, générant
                une chaleur ciblée qui détruit définitivement le follicule sans endommager les tissus
                environnants.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Contrairement à l'épilation à la lumière pulsée (IPL), le laser offre une longueur d'onde
                précise et une énergie maîtrisée, ce qui garantit une efficacité supérieure tout en
                préservant le confort et la sécurité de la peau.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Le traitement doit être réalisé sur plusieurs séances espacées de 6 à 8 semaines, car seuls
                les poils en phase active de croissance (phase anagène) peuvent être définitivement détruits.
              </p>
            </div>

            {/* Photo */}
            <div className="relative">
              <img
                src="https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/blog-images/epilation-laser-combien-de-seances-sont-vraiment-necessaires-1776761123130.webp"
                alt="Épilation laser — combien de séances sont nécessaires ?"
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-md"
                loading="lazy"
              />
              {/* Badge flottant */}
              <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                {[
                  { icon: <Clock size={12} />, label: '6 à 10 séances' },
                  { icon: <CheckCircle size={12} />, label: 'Résultats durables' },
                ].map((b, i) => (
                  <span key={i} className="badge bg-white/90 backdrop-blur-sm text-stone-700 border-white/60 shadow-sm">
                    {b.icon}
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* À QUI S'ADRESSE-T-ELLE ?                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-sand-50">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="tag">Eligibilité</span>
            <h2 className="section-title mb-4">À qui s'adresse l'épilation laser ?</h2>
            <p className="text-stone-500">
              L'épilation laser est accessible au plus grand nombre. Un diagnostic préalable gratuit permet
              de confirmer votre éligibilité et d'adapter le protocole à votre profil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Profils favorables */}
            <div className="bg-white rounded-2xl p-6 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center">
                  <CheckCircle size={18} className="text-sage-600" />
                </div>
                <h3 className="font-serif text-xl font-light text-stone-800">Profils favorables</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Peau claire à mate avec des poils foncés',
                  'Hommes et femmes dès 18 ans',
                  'Possible avant 18 ans avec consentement parental (consulter préalablement la praticienne pour plus d\'informations)',
                  'Peaux sensibles souhaitant une alternative douce à la cire',
                  'Personnes avec une pousse rapide et dense',
                  'Zones intimes et corps',
                  'Tous phototypes avec protocole adapté',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600">
                    <CheckCircle size={14} className="text-sage-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contre-indications */}
            <div className="bg-white rounded-2xl p-6 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-nude-100 flex items-center justify-center">
                  <AlertCircle size={18} className="text-nude-600" />
                </div>
                <h3 className="font-serif text-xl font-light text-stone-800">Contre-indications</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Grossesse et allaitement',
                  'Bronzage actif ou exposition solaire 2 semaines avant ou après la séance',
                  'Poils blancs, blonds très clairs ou roux (pigmentation insuffisante)',
                  'Prise de médicaments photosensibilisants',
                  'Maladies de peau actives (eczéma, psoriasis sur zone)',
                  'Antécédents de chéloïdes ou cicatrices hypertrophiques',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600">
                    <AlertCircle size={14} className="text-nude-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DÉROULEMENT DU PREMIER RENDEZ-VOUS                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="tag">Votre parcours</span>
            <h2 className="section-title mb-4">
              Déroulement de votre premier rendez-vous
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Le diagnostic gratuit pose les bases d'un traitement sur-mesure. Voici comment se déroule
              votre venue à l'institut.
            </p>
          </div>

          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-sand-200 hidden sm:block" />

            <div className="space-y-6">
              {[
                {
                  num: '01',
                  titre: 'Accueil & échange',
                  desc: 'Votre praticienne vous reçoit dans un cadre chaleureux et confidentiel. Elle recueille vos antécédents médicaux, votre historique de dépilation et vos objectifs.',
                },
                {
                  num: '02',
                  titre: 'Analyse de votre phototype',
                  desc: 'Évaluation précise de votre type de peau et de la nature de vos poils (couleur, densité, épaisseur) pour sélectionner les paramètres laser adaptés.',
                },
                {
                  num: '03',
                  titre: 'Test de réaction cutanée',
                  desc: 'Un test de sensibilité peut être réalisé sur une petite zone afin de valider la tolérance de votre peau avant tout traitement.',
                },
                {
                  num: '04',
                  titre: 'Devis personnalisé',
                  desc: 'Présentation claire des zones à traiter, du nombre de séances estimé, des tarifs unitaires et des forfaits disponibles. Aucune surprise.',
                },
                {
                  num: '05',
                  titre: 'Questions & conseils pré-séance',
                  desc: 'Vous repartez avec toutes les informations nécessaires pour préparer votre première séance et obtenir des résultats optimaux.',
                },
              ].map((step, i) => (
                <div key={i} className="relative flex gap-6 sm:pl-10">
                  {/* Numéro */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-nude-600 text-white flex items-center justify-center font-sans font-semibold text-sm shrink-0 shadow-md">
                    {step.num}
                  </div>
                  {/* Contenu */}
                  <div className="bg-sand-50 rounded-2xl p-5 flex-1 border border-sand-100 hover:shadow-sm transition-shadow duration-200">
                    <h4 className="font-serif text-lg font-light text-stone-800 mb-1">{step.titre}</h4>
                    <p className="text-sm text-stone-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-sage-50 border border-sage-200 rounded-full px-5 py-2.5 text-sage-700 text-sm font-sans font-medium">
              <Star size={14} className="text-sage-500" />
              Le diagnostic est entièrement gratuit et sans engagement
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TARIFS — ZONES + FORFAITS                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-nude-50">
        <div className="container-wide">

          {/* Titre de section */}
          <div className="text-center mb-10">
            <span className="tag">Tarifs</span>
            <h2 className="section-title mb-2">Zones traitées & Forfaits</h2>
            <p className="text-stone-500 text-sm">Prix par séance unitaire · diagnostic gratuit inclus</p>
          </div>

          {/* Zones Femme + Homme côte à côte */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <ZoneTable
              titre="Zones Femme"
              genre="Femme"
              zones={zonesFemme}
              accentClass="text-nude-600"
              headerClass="bg-gradient-to-r from-nude-600 to-nude-500"
            />
            <ZoneTable
              titre="Zones Homme"
              genre="Homme"
              zones={zonesHomme}
              accentClass="text-sage-700"
              headerClass="bg-gradient-to-r from-sage-700 to-sage-600"
            />
          </div>

          {/* Forfaits combinés */}
          <div className="mb-2">
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-light text-stone-800">Forfaits combinés <span className="text-nude-600">— Femme</span></h3>
              <p className="text-stone-500 text-sm mt-1">Traiter plusieurs zones simultanément à un tarif avantageux</p>
            </div>

            <div className="card-service overflow-hidden">
              {/* En-tête */}
              <div className="bg-gradient-to-r from-nude-600 to-nude-500 px-6 py-4 flex items-center gap-3">
                <span className="font-serif text-2xl font-light text-white">Forfaits combinés</span>
                <span className="badge bg-white/20 text-white border-white/30 text-xs">Femme</span>
              </div>

              {/* Tableau */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sand-100">
                      <th className="text-left px-6 py-3 font-sans font-semibold text-stone-500 uppercase tracking-wider text-xs w-1/3">Forfait</th>
                      <th className="text-left px-6 py-3 font-sans font-semibold text-stone-500 uppercase tracking-wider text-xs">Zones incluses</th>
                      <th className="text-right px-6 py-3 font-sans font-semibold text-stone-500 uppercase tracking-wider text-xs whitespace-nowrap">Tarif séance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {byCategory('forfaits-laser').map((f, i) => (
                      <tr
                        key={f.id}
                        onClick={() => window.open(PLANITY_URL, '_blank', 'noopener,noreferrer')}
                        className={`border-b border-sand-50 transition-colors duration-150 cursor-pointer group ${
                          i % 2 === 0 ? 'bg-white hover:bg-sand-50' : 'bg-sand-50/40 hover:bg-sand-50'
                        }`}
                      >
                        <td className="px-6 py-4 font-sans font-medium text-stone-700 align-top">
                          <span className="flex items-center gap-1.5">
                            {f.name}
                            <ExternalLink size={11} className="text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </span>
                        </td>
                        <td className="px-6 py-4 align-top">
                          {f.note ? (
                            <ul className="space-y-1.5">
                              {f.note.split(/[·•\n]/).map((z) => z.trim()).filter(Boolean).map((z, j) => (
                                <li key={j} className="flex items-start gap-1.5 text-stone-500">
                                  <CheckCircle size={12} className="text-nude-400 shrink-0 mt-0.5" />
                                  {z}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-stone-400 text-xs italic">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right font-sans font-medium text-nude-600 whitespace-nowrap align-top">
                          {f.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-3 bg-sand-50 border-t border-sand-100 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-xs text-stone-400 font-sans">* Tarifs indicatifs — nous contacter pour un devis personnalisé.</p>
                <a href="tel:0762169814" className="btn-secondary text-xs py-2 px-4">
                  <Phone size={13} />
                  Demander un devis
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CURE ÉPILATION                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <span className="tag">Programme fidélité</span>
            <h2 className="section-title mb-2">Cure épilation</h2>
            <p className="text-stone-500">Engagez-vous sur la durée et bénéficiez de la 8e séance offerte.</p>
          </div>

          {/* Boîte principale */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-nude-700 to-nude-600 text-white shadow-xl">
            {/* Décoration */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative p-8 md:p-12">
              {/* Badge vedette */}
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-sans font-medium mb-8">
                <Star size={14} className="text-sand-300" />
                8e séance offerte
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Colonne 1 — Avantages */}
                <div>
                  <h3 className="font-serif text-2xl font-light mb-5 text-white">
                    Les avantages de la cure
                  </h3>
                  <ul className="space-y-4">
                    {[
                      {
                        icon: <Leaf size={16} />,
                        texte: '7 séances payantes, la 8e offerte après les 7 séances réalisées',
                      },
                      {
                        icon: <Clock size={16} />,
                        texte: 'Séances espacées de 6 à 8 semaines pour respecter les cycles pilaires',
                      },
                      {
                        icon: <CheckCircle size={16} />,
                        texte: 'En moyenne 6 à 10 séances pour un résultat durable',
                      },
                      {
                        icon: <Star size={16} />,
                        texte: 'Paiement en 3 ou 4 fois possible — sans frais',
                      },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-nude-100 leading-relaxed">
                        <span className="mt-0.5 shrink-0 text-sand-300">{item.icon}</span>
                        {item.texte}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colonne 2 — Conditions */}
                <div>
                  <h3 className="font-serif text-2xl font-light mb-5 text-white">
                    Conditions d'utilisation
                  </h3>
                  <ul className="space-y-4">
                    {[
                      {
                        icon: <Info size={16} />,
                        texte: "En cas d\'arrêt anticipé : recalcul au tarif unitaire, différence créditée en avoir sur soins, massages ou produits",
                      },
                      {
                        icon: <AlertCircle size={16} />,
                        texte: "Aucun remboursement en espèces n\'est effectué",
                      },
                      {
                        icon: <Info size={16} />,
                        texte: "Au-delà de 6 séances réalisées, l\'avoir est limité à 1 séance maximum",
                      },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-nude-200 leading-relaxed">
                        <span className="mt-0.5 shrink-0 text-nude-300">{item.icon}</span>
                        {item.texte}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-nude-700 font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-sand-50 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                    >
                      <Calendar size={15} />
                      Souscrire à la cure
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PHOTO — CURE / REPOUSSE                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white section-padding pt-0">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <img
                src="https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/blog-images/est-ce-que-les-poils-repoussent-vraiment-apres-une-cure-depilation-laser-complete-1776775995251.webp"
                alt="Épilation laser — résultats durables après une cure complète"
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-md"
                loading="lazy"
              />
            </div>
            <div>
              <span className="tag">Résultats</span>
              <h2 className="section-title mb-4">
                Des résultats durables dans le temps
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Après une cure complète, la grande majorité des poils est définitivement détruite.
                Des séances d'entretien ponctuelles peuvent être nécessaires en cas de fluctuations
                hormonales, mais la peau reste lisse et douce au quotidien.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Contrairement aux idées reçues, les résultats du laser sont stables sur le long terme.
                Chaque séance réduit progressivement la densité et la repousse — jusqu'à une quasi-disparition
                sur les zones traitées.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                {[
                  'Réduction jusqu\'à 90 % des poils après cure complète',
                  'Peau lisse et douce entre les séances dès le début',
                  'Entretien annuel possible selon le profil hormonal',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={15} className="text-nude-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-stone-600">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CONSEILS AVANT / APRÈS                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-sand-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="tag">Préparez-vous</span>
            <h2 className="section-title mb-4">Conseils avant et après séance</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Pour des résultats optimaux et une récupération confortable, respectez ces recommandations
              avant et après chaque séance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Avant */}
            <div className="bg-white rounded-2xl p-6 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center">
                  <Sun size={20} className="text-sand-600" />
                </div>
                <h3 className="font-serif text-xl font-light text-stone-800">Avant la séance</h3>
              </div>
              <ul className="space-y-3">
                {conseilsAvant.map((conseil, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                    <CheckCircle size={14} className="text-sand-500 shrink-0 mt-0.5" />
                    {conseil}
                  </li>
                ))}
              </ul>
            </div>

            {/* Après */}
            <div className="bg-white rounded-2xl p-6 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center">
                  <Snowflake size={20} className="text-sage-600" />
                </div>
                <h3 className="font-serif text-xl font-light text-stone-800">Après la séance</h3>
              </div>
              <ul className="space-y-3">
                {conseilsApres.map((conseil, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                    <CheckCircle size={14} className="text-sage-500 shrink-0 mt-0.5" />
                    {conseil}
                  </li>
                ))}
              </ul>
            </div>
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
            <h2 className="section-title mb-4">Tout savoir sur l'épilation laser</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Vous avez des questions ? Voici les réponses aux interrogations les plus fréquentes de nos
              clientes et clients.
            </p>
          </div>
          <FAQAccordion items={faqItems} />
          <div className="mt-10 text-center">
            <p className="text-stone-500 text-sm mb-4">
              Votre question ne figure pas dans la liste ?
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
        title="Prête à vous libérer des poils indésirables ?"
        subtitle="Commencez par un diagnostic gratuit à Venerque — offre sans engagement pour découvrir le protocole adapté à votre profil."
      />
    </main>
  );
}
