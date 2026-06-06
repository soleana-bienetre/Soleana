import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const PLANITY_URL = 'https://www.planity.com/soleana-bien-etre-31810-venerque';

const SPRING_PROMO_IMAGES = [
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20primptemps/2.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20primptemps/3.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20primptemps/4.webp',
  'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/video/WhatsApp%20Image%202026-06-01%20at%2017.12.42.webp',
];

const ESTIME_SENS_VIDEO = 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/video/video%20estime%20et%20sens.mp4';
const ESTIME_SENS_MEDIA = [
  { type: 'video' as const, src: ESTIME_SENS_VIDEO },
  { type: 'image' as const, src: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/video/WhatsApp%20Image%202026-06-01%20at%2017.23.37.webp' },
  { type: 'image' as const, src: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/video/WhatsApp%20Image%202026-06-01%20at%2017.25.06.webp' },
];

const FETE_DES_PERES_MEDIA = [
  { type: 'image' as const, src: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20fetes%20des%20peres/3-Fetes-des-peres-soleana-bien-etre-venerque.webp' },
  { type: 'image' as const, src: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20fetes%20des%20peres/1-Fetes-des-peres-soleana-bien-etre-venerque.webp' },
  { type: 'image' as const, src: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20fetes%20des%20peres/2-Fetes-des-peres-soleana-bien-etre-venerque.webp' },
  { type: 'video' as const, src: 'https://ssenglsjrkjmambtxckl.supabase.co/storage/v1/object/public/Images%20du%20site/Promotion%20fetes%20des%20peres/4-fetes-des-peres-promotions.mp4' },
];

type PromoView = 'menu' | 'spring' | 'estime-sens' | 'fete-des-peres';
type TargetOffer = 'spring' | 'estime-sens' | 'fete-des-peres';

const CONFETTI_COLORS = ['#f43f5e', '#f97316', '#10b981', '#14b8a6', '#eab308', '#8b5cf6', '#ec4899', '#06b6d4'];
const CONFETTI_COUNT = 70;

export default function SeasonalPopups() {
  const [isPromoCardVisible, setIsPromoCardVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<PromoView>('menu');
  const [storyIndex, setStoryIndex] = useState(0);
  const [estimeSensIndex, setEstimeSensIndex] = useState(0);
  const [feteDesPeresIndex, setFeteDesPeresIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const openModal = () => {
    setView('menu');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setView('menu');
  };

  const launchConfettiThenOpen = (target: TargetOffer, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setConfettiOrigin({
      x: rect.left + rect.width / 2,
      y: rect.bottom,
    });
    setShowConfetti(true);
    window.setTimeout(() => {
      setShowConfetti(false);
      setView(target);
    }, 950);
  };

  const currentEstimeMedia = ESTIME_SENS_MEDIA[estimeSensIndex];

  return (
    <>
      {isPromoCardVisible && (
        <div className="fixed right-3 bottom-3 sm:right-4 sm:bottom-4 z-[120]">
          <div className="relative w-[88vw] max-w-[290px] rounded-2xl border border-sky-200 bg-sky-50/95 backdrop-blur-sm shadow-lg p-3">
            <button
              type="button"
              onClick={() => setIsPromoCardVisible(false)}
              className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center"
              aria-label="Masquer les promotions"
            >
              <X size={12} />
            </button>
            <p className="text-sm text-sky-700 font-semibold pr-7">💙 Fête des Pères</p>
            <p className="text-xs text-stone-600 mt-0.5">Soin visage Homme &amp; coffrets cadeaux jusqu'au 21 juin</p>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => launchConfettiThenOpen('fete-des-peres', e)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors"
              >
                Voir l'offre
                <ChevronRight size={15} />
              </button>
              <button
                type="button"
                onClick={openModal}
                className="text-xs text-stone-500 hover:text-stone-700 underline underline-offset-2"
              >
                Toutes les offres
              </button>
            </div>
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
                    onClick={(e) => launchConfettiThenOpen('spring', e)}
                    className="w-full text-left rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 hover:bg-emerald-100 transition-colors"
                  >
                    <p className="text-sm font-semibold text-emerald-700">Promotion minceur</p>
                    <p className="text-xs text-stone-600 mt-1">Notre offre drainage &amp; madero</p>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => launchConfettiThenOpen('estime-sens', e)}
                    className="w-full text-left rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 hover:bg-amber-100 transition-colors"
                  >
                    <p className="text-sm font-semibold text-amber-700">Duo Bonne Mine — Estime &amp; Sens</p>
                    <p className="text-xs text-stone-600 mt-1">Gommage + gouttes autobronzantes à 39,90 €</p>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => launchConfettiThenOpen('fete-des-peres', e)}
                    className="w-full text-left rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 hover:bg-sky-100 transition-colors"
                  >
                    <p className="text-sm font-semibold text-sky-700">💙 Fête des Pères</p>
                    <p className="text-xs text-stone-600 mt-1">Soin visage Homme & coffrets Estime &amp; Sens</p>
                  </button>
                </div>
              </div>
            )}

            {view === 'spring' && (
              <div>
                <img
                  key={SPRING_PROMO_IMAGES[storyIndex]}
                  src={SPRING_PROMO_IMAGES[storyIndex]}
                  alt={`Promotion minceur visuel ${storyIndex + 1}`}
                  className="w-full max-h-[60vh] object-contain bg-white"
                />
                <div className="p-4 border-t border-stone-100 space-y-3">
                  {storyIndex === SPRING_PROMO_IMAGES.length - 1 && (
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

            {view === 'estime-sens' && (
              <div>
                <div className="w-full max-h-[55vh] bg-stone-50 flex items-center justify-center overflow-hidden">
                  {currentEstimeMedia.type === 'video' ? (
                    <video
                      key={currentEstimeMedia.src}
                      src={currentEstimeMedia.src}
                      className="w-full max-h-[55vh] object-contain"
                      controls
                      autoPlay
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      key={currentEstimeMedia.src}
                      src={currentEstimeMedia.src}
                      alt={`Estime & Sens visuel ${estimeSensIndex}`}
                      className="w-full max-h-[55vh] object-contain"
                    />
                  )}
                </div>

                <div className="p-4 border-t border-stone-100 space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-amber-800">Duo Bonne Mine — Estime &amp; Sens</p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Gouttes autobronzantes Éclat de Soleil disponibles à l'institut ! Quelques gouttes à mélanger à votre crème pour un hâle progressif et naturel.
                      Pour un résultat encore plus uniforme, combinez avec le Gommage Éclat Immédiat.
                    </p>
                    <p className="text-xs font-semibold text-amber-700 mt-1">
                      Coffret Duo à 39,90 € au lieu de 48,90 €
                    </p>
                  </div>

                  {estimeSensIndex === ESTIME_SENS_MEDIA.length - 1 && (
                    <div className="flex justify-center">
                      <a
                        href={PLANITY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors"
                      >
                        Reserver sur Planity
                        <ChevronRight size={14} />
                      </a>
                    </div>
                  )}

                  <div className="flex gap-1">
                    {ESTIME_SENS_MEDIA.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setEstimeSensIndex(i)}
                        className={`h-1.5 flex-1 rounded-full ${i === estimeSensIndex ? 'bg-amber-500' : 'bg-stone-200'}`}
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
                        onClick={() => setEstimeSensIndex((prev) => (prev - 1 + ESTIME_SENS_MEDIA.length) % ESTIME_SENS_MEDIA.length)}
                        className="h-8 w-8 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 flex items-center justify-center"
                        aria-label="Precedent"
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <p className="text-xs text-stone-600">{estimeSensIndex + 1}/{ESTIME_SENS_MEDIA.length}</p>
                      <button
                        type="button"
                        onClick={() => setEstimeSensIndex((prev) => (prev + 1) % ESTIME_SENS_MEDIA.length)}
                        className="h-8 w-8 rounded-full bg-amber-500 text-white hover:bg-amber-600 flex items-center justify-center"
                        aria-label="Suivant"
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {view === 'fete-des-peres' && (() => {
              const media = FETE_DES_PERES_MEDIA[feteDesPeresIndex];
              return (
                <div>
                  <div className="w-full max-h-[55vh] bg-stone-50 flex items-center justify-center overflow-hidden">
                    {media.type === 'video' ? (
                      <video
                        key={media.src}
                        src={media.src}
                        className="w-full max-h-[55vh] object-contain"
                        controls
                        autoPlay
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        key={media.src}
                        src={media.src}
                        alt={`Fête des Pères visuel ${feteDesPeresIndex + 1}`}
                        className="w-full max-h-[55vh] object-contain"
                      />
                    )}
                  </div>

                  <div className="p-4 border-t border-stone-100 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-sky-800">💙 Fête des Pères</p>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Cette année, offrez-lui un moment de bien-être rien qu'à lui.<br />
                        ✨ <span className="font-medium">Soin Visage Homme HUMAN</span> – 1h de détente à 70 €<br />
                        🎁 <span className="font-medium">Coffrets cadeaux Homme Estime &amp; Sens</span> prêts à offrir, de 32 € à 65 €, avec trousse offerte.
                      </p>
                      <p className="text-xs text-sky-700 font-semibold mt-1">Offre coffrets valable jusqu'au 21 juin.</p>
                    </div>

                    {feteDesPeresIndex === FETE_DES_PERES_MEDIA.length - 1 && (
                      <div className="flex justify-center">
                        <a
                          href={PLANITY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors"
                        >
                          Réserver sur Planity
                          <ChevronRight size={14} />
                        </a>
                      </div>
                    )}

                    <div className="flex gap-1">
                      {FETE_DES_PERES_MEDIA.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFeteDesPeresIndex(i)}
                          className={`h-1.5 flex-1 rounded-full ${i === feteDesPeresIndex ? 'bg-sky-600' : 'bg-stone-200'}`}
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
                          onClick={() => setFeteDesPeresIndex((prev) => (prev - 1 + FETE_DES_PERES_MEDIA.length) % FETE_DES_PERES_MEDIA.length)}
                          className="h-8 w-8 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 flex items-center justify-center"
                          aria-label="Precedent"
                        >
                          <ChevronLeft size={15} />
                        </button>
                        <p className="text-xs text-stone-600">{feteDesPeresIndex + 1}/{FETE_DES_PERES_MEDIA.length}</p>
                        <button
                          type="button"
                          onClick={() => setFeteDesPeresIndex((prev) => (prev + 1) % FETE_DES_PERES_MEDIA.length)}
                          className="h-8 w-8 rounded-full bg-sky-600 text-white hover:bg-sky-700 flex items-center justify-center"
                          aria-label="Suivant"
                        >
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      )}

      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-[250] overflow-hidden">
          {Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
            const spread = (i % 2 === 0 ? 1 : -1) * (2 + (i % 11) * 5);
            const peak = -(150 + (i % 11) * 32);
            const drift = (i % 2 === 0 ? 1 : -1) * (10 + (i % 9) * 15);
            const delay = (i % 13) * 22;
            const duration = 800 + (i % 7) * 75;
            const size = 5 + (i % 4);
            const radius = i % 4 === 0 ? '9999px' : '2px';
            const rotateEnd = (i % 2 === 0 ? 1 : -1) * (300 + (i % 6) * 80);
            const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];

            return (
              <span
                key={`confetti-${i}`}
                className="absolute"
                style={{
                  left: `${confettiOrigin.x + spread}px`,
                  top: `${confettiOrigin.y}px`,
                  width: `${size}px`,
                  height: `${Math.max(3, size - 1)}px`,
                  borderRadius: radius,
                  backgroundColor: color,
                  boxShadow: `0 0 0 1px ${color}22, 0 2px 8px ${color}66`,
                  animationName: 'promo-confetti-burst',
                  animationDuration: `${duration}ms`,
                  animationDelay: `${delay}ms`,
                  animationTimingFunction: 'cubic-bezier(.12,.9,.22,1)',
                  animationFillMode: 'forwards',
                  opacity: 0,
                  ['--peak' as string]: `${peak}px`,
                  ['--drift' as string]: `${drift}px`,
                  ['--rotate-end' as string]: `${rotateEnd}deg`,
                }}
              />
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes promo-confetti-burst {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg) scale(0.2);
            opacity: 0;
          }
          8% {
            opacity: 1;
            transform: translateX(calc(var(--drift) * 0.1)) translateY(-18px) rotate(35deg) scale(1.2);
          }
          48% {
            opacity: 1;
            transform: translateX(calc(var(--drift) * 0.6)) translateY(var(--peak)) rotate(210deg) scale(1);
          }
          100% {
            transform: translateX(var(--drift)) translateY(calc(var(--peak) * 0.38)) rotate(var(--rotate-end)) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
