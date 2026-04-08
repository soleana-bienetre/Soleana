import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function CTABanner({
  title = 'Prête à vous offrir un moment rien que pour vous ?',
  subtitle = 'Réservez votre séance en ligne ou appelez-nous pour un premier échange.',
  dark = false,
}: CTABannerProps) {
  return (
    <section className={`section-padding ${dark ? 'bg-stone-900' : 'bg-nude-600'}`}>
      <div className="container-narrow text-center">
        <h2 className={`font-serif text-3xl md:text-4xl font-light mb-4 ${dark ? 'text-white' : 'text-white'}`}>
          {title}
        </h2>
        <p className={`text-base mb-8 ${dark ? 'text-stone-400' : 'text-nude-100'}`}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.planity.com/soleana-bien-etre-31810-venerque"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-nude-700 font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-sand-50 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
          >
            <Calendar size={16} />
            Réserver en ligne
          </a>
          <a
            href="tel:0762169814"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/70 text-white font-sans font-medium text-sm tracking-wide rounded-full hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            <Phone size={16} />
            07 62 16 98 14
          </a>
        </div>
      </div>
    </section>
  );
}
