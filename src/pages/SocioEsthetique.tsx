import { Heart, Shield, Sparkles, Users, HandHeart, Calendar, FileText, Clock3 } from 'lucide-react';
import { PageMeta } from '../lib/useMeta';

const socioImages = [
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Socio%20esthetique/atelier-socio-%20esthetique-1.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Socio%20esthetique/atelier-socio-%20esthetique-2.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Socio%20esthetique/atelier-socio-esthetique-3.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Socio%20esthetique/atelier-socio-esthetique-4.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Socio%20esthetique/atelier-socio-esthetique-5.webp',
];

const benefits = [
  'Préserver la dignité et le bien-être',
  "Restaurer l'estime et l'image de soi",
  "Apaiser l'anxiété et les tensions",
  'Offrir un temps individualisé et adapté',
  'Maintenir et soutenir le lien social',
];

const individualCare = [
  'Épilations visage',
  'Soin visage adapté et personnalisé',
  'Soin complet des mains',
  'Pose de vernis',
  'Modelage mains ou pieds',
  'Mise en beauté légère',
  'Massage relaxant assis',
  'Relaxation sensorielle (approche des 5 sens)',
];

const workshops = [
  'Création cosmétique & auto-soin',
  'Atelier auto-massage des mains',
  'Atelier mise en beauté & valorisation',
  'Atelier mémoire olfactive & bien-être',
];

const interventions = [
  "Intervention sur devis selon les besoins de la structure.",
  "Créneaux de 1 à 4 heures consécutives, adaptés aux temps d’après-midi en structure.",
  "Un ajustement tarifaire peut être envisagé pour des interventions prolongées ou dans le cadre d’un partenariat régulier.",
  "Un devis personnalisé est établi selon la fréquence, la durée et le cadre d’intervention.",
  "Un contrat de prestation est formalisé en collaboration avec la structure.",
];

const pricing = [
  ['Épilation Sourcils (15 min)', '10€'],
  ['Épilation Lèvres (15 min)', '8€'],
  ['Épilation Menton (15 min)', '8€'],
  ['Épilation forfait visage complet (15 min)', '22€'],
  ['Modelage relaxant mains (15 min)', '20€'],
  ['Modelage relaxant pieds (20 min)', '25€'],
  ['Massage assis Amma habillé (20 min)', '30€'],
  ['Soin visage personnalisé (45 min)', '55€'],
  ['Soin complet mains (45 min)', '35€'],
  ['Manucure + vernis simple (45 min)', '30€'],
  ['Manucure + vernis semi-permanent (45 min)', '40€'],
  ['Maquillage de jour (20 min)', '25€'],
];

