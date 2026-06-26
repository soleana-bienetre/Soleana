import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
  Gift,
  Heart,
  FileText,
  Store,
  CreditCard,
  Send,
  CheckCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { PageMeta, BreadcrumbSchema } from '../lib/useMeta';
import CTABanner from '../components/ui/CTABanner';
import { supabase, type GiftCard } from '../lib/supabase';
import { useSiteImages } from '../contexts/SiteImagesContext';
import { EMAILJS_CONFIG, ADMIN_EMAIL } from '../lib/emailjs';
import { trackPlanityClick } from '../lib/trackClick';

// ─── Coordonnées bancaires (à compléter par l'institut) ───────────────────────
// Laissez les valeurs vides pour ne PAS afficher le RIB sur l'écran de confirmation :
// dans ce cas, le client est informé qu'il recevra les coordonnées par email.
const BANK_DETAILS = {
  beneficiaire: '', // ex : 'Soléana Bien-Être'
  iban: '', // ex : 'FR76 0000 0000 0000 0000 0000 000'
  bic: '', // ex : 'XXXXXXXX'
};

const deliveryOptions = [
  { value: 'pdf', label: 'Envoi par email (PDF)', icon: FileText, desc: 'Vous recevez la carte cadeau en PDF, prête à imprimer ou à transférer.' },
  { value: 'retrait', label: 'Retrait à l\'institut', icon: Store, desc: 'Récupérez une jolie carte cadeau imprimée directement à Venerque.' },
];

