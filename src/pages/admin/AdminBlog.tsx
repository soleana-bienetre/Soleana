import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Trash2, Eye, EyeOff, Edit2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { supabaseAdmin, type BlogArticle } from '../../lib/supabase';

export default function AdminBlog() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabaseAdmin
      .from('blog_articles')
      .select('*')
      .order('created_at', { ascending: false });
    setArticles(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePublished(article: BlogArticle) {
    const published = !article.published;
    await supabaseAdmin.from('blog_articles').update({
      published,
      published_at: published ? new Date().toISOString() : null,
    }).eq('id', article.id);
    setArticles((prev) => prev.map((a) => a.id === article.id ? { ...a, published } : a));
  }

  async function deleteArticle(id: string) {
    if (!confirm('Supprimer cet article définitivement ?')) return;
    await supabaseAdmin.from('blog_articles').delete().eq('id', id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-stone-800 font-light">Articles de blog</h1>
          <p className="text-stone-500 text-sm mt-1">{articles.length} article(s) · {articles.filter((a) => a.published).length} publié(s)</p>
        </div>
        <Link
          to="/admin/blog/nouveau"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm hover:bg-stone-800 transition-colors"
        >
          <Plus size={16} />
          Nouvel article
        </Link>
      </div>

      {loading ? (
        <p className="text-stone-400 text-sm">Chargement...</p>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center">
          <FileText size={32} className="text-stone-300 mx-auto mb-3" />
          <p className="text-stone-400 text-sm mb-4">Aucun article pour l'instant.</p>
          <Link to="/admin/blog/nouveau" className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl text-sm">
            <Plus size={14} />
            Créer le premier article
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left text-xs font-medium text-stone-500 px-4 py-3">Titre</th>
                <th className="text-left text-xs font-medium text-stone-500 px-4 py-3 hidden md:table-cell">Catégorie</th>
                <th className="text-left text-xs font-medium text-stone-500 px-4 py-3 hidden md:table-cell">Date</th>
                <th className="text-left text-xs font-medium text-stone-500 px-4 py-3">Statut</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-stone-800 line-clamp-1">{article.title}</p>
                    <p className="text-xs text-stone-400 mt-0.5">/{article.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-stone-500">{article.category ?? '—'}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-stone-400">
                      {new Date(article.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      article.published ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {article.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/blog/${article.id}`}
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => togglePublished(article)}
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                        title={article.published ? 'Dépublier' : 'Publier'}
                      >
                        {article.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
