import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'soleana_cookie_consent';

type ConsentStatus = 'accepted' | 'refused' | null;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus;
    if (!stored) {
      // Légère temporisation pour éviter le flash au chargement
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function handleRefuse() {
    localStorage.setItem(STORAGE_KEY, 'refused');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-up"
    >
      <div className="max-w-4xl mx-auto bg-white border border-sand-200 rounded-2xl shadow-2xl shadow-stone-900/15 overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4 p-5 md:p-6">

          {/* Icône */}
          <div className="shrink-0 hidden sm:flex">
            <div className="w-11 h-11 bg-nude-50 rounded-xl flex items-center justify-center">
              <Cookie size={20} className="text-nude-600" />
            </div>
          </div>

          {/* Texte */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Cookie size={16} className="text-nude-600 sm:hidden shrink-0" />
              <h2 className="font-serif text-base font-light text-stone-800">
                Ce site utilise des cookies
              </h2>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              Nous utilisons uniquement des cookies essentiels au bon fonctionnement du site.
              Aucun cookie publicitaire ni de traçage commercial n'est utilisé.{' '}
              <Link
                to="/politique-cookies"
                className="text-nude-600 hover:text-nude-700 underline underline-offset-2 whitespace-nowrap"
              >
                En savoir plus
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
            <button
              onClick={handleRefuse}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-stone-500 hover:text-stone-700 border border-sand-200 hover:border-sand-300 rounded-full transition-all duration-200 whitespace-nowrap"
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-nude-600 hover:bg-nude-700 text-white text-sm font-medium rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-sm shadow-nude-900/20 whitespace-nowrap"
            >
              <ShieldCheck size={14} />
              Accepter
            </button>
            <button
              onClick={handleRefuse}
              aria-label="Fermer"
              className="p-2 text-stone-400 hover:text-stone-600 hover:bg-sand-50 rounded-full transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
