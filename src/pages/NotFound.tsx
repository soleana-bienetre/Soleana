import { Link } from 'react-router-dom';
import { PageMeta } from '../lib/useMeta';

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Page introuvable – Soléana Bien-Être"
        description="Cette page n'existe pas ou a été déplacée. Retrouvez tous nos soins bien-être à Venerque sur notre site."
        url="https://www.soleana-bienetre.com"
      />
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4 text-center">
        <p className="font-sans text-sm font-semibold text-nude-400 tracking-[0.25em] uppercase mb-4">
          Erreur 404
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-stone-800 mb-4">
          Page introuvable
        </h1>
        <p className="text-stone-500 text-base max-w-sm mb-10 leading-relaxed">
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil pour retrouver votre chemin.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
          <Link to="/contact" className="btn-secondary">
            Nous contacter
          </Link>
        </div>
      </div>
    </>
  );
}
