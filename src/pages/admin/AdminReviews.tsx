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
      order: [{ column: 'created_at', ascending: false }],
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
          <p className="text-stone-500 text-sm mt-1">Les avis publiés s'affichent sur la page d'accueil.</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white rounded-2xl border p-5 ${review.published ? 'border-stone-100' : 'border-dashed border-stone-200 opacity-60'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < review.rating ? 'fill-ecru-400 text-ecru-400' : 'text-stone-200'}
                    />
                  ))}
                </div>
                <div className="flex gap-1">
                  <Link
                    to={`/admin/avis/${review.id}`}
                    className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <Edit2 size={14} />
                  </Link>
                  <button
                    onClick={() => togglePublished(review)}
                    className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
                    title={review.published ? 'Masquer' : 'Publier'}
                  >
                    {review.published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {review.service && (
                <span className="inline-block bg-nude-50 text-nude-700 text-xs px-2 py-0.5 rounded-full mb-2">{review.service}</span>
              )}

              <p className="text-sm text-stone-600 italic leading-relaxed line-clamp-3 mb-3">"{review.text}"</p>

              <div className="flex items-center gap-2 pt-3 border-t border-stone-50">
                <div className="w-8 h-8 rounded-full bg-nude-100 flex items-center justify-center text-nude-700 text-xs font-semibold">
                  {review.initials}
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-700">{review.name}</p>
                  <p className="text-xs text-stone-400">{review.location}{review.date && ` · ${review.date}`}</p>
                </div>
              </div>

              {!review.published && (
                <p className="text-xs text-stone-400 mt-2 italic">Non publié</p>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
