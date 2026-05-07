import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const MOTHERS_DAY_IMAGE = 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/fete-des-meres-annonce-Evenement-Salon-Bien-etre-soleana.webp';
const PLANITY_URL = 'https://www.planity.com/soleana-bien-etre-31810-venerque';

const SPRING_PROMO_IMAGES = [
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20primptemps/1.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20primptemps/2.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20primptemps/3.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20primptemps/4.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20primptemps/5.webp',
];

type PromoView = 'menu' | 'mothers-day' | 'spring';
type TargetOffer = 'mothers-day' | 'spring';

const CONFETTI_COLORS = ['#f43f5e', '#f97316', '#10b981', '#14b8a6', '#eab308', '#8b5cf6'];
const CONFETTI_COUNT = 52;

export default function SeasonalPopups() {
  const [isPromoCardVisible, setIsPromoCardVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<PromoView>('menu');
  const [storyIndex, setStoryIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const openModal = () => {
    setView('menu');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setView('menu');
  };

  const launchConfettiThenOpen = (target: TargetOffer) => {
    setShowConfetti(true);
    window.setTimeout(() => {
      setShowConfetti(false);
      setView(target);
    }, 900);
  };

  return (
    <>
      {isPromoCardVisible && (
        <div className="fixed right-3 bottom-3 sm:right-4 sm:bottom-4 z-[120]">
          <div className="relative w-[88vw] max-w-[290px] rounded-2xl border border-amber-200 bg-white/95 backdrop-blur-sm shadow-lg p-3">
            <button
              type="button"
              onClick={() => setIsPromoCardVisible(false)}
              className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center"
              aria-label="Masquer les promotions"
            >
              <X size={12} />
            </button>
            <p className="text-sm text-stone-700 font-medium pr-7">Découvrez nos promotions</p>
            <button
              type="button"
              onClick={openModal}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-nude-600 text-white text-sm font-medium hover:bg-nude-700 transition-colors"
            >
              Voir les offres
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[150] bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors flex items-center justify-center"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>

            {view === 'menu' && (
              <div className="p-5 sm:p-6">
                <h3 className="font-serif text-2xl text-stone-800">Choisissez une promotion</h3>

                <div className="mt-5 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => launchConfettiThenOpen('mothers-day')}
                    className="w-full text-left rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 hover:bg-rose-100 transition-colors"
                  >
                    <p className="text-sm font-semibold text-rose-700">Fete des meres</p>
                    <p className="text-xs text-stone-600 mt-1">Massage ayurvedique ou balinais + 30 min offertes</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => launchConfettiThenOpen('spring')}
                    className="w-full text-left rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 hover:bg-emerald-100 transition-colors"
                  >
                    <p className="text-sm font-semibold text-emerald-700">Promotion printemps</p>
                    <p className="text-xs text-stone-600 mt-1">Notre offre minceur</p>
                  </button>
                </div>
              </div>
            )}

            {showConfetti && (
              <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
                {Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
                  const left = `${(i * 37) % 100}%`;
                  const delay = `${(i % 10) * 35}ms`;
                  const duration = `${850 + (i % 8) * 120}ms`;
                  const drift = `${(i % 2 === 0 ? 1 : -1) * (12 + (i % 6) * 6)}px`;
                  const size = `${5 + (i % 4)}px`;
                  const radius = i % 3 === 0 ? '9999px' : '2px';
                  const rotateStart = `${(i % 2 === 0 ? 1 : -1) * (40 + (i % 7) * 18)}deg`;
                  const rotateEnd = `${(i % 2 === 0 ? 1 : -1) * (360 + (i % 7) * 65)}deg`;
                  const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];

                  return (
                    <span
                      key={`confetti-${i}`}
                      className="absolute top-[-14px] opacity-95"
                      style={{
                        left,
                        width: size,
                        height: `${Math.max(3, Number.parseInt(size, 10) - 1)}px`,
                        borderRadius: radius,
                        backgroundColor: color,
                        boxShadow: `0 0 0 1px ${color}22, 0 2px 6px ${color}66`,
                        animationName: 'promo-confetti-burst',
                        animationDuration: duration,
                        animationDelay: delay,
                        animationTimingFunction: 'cubic-bezier(.21,.98,.31,1)',
                        animationFillMode: 'forwards',
                        transform: `translateX(0) translateY(0) rotate(${rotateStart})`,
                        ['--confetti-drift' as string]: drift,
                        ['--confetti-rotate-end' as string]: rotateEnd,
                      }}
                    />
                  );
                })}
                <div className="absolute inset-0 bg-white/0 animate-[promo-confetti-flash_280ms_ease-out]" />
              </div>
            )}

            {view === 'mothers-day' && (
              <div>
                <img src={MOTHERS_DAY_IMAGE} alt="Offre Fete des meres" className="w-full max-h-[60vh] object-contain bg-white" />
                <div className="p-4 border-t border-stone-100 space-y-2">
                  <p className="text-sm text-stone-700">Pour tout bon cadeau de massage ayurvedique ou balinais : 30 min offertes.</p>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setView('menu')}
                      className="text-xs text-stone-500 hover:text-stone-700"
                    >
                      Retour au choix
                    </button>
                    <a
                      href={PLANITY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors"
                    >
                      Reserver sur Planity
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {view === 'spring' && (
              <div>
                <img
                  key={SPRING_PROMO_IMAGES[storyIndex]}
                  src={SPRING_PROMO_IMAGES[storyIndex]}
                  alt={`Promotion printemps visuel ${storyIndex + 1}`}
                  className="w-full max-h-[60vh] object-contain bg-white"
                />
                <div className="p-4 border-t border-stone-100 space-y-3">
                  {storyIndex === 4 && (
                    <div className="flex justify-center">
                      <a
                        href={PLANITY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Reserver sur Planity
                        <ChevronRight size={14} />
                      </a>
                    </div>
                  )}
                  <div className="flex gap-1">
                    {SPRING_PROMO_IMAGES.map((img, i) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setStoryIndex(i)}
                        className={`h-1.5 flex-1 rounded-full ${i === storyIndex ? 'bg-emerald-600' : 'bg-stone-200'}`}
                        aria-label={`Visuel ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setView('menu')}
                      className="text-xs text-stone-500 hover:text-stone-700"
                    >
                      Retour au choix
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setStoryIndex((prev) => (prev - 1 + SPRING_PROMO_IMAGES.length) % SPRING_PROMO_IMAGES.length)}
                        className="h-8 w-8 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 flex items-center justify-center"
                        aria-label="Precedent"
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <p className="text-xs text-stone-600">{storyIndex + 1}/{SPRING_PROMO_IMAGES.length}</p>
                      <button
                        type="button"
                        onClick={() => setStoryIndex((prev) => (prev + 1) % SPRING_PROMO_IMAGES.length)}
                        className="h-8 w-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center"
                        aria-label="Suivant"
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes promo-confetti-burst {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg) scale(.5);
            opacity: 0;
          }
          12% {
            opacity: 1;
            transform: translateX(calc(var(--confetti-drift) * 0.4)) translateY(40px) rotate(90deg) scale(1);
          }
          60% {
            opacity: 1;
            transform: translateX(calc(var(--confetti-drift) * 1.1)) translateY(250px) rotate(220deg) scale(1);
          }
          100% {
            transform: translateX(calc(var(--confetti-drift) * 1.8)) translateY(520px) rotate(var(--confetti-rotate-end)) scale(.8);
            opacity: 0;
          }
        }
        @keyframes promo-confetti-flash {
          0% { background: rgba(255,255,255,0.00); }
          35% { background: rgba(255,255,255,0.18); }
          100% { background: rgba(255,255,255,0.00); }
        }
      `}</style>
    </>
  );
}
