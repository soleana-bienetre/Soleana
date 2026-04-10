import { Link } from 'react-router-dom';
import {
  Lock,
  Database,
  UserCheck,
  Eye,
  Trash2,
  Cookie,
  Mail,
  ChevronRight,
  FileText,
  Shield,
  AlertTriangle,
  ClipboardList,
} from 'lucide-react';

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-sage-50 rounded-xl flex items-center justify-center text-sage-600 shrink-0">
          {icon}
        </div>
        <h2 className="font-serif text-2xl font-light text-stone-800">{title}</h2>
      </div>
      <div className="bg-white rounded-2xl border border-sand-100 p-6 md:p-8 space-y-4">
        {children}
      </div>
    </section>
  );
}

function InfoBlock({
  color = 'sand',
  children,
}: {
  color?: 'sand' | 'sage' | 'nude';
  children: React.ReactNode;
}) {
  const colorMap: Record<string, string> = {
    sand: 'bg-sand-50 border-sand-100',
    sage: 'bg-sage-50 border-sage-100',
    nude: 'bg-nude-50 border-nude-100',
  };
  return (
    <div className={`rounded-xl border p-4 ${colorMap[color]}`}>
      {children}
    </div>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-sand-100 text-sand-700 text-xs font-medium rounded-md border border-sand-200">
      <AlertTriangle size={11} />
      {text}
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
          <div className="w-1.5 h-1.5 rounded-full bg-nude-400 mt-2 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function RightCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 bg-sand-50 rounded-xl border border-sand-100">
      <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-nude-500 border border-sand-100 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-stone-700 mb-0.5">{title}</p>
        <p className="text-xs text-stone-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── Table of Contents ────────────────────────────────────────────────────────

const tocItems = [
  { href: '#responsable', label: 'Responsable du traitement' },
  { href: '#donnees-collectees', label: 'Données collectées' },
  { href: '#finalites', label: 'Finalités et bases légales' },
  { href: '#conservation', label: 'Durée de conservation' },
  { href: '#droits', label: 'Vos droits RGPD' },
  { href: '#contact-rgpd', label: 'Exercer vos droits' },
  { href: '#cookies', label: 'Politique des cookies' },
  { href: '#tiers', label: 'Transfert à des tiers' },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PolitiqueConfidentialite() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-sand-50 to-cream py-12 md:py-16">
        <div className="container-narrow">
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-sage-50 rounded-2xl flex items-center justify-center">
                <Lock size={22} className="text-sage-600" />
              </div>
              <span className="tag">Protection de vos données</span>
            </div>
            <h1 className="section-title text-4xl md:text-5xl mt-2">
              Politique de confidentialité
            </h1>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed">
              Soléana Bien-Être s'engage à protéger et à respecter votre vie privée. Cette
              politique explique comment nous collectons, utilisons et protégeons vos données
              personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <span className="badge">RGPD conforme</span>
              <span className="badge">Données sécurisées</span>
              <p className="text-xs text-stone-400 self-center">
                Dernière mise à jour : mars 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* ── Sidebar TOC ── */}
            <aside className="lg:col-span-1 order-last lg:order-first">
              <div className="sticky top-24 bg-white rounded-2xl border border-sand-100 p-5">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4">
                  Sommaire
                </h2>
                <nav className="space-y-1">
                  {tocItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-stone-600 hover:text-nude-700 py-1.5 transition-colors duration-200 group"
                    >
                      <ChevronRight
                        size={12}
                        className="text-stone-300 group-hover:text-nude-400 transition-colors"
                      />
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Quick contact */}
                <div className="mt-6 pt-5 border-t border-sand-100">
                  <p className="text-xs text-stone-400 mb-3">
                    Questions sur vos données ?
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs text-nude-600 hover:text-nude-700 font-medium transition-colors"
                  >
                    Contactez-nous <ChevronRight size={11} />
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── Sections ── */}
            <div className="lg:col-span-3 space-y-10">

              {/* Responsable du traitement */}
              <Section
                id="responsable"
                icon={<Shield size={18} />}
                title="Responsable du traitement"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Le responsable du traitement des données personnelles collectées via ce site est :
                </p>
                <InfoBlock color="sand">
                  <div className="space-y-1.5 text-sm text-stone-700">
                    <p><span className="font-medium">Soléana Bien-Être</span> – Laetitia Sevrin</p>
                    <p><a href="https://maps.app.goo.gl/RYgHzauJiXPw43ja7" target="_blank" rel="noopener noreferrer" className="text-nude-600 hover:text-nude-700 transition-colors">1 Rue de la Fraternité, 31810 Venerque</a></p>
                    <p>
                      Tél. :{' '}
                      <a href="tel:0762169814" className="text-nude-600 hover:text-nude-700">
                        07 62 16 98 14
                      </a>
                    </p>
                    <p>
                      Email : <Placeholder text="Email à définir" />
                    </p>
                  </div>
                </InfoBlock>
                <InfoBlock color="nude">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    <Placeholder text="RGPD – texte à compléter" /> : préciser ici si un Délégué
                    à la Protection des Données (DPO) a été désigné, et ses coordonnées le cas
                    échéant.
                  </p>
                </InfoBlock>
              </Section>

              {/* Données collectées */}
              <Section
                id="donnees-collectees"
                icon={<Database size={18} />}
                title="Données collectées"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Soléana Bien-Être collecte les données personnelles suivantes, uniquement
                  lorsque vous les communiquez volontairement :
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-stone-700 mb-2">
                      Via le formulaire de contact :
                    </p>
                    <BulletList
                      items={[
                        'Nom et prénom',
                        'Adresse email',
                        'Numéro de téléphone (facultatif)',
                        'Sujet de la demande',
                        'Contenu du message',
                      ]}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-700 mb-2">
                      Via la prise de rendez-vous (Planity) :
                    </p>
                    <BulletList
                      items={[
                        'Nom et prénom',
                        'Adresse email',
                        'Numéro de téléphone',
                        'Type de prestation réservée',
                        'Horaire du rendez-vous',
                      ]}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-700 mb-2">
                      Données collectées automatiquement :
                    </p>
                    <BulletList
                      items={[
                        'Adresse IP (anonymisée)',
                        'Données de navigation (pages consultées, durée de visite)',
                        "Type de navigateur et système d\'exploitation",
                      ]}
                    />
                  </div>
                </div>
                <InfoBlock color="nude">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    <Placeholder text="RGPD – texte à compléter" /> : préciser si des données
                    de santé sont collectées dans le cadre des bilans pré-séance (notamment pour
                    l'épilation laser, les contre-indications médicales, etc.), et la base légale
                    correspondante.
                  </p>
                </InfoBlock>
              </Section>

              {/* Finalités */}
              <Section
                id="finalites"
                icon={<ClipboardList size={18} />}
                title="Finalités et bases légales du traitement"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Vos données sont collectées et traitées pour les finalités suivantes :
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="bg-sand-50">
                        <th className="px-4 py-3 text-xs font-semibold text-stone-600 rounded-tl-lg">
                          Finalité
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-stone-600 rounded-tr-lg">
                          Base légale (RGPD)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sand-50">
                      {[
                        ['Répondre à vos demandes de contact', 'Intérêt légitime'],
                        ['Gestion des rendez-vous', "Exécution d\'un contrat"],
                        ['Envoi de rappels de rendez-vous', "Exécution d\'un contrat"],
                        ['Amélioration du site et de nos services', 'Intérêt légitime'],
                        ['Respect des obligations légales', 'Obligation légale'],
                        [
                          'Envoi de communications commerciales (si consentement)',
                          'Consentement',
                        ],
                      ].map(([purpose, basis], i) => (
                        <tr key={i} className="hover:bg-sand-50/50 transition-colors">
                          <td className="px-4 py-3 text-stone-600">{purpose}</td>
                          <td className="px-4 py-3">
                            <span className="badge">{basis}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              {/* Conservation */}
              <Section
                id="conservation"
                icon={<FileText size={18} />}
                title="Durée de conservation"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Vos données personnelles sont conservées pour la durée strictement nécessaire
                  aux finalités pour lesquelles elles ont été collectées, et dans le respect des
                  obligations légales en vigueur.
                </p>
                <BulletList
                  items={[
                    'Données de contact (formulaire) : 3 ans à compter du dernier contact',
                    'Données liées aux rendez-vous : 3 ans à compter du dernier rendez-vous',
                    'Données comptables et de facturation : 10 ans (obligation légale)',
                    'Données de navigation (cookies) : 13 mois maximum',
                    "Consentements marketing : jusqu\'au retrait du consentement",
                  ]}
                />
                <InfoBlock color="nude">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    <Placeholder text="RGPD – texte à compléter" /> : préciser les durées de
                    conservation spécifiques selon la nature des données collectées et adapter
                    selon votre activité.
                  </p>
                </InfoBlock>
              </Section>

              {/* Droits RGPD */}
              <Section
                id="droits"
                icon={<UserCheck size={18} />}
                title="Vos droits RGPD"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants
                  concernant vos données personnelles :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <RightCard
                    icon={<Eye size={16} />}
                    title="Droit d'accès"
                    description="Vous pouvez obtenir la confirmation que vos données sont traitées et en demander une copie."
                  />
                  <RightCard
                    icon={<FileText size={16} />}
                    title="Droit de rectification"
                    description="Vous pouvez demander la correction de données inexactes ou incomplètes vous concernant."
                  />
                  <RightCard
                    icon={<Trash2 size={16} />}
                    title="Droit à l'effacement"
                    description="Vous pouvez demander la suppression de vos données dans les cas prévus par le RGPD."
                  />
                  <RightCard
                    icon={<Shield size={16} />}
                    title="Droit à la limitation"
                    description="Vous pouvez demander la suspension temporaire du traitement de vos données."
                  />
                  <RightCard
                    icon={<Database size={16} />}
                    title="Droit à la portabilité"
                    description="Vous pouvez recevoir vos données dans un format structuré et lisible par machine."
                  />
                  <RightCard
                    icon={<UserCheck size={16} />}
                    title="Droit d'opposition"
                    description="Vous pouvez vous opposer au traitement de vos données pour des raisons tenant à votre situation particulière."
                  />
                </div>
                <InfoBlock color="sage">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    <span className="font-semibold">Retrait du consentement :</span> lorsque le
                    traitement est fondé sur votre consentement, vous pouvez le retirer à tout
                    moment, sans que cela remette en cause la légalité du traitement effectué avant
                    ce retrait.
                  </p>
                </InfoBlock>
              </Section>

              {/* Exercer vos droits */}
              <Section
                id="contact-rgpd"
                icon={<Mail size={18} />}
                title="Exercer vos droits"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Pour exercer vos droits ou pour toute question relative à la protection de vos
                  données personnelles, vous pouvez nous contacter :
                </p>
                <InfoBlock color="sand">
                  <div className="space-y-2 text-sm text-stone-600">
                    <p>
                      <span className="font-medium">Par email :</span>{' '}
                      <Placeholder text="Email à définir" />
                    </p>
                    <p>
                      <span className="font-medium">Par courrier :</span> Soléana Bien-Être –
                      Laetitia Sevrin, <a href="https://maps.app.goo.gl/RYgHzauJiXPw43ja7" target="_blank" rel="noopener noreferrer" className="text-nude-600 hover:text-nude-700 transition-colors">1 Rue de la Fraternité, 31810 Venerque</a>
                    </p>
                    <p>
                      <span className="font-medium">Par téléphone :</span>{' '}
                      <a href="tel:0762169814" className="text-nude-600 hover:text-nude-700">
                        07 62 16 98 14
                      </a>
                    </p>
                  </div>
                </InfoBlock>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Nous nous engageons à répondre à votre demande dans un délai d'un mois.
                  Si vous estimez que vos droits ne sont pas respectés, vous avez la possibilité
                  d'introduire une réclamation auprès de la CNIL :{' '}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nude-600 hover:text-nude-700 underline underline-offset-2"
                  >
                    www.cnil.fr
                  </a>
                </p>
              </Section>

              {/* Cookies */}
              <Section
                id="cookies"
                icon={<Cookie size={18} />}
                title="Politique des cookies"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Notre site utilise des cookies et traceurs pour améliorer votre expérience de
                  navigation et analyser l'utilisation du site. Voici les types de cookies
                  utilisés :
                </p>
                <div className="space-y-3">
                  {[
                    {
                      name: 'Cookies essentiels',
                      description:
                        'Nécessaires au fonctionnement du site (session, préférences de navigation). Ils ne peuvent pas être désactivés.',
                      required: true,
                    },
                    {
                      name: 'Cookies analytiques',
                      description:
                        "Permettent d\'analyser le trafic et le comportement des visiteurs (ex : Google Analytics). Activés uniquement avec votre consentement.",
                      required: false,
                    },
                    {
                      name: 'Cookies de réservation',
                      description:
                        'Liés à notre plateforme de réservation Planity, nécessaires au bon fonctionnement du service de prise de rendez-vous.',
                      required: true,
                    },
                  ].map((cookie) => (
                    <div
                      key={cookie.name}
                      className="flex items-start gap-4 p-4 bg-sand-50 rounded-xl border border-sand-100"
                    >
                      <div className="mt-0.5">
                        <Cookie size={16} className="text-sand-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-stone-700">{cookie.name}</p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              cookie.required
                                ? 'bg-sage-100 text-sage-700'
                                : 'bg-sand-100 text-sand-700'
                            }`}
                          >
                            {cookie.required ? 'Requis' : 'Optionnel'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed">
                          {cookie.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <InfoBlock color="nude">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    <Placeholder text="RGPD – texte à compléter" /> : si une bannière de gestion
                    des cookies (CMP) est mise en place, détailler ici les catégories de cookies,
                    les tiers impliqués et les durées de conservation. Indiquer également comment
                    l'utilisateur peut gérer ses préférences.
                  </p>
                </InfoBlock>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant,
                  certaines fonctionnalités du site pourraient ne plus être disponibles.
                </p>
              </Section>

              {/* Transfert à des tiers */}
              <Section
                id="tiers"
                icon={<Shield size={18} />}
                title="Transfert à des tiers"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Soléana Bien-Être ne vend pas vos données personnelles à des tiers. Vos données
                  peuvent être partagées uniquement dans les cas suivants :
                </p>
                <BulletList
                  items={[
                    'Avec notre prestataire de réservation en ligne Planity, dans le cadre strict de la gestion des rendez-vous',
                    "Avec les prestataires d\'hébergement et techniques nécessaires au fonctionnement du site",
                    "Avec les autorités compétentes si la loi l\'exige",
                  ]}
                />
                <p className="text-sm text-stone-600 leading-relaxed">
                  Nos prestataires sont tenus de respecter la confidentialité et la sécurité de
                  vos données, et ne peuvent les utiliser qu'aux fins pour lesquelles elles leur
                  ont été communiquées. Vos données sont traitées au sein de l'Union Européenne
                  ou dans des pays offrant un niveau de protection adéquat.
                </p>
                <InfoBlock color="nude">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    <Placeholder text="RGPD – texte à compléter" /> : lister ici tous les
                    sous-traitants et tiers avec lesquels des données sont partagées, leur rôle,
                    et les garanties contractuelles en place (DPA, clauses contractuelles types,
                    etc.).
                  </p>
                </InfoBlock>
              </Section>

              {/* Last update */}
              <div className="pt-4 border-t border-sand-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-stone-400">
                    Document mis à jour le{' '}
                    <time dateTime="2025-03">mars 2025</time>
                  </p>
                  <p className="text-xs text-stone-400">
                    Voir aussi :{' '}
                    <Link
                      to="/mentions-legales"
                      className="text-nude-500 hover:text-nude-600 underline underline-offset-2"
                    >
                      Mentions légales
                    </Link>
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs text-nude-600 hover:text-nude-700 font-medium transition-colors"
                >
                  Une question ? Contactez-nous <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
