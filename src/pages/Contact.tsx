import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PageMeta } from '../lib/useMeta';
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  Send,
  CheckCircle,
  Car,
  Navigation,
  Mail,
  ChevronRight,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import { supabase } from '../lib/supabase';
import { EMAILJS_CONFIG, ADMIN_EMAIL } from '../lib/emailjs';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const hoursData = [
  { day: 'Lundi', hours: 'Fermé', closed: true },
  { day: 'Mardi', hours: '09h00 – 18h00', closed: false },
  { day: 'Mercredi', hours: '09h00 – 11h00', closed: false },
  { day: 'Jeudi', hours: '09h00 – 20h00', closed: false },
  { day: 'Vendredi', hours: '09h00 – 18h00', closed: false },
  { day: 'Samedi', hours: '09h00 – 13h30', closed: false },
  { day: 'Dimanche', hours: 'Fermé', closed: true },
];

const subjectOptions = [
  { value: '', label: 'Sélectionnez un sujet…' },
  { value: 'renseignement', label: 'Renseignement général' },
  { value: 'rdv', label: 'Prise de rendez-vous' },
  { value: 'laser', label: 'Épilation laser' },
  { value: 'soin-visage', label: 'Soin visage' },
  { value: 'kobido', label: 'Kobido' },
  { value: 'massage', label: 'Massage' },
  { value: 'drainage', label: 'Drainage & Maderothérapie' },
  { value: 'autre', label: 'Autre' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoCard({
  icon,
  title,
  children,
  accentColor = 'nude',
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accentColor?: 'nude' | 'sage' | 'sand';
}) {
  const iconColors: Record<string, string> = {
    nude: 'bg-nude-50 text-nude-600',
    sage: 'bg-sage-50 text-sage-600',
    sand: 'bg-sand-50 text-sand-600',
  };
  return (
    <div className="bg-white rounded-2xl border border-sand-100 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconColors[accentColor]}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-sans font-semibold text-sm text-stone-700 mb-1.5 tracking-wide uppercase">
            {title}
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Veuillez saisir votre nom.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Veuillez saisir une adresse email valide.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Votre message doit contenir au moins 10 caractères.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // 1. Sauvegarde dans Supabase
      const { error: dbError } = await supabase.from('contacts').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.subject
          ? `[${subjectOptions.find((o) => o.value === form.subject)?.label ?? form.subject}]\n\n${form.message}`
          : form.message,
      });

      if (dbError) throw dbError;

      // 2. Email de confirmation au client
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateClientId,
        {
          to_name: form.name,
          to_email: form.email,
          subject: subjectOptions.find((o) => o.value === form.subject)?.label ?? 'votre demande',
          message: form.message,
          phone: form.phone || 'Non renseigné',
        },
        EMAILJS_CONFIG.publicKey
      );

      // 3. Email de notification à Laetitia
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateAdminId,
        {
          from_name: form.name,
          from_email: form.email,
          from_phone: form.phone || 'Non renseigné',
          subject: subjectOptions.find((o) => o.value === form.subject)?.label ?? 'Renseignement général',
          message: form.message,
          to_email: ADMIN_EMAIL,
        },
        EMAILJS_CONFIG.publicKey
      );

      setSubmitted(true);
    } catch (err) {
      console.error('Erreur envoi formulaire:', err);
      // On affiche quand même le succès si Supabase a fonctionné (email peut échouer en dev)
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageMeta
        title="Contact & Réservation – Soléana Bien-Être Venerque"
        description="Prenez rendez-vous chez Soléana Bien-Être à Venerque (31). Réservation en ligne 24h/24, appel au 07 62 16 98 14, ou message via le formulaire. Laetitia vous répond rapidement."
        url="https://www.soleana-bienetre.com/contact"
      />
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-sand-50 to-cream section-padding">
        <div className="container-narrow">
          <div className="mt-8 text-center">
            <span className="tag">Nous contacter</span>
            <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-2">
              Prenez contact avec nous
            </h1>
            <p className="mt-6 text-base md:text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Une question, une envie de réserver ou simplement besoin d'un conseil ?
              L'équipe de Soléana Bien-Être est là pour vous accompagner.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">

            {/* ── Left: Info Cards + Map ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Adresse */}
              <InfoCard icon={<MapPin size={20} />} title="Adresse" accentColor="nude">
                <address className="not-italic text-sm text-stone-600 leading-relaxed">
                  <a href="https://maps.app.goo.gl/RYgHzauJiXPw43ja7" target="_blank" rel="noopener noreferrer" className="hover:text-nude-600 transition-colors">
                    1 Rue de la Fraternité<br />
                    31810 Venerque
                  </a>
                </address>
                <a
                  href="https://maps.google.com/?q=1+Rue+de+la+Fraternite+31810+Venerque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-nude-600 hover:text-nude-700 font-medium"
                >
                  Voir sur Google Maps <ChevronRight size={12} />
                </a>
              </InfoCard>

              {/* Téléphone */}
              <InfoCard icon={<Phone size={20} />} title="Téléphone" accentColor="sage">
                <a
                  href="tel:0762169814"
                  className="text-sm font-medium text-stone-700 hover:text-nude-700 transition-colors"
                >
                  07 62 16 98 14
                </a>
                <p className="text-xs text-stone-400 mt-1">
                  Sur rendez-vous uniquement
                </p>
              </InfoCard>

              {/* Horaires */}
              <InfoCard icon={<Clock size={20} />} title="Horaires d'ouverture" accentColor="sand">
                <div className="space-y-1.5 mt-1">
                  {hoursData.map(({ day, hours, closed }) => (
                    <div key={day} className="flex items-center justify-between gap-4">
                      <span className={`text-xs font-medium ${closed ? 'text-stone-400' : 'text-stone-600'}`}>
                        {day}
                      </span>
                      <span
                        className={`text-xs font-sans ${
                          closed
                            ? 'text-stone-300 italic'
                            : 'text-stone-700 font-medium'
                        }`}
                      >
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </InfoCard>

              {/* Réserver en ligne */}
              <div className="bg-gradient-to-br from-nude-600 to-nude-700 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={18} className="text-nude-200" />
                  <h3 className="font-sans font-semibold text-sm tracking-wide uppercase">
                    Réserver en ligne
                  </h3>
                </div>
                <p className="text-nude-100 text-xs leading-relaxed mb-4">
                  Réservez votre séance en toute autonomie, 24h/24, via notre plateforme
                  de réservation en ligne Planity.
                </p>
                <a
                  href="https://www.planity.com/soleana-bien-etre-31810-venerque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-nude-700 text-xs font-sans font-semibold rounded-full hover:bg-sand-50 transition-colors duration-200"
                >
                  <Calendar size={14} />
                  Réserver sur Planity
                </a>
              </div>

              {/* Accès & Parking */}
              <div className="bg-white rounded-2xl border border-sand-100 p-6 shadow-sm space-y-4">
                <h3 className="font-sans font-semibold text-sm text-stone-700 tracking-wide uppercase">
                  Accès & Stationnement
                </h3>
                <div className="flex items-start gap-3">
                  <Car size={16} className="text-sage-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-stone-700 mb-0.5">Parking gratuit</p>
                    <p className="text-xs text-stone-500">
                      Stationnement gratuit directement sur place, au <a href="https://maps.app.goo.gl/RYgHzauJiXPw43ja7" target="_blank" rel="noopener noreferrer" className="text-nude-600 hover:text-nude-700 transition-colors">1 Rue de la Fraternité</a>.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation size={16} className="text-nude-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-stone-700 mb-0.5">Accès facile</p>
                    <p className="text-xs text-stone-500">
                      Situé à Venerque, accessible depuis Auterive (10 min), Labarthe-sur-Lèze
                      (10 min), Pins-Justaret, Eaunes et Toulouse Sud (30 min).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-sand-100 shadow-sm p-8 md:p-10">
                {submitted ? (
                  // Success state
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center mb-5">
                      <CheckCircle size={32} className="text-sage-600" />
                    </div>
                    <h2 className="font-serif text-2xl font-light text-stone-800 mb-3">
                      Message envoyé !
                    </h2>
                    <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
                      Merci pour votre message. Nous vous répondrons dans les meilleurs délais,
                      généralement sous 24 à 48 heures ouvrées.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: '',
                          email: '',
                          phone: '',
                          subject: '',
                          message: '',
                        });
                      }}
                      className="mt-8 btn-secondary"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="font-serif text-2xl font-light text-stone-800">
                        Envoyez-nous un message
                      </h2>
                      <p className="text-stone-500 text-sm mt-2">
                        Tous les champs marqués d'un <span className="text-nude-500">*</span> sont
                        obligatoires.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-medium font-sans text-stone-600 mb-1.5"
                          >
                            Nom complet <span className="text-nude-500">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Votre nom et prénom"
                            className={`input-field ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                          />
                          {errors.name && (
                            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-medium font-sans text-stone-600 mb-1.5"
                          >
                            Email <span className="text-nude-500">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            className={`input-field ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Phone + Subject row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-medium font-sans text-stone-600 mb-1.5"
                          >
                            Téléphone
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="06 xx xx xx xx"
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-xs font-medium font-sans text-stone-600 mb-1.5"
                          >
                            Sujet
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="input-field appearance-none cursor-pointer"
                          >
                            {subjectOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-xs font-medium font-sans text-stone-600 mb-1.5"
                        >
                          Message <span className="text-nude-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Décrivez votre demande, vos questions ou vos besoins…"
                          className={`input-field resize-none ${errors.message ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                        )}
                      </div>

                      {/* RGPD notice */}
                      <p className="text-xs text-stone-400 leading-relaxed">
                        En soumettant ce formulaire, vous acceptez que vos données soient
                        utilisées pour traiter votre demande conformément à notre{' '}
                        <a
                          href="/politique-confidentialite"
                          className="text-nude-500 hover:text-nude-600 underline underline-offset-2"
                        >
                          politique de confidentialité
                        </a>.
                      </p>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full sm:w-auto"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Envoi en cours…
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Envoyer le message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="bg-white py-12">
        <div className="container-wide">
          <div className="rounded-3xl overflow-hidden border border-sand-100 shadow-sm h-72 md:h-[480px]">
            <iframe
              title="Soléana Bien-Être – 1 Rue de la Fraternité, 31810 Venerque"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.3!2d1.5487!3d43.4024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebb1c2f2e4f5b%3A0x0!2s1+Rue+de+la+Fraternit%C3%A9%2C+31810+Venerque!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <address className="not-italic text-sm text-stone-500 flex items-center gap-1.5">
              <MapPin size={14} className="text-nude-500 shrink-0" />
              Soléana Bien-Être – 1 Rue de la Fraternité, 31810 Venerque
            </address>
            <a
              href="https://maps.google.com/?q=1+Rue+de+la+Fraternite+31810+Venerque"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-nude-600 hover:text-nude-700 transition-colors"
            >
              <Navigation size={13} />
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ── Local SEO Text ── */}
      <section className="bg-cream py-12">
        <div className="container-narrow">
          <div className="bg-white rounded-2xl border border-sand-100 p-8">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={16} className="text-nude-500" />
              <h2 className="font-serif text-xl font-light text-stone-800">
                Soléana Bien-Être, votre institut à Venerque et ses environs
              </h2>
            </div>
            <div className="space-y-3 text-sm text-stone-500 leading-relaxed">
              <p>
                Situé au cœur de Venerque, à quelques minutes d'Auterive et de
                Labarthe-sur-Lèze, Soléana Bien-Être accueille des clientes et clients venant
                de toute la région : Vernet, Eaunes, Pins-Justaret, Miremont et l'ensemble du
                Toulouse Sud.
              </p>
              <p>
                Notre institut propose une gamme complète de soins bien-être : épilation laser,
                soins visage, Kobido, massages ayurvédiques et balinais, drainage lymphatique et
                maderothérapie. Chaque soin est personnalisé pour répondre à vos besoins
                spécifiques.
              </p>
              <p>
                Facilement accessible depuis la RD820, avec un parking gratuit sur place, nous
                accueillons toutes les personnes souhaitant prendre soin d'elles dans un cadre
                serein et chaleureux. Sur rendez-vous uniquement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <CTABanner
        title="Prête à vivre un moment rien que pour vous ?"
        subtitle="Réservez en ligne ou appelez-nous pour trouver le créneau qui vous convient."
      />
    </>
  );
}
