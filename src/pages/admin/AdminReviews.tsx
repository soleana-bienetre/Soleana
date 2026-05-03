import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Trash2, Eye, EyeOff, Edit2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminRequest } from '../../lib/adminApi';
import type { Review } from '../../lib/supabase';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await adminRequest<Review[]>({
      op: 'select',
      resource: 'reviews',
      order: [{ column: 'created_at', ascending: true }],
    });
    setReviews(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePublished(review: Review) {
    await adminRequest({
      op: 'update',
      resource: 'reviews',
      data: { published: !review.published },
      filters: [{ column: 'id', value: review.id }],
    });
    setReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, published: !r.published } : r));
  }

  async function deleteReview(id: string) {
    if (!confirm('Supprimer cet avis ?')) return;
    await adminRequest({
      op: 'delete',
      resource: 'reviews',
      filters: [{ column: 'id', value: id }],
    });
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-stone-800 font-light">Avis clients</h1>
          <p className="text-stone-500 text-sm mt-1">
            {reviews.length} avis · {reviews.filter((r) => r.published).length} publiés
          </p>
        </div>
        <Link
          to="/admin/avis/nouveau"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-xl text-sm hover:bg-stone-800 transition-colors"
        >
          <Plus size={16} />
          Ajouter un avis
        </Link>
      </div>

      {loading ? (
        <p className="text-stone-400 text-sm">Chargement...</p>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 p-12 text-center">
          <Star size={32} className="text-stone-300 mx-auto mb-3" />
          <p className="text-stone-400 text-sm mb-4">Aucun avis pour l'instant.</p>
          <Link
            to="/admin/avis/nouveau"
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl text-sm"
          >
            <Plus size={14} />
            Ajouter le premier avis
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left text-xs font-medium text-stone-500 px-4 py-3">Client</th>
                <th className="text-left text-xs font-medium text-stone-500 px-4 py-3 hidden sm:table-cell">Note</th>
                <th className="text-left text-xs font-medium text-stone-500 px-4 py-3 hidden md:table-cell">Service</th>
                <th className="text-left text-xs font-medium text-stone-500 px-4 py-3 hidden lg:table-cell">Avis</th>
                <th className="text-left text-xs font-medium text-stone-500 px-4 py-3">Statut</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-nude-100 flex items-center justify-center text-nude-700 text-xs font-semibold shrink-0">
                        {review.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-stone-800">{review.name}</p>
                        <p className="text-xs text-stone-400">{review.location}{review.date && ` · ${review.date}`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className={i < review.rating ? 'fill-ecru-400 text-ecru-400' : 'text-stone-200'} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-stone-500">{review.service ?? '—'}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell max-w-xs">
                    <p className="text-xs text-stone-500 italic line-clamp-1">"{review.text}"</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      review.published ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {review.published ? 'Publié' : 'Masqué'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/avis/${review.id}`}
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => togglePublished(review)}
                        className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                        title={review.published ? 'Masquer' : 'Publier'}
                      >
                        {review.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
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