const steps = [
  { icon: Gift, title: 'Choisissez votre cadeau', text: 'Sélectionnez un soin, une prestation ou un montant libre selon l\'envie de la personne à qui vous voulez faire plaisir.' },
  { icon: Heart, title: 'Remplissez le formulaire', text: 'Indiquez pour qui est le cadeau, vos coordonnées et le mode de réception souhaité.' },
  { icon: CreditCard, title: 'Réglez par virement', text: 'Nous vous transmettons les coordonnées bancaires. Le règlement se fait simplement par virement.' },
  { icon: Sparkles, title: 'Recevez votre carte cadeau', text: 'Une fois le paiement reçu, nous créons votre carte cadeau et vous la transmettons. Il ne reste plus qu\'à l\'offrir !' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  giftChoice: string;
  recipient: string;
  amount: string;
  message: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  delivery: string;
  postalAddress: string;
}

interface FormErrors {
  buyerName?: string;
  buyerEmail?: string;
  amount?: string;
  postalAddress?: string;
}

const emptyForm: FormState = {
  giftChoice: '',
  recipient: '',
  amount: '',
  message: '',
  buyerName: '',
  buyerEmail: '',
  buyerPhone: '',
  delivery: '',
  postalAddress: '',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BonCadeau() {
  const { getUrl } = useSiteImages();
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const cover = getUrl('bon-cadeau-cover');

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('visible', true)
        .order('card_order', { ascending: true });
      if (data) setCards(data as GiftCard[]);
    }
    load();
  }, []);

  function selectCard(title: string) {
    setForm((prev) => ({ ...prev, giftChoice: title }));
    setErrors((prev) => ({ ...prev, amount: undefined }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.buyerName.trim()) next.buyerName = 'Veuillez saisir votre nom.';
    if (!form.buyerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.buyerEmail)) {
      next.buyerEmail = 'Veuillez saisir une adresse email valide.';
    }
    if (!form.giftChoice.trim() && !form.amount.trim()) {
      next.amount = 'Indiquez un montant ou choisissez une prestation.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setLoading(true);

    const deliveryLabel = deliveryOptions.find((o) => o.value === form.delivery)?.label ?? form.delivery;

    try {
      const { error: dbError } = await supabase.from('gift_card_requests').insert({
        buyer_name: form.buyerName,
        buyer_email: form.buyerEmail,
        buyer_phone: form.buyerPhone || null,
        recipient: form.recipient || null,
        gift_choice: form.giftChoice || null,
        amount: form.amount || null,
        message: form.message || null,
        delivery_method: deliveryLabel,
      });

      if (dbError) throw dbError;

      // Notification à Laetitia (best-effort)
      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateAdminId,
          {
            from_name: form.buyerName,
            from_email: form.buyerEmail,
            from_phone: form.buyerPhone || 'Non renseigné',
            subject: 'Nouvelle demande de carte cadeau',
            message:
              `Nouvelle demande de CARTE CADEAU\n\n` +
              `Pour : ${form.recipient || 'Non précisé'}\n` +
              `Cadeau : ${form.giftChoice || 'Montant libre'}\n` +
              `Montant / prestation : ${form.amount || 'Non précisé'}\n` +
              `Réception : ${deliveryLabel}\n` +
              (form.message ? `\nMessage : ${form.message}\n` : ''),
            to_email: ADMIN_EMAIL,
          },
          EMAILJS_CONFIG.publicKey
        );
      } catch (mailErr) {
        console.error('Notification carte cadeau non envoyée:', mailErr);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Erreur demande carte cadeau:', err);
      // Si l'enregistrement Supabase a échoué, on prévient l'utilisateur
      setErrors({ buyerEmail: 'Une erreur est survenue, veuillez réessayer ou nous contacter directement.' });
    } finally {
      setLoading(false);
    }
  }

  const hasBankDetails = BANK_DETAILS.iban.trim().length > 0;

  return (
    <>
      <PageMeta
        title="Carte cadeau – Soléana Bien-Être Venerque"
        description="Offrez un moment de bien-être avec une carte cadeau Soléana Bien-Être à Venerque (31) : soin du visage, massage, drainage ou montant libre. Demande en ligne, règlement par virement."
        url="https://www.soleana-bienetre.com/carte-cadeau"
      />
      <BreadcrumbSchema items={[{ name: 'Carte cadeau', url: 'https://www.soleana-bienetre.com/carte-cadeau' }]} />

      {/* ── Hero ── */}
      <section className="relative">
        <div className="absolute inset-0">
          {cover && (
            <img src={cover} alt="Carte cadeau Soléana Bien-Être" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/55 via-stone-900/40 to-stone-900/65" />
        </div>
        <div className="relative container-narrow text-center py-28 md:py-36">
          <span className="inline-flex items-center gap-2 text-xs font-sans font-medium tracking-widest uppercase text-white/90 mb-4">
            <Gift size={15} /> Faites plaisir
          </span>
          <h1 className="font-serif font-light text-white text-4xl md:text-5xl lg:text-6xl">
            La carte cadeau Soléana
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Offrez à une personne qui vous est chère une parenthèse de douceur :
            un soin, un massage ou le montant de votre choix, à vivre dans notre cocon de bien-être à Venerque.
          </p>
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary mt-9"
          >
            <Gift size={16} /> Demander une carte cadeau
          </button>
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="tag">Simple & rapide</span>
            <h2 className="section-title text-3xl md:text-4xl mt-2">Comment ça marche ?</h2>
            <p className="mt-4 text-stone-500">
              Vous remplissez le formulaire, vous réglez par virement, et nous vous transmettons
              la carte cadeau prête à offrir après réception du paiement.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative bg-white rounded-2xl border border-sand-100 p-6 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-nude-50 text-nude-600 flex items-center justify-center mb-4">
                  <step.icon size={22} />
                </div>
                <span className="absolute top-6 right-6 font-serif text-3xl font-light text-sand-200">
                  {i + 1}
                </span>
                <h3 className="font-serif text-lg font-light text-stone-800 mb-2">{step.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="max-w-xl w-full rounded-2xl overflow-hidden shadow-sm border border-sand-100 bg-white p-2">
              <img 
                src="https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Carte-cadeau-soleana.webp" 
                alt="Visuel Carte Cadeau Soléana" 
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Les cartes / prestations ── */}
      {cards.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="tag">À offrir</span>
              <h2 className="section-title text-3xl md:text-4xl mt-2">Nos idées cadeaux</h2>
              <p className="mt-4 text-stone-500">
                Choisissez l'une de nos prestations ou optez pour un montant libre :
                la personne qui le recevra l'utilisera comme elle le souhaite.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => {
                const selected = form.giftChoice === card.title;
                return (
                  <div
                    key={card.id}
                    className={`flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
                      selected ? 'border-nude-400 ring-2 ring-nude-200 shadow-md' : 'border-sand-100 shadow-sm hover:shadow-lg hover:-translate-y-1'
                    }`}
                  >
                    {card.image_url ? (
                      <div className="aspect-[4/3] overflow-hidden bg-sand-50">
                        <img src={card.image_url} alt={card.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-nude-100 to-sand-100 flex items-center justify-center">
                        <Gift size={40} className="text-nude-400" />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="font-serif text-xl font-light text-stone-800">{card.title}</h3>
                      {card.price && (
                        <p className="text-sm font-medium text-nude-700 mt-1">{card.price}</p>
                      )}
                      {card.description && (
                        <p className="text-sm text-stone-500 leading-relaxed mt-3 flex-1">{card.description}</p>
                      )}
                      <button
                        onClick={() => selectCard(card.title)}
                        className={`mt-5 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                          selected
                            ? 'bg-nude-600 text-white'
                            : 'bg-nude-50 text-nude-700 hover:bg-nude-100'
                        }`}
                      >
                        {selected ? (<><CheckCircle size={15} /> Sélectionné</>) : (<>Choisir ce cadeau <ChevronRight size={15} /></>)}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Formulaire ── */}
      <section ref={formRef} className="section-padding bg-cream scroll-mt-24">
        <div className="container-narrow">
          <div className="bg-white rounded-3xl border border-sand-100 shadow-sm p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle size={32} className="text-sage-600" />
                </div>
                <h2 className="font-serif text-2xl font-light text-stone-800 mb-3">Demande envoyée !</h2>
                <p className="text-stone-500 text-sm leading-relaxed max-w-md">
                  Merci pour votre demande de carte cadeau. Nous revenons vers vous très vite avec
                  les modalités de règlement par virement. Dès réception du paiement, nous créons
                  votre carte cadeau et vous la transmettons selon le mode choisi.
                </p>

                {hasBankDetails ? (
                  <div className="mt-6 w-full max-w-md text-left bg-sand-50 border border-sand-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard size={16} className="text-nude-600" />
                      <p className="font-sans font-semibold text-sm text-stone-700 uppercase tracking-wide">
                        Règlement par virement
                      </p>
                    </div>
                    <dl className="space-y-1.5 text-sm text-stone-600">
                      <div className="flex justify-between gap-4"><dt className="text-stone-400">Bénéficiaire</dt><dd className="font-medium text-right">{BANK_DETAILS.beneficiaire}</dd></div>
                      <div className="flex justify-between gap-4"><dt className="text-stone-400">IBAN</dt><dd className="font-medium text-right break-all">{BANK_DETAILS.iban}</dd></div>
                      {BANK_DETAILS.bic && (
                        <div className="flex justify-between gap-4"><dt className="text-stone-400">BIC</dt><dd className="font-medium text-right">{BANK_DETAILS.bic}</dd></div>
                      )}
                    </dl>
                    <p className="text-xs text-stone-400 mt-3">
                      Merci d'indiquer votre nom en référence du virement.
                    </p>
                  </div>
                ) : (
                  <p className="mt-5 text-xs text-stone-400 max-w-md">
                    Les coordonnées bancaires pour le virement vous seront communiquées par email.
                  </p>
                )}

                {form.delivery === 'retrait' && (
                  <a
                    href="https://www.planity.com/soleana-bien-etre-31810-venerque"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
                  >
                    <Store size={15} />
                    Réserver mon créneau de retrait sur Planity
                    <ChevronRight size={14} />
                  </a>
                )}

                <button
                  onClick={() => { setSubmitted(false); setForm(emptyForm); }}
                  className="mt-8 btn-secondary"
                >
                  Nouvelle demande
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <span className="tag">Votre demande</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-stone-800 mt-1">
                    Demander une carte cadeau
                  </h2>
                  <p className="text-stone-500 text-sm mt-2">
                    Les champs marqués d'un <span className="text-nude-500">*</span> sont obligatoires.
                    Aucun paiement en ligne : le règlement se fait par virement après votre demande.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Le cadeau */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="giftChoice" className="block text-xs font-medium font-sans text-stone-600 mb-1.5">
                        Le cadeau
                      </label>
                      <select
                        id="giftChoice"
                        name="giftChoice"
                        value={form.giftChoice}
                        onChange={handleChange}
                        className="input-field appearance-none cursor-pointer"
                      >
                        <option value="">Montant libre / autre</option>
                        {cards.map((c) => (
                          <option key={c.id} value={c.title}>{c.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="amount" className="block text-xs font-medium font-sans text-stone-600 mb-1.5">
                        Montant ou prestation souhaitée <span className="text-nude-500">*</span>
                      </label>
                      <input
                        id="amount"
                        name="amount"
                        type="text"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="ex : 60 €, ou « Soin du visage »"
                        className={`input-field ${errors.amount ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                      />
                      {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
                    </div>
                  </div>

                  {/* Pour qui + message */}
                  <div>
                    <label htmlFor="recipient" className="block text-xs font-medium font-sans text-stone-600 mb-1.5">
                      Pour qui est ce cadeau ?
                    </label>
                    <input
                      id="recipient"
                      name="recipient"
                      type="text"
                      value={form.recipient}
                      onChange={handleChange}
                      placeholder="Prénom de la personne à qui vous offrez le cadeau"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium font-sans text-stone-600 mb-1.5">
                      Message personnel (facultatif)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Un petit mot à faire figurer sur la carte cadeau…"
                      className="input-field resize-none"
                    />
                  </div>

                  {/* Mode de réception */}
                  <div>
                    <span className="block text-xs font-medium font-sans text-stone-600 mb-2">
                      Mode de réception <span className="text-nude-500">*</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {/* Option 1 : Email (reste sur le formulaire) */}
                      <button
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, delivery: 'pdf' }));
                          trackPlanityClick(pathname, 'Carte cadeau – Envoi par email (PDF)');
                        }}
                        className={`text-left rounded-2xl border p-4 transition-all duration-200 ${
                          form.delivery === 'pdf' ? 'border-nude-400 ring-2 ring-nude-200 bg-nude-50/40' : 'border-sand-200 hover:border-nude-300'
                        }`}
                      >
                        <FileText size={18} className={form.delivery === 'pdf' ? 'text-nude-600' : 'text-stone-400'} />
                        <p className="text-sm font-medium text-stone-700 mt-2">Envoi par email (PDF)</p>
                        <p className="text-xs text-stone-400 mt-1 leading-relaxed">Vous recevez la carte cadeau en PDF, prête à imprimer ou à transférer.</p>
                      </button>

                      {/* Option 2 : Retrait → lien direct Planity */}
                      <a
                        href="https://www.planity.com/soleana-bien-etre-31810-venerque"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackPlanityClick(pathname, 'Carte cadeau – Retrait à l’institut (Planity)')}
                        className="text-left rounded-2xl border border-sand-200 p-4 hover:border-nude-300 hover:bg-nude-50/30 transition-all duration-200 flex flex-col"
                      >
                        <Store size={18} className="text-stone-400" />
                        <p className="text-sm font-medium text-stone-700 mt-2">Retrait à l'institut</p>
                        <p className="text-xs text-stone-400 mt-1 leading-relaxed">Réservez votre créneau sur Planity pour récupérer une jolie carte cadeau imprimée.</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-nude-600">
                          Réserver sur Planity <ChevronRight size={13} />
                        </span>
                      </a>

                    </div>
                  </div>

                  <div
                    style={{
                      maxHeight: form.delivery === 'pdf' ? '800px' : '0px',
                      opacity: form.delivery === 'pdf' ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
                      pointerEvents: form.delivery === 'pdf' ? 'auto' : 'none',
                    }}
                  >
                    <div className="space-y-6 pt-1">
                      <div className="border-t border-sand-100 pt-6">
                        <p className="text-xs font-medium font-sans text-stone-500 uppercase tracking-wide mb-4">Vos coordonnées</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="buyerName" className="block text-xs font-medium font-sans text-stone-600 mb-1.5">
                              Nom complet <span className="text-nude-500">*</span>
                            </label>
                            <input
                              id="buyerName"
                              name="buyerName"
                              type="text"
                              autoComplete="name"
                              value={form.buyerName}
                              onChange={handleChange}
                              placeholder="Votre nom et prénom"
                              className={`input-field ${errors.buyerName ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                            />
                            {errors.buyerName && <p className="mt-1 text-xs text-red-500">{errors.buyerName}</p>}
                          </div>
                          <div>
                            <label htmlFor="buyerEmail" className="block text-xs font-medium font-sans text-stone-600 mb-1.5">
                              Email <span className="text-nude-500">*</span>
                            </label>
                            <input
                              id="buyerEmail"
                              name="buyerEmail"
                              type="email"
                              autoComplete="email"
                              value={form.buyerEmail}
                              onChange={handleChange}
                              placeholder="votre@email.com"
                              className={`input-field ${errors.buyerEmail ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                            />
                            {errors.buyerEmail && <p className="mt-1 text-xs text-red-500">{errors.buyerEmail}</p>}
                          </div>
                        </div>
                        <div className="mt-5">
                          <label htmlFor="buyerPhone" className="block text-xs font-medium font-sans text-stone-600 mb-1.5">
                            Téléphone
                          </label>
                          <input
                            id="buyerPhone"
                            name="buyerPhone"
                            type="tel"
                            autoComplete="tel"
                            value={form.buyerPhone}
                            onChange={handleChange}
                            placeholder="06 xx xx xx xx"
                            className="input-field"
                          />
                        </div>
                      </div>

                      <p className="text-xs text-stone-400 leading-relaxed">
                        En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour
                        traiter votre demande conformément à notre{' '}
                        <a href="/politique-de-confidentialite" className="text-nude-500 hover:text-nude-600 underline underline-offset-2">
                          politique de confidentialité
                        </a>.
                      </p>

                      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Envoi en cours…
                          </>
                        ) : (
                          <>
                            <Send size={16} /> Envoyer ma demande
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <CTABanner
        title="Une question sur les cartes cadeaux ?"
        subtitle="Contactez-nous, nous vous accompagnons avec plaisir pour préparer votre cadeau."
      />
    </>
  );
}
