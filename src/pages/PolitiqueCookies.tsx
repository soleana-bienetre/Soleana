import { Link } from 'react-router-dom';
import {
  Cookie,
  ShieldCheck,
  Settings,
  BarChart2,
  ExternalLink,
  ChevronRight,
  FileText,
  Lock,
} from 'lucide-react';
import { PageMeta } from '../lib/useMeta';

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
        <div className="w-9 h-9 bg-nude-50 rounded-xl flex items-center justify-center text-nude-600 shrink-0">
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

function CookieTypeCard({
  icon,
  title,
  required,
  description,
  examples,
}: {
  icon: React.ReactNode;
  title: string;
  required: boolean;
  description: string;
  examples: string[];
}) {
  return (
    <div className="rounded-xl border border-sand-100 p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-nude-50 rounded-lg flex items-center justify-center text-nude-600 shrink-0">
            {icon}
          </div>
          <h3 className="font-serif text-lg font-light text-stone-800">{title}</h3>
        </div>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
            required
              ? 'bg-sage-100 text-sage-700 border border-sage-200'
              : 'bg-sand-100 text-stone-500 border border-sand-200'
          }`}
        >
          {required ? 'Nécessaire' : 'Optionnel'}
        </span>
      </div>
      <p className="text-sm text-stone-600 leading-relaxed">{description}</p>
      <ul className="space-y-1">
        {examples.map((ex, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-stone-500">
            <div className="w-1 h-1 rounded-full bg-nude-400 shrink-0" />
            {ex}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Table of contents ────────────────────────────────────────────────────────

const tocItems = [
  { href: '#definition', label: 'Qu\'est-ce qu\'un cookie ?' },
  { href: '#types', label: 'Types de cookies utilisés' },
  { href: '#duree', label: 'Durée de conservation' },
  { href: '#gestion', label: 'Gérer vos préférences' },
  { href: '#tiers', label: 'Services tiers' },
  { href: '#droits', label: 'Vos droits' },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PolitiqueCookies() {
  return (
    <>
      <PageMeta
        title="Politique de cookies – Soléana Bien-Être"
        description="Découvrez comment Soléana Bien-Être utilise les cookies sur son site et comment gérer vos préférences."
        url="https://www.soleana-bienetre.com/politique-cookies"
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-sand-50 to-cream py-12 md:py-16">
        <div className="container-narrow">
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-nude-50 rounded-2xl flex items-center justify-center">
                <Cookie size={22} className="text-nude-600" />
              </div>
              <span className="tag">Transparence & confidentialité</span>
            </div>
            <h1 className="section-title text-4xl md:text-5xl mt-2">Politique de cookies</h1>
            <p className="mt-4 text-sm text-stone-400 max-w-2xl leading-relaxed">
              Ce site utilise un nombre limité de cookies, strictement nécessaires à son bon
              fonctionnement. Aucun cookie publicitaire ni de traçage commercial n'est déposé
              sans votre consentement explicite.
            </p>
            <p className="text-xs text-stone-400 mt-2">
              Dernière mise à jour : avril 2025
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* ── Table of contents (sticky sidebar) ── */}
            <aside className="lg:col-span-1 order-last lg:order-first">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-sand-100 p-5">
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
                </div>

                {/* Liens connexes */}
                <div className="bg-white rounded-2xl border border-sand-100 p-5">
                  <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4">
                    Documents liés
                  </h2>
                  <div className="space-y-2">
                    <Link
                      to="/politique-de-confidentialite"
                      className="flex items-center gap-2 text-sm text-stone-600 hover:text-nude-700 py-1 transition-colors group"
                    >
                      <Lock size={12} className="text-stone-400 group-hover:text-nude-400" />
                      Politique de confidentialité
                    </Link>
                    <Link
                      to="/mentions-legales"
                      className="flex items-center gap-2 text-sm text-stone-600 hover:text-nude-700 py-1 transition-colors group"
                    >
                      <FileText size={12} className="text-stone-400 group-hover:text-nude-400" />
                      Mentions légales
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Sections ── */}
            <div className="lg:col-span-3 space-y-10">

              {/* Définition */}
              <Section id="definition" icon={<Cookie size={18} />} title="Qu'est-ce qu'un cookie ?">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur,
                  smartphone, tablette) lors de votre visite sur un site web. Il permet au site
                  de mémoriser certaines informations sur votre navigation.
                </p>
                <InfoBlock color="nude">
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Conformément à la réglementation française et européenne (RGPD, directive
                    ePrivacy), certains cookies nécessitent votre consentement préalable avant
                    d'être déposés. D'autres, strictement nécessaires au fonctionnement du site,
                    peuvent être placés sans consentement.
                  </p>
                </InfoBlock>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Soléana Bien-Être s'engage à n'utiliser que les cookies indispensables au bon
                  fonctionnement du site et à votre expérience de navigation, sans aucun
                  traçage à des fins publicitaires.
                </p>
              </Section>

              {/* Types de cookies */}
              <Section id="types" icon={<ShieldCheck size={18} />} title="Types de cookies utilisés">
                <p className="text-sm text-stone-600 leading-relaxed mb-2">
                  Ce site utilise exclusivement des cookies techniques nécessaires à son
                  fonctionnement. Aucun cookie de profilage ou de publicité n'est utilisé.
                </p>
                <div className="space-y-4">
                  <CookieTypeCard
                    icon={<ShieldCheck size={15} />}
                    title="Cookies essentiels"
                    required={true}
                    description="Indispensables au fonctionnement du site. Ils permettent les fonctionnalités de base comme la navigation et l'accès aux espaces sécurisés. Ces cookies ne peuvent pas être désactivés."
                    examples={[
                      'Session d\'authentification administrateur (Supabase)',
                      'Mémorisation de vos préférences de cookies (localStorage)',
                      'Sécurisation des formulaires de contact',
                    ]}
                  />
                  <CookieTypeCard
                    icon={<BarChart2 size={15} />}
                    title="Cookies analytiques"
                    required={false}
                    description="Ce site n'utilise actuellement aucun outil d'analyse statistique (Google Analytics, Matomo, etc.). Aucune donnée de navigation n'est collectée à des fins d'analyse."
                    examples={[
                      'Aucun cookie analytique déposé',
                    ]}
                  />
                  <CookieTypeCard
                    icon={<ExternalLink size={15} />}
                    title="Cookies tiers"
                    required={false}
                    description="Certains services tiers intégrés au site peuvent déposer leurs propres cookies. Ceux-ci ne sont activés que lorsque vous interagissez directement avec ces services."
                    examples={[
                      'Planity (réservation en ligne) — uniquement à l\'ouverture du module',
                      'Google Fonts — chargement des polices de caractères',
                    ]}
                  />
                </div>
              </Section>

              {/* Durée de conservation */}
              <Section id="duree" icon={<Settings size={18} />} title="Durée de conservation">
                <div className="space-y-3">
                  {[
                    { nom: 'cookie_consent', duree: '12 mois', objet: 'Mémorisation de votre choix concernant les cookies' },
                    { nom: 'sb-auth-token', duree: 'Session', objet: 'Authentification espace administrateur (Supabase)' },
                    { nom: 'Google Fonts (cache)', duree: '1 an (cache navigateur)', objet: 'Performance de chargement des polices' },
                  ].map((c) => (
                    <div key={c.nom} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 py-3 border-b border-sand-50 last:border-0">
                      <div className="sm:w-48 shrink-0">
                        <code className="text-xs bg-sand-100 text-stone-600 px-2 py-0.5 rounded font-mono">
                          {c.nom}
                        </code>
                      </div>
                      <div className="sm:w-36 shrink-0 text-xs font-medium text-nude-700">{c.duree}</div>
                      <div className="text-sm text-stone-500">{c.objet}</div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Gérer vos préférences */}
              <Section id="gestion" icon={<Settings size={18} />} title="Gérer vos préférences">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Vous pouvez à tout moment modifier vos préférences en matière de cookies
                  via votre navigateur. Voici comment procéder sur les principaux navigateurs :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      nav: 'Google Chrome',
                      url: 'https://support.google.com/chrome/answer/95647',
                    },
                    {
                      nav: 'Mozilla Firefox',
                      url: 'https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent',
                    },
                    {
                      nav: 'Apple Safari',
                      url: 'https://support.apple.com/fr-fr/guide/safari/sfri11471/mac',
                    },
                    {
                      nav: 'Microsoft Edge',
                      url: 'https://support.microsoft.com/fr-fr/windows/supprimer-et-g%C3%A9rer-les-cookies',
                    },
                  ].map((b) => (
                    <a
                      key={b.nav}
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 rounded-xl border border-sand-100 px-4 py-3 hover:border-nude-300 hover:bg-nude-50 transition-all duration-200 group"
                    >
                      <span className="text-sm text-stone-700 group-hover:text-nude-700 font-medium">
                        {b.nav}
                      </span>
                      <ExternalLink size={13} className="text-stone-400 group-hover:text-nude-500 shrink-0" />
                    </a>
                  ))}
                </div>
                <InfoBlock color="sand">
                  <p className="text-sm text-stone-600 leading-relaxed">
                    <strong className="text-stone-700">Attention :</strong> la désactivation de
                    certains cookies peut affecter le bon fonctionnement du site, notamment l'accès
                    à l'espace administrateur.
                  </p>
                </InfoBlock>
              </Section>

              {/* Services tiers */}
              <Section id="tiers" icon={<ExternalLink size={18} />} title="Services tiers">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Ce site intègre des liens vers des services tiers dont nous ne maîtrisons pas
                  la politique de cookies :
                </p>
                <div className="space-y-4">
                  {[
                    {
                      nom: 'Planity',
                      role: 'Système de réservation en ligne',
                      url: 'https://www.planity.com/mentions-legales',
                      info: 'Utilisé uniquement lors d\'un clic sur le bouton de réservation. Planity ouvre une nouvelle fenêtre et gère ses propres cookies indépendamment de ce site.',
                    },
                    {
                      nom: 'Supabase',
                      role: 'Base de données & hébergement des images',
                      url: 'https://supabase.com/privacy',
                      info: 'Utilisé pour l\'hébergement des contenus du site (images, articles de blog, avis clients). Aucun cookie tiers déposé lors de la navigation publique.',
                    },
                    {
                      nom: 'Google Fonts',
                      role: 'Chargement des polices de caractères',
                      url: 'https://policies.google.com/privacy',
                      info: 'Les polices Cormorant Garamond et Inter sont chargées depuis les serveurs Google. Cela peut impliquer l\'envoi de votre adresse IP à Google.',
                    },
                  ].map((s) => (
                    <div key={s.nom} className="rounded-xl border border-sand-100 p-4 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-base font-light text-stone-800">{s.nom}</h3>
                        <span className="text-xs text-stone-400 bg-sand-50 border border-sand-100 px-2 py-0.5 rounded-full">
                          {s.role}
                        </span>
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed">{s.info}</p>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-nude-600 hover:text-nude-700 transition-colors"
                      >
                        Politique de confidentialité de {s.nom}
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Vos droits */}
              <Section id="droits" icon={<ShieldCheck size={18} />} title="Vos droits">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à
                  la loi Informatique et Libertés, vous disposez des droits suivants :
                </p>
                <ul className="space-y-2">
                  {[
                    'Droit d\'accès à vos données personnelles',
                    'Droit de rectification en cas d\'inexactitude',
                    'Droit à l\'effacement ("droit à l\'oubli")',
                    'Droit d\'opposition au traitement de vos données',
                    'Droit à la portabilité de vos données',
                    'Droit de retirer votre consentement à tout moment',
                  ].map((droit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-nude-400 mt-2 shrink-0" />
                      {droit}
                    </li>
                  ))}
                </ul>
                <InfoBlock color="sage">
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Pour exercer vos droits ou pour toute question relative à notre politique
                    de cookies, vous pouvez nous contacter par email à{' '}
                    <a
                      href="mailto:soleana.bienetre@gmail.com"
                      className="text-nude-700 hover:underline font-medium"
                    >
                      soleana.bienetre@gmail.com
                    </a>{' '}
                    ou consulter notre{' '}
                    <Link
                      to="/politique-de-confidentialite"
                      className="text-nude-700 hover:underline font-medium"
                    >
                      politique de confidentialité
                    </Link>
                    .
                  </p>
                </InfoBlock>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Vous avez également le droit d'introduire une réclamation auprès de la{' '}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nude-600 hover:text-nude-700 inline-flex items-center gap-0.5"
                  >
                    CNIL <ExternalLink size={11} />
                  </a>{' '}
                  (Commission Nationale de l'Informatique et des Libertés).
                </p>
              </Section>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
