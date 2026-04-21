import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../lib/useMeta';
import {
  Clock,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  BookOpen,
  Rss,
} from 'lucide-react';
import CTABanner from '../components/ui/CTABanner';
import { supabase } from '../lib/supabase';
import type { BlogArticle } from '../lib/supabase';

// ─── Types ───────────────────────────────────────────────────────────────────

// Adapter: maps BlogArticle to local Article shape used by sub-components
interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

function toArticle(a: BlogArticle): Article {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? '',
    category: a.category ?? 'Bien-être',
    date: a.published_at ? new Date(a.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
    readTime: `${a.read_time} min`,
    image: a.og_image_url ?? 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: a.featured ?? false,
  };
}

// ─── Static fallback data (affiché si aucun article en base) ────────────────

const staticArticles: Article[] = [
  {
    id: '1',
    slug: 'combien-seances-epilation-laser',
    title: 'Combien de séances faut-il pour une épilation laser ?',
    excerpt:
      "L\'épilation laser est souvent présentée comme une solution définitive, mais combien de séances sont vraiment nécessaires ? Tout dépend de votre type de poil, de votre phototype et de la zone traitée. Découvrez ce qu\'il faut savoir avant de commencer votre parcours laser.",
    category: 'Épilation laser',
    date: '15 mars 2025',
    readTime: '5 min',
    image:
      'https://images.pexels.com/photos/3865557/pexels-photo-3865557.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
  },
  {
    id: '2',
    slug: 'choisir-soin-visage-type-peau',
    title: 'Comment choisir son soin visage selon son type de peau ?',
    excerpt:
      'Peau sèche, mixte, sensible ou grasse : chaque type de peau a ses propres besoins. Voici nos conseils pour choisir le soin visage le mieux adapté à votre peau et maximiser les résultats de votre séance.',
    category: 'Soins visage',
    date: '2 mars 2025',
    readTime: '4 min',
    image:
      'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    slug: 'bienfaits-kobido-lifting-naturel-japonais',
    title: 'Les bienfaits du Kobido : le lifting naturel japonais',
    excerpt:
      'Né au Japon au XVe siècle, le Kobido est une technique de massage facial qui tonifie, lisse et illumine le visage. Une alternative naturelle aux soins anti-âge invasifs. Découvrez pourquoi ce soin séduit de plus en plus de femmes.',
    category: 'Kobido',
    date: '20 février 2025',
    readTime: '6 min',
    image:
      'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    slug: 'drainage-lymphatique-a-qui-sadresse',
    title: "Drainage lymphatique : à qui s\'adresse-t-il vraiment ?",
    excerpt:
      'Souvent méconnu, le drainage lymphatique manuel est une technique douce aux multiples bénéfices : jambes légères, réduction des œdèmes, soutien immunitaire. Mais qui peut en bénéficier et dans quels cas est-il conseillé ?',
    category: 'Drainage',
    date: '10 février 2025',
    readTime: '5 min',
    image:
      'https://images.pexels.com/photos/5938596/pexels-photo-5938596.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '5',
    slug: 'maderotherapie-technique-naturelle',
    title: 'Maderothérapie : en quoi consiste cette technique naturelle ?',
    excerpt:
      "Venue de Colombie, la maderothérapie utilise des instruments en bois pour modeler et affiner la silhouette. Réduction de la cellulite, tonification, remodelage… Tout ce qu\'il faut savoir sur cette méthode de plus en plus populaire.",
    category: 'Drainage',
    date: '28 janvier 2025',
    readTime: '4 min',
    image:
      'https://images.pexels.com/photos/6663470/pexels-photo-6663470.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '6',
    slug: 'massage-balinais-ou-ayurvedique',
    title: 'Massage balinais ou ayurvédique : lequel choisir ?',
    excerpt:
      'Entre le massage balinais, aux techniques de pétrissage profond et de pressions, et le massage Abhyanga, rituel ayurvédique aux huiles chaudes : lequel correspond le mieux à vos besoins ? Comparatif et conseils pour bien choisir.',
    category: 'Massages',
    date: '15 janvier 2025',
    readTime: '5 min',
    image:
      'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '7',
    slug: 'preparer-peau-avant-seance-laser',
    title: 'Comment préparer sa peau avant une séance de laser ?',
    excerpt:
      "La préparation avant une séance d\'épilation laser est essentielle pour des résultats optimaux et une peau protégée. Découvrez les gestes à adopter et ceux à éviter dans les jours précédant votre traitement.",
    category: 'Épilation laser',
    date: '5 janvier 2025',
    readTime: '3 min',
    image:
      'https://images.pexels.com/photos/3985330/pexels-photo-3985330.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const filterCategories = [
  'Tous',
  'Épilation laser',
  'Soins visage',
  'Kobido',
  'Massages',
  'Drainage',
  'Conseils bien-être',
];

// ─── Category badge colors ────────────────────────────────────────────────────

const categoryColorMap: Record<string, string> = {
  'Épilation laser': 'bg-nude-50 text-nude-700 border-nude-200',
  'Soins visage': 'bg-sage-50 text-sage-700 border-sage-200',
  Kobido: 'bg-sand-50 text-sand-700 border-sand-200',
  Massages: 'bg-stone-50 text-stone-600 border-stone-200',
  Drainage: 'bg-nude-50 text-nude-600 border-nude-200',
  'Conseils bien-être': 'bg-sage-50 text-sage-600 border-sage-200',
};

function CategoryBadge({ category }: { category: string }) {
  const color = categoryColorMap[category] ?? 'bg-sand-50 text-sand-700 border-sand-200';
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium font-sans rounded-full border ${color}`}>
      {category}
    </span>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group block bg-white rounded-3xl overflow-hidden border border-sand-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 md:h-auto overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-nude-600 text-white text-xs font-medium font-sans rounded-full">
              <Rss size={10} />
              À la une
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <CategoryBadge category={article.category} />
          <h2 className="font-serif text-2xl md:text-3xl font-light text-stone-800 mt-4 mb-3 leading-snug group-hover:text-nude-700 transition-colors duration-200">
            {article.title}
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-4 mb-6">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-stone-400">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {article.readTime}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-nude-600 group-hover:gap-2 transition-all duration-200">
              Lire l'article <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group card-service flex flex-col bg-white"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={article.category} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-serif text-xl font-light text-stone-800 leading-snug mb-3 group-hover:text-nude-700 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-sand-50">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {article.readTime}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-nude-600 group-hover:gap-2 transition-all duration-200">
            Lire <ChevronRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const ARTICLES_PER_PAGE = 6;

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    supabase
      .from('blog_articles')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setArticles(data.map(toArticle));
        else setArticles(staticArticles);
      });
  }, []);

  const featuredArticle = articles.find((a) => a.featured) ?? articles[0];

  const filteredArticles =
    activeCategory === 'Tous'
      ? articles.filter((a) => a !== featuredArticle)
      : articles.filter((a) => a.category === activeCategory);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const displayedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    document.getElementById('articles-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <PageMeta
        title="Blog bien-être & beauté – Conseils Soléana Venerque"
        description="Conseils bien-être, guides soins et réponses à vos questions par Laetitia Sevrin. Kobido, épilation laser, drainage lymphatique : tout savoir avant votre prochaine séance."
      />
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-sand-50 to-cream section-padding">
        <div className="container-narrow">
          <div className="mt-8 text-center">
            <span className="tag">Nos conseils bien-être</span>
            <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-2">
              Le blog Soléana
            </h1>
            <p className="mt-6 text-base md:text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Conseils d'experts, guides pratiques et inspirations bien-être : retrouvez tout
              notre contenu pour prendre soin de vous au quotidien.
            </p>
          </div>
        </div>
      </section>

      {/* ── Category Filters ── */}
      <div className="bg-white border-b border-sand-100 sticky top-0 z-20 shadow-sm">
        <div className="container-wide">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-nude-600 text-white shadow-sm'
                    : 'bg-sand-50 text-stone-600 hover:bg-sand-100 hover:text-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Article (only on "Tous") ── */}
      {activeCategory === 'Tous' && featuredArticle && (
        <section className="pt-12 md:pt-16 bg-cream">
          <div className="container-wide">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={16} className="text-nude-500" />
              <h2 className="font-serif text-xl font-light text-stone-700">Article à la une</h2>
            </div>
            <FeaturedArticleCard article={featuredArticle} />
          </div>
        </section>
      )}

      {/* ── Articles Grid ── */}
      <section id="articles-grid" className="section-padding bg-cream scroll-mt-20">
        <div className="container-wide">
          {activeCategory !== 'Tous' && (
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-light text-stone-800">
                {activeCategory}
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {activeCategory === 'Tous' && (
            <div className="flex items-center gap-2 mb-8">
              <h2 className="font-serif text-xl font-light text-stone-700">Tous les articles</h2>
              <span className="text-xs text-stone-400 ml-1">({filteredArticles.length} articles)</span>
            </div>
          )}

          {displayedArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {/* Précédent */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-sans font-medium border border-sand-200 text-stone-600 hover:bg-sand-50 hover:border-sand-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    <ChevronLeft size={15} />
                    Précédent
                  </button>

                  {/* Numéros de pages */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      const isActive = page === currentPage;
                      const isNear = Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages;
                      if (!isNear) {
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-1 text-stone-400 text-sm">…</span>;
                        }
                        return null;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-9 h-9 rounded-full text-sm font-sans font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-nude-600 text-white shadow-sm'
                              : 'text-stone-600 hover:bg-sand-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Suivant */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-sans font-medium border border-sand-200 text-stone-600 hover:bg-sand-50 hover:border-sand-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    Suivant
                    <ChevronRight size={15} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 bg-sand-50 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-sand-400" />
              </div>
              <h3 className="font-serif text-xl font-light text-stone-600 mb-2">
                Aucun article dans cette catégorie
              </h3>
              <p className="text-sm text-stone-400 mb-6">
                De nouveaux articles arrivent prochainement dans cette catégorie.
              </p>
              <button
                onClick={() => handleCategoryChange('Tous')}
                className="btn-secondary"
              >
                Voir tous les articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter / Subscribe teaser ── */}
      <section className="bg-white py-14">
        <div className="container-narrow text-center">
          <div className="bg-sand-50 border border-sand-100 rounded-3xl p-8 md:p-12">
            <div className="w-12 h-12 bg-nude-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rss size={20} className="text-nude-500" />
            </div>
            <h2 className="font-serif text-2xl font-light text-stone-800 mb-3">
              Des conseils bien-être directement chez vous
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed max-w-md mx-auto mb-6">
              Vous souhaitez recevoir nos derniers conseils, les nouveautés de l'institut et des
              offres exclusives ? Contactez-nous pour rester informé.
            </p>
            <Link to="/contact" className="btn-primary">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <CTABanner
        title="Prête à mettre nos conseils en pratique ?"
        subtitle="Réservez votre prochaine séance et prenez soin de vous avec les expertes de Soléana."
      />
    </>
  );
}