export default function SocioEsthetique() {
  return (
    <main className="min-h-screen bg-cream">
      <PageMeta
        title="Socio-esthétique à Venerque – Soléana Bien-Être"
        description="Accompagnements individuels et ateliers collectifs de socio-esthétique en structure : bien-être, image de soi, lien social et interventions sur mesure."
        url="https://www.soleana-bienetre.com/socio-esthetique"
      />

      <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${socioImages[0]})` }}
        />
        <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-b from-stone-950/80 via-stone-950/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/45 to-transparent" />
        <div className="relative z-10 container-wide pt-24 pb-14 md:pb-20">
          <span className="tag text-nude-200">Accompagnement humain</span>
          <h1 className="font-serif font-light text-white leading-tight mt-4">
            SOCIO-ESTHÉTIQUE en structure
          </h1>
          <p className="text-nude-100 text-lg md:text-xl font-light leading-relaxed max-w-3xl mt-5">
            Un accompagnement bien-être des publics fragilisés, en structures médico-sociales et établissements de santé,
            fondé sur l'éthique, la confidentialité et le respect de la dignité.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 rounded-2xl border border-sand-100 bg-sand-50 p-6 md:p-8 flex items-center">
            <blockquote className="max-w-3xl border-l-2 border-nude-300 pl-5 text-left">
              <p className="font-serif italic text-stone-700 text-lg md:text-xl leading-relaxed">
                « Des soins esthétiques pensés pour apporter confort, estime de soi et douceur, dans le respect du rythme et des besoins de chaque personne. »
              </p>
            </blockquote>
          </div>
          <div className="rounded-2xl border border-nude-100 bg-nude-50 p-6 md:p-7">
            <h2 className="font-serif text-2xl text-stone-800 font-light">Laetitia SEVRIN</h2>
            <div className="mt-3 space-y-1.5 text-sm text-stone-700">
              <p>Ancienne aide-soignante et infirmière</p>
              <p>Socio-esthéticienne certifiée</p>
              <p>07 62 16 98 14</p>
              <p>contact.soleana.bienetre@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white pt-0">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-nude-100 bg-nude-50 p-6 md:p-8">
            <h2 className="font-serif text-3xl text-stone-800 font-light mb-5">Ses objectifs</h2>
            <div className="space-y-3">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Heart size={17} className="text-nude-600 mt-0.5" />
                  <p className="text-stone-700">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-stone-600 mt-6 leading-relaxed">
              Elle peut également s'inscrire dans une dynamique collective, à travers des ateliers favorisant le partage et la valorisation de chacun.
            </p>
          </div>

          <div className="rounded-2xl border border-sage-100 bg-sage-50 p-6 md:p-8">
            <h2 className="font-serif text-3xl text-stone-800 font-light mb-5">Soins et ateliers proposés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-sm font-medium text-sage-700 mb-3">Accompagnements individuels</p>
                <ul className="space-y-2">
                  {individualCare.map((item) => (
                    <li key={item} className="text-sm text-stone-700 flex items-start gap-2"><Sparkles size={14} className="text-sage-600 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-sage-700 mb-3">Ateliers collectifs</p>
                <ul className="space-y-2">
                  {workshops.map((item) => (
                    <li key={item} className="text-sm text-stone-700 flex items-start gap-2"><Users size={14} className="text-sage-600 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-stone-600 mt-5 text-sm">
              Chaque soin est adapté à l'état de santé et aux capacités de la personne.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white pt-0">
        <div className="container-wide">
          <div className="text-center mb-10">
            <span className="tag">Ateliers & accompagnements</span>
            <h2 className="section-title text-3xl md:text-4xl">La socio-esthétique en images</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {socioImages.map((image, index) => (
              <div key={image} className="rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                <img
                  src={image}
                  alt={`Atelier socio-esthétique ${index + 1}`}
                  className="w-full h-44 md:h-52 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand-50 bg-texture">
        <div className="container-wide">
          <div className="text-center mb-10">
            <span className="tag">Modalités</span>
            <h2 className="section-title text-3xl md:text-4xl">Modalités d'intervention</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-sand-100 p-6">
              <div className="space-y-3">
                {interventions.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Clock3 size={16} className="text-sand-700 mt-0.5" />
                    <p className="text-stone-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-sand-100 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-sand-700 mt-0.5" />
                <p className="text-stone-700">Dans un cadre institutionnel global (financement par la structure), incluant accompagnements individuels et ateliers collectifs.</p>
              </div>
              <div className="flex items-start gap-3">
                <HandHeart size={18} className="text-sand-700 mt-0.5" />
                <p className="text-stone-700">Ou dans un cadre individualisé, défini avec l'établissement, pour des prestations à la demande.</p>
              </div>
              <div className="flex items-start gap-3">
                <FileText size={18} className="text-sand-700 mt-0.5" />
                <p className="text-stone-700">Les interventions s'effectuent en lien avec les équipes, dans le respect des protocoles internes, de la confidentialité et du cadre éthique.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-10">
            <span className="tag">Prestations individuelles</span>
            <h2 className="section-title text-3xl md:text-4xl">Tarifs à la demande</h2>
            <p className="text-stone-500 max-w-2xl mx-auto mt-3">Chaque soin est adapté à l'état de santé et au confort de la personne, dans le respect de son rythme.</p>
          </div>

          <div className="bg-white border border-nude-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 bg-nude-50 border-b border-nude-100">
              <div className="col-span-8 p-4 text-sm font-semibold text-stone-700">Prestation</div>
              <div className="col-span-4 p-4 text-sm font-semibold text-stone-700 text-right">Tarif</div>
            </div>
            {pricing.map(([name, price]) => (
              <div key={name} className="grid grid-cols-12 border-b border-stone-100 last:border-b-0">
                <div className="col-span-8 p-4 text-sm text-stone-700">{name}</div>
                <div className="col-span-4 p-4 text-sm text-stone-800 font-medium text-right">{price}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-sand-200 bg-sand-50 p-5 space-y-2 text-sm text-stone-600">
            <p>Ces prestations à la carte peuvent également être réalisées directement à l'institut Soléana Bien-Être à Venerque.</p>
            <p>Certaines mutuelles peuvent prendre en charge tout ou partie des séances de socio-esthétique. Renseignez-vous auprès de votre complémentaire santé. Une facture détaillée pourra vous être remise.</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a href="https://www.planity.com/soleana-bien-etre-31810-venerque" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Calendar size={16} />
              Réserver sur Planity
            </a>
            <a href="tel:0762169814" className="btn-phone">
              07 62 16 98 14
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white pb-14">
        <div className="container-wide">
          <div className="rounded-2xl border border-sand-100 bg-white p-5 md:p-6 text-center">
            <p className="text-stone-600">
              Activité portée par Soléana Bien-Être - Venerque
            </p>
            <div className="mt-2 text-sm text-stone-500">
              Interventions en lien avec les équipes, dans le respect du cadre éthique et de la confidentialité.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
