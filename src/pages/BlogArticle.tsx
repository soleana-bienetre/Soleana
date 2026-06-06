import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, Calendar, Tag, Phone, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogArticle } from '../lib/supabase';
import { PageMeta } from '../lib/useMeta';

const PLANITY_URL = 'https://www.planity.com/soleana-bien-etre-31810-venerque';
const PHONE = '07 62 16 98 14';
const PHONE_HREF = 'tel:0762169814';

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

function InlineCTA() {
  return (
    <div className="my-10 bg-gradient-to-br from-nude-50 to-sand-50 border border-nude-200 rounded-2xl p-6 md:p-8">
      <p className="font-serif text-xl md:text-2xl font-light text-stone-800 mb-2">
        Prête à vivre l'expérience ?
      </p>
      <p className="text-stone-500 text-sm mb-5 leading-relaxed">
        Laetitia vous accueille à Venerque (31810) dans un cadre doux et apaisant. Réservez en ligne en quelques secondes ou appelez directement.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={PLANITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-nude-600 text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-nude-700 transition-colors"
        >
          <Calendar size={15} />
          Réserver sur Planity
        </a>
        <a
          href={PHONE_HREF}
          className="inline-flex items-center gap-2 bg-white border border-stone-200 text-stone-700 text-sm font-medium px-5 py-3 rounded-xl hover:bg-stone-50 transition-colors"
        >
          <Phone size={15} />
          {PHONE}
        </a>
      </div>
    </div>
  );
}

function RelatedArticles({ current, category }: { current: string; category?: string }) {
  const [related, setRelated] = useState<BlogArticle[]>([]);

  useEffect(() => {
    supabase
      .from('blog_articles')
      .select('id, title, slug, excerpt, og_image_url, category, published_at, read_time, tags')
      .eq('published', true)
      .neq('slug', current)
      .order('published_at', { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (!data) return;
        // Prioritize same category
        const samecat = data.filter((a) => a.category === category);
        const rest = data.filter((a) => a.category !== category);
        setRelated([...samecat, ...rest].slice(0, 3) as BlogArticle[]);
      });
  }, [current, category]);

  if (!related.length) return null;

  return (
    <section className="mt-16 pt-10 border-t border-sand-100">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="font-serif text-2xl font-light text-stone-800">Articles liés</h2>
        <span className="text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">{related.length} articles</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {related.map((a) => {
          const catColor = categoryColorMap[a.category ?? ''] ?? 'bg-sand-50 text-sand-700 border-sand-200';
          return (
            <Link
              key={a.id}
              to={`/blog/${a.slug}`}
              className="group bg-white rounded-2xl border border-sand-100 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {a.og_image_url && (
                <div className="h-36 overflow-hidden">
                  <img
                    src={a.og_image_url}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-4">
                {a.category && (
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full border ${catColor} mb-2`}>
                    {a.category}
                  </span>
                )}
                <h3 className="font-serif text-base font-light text-stone-800 leading-snug mb-2 group-hover:text-nude-700 transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1"><Clock size={10} />{a.read_time} min</span>
                  <span className="text-nude-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                    Lire <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

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
          const a = data as BlogArticle;

          // ── JSON-LD Article ───────────────────────────────────────────
          const existing = document.getElementById('schema-article');
          if (existing) existing.remove();
          const schema = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: a.title,
            description: a.excerpt || a.meta_description,
            image: a.og_image_url,
            datePublished: a.published_at,
            dateModified: a.updated_at,
            author: {
              '@type': 'Person',
              name: 'Laetitia Sevrin',
              jobTitle: 'Praticienne bien-être et esthéticienne',
              worksFor: { '@type': 'LocalBusiness', name: 'Soléana Bien-Être' },
            },
            publisher: {
              '@type': 'LocalBusiness',
              name: 'Soléana Bien-Être',
              url: 'https://www.soleana-bienetre.com',
              address: { '@type': 'PostalAddress', streetAddress: '1 Rue de la Fraternité', addressLocality: 'Venerque', postalCode: '31810', addressCountry: 'FR' },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.soleana-bienetre.com/blog/${a.slug}` },
            keywords: a.tags?.join(', '),
            articleSection: a.category,
            inLanguage: 'fr-FR',
          };
          const script = document.createElement('script');
          script.id = 'schema-article';
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(schema);
          document.head.appendChild(script);
        }
        setLoading(false);
      });

    return () => {
      document.getElementById('schema-article')?.remove();
    };
  }, [slug]);

  if (loading) {
    return (
      <>
        <PageMeta
          title="Blog – Soléana Bien-Être"
          description="Conseils beauté et bien-être par Soléana Bien-Être à Venerque."
          url="https://www.soleana-bienetre.com/blog"
        />
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-nude-300 border-t-nude-600 animate-spin" />
            <p className="text-stone-400 text-sm">Chargement de l'article…</p>
          </div>
        </div>
      </>
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
      <PageMeta
        title={(article.meta_title || article.title) + ' – Soléana Bien-Être'}
        description={article.meta_description || article.excerpt || ''}
        url={`https://www.soleana-bienetre.com/blog/${article.slug}`}
        image={article.og_image_url || undefined}
      />
      {/* ── Hero image ── */}
      {article.og_image_url && (
        <div className="relative w-full h-64 md:h-[420px] overflow-hidden">
          <img
            src={article.og_image_url}
            alt={article.og_image_alt || article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Titre en overlay sur l'image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-3xl mx-auto">
              {article.category && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium font-sans rounded-full border ${catColor} mb-3`}>
                  <Tag size={10} />
                  {article.category}
                </span>
              )}
              <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light text-white leading-snug">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">


          {/* Si pas d'image hero, titre ici */}
          {!article.og_image_url && (
            <header className="mb-8">
              {article.category && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium font-sans rounded-full border ${catColor} mb-4`}>
                  <Tag size={10} />
                  {article.category}
                </span>
              )}
              <h1 className="font-serif text-3xl md:text-5xl font-light text-stone-800 leading-snug mb-4">
                {article.title}
              </h1>
            </header>
          )}

          {/* Méta article */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400 pb-6 border-b border-sand-100 mb-8">
            {formattedDate && (
              <span className="flex items-center gap-1.5"><Calendar size={13} />{formattedDate}</span>
            )}
            <span className="flex items-center gap-1.5"><Clock size={13} />{article.read_time} min de lecture</span>
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-sand-50 text-sand-600 border border-sand-100 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Encadré résumé */}
          {article.excerpt && (
            <div className="bg-white border-l-4 border-nude-400 rounded-r-2xl px-6 py-5 mb-10 shadow-sm">
              <p className="text-xs font-semibold text-nude-600 uppercase tracking-widest mb-2">En résumé</p>
              <p className="text-stone-600 text-base leading-relaxed italic">{article.excerpt}</p>
            </div>
          )}

          {/* Contenu HTML */}
          <article
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content ?? '<p class="text-stone-400 italic">Contenu à venir…</p>' }}
          />

          {/* CTA inline après le contenu */}
          <InlineCTA />

          {/* Articles liés */}
          <RelatedArticles current={article.slug} category={article.category} />

          {/* Retour */}
          <div className="mt-12 pt-8 border-t border-sand-100">
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
    </>
  );
}
