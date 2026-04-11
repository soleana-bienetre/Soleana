import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, Calendar, Tag } from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import { supabase } from '../lib/supabase';
import type { BlogArticle } from '../lib/supabase';

function renderContent(content: string) {
  const paragraphs = content.split(/\n{2,}/);
  return paragraphs.map((para, i) => {
    const trimmed = para.trim();
    if (!trimmed) return null;

    // Heading H2 : ## texte
    if (trimmed.startsWith('## ')) {
      return <h2 key={i} className="font-serif text-2xl font-light text-stone-800 mt-10 mb-4">{trimmed.slice(3)}</h2>;
    }
    // Heading H3 : ### texte
    if (trimmed.startsWith('### ')) {
      return <h3 key={i} className="font-serif text-xl font-light text-stone-700 mt-8 mb-3">{trimmed.slice(4)}</h3>;
    }
    // Bullet list
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('• '));
      return (
        <ul key={i} className="list-disc list-inside space-y-2 text-stone-600 text-base leading-relaxed my-4 pl-2">
          {items.map((item, j) => (
            <li key={j}>{item.replace(/^[-•]\s*/, '')}</li>
          ))}
        </ul>
      );
    }
    // Paragraph normal
    const lines = trimmed.split('\n');
    return (
      <p key={i} className="text-stone-600 text-base leading-relaxed my-5">
        {lines.map((line, j) => (
          <span key={j}>
            {line}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

const categoryColorMap: Record<string, string> = {
  'Épilation laser': 'bg-nude-50 text-nude-700 border-nude-200',
  'Soins visage': 'bg-sage-50 text-sage-700 border-sage-200',
  'Soins du visage': 'bg-sage-50 text-sage-700 border-sage-200',
  Kobido: 'bg-sand-50 text-sand-700 border-sand-200',
  Massages: 'bg-stone-50 text-stone-600 border-stone-200',
  Drainage: 'bg-nude-50 text-nude-600 border-nude-200',
  'Conseils bien-être': 'bg-sage-50 text-sage-600 border-sage-200',
  'Bien-être': 'bg-sage-50 text-sage-600 border-sage-200',
};

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }
    supabase
      .from('blog_articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          setArticle(data as BlogArticle);
          // SEO meta tags
          document.title = (data.meta_title || data.title) + ' – Soléana Bien-Être';
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', data.meta_description || data.excerpt || '');
        }
        setLoading(false);
      });

    return () => {
      document.title = 'Soléana Bien-Être – Institut à Venerque';
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-stone-400 text-sm">Chargement...</p>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4 text-center">
        <h1 className="font-serif text-3xl font-light text-stone-700 mb-4">Article introuvable</h1>
        <p className="text-stone-400 text-sm mb-8">Cet article n'existe pas ou n'est plus disponible.</p>
        <Link to="/blog" className="btn-primary">Retour au blog</Link>
      </div>
    );
  }

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const catColor = categoryColorMap[article.category ?? ''] ?? 'bg-sand-50 text-sand-700 border-sand-200';

  return (
    <>
      {/* ── Hero image ── */}
      {article.og_image_url && (
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <img
            src={article.og_image_url}
            alt={article.og_image_alt || article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
      )}

      {/* ── Article container ── */}
      <div className="bg-cream min-h-screen">
        <div className="container-narrow py-10 md:py-16">
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-8">
            <Link to="/" className="hover:text-stone-600 transition-colors">Accueil</Link>
            <ChevronLeft size={12} className="rotate-180" />
            <Link to="/blog" className="hover:text-stone-600 transition-colors">Blog</Link>
            <ChevronLeft size={12} className="rotate-180" />
            <span className="text-stone-500 line-clamp-1">{article.title}</span>
          </nav>

          {/* Header article */}
          <header className="mb-10">
            {article.category && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium font-sans rounded-full border ${catColor} mb-4`}>
                <Tag size={10} />
                {article.category}
              </span>
            )}

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-stone-800 leading-snug mb-6">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-stone-500 text-lg leading-relaxed mb-6 border-l-2 border-nude-300 pl-5 italic">
                {article.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400 pb-8 border-b border-sand-100">
              {formattedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formattedDate}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {article.read_time} min de lecture
              </span>
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-sand-50 text-sand-600 border border-sand-100 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Contenu */}
          <article className="prose-custom">
            {article.content ? (
              renderContent(article.content)
            ) : (
              <p className="text-stone-400 italic">Contenu à venir...</p>
            )}
          </article>

          {/* Retour blog */}
          <div className="mt-14 pt-8 border-t border-sand-100">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-nude-600 transition-colors"
            >
              <ChevronLeft size={16} />
              Retour aux articles
            </button>
          </div>
        </div>
      </div>

      <CTABanner
        title="Envie de prendre soin de vous ?"
        subtitle="Réservez votre séance en ligne ou contactez-nous pour plus d'informations."
      />
    </>
  );
}
