import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Instagram, Facebook, Heart, Calendar } from 'lucide-react';

const horaires = [
  { jour: 'Lundi', heure: 'Fermé' },
  { jour: 'Mardi', heure: '09:00 – 18:00' },
  { jour: 'Mercredi', heure: '09:00 – 11:00' },
  { jour: 'Jeudi', heure: '09:00 – 20:00' },
  { jour: 'Vendredi', heure: '09:00 – 18:00' },
  { jour: 'Samedi', heure: '09:00 – 13:30' },
  { jour: 'Dimanche', heure: 'Fermé' },
];

const services = [
  { label: 'Épilation laser', href: '/epilation-laser' },
  { label: 'Soins du visage', href: '/soins-visage' },
  { label: 'Kobido', href: '/kobido' },
  { label: 'Massages bien-être', href: '/massages' },
  { label: 'Drainage lymphatique', href: '/drainage-lymphatique' },
  { label: 'Maderothérapie', href: '/drainage-lymphatique' },
  { label: 'Tarifs', href: '/tarifs' },
];

const liens = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Blog & Conseils', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container-wide pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex flex-col mb-5 group">
              <span className="font-serif text-2xl font-light text-white tracking-wide">Soléana</span>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-nude-400">Bien-Être</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed mb-5">
              Institut de bien-être et d'esthétique à Venerque. Un cocon chaleureux pensé pour votre détente, votre beauté et votre sérénité.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="#"
                aria-label="Instagram Soléana Bien-Être"
                className="p-2.5 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-nude-600 transition-all duration-200"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook Soléana Bien-Être"
                className="p-2.5 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-nude-600 transition-all duration-200"
              >
                <Facebook size={16} />
              </a>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-ecru-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-stone-400">5/5 – Avis clients</span>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold text-white uppercase tracking-widest mb-5">Nos soins</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className="text-sm text-stone-400 hover:text-nude-400 transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold text-white uppercase tracking-widest mb-5">Navigation</h3>
            <ul className="space-y-2.5 mb-6">
              {liens.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm text-stone-400 hover:text-nude-400 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-4 border-t border-stone-800">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-nude-500 mt-0.5 shrink-0" />
                <a href="https://maps.app.goo.gl/RYgHzauJiXPw43ja7" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-nude-400 transition-colors">1 Rue de la Fraternité<br />31810 Venerque, France</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-nude-500 shrink-0" />
                <a href="tel:0762169814" className="text-sm text-stone-400 hover:text-nude-400 transition-colors">
                  07 62 16 98 14
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
              <Clock size={14} />
              Horaires
            </h3>
            <ul className="space-y-2">
              {horaires.map((h) => (
                <li key={h.jour} className="flex justify-between text-sm">
                  <span className="text-stone-400">{h.jour}</span>
                  <span className={h.heure === 'Fermé' ? 'text-stone-600' : 'text-stone-300 font-medium'}>
                    {h.heure}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-stone-800">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-nude-600 text-white text-sm font-medium rounded-full hover:bg-nude-700 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Calendar size={14} />
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            © {currentYear} Soléana Bien-Être – Laetitia Sevrin – 1 Rue de la Fraternité, 31810 Venerque
          </p>
          <p className="text-xs text-stone-600 flex items-center gap-1">
            Fait avec <Heart size={11} className="text-nude-500 fill-current" /> en France
          </p>
          <div className="flex items-center gap-4">
            <Link to="/mentions-legales" className="text-xs text-stone-500 hover:text-stone-400 transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="text-xs text-stone-500 hover:text-stone-400 transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
