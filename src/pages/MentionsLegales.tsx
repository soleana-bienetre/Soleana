import { Link } from 'react-router-dom';
import {
  Building2,
  Server,
  Shield,
  AlertTriangle,
  Lock,
  FileText,
  ChevronRight,
} from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';

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

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-2 border-b border-sand-50 last:border-0">
      <span className="text-xs font-sans font-semibold text-stone-500 uppercase tracking-wide sm:w-44 shrink-0">
        {label}
      </span>
      <span className="text-sm text-stone-700">{value}</span>
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

// ─── Table of Contents ────────────────────────────────────────────────────────

const tocItems = [
  { href: '#editeur', label: 'Éditeur du site' },
  { href: '#hebergeur', label: 'Hébergeur' },
  { href: '#propriete-intellectuelle', label: 'Propriété intellectuelle' },
  { href: '#responsabilite', label: 'Limitation de responsabilité' },
  { href: '#rgpd', label: 'Données personnelles & RGPD' },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MentionsLegales() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-sand-50 to-cream py-12 md:py-16">
        <div className="container-narrow">
          <Breadcrumb items={[{ label: 'Mentions légales' }]} />
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-nude-50 rounded-2xl flex items-center justify-center">
                <FileText size={22} className="text-nude-600" />
              </div>
              <span className="tag">Informations légales</span>
            </div>
            <h1 className="section-title text-4xl md:text-5xl mt-2">Mentions légales</h1>
            <p className="mt-4 text-sm text-stone-400">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la
              Confiance dans l'Économie Numérique (LCEN), les informations suivantes sont
              portées à la connaissance des utilisateurs et visiteurs du site Soléana Bien-Être.
            </p>
            <p className="text-xs text-stone-400 mt-2">
              Dernière mise à jour : mars 2025
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
              </div>
            </aside>

            {/* ── Sections ── */}
            <div className="lg:col-span-3 space-y-10">

              {/* Éditeur */}
              <Section id="editeur" icon={<Building2 size={18} />} title="Éditeur du site">
                <DataRow label="Dénomination" value="Soléana Bien-Être" />
                <DataRow label="Responsable" value="Laetitia Sevrin" />
                <DataRow
                  label="Raison sociale"
                  value={<Placeholder text="Raison sociale à définir" />}
                />
                <DataRow
                  label="SIRET"
                  value={<Placeholder text="SIRET à définir" />}
                />
                <DataRow
                  label="Adresse"
                  value="1 Rue de la Fraternité, 31810 Venerque, France"
                />
                <DataRow
                  label="Téléphone"
                  value={
                    <a
                      href="tel:0762169814"
                      className="text-nude-600 hover:text-nude-700 transition-colors"
                    >
                      07 62 16 98 14
                    </a>
                  }
                />
                <DataRow
                  label="Email"
                  value={<Placeholder text="Email à définir" />}
                />
                <DataRow
                  label="Directrice de publication"
                  value="Laetitia Sevrin"
                />
              </Section>

              {/* Hébergeur */}
              <Section id="hebergeur" icon={<Server size={18} />} title="Hébergeur du site">
                <p className="text-sm text-stone-500 leading-relaxed">
                  Le présent site est hébergé par :
                </p>
                <div className="bg-sand-50 rounded-xl p-5 border border-sand-100">
                  <Placeholder text="Informations hébergeur à définir" />
                  <p className="text-xs text-stone-400 mt-3 leading-relaxed">
                    Renseigner ici : nom de l'hébergeur, adresse postale, numéro de téléphone et
                    site web de l'hébergeur.
                  </p>
                </div>
              </Section>

              {/* Propriété intellectuelle */}
              <Section
                id="propriete-intellectuelle"
                icon={<Shield size={18} />}
                title="Propriété intellectuelle"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  L'ensemble des éléments constituant ce site (textes, images, graphismes, logo,
                  icônes, sons, logiciels, etc.) est la propriété exclusive de Soléana Bien-Être
                  ou de ses partenaires. Toute reproduction, représentation, modification,
                  publication ou adaptation, totale ou partielle, de ces éléments est strictement
                  interdite sans l'autorisation écrite préalable de Soléana Bien-Être.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Toute exploitation non autorisée du site ou de son contenu sera considérée
                  comme une contrefaçon et poursuivie conformément aux dispositions des articles
                  L.335-2 et suivants du Code de Propriété Intellectuelle.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  La marque "Soléana Bien-Être", ainsi que les logos et signes distinctifs
                  présents sur le site, sont des marques déposées ou protégées. Toute
                  reproduction ou utilisation est soumise à autorisation préalable.
                </p>
              </Section>

              {/* Limitation de responsabilité */}
              <Section
                id="responsabilite"
                icon={<AlertTriangle size={18} />}
                title="Limitation de responsabilité"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Soléana Bien-Être s'efforce de fournir sur ce site des informations aussi
                  précises que possible. Toutefois, il ne pourra être tenu responsable des
                  omissions, des inexactitudes et des carences dans la mise à jour, qu'elles
                  soient de son fait ou du fait des tiers partenaires qui lui fournissent ces
                  informations.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Les informations contenues sur ce site sont données à titre indicatif et sont
                  susceptibles d'évoluer. Par ailleurs, les renseignements figurant sur ce site ne
                  sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été
                  apportées depuis leur mise en ligne.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Soléana Bien-Être ne peut être tenu responsable des dommages directs ou
                  indirects résultant de l'accès au site ou de l'utilisation des informations qui
                  y figurent, ni des dommages qui pourraient résulter de l'indisponibilité ou du
                  dysfonctionnement du site.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Le site peut contenir des liens hypertextes vers d'autres sites. Soléana
                  Bien-Être n'exerce aucun contrôle sur ces sites et décline toute responsabilité
                  quant à leur contenu.
                </p>
              </Section>

              {/* RGPD */}
              <Section
                id="rgpd"
                icon={<Lock size={18} />}
                title="Données personnelles & RGPD"
              >
                <p className="text-sm text-stone-600 leading-relaxed">
                  Conformément au Règlement Général sur la Protection des Données (RGPD –
                  Règlement UE 2016/679) et à la loi Informatique et Libertés modifiée,
                  Soléana Bien-Être, en tant que responsable de traitement, s'engage à protéger
                  les données personnelles collectées via ce site.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Les données collectées (via le formulaire de contact notamment) sont utilisées
                  uniquement dans le cadre de la gestion des demandes et des rendez-vous. Elles
                  ne sont ni vendues, ni transmises à des tiers à des fins commerciales.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Vous disposez d'un droit d'accès, de rectification, d'effacement, de
                  portabilité et d'opposition à vos données personnelles. Pour exercer ces droits,
                  vous pouvez nous contacter à l'adresse suivante :{' '}
                  <Placeholder text="Email à définir" />
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Pour plus d'informations sur la gestion de vos données, consultez notre{' '}
                  <Link
                    to="/politique-confidentialite"
                    className="text-nude-600 hover:text-nude-700 underline underline-offset-2 transition-colors"
                  >
                    Politique de Confidentialité
                  </Link>.
                </p>
                <div className="mt-2 p-4 bg-sand-50 rounded-xl border border-sand-100">
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Pour toute réclamation concernant le traitement de vos données, vous pouvez
                    également saisir la CNIL (Commission Nationale de l'Informatique et des
                    Libertés) via son site{' '}
                    <a
                      href="https://www.cnil.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nude-500 hover:text-nude-600 underline underline-offset-2"
                    >
                      www.cnil.fr
                    </a>.
                  </p>
                </div>
              </Section>

              {/* Last update */}
              <div className="pt-4 border-t border-sand-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-stone-400">
                  Document mis à jour le{' '}
                  <time dateTime="2025-03">mars 2025</time>
                </p>
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
